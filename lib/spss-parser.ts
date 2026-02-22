// SPSS Output → APA 7th Edition Parser
// Parses common SPSS text output formats and extracts statistics

export interface SPSSTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface SPSSParseResult {
  testType:
    | "t-test"
    | "anova"
    | "regression"
    | "chi-square"
    | "correlation"
    | "descriptive";
  tables: SPSSTable[];
  apaResult: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function _num(v: string | undefined): number {
  if (!v) return NaN;
  return parseFloat(v.replace(/,/g, "").trim());
}

function fmt(n: number, decimals = 2): string {
  return n.toFixed(decimals);
}

function fmtP(p: number): string {
  if (p < 0.001) return "< .001";
  const s = p.toFixed(3);
  // Remove leading zero: "0.042" → ".042"
  return s.startsWith("0") ? s.slice(1) : s;
}

/**
 * Try to parse a whitespace-aligned table from SPSS text output.
 * Returns rows split by 2+ spaces.
 */
function splitTableRow(line: string): string[] {
  return line
    .trim()
    .split(/\s{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Extract all lines between (and including) a header line and the next blank
 * line or end of input.
 */
function extractBlock(
  lines: string[],
  startPattern: RegExp
): string[] | null {
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (startPattern.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) return null;

  const block: string[] = [];
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    // Stop at a completely blank line (after we have collected something)
    if (block.length > 1 && line.trim() === "") break;
    block.push(line);
  }
  return block;
}

/**
 * Parse a simple text table: first non-empty row = headers, rest = data rows.
 */
function parseSimpleTable(block: string[], title: string): SPSSTable {
  const nonEmpty = block.filter((l) => l.trim() !== "");
  // Try to find a header row (first row that has 3+ columns)
  let headerIdx = 0;
  for (let i = 0; i < nonEmpty.length; i++) {
    if (splitTableRow(nonEmpty[i]).length >= 2) {
      headerIdx = i;
      break;
    }
  }

  const headers = splitTableRow(nonEmpty[headerIdx]);
  const rows: string[][] = [];
  for (let i = headerIdx + 1; i < nonEmpty.length; i++) {
    const cells = splitTableRow(nonEmpty[i]);
    if (cells.length >= 2) {
      rows.push(cells);
    }
  }

  return { title, headers, rows };
}

// ---------------------------------------------------------------------------
// Detect Test Type
// ---------------------------------------------------------------------------

export function detectTestType(
  input: string
):
  | "t-test"
  | "anova"
  | "regression"
  | "chi-square"
  | "correlation"
  | "descriptive"
  | null {
  const upper = input.toUpperCase();

  if (
    upper.includes("INDEPENDENT SAMPLES TEST") ||
    upper.includes("GROUP STATISTICS") ||
    (upper.includes("PAIRED SAMPLES") && upper.includes("TEST"))
  ) {
    return "t-test";
  }

  if (
    upper.includes("ANOVA") &&
    (upper.includes("BETWEEN GROUPS") || upper.includes("WITHIN GROUPS"))
  ) {
    return "anova";
  }

  if (
    upper.includes("MODEL SUMMARY") &&
    (upper.includes("COEFFICIENTS") || upper.includes("R SQUARE"))
  ) {
    return "regression";
  }

  if (upper.includes("CHI-SQUARE TESTS") || upper.includes("CHI-SQUARE TEST")) {
    return "chi-square";
  }

  if (
    upper.includes("CORRELATIONS") &&
    (upper.includes("PEARSON CORRELATION") || upper.includes("SIG. (2-TAILED)"))
  ) {
    return "correlation";
  }

  if (
    upper.includes("DESCRIPTIVE STATISTICS") ||
    (upper.includes("STATISTICS") &&
      upper.includes("MEAN") &&
      upper.includes("STD. DEVIATION"))
  ) {
    return "descriptive";
  }

  return null;
}

// ---------------------------------------------------------------------------
// Individual Parsers
// ---------------------------------------------------------------------------

function parseTTest(input: string): SPSSParseResult | null {
  const lines = input.split("\n");
  const tables: SPSSTable[] = [];

  // --- Group Statistics table ---
  const gsBlock = extractBlock(lines, /group\s+statistics/i);
  if (gsBlock) {
    tables.push(parseSimpleTable(gsBlock, "Group Statistics"));
  }

  // --- Independent Samples Test ---
  const istBlock = extractBlock(lines, /independent\s+samples\s+test/i);
  if (istBlock) {
    tables.push(parseSimpleTable(istBlock, "Independent Samples Test"));
  }

  // Try to extract key values with regex
  const fullText = input.replace(/\n/g, " ");

  // Look for t value, df, sig (p)
  // SPSS typically outputs: t | df | Sig. (2-tailed) | Mean Difference | ...
  // We search for numeric patterns in the Independent Samples Test area
  let t_val = NaN,
    df_val = NaN,
    p_val = NaN,
    _meanDiff = NaN,
    lowerCI = NaN,
    upperCI = NaN;

  // Strategy: look for rows with "Equal variances not assumed" (Welch) first, else "Equal variances assumed"
  if (istBlock) {
    const _joinedBlock = istBlock.join("\n");
    // Try Welch row first
    const welchLine =
      istBlock.find((l) => /equal variances not assumed/i.test(l)) ||
      istBlock.find((l) => /equal variances assumed/i.test(l));

    if (welchLine) {
      const nums = welchLine.match(/-?\d+\.?\d*/g);
      if (nums && nums.length >= 3) {
        // Typical order: t, df, Sig, Mean Diff, SE Diff, Lower, Upper
        t_val = parseFloat(nums[0]);
        df_val = parseFloat(nums[1]);
        p_val = parseFloat(nums[2]);
        if (nums.length >= 4) _meanDiff = parseFloat(nums[3]);
        if (nums.length >= 6) {
          lowerCI = parseFloat(nums[nums.length - 2]);
          upperCI = parseFloat(nums[nums.length - 1]);
        }
      }
    }

    // Fallback: search in the entire block for numbers
    if (isNaN(t_val)) {
      const allNums: number[] = [];
      for (const line of istBlock) {
        const matches = line.match(/-?\d+\.?\d*/g);
        if (matches) {
          allNums.push(...matches.map(Number));
        }
      }
      // Usually the pattern in data rows is: t, df, sig, meanDiff, SEDiff, lower, upper
      if (allNums.length >= 7) {
        // Find the row with the largest absolute value (likely the t-stat)
        // Actually, take them in order from after the header
        t_val = allNums[0];
        df_val = allNums[1];
        p_val = allNums[2];
        _meanDiff = allNums[3];
        lowerCI = allNums[allNums.length - 2];
        upperCI = allNums[allNums.length - 1];
      }
    }
  }

  // Also try a general regex approach on full text
  if (isNaN(t_val)) {
    const tMatch = fullText.match(
      /t\s*[=(]\s*(-?\d+\.?\d*)/i
    );
    if (tMatch) t_val = parseFloat(tMatch[1]);
  }
  if (isNaN(df_val)) {
    const dfMatch = fullText.match(/df\s*[=)]\s*(\d+\.?\d*)/i);
    if (dfMatch) df_val = parseFloat(dfMatch[1]);
  }
  if (isNaN(p_val)) {
    const pMatch = fullText.match(
      /sig\.?\s*\(?2[- ]?tailed\)?\s*[=:]\s*\.?(\d+\.?\d*)/i
    );
    if (pMatch) {
      const raw = pMatch[1];
      p_val = parseFloat(raw.startsWith(".") ? "0" + raw : "0." + raw);
    }
  }

  // Extract group means for Cohen's d estimation
  let n1 = NaN,
    m1 = NaN,
    sd1 = NaN,
    n2 = NaN,
    m2 = NaN,
    sd2 = NaN;
  if (gsBlock) {
    const dataRows = gsBlock
      .filter((l) => l.trim() !== "")
      .slice(1); // Skip header-like lines

    for (const row of dataRows) {
      const nums = row.match(/-?\d+\.?\d*/g);
      if (nums && nums.length >= 4) {
        if (isNaN(n1)) {
          n1 = parseFloat(nums[0]);
          m1 = parseFloat(nums[1]);
          sd1 = parseFloat(nums[2]);
        } else if (isNaN(n2)) {
          n2 = parseFloat(nums[0]);
          m2 = parseFloat(nums[1]);
          sd2 = parseFloat(nums[2]);
        }
      }
    }
  }

  // Cohen's d
  let d = NaN;
  if (!isNaN(sd1) && !isNaN(sd2) && !isNaN(m1) && !isNaN(m2)) {
    const pooledSD = Math.sqrt((sd1 * sd1 + sd2 * sd2) / 2);
    if (pooledSD > 0) {
      d = (m1 - m2) / pooledSD;
    }
  }

  if (isNaN(t_val) || isNaN(df_val) || isNaN(p_val)) {
    return null;
  }

  // Build APA string
  let apa = `t(${fmt(df_val)}) = ${fmt(Math.abs(t_val))}, p ${fmtP(p_val)}`;
  if (!isNaN(d)) {
    apa += `, d = ${fmt(Math.abs(d))}`;
  }
  if (!isNaN(lowerCI) && !isNaN(upperCI)) {
    apa += `, 95% CI [${fmt(lowerCI)}, ${fmt(upperCI)}]`;
  }

  return { testType: "t-test", tables, apaResult: apa };
}

function parseAnova(input: string): SPSSParseResult | null {
  const lines = input.split("\n");
  const tables: SPSSTable[] = [];

  const anovaBlock = extractBlock(lines, /ANOVA/i);
  if (anovaBlock) {
    tables.push(parseSimpleTable(anovaBlock, "ANOVA"));
  }

  let F_val = NaN,
    df1 = NaN,
    df2 = NaN,
    p_val = NaN,
    ssBetween = NaN,
    ssTotal = NaN;

  // Look for Between Groups and Within Groups rows
  if (anovaBlock) {
    let betweenNums: number[] = [];
    let withinNums: number[] = [];
    let totalNums: number[] = [];

    for (const line of anovaBlock) {
      const lower = line.toLowerCase();
      const nums = line.match(/-?\d+\.?\d*/g)?.map(Number) || [];
      if (lower.includes("between") && lower.includes("group")) {
        betweenNums = nums;
      } else if (lower.includes("within") && lower.includes("group")) {
        withinNums = nums;
      } else if (lower.includes("total") && nums.length >= 2) {
        totalNums = nums;
      }
    }

    // Typical SPSS ANOVA row: SS | df | MS | F | Sig.
    if (betweenNums.length >= 5) {
      ssBetween = betweenNums[0];
      df1 = betweenNums[1];
      // MS = betweenNums[2]
      F_val = betweenNums[3];
      p_val = betweenNums[4];
    }
    if (withinNums.length >= 2) {
      df2 = withinNums[1];
    }
    if (totalNums.length >= 2) {
      ssTotal = totalNums[0];
    }
  }

  // Fallback regex
  if (isNaN(F_val)) {
    const fMatch = input.match(/F\s*[=(]\s*(\d+\.?\d*)/i);
    if (fMatch) F_val = parseFloat(fMatch[1]);
  }

  if (isNaN(F_val) || isNaN(df1) || isNaN(p_val)) {
    return null;
  }

  // Eta squared
  let etaSq = NaN;
  if (!isNaN(ssBetween) && !isNaN(ssTotal) && ssTotal > 0) {
    etaSq = ssBetween / ssTotal;
  }

  let apa = `F(${fmt(df1, 0)}, ${fmt(df2, 0)}) = ${fmt(F_val)}, p ${fmtP(p_val)}`;
  if (!isNaN(etaSq)) {
    apa += `, \u03B7\u00B2 = ${fmt(etaSq, 3)}`;
  }

  return { testType: "anova", tables, apaResult: apa };
}

function parseRegression(input: string): SPSSParseResult | null {
  const lines = input.split("\n");
  const tables: SPSSTable[] = [];

  // Model Summary
  const msBlock = extractBlock(lines, /model\s+summary/i);
  if (msBlock) {
    tables.push(parseSimpleTable(msBlock, "Model Summary"));
  }

  // ANOVA (within regression output)
  const anovaBlock = extractBlock(lines, /ANOVA/i);
  if (anovaBlock) {
    tables.push(parseSimpleTable(anovaBlock, "ANOVA"));
  }

  // Coefficients
  const coeffBlock = extractBlock(lines, /coefficients/i);
  if (coeffBlock) {
    tables.push(parseSimpleTable(coeffBlock, "Coefficients"));
  }

  let _R = NaN,
    R2 = NaN,
    adjR2 = NaN,
    F_val = NaN,
    df1 = NaN,
    df2 = NaN,
    p_val = NaN;

  // Parse Model Summary: R | R Square | Adjusted R Square | Std. Error
  if (msBlock) {
    for (const line of msBlock) {
      // Skip header lines
      if (/model\s+summary/i.test(line) || /\bR\b.*\bR\s+Square/i.test(line))
        continue;
      const nums = line.match(/\d+\.?\d*/g)?.map(Number) || [];
      // First data row typically: Model#, R, R², AdjR², SE
      if (nums.length >= 4) {
        // If first number is 1 (model number), skip it
        const offset = nums[0] === 1 ? 1 : 0;
        _R = nums[offset];
        R2 = nums[offset + 1];
        adjR2 = nums[offset + 2];
      }
    }
  }

  // Parse ANOVA block for F and sig
  if (anovaBlock) {
    for (const line of anovaBlock) {
      const lower = line.toLowerCase();
      if (lower.includes("regression") && !lower.includes("anova")) {
        const nums = line.match(/-?\d+\.?\d*/g)?.map(Number) || [];
        // SS | df | MS | F | Sig.
        if (nums.length >= 5) {
          df1 = nums[1];
          F_val = nums[3];
          p_val = nums[4];
        }
      }
      if (lower.includes("residual") || lower.includes("error")) {
        const nums = line.match(/-?\d+\.?\d*/g)?.map(Number) || [];
        if (nums.length >= 2) {
          df2 = nums[1];
        }
      }
    }
  }

  if (isNaN(R2)) {
    // Try regex
    const r2Match = input.match(/R\s*(?:Square|²)\s*[=:]\s*\.?(\d+\.?\d*)/i);
    if (r2Match) R2 = parseFloat(r2Match[1]);
  }

  if (isNaN(R2)) return null;

  let apa = `R\u00B2 = ${fmt(R2, 2)}`;
  if (!isNaN(adjR2)) {
    apa = `R\u00B2 = ${fmt(R2, 2)}, adjusted R\u00B2 = ${fmt(adjR2, 2)}`;
  }
  if (!isNaN(F_val) && !isNaN(df1) && !isNaN(df2)) {
    apa += `, F(${fmt(df1, 0)}, ${fmt(df2, 0)}) = ${fmt(F_val)}, p ${fmtP(p_val)}`;
  }

  return { testType: "regression", tables, apaResult: apa };
}

function parseChiSquare(input: string): SPSSParseResult | null {
  const lines = input.split("\n");
  const tables: SPSSTable[] = [];

  const csBlock = extractBlock(lines, /chi-square\s+test/i);
  if (csBlock) {
    tables.push(parseSimpleTable(csBlock, "Chi-Square Tests"));
  }

  let chi2 = NaN,
    df_val = NaN,
    p_val = NaN,
    cramersV = NaN;

  // Look for "Pearson Chi-Square" row
  if (csBlock) {
    for (const line of csBlock) {
      const lower = line.toLowerCase();
      if (lower.includes("pearson") && lower.includes("chi")) {
        const nums = line.match(/-?\d+\.?\d*/g)?.map(Number) || [];
        // Value | df | Asymptotic Sig.
        if (nums.length >= 3) {
          chi2 = nums[0];
          df_val = nums[1];
          p_val = nums[2];
        }
      }
    }
  }

  // Look for Cramer's V in Symmetric Measures
  const symBlock = extractBlock(lines, /symmetric\s+measures/i);
  if (symBlock) {
    tables.push(parseSimpleTable(symBlock, "Symmetric Measures"));
    for (const line of symBlock) {
      if (/cramer/i.test(line)) {
        const nums = line.match(/-?\d+\.?\d*/g)?.map(Number) || [];
        if (nums.length >= 1) {
          cramersV = nums[0];
        }
      }
    }
  }

  // Fallback regex
  if (isNaN(chi2)) {
    const m = input.match(
      /(?:pearson\s+)?chi[- ]?square\s*[=:]\s*(\d+\.?\d*)/i
    );
    if (m) chi2 = parseFloat(m[1]);
  }

  if (isNaN(chi2) || isNaN(df_val) || isNaN(p_val)) return null;

  let apa = `\u03C7\u00B2(${fmt(df_val, 0)}) = ${fmt(chi2)}, p ${fmtP(p_val)}`;
  if (!isNaN(cramersV)) {
    apa += `, V = ${fmt(cramersV)}`;
  }

  return { testType: "chi-square", tables, apaResult: apa };
}

function parseCorrelation(input: string): SPSSParseResult | null {
  const lines = input.split("\n");
  const tables: SPSSTable[] = [];

  const corrBlock = extractBlock(lines, /correlations/i);
  if (corrBlock) {
    tables.push(parseSimpleTable(corrBlock, "Correlations"));
  }

  let r = NaN,
    p_val = NaN,
    N = NaN;

  if (corrBlock) {
    // In a typical SPSS correlation table, the Pearson Correlation row contains r,
    // the Sig. (2-tailed) row contains p, and N row contains sample size
    for (const line of corrBlock) {
      const lower = line.toLowerCase();
      if (lower.includes("pearson correlation") || lower.includes("pearson")) {
        const nums = line.match(/-?\d+\.?\d*/g)?.map(Number) || [];
        // The first numeric value that is not 1.000 (diagonal) is r
        for (const n of nums) {
          if (Math.abs(n) <= 1 && Math.abs(n) !== 1 && !isNaN(n)) {
            r = n;
            break;
          }
        }
        // If all values are 1, r might still be NaN; try the second number
        if (isNaN(r) && nums.length >= 2) {
          r = nums[1];
        }
      }
      if (lower.includes("sig") && (lower.includes("tailed") || lower.includes("2-"))) {
        const nums = line.match(/\d+\.?\d*/g)?.map(Number) || [];
        if (nums.length >= 1) {
          p_val = nums[0];
          // If value > 1, it might be without leading dot
          if (p_val > 1) p_val = p_val / Math.pow(10, Math.ceil(Math.log10(p_val + 1)));
        }
      }
      if (/^\s*N\b/i.test(lower) || (lower.includes("n") && !lower.includes("pearson") && !lower.includes("sig"))) {
        const nums = line.match(/\d+/g)?.map(Number) || [];
        if (nums.length >= 1) {
          N = nums[0];
        }
      }
    }
  }

  // Fallback
  if (isNaN(r)) {
    const rMatch = input.match(/r\s*=\s*(-?\d*\.?\d+)/i);
    if (rMatch) r = parseFloat(rMatch[1]);
  }

  if (isNaN(r) || isNaN(p_val)) return null;

  let apa: string;
  if (!isNaN(N) && N > 2) {
    apa = `r(${N - 2}) = ${fmt(r)}, p ${fmtP(p_val)}`;
  } else {
    apa = `r = ${fmt(r)}, p ${fmtP(p_val)}`;
  }

  return { testType: "correlation", tables, apaResult: apa };
}

function parseDescriptive(input: string): SPSSParseResult | null {
  const lines = input.split("\n");
  const tables: SPSSTable[] = [];

  const descBlock =
    extractBlock(lines, /descriptive\s+statistics/i) ||
    extractBlock(lines, /statistics/i);

  if (descBlock) {
    tables.push(parseSimpleTable(descBlock, "Descriptive Statistics"));
  }

  let N = NaN,
    mean = NaN,
    sd = NaN,
    min = NaN,
    max = NaN;

  if (descBlock) {
    for (const line of descBlock) {
      const lower = line.toLowerCase();
      // Skip headers
      if (
        lower.includes("descriptive statistics") ||
        lower.includes("statistic") ||
        lower.trim() === ""
      )
        continue;

      const nums = line.match(/-?\d+\.?\d*/g)?.map(Number) || [];
      // Typical row: Variable | N | Minimum | Maximum | Mean | Std. Deviation
      if (nums.length >= 4) {
        // Try to identify: smallest int is probably N, or could be first
        if (isNaN(N)) {
          N = nums[0];
          if (nums.length >= 5) {
            min = nums[1];
            max = nums[2];
            mean = nums[3];
            sd = nums[4];
          } else {
            mean = nums[1];
            sd = nums[2];
          }
        }
      }
    }
  }

  // Fallback: look for Mean and SD in any format
  if (isNaN(mean)) {
    const mMatch = input.match(/mean\s*[=:]\s*(-?\d+\.?\d*)/i);
    if (mMatch) mean = parseFloat(mMatch[1]);
  }
  if (isNaN(sd)) {
    const sdMatch = input.match(/std\.?\s*dev(?:iation)?\s*[=:]\s*(\d+\.?\d*)/i);
    if (sdMatch) sd = parseFloat(sdMatch[1]);
  }
  if (isNaN(N)) {
    const nMatch = input.match(/\bN\s*[=:]\s*(\d+)/i);
    if (nMatch) N = parseFloat(nMatch[1]);
  }

  if (isNaN(mean) && isNaN(sd)) return null;

  let apa = "";
  if (!isNaN(N)) apa += `N = ${fmt(N, 0)}, `;
  if (!isNaN(mean)) apa += `M = ${fmt(mean)}`;
  if (!isNaN(sd)) apa += `, SD = ${fmt(sd)}`;
  if (!isNaN(min) && !isNaN(max)) {
    apa += `, range = ${fmt(min)} \u2013 ${fmt(max)}`;
  }

  return { testType: "descriptive", tables, apaResult: apa.replace(/^,\s*/, "") };
}

// ---------------------------------------------------------------------------
// Main Parse Function
// ---------------------------------------------------------------------------

export function parseSPSSOutput(input: string): SPSSParseResult | null {
  if (!input || input.trim().length === 0) return null;

  const testType = detectTestType(input);
  if (!testType) return null;

  switch (testType) {
    case "t-test":
      return parseTTest(input);
    case "anova":
      return parseAnova(input);
    case "regression":
      return parseRegression(input);
    case "chi-square":
      return parseChiSquare(input);
    case "correlation":
      return parseCorrelation(input);
    case "descriptive":
      return parseDescriptive(input);
    default:
      return null;
  }
}

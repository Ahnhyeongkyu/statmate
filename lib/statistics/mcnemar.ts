import jStat from "jstat";
import { requireNonNegative } from "./validation";

export interface McNemarResult {
  chiSquare: number;
  df: number;
  pValue: number;
  exactP: number | null;
  oddsRatio: number;
  oddsRatioCI: [number, number];
  b: number;
  c: number;
  discordantTotal: number;
  proportionChanged: number;
  observed: number[][];
  n: number;
  significant: boolean;
  useExact: boolean;
}

/**
 * McNemar's test for paired binary data (2x2 table).
 *
 * Table layout:
 *   [[a, b], [c, d]]
 *   a = Yes->Yes (concordant positive)
 *   b = Yes->No  (changed to negative, discordant)
 *   c = No->Yes  (changed to positive, discordant)
 *   d = No->No   (concordant negative)
 *
 * The test focuses on the discordant pairs b and c.
 */
export function mcnemarTest(table: number[][]): McNemarResult {
  if (!table || table.length !== 2 || !table[0] || table[0].length !== 2 || table[1].length !== 2) {
    throw new Error("McNemar's test requires a 2x2 contingency table");
  }

  const a = table[0][0];
  const b = table[0][1];
  const c = table[1][0];
  const d = table[1][1];

  // Validate non-negative integers
  requireNonNegative([a, b], "Row 1");
  requireNonNegative([c, d], "Row 2");

  if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(c) || !Number.isInteger(d)) {
    throw new Error("All cell values must be non-negative integers");
  }

  const n = a + b + c + d;
  if (n === 0) {
    throw new Error("Total count cannot be zero");
  }

  const discordantTotal = b + c;

  if (discordantTotal === 0) {
    throw new Error("No discordant pairs (b + c = 0). McNemar's test cannot be performed.");
  }

  // Determine whether to use exact test
  const useExact = discordantTotal < 25;

  // McNemar's chi-square with continuity correction
  const chiSquare = (Math.abs(b - c) - 1) ** 2 / (b + c);
  const df = 1;

  // Asymptotic p-value
  const pValueAsymptotic = 1 - jStat.chisquare.cdf(chiSquare, df);

  // Exact p-value using binomial distribution (two-tailed)
  let exactP: number | null = null;
  if (useExact) {
    const maxBC = Math.max(b, c);
    // Two-tailed exact p = 2 * P(X >= max(b,c)) where X ~ Binomial(b+c, 0.5)
    exactP = 2 * (1 - jStat.binomial.cdf(maxBC - 1, discordantTotal, 0.5));
    // Clamp to [0, 1]
    exactP = Math.min(1, Math.max(0, exactP));
  }

  // Use exact p-value when available, otherwise asymptotic
  const pValue = useExact && exactP !== null ? exactP : pValueAsymptotic;

  // Odds ratio: b / c
  let oddsRatio: number;
  if (c === 0) {
    oddsRatio = Infinity;
  } else if (b === 0) {
    oddsRatio = 0;
  } else {
    oddsRatio = b / c;
  }

  // 95% CI for odds ratio (log method)
  let oddsRatioCI: [number, number] = [0, Infinity];
  if (b > 0 && c > 0) {
    const logOR = Math.log(b / c);
    const se = Math.sqrt(1 / b + 1 / c);
    oddsRatioCI = [
      Math.exp(logOR - 1.96 * se),
      Math.exp(logOR + 1.96 * se),
    ];
  }

  // Effect size: proportion of change
  const proportionChanged = discordantTotal / n;

  return {
    chiSquare,
    df,
    pValue,
    exactP,
    oddsRatio,
    oddsRatioCI,
    b,
    c,
    discordantTotal,
    proportionChanged,
    observed: [[a, b], [c, d]],
    n,
    significant: pValue < 0.05,
    useExact,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatMcNemarAPA(result: McNemarResult): string {
  const pStr = formatPValue(result.pValue);
  if (result.useExact) {
    return `McNemar's exact test, p ${pStr}`;
  }
  return `McNemar's test, \u03C7\u00B2(1) = ${result.chiSquare.toFixed(2)}, p ${pStr}`;
}

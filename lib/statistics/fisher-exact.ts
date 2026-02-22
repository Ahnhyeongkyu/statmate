import { requireNonNegative } from "./validation";

export interface FisherExactResult {
  pValue: number;
  oddsRatio: number;
  oddsRatioCI: [number, number];
  phi: number;
  relativeRisk: number;
  relativeRiskCI: [number, number];
  observed: number[][];
  expected: number[][];
  rowTotals: number[];
  colTotals: number[];
  grandTotal: number;
  significant: boolean;
}

// Pre-compute log-factorials up to 1000
const LOG_FACTORIALS: number[] = [0]; // logFactorial(0) = 0
for (let i = 1; i <= 1000; i++) {
  LOG_FACTORIALS[i] = LOG_FACTORIALS[i - 1] + Math.log(i);
}

function logFactorial(n: number): number {
  if (n < 0) return 0;
  if (n <= 1000) return LOG_FACTORIALS[n];
  // Stirling's approximation for n > 1000 (with 1/(12n) correction)
  return n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n) + 1 / (12 * n);
}

/**
 * Compute the probability of a specific 2x2 table under the hypergeometric
 * distribution with fixed marginals.
 */
function tableLogProb(a: number, b: number, c: number, d: number): number {
  const n = a + b + c + d;
  return (
    logFactorial(a + b) +
    logFactorial(c + d) +
    logFactorial(a + c) +
    logFactorial(b + d) -
    logFactorial(n) -
    logFactorial(a) -
    logFactorial(b) -
    logFactorial(c) -
    logFactorial(d)
  );
}

/**
 * Fisher's exact test for a 2x2 contingency table.
 *
 * Uses the hypergeometric distribution with fixed marginals.
 * Two-tailed p-value is computed by summing probabilities of all tables
 * that are as extreme or more extreme than the observed table.
 */
export function fisherExactTest(table: number[][]): FisherExactResult {
  if (!table || table.length !== 2 || !table[0] || table[0].length !== 2 || table[1].length !== 2) {
    throw new Error("Fisher's exact test requires a 2x2 contingency table");
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

  const rowTotals = [a + b, c + d];
  const colTotals = [a + c, b + d];

  // Expected frequencies
  const expected: number[][] = [
    [(rowTotals[0] * colTotals[0]) / n, (rowTotals[0] * colTotals[1]) / n],
    [(rowTotals[1] * colTotals[0]) / n, (rowTotals[1] * colTotals[1]) / n],
  ];

  // Probability of observed table
  const _pObserved = Math.exp(tableLogProb(a, b, c, d));

  // Two-tailed p-value: sum probabilities of all tables with P <= P_observed
  // Fix marginals, vary a from 0 to min(a+b, a+c)
  const aMin = Math.max(0, colTotals[0] - rowTotals[1]); // a >= (a+c) - (c+d) = a - d, but must be >= 0
  const aMax = Math.min(rowTotals[0], colTotals[0]); // a <= min(a+b, a+c)

  let pValue = 0;
  const logPObserved = tableLogProb(a, b, c, d);

  for (let ai = aMin; ai <= aMax; ai++) {
    const bi = rowTotals[0] - ai;
    const ci = colTotals[0] - ai;
    const di = rowTotals[1] - ci;

    if (bi < 0 || ci < 0 || di < 0) continue;

    const logP = tableLogProb(ai, bi, ci, di);
    // Include tables with probability <= observed (within floating-point tolerance)
    if (logP <= logPObserved + 1e-10) {
      pValue += Math.exp(logP);
    }
  }

  // Clamp p-value to [0, 1]
  pValue = Math.min(1, Math.max(0, pValue));

  // Odds ratio: (a*d) / (b*c)
  // Undefined when any marginal total is zero (entire row/column is 0)
  let oddsRatio: number;
  if (rowTotals[0] === 0 || rowTotals[1] === 0 || colTotals[0] === 0 || colTotals[1] === 0) {
    oddsRatio = NaN;
  } else if (b === 0 || c === 0) {
    oddsRatio = Infinity;
  } else if (a === 0 || d === 0) {
    oddsRatio = 0;
  } else {
    oddsRatio = (a * d) / (b * c);
  }

  // 95% CI for odds ratio (Woolf's method with log transform)
  let oddsRatioCI: [number, number] = [0, Infinity];
  if (a > 0 && b > 0 && c > 0 && d > 0) {
    const logOR = Math.log(oddsRatio);
    const se = Math.sqrt(1 / a + 1 / b + 1 / c + 1 / d);
    oddsRatioCI = [
      Math.exp(logOR - 1.96 * se),
      Math.exp(logOR + 1.96 * se),
    ];
  }

  // Phi coefficient
  const denom = Math.sqrt(rowTotals[0] * rowTotals[1] * colTotals[0] * colTotals[1]);
  const phi = denom === 0 ? 0 : (a * d - b * c) / denom;

  // Relative risk: (a/(a+b)) / (c/(c+d))
  let relativeRisk: number;
  if (rowTotals[0] === 0 || rowTotals[1] === 0) {
    relativeRisk = 0;
  } else {
    const risk1 = a / rowTotals[0];
    const risk2 = c / rowTotals[1];
    relativeRisk = risk2 === 0 ? Infinity : risk1 / risk2;
  }

  // 95% CI for relative risk (log-transform method)
  let relativeRiskCI: [number, number] = [0, Infinity];
  if (a > 0 && c > 0 && rowTotals[0] > 0 && rowTotals[1] > 0 && isFinite(relativeRisk) && relativeRisk > 0) {
    const logRR = Math.log(relativeRisk);
    const seLogRR = Math.sqrt(1 / a - 1 / rowTotals[0] + 1 / c - 1 / rowTotals[1]);
    relativeRiskCI = [
      Math.exp(logRR - 1.96 * seLogRR),
      Math.exp(logRR + 1.96 * seLogRR),
    ];
  }

  return {
    pValue,
    oddsRatio,
    oddsRatioCI,
    phi,
    relativeRisk,
    relativeRiskCI,
    observed: [[a, b], [c, d]],
    expected,
    rowTotals,
    colTotals,
    grandTotal: n,
    significant: pValue < 0.05,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  if (p >= 1) return "= 1.000";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatFisherExactAPA(result: FisherExactResult): string {
  const pStr = formatPValue(result.pValue);
  const or = isNaN(result.oddsRatio) ? "undefined" : isFinite(result.oddsRatio) ? result.oddsRatio.toFixed(2) : "\u221E";
  const ciLow = isFinite(result.oddsRatioCI[0]) ? result.oddsRatioCI[0].toFixed(2) : "0.00";
  const ciHigh = isFinite(result.oddsRatioCI[1]) ? result.oddsRatioCI[1].toFixed(2) : "\u221E";
  const rr = isFinite(result.relativeRisk) ? result.relativeRisk.toFixed(2) : "\u221E";
  const rrCiLow = isFinite(result.relativeRiskCI[0]) ? result.relativeRiskCI[0].toFixed(2) : "0.00";
  const rrCiHigh = isFinite(result.relativeRiskCI[1]) ? result.relativeRiskCI[1].toFixed(2) : "\u221E";
  return `Fisher's exact test, p ${pStr}, OR = ${or}, 95% CI [${ciLow}, ${ciHigh}], RR = ${rr}, 95% CI [${rrCiLow}, ${rrCiHigh}]`;
}

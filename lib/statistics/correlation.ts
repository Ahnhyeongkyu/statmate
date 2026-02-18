import jStat from "jstat";
import { validateArray } from "./validation";

export interface CorrelationResult {
  type: "pearson" | "spearman";
  r: number;
  t: number;
  df: number;
  pValue: number;
  ci95: [number, number];
  n: number;
  r2: number;
  significant: boolean;
}

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function rank(arr: number[]): number[] {
  const sorted = arr
    .map((val, idx) => ({ val, idx }))
    .sort((a, b) => a.val - b.val);

  const ranks = new Array<number>(arr.length);
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (j < sorted.length && sorted[j].val === sorted[i].val) {
      j++;
    }
    const avgRank = (i + j + 1) / 2; // 1-based average rank
    for (let k = i; k < j; k++) {
      ranks[sorted[k].idx] = avgRank;
    }
    i = j;
  }
  return ranks;
}

export function pearsonCorrelation(x: number[], y: number[]): CorrelationResult {
  validateArray(x, 3, "X");
  validateArray(y, 3, "Y");
  if (x.length !== y.length) {
    throw new Error("X and Y arrays must have equal length");
  }

  const n = x.length;
  const mx = mean(x);
  const my = mean(y);

  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;
  for (let i = 0; i < n; i++) {
    sumXY += (x[i] - mx) * (y[i] - my);
    sumX2 += (x[i] - mx) ** 2;
    sumY2 += (y[i] - my) ** 2;
  }

  const rRaw = sumXY / Math.sqrt(sumX2 * sumY2);
  // Clamp to [-1, 1] to handle floating-point precision
  const r = Math.max(-1, Math.min(1, rRaw));
  const df = n - 2;

  // Handle perfect correlation: t is infinite, p is 0
  let t: number;
  let pValue: number;
  let ci95: [number, number];

  if (Math.abs(r) >= 1) {
    t = r > 0 ? Infinity : -Infinity;
    pValue = 0;
    ci95 = [r, r];
  } else {
    t = r * Math.sqrt(df / (1 - r * r));
    pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(t), df));

    // Fisher z-transform for CI
    const rClamped = Math.max(-0.9999, Math.min(0.9999, r));
    const z = 0.5 * Math.log((1 + rClamped) / (1 - rClamped));
    const se = 1 / Math.sqrt(n - 3);
    const zLow = z - 1.96 * se;
    const zHigh = z + 1.96 * se;
    ci95 = [
      (Math.exp(2 * zLow) - 1) / (Math.exp(2 * zLow) + 1),
      (Math.exp(2 * zHigh) - 1) / (Math.exp(2 * zHigh) + 1),
    ];
  }

  return {
    type: "pearson",
    r,
    t,
    df,
    pValue,
    ci95,
    n,
    r2: r * r,
    significant: pValue < 0.05,
  };
}

export function spearmanCorrelation(x: number[], y: number[]): CorrelationResult {
  const rankX = rank(x);
  const rankY = rank(y);
  const result = pearsonCorrelation(rankX, rankY);
  return { ...result, type: "spearman" };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  if (p >= 1) return "= 1.000";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatCorrelationAPA(result: CorrelationResult): string {
  const symbol = result.type === "pearson" ? "r" : "r\u209B";
  const rVal = result.r.toFixed(2);
  const pStr = formatPValue(result.pValue);
  return `${symbol}(${result.df}) = ${rVal}, p ${pStr}`;
}

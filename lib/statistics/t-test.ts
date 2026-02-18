import jStat from "jstat";
import { validateArray } from "./validation";

export type TailType = "two" | "greater" | "less";

export interface TTestInput {
  type: "independent" | "paired";
  group1: number[];
  group2: number[];
  alpha?: number;
  tail?: TailType;
}

export interface TTestResult {
  type: "independent" | "paired";
  t: number;
  df: number;
  pValue: number;
  cohensD: number;
  cohensDCI: [number, number];
  ci95: [number, number];
  meanDiff: number;
  group1Stats: { mean: number; sd: number; n: number };
  group2Stats: { mean: number; sd: number; n: number };
  significant: boolean;
  alpha: number;
  tail: TailType;
}

/** Approximate 95% CI for Cohen's d using Hedges & Olkin (1985) formula */
function cohensDCI(d: number, n1: number, n2: number): [number, number] {
  const se = Math.sqrt((n1 + n2) / (n1 * n2) + (d * d) / (2 * (n1 + n2)));
  const z = 1.96;
  return [d - z * se, d + z * se];
}

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function variance(arr: number[]): number {
  const m = mean(arr);
  return arr.reduce((sum, x) => sum + (x - m) ** 2, 0) / (arr.length - 1);
}

function sd(arr: number[]): number {
  return Math.sqrt(variance(arr));
}

function computePValue(tStat: number, df: number, tail: TailType): number {
  if (tail === "two") return 2 * (1 - jStat.studentt.cdf(Math.abs(tStat), df));
  if (tail === "greater") return 1 - jStat.studentt.cdf(tStat, df);
  return jStat.studentt.cdf(tStat, df); // "less"
}

export function independentTTest(group1: number[], group2: number[], alpha = 0.05, tail: TailType = "two"): TTestResult {
  validateArray(group1, 2, "Group 1");
  validateArray(group2, 2, "Group 2");

  const n1 = group1.length;
  const n2 = group2.length;
  const m1 = mean(group1);
  const m2 = mean(group2);
  const s1 = sd(group1);
  const s2 = sd(group2);

  const pooledSE = Math.sqrt(variance(group1) / n1 + variance(group2) / n2);
  if (pooledSE === 0) {
    throw new Error("Cannot compute t-test: both groups have zero variance");
  }
  const t = (m1 - m2) / pooledSE;

  // Welch's df
  const v1 = variance(group1) / n1;
  const v2 = variance(group2) / n2;
  const df = (v1 + v2) ** 2 / (v1 ** 2 / (n1 - 1) + v2 ** 2 / (n2 - 1));

  const pValue = computePValue(t, df, tail);

  // Cohen's d
  const pooledSD = Math.sqrt(
    ((n1 - 1) * variance(group1) + (n2 - 1) * variance(group2)) / (n1 + n2 - 2)
  );
  const cohensD = (m1 - m2) / pooledSD;

  // CI at (1-alpha) level
  const tCrit = jStat.studentt.inv(1 - alpha / 2, df);
  const ci95: [number, number] = [
    (m1 - m2) - tCrit * pooledSE,
    (m1 - m2) + tCrit * pooledSE,
  ];

  return {
    type: "independent",
    t,
    df,
    pValue,
    cohensD,
    cohensDCI: cohensDCI(cohensD, n1, n2),
    ci95,
    meanDiff: m1 - m2,
    group1Stats: { mean: m1, sd: s1, n: n1 },
    group2Stats: { mean: m2, sd: s2, n: n2 },
    significant: pValue < alpha,
    alpha,
    tail,
  };
}

export function pairedTTest(group1: number[], group2: number[], alpha = 0.05, tail: TailType = "two"): TTestResult {
  validateArray(group1, 2, "Group 1");
  validateArray(group2, 2, "Group 2");
  if (group1.length !== group2.length) {
    throw new Error("Paired t-test requires equal sample sizes");
  }

  const n = group1.length;
  const diffs = group1.map((x, i) => x - group2[i]);
  const meanDiff = mean(diffs);
  const sdDiff = sd(diffs);
  const seDiff = sdDiff / Math.sqrt(n);
  if (seDiff === 0) {
    throw new Error("Cannot compute paired t-test: all differences are identical");
  }
  const df = n - 1;
  const t = meanDiff / seDiff;

  const pValue = computePValue(t, df, tail);

  const cohensD = meanDiff / sdDiff;

  const tCrit = jStat.studentt.inv(1 - alpha / 2, df);
  const ci95: [number, number] = [
    meanDiff - tCrit * seDiff,
    meanDiff + tCrit * seDiff,
  ];

  const m1 = mean(group1);
  const m2 = mean(group2);

  return {
    type: "paired",
    t,
    df,
    pValue,
    cohensD,
    cohensDCI: cohensDCI(cohensD, n, n),
    ci95,
    meanDiff,
    group1Stats: { mean: m1, sd: sd(group1), n },
    group2Stats: { mean: m2, sd: sd(group2), n },
    significant: pValue < alpha,
    alpha,
    tail,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  if (p >= 1) return "= 1.000";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatAPA(result: TTestResult): string {
  const tVal = Math.abs(result.t).toFixed(2);
  const dfVal = result.type === "independent"
    ? result.df.toFixed(2)
    : result.df.toString();
  const pStr = formatPValue(result.pValue);
  const dVal = Math.abs(result.cohensD).toFixed(2);
  const tailNote = result.tail !== "two" ? ", one-tailed" : "";
  const dCI = `95% CI [${result.cohensDCI[0].toFixed(2)}, ${result.cohensDCI[1].toFixed(2)}]`;

  return `t(${dfVal}) = ${tVal}, p ${pStr}${tailNote}, d = ${dVal}, ${dCI}`;
}

import jStat from "jstat";

export interface TTestInput {
  type: "independent" | "paired";
  group1: number[];
  group2: number[];
}

export interface TTestResult {
  type: "independent" | "paired";
  t: number;
  df: number;
  pValue: number;
  cohensD: number;
  ci95: [number, number];
  meanDiff: number;
  group1Stats: { mean: number; sd: number; n: number };
  group2Stats: { mean: number; sd: number; n: number };
  significant: boolean;
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

export function independentTTest(group1: number[], group2: number[]): TTestResult {
  const n1 = group1.length;
  const n2 = group2.length;
  const m1 = mean(group1);
  const m2 = mean(group2);
  const s1 = sd(group1);
  const s2 = sd(group2);

  const pooledSE = Math.sqrt(variance(group1) / n1 + variance(group2) / n2);
  const t = (m1 - m2) / pooledSE;

  // Welch's df
  const v1 = variance(group1) / n1;
  const v2 = variance(group2) / n2;
  const df = (v1 + v2) ** 2 / (v1 ** 2 / (n1 - 1) + v2 ** 2 / (n2 - 1));

  const pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(t), df));

  // Cohen's d
  const pooledSD = Math.sqrt(
    ((n1 - 1) * variance(group1) + (n2 - 1) * variance(group2)) / (n1 + n2 - 2)
  );
  const cohensD = (m1 - m2) / pooledSD;

  // 95% CI
  const tCrit = jStat.studentt.inv(0.975, df);
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
    ci95,
    meanDiff: m1 - m2,
    group1Stats: { mean: m1, sd: s1, n: n1 },
    group2Stats: { mean: m2, sd: s2, n: n2 },
    significant: pValue < 0.05,
  };
}

export function pairedTTest(group1: number[], group2: number[]): TTestResult {
  if (group1.length !== group2.length) {
    throw new Error("Paired t-test requires equal sample sizes");
  }

  const n = group1.length;
  const diffs = group1.map((x, i) => x - group2[i]);
  const meanDiff = mean(diffs);
  const sdDiff = sd(diffs);
  const seDiff = sdDiff / Math.sqrt(n);
  const df = n - 1;
  const t = meanDiff / seDiff;

  const pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(t), df));

  const cohensD = meanDiff / sdDiff;

  const tCrit = jStat.studentt.inv(0.975, df);
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
    ci95,
    meanDiff,
    group1Stats: { mean: m1, sd: sd(group1), n },
    group2Stats: { mean: m2, sd: sd(group2), n },
    significant: pValue < 0.05,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatAPA(result: TTestResult): string {
  const tVal = Math.abs(result.t).toFixed(2);
  const dfVal = result.type === "independent"
    ? result.df.toFixed(2)
    : result.df.toString();
  const pStr = formatPValue(result.pValue);
  const dVal = Math.abs(result.cohensD).toFixed(2);

  return `t(${dfVal}) = ${tVal}, p ${pStr}, d = ${dVal}`;
}

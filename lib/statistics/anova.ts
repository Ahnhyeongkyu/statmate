import jStat from "jstat";
import { validateArray } from "./validation";

export interface GroupStats {
  name: string;
  n: number;
  mean: number;
  sd: number;
}

export interface PostHocResult {
  group1: string;
  group2: string;
  meanDiff: number;
  pValue: number;
  significant: boolean;
}

export interface AnovaResult {
  fStatistic: number;
  dfBetween: number;
  dfWithin: number;
  pValue: number;
  etaSquared: number;
  ssBetween: number;
  ssWithin: number;
  ssTotal: number;
  msBetween: number;
  msWithin: number;
  grandMean: number;
  groupStats: GroupStats[];
  postHoc: PostHocResult[];
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

export function oneWayAnova(
  groups: number[][],
  groupNames?: string[]
): AnovaResult {
  if (!groups || groups.length < 2) {
    throw new Error("Need at least 2 groups for ANOVA");
  }
  for (let i = 0; i < groups.length; i++) {
    validateArray(groups[i], 2, `Group ${i + 1}`);
  }

  const k = groups.length;
  const names = groupNames || groups.map((_, i) => `Group ${i + 1}`);
  const allData = groups.flat();
  const N = allData.length;

  if (N <= k) {
    throw new Error(`Need more than ${k} total observations for ${k} groups`);
  }

  const grandMean = mean(allData);

  // Sum of squares
  let ssBetween = 0;
  let ssWithin = 0;
  for (const group of groups) {
    const gMean = mean(group);
    ssBetween += group.length * (gMean - grandMean) ** 2;
    for (const x of group) {
      ssWithin += (x - gMean) ** 2;
    }
  }
  const ssTotal = ssBetween + ssWithin;

  const dfBetween = k - 1;
  const dfWithin = N - k;
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  const fStatistic = msBetween / msWithin;

  const pValue = 1 - jStat.centralF.cdf(fStatistic, dfBetween, dfWithin);
  const etaSquared = ssBetween / ssTotal;

  // Group statistics
  const groupStats: GroupStats[] = groups.map((g, i) => ({
    name: names[i],
    n: g.length,
    mean: mean(g),
    sd: sd(g),
  }));

  // Post-hoc: Pairwise t-tests with Holm-Bonferroni correction
  const rawPairs: { group1: string; group2: string; meanDiff: number; rawP: number }[] = [];
  const numComparisons = (k * (k - 1)) / 2;

  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const mi = mean(groups[i]);
      const mj = mean(groups[j]);
      const ni = groups[i].length;
      const nj = groups[j].length;

      const se = Math.sqrt(msWithin * (1 / ni + 1 / nj));
      const tVal = Math.abs(mi - mj) / se;
      const dfPair = dfWithin;

      const rawP = 2 * (1 - jStat.studentt.cdf(tVal, dfPair));
      rawPairs.push({ group1: names[i], group2: names[j], meanDiff: mi - mj, rawP });
    }
  }

  // Holm-Bonferroni step-down: sort by raw p ascending, multiply by (m - rank + 1)
  const sorted = [...rawPairs].sort((a, b) => a.rawP - b.rawP);
  const adjustedP = new Array(sorted.length);
  for (let i = 0; i < sorted.length; i++) {
    adjustedP[i] = Math.min(sorted[i].rawP * (numComparisons - i), 1);
  }
  // Enforce monotonicity: adjusted p can only increase
  for (let i = 1; i < adjustedP.length; i++) {
    if (adjustedP[i] < adjustedP[i - 1]) adjustedP[i] = adjustedP[i - 1];
  }

  const postHoc: PostHocResult[] = sorted.map((pair, i) => ({
    group1: pair.group1,
    group2: pair.group2,
    meanDiff: pair.meanDiff,
    pValue: adjustedP[i],
    significant: adjustedP[i] < 0.05,
  }));

  return {
    fStatistic,
    dfBetween,
    dfWithin,
    pValue,
    etaSquared,
    ssBetween,
    ssWithin,
    ssTotal,
    msBetween,
    msWithin,
    grandMean,
    groupStats,
    postHoc,
    significant: pValue < 0.05,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  if (p >= 1) return "= 1.000";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatAnovaAPA(result: AnovaResult): string {
  const f = result.fStatistic.toFixed(2);
  const pStr = formatPValue(result.pValue);
  const eta = result.etaSquared.toFixed(2);
  return `F(${result.dfBetween}, ${result.dfWithin}) = ${f}, p ${pStr}, \u03B7\u00B2 = ${eta}`;
}

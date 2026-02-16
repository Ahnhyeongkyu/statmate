import jStat from "jstat";

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
  const k = groups.length;
  const names = groupNames || groups.map((_, i) => `Group ${i + 1}`);
  const allData = groups.flat();
  const N = allData.length;
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

  // Post-hoc: Tukey HSD-like pairwise comparisons (using Bonferroni correction)
  const postHoc: PostHocResult[] = [];
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

      let pPair = 2 * (1 - jStat.studentt.cdf(tVal, dfPair));
      // Bonferroni correction
      pPair = Math.min(pPair * numComparisons, 1);

      postHoc.push({
        group1: names[i],
        group2: names[j],
        meanDiff: mi - mj,
        pValue: pPair,
        significant: pPair < 0.05,
      });
    }
  }

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
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatAnovaAPA(result: AnovaResult): string {
  const f = result.fStatistic.toFixed(2);
  const pStr = formatPValue(result.pValue);
  const eta = result.etaSquared.toFixed(2);
  return `F(${result.dfBetween}, ${result.dfWithin}) = ${f}, p ${pStr}, \u03B7\u00B2 = ${eta}`;
}

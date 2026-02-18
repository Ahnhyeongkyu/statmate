import jStat from "jstat";
import { validateArray } from "./validation";

export interface KruskalWallisGroupStats {
  name: string;
  n: number;
  median: number;
  meanRank: number;
}

export interface KruskalWallisPostHoc {
  group1: string;
  group2: string;
  z: number;
  pValue: number;
  significant: boolean;
}

export interface KruskalWallisResult {
  hStatistic: number;
  df: number;
  pValue: number;
  etaSquaredH: number;
  effectSizeLabel: string;
  groupStats: KruskalWallisGroupStats[];
  postHoc: KruskalWallisPostHoc[];
  significant: boolean;
}

function assignRanks(combined: { value: number; group: number }[]): number[] {
  const sorted = combined
    .map((item, idx) => ({ ...item, origIdx: idx }))
    .sort((a, b) => a.value - b.value);

  const ranks = new Array(sorted.length);
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (j < sorted.length && sorted[j].value === sorted[i].value) {
      j++;
    }
    const avgRank = (i + 1 + j) / 2;
    for (let k = i; k < j; k++) {
      ranks[sorted[k].origIdx] = avgRank;
    }
    i = j;
  }
  return ranks;
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function kruskalWallis(
  groups: number[][],
  groupNames?: string[]
): KruskalWallisResult {
  if (!groups || groups.length < 3) {
    throw new Error("Need at least 3 groups for Kruskal-Wallis test");
  }
  for (let i = 0; i < groups.length; i++) {
    validateArray(groups[i], 2, `Group ${i + 1}`);
  }

  const k = groups.length;
  const names = groupNames || groups.map((_, i) => `Group ${i + 1}`);
  const N = groups.reduce((sum, g) => sum + g.length, 0);

  // Combine all groups and assign ranks
  const combined: { value: number; group: number }[] = [];
  for (let i = 0; i < k; i++) {
    for (const v of groups[i]) {
      combined.push({ value: v, group: i });
    }
  }
  const ranks = assignRanks(combined);

  // Compute rank sums per group
  const rankSums: number[] = new Array(k).fill(0);
  let idx = 0;
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < groups[i].length; j++) {
      rankSums[i] += ranks[idx];
      idx++;
    }
  }

  // Compute tie correction factor
  // C = 1 - sum(t_j^3 - t_j) / (N^3 - N)  where t_j = # tied obs in group j
  let tieSum = 0;
  {
    const sorted = [...combined].sort((a, b) => a.value - b.value);
    let ti = 0;
    while (ti < sorted.length) {
      let tj = ti;
      while (tj < sorted.length && sorted[tj].value === sorted[ti].value) tj++;
      const t = tj - ti;
      if (t > 1) tieSum += t * t * t - t;
      ti = tj;
    }
  }
  const tieCorrection = 1 - tieSum / (N * N * N - N);

  // H statistic: H = (12 / (N*(N+1))) * Sum(Ri^2/ni) - 3*(N+1)
  let sumTerm = 0;
  for (let i = 0; i < k; i++) {
    const ni = groups[i].length;
    sumTerm += (rankSums[i] * rankSums[i]) / ni;
  }
  const hRaw = (12 / (N * (N + 1))) * sumTerm - 3 * (N + 1);
  // Apply tie correction (if no ties, tieCorrection = 1)
  const hStatistic = tieCorrection > 0 ? hRaw / tieCorrection : hRaw;

  const df = k - 1;
  const pValue = 1 - jStat.chisquare.cdf(hStatistic, df);

  // Effect size: eta-squared H = (H - k + 1) / (N - k)
  const etaSquaredH = (N - k) > 0 ? (hStatistic - k + 1) / (N - k) : 0;
  const clampedEta = Math.max(0, etaSquaredH);

  let effectSizeLabel: string;
  if (clampedEta < 0.01) effectSizeLabel = "negligible";
  else if (clampedEta < 0.06) effectSizeLabel = "small";
  else if (clampedEta < 0.14) effectSizeLabel = "medium";
  else effectSizeLabel = "large";

  // Group statistics
  const groupStats: KruskalWallisGroupStats[] = groups.map((g, i) => ({
    name: names[i],
    n: g.length,
    median: median(g),
    meanRank: rankSums[i] / g.length,
  }));

  // Dunn's post-hoc with Bonferroni correction
  const postHoc: KruskalWallisPostHoc[] = [];
  const numComparisons = (k * (k - 1)) / 2;

  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const meanRankI = rankSums[i] / groups[i].length;
      const meanRankJ = rankSums[j] / groups[j].length;
      const ni = groups[i].length;
      const nj = groups[j].length;

      // Dunn's SE with tie correction
      const se = Math.sqrt(((N * (N + 1) / 12 - tieSum / (12 * (N - 1))) * (1 / ni + 1 / nj)));
      const z = se === 0 ? 0 : (meanRankI - meanRankJ) / se;
      let pPair = 2 * (1 - jStat.normal.cdf(Math.abs(z), 0, 1));
      // Bonferroni correction
      pPair = Math.min(pPair * numComparisons, 1);

      postHoc.push({
        group1: names[i],
        group2: names[j],
        z,
        pValue: pPair,
        significant: pPair < 0.05,
      });
    }
  }

  return {
    hStatistic,
    df,
    pValue: Math.min(pValue, 1),
    etaSquaredH: clampedEta,
    effectSizeLabel,
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

export function formatKruskalWallisAPA(result: KruskalWallisResult): string {
  const h = result.hStatistic.toFixed(2);
  const pStr = formatPValue(result.pValue);
  const eta = result.etaSquaredH.toFixed(2);
  return `H(${result.df}) = ${h}, p ${pStr}, \u03B7\u00B2H = ${eta}`;
}

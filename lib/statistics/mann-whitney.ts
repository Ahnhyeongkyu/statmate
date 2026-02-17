import jStat from "jstat";

export interface MannWhitneyInput {
  group1: number[];
  group2: number[];
}

export interface MannWhitneyResult {
  n1: number;
  n2: number;
  u1: number;
  u2: number;
  uMin: number;
  z: number;
  pValue: number;
  rankBiserialR: number;
  effectSizeLabel: string;
  median1: number;
  median2: number;
  meanRank1: number;
  meanRank2: number;
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

export function mannWhitneyU(input: MannWhitneyInput): MannWhitneyResult {
  const { group1, group2 } = input;
  const n1 = group1.length;
  const n2 = group2.length;

  if (n1 < 2 || n2 < 2)
    throw new Error("Each group needs at least 2 values");

  const combined = [
    ...group1.map((v) => ({ value: v, group: 1 })),
    ...group2.map((v) => ({ value: v, group: 2 })),
  ];
  const ranks = assignRanks(combined);

  const r1Sum = ranks.slice(0, n1).reduce((a, b) => a + b, 0);
  const r2Sum = ranks.slice(n1).reduce((a, b) => a + b, 0);

  const u1 = r1Sum - (n1 * (n1 + 1)) / 2;
  const u2 = r2Sum - (n2 * (n2 + 1)) / 2;
  const uMin = Math.min(u1, u2);

  // Normal approximation with continuity correction
  const mu = (n1 * n2) / 2;
  const sigma = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12);
  const z = sigma === 0 ? 0 : (uMin - mu + 0.5) / sigma;
  const pValue = 2 * jStat.normal.cdf(z, 0, 1);

  // Rank-biserial correlation as effect size
  const rankBiserialR = 1 - (2 * uMin) / (n1 * n2);

  let effectSizeLabel: string;
  const absR = Math.abs(rankBiserialR);
  if (absR < 0.1) effectSizeLabel = "negligible";
  else if (absR < 0.3) effectSizeLabel = "small";
  else if (absR < 0.5) effectSizeLabel = "medium";
  else effectSizeLabel = "large";

  const meanRank1 = r1Sum / n1;
  const meanRank2 = r2Sum / n2;

  return {
    n1,
    n2,
    u1,
    u2,
    uMin,
    z,
    pValue: Math.min(pValue, 1),
    rankBiserialR,
    effectSizeLabel,
    median1: median(group1),
    median2: median(group2),
    meanRank1,
    meanRank2,
  };
}

export function formatMannWhitneyAPA(result: MannWhitneyResult): string {
  const pStr =
    result.pValue < 0.001
      ? "< .001"
      : `= ${result.pValue.toFixed(3).replace(/^0/, "")}`;
  return (
    `A Mann-Whitney U test indicated that the distribution of scores ` +
    `for Group 1 (Mdn = ${result.median1.toFixed(2)}, n = ${result.n1}) ` +
    `${result.pValue < 0.05 ? "was" : "was not"} significantly different from ` +
    `Group 2 (Mdn = ${result.median2.toFixed(2)}, n = ${result.n2}), ` +
    `U = ${result.uMin.toFixed(1)}, z = ${result.z.toFixed(2)}, p ${pStr}, ` +
    `r = ${result.rankBiserialR.toFixed(2)}.`
  );
}

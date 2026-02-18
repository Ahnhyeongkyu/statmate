import jStat from "jstat";
import { validateArray } from "./validation";

export interface FriedmanConditionStats {
  name: string;
  n: number;
  median: number;
  meanRank: number;
}

export interface FriedmanPostHoc {
  condition1: string;
  condition2: string;
  z: number;
  pValue: number;
  significant: boolean;
}

export interface FriedmanResult {
  chiSquare: number;
  df: number;
  pValue: number;
  kendallW: number;
  effectSizeLabel: string;
  n: number;
  k: number;
  conditionStats: FriedmanConditionStats[];
  postHoc: FriedmanPostHoc[];
  significant: boolean;
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Rank values within a single row (subject), handling ties with average ranks.
 */
function rankRow(row: number[]): number[] {
  const indexed = row.map((value, idx) => ({ value, origIdx: idx }));
  indexed.sort((a, b) => a.value - b.value);

  const ranks = new Array(row.length);
  let i = 0;
  while (i < indexed.length) {
    let j = i;
    while (j < indexed.length && indexed[j].value === indexed[i].value) {
      j++;
    }
    const avgRank = (i + 1 + j) / 2;
    for (let k = i; k < j; k++) {
      ranks[indexed[k].origIdx] = avgRank;
    }
    i = j;
  }
  return ranks;
}

export function friedmanTest(
  conditions: number[][],
  conditionNames?: string[]
): FriedmanResult {
  if (!conditions || conditions.length < 3) {
    throw new Error("Need at least 3 conditions for Friedman test");
  }

  const k = conditions.length;
  const n = conditions[0].length;
  const names = conditionNames || conditions.map((_, i) => `Condition ${i + 1}`);

  // Validate all conditions have equal length
  for (let i = 0; i < k; i++) {
    validateArray(conditions[i], 2, names[i]);
    if (conditions[i].length !== n) {
      throw new Error(
        `All conditions must have the same number of subjects. ` +
        `${names[i]} has ${conditions[i].length}, expected ${n}.`
      );
    }
  }

  if (n < 3) {
    throw new Error("Need at least 3 subjects (paired observations)");
  }

  // For each subject (row), rank across conditions
  // conditions[j][i] = value for subject i in condition j
  // We need to rank across conditions for each subject

  const rankSums: number[] = new Array(k).fill(0);

  for (let i = 0; i < n; i++) {
    // Get values for subject i across all conditions
    const row = conditions.map((cond) => cond[i]);
    const ranks = rankRow(row);
    for (let j = 0; j < k; j++) {
      rankSums[j] += ranks[j];
    }
  }

  // Friedman chi-square: chi2r = (12 / (n*k*(k+1))) * Sum(Rj^2) - 3*n*(k+1)
  let sumRjSquared = 0;
  for (let j = 0; j < k; j++) {
    sumRjSquared += rankSums[j] * rankSums[j];
  }
  const chiSquare = (12 / (n * k * (k + 1))) * sumRjSquared - 3 * n * (k + 1);

  const df = k - 1;
  const pValue = 1 - jStat.chisquare.cdf(chiSquare, df);

  // Kendall's W = chi2r / (n * (k - 1))
  const kendallW = (k - 1) > 0 ? chiSquare / (n * (k - 1)) : 0;
  const clampedW = Math.max(0, Math.min(1, kendallW));

  let effectSizeLabel: string;
  if (clampedW < 0.1) effectSizeLabel = "negligible";
  else if (clampedW < 0.3) effectSizeLabel = "small";
  else if (clampedW < 0.5) effectSizeLabel = "medium";
  else effectSizeLabel = "large";

  // Condition statistics
  const conditionStats: FriedmanConditionStats[] = conditions.map((cond, j) => ({
    name: names[j],
    n: cond.length,
    median: median(cond),
    meanRank: rankSums[j] / n,
  }));

  // Post-hoc: Nemenyi-like pairwise comparisons with Bonferroni correction
  const postHoc: FriedmanPostHoc[] = [];
  const numComparisons = (k * (k - 1)) / 2;
  const se = Math.sqrt((k * (k + 1)) / (6 * n));

  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const meanRankI = rankSums[i] / n;
      const meanRankJ = rankSums[j] / n;
      const z = se === 0 ? 0 : (meanRankI - meanRankJ) / se;
      let pPair = 2 * (1 - jStat.normal.cdf(Math.abs(z), 0, 1));
      // Bonferroni correction
      pPair = Math.min(pPair * numComparisons, 1);

      postHoc.push({
        condition1: names[i],
        condition2: names[j],
        z,
        pValue: pPair,
        significant: pPair < 0.05,
      });
    }
  }

  return {
    chiSquare,
    df,
    pValue: Math.min(pValue, 1),
    kendallW: clampedW,
    effectSizeLabel,
    n,
    k,
    conditionStats,
    postHoc,
    significant: pValue < 0.05,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatFriedmanAPA(result: FriedmanResult): string {
  const chi = result.chiSquare.toFixed(2);
  const pStr = formatPValue(result.pValue);
  const w = result.kendallW.toFixed(2);
  return `\u03C7\u00B2(${result.df}) = ${chi}, p ${pStr}, W = ${w}`;
}

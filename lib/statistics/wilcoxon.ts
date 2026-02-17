import jStat from "jstat";

export interface WilcoxonInput {
  pre: number[];
  post: number[];
}

export interface WilcoxonResult {
  n: number;
  nExcluded: number;
  nEffective: number;
  wPlus: number;
  wMinus: number;
  wStat: number;
  z: number;
  pValue: number;
  rankBiserialR: number;
  effectSizeLabel: string;
  medianPre: number;
  medianPost: number;
  medianDiff: number;
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function wilcoxonSignedRank(input: WilcoxonInput): WilcoxonResult {
  const { pre, post } = input;

  if (pre.length !== post.length)
    throw new Error("Pre and post arrays must have equal length");
  if (pre.length < 5)
    throw new Error("Need at least 5 paired observations");

  const n = pre.length;

  // Compute differences, exclude zeros
  const diffs: { diff: number; absDiff: number }[] = [];
  let nExcluded = 0;
  for (let i = 0; i < n; i++) {
    const diff = post[i] - pre[i];
    if (diff === 0) {
      nExcluded++;
      continue;
    }
    diffs.push({ diff, absDiff: Math.abs(diff) });
  }

  const nEffective = diffs.length;
  if (nEffective < 3)
    throw new Error("Need at least 3 non-zero differences");

  // Rank absolute differences with tie handling
  const sorted = diffs
    .map((d, idx) => ({ ...d, origIdx: idx }))
    .sort((a, b) => a.absDiff - b.absDiff);

  const ranks = new Array(nEffective);
  let i = 0;
  while (i < nEffective) {
    let j = i;
    while (j < nEffective && sorted[j].absDiff === sorted[i].absDiff) {
      j++;
    }
    const avgRank = (i + 1 + j) / 2;
    for (let k = i; k < j; k++) {
      ranks[sorted[k].origIdx] = avgRank;
    }
    i = j;
  }

  // Sum positive and negative ranks
  let wPlus = 0;
  let wMinus = 0;
  for (let idx = 0; idx < nEffective; idx++) {
    if (diffs[idx].diff > 0) wPlus += ranks[idx];
    else wMinus += ranks[idx];
  }

  const wStat = Math.min(wPlus, wMinus);

  // Normal approximation
  const mu = (nEffective * (nEffective + 1)) / 4;
  const sigma = Math.sqrt(
    (nEffective * (nEffective + 1) * (2 * nEffective + 1)) / 24
  );
  const z = sigma === 0 ? 0 : (wStat - mu + 0.5) / sigma;
  const pValue = 2 * jStat.normal.cdf(z, 0, 1);

  // Rank-biserial correlation
  const rankBiserialR = (wPlus - wMinus) / ((nEffective * (nEffective + 1)) / 2);

  let effectSizeLabel: string;
  const absR = Math.abs(rankBiserialR);
  if (absR < 0.1) effectSizeLabel = "negligible";
  else if (absR < 0.3) effectSizeLabel = "small";
  else if (absR < 0.5) effectSizeLabel = "medium";
  else effectSizeLabel = "large";

  const diffArr = pre.map((v, idx) => post[idx] - v);

  return {
    n,
    nExcluded,
    nEffective,
    wPlus,
    wMinus,
    wStat,
    z,
    pValue: Math.min(pValue, 1),
    rankBiserialR,
    effectSizeLabel,
    medianPre: median(pre),
    medianPost: median(post),
    medianDiff: median(diffArr),
  };
}

export function formatWilcoxonAPA(result: WilcoxonResult): string {
  const pStr =
    result.pValue < 0.001
      ? "< .001"
      : `= ${result.pValue.toFixed(3).replace(/^0/, "")}`;
  return (
    `A Wilcoxon signed-rank test indicated that the post-test scores ` +
    `(Mdn = ${result.medianPost.toFixed(2)}) were ` +
    `${result.pValue < 0.05 ? "" : "not "}significantly different from ` +
    `pre-test scores (Mdn = ${result.medianPre.toFixed(2)}), ` +
    `W = ${result.wStat.toFixed(1)}, z = ${result.z.toFixed(2)}, p ${pStr}, ` +
    `r = ${result.rankBiserialR.toFixed(2)}.`
  );
}

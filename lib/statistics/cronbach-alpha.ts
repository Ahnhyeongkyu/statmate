import { validateMatrix } from "./validation";

export interface ItemStatistics {
  name: string;
  mean: number;
  sd: number;
  correctedItemTotalR: number;
  alphaIfDeleted: number;
}

export interface CronbachAlphaResult {
  alpha: number;
  interpretation: string;
  nItems: number;
  nCases: number;
  scaleMean: number;
  scaleVariance: number;
  itemStats: ItemStatistics[];
  splitHalfReliability: number;
  spearmanBrownReliability: number;
  standardizedAlpha: number;
}

// --- Helper functions ---

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

function pearsonR(x: number[], y: number[]): number {
  const n = x.length;
  if (n < 2) return 0;
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
  const denom = Math.sqrt(sumX2 * sumY2);
  if (denom === 0) return 0;
  return Math.max(-1, Math.min(1, sumXY / denom));
}

function getColumn(data: number[][], j: number): number[] {
  return data.map((row) => row[j]);
}

function interpretAlpha(alpha: number): string {
  if (alpha >= 0.9) return "Excellent";
  if (alpha >= 0.8) return "Good";
  if (alpha >= 0.7) return "Acceptable";
  if (alpha >= 0.6) return "Questionable";
  if (alpha >= 0.5) return "Poor";
  return "Unacceptable";
}

// --- Main function ---

/**
 * Compute Cronbach's Alpha and related reliability statistics.
 * @param data data[i][j]: i = participant (case), j = item
 */
export function cronbachAlpha(data: number[][]): CronbachAlphaResult {
  validateMatrix(data, 3, 2, "Data");
  const nCases = data.length;
  const nItems = data[0].length;

  const k = nItems;

  // Item means and SDs
  const itemMeans: number[] = [];
  const itemSds: number[] = [];
  const itemVariances: number[] = [];
  for (let j = 0; j < k; j++) {
    const col = getColumn(data, j);
    itemMeans.push(mean(col));
    itemSds.push(sd(col));
    itemVariances.push(variance(col));
  }

  // Total scores per case
  const totalScores = data.map((row) => row.reduce((a, b) => a + b, 0));
  const totalVariance = variance(totalScores);
  const scaleMean = mean(totalScores);
  const scaleVariance = totalVariance;

  // Sum of item variances
  const sumItemVariances = itemVariances.reduce((a, b) => a + b, 0);

  // Cronbach's Alpha
  const alpha = totalVariance === 0 ? 0 : (k / (k - 1)) * (1 - sumItemVariances / totalVariance);

  // Item statistics: corrected item-total correlation and alpha-if-deleted
  const itemStats: ItemStatistics[] = [];

  for (let j = 0; j < k; j++) {
    const col = getColumn(data, j);

    // Corrected item-total: correlation of item with rest-score (total minus item)
    const restScores = totalScores.map((total, i) => total - data[i][j]);
    const correctedItemTotalR = pearsonR(col, restScores);

    // Alpha if deleted: remove item j, recalculate alpha
    const kReduced = k - 1;
    if (kReduced < 1) {
      itemStats.push({
        name: `Item ${j + 1}`,
        mean: itemMeans[j],
        sd: itemSds[j],
        correctedItemTotalR,
        alphaIfDeleted: 0,
      });
      continue;
    }

    const sumVarReduced = sumItemVariances - itemVariances[j];
    const totalReduced = totalScores.map((total, i) => total - data[i][j]);
    const varReduced = variance(totalReduced);
    const alphaIfDeleted = varReduced > 0
      ? (kReduced / (kReduced - 1)) * (1 - sumVarReduced / varReduced)
      : 0;

    itemStats.push({
      name: `Item ${j + 1}`,
      mean: itemMeans[j],
      sd: itemSds[j],
      correctedItemTotalR,
      alphaIfDeleted: kReduced > 1 ? alphaIfDeleted : 0,
    });
  }

  // Split-half reliability: odd vs even items
  const oddScores: number[] = [];
  const evenScores: number[] = [];
  for (let i = 0; i < nCases; i++) {
    let oddSum = 0;
    let evenSum = 0;
    for (let j = 0; j < k; j++) {
      if (j % 2 === 0) {
        oddSum += data[i][j]; // 0-indexed: items 0, 2, 4... are "odd" items (1st, 3rd, 5th...)
      } else {
        evenSum += data[i][j];
      }
    }
    oddScores.push(oddSum);
    evenScores.push(evenSum);
  }
  const splitHalfR = pearsonR(oddScores, evenScores);
  const splitHalfReliability = splitHalfR;

  // Spearman-Brown prophecy formula
  const spearmanBrownReliability = (2 * splitHalfR) / (1 + splitHalfR);

  // Standardized alpha: based on average inter-item correlation
  let sumR = 0;
  let countR = 0;
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      sumR += pearsonR(getColumn(data, i), getColumn(data, j));
      countR++;
    }
  }
  const rBar = countR > 0 ? sumR / countR : 0;
  const standardizedAlpha = (k * rBar) / (1 + (k - 1) * rBar);

  return {
    alpha,
    interpretation: interpretAlpha(alpha),
    nItems: k,
    nCases,
    scaleMean,
    scaleVariance,
    itemStats,
    splitHalfReliability,
    spearmanBrownReliability,
    standardizedAlpha,
  };
}

/**
 * Format Cronbach's Alpha result in APA style.
 */
export function formatCronbachAlphaAPA(result: CronbachAlphaResult): string {
  const alpha = result.alpha.toFixed(2);
  return `Cronbach's \u03B1 = ${alpha}, ${result.nItems} items, N = ${result.nCases}`;
}

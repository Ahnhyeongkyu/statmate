export interface DescriptiveResult {
  n: number;
  mean: number;
  median: number;
  mode: number[];
  sd: number;
  variance: number;
  se: number;
  min: number;
  max: number;
  range: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
  ci95: [number, number];
}

function sortedArr(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function median(arr: number[]): number {
  const sorted = sortedArr(arr);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function mode(arr: number[]): number[] {
  const freq = new Map<number, number>();
  arr.forEach((x) => freq.set(x, (freq.get(x) || 0) + 1));
  const maxFreq = Math.max(...freq.values());
  if (maxFreq === 1) return [];
  return [...freq.entries()]
    .filter(([, count]) => count === maxFreq)
    .map(([val]) => val);
}

function variance(arr: number[]): number {
  const m = mean(arr);
  return arr.reduce((sum, x) => sum + (x - m) ** 2, 0) / (arr.length - 1);
}

function sd(arr: number[]): number {
  return Math.sqrt(variance(arr));
}

function quantile(arr: number[], q: number): number {
  const sorted = sortedArr(arr);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

function skewness(arr: number[]): number {
  const n = arr.length;
  const m = mean(arr);
  const s = sd(arr);
  const sum = arr.reduce((acc, x) => acc + ((x - m) / s) ** 3, 0);
  return (n / ((n - 1) * (n - 2))) * sum;
}

function kurtosis(arr: number[]): number {
  const n = arr.length;
  const m = mean(arr);
  const s = sd(arr);
  const sum = arr.reduce((acc, x) => acc + ((x - m) / s) ** 4, 0);
  const k = ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sum;
  return k - (3 * (n - 1) ** 2) / ((n - 2) * (n - 3));
}

export function descriptiveStats(data: number[]): DescriptiveResult {
  const n = data.length;
  const m = mean(data);
  const s = sd(data);
  const se = s / Math.sqrt(n);

  // 95% CI using t-distribution approximation
  const tCrit = 1.96; // approximate for large n
  const ci95: [number, number] = [m - tCrit * se, m + tCrit * se];

  return {
    n,
    mean: m,
    median: median(data),
    mode: mode(data),
    sd: s,
    variance: variance(data),
    se,
    min: Math.min(...data),
    max: Math.max(...data),
    range: Math.max(...data) - Math.min(...data),
    q1: quantile(data, 0.25),
    q3: quantile(data, 0.75),
    iqr: quantile(data, 0.75) - quantile(data, 0.25),
    skewness: n >= 3 ? skewness(data) : 0,
    kurtosis: n >= 4 ? kurtosis(data) : 0,
    ci95,
  };
}

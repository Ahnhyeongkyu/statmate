import jStat from "jstat";

export interface ChiSquareIndependenceResult {
  type: "independence";
  chiSquare: number;
  df: number;
  pValue: number;
  cramersV: number;
  observed: number[][];
  expected: number[][];
  rowTotals: number[];
  colTotals: number[];
  grandTotal: number;
  rows: number;
  cols: number;
  significant: boolean;
}

export interface ChiSquareGoodnessResult {
  type: "goodness";
  chiSquare: number;
  df: number;
  pValue: number;
  observed: number[];
  expected: number[];
  total: number;
  significant: boolean;
}

export type ChiSquareResult = ChiSquareIndependenceResult | ChiSquareGoodnessResult;

export function chiSquareIndependence(observed: number[][]): ChiSquareIndependenceResult {
  const rows = observed.length;
  const cols = observed[0].length;

  const rowTotals = observed.map((row) => row.reduce((a, b) => a + b, 0));
  const colTotals: number[] = [];
  for (let j = 0; j < cols; j++) {
    colTotals.push(observed.reduce((sum, row) => sum + row[j], 0));
  }
  const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

  // Expected frequencies
  const expected: number[][] = [];
  for (let i = 0; i < rows; i++) {
    expected.push([]);
    for (let j = 0; j < cols; j++) {
      expected[i].push((rowTotals[i] * colTotals[j]) / grandTotal);
    }
  }

  // Chi-square statistic
  let chiSquare = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      chiSquare += (observed[i][j] - expected[i][j]) ** 2 / expected[i][j];
    }
  }

  const df = (rows - 1) * (cols - 1);
  const pValue = 1 - jStat.chisquare.cdf(chiSquare, df);

  // Cramer's V
  const minDim = Math.min(rows, cols) - 1;
  const cramersV = Math.sqrt(chiSquare / (grandTotal * minDim));

  return {
    type: "independence",
    chiSquare,
    df,
    pValue,
    cramersV,
    observed,
    expected,
    rowTotals,
    colTotals,
    grandTotal,
    rows,
    cols,
    significant: pValue < 0.05,
  };
}

export function chiSquareGoodness(
  observed: number[],
  expected?: number[]
): ChiSquareGoodnessResult {
  const total = observed.reduce((a, b) => a + b, 0);
  const k = observed.length;

  // If no expected provided, assume equal distribution
  const exp = expected || observed.map(() => total / k);

  let chiSquare = 0;
  for (let i = 0; i < k; i++) {
    chiSquare += (observed[i] - exp[i]) ** 2 / exp[i];
  }

  const df = k - 1;
  const pValue = 1 - jStat.chisquare.cdf(chiSquare, df);

  return {
    type: "goodness",
    chiSquare,
    df,
    pValue,
    observed,
    expected: exp,
    total,
    significant: pValue < 0.05,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatChiSquareAPA(result: ChiSquareResult): string {
  const chi = result.chiSquare.toFixed(2);
  const pStr = formatPValue(result.pValue);

  if (result.type === "independence") {
    const n = result.grandTotal;
    return `\u03C7\u00B2(${result.df}, N = ${n}) = ${chi}, p ${pStr}, V = ${result.cramersV.toFixed(2)}`;
  }
  return `\u03C7\u00B2(${result.df}) = ${chi}, p ${pStr}`;
}

/**
 * Shared matrix utilities for multiple regression and logistic regression.
 * Matrices are represented as number[][] (row-major).
 */

export type Matrix = number[][];

export function zeros(rows: number, cols: number): Matrix {
  return Array.from({ length: rows }, () => new Array(cols).fill(0));
}

export function identity(n: number): Matrix {
  const m = zeros(n, n);
  for (let i = 0; i < n; i++) m[i][i] = 1;
  return m;
}

export function transpose(A: Matrix): Matrix {
  const rows = A.length, cols = A[0].length;
  const T = zeros(cols, rows);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      T[j][i] = A[i][j];
  return T;
}

export function multiply(A: Matrix, B: Matrix): Matrix {
  const m = A.length, k = A[0].length, n = B[0].length;
  const C = zeros(m, n);
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let p = 0; p < k; p++) sum += A[i][p] * B[p][j];
      C[i][j] = sum;
    }
  return C;
}

export function multiplyVec(A: Matrix, v: number[]): number[] {
  const m = A.length, k = A[0].length;
  const result = new Array(m).fill(0);
  for (let i = 0; i < m; i++)
    for (let j = 0; j < k; j++)
      result[i] += A[i][j] * v[j];
  return result;
}

/** Gauss-Jordan elimination with partial pivoting. Throws if singular. */
export function invert(A: Matrix): Matrix {
  const n = A.length;
  // Augment [A | I]
  const aug: number[][] = A.map((row, i) => {
    const r = [...row];
    for (let j = 0; j < n; j++) r.push(i === j ? 1 : 0);
    return r;
  });

  for (let col = 0; col < n; col++) {
    // Partial pivoting: find max |value| in column below current row
    let maxRow = col, maxVal = Math.abs(aug[col][col]);
    for (let row = col + 1; row < n; row++) {
      const v = Math.abs(aug[row][col]);
      if (v > maxVal) { maxVal = v; maxRow = row; }
    }
    if (maxVal < 1e-12) throw new Error("Singular matrix");
    if (maxRow !== col) [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];

    // Scale pivot row
    const pivot = aug[col][col];
    for (let j = 0; j < 2 * n; j++) aug[col][j] /= pivot;

    // Eliminate column in all other rows
    for (let row = 0; row < n; row++) {
      if (row === col) continue;
      const factor = aug[row][col];
      for (let j = 0; j < 2 * n; j++) aug[row][j] -= factor * aug[col][j];
    }
  }

  return aug.map(row => row.slice(n));
}

export function diag(A: Matrix): number[] {
  return A.map((row, i) => row[i]);
}

export function diagMatrix(v: number[]): Matrix {
  const n = v.length;
  const m = zeros(n, n);
  for (let i = 0; i < n; i++) m[i][i] = v[i];
  return m;
}

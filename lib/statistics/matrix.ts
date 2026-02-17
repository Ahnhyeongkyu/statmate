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

export function copyMatrix(A: Matrix): Matrix {
  return A.map(row => [...row]);
}

/** Frobenius norm of off-diagonal elements */
export function offDiagNorm(A: Matrix): number {
  const n = A.length;
  let sum = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (i !== j) sum += A[i][j] * A[i][j];
  return Math.sqrt(sum);
}

export interface EigenResult {
  eigenvalues: number[];
  eigenvectors: Matrix; // columns are eigenvectors
}

/**
 * Jacobi eigenvalue algorithm for symmetric matrices.
 * Returns eigenvalues sorted descending with corresponding eigenvector columns.
 */
export function eigenSymmetric(A: Matrix, maxIter?: number, tol?: number): EigenResult {
  const n = A.length;
  const S = copyMatrix(A);
  const V = identity(n);
  const tolerance = tol ?? 1e-10;
  const maxIterations = maxIter ?? 100 * n * n;

  for (let iter = 0; iter < maxIterations; iter++) {
    // Find largest off-diagonal |S[p][q]|
    let maxVal = 0, p = 0, q = 1;
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++) {
        const v = Math.abs(S[i][j]);
        if (v > maxVal) { maxVal = v; p = i; q = j; }
      }

    if (maxVal < tolerance) break;

    // Compute rotation
    const diff = S[q][q] - S[p][p];
    let t: number;
    if (Math.abs(diff) < 1e-15) {
      t = 1;
    } else {
      const tau = diff / (2 * S[p][q]);
      t = Math.sign(tau) / (Math.abs(tau) + Math.sqrt(1 + tau * tau));
    }
    const c = 1 / Math.sqrt(1 + t * t);
    const s = t * c;

    // Apply rotation to S
    const Spp = S[p][p], Sqq = S[q][q], Spq = S[p][q];
    S[p][p] = Spp - t * Spq;
    S[q][q] = Sqq + t * Spq;
    S[p][q] = 0;
    S[q][p] = 0;

    for (let i = 0; i < n; i++) {
      if (i === p || i === q) continue;
      const Sip = S[i][p], Siq = S[i][q];
      S[i][p] = c * Sip - s * Siq;
      S[p][i] = S[i][p];
      S[i][q] = s * Sip + c * Siq;
      S[q][i] = S[i][q];
    }

    // Update eigenvectors
    for (let i = 0; i < n; i++) {
      const Vip = V[i][p], Viq = V[i][q];
      V[i][p] = c * Vip - s * Viq;
      V[i][q] = s * Vip + c * Viq;
    }
  }

  // Extract eigenvalues and sort descending
  const eigenvalues = diag(S);
  const indices = eigenvalues.map((_, i) => i);
  indices.sort((a, b) => eigenvalues[b] - eigenvalues[a]);

  const sortedValues = indices.map(i => eigenvalues[i]);
  const sortedVectors = zeros(n, n);
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++)
      sortedVectors[i][j] = V[i][indices[j]];

  return { eigenvalues: sortedValues, eigenvectors: sortedVectors };
}

/**
 * Shared input validation helpers for all StatMate calculators.
 */

/** Throws if array is empty or has fewer than `min` elements. */
export function requireMinLength(arr: number[], min: number, label = "Data"): void {
  if (!arr || arr.length < min) {
    throw new Error(`${label} needs at least ${min} values (got ${arr?.length ?? 0})`);
  }
}

/** Throws if any element is NaN, Infinity, or not a number. */
export function requireFinite(arr: number[], label = "Data"): void {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number" || !isFinite(arr[i])) {
      throw new Error(`${label} contains a non-finite value at index ${i + 1}`);
    }
  }
}

/** Throws if any element is negative. */
export function requireNonNegative(arr: number[], label = "Data"): void {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      throw new Error(`${label} contains a negative value at index ${i + 1}`);
    }
  }
}

/** Combined: min length + finite check. */
export function validateArray(arr: number[], min: number, label = "Data"): void {
  requireMinLength(arr, min, label);
  requireFinite(arr, label);
}

/** Validate a 2D matrix: non-empty, consistent columns, finite values. */
export function validateMatrix(
  data: number[][],
  minRows: number,
  minCols: number,
  label = "Matrix"
): void {
  if (!data || data.length < minRows) {
    throw new Error(`${label} needs at least ${minRows} rows (got ${data?.length ?? 0})`);
  }
  const cols = data[0].length;
  if (cols < minCols) {
    throw new Error(`${label} needs at least ${minCols} columns (got ${cols})`);
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].length !== cols) {
      throw new Error(`${label} row ${i + 1} has ${data[i].length} columns, expected ${cols}`);
    }
    for (let j = 0; j < cols; j++) {
      if (typeof data[i][j] !== "number" || !isFinite(data[i][j])) {
        throw new Error(`${label} contains a non-finite value at [${i + 1}, ${j + 1}]`);
      }
    }
  }
}

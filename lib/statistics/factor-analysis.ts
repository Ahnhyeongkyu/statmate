import jStat from "jstat";
import {
  type Matrix,
  zeros,
  transpose,
  multiply,
  invert,
  copyMatrix,
  eigenSymmetric,
  type EigenResult,
} from "./matrix";
import { requireFinite } from "./validation";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface KMOResult {
  overall: number;
  perVariable: number[];
  interpretation: string;
}

export interface BartlettResult {
  chiSquare: number;
  df: number;
  pValue: number;
  significant: boolean;
}

export interface VarianceExplainedRow {
  factor: number;
  eigenvalue: number;
  percentOfVariance: number;
  cumulativePercent: number;
}

export interface CommunalityRow {
  variable: string;
  initial: number;
  extraction: number;
}

export interface FactorAnalysisResult {
  kmo: KMOResult;
  bartlett: BartlettResult;
  eigenvalues: number[];
  nFactors: number;
  nVariables: number;
  nObservations: number;
  extractionMethod: "pca" | "paf";
  rotationMethod: "none" | "varimax" | "promax";
  variableNames: string[];
  pafConverged?: boolean;
  pafIterations?: number;
  unrotatedLoadings: Matrix;
  rotatedLoadings: Matrix;
  patternMatrix?: Matrix;
  structureMatrix?: Matrix;
  factorCorrelationMatrix?: Matrix;
  communalities: CommunalityRow[];
  varianceExplainedInitial: VarianceExplainedRow[];
  varianceExplainedRotated: VarianceExplainedRow[];
  screePlotData: { factor: number; eigenvalue: number }[];
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

function mean(arr: number[]): number {
  let s = 0;
  for (let i = 0; i < arr.length; i++) s += arr[i];
  return s / arr.length;
}

function _variance(arr: number[], m: number): number {
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    const d = arr[i] - m;
    s += d * d;
  }
  return s / (arr.length - 1);
}

/** Pearson correlation between two arrays of equal length. */
function _pearsonR(x: number[], y: number[]): number {
  const n = x.length;
  const mx = mean(x);
  const my = mean(y);
  let num = 0, dx2 = 0, dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;
    num += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  const denom = Math.sqrt(dx2 * dy2);
  return denom < 1e-15 ? 0 : num / denom;
}

/** Interpret KMO value per Kaiser (1974). */
function interpretKMO(kmo: number): string {
  if (kmo >= 0.9) return "Marvelous";
  if (kmo >= 0.8) return "Meritorious";
  if (kmo >= 0.7) return "Middling";
  if (kmo >= 0.6) return "Mediocre";
  if (kmo >= 0.5) return "Miserable";
  return "Unacceptable";
}

/**
 * Compute the correlation matrix from raw data.
 * data[i][j]: i = observation, j = variable.
 * Returns { R, means, sds, Z }.
 */
function computeCorrelationMatrix(
  data: number[][],
  n: number,
  p: number,
): { R: Matrix; means: number[]; sds: number[]; Z: Matrix } {
  const means: number[] = new Array(p);
  const sds: number[] = new Array(p);

  // Column-wise mean and standard deviation
  for (let j = 0; j < p; j++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += data[i][j];
    const m = s / n;
    means[j] = m;
    let ss = 0;
    for (let i = 0; i < n; i++) {
      const d = data[i][j] - m;
      ss += d * d;
    }
    sds[j] = Math.sqrt(ss / (n - 1));
  }

  // Standardise to Z-scores
  const Z = zeros(n, p);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < p; j++)
      Z[i][j] = (data[i][j] - means[j]) / sds[j];

  // R = Z'Z / (n-1)
  const Zt = transpose(Z);
  const ZtZ = multiply(Zt, Z);
  const R = zeros(p, p);
  for (let i = 0; i < p; i++)
    for (let j = 0; j < p; j++)
      R[i][j] = ZtZ[i][j] / (n - 1);

  return { R, means, sds, Z };
}

/**
 * KMO test. Returns { overall, perVariable, interpretation }.
 * If the correlation matrix is singular the KMO is set to 0 / "Unacceptable".
 */
function computeKMO(R: Matrix, p: number): KMOResult {
  let Rinv: Matrix;
  try {
    Rinv = invert(R);
  } catch {
    return { overall: 0, perVariable: new Array(p).fill(0), interpretation: "Unacceptable" };
  }

  // Anti-image correlation: Q[i][j] = -Rinv[i][j] / sqrt(Rinv[i][i] * Rinv[j][j])
  const Q = zeros(p, p);
  for (let i = 0; i < p; i++)
    for (let j = 0; j < p; j++)
      Q[i][j] = -Rinv[i][j] / Math.sqrt(Rinv[i][i] * Rinv[j][j]);

  // Overall KMO
  let sumR2 = 0;
  let sumQ2 = 0;
  for (let i = 0; i < p; i++)
    for (let j = 0; j < p; j++) {
      if (i === j) continue;
      sumR2 += R[i][j] * R[i][j];
      sumQ2 += Q[i][j] * Q[i][j];
    }
  const overall = sumR2 + sumQ2 > 0 ? sumR2 / (sumR2 + sumQ2) : 0;

  // Per-variable KMO
  const perVariable: number[] = new Array(p);
  for (let i = 0; i < p; i++) {
    let sr2 = 0, sq2 = 0;
    for (let j = 0; j < p; j++) {
      if (i === j) continue;
      sr2 += R[i][j] * R[i][j];
      sq2 += Q[i][j] * Q[i][j];
    }
    perVariable[i] = sr2 + sq2 > 0 ? sr2 / (sr2 + sq2) : 0;
  }

  return { overall, perVariable, interpretation: interpretKMO(overall) };
}

/**
 * Bartlett's test of sphericity.
 * χ² = -[(n-1) - (2p+5)/6] × ln(Π eigenvalues)
 */
function computeBartlett(
  eigenvalues: number[],
  n: number,
  p: number,
): BartlettResult {
  let logDet = 0;
  for (let i = 0; i < p; i++) {
    const ev = eigenvalues[i];
    logDet += Math.log(ev > 1e-15 ? ev : 1e-15);
  }

  const chiSquare = -((n - 1) - (2 * p + 5) / 6) * logDet;
  const df = (p * (p - 1)) / 2;
  const pValue = 1 - jStat.chisquare.cdf(chiSquare, df);

  return {
    chiSquare,
    df,
    pValue,
    significant: pValue < 0.05,
  };
}

/**
 * PCA extraction: loadings L[i][j] = eigenvector[i][j] × sqrt(eigenvalue[j])
 */
function extractPCA(eigen: EigenResult, nFactors: number, p: number): Matrix {
  const L = zeros(p, nFactors);
  for (let j = 0; j < nFactors; j++) {
    const sqrtEv = Math.sqrt(Math.max(eigen.eigenvalues[j], 0));
    for (let i = 0; i < p; i++) {
      L[i][j] = eigen.eigenvectors[i][j] * sqrtEv;
    }
  }
  return L;
}

/**
 * Principal Axis Factoring (PAF) with iterated communalities.
 * Initial communalities = SMC (squared multiple correlation) = 1 - 1/Rinv_jj.
 */
function extractPAF(
  R: Matrix,
  nFactors: number,
  p: number,
): { loadings: Matrix; converged: boolean; iterations: number } {
  const MAX_ITER = 100;
  const TOL = 1e-4;

  // Initial communalities from SMC
  let Rinv: Matrix;
  const communalities = new Array(p).fill(0);
  try {
    Rinv = invert(R);
    for (let j = 0; j < p; j++) {
      communalities[j] = Math.min(1 - 1 / Rinv[j][j], 0.999);
      if (communalities[j] < 0) communalities[j] = 0.5; // fallback
    }
  } catch {
    // If R is singular, use R² from other variables as rough SMC
    for (let j = 0; j < p; j++) {
      let maxR2 = 0;
      for (let k = 0; k < p; k++) {
        if (k === j) continue;
        const r2 = R[j][k] * R[j][k];
        if (r2 > maxR2) maxR2 = r2;
      }
      communalities[j] = Math.min(maxR2, 0.999);
    }
  }

  let converged = false;
  let iterations = 0;
  let loadings = zeros(p, nFactors);

  for (let iter = 0; iter < MAX_ITER; iter++) {
    iterations = iter + 1;

    // Replace diagonal of R with current communalities
    const Rr = copyMatrix(R);
    for (let j = 0; j < p; j++) Rr[j][j] = communalities[j];

    // Eigendecompose the reduced correlation matrix
    const eigen = eigenSymmetric(Rr);

    // Extract loadings for positive eigenvalues only
    const L = zeros(p, nFactors);
    for (let j = 0; j < nFactors; j++) {
      const ev = Math.max(eigen.eigenvalues[j], 0);
      const sqrtEv = Math.sqrt(ev);
      for (let i = 0; i < p; i++) {
        L[i][j] = eigen.eigenvectors[i][j] * sqrtEv;
      }
    }

    // Compute new communalities: h²[j] = Σ L[j][k]²
    const newComm = new Array(p).fill(0);
    for (let j = 0; j < p; j++) {
      let h2 = 0;
      for (let k = 0; k < nFactors; k++) h2 += L[j][k] * L[j][k];
      // Clamp Heywood cases
      newComm[j] = Math.min(h2, 0.999);
    }

    // Check convergence
    let maxDiff = 0;
    for (let j = 0; j < p; j++) {
      const diff = Math.abs(newComm[j] - communalities[j]);
      if (diff > maxDiff) maxDiff = diff;
    }

    for (let j = 0; j < p; j++) communalities[j] = newComm[j];
    loadings = L;

    if (maxDiff < TOL) {
      converged = true;
      break;
    }
  }

  return { loadings, converged, iterations };
}

/**
 * Varimax rotation with Kaiser normalisation.
 * Returns rotated loading matrix.
 */
function rotateVarimax(L: Matrix, p: number, m: number): Matrix {
  const MAX_SWEEPS = 100;
  const TOL = 1e-6;

  // Kaiser normalisation: divide each row by its communality sqrt
  const h = new Array(p).fill(0);
  for (let i = 0; i < p; i++) {
    let s = 0;
    for (let j = 0; j < m; j++) s += L[i][j] * L[i][j];
    h[i] = Math.sqrt(s);
  }

  const Ln = zeros(p, m);
  for (let i = 0; i < p; i++)
    for (let j = 0; j < m; j++)
      Ln[i][j] = h[i] > 1e-15 ? L[i][j] / h[i] : L[i][j];

  // Pairwise rotation
  for (let sweep = 0; sweep < MAX_SWEEPS; sweep++) {
    let rotated = false;

    for (let j = 0; j < m - 1; j++) {
      for (let k = j + 1; k < m; k++) {
        // Compute rotation angle components
        let A = 0, B = 0, C = 0, D = 0;
        for (let i = 0; i < p; i++) {
          const uj = Ln[i][j];
          const uk = Ln[i][k];
          const u2 = uj * uj - uk * uk;
          const v2 = 2 * uj * uk;
          A += u2;
          B += v2;
          C += u2 * u2 - v2 * v2;
          D += 2 * u2 * v2;
        }

        const num = D - 2 * A * B / p;
        const den = C - (A * A - B * B) / p;
        const phi = 0.25 * Math.atan2(num, den);

        if (Math.abs(phi) < TOL) continue;
        rotated = true;

        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        // Apply rotation
        for (let i = 0; i < p; i++) {
          const lj = Ln[i][j];
          const lk = Ln[i][k];
          Ln[i][j] = cosPhi * lj + sinPhi * lk;
          Ln[i][k] = -sinPhi * lj + cosPhi * lk;
        }
      }
    }

    if (!rotated) break;
  }

  // De-normalise
  const R = zeros(p, m);
  for (let i = 0; i < p; i++)
    for (let j = 0; j < m; j++)
      R[i][j] = Ln[i][j] * h[i];

  return R;
}

/**
 * Promax rotation (oblique): start from varimax, raise to power kappa,
 * then compute pattern, structure, and factor correlation matrices.
 */
function rotatePromax(
  L: Matrix,
  p: number,
  m: number,
): {
  rotatedLoadings: Matrix;
  patternMatrix: Matrix;
  structureMatrix: Matrix;
  factorCorrelationMatrix: Matrix;
} {
  const kappa = 4;

  // Step 1: Varimax rotation
  const V = rotateVarimax(L, p, m);

  // Step 2: Target matrix — raise varimax loadings to power kappa, preserving sign
  const H = zeros(p, m);
  for (let i = 0; i < p; i++)
    for (let j = 0; j < m; j++) {
      const absVal = Math.abs(V[i][j]);
      H[i][j] = Math.sign(V[i][j]) * Math.pow(absVal, kappa);
    }

  // Step 3: Compute transformation matrix T = (V'V)^-1 V'H
  const Vt = transpose(V);
  const VtV = multiply(Vt, V);
  const VtVinv = invert(VtV);
  const VtH = multiply(Vt, H);
  const T = multiply(VtVinv, VtH);

  // Step 4: Normalise T columns to unit length
  for (let j = 0; j < m; j++) {
    let colNorm = 0;
    for (let i = 0; i < m; i++) colNorm += T[i][j] * T[i][j];
    colNorm = Math.sqrt(colNorm);
    if (colNorm > 1e-15) {
      for (let i = 0; i < m; i++) T[i][j] /= colNorm;
    }
  }

  // Step 5: Pattern matrix P = V × T
  const P = multiply(V, T);

  // Step 6: Factor correlation matrix Φ = (T'T)^-1  (since T cols normalised)
  const Tt = transpose(T);
  const TtT = multiply(Tt, T);
  const Phi = invert(TtT);

  // Normalise Φ to correlations: Φ_corr[i][j] = Φ[i][j] / sqrt(Φ[i][i]*Φ[j][j])
  const PhiCorr = zeros(m, m);
  for (let i = 0; i < m; i++)
    for (let j = 0; j < m; j++)
      PhiCorr[i][j] = Phi[i][j] / Math.sqrt(Phi[i][i] * Phi[j][j]);

  // Step 7: Structure matrix S = P × Φ
  const S = multiply(P, PhiCorr);

  return {
    rotatedLoadings: P,
    patternMatrix: P,
    structureMatrix: S,
    factorCorrelationMatrix: PhiCorr,
  };
}

/**
 * Compute sum of squared loadings per factor (column) of a loading matrix.
 */
function sumOfSquaredLoadings(L: Matrix, p: number, m: number): number[] {
  const ssl = new Array(m).fill(0);
  for (let j = 0; j < m; j++)
    for (let i = 0; i < p; i++)
      ssl[j] += L[i][j] * L[i][j];
  return ssl;
}

/**
 * Build variance-explained rows from eigenvalues or sums of squared loadings.
 */
function buildVarianceExplained(
  values: number[],
  p: number,
): VarianceExplainedRow[] {
  let cumulative = 0;
  return values.map((val, idx) => {
    const pct = (val / p) * 100;
    cumulative += pct;
    return {
      factor: idx + 1,
      eigenvalue: val,
      percentOfVariance: pct,
      cumulativePercent: cumulative,
    };
  });
}

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

export function factorAnalysis(
  data: number[][],
  options: {
    nFactors?: number;
    extraction?: "pca" | "paf";
    rotation?: "none" | "varimax" | "promax";
    variableNames?: string[];
  } = {},
): FactorAnalysisResult {
  const extraction = options.extraction ?? "pca";
  const rotation = options.rotation ?? "varimax";

  // ── 1. Validation ──────────────────────────────────────────────────────

  const n = data.length;
  if (n === 0) throw new Error("Data array is empty.");

  const p = data[0].length;
  if (p < 2) throw new Error(`At least 2 variables are required, but got ${p}.`);
  if (p > 50) throw new Error(`Maximum 50 variables supported, but got ${p}.`);
  if (n <= p) throw new Error(`Number of observations (${n}) must exceed the number of variables (${p}).`);

  // Validate row lengths
  for (let i = 0; i < n; i++) {
    if (data[i].length !== p) {
      throw new Error(`Row ${i} has ${data[i].length} values, expected ${p}. All rows must have the same number of variables.`);
    }
  }

  // Validate all values are finite
  for (let i = 0; i < n; i++) {
    requireFinite(data[i], `Row ${i + 1}`);
  }

  const variableNames = options.variableNames ?? Array.from({ length: p }, (_, i) => `V${i + 1}`);
  if (variableNames.length !== p) {
    throw new Error(`variableNames length (${variableNames.length}) must match number of variables (${p}).`);
  }

  // Check for zero-variance variables
  for (let j = 0; j < p; j++) {
    let s = 0;
    const m = mean(data.map(row => row[j]));
    for (let i = 0; i < n; i++) {
      const d = data[i][j] - m;
      s += d * d;
    }
    const v = s / (n - 1);
    if (v < 1e-15) {
      throw new Error(`Variable "${variableNames[j]}" has zero variance. Remove constant variables before running factor analysis.`);
    }
  }

  // ── 2. Correlation matrix ──────────────────────────────────────────────

  const { R } = computeCorrelationMatrix(data, n, p);

  // ── 3. Eigenvalue decomposition ────────────────────────────────────────

  const eigen = eigenSymmetric(R);
  const allEigenvalues = eigen.eigenvalues;

  // ── 4. KMO ─────────────────────────────────────────────────────────────

  const kmo = computeKMO(R, p);

  // ── 5. Bartlett's test ─────────────────────────────────────────────────

  const bartlett = computeBartlett(allEigenvalues, n, p);

  // ── 6. Determine number of factors ─────────────────────────────────────

  let nFactors: number;
  if (options.nFactors !== undefined) {
    nFactors = options.nFactors;
    if (nFactors < 1) throw new Error("nFactors must be at least 1.");
    if (nFactors > p) throw new Error(`nFactors (${nFactors}) cannot exceed number of variables (${p}).`);
  } else {
    // Kaiser criterion: eigenvalues > 1
    nFactors = allEigenvalues.filter(ev => ev > 1).length;
    if (nFactors < 1) nFactors = 1;
  }

  // ── 7. Factor extraction ──────────────────────────────────────────────

  let unrotatedLoadings: Matrix;
  let pafConverged: boolean | undefined;
  let pafIterations: number | undefined;

  if (extraction === "pca") {
    unrotatedLoadings = extractPCA(eigen, nFactors, p);
  } else {
    const pafResult = extractPAF(R, nFactors, p);
    unrotatedLoadings = pafResult.loadings;
    pafConverged = pafResult.converged;
    pafIterations = pafResult.iterations;
  }

  // ── 8. Rotation ────────────────────────────────────────────────────────

  let rotatedLoadings: Matrix;
  let patternMatrix: Matrix | undefined;
  let structureMatrix: Matrix | undefined;
  let factorCorrelationMatrix: Matrix | undefined;

  if (rotation === "none" || nFactors === 1) {
    rotatedLoadings = copyMatrix(unrotatedLoadings);
  } else if (rotation === "varimax") {
    rotatedLoadings = rotateVarimax(unrotatedLoadings, p, nFactors);
  } else {
    // promax
    const promax = rotatePromax(unrotatedLoadings, p, nFactors);
    rotatedLoadings = promax.rotatedLoadings;
    patternMatrix = promax.patternMatrix;
    structureMatrix = promax.structureMatrix;
    factorCorrelationMatrix = promax.factorCorrelationMatrix;
  }

  // ── 9. Communalities ──────────────────────────────────────────────────

  // Initial communalities
  const initialComm: number[] = new Array(p);
  if (extraction === "pca") {
    for (let j = 0; j < p; j++) initialComm[j] = 1.0;
  } else {
    // SMC for PAF
    try {
      const Rinv = invert(R);
      for (let j = 0; j < p; j++) {
        initialComm[j] = Math.min(1 - 1 / Rinv[j][j], 0.999);
        if (initialComm[j] < 0) initialComm[j] = 0;
      }
    } catch {
      for (let j = 0; j < p; j++) {
        let maxR2 = 0;
        for (let k = 0; k < p; k++) {
          if (k === j) continue;
          maxR2 = Math.max(maxR2, R[j][k] * R[j][k]);
        }
        initialComm[j] = maxR2;
      }
    }
  }

  // Extraction communalities: h²[j] = sum of squared loadings for variable j
  // Use the loading matrix appropriate for the rotation method
  const loadingsForComm = rotation === "promax" && patternMatrix ? patternMatrix : rotatedLoadings;
  const extractionComm: number[] = new Array(p);
  for (let j = 0; j < p; j++) {
    let h2 = 0;
    for (let k = 0; k < nFactors; k++) h2 += loadingsForComm[j][k] * loadingsForComm[j][k];
    extractionComm[j] = h2;
  }

  const communalities: CommunalityRow[] = variableNames.map((name, j) => ({
    variable: name,
    initial: initialComm[j],
    extraction: extractionComm[j],
  }));

  // ── 10. Variance explained ────────────────────────────────────────────

  // Initial: based on eigenvalues (all of them, but we report only nFactors rows)
  const varianceExplainedInitial = buildVarianceExplained(
    allEigenvalues.slice(0, nFactors),
    p,
  );

  // Rotated: based on sums of squared loadings
  const rotSSL = sumOfSquaredLoadings(rotatedLoadings, p, nFactors);
  const varianceExplainedRotated = buildVarianceExplained(rotSSL, p);

  // ── 11. Scree data ────────────────────────────────────────────────────

  const screePlotData = allEigenvalues.map((ev, i) => ({
    factor: i + 1,
    eigenvalue: ev,
  }));

  // ── Assemble result ───────────────────────────────────────────────────

  const result: FactorAnalysisResult = {
    kmo,
    bartlett,
    eigenvalues: allEigenvalues,
    nFactors,
    nVariables: p,
    nObservations: n,
    extractionMethod: extraction,
    rotationMethod: rotation,
    variableNames,
    unrotatedLoadings,
    rotatedLoadings,
    communalities,
    varianceExplainedInitial,
    varianceExplainedRotated,
    screePlotData,
  };

  if (extraction === "paf") {
    result.pafConverged = pafConverged;
    result.pafIterations = pafIterations;
  }

  if (patternMatrix) result.patternMatrix = patternMatrix;
  if (structureMatrix) result.structureMatrix = structureMatrix;
  if (factorCorrelationMatrix) result.factorCorrelationMatrix = factorCorrelationMatrix;

  return result;
}

// ---------------------------------------------------------------------------
// APA Formatter
// ---------------------------------------------------------------------------

export function formatFactorAnalysisAPA(result: FactorAnalysisResult): string {
  const extractionLabel =
    result.extractionMethod === "pca"
      ? "principal component extraction"
      : "principal axis factoring";

  const rotationLabel =
    result.rotationMethod === "none"
      ? "no rotation"
      : `${result.rotationMethod} rotation`;

  const kmoFormatted = result.kmo.overall.toFixed(2).replace(/^0/, "");

  const totalVariance =
    result.varianceExplainedRotated.length > 0
      ? result.varianceExplainedRotated[result.varianceExplainedRotated.length - 1].cumulativePercent.toFixed(1)
      : result.varianceExplainedInitial.length > 0
        ? result.varianceExplainedInitial[result.varianceExplainedInitial.length - 1].cumulativePercent.toFixed(1)
        : "0.0";

  const chiSqFormatted = result.bartlett.chiSquare.toFixed(2);
  const pFormatted = result.bartlett.pValue < 0.001 ? "< .001" : `= ${result.bartlett.pValue.toFixed(3).replace(/^0/, "")}`;

  const factorWord = result.nFactors === 1 ? "factor was" : "factors were";

  const parts: string[] = [
    `An exploratory factor analysis using ${extractionLabel} with ${rotationLabel} was conducted on ${result.nVariables} items (N = ${result.nObservations}).`,
    `The Kaiser-Meyer-Olkin measure was ${kmoFormatted}, and Bartlett's test was ${result.bartlett.significant ? "significant" : "not significant"}, \u03C7\u00B2(${result.bartlett.df}) = ${chiSqFormatted}, p ${pFormatted}.`,
    `${result.nFactors === 1 ? "One" : numberToWord(result.nFactors)} ${factorWord} extracted, explaining ${totalVariance}% of the total variance.`,
  ];

  if (result.extractionMethod === "paf" && result.pafConverged === false) {
    parts.push("Note: PAF did not converge; results should be interpreted with caution.");
  }

  return parts.join(" ");
}

/** Convert small integers to English words for APA style. */
function numberToWord(n: number): string {
  const words = [
    "Zero", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  ];
  return n >= 0 && n < words.length ? words[n] : String(n);
}

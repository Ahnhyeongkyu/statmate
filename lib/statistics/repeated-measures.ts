import jStat from "jstat";
import { validateArray } from "./validation";

export interface ConditionStats {
  name: string;
  n: number;
  mean: number;
  sd: number;
}

export interface PostHocPair {
  condition1: string;
  condition2: string;
  meanDiff: number;
  tValue: number;
  pValue: number;
  significant: boolean;
}

export interface SphericityResult {
  mauchlyW: number;
  chiSquare: number;
  p: number;
  ggEpsilon: number;
  violated: boolean;
}

export interface RepeatedMeasuresResult {
  fStatistic: number;
  dfConditions: number;
  dfError: number;
  pValue: number;
  partialEtaSquared: number;
  effectSizeLabel: "negligible" | "small" | "medium" | "large";
  ssConditions: number;
  ssSubjects: number;
  ssError: number;
  ssTotal: number;
  msConditions: number;
  msError: number;
  sphericity: SphericityResult;
  correctedF?: { df1: number; df2: number; p: number };
  conditionStats: ConditionStats[];
  postHoc: PostHocPair[];
  significant: boolean;
}

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function sd(arr: number[]): number {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1));
}

/**
 * Simplified Mauchly's sphericity test.
 * Computes W from the covariance matrix of orthogonal differences.
 */
function mauchlySphericityTest(
  conditions: number[][],
  k: number,
  n: number
): SphericityResult {
  if (k <= 2) {
    // Sphericity is always met with 2 conditions
    return { mauchlyW: 1, chiSquare: 0, p: 1, ggEpsilon: 1, violated: false };
  }

  // Build difference scores (k-1 orthogonal contrasts using successive differences)
  const diffs: number[][] = [];
  for (let c = 0; c < k - 1; c++) {
    diffs[c] = [];
    for (let s = 0; s < n; s++) {
      diffs[c][s] = conditions[c + 1][s] - conditions[c][s];
    }
  }

  const p = k - 1; // number of differences

  // Compute covariance matrix of differences
  const means = diffs.map((d) => mean(d));
  const cov: number[][] = Array.from({ length: p }, () => Array(p).fill(0));

  for (let i = 0; i < p; i++) {
    for (let j = 0; j < p; j++) {
      let s = 0;
      for (let sub = 0; sub < n; sub++) {
        s += (diffs[i][sub] - means[i]) * (diffs[j][sub] - means[j]);
      }
      cov[i][j] = s / (n - 1);
    }
  }

  // Compute determinant of covariance matrix (for small p, use simple methods)
  let det = 1;
  if (p === 1) {
    det = cov[0][0];
  } else if (p === 2) {
    det = cov[0][0] * cov[1][1] - cov[0][1] * cov[1][0];
  } else {
    // LU-like determinant for 3x3 or larger
    const mat = cov.map((r) => [...r]);
    let sign = 1;
    for (let col = 0; col < p; col++) {
      let maxRow = col;
      for (let row = col + 1; row < p; row++) {
        if (Math.abs(mat[row][col]) > Math.abs(mat[maxRow][col])) maxRow = row;
      }
      if (maxRow !== col) {
        [mat[col], mat[maxRow]] = [mat[maxRow], mat[col]];
        sign *= -1;
      }
      if (Math.abs(mat[col][col]) < 1e-15) {
        det = 0;
        break;
      }
      for (let row = col + 1; row < p; row++) {
        const factor = mat[row][col] / mat[col][col];
        for (let j = col + 1; j < p; j++) {
          mat[row][j] -= factor * mat[col][j];
        }
      }
    }
    if (det !== 0) {
      det = sign;
      for (let i = 0; i < p; i++) det *= mat[i][i];
    }
  }

  // Mean of diagonal elements (variances of differences)
  let traceMean = 0;
  for (let i = 0; i < p; i++) traceMean += cov[i][i];
  traceMean /= p;

  // Mauchly's W = det(cov) / (trace/p)^p = det(cov) / traceMean^p
  const W = traceMean > 0 ? det / Math.pow(traceMean, p) : 0;
  const mauchlyW = Math.max(0, Math.min(1, W));

  // Chi-square approximation
  const f = (2 * p * p + p + 2) / (6 * p * (n - 1));
  const chiSq = -(n - 1 - f) * Math.log(Math.max(mauchlyW, 1e-15));
  const dfChi = (p * (p + 1)) / 2 - 1;

  const pSph = dfChi > 0 ? 1 - jStat.chisquare.cdf(Math.max(chiSq, 0), dfChi) : 1;

  // Greenhouse-Geisser epsilon
  let traceS = 0;
  let traceSS = 0;
  let sumAll = 0;

  // Build covariance matrix of original conditions (not differences) for GG epsilon
  const condMeans = conditions.map((c) => mean(c));
  const S: number[][] = Array.from({ length: k }, () => Array(k).fill(0));
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      let s = 0;
      for (let sub = 0; sub < n; sub++) {
        s += (conditions[i][sub] - condMeans[i]) * (conditions[j][sub] - condMeans[j]);
      }
      S[i][j] = s / (n - 1);
    }
  }

  // Center the covariance matrix (double-centering)
  const rowMeans = S.map((row) => mean(row));
  const colMeans: number[] = [];
  for (let j = 0; j < k; j++) {
    let s = 0;
    for (let i = 0; i < k; i++) s += S[i][j];
    colMeans[j] = s / k;
  }
  const grandMeanS = mean(rowMeans);

  const Sc: number[][] = Array.from({ length: k }, () => Array(k).fill(0));
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      Sc[i][j] = S[i][j] - rowMeans[i] - colMeans[j] + grandMeanS;
    }
  }

  traceS = 0;
  traceSS = 0;
  sumAll = 0;
  for (let i = 0; i < k; i++) {
    traceS += Sc[i][i];
    for (let j = 0; j < k; j++) {
      traceSS += Sc[i][j] * Sc[i][j];
      sumAll += Sc[i][j];
    }
  }

  const ggEpsilon =
    traceSS > 0 ? (traceS * traceS) / ((k - 1) * traceSS) : 1;
  const ggClamped = Math.max(1 / (k - 1), Math.min(1, ggEpsilon));

  return {
    mauchlyW,
    chiSquare: chiSq,
    p: pSph,
    ggEpsilon: ggClamped,
    violated: pSph < 0.05,
  };
}

/**
 * Repeated Measures ANOVA.
 *
 * @param conditions conditions[c] = array of values for condition c (length n = number of subjects)
 * @param conditionNames names for each condition
 */
export function repeatedMeasuresAnova(
  conditions: number[][],
  conditionNames?: string[]
): RepeatedMeasuresResult {
  const k = conditions.length;
  if (k < 2) throw new Error("Need at least 2 conditions for repeated measures ANOVA");

  const n = conditions[0].length;
  if (n < 3) throw new Error("Need at least 3 subjects");

  for (let c = 0; c < k; c++) {
    validateArray(conditions[c], 2, `Condition ${c + 1}`);
    if (conditions[c].length !== n) {
      throw new Error(`All conditions must have the same number of subjects (condition ${c + 1} has ${conditions[c].length}, expected ${n})`);
    }
  }

  const names = conditionNames || Array.from({ length: k }, (_, i) => `Condition ${i + 1}`);

  // Grand mean
  let grandSum = 0;
  const N = n * k;
  for (let c = 0; c < k; c++) {
    for (let s = 0; s < n; s++) {
      grandSum += conditions[c][s];
    }
  }
  const grandMean = grandSum / N;

  // Condition means
  const condMeans = conditions.map((c) => mean(c));

  // Subject means
  const subjectMeans: number[] = [];
  for (let s = 0; s < n; s++) {
    let sum = 0;
    for (let c = 0; c < k; c++) {
      sum += conditions[c][s];
    }
    subjectMeans[s] = sum / k;
  }

  // SS_conditions = n * sum(condMean - grandMean)^2
  let ssConditions = 0;
  for (let c = 0; c < k; c++) {
    ssConditions += n * (condMeans[c] - grandMean) ** 2;
  }

  // SS_subjects = k * sum(subjectMean - grandMean)^2
  let ssSubjects = 0;
  for (let s = 0; s < n; s++) {
    ssSubjects += k * (subjectMeans[s] - grandMean) ** 2;
  }

  // SS_total = sum(x - grandMean)^2
  let ssTotal = 0;
  for (let c = 0; c < k; c++) {
    for (let s = 0; s < n; s++) {
      ssTotal += (conditions[c][s] - grandMean) ** 2;
    }
  }

  // SS_error = SS_total - SS_conditions - SS_subjects
  let ssError = ssTotal - ssConditions - ssSubjects;
  if (ssError < 0) ssError = 0;

  // Degrees of freedom
  const dfConditions = k - 1;
  const dfSubjects = n - 1;
  const dfError = (k - 1) * (n - 1);

  // Mean squares
  const msConditions = ssConditions / dfConditions;
  const msError = dfError > 0 ? ssError / dfError : 0;

  // F statistic
  const fStatistic = msError > 0 ? msConditions / msError : 0;

  // P-value
  const pValue = msError > 0 ? 1 - jStat.centralF.cdf(fStatistic, dfConditions, dfError) : 1;

  // Partial eta-squared
  const partialEtaSquared = (ssConditions + ssError) > 0 ? ssConditions / (ssConditions + ssError) : 0;

  // Effect size label
  let effectSizeLabel: "negligible" | "small" | "medium" | "large";
  if (partialEtaSquared < 0.01) effectSizeLabel = "negligible";
  else if (partialEtaSquared < 0.06) effectSizeLabel = "small";
  else if (partialEtaSquared < 0.14) effectSizeLabel = "medium";
  else effectSizeLabel = "large";

  // Sphericity test
  const sphericity = mauchlySphericityTest(conditions, k, n);

  // Corrected F if sphericity is violated
  let correctedF: { df1: number; df2: number; p: number } | undefined;
  if (sphericity.violated) {
    const corrDf1 = dfConditions * sphericity.ggEpsilon;
    const corrDf2 = dfError * sphericity.ggEpsilon;
    const corrP = 1 - jStat.centralF.cdf(fStatistic, corrDf1, corrDf2);
    correctedF = { df1: corrDf1, df2: corrDf2, p: corrP };
  }

  // Condition statistics
  const conditionStats: ConditionStats[] = conditions.map((c, i) => ({
    name: names[i],
    n,
    mean: condMeans[i],
    sd: sd(c),
  }));

  // Post-hoc: Bonferroni-corrected paired t-tests
  const postHoc: PostHocPair[] = [];
  const numComparisons = (k * (k - 1)) / 2;

  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      // Paired differences
      const diffs: number[] = [];
      for (let s = 0; s < n; s++) {
        diffs.push(conditions[i][s] - conditions[j][s]);
      }
      const diffMean = mean(diffs);
      const diffSD = sd(diffs);
      const se = diffSD / Math.sqrt(n);
      const tVal = se > 0 ? Math.abs(diffMean) / se : 0;
      let pPair = se > 0 ? 2 * (1 - jStat.studentt.cdf(tVal, n - 1)) : 1;
      // Bonferroni correction
      pPair = Math.min(pPair * numComparisons, 1);

      postHoc.push({
        condition1: names[i],
        condition2: names[j],
        meanDiff: diffMean,
        tValue: tVal,
        pValue: pPair,
        significant: pPair < 0.05,
      });
    }
  }

  // Determine significance (use corrected p if sphericity violated)
  const finalP = correctedF ? correctedF.p : pValue;

  return {
    fStatistic,
    dfConditions,
    dfError,
    pValue,
    partialEtaSquared,
    effectSizeLabel,
    ssConditions,
    ssSubjects,
    ssError,
    ssTotal,
    msConditions,
    msError,
    sphericity,
    correctedF,
    conditionStats,
    postHoc,
    significant: finalP < 0.05,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatRepeatedMeasuresAPA(result: RepeatedMeasuresResult): string {
  const f = result.fStatistic.toFixed(2);
  if (result.correctedF) {
    const df1 = result.correctedF.df1.toFixed(2);
    const df2 = result.correctedF.df2.toFixed(2);
    const pStr = formatPValue(result.correctedF.p);
    return `F(${df1}, ${df2}) = ${f}, p ${pStr}, \u03B7\u00B2p = ${result.partialEtaSquared.toFixed(2)} (Greenhouse-Geisser corrected)`;
  }
  const pStr = formatPValue(result.pValue);
  return `F(${result.dfConditions}, ${result.dfError}) = ${f}, p ${pStr}, \u03B7\u00B2p = ${result.partialEtaSquared.toFixed(2)}`;
}

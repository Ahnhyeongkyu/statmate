import jStat from "jstat";
import { zeros, invert } from "./matrix";

export interface LogisticCoefficient {
  name: string;
  b: number;
  se: number;
  wald: number;
  df: number;
  p: number;
  expB: number;
  expBCI95: [number, number];
}

export interface ClassificationResult {
  tn: number;
  fp: number;
  fn: number;
  tp: number;
  sensitivity: number;
  specificity: number;
  accuracy: number;
}

export interface LogisticRegressionResult {
  n: number;
  k: number;
  converged: boolean;
  iterations: number;
  separationWarning: boolean;
  neg2LL: number;
  neg2LLNull: number;
  omnibusChiSq: number;
  omnibusDf: number;
  omnibusP: number;
  coxSnellR2: number;
  nagelkerkeR2: number;
  coefficients: LogisticCoefficient[];
  classification: ClassificationResult;
  hosmerLemeshowChiSq: number;
  hosmerLemeshowDf: number;
  hosmerLemeshowP: number;
  predicted: number[];
}

/**
 * Fit intercept-only (null) logistic model via IRLS.
 * Returns log-likelihood.
 */
function fitNullModel(y: number[], n: number): number {
  // For null model, X is just a column of 1s, so beta is a scalar
  let beta0 = 0;
  for (let iter = 0; iter < 25; iter++) {
    let wSum = 0;
    let scoreSum = 0;
    for (let i = 0; i < n; i++) {
      const eta = beta0;
      let pi = 1 / (1 + Math.exp(-eta));
      pi = Math.max(1e-10, Math.min(1 - 1e-10, pi));
      const w = pi * (1 - pi);
      wSum += w;
      scoreSum += y[i] - pi;
    }
    const delta = scoreSum / wSum;
    beta0 += delta;
    if (Math.abs(delta) < 1e-8) break;
  }

  // Compute log-likelihood
  let ll = 0;
  for (let i = 0; i < n; i++) {
    let pi = 1 / (1 + Math.exp(-beta0));
    pi = Math.max(1e-10, Math.min(1 - 1e-10, pi));
    ll += y[i] * Math.log(pi) + (1 - y[i]) * Math.log(1 - pi);
  }
  return ll;
}

/**
 * Compute Hosmer-Lemeshow goodness-of-fit test.
 * Sort by predicted probability, divide into ~10 groups,
 * compare observed vs expected using chi-square.
 */
function hosmerLemeshow(
  y: number[],
  predicted: number[],
  nGroups: number = 10
): { chiSq: number; df: number; p: number } {
  const n = y.length;

  // Create sorted indices by predicted probability
  const indices = Array.from({ length: n }, (_, i) => i);
  indices.sort((a, b) => predicted[a] - predicted[b]);

  // Determine actual number of groups (may be less than nGroups for small n)
  const g = Math.min(nGroups, n);
  const groupSize = Math.floor(n / g);

  let chiSq = 0;
  let validGroups = 0;

  for (let grp = 0; grp < g; grp++) {
    const start = grp * groupSize;
    const end = grp === g - 1 ? n : (grp + 1) * groupSize;
    const gn = end - start;
    if (gn === 0) continue;

    let obsEvents = 0;
    let expEvents = 0;
    for (let j = start; j < end; j++) {
      const idx = indices[j];
      obsEvents += y[idx];
      expEvents += predicted[idx];
    }

    const obsNonEvents = gn - obsEvents;
    const expNonEvents = gn - expEvents;

    // Avoid division by zero
    if (expEvents > 1e-10) {
      chiSq += ((obsEvents - expEvents) ** 2) / expEvents;
    }
    if (expNonEvents > 1e-10) {
      chiSq += ((obsNonEvents - expNonEvents) ** 2) / expNonEvents;
    }
    validGroups++;
  }

  const df = Math.max(validGroups - 2, 1);
  const p = 1 - jStat.chisquare.cdf(chiSq, df);

  return { chiSq, df, p };
}

/**
 * Binary logistic regression using Iteratively Reweighted Least Squares (IRLS).
 */
export function logisticRegression(input: {
  y: number[];
  xs: number[][];
  predictorNames?: string[];
}): LogisticRegressionResult {
  const { y, xs, predictorNames } = input;
  const n = y.length;
  const k = xs.length; // number of predictors

  // Validation
  for (let i = 0; i < n; i++) {
    if (y[i] !== 0 && y[i] !== 1) {
      throw new Error("Y must contain only 0s and 1s");
    }
  }

  const nOnes = y.reduce((s, v) => s + v, 0);
  const nZeros = n - nOnes;
  if (nOnes < 2) throw new Error("Need at least 2 observations in the event group (Y=1)");
  if (nZeros < 2) throw new Error("Need at least 2 observations in the non-event group (Y=0)");
  if (n < k + 2) throw new Error(`Need at least ${k + 2} observations for ${k} predictors`);

  for (let j = 0; j < k; j++) {
    if (xs[j].length !== n) {
      throw new Error(`Predictor ${j + 1} length (${xs[j].length}) does not match Y length (${n})`);
    }
  }

  const p1 = k + 1; // number of parameters (including intercept)

  // Build design matrix X: n x p1 (column of 1s + predictor columns)
  const X: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row = [1]; // intercept
    for (let j = 0; j < k; j++) {
      row.push(xs[j][i]);
    }
    X.push(row);
  }

  // Initialize beta = zeros
  const beta = new Array(p1).fill(0);

  let converged = false;
  let iterations = 0;

  // IRLS loop
  for (let iter = 1; iter <= 25; iter++) {
    iterations = iter;

    // Compute eta = X * beta
    const eta = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < p1; j++) {
        eta[i] += X[i][j] * beta[j];
      }
    }

    // Compute pi = sigmoid(eta), clamped
    const pi = new Array(n);
    const w = new Array(n);
    for (let i = 0; i < n; i++) {
      let pv = 1 / (1 + Math.exp(-eta[i]));
      pv = Math.max(1e-10, Math.min(1 - 1e-10, pv));
      pi[i] = pv;
      w[i] = pv * (1 - pv);
    }

    // Compute XtWX efficiently: XtWX[a][b] = sum_i(X[i][a] * w[i] * X[i][b])
    const XtWX = zeros(p1, p1);
    for (let a = 0; a < p1; a++) {
      for (let b = a; b < p1; b++) {
        let sum = 0;
        for (let i = 0; i < n; i++) {
          sum += X[i][a] * w[i] * X[i][b];
        }
        XtWX[a][b] = sum;
        XtWX[b][a] = sum;
      }
    }

    // Compute score = X' * (y - pi)
    const score = new Array(p1).fill(0);
    for (let j = 0; j < p1; j++) {
      for (let i = 0; i < n; i++) {
        score[j] += X[i][j] * (y[i] - pi[i]);
      }
    }

    // delta = inv(XtWX) * score
    let XtWXinv;
    try {
      XtWXinv = invert(XtWX);
    } catch {
      // Singular matrix - cannot continue
      break;
    }

    const delta = new Array(p1).fill(0);
    for (let j = 0; j < p1; j++) {
      for (let m = 0; m < p1; m++) {
        delta[j] += XtWXinv[j][m] * score[m];
      }
    }

    // Update beta
    for (let j = 0; j < p1; j++) {
      beta[j] += delta[j];
    }

    // Check convergence
    let maxDelta = 0;
    for (let j = 0; j < p1; j++) {
      maxDelta = Math.max(maxDelta, Math.abs(delta[j]));
    }
    if (maxDelta < 1e-8) {
      converged = true;
      break;
    }
  }

  // Compute final predicted probabilities
  const predicted = new Array(n);
  const wFinal = new Array(n);
  for (let i = 0; i < n; i++) {
    let eta = 0;
    for (let j = 0; j < p1; j++) {
      eta += X[i][j] * beta[j];
    }
    let pv = 1 / (1 + Math.exp(-eta));
    pv = Math.max(1e-10, Math.min(1 - 1e-10, pv));
    predicted[i] = pv;
    wFinal[i] = pv * (1 - pv);
  }

  // Log-likelihood
  let ll = 0;
  for (let i = 0; i < n; i++) {
    ll += y[i] * Math.log(predicted[i]) + (1 - y[i]) * Math.log(1 - predicted[i]);
  }

  // Null model log-likelihood
  const llNull = fitNullModel(y, n);

  const neg2LL = -2 * ll;
  const neg2LLNull = -2 * llNull;

  // Omnibus test (model chi-square)
  const omnibusChiSq = neg2LLNull - neg2LL;
  const omnibusDf = k;
  const omnibusP = omnibusDf > 0 ? 1 - jStat.chisquare.cdf(omnibusChiSq, omnibusDf) : 1;

  // Pseudo R-squared measures
  // Cox & Snell R^2 = 1 - exp(2*(LL_null - LL) / n)
  const coxSnellR2 = 1 - Math.exp(2 * (llNull - ll) / n);
  // Nagelkerke R^2 = Cox_Snell / (1 - exp(2*LL_null/n))
  const maxCoxSnell = 1 - Math.exp(2 * llNull / n);
  const nagelkerkeR2 = maxCoxSnell === 0 ? 0 : coxSnellR2 / maxCoxSnell;

  // Variance-covariance matrix for final model
  const XtWXfinal = zeros(p1, p1);
  for (let a = 0; a < p1; a++) {
    for (let b = a; b < p1; b++) {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        sum += X[i][a] * wFinal[i] * X[i][b];
      }
      XtWXfinal[a][b] = sum;
      XtWXfinal[b][a] = sum;
    }
  }

  let varCov;
  try {
    varCov = invert(XtWXfinal);
  } catch {
    // If singular, create zeros matrix
    varCov = zeros(p1, p1);
  }

  // Separation warning
  let separationWarning = false;
  for (let j = 0; j < p1; j++) {
    if (Math.abs(beta[j]) > 20) {
      separationWarning = true;
      break;
    }
  }

  // Build coefficients
  const names = ["(Constant)"];
  for (let j = 0; j < k; j++) {
    names.push(predictorNames?.[j] || `X${j + 1}`);
  }

  const coefficients: LogisticCoefficient[] = [];
  for (let j = 0; j < p1; j++) {
    const b = beta[j];
    const se = Math.sqrt(Math.max(0, varCov[j][j]));
    const wald = se > 0 ? (b / se) ** 2 : 0;
    const pVal = wald > 0 ? 1 - jStat.chisquare.cdf(wald, 1) : 1;
    const expB = Math.exp(b);
    const expBCI95: [number, number] = [
      Math.exp(b - 1.96 * se),
      Math.exp(b + 1.96 * se),
    ];

    coefficients.push({
      name: names[j],
      b,
      se,
      wald,
      df: 1,
      p: pVal,
      expB,
      expBCI95,
    });
  }

  // Classification table
  let tp = 0, tn = 0, fp = 0, fn = 0;
  for (let i = 0; i < n; i++) {
    const predClass = predicted[i] >= 0.5 ? 1 : 0;
    if (y[i] === 1 && predClass === 1) tp++;
    else if (y[i] === 0 && predClass === 0) tn++;
    else if (y[i] === 0 && predClass === 1) fp++;
    else fn++;
  }

  const sensitivity = tp + fn > 0 ? tp / (tp + fn) : 0;
  const specificity = tn + fp > 0 ? tn / (tn + fp) : 0;
  const accuracy = n > 0 ? (tp + tn) / n : 0;

  const classification: ClassificationResult = {
    tn,
    fp,
    fn,
    tp,
    sensitivity,
    specificity,
    accuracy,
  };

  // Hosmer-Lemeshow test
  const hl = hosmerLemeshow(y, predicted);

  return {
    n,
    k,
    converged,
    iterations,
    separationWarning,
    neg2LL,
    neg2LLNull,
    omnibusChiSq,
    omnibusDf,
    omnibusP,
    coxSnellR2,
    nagelkerkeR2,
    coefficients,
    classification,
    hosmerLemeshowChiSq: hl.chiSq,
    hosmerLemeshowDf: hl.df,
    hosmerLemeshowP: hl.p,
    predicted,
  };
}

export function formatLogisticRegressionAPA(result: LogisticRegressionResult): string {
  const pStr =
    result.omnibusP < 0.001
      ? "< .001"
      : `= ${result.omnibusP.toFixed(3).replace(/^0/, "")}`;
  const sig = result.omnibusP < 0.05 ? "" : "not ";
  return (
    `A binary logistic regression was conducted. ` +
    `The model was ${sig}statistically significant, ` +
    `\u03C7\u00B2(${result.omnibusDf}) = ${result.omnibusChiSq.toFixed(2)}, ` +
    `p ${pStr}, ` +
    `Nagelkerke R\u00B2 = ${result.nagelkerkeR2.toFixed(3)}. ` +
    `The model correctly classified ${(result.classification.accuracy * 100).toFixed(1)}% of cases.`
  );
}

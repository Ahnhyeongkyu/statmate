import jStat from "jstat";
import { transpose, multiply, multiplyVec, invert, type Matrix } from "./matrix";
import { requireFinite } from "./validation";

export interface CoefficientInfo {
  name: string;
  b: number;
  se: number;
  beta: number;
  t: number;
  p: number;
  ci95: [number, number];
  vif: number;
}

export interface MultipleRegressionResult {
  n: number;
  k: number;
  rSquared: number;
  adjustedRSquared: number;
  r: number;
  fStatistic: number;
  dfRegression: number;
  dfResidual: number;
  pValue: number;
  se: number;
  durbinWatson: number;
  coefficients: CoefficientInfo[];
  anova: {
    source: string;
    ss: number;
    df: number;
    ms: number;
    f: number;
    p: number;
  }[];
  predicted: number[];
  residuals: number[];
}

export interface MultipleRegressionInput {
  y: number[];
  xs: number[][];
  predictorNames?: string[];
}

/**
 * Compute VIF for predictor at index `idx` by regressing it on the other predictors.
 * VIF_j = 1 / (1 - R^2_j)
 */
function computeVif(xs: number[][], idx: number, n: number): number {
  const k = xs.length;
  if (k < 2) return 1;

  const yj = xs[idx];
  const otherXs: number[][] = xs.filter((_, i) => i !== idx);
  const m = otherXs.length;

  // Build design matrix with intercept for sub-regression
  const X: Matrix = [];
  for (let i = 0; i < n; i++) {
    const row = [1];
    for (let j = 0; j < m; j++) {
      row.push(otherXs[j][i]);
    }
    X.push(row);
  }

  const Xt = transpose(X);
  const XtX = multiply(Xt, X);

  let XtXinv: Matrix;
  try {
    XtXinv = invert(XtX);
  } catch {
    return Infinity;
  }

  const XtY = Xt.map((row) => {
    let s = 0;
    for (let i = 0; i < n; i++) s += row[i] * yj[i];
    return s;
  });

  const bSub = multiplyVec(XtXinv, XtY);
  const predSub = X.map((row) => {
    let s = 0;
    for (let j = 0; j < row.length; j++) s += row[j] * bSub[j];
    return s;
  });

  const meanYj = yj.reduce((a, b) => a + b, 0) / n;
  let ssTot = 0;
  let ssRes = 0;
  for (let i = 0; i < n; i++) {
    ssTot += (yj[i] - meanYj) ** 2;
    ssRes += (yj[i] - predSub[i]) ** 2;
  }

  if (ssTot === 0) return Infinity;
  const rSqJ = 1 - ssRes / ssTot;
  return rSqJ >= 1 ? Infinity : 1 / (1 - rSqJ);
}

export function multipleRegression(
  input: MultipleRegressionInput
): MultipleRegressionResult {
  const { y, xs, predictorNames } = input;
  const n = y.length;
  const k = xs.length;

  if (k < 2) throw new Error("Need at least 2 predictors");
  if (n < k + 2) throw new Error("Need at least k + 2 observations");
  for (let j = 0; j < k; j++) {
    if (xs[j].length !== n) {
      throw new Error(`Predictor ${j + 1} length (${xs[j].length}) does not match Y length (${n})`);
    }
  }
  requireFinite(y, "Y");
  for (let j = 0; j < k; j++) {
    requireFinite(xs[j], `Predictor ${j + 1}`);
  }

  const names = predictorNames ?? xs.map((_, i) => `X${i + 1}`);

  // Step 1: Build design matrix X (n x (k+1)): column of 1s + predictor columns
  const X: Matrix = [];
  for (let i = 0; i < n; i++) {
    const row = [1];
    for (let j = 0; j < k; j++) {
      row.push(xs[j][i]);
    }
    X.push(row);
  }

  // Step 2: beta = (X'X)^-1 X'Y
  const Xt = transpose(X);
  const XtX = multiply(Xt, X);
  const XtXinv = invert(XtX); // throws if singular

  const XtY: number[] = Xt.map((row) => {
    let s = 0;
    for (let i = 0; i < n; i++) s += row[i] * y[i];
    return s;
  });

  const beta = multiplyVec(XtXinv, XtY);

  // Step 3: Predicted values and residuals
  const predicted = X.map((row) => {
    let s = 0;
    for (let j = 0; j <= k; j++) s += row[j] * beta[j];
    return s;
  });
  const residuals = y.map((yi, i) => yi - predicted[i]);

  // Step 4: Sum of squares
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let ssTotal = 0;
  let ssRes = 0;
  for (let i = 0; i < n; i++) {
    ssTotal += (y[i] - meanY) ** 2;
    ssRes += residuals[i] ** 2;
  }
  const ssReg = ssTotal - ssRes;

  const dfRegression = k;
  const dfResidual = n - k - 1;
  const dfTotal = n - 1;

  const msReg = ssReg / dfRegression;
  const mse = ssRes / dfResidual;

  // Step 5: R^2, Adjusted R^2, F, p
  const rSquared = ssTotal === 0 ? 0 : 1 - ssRes / ssTotal;
  const adjustedRSquared = 1 - ((1 - rSquared) * dfTotal) / dfResidual;
  const r = Math.sqrt(rSquared);

  const fStatistic = mse === 0 ? 0 : msReg / mse;
  const pValue =
    fStatistic === 0
      ? 1
      : 1 - jStat.centralF.cdf(fStatistic, dfRegression, dfResidual);

  const se = Math.sqrt(mse);

  // Step 6: Coefficient standard errors, t-values, p-values
  // SE(beta_j) = sqrt(MSE * [(X'X)^-1]_jj)
  const tCrit = jStat.studentt.inv(0.975, dfResidual);

  // Standard deviations for standardized beta
  const sdY = Math.sqrt(ssTotal / (n - 1));
  const sdXs: number[] = xs.map((xj) => {
    const mean = xj.reduce((a, b) => a + b, 0) / n;
    const ss = xj.reduce((a, v) => a + (v - mean) ** 2, 0);
    return Math.sqrt(ss / (n - 1));
  });

  // VIFs
  const vifs = xs.map((_, j) => computeVif(xs, j, n));

  const coefficients: CoefficientInfo[] = [];

  // Intercept (index 0)
  const seBeta0 = Math.sqrt(mse * XtXinv[0][0]);
  const tBeta0 = seBeta0 === 0 ? 0 : beta[0] / seBeta0;
  const pBeta0 =
    tBeta0 === 0
      ? 1
      : 2 * (1 - jStat.studentt.cdf(Math.abs(tBeta0), dfResidual));

  coefficients.push({
    name: "(Intercept)",
    b: beta[0],
    se: seBeta0,
    beta: 0, // standardized beta is 0 for intercept
    t: tBeta0,
    p: pBeta0,
    ci95: [beta[0] - tCrit * seBeta0, beta[0] + tCrit * seBeta0],
    vif: 0, // VIF not applicable to intercept
  });

  // Predictors (indices 1..k)
  for (let j = 0; j < k; j++) {
    const idx = j + 1; // index in beta and XtXinv
    const seBj = Math.sqrt(mse * XtXinv[idx][idx]);
    const tBj = seBj === 0 ? 0 : beta[idx] / seBj;
    const pBj =
      tBj === 0
        ? 1
        : 2 * (1 - jStat.studentt.cdf(Math.abs(tBj), dfResidual));

    // Standardized beta = B * (SD_xj / SD_y)
    const stdBeta = sdY === 0 ? 0 : beta[idx] * (sdXs[j] / sdY);

    coefficients.push({
      name: names[j],
      b: beta[idx],
      se: seBj,
      beta: stdBeta,
      t: tBj,
      p: pBj,
      ci95: [beta[idx] - tCrit * seBj, beta[idx] + tCrit * seBj],
      vif: vifs[j],
    });
  }

  // Step 9: Durbin-Watson statistic
  let dwNum = 0;
  let dwDen = 0;
  for (let i = 0; i < n; i++) {
    dwDen += residuals[i] ** 2;
    if (i > 0) {
      dwNum += (residuals[i] - residuals[i - 1]) ** 2;
    }
  }
  const durbinWatson = dwDen === 0 ? 0 : dwNum / dwDen;

  // ANOVA table
  const anova = [
    {
      source: "Regression",
      ss: ssReg,
      df: dfRegression,
      ms: msReg,
      f: fStatistic,
      p: pValue,
    },
    {
      source: "Residual",
      ss: ssRes,
      df: dfResidual,
      ms: mse,
      f: 0,
      p: 0,
    },
    {
      source: "Total",
      ss: ssTotal,
      df: dfTotal,
      ms: 0,
      f: 0,
      p: 0,
    },
  ];

  return {
    n,
    k,
    rSquared,
    adjustedRSquared,
    r,
    fStatistic,
    dfRegression,
    dfResidual,
    pValue,
    se,
    durbinWatson,
    coefficients,
    anova,
    predicted,
    residuals,
  };
}

export function formatMultipleRegressionAPA(
  result: MultipleRegressionResult
): string {
  const pStr =
    result.pValue < 0.001
      ? "< .001"
      : `= ${result.pValue.toFixed(3).replace(/^0/, "")}`;

  const predictorNames = result.coefficients
    .filter((c) => c.name !== "(Intercept)")
    .map((c) => c.name)
    .join(", ");

  return (
    `A multiple regression was conducted to predict the outcome from ${predictorNames}. ` +
    `The model was ${result.pValue < 0.05 ? "" : "not "}statistically significant, ` +
    `F(${result.dfRegression}, ${result.dfResidual}) = ${result.fStatistic.toFixed(2)}, ` +
    `p ${pStr}, R\u00B2 = ${result.rSquared.toFixed(3)}, ` +
    `Adjusted R\u00B2 = ${result.adjustedRSquared.toFixed(3)}.`
  );
}

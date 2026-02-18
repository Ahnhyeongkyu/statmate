import jStat from "jstat";
import { requireFinite } from "./validation";

export interface RegressionInput {
  x: number[];
  y: number[];
}

export interface RegressionResult {
  n: number;
  slope: number;
  intercept: number;
  rSquared: number;
  r: number;
  adjustedRSquared: number;
  se: number;
  slopesSE: number;
  interceptSE: number;
  fStatistic: number;
  dfRegression: number;
  dfResidual: number;
  pValue: number;
  tSlope: number;
  pSlope: number;
  tIntercept: number;
  pIntercept: number;
  ci95Slope: [number, number];
  ci95Intercept: [number, number];
  predicted: number[];
  residuals: number[];
}

export function simpleLinearRegression(
  input: RegressionInput
): RegressionResult {
  const { x, y } = input;
  const n = x.length;

  if (n !== y.length)
    throw new Error("X and Y must have the same length");
  if (n < 3)
    throw new Error("Need at least 3 data points");
  requireFinite(x, "X");
  requireFinite(y, "Y");

  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let ssXX = 0;
  let ssYY = 0;
  let ssXY = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    ssXX += dx * dx;
    ssYY += dy * dy;
    ssXY += dx * dy;
  }

  if (ssXX === 0) throw new Error("X has zero variance");

  const slope = ssXY / ssXX;
  const intercept = meanY - slope * meanX;

  const predicted = x.map((xi) => intercept + slope * xi);
  const residuals = y.map((yi, i) => yi - predicted[i]);

  const ssRes = residuals.reduce((sum, r) => sum + r * r, 0);
  const ssTot = ssYY;
  const ssReg = ssTot - ssRes;

  const rSquared = ssTot === 0 ? 0 : 1 - ssRes / ssTot;
  const r = ssXY / Math.sqrt(ssXX * ssYY);
  const adjustedRSquared = 1 - ((1 - rSquared) * (n - 1)) / (n - 2);

  const dfRegression = 1;
  const dfResidual = n - 2;

  const mse = ssRes / dfResidual;
  const se = Math.sqrt(mse);

  const fStatistic = dfResidual <= 0 || mse === 0 ? 0 : ssReg / mse;
  const pValue =
    fStatistic === 0
      ? 1
      : 1 - jStat.centralF.cdf(fStatistic, dfRegression, dfResidual);

  const slopesSE = Math.sqrt(mse / ssXX);
  const interceptSE = Math.sqrt(mse * (1 / n + (meanX * meanX) / ssXX));

  const tSlope = slopesSE === 0 ? 0 : slope / slopesSE;
  const pSlope =
    tSlope === 0
      ? 1
      : 2 * (1 - jStat.studentt.cdf(Math.abs(tSlope), dfResidual));

  const tIntercept = interceptSE === 0 ? 0 : intercept / interceptSE;
  const pIntercept =
    tIntercept === 0
      ? 1
      : 2 * (1 - jStat.studentt.cdf(Math.abs(tIntercept), dfResidual));

  const tCrit = jStat.studentt.inv(0.975, dfResidual);
  const ci95Slope: [number, number] = [
    slope - tCrit * slopesSE,
    slope + tCrit * slopesSE,
  ];
  const ci95Intercept: [number, number] = [
    intercept - tCrit * interceptSE,
    intercept + tCrit * interceptSE,
  ];

  return {
    n,
    slope,
    intercept,
    rSquared,
    r,
    adjustedRSquared,
    se,
    slopesSE,
    interceptSE,
    fStatistic,
    dfRegression,
    dfResidual,
    pValue,
    tSlope,
    pSlope,
    tIntercept,
    pIntercept,
    ci95Slope,
    ci95Intercept,
    predicted,
    residuals,
  };
}

export function formatRegressionAPA(result: RegressionResult): string {
  const pStr =
    result.pValue < 0.001
      ? "< .001"
      : `= ${result.pValue.toFixed(3).replace(/^0/, "")}`;
  return (
    `A simple linear regression was conducted. ` +
    `The model was ${result.pValue < 0.05 ? "" : "not "}statistically significant, ` +
    `F(${result.dfRegression}, ${result.dfResidual}) = ${result.fStatistic.toFixed(2)}, ` +
    `p ${pStr}, R² = ${result.rSquared.toFixed(3)}. ` +
    `The regression equation was ŷ = ${result.intercept.toFixed(2)} + ${result.slope.toFixed(2)}x.`
  );
}

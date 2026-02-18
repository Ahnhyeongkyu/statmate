import jStat from "jstat";
import { requireFinite } from "./validation";

export type TailType = "two" | "greater" | "less";

export interface OneSampleTInput {
  data: number[];
  testValue: number;
  alpha?: number;
  tail?: TailType;
}

export interface OneSampleTResult {
  n: number;
  mean: number;
  sd: number;
  se: number;
  testValue: number;
  t: number;
  df: number;
  pValue: number;
  meanDiff: number;
  ci95: [number, number];
  cohensD: number;
  effectSizeLabel: string;
  alpha: number;
  tail: TailType;
}

export function oneSampleTTest(input: OneSampleTInput): OneSampleTResult {
  const { data, testValue, alpha = 0.05, tail = "two" } = input;
  const n = data.length;
  if (n < 2) throw new Error("Need at least 2 values");
  requireFinite(data, "Data");

  const mean = data.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(
    data.reduce((sum, x) => sum + (x - mean) ** 2, 0) / (n - 1)
  );
  const se = sd / Math.sqrt(n);
  const meanDiff = mean - testValue;
  const t = se === 0 ? (meanDiff === 0 ? 0 : Infinity) : meanDiff / se;
  const df = n - 1;

  let pValue: number;
  if (Math.abs(t) === Infinity) {
    pValue = 0;
  } else if (tail === "two") {
    pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(t), df));
  } else if (tail === "greater") {
    pValue = 1 - jStat.studentt.cdf(t, df);
  } else {
    pValue = jStat.studentt.cdf(t, df);
  }

  const tCrit = jStat.studentt.inv(1 - alpha / 2, df);
  const ci95: [number, number] = [
    meanDiff - tCrit * se,
    meanDiff + tCrit * se,
  ];

  const cohensD = sd === 0 ? 0 : Math.abs(meanDiff) / sd;
  let effectSizeLabel: string;
  if (cohensD < 0.2) effectSizeLabel = "negligible";
  else if (cohensD < 0.5) effectSizeLabel = "small";
  else if (cohensD < 0.8) effectSizeLabel = "medium";
  else effectSizeLabel = "large";

  return {
    n,
    mean,
    sd,
    se,
    testValue,
    t,
    df,
    pValue,
    meanDiff,
    ci95,
    cohensD,
    effectSizeLabel,
    alpha,
    tail,
  };
}

export function formatOneSampleTAPA(result: OneSampleTResult): string {
  const tStr = Math.abs(result.t) === Infinity ? "∞" : result.t.toFixed(2);
  const pStr =
    result.pValue < 0.001
      ? "< .001"
      : `= ${result.pValue.toFixed(3).replace(/^0/, "")}`;
  const tailNote = result.tail !== "two" ? " (one-tailed)" : "";
  const ciPct = Math.round((1 - result.alpha) * 100);
  return (
    `A one-sample t-test was conducted to compare the sample mean ` +
    `(M = ${result.mean.toFixed(2)}, SD = ${result.sd.toFixed(2)}) ` +
    `to the test value of ${result.testValue.toFixed(2)}. ` +
    `The result was ${result.pValue < result.alpha ? "" : "not "}statistically significant, ` +
    `t(${result.df}) = ${tStr}, p ${pStr}${tailNote}, ` +
    `d = ${result.cohensD.toFixed(2)}, ` +
    `${ciPct}% CI [${result.ci95[0].toFixed(2)}, ${result.ci95[1].toFixed(2)}].`
  );
}

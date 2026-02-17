import jStat from "jstat";

export type SampleSizeTestType =
  | "two-sample-t"
  | "paired-t"
  | "one-sample-t"
  | "anova"
  | "correlation"
  | "chi-square-2x2"
  | "proportion";

export interface SampleSizeInput {
  testType: SampleSizeTestType;
  effectSize: number;
  alpha: number;
  power: number;
  // ANOVA-specific
  numGroups?: number;
}

export interface SampleSizeResult {
  testType: SampleSizeTestType;
  nPerGroup: number;
  nTotal: number;
  effectSize: number;
  effectSizeLabel: string;
  alpha: number;
  power: number;
  achievedPower: number;
}

function effectSizeLabel(testType: SampleSizeTestType, d: number): string {
  if (testType === "correlation") {
    const abs = Math.abs(d);
    if (abs < 0.1) return "negligible";
    if (abs < 0.3) return "small";
    if (abs < 0.5) return "medium";
    return "large";
  }
  if (testType === "chi-square-2x2") {
    if (d < 0.1) return "negligible";
    if (d < 0.3) return "small";
    if (d < 0.5) return "medium";
    return "large";
  }
  // Cohen's d conventions for t-tests and ANOVA (f)
  if (testType === "anova") {
    if (d < 0.1) return "small";
    if (d < 0.25) return "medium";
    return "large";
  }
  // t-tests: Cohen's d
  if (d < 0.2) return "negligible";
  if (d < 0.5) return "small";
  if (d < 0.8) return "medium";
  return "large";
}

/**
 * Two-sample t-test sample size (per group)
 * Formula: n = (z_alpha/2 + z_beta)^2 * 2 / d^2
 */
function twoSampleT(d: number, alpha: number, power: number): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
  const zBeta = jStat.normal.inv(power, 0, 1);
  return Math.ceil(((zAlpha + zBeta) ** 2 * 2) / (d * d));
}

/**
 * Paired t-test / one-sample t-test sample size
 * Formula: n = (z_alpha/2 + z_beta)^2 / d^2
 */
function pairedOrOneSampleT(d: number, alpha: number, power: number): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
  const zBeta = jStat.normal.inv(power, 0, 1);
  return Math.ceil(((zAlpha + zBeta) ** 2) / (d * d));
}

/**
 * ANOVA sample size (per group)
 * Uses Cohen's f effect size
 * Formula: n = (z_alpha/2 + z_beta)^2 * (1 + 1/k) / f^2
 * Simplified approximation; for exact, use non-central F
 */
function anovaPerGroup(f: number, alpha: number, power: number, k: number): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
  const zBeta = jStat.normal.inv(power, 0, 1);
  // More accurate: use the lambda = n*f^2*k approach
  // Simplified: n per group ≈ (z_a + z_b)^2 / f^2 + (k+1)/(2*k)
  const n = Math.ceil(((zAlpha + zBeta) ** 2) / (f * f) + (k - 1) / (2 * k));
  return Math.max(n, 2);
}

/**
 * Correlation sample size
 * Formula: n = ((z_alpha/2 + z_beta) / arctanh(|r|))^2 + 3
 */
function correlationN(r: number, alpha: number, power: number): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
  const zBeta = jStat.normal.inv(power, 0, 1);
  const rAbs = Math.min(Math.abs(r), 0.999);
  const zr = 0.5 * Math.log((1 + rAbs) / (1 - rAbs)); // arctanh
  return Math.ceil(((zAlpha + zBeta) / zr) ** 2 + 3);
}

/**
 * Chi-square 2x2 sample size
 * Uses Cohen's w effect size
 * Formula: n = ((z_alpha/2 + z_beta) / w)^2
 */
function chiSquare2x2(w: number, alpha: number, power: number): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
  const zBeta = jStat.normal.inv(power, 0, 1);
  return Math.ceil(((zAlpha + zBeta) / w) ** 2);
}

/**
 * Two-proportion sample size (per group)
 * Formula: n = (z_alpha/2 * sqrt(2*pbar*qbar) + z_beta * sqrt(p1*q1 + p2*q2))^2 / (p1-p2)^2
 * Uses effect size as proportion difference, assuming p1 = 0.5 + d/2, p2 = 0.5 - d/2
 */
function proportionN(d: number, alpha: number, power: number): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
  const zBeta = jStat.normal.inv(power, 0, 1);
  // Simplified: Cohen's h effect size approach
  // h = 2 * arcsin(sqrt(p1)) - 2 * arcsin(sqrt(p2))
  // For simplicity, use the direct formula with h ≈ d
  return Math.ceil(((zAlpha + zBeta) / d) ** 2);
}

/**
 * Compute achieved power given n, effect size, alpha
 */
function achievedPower(
  testType: SampleSizeTestType,
  n: number,
  effectSize: number,
  alpha: number,
  numGroups?: number
): number {
  const zAlpha = jStat.normal.inv(1 - alpha / 2, 0, 1);
  let lambda: number;

  switch (testType) {
    case "two-sample-t":
      lambda = effectSize * Math.sqrt(n / 2);
      break;
    case "paired-t":
    case "one-sample-t":
      lambda = effectSize * Math.sqrt(n);
      break;
    case "correlation": {
      const rAbs = Math.min(Math.abs(effectSize), 0.999);
      const zr = 0.5 * Math.log((1 + rAbs) / (1 - rAbs));
      lambda = zr * Math.sqrt(n - 3);
      break;
    }
    case "anova":
      lambda = effectSize * Math.sqrt(n);
      break;
    case "chi-square-2x2":
    case "proportion":
      lambda = effectSize * Math.sqrt(n);
      break;
    default:
      lambda = effectSize * Math.sqrt(n);
  }

  const zBeta = lambda - zAlpha;
  return jStat.normal.cdf(zBeta, 0, 1);
}

export function calculateSampleSize(input: SampleSizeInput): SampleSizeResult {
  const { testType, effectSize, alpha, power, numGroups = 3 } = input;

  if (effectSize <= 0) throw new Error("Effect size must be greater than 0");
  if (alpha <= 0 || alpha >= 1) throw new Error("Alpha must be between 0 and 1");
  if (power <= 0 || power >= 1) throw new Error("Power must be between 0 and 1");

  let nPerGroup: number;
  let nTotal: number;

  switch (testType) {
    case "two-sample-t":
      nPerGroup = twoSampleT(effectSize, alpha, power);
      nTotal = nPerGroup * 2;
      break;
    case "paired-t":
    case "one-sample-t":
      nPerGroup = pairedOrOneSampleT(effectSize, alpha, power);
      nTotal = nPerGroup;
      break;
    case "anova":
      nPerGroup = anovaPerGroup(effectSize, alpha, power, numGroups);
      nTotal = nPerGroup * numGroups;
      break;
    case "correlation":
      nPerGroup = correlationN(effectSize, alpha, power);
      nTotal = nPerGroup;
      break;
    case "chi-square-2x2":
      nPerGroup = chiSquare2x2(effectSize, alpha, power);
      nTotal = nPerGroup;
      break;
    case "proportion":
      nPerGroup = proportionN(effectSize, alpha, power);
      nTotal = nPerGroup * 2;
      break;
    default:
      throw new Error(`Unknown test type: ${testType}`);
  }

  const ap = achievedPower(testType, nPerGroup, effectSize, alpha, numGroups);

  return {
    testType,
    nPerGroup,
    nTotal,
    effectSize,
    effectSizeLabel: effectSizeLabel(testType, effectSize),
    alpha,
    power,
    achievedPower: Math.min(ap, 0.9999),
  };
}

export function formatSampleSizeAPA(result: SampleSizeResult): string {
  const testNames: Record<SampleSizeTestType, string> = {
    "two-sample-t": "independent-samples t-test",
    "paired-t": "paired-samples t-test",
    "one-sample-t": "one-sample t-test",
    anova: "one-way ANOVA",
    correlation: "correlation",
    "chi-square-2x2": "chi-square test",
    proportion: "two-proportion test",
  };
  return (
    `A power analysis for a ${testNames[result.testType]} ` +
    `was conducted using an effect size of ${result.effectSize.toFixed(2)}, ` +
    `\u03B1 = ${result.alpha.toFixed(2)}, and power = ${result.power.toFixed(2)}. ` +
    `The required sample size is N = ${result.nTotal}` +
    (result.nPerGroup !== result.nTotal
      ? ` (${result.nPerGroup} per group)`
      : "") +
    "."
  );
}

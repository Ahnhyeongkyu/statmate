import jStat from "jstat";
import { validateArray } from "./validation";

export interface CellStats {
  factorA: string;
  factorB: string;
  n: number;
  mean: number;
  sd: number;
}

export interface EffectResult {
  ss: number;
  df: number;
  ms: number;
  f: number;
  p: number;
  etaSq: number;
}

export interface TwoWayAnovaResult {
  factorA: EffectResult;
  factorB: EffectResult;
  interaction: EffectResult;
  residual: { ss: number; df: number; ms: number };
  total: { ss: number; df: number };
  cellStats: CellStats[];
  significant_A: boolean;
  significant_B: boolean;
  significant_AB: boolean;
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
 * Two-Way (Factorial) ANOVA.
 *
 * @param data data[i][j] = array of values for level i of Factor A, level j of Factor B
 * @param factorANames names for Factor A levels
 * @param factorBNames names for Factor B levels
 */
export function twoWayAnova(
  data: number[][][],
  factorANames?: string[],
  factorBNames?: string[]
): TwoWayAnovaResult {
  const a = data.length; // number of Factor A levels
  if (a < 2) throw new Error("Factor A must have at least 2 levels");

  const b = data[0].length; // number of Factor B levels
  if (b < 2) throw new Error("Factor B must have at least 2 levels");

  for (let i = 0; i < a; i++) {
    if (data[i].length !== b) {
      throw new Error(`All levels of Factor A must have the same number of Factor B levels`);
    }
    for (let j = 0; j < b; j++) {
      validateArray(data[i][j], 1, `Cell [${i + 1}, ${j + 1}]`);
    }
  }

  const namesA = factorANames || Array.from({ length: a }, (_, i) => `A${i + 1}`);
  const namesB = factorBNames || Array.from({ length: b }, (_, j) => `B${j + 1}`);

  // Collect all values and compute grand mean
  const allValues: number[] = [];
  let N = 0;
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      for (const x of data[i][j]) {
        allValues.push(x);
        N++;
      }
    }
  }

  if (N <= a * b) {
    throw new Error(`Need more than ${a * b} total observations for a ${a}x${b} design`);
  }

  const grandMean = mean(allValues);

  // Cell means and sizes
  const cellMean: number[][] = [];
  const cellN: number[][] = [];
  for (let i = 0; i < a; i++) {
    cellMean[i] = [];
    cellN[i] = [];
    for (let j = 0; j < b; j++) {
      cellMean[i][j] = mean(data[i][j]);
      cellN[i][j] = data[i][j].length;
    }
  }

  // Marginal means for Factor A
  const marginalA: number[] = [];
  const marginalN_A: number[] = [];
  for (let i = 0; i < a; i++) {
    const vals: number[] = [];
    for (let j = 0; j < b; j++) {
      vals.push(...data[i][j]);
    }
    marginalA[i] = mean(vals);
    marginalN_A[i] = vals.length;
  }

  // Marginal means for Factor B
  const marginalB: number[] = [];
  const marginalN_B: number[] = [];
  for (let j = 0; j < b; j++) {
    const vals: number[] = [];
    for (let i = 0; i < a; i++) {
      vals.push(...data[i][j]);
    }
    marginalB[j] = mean(vals);
    marginalN_B[j] = vals.length;
  }

  // SS_A = sum over i of n_i. * (meanA_i - grandMean)^2
  let ssA = 0;
  for (let i = 0; i < a; i++) {
    ssA += marginalN_A[i] * (marginalA[i] - grandMean) ** 2;
  }

  // SS_B = sum over j of n_.j * (meanB_j - grandMean)^2
  let ssB = 0;
  for (let j = 0; j < b; j++) {
    ssB += marginalN_B[j] * (marginalB[j] - grandMean) ** 2;
  }

  // SS_cells = sum over i,j of n_ij * (cellMean_ij - grandMean)^2
  let ssCells = 0;
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      ssCells += cellN[i][j] * (cellMean[i][j] - grandMean) ** 2;
    }
  }

  // SS_AB = SS_cells - SS_A - SS_B
  let ssAB = ssCells - ssA - ssB;
  // Guard against floating-point negatives
  if (ssAB < 0) ssAB = 0;

  // SS_within (error / residual)
  let ssWithin = 0;
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      const cm = cellMean[i][j];
      for (const x of data[i][j]) {
        ssWithin += (x - cm) ** 2;
      }
    }
  }

  // SS_total
  let ssTotal = 0;
  for (const x of allValues) {
    ssTotal += (x - grandMean) ** 2;
  }

  // Degrees of freedom
  const dfA = a - 1;
  const dfB = b - 1;
  const dfAB = (a - 1) * (b - 1);
  const dfWithin = N - a * b;
  const dfTotal = N - 1;

  // Mean squares
  const msA = ssA / dfA;
  const msB = ssB / dfB;
  const msAB = dfAB > 0 ? ssAB / dfAB : 0;
  const msWithin = ssWithin / dfWithin;

  // F statistics
  const fA = msWithin > 0 ? msA / msWithin : 0;
  const fB = msWithin > 0 ? msB / msWithin : 0;
  const fAB = msWithin > 0 ? msAB / msWithin : 0;

  // P-values from F distribution
  const pA = msWithin > 0 ? 1 - jStat.centralF.cdf(fA, dfA, dfWithin) : 1;
  const pB = msWithin > 0 ? 1 - jStat.centralF.cdf(fB, dfB, dfWithin) : 1;
  const pAB = msWithin > 0 && dfAB > 0 ? 1 - jStat.centralF.cdf(fAB, dfAB, dfWithin) : 1;

  // Partial eta-squared for each effect
  const etaSqA = ssA / (ssA + ssWithin);
  const etaSqB = ssB / (ssB + ssWithin);
  const etaSqAB = (ssAB + ssWithin) > 0 ? ssAB / (ssAB + ssWithin) : 0;

  // Cell statistics
  const cellStats: CellStats[] = [];
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      cellStats.push({
        factorA: namesA[i],
        factorB: namesB[j],
        n: cellN[i][j],
        mean: cellMean[i][j],
        sd: sd(data[i][j]),
      });
    }
  }

  return {
    factorA: { ss: ssA, df: dfA, ms: msA, f: fA, p: pA, etaSq: etaSqA },
    factorB: { ss: ssB, df: dfB, ms: msB, f: fB, p: pB, etaSq: etaSqB },
    interaction: { ss: ssAB, df: dfAB, ms: msAB, f: fAB, p: pAB, etaSq: etaSqAB },
    residual: { ss: ssWithin, df: dfWithin, ms: msWithin },
    total: { ss: ssTotal, df: dfTotal },
    cellStats,
    significant_A: pA < 0.05,
    significant_B: pB < 0.05,
    significant_AB: pAB < 0.05,
  };
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  if (p >= 1) return "= 1.000";
  return `= .${p.toFixed(3).slice(2)}`;
}

export function formatTwoWayAnovaAPA(result: TwoWayAnovaResult, factorAName: string, factorBName: string): string {
  const lines: string[] = [];
  const fmtEffect = (label: string, e: EffectResult) => {
    return `${label}: F(${e.df}, ${result.residual.df}) = ${e.f.toFixed(2)}, p ${formatPValue(e.p)}, \u03B7\u00B2p = ${e.etaSq.toFixed(2)}`;
  };
  lines.push(fmtEffect(factorAName, result.factorA));
  lines.push(fmtEffect(factorBName, result.factorB));
  lines.push(fmtEffect(`${factorAName} \u00D7 ${factorBName}`, result.interaction));
  return lines.join("\n");
}

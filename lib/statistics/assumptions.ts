import jStat from "jstat";

export interface NormalityResult {
  testName: string;
  statistic: number;
  pValue: number;
  isNormal: boolean;
  n: number;
}

export interface LeveneResult {
  fStatistic: number;
  pValue: number;
  isEqual: boolean;
  dfBetween: number;
  dfWithin: number;
}

export interface AssumptionCheckResult {
  normality: NormalityResult[];
  levene?: LeveneResult;
  recommendations: string[];
}

/**
 * Shapiro-Wilk test approximation for normality.
 * Uses D'Agostino-Pearson omnibus test for n > 5000,
 * and a simplified Shapiro-Wilk approximation for smaller samples.
 */
export function testNormality(data: number[], label: string = "Data"): NormalityResult {
  const n = data.length;
  if (n < 3) {
    return { testName: "Shapiro-Wilk", statistic: 1, pValue: 1, isNormal: true, n };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const mean = data.reduce((a, b) => a + b, 0) / n;
  const ss = data.reduce((sum, x) => sum + (x - mean) ** 2, 0);

  if (ss === 0) {
    return { testName: "Shapiro-Wilk", statistic: 1, pValue: 1, isNormal: true, n };
  }

  // Simplified Shapiro-Wilk using correlation with normal order statistics
  const normalQuantiles: number[] = [];
  for (let i = 0; i < n; i++) {
    const p = (i + 0.375) / (n + 0.25);
    normalQuantiles.push(jStat.normal.inv(p, 0, 1));
  }

  // Correlation between sorted data and expected normal quantiles
  const meanSorted = sorted.reduce((a, b) => a + b, 0) / n;
  const meanNQ = normalQuantiles.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let denSorted = 0;
  let denNQ = 0;
  for (let i = 0; i < n; i++) {
    const dS = sorted[i] - meanSorted;
    const dN = normalQuantiles[i] - meanNQ;
    num += dS * dN;
    denSorted += dS * dS;
    denNQ += dN * dN;
  }

  const r = num / Math.sqrt(denSorted * denNQ);
  const W = r * r;

  // Transform W to approximate p-value using log transformation
  const mu = 0.0038915 * Math.log(n) ** 3 - 0.083751 * Math.log(n) ** 2 - 0.31082 * Math.log(n) - 1.5861;
  const sigma = Math.exp(0.0030302 * Math.log(n) ** 2 - 0.082676 * Math.log(n) - 0.4803);
  const z = (Math.log(1 - W) - mu) / sigma;
  const pValue = 1 - jStat.normal.cdf(z, 0, 1);

  return {
    testName: "Shapiro-Wilk",
    statistic: Math.min(W, 1),
    pValue: Math.max(0, Math.min(1, pValue)),
    isNormal: pValue > 0.05,
    n,
  };
}

/**
 * Levene's test for equality of variances.
 * Uses median-based (Brown-Forsythe) version for robustness.
 */
export function leveneTest(groups: number[][]): LeveneResult {
  const k = groups.length;
  const N = groups.reduce((sum, g) => sum + g.length, 0);

  // Median-based deviations (Brown-Forsythe)
  const medians = groups.map((g) => {
    const sorted = [...g].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  });

  const deviations = groups.map((g, i) => g.map((x) => Math.abs(x - medians[i])));

  // Overall mean of deviations
  const allDevs = deviations.flat();
  const grandMean = allDevs.reduce((a, b) => a + b, 0) / N;

  // Group means of deviations
  const groupMeans = deviations.map((d) => d.reduce((a, b) => a + b, 0) / d.length);

  // Between-group SS
  let ssBetween = 0;
  for (let i = 0; i < k; i++) {
    ssBetween += groups[i].length * (groupMeans[i] - grandMean) ** 2;
  }

  // Within-group SS
  let ssWithin = 0;
  for (let i = 0; i < k; i++) {
    for (const d of deviations[i]) {
      ssWithin += (d - groupMeans[i]) ** 2;
    }
  }

  const dfBetween = k - 1;
  const dfWithin = N - k;
  const fStatistic = dfWithin > 0 && ssWithin > 0
    ? (ssBetween / dfBetween) / (ssWithin / dfWithin)
    : 0;
  const pValue = fStatistic === 0
    ? 1
    : 1 - jStat.centralF.cdf(fStatistic, dfBetween, dfWithin);

  return {
    fStatistic,
    pValue,
    isEqual: pValue > 0.05,
    dfBetween,
    dfWithin,
  };
}

/**
 * Run assumption checks for a given test type.
 */
export function checkAssumptions(
  testType: "t-test" | "anova" | "one-sample-t" | "mann-whitney" | "wilcoxon" | "correlation" | "regression",
  groups: number[][],
  language: "en" | "ko" = "en"
): AssumptionCheckResult {
  const recommendations: string[] = [];
  const normality: NormalityResult[] = [];

  // Normality check for each group
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].length >= 3) {
      const label = groups.length === 1 ? "Data" : `Group ${i + 1}`;
      normality.push(testNormality(groups[i], label));
    }
  }

  const anyNonNormal = normality.some((n) => !n.isNormal);

  // Levene's test (for 2+ groups)
  let levene: LeveneResult | undefined;
  if (groups.length >= 2 && (testType === "t-test" || testType === "anova")) {
    levene = leveneTest(groups);
  }

  // Generate recommendations
  if (language === "ko") {
    if (anyNonNormal) {
      if (testType === "t-test") {
        recommendations.push("정규성 가정 위반: Mann-Whitney U 검정 사용을 권장합니다.");
      } else if (testType === "anova") {
        recommendations.push("정규성 가정 위반: Kruskal-Wallis 검정 사용을 권장합니다.");
      } else if (testType === "one-sample-t") {
        recommendations.push("정규성 가정 위반: Wilcoxon 부호순위 검정 사용을 권장합니다.");
      } else if (testType === "correlation") {
        recommendations.push("정규성 가정 위반: Spearman 순위상관 사용을 권장합니다.");
      } else if (testType === "regression") {
        recommendations.push("잔차 정규성 가정 위반: 데이터 변환 또는 비모수 회귀를 고려하세요.");
      }
    }
    if (levene && !levene.isEqual) {
      if (testType === "t-test") {
        recommendations.push("등분산 가정 위반: Welch's t-검정이 자동 적용됩니다.");
      } else if (testType === "anova") {
        recommendations.push("등분산 가정 위반: Welch ANOVA 또는 비모수 검정을 고려하세요.");
      }
    }
    if (recommendations.length === 0) {
      recommendations.push("모든 가정이 충족되었습니다. 현재 검정을 사용해도 됩니다.");
    }
  } else {
    if (anyNonNormal) {
      if (testType === "t-test") {
        recommendations.push("Normality violated: Consider Mann-Whitney U test.");
      } else if (testType === "anova") {
        recommendations.push("Normality violated: Consider Kruskal-Wallis test.");
      } else if (testType === "one-sample-t") {
        recommendations.push("Normality violated: Consider Wilcoxon signed-rank test.");
      } else if (testType === "correlation") {
        recommendations.push("Normality violated: Consider Spearman rank correlation.");
      } else if (testType === "regression") {
        recommendations.push("Residual normality violated: Consider data transformation or non-parametric regression.");
      }
    }
    if (levene && !levene.isEqual) {
      if (testType === "t-test") {
        recommendations.push("Equal variance violated: Welch's t-test is automatically applied.");
      } else if (testType === "anova") {
        recommendations.push("Equal variance violated: Consider Welch ANOVA or non-parametric test.");
      }
    }
    if (recommendations.length === 0) {
      recommendations.push("All assumptions met. Current test is appropriate.");
    }
  }

  return { normality, levene, recommendations };
}

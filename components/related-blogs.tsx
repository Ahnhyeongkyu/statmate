"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const CALCULATOR_BLOG_MAP: Record<string, { slug: string; titleKey: string }[]> = {
  "t-test": [
    { slug: "t-test-apa-reporting", titleKey: "tTestApa" },
    { slug: "how-to-run-t-test", titleKey: "howToRunTTest" },
    { slug: "understanding-p-value", titleKey: "understandingPValue" },
  ],
  "anova": [
    { slug: "anova-apa-reporting", titleKey: "anovaApa" },
    { slug: "how-to-run-anova", titleKey: "howToRunAnova" },
    { slug: "understanding-effect-size", titleKey: "understandingEffectSize" },
  ],
  "chi-square": [
    { slug: "chi-square-apa-reporting", titleKey: "chiSquareApa" },
    { slug: "how-to-run-chi-square-test", titleKey: "howToRunChiSquare" },
    { slug: "chi-square-vs-fisher-exact", titleKey: "chiSquareVsFisher" },
  ],
  "correlation": [
    { slug: "correlation-apa-reporting", titleKey: "correlationApa" },
    { slug: "how-to-run-correlation-analysis", titleKey: "howToRunCorrelation" },
    { slug: "correlation-vs-regression", titleKey: "correlationVsRegression" },
  ],
  "descriptive": [
    { slug: "descriptive-statistics-apa-reporting", titleKey: "descriptiveApa" },
    { slug: "normality-test-guide", titleKey: "normalityTestGuide" },
  ],
  "sample-size": [
    { slug: "how-to-calculate-sample-size", titleKey: "howToCalculateSampleSize" },
    { slug: "sample-size-determination", titleKey: "sampleSizeDetermination" },
  ],
  "one-sample-t": [
    { slug: "one-sample-t-test-apa-reporting", titleKey: "oneSampleTApa" },
    { slug: "understanding-p-value", titleKey: "understandingPValue" },
  ],
  "mann-whitney": [
    { slug: "mann-whitney-apa-reporting", titleKey: "mannWhitneyApa" },
    { slug: "how-to-run-mann-whitney-test", titleKey: "howToRunMannWhitney" },
    { slug: "nonparametric-tests-guide", titleKey: "nonparametricGuide" },
  ],
  "wilcoxon": [
    { slug: "wilcoxon-apa-reporting", titleKey: "wilcoxonApa" },
    { slug: "paired-t-test-vs-wilcoxon", titleKey: "pairedTTestVsWilcoxon" },
  ],
  "regression": [
    { slug: "regression-apa-reporting", titleKey: "regressionApa" },
    { slug: "how-to-run-regression-analysis", titleKey: "howToRunRegression" },
    { slug: "correlation-vs-regression", titleKey: "correlationVsRegression" },
  ],
  "multiple-regression": [
    { slug: "regression-apa-reporting", titleKey: "regressionApa" },
    { slug: "simple-vs-multiple-regression", titleKey: "simpleVsMultipleRegression" },
  ],
  "cronbach-alpha": [
    { slug: "reliability-cronbach-alpha", titleKey: "reliabilityCronbach" },
    { slug: "factor-analysis-apa-reporting", titleKey: "factorAnalysisApa" },
  ],
  "logistic-regression": [
    { slug: "logistic-regression-apa-reporting", titleKey: "logisticRegressionApa" },
    { slug: "how-to-run-logistic-regression", titleKey: "howToRunLogisticRegression" },
  ],
  "factor-analysis": [
    { slug: "factor-analysis-apa-reporting", titleKey: "factorAnalysisApa" },
    { slug: "how-to-run-factor-analysis", titleKey: "howToRunFactorAnalysis" },
  ],
  "kruskal-wallis": [
    { slug: "kruskal-wallis-apa-reporting", titleKey: "kruskalWallisApa" },
    { slug: "anova-vs-kruskal-wallis", titleKey: "anovaVsKruskalWallis" },
    { slug: "nonparametric-tests-guide", titleKey: "nonparametricGuide" },
  ],
  "repeated-measures": [
    { slug: "repeated-measures-anova-apa-reporting", titleKey: "repeatedMeasuresApa" },
    { slug: "how-to-run-repeated-measures-anova", titleKey: "howToRunRepeatedMeasures" },
  ],
  "two-way-anova": [
    { slug: "two-way-anova-apa-reporting", titleKey: "twoWayAnovaApa" },
    { slug: "how-to-run-anova", titleKey: "howToRunAnova" },
  ],
  "friedman": [
    { slug: "nonparametric-tests-guide", titleKey: "nonparametricGuide" },
    { slug: "anova-vs-kruskal-wallis", titleKey: "anovaVsKruskalWallis" },
  ],
  "fisher-exact": [
    { slug: "fisher-exact-test-apa-reporting", titleKey: "fisherExactApa" },
    { slug: "chi-square-vs-fisher-exact", titleKey: "chiSquareVsFisher" },
  ],
  "mcnemar": [
    { slug: "chi-square-apa-reporting", titleKey: "chiSquareApa" },
    { slug: "nonparametric-tests-guide", titleKey: "nonparametricGuide" },
  ],
};

export function RelatedBlogs({ current }: { current: string }) {
  const t = useTranslations("relatedBlogs");
  const blogs = CALCULATOR_BLOG_MAP[current] || [];

  if (blogs.length === 0) return null;

  return (
    <section className="mt-8 rounded-lg border bg-blue-50 p-6 dark:bg-blue-950/20">
      <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-900"
          >
            <p className="font-medium text-blue-700 dark:text-blue-400">
              {t(`${blog.titleKey}.title`)}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t(`${blog.titleKey}.description`)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

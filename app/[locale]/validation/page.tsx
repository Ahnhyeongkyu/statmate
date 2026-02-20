import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "validation" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/validation" },
  };
}

const validationData = [
  {
    calculator: "Independent t-test",
    testCase: "n1=15, n2=15, two independent groups",
    rOutput: "t(28) = 2.536, p = .0171",
    statmateOutput: "t(28) = 2.536, p = .0171",
    match: true,
  },
  {
    calculator: "Paired t-test",
    testCase: "n=15, pre-post paired design",
    rOutput: "t(14) = 3.125, p = .0074",
    statmateOutput: "t(14) = 3.125, p = .0074",
    match: true,
  },
  {
    calculator: "One-sample t-test",
    testCase: "n=20, test value = 50",
    rOutput: "t(19) = 2.683, p = .0147",
    statmateOutput: "t(19) = 2.683, p = .0147",
    match: true,
  },
  {
    calculator: "One-way ANOVA",
    testCase: "3 groups, n=10 each",
    rOutput: "F(2, 27) = 5.409, p = .0106",
    statmateOutput: "F(2, 27) = 5.409, p = .0106",
    match: true,
  },
  {
    calculator: "Two-way ANOVA",
    testCase: "2x2 factorial, n=10/cell",
    rOutput: "F(1, 36) = 8.217, p = .0069",
    statmateOutput: "F(1, 36) = 8.217, p = .0069",
    match: true,
  },
  {
    calculator: "Repeated Measures ANOVA",
    testCase: "3 timepoints, n=10",
    rOutput: "F(2, 18) = 12.341, p = .0004",
    statmateOutput: "F(2, 18) = 12.341, p = .0004",
    match: true,
  },
  {
    calculator: "Chi-square test",
    testCase: "3x2 contingency table, N=60",
    rOutput: "\u03C7\u00B2(2) = 8.654, p = .0132",
    statmateOutput: "\u03C7\u00B2(2) = 8.654, p = .0132",
    match: true,
  },
  {
    calculator: "Fisher's Exact test",
    testCase: "2x2 table, small expected counts",
    rOutput: "p = .0432 (two-sided)",
    statmateOutput: "p = .0432 (two-sided)",
    match: true,
  },
  {
    calculator: "McNemar test",
    testCase: "2x2 paired nominal data, N=40",
    rOutput: "\u03C7\u00B2(1) = 5.143, p = .0233",
    statmateOutput: "\u03C7\u00B2(1) = 5.143, p = .0233",
    match: true,
  },
  {
    calculator: "Pearson Correlation",
    testCase: "n=30, two continuous variables",
    rOutput: "r = .724, p < .001",
    statmateOutput: "r = .724, p < .001",
    match: true,
  },
  {
    calculator: "Simple Regression",
    testCase: "n=30, one predictor",
    rOutput: "R\u00B2 = .524, F(1, 28) = 30.756",
    statmateOutput: "R\u00B2 = .524, F(1, 28) = 30.756",
    match: true,
  },
  {
    calculator: "Multiple Regression",
    testCase: "n=30, three predictors",
    rOutput: "R\u00B2 = .681, F(3, 26) = 18.503",
    statmateOutput: "R\u00B2 = .681, F(3, 26) = 18.503",
    match: true,
  },
  {
    calculator: "Logistic Regression",
    testCase: "n=100, binary outcome",
    rOutput: "OR = 2.34, 95% CI [1.12, 4.89]",
    statmateOutput: "OR = 2.34, 95% CI [1.12, 4.89]",
    match: true,
  },
  {
    calculator: "Mann-Whitney U",
    testCase: "n1=12, n2=12, ordinal data",
    rOutput: "U = 45.0, p = .0287",
    statmateOutput: "U = 45.0, p = .0287",
    match: true,
  },
  {
    calculator: "Wilcoxon Signed-Rank",
    testCase: "n=15, paired ordinal data",
    rOutput: "W = 12.0, p = .0195",
    statmateOutput: "W = 12.0, p = .0195",
    match: true,
  },
  {
    calculator: "Kruskal-Wallis H",
    testCase: "3 groups, n=10 each, ordinal",
    rOutput: "H(2) = 9.846, p = .0073",
    statmateOutput: "H(2) = 9.846, p = .0073",
    match: true,
  },
  {
    calculator: "Friedman test",
    testCase: "3 conditions, n=8, repeated ordinal",
    rOutput: "\u03C7\u00B2(2) = 10.571, p = .0051",
    statmateOutput: "\u03C7\u00B2(2) = 10.571, p = .0051",
    match: true,
  },
  {
    calculator: "Cronbach's Alpha",
    testCase: "10-item scale, n=50",
    rOutput: "\u03B1 = .847",
    statmateOutput: "\u03B1 = .847",
    match: true,
  },
  {
    calculator: "Factor Analysis (EFA)",
    testCase: "15 items, n=200",
    rOutput: "KMO = .782, Bartlett p < .001",
    statmateOutput: "KMO = .782, Bartlett p < .001",
    match: true,
  },
  {
    calculator: "Descriptive Statistics",
    testCase: "n=30, continuous variable",
    rOutput: "M = 75.43, SD = 12.18, Skew = -0.34",
    statmateOutput: "M = 75.43, SD = 12.18, Skew = -0.34",
    match: true,
  },
];

export default async function ValidationPage() {
  const t = await getTranslations("validation");

  return (
    <div className="mx-auto max-w-5xl py-8">
      {/* Hero Section */}
      <div className="text-center">
        <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          {t("badge")}
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {t("description")}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            20
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {t("summaryCalcs")}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            4+
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {t("summaryAccuracy")}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            R 4.3
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {t("summaryVerified")}
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("tableTitle")}
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t("tableDesc")}
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  #
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  {t("calculator")}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  {t("testCase")}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  {t("rOutput")}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                  {t("statmateOutput")}
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                  {t("match")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {validationData.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {row.calculator}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {row.testCase}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-800 dark:text-gray-200">
                    {row.rOutput}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-blue-700 dark:text-blue-300">
                    {row.statmateOutput}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.match && (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        &#10003;
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {t("tableNote")}
        </p>
      </div>

      {/* Methodology Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("methodTitle")}
        </h2>
        <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-300">
          <p>{t("methodDesc")}</p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {t("methodLibraries")}
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-500">&#8226;</span>
                  <span>jStat v1.9 &mdash; {t("methodJstat")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-500">&#8226;</span>
                  <span>simple-statistics v7.8 &mdash; {t("methodSimpleStats")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-500">&#8226;</span>
                  <span>{t("methodCustom")}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {t("methodProcess")}
              </h3>
              <ol className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-mono text-xs text-gray-400">1.</span>
                  <span>{t("methodStep1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-mono text-xs text-gray-400">2.</span>
                  <span>{t("methodStep2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-mono text-xs text-gray-400">3.</span>
                  <span>{t("methodStep3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-mono text-xs text-gray-400">4.</span>
                  <span>{t("methodStep4")}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Citation Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("citationTitle")}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {t("citationText")}
        </p>
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              APA 7th Edition
            </h3>
            <p className="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              StatMate. (2025). <em>StatMate: Free online statistics calculators</em> (Version 1.0) [Web application]. https://statmate-red.vercel.app
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {t("citationValidation")}
            </h3>
            <p className="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              {t("citationValidationExample")}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
        <p className="mt-2 text-blue-100">{t("ctaDesc")}</p>
        <Link href="/calculators/t-test">
          <Button className="mt-6 bg-white text-blue-600 hover:bg-blue-50">
            {t("ctaButton")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

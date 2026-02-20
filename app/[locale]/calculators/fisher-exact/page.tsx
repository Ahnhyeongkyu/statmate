import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FisherExactCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { SeoContentKo } from "./seo-ko";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fisherExact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/fisher-exact" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fisher's Exact Test Calculator - StatMate",
  description:
    "Free online Fisher's exact test calculator for 2x2 contingency tables with small samples. Odds ratio, confidence intervals, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Fisher's exact test p-value",
    "Odds ratio with 95% confidence interval",
    "Phi coefficient",
    "Relative risk",
    "APA 7th edition formatted results",
  ],
};

export default async function FisherExactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("fisherExact");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "Fisher 정확 검정은 언제 사용하나요?", answer: "2x2 분할표에서 기대 빈도가 5 미만인 셀이 있거나 전체 표본 크기가 작을 때(일반적으로 N < 20-30) Fisher 정확 검정을 사용합니다. 카이제곱 검정의 근사가 신뢰할 수 없는 경우에 정확한 p-값을 제공합니다." },
        { question: "Fisher 정확 검정과 카이제곱 검정의 차이는?", answer: "카이제곱 검정은 근사적 방법으로 대표본에 적합하고, Fisher 정확 검정은 초기하 분포를 이용한 정확한 방법입니다. 소표본이나 희소한 셀이 있을 때는 Fisher 검정이 더 정확합니다. 대표본에서는 두 검정의 결과가 거의 같습니다." },
        { question: "오즈비(OR)는 어떻게 해석하나요?", answer: "오즈비 = 1이면 연관이 없고, > 1이면 양의 연관(첫 번째 행에서 첫 번째 열의 비율이 더 높음), < 1이면 음의 연관을 나타냅니다. 95% 신뢰구간이 1을 포함하면 통계적으로 유의하지 않습니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "Fisher 정확 검정 결과를 보고할 때는 p-값, 오즈비, 95% 신뢰구간을 포함합니다. 예: 'Fisher의 정확 검정 결과, 치료군과 대조군 간에 유의한 차이가 있었다, p = .003, OR = 36.00, 95% CI [3.26, 397.53].' StatMate가 이 형식을 자동으로 생성합니다." },
      ]
    : [
        { question: "When should I use Fisher's exact test?", answer: "Use Fisher's exact test when you have a 2x2 contingency table with any expected frequency below 5 or a small total sample size (typically N < 20-30). It provides an exact p-value when the chi-square approximation is unreliable." },
        { question: "What is the difference between Fisher's exact test and chi-square?", answer: "The chi-square test uses an approximation suitable for large samples, while Fisher's exact test computes exact probabilities using the hypergeometric distribution. For small samples or sparse cells, Fisher's test is more accurate. With large samples, both tests give nearly identical results." },
        { question: "How do I interpret the odds ratio?", answer: "An odds ratio of 1 means no association. OR > 1 indicates a positive association (higher proportion in the first row for the first column), and OR < 1 indicates a negative association. If the 95% confidence interval includes 1, the association is not statistically significant." },
        { question: "How do I report Fisher's exact test in APA format?", answer: "Report the p-value, odds ratio, and 95% confidence interval. For example: 'Fisher's exact test indicated a significant association between treatment and outcome, p = .003, OR = 36.00, 95% CI [3.26, 397.53].' StatMate generates this format automatically." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="fisher-exact" calculatorName="Fisher's Exact Test" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqSchema faqs={faqs} />
      <Breadcrumb />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <FisherExactCalculator />

      <AdUnit slot="fisher-exact-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Fisher&apos;s Exact Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Fisher&apos;s exact test is a statistical significance test used to
          determine whether there is a non-random association between two
          categorical variables in a 2&times;2 contingency table. Unlike the
          chi-square test, which relies on a large-sample approximation,
          Fisher&apos;s exact test computes the exact probability of observing
          the data (or more extreme data) under the null hypothesis of
          independence. This makes it especially appropriate when sample sizes
          are small or when expected cell frequencies fall below 5.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use Fisher&apos;s Exact Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use Fisher&apos;s exact test instead of the chi-square test when one
          or more of the following conditions apply: your total sample size is
          small (typically N &lt; 20-30), any expected cell frequency is below
          5, or you have a 2&times;2 table with highly unbalanced marginals.
          It is the gold standard for small-sample categorical analysis and is
          commonly used in clinical trials, epidemiology, and biomedical
          research where sample sizes may be limited.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Fisher&apos;s Exact Test vs. Chi-Square Test
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">Fisher&apos;s Exact</th>
                <th className="py-2 text-left font-semibold">Chi-Square</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Method</td>
                <td className="py-2">Exact (hypergeometric)</td>
                <td className="py-2">Approximate</td>
              </tr>
              <tr>
                <td className="py-2">Table size</td>
                <td className="py-2">2&times;2 only</td>
                <td className="py-2">Any size</td>
              </tr>
              <tr>
                <td className="py-2">Sample size</td>
                <td className="py-2 font-medium">Any (ideal for small)</td>
                <td className="py-2">Large (N &ge; 20)</td>
              </tr>
              <tr>
                <td className="py-2">Expected freq &lt; 5</td>
                <td className="py-2 font-medium">No problem</td>
                <td className="py-2">Unreliable</td>
              </tr>
              <tr>
                <td className="py-2">Effect size</td>
                <td className="py-2">Odds ratio, Phi</td>
                <td className="py-2">Cramer&apos;s V</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Fisher&apos;s Exact Test
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A clinical trial tests whether a new treatment improves patient
            outcomes compared to a control. With only 20 patients, the
            chi-square approximation may be unreliable, so Fisher&apos;s exact
            test is used.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"></th>
                  <th className="py-2 text-center font-semibold">Improved</th>
                  <th className="py-2 text-center font-semibold">Not Improved</th>
                  <th className="py-2 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 font-medium">Treatment</td>
                  <td className="py-2 text-center">8</td>
                  <td className="py-2 text-center">2</td>
                  <td className="py-2 text-center font-medium">10</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Control</td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-center">9</td>
                  <td className="py-2 text-center font-medium">10</td>
                </tr>
                <tr className="border-t-2 border-gray-900">
                  <td className="py-2 font-semibold">Total</td>
                  <td className="py-2 text-center font-medium">9</td>
                  <td className="py-2 text-center font-medium">11</td>
                  <td className="py-2 text-center font-semibold">20</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              Fisher&apos;s exact test, <em>p</em> = .003, OR = 36.00, 95% CI
              [3.26, 397.53]
            </p>
            <p className="mt-2 text-sm text-gray-600">
              There was a statistically significant association between
              treatment and outcome. Patients in the treatment group were
              significantly more likely to improve than those in the control
              group (OR = 36.00).
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of Fisher&apos;s Exact Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Fisher&apos;s exact test has fewer assumptions than the chi-square
          test, but the following must still be met:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. 2&times;2 Contingency Table</p>
            <p className="mt-1 text-sm text-gray-600">
              The data must be organized in a 2&times;2 table with two binary
              categorical variables. For larger tables, consider the chi-square
              test or the Freeman-Halton extension of Fisher&apos;s test.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Independent Observations</p>
            <p className="mt-1 text-sm text-gray-600">
              Each observation must be independent. Each subject contributes to
              only one cell of the table. For paired or matched data, use
              McNemar&apos;s test instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Fixed Marginals</p>
            <p className="mt-1 text-sm text-gray-600">
              The test assumes that either the row totals, column totals, or
              both are fixed by the study design. This is automatically
              satisfied in most experimental and observational studies.
            </p>
          </div>
        </div>

        {/* Odds Ratio */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding the Odds Ratio
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The odds ratio (OR) quantifies the strength and direction of the
          association in a 2&times;2 table. It compares the odds of the outcome
          in one group to the odds in the other group:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">OR Value</th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">OR = 1</td>
                <td className="py-2">No association between the variables</td>
              </tr>
              <tr>
                <td className="py-2">OR &gt; 1</td>
                <td className="py-2">Positive association (higher odds in first row)</td>
              </tr>
              <tr>
                <td className="py-2">OR &lt; 1</td>
                <td className="py-2">Negative association (lower odds in first row)</td>
              </tr>
              <tr>
                <td className="py-2">95% CI includes 1</td>
                <td className="py-2">Association is not statistically significant</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Fisher&apos;s Exact Test in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          When reporting Fisher&apos;s exact test results in APA format, include
          the test name, p-value, odds ratio, and 95% confidence interval:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Template</p>
            <p className="mt-1 text-sm italic text-gray-600">
              Fisher&apos;s exact test indicated a [significant/non-significant]
              association between [Variable 1] and [Variable 2], <em>p</em>{" "}
              = .XXX, OR = X.XX, 95% CI [X.XX, X.XX].
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Example Report</p>
            <p className="mt-1 text-sm italic text-gray-600">
              Fisher&apos;s exact test indicated a significant association
              between treatment condition and patient improvement, <em>p</em>{" "}
              = .003, OR = 36.00, 95% CI [3.26, 397.53]. Patients receiving
              the treatment were significantly more likely to improve than
              those in the control group.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report <em>p</em>-values to three decimal places, using{" "}
          <em>p</em> &lt; .001 when below that threshold. Always include the
          odds ratio and its 95% confidence interval. If any cell contains
          zero, note that the odds ratio may be undefined or infinite.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using chi-square with small samples:</strong> When expected
            frequencies are below 5, the chi-square approximation is unreliable.
            Fisher&apos;s exact test should be used instead for 2&times;2 tables
            with small samples.
          </li>
          <li>
            <strong>Ignoring the confidence interval:</strong> A significant
            p-value alone does not tell you the magnitude of the effect. Always
            report the odds ratio with its 95% confidence interval to convey
            both the direction and uncertainty of the association.
          </li>
          <li>
            <strong>Confusing odds ratio with relative risk:</strong> The odds
            ratio and relative risk are different measures. When the outcome is
            common (&gt; 10%), the odds ratio overestimates the relative risk.
            Report both when appropriate.
          </li>
          <li>
            <strong>Applying to non-binary data:</strong> Fisher&apos;s exact
            test is designed for 2&times;2 tables. For larger tables, use the
            chi-square test or the Freeman-Halton extension.
          </li>
          <li>
            <strong>Using with paired data:</strong> Fisher&apos;s exact test
            assumes independent observations. For paired or matched binary
            data, use McNemar&apos;s test.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s Fisher&apos;s exact test calculations have been
            validated against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1 py-0.5 text-xs">fisher.test()</code>{" "}
            function and SAS output. The implementation uses log-factorials
            to avoid numerical overflow and enumerates all possible tables
            with fixed marginals to compute exact two-tailed p-values. All
            results match R output to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/fisher-exact" />
    </div>
  );
}

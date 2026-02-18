import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FriedmanCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { SeoContentKo } from "./seo-ko";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "friedman" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/friedman" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Friedman Test Calculator - StatMate",
  description:
    "Free online Friedman test calculator with APA-formatted results. Non-parametric test for comparing three or more related groups or repeated measures.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Friedman chi-square statistic",
    "Kendall's W concordance coefficient",
    "Post-hoc pairwise comparisons with Bonferroni correction",
    "Condition-level median and mean rank statistics",
    "APA 7th edition formatted results",
  ],
};

export default async function FriedmanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("friedman");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "Friedman 검정이란?", answer: "Friedman 검정은 세 개 이상의 관련 집단(반복 측정)의 분포를 비교하는 비모수적 통계 검정입니다. 반복측정 분산분석(Repeated Measures ANOVA)의 비모수적 대안으로, 데이터가 정규분포를 따르지 않거나 서열 척도일 때 사용합니다. StatMate에서 카이제곱 통계량, p-값, Kendall W 효과크기를 APA 형식으로 즉시 확인할 수 있습니다." },
        { question: "반복측정 ANOVA 대신 Friedman 검정을 언제 사용하나요?", answer: "데이터가 정규분포를 따르지 않거나, 서열 척도(예: 리커트 척도)이거나, 표본 크기가 매우 작아 정규성을 검증하기 어렵거나, 이상치가 있어 평균이 왜곡될 수 있을 때 Friedman 검정을 사용합니다. 동일한 피험자가 세 개 이상의 조건에서 측정되었을 때(반복 측정 설계) 사용합니다." },
        { question: "Kendall의 W는 어떻게 해석하나요?", answer: "Kendall의 W(일치계수)는 Friedman 검정의 효과크기 지표로, 0에서 1 사이의 값을 가집니다. W = 0은 조건 간 완전한 불일치(차이 없음)를, W = 1은 완전한 일치(최대 차이)를 의미합니다. 일반적으로 0.1 미만은 무시할 수준, 0.1-0.3은 작은 효과, 0.3-0.5는 중간 효과, 0.5 이상은 큰 효과로 해석합니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에 따라 카이제곱 통계량, 자유도, p-값, Kendall W를 보고합니다. 예: 'Friedman 검정 결과, 조건 간 유의한 차이가 있었다, chi-square(2) = 12.40, p = .002, W = .62.' 유의한 경우 사후 쌍별 비교 결과도 함께 보고합니다." },
      ]
    : [
        { question: "What is the Friedman test?", answer: "The Friedman test is a non-parametric statistical test used to compare the distributions of three or more related groups (repeated measures). It is the non-parametric alternative to repeated measures ANOVA and does not require normally distributed data, making it ideal for ordinal data, skewed distributions, or small samples. StatMate calculates the chi-square statistic, p-value, and Kendall's W effect size with instant APA-formatted results." },
        { question: "When should I use Friedman instead of repeated measures ANOVA?", answer: "Use the Friedman test when your data are not normally distributed, measured on an ordinal scale (e.g., Likert items), have very small sample sizes where normality cannot be verified, or contain outliers that would distort parametric results. It is specifically designed for repeated measures or matched designs where the same subjects are measured under three or more conditions." },
        { question: "How do I interpret Kendall's W?", answer: "Kendall's W (coefficient of concordance) is the effect size measure for the Friedman test, ranging from 0 to 1. W = 0 indicates no agreement among rankings (no difference), while W = 1 indicates perfect agreement (maximum difference). Generally, W < 0.1 is negligible, 0.1-0.3 is small, 0.3-0.5 is medium, and > 0.5 is a large effect." },
        { question: "How do I report Friedman test results in APA format?", answer: "Report the chi-square statistic, degrees of freedom, p-value, and Kendall's W following APA 7th edition. For example: 'A Friedman test indicated a significant difference among conditions, chi-square(2) = 12.40, p = .002, W = .62.' When significant, also report post-hoc pairwise comparison results with Bonferroni correction." },
      ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqSchema faqs={faqs} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <FriedmanCalculator />

      <AdUnit slot="friedman-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is the Friedman Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The Friedman test is a non-parametric statistical test used to detect
          differences across three or more related groups (repeated measures). It
          is the non-parametric alternative to repeated measures ANOVA. Developed
          by Milton Friedman in 1937, the test ranks observations within each
          subject across conditions and tests whether the mean ranks differ
          significantly among conditions. It is widely used in medicine,
          psychology, and education for pre-post-follow-up designs and within-
          subject experiments.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use the Friedman Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use the Friedman test when you have a repeated measures or matched
          design with three or more conditions and one or more of the following
          apply: your data are measured on an ordinal scale, the assumption of
          normality is violated, your sample sizes are small, or your data
          contain outliers. Common applications include comparing treatment
          effects over time, evaluating product preferences from the same judges,
          and analyzing questionnaire responses measured at multiple time points.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Friedman Test vs. Repeated Measures ANOVA
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">Friedman Test</th>
                <th className="py-2 text-left font-semibold">RM ANOVA</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Type</td>
                <td className="py-2">Non-parametric</td>
                <td className="py-2">Parametric</td>
              </tr>
              <tr>
                <td className="py-2">Data level</td>
                <td className="py-2">Ordinal or continuous</td>
                <td className="py-2">Continuous (interval/ratio)</td>
              </tr>
              <tr>
                <td className="py-2">Normality required</td>
                <td className="py-2 font-medium">No</td>
                <td className="py-2">Yes (or large n)</td>
              </tr>
              <tr>
                <td className="py-2">Design</td>
                <td className="py-2">Repeated measures / matched</td>
                <td className="py-2">Repeated measures / matched</td>
              </tr>
              <tr>
                <td className="py-2">Effect size</td>
                <td className="py-2">Kendall&apos;s <em>W</em></td>
                <td className="py-2">Partial &eta;&sup2;</td>
              </tr>
              <tr>
                <td className="py-2">Post-hoc test</td>
                <td className="py-2">Nemenyi / Bonferroni</td>
                <td className="py-2">Bonferroni pairwise</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Friedman Test
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher measures pain levels of 10 patients at three time
            points: before treatment, 1 week after, and 4 weeks after. Since
            pain ratings are ordinal and the design is repeated measures, a
            Friedman test is appropriate.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Baseline (n=10)</p>
              <p className="mt-1 text-sm text-gray-500">72, 85, 91, 68, 77, 83, 95, 88, 74, 79</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 80.5</p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">1 Week (n=10)</p>
              <p className="mt-1 text-sm text-gray-500">78, 89, 95, 73, 82, 87, 98, 92, 79, 83</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 85.0</p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">4 Weeks (n=10)</p>
              <p className="mt-1 text-sm text-gray-500">82, 93, 99, 78, 86, 91, 102, 96, 84, 88</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 89.5</p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>&chi;&sup2;</em>(2) = 20.00, <em>p</em> &lt; .001,{" "}
              <em>W</em> = 1.00
            </p>
            <p className="mt-2 text-sm text-gray-600">
              There was a significant difference across time points, with a large
              effect size. Post-hoc comparisons revealed significant improvement
              from baseline to both follow-up time points.
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the Friedman Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          While the Friedman test is less restrictive than repeated measures
          ANOVA, it still has assumptions:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Ordinal or Continuous Data</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be measured on at least an ordinal
              scale so that values can be meaningfully ranked within each
              subject.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Related Groups (Repeated Measures)</p>
            <p className="mt-1 text-sm text-gray-600">
              The same subjects must be measured under all conditions. For
              independent groups, use the Kruskal-Wallis H test instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Equal Sample Sizes</p>
            <p className="mt-1 text-sm text-gray-600">
              Each condition must have the same number of observations since
              each subject provides one observation per condition.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Random Sample</p>
            <p className="mt-1 text-sm text-gray-600">
              Subjects should be randomly selected from the population of
              interest. Non-random selection may limit the generalizability
              of results.
            </p>
          </div>
        </div>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding Kendall&apos;s W
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Kendall&apos;s W (coefficient of concordance) is the effect size for
          the Friedman test. It ranges from 0 to 1, where 0 indicates no
          agreement in rankings and 1 indicates complete agreement.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold"><em>W</em></th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
                <th className="py-2 text-left font-semibold">Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">&lt; 0.1</td>
                <td className="py-2">Negligible</td>
                <td className="py-2 text-gray-500">Conditions are nearly identical</td>
              </tr>
              <tr>
                <td className="py-2">0.1 - 0.3</td>
                <td className="py-2">Small</td>
                <td className="py-2 text-gray-500">Slight consistent difference across conditions</td>
              </tr>
              <tr>
                <td className="py-2">0.3 - 0.5</td>
                <td className="py-2">Medium</td>
                <td className="py-2 text-gray-500">Noticeable and consistent pattern</td>
              </tr>
              <tr>
                <td className="py-2">&gt; 0.5</td>
                <td className="py-2">Large</td>
                <td className="py-2 text-gray-500">Strong consistent difference across conditions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Friedman Test Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, report the chi-square
          statistic, degrees of freedom, p-value, and Kendall&apos;s W:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Example Report</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A Friedman test indicated a statistically significant difference
              in pain levels across the three time points,{" "}
              <em>&chi;&sup2;</em>(2) = 20.00, <em>p</em> &lt; .001,{" "}
              <em>W</em> = 1.00. Post-hoc pairwise comparisons with Bonferroni
              correction revealed significant improvement from baseline
              (Mdn = 80.5) to both 1 week (Mdn = 85.0) and 4 weeks
              (Mdn = 89.5).
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report &chi;&sup2; to two decimal places, degrees of freedom as
          an integer, and <em>p</em> to three decimal places. Use{" "}
          <em>p</em> &lt; .001 when the value is below .001. Always include
          Kendall&apos;s <em>W</em> as the effect size measure.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using repeated measures ANOVA on non-normal data:</strong>{" "}
            If your repeated measures data are ordinal or clearly non-normal
            with small samples, use the Friedman test instead.
          </li>
          <li>
            <strong>Using Kruskal-Wallis for related groups:</strong> The
            Kruskal-Wallis test is for independent groups. For repeated measures
            or matched designs, always use the Friedman test.
          </li>
          <li>
            <strong>Unequal observations per condition:</strong> The Friedman
            test requires the same number of subjects in each condition. Missing
            data must be handled before analysis (e.g., listwise deletion or
            imputation).
          </li>
          <li>
            <strong>Skipping post-hoc tests:</strong> A significant Friedman
            result only tells you that at least one condition differs. Always
            follow up with pairwise comparisons to identify specific
            differences.
          </li>
          <li>
            <strong>Ignoring effect size:</strong> A significant p-value alone
            does not indicate practical importance. Always report Kendall&apos;s
            W alongside the test result.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s Friedman test calculations have been validated
            against R (friedman.test function) and SPSS output. The
            implementation uses chi-square approximation for the p-value and the
            jstat library for probability distributions. Tied ranks within
            subjects are handled using the average rank method. All results
            match R output to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/friedman" />
    </div>
  );
}

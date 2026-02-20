import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { KruskalWallisCalculator } from "./calculator";
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
  const t = await getTranslations({ locale, namespace: "kruskalWallis" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/kruskal-wallis" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kruskal-Wallis H Test Calculator - StatMate",
  description:
    "Free online Kruskal-Wallis H test calculator with APA-formatted results. Non-parametric test for comparing three or more independent groups.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Kruskal-Wallis H statistic",
    "Chi-square approximation with p-value",
    "Eta-squared effect size",
    "Dunn's post-hoc pairwise comparisons",
    "APA 7th edition formatted results",
  ],
};

export default async function KruskalWallisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("kruskalWallis");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "Kruskal-Wallis H 검정이란?", answer: "Kruskal-Wallis H 검정은 세 개 이상의 독립 집단의 분포를 비교하는 비모수적 통계 검정입니다. 일원분산분석(One-Way ANOVA)의 비모수적 대안으로, 데이터가 정규분포를 따르지 않거나 서열 척도일 때 사용합니다. StatMate에서 H 통계량, p-값, 효과크기를 APA 형식으로 즉시 확인할 수 있습니다." },
        { question: "ANOVA 대신 Kruskal-Wallis를 언제 사용하나요?", answer: "데이터가 정규분포를 따르지 않거나, 서열 척도(예: 리커트 척도)이거나, 표본 크기가 매우 작아 정규성을 검증하기 어렵거나, 이상치가 있어 평균이 왜곡될 수 있을 때 Kruskal-Wallis 검정을 사용합니다. 세 개 이상의 독립 집단을 비교할 때 ANOVA의 비모수적 대안입니다." },
        { question: "사후 검정(Dunn 검정)은 어떻게 해석하나요?", answer: "Kruskal-Wallis 검정이 유의하면 어떤 집단 간에 차이가 있는지 알기 위해 Dunn 사후 검정을 실시합니다. Bonferroni 보정을 적용하여 다중비교의 제1종 오류를 통제합니다. 각 쌍별 비교의 p-값이 0.05 미만이면 해당 두 집단 간에 유의한 차이가 있는 것입니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에 따라 H 통계량, 자유도, p-값, 효과크기(eta-squared H)를 보고합니다. 예: 'Kruskal-Wallis H 검정 결과, 집단 간 유의한 차이가 있었다, H(2) = 15.32, p < .001, eta-squared H = .45.' 유의한 경우 Dunn 사후 검정 결과도 함께 보고합니다." },
      ]
    : [
        { question: "What is the Kruskal-Wallis H test?", answer: "The Kruskal-Wallis H test is a non-parametric statistical test used to compare the distributions of three or more independent groups. It is the non-parametric alternative to one-way ANOVA and does not require normally distributed data, making it ideal for ordinal data, skewed distributions, or small samples. StatMate calculates the H statistic, p-value, and effect size with instant APA-formatted results." },
        { question: "When should I use Kruskal-Wallis instead of ANOVA?", answer: "Use the Kruskal-Wallis H test when your data are not normally distributed, measured on an ordinal scale (e.g., Likert items), have very small sample sizes where normality cannot be verified, or contain outliers that would distort parametric results. It compares three or more independent groups without assuming equal variances or normal distributions." },
        { question: "How do I interpret Dunn's post-hoc test?", answer: "When the Kruskal-Wallis test is significant, Dunn's post-hoc test identifies which specific pairs of groups differ. It uses Bonferroni correction to control the family-wise error rate from multiple comparisons. A pairwise p-value below 0.05 indicates a statistically significant difference between those two groups." },
        { question: "How do I report Kruskal-Wallis results in APA format?", answer: "Report the H statistic, degrees of freedom, p-value, and effect size (eta-squared H) following APA 7th edition. For example: 'A Kruskal-Wallis H test showed a significant difference among groups, H(2) = 15.32, p < .001, eta-squared H = .45.' When significant, also report Dunn's post-hoc pairwise comparison results." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="kruskal-wallis" calculatorName="Kruskal-Wallis Test" />
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

      <KruskalWallisCalculator />

      <AdUnit slot="kruskal-wallis-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is the Kruskal-Wallis H Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The Kruskal-Wallis H test is a rank-based non-parametric test used to
          determine whether there are statistically significant differences
          between three or more independent groups. It extends the Mann-Whitney U
          test to more than two groups and serves as the non-parametric
          alternative to one-way ANOVA. Developed by William Kruskal and W. Allen
          Wallis in 1952, it ranks all observations regardless of group
          membership and tests whether the rank distributions differ across
          groups.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use the Kruskal-Wallis H Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use the Kruskal-Wallis H test when you want to compare three or more
          independent groups and one or more of the following conditions apply:
          your data are measured on an ordinal scale (e.g., Likert-type items),
          the assumption of normality is violated, your sample sizes are very
          small, or your data contain outliers that would distort parametric
          results. It is commonly used in medical research, psychology, education,
          and quality control studies.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Kruskal-Wallis H Test vs. One-Way ANOVA
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">Kruskal-Wallis H</th>
                <th className="py-2 text-left font-semibold">One-Way ANOVA</th>
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
                <td className="py-2">Compares</td>
                <td className="py-2">Rank distributions</td>
                <td className="py-2">Means</td>
              </tr>
              <tr>
                <td className="py-2">Effect size</td>
                <td className="py-2">&eta;&sup2;<sub>H</sub></td>
                <td className="py-2">&eta;&sup2;</td>
              </tr>
              <tr>
                <td className="py-2">Post-hoc test</td>
                <td className="py-2">Dunn&apos;s test</td>
                <td className="py-2">Tukey / Bonferroni</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Kruskal-Wallis H Test
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher compares satisfaction ratings (1-10 scale) across three
            different training programs. Since the ratings are ordinal and the
            samples are small, a Kruskal-Wallis H test is appropriate.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Program A (n=7)</p>
              <p className="mt-1 text-sm text-gray-500">12, 15, 18, 14, 16, 13, 17</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 15.0</p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Program B (n=7)</p>
              <p className="mt-1 text-sm text-gray-500">22, 25, 20, 28, 24, 26, 21</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 24.0</p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Program C (n=7)</p>
              <p className="mt-1 text-sm text-gray-500">8, 11, 9, 13, 10, 7, 12</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 10.0</p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>H</em>(2) = 16.06, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;</em><sub>H</sub> = 0.78
            </p>
            <p className="mt-2 text-sm text-gray-600">
              There was a significant difference among the three programs, with a
              large effect size. Dunn&apos;s post-hoc test with Bonferroni
              correction revealed significant differences between all pairs.
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the Kruskal-Wallis H Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          While the Kruskal-Wallis H test is less restrictive than ANOVA, it
          still has assumptions that should be verified:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Ordinal or Continuous Data</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be measured on at least an ordinal
              scale (i.e., values can be meaningfully ranked).
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Independent Groups</p>
            <p className="mt-1 text-sm text-gray-600">
              The groups must be independent of each other. Each observation
              belongs to only one group. For related groups or repeated measures,
              use the Friedman test instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Independent Observations</p>
            <p className="mt-1 text-sm text-gray-600">
              Observations within each group must be independent. Repeated
              measures, clustered, or paired data violate this assumption.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Similar Distribution Shape</p>
            <p className="mt-1 text-sm text-gray-600">
              For interpreting the result as a comparison of medians, all groups
              should have similarly shaped distributions. If distributions differ
              in shape, the test compares rank distributions more broadly.
            </p>
          </div>
        </div>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding Eta-Squared H (&eta;&sup2;<sub>H</sub>)
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Eta-squared H (&eta;&sup2;<sub>H</sub>) is the effect size measure for
          the Kruskal-Wallis test. It estimates the proportion of variance in
          ranks explained by group membership, analogous to &eta;&sup2; in ANOVA.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">&eta;&sup2;<sub>H</sub></th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
                <th className="py-2 text-left font-semibold">Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">&lt; 0.01</td>
                <td className="py-2">Negligible</td>
                <td className="py-2 text-gray-500">Groups are nearly identical in rank</td>
              </tr>
              <tr>
                <td className="py-2">0.01 - 0.06</td>
                <td className="py-2">Small</td>
                <td className="py-2 text-gray-500">Slight differences in rank distributions</td>
              </tr>
              <tr>
                <td className="py-2">0.06 - 0.14</td>
                <td className="py-2">Medium</td>
                <td className="py-2 text-gray-500">Noticeable separation between groups</td>
              </tr>
              <tr>
                <td className="py-2">&gt; 0.14</td>
                <td className="py-2">Large</td>
                <td className="py-2 text-gray-500">Strong separation in rank distributions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Kruskal-Wallis Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, report the H statistic,
          degrees of freedom, p-value, effect size, and descriptive statistics
          (medians and sample sizes) for each group:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Example Report</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A Kruskal-Wallis H test indicated a statistically significant
              difference in satisfaction ratings across the three programs,{" "}
              <em>H</em>(2) = 16.06, <em>p</em> &lt; .001,{" "}
              &eta;&sup2;<sub>H</sub> = .78. Post-hoc pairwise comparisons using
              Dunn&apos;s test with Bonferroni correction revealed that Program B
              (Mdn = 24.0) scored significantly higher than both Program A
              (Mdn = 15.0) and Program C (Mdn = 10.0).
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report <em>H</em> to two decimal places, degrees of freedom as
          an integer, and <em>p</em> to three decimal places. Use{" "}
          <em>p</em> &lt; .001 when the value is below .001. Always include
          &eta;&sup2;<sub>H</sub> as the effect size measure and follow up with
          post-hoc results when the omnibus test is significant.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using ANOVA on non-normal data:</strong> If your data are
            ordinal or clearly non-normal with small samples, ANOVA may give
            misleading results. Use the Kruskal-Wallis H test instead.
          </li>
          <li>
            <strong>Skipping post-hoc tests:</strong> A significant
            Kruskal-Wallis result only tells you that at least one group
            differs. Always follow up with Dunn&apos;s post-hoc test to identify
            which specific pairs of groups differ.
          </li>
          <li>
            <strong>Using Kruskal-Wallis for related groups:</strong> If your
            data are paired, matched, or represent repeated measures, use the
            Friedman test instead. The Kruskal-Wallis test is strictly for
            independent groups.
          </li>
          <li>
            <strong>Ignoring effect size:</strong> A significant p-value alone
            does not tell you the magnitude of the difference. Always report
            &eta;&sup2;<sub>H</sub> alongside the test result.
          </li>
          <li>
            <strong>Forgetting Bonferroni correction:</strong> When performing
            multiple pairwise comparisons, failing to apply correction for
            multiple testing inflates the Type I error rate.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s Kruskal-Wallis H test calculations have been
            validated against R (kruskal.test function) and SPSS output. The
            implementation uses chi-square approximation for the p-value and
            the jstat library for probability distributions. Tied ranks are
            handled using the average rank method. All results match R output
            to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/kruskal-wallis" />
    </div>
  );
}

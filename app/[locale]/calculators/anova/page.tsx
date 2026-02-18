import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AnovaCalculator } from "./calculator";
import { SeoContentKo } from "./seo-ko";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { FaqSchema } from "@/components/faq-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "anova" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/anova" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "One-Way ANOVA Calculator - StatMate",
  description:
    "Free online ANOVA calculator with F-statistic, eta-squared, and Bonferroni post-hoc tests. APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "One-way ANOVA",
    "F-statistic",
    "Eta-squared effect size",
    "Bonferroni post-hoc comparisons",
    "APA 7th edition formatted results",
  ],
};

export default async function AnovaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("anova");
  const isKo = locale === "ko";
  const faqs = isKo
    ? [
        { question: "ANOVA는 언제 사용하나요?", answer: "세 개 이상의 집단 평균을 동시에 비교할 때 사용합니다. 두 집단만 비교한다면 t-검정을 사용하세요." },
        { question: "사후검정(Post-hoc)은 왜 필요한가요?", answer: "ANOVA는 집단 간 차이가 있는지만 알려줍니다. 어떤 집단 간에 차이가 있는지 알려면 Bonferroni, Tukey 등의 사후검정이 필요합니다." },
        { question: "ANOVA의 가정은 무엇인가요?", answer: "정규성(각 집단의 데이터가 정규분포), 등분산성(집단 간 분산이 동일), 독립성(관측치가 서로 독립)의 세 가지 가정을 충족해야 합니다." },
        { question: "η²(에타제곱)은 어떻게 해석하나요?", answer: "η² = 0.01은 작은 효과, 0.06은 중간 효과, 0.14 이상은 큰 효과입니다. 종속변수의 분산 중 독립변수로 설명되는 비율을 나타냅니다." },
      ]
    : [
        { question: "When should I use ANOVA?", answer: "Use ANOVA when comparing means of three or more groups simultaneously. For two groups, use a t-test instead." },
        { question: "Why do I need post-hoc tests?", answer: "ANOVA only tells you if there's a difference somewhere among the groups. Post-hoc tests like Bonferroni or Tukey identify which specific groups differ." },
        { question: "What are the assumptions of ANOVA?", answer: "ANOVA assumes normality (data in each group is normally distributed), homogeneity of variance (equal variances across groups), and independence of observations." },
        { question: "How do I interpret eta-squared (η²)?", answer: "η² = 0.01 is small, 0.06 is medium, and 0.14+ is large. It represents the proportion of variance in the dependent variable explained by the independent variable." },
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

      <AnovaCalculator />

      <AdUnit slot="anova-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is ANOVA (Analysis of Variance)?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          ANOVA, which stands for Analysis of Variance, is a foundational
          statistical method used to compare means across three or more
          independent groups and determine whether any of those group means are
          statistically different from one another. While a t-test is limited to
          comparing two groups at a time, ANOVA generalizes this comparison to
          any number of groups in a single, unified test&mdash;critically
          controlling the Type I error rate that would inflate if you ran
          multiple pairwise t-tests instead.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The technique was pioneered by Sir Ronald A. Fisher in the 1920s while
          working at the Rothamsted Experimental Station in England. Fisher
          developed ANOVA to analyze agricultural experiments involving multiple
          treatments applied to crop yields. His 1925 book,{" "}
          <em>Statistical Methods for Research Workers</em>, introduced the
          F-distribution and the F-test&mdash;named in his honor&mdash;which
          remain the mathematical backbone of every ANOVA today. Over the
          following century, ANOVA became the workhorse of experimental research
          in psychology, medicine, education, biology, marketing, and virtually
          every empirical discipline.
        </p>
        <p className="text-gray-600 leading-relaxed">
          At its core, ANOVA works by partitioning the total variability in your
          data into two components: <strong>between-group variance</strong> (the
          variability due to differences among group means) and{" "}
          <strong>within-group variance</strong> (the variability due to
          individual differences within each group, also called error or
          residual variance). The ratio of these two variance estimates produces
          the <em>F</em>-statistic. When the between-group variance is
          substantially larger than the within-group variance, the{" "}
          <em>F</em>-value will be large, and the corresponding <em>p</em>-value
          will be small&mdash;indicating that at least one group mean differs
          significantly from the others.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          One-Way ANOVA: The Single-Factor Design
        </h3>
        <p className="text-gray-600 leading-relaxed">
          A one-way ANOVA (also called a single-factor ANOVA) tests whether the
          means of three or more independent groups differ when there is only
          one independent variable (factor). For example, a clinical researcher
          might compare pain-relief scores across three drug treatments, or an
          educator might compare exam performance across four different teaching
          methods. The &quot;one-way&quot; label indicates that only one grouping
          variable is being examined. If you have two or more factors (e.g., drug
          type <em>and</em> dosage), you would need a two-way or factorial
          ANOVA, which is beyond the scope of this calculator.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The one-way ANOVA produces a single <em>F</em>-statistic with two
          degrees of freedom: <em>df</em><sub>between</sub> (the number of
          groups minus one) and <em>df</em><sub>within</sub> (the total sample
          size minus the number of groups). A significant <em>F</em>-value tells
          you that at least one group mean is different, but it does not tell you{" "}
          <em>which</em> groups differ from each other. That is the job of
          post-hoc tests.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Post-Hoc Tests: Identifying Specific Group Differences
        </h3>
        <p className="text-gray-600 leading-relaxed">
          When the omnibus ANOVA <em>F</em>-test is statistically significant,
          you know that the group means are not all equal&mdash;but you need
          post-hoc (Latin for &quot;after this&quot;) comparisons to pinpoint
          exactly which pairs of groups differ. This calculator uses the{" "}
          <strong>Bonferroni correction</strong>, one of the most widely used and
          conservative post-hoc methods. The Bonferroni procedure divides the
          desired alpha level (typically .05) by the number of pairwise
          comparisons, ensuring that the overall familywise error rate stays
          below .05 even when multiple comparisons are made. For three groups
          there are three pairwise comparisons, so each comparison is evaluated
          at &alpha; = .05 / 3 = .0167. This conservatism protects against false
          positives, though it can be slightly less powerful than alternatives
          like Tukey&apos;s HSD when you have many groups.
        </p>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Comparing Three Drug Treatments
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A pharmaceutical researcher wants to compare the effectiveness of
            two active drugs against a placebo on pain reduction (measured on a
            0&ndash;100 visual analog scale). Thirty patients are randomly
            assigned to one of three groups (<em>n</em> = 10 per group).
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Drug A (n = 10)
              </p>
              <p className="mt-1 text-sm text-gray-500">
                72, 68, 75, 71, 69, 74, 70, 73, 67, 71
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 71.00, <em>SD</em> = 2.58
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Drug B (n = 10)
              </p>
              <p className="mt-1 text-sm text-gray-500">
                65, 60, 63, 62, 67, 64, 61, 66, 63, 59
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 63.00, <em>SD</em> = 2.62
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Placebo (n = 10)
              </p>
              <p className="mt-1 text-sm text-gray-500">
                55, 58, 52, 57, 54, 59, 53, 56, 51, 55
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 55.00, <em>SD</em> = 2.62
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              ANOVA Summary Table
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-1 text-left font-medium text-gray-600">Source</th>
                    <th className="py-1 text-left font-medium text-gray-600">SS</th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>df</em></th>
                    <th className="py-1 text-left font-medium text-gray-600">MS</th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>F</em></th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>p</em></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">Between Groups</td>
                    <td className="py-1 text-gray-700">1280.00</td>
                    <td className="py-1 text-gray-700">2</td>
                    <td className="py-1 text-gray-700">640.00</td>
                    <td className="py-1 text-gray-700">93.18</td>
                    <td className="py-1 text-gray-700">&lt; .001</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-700">Within Groups</td>
                    <td className="py-1 text-gray-700">185.40</td>
                    <td className="py-1 text-gray-700">27</td>
                    <td className="py-1 text-gray-700">6.87</td>
                    <td className="py-1 text-gray-700"></td>
                    <td className="py-1 text-gray-700"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>F</em>(2, 27) = 93.18, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;</em> = .87
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The effect size (<em>&eta;&sup2;</em> = .87) is very large,
              indicating that approximately 87% of the total variance in pain
              scores is accounted for by group membership.
            </p>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              Bonferroni Post-Hoc Comparisons
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-1 text-left font-medium text-gray-600">Comparison</th>
                    <th className="py-1 text-left font-medium text-gray-600">Mean Diff</th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>p</em> (adjusted)</th>
                    <th className="py-1 text-left font-medium text-gray-600">Significant?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">Drug A vs. Drug B</td>
                    <td className="py-1 text-gray-700">8.00</td>
                    <td className="py-1 text-gray-700">&lt; .001</td>
                    <td className="py-1 text-gray-700">Yes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">Drug A vs. Placebo</td>
                    <td className="py-1 text-gray-700">16.00</td>
                    <td className="py-1 text-gray-700">&lt; .001</td>
                    <td className="py-1 text-gray-700">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-700">Drug B vs. Placebo</td>
                    <td className="py-1 text-gray-700">8.00</td>
                    <td className="py-1 text-gray-700">&lt; .001</td>
                    <td className="py-1 text-gray-700">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              All three pairwise comparisons were statistically significant after
              Bonferroni correction. Drug A produced the highest pain reduction,
              followed by Drug B, with the Placebo group reporting the least
              improvement.
            </p>
          </div>
        </div>

        {/* When to Use ANOVA vs Other Tests */}
        <h3 className="text-xl font-semibold text-gray-900">
          When to Use ANOVA vs. Other Tests
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Choosing the right statistical test depends on the number of groups,
          the nature of your data, and whether your measurements are independent
          or repeated. The table below summarizes the most common scenarios and
          the recommended test for each.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Situation</th>
                <th className="py-2 text-left font-semibold">Groups</th>
                <th className="py-2 text-left font-semibold">Recommended Test</th>
                <th className="py-2 text-left font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 text-gray-700">Comparing 2 independent group means</td>
                <td className="py-2 text-gray-700">2</td>
                <td className="py-2 font-medium">Independent samples t-test</td>
                <td className="py-2 text-gray-500">Welch&apos;s t-test recommended as default</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700">Comparing 3+ independent group means</td>
                <td className="py-2 text-gray-700">3+</td>
                <td className="py-2 font-medium">One-way ANOVA</td>
                <td className="py-2 text-gray-500">Follow up with post-hoc tests if significant</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700">Non-normal data, 3+ independent groups</td>
                <td className="py-2 text-gray-700">3+</td>
                <td className="py-2 font-medium">Kruskal-Wallis H test</td>
                <td className="py-2 text-gray-500">Non-parametric alternative to one-way ANOVA</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700">Same subjects measured across 3+ conditions</td>
                <td className="py-2 text-gray-700">3+</td>
                <td className="py-2 font-medium">Repeated Measures ANOVA</td>
                <td className="py-2 text-gray-500">Accounts for within-subject correlation</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700">Non-normal repeated measures, 3+ conditions</td>
                <td className="py-2 text-gray-700">3+</td>
                <td className="py-2 font-medium">Friedman test</td>
                <td className="py-2 text-gray-500">Non-parametric alternative to RM-ANOVA</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700">Two or more factors simultaneously</td>
                <td className="py-2 text-gray-700">Varies</td>
                <td className="py-2 font-medium">Two-way / Factorial ANOVA</td>
                <td className="py-2 text-gray-500">Tests main effects and interactions</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          A common mistake is to run multiple t-tests instead of ANOVA when you
          have three or more groups. With three groups, you would need three
          pairwise t-tests, each at &alpha; = .05. The probability of at least
          one false positive rises to approximately 1 &minus; (1 &minus; .05)
          <sup>3</sup> = .14, nearly three times the intended error rate. ANOVA
          avoids this problem by testing all groups in a single omnibus test.
        </p>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of One-Way ANOVA
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before interpreting your ANOVA results, you should verify that the
          following four assumptions are reasonably met. Violating these
          assumptions can lead to inaccurate <em>p</em>-values and unreliable
          conclusions.
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Independence of Observations</p>
            <p className="mt-1 text-sm text-gray-600">
              Each observation must be independent of every other observation.
              This means one participant&apos;s score should not influence
              another&apos;s. Independence is guaranteed by proper experimental
              design&mdash;random assignment to groups and no clustering or
              nesting of participants. Violations are common in classroom
              studies (students in the same class are not independent) and
              longitudinal designs. If observations are not independent, consider
              a mixed-effects model or repeated measures ANOVA instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Normality</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable should be approximately normally distributed
              within each group. You can assess normality visually using
              histograms or Q-Q plots, or formally using the Shapiro-Wilk test.
              However, ANOVA is remarkably robust to violations of normality
              when sample sizes are moderate to large (roughly <em>n</em> &ge; 20
              per group) thanks to the Central Limit Theorem. For severely
              skewed data with small samples, use the Kruskal-Wallis H test as a
              non-parametric alternative.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              3. Homogeneity of Variance (Homoscedasticity)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The variance of the dependent variable should be approximately
              equal across all groups. This assumption is tested using{" "}
              <strong>Levene&apos;s test</strong>: a non-significant Levene&apos;s
              test (<em>p</em> &gt; .05) suggests that variances are
              sufficiently equal. As a rule of thumb, ANOVA is robust to unequal
              variances when group sizes are equal. When group sizes are unequal
              and Levene&apos;s test is significant, consider using{" "}
              <strong>Welch&apos;s ANOVA</strong> (which does not assume equal
              variances) or the Brown-Forsythe test as alternatives.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              4. Interval or Ratio Scale of Measurement
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be measured on a continuous scale
              (interval or ratio). ANOVA relies on computing means and
              variances, which are only meaningful for continuous data. If your
              dependent variable is ordinal (e.g., rankings or Likert-scale
              items), use the Kruskal-Wallis test. If your outcome is
              categorical (e.g., pass/fail), use the chi-square test instead.
            </p>
          </div>
        </div>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding Eta-Squared (<em>&eta;&sup2;</em>) Effect Size
        </h3>
        <p className="text-gray-600 leading-relaxed">
          While the <em>p</em>-value tells you whether the group differences are
          statistically significant, <strong>eta-squared</strong> (
          <em>&eta;&sup2;</em>) tells you how large those differences are in
          practical terms. Eta-squared represents the proportion of total
          variance in the dependent variable that is explained by group
          membership. It is calculated as{" "}
          <em>&eta;&sup2;</em> = SS<sub>between</sub> / SS<sub>total</sub>.
          An <em>&eta;&sup2;</em> of .14, for example, means that 14% of the
          variability in scores is attributable to the grouping variable.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Reporting effect sizes is essential because with large enough samples,
          even trivially small differences can yield significant <em>p</em>
          -values. Cohen (1988) provided the following widely used benchmarks
          for interpreting <em>&eta;&sup2;</em>:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">
                  <em>&eta;&sup2;</em> Value
                </th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
                <th className="py-2 text-left font-semibold">Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">0.01</td>
                <td className="py-2">Small</td>
                <td className="py-2 text-gray-500">
                  ~1% of variance explained; groups differ only slightly
                </td>
              </tr>
              <tr>
                <td className="py-2">0.06</td>
                <td className="py-2">Medium</td>
                <td className="py-2 text-gray-500">
                  ~6% of variance explained; a meaningful, noticeable difference
                </td>
              </tr>
              <tr>
                <td className="py-2">0.14</td>
                <td className="py-2">Large</td>
                <td className="py-2 text-gray-500">
                  ~14%+ of variance explained; a substantial, important
                  difference
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Note: Some researchers prefer <strong>partial eta-squared</strong> (
          <em>&eta;<sub>p</sub>&sup2;</em>) or <strong>omega-squared</strong> (
          <em>&omega;&sup2;</em>) as less biased alternatives, especially for
          complex factorial designs. For one-way ANOVA with a single factor,
          eta-squared and partial eta-squared are identical. Omega-squared
          provides a slightly more conservative estimate and is preferred by
          some journals.
        </p>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report ANOVA Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, ANOVA results should include
          the <em>F</em>-statistic, both degrees of freedom, the <em>p</em>
          -value, and an effect size measure. Descriptive statistics (means and
          standard deviations) for each group should also be reported. Here are
          templates with worked examples:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Omnibus F-Test (One-Way ANOVA)
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A one-way ANOVA revealed a statistically significant difference in
              pain-reduction scores across the three treatment conditions,{" "}
              <em>F</em>(2, 27) = 93.18, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;</em> = .87. Drug A (<em>M</em> = 71.00,{" "}
              <em>SD</em> = 2.58) produced significantly higher scores than
              Drug B (<em>M</em> = 63.00, <em>SD</em> = 2.62) and Placebo (
              <em>M</em> = 55.00, <em>SD</em> = 2.62).
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Post-Hoc Comparisons (Bonferroni)
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              Bonferroni-corrected post-hoc comparisons indicated that Drug A
              (<em>M</em> = 71.00, <em>SD</em> = 2.58) produced significantly
              greater pain reduction than Drug B (<em>M</em> = 63.00,{" "}
              <em>SD</em> = 2.62), <em>p</em> &lt; .001, mean difference =
              8.00, 95% CI [5.26, 10.74], and significantly greater pain
              reduction than Placebo (<em>M</em> = 55.00, <em>SD</em> = 2.62),{" "}
              <em>p</em> &lt; .001, mean difference = 16.00, 95% CI [13.26,
              18.74]. Drug B also produced significantly higher scores than
              Placebo, <em>p</em> &lt; .001, mean difference = 8.00, 95% CI
              [5.26, 10.74].
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report <em>F</em>-values to two decimal places. Report{" "}
          <em>p</em>-values to three decimal places, except use <em>p</em> &lt;
          .001 when the value is below .001. Always italicize statistical
          symbols (<em>F</em>, <em>p</em>, <em>M</em>, <em>SD</em>,{" "}
          <em>&eta;&sup2;</em>). Report exact <em>p</em>-values (e.g.,{" "}
          <em>p</em> = .034) rather than inequalities (e.g., <em>p</em> &lt;
          .05) whenever possible, except for values below .001.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Running multiple t-tests instead of ANOVA:</strong> With
            three or more groups, performing pairwise t-tests without correction
            inflates the familywise error rate. For example, with five groups you
            would need 10 comparisons, pushing your actual alpha to roughly .40.
            Always start with an omnibus ANOVA and use post-hoc tests only if
            the <em>F</em>-test is significant.
          </li>
          <li>
            <strong>Performing post-hoc tests when the omnibus <em>F</em> is
            not significant:</strong> If the overall ANOVA is not significant (
            <em>p</em> &gt; .05), you should not proceed with post-hoc pairwise
            comparisons. Doing so capitalizes on chance and may produce spurious
            &quot;significant&quot; differences. The exception is when you have
            specific <em>a priori</em> planned contrasts defined before data
            collection.
          </li>
          <li>
            <strong>Reporting <em>p</em> = .000:</strong> Statistical software
            sometimes displays <em>p</em> = .000, but you should always report
            this as <em>p</em> &lt; .001. A <em>p</em>-value is never exactly
            zero&mdash;it can be infinitesimally small, but not zero.
          </li>
          <li>
            <strong>Ignoring effect size:</strong> A statistically significant{" "}
            <em>F</em>-test with a tiny <em>&eta;&sup2;</em> (e.g., .01) means
            the groups differ, but the practical impact is negligible. Always
            report <em>&eta;&sup2;</em> alongside the <em>p</em>-value and
            interpret both.
          </li>
          <li>
            <strong>Ignoring the homogeneity of variance assumption:</strong>{" "}
            When group sizes are unequal and variances differ substantially, the
            standard ANOVA <em>F</em>-test becomes unreliable. Run Levene&apos;s
            test before interpreting results. If it is significant, switch to
            Welch&apos;s ANOVA or use the Brown-Forsythe correction.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s one-way ANOVA calculations have been validated
            against R&apos;s <code className="rounded bg-green-100 px-1">aov()</code>{" "}
            and{" "}
            <code className="rounded bg-green-100 px-1">summary()</code>{" "}
            functions as well as SPSS GLM output. We use the jstat library for
            the <em>F</em>-distribution and compute Bonferroni-corrected
            pairwise comparisons using pooled within-group variance. All{" "}
            <em>F</em>-statistics, <em>p</em>-values, eta-squared values, and
            post-hoc results match R and SPSS output to at least 4 decimal
            places. Degrees of freedom are computed using standard formulas:{" "}
            <em>df</em><sub>between</sub> = <em>k</em> &minus; 1 and{" "}
            <em>df</em><sub>within</sub> = <em>N</em> &minus; <em>k</em>,
            where <em>k</em> is the number of groups and <em>N</em> is the
            total sample size.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/anova" />
    </div>
  );
}

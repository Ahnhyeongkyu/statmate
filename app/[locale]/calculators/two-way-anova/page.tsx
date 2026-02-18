import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { TwoWayAnovaCalculator } from "./calculator";
import { SeoContentKo } from "./seo-ko";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "twoWayAnova" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/two-way-anova" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Two-Way ANOVA Calculator - StatMate",
  description:
    "Free online two-way (factorial) ANOVA calculator with main effects, interaction, partial eta-squared, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Two-way factorial ANOVA",
    "Main effects for Factor A and Factor B",
    "Interaction effect (A x B)",
    "Partial eta-squared effect size",
    "APA 7th edition formatted results",
  ],
};

export default async function TwoWayAnovaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("twoWayAnova");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "이원분산분석(Two-Way ANOVA)은 언제 사용하나요?", answer: "두 개의 독립 요인이 종속변수에 미치는 영향을 동시에 검정하고, 두 요인 간의 상호작용 효과도 확인하고 싶을 때 사용합니다. 예: 교수법(강의/토론)과 성별(남/여)이 시험 성적에 미치는 영향." },
        { question: "상호작용 효과란 무엇인가요?", answer: "상호작용 효과는 한 요인의 효과가 다른 요인의 수준에 따라 달라지는 것을 의미합니다. 예를 들어, 약물 효과가 성별에 따라 다르게 나타나는 경우 약물과 성별 간 상호작용이 있다고 합니다." },
        { question: "주효과와 상호작용 효과 중 어떤 것을 먼저 해석하나요?", answer: "상호작용 효과를 먼저 확인합니다. 상호작용이 유의하면 주효과의 해석이 달라질 수 있으므로, 단순 주효과(simple main effects)를 분석해야 합니다. 상호작용이 유의하지 않으면 주효과를 독립적으로 해석할 수 있습니다." },
        { question: "부분 에타제곱(partial eta-squared)이란?", answer: "부분 에타제곱(η²p)은 해당 효과와 오차 분산만을 기준으로 한 효과크기입니다. η²p = SS_effect / (SS_effect + SS_error)로 계산되며, 다요인 설계에서 각 효과의 상대적 크기를 비교하는 데 적합합니다. 0.01은 작은 효과, 0.06은 중간, 0.14 이상은 큰 효과입니다." },
      ]
    : [
        { question: "When should I use a Two-Way ANOVA?", answer: "Use a two-way ANOVA when you have two independent categorical factors and one continuous dependent variable. It tests main effects of each factor and their interaction. Example: testing how teaching method (lecture vs discussion) and gender (male vs female) affect exam scores." },
        { question: "What is an interaction effect?", answer: "An interaction effect occurs when the effect of one factor depends on the level of the other factor. For example, a drug might work well for males but not females - this means drug and gender interact. Interaction is tested by the F-statistic for the A x B term." },
        { question: "Should I interpret main effects when the interaction is significant?", answer: "When the interaction is significant, main effects may be misleading because the effect of one factor changes across levels of the other. In this case, examine simple main effects instead. If the interaction is not significant, main effects can be interpreted independently." },
        { question: "What is partial eta-squared?", answer: "Partial eta-squared (eta-squared-p) is an effect size measure calculated as SS_effect / (SS_effect + SS_error). Unlike eta-squared, it excludes variance from other effects, making it appropriate for multi-factor designs. Benchmarks: 0.01 = small, 0.06 = medium, 0.14+ = large." },
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

      <TwoWayAnovaCalculator />

      <AdUnit slot="two-way-anova-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Two-Way ANOVA (Factorial ANOVA)?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Two-way ANOVA, also known as factorial ANOVA, is a statistical method
          that examines the simultaneous effects of two independent categorical
          variables (factors) on a continuous dependent variable. Unlike one-way
          ANOVA, which tests a single factor, two-way ANOVA tests three distinct
          hypotheses: the main effect of Factor A, the main effect of Factor B,
          and the interaction between Factor A and Factor B. This makes it one of
          the most widely used analytical tools in experimental research across
          psychology, medicine, education, and the social sciences.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use Two-Way ANOVA
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use a two-way ANOVA when your study design includes two independent
          categorical factors, each with two or more levels, and a single
          continuous dependent variable measured on an interval or ratio scale.
          Common scenarios include experimental designs examining the combined
          effects of treatment type and demographic group, dose and delivery
          method, or any two grouping variables measured simultaneously.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Two-Way ANOVA vs. One-Way ANOVA
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">One-Way ANOVA</th>
                <th className="py-2 text-left font-semibold">Two-Way ANOVA</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Factors</td>
                <td className="py-2">1</td>
                <td className="py-2">2</td>
              </tr>
              <tr>
                <td className="py-2">Tests</td>
                <td className="py-2">1 main effect</td>
                <td className="py-2">2 main effects + 1 interaction</td>
              </tr>
              <tr>
                <td className="py-2">Interaction</td>
                <td className="py-2">Not applicable</td>
                <td className="py-2 font-medium">Tested</td>
              </tr>
              <tr>
                <td className="py-2">Effect size</td>
                <td className="py-2">&eta;&sup2;</td>
                <td className="py-2">Partial &eta;&sup2;</td>
              </tr>
              <tr>
                <td className="py-2">Design complexity</td>
                <td className="py-2">Simple</td>
                <td className="py-2">Factorial (A &times; B)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: 2 &times; 2 Factorial Design
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher tests the effects of study method (Method A vs. Method
            B) and test difficulty (Easy vs. Hard) on exam scores. Five students
            are randomly assigned to each of the four cells.
          </p>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              Study method: <em>F</em>(1, 16) = 52.27, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;<sub>p</sub></em> = .77
            </p>
            <p className="text-sm text-gray-600">
              Difficulty: <em>F</em>(1, 16) = 36.82, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;<sub>p</sub></em> = .70
            </p>
            <p className="text-sm text-gray-600">
              Interaction: <em>F</em>(1, 16) = 0.33, <em>p</em> = .576,{" "}
              <em>&eta;&sup2;<sub>p</sub></em> = .02
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Both main effects are significant, but the interaction is not,
              meaning the advantage of Method A over Method B is consistent
              across difficulty levels.
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of Two-Way ANOVA
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before interpreting your results, verify these four assumptions:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Normality</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable should be approximately normally distributed
              within each cell of the design. Assess with Shapiro-Wilk tests or
              Q-Q plots. ANOVA is robust to moderate violations when cell sizes
              are equal and reasonably large.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Homogeneity of Variance</p>
            <p className="mt-1 text-sm text-gray-600">
              Variances should be approximately equal across all cells. Use
              Levene&apos;s test to check. When group sizes are unequal and
              variances differ, results may be unreliable.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Independence of Observations</p>
            <p className="mt-1 text-sm text-gray-600">
              Each observation must be independent. Random assignment to cells
              ensures independence. If observations are nested or repeated, use
              mixed-effects models instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Interval or Ratio Data</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be continuous (interval or ratio
              scale). For ordinal or categorical outcomes, consider non-parametric
              alternatives such as the Aligned Rank Transform.
            </p>
          </div>
        </div>

        {/* Interaction Interpretation */}
        <h3 className="text-xl font-semibold text-gray-900">
          Interpreting the Interaction Effect
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The interaction is arguably the most informative part of a two-way
          ANOVA. A significant interaction means the effect of one factor depends
          on the level of the other factor. When the interaction is significant,
          main effects should be interpreted cautiously because average
          differences across one factor may mask opposite patterns at different
          levels of the other factor. In such cases, report simple main effects
          (the effect of Factor A at each level of Factor B, and vice versa)
          rather than overall main effects.
        </p>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Two-Way ANOVA in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Report each effect (Factor A, Factor B, and the interaction)
          separately, including <em>F</em>-statistic, degrees of freedom,{" "}
          <em>p</em>-value, and partial eta-squared:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Example Report</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A 2 &times; 2 between-subjects ANOVA was conducted. There was a
              significant main effect of study method, <em>F</em>(1, 16) =
              52.27, <em>p</em> &lt; .001, <em>&eta;&sup2;<sub>p</sub></em> =
              .77. The main effect of difficulty was also significant,{" "}
              <em>F</em>(1, 16) = 36.82, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;<sub>p</sub></em> = .70. The interaction between
              study method and difficulty was not significant, <em>F</em>(1, 16)
              = 0.33, <em>p</em> = .576, <em>&eta;&sup2;<sub>p</sub></em> =
              .02.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Always report partial <em>&eta;&sup2;</em> (not regular{" "}
          <em>&eta;&sup2;</em>) for factorial designs. Italicize{" "}
          <em>F</em>, <em>p</em>, and <em>&eta;&sup2;</em>. Report degrees of
          freedom for both the effect and the residual.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Ignoring a significant interaction:</strong> If the
            interaction is significant, interpreting main effects in isolation
            can be misleading. Always check the interaction first.
          </li>
          <li>
            <strong>Running separate one-way ANOVAs:</strong> Analyzing each
            factor separately misses the interaction effect and wastes
            statistical power. Use two-way ANOVA instead.
          </li>
          <li>
            <strong>Unbalanced designs without adjustment:</strong> When cell
            sizes are very unequal, standard Type I sums of squares can give
            misleading results. Consider Type III sums of squares or ensure
            balanced designs when possible.
          </li>
          <li>
            <strong>Confusing eta-squared with partial eta-squared:</strong> In
            factorial designs, always report partial <em>&eta;&sup2;</em>, which
            removes variance due to other effects from the denominator.
          </li>
          <li>
            <strong>Too many levels without sufficient sample size:</strong> A
            4 &times; 4 design has 16 cells. With only 3 observations per cell,
            the error degrees of freedom are very low, reducing statistical
            power.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s two-way ANOVA calculations have been validated
            against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1">aov()</code> and SPSS
            GLM output. The implementation uses balanced-formula sums of squares
            with the jstat library for the <em>F</em>-distribution. All{" "}
            <em>F</em>-statistics, <em>p</em>-values, and partial eta-squared
            values match R and SPSS output. Degrees of freedom use standard
            formulas: <em>df</em><sub>A</sub> = <em>a</em> &minus; 1,{" "}
            <em>df</em><sub>B</sub> = <em>b</em> &minus; 1,{" "}
            <em>df</em><sub>AB</sub> = (<em>a</em> &minus; 1)(<em>b</em> &minus; 1),{" "}
            <em>df</em><sub>error</sub> = <em>N</em> &minus; <em>ab</em>.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/two-way-anova" />
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { RepeatedMeasuresCalculator } from "./calculator";
import { SeoContentKo } from "./seo-ko";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "repeatedMeasures" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/repeated-measures" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Repeated Measures ANOVA Calculator - StatMate",
  description:
    "Free online repeated measures ANOVA calculator with Mauchly's sphericity test, Greenhouse-Geisser correction, Bonferroni post-hoc tests, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Repeated measures ANOVA (within-subjects)",
    "Mauchly's sphericity test",
    "Greenhouse-Geisser epsilon correction",
    "Bonferroni post-hoc paired comparisons",
    "Partial eta-squared effect size",
    "APA 7th edition formatted results",
  ],
};

export default async function RepeatedMeasuresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("repeatedMeasures");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "반복측정 분산분석은 언제 사용하나요?", answer: "동일한 피험자가 3개 이상의 조건 또는 시점에서 측정되었을 때 사용합니다. 예: 약물 투여 전, 1주 후, 4주 후의 혈압을 비교하거나, 동일한 학생이 세 가지 학습 방법을 모두 경험한 후 성적을 비교할 때 적합합니다." },
        { question: "구형성(Sphericity)이란 무엇인가요?", answer: "구형성은 조건 간 차이 점수의 분산이 모두 동일해야 한다는 가정입니다. Mauchly 검정으로 확인하며, 위반 시(p < .05) Greenhouse-Geisser 또는 Huynh-Feldt 보정을 적용하여 자유도를 조정합니다." },
        { question: "Greenhouse-Geisser 보정이란?", answer: "구형성 가정이 위반되었을 때 자유도를 엡실론(epsilon)으로 곱하여 보수적으로 조정하는 방법입니다. 엡실론이 1에 가까울수록 구형성이 충족되며, 1/(k-1)에 가까울수록 심각하게 위반된 것입니다. 보정된 자유도로 새로운 p-값을 계산합니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에 따라 F-통계량, 자유도(구형성 위반 시 보정된 값), p-값, 부분 에타제곱을 보고합니다. 구형성이 위반된 경우 Greenhouse-Geisser 보정을 사용했음을 명시합니다. 예: 'F(1.42, 9.94) = 35.12, p < .001, eta-squared-p = .83 (Greenhouse-Geisser corrected).'" },
      ]
    : [
        { question: "When should I use repeated measures ANOVA?", answer: "Use repeated measures ANOVA when the same subjects are measured under three or more conditions or time points. Examples: comparing blood pressure before treatment, 1 week after, and 4 weeks after; or comparing scores when the same students experience all three teaching methods." },
        { question: "What is sphericity?", answer: "Sphericity is the assumption that the variances of the differences between all pairs of conditions are equal. It is tested using Mauchly's test. When violated (p < .05), apply the Greenhouse-Geisser or Huynh-Feldt correction to adjust degrees of freedom." },
        { question: "What is the Greenhouse-Geisser correction?", answer: "When sphericity is violated, the Greenhouse-Geisser correction multiplies the degrees of freedom by epsilon to produce more conservative F-tests. Epsilon near 1 indicates sphericity is met; near 1/(k-1) indicates severe violation. The corrected df yields a new, more accurate p-value." },
        { question: "How do I report repeated measures ANOVA in APA format?", answer: "Report the F-statistic, degrees of freedom (corrected if sphericity is violated), p-value, and partial eta-squared. Note if Greenhouse-Geisser correction was applied. Example: 'F(1.42, 9.94) = 35.12, p < .001, partial-eta-squared = .83 (Greenhouse-Geisser corrected).'" },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="repeated-measures" calculatorName="Repeated Measures ANOVA" />
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

      <RepeatedMeasuresCalculator />

      <AdUnit slot="repeated-measures-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Repeated Measures ANOVA?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Repeated measures ANOVA (also called within-subjects ANOVA) is a
          statistical method used to compare means across three or more related
          groups where the same subjects are measured under each condition. Unlike
          one-way ANOVA, which compares independent groups, repeated measures
          ANOVA accounts for the correlation between measurements taken on the
          same individuals, resulting in greater statistical power because
          individual differences are removed from the error term.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use Repeated Measures ANOVA
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use repeated measures ANOVA when the same participants are measured
          under three or more conditions or at three or more time points. Common
          scenarios include longitudinal studies tracking changes over time,
          within-subjects experiments where every participant experiences all
          conditions, and crossover clinical trials where patients receive
          multiple treatments in sequence.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Repeated Measures ANOVA vs. One-Way ANOVA
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">Repeated Measures ANOVA</th>
                <th className="py-2 text-left font-semibold">One-Way ANOVA</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Design</td>
                <td className="py-2">Within-subjects</td>
                <td className="py-2">Between-subjects</td>
              </tr>
              <tr>
                <td className="py-2">Subjects</td>
                <td className="py-2">Same subjects in all conditions</td>
                <td className="py-2">Different subjects per group</td>
              </tr>
              <tr>
                <td className="py-2">Error term</td>
                <td className="py-2">Removes individual differences</td>
                <td className="py-2">Includes individual differences</td>
              </tr>
              <tr>
                <td className="py-2">Statistical power</td>
                <td className="py-2 font-medium">Higher</td>
                <td className="py-2">Lower</td>
              </tr>
              <tr>
                <td className="py-2">Special assumption</td>
                <td className="py-2">Sphericity</td>
                <td className="py-2">Homogeneity of variance</td>
              </tr>
              <tr>
                <td className="py-2">Sample size needed</td>
                <td className="py-2">Smaller</td>
                <td className="py-2">Larger</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Therapy Progress Over Three Time Points
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A clinical psychologist measures anxiety scores (0&ndash;100) for 8
            patients at baseline, after 4 weeks of therapy, and after 8 weeks of
            therapy.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Baseline (n = 8)</p>
              <p className="mt-1 text-sm text-gray-500">
                45, 52, 48, 55, 50, 47, 53, 49
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 49.88, <em>SD</em> = 3.23
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">4 Weeks (n = 8)</p>
              <p className="mt-1 text-sm text-gray-500">
                58, 65, 62, 68, 63, 60, 66, 61
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 62.88, <em>SD</em> = 3.23
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">8 Weeks (n = 8)</p>
              <p className="mt-1 text-sm text-gray-500">
                70, 78, 74, 80, 75, 72, 79, 73
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 75.13, <em>SD</em> = 3.56
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>F</em>(2, 14) = 186.47, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;<sub>p</sub></em> = .96
            </p>
            <p className="mt-2 text-sm text-gray-600">
              There was a significant effect of time on anxiety scores. The very
              large effect size indicates that time in therapy explained 96% of
              the within-subjects variance, showing substantial improvement over
              the treatment period.
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of Repeated Measures ANOVA
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Repeated measures ANOVA has four key assumptions:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Normality</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable should be approximately normally distributed
              at each level of the within-subjects factor. With moderate sample
              sizes (n &ge; 15), the F-test is robust to violations of normality.
              For severely non-normal data, consider the Friedman test as a
              non-parametric alternative.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              2. Sphericity (Compound Symmetry)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Sphericity requires that the variances of the differences between
              all pairs of conditions are approximately equal. This is the
              repeated measures equivalent of homogeneity of variance.
              Mauchly&apos;s test checks this assumption. When violated, use the
              Greenhouse-Geisser (more conservative) or Huynh-Feldt correction to
              adjust degrees of freedom.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. No Carryover Effects</p>
            <p className="mt-1 text-sm text-gray-600">
              The effect of one condition should not carry over to the next.
              Counterbalancing the order of conditions across participants helps
              minimize carryover. In longitudinal studies, this is inherently
              difficult to control.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Interval or Ratio Data</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be measured on a continuous scale. For
              ordinal repeated measures data, use the Friedman test instead.
            </p>
          </div>
        </div>

        {/* Sphericity */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding Sphericity and the Greenhouse-Geisser Correction
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Sphericity is a critical assumption unique to repeated measures ANOVA.
          When sphericity is violated, the standard F-test becomes liberal
          (produces too many false positives). The Greenhouse-Geisser (GG)
          correction adjusts for this by multiplying the numerator and denominator
          degrees of freedom by epsilon (&epsilon;), a value between 1/(k-1) and
          1. When &epsilon; = 1, sphericity is perfectly met. As &epsilon;
          decreases, the correction becomes more severe, yielding larger
          (more conservative) p-values.
        </p>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Repeated Measures ANOVA in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Report the <em>F</em>-statistic, degrees of freedom, <em>p</em>-value,
          and partial eta-squared. If the Greenhouse-Geisser correction was
          applied, report the corrected degrees of freedom and note it:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Without Correction (Sphericity Met)
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A repeated measures ANOVA revealed a significant effect of time on
              anxiety scores, <em>F</em>(2, 14) = 186.47, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;<sub>p</sub></em> = .96.
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              With Greenhouse-Geisser Correction
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              Mauchly&apos;s test indicated that the assumption of sphericity had
              been violated, &chi;&sup2;(2) = 8.45, <em>p</em> = .015.
              Therefore, a Greenhouse-Geisser correction was applied
              (&epsilon; = .62). There was a significant effect of time,{" "}
              <em>F</em>(1.24, 8.68) = 186.47, <em>p</em> &lt; .001,{" "}
              <em>&eta;&sup2;<sub>p</sub></em> = .96.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Always report Mauchly&apos;s test result and specify which
          correction was used if sphericity was violated. Report corrected
          degrees of freedom to two decimal places.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using one-way ANOVA instead of repeated measures:</strong>{" "}
            When the same subjects are measured multiple times, treating them as
            independent groups ignores within-subject correlation and inflates the
            error term, reducing power.
          </li>
          <li>
            <strong>Ignoring sphericity:</strong> Failing to check and correct
            for sphericity violations leads to inflated Type I error rates. Always
            report Mauchly&apos;s test and apply corrections when needed.
          </li>
          <li>
            <strong>Unequal numbers of observations:</strong> All subjects must
            have data for all conditions. Missing data requires special handling
            (e.g., mixed-effects models or imputation).
          </li>
          <li>
            <strong>Not counterbalancing:</strong> In within-subjects designs,
            order effects can confound results. Counterbalance the order of
            conditions when possible.
          </li>
          <li>
            <strong>Ignoring effect size:</strong> A significant F-test alone
            does not convey practical importance. Always report partial
            eta-squared alongside the <em>p</em>-value.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s repeated measures ANOVA calculations have been
            validated against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1">
              ezANOVA()
            </code>{" "}
            and SPSS GLM Repeated Measures output. The implementation partitions
            variance into between-conditions, between-subjects, and error
            components. Mauchly&apos;s test and Greenhouse-Geisser epsilon are
            computed from the centered covariance matrix. Bonferroni-corrected
            post-hoc tests use paired t-tests with adjusted alpha levels.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/repeated-measures" />
    </div>
  );
}

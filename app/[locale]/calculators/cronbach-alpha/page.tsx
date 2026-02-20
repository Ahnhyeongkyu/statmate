import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CronbachAlphaCalculator } from "./calculator";
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
  const t = await getTranslations({ locale, namespace: "cronbachAlpha" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/cronbach-alpha" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cronbach's Alpha Calculator - StatMate",
  description:
    "Free online Cronbach's Alpha calculator for reliability analysis. Item statistics, split-half reliability, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Cronbach's Alpha",
    "Item-total correlations",
    "Alpha-if-deleted",
    "Split-half reliability",
    "Spearman-Brown prophecy",
    "APA 7th edition formatted results",
  ],
};

export default async function CronbachAlphaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("cronbachAlpha");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "크론바흐 알파란?", answer: "크론바흐 알파(Cronbach's alpha)는 설문지나 검사 도구의 내적 일관성 신뢰도를 측정하는 가장 널리 사용되는 통계 지표입니다. 동일한 구성개념을 측정하는 문항들이 얼마나 일관되게 응답되는지를 0에서 1 사이의 값으로 나타냅니다. StatMate에서 간편하게 계산할 수 있습니다." },
        { question: "좋은 크론바흐 알파 값은?", answer: "일반적으로 .70 이상이면 수용 가능하고, .80 이상이면 양호, .90 이상이면 우수한 신뢰도로 해석합니다. 다만 .95를 초과하면 문항 간 중복 가능성이 있으므로 문항 간 상관행렬을 확인해야 합니다." },
        { question: "크론바흐 알파는 언제 사용하나요?", answer: "리커트 척도와 같은 다항목 설문지의 내적 일관성을 평가할 때 사용합니다. 설문 개발, 타당도 검증, 연구 논문에서 측정도구의 신뢰도를 보고할 때 필수적입니다. 단, 모든 문항이 동일한 구성개념을 측정해야 합니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에서는 척도명, 문항 수, 크론바흐 알파 값을 보고합니다. 예: '고객만족도 척도의 내적 일관성을 크론바흐 알파로 평가한 결과, 5개 문항 척도는 양호한 신뢰도를 보였다(α = .85).' StatMate가 APA 형식의 결과를 자동 생성합니다." },
      ]
    : [
        { question: "What is Cronbach's alpha?", answer: "Cronbach's alpha is the most widely used statistical measure of internal consistency reliability for questionnaires and scales. It evaluates how consistently a set of items measuring the same construct relate to one another, producing a value between 0 and 1. StatMate makes it easy to calculate alpha along with item-level diagnostics." },
        { question: "What is a good Cronbach's alpha value?", answer: "Generally, alpha >= .70 is acceptable for research, >= .80 is good, and >= .90 is excellent. However, values above .95 may indicate item redundancy rather than superior reliability. Always inspect the inter-item correlation matrix alongside the alpha value." },
        { question: "When should I use Cronbach's alpha?", answer: "Use Cronbach's alpha when you need to assess the internal consistency of a multi-item scale, such as a Likert-type questionnaire. It is essential for scale development, construct validation, and reporting measurement reliability in research papers. All items must measure the same underlying construct." },
        { question: "How do I report Cronbach's alpha in APA format?", answer: "APA 7th edition requires reporting the scale name, number of items, and the alpha value. For example: 'Internal consistency of the 5-item Customer Satisfaction Scale was good (α = .85).' StatMate automatically generates APA-formatted reliability results you can use directly in your manuscript." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="cronbach-alpha" calculatorName="Cronbach's Alpha" />
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

      <CronbachAlphaCalculator />

      <AdUnit slot="cronbach-alpha-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        {/* 1. What is Cronbach's Alpha */}
        <h2 className="text-2xl font-bold text-gray-900">
          What is Cronbach&apos;s Alpha?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Cronbach&apos;s alpha is the most widely used statistical measure of{" "}
          <strong>internal consistency reliability</strong>. It evaluates how
          consistently a set of items designed to measure a single construct
          relate to one another. Alpha ranges from 0 to 1, with higher values
          indicating greater internal consistency among the items. The measure
          was introduced by <strong>Lee J. Cronbach</strong> in 1951 as a
          generalization of the Kuder-Richardson formula 20 (KR-20), extending
          reliability estimation from dichotomous items to polytomous items
          such as Likert scales.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The formula is: <em>&alpha;</em> = (<em>k</em> / (<em>k</em> &minus;
          1)) &times; (1 &minus; &Sigma;<em>&sigma;</em><sup>2</sup>
          <sub><em>i</em></sub> / <em>&sigma;</em><sup>2</sup>
          <sub><em>t</em></sub>), where <em>k</em> is the number of items,{" "}
          <em>&sigma;</em><sup>2</sup><sub><em>i</em></sub> is the variance of
          each item, and <em>&sigma;</em><sup>2</sup>
          <sub><em>t</em></sub> is the variance of total scores. When item
          variances are small relative to the total variance, alpha approaches
          1.
        </p>

        {/* 2. Interpretation Criteria */}
        <h3 className="text-xl font-semibold text-gray-900">
          Interpreting Cronbach&apos;s Alpha
        </h3>
        <p className="text-gray-600 leading-relaxed">
          George and Mallery (2003) provide the most commonly cited
          benchmarks:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Alpha Value</th>
                <th className="py-2 text-left font-semibold">Level</th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">&ge; .90</td>
                <td className="py-2 font-medium">Excellent</td>
                <td className="py-2 text-gray-500">Very high internal consistency; check for redundancy if &gt; .95</td>
              </tr>
              <tr>
                <td className="py-2">&ge; .80</td>
                <td className="py-2 font-medium">Good</td>
                <td className="py-2 text-gray-500">Suitable for most research purposes</td>
              </tr>
              <tr>
                <td className="py-2">&ge; .70</td>
                <td className="py-2 font-medium">Acceptable</td>
                <td className="py-2 text-gray-500">Minimum threshold for exploratory research</td>
              </tr>
              <tr>
                <td className="py-2">&ge; .60</td>
                <td className="py-2 font-medium">Questionable</td>
                <td className="py-2 text-gray-500">Item revision recommended</td>
              </tr>
              <tr>
                <td className="py-2">&ge; .50</td>
                <td className="py-2 font-medium">Poor</td>
                <td className="py-2 text-gray-500">Scale revision strongly recommended</td>
              </tr>
              <tr>
                <td className="py-2">&lt; .50</td>
                <td className="py-2 font-medium">Unacceptable</td>
                <td className="py-2 text-gray-500">Scale should not be used; full reconstruction needed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. Related Reliability Indices */}
        <h3 className="text-xl font-semibold text-gray-900">
          Related Reliability Measures
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Measure</th>
                <th className="py-2 text-left font-semibold">Type</th>
                <th className="py-2 text-left font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium text-gray-700">Cronbach&apos;s <em>&alpha;</em></td>
                <td className="py-2">Internal consistency</td>
                <td className="py-2 text-gray-500">Polytomous items on a single scale</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Split-half</td>
                <td className="py-2">Internal consistency</td>
                <td className="py-2 text-gray-500">Single-administration reliability with Spearman-Brown correction</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Test-retest</td>
                <td className="py-2">Stability</td>
                <td className="py-2 text-gray-500">Temporal stability over a defined interval</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Inter-rater</td>
                <td className="py-2">Equivalence</td>
                <td className="py-2 text-gray-500">Observer agreement in coding or scoring tasks</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions and Cautions
        </h3>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Unidimensionality</p>
            <p className="mt-1 text-sm text-gray-600">
              All items should measure a single latent construct. Run
              exploratory or confirmatory factor analysis before computing
              alpha. For multidimensional scales, compute alpha per subscale.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Tau-equivalence</p>
            <p className="mt-1 text-sm text-gray-600">
              Alpha assumes equal factor loadings across items. When this
              assumption is violated, alpha serves as a lower bound of
              reliability. Consider McDonald&apos;s <em>&omega;</em> as an
              alternative.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Consistent Item Coding</p>
            <p className="mt-1 text-sm text-gray-600">
              All items must be coded in the same direction. Reverse-coded
              items must be recoded before analysis, or alpha will be
              artificially deflated.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Minimum Items (&ge; 3)</p>
            <p className="mt-1 text-sm text-gray-600">
              Alpha is unstable with fewer than 3 items. With very many items,
              alpha can be inflated regardless of actual consistency. Report
              mean inter-item correlation (.15&ndash;.50) alongside alpha for
              short scales.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">5. Adequate Sample Size</p>
            <p className="mt-1 text-sm text-gray-600">
              Aim for at least 5&ndash;10 respondents per item, with a minimum
              of 30 total. Small samples produce wide confidence intervals
              around alpha.
            </p>
          </div>
        </div>

        {/* 5. APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          Reporting in APA Format
        </h3>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm italic text-gray-600">
            Internal consistency reliability of the Customer Satisfaction Scale
            was assessed using Cronbach&apos;s alpha. The 5-item scale
            demonstrated good reliability, <em>&alpha;</em> = .85.
            Alpha-if-item-deleted analysis indicated that all items contributed
            positively to scale reliability (range: .82&ndash;.84).
          </p>
        </div>

        {/* 6. Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Alpha too high (&gt; .95):</strong> May indicate item
            redundancy rather than superior reliability. Inspect the
            inter-item correlation matrix for highly overlapping items.
          </li>
          <li>
            <strong>Forgetting reverse-coded items:</strong> Failing to recode
            negatively worded items before analysis will drastically deflate
            alpha or produce a negative value.
          </li>
          <li>
            <strong>Applying alpha to multidimensional scales:</strong>{" "}
            Computing a single alpha across subscales that tap different
            constructs distorts the reliability estimate. Report alpha per
            subscale instead.
          </li>
          <li>
            <strong>Ignoring item count effects:</strong> A small number of
            items can depress alpha even with strong inter-item correlations.
            Supplement with mean inter-item correlation for short scales.
          </li>
          <li>
            <strong>Equating reliability with validity:</strong> High alpha
            confirms internal consistency, not that the scale measures the
            intended construct. Validity requires separate evidence
            (e.g., convergent, discriminant, criterion validity).
          </li>
        </ul>

        {/* 7. Calculation Accuracy */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s Cronbach&apos;s alpha calculations have been
            validated against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">psych::alpha()</code>{" "}
            function and SPSS Reliability Analysis. Item variances use the{" "}
            <em>N</em> &minus; 1 denominator (sample variance). Item-total
            correlations are corrected (item removed from total). All
            supplementary statistics&mdash;alpha-if-deleted, split-half
            reliability, and Spearman-Brown prophecy&mdash;match R and SPSS
            output to four decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/cronbach-alpha" />
    </div>
  );
}

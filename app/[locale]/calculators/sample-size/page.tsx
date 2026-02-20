import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SampleSizeCalculator } from "./calculator";
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
  const t = await getTranslations({ locale, namespace: "sampleSize" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/sample-size" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sample Size Calculator - StatMate",
  description:
    "Free online sample size calculator with power analysis. Calculate required N for t-tests, ANOVA, correlation, chi-square, and proportion tests.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Power analysis for 7 statistical tests",
    "Cohen's d, f, w, and r effect sizes",
    "Achieved power calculation",
    "Effect size presets (small, medium, large)",
    "APA 7th edition formatted results",
  ],
};

export default async function SampleSizePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("sampleSize");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "표본크기 계산이란?", answer: "표본크기 계산(검정력 분석)은 연구에서 통계적으로 유의미한 효과를 탐지하기 위해 필요한 최소 참가자 수를 결정하는 과정입니다. 적절한 표본크기는 연구의 신뢰성을 높이고 자원 낭비를 방지합니다. StatMate는 t-검정, ANOVA, 상관분석 등 7가지 검정에 대한 표본크기를 무료로 계산해 줍니다." },
        { question: "t-검정 표본크기는 어떻게 결정하나요?", answer: "t-검정의 표본크기는 효과크기(Cohen's d), 유의수준(α), 검정력(1-β)의 세 가지 요소로 결정됩니다. 예를 들어 중간 효과크기(d=0.5), α=.05, 검정력=.80일 때 독립표본 t-검정에는 총 128명(그룹당 64명)이 필요합니다. StatMate의 표본크기 계산기에서 바로 확인할 수 있습니다." },
        { question: "통계적 검정력이란?", answer: "통계적 검정력(power)은 실제로 존재하는 효과를 올바르게 탐지할 확률입니다. 일반적으로 .80(80%) 이상이 권장되며, 이는 실제 효과가 있을 때 이를 발견할 확률이 80%임을 의미합니다. 검정력이 낮으면 제2종 오류(실제 효과를 놓치는 오류) 위험이 커집니다." },
        { question: "효과크기는 어떤 값을 사용해야 하나요?", answer: "효과크기는 선행연구나 파일럿 데이터에서 추정하는 것이 가장 좋습니다. 참고할 자료가 없다면 Cohen의 관례를 사용하세요: t-검정은 d=0.2(작음), 0.5(중간), 0.8(큼)입니다. StatMate에서는 효과크기 프리셋을 제공하여 쉽게 선택할 수 있습니다." },
      ]
    : [
        { question: "What is sample size calculation?", answer: "Sample size calculation (power analysis) determines the minimum number of participants needed in a study to detect a statistically significant effect. Proper sample sizing ensures reliable results while avoiding wasted resources. StatMate provides free sample size calculations for 7 statistical tests including t-tests, ANOVA, and correlation." },
        { question: "How do I determine sample size for a t-test?", answer: "Sample size for a t-test depends on three factors: effect size (Cohen's d), significance level (alpha), and desired power (1-beta). For example, with a medium effect size (d=0.5), alpha=.05, and power=.80, an independent samples t-test requires N=128 (64 per group). Use StatMate's sample size calculator to compute this instantly." },
        { question: "What is statistical power?", answer: "Statistical power is the probability of correctly detecting a real effect when it exists. A power of .80 (80%) is the conventional minimum, meaning there is an 80% chance of finding a true effect. Low power increases the risk of Type II errors (failing to detect a real effect), which is why power analysis before data collection is essential." },
        { question: "What effect size should I use?", answer: "The best approach is to estimate effect size from prior research or pilot data. If no prior information is available, use Cohen's conventions: for t-tests, d=0.2 (small), 0.5 (medium), and 0.8 (large). StatMate provides built-in effect size presets so you can quickly select the appropriate value for your analysis." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="sample-size" calculatorName="Sample Size Calculator" />
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

      <SampleSizeCalculator />

      <AdUnit slot="sample-size-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Sample Size Calculation?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Sample size calculation (also called power analysis) determines the
          minimum number of participants needed for a study to detect a
          meaningful effect. It is a critical step in research planning — too
          few participants and you risk missing a real effect (Type II error);
          too many and you waste time and resources. Most IRBs (Institutional
          Review Boards) and grant agencies require a formal power analysis as
          part of the research proposal.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          The Four Components of Power Analysis
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Every power analysis involves four interconnected parameters. If you
          know any three, you can solve for the fourth. In practice, researchers
          most commonly fix alpha, power, and effect size to solve for sample
          size (N).
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              1. Effect Size (d, f, r, or w)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The expected magnitude of the effect you want to detect. Larger
              effects require fewer participants. Use Cohen&apos;s d for t-tests,
              Cohen&apos;s f for ANOVA, r for correlation, and Cohen&apos;s w for
              chi-square tests. If you don&apos;t know the expected effect size,
              use conventions: small, medium, or large.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              2. Significance Level (&alpha;)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The probability of a Type I error — rejecting the null hypothesis
              when it is actually true (a false positive). The conventional
              level is &alpha; = .05, meaning a 5% chance of incorrectly
              declaring significance.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              3. Statistical Power (1 - &beta;)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The probability of correctly detecting a real effect — avoiding a
              Type II error (a false negative). The conventional minimum is .80
              (80%), meaning an 80% chance of finding the effect if it truly
              exists. Some fields recommend .90 or higher.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              4. Sample Size (N)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The total number of participants required. This is typically the
              unknown you solve for. More participants increase power but also
              increase cost and time.
            </p>
          </div>
        </div>

        {/* Effect Size Conventions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Effect Size Conventions by Test Type
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Jacob Cohen (1988) established widely-used conventions for small,
          medium, and large effect sizes. Use these when you lack pilot data or
          prior research to estimate the expected effect.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Test</th>
                <th className="py-2 text-left font-semibold">Measure</th>
                <th className="py-2 text-center font-semibold">Small</th>
                <th className="py-2 text-center font-semibold">Medium</th>
                <th className="py-2 text-center font-semibold">Large</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">T-tests</td>
                <td className="py-2">Cohen&apos;s <em>d</em></td>
                <td className="py-2 text-center">0.20</td>
                <td className="py-2 text-center">0.50</td>
                <td className="py-2 text-center">0.80</td>
              </tr>
              <tr>
                <td className="py-2">ANOVA</td>
                <td className="py-2">Cohen&apos;s <em>f</em></td>
                <td className="py-2 text-center">0.10</td>
                <td className="py-2 text-center">0.25</td>
                <td className="py-2 text-center">0.40</td>
              </tr>
              <tr>
                <td className="py-2">Correlation</td>
                <td className="py-2"><em>r</em></td>
                <td className="py-2 text-center">0.10</td>
                <td className="py-2 text-center">0.30</td>
                <td className="py-2 text-center">0.50</td>
              </tr>
              <tr>
                <td className="py-2">Chi-square</td>
                <td className="py-2">Cohen&apos;s <em>w</em></td>
                <td className="py-2 text-center">0.10</td>
                <td className="py-2 text-center">0.30</td>
                <td className="py-2 text-center">0.50</td>
              </tr>
              <tr>
                <td className="py-2">Proportions</td>
                <td className="py-2">Cohen&apos;s <em>h</em></td>
                <td className="py-2 text-center">0.20</td>
                <td className="py-2 text-center">0.50</td>
                <td className="py-2 text-center">0.80</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Independent Samples T-Test
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher plans to compare exam scores between two teaching
            methods. Based on prior literature, they expect a medium effect size
            (Cohen&apos;s <em>d</em> = 0.50). They set &alpha; = .05 and power =
            .80.
          </p>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Parameters</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>Test: Independent samples t-test (two-tailed)</li>
              <li>Effect size: <em>d</em> = 0.50 (medium)</li>
              <li>Significance level: &alpha; = .05</li>
              <li>Power: 1 - &beta; = .80</li>
            </ul>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Result</p>
            <p className="mt-1 text-sm text-gray-600">
              Required sample size: <strong>N = 128</strong> (64 per group)
            </p>
            <p className="mt-2 text-sm italic text-gray-600">
              A power analysis for an independent-samples t-test was conducted
              using an effect size of <em>d</em> = 0.50, &alpha; = .05, and
              power = .80. The required sample size is <em>N</em> = 128 (64 per
              group).
            </p>
          </div>
        </div>

        {/* When to Use */}
        <h3 className="text-xl font-semibold text-gray-900">
          When to Conduct a Power Analysis
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Before data collection:</strong> A priori power analysis is
            the most common and important use. It determines how many
            participants you need to recruit.
          </li>
          <li>
            <strong>Grant proposals:</strong> Funding agencies require
            justification of your planned sample size. A power analysis provides
            this justification.
          </li>
          <li>
            <strong>IRB applications:</strong> Ethical review boards want to
            ensure you are not recruiting more participants than necessary
            (wasting resources) or too few (making the study futile).
          </li>
          <li>
            <strong>Thesis/dissertation proposals:</strong> Most committees
            expect a formal power analysis in the methods section.
          </li>
        </ul>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes in Power Analysis
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using a large effect size to reduce N:</strong> Don&apos;t
            inflate the expected effect size just to get a smaller sample. Use
            realistic estimates from pilot data or published literature.
          </li>
          <li>
            <strong>Ignoring attrition:</strong> The calculated N is the minimum
            for analysis. If you expect 20% dropout, recruit 20% more than the
            calculated N.
          </li>
          <li>
            <strong>Post-hoc power analysis:</strong> Computing power after data
            collection using the observed effect size is circular and
            uninformative. Power analysis should be done a priori.
          </li>
          <li>
            <strong>Wrong test type:</strong> Make sure the power analysis
            matches the statistical test you plan to use. A power analysis for a
            t-test does not apply to an ANOVA.
          </li>
          <li>
            <strong>One-tailed vs. two-tailed:</strong> This calculator uses
            two-tailed tests by default. One-tailed tests require fewer
            participants but are only appropriate when the direction of the
            effect is known in advance.
          </li>
        </ul>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Power Analysis in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Include the power analysis in the Participants or Method section of
          your paper. State the test type, effect size, alpha level, desired
          power, and resulting sample size.
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">T-Test Example</p>
            <p className="mt-1 text-sm italic text-gray-600">
              An a priori power analysis for an independent-samples t-test was
              conducted using StatMate (Cohen&apos;s <em>d</em> = 0.50,
              &alpha; = .05, power = .80). The required minimum sample size was
              determined to be <em>N</em> = 128 (64 per group).
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">ANOVA Example</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A power analysis for a one-way ANOVA with 4 groups was conducted
              using Cohen&apos;s <em>f</em> = 0.25 (medium effect), &alpha; =
              .05, and power = .80. The minimum required sample size was
              <em>N</em> = 180 (45 per group).
            </p>
          </div>
        </div>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Method
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s sample size calculations use the standard normal
            approximation method with exact z-scores from the jStat library.
            For t-tests, the formula is <em>n</em> = (z<sub>&alpha;/2</sub> +
            z<sub>&beta;</sub>)<sup>2</sup> &times; 2 / <em>d</em><sup>2</sup>.
            Achieved power is computed by back-solving using the calculated
            sample size. Results have been validated against G*Power and R&apos;s
            pwr package.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/sample-size" />
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { OneSampleTCalculator } from "./calculator";
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
  const t = await getTranslations({ locale, namespace: "oneSampleT" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/one-sample-t" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "One-Sample T-Test Calculator - StatMate",
  description:
    "Free online one-sample t-test calculator with APA-formatted results. Compare a sample mean against a known or hypothesized population value.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "One-sample t-test",
    "Cohen's d effect size",
    "95% confidence interval",
    "APA 7th edition formatted results",
    "Descriptive statistics",
  ],
};

export default async function OneSampleTPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("oneSampleT");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "단일표본 t-검정이란?", answer: "단일표본 t-검정은 하나의 표본 평균이 알려진 모집단 값 또는 가설적 기준값과 통계적으로 유의미하게 다른지 검정하는 방법입니다. 예를 들어, 공장에서 생산된 제품의 무게가 목표 무게와 다른지 확인할 때 사용합니다. StatMate에서 APA 형식의 결과를 즉시 확인할 수 있습니다." },
        { question: "단일표본 t-검정은 언제 사용하나요?", answer: "하나의 연속형 변수 집단이 있고, 그 평균을 특정 기준값과 비교하고 싶을 때 사용합니다. 품질 관리(제품 무게가 기준치와 다른지), 임상연구(치료 후 수치가 목표값에 도달했는지), 교육(학급 평균이 전국 평균과 다른지) 등에서 흔히 활용됩니다." },
        { question: "단일표본 t-검정의 가정은?", answer: "단일표본 t-검정은 네 가지 가정이 필요합니다: (1) 연속형(구간/비율) 척도의 종속변수, (2) 관측치의 독립성, (3) 대략적인 정규분포(표본 30 이상이면 중심극한정리로 충분), (4) 심각한 이상치가 없을 것. 정규성이 의심되면 Wilcoxon 부호순위 검정을 고려하세요." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판 형식에 따라 t-통계량, 자유도, p-값, 효과크기(Cohen's d), 신뢰구간을 보고합니다. 예: '단일표본 t-검정 결과, 표본 평균(M = 81.20, SD = 8.75)은 검정값 80.00과 유의미한 차이가 없었다, t(9) = 0.43, p = .675, d = 0.14.' StatMate는 이 형식을 자동으로 생성해 줍니다." },
      ]
    : [
        { question: "What is a one-sample t-test?", answer: "A one-sample t-test determines whether the mean of a single sample differs significantly from a known or hypothesized population value. For example, you can test whether a factory's product weight deviates from the target specification. StatMate provides instant APA-formatted results for one-sample t-tests with effect sizes and confidence intervals." },
        { question: "When should I use a one-sample t-test?", answer: "Use a one-sample t-test when you have one group of continuous measurements and want to compare its mean to a specific reference value. Common applications include quality control (testing if product measurements meet standards), clinical research (checking if treatment outcomes reach target levels), and education (comparing class averages to national norms)." },
        { question: "What are the assumptions of a one-sample t-test?", answer: "The one-sample t-test requires four assumptions: (1) a continuous dependent variable, (2) independence of observations, (3) approximate normality (with n>30, the Central Limit Theorem ensures this), and (4) no significant outliers. If normality is violated with small samples, consider the Wilcoxon signed-rank test as a non-parametric alternative." },
        { question: "How do I report one-sample t-test results in APA format?", answer: "Report the t-statistic, degrees of freedom, p-value, Cohen's d effect size, and confidence interval following APA 7th edition guidelines. For example: 'A one-sample t-test indicated that the sample mean (M = 81.20, SD = 8.75) did not differ significantly from 80.00, t(9) = 0.43, p = .675, d = 0.14.' StatMate automatically generates this formatted output." },
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

      <OneSampleTCalculator />

      <AdUnit slot="one-sample-t-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is a One-Sample T-Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          A one-sample t-test is a parametric statistical test used to determine
          whether the mean of a single sample differs significantly from a known
          or hypothesized population value. Unlike the independent or paired
          samples t-test, which compare two groups against each other, the
          one-sample t-test compares one group against a fixed reference point.
          This makes it one of the simplest yet most powerful tools in
          inferential statistics, frequently used in quality control, clinical
          research, psychology, and education.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use a One-Sample T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use a one-sample t-test whenever you have a single group of continuous
          measurements and want to test whether the group&apos;s average is
          statistically different from a specific value. Common scenarios
          include:
        </p>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Quality control:</strong> A factory produces bolts that
            should weigh exactly 10 grams. You sample 30 bolts and test whether
            their mean weight differs from 10 g.
          </li>
          <li>
            <strong>Clinical research:</strong> A new drug is expected to lower
            blood pressure to a target of 120 mmHg. You measure 25 patients
            after treatment and test whether their mean differs from 120.
          </li>
          <li>
            <strong>Education:</strong> A class takes a standardized exam with a
            national average of 500. You test whether the class&apos;s mean score
            is significantly different from 500.
          </li>
          <li>
            <strong>Psychology:</strong> A scale is normed at a midpoint of 3.0.
            You survey a sample and test whether their mean attitude score
            deviates from 3.0.
          </li>
        </ul>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Testing a Class Average
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A teacher wants to know if her class of 10 students performed
            differently from the national average of 80 on a standardized math
            exam. She records the following scores:
          </p>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              Sample Data (n = 10)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              72, 85, 91, 68, 77, 83, 95, 88, 74, 79
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 81.20, <em>SD</em> = 8.75, Test Value = 80
            </p>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>t</em>(9) = 0.43, <em>p</em> = .675, <em>d</em> = 0.14,
              95% CI [-5.06, 7.46]
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The class mean did not differ significantly from the national
              average of 80. The effect size was negligible (Cohen&apos;s{" "}
              <em>d</em> = 0.14), suggesting no meaningful departure from the
              population benchmark.
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the One-Sample T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before interpreting your results, verify that these assumptions are
          reasonably met:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              1. Continuous Dependent Variable
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The variable being measured must be on an interval or ratio scale
              (e.g., weight, temperature, test score). Ordinal or categorical
              data require non-parametric alternatives such as the Wilcoxon
              signed-rank test.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              2. Independence of Observations
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Each data point must be independent of the others. This means no
              repeated measures on the same participant and no clustering. If
              your observations are correlated, consider a paired-samples t-test
              or mixed-effects model instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              3. Approximate Normality
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The data should be approximately normally distributed. For sample
              sizes above 30, the Central Limit Theorem ensures the sampling
              distribution of the mean is normal regardless of the population
              shape. For smaller samples, check normality using the Shapiro-Wilk
              test or a Q-Q plot. Moderate deviations are tolerable because the
              t-test is fairly robust.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              4. No Significant Outliers
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Extreme outliers can distort the sample mean and inflate or deflate
              the t-statistic. Use box plots or z-scores to screen for outliers
              before running the test. If outliers are present, consider
              trimming, winsorizing, or using a robust alternative.
            </p>
          </div>
        </div>

        {/* How to Report */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report One-Sample T-Test Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, report the sample
          descriptives, t-statistic, degrees of freedom, p-value, effect size,
          and confidence interval. Here is a template:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              APA Reporting Template
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A one-sample t-test was conducted to compare the sample mean
              (<em>M</em> = 81.20, <em>SD</em> = 8.75) to the test value of
              80.00. The result was not statistically significant,{" "}
              <em>t</em>(9) = 0.43, <em>p</em> = .675, <em>d</em> = 0.14,
              95% CI [-5.06, 7.46].
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Significant Result Example
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A one-sample t-test indicated that participants&apos; reaction
              times (<em>M</em> = 342.50, <em>SD</em> = 28.10) were
              significantly faster than the population norm of 375 ms,{" "}
              <em>t</em>(39) = -7.31, <em>p</em> &lt; .001, <em>d</em> = 1.16,
              95% CI [-41.49, -23.51].
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report <em>t</em>-values to two decimal places, <em>p</em>
          -values to three decimal places (use <em>p</em> &lt; .001 when below
          .001), and always include a measure of effect size such as
          Cohen&apos;s <em>d</em>.
        </p>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding Cohen&apos;s d for One-Sample Tests
        </h3>
        <p className="text-gray-600 leading-relaxed">
          In a one-sample t-test, Cohen&apos;s <em>d</em> is calculated as the
          absolute difference between the sample mean and the test value,
          divided by the sample standard deviation. It quantifies how many
          standard deviations the sample mean lies from the hypothesized value,
          making it independent of sample size.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">
                  Cohen&apos;s <em>d</em>
                </th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
                <th className="py-2 text-left font-semibold">
                  Practical Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">&lt; 0.2</td>
                <td className="py-2">Negligible</td>
                <td className="py-2 text-gray-500">
                  Sample mean is very close to the test value
                </td>
              </tr>
              <tr>
                <td className="py-2">0.2</td>
                <td className="py-2">Small</td>
                <td className="py-2 text-gray-500">
                  Difference detectable only with precise measurement
                </td>
              </tr>
              <tr>
                <td className="py-2">0.5</td>
                <td className="py-2">Medium</td>
                <td className="py-2 text-gray-500">
                  Noticeable difference in practical terms
                </td>
              </tr>
              <tr>
                <td className="py-2">0.8+</td>
                <td className="py-2">Large</td>
                <td className="py-2 text-gray-500">
                  Substantial departure from the test value
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* When to Use Alternatives */}
        <h3 className="text-xl font-semibold text-gray-900">
          One-Sample T-Test vs. Other Tests
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Situation</th>
                <th className="py-2 text-left font-semibold">
                  Recommended Test
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">
                  Compare one sample mean to a known value
                </td>
                <td className="py-2 font-medium">One-sample t-test</td>
              </tr>
              <tr>
                <td className="py-2">Compare means from two independent groups</td>
                <td className="py-2">Independent samples t-test</td>
              </tr>
              <tr>
                <td className="py-2">Compare pre/post means (same subjects)</td>
                <td className="py-2">Paired samples t-test</td>
              </tr>
              <tr>
                <td className="py-2">Non-normal data, one sample vs. value</td>
                <td className="py-2">Wilcoxon signed-rank test</td>
              </tr>
              <tr>
                <td className="py-2">Compare proportions to a known value</td>
                <td className="py-2">One-sample z-test for proportions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Choosing the wrong test value:</strong> The test value
            (population mean) should come from theory, prior research, or a
            known standard -- not from the same data set you are testing.
          </li>
          <li>
            <strong>Ignoring non-normality in small samples:</strong> With fewer
            than 30 observations, skewed or heavy-tailed distributions can lead
            to incorrect p-values. Always check normality for small samples.
          </li>
          <li>
            <strong>Reporting <em>p</em> = .000:</strong> Statistical software
            sometimes displays p = .000. Report this as <em>p</em> &lt; .001
            because a p-value is never exactly zero.
          </li>
          <li>
            <strong>Ignoring effect size:</strong> A statistically significant
            result does not mean the difference is practically important.
            Always report and interpret Cohen&apos;s <em>d</em> alongside the
            p-value.
          </li>
          <li>
            <strong>Treating a non-significant result as proof of equality:</strong>{" "}
            Failing to reject the null hypothesis does not prove the sample
            mean equals the test value. It only indicates insufficient evidence
            of a difference at the chosen alpha level.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s one-sample t-test calculations have been validated
            against R (t.test function) and SPSS output. We use the jstat
            library for the Student&apos;s t probability distribution and
            compute degrees of freedom as <em>n</em> - 1. The 95% confidence
            interval is constructed around the mean difference using the
            critical t-value for the appropriate df. All results match R output
            to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/one-sample-t" />
    </div>
  );
}

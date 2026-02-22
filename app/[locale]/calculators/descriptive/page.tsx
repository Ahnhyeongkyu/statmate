import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DescriptiveCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { SeoContentKo } from "./seo-ko";
import { FaqSchema } from "@/components/faq-schema";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "descriptive" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/calculators/descriptive",
      languages: {
        en: "/calculators/descriptive",
        ko: "/ko/calculators/descriptive",
        ja: "/ja/calculators/descriptive",
        "x-default": "/calculators/descriptive",
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Descriptive Statistics Calculator - StatMate",
  description:
    "Free online descriptive statistics calculator. Mean, median, SD, skewness, kurtosis, quartiles, and 95% CI.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Mean, median, mode",
    "Standard deviation and variance",
    "Skewness and kurtosis",
    "Quartiles and IQR",
    "95% confidence interval",
  ],
};

export default async function DescriptivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("descriptive");
  const isKo = locale === "ko";
  const faqs = isKo
    ? [
        { question: "기술통계란 무엇인가요?", answer: "데이터의 특성을 요약하고 설명하는 통계 방법입니다. 평균, 중앙값, 표준편차 등의 지표를 통해 데이터의 중심경향, 산포도, 분포 형태를 파악합니다." },
        { question: "평균과 중앙값 중 무엇을 보고해야 하나요?", answer: "데이터가 정규분포에 가까우면 평균을, 극단값이나 편향된 분포가 있으면 중앙값을 사용하세요. 논문에서는 보통 둘 다 보고합니다." },
        { question: "표준편차와 표준오차의 차이는 무엇인가요?", answer: "표준편차(SD)는 데이터의 산포도를 나타냅니다. 표준오차(SE)는 표본 평균의 정밀도를 나타내며, SE = SD / √n으로 계산됩니다. 논문에서 기술통계에는 SD를, 추론통계에는 SE를 사용합니다." },
        { question: "왜도와 첨도는 어떻게 해석하나요?", answer: "왜도(skewness)는 분포의 비대칭성을 측정합니다. 0이면 대칭, 양수면 오른쪽 꼬리, 음수면 왼쪽 꼬리입니다. 첨도(kurtosis)는 분포의 뾰족한 정도를 측정합니다. 절대값이 2를 넘으면 정규성에 의문이 생깁니다." },
      ]
    : [
        { question: "What are descriptive statistics?", answer: "Descriptive statistics summarize and describe the characteristics of a dataset. They include measures of central tendency (mean, median), variability (standard deviation, range), and distribution shape (skewness, kurtosis)." },
        { question: "Should I report the mean or median?", answer: "Report the mean for approximately normal distributions. Use the median when data has extreme outliers or is skewed. In academic papers, both are typically reported." },
        { question: "What's the difference between standard deviation and standard error?", answer: "Standard deviation (SD) measures data spread. Standard error (SE) measures precision of the sample mean, calculated as SE = SD / √n. Use SD for descriptive statistics and SE for inferential statistics." },
        { question: "How do I interpret skewness and kurtosis?", answer: "Skewness measures distribution asymmetry: 0 is symmetric, positive means right-tailed, negative means left-tailed. Kurtosis measures peakedness. Absolute values above 2 suggest non-normality." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="descriptive" calculatorName="Descriptive Statistics" />
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

      <DescriptiveCalculator />

      <AdUnit slot="descriptive-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What are Descriptive Statistics?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Descriptive statistics summarize and organize the characteristics of a
          dataset, providing simple yet powerful summaries about the sample and
          its measures. They form the foundation of virtually every quantitative
          analysis in social science, psychology, medicine, education, and
          business research. Before running any inferential test such as a
          t-test, ANOVA, or regression, researchers must first describe their
          data to understand its central tendency, variability, and
          distributional shape.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Descriptive statistics serve three critical purposes in research:
          (1) they help detect data entry errors and outliers before analysis,
          (2) they verify whether the assumptions required by inferential tests
          are met (e.g., normality), and (3) they communicate the basic
          properties of your data to readers. The APA Publication Manual (7th
          edition) requires researchers to report descriptive statistics for all
          primary study variables, making them an indispensable part of any
          results section.
        </p>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Exam Scores Dataset
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A professor collected final exam scores from 20 students in an
            introductory psychology course. The goal is to describe the
            distribution of scores before comparing them with another section.
          </p>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              Raw Data (n = 20)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              62, 65, 68, 70, 72, 73, 75, 76, 77, 78, 78, 79, 80, 81, 82, 83,
              85, 88, 90, 92
            </p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Central Tendency
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <em>M</em> = 76.50
              </p>
              <p className="text-sm text-gray-600">
                <em>Mdn</em> = 77.00
              </p>
              <p className="text-sm text-gray-600">
                <em>Mode</em> = 78
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Variability
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <em>SD</em> = 8.23
              </p>
              <p className="text-sm text-gray-600">
                Variance = 67.74
              </p>
              <p className="text-sm text-gray-600">
                Range = 30 (62&ndash;92)
              </p>
              <p className="text-sm text-gray-600">
                IQR = 11.25
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Distribution Shape
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Skewness = &minus;0.34
              </p>
              <p className="text-sm text-gray-600">
                Kurtosis = &minus;0.67
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Approximately normal distribution with a slight negative skew
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              95% Confidence Interval for the Mean
            </p>
            <p className="mt-1 text-sm text-gray-600">
              95% CI [72.65, 80.35]
            </p>
            <p className="mt-2 text-sm text-gray-500">
              We are 95% confident that the true population mean exam score
              falls between 72.65 and 80.35.
            </p>
          </div>
        </div>

        {/* Central Tendency */}
        <h3 className="text-xl font-semibold text-gray-900">
          Measures of Central Tendency: Mean vs. Median vs. Mode
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Central tendency describes the &quot;typical&quot; value in a dataset.
          The three main measures each have distinct strengths, and choosing the
          right one depends on your data&apos;s distribution and measurement
          scale.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Measure</th>
                <th className="py-2 text-left font-semibold">Definition</th>
                <th className="py-2 text-left font-semibold">Best Used When</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">Mean (<em>M</em>)</td>
                <td className="py-2">Sum of all values divided by <em>n</em></td>
                <td className="py-2 text-gray-500">
                  Data are approximately symmetric (normal) with no extreme
                  outliers
                </td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Median (<em>Mdn</em>)</td>
                <td className="py-2">Middle value when data are sorted</td>
                <td className="py-2 text-gray-500">
                  Data are skewed or contain outliers (e.g., income, reaction
                  time)
                </td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Mode</td>
                <td className="py-2">Most frequently occurring value</td>
                <td className="py-2 text-gray-500">
                  Nominal or categorical data, or to identify peaks in a
                  distribution
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-md border-l-4 border-amber-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            Guidance for Skewed Data
          </p>
          <p className="mt-1 text-sm text-gray-600">
            When data are positively skewed (right tail), the mean is pulled
            higher than the median &mdash; report the <strong>median</strong> as
            your primary measure. When data are negatively skewed (left tail),
            the mean is pulled lower than the median. A practical rule: if the
            mean and median differ by more than 10% of the standard deviation,
            consider reporting the median instead of the mean, and pair it with
            the IQR rather than the SD.
          </p>
        </div>

        {/* Variability */}
        <h3 className="text-xl font-semibold text-gray-900">
          Measures of Variability
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Variability (or dispersion) describes how spread out the data points
          are around the center. Two datasets can have the same mean but vastly
          different variability, so reporting spread is just as important as
          reporting the center.
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              Standard Deviation (SD)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The average distance of each data point from the mean, expressed in
              the original units of measurement. An <em>SD</em> of 8.23 points
              on an exam means scores typically fall about 8 points above or
              below the mean. This is the most commonly reported measure of
              spread in APA-style research.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">Variance (SD&sup2;)</p>
            <p className="mt-1 text-sm text-gray-600">
              The squared standard deviation. While variance is essential in
              calculations (e.g., ANOVA partitions variance), it is harder to
              interpret directly because its units are squared. A variance of
              67.74 means little on its own, but its square root (SD = 8.23) is
              meaningful.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">Range</p>
            <p className="mt-1 text-sm text-gray-600">
              The difference between the maximum and minimum values (92 &minus;
              62 = 30). The range is easy to compute but highly sensitive to
              outliers &mdash; a single extreme value can dramatically inflate
              it.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              Interquartile Range (IQR)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The range of the middle 50% of values (Q3 &minus; Q1). The IQR is
              robust to outliers and is the preferred spread measure when
              reporting the median. In our example, IQR = 11.25, meaning the
              central half of exam scores spans about 11 points.
            </p>
          </div>
        </div>

        {/* Skewness and Kurtosis */}
        <h3 className="text-xl font-semibold text-gray-900">
          Skewness and Kurtosis: Interpreting Distribution Shape
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Skewness and kurtosis quantify the shape of a distribution and are
          critical for checking the normality assumption required by many
          parametric tests (t-tests, ANOVA, regression). Understanding these
          measures helps you decide whether to use parametric or non-parametric
          methods.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Measure</th>
                <th className="py-2 text-left font-semibold">Value</th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium" rowSpan={3}>
                  Skewness
                </td>
                <td className="py-2">&asymp; 0</td>
                <td className="py-2 text-gray-500">
                  Symmetric distribution (normal)
                </td>
              </tr>
              <tr>
                <td className="py-2">&gt; 0 (positive)</td>
                <td className="py-2 text-gray-500">
                  Right tail is longer; most values cluster on the left (e.g.,
                  income data)
                </td>
              </tr>
              <tr>
                <td className="py-2">&lt; 0 (negative)</td>
                <td className="py-2 text-gray-500">
                  Left tail is longer; most values cluster on the right (e.g.,
                  easy exam scores)
                </td>
              </tr>
              <tr>
                <td className="py-2 font-medium" rowSpan={3}>
                  Kurtosis (excess)
                </td>
                <td className="py-2">&asymp; 0</td>
                <td className="py-2 text-gray-500">
                  Mesokurtic &mdash; tails similar to a normal distribution
                </td>
              </tr>
              <tr>
                <td className="py-2">&gt; 0 (positive)</td>
                <td className="py-2 text-gray-500">
                  Leptokurtic &mdash; heavier tails, more outliers than normal
                </td>
              </tr>
              <tr>
                <td className="py-2">&lt; 0 (negative)</td>
                <td className="py-2 text-gray-500">
                  Platykurtic &mdash; lighter tails, fewer outliers than normal
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            Normality Rule of Thumb
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Skewness and kurtosis values between <strong>&minus;2 and +2</strong>{" "}
            are generally considered acceptable for assuming normality (George
            &amp; Mallery, 2019). Some stricter criteria use &minus;1 to +1. In
            our example, skewness = &minus;0.34 and kurtosis = &minus;0.67, both
            well within the acceptable range, confirming the distribution is
            approximately normal.
          </p>
        </div>

        {/* 95% CI */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding the 95% Confidence Interval
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The 95% confidence interval (CI) for the mean provides a range of
          plausible values for the true population mean. In our example, the 95%
          CI [72.65, 80.35] means that if we were to repeat this study many
          times and compute a CI each time, approximately 95% of those intervals
          would contain the true population mean.
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              What the CI <em>does</em> mean
            </p>
            <p className="mt-1 text-sm text-gray-600">
              We have 95% confidence that the procedure used to construct this
              interval captures the true population mean. The width of the
              interval (80.35 &minus; 72.65 = 7.70) reflects the precision of
              our estimate &mdash; narrower intervals indicate more precise
              estimates.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-red-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              What the CI does <em>not</em> mean
            </p>
            <p className="mt-1 text-sm text-gray-600">
              It does <strong>not</strong> mean there is a 95% probability that
              the population mean lies within this specific interval. The
              population mean is a fixed value &mdash; it either is or is not in
              this interval. The 95% refers to the long-run frequency of the
              method, not the probability for any single interval.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          The CI width depends on three factors: sample size (larger <em>n</em>{" "}
          = narrower CI), variability (smaller <em>SD</em> = narrower CI), and
          confidence level (99% CI is wider than 95% CI). To halve the width,
          you need to quadruple the sample size.
        </p>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Descriptive Statistics in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The APA 7th edition requires descriptive statistics for all primary
          variables, typically presented in a table or in-text. Here are
          templates using the worked example above:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              In-Text Reporting (Normal Distribution)
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              Exam scores were approximately normally distributed (skewness =
              &minus;0.34, kurtosis = &minus;0.67). Students scored an average
              of 76.50 points (<em>SD</em> = 8.23), with a 95% CI [72.65,
              80.35].
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              In-Text Reporting (Skewed Distribution)
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              Response times were positively skewed (skewness = 1.42); therefore,
              the median is reported. The median response time was 340 ms
              (<em>Mdn</em> = 340, IQR = 120).
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              APA Table Format Template
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-t-2 border-gray-900">
                    <th className="py-1.5 text-left font-semibold">Variable</th>
                    <th className="py-1.5 text-left font-semibold"><em>n</em></th>
                    <th className="py-1.5 text-left font-semibold"><em>M</em></th>
                    <th className="py-1.5 text-left font-semibold"><em>SD</em></th>
                    <th className="py-1.5 text-left font-semibold"><em>Mdn</em></th>
                    <th className="py-1.5 text-left font-semibold">Skewness</th>
                    <th className="py-1.5 text-left font-semibold">Kurtosis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-gray-900">
                    <td className="py-1.5">Exam scores</td>
                    <td className="py-1.5">20</td>
                    <td className="py-1.5">76.50</td>
                    <td className="py-1.5">8.23</td>
                    <td className="py-1.5">77.00</td>
                    <td className="py-1.5">&minus;0.34</td>
                    <td className="py-1.5">&minus;0.67</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report all descriptive statistics to two decimal places. Use
          italics for statistical symbols (<em>M</em>, <em>SD</em>,{" "}
          <em>Mdn</em>). When data are non-normal, report median and IQR
          instead of mean and SD. Always report sample size (<em>n</em> or{" "}
          <em>N</em>) alongside descriptive statistics.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Reporting the mean for skewed data:</strong> When data are
            substantially skewed (|skewness| &gt; 1), the mean is a misleading
            measure of center. Report the <strong>median</strong> instead, along
            with the IQR. For example, reporting &quot;average household income&quot;
            can be twice the typical income due to extreme values.
          </li>
          <li>
            <strong>Confusing SD with SE:</strong> Standard deviation (SD)
            describes the spread of individual data points, while standard error
            (SE = SD / &radic;n) describes the precision of the sample mean.
            Report SD when describing your sample; report SE (or the CI) when
            making inferences about the population.
          </li>
          <li>
            <strong>Ignoring distribution shape before inferential tests:</strong>{" "}
            Running a t-test or ANOVA without first checking skewness, kurtosis,
            and normality can lead to invalid results. Always examine descriptive
            statistics and visualize your data before choosing a test.
          </li>
          <li>
            <strong>Reporting too few decimal places:</strong> APA guidelines
            recommend two decimal places for means and standard deviations. One
            decimal place reduces precision; more than two can imply false
            precision.
          </li>
          <li>
            <strong>Omitting sample size and confidence intervals:</strong>{" "}
            Descriptive statistics without <em>n</em> and CIs are incomplete.
            Readers need the sample size to judge reliability and the CI to
            understand the range of plausible population values.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s descriptive statistics calculations have been
            validated against R&apos;s <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs">psych::describe()</code>{" "}
            function and SPSS Descriptives output. All measures &mdash;
            including mean, SD, skewness (type 2 / sample), kurtosis (excess,
            type 2), quartiles, and confidence intervals &mdash; match R and
            SPSS output to at least 4 decimal places. The calculator uses
            the sample standard deviation formula (dividing by <em>n</em> &minus; 1)
            and the adjusted Fisher-Pearson coefficient for skewness and
            kurtosis, consistent with standard statistical software defaults.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/descriptive" />
    </div>
  );
}

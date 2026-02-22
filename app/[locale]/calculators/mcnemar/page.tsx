import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { McNemarCalculator } from "./calculator";
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
  const t = await getTranslations({ locale, namespace: "mcnemar" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/calculators/mcnemar",
      languages: {
        en: "/calculators/mcnemar",
        ko: "/ko/calculators/mcnemar",
        ja: "/ja/calculators/mcnemar",
        "x-default": "/calculators/mcnemar",
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "McNemar Test Calculator - StatMate",
  description:
    "Free online McNemar test calculator for paired binary data. Compare before and after conditions with exact and asymptotic p-values, odds ratio, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "McNemar's chi-square with continuity correction",
    "Exact binomial test for small samples",
    "Odds ratio with 95% confidence interval",
    "Discordant pair analysis",
    "APA 7th edition formatted results",
  ],
};

export default async function McNemarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("mcnemar");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "McNemar 검정은 언제 사용하나요?", answer: "동일한 대상에서 사전-사후(Before-After) 이진 결과를 비교할 때 사용합니다. 예를 들어, 교육 프로그램 전후로 시험 합격률을 비교하거나, 치료 전후로 증상 유무를 비교할 때 적합합니다. 핵심은 데이터가 대응(paired)되어야 하고 결과가 이진(binary)이어야 합니다." },
        { question: "McNemar 검정과 카이제곱 검정의 차이는?", answer: "카이제곱 검정은 독립 표본의 범주형 데이터를 비교하지만, McNemar 검정은 대응 표본(같은 대상의 전후 비교)을 위한 검정입니다. McNemar 검정은 불일치 쌍(discordant pairs)인 b와 c만을 분석합니다." },
        { question: "연속성 보정이란 무엇인가요?", answer: "McNemar 검정의 카이제곱 통계량에 적용되는 보정으로, 이산형 이항분포를 연속형 카이제곱 분포로 근사할 때 발생하는 오차를 줄여줍니다. 공식은 chi-sq = (|b-c| - 1)^2 / (b+c)입니다. 불일치 쌍이 25 미만일 때는 정확 이항 검정이 더 적절합니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "근사 검정: 'McNemar 검정 결과, chi-sq(1) = X.XX, p = .XXX로 나타났다.' 정확 검정(소표본): 'McNemar 정확 검정 결과, p = .XXX로 나타났다.' 오즈비와 신뢰구간도 함께 보고하면 좋습니다. StatMate가 이 형식을 자동으로 생성합니다." },
      ]
    : [
        { question: "When should I use the McNemar test?", answer: "Use the McNemar test when comparing binary outcomes from the same subjects before and after an intervention. For example, comparing pass/fail rates before and after a training program, or symptom presence before and after treatment. The key requirements are paired (matched) data and binary outcomes." },
        { question: "What is the difference between McNemar and chi-square?", answer: "The chi-square test compares categorical data from independent samples, while the McNemar test is designed for paired samples (same subjects measured twice). The McNemar test analyzes only the discordant pairs (b and c), ignoring concordant pairs." },
        { question: "What is the continuity correction?", answer: "The continuity correction adjusts the McNemar chi-square statistic to reduce error when approximating the discrete binomial distribution with the continuous chi-square distribution. The formula is chi-sq = (|b-c| - 1)^2 / (b+c). When discordant pairs are below 25, the exact binomial test is more appropriate." },
        { question: "How do I report McNemar results in APA format?", answer: "For asymptotic: 'McNemar's test, chi-sq(1) = X.XX, p = .XXX.' For exact (small samples): 'McNemar's exact test, p = .XXX.' Include the odds ratio and confidence interval when possible. StatMate generates this format automatically." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="mcnemar" calculatorName="McNemar Test" />
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

      <McNemarCalculator />

      <AdUnit slot="mcnemar-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is the McNemar Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The McNemar test is a non-parametric statistical test used to analyze
          paired binary data&mdash;situations where the same subjects are
          measured twice on a dichotomous outcome. Developed by Quinn McNemar
          in 1947, it determines whether the proportion of subjects who changed
          from one category to another is significantly different from what
          would be expected by chance. It is essentially a test of symmetry in
          a 2&times;2 contingency table for matched pairs.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use the McNemar Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use the McNemar test when you have paired or matched binary data.
          Common scenarios include: comparing a diagnostic test result before
          and after treatment, evaluating whether a training program changes
          pass/fail rates, testing if an intervention changes behavior
          (yes/no), or comparing two diagnostic methods applied to the same
          patients. The test focuses exclusively on the discordant
          pairs&mdash;subjects who changed their response between the two
          measurements.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          McNemar Test vs. Chi-Square vs. Cochran&apos;s Q
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">McNemar</th>
                <th className="py-2 text-left font-semibold">Chi-Square</th>
                <th className="py-2 text-left font-semibold">Cochran&apos;s Q</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Data type</td>
                <td className="py-2">Paired binary</td>
                <td className="py-2">Independent categorical</td>
                <td className="py-2">Paired binary (&ge;3 timepoints)</td>
              </tr>
              <tr>
                <td className="py-2">Samples</td>
                <td className="py-2 font-medium">Matched pairs</td>
                <td className="py-2">Independent</td>
                <td className="py-2 font-medium">Matched (3+ measures)</td>
              </tr>
              <tr>
                <td className="py-2">Groups compared</td>
                <td className="py-2">2 (before/after)</td>
                <td className="py-2">2 or more</td>
                <td className="py-2">3 or more</td>
              </tr>
              <tr>
                <td className="py-2">Focuses on</td>
                <td className="py-2">Discordant pairs</td>
                <td className="py-2">All cells</td>
                <td className="py-2">Changes across conditions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: McNemar Test
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher tests whether a training program changes employee
            certification pass rates. 100 employees take the certification
            exam before and after training.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"></th>
                  <th className="py-2 text-center font-semibold">After: Pass</th>
                  <th className="py-2 text-center font-semibold">After: Fail</th>
                  <th className="py-2 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 font-medium">Before: Pass</td>
                  <td className="py-2 text-center">40</td>
                  <td className="py-2 text-center">12</td>
                  <td className="py-2 text-center font-medium">52</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Before: Fail</td>
                  <td className="py-2 text-center">5</td>
                  <td className="py-2 text-center">43</td>
                  <td className="py-2 text-center font-medium">48</td>
                </tr>
                <tr className="border-t-2 border-gray-900">
                  <td className="py-2 font-semibold">Total</td>
                  <td className="py-2 text-center font-medium">45</td>
                  <td className="py-2 text-center font-medium">55</td>
                  <td className="py-2 text-center font-semibold">100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            The discordant pairs are b = 12 (passed before, failed after) and
            c = 5 (failed before, passed after). Since b + c = 17 &lt; 25,
            the exact binomial test is used.
          </p>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              McNemar&apos;s exact test, <em>p</em> = .143
            </p>
            <p className="mt-2 text-sm text-gray-600">
              There was no statistically significant change in pass rates after
              the training program. While 5 employees improved and 12
              worsened, this difference was not significant at the .05 level.
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the McNemar Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The McNemar test requires the following assumptions to be met:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Paired/Matched Binary Data</p>
            <p className="mt-1 text-sm text-gray-600">
              Each subject must be measured twice (e.g., before and after), and
              the outcome must be binary (e.g., yes/no, pass/fail, positive/
              negative). The data form a 2&times;2 table of matched pairs.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Mutually Exclusive Categories</p>
            <p className="mt-1 text-sm text-gray-600">
              Each subject must fall into exactly one of the four cells of the
              2&times;2 table. The categories must be exhaustive and mutually
              exclusive at each time point.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Random Sampling</p>
            <p className="mt-1 text-sm text-gray-600">
              Subjects should be randomly selected from the population of
              interest, or randomly assigned to conditions. The matched pairs
              should be independent of each other (one pair&apos;s outcome
              should not influence another pair&apos;s outcome).
            </p>
          </div>
        </div>

        {/* Continuity Correction */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding the Continuity Correction
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The standard McNemar test uses a chi-square statistic with one degree
          of freedom. Because the binomial distribution (which underlies the
          test) is discrete, a continuity correction of 1 is applied:
          &chi;&sup2; = (|b &minus; c| &minus; 1)&sup2; / (b + c). This
          correction makes the chi-square approximation more accurate for
          moderate sample sizes. For small samples (discordant pairs &lt; 25),
          StatMate automatically uses the exact binomial test instead, which
          does not require any approximation.
        </p>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report McNemar Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Report the test statistic, degrees of freedom, and p-value. If the
          exact test was used, note this in the report:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Asymptotic Test Template</p>
            <p className="mt-1 text-sm italic text-gray-600">
              McNemar&apos;s test indicated [a significant/no significant]
              change in [outcome] from [time 1] to [time 2], &chi;&sup2;(1) ={" "}
              X.XX, <em>p</em> = .XXX.
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Exact Test Template</p>
            <p className="mt-1 text-sm italic text-gray-600">
              McNemar&apos;s exact test indicated [a significant/no
              significant] change in [outcome] from [time 1] to [time 2],{" "}
              <em>p</em> = .XXX.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Use the exact test when the total number of discordant pairs
          (b + c) is less than 25. Report <em>p</em>-values to three decimal
          places, using <em>p</em> &lt; .001 when below that threshold.
          Include descriptive statistics about the discordant pairs.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using chi-square for paired data:</strong> The standard
            chi-square test assumes independent observations. When the same
            subjects are measured twice, McNemar&apos;s test must be used
            instead because the data are dependent.
          </li>
          <li>
            <strong>Ignoring small-sample requirements:</strong> When the
            total number of discordant pairs is less than 25, the chi-square
            approximation may be unreliable. Use the exact binomial test
            instead, which StatMate selects automatically.
          </li>
          <li>
            <strong>Misinterpreting the table layout:</strong> The rows
            represent the &quot;before&quot; condition and columns the
            &quot;after&quot; condition. The discordant cells (b and c) are
            what the test analyzes. Concordant cells (a and d) do not affect
            the test result.
          </li>
          <li>
            <strong>Applying to non-binary outcomes:</strong> McNemar&apos;s
            test is for binary outcomes only. For ordinal paired data, use the
            Wilcoxon signed-rank test. For three or more related binary
            measurements, use Cochran&apos;s Q test.
          </li>
          <li>
            <strong>Forgetting the continuity correction:</strong> The
            uncorrected McNemar statistic (b &minus; c)&sup2; / (b + c) tends
            to overestimate significance. Always use the corrected version
            (|b &minus; c| &minus; 1)&sup2; / (b + c) for more accurate
            results.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s McNemar test calculations have been validated
            against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1 py-0.5 text-xs">mcnemar.test()</code>{" "}
            function and SPSS output. The implementation uses the continuity-
            corrected chi-square statistic and the jstat library for
            probability distributions. For small samples (discordant pairs
            &lt; 25), the exact two-tailed binomial test is used. All results
            match R output to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/mcnemar" />
    </div>
  );
}

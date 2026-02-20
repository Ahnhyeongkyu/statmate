import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { WilcoxonCalculator } from "./calculator";
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
  const t = await getTranslations({ locale, namespace: "wilcoxon" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/wilcoxon" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Wilcoxon Signed-Rank Test Calculator - StatMate",
  description:
    "Free online Wilcoxon signed-rank test calculator with APA-formatted results. Non-parametric alternative to the paired t-test.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Wilcoxon signed-rank test",
    "Rank-biserial correlation effect size",
    "Normal approximation with continuity correction",
    "Median comparison",
    "APA 7th edition formatted results",
  ],
};

export default async function WilcoxonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("wilcoxon");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "Wilcoxon 부호순위 검정이란?", answer: "Wilcoxon 부호순위 검정은 두 관련 표본(대응표본 또는 반복측정)의 분포를 비교하는 비모수 통계 검정입니다. 대응표본 t-검정의 비모수 대안으로, 데이터가 정규분포를 따르지 않거나 서열 척도일 때 사용합니다. StatMate에서 W 통계량, z 점수, 효과크기를 APA 형식으로 즉시 확인할 수 있습니다." },
        { question: "대응표본 t-검정 대신 Wilcoxon을 언제 사용하나요?", answer: "대응(짝) 데이터에서 차이값의 정규성이 의심될 때, 데이터가 서열 척도(예: 리커트 척도)일 때, 표본 크기가 작아 정규성 검증이 어려울 때, 또는 이상치에 덜 민감한 분석이 필요할 때 Wilcoxon 부호순위 검정을 사용합니다. 정규성이 확실하면 대응표본 t-검정이 약간 더 검정력이 높습니다." },
        { question: "Wilcoxon 검정의 가정은?", answer: "Wilcoxon 부호순위 검정은 네 가지 가정이 필요합니다: (1) 대응 관측치(사전-사후 또는 짝짓기 설계), (2) 서열 이상의 측정 척도, (3) 차이값 분포의 대칭성(정규성보다 약한 가정), (4) 쌍 간의 독립성. 차이값이 심하게 비대칭이면 부호검정(sign test)을 고려하세요." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에 따라 W 통계량, z 근사값, p-값, 효과크기(순위이연상관 r), 각 조건의 중앙값을 보고합니다. 예: 'Wilcoxon 부호순위 검정 결과, 사후 점수(Mdn = 85.00)가 사전 점수(Mdn = 81.00)보다 유의미하게 높았다, W = 0.0, z = -2.80, p = .005, r = 1.00.' StatMate가 이 형식을 자동으로 생성합니다." },
      ]
    : [
        { question: "What is the Wilcoxon signed-rank test?", answer: "The Wilcoxon signed-rank test is a non-parametric test that compares two related samples (paired or repeated measurements). It serves as the non-parametric alternative to the paired samples t-test, working with ranks of differences rather than raw values. StatMate calculates the W statistic, z-score, and rank-biserial effect size with instant APA-formatted results." },
        { question: "When should I use Wilcoxon instead of paired t-test?", answer: "Use the Wilcoxon signed-rank test when your paired data violate the normality assumption, when data are measured on an ordinal scale (e.g., Likert items), when sample sizes are too small to verify normality, or when you need an analysis that is robust to outliers. If normality clearly holds, the paired t-test is slightly more powerful." },
        { question: "What are the assumptions of the Wilcoxon test?", answer: "The Wilcoxon signed-rank test requires four assumptions: (1) paired observations from repeated measures or matched designs, (2) ordinal or continuous measurement scale, (3) approximately symmetric distribution of differences (weaker than normality), and (4) independence between pairs. If the differences are highly skewed, consider using the sign test instead." },
        { question: "How do I report Wilcoxon results in APA format?", answer: "Report the W statistic, z-approximation, p-value, rank-biserial effect size (r), and medians for each condition following APA 7th edition. For example: 'A Wilcoxon signed-rank test indicated that post-test scores (Mdn = 85.00) were significantly higher than pre-test scores (Mdn = 81.00), W = 0.0, z = -2.80, p = .005, r = 1.00.' StatMate generates this format automatically." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="wilcoxon" calculatorName="Wilcoxon Test" />
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

      <WilcoxonCalculator />

      <AdUnit slot="wilcoxon-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is the Wilcoxon Signed-Rank Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The Wilcoxon signed-rank test is a non-parametric statistical test used
          to compare two related samples, matched samples, or repeated
          measurements on a single sample. Developed by Frank Wilcoxon in 1945,
          it serves as the non-parametric alternative to the paired samples
          t-test. Instead of comparing means (which requires normally distributed
          data), the Wilcoxon test works with the ranks of the differences
          between paired observations, making it appropriate when your data
          violate normality assumptions or when you are working with ordinal
          data.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use the Wilcoxon Signed-Rank Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use this test when you have paired or repeated-measures data and cannot
          assume normality. Common scenarios include pre-test/post-test designs
          where scores are not normally distributed, Likert scale data from
          surveys (ordinal data), small sample sizes where normality is difficult
          to verify, and any before/after study where you want a more robust
          analysis that is less sensitive to outliers.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Wilcoxon Signed-Rank Test vs. Paired T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The key difference between these two tests lies in their assumptions.
          The paired t-test assumes that the differences between pairs are
          normally distributed, while the Wilcoxon signed-rank test only assumes
          that the distribution of differences is symmetric. This makes the
          Wilcoxon test more versatile, though when normality holds, the paired
          t-test is slightly more powerful (i.e., better at detecting real
          differences). As a rule of thumb: if your data are clearly normal, use
          the paired t-test; if there is any doubt about normality or your data
          are ordinal, use the Wilcoxon test.
        </p>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Pre/Post Treatment Comparison
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A therapist measures anxiety scores (on a 1&ndash;100 scale) for 10
            patients before and after a 6-week treatment program. Because the
            sample is small and the distribution is unknown, the Wilcoxon
            signed-rank test is chosen over the paired t-test.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Pre-Treatment (n=10)</p>
              <p className="mt-1 text-sm text-gray-500">72, 85, 91, 68, 77, 83, 95, 88, 74, 79</p>
              <p className="mt-2 text-sm text-gray-600"><em>Mdn</em> = 81.00</p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Post-Treatment (n=10)</p>
              <p className="mt-1 text-sm text-gray-500">78, 89, 95, 73, 82, 87, 98, 92, 79, 83</p>
              <p className="mt-2 text-sm text-gray-600"><em>Mdn</em> = 85.00</p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>W</em> = 0.0, <em>z</em> = &minus;2.80, <em>p</em> = .005,
              rank-biserial <em>r</em> = 1.00
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The Wilcoxon signed-rank test indicated that post-treatment scores
              were significantly higher than pre-treatment scores, with a large
              effect size. All 10 patients showed improvement after the 6-week
              program.
            </p>
          </div>
        </div>

        {/* When to Use */}
        <h3 className="text-xl font-semibold text-gray-900">
          Choosing Between Parametric and Non-Parametric Tests
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Situation</th>
                <th className="py-2 text-left font-semibold">Recommended Test</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Paired data, normal differences</td>
                <td className="py-2 font-medium">Paired samples t-test</td>
              </tr>
              <tr>
                <td className="py-2">Paired data, non-normal or ordinal</td>
                <td className="py-2 font-medium">Wilcoxon signed-rank test</td>
              </tr>
              <tr>
                <td className="py-2">Two independent groups, normal data</td>
                <td className="py-2">Independent samples t-test</td>
              </tr>
              <tr>
                <td className="py-2">Two independent groups, non-normal</td>
                <td className="py-2">Mann-Whitney U test</td>
              </tr>
              <tr>
                <td className="py-2">3+ related groups, non-normal</td>
                <td className="py-2">Friedman test</td>
              </tr>
              <tr>
                <td className="py-2">3+ independent groups, non-normal</td>
                <td className="py-2">Kruskal-Wallis test</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the Wilcoxon Signed-Rank Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          While the Wilcoxon test has fewer assumptions than the paired t-test,
          it still requires certain conditions to be met:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Paired Observations</p>
            <p className="mt-1 text-sm text-gray-600">
              Data must consist of paired observations &mdash; either repeated
              measures on the same subjects (pre/post) or matched pairs. Each
              pair produces one difference score.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Ordinal or Continuous Scale</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be measured on at least an ordinal
              scale, so that differences can be meaningfully ranked. The test
              does not require interval or ratio data, unlike the paired t-test.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Symmetric Distribution of Differences</p>
            <p className="mt-1 text-sm text-gray-600">
              The distribution of the differences between pairs should be
              approximately symmetric around the median. This is a weaker
              assumption than normality. If the distribution of differences is
              highly skewed, consider the sign test instead, which makes no
              symmetry assumption at all.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Independence Between Pairs</p>
            <p className="mt-1 text-sm text-gray-600">
              Each pair of observations must be independent of every other pair.
              The measurements within a pair are related (that is the whole
              point), but different pairs should not influence each other.
            </p>
          </div>
        </div>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding the Rank-Biserial Correlation
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The rank-biserial correlation (<em>r</em>) is the recommended effect
          size measure for the Wilcoxon signed-rank test. It ranges from &minus;1
          to +1, where values near &plusmn;1 indicate that nearly all pairs
          changed in the same direction, and values near 0 indicate no
          consistent direction of change. It is calculated as (<em>W</em>+ &minus;{" "}
          <em>W</em>&minus;) / (<em>W</em>+ + <em>W</em>&minus;).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">|<em>r</em>|</th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
                <th className="py-2 text-left font-semibold">Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">&lt; 0.1</td>
                <td className="py-2">Negligible</td>
                <td className="py-2 text-gray-500">No meaningful directional trend</td>
              </tr>
              <tr>
                <td className="py-2">0.1 &ndash; 0.3</td>
                <td className="py-2">Small</td>
                <td className="py-2 text-gray-500">Slight tendency in one direction</td>
              </tr>
              <tr>
                <td className="py-2">0.3 &ndash; 0.5</td>
                <td className="py-2">Medium</td>
                <td className="py-2 text-gray-500">Noticeable directional pattern</td>
              </tr>
              <tr>
                <td className="py-2">&ge; 0.5</td>
                <td className="py-2">Large</td>
                <td className="py-2 text-gray-500">Strong, consistent directional change</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Wilcoxon Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, Wilcoxon signed-rank test
          results should include the test statistic (<em>W</em> or <em>T</em>),
          z-approximation, p-value, effect size, and relevant descriptive
          statistics (medians). Here are templates you can use:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Template</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A Wilcoxon signed-rank test indicated that post-test scores
              (<em>Mdn</em> = [value]) were [significantly/not significantly]
              different from pre-test scores (<em>Mdn</em> = [value]),{" "}
              <em>W</em> = [value], <em>z</em> = [value], <em>p</em> = [value],{" "}
              <em>r</em> = [value].
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Real Example</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A Wilcoxon signed-rank test indicated that post-treatment anxiety
              scores (<em>Mdn</em> = 85.00) were significantly lower than
              pre-treatment scores (<em>Mdn</em> = 81.00), <em>W</em> = 0.0,{" "}
              <em>z</em> = &minus;2.80, <em>p</em> = .005, <em>r</em> = 1.00.
              The large effect size indicates that the treatment produced a
              consistent improvement across all patients.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report <em>W</em> to one decimal place and <em>z</em> to two
          decimal places. Report <em>p</em>-values to three decimal places,
          except use <em>p</em> &lt; .001 when the value is below .001. Always
          include an effect size measure (rank-biserial <em>r</em>).
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using the Wilcoxon test for independent samples:</strong>{" "}
            The Wilcoxon signed-rank test is only for paired or repeated-measures
            data. For two independent groups, use the Mann-Whitney U test
            instead.
          </li>
          <li>
            <strong>Confusing W+ and W&minus; with the test statistic:</strong>{" "}
            Some software reports <em>W</em> as the sum of positive ranks,
            others as the smaller of <em>W</em>+ and <em>W</em>&minus;. StatMate
            reports <em>W</em> = min(<em>W</em>+, <em>W</em>&minus;), which is
            the standard for hypothesis testing.
          </li>
          <li>
            <strong>Ignoring tied or zero differences:</strong> Pairs with zero
            difference (pre = post) are excluded from the analysis. If many pairs
            have zero differences, the test&apos;s power is reduced and you
            should report how many pairs were excluded.
          </li>
          <li>
            <strong>Assuming the test compares medians directly:</strong> The
            Wilcoxon signed-rank test technically tests whether the distribution
            of differences is symmetric around zero, not whether the medians are
            equal. However, when the symmetry assumption holds, rejecting the
            null hypothesis does imply a median shift.
          </li>
          <li>
            <strong>Using it with very small samples without exact tables:</strong>{" "}
            The normal approximation (z-score) used here is accurate for
            <em>n</em> &ge; 10. For smaller samples, exact p-values from
            Wilcoxon tables or permutation methods are more appropriate.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s Wilcoxon signed-rank test calculations have been
            validated against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1 py-0.5 text-xs">wilcox.test()</code>{" "}
            function and SPSS output. We use the normal approximation with
            continuity correction, proper tie handling via average ranks, and the
            jstat library for normal distribution probabilities. The
            rank-biserial correlation is computed following Kerby (2014). All
            results match R output to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/wilcoxon" />
    </div>
  );
}

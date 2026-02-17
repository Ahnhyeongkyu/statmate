import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MannWhitneyCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mannWhitney" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/mann-whitney" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mann-Whitney U Test Calculator - StatMate",
  description:
    "Free online Mann-Whitney U test calculator with APA-formatted results. Non-parametric test for comparing two independent groups.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Mann-Whitney U statistic",
    "Normal approximation z-score",
    "Rank-biserial correlation effect size",
    "Median and mean rank comparison",
    "APA 7th edition formatted results",
  ],
};

export default async function MannWhitneyPage() {
  const t = await getTranslations("mannWhitney");
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <MannWhitneyCalculator />

      <AdUnit slot="mann-whitney-mid" format="horizontal" />

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is the Mann-Whitney U Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The Mann-Whitney U test (also known as the Wilcoxon rank-sum test) is a
          non-parametric statistical test used to compare the distributions of two
          independent groups. Unlike the independent samples t-test, the
          Mann-Whitney U test does not assume that the data are normally
          distributed, making it ideal for ordinal data, skewed distributions, or
          small sample sizes where normality cannot be verified. It was developed
          by Henry B. Mann and Donald R. Whitney in 1947 and is one of the most
          widely used non-parametric tests in behavioral science, medicine, and
          social research.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          When to Use the Mann-Whitney U Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The Mann-Whitney U test is the non-parametric alternative to the
          independent samples t-test. Use it when one or more of the following
          conditions apply: your data are measured on an ordinal scale (e.g.,
          Likert-type items), the assumption of normality is violated, your sample
          sizes are very small (e.g., n &lt; 15 per group), or your data contain
          outliers that would distort parametric results. It is especially common
          in clinical trials, quality-of-life research, and educational studies
          where rating scales are used.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Mann-Whitney U Test vs. Independent Samples T-Test
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">Mann-Whitney U</th>
                <th className="py-2 text-left font-semibold">Independent T-Test</th>
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
                <td className="py-2">Rank-biserial <em>r</em></td>
                <td className="py-2">Cohen&apos;s <em>d</em></td>
              </tr>
              <tr>
                <td className="py-2">Robustness to outliers</td>
                <td className="py-2 font-medium">High</td>
                <td className="py-2">Low</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Mann-Whitney U Test
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher compares pain ratings (1-10 scale) between patients
            receiving a new treatment (Group 1) and a placebo (Group 2). Since
            pain ratings are ordinal and the sample is small, a Mann-Whitney U
            test is appropriate.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Group 1 &mdash; Treatment (n=8)</p>
              <p className="mt-1 text-sm text-gray-500">85, 72, 91, 68, 77, 95, 83, 89</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 84.0</p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Group 2 &mdash; Placebo (n=8)</p>
              <p className="mt-1 text-sm text-gray-500">65, 78, 71, 62, 73, 69, 75, 67</p>
              <p className="mt-2 text-sm text-gray-600">Mdn = 70.0</p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>U</em> = 5.0, <em>z</em> = -2.84, <em>p</em> = .005,{" "}
              <em>r</em> = 0.84
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The treatment group had significantly higher scores than the placebo
              group, with a large effect size (rank-biserial <em>r</em> = 0.84).
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the Mann-Whitney U Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          While the Mann-Whitney U test is less restrictive than the t-test, it
          still has assumptions that should be verified:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Ordinal or Continuous Data</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be measured on at least an ordinal scale
              (i.e., values can be meaningfully ranked). This includes Likert
              scales, test scores, reaction times, and any continuous measure.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Independent Groups</p>
            <p className="mt-1 text-sm text-gray-600">
              The two groups must be independent of each other. Each observation
              belongs to only one group, and participants in one group do not
              influence participants in the other. For paired/matched data, use the
              Wilcoxon signed-rank test instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Independent Observations</p>
            <p className="mt-1 text-sm text-gray-600">
              Observations within each group must be independent. Repeated
              measures or clustered data violate this assumption and require
              different analytical approaches.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Similar Distribution Shape (for median comparison)</p>
            <p className="mt-1 text-sm text-gray-600">
              If you want to interpret the test as comparing medians, the two
              groups should have similarly shaped distributions (differing only in
              location). Without this assumption, the test compares the overall
              rank distributions rather than medians specifically.
            </p>
          </div>
        </div>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding the Rank-Biserial Correlation
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The rank-biserial correlation (<em>r</em>) is the recommended effect
          size measure for the Mann-Whitney U test. It ranges from -1 to +1 and
          represents the proportion of favorable comparisons minus unfavorable
          comparisons between the two groups.
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
                <td className="py-2 text-gray-500">Groups are nearly identical in rank</td>
              </tr>
              <tr>
                <td className="py-2">0.1 - 0.3</td>
                <td className="py-2">Small</td>
                <td className="py-2 text-gray-500">Slight tendency for one group to rank higher</td>
              </tr>
              <tr>
                <td className="py-2">0.3 - 0.5</td>
                <td className="py-2">Medium</td>
                <td className="py-2 text-gray-500">Noticeable separation between groups</td>
              </tr>
              <tr>
                <td className="py-2">&gt; 0.5</td>
                <td className="py-2">Large</td>
                <td className="py-2 text-gray-500">Strong separation, most of one group outranks the other</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Mann-Whitney U Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, report the U statistic, z
          value, p-value, effect size, and descriptive statistics (medians and
          sample sizes) for each group:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Example Report</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A Mann-Whitney U test indicated that scores for the treatment group
              (Mdn = 84.0, <em>n</em> = 8) were significantly higher than for the
              placebo group (Mdn = 70.0, <em>n</em> = 8), <em>U</em> = 5.0,{" "}
              <em>z</em> = -2.84, <em>p</em> = .005, <em>r</em> = .84.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report <em>U</em> to one decimal place, <em>z</em> to two
          decimal places, and <em>p</em> to three decimal places. Use{" "}
          <em>p</em> &lt; .001 when the value is below .001. Always include the
          rank-biserial <em>r</em> as the effect size measure.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using a t-test on non-normal data:</strong> If your data are
            ordinal or clearly non-normal with small samples, the t-test may give
            misleading results. Use Mann-Whitney U instead.
          </li>
          <li>
            <strong>Interpreting U as a difference in means:</strong> The
            Mann-Whitney U test compares rank distributions, not means. Report
            medians, not means, as the descriptive statistic.
          </li>
          <li>
            <strong>Ignoring tied ranks:</strong> When many observations share the
            same value, ties can affect the test. StatMate handles tied ranks
            automatically using the average rank method.
          </li>
          <li>
            <strong>Using Mann-Whitney for paired data:</strong> If your data are
            paired or matched, use the Wilcoxon signed-rank test instead.
          </li>
          <li>
            <strong>Forgetting effect size:</strong> A significant p-value alone
            does not tell you the magnitude of the difference. Always report the
            rank-biserial correlation alongside the test result.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s Mann-Whitney U calculations have been validated
            against R (wilcox.test function) and SPSS output. The implementation
            uses the normal approximation with continuity correction for the
            z-score and the jstat library for probability distributions. Tied
            ranks are handled using the average rank method. All results match R
            output to at least 4 decimal places.
          </p>
        </div>
      </section>

      <RelatedCalculators current="/calculators/mann-whitney" />
    </div>
  );
}

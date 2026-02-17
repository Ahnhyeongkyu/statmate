import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { TTestCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ttest" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/t-test" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "T-Test Calculator - StatMate",
  description:
    "Free online t-test calculator with APA-formatted results. Independent and paired samples t-test.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Independent samples t-test",
    "Paired samples t-test",
    "Cohen's d effect size",
    "95% confidence interval",
    "APA 7th edition formatted results",
  ],
};

export default async function TTestPage() {
  const t = await getTranslations("ttest");
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

      <TTestCalculator />

      <AdUnit slot="t-test-mid" format="horizontal" />

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is a T-Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          A t-test is a statistical test used to compare the means of two groups
          and determine if they are significantly different from each other.
          Developed by William Sealy Gosset in 1908 under the pseudonym
          &quot;Student,&quot; the t-test is one of the most commonly used
          statistical tests in social science, psychology, medicine, and
          education research. It answers a simple question: is the difference
          between two group means likely due to a real effect, or just random
          chance?
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Independent Samples T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use an independent samples t-test when comparing means from two
          different, unrelated groups. For example, comparing test scores
          between a treatment group and a control group, or comparing salary
          between male and female employees. This calculator uses Welch&apos;s
          t-test by default, which does not assume equal variances and is
          recommended by the American Psychological Association as the default
          approach.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Paired Samples T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use a paired samples t-test when comparing means from the same group
          at two different times (pre-test vs post-test) or when participants
          are matched on key variables. The paired t-test accounts for the
          correlation between measurements, making it more powerful than an
          independent samples test when the design allows it. Common examples
          include before/after intervention studies and within-subjects
          experimental designs.
        </p>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Independent Samples T-Test
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher wants to test whether a new teaching method improves
            exam scores. 15 students use the new method (experimental group) and
            15 use the traditional method (control group).
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Experimental Group (n=15)</p>
              <p className="mt-1 text-sm text-gray-500">85, 90, 78, 92, 88, 95, 82, 91, 87, 93, 86, 89, 94, 80, 91</p>
              <p className="mt-2 text-sm text-gray-600"><em>M</em> = 88.07, <em>SD</em> = 4.94</p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">Control Group (n=15)</p>
              <p className="mt-1 text-sm text-gray-500">78, 82, 75, 80, 77, 83, 79, 81, 76, 84, 73, 80, 82, 77, 79</p>
              <p className="mt-2 text-sm text-gray-600"><em>M</em> = 79.07, <em>SD</em> = 3.15</p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>t</em>(23.47) = 5.87, <em>p</em> &lt; .001, <em>d</em> = 2.15, 95% CI [5.82, 12.18]
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The experimental group scored significantly higher than the control
              group, with a very large effect size (Cohen&apos;s <em>d</em> = 2.15).
            </p>
          </div>
        </div>

        {/* When to Use */}
        <h3 className="text-xl font-semibold text-gray-900">
          When to Use a T-Test vs. Other Tests
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
                <td className="py-2">Comparing 2 independent group means</td>
                <td className="py-2 font-medium">Independent samples t-test</td>
              </tr>
              <tr>
                <td className="py-2">Comparing pre/post scores (same group)</td>
                <td className="py-2 font-medium">Paired samples t-test</td>
              </tr>
              <tr>
                <td className="py-2">Comparing 3+ group means</td>
                <td className="py-2">One-way ANOVA</td>
              </tr>
              <tr>
                <td className="py-2">Non-normal data, 2 groups</td>
                <td className="py-2">Mann-Whitney U test</td>
              </tr>
              <tr>
                <td className="py-2">Non-normal paired data</td>
                <td className="py-2">Wilcoxon signed-rank test</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before interpreting your results, verify these assumptions are met:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Scale of Measurement</p>
            <p className="mt-1 text-sm text-gray-600">
              The dependent variable must be continuous (interval or ratio scale).
              If your data are ordinal (e.g., Likert scales), consider a
              non-parametric alternative.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Random Sampling</p>
            <p className="mt-1 text-sm text-gray-600">
              Data should be collected from a representative, randomly selected
              portion of the population.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Normality</p>
            <p className="mt-1 text-sm text-gray-600">
              Each group&apos;s data should be approximately normally distributed.
              With sample sizes above 30 per group, the t-test is robust to
              violations of normality due to the Central Limit Theorem. For smaller
              samples, check normality using the Shapiro-Wilk test.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Homogeneity of Variance (for Student&apos;s t)</p>
            <p className="mt-1 text-sm text-gray-600">
              The two groups should have approximately equal variances. StatMate
              uses <strong>Welch&apos;s t-test</strong> by default, which does
              not require this assumption and is recommended for general use.
            </p>
          </div>
        </div>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding Cohen&apos;s d Effect Size
        </h3>
        <p className="text-gray-600 leading-relaxed">
          While <em>p</em>-values tell you whether a difference is statistically
          significant, Cohen&apos;s <em>d</em> tells you how large the
          difference is in practical terms. This is critical because with large
          sample sizes, even tiny, meaningless differences can be
          &quot;significant.&quot;
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Cohen&apos;s <em>d</em></th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
                <th className="py-2 text-left font-semibold">Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">0.2</td>
                <td className="py-2">Small</td>
                <td className="py-2 text-gray-500">Difference noticeable only with careful measurement</td>
              </tr>
              <tr>
                <td className="py-2">0.5</td>
                <td className="py-2">Medium</td>
                <td className="py-2 text-gray-500">Difference visible to the naked eye</td>
              </tr>
              <tr>
                <td className="py-2">0.8</td>
                <td className="py-2">Large</td>
                <td className="py-2 text-gray-500">Substantial, obvious difference</td>
              </tr>
              <tr>
                <td className="py-2">1.2+</td>
                <td className="py-2">Very Large</td>
                <td className="py-2 text-gray-500">Very strong effect, hard to miss</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report T-Test Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, t-test results should include
          the t-statistic, degrees of freedom, p-value, effect size, and
          confidence interval. Here are templates you can use:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Independent Samples</p>
            <p className="mt-1 text-sm italic text-gray-600">
              An independent-samples t-test revealed that the experimental group
              (<em>M</em> = 88.07, <em>SD</em> = 4.94) scored significantly
              higher than the control group (<em>M</em> = 79.07, <em>SD</em> = 3.15),
              <em>t</em>(23.47) = 5.87, <em>p</em> &lt; .001, <em>d</em> = 2.15,
              95% CI [5.82, 12.18].
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Paired Samples</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A paired-samples t-test indicated that post-test scores
              (<em>M</em> = 82.40, <em>SD</em> = 6.12) were significantly higher
              than pre-test scores (<em>M</em> = 75.60, <em>SD</em> = 7.35),
              <em>t</em>(24) = 4.32, <em>p</em> &lt; .001, <em>d</em> = 0.86.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report <em>t</em>-values and degrees of freedom to two decimal
          places. Report <em>p</em>-values to three decimal places, except use
          <em>p</em> &lt; .001 when the value is below .001. Always include an
          effect size measure.
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Reporting <em>p</em> = .000:</strong> Statistical software
            sometimes displays p = .000, but you should report this as{" "}
            <em>p</em> &lt; .001. A p-value is never exactly zero.
          </li>
          <li>
            <strong>Ignoring effect size:</strong> A statistically significant
            result with <em>d</em> = 0.1 may not be practically meaningful.
            Always report and interpret the effect size.
          </li>
          <li>
            <strong>Using a t-test for 3+ groups:</strong> If you have three or
            more groups, use ANOVA instead. Running multiple t-tests inflates
            your Type I error rate.
          </li>
          <li>
            <strong>Assuming equal variances:</strong> Unless you have strong
            reason to assume equal variances, use Welch&apos;s t-test (the
            default in StatMate).
          </li>
          <li>
            <strong>Confusing statistical significance with practical importance:</strong>{" "}
            A <em>p</em> &lt; .05 result does not automatically mean the finding
            is important or clinically relevant.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s t-test calculations have been validated against R
            (t.test function) and SPSS output. We use the jstat library for
            probability distributions and implement Welch&apos;s t-test with
            Welch-Satterthwaite degrees of freedom approximation. All results
            match R output to at least 4 decimal places.
          </p>
        </div>
      </section>

      <RelatedCalculators current="/calculators/t-test" />
    </div>
  );
}

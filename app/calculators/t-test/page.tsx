import type { Metadata } from "next";
import { TTestCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";

export const metadata: Metadata = {
  title: "Free T-Test Calculator Online - Independent & Paired",
  description:
    "Free online t-test calculator. Independent samples and paired t-test with APA-formatted results. Get t-value, p-value, Cohen's d, and 95% CI instantly.",
  keywords: [
    "t-test calculator",
    "t-test calculator online",
    "independent t-test",
    "paired t-test",
    "t-test p-value",
    "APA t-test",
  ],
  alternates: { canonical: "/calculators/t-test" },
};

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

export default function TTestPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          T-Test Calculator
        </h1>
        <p className="mt-2 text-gray-500">
          Compare means between two groups using an independent or paired
          samples t-test. Results are formatted in APA 7th edition style.
        </p>
      </div>

      <TTestCalculator />

      <AdUnit slot="t-test-mid" format="horizontal" />

      {/* SEO Content */}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          What is a T-Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          A t-test is a statistical test used to compare the means of two groups
          and determine if they are significantly different from each other. It
          is one of the most commonly used statistical tests in social science,
          psychology, medicine, and education research.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Independent Samples T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use an independent samples t-test when comparing means from two
          different, unrelated groups. For example, comparing test scores
          between a treatment group and a control group. This calculator uses
          Welch&apos;s t-test, which does not assume equal variances.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Paired Samples T-Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use a paired samples t-test when comparing means from the same group
          at two different times (pre-test vs post-test) or when participants
          are matched. The paired t-test accounts for the correlation between
          measurements.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          How to Report T-Test Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, t-test results should be
          reported as: <em>t</em>(df) = X.XX, <em>p</em> = .XXX, <em>d</em> =
          X.XX. The t-value and degrees of freedom should be reported to two
          decimal places. If <em>p</em> &lt; .001, report as <em>p</em> &lt;
          .001 rather than the exact value.
        </p>
      </section>

      <RelatedCalculators current="/calculators/t-test" />
    </div>
  );
}

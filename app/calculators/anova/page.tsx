import type { Metadata } from "next";
import { AnovaCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";

export const metadata: Metadata = {
  title: "Free One-Way ANOVA Calculator Online - F-test & Post-Hoc",
  description:
    "Free online one-way ANOVA calculator. Compare means across multiple groups with F-statistic, eta-squared, and Bonferroni post-hoc tests. APA-formatted results.",
  keywords: [
    "anova calculator",
    "one-way anova",
    "anova calculator online",
    "f-test calculator",
    "post-hoc test",
    "eta squared",
    "APA anova",
  ],
  alternates: { canonical: "/calculators/anova" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "One-Way ANOVA Calculator - StatMate",
  description:
    "Free online ANOVA calculator with F-statistic, eta-squared, and Bonferroni post-hoc tests. APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "One-way ANOVA",
    "F-statistic",
    "Eta-squared effect size",
    "Bonferroni post-hoc comparisons",
    "APA 7th edition formatted results",
  ],
};

export default function AnovaPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          One-Way ANOVA Calculator
        </h1>
        <p className="mt-2 text-gray-500">
          Compare means across three or more independent groups. Includes
          F-statistic, eta-squared, and Bonferroni post-hoc comparisons. Results
          in APA 7th edition format.
        </p>
      </div>

      <AnovaCalculator />

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">What is ANOVA?</h2>
        <p className="text-gray-600 leading-relaxed">
          ANOVA (Analysis of Variance) is a statistical test used to compare
          means across three or more groups. While a t-test compares two groups,
          ANOVA extends this comparison to multiple groups simultaneously,
          controlling for Type I error.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">One-Way ANOVA</h3>
        <p className="text-gray-600 leading-relaxed">
          One-way ANOVA tests whether the means of three or more independent
          groups are significantly different. It produces an F-statistic, which
          is the ratio of between-group variance to within-group variance. A
          significant F-value indicates that at least one group mean differs from
          the others.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">Post-Hoc Tests</h3>
        <p className="text-gray-600 leading-relaxed">
          When ANOVA is significant, post-hoc tests determine which specific
          groups differ. This calculator uses Bonferroni-corrected pairwise
          comparisons, which control for familywise error rate by adjusting
          p-values based on the number of comparisons.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          How to Report ANOVA Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          APA 7th edition format: <em>F</em>(df<sub>between</sub>,
          df<sub>within</sub>) = X.XX, <em>p</em> = .XXX, <em>&eta;&sup2;</em>{" "}
          = .XX. Report the F-statistic, degrees of freedom, p-value, and
          eta-squared as the effect size.
        </p>
      </section>

      <RelatedCalculators current="/calculators/anova" />
    </div>
  );
}

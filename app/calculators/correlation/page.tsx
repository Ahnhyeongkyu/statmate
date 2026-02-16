import type { Metadata } from "next";
import { CorrelationCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";

export const metadata: Metadata = {
  title: "Free Correlation Calculator Online - Pearson r & Spearman rho",
  description:
    "Free online correlation calculator. Pearson r and Spearman rho with scatter plot, significance test, and APA-formatted results. Get r-value, p-value, and 95% CI.",
  keywords: [
    "correlation calculator",
    "pearson correlation",
    "spearman correlation",
    "correlation coefficient",
    "r value calculator",
    "scatter plot",
    "APA correlation",
  ],
  alternates: { canonical: "/calculators/correlation" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Correlation Calculator - StatMate",
  description:
    "Free online correlation calculator. Pearson r and Spearman rho with scatter plot and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Pearson correlation (r)",
    "Spearman correlation (rho)",
    "Scatter plot with regression line",
    "95% confidence interval",
    "APA 7th edition formatted results",
  ],
};

export default function CorrelationPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Correlation Calculator
        </h1>
        <p className="mt-2 text-gray-500">
          Calculate Pearson r or Spearman rho correlation with scatter plot
          visualization. Results are formatted in APA 7th edition style.
        </p>
      </div>

      <CorrelationCalculator />

      <AdUnit slot="correlation-mid" format="horizontal" />

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Correlation?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Correlation measures the strength and direction of the relationship
          between two variables. It ranges from -1 (perfect negative) to +1
          (perfect positive), with 0 indicating no linear relationship.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Pearson Correlation (r)
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Pearson&apos;s r measures the strength of the linear relationship between
          two continuous variables. It assumes the data are normally distributed
          and the relationship is linear. Use Pearson when both variables are
          measured on interval or ratio scales.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Spearman Correlation (rho)
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Spearman&apos;s rho is a non-parametric measure that assesses the monotonic
          relationship between two variables using ranks. Use Spearman when data
          are ordinal or when the relationship is not linear.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Correlation in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          APA 7th edition: <em>r</em>(df) = .XX, <em>p</em> = .XXX for Pearson,
          or <em>r<sub>s</sub></em>(df) = .XX, <em>p</em> = .XXX for Spearman.
          Always report the degrees of freedom (N - 2), the correlation
          coefficient, and the p-value.
        </p>
      </section>

      <RelatedCalculators current="/calculators/correlation" />
    </div>
  );
}

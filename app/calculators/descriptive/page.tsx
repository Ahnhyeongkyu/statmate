import type { Metadata } from "next";
import { DescriptiveCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";

export const metadata: Metadata = {
  title: "Free Descriptive Statistics Calculator - Mean, SD, Skewness",
  description:
    "Free online descriptive statistics calculator. Calculate mean, median, standard deviation, variance, skewness, kurtosis, quartiles, and 95% CI instantly.",
  keywords: [
    "descriptive statistics calculator",
    "mean calculator",
    "standard deviation calculator",
    "variance calculator",
    "skewness kurtosis",
    "quartile calculator",
    "statistics calculator online",
  ],
  alternates: { canonical: "/calculators/descriptive" },
};

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

export default function DescriptivePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Descriptive Statistics Calculator
        </h1>
        <p className="mt-2 text-gray-500">
          Calculate mean, median, standard deviation, skewness, kurtosis, and
          more. Results include 95% confidence intervals and distribution shape
          interpretation.
        </p>
      </div>

      <DescriptiveCalculator />

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          What are Descriptive Statistics?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Descriptive statistics summarize and organize the characteristics of a
          dataset. They provide simple summaries about the sample and the
          measures, forming the basis of virtually every quantitative analysis.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Measures of Central Tendency
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The mean (average), median (middle value), and mode (most frequent
          value) describe the center of a distribution. The mean is most commonly
          reported in APA format, usually accompanied by the standard deviation.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Measures of Variability
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Standard deviation (SD), variance, range, and interquartile range
          (IQR) describe how spread out the data are. SD is the most commonly
          reported measure and represents the average distance from the mean.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Skewness and Kurtosis
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Skewness measures the asymmetry of the distribution (positive = right
          tail, negative = left tail). Kurtosis (excess) measures the heaviness
          of the tails relative to a normal distribution. Values near zero
          suggest normality.
        </p>
      </section>

      <RelatedCalculators current="/calculators/descriptive" />
    </div>
  );
}

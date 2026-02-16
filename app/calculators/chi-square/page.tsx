import type { Metadata } from "next";
import { ChiSquareCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Free Chi-Square Calculator Online - Independence & Goodness-of-Fit",
  description:
    "Free online chi-square calculator. Test of independence and goodness-of-fit with APA-formatted results. Get chi-square value, p-value, and Cramer's V instantly.",
  keywords: [
    "chi-square calculator",
    "chi-square test online",
    "chi-square test of independence",
    "goodness of fit test",
    "chi-square p-value",
    "Cramer's V",
    "APA chi-square",
  ],
};

export default function ChiSquarePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Chi-Square Calculator
        </h1>
        <p className="mt-2 text-gray-500">
          Perform a chi-square test of independence or goodness-of-fit. Results
          are formatted in APA 7th edition style.
        </p>
      </div>

      <ChiSquareCalculator />

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          What is a Chi-Square Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The chi-square test is a non-parametric statistical test used to
          examine the relationship between categorical variables. It compares
          observed frequencies to expected frequencies to determine if there is
          a significant association.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Chi-Square Test of Independence
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use the test of independence to determine whether two categorical
          variables are related. For example, testing if there is a relationship
          between gender and preference for a product. Enter your data in a
          contingency table (cross-tabulation).
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Chi-Square Goodness-of-Fit Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use the goodness-of-fit test to determine whether observed frequencies
          differ from expected frequencies. For example, testing if a die is
          fair by comparing observed rolls to the expected equal distribution.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Chi-Square Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition, chi-square results should be reported
          as: <em>&chi;&sup2;</em>(df, <em>N</em> = XX) = X.XX, <em>p</em> =
          .XXX. Include Cramer&apos;s V as the effect size measure for the test
          of independence.
        </p>
      </section>
    </div>
  );
}

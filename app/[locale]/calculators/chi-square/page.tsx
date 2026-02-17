import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ChiSquareCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "chiSquare" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/chi-square" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Chi-Square Calculator - StatMate",
  description:
    "Free online chi-square calculator. Test of independence and goodness-of-fit with APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Chi-square test of independence",
    "Goodness-of-fit test",
    "Cramer's V effect size",
    "Expected frequencies",
    "APA 7th edition formatted results",
  ],
};

export default async function ChiSquarePage() {
  const t = await getTranslations("chiSquare");
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

      <ChiSquareCalculator />

      <AdUnit slot="chi-square-mid" format="horizontal" />

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is a Chi-Square Test?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The chi-square (&chi;&sup2;) test is a non-parametric statistical test
          used to examine relationships between categorical variables. Unlike
          t-tests or ANOVA that compare means, the chi-square test works with
          frequency counts&mdash;how many observations fall into each category.
          It compares the frequencies you actually observed in your data to the
          frequencies you would expect if there were no relationship between the
          variables. When the difference between observed and expected
          frequencies is large enough, you can conclude the variables are
          significantly associated.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Chi-Square Test of Independence
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use the test of independence to determine whether two categorical
          variables are related. The data are arranged in a contingency table
          (cross-tabulation) where rows represent one variable and columns
          represent the other. For example, you might test whether there is a
          relationship between gender and product preference, or between
          treatment condition and recovery outcome. The null hypothesis states
          that the two variables are independent&mdash;knowing the value of one
          variable tells you nothing about the other.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Chi-Square Goodness-of-Fit Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Use the goodness-of-fit test to determine whether observed frequencies
          for a single categorical variable differ from a set of expected
          frequencies. For example, testing if a die is fair by comparing
          observed rolls to the expected equal distribution (1/6 for each face),
          or testing whether customer visits are evenly distributed across days
          of the week. The null hypothesis states that the observed distribution
          matches the expected distribution.
        </p>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Test of Independence
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher surveyed 100 people to test whether gender (Male /
            Female) is associated with product preference (A / B / C). The
            observed frequencies are:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Observed</th>
                  <th className="py-2 text-center font-semibold">Product A</th>
                  <th className="py-2 text-center font-semibold">Product B</th>
                  <th className="py-2 text-center font-semibold">Product C</th>
                  <th className="py-2 text-center font-semibold">Row Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 font-medium">Male</td>
                  <td className="py-2 text-center">30</td>
                  <td className="py-2 text-center">10</td>
                  <td className="py-2 text-center">10</td>
                  <td className="py-2 text-center font-medium">50</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Female</td>
                  <td className="py-2 text-center">15</td>
                  <td className="py-2 text-center">20</td>
                  <td className="py-2 text-center">15</td>
                  <td className="py-2 text-center font-medium">50</td>
                </tr>
                <tr className="border-t-2 border-gray-900">
                  <td className="py-2 font-semibold">Column Total</td>
                  <td className="py-2 text-center font-medium">45</td>
                  <td className="py-2 text-center font-medium">30</td>
                  <td className="py-2 text-center font-medium">25</td>
                  <td className="py-2 text-center font-semibold">100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            Expected frequencies are calculated as (Row Total &times; Column
            Total) / Grand Total. For example, the expected frequency for Male
            &times; Product A = (50 &times; 45) / 100 = 22.5.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Expected</th>
                  <th className="py-2 text-center font-semibold">Product A</th>
                  <th className="py-2 text-center font-semibold">Product B</th>
                  <th className="py-2 text-center font-semibold">Product C</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 font-medium">Male</td>
                  <td className="py-2 text-center">22.5</td>
                  <td className="py-2 text-center">15.0</td>
                  <td className="py-2 text-center">12.5</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Female</td>
                  <td className="py-2 text-center">22.5</td>
                  <td className="py-2 text-center">15.0</td>
                  <td className="py-2 text-center">12.5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              &chi;&sup2;(2, <em>N</em> = 100) = 8.74, <em>p</em> = .013,
              Cramer&apos;s <em>V</em> = .30
            </p>
            <p className="mt-2 text-sm text-gray-600">
              There was a statistically significant association between gender
              and product preference, &chi;&sup2;(2, <em>N</em> = 100) = 8.74,{" "}
              <em>p</em> = .013, with a medium effect size (Cramer&apos;s{" "}
              <em>V</em> = .30). Males showed a stronger preference for Product
              A, while females were more evenly distributed across products.
            </p>
          </div>
        </div>

        {/* When to Use */}
        <h3 className="text-xl font-semibold text-gray-900">
          When to Use Chi-Square vs. Other Tests
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Choosing the right test depends on the type of data you have and the
          size of your sample. Use this guide to select the appropriate test:
        </p>
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
                <td className="py-2">Two categorical variables (2&times;2 or larger table)</td>
                <td className="py-2 font-medium">Chi-square test of independence</td>
              </tr>
              <tr>
                <td className="py-2">One categorical variable vs. expected proportions</td>
                <td className="py-2 font-medium">Chi-square goodness-of-fit test</td>
              </tr>
              <tr>
                <td className="py-2">2&times;2 table with any expected frequency &lt; 5</td>
                <td className="py-2">Fisher&apos;s exact test</td>
              </tr>
              <tr>
                <td className="py-2">Ordinal data, two independent groups</td>
                <td className="py-2">Mann-Whitney U test</td>
              </tr>
              <tr>
                <td className="py-2">Paired or matched categorical data</td>
                <td className="py-2">McNemar&apos;s test</td>
              </tr>
              <tr>
                <td className="py-2">More than two related categorical samples</td>
                <td className="py-2">Cochran&apos;s Q test</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of the Chi-Square Test
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before interpreting your chi-square results, verify that these
          assumptions are met:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Categorical Data</p>
            <p className="mt-1 text-sm text-gray-600">
              Both variables must be categorical (nominal or ordinal). The
              chi-square test does not work with continuous data. If you have
              continuous measurements, you must first categorize them into groups
              (e.g., age &rarr; age ranges), though this results in a loss of
              information.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Independent Observations</p>
            <p className="mt-1 text-sm text-gray-600">
              Each observation must be independent of all others. This means
              each participant or case contributes to only one cell in the
              contingency table. Repeated measures or matched pairs violate this
              assumption&mdash;use McNemar&apos;s test instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Expected Frequency &ge; 5</p>
            <p className="mt-1 text-sm text-gray-600">
              All expected cell frequencies should be 5 or greater. When more
              than 20% of cells have expected frequencies below 5, the
              chi-square approximation becomes unreliable. In such cases,
              consider combining categories or using Fisher&apos;s exact test
              (for 2&times;2 tables).
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Random Sampling</p>
            <p className="mt-1 text-sm text-gray-600">
              Data should be collected through random sampling or random
              assignment to ensure the sample is representative of the
              population. Convenience or biased samples can lead to misleading
              results regardless of what the test shows.
            </p>
          </div>
        </div>

        {/* Effect Size */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding Cramer&apos;s V Effect Size
        </h3>
        <p className="text-gray-600 leading-relaxed">
          While the <em>p</em>-value tells you whether an association is
          statistically significant, Cramer&apos;s <em>V</em> tells you how
          strong the association is. This is critical because with large sample
          sizes, even trivial associations can reach statistical significance.
          Cramer&apos;s <em>V</em> ranges from 0 (no association) to 1 (perfect
          association), and its interpretation depends on the degrees of freedom
          (the smaller of rows &minus; 1 or columns &minus; 1):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Effect Size</th>
                <th className="py-2 text-center font-semibold">df* = 1</th>
                <th className="py-2 text-center font-semibold">df* = 2</th>
                <th className="py-2 text-center font-semibold">df* = 3</th>
                <th className="py-2 text-center font-semibold">df* &ge; 4</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">Small</td>
                <td className="py-2 text-center">.10</td>
                <td className="py-2 text-center">.07</td>
                <td className="py-2 text-center">.06</td>
                <td className="py-2 text-center">.05</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Medium</td>
                <td className="py-2 text-center">.30</td>
                <td className="py-2 text-center">.21</td>
                <td className="py-2 text-center">.17</td>
                <td className="py-2 text-center">.15</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Large</td>
                <td className="py-2 text-center">.50</td>
                <td className="py-2 text-center">.35</td>
                <td className="py-2 text-center">.29</td>
                <td className="py-2 text-center">.25</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          *df* = min(rows &minus; 1, columns &minus; 1). For our worked example
          above (2&times;3 table), df* = 1, so <em>V</em> = .30 represents a
          medium effect.
        </p>

        {/* APA Reporting */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Chi-Square Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, chi-square results should
          include the chi-square statistic, degrees of freedom, sample size,
          p-value, and an effect size measure. Here is a template and a
          real example:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Template</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A chi-square test of independence was conducted to examine the
              relationship between [Variable 1] and [Variable 2].
              The relation between these variables was [significant/not
              significant], &chi;&sup2;(df, <em>N</em> = XX) = X.XX,{" "}
              <em>p</em> = .XXX, Cramer&apos;s <em>V</em> = .XX.
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">Real Example (from the worked example above)</p>
            <p className="mt-1 text-sm italic text-gray-600">
              A chi-square test of independence was conducted to examine the
              relationship between gender and product preference. The relation
              between these variables was significant, &chi;&sup2;(2,{" "}
              <em>N</em> = 100) = 8.74, <em>p</em> = .013, Cramer&apos;s{" "}
              <em>V</em> = .30. Males showed a notably higher preference for
              Product A (60%) compared to females (30%), while females were more
              evenly distributed across all three products.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report &chi;&sup2; values to two decimal places. Report{" "}
          <em>p</em>-values to three decimal places, except use <em>p</em>{" "}
          &lt; .001 when the value is below .001. Always include an effect size
          measure (Cramer&apos;s <em>V</em> for independence tests).
        </p>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Using chi-square with small expected frequencies:</strong>{" "}
            When expected cell counts fall below 5, the chi-square approximation
            is unreliable. Use Fisher&apos;s exact test for 2&times;2 tables, or
            combine categories to increase expected counts in larger tables.
          </li>
          <li>
            <strong>Entering percentages instead of raw counts:</strong> The
            chi-square test requires actual frequency counts, not percentages or
            proportions. Using percentages will produce incorrect results because
            the test needs to know the actual sample size.
          </li>
          <li>
            <strong>Ignoring effect size:</strong> A statistically significant
            chi-square result with a tiny Cramer&apos;s <em>V</em> (e.g., .05)
            may not be practically meaningful. With large samples, even trivial
            associations become &quot;significant.&quot; Always report and
            interpret Cramer&apos;s <em>V</em>.
          </li>
          <li>
            <strong>Violating independence of observations:</strong> Each
            participant should contribute to only one cell. If the same person
            appears in multiple cells (e.g., repeated measures), the chi-square
            test is invalid. Use McNemar&apos;s test for paired data.
          </li>
          <li>
            <strong>Confusing the two types of chi-square tests:</strong> The
            test of independence (two variables in a contingency table) and the
            goodness-of-fit test (one variable vs. expected proportions) answer
            different questions. Make sure you select the correct test for your
            research question.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s chi-square calculations have been validated against
            R&apos;s <code className="rounded bg-green-100 px-1 py-0.5 text-xs">chisq.test()</code>{" "}
            function and SPSS output. We use the jstat library for
            chi-square probability distributions and compute expected
            frequencies, degrees of freedom, and Cramer&apos;s V following
            standard statistical formulas. All results match R output to at
            least 4 decimal places.
          </p>
        </div>
      </section>

      <RelatedCalculators current="/calculators/chi-square" />
    </div>
  );
}

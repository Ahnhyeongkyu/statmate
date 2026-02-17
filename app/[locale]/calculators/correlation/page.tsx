import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CorrelationCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { SeoContentKo } from "./seo-ko";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "correlation" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/correlation" },
  };
}

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

export default async function CorrelationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("correlation");
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

      <CorrelationCalculator />

      <AdUnit slot="correlation-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        {/* 1. What is Correlation - Expanded with History */}
        <h2 className="text-2xl font-bold text-gray-900">
          What is Correlation?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Correlation is a statistical measure that quantifies the strength and
          direction of the relationship between two variables. The correlation
          coefficient ranges from -1 (perfect negative relationship) to +1
          (perfect positive relationship), with 0 indicating no linear
          relationship. Correlation analysis is one of the most widely used
          techniques in psychology, education, medicine, economics, and the
          social sciences.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The concept of correlation was pioneered by <strong>Sir Francis
          Galton</strong> in the 1880s during his studies of heredity and
          regression toward the mean. His work was formalized by{" "}
          <strong>Karl Pearson</strong>, who developed the product-moment
          correlation coefficient (Pearson&apos;s <em>r</em>) in 1896, providing
          the mathematical foundation still used today. In 1904,{" "}
          <strong>Charles Spearman</strong> introduced the rank-order
          correlation coefficient (Spearman&apos;s <em>rho</em>), a
          non-parametric alternative designed for ordinal data and monotonic
          relationships. Together, these two measures form the backbone of
          modern bivariate correlation analysis.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Pearson Correlation (r)
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Pearson&apos;s <em>r</em> measures the strength of the{" "}
          <strong>linear</strong> relationship between two continuous variables.
          It is calculated as the covariance of the two variables divided by the
          product of their standard deviations. Use Pearson when both variables
          are measured on interval or ratio scales, the relationship is
          approximately linear, and the data are roughly normally distributed.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Spearman Correlation (rho)
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Spearman&apos;s <em>rho</em> (<em>r<sub>s</sub></em>) is a
          non-parametric measure that assesses the <strong>monotonic</strong>{" "}
          relationship between two variables using their ranks rather than raw
          values. Use Spearman when data are ordinal (e.g., Likert scales),
          when the relationship is monotonic but not necessarily linear, or when
          outliers are a concern. Because it operates on ranks, Spearman&apos;s
          rho is more robust to extreme values than Pearson&apos;s <em>r</em>.
        </p>

        {/* 2. Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Study Hours vs. Exam Score
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A psychology professor collects data from 10 students to examine
            whether weekly study hours predict exam performance. Each student
            reports their average weekly study hours, and their final exam score
            (out of 100) is recorded.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Study Hours (X)
              </p>
              <p className="mt-1 text-sm text-gray-500">
                2, 4, 6, 8, 10, 12, 14, 16, 18, 20
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 11.00, <em>SD</em> = 6.06
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Exam Score (Y)
              </p>
              <p className="mt-1 text-sm text-gray-500">
                52, 58, 61, 68, 72, 78, 81, 85, 90, 95
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <em>M</em> = 74.00, <em>SD</em> = 14.23
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              Scatter Plot Description
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Plotting these 10 data points reveals a clear upward trend: as
              study hours increase from 2 to 20, exam scores rise from 52 to 95.
              The points cluster tightly around an upward-sloping regression
              line, indicating a strong positive linear relationship with minimal
              scatter.
            </p>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>r</em>(8) = .87, <em>p</em> &lt; .001, 95% CI [.53, .97]
            </p>
            <p className="mt-2 text-sm text-gray-600">
              There is a strong positive correlation between weekly study hours
              and exam scores. Students who studied more hours per week tended to
              score substantially higher on the final exam. The coefficient of
              determination (<em>r</em><sup>2</sup> = .76) indicates that study
              hours account for approximately 76% of the variance in exam scores.
            </p>
          </div>
        </div>

        {/* 3. Pearson vs Spearman Comparison */}
        <h3 className="text-xl font-semibold text-gray-900">
          Pearson vs. Spearman: When to Use Each
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Choosing the correct correlation method depends on your data type,
          distribution, and the nature of the relationship you expect. Here is
          a side-by-side comparison to guide your decision:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Feature</th>
                <th className="py-2 text-left font-semibold">Pearson <em>r</em></th>
                <th className="py-2 text-left font-semibold">Spearman <em>r<sub>s</sub></em></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium text-gray-700">Type</td>
                <td className="py-2">Parametric</td>
                <td className="py-2">Non-parametric</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Data level</td>
                <td className="py-2">Interval / Ratio</td>
                <td className="py-2">Ordinal / Interval / Ratio</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Relationship detected</td>
                <td className="py-2">Linear only</td>
                <td className="py-2">Any monotonic relationship</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Normality required</td>
                <td className="py-2">Yes (bivariate normality)</td>
                <td className="py-2">No</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Sensitive to outliers</td>
                <td className="py-2">Yes, highly</td>
                <td className="py-2">More robust</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Best for</td>
                <td className="py-2">Continuous, normally distributed data</td>
                <td className="py-2">Ranked data, non-normal distributions, ordinal scales</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Example use case</td>
                <td className="py-2">Height vs. weight</td>
                <td className="py-2">Customer satisfaction (1-5) vs. purchase frequency</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Interpreting Correlation Strength */}
        <h3 className="text-xl font-semibold text-gray-900">
          Interpreting Correlation Strength
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The absolute value of the correlation coefficient indicates the
          strength of the relationship. While context matters and different
          fields have different norms, the following guidelines (based on Evans,
          1996) provide a general framework:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">|<em>r</em>| Value</th>
                <th className="py-2 text-left font-semibold">Strength</th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">.00 &ndash; .19</td>
                <td className="py-2 font-medium">Very Weak</td>
                <td className="py-2 text-gray-500">Negligible relationship; practically no predictive value</td>
              </tr>
              <tr>
                <td className="py-2">.20 &ndash; .39</td>
                <td className="py-2 font-medium">Weak</td>
                <td className="py-2 text-gray-500">Small but potentially meaningful relationship</td>
              </tr>
              <tr>
                <td className="py-2">.40 &ndash; .59</td>
                <td className="py-2 font-medium">Moderate</td>
                <td className="py-2 text-gray-500">Noticeable relationship with meaningful predictive power</td>
              </tr>
              <tr>
                <td className="py-2">.60 &ndash; .79</td>
                <td className="py-2 font-medium">Strong</td>
                <td className="py-2 text-gray-500">Substantial relationship; good predictive accuracy</td>
              </tr>
              <tr>
                <td className="py-2">.80 &ndash; 1.00</td>
                <td className="py-2 font-medium">Very Strong</td>
                <td className="py-2 text-gray-500">Near-perfect relationship; excellent predictive accuracy</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Note: These thresholds apply equally to positive and negative
          correlations. An <em>r</em> = -.85 is just as strong as{" "}
          <em>r</em> = +.85; only the direction differs.
        </p>

        {/* 5. Assumptions - 4 Cards */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of Correlation Analysis
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before interpreting your correlation results, verify that these
          assumptions are met:
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Linearity</p>
            <p className="mt-1 text-sm text-gray-600">
              Pearson&apos;s <em>r</em> assumes a linear relationship between the
              two variables. Always inspect a scatter plot first. If the
              relationship is curved (e.g., U-shaped or logarithmic),
              Pearson&apos;s <em>r</em> will underestimate the true strength of
              the association. In such cases, consider Spearman&apos;s rho or a
              non-linear transformation.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              2. Bivariate Normality{" "}
              <span className="text-xs font-normal text-gray-500">(Pearson only)</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Pearson&apos;s <em>r</em> assumes that both variables are
              approximately normally distributed. This assumption is important
              primarily for significance testing and confidence intervals. With
              sample sizes above 30, the test is reasonably robust to moderate
              violations. For non-normal data, use Spearman&apos;s rho instead.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Continuous Data</p>
            <p className="mt-1 text-sm text-gray-600">
              Both variables should be measured on a continuous scale (interval
              or ratio) for Pearson&apos;s <em>r</em>. If either variable is
              ordinal (e.g., Likert-type ratings, class rank), use
              Spearman&apos;s rho, which operates on ranks and does not require
              continuous measurement.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. No Significant Outliers</p>
            <p className="mt-1 text-sm text-gray-600">
              Outliers can dramatically inflate or deflate Pearson&apos;s{" "}
              <em>r</em>. A single extreme data point can shift the correlation
              from near zero to strong (or vice versa). Always visualize your
              data with a scatter plot to identify outliers. If outliers are
              present, consider removing them with justification or switching to
              Spearman&apos;s rho.
            </p>
          </div>
        </div>

        {/* 6. Correlation ≠ Causation */}
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Correlation Does Not Imply Causation
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            One of the most important principles in statistics is that{" "}
            <strong>correlation does not equal causation</strong>. A strong
            correlation between two variables means they tend to move together,
            but it does not prove that one variable causes the other to change.
          </p>
          <p className="mt-3 text-gray-600 leading-relaxed">
            There are three possible explanations for any observed correlation:
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1 text-gray-600">
            <li>
              <strong>Direct causation:</strong> X actually causes Y (or Y causes X).
            </li>
            <li>
              <strong>Reverse causation:</strong> The causal direction is
              opposite to what you assumed.
            </li>
            <li>
              <strong>Third variable (confound):</strong> An unmeasured variable
              Z causes both X and Y, creating a spurious correlation.
            </li>
          </ul>
          <p className="mt-3 text-gray-600 leading-relaxed">
            <strong>Classic example:</strong> Ice cream sales and drowning deaths
            are strongly positively correlated. Does ice cream cause drowning?
            Of course not. The confounding variable is <em>temperature</em> --
            hot weather increases both ice cream consumption and swimming
            activity, leading to more drownings. Without controlling for
            temperature, you would incorrectly conclude a causal link between
            ice cream and drowning.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            To establish causation, you need a well-designed experimental study
            with random assignment, or use advanced techniques like instrumental
            variables, regression discontinuity, or difference-in-differences.
          </p>
        </div>

        {/* 7. APA Reporting Templates */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Correlation in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, correlation results should
          include the correlation coefficient, degrees of freedom (N - 2), the
          p-value, and ideally the 95% confidence interval. Here are templates
          with actual numbers you can adapt:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Pearson Correlation
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A Pearson correlation was computed to assess the relationship
              between weekly study hours and exam scores. There was a strong
              positive correlation between the two variables,{" "}
              <em>r</em>(8) = .87, <em>p</em> &lt; .001, 95% CI [.53, .97].
              Students who spent more hours studying per week tended to achieve
              higher exam scores.
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Spearman Correlation
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A Spearman rank-order correlation was computed to assess the
              relationship between customer satisfaction ratings and repurchase
              frequency. There was a moderate positive correlation,{" "}
              <em>r<sub>s</sub></em>(48) = .52, <em>p</em> &lt; .001.
              Customers who reported higher satisfaction levels tended to
              repurchase more frequently.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report correlation coefficients to two decimal places without a
          leading zero (e.g., .87 not 0.87). Report <em>p</em>-values to three
          decimal places, except use <em>p</em> &lt; .001 when the value is
          below .001. Degrees of freedom for correlation are N - 2.
        </p>

        {/* 8. Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Confusing correlation with causation:</strong> A significant
            correlation only indicates that two variables are related; it does
            not mean one causes the other. Always consider confounding variables
            and avoid causal language (e.g., say &quot;associated with&quot;
            rather than &quot;caused by&quot;).
          </li>
          <li>
            <strong>Ignoring outliers:</strong> A single outlier can
            dramatically change Pearson&apos;s <em>r</em>. For example, one
            extreme data point can turn a weak correlation into a strong one
            (or vice versa). Always inspect scatter plots before reporting
            results.
          </li>
          <li>
            <strong>Restricted range:</strong> If your sample covers only a
            narrow range of one variable, the observed correlation will be
            attenuated (weakened). For example, correlating GPA and GRE scores
            among admitted graduate students (already high on both) will
            underestimate the true population correlation.
          </li>
          <li>
            <strong>Using Pearson with non-linear data:</strong> Pearson&apos;s{" "}
            <em>r</em> only captures linear relationships. If the scatter plot
            shows a clear curve (e.g., quadratic, logarithmic), Pearson&apos;s{" "}
            <em>r</em> will underestimate the true association. Use
            Spearman&apos;s rho or transform the data.
          </li>
          <li>
            <strong>Reporting <em>p</em> = .000:</strong> Statistical software
            sometimes displays p = .000. Always report this as{" "}
            <em>p</em> &lt; .001. A <em>p</em>-value is never exactly zero.
          </li>
        </ul>

        {/* 9. Calculation Accuracy Box */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s correlation calculations have been validated against
            R&apos;s <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">cor.test()</code>{" "}
            function. We compute Pearson&apos;s <em>r</em> using the standard
            product-moment formula and Spearman&apos;s <em>rho</em> using ranked
            values. Significance testing uses the <em>t</em>-distribution with
            N - 2 degrees of freedom. The 95% confidence interval for
            Pearson&apos;s <em>r</em> is computed via Fisher&apos;s{" "}
            <em>z</em>-transformation. All results match R output to at least 4
            decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/correlation" />
    </div>
  );
}

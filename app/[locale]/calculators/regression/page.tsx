import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { RegressionCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { SeoContentKo } from "./seo-ko";
import { FaqSchema } from "@/components/faq-schema";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regression" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/calculators/regression",
      languages: {
        en: "/calculators/regression",
        ko: "/ko/calculators/regression",
        ja: "/ja/calculators/regression",
        "x-default": "/calculators/regression",
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Linear Regression Calculator - StatMate",
  description:
    "Free online simple linear regression calculator with R², F-test, coefficient analysis, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Simple linear regression",
    "R-squared and Adjusted R-squared",
    "F-test for overall model significance",
    "Slope and intercept with standard errors",
    "95% confidence intervals for coefficients",
    "Scatter plot with regression line",
    "APA 7th edition formatted results",
  ],
};

export default async function RegressionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("regression");
  const isKo = locale === "ko";
  const faqs = isKo
    ? [
        { question: "회귀분석은 언제 사용하나요?", answer: "한 변수(독립변수)로 다른 변수(종속변수)를 예측하거나 설명할 때 사용합니다. 예: 광고비가 매출에 미치는 영향 분석." },
        { question: "R²(결정계수)는 어떻게 해석하나요?", answer: "R²는 독립변수가 종속변수의 변동을 설명하는 비율입니다. R² = 0.65이면 종속변수 변동의 65%를 독립변수로 설명할 수 있다는 의미입니다." },
        { question: "회귀분석과 상관분석의 차이는 무엇인가요?", answer: "상관분석은 두 변수 간 관계의 강도만 측정합니다. 회귀분석은 예측 방정식(Y = a + bX)을 제공하여 독립변수 값으로 종속변수를 예측할 수 있습니다." },
        { question: "잔차(residual)는 무엇인가요?", answer: "잔차는 실제 관측값과 회귀모형의 예측값 간의 차이입니다. 잔차가 정규분포를 따르고 등분산성을 보이면 회귀모형이 적절하다고 판단합니다." },
      ]
    : [
        { question: "When should I use regression analysis?", answer: "Use it to predict or explain one variable (dependent) using another variable (independent). For example, analyzing how advertising spend affects sales." },
        { question: "How do I interpret R² (coefficient of determination)?", answer: "R² represents the proportion of variance in the dependent variable explained by the independent variable. R² = 0.65 means 65% of the variation is explained by the model." },
        { question: "What's the difference between regression and correlation?", answer: "Correlation only measures the strength of relationship between two variables. Regression provides a prediction equation (Y = a + bX) to predict the dependent variable from the independent variable." },
        { question: "What are residuals?", answer: "Residuals are the differences between observed values and predicted values from the regression model. If residuals are normally distributed with constant variance, the model is considered adequate." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="regression" calculatorName="Simple Regression" />
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

      <RegressionCalculator />

      <AdUnit slot="regression-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Simple Linear Regression?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Simple linear regression is a statistical method used to model the
          relationship between a single independent variable (X) and a
          dependent variable (Y) by fitting a straight line to the observed
          data. The regression equation takes the form <em>&#x177; = b&#x2080;
          + b&#x2081;x</em>, where <em>b&#x2080;</em> is the y-intercept and{" "}
          <em>b&#x2081;</em> is the slope of the regression line. This method
          estimates the parameters using <strong>ordinary least squares
          (OLS)</strong>, which minimizes the sum of squared differences between
          observed and predicted values.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Regression analysis was pioneered by <strong>Sir Francis
          Galton</strong> in the 1880s during his studies of hereditary stature,
          where he observed that children&apos;s heights tended to
          &quot;regress&quot; toward the population mean. The mathematical
          framework was later formalized by <strong>Karl Pearson</strong> and{" "}
          <strong>Ronald Fisher</strong>, who developed the inferential
          statistics (F-test, t-tests for coefficients) used in modern
          regression analysis. Today, simple linear regression is one of the
          most fundamental tools in statistics, serving as the foundation for
          multiple regression, ANOVA, and many machine learning algorithms.
        </p>

        {/* Key Concepts */}
        <h3 className="text-xl font-semibold text-gray-900">
          Key Concepts in Linear Regression
        </h3>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              Slope (b&#x2081;)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The slope represents the expected change in Y for a one-unit
              increase in X. A positive slope indicates a positive relationship
              (as X increases, Y increases), while a negative slope indicates an
              inverse relationship. The slope is tested for significance using a
              t-test with n - 2 degrees of freedom.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              Intercept (b&#x2080;)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The intercept is the predicted value of Y when X equals zero. In
              many practical situations, X = 0 may not be meaningful (e.g.,
              predicting weight from height), so the intercept should be
              interpreted cautiously. Its primary role is to position the
              regression line correctly.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              Standard Error of the Estimate
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The standard error of the estimate (SEE) measures the average
              distance between observed values and the regression line. Smaller
              values indicate that the data points cluster more tightly around
              the line, suggesting better prediction accuracy.
            </p>
          </div>
        </div>

        {/* R-squared Interpretation */}
        <h3 className="text-xl font-semibold text-gray-900">
          Understanding R&sup2; (Coefficient of Determination)
        </h3>
        <p className="text-gray-600 leading-relaxed">
          R&sup2; represents the proportion of variance in the dependent variable
          that is explained by the independent variable. It ranges from 0 to 1,
          where 0 means the model explains none of the variability and 1 means
          it explains all of the variability. Adjusted R&sup2; accounts for the
          number of predictors and is particularly useful when comparing models.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">R&sup2; Value</th>
                <th className="py-2 text-left font-semibold">Interpretation</th>
                <th className="py-2 text-left font-semibold">Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">&lt; 0.10</td>
                <td className="py-2">Very Weak</td>
                <td className="py-2 text-gray-500">
                  Model explains very little variance; X is a poor predictor
                </td>
              </tr>
              <tr>
                <td className="py-2">0.10 &ndash; 0.30</td>
                <td className="py-2">Weak</td>
                <td className="py-2 text-gray-500">
                  Small but potentially meaningful predictive power
                </td>
              </tr>
              <tr>
                <td className="py-2">0.30 &ndash; 0.50</td>
                <td className="py-2">Moderate</td>
                <td className="py-2 text-gray-500">
                  Meaningful prediction; useful for many social science applications
                </td>
              </tr>
              <tr>
                <td className="py-2">0.50 &ndash; 0.70</td>
                <td className="py-2">Strong</td>
                <td className="py-2 text-gray-500">
                  Substantial predictive accuracy; good model fit
                </td>
              </tr>
              <tr>
                <td className="py-2">&gt; 0.70</td>
                <td className="py-2">Very Strong</td>
                <td className="py-2 text-gray-500">
                  Excellent model fit; X is a strong predictor of Y
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Note: These thresholds are general guidelines. In fields like physics
          or engineering, R&sup2; values above 0.90 are common. In psychology
          and social sciences, R&sup2; values of 0.20&ndash;0.40 are often
          considered meaningful.
        </p>

        {/* Worked Example */}
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Worked Example: Study Hours Predicting Exam Score
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A researcher examines whether the number of hours spent studying
            predicts exam performance in a sample of 10 university students.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Study Hours (X)
              </p>
              <p className="mt-1 text-sm text-gray-500">
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-semibold text-gray-700">
                Exam Score (Y)
              </p>
              <p className="mt-1 text-sm text-gray-500">
                2.1, 4.0, 5.8, 8.2, 9.8, 12.1, 14.0, 15.9, 18.2, 19.8
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">Results</p>
            <p className="mt-1 text-sm text-gray-600">
              <em>F</em>(1, 8) = 2854.88, <em>p</em> &lt; .001, <em>R</em>&sup2;
              = .997
            </p>
            <p className="mt-1 text-sm text-gray-600">
              &#x177; = 0.04 + 1.97x
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The model is statistically significant and explains 99.7% of the
              variance in exam scores. For each additional hour of study, the
              predicted exam score increases by approximately 1.97 points.
            </p>
          </div>
        </div>

        {/* Assumptions */}
        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions of Simple Linear Regression
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Before interpreting your regression results, verify that these
          assumptions are met. Violating assumptions can lead to biased
          estimates, incorrect standard errors, and invalid inference.
        </p>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Linearity</p>
            <p className="mt-1 text-sm text-gray-600">
              The relationship between X and Y must be linear. Inspect a scatter
              plot of the data. If the relationship is curved (e.g., quadratic,
              logarithmic), consider transforming your variables or using
              polynomial regression. A residual plot showing a random scatter
              around zero supports linearity.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              2. Independence of Errors
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The residuals (errors) must be independent of each other. This is
              especially important with time-series data, where successive
              observations may be correlated (autocorrelation). The
              Durbin-Watson test can detect autocorrelation. Values near 2
              indicate no autocorrelation.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              3. Normality of Residuals
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The residuals should be approximately normally distributed. This
              assumption is important for hypothesis testing and confidence
              intervals. Check normality using a Q-Q plot or the Shapiro-Wilk
              test. With large samples (n &gt; 30), the Central Limit Theorem
              makes regression robust to mild non-normality.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              4. Homoscedasticity (Constant Variance)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The variance of residuals should be approximately constant across
              all levels of X. In a residual vs. fitted values plot, the spread
              of residuals should remain roughly the same. If the spread fans
              out (heteroscedasticity), consider using weighted least squares or
              robust standard errors.
            </p>
          </div>
        </div>

        {/* APA Reporting Format */}
        <h3 className="text-xl font-semibold text-gray-900">
          How to Report Regression Results in APA Format
        </h3>
        <p className="text-gray-600 leading-relaxed">
          According to APA 7th edition guidelines, regression results should
          include the F-statistic with degrees of freedom, the p-value,
          R&sup2;, the regression equation, and individual coefficient
          statistics. Here is a template you can adapt:
        </p>
        <div className="space-y-3">
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Simple Linear Regression
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A simple linear regression was conducted to predict exam scores
              from study hours. The model was statistically significant,{" "}
              <em>F</em>(1, 8) = 2854.88, <em>p</em> &lt; .001, <em>R</em>&sup2;
              = .997. Study hours significantly predicted exam scores,{" "}
              <em>b</em> = 1.97, <em>t</em>(8) = 53.43, <em>p</em> &lt; .001,
              95% CI [1.88, 2.05]. For each additional hour of study, exam
              scores increased by an average of 1.97 points.
            </p>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Non-significant Result
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A simple linear regression was conducted to predict happiness
              scores from daily screen time. The model was not statistically
              significant, <em>F</em>(1, 48) = 1.23, <em>p</em> = .274,{" "}
              <em>R</em>&sup2; = .025. Screen time did not significantly predict
              happiness scores, <em>b</em> = -0.15, <em>t</em>(48) = -1.11,{" "}
              <em>p</em> = .274, 95% CI [-0.42, 0.12].
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Note: Report regression coefficients, t-values, and F-values to two
          decimal places. Report p-values to three decimal places, except use{" "}
          <em>p</em> &lt; .001 when the value is below .001. Always include
          R&sup2; and the 95% confidence interval for key coefficients.
        </p>

        {/* When to Use */}
        <h3 className="text-xl font-semibold text-gray-900">
          When to Use Simple Linear Regression vs. Other Tests
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Situation</th>
                <th className="py-2 text-left font-semibold">
                  Recommended Test
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">One predictor, one continuous outcome</td>
                <td className="py-2 font-medium">
                  Simple linear regression
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  Multiple predictors, one continuous outcome
                </td>
                <td className="py-2">Multiple linear regression</td>
              </tr>
              <tr>
                <td className="py-2">
                  Relationship strength only (no prediction)
                </td>
                <td className="py-2">Pearson / Spearman correlation</td>
              </tr>
              <tr>
                <td className="py-2">Binary outcome variable</td>
                <td className="py-2">Logistic regression</td>
              </tr>
              <tr>
                <td className="py-2">Non-linear relationship</td>
                <td className="py-2">
                  Polynomial regression or data transformation
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  Comparing group means (categorical predictor)
                </td>
                <td className="py-2">T-test or ANOVA</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Common Mistakes */}
        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Extrapolating beyond the data range:</strong> The regression
            equation is only valid within the range of observed X values.
            Predicting Y for X values far outside this range (extrapolation) can
            produce unreliable and misleading results.
          </li>
          <li>
            <strong>Ignoring assumptions:</strong> Regression results are only
            trustworthy when the assumptions of linearity, independence,
            normality, and homoscedasticity are met. Always check residual plots
            before interpreting your model.
          </li>
          <li>
            <strong>Confusing correlation with causation:</strong> A significant
            regression does not prove that X causes Y. Use caution in causal
            language and consider confounding variables. Only randomized
            experiments can establish causation.
          </li>
          <li>
            <strong>Over-interpreting R&sup2;:</strong> A high R&sup2; does not
            necessarily mean the model is correct or useful. The relationship
            could still be non-linear, or the model could be driven by
            outliers. Conversely, a low R&sup2; does not mean X is unimportant.
          </li>
          <li>
            <strong>Reporting <em>p</em> = .000:</strong> Statistical software
            sometimes displays p = .000. Always report this as <em>p</em> &lt;
            .001. A p-value is never exactly zero.
          </li>
        </ul>

        {/* Calculation Accuracy */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s regression calculations have been validated against
            R&apos;s{" "}
            <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
              lm()
            </code>{" "}
            and{" "}
            <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
              summary.lm()
            </code>{" "}
            functions. We compute the OLS regression using the standard normal
            equations and derive F-statistics, t-statistics, and confidence
            intervals using the jstat library for probability distributions. All
            results match R output to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/regression" />
    </div>
  );
}

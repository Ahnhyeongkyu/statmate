import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MultipleRegressionCalculator } from "./calculator";
import { SeoContentKo } from "./seo-ko";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "multipleRegression" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/multiple-regression" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Multiple Regression Calculator - StatMate",
  description:
    "Free online multiple regression calculator with R², coefficients, VIF, ANOVA table, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Multiple linear regression",
    "R-squared and Adjusted R-squared",
    "F-test for overall model significance",
    "Standardized and unstandardized coefficients",
    "Variance Inflation Factor (VIF)",
    "ANOVA table",
    "Durbin-Watson statistic",
    "95% confidence intervals for coefficients",
    "APA 7th edition formatted results",
  ],
};

export default async function MultipleRegressionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("multipleRegression");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "다중회귀분석이란?", answer: "다중회귀분석은 두 개 이상의 독립변수(예측변수)가 하나의 연속형 종속변수에 미치는 영향을 동시에 분석하는 통계 기법입니다. 각 예측변수의 고유한 기여도를 평가하며, 다른 변수를 통제한 상태에서 효과를 추정할 수 있습니다. StatMate의 다중회귀 계산기를 사용하면 R², 회귀계수, VIF 등을 간편하게 계산할 수 있습니다." },
        { question: "예측변수는 몇 개까지 포함할 수 있나요?", answer: "일반적으로 표본 크기 대비 예측변수 비율(N/k)이 10 이상이어야 합니다. 예를 들어 표본이 100명이면 최대 10개의 예측변수를 포함할 수 있습니다. 과적합을 방지하려면 이론에 기반한 변수 선택이 중요합니다." },
        { question: "다중공선성이란 무엇이고 어떻게 확인하나요?", answer: "다중공선성은 독립변수들 간에 높은 상관관계가 있을 때 발생하며, 회귀계수의 표준오차를 증가시켜 결과를 불안정하게 만듭니다. VIF(분산팽창인자)가 10 이상이면 문제가 있으므로, StatMate에서 제공하는 VIF 값을 반드시 확인하세요." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에 따르면 F-통계량, 자유도, p-값, R², 수정된 R², 그리고 각 예측변수의 B, β, t, p 값을 보고해야 합니다. StatMate는 APA 형식의 결과를 자동으로 생성하므로 논문 작성 시 바로 활용할 수 있습니다." },
      ]
    : [
        { question: "What is multiple regression analysis?", answer: "Multiple regression analysis is a statistical technique that examines how two or more independent variables (predictors) simultaneously affect a single continuous dependent variable. It estimates each predictor's unique contribution while controlling for the others. StatMate's multiple regression calculator provides R², coefficients, VIF, and ANOVA tables instantly." },
        { question: "How many predictors can I include?", answer: "The general rule is to maintain a sample-size-to-predictor ratio (N/k) of at least 10. For example, with 100 observations you can include up to 10 predictors. Including too many predictors relative to your sample size leads to overfitting and unreliable coefficient estimates." },
        { question: "What is multicollinearity and how do I check it?", answer: "Multicollinearity occurs when predictor variables are highly correlated with each other, inflating standard errors and making coefficient estimates unstable. Check the Variance Inflation Factor (VIF) provided by StatMate — values above 10 indicate problematic multicollinearity that should be addressed by removing or combining correlated predictors." },
        { question: "How do I report multiple regression results in APA format?", answer: "APA 7th edition requires reporting the F-statistic, degrees of freedom, p-value, R², adjusted R², and each predictor's B, β, t, and p values. StatMate automatically generates APA-formatted results that you can copy directly into your research paper or thesis." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="multiple-regression" calculatorName="Multiple Regression" />
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

      <MultipleRegressionCalculator />

      <AdUnit slot="multiple-regression-mid" format="horizontal" />

      {/* SEO Content */}
      {locale === "ko" ? <SeoContentKo /> : (
      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
          What is Multiple Regression Analysis?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Multiple regression analysis is a statistical technique used to examine
          the relationship between two or more independent variables (predictors)
          and a single continuous dependent variable (outcome). While simple
          regression models the effect of a single predictor, multiple regression
          incorporates several predictors simultaneously&mdash;allowing
          researchers to assess each variable&apos;s unique contribution while
          controlling for the others. The method uses Ordinary Least Squares
          (OLS) estimation, which finds the set of coefficients that minimizes
          the sum of squared residuals between observed and predicted values.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The general equation is <em>Y</em> = <em>b</em><sub>0</sub> +{" "}
          <em>b</em><sub>1</sub><em>X</em><sub>1</sub> +{" "}
          <em>b</em><sub>2</sub><em>X</em><sub>2</sub> + &hellip; +{" "}
          <em>b</em><sub>k</sub><em>X</em><sub>k</sub> + <em>e</em>, where{" "}
          <em>b</em><sub>0</sub> is the intercept,{" "}
          <em>b</em><sub>1</sub>&hellip;<em>b</em><sub>k</sub> are the
          unstandardized regression coefficients, and <em>e</em> is the
          residual error. Multiple regression is appropriate when you want to
          predict an outcome from multiple factors, understand the relative
          importance of different predictors, or estimate a variable&apos;s
          effect while holding others constant.
        </p>

        <h3 className="text-xl font-semibold text-gray-900">
          Key Statistics
        </h3>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              R&sup2; and Adjusted R&sup2;
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <em>R</em>&sup2; represents the proportion of variance in the
              dependent variable explained by the model. However, it always
              increases when predictors are added&mdash;even irrelevant ones.{" "}
              <strong>Adjusted <em>R</em>&sup2;</strong> penalizes for the
              number of predictors, making it more suitable for comparing models
              with different numbers of variables.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              F-Test and Individual t-Tests
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The <em>F</em>-test evaluates whether the overall model is
              significant (i.e., whether at least one predictor has a non-zero
              effect). Individual <em>t</em>-tests then assess each
              predictor&apos;s unique contribution while controlling for all
              other predictors in the model.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              Standardized Coefficients (<em>&beta;</em>) and VIF
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Unstandardized coefficients (<em>B</em>) are interpreted in the
              original units. Standardized coefficients (<em>&beta;</em>) allow
              direct comparison of relative predictor importance. The Variance
              Inflation Factor (VIF) detects multicollinearity&mdash;values
              above 10 indicate problematic collinearity that inflates standard
              errors and destabilizes coefficient estimates.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">
              Durbin-Watson Statistic
            </p>
            <p className="mt-1 text-sm text-gray-600">
              The Durbin-Watson statistic tests for autocorrelation in
              residuals, ranging from 0 to 4. Values near <strong>2</strong>{" "}
              indicate no autocorrelation. Values near 0 suggest positive
              autocorrelation; values near 4 suggest negative autocorrelation.
              The acceptable range is typically 1.5&ndash;2.5.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          Multiple Regression vs. Other Methods
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">Method</th>
                <th className="py-2 text-left font-semibold">Predictors</th>
                <th className="py-2 text-left font-semibold">Outcome</th>
                <th className="py-2 text-left font-semibold">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">Simple Regression</td>
                <td className="py-2 text-gray-700">1 continuous</td>
                <td className="py-2 text-gray-700">Continuous</td>
                <td className="py-2 text-gray-500">Single predictor-outcome relationship</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Multiple Regression</td>
                <td className="py-2 text-gray-700">2+ continuous</td>
                <td className="py-2 text-gray-700">Continuous</td>
                <td className="py-2 text-gray-500">Simultaneous effects of multiple predictors</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Logistic Regression</td>
                <td className="py-2 text-gray-700">Continuous / categorical</td>
                <td className="py-2 text-gray-700">Binary (0/1)</td>
                <td className="py-2 text-gray-500">Predicting binary outcomes (pass/fail)</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">ANOVA</td>
                <td className="py-2 text-gray-700">Categorical (groups)</td>
                <td className="py-2 text-gray-700">Continuous</td>
                <td className="py-2 text-gray-500">Comparing means across 3+ groups</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          Assumptions
        </h3>
        <div className="space-y-3">
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">1. Linearity</p>
            <p className="mt-1 text-sm text-gray-600">
              The relationship between each predictor and the outcome must be
              linear. Check residual-vs-predicted plots for curvilinear patterns.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">2. Independence</p>
            <p className="mt-1 text-sm text-gray-600">
              Observations must be independent. Verify with Durbin-Watson
              (1.5&ndash;2.5). Violations are common in time-series and
              clustered data.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">3. Normality of Residuals</p>
            <p className="mt-1 text-sm text-gray-600">
              Residuals should be approximately normally distributed. Robust to
              violations with larger samples (<em>N</em> &ge; 30) due to the
              Central Limit Theorem.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">4. Homoscedasticity</p>
            <p className="mt-1 text-sm text-gray-600">
              Residual variance should be constant across all predicted values.
              A &quot;funnel shape&quot; in residual plots indicates
              heteroscedasticity.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">5. No Multicollinearity (VIF &lt; 10)</p>
            <p className="mt-1 text-sm text-gray-600">
              Predictors should not be highly correlated with each other. Check
              VIF values and correlation matrices. High multicollinearity
              inflates standard errors and makes coefficient estimates unstable.
            </p>
          </div>
          <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
            <p className="font-semibold text-gray-800">6. No Autocorrelation (Durbin-Watson &asymp; 2)</p>
            <p className="mt-1 text-sm text-gray-600">
              Residuals should not be correlated with each other. Particularly
              important for time-series data. Use GLS or add lagged variables
              if violated.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          APA Reporting Format
        </h3>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">Example</p>
          <p className="mt-1 text-sm italic text-gray-600">
            A multiple regression analysis was conducted to predict GPA from
            study hours, sleep hours, and attendance rate. The model was
            statistically significant, <em>F</em>(3, 26) = 22.29,{" "}
            <em>p</em> &lt; .001, <em>R</em>&sup2; = .72, adjusted{" "}
            <em>R</em>&sup2; = .69, explaining approximately 72% of the
            variance in GPA. Study hours (<em>B</em> = 0.055,{" "}
            <em>&beta;</em> = .49, <em>t</em> = 5.50, <em>p</em> &lt; .001),
            attendance rate (<em>B</em> = 0.018, <em>&beta;</em> = .33,{" "}
            <em>t</em> = 4.50, <em>p</em> &lt; .001), and sleep hours (
            <em>B</em> = 0.112, <em>&beta;</em> = .21, <em>t</em> = 2.95,{" "}
            <em>p</em> = .007) were all significant predictors.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          Common Mistakes to Avoid
        </h3>
        <ul className="ml-4 list-disc space-y-2 text-gray-600">
          <li>
            <strong>Overfitting:</strong> Including too many predictors relative
            to sample size. Maintain <em>N</em>/<em>k</em> &gt; 10 (sample
            size to predictor ratio). With 5 predictors, you need at least 50
            observations.
          </li>
          <li>
            <strong>Ignoring multicollinearity:</strong> Failing to check VIF
            values can lead to sign reversals and inflated standard errors in
            coefficients.
          </li>
          <li>
            <strong>Confusing <em>B</em> and <em>&beta;</em>:</strong> Use{" "}
            <em>B</em> for unit-based interpretation and <em>&beta;</em> for
            comparing relative importance across predictors.
          </li>
          <li>
            <strong>Stepwise regression pitfalls:</strong> Automated variable
            selection produces sample-specific results with low
            cross-validity. Prefer theory-driven variable selection.
          </li>
          <li>
            <strong>Causal over-interpretation:</strong> Regression shows
            association, not causation. Use &quot;predicts&quot; rather than
            &quot;causes&quot; unless your design supports causal claims.
          </li>
        </ul>

        {/* Validation */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation Accuracy
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            StatMate&apos;s multiple regression calculations have been validated
            against R&apos;s{" "}
            <code className="rounded bg-green-100 px-1">lm()</code> function
            and SPSS regression output. We use OLS estimation with the jstat
            library for <em>F</em>- and <em>t</em>-distributions. All
            coefficients, standard errors, <em>t</em>-statistics,{" "}
            <em>p</em>-values, <em>R</em>&sup2;, adjusted <em>R</em>&sup2;,{" "}
            <em>F</em>-statistics, VIF, and Durbin-Watson values match R and
            SPSS output to at least 4 decimal places.
          </p>
        </div>
      </section>
      )}

      <RelatedCalculators current="/calculators/multiple-regression" />
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { LogisticRegressionCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";
import { SeoContentKo } from "./seo-ko";
import { FaqSchema, type FaqItem } from "@/components/faq-schema";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "logisticRegression" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/calculators/logistic-regression",
      languages: {
        en: "/calculators/logistic-regression",
        ko: "/ko/calculators/logistic-regression",
        ja: "/ja/calculators/logistic-regression",
        "x-default": "/calculators/logistic-regression",
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Logistic Regression Calculator - StatMate",
  description:
    "Free online binary logistic regression calculator with odds ratios, Wald test, classification table, Hosmer-Lemeshow test, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Binary logistic regression (IRLS)",
    "Odds ratios with 95% confidence intervals",
    "Wald test for individual predictors",
    "Omnibus chi-square test",
    "Cox & Snell and Nagelkerke pseudo R-squared",
    "Classification table with sensitivity and specificity",
    "Hosmer-Lemeshow goodness-of-fit test",
    "APA 7th edition formatted results",
  ],
};

export default async function LogisticRegressionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("logisticRegression");
  const isKo = locale === "ko";
  const faqs: FaqItem[] = isKo
    ? [
        { question: "로지스틱 회귀란?", answer: "로지스틱 회귀(Logistic Regression)는 종속변수가 이분형(예: 합격/불합격, 구매/비구매)일 때 사용하는 통계 분석 방법입니다. 시그모이드 함수를 사용하여 예측 확률을 0과 1 사이로 제한하며, 각 예측변수가 결과 발생 확률에 미치는 영향을 분석합니다. StatMate에서 오즈비, 분류표 등을 자동으로 계산할 수 있습니다." },
        { question: "선형회귀 대신 로지스틱 회귀를 언제 사용하나요?", answer: "종속변수가 연속형이면 선형회귀를, 이분형(0/1)이면 로지스틱 회귀를 사용합니다. 예를 들어 시험 점수를 예측할 때는 선형회귀, 합격 여부를 예측할 때는 로지스틱 회귀가 적합합니다. 연속형 종속변수에 로지스틱 회귀를 적용하면 잘못된 결과를 얻게 됩니다." },
        { question: "오즈비(OR)는 어떻게 해석하나요?", answer: "오즈비(Odds Ratio)는 예측변수가 1단위 증가할 때 결과 발생 오즈의 변화 배수입니다. OR > 1이면 발생 확률 증가, OR < 1이면 감소, OR = 1이면 효과 없음을 의미합니다. 예를 들어 OR = 1.5는 예측변수가 1단위 증가하면 결과 발생 오즈가 50% 증가한다는 뜻입니다." },
        { question: "APA 형식으로 어떻게 보고하나요?", answer: "APA 7판에서는 전체 모형의 카이제곱 검정, Nagelkerke R², 분류 정확도, 그리고 각 예측변수의 B, Wald χ², p, OR, 95% CI를 보고합니다. StatMate는 이 모든 결과를 APA 형식으로 자동 생성하여 논문 작성을 지원합니다." },
      ]
    : [
        { question: "What is logistic regression?", answer: "Logistic regression is a statistical method used when the outcome variable is binary (e.g., pass/fail, yes/no). It uses the sigmoid function to model the probability of an event occurring, constrained between 0 and 1. StatMate's logistic regression calculator provides odds ratios, classification tables, and model fit statistics automatically." },
        { question: "When should I use logistic regression instead of linear regression?", answer: "Use linear regression when your outcome is continuous, and logistic regression when your outcome is binary (0/1). For example, predicting exam scores calls for linear regression, while predicting pass/fail status requires logistic regression. Applying linear regression to a binary outcome violates key assumptions and produces misleading results." },
        { question: "How do I interpret odds ratios?", answer: "An odds ratio (OR) represents the multiplicative change in odds of the outcome for a one-unit increase in the predictor. OR > 1 indicates increased odds, OR < 1 indicates decreased odds, and OR = 1 means no effect. For example, OR = 1.5 means the odds increase by 50% for each one-unit increase in the predictor." },
        { question: "How do I report logistic regression results in APA format?", answer: "APA 7th edition requires reporting the omnibus chi-square test, Nagelkerke R², classification accuracy, and each predictor's B, Wald χ², p-value, OR, and 95% CI. StatMate automatically generates all of these results in APA format, ready to copy into your research paper or dissertation." },
      ];

  return (
    <div>
      <BreadcrumbSchema locale={locale} calculatorSlug="logistic-regression" calculatorName="Logistic Regression" />
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

      <LogisticRegressionCalculator />

      <AdUnit slot="logistic-regression-mid" format="horizontal" />

      {locale === "ko" ? (
        <SeoContentKo />
      ) : (
        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            What is Binary Logistic Regression?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Binary logistic regression is a statistical method used to model the
            relationship between one or more predictor variables and a binary
            (dichotomous) outcome variable. Unlike linear regression, which
            predicts a continuous outcome, logistic regression predicts the
            probability that an observation belongs to one of two categories
            (coded as 0 and 1). The model uses the logistic (sigmoid) function to
            constrain predicted probabilities between 0 and 1.
          </p>

          {/* Key Concepts */}
          <h3 className="text-xl font-semibold text-gray-900">
            Key Concepts in Logistic Regression
          </h3>
          <div className="space-y-3">
            <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
              <p className="font-semibold text-gray-800">
                Odds Ratio &mdash; Exp(B)
              </p>
              <p className="mt-1 text-sm text-gray-600">
                The odds ratio represents the multiplicative change in the odds of
                the outcome for a one-unit increase in the predictor. An odds ratio
                greater than 1 indicates increased odds, while a value less than 1
                indicates decreased odds. A value of exactly 1 means the predictor
                has no effect.
              </p>
            </div>
            <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
              <p className="font-semibold text-gray-800">Wald Test</p>
              <p className="mt-1 text-sm text-gray-600">
                The Wald test evaluates whether each individual predictor is
                statistically significant. It is calculated as the squared ratio of
                the coefficient to its standard error (Wald = (B/SE)&sup2;) and
                follows a chi-square distribution with 1 degree of freedom.
              </p>
            </div>
            <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
              <p className="font-semibold text-gray-800">
                Pseudo R&sup2; Measures
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Unlike linear regression, logistic regression does not have a true
                R&sup2;. Cox &amp; Snell R&sup2; and Nagelkerke R&sup2; are
                approximations that indicate how much of the variation in the
                outcome is explained by the model. Nagelkerke R&sup2; adjusts the
                Cox &amp; Snell measure to range from 0 to 1.
              </p>
            </div>
          </div>

          {/* Classification Table */}
          <h3 className="text-xl font-semibold text-gray-900">
            Understanding the Classification Table
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The classification table (confusion matrix) compares predicted
            categories with observed categories using a 0.5 probability cutoff.
            Sensitivity (true positive rate) measures how well the model
            identifies actual positives, while specificity (true negative rate)
            measures how well it identifies actual negatives. Overall accuracy
            indicates the percentage of all cases correctly classified.
          </p>

          {/* Hosmer-Lemeshow */}
          <h3 className="text-xl font-semibold text-gray-900">
            Hosmer-Lemeshow Goodness-of-Fit Test
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The Hosmer-Lemeshow test evaluates how well the model fits the data by
            dividing observations into groups based on predicted probabilities and
            comparing observed and expected frequencies. A non-significant result
            (p &gt; .05) indicates adequate model fit, meaning the model&apos;s
            predictions are consistent with the observed data.
          </p>

          {/* APA Reporting */}
          <h3 className="text-xl font-semibold text-gray-900">
            How to Report Logistic Regression Results in APA Format
          </h3>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700">
              Example APA Report
            </p>
            <p className="mt-1 text-sm italic text-gray-600">
              A binary logistic regression was conducted to predict purchase
              behavior from age and income. The overall model was statistically
              significant, <em>&chi;</em>&sup2;(2) = 15.43, <em>p</em> &lt; .001,
              Nagelkerke <em>R</em>&sup2; = .42. The model correctly classified
              85.0% of cases. Age was a significant predictor, <em>B</em> = 0.12,
              Wald <em>&chi;</em>&sup2;(1) = 6.78, <em>p</em> = .009, OR = 1.13,
              95% CI [1.03, 1.24].
            </p>
          </div>

          {/* Calculation Accuracy */}
          <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Calculation Accuracy
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              StatMate&apos;s logistic regression uses the Iteratively Reweighted
              Least Squares (IRLS) algorithm, the same method used by R&apos;s{" "}
              <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
                glm()
              </code>{" "}
              and SPSS. Convergence is checked at each iteration with a tolerance
              of 10&sup-;8. The implementation includes separation detection and
              uses jstat for chi-square probability distributions.
            </p>
          </div>
        </section>
      )}

      <RelatedCalculators current="/calculators/logistic-regression" />
    </div>
  );
}

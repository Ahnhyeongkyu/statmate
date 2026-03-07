import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getPost, getAllSlugs } from "@/lib/blog";
import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { AdUnit, AD_SLOTS } from "@/components/adsense";

const BLOG_CALCULATOR_MAP: Record<string, string> = {
  "t-test-apa-reporting": "t-test",
  "how-to-run-t-test": "t-test",
  "t-test-vs-mann-whitney": "t-test",
  "one-sample-t-test-apa-reporting": "one-sample-t",
  "anova-apa-reporting": "anova",
  "how-to-run-anova": "anova",
  "anova-vs-kruskal-wallis": "anova",
  "two-way-anova-apa-reporting": "two-way-anova",
  "repeated-measures-anova-apa-reporting": "repeated-measures",
  "how-to-run-repeated-measures-anova": "repeated-measures",
  "chi-square-apa-reporting": "chi-square",
  "how-to-run-chi-square-test": "chi-square",
  "chi-square-vs-fisher-exact": "chi-square",
  "correlation-apa-reporting": "correlation",
  "how-to-run-correlation-analysis": "correlation",
  "correlation-vs-regression": "correlation",
  "regression-apa-reporting": "regression",
  "how-to-run-regression-analysis": "regression",
  "simple-vs-multiple-regression": "multiple-regression",
  "logistic-regression-apa-reporting": "logistic-regression",
  "how-to-run-logistic-regression": "logistic-regression",
  "factor-analysis-apa-reporting": "factor-analysis",
  "how-to-run-factor-analysis": "factor-analysis",
  "mann-whitney-apa-reporting": "mann-whitney",
  "how-to-run-mann-whitney-test": "mann-whitney",
  "wilcoxon-apa-reporting": "wilcoxon",
  "paired-t-test-vs-wilcoxon": "wilcoxon",
  "kruskal-wallis-apa-reporting": "kruskal-wallis",
  "fisher-exact-test-apa-reporting": "fisher-exact",
  "reliability-cronbach-alpha": "cronbach-alpha",
  "how-to-calculate-sample-size": "sample-size",
  "sample-size-determination": "sample-size",
  "descriptive-statistics-apa-reporting": "descriptive",
  "cohen-d-apa-reporting": "t-test",
  "understanding-effect-size": "anova",
  "understanding-p-value": "t-test",
  "normality-test-guide": "t-test",
  "nonparametric-tests-guide": "mann-whitney",
  "choosing-statistical-test": "t-test",
};

function getRelatedCalculator(slug: string): string {
  return BLOG_CALCULATOR_MAP[slug] || "t-test";
}

// HowTo steps data for how-to blog posts (used for HowTo JSON-LD schema)
const HOW_TO_STEPS: Record<string, { name: string; text: string }[]> = {
  "how-to-run-t-test": [
    { name: "State Your Hypotheses", text: "Define your null and alternative hypotheses clearly before analyzing any data." },
    { name: "Collect and Organize Your Data", text: "Gather your data into two groups (independent) or paired measurements and organize them in a table." },
    { name: "Calculate Descriptive Statistics", text: "Compute the mean, standard deviation, and sample size for each group." },
    { name: "Check Assumptions", text: "Verify independence of observations, normality of data, and homogeneity of variances using Levene's test." },
    { name: "Calculate the T Statistic", text: "Apply the t-test formula using pooled variance for independent samples or difference scores for paired samples." },
    { name: "Determine the P Value", text: "Look up the p value using the t statistic and degrees of freedom to assess statistical significance." },
    { name: "Calculate Effect Size", text: "Compute Cohen's d to measure the practical significance of the difference between groups." },
    { name: "Interpret the Results", text: "Report means, standard deviations, t statistic, p value, and effect size in APA format." },
  ],
  "how-to-run-anova": [
    { name: "State Your Hypotheses", text: "Define the null hypothesis that all group means are equal and the alternative that at least one differs." },
    { name: "Collect and Organize Your Data", text: "Organize continuous outcome data into three or more groups based on the independent variable." },
    { name: "Calculate Descriptive Statistics", text: "Compute the mean, standard deviation, and sample size for each group and the grand mean." },
    { name: "Check Assumptions", text: "Verify independence of observations, normality within each group, and homogeneity of variances using Levene's test." },
    { name: "Calculate the ANOVA Table", text: "Partition total variance into between-groups and within-groups sums of squares, compute mean squares and the F statistic." },
    { name: "Determine Statistical Significance", text: "Compare the F statistic to the critical value or use the p value to decide whether to reject the null hypothesis." },
    { name: "Calculate Effect Size", text: "Compute eta-squared or omega-squared to quantify the proportion of variance explained by the grouping variable." },
    { name: "Run Post-Hoc Tests", text: "Use Tukey HSD or Bonferroni-corrected comparisons to identify which specific group pairs differ significantly." },
    { name: "Interpret and Report the Results", text: "Report the F statistic, degrees of freedom, p value, effect size, and post-hoc results in APA format." },
  ],
  "how-to-run-chi-square-test": [
    { name: "State Your Hypotheses", text: "Define the null hypothesis that two categorical variables are independent and the alternative that they are associated." },
    { name: "Organize Data in a Contingency Table", text: "Arrange frequency counts in a cross-tabulation table with rows and columns representing the two variables." },
    { name: "Calculate Expected Frequencies", text: "Compute expected frequencies for each cell using the formula: (Row Total x Column Total) / Grand Total." },
    { name: "Check Assumptions", text: "Verify independence of observations and that no more than 20% of expected frequencies are below 5." },
    { name: "Calculate the Chi-Square Statistic", text: "Sum (Observed - Expected)^2 / Expected across all cells of the contingency table." },
    { name: "Determine Degrees of Freedom", text: "Calculate df = (number of rows - 1) x (number of columns - 1)." },
    { name: "Find the P Value", text: "Use the chi-square statistic and degrees of freedom to determine statistical significance." },
    { name: "Calculate Effect Size", text: "Compute Cramer's V to measure the strength of the association between variables." },
    { name: "Examine the Pattern", text: "Compare observed and expected values or column percentages to understand the nature of the association." },
    { name: "Report the Results", text: "Report chi-square value, degrees of freedom, sample size, p value, and Cramer's V in APA format." },
  ],
  "how-to-run-correlation-analysis": [
    { name: "State Your Hypotheses", text: "Define the null hypothesis that no linear relationship exists and the alternative that a relationship exists." },
    { name: "Collect and Organize Your Data", text: "Gather paired measurements for two variables and organize them in a table." },
    { name: "Check Assumptions", text: "Verify linearity using a scatter plot, check normality of both variables, look for outliers, and assess homoscedasticity." },
    { name: "Calculate the Correlation Coefficient", text: "Compute Pearson's r for linear relationships between continuous variables or Spearman's rs for ordinal or non-normal data." },
    { name: "Test Statistical Significance", text: "Calculate the t statistic from the correlation coefficient and determine the p value." },
    { name: "Calculate the Coefficient of Determination", text: "Square the correlation coefficient (r-squared) to find the proportion of shared variance." },
    { name: "Interpret the Results", text: "Report the correlation coefficient, degrees of freedom, p value, and r-squared in APA format." },
  ],
  "how-to-run-mann-whitney-test": [
    { name: "Enter Your Data", text: "Input the data for each independent group, with values separated by commas or line breaks." },
    { name: "Configure the Test", text: "Set the significance level (typically 0.05) and choose between one-tailed or two-tailed testing." },
    { name: "Run the Analysis", text: "Rank all values from both groups combined, compute the U statistic, and perform the significance test." },
    { name: "Review the Results", text: "Examine the U statistic, z-score, p value, rank-biserial correlation effect size, and medians for both groups." },
  ],
  "how-to-run-regression-analysis": [
    { name: "Define Your Research Question", text: "Identify the predictor variable (X) and outcome variable (Y) and formulate a clear research question." },
    { name: "Collect and Organize Your Data", text: "Gather paired measurements of the predictor and outcome variables." },
    { name: "Visualize the Data", text: "Create a scatter plot to verify linearity, spot outliers, and get an initial sense of the relationship." },
    { name: "Check Assumptions", text: "Verify linearity, independence of residuals, homoscedasticity, normality of residuals, and absence of influential outliers." },
    { name: "Calculate the Regression Equation", text: "Compute the slope (b1) and intercept (b0) to form the equation Y = b0 + b1 * X." },
    { name: "Assess Model Fit", text: "Calculate R-squared, adjusted R-squared, and the standard error of the estimate to evaluate how well the model fits." },
    { name: "Test Statistical Significance", text: "Run the F-test for overall model significance and t-test for the slope coefficient." },
    { name: "Make Predictions", text: "Use the regression equation to predict Y values for given X values within the observed data range." },
    { name: "Examine Residuals", text: "Check residual plots for patterns that might indicate model misspecification." },
    { name: "Report the Results", text: "Report the regression equation, R-squared, F statistic, slope with confidence interval, and p value in APA format." },
  ],
  "how-to-run-logistic-regression": [
    { name: "Check Assumptions", text: "Verify binary dependent variable, independence of observations, linearity of logit, no multicollinearity (VIF), adequate sample size, and no extreme outliers." },
    { name: "Fit the Model", text: "Estimate coefficients using maximum likelihood estimation for the logistic regression equation." },
    { name: "Interpret the Coefficients", text: "Convert coefficients to odds ratios (e^B) and interpret the change in odds for each one-unit increase in predictors." },
    { name: "Evaluate Model Fit", text: "Assess overall significance with omnibus chi-square test, calibration with Hosmer-Lemeshow test, and pseudo R-squared values." },
    { name: "Check for Influential Observations", text: "Examine Cook's distance and leverage values to identify potentially influential data points." },
    { name: "Report Your Results", text: "Report model chi-square, R-squared, classification accuracy, odds ratios with 95% CI, and p values in APA format." },
  ],
  "how-to-run-factor-analysis": [
    { name: "Check Your Sample Size", text: "Ensure at least 5-10 participants per variable, with a minimum of 100 observations for stable factor solutions." },
    { name: "Assess Data Suitability", text: "Run KMO measure (should be above .60) and Bartlett's test of sphericity (should be significant) to verify data is appropriate for factor analysis." },
    { name: "Choose the Extraction Method", text: "Select Principal Axis Factoring for most EFA applications or Maximum Likelihood if data are normally distributed." },
    { name: "Determine the Number of Factors", text: "Use Kaiser's criterion (eigenvalue > 1), scree plot elbow method, and parallel analysis to decide how many factors to retain." },
    { name: "Choose a Rotation Method", text: "Use oblique rotation (Promax) as default; switch to orthogonal (Varimax) only if factor correlations are below .32." },
    { name: "Interpret the Factor Loadings", text: "Examine the rotated factor loading matrix. Loadings above .55 are good; handle cross-loadings above .32 on multiple factors." },
    { name: "Evaluate the Solution", text: "Check communalities (above .40), total variance explained (aim for 50-60%+), and factor correlations for the final solution." },
  ],
  "how-to-run-repeated-measures-anova": [
    { name: "Check for Outliers", text: "Create boxplots for each time point or condition and inspect for extreme values beyond 1.5 IQR." },
    { name: "Test Normality", text: "Apply the Shapiro-Wilk test at each time point to verify approximate normal distribution." },
    { name: "Test Sphericity", text: "Run Mauchly's test to check if variances of differences between all condition pairs are equal. Apply Greenhouse-Geisser or Huynh-Feldt correction if violated." },
    { name: "Run the Repeated Measures ANOVA", text: "Partition variability into between-subjects, within-subjects effect, and error components. Compute the F statistic." },
    { name: "Post-Hoc Pairwise Comparisons", text: "Run Bonferroni-corrected pairwise comparisons to identify which specific time points or conditions differ." },
    { name: "Report Your Results", text: "Report Mauchly's test result, F statistic with degrees of freedom, p value, partial eta-squared, and post-hoc comparison results in APA format." },
  ],
  "how-to-calculate-sample-size": [
    { name: "Select the Test Type", text: "Choose the statistical test you plan to use (t-test, ANOVA, correlation, chi-square) as different tests have different sample size formulas." },
    { name: "Determine the Effect Size", text: "Estimate the expected effect size from prior literature, pilot studies, or Cohen's benchmarks (small, medium, large)." },
    { name: "Set Alpha and Power", text: "Set the significance level (typically 0.05) and target power (typically 0.80 or higher for confirmatory research)." },
    { name: "Calculate the Required Sample Size", text: "Enter parameters into the calculator to determine the minimum number of participants per group or total." },
    { name: "Plan for Attrition", text: "Inflate the calculated sample size by 10-20% to account for participant dropout and unusable data." },
  ],
};

export async function generateStaticParams() {
  const koSlugs = getAllSlugs("ko").map((slug) => ({ locale: "ko", slug }));
  const enSlugs = getAllSlugs("en").map((slug) => ({ locale: "en", slug }));
  const jaSlugs = getAllSlugs("ja").map((slug) => ({ locale: "ja", slug }));
  return [...koSlugs, ...enSlugs, ...jaSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: locale === "en" ? `/blog/${slug}` : `/${locale}/blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        ko: `/ko/blog/${slug}`,
        ja: `/ja/blog/${slug}`,
        "x-default": `/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);

  if (!post) notFound();

  const relatedCalc = getRelatedCalculator(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "StatMate" },
    publisher: { "@type": "Organization", name: "StatMate" },
  };

  const howToSteps = HOW_TO_STEPS[slug];
  const howToJsonLd = howToSteps
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.title,
        description: post.description,
        step: howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      <Link
        href="/blog"
        className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {locale === "ko" ? "블로그 목록" : locale === "ja" ? "ブログ一覧" : "Back to Blog"}
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          {post.category && (
            <Badge variant="secondary">{post.category}</Badge>
          )}
          <span className="text-sm text-gray-400">{post.readingTime}</span>
          <span className="text-sm text-gray-400">{post.date}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {post.title}
        </h1>
        <p className="mt-2 text-lg text-gray-500">{post.description}</p>
      </header>

      <MdxContent source={post.content} />

      <AdUnit slot={AD_SLOTS.blog} format="fluid" layout="in-article" />

      {/* Blog Post CTA */}
      <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
        <h3 className="text-xl font-bold">
          {locale === "ko"
            ? "지금 바로 계산해 보세요"
            : locale === "ja" ? "今すぐ計算してみましょう" : "Try It Now"}
        </h3>
        <p className="mt-2 text-sm text-blue-100">
          {locale === "ko"
            ? "StatMate의 무료 통계 계산기로 데이터를 분석하고 APA 형식 결과를 받아보세요."
            : locale === "ja" ? "StatMateの無料統計計算ツールでデータを分析し、APA形式の結果を取得しましょう。" : "Analyze your data with StatMate's free calculators and get APA-formatted results instantly."}
        </p>
        <Link
          href={`/calculators/${relatedCalc}`}
          className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          {locale === "ko" ? "계산기 시작하기" : locale === "ja" ? "計算を始める" : "Start Calculating"}
        </Link>
      </div>

      {/* Newsletter */}
      <div className="mt-8">
        <NewsletterSignup />
      </div>
    </div>
  );
}

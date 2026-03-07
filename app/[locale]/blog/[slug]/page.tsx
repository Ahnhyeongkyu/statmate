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

// FAQ data for blog posts (used for FAQPage JSON-LD schema)
const FAQ_DATA: Record<string, { question: string; answer: string }[]> = {
  "anova-apa-reporting": [
    { question: "What is the difference between eta squared and partial eta squared?", answer: "Eta squared shows the proportion of total variance explained by a factor, while partial eta squared shows the proportion after removing other factors' effects. They are identical in one-way ANOVA but differ in factorial designs. Most software, including SPSS, reports partial eta squared by default." },
    { question: "Should I report post-hoc tests if ANOVA is not significant?", answer: "No. Post-hoc tests are only appropriate when the omnibus F test is significant. A non-significant ANOVA means there is insufficient evidence of group differences, so pairwise comparisons are not warranted." },
    { question: "What does F(2, 87) mean?", answer: "The first number (2) is the between-groups degrees of freedom, calculated as the number of groups minus 1. The second number (87) is the within-groups degrees of freedom, calculated as the total sample size minus the number of groups." },
    { question: "Can I use Cohen's d as the effect size for ANOVA?", answer: "No. Cohen's d is designed for two-group comparisons. For the omnibus ANOVA test, use partial eta squared or omega squared. You may report Cohen's d for individual pairwise comparisons in post-hoc analyses." },
    { question: "What if my data violates the normality assumption?", answer: "ANOVA is robust to moderate violations of normality, especially with equal group sizes and n > 30 per group. For severe violations, consider the Kruskal-Wallis H test as a non-parametric alternative." },
    { question: "How do I choose between Tukey HSD and Bonferroni?", answer: "Tukey HSD is designed specifically for all pairwise comparisons and is more powerful when comparing every group pair. Bonferroni is more flexible and can be used for planned comparisons or a subset of pairwise comparisons." },
    { question: "Should I report effect size even when results are not significant?", answer: "Yes. APA 7th edition requires effect sizes for all inferential tests, regardless of significance. Non-significant effect sizes are valuable for meta-analyses and future power analyses." },
    { question: "What is the difference between one-way, two-way, and repeated measures ANOVA?", answer: "One-way ANOVA compares means across groups of one independent variable. Two-way ANOVA tests two independent variables and their interaction simultaneously. Repeated measures ANOVA compares means when the same participants are measured multiple times." },
  ],
  "t-test-apa-reporting": [
    { question: "What is the difference between a one-tailed and two-tailed t-test?", answer: "A two-tailed test checks for any difference between groups, while a one-tailed test checks for a difference in a specific direction. Two-tailed tests are standard in most research because they are more conservative and do not assume the direction of the effect." },
    { question: "Should I always report Cohen's d with a t-test?", answer: "Yes. APA 7th edition requires an effect size measure for all inferential tests. Cohen's d is the standard effect size for t-tests, quantifying the difference between groups in standard deviation units." },
    { question: "What does a negative t-value mean?", answer: "A negative t-value simply means the first group's mean is lower than the second group's mean. The sign depends on which group is subtracted from which and does not affect the significance of the test." },
    { question: "How do I report t-test results when p is less than .001?", answer: "Report as p < .001 rather than the exact value. Never write p = .000, as probability is never exactly zero. Example: t(58) = 4.23, p < .001, d = 1.11." },
    { question: "Can I use a t-test with more than two groups?", answer: "No. T-tests are designed for comparing exactly two groups. For three or more groups, use one-way ANOVA to avoid inflating the Type I error rate from multiple comparisons." },
    { question: "What if my data is not normally distributed?", answer: "For moderate non-normality with n > 30, the t-test is robust due to the Central Limit Theorem. For severe non-normality or small samples, use the Mann-Whitney U test (independent samples) or Wilcoxon signed-rank test (paired samples)." },
    { question: "What is the minimum sample size for a t-test?", answer: "There is no strict minimum, but most guidelines suggest at least 15-20 per group for adequate power to detect medium effects. Use a power analysis to determine the sample size needed for your specific effect size and desired power." },
    { question: "Should I report Levene's test before an independent samples t-test?", answer: "Yes, it is good practice. If Levene's test is significant (p < .05), the equal variances assumption is violated, and you should report Welch's t-test instead of Student's t-test." },
  ],
  "chi-square-apa-reporting": [
    { question: "What is the difference between chi-square test of independence and goodness-of-fit?", answer: "The test of independence examines whether two categorical variables are related using a contingency table. The goodness-of-fit test examines whether a single variable's observed distribution matches an expected distribution. Both use the chi-square statistic but have different purposes." },
    { question: "What should I do if expected frequencies are below 5?", answer: "If more than 20% of cells have expected frequencies below 5, the chi-square approximation is unreliable. Use Fisher's exact test for 2x2 tables, or combine categories to increase expected frequencies for larger tables." },
    { question: "Can I use chi-square with ordinal variables?", answer: "Yes, but chi-square treats all categories as nominal and ignores the ordering. For ordinal data, consider the Cochran-Armitage trend test or Spearman correlation, which account for the natural ordering of categories." },
    { question: "How do I interpret Cramér's V?", answer: "Cramér's V ranges from 0 to 1, where 0 means no association and 1 means perfect association. For a 2x2 table: .10 is small, .30 is medium, .50 is large. For larger tables, the benchmarks decrease as the table dimensions increase." },
    { question: "What is the minimum sample size for a chi-square test?", answer: "There is no absolute minimum, but all expected cell frequencies should be at least 1, and no more than 20% should be below 5. In practice, this typically requires at least 20-30 total observations for a 2x2 table." },
    { question: "Can chi-square test more than two variables at once?", answer: "The standard chi-square test examines the association between exactly two variables. For three or more variables, use log-linear analysis or stratified chi-square tests (Cochran-Mantel-Haenszel test)." },
    { question: "Should I report observed and expected frequencies?", answer: "Reporting observed frequencies is essential. Expected frequencies help readers evaluate which cells deviate most from independence. Include them in a table for larger contingency tables, or mention key deviations in the text." },
    { question: "What is the difference between chi-square and Fisher's exact test?", answer: "Chi-square uses a large-sample approximation, while Fisher's exact test calculates exact probabilities. Fisher's is preferred for small samples (expected frequencies below 5) and 2x2 tables. For larger tables with adequate sample size, chi-square is standard." },
  ],
  "regression-apa-reporting": [
    { question: "What is the difference between R² and adjusted R²?", answer: "R² shows the proportion of variance explained by all predictors combined. Adjusted R² corrects for the number of predictors, penalizing models with unnecessary variables. Use adjusted R² when comparing models with different numbers of predictors." },
    { question: "How do I interpret a negative regression coefficient?", answer: "A negative coefficient means that as the predictor increases by one unit, the outcome decreases by the coefficient's value, holding other predictors constant. The sign indicates the direction of the relationship, not its strength." },
    { question: "Should I report standardized or unstandardized coefficients?", answer: "APA recommends reporting both. Unstandardized coefficients (B) preserve the original measurement units for practical interpretation. Standardized coefficients (β) allow comparison of relative predictor importance within the model." },
    { question: "What does a VIF greater than 10 mean?", answer: "A Variance Inflation Factor above 10 indicates severe multicollinearity, meaning two or more predictors are highly correlated. This inflates standard errors and makes individual coefficient tests unreliable. Consider removing or combining correlated predictors." },
    { question: "Can I use regression with categorical predictors?", answer: "Yes, by converting categorical variables into dummy variables (0/1 coding). A variable with k categories requires k-1 dummy variables. The reference category is represented when all dummy variables equal zero." },
    { question: "How do I report regression results when the model is not significant?", answer: "Report the same statistics as for a significant model: F statistic, degrees of freedom, p value, and R². Example: The regression model was not statistically significant, F(2, 97) = 1.45, p = .240, R² = .03." },
    { question: "What is the difference between simple and multiple regression?", answer: "Simple regression uses one predictor variable to explain the outcome, while multiple regression uses two or more predictors simultaneously. Multiple regression accounts for the shared and unique variance explained by each predictor." },
    { question: "Should I report confidence intervals for regression coefficients?", answer: "Yes. APA 7th edition recommends reporting 95% confidence intervals for regression coefficients. CIs provide information about the precision of the estimate and whether the coefficient is significantly different from zero." },
  ],
  "t-test-vs-mann-whitney": [
    { question: "Can I use a t-test if my data is slightly non-normal?", answer: "Yes. The t-test is robust to moderate normality violations, especially with sample sizes above 30 per group. However, for severe skewness, heavy tails, or small samples, the Mann-Whitney U test is more appropriate." },
    { question: "What effect size should I report for Mann-Whitney U?", answer: "Report the rank-biserial correlation r, calculated as r = Z / sqrt(N). Benchmarks are the same as Pearson's r: .10 small, .30 medium, .50 large." },
    { question: "Is Mann-Whitney the same as Wilcoxon rank-sum test?", answer: "Yes. The Mann-Whitney U test and the Wilcoxon rank-sum test are mathematically equivalent tests for comparing two independent groups. They differ from the Wilcoxon signed-rank test, which is for paired samples." },
    { question: "Should I always run a normality test before choosing?", answer: "Not necessarily. With large samples (n > 30), normality tests often reject normality for trivial deviations. Consider the research context, examine Q-Q plots visually, and base your decision on the distribution shape rather than relying solely on test p-values." },
    { question: "Can Mann-Whitney handle tied values?", answer: "Yes, but many ties reduce the test's power. The standard Mann-Whitney formula includes a tie correction. If more than 15-20% of values are tied, consider alternative approaches or report the tie-corrected z statistic." },
    { question: "What sample size is needed for a Mann-Whitney test?", answer: "A minimum of 5 observations per group is needed for the test to be meaningful. For adequate power to detect medium effects, aim for at least 20-30 per group. Use a power analysis for precise planning." },
    { question: "Is Welch's t-test a good compromise between t-test and Mann-Whitney?", answer: "Welch's t-test handles unequal variances but still assumes approximate normality. It is a better default than Student's t-test but does not address non-normality. For non-normal data, Mann-Whitney remains the appropriate choice." },
    { question: "Can I use Mann-Whitney with ordinal data?", answer: "Yes. Mann-Whitney works with ordinal data because it operates on ranks rather than raw values. This makes it suitable for Likert-scale items and other ordered categorical variables." },
  ],
  "understanding-effect-size": [
    { question: "Can Cohen's d be greater than 1?", answer: "Yes. A d value greater than 1 means the two group means differ by more than one standard deviation. While uncommon, very large effects in some domains can produce d values of 2.0 or higher." },
    { question: "What does a negative effect size mean?", answer: "A negative effect size indicates the direction of the difference, not a smaller effect. For example, a negative d means the second group scored higher than the first. The sign depends on which group is subtracted from which." },
    { question: "Which effect size should I report for my analysis?", answer: "Use Cohen's d for t-tests, partial eta squared for ANOVA, r or R-squared for correlation and regression, and Cramér's V for chi-square tests. Always match the effect size measure to the statistical test." },
    { question: "Does a large effect size prove causation?", answer: "No. Effect size quantifies the magnitude of a relationship or difference but says nothing about causation. Causal claims require experimental designs with proper controls, not just large effect sizes." },
    { question: "What is the effect size for non-parametric tests?", answer: "For the Mann-Whitney U test, report rank-biserial correlation r. For the Wilcoxon signed-rank test, report r = Z / sqrt(N). For the Kruskal-Wallis test, report epsilon squared. For Friedman's test, report Kendall's W." },
    { question: "How does SPSS calculate effect sizes?", answer: "SPSS reports partial eta squared by default for ANOVA. For t-tests, Cohen's d must be calculated manually or using a calculator. SPSS does not automatically output Cohen's d or omega squared." },
    { question: "What is the relationship between sample size and effect size?", answer: "Effect size and sample size are independent — a larger sample does not create a larger effect. However, small samples produce less precise effect size estimates with wider confidence intervals." },
    { question: "Should I report effect size for non-significant results?", answer: "Yes. APA 7th edition requires effect sizes for all inferential tests. Non-significant results with effect sizes provide valuable information for meta-analyses and statistical power planning." },
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

  const faqItems = FAQ_DATA[slug];
  const faqJsonLd = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

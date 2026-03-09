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
  "understanding-p-value": [
    { question: "Does p < .05 mean there is a 95% chance my result is true?", answer: "No. This is one of the most common misunderstandings. The p-value is the probability of observing your data (or more extreme) if the null hypothesis is true. It does not tell you the probability that your hypothesis is correct." },
    { question: "What does p = .049 vs p = .051 really mean?", answer: "Practically, there is no meaningful difference. The .05 threshold is an arbitrary convention. A p-value of .051 does not mean 'no effect' while .049 means 'real effect.' Both indicate similar levels of evidence against the null hypothesis." },
    { question: "Can a p-value be exactly 0?", answer: "No. A p-value represents a probability and can never be exactly zero. When software displays p = .000, report it as p < .001. There is always some non-zero probability of observing the data under the null hypothesis." },
    { question: "Why do some journals require p < .01 instead of p < .05?", answer: "Stricter thresholds reduce false positive rates. Fields with replication concerns or multiple testing situations may adopt more conservative thresholds. Some researchers have proposed p < .005 as a new standard for claims of discovery." },
    { question: "Should I report exact p-values or just p < .05?", answer: "APA 7th edition requires exact p-values (e.g., p = .034) rather than inequality statements (p < .05). The only exception is for very small values, which are reported as p < .001." },
    { question: "What is the relationship between p-values and confidence intervals?", answer: "They are complementary. If a 95% confidence interval for a mean difference does not include zero, the corresponding p-value will be less than .05. Confidence intervals provide additional information about the magnitude and precision of the effect." },
    { question: "Can I compare p-values across different studies?", answer: "No. P-values depend on sample size, effect size, and study design. A p = .001 from a large study does not necessarily indicate a larger effect than p = .04 from a small study. Compare effect sizes instead." },
    { question: "What should I do if my p-value is .06?", answer: "Report it honestly as non-significant at the .05 level. Discuss the effect size, confidence interval, and practical implications. Avoid phrases like 'marginally significant' or 'approaching significance,' which are considered p-hacking." },
  ],
  "correlation-apa-reporting": [
    { question: "What is the difference between Pearson and Spearman correlation?", answer: "Pearson's r measures the strength of a linear relationship between two continuous, normally distributed variables. Spearman's rs measures the monotonic relationship using ranks and is appropriate for ordinal data or when normality is violated." },
    { question: "Can a correlation be exactly 0?", answer: "In theory, r = 0 means no linear relationship. In practice, sample correlations are rarely exactly zero. A very small, non-significant r (e.g., .03) is interpreted as no meaningful relationship." },
    { question: "How do I report a non-significant correlation?", answer: "Use the same format as significant results. Example: There was no statistically significant correlation between X and Y, r(48) = .12, p = .410. Always include the effect size regardless of significance." },
    { question: "What sample size do I need for correlation analysis?", answer: "To detect a medium correlation (r = .30) with 80% power at alpha = .05, you need approximately 85 participants. For small correlations (r = .10), you need about 782 participants." },
    { question: "Can I correlate categorical variables?", answer: "Pearson and Spearman correlations require at least ordinal data. For two categorical variables, use Cramér's V or phi coefficient from a chi-square test. For one categorical and one continuous variable, use point-biserial correlation." },
    { question: "What does r² tell me that r does not?", answer: "r² (coefficient of determination) represents the proportion of shared variance between two variables. While r = .50 sounds moderate, r² = .25 reveals that only 25% of variance is shared, providing a more intuitive measure of practical significance." },
    { question: "Should I use one-tailed or two-tailed tests for correlation?", answer: "Use two-tailed tests unless you have a strong theoretical reason to predict the direction of the relationship before collecting data. Most journals expect two-tailed tests as the default." },
    { question: "How do I handle outliers in correlation analysis?", answer: "First, examine scatter plots to identify outliers. Report the correlation both with and without outliers if removal substantially changes r. Consider using Spearman's correlation, which is less sensitive to outliers than Pearson's r." },
  ],
  "logistic-regression-apa-reporting": [
    { question: "What is the difference between binary, multinomial, and ordinal logistic regression?", answer: "Binary logistic regression predicts a dichotomous outcome (two categories). Multinomial logistic regression predicts an outcome with three or more unordered categories (e.g., preferred transportation: car, bus, bicycle). Ordinal logistic regression predicts an outcome with ordered categories (e.g., disease severity: mild, moderate, severe). Each type produces odds ratios, but the interpretation and model structure differ." },
    { question: "How do I interpret an odds ratio less than 1?", answer: "An OR less than 1.00 indicates decreased odds of the outcome. Calculate (1 - OR) x 100 for the percentage decrease. For example, OR = 0.65 means a 35% decrease in odds per one-unit increase in the predictor. Some researchers report the reciprocal (1/OR) to express the protective effect as increased odds." },
    { question: "What is the minimum sample size for logistic regression?", answer: "The classic guideline is at least 10 events per predictor variable (EPV), where events are cases in the less frequent outcome category. More recent research recommends EPV of 20 or higher for stable estimates. For 5 predictors with a 30% event rate, you need at least 50 events (total N of approximately 167)." },
    { question: "Should I use forward, backward, or enter method for variable selection?", answer: "The Enter (forced entry) method is recommended for confirmatory research because it tests theory-driven predictor sets. Forward and backward stepwise methods are exploratory and may produce models that do not replicate. If using stepwise methods, report them as exploratory and validate on an independent sample." },
    { question: "How do I report logistic regression with interaction terms?", answer: "Report main effects first, then the interaction term with its odds ratio and confidence interval. Explain the interaction substantively. For example: The interaction between treatment and gender was significant, OR = 2.18, 95% CI [1.12, 4.24], p = .022, indicating the treatment effect was stronger for females." },
    { question: "What is the Hosmer-Lemeshow test and when should I report it?", answer: "The Hosmer-Lemeshow test evaluates whether predicted probabilities match observed outcomes across subgroups. A non-significant result (p > .05) indicates adequate model fit. Report it to strengthen your write-up, but note it is sensitive to sample size: large samples may flag trivial deviations, while small samples may miss genuine lack of fit." },
    { question: "What is the difference between the Wald test and the likelihood ratio test?", answer: "The Wald test evaluates individual predictor coefficients using the coefficient-to-standard-error ratio. The likelihood ratio test compares nested models. The likelihood ratio test is generally more reliable, especially for large coefficients where the Wald test can be conservative due to the Hauck-Donner effect." },
    { question: "How do I handle missing data in logistic regression?", answer: "Standard logistic regression uses listwise deletion, dropping all cases with any missing value. This can reduce sample size and introduce bias. Consider multiple imputation if missingness exceeds 5% on any variable. Always report the amount of missing data and the method used to handle it." },
  ],
  "descriptive-statistics-apa-reporting": [
    { question: "How many decimal places should I use for means and standard deviations?", answer: "Report means (M) and standard deviations (SD) to two decimal places with trailing zeros. Write M = 25.40, not M = 25.4. This applies to all continuous descriptive statistics in your manuscript. The exception is when the original measurement has no decimal places, though even then two decimal places are standard practice in APA." },
    { question: "Should I report descriptive statistics in a table or in the text?", answer: "Use text when you have one or two groups with a single dependent variable. Use a table when you have three or more groups, multiple dependent variables, or both. Tables with fewer than two rows and two columns of data are generally unnecessary. The key principle is efficiency: present numbers in whichever format lets readers absorb them most quickly." },
    { question: "When should I report the median instead of the mean?", answer: "Report the median (Mdn) instead of or alongside the mean when your data are substantially skewed, contain extreme outliers, or are measured on an ordinal scale. Common examples include income data, response time data, and individual Likert-scale items. Pair the median with the interquartile range (IQR) rather than the standard deviation." },
    { question: "Do I need to report skewness and kurtosis in every paper?", answer: "No. Skewness and kurtosis are required only when you need to justify your choice of parametric versus non-parametric tests or when your analysis plan includes explicit assumption checking. However, many reviewers in psychology and education expect these values, especially for small samples where the Central Limit Theorem provides less protection." },
    { question: "What is the difference between n and N in APA format?", answer: "N (uppercase, italicized) refers to the total number of participants in the entire sample. n (lowercase, italicized) refers to the number of participants in a specific subgroup or condition. Always report N for the total sample and n for subgroups so readers can evaluate group sizes and statistical power." },
    { question: "How do I report percentages in APA format?", answer: "Report frequencies and percentages together: 45 (37.5%). Use one decimal place for percentages unless they are whole numbers. Do not begin a sentence with a numeral; instead restructure the sentence. In tables, present the percentage symbol (%) in the column header, not in each cell." },
    { question: "Should I report both M and SD for every variable?", answer: "Yes. A mean without a standard deviation is incomplete because it provides no information about variability. Readers need the SD to evaluate whether the mean is representative of the data, to assess group overlap, and to interpret effect sizes. APA 7th edition requires both for all continuous variables." },
    { question: "How do I report descriptive statistics for Likert-scale data?", answer: "This depends on whether you treat Likert items individually or as a composite scale. For individual items (ordinal data), report the median and frequency distribution. For composite scales computed by summing or averaging multiple items (treated as continuous), report the mean and standard deviation. Always state the possible range and what higher scores indicate." },
  ],
  "wilcoxon-apa-reporting": [
    { question: "What is the difference between the Wilcoxon signed-rank test and the Wilcoxon rank-sum test?", answer: "The Wilcoxon signed-rank test is for paired (related) samples, such as pre-test and post-test measurements from the same participants. The Wilcoxon rank-sum test (also called the Mann-Whitney U test) is for two independent groups. Despite sharing the Wilcoxon name, they test different hypotheses: the signed-rank test evaluates whether the median of paired differences is zero, while the rank-sum test evaluates whether one group tends to have larger values than the other." },
    { question: "Can I use the Wilcoxon signed-rank test with Likert scale data?", answer: "Yes. The Wilcoxon signed-rank test is appropriate for ordinal data, including individual Likert-type items. Because it operates on ranks rather than raw values, it does not require the equal-interval assumption that the paired t-test needs. However, if you have a composite scale computed from multiple Likert items (which approximates a continuous distribution), a paired t-test may be acceptable if differences are approximately normal." },
    { question: "What sample size do I need for the Wilcoxon signed-rank test?", answer: "There is no strict minimum, but at least 5-6 pairs are needed for the exact test to produce a significant result at alpha = .05. For adequate power to detect a medium effect (r = .30), aim for at least 25-30 pairs. The Z approximation becomes reliable with approximately 20 or more pairs. Always conduct a power analysis for your specific effect size and desired power level." },
    { question: "Should I report the exact or asymptotic p-value?", answer: "For small samples (fewer than approximately 20-25 pairs), report the exact p-value because the normal approximation may not be accurate. For larger samples, the asymptotic (Z-based) p-value is acceptable and is what most software outputs by default. If your software provides both, report the exact value for small samples and note which method was used." },
    { question: "How do I handle zero differences (ties with zero)?", answer: "Pairs with zero differences contribute no information about the direction of change and are excluded from the analysis by most software. Report the number of excluded pairs. The effective sample size for computing the effect size should reflect the number of non-zero pairs, though practices vary across sources." },
    { question: "Can I use the Wilcoxon test for more than two time points?", answer: "Not directly. The Wilcoxon signed-rank test compares exactly two related conditions. For three or more time points, use the Friedman test as the omnibus test, followed by pairwise Wilcoxon signed-rank tests with Bonferroni correction as post-hoc comparisons. Alternatively, conduct pairwise comparisons directly with an adjusted significance level." },
    { question: "What is the Hodges-Lehmann estimator and should I report it?", answer: "The Hodges-Lehmann estimator is the nonparametric equivalent of the mean difference. For paired data, it equals the median of all Walsh averages of the difference scores. Reporting it with a confidence interval is recommended because it provides a robust point estimate of the typical shift between conditions, supplementing the median difference and effect size with a measure of precision." },
    { question: "Is the Wilcoxon test assumption-free?", answer: "No. While the Wilcoxon signed-rank test does not assume normality of differences, it does assume that the paired differences are independent of each other, the differences are measured on at least an ordinal scale, and the distribution of differences is symmetric around the median (though this assumption is debated and the test is fairly robust to mild asymmetry). Violations of independence are more problematic than violations of symmetry." },
  ],
  "one-sample-t-test-apa-reporting": [
    { question: "What is the difference between a one-sample t-test and a z-test?", answer: "Both compare a sample mean to a known value, but the z-test requires the population standard deviation to be known, which is rare in practice. The one-sample t-test uses the sample standard deviation instead, making it suitable for virtually all real-world applications. When N is greater than 30, the two tests yield nearly identical results." },
    { question: "Can I use a one-sample t-test with a small sample (N < 10)?", answer: "Technically yes, but the normality assumption becomes critical with very small samples because the Central Limit Theorem provides minimal protection. Verify normality with a Shapiro-Wilk test and Q-Q plot. The test will have low statistical power, so consider the Wilcoxon signed-rank test as a non-parametric alternative." },
    { question: "How do I choose the test value (mu) for a one-sample t-test?", answer: "The test value must be theoretically or practically justified. Common sources include published population norms (e.g., IQ mean of 100), regulatory standards, scale midpoints, or values from prior research. Avoid selecting the test value based on your data, as this invalidates the test." },
    { question: "What sample size do I need for a one-sample t-test?", answer: "For a two-tailed test with alpha = .05 and power = .80: d = 0.20 (small) requires N = 199; d = 0.50 (medium) requires N = 34; d = 0.80 (large) requires N = 15. Use a formal power analysis for your specific effect size and desired power level." },
    { question: "Is the one-sample t-test robust to non-normality?", answer: "The one-sample t-test is moderately robust to non-normality, especially with N > 30 due to the Central Limit Theorem. However, with small samples and severely skewed or heavy-tailed distributions, the test can produce misleading p-values. Use the Wilcoxon signed-rank test or bootstrapped confidence intervals in such cases." },
    { question: "Should I report Cohen's d or Hedges' g for a one-sample t-test?", answer: "Cohen's d is the standard effect size for one-sample t-tests. Hedges' g applies a small-sample correction that becomes negligible with N > 20. If your sample is very small (N < 20), Hedges' g provides a less biased estimate. In most cases, Cohen's d is sufficient and expected by reviewers." },
    { question: "Can I use a one-sample t-test for pre-post comparisons?", answer: "No. If you measure the same participants at two time points, use a paired-samples t-test. A one-sample t-test on post-test scores compared to the pre-test mean ignores the paired structure of the data and typically has lower power. The only equivalent approach is testing whether the mean of difference scores differs from zero." },
    { question: "How do I report a one-sample t-test in a table?", answer: "When reporting multiple one-sample t-tests, use a table with columns for Variable, M, SD, t(df), p, d, and 95% CI. Include a note below the table specifying the test value and its source. This format is efficient when comparing several subscale means to a single norm." },
  ],
  "kruskal-wallis-apa-reporting": [
    { question: "Can I use the Kruskal-Wallis test with only two groups?", answer: "Technically, the Kruskal-Wallis test with two groups produces results equivalent to the Mann-Whitney U test. However, the Mann-Whitney U test is the standard choice for two-group comparisons because it provides additional statistics (the U statistic, rank-biserial correlation) that are more informative and familiar to reviewers. Use Kruskal-Wallis for three or more groups, and Mann-Whitney U for exactly two groups." },
    { question: "What descriptive statistics should I report alongside Kruskal-Wallis results?", answer: "Report medians (Mdn) and interquartile ranges (IQR) as your primary descriptive statistics. You may also report mean ranks if they help clarify the group ordering. Avoid reporting means and standard deviations as the sole descriptive statistics because they assume a symmetric distribution, which contradicts your rationale for choosing a nonparametric test." },
    { question: "How many groups can a Kruskal-Wallis test compare?", answer: "There is no theoretical upper limit on the number of groups. However, as the number of groups increases, the number of pairwise post-hoc comparisons grows rapidly (k(k-1)/2 comparisons for k groups). With 5 groups, you have 10 pairwise comparisons; with 7 groups, you have 21. More comparisons mean stricter corrections and reduced power per comparison." },
    { question: "What is the relationship between the Kruskal-Wallis H statistic and chi-square?", answer: "The H statistic follows an approximate chi-square distribution with k-1 degrees of freedom, where k is the number of groups. This approximation is adequate when each group has at least 5 observations. For smaller samples, the exact permutation distribution should be used instead." },
    { question: "Should I report mean ranks or medians?", answer: "Both are valid, but medians are more commonly expected in APA-style reporting because they are directly interpretable on the original measurement scale. Mean ranks indicate the average position of each group's observations in the overall ranking. When distributions differ in shape (not just location), mean ranks and medians may diverge, and you should report both." },
    { question: "How do I handle tied values in a Kruskal-Wallis test?", answer: "Tied values receive the average of the ranks they would have occupied. Most software automatically applies a tie correction to the H statistic. The correction slightly increases the H value, making the test marginally more conservative. When many ties exist, always verify that your software applied the tie correction." },
    { question: "Can I use Kruskal-Wallis for ordinal data like Likert scales?", answer: "Yes. The Kruskal-Wallis test is specifically designed for ordinal and non-normally distributed continuous data. For individual Likert items, the test is appropriate because the data are ordinal. For composite Likert scales (averages or sums of multiple items), Kruskal-Wallis remains valid if the composite is not normally distributed." },
    { question: "What do I do when the Kruskal-Wallis test is non-significant?", answer: "Report the result in full, including the effect size: H(df) = X.XX, p = .XXX, epsilon-squared = .XX. State that no statistically significant differences were found. Do not conduct post-hoc comparisons. Report descriptive statistics (medians, IQRs) so readers can evaluate the magnitude of observed differences even without statistical significance." },
  ],
  "mann-whitney-apa-reporting": [
    { question: "How do I calculate the Mann-Whitney U statistic by hand?", answer: "Rank all observations from both groups together from smallest to largest. Sum the ranks for each group separately (R1 and R2). Then calculate U1 = n1*n2 + n1(n1+1)/2 - R1 and U2 = n1*n2 + n2(n2+1)/2 - R2. Report the smaller U value (or as specified by your software)." },
    { question: "Can I use Mann-Whitney U with ordinal Likert-scale data?", answer: "Yes. Mann-Whitney U is ideal for Likert-scale data because it operates on ranks rather than raw values. However, tied ranks are common with Likert scales, so use the tie-corrected z-statistic and report whether you used exact or asymptotic p-values." },
    { question: "What is the minimum sample size for a Mann-Whitney U test?", answer: "The test can technically be performed with as few as 4 observations per group, but statistical power is very low. For adequate power to detect a medium effect (r = .30) with 80% power, aim for at least 20-30 observations per group." },
    { question: "Is Mann-Whitney U the same as the Wilcoxon rank-sum test?", answer: "Yes, they are mathematically equivalent tests for comparing two independent groups. The Mann-Whitney U test and Wilcoxon rank-sum test produce the same p-value. Do not confuse the Wilcoxon rank-sum test with the Wilcoxon signed-rank test, which is for paired samples." },
    { question: "What is the Hodges-Lehmann estimator and when should I report it?", answer: "The Hodges-Lehmann estimator is the median of all pairwise differences between the two groups. It provides a robust measure of the location shift directly connected to the Mann-Whitney U test. Report it when you want to quantify the group difference in the original measurement units, especially when APA 7th edition encourages confidence intervals for effects." },
    { question: "How does Mann-Whitney U handle ties in the data?", answer: "When multiple observations share the same value, they receive the average of the ranks they would have occupied (midranks). A tie correction factor is applied to the variance of the U statistic when computing the z-score. Most statistical software applies this correction automatically. If ties are extensive (more than 15-20% of observations), mention the tie correction in your report." },
    { question: "Can I use Mann-Whitney U for more than two groups?", answer: "No. Mann-Whitney U is designed for exactly two independent groups. For three or more groups, use the Kruskal-Wallis H test. If the Kruskal-Wallis test is significant, perform post-hoc pairwise Mann-Whitney U tests with Bonferroni correction." },
    { question: "What is the difference between one-sided and two-sided Mann-Whitney U tests?", answer: "A two-sided test evaluates whether the distributions of the two groups differ in either direction, while a one-sided test evaluates whether one specific group tends to produce larger values. Most research uses two-sided tests by default. Use a one-sided test only if you have a strong a priori directional hypothesis, and report this choice explicitly in your methods section." },
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
  "two-way-anova-apa-reporting": [
    { question: "What is the difference between a two-way ANOVA and two separate one-way ANOVAs?", answer: "A two-way ANOVA tests both main effects and their interaction simultaneously. It detects interaction effects that separate one-way ANOVAs cannot, uses a single error term for greater power, and partitions variance more accurately. Running two separate one-way ANOVAs inflates the Type I error rate and misses the interaction entirely." },
    { question: "How do I interpret a significant interaction but non-significant main effects?", answer: "This pattern is common with disordinal (crossover) interactions where factor levels reverse their ordering across conditions. The marginal means average out, producing non-significant main effects. Conduct simple effects analysis to determine where the differences lie. Do not conclude that neither factor has an effect." },
    { question: "What is the difference between partial eta-squared and generalized eta-squared?", answer: "Partial eta-squared is computed as SS_effect / (SS_effect + SS_error) and is most commonly reported. Generalized eta-squared (Olejnik & Algina, 2003) accounts for measured vs. manipulated factors and is recommended for comparing effect sizes across different study designs. For standard between-subjects designs, the two measures are identical." },
    { question: "Can I use a two-way ANOVA with unequal sample sizes?", answer: "Yes, but unequal cell sizes make main effects and interaction non-orthogonal. Use Type III sums of squares, which test each effect after adjusting for all others regardless of entry order. Report cell sizes explicitly and acknowledge the unbalanced design." },
    { question: "How many participants do I need per cell in a two-way ANOVA?", answer: "Aim for at least 20 participants per cell for medium effects (partial eta-squared around .06) with 80% power. For small effects, you may need 50 or more per cell. Use a priori power analysis to determine the exact number. Fewer than 10 per cell makes the ANOVA sensitive to assumption violations." },
    { question: "Should I always interpret the interaction before the main effects?", answer: "Yes. The interaction determines how you interpret the main effects. If significant, main effects are qualified and cannot be taken at face value. If not significant, main effects can be interpreted independently. This hierarchical approach prevents the most common reporting error in factorial ANOVA." },
    { question: "What should I do if the interaction is marginally significant (e.g., p = .06)?", answer: "Report the exact p-value and avoid the term 'marginally significant.' Describe the result objectively and examine the effect size. If partial eta-squared exceeds .04, acknowledge this and suggest future research with larger samples. Do not conduct simple effects analysis for a non-significant interaction." },
    { question: "How do I report a two-way ANOVA with both between-subjects and within-subjects factors?", answer: "This is a mixed ANOVA (split-plot ANOVA), not a standard two-way ANOVA. Report Mauchly's test of sphericity for the within-subjects factor, apply Greenhouse-Geisser or Huynh-Feldt correction if violated, and use appropriate error terms for between- and within-subjects effects." },
  ],
  "repeated-measures-anova-apa-reporting": [
    { question: "What is the difference between repeated measures ANOVA and one-way ANOVA?", answer: "One-way ANOVA compares means across groups of different participants (between-subjects), while repeated measures ANOVA compares means across conditions measured on the same participants (within-subjects). Repeated measures ANOVA is more powerful because it removes individual differences from the error term, but requires the sphericity assumption." },
    { question: "Can I use repeated measures ANOVA with only two time points?", answer: "Technically yes, but a paired-samples t-test is preferred. With two conditions, sphericity is automatically satisfied, and F equals t-squared. The paired t-test is simpler to report. Reserve repeated measures ANOVA for three or more conditions." },
    { question: "What should I do if my data violates sphericity?", answer: "Apply the Greenhouse-Geisser correction (default) or Huynh-Feldt correction (when epsilon is above .75). These reduce degrees of freedom, making the F test more conservative. Report the epsilon value and correction method. Alternatively, use multivariate tests (MANOVA), which do not assume sphericity." },
    { question: "How do I handle missing data in repeated measures ANOVA?", answer: "Traditional repeated measures ANOVA uses listwise deletion, removing participants with any missing value. Alternatives include multiple imputation or switching to a linear mixed model, which handles missing data under the missing-at-random assumption without deleting cases." },
    { question: "What is the minimum sample size for repeated measures ANOVA?", answer: "For three conditions with a medium effect (f = .25), alpha = .05, and power = .80, you need approximately 28 participants. Required sample size decreases as the number of conditions or correlation between conditions increases. Use G*Power for formal power analysis." },
    { question: "Should I report partial eta squared or generalized eta squared?", answer: "Partial eta squared is the standard for within-subjects designs and is reported by most software including SPSS. Generalized eta squared (Olejnik & Algina, 2003) is preferred for meta-analytic comparisons across studies with different designs. Report partial eta squared unless your field or journal specifically requires generalized eta squared." },
    { question: "How do I report a non-significant repeated measures ANOVA?", answer: "Use the same format as significant results, including the effect size. Example: F(2, 78) = 1.24, p = .295, partial eta squared = .03. Do not conduct post-hoc pairwise comparisons when the omnibus test is non-significant." },
    { question: "What is a mixed-design ANOVA and how do I report it?", answer: "A mixed-design ANOVA combines between-subjects and within-subjects factors. Report three effects: between-subjects main effect, within-subjects main effect, and interaction. Test sphericity only for within-subjects effects. When the interaction is significant, follow up with simple effects analysis." },
  ],
  "fisher-exact-test-apa-reporting": [
    { question: "What is Fisher's exact test used for?", answer: "Fisher's exact test evaluates whether there is a statistically significant association between two categorical variables arranged in a contingency table. It calculates the exact probability of observing the data under the null hypothesis of independence. It is used instead of the chi-square test when sample sizes are small or when expected cell frequencies fall below the threshold required for the chi-square approximation to be reliable. The test is most commonly applied to 2x2 tables but can be extended to larger tables using the Freeman-Halton extension." },
    { question: "Can Fisher's exact test be used with large samples?", answer: "Yes. Fisher's exact test produces valid results at any sample size. The test was originally developed for small samples because exact computation was expensive, but modern software handles even large tables efficiently. Some statisticians recommend Fisher's exact test as the universal default for all 2x2 tables. The only practical limitation is computational: for very large R x C tables, Monte Carlo simulation may be used instead of exact enumeration." },
    { question: "What is the difference between Fisher's exact test and chi-square?", answer: "The chi-square test calculates an approximate p value based on the chi-square distribution, which assumes large expected cell frequencies. Fisher's exact test calculates the exact p value by enumerating all possible tables with the same marginal totals. When expected frequencies are adequate (all cells >= 5), both tests produce similar results. When expected frequencies are low, Fisher's exact test is preferred because the chi-square approximation becomes unreliable." },
    { question: "How do I calculate the odds ratio from a 2x2 table?", answer: "For a 2x2 table with cells labeled a, b, c, d (where a and b are in row 1, c and d are in row 2), the odds ratio is calculated as OR = (a x d) / (b x c). An OR greater than 1 indicates higher odds of the outcome in the first row group. An OR of exactly 1 indicates no association. Always report the 95% confidence interval alongside the point estimate." },
    { question: "What does a non-significant Fisher's exact test mean?", answer: "A non-significant result (p > .05) means there is insufficient evidence to conclude that an association exists between the two variables. It does not prove independence. With small samples, Fisher's exact test has limited statistical power. Report the effect size (OR and 95% CI) even for non-significant results, as this information is valuable for future meta-analyses and power calculations." },
    { question: "Should I report Fisher's exact test if chi-square is also available?", answer: "If your expected cell frequencies meet the Cochran guideline (no more than 20% below 5, none below 1), reporting the chi-square test is standard and preferred because it includes a test statistic and degrees of freedom. If expected frequencies are inadequate, Fisher's exact test should be reported instead. If you run both and results diverge, report Fisher's exact test and note the discrepancy." },
    { question: "How do I report Fisher's exact test in SPSS output?", answer: "In SPSS, Fisher's exact test appears in the Chi-Square Tests output table as 'Fisher's Exact Test' with columns for Exact Sig. (2-sided) and Exact Sig. (1-sided). Report the two-sided value unless you have a justified directional hypothesis. Use the Risk Estimate table for the odds ratio and its 95% CI. Report as: Fisher's exact test, p = .XXX, OR = X.XX, 95% CI [X.XX, X.XX]." },
    { question: "Can Fisher's exact test be used for tables larger than 2x2?", answer: "Yes. The Freeman-Halton extension generalizes Fisher's exact test to any R x C table. Most modern software (R, Python, SAS, Stata) supports this extension. For tables beyond approximately 6x6 or with large marginals, the computation may require Monte Carlo simulation. Report the table dimensions, the percentage of cells with expected frequencies below 5, the exact or simulated p value, and Cramer's V as the effect size." },
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

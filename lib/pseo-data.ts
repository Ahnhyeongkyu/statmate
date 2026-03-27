// lib/pseo-data.ts — pSEO data for 100 landing pages (20 calculators x 5 fields)

export const FIELDS = ["psychology", "biology", "marketing", "education", "healthcare"] as const;
export type Field = (typeof FIELDS)[number];

export const CALCULATOR_SLUGS = [
  "t-test", "anova", "chi-square", "correlation", "descriptive",
  "regression", "sample-size", "one-sample-t", "mann-whitney", "wilcoxon",
  "multiple-regression", "cronbach-alpha", "logistic-regression", "factor-analysis",
  "kruskal-wallis", "repeated-measures", "two-way-anova", "friedman",
  "fisher-exact", "mcnemar",
] as const;
export type CalculatorSlug = (typeof CALCULATOR_SLUGS)[number];

export interface PseoPageData {
  title: string;
  description: string;
  h1: string;
  heroText: string;
  scenario: string;
  whyUse: string[];
  faqs: { q: string; a: string }[];
}

const CALCULATOR_NAMES: Record<CalculatorSlug, string> = {
  "t-test": "T-Test",
  "anova": "One-Way ANOVA",
  "chi-square": "Chi-Square Test",
  "correlation": "Correlation Analysis",
  "descriptive": "Descriptive Statistics",
  "regression": "Simple Regression",
  "sample-size": "Sample Size Calculator",
  "one-sample-t": "One-Sample T-Test",
  "mann-whitney": "Mann-Whitney U Test",
  "wilcoxon": "Wilcoxon Signed-Rank Test",
  "multiple-regression": "Multiple Regression",
  "cronbach-alpha": "Cronbach's Alpha",
  "logistic-regression": "Logistic Regression",
  "factor-analysis": "Factor Analysis",
  "kruskal-wallis": "Kruskal-Wallis Test",
  "repeated-measures": "Repeated Measures ANOVA",
  "two-way-anova": "Two-Way ANOVA",
  "friedman": "Friedman Test",
  "fisher-exact": "Fisher's Exact Test",
  "mcnemar": "McNemar Test",
};

const FIELD_NAMES: Record<Field, string> = {
  psychology: "Psychology",
  biology: "Biology",
  marketing: "Marketing",
  education: "Education",
  healthcare: "Healthcare",
};

export function getCalculatorName(slug: CalculatorSlug): string {
  return CALCULATOR_NAMES[slug];
}

export function getFieldName(field: Field): string {
  return FIELD_NAMES[field];
}

// ---------------------------------------------------------------------------
// Data store — keyed by "calculator::field"
// ---------------------------------------------------------------------------

type DataKey = `${CalculatorSlug}::${Field}`;

const DATA: Record<DataKey, PseoPageData> = {
  // =========================================================================
  // T-TEST
  // =========================================================================
  "t-test::psychology": {
    title: "T-Test for Psychology — Free Online Calculator",
    description: "Compare means between experimental and control groups in psychology research. Run independent or paired t-tests with APA-formatted results instantly.",
    h1: "T-Test Calculator for Psychology Research",
    heroText: "The t-test is the workhorse of experimental psychology, letting you determine whether an intervention produced a real change in behavior or cognition. Whether you are comparing CBT to a waitlist control or measuring pre- and post-therapy anxiety scores, the t-test gives you a clear yes-or-no answer.",
    scenario: "A clinical psychologist wants to know whether 8 weeks of cognitive-behavioral therapy reduces anxiety scores compared to a waitlist control group. She recruits 30 participants per condition and measures anxiety using the GAD-7. An independent-samples t-test reveals whether the mean difference is statistically significant.",
    whyUse: [
      "Quickly compare treatment vs. control group outcomes on Likert-scale measures like the BDI-II or PHQ-9",
      "Get APA-formatted output (t, df, p, Cohen's d) ready to paste into your manuscript",
      "Run paired t-tests to analyze within-subject pre/post designs common in therapy outcome research",
    ],
    faqs: [
      { q: "Should I use an independent or paired t-test for my therapy study?", a: "Use a paired t-test when the same participants are measured before and after treatment. Use an independent t-test when comparing two separate groups, such as a treatment group and a control group." },
      { q: "What effect size should I report in psychology?", a: "Report Cohen's d alongside your t-test. In psychology, d = 0.2 is small, 0.5 is medium, and 0.8 is large. StatMate calculates this automatically." },
      { q: "My anxiety scores are not normally distributed. Can I still use a t-test?", a: "The t-test is robust to mild violations of normality with 30+ participants per group. For severely skewed data or small samples, consider the Mann-Whitney U test instead." },
    ],
  },
  "t-test::biology": {
    title: "T-Test for Biology — Free Online Calculator",
    description: "Compare treatment and control specimens in biological experiments. Calculate t-statistics, p-values, and effect sizes for lab data instantly.",
    h1: "T-Test Calculator for Biology Experiments",
    heroText: "Biological experiments frequently require comparing two conditions — treated vs. untreated cells, wild-type vs. knockout organisms, or before vs. after drug administration. The t-test provides the statistical rigor to confirm that observed differences in gene expression, cell counts, or growth rates are not due to chance.",
    scenario: "A molecular biologist measures mRNA expression levels of a target gene in 15 treated and 15 untreated cell cultures. After RNA extraction and qPCR, she needs to determine whether the drug significantly upregulates gene expression. An independent t-test on the delta-Ct values reveals whether the fold change is statistically meaningful.",
    whyUse: [
      "Compare cell viability, colony counts, or protein concentrations between treated and control specimens",
      "Analyze paired before/after measurements from the same biological sample",
      "Get instant p-values for grant reports and journal submissions without launching R or SPSS",
    ],
    faqs: [
      { q: "How many biological replicates do I need for a t-test?", a: "A minimum of 3 biological replicates per group is standard, but 5-10 is preferred for reliable power. StatMate's sample size calculator can help you determine the exact number needed for your expected effect size." },
      { q: "Can I use a t-test to compare qPCR fold-change data?", a: "Yes. Apply the t-test to delta-Ct values (not raw Ct), as delta-Ct values are approximately normally distributed. This is the standard approach recommended in molecular biology." },
      { q: "My data has extreme outliers from contaminated wells. What should I do?", a: "Document the reason for exclusion (contamination, equipment failure) before removing outliers. If you cannot justify removal, consider the Mann-Whitney U test, which is robust to outliers." },
    ],
  },
  "t-test::marketing": {
    title: "T-Test for Marketing — Free Online Calculator",
    description: "Compare conversion rates, click-through rates, and revenue between marketing campaigns. Run A/B test analysis with instant statistical results.",
    h1: "T-Test Calculator for Marketing A/B Tests",
    heroText: "Every marketing decision should be backed by data, and the t-test is the go-to method for A/B testing. Whether you are comparing email subject lines, landing page designs, or ad creatives, the t-test tells you which variant truly performs better — and whether the difference is real or just noise.",
    scenario: "A growth marketer runs an A/B test on two checkout page designs. Version A shows a single-step form; Version B uses a multi-step wizard. After 2,000 visitors per variant, she compares the average order value. An independent t-test determines whether the $3.40 difference in mean order value is statistically significant or within normal fluctuation.",
    whyUse: [
      "Validate A/B test results for landing pages, email campaigns, and ad creatives with proper statistics",
      "Compare average revenue per user, time-on-page, or engagement metrics between customer segments",
      "Move beyond gut feeling — get a p-value to justify budget allocation decisions to stakeholders",
    ],
    faqs: [
      { q: "How long should I run my A/B test before using a t-test?", a: "Run until you have at least 100 conversions per variant. Checking results too early inflates false positives. Use the sample size calculator first to determine the minimum duration." },
      { q: "Can I use a t-test for conversion rate (percentage) data?", a: "For proportions (converted vs. not), a chi-square test or z-test for proportions is more appropriate. Use the t-test when comparing continuous metrics like revenue, time on page, or average order value." },
      { q: "What if my revenue data is heavily right-skewed?", a: "Revenue data often has a long right tail. With large samples (500+), the t-test is still reliable due to the central limit theorem. For smaller samples, consider a log transformation or the Mann-Whitney U test." },
    ],
  },
  "t-test::education": {
    title: "T-Test for Education — Free Online Calculator",
    description: "Compare test scores, learning outcomes, and teaching methods in education research. Get APA-formatted results for your classroom study.",
    h1: "T-Test Calculator for Education Research",
    heroText: "Education researchers constantly evaluate whether a new teaching method, curriculum, or intervention improves student outcomes. The t-test provides a straightforward way to compare mean test scores between two groups or measure improvement from pre-test to post-test within the same class.",
    scenario: "An elementary school teacher implements a new phonics-based reading program in her class of 25 students. She compares their end-of-year reading scores to a control class of 25 students using the traditional program. An independent t-test on the standardized reading assessment scores shows whether the phonics program led to significantly higher performance.",
    whyUse: [
      "Compare standardized test scores between classes using different curricula or teaching methods",
      "Analyze pre-test/post-test gains within the same group of students using a paired t-test",
      "Generate publication-ready statistics for your education research paper or thesis",
    ],
    faqs: [
      { q: "Can I use a t-test to compare two classrooms?", a: "Yes, but be aware that students within a classroom are not fully independent. For rigorous research, consider multilevel modeling. For practical classroom comparisons, the t-test gives a useful approximation." },
      { q: "What is a meaningful effect size for an educational intervention?", a: "In education, Cohen's d of 0.2 is typical for minor curriculum tweaks, 0.4 is notable (comparable to a semester of learning), and 0.8+ is exceptional. Most effective interventions fall in the 0.3-0.6 range." },
      { q: "My test scores have a ceiling effect. Is the t-test still valid?", a: "Ceiling effects create skewed distributions that violate normality assumptions. If many students score near the maximum, consider using the Mann-Whitney U test or redesigning the assessment to better differentiate high performers." },
    ],
  },
  "t-test::healthcare": {
    title: "T-Test for Healthcare — Free Online Calculator",
    description: "Compare clinical outcomes between treatment groups in healthcare studies. Calculate p-values and effect sizes for patient data instantly.",
    h1: "T-Test Calculator for Healthcare Research",
    heroText: "Clinical research relies on the t-test to evaluate whether a new treatment, drug, or protocol produces better patient outcomes than the standard of care. From blood pressure changes to recovery times, the t-test helps clinicians make evidence-based decisions about patient care.",
    scenario: "A cardiologist investigates whether a new antihypertensive medication lowers systolic blood pressure more than the current first-line treatment. She enrolls 40 patients in each arm of a randomized controlled trial and measures blood pressure after 12 weeks. An independent t-test reveals whether the 5.2 mmHg mean difference between groups is clinically and statistically significant.",
    whyUse: [
      "Compare clinical outcomes (blood pressure, BMI, HbA1c) between treatment and placebo groups in RCTs",
      "Analyze paired pre/post measurements for individual patients undergoing a new treatment protocol",
      "Generate publication-ready statistics with confidence intervals for clinical journal submissions",
    ],
    faqs: [
      { q: "Should I report clinical significance alongside statistical significance?", a: "Absolutely. A statistically significant p-value does not guarantee clinical relevance. Always report the effect size (Cohen's d) and consider minimum clinically important differences (MCID) for your outcome measure." },
      { q: "How do I handle missing data from patient dropouts?", a: "Use intention-to-treat analysis where possible. For the t-test specifically, patients with missing outcome data must be excluded. Document the number and reason for dropouts, and consider whether missingness is random." },
      { q: "Can I use a t-test for survival time data?", a: "No. Survival times are typically right-censored (some patients have not yet experienced the event). Use Kaplan-Meier curves and the log-rank test instead. The t-test is appropriate for continuous outcomes measured at a fixed time point." },
    ],
  },

  // =========================================================================
  // ANOVA
  // =========================================================================
  "anova::psychology": {
    title: "ANOVA for Psychology — Free Online Calculator",
    description: "Compare means across multiple experimental conditions in psychology. Run one-way ANOVA with post-hoc tests and APA results instantly.",
    h1: "One-Way ANOVA Calculator for Psychology",
    heroText: "When your psychology experiment has three or more conditions, ANOVA is the standard method for detecting differences between group means. It avoids the inflated Type I error that comes from running multiple t-tests and provides a single omnibus test of whether any group differs from the rest.",
    scenario: "A social psychologist studies the effect of three feedback styles (positive, neutral, critical) on task motivation. She randomly assigns 90 participants to the three conditions and measures their persistence on an unsolvable puzzle. A one-way ANOVA tests whether average persistence time differs across feedback conditions, followed by Bonferroni post-hoc comparisons.",
    whyUse: [
      "Compare outcomes across 3+ experimental conditions (e.g., different therapy types, dosage levels, or priming conditions)",
      "Avoid inflated false-positive rates from running multiple t-tests between every pair of groups",
      "Get automatic post-hoc comparisons (Bonferroni, Tukey) to identify which specific groups differ",
    ],
    faqs: [
      { q: "When should I use ANOVA instead of multiple t-tests?", a: "Always use ANOVA when comparing 3+ groups. Running three separate t-tests for 3 groups inflates your Type I error from 5% to about 14%. ANOVA controls the overall error rate in a single test." },
      { q: "Which post-hoc test should I use for my psychology study?", a: "Bonferroni is the most conservative and widely accepted in psychology journals. Tukey's HSD is preferred when you have equal group sizes and want to compare every pair. StatMate offers both options." },
      { q: "My ANOVA is significant but none of the post-hoc comparisons are. Why?", a: "This can happen when the overall pattern of means is significant but no single pair reaches significance after correction. It indicates a diffuse effect. Report the omnibus F-test result and note that post-hoc comparisons did not reach significance." },
    ],
  },
  "anova::biology": {
    title: "ANOVA for Biology — Free Online Calculator",
    description: "Compare means across multiple treatment groups in biological experiments. One-way ANOVA with post-hoc tests for lab research.",
    h1: "One-Way ANOVA Calculator for Biology Research",
    heroText: "Biological experiments often require comparing more than two treatment conditions — multiple drug concentrations, different growth media, or several genetic variants. ANOVA provides a rigorous framework for testing whether any treatment group differs significantly from the others.",
    scenario: "An ecologist compares species diversity (Shannon index) across four habitat types: forest, grassland, wetland, and urban. She collects samples from 10 sites per habitat type. A one-way ANOVA determines whether mean biodiversity differs across habitats, and Tukey's HSD identifies which specific habitat pairs show significant differences.",
    whyUse: [
      "Compare cell growth, enzyme activity, or biodiversity metrics across 3+ experimental conditions",
      "Test dose-response relationships by comparing multiple concentration levels simultaneously",
      "Identify which specific treatments differ using built-in post-hoc pairwise comparisons",
    ],
    faqs: [
      { q: "How many replicates per group do I need for ANOVA in biology?", a: "A minimum of 5 biological replicates per group is recommended. For detecting moderate effect sizes with 80% power, 8-10 per group is ideal. Use the sample size calculator to determine the exact number for your study." },
      { q: "My data has unequal group sizes. Can I still use ANOVA?", a: "Yes. ANOVA handles unequal group sizes, but Welch's ANOVA (which StatMate provides) is more robust when group variances also differ. Check the Levene's test result to decide." },
      { q: "Should I log-transform my concentration data before ANOVA?", a: "If your data spans orders of magnitude (e.g., drug concentrations from 0.01 to 100 nM) and shows right-skewed distributions, log-transformation often improves normality. Alternatively, use the nonparametric Kruskal-Wallis test." },
    ],
  },
  "anova::marketing": {
    title: "ANOVA for Marketing — Free Online Calculator",
    description: "Compare performance across multiple campaigns, segments, or ad variations. One-way ANOVA for marketing analytics.",
    h1: "One-Way ANOVA Calculator for Marketing",
    heroText: "Marketing decisions rarely involve just two options. When you are testing multiple ad creatives, comparing revenue across customer segments, or evaluating several pricing strategies, ANOVA tells you whether the differences you see are real — without the statistical pitfalls of running many pairwise comparisons.",
    scenario: "A digital marketer tests four different email subject line styles (question, statistic, urgency, personalized) across 5,000 subscribers each. She measures average click-through rate per subscriber for each variant. ANOVA determines whether subject line style significantly affects engagement, and post-hoc tests reveal which style outperforms the others.",
    whyUse: [
      "Compare conversion rates, revenue, or engagement metrics across 3+ campaign variants simultaneously",
      "Identify which customer segment, channel, or creative performs best with statistical confidence",
      "Avoid the pitfall of cherry-picking the best-looking result from multiple pairwise A/B tests",
    ],
    faqs: [
      { q: "Can I use ANOVA to compare conversion rates across multiple landing pages?", a: "ANOVA works best with continuous metrics (revenue, time on site). For conversion rates (yes/no outcomes), a chi-square test is more appropriate. Use ANOVA when each observation is a continuous value like average order value." },
      { q: "How many visitors per variant do I need?", a: "For detecting a medium effect size with 80% power, you need roughly 50-80 observations per group. For small effects common in marketing, 200+ per group is safer. The sample size calculator can give you a precise number." },
      { q: "My ANOVA shows a significant difference. How do I pick the winner?", a: "Look at the post-hoc comparisons to identify which specific variant outperforms others. The variant with the highest mean that is significantly different from the others is your winner. Consider practical significance (effect size) alongside the p-value." },
    ],
  },
  "anova::education": {
    title: "ANOVA for Education — Free Online Calculator",
    description: "Compare test scores and learning outcomes across multiple teaching methods or grade levels. One-way ANOVA for education research.",
    h1: "One-Way ANOVA Calculator for Education",
    heroText: "Education research often involves comparing multiple instructional strategies, curricula, or student populations simultaneously. ANOVA lets you determine whether the observed differences in test scores or learning outcomes across groups are statistically significant, guiding evidence-based decisions about teaching practices.",
    scenario: "A district administrator compares math proficiency scores across three instructional models: traditional lecture, flipped classroom, and project-based learning. Each model is implemented in 8 classrooms. A one-way ANOVA on average class scores determines whether instructional model significantly affects student achievement, followed by Bonferroni-corrected pairwise comparisons.",
    whyUse: [
      "Compare student achievement across 3+ teaching methods, programs, or school types",
      "Evaluate whether grade level, socioeconomic group, or classroom assignment affects outcomes",
      "Identify which specific instructional approach produces the highest learning gains with post-hoc tests",
    ],
    faqs: [
      { q: "Can I use ANOVA to compare test scores across multiple grade levels?", a: "Yes, one-way ANOVA is appropriate for comparing mean scores across grade levels. However, if the grades represent an ordered progression, you may also want to test for a linear trend." },
      { q: "How do I handle nested data (students within classrooms)?", a: "Standard one-way ANOVA assumes independence. If students within classrooms are more similar to each other, consider using classroom-level means as your data points, or note the nesting as a limitation." },
      { q: "What does eta-squared mean in my education ANOVA results?", a: "Eta-squared (eta sq.) is the proportion of variance in scores explained by group membership. In education, eta sq. = 0.01 is small, 0.06 is medium, and 0.14 is large. StatMate calculates this automatically." },
    ],
  },
  "anova::healthcare": {
    title: "ANOVA for Healthcare — Free Online Calculator",
    description: "Compare patient outcomes across multiple treatment arms or clinical sites. One-way ANOVA with post-hoc analysis for clinical research.",
    h1: "One-Way ANOVA Calculator for Healthcare",
    heroText: "Multi-arm clinical trials and comparative effectiveness studies require comparing outcomes across three or more treatment groups. ANOVA provides the statistical framework to test whether patient outcomes differ among groups while controlling the overall false-positive rate.",
    scenario: "A pain management researcher compares three analgesic protocols (standard NSAID, opioid, combination therapy) in 120 post-surgical patients (40 per group). She measures pain scores at 24 hours using a visual analog scale. ANOVA determines whether mean pain reduction differs across protocols, and Tukey's post-hoc test identifies which treatments differ from each other.",
    whyUse: [
      "Compare clinical outcomes (pain scores, recovery time, lab values) across 3+ treatment protocols",
      "Evaluate quality-of-care metrics across multiple hospital sites or departments",
      "Maintain rigorous Type I error control when testing multiple treatment arms in a single study",
    ],
    faqs: [
      { q: "Is ANOVA appropriate for my 3-arm clinical trial?", a: "Yes, one-way ANOVA is the standard approach for comparing a continuous outcome across 3+ independent treatment groups. Ensure random assignment and check that assumptions (normality, homogeneity of variances) are met." },
      { q: "How should I handle protocol deviations that lead to unequal group sizes?", a: "ANOVA handles unequal groups, but use Welch's ANOVA for robustness. Report the intention-to-treat analysis as primary and per-protocol analysis as secondary, noting reasons for unequal sizes." },
      { q: "Should I adjust for baseline differences between groups?", a: "If baseline values (e.g., pre-treatment blood pressure) differ across groups despite randomization, ANCOVA (analysis of covariance) is more appropriate. Standard ANOVA does not control for covariates." },
    ],
  },

  // =========================================================================
  // CHI-SQUARE
  // =========================================================================
  "chi-square::psychology": {
    title: "Chi-Square Test for Psychology — Free Online",
    description: "Analyze categorical data in psychology research. Test associations between diagnosis, gender, treatment response and more.",
    h1: "Chi-Square Test Calculator for Psychology",
    heroText: "Psychology research frequently involves categorical variables — diagnosis categories, yes/no treatment responses, or demographic groupings. The chi-square test determines whether there is a significant association between two categorical variables, revealing patterns that go beyond simple percentages.",
    scenario: "A researcher investigates whether attachment style (secure, anxious, avoidant) is associated with relationship satisfaction (satisfied, unsatisfied) in 300 adults. A chi-square test of independence reveals whether the distribution of satisfaction differs significantly across attachment styles, with Cramer's V indicating the strength of the association.",
    whyUse: [
      "Test whether treatment response rates (improved/not improved) differ across therapy types",
      "Examine associations between categorical demographics and psychological outcomes",
      "Analyze frequency data from surveys with nominal response categories",
    ],
    faqs: [
      { q: "When should I use chi-square vs. t-test in psychology?", a: "Use chi-square when both variables are categorical (e.g., diagnosis by gender). Use a t-test when comparing a continuous outcome (e.g., anxiety score) between two groups. The key is whether your outcome is a count/category or a measurement." },
      { q: "What is a good Cramer's V for psychology research?", a: "In psychology, Cramer's V of 0.1 is small, 0.3 is medium, and 0.5+ is large. Most real-world associations in psychology fall in the small-to-medium range (0.1-0.3)." },
      { q: "Can I use chi-square with Likert scale data?", a: "Technically you can treat each Likert point as a category, but this loses ordinal information. If your Likert scale has 5+ points and approximates normality, treat it as continuous and use a t-test or ANOVA instead." },
    ],
  },
  "chi-square::biology": {
    title: "Chi-Square Test for Biology — Free Online",
    description: "Test genetic ratios, species distributions, and categorical biological data. Chi-square goodness-of-fit and independence tests.",
    h1: "Chi-Square Test Calculator for Biology",
    heroText: "From Mendel's pea experiments to modern genetic screens, the chi-square test has been fundamental to biology. It tests whether observed frequencies match expected ratios (goodness-of-fit) or whether two categorical biological variables are independent of each other.",
    scenario: "A geneticist crosses two heterozygous pea plants and observes the phenotypic ratio in 400 offspring: 312 round, 88 wrinkled. She expects a 3:1 Mendelian ratio (300:100). A chi-square goodness-of-fit test determines whether the observed deviation from the expected ratio is within chance variation or suggests a more complex inheritance pattern.",
    whyUse: [
      "Test whether observed genetic ratios match expected Mendelian inheritance patterns",
      "Analyze species distribution across habitat types or infection rates across populations",
      "Determine if the success/failure rate of a procedure differs across experimental conditions",
    ],
    faqs: [
      { q: "How do I test a 9:3:3:1 dihybrid ratio with chi-square?", a: "Enter the expected proportions (9/16, 3/16, 3/16, 1/16) multiplied by your total sample size as expected frequencies. Compare against observed counts. A p > 0.05 supports the expected ratio." },
      { q: "What if some expected cell counts are below 5?", a: "The chi-square approximation breaks down with expected counts below 5. Merge categories if biologically meaningful, or use Fisher's exact test for 2x2 tables. StatMate warns you automatically when this assumption is violated." },
      { q: "Can I use chi-square for microbiology colony count data?", a: "Colony counts are better analyzed with Poisson regression or a t-test on log-transformed data. Chi-square is for categorical data (e.g., proportion of plates with growth vs. no growth), not for count magnitudes." },
    ],
  },
  "chi-square::marketing": {
    title: "Chi-Square Test for Marketing — Free Online",
    description: "Test associations between customer segments, conversion status, and campaign variants. Analyze categorical marketing data statistically.",
    h1: "Chi-Square Test Calculator for Marketing",
    heroText: "Marketing data is full of categories — converted vs. not converted, segment A vs. B vs. C, clicked vs. ignored. The chi-square test tells you whether the differences in these categorical outcomes across groups are statistically significant, going beyond vanity metrics to real evidence.",
    scenario: "An e-commerce analyst examines whether purchase behavior (purchased, abandoned cart, bounced) differs across three traffic sources (organic, paid search, social media) using data from 3,000 visitors. A chi-square test of independence reveals whether traffic source is significantly associated with conversion outcome, guiding budget allocation decisions.",
    whyUse: [
      "Test whether conversion rates differ significantly across campaigns, channels, or customer segments",
      "Analyze survey responses with categorical options across different user cohorts",
      "Validate that A/B test results on binary outcomes (click/no-click) are not due to chance",
    ],
    faqs: [
      { q: "Chi-square vs. t-test for A/B testing: which should I use?", a: "Use chi-square when your outcome is binary (converted/not converted, clicked/not clicked). Use a t-test when your outcome is continuous (revenue per user, session duration). The chi-square test is specifically designed for frequency data." },
      { q: "Can I test more than two variants with chi-square?", a: "Yes. Chi-square naturally handles any number of rows and columns. For example, you can compare conversion rates across 5 different landing page designs in a single test." },
      { q: "How do I interpret the standardized residuals?", a: "Standardized residuals above +2 or below -2 indicate cells that deviate significantly from expectation. These tell you which specific combinations drive the overall association — for example, which segment has unexpectedly high conversions." },
    ],
  },
  "chi-square::education": {
    title: "Chi-Square Test for Education — Free Online",
    description: "Analyze categorical education data: pass/fail rates, grade distributions, and survey responses across student groups.",
    h1: "Chi-Square Test Calculator for Education",
    heroText: "Education data often involves categories — pass/fail, grade levels, program types, or survey choices. The chi-square test helps educators and researchers determine whether student outcomes vary significantly across groups, supporting data-driven decisions about curriculum and policy.",
    scenario: "A high school principal compares graduation rates (graduated, dropped out, transferred) across three academic tracks (general, college prep, vocational) for 500 students. A chi-square test reveals whether the distribution of outcomes is significantly associated with academic track, informing decisions about program resources and student support services.",
    whyUse: [
      "Test whether pass/fail rates differ across teaching methods, schools, or demographic groups",
      "Analyze survey responses (e.g., satisfaction categories) from different student populations",
      "Determine if grade distributions differ between sections taught by different instructors",
    ],
    faqs: [
      { q: "Can I use chi-square to compare pass/fail rates between two classes?", a: "Yes, this is a classic 2x2 chi-square application. Enter the number of students who passed and failed in each class. If any expected count is below 5, StatMate will recommend Fisher's exact test." },
      { q: "How do I know if my sample size is large enough?", a: "Ensure every expected cell count is at least 5. For a 2x2 table, this typically requires at least 20 total observations. For larger tables, you may need more. StatMate checks this automatically." },
      { q: "Can chi-square tell me which group is different?", a: "The overall chi-square test tells you that an association exists. To identify which specific cells drive the significance, examine the standardized residuals — values above 2 or below -2 indicate notable deviations from expectation." },
    ],
  },
  "chi-square::healthcare": {
    title: "Chi-Square Test for Healthcare — Free Online",
    description: "Analyze associations between treatment groups and categorical clinical outcomes. Test adverse event rates and diagnostic accuracy.",
    h1: "Chi-Square Test Calculator for Healthcare",
    heroText: "Healthcare research frequently deals with categorical outcomes — alive/deceased, improved/stable/worsened, positive/negative diagnosis. The chi-square test is essential for comparing these outcomes across treatment groups, demographic categories, or clinical sites in an evidence-based manner.",
    scenario: "A public health researcher examines whether flu vaccination status (vaccinated, unvaccinated) is associated with infection outcome (infected, not infected) in a cohort of 2,000 hospital workers during flu season. A chi-square test of independence determines whether vaccination significantly reduces infection rates, with the odds ratio quantifying the protective effect.",
    whyUse: [
      "Compare adverse event rates, treatment response categories, or diagnostic outcomes across patient groups",
      "Test whether demographic factors (age group, sex) are associated with disease prevalence",
      "Analyze contingency tables from case-control and cross-sectional clinical studies",
    ],
    faqs: [
      { q: "Should I use chi-square or logistic regression for my clinical study?", a: "Chi-square tests a single bivariate association. If you need to control for confounders (age, sex, comorbidities), logistic regression is more appropriate. Use chi-square for initial exploratory analysis and logistic regression for adjusted models." },
      { q: "Can I use chi-square for rare adverse events?", a: "When expected cell counts fall below 5, the chi-square approximation is unreliable. For rare events (e.g., serious adverse reactions), use Fisher's exact test instead. StatMate automatically flags this issue." },
      { q: "How do I report chi-square results in a clinical paper?", a: "Report the chi-square statistic, degrees of freedom, sample size, and p-value: e.g., 'chi-sq(1, N = 2000) = 15.3, p < .001'. Also report the effect size (Cramer's V or phi) and relevant percentages." },
    ],
  },

  // =========================================================================
  // CORRELATION
  // =========================================================================
  "correlation::psychology": {
    title: "Correlation for Psychology — Free Online",
    description: "Measure relationships between psychological variables like anxiety, depression, self-esteem, and personality traits. Pearson and Spearman correlations.",
    h1: "Correlation Calculator for Psychology Research",
    heroText: "Understanding the relationship between psychological constructs — anxiety and depression, self-esteem and academic performance, or personality traits and job satisfaction — is at the heart of psychological research. Correlation analysis quantifies the strength and direction of these associations.",
    scenario: "A developmental psychologist examines the relationship between screen time (hours/day) and attention span (continuous performance test score) in 80 children aged 8-12. A Pearson correlation reveals a significant negative relationship (r = -0.42), suggesting that higher screen time is associated with shorter attention spans, though causality cannot be inferred.",
    whyUse: [
      "Quantify the strength of relationships between psychological scales (e.g., BDI-II and BAI scores)",
      "Generate a correlation matrix showing all pairwise relationships among multiple variables",
      "Decide between Pearson (linear) and Spearman (monotonic) based on your data characteristics",
    ],
    faqs: [
      { q: "What is considered a strong correlation in psychology?", a: "In psychology, r = 0.10 is small, 0.30 is medium, and 0.50 is large (Cohen's benchmarks). Most meaningful relationships in psychology fall in the 0.20-0.40 range. Correlations above 0.80 suggest multicollinearity or near-identical constructs." },
      { q: "Correlation vs. regression: which should I use?", a: "Use correlation when you want to describe the mutual association between two variables without implying causality. Use regression when you have a clear predictor and outcome. Correlation gives r; regression gives a prediction equation." },
      { q: "My variables are Likert scales. Should I use Pearson or Spearman?", a: "For Likert scales with 5+ points that approximate a normal distribution, Pearson is generally acceptable and widely used in psychology. For scales with few points (3-4) or clearly non-normal distributions, use Spearman." },
    ],
  },
  "correlation::biology": {
    title: "Correlation for Biology — Free Online",
    description: "Analyze relationships between biological variables: body mass and metabolic rate, gene expression levels, environmental factors and species counts.",
    h1: "Correlation Calculator for Biology Research",
    heroText: "Biological systems are full of interconnected variables — body mass and metabolic rate, temperature and enzyme activity, pollutant concentration and species abundance. Correlation analysis helps biologists quantify these relationships and identify which factors co-vary in natural and experimental systems.",
    scenario: "A marine biologist investigates the relationship between water temperature and coral bleaching severity across 50 reef sites in the Pacific. Spearman correlation reveals a strong positive association (rho = 0.71), indicating that higher water temperatures are consistently linked to more severe bleaching, supporting climate impact models.",
    whyUse: [
      "Quantify relationships between environmental variables and biological responses",
      "Identify co-expressed genes or correlated biomarkers in high-throughput datasets",
      "Choose between Pearson (linear relationships) and Spearman (monotonic, outlier-robust) correlation",
    ],
    faqs: [
      { q: "Should I use Pearson or Spearman for my biological data?", a: "Use Pearson when both variables are continuous, normally distributed, and linearly related. Use Spearman when data is ranked, ordinal, has outliers, or shows a monotonic but non-linear relationship. When in doubt, Spearman is the safer choice for biological data." },
      { q: "Can I use correlation with small sample sizes (n < 10)?", a: "Correlation is unreliable with very small samples — a single outlier can drastically change r. With n < 10, report the correlation but interpret cautiously, and consider supplementing with a scatter plot. Power is very low for detecting moderate effects." },
      { q: "My biological variables have a logarithmic relationship. What do I do?", a: "Log-transform the appropriate variable before computing Pearson correlation, or use Spearman correlation which captures any monotonic (always increasing or always decreasing) relationship without requiring linearity." },
    ],
  },
  "correlation::marketing": {
    title: "Correlation for Marketing — Free Online",
    description: "Measure relationships between marketing metrics: ad spend and revenue, engagement and conversions, price and demand.",
    h1: "Correlation Calculator for Marketing Analytics",
    heroText: "Smart marketing requires understanding which metrics actually drive outcomes. Correlation analysis reveals the strength of relationships between ad spend and revenue, social engagement and conversions, or pricing and demand — helping you focus on the levers that truly matter.",
    scenario: "A marketing director analyzes the relationship between monthly social media ad spend and website conversions across 24 months of data. Pearson correlation shows r = 0.68, indicating a strong positive relationship. She uses this to justify increasing the social media budget, while noting that the plateau above $10K/month suggests diminishing returns.",
    whyUse: [
      "Identify which marketing channels have the strongest relationship with revenue or conversions",
      "Detect diminishing returns by examining non-linear relationships between spend and outcomes",
      "Build a correlation matrix across all KPIs to understand which metrics move together",
    ],
    faqs: [
      { q: "If ad spend and revenue are correlated, does that mean ads cause revenue?", a: "No. Correlation does not imply causation. Both could be driven by a third factor (e.g., seasonal demand). To establish causality, you need controlled experiments (A/B tests) or careful causal inference methods." },
      { q: "How do I handle time-series data when computing correlation?", a: "Be cautious — two trending variables will show spurious correlation. Detrend or difference your data first, or use lagged correlation to examine whether changes in spend precede changes in revenue." },
      { q: "What if my marketing metrics have outliers (e.g., Black Friday)?", a: "Outliers from special events can inflate or deflate Pearson correlation. Use Spearman correlation for robustness, or analyze the outlier periods separately. Always visualize with a scatter plot first." },
    ],
  },
  "correlation::education": {
    title: "Correlation for Education — Free Online",
    description: "Measure relationships between educational variables: study hours and GPA, class size and achievement, attendance and test scores.",
    h1: "Correlation Calculator for Education Research",
    heroText: "Educational outcomes are influenced by many interconnected factors — study habits, socioeconomic status, class size, teacher experience. Correlation analysis helps education researchers identify which variables are most strongly associated with student achievement, guiding resource allocation and policy decisions.",
    scenario: "An education researcher examines the relationship between daily homework time (minutes) and standardized math test scores in 120 middle school students. Pearson correlation reveals r = 0.35, a moderate positive relationship. She notes that the benefit appears to plateau around 60 minutes, suggesting excessive homework may not yield additional gains.",
    whyUse: [
      "Quantify the relationship between study habits, attendance, or engagement and academic achievement",
      "Identify which school-level factors (class size, funding, teacher experience) correlate with outcomes",
      "Support evidence-based arguments for educational policy with quantified effect sizes",
    ],
    faqs: [
      { q: "What is a typical correlation between attendance and grades?", a: "Meta-analyses consistently find moderate correlations (r = 0.30-0.50) between class attendance and academic performance. The relationship is stronger in courses with cumulative content and weaker in skills-based courses." },
      { q: "Can I use correlation with ordinal grade data (A, B, C, D, F)?", a: "Convert letter grades to numeric values (A=4, B=3, etc.) and use Spearman correlation, which is designed for ordinal data. Alternatively, if GPA is used as a continuous variable, Pearson is acceptable." },
      { q: "How do I account for socioeconomic status when studying study time and achievement?", a: "Simple correlation cannot control for confounders. If SES correlates with both study time and achievement, the observed correlation may be inflated. Use partial correlation or multiple regression to control for SES." },
    ],
  },
  "correlation::healthcare": {
    title: "Correlation for Healthcare — Free Online",
    description: "Analyze relationships between clinical variables: BMI and blood pressure, age and recovery time, biomarker levels and disease severity.",
    h1: "Correlation Calculator for Healthcare Research",
    heroText: "Clinical research often needs to quantify the relationship between patient characteristics and health outcomes — BMI and blood pressure, age and surgical recovery time, or biomarker levels and disease progression. Correlation analysis provides the foundation for understanding these clinical associations.",
    scenario: "An endocrinologist investigates the relationship between HbA1c levels and fasting blood glucose in 200 diabetic patients. Pearson correlation reveals r = 0.82, confirming a strong positive association. This supports using HbA1c as a reliable long-term indicator of glycemic control in clinical practice.",
    whyUse: [
      "Quantify associations between clinical measurements (BMI, blood pressure, lab values) and outcomes",
      "Identify which biomarkers are most strongly associated with disease severity or treatment response",
      "Generate correlation matrices for multiple clinical variables to guide further regression analysis",
    ],
    faqs: [
      { q: "What correlation coefficient indicates a clinically useful biomarker?", a: "For diagnostic biomarkers, r > 0.70 with the gold standard is generally considered useful. For prognostic markers, even r = 0.30-0.50 can be clinically meaningful if the marker is easily measured. Context matters more than arbitrary cutoffs." },
      { q: "My clinical data has a restricted range (only diabetic patients). How does this affect correlation?", a: "Range restriction attenuates correlation — the true relationship in the general population is stronger than what you observe in a restricted sample. Report this limitation and consider that your r is a lower bound." },
      { q: "Should I use Pearson or Spearman for clinical lab values?", a: "Many lab values (creatinine, liver enzymes) are right-skewed. Use Spearman for robustness, or log-transform the data before using Pearson. If both yield similar results, report Pearson as it is more commonly expected in clinical literature." },
    ],
  },

  // =========================================================================
  // DESCRIPTIVE STATISTICS
  // =========================================================================
  "descriptive::psychology": {
    title: "Descriptive Statistics for Psychology — Free",
    description: "Calculate mean, SD, skewness, and percentiles for psychological data. Summarize survey scores, reaction times, and scale data.",
    h1: "Descriptive Statistics Calculator for Psychology",
    heroText: "Before running any inferential test, every psychology paper needs a descriptive statistics table. Means, standard deviations, and distributions of your key variables provide readers with an essential overview of your sample and help you spot data issues before they become analytical problems.",
    scenario: "A researcher conducting a study on workplace burnout collects Maslach Burnout Inventory scores from 150 nurses. Before testing her hypotheses, she runs descriptive statistics to report means and standard deviations for each subscale (emotional exhaustion, depersonalization, personal accomplishment), check for normality, and identify potential floor/ceiling effects.",
    whyUse: [
      "Generate APA-formatted descriptive tables (M, SD, range, skewness) for your participant data",
      "Check distributional properties of scale scores before deciding on parametric vs. nonparametric tests",
      "Identify outliers, floor/ceiling effects, and missing data patterns in questionnaire responses",
    ],
    faqs: [
      { q: "What descriptive statistics should I report in a psychology paper?", a: "At minimum, report M (mean), SD (standard deviation), and N for each variable. Also include the range, and report skewness/kurtosis if you plan to justify parametric test usage. StatMate calculates all of these." },
      { q: "How do I know if my data is normally distributed?", a: "Check skewness (should be between -1 and 1 for approximate normality) and run the Shapiro-Wilk test. Also examine the histogram visually. StatMate provides both the test and visualization." },
      { q: "Should I report median or mean for Likert scale data?", a: "Report both. The mean is standard in psychology for Likert scales with 5+ points. The median is more informative if the distribution is skewed. Reporting both gives readers a complete picture." },
    ],
  },
  "descriptive::biology": {
    title: "Descriptive Statistics for Biology — Free",
    description: "Summarize biological measurements: species counts, concentrations, growth rates. Mean, median, SD, and distribution analysis.",
    h1: "Descriptive Statistics Calculator for Biology",
    heroText: "Biological data comes in many forms — cell counts, protein concentrations, organism measurements, species abundances. Descriptive statistics provide the essential summary of your experimental data, reveal the distribution shape, and guide your choice of subsequent statistical tests.",
    scenario: "A field ecologist measures the carapace length of 200 green sea turtles at a nesting beach over three years. Descriptive statistics reveal the mean length (89.2 cm), standard deviation (8.7 cm), and a slight left skew, suggesting a population dominated by mature adults. These baseline measurements are essential for monitoring population health over time.",
    whyUse: [
      "Summarize morphological measurements, concentrations, or counts across experimental conditions",
      "Determine whether your biological data meets normality assumptions for parametric tests",
      "Generate publication-ready summary tables with means, SDs, ranges, and confidence intervals",
    ],
    faqs: [
      { q: "Should I report mean or median for my biological data?", a: "Report the mean when your data is approximately symmetric. For skewed data (common with concentrations, counts, and survival times), report the median with interquartile range. Many biology journals expect both." },
      { q: "How do I handle zero-inflated data (many zero counts)?", a: "Report the proportion of zeros separately, then summarize the non-zero values. Standard mean/SD can be misleading when a large fraction of observations are zero. Consider specialized zero-inflated models for inference." },
      { q: "What is the coefficient of variation and when should I report it?", a: "CV = (SD/mean) x 100%. It is useful for comparing variability across measurements with different units or magnitudes. In biology, a CV below 10% indicates good measurement precision. Report it when comparing reproducibility." },
    ],
  },
  "descriptive::marketing": {
    title: "Descriptive Statistics for Marketing — Free",
    description: "Summarize marketing KPIs: revenue distribution, session duration, bounce rates. Understand your data before making decisions.",
    h1: "Descriptive Statistics Calculator for Marketing",
    heroText: "Before optimizing campaigns or running A/B tests, you need to understand your baseline metrics. Descriptive statistics reveal the central tendency, spread, and distribution of your marketing KPIs — exposing insights that averages alone would hide, like bimodal spending patterns or extreme outliers.",
    scenario: "A product manager analyzes the distribution of session duration for 10,000 website visitors. The mean is 4.2 minutes, but the median is only 2.1 minutes — indicating severe right skew from a small number of power users. This insight leads her to segment users before running conversion analysis, avoiding misleading aggregate metrics.",
    whyUse: [
      "Understand the true distribution of revenue, session length, or engagement beyond simple averages",
      "Identify outliers and skewed distributions that could mislead A/B test analysis",
      "Generate baseline metrics (mean, median, percentiles) for setting KPI targets and benchmarks",
    ],
    faqs: [
      { q: "Why is the median often better than the mean for marketing data?", a: "Marketing metrics like revenue per user and session duration are typically right-skewed — a few power users or big spenders inflate the mean. The median gives the experience of the typical user and is more actionable for most decisions." },
      { q: "What percentiles should I track for marketing KPIs?", a: "Track the 25th, 50th (median), 75th, and 90th percentiles. The gap between the 50th and 90th percentile reveals how much your top users differ from typical ones, which is crucial for segmentation and personalization strategies." },
      { q: "How do I report descriptive statistics for A/B test results?", a: "For each variant, report N, mean, median, SD, and the range. This helps stakeholders understand not just the average difference but also the variability and distribution shape, which affect the reliability of your conclusions." },
    ],
  },
  "descriptive::education": {
    title: "Descriptive Statistics for Education — Free",
    description: "Summarize test scores, survey results, and student data. Calculate mean, median, percentiles, and distribution metrics for education research.",
    h1: "Descriptive Statistics Calculator for Education",
    heroText: "Every education report starts with descriptive statistics — average test scores, grade distributions, and measures of student variability. These summaries help educators identify achievement gaps, evaluate program effectiveness, and communicate results to parents, administrators, and policymakers.",
    scenario: "A school district assessment coordinator analyzes standardized reading scores for 3,000 third-graders across 15 schools. Descriptive statistics reveal that while the district mean is at grade level, the standard deviation is large and the distribution is bimodal, suggesting two distinct student populations — one meeting standards and one falling significantly behind.",
    whyUse: [
      "Generate grade distribution summaries and percentile ranks for standardized assessments",
      "Identify bimodal distributions that reveal achievement gaps hidden by average scores",
      "Calculate measures of variability to assess equity — high SD may indicate disparities across subgroups",
    ],
    faqs: [
      { q: "Which descriptive statistics should I include in a school assessment report?", a: "Include the mean, median, SD, min, max, and the percentage of students at each proficiency level. Percentile ranks (25th, 50th, 75th) are also valuable for communicating relative standing to parents." },
      { q: "How do I interpret skewness in test score distributions?", a: "Negative skew (tail to the left) means most students scored high with some low outliers — common with easy tests. Positive skew (tail to the right) means most scored low — common with difficult tests. Aim for near-zero skew for a well-calibrated assessment." },
      { q: "Should I report standard deviation or standard error?", a: "Report standard deviation (SD) to describe the spread of individual scores. Report standard error (SE) when describing the precision of the mean estimate. For classroom reports, SD is more intuitive; for research papers, report both." },
    ],
  },
  "descriptive::healthcare": {
    title: "Descriptive Statistics for Healthcare — Free",
    description: "Summarize patient data: vital signs, lab values, demographic distributions. Essential first step in clinical data analysis.",
    h1: "Descriptive Statistics Calculator for Healthcare",
    heroText: "Clinical research begins with characterizing the study sample. Descriptive statistics summarize patient demographics, baseline vital signs, and lab values — forming Table 1 of every clinical paper and providing the foundation for all subsequent analyses.",
    scenario: "A clinical researcher preparing a randomized trial report generates Table 1: baseline characteristics of 300 patients across treatment and control groups. She reports mean age (58.3 +/- 12.1 years), median BMI (27.4, IQR 24.1-31.2), and distributions of sex, ethnicity, and comorbidities to demonstrate that randomization produced comparable groups.",
    whyUse: [
      "Generate Table 1 (baseline characteristics) for clinical trial reports and observational studies",
      "Summarize vital signs, lab values, and patient demographics with appropriate measures of center and spread",
      "Identify non-normal distributions in clinical data to guide the choice of parametric vs. nonparametric tests",
    ],
    faqs: [
      { q: "Should I report mean (SD) or median (IQR) for clinical variables?", a: "Use mean (SD) for normally distributed variables (e.g., age, height). Use median (IQR) for skewed variables (e.g., hospital length of stay, lab values with outliers). Many clinical journals require the appropriate measure based on distribution." },
      { q: "How do I present Table 1 in a clinical paper?", a: "List variables in rows, groups in columns. Report continuous variables as mean (SD) or median (IQR) and categorical variables as n (%). Include the total N per group and test for baseline differences only if the study is not randomized." },
      { q: "What should I check before reporting descriptive statistics for clinical data?", a: "Check for implausible values (e.g., systolic BP of 500), missing data patterns, and distributional shape. Report the percentage of missing data for each variable and describe how missingness was handled." },
    ],
  },

  // =========================================================================
  // REGRESSION
  // =========================================================================
  "regression::psychology": {
    title: "Regression for Psychology — Free Online",
    description: "Predict psychological outcomes from a single predictor. Simple linear regression with R-squared, coefficients, and residual diagnostics.",
    h1: "Simple Regression Calculator for Psychology",
    heroText: "Simple regression allows psychologists to model how one variable predicts another — for example, how stress predicts sleep quality, or how hours of therapy predict symptom reduction. It quantifies the strength and direction of the predictive relationship and provides a formula for estimation.",
    scenario: "A health psychologist examines whether daily perceived stress (PSS score) predicts nightly sleep duration in 100 graduate students. Simple regression reveals that each 1-point increase in PSS is associated with a 12-minute decrease in sleep (b = -0.20, p < .001, R-squared = 0.31), providing evidence for stress-management interventions targeting sleep.",
    whyUse: [
      "Model the predictive relationship between a single psychological variable and an outcome",
      "Quantify how much variance in the outcome is explained by the predictor (R-squared)",
      "Generate residual plots to verify assumptions and identify non-linear patterns in psychological data",
    ],
    faqs: [
      { q: "What is the difference between correlation and regression in psychology?", a: "Correlation measures the mutual association between two variables (no direction implied). Regression models one variable as a predictor of the other, giving you a prediction equation (Y = a + bX) and the ability to estimate outcomes for new values of the predictor." },
      { q: "How do I interpret the R-squared value?", a: "R-squared represents the proportion of variance in the outcome explained by the predictor. In psychology, R-squared of 0.10 is small, 0.25 is medium, and 0.40+ is large. Most single-predictor models in psychology explain 10-30% of variance." },
      { q: "Can I use regression with a Likert scale predictor?", a: "Yes, if the scale has 5+ points and approximates interval-level measurement, which is standard practice in psychology. Check the residual plot for any systematic patterns suggesting the linear model is inappropriate." },
    ],
  },
  "regression::biology": {
    title: "Regression for Biology — Free Online",
    description: "Model relationships between biological variables. Simple regression for dose-response, growth curves, and allometric scaling.",
    h1: "Simple Regression Calculator for Biology",
    heroText: "From dose-response curves to allometric scaling laws, simple regression is fundamental to biological research. It models how one variable changes as a function of another, providing both a quantitative relationship and predictions for unobserved values.",
    scenario: "A pharmacologist models the relationship between drug concentration (ng/mL) and tumor cell viability (% of control) across 8 dose levels with 5 replicates each. Simple regression on the log-transformed dose reveals the concentration needed to reduce viability by 50% (IC50), a critical parameter for preclinical development.",
    whyUse: [
      "Model dose-response relationships, standard curves, and calibration lines for biological assays",
      "Estimate parameters like IC50, growth rate, or allometric scaling exponents",
      "Examine residual plots to detect non-linear patterns requiring transformation or polynomial models",
    ],
    faqs: [
      { q: "How do I create a standard curve for my ELISA or qPCR assay?", a: "Enter your known concentrations as X and measured signals as Y. The regression equation lets you back-calculate unknown concentrations from measured signals. For ELISA, a 4-parameter logistic curve is standard, but linear regression works well for the linear range." },
      { q: "Should I transform my biological data before regression?", a: "Log-transform the predictor for dose-response data spanning orders of magnitude. Log-transform the outcome if residuals show increasing variance (heteroscedasticity). Biological relationships are often linear on a log scale." },
      { q: "What does a poor R-squared mean for my biological model?", a: "Low R-squared means the predictor explains little variance in the outcome, suggesting other factors are important, measurement noise is high, or the relationship is non-linear. Check the scatter plot and residuals before concluding the relationship is weak." },
    ],
  },
  "regression::marketing": {
    title: "Regression for Marketing — Free Online",
    description: "Model the relationship between ad spend and revenue, price and demand, or any marketing predictor-outcome pair.",
    h1: "Simple Regression Calculator for Marketing",
    heroText: "Marketing operates on cause and effect: spend drives revenue, price affects demand, and engagement predicts conversion. Simple regression quantifies these relationships, giving you a concrete formula to forecast outcomes and optimize budget allocation.",
    scenario: "A SaaS company models the relationship between monthly Google Ads spend and new trial signups using 18 months of data. The regression equation shows that each additional $1,000 in spend generates approximately 23 trial signups (b = 0.023, R-squared = 0.74), enabling precise ROAS calculations and budget planning.",
    whyUse: [
      "Forecast revenue, signups, or conversions based on planned marketing spend",
      "Quantify the relationship between price changes and demand to optimize pricing strategy",
      "Detect diminishing returns by examining residual patterns at high spend levels",
    ],
    faqs: [
      { q: "Can I use regression to forecast next month's revenue from planned ad spend?", a: "Yes, but with caveats. The model assumes the historical relationship continues. Account for seasonality, market changes, and the fact that extrapolating beyond your observed spend range is risky. Use the confidence interval, not just the point estimate." },
      { q: "How do I detect diminishing returns in my spend-to-revenue model?", a: "Check the residual plot. If residuals show a curved pattern (positive at extremes, negative in the middle), your relationship is non-linear. Try log-transforming spend or adding a quadratic term in multiple regression." },
      { q: "My R-squared is only 0.40. Is that useful?", a: "In marketing, R-squared of 0.40 is quite good for a single-predictor model. Marketing outcomes are influenced by many factors. If ad spend alone explains 40% of revenue variance, that is a strong and actionable relationship." },
    ],
  },
  "regression::education": {
    title: "Regression for Education — Free Online",
    description: "Model predictors of academic achievement: study time, attendance, or SES and test scores. Simple regression with diagnostics.",
    h1: "Simple Regression Calculator for Education",
    heroText: "Education researchers use regression to understand which factors predict student success. Whether modeling the relationship between study hours and GPA, class size and achievement, or reading level and math performance, regression provides both a quantitative relationship and a prediction tool.",
    scenario: "An education policy analyst examines whether per-pupil spending predicts standardized test scores across 50 school districts. Simple regression shows a moderate positive relationship (b = 0.003, R-squared = 0.28), indicating that each additional $1,000 in per-pupil spending is associated with a 3-point increase in average scores, though other factors clearly play a role.",
    whyUse: [
      "Model the relationship between a single predictor (attendance, study time, SES) and academic outcomes",
      "Quantify how much of the variance in test scores is explained by a particular factor",
      "Generate predictions for individual students or schools based on the regression equation",
    ],
    faqs: [
      { q: "Can I predict a student's test score from their attendance rate?", a: "Yes, if you have data on both variables for a sample of students. The regression equation gives you an estimated score for any attendance rate. However, individual predictions have wide confidence intervals — use this for group-level patterns, not individual diagnoses." },
      { q: "My data shows a non-linear relationship between study time and grades. What should I do?", a: "This is common — benefits of study time often plateau. Try log-transforming study time, or use the scatter plot to identify the inflection point. Report the non-linearity as a finding, as it has practical implications for student advice." },
      { q: "How do I report regression results in an education paper?", a: "Report the regression equation, R-squared, F-test, and the coefficient with its standard error and p-value. Example: 'Each additional hour of weekly study time was associated with a 0.15-point increase in GPA, b = 0.15, SE = 0.04, p < .001, R-sq = .22.'" },
    ],
  },
  "regression::healthcare": {
    title: "Regression for Healthcare — Free Online",
    description: "Model clinical predictors of patient outcomes. Simple regression for dose-response, biomarker-outcome, and other clinical relationships.",
    h1: "Simple Regression Calculator for Healthcare",
    heroText: "Clinical research frequently needs to model how a single clinical variable predicts a patient outcome — age and recovery time, dosage and response, or BMI and surgical complication risk. Simple regression provides the quantitative framework for these predictive relationships.",
    scenario: "A rehabilitation specialist models the relationship between patient age and time to functional recovery after hip replacement in 80 patients. Regression reveals that each additional year of age is associated with 0.8 additional days of recovery (b = 0.8, R-squared = 0.35), helping set realistic recovery expectations during pre-surgical counseling.",
    whyUse: [
      "Model how a clinical predictor (age, BMI, baseline severity) relates to patient outcomes",
      "Generate prediction equations for clinical decision support (e.g., expected recovery time)",
      "Check residual diagnostics to verify that a linear model is appropriate for your clinical data",
    ],
    faqs: [
      { q: "Can I use simple regression for drug dose-response modeling?", a: "For a preliminary analysis, yes. Plot dose vs. response and fit a linear model. However, most dose-response relationships are sigmoidal, so consider log-transforming the dose or using specialized pharmacokinetic models for publication-quality analysis." },
      { q: "My outcome variable (hospital stay) has a floor at 0 and is right-skewed. Is regression valid?", a: "Standard regression assumes normally distributed residuals, which is violated with floor-bounded skewed data. Log-transform the outcome or consider a generalized linear model. For a quick analysis, check if residuals look approximately normal despite the raw data's skew." },
      { q: "How do I account for confounders like comorbidities?", a: "Simple regression cannot control for confounders. If confounders may bias your estimate, use multiple regression to include additional predictors. Always state this limitation when reporting a simple regression result in a clinical context." },
    ],
  },

  // =========================================================================
  // SAMPLE SIZE
  // =========================================================================
  "sample-size::psychology": {
    title: "Sample Size Calculator for Psychology — Free",
    description: "Calculate required participants for psychology studies. Power analysis for t-tests, ANOVA, correlation, and regression designs.",
    h1: "Sample Size Calculator for Psychology Studies",
    heroText: "Underpowered studies are a chronic problem in psychology. A proper sample size calculation before data collection ensures you have enough participants to detect the effect you expect, satisfying IRB requirements and avoiding wasted time and resources on studies doomed to fail.",
    scenario: "A graduate student plans a between-subjects experiment comparing a mindfulness intervention to a control condition on anxiety reduction. Based on prior literature showing a medium effect (d = 0.50), she calculates that 64 participants per group are needed for 80% power at alpha = .05. Adding 20% for attrition, she aims to recruit 77 per group.",
    whyUse: [
      "Determine the minimum number of participants needed before submitting your IRB protocol",
      "Justify your sample size in grant applications and pre-registration documents",
      "Avoid underpowered studies that waste participants' time and contribute to the replication crisis",
    ],
    faqs: [
      { q: "What effect size should I use for my psychology power analysis?", a: "Use effect sizes from prior literature when available. If no prior data exists, Cohen's conventions (d = 0.2 small, 0.5 medium, 0.8 large) are a starting point, but most real effects in psychology are d = 0.2-0.4. It is better to power for a smaller, realistic effect." },
      { q: "Why does my IRB require a power analysis?", a: "IRBs want to ensure you are not exposing participants to research burden without a reasonable chance of obtaining meaningful results. An underpowered study risks inconclusive results and is ethically questionable because participant time is wasted." },
      { q: "How much should I over-recruit for attrition?", a: "In psychology, plan for 10-30% attrition depending on your population and study duration. Longitudinal studies and clinical populations require higher attrition buffers (20-30%). Short, in-lab studies may only need 10%." },
    ],
  },
  "sample-size::biology": {
    title: "Sample Size Calculator for Biology — Free",
    description: "Calculate required replicates for biological experiments. Power analysis for t-tests, ANOVA, and correlation in lab research.",
    h1: "Sample Size Calculator for Biology Experiments",
    heroText: "Biological experiments are expensive and time-consuming. Calculating the required number of replicates before starting ensures you have sufficient statistical power to detect real effects without wasting reagents, animal subjects, or months of work on an underpowered experiment.",
    scenario: "A neuroscientist plans a study comparing synaptic density in wild-type vs. knockout mice. Based on preliminary data showing a coefficient of variation of 25% and an expected 30% reduction in density, she calculates that 12 mice per group provide 80% power. This justifies the animal use protocol to the IACUC committee.",
    whyUse: [
      "Calculate the minimum number of biological replicates needed for your experimental design",
      "Justify animal numbers in IACUC protocols and grant applications",
      "Avoid underpowered experiments that waste reagents, time, and animal lives",
    ],
    faqs: [
      { q: "What is the difference between biological and technical replicates for power analysis?", a: "Power analysis should be based on biological replicates (independent organisms, cultures, or samples). Technical replicates (repeated measurements of the same sample) reduce measurement error but do not increase statistical power for detecting treatment effects." },
      { q: "My preliminary data shows high variability. How does this affect sample size?", a: "Higher variability (larger standard deviation) requires more replicates to achieve the same power. If your CV is 50% instead of 25%, you may need 4x as many replicates. Consider whether you can reduce variability through better protocols." },
      { q: "I can only afford 5 replicates per group. What power do I have?", a: "Enter your expected effect size and set n=5 per group to calculate achieved power. If power is below 80%, consider pooling samples, reducing variability, or collaborating to increase sample size. Reporting low power is better than not reporting it." },
    ],
  },
  "sample-size::marketing": {
    title: "Sample Size Calculator for Marketing — Free",
    description: "Calculate required visitors for A/B tests and marketing experiments. Determine test duration with proper statistical power.",
    h1: "Sample Size Calculator for Marketing Tests",
    heroText: "Running an A/B test without a sample size calculation is like sailing without a compass — you may never reach a conclusion. Proper power analysis tells you exactly how many visitors, emails, or impressions you need before your test can reliably detect the improvement you are looking for.",
    scenario: "A growth team plans to test a new checkout flow expected to increase conversion rate from 3.0% to 3.5% (a 17% relative improvement). The sample size calculator shows they need 7,200 visitors per variant for 80% power. At 500 daily visitors per variant, the test must run for at least 14 days, conveniently spanning two full weeks.",
    whyUse: [
      "Determine how many visitors or users you need per variant before launching an A/B test",
      "Estimate test duration based on your daily traffic volume and minimum detectable effect",
      "Avoid premature test conclusions — stopping too early dramatically inflates false positive rates",
    ],
    faqs: [
      { q: "Why do I need so many visitors for a small conversion rate improvement?", a: "Small effect sizes require large samples to distinguish from noise. A 0.5 percentage-point increase in a 3% conversion rate means 1 in 200 visitors behaves differently. You need thousands of observations to reliably detect such subtle changes." },
      { q: "Can I stop my A/B test early if the results look significant?", a: "No. Peeking at results and stopping early inflates your false positive rate dramatically — up to 30% or more. Either commit to your pre-calculated sample size or use sequential testing methods designed for early stopping." },
      { q: "What is the minimum detectable effect (MDE) and how do I choose it?", a: "MDE is the smallest improvement worth detecting. It depends on business impact — if a 5% relative lift in conversion would justify the engineering cost, use that as your MDE. Smaller MDEs require larger sample sizes." },
    ],
  },
  "sample-size::education": {
    title: "Sample Size Calculator for Education — Free",
    description: "Calculate required participants for education studies. Power analysis for comparing teaching methods, interventions, and programs.",
    h1: "Sample Size Calculator for Education Research",
    heroText: "Education interventions require careful planning to demonstrate real impact. Sample size calculation ensures your study has enough students, classrooms, or schools to detect meaningful differences in learning outcomes, making your findings credible and publishable.",
    scenario: "A curriculum developer plans a randomized trial of a new math program across 20 classrooms. Based on similar interventions showing d = 0.35, she calculates that 130 students per group are needed. Since students are nested in classrooms and the ICC is 0.05, she adjusts the design effect upward, ultimately requiring 25 classrooms of 20 students each.",
    whyUse: [
      "Calculate the number of students, classrooms, or schools needed for your education research",
      "Meet grant and dissertation committee requirements for a justified sample size",
      "Account for the design effect from clustered data (students within classrooms)",
    ],
    faqs: [
      { q: "How do I account for classroom clustering in my power analysis?", a: "Multiply the individual-level sample size by the design effect: DEFF = 1 + (m-1) x ICC, where m is the cluster size and ICC is the intraclass correlation. In education, ICC is typically 0.05-0.20, making clustering a major consideration." },
      { q: "What effect size is realistic for an educational intervention?", a: "Most educational interventions produce effects of d = 0.2-0.4. Effects above 0.5 are exceptional and rare. Use meta-analyses of similar interventions for the best estimate. Powering for d = 0.3 is a reasonable default." },
      { q: "Can I do a power analysis for a pre-post design?", a: "Yes. A paired design (same students measured pre and post) is typically more powerful than comparing two independent groups. You need fewer students, but you must estimate the pre-post correlation to get an accurate sample size." },
    ],
  },
  "sample-size::healthcare": {
    title: "Sample Size Calculator for Healthcare — Free",
    description: "Calculate required patients for clinical trials and healthcare studies. Power analysis with proper alpha, power, and effect size inputs.",
    h1: "Sample Size Calculator for Clinical Studies",
    heroText: "Clinical trials represent enormous investments of time, money, and patient trust. Sample size calculation is mandatory for trial registration and ethical approval, ensuring that the study is large enough to detect clinically meaningful treatment effects and small enough to avoid exposing unnecessary patients to experimental treatments.",
    scenario: "A cardiologist designs a trial comparing a new anticoagulant to the standard treatment for stroke prevention in atrial fibrillation patients. Based on expected event rates of 2.0% vs. 1.2%, she calculates that 2,400 patients per arm are needed for 80% power with alpha = 0.05, accounting for 10% dropout over the 2-year follow-up period.",
    whyUse: [
      "Calculate the number of patients needed for IRB/ethics committee approval and trial registration",
      "Ensure your clinical study is powered to detect the minimum clinically important difference",
      "Estimate trial duration and cost based on enrollment capacity and required sample size",
    ],
    faqs: [
      { q: "How do I determine the clinically meaningful difference for my trial?", a: "Consult published MCID (minimum clinically important difference) values for your outcome measure. For novel outcomes, use expert consensus or patient input. The MCID should be clinically relevant, not just statistically detectable." },
      { q: "Should I use one-sided or two-sided testing for my clinical trial?", a: "Almost always two-sided. Regulatory agencies (FDA, EMA) require two-sided tests unless there is strong biological rationale that the treatment cannot cause harm. One-sided tests require smaller samples but are rarely justified." },
      { q: "How do I account for patient dropout in my sample size calculation?", a: "Inflate your calculated sample size by 1/(1-d) where d is the expected dropout rate. For a 15% dropout rate, multiply by 1/0.85 = 1.18. Also consider whether dropouts are random or informative, as the latter introduces bias." },
    ],
  },

  // =========================================================================
  // ONE-SAMPLE T-TEST
  // =========================================================================
  "one-sample-t::psychology": {
    title: "One-Sample T-Test for Psychology — Free",
    description: "Test whether a sample mean differs from a known population value or theoretical benchmark in psychology research.",
    h1: "One-Sample T-Test Calculator for Psychology",
    heroText: "The one-sample t-test is used when you want to compare your sample's mean to a known benchmark — a published population norm, a theoretical midpoint, or a clinical cutoff. It is essential for establishing whether your study group differs from the general population on a measure of interest.",
    scenario: "A clinical psychologist administers the Beck Depression Inventory (BDI-II) to 45 college students during exam week. The population norm for college students is 7.5. She uses a one-sample t-test to determine whether exam-week scores (M = 12.3, SD = 6.8) are significantly higher than the population average, revealing elevated depressive symptoms during this period.",
    whyUse: [
      "Compare your sample's mean to a published population norm or scale midpoint",
      "Test whether a clinical group scores significantly above a diagnostic threshold",
      "Evaluate whether your experimental manipulation shifted scores away from a baseline value",
    ],
    faqs: [
      { q: "When should I use a one-sample t-test instead of an independent t-test?", a: "Use a one-sample t-test when you are comparing your sample mean to a fixed, known value (population norm, theoretical midpoint). Use an independent t-test when comparing two groups of participants within your own study." },
      { q: "What population value should I use as my test value?", a: "Use the published population mean for your measure, a theoretical midpoint of the scale (e.g., 3 on a 1-5 Likert scale), or a clinically meaningful cutoff. Always justify your choice in the methods section." },
      { q: "Can I test whether my sample is above a certain score, not just different?", a: "Yes. Use a one-tailed (directional) test if you have a specific prediction that your sample mean is higher (or lower) than the benchmark. This provides more power but only tests in one direction." },
    ],
  },
  "one-sample-t::biology": {
    title: "One-Sample T-Test for Biology — Free Online",
    description: "Test whether biological measurements differ from a reference value, expected ratio, or standard baseline.",
    h1: "One-Sample T-Test Calculator for Biology",
    heroText: "Biologists often need to determine whether observed measurements deviate from an expected value — a known species norm, a regulatory standard, or a theoretical prediction. The one-sample t-test provides a rigorous way to test whether your sample mean differs from a specific reference point.",
    scenario: "An environmental scientist measures mercury levels in 20 fish samples from a contaminated lake. The EPA safety threshold is 0.3 ppm. The mean concentration is 0.42 ppm (SD = 0.15). A one-sample t-test against the 0.3 ppm threshold confirms that mercury levels significantly exceed the safety standard (t = 3.58, p = .002).",
    whyUse: [
      "Test whether environmental measurements exceed regulatory safety thresholds",
      "Compare observed biological values to species-typical reference ranges",
      "Determine whether fold-change gene expression differs significantly from the null value of 1.0",
    ],
    faqs: [
      { q: "How do I test whether gene expression fold-change is significant?", a: "Set the test value to 1.0 (no change). Compute fold-change values for each replicate and run a one-sample t-test. Alternatively, test log2 fold-change against 0, which is statistically equivalent and often better distributed." },
      { q: "Can I test against a regulatory threshold?", a: "Yes. Set the test value to the threshold (e.g., EPA limit of 0.3 ppm). A significant result above the threshold provides statistical evidence of exceedance, which is often required for regulatory reporting." },
      { q: "My biological measurements are right-skewed. Is the one-sample t-test still valid?", a: "With 30+ observations, the t-test is robust to moderate skew. For small samples or severe skew, log-transform your data or use the Wilcoxon signed-rank test against a hypothesized median." },
    ],
  },
  "one-sample-t::marketing": {
    title: "One-Sample T-Test for Marketing — Free Online",
    description: "Test whether a marketing metric differs from a benchmark or industry standard. Compare your KPIs to target values.",
    h1: "One-Sample T-Test Calculator for Marketing",
    heroText: "Marketing teams set targets and benchmarks — an expected conversion rate, an industry-average CTR, or a target NPS score. The one-sample t-test tells you whether your actual performance is statistically different from these benchmarks, going beyond a simple above/below comparison.",
    scenario: "A customer success team tracks Net Promoter Scores from 60 recent customers. The industry benchmark NPS for SaaS companies is 36. Their mean NPS is 42 (SD = 18). A one-sample t-test determines whether their NPS is significantly above the industry average, providing evidence for marketing claims about superior customer satisfaction.",
    whyUse: [
      "Test whether your conversion rate, NPS, or engagement metric significantly exceeds an industry benchmark",
      "Validate marketing claims like 'above-average customer satisfaction' with statistical evidence",
      "Compare current quarter performance against a historical baseline or annual target",
    ],
    faqs: [
      { q: "How do I test if my conversion rate beats the industry average?", a: "Collect conversion rates across multiple time periods or segments (not a single aggregate rate). Use the mean and SD of these rates in a one-sample t-test against the industry average. Each observation should be an independent measurement period." },
      { q: "Can I use this to compare my current month to my annual average?", a: "You could compare this month's daily metrics (30 data points) to your annual average. However, be cautious of seasonality and trends. A significant difference might reflect seasonal patterns, not a real change in performance." },
      { q: "My sample size is small (only 12 months of data). Is this test reliable?", a: "With 12 data points, the test has low power and is sensitive to non-normality. The result is technically valid if the data is approximately normal, but interpret with caution and consider supplementing with confidence intervals." },
    ],
  },
  "one-sample-t::education": {
    title: "One-Sample T-Test for Education — Free Online",
    description: "Test whether student scores differ from a standard, grade-level benchmark, or national average.",
    h1: "One-Sample T-Test Calculator for Education",
    heroText: "Educators regularly need to determine whether their students perform differently from a standard — a national average, a proficiency cutoff, or a grade-level benchmark. The one-sample t-test provides the statistical rigor to answer this question beyond simply comparing numbers.",
    scenario: "A principal wants to know if her school's average SAT math score (M = 540, SD = 82, n = 95) is significantly above the national average of 528. A one-sample t-test confirms a significant difference (t = 1.43, p = .08, one-tailed), but the result is not significant at alpha = .05, tempering claims of above-average performance.",
    whyUse: [
      "Test whether your school or class average significantly differs from a national or state benchmark",
      "Determine if student scores exceed a proficiency cutoff on standardized assessments",
      "Evaluate whether an intervention moved group performance away from a pre-established baseline",
    ],
    faqs: [
      { q: "Can I compare my class average to the national average?", a: "Yes — this is a classic application. Use your class scores as the sample and the national average as the test value. The one-sample t-test accounts for variability within your class when determining statistical significance." },
      { q: "What if I only have the class mean and SD, not individual scores?", a: "That is sufficient. Enter the mean, SD, and sample size (number of students). StatMate will calculate the t-statistic and p-value from these summary statistics." },
      { q: "My school barely exceeds the benchmark. How do I know if it is meaningful?", a: "Statistical significance depends on sample size and variability, not just the gap. A 5-point advantage with a large class and small SD can be significant. Report the effect size (Cohen's d) to indicate practical significance alongside the p-value." },
    ],
  },
  "one-sample-t::healthcare": {
    title: "One-Sample T-Test for Healthcare — Free Online",
    description: "Test whether patient measurements differ from clinical reference values, normal ranges, or treatment targets.",
    h1: "One-Sample T-Test Calculator for Healthcare",
    heroText: "Clinical practice relies on reference values — normal lab ranges, treatment targets, and population baselines. The one-sample t-test rigorously tests whether a patient group's mean differs from these benchmarks, supporting evidence-based clinical conclusions.",
    scenario: "A nephrologist monitors serum creatinine levels in 35 kidney transplant recipients at 6 months post-transplant. Normal creatinine is 1.0 mg/dL. The group mean is 1.45 mg/dL (SD = 0.38). A one-sample t-test confirms that creatinine levels are significantly above normal (t = 7.0, p < .001), indicating residual graft dysfunction requiring continued monitoring.",
    whyUse: [
      "Test whether patient lab values significantly deviate from normal reference ranges",
      "Evaluate whether a treatment brought clinical measurements to target levels",
      "Compare a patient cohort's mean to a published population norm or regulatory standard",
    ],
    faqs: [
      { q: "Should I compare against the reference range midpoint or upper limit?", a: "This depends on your clinical question. Use the midpoint to test if your group differs from normal. Use the upper limit (or lower limit) to test if your group exceeds a clinically important threshold. State your rationale clearly." },
      { q: "Can I use this for quality improvement to test whether we meet a target?", a: "Yes. For example, if the target door-to-balloon time is 90 minutes, test your hospital's mean against 90. A non-significant result means you are meeting the target; a significant result above 90 indicates a quality gap." },
      { q: "My lab values have a skewed distribution. What should I do?", a: "Many lab values (enzymes, hormone levels) are right-skewed. Log-transform the data before testing, or use the Wilcoxon signed-rank test as a nonparametric alternative. Report which approach you used and why." },
    ],
  },

  // =========================================================================
  // MANN-WHITNEY U
  // =========================================================================
  "mann-whitney::psychology": {
    title: "Mann-Whitney U for Psychology — Free Online",
    description: "Compare two groups when data is ordinal or non-normal. Nonparametric alternative to the independent t-test for psychology.",
    h1: "Mann-Whitney U Test Calculator for Psychology",
    heroText: "Not all psychological data is normally distributed. When working with ordinal scales, small samples, or skewed distributions, the Mann-Whitney U test provides a robust alternative to the independent t-test, comparing the rank distributions of two groups without requiring normality assumptions.",
    scenario: "A therapist compares patient satisfaction ratings (1-10 scale) between in-person (n = 18) and telehealth (n = 22) therapy formats. The ratings are ordinal and skewed toward high values. A Mann-Whitney U test shows no significant difference in satisfaction rankings between formats (U = 178, p = .34), supporting the equivalence of telehealth delivery.",
    whyUse: [
      "Compare two groups on ordinal measures (Likert items, ranking scales, satisfaction ratings)",
      "Analyze small samples (n < 20 per group) where normality cannot be verified",
      "Handle skewed distributions from reaction time data or clinical rating scales",
    ],
    faqs: [
      { q: "When should I choose Mann-Whitney U over the t-test in psychology?", a: "Use Mann-Whitney when (1) your outcome is ordinal (e.g., a single Likert item), (2) your sample is small and non-normal, or (3) your data has significant outliers. If your data is continuous and approximately normal, the t-test is more powerful." },
      { q: "Can I report an effect size for the Mann-Whitney U test?", a: "Yes. Report the rank-biserial correlation (r) or the Common Language Effect Size. StatMate calculates these automatically. The rank-biserial r ranges from -1 to 1 and interprets similarly to Pearson's r." },
      { q: "Is Mann-Whitney appropriate for comparing Likert scale responses?", a: "For a single Likert item (ordinal data), Mann-Whitney is ideal. For a sum or average of multiple Likert items creating a scale score, the data is often approximately continuous and normal enough for a t-test." },
    ],
  },
  "mann-whitney::biology": {
    title: "Mann-Whitney U for Biology — Free Online",
    description: "Compare two biological groups with non-normal data. Robust nonparametric test for small samples and skewed measurements.",
    h1: "Mann-Whitney U Test Calculator for Biology",
    heroText: "Biological measurements are often skewed, contain outliers, or come from small samples that preclude normality assumptions. The Mann-Whitney U test compares two independent groups based on ranks, making it ideal for colony counts, survival times, behavioral scores, and other non-normal biological data.",
    scenario: "A zoologist compares foraging bout duration (seconds) between two bird species observed at a feeding station: Species A (n = 12) and Species B (n = 15). Foraging times are highly right-skewed with extreme outliers. Mann-Whitney U confirms that Species A has significantly longer foraging bouts (U = 138, p = .003), robust to the skewed distribution.",
    whyUse: [
      "Compare survival times, colony counts, or behavioral durations that are inherently non-normal",
      "Analyze small-sample experiments (n < 10 per group) where normality tests lack power",
      "Obtain reliable results even when extreme outliers are present in your biological data",
    ],
    faqs: [
      { q: "My cell viability data is bounded between 0-100%. Should I use Mann-Whitney?", a: "If the data clusters near the boundaries (floor or ceiling effect) and is not normally distributed, Mann-Whitney is a good choice. If the data is mostly in the middle range and roughly symmetric, the t-test works fine." },
      { q: "Can I use Mann-Whitney for comparing two groups from a survival experiment?", a: "Mann-Whitney can compare survival times if there is no censoring (all subjects experienced the event). With censored data (common in biology), use the log-rank test instead." },
      { q: "I have only 5 observations per group. Is Mann-Whitney reliable?", a: "With very small samples, Mann-Whitney has limited power and may not reach significance even with real differences. The exact p-value (not the asymptotic approximation) should be used. StatMate computes the exact test for small samples." },
    ],
  },
  "mann-whitney::marketing": {
    title: "Mann-Whitney U for Marketing — Free Online",
    description: "Compare marketing metrics between groups when data is skewed. Robust A/B test analysis for non-normal revenue and engagement data.",
    h1: "Mann-Whitney U Test Calculator for Marketing",
    heroText: "Marketing data is often heavily skewed — revenue has long tails, session durations have many zeros, and satisfaction ratings cluster at extremes. The Mann-Whitney U test provides reliable group comparisons without requiring the normal distribution that the t-test assumes.",
    scenario: "An analyst compares customer lifetime value (CLV) between users acquired through organic search (n = 45) and paid ads (n = 52). CLV is extremely right-skewed, with a few high-value customers inflating the mean. Mann-Whitney U on the rank-ordered CLV values determines whether the acquisition channels produce customers of genuinely different value.",
    whyUse: [
      "Compare revenue, CLV, or other heavily right-skewed metrics between customer segments",
      "Analyze A/B test results when the outcome distribution violates normality assumptions",
      "Get reliable results with small-sample pilot tests before committing to full-scale experiments",
    ],
    faqs: [
      { q: "When should I use Mann-Whitney instead of a t-test for my A/B test?", a: "Use Mann-Whitney when your metric is heavily skewed (e.g., revenue per user), has many zeros (e.g., purchases), or when sample sizes are small. For large samples (500+) on continuous metrics, the t-test is typically robust enough." },
      { q: "How do I interpret the Mann-Whitney result for business stakeholders?", a: "Report the rank-biserial correlation: 'Users in Group A tended to have higher values than Group B 65% of the time.' This probability interpretation is more intuitive than U-statistics for non-technical audiences." },
      { q: "Can I test more than two groups with Mann-Whitney?", a: "No. Mann-Whitney compares exactly two groups. For three or more groups, use the Kruskal-Wallis test, which is the nonparametric equivalent of one-way ANOVA." },
    ],
  },
  "mann-whitney::education": {
    title: "Mann-Whitney U for Education — Free Online",
    description: "Compare two student groups on ordinal or non-normal data. Nonparametric test for small classrooms and rating scales.",
    h1: "Mann-Whitney U Test Calculator for Education",
    heroText: "Education data frequently involves ordinal ratings, small classroom samples, or test scores with floor/ceiling effects that violate normality. The Mann-Whitney U test provides a robust way to compare two groups of students without the assumptions that limit the t-test.",
    scenario: "A special education teacher compares reading engagement ratings (1-5 scale) between 12 students using a new reading app and 10 students in the traditional program. The ordinal scale and small sample make the t-test inappropriate. Mann-Whitney U reveals significantly higher engagement rankings in the app group (U = 89, p = .02).",
    whyUse: [
      "Compare ordinal outcomes (rubric scores, engagement ratings) between two teaching approaches",
      "Analyze small-class comparisons where normality assumptions are unjustifiable",
      "Handle test score distributions with floor or ceiling effects that distort the t-test",
    ],
    faqs: [
      { q: "Can I use Mann-Whitney to compare rubric scores between two classes?", a: "Yes. Rubric scores are ordinal (the difference between 2 and 3 may not equal the difference between 3 and 4). Mann-Whitney compares the ranking of scores between groups, which respects the ordinal nature of rubric data." },
      { q: "My two classes have very different sizes. Is Mann-Whitney still valid?", a: "Yes. Mann-Whitney handles unequal group sizes well. However, very extreme imbalances (e.g., 5 vs. 50) may reduce power. The test remains valid for inference regardless of the imbalance." },
      { q: "How do I report Mann-Whitney results in an education paper?", a: "Report the U statistic, the exact or asymptotic p-value, and an effect size (rank-biserial r). Example: 'Students using the app had significantly higher engagement (U = 89, p = .02, r = .48).'" },
    ],
  },
  "mann-whitney::healthcare": {
    title: "Mann-Whitney U for Healthcare — Free Online",
    description: "Compare patient groups on non-normal clinical data. Robust nonparametric test for pain scales, length of stay, and ordinal outcomes.",
    h1: "Mann-Whitney U Test Calculator for Healthcare",
    heroText: "Clinical data often involves ordinal scales (pain ratings, functional status), bounded measurements, or heavily skewed distributions (length of stay, cost). The Mann-Whitney U test compares two patient groups without requiring normality, making it the standard nonparametric alternative in clinical research.",
    scenario: "A pain specialist compares post-operative pain scores (0-10 NRS) between patients receiving regional anesthesia (n = 28) and general anesthesia (n = 32). Pain scores are ordinal and left-skewed. Mann-Whitney U shows significantly lower pain rankings in the regional group (U = 312, p = .008), supporting the regional anesthesia protocol.",
    whyUse: [
      "Compare pain scores, functional status, and other ordinal clinical outcomes between treatment groups",
      "Analyze length of stay, cost, or other right-skewed clinical variables resistant to normalization",
      "Provide robust results for small clinical samples where normality is unverifiable",
    ],
    faqs: [
      { q: "Should I use Mann-Whitney or t-test for comparing pain scores?", a: "Pain scores on the 0-10 NRS are ordinal, not truly continuous. Mann-Whitney is the more appropriate test. However, many clinical papers use the t-test on pain scores when sample sizes are moderate (30+). Either is defensible; Mann-Whitney is more conservative." },
      { q: "How do I handle tied observations (many patients with the same pain score)?", a: "Mann-Whitney handles ties by assigning average ranks. StatMate automatically applies this correction. Many ties reduce the test's sensitivity slightly, but the results remain valid." },
      { q: "Can I use Mann-Whitney for hospital length of stay data?", a: "Yes, this is one of the most common applications. Length of stay is typically right-skewed with outliers (prolonged stays), making the t-test unreliable. Mann-Whitney provides robust comparisons regardless of the skew." },
    ],
  },

  // =========================================================================
  // WILCOXON SIGNED-RANK
  // =========================================================================
  "wilcoxon::psychology": {
    title: "Wilcoxon Signed-Rank for Psychology — Free",
    description: "Compare paired observations when data is non-normal. Nonparametric pre/post analysis for psychology research.",
    h1: "Wilcoxon Signed-Rank Test for Psychology",
    heroText: "When measuring the same participants before and after an intervention, the paired t-test assumes normally distributed difference scores. When this assumption fails — with ordinal data, small samples, or skewed differences — the Wilcoxon signed-rank test provides a robust nonparametric alternative.",
    scenario: "A clinical psychologist measures self-reported rumination (Ruminative Response Scale, 22-88) in 20 patients before and after a 6-week mindfulness-based intervention. The difference scores are skewed due to a few non-responders. The Wilcoxon signed-rank test confirms a significant reduction in rumination (W = 34, p = .007).",
    whyUse: [
      "Analyze pre/post changes when difference scores are skewed or contain outliers",
      "Compare ordinal ratings (single Likert items, rank-ordered preferences) within the same participants",
      "Obtain reliable results with small paired samples (n < 20) common in clinical psychology",
    ],
    faqs: [
      { q: "When should I use Wilcoxon instead of a paired t-test?", a: "Use Wilcoxon when (1) your outcome is ordinal, (2) the difference scores are clearly non-normal, or (3) your sample is too small (n < 15) to verify normality. If differences are approximately normal, the paired t-test is more powerful." },
      { q: "Can I use Wilcoxon for a crossover therapy study?", a: "Yes. If the same patients try two therapies (with a washout period between), Wilcoxon tests whether one therapy consistently produces better outcomes, without requiring normally distributed differences." },
      { q: "How do I handle participants with no change (difference = 0)?", a: "Tied pairs (zero differences) are excluded from the Wilcoxon test. Report how many participants showed no change. If many tied pairs exist, this reduces your effective sample size and power." },
    ],
  },
  "wilcoxon::biology": {
    title: "Wilcoxon Signed-Rank for Biology — Free",
    description: "Compare paired biological measurements with non-normal data. Pre/post treatment analysis for lab experiments.",
    h1: "Wilcoxon Signed-Rank Test for Biology",
    heroText: "Paired biological experiments — measuring the same specimen before and after treatment, comparing left and right sides, or testing matched controls — often yield non-normal difference data. The Wilcoxon signed-rank test provides a distribution-free method for detecting systematic changes.",
    scenario: "A plant biologist measures chlorophyll content in leaves from the same 15 plants before and after drought stress treatment. The difference in chlorophyll concentration is not normally distributed due to some plants showing extreme wilting. The Wilcoxon signed-rank test confirms a significant decrease in chlorophyll (W = 12, p = .001).",
    whyUse: [
      "Compare paired measurements from the same organism, tissue, or plot before and after treatment",
      "Analyze matched biological samples (e.g., left vs. right hemisphere, treated vs. contralateral side)",
      "Handle non-normal differences common in growth rate, survival, and concentration data",
    ],
    faqs: [
      { q: "Can I use Wilcoxon for paired gene expression data?", a: "Yes, if you have paired samples (e.g., same patients before/after treatment). Apply the test to the paired differences in expression. For large-scale genomics with thousands of genes, specialized methods (DESeq2, edgeR) are more appropriate." },
      { q: "My paired differences include negative, zero, and positive values. Is that okay?", a: "Yes. Wilcoxon specifically tests whether the distribution of differences is symmetric around zero. Zeros are excluded (tied pairs). A mix of positive and negative differences simply reflects individual variation in treatment response." },
      { q: "How many paired observations do I need for Wilcoxon?", a: "A minimum of 6 pairs is needed for the test to achieve significance (p < .05 only if all ranks point in one direction). For practical power, 15-20 pairs is recommended. With fewer than 6, even a perfect result cannot reach significance." },
    ],
  },
  "wilcoxon::marketing": {
    title: "Wilcoxon Signed-Rank for Marketing — Free",
    description: "Compare before/after marketing metrics for the same cohort. Nonparametric paired test for campaign impact analysis.",
    h1: "Wilcoxon Signed-Rank Test for Marketing",
    heroText: "Marketing often involves before/after comparisons: metrics before and after a campaign launch, customer satisfaction before and after a product update, or engagement rates across two time periods for the same accounts. When these paired differences are skewed, Wilcoxon provides reliable conclusions.",
    scenario: "A retention team measures customer engagement scores for 30 accounts before and after implementing a new onboarding flow. The differences are right-skewed because a few accounts showed dramatic improvement. Wilcoxon signed-rank confirms a significant increase in engagement (W = 384, p = .003), validating the onboarding redesign.",
    whyUse: [
      "Evaluate before/after campaign impact on the same customer accounts or stores",
      "Compare satisfaction or NPS scores from the same customers at two time points",
      "Handle skewed or ordinal paired data that violates paired t-test assumptions",
    ],
    faqs: [
      { q: "Can I use Wilcoxon to test if engagement improved after a product change?", a: "Yes, if you measure the same users/accounts before and after. Wilcoxon tests whether the improvements systematically outweigh the declines. It is robust to the skewed differences common in engagement data." },
      { q: "How is this different from comparing two independent samples?", a: "Wilcoxon uses the paired structure (same entity at two times), which controls for individual differences and is more powerful than comparing two independent groups. Each entity serves as its own control." },
      { q: "My data has many tied values (same score before and after). Is Wilcoxon appropriate?", a: "Ties (zero differences) are dropped from the analysis. If more than 20-25% of observations are tied, consider whether the measurement has enough resolution. The test is still valid but has reduced effective sample size." },
    ],
  },
  "wilcoxon::education": {
    title: "Wilcoxon Signed-Rank for Education — Free",
    description: "Compare pre-test and post-test scores when data is non-normal. Nonparametric paired analysis for classroom studies.",
    h1: "Wilcoxon Signed-Rank Test for Education",
    heroText: "Pre-test/post-test designs are ubiquitous in education, but the improvement scores are not always normally distributed. When students bunch near floor or ceiling scores, or when you are working with ordinal data like rubric ratings, the Wilcoxon signed-rank test is the appropriate analysis tool.",
    scenario: "A reading specialist measures oral reading fluency (words per minute) in 16 struggling readers before and after 10 weeks of intensive intervention. Several students show minimal improvement while others leap forward, creating a skewed distribution of gains. Wilcoxon confirms significant overall improvement (W = 105, p = .01).",
    whyUse: [
      "Analyze pre-test/post-test improvement when gain scores are not normally distributed",
      "Compare paired rubric scores or ordinal outcomes within the same students",
      "Obtain reliable results with small classroom samples (n = 10-25) typical in education research",
    ],
    faqs: [
      { q: "Can I use Wilcoxon for pre/post test scores in a small class?", a: "Yes. With 10-25 students, you cannot reliably verify normality of gain scores. Wilcoxon provides a valid test without this assumption. It is the recommended approach for small classroom-based studies." },
      { q: "What if most students improved but a few declined?", a: "Wilcoxon evaluates the balance of improvements vs. declines, weighted by magnitude. Even if a few students decline, Wilcoxon can detect a significant overall improvement if the improvements are consistently larger than the declines." },
      { q: "How do I handle students who missed the post-test?", a: "Students with missing data cannot be included in a paired test. Report the number of students excluded and consider whether their absence is related to the outcome (e.g., did low-performing students disengage?)." },
    ],
  },
  "wilcoxon::healthcare": {
    title: "Wilcoxon Signed-Rank for Healthcare — Free",
    description: "Compare paired patient measurements when data is ordinal or non-normal. Pre/post clinical analysis without normality assumptions.",
    h1: "Wilcoxon Signed-Rank Test for Healthcare",
    heroText: "Clinical measurements before and after treatment are the backbone of healthcare research, but many clinical outcomes — pain ratings, functional scales, quality-of-life scores — are ordinal or skewed. The Wilcoxon signed-rank test provides a nonparametric method for detecting treatment effects in these paired designs.",
    scenario: "A physical therapist measures functional independence (FIM score, ordinal 1-7 per item) in 25 stroke patients at admission and discharge from rehabilitation. The changes are not normally distributed. Wilcoxon signed-rank confirms significant improvement in functional independence (W = 295, p < .001), documenting the rehabilitation program's effectiveness.",
    whyUse: [
      "Compare pre/post treatment measurements on ordinal clinical scales (pain, function, quality of life)",
      "Analyze paired clinical data with skewed distributions, common in recovery time and symptom scores",
      "Provide robust evidence of treatment effects with small patient samples typical in clinical pilot studies",
    ],
    faqs: [
      { q: "Is Wilcoxon acceptable for clinical trial publications?", a: "Yes. Wilcoxon is widely accepted in medical journals for paired comparisons, especially when outcomes are ordinal or non-normally distributed. Many clinical scoring systems (NRS, FIM, Barthel) produce data best analyzed with nonparametric methods." },
      { q: "How do I report Wilcoxon results in a clinical paper?", a: "Report the W (or T) statistic, sample size, p-value, and effect size (r = Z/sqrt(N)). Example: 'FIM scores significantly improved from admission to discharge, W = 295, p < .001, r = .72.' Also report medians and IQRs at each time point." },
      { q: "Can I use Wilcoxon for crossover clinical trials?", a: "Yes. In a two-period crossover trial (each patient receives both treatments), Wilcoxon tests whether one treatment consistently produces better outcomes, provided the washout period is adequate." },
    ],
  },

  // =========================================================================
  // MULTIPLE REGRESSION
  // =========================================================================
  "multiple-regression::psychology": {
    title: "Multiple Regression for Psychology — Free",
    description: "Predict psychological outcomes from multiple variables. Control for confounders and identify unique predictors with beta weights.",
    h1: "Multiple Regression Calculator for Psychology",
    heroText: "Psychological outcomes are rarely determined by a single factor. Multiple regression lets you examine how several predictors — personality traits, demographic factors, and environmental variables — jointly predict an outcome while controlling for each other, revealing unique contributions of each variable.",
    scenario: "A researcher models predictors of academic burnout in 200 college students. She enters study hours, social support, perfectionism, and financial stress as predictors. Multiple regression shows that perfectionism (beta = .34) and financial stress (beta = .28) are the strongest unique predictors, while study hours (beta = .08, ns) does not significantly predict burnout after controlling for other variables.",
    whyUse: [
      "Identify which psychological variables uniquely predict an outcome after controlling for confounders",
      "Quantify the relative importance of multiple predictors using standardized beta weights",
      "Build prediction models for clinical outcomes using demographic and psychological variables together",
    ],
    faqs: [
      { q: "How many predictors can I include relative to my sample size?", a: "The common rule is at least 10-15 participants per predictor. For 5 predictors, aim for 50-75+ participants. With fewer, the model becomes unstable and R-squared is inflated. Some researchers recommend 20 per predictor for robust results." },
      { q: "What does the standardized beta coefficient tell me?", a: "The standardized beta (beta weight) indicates how many standard deviations the outcome changes for a one-SD increase in the predictor, holding all other predictors constant. It allows direct comparison of predictor importance regardless of measurement scale." },
      { q: "How do I check for multicollinearity among my predictors?", a: "Check the Variance Inflation Factor (VIF) for each predictor. VIF above 5 suggests problematic multicollinearity. Highly correlated predictors (e.g., two anxiety measures) destabilize individual coefficients and should be combined or removed." },
    ],
  },
  "multiple-regression::biology": {
    title: "Multiple Regression for Biology — Free",
    description: "Model biological outcomes from multiple predictors. Identify which environmental or experimental factors drive observed variation.",
    h1: "Multiple Regression Calculator for Biology",
    heroText: "Biological systems are governed by multiple interacting factors. Multiple regression helps biologists disentangle the effects of temperature, pH, nutrient levels, and other variables on an outcome like growth rate, species abundance, or enzyme activity — revealing which factors matter most after accounting for the others.",
    scenario: "An aquatic ecologist models dissolved oxygen levels in 60 lake samples using water temperature, depth, chlorophyll-a concentration, and turbidity as predictors. Multiple regression shows temperature (beta = -.52) and depth (beta = -.31) are the dominant predictors, while turbidity contributes minimally (beta = .07, ns), explaining 78% of variance in dissolved oxygen.",
    whyUse: [
      "Determine which environmental factors most strongly predict biological responses in field studies",
      "Control for confounding variables when assessing treatment effects in non-randomized designs",
      "Build predictive models for species occurrence, growth rates, or biomarker levels from multiple inputs",
    ],
    faqs: [
      { q: "How do I handle correlated environmental predictors?", a: "Check VIF values. Environmental variables (temperature and elevation, pH and alkalinity) are often correlated. If VIF > 5, consider removing one variable from each correlated pair or using principal component regression." },
      { q: "Can I include categorical predictors like habitat type?", a: "Yes. Encode categorical variables as dummy variables (0/1). For a categorical predictor with k levels, create k-1 dummy variables. The reference level is the one not explicitly coded." },
      { q: "My biological data has outliers. How does this affect regression?", a: "Outliers can dramatically affect regression coefficients. Check Cook's distance — values above 1 indicate highly influential observations. Investigate whether outliers represent genuine biological variation or data errors before deciding to retain or remove them." },
    ],
  },
  "multiple-regression::marketing": {
    title: "Multiple Regression for Marketing — Free",
    description: "Model revenue and conversions from multiple marketing inputs. Quantify channel attribution and optimize budget allocation.",
    h1: "Multiple Regression Calculator for Marketing",
    heroText: "Marketing success depends on the interplay of multiple channels and tactics. Multiple regression lets you model how ad spend across channels, pricing, seasonality, and other factors jointly predict revenue, enabling data-driven budget allocation and accurate attribution.",
    scenario: "A marketing director models monthly revenue using Google Ads spend, SEO traffic, email campaigns sent, and social media impressions across 36 months. Multiple regression shows Google Ads (beta = .41) and SEO traffic (beta = .38) are the strongest revenue drivers, while social impressions (beta = .09, ns) have minimal unique impact after controlling for other channels.",
    whyUse: [
      "Build marketing mix models to quantify how each channel contributes to revenue or conversions",
      "Control for seasonal effects and market trends when evaluating campaign performance",
      "Optimize budget allocation by identifying which marketing inputs have the highest marginal returns",
    ],
    faqs: [
      { q: "Can I use multiple regression for marketing mix modeling?", a: "Yes, this is the foundation of marketing mix modeling (MMM). Include spend by channel, seasonal indicators, and any external factors as predictors. The coefficients represent the marginal effect of each input on the outcome." },
      { q: "How do I handle lagged effects (ads today, revenue next month)?", a: "Create lagged variables: use last month's ad spend as a predictor of this month's revenue. Test multiple lag periods (1-3 months) and select the one that produces the best model fit. This captures delayed conversion effects." },
      { q: "My channels are correlated (we increase all spend during holidays). How does this affect results?", a: "Correlated channels make it hard to attribute effects to specific inputs. Check VIF values. Consider adding seasonal dummy variables to absorb shared seasonal variation, or use ridge regression for more stable coefficients under multicollinearity." },
    ],
  },
  "multiple-regression::education": {
    title: "Multiple Regression for Education — Free",
    description: "Predict academic achievement from multiple factors: SES, attendance, class size, and teaching quality. Build evidence-based education models.",
    h1: "Multiple Regression Calculator for Education",
    heroText: "Student achievement is influenced by a web of factors — socioeconomic status, school resources, teacher quality, and student engagement. Multiple regression helps education researchers identify which factors have the strongest unique effects on outcomes, controlling for the others.",
    scenario: "An education researcher models standardized reading scores in 150 fourth-graders using attendance rate, family income, teacher experience (years), and class size as predictors. Multiple regression reveals that attendance (beta = .32) and family income (beta = .29) are the strongest unique predictors, while class size (beta = -.10, ns) has a minimal independent effect.",
    whyUse: [
      "Identify which school and student factors uniquely predict academic achievement",
      "Control for socioeconomic confounders when evaluating instructional program effectiveness",
      "Build prediction models for early identification of at-risk students using multiple indicators",
    ],
    faqs: [
      { q: "How do I control for SES when evaluating a teaching intervention?", a: "Include SES (or a proxy like free lunch eligibility) as a predictor alongside your intervention indicator. The intervention coefficient then represents its effect after accounting for SES differences, providing a fairer comparison." },
      { q: "Can I use multiple regression with school-level data?", a: "Yes, using school-level means. With 50+ schools, regression on aggregated data is common. For student-level data nested within schools, multilevel modeling is more appropriate, but aggregated regression provides a useful starting point." },
      { q: "What is the adjusted R-squared and why does it differ from R-squared?", a: "Adjusted R-squared penalizes for the number of predictors. R-squared always increases when you add a variable, but adjusted R-squared can decrease if the new variable does not meaningfully improve prediction. Use adjusted R-squared to evaluate overall model quality." },
    ],
  },
  "multiple-regression::healthcare": {
    title: "Multiple Regression for Healthcare — Free",
    description: "Model patient outcomes from multiple clinical predictors. Identify risk factors while controlling for age, sex, and comorbidities.",
    h1: "Multiple Regression Calculator for Healthcare",
    heroText: "Clinical outcomes depend on multiple patient factors — age, comorbidities, treatment protocol, and baseline severity. Multiple regression enables clinicians and researchers to identify which factors independently predict outcomes, controlling for confounders that complicate simpler analyses.",
    scenario: "An ICU researcher models length of stay (days) in 180 patients using APACHE II score, age, number of comorbidities, and mechanical ventilation duration as predictors. Multiple regression shows APACHE II (beta = .39) and ventilation duration (beta = .35) are the strongest predictors, providing a model that explains 62% of variance in length of stay.",
    whyUse: [
      "Identify independent predictors of clinical outcomes while controlling for patient demographics",
      "Build clinical prediction models for risk stratification and resource allocation",
      "Assess the unique contribution of a new biomarker or treatment factor after adjusting for known confounders",
    ],
    faqs: [
      { q: "How do I choose which clinical variables to include as predictors?", a: "Start with clinically relevant variables from prior literature. Include known confounders (age, sex) regardless of significance. Avoid data-driven variable selection (stepwise regression) as it inflates false positives and produces unstable models." },
      { q: "My outcome (hospital cost) is highly right-skewed. Can I use linear regression?", a: "Log-transform the outcome to improve normality, then interpret coefficients as percentage changes. Alternatively, use gamma regression (generalized linear model), which directly handles right-skewed positive outcomes. Check residual plots to verify model adequacy." },
      { q: "How do I report multiple regression results in a clinical paper?", a: "Present a table with each predictor's B (unstandardized), beta (standardized), SE, t-value, and p-value. Report the overall model R-squared, adjusted R-squared, F-test, and sample size. Include VIF values to address multicollinearity concerns." },
    ],
  },

  // =========================================================================
  // CRONBACH'S ALPHA
  // =========================================================================
  "cronbach-alpha::psychology": {
    title: "Cronbach's Alpha for Psychology — Free",
    description: "Assess internal consistency of psychological scales. Evaluate reliability of questionnaires measuring anxiety, depression, personality, and more.",
    h1: "Cronbach's Alpha Calculator for Psychology",
    heroText: "Every psychological scale — from the BDI-II to the Big Five Inventory — must demonstrate internal consistency. Cronbach's alpha quantifies how well the items in a questionnaire hang together, and reporting it is a mandatory part of any psychology study using scale data.",
    scenario: "A researcher develops a new 12-item scale measuring academic self-efficacy. She administers it to 200 undergraduates and calculates Cronbach's alpha to assess reliability. The overall alpha is .87, exceeding the .70 threshold. Item-total correlations reveal that item 9 has a low correlation (.12), and removing it increases alpha to .90.",
    whyUse: [
      "Report the internal consistency of established or novel psychological measures in your study",
      "Identify weak items that reduce scale reliability using item-total correlations",
      "Demonstrate measurement quality for journal reviewers and dissertation committees",
    ],
    faqs: [
      { q: "What is an acceptable Cronbach's alpha in psychology?", a: "Generally, alpha >= .70 is acceptable for research, >= .80 is good, and >= .90 is excellent. For clinical decision-making tools, alpha >= .90 is recommended. Below .60 is poor and suggests the items do not form a cohesive scale." },
      { q: "Should I remove items with low item-total correlations?", a: "Consider removing items with item-total correlations below .30, but only if removal improves alpha AND the item is not theoretically essential. Sometimes low-correlating items capture important content that the other items miss." },
      { q: "Can alpha be too high?", a: "Alpha above .95 may indicate item redundancy — the items are so similar they provide little unique information. This can signal that the scale is too narrow or that several items can be removed without losing construct coverage." },
    ],
  },
  "cronbach-alpha::biology": {
    title: "Cronbach's Alpha for Biology — Free Online",
    description: "Assess consistency of multi-item biological measurement protocols. Test reliability of composite indices and scoring systems.",
    h1: "Cronbach's Alpha Calculator for Biology",
    heroText: "While more common in social sciences, Cronbach's alpha has important applications in biology — evaluating the consistency of multi-item assessment protocols, composite biodiversity indices, or multi-marker diagnostic panels where individual measurements should agree.",
    scenario: "An ecologist develops a 6-indicator rapid habitat quality assessment (vegetation cover, water clarity, species richness, litter coverage, erosion signs, canopy height). She applies it at 50 sites and calculates Cronbach's alpha to verify that the indicators consistently measure the same underlying construct of habitat quality.",
    whyUse: [
      "Validate multi-item biological assessment protocols and composite ecological indices",
      "Evaluate consistency of multi-marker panels where components should measure the same construct",
      "Assess inter-rater reliability when scoring systems combine multiple categorical judgments",
    ],
    faqs: [
      { q: "Is Cronbach's alpha relevant for biological research?", a: "It is relevant whenever you combine multiple measurements into a single composite score. Ecological indices, behavioral scoring protocols, and multi-biomarker panels all benefit from reliability assessment. It is less relevant for single direct measurements." },
      { q: "What is an acceptable alpha for a biological assessment tool?", a: "Alpha >= .70 is the standard threshold, though in field ecology where measurement is inherently noisy, >= .65 is sometimes accepted with justification. If alpha is below .60, the items may not be measuring a single coherent construct." },
      { q: "My assessment has only 3 items. Why is alpha so low?", a: "Alpha is strongly affected by the number of items — with only 3 items, even moderate inter-item correlations produce low alpha. Consider reporting mean inter-item correlation (ideally .20-.40) instead, or adding more items to improve reliability." },
    ],
  },
  "cronbach-alpha::marketing": {
    title: "Cronbach's Alpha for Marketing — Free Online",
    description: "Validate marketing survey scales: brand perception, customer satisfaction, loyalty measures. Ensure reliable measurement.",
    h1: "Cronbach's Alpha Calculator for Marketing",
    heroText: "Marketing surveys measure abstract constructs — brand perception, customer loyalty, purchase intent — using multi-item scales. Cronbach's alpha ensures these scales are reliable, meaning the items consistently measure the same underlying construct. Unreliable scales produce noisy data and misleading conclusions.",
    scenario: "A brand researcher develops a 8-item brand trust scale with items like 'I believe this brand is honest' and 'I can rely on this brand.' She administers it to 300 customers and finds alpha = .91, confirming strong internal consistency. Item analysis shows all items have item-total correlations above .50, indicating a well-constructed scale.",
    whyUse: [
      "Validate multi-item survey scales for brand perception, satisfaction, or loyalty before analyzing results",
      "Demonstrate measurement quality in marketing research reports and academic papers",
      "Identify poorly performing survey items that should be revised or removed",
    ],
    faqs: [
      { q: "Why should I check Cronbach's alpha for my customer survey?", a: "If you sum or average multiple items into a score (e.g., 'satisfaction score'), those items must be internally consistent. Low alpha means your score is unreliable — different items are measuring different things, and your conclusions may be driven by noise." },
      { q: "What if my survey measures multiple constructs?", a: "Calculate alpha separately for each subscale (satisfaction items, loyalty items, etc.), NOT for the entire survey. Mixing items from different constructs artificially lowers alpha and is conceptually incorrect." },
      { q: "Can I use Cronbach's alpha for NPS or single-item measures?", a: "No. Alpha requires multiple items measuring the same construct. NPS is a single item and cannot have internal consistency calculated. For single-item measures, reliability is assessed through test-retest methods." },
    ],
  },
  "cronbach-alpha::education": {
    title: "Cronbach's Alpha for Education — Free Online",
    description: "Assess reliability of educational tests, rubrics, and survey instruments. Ensure consistent measurement of student learning.",
    h1: "Cronbach's Alpha Calculator for Education",
    heroText: "Educational assessments — standardized tests, classroom exams, attitude surveys, and rubric-based evaluations — must reliably measure what they intend to measure. Cronbach's alpha is the standard reliability metric for educational instruments, required in test development and validation studies.",
    scenario: "A test developer evaluates a new 30-item multiple-choice science assessment. With data from 250 students, Cronbach's alpha is .82, indicating good reliability. Item analysis reveals 3 items with negative item-total correlations, indicating they may be confusing or poorly written. Removing these items raises alpha to .86.",
    whyUse: [
      "Evaluate the reliability of classroom assessments, standardized tests, and educational surveys",
      "Identify poor test items that reduce measurement consistency through item-total correlation analysis",
      "Meet psychometric standards required for high-stakes testing and assessment validation",
    ],
    faqs: [
      { q: "What alpha should I aim for in a classroom test?", a: "For classroom assessments, alpha >= .70 is adequate. For standardized tests used in high-stakes decisions, alpha >= .90 is expected. Short quizzes (5-10 items) will naturally have lower alpha due to fewer items." },
      { q: "Can I use Cronbach's alpha for a rubric-based assessment?", a: "If a rubric has multiple dimensions scored separately (content, organization, grammar), alpha measures whether these dimensions are internally consistent. If the dimensions intentionally measure different constructs, alpha may be low by design." },
      { q: "Why did alpha increase when I removed a test item?", a: "That item was not measuring the same construct as the other items — it may be ambiguous, too easy, or testing different knowledge. Removing it makes the remaining items more consistent. Check the item to understand why it behaves differently." },
    ],
  },
  "cronbach-alpha::healthcare": {
    title: "Cronbach's Alpha for Healthcare — Free Online",
    description: "Validate patient-reported outcome measures, symptom scales, and clinical assessment tools. Ensure reliable clinical measurement.",
    h1: "Cronbach's Alpha Calculator for Healthcare",
    heroText: "Patient-reported outcome measures (PROMs), symptom checklists, and clinical assessment tools must demonstrate reliability before use in clinical practice or research. Cronbach's alpha verifies that the items in these instruments consistently measure the intended clinical construct.",
    scenario: "A clinical team adapts a pain catastrophizing scale for use in a chronic pain clinic. They administer the 13-item scale to 150 patients and find alpha = .93. Item-total correlations are all above .45, confirming that every item contributes meaningfully. This validates the scale for use in their clinical population.",
    whyUse: [
      "Validate patient-reported outcome measures (PROMs) and symptom scales in your clinical population",
      "Assess whether translated or adapted versions of clinical instruments maintain reliability",
      "Meet COSMIN guidelines for measurement quality in clinical research studies",
    ],
    faqs: [
      { q: "What reliability standard do clinical instruments need to meet?", a: "For group-level research, alpha >= .70 is acceptable. For individual clinical decision-making (diagnosis, treatment selection), alpha >= .90 is required. Most established PROMs (PHQ-9, GAD-7) achieve alpha >= .85." },
      { q: "I translated a scale to a new language. How do I validate it?", a: "Administer the translated version to at least 100 patients and calculate alpha. Compare it to the original version's published alpha. Substantial drops (> .10) suggest translation issues. Also conduct factor analysis to verify the same structure." },
      { q: "Can I calculate alpha for a clinical checklist with yes/no items?", a: "Yes. Cronbach's alpha works with binary (0/1) items — this is equivalent to KR-20. Enter each patient's item responses. However, if the checklist is not meant to produce a total score, alpha may not be meaningful." },
    ],
  },

  // =========================================================================
  // LOGISTIC REGRESSION
  // =========================================================================
  "logistic-regression::psychology": {
    title: "Logistic Regression for Psychology — Free",
    description: "Predict binary outcomes in psychology: diagnosis, dropout, treatment response. Odds ratios and classification accuracy.",
    h1: "Logistic Regression Calculator for Psychology",
    heroText: "When your outcome is binary — diagnosed or not, dropped out or completed, responded to treatment or not — logistic regression is the appropriate analysis. It predicts the probability of an event occurring based on one or more predictors, providing odds ratios that are intuitive for clinical interpretation.",
    scenario: "A clinical researcher predicts therapy dropout (yes/no) from initial symptom severity, working alliance score, and distance to clinic. Logistic regression shows that low working alliance (OR = 0.45) and long commute distance (OR = 1.8 per 10 miles) are significant predictors, enabling early identification of at-risk clients.",
    whyUse: [
      "Predict binary clinical outcomes (diagnosis, treatment response, relapse) from multiple risk factors",
      "Obtain odds ratios that quantify how each predictor changes the odds of the outcome",
      "Build screening tools that classify participants into risk categories based on predictor profiles",
    ],
    faqs: [
      { q: "When should I use logistic regression instead of linear regression?", a: "Use logistic regression when your outcome is binary (0/1, yes/no). Linear regression for binary outcomes can produce impossible predicted probabilities (below 0 or above 1) and violates key assumptions." },
      { q: "How do I interpret an odds ratio of 2.5?", a: "An OR of 2.5 means the odds of the outcome are 2.5 times higher for each one-unit increase in the predictor. For example, if the predictor is a diagnosis (yes=1, no=0), those with the diagnosis have 2.5 times the odds of the outcome." },
      { q: "How many events do I need per predictor?", a: "The rule of thumb is 10-20 events (not observations, events) per predictor. If only 30 people dropped out and you have 5 predictors, your model is likely overfit. Focus on 1-3 key predictors." },
    ],
  },
  "logistic-regression::biology": {
    title: "Logistic Regression for Biology — Free Online",
    description: "Model binary biological outcomes: survival, infection, species presence. Predict probabilities from environmental and experimental factors.",
    h1: "Logistic Regression Calculator for Biology",
    heroText: "Many biological outcomes are binary — alive or dead, infected or healthy, present or absent. Logistic regression models the probability of these outcomes as a function of environmental conditions, experimental treatments, or organismal characteristics, providing both prediction and inference.",
    scenario: "An epidemiologist models malaria infection status (positive/negative) in 500 individuals using proximity to standing water, bed net usage, age, and prior infection history. Logistic regression identifies bed net non-use (OR = 3.2) and proximity to water (OR = 1.4 per 100m closer) as the strongest risk factors, informing vector control strategies.",
    whyUse: [
      "Model survival, infection, or presence/absence outcomes from experimental or environmental predictors",
      "Calculate odds ratios for risk factors in epidemiological and ecological studies",
      "Build species distribution models predicting occurrence probability from habitat variables",
    ],
    faqs: [
      { q: "Can I use logistic regression for species presence/absence data?", a: "Yes. This is a core application in ecology. Enter habitat variables (temperature, elevation, vegetation) as predictors and presence (1) or absence (0) as the outcome. The model predicts probability of occurrence across environmental gradients." },
      { q: "How do I evaluate my logistic regression model's predictive accuracy?", a: "Report the area under the ROC curve (AUC). AUC = 0.5 means random chance, 0.7-0.8 is acceptable, 0.8-0.9 is good, and > 0.9 is excellent. Also report overall accuracy, sensitivity, and specificity." },
      { q: "My outcome is rare (5% infection rate). Does this affect the analysis?", a: "Rare events require larger samples for stable estimates. With low event rates, you may also face separation issues (a predictor perfectly separating outcomes). Consider penalized logistic regression (Firth's method) for rare events." },
    ],
  },
  "logistic-regression::marketing": {
    title: "Logistic Regression for Marketing — Free",
    description: "Predict customer conversion, churn, and purchase decisions. Build marketing models with odds ratios and classification accuracy.",
    h1: "Logistic Regression Calculator for Marketing",
    heroText: "The most important marketing outcomes are binary — will the customer convert or bounce, churn or renew, click or ignore? Logistic regression predicts these binary decisions from customer attributes and behavior, enabling targeted interventions and precise customer scoring.",
    scenario: "A retention team models customer churn (yes/no) from usage frequency, support tickets filed, contract length, and NPS score across 1,200 customers. Logistic regression reveals that low usage (OR = 3.1) and high support tickets (OR = 1.4 per ticket) are the strongest churn predictors, enabling proactive outreach to at-risk accounts.",
    whyUse: [
      "Build churn prediction models using customer behavior, demographics, and engagement data",
      "Predict conversion probability for lead scoring and campaign targeting",
      "Identify which customer attributes have the strongest impact on purchase decisions via odds ratios",
    ],
    faqs: [
      { q: "How is logistic regression used for lead scoring?", a: "Train the model on historical leads (converted vs. not) using firmographic and behavioral data. The predicted probability for new leads becomes their score. Higher scores mean higher conversion likelihood, enabling sales team prioritization." },
      { q: "Can I use logistic regression for multi-class outcomes?", a: "Standard logistic regression handles binary outcomes. For multi-class (e.g., buy product A, B, or C), you need multinomial logistic regression. StatMate's calculator supports binary logistic regression." },
      { q: "How do I handle imbalanced data (95% non-converters)?", a: "Class imbalance does not bias coefficient estimates but affects classification accuracy. Use AUC instead of accuracy for evaluation. Consider oversampling the minority class, undersampling the majority, or adjusting the classification threshold." },
    ],
  },
  "logistic-regression::education": {
    title: "Logistic Regression for Education — Free",
    description: "Predict student outcomes: graduation, dropout, proficiency status. Identify risk factors with odds ratios.",
    h1: "Logistic Regression Calculator for Education",
    heroText: "Key education outcomes are often binary — graduated or dropped out, proficient or not proficient, admitted or rejected. Logistic regression predicts these outcomes from student characteristics, enabling early identification of at-risk students and evidence-based intervention strategies.",
    scenario: "A school counselor models dropout risk (yes/no) in 350 high school students using GPA, attendance rate, disciplinary incidents, and free lunch eligibility. Logistic regression identifies attendance below 85% (OR = 4.2) and 2+ disciplinary incidents (OR = 2.8) as the strongest risk factors, enabling targeted support for at-risk students.",
    whyUse: [
      "Build early warning systems that identify students at risk of dropout or academic failure",
      "Quantify risk factors for educational outcomes using interpretable odds ratios",
      "Predict binary proficiency status (pass/fail) from multiple student and school characteristics",
    ],
    faqs: [
      { q: "How do I create an early warning system with logistic regression?", a: "Train the model on historical data (students who graduated vs. dropped out) with predictors available early (first-semester GPA, attendance, demographics). Apply the model to current students to flag those with high dropout probability for intervention." },
      { q: "Can logistic regression handle both continuous and categorical predictors?", a: "Yes. Mix continuous (GPA, attendance rate) and categorical (gender, free lunch status) predictors freely. Categorical predictors with 3+ levels should be entered as dummy variables." },
      { q: "How do I explain odds ratios to non-statistical administrators?", a: "Translate into practical terms: 'Students with attendance below 85% are 4.2 times more likely to drop out than those above 85%.' Odds ratios above 1 indicate increased risk; below 1 indicates decreased risk (protective factor)." },
    ],
  },
  "logistic-regression::healthcare": {
    title: "Logistic Regression for Healthcare — Free",
    description: "Predict clinical outcomes: mortality, readmission, disease status. Build risk models with adjusted odds ratios.",
    h1: "Logistic Regression Calculator for Healthcare",
    heroText: "Clinical decision-making frequently involves predicting binary outcomes — will the patient survive, be readmitted, develop complications, or respond to treatment? Logistic regression is the standard method for building clinical prediction models and calculating adjusted odds ratios for risk factors.",
    scenario: "A hospitalist models 30-day readmission risk (yes/no) in 500 heart failure patients using ejection fraction, number of comorbidities, length of stay, and discharge medication adherence score. Logistic regression shows that low ejection fraction (OR = 2.4) and poor medication adherence (OR = 2.1) independently predict readmission, informing discharge planning.",
    whyUse: [
      "Build clinical prediction models for mortality, readmission, infection, and treatment response",
      "Calculate adjusted odds ratios for risk factors while controlling for patient demographics and comorbidities",
      "Develop risk scores for clinical decision support and patient triage",
    ],
    faqs: [
      { q: "How do I validate my clinical logistic regression model?", a: "Use internal validation (cross-validation or bootstrap) to assess overfitting. Report discrimination (AUC/C-statistic) and calibration (Hosmer-Lemeshow test). For clinical use, external validation on an independent cohort is essential." },
      { q: "Should I report odds ratios or risk ratios in my clinical paper?", a: "Logistic regression produces odds ratios. When the outcome is common (>10%), odds ratios overestimate risk ratios. Report odds ratios with a note about this distinction, or use Poisson regression with robust standard errors for risk ratios." },
      { q: "How do I handle missing data in my clinical predictors?", a: "Missing data is common in clinical datasets. Simple complete-case analysis loses power and may introduce bias. Consider multiple imputation for missing predictor values, and always report the pattern and percentage of missingness." },
    ],
  },

  // =========================================================================
  // FACTOR ANALYSIS
  // =========================================================================
  "factor-analysis::psychology": {
    title: "Factor Analysis for Psychology — Free",
    description: "Discover latent factors in psychological questionnaires. Exploratory factor analysis (EFA) for scale development and validation.",
    h1: "Factor Analysis Calculator for Psychology",
    heroText: "Factor analysis is the cornerstone of psychological scale development. It reveals the latent factors underlying questionnaire items, determining whether your 20-item survey measures one construct or three, and which items belong to which dimension.",
    scenario: "A personality researcher administers a 30-item personality questionnaire to 400 participants. Exploratory factor analysis reveals 5 clear factors corresponding to Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism, with each item loading above .40 on its intended factor and below .30 on all others.",
    whyUse: [
      "Discover how many latent factors underlie your questionnaire items during scale development",
      "Identify which items load on which factors for construct validation and scale refinement",
      "Determine whether your measure is unidimensional or multidimensional using eigenvalue analysis",
    ],
    faqs: [
      { q: "How many participants do I need for factor analysis?", a: "The common guidelines are 5-10 participants per item, or a minimum of 200. With strong factor loadings (>.60), smaller samples work. With weaker loadings (>.30), you need more participants. More is always better — 300+ is recommended." },
      { q: "What rotation method should I use?", a: "Use oblique rotation (Promax or Oblimin) as the default in psychology, since psychological factors are almost always correlated. Only use orthogonal rotation (Varimax) if you have strong theoretical reasons to assume uncorrelated factors." },
      { q: "How do I determine the number of factors?", a: "Use parallel analysis (most accurate) alongside the scree plot and eigenvalues > 1 rule. When they disagree, parallel analysis should take priority. Also consider interpretability — factors should make theoretical sense." },
    ],
  },
  "factor-analysis::biology": {
    title: "Factor Analysis for Biology — Free Online",
    description: "Identify latent dimensions in multi-variable biological datasets. Reduce complexity of morphometric, environmental, and ecological data.",
    h1: "Factor Analysis Calculator for Biology",
    heroText: "Biological datasets often contain many correlated measurements — morphometric dimensions, environmental variables, or gene expression profiles. Factor analysis identifies the latent factors driving these correlations, simplifying complex datasets into interpretable dimensions.",
    scenario: "A morphologist measures 12 skeletal dimensions in 150 lizard specimens. Factor analysis reveals 3 latent factors: overall body size (explaining 45% of variance), head shape (18%), and limb proportions (12%). This dimensional reduction simplifies species comparison and reveals that head shape, not overall size, best discriminates between species.",
    whyUse: [
      "Reduce high-dimensional morphometric or environmental data into interpretable latent factors",
      "Identify which sets of biological measurements are driven by the same underlying processes",
      "Create composite factor scores for use in subsequent analyses (ANOVA, regression)",
    ],
    faqs: [
      { q: "Is factor analysis the same as PCA in biology?", a: "No. PCA summarizes total variance and is purely descriptive. Factor analysis models shared variance and identifies latent constructs. Use PCA for dimensionality reduction; use factor analysis when you believe latent biological processes generate the observed correlations." },
      { q: "Can I apply factor analysis to ecological community data?", a: "It depends. Species abundance data often violates factor analysis assumptions (linearity, normality). For community ecology, ordination methods (NMDS, PCoA) are more appropriate. Factor analysis works well for environmental variables and morphometric data." },
      { q: "How do I interpret factor loadings in biology?", a: "A loading of .70 means the variable shares about 49% of its variance with the factor. In biology, loadings above .40 are typically considered meaningful. Name each factor based on the variables that load most strongly on it." },
    ],
  },
  "factor-analysis::marketing": {
    title: "Factor Analysis for Marketing — Free Online",
    description: "Discover dimensions in customer surveys and brand perception data. Group survey items into meaningful marketing constructs.",
    h1: "Factor Analysis Calculator for Marketing",
    heroText: "Marketing surveys often include dozens of items about brand perception, satisfaction, and purchase drivers. Factor analysis reveals the underlying dimensions — which questions are really measuring the same thing — enabling simpler, more actionable customer insights.",
    scenario: "A brand strategist analyzes responses to a 25-item brand perception survey from 500 consumers. Factor analysis reveals 4 dimensions: Trust (6 items), Innovation (5 items), Value (7 items), and Social Responsibility (4 items). Three items load poorly on any factor and are removed from future surveys.",
    whyUse: [
      "Discover the key dimensions of customer perception from multi-item survey data",
      "Simplify large surveys by identifying redundant items that can be removed",
      "Create reliable composite scores for brand equity, satisfaction, or loyalty dimensions",
    ],
    faqs: [
      { q: "How does factor analysis help improve my marketing survey?", a: "It reveals which items are redundant (loading on the same factor), which items are weak (low loadings on all factors), and which items cross-load (confusing respondents). This enables you to shorten and sharpen your survey." },
      { q: "Can I use factor analysis with a small survey sample?", a: "You need at least 5 participants per survey item, with a minimum of 100. For a 25-item survey, aim for 150+. Smaller samples produce unstable factor structures that may not replicate." },
      { q: "What is the difference between EFA and CFA for marketing research?", a: "EFA (exploratory) discovers the factor structure from data — use it when developing a new survey. CFA (confirmatory) tests a hypothesized structure — use it when validating an existing survey on a new population. Always use EFA first if you do not have a prior structure." },
    ],
  },
  "factor-analysis::education": {
    title: "Factor Analysis for Education — Free Online",
    description: "Validate educational assessments and surveys. Discover latent dimensions in test items, attitude scales, and learning inventories.",
    h1: "Factor Analysis Calculator for Education",
    heroText: "Educational instruments — achievement tests, learning style inventories, and classroom climate surveys — often claim to measure specific constructs. Factor analysis verifies these claims by revealing the actual latent structure of the items, supporting test validation and development.",
    scenario: "A test developer examines a new 40-item learning motivation inventory administered to 350 students. Factor analysis reveals 3 factors: Intrinsic Motivation (15 items), Performance Anxiety (12 items), and External Regulation (8 items). Five items cross-load on multiple factors and are revised for clarity.",
    whyUse: [
      "Validate that test items measure the constructs they are intended to measure",
      "Discover the dimensionality of educational surveys and assessment instruments",
      "Identify items that need revision because they load on unintended factors",
    ],
    faqs: [
      { q: "How do I know if my educational test is unidimensional?", a: "Run factor analysis and examine the scree plot. If one factor dominates (large first eigenvalue, steep drop to the second), the test is approximately unidimensional. A ratio of first to second eigenvalue above 3 strongly supports unidimensionality." },
      { q: "Can I use factor analysis with binary (correct/incorrect) test items?", a: "Standard factor analysis assumes continuous data. For binary items, use tetrachoric correlations as input instead of Pearson correlations. Alternatively, use Item Response Theory (IRT) which is designed for binary educational test data." },
      { q: "What is a cross-loading item and what should I do about it?", a: "A cross-loading item loads substantially (>.30) on two or more factors. It is ambiguous — respondents interpret it differently. Revise the wording to better target one construct, or assign it to the factor with the higher loading if both are theoretically justifiable." },
    ],
  },
  "factor-analysis::healthcare": {
    title: "Factor Analysis for Healthcare — Free Online",
    description: "Validate patient-reported outcomes and clinical assessment tools. Discover latent dimensions in symptom scales and quality-of-life measures.",
    h1: "Factor Analysis Calculator for Healthcare",
    heroText: "Clinical instruments measuring symptoms, quality of life, or functional status must have validated factor structures. Factor analysis confirms that the intended subscales (e.g., physical function, emotional well-being, social participation) actually emerge from patient response patterns.",
    scenario: "A research team validates a 36-item quality-of-life questionnaire (SF-36) in a new patient population (n = 400 chronic pain patients). Factor analysis confirms the expected 8-factor structure, but reveals that two subscales (Role Physical and Bodily Pain) merge into a single factor in this population, suggesting chronic pain patients do not distinguish between these domains.",
    whyUse: [
      "Validate the factor structure of clinical instruments in your specific patient population",
      "Identify whether translated or adapted clinical scales maintain their dimensional structure",
      "Discover symptom clusters and latent constructs in patient-reported outcome data",
    ],
    faqs: [
      { q: "Why might the factor structure differ in my patient population?", a: "Disease severity, age, culture, and comorbidities can alter how patients respond to questionnaire items. Factors that are distinct in healthy populations may merge in clinical samples where certain symptoms co-occur. Always validate instrument structure in your target population." },
      { q: "What sample size do I need for validating a clinical instrument?", a: "Follow the 5-10 participants per item guideline. For a 36-item instrument, aim for 180-360 patients. Under 100 is rarely sufficient. The COSMIN checklist recommends 100 as an absolute minimum and rates 300+ as 'very good'." },
      { q: "Should I use EFA or CFA for instrument validation?", a: "If the instrument has a published factor structure, use CFA to confirm it in your population. If you are developing a new instrument or the existing structure has not been validated in your population, start with EFA. Some researchers split their sample — EFA on half, CFA on the other half." },
    ],
  },

  // =========================================================================
  // KRUSKAL-WALLIS
  // =========================================================================
  "kruskal-wallis::psychology": {
    title: "Kruskal-Wallis for Psychology — Free Online",
    description: "Compare 3+ groups on ordinal or non-normal data. Nonparametric alternative to one-way ANOVA for psychology research.",
    h1: "Kruskal-Wallis Test Calculator for Psychology",
    heroText: "When comparing three or more groups on ordinal measures or with non-normal distributions, the Kruskal-Wallis test is the nonparametric alternative to one-way ANOVA. It is ideal for psychology studies using rating scales, ranked data, or small samples that violate ANOVA assumptions.",
    scenario: "A researcher compares patient satisfaction ratings (1-10 ordinal scale) across four different therapy modalities (CBT, DBT, psychodynamic, EMDR) with 15-20 patients per group. The ordinal data violates ANOVA's normality assumption. The Kruskal-Wallis test reveals a significant difference (H = 12.8, p = .005), with Dunn's post-hoc test identifying CBT and DBT as superior.",
    whyUse: [
      "Compare ordinal or non-normal outcomes across 3+ therapy types, experimental conditions, or diagnostic groups",
      "Analyze small-sample multi-group comparisons where ANOVA assumptions are unjustifiable",
      "Get automatic post-hoc pairwise comparisons (Dunn's test) to identify which groups differ",
    ],
    faqs: [
      { q: "When should I use Kruskal-Wallis instead of ANOVA?", a: "Use Kruskal-Wallis when your outcome is ordinal, your distributions are clearly non-normal, or your sample is too small per group (< 15) to rely on ANOVA's robustness. With large samples of continuous data, ANOVA is more powerful." },
      { q: "What post-hoc test follows a significant Kruskal-Wallis?", a: "Dunn's test with Bonferroni correction is the standard post-hoc for Kruskal-Wallis. It compares all pairs of groups while controlling the family-wise error rate. StatMate performs this automatically." },
      { q: "Can I report an effect size for Kruskal-Wallis?", a: "Yes. Report epsilon-squared (epsilon sq. = H / (n-1)) which ranges from 0 to 1. Values of .01, .06, and .14 correspond roughly to small, medium, and large effects, analogous to eta-squared in ANOVA." },
    ],
  },
  "kruskal-wallis::biology": {
    title: "Kruskal-Wallis for Biology — Free Online",
    description: "Compare 3+ biological groups with non-normal data. Nonparametric test for species counts, behavioral scores, and ecological data.",
    h1: "Kruskal-Wallis Test Calculator for Biology",
    heroText: "Biological data often involves count data, behavioral scores, or measurements with outliers that make ANOVA unreliable. Kruskal-Wallis provides a robust way to compare three or more groups without assuming normal distributions, making it ideal for field ecology and lab experiments with messy data.",
    scenario: "An entomologist compares insect species richness across five land-use types (forest, pasture, cropland, urban, wetland) with 8 sampling sites per type. Species counts are non-normally distributed with wide variation. Kruskal-Wallis confirms significant differences (H = 18.3, p = .001), with post-hoc tests showing forest and wetland supporting significantly higher richness.",
    whyUse: [
      "Compare species counts, behavioral frequencies, or other non-normal metrics across 3+ habitats or treatments",
      "Handle the zero-inflated and overdispersed count data common in ecological surveys",
      "Analyze small-sample field studies where normality assumptions are untenable",
    ],
    faqs: [
      { q: "Is Kruskal-Wallis appropriate for comparing species abundance data?", a: "Yes, for comparing total abundance or richness across sites/treatments. For community composition (which species are present), ordination methods are more appropriate. Kruskal-Wallis is ideal for univariate count comparisons." },
      { q: "My groups have very different sample sizes. Is that a problem?", a: "Kruskal-Wallis handles unequal group sizes. However, very small groups (n < 5) may have low power, and extreme imbalances can reduce the test's sensitivity. Aim for at least 5 observations per group." },
      { q: "How do I handle many tied values in my count data?", a: "Kruskal-Wallis uses average ranks for ties. Many ties reduce the test's discriminating power. If your count data has few distinct values (e.g., 0-5), consider a Poisson or negative binomial model instead." },
    ],
  },
  "kruskal-wallis::marketing": {
    title: "Kruskal-Wallis for Marketing — Free Online",
    description: "Compare 3+ customer segments or campaign variants on non-normal metrics. Nonparametric multi-group marketing analysis.",
    h1: "Kruskal-Wallis Test Calculator for Marketing",
    heroText: "Marketing comparisons across multiple segments or campaigns often involve heavily skewed data. When comparing revenue, engagement, or satisfaction across three or more groups, Kruskal-Wallis provides reliable results without the normality assumptions that ANOVA requires.",
    scenario: "An analyst compares average order value across four customer acquisition channels (organic, paid search, social, referral) with 50-80 customers per channel. Revenue is heavily right-skewed. Kruskal-Wallis reveals significant differences (H = 14.5, p = .002), with Dunn's post-hoc showing referral customers generating significantly higher order values than social media acquisitions.",
    whyUse: [
      "Compare revenue, CLV, or other skewed metrics across 3+ customer segments or channels",
      "Analyze ordinal customer satisfaction or rating data across multiple product categories",
      "Get robust multi-group comparisons when ANOVA's normality assumption is clearly violated",
    ],
    faqs: [
      { q: "Can I use Kruskal-Wallis to compare more than two A/B test variants?", a: "Yes. If you are running an A/B/C/D test on a non-normal metric (like revenue), Kruskal-Wallis tests whether any variant differs from the others. Follow up with Dunn's post-hoc to identify the winner." },
      { q: "How many observations per group do I need?", a: "At least 5 per group for the test to be meaningful, but 20+ per group is recommended for adequate power. With very large groups (500+), ANOVA becomes robust to non-normality and may be preferred for its greater power." },
      { q: "My data has many zeros (most users did not purchase). Should I use Kruskal-Wallis?", a: "Many zeros create heavy ties at zero, reducing the test's power. Consider analyzing only purchasers (and separately comparing purchase rates with chi-square), or use a two-part model that separates the purchase decision from the amount." },
    ],
  },
  "kruskal-wallis::education": {
    title: "Kruskal-Wallis for Education — Free Online",
    description: "Compare 3+ student groups on ordinal or non-normal data. Nonparametric alternative to ANOVA for education studies.",
    h1: "Kruskal-Wallis Test Calculator for Education",
    heroText: "Education data frequently involves ordinal outcomes (rubric scores, Likert ratings) or small classroom samples that violate ANOVA assumptions. Kruskal-Wallis provides a reliable way to compare three or more groups — different schools, teaching methods, or grade levels — without requiring normally distributed data.",
    scenario: "A researcher compares teacher effectiveness ratings (1-5 ordinal scale from student evaluations) across three teaching approaches (lecture, discussion, project-based) with 12 sections each. The ordinal ratings violate ANOVA assumptions. Kruskal-Wallis detects a significant difference (H = 8.7, p = .013), with project-based sections receiving significantly higher ratings.",
    whyUse: [
      "Compare ordinal outcomes (rubric scores, survey ratings) across 3+ teaching methods or programs",
      "Analyze small-sample multi-school comparisons where normality cannot be verified",
      "Avoid the parametric assumptions of ANOVA when working with bounded educational data",
    ],
    faqs: [
      { q: "Can I use Kruskal-Wallis to compare test scores across grade levels?", a: "Yes, if the scores are non-normal or you have small groups. For normally distributed scores with adequate sample sizes, ANOVA is more powerful. Kruskal-Wallis is the safe choice when assumptions are uncertain." },
      { q: "How do I follow up a significant Kruskal-Wallis result?", a: "Use Dunn's test (with Bonferroni or Holm correction) to compare all pairs of groups. This tells you which specific teaching methods or programs differ from each other while controlling the false positive rate." },
      { q: "Is Kruskal-Wallis appropriate for comparing rubric scores?", a: "Yes, rubric scores are ordinal data, making Kruskal-Wallis more appropriate than ANOVA. It ranks all scores and tests whether the rank distributions differ across groups, respecting the ordinal nature of the data." },
    ],
  },
  "kruskal-wallis::healthcare": {
    title: "Kruskal-Wallis for Healthcare — Free Online",
    description: "Compare patient outcomes across 3+ treatment groups with non-normal data. Nonparametric alternative to ANOVA for clinical research.",
    h1: "Kruskal-Wallis Test Calculator for Healthcare",
    heroText: "Clinical data involving pain scores, length of stay, functional ratings, or other non-normal outcomes often requires a nonparametric approach when comparing three or more treatment groups. Kruskal-Wallis provides a reliable alternative to ANOVA for these common clinical scenarios.",
    scenario: "A geriatric researcher compares functional independence scores (FIM, ordinal) across three rehabilitation settings (inpatient, outpatient, home-based) for 120 hip fracture patients. Kruskal-Wallis reveals significant differences (H = 11.4, p = .003), with inpatient rehabilitation producing significantly higher functional gains than home-based therapy.",
    whyUse: [
      "Compare ordinal clinical outcomes (pain scores, functional scales) across 3+ treatment protocols",
      "Analyze length of stay, cost, or other right-skewed clinical variables across multiple groups",
      "Provide robust results when sample sizes per group are small (common in clinical subgroup analyses)",
    ],
    faqs: [
      { q: "When should I use Kruskal-Wallis instead of ANOVA for clinical data?", a: "Use Kruskal-Wallis when (1) the outcome is ordinal (pain scales, functional ratings), (2) the data is clearly non-normal (length of stay, costs), or (3) group sizes are small (< 20) and normality is unverifiable." },
      { q: "Can I control for confounders with Kruskal-Wallis?", a: "No. Kruskal-Wallis does not adjust for covariates. If you need to control for age, severity, or other confounders, consider ordinal logistic regression or nonparametric ANCOVA alternatives." },
      { q: "How do I handle censored data in a clinical Kruskal-Wallis?", a: "Kruskal-Wallis does not handle censoring. If some patients have not yet experienced the outcome (e.g., still alive, still hospitalized), use the log-rank test or Cox regression for time-to-event data instead." },
    ],
  },

  // =========================================================================
  // REPEATED MEASURES ANOVA
  // =========================================================================
  "repeated-measures::psychology": {
    title: "Repeated Measures ANOVA for Psychology — Free",
    description: "Analyze within-subject designs with 3+ time points or conditions. Test longitudinal changes in therapy outcomes, mood, and behavior.",
    h1: "Repeated Measures ANOVA for Psychology",
    heroText: "Psychology research frequently measures the same participants across multiple time points or conditions — tracking anxiety across 4 therapy sessions, comparing responses to 3 emotional stimuli, or measuring learning across trials. Repeated measures ANOVA accounts for the correlation between measurements from the same person.",
    scenario: "A clinical researcher measures depression severity (PHQ-9) at baseline, week 4, week 8, and week 12 during a treatment program in 40 patients. Repeated measures ANOVA tests whether depression scores change significantly over time, with pairwise comparisons identifying at which time point significant improvement first appears.",
    whyUse: [
      "Track changes in psychological outcomes across 3+ time points during treatment or development",
      "Compare within-subject responses across 3+ experimental conditions (stimuli, tasks, scenarios)",
      "Account for individual differences by using each participant as their own control",
    ],
    faqs: [
      { q: "What is the sphericity assumption and why does it matter?", a: "Sphericity means the variances of differences between all pairs of conditions are equal. Violation inflates Type I error. Check Mauchly's test — if significant (p < .05), use the Greenhouse-Geisser correction. StatMate applies this automatically." },
      { q: "How many time points can I include?", a: "There is no strict limit, but power decreases with more levels and missing data becomes more problematic. Three to six time points are typical in clinical psychology. More than that, consider growth curve modeling." },
      { q: "What if some participants missed a session?", a: "Standard repeated measures ANOVA requires complete data. Participants with any missing time point are excluded entirely, which can drastically reduce your sample. For studies with attrition, mixed-effects models handle missing data more gracefully." },
    ],
  },
  "repeated-measures::biology": {
    title: "Repeated Measures ANOVA for Biology — Free",
    description: "Analyze repeated measurements on the same organisms. Track growth, response over time, or across experimental conditions.",
    h1: "Repeated Measures ANOVA for Biology",
    heroText: "Biological experiments often measure the same subjects repeatedly — tracking tumor growth over weeks, measuring enzyme activity at different temperatures, or monitoring animal behavior across conditions. Repeated measures ANOVA properly accounts for the dependency between measurements from the same biological unit.",
    scenario: "A physiologist measures heart rate in 12 rats under four stress conditions (baseline, mild, moderate, severe) in a within-subject design. Repeated measures ANOVA reveals a significant effect of stress level on heart rate (F = 28.4, p < .001), with post-hoc tests showing significant increases at each successive stress level.",
    whyUse: [
      "Track biological responses measured repeatedly on the same organisms over time or conditions",
      "Increase statistical power by controlling for between-subject variability (each organism is its own control)",
      "Analyze within-subject dose-response or time-course experiments with 3+ measurement points",
    ],
    faqs: [
      { q: "Can I use repeated measures ANOVA for longitudinal growth data?", a: "Yes, if you have 3+ equally spaced time points and complete data for all subjects. For unequally spaced measurements or missing data, linear mixed models are more appropriate." },
      { q: "My biological measurements are taken at different time intervals. Is this a problem?", a: "Repeated measures ANOVA treats conditions as categorical, so unequal spacing is handled. However, if the time pattern matters (linear growth), consider trend analysis as a follow-up to capture the specific shape of change." },
      { q: "How many subjects do I need for repeated measures ANOVA?", a: "Fewer than a between-subjects design, because each subject serves as its own control. As a rough guide, 10-15 subjects can be sufficient with 4+ conditions and a medium effect size. Use the sample size calculator for precision." },
    ],
  },
  "repeated-measures::marketing": {
    title: "Repeated Measures ANOVA for Marketing — Free",
    description: "Track marketing metrics across multiple time periods or conditions. Analyze within-subject changes in brand perception or preferences.",
    h1: "Repeated Measures ANOVA for Marketing",
    heroText: "Marketing research often tracks the same customers over time or exposes the same participants to multiple brand stimuli. Repeated measures ANOVA detects whether perceptions, preferences, or engagement change across these conditions while accounting for individual differences.",
    scenario: "A brand researcher surveys 80 consumers about their purchase intent for a product at four stages: after seeing the ad (T1), after product trial (T2), after 1 month of use (T3), and after 3 months (T4). Repeated measures ANOVA reveals how purchase intent evolves, with pairwise comparisons showing the steepest increase between T1 and T2 (trial effect).",
    whyUse: [
      "Track brand perception, satisfaction, or purchase intent across multiple touchpoints or time periods",
      "Compare consumer responses to 3+ product variants, ad creatives, or pricing scenarios within the same sample",
      "Measure the temporal impact of a campaign by surveying the same cohort at multiple intervals",
    ],
    faqs: [
      { q: "Can I use this to track NPS changes over quarterly surveys?", a: "Yes, if you survey the same customers each quarter. With 4 quarterly measurements, repeated measures ANOVA tests whether NPS changes significantly over time. Ensure you track individual respondents to pair the measurements." },
      { q: "What if some survey respondents did not complete all waves?", a: "Standard repeated measures ANOVA drops incomplete cases entirely. If attrition is substantial (>15%), this introduces bias. Consider sending reminders to maximize completion or using mixed-effects models that handle missing data." },
      { q: "How is this different from comparing independent samples at each time point?", a: "Repeated measures uses the paired structure to remove between-person variability, dramatically increasing power. Independent comparisons at each time point ignore this pairing and require much larger samples to detect the same effect." },
    ],
  },
  "repeated-measures::education": {
    title: "Repeated Measures ANOVA for Education — Free",
    description: "Track student progress across multiple assessments or time points. Analyze within-student changes in learning outcomes.",
    h1: "Repeated Measures ANOVA for Education",
    heroText: "Education naturally involves repeated measurement — students take assessments at multiple time points, undergo multiple tests within a semester, or are evaluated across different skill domains. Repeated measures ANOVA captures how student performance changes while accounting for the fact that measurements from the same student are correlated.",
    scenario: "A reading specialist administers fluency assessments to 30 students at 3 time points during the school year (fall, winter, spring). Repeated measures ANOVA shows significant improvement over time (F = 24.7, p < .001), with post-hoc comparisons revealing the largest gain between fall and winter, suggesting the intervention's initial impact is strongest.",
    whyUse: [
      "Track student growth across 3+ assessment time points within a school year",
      "Compare student performance across multiple test domains or skill areas",
      "Measure the trajectory of improvement during an educational intervention with multiple checkpoints",
    ],
    faqs: [
      { q: "Can I track student growth across fall, winter, and spring assessments?", a: "Yes, this is a classic application. Each student is measured 3 times, making it a repeated measures design. The ANOVA tests whether average performance changes significantly across the three assessments." },
      { q: "What if students transfer out during the year?", a: "Students with incomplete data are excluded from standard repeated measures ANOVA. Report the number of complete cases and consider whether those who left differ from those who stayed (selection bias). Mixed models handle incomplete data better." },
      { q: "Can I compare improvement rates between two groups (e.g., intervention vs. control)?", a: "For that, you need a mixed ANOVA (or split-plot ANOVA) with one between-subjects factor (group) and one within-subjects factor (time). StatMate's two-way ANOVA may help, but specialized mixed designs require the repeated measures framework." },
    ],
  },
  "repeated-measures::healthcare": {
    title: "Repeated Measures ANOVA for Healthcare — Free",
    description: "Track patient outcomes across multiple time points. Analyze treatment response trajectories in clinical studies.",
    h1: "Repeated Measures ANOVA for Healthcare",
    heroText: "Clinical studies routinely measure patients at multiple follow-up visits — tracking recovery, monitoring drug efficacy, or assessing disease progression over time. Repeated measures ANOVA is the standard method for analyzing whether patient outcomes change significantly across these measurement occasions.",
    scenario: "A rheumatologist tracks disease activity scores (DAS28) in 50 rheumatoid arthritis patients at baseline, 3 months, 6 months, and 12 months after starting a biologic therapy. Repeated measures ANOVA shows significant reduction in disease activity over time (F = 31.2, p < .001), with the largest improvement occurring between baseline and 3 months.",
    whyUse: [
      "Analyze treatment response trajectories across 3+ clinical follow-up visits",
      "Test whether patient outcomes (vital signs, lab values, symptom scores) change over time",
      "Maximize power by leveraging the within-patient design inherent in longitudinal clinical data",
    ],
    faqs: [
      { q: "How do I handle patient dropouts in a longitudinal clinical study?", a: "Repeated measures ANOVA requires complete data. With clinical dropout rates often exceeding 20%, this is a major limitation. Report the complete-case analysis but strongly consider linear mixed models as the primary analysis, as they handle incomplete data under the missing-at-random assumption." },
      { q: "Can I combine repeated measures with a between-groups factor?", a: "Yes, this is called a mixed ANOVA or split-plot design — common in clinical trials (treatment vs. control measured over time). The interaction term reveals whether treatment groups differ in their trajectories." },
      { q: "What does a significant time x group interaction mean clinically?", a: "It means the groups follow different trajectories. For example, the treatment group improves over time while the control group stays flat. This interaction is often the most clinically important result in a clinical trial." },
    ],
  },

  // =========================================================================
  // TWO-WAY ANOVA
  // =========================================================================
  "two-way-anova::psychology": {
    title: "Two-Way ANOVA for Psychology — Free Online",
    description: "Test main effects and interactions between two factors in psychology experiments. Analyze factorial designs with APA results.",
    h1: "Two-Way ANOVA Calculator for Psychology",
    heroText: "Psychological phenomena are rarely driven by a single factor. Two-way ANOVA allows you to simultaneously examine two independent variables and their interaction — for example, whether therapy type and patient sex jointly affect treatment outcomes, or whether the combination matters more than either factor alone.",
    scenario: "A researcher examines how therapy type (CBT vs. ACT) and severity level (mild, moderate, severe) affect anxiety reduction. Two-way ANOVA reveals a significant main effect of therapy (CBT > ACT), a significant main effect of severity, and a significant interaction: CBT is superior for moderate-severe cases, while both therapies are equally effective for mild anxiety.",
    whyUse: [
      "Test factorial designs with two independent variables and their interaction in a single analysis",
      "Discover interaction effects that would be missed by analyzing each factor separately",
      "Determine whether the effect of one variable depends on the level of another (moderation)",
    ],
    faqs: [
      { q: "What is an interaction effect and why does it matter?", a: "An interaction means the effect of one factor depends on the level of the other. For example, a drug might help men but not women. Interaction effects are often the most interesting finding because they reveal nuanced, conditional relationships." },
      { q: "How do I interpret results when the interaction is significant?", a: "When the interaction is significant, interpret main effects cautiously — they may be misleading. Instead, examine simple effects: compare levels of Factor A at each level of Factor B separately. An interaction plot helps visualize the pattern." },
      { q: "How many participants do I need per cell in a 2x3 design?", a: "A minimum of 20 per cell is recommended, giving you 120 total for a 2x3 design. With fewer than 10 per cell, the analysis has very low power, especially for detecting interactions." },
    ],
  },
  "two-way-anova::biology": {
    title: "Two-Way ANOVA for Biology — Free Online",
    description: "Analyze two-factor biological experiments. Test effects of treatment and environmental conditions with interaction analysis.",
    h1: "Two-Way ANOVA Calculator for Biology",
    heroText: "Biological experiments often manipulate two factors simultaneously — drug treatment and diet, temperature and pH, genotype and environment. Two-way ANOVA reveals whether each factor affects the outcome independently and whether their combination produces unexpected results (interaction).",
    scenario: "A plant scientist examines how fertilizer type (organic, synthetic) and watering frequency (daily, weekly) affect crop yield. Two-way ANOVA reveals both main effects are significant, plus a significant interaction: organic fertilizer outperforms synthetic under weekly watering, but the advantage disappears with daily watering.",
    whyUse: [
      "Test two experimental factors and their interaction in a single analysis (e.g., genotype x environment)",
      "Determine whether the effect of a treatment depends on the environmental condition",
      "Efficiently use experimental resources by testing multiple factors simultaneously instead of separately",
    ],
    faqs: [
      { q: "How do I set up a two-factor experiment for two-way ANOVA?", a: "Fully cross both factors: every combination of Factor A levels and Factor B levels must be represented. For a 2x3 design, you need 6 groups with equal replicates in each. Randomize assignment to groups." },
      { q: "Can I use two-way ANOVA for unequal cell sizes?", a: "Yes, but interpretation is more complex. With unequal cell sizes, the Type of sum of squares matters (Type I, II, or III). Type III is the most common choice as it tests each factor adjusted for the other, regardless of cell sizes." },
      { q: "My biological response variable is a count. Is two-way ANOVA appropriate?", a: "If counts are large (>20) and approximately normally distributed, ANOVA is acceptable. For small counts, zeros, or overdispersed data, a generalized linear model (Poisson or negative binomial with two factors) is more appropriate." },
    ],
  },
  "two-way-anova::marketing": {
    title: "Two-Way ANOVA for Marketing — Free Online",
    description: "Test how two marketing factors interact. Analyze campaign x segment, pricing x placement, and other two-factor designs.",
    h1: "Two-Way ANOVA Calculator for Marketing",
    heroText: "Marketing effectiveness often depends on combinations of factors — does a discount work better with email or SMS? Does premium positioning matter more for younger or older demographics? Two-way ANOVA answers these questions by testing two factors simultaneously and revealing whether their interaction changes the outcome.",
    scenario: "A marketer tests two factors: messaging style (emotional, rational) and platform (email, social, SMS) on click-through rates. Two-way ANOVA reveals a significant interaction: emotional messaging dominates on social media, while rational messaging performs best in email. This insight drives platform-specific creative strategies.",
    whyUse: [
      "Test how two marketing variables interact to affect campaign performance",
      "Identify which combinations of segment, channel, and creative produce the best results",
      "Detect interaction effects where one factor's impact depends on the level of another",
    ],
    faqs: [
      { q: "Can I use two-way ANOVA to test messaging x channel interactions?", a: "Yes, if you randomize participants to each combination of message type and channel. Each cell (e.g., emotional + email) needs adequate data. The interaction tells you whether the best message depends on the channel." },
      { q: "How is this different from running separate analyses per segment?", a: "Two-way ANOVA formally tests the interaction using all the data simultaneously, which is more powerful and statistically rigorous than splitting data into subgroups and analyzing each separately." },
      { q: "My outcome is conversion rate (a proportion). Is two-way ANOVA appropriate?", a: "For aggregate conversion rates across many users, ANOVA approximation works with large samples. For individual-level binary data, logistic regression with two factors is more appropriate." },
    ],
  },
  "two-way-anova::education": {
    title: "Two-Way ANOVA for Education — Free Online",
    description: "Analyze how two factors affect learning outcomes. Test teaching method x student characteristic interactions.",
    h1: "Two-Way ANOVA Calculator for Education",
    heroText: "Educational outcomes depend on both instruction and learner characteristics. Two-way ANOVA lets you test whether teaching method effectiveness depends on student background, grade level, or ability group — revealing which students benefit most from which approaches.",
    scenario: "An education researcher examines how teaching method (direct instruction, inquiry-based) and student ability level (high, medium, low) affect science test scores. Two-way ANOVA reveals a significant interaction: inquiry-based learning benefits high-ability students most, while direct instruction provides a larger advantage for low-ability students.",
    whyUse: [
      "Test whether teaching method effectiveness differs across student subgroups (aptitude-treatment interactions)",
      "Examine how two school-level factors (class size and teacher experience) jointly affect achievement",
      "Identify which combinations of instruction and student characteristics produce optimal outcomes",
    ],
    faqs: [
      { q: "What is an aptitude-treatment interaction in education?", a: "It occurs when the best teaching method depends on student characteristics (aptitude). For example, visual learners may benefit more from multimedia instruction while verbal learners prefer text-based approaches. Two-way ANOVA formally tests this interaction." },
      { q: "Can I cross teaching method with grade level?", a: "Yes. This tests whether a teaching method's effectiveness varies by grade level. Be cautious about interpreting main effects of grade level, as older students naturally score higher on absolute measures — use grade-appropriate assessments." },
      { q: "How many students per cell do I need?", a: "Aim for at least 15-20 per cell. For a 2x3 design (2 methods x 3 ability levels), that is 90-120 students total. Fewer than 10 per cell makes detecting interaction effects very difficult." },
    ],
  },
  "two-way-anova::healthcare": {
    title: "Two-Way ANOVA for Healthcare — Free Online",
    description: "Analyze two-factor clinical designs. Test treatment x patient group interactions in clinical research.",
    h1: "Two-Way ANOVA Calculator for Healthcare",
    heroText: "Clinical outcomes often depend on both the treatment given and patient characteristics. Two-way ANOVA tests whether treatment effectiveness varies across patient subgroups — a critical question for personalized medicine and clinical trial subgroup analysis.",
    scenario: "A pharmacologist compares the effectiveness of two analgesic protocols (standard, enhanced) across three surgical types (orthopedic, abdominal, cardiac) on post-operative pain scores. Two-way ANOVA reveals a significant interaction: the enhanced protocol provides a greater pain reduction benefit in orthopedic surgery compared to the other surgical types.",
    whyUse: [
      "Test whether treatment effectiveness varies across patient subgroups (treatment x subgroup interaction)",
      "Analyze factorial clinical trial designs with two intervention factors",
      "Identify patient populations that benefit most from specific treatments",
    ],
    faqs: [
      { q: "Can I use two-way ANOVA for subgroup analysis in a clinical trial?", a: "Yes, but be cautious. Pre-specified subgroup analyses using two-way ANOVA's interaction term are valid. Post-hoc subgroup analyses are exploratory and should be labeled as such. Multiple testing corrections may be needed." },
      { q: "What if the interaction is not significant?", a: "A non-significant interaction suggests the treatment effect is consistent across subgroups. You can then interpret the main effects straightforwardly. This is actually a desirable result in many clinical contexts — it means the treatment works broadly." },
      { q: "My cells have unequal sample sizes due to clinical realities. What should I do?", a: "Use Type III sum of squares, which provides valid tests regardless of unequal cell sizes. Report cell sizes and consider whether the imbalance reflects differential enrollment or dropout patterns that could introduce bias." },
    ],
  },

  // =========================================================================
  // FRIEDMAN TEST
  // =========================================================================
  "friedman::psychology": {
    title: "Friedman Test for Psychology — Free Online",
    description: "Compare 3+ related conditions with non-normal data. Nonparametric repeated measures test for psychology research.",
    h1: "Friedman Test Calculator for Psychology",
    heroText: "When the same participants rate or respond to three or more conditions and the data is ordinal or non-normal, the Friedman test is the nonparametric alternative to repeated measures ANOVA. It ranks within each participant and tests whether condition rankings differ systematically.",
    scenario: "A consumer psychologist asks 25 participants to rate the appeal of four product packaging designs on a 1-7 Likert scale. Since single Likert items are ordinal, she uses the Friedman test to determine whether the four designs receive significantly different ratings (chi-sq = 18.6, p < .001), with post-hoc tests identifying Design C as the clear winner.",
    whyUse: [
      "Compare ordinal ratings or ranks across 3+ conditions within the same participants",
      "Analyze within-subject data when repeated measures ANOVA assumptions are violated",
      "Test whether preference rankings across multiple options differ from chance",
    ],
    faqs: [
      { q: "When should I use Friedman instead of repeated measures ANOVA?", a: "Use Friedman when (1) your outcome is ordinal (single Likert item, rank order), (2) the distribution of differences is non-normal, or (3) you have a small sample that precludes checking normality. For continuous, normally distributed repeated measures, ANOVA is more powerful." },
      { q: "What post-hoc test follows a significant Friedman test?", a: "Nemenyi's test or Conover's test with Bonferroni correction for pairwise comparisons. StatMate performs these automatically. These identify which specific conditions differ from each other." },
      { q: "Can I use the Friedman test for ranked preference data?", a: "Yes. If participants ranked items from best to worst, these ranks are inherently ordinal. The Friedman test is designed precisely for this type of data — it tests whether the rankings are consistent across participants." },
    ],
  },
  "friedman::biology": {
    title: "Friedman Test for Biology — Free Online",
    description: "Compare 3+ related biological measurements with non-normal data. Nonparametric repeated measures for lab experiments.",
    h1: "Friedman Test Calculator for Biology",
    heroText: "When the same biological specimens are measured under three or more conditions and the data is non-normal or ordinal, the Friedman test provides a robust nonparametric analysis. It accounts for the paired structure while avoiding distributional assumptions.",
    scenario: "A pharmacologist measures pain behavior scores (ordinal 0-5 scale) in 15 mice under four conditions: baseline, low dose, medium dose, and high dose of an analgesic. The Friedman test determines whether pain scores change significantly across dose levels (chi-sq = 28.1, p < .001), with post-hoc comparisons identifying the minimum effective dose.",
    whyUse: [
      "Analyze ordinal behavioral scores or non-normal measurements across 3+ treatments within the same subjects",
      "Compare repeated biological measurements when within-subject distributions are skewed",
      "Test dose-response relationships in within-subject designs with small samples",
    ],
    faqs: [
      { q: "Can I use Friedman for repeated gene expression measurements?", a: "If the same samples are measured under 3+ conditions and the data is non-normal, yes. However, for large-scale genomics (thousands of genes), specialized methods are more appropriate. Friedman works well for targeted studies with a few genes." },
      { q: "How many subjects do I need for the Friedman test?", a: "A minimum of 6-8 subjects is needed for reasonable power with 3+ conditions. With fewer subjects, even strong effects may not reach significance. More conditions help compensate for small sample sizes." },
      { q: "My animals died during the experiment, creating missing data. Can I still use Friedman?", a: "Friedman requires complete data across all conditions. Subjects with any missing measurements must be excluded. Report the number excluded and consider whether their loss is related to the treatment (informative censoring)." },
    ],
  },
  "friedman::marketing": {
    title: "Friedman Test for Marketing — Free Online",
    description: "Compare 3+ related marketing conditions with ordinal data. Test customer preferences and rankings across multiple options.",
    h1: "Friedman Test Calculator for Marketing",
    heroText: "Marketing research often asks the same respondents to evaluate multiple options — rating competing brands, ranking product features, or scoring different ad concepts. When these within-subject evaluations use ordinal scales, the Friedman test determines whether preferences differ significantly across options.",
    scenario: "A product team asks 40 users to rate three prototype interfaces (A, B, C) on usability using a 1-10 scale. Ratings are non-normally distributed due to clustering at extremes. The Friedman test shows significant differences (chi-sq = 22.4, p < .001), with post-hoc tests confirming Interface B is rated significantly higher than both A and C.",
    whyUse: [
      "Test whether customer ratings or rankings differ across 3+ product options or brand concepts",
      "Analyze within-subject design evaluations (same respondents rating all variants)",
      "Handle ordinal survey data that violates repeated measures ANOVA assumptions",
    ],
    faqs: [
      { q: "Can I use Friedman to analyze product feature preference rankings?", a: "Yes. If customers rank features from most to least important, Friedman tests whether the rankings are consistent across respondents. A significant result means certain features are systematically preferred over others." },
      { q: "How many respondents do I need?", a: "At least 10-15 respondents for 3-4 options, more for detecting smaller preference differences. With very few respondents, only very large preference differences will be detected." },
      { q: "What if respondents did not evaluate all options?", a: "Friedman requires complete data. If some respondents skipped an option, they must be excluded. Design your survey to minimize this by making all evaluations mandatory and keeping the number of options manageable (3-6)." },
    ],
  },
  "friedman::education": {
    title: "Friedman Test for Education — Free Online",
    description: "Compare student performance across 3+ related assessments with non-normal data. Nonparametric repeated measures for education.",
    h1: "Friedman Test Calculator for Education",
    heroText: "Education studies often measure the same students across multiple assessments, tests, or evaluation periods, producing ordinal or non-normal data. The Friedman test determines whether student performance changes significantly across these repeated measurements without requiring the assumptions of repeated measures ANOVA.",
    scenario: "A music teacher evaluates 20 students' performance on three different instrument techniques using a 1-5 rubric. The Friedman test determines whether students perform differently across the three techniques (chi-sq = 14.2, p < .001), identifying which technique requires additional practice time.",
    whyUse: [
      "Compare rubric scores or ordinal assessments across 3+ evaluation criteria for the same students",
      "Analyze student performance across multiple tests when score distributions are non-normal",
      "Test whether learning progression differs across subjects or skill domains within the same students",
    ],
    faqs: [
      { q: "Can I use Friedman for comparing rubric scores across assignments?", a: "Yes. If the same students are scored on the same rubric across multiple assignments, Friedman tests whether their rubric scores differ systematically across assignments. This is appropriate because rubric scores are ordinal." },
      { q: "Is Friedman appropriate for comparing student ratings of different teachers?", a: "Yes, if the same students rate multiple teachers using the same scale. The Friedman test determines whether ratings differ across teachers, controlling for individual differences in rating tendencies." },
      { q: "What should I do if the Friedman test is not significant?", a: "A non-significant result means no consistent difference across conditions was detected. This could mean no real difference exists or your sample was too small. Report the test statistic and p-value, and note the sample size limitation if applicable." },
    ],
  },
  "friedman::healthcare": {
    title: "Friedman Test for Healthcare — Free Online",
    description: "Compare patient outcomes across 3+ related conditions with non-normal data. Nonparametric repeated measures for clinical studies.",
    h1: "Friedman Test Calculator for Healthcare",
    heroText: "Clinical studies measuring the same patients across multiple time points or treatment conditions often produce ordinal or skewed data. The Friedman test is the nonparametric standard for comparing these related measurements, widely accepted in clinical research publications.",
    scenario: "A pain researcher measures pain intensity (0-10 NRS) in 30 patients at 4 time points after surgery: 2h, 6h, 12h, and 24h. Pain scores are ordinal and non-normally distributed. The Friedman test confirms significant change over time (chi-sq = 52.1, p < .001), with Nemenyi post-hoc showing significant decrease between each consecutive time point.",
    whyUse: [
      "Analyze pain scores, functional ratings, or other ordinal outcomes across 3+ post-treatment time points",
      "Compare patient responses to 3+ treatments in crossover designs",
      "Handle non-normal clinical measurements without transformations or distributional assumptions",
    ],
    faqs: [
      { q: "Is the Friedman test accepted in medical journals?", a: "Yes. Friedman is widely used and accepted in clinical research when data is ordinal or non-normal. It is the recommended nonparametric alternative to repeated measures ANOVA in many clinical statistics textbooks." },
      { q: "Can I use Friedman for a 3-period crossover drug trial?", a: "Yes. If the same patients receive 3 treatments (with washout periods), Friedman tests whether responses differ across treatments. Ensure adequate washout to avoid carryover effects." },
      { q: "How do I handle patients who missed a follow-up visit?", a: "Friedman requires complete data. Exclude patients with missing visits and report the number excluded. If dropout exceeds 10-15%, consider whether the missing data is informative (e.g., patients dropped out because they felt worse)." },
    ],
  },

  // =========================================================================
  // FISHER'S EXACT TEST
  // =========================================================================
  "fisher-exact::psychology": {
    title: "Fisher's Exact Test for Psychology — Free",
    description: "Test associations in small-sample categorical data. Exact p-values for 2x2 tables in clinical and experimental psychology.",
    h1: "Fisher's Exact Test Calculator for Psychology",
    heroText: "When your psychology study has a small sample and you are comparing two categorical variables, chi-square's approximation becomes unreliable. Fisher's exact test computes the exact probability, making it the gold standard for small-sample categorical analysis in clinical and experimental psychology.",
    scenario: "A clinical researcher studies whether trauma type (single event vs. chronic) is associated with PTSD diagnosis (yes/no) in a small sample of 28 emergency department patients. With expected cell counts below 5, chi-square is inappropriate. Fisher's exact test yields p = .032, confirming a significant association between chronic trauma and PTSD.",
    whyUse: [
      "Analyze small-sample 2x2 tables where expected cell counts are below 5",
      "Get exact p-values for clinical studies with limited patient availability",
      "Test associations between binary variables in case studies and pilot research",
    ],
    faqs: [
      { q: "When should I use Fisher's exact test instead of chi-square?", a: "Use Fisher's exact when any expected cell count is below 5, or the total sample is below 20-30. With larger samples, both tests give nearly identical results. StatMate automatically recommends Fisher's when appropriate." },
      { q: "Can Fisher's exact test handle tables larger than 2x2?", a: "Yes, technically, but computation becomes intensive for large tables. For RxC tables with small samples, Fisher's exact is still preferred over chi-square. StatMate handles 2x2 tables directly." },
      { q: "Should I report one-tailed or two-tailed Fisher's exact p-value?", a: "Report two-tailed (default) unless you had a specific directional hypothesis stated before data collection. One-tailed tests are more powerful but only test in one direction and are viewed skeptically if not pre-specified." },
    ],
  },
  "fisher-exact::biology": {
    title: "Fisher's Exact Test for Biology — Free Online",
    description: "Test associations in small biological samples. Exact analysis for mutation rates, infection status, and categorical lab data.",
    h1: "Fisher's Exact Test Calculator for Biology",
    heroText: "Biological experiments with limited specimens, rare mutations, or expensive assays often produce small contingency tables where chi-square is unreliable. Fisher's exact test was literally invented for biological research — R.A. Fisher developed it for a tea-tasting experiment — and provides exact p-values regardless of sample size.",
    scenario: "A microbiologist tests whether a new antibiotic is associated with bacterial clearance (cleared/not cleared) in 18 infected mice (9 treated, 9 control). With this small sample, Fisher's exact test determines whether the 8/9 clearance rate in treated mice vs. 3/9 in controls is statistically significant (p = .015, one-tailed).",
    whyUse: [
      "Analyze small-sample experiments with binary outcomes (survived/died, mutant/wild-type)",
      "Test whether treatment success rates differ when sample sizes are limited by ethical or cost constraints",
      "Get exact p-values for gene-disease associations, mutation frequencies, and infection rates in small cohorts",
    ],
    faqs: [
      { q: "How small can my sample be for Fisher's exact test?", a: "There is no minimum sample size. Fisher's exact works with as few as 4-5 total observations. However, with very small samples, you may not have enough power to detect real associations. The test is valid but underpowered." },
      { q: "Can I use Fisher's exact for comparing mutation frequencies?", a: "Yes. Enter the number of mutants and wild-types in each group (treatment/control). Fisher's exact test determines whether the mutation rate differs significantly. This is common in toxicology and genetic screening studies." },
      { q: "My experiment has many 2x2 tables (one per gene). How do I handle multiple testing?", a: "Apply a multiple testing correction (Bonferroni or FDR/Benjamini-Hochberg) to control the false discovery rate. With hundreds of tests, unadjusted p-values will produce many false positives." },
    ],
  },
  "fisher-exact::marketing": {
    title: "Fisher's Exact Test for Marketing — Free",
    description: "Test conversion differences with small samples. Exact analysis for pilot A/B tests, niche segments, and early campaign data.",
    h1: "Fisher's Exact Test Calculator for Marketing",
    heroText: "Not every A/B test involves thousands of users. Pilot tests, niche segments, and B2B campaigns may have only 20-50 observations. Fisher's exact test provides reliable conversion comparisons even with tiny samples, avoiding the inflated false-positive risk of chi-square with small cell counts.",
    scenario: "A B2B startup tests two demo request page layouts on a niche audience. Version A: 4 out of 15 visitors request a demo. Version B: 10 out of 18 visitors request a demo. Fisher's exact test determines whether this difference (27% vs. 56%) is statistically significant (p = .08), suggesting Version B may be better but more data is needed.",
    whyUse: [
      "Analyze pilot A/B tests with small traffic volumes before scaling to full experiments",
      "Compare conversion rates in niche customer segments where sample sizes are naturally small",
      "Get reliable p-values for early-stage campaign data without waiting for large samples",
    ],
    faqs: [
      { q: "Can I use Fisher's exact for a pilot A/B test with 30 total visitors?", a: "Yes, this is exactly the scenario Fisher's exact is designed for. Chi-square requires expected counts of 5+ per cell, which may not be met with 30 visitors. Fisher's exact gives a valid p-value regardless of sample size." },
      { q: "My Fisher's exact p-value is 0.08. What should I conclude?", a: "A p-value of .08 is suggestive but not significant at the conventional .05 level. In marketing, this may warrant continuing the experiment with more data rather than making a definitive call. Report the exact p-value and the observed proportions." },
      { q: "Should I use one-tailed or two-tailed Fisher's exact?", a: "Use two-tailed if you want to test whether the variants differ in either direction. Use one-tailed only if you pre-specified that you are testing whether Version B is specifically better (not worse). One-tailed gives a smaller p-value but is only valid if the direction was predicted in advance." },
    ],
  },
  "fisher-exact::education": {
    title: "Fisher's Exact Test for Education — Free",
    description: "Test associations in small education samples. Compare pass/fail rates, program outcomes, and categorical data with exact p-values.",
    h1: "Fisher's Exact Test Calculator for Education",
    heroText: "Many education studies involve small groups — a single classroom, a pilot program, or a special education cohort. When comparing categorical outcomes (pass/fail, advanced/proficient/basic) in these small samples, Fisher's exact test provides the reliable statistical analysis that chi-square cannot.",
    scenario: "A special education coordinator compares program completion rates (completed/not completed) between two intervention approaches with 8 and 10 students respectively. Fisher's exact test determines whether the higher completion rate in the new approach (7/8 vs. 5/10) is statistically significant, guiding decisions about program adoption.",
    whyUse: [
      "Compare pass/fail or completion rates between small student groups or pilot programs",
      "Analyze categorical outcomes in special education settings with inherently small cohorts",
      "Get exact p-values when chi-square's large-sample approximation breaks down",
    ],
    faqs: [
      { q: "My two classes have only 12 students each. Can I compare their pass rates?", a: "Yes. With 24 total students, chi-square may be unreliable if any expected cell count drops below 5. Fisher's exact test gives a valid p-value for any sample size. Enter the number who passed and failed in each class." },
      { q: "Can Fisher's exact test handle more than two outcome categories?", a: "Fisher's exact for 2x2 tables is the most common form. For larger tables (e.g., 2x3 with three proficiency levels), the Freeman-Halton extension applies. StatMate's chi-square calculator also flags when Fisher's exact is needed." },
      { q: "The p-value is 0.12 in my pilot study. Should I abandon the intervention?", a: "No. A non-significant result in a small pilot study often reflects insufficient power, not an ineffective intervention. Report the effect size (odds ratio or risk difference) and use the result to plan a larger study with adequate power." },
    ],
  },
  "fisher-exact::healthcare": {
    title: "Fisher's Exact Test for Healthcare — Free",
    description: "Test associations in small clinical samples. Exact p-values for rare adverse events, pilot trials, and case-control studies.",
    h1: "Fisher's Exact Test Calculator for Healthcare",
    heroText: "Clinical research frequently involves small samples — rare diseases, expensive treatments, or early-phase trials. When comparing binary outcomes (alive/dead, responder/non-responder, adverse event/none) in these small samples, Fisher's exact test is the recommended method, providing exact p-values where chi-square would be unreliable.",
    scenario: "An oncologist compares response rates (complete response / no response) between two experimental chemotherapy regimens in a Phase II trial with 12 patients per arm. Fisher's exact test determines whether the observed difference in response rates (7/12 vs. 3/12) is statistically significant (p = .10), informing the decision to proceed to Phase III.",
    whyUse: [
      "Compare binary outcomes in small clinical trials, rare disease studies, and case series",
      "Test whether adverse event rates differ between treatment groups when events are rare",
      "Analyze pilot trial data to estimate effect sizes and plan larger studies",
    ],
    faqs: [
      { q: "When should I use Fisher's exact instead of chi-square in clinical research?", a: "Use Fisher's exact when any expected cell count is below 5, which commonly occurs with small trials, rare events, or unbalanced groups. Most clinical statistics guidelines recommend Fisher's exact for total N below 40 or any expected count below 5." },
      { q: "How do I interpret the odds ratio from Fisher's exact test?", a: "The odds ratio quantifies the strength of association. OR = 1 means no association, OR = 2 means twice the odds of the outcome in the exposed group. For clinical significance, also consider the confidence interval — if it is wide, the estimate is imprecise." },
      { q: "Can I use Fisher's exact for a rare adverse event analysis?", a: "Yes. When adverse events are rare (e.g., 2 events in treatment group, 0 in control), Fisher's exact gives a valid p-value. However, with very rare events, the confidence interval for the odds ratio will be extremely wide, limiting conclusions." },
    ],
  },

  // =========================================================================
  // McNEMAR TEST
  // =========================================================================
  "mcnemar::psychology": {
    title: "McNemar Test for Psychology — Free Online",
    description: "Compare paired binary outcomes in within-subject psychology designs. Test pre/post diagnostic changes and treatment response shifts.",
    h1: "McNemar Test Calculator for Psychology",
    heroText: "The McNemar test is designed for paired binary data — the same participants classified into two categories at two time points. In psychology, this arises when testing whether a treatment changes diagnostic status, whether attitudes shift from agree to disagree, or whether behavior changes from present to absent.",
    scenario: "A therapist evaluates whether a phobia treatment changes diagnostic status (phobic/not phobic) in 50 patients. Before treatment, 42 are phobic. After treatment, 28 remain phobic, 14 are no longer phobic, and 2 who were not phobic became phobic. McNemar tests whether the proportion of phobic patients changed significantly (p < .001).",
    whyUse: [
      "Test whether treatment changes the proportion of patients meeting a diagnostic threshold",
      "Analyze paired binary responses: agree/disagree before and after an intervention",
      "Compare sensitivity and specificity of two diagnostic tools applied to the same patients",
    ],
    faqs: [
      { q: "What kind of data does the McNemar test require?", a: "Paired binary data: the same subjects classified into two categories at two time points (or by two methods). Enter the data as a 2x2 table where rows = before (or test 1) and columns = after (or test 2). Only discordant pairs (changed categories) affect the test." },
      { q: "How is McNemar different from chi-square?", a: "Chi-square tests independence between two variables in independent observations. McNemar tests whether paired observations show a systematic shift from one category to another. The paired structure is the key difference — McNemar accounts for the dependency." },
      { q: "What if very few participants changed categories?", a: "McNemar's power depends on discordant pairs (those who changed). If only 5-10 participants changed, the test has low power. With fewer than 25 discordant pairs, use the exact McNemar test rather than the chi-square approximation." },
    ],
  },
  "mcnemar::biology": {
    title: "McNemar Test for Biology — Free Online",
    description: "Compare paired binary biological data. Test diagnostic accuracy, treatment response, and matched case-control designs.",
    h1: "McNemar Test Calculator for Biology",
    heroText: "Biological studies frequently involve paired binary data — the same organism tested positive/negative with two different assays, the same tissue sample classified by two pathologists, or the same animal surviving/dying under two sequential treatments. McNemar's test determines whether these paired binary outcomes differ systematically.",
    scenario: "A veterinary researcher compares two diagnostic tests for Lyme disease applied to the same 80 dog blood samples. Test A detects 45 positives; Test B detects 52 positives. McNemar determines whether the detection rates differ significantly (p = .04), with 12 samples detected only by Test B and 5 only by Test A.",
    whyUse: [
      "Compare sensitivity of two diagnostic assays applied to the same biological samples",
      "Test whether infection/disease status changes in the same organisms after treatment",
      "Analyze matched case-control studies in epidemiology (matched on confounders)",
    ],
    faqs: [
      { q: "How do I compare two diagnostic tests on the same samples?", a: "Apply both tests to each sample and classify results as (+/+), (+/-), (-/+), or (-/-). McNemar tests whether the discordant pairs (+/- vs. -/+) are balanced. A significant result means the tests have different positive rates." },
      { q: "Can I use McNemar for matched case-control studies?", a: "Yes. In matched case-control studies (each case matched to a control on confounders), McNemar tests whether exposure rates differ between cases and controls. Enter the discordant pairs (case exposed/control not, and vice versa)." },
      { q: "What is the minimum sample size for McNemar's test?", a: "The test depends on discordant pairs, not total sample size. You need at least 10 discordant pairs for the standard test or 6 for the exact version. If most pairs are concordant, you need a very large total sample to get enough discordant pairs." },
    ],
  },
  "mcnemar::marketing": {
    title: "McNemar Test for Marketing — Free Online",
    description: "Compare paired binary marketing outcomes. Test brand awareness shifts, purchase behavior changes, and before/after campaign effects.",
    h1: "McNemar Test Calculator for Marketing",
    heroText: "Marketing campaigns aim to change behavior — from non-buyer to buyer, unaware to aware, or unsubscribed to subscribed. When you survey the same customers before and after a campaign, the McNemar test determines whether the proportion in each category shifted significantly, accounting for the paired nature of the data.",
    scenario: "A brand manager surveys 200 consumers about brand awareness (aware/unaware) before and after a TV campaign. Before: 80 aware, 120 unaware. After: 130 aware, 70 unaware. Of the 120 initially unaware, 60 became aware, while 10 of the initially aware forgot. McNemar tests whether the overall awareness shift is significant (p < .001).",
    whyUse: [
      "Measure whether a campaign significantly shifted brand awareness or purchase intent",
      "Compare the same customers' behavior (purchased/not) before and after a product change",
      "Analyze paired survey data where the same respondents answered at two time points",
    ],
    faqs: [
      { q: "Can I use McNemar to measure campaign effectiveness?", a: "Yes, if you survey the same people before and after the campaign. McNemar tests whether the proportion aware (or intending to purchase) changed significantly. This is more rigorous than comparing two independent cross-sectional surveys." },
      { q: "What if I only have aggregate data (total aware before vs. after)?", a: "McNemar requires paired data — you must know each individual's status at both time points. Aggregate before/after proportions alone are insufficient because you do not know who changed. Design your study with matched tracking." },
      { q: "How do I interpret the McNemar result for stakeholders?", a: "Focus on the discordant pairs: '60 consumers became aware (new conversions) while only 10 lost awareness (attrition). The net gain of 50 is statistically significant (p < .001), confirming the campaign's impact.'" },
    ],
  },
  "mcnemar::education": {
    title: "McNemar Test for Education — Free Online",
    description: "Compare paired binary education outcomes. Test pre/post proficiency changes and intervention effectiveness on pass/fail rates.",
    h1: "McNemar Test Calculator for Education",
    heroText: "Education interventions often aim to move students from one category to another — from below proficient to proficient, from non-reader to reader, or from incorrect to correct on a specific skill. The McNemar test determines whether the intervention significantly shifted the proportion of students in each category.",
    scenario: "A reading intervention specialist tests 40 struggling first-graders on letter recognition (pass/fail) before and after a 6-week phonics intervention. Before: 12 passed. After: 30 passed. McNemar tests whether the proportion passing improved significantly (p < .001), with 22 students moving from fail to pass and only 4 from pass to fail.",
    whyUse: [
      "Test whether an intervention significantly increased the proportion of students reaching proficiency",
      "Analyze pre/post changes on binary mastery outcomes (mastered/not mastered) for the same students",
      "Compare classification accuracy of two assessment methods given to the same students",
    ],
    faqs: [
      { q: "How do I test whether my intervention moved students to proficiency?", a: "Classify each student as proficient or not proficient before and after the intervention. Enter the four counts (stayed proficient, became proficient, lost proficiency, stayed non-proficient) into the McNemar test. The test focuses on the students who changed." },
      { q: "Most of my students improved. Why might the test not be significant?", a: "McNemar tests the balance of changes in both directions. If 15 improved but 10 declined, the net change of 5 may not be significant. The test needs an imbalance in the discordant pairs, not just improvement." },
      { q: "Can I use McNemar to compare two different assessments?", a: "Yes. If the same students take two assessments and you want to know whether the pass rates differ, McNemar is appropriate. It tests whether the discordant pairs (pass one / fail the other) are balanced." },
    ],
  },
  "mcnemar::healthcare": {
    title: "McNemar Test for Healthcare — Free Online",
    description: "Compare paired binary clinical outcomes. Test diagnostic agreement, treatment response, and pre/post clinical status changes.",
    h1: "McNemar Test Calculator for Healthcare",
    heroText: "Clinical research frequently involves paired binary data — the same patient's disease status before and after treatment, the same sample tested by two diagnostic methods, or matched case-control pairs. McNemar's test is the standard method for determining whether these paired proportions differ, widely required by clinical journals.",
    scenario: "A cardiologist evaluates whether a new statin therapy changes LDL classification (above/below target) in 100 patients over 6 months. Before treatment: 72 above target. After: 35 above target. McNemar tests whether the proportion above target changed significantly (p < .001), documenting that 42 patients moved below target while only 5 moved above.",
    whyUse: [
      "Test whether treatment changes the proportion of patients meeting clinical targets",
      "Compare the diagnostic accuracy (sensitivity/specificity) of two tests applied to the same patients",
      "Analyze matched case-control studies where cases and controls are paired on confounders",
    ],
    faqs: [
      { q: "How do I compare two diagnostic tests in a clinical setting?", a: "Apply both tests to every patient. Construct a 2x2 table of concordant and discordant results. McNemar tests whether the tests have different positive rates. This is the standard method recommended in diagnostic accuracy studies (STARD guidelines)." },
      { q: "Is McNemar appropriate for before/after treatment comparisons?", a: "Yes, when the outcome is binary (e.g., disease present/absent, target met/not met). For continuous outcomes (blood pressure, weight), use a paired t-test or Wilcoxon test instead." },
      { q: "My study has only 20 discordant pairs. Should I use the exact test?", a: "Yes. With fewer than 25 discordant pairs, use the exact McNemar test (based on the binomial distribution) rather than the chi-square approximation. StatMate selects the appropriate version automatically." },
    ],
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getPseoData(
  calculator: CalculatorSlug,
  field: Field,
): PseoPageData | null {
  const key: DataKey = `${calculator}::${field}`;
  return DATA[key] ?? null;
}

/**
 * Returns all valid calculator-field combinations for generating static paths.
 */
export function getAllPseoCombinations(): { calculator: CalculatorSlug; field: Field }[] {
  const combinations: { calculator: CalculatorSlug; field: Field }[] = [];
  for (const calculator of CALCULATOR_SLUGS) {
    for (const field of FIELDS) {
      combinations.push({ calculator, field });
    }
  }
  return combinations;
}

// Embed widget registry — drives /embed/[calculator] (iframe widget) and
// /[locale]/widgets/[calculator] (embed-code + SEO showcase pages).
// Per-widget UNIQUE content is mandatory (thin/duplicate content = Google deindex).

export interface EmbedWidgetFaq {
  q: string;
  a: string;
}

export interface EmbedWidget {
  /** route slug — must match an existing calculator slug under app/[locale]/calculators */
  slug: string;
  /** display name of the underlying test */
  name: string;
  /** short widget title shown in the iframe + showcase */
  widgetTitle: string;
  /** SEO <title> for the showcase page */
  metaTitle: string;
  /** SEO meta description for the showcase page */
  metaDescription: string;
  /** high-intent keywords */
  keywords: string[];
  /** unique 1-paragraph intro (showcase) */
  intro: string;
  /** unique bullets: what the calculator computes */
  computes: string[];
  /** unique bullets: who embeds / uses it */
  useCases: string[];
  /** unique FAQ (also emitted as FAQPage JSON-LD) */
  faq: EmbedWidgetFaq[];
  /** default iframe height in px (calculator UIs differ in length) */
  height: number;
}

export const EMBED_WIDGETS: EmbedWidget[] = [
  {
    slug: "t-test",
    name: "Student's t-Test",
    widgetTitle: "T-Test Calculator",
    metaTitle: "Free T-Test Calculator Widget — Embed on Your Site | StatMate",
    metaDescription:
      "Embed a free Student's t-test calculator (independent & paired) on any website. Returns t, df, p-value, Cohen's d and APA-formatted output. Copy one line of HTML.",
    keywords: [
      "t-test calculator embed",
      "t test widget",
      "independent t-test calculator",
      "paired t-test calculator",
      "free statistics widget",
    ],
    intro:
      "Drop a fully interactive Student's t-test calculator straight into your blog, course page, or lab site. Visitors paste two groups of numbers and instantly get the t statistic, degrees of freedom, two-tailed p-value, and Cohen's d effect size — formatted in APA 7th style they can copy into a paper.",
    computes: [
      "Independent (two-sample) and paired t-tests in one widget",
      "t statistic, degrees of freedom, and exact two-tailed p-value",
      "Cohen's d effect size with small/medium/large interpretation",
      "95% confidence interval for the mean difference",
      "APA 7th edition result string, ready to copy",
    ],
    useCases: [
      "Stats lecturers embedding a live example beside lecture notes",
      "Research blogs explaining A/B test or pre/post comparisons",
      "Lab group pages giving students a quick analysis tool",
    ],
    faq: [
      {
        q: "Does the t-test widget work on mobile?",
        a: "Yes. The iframe is responsive at width=100% and reflows for phones, tablets, and desktop.",
      },
      {
        q: "Is the calculation done on my visitors' device?",
        a: "Yes — the t-test runs entirely in the browser. No data is sent to StatMate's servers, so it is safe for sensitive datasets.",
      },
      {
        q: "Can I embed it for free?",
        a: "Yes. The widget is free to embed on any site. The only requirement is the 'Powered by StatMate' link, which stays visible.",
      },
    ],
    height: 1180,
  },
  {
    slug: "correlation",
    name: "Correlation (Pearson & Spearman)",
    widgetTitle: "Correlation Calculator",
    metaTitle: "Free Correlation Calculator Widget — Pearson & Spearman | StatMate",
    metaDescription:
      "Embed a free correlation calculator on your website. Computes Pearson r and Spearman rho with p-value, R², and APA output from paired data. One line of HTML.",
    keywords: [
      "correlation calculator embed",
      "pearson correlation widget",
      "spearman correlation calculator",
      "r value calculator",
      "free correlation widget",
    ],
    intro:
      "Let readers measure the relationship between two variables without leaving your page. This widget computes both Pearson's r (linear) and Spearman's rho (rank-based), the significance test, and the coefficient of determination R² — with an APA-formatted summary they can lift straight into a manuscript.",
    computes: [
      "Pearson product-moment correlation (r)",
      "Spearman rank-order correlation (rho) for non-linear or ordinal data",
      "Two-tailed p-value and degrees of freedom",
      "R² (proportion of variance explained)",
      "APA 7th edition result string",
    ],
    useCases: [
      "Marketing/analytics blogs showing how two metrics move together",
      "Psychology and social-science course pages",
      "Data-literacy tutorials that need a hands-on example",
    ],
    faq: [
      {
        q: "When should I use Spearman instead of Pearson?",
        a: "Use Spearman when the relationship is monotonic but not linear, when data are ordinal, or when outliers distort Pearson's r. The widget reports both so visitors can compare.",
      },
      {
        q: "How many data points can I enter?",
        a: "The widget accepts paired X/Y lists of arbitrary length; it handles typical datasets of dozens to thousands of pairs in the browser.",
      },
      {
        q: "Is attribution required?",
        a: "Yes — the 'Powered by StatMate' link must remain. Embedding is otherwise free.",
      },
    ],
    height: 1120,
  },
  {
    slug: "chi-square",
    name: "Chi-Square Test",
    widgetTitle: "Chi-Square Calculator",
    metaTitle: "Free Chi-Square Calculator Widget — Independence & Goodness-of-Fit | StatMate",
    metaDescription:
      "Embed a free chi-square calculator on your site. Tests of independence (contingency tables) and goodness-of-fit with χ², df, p-value and Cramér's V. One line of HTML.",
    keywords: [
      "chi-square calculator embed",
      "chi square widget",
      "contingency table calculator",
      "goodness of fit calculator",
      "cramers v calculator",
    ],
    intro:
      "Add a categorical-data analyzer to your page in seconds. Visitors enter a contingency table (or observed vs. expected counts) and get the chi-square statistic, degrees of freedom, p-value, and Cramér's V effect size — ideal for survey cross-tabs and frequency comparisons.",
    computes: [
      "Chi-square test of independence for r×c contingency tables",
      "Chi-square goodness-of-fit against expected frequencies",
      "χ² statistic, degrees of freedom, and p-value",
      "Cramér's V effect size for association strength",
      "Expected-count table and APA 7th output",
    ],
    useCases: [
      "Survey and polling write-ups testing group differences",
      "Biology/genetics pages checking observed vs. expected ratios",
      "UX researchers comparing categorical outcomes across variants",
    ],
    faq: [
      {
        q: "What is the minimum expected count?",
        a: "A common rule is that expected counts should be ≥5 in most cells. The widget shows the expected-count table so visitors can check this assumption.",
      },
      {
        q: "Does it handle larger than 2×2 tables?",
        a: "Yes. The independence test supports any r×c table, not just 2×2.",
      },
      {
        q: "Can I remove the StatMate link?",
        a: "No — the attribution link is required and keeps the widget free to embed.",
      },
    ],
    height: 1180,
  },
  {
    slug: "descriptive",
    name: "Descriptive Statistics",
    widgetTitle: "Descriptive Statistics Calculator",
    metaTitle: "Free Descriptive Statistics Calculator Widget — Mean, SD, Quartiles | StatMate",
    metaDescription:
      "Embed a free descriptive statistics calculator. Paste a dataset to get mean, median, mode, standard deviation, variance, quartiles, skewness and kurtosis. One line of HTML.",
    keywords: [
      "descriptive statistics calculator embed",
      "mean median mode calculator widget",
      "standard deviation calculator",
      "quartile calculator",
      "summary statistics widget",
    ],
    intro:
      "Give visitors instant summary statistics for any list of numbers. This widget reports central tendency, dispersion, and shape — mean, median, mode, standard deviation, variance, range, quartiles/IQR, skewness, and kurtosis — so a raw dataset becomes a complete description in one paste.",
    computes: [
      "Mean, median, and mode (central tendency)",
      "Standard deviation, variance, range, and IQR (dispersion)",
      "Minimum, maximum, and the three quartiles (Q1, Q2, Q3)",
      "Skewness and kurtosis (distribution shape)",
      "Count, sum, and APA-style summary",
    ],
    useCases: [
      "Teaching pages that introduce summary statistics",
      "Report templates needing a quick data profile",
      "Spreadsheets users wanting a no-formula alternative",
    ],
    faq: [
      {
        q: "Does it compute sample or population standard deviation?",
        a: "The widget reports the sample standard deviation (n−1 denominator) by default, the standard choice for inferential work.",
      },
      {
        q: "What input formats are accepted?",
        a: "Numbers separated by commas, spaces, or new lines all work, so visitors can paste directly from a spreadsheet column.",
      },
      {
        q: "Is embedding free?",
        a: "Yes, with the required 'Powered by StatMate' link kept visible.",
      },
    ],
    height: 1020,
  },
  {
    slug: "sample-size",
    name: "Sample Size & Power",
    widgetTitle: "Sample Size Calculator",
    metaTitle: "Free Sample Size Calculator Widget — Power Analysis | StatMate",
    metaDescription:
      "Embed a free sample size / power calculator on your site. Find the required n for t-tests, ANOVA, correlation, chi-square and proportions from effect size, alpha and power. One line of HTML.",
    keywords: [
      "sample size calculator embed",
      "power analysis widget",
      "required sample size calculator",
      "a priori power calculator",
      "study planning widget",
    ],
    intro:
      "Help researchers plan studies right on your page. Visitors choose a test, set the expected effect size, significance level (α), and desired power (1−β), and the widget returns the minimum sample size needed — plus a power curve to see how n trades off against detectable effect.",
    computes: [
      "Required sample size for two-sample, paired, and one-sample t-tests",
      "Sample size for ANOVA, correlation, chi-square (2×2), and proportions",
      "Inputs for effect size (Cohen's d, f, r, w, h), α, and power",
      "Small/medium/large effect-size presets per test",
      "Power curve visualization and APA-style summary",
    ],
    useCases: [
      "Grant and IRB pages that require an a priori power justification",
      "Methods tutorials explaining how to size a study",
      "Research labs standardizing study-planning across students",
    ],
    faq: [
      {
        q: "Is this an a priori power analysis?",
        a: "Yes. It solves for the sample size required before data collection, given effect size, α, and target power (commonly 0.80).",
      },
      {
        q: "Which effect-size metric should I enter?",
        a: "Each test uses its standard metric — Cohen's d for t-tests, f for ANOVA, r for correlation, w for chi-square, h for proportions. The widget shows presets for small/medium/large.",
      },
      {
        q: "Can I embed it without the StatMate badge?",
        a: "No — the attribution link is required and is what keeps the widget free.",
      },
    ],
    height: 1240,
  },
];

export const EMBED_SLUGS = EMBED_WIDGETS.map((w) => w.slug);

export function getEmbedWidget(slug: string): EmbedWidget | undefined {
  return EMBED_WIDGETS.find((w) => w.slug === slug);
}

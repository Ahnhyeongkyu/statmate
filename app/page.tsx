import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StatMate",
  description:
    "Free online statistics calculators with APA-formatted results. T-test, ANOVA, Chi-square, Correlation, and Descriptive Statistics.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.google.com/search?q=site:statmate-red.vercel.app+{search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "StatMate",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1",
  },
};

const calculators = [
  {
    name: "Independent & Paired T-Test",
    description:
      "Compare means between two groups. Get t-value, p-value, Cohen's d, and 95% CI.",
    href: "/calculators/t-test",
    badge: "Most Popular",
    icon: "T",
  },
  {
    name: "One-Way ANOVA",
    description:
      "Compare means across three or more groups. F-statistic, eta-squared, and post-hoc tests.",
    href: "/calculators/anova",
    badge: null,
    icon: "F",
  },
  {
    name: "Chi-Square Test",
    description:
      "Test of independence and goodness-of-fit. Chi-square statistic, Cramer's V.",
    href: "/calculators/chi-square",
    badge: null,
    icon: "\u03C7\u00B2",
  },
  {
    name: "Correlation",
    description:
      "Pearson r and Spearman rho. Scatter plot visualization with regression line.",
    href: "/calculators/correlation",
    badge: null,
    icon: "r",
  },
  {
    name: "Descriptive Statistics",
    description:
      "Mean, median, SD, skewness, kurtosis, quartiles, and more.",
    href: "/calculators/descriptive",
    badge: null,
    icon: "\u03BC",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 pb-12 pt-8 text-center md:pb-16 md:pt-12">
        <Badge variant="secondary" className="text-sm">
          Free &middot; No sign-up required
        </Badge>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Statistics Made Simple.
          <br />
          <span className="text-blue-600">APA-Ready Results.</span>
        </h1>
        <p className="max-w-xl text-base text-gray-500 md:text-lg">
          Run statistical tests instantly and get results formatted in APA 7th
          edition. Export to Word with one click. Built by statisticians, for
          researchers.
        </p>
        <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:px-0">
          <Link
            href="/calculators/t-test"
            className="rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try T-Test Calculator
          </Link>
          <Link
            href="#calculators"
            className="rounded-full border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            View All Calculators
          </Link>
        </div>
      </section>

      {/* Calculators Grid */}
      <section id="calculators" className="w-full pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Free Statistics Calculators
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg font-semibold italic text-blue-600">
                      {calc.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{calc.name}</CardTitle>
                      {calc.badge && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {calc.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{calc.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Why StatMate?
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl">
              &check;
            </div>
            <h3 className="mb-2 font-semibold">APA 7th Edition</h3>
            <p className="text-sm text-gray-500">
              Results are automatically formatted to APA standards. No more
              manual formatting.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">
              &#9889;
            </div>
            <h3 className="mb-2 font-semibold">Instant Results</h3>
            <p className="text-sm text-gray-500">
              All calculations run in your browser. No server needed. Fast and
              private.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-xl">
              &#128196;
            </div>
            <h3 className="mb-2 font-semibold">Export to Word</h3>
            <p className="text-sm text-gray-500">
              One-click export to .docx with perfect APA tables. Copy-paste into
              your paper.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              1
            </div>
            <h3 className="mb-2 font-semibold">Enter Your Data</h3>
            <p className="text-sm text-gray-500">
              Paste your data directly or enter summary statistics. Supports
              comma, space, or newline separated values.
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              2
            </div>
            <h3 className="mb-2 font-semibold">Get APA Results</h3>
            <p className="text-sm text-gray-500">
              Click Calculate and get publication-ready results: test statistic,
              p-value, effect size, and confidence intervals.
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              3
            </div>
            <h3 className="mb-2 font-semibold">Export &amp; Cite</h3>
            <p className="text-sm text-gray-500">
              Copy results to clipboard or export APA-formatted tables to Word.
              Paste directly into your manuscript.
            </p>
          </div>
        </div>
      </section>

      {/* Validation & Trust */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Trusted Calculations
        </h2>
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Validated Against R &amp; SPSS
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Every calculator in StatMate has been cross-validated against R
                (the gold standard for statistical computing) and SPSS. Our
                results match to at least 4 decimal places across all test
                statistics, p-values, and effect sizes.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  T-test: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">t.test()</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  ANOVA: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">aov()</code> + <code className="rounded bg-gray-100 px-1 text-xs">TukeyHSD()</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  Chi-square: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">chisq.test()</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  Correlation: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">cor.test()</code>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Privacy by Design
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Your data never leaves your device. All statistical calculations
                run entirely in your browser using client-side JavaScript. No
                data is uploaded, stored, or logged on our servers.
              </p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  100% client-side computation
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  No account or login required
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  HTTPS encrypted connections
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  Open methodology — uses jstat &amp; simple-statistics libraries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Interpretation Preview */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
          AI-Powered Interpretation
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">
          Pro feature — see how AI explains your results in plain language
        </p>
        <div className="rounded-lg border bg-white p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-600">
            Sample AI Output
          </p>
          <div className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-400">PAPER-READY SENTENCE</p>
              <p className="mt-1 text-sm italic text-gray-700">
                An independent-samples t-test revealed that participants in the
                experimental condition (<em>M</em> = 88.07, <em>SD</em> = 4.94)
                scored significantly higher than those in the control condition
                (<em>M</em> = 79.07, <em>SD</em> = 3.15), <em>t</em>(23.47) =
                5.87, <em>p</em> &lt; .001, <em>d</em> = 2.15, 95% CI [5.82,
                12.18].
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-400">PLAIN-LANGUAGE INTERPRETATION</p>
              <p className="mt-1 text-sm text-gray-700">
                The new teaching method produced substantially higher exam
                scores — about 9 points higher on average. This is a very large
                effect, meaning the difference would be immediately noticeable
                in a classroom setting. The probability of seeing this
                difference by chance alone is less than 1 in 1,000.
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Get AI Interpretation with Pro &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full pb-8">
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            Used by researchers worldwide
          </h2>
          <p className="mt-2 text-blue-100">
            Free forever. No sign-up. No credit card. Just paste your data and
            get APA-ready results.
          </p>
          <Link
            href="/calculators/t-test"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            Start Calculating
          </Link>
        </div>
      </section>
    </div>
  );
}

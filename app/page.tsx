import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 pb-16 pt-12 text-center">
        <Badge variant="secondary" className="text-sm">
          Free &middot; No sign-up required
        </Badge>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-gray-900">
          Statistics Made Simple.
          <br />
          <span className="text-blue-600">APA-Ready Results.</span>
        </h1>
        <p className="max-w-xl text-lg text-gray-500">
          Run statistical tests instantly and get results formatted in APA 7th
          edition. Export to Word with one click. Built by statisticians, for
          researchers.
        </p>
        <div className="flex gap-3">
          <Link
            href="/calculators/t-test"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try T-Test Calculator
          </Link>
          <Link
            href="#calculators"
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
      <section className="w-full pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Why StatMate?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
    </div>
  );
}

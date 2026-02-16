import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "StatMate Pro: Export APA tables to Word, get AI-powered interpretation, and publication-ready result sentences. Start with a 7-day free trial.",
  alternates: { canonical: "/pricing" },
};

const CHECKOUT_URL =
  "https://statmate.lemonsqueezy.com/checkout/buy/27f3051f-83fd-4dbc-858d-f813a7f15cb1";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need for basic analysis",
    cta: "Get Started",
    ctaHref: "/calculators/t-test",
    ctaVariant: "outline" as const,
    highlight: false,
    external: false,
    features: [
      { text: "All 5 statistical calculators", included: true },
      { text: "APA-formatted results display", included: true },
      { text: "Copy results to clipboard", included: true },
      { text: "Significance & effect size badges", included: true },
      { text: "Export APA tables to Word", included: false },
      { text: "AI-powered interpretation", included: false },
      { text: "Publication-ready sentences", included: false },
    ],
  },
  {
    name: "Pro Monthly",
    price: "$9.99",
    period: "/month",
    description: "For active researchers and students",
    cta: "Start 7-Day Free Trial",
    ctaHref: CHECKOUT_URL,
    ctaVariant: "default" as const,
    highlight: true,
    external: true,
    features: [
      { text: "Everything in Free", included: true },
      { text: "APA Word export (unlimited)", included: true },
      { text: "AI result interpretation (EN/KR)", included: true },
      { text: "Publication-ready result sentences", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Priority email support", included: true },
    ],
  },
  {
    name: "Pro Annual",
    price: "$7.99",
    period: "/month",
    description: "Best value — save 20%",
    subtext: "Billed $95.88/year",
    cta: "Start 7-Day Free Trial",
    ctaHref: CHECKOUT_URL,
    ctaVariant: "outline" as const,
    highlight: false,
    external: true,
    features: [
      { text: "Everything in Pro Monthly", included: true },
      { text: "Priority support", included: true },
      { text: "Early access to new features", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I use the calculators without signing up?",
    a: "Yes! All calculators are completely free and require no sign-up. You can calculate t-tests, ANOVA, chi-square, correlation, and descriptive statistics instantly.",
  },
  {
    q: "What does the AI interpretation include?",
    a: "Our AI analyzes your statistical results and generates: (1) a publication-ready result sentence in APA format, (2) a plain-language interpretation anyone can understand, and (3) important caveats and limitations to consider.",
  },
  {
    q: "What format is the Word export?",
    a: "We generate APA 7th edition formatted tables in .docx format. Tables follow APA guidelines: no vertical lines, proper header formatting, italic statistical symbols (M, SD, t, F, p), and Times New Roman 12pt font.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time. You'll keep Pro access until the end of your billing period.",
  },
  {
    q: "Is my data safe?",
    a: "All calculations run in your browser. Your raw data never leaves your device. For AI interpretation, only the computed statistics (not your raw data) are sent to our server.",
  },
  {
    q: "Do you offer student discounts?",
    a: "We're planning student pricing soon. For now, the 7-day free trial and pay-per-use option ($2.99/export) make it affordable for any student.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center py-8">
      <Badge variant="secondary" className="mb-4 text-sm">
        Pricing
      </Badge>
      <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
        Start Free.{" "}
        <span className="text-blue-600">Go Pro When You Need It.</span>
      </h1>
      <p className="mt-4 max-w-xl text-center text-gray-500">
        All calculators are free forever. Upgrade to Pro for APA Word export,
        AI-powered interpretation, and publication-ready results.
      </p>

      {/* Pricing Cards */}
      <div className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.highlight
                ? "relative border-2 border-blue-500 shadow-lg"
                : ""
            }
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <p className="text-sm text-gray-500">{plan.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              {"subtext" in plan && plan.subtext && (
                <p className="mt-1 text-xs font-medium text-green-600">
                  {plan.subtext}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 ${f.included ? "" : "text-gray-400"}`}
                  >
                    <span className={`mt-0.5 shrink-0 ${f.included ? "text-green-500" : "text-gray-300"}`}>
                      {f.included ? "\u2713" : "\u2715"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
              {plan.external ? (
                <a href={plan.ctaHref} target="_blank" rel="noopener noreferrer" className="mt-6 block">
                  <Button
                    variant={plan.ctaVariant}
                    className={`w-full ${plan.highlight ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  >
                    {plan.cta}
                  </Button>
                </a>
              ) : (
                <Link href={plan.ctaHref} className="mt-6 block">
                  <Button
                    variant={plan.ctaVariant}
                    className={`w-full ${plan.highlight ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pay-per-use */}
      <div className="mt-8 rounded-lg border bg-gray-50 px-6 py-4 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t need a subscription?{" "}
          <span className="font-semibold">Pay $2.99 per export</span> — no
          commitment required.
        </p>
      </div>

      {/* Feature Comparison */}
      <section className="mt-20 w-full max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Feature Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-3 text-left font-semibold">Feature</th>
                <th className="py-3 text-center font-semibold">Free</th>
                <th className="py-3 text-center font-semibold text-blue-600">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["T-test, ANOVA, Chi-square, Correlation, Descriptive", true, true],
                ["APA-formatted results display", true, true],
                ["Copy results to clipboard", true, true],
                ["Effect size & significance interpretation", true, true],
                ["APA tables exported to Word (.docx)", false, true],
                ["AI-powered result interpretation", false, true],
                ["Publication-ready sentences (English & Korean)", false, true],
                ["Ad-free experience", false, true],
                ["Priority email support", false, true],
              ].map(([feature, free, pro], i) => (
                <tr key={i}>
                  <td className="py-2.5">{feature as string}</td>
                  <td className="py-2.5 text-center">
                    {free ? (
                      <span className="text-green-500">\u2713</span>
                    ) : (
                      <span className="text-gray-300">\u2014</span>
                    )}
                  </td>
                  <td className="py-2.5 text-center">
                    {pro ? (
                      <span className="text-green-500">\u2713</span>
                    ) : (
                      <span className="text-gray-300">\u2014</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20 w-full max-w-2xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-900">{faq.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-20 w-full max-w-xl rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">
          Ready to save hours on formatting?
        </h2>
        <p className="mt-2 text-blue-100">
          Start your 7-day free trial. No credit card required.
        </p>
        <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
          <Button className="mt-6 bg-white text-blue-600 hover:bg-blue-50">
            Start Free Trial
          </Button>
        </a>
      </section>
    </div>
  );
}

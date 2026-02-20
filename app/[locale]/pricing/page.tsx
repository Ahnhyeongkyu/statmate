import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/pricing" },
  };
}

const CHECKOUT_URL =
  "https://statmate.lemonsqueezy.com/checkout/buy/27f3051f-83fd-4dbc-858d-f813a7f15cb1";

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  const plans = [
    {
      name: t("plans.free.name"),
      price: "$0",
      period: t("plans.free.period"),
      description: t("plans.free.description"),
      cta: t("plans.free.cta"),
      ctaHref: "/calculators/t-test",
      ctaVariant: "outline" as const,
      highlight: false,
      external: false,
      features: [
        { text: t("plans.free.features.0"), included: true },
        { text: t("plans.free.features.1"), included: true },
        { text: t("plans.free.features.2"), included: true },
        { text: t("plans.free.features.3"), included: true },
        { text: t("plans.free.features.4"), included: false },
        { text: t("plans.free.features.5"), included: false },
        { text: t("plans.free.features.6"), included: false },
      ],
    },
    {
      name: t("plans.proMonthly.name"),
      price: "$5.99",
      period: t("plans.proMonthly.period"),
      description: t("plans.proMonthly.description"),
      cta: t("plans.proMonthly.cta"),
      ctaHref: CHECKOUT_URL,
      ctaVariant: "default" as const,
      highlight: true,
      external: true,
      features: [
        { text: t("plans.proMonthly.features.0"), included: true },
        { text: t("plans.proMonthly.features.1"), included: true },
        { text: t("plans.proMonthly.features.2"), included: true },
        { text: t("plans.proMonthly.features.3"), included: true },
        { text: t("plans.proMonthly.features.4"), included: true },
        { text: t("plans.proMonthly.features.5"), included: true },
      ],
    },
    {
      name: t("plans.proAnnual.name"),
      price: "$4.99",
      period: t("plans.proAnnual.period"),
      description: t("plans.proAnnual.description"),
      subtext: t("plans.proAnnual.subtext"),
      cta: t("plans.proAnnual.cta"),
      ctaHref: CHECKOUT_URL,
      ctaVariant: "outline" as const,
      highlight: false,
      external: true,
      features: [
        { text: t("plans.proAnnual.features.0"), included: true },
        { text: t("plans.proAnnual.features.1"), included: true },
        { text: t("plans.proAnnual.features.2"), included: true },
      ],
    },
  ];

  const faqCount = 6;
  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    q: t(`faqs.${i}.q`),
    a: t(`faqs.${i}.a`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const comparisonFeatures: [string, boolean, boolean][] = [
    [t("comparison.0.feature"), true, true],
    [t("comparison.1.feature"), true, true],
    [t("comparison.2.feature"), true, true],
    [t("comparison.3.feature"), true, true],
    [t("comparison.4.feature"), false, true],
    [t("comparison.5.feature"), false, true],
    [t("comparison.6.feature"), false, true],
    [t("comparison.7.feature"), false, true],
    [t("comparison.8.feature"), false, true],
  ];

  return (
    <div className="flex flex-col items-center py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Badge variant="secondary" className="mb-4 text-sm">
        {t("badge")}
      </Badge>
      <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
        {t("headline")}{" "}
        <span className="text-blue-600">{t("headlineHighlight")}</span>
      </h1>
      <p className="mt-4 max-w-xl text-center text-gray-500 dark:text-gray-400">
        {t("subheadline")}
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
                <Badge className="bg-blue-600 text-white">
                  {t("mostPopular")}
                </Badge>
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
                    <span
                      className={`mt-0.5 shrink-0 ${f.included ? "text-green-600" : "text-gray-300"}`}
                    >
                      {f.included ? "\u2713" : "\u2715"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
              {plan.external ? (
                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block"
                >
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
      <div className="mt-8 rounded-lg border bg-gray-50 px-6 py-4 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">{t("payPerUse")}</p>
      </div>

      {/* Student Discount */}
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-6 py-4 text-center dark:border-blue-800 dark:bg-blue-950/30">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t("studentDiscount")}</p>
      </div>

      {/* Feature Comparison */}
      <section className="mt-20 w-full max-w-4xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("comparisonTitle")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-3 text-left font-semibold">
                  {t("featureLabel")}
                </th>
                <th className="py-3 text-center font-semibold">
                  {t("freeLabel")}
                </th>
                <th className="py-3 text-center font-semibold text-blue-600">
                  {t("proLabel")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {comparisonFeatures.map(([feature, free, pro], i) => (
                <tr key={i}>
                  <td className="py-2.5">{feature}</td>
                  <td className="py-2.5 text-center">
                    {free ? (
                      <span className="text-green-600">{"\u2713"}</span>
                    ) : (
                      <span className="text-gray-300">{"\u2014"}</span>
                    )}
                  </td>
                  <td className="py-2.5 text-center">
                    {pro ? (
                      <span className="text-green-600">{"\u2713"}</span>
                    ) : (
                      <span className="text-gray-300">{"\u2014"}</span>
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
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("faqTitle")}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-900 dark:text-white">{faq.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-20 w-full max-w-xl rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
        <p className="mt-2 text-blue-100">{t("ctaDescription")}</p>
        <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
          <Button className="mt-6 bg-white text-blue-600 hover:bg-blue-50">
            {t("ctaButton")}
          </Button>
        </a>
      </section>
    </div>
  );
}

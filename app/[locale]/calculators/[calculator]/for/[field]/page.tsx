import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import {
  getPseoData,
  getCalculatorName,
  getFieldName,
  FIELDS,
  CALCULATOR_SLUGS,
} from "@/lib/pseo-data";
import { AdUnit } from "@/components/adsense";
import { FaqSchema } from "@/components/faq-schema";
import { RelatedCalculators } from "@/components/related-calculators";

// Generate all static paths (combinations × locales handled by next-intl)
export async function generateStaticParams() {
  const params: { calculator: string; field: string }[] = [];
  for (const calculator of CALCULATOR_SLUGS) {
    for (const field of FIELDS) {
      params.push({ calculator, field });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; calculator: string; field: string }>;
}): Promise<Metadata> {
  const { locale, calculator, field } = await params;
  const data = getPseoData(calculator as any, field as any);
  if (!data) return { title: "Not Found" };

  const path = `/calculators/${calculator}/for/${field}`;
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: locale === "en" ? path : `/${locale}${path}`,
      languages: {
        en: path,
        ko: `/ko${path}`,
        ja: `/ja${path}`,
        "x-default": path,
      },
    },
  };
}

export default async function PseoPage({
  params,
}: {
  params: Promise<{ locale: string; calculator: string; field: string }>;
}) {
  const { locale, calculator, field } = await params;
  const data = getPseoData(calculator as any, field as any);
  if (!data) notFound();

  const calcName = getCalculatorName(calculator as any);
  const fieldName = getFieldName(field as any);

  // Map pseo FAQ format {q, a} to FaqSchema format {question, answer}
  const faqItems = data.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }));

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        {" > "}
        <Link
          href={`/calculators/${calculator}` as any}
          className="hover:text-blue-600"
        >
          {calcName}
        </Link>
        {" > "}
        <span className="text-gray-700 dark:text-gray-300">
          For {fieldName}
        </span>
      </nav>

      {/* Breadcrumb + FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "StatMate",
                item: `https://statmate.org${locale === "en" ? "" : `/${locale}`}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: calcName,
                item: `https://statmate.org${locale === "en" ? "" : `/${locale}`}/calculators/${calculator}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${calcName} for ${fieldName}`,
              },
            ],
          }),
        }}
      />
      <FaqSchema faqs={faqItems} />

      {/* H1 */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {data.h1}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {data.heroText}
      </p>

      {/* CTA */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 mb-8 text-center dark:border-blue-800 dark:bg-blue-950/20">
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Ready to analyze your {fieldName.toLowerCase()} data?
        </p>
        <Link
          href={`/calculators/${calculator}` as any}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Try {calcName} Now →
        </Link>
      </div>

      {/* Example Scenario */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Example: {calcName} in {fieldName}
        </h2>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.scenario}
          </p>
        </div>
      </section>

      {/* Why Use */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Why Use {calcName} in {fieldName}?
        </h2>
        <ul className="space-y-2">
          {data.whyUse.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
            >
              <svg
                className="mt-1 h-4 w-4 flex-shrink-0 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </section>

      <AdUnit slot="4914141943" format="auto" />

      {/* How to Use */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          How to Use
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Enter your {fieldName.toLowerCase()} data into the calculator above
          </li>
          <li>Click &quot;Calculate&quot; to get your results with effect sizes</li>
          <li>
            Copy the APA-formatted results directly into your paper
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {data.faqs.map((faq, i) => (
            <details
              key={i}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                {faq.q}
              </summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Second CTA */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 mb-8 text-center dark:border-blue-800 dark:bg-blue-950/20">
        <Link
          href={`/calculators/${calculator}` as any}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Start Your {fieldName} Analysis →
        </Link>
      </div>

      <AdUnit slot="4914141943" format="auto" />

      <RelatedCalculators current={`/calculators/${calculator}`} />
    </div>
  );
}

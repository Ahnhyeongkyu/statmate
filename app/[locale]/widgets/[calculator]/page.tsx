import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getEmbedWidget } from "@/lib/embed-widgets";
import { EmbedCodeBlock } from "@/components/embed-code-block";

const BASE_URL = "https://statmate.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; calculator: string }>;
}): Promise<Metadata> {
  const { calculator } = await params;
  const widget = getEmbedWidget(calculator);
  if (!widget) return { title: "Widget not found" };

  // Widgets are an English-market feature; consolidate all locales onto the
  // canonical English URL to avoid duplicate content.
  const canonical = `/widgets/${widget.slug}`;
  return {
    title: widget.metaTitle,
    description: widget.metaDescription,
    keywords: widget.keywords,
    alternates: { canonical },
    openGraph: {
      title: widget.metaTitle,
      description: widget.metaDescription,
      type: "website",
      url: `${BASE_URL}${canonical}`,
    },
  };
}

export default async function WidgetShowcasePage({
  params,
}: {
  params: Promise<{ locale: string; calculator: string }>;
}) {
  const { calculator } = await params;
  const widget = getEmbedWidget(calculator);
  if (!widget) notFound();

  const embedUrl = `${BASE_URL}/embed/${widget.slug}`;
  const embedCode = `<iframe src="${embedUrl}" width="100%" height="${widget.height}" style="border:1px solid #e5e7eb;border-radius:12px;max-width:760px" loading="lazy" title="${widget.widgetTitle} by StatMate"></iframe>`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: widget.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">Embeddable Widget</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
          {widget.name} Calculator — Free Embed
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">{widget.intro}</p>
      </div>

      {/* Embed code (the conversion action) */}
      <section className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          Copy &amp; paste this embed code
        </h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Paste it into any HTML page, blog post, Notion embed, or website builder. No account needed.
        </p>
        <EmbedCodeBlock code={embedCode} />
      </section>

      {/* Live preview */}
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Live preview</h2>
        <iframe
          src={`/embed/${widget.slug}`}
          width="100%"
          height={widget.height}
          style={{ border: "1px solid #e5e7eb", borderRadius: 12, maxWidth: 760 }}
          loading="lazy"
          title={`${widget.widgetTitle} by StatMate`}
        />
      </section>

      {/* What it computes */}
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          What the {widget.name} calculator computes
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          {widget.computes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* How to embed */}
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">How to embed it</h2>
        <ol className="list-decimal space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          <li>Copy the embed code above.</li>
          <li>Paste it into your page&apos;s HTML where you want the calculator to appear.</li>
          <li>
            Adjust <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">width</code> and{" "}
            <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">height</code> if needed — the
            widget is responsive.
          </li>
          <li>Publish. The calculator runs entirely in your visitor&apos;s browser.</li>
        </ol>
      </section>

      {/* Use cases */}
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Who uses it</h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          {widget.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          Frequently asked questions
        </h2>
        <dl className="space-y-4">
          {widget.faq.map((f) => (
            <div key={f.q} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <dt className="font-medium text-gray-900 dark:text-white">{f.q}</dt>
              <dd className="mt-1 text-sm text-gray-600 dark:text-gray-300">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-blue-50 p-6 text-center dark:bg-blue-950">
        <p className="text-gray-700 dark:text-gray-200">
          Want the full version with APA export, charts, and AI interpretation?
        </p>
        <Link
          href={`/calculators/${widget.slug}`}
          className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Open the full {widget.name} calculator →
        </Link>
        <p className="mt-4 text-sm">
          <Link href="/widgets" className="text-blue-600 hover:underline">
            ← Browse all embeddable widgets
          </Link>
        </p>
      </section>
    </div>
  );
}

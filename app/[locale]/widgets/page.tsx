import type { Metadata } from "next";
import Link from "next/link";
import { EMBED_WIDGETS } from "@/lib/embed-widgets";

const BASE_URL = "https://statmate.org";

export const metadata: Metadata = {
  title: "Free Embeddable Statistics Calculator Widgets | StatMate",
  description:
    "Embed free statistics calculators on your website with one line of HTML — t-test, correlation, chi-square, descriptive statistics, and sample size. APA output, runs in the browser.",
  keywords: [
    "embeddable statistics calculator",
    "statistics widget",
    "free calculator embed",
    "iframe statistics calculator",
    "add calculator to website",
  ],
  alternates: { canonical: "/widgets" },
  openGraph: {
    title: "Free Embeddable Statistics Calculator Widgets | StatMate",
    description:
      "Embed free statistics calculators on your website with one line of HTML. APA output, runs entirely in the browser.",
    type: "website",
    url: `${BASE_URL}/widgets`,
  },
};

export default function WidgetsIndexPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <p className="text-sm font-medium text-blue-600">Embeddable Widgets</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
          Free statistics calculator widgets for your website
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Add a fully interactive statistics calculator to any page with one line of HTML. Each
          widget runs entirely in your visitor&apos;s browser, returns APA-formatted results, and is
          free to embed — just keep the &ldquo;Powered by StatMate&rdquo; link.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {EMBED_WIDGETS.map((w) => (
          <Link
            key={w.slug}
            href={`/widgets/${w.slug}`}
            className="group rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-950/30"
          >
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white">
              {w.widgetTitle}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{w.metaDescription}</p>
            <span className="mt-3 inline-block text-sm font-medium text-blue-600">
              Get embed code →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

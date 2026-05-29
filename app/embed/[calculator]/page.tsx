import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getEmbedWidget, EMBED_WIDGETS } from "@/lib/embed-widgets";

// Reuse the existing calculator components as-is (no reimplementation).
import { TTestCalculator } from "@/app/[locale]/calculators/t-test/calculator";
import { CorrelationCalculator } from "@/app/[locale]/calculators/correlation/calculator";
import { ChiSquareCalculator } from "@/app/[locale]/calculators/chi-square/calculator";
import { DescriptiveCalculator } from "@/app/[locale]/calculators/descriptive/calculator";
import { SampleSizeCalculator } from "@/app/[locale]/calculators/sample-size/calculator";

const COMPONENTS: Record<string, React.ComponentType> = {
  "t-test": TTestCalculator,
  correlation: CorrelationCalculator,
  "chi-square": ChiSquareCalculator,
  descriptive: DescriptiveCalculator,
  "sample-size": SampleSizeCalculator,
};

export function generateStaticParams() {
  return EMBED_WIDGETS.map((w) => ({ calculator: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calculator: string }>;
}): Promise<Metadata> {
  const { calculator } = await params;
  const widget = getEmbedWidget(calculator);
  return {
    title: widget ? `${widget.widgetTitle} — StatMate Widget` : "StatMate Widget",
    robots: { index: false, follow: false },
  };
}

export default async function EmbedWidgetPage({
  params,
}: {
  params: Promise<{ calculator: string }>;
}) {
  const { calculator } = await params;
  const widget = getEmbedWidget(calculator);
  const Calculator = COMPONENTS[calculator];
  if (!widget || !Calculator) notFound();

  const backlink = `https://statmate.org/calculators/${calculator}?utm_source=embed&utm_medium=widget&utm_campaign=${calculator}`;

  return (
    <div className="min-h-screen bg-white px-4 py-6 dark:bg-gray-950">
      <Suspense
        fallback={
          <div className="py-16 text-center text-sm text-gray-400">Loading calculator…</div>
        }
      >
        <Calculator />
      </Suspense>

      {/* Required attribution backlink — keeps the widget free to embed. */}
      <div className="mx-auto mt-8 max-w-2xl border-t border-gray-200 pt-4 text-center dark:border-gray-800">
        <a
          href={backlink}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <span
            className="flex h-4 w-4 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white"
            aria-hidden
          >
            S
          </span>
          Powered by <span className="font-semibold">StatMate</span> — Free Statistics Calculators
        </a>
      </div>
    </div>
  );
}

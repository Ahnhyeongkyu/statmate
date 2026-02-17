"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const calculators = [
  { key: "ttest" as const, href: "/calculators/t-test" as const },
  { key: "anova" as const, href: "/calculators/anova" as const },
  { key: "chiSquare" as const, href: "/calculators/chi-square" as const },
  { key: "correlation" as const, href: "/calculators/correlation" as const },
  { key: "descriptive" as const, href: "/calculators/descriptive" as const },
  { key: "regression" as const, href: "/calculators/regression" as const },
  { key: "sampleSize" as const, href: "/calculators/sample-size" as const },
  { key: "oneSampleT" as const, href: "/calculators/one-sample-t" as const },
  { key: "mannWhitney" as const, href: "/calculators/mann-whitney" as const },
  { key: "wilcoxon" as const, href: "/calculators/wilcoxon" as const },
];

export default function NotFound() {
  const t = useTranslations("notFound");
  const nav = useTranslations("layout.nav");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl font-bold text-blue-600">
        ?
      </div>
      <h1 className="mt-6 text-4xl font-bold text-gray-900">{t("title")}</h1>
      <p className="mt-3 max-w-md text-gray-500">{t("description")}</p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button>{t("goHome")}</Button>
        </Link>
        <Link href="/calculators/t-test">
          <Button variant="outline">{t("tryCta")}</Button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="rounded-md border px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            {nav(calc.key)}
          </Link>
        ))}
      </div>
    </div>
  );
}

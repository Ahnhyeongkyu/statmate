"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");

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
        {[
          { name: "T-Test", href: "/calculators/t-test" },
          { name: "ANOVA", href: "/calculators/anova" },
          { name: "Chi-Square", href: "/calculators/chi-square" },
          { name: "Correlation", href: "/calculators/correlation" },
          { name: "Descriptive", href: "/calculators/descriptive" },
        ].map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="rounded-md border px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            {calc.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

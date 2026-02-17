"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const calculatorKeys = [
  { key: "ttest" as const, href: "/calculators/t-test" as const },
  { key: "anova" as const, href: "/calculators/anova" as const },
  { key: "chiSquare" as const, href: "/calculators/chi-square" as const },
  { key: "correlation" as const, href: "/calculators/correlation" as const },
  { key: "descriptive" as const, href: "/calculators/descriptive" as const },
  { key: "sampleSize" as const, href: "/calculators/sample-size" as const },
  { key: "oneSampleT" as const, href: "/calculators/one-sample-t" as const },
  { key: "mannWhitney" as const, href: "/calculators/mann-whitney" as const },
  { key: "wilcoxon" as const, href: "/calculators/wilcoxon" as const },
  { key: "regression" as const, href: "/calculators/regression" as const },
  { key: "multipleRegression" as const, href: "/calculators/multiple-regression" as const },
  { key: "cronbachAlpha" as const, href: "/calculators/cronbach-alpha" as const },
  { key: "logisticRegression" as const, href: "/calculators/logistic-regression" as const },
  { key: "factorAnalysis" as const, href: "/calculators/factor-analysis" as const },
];

export function RelatedCalculators({ current }: { current: string }) {
  const t = useTranslations("relatedCalculators");
  const others = calculatorKeys.filter((c) => c.href !== current);

  return (
    <section className="mt-16 rounded-lg border bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        {t("title")}
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {others.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="rounded-lg border bg-white p-3 text-center transition-shadow hover:shadow-md"
          >
            <p className="font-medium text-gray-900">{t(`${calc.key}.name`)}</p>
            <p className="mt-1 text-xs text-gray-500">{t(`${calc.key}.description`)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

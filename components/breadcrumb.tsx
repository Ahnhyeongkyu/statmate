"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const calculatorNames: Record<string, string> = {
  "t-test": "ttest",
  "anova": "anova",
  "chi-square": "chiSquare",
  "correlation": "correlation",
  "descriptive": "descriptive",
  "sample-size": "sampleSize",
  "one-sample-t": "oneSampleT",
  "mann-whitney": "mannWhitney",
  "wilcoxon": "wilcoxon",
  "regression": "regression",
  "multiple-regression": "multipleRegression",
  "cronbach-alpha": "cronbachAlpha",
  "logistic-regression": "logisticRegression",
  "factor-analysis": "factorAnalysis",
  "kruskal-wallis": "kruskalWallis",
  "repeated-measures": "repeatedMeasures",
  "two-way-anova": "twoWayAnova",
  "friedman": "friedman",
  "fisher-exact": "fisherExact",
  "mcnemar": "mcnemar",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const t = useTranslations("layout");

  // Extract calculator slug from path like /en/calculators/t-test or /calculators/t-test
  const segments = pathname.split("/");
  const calcIndex = segments.indexOf("calculators");
  if (calcIndex === -1 || !segments[calcIndex + 1]) return null;

  const slug = segments[calcIndex + 1];
  const navKey = calculatorNames[slug];
  if (!navKey) return null;

  const calculatorName = t(`nav.${navKey}`);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-gray-700">
            {t("nav.home")}
          </Link>
        </li>
        <li className="text-gray-300">/</li>
        <li>
          <span className="text-gray-400">{t("nav.calculatorsLabel")}</span>
        </li>
        <li className="text-gray-300">/</li>
        <li className="font-medium text-gray-900">{calculatorName}</li>
      </ol>
    </nav>
  );
}

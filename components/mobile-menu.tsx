"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useIsPro } from "@/components/activate-pro";
import { ActivateProModal } from "@/components/activate-pro";
import { LanguageSwitcher } from "@/components/language-switcher";

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
  { key: "multipleRegression" as const, href: "/calculators/multiple-regression" as const },
  { key: "cronbachAlpha" as const, href: "/calculators/cronbach-alpha" as const },
  { key: "logisticRegression" as const, href: "/calculators/logistic-regression" as const },
  { key: "factorAnalysis" as const, href: "/calculators/factor-analysis" as const },
  { key: "kruskalWallis" as const, href: "/calculators/kruskal-wallis" as const },
  { key: "repeatedMeasures" as const, href: "/calculators/repeated-measures" as const },
  { key: "twoWayAnova" as const, href: "/calculators/two-way-anova" as const },
  { key: "friedman" as const, href: "/calculators/friedman" as const },
  { key: "fisherExact" as const, href: "/calculators/fisher-exact" as const },
  { key: "mcnemar" as const, href: "/calculators/mcnemar" as const },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const pathname = usePathname();
  const isPro = useIsPro();
  const t = useTranslations("layout");

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
        aria-label={open ? t("closeMenu") : t("openMenu")}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b bg-white shadow-lg">
          <nav className="mx-auto max-w-6xl px-4 py-4">
            <div className="space-y-1">
              {calculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                    pathname === calc.href
                      ? "bg-blue-50 font-medium text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {t(`nav.${calc.key}`)} {t("footer.calculatorSuffix")}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t pt-3">
              <Link
                href="/wizard"
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                  pathname === "/wizard"
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                {t("nav.wizard")}
              </Link>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                {t("pricing")}
              </Link>
              <div className="mt-2 flex items-center justify-between px-3">
                <LanguageSwitcher />
              </div>
              {isPro ? (
                <div className="mt-2 rounded-full bg-green-50 px-4 py-2.5 text-center text-sm font-medium text-green-700">
                  {t("proActive")}
                </div>
              ) : (
                <>
                  <Link
                    href="/pricing"
                    onClick={() => setOpen(false)}
                    className="mt-2 block rounded-full bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {t("getPro")}
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowActivate(true);
                    }}
                    className="mt-2 block w-full text-center text-xs text-gray-500 hover:text-gray-700"
                  >
                    {t("haveLicenseKey")}
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      <ActivateProModal
        open={showActivate}
        onClose={() => setShowActivate(false)}
      />
    </div>
  );
}

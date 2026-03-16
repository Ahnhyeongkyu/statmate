"use client";

import { useTranslations } from "next-intl";
import { useIsPro } from "@/components/activate-pro";
import { trackProCtaClick } from "@/lib/analytics";

const CHECKOUT_MONTHLY =
  "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1";

export function ProConversionBanner() {
  const isPro = useIsPro();
  const t = useTranslations("pro");

  if (isPro) return null;

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 dark:border-blue-900 dark:bg-blue-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
              AI
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {t("bannerTitle")}
            </h3>
          </div>
          <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
            {t("bannerDesc")}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t("bannerFeature1")}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t("bannerFeature2")}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t("bannerFeature3")}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <a
            href={CHECKOUT_MONTHLY}
            onClick={() => trackProCtaClick("inline_banner")}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            {t("bannerCta")}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <span className="text-[11px] text-gray-400">{t("bannerPrice")}</span>
        </div>
      </div>
    </div>
  );
}

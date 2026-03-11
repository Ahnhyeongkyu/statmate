"use client";

import { useTranslations } from "next-intl";
import { useIsPro } from "@/components/activate-pro";
import { trackProCtaClick } from "@/lib/analytics";

const CHECKOUT_MONTHLY =
  "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb";

export function ProConversionBanner() {
  const isPro = useIsPro();
  const t = useTranslations("pro");

  if (isPro) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-200 bg-gradient-to-r from-purple-600 to-blue-600 p-5 text-white shadow-lg">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-xs font-bold">
              AI
            </span>
            <h3 className="text-lg font-bold">{t("bannerTitle")}</h3>
          </div>
          <p className="mt-1 text-sm text-purple-100">
            {t("bannerDesc")}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-purple-200">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t("bannerFeature1")}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t("bannerFeature2")}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t("bannerFeature3")}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <a
            href={CHECKOUT_MONTHLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProCtaClick("inline_banner")}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-purple-700 shadow-md transition hover:bg-purple-50 hover:shadow-lg"
          >
            {t("bannerCta")}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <span className="text-[11px] text-purple-200">{t("bannerPrice")}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useIsPro } from "@/components/activate-pro";
import { trackProCtaClick } from "@/lib/analytics";
import { getVariant, trackABConversion } from "@/lib/ab-test";

// 5/31 P0-B: 일회성 크레딧을 1차·전면(오디언스=task-intent, 유일하게 팔린 게 $1.99 크레딧·구독 0).
const CHECKOUT_CREDITS =
  "https://statmate.lemonsqueezy.com/checkout/buy/4ed009d2-951e-417b-8042-01281876d8dd?embed=1";
const CHECKOUT_MONTHLY =
  "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1";

export function ProConversionBanner() {
  const isPro = useIsPro();
  const t = useTranslations("pro");
  const [variant, setVariant] = useState<"A" | "B">("A");

  // ADR-0010: paywall_copy_v1 — 4주 전환 실험 (price vs value)
  // SSR mismatch 방지: client mount 후 variant 결정
  useEffect(() => {
    setVariant(getVariant("paywall_copy_v1"));
  }, []);

  if (isPro) return null;

  const isValueVariant = variant === "B";
  const title = isValueVariant ? t("bannerTitleValue") : t("bannerTitle");
  const desc = isValueVariant ? t("bannerDescValue") : t("bannerDesc");
  // 5/31 P0-B: CTA/가격은 A/B 무관하게 일회성 크레딧 1차로 통일. title/desc만 copy A/B 유지.
  const cta = t("bannerCreditCta");
  const price = t("bannerCreditPrice");

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 dark:border-blue-900 dark:bg-blue-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
              AI
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
            {desc}
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
            href={CHECKOUT_CREDITS}
            data-ime-cta="inline-banner-credits"
            onClick={() => {
              trackProCtaClick("inline_banner_credits");
              trackABConversion("paywall_copy_v1", "checkout_click");
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            {cta}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <span className="text-[11px] text-gray-400">{price}</span>
          <a
            href={CHECKOUT_MONTHLY}
            onClick={() => trackProCtaClick("inline_banner_sub_secondary")}
            className="text-[11px] text-gray-400 underline underline-offset-2 transition hover:text-gray-600 dark:hover:text-gray-300"
          >
            {t("bannerSubSecondary")}
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useIsPro } from "@/components/activate-pro";
import { trackProCtaClick } from "@/lib/analytics";
import { getVariant, trackABConversion } from "@/lib/ab-test";
import { track } from "@/lib/imeTrack";

// 5/31 P0-B: 일회성 크레딧을 1차·전면(오디언스=task-intent, 유일하게 팔린 게 $1.99 크레딧·구독 0).
const CHECKOUT_CREDITS =
  "https://statmate.lemonsqueezy.com/checkout/buy/4ed009d2-951e-417b-8042-01281876d8dd?embed=1";
const CHECKOUT_MONTHLY =
  "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1";

export function ProConversionBanner() {
  const isPro = useIsPro();
  const t = useTranslations("pro");
  const [offerArm, setOfferArm] = useState<"A" | "B">("A");
  // 이메일 캡처(처방 #2) — 결제 부담 유저를 리드로 확보(LLM 유입=리드 전환 강함·충동구매 약함).
  const [email, setEmail] = useState("");
  const [captured, setCaptured] = useState(false);
  const [sending, setSending] = useState(false);
  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email || sending) return;
    setSending(true);
    try {
      await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      track("email_capture", { source: "paywall_banner", offer_version: "v2_report" });
      trackABConversion("result_offer_v1", "email_capture");
      setCaptured(true);
    } catch {
      /* 캡처 실패는 조용히 — UX 차단하지 않음 */
    }
    setSending(false);
  }

  // 6/4 result_offer_v1: 손실회피 오퍼 A/B. client mount 후 arm 결정(SSR mismatch 방지) +
  // paywall_offer_view를 arm 태그해 발화 → paywall→cta 리프트를 PostHog에서 arm별 분해.
  useEffect(() => {
    const arm = getVariant("result_offer_v1");
    setOfferArm(arm);
    // offer_v2(결과물 피벗) 계측 — D+7 앵커. 오퍼-과업 미스매치 처방(Q-260714-08 #1·#5).
    track("paywall_offer_view", { offer_arm: arm === "B" ? "loss_aversion" : "control", offer_version: "v2_report" });
  }, []);

  if (isPro) return null;

  const isOffer = offerArm === "B";
  // B(손실회피) = "방금 계산한 이 결과가 사라진다" 프레이밍, A(control) = 기존 중립 카피.
  const title = isOffer ? t("offerBannerTitle") : t("bannerTitle");
  const desc = isOffer ? t("offerBannerDesc") : t("bannerDesc");
  // CTA/가격은 arm 무관 일회성 크레딧($1.99 3-Pack) 1차 통일. arm은 data-ime-cta에 인코딩 → cta_click 분해.
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
            data-ime-cta={`offer-v2-report-${offerArm}`}
            onClick={() => {
              trackProCtaClick("offer_v2_click");
              trackABConversion("result_offer_v1", "checkout_click");
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
          <div className="mt-1 text-center text-[10px] leading-tight text-gray-400">
            {t("trustMaker")}
            <br />
            {t("trustRefund")}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-blue-100 pt-3 dark:border-blue-900">
        {captured ? (
          <p className="text-center text-xs font-medium text-blue-700 dark:text-blue-300">{t("emailCaptureDone")}</p>
        ) : (
          <form onSubmit={submitEmail} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">{t("emailCaptureLabel")}</span>
            <div className="flex flex-1 gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailCapturePlaceholder")}
                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={sending}
                className="whitespace-nowrap rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white disabled:opacity-50 dark:text-blue-300"
              >
                {t("emailCaptureCta")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

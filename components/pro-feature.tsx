"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { trackAiInterpret, trackWordExport, trackProCtaClick, trackProPreviewImpression, trackFreeTrialUsed, trackFreeTrialExhausted } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsPro } from "@/components/activate-pro";
import { FeedbackPrompt } from "@/components/feedback-prompt";

// --- Free Trial Helpers ---

const FREE_TRIAL_MAX = 0; // free full AI interpretation disabled — 1-sentence preview then paywall

interface TrialData {
  count: number;
  usedTypes: string[];
  usedAt?: string;
}

function getTrialData(): TrialData {
  if (typeof window === "undefined") return { count: FREE_TRIAL_MAX, usedTypes: [] };
  try {
    const stored = localStorage.getItem("statmate_free_trial");
    if (!stored) return { count: 0, usedTypes: [] };
    const data = JSON.parse(stored);
    return {
      count: typeof data.count === "number" ? data.count : (data.used ? FREE_TRIAL_MAX : 0),
      usedTypes: Array.isArray(data.usedTypes) ? data.usedTypes : (data.testType ? [data.testType] : []),
    };
  } catch {
    return { count: 0, usedTypes: [] };
  }
}

function getTrialCount(): number {
  return getTrialData().count;
}

function hasUsedTrialForType(testType: string): boolean {
  return getTrialData().usedTypes.includes(testType);
}

function canUseFreeTrial(): boolean {
  return getTrialCount() < FREE_TRIAL_MAX;
}

function markFreeTrialUsed(testType: string): void {
  try {
    const prev = getTrialData();
    const usedTypes = prev.usedTypes.includes(testType) ? prev.usedTypes : [...prev.usedTypes, testType];
    localStorage.setItem(
      "statmate_free_trial",
      JSON.stringify({ count: prev.count + 1, usedTypes, usedAt: new Date().toISOString() })
    );
  } catch { /* ignore */ }
}

// --- AI Interpretation Component ---

interface AiInterpretationProps {
  testType: "t-test" | "anova" | "chi-square" | "correlation" | "descriptive" | "one-sample-t" | "mann-whitney" | "wilcoxon" | "regression" | "sample-size" | "multiple-regression" | "cronbach-alpha" | "logistic-regression" | "factor-analysis" | "kruskal-wallis" | "friedman" | "two-way-anova" | "repeated-measures" | "fisher-exact" | "mcnemar";
  results: Record<string, unknown>;
}

interface InterpretResult {
  paperReady: string;
  interpretation: string;
  caveats: string;
}

export function AiInterpretation({ testType, results }: AiInterpretationProps) {
  const isPro = useIsPro();
  const locale = useLocale();
  const t = useTranslations("pro");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InterpretResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trialRemaining, setTrialRemaining] = useState(0);
  const [alreadyUsedForThis, setAlreadyUsedForThis] = useState(false);

  // Check free trial availability on mount
  useEffect(() => {
    if (!isPro) {
      setAlreadyUsedForThis(hasUsedTrialForType(testType));
      const remaining = FREE_TRIAL_MAX - getTrialCount();
      setTrialRemaining(remaining);
      if (remaining === 0) {
        trackFreeTrialExhausted(testType);
      }
    }
  }, [isPro, testType]);

  async function handleInterpret(isFreeTrial = false) {
    if (!isPro && !isFreeTrial) return;
    setLoading(true);
    setError(null);

    try {
      // Get license key from localStorage for server-side validation
      let licenseKey = "";
      if (!isFreeTrial) {
        try {
          const stored = localStorage.getItem("statmate_pro");
          if (stored) {
            const data = JSON.parse(stored);
            licenseKey = data.licenseKey || "";
          }
        } catch { /* ignore */ }
      }

      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType,
          results,
          language: locale,
          ...(isFreeTrial ? { freeTrial: true } : { licenseKey }),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to get interpretation");
      }

      setData(await res.json());

      if (isFreeTrial) {
        markFreeTrialUsed(testType);
        setTrialRemaining(FREE_TRIAL_MAX - getTrialCount());
        setAlreadyUsedForThis(true);
        trackFreeTrialUsed(testType);
      } else {
        trackAiInterpret(testType);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to get interpretation");
    } finally {
      setLoading(false);
    }
  }

  // Track preview impression for free users
  useEffect(() => {
    if (!isPro) {
      trackProPreviewImpression(testType);
    }
  }, [isPro, testType]);

  // Free user: show preview + free trial or upgrade CTA
  if (!isPro) {
    return (
    <>
      <Card className="overflow-hidden border-blue-200 dark:border-blue-900">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-[10px] font-bold text-white">
              AI
            </span>
            {t("aiTitle")}
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              PRO
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* If AI result already loaded (from free trial), show it */}
          {data ? (
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{t("paperReady")}</p>
                <p className="mt-1 leading-relaxed text-gray-800">{data.paperReady}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(data.paperReady)}
                  className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                >
                  {t("copy")}
                </button>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{t("plainLanguage")}</p>
                <p className="mt-1 leading-relaxed text-gray-700">{data.interpretation}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{t("caveats")}</p>
                <p className="mt-1 leading-relaxed text-gray-600">{data.caveats}</p>
              </div>
              {/* Post-trial: show remaining trials or upgrade CTA */}
              {trialRemaining > 0 ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950/20">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    {t("freeTrialRemaining", { remaining: trialRemaining, total: FREE_TRIAL_MAX })}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-5 text-center dark:border-blue-800 dark:bg-blue-950/20">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {t("freeTrialUsedDesc")}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href="https://statmate.lemonsqueezy.com/checkout/buy/4ed009d2-951e-417b-8042-01281876d8dd?embed=1"
                      data-ime-cta="ai-paywall-apa-writeup"
                      onClick={() => trackProCtaClick("credits_3_post_trial", testType)}
                    >
                      <Button className="w-full bg-blue-600 text-base font-semibold hover:bg-blue-700">
                        {t("aiPaywallCta")}
                      </Button>
                    </a>
                    <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
                      {t("socialProofUsage")}
                    </p>
                    <a
                      href="https://statmate.lemonsqueezy.com/checkout/buy/11ac7ea9-a760-42bd-b500-137699a9f339?embed=1"
                      data-ime-cta="ai-paywall-annual"
                      onClick={() => trackProCtaClick("ai_interpret_post_trial_annual", testType)}
                      className="text-xs text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                    >
                      {t("ctaButtonAnnual")}
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-red-600 line-through decoration-red-400">
                    SPSS: $99/mo
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                    {t("socialProof")}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Paper Ready — first sentence visible, rest blurred */}
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  {t("paperReady")}
                </p>
                <PlainLanguagePreview text={t(`preview.${testType}.paperReady`)} />
              </div>
              {/* Plain Language — first sentence visible, rest blurred */}
              <div className="relative">
                <p className="text-xs font-semibold text-gray-500">
                  {t("plainLanguage")}
                </p>
                <PlainLanguagePreview text={t(`preview.${testType}.plainLanguage`)} />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              {/* Free trial available: show trial button */}
              {trialRemaining > 0 ? (
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 text-center dark:border-blue-800 dark:bg-blue-950/20">
                  <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {alreadyUsedForThis ? t("freeTrialUsedForThis") : t("freeTrialHook")}
                  </p>
                  <Button
                    onClick={() => handleInterpret(true)}
                    disabled={loading || alreadyUsedForThis}
                    className="w-full bg-blue-600 text-base font-semibold hover:bg-blue-700"
                  >
                    {loading ? t("analyzing") : alreadyUsedForThis ? t("freeTrialTryOther") : t("freeTrialButton", { remaining: trialRemaining })}
                  </Button>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {t("freeTrialRemaining", { remaining: trialRemaining, total: FREE_TRIAL_MAX })}
                  </p>
                </div>
              ) : (
                /* Free trial used: show upgrade CTA with price anchoring */
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-5 text-center dark:border-blue-800 dark:bg-blue-950/20">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {t("freeTrialUsed")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {t("freeTrialUsedDesc")}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href="https://statmate.lemonsqueezy.com/checkout/buy/4ed009d2-951e-417b-8042-01281876d8dd?embed=1"
                      data-ime-cta="ai-paywall-apa-writeup"
                      onClick={() => trackProCtaClick("credits_3_post_trial", testType)}
                    >
                      <Button className="w-full bg-blue-600 text-base font-semibold hover:bg-blue-700">
                        {t("aiPaywallCta")}
                      </Button>
                    </a>
                    <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
                      {t("socialProofUsage")}
                    </p>
                    <a
                      href="https://statmate.lemonsqueezy.com/checkout/buy/11ac7ea9-a760-42bd-b500-137699a9f339?embed=1"
                      data-ime-cta="ai-paywall-annual"
                      onClick={() => trackProCtaClick("ai_interpret_post_trial_annual", testType)}
                      className="text-xs text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                    >
                      {t("ctaButtonAnnual")}
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-red-600 line-through decoration-red-400">
                    SPSS: $99/mo
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                    {t("socialProof")}
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <FeedbackPrompt calculatorId={testType} />
    </>
    );
  }

  // Pro user: functional AI interpretation
  if (!data) {
    return (
    <>
      <Card className="border-blue-200 dark:border-blue-900">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
              AI
            </span>
            {t("aiTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-3 text-sm text-red-600">{error}</p>
          )}
          <Button
            onClick={() => handleInterpret()}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? t("analyzing") : t("generateAI")}
          </Button>
        </CardContent>
      </Card>
      <FeedbackPrompt calculatorId={testType} />
    </>
    );
  }

  return (
  <>
    <Card className="border-blue-200 dark:border-blue-900 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-gray-900 dark:text-white">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
            AI
          </span>
          {t("aiTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {t("paperReady")}
          </p>
          <p className="mt-1 leading-relaxed text-gray-800">
            {data.paperReady}
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(data.paperReady)}
            className="mt-1 text-xs text-blue-600 hover:text-blue-800"
          >
            {t("copy")}
          </button>
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {t("plainLanguage")}
          </p>
          <p className="mt-1 leading-relaxed text-gray-700">
            {data.interpretation}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{t("caveats")}</p>
          <p className="mt-1 leading-relaxed text-gray-600">{data.caveats}</p>
        </div>
      </CardContent>
    </Card>
    <FeedbackPrompt calculatorId={testType} />
  </>
  );
}

// --- Plain Language Preview (first sentence visible, rest blurred) ---

function PlainLanguagePreview({ text }: { text: string }) {
  // Show first sentence only, lock the rest behind paywall
  const sentences = text.split(/(?<=\. )/);
  const visibleCount = Math.min(1, sentences.length);
  const visible = sentences.slice(0, visibleCount).join("");
  const hasMore = sentences.length > visibleCount;

  return (
    <div className="relative">
      <p className="mt-1 text-sm leading-relaxed text-gray-700">
        {visible}
        {hasMore && (
          <span className="select-none text-gray-400"> [...]</span>
        )}
      </p>
      {hasMore && (
        <div className="mt-1 rounded bg-gray-100 px-3 py-2 text-center text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          <svg className="mx-auto mb-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Unlock full interpretation
        </div>
      )}
    </div>
  );
}

// --- Export Button Component ---

interface ExportButtonProps {
  onExport: () => Promise<void>;
  testName: string;
}

export function ExportButton({ onExport, testName }: ExportButtonProps) {
  const t = useTranslations("pro");
  const isPro = useIsPro();
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      await onExport();
      trackWordExport(testName);
    } finally {
      setExporting(false);
    }
  }

  // Word/DOCX export is Pro-only. Free users get an upgrade CTA, never the file.
  // ★수확 실험 P0-B: 오퍼를 팔린 형태(일회성 단건)로 정렬 — 결제 CTA 1개(Gumroad 단건)만 노출,
  //   Pro 구독은 secondary 텍스트 링크로 강등. cta 라벨(word-export-paywall)은 퍼널 연속성 위해 보존.
  //   Gumroad 체크아웃 URL은 NEXT_PUBLIC_GUMROAD_WORD_EXPORT_URL(회장 상품 생성 후 주입). 미설정 시 기존 LS로 graceful fallback(비파괴).
  if (!isPro) {
    const oneTimeCheckoutUrl =
      process.env.NEXT_PUBLIC_GUMROAD_WORD_EXPORT_URL ||
      "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1";
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-green-900">{t("exportTitle")}</p>
              <p className="text-sm text-green-700">{t("exportDescPro")}</p>
            </div>
            <a
              href={oneTimeCheckoutUrl}
              data-ime-cta="word-export-paywall"
              onClick={() => trackProCtaClick("word_export_paywall", testName)}
              className="shrink-0"
            >
              <Button className="bg-green-600 hover:bg-green-700">
                {t("exportOneTimeCta")}
              </Button>
            </a>
          </div>
          <p className="mt-2 text-center text-xs text-green-700/80">
            <a
              href="https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1"
              onClick={() => trackProCtaClick("word_export_pro_secondary", testName)}
              className="underline hover:text-green-900"
            >
              {t("exportGoProSecondary")}
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <p className="font-semibold text-green-900">
            {t("exportTitle")}
          </p>
          <p className="text-sm text-green-700">
            {t("exportDescPro")}
          </p>
        </div>
        <Button
          onClick={handleExport}
          disabled={exporting}
          className="bg-green-600 hover:bg-green-700"
        >
          {exporting ? t("exporting") : t("download")}
        </Button>
      </CardContent>
    </Card>
  );
}

// --- Copy Limit Helpers ---

const COPY_LIMIT = 3;
const COPY_STORAGE_KEY = "statmate_copy_count";

function getCopyCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(localStorage.getItem(COPY_STORAGE_KEY) || "0", 10);
  } catch { return 0; }
}

function incrementCopyCount(): void {
  try {
    localStorage.setItem(COPY_STORAGE_KEY, String(getCopyCount() + 1));
  } catch { /* ignore */ }
}

function canCopyFree(): boolean {
  return getCopyCount() < COPY_LIMIT;
}

// --- Copy Toast Component ---

export function useCopyToast() {
  const isPro = useIsPro();
  const [show, setShow] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [remaining, setRemaining] = useState(COPY_LIMIT);

  useEffect(() => {
    setRemaining(Math.max(0, COPY_LIMIT - getCopyCount()));
  }, []);

  function copy(text: string) {
    if (isPro || canCopyFree()) {
      navigator.clipboard.writeText(text);
      if (!isPro) {
        incrementCopyCount();
        const newRemaining = Math.max(0, COPY_LIMIT - getCopyCount());
        setRemaining(newRemaining);
      }
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    } else {
      setShowPaywall(true);
      trackProCtaClick("copy_paywall_triggered");
    }
  }

  function dismissPaywall() {
    setShowPaywall(false);
  }

  return { show, copy, showPaywall, remaining, dismissPaywall, isPro };
}

export function CopyToast({ show }: { show: boolean }) {
  const t = useTranslations("pro");
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
        {t("copied")}
      </div>
    </div>
  );
}

export function CopyPaywall({ onDismiss }: { onDismiss: () => void }) {
  const t = useTranslations("calculator");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onDismiss}>
      <div
        className="mx-4 w-full max-w-sm rounded-xl border border-blue-200 bg-white p-6 shadow-2xl dark:border-blue-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("copyLimitReached")}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t("copyLimitDesc")}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="https://statmate.lemonsqueezy.com/checkout/buy/4ed009d2-951e-417b-8042-01281876d8dd?embed=1"
            onClick={() => trackProCtaClick("copy_paywall_credits")}
          >
            <Button className="w-full bg-blue-600 text-base font-semibold hover:bg-blue-700">
              {t("copyCreditsButton")}
            </Button>
          </a>
          <a
            href="https://statmate.lemonsqueezy.com/checkout/buy/11ac7ea9-a760-42bd-b500-137699a9f339?embed=1"
            onClick={() => trackProCtaClick("copy_paywall_pro")}
            className="text-center text-xs text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
          >
            {t("copyProUpgrade")}
          </a>
        </div>
        <button
          onClick={onDismiss}
          className="mt-3 w-full text-center text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500"
        >
          {t("copyDismiss")}
        </button>
      </div>
    </div>
  );
}

export function CopyRemainingBadge({ remaining, isPro }: { remaining: number; isPro: boolean }) {
  const t = useTranslations("calculator");
  if (isPro || remaining > COPY_LIMIT) return null;
  if (remaining <= 0) return null;

  return (
    <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
      ({t("copyRemaining", { remaining, total: COPY_LIMIT })})
    </span>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { trackAiInterpret, trackWordExport, trackProCtaClick, trackProPreviewImpression } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsPro } from "@/components/activate-pro";
import { FeedbackPrompt } from "@/components/feedback-prompt";

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

  async function handleInterpret() {
    if (!isPro) return;
    setLoading(true);
    setError(null);

    try {
      // Get license key from localStorage for server-side validation
      let licenseKey = "";
      try {
        const stored = localStorage.getItem("statmate_pro");
        if (stored) {
          const data = JSON.parse(stored);
          licenseKey = data.licenseKey || "";
        }
      } catch { /* ignore */ }

      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testType, results, language: locale, licenseKey }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to get interpretation");
      }

      setData(await res.json());
      trackAiInterpret(testType);
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

  // Free user: show readable preview with CTA below
  if (!isPro) {
    return (
    <>
      <Card className="overflow-hidden border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-purple-900">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-[10px] font-bold text-white">
              AI
            </span>
            {t("aiTitle")}
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
              PRO
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Paper Ready — fully readable to show value */}
          <div>
            <p className="text-xs font-semibold text-gray-500">
              {t("paperReady")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gray-700">
              {t(`preview.${testType}.paperReady`)}
            </p>
          </div>
          {/* Plain Language — first sentence visible, rest blurred */}
          <div className="relative">
            <p className="text-xs font-semibold text-gray-500">
              {t("plainLanguage")}
            </p>
            <PlainLanguagePreview text={t(`preview.${testType}.plainLanguage`)} />
          </div>
          {/* CTA card below content */}
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-center dark:bg-purple-950/20">
            <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">
              {t("ctaTitle")}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t("ctaSubtitle")}
            </p>
            <a
              href="https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProCtaClick("ai_interpret")}
            >
              <Button
                size="sm"
                className="mt-3 bg-purple-600 hover:bg-purple-700"
              >
                {t("ctaButton")}
              </Button>
            </a>
          </div>
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
      <Card className="border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-purple-900">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-[10px] font-bold text-white">
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
            onClick={handleInterpret}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
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
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-purple-900">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-[10px] font-bold text-white">
            AI
          </span>
          {t("aiTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="font-semibold text-purple-900">
            {t("paperReady")}
          </p>
          <p className="mt-1 leading-relaxed text-gray-800">
            {data.paperReady}
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(data.paperReady)}
            className="mt-1 text-xs text-purple-600 hover:text-purple-800"
          >
            {t("copy")}
          </button>
        </div>
        <div>
          <p className="font-semibold text-purple-900">
            {t("plainLanguage")}
          </p>
          <p className="mt-1 leading-relaxed text-gray-700">
            {data.interpretation}
          </p>
        </div>
        <div>
          <p className="font-semibold text-purple-900">{t("caveats")}</p>
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
  const firstDot = text.indexOf(". ");
  if (firstDot === -1) {
    // Single sentence — show with gradient fade
    return (
      <div className="relative">
        <p className="mt-1 text-sm leading-relaxed text-gray-700">{text}</p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-gray-900" />
      </div>
    );
  }
  const visible = text.slice(0, firstDot + 1);
  const blurred = text.slice(firstDot + 2);
  return (
    <div className="relative">
      <p className="mt-1 text-sm leading-relaxed text-gray-700">
        {visible}{" "}
        <span className="select-none blur-[4px]">{blurred}</span>
      </p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-gray-900" />
    </div>
  );
}

// --- Export Button Component ---

interface ExportButtonProps {
  onExport: () => Promise<void>;
  testName: string;
}

export function ExportButton({ onExport, testName }: ExportButtonProps) {
  const isPro = useIsPro();
  const t = useTranslations("pro");
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    if (!isPro) return;
    setExporting(true);
    try {
      // Server-side license verification before export
      let licenseKey = "";
      try {
        const stored = localStorage.getItem("statmate_pro");
        if (stored) licenseKey = JSON.parse(stored).licenseKey || "";
      } catch { /* ignore */ }

      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.valid) {
        localStorage.removeItem("statmate_pro");
        window.location.reload();
        return;
      }

      await onExport();
      trackWordExport(testName);
    } finally {
      setExporting(false);
    }
  }

  if (!isPro) {
    return (
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="font-semibold text-purple-900">
              {t("exportCtaTitle")}
            </p>
            <p className="text-sm text-purple-700">
              {t("exportCtaSubtitle")}
            </p>
          </div>
          <a
            href="https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProCtaClick("word_export")}
          >
            <Button className="bg-purple-600 hover:bg-purple-700">
              {t("exportCtaButton")}
            </Button>
          </a>
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

// --- Copy Toast Component ---

export function useCopyToast() {
  const [show, setShow] = useState(false);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  }

  return { show, copy };
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

"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { trackAiInterpret, trackWordExport, trackProCtaClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsPro } from "@/components/activate-pro";

// --- AI Interpretation Component ---

interface AiInterpretationProps {
  testType: "t-test" | "anova" | "chi-square" | "correlation" | "descriptive" | "one-sample-t" | "mann-whitney" | "wilcoxon" | "regression" | "sample-size" | "multiple-regression" | "cronbach-alpha" | "logistic-regression" | "factor-analysis";
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

  // Free user: show blurred preview
  if (!isPro) {
    return (
      <Card className="relative overflow-hidden border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-purple-900">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-[10px] font-bold text-white">
              AI
            </span>
            {t("aiTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Blurred preview */}
          <div className="select-none space-y-3" aria-hidden="true">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                {t("paperReady")}
              </p>
              <p className="mt-1 text-sm text-gray-700 blur-[6px]">
                An independent samples t-test revealed a statistically
                significant difference between the experimental group (M = 4.52,
                SD = 1.23) and the control group (M = 3.81, SD = 1.45),
                t(58) = 2.45, p = .018, d = 0.63.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">
                {t("plainLanguage")}
              </p>
              <p className="mt-1 text-sm text-gray-700 blur-[6px]">
                The experimental group scored meaningfully higher than the
                control group, with a medium-sized effect. This difference is
                unlikely to be due to chance alone.
              </p>
            </div>
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
            <div className="text-center">
              <p className="mb-2 text-sm font-semibold text-purple-900">
                {t("unlockTitle")}
              </p>
              <p className="mb-3 text-xs text-gray-500">
                {t("unlockDescription")}
              </p>
              <Link href="/pricing" onClick={() => trackProCtaClick("ai_interpret")}>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {t("unlockTitle")}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Pro user: functional AI interpretation
  if (!data) {
    return (
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
    );
  }

  return (
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
              {t("exportTitle")}
            </p>
            <p className="text-sm text-purple-700">
              {t("exportDescFree")}
            </p>
          </div>
          <Link href="/pricing" onClick={() => trackProCtaClick("word_export")}>
            <Button className="bg-purple-600 hover:bg-purple-700">
              {t("unlockTitle")}
            </Button>
          </Link>
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

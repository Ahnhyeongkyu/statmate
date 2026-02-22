"use client";

import { useState, useEffect, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  calculateSampleSize,
  formatSampleSizeAPA,
  type SampleSizeResult,
  type SampleSizeTestType,
} from "@/lib/statistics/sample-size";
import {
  AiInterpretation,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { PowerCurve } from "@/components/charts/power-curve";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeSampleSize, decodeSampleSize, useShareUrl, useUrlParams } from "@/lib/url-params";

const TEST_TYPES: { value: SampleSizeTestType; labelKey: string }[] = [
  { value: "two-sample-t", labelKey: "twoSampleT" },
  { value: "paired-t", labelKey: "pairedT" },
  { value: "one-sample-t", labelKey: "oneSampleT" },
  { value: "anova", labelKey: "anova" },
  { value: "correlation", labelKey: "correlation" },
  { value: "chi-square-2x2", labelKey: "chiSquare" },
  { value: "proportion", labelKey: "proportion" },
];

const EFFECT_SIZE_PRESETS: Record<string, { small: number; medium: number; large: number }> = {
  "two-sample-t": { small: 0.2, medium: 0.5, large: 0.8 },
  "paired-t": { small: 0.2, medium: 0.5, large: 0.8 },
  "one-sample-t": { small: 0.2, medium: 0.5, large: 0.8 },
  anova: { small: 0.1, medium: 0.25, large: 0.4 },
  correlation: { small: 0.1, medium: 0.3, large: 0.5 },
  "chi-square-2x2": { small: 0.1, medium: 0.3, large: 0.5 },
  proportion: { small: 0.2, medium: 0.5, large: 0.8 },
};

function ResultsDisplay({ result }: { result: SampleSizeResult }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("sampleSize");
  const apa = formatSampleSizeAPA(result);
  const { show, copy } = useCopyToast();

  return (
    <div className="space-y-6">
      <CopyToast show={show} />

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            {t("apaResult")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-lg text-blue-900">
            <em>N</em> = {result.nTotal}
            {result.nPerGroup !== result.nTotal && (
              <> ({result.nPerGroup} {ts("perGroup")})</>
            )}
          </p>
          <button
            onClick={() => copy(apa)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {t("copyToClipboard")}
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("detailedResults")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{ts("requiredN")}</span>
              <p className="text-2xl font-bold text-blue-600">{result.nTotal}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("nPerGroup")}</span>
              <p className="text-2xl font-bold">{result.nPerGroup}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("effectSizeUsed")}</span>
              <p className="font-medium">{result.effectSize.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{t("effectSizeLabel")}</span>
              <p className="font-medium capitalize">{t(`${result.effectSizeLabel}Effect`)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("significanceLevel")}</span>
              <p className="font-medium">&alpha; = {result.alpha.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("targetPower")}</span>
              <p className="font-medium">1 - &beta; = {result.power.toFixed(2)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">{ts("achievedPower")}</span>
              <p className="font-medium">
                {(result.achievedPower * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <p className="font-serif italic text-gray-700">{apa}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("powerCurve")}</CardTitle>
        </CardHeader>
        <CardContent>
          <PowerCurve
            effectSize={result.effectSize}
            alpha={result.alpha}
            power={result.power}
            nPerGroup={result.nPerGroup}
            testType={result.testType}
          />
        </CardContent>
      </Card>

      <AiInterpretation
        testType="descriptive"
        results={result as unknown as Record<string, unknown>}
      />

      {/* Free PDF Export */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="font-semibold text-gray-900">{t("pdfExportTitle")}</p>
            <p className="text-sm text-gray-600">{t("pdfExportDesc")}</p>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              const { exportSampleSizePdf } = await import("@/lib/export-pdf");
              const blob = exportSampleSizePdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-sample-size-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SampleSizeCalculatorInner() {
  const t = useTranslations("calculator");
  const ts = useTranslations("sampleSize");
  const [testType, setTestType] = useState<SampleSizeTestType>("two-sample-t");
  const [effectSize, setEffectSize] = useState("0.5");
  const [alpha, setAlpha] = useState("0.05");
  const [power, setPower] = useState("0.80");
  const [numGroups, setNumGroups] = useState("3");
  const [result, setResult] = useState<SampleSizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeSampleSize(searchParams);
    if (state) {
      setTestType(state.testType as SampleSizeTestType);
      setEffectSize(state.effectSize);
      setAlpha(state.alpha);
      setPower(state.power);
      setNumGroups(state.numGroups);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCalculate() {
    setError(null);
    setResult(null);

    const es = parseFloat(effectSize);
    const a = parseFloat(alpha);
    const p = parseFloat(power);
    const k = parseInt(numGroups);

    if (isNaN(es) || es <= 0) {
      setError(ts("errorEffectSize"));
      return;
    }
    if (isNaN(a) || a <= 0 || a >= 1) {
      setError(ts("errorAlpha"));
      return;
    }
    if (isNaN(p) || p <= 0 || p >= 1) {
      setError(ts("errorPower"));
      return;
    }

    try {
      setResult(
        calculateSampleSize({
          testType,
          effectSize: es,
          alpha: a,
          power: p,
          numGroups: k,
        })
      );
      trackCalculate("sample-size");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  useEffect(() => {
    if (autoCalc) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, testType, effectSize, alpha, power]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl("sample-size", result ? encodeSampleSize({ testType, effectSize, alpha, power, numGroups }) : {});

  function handleClear() {
    setEffectSize("0.5");
    setAlpha("0.05");
    setPower("0.80");
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("sample-size");
    setTestType("two-sample-t");
    setEffectSize("0.5");
    setAlpha("0.05");
    setPower("0.80");
    setScenario(ts("exampleScenario"));
  }

  function handlePreset(size: "small" | "medium" | "large") {
    const presets = EFFECT_SIZE_PRESETS[testType];
    if (presets) {
      setEffectSize(presets[size].toString());
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{ts("title")}</CardTitle>
            <CardDescription>{ts("inputDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{ts("testType")}</Label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={testType}
                onChange={(e) => {
                  setTestType(e.target.value as SampleSizeTestType);
                  setResult(null);
                  // Reset to medium effect size for new test type
                  const presets = EFFECT_SIZE_PRESETS[e.target.value];
                  if (presets) setEffectSize(presets.medium.toString());
                }}
              >
                {TEST_TYPES.map((tt) => (
                  <option key={tt.value} value={tt.value}>
                    {ts(`types.${tt.labelKey}`)}
                  </option>
                ))}
              </select>
            </div>

            {testType === "anova" && (
              <div>
                <Label>{ts("numGroups")}</Label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={numGroups}
                  onChange={(e) => setNumGroups(e.target.value)}
                >
                  {[3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <Label>
                {ts("effectSize")}
                {testType === "anova"
                  ? " (Cohen's f)"
                  : testType === "correlation"
                    ? " (r)"
                    : testType === "chi-square-2x2"
                      ? " (Cohen's w)"
                      : " (Cohen's d)"}
              </Label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="3"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={effectSize}
                onChange={(e) => setEffectSize(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handlePreset(size)}
                    className="rounded-full border px-3 py-1 text-xs text-gray-600 hover:bg-gray-100"
                  >
                    {ts(`preset.${size}`)} ({EFFECT_SIZE_PRESETS[testType]?.[size]})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{ts("significanceLevel")} (&alpha;)</Label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={alpha}
                  onChange={(e) => setAlpha(e.target.value)}
                >
                  <option value="0.01">0.01</option>
                  <option value="0.05">0.05</option>
                  <option value="0.10">0.10</option>
                </select>
              </div>
              <div>
                <Label>{ts("targetPower")} (1-&beta;)</Label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                >
                  <option value="0.70">0.70</option>
                  <option value="0.80">0.80</option>
                  <option value="0.90">0.90</option>
                  <option value="0.95">0.95</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <ExampleScenario scenario={scenario} onDismiss={() => setScenario(null)} />

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleCalculate} className="flex-1">
            {t("calculate")}
          </Button>
          <Button variant="outline" onClick={handleExample}>
            {t("loadExample")}
          </Button>
          <Button variant="outline" onClick={handleClear}>
            {t("clear")}
          </Button>
          {result && <ShareButton url={shareUrl} testName="sample-size" />}
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} />
        ) : (
          <Card className="flex h-full items-center justify-center border-dashed">
            <CardContent className="py-16 text-center">
              <p className="text-lg text-gray-400">{t("enterData")}</p>
              <p className="mt-1 text-sm text-gray-300">{t("tryExample")}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export function SampleSizeCalculator() {
  return (
    <Suspense>
      <SampleSizeCalculatorInner />
    </Suspense>
  );
}

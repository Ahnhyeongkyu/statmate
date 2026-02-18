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
import { Badge } from "@/components/ui/badge";
import {
  cronbachAlpha,
  formatCronbachAlphaAPA,
  type CronbachAlphaResult,
} from "@/lib/statistics/cronbach-alpha";
import {
  AiInterpretation,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { parseMatrix } from "@/lib/utils/parse";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeCronbachAlpha, decodeCronbachAlpha, useShareUrl, useUrlParams } from "@/lib/url-params";

function ResultsDisplay({ result }: { result: CronbachAlphaResult }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("cronbachAlpha");
  const apa = formatCronbachAlphaAPA(result);
  const { show, copy } = useCopyToast();

  const interpretationColor =
    result.alpha >= 0.8
      ? "bg-green-100 text-green-800 hover:bg-green-100"
      : result.alpha >= 0.7
        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        : "bg-red-100 text-red-800 hover:bg-red-100";

  return (
    <div className="space-y-6">
      <CopyToast show={show} />

      {/* APA Result Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            {t("apaResult")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-lg text-blue-900">
            Cronbach&apos;s <em>&alpha;</em> = {result.alpha.toFixed(2)}, {result.nItems} items, <em>N</em> = {result.nCases}
          </p>
          <button
            onClick={() => copy(apa)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {t("copyToClipboard")}
          </button>
        </CardContent>
      </Card>

      {/* Reliability Interpretation Badge */}
      <div className="flex items-center gap-2">
        <Badge className={interpretationColor}>
          {result.interpretation} ({ts("reliability")})
        </Badge>
      </div>

      {/* Scale Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("scaleStatistics")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{ts("scaleMean")}</span>
              <p className="font-medium">{result.scaleMean.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("scaleVariance")}</span>
              <p className="font-medium">{result.scaleVariance.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("nItems")}</span>
              <p className="font-medium">{result.nItems}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("nCases")}</span>
              <p className="font-medium">{result.nCases}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("standardizedAlpha")}</span>
              <p className="font-medium">{result.standardizedAlpha.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("splitHalf")}</span>
              <p className="font-medium">{result.splitHalfReliability.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">{ts("spearmanBrown")}</span>
              <p className="font-medium">{result.spearmanBrownReliability.toFixed(4)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Item Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("itemStatistics")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{ts("item")}</th>
                  <th className="py-2 text-right font-semibold"><em>M</em></th>
                  <th className="py-2 text-right font-semibold"><em>SD</em></th>
                  <th className="py-2 text-right font-semibold">{ts("correctedItemTotal")}</th>
                  <th className="py-2 text-right font-semibold">{ts("alphaIfDeleted")}</th>
                </tr>
              </thead>
              <tbody>
                {result.itemStats.map((item, i) => {
                  const highlight = item.alphaIfDeleted > result.alpha;
                  return (
                    <tr
                      key={i}
                      className={`${i === result.itemStats.length - 1 ? "border-b-2 border-gray-900" : ""} ${highlight ? "bg-amber-50" : ""}`}
                    >
                      <td className={`py-1.5 ${highlight ? "font-medium text-amber-800" : ""}`}>
                        {item.name}
                      </td>
                      <td className="py-1.5 text-right">{item.mean.toFixed(2)}</td>
                      <td className="py-1.5 text-right">{item.sd.toFixed(2)}</td>
                      <td className="py-1.5 text-right">{item.correctedItemTotalR.toFixed(4)}</td>
                      <td className={`py-1.5 text-right ${highlight ? "font-medium text-amber-800" : ""}`}>
                        {item.alphaIfDeleted.toFixed(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {result.itemStats.some((item) => item.alphaIfDeleted > result.alpha) && (
            <p className="mt-3 text-xs text-amber-700">
              {ts("highlightHint")}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Interpretation Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("interpretationGuide")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"><em>&alpha;</em> {ts("range")}</th>
                  <th className="py-2 text-left font-semibold">{ts("interpretationLabel")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="py-1.5">&ge; 0.90</td><td className="py-1.5">Excellent</td></tr>
                <tr><td className="py-1.5">0.80 &ndash; 0.89</td><td className="py-1.5">Good</td></tr>
                <tr><td className="py-1.5">0.70 &ndash; 0.79</td><td className="py-1.5">Acceptable</td></tr>
                <tr><td className="py-1.5">0.60 &ndash; 0.69</td><td className="py-1.5">Questionable</td></tr>
                <tr><td className="py-1.5">0.50 &ndash; 0.59</td><td className="py-1.5">Poor</td></tr>
                <tr className="border-b-2 border-gray-900"><td className="py-1.5">&lt; 0.50</td><td className="py-1.5">Unacceptable</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="cronbach-alpha"
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
              const { exportCronbachAlphaPdf } = await import("@/lib/export-pdf");
              const blob = exportCronbachAlphaPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-cronbach-alpha-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CronbachAlphaCalculatorInner() {
  const t = useTranslations("calculator");
  const ts = useTranslations("cronbachAlpha");
  const [matrixInput, setMatrixInput] = useState("");
  const [result, setResult] = useState<CronbachAlphaResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // Detect dimensions
  const parsed = matrixInput.trim() ? parseMatrix(matrixInput) : null;

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeCronbachAlpha(searchParams);
    if (state) {
      setMatrixInput(state.matrixInput);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc && matrixInput) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, matrixInput]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl("cronbach-alpha", result ? encodeCronbachAlpha({ matrixInput }) : {});

  function handleCalculate() {
    setError(null);
    setResult(null);

    const matrix = parseMatrix(matrixInput);
    if (!matrix) {
      setError(ts("errorInvalidMatrix"));
      return;
    }

    if (matrix.nItems < 2) {
      setError(ts("errorMinItems"));
      return;
    }

    if (matrix.nCases < 3) {
      setError(ts("errorMinCases"));
      return;
    }

    try {
      const r = cronbachAlpha(matrix.data);
      setResult(r);
      trackCalculate("cronbach-alpha");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setMatrixInput("");
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("cronbach-alpha");
    setMatrixInput(
      "4, 5, 4, 3, 5, 4, 5, 4\n" +
      "3, 4, 3, 4, 4, 3, 4, 3\n" +
      "5, 5, 5, 4, 5, 5, 5, 5\n" +
      "2, 3, 2, 3, 3, 2, 3, 2\n" +
      "4, 4, 4, 3, 4, 4, 4, 4\n" +
      "3, 3, 3, 2, 3, 3, 3, 3\n" +
      "5, 5, 4, 5, 5, 5, 5, 5\n" +
      "4, 4, 4, 4, 4, 4, 4, 4\n" +
      "3, 4, 3, 3, 3, 3, 4, 3\n" +
      "5, 5, 5, 4, 5, 5, 5, 5"
    );
    setScenario(ts("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{ts("title")}</CardTitle>
            <CardDescription>
              {ts("description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>
                {ts("matrixInput")}
                <span className="ml-1 text-xs text-gray-400">
                  {ts("matrixHint")}
                </span>
              </Label>
              <textarea
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={8}
                placeholder={"Paste from Excel or enter comma-separated values\n4, 5, 4, 3, 5\n3, 4, 3, 4, 4\n5, 5, 5, 4, 5"}
                value={matrixInput}
                onChange={(e) => setMatrixInput(e.target.value)}
              />
              {parsed && (
                <div className="mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {parsed.nCases} cases &times; {parsed.nItems} items detected
                  </Badge>
                </div>
              )}
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
          <Button onClick={handleCalculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={handleExample}>{t("loadExample")}</Button>
          <Button variant="outline" onClick={handleClear}>{t("clear")}</Button>
          {result && <ShareButton url={shareUrl} testName="cronbach-alpha" />}
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

export function CronbachAlphaCalculator() {
  return (
    <Suspense fallback={null}>
      <CronbachAlphaCalculatorInner />
    </Suspense>
  );
}

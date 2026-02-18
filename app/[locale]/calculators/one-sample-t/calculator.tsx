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
  oneSampleTTest,
  formatOneSampleTAPA,
  type OneSampleTResult,
  type TailType,
} from "@/lib/statistics/one-sample-t";
import {
  AiInterpretation,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { parseNumbers } from "@/lib/utils/parse";
import { DataTextarea } from "@/components/data-textarea";
import { Histogram } from "@/components/descriptive-charts";
import { AssumptionChecks } from "@/components/assumption-checks";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeOneSampleT, decodeOneSampleT, useShareUrl, useUrlParams } from "@/lib/url-params";

function ResultsDisplay({ result, data }: { result: OneSampleTResult; data: number[] }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("oneSampleT");
  const apa = formatOneSampleTAPA(result);
  const { show, copy } = useCopyToast();

  return (
    <div className="space-y-6">
      <CopyToast show={show} />

      {/* APA Result */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            {t("apaResult")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-lg text-blue-900">
            <em>t</em>({result.df}) = {Math.abs(result.t).toFixed(2)},{" "}
            <em>p</em>{" "}
            {result.pValue < 0.001
              ? "< .001"
              : `= ${result.pValue.toFixed(3).replace(/^0/, "")}`}
            {result.tail !== "two" && " (one-tailed)"}
            , <em>d</em> = {result.cohensD.toFixed(2)}
          </p>
          <button
            onClick={() => copy(apa)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {t("copyToClipboard")}
          </button>
        </CardContent>
      </Card>

      {/* Significance Badge */}
      <div className="flex items-center gap-2">
        {result.pValue < result.alpha ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {result.alpha !== 0.05
              ? t("significantAt", { alpha: result.alpha.toFixed(2).replace(/^0/, "") })
              : t("significant")}
          </Badge>
        ) : (
          <Badge variant="secondary">
            {result.alpha !== 0.05
              ? t("notSignificantAt", { alpha: result.alpha.toFixed(2).replace(/^0/, "") })
              : t("notSignificant")}
          </Badge>
        )}
        {result.tail !== "two" && (
          <Badge variant="outline" className="text-gray-600">
            {result.tail === "greater" ? t("oneTailedGreater") : t("oneTailedLess")}
          </Badge>
        )}
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("detailedResults")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">
                {t("tStatistic")}
              </span>
              <p className="font-medium">{result.t.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{t("df")}</span>
              <p className="font-medium">{result.df}</p>
            </div>
            <div>
              <span className="text-gray-500">
                {result.tail !== "two" ? t("pValueOneTailed") : t("pValue")}
              </span>
              <p className="font-medium">
                {result.pValue < 0.001
                  ? "< .001"
                  : result.pValue.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{t("meanDiff")}</span>
              <p className="font-medium">{result.meanDiff.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Cohen&apos;s <em>d</em></span>
              <p className="font-medium">{result.cohensD.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">
                {result.alpha !== 0.05
                  ? t("ciDynamic", { level: Math.round((1 - result.alpha) * 100).toString() })
                  : t("ci95")}
              </span>
              <p className="font-medium">
                [{result.ci95[0].toFixed(4)}, {result.ci95[1].toFixed(4)}]
              </p>
            </div>
          </div>

          {/* Sample Statistics */}
          <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
            <div>
              <span className="text-gray-500">{ts("sampleMean")}</span>
              <p className="font-medium">{result.mean.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("sampleSD")}</span>
              <p className="font-medium">{result.sd.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("sampleSE")}</span>
              <p className="font-medium">{result.se.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("sampleN")}</span>
              <p className="font-medium">{result.n}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("testValue")}</span>
              <p className="font-medium">{result.testValue}</p>
            </div>
          </div>

          {/* Effect Size Interpretation */}
          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")} </span>
            {result.cohensD < 0.2
              ? t("negligibleEffect")
              : result.cohensD < 0.5
                ? t("smallEffect")
                : result.cohensD < 0.8
                  ? t("mediumEffect")
                  : t("largeEffect")}{" "}
            (Cohen&apos;s <em>d</em> = {result.cohensD.toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* Data Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("distribution")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Histogram data={data} />
        </CardContent>
      </Card>

      {/* Assumption Checks */}
      <AssumptionChecks testType="one-sample-t" groups={[data]} />

      {/* AI Interpretation */}
      <AiInterpretation
        testType="one-sample-t"
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
              const { exportOneSampleTPdf } = await import("@/lib/export-pdf");
              const blob = exportOneSampleTPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-one-sample-t-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function OneSampleTCalculatorInner() {
  const t = useTranslations("calculator");
  const ts = useTranslations("oneSampleT");
  const [dataInput, setDataInput] = useState("");
  const [testValueInput, setTestValueInput] = useState("0");
  const [alpha, setAlpha] = useState("0.05");
  const [tail, setTail] = useState<TailType>("two");
  const [result, setResult] = useState<OneSampleTResult | null>(null);
  const [parsedData, setParsedData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeOneSampleT(searchParams);
    if (state) {
      setDataInput(state.dataInput);
      setTestValueInput(state.testValueInput);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc && dataInput) { handleCalculate(); setAutoCalc(false); }
  }, [autoCalc, dataInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const shareUrl = useShareUrl("one-sample-t", result ? encodeOneSampleT({ dataInput, testValueInput }) : {});

  function handleCalculate() {
    setError(null);
    setResult(null);

    const data = parseNumbers(dataInput);

    if (data.length < 2) {
      setError(ts("errorMinValues"));
      return;
    }

    const testValue = Number(testValueInput);
    if (isNaN(testValue)) {
      setError(ts("errorTestValue"));
      return;
    }

    try {
      const a = parseFloat(alpha);
      const r = oneSampleTTest({ data, testValue, alpha: a, tail });
      setResult(r);
      setParsedData(data);
      trackCalculate("one-sample-t");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setDataInput("");
    setTestValueInput("0");
    setAlpha("0.05");
    setTail("two");
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("one-sample-t");
    setDataInput("72, 85, 91, 68, 77, 83, 95, 88, 74, 79");
    setTestValueInput("80");
    setScenario(ts("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{ts("inputTitle")}</CardTitle>
            <CardDescription>
              {ts("inputDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTextarea
              id="data"
              label={ts("dataLabel")}
              placeholder="e.g., 72, 85, 91, 68, 77, 83, 95, 88"
              rows={4}
              value={dataInput}
              onChange={setDataInput}
            />
            <div>
              <Label htmlFor="testValue">
                {ts("testValueLabel")}
              </Label>
              <input
                id="testValue"
                type="number"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 80"
                value={testValueInput}
                onChange={(e) => setTestValueInput(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card>
          <CardContent className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">{t("alphaLevel")}</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={alpha}
                onChange={(e) => { setAlpha(e.target.value); setResult(null); }}
              >
                <option value="0.01">0.01</option>
                <option value="0.05">0.05</option>
                <option value="0.10">0.10</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">{t("tail")}</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={tail}
                onChange={(e) => { setTail(e.target.value as TailType); setResult(null); }}
              >
                <option value="two">{t("twoTailed")}</option>
                <option value="greater">{t("oneTailedGreater")}</option>
                <option value="less">{t("oneTailedLess")}</option>
              </select>
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
          {result && <ShareButton url={shareUrl} testName="one-sample-t" />}
        </div>
      </div>

      {/* Results Section */}
      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} data={parsedData} />
        ) : (
          <Card className="flex h-full items-center justify-center border-dashed">
            <CardContent className="py-16 text-center">
              <p className="text-lg text-gray-400">
                {t("enterData")}
              </p>
              <p className="mt-1 text-sm text-gray-300">
                {t("tryExample")}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export function OneSampleTCalculator() {
  return (
    <Suspense fallback={null}>
      <OneSampleTCalculatorInner />
    </Suspense>
  );
}

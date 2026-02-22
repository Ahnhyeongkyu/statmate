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
import { Separator } from "@/components/ui/separator";
import { descriptiveStats, type DescriptiveResult } from "@/lib/statistics/descriptive";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { Histogram, Boxplot } from "@/components/descriptive-charts";
import { parseNumbers } from "@/lib/utils/parse";
import { DataTextarea } from "@/components/data-textarea";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeDescriptive, decodeDescriptive, useShareUrl, useUrlParams } from "@/lib/url-params";

function ResultsDisplay({ result, data }: { result: DescriptiveResult; data: number[] }) {
  const t = useTranslations("calculator");
  const td = useTranslations("descriptive");
  const { show, copy } = useCopyToast();

  return (
    <div className="space-y-6">
      <CopyToast show={show} />
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            {t("summary")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-lg text-blue-900">
            <em>M</em> = {result.mean.toFixed(2)}, <em>SD</em> ={" "}
            {result.sd.toFixed(2)}, <em>N</em> = {result.n}
          </p>
          <button
            onClick={() =>
              copy(`M = ${result.mean.toFixed(2)}, SD = ${result.sd.toFixed(2)}, N = ${result.n}`)
            }
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {t("copyToClipboard")}
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{td("centralTendency")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{td("mean")}</span>
              <p className="font-medium">{result.mean.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("median")}</span>
              <p className="font-medium">{result.median.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">{td("mode")}</span>
              <p className="font-medium">
                {result.mode.length === 0
                  ? td("noMode")
                  : result.mode.map((m) => m.toFixed(2)).join(", ")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{td("variability")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{td("sd")}</span>
              <p className="font-medium">{result.sd.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("variance")}</span>
              <p className="font-medium">{result.variance.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("sem")}</span>
              <p className="font-medium">{result.se.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("range")}</span>
              <p className="font-medium">{result.range.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("min")}</span>
              <p className="font-medium">{result.min.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("max")}</span>
              <p className="font-medium">{result.max.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">{td("ci95mean")}</span>
              <p className="font-medium">
                [{result.ci95[0].toFixed(4)}, {result.ci95[1].toFixed(4)}]
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{td("distribution")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{td("q1")}</span>
              <p className="font-medium">{result.q1.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("q3")}</span>
              <p className="font-medium">{result.q3.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("iqr")}</span>
              <p className="font-medium">{result.iqr.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("n")}</span>
              <p className="font-medium">{result.n}</p>
            </div>

            <Separator className="col-span-2 my-2" />

            <div>
              <span className="text-gray-500">{td("skewness")}</span>
              <p className="font-medium">{result.skewness.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{td("kurtosis")}</span>
              <p className="font-medium">{result.kurtosis.toFixed(4)}</p>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{td("distribution")}: </span>
            {Math.abs(result.skewness) < 0.5
              ? td("approxSymmetric")
              : result.skewness > 0
                ? td("positiveSkew")
                : td("negativeSkew")}
            {" | "}
            {Math.abs(result.kurtosis) < 1
              ? td("mesokurtic")
              : result.kurtosis > 0
                ? td("leptokurtic")
                : td("platykurtic")}
          </div>
        </CardContent>
      </Card>

      {/* Visualizations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{td("histogram")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Histogram data={data} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{td("boxplot")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Boxplot data={data} result={result} />
        </CardContent>
      </Card>

      {/* AI Interpretation */}
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
              const { exportDescriptivePdf } = await import("@/lib/export-pdf");
              const blob = exportDescriptivePdf(result);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-descriptive-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* Export Button */}
      <ExportButton
        testName="descriptive"
        onExport={async () => {
          const { exportDescriptive, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportDescriptive(result);
          downloadBlob(blob, `statmate-descriptive-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function DescriptiveCalculatorInner() {
  const t = useTranslations("calculator");
  const td = useTranslations("descriptive");
  const [dataInput, setDataInput] = useState("");
  const [result, setResult] = useState<DescriptiveResult | null>(null);
  const [parsedData, setParsedData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeDescriptive(searchParams);
    if (state) {
      setDataInput(state.dataInput);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCalculate() {
    setError(null);
    setResult(null);

    const data = parseNumbers(dataInput);

    if (data.length < 2) {
      setError(td("errorMinValues"));
      return;
    }

    try {
      setParsedData(data);
      setResult(descriptiveStats(data));
      trackCalculate("descriptive");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  useEffect(() => {
    if (autoCalc && dataInput) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, dataInput]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl("descriptive", result ? encodeDescriptive({ dataInput }) : {});

  function handleClear() {
    setDataInput("");
    setResult(null);
    setParsedData([]);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("descriptive");
    setDataInput("72, 85, 91, 68, 77, 83, 95, 88, 74, 79, 86, 92, 71, 80, 87, 93, 76, 82, 89, 75");
    setScenario(td("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{td("title")}</CardTitle>
            <CardDescription>
              {td("inputDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTextarea
              label={td("dataInput")}
              placeholder="e.g., 72, 85, 91, 68, 77, 83, 95, 88"
              rows={6}
              value={dataInput}
              onChange={setDataInput}
            />
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
          {result && <ShareButton url={shareUrl} testName="descriptive" />}
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} data={parsedData} />
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

export function DescriptiveCalculator() {
  return (
    <Suspense>
      <DescriptiveCalculatorInner />
    </Suspense>
  );
}

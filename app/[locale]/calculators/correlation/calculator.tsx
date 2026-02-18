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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  pearsonCorrelation,
  spearmanCorrelation,
  formatCorrelationAPA,
  formatPValue,
  type CorrelationResult,
} from "@/lib/statistics/correlation";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { parseNumbers } from "@/lib/utils/parse";
import { DataTextarea } from "@/components/data-textarea";
import { AssumptionChecks } from "@/components/assumption-checks";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeCorrelation, decodeCorrelation, useShareUrl, useUrlParams } from "@/lib/url-params";

function ScatterPlot({ x, y }: { x: number[]; y: number[] }) {
  const width = 300;
  const height = 250;
  const pad = 40;

  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const yMin = Math.min(...y);
  const yMax = Math.max(...y);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const scaleX = (v: number) => pad + ((v - xMin) / xRange) * (width - 2 * pad);
  const scaleY = (v: number) => height - pad - ((v - yMin) / yRange) * (height - 2 * pad);

  // Regression line
  const n = x.length;
  const mx = x.reduce((a, b) => a + b, 0) / n;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - mx) * (y[i] - my);
    den += (x[i] - mx) ** 2;
  }
  const slope = den !== 0 ? num / den : 0;
  const intercept = my - slope * mx;
  const lineY1 = slope * xMin + intercept;
  const lineY2 = slope * xMax + intercept;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm">
      {/* Axes */}
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#9ca3af" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#9ca3af" strokeWidth="1" />

      {/* Regression line */}
      <line
        x1={scaleX(xMin)} y1={scaleY(lineY1)}
        x2={scaleX(xMax)} y2={scaleY(lineY2)}
        stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4"
      />

      {/* Points */}
      {x.map((xi, i) => (
        <circle
          key={i}
          cx={scaleX(xi)}
          cy={scaleY(y[i])}
          r="3.5"
          fill="#3b82f6"
          opacity="0.7"
        />
      ))}

      {/* Labels */}
      <text x={width / 2} y={height - 5} textAnchor="middle" className="text-[10px] fill-gray-500">X</text>
      <text x={10} y={height / 2} textAnchor="middle" transform={`rotate(-90, 10, ${height / 2})`} className="text-[10px] fill-gray-500">Y</text>
    </svg>
  );
}

function ResultsDisplay({ result, xData, yData }: { result: CorrelationResult; xData: number[]; yData: number[] }) {
  const t = useTranslations("calculator");
  const tc = useTranslations("correlation");
  const apa = formatCorrelationAPA(result);
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
            {result.type === "pearson" ? (
              <><em>r</em>({result.df}) = {result.r.toFixed(2)}</>
            ) : (
              <><em>r<sub>s</sub></em>({result.df}) = {result.r.toFixed(2)}</>
            )}
            , <em>p</em> {formatPValue(result.pValue)}
          </p>
          <button
            onClick={() => copy(apa)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {t("copyToClipboard")}
          </button>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        {result.significant ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {t("significant")}
          </Badge>
        ) : (
          <Badge variant="secondary">
            {t("notSignificant")}
          </Badge>
        )}
      </div>

      {/* Scatter Plot */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tc("scatterPlot")}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ScatterPlot x={xData} y={yData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("detailedResults")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{tc("correlationType")}</span>
              <p className="font-medium">
                {result.type === "pearson" ? tc("pearson") : tc("spearman")}
              </p>
            </div>
            <div>
              <span className="text-gray-500">
                {result.type === "pearson" ? <em>r</em> : <em>r<sub>s</sub></em>}
              </span>
              <p className="font-medium">{result.r.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500"><em>r</em>&sup2;</span>
              <p className="font-medium">{result.r2.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{tc("tStatistic")}</span>
              <p className="font-medium">{result.t.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{t("df")}</span>
              <p className="font-medium">{result.df}</p>
            </div>
            <div>
              <span className="text-gray-500">{t("pValue")}</span>
              <p className="font-medium">
                {result.pValue < 0.001 ? "< .001" : result.pValue.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500"><em>N</em></span>
              <p className="font-medium">{result.n}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">{tc("ci95r")}</span>
              <p className="font-medium">
                [{result.ci95[0].toFixed(4)}, {result.ci95[1].toFixed(4)}]
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")} </span>
            {Math.abs(result.r) < 0.1
              ? tc("strengthNegligible")
              : Math.abs(result.r) < 0.3
                ? tc("strengthWeak")
                : Math.abs(result.r) < 0.5
                  ? tc("strengthModerate")
                  : Math.abs(result.r) < 0.7
                    ? tc("strengthStrong")
                    : tc("strengthVeryStrong")}{" "}
            ({result.r > 0 ? tc("positive") : tc("negative")}, <em>r</em> ={" "}
            {result.r.toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* Assumption Checks */}
      <AssumptionChecks testType="correlation" groups={[xData, yData]} />

      {/* AI Interpretation */}
      <AiInterpretation
        testType="correlation"
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
              const { exportCorrelationPdf } = await import("@/lib/export-pdf");
              const blob = exportCorrelationPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-correlation-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* Export Button */}
      <ExportButton
        testName="correlation"
        onExport={async () => {
          const { exportCorrelation, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportCorrelation(result);
          downloadBlob(blob, `statmate-correlation-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function CorrelationCalculatorInner() {
  const t = useTranslations("calculator");
  const tc = useTranslations("correlation");
  const [corrType, setCorrType] = useState<"pearson" | "spearman">("pearson");
  const [xInput, setXInput] = useState("");
  const [yInput, setYInput] = useState("");
  const [result, setResult] = useState<CorrelationResult | null>(null);
  const [xData, setXData] = useState<number[]>([]);
  const [yData, setYData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeCorrelation(searchParams);
    if (state) {
      setCorrType(state.corrType as "pearson" | "spearman");
      setXInput(state.xInput);
      setYInput(state.yInput);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc && xInput && yInput) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, xInput, yInput]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl("correlation", result ? encodeCorrelation({ corrType, xInput, yInput }) : {});

  function handleCalculate() {
    setError(null);
    setResult(null);

    const x = parseNumbers(xInput);
    const y = parseNumbers(yInput);

    if (x.length < 3) {
      setError(tc("errorMinPairs"));
      return;
    }
    if (y.length < 3) {
      setError(tc("errorMinPairs"));
      return;
    }
    if (x.length !== y.length) {
      setError(tc("errorEqualLength"));
      return;
    }

    try {
      const r = corrType === "pearson"
        ? pearsonCorrelation(x, y)
        : spearmanCorrelation(x, y);
      setResult(r);
      setXData(x);
      setYData(y);
      trackCalculate("correlation");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setXInput("");
    setYInput("");
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("correlation");
    setXInput("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
    setYInput("2.1, 3.8, 6.2, 7.9, 10.5, 12.1, 14.8, 15.9, 18.2, 20.1");
    setScenario(tc("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Tabs
          value={corrType}
          onValueChange={(v) => {
            setCorrType(v as "pearson" | "spearman");
            setResult(null);
            setError(null);
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pearson">{tc("pearson")}</TabsTrigger>
            <TabsTrigger value="spearman">{tc("spearman")}</TabsTrigger>
          </TabsList>

          <TabsContent value="pearson" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{tc("pearsonTitle")}</CardTitle>
                <CardDescription>
                  {tc("pearsonDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DataTextarea
                  label={tc("variableX")}
                  placeholder="e.g., 1, 2, 3, 4, 5"
                  value={xInput}
                  onChange={setXInput}
                />
                <DataTextarea
                  label={tc("variableY")}
                  placeholder="e.g., 2.1, 3.8, 6.2, 7.9, 10.5"
                  value={yInput}
                  onChange={setYInput}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spearman" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{tc("spearmanTitle")}</CardTitle>
                <CardDescription>
                  {tc("spearmanDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DataTextarea
                  label={tc("variableX")}
                  placeholder="e.g., 1, 2, 3, 4, 5"
                  value={xInput}
                  onChange={setXInput}
                />
                <DataTextarea
                  label={tc("variableY")}
                  placeholder="e.g., 2.1, 3.8, 6.2, 7.9, 10.5"
                  value={yInput}
                  onChange={setYInput}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
          {result && <ShareButton url={shareUrl} testName="correlation" />}
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} xData={xData} yData={yData} />
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

export function CorrelationCalculator() {
  return (
    <Suspense>
      <CorrelationCalculatorInner />
    </Suspense>
  );
}

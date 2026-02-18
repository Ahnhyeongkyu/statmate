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
import { Badge } from "@/components/ui/badge";
import {
  simpleLinearRegression,
  formatRegressionAPA,
  type RegressionResult,
} from "@/lib/statistics/regression";
import {
  AiInterpretation,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { parseNumbers } from "@/lib/utils/parse";
import { DataTextarea } from "@/components/data-textarea";
import { ResidualPlot, QQPlot } from "@/components/charts/residual-plots";
import { AssumptionChecks } from "@/components/assumption-checks";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeRegression, decodeRegression, useShareUrl, useUrlParams } from "@/lib/url-params";

function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return p.toFixed(3).replace(/^0/, "");
}

function ScatterPlotWithLine({
  x,
  y,
  result,
}: {
  x: number[];
  y: number[];
  result: RegressionResult;
}) {
  const width = 400;
  const height = 250;
  const pad = 40;

  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const yMin = Math.min(...y, ...result.predicted);
  const yMax = Math.max(...y, ...result.predicted);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  // Add 5% padding to ranges
  const xPad = xRange * 0.05;
  const yPad = yRange * 0.05;
  const xLo = xMin - xPad;
  const xHi = xMax + xPad;
  const yLo = yMin - yPad;
  const yHi = yMax + yPad;
  const xR = xHi - xLo || 1;
  const yR = yHi - yLo || 1;

  const scaleX = (v: number) => pad + ((v - xLo) / xR) * (width - 2 * pad);
  const scaleY = (v: number) =>
    height - pad - ((v - yLo) / yR) * (height - 2 * pad);

  // Regression line endpoints
  const lineY1 = result.intercept + result.slope * xMin;
  const lineY2 = result.intercept + result.slope * xMax;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md">
      {/* Axes */}
      <line
        x1={pad}
        y1={height - pad}
        x2={width - pad}
        y2={height - pad}
        stroke="#9ca3af"
        strokeWidth="1"
      />
      <line
        x1={pad}
        y1={pad}
        x2={pad}
        y2={height - pad}
        stroke="#9ca3af"
        strokeWidth="1"
      />

      {/* Regression line */}
      <line
        x1={scaleX(xMin)}
        y1={scaleY(lineY1)}
        x2={scaleX(xMax)}
        y2={scaleY(lineY2)}
        stroke="#ef4444"
        strokeWidth="2"
      />

      {/* Data points */}
      {x.map((xi, i) => (
        <circle
          key={i}
          cx={scaleX(xi)}
          cy={scaleY(y[i])}
          r="4"
          fill="#3b82f6"
          opacity="0.7"
        />
      ))}

      {/* Labels */}
      <text
        x={width / 2}
        y={height - 5}
        textAnchor="middle"
        className="text-[10px] fill-gray-500"
      >
        X
      </text>
      <text
        x={10}
        y={height / 2}
        textAnchor="middle"
        transform={`rotate(-90, 10, ${height / 2})`}
        className="text-[10px] fill-gray-500"
      >
        Y
      </text>
    </svg>
  );
}

function ResultsDisplay({
  result,
  xData,
  yData,
}: {
  result: RegressionResult;
  xData: number[];
  yData: number[];
}) {
  const t = useTranslations("calculator");
  const ts = useTranslations("regression");
  const apa = formatRegressionAPA(result);
  const { show, copy } = useCopyToast();

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
            <em>F</em>({result.dfRegression}, {result.dfResidual}) ={" "}
            {result.fStatistic.toFixed(2)}, <em>p</em>{" "}
            {formatPValue(result.pValue)}, <em>R</em>&sup2; ={" "}
            {result.rSquared.toFixed(3)}
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
        {result.pValue < 0.05 ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {t("significant")}
          </Badge>
        ) : (
          <Badge variant="secondary">{t("notSignificant")}</Badge>
        )}
      </div>

      {/* Scatter Plot with Regression Line */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("scatterPlot")}</CardTitle>
          <CardDescription>{ts("scatterPlotDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ScatterPlotWithLine x={xData} y={yData} result={result} />
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("detailedResults")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Model Summary */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-700">
              {ts("modelSummary")}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">
                  <em>R</em>&sup2;
                </span>
                <p className="font-medium">{result.rSquared.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">{ts("adjustedR2")}</span>
                <p className="font-medium">
                  {result.adjustedRSquared.toFixed(4)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">
                  <em>r</em>
                </span>
                <p className="font-medium">{result.r.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">
                  <em>F</em>({result.dfRegression}, {result.dfResidual})
                </span>
                <p className="font-medium">{result.fStatistic.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">{t("pValue")}</span>
                <p className="font-medium">
                  {result.pValue < 0.001
                    ? "< .001"
                    : result.pValue.toFixed(4)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">{ts("standardError")}</span>
                <p className="font-medium">{result.se.toFixed(4)}</p>
              </div>
            </div>
          </div>

          {/* Regression Equation */}
          <div className="rounded-md bg-gray-50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-700">
              {ts("regressionEquation")}
            </h4>
            <p className="font-mono text-base text-gray-900">
              &#x177; = {result.intercept.toFixed(4)} +{" "}
              {result.slope.toFixed(4)}x
            </p>
          </div>

          {/* Slope Coefficients */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-700">
              {ts("slopeCoefficient")} (b&#x2081;)
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">b&#x2081;</span>
                <p className="font-medium">{result.slope.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">SE</span>
                <p className="font-medium">{result.slopesSE.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">
                  <em>t</em>
                </span>
                <p className="font-medium">{result.tSlope.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">{t("pValue")}</span>
                <p className="font-medium">
                  {result.pSlope < 0.001
                    ? "< .001"
                    : result.pSlope.toFixed(4)}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">{ts("ci95Slope")}</span>
                <p className="font-medium">
                  [{result.ci95Slope[0].toFixed(4)},{" "}
                  {result.ci95Slope[1].toFixed(4)}]
                </p>
              </div>
            </div>
          </div>

          {/* Intercept Coefficients */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-700">
              {ts("interceptCoefficient")} (b&#x2080;)
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">b&#x2080;</span>
                <p className="font-medium">{result.intercept.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">SE</span>
                <p className="font-medium">{result.interceptSE.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">
                  <em>t</em>
                </span>
                <p className="font-medium">{result.tIntercept.toFixed(4)}</p>
              </div>
              <div>
                <span className="text-gray-500">{t("pValue")}</span>
                <p className="font-medium">
                  {result.pIntercept < 0.001
                    ? "< .001"
                    : result.pIntercept.toFixed(4)}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">{ts("ci95Intercept")}</span>
                <p className="font-medium">
                  [{result.ci95Intercept[0].toFixed(4)},{" "}
                  {result.ci95Intercept[1].toFixed(4)}]
                </p>
              </div>
            </div>
          </div>

          {/* N */}
          <div className="rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">
              <em>N</em> = {result.n}
            </span>
            {" | "}
            <span className="text-gray-500">
              {ts("standardErrorEstimate")}: {result.se.toFixed(4)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Residual Plot */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("residualPlot")}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResidualPlot result={result} />
        </CardContent>
      </Card>

      {/* Q-Q Plot */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("qqPlot")}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <QQPlot result={result} />
        </CardContent>
      </Card>

      {/* Assumption Checks */}
      <AssumptionChecks testType="regression" groups={[xData, yData]} />

      {/* AI Interpretation */}
      <AiInterpretation
        testType="regression"
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
              const { exportRegressionPdf } = await import("@/lib/export-pdf");
              const blob = exportRegressionPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-regression-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function RegressionCalculatorInner() {
  const t = useTranslations("calculator");
  const ts = useTranslations("regression");
  const [xInput, setXInput] = useState("");
  const [yInput, setYInput] = useState("");
  const [result, setResult] = useState<RegressionResult | null>(null);
  const [xData, setXData] = useState<number[]>([]);
  const [yData, setYData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeRegression(searchParams);
    if (state) {
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
  const shareUrl = useShareUrl("regression", result ? encodeRegression({ xInput, yInput }) : {});

  function handleCalculate() {
    setError(null);
    setResult(null);

    const x = parseNumbers(xInput);
    const y = parseNumbers(yInput);

    if (x.length < 3) {
      setError(ts("errorMinPairs"));
      return;
    }
    if (y.length < 3) {
      setError(ts("errorMinPairs"));
      return;
    }
    if (x.length !== y.length) {
      setError(ts("errorEqualLength"));
      return;
    }

    try {
      const r = simpleLinearRegression({ x, y });
      setResult(r);
      setXData(x);
      setYData(y);
      trackCalculate("regression");
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
    trackLoadExample("regression");
    setXInput("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
    setYInput("2.1, 4.0, 5.8, 8.2, 9.8, 12.1, 14.0, 15.9, 18.2, 19.8");
    setScenario(ts("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{ts("inputTitle")}</CardTitle>
            <CardDescription>{ts("inputDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTextarea
              label={ts("variableX")}
              placeholder="e.g., 1, 2, 3, 4, 5"
              value={xInput}
              onChange={setXInput}
            />
            <DataTextarea
              label={ts("variableY")}
              placeholder="e.g., 2.1, 4.0, 5.8, 8.2, 9.8"
              value={yInput}
              onChange={setYInput}
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
          <Button onClick={handleCalculate} className="flex-1">
            {t("calculate")}
          </Button>
          <Button variant="outline" onClick={handleExample}>
            {t("loadExample")}
          </Button>
          <Button variant="outline" onClick={handleClear}>
            {t("clear")}
          </Button>
          {result && <ShareButton url={shareUrl} testName="regression" />}
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

export function RegressionCalculator() {
  return (
    <Suspense>
      <RegressionCalculatorInner />
    </Suspense>
  );
}

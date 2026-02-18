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
  multipleRegression,
  formatMultipleRegressionAPA,
  type MultipleRegressionResult,
} from "@/lib/statistics/multiple-regression";
import {
  AiInterpretation,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { parseNumbers } from "@/lib/utils/parse";
import { DataTextarea } from "@/components/data-textarea";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import {
  encodeMultipleRegression,
  decodeMultipleRegression,
  useShareUrl,
  useUrlParams,
} from "@/lib/url-params";

function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return p.toFixed(3).replace(/^0/, "");
}

function ResultsDisplay({ result }: { result: MultipleRegressionResult }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("multipleRegression");
  const apa = formatMultipleRegressionAPA(result);
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

      {/* Model Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("modelSummary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
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
              <span className="text-gray-500">{ts("multipleR")}</span>
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
              <span className="text-gray-500">{ts("durbinWatson")}</span>
              <p className="font-medium">{result.durbinWatson.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("standardError")}</span>
              <p className="font-medium">{result.se.toFixed(4)}</p>
            </div>
          </div>

          {/* Regression Equation */}
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-700">
              {ts("regressionEquation")}
            </h4>
            <p className="font-mono text-sm text-gray-900">
              &#x177; = {result.coefficients[0].b.toFixed(4)}
              {result.coefficients.slice(1).map((c, i) => (
                <span key={i}>
                  {" "}
                  {c.b >= 0 ? "+" : "-"} {Math.abs(c.b).toFixed(4)} &times;{" "}
                  {c.name}
                </span>
              ))}
            </p>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">
              <em>N</em> = {result.n}
            </span>
            {" | "}
            <span className="text-gray-500">
              {ts("numPredictors")}: {result.k}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Coefficients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("coefficients")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">
                    {ts("predictor")}
                  </th>
                  <th className="py-2 text-right font-semibold">
                    <em>B</em>
                  </th>
                  <th className="py-2 text-right font-semibold">SE</th>
                  <th className="py-2 text-right font-semibold">
                    <em>&beta;</em>
                  </th>
                  <th className="py-2 text-right font-semibold">
                    <em>t</em>
                  </th>
                  <th className="py-2 text-right font-semibold">
                    <em>p</em>
                  </th>
                  <th className="py-2 text-right font-semibold">VIF</th>
                </tr>
              </thead>
              <tbody>
                {result.coefficients.map((c, i) => (
                  <tr
                    key={i}
                    className={
                      i === result.coefficients.length - 1
                        ? "border-b-2 border-gray-900"
                        : ""
                    }
                  >
                    <td className="py-1.5">{c.name}</td>
                    <td className="py-1.5 text-right">{c.b.toFixed(4)}</td>
                    <td className="py-1.5 text-right">{c.se.toFixed(4)}</td>
                    <td className="py-1.5 text-right">
                      {c.name === "(Intercept)" ? "—" : c.beta.toFixed(4)}
                    </td>
                    <td className="py-1.5 text-right">{c.t.toFixed(4)}</td>
                    <td className="py-1.5 text-right">
                      {c.p < 0.001 ? "< .001" : c.p.toFixed(3)}
                    </td>
                    <td
                      className={`py-1.5 text-right ${
                        c.vif > 10 ? "font-bold text-red-600" : ""
                      }`}
                    >
                      {c.name === "(Intercept)"
                        ? "—"
                        : c.vif === Infinity
                          ? "\u221E"
                          : c.vif.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 95% CI for each coefficient */}
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            {result.coefficients.map((c, i) => (
              <p key={i}>
                <span className="font-medium">{c.name}</span> 95% CI: [
                {c.ci95[0].toFixed(4)}, {c.ci95[1].toFixed(4)}]
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ANOVA Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("anovaTable")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">
                    {ts("source")}
                  </th>
                  <th className="py-2 text-right font-semibold">SS</th>
                  <th className="py-2 text-right font-semibold">df</th>
                  <th className="py-2 text-right font-semibold">MS</th>
                  <th className="py-2 text-right font-semibold">
                    <em>F</em>
                  </th>
                  <th className="py-2 text-right font-semibold">
                    <em>p</em>
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.anova.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i === result.anova.length - 1
                        ? "border-b-2 border-gray-900"
                        : ""
                    }
                  >
                    <td className="py-1.5">{row.source}</td>
                    <td className="py-1.5 text-right">{row.ss.toFixed(2)}</td>
                    <td className="py-1.5 text-right">{row.df}</td>
                    <td className="py-1.5 text-right">
                      {row.source === "Total" ? "" : row.ms.toFixed(2)}
                    </td>
                    <td className="py-1.5 text-right">
                      {row.source === "Regression"
                        ? row.f.toFixed(2)
                        : ""}
                    </td>
                    <td className="py-1.5 text-right">
                      {row.source === "Regression"
                        ? row.p < 0.001
                          ? "< .001"
                          : row.p.toFixed(3)
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="multiple-regression"
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
              const { exportMultipleRegressionPdf } = await import(
                "@/lib/export-pdf"
              );
              const blob = exportMultipleRegressionPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(
                blob,
                `statmate-multiple-regression-${Date.now()}.pdf`
              );
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MultipleRegressionCalculatorInner() {
  const t = useTranslations("calculator");
  const ts = useTranslations("multipleRegression");
  const [yInput, setYInput] = useState("");
  const [numPredictors, setNumPredictors] = useState(2);
  const [xInputs, setXInputs] = useState<string[]>(["", ""]);
  const [xNames, setXNames] = useState<string[]>(["X1", "X2"]);
  const [result, setResult] = useState<MultipleRegressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeMultipleRegression(searchParams);
    if (state) {
      setYInput(state.yInput);
      setNumPredictors(state.numPredictors);
      setXInputs(state.xInputs);
      setXNames(state.xNames);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc && yInput) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, yInput]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl(
    "multiple-regression",
    result
      ? encodeMultipleRegression({
          yInput,
          numPredictors,
          xInputs,
          xNames,
        })
      : {}
  );

  function handleAddPredictor() {
    if (numPredictors >= 10) return;
    const n = numPredictors + 1;
    setNumPredictors(n);
    setXInputs((prev) => [...prev, ""]);
    setXNames((prev) => [...prev, `X${n}`]);
    setResult(null);
  }

  function handleRemovePredictor() {
    if (numPredictors <= 2) return;
    const n = numPredictors - 1;
    setNumPredictors(n);
    setXInputs((prev) => prev.slice(0, n));
    setXNames((prev) => prev.slice(0, n));
    setResult(null);
  }

  function handleCalculate() {
    setError(null);
    setResult(null);

    const y = parseNumbers(yInput);
    if (y.length < 4) {
      setError(ts("errorMinObservations"));
      return;
    }

    const xs: number[][] = [];
    for (let i = 0; i < numPredictors; i++) {
      const xi = parseNumbers(xInputs[i]);
      if (xi.length < 3) {
        setError(ts("errorPredictorMin", { name: xNames[i] }));
        return;
      }
      if (xi.length !== y.length) {
        setError(ts("errorEqualLength", { name: xNames[i] }));
        return;
      }
      xs.push(xi);
    }

    try {
      const r = multipleRegression({
        y,
        xs,
        predictorNames: xNames.slice(0, numPredictors),
      });
      setResult(r);
      trackCalculate("multiple-regression");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setYInput("");
    setXInputs(Array(numPredictors).fill(""));
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("multiple-regression");
    setNumPredictors(2);
    setYInput("52, 48, 55, 62, 58, 45, 70, 65, 60, 50, 68, 72, 47, 53, 61");
    setXInputs([
      "5, 4, 6, 8, 7, 3, 9, 8, 7, 4, 9, 10, 3, 5, 7",
      "80, 70, 85, 90, 82, 65, 95, 88, 85, 72, 92, 98, 68, 78, 84",
    ]);
    setXNames(["Study Hours", "Attendance %"]);
    setScenario(ts("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{ts("inputTitle")}</CardTitle>
            <CardDescription>{ts("inputDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTextarea
              label={ts("dependentVariable")}
              placeholder="e.g., 52, 48, 55, 62, 58"
              value={yInput}
              onChange={setYInput}
            />

            <div className="flex items-center gap-2">
              <Label>{ts("predictors")}</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemovePredictor}
                disabled={numPredictors <= 2}
              >
                -
              </Button>
              <span className="text-sm font-medium">{numPredictors}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddPredictor}
                disabled={numPredictors >= 10}
              >
                +
              </Button>
            </div>

            {Array.from({ length: numPredictors }, (_, i) => (
              <div key={i}>
                <div className="mb-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={xNames[i]}
                    onChange={(e) => {
                      const names = [...xNames];
                      names[i] = e.target.value;
                      setXNames(names);
                    }}
                    className="w-32 border-b border-gray-300 bg-transparent text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <DataTextarea
                  id={`predictor-${i}`}
                  label=""
                  placeholder={`e.g., 5, 4, 6, 8, 7`}
                  rows={2}
                  value={xInputs[i]}
                  onChange={(val) => {
                    const inputs = [...xInputs];
                    inputs[i] = val;
                    setXInputs(inputs);
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <ExampleScenario
          scenario={scenario}
          onDismiss={() => setScenario(null)}
        />

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
          {result && (
            <ShareButton url={shareUrl} testName="multiple-regression" />
          )}
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

export function MultipleRegressionCalculator() {
  return (
    <Suspense fallback={null}>
      <MultipleRegressionCalculatorInner />
    </Suspense>
  );
}

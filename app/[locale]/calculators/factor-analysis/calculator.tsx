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
  factorAnalysis,
  formatFactorAnalysisAPA,
  type FactorAnalysisResult,
} from "@/lib/statistics/factor-analysis";
import {
  AiInterpretation,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { parseMatrix } from "@/lib/utils/parse";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { ScreePlot } from "@/components/charts/scree-plot";
import {
  encodeFactorAnalysis,
  decodeFactorAnalysis,
  useShareUrl,
  useUrlParams,
} from "@/lib/url-params";

/* ---------- Results Display ---------- */

function ResultsDisplay({ result }: { result: FactorAnalysisResult }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("factorAnalysis");
  const apa = formatFactorAnalysisAPA(result);
  const { show, copy } = useCopyToast();

  const kmoVal = result.kmo.overall;
  const kmoColor =
    kmoVal >= 0.8
      ? "bg-green-100 text-green-800 hover:bg-green-100"
      : kmoVal >= 0.6
        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        : "bg-red-100 text-red-800 hover:bg-red-100";

  const kmoLabel = result.kmo.interpretation;

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
          <p className="font-serif text-lg text-blue-900">{apa}</p>
          <button
            onClick={() => copy(apa)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {t("copyToClipboard")}
          </button>
        </CardContent>
      </Card>

      {/* KMO & Bartlett Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("kmoTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-500">KMO</span>
            <span className="font-medium">{kmoVal.toFixed(4)}</span>
            <Badge className={kmoColor}>{kmoLabel}</Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              {ts("bartlettTitle")}
            </p>
            <div className="mt-1 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">
                  <em>&chi;</em>&sup2;
                </span>
                <p className="font-medium">
                  {result.bartlett.chiSquare.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">df</span>
                <p className="font-medium">{result.bartlett.df}</p>
              </div>
              <div>
                <span className="text-gray-500">
                  <em>p</em>
                </span>
                <p className="font-medium">
                  {result.bartlett.pValue < 0.001
                    ? "< .001"
                    : result.bartlett.pValue.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {result.kmo.perVariable && result.kmo.perVariable.length > 0 && (
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                KMO per variable
              </p>
              <div className="flex flex-wrap gap-2">
                {result.kmo.perVariable.map((v, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {result.variableNames?.[i] ?? `V${i + 1}`}: {v.toFixed(3)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Eigenvalues & Variance Explained */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {ts("eigenvaluesTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Factor</th>
                  <th className="py-2 text-right font-semibold">Eigenvalue</th>
                  <th className="py-2 text-right font-semibold">
                    % {ts("varianceExplained")}
                  </th>
                  <th className="py-2 text-right font-semibold">
                    Cumulative %
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.eigenvalues.map((ev, i) => {
                  const retained = i < result.nFactors;
                  const pctVar = (ev / result.nVariables) * 100;
                  let cumVar = 0;
                  for (let k = 0; k <= i; k++)
                    cumVar += (result.eigenvalues[k] / result.nVariables) * 100;
                  return (
                    <tr
                      key={i}
                      className={`${i === result.eigenvalues.length - 1 ? "border-b-2 border-gray-900" : ""} ${retained ? "font-medium" : "text-gray-400"}`}
                    >
                      <td className="py-1.5">{i + 1}</td>
                      <td className="py-1.5 text-right">{ev.toFixed(4)}</td>
                      <td className="py-1.5 text-right">
                        {pctVar.toFixed(2)}
                      </td>
                      <td className="py-1.5 text-right">
                        {cumVar.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Factor Loadings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("factorLoadings")}</CardTitle>
          <CardDescription>{ts("loadingHighlightHint")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Variable</th>
                  {Array.from({ length: result.nFactors }, (_, i) => (
                    <th key={i} className="py-2 text-right font-semibold">
                      F{i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rotatedLoadings.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i === result.rotatedLoadings.length - 1
                        ? "border-b-2 border-gray-900"
                        : ""
                    }
                  >
                    <td className="py-1.5">
                      {result.variableNames?.[i] ?? `V${i + 1}`}
                    </td>
                    {row.map((val, j) => {
                      const highlight = Math.abs(val) >= 0.4;
                      return (
                        <td
                          key={j}
                          className={`py-1.5 text-right ${highlight ? "font-bold bg-blue-50 text-blue-900" : ""}`}
                        >
                          {val.toFixed(4)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Structure Matrix (Promax only) */}
      {result.structureMatrix && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Structure Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-t-2 border-gray-900">
                    <th className="py-2 text-left font-semibold">Variable</th>
                    {Array.from({ length: result.nFactors }, (_, i) => (
                      <th key={i} className="py-2 text-right font-semibold">
                        F{i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.structureMatrix.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i === result.structureMatrix!.length - 1
                          ? "border-b-2 border-gray-900"
                          : ""
                      }
                    >
                      <td className="py-1.5">
                        {result.variableNames?.[i] ?? `V${i + 1}`}
                      </td>
                      {row.map((val, j) => {
                        const highlight = Math.abs(val) >= 0.4;
                        return (
                          <td
                            key={j}
                            className={`py-1.5 text-right ${highlight ? "font-bold bg-blue-50 text-blue-900" : ""}`}
                          >
                            {val.toFixed(4)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Communalities Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("communalities")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Variable</th>
                  <th className="py-2 text-right font-semibold">Initial</th>
                  <th className="py-2 text-right font-semibold">Extraction</th>
                </tr>
              </thead>
              <tbody>
                {result.communalities.map((c, i) => {
                  const low = c.extraction < 0.4;
                  return (
                    <tr
                      key={i}
                      className={`${i === result.communalities.length - 1 ? "border-b-2 border-gray-900" : ""} ${low ? "bg-amber-50" : ""}`}
                    >
                      <td className={`py-1.5 ${low ? "font-medium text-amber-800" : ""}`}>
                        {c.variable}
                      </td>
                      <td className="py-1.5 text-right">{c.initial.toFixed(4)}</td>
                      <td
                        className={`py-1.5 text-right ${low ? "font-medium text-amber-800" : ""}`}
                      >
                        {c.extraction.toFixed(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {result.communalities.some((c) => c.extraction < 0.4) && (
            <p className="mt-3 text-xs text-amber-700">
              Highlighted variables have low communalities (&lt; 0.4) and may
              not be well explained by the extracted factors.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Factor Correlation Matrix (Promax only) */}
      {result.factorCorrelationMatrix && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {ts("factorCorrelation")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-t-2 border-gray-900">
                    <th className="py-2 text-left font-semibold">Factor</th>
                    {Array.from({ length: result.nFactors }, (_, i) => (
                      <th key={i} className="py-2 text-right font-semibold">
                        F{i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.factorCorrelationMatrix!.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i === result.factorCorrelationMatrix!.length - 1
                          ? "border-b-2 border-gray-900"
                          : ""
                      }
                    >
                      <td className="py-1.5 font-medium">F{i + 1}</td>
                      {row.map((val, j) => (
                        <td key={j} className="py-1.5 text-right">
                          {val.toFixed(4)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Extraction / Rotation Info */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">
          {ts("extractionMethod")}: {result.extractionMethod === "pca" ? ts("pca") : ts("paf")}
        </Badge>
        <Badge variant="secondary">
          {ts("rotationMethod")}:{" "}
          {result.rotationMethod === "none"
            ? ts("noRotation")
            : result.rotationMethod === "varimax"
              ? ts("varimax")
              : ts("promax")}
        </Badge>
        <Badge variant="secondary">
          {ts("numFactors")}: {result.nFactors}
        </Badge>
      </div>

      {/* Scree Plot */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{ts("screePlot")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScreePlot eigenvalues={result.eigenvalues} nFactors={result.nFactors} />
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="factor-analysis"
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
              const { exportFactorAnalysisPdf } = await import(
                "@/lib/export-pdf"
              );
              const blob = exportFactorAnalysisPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(
                blob,
                `statmate-factor-analysis-${Date.now()}.pdf`
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

/* ---------- Calculator Inner ---------- */

function FactorAnalysisCalculatorInner() {
  const t = useTranslations("calculator");
  const ts = useTranslations("factorAnalysis");
  const [matrixInput, setMatrixInput] = useState("");
  const [extraction, setExtraction] = useState<"pca" | "paf">("pca");
  const [rotation, setRotation] = useState<"none" | "varimax" | "promax">(
    "varimax"
  );
  const [nFactorsMode, setNFactorsMode] = useState<"auto" | "manual">("auto");
  const [nFactorsInput, setNFactorsInput] = useState("3");
  const [variableNamesInput, setVariableNamesInput] = useState("");
  const [result, setResult] = useState<FactorAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // Detect dimensions
  const parsed = matrixInput.trim() ? parseMatrix(matrixInput) : null;

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeFactorAnalysis(searchParams);
    if (state) {
      setMatrixInput(state.matrixInput);
      if (state.extraction) setExtraction(state.extraction as "pca" | "paf");
      if (state.rotation)
        setRotation(state.rotation as "none" | "varimax" | "promax");
      if (state.nFactors) {
        setNFactorsMode("manual");
        setNFactorsInput(state.nFactors);
      }
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
  const shareUrl = useShareUrl(
    "factor-analysis",
    result
      ? encodeFactorAnalysis({
          matrixInput,
          extraction,
          rotation,
          nFactors: nFactorsMode === "manual" ? nFactorsInput : "",
        })
      : {}
  );

  function handleCalculate() {
    setError(null);
    setResult(null);

    const matrix = parseMatrix(matrixInput);
    if (!matrix) {
      setError(ts("errorInvalidMatrix"));
      return;
    }

    if (matrix.nItems < 2) {
      setError(ts("errorMinVariables"));
      return;
    }

    if (matrix.nCases <= matrix.nItems) {
      setError(ts("errorMinObservations"));
      return;
    }

    const varNames = variableNamesInput.trim()
      ? variableNamesInput.split(",").map((s) => s.trim())
      : undefined;

    try {
      const r = factorAnalysis(matrix.data, {
        extraction,
        rotation,
        nFactors:
          nFactorsMode === "manual" ? parseInt(nFactorsInput) : undefined,
        variableNames: varNames,
      });
      setResult(r);
      trackCalculate("factor-analysis");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setMatrixInput("");
    setExtraction("pca");
    setRotation("varimax");
    setNFactorsMode("auto");
    setNFactorsInput("3");
    setVariableNamesInput("");
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("factor-analysis");
    setMatrixInput(
      "2, 2, 2, 3, 2, 2, 2, 2\n" +
        "3, 3, 4, 5, 5, 4, 4, 4\n" +
        "2, 2, 2, 2, 2, 2, 2, 2\n" +
        "4, 4, 5, 4, 4, 3, 3, 3\n" +
        "3, 3, 3, 3, 3, 3, 3, 3\n" +
        "3, 2, 3, 3, 3, 4, 4, 4\n" +
        "3, 3, 2, 4, 3, 3, 4, 3\n" +
        "2, 2, 2, 3, 3, 4, 4, 4\n" +
        "3, 3, 3, 3, 3, 2, 2, 2\n" +
        "2, 2, 2, 4, 4, 2, 2, 2\n" +
        "4, 4, 4, 5, 5, 4, 4, 4\n" +
        "3, 3, 3, 2, 1, 2, 3, 3\n" +
        "3, 3, 2, 3, 3, 3, 3, 3\n" +
        "3, 2, 3, 2, 2, 2, 1, 2\n" +
        "3, 3, 3, 3, 2, 2, 2, 2\n" +
        "3, 3, 3, 3, 3, 2, 2, 2\n" +
        "3, 2, 3, 2, 2, 2, 3, 2\n" +
        "2, 3, 3, 4, 3, 4, 4, 4\n" +
        "2, 3, 2, 4, 4, 3, 3, 4\n" +
        "3, 3, 3, 4, 4, 3, 3, 3\n" +
        "4, 3, 3, 3, 3, 3, 3, 3\n" +
        "4, 3, 3, 3, 3, 4, 4, 4\n" +
        "4, 4, 4, 4, 3, 3, 4, 4\n" +
        "5, 5, 5, 2, 2, 4, 4, 5\n" +
        "3, 3, 3, 2, 1, 3, 3, 3\n" +
        "4, 4, 4, 2, 2, 3, 3, 2\n" +
        "3, 3, 3, 3, 3, 4, 4, 3\n" +
        "3, 2, 3, 2, 2, 4, 3, 4\n" +
        "1, 2, 3, 3, 3, 1, 1, 1\n" +
        "5, 5, 5, 3, 3, 4, 3, 4"
    );
    setVariableNamesInput(
      "Ext1, Ext2, Ext3, Con1, Con2, Open1, Open2, Open3"
    );
    setExtraction("pca");
    setRotation("varimax");
    setNFactorsMode("auto");
    setScenario(ts("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{ts("title")}</CardTitle>
            <CardDescription>{ts("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Matrix Input */}
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
                placeholder={
                  "Paste from Excel or enter comma-separated values\n4, 2, 5, 4, 3\n3, 1, 4, 5, 4\n5, 3, 5, 3, 2"
                }
                value={matrixInput}
                onChange={(e) => setMatrixInput(e.target.value)}
              />
              {parsed && (
                <div className="mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {parsed.nCases} observations &times; {parsed.nItems}{" "}
                    variables detected
                  </Badge>
                </div>
              )}
            </div>

            {/* Extraction Method */}
            <div>
              <Label>{ts("extractionMethod")}</Label>
              <div className="mt-1 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={extraction === "pca" ? "default" : "outline"}
                  onClick={() => setExtraction("pca")}
                >
                  {ts("pca")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={extraction === "paf" ? "default" : "outline"}
                  onClick={() => setExtraction("paf")}
                >
                  {ts("paf")}
                </Button>
              </div>
            </div>

            {/* Rotation Method */}
            <div>
              <Label>{ts("rotationMethod")}</Label>
              <div className="mt-1 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={rotation === "none" ? "default" : "outline"}
                  onClick={() => setRotation("none")}
                >
                  {ts("noRotation")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={rotation === "varimax" ? "default" : "outline"}
                  onClick={() => setRotation("varimax")}
                >
                  {ts("varimax")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={rotation === "promax" ? "default" : "outline"}
                  onClick={() => setRotation("promax")}
                >
                  {ts("promax")}
                </Button>
              </div>
            </div>

            {/* Number of Factors */}
            <div>
              <Label>{ts("numFactors")}</Label>
              <div className="mt-1 flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={nFactorsMode === "auto" ? "default" : "outline"}
                  onClick={() => setNFactorsMode("auto")}
                >
                  {ts("autoKaiser")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={nFactorsMode === "manual" ? "default" : "outline"}
                  onClick={() => setNFactorsMode("manual")}
                >
                  {ts("manual")}
                </Button>
                {nFactorsMode === "manual" && (
                  <input
                    type="number"
                    min={1}
                    max={20}
                    className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={nFactorsInput}
                    onChange={(e) => setNFactorsInput(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Variable Names */}
            <div>
              <Label>
                {ts("variableNames")}
                <span className="ml-1 text-xs text-gray-400">
                  {ts("variableNamesHint")}
                </span>
              </Label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="V1, V2, V3, ..."
                value={variableNamesInput}
                onChange={(e) => setVariableNamesInput(e.target.value)}
              />
            </div>
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
            <ShareButton url={shareUrl} testName="factor-analysis" />
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

/* ---------- Exported Wrapper ---------- */

export function FactorAnalysisCalculator() {
  return (
    <Suspense fallback={null}>
      <FactorAnalysisCalculatorInner />
    </Suspense>
  );
}

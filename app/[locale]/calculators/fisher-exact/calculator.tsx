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
import { Separator } from "@/components/ui/separator";
import {
  fisherExactTest,
  formatFisherExactAPA,
  formatPValue,
  type FisherExactResult,
} from "@/lib/statistics/fisher-exact";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { IndependenceBarChart } from "@/components/charts/chi-square-chart";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import {
  encodeFisherExact,
  decodeFisherExact,
  useShareUrl,
  useUrlParams,
} from "@/lib/url-params";

function ResultsDisplay({ result }: { result: FisherExactResult }) {
  const t = useTranslations("calculator");
  const tc = useTranslations("fisherExact");
  const apa = formatFisherExactAPA(result);
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
            Fisher&apos;s exact test, <em>p</em>{" "}
            {formatPValue(result.pValue)}, OR ={" "}
            {isFinite(result.oddsRatio)
              ? result.oddsRatio.toFixed(2)
              : "\u221E"}
            , 95% CI [
            {isFinite(result.oddsRatioCI[0])
              ? result.oddsRatioCI[0].toFixed(2)
              : "0.00"}
            ,{" "}
            {isFinite(result.oddsRatioCI[1])
              ? result.oddsRatioCI[1].toFixed(2)
              : "\u221E"}
            ]
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("detailedResults")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{tc("pValueLabel")}</span>
              <p className="font-medium">
                {result.pValue < 0.001 ? "< .001" : result.pValue.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{tc("oddsRatioLabel")}</span>
              <p className="font-medium">
                {isFinite(result.oddsRatio)
                  ? result.oddsRatio.toFixed(4)
                  : "\u221E"}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{tc("oddsRatioCILabel")}</span>
              <p className="font-medium">
                [
                {isFinite(result.oddsRatioCI[0])
                  ? result.oddsRatioCI[0].toFixed(4)
                  : "0.0000"}
                ,{" "}
                {isFinite(result.oddsRatioCI[1])
                  ? result.oddsRatioCI[1].toFixed(4)
                  : "\u221E"}
                ]
              </p>
            </div>
            <div>
              <span className="text-gray-500">{tc("phiLabel")}</span>
              <p className="font-medium">{result.phi.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{tc("relativeRiskLabel")}</span>
              <p className="font-medium">
                {isFinite(result.relativeRisk)
                  ? result.relativeRisk.toFixed(4)
                  : "\u221E"}
                {" "}
                <span className="text-xs text-gray-400">
                  95% CI [{result.relativeRiskCI[0].toFixed(2)}, {isFinite(result.relativeRiskCI[1]) ? result.relativeRiskCI[1].toFixed(2) : "\u221E"}]
                </span>
              </p>
            </div>
            <div>
              <span className="text-gray-500">{tc("totalN")}</span>
              <p className="font-medium">{result.grandTotal}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            {tc("observed")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"></th>
                  {result.observed[0].map((_, j) => (
                    <th key={j} className="py-2 text-right font-semibold">
                      {tc("colLabel", { n: j + 1 })}
                    </th>
                  ))}
                  <th className="py-2 text-right font-semibold">{tc("total")}</th>
                </tr>
              </thead>
              <tbody>
                {result.observed.map((row, i) => (
                  <tr key={i} className={i === 1 ? "border-b border-gray-300" : ""}>
                    <td className="py-1.5 font-medium">{tc("rowLabel", { n: i + 1 })}</td>
                    {row.map((cell, j) => (
                      <td key={j} className="py-1.5 text-right">{cell}</td>
                    ))}
                    <td className="py-1.5 text-right font-medium">
                      {result.rowTotals[i]}
                    </td>
                  </tr>
                ))}
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5 font-semibold">{tc("total")}</td>
                  {result.colTotals.map((ct, j) => (
                    <td key={j} className="py-1.5 text-right font-medium">{ct}</td>
                  ))}
                  <td className="py-1.5 text-right font-semibold">
                    {result.grandTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            {tc("expected")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"></th>
                  {result.expected[0].map((_, j) => (
                    <th key={j} className="py-2 text-right font-semibold">
                      {tc("colLabel", { n: j + 1 })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.expected.map((row, i) => (
                  <tr key={i} className={i === 1 ? "border-b-2 border-gray-900" : ""}>
                    <td className="py-1.5 font-medium">{tc("rowLabel", { n: i + 1 })}</td>
                    {row.map((cell, j) => (
                      <td key={j} className="py-1.5 text-right">
                        {cell.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")} </span>
            {Math.abs(result.phi) < 0.1
              ? tc("negligibleAssoc")
              : Math.abs(result.phi) < 0.3
                ? tc("smallAssoc")
                : Math.abs(result.phi) < 0.5
                  ? tc("mediumAssoc")
                  : tc("largeAssoc")}{" "}
            (&phi; = {result.phi.toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tc("chart")}</CardTitle>
        </CardHeader>
        <CardContent>
          <IndependenceBarChart observed={result.observed} />
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="fisher-exact"
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
              const { exportChiSquarePdf } = await import("@/lib/export-pdf");
              const blob = exportChiSquarePdf(
                {
                  type: "independence",
                  chiSquare: 0,
                  df: 1,
                  pValue: result.pValue,
                  cramersV: Math.abs(result.phi),
                  observed: result.observed,
                  expected: result.expected,
                  rowTotals: result.rowTotals,
                  colTotals: result.colTotals,
                  grandTotal: result.grandTotal,
                  rows: 2,
                  cols: 2,
                  significant: result.significant,
                },
                apa
              );
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-fisher-exact-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* Export Button */}
      <ExportButton
        testName="fisher-exact"
        onExport={async () => {
          const { exportChiSquare, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportChiSquare({
            type: "independence",
            chiSquare: 0,
            df: 1,
            pValue: result.pValue,
            cramersV: Math.abs(result.phi),
            observed: result.observed,
            expected: result.expected,
            rowTotals: result.rowTotals,
            colTotals: result.colTotals,
            grandTotal: result.grandTotal,
            rows: 2,
            cols: 2,
            significant: result.significant,
          });
          downloadBlob(blob, `statmate-fisher-exact-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function FisherExactCalculatorInner() {
  const t = useTranslations("calculator");
  const tc = useTranslations("fisherExact");
  const [cells, setCells] = useState<string[][]>([
    ["", ""],
    ["", ""],
  ]);
  const [rowLabels, setRowLabels] = useState<string[]>(["", ""]);
  const [colLabels, setColLabels] = useState<string[]>(["", ""]);
  const [result, setResult] = useState<FisherExactResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeFisherExact(searchParams);
    if (state) {
      setCells(state.cells);
      setRowLabels(state.rowLabels);
      setColLabels(state.colLabels);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, cells]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl(
    "fisher-exact",
    result ? encodeFisherExact({ cells, rowLabels, colLabels }) : {}
  );

  function handleCellChange(i: number, j: number, value: string) {
    const newCells = cells.map((row) => [...row]);
    newCells[i][j] = value;
    setCells(newCells);
  }

  function handleCalculate() {
    setError(null);
    setResult(null);

    try {
      const table = cells.map((row) =>
        row.map((cell) => {
          const n = Number(cell);
          if (isNaN(n) || n < 0) throw new Error("All cells must be non-negative integers.");
          if (!Number.isInteger(n)) throw new Error("All cells must be non-negative integers.");
          return n;
        })
      );
      setResult(fisherExactTest(table));
      trackCalculate("fisher-exact");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setCells([["", ""], ["", ""]]);
    setRowLabels(["", ""]);
    setColLabels(["", ""]);
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("fisher-exact");
    setCells([
      ["8", "2"],
      ["1", "9"],
    ]);
    setRowLabels(["Treatment", "Control"]);
    setColLabels(["Improved", "Not Improved"]);
    setScenario(tc("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {tc("inputTitle")}
            </CardTitle>
            <CardDescription>
              {tc("inputDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th></th>
                    {[0, 1].map((j) => (
                      <th key={j} className="px-1 py-1 text-center">
                        <input
                          type="text"
                          className="w-24 rounded border px-2 py-1 text-center text-xs text-gray-600"
                          value={colLabels[j]}
                          onChange={(e) => {
                            const newLabels = [...colLabels];
                            newLabels[j] = e.target.value;
                            setColLabels(newLabels);
                          }}
                          placeholder={tc("colLabel", { n: j + 1 })}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1].map((i) => (
                    <tr key={i}>
                      <td className="pr-2">
                        <input
                          type="text"
                          className="w-24 rounded border px-2 py-1 text-center text-xs text-gray-600"
                          value={rowLabels[i]}
                          onChange={(e) => {
                            const newLabels = [...rowLabels];
                            newLabels[i] = e.target.value;
                            setRowLabels(newLabels);
                          }}
                          placeholder={tc("rowLabel", { n: i + 1 })}
                        />
                      </td>
                      {[0, 1].map((j) => (
                        <td key={j} className="px-1 py-1">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            className="w-20 rounded border px-2 py-1 text-center text-sm"
                            value={cells[i][j]}
                            onChange={(e) => handleCellChange(i, j, e.target.value)}
                            placeholder="0"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
          {result && <ShareButton url={shareUrl} testName="fisher-exact" />}
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} />
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

export function FisherExactCalculator() {
  return (
    <Suspense>
      <FisherExactCalculatorInner />
    </Suspense>
  );
}

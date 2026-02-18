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
  mcnemarTest,
  formatMcNemarAPA,
  formatPValue,
  type McNemarResult,
} from "@/lib/statistics/mcnemar";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import {
  encodeMcNemar,
  decodeMcNemar,
  useShareUrl,
  useUrlParams,
} from "@/lib/url-params";

function ResultsDisplay({ result }: { result: McNemarResult }) {
  const t = useTranslations("calculator");
  const tc = useTranslations("mcnemar");
  const apa = formatMcNemarAPA(result);
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
            {result.useExact ? (
              <>
                McNemar&apos;s exact test, <em>p</em>{" "}
                {formatPValue(result.pValue)}
              </>
            ) : (
              <>
                McNemar&apos;s test, <em>&chi;&sup2;</em>(1) ={" "}
                {result.chiSquare.toFixed(2)}, <em>p</em>{" "}
                {formatPValue(result.pValue)}
              </>
            )}
          </p>
          {result.useExact && (
            <p className="mt-1 text-sm text-blue-700">
              {tc("exactTestNote")}
            </p>
          )}
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
        {result.useExact && (
          <Badge variant="outline" className="text-blue-700 border-blue-300">
            {tc("exactTest")}
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
              <span className="text-gray-500">{tc("chiSquareLabel")}</span>
              <p className="font-medium">{result.chiSquare.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{tc("dfLabel")}</span>
              <p className="font-medium">{result.df}</p>
            </div>
            <div>
              <span className="text-gray-500">{tc("pValueLabel")}</span>
              <p className="font-medium">
                {result.pValue < 0.001 ? "< .001" : result.pValue.toFixed(4)}
              </p>
            </div>
            {result.exactP !== null && (
              <div>
                <span className="text-gray-500">{tc("exactPLabel")}</span>
                <p className="font-medium">
                  {result.exactP < 0.001 ? "< .001" : result.exactP.toFixed(4)}
                </p>
              </div>
            )}
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
          </div>

          <Separator className="my-4" />

          {/* 2x2 Observed Table */}
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            {tc("observed")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"></th>
                  <th className="py-2 text-right font-semibold">{tc("afterPositive")}</th>
                  <th className="py-2 text-right font-semibold">{tc("afterNegative")}</th>
                  <th className="py-2 text-right font-semibold">{tc("total")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5 font-medium">{tc("beforePositive")}</td>
                  <td className="py-1.5 text-right">{result.observed[0][0]}</td>
                  <td className="py-1.5 text-right font-medium text-orange-600">{result.observed[0][1]}</td>
                  <td className="py-1.5 text-right font-medium">
                    {result.observed[0][0] + result.observed[0][1]}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-1.5 font-medium">{tc("beforeNegative")}</td>
                  <td className="py-1.5 text-right font-medium text-orange-600">{result.observed[1][0]}</td>
                  <td className="py-1.5 text-right">{result.observed[1][1]}</td>
                  <td className="py-1.5 text-right font-medium">
                    {result.observed[1][0] + result.observed[1][1]}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5 font-semibold">{tc("total")}</td>
                  <td className="py-1.5 text-right font-medium">
                    {result.observed[0][0] + result.observed[1][0]}
                  </td>
                  <td className="py-1.5 text-right font-medium">
                    {result.observed[0][1] + result.observed[1][1]}
                  </td>
                  <td className="py-1.5 text-right font-semibold">{result.n}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-4" />

          {/* Discordant pairs highlight */}
          <div className="rounded-md bg-orange-50 border border-orange-200 p-3 text-sm">
            <p className="font-semibold text-orange-800">{tc("discordantPairs")}</p>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <span className="text-orange-600">{tc("bLabel")}</span>
                <p className="font-medium">{result.b}</p>
              </div>
              <div>
                <span className="text-orange-600">{tc("cLabel")}</span>
                <p className="font-medium">{result.c}</p>
              </div>
              <div>
                <span className="text-orange-600">{tc("discordantTotal")}</span>
                <p className="font-medium">{result.discordantTotal}</p>
              </div>
              <div>
                <span className="text-orange-600">{tc("proportionChanged")}</span>
                <p className="font-medium">
                  {(result.proportionChanged * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="mcnemar"
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
                  chiSquare: result.chiSquare,
                  df: result.df,
                  pValue: result.pValue,
                  cramersV: 0,
                  observed: result.observed,
                  expected: result.observed,
                  rowTotals: [
                    result.observed[0][0] + result.observed[0][1],
                    result.observed[1][0] + result.observed[1][1],
                  ],
                  colTotals: [
                    result.observed[0][0] + result.observed[1][0],
                    result.observed[0][1] + result.observed[1][1],
                  ],
                  grandTotal: result.n,
                  rows: 2,
                  cols: 2,
                  significant: result.significant,
                },
                apa
              );
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-mcnemar-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* Export Button */}
      <ExportButton
        testName="mcnemar"
        onExport={async () => {
          const { exportChiSquare, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportChiSquare({
            type: "independence",
            chiSquare: result.chiSquare,
            df: result.df,
            pValue: result.pValue,
            cramersV: 0,
            observed: result.observed,
            expected: result.observed,
            rowTotals: [
              result.observed[0][0] + result.observed[0][1],
              result.observed[1][0] + result.observed[1][1],
            ],
            colTotals: [
              result.observed[0][0] + result.observed[1][0],
              result.observed[0][1] + result.observed[1][1],
            ],
            grandTotal: result.n,
            rows: 2,
            cols: 2,
            significant: result.significant,
          });
          downloadBlob(blob, `statmate-mcnemar-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function McNemarCalculatorInner() {
  const t = useTranslations("calculator");
  const tc = useTranslations("mcnemar");
  const [cells, setCells] = useState<string[][]>([
    ["", ""],
    ["", ""],
  ]);
  const [rowLabels, setRowLabels] = useState<string[]>(["", ""]);
  const [colLabels, setColLabels] = useState<string[]>(["", ""]);
  const [result, setResult] = useState<McNemarResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeMcNemar(searchParams);
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
    "mcnemar",
    result ? encodeMcNemar({ cells, rowLabels, colLabels }) : {}
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
      setResult(mcnemarTest(table));
      trackCalculate("mcnemar");
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
    trackLoadExample("mcnemar");
    setCells([
      ["40", "12"],
      ["5", "43"],
    ]);
    setRowLabels(["Before: Positive", "Before: Negative"]);
    setColLabels(["After: Positive", "After: Negative"]);
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
              <table className="text-sm">
                <thead>
                  <tr>
                    <th></th>
                    {[0, 1].map((j) => (
                      <th key={j} className="px-1 py-1 text-center">
                        <input
                          type="text"
                          className="w-28 rounded border px-2 py-1 text-center text-xs text-gray-600"
                          value={colLabels[j]}
                          onChange={(e) => {
                            const newLabels = [...colLabels];
                            newLabels[j] = e.target.value;
                            setColLabels(newLabels);
                          }}
                          placeholder={j === 0 ? tc("afterPositive") : tc("afterNegative")}
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
                          className="w-28 rounded border px-2 py-1 text-center text-xs text-gray-600"
                          value={rowLabels[i]}
                          onChange={(e) => {
                            const newLabels = [...rowLabels];
                            newLabels[i] = e.target.value;
                            setRowLabels(newLabels);
                          }}
                          placeholder={i === 0 ? tc("beforePositive") : tc("beforeNegative")}
                        />
                      </td>
                      {[0, 1].map((j) => (
                        <td key={j} className="px-1 py-1">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            className={`w-20 rounded border px-2 py-1 text-center text-sm ${
                              (i === 0 && j === 1) || (i === 1 && j === 0)
                                ? "border-orange-300 bg-orange-50"
                                : ""
                            }`}
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
            <p className="text-xs text-gray-500">
              {tc("discordantHint")}
            </p>
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
          {result && <ShareButton url={shareUrl} testName="mcnemar" />}
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

export function McNemarCalculator() {
  return (
    <Suspense>
      <McNemarCalculatorInner />
    </Suspense>
  );
}

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
import { Separator } from "@/components/ui/separator";
import {
  kruskalWallis,
  formatKruskalWallisAPA,
  formatPValue,
  type KruskalWallisResult,
} from "@/lib/statistics/kruskal-wallis";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample, trackCopyResult } from "@/lib/analytics";
import { parseNumbers } from "@/lib/utils/parse";
import { DataTextarea } from "@/components/data-textarea";
import { GroupBoxplot } from "@/components/charts/group-boxplot";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeAnova, decodeAnova, useShareUrl, useUrlParams } from "@/lib/url-params";

function ResultsDisplay({ result, groupsData }: { result: KruskalWallisResult; groupsData: { label: string; values: number[] }[] }) {
  const t = useTranslations("calculator");
  const tk = useTranslations("kruskalWallis");
  const apa = formatKruskalWallisAPA(result);
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
            <em>H</em>({result.df}) ={" "}
            {result.hStatistic.toFixed(2)}, <em>p</em>{" "}
            {formatPValue(result.pValue)}, <em>&eta;&sup2;</em><sub>H</sub> ={" "}
            {result.etaSquaredH.toFixed(2)}
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
              <span className="text-gray-500">{tk("hStatistic")}</span>
              <p className="font-medium">{result.hStatistic.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">df</span>
              <p className="font-medium">{result.df}</p>
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
              <span className="text-gray-500">{tk("etaSquaredH")}</span>
              <p className="font-medium">{result.etaSquaredH.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">
                {tk("effectSize")}
              </span>
              <p className="font-medium">
                <Badge
                  variant="secondary"
                  className={
                    result.effectSizeLabel === "large"
                      ? "bg-red-100 text-red-800"
                      : result.effectSizeLabel === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : result.effectSizeLabel === "small"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                  }
                >
                  {result.effectSizeLabel}
                </Badge>
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            {t("groupStats")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{t("group")}</th>
                  <th className="py-2 text-right font-semibold"><em>N</em></th>
                  <th className="py-2 text-right font-semibold"><em>Mdn</em></th>
                  <th className="py-2 text-right font-semibold">{tk("meanRank")}</th>
                </tr>
              </thead>
              <tbody>
                {result.groupStats.map((g, i) => (
                  <tr key={i} className={i === result.groupStats.length - 1 ? "border-b-2 border-gray-900" : ""}>
                    <td className="py-1.5">{g.name}</td>
                    <td className="py-1.5 text-right">{g.n}</td>
                    <td className="py-1.5 text-right">{g.median.toFixed(2)}</td>
                    <td className="py-1.5 text-right">{g.meanRank.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result.postHoc.length > 0 && (
            <>
              <Separator className="my-4" />
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                {tk("postHocTitle")}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-t-2 border-gray-900">
                      <th className="py-2 text-left font-semibold">{tk("comparison")}</th>
                      <th className="py-2 text-right font-semibold"><em>z</em></th>
                      <th className="py-2 text-right font-semibold"><em>p</em></th>
                      <th className="py-2 text-right font-semibold">{tk("sig")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.postHoc.map((ph, i) => (
                      <tr key={i} className={i === result.postHoc.length - 1 ? "border-b-2 border-gray-900" : ""}>
                        <td className="py-1.5">{ph.group1} vs {ph.group2}</td>
                        <td className="py-1.5 text-right">{ph.z.toFixed(2)}</td>
                        <td className="py-1.5 text-right">
                          {ph.pValue < 0.001 ? "< .001" : ph.pValue.toFixed(3)}
                        </td>
                        <td className="py-1.5 text-right">
                          {ph.significant ? "*" : "ns"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")}</span>
            {result.etaSquaredH < 0.01
              ? t("negligibleEffect")
              : result.etaSquaredH < 0.06
                ? t("smallEffect")
                : result.etaSquaredH < 0.14
                  ? t("mediumEffect")
                  : t("largeEffect")}{" "}
            (<em>&eta;&sup2;</em><sub>H</sub> = {result.etaSquaredH.toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* Group Comparison Boxplot */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("groupComparison")}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <GroupBoxplot groups={groupsData} />
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="kruskal-wallis"
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
              const { exportKruskalWallisPdf } = await import("@/lib/export-pdf");
              const blob = exportKruskalWallisPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-kruskal-wallis-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* Export Button */}
      <ExportButton
        testName="kruskal-wallis"
        onExport={async () => {
          const { exportKruskalWallis, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportKruskalWallis(result);
          downloadBlob(blob, `statmate-kruskal-wallis-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function KruskalWallisCalculatorInner() {
  const t = useTranslations("calculator");
  const tk = useTranslations("kruskalWallis");
  const [numGroups, setNumGroups] = useState(3);
  const [groupInputs, setGroupInputs] = useState<string[]>(["", "", ""]);
  const [groupNames, setGroupNames] = useState<string[]>([tk("groupLabel", { n: 1 }), tk("groupLabel", { n: 2 }), tk("groupLabel", { n: 3 })]);
  const [result, setResult] = useState<KruskalWallisResult | null>(null);
  const [parsedGroups, setParsedGroups] = useState<{ label: string; values: number[] }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading (reuse ANOVA encoder since same structure)
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeAnova(searchParams);
    if (state) {
      setNumGroups(state.numGroups);
      setGroupInputs(state.groupInputs);
      setGroupNames(state.groupNames);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, groupInputs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl("kruskal-wallis", result ? encodeAnova({ numGroups, groupInputs, groupNames }) : {});

  function handleGroupCountChange(n: number) {
    setNumGroups(n);
    setGroupInputs((prev) => {
      const next = [...prev];
      while (next.length < n) next.push("");
      return next.slice(0, n);
    });
    setGroupNames((prev) => {
      const next = [...prev];
      while (next.length < n) next.push(tk("groupLabel", { n: next.length + 1 }));
      return next.slice(0, n);
    });
    setResult(null);
  }

  function handleCalculate() {
    setError(null);
    setResult(null);
    const groups = groupInputs.map((input) => parseNumbers(input));
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].length < 2) {
        setError(tk("groupMinValues", { name: groupNames[i] }));
        return;
      }
    }
    try {
      setResult(kruskalWallis(groups, groupNames));
      setParsedGroups(groups.map((g, i) => ({ label: groupNames[i], values: g })));
      trackCalculate("kruskal-wallis");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setGroupInputs(Array(numGroups).fill(""));
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("kruskal-wallis");
    setNumGroups(3);
    setGroupNames([tk("groupLabel", { n: 1 }), tk("groupLabel", { n: 2 }), tk("groupLabel", { n: 3 })]);
    setGroupInputs([
      "12, 15, 18, 14, 16, 13, 17",
      "22, 25, 20, 28, 24, 26, 21",
      "8, 11, 9, 13, 10, 7, 12",
    ]);
    setScenario(tk("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{tk("title")}</CardTitle>
            <CardDescription>
              {tk("description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{tk("numGroups")}</Label>
              <select
                className="ml-2 rounded border px-2 py-1 text-sm"
                value={numGroups}
                onChange={(e) => handleGroupCountChange(Number(e.target.value))}
              >
                {[3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            {Array.from({ length: numGroups }, (_, i) => (
              <div key={i}>
                <div className="mb-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={groupNames[i]}
                    onChange={(e) => {
                      const names = [...groupNames];
                      names[i] = e.target.value;
                      setGroupNames(names);
                    }}
                    className="w-24 border-b border-gray-300 bg-transparent text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <DataTextarea
                  id={`group-${i}`}
                  label=""
                  placeholder="e.g., 12, 15, 18, 14, 16"
                  rows={2}
                  value={groupInputs[i]}
                  onChange={(val) => {
                    const inputs = [...groupInputs];
                    inputs[i] = val;
                    setGroupInputs(inputs);
                  }}
                />
              </div>
            ))}
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
          {result && <ShareButton url={shareUrl} testName="kruskal-wallis" />}
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} groupsData={parsedGroups} />
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

export function KruskalWallisCalculator() {
  return (
    <Suspense>
      <KruskalWallisCalculatorInner />
    </Suspense>
  );
}

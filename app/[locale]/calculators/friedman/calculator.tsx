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
  friedmanTest,
  formatFriedmanAPA,
  formatPValue,
  type FriedmanResult,
} from "@/lib/statistics/friedman";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";
import { parseNumbers } from "@/lib/utils/parse";
import { DataTextarea } from "@/components/data-textarea";
import { GroupBoxplot } from "@/components/charts/group-boxplot";
import { AssumptionChecks } from "@/components/assumption-checks";
import { ShareButton } from "@/components/share-button";
import { ExampleScenario } from "@/components/example-scenario";
import { encodeAnova, decodeAnova, useShareUrl, useUrlParams } from "@/lib/url-params";

function ResultsDisplay({ result, groupsData }: { result: FriedmanResult; groupsData: { label: string; values: number[] }[] }) {
  const t = useTranslations("calculator");
  const tf = useTranslations("friedman");
  const apa = formatFriedmanAPA(result);
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
            <em>&chi;&sup2;</em>({result.df}) ={" "}
            {result.chiSquare.toFixed(2)}, <em>p</em>{" "}
            {formatPValue(result.pValue)}, <em>W</em> ={" "}
            {result.kendallW.toFixed(2)}
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
              <span className="text-gray-500">{tf("chiSquare")}</span>
              <p className="font-medium">{result.chiSquare.toFixed(4)}</p>
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
              <span className="text-gray-500">{tf("kendallW")}</span>
              <p className="font-medium">{result.kendallW.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{tf("numSubjects")}</span>
              <p className="font-medium">{result.n}</p>
            </div>
            <div>
              <span className="text-gray-500">{tf("numConditions")}</span>
              <p className="font-medium">{result.k}</p>
            </div>
            <div>
              <span className="text-gray-500">
                {tf("effectSize")}
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
            {tf("conditionStats")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{tf("condition")}</th>
                  <th className="py-2 text-right font-semibold"><em>N</em></th>
                  <th className="py-2 text-right font-semibold"><em>Mdn</em></th>
                  <th className="py-2 text-right font-semibold">{tf("meanRank")}</th>
                </tr>
              </thead>
              <tbody>
                {result.conditionStats.map((c, i) => (
                  <tr key={i} className={i === result.conditionStats.length - 1 ? "border-b-2 border-gray-900" : ""}>
                    <td className="py-1.5">{c.name}</td>
                    <td className="py-1.5 text-right">{c.n}</td>
                    <td className="py-1.5 text-right">{c.median.toFixed(2)}</td>
                    <td className="py-1.5 text-right">{c.meanRank.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result.postHoc.length > 0 && (
            <>
              <Separator className="my-4" />
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                {tf("postHocTitle")}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-t-2 border-gray-900">
                      <th className="py-2 text-left font-semibold">{tf("comparison")}</th>
                      <th className="py-2 text-right font-semibold"><em>z</em></th>
                      <th className="py-2 text-right font-semibold"><em>p</em></th>
                      <th className="py-2 text-right font-semibold">{tf("sig")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.postHoc.map((ph, i) => (
                      <tr key={i} className={i === result.postHoc.length - 1 ? "border-b-2 border-gray-900" : ""}>
                        <td className="py-1.5">{ph.condition1} vs {ph.condition2}</td>
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
            {result.kendallW < 0.1
              ? t("negligibleEffect")
              : result.kendallW < 0.3
                ? t("smallEffect")
                : result.kendallW < 0.5
                  ? t("mediumEffect")
                  : t("largeEffect")}{" "}
            (Kendall&apos;s <em>W</em> = {result.kendallW.toFixed(2)})
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

      {/* Assumption Checks */}
      <AssumptionChecks testType="friedman" groups={groupsData.map(g => g.values)} />

      {/* AI Interpretation */}
      <AiInterpretation
        testType="friedman"
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
              const { exportFriedmanPdf } = await import("@/lib/export-pdf");
              const blob = exportFriedmanPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-friedman-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* Export Button */}
      <ExportButton
        testName="friedman"
        onExport={async () => {
          const { exportFriedman, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportFriedman(result);
          downloadBlob(blob, `statmate-friedman-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function FriedmanCalculatorInner() {
  const t = useTranslations("calculator");
  const tf = useTranslations("friedman");
  const [numConditions, setNumConditions] = useState(3);
  const [conditionInputs, setConditionInputs] = useState<string[]>(["", "", ""]);
  const [conditionNames, setConditionNames] = useState<string[]>([tf("conditionLabel", { n: 1 }), tf("conditionLabel", { n: 2 }), tf("conditionLabel", { n: 3 })]);
  const [result, setResult] = useState<FriedmanResult | null>(null);
  const [parsedGroups, setParsedGroups] = useState<{ label: string; values: number[] }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading (reuse ANOVA encoder since same multi-group structure)
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeAnova(searchParams);
    if (state) {
      setNumConditions(state.numGroups);
      setConditionInputs(state.groupInputs);
      setConditionNames(state.groupNames);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, conditionInputs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl("friedman", result ? encodeAnova({ numGroups: numConditions, groupInputs: conditionInputs, groupNames: conditionNames }) : {});

  function handleConditionCountChange(n: number) {
    setNumConditions(n);
    setConditionInputs((prev) => {
      const next = [...prev];
      while (next.length < n) next.push("");
      return next.slice(0, n);
    });
    setConditionNames((prev) => {
      const next = [...prev];
      while (next.length < n) next.push(tf("conditionLabel", { n: next.length + 1 }));
      return next.slice(0, n);
    });
    setResult(null);
  }

  function handleCalculate() {
    setError(null);
    setResult(null);
    const conditions = conditionInputs.map((input) => parseNumbers(input));

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i].length < 3) {
        setError(tf("conditionMinValues", { name: conditionNames[i] }));
        return;
      }
    }

    // Check equal lengths
    const n = conditions[0].length;
    for (let i = 1; i < conditions.length; i++) {
      if (conditions[i].length !== n) {
        setError(tf("errorEqualLength"));
        return;
      }
    }

    try {
      setResult(friedmanTest(conditions, conditionNames));
      setParsedGroups(conditions.map((c, i) => ({ label: conditionNames[i], values: c })));
      trackCalculate("friedman");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setConditionInputs(Array(numConditions).fill(""));
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("friedman");
    setNumConditions(3);
    setConditionNames([tf("conditionLabel", { n: 1 }), tf("conditionLabel", { n: 2 }), tf("conditionLabel", { n: 3 })]);
    setConditionInputs([
      "72, 85, 91, 68, 77, 83, 95, 88, 74, 79",
      "78, 89, 95, 73, 82, 87, 98, 92, 79, 83",
      "82, 93, 99, 78, 86, 91, 102, 96, 84, 88",
    ]);
    setScenario(tf("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{tf("title")}</CardTitle>
            <CardDescription>
              {tf("description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{tf("numConditions")}</Label>
              <select
                className="ml-2 rounded border px-2 py-1 text-sm"
                value={numConditions}
                onChange={(e) => handleConditionCountChange(Number(e.target.value))}
              >
                {[3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            {Array.from({ length: numConditions }, (_, i) => (
              <div key={i}>
                <div className="mb-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={conditionNames[i]}
                    onChange={(e) => {
                      const names = [...conditionNames];
                      names[i] = e.target.value;
                      setConditionNames(names);
                    }}
                    className="w-24 border-b border-gray-300 bg-transparent text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <DataTextarea
                  id={`condition-${i}`}
                  label=""
                  placeholder="e.g., 72, 85, 91, 68, 77"
                  rows={2}
                  value={conditionInputs[i]}
                  onChange={(val) => {
                    const inputs = [...conditionInputs];
                    inputs[i] = val;
                    setConditionInputs(inputs);
                  }}
                />
              </div>
            ))}
            <p className="text-xs text-gray-500">
              {tf("pairedNote")}
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
          <Button onClick={handleCalculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={handleExample}>{t("loadExample")}</Button>
          <Button variant="outline" onClick={handleClear}>{t("clear")}</Button>
          {result && <ShareButton url={shareUrl} testName="friedman" />}
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

export function FriedmanCalculator() {
  return (
    <Suspense>
      <FriedmanCalculatorInner />
    </Suspense>
  );
}

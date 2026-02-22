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
  repeatedMeasuresAnova,
  formatRepeatedMeasuresAPA,
  formatPValue,
  type RepeatedMeasuresResult,
} from "@/lib/statistics/repeated-measures";
import {
  AiInterpretation,
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
import { useShareUrl, useUrlParams } from "@/lib/url-params";

// --- URL encode/decode for Repeated Measures (defined in calculator file) ---
type ParamMap = Record<string, string>;

export function encodeRepeatedMeasures(state: {
  numConditions: number;
  conditionInputs: string[];
  conditionNames: string[];
}): ParamMap {
  const m: ParamMap = { k: String(state.numConditions) };
  for (let i = 0; i < state.numConditions; i++) {
    if (state.conditionNames[i]) m[`n${i}`] = state.conditionNames[i];
    if (state.conditionInputs[i]) m[`c${i}`] = state.conditionInputs[i].replace(/\s+/g, "");
  }
  return m;
}

export function decodeRepeatedMeasures(p: URLSearchParams) {
  const k = parseInt(p.get("k") ?? "0");
  if (k < 2) return null;
  const conditionInputs: string[] = [];
  const conditionNames: string[] = [];
  for (let i = 0; i < k; i++) {
    conditionInputs.push(p.get(`c${i}`) ?? "");
    conditionNames.push(p.get(`n${i}`) ?? `Condition ${i + 1}`);
  }
  return { numConditions: k, conditionInputs, conditionNames };
}

function ResultsDisplay({
  result,
  groupsData,
}: {
  result: RepeatedMeasuresResult;
  groupsData: { label: string; values: number[] }[];
}) {
  const t = useTranslations("calculator");
  const tr = useTranslations("repeatedMeasures");
  const apa = formatRepeatedMeasuresAPA(result);
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
            {result.correctedF ? (
              <>
                <em>F</em>({result.correctedF.df1.toFixed(2)},{" "}
                {result.correctedF.df2.toFixed(2)}) ={" "}
                {result.fStatistic.toFixed(2)}, <em>p</em>{" "}
                {formatPValue(result.correctedF.p)},{" "}
                <em>&eta;&sup2;<sub>p</sub></em> ={" "}
                {result.partialEtaSquared.toFixed(2)}{" "}
                <span className="text-sm">(GG {tr("corrected")})</span>
              </>
            ) : (
              <>
                <em>F</em>({result.dfConditions}, {result.dfError}) ={" "}
                {result.fStatistic.toFixed(2)}, <em>p</em>{" "}
                {formatPValue(result.pValue)},{" "}
                <em>&eta;&sup2;<sub>p</sub></em> ={" "}
                {result.partialEtaSquared.toFixed(2)}
              </>
            )}
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

      {/* Sphericity Test */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tr("sphericityTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{tr("mauchlyW")}</span>
              <p className="font-medium">{result.sphericity.mauchlyW.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">&chi;&sup2;</span>
              <p className="font-medium">{result.sphericity.chiSquare.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500"><em>p</em></span>
              <p className="font-medium">
                {result.sphericity.p < 0.001
                  ? "< .001"
                  : result.sphericity.p.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{tr("ggEpsilon")}</span>
              <p className="font-medium">{result.sphericity.ggEpsilon.toFixed(4)}</p>
            </div>
          </div>
          <div className="mt-3 rounded-md bg-gray-50 p-3 text-sm">
            {result.sphericity.violated ? (
              <span className="text-amber-700">
                {tr("sphericityViolated")}
              </span>
            ) : (
              <span className="text-green-700">
                {tr("sphericityMet")}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ANOVA Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tr("anovaTable")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{tr("source")}</th>
                  <th className="py-2 text-right font-semibold">SS</th>
                  <th className="py-2 text-right font-semibold">df</th>
                  <th className="py-2 text-right font-semibold">MS</th>
                  <th className="py-2 text-right font-semibold"><em>F</em></th>
                  <th className="py-2 text-right font-semibold"><em>p</em></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5">{tr("conditions")}</td>
                  <td className="py-1.5 text-right">{result.ssConditions.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.dfConditions}</td>
                  <td className="py-1.5 text-right">{result.msConditions.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.fStatistic.toFixed(2)}</td>
                  <td className="py-1.5 text-right">
                    {result.pValue < 0.001 ? "< .001" : result.pValue.toFixed(3)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5">{tr("subjects")}</td>
                  <td className="py-1.5 text-right">{result.ssSubjects.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.conditionStats[0]?.n ? result.conditionStats[0].n - 1 : 0}</td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="py-1.5">{tr("error")}</td>
                  <td className="py-1.5 text-right">{result.ssError.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.dfError}</td>
                  <td className="py-1.5 text-right">{result.msError.toFixed(2)}</td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                </tr>
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5 font-semibold">{tr("total")}</td>
                  <td className="py-1.5 text-right">{result.ssTotal.toFixed(2)}</td>
                  <td className="py-1.5 text-right">
                    {result.dfConditions + (result.conditionStats[0]?.n ? result.conditionStats[0].n - 1 : 0) + result.dfError}
                  </td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-4" />

          {/* Condition Statistics */}
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            {tr("conditionStats")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{tr("condition")}</th>
                  <th className="py-2 text-right font-semibold"><em>N</em></th>
                  <th className="py-2 text-right font-semibold"><em>M</em></th>
                  <th className="py-2 text-right font-semibold"><em>SD</em></th>
                </tr>
              </thead>
              <tbody>
                {result.conditionStats.map((cs, i) => (
                  <tr
                    key={i}
                    className={
                      i === result.conditionStats.length - 1
                        ? "border-b-2 border-gray-900"
                        : ""
                    }
                  >
                    <td className="py-1.5">{cs.name}</td>
                    <td className="py-1.5 text-right">{cs.n}</td>
                    <td className="py-1.5 text-right">{cs.mean.toFixed(2)}</td>
                    <td className="py-1.5 text-right">{cs.sd.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Post-hoc Comparisons */}
          {result.postHoc.length > 0 && (
            <>
              <Separator className="my-4" />
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                {tr("postHocTitle")}
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-t-2 border-gray-900">
                      <th className="py-2 text-left font-semibold">{tr("comparison")}</th>
                      <th className="py-2 text-right font-semibold">{tr("meanDiff")}</th>
                      <th className="py-2 text-right font-semibold"><em>t</em></th>
                      <th className="py-2 text-right font-semibold"><em>p</em></th>
                      <th className="py-2 text-right font-semibold">{tr("sig")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.postHoc.map((ph, i) => (
                      <tr
                        key={i}
                        className={
                          i === result.postHoc.length - 1
                            ? "border-b-2 border-gray-900"
                            : ""
                        }
                      >
                        <td className="py-1.5">
                          {ph.condition1} vs {ph.condition2}
                        </td>
                        <td className="py-1.5 text-right">
                          {ph.meanDiff.toFixed(2)}
                        </td>
                        <td className="py-1.5 text-right">
                          {ph.tValue.toFixed(2)}
                        </td>
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

          {/* Effect Size Interpretation */}
          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")}</span>
            {result.effectSizeLabel === "negligible"
              ? t("negligibleEffect")
              : result.effectSizeLabel === "small"
                ? t("smallEffect")
                : result.effectSizeLabel === "medium"
                  ? t("mediumEffect")
                  : t("largeEffect")}{" "}
            (<em>&eta;&sup2;<sub>p</sub></em> = {result.partialEtaSquared.toFixed(2)})
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
      <AssumptionChecks testType="repeated-measures" groups={groupsData.map((g) => g.values)} />

      {/* AI Interpretation */}
      <AiInterpretation
        testType="anova"
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
              const { exportRepeatedMeasuresPdf } = await import("@/lib/export-pdf");
              const blob = exportRepeatedMeasuresPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-repeated-measures-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function RepeatedMeasuresCalculatorInner() {
  const t = useTranslations("calculator");
  const tr = useTranslations("repeatedMeasures");
  const [numConditions, setNumConditions] = useState(3);
  const [conditionInputs, setConditionInputs] = useState<string[]>(["", "", ""]);
  const [conditionNames, setConditionNames] = useState<string[]>([
    tr("condLabel", { n: 1 }),
    tr("condLabel", { n: 2 }),
    tr("condLabel", { n: 3 }),
  ]);
  const [result, setResult] = useState<RepeatedMeasuresResult | null>(null);
  const [groupsData, setGroupsData] = useState<{ label: string; values: number[] }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeRepeatedMeasures(searchParams);
    if (state) {
      setNumConditions(state.numConditions);
      setConditionInputs(state.conditionInputs);
      setConditionNames(state.conditionNames);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleConditionCountChange(n: number) {
    setNumConditions(n);
    setConditionInputs((prev) => {
      const next = [...prev];
      while (next.length < n) next.push("");
      return next.slice(0, n);
    });
    setConditionNames((prev) => {
      const next = [...prev];
      while (next.length < n)
        next.push(tr("condLabel", { n: next.length + 1 }));
      return next.slice(0, n);
    });
    setResult(null);
  }

  function handleCalculate() {
    setError(null);
    setResult(null);

    const conditions = conditionInputs.map((input) => parseNumbers(input));

    // Validate: each condition must have at least 3 values
    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i].length < 3) {
        setError(tr("condMinValues", { name: conditionNames[i] }));
        return;
      }
    }

    // Validate: all conditions must have the same number of values (subjects)
    const nSubjects = conditions[0].length;
    for (let i = 1; i < conditions.length; i++) {
      if (conditions[i].length !== nSubjects) {
        setError(tr("equalLengthError"));
        return;
      }
    }

    try {
      const r = repeatedMeasuresAnova(conditions, conditionNames);
      setResult(r);
      setGroupsData(
        conditions.map((c, i) => ({
          label: conditionNames[i],
          values: c,
        }))
      );
      trackCalculate("repeated-measures");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  useEffect(() => {
    if (autoCalc) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, conditionInputs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl(
    "repeated-measures",
    result
      ? encodeRepeatedMeasures({ numConditions, conditionInputs, conditionNames })
      : {}
  );

  function handleClear() {
    setConditionInputs(Array(numConditions).fill(""));
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("repeated-measures");
    setNumConditions(3);
    setConditionNames([
      tr("condLabel", { n: 1 }),
      tr("condLabel", { n: 2 }),
      tr("condLabel", { n: 3 }),
    ]);
    setConditionInputs([
      "45, 52, 48, 55, 50, 47, 53, 49",
      "58, 65, 62, 68, 63, 60, 66, 61",
      "70, 78, 74, 80, 75, 72, 79, 73",
    ]);
    setScenario(tr("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{tr("title")}</CardTitle>
            <CardDescription>{tr("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{tr("numConditions")}</Label>
              <select
                className="ml-2 rounded border px-2 py-1 text-sm"
                value={numConditions}
                onChange={(e) =>
                  handleConditionCountChange(Number(e.target.value))
                }
              >
                {[3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
              {tr("sameSubjectsNote")}
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
                    className="w-28 border-b border-gray-300 bg-transparent text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <DataTextarea
                  id={`condition-${i}`}
                  label=""
                  placeholder="e.g., 45, 52, 48, 55, 50"
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
            <ShareButton url={shareUrl} testName="repeated-measures" />
          )}
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} groupsData={groupsData} />
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

export function RepeatedMeasuresCalculator() {
  return (
    <Suspense>
      <RepeatedMeasuresCalculatorInner />
    </Suspense>
  );
}

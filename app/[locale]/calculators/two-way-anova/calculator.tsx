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
  twoWayAnova,
  formatTwoWayAnovaAPA,
  formatPValue,
  type TwoWayAnovaResult,
  type EffectResult,
} from "@/lib/statistics/two-way-anova";
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
import { useShareUrl, useUrlParams } from "@/lib/url-params";

// --- URL encode/decode for Two-Way ANOVA (defined in calculator file) ---
type ParamMap = Record<string, string>;

export function encodeTwoWayAnova(state: {
  levelsA: number;
  levelsB: number;
  factorAName: string;
  factorBName: string;
  levelANames: string[];
  levelBNames: string[];
  cellInputs: string[][];
}): ParamMap {
  const m: ParamMap = {
    a: String(state.levelsA),
    b: String(state.levelsB),
    fa: state.factorAName,
    fb: state.factorBName,
  };
  for (let i = 0; i < state.levelsA; i++) {
    m[`an${i}`] = state.levelANames[i] || "";
  }
  for (let j = 0; j < state.levelsB; j++) {
    m[`bn${j}`] = state.levelBNames[j] || "";
  }
  for (let i = 0; i < state.levelsA; i++) {
    for (let j = 0; j < state.levelsB; j++) {
      const val = state.cellInputs[i]?.[j] || "";
      if (val) m[`c${i}_${j}`] = val.replace(/\s+/g, "");
    }
  }
  return m;
}

export function decodeTwoWayAnova(p: URLSearchParams) {
  const aStr = p.get("a"), bStr = p.get("b");
  if (!aStr || !bStr) return null;
  const levelsA = parseInt(aStr), levelsB = parseInt(bStr);
  if (levelsA < 2 || levelsB < 2) return null;
  const factorAName = p.get("fa") || "Factor A";
  const factorBName = p.get("fb") || "Factor B";
  const levelANames: string[] = [];
  const levelBNames: string[] = [];
  for (let i = 0; i < levelsA; i++) {
    levelANames.push(p.get(`an${i}`) || `A${i + 1}`);
  }
  for (let j = 0; j < levelsB; j++) {
    levelBNames.push(p.get(`bn${j}`) || `B${j + 1}`);
  }
  const cellInputs: string[][] = [];
  for (let i = 0; i < levelsA; i++) {
    cellInputs[i] = [];
    for (let j = 0; j < levelsB; j++) {
      cellInputs[i][j] = p.get(`c${i}_${j}`) || "";
    }
  }
  return { levelsA, levelsB, factorAName, factorBName, levelANames, levelBNames, cellInputs };
}

function EffectBadge({ label, significant }: { label: string; significant: boolean }) {
  const t = useTranslations("calculator");
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">{label}:</span>
      {significant ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          {t("significant")}
        </Badge>
      ) : (
        <Badge variant="secondary">
          {t("notSignificant")}
        </Badge>
      )}
    </div>
  );
}

function ResultsDisplay({
  result,
  factorAName,
  factorBName,
  groupsData,
}: {
  result: TwoWayAnovaResult;
  factorAName: string;
  factorBName: string;
  groupsData: { label: string; values: number[] }[];
}) {
  const t = useTranslations("calculator");
  const tw = useTranslations("twoWayAnova");
  const apa = formatTwoWayAnovaAPA(result, factorAName, factorBName);
  const { show, copy } = useCopyToast();

  const renderEffectRow = (label: string, e: EffectResult) => (
    <tr key={label}>
      <td className="py-1.5">{label}</td>
      <td className="py-1.5 text-right">{e.ss.toFixed(2)}</td>
      <td className="py-1.5 text-right">{e.df}</td>
      <td className="py-1.5 text-right">{e.ms.toFixed(2)}</td>
      <td className="py-1.5 text-right">{e.f.toFixed(2)}</td>
      <td className="py-1.5 text-right">
        {e.p < 0.001 ? "< .001" : e.p.toFixed(3)}
      </td>
      <td className="py-1.5 text-right">{e.etaSq.toFixed(3)}</td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <CopyToast show={show} />

      {/* APA Results */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            {t("apaResult")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 font-serif text-lg text-blue-900">
            <p>
              {factorAName}: <em>F</em>({result.factorA.df}, {result.residual.df}) ={" "}
              {result.factorA.f.toFixed(2)}, <em>p</em>{" "}
              {formatPValue(result.factorA.p)}, <em>&eta;&sup2;<sub>p</sub></em> ={" "}
              {result.factorA.etaSq.toFixed(2)}
            </p>
            <p>
              {factorBName}: <em>F</em>({result.factorB.df}, {result.residual.df}) ={" "}
              {result.factorB.f.toFixed(2)}, <em>p</em>{" "}
              {formatPValue(result.factorB.p)}, <em>&eta;&sup2;<sub>p</sub></em> ={" "}
              {result.factorB.etaSq.toFixed(2)}
            </p>
            <p>
              {factorAName} &times; {factorBName}: <em>F</em>({result.interaction.df},{" "}
              {result.residual.df}) = {result.interaction.f.toFixed(2)}, <em>p</em>{" "}
              {formatPValue(result.interaction.p)}, <em>&eta;&sup2;<sub>p</sub></em> ={" "}
              {result.interaction.etaSq.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => copy(apa)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            {t("copyToClipboard")}
          </button>
        </CardContent>
      </Card>

      {/* Significance Badges */}
      <div className="flex flex-wrap gap-4">
        <EffectBadge label={factorAName} significant={result.significant_A} />
        <EffectBadge label={factorBName} significant={result.significant_B} />
        <EffectBadge
          label={`${factorAName} \u00D7 ${factorBName}`}
          significant={result.significant_AB}
        />
      </div>

      {/* ANOVA Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tw("anovaTable")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-xs text-gray-400 sm:hidden">&larr; Scroll to see all columns &rarr;</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{tw("source")}</th>
                  <th className="py-2 text-right font-semibold">SS</th>
                  <th className="py-2 text-right font-semibold">df</th>
                  <th className="py-2 text-right font-semibold">MS</th>
                  <th className="py-2 text-right font-semibold"><em>F</em></th>
                  <th className="py-2 text-right font-semibold"><em>p</em></th>
                  <th className="py-2 text-right font-semibold"><em>&eta;&sup2;<sub>p</sub></em></th>
                </tr>
              </thead>
              <tbody>
                {renderEffectRow(factorAName, result.factorA)}
                {renderEffectRow(factorBName, result.factorB)}
                {renderEffectRow(`${factorAName} \u00D7 ${factorBName}`, result.interaction)}
                <tr>
                  <td className="py-1.5">{tw("residual")}</td>
                  <td className="py-1.5 text-right">{result.residual.ss.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.residual.df}</td>
                  <td className="py-1.5 text-right">{result.residual.ms.toFixed(2)}</td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                </tr>
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5 font-semibold">{tw("total")}</td>
                  <td className="py-1.5 text-right">{result.total.ss.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.total.df}</td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-4" />

          {/* Cell Means Table */}
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            {tw("cellMeans")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{factorAName}</th>
                  <th className="py-2 text-left font-semibold">{factorBName}</th>
                  <th className="py-2 text-right font-semibold"><em>N</em></th>
                  <th className="py-2 text-right font-semibold"><em>M</em></th>
                  <th className="py-2 text-right font-semibold"><em>SD</em></th>
                </tr>
              </thead>
              <tbody>
                {result.cellStats.map((cell, i) => (
                  <tr
                    key={i}
                    className={
                      i === result.cellStats.length - 1
                        ? "border-b-2 border-gray-900"
                        : ""
                    }
                  >
                    <td className="py-1.5">{cell.factorA}</td>
                    <td className="py-1.5">{cell.factorB}</td>
                    <td className="py-1.5 text-right">{cell.n}</td>
                    <td className="py-1.5 text-right">{cell.mean.toFixed(2)}</td>
                    <td className="py-1.5 text-right">{cell.sd.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Effect size interpretation */}
          <div className="mt-4 space-y-1">
            {[
              { label: factorAName, eta: result.factorA.etaSq },
              { label: factorBName, eta: result.factorB.etaSq },
              { label: `${factorAName} \u00D7 ${factorBName}`, eta: result.interaction.etaSq },
            ].map(({ label, eta }) => (
              <div key={label} className="rounded-md bg-gray-50 p-3 text-sm">
                <span className="font-semibold">{label} {t("effectSizeLabel")}</span>
                {eta < 0.01
                  ? t("negligibleEffect")
                  : eta < 0.06
                    ? t("smallEffect")
                    : eta < 0.14
                      ? t("mediumEffect")
                      : t("largeEffect")}{" "}
                (<em>&eta;&sup2;<sub>p</sub></em> = {eta.toFixed(2)})
              </div>
            ))}
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
      <AssumptionChecks testType="anova" groups={groupsData.map((g) => g.values)} />

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
              const { exportTwoWayAnovaPdf } = await import("@/lib/export-pdf");
              const blob = exportTwoWayAnovaPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-two-way-anova-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* DOCX Export */}
      <ExportButton
        testName="two-way-anova"
        onExport={async () => {
          const { exportTwoWayAnova, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportTwoWayAnova(result);
          downloadBlob(blob, `statmate-two-way-anova-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function TwoWayAnovaCalculatorInner() {
  const t = useTranslations("calculator");
  const tw = useTranslations("twoWayAnova");
  const [levelsA, setLevelsA] = useState(2);
  const [levelsB, setLevelsB] = useState(2);
  const [factorAName, setFactorAName] = useState("Factor A");
  const [factorBName, setFactorBName] = useState("Factor B");
  const [levelANames, setLevelANames] = useState<string[]>(["A1", "A2"]);
  const [levelBNames, setLevelBNames] = useState<string[]>(["B1", "B2"]);
  const [cellInputs, setCellInputs] = useState<string[][]>(
    Array.from({ length: 2 }, () => Array(2).fill(""))
  );
  const [result, setResult] = useState<TwoWayAnovaResult | null>(null);
  const [groupsData, setGroupsData] = useState<{ label: string; values: number[] }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);
  const [inputCollapsed, setInputCollapsed] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeTwoWayAnova(searchParams);
    if (state) {
      setLevelsA(state.levelsA);
      setLevelsB(state.levelsB);
      setFactorAName(state.factorAName);
      setFactorBName(state.factorBName);
      setLevelANames(state.levelANames);
      setLevelBNames(state.levelBNames);
      setCellInputs(state.cellInputs);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCalculate() {
    setError(null);
    setResult(null);

    try {
      const data: number[][][] = [];
      const groups: { label: string; values: number[] }[] = [];

      for (let i = 0; i < levelsA; i++) {
        data[i] = [];
        for (let j = 0; j < levelsB; j++) {
          const values = parseNumbers(cellInputs[i]?.[j] || "");
          if (values.length < 2) {
            setError(tw("cellMinValues", { a: levelANames[i], b: levelBNames[j] }));
            return;
          }
          data[i][j] = values;
          groups.push({
            label: `${levelANames[i]}-${levelBNames[j]}`,
            values,
          });
        }
      }

      const r = twoWayAnova(data, levelANames.slice(0, levelsA), levelBNames.slice(0, levelsB));
      setResult(r);
      setGroupsData(groups);
      trackCalculate("two-way-anova");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  useEffect(() => {
    if (autoCalc) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, cellInputs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl(
    "two-way-anova",
    result
      ? encodeTwoWayAnova({ levelsA, levelsB, factorAName, factorBName, levelANames, levelBNames, cellInputs })
      : {}
  );

  function handleLevelsChange(newA: number, newB: number) {
    setLevelsA(newA);
    setLevelsB(newB);
    setCellInputs((prev) => {
      const next: string[][] = [];
      for (let i = 0; i < newA; i++) {
        next[i] = [];
        for (let j = 0; j < newB; j++) {
          next[i][j] = prev[i]?.[j] || "";
        }
      }
      return next;
    });
    setLevelANames((prev) => {
      const next = [...prev];
      while (next.length < newA) next.push(`A${next.length + 1}`);
      return next.slice(0, newA);
    });
    setLevelBNames((prev) => {
      const next = [...prev];
      while (next.length < newB) next.push(`B${next.length + 1}`);
      return next.slice(0, newB);
    });
    setResult(null);
  }

  function handleClear() {
    setCellInputs(Array.from({ length: levelsA }, () => Array(levelsB).fill("")));
    setResult(null);
    setError(null);
    setScenario(null);
    setInputCollapsed(false);
  }

  function handleExample() {
    trackLoadExample("two-way-anova");
    setLevelsA(2);
    setLevelsB(2);
    setFactorAName(tw("exFactorA"));
    setFactorBName(tw("exFactorB"));
    setLevelANames([tw("exA1"), tw("exA2")]);
    setLevelBNames([tw("exB1"), tw("exB2")]);
    setCellInputs([
      ["85, 90, 78, 92, 88", "70, 75, 68, 72, 74"],
      ["65, 70, 62, 68, 66", "55, 60, 52, 58, 56"],
    ]);
    setScenario(tw("exampleScenario"));
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{tw("title")}</CardTitle>
            <CardDescription>{tw("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Factor Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{tw("factorAName")}</Label>
                <input
                  type="text"
                  value={factorAName}
                  onChange={(e) => setFactorAName(e.target.value)}
                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                />
              </div>
              <div>
                <Label>{tw("factorBName")}</Label>
                <input
                  type="text"
                  value={factorBName}
                  onChange={(e) => setFactorBName(e.target.value)}
                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                />
              </div>
            </div>

            {/* Level counts */}
            <div className="flex gap-4">
              <div>
                <Label>{tw("levelsA")}</Label>
                <select
                  className="ml-2 rounded border px-2 py-1 text-sm"
                  value={levelsA}
                  onChange={(e) => handleLevelsChange(Number(e.target.value), levelsB)}
                >
                  {[2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>{tw("levelsB")}</Label>
                <select
                  className="ml-2 rounded border px-2 py-1 text-sm"
                  value={levelsB}
                  onChange={(e) => handleLevelsChange(levelsA, Number(e.target.value))}
                >
                  {[2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Level name inputs */}
            <div className="space-y-2">
              <Label>{tw("levelANames")}</Label>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: levelsA }, (_, i) => (
                  <input
                    key={i}
                    type="text"
                    value={levelANames[i] || ""}
                    onChange={(e) => {
                      const names = [...levelANames];
                      names[i] = e.target.value;
                      setLevelANames(names);
                    }}
                    className="w-20 rounded border px-2 py-1 text-sm"
                    placeholder={`A${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{tw("levelBNames")}</Label>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: levelsB }, (_, j) => (
                  <input
                    key={j}
                    type="text"
                    value={levelBNames[j] || ""}
                    onChange={(e) => {
                      const names = [...levelBNames];
                      names[j] = e.target.value;
                      setLevelBNames(names);
                    }}
                    className="w-20 rounded border px-2 py-1 text-sm"
                    placeholder={`B${j + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Data grid - collapsible on mobile after calculation */}
            {result && inputCollapsed ? (
              <button
                type="button"
                onClick={() => setInputCollapsed(false)}
                className="w-full rounded-md border border-dashed border-gray-300 py-2 text-center text-sm text-gray-500 hover:bg-gray-50 sm:hidden"
              >
                {tw("showDataGrid")} ({levelsA} &times; {levelsB})
              </button>
            ) : null}
            <div className={result && inputCollapsed ? "hidden sm:block" : ""}>
              <div className="space-y-3">
                {Array.from({ length: levelsA }, (_, i) => (
                  <div key={i}>
                    {Array.from({ length: levelsB }, (_, j) => (
                      <div key={j} className="mb-2">
                        <DataTextarea
                          id={`cell-${i}-${j}`}
                          label={`${levelANames[i] || `A${i + 1}`} \u00D7 ${levelBNames[j] || `B${j + 1}`}`}
                          placeholder="e.g., 85, 90, 78, 92, 88"
                          rows={2}
                          value={cellInputs[i]?.[j] || ""}
                          onChange={(val) => {
                            const inputs = cellInputs.map((row) => [...row]);
                            if (!inputs[i]) inputs[i] = Array(levelsB).fill("");
                            inputs[i][j] = val;
                            setCellInputs(inputs);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {result && (
                <button
                  type="button"
                  onClick={() => setInputCollapsed(true)}
                  className="mt-2 w-full rounded-md border border-dashed border-gray-300 py-1.5 text-center text-xs text-gray-400 hover:bg-gray-50 sm:hidden"
                >
                  {tw("hideDataGrid")}
                </button>
              )}
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
          <Button onClick={handleCalculate} className="flex-1">{t("calculate")}</Button>
          <Button variant="outline" onClick={handleExample}>{t("loadExample")}</Button>
          <Button variant="outline" onClick={handleClear}>{t("clear")}</Button>
          {result && <ShareButton url={shareUrl} testName="two-way-anova" />}
        </div>
      </div>

      <div aria-live="polite">
        {result ? (
          <ResultsDisplay
            result={result}
            factorAName={factorAName}
            factorBName={factorBName}
            groupsData={groupsData}
          />
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

export function TwoWayAnovaCalculator() {
  return (
    <Suspense>
      <TwoWayAnovaCalculatorInner />
    </Suspense>
  );
}

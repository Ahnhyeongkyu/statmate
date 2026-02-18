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
  independentTTest,
  pairedTTest,
  formatAPA,
  formatPValue,
  type TTestResult,
} from "@/lib/statistics/t-test";
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
import { encodeTTest, decodeTTest, useShareUrl, useUrlParams } from "@/lib/url-params";

function ResultsDisplay({ result, group1Data, group2Data }: { result: TTestResult; group1Data: number[]; group2Data: number[] }) {
  const t = useTranslations("calculator");
  const tt = useTranslations("ttest");
  const apa = formatAPA(result);
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
            <em>t</em>({result.type === "independent" ? result.df.toFixed(2) : result.df}) ={" "}
            {Math.abs(result.t).toFixed(2)}, <em>p</em>{" "}
            {formatPValue(result.pValue)}, <em>d</em> ={" "}
            {Math.abs(result.cohensD).toFixed(2)}
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

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("detailedResults")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{t("testType")}</span>
              <p className="font-medium">
                {result.type === "independent"
                  ? tt("independentWelchs")
                  : tt("pairedSamples")}
              </p>
            </div>
            <div>
              <span className="text-gray-500">
                {t("tStatistic")}
              </span>
              <p className="font-medium">{result.t.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{t("df")}</span>
              <p className="font-medium">
                {result.type === "independent"
                  ? result.df.toFixed(2)
                  : result.df}
              </p>
            </div>
            <div>
              <span className="text-gray-500">
                {t("pValue")}
              </span>
              <p className="font-medium">
                {result.pValue < 0.001
                  ? "< .001"
                  : result.pValue.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{t("meanDiff")}</span>
              <p className="font-medium">{result.meanDiff.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Cohen&apos;s <em>d</em></span>
              <p className="font-medium">{result.cohensD.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">
                {t("ci95")}
              </span>
              <p className="font-medium">
                [{result.ci95[0].toFixed(4)}, {result.ci95[1].toFixed(4)}]
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Group Statistics */}
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            {t("groupStats")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">{t("group")}</th>
                  <th className="py-2 text-right font-semibold">
                    <em>N</em>
                  </th>
                  <th className="py-2 text-right font-semibold">
                    <em>M</em>
                  </th>
                  <th className="py-2 text-right font-semibold">
                    <em>SD</em>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5">{t("group")} 1</td>
                  <td className="py-1.5 text-right">
                    {result.group1Stats.n}
                  </td>
                  <td className="py-1.5 text-right">
                    {result.group1Stats.mean.toFixed(2)}
                  </td>
                  <td className="py-1.5 text-right">
                    {result.group1Stats.sd.toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5">{t("group")} 2</td>
                  <td className="py-1.5 text-right">
                    {result.group2Stats.n}
                  </td>
                  <td className="py-1.5 text-right">
                    {result.group2Stats.mean.toFixed(2)}
                  </td>
                  <td className="py-1.5 text-right">
                    {result.group2Stats.sd.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Effect Size Interpretation */}
          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")} </span>
            {Math.abs(result.cohensD) < 0.2
              ? t("negligibleEffect")
              : Math.abs(result.cohensD) < 0.5
                ? t("smallEffect")
                : Math.abs(result.cohensD) < 0.8
                  ? t("mediumEffect")
                  : t("largeEffect")}{" "}
            (Cohen&apos;s <em>d</em> = {Math.abs(result.cohensD).toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* Group Comparison Boxplot */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("groupComparison")}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <GroupBoxplot
            groups={[
              { label: `${t("group")} 1`, values: group1Data },
              { label: `${t("group")} 2`, values: group2Data },
            ]}
          />
        </CardContent>
      </Card>

      {/* Assumption Checks */}
      <AssumptionChecks testType="t-test" groups={[group1Data, group2Data]} />

      {/* AI Interpretation */}
      <AiInterpretation
        testType="t-test"
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
              const { exportTTestPdf } = await import("@/lib/export-pdf");
              const blob = exportTTestPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(blob, `statmate-ttest-${Date.now()}.pdf`);
            }}
          >
            {t("downloadPdf")}
          </Button>
        </CardContent>
      </Card>

      {/* Export Button */}
      <ExportButton
        testName="t-test"
        onExport={async () => {
          const { exportTTest, downloadBlob } = await import("@/lib/export-docx");
          const blob = await exportTTest(result);
          downloadBlob(blob, `statmate-ttest-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function TTestCalculatorInner() {
  const t = useTranslations("calculator");
  const tt = useTranslations("ttest");
  const [testType, setTestType] = useState<"independent" | "paired">(
    "independent"
  );
  const [group1Input, setGroup1Input] = useState("");
  const [group2Input, setGroup2Input] = useState("");
  const [result, setResult] = useState<TTestResult | null>(null);
  const [parsedG1, setParsedG1] = useState<number[]>([]);
  const [parsedG2, setParsedG2] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeTTest(searchParams);
    if (state) {
      setTestType(state.testType as "independent" | "paired");
      setGroup1Input(state.group1Input);
      setGroup2Input(state.group2Input);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc && group1Input && group2Input) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, group1Input, group2Input]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl("t-test", result ? encodeTTest({ testType, group1Input, group2Input }) : {});

  function handleCalculate() {
    setError(null);
    setResult(null);

    const g1 = parseNumbers(group1Input);
    const g2 = parseNumbers(group2Input);

    if (g1.length < 2) {
      setError(tt("errorGroup1Min"));
      return;
    }
    if (g2.length < 2) {
      setError(tt("errorGroup2Min"));
      return;
    }
    if (testType === "paired" && g1.length !== g2.length) {
      setError(tt("errorPairedEqual"));
      return;
    }

    try {
      const r =
        testType === "independent"
          ? independentTTest(g1, g2)
          : pairedTTest(g1, g2);
      setResult(r);
      setParsedG1(g1);
      setParsedG2(g2);
      trackCalculate("t-test");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setGroup1Input("");
    setGroup2Input("");
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("t-test");
    if (testType === "independent") {
      setGroup1Input("23, 25, 28, 22, 27, 24, 26, 29, 25, 23");
      setGroup2Input("19, 21, 18, 22, 20, 17, 23, 19, 21, 20");
      setScenario(tt("exampleScenario"));
    } else {
      setGroup1Input("85, 90, 78, 92, 88, 76, 95, 89, 84, 91");
      setGroup2Input("90, 95, 82, 96, 93, 80, 98, 94, 88, 95");
      setScenario(tt("exampleScenarioPaired"));
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <Tabs
          value={testType}
          onValueChange={(v) => {
            setTestType(v as "independent" | "paired");
            setResult(null);
            setError(null);
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="independent">{tt("independent")}</TabsTrigger>
            <TabsTrigger value="paired">{tt("paired")}</TabsTrigger>
          </TabsList>

          <TabsContent value="independent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {tt("independentTitle")}
                </CardTitle>
                <CardDescription>
                  {tt("independentDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DataTextarea
                  id="group1"
                  label={tt("group1")}
                  placeholder="e.g., 23, 25, 28, 22, 27"
                  value={group1Input}
                  onChange={setGroup1Input}
                />
                <DataTextarea
                  id="group2"
                  label={tt("group2")}
                  placeholder="e.g., 19, 21, 18, 22, 20"
                  value={group2Input}
                  onChange={setGroup2Input}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paired" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {tt("pairedTitle")}
                </CardTitle>
                <CardDescription>
                  {tt("pairedDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DataTextarea
                  id="pre"
                  label={tt("preTest")}
                  placeholder="e.g., 85, 90, 78, 92, 88"
                  value={group1Input}
                  onChange={setGroup1Input}
                />
                <DataTextarea
                  id="post"
                  label={tt("postTest")}
                  placeholder="e.g., 90, 95, 82, 96, 93"
                  value={group2Input}
                  onChange={setGroup2Input}
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
          <Button onClick={handleCalculate} className="flex-1">
            {t("calculate")}
          </Button>
          <Button variant="outline" onClick={handleExample}>
            {t("loadExample")}
          </Button>
          <Button variant="outline" onClick={handleClear}>
            {t("clear")}
          </Button>
          {result && <ShareButton url={shareUrl} testName="t-test" />}
        </div>
      </div>

      {/* Results Section */}
      <div aria-live="polite">
        {result ? (
          <ResultsDisplay result={result} group1Data={parsedG1} group2Data={parsedG2} />
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

export function TTestCalculator() {
  return (
    <Suspense>
      <TTestCalculatorInner />
    </Suspense>
  );
}

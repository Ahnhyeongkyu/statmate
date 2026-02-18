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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  logisticRegression,
  formatLogisticRegressionAPA,
  type LogisticRegressionResult,
} from "@/lib/statistics/logistic-regression";
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
  encodeLogisticRegression,
  decodeLogisticRegression,
  useShareUrl,
  useUrlParams,
} from "@/lib/url-params";

function formatPValue(p: number): string {
  if (p < 0.001) return "< .001";
  return p.toFixed(3).replace(/^0/, "");
}

function ResultsDisplay({ result }: { result: LogisticRegressionResult }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("logisticRegression");
  const apa = formatLogisticRegressionAPA(result);
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
            <em>&chi;</em>&sup2;({result.omnibusDf}) ={" "}
            {result.omnibusChiSq.toFixed(2)}, <em>p</em>{" "}
            {formatPValue(result.omnibusP)}, Nagelkerke <em>R</em>&sup2; ={" "}
            {result.nagelkerkeR2.toFixed(3)}
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
        {result.omnibusP < 0.05 ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {t("significant")}
          </Badge>
        ) : (
          <Badge variant="secondary">{t("notSignificant")}</Badge>
        )}
      </div>

      {/* Convergence Warning */}
      {!result.converged && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {ts("convergenceWarning")}
        </div>
      )}

      {/* Separation Warning */}
      {result.separationWarning && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          {ts("separationWarning")}
        </div>
      )}

      {/* Model Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("modelSummary")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{ts("omnibusChiSq")}</span>
              <p className="font-medium">
                <em>&chi;</em>&sup2;({result.omnibusDf}) ={" "}
                {result.omnibusChiSq.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{t("pValue")}</span>
              <p className="font-medium">
                {result.omnibusP < 0.001
                  ? "< .001"
                  : result.omnibusP.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{ts("neg2LL")}</span>
              <p className="font-medium">{result.neg2LL.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("neg2LLNull")}</span>
              <p className="font-medium">{result.neg2LLNull.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("coxSnellR2")}</span>
              <p className="font-medium">{result.coxSnellR2.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("nagelkerkeR2")}</span>
              <p className="font-medium">{result.nagelkerkeR2.toFixed(4)}</p>
            </div>
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
                  <th className="py-2 text-left font-semibold">{ts("variable")}</th>
                  <th className="py-2 text-right font-semibold">B</th>
                  <th className="py-2 text-right font-semibold">S.E.</th>
                  <th className="py-2 text-right font-semibold">Wald</th>
                  <th className="py-2 text-right font-semibold">df</th>
                  <th className="py-2 text-right font-semibold"><em>p</em></th>
                  <th className="py-2 text-right font-semibold">Exp(B)</th>
                  <th className="py-2 text-right font-semibold">{ts("ci95ExpB")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {result.coefficients.map((coef, i) => (
                  <tr key={i}>
                    <td className="py-2 text-left">{coef.name}</td>
                    <td className="py-2 text-right font-mono">
                      {coef.b.toFixed(4)}
                    </td>
                    <td className="py-2 text-right font-mono">
                      {coef.se.toFixed(4)}
                    </td>
                    <td className="py-2 text-right font-mono">
                      {coef.wald.toFixed(4)}
                    </td>
                    <td className="py-2 text-right">{coef.df}</td>
                    <td className="py-2 text-right font-mono">
                      {coef.p < 0.001 ? "< .001" : coef.p.toFixed(3)}
                    </td>
                    <td className="py-2 text-right font-mono">
                      {coef.expB.toFixed(4)}
                    </td>
                    <td className="py-2 text-right font-mono">
                      [{coef.expBCI95[0].toFixed(4)}, {coef.expBCI95[1].toFixed(4)}]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Classification Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("classificationTable")}</CardTitle>
          <CardDescription>{ts("classificationDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold" rowSpan={2}>
                    {ts("observed")}
                  </th>
                  <th className="py-2 text-center font-semibold" colSpan={2}>
                    {ts("predicted")}
                  </th>
                </tr>
                <tr className="border-b">
                  <th className="py-2 text-center font-semibold">0</th>
                  <th className="py-2 text-center font-semibold">1</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 font-medium">0</td>
                  <td className="py-2 text-center font-mono">
                    {result.classification.tn}
                  </td>
                  <td className="py-2 text-center font-mono">
                    {result.classification.fp}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">1</td>
                  <td className="py-2 text-center font-mono">
                    {result.classification.fn}
                  </td>
                  <td className="py-2 text-center font-mono">
                    {result.classification.tp}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{ts("sensitivity")}</span>
              <p className="font-medium">
                {(result.classification.sensitivity * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <span className="text-gray-500">{ts("specificity")}</span>
              <p className="font-medium">
                {(result.classification.specificity * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <span className="text-gray-500">{ts("overallAccuracy")}</span>
              <p className="font-medium">
                {(result.classification.accuracy * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hosmer-Lemeshow Test */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{ts("hosmerLemeshow")}</CardTitle>
          <CardDescription>{ts("hosmerLemeshowDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">
                <em>&chi;</em>&sup2;
              </span>
              <p className="font-medium">
                {result.hosmerLemeshowChiSq.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">df</span>
              <p className="font-medium">{result.hosmerLemeshowDf}</p>
            </div>
            <div>
              <span className="text-gray-500"><em>p</em></span>
              <p className="font-medium">
                {result.hosmerLemeshowP < 0.001
                  ? "< .001"
                  : result.hosmerLemeshowP.toFixed(4)}
              </p>
            </div>
          </div>
          <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
            {result.hosmerLemeshowP >= 0.05
              ? ts("hosmerGoodFit")
              : ts("hosmerPoorFit")}
          </div>
        </CardContent>
      </Card>

      {/* N summary */}
      <div className="rounded-md bg-gray-50 p-3 text-sm">
        <span className="font-semibold">
          <em>N</em> = {result.n}
        </span>
        {" | "}
        <span className="text-gray-500">
          {ts("predictors")}: {result.k}
        </span>
        {" | "}
        <span className="text-gray-500">
          {ts("iterations")}: {result.iterations}
        </span>
      </div>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="logistic-regression"
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
              const { exportLogisticRegressionPdf } = await import(
                "@/lib/export-pdf"
              );
              const blob = exportLogisticRegressionPdf(result, apa);
              const { downloadBlob } = await import("@/lib/export-docx");
              downloadBlob(
                blob,
                `statmate-logistic-regression-${Date.now()}.pdf`
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

function LogisticRegressionCalculatorInner() {
  const t = useTranslations("calculator");
  const ts = useTranslations("logisticRegression");
  const [yInput, setYInput] = useState("");
  const [xInputs, setXInputs] = useState<string[]>([""]);
  const [predictorNames, setPredictorNames] = useState<string[]>(["X1"]);
  const [result, setResult] = useState<LogisticRegressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  // URL param loading
  const searchParams = useUrlParams();
  useEffect(() => {
    if (!searchParams) return;
    const state = decodeLogisticRegression(searchParams);
    if (state) {
      setYInput(state.yInput);
      setXInputs(state.xInputs);
      setPredictorNames(state.predictorNames);
      setAutoCalc(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (autoCalc && yInput && xInputs.some((x) => x)) {
      handleCalculate();
      setAutoCalc(false);
    }
  }, [autoCalc, yInput, xInputs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Share URL
  const shareUrl = useShareUrl(
    "logistic-regression",
    result ? encodeLogisticRegression({ yInput, xInputs, predictorNames }) : {}
  );

  function addPredictor() {
    if (xInputs.length >= 10) return;
    setXInputs([...xInputs, ""]);
    setPredictorNames([...predictorNames, `X${xInputs.length + 1}`]);
  }

  function removePredictor(index: number) {
    if (xInputs.length <= 1) return;
    setXInputs(xInputs.filter((_, i) => i !== index));
    setPredictorNames(predictorNames.filter((_, i) => i !== index));
  }

  function updateXInput(index: number, value: string) {
    const newInputs = [...xInputs];
    newInputs[index] = value;
    setXInputs(newInputs);
  }

  function updatePredictorName(index: number, value: string) {
    const newNames = [...predictorNames];
    newNames[index] = value;
    setPredictorNames(newNames);
  }

  function handleCalculate() {
    setError(null);
    setResult(null);

    const y = parseNumbers(yInput);
    if (y.length < 5) {
      setError(ts("errorMinObs"));
      return;
    }

    const xs: number[][] = [];
    const names: string[] = [];
    for (let i = 0; i < xInputs.length; i++) {
      const x = parseNumbers(xInputs[i]);
      if (x.length === 0) continue;
      if (x.length !== y.length) {
        setError(ts("errorEqualLength"));
        return;
      }
      xs.push(x);
      names.push(predictorNames[i] || `X${i + 1}`);
    }

    if (xs.length === 0) {
      setError(ts("errorNoPredictors"));
      return;
    }

    try {
      const r = logisticRegression({ y, xs, predictorNames: names });
      setResult(r);
      trackCalculate("logistic-regression");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setYInput("");
    setXInputs([""]);
    setPredictorNames(["X1"]);
    setResult(null);
    setError(null);
    setScenario(null);
  }

  function handleExample() {
    trackLoadExample("logistic-regression");
    setYInput("0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1");
    setXInputs([
      "22, 25, 30, 45, 28, 50, 55, 35, 48, 52, 27, 32, 42, 58, 60, 38, 46, 29, 53, 47",
      "30, 35, 40, 55, 32, 60, 65, 45, 58, 62, 33, 38, 52, 70, 72, 42, 56, 34, 64, 54",
    ]);
    setPredictorNames(["Age", "Income"]);
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
              label={ts("variableY")}
              placeholder="e.g., 0, 1, 0, 1, 1, 0"
              value={yInput}
              onChange={setYInput}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">
                  {ts("predictorVariables")}
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addPredictor}
                  disabled={xInputs.length >= 10}
                >
                  + {ts("addPredictor")}
                </Button>
              </div>

              {xInputs.map((xInput, i) => (
                <div key={i} className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={predictorNames[i]}
                      onChange={(e) => updatePredictorName(i, e.target.value)}
                      className="h-8 w-32 text-sm"
                      placeholder={`X${i + 1}`}
                    />
                    {xInputs.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePredictor(i)}
                        className="h-8 px-2 text-red-500 hover:text-red-700"
                      >
                        {ts("remove")}
                      </Button>
                    )}
                  </div>
                  <DataTextarea
                    label=""
                    placeholder={`e.g., 1.2, 3.4, 5.6, ...`}
                    value={xInput}
                    onChange={(val) => updateXInput(i, val)}
                  />
                </div>
              ))}
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
            <ShareButton url={shareUrl} testName="logistic-regression" />
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

export function LogisticRegressionCalculator() {
  return (
    <Suspense fallback={null}>
      <LogisticRegressionCalculatorInner />
    </Suspense>
  );
}

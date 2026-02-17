"use client";

import { useState } from "react";
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
  mannWhitneyU,
  formatMannWhitneyAPA,
  type MannWhitneyResult,
} from "@/lib/statistics/mann-whitney";
import {
  AiInterpretation,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";
import { trackCalculate, trackLoadExample } from "@/lib/analytics";

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,;\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(Number)
    .filter((n) => !isNaN(n));
}

function ResultsDisplay({ result }: { result: MannWhitneyResult }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("mannWhitney");
  const apa = formatMannWhitneyAPA(result);
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
            <em>U</em> = {result.uMin.toFixed(1)}, <em>z</em> ={" "}
            {result.z.toFixed(2)}, <em>p</em>{" "}
            {result.pValue < 0.001
              ? "< .001"
              : `= ${result.pValue.toFixed(3).replace(/^0/, "")}`}
            , <em>r</em> = {result.rankBiserialR.toFixed(2)}
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
              <span className="text-gray-500">{ts("uStatistic")}</span>
              <p className="font-medium">{result.uMin.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("zScore")}</span>
              <p className="font-medium">{result.z.toFixed(4)}</p>
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
              <span className="text-gray-500">{ts("rankBiserialR")}</span>
              <p className="font-medium">{result.rankBiserialR.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">
                {ts("effectSize")}
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
            <div>
              <span className="text-gray-500">{ts("sampleSizes")}</span>
              <p className="font-medium">
                <em>n</em><sub>1</sub> = {result.n1}, <em>n</em><sub>2</sub> = {result.n2}
              </p>
            </div>
            <div>
              <span className="text-gray-500">{ts("medianGroup1")}</span>
              <p className="font-medium">{result.median1.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("medianGroup2")}</span>
              <p className="font-medium">{result.median2.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("meanRankGroup1")}</span>
              <p className="font-medium">{result.meanRank1.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("meanRankGroup2")}</span>
              <p className="font-medium">{result.meanRank2.toFixed(2)}</p>
            </div>
          </div>

          {/* Effect Size Interpretation */}
          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")} </span>
            {Math.abs(result.rankBiserialR) < 0.1
              ? t("negligibleEffect")
              : Math.abs(result.rankBiserialR) < 0.3
                ? t("smallEffect")
                : Math.abs(result.rankBiserialR) < 0.5
                  ? t("mediumEffect")
                  : t("largeEffect")}{" "}
            (<em>r</em> = {Math.abs(result.rankBiserialR).toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="t-test"
        results={result as unknown as Record<string, unknown>}
      />
    </div>
  );
}

export function MannWhitneyCalculator() {
  const t = useTranslations("calculator");
  const ts = useTranslations("mannWhitney");
  const [group1Input, setGroup1Input] = useState("");
  const [group2Input, setGroup2Input] = useState("");
  const [result, setResult] = useState<MannWhitneyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate() {
    setError(null);
    setResult(null);

    const g1 = parseNumbers(group1Input);
    const g2 = parseNumbers(group2Input);

    if (g1.length < 2) {
      setError(ts("errorGroup1Min"));
      return;
    }
    if (g2.length < 2) {
      setError(ts("errorGroup2Min"));
      return;
    }

    try {
      const r = mannWhitneyU({ group1: g1, group2: g2 });
      setResult(r);
      trackCalculate("mann-whitney");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setGroup1Input("");
    setGroup2Input("");
    setResult(null);
    setError(null);
  }

  function handleExample() {
    trackLoadExample("mann-whitney");
    setGroup1Input("85, 72, 91, 68, 77, 95, 83, 89");
    setGroup2Input("65, 78, 71, 62, 73, 69, 75, 67");
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {ts("inputTitle")}
            </CardTitle>
            <CardDescription>
              {ts("inputDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="group1">
                {ts("group1")}
                <span className="ml-1 text-xs text-gray-400">
                  {t("separatorHint")}
                </span>
              </Label>
              <textarea
                id="group1"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                rows={3}
                placeholder="e.g., 85, 72, 91, 68, 77"
                value={group1Input}
                onChange={(e) => setGroup1Input(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="group2">
                {ts("group2")}
                <span className="ml-1 text-xs text-gray-400">
                  {t("separatorHint")}
                </span>
              </Label>
              <textarea
                id="group2"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                rows={3}
                placeholder="e.g., 65, 78, 71, 62, 73"
                value={group2Input}
                onChange={(e) => setGroup2Input(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={handleCalculate} className="flex-1">
            {t("calculate")}
          </Button>
          <Button variant="outline" onClick={handleExample}>
            {t("loadExample")}
          </Button>
          <Button variant="outline" onClick={handleClear}>
            {t("clear")}
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div>
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

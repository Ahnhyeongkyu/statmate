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
  wilcoxonSignedRank,
  formatWilcoxonAPA,
  type WilcoxonResult,
} from "@/lib/statistics/wilcoxon";
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

function ResultsDisplay({ result }: { result: WilcoxonResult }) {
  const t = useTranslations("calculator");
  const ts = useTranslations("wilcoxon");
  const apa = formatWilcoxonAPA(result);
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
            <em>W</em> = {result.wStat.toFixed(1)}, <em>z</em> ={" "}
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
              <span className="text-gray-500">{ts("wStatistic")}</span>
              <p className="font-medium">{result.wStat.toFixed(1)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("wPlus")}</span>
              <p className="font-medium">{result.wPlus.toFixed(1)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("wMinus")}</span>
              <p className="font-medium">{result.wMinus.toFixed(1)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("zValue")}</span>
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
              <span className="text-gray-500">{ts("medianPre")}</span>
              <p className="font-medium">{result.medianPre.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("medianPost")}</span>
              <p className="font-medium">{result.medianPost.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("medianDiff")}</span>
              <p className="font-medium">{result.medianDiff.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">{ts("totalN")}</span>
              <p className="font-medium">{result.n}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">{ts("excluded")}</span>
              <p className="font-medium">
                {result.nExcluded} ({ts("effectiveN")}: {result.nEffective})
              </p>
            </div>
          </div>

          {/* Effect Size Interpretation */}
          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">{t("effectSizeLabel")} </span>
            {result.effectSizeLabel === "negligible"
              ? t("negligibleEffect")
              : result.effectSizeLabel === "small"
                ? t("smallEffect")
                : result.effectSizeLabel === "medium"
                  ? t("mediumEffect")
                  : t("largeEffect")}{" "}
            (rank-biserial <em>r</em> = {Math.abs(result.rankBiserialR).toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="correlation"
        results={result as unknown as Record<string, unknown>}
      />
    </div>
  );
}

export function WilcoxonCalculator() {
  const t = useTranslations("calculator");
  const ts = useTranslations("wilcoxon");
  const [preInput, setPreInput] = useState("");
  const [postInput, setPostInput] = useState("");
  const [result, setResult] = useState<WilcoxonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate() {
    setError(null);
    setResult(null);

    const pre = parseNumbers(preInput);
    const post = parseNumbers(postInput);

    if (pre.length < 5) {
      setError(ts("errorPreMin"));
      return;
    }
    if (post.length < 5) {
      setError(ts("errorPostMin"));
      return;
    }
    if (pre.length !== post.length) {
      setError(ts("errorEqualLength"));
      return;
    }

    try {
      const r = wilcoxonSignedRank({ pre, post });
      setResult(r);
      trackCalculate("wilcoxon");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setPreInput("");
    setPostInput("");
    setResult(null);
    setError(null);
  }

  function handleExample() {
    trackLoadExample("wilcoxon");
    setPreInput("72, 85, 91, 68, 77, 83, 95, 88, 74, 79");
    setPostInput("78, 89, 95, 73, 82, 87, 98, 92, 79, 83");
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
              <Label htmlFor="pre">
                {ts("preTest")}
                <span className="ml-1 text-xs text-gray-400">
                  {t("separatorHint")}
                </span>
              </Label>
              <textarea
                id="pre"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                rows={3}
                placeholder="e.g., 72, 85, 91, 68, 77"
                value={preInput}
                onChange={(e) => setPreInput(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="post">
                {ts("postTest")}
                <span className="ml-1 text-xs text-gray-400">
                  {t("separatorHint")}
                </span>
              </Label>
              <textarea
                id="post"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                rows={3}
                placeholder="e.g., 78, 89, 95, 73, 82"
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
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

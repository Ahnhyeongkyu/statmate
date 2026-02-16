"use client";

import { useState } from "react";
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
import { descriptiveStats, type DescriptiveResult } from "@/lib/statistics/descriptive";
import { exportDescriptive, downloadBlob } from "@/lib/export-docx";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,;\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(Number)
    .filter((n) => !isNaN(n));
}

function ResultsDisplay({ result }: { result: DescriptiveResult }) {
  const { show, copy } = useCopyToast();

  return (
    <div className="space-y-6">
      <CopyToast show={show} />
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-lg text-blue-900">
            <em>M</em> = {result.mean.toFixed(2)}, <em>SD</em> ={" "}
            {result.sd.toFixed(2)}, <em>N</em> = {result.n}
          </p>
          <button
            onClick={() =>
              copy(`M = ${result.mean.toFixed(2)}, SD = ${result.sd.toFixed(2)}, N = ${result.n}`)
            }
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Copy to clipboard
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Central Tendency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Mean (<em>M</em>)</span>
              <p className="font-medium">{result.mean.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Median (<em>Mdn</em>)</span>
              <p className="font-medium">{result.median.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Mode</span>
              <p className="font-medium">
                {result.mode.length === 0
                  ? "No mode (all values unique)"
                  : result.mode.map((m) => m.toFixed(2)).join(", ")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Variability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Standard Deviation (<em>SD</em>)</span>
              <p className="font-medium">{result.sd.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Variance (<em>s&sup2;</em>)</span>
              <p className="font-medium">{result.variance.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Standard Error (<em>SE</em>)</span>
              <p className="font-medium">{result.se.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Range</span>
              <p className="font-medium">{result.range.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Minimum</span>
              <p className="font-medium">{result.min.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Maximum</span>
              <p className="font-medium">{result.max.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">95% Confidence Interval</span>
              <p className="font-medium">
                [{result.ci95[0].toFixed(4)}, {result.ci95[1].toFixed(4)}]
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Q1 (25th percentile)</span>
              <p className="font-medium">{result.q1.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Q3 (75th percentile)</span>
              <p className="font-medium">{result.q3.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">IQR</span>
              <p className="font-medium">{result.iqr.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Sample size (<em>N</em>)</span>
              <p className="font-medium">{result.n}</p>
            </div>

            <Separator className="col-span-2 my-2" />

            <div>
              <span className="text-gray-500">Skewness</span>
              <p className="font-medium">{result.skewness.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Kurtosis (excess)</span>
              <p className="font-medium">{result.kurtosis.toFixed(4)}</p>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">Distribution shape: </span>
            {Math.abs(result.skewness) < 0.5
              ? "Approximately symmetric"
              : result.skewness > 0
                ? "Positively skewed (right-tailed)"
                : "Negatively skewed (left-tailed)"}
            {" | "}
            {Math.abs(result.kurtosis) < 1
              ? "Mesokurtic (normal-like)"
              : result.kurtosis > 0
                ? "Leptokurtic (heavy-tailed)"
                : "Platykurtic (light-tailed)"}
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="descriptive"
        results={result as unknown as Record<string, unknown>}
      />

      {/* Export Button */}
      <ExportButton
        testName="descriptive"
        onExport={async () => {
          const blob = await exportDescriptive(result);
          downloadBlob(blob, `statmate-descriptive-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

export function DescriptiveCalculator() {
  const [dataInput, setDataInput] = useState("");
  const [result, setResult] = useState<DescriptiveResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate() {
    setError(null);
    setResult(null);

    const data = parseNumbers(dataInput);

    if (data.length < 2) {
      setError("Enter at least 2 values.");
      return;
    }

    try {
      setResult(descriptiveStats(data));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setDataInput("");
    setResult(null);
    setError(null);
  }

  function handleExample() {
    setDataInput("72, 85, 91, 68, 77, 83, 95, 88, 74, 79, 86, 92, 71, 80, 87, 93, 76, 82, 89, 75");
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Descriptive Statistics</CardTitle>
            <CardDescription>
              Calculate mean, median, standard deviation, and more for your dataset.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>
                Data Values
                <span className="ml-1 text-xs text-gray-400">
                  (comma, space, or newline separated)
                </span>
              </Label>
              <textarea
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                rows={6}
                placeholder="e.g., 72, 85, 91, 68, 77, 83, 95, 88"
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
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
          <Button onClick={handleCalculate} className="flex-1">Calculate</Button>
          <Button variant="outline" onClick={handleExample}>Load Example</Button>
          <Button variant="outline" onClick={handleClear}>Clear</Button>
        </div>
      </div>

      <div>
        {result ? (
          <ResultsDisplay result={result} />
        ) : (
          <Card className="flex h-full items-center justify-center border-dashed">
            <CardContent className="py-16 text-center">
              <p className="text-lg text-gray-400">Enter your data and click Calculate</p>
              <p className="mt-1 text-sm text-gray-300">or click &quot;Load Example&quot; to try it out</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

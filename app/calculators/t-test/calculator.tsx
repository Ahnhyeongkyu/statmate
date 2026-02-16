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
import { exportTTest, downloadBlob } from "@/lib/export-docx";
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

function ResultsDisplay({ result }: { result: TTestResult }) {
  const apa = formatAPA(result);
  const { show, copy } = useCopyToast();

  return (
    <div className="space-y-6">
      <CopyToast show={show} />

      {/* APA Result */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            APA-Formatted Result
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
            Copy to clipboard
          </button>
        </CardContent>
      </Card>

      {/* Significance Badge */}
      <div className="flex items-center gap-2">
        {result.significant ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Statistically Significant (p &lt; .05)
          </Badge>
        ) : (
          <Badge variant="secondary">
            Not Statistically Significant (p &ge; .05)
          </Badge>
        )}
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Test type</span>
              <p className="font-medium">
                {result.type === "independent"
                  ? "Independent Samples (Welch's)"
                  : "Paired Samples"}
              </p>
            </div>
            <div>
              <span className="text-gray-500">
                <em>t</em>-statistic
              </span>
              <p className="font-medium">{result.t.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Degrees of freedom (df)</span>
              <p className="font-medium">
                {result.type === "independent"
                  ? result.df.toFixed(2)
                  : result.df}
              </p>
            </div>
            <div>
              <span className="text-gray-500">
                <em>p</em>-value (two-tailed)
              </span>
              <p className="font-medium">
                {result.pValue < 0.001
                  ? "< .001"
                  : result.pValue.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Mean difference</span>
              <p className="font-medium">{result.meanDiff.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Cohen&apos;s <em>d</em></span>
              <p className="font-medium">{result.cohensD.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">
                95% Confidence Interval of the Difference
              </span>
              <p className="font-medium">
                [{result.ci95[0].toFixed(4)}, {result.ci95[1].toFixed(4)}]
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Group Statistics */}
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Group Statistics
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Group</th>
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
                  <td className="py-1.5">Group 1</td>
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
                  <td className="py-1.5">Group 2</td>
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
            <span className="font-semibold">Effect size interpretation: </span>
            {Math.abs(result.cohensD) < 0.2
              ? "Negligible effect"
              : Math.abs(result.cohensD) < 0.5
                ? "Small effect"
                : Math.abs(result.cohensD) < 0.8
                  ? "Medium effect"
                  : "Large effect"}{" "}
            (Cohen&apos;s <em>d</em> = {Math.abs(result.cohensD).toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="t-test"
        results={result as unknown as Record<string, unknown>}
      />

      {/* Export Button */}
      <ExportButton
        testName="t-test"
        onExport={async () => {
          const blob = await exportTTest(result);
          downloadBlob(blob, `statmate-ttest-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

export function TTestCalculator() {
  const [testType, setTestType] = useState<"independent" | "paired">(
    "independent"
  );
  const [group1Input, setGroup1Input] = useState("");
  const [group2Input, setGroup2Input] = useState("");
  const [result, setResult] = useState<TTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate() {
    setError(null);
    setResult(null);

    const g1 = parseNumbers(group1Input);
    const g2 = parseNumbers(group2Input);

    if (g1.length < 2) {
      setError("Group 1 needs at least 2 values.");
      return;
    }
    if (g2.length < 2) {
      setError("Group 2 needs at least 2 values.");
      return;
    }
    if (testType === "paired" && g1.length !== g2.length) {
      setError("Paired t-test requires equal sample sizes in both groups.");
      return;
    }

    try {
      const r =
        testType === "independent"
          ? independentTTest(g1, g2)
          : pairedTTest(g1, g2);
      setResult(r);
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
    if (testType === "independent") {
      setGroup1Input("23, 25, 28, 22, 27, 24, 26, 29, 25, 23");
      setGroup2Input("19, 21, 18, 22, 20, 17, 23, 19, 21, 20");
    } else {
      setGroup1Input("85, 90, 78, 92, 88, 76, 95, 89, 84, 91");
      setGroup2Input("90, 95, 82, 96, 93, 80, 98, 94, 88, 95");
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
            <TabsTrigger value="independent">Independent Samples</TabsTrigger>
            <TabsTrigger value="paired">Paired Samples</TabsTrigger>
          </TabsList>

          <TabsContent value="independent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Independent Samples T-Test
                </CardTitle>
                <CardDescription>
                  Compare means from two separate, unrelated groups.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="group1">
                    Group 1 Data
                    <span className="ml-1 text-xs text-gray-400">
                      (comma, space, or newline separated)
                    </span>
                  </Label>
                  <textarea
                    id="group1"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="e.g., 23, 25, 28, 22, 27"
                    value={group1Input}
                    onChange={(e) => setGroup1Input(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="group2">
                    Group 2 Data
                    <span className="ml-1 text-xs text-gray-400">
                      (comma, space, or newline separated)
                    </span>
                  </Label>
                  <textarea
                    id="group2"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="e.g., 19, 21, 18, 22, 20"
                    value={group2Input}
                    onChange={(e) => setGroup2Input(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paired" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Paired Samples T-Test
                </CardTitle>
                <CardDescription>
                  Compare means from the same group at two time points (e.g.,
                  pre-test vs post-test).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pre">
                    Pre-Test / Time 1
                    <span className="ml-1 text-xs text-gray-400">
                      (comma, space, or newline separated)
                    </span>
                  </Label>
                  <textarea
                    id="pre"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="e.g., 85, 90, 78, 92, 88"
                    value={group1Input}
                    onChange={(e) => setGroup1Input(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="post">
                    Post-Test / Time 2
                    <span className="ml-1 text-xs text-gray-400">
                      (comma, space, or newline separated)
                    </span>
                  </Label>
                  <textarea
                    id="post"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                    placeholder="e.g., 90, 95, 82, 96, 93"
                    value={group2Input}
                    onChange={(e) => setGroup2Input(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={handleCalculate} className="flex-1">
            Calculate
          </Button>
          <Button variant="outline" onClick={handleExample}>
            Load Example
          </Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
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
                Enter your data and click Calculate
              </p>
              <p className="mt-1 text-sm text-gray-300">
                or click &quot;Load Example&quot; to try it out
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

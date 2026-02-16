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
import {
  oneWayAnova,
  formatAnovaAPA,
  formatPValue,
  type AnovaResult,
} from "@/lib/statistics/anova";
import { exportAnova, downloadBlob } from "@/lib/export-docx";
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

function ResultsDisplay({ result }: { result: AnovaResult }) {
  const apa = formatAnovaAPA(result);
  const { show, copy } = useCopyToast();

  return (
    <div className="space-y-6">
      <CopyToast show={show} />
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            APA-Formatted Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-lg text-blue-900">
            <em>F</em>({result.dfBetween}, {result.dfWithin}) ={" "}
            {result.fStatistic.toFixed(2)}, <em>p</em>{" "}
            {formatPValue(result.pValue)}, <em>&eta;&sup2;</em> ={" "}
            {result.etaSquared.toFixed(2)}
          </p>
          <button
            onClick={() => copy(apa)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Copy to clipboard
          </button>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">ANOVA Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Source</th>
                  <th className="py-2 text-right font-semibold">SS</th>
                  <th className="py-2 text-right font-semibold">df</th>
                  <th className="py-2 text-right font-semibold">MS</th>
                  <th className="py-2 text-right font-semibold"><em>F</em></th>
                  <th className="py-2 text-right font-semibold"><em>p</em></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1.5">Between</td>
                  <td className="py-1.5 text-right">{result.ssBetween.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.dfBetween}</td>
                  <td className="py-1.5 text-right">{result.msBetween.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.fStatistic.toFixed(2)}</td>
                  <td className="py-1.5 text-right">
                    {result.pValue < 0.001 ? "< .001" : result.pValue.toFixed(3)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5">Within</td>
                  <td className="py-1.5 text-right">{result.ssWithin.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.dfWithin}</td>
                  <td className="py-1.5 text-right">{result.msWithin.toFixed(2)}</td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                </tr>
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5 font-semibold">Total</td>
                  <td className="py-1.5 text-right">{result.ssTotal.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{result.dfBetween + result.dfWithin}</td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                  <td className="py-1.5 text-right"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Group Statistics
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Group</th>
                  <th className="py-2 text-right font-semibold"><em>N</em></th>
                  <th className="py-2 text-right font-semibold"><em>M</em></th>
                  <th className="py-2 text-right font-semibold"><em>SD</em></th>
                </tr>
              </thead>
              <tbody>
                {result.groupStats.map((g, i) => (
                  <tr key={i} className={i === result.groupStats.length - 1 ? "border-b-2 border-gray-900" : ""}>
                    <td className="py-1.5">{g.name}</td>
                    <td className="py-1.5 text-right">{g.n}</td>
                    <td className="py-1.5 text-right">{g.mean.toFixed(2)}</td>
                    <td className="py-1.5 text-right">{g.sd.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {result.postHoc.length > 0 && (
            <>
              <Separator className="my-4" />
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                Post-Hoc Pairwise Comparisons (Bonferroni)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-t-2 border-gray-900">
                      <th className="py-2 text-left font-semibold">Comparison</th>
                      <th className="py-2 text-right font-semibold">Mean Diff</th>
                      <th className="py-2 text-right font-semibold"><em>p</em></th>
                      <th className="py-2 text-right font-semibold">Sig.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.postHoc.map((ph, i) => (
                      <tr key={i} className={i === result.postHoc.length - 1 ? "border-b-2 border-gray-900" : ""}>
                        <td className="py-1.5">{ph.group1} vs {ph.group2}</td>
                        <td className="py-1.5 text-right">{ph.meanDiff.toFixed(2)}</td>
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
            <span className="font-semibold">Effect size interpretation: </span>
            {result.etaSquared < 0.01
              ? "Negligible effect"
              : result.etaSquared < 0.06
                ? "Small effect"
                : result.etaSquared < 0.14
                  ? "Medium effect"
                  : "Large effect"}{" "}
            (<em>&eta;&sup2;</em> = {result.etaSquared.toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="anova"
        results={result as unknown as Record<string, unknown>}
      />

      {/* Export Button */}
      <ExportButton
        testName="anova"
        onExport={async () => {
          const blob = await exportAnova(result);
          downloadBlob(blob, `statmate-anova-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

export function AnovaCalculator() {
  const [numGroups, setNumGroups] = useState(3);
  const [groupInputs, setGroupInputs] = useState<string[]>(["", "", ""]);
  const [groupNames, setGroupNames] = useState<string[]>(["Group 1", "Group 2", "Group 3"]);
  const [result, setResult] = useState<AnovaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleGroupCountChange(n: number) {
    setNumGroups(n);
    setGroupInputs((prev) => {
      const next = [...prev];
      while (next.length < n) next.push("");
      return next.slice(0, n);
    });
    setGroupNames((prev) => {
      const next = [...prev];
      while (next.length < n) next.push(`Group ${next.length + 1}`);
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
        setError(`${groupNames[i]} needs at least 2 values.`);
        return;
      }
    }
    try {
      setResult(oneWayAnova(groups, groupNames));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setGroupInputs(Array(numGroups).fill(""));
    setResult(null);
    setError(null);
  }

  function handleExample() {
    setNumGroups(3);
    setGroupNames(["Group 1", "Group 2", "Group 3"]);
    setGroupInputs([
      "23, 25, 28, 22, 27, 24, 26",
      "30, 32, 29, 35, 31, 33, 28",
      "18, 20, 22, 19, 21, 17, 23",
    ]);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">One-Way ANOVA</CardTitle>
            <CardDescription>
              Compare means across three or more independent groups.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Number of Groups</Label>
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
                <div className="flex items-center gap-2">
                  <Label htmlFor={`group-${i}`} className="flex-1">
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
                    <span className="ml-1 text-xs text-gray-400">(comma separated)</span>
                  </Label>
                </div>
                <textarea
                  id={`group-${i}`}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  rows={2}
                  placeholder="e.g., 23, 25, 28, 22, 27"
                  value={groupInputs[i]}
                  onChange={(e) => {
                    const inputs = [...groupInputs];
                    inputs[i] = e.target.value;
                    setGroupInputs(inputs);
                  }}
                />
              </div>
            ))}
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

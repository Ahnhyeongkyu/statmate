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
  chiSquareIndependence,
  chiSquareGoodness,
  formatChiSquareAPA,
  formatPValue,
  type ChiSquareResult,
  type ChiSquareIndependenceResult,
} from "@/lib/statistics/chi-square";
import { exportChiSquare, downloadBlob } from "@/lib/export-docx";
import {
  AiInterpretation,
  ExportButton,
  CopyToast,
  useCopyToast,
} from "@/components/pro-feature";

function IndependenceResultsDisplay({ result }: { result: ChiSquareIndependenceResult }) {
  const apa = formatChiSquareAPA(result);
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
            <em>&chi;&sup2;</em>({result.df}, <em>N</em> = {result.grandTotal}) ={" "}
            {result.chiSquare.toFixed(2)}, <em>p</em>{" "}
            {formatPValue(result.pValue)}, <em>V</em> ={" "}
            {result.cramersV.toFixed(2)}
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
          <CardTitle className="text-base">Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500"><em>&chi;&sup2;</em> statistic</span>
              <p className="font-medium">{result.chiSquare.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Degrees of freedom</span>
              <p className="font-medium">{result.df}</p>
            </div>
            <div>
              <span className="text-gray-500"><em>p</em>-value</span>
              <p className="font-medium">
                {result.pValue < 0.001 ? "< .001" : result.pValue.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Cramer&apos;s <em>V</em></span>
              <p className="font-medium">{result.cramersV.toFixed(4)}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Observed Frequencies
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"></th>
                  {result.observed[0].map((_, j) => (
                    <th key={j} className="py-2 text-right font-semibold">
                      Col {j + 1}
                    </th>
                  ))}
                  <th className="py-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {result.observed.map((row, i) => (
                  <tr key={i} className={i === result.observed.length - 1 ? "border-b border-gray-300" : ""}>
                    <td className="py-1.5 font-medium">Row {i + 1}</td>
                    {row.map((cell, j) => (
                      <td key={j} className="py-1.5 text-right">{cell}</td>
                    ))}
                    <td className="py-1.5 text-right font-medium">
                      {result.rowTotals[i]}
                    </td>
                  </tr>
                ))}
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5 font-semibold">Total</td>
                  {result.colTotals.map((t, j) => (
                    <td key={j} className="py-1.5 text-right font-medium">{t}</td>
                  ))}
                  <td className="py-1.5 text-right font-semibold">
                    {result.grandTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Expected Frequencies
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold"></th>
                  {result.expected[0].map((_, j) => (
                    <th key={j} className="py-2 text-right font-semibold">
                      Col {j + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.expected.map((row, i) => (
                  <tr key={i} className={i === result.expected.length - 1 ? "border-b-2 border-gray-900" : ""}>
                    <td className="py-1.5 font-medium">Row {i + 1}</td>
                    {row.map((cell, j) => (
                      <td key={j} className="py-1.5 text-right">
                        {cell.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm">
            <span className="font-semibold">Effect size interpretation: </span>
            {result.cramersV < 0.1
              ? "Negligible association"
              : result.cramersV < 0.3
                ? "Small association"
                : result.cramersV < 0.5
                  ? "Medium association"
                  : "Large association"}{" "}
            (Cramer&apos;s <em>V</em> = {result.cramersV.toFixed(2)})
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="chi-square"
        results={result as unknown as Record<string, unknown>}
      />

      {/* Export Button */}
      <ExportButton
        testName="chi-square"
        onExport={async () => {
          const blob = await exportChiSquare(result);
          downloadBlob(blob, `statmate-chisquare-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

function ResultsDisplay({ result }: { result: ChiSquareResult }) {
  if (result.type === "independence") {
    return <IndependenceResultsDisplay result={result} />;
  }

  const apa = formatChiSquareAPA(result);
  const { show: showToast, copy } = useCopyToast();

  return (
    <div className="space-y-6">
      <CopyToast show={showToast} />
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-blue-900">
            APA-Formatted Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-lg text-blue-900">
            <em>&chi;&sup2;</em>({result.df}) = {result.chiSquare.toFixed(2)},{" "}
            <em>p</em> {formatPValue(result.pValue)}
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
          <CardTitle className="text-base">Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500"><em>&chi;&sup2;</em> statistic</span>
              <p className="font-medium">{result.chiSquare.toFixed(4)}</p>
            </div>
            <div>
              <span className="text-gray-500">Degrees of freedom</span>
              <p className="font-medium">{result.df}</p>
            </div>
            <div>
              <span className="text-gray-500"><em>p</em>-value</span>
              <p className="font-medium">
                {result.pValue < 0.001 ? "< .001" : result.pValue.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Total <em>N</em></span>
              <p className="font-medium">{result.total}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Observed vs Expected
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-2 text-left font-semibold">Category</th>
                  <th className="py-2 text-right font-semibold">Observed</th>
                  <th className="py-2 text-right font-semibold">Expected</th>
                  <th className="py-2 text-right font-semibold">Residual</th>
                </tr>
              </thead>
              <tbody>
                {result.observed.map((obs, i) => (
                  <tr key={i} className={i === result.observed.length - 1 ? "border-b-2 border-gray-900" : ""}>
                    <td className="py-1.5">Category {i + 1}</td>
                    <td className="py-1.5 text-right">{obs}</td>
                    <td className="py-1.5 text-right">{result.expected[i].toFixed(2)}</td>
                    <td className="py-1.5 text-right">
                      {(obs - result.expected[i]).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <AiInterpretation
        testType="chi-square"
        results={result as unknown as Record<string, unknown>}
      />

      {/* Export Button */}
      <ExportButton
        testName="chi-square"
        onExport={async () => {
          const blob = await exportChiSquare({
            type: "goodness",
            chiSquare: result.chiSquare,
            df: result.df,
            pValue: result.pValue,
            observed: result.observed as number[],
            expected: result.expected as number[],
          });
          downloadBlob(blob, `statmate-chisquare-${Date.now()}.docx`);
        }}
      />
    </div>
  );
}

export function ChiSquareCalculator() {
  const [testType, setTestType] = useState<"independence" | "goodness">("independence");
  const [tableInput, setTableInput] = useState("");
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [cells, setCells] = useState<string[][]>(
    Array.from({ length: 2 }, () => Array(2).fill(""))
  );
  const [goodnessInput, setGoodnessInput] = useState("");
  const [expectedInput, setExpectedInput] = useState("");
  const [result, setResult] = useState<ChiSquareResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateTableSize(newRows: number, newCols: number) {
    const newCells = Array.from({ length: newRows }, (_, i) =>
      Array.from({ length: newCols }, (_, j) =>
        cells[i]?.[j] || ""
      )
    );
    setRows(newRows);
    setCols(newCols);
    setCells(newCells);
  }

  function handleCellChange(i: number, j: number, value: string) {
    const newCells = cells.map((row) => [...row]);
    newCells[i][j] = value;
    setCells(newCells);
  }

  function handleCalculate() {
    setError(null);
    setResult(null);

    try {
      if (testType === "independence") {
        const observed = cells.map((row) =>
          row.map((cell) => {
            const n = Number(cell);
            if (isNaN(n) || n < 0) throw new Error("All cells must be non-negative numbers.");
            return n;
          })
        );
        setResult(chiSquareIndependence(observed));
      } else {
        const observed = goodnessInput
          .split(/[\s,;]+/)
          .map((s) => s.trim())
          .filter((s) => s !== "")
          .map(Number)
          .filter((n) => !isNaN(n));

        if (observed.length < 2) {
          setError("Enter at least 2 observed frequencies.");
          return;
        }

        let expected: number[] | undefined;
        if (expectedInput.trim()) {
          expected = expectedInput
            .split(/[\s,;]+/)
            .map((s) => s.trim())
            .filter((s) => s !== "")
            .map(Number)
            .filter((n) => !isNaN(n));

          if (expected.length !== observed.length) {
            setError("Observed and expected must have the same number of values.");
            return;
          }
        }

        setResult(chiSquareGoodness(observed, expected));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Calculation error");
    }
  }

  function handleClear() {
    setCells(Array.from({ length: rows }, () => Array(cols).fill("")));
    setGoodnessInput("");
    setExpectedInput("");
    setResult(null);
    setError(null);
  }

  function handleExample() {
    if (testType === "independence") {
      setCells([
        ["50", "30"],
        ["20", "40"],
      ]);
      setRows(2);
      setCols(2);
    } else {
      setGoodnessInput("30, 25, 20, 25");
      setExpectedInput("");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Tabs
          value={testType}
          onValueChange={(v) => {
            setTestType(v as "independence" | "goodness");
            setResult(null);
            setError(null);
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="independence">Independence</TabsTrigger>
            <TabsTrigger value="goodness">Goodness-of-Fit</TabsTrigger>
          </TabsList>

          <TabsContent value="independence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Test of Independence
                </CardTitle>
                <CardDescription>
                  Test whether two categorical variables are independent.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div>
                    <Label>Rows</Label>
                    <select
                      className="ml-2 rounded border px-2 py-1 text-sm"
                      value={rows}
                      onChange={(e) => updateTableSize(Number(e.target.value), cols)}
                    >
                      {[2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Columns</Label>
                    <select
                      className="ml-2 rounded border px-2 py-1 text-sm"
                      value={cols}
                      onChange={(e) => updateTableSize(rows, Number(e.target.value))}
                    >
                      {[2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="text-sm">
                    <thead>
                      <tr>
                        <th></th>
                        {Array.from({ length: cols }, (_, j) => (
                          <th key={j} className="px-1 py-1 text-center text-xs text-gray-500">
                            Col {j + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: rows }, (_, i) => (
                        <tr key={i}>
                          <td className="pr-2 text-xs text-gray-500">Row {i + 1}</td>
                          {Array.from({ length: cols }, (_, j) => (
                            <td key={j} className="px-1 py-1">
                              <input
                                type="number"
                                min="0"
                                className="w-16 rounded border px-2 py-1 text-center text-sm"
                                value={cells[i]?.[j] || ""}
                                onChange={(e) => handleCellChange(i, j, e.target.value)}
                                placeholder="0"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goodness" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Goodness-of-Fit Test</CardTitle>
                <CardDescription>
                  Test whether observed frequencies match expected proportions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>
                    Observed Frequencies
                    <span className="ml-1 text-xs text-gray-400">
                      (comma separated)
                    </span>
                  </Label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    rows={2}
                    placeholder="e.g., 30, 25, 20, 25"
                    value={goodnessInput}
                    onChange={(e) => setGoodnessInput(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Expected Frequencies
                    <span className="ml-1 text-xs text-gray-400">
                      (optional, leave blank for equal)
                    </span>
                  </Label>
                  <textarea
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    rows={2}
                    placeholder="e.g., 25, 25, 25, 25 (leave blank for equal)"
                    value={expectedInput}
                    onChange={(e) => setExpectedInput(e.target.value)}
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

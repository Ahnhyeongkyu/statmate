"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { parseSPSSOutput, type SPSSParseResult } from "@/lib/spss-parser";

// ---------------------------------------------------------------------------
// Copy Toast (local lightweight version)
// ---------------------------------------------------------------------------

function useCopyToast() {
  const [show, setShow] = useState(false);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  }

  return { show, copy };
}

function CopyToast({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
        {message}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Example SPSS Outputs
// ---------------------------------------------------------------------------

const EXAMPLES: Record<string, string> = {
  "t-test": `Group Statistics

                     Group    N     Mean    Std. Deviation    Std. Error Mean
Score                1        30    85.40   12.35             2.25
                     2        30    78.20   11.80             2.15

Independent Samples Test

                              Levene's Test     t-test for Equality of Means
                              F       Sig.      t       df        Sig. (2-tailed)   Mean Difference   Std. Error Difference   95% Confidence Interval
                                                                                                                              Lower       Upper
Score  Equal variances assumed   0.15   0.70    2.31    58        0.024             7.20              3.11                    0.97        13.43
       Equal variances not assumed                      2.31    57.94     0.024     7.20              3.11                    0.97        13.43`,

  anova: `ANOVA

Score
                    Sum of Squares    df    Mean Square    F        Sig.
Between Groups      1250.80           2     625.40         8.45     0.001
Within Groups       3340.20          45      74.23
Total               4591.00          47`,

  regression: `Model Summary

Model    R        R Square    Adjusted R Square    Std. Error of the Estimate
1        0.742    0.551       0.540                4.28

ANOVA

Model             Sum of Squares    df    Mean Square    F         Sig.
1  Regression     1125.60           2     562.80         30.72     0.000
   Residual       915.40           50      18.31
   Total          2041.00          52

Coefficients

Model              Unstandardized Coefficients          Standardized Coefficients
                   B            Std. Error               Beta            t        Sig.
1  (Constant)     12.450       3.210                                    3.88     0.000
   StudyHours      2.340       0.450                     0.520          5.20     0.000
   Attendance      0.890       0.320                     0.280          2.78     0.008`,

  "chi-square": `Chi-Square Tests

                              Value       df    Asymptotic Significance (2-sided)
Pearson Chi-Square            15.32       4     0.004
Likelihood Ratio              14.98       4     0.005
Linear-by-Linear Association   8.21       1     0.004
N of Valid Cases              200

Symmetric Measures

                              Value       Approximate Significance
Nominal by Nominal  Phi       0.277       0.004
                    Cramer's V  0.196     0.004
N of Valid Cases              200`,

  correlation: `Correlations

                          StudyHours    ExamScore
StudyHours  Pearson Correlation   1.000         0.684
            Sig. (2-tailed)                     0.001
            N                     45            45
ExamScore   Pearson Correlation   0.684         1.000
            Sig. (2-tailed)       0.001
            N                     45            45`,

  descriptive: `Descriptive Statistics

                N     Minimum    Maximum    Mean      Std. Deviation
ExamScore      120    45.00      98.00      72.35     12.48
StudyHours     120     2.00      40.00      18.60      8.25
Valid N         120`,
};

const TEST_TYPE_LABELS: Record<string, string> = {
  "t-test": "Independent Samples T-Test",
  anova: "One-Way ANOVA",
  regression: "Multiple Regression",
  "chi-square": "Chi-Square Test",
  correlation: "Pearson Correlation",
  descriptive: "Descriptive Statistics",
};

const TEST_TYPE_COLORS: Record<string, string> = {
  "t-test": "bg-blue-100 text-blue-800",
  anova: "bg-green-100 text-green-800",
  regression: "bg-purple-100 text-purple-800",
  "chi-square": "bg-orange-100 text-orange-800",
  correlation: "bg-pink-100 text-pink-800",
  descriptive: "bg-gray-100 text-gray-800",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SPSSConverter() {
  const t = useTranslations("spssConverter");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<SPSSParseResult | null>(null);
  const [error, setError] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const { show, copy } = useCopyToast();

  function handleConvert() {
    setError(false);
    setResult(null);

    if (!input.trim()) return;

    const parsed = parseSPSSOutput(input);
    if (parsed) {
      setResult(parsed);
    } else {
      setError(true);
    }
  }

  function handleLoadExample(type: string) {
    const example = EXAMPLES[type];
    if (example) {
      setInput(example);
      setError(false);
      setResult(null);
      setExampleOpen(false);
    }
  }

  return (
    <div className="space-y-6">
      <CopyToast show={show} message={t("copied")} />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-2 text-gray-500">{t("description")}</p>
        <p className="mt-1 text-sm text-gray-400">{t("supported")}</p>
      </div>

      {/* Input Area */}
      <Card>
        <CardContent className="pt-6">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
              setResult(null);
            }}
            placeholder={t("placeholder")}
            rows={12}
            className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            spellCheck={false}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={handleConvert} disabled={!input.trim()}>
              {t("convert")}
            </Button>

            {/* Load Example Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setExampleOpen(!exampleOpen)}
              >
                {t("loadExample")}
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${exampleOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>

              {exampleOpen && (
                <div className="absolute left-0 z-20 mt-1 w-56 rounded-lg border bg-white py-1 shadow-lg">
                  {Object.keys(EXAMPLES).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleLoadExample(type)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {TEST_TYPE_LABELS[type]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4">
            <p className="text-sm text-red-700">{t("error")}</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Detected Test Type */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              {t("detected")}:
            </span>
            <Badge
              className={
                TEST_TYPE_COLORS[result.testType] || "bg-gray-100 text-gray-800"
              }
            >
              {TEST_TYPE_LABELS[result.testType]}
            </Badge>
          </div>

          {/* APA Output */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-blue-900">
                {t("apaOutput")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-white p-4">
                <p className="font-mono text-base leading-relaxed text-gray-900">
                  {result.apaResult}
                </p>
              </div>
              <button
                onClick={() => copy(result.apaResult)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {t("copyResult")}
              </button>
            </CardContent>
          </Card>

          {/* Parsed Tables */}
          {result.tables.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-gray-900">
                  {t("parsedTables")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {result.tables.map((table, idx) => (
                    <div key={idx}>
                      <h4 className="mb-2 text-sm font-semibold text-gray-700">
                        {table.title}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-t-2 border-gray-900">
                              {table.headers.map((h, i) => (
                                <th
                                  key={i}
                                  className="px-3 py-2 text-left font-semibold text-gray-700"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {table.rows.map((row, ri) => (
                              <tr key={ri}>
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className="px-3 py-2 text-gray-600"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {!result && !error && (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-12 text-center">
          <svg
            className="mb-3 h-12 w-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-sm text-gray-400">{t("noResult")}</p>
        </div>
      )}
    </div>
  );
}

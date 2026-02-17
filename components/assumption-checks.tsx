"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  checkAssumptions,
  type AssumptionCheckResult,
} from "@/lib/statistics/assumptions";

interface AssumptionChecksProps {
  testType: "t-test" | "anova" | "one-sample-t" | "mann-whitney" | "wilcoxon" | "correlation" | "regression";
  groups: number[][];
}

export function AssumptionChecks({ testType, groups }: AssumptionChecksProps) {
  const t = useTranslations("assumptions");
  const locale = useLocale();

  // Skip for very small samples
  if (groups.every((g) => g.length < 3)) return null;

  const result = checkAssumptions(testType, groups, locale as "en" | "ko");

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {t("title")}
          {result.recommendations.some((r) =>
            r.includes("violated") || r.includes("위반")
          ) ? (
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
              {t("warning")}
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {t("passed")}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Normality Tests */}
        {result.normality.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-700">
              {t("normality")}
            </h4>
            <div className="space-y-1">
              {result.normality.map((n, i) => (
                <div key={i} className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 text-sm">
                  <span>
                    {groups.length === 1 ? t("data") : `${t("group")} ${i + 1}`}
                    {" — "}
                    <em>W</em> = {n.statistic.toFixed(4)}, <em>p</em>{" "}
                    {n.pValue < 0.001 ? "< .001" : `= ${n.pValue.toFixed(3)}`}
                  </span>
                  {n.isNormal ? (
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      {t("normal")}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-50 text-red-700">
                      {t("nonNormal")}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Levene's Test */}
        {result.levene && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-700">
              {t("equalVariance")}
            </h4>
            <div className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 text-sm">
              <span>
                Levene&apos;s — <em>F</em>({result.levene.dfBetween}, {result.levene.dfWithin}) ={" "}
                {result.levene.fStatistic.toFixed(2)}, <em>p</em>{" "}
                {result.levene.pValue < 0.001
                  ? "< .001"
                  : `= ${result.levene.pValue.toFixed(3)}`}
              </span>
              {result.levene.isEqual ? (
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  {t("equal")}
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-50 text-red-700">
                  {t("unequal")}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="rounded-md border-l-4 border-blue-400 bg-blue-50 p-3">
          {result.recommendations.map((rec, i) => (
            <p key={i} className="text-sm text-blue-800">
              {rec}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

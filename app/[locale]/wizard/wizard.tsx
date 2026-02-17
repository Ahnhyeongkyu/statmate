"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type NodeId =
  | "start"
  | "q_groups"
  | "q_paired"
  | "q_normal_ind"
  | "q_normal_paired"
  | "q_normality_1"
  | "q_dv_type"
  | "q_multi_normality"
  | "q_relationship"
  | "r_independent_t"
  | "r_paired_t"
  | "r_mann_whitney"
  | "r_wilcoxon"
  | "r_one_sample_t"
  | "r_anova"
  | "r_kruskal"
  | "r_chi_square"
  | "r_correlation"
  | "r_regression"
  | "r_descriptive";

interface QuestionNode {
  type: "question";
  questionKey: string;
  options: { labelKey: string; next: NodeId }[];
}

interface ResultNode {
  type: "result";
  testKey: string;
  descriptionKey: string;
  href: string;
}

type TreeNode = QuestionNode | ResultNode;

const tree: Record<NodeId, TreeNode> = {
  start: {
    type: "question",
    questionKey: "q_goal",
    options: [
      { labelKey: "o_compare", next: "q_groups" },
      { labelKey: "o_relationship", next: "q_relationship" },
      { labelKey: "o_describe", next: "r_descriptive" },
    ],
  },
  q_groups: {
    type: "question",
    questionKey: "q_how_many_groups",
    options: [
      { labelKey: "o_one_group", next: "q_normality_1" },
      { labelKey: "o_two_groups", next: "q_paired" },
      { labelKey: "o_three_plus", next: "q_dv_type" },
    ],
  },
  q_normality_1: {
    type: "question",
    questionKey: "q_data_normal",
    options: [
      { labelKey: "o_yes", next: "r_one_sample_t" },
      { labelKey: "o_no", next: "r_wilcoxon" },
      { labelKey: "o_not_sure", next: "r_one_sample_t" },
    ],
  },
  q_paired: {
    type: "question",
    questionKey: "q_paired_or_independent",
    options: [
      { labelKey: "o_independent", next: "q_normal_ind" },
      { labelKey: "o_paired", next: "q_normal_paired" },
    ],
  },
  q_normal_ind: {
    type: "question",
    questionKey: "q_data_normal",
    options: [
      { labelKey: "o_yes", next: "r_independent_t" },
      { labelKey: "o_no", next: "r_mann_whitney" },
      { labelKey: "o_not_sure", next: "r_independent_t" },
    ],
  },
  q_normal_paired: {
    type: "question",
    questionKey: "q_data_normal",
    options: [
      { labelKey: "o_yes", next: "r_paired_t" },
      { labelKey: "o_no", next: "r_wilcoxon" },
      { labelKey: "o_not_sure", next: "r_paired_t" },
    ],
  },
  q_dv_type: {
    type: "question",
    questionKey: "q_dv_continuous_or_categorical",
    options: [
      { labelKey: "o_continuous", next: "q_multi_normality" },
      { labelKey: "o_categorical", next: "r_chi_square" },
    ],
  },
  q_multi_normality: {
    type: "question",
    questionKey: "q_data_normal",
    options: [
      { labelKey: "o_yes", next: "r_anova" },
      { labelKey: "o_no", next: "r_kruskal" },
      { labelKey: "o_not_sure", next: "r_anova" },
    ],
  },
  q_relationship: {
    type: "question",
    questionKey: "q_predict_or_associate",
    options: [
      { labelKey: "o_associate", next: "r_correlation" },
      { labelKey: "o_predict", next: "r_regression" },
    ],
  },

  // Result nodes
  r_independent_t: {
    type: "result",
    testKey: "r_independent_t",
    descriptionKey: "r_independent_t_desc",
    href: "/calculators/t-test",
  },
  r_paired_t: {
    type: "result",
    testKey: "r_paired_t",
    descriptionKey: "r_paired_t_desc",
    href: "/calculators/t-test",
  },
  r_mann_whitney: {
    type: "result",
    testKey: "r_mann_whitney",
    descriptionKey: "r_mann_whitney_desc",
    href: "/calculators/mann-whitney",
  },
  r_wilcoxon: {
    type: "result",
    testKey: "r_wilcoxon",
    descriptionKey: "r_wilcoxon_desc",
    href: "/calculators/wilcoxon",
  },
  r_one_sample_t: {
    type: "result",
    testKey: "r_one_sample_t",
    descriptionKey: "r_one_sample_t_desc",
    href: "/calculators/one-sample-t",
  },
  r_anova: {
    type: "result",
    testKey: "r_anova",
    descriptionKey: "r_anova_desc",
    href: "/calculators/anova",
  },
  r_kruskal: {
    type: "result",
    testKey: "r_kruskal",
    descriptionKey: "r_kruskal_desc",
    href: "/calculators/anova",
  },
  r_chi_square: {
    type: "result",
    testKey: "r_chi_square",
    descriptionKey: "r_chi_square_desc",
    href: "/calculators/chi-square",
  },
  r_correlation: {
    type: "result",
    testKey: "r_correlation",
    descriptionKey: "r_correlation_desc",
    href: "/calculators/correlation",
  },
  r_regression: {
    type: "result",
    testKey: "r_regression",
    descriptionKey: "r_regression_desc",
    href: "/calculators/regression",
  },
  r_descriptive: {
    type: "result",
    testKey: "r_descriptive",
    descriptionKey: "r_descriptive_desc",
    href: "/calculators/descriptive",
  },
};

export function DecisionTreeWizard() {
  const t = useTranslations("wizard");
  const [history, setHistory] = useState<NodeId[]>(["start"]);
  const currentId = history[history.length - 1];
  const node = tree[currentId];

  function handleSelect(next: NodeId) {
    setHistory((prev) => [...prev, next]);
  }

  function handleBack() {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  }

  function handleReset() {
    setHistory(["start"]);
  }

  const progress = Math.min(history.length / 4, 1);

  if (node.type === "result") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-sm">
              &#10003;
            </span>
            {t("recommendation")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-green-900">
              {t(node.testKey)}
            </h3>
            <p className="mt-2 text-sm text-green-800">
              {t(node.descriptionKey)}
            </p>
          </div>

          {/* Path summary */}
          <div className="rounded-md bg-white/60 p-3">
            <p className="mb-2 text-xs font-semibold text-green-700">
              {t("yourPath")}
            </p>
            <div className="flex flex-wrap gap-1">
              {history.map((id, i) => {
                const n = tree[id];
                if (n.type === "question") {
                  return (
                    <span
                      key={i}
                      className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700"
                    >
                      {t(n.questionKey)}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={node.href as "/calculators/t-test"}
              className="flex-1 rounded-md bg-green-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              {t("goToCalculator")}
            </Link>
            <Button variant="outline" onClick={handleReset}>
              {t("startOver")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t(node.questionKey)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {node.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt.next)}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              {t(opt.labelKey)}
            </button>
          ))}
        </CardContent>
      </Card>

      {history.length > 1 && (
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleBack} className="flex-1">
            {t("back")}
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            {t("startOver")}
          </Button>
        </div>
      )}
    </div>
  );
}

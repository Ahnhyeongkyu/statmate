"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ExpertReviewForm() {
  const t = useTranslations("expertReview");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent(
      `[StatMate Expert Review] ${data.get("researchType")}`
    );
    const body = encodeURIComponent(
      `Research Type: ${data.get("researchType")}\n` +
        `Email: ${data.get("email")}\n\n` +
        `Data Description:\n${data.get("dataDescription")}\n\n` +
        `Analysis Results:\n${data.get("analysisResults")}`
    );

    window.open(
      `mailto:contact.statmate@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="mt-4 text-lg font-semibold text-green-800">
          {t("form.successTitle")}
        </h3>
        <p className="mt-2 text-sm text-green-700">{t("form.successMsg")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.researchType")}
        </label>
        <select
          name="researchType"
          required
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">{t("form.selectType")}</option>
          <option value="Experimental">{t("form.types.experimental")}</option>
          <option value="Survey">{t("form.types.survey")}</option>
          <option value="Observational">{t("form.types.observational")}</option>
          <option value="Meta-analysis">{t("form.types.metaAnalysis")}</option>
          <option value="Other">{t("form.types.other")}</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.email")}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.dataDescription")}
        </label>
        <textarea
          name="dataDescription"
          required
          rows={4}
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={t("form.dataPlaceholder")}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.analysisResults")}
        </label>
        <textarea
          name="analysisResults"
          required
          rows={6}
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={t("form.resultsPlaceholder")}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {loading ? "..." : t("form.submit")}
      </Button>

      <p className="text-center text-xs text-gray-400">{t("form.note")}</p>
    </form>
  );
}

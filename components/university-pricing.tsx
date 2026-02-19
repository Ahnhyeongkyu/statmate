"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function UniversityContactForm() {
  const t = useTranslations("university");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent(
      `[StatMate University License] ${data.get("institution")}`
    );
    const body = encodeURIComponent(
      `Institution: ${data.get("institution")}\n` +
        `Department: ${data.get("department")}\n` +
        `Contact: ${data.get("contactName")}\n` +
        `Email: ${data.get("email")}\n` +
        `Estimated Users: ${data.get("students")}`
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.institution")}
        </label>
        <input
          type="text"
          name="institution"
          required
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.department")}
        </label>
        <input
          type="text"
          name="department"
          required
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.contactName")}
        </label>
        <input
          type="text"
          name="contactName"
          required
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.email")}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t("form.students")}
        </label>
        <select
          name="students"
          required
          className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="">--</option>
          <option value="1-50">1–50</option>
          <option value="51-200">51–200</option>
          <option value="201-500">201–500</option>
          <option value="500+">500+</option>
        </select>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {loading ? "..." : t("form.submit")}
      </Button>
    </form>
  );
}

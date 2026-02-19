"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterSignup({ variant = "default" }: { variant?: "default" | "footer" | "inline" }) {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={variant === "footer" ? "text-sm text-green-400" : "rounded-lg border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700"}>
        {t("success")}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "..." : t("button")}
        </button>
      </form>
    );
  }

  return (
    <div className="w-full rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="mx-auto max-w-lg text-center">
        <h3 className="text-lg font-bold text-gray-900">{t("title")}</h3>
        <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            required
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "loading" ? "..." : t("button")}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-xs text-red-500">{t("error")}</p>
        )}
        <p className="mt-2 text-xs text-gray-400">{t("privacy")}</p>
      </div>
    </div>
  );
}

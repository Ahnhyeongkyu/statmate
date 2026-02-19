import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HistoryPanel } from "@/components/history-panel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "history" });
  return {
    title: t("title"),
    description: t("title"),
    alternates: { canonical: "/history" },
  };
}

export default async function HistoryPage() {
  const t = await getTranslations("history");

  return (
    <div className="mx-auto max-w-3xl py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">{t("title")}</h1>
      <HistoryPanel />
    </div>
  );
}

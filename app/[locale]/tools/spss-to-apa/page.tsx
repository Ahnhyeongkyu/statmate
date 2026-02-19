import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SPSSConverter } from "./converter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "spssConverter" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/tools/spss-to-apa" },
  };
}

export default async function SPSSToAPAPage() {
  return (
    <div>
      <SPSSConverter />
    </div>
  );
}

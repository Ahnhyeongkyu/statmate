import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CronbachAlphaCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cronbachAlpha" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/cronbach-alpha" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cronbach's Alpha Calculator - StatMate",
  description:
    "Free online Cronbach's Alpha calculator for reliability analysis. Item statistics, split-half reliability, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Cronbach's Alpha",
    "Item-total correlations",
    "Alpha-if-deleted",
    "Split-half reliability",
    "Spearman-Brown prophecy",
    "APA 7th edition formatted results",
  ],
};

export default async function CronbachAlphaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("cronbachAlpha");
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-2 text-gray-500">{t("description")}</p>
      </div>

      <CronbachAlphaCalculator />

      <AdUnit slot="cronbach-alpha-mid" format="horizontal" />

      <RelatedCalculators current="/calculators/cronbach-alpha" />
    </div>
  );
}

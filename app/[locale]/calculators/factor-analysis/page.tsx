import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FactorAnalysisCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { AdUnit } from "@/components/adsense";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "factorAnalysis" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/factor-analysis" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Factor Analysis Calculator - StatMate",
  description:
    "Free online Factor Analysis calculator. KMO test, Bartlett's test, PCA/PAF extraction, Varimax/Promax rotation, eigenvalues, factor loadings, communalities, variance explained, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "KMO test",
    "Bartlett's test of sphericity",
    "PCA extraction",
    "PAF extraction",
    "Varimax rotation",
    "Promax rotation",
    "Eigenvalues",
    "Factor loadings",
    "Communalities",
    "Variance explained",
    "APA 7th edition formatted results",
  ],
};

export default async function FactorAnalysisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("factorAnalysis");
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

      <FactorAnalysisCalculator />

      <AdUnit slot="factor-analysis-mid" format="horizontal" />

      <RelatedCalculators current="/calculators/factor-analysis" />
    </div>
  );
}

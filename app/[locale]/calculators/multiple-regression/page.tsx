import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MultipleRegressionCalculator } from "./calculator";
import { RelatedCalculators } from "@/components/related-calculators";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "multipleRegression" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/calculators/multiple-regression" },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Multiple Regression Calculator - StatMate",
  description:
    "Free online multiple regression calculator with R², coefficients, VIF, ANOVA table, and APA-formatted results.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Multiple linear regression",
    "R-squared and Adjusted R-squared",
    "F-test for overall model significance",
    "Standardized and unstandardized coefficients",
    "Variance Inflation Factor (VIF)",
    "ANOVA table",
    "Durbin-Watson statistic",
    "95% confidence intervals for coefficients",
    "APA 7th edition formatted results",
  ],
};

export default async function MultipleRegressionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("multipleRegression");
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

      <MultipleRegressionCalculator />

      <RelatedCalculators current="/calculators/multiple-regression" />
    </div>
  );
}

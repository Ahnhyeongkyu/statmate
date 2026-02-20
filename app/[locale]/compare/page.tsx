import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "compare" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/compare" },
  };
}

const tools = ["statmate", "spss", "r", "excel"] as const;

const featureKeys = [
  "price",
  "apaFormat",
  "browserBased",
  "privacy",
  "aiInterpretation",
  "pdfExport",
  "wordExport",
  "csvUpload",
  "advancedTests",
  "programmability",
  "learningCurve",
  "effectSize",
  "postHoc",
  "assumptions",
] as const;

export default async function ComparePage() {
  const t = await getTranslations("compare");

  const comparisonJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("metaTitle"),
    description: t("metaDescription"),
  };

  return (
    <div className="mx-auto max-w-5xl py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonJsonLd) }}
      />

      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      <p className="mt-2 text-gray-500">{t("description")}</p>

      {/* Comparison Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-3 text-left font-semibold">{t("feature")}</th>
              {tools.map((tool) => (
                <th
                  key={tool}
                  className={`py-3 text-center font-semibold ${tool === "statmate" ? "text-blue-600" : ""}`}
                >
                  {t(`tools.${tool}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {featureKeys.map((key) => (
              <tr key={key}>
                <td className="py-2.5 font-medium text-gray-700">
                  {t(`features.${key}.label`)}
                </td>
                {tools.map((tool) => (
                  <td key={tool} className="py-2.5 text-center text-gray-600">
                    {t(`features.${key}.${tool}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {(["whenStatmate", "whenSpss", "whenR", "whenExcel"] as const).map(
          (key) => (
            <div key={key} className="rounded-lg border bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                {t(`summary.${key}.title`)}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {t(`summary.${key}.text`)}
              </p>
            </div>
          )
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
        <p className="mt-2 text-blue-100">{t("ctaDescription")}</p>
        <Link href="/calculators/t-test">
          <Button className="mt-6 bg-white text-blue-600 hover:bg-blue-50">
            {t("ctaButton")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

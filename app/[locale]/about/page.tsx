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
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-900">StatMate</strong>{" "}
          {t("mission")}
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          {t("missionTitle")}
        </h2>
        <p>{t("mission")}</p>

        <h2 className="text-xl font-semibold text-gray-900">
          {t("differenceTitle")}
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t("differences.apa")}</li>
          <li>{t("differences.privacy")}</li>
          <li>{t("differences.builtBy")}</li>
          <li>{t("differences.free")}</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">
          {t("calculatorsTitle")}
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>{t("calculatorsList.ttest")}</li>
          <li>{t("calculatorsList.anova")}</li>
          <li>{t("calculatorsList.chiSquare")}</li>
          <li>{t("calculatorsList.correlation")}</li>
          <li>{t("calculatorsList.descriptive")}</li>
          <li>{t("calculatorsList.regression")}</li>
          <li>{t("calculatorsList.sampleSize")}</li>
          <li>{t("calculatorsList.oneSampleT")}</li>
          <li>{t("calculatorsList.mannWhitney")}</li>
          <li>{t("calculatorsList.wilcoxon")}</li>
          <li>{t("calculatorsList.multipleRegression")}</li>
          <li>{t("calculatorsList.cronbachAlpha")}</li>
          <li>{t("calculatorsList.logisticRegression")}</li>
          <li>{t("calculatorsList.factorAnalysis")}</li>
          <li>{t("calculatorsList.kruskalWallis")}</li>
          <li>{t("calculatorsList.repeatedMeasures")}</li>
          <li>{t("calculatorsList.twoWayAnova")}</li>
          <li>{t("calculatorsList.friedman")}</li>
          <li>{t("calculatorsList.fisherExact")}</li>
          <li>{t("calculatorsList.mcnemar")}</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">
          {t("teamTitle")}
        </h2>
        <p>{t("teamDescription")}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["stat", "apa", "tech"] as const).map((key) => (
            <div key={key} className="rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-900">{t(`team.${key}.title`)}</h3>
              <p className="text-sm text-gray-600">{t(`team.${key}.description`)}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          {t("contactTitle")}
        </h2>
        <p>{t("contactText")}</p>
        <p>
          {t("contactEmail")}{" "}
          <a
            href="mailto:contact.statmate@gmail.com"
            className="text-blue-600 hover:underline"
          >
            contact.statmate@gmail.com
          </a>
        </p>
      </div>

      <div className="mt-12">
        <Link href="/calculators/t-test">
          <Button>{t("ctaButton")}</Button>
        </Link>
      </div>
    </div>
  );
}

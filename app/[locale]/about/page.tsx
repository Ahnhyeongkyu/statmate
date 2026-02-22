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
    alternates: {
      canonical: "/about",
      languages: {
        en: "/about",
        ko: "/ko/about",
        ja: "/ja/about",
        "x-default": "/about",
      },
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>

      <div className="mt-8 space-y-6 leading-relaxed text-gray-600 dark:text-gray-300">
        <p>
          <strong className="text-gray-900 dark:text-white">StatMate</strong>{" "}
          {t("mission")}
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("missionTitle")}
        </h2>
        <p>{t("mission")}</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("differenceTitle")}
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t("differences.apa")}</li>
          <li>{t("differences.privacy")}</li>
          <li>{t("differences.builtBy")}</li>
          <li>{t("differences.free")}</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("teamTitle")}
        </h2>
        <p>{t("teamDescription")}</p>

        {/* Origin Story */}
        <div className="rounded-xl border bg-blue-50 p-6 dark:border-gray-700 dark:bg-blue-950/30">
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t("teamOrigin.title")}</h3>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{t("teamOrigin.desc")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["stat", "apa", "tech"] as const).map((key) => (
            <div key={key} className="rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{t(`team.${key}.title`)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t(`team.${key}.description`)}</p>
            </div>
          ))}
        </div>

        {/* How to Cite */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("citationTitle")}
        </h2>
        <p>{t("citationDescription")}</p>
        <div className="space-y-4">
          {(["apa", "mla", "chicago"] as const).map((style) => (
            <div key={style} className="rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t(`citation.${style}.label`)}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                {t(`citation.${style}.text`)}
              </p>
            </div>
          ))}
        </div>

        {/* Methodology */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("methodologyTitle")}
        </h2>
        <p>{t("methodologyDescription")}</p>
        <div className="space-y-3">
          {(["parametric", "nonParametric", "regression", "other"] as const).map((cat) => (
            <div key={cat} className="rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                {t(`methodology.${cat}.title`)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t(`methodology.${cat}.tests`)}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("methodologyNote")}</p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("contactTitle")}
        </h2>
        <p>{t("contactText")}</p>
        <p>
          {t("contactEmail")}{" "}
          <a
            href="mailto:contact.statmate@gmail.com"
            className="text-blue-600 hover:underline dark:text-blue-400"
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

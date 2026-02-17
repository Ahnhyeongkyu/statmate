import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DecisionTreeWizard } from "./wizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return {
    title: isKo
      ? "통계 검정 선택 마법사"
      : "Statistical Test Selection Wizard",
    description: isKo
      ? "몇 가지 질문에 답하면 적합한 통계 검정을 추천해드립니다."
      : "Answer a few questions and we'll recommend the right statistical test for your data.",
  };
}

export default async function WizardPage() {
  const t = await getTranslations("wizard");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("title")}
        </h1>
        <p className="mt-2 text-gray-500">
          {t("subtitle")}
        </p>
      </div>
      <DecisionTreeWizard />
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ExpertReviewForm } from "@/components/expert-review-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "expertReview" });
  return {
    title: t("form.pageTitle"),
    description: t("description"),
    alternates: {
      canonical: "/expert-review/request",
      languages: {
        en: "/expert-review/request",
        ko: "/ko/expert-review/request",
        ja: "/ja/expert-review/request",
        "x-default": "/expert-review/request",
      },
    },
  };
}

export default async function ExpertReviewRequestPage() {
  const t = await getTranslations("expertReview");

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="text-2xl font-bold text-gray-900">{t("form.pageTitle")}</h1>
      <p className="mt-2 text-sm text-gray-500">{t("form.pageDescription")}</p>

      <div className="mt-8">
        <ExpertReviewForm />
      </div>
    </div>
  );
}

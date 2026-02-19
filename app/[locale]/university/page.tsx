import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { UniversityContactForm } from "@/components/university-pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "university" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/university" },
  };
}

export default async function UniversityPage() {
  const t = await getTranslations("university");

  const features = [
    { icon: "🔓", text: t("features.f1") },
    { icon: "👥", text: t("features.f2") },
    { icon: "📊", text: t("features.f3") },
    { icon: "🛟", text: t("features.f4") },
    { icon: "🎨", text: t("features.f5") },
  ];

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-center text-gray-500">
        {t("description")}
      </p>

      {/* Price Card */}
      <div className="mt-12 w-full max-w-md rounded-xl border-2 border-purple-500 bg-white p-8 text-center shadow-lg">
        <div className="text-4xl font-bold text-gray-900">{t("price")}</div>
        <p className="mt-2 text-sm text-gray-500">{t("priceNote")}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {features.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700"
            >
              {f.icon} {f.text}
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {t("benefitsTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900">{t("benefit1.title")}</h3>
            <p className="mt-2 text-sm text-gray-600">{t("benefit1.desc")}</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900">{t("benefit2.title")}</h3>
            <p className="mt-2 text-sm text-gray-600">{t("benefit2.desc")}</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900">{t("benefit3.title")}</h3>
            <p className="mt-2 text-sm text-gray-600">{t("benefit3.desc")}</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900">{t("benefit4.title")}</h3>
            <p className="mt-2 text-sm text-gray-600">{t("benefit4.desc")}</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mt-16 w-full max-w-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {t("contactTitle")}
        </h2>
        <UniversityContactForm />
      </section>
    </div>
  );
}

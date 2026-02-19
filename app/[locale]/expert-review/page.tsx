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
  const t = await getTranslations({ locale, namespace: "expertReview" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/expert-review" },
  };
}

export default async function ExpertReviewPage() {
  const t = await getTranslations("expertReview");

  const features = [
    { icon: "⏱", text: t("features.f1") },
    { icon: "🎓", text: t("features.f2") },
    { icon: "📝", text: t("features.f3") },
    { icon: "💬", text: t("features.f4") },
  ];

  const steps = [
    { num: "1", text: t("steps.s1") },
    { num: "2", text: t("steps.s2") },
    { num: "3", text: t("steps.s3") },
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
      <div className="mt-12 w-full max-w-md rounded-xl border-2 border-blue-500 bg-white p-8 text-center shadow-lg">
        <div className="text-4xl font-bold text-gray-900">{t("price")}</div>
        <p className="mt-2 text-sm text-gray-500">{t("priceNote")}</p>
        <Link href="/expert-review/request" className="mt-6 block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            {t("cta")}
          </Button>
        </Link>
      </div>

      {/* Features */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {t("whyTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 rounded-lg border p-4">
              <span className="text-2xl">{f.icon}</span>
              <p className="text-sm text-gray-700">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-16 w-full max-w-2xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {t("howTitle")}
        </h2>
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {s.num}
              </div>
              <p className="pt-1 text-gray-700">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 w-full max-w-xl rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">{t("ctaBottom")}</h2>
        <p className="mt-2 text-blue-100">{t("ctaBottomSub")}</p>
        <Link href="/expert-review/request">
          <Button className="mt-6 bg-white text-blue-600 hover:bg-blue-50">
            {t("cta")}
          </Button>
        </Link>
      </section>
    </div>
  );
}

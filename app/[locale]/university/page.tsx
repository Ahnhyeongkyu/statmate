import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
    alternates: {
      canonical: "/university",
      languages: {
        en: "/university",
        ko: "/ko/university",
        ja: "/ja/university",
        "x-default": "/university",
      },
    },
  };
}

export default async function UniversityPage() {
  const t = await getTranslations("university");

  const features = [
    { icon: "\uD83D\uDD13", text: t("features.f1") },
    { icon: "\uD83D\uDC65", text: t("features.f2") },
    { icon: "\uD83D\uDCCA", text: t("features.f3") },
    { icon: "\uD83D\uDEDF", text: t("features.f4") },
    { icon: "\uD83C\uDFA8", text: t("features.f5") },
  ];

  const useCases = [
    { title: t("useCases.uc1.title"), desc: t("useCases.uc1.desc") },
    { title: t("useCases.uc2.title"), desc: t("useCases.uc2.desc") },
    { title: t("useCases.uc3.title"), desc: t("useCases.uc3.desc") },
  ];

  const faqs = [
    { q: t("faqs.0.q"), a: t("faqs.0.a") },
    { q: t("faqs.1.q"), a: t("faqs.1.a") },
    { q: t("faqs.2.q"), a: t("faqs.2.a") },
  ];

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-center text-gray-500 dark:text-gray-400">
        {t("description")}
      </p>

      {/* Price Card */}
      <div className="mt-12 w-full max-w-md rounded-xl border-2 border-purple-500 bg-white p-8 text-center shadow-lg dark:border-purple-400 dark:bg-gray-800">
        <div className="text-4xl font-bold text-gray-900 dark:text-white">{t("price")}</div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t("priceNote")}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {features.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            >
              {f.icon} {f.text}
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("benefitsTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">{t("benefit1.title")}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("benefit1.desc")}</p>
          </div>
          <div className="rounded-lg border p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">{t("benefit2.title")}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("benefit2.desc")}</p>
          </div>
          <div className="rounded-lg border p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">{t("benefit3.title")}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("benefit3.desc")}</p>
          </div>
          <div className="rounded-lg border p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">{t("benefit4.title")}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("benefit4.desc")}</p>
          </div>
        </div>
      </section>

      {/* Cost Comparison Table */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("comparison.title")}
        </h2>
        <div className="overflow-x-auto rounded-xl border shadow-sm dark:border-gray-700">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{t("comparison.feature")}</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{t("comparison.spss")}</th>
                <th className="px-6 py-4 font-semibold text-purple-700 dark:text-purple-400">{t("comparison.statmate")}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{t("comparison.rows.cost.label")}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t("comparison.rows.cost.spss")}</td>
                <td className="px-6 py-4 font-medium text-purple-700 dark:text-purple-400">{t("comparison.rows.cost.statmate")}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{t("comparison.rows.install.label")}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t("comparison.rows.install.spss")}</td>
                <td className="px-6 py-4 font-medium text-purple-700 dark:text-purple-400">{t("comparison.rows.install.statmate")}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{t("comparison.rows.apa.label")}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t("comparison.rows.apa.spss")}</td>
                <td className="px-6 py-4 font-medium text-purple-700 dark:text-purple-400">{t("comparison.rows.apa.statmate")}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{t("comparison.rows.ai.label")}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t("comparison.rows.ai.spss")}</td>
                <td className="px-6 py-4 font-medium text-purple-700 dark:text-purple-400">{t("comparison.rows.ai.statmate")}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">{t("comparison.rows.device.label")}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{t("comparison.rows.device.spss")}</td>
                <td className="px-6 py-4 font-medium text-purple-700 dark:text-purple-400">{t("comparison.rows.device.statmate")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("useCases.title")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {useCases.map((uc, i) => (
            <div key={i} className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-lg dark:bg-purple-900/40">
                {i === 0 ? "\uD83D\uDCD6" : i === 1 ? "\uD83C\uDF93" : "\uD83D\uDCBB"}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{uc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ for Procurement */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900 dark:text-white">
                {faq.q}
                <svg className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mt-16 w-full max-w-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("contactTitle")}
        </h2>
        <UniversityContactForm />
      </section>
    </div>
  );
}

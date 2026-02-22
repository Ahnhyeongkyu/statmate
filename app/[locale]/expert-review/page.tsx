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
    alternates: {
      canonical: "/expert-review",
      languages: {
        en: "/expert-review",
        ko: "/ko/expert-review",
        ja: "/ja/expert-review",
        "x-default": "/expert-review",
      },
    },
  };
}

export default async function ExpertReviewPage() {
  const t = await getTranslations("expertReview");

  const features = [
    { icon: "\u23F1", text: t("features.f1") },
    { icon: "\uD83C\uDF93", text: t("features.f2") },
    { icon: "\uD83D\uDCDD", text: t("features.f3") },
    { icon: "\uD83D\uDCAC", text: t("features.f4") },
  ];

  const steps = [
    { num: "1", text: t("steps.s1") },
    { num: "2", text: t("steps.s2") },
    { num: "3", text: t("steps.s3") },
  ];

  const reviewers = [
    { title: t("reviewers.r1.title"), desc: t("reviewers.r1.desc") },
    { title: t("reviewers.r2.title"), desc: t("reviewers.r2.desc") },
  ];

  const sampleItems = [
    t("sample.items.0"),
    t("sample.items.1"),
    t("sample.items.2"),
    t("sample.items.3"),
  ];

  const faqs = [
    { q: t("faqs.0.q"), a: t("faqs.0.a") },
    { q: t("faqs.1.q"), a: t("faqs.1.a") },
    { q: t("faqs.2.q"), a: t("faqs.2.a") },
    { q: t("faqs.3.q"), a: t("faqs.3.a") },
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
      <div className="mt-12 w-full max-w-md rounded-xl border-2 border-blue-500 bg-white p-8 text-center shadow-lg dark:border-blue-400 dark:bg-gray-800">
        <div className="text-4xl font-bold text-gray-900 dark:text-white">{t("price")}</div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t("priceNote")}</p>
        <Link href="/expert-review/request" className="mt-6 block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            {t("cta")}
          </Button>
        </Link>
      </div>

      {/* Features */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("whyTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 rounded-lg border p-4 dark:border-gray-700 dark:bg-gray-800">
              <span className="text-2xl">{f.icon}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-16 w-full max-w-2xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("howTitle")}
        </h2>
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {s.num}
              </div>
              <p className="pt-1 text-gray-700 dark:text-gray-300">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Reviewers */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("reviewers.title")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviewers.map((r, i) => (
            <div key={i} className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl dark:bg-blue-900">
                {i === 0 ? "\uD83C\uDF93" : "\uD83D\uDCDA"}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="mt-16 w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("sample.title")}
        </h2>
        <div className="rounded-xl border bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <ul className="space-y-4">
            {sampleItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Satisfaction Guarantee */}
      <section className="mt-16 w-full max-w-3xl">
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl dark:bg-green-900">
            &#x2705;
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("guarantee.title")}
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {t("guarantee.desc")}
          </p>
        </div>
      </section>

      {/* FAQ */}
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

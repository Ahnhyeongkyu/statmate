import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StatMate",
  description:
    "Free online statistics calculators with APA-formatted results. T-test, ANOVA, Chi-square, Correlation, and Descriptive Statistics.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.google.com/search?q=site:statmate-red.vercel.app+{search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "StatMate",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const calculatorSlugs = [
  { key: "ttest" as const, href: "/calculators/t-test" as const, icon: "T", badge: true },
  { key: "anova" as const, href: "/calculators/anova" as const, icon: "F", badge: false },
  { key: "chiSquare" as const, href: "/calculators/chi-square" as const, icon: "\u03C7\u00B2", badge: false },
  { key: "correlation" as const, href: "/calculators/correlation" as const, icon: "r", badge: false },
  { key: "descriptive" as const, href: "/calculators/descriptive" as const, icon: "\u03BC", badge: false },
  { key: "regression" as const, href: "/calculators/regression" as const, icon: "\u0177", badge: false },
  { key: "sampleSize" as const, href: "/calculators/sample-size" as const, icon: "N", badge: false },
  { key: "oneSampleT" as const, href: "/calculators/one-sample-t" as const, icon: "t\u2081", badge: false },
  { key: "mannWhitney" as const, href: "/calculators/mann-whitney" as const, icon: "U", badge: false },
  { key: "wilcoxon" as const, href: "/calculators/wilcoxon" as const, icon: "W", badge: false },
];

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 pb-12 pt-8 text-center md:pb-16 md:pt-12">
        <Badge variant="secondary" className="text-sm">
          {t("badge")}
        </Badge>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          {t("heroTitle1")}
          <br />
          <span className="text-blue-600">{t("heroTitle2")}</span>
        </h1>
        <p className="max-w-xl text-base text-gray-500 md:text-lg">
          {t("heroDescription")}
        </p>
        <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:px-0">
          <Link
            href="/calculators/t-test"
            className="rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t("ctaTry")}
          </Link>
          <a
            href="#calculators"
            className="rounded-full border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t("ctaViewAll")}
          </a>
        </div>
      </section>

      {/* Wizard CTA */}
      <section className="w-full pb-8">
        <Link href="/wizard">
          <div className="rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-6 text-center transition-colors hover:border-blue-400 hover:bg-blue-50">
            <p className="text-lg font-semibold text-blue-900">
              {t("wizardCta")}
            </p>
            <p className="mt-1 text-sm text-blue-600">
              {t("wizardCtaSub")}
            </p>
          </div>
        </Link>
      </section>

      {/* Calculators Grid */}
      <section id="calculators" className="w-full pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {t("calculatorsTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculatorSlugs.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-lg font-semibold italic text-blue-600">
                      {calc.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {t(`calculators.${calc.key}.name`)}
                      </CardTitle>
                      {calc.badge && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {t("badge_mostPopular")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t(`calculators.${calc.key}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {t("whyTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl">
              &check;
            </div>
            <h3 className="mb-2 font-semibold">{t("why.apa.title")}</h3>
            <p className="text-sm text-gray-500">{t("why.apa.description")}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">
              &#9889;
            </div>
            <h3 className="mb-2 font-semibold">{t("why.instant.title")}</h3>
            <p className="text-sm text-gray-500">{t("why.instant.description")}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-xl">
              &#128196;
            </div>
            <h3 className="mb-2 font-semibold">{t("why.export.title")}</h3>
            <p className="text-sm text-gray-500">{t("why.export.description")}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {t("howTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {(["step1", "step2", "step3"] as const).map((step, i) => (
            <div key={step} className="rounded-lg border bg-white p-6 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mb-2 font-semibold">{t(`how.${step}.title`)}</h3>
              <p className="text-sm text-gray-500">{t(`how.${step}.description`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Validation & Trust */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {t("trustTitle")}
        </h2>
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {t("trust.validatedTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {t("trust.validatedDescription")}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  T-test: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">t.test()</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  ANOVA: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">aov()</code> + Bonferroni post-hoc
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  Chi-square: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">chisq.test()</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                  Correlation: Validated against R <code className="rounded bg-gray-100 px-1 text-xs">cor.test()</code>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {t("trust.privacyTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {t("trust.privacyDescription")}
              </p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {(["clientSide", "noAccount", "https", "openMethodology"] as const).map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-green-500">&check;</span>
                    {t(`trust.${item}`)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Interpretation Preview */}
      <section className="w-full pb-12 md:pb-16">
        <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
          {t("aiTitle")}
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">
          {t("aiSubtitle")}
        </p>
        <div className="rounded-lg border bg-white p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-600">
            {t("aiSampleLabel")}
          </p>
          <div className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-400">{t("aiPaperReady")}</p>
              <p className="mt-1 text-sm italic text-gray-700">
                An independent-samples t-test revealed that participants in the
                experimental condition (<em>M</em> = 88.07, <em>SD</em> = 4.94)
                scored significantly higher than those in the control condition
                (<em>M</em> = 79.07, <em>SD</em> = 3.15), <em>t</em>(23.47) =
                5.87, <em>p</em> &lt; .001, <em>d</em> = 2.15, 95% CI [5.82,
                12.18].
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-400">{t("aiPlainLanguage")}</p>
              <p className="mt-1 text-sm text-gray-700">
                The new teaching method produced substantially higher exam
                scores — about 9 points higher on average. This is a very large
                effect, meaning the difference would be immediately noticeable
                in a classroom setting. The probability of seeing this
                difference by chance alone is less than 1 in 1,000.
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {t("aiCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full pb-8">
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">{t("bottomCta.title")}</h2>
          <p className="mt-2 text-blue-100">{t("bottomCta.description")}</p>
          <Link
            href="/calculators/t-test"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            {t("bottomCta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}

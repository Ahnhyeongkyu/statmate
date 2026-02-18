import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Link } from "@/i18n/routing";
import { routing, type Locale } from "@/i18n/routing";
import { MobileMenu } from "@/components/mobile-menu";
import { HeaderProButton } from "@/components/header-pro-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AdSenseScript } from "@/components/adsense";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ErrorBoundaryInit } from "@/components/error-boundary-init";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

const BASE_URL = "https://statmate-red.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: isKo
        ? "StatMate - 무료 온라인 통계 계산기"
        : "StatMate - Free Online Statistics Calculators",
      template: "%s | StatMate",
    },
    description: isKo
      ? "APA 형식 결과를 제공하는 무료 온라인 통계 계산기. T-검정, 분산분석, 카이제곱, 상관분석 등. APA 7판 형식으로 Word 내보내기."
      : "Free online statistics calculators with APA-formatted results. T-test, ANOVA, Chi-square, Correlation, and more. Export results to Word in APA 7th edition format.",
    keywords: isKo
      ? [
          "통계 계산기",
          "t-검정 계산기",
          "분산분석 계산기",
          "카이제곱 계산기",
          "상관분석 계산기",
          "기술통계",
          "APA 형식",
          "통계학",
          "p값 계산기",
          "효과 크기",
        ]
      : [
          "statistics calculator",
          "t-test calculator",
          "anova calculator",
          "chi-square calculator",
          "correlation calculator",
          "descriptive statistics",
          "APA format",
          "statistics",
          "p-value calculator",
          "effect size",
          "APA 7th edition",
        ],
    openGraph: {
      title: isKo
        ? "StatMate - 무료 온라인 통계 계산기"
        : "StatMate - Free Online Statistics Calculators",
      description: isKo
        ? "APA 형식 결과를 제공하는 무료 온라인 통계 계산기. T-검정, 분산분석, 카이제곱, 상관분석 등."
        : "Free online statistics calculators with APA-formatted results. T-test, ANOVA, Chi-square, Correlation & more.",
      type: "website",
      locale: isKo ? "ko_KR" : "en_US",
      siteName: "StatMate",
    },
    twitter: {
      card: "summary_large_image",
      title: isKo
        ? "StatMate - 무료 온라인 통계 계산기"
        : "StatMate - Free Online Statistics Calculators",
      description: isKo
        ? "APA 형식 결과를 제공하는 무료 통계 계산기. 한 번의 클릭으로 Word 내보내기."
        : "Free statistics calculators with APA-formatted results. Export to Word in one click.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        en: "/",
        ko: "/ko",
      },
    },
    verification: {
      google: "SJKzxgIMfb4cH-F8oxgQXRyFMQN2JMryg22qZH0CKDk",
    },
  };
}

const calculatorKeys = [
  { key: "ttest" as const, href: "/calculators/t-test" },
  { key: "anova" as const, href: "/calculators/anova" },
  { key: "chiSquare" as const, href: "/calculators/chi-square" },
  { key: "correlation" as const, href: "/calculators/correlation" },
  { key: "descriptive" as const, href: "/calculators/descriptive" },
];

const allCalculatorKeys = [
  ...calculatorKeys,
  { key: "regression" as const, href: "/calculators/regression" },
  { key: "sampleSize" as const, href: "/calculators/sample-size" },
  { key: "oneSampleT" as const, href: "/calculators/one-sample-t" },
  { key: "mannWhitney" as const, href: "/calculators/mann-whitney" },
  { key: "wilcoxon" as const, href: "/calculators/wilcoxon" },
  { key: "multipleRegression" as const, href: "/calculators/multiple-regression" },
  { key: "cronbachAlpha" as const, href: "/calculators/cronbach-alpha" },
  { key: "logisticRegression" as const, href: "/calculators/logistic-regression" },
  { key: "factorAnalysis" as const, href: "/calculators/factor-analysis" },
  { key: "kruskalWallis" as const, href: "/calculators/kruskal-wallis" },
  { key: "repeatedMeasures" as const, href: "/calculators/repeated-measures" },
  { key: "twoWayAnova" as const, href: "/calculators/two-way-anova" },
  { key: "friedman" as const, href: "/calculators/friedman" },
  { key: "fisherExact" as const, href: "/calculators/fisher-exact" },
  { key: "mcnemar" as const, href: "/calculators/mcnemar" },
];

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations("layout");

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {/* Skip to content */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
          >
            {t("skipToContent")}
          </a>

          {/* Header */}
          <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                  S
                </div>
                <span className="text-xl font-bold">StatMate</span>
              </Link>

              <nav className="hidden items-center gap-1 md:flex">
                {calculatorKeys.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    {t(`nav.${calc.key}`)}
                  </Link>
                ))}
                <Link
                  href="/wizard"
                  className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                >
                  {t("nav.wizard")}
                </Link>
                <Link
                  href="/blog"
                  className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {t("nav.blog")}
                </Link>
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <LanguageSwitcher />
                <HeaderProButton />
              </div>

              <MobileMenu />
            </div>
          </header>

          {/* Main Content */}
          <main
            id="main-content"
            className="mx-auto min-h-[calc(100vh-8rem)] max-w-6xl px-4 py-8"
          >
            {children}
          </main>

          <AdSenseScript />
          <GoogleAnalytics />
          <ErrorBoundaryInit />
          <Analytics />
          <SpeedInsights />

          {/* Footer */}
          <footer className="border-t bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-12">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                      S
                    </div>
                    <span className="text-lg font-bold">StatMate</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {t("brandDescription")}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    {t("footer.calculators")}
                  </h3>
                  <ul className="space-y-2">
                    {allCalculatorKeys.map((calc) => (
                      <li key={calc.href}>
                        <Link
                          href={calc.href}
                          className="text-sm text-gray-500 hover:text-gray-900"
                        >
                          {t(`nav.${calc.key}`)} {t("footer.calculatorSuffix")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    {t("footer.product")}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/pricing"
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {t("pricing")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {t("footer.about")}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    {t("footer.legal")}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/privacy"
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {t("footer.privacyPolicy")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {t("footer.termsOfService")}
                      </Link>
                    </li>
                    <li>
                      <a
                        href="mailto:contact.statmate@gmail.com"
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {t("footer.contact")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

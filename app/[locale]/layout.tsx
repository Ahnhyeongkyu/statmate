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
import { ThemeToggle } from "@/components/theme-toggle";
import { AdSenseScript } from "@/components/adsense";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ErrorBoundaryInit } from "@/components/error-boundary-init";
import { FeedbackButton } from "@/components/feedback-button";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { AuthProvider } from "@/components/auth-provider";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

const BASE_URL = "https://statmate.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";
  const isJa = locale === "ja";

  const titles: Record<string, string> = {
    en: "StatMate - Free Online Statistics Calculators",
    ko: "StatMate - 무료 온라인 통계 계산기",
    ja: "StatMate - 無料オンライン統計計算ツール",
  };
  const descriptions: Record<string, string> = {
    en: "Free online statistics calculators with APA-formatted results. T-test, ANOVA, Chi-square, Correlation, and more. Export results to Word in APA 7th edition format.",
    ko: "APA 형식 결과를 제공하는 무료 온라인 통계 계산기. T-검정, 분산분석, 카이제곱, 상관분석 등. APA 7판 형식으로 Word 내보내기.",
    ja: "APA形式の結果を提供する無料オンライン統計計算ツール。t検定、分散分析、カイ二乗検定、相関分析など。APA第7版形式でWordエクスポート。",
  };

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: titles[locale] ?? titles.en,
      template: "%s | StatMate",
    },
    description: descriptions[locale] ?? descriptions.en,
    keywords: isJa
      ? [
          "統計計算ツール",
          "t検定",
          "分散分析",
          "カイ二乗検定",
          "相関分析",
          "APA形式",
          "統計学",
          "p値",
          "効果量",
        ]
      : isKo
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
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: "website",
      locale: isJa ? "ja_JP" : isKo ? "ko_KR" : "en_US",
      siteName: "StatMate",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
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
        ja: "/ja",
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googleadservices.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
          {/* Skip to content */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
          >
            {t("skipToContent")}
          </a>

          {/* Header */}
          <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                  S
                </div>
                <span className="text-xl font-bold dark:text-white">StatMate</span>
              </Link>

              <nav className="hidden items-center gap-1 md:flex">
                {calculatorKeys.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
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
                  className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {t("nav.blog")}
                </Link>
                <Link
                  href="/tools/spss-to-apa"
                  className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {t("nav.tools")}
                </Link>
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <ThemeToggle />
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
          <FeedbackButton />
          <Analytics />
          <SpeedInsights />
          <ServiceWorkerRegister />

          {/* Footer */}
          <footer className="border-t bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto max-w-6xl px-4 py-12">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                      S
                    </div>
                    <span className="text-lg font-bold dark:text-white">StatMate</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t("brandDescription")}
                  </p>
                  <NewsletterSignup variant="footer" />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                    {t("footer.calculators")}
                  </h3>
                  <ul className="space-y-2">
                    {allCalculatorKeys.map((calc) => (
                      <li key={calc.href}>
                        <Link
                          href={calc.href}
                          className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          {t(`nav.${calc.key}`)} {t("footer.calculatorSuffix")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                    {t("footer.product")}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/pricing"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("pricing")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.about")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/compare"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.compare")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tools/spss-to-apa"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.spssConverter")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/expert-review"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.expertReview")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/university"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.university")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/validation"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.validation")}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                    {t("footer.legal")}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/privacy"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.privacyPolicy")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.termsOfService")}
                      </Link>
                    </li>
                    <li>
                      <a
                        href="mailto:contact.statmate@gmail.com"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        {t("footer.contact")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </div>
            </div>
          </footer>
        </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

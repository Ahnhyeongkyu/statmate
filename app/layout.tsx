import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StatMate - Free Online Statistics Calculators",
    template: "%s | StatMate",
  },
  description:
    "Free online statistics calculators with APA-formatted results. T-test, ANOVA, Chi-square, Correlation, and more. Export results to Word in APA 7th edition format.",
  keywords: [
    "statistics calculator",
    "t-test calculator",
    "anova calculator",
    "chi-square calculator",
    "APA format",
    "statistics",
    "p-value calculator",
  ],
  openGraph: {
    title: "StatMate - Free Online Statistics Calculators",
    description:
      "Free online statistics calculators with APA-formatted results.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const calculators = [
  { name: "T-Test", href: "/calculators/t-test" },
  { name: "ANOVA", href: "/calculators/anova" },
  { name: "Chi-Square", href: "/calculators/chi-square" },
  { name: "Correlation", href: "/calculators/correlation" },
  { name: "Descriptive", href: "/calculators/descriptive" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
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
              {calculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {calc.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link
                href="/pricing"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-6xl px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                    S
                  </div>
                  <span className="text-lg font-bold">StatMate</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Your Statistics Companion. Free online calculators with
                  APA-formatted results.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Calculators
                </h3>
                <ul className="space-y-2">
                  {calculators.map((calc) => (
                    <li key={calc.href}>
                      <Link
                        href={calc.href}
                        className="text-sm text-gray-500 hover:text-gray-900"
                      >
                        {calc.name} Calculator
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Product
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <span className="text-sm text-gray-500">
                      APA 7th Edition Guide
                    </span>
                  </li>
                  <li>
                    <span className="text-sm text-gray-500">
                      Statistics Tutorials
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t pt-8 text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} StatMate. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

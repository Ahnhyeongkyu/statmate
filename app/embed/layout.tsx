import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import { AuthProvider } from "@/components/auth-provider";
import "../globals.css";

// Separate root layout for embeddable widgets. Deliberately excludes the site
// header/footer, AdSense, Google Analytics, service worker, and LemonSqueezy
// overlay — none of those belong inside a third-party iframe. We keep only the
// providers the reused calculator components depend on (next-intl + auth ctx).

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function EmbedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <AuthProvider>{children}</AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

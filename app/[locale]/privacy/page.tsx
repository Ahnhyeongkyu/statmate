import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/privacy",
      languages: {
        en: "/privacy",
        ko: "/ko/privacy",
        ja: "/ja/privacy",
        "x-default": "/privacy",
      },
    },
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <div className="mx-auto max-w-3xl py-8">
      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: February 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            1. Overview
          </h2>
          <p>
            StatMate (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
            committed to protecting your privacy. This policy explains how we
            collect, use, and safeguard your information when you use our website
            at statmate.org.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            2. Data We Collect
          </h2>
          <h3 className="mb-2 font-semibold text-gray-800">
            Data We Do NOT Collect
          </h3>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <strong>Your raw data stays on your device.</strong> All
              statistical calculations run entirely in your browser. Your data is
              never uploaded to our servers.
            </li>
            <li>We do not require account creation or login.</li>
            <li>We do not collect names, emails, or personal identifiers for free tier usage.</li>
          </ul>

          <h3 className="mb-2 mt-4 font-semibold text-gray-800">
            Data We May Collect
          </h3>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <strong>AI Interpretation (Pro):</strong> When you use the AI
              interpretation feature, computed statistics (not raw data) are sent
              to our server to generate interpretations. These are not stored
              after the response is delivered.
            </li>
            <li>
              <strong>Payment Information (Pro):</strong> Payments are processed
              by Lemon Squeezy. We do not store credit card numbers. See{" "}
              <a
                href="https://www.lemonsqueezy.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Lemon Squeezy&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Analytics:</strong> We use Vercel Analytics to collect
              anonymous usage data (page views, device type, country). No
              personally identifiable information is collected.
            </li>
            <li>
              <strong>Advertising:</strong> We use Google AdSense, which may use
              cookies to serve personalized ads. You can opt out at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google Ad Settings
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            3. Cookies
          </h2>
          <p>
            We use essential cookies for site functionality. Third-party cookies
            may be set by Google AdSense for ad personalization and Vercel for
            analytics. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            4. Data Security
          </h2>
          <p>
            We implement industry-standard security measures. All connections use
            HTTPS encryption. Since calculations run client-side, your research
            data never traverses our network.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            5. Third-Party Services
          </h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Vercel (hosting and analytics)</li>
            <li>Google AdSense (advertising)</li>
            <li>Lemon Squeezy (payment processing)</li>
            <li>Anthropic (AI interpretation processing)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            6. Your Rights
          </h2>
          <p>
            You may request deletion of any data associated with your account by
            contacting us. Since we collect minimal data, in most cases there is
            nothing to delete.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this policy from time to time. Changes will be posted
            on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            8. Contact
          </h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a
              href="mailto:contact.statmate@gmail.com"
              className="text-blue-600 underline"
            >
              contact.statmate@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: "en" | "ko") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <button
      onClick={() => switchLocale(locale === "en" ? "ko" : "en")}
      className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
      aria-label={locale === "en" ? "한국어로 전환" : "Switch to English"}
    >
      {locale === "en" ? "한국어" : "EN"}
    </button>
  );
}

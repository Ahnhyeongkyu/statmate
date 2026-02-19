"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const localeLabels: Record<string, string> = {
  en: "EN",
  ko: "한국어",
  ja: "日本語",
};

const localeOrder = ["en", "ko", "ja"] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as "en" | "ko" | "ja" });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        aria-label="Switch language"
      >
        {localeLabels[locale] ?? locale.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[100px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {localeOrder
            .filter((l) => l !== locale)
            .map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {localeLabels[l]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

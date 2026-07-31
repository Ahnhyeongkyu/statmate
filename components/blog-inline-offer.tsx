"use client";

/**
 * Mid-article $9 report offer (Q-260730-08 ③).
 *
 * Blog posts carried no paid offer at all — the only paywall lived behind a
 * calculator run, so a reader who arrived from search and left after reading
 * never saw a price. This renders once, mid-body, on every post.
 *
 * ★ It must never call getVariant(): that helper *assigns* an ab_result_offer_v2
 * cookie on first read, so calling it here would enrol readers who never reach a
 * result screen into the running result_offer_v2 experiment and poison its
 * denominator. We only read an already-assigned cookie, and stay silent for the
 * control arm so a user who was randomised to "credits" is not shown the $9 arm.
 */

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { REPORT_CHECKOUT_URL, REPORT_PRICE, reportOfferReady } from "@/lib/offer";

function readAssignedArm(): "A" | "B" | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )ab_result_offer_v2=([^;]*)/);
  const v = m ? decodeURIComponent(m[1]) : null;
  return v === "A" || v === "B" ? v : null;
}

export function BlogInlineOffer({ calculator }: { calculator: string }) {
  const t = useTranslations("pro");
  const [suppressed, setSuppressed] = useState(true);

  useEffect(() => {
    setSuppressed(readAssignedArm() === "A");
  }, []);

  if (!reportOfferReady() || suppressed) return null;

  return (
    <aside className="my-10 rounded-xl border border-blue-200 bg-blue-50/60 p-6">
      <p className="text-base font-semibold text-gray-900">
        {t("blogOfferTitle")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        {t("blogOfferBody")}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={REPORT_CHECKOUT_URL}
          data-ime-cta="blog-inline-report-9"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {t("reportOfferCta", { price: REPORT_PRICE })}
        </a>
        <Link
          href={`/calculators/${calculator}`}
          className="text-sm font-medium text-blue-700 underline underline-offset-2"
        >
          {t("blogOfferFree")}
        </Link>
      </div>
      <p className="mt-3 text-xs text-gray-600">
        {t("reportOfferOnce", { price: REPORT_PRICE })} · {t("trustRefund")}
      </p>
    </aside>
  );
}

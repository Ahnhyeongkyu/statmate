"use client";

/**
 * paperstat 대행 다운셀 (Q-260730-08 ④).
 *
 * statmate $9 = 자력 사용자의 마지막 10%, paperstat 45,000원 = 비자력 100% 대행.
 * 계산기 결과까지 왔는데 "이걸 어떻게 해석해서 쓰지"에서 이탈하는 사용자가
 * 내려갈 경로가 두 제품 사이에 없었다 — 전역 푸터 배너뿐이라 결과 화면에서는
 * 보이지 않았다.
 *
 * ★ ko 한정: 영문 결과 화면에서는 result_offer_v2 A/B가 돌고 있어 새 CTA를
 * 얹으면 실험이 오염된다. paperstat 자체도 한국어 대행 서비스라 en/ja 사용자에게
 * 보일 이유가 없다(그래서 문구도 messages/ko.json에만 둔다).
 *
 * 클릭 계측은 data-ime-cta 전역 핸들러(lib/imeTrack.ts)가 cta_click으로 자동
 * 수집한다 — 별도 track() 호출을 붙이지 않는다.
 */

import { useLocale, useTranslations } from "next-intl";

const PAPERSTAT_BASE = "https://paperstat.vercel.app/";

export function PaperstatDownsell({ surface }: { surface: "result" | "wizard" }) {
  const locale = useLocale();
  const t = useTranslations("downsell");

  if (locale !== "ko") return null;

  const href = `${PAPERSTAT_BASE}?utm_source=statmate&utm_medium=${surface}_downsell&utm_campaign=cross_promo`;

  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900 dark:bg-amber-950/20">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {t("title")}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {t("body")}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        data-ime-cta={`paperstat-downsell-${surface}`}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-500 px-4 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-500 hover:text-white dark:text-amber-300"
      >
        {t("cta")}
      </a>
      <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
        {t("note")}
      </p>
    </div>
  );
}

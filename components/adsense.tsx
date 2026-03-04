"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useIsPro } from "@/components/activate-pro";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

/** Actual AdSense ad unit slot IDs */
export const AD_SLOTS = {
  /** Display ad for calculator pages */
  calculator: "4914141943",
  /** In-article ad for blog pages */
  blog: "7939760535",
} as const;

/** Google AdSense script loader — lazy-loads after page idle */
export function AdSenseScript() {
  if (!ADSENSE_ID) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}

/** Display ad unit — place between content sections */
export function AdUnit({
  slot,
  format = "auto",
  layout,
  className = "",
}: {
  slot: string;
  format?: "auto" | "fluid" | "vertical" | "rectangle";
  layout?: "in-article";
  className?: string;
}) {
  const isPro = useIsPro();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ADSENSE_ID || isPro) return;

    const timer = setTimeout(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
        setLoaded(true);
      } catch {
        // adsbygoogle not loaded yet
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isPro]);

  if (!ADSENSE_ID || isPro) return null;

  const minHeight =
    format === "rectangle" ? 250 : format === "vertical" ? 600 : 100;

  const style: React.CSSProperties = layout === "in-article"
    ? { display: "block", textAlign: "center" as const }
    : { display: "block" };

  return (
    <div
      className={`my-6 text-center overflow-hidden ${className}`}
      style={{ minHeight: loaded ? undefined : minHeight }}
    >
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : {})}
        data-full-width-responsive="true"
      />
    </div>
  );
}

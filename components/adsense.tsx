"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useIsPro } from "@/components/activate-pro";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

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

/** In-article ad unit — place between content sections */
export function AdUnit({
  slot,
  format = "auto",
  className = "",
}: {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}) {
  const isPro = useIsPro();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ADSENSE_ID || isPro) return;

    // Delay ad initialization to avoid blocking main thread
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
  }, []);

  if (!ADSENSE_ID || isPro) return null;

  const minHeight =
    format === "rectangle" ? 250 : format === "vertical" ? 600 : 100;

  return (
    <div
      className={`my-6 text-center overflow-hidden ${className}`}
      style={{ minHeight: loaded ? undefined : minHeight }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

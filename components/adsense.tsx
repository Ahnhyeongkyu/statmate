"use client";

import { useEffect } from "react";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

/** Google AdSense script loader — add once in layout */
export function AdSenseScript() {
  if (!ADSENSE_ID) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
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
  useEffect(() => {
    if (!ADSENSE_ID) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not loaded yet
    }
  }, []);

  if (!ADSENSE_ID) return null;

  return (
    <div className={`my-6 text-center ${className}`}>
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

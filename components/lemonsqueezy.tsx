"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Setup: (config: {
        eventHandler: (event: { event: string; data?: unknown }) => void;
      }) => void;
    };
  }
}

function setupLemonSqueezy() {
  window.createLemonSqueezy?.();
  window.LemonSqueezy?.Setup({
    eventHandler: ({ event }) => {
      if (event === "Checkout.Success") {
        window.dispatchEvent(new CustomEvent("lemon:checkout-success"));
      }
    },
  });
}

export function LemonSqueezyOverlay() {
  useEffect(() => {
    setupLemonSqueezy();
  }, []);

  return (
    <Script
      src="https://app.lemonsqueezy.com/js/lemon.js"
      strategy="lazyOnload"
      onLoad={() => setupLemonSqueezy()}
    />
  );
}

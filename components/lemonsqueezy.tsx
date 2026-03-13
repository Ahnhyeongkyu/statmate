"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

export function LemonSqueezyOverlay() {
  useEffect(() => {
    window.createLemonSqueezy?.();
  }, []);

  return (
    <Script
      src="https://app.lemonsqueezy.com/js/lemon.js"
      strategy="lazyOnload"
      onLoad={() => window.createLemonSqueezy?.()}
    />
  );
}

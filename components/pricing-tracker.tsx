"use client";

import { useEffect } from "react";
import { trackPricingPageView } from "@/lib/analytics";

export function PricingTracker() {
  useEffect(() => {
    trackPricingPageView();
  }, []);
  return null;
}

"use client";

/**
 * CMP-129 Pricing leak detector.
 *
 * Fires a leak_detected event if an existing paid user somehow ends up on the
 * Track B variant ($9.99). This should always read zero before launch and in
 * PostHog dashboards.
 */

import { useEffect } from "react";
import { isExistingPaidUser } from "@/lib/pricing-eligibility";
import { track } from "@/lib/imeTrack";

export function PricingLeakDetector({ renderedArm }: { renderedArm: string }) {
  useEffect(() => {
    if (renderedArm === "track_b_v1" && isExistingPaidUser()) {
      // Should never happen. If this fires, eligibility filter has a bug.
      track("pricing_variant_leak", {
        rendered_arm: renderedArm,
        expected_arm: "control",
        variant: "cmp129_track_b_v1",
      });
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "[CMP-129] LEAK: existing paid user rendered track_b_v1 — eligibility filter broken"
        );
      }
    }
  }, [renderedArm]);

  return null;
}

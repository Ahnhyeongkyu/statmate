"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getVariant } from "@/lib/ab-test";

interface ABVariantProps {
  testId: string;
  variant: "A" | "B";
  children: ReactNode;
}

/**
 * Render children only if the user is in the specified variant.
 *
 * Usage:
 *   <ABVariant testId="pricing_cta" variant="A">
 *     <button>Get Pro Now</button>
 *   </ABVariant>
 *   <ABVariant testId="pricing_cta" variant="B">
 *     <button>Start Free Trial</button>
 *   </ABVariant>
 */
export function ABVariant({ testId, variant, children }: ABVariantProps) {
  const [assigned, setAssigned] = useState<"A" | "B" | null>(null);

  useEffect(() => {
    setAssigned(getVariant(testId));
  }, [testId]);

  if (assigned === null || assigned !== variant) return null;
  return <>{children}</>;
}

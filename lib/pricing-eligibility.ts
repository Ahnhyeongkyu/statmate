"use client";

/**
 * CMP-129 Track B eligibility filter.
 *
 * Existing paid users (statmate_pro in localStorage with valid:true) always
 * see legacy pricing. New / free users are eligible for the Track B variant.
 *
 * Hard rule: never expose a paid user to a higher price they didn't agree to.
 */

const PRO_STORAGE_KEY = "statmate_pro";

export type PricingArm = "control" | "track_b_v1";

/**
 * Synchronously checks localStorage for an existing Pro record.
 * Safe to call during hydration — returns false if window is unavailable.
 */
export function isExistingPaidUser(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(PRO_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as { valid?: boolean; expiresAt?: string };
    if (data.expiresAt && new Date(data.expiresAt) < new Date()) return false;
    return data.valid === true;
  } catch {
    return false;
  }
}

/**
 * Returns the pricing arm for the current user.
 * Existing paid users always get "control" (legacy pricing).
 * Everyone else gets "track_b_v1" (new 3-rung pricing).
 */
export function getPricingArm(): PricingArm {
  if (isExistingPaidUser()) return "control";
  return "track_b_v1";
}

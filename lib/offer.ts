/**
 * Single source of truth for the paid offer (Q-260730-03).
 *
 * Checkout URLs were duplicated across components, so copy and cart could drift.
 * The $9 one-time report is env-injected: when the LemonSqueezy product does not
 * exist yet the B arm is disabled entirely, so no visitor is ever shown a price
 * the cart cannot honour.
 */

import { getVariant } from "@/lib/ab-test";

export const CHECKOUT_CREDITS =
  "https://statmate.lemonsqueezy.com/checkout/buy/4ed009d2-951e-417b-8042-01281876d8dd?embed=1";
export const CHECKOUT_MONTHLY =
  "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1";
export const CHECKOUT_ANNUAL =
  "https://statmate.lemonsqueezy.com/checkout/buy/11ac7ea9-a760-42bd-b500-137699a9f339?embed=1";

/** $9 one-time full report — set once the LS product exists. */
export const REPORT_CHECKOUT_URL = (
  process.env.NEXT_PUBLIC_LS_CHECKOUT_REPORT || ""
).trim();

/** Displayed price of the one-time report. Must match the LS product. */
export const REPORT_PRICE = (
  process.env.NEXT_PUBLIC_REPORT_PRICE || "$9"
).trim();

export function reportOfferReady(): boolean {
  return REPORT_CHECKOUT_URL.startsWith("https://");
}

/**
 * result_offer_v2 arm. Client-side only (reads the A/B cookie).
 * Falls back to "A" (current offer) whenever the report product is missing.
 */
export function getOfferArmV2(): "A" | "B" {
  if (!reportOfferReady()) return "A";
  return getVariant("result_offer_v2");
}

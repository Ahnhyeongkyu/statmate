/**
 * Simple cookie-based A/B testing framework.
 * Assigns users to variants deterministically using a cookie,
 * and reports variant assignments to GA4.
 */

type Variant = "A" | "B";

interface ABTest {
  name: string;
  variants: [string, string]; // [A label, B label]
}

// Active experiments — add new tests here
export const activeTests: Record<string, ABTest> = {
  pricing_cta: {
    name: "Pricing CTA Copy",
    variants: ["Get Pro Now", "Start Free Trial"],
  },
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days = 90) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

/**
 * Get the variant for a given test.
 * Persists assignment in a cookie for consistency.
 */
export function getVariant(testId: string): Variant {
  const cookieKey = `ab_${testId}`;
  const existing = getCookie(cookieKey);
  if (existing === "A" || existing === "B") return existing;

  const variant: Variant = Math.random() < 0.5 ? "A" : "B";
  setCookie(cookieKey, variant);

  // Report to GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "ab_test_assign", {
      event_category: "ab_test",
      event_label: testId,
      ab_variant: variant,
    });
  }

  return variant;
}

/**
 * Track a conversion event for an A/B test.
 */
export function trackABConversion(testId: string, action: string) {
  const variant = getVariant(testId);
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "ab_conversion", {
      event_category: "ab_test",
      event_label: `${testId}_${action}`,
      ab_variant: variant,
    });
  }
}

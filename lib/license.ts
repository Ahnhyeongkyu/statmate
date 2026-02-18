// Shared license validation utilities for API routes

const licenseCache = new Map<
  string,
  { valid: boolean; expiresAt: number }
>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Validate a license key against Lemon Squeezy API with in-memory caching.
 * Returns true if the license is valid, false otherwise.
 */
export async function validateLicense(licenseKey: string): Promise<boolean> {
  if (!licenseKey || licenseKey.trim().length < 10) return false;

  const key = licenseKey.trim();
  const cached = licenseCache.get(key);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.valid;
  }

  try {
    const res = await fetch(
      "https://api.lemonsqueezy.com/v1/licenses/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license_key: key }),
      }
    );
    const data = await res.json();
    const valid = res.ok && data.valid === true;
    licenseCache.set(key, { valid, expiresAt: Date.now() + CACHE_TTL });
    return valid;
  } catch {
    return false;
  }
}

// --- Rate Limiting ---

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW = 60 * 1000; // 1 minute

/**
 * Simple IP-based rate limiter.
 * Returns true if the request is allowed, false if rate-limited.
 */
export function rateLimitCheck(ip: string, limit = 10): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  entry.count++;
  if (entry.count > limit) return false;
  return true;
}

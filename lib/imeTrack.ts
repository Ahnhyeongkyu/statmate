"use client";

// Minimal client-side IME-1 tracker for statmate.
// Mirrors @ahdr/ime-track conventions but vendored to avoid cross-repo dep.
// Events: landing_view, cta_click, signup_started, paid_conversion (server-side).

import posthog from "posthog-js";

const SAAS = "statmate";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const UTM_STORAGE_KEY = "ime_utm_v1";
const UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30d
const DEFAULT_HOST = "https://us.i.posthog.com";
// 유통 v2 (5/31): first-touch source — utm_source OR referrer 도출(chatgpt/direct 등).
//   ChatGPT/direct 같은 referrer 기반 task-intent 유입을 paid_conversion에 귀속하기 위함.
const SOURCE_STORAGE_KEY = "ime_source_v1";

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

interface State {
  initialized: boolean;
  utm: Utm;
  source: string;
  signupFired: WeakSet<Element>;
  ctaFired: WeakSet<Element>;
  debug: boolean;
}

const state: State = {
  initialized: false,
  utm: {},
  source: "",
  signupFired: new WeakSet(),
  ctaFired: new WeakSet(),
  debug: false,
};

// 유통 v2: first-touch source 결정 (utm_source 우선, 없으면 referrer 도메인 → chatgpt/google/copilot/perplexity/direct).
//   localStorage에 first-touch 보존(이후 방문은 최초 소스 유지).
function resolveFirstTouchSource(): string {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(SOURCE_STORAGE_KEY);
      if (stored) return stored;
    } catch {
      /* private mode */
    }
  }
  let src = "direct";
  if (state.utm.utm_source) {
    src = state.utm.utm_source.slice(0, 64);
  } else if (typeof document !== "undefined" && document.referrer) {
    try {
      const h = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (/(chatgpt\.com|chat\.openai\.com|openai\.com)/.test(h)) src = "chatgpt";
      else if (/(copilot\.microsoft\.com|bing\.com)/.test(h)) src = "copilot";
      else if (/perplexity\.ai/.test(h)) src = "perplexity";
      else if (/google\./.test(h)) src = "google";
      else if (/duckduckgo\.com/.test(h)) src = "duckduckgo";
      else if (/(t\.co|twitter\.com|x\.com)/.test(h)) src = "twitter";
      else if (h.includes("statmate.org")) src = "direct"; // 내부 네비게이션은 first-touch 아님
      else src = h.slice(0, 64);
    } catch {
      /* malformed referrer */
    }
  }
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(SOURCE_STORAGE_KEY, src);
    } catch {
      /* private mode */
    }
  }
  return src;
}

function readUtmFromLocation(): Utm {
  const out: Utm = {};
  if (typeof window === "undefined") return out;
  const sp = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = sp.get(k);
    if (v && v.length > 0 && v.length <= 256) out[k] = v;
  }
  return out;
}

function readUtmFromStorage(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { ts?: number; utm?: Utm };
    if (!parsed.ts || Date.now() - parsed.ts > UTM_TTL_MS) return {};
    return parsed.utm ?? {};
  } catch {
    return {};
  }
}

function writeUtmToStorage(utm: Utm): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      UTM_STORAGE_KEY,
      JSON.stringify({ ts: Date.now(), utm }),
    );
  } catch {
    /* quota / private mode — drop silently */
  }
}

export function getPersistedUtm(): Utm {
  return { ...state.utm };
}

function commonProps(extra?: Record<string, unknown>): Record<string, unknown> {
  return { saas: SAAS, source: state.source || "direct", ...state.utm, ...(extra ?? {}) };
}

function capture(event: string, extra?: Record<string, unknown>): void {
  if (!state.initialized) return;
  try {
    posthog.capture(event, commonProps(extra));
  } catch (err) {
    if (state.debug) console.warn("[imeTrack] capture failed", err);
  }
}

function rewriteLemonSqueezyHref(a: HTMLAnchorElement): void {
  if (!a.href || !a.href.includes("statmate.lemonsqueezy.com/checkout/")) return;
  if (a.dataset.imeUtmApplied === "1") return;
  const utm = state.utm;
  try {
    const u = new URL(a.href);
    for (const [k, v] of Object.entries(utm)) {
      if (v) u.searchParams.set(`checkout[custom][${k}]`, v);
    }
    // 유통 v2: utm이 없어도(ChatGPT/direct) source는 항상 부착 → 웹훅 paid_conversion 소스 귀속.
    if (state.source) u.searchParams.set("checkout[custom][source]", state.source);
    a.href = u.toString();
    a.dataset.imeUtmApplied = "1";
  } catch {
    /* malformed URL — leave as-is */
  }
}

function wireCheckoutLinks(): void {
  if (typeof document === "undefined") return;
  // Apply on first user interaction so we catch links added after SSR hydration.
  const sweep = () => {
    document
      .querySelectorAll<HTMLAnchorElement>(
        'a[href*="statmate.lemonsqueezy.com/checkout/"]',
      )
      .forEach(rewriteLemonSqueezyHref);
  };
  sweep();
  document.addEventListener("click", sweep, true);
}

function matchAncestor(target: EventTarget | null, sel: string): HTMLElement | null {
  let el = target as HTMLElement | null;
  while (el && el.nodeType === 1) {
    if (typeof el.matches === "function" && el.matches(sel)) return el;
    el = el.parentElement;
  }
  return null;
}

function wireCtaClicks(): void {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (ev) => {
      const el = matchAncestor(ev.target, "[data-ime-cta]");
      if (!el || state.ctaFired.has(el)) return;
      state.ctaFired.add(el);
      const label =
        el.getAttribute("data-ime-cta") || el.textContent?.trim().slice(0, 64) || "";
      const href = (el as HTMLAnchorElement).href || null;
      capture("cta_click", { cta_label: label, cta_href: href });
    },
    true,
  );
}

function wireSignupFocus(): void {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "focusin",
    (ev) => {
      const el = matchAncestor(ev.target, "[data-ime-form]");
      if (!el || state.signupFired.has(el)) return;
      state.signupFired.add(el);
      const formId = el.getAttribute("data-ime-form") || el.id || null;
      capture("signup_started", { form_id: formId });
    },
    true,
  );
}

export function init(opts: { posthogKey?: string; posthogHost?: string; debug?: boolean } = {}): void {
  if (state.initialized) return;
  if (typeof window === "undefined") return;

  state.debug = opts.debug ?? false;

  // Resolve UTMs: querystring wins, else persisted storage.
  const fromUrl = readUtmFromLocation();
  if (Object.keys(fromUrl).length > 0) {
    state.utm = fromUrl;
    writeUtmToStorage(fromUrl);
  } else {
    state.utm = readUtmFromStorage();
  }
  // 유통 v2: first-touch source (utm_source가 우선, state.utm 결정 후 호출).
  state.source = resolveFirstTouchSource();

  const key = opts.posthogKey ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    if (state.debug) console.warn("[imeTrack] no posthog key — SDK no-op");
    state.initialized = true; // still wire link rewrites
    wireCheckoutLinks();
    wireCtaClicks();
    wireSignupFocus();
    return;
  }

  try {
    posthog.init(key, {
      api_host: opts.posthogHost ?? process.env.NEXT_PUBLIC_POSTHOG_HOST ?? DEFAULT_HOST,
      capture_pageview: false,
      capture_pageleave: false,
      autocapture: false,
      disable_session_recording: true,
      disable_surveys: true,
      persistence: "localStorage+cookie",
      request_batching: false,
      // Smoke tests run in headless Chromium (bot UA). Real bot traffic still
      // gets $browser_type=bot from PostHog server-side, so this is safe.
      opt_out_useragent_filter: true,
    });
  } catch (err) {
    if (state.debug) console.warn("[imeTrack] posthog.init failed", err);
  }

  state.initialized = true;
  wireCheckoutLinks();
  wireCtaClicks();
  wireSignupFocus();
}

export function landingView(path: string): void {
  capture("landing_view", { path });
}

export function track(event: string, props?: Record<string, unknown>): void {
  capture(event, props);
}

// #13 (6/2): 퍼널 보강 — 중간 단계 측정으로 누수 지점 식별.
// landing_view → calculation_done → paywall_view → cta_click → paid_conversion (PostHog 443488).
export function calculationDone(props?: Record<string, unknown>): void {
  capture("calculation_done", props);
}
export function paywallView(props?: Record<string, unknown>): void {
  capture("paywall_view", props);
}

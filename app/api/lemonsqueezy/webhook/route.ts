import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

// Idempotency: drop replayed events. Map<eventId, ts> with 24h TTL.
const seenEvents = new Map<string, number>();
const EVENT_TTL_MS = 24 * 60 * 60 * 1000;

function pruneSeen(): void {
  const cutoff = Date.now() - EVENT_TTL_MS;
  for (const [k, ts] of seenEvents) if (ts < cutoff) seenEvents.delete(k);
}

interface LsWebhookPayload {
  meta?: {
    event_name?: string;
    custom_data?: Record<string, string | undefined>;
  };
  data?: {
    id?: string;
    type?: string;
    attributes?: {
      status?: string;
      total?: number; // cents
      currency?: string;
      variant_id?: number;
      product_name?: string;
      variant_name?: string;
      user_email?: string;
      user_name?: string;
    };
  };
}

async function postPaidConversion(payload: {
  amount: number;
  plan: string;
  currency: string;
  txId: string;
  utm: Record<string, string>;
}): Promise<void> {
  if (!POSTHOG_KEY) return; // no-op until CMP-30 key lands
  const distinctId = payload.txId; // server-side: anchor on tx so it joins with later identifies
  const body = {
    api_key: POSTHOG_KEY,
    event: "paid_conversion",
    distinct_id: distinctId,
    properties: {
      saas: "statmate",
      amount: payload.amount,
      plan: payload.plan,
      currency: payload.currency,
      tx_id: payload.txId,
      ...payload.utm,
      $lib: "statmate-ls-webhook",
    },
    timestamp: new Date().toISOString(),
  };
  try {
    const res = await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.warn("[ls-webhook] posthog capture non-2xx", res.status);
  } catch (err) {
    console.warn("[ls-webhook] posthog capture failed", err);
  }
}

export async function POST(req: NextRequest) {
  if (!SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }
  const rawBody = await req.text();
  const sigHeader = req.headers.get("x-signature") ?? "";
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(rawBody)
    .digest("hex");
  const sigBuf = Buffer.from(sigHeader, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Idempotency on Lemon Squeezy's per-event id (header X-Event-Id, fallback to data.id+event_name).
  pruneSeen();
  const eventId =
    req.headers.get("x-event-id") ||
    (() => {
      try {
        const p = JSON.parse(rawBody) as LsWebhookPayload;
        return `${p.meta?.event_name ?? "unknown"}:${p.data?.id ?? "noid"}`;
      } catch {
        return null;
      }
    })();
  if (eventId) {
    if (seenEvents.has(eventId)) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    seenEvents.set(eventId, Date.now());
  }

  let payload: LsWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as LsWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = payload.meta?.event_name ?? "";
  const attrs = payload.data?.attributes ?? {};
  const isPaidOrder = eventName === "order_created" && attrs.status === "paid";
  const isPaidSubscription =
    eventName === "subscription_created" && (attrs.status === "active" || attrs.status === "on_trial");

  if (!isPaidOrder && !isPaidSubscription) {
    return NextResponse.json({ ok: true, ignored: eventName });
  }

  const customData = payload.meta?.custom_data ?? {};
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    const v = customData[k];
    if (typeof v === "string" && v.length > 0) utm[k] = v;
  }
  // 유통 v2 (5/31): first-touch source (utm OR referrer 도출 — chatgpt/direct 등) → paid_conversion 귀속.
  const src = customData.source;
  if (typeof src === "string" && src.length > 0) utm.source = src.slice(0, 64);

  await postPaidConversion({
    amount: typeof attrs.total === "number" ? attrs.total / 100 : 0,
    plan: attrs.variant_name || attrs.product_name || "unknown",
    currency: attrs.currency ?? "USD",
    txId: payload.data?.id ?? eventId ?? "unknown",
    utm,
  });

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();

function rateLimitCheck(ip: string, maxRequests: number): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.resetTime) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + 3600000 });
    return true;
  }

  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (!rateLimitCheck(ip, 5)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let email: string | undefined;
  let source = "paywall_banner";
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    email = body.email;
    if (typeof body.source === "string" && body.source.length <= 64) source = body.source;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // Vercel 서버리스 FS는 읽기전용(EROFS) → 로컬 파일 저장 불가. Supabase 영속 저장(익명 insert).
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Subscription service is not configured." },
      { status: 503 }
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase
    .from("email_subscribers")
    .insert({ email: email.toLowerCase(), source });

  // 23505 = unique_violation(이미 구독) → 멱등 성공 처리.
  if (error && error.code !== "23505") {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

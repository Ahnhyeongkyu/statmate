import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "subscribers.json");

    await fs.mkdir(dataDir, { recursive: true });

    let subscribers: { email: string; subscribedAt: string }[] = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      subscribers = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json({ success: true });
    }

    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
    });

    await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

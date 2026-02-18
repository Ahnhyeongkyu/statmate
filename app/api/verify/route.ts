import { NextRequest, NextResponse } from "next/server";
import { validateLicense, rateLimitCheck } from "@/lib/license";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimitCheck(ip, 20)) {
    return NextResponse.json(
      { valid: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  try {
    const { licenseKey } = (await request.json()) as {
      licenseKey?: string;
    };

    if (!licenseKey) {
      return NextResponse.json({ valid: false });
    }

    const valid = await validateLicense(licenseKey);
    return NextResponse.json({ valid });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}

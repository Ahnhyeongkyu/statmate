import { NextRequest, NextResponse } from "next/server";

const LS_API_KEY = process.env.LEMONSQUEEZY_API_KEY;

export async function POST(request: NextRequest) {
  if (!LS_API_KEY) {
    return NextResponse.json(
      { error: "Payment system is not configured." },
      { status: 503 }
    );
  }

  try {
    const { licenseKey } = (await request.json()) as { licenseKey: string };

    if (!licenseKey || licenseKey.trim().length < 10) {
      return NextResponse.json(
        { error: "Invalid license key" },
        { status: 400 }
      );
    }

    // Validate license key via Lemon Squeezy API
    const res = await fetch(
      "https://api.lemonsqueezy.com/v1/licenses/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license_key: licenseKey.trim() }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "License validation failed" },
        { status: 400 }
      );
    }

    const data = await res.json();

    if (!data.valid) {
      return NextResponse.json(
        { error: data.error || "Invalid or expired license key" },
        { status: 400 }
      );
    }

    // License is valid — return success with expiry info
    return NextResponse.json({
      valid: true,
      customerName: data.meta?.customer_name || "",
      expiresAt: data.license_key?.expires_at || null,
    });
  } catch (error) {
    console.error("License activation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

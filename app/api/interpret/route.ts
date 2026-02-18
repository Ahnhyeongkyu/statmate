import { NextRequest, NextResponse } from "next/server";
import { validateLicense } from "@/lib/license";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5-20250929";

interface InterpretRequest {
  testType: "t-test" | "anova" | "chi-square" | "correlation" | "descriptive" | "regression" | "sample-size" | "one-sample-t" | "mann-whitney" | "wilcoxon";
  results: Record<string, unknown>;
  language: "en" | "ko";
  licenseKey?: string;
}

interface InterpretResponse {
  paperReady: string;
  interpretation: string;
  caveats: string;
}

function buildPrompt(req: InterpretRequest): string {
  const langInstruction =
    req.language === "ko"
      ? "Respond entirely in Korean. Use formal academic Korean (합니다체)."
      : "Respond entirely in English.";

  const testNames: Record<string, string> = {
    "t-test": "t-test",
    anova: "one-way ANOVA",
    "chi-square": "chi-square test",
    correlation: "correlation analysis",
    descriptive: "descriptive statistics",
    regression: "simple linear regression",
    "sample-size": "sample size / power analysis",
    "one-sample-t": "one-sample t-test",
    "mann-whitney": "Mann-Whitney U test",
    wilcoxon: "Wilcoxon signed-rank test",
  };

  return `You are a statistics expert helping researchers interpret their results for academic publication.

${langInstruction}

Test type: ${testNames[req.testType]}
Results: ${JSON.stringify(req.results, null, 2)}

Provide exactly three sections, separated by "---":

1. PAPER_READY: A single publication-ready result sentence in APA 7th edition format. Use proper statistical notation. If p < .001, write "p < .001". Include effect size.

2. INTERPRETATION: A plain-language interpretation (2-3 sentences) that someone without statistics training can understand. Explain what the numbers mean in practical terms.

3. CAVEATS: 1-2 important caveats or limitations (e.g., assumptions that should be checked, sample size concerns, generalizability).

Format your response exactly as:
PAPER_READY: [sentence]
---
INTERPRETATION: [paragraph]
---
CAVEATS: [paragraph]`;
}

function parseResponse(text: string): InterpretResponse {
  const sections = text.split("---").map((s) => s.trim());

  const paperReady = (sections[0] || "")
    .replace(/^PAPER_READY:\s*/i, "")
    .trim();
  const interpretation = (sections[1] || "")
    .replace(/^INTERPRETATION:\s*/i, "")
    .trim();
  const caveats = (sections[2] || "")
    .replace(/^CAVEATS:\s*/i, "")
    .trim();

  return { paperReady, interpretation, caveats };
}

export async function POST(request: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI interpretation is not configured. Set ANTHROPIC_API_KEY." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as InterpretRequest;

    if (!body.testType || !body.results) {
      return NextResponse.json(
        { error: "Missing testType or results" },
        { status: 400 }
      );
    }

    // Server-side Pro license validation
    if (!body.licenseKey) {
      return NextResponse.json(
        { error: "Pro license required" },
        { status: 403 }
      );
    }

    const isValidLicense = await validateLicense(body.licenseKey);
    if (!isValidLicense) {
      return NextResponse.json(
        { error: "Invalid or expired license" },
        { status: 403 }
      );
    }

    const prompt = buildPrompt(body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    const result = parseResponse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Interpret API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

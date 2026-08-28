// Deep health check (Q-260828-04) — 200 on the page does not mean the backend is alive.
// A sibling service (nomusa) had its free-tier Supabase project auto-paused after 7 idle days
// on 2026-08-27; the site kept serving 200 while login/checkout were dead and no monitor
// noticed. Status-code monitoring cannot see that class of failure, so the service reports
// DB/auth reachability itself. Returns 503 on failure so a watcher needs no body parsing.
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIMEOUT_MS = 8000;

type Check = { ok: boolean; status: number | null; ms: number; error?: string };

async function probe(url: string, headers: Record<string, string>): Promise<Check> {
  const started = Date.now();
  try {
    const res = await fetch(url, { headers, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
    // 4xx is RLS/permission, not death. Death is 5xx and network failure.
    return { ok: res.status < 500, status: res.status, ms: Date.now() - started };
  } catch (e) {
    // A paused project loses its API subdomain — DNS failure lands here.
    return { ok: false, status: null, ms: Date.now() - started, error: e instanceof Error ? e.message : "fetch failed" };
  }
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const at = new Date().toISOString();

  if (!url || !anon) {
    return NextResponse.json(
      { ok: false, service: "statmate", at, error: "supabase env missing" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Expose the project ref (a public URL subdomain, not a secret) so the watcher can confirm
  // the project it polls for status is the one prod actually uses. A mismatch means blind monitoring.
  const project = url.replace(/^https?:\/\//, "").split(".")[0];
  const headers = { apikey: anon, Authorization: `Bearer ${anon}` };
  const [db, auth] = await Promise.all([
    // analysis_history has RLS on — anon gets 0 rows, which still proves reachability.
    probe(`${url}/rest/v1/analysis_history?select=id&limit=1`, headers),
    probe(`${url}/auth/v1/health`, headers),
  ]);

  const ok = db.ok && auth.ok;
  return NextResponse.json(
    { ok, service: "statmate", at, project, checks: { db, auth } },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}

/**
 * APA inferential statistic line built from the user's OWN result object.
 *
 * Paywall preview used a hard-coded sample text, so a visitor never saw their
 * own numbers before paying (Q-260730-03 진단: 914 paywall_view → 10 cta_click).
 * This formats the deterministic part of the report locally (no AI call) so the
 * preview shows real numbers and only the written interpretation stays blurred.
 *
 * Field names mirror each lib/statistics/*.ts Result interface and its own
 * format*APA() — those formatters are the source of truth for shape and
 * rounding. This file is a duplicate on purpose: importing all 15 statistics
 * modules into the paywall component would ship every calculator's math to
 * every page. Returns null when the result shape is unknown — the caller falls
 * back to the static sample preview.
 */

function num(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function obj(v: unknown): Record<string, unknown> | null {
  return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : null;
}

/** APA p-value: no leading zero, p < .001 floor. */
function apaP(p: number): string {
  if (p < 0.001) return "p < .001";
  return `p = ${p.toFixed(3).replace(/^0/, "")}`;
}

/** APA decimal: no leading zero when |v| < 1. */
function apaDec(v: number, digits = 2): string {
  const s = v.toFixed(digits);
  return Math.abs(v) < 1 ? s.replace(/^(-?)0/, "$1") : s;
}

/** df is fractional for Welch t and Greenhouse-Geisser corrections. */
function dfStr(v: number): string {
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
}

export function formatApaLine(
  testType: string,
  r: Record<string, unknown>
): string | null {
  // Shape is checked before testType: the two-way and repeated-measures pages
  // both pass testType="anova" (they share the ANOVA preview strings), so the
  // string alone cannot tell those three result shapes apart.
  const factorA = obj(r.factorA);
  const residual = obj(r.residual);
  if (factorA && residual) {
    // Two-way ANOVA — headline is the Factor A main effect.
    const f = num(factorA.f);
    const dfA = num(factorA.df);
    const dfE = num(residual.df);
    const fp = num(factorA.p);
    if (f === null || dfA === null || dfE === null || fp === null) return null;
    const eta = num(factorA.etaSq);
    return `F(${dfStr(dfA)}, ${dfStr(dfE)}) = ${f.toFixed(2)}, ${apaP(fp)}${eta !== null ? `, η²p = ${apaDec(eta)}` : ""}`;
  }

  const dfConditions = num(r.dfConditions);
  if (dfConditions !== null) {
    // Repeated measures — Greenhouse-Geisser replaces both df and p when
    // sphericity is violated (mirrors formatRepeatedMeasuresAPA).
    const f = num(r.fStatistic);
    const dfError = num(r.dfError);
    const rp = num(r.pValue);
    if (f === null || dfError === null || rp === null) return null;
    const eta = num(r.partialEtaSquared);
    const tail = eta !== null ? `, η²p = ${apaDec(eta)}` : "";
    const corrected = obj(r.correctedF);
    if (corrected) {
      const d1 = num(corrected.df1);
      const d2 = num(corrected.df2);
      const cp = num(corrected.p);
      if (d1 !== null && d2 !== null && cp !== null) {
        return `F(${dfStr(d1)}, ${dfStr(d2)}) = ${f.toFixed(2)}, ${apaP(cp)}${tail}`;
      }
    }
    return `F(${dfStr(dfConditions)}, ${dfStr(dfError)}) = ${f.toFixed(2)}, ${apaP(rp)}${tail}`;
  }

  const omnibusP = num(r.omnibusP);
  if (omnibusP !== null) {
    // Logistic regression reports the omnibus model test, not a single pValue.
    const chi = num(r.omnibusChiSq);
    const df = num(r.omnibusDf);
    if (chi === null || df === null) return null;
    const r2 = num(r.nagelkerkeR2);
    return `χ²(${dfStr(df)}) = ${chi.toFixed(2)}, ${apaP(omnibusP)}${r2 !== null ? `, Nagelkerke R² = ${apaDec(r2, 3)}` : ""}`;
  }

  // --- shapes with a top-level pValue --------------------------------------
  const p = num(r.pValue);
  if (p === null) return null;

  const t = num(r.t);
  const df = num(r.df);
  const f = num(r.fStatistic);
  const chi = num(r.chiSquare);

  switch (testType) {
    case "t-test":
    case "one-sample-t": {
      if (t === null || df === null) return null;
      const d = num(r.cohensD);
      return `t(${dfStr(df)}) = ${t.toFixed(2)}, ${apaP(p)}${d !== null ? `, d = ${apaDec(d)}` : ""}`;
    }
    case "anova": {
      const dfB = num(r.dfBetween);
      const dfW = num(r.dfWithin);
      if (f === null || dfB === null || dfW === null) return null;
      const eta = num(r.etaSquared);
      return `F(${dfStr(dfB)}, ${dfStr(dfW)}) = ${f.toFixed(2)}, ${apaP(p)}${eta !== null ? `, η² = ${apaDec(eta)}` : ""}`;
    }
    case "chi-square": {
      if (chi === null || df === null) return null;
      // independence → grandTotal, goodness-of-fit → total
      const n = num(r.grandTotal) ?? num(r.total);
      const v = num(r.cramersV);
      return `χ²(${dfStr(df)}${n !== null ? `, N = ${n}` : ""}) = ${chi.toFixed(2)}, ${apaP(p)}${v !== null ? `, V = ${apaDec(v)}` : ""}`;
    }
    case "mcnemar": {
      // Small discordant counts switch to the binomial exact test, which has no
      // χ² to report (mirrors formatMcNemarAPA).
      if (r.useExact === true) return `McNemar's exact test, ${apaP(p)}`;
      if (chi === null || df === null) return null;
      return `McNemar's test, χ²(${dfStr(df)}) = ${chi.toFixed(2)}, ${apaP(p)}`;
    }
    case "friedman": {
      if (chi === null || df === null) return null;
      const w = num(r.kendallW);
      return `χ²(${dfStr(df)}) = ${chi.toFixed(2)}, ${apaP(p)}${w !== null ? `, W = ${apaDec(w)}` : ""}`;
    }
    case "correlation": {
      const rr = num(r.r);
      if (rr === null || df === null) return null;
      const symbol = r.type === "spearman" ? "rₛ" : "r";
      return `${symbol}(${dfStr(df)}) = ${apaDec(rr)}, ${apaP(p)}`;
    }
    case "regression":
    case "multiple-regression": {
      const dfReg = num(r.dfRegression);
      const dfRes = num(r.dfResidual);
      const r2 = num(r.rSquared);
      if (f === null || dfReg === null || dfRes === null) return null;
      return `F(${dfStr(dfReg)}, ${dfStr(dfRes)}) = ${f.toFixed(2)}, ${apaP(p)}${r2 !== null ? `, R² = ${apaDec(r2, 3)}` : ""}`;
    }
    case "mann-whitney": {
      const u = num(r.uMin);
      const z = num(r.z);
      if (u === null) return null;
      return `U = ${u.toFixed(1)}${z !== null ? `, z = ${z.toFixed(2)}` : ""}, ${apaP(p)}`;
    }
    case "wilcoxon": {
      const w = num(r.wStat);
      const z = num(r.z);
      if (w === null) return null;
      return `W = ${w.toFixed(1)}${z !== null ? `, z = ${z.toFixed(2)}` : ""}, ${apaP(p)}`;
    }
    case "kruskal-wallis": {
      const h = num(r.hStatistic);
      if (h === null || df === null) return null;
      const eta = num(r.etaSquaredH);
      return `H(${dfStr(df)}) = ${h.toFixed(2)}, ${apaP(p)}${eta !== null ? `, η²H = ${apaDec(eta)}` : ""}`;
    }
    case "fisher-exact": {
      const or = num(r.oddsRatio);
      return `Fisher's exact test, ${apaP(p)}${or !== null ? `, OR = ${or.toFixed(2)}` : ""}`;
    }
    default:
      return null;
  }
}

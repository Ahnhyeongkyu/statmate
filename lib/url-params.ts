"use client";

import { useSearchParams } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import { useMemo } from "react";

// --- Encoder/Decoder for each calculator ---

type ParamMap = Record<string, string>;

// T-Test
export function encodeTTest(state: { testType: string; group1Input: string; group2Input: string }): ParamMap {
  return { t: state.testType, g1: state.group1Input.replace(/\s+/g, ""), g2: state.group2Input.replace(/\s+/g, "") };
}
export function decodeTTest(p: URLSearchParams) {
  const t = p.get("t"), g1 = p.get("g1"), g2 = p.get("g2");
  if (!t || !g1 || !g2) return null;
  return { testType: t, group1Input: g1, group2Input: g2 };
}

// Chi-Square
export function encodeChiSquare(state: { testType: string; rows?: number; cols?: number; cells?: string[][]; goodnessInput?: string; expectedInput?: string }): ParamMap {
  if (state.testType === "goodness") {
    return { t: "goodness", obs: (state.goodnessInput ?? "").replace(/\s+/g, ""), exp: (state.expectedInput ?? "").replace(/\s+/g, "") };
  }
  const r = state.rows ?? 2, c = state.cols ?? 2;
  const flat = (state.cells ?? []).flat().join(",");
  return { t: "independence", r: String(r), c: String(c), d: flat };
}
export function decodeChiSquare(p: URLSearchParams) {
  const t = p.get("t");
  if (!t) return null;
  if (t === "goodness") {
    const obs = p.get("obs"), exp = p.get("exp");
    if (!obs) return null;
    return { testType: "goodness" as const, goodnessInput: obs, expectedInput: exp ?? "" };
  }
  const r = parseInt(p.get("r") ?? "2"), c = parseInt(p.get("c") ?? "2"), d = p.get("d");
  if (!d) return null;
  const vals = d.split(",");
  const cells: string[][] = [];
  for (let i = 0; i < r; i++) {
    cells.push(vals.slice(i * c, (i + 1) * c));
  }
  return { testType: "independence" as const, rows: r, cols: c, cells };
}

// Sample Size
export function encodeSampleSize(state: { testType: string; effectSize: string; alpha: string; power: string; numGroups?: string }): ParamMap {
  const m: ParamMap = { t: state.testType, es: state.effectSize, a: state.alpha, p: state.power };
  if (state.testType === "anova" && state.numGroups) m.k = state.numGroups;
  return m;
}
export function decodeSampleSize(p: URLSearchParams) {
  const t = p.get("t"), es = p.get("es"), a = p.get("a"), pw = p.get("p");
  if (!t || !es || !a || !pw) return null;
  return { testType: t, effectSize: es, alpha: a, power: pw, numGroups: p.get("k") ?? "3" };
}

// ANOVA
export function encodeAnova(state: { numGroups: number; groupInputs: string[]; groupNames: string[] }): ParamMap {
  const m: ParamMap = { k: String(state.numGroups) };
  for (let i = 0; i < state.numGroups; i++) {
    if (state.groupNames[i]) m[`n${i}`] = state.groupNames[i];
    if (state.groupInputs[i]) m[`g${i}`] = state.groupInputs[i].replace(/\s+/g, "");
  }
  return m;
}
export function decodeAnova(p: URLSearchParams) {
  const k = parseInt(p.get("k") ?? "0");
  if (k < 2) return null;
  const groupInputs: string[] = [], groupNames: string[] = [];
  for (let i = 0; i < k; i++) {
    groupInputs.push(p.get(`g${i}`) ?? "");
    groupNames.push(p.get(`n${i}`) ?? `Group ${i + 1}`);
  }
  return { numGroups: k, groupInputs, groupNames };
}

// Correlation
export function encodeCorrelation(state: { corrType: string; xInput: string; yInput: string }): ParamMap {
  return { t: state.corrType, x: state.xInput.replace(/\s+/g, ""), y: state.yInput.replace(/\s+/g, "") };
}
export function decodeCorrelation(p: URLSearchParams) {
  const t = p.get("t"), x = p.get("x"), y = p.get("y");
  if (!x || !y) return null;
  return { corrType: t ?? "pearson", xInput: x, yInput: y };
}

// Descriptive
export function encodeDescriptive(state: { dataInput: string }): ParamMap {
  return { d: state.dataInput.replace(/\s+/g, "") };
}
export function decodeDescriptive(p: URLSearchParams) {
  const d = p.get("d");
  if (!d) return null;
  return { dataInput: d };
}

// Mann-Whitney
export function encodeMannWhitney(state: { group1Input: string; group2Input: string }): ParamMap {
  return { g1: state.group1Input.replace(/\s+/g, ""), g2: state.group2Input.replace(/\s+/g, "") };
}
export function decodeMannWhitney(p: URLSearchParams) {
  const g1 = p.get("g1"), g2 = p.get("g2");
  if (!g1 || !g2) return null;
  return { group1Input: g1, group2Input: g2 };
}

// One-Sample T
export function encodeOneSampleT(state: { dataInput: string; testValueInput: string }): ParamMap {
  return { d: state.dataInput.replace(/\s+/g, ""), tv: state.testValueInput };
}
export function decodeOneSampleT(p: URLSearchParams) {
  const d = p.get("d"), tv = p.get("tv");
  if (!d || !tv) return null;
  return { dataInput: d, testValueInput: tv };
}

// Regression
export function encodeRegression(state: { xInput: string; yInput: string }): ParamMap {
  return { x: state.xInput.replace(/\s+/g, ""), y: state.yInput.replace(/\s+/g, "") };
}
export function decodeRegression(p: URLSearchParams) {
  const x = p.get("x"), y = p.get("y");
  if (!x || !y) return null;
  return { xInput: x, yInput: y };
}

// Multiple Regression
export function encodeMultipleRegression(state: { yInput: string; numPredictors: number; xInputs: string[]; xNames: string[] }): ParamMap {
  const m: ParamMap = { y: state.yInput.replace(/\s+/g, ""), k: String(state.numPredictors) };
  for (let i = 0; i < state.numPredictors; i++) {
    if (state.xInputs[i]) m[`x${i}`] = state.xInputs[i].replace(/\s+/g, "");
    if (state.xNames[i]) m[`n${i}`] = state.xNames[i];
  }
  return m;
}
export function decodeMultipleRegression(p: URLSearchParams) {
  const y = p.get("y"), kStr = p.get("k");
  if (!y || !kStr) return null;
  const k = parseInt(kStr);
  if (k < 2) return null;
  const xInputs: string[] = [], xNames: string[] = [];
  for (let i = 0; i < k; i++) {
    xInputs.push(p.get(`x${i}`) ?? "");
    xNames.push(p.get(`n${i}`) ?? `X${i + 1}`);
  }
  return { yInput: y, numPredictors: k, xInputs, xNames };
}

// Wilcoxon
export function encodeWilcoxon(state: { preInput: string; postInput: string }): ParamMap {
  return { pre: state.preInput.replace(/\s+/g, ""), post: state.postInput.replace(/\s+/g, "") };
}
export function decodeWilcoxon(p: URLSearchParams) {
  const pre = p.get("pre"), post = p.get("post");
  if (!pre || !post) return null;
  return { preInput: pre, postInput: post };
}

// Cronbach's Alpha
export function encodeCronbachAlpha(state: { matrixInput: string }): ParamMap {
  return { m: state.matrixInput.replace(/\n/g, "|").replace(/\s+/g, "") };
}
export function decodeCronbachAlpha(p: URLSearchParams) {
  const m = p.get("m");
  if (!m) return null;
  return { matrixInput: m.replace(/\|/g, "\n") };
}

// Logistic Regression
export function encodeLogisticRegression(state: { yInput: string; xInputs: string[]; predictorNames: string[] }): ParamMap {
  const m: ParamMap = { y: state.yInput.replace(/\s+/g, ""), k: String(state.xInputs.length) };
  for (let i = 0; i < state.xInputs.length; i++) {
    if (state.xInputs[i]) m[`x${i}`] = state.xInputs[i].replace(/\s+/g, "");
    if (state.predictorNames[i]) m[`n${i}`] = state.predictorNames[i];
  }
  return m;
}
export function decodeLogisticRegression(p: URLSearchParams) {
  const y = p.get("y"), kStr = p.get("k");
  if (!y || !kStr) return null;
  const k = parseInt(kStr);
  if (k < 1) return null;
  const xInputs: string[] = [], predictorNames: string[] = [];
  for (let i = 0; i < k; i++) {
    xInputs.push(p.get(`x${i}`) ?? "");
    predictorNames.push(p.get(`n${i}`) ?? `X${i + 1}`);
  }
  return { yInput: y, xInputs, predictorNames };
}

// Factor Analysis
export function encodeFactorAnalysis(state: { matrixInput: string; extraction: string; rotation: string; nFactors: string }): ParamMap {
  const m: ParamMap = { m: state.matrixInput.replace(/\n/g, "|").replace(/\s+/g, ""), e: state.extraction, r: state.rotation };
  if (state.nFactors) m.k = state.nFactors;
  return m;
}
export function decodeFactorAnalysis(p: URLSearchParams) {
  const m = p.get("m");
  if (!m) return null;
  return {
    matrixInput: m.replace(/\|/g, "\n"),
    extraction: (p.get("e") ?? "pca") as "pca" | "paf",
    rotation: (p.get("r") ?? "varimax") as "none" | "varimax" | "promax",
    nFactors: p.get("k") ?? "",
  };
}

// --- Share URL builder hook ---
export function useShareUrl(calculatorType: string, params: ParamMap): string {
  const pathname = usePathname();

  return useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.origin + pathname);
    for (const [k, v] of Object.entries(params)) {
      if (v) url.searchParams.set(k, v);
    }
    return url.toString();
  }, [pathname, params]);
}

// --- URL param loader hook ---
export function useUrlParams(): URLSearchParams | null {
  const searchParams = useSearchParams();
  if (!searchParams || searchParams.toString() === "") return null;
  return searchParams;
}

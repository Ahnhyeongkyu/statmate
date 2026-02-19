# StatMate — Project Context

> Last updated: 2026-02-19 | Latest commit: `36c40bb`

## Overview

StatMate is a bilingual (EN/KO) statistics calculator web app deployed on Vercel.
- **Stack:** Next.js 16.1.6 (Turbopack), TypeScript, Tailwind CSS, next-intl 4.8.2
- **Repo:** https://github.com/Ahnhyeongkyu/statmate.git (branch: master)
- **Live:** https://statmate-red.vercel.app
- **Monetization:** Lemon Squeezy Pro license (AI interpretation, DOCX export)

## 20 Calculators — All Complete

| # | Calculator | Folder | Stats Module | PDF Export | Chart | URL Params |
|---|-----------|--------|-------------|-----------|-------|-----------|
| 1 | Independent/Paired t-Test | t-test | t-test.ts | exportTTestPdf | group-boxplot | url-params.ts |
| 2 | One-Way ANOVA | anova | anova.ts | exportAnovaPdf | group-boxplot | url-params.ts |
| 3 | Chi-Square | chi-square | chi-square.ts | exportChiSquarePdf | chi-square-chart | url-params.ts |
| 4 | Correlation | correlation | correlation.ts | exportCorrelationPdf | (scatter in calculator) | url-params.ts |
| 5 | Descriptive Statistics | descriptive | descriptive.ts | exportDescriptivePdf | (histogram in calculator) | url-params.ts |
| 6 | Sample Size / Power | sample-size | sample-size.ts | exportSampleSizePdf | power-curve | url-params.ts |
| 7 | One-Sample t-Test | one-sample-t | one-sample-t.ts | exportOneSampleTPdf | group-boxplot | url-params.ts |
| 8 | Mann-Whitney U | mann-whitney | mann-whitney.ts | exportMannWhitneyPdf | group-boxplot | url-params.ts |
| 9 | Wilcoxon Signed-Rank | wilcoxon | wilcoxon.ts | exportWilcoxonPdf | paired-chart | url-params.ts |
| 10 | Simple Regression | regression | regression.ts | exportRegressionPdf | residual-plots | url-params.ts |
| 11 | Multiple Regression | multiple-regression | multiple-regression.ts | exportMultipleRegressionPdf | coefficient-chart + residual-plots | url-params.ts |
| 12 | Cronbach's Alpha | cronbach-alpha | cronbach-alpha.ts | exportCronbachAlphaPdf | item-analysis-chart | url-params.ts |
| 13 | Logistic Regression | logistic-regression | logistic-regression.ts | exportLogisticRegressionPdf | odds-ratio-chart + coefficient-chart | url-params.ts |
| 14 | Factor Analysis (EFA) | factor-analysis | factor-analysis.ts | exportFactorAnalysisPdf | scree-plot | url-params.ts |
| 15 | Kruskal-Wallis H | kruskal-wallis | kruskal-wallis.ts | exportKruskalWallisPdf | group-boxplot | reuses encodeAnova/decodeAnova |
| 16 | Repeated Measures ANOVA | repeated-measures | repeated-measures.ts | exportRepeatedMeasuresPdf | paired-chart + group-boxplot | local encode in calculator.tsx |
| 17 | Two-Way ANOVA | two-way-anova | two-way-anova.ts | exportTwoWayAnovaPdf | group-boxplot | local encode in calculator.tsx |
| 18 | Friedman Test | friedman | friedman.ts | exportFriedmanPdf | group-boxplot | reuses encodeAnova/decodeAnova |
| 19 | Fisher's Exact Test | fisher-exact | fisher-exact.ts | exportFisherExactPdf | chi-square-chart | url-params.ts |
| 20 | McNemar Test | mcnemar | mcnemar.ts | exportMcNemarPdf | mcnemar-chart + chi-square-chart | url-params.ts |

### URL Params Note
- 16 calculators have encode/decode in `lib/url-params.ts`
- Kruskal-Wallis & Friedman reuse `encodeAnova/decodeAnova` (same group structure)
- Two-Way ANOVA & Repeated Measures have local encode/decode in their own calculator.tsx
- **All 20 have working URL sharing**

## Registration Files (All 20/20)

| File | Status |
|------|--------|
| `app/sitemap.ts` — calculator slugs | 20/20 |
| `app/[locale]/layout.tsx` — allCalculatorKeys | 20/20 (5 in desktop header, 20 in mobile/footer) |
| `components/related-calculators.tsx` — calculatorKeys | 20/20 |
| `app/[locale]/wizard/wizard.tsx` — result nodes | 20/20 |
| `app/api/interpret/route.ts` — testType union | 20/20 |
| `lib/export-pdf.ts` — export functions | 20/20 |
| `messages/en.json` — calculator namespaces | 20/20 |
| `messages/ko.json` — calculator namespaces | 20/20 |

## Content

- **Blog posts:** 8 articles (EN + KO each), topics: t-test APA, choosing tests, correlation vs regression, ANOVA APA, sample size, effect size, nonparametric guide, chi-square APA
- **SEO:** Each calculator has `page.tsx` (metadata), `seo-ko.tsx`, `opengraph-image.tsx`, FAQ JSON-LD schema

## Chart Components (10 files in `components/charts/`)

group-boxplot, chi-square-chart, coefficient-chart, odds-ratio-chart, item-analysis-chart, scree-plot, power-curve, paired-chart, residual-plots, mcnemar-chart

## Utility Modules

- `lib/statistics/validation.ts` — input validation
- `lib/statistics/assumptions.ts` — normality/homogeneity checks
- `lib/statistics/matrix.ts` — matrix operations (for factor analysis)
- `components/data-textarea.tsx` — CSV file upload with drag-and-drop
- `components/assumption-checks.tsx` — visual assumption check UI

## Build

```bash
npm run build  # Turbopack, generates 25 static + dynamic pages, ~10s
```

## Remaining Tasks

- [ ] **GSC Indexing** — Submit new/updated URLs to Google Search Console (requires Chrome browser automation)
- All code work is complete. No TODO/FIXME/HACK comments in codebase.

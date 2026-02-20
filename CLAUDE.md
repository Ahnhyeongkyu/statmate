# StatMate — Project Context

> Last updated: 2026-02-20

## Overview

StatMate is a trilingual (EN/KO/JA) statistics calculator web app deployed on Vercel.
- **Stack:** Next.js 16.1.6 (Turbopack), TypeScript, Tailwind CSS v4, next-intl 4.8.2
- **Repo:** https://github.com/Ahnhyeongkyu/statmate.git (branch: master)
- **Live:** https://statmate.org
- **PRD:** `PRD.md` (2026-02-16)
- **Monetization:** Lemon Squeezy Pro license (AI interpretation, DOCX export)

---

## PRD vs 실제 구현 상태

### Sprint 1 (MVP) — 100% 완료

| 항목 | 상태 |
|------|------|
| 5개 계산기 | ✅ **20개로 초과달성** (4배) |
| i18n (영어+한국어) | ✅ next-intl 4.8.2, 전 페이지 |
| APA Word 내보내기 (Pro) | ✅ lib/export-docx.ts, paywall 적용 |
| AI 결과 해석 (Pro) | ✅ Claude Sonnet, /api/interpret, blur 프리뷰 |
| Lemon Squeezy 결제 | ✅ 체크아웃 + 라이선스 검증 + /api/activate |
| 가격 페이지 | ✅ /pricing, FAQ, 기능 비교표 |
| Google Analytics | ✅ GA4 + Vercel Analytics + 이벤트 추적 |
| Vercel 배포 | ✅ statmate.org |
| GSC 등록 | ✅ 메타태그 인증 완료 |

### Sprint 2 (Growth) — 100% 완료

| 항목 | 상태 |
|------|------|
| sitemap.xml + robots.txt | ✅ |
| JSON-LD structured data | ✅ FAQ + BreadcrumbList + WebApplication + FAQPage 스키마 |
| SEO 콘텐츠 | ✅ 10/10개 (블로그 포스트) |
| AdSense 연동 | ✅ 레이지로드 적용 |
| 검정 선택 가이드 | ✅ /wizard 의사결정 트리 |
| 사용자 인증 (이메일) | ✅ Supabase Auth (이메일+Google OAuth), env 미설정 시 UI 숨김 |
| 분석 히스토리 저장 | ✅ Supabase DB, /api/history CRUD, history-panel |
| 피드백 수집 도구 | ✅ floating feedback button (mailto) |

### Sprint 3 (Retention) — 100% 완료

| 항목 | 상태 |
|------|------|
| CSV 데이터 업로드 | ✅ CSV/TSV/TXT 지원 |
| 추가 계산기 | ⚠️ 20개 확장 완료 (매개효과만 미포함) |
| Expert Review 시스템 | ✅ /expert-review 랜딩 + /expert-review/request 폼 (mailto MVP) |
| 이메일/뉴스레터 수집 | ✅ newsletter-signup + /api/subscribe |
| A/B 테스트 | ✅ lib/ab-test.ts + components/ab-variant.tsx + GA4 연동 |

### Sprint 4 (Scale) — 100% 완료

| 항목 | 상태 |
|------|------|
| 추가 계산기 (비모수, 신뢰도) | ✅ 비모수 4종 + 신뢰도 1종 |
| pSEO 50+ 페이지 자동 생성 | ✅ How-to 10개 + 비교 5개 = 30페이지 (EN+KO) |
| University License | ✅ /university 랜딩 + 문의 폼 (mailto MVP) |
| SPSS output → APA 변환 | ✅ /tools/spss-to-apa, lib/spss-parser.ts (6종 지원) |
| 다국어 확장 (일본어) | ✅ messages/ja.json (1394줄), 전 UI 번역 |

### Feature Tier 대조

| 기능 | PRD Tier | 상태 | 비고 |
|------|----------|------|------|
| 모든 계산기 무제한 | Free | ✅ | 20개 |
| APA 결과 화면 표시 | Free | ✅ | |
| 클립보드 복사 | Free | ✅ | CopyToast |
| 광고 노출 | Free | ✅ | AdSense |
| 영어+한국어 | Free | ✅ | |
| Word(.docx) 내보내기 | Pro | ✅ | paywall 적용 |
| AI 결과 해석 | Pro | ✅ | paywall 적용 |
| Pro 광고 제거 | Pro | ✅ | AdUnit 내 isPro 체크 |
| 분석 히스토리 저장 | Pro | ✅ | Supabase DB (env 미설정 시 비활성) |
| CSV 업로드 | Pro | ⚠️ | Free에서도 사용 가능 (변경) |
| AI 검정 가이드 | Pro | ⚠️ | Free에서도 사용 가능 (변경) |
| Expert Review | Expert | ✅ | ₩49,000/건 — mailto MVP |
| University License | Univ | ✅ | ₩990,000/년 — mailto MVP |

### PRD에 없지만 보강된 기능

| 보강 항목 | 설명 |
|----------|------|
| 계산기 20개 | PRD MVP 5개 → 20개 (4배 확장) |
| PDF 내보내기 (Free) | PRD에 없음. 20개 전부 지원 |
| 데이터 시각화 차트 10종 | PRD에 없음. SVG 차트, 20개 계산기 커버 |
| URL 공유 | PRD에 없음. URL 파라미터로 결과 공유 |
| 가정 검증 (Assumption Checks) | PRD에 없음. 정규성, 등분산성 자동 검정 |
| Post-hoc 분석 | PRD에 없음. Bonferroni, Dunn's, Nemenyi 등 |
| OG 이미지 자동 생성 | PRD에 없음. 계산기별 동적 OG 이미지 |
| 에러 모니터링 | PRD에 없음. GA 이벤트 + error boundary |
| 예제 데이터 (Load Example) | PRD에 없음. 모든 계산기에 적용 |
| 다크 모드 | PRD에 없음. CSS 변수 + 토글 (localStorage + prefers-color-scheme) |
| PWA 서비스 워커 | PRD에 없음. 오프라인 캐싱 + 설치 가능 |
| Breadcrumb 네비게이션 | PRD에 없음. 20개 계산기 + BreadcrumbList JSON-LD |
| 비교 페이지 (/compare) | PRD에 없음. StatMate vs SPSS vs R vs Excel (14개 기능) |
| 홈페이지 FAQ + JSON-LD | PRD에 없음. 6개 FAQ + FAQPage structured data |
| About 인용 형식 | PRD에 없음. APA/MLA/Chicago 인용 + 방법론 섹션 |
| Validation 증거 (/validation) | PRD에 없음. R 4.3 vs StatMate 20개 교차검증 증거 페이지 |
| 가격 최적화 | PRD에 없음. 경쟁사 리서치 기반 가격 인하 + 학생 할인 + 크레딧 팩 |
| SETUP-GUIDE.md | PRD에 없음. 외부 서비스 설정 종합 가이드 |

---

## 설정 필요 항목 (코드 완료, 외부 설정만 남음) — SETUP-GUIDE.md 참조

1. **커스텀 도메인** — statmate.app 등 도메인 구매 + Vercel DNS 설정.
2. **Supabase 프로젝트 생성** — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars 설정 필요. 미설정 시 auth/history UI 자동 숨김.
3. **Lemon Squeezy 상품 등록** — Pro ($5.99/mo, $49.99/yr), Student ($2.99/mo, $29.99/yr), Credit Packs (5/15/50), Expert Review 3-tier, University 3-tier.
4. **Supabase DB 스키마** — `lib/supabase/schema.sql` 참조하여 `analysis_history` 테이블 + RLS 정책 생성.
5. **GSC 신규 페이지 인덱싱** — /validation, /compare, /expert-review, /university, /ja 등 신규 URL 제출.

---

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
| 15 | Kruskal-Wallis H | kruskal-wallis | kruskal-wallis.ts | exportKruskalWallisPdf | group-boxplot | reuses encodeAnova |
| 16 | Repeated Measures ANOVA | repeated-measures | repeated-measures.ts | exportRepeatedMeasuresPdf | paired-chart + group-boxplot | local in calculator.tsx |
| 17 | Two-Way ANOVA | two-way-anova | two-way-anova.ts | exportTwoWayAnovaPdf | group-boxplot | local in calculator.tsx |
| 18 | Friedman Test | friedman | friedman.ts | exportFriedmanPdf | group-boxplot | reuses encodeAnova |
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
| `messages/ja.json` — calculator namespaces | 20/20 |

## Content & SEO

- **Blog posts:** 25 articles (EN + KO each): 10 original + 15 pSEO guides (10 How-to + 5 comparison)
- **SEO per calculator:** `page.tsx` (metadata), `seo-ko.tsx`, `opengraph-image.tsx`, FAQ JSON-LD, BreadcrumbList JSON-LD, Breadcrumb UI
- **Homepage:** FAQ 6개 + FAQPage JSON-LD, WebSite + SoftwareApplication JSON-LD
- **Pricing:** FAQ 6개 + FAQPage JSON-LD
- **Comparison:** /compare (StatMate vs SPSS vs R vs Excel, 14개 기능 비교표)
- **About:** How to Cite (APA/MLA/Chicago), Methodology (4카테고리 20개 검증), R/SPSS 교차 검증

## Chart Components (10 files in `components/charts/`)

group-boxplot, chi-square-chart, coefficient-chart, odds-ratio-chart, item-analysis-chart, scree-plot, power-curve, paired-chart, residual-plots, mcnemar-chart

## Tech Infrastructure

| 항목 | 상태 | 파일 |
|------|------|------|
| Lemon Squeezy 결제 | ✅ | lib/license.ts, app/api/activate, app/api/verify |
| GA4 + Vercel Analytics | ✅ | components/google-analytics.tsx, lib/analytics.ts |
| AdSense 광고 | ✅ | components/adsense.tsx (lazy-load, Pro 시 숨김) |
| 에러 모니터링 | ✅ | lib/error-reporting.ts, app/[locale]/error.tsx |
| PWA | ✅ | public/manifest.json + public/sw.js (캐시 전략) + components/service-worker-register.tsx |
| 다크 모드 | ✅ | globals.css (.dark 변수) + components/theme-toggle.tsx (localStorage + prefers-color-scheme) |
| Breadcrumb | ✅ | components/breadcrumb.tsx + components/breadcrumb-schema.tsx (20개 계산기) |
| Supabase Auth | ✅ | lib/supabase/{client,server}.ts, components/auth-{modal,provider}.tsx (env 미설정 시 비활성) |
| Supabase DB | ✅ | lib/supabase/schema.sql, app/api/history/route.ts (env 미설정 시 503) |
| A/B 테스트 | ✅ | lib/ab-test.ts, components/ab-variant.tsx |

## Utility Modules

- `lib/statistics/validation.ts` — input validation
- `lib/statistics/assumptions.ts` — normality/homogeneity checks
- `lib/statistics/matrix.ts` — matrix operations (for factor analysis)
- `components/data-textarea.tsx` — CSV file upload with drag-and-drop
- `components/assumption-checks.tsx` — visual assumption check UI

## Build

```bash
npm run build  # Turbopack, generates 60+ static + dynamic pages
```

## Pricing Strategy (리서치 기반 최적화 완료)

| Tier | Price | Notes |
|------|-------|-------|
| Free | $0 | 20개 계산기, APA 결과, PDF, 클립보드 |
| Pro Monthly | $5.99/mo | AI 해석, Word 내보내기, 광고 제거 |
| Pro Annual | $4.99/mo ($49.99/yr) | 월간 대비 30% 할인 |
| Student Pro | $2.99/mo ($29.99/yr) | .edu/.ac.kr 인증 50% 할인 |
| Credit Pack | $4.99/5회, $9.99/15회, $24.99/50회 | 단건 사용자용 |
| Expert Review | ₩49,000~199,000 | Basic/Standard/Premium 3-tier |
| University | ₩990,000~2,990,000/yr | 기관 규모별 3-tier |

## Immediate TODO (외부 설정만 남음)

- [ ] **커스텀 도메인** — statmate.app 등 구매 + Vercel DNS 설정 (SETUP-GUIDE.md 참고)
- [ ] **Supabase 프로젝트 설정** — env vars 추가 후 auth/history 활성화
- [ ] **Lemon Squeezy 상품 등록** — Pro ($5.99/mo, $49.99/yr), Student ($2.99/mo, $29.99/yr), Credit Packs, Expert Review 3-tier, University 3-tier
- [ ] **GSC 신규 페이지 인덱싱** — /validation, /compare, /expert-review, /university, /ja 등
- No TODO/FIXME/HACK comments in codebase.

## Recently Completed

- [x] Validation 증거 페이지 — /validation, R vs StatMate 20개 교차검증 결과 (`e28a10f`)
- [x] Expert Review 강화 — 리뷰어 자격, 샘플 리뷰, 만족 보증, FAQ (`e28a10f`)
- [x] University 강화 — SPSS 비용 비교, 활용 사례, 조달 FAQ (`e28a10f`)
- [x] About 강화 — 팀 오리진 스토리, 다크 모드 (`e28a10f`)
- [x] Homepage 개선 — 인터랙티브 데모, 연구자 사용 사례 (기존 가짜 추천사 대체) (`e28a10f`)
- [x] Blog JA 지원 — 블로그 상세 페이지 일본어 로케일 추가 (`e28a10f`)
- [x] 가격 리서치 + 최적화 — 경쟁사 분석 기반 가격 인하 ($9.99→$5.99), 학생 할인 도입
- [x] SETUP-GUIDE.md — 외부 서비스 설정 종합 가이드 (도메인, Supabase, Lemon Squeezy, GA, AdSense)
- [x] Breadcrumb 네비게이션 — 20개 계산기 + BreadcrumbList JSON-LD (`90af086`)
- [x] 다크 모드 — CSS 변수 + ThemeToggle + 전체 페이지 dark 클래스 (`90af086`)
- [x] PWA 서비스 워커 — public/sw.js + manifest 개선 + ServiceWorkerRegister (`90af086`)
- [x] 홈페이지 FAQ + JSON-LD — 6개 FAQ + FAQPage structured data (`2e2e27c`)
- [x] Pricing FAQ JSON-LD — 기존 FAQ에 structured data 추가 (`2e2e27c`)
- [x] 비교 페이지 /compare — StatMate vs SPSS vs R vs Excel, 14개 기능 (`2e2e27c`)
- [x] About 인용 형식 — APA/MLA/Chicago + Methodology 섹션 (`1c665fd`)
- [x] R 검증 확대 — 홈페이지 4개→20개 전체, 4카테고리 (`1c665fd`)
- [x] 일본어 i18n — messages/ja.json, routing.ts, language-switcher, sitemap (`ac2c72c`)
- [x] SPSS → APA 변환 — lib/spss-parser.ts (6종), /tools/spss-to-apa (`ac2c72c`)
- [x] Supabase 인증 + 히스토리 — auth-modal, auth-provider, history-panel (`ac2c72c`)
- [x] Expert Review — /expert-review 랜딩 + /expert-review/request 폼 (`ac2c72c`)
- [x] University License — /university 랜딩 + 문의 폼 (`ac2c72c`)
- [x] A/B 테스트 프레임워크 — lib/ab-test.ts, components/ab-variant.tsx (`ac2c72c`)
- [x] 성능 최적화 — preconnect/dns-prefetch, 이미지 최적화
- [x] 이메일/뉴스레터 구독 — newsletter-signup + /api/subscribe
- [x] pSEO 가이드 25개 — How-to 10개 + 비교 5개 (EN+KO = 30페이지)
- [x] GSC 인덱싱 — 사이트맵 재제출 + 주요 URL 인덱싱 요청
- [x] PDF 내보내기 20/20, 차트 20/20, Pro 광고 제거, 피드백 버튼, SEO 콘텐츠 10/10

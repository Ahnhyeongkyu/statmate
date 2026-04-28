# StatMate AI Statistical Validator — BUILD Instructions

> **From**: CEO (Chairman 안형규 + AI CEO orchestrator)
> **To**: StatMate CTO terminal session
> **Date**: 2026-04-28
> **Trigger**: ADR-0023 즉시 BUILD (Expert Review pivot)
> **Goal**: 100% 자동 SaaS, 회장 개입 0, 1-2주 LAUNCH

---

## 0. 먼저 읽기 (필수)

1. `products/ADR/ADR-0023-statmate-expert-review-pivot-ai-validator.md` — 이번 결정의 모든 맥락
2. `products/ADR/ADR-0022-statmate-b2b-pivot.md` — B2B University License 부분 유지
3. `products/IDEATE/IDEATE-003-thesischeck.md` — 학위논문 특화 확장 PRD (참조용)
4. `statmate/CLAUDE.md` — 서비스 페르소나 + Tech Stack
5. `statmate/lib/statistics/` — 기존 23개 통계 모듈 (재사용)

---

## 1. BUILD 목표 (1-2주, 4 Sprint)

| Sprint | 산출물 | 검증 기준 |
|--------|--------|-----------|
| S1 (3일) | `/validate` 페이지 + 데이터 업로드 + 결제 통합 | 사용자가 CSV 업로드 → 결제 → "분석 중" 화면 |
| S2 (3일) | Claude API 통계 검증 prompt + 결과 화면 | 30초 내 검증 결과 표시 (10 known-correct 케이스 정확도 90%+) |
| S3 (2일) | PDF 자동 생성 + 다운로드 + 이메일 발송 | 결과 PDF 다운로드 + 이메일 영수증 자동 |
| S4 (3일) | 50 known-test 정확도 검증 + LAUNCH | 사용자 첫 결제 OK → 매출 라인 자동 가동 |

---

## 2. Tech Stack (재사용 + 신규)

### 재사용 (statmate 기존)
- Next.js 16 (App Router) + Tailwind v4 + shadcn/ui
- Supabase (사용자 / 분석 history)
- LemonSqueezy 결제 (기존 Pro 통합 또는 신규 상품)
- Claude API (이미 ANTHROPIC_API_KEY 있음)
- statmate `lib/statistics/*` 23개 모듈 (검증 비교용)
- statmate `lib/export-pdf.ts` 패턴 (PDF 생성)

### 신규
- `/app/[locale]/validate/` — 신규 페이지
- `/app/api/validate/` — Claude API 호출 route
- `/lib/validator/` — 검증 prompt 엔지니어링 + 결과 파싱

---

## 3. Sprint 1 (3일) 상세

### Day 1 — 페이지 구조 + 업로드
- [ ] `/validate` 페이지 (홈)
  - Hero: "Validate your statistical analysis with AI in 30 seconds"
  - 가격: $9.99 1회 (또는 Pro $5.99/mo unlimited)
  - 3-step: Upload → Pay → Get instant validation
- [ ] 데이터 업로드 UI (drag-and-drop)
  - 지원 포맷: CSV / Excel (.xlsx) / SPSS output (.sav, .spv 텍스트) / StatMate share URL
  - 50MB 한도
  - 사용자가 추가로 입력: "What test did you run?" (dropdown 23 options) + "Your hypothesis" (textarea)
- [ ] 결제 진입 (paywall)
  - 무료: 1번 / 월 (Free tier funnel)
  - $9.99 1회 결제 또는 Pro 활성화

### Day 2 — 결제 통합
- [ ] LemonSqueezy 신규 상품 등록 안내 (회장 작업, BUILD-INSTRUCTIONS.md 업데이트)
  - "StatMate AI Validator — Single" $9.99 1회
  - 또는 기존 Pro Annual $49.99 weight 추가 (무제한 unlimited validator)
- [ ] Checkout integration (LemonSqueezy embed pattern, 기존 pricing page 참조)
- [ ] Webhook `/api/lemonsqueezy/webhook` (결제 완료 시 사용자 활성화)

### Day 3 — DB Schema + Supabase
- [ ] Supabase schema:
  - `validation_requests` 테이블 (user_id, file_url, test_type, hypothesis, status, claude_response, pdf_url, created_at)
  - RLS: 사용자 본인 것만 read
- [ ] 파일 업로드 → Supabase Storage 보관

---

## 4. Sprint 2 (3일) — Claude API 통계 검증

### Day 4-5 — Prompt 엔지니어링

**Claude prompt template** (statmate/lib/validator/prompt.ts):

```typescript
export const VALIDATOR_PROMPT = `You are a PhD-level statistical analyst reviewing a user's statistical analysis. The user has uploaded their data and analysis results. Your job:

1. Identify the statistical test used (or proposed)
2. Verify the test choice is appropriate for the data
3. Check assumptions (normality, homogeneity of variance, independence)
4. Re-run the analysis with the data provided
5. Compare your result with the user's stated result
6. Flag discrepancies (if any)
7. Write APA 7th edition citation/sentence for the result
8. Provide interpretation (effect size, practical significance)

Output strictly in this JSON structure:
{
  "test_identified": "string (e.g., 'Independent t-test')",
  "test_appropriate": boolean,
  "assumption_checks": {
    "normality": { "result": "pass|fail|untested", "details": "string" },
    "homogeneity": { "result": "pass|fail|untested|n/a", "details": "string" },
    "independence": { "result": "pass|fail|untested|n/a", "details": "string" }
  },
  "ai_recomputed_result": "string (e.g., 't(48) = 2.34, p = .024')",
  "user_stated_result": "string",
  "discrepancy": {
    "found": boolean,
    "details": "string (if found)"
  },
  "apa_citation": "string (full APA 7th sentence)",
  "interpretation": "string (effect size + practical significance, 2-3 sentences)",
  "warnings": ["array of issues to address before publication"],
  "recommendations": ["array of next steps"]
}

User data: {data_csv}
User's reported analysis: {user_analysis}
User's hypothesis: {hypothesis}
Test type they ran: {test_type}
`;
```

### Day 6 — API Route + 결과 화면
- [ ] `/api/validate` POST route
  - Input: validation_request_id
  - Process: fetch file from Supabase → call Claude API → parse JSON → store result
  - Output: validation result JSON
- [ ] `/validate/result/[id]` 결과 페이지
  - Hero: "Your validation is ready"
  - 4 카드: Test appropriate / Assumptions / Result match / Recommendations
  - APA citation (copy button)
  - Download PDF button

---

## 5. Sprint 3 (2일) — PDF 생성 + 이메일

### Day 7 — PDF 자동 생성
- [ ] `/lib/validator/pdf-export.ts` (기존 export-pdf.ts 패턴 확장)
  - 1페이지: 표지 (StatMate logo + 사용자 이름 + 날짜 + Validation ID)
  - 2페이지: Summary (test / appropriate / assumptions)
  - 3페이지: Detailed analysis + APA citation + Interpretation
  - 4페이지: Recommendations + Warnings
- [ ] PDF download URL → Supabase Storage 자동 저장

### Day 8 — 이메일 자동 발송
- [ ] Resend API integration (또는 Supabase 자동 이메일)
- [ ] 결제 완료 시 자동 이메일:
  - Subject: "Your StatMate AI Validation Report"
  - Body: 결과 요약 + PDF 다운로드 링크 + StatMate 추천 (Pro upgrade CTA)

---

## 6. Sprint 4 (3일) — Accuracy 검증 + LAUNCH

### Day 9-10 — 50 Known-Test Validation
- [ ] 50개 known-correct 통계 분석 데이터 셋 준비
  - 회장이 statmate 23 calculator로 미리 분석한 결과 (정답 보유)
  - 또는 R 4.3 cross-validation 데이터 (validation 페이지 참조)
- [ ] AI Validator로 50개 모두 검증 → 정확도 측정
  - **PASS 기준**: test_appropriate 정확도 95%+, ai_recomputed_result 정확도 90%+
  - FAIL 시: prompt 재설계 + 재검증 cycle

### Day 11 — LAUNCH
- [ ] Vercel deploy
- [ ] Sitemap + GSC 인덱싱 (`/validate`)
- [ ] statmate 23 calculator 결과 페이지에 "Validate this with AI ($9.99)" CTA 추가
- [ ] 회장에게 LAUNCH 알림 + 회장 test 결제 1건

---

## 7. 회장 (CEO) 작업

### 즉시 (BUILD 시작 전)
- [ ] LemonSqueezy 대시보드에서 "StatMate Expert Review — Basic" 상품 **Unpublish** (1분)

### Sprint 2 중 (Day 5)
- [ ] LemonSqueezy 신규 상품 등록 안내받음:
  - 옵션 A: "StatMate AI Validator — Single" $9.99 1회 (Variant 등록)
  - 옵션 B: 기존 Pro $5.99/mo description 업데이트만 (별도 상품 X)
- [ ] 회장 결정 후 5분 작업

### Sprint 4 LAUNCH 직후
- [ ] 회장 본인 카드로 test 결제 1건 → 환불 (전체 흐름 검증)
- [ ] B2B University 영업 50개 콜드 이메일 시작 (이미 statmate/sales/ 자료 준비됨, AI Validator 가치 강조)

---

## 8. SUCCESS Criteria (Sprint 4 끝)

- [ ] /validate 페이지 라이브
- [ ] 결제 정상 작동 (test 결제 1건 OK)
- [ ] 50 known-test 검증 정확도 90%+ (test_appropriate), 95%+ (computed_result)
- [ ] PDF 자동 생성 + 이메일 발송
- [ ] 회장 개입 0 (24/7 자동)
- [ ] statmate 23 calculator 결과 페이지에 cross-funnel CTA

---

## 9. 위험 + Mitigation

| 위험 | 영향 | 완화 |
|------|------|------|
| Claude API 정확도 부족 | 사용자 신뢰 X → 환불 | Sprint 4 검증 통과 의무. 미통과 시 LAUNCH 연기 + prompt 재설계 |
| 사용자 데이터 보안 | 학생 논문 데이터 = 민감 | Supabase RLS + 7일 후 자동 삭제 + Privacy 명시 |
| Claude API 비용 폭증 | $9.99 결제 시 마진 압축 | per-request 토큰 한도 설정 (max 50K input tokens) + Claude Sonnet 사용 (Opus X) |
| 결제 후 분석 실패 | 환불 + 평판 | Webhook retry + 실패 시 회장 자동 알림 + Sentry 에러 모니터링 |

---

## 10. CTO 첫 응답 (이 문서 받으면)

CTO 세션 시작 시 다음 리포트:
1. 위 0번 read 항목 다 읽음 ✅
2. Sprint 1 Day 1 준비 완료 ✅ / 막힌 것 / 대기 중
3. 질문 (있으면) — 특히 Pro Annual $49.99에 통합할지 신규 $9.99 상품 만들지 (회장 결정 대기)
4. 예상 LAUNCH일 (보수적)

→ CEO에게 `HANDOVER.md` 갱신 후 BUILD 시작.

---

## 11. CEO 모니터링 (LAUNCH+W4까지)

- Sprint 1-3: 매 Sprint 끝 SERVICE_STATUS.md 갱신
- Sprint 4 LAUNCH 후:
  - W1: 첫 결제 발생 모니터링 (Discord 알림)
  - W2: 정확도 모니터링 (사용자 환불 요청 추적)
  - W4: DECIDE — 매출 $50/주 이상 → GROW (가격 인상, B2B push), 미만 → 가격 조정 (옵션 C: Free → $4.99 단가 인하)

---

> 작성: 2026-04-28
> CEO 승인: ✅ (자동 — ADR-0023 Accepted)
> CTO 트리거: 즉시

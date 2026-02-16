# StatMate Product Requirements Document (PRD)

**Version**: 1.0
**Date**: 2026-02-16
**Status**: Approved

---

## 1. Executive Summary

### What
StatMate는 온라인 통계 계산기 + APA 결과 포맷팅 + AI 해석을 결합한 웹 서비스다. 전 세계 대학원생과 연구자가 타겟이며, 한국 시장을 우선 공략한다.

### Why Now
- **한국어 통계 계산기 = 완전 공백 시장**. "t-test 계산기"로 검색하면 쓸만한 한국어 도구가 없다.
- **APA 포맷 + 계산기 + AI 해석을 합친 제품은 전 세계에 0개**.
- socscistatistics.com(600K/월), omnicalculator(23M/월) 등 기존 플레이어들은 모두 결과만 보여주고 끝. APA 내보내기, AI 해석, 한국어 미지원.

### Why Us
- 통계 분석 전문가 (숨고/크몽 현역, 실제 고객 경험)
- 한국 대학원생의 pain point를 직접 안다 (SPSS 비용, APA 포맷 수작업, 통계 외주 시장)
- 기술력: 통계 엔진 직접 구현 가능, AI 연동 가능

### One-Line Pitch
> **통계 검정 실행 → APA 결과 자동 생성 → AI가 한국어/영어로 해석 → Word 내보내기**
> 이 워크플로우를 제공하는 제품은 전 세계에 없다.

---

## 2. Market Analysis

### 2.1 시장 규모

| 세그먼트 | 규모 | 근거 |
|---------|------|------|
| 한국 대학원생 | 336,596명 | 교육통계 (석사+박사) |
| 한국 통계 외주 시장 | 25-50억원/년 | 숨고/크몽 추정 |
| 글로벌 "statistics calculator" 검색 | 월 300-500K | Google Keyword Planner |
| SPSS 한국 라이선스 비용 | 400-600만원/대 | IBM 공식 가격 |
| 대학생 통계 도구 지출 의향 | $5-15/월 | EdTech 벤치마크 |

### 2.2 경쟁 분석

**Tier 1: 트래픽 강자 (광고 모델)**

| 경쟁사 | 월 방문 | 계산기 수 | APA | 한국어 | AI | 내보내기 | UI |
|--------|---------|----------|-----|--------|-----|---------|-----|
| socscistatistics.com | 600K | 38+ | X | X | X | X | 구식 |
| omnicalculator.com | 23.1M | 194 | X | X | X | X | 현대적 |
| calculator.net | 99M | 기본 | X | X | X | X | 보통 |
| stattrek.com | 478K | 보통 | X | X | X | X | 구식 |

**Tier 2: 기능 강자 (SaaS 모델)**

| 경쟁사 | 가격 | APA | 한국어 | AI | 내보내기 | 특징 |
|--------|------|-----|--------|-----|---------|------|
| numiqo (DATAtab) | EUR 60/yr | 부분 | X | X | O | SPSS 대체 포지셔닝, 4개 언어 |
| simplyputpsych | GBP 7/mo | **최고** | X | X | O | 심리학 특화, APA Reporter |
| statskingdom | 무료 | 부분 | X | X | X | R 코드 자동 생성 |
| graphpad QuickCalcs | 무료→Prism | X | X | X | X | Prism($235-495/yr) 유도 |

**경쟁사 공통 약점:**
1. APA 포맷팅이 없거나 불완전
2. 한국어/아시아 언어 전무
3. AI 해석 기능 전무
4. 결과만 보여주고 "그래서 어떻게 해석하는지"는 알아서
5. 내보내기 기능 없거나 유료

### 2.3 StatMate의 경쟁 우위 매트릭스

| 기능 | socsci | omni | numiqo | simplypsych | **StatMate** |
|------|--------|------|--------|------------|-------------|
| 무료 계산기 | O | O | O | 일부 | **O** |
| APA 7판 자동 포맷 | X | X | 부분 | O | **O** |
| AI 결과 해석 | X | X | X | X | **O** |
| 한국어 | X | X | X | X | **O** |
| Word 내보내기 | X | X | O | O | **O** |
| 전문가 리뷰 | X | X | X | X | **O** |
| 검정 선택 가이드 | X | X | X | X | **O** |

---

## 3. Target Users

### 3.1 Primary Persona: "민지" (한국 석사과정)

- **인구통계**: 27세, 교육학과 석사 2년차, 서울
- **상황**: 논문 통계 분석 중. SPSS 학교 라이선스 있지만 졸업하면 사용 불가. APA 표 만드는 게 가장 시간 많이 걸림.
- **현재 행동**: SPSS로 분석 → 결과를 보고 APA 표 수작업 → 교수님한테 "이거 유의한 거 맞나요?" 확인
- **Pain points**:
  - SPSS 결과를 APA 표로 만드는 데 2-3시간
  - 통계 해석이 맞는지 불안함
  - 주변에 물어볼 사람 없음
  - 외주 맡기자니 10-50만원
- **WTP**: 월 ₩9,900이면 적극 사용. ₩49,000 전문가 리뷰는 논문 최종 제출 전 1회 사용.
- **발견 경로**: 에브리타임 "통계 분석" 검색, 김박사넷, 네이버 검색

### 3.2 Secondary Persona: "Alex" (글로벌 대학원생)

- **인구통계**: 24세, Psychology PhD 1st year, US
- **상황**: R/SPSS로 분석은 하는데 APA 포맷팅이 귀찮고, 교수가 APA 포맷 틀리면 지적함
- **현재 행동**: Google "t-test calculator" → socscistatistics.com → 결과를 보고 APA 표 직접 작성
- **Pain points**:
  - 기존 온라인 계산기는 결과만 주고 "so what?"이 없음
  - APA 표를 매번 수작업으로 만듦
  - R output을 APA로 변환하는 게 귀찮음
- **WTP**: $9.99/month for APA export + AI interpretation
- **발견 경로**: Google organic search

### 3.3 Tertiary Persona: "김 교수" (대학교수)

- **인구통계**: 52세, 사회복지학과 교수
- **상황**: 학생들 통계 분석 지도. 매번 APA 포맷 틀린 거 교정해주는 게 피곤함
- **니즈**: 학생들한테 추천할 수 있는 깔끔한 도구
- **행동**: 학과 예산으로 사이트 라이선스 구매 → 학생들 전원 사용
- **WTP**: ₩990,000/년 학과 라이선스
- **발견 경로**: 학회 동료 추천, Google Scholar ads

---

## 4. Product Strategy

### 4.1 Core Value Proposition

**"통계를 모르는 사람도 APA 논문을 쓸 수 있게 한다."**

기존 도구들: "여기 p-value가 0.023이야" → 끝.
StatMate: "독립표본 t-검정 결과, 실험집단(M=4.52, SD=1.23)은 통제집단(M=3.81, SD=1.45)보다 유의하게 높은 것으로 나타났다, t(58) = 2.45, p = .018, d = 0.63. 이는 중간 크기의 효과이다." → Word 파일 다운로드

### 4.2 Feature Tiers

**Free Tier (무료)**
- 모든 계산기 무제한 사용
- APA 포맷 결과 화면 표시
- 클립보드 복사
- 광고 노출 (비침습적)
- 영어 + 한국어 UI

**Pro Tier (₩9,900/월 or $9.99/월)**
- Free의 모든 기능 +
- APA 표 Word(.docx) 내보내기
- AI 결과 해석 (한국어/영어)
- 광고 제거
- CSV 데이터 업로드
- 분석 히스토리 저장
- 어떤 검정을 써야 하는지 AI 가이드

**Expert Review (₩49,000/건 or $29/건)**
- Pro의 모든 기능 +
- AI 1차 분석 + 전문 통계학자 리뷰
- 24시간 내 피드백
- "이 분석이 맞는지" 검증 리포트
- 논문에 바로 사용 가능한 결과 문장

**University License (₩990,000/년)**
- 학과/연구실 단위 전체 Pro 접근
- 관리자 대시보드
- 사용 통계 리포트
- 우선 지원

### 4.3 핵심 기능 우선순위 (MVP)

**Must-Have (Week 1-2)**
- [x] 5개 계산기 (t-test, ANOVA, chi-square, correlation, descriptive)
- [ ] i18n (영어 + 한국어)
- [ ] APA Word 내보내기 (Pro)
- [ ] AI 결과 해석 (Pro) — Claude API
- [ ] 결제 시스템 — Lemon Squeezy
- [ ] 가격 페이지
- [ ] Google Analytics / Plausible

**Should-Have (Week 3-4)**
- [ ] 사용자 인증 (이메일)
- [ ] 분석 히스토리 저장
- [ ] CSV 데이터 업로드
- [ ] "어떤 검정을 써야 할까?" AI 가이드
- [ ] SEO 최적화 (sitemap, structured data, meta)
- [ ] 블로그/가이드 콘텐츠 페이지
- [ ] AdSense 연동

**Nice-to-Have (Month 2+)**
- [ ] Expert Review 시스템
- [ ] University License 관리
- [ ] 추가 계산기 (회귀분석, 신뢰도 분석, 비모수 검정)
- [ ] pSEO 자동 페이지 생성
- [ ] 다국어 확장 (일본어, 스페인어)

---

## 5. Revenue Model

### 5.1 4-Layer Revenue Structure

```
┌─────────────────────────────────────────────────┐
│ Layer 1: Free + Ads                             │
│ 모든 방문자 → AdSense 자동 수익                    │
│ RPM $5-10, 느리지만 자동, 100% 패시브             │
├─────────────────────────────────────────────────┤
│ Layer 2: Pro Subscription                       │
│ APA 내보내기 + AI 해석이 필요한 학생               │
│ ₩9,900/월 × 구독자 수                            │
├─────────────────────────────────────────────────┤
│ Layer 3: Expert Review                          │
│ 분석 검증이 필요한 학생 (논문 제출 전)              │
│ ₩49,000/건 — 숨고 외주의 자동화 버전               │
│ AI가 90% 자동 처리 + 전문가 최종 검수              │
├─────────────────────────────────────────────────┤
│ Layer 4: University License                     │
│ 교수 추천 → 학과 구매                              │
│ ₩990,000/년 — B2B, 높은 LTV                     │
└─────────────────────────────────────────────────┘
```

### 5.2 가격 정책 근거

| 항목 | 가격 | 근거 |
|------|------|------|
| Pro ₩9,900/월 | $9.99 | numiqo EUR 60/yr(≈$5/mo)보다 높지만, AI 해석이라는 독점 가치. simplyputpsych GBP 7/mo와 유사. 한국 학생 월 도구 지출 의향 $5-15 범위 내. |
| Expert ₩49,000/건 | $29 | 숨고 외주 10-90만원 대비 90% 저렴. 학생 입장에서 "5만원으로 전문가 검증" = 매우 합리적. |
| University ₩990,000/년 | ~$700 | numiqo EUR 3,999/yr 대비 1/4 수준. 한국 대학 학과 예산 현실에 맞춤. 학생 10명만 써도 인당 ₩99,000/yr. |

### 5.3 Financial Projections (Conservative)

**Assumptions:**
- 한국 마케팅 Month 1부터 시작 (에브리타임, 김박사넷)
- 글로벌 SEO 효과 Month 4부터 발생
- Pro 전환율: 무료 사용자의 2-3%
- Expert Review: 월 방문자의 0.1-0.3%
- AdSense 승인: Month 3-4

| | Month 1-2 | Month 3 | Month 6 | Month 12 |
|--|-----------|---------|---------|----------|
| **한국 방문자/월** | 500 | 2,000 | 8,000 | 20,000 |
| **글로벌 방문자/월** | 100 | 500 | 5,000 | 30,000 |
| **Pro 구독자 (누적)** | 5 | 30 | 120 | 400 |
| **Expert Review/월** | 2 | 5 | 15 | 30 |
| **University License** | 0 | 0 | 1 | 3 |
| | | | | |
| **Pro 수익** | ₩50K | ₩300K | ₩1.2M | ₩4M |
| **Expert 수익** | ₩100K | ₩250K | ₩750K | ₩1.5M |
| **University 수익** | 0 | 0 | ₩83K/mo | ₩250K/mo |
| **광고 수익** | 0 | ₩50K | ₩150K | ₩500K |
| | | | | |
| **월 총 수익** | **₩150K** | **₩600K** | **₩2.2M** | **₩6.2M** |

**월 ₩1,000만원 도달 시나리오 (18개월):**
- Pro 구독자 600명 × ₩9,900 = ₩5.9M
- Expert Review 40건 × ₩49,000 = ₩2.0M
- University 5개 × ₩83K/mo = ₩415K
- 광고 = ₩800K
- 합계: **₩9.1M + 글로벌 Pro/광고 ≈ ₩10M+**

---

## 6. Go-to-Market Strategy

### 6.1 Phase 1: Launch & Seed (Month 1-2)

**한국 (즉시 실행)**
- [ ] 에브리타임 논문/통계 게시판에 무료 도구 공유
  - "논문 통계 분석 무료로 해주는 사이트 만들었습니다"
  - 직접 써본 후기 형식으로 바이럴
- [ ] 김박사넷 대학원생 커뮤니티 공유
- [ ] 숨고/크몽 프로필에 StatMate 링크 추가 → 기존 고객 유도
- [ ] 네이버 블로그: "t-test 하는 법", "ANOVA 결과 해석" SEO 포스팅

**글로벌 (동시 시작, 효과는 느림)**
- [ ] Product Hunt 제출
- [ ] Reddit: r/GradSchool, r/statistics, r/AcademicPsychology
- [ ] Google Search Console 등록 + sitemap 제출
- [ ] 핵심 키워드 페이지 SEO 최적화

### 6.2 Phase 2: Growth (Month 3-6)

**콘텐츠 마케팅 (pSEO)**
- "How to report t-test results in APA format" (영어)
- "t-test 결과 APA로 보고하는 법" (한국어)
- 검정별 × 언어별 조합 = 50+ 페이지 자동 생성
- 각 페이지에 해당 계산기 임베드

**커뮤니티/입소문**
- 대학 통계학 수업 교수에게 이메일 아웃리치
- 학회 메일링리스트 (한국심리학회, 한국교육학회 등)
- 대학원생 카톡 오픈채팅방

**광고 (소규모)**
- Google Ads: "t-test calculator" 등 키워드 CPC $0.5-2
- 월 $100-200 예산으로 초기 트래픽 + 데이터 수집

### 6.3 Phase 3: Scale (Month 6-12)

**University Sales**
- 한국 주요 대학 교육학/심리학/사회복지학과 타겟
- 무료 체험 → 학과장 미팅 → 라이선스 계약
- 1개 학과 = 학생 30-100명 Pro 접근

**Product Expansion**
- 추가 계산기 (회귀분석, 매개효과, 신뢰도, 비모수)
- SPSS/R output → APA 변환 도구 (SPSS 사용자를 직접 끌어옴)
- 논문 작성 AI 도우미 (통계 결과 → 결과 섹션 자동 작성)

---

## 7. Technical Architecture

### 7.1 Tech Stack (확정)

| 항목 | 선택 | 이유 |
|------|------|------|
| Framework | Next.js 16 (App Router) | SEO(SSG), 성능, Vercel 최적화 |
| Language | TypeScript | 타입 안정성, AI 코딩 호환 |
| Styling | Tailwind CSS + shadcn/ui | 빠른 개발, 모던 디자인 |
| i18n | next-intl | 영어 + 한국어 |
| Statistics | jstat + 자체 구현 | 클라이언트 사이드, 서버 부하 제로 |
| AI | Claude API (Sonnet) | 통계 해석 품질 최고, 비용 효율적 |
| Document | docx (npm) | APA 표 Word 내보내기 |
| Deploy | Vercel (Free → Pro) | 글로벌 CDN, 자동 배포, HTTPS |
| Payment | Lemon Squeezy | 글로벌 결제, 세금 자동, 한국 원화 지원 |
| Auth | Lemon Squeezy Customer Portal or Supabase Auth | 최소 구현으로 시작 |
| Analytics | Google Analytics 4 + Plausible | GA4=SEO 연동, Plausible=프라이버시 |
| Ads | Google AdSense | 글로벌 표준, 교육 카테고리 RPM $5-10 |
| DB (future) | Supabase (PostgreSQL) | 분석 히스토리, 사용자 데이터 |

### 7.2 Architecture

```
[Browser - Client Side]
  ├── Statistics Engine (jstat + custom TS)  ← 계산은 100% 클라이언트
  ├── UI Components (React + shadcn)
  └── i18n (next-intl)

[Vercel - Server Side]
  ├── Next.js App Router (SSG pages for SEO)
  ├── API Routes
  │   ├── /api/interpret  → Claude API (AI 해석, Pro only)
  │   ├── /api/export     → docx 생성 (Word 내보내기, Pro only)
  │   └── /api/webhook    → Lemon Squeezy 결제 처리
  └── Edge Middleware (auth check, rate limiting)

[External Services]
  ├── Claude API (AI 해석)
  ├── Lemon Squeezy (결제)
  ├── Google AdSense (광고)
  └── Supabase (DB, Auth - Phase 2)
```

### 7.3 비용 구조

| 항목 | 초기 | 월 1,000명 | 월 50,000명 |
|------|------|-----------|------------|
| Vercel | 무료 | 무료 | $20/mo |
| Claude API | ~$5 | ~$30 | ~$200 |
| Supabase | 무료 | 무료 | $25/mo |
| 도메인 | $12/yr | - | - |
| **월 총 비용** | **~$1** | **~$30** | **~$250** |

마진율: 수익의 95%+ (SaaS의 핵심 장점)

---

## 8. Competitive Moat (경쟁 우위 방어)

### 8.1 단기 Moat (0-6개월)
- **한국어 선점**: 첫 번째 한국어 통계 계산기 = SEO 독점
- **APA + AI 콤보**: 경쟁사가 따라하려면 6개월+
- **기존 고객 전환**: 숨고 고객 → StatMate 유도 = 즉시 유료 사용자

### 8.2 중기 Moat (6-18개월)
- **콘텐츠 SEO**: 50+ pSEO 페이지 → 검색 트래픽 누적
- **사용자 데이터**: 분석 히스토리 → 전환 비용 증가 (lock-in)
- **University 계약**: 1년 계약 → 경쟁사 진입 장벽

### 8.3 장기 Moat (18개월+)
- **브랜드**: "StatMate = 통계 계산기" 인식
- **네트워크 효과**: 교수 추천 → 학생 사용 → 다음 기수 학생도 사용
- **데이터**: 수십만 건의 분석 데이터 → AI 모델 fine-tuning → 해석 품질 향상

---

## 9. Risk Analysis

| 리스크 | 확률 | 영향 | 대응 |
|--------|------|------|------|
| SEO 트래픽이 안 나옴 | 중 | 높음 | 한국 커뮤니티 마케팅으로 초기 트래픽 확보. 유료 광고 $100-200/월 병행 |
| Pro 전환율이 1% 미만 | 중 | 높음 | Expert Review(건당 과금)로 수익 보완. 가격 실험 (₩4,900, ₩14,900) |
| 경쟁사가 한국어 추가 | 낮 | 중 | numiqo가 4개 언어 지원하지만 한국어 추가는 우선순위 낮음. 선점이 핵심 |
| Claude API 비용 급등 | 낮 | 중 | Sonnet → Haiku 전환. 또는 자체 프롬프트 최적화로 토큰 절감 |
| AdSense 승인 거부 | 중 | 낮 | 콘텐츠 보강 후 재신청. Mediavine (50K 세션 후) 대안 |
| 학생이 돈을 안 냄 | 중 | 높음 | Expert Review + University License로 B2B 전환. 광고 수익에 집중 |

### Go/No-Go 기준

| 시점 | 계속 조건 | 피봇 조건 |
|------|----------|----------|
| 1개월 | 런칭 완료 + 100명 방문 | 런칭 실패 |
| 3개월 | 월 1,000명+ 방문 OR 유료 전환 1건+ | 방문 100명 미만 AND 전환 0건 |
| 6개월 | 월 수익 ₩100만+ | 월 수익 ₩30만 미만 |
| 12개월 | 월 수익 ₩500만+ 성장세 | 월 수익 ₩100만 미만 정체 |

---

## 10. Implementation Roadmap

### Sprint 1: MVP Launch (Week 1-2) — 현재 진행 중

**Goal**: 최소 기능 제품을 배포하고 첫 사용자를 얻는다.

- [x] Next.js 프로젝트 셋업
- [x] 5개 계산기 엔진 (t-test, ANOVA, chi-square, correlation, descriptive)
- [x] 5개 계산기 UI + SEO 메타데이터
- [x] 랜딩 페이지 + 레이아웃
- [x] APA Word 내보내기 기능 (Pro) — docx 라이브러리, 5개 검정 모두 지원
- [x] AI 결과 해석 API (Pro) — Claude API 연동 (/api/interpret)
- [x] Paywall UI — AI 해석 블러 프리뷰 + Word 내보내기 잠금
- [x] 가격 페이지 — Free/Pro Monthly/Pro Annual + FAQ + 기능 비교표
- [x] Pro 기능 컴포넌트 (AiInterpretation, ExportButton, CopyToast)
- [ ] i18n 설정 (한국어 + 영어)
- [ ] Lemon Squeezy 결제 연동
- [ ] Vercel 배포 + 도메인 연결
- [ ] Google Analytics 연동
- [ ] Google Search Console 등록

### Sprint 2: Growth Foundation (Week 3-4)

**Goal**: SEO 기반을 다지고 커뮤니티 마케팅을 시작한다.

- [ ] sitemap.xml + robots.txt
- [ ] JSON-LD structured data (각 계산기)
- [ ] SEO 콘텐츠 페이지 10개 ("APA t-test 보고 방법" 등)
- [ ] AdSense 신청
- [ ] 에브리타임/김박사넷 런칭 포스트
- [ ] Product Hunt 제출
- [ ] Reddit 포스팅
- [ ] "어떤 검정을 써야 할까?" 가이드 페이지
- [ ] 사용자 피드백 수집 도구 (간단한 피드백 버튼)

### Sprint 3: Retention & Revenue (Month 2-3)

**Goal**: 유료 전환을 최적화하고 Expert Review를 런칭한다.

- [ ] 사용자 인증 (이메일 기반)
- [ ] 분석 히스토리 저장
- [ ] CSV 데이터 업로드
- [ ] Expert Review 시스템 (AI 분석 + 대시보드)
- [ ] 추가 계산기 (회귀분석, 매개효과)
- [ ] A/B 테스트: 가격, CTA, Pro 기능 범위
- [ ] 이메일 수집 + 뉴스레터

### Sprint 4: Scale (Month 3-6)

**Goal**: University 영업을 시작하고 pSEO로 트래픽을 10배 키운다.

- [ ] pSEO 페이지 자동 생성 (50+ 페이지)
- [ ] University License 시스템
- [ ] 대학 교수 아웃리치 이메일
- [ ] SPSS output → APA 변환 도구
- [ ] 다국어 확장 준비 (일본어?)
- [ ] 추가 계산기 (비모수, 신뢰도, 효과크기)

---

## 11. Success Metrics (KPIs)

### North Star Metric
**Monthly Recurring Revenue (MRR)**

### Primary KPIs

| KPI | Month 3 목표 | Month 6 목표 | Month 12 목표 |
|-----|-------------|-------------|--------------|
| MRR | ₩300K | ₩2M | ₩6M |
| 월 방문자 | 2,500 | 13,000 | 50,000 |
| Pro 구독자 | 30 | 120 | 400 |
| Free→Pro 전환율 | 2% | 3% | 3.5% |
| Expert Review/월 | 5건 | 15건 | 30건 |
| University 계약 | 0 | 1 | 3 |

### Secondary KPIs
- Bounce rate < 60%
- 평균 세션 시간 > 3분
- 계산기 사용 완료율 > 40%
- Pro 월간 이탈율 < 8%
- NPS > 40

---

## 12. Brand & Design

### Brand Identity
- **Name**: StatMate
- **Tagline**: Your Statistics Companion
- **한국어**: StatMate - 나만의 통계 도우미
- **Tone**: Professional yet approachable. 학술적이되 친근하게.
- **Color**: Blue-600 (#2563EB) primary, Purple-600 (#9333EA) for Pro features
- **Typography**: Inter (UI), Times New Roman (APA output)

### Design Principles
1. **결과가 주인공**: 계산 결과와 APA 포맷이 시각적으로 가장 돋보여야 함
2. **3클릭 안에 결과**: 데이터 입력 → Calculate → 결과 확인
3. **Pro 가치가 보여야 함**: 무료에서도 Pro 결과 미리보기를 보여주되, 내보내기/AI 해석에 lock
4. **모바일 우선**: 한국 대학원생은 모바일 사용률 높음

---

## Appendix: Key Research Data Sources

- 경쟁사 14개 분석 (socscistatistics, omnicalculator, numiqo, simplyputpsych 등)
- SimilarWeb 트래픽 데이터
- Google Keyword Planner 검색량
- 한국 교육통계 (대학원생 수)
- EdTech SaaS 벤치마크 (First Page Sage 2026)
- 숨고/크몽 통계 외주 시장 관찰

---

*Document prepared: 2026-02-16*
*Next action: Sprint 1 남은 항목 실행 (i18n, 결제, AI 해석, 배포)*

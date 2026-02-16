# StatMate UX & Product Quality Specification

**Version**: 1.0
**Date**: 2026-02-16

---

## 1. 현재 제품 Gap 분석

현재 만들어진 것과 "돈 버는 제품" 사이의 차이를 정리한다.

| 영역 | 현재 상태 | 필요한 상태 | 우선순위 |
|------|----------|------------|---------|
| 계산 기능 | 5개 계산기 동작 | 동일 (충분) | - |
| APA 결과 표시 | 화면에 표시됨 | 동일 + 복사 피드백 | P1 |
| AI 해석 | 없음 | 블러 미리보기 + Pro 잠금 | P0 |
| Word 내보내기 | 없음 | Pro 잠금 버튼 | P0 |
| 페이월 | 없음 | AI/내보내기에 자물쇠 | P0 |
| 결제 | 없음 | Lemon Squeezy 연동 | P0 |
| i18n | 영어만 | 한국어 + 영어 | P0 |
| 에러 처리 | 기본 텍스트 | 친절한 안내 + 복구 방법 | P1 |
| 빈 상태 | "Enter data..." 텍스트 | 가이드 + 예시 데이터 제안 | P1 |
| 로딩 상태 | 없음 (즉시 계산) | AI 해석 로딩 표시 | P1 |
| 입력 검증 | 기본 (2개 이상) | 실시간 피드백 + 도움말 | P1 |
| 모바일 | 반응형 기본 | 모바일 최적화 | P1 |
| 복사 피드백 | 없음 (navigator.clipboard만) | 토스트 알림 | P1 |
| 검정 선택 가이드 | 없음 | "어떤 검정을 써야 할까?" | P1 |
| 접근성 | 기본 | 키보드, ARIA, 색 대비 | P2 |
| 데이터 프라이버시 | 없음 | "데이터는 서버에 저장되지 않습니다" | P1 |
| 신뢰 시그널 | 없음 | 전문가 소개, 정확성 보증 | P1 |
| SEO 기술 | meta만 | structured data, OG 이미지 | P1 |
| 인쇄 | 없음 | 결과 인쇄 스타일 | P2 |

---

## 2. User Experience States (모든 인터랙션)

모든 UI 요소는 5가지 상태를 갖는다.

### 2.1 계산기 결과 영역

**Empty (초기 상태)**
```
┌─────────────────────────────────────────┐
│                                         │
│    📊 결과가 여기에 표시됩니다              │
│                                         │
│    데이터를 입력하고 "Calculate"를          │
│    클릭하세요.                            │
│                                         │
│    처음이세요?                            │
│    [예시 데이터로 시작하기 →]              │
│                                         │
│    어떤 검정을 써야 할지 모르겠나요?         │
│    [검정 선택 가이드 →]                    │
│                                         │
└─────────────────────────────────────────┘
```

**Loading (AI 해석 요청 중)**
```
┌─────────────────────────────────────────┐
│ APA-Formatted Result                    │
│ t(58) = 2.45, p = .018, d = 0.63       │
│                                         │
│ 🤖 AI Analysis                          │
│ ┌─────────────────────────────────┐     │
│ │ ◌ AI가 분석 중입니다...           │     │
│ │   (약 3-5초 소요)                │     │
│ │ ▓▓▓▓▓▓▓▓░░░░░░░░░░            │     │
│ └─────────────────────────────────┘     │
└─────────────────────────────────────────┘
```

**Success (결과 표시)**
현재 구현 + 아래 개선사항 적용

**Error (계산 실패)**
```
┌─────────────────────────────────────────┐
│ ⚠️ 계산할 수 없습니다                     │
│                                         │
│ Group 1에 최소 2개의 숫자가 필요합니다.     │
│                                         │
│ 💡 확인해 보세요:                         │
│ • 숫자가 쉼표(,)로 구분되어 있나요?        │
│ • 문자나 특수문자가 포함되어 있지 않나요?    │
│ • 최소 2개 이상의 숫자가 입력되었나요?      │
│                                         │
│ [예시 데이터로 시작하기]                   │
└─────────────────────────────────────────┘
```

**Partial (일부 입력만 있을 때)**
- 입력 필드 아래에 실시간 카운트: "입력된 값: 5개"
- 대응표본 t-test: "Group 1: 5개, Group 2: 3개 ⚠️ 같은 수가 필요합니다"

### 2.2 복사 버튼 피드백

```
[복사 전]  "Copy to clipboard"
[복사 중]  "Copied!" ✓  (1.5초 후 원래로)
[복사 실패] "Copy failed — please select and copy manually"
```

토스트 알림으로 구현 (화면 하단에 잠깐 표시):
```
┌──────────────────────────────┐
│ ✓ APA 결과가 복사되었습니다    │
└──────────────────────────────┘
```

---

## 3. Data Input UX

### 3.1 입력 도움말

모든 textarea에 적용:

**실시간 파싱 피드백**
```
[textarea]
23, 25, 28, abc, 22, , 27

입력된 유효한 값: 5개
⚠️ 무시된 값: "abc" (숫자가 아님), 빈 값 1개
```

**입력 형식 가이드**
```
지원하는 입력 형식:
• 쉼표: 23, 25, 28, 22, 27
• 공백: 23 25 28 22 27
• 줄바꿈: 한 줄에 하나씩
• 혼합: 위 형식 자유롭게 조합
• 탭: Excel/SPSS에서 복사-붙여넣기 가능
```

**Excel/SPSS 복사-붙여넣기 지원**
- 탭 구분자(\t) 자동 인식
- 열 머리글(텍스트) 자동 무시
- "SPSS에서 열을 복사하면 바로 붙여넣기 됩니다"

### 3.2 데이터 요약 표시

입력 직후 (Calculate 누르기 전):
```
Group 1: 10개 값 | 범위: 22-29 | 평균: 25.2
Group 2: 10개 값 | 범위: 17-23 | 평균: 20.0
```

이걸 보면 사용자가 "데이터가 제대로 들어갔구나" 확인 가능.
잘못된 데이터를 넣고 Calculate 하는 실수를 줄임.

### 3.3 Chi-Square 입력 개선

현재: 숫자 input 필드 그리드
개선:
```
┌──────────────────────────────────────┐
│ 데이터 입력 방식 선택:                 │
│ [○ 직접 입력] [○ 표 붙여넣기]         │
│                                      │
│ [표 붙여넣기 모드]                    │
│ Excel이나 SPSS에서 교차표를            │
│ 복사해서 아래에 붙여넣으세요:          │
│ ┌────────────────────────────┐       │
│ │ (텍스트 영역)               │       │
│ │ 50  30                     │       │
│ │ 20  40                     │       │
│ └────────────────────────────┘       │
│ ✓ 2×2 표가 감지되었습니다             │
└──────────────────────────────────────┘
```

---

## 4. "어떤 검정을 써야 할까?" 가이드

### 4.1 왜 이게 중요한가

사용자의 **가장 큰 고민**은 "어떤 통계 검정을 써야 하는지 모르겠다"이다.
이 가이드 하나로 StatMate를 **통계 분석의 시작점**으로 만든다.

### 4.2 인터랙티브 가이드 플로우

```
/guide 페이지

"어떤 통계 검정이 필요한가요?"
"질문에 답하면 적합한 검정을 추천해 드립니다."

Q1: 무엇을 알고 싶으세요?
  [○ 두 집단의 차이] → Q2a
  [○ 세 집단 이상의 차이] → Q2b
  [○ 두 변수의 관계] → Q2c
  [○ 데이터 요약/기술] → → Descriptive Statistics
  [○ 범주형 변수 간 관계] → → Chi-Square

Q2a: 두 집단은 어떤 관계인가요?
  [○ 서로 다른 사람들 (독립)] → Independent T-Test
  [○ 같은 사람의 전후 비교 (대응)] → Paired T-Test

Q2b: 세 집단 이상의 차이
  → One-Way ANOVA

Q2c: 두 변수의 관계
  [○ 둘 다 연속형 (숫자)] → Pearson Correlation
  [○ 순서형 또는 비정규] → Spearman Correlation

→ 결과:
┌─────────────────────────────────────────┐
│ 🎯 추천: Independent Samples T-Test     │
│                                         │
│ 서로 다른 두 집단의 평균을 비교할 때       │
│ 사용합니다.                              │
│                                         │
│ 예: 실험집단 vs 통제집단, 남성 vs 여성    │
│                                         │
│ [T-Test 계산기 바로가기 →]               │
│                                         │
│ 💡 이 검정을 쓰려면:                     │
│ • 종속변수가 연속형(숫자)이어야 합니다     │
│ • 각 집단에 최소 2개 값이 필요합니다       │
│ • 정규성을 가정합니다 (n≥30이면 괜찮음)   │
└─────────────────────────────────────────┘
```

### 4.3 AI 기반 가이드 (Pro)

텍스트로 질문하면 AI가 추천:
```
"100명에게 설문을 했는데, 성별에 따라 만족도 점수가 다른지 보고 싶어요"

🤖 AI 추천:
→ Independent Samples T-Test
이유: 성별(2개 집단)에 따른 만족도(연속형)의 차이를
비교하는 것이므로 독립표본 t-검정이 적합합니다.

[T-Test 계산기 바로가기 →]
```

---

## 5. Trust & Credibility (신뢰 설계)

### 5.1 왜 중요한가

학술 도구는 **정확성에 대한 신뢰**가 생명이다.
"이 계산기 결과를 논문에 써도 되는 건가?" — 이 불안을 해소해야 한다.

### 5.2 신뢰 요소 배치

**모든 계산기 하단:**
```
┌─────────────────────────────────────────────────┐
│ 🔬 정확성 보증                                    │
│                                                   │
│ StatMate의 계산은 학술 표준 알고리즘을              │
│ 사용합니다:                                       │
│ • T-Test: Welch's t-test (등분산 가정 불필요)      │
│ • ANOVA: Type III Sum of Squares                  │
│ • Correlation: Fisher z-transform for CI          │
│                                                   │
│ 결과는 SPSS, R과 동일한 값을 산출합니다.            │
│ [검증 방법론 자세히 보기 →]                         │
│                                                   │
│ 🔒 데이터 프라이버시                               │
│ 입력한 데이터는 서버에 전송되거나 저장되지 않습니다.  │
│ 모든 계산은 브라우저에서 실행됩니다.                 │
│ (AI 해석 사용 시에만 암호화된 연결로 전송됩니다)     │
└─────────────────────────────────────────────────┘
```

**About 페이지:**
```
만든 사람:
[이름] — 통계 분석 전문가
• 숨고/크몽 통계 분석 전문 프리랜서 [N]년
• [관련 학위/경력]
• 연간 [N]건 이상의 통계 분석 수행

"대학원생들이 통계 때문에 고생하는 걸 수백 번 봤습니다.
APA 표 하나 만드는 데 반나절을 쓰고, 해석이 맞는지
불안해하는 모습을 보면서, 이 도구를 만들기로 했습니다."
```

### 5.3 검증 페이지

`/verification` 페이지에 각 계산기의 결과를 SPSS/R과 비교한 표를 게시:

```
T-Test 검증
데이터: [23, 25, 28, 22, 27] vs [19, 21, 18, 22, 20]

| 통계량    | StatMate | SPSS 28  | R 4.3   |
|----------|----------|----------|---------|
| t        | 3.3541   | 3.354    | 3.3541  |
| df       | 7.86     | 7.860    | 7.8598  |
| p        | .0103    | .010     | .01026  |
| Cohen's d| 2.1213   | 2.121    | 2.1213  |

✓ 모든 값이 소수점 3자리까지 일치합니다.
```

---

## 6. 마이크로 인터랙션

### 6.1 Calculate 버튼

```
[기본]     "Calculate"  (bg-blue-600)
[hover]    "Calculate"  (bg-blue-700, shadow)
[클릭]     "Calculating..." + spinner (0.3s)
[완료]     "✓ Done"  (bg-green-600, 1s 후 원래로)
```

### 6.2 결과 등장 애니메이션

결과가 나올 때 위에서 아래로 순차 등장 (staggered fade-in):
1. APA 결과 카드 (0ms)
2. 유의성 뱃지 (100ms)
3. 상세 결과 (200ms)
4. AI 해석 영역 (300ms)
5. 내보내기/Expert Review (400ms)

CSS: `opacity 0→1, translateY 8px→0, duration 300ms`

### 6.3 복사 토스트

```tsx
// 화면 하단 중앙, 2초 후 자동 사라짐
<Toast>
  ✓ 클립보드에 복사되었습니다
</Toast>
```

### 6.4 Tab 전환

Independent ↔ Paired 전환 시:
- 입력 데이터 유지 (지우지 않음)
- 결과는 초기화
- 부드러운 crossfade

### 6.5 숫자 입력 실시간 파싱

textarea 입력과 동시에 하단에 파싱 결과 표시:
```
"23, 25, abc, 28" → "✓ 3개 유효한 값 | ⚠ 1개 무시됨"
```

---

## 7. 반응형 & 모바일 최적화

### 7.1 Breakpoints

| Breakpoint | 화면 | 레이아웃 |
|------------|------|---------|
| < 640px | 모바일 | 1열, 세로 스택 |
| 640-1024px | 태블릿 | 1열, 넓은 카드 |
| > 1024px | 데스크톱 | 2열 (입력 | 결과) |

### 7.2 모바일 특수 처리

**입력 영역:**
- textarea rows: 모바일 4줄, 데스크톱 3줄
- 숫자 키패드 자동 표시: `inputMode="decimal"`
- Load Example 버튼 더 크게 (모바일에서 첫 경험 중요)

**결과 영역:**
- 계산 완료 후 자동 스크롤 → 결과 영역으로
- 테이블: 가로 스크롤 (이미 적용) + 스크롤 힌트 표시

**Sticky CTA (모바일만):**
```
┌──────────────────────────────────┐
│ ⭐ AI 해석 + Word 내보내기        │
│ [7일 무료 체험 →]                 │
└──────────────────────────────────┘
```
화면 하단에 고정. 결과가 있을 때만 표시.

**네비게이션 (모바일):**
- 햄버거 메뉴
- 열면: 5개 계산기 목록 + 가격 + 가이드

### 7.3 터치 타겟

모든 클릭 가능 요소: 최소 44×44px (Apple HIG 기준)

---

## 8. 접근성 (Accessibility)

### 8.1 최소 기준 (WCAG 2.1 Level AA)

- 색 대비: 텍스트 4.5:1, 대형 텍스트 3:1
- 키보드 네비게이션: Tab으로 모든 기능 접근 가능
- ARIA labels: 모든 인터랙티브 요소
- Screen reader: 결과가 나올 때 `aria-live="polite"` 로 알림
- Focus visible: 포커스 링 항상 표시

### 8.2 구체적 적용

```tsx
// 계산 결과 영역
<div aria-live="polite" aria-atomic="true">
  {result && <ResultsDisplay result={result} />}
</div>

// 복사 버튼
<button aria-label="Copy APA result to clipboard">
  Copy to clipboard
</button>

// 에러 메시지
<div role="alert">
  {error}
</div>

// 탭
<TabsTrigger value="independent" aria-controls="panel-independent">
  Independent Samples
</TabsTrigger>
```

---

## 9. 성능 목표

| 지표 | 목표 | 측정 |
|------|------|------|
| LCP (Largest Contentful Paint) | < 1.5s | Lighthouse |
| FID (First Input Delay) | < 100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| 계산 실행 시간 | < 50ms | 브라우저 (클라이언트 사이드) |
| AI 해석 응답 | < 5s | API 응답 시간 |
| Word 내보내기 생성 | < 3s | API 응답 시간 |
| Lighthouse Score | > 90 | Performance + Accessibility + SEO |
| 번들 사이즈 | < 200KB (initial) | next build 출력 |

### 9.1 최적화 전략

- 계산기 컴포넌트: `"use client"` + dynamic import (라우트별 코드 분할)
- jstat: tree-shaking으로 사용하는 함수만 포함
- 이미지: 없음 (SVG 아이콘만 사용) → 매우 가벼움
- 폰트: Inter만 사용, subset 로딩
- AI 해석: 결과 나온 후 별도 fetch (초기 로딩에 영향 없음)

---

## 10. 에러 핸들링 원칙

### 10.1 에러 메시지 톤

**하면 안 되는 것:**
- "Error: Invalid input" (무엇이 잘못인지 모름)
- "Calculation failed" (어떻게 해야 하는지 모름)

**해야 하는 것:**
- 무엇이 잘못인지 + 어떻게 고치는지 + 대안

### 10.2 에러 유형별 메시지

| 상황 | 메시지 |
|------|--------|
| 데이터 없음 | "데이터를 입력해 주세요. [예시 데이터로 시작하기]" |
| 값이 1개 | "최소 2개의 값이 필요합니다. 현재 1개입니다." |
| 숫자가 아닌 값 | "'abc'는 숫자가 아닙니다. 숫자만 입력해 주세요." |
| 대응 표본 불일치 | "대응표본 t-test는 두 그룹의 데이터 수가 같아야 합니다. Group 1: 5개, Group 2: 3개" |
| 분산이 0 | "모든 값이 동일하여 검정을 수행할 수 없습니다." |
| AI 해석 실패 | "AI 해석을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요. [다시 시도]" |
| 네트워크 오류 | "인터넷 연결을 확인해 주세요. 계산 자체는 오프라인에서도 가능합니다." |

---

## 11. 데이터 프라이버시 설계

### 11.1 원칙

학술 데이터는 민감할 수 있다 (환자 데이터, 미발표 연구 등).
**"데이터는 안전합니다"를 적극적으로 커뮤니케이션한다.**

### 11.2 구현

**모든 계산기 입력 영역 위:**
```
🔒 데이터는 서버에 전송되지 않습니다. 모든 계산은 브라우저에서 실행됩니다.
```

**AI 해석 사용 시:**
```
🔒 AI 해석을 위해 계산 결과(통계값)만 서버에 전송됩니다.
원본 데이터는 전송되지 않습니다.
전송된 데이터는 저장되지 않으며 즉시 폐기됩니다.
```

**Privacy Policy 핵심:**
- 원본 데이터: 서버 미전송, 브라우저에서만 처리
- AI 해석: 계산 결과(M, SD, t, p 등)만 전송, 저장 안 함
- 결제 정보: Lemon Squeezy가 처리 (PCI DSS 준수)
- 쿠키: GA4 + 기능 쿠키만, 추적 쿠키 없음
- 분석 히스토리 (Pro): 사용자가 삭제 가능

---

## 12. SEO 기술 스펙

### 12.1 Structured Data (JSON-LD)

각 계산기 페이지에 삽입:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "T-Test Calculator",
  "description": "Free online t-test calculator with APA-formatted results",
  "url": "https://statmate.io/calculators/t-test",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

블로그 가이드 페이지:
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Report T-Test Results in APA Format",
  "step": [...]
}
```

### 12.2 Open Graph

```html
<meta property="og:title" content="Free T-Test Calculator - APA Results | StatMate" />
<meta property="og:description" content="Run t-tests instantly. Get APA-formatted results with AI interpretation." />
<meta property="og:image" content="https://statmate.io/og/t-test.png" />
<meta property="og:type" content="website" />
```

OG 이미지: 각 계산기별 1200×630px 프리뷰 이미지 (Vercel OG로 동적 생성)

### 12.3 Technical SEO

- canonical URL 설정 (i18n 대응)
- hreflang 태그 (ko, en)
- sitemap.xml 자동 생성
- robots.txt
- 404 페이지 (관련 계산기 추천)
- URL 구조: /[locale]/calculators/[test]

---

## 13. 인쇄 스타일

연구자는 결과를 인쇄한다. `@media print` 스타일 적용:

```css
@media print {
  /* 숨길 것 */
  header, footer, nav,
  .pro-upsell, .sticky-cta,
  button, textarea,
  .ad-slot { display: none; }

  /* 보여줄 것 */
  .results-display {
    break-inside: avoid;
    font-family: "Times New Roman", serif;
  }

  /* APA 표 강조 */
  .apa-result {
    border: 2px solid black;
    padding: 1rem;
  }

  /* 출처 표시 */
  .results-display::after {
    content: "Generated by StatMate (statmate.io)";
    font-size: 10pt;
    color: gray;
  }
}
```

---

## 14. 향후 개선 로드맵 (품질 관점)

### Phase 1 (MVP, Week 1-2)
- [x] 5개 계산기 기본 동작
- [ ] 복사 토스트 피드백
- [ ] 에러 메시지 개선
- [ ] 모바일 기본 최적화
- [ ] 데이터 프라이버시 메시지
- [ ] 입력 데이터 실시간 카운트

### Phase 2 (품질 향상, Week 3-4)
- [ ] 검정 선택 가이드 (/guide)
- [ ] Calculate 버튼 애니메이션
- [ ] 결과 등장 애니메이션
- [ ] 빈 상태 개선
- [ ] ARIA / 접근성
- [ ] 인쇄 스타일
- [ ] Structured Data
- [ ] OG 이미지

### Phase 3 (완성도, Month 2+)
- [ ] 입력 실시간 파싱 피드백
- [ ] Chi-Square 표 붙여넣기 모드
- [ ] 다크 모드
- [ ] 키보드 단축키 (Ctrl+Enter = Calculate)
- [ ] 데이터 로컬 저장 (탭 실수로 닫았을 때 복구)
- [ ] 검증 페이지 (SPSS/R 비교표)

---

*이 문서는 PRD.md, SERVICE_DESIGN.md와 함께 사용됩니다.*
*PRD = 전략, SERVICE_DESIGN = 서비스 설계, UX_SPEC = 제품 품질*

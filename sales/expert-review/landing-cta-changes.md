# statmate Expert Review CTA 강화 — Landing 변경 계획

> CTO 위임 (statmate 세션). 이번 주 적용.

---

## 목표

statmate 4K 사용자 중 **Expert Review 결제 의향자**를 funnel로:
- 학위논문 통계 작성 학생 (가장 큰 고통: "이 통계 맞나?")
- 가격 ₩49,000~199,000 = LMS Pro $5.99 대비 8-30배. **결제 의향 전혀 다른 시장**.

## 변경 대상 (5곳)

### 1. Footer (모든 페이지)

**기존**:
```
© 2026 statmate.org · All rights reserved
[Privacy] [Terms] [About]
```

**변경**:
```
© 2026 statmate.org · All rights reserved
[Privacy] [Terms] [About] · 📊 학위논문 통계 검토 ₩49,000 → /expert-review
```

(영문은 "Thesis stat review $39 →")

### 2. Calculator 결과 페이지 (20개 calculator 모두)

결과 출력 후 카드 추가:

```
┌──────────────────────────────────────────┐
│  📊 결과가 맞는지 확인이 필요하신가요?       │
│                                            │
│  학위논문/저널 투고 전 전문가 검토            │
│  통계 분석 + APA 작성 + 해석 ₩49,000      │
│                                            │
│  [전문가 검토 신청 →]  [결과 더 보기]       │
└──────────────────────────────────────────┘
```

위치: 결과 표 아래, AI 해석 paywall 위.

### 3. Wizard 결과 페이지 (`/wizard`)

검정 추천 후 추가:

```
"확실하지 않으세요? 전문가가 직접 데이터 보고 추천합니다 → ₩49,000"
```

### 4. About 페이지 / How-to Cite

기존 학술 신뢰 페이지에 Expert Review 자연스럽게 노출:

```
"statmate 결과로 충분하지 않다면, Expert Review 서비스로
PhD 통계 전문가의 1:1 검토를 받을 수 있습니다."
```

### 5. Korean Blog 25개

각 블로그 끝에 CTA 추가:

```
> **이 분석을 본인 데이터로 직접 해보고 싶으세요?**
> statmate.org에서 무료로. 또는 Expert Review로 PhD 통계 전문가의
> 검토 (₩49,000)를 받으세요.
```

## Expert Review 페이지 자체 강화 (`/expert-review`)

### 기존 (mailto MVP)
폼 → mailto → 이메일 → 수동 응대

### 개선 (실제 결제로)
1. **3-tier 명확화** (이미 PRD에 있음):
   - **Basic ₩49,000**: 통계 결과 검토 + APA 문장 작성 (3-5일)
   - **Standard ₩99,000**: + 데이터 정제 + 검정 추천 (5-7일)
   - **Premium ₩199,000**: + Zoom 1:1 30분 + 보고서 (7-10일)

2. **LemonSqueezy product 등록** (₩49K/99K/199K 3개)

3. **결제 후 자동 이메일** (Resend):
   - "결제 확인. 데이터 업로드 링크: ..."
   - 회장에게 알림 (검토 시작)

4. **회장 처리 SOP**:
   - 데이터 업로드 받음 → 24h 이내 회장 검토 시작
   - Basic: statmate에서 분석 + APA 자동 출력 → 검토 의견 추가 → 발송 (1-2시간)
   - Standard/Premium: 추가 검정 + 보고서 작성 (반나절~1일)

## KPI (4주)

- Footer/Calculator CTA → Expert Review 페이지 클릭 100건+
- Expert Review 페이지 → 결제 5건+
- Basic 5건 = ₩245K = $180 = 회사 손익분기 7배

## 위험

- 회장 직접 처리 부담 (반나절/건). 5건/주 = 2.5일/주 인력 소요
- 품질 차이 시 환불 요청 가능 → Standard/Premium 전환으로 수익 유지
- LemonSqueezy 등록 + 자동 이메일 통합 = CTO 1일 작업

## CTO Task Estimate

- Footer 변경: 30분
- Calculator 결과 카드: 2시간 (20개 페이지에 동일 컴포넌트)
- Wizard CTA: 30분
- About 페이지: 30분
- Blog 25개 CTA: 1시간 (sed로 일괄)
- Expert Review 페이지 LemonSqueezy 통합: 4-6시간
- 자동 이메일 (Resend): 2시간
- **Total: 1-2일**

## Priority

🔴 P0 (이번 주):
- Footer + Calculator 결과 CTA + Wizard CTA (가장 빠른 traffic 확보)
- LemonSqueezy ₩49,000 product 등록 (회장)

🟡 P1 (다음 주):
- Standard/Premium product
- 자동 이메일

🟢 P2 (W3-W4):
- Blog 25개 CTA
- About 페이지 강화

# 학위논문 통계 분석 흔한 실수 5가지 + 전문가 검토 안내

> statmate.org Korean blog 게시 + Hashnode/Medium cross-post
> 타깃: 학위논문 작성 중인 한국 학생/연구자
> CTA: Expert Review 결제 (₩49,000)

---

## 1. 정규성 가정 미검정 → 검정 결과 무효화

가장 흔한 실수. t-test나 ANOVA를 돌리기 전 데이터가 정규분포를 따르는지 검정하지 않습니다.

**왜 문제인가**: parametric test (t-test, ANOVA, 회귀)는 정규성 가정에 기반합니다. 이를 위반하면 p-value가 부정확합니다.

**올바른 절차**:
1. Shapiro-Wilk test (n < 50) 또는 Kolmogorov-Smirnov (n ≥ 50)
2. 정규성 위반 시 → 비모수 검정 (Mann-Whitney, Wilcoxon, Kruskal-Wallis 등)
3. 또는 데이터 변환 (log, sqrt) 후 재검정

**statmate 활용**: 모든 calculator에 "가정 검정" 자동 표시. 위반 시 대안 검정 추천.

---

## 2. 등분산성 검정 누락

독립표본 t-test나 ANOVA에서 두 그룹의 분산이 같다는 가정을 검정하지 않는 경우.

**왜 문제인가**: Levene's test 또는 Bartlett's test로 등분산성 확인이 필수. 위반 시 Welch's t-test 또는 Welch's ANOVA 사용해야 합니다.

**올바른 절차**:
- Levene's test 결과 p > .05 → 등분산성 충족 → 일반 t-test/ANOVA
- p < .05 → 등분산성 위반 → Welch corrected test

**statmate 활용**: 자동 Levene + Welch correction 적용 옵션 제공.

---

## 3. 다중비교 보정 미적용

ANOVA 후 post-hoc로 여러 그룹쌍 비교 시 alpha 인플레이션 문제 무시.

**왜 문제인가**: ANOVA에서 유의 (p < .05) 결과 나오면 어떤 그룹쌍이 다른지 post-hoc 분석 필요. 그러나 여러 비교를 하면 Type I error rate 증가 (예: 5쌍 비교 → 실제 alpha = .226).

**올바른 보정**:
- Bonferroni (보수적, 안전)
- Tukey HSD (균형형)
- Scheffé (가장 보수적)
- Dunn's test (비모수 post-hoc)

**statmate 활용**: ANOVA/Kruskal-Wallis 후 자동 post-hoc 옵션 + 보정 방법 선택.

---

## 4. Effect Size 보고 누락

p-value만 보고 effect size를 안 보고하는 경우. APA 7th 표준은 effect size + 신뢰구간 둘 다 요구.

**왜 문제인가**: p < .05여도 effect size 작으면 실용적 의미 없음. APA 가이드는 Cohen's d, η², r 등을 명시 권고.

**올바른 보고 예시 (APA 7th)**:
```
t(48) = 2.34, p = .024, d = 0.67, 95% CI [0.10, 1.24]
```

**statmate 활용**: 모든 분석 결과에 effect size + 95% CI 자동 출력 (APA 7th 형식).

---

## 5. 회귀분석 multicollinearity 미검정

다중회귀분석 시 독립변수 간 다중공선성 (VIF) 검토 누락.

**왜 문제인가**: VIF > 10이면 독립변수 간 강한 상관 → 회귀 계수 불안정, 해석 어려움.

**올바른 절차**:
1. 모든 독립변수 VIF 계산
2. VIF > 10인 변수 → 제거 또는 합산 또는 PCA로 차원 축소
3. 또는 ridge/lasso regression 사용

**statmate 활용**: 다중회귀 결과에 VIF 자동 표시 + 위반 시 경고.

---

## 결론: 통계 분석은 검정 외에도 가정 + 보정 + 보고가 핵심

statmate.org에서 위 5가지를 자동 처리합니다 (무료):
- 가정 검정 자동 (정규성/등분산성)
- Post-hoc 보정 옵션
- Effect size + 95% CI 자동 출력
- VIF 자동 표시

> **본인 데이터로 직접 분석해보세요**: [statmate.org →](https://statmate.org)

---

## 학위논문 통계 100% 안전하게 — Expert Review

statmate에서 분석은 됐지만, **결과 해석**과 **APA 작성**에서 자신이 없으세요?

PhD 통계 전문가 (10년+ 경력)가 1:1 검토합니다:

| Tier | 가격 | 포함 | 소요 시간 |
|------|------|------|----------|
| **Basic** | ₩49,000 | 결과 검토 + APA 문장 + 1차 피드백 | 3-5일 |
| **Standard** | ₩99,000 | + 데이터 정제 + 검정 추천 + 2차 피드백 | 5-7일 |
| **Premium** | ₩199,000 | + Zoom 1:1 30분 + 보고서 + 무제한 수정 | 7-10일 |

**환불 정책**: 검토 결과가 만족스럽지 않으시면 100% 환불.

[Expert Review 신청 →](https://statmate.org/expert-review)

---

> 작성: 안형규 (statmate.org 운영자, 통계 분석 전문가)
> 문의: houng8087@gmail.com
> 발행: 2026-04-28

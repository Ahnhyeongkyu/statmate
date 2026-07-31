# statmate — AI 인용 유입 세그먼트 계측 (Q-260730-08 ⑤)

> 정본 스펙: `OPS/playbooks/statmate-paperstat-channels.md` C-1·2순위
> 작성 2026-07-31 · 계측 코드 = `lib/imeTrack.ts` · PostHog 프로젝트 443488(전 서비스 공유)

## 1. 결론 먼저

- **세그먼트 배선은 이미 있었다.** `commonProps`(imeTrack.ts:124)가 모든 이벤트에
  `saas`·`source`(퍼스트터치)를 붙인다 → 계측 코드 추가 0줄.
- **대신 매핑 결함 1건을 적발·수리했다.** `bing.com` 리퍼러가 `copilot`으로 접혀 있어
  AI 유입 세그먼트가 **4.3배 부풀려져** 있었다(아래 3절). 이 문서의 baseline은 수리 후 규격 기준.
- **전환 신호는 전 소스에서 사실상 0.** 28일 `cta_click` 총 17건(offer_view 1,800+ 대비).
  AI 유입의 "전환율"을 논할 모수가 아직 없다 — 지금 단계 판정은 **유입 크기와 행동 깊이까지**.

## 2. 질의 규격 (복붙용)

statmate는 `$pageview`를 쏘지 않는다(커스텀 IME-1 이벤트만). 단일 프로젝트를
전 서비스가 공유하므로 **`properties.saas='statmate'` 조건이 없으면 nomusa·sealedslate가 섞인다.**

```sql
-- 소스별 퍼널 (28일)
SELECT properties.source AS src,
       countIf(event='landing_view')      AS landing,
       countIf(event='calculation_done')  AS calc,
       countIf(event='paywall_offer_view') AS offer,
       countIf(event='cta_click')         AS cta,
       uniq(person_id)                    AS users
FROM events
WHERE properties.saas='statmate' AND timestamp >= now() - INTERVAL 28 DAY
GROUP BY src ORDER BY landing DESC
```

```sql
-- 세그먼트 무결성 감시: source 라벨 ↔ 실제 리퍼러 대조 (라벨 오염 재발 탐지)
SELECT properties.source AS src, properties.$referring_domain AS ref, count() AS n
FROM events
WHERE properties.saas='statmate' AND timestamp >= now() - INTERVAL 28 DAY
GROUP BY src, ref ORDER BY n DESC LIMIT 30
```

한계 2건(약속 금지 사항):
- `$initial_utm_source`는 이 프로젝트 택소노미에 **없다** → 퍼스트터치 귀속은 자체
  localStorage(`ime_source_v1`)에만 의존.
- ChatGPT 링크아웃은 `?utm_source=chatgpt.com`을 스스로 붙이므로 소스값이
  `chatgpt.com`(utm 경로)과 `chatgpt`(리퍼러 경로)로 **갈린다** — 집계 시 둘 다 합칠 것.

## 3. 적발한 계측 결함 — bing→copilot 접힘

`imeTrack.ts` 구 라인: `/(copilot\.microsoft\.com|bing\.com)/ → "copilot"`.

실측(28일, `source='copilot'` 세그먼트의 실제 리퍼러):

| 실제 리퍼러 | 건수 |
|---|---|
| www.bing.com | 3,591 |
| $direct(세션 내 후속) | 425 |
| cn.bing.com | 16 |
| **copilot.microsoft.com** | **2** |

즉 "AI 서피스 copilot 2,197 landing"의 실체는 **Bing 일반 웹검색**이었다.
수리: `copilot.(microsoft.)?com` → `copilot`, `bing.com` → `bing` 분리.
**소급 안 됨** — 기존 방문자는 localStorage에 옛 라벨을 보유하므로 재라벨링은 신규 방문자부터.
당분간 `copilot` 값은 신·구가 섞이니 위 무결성 질의로 리퍼러 대조해서 읽을 것.

## 4. Baseline (28일, 2026-07-03~31 · 수리 전 라벨 기준)

| source | landing | calc | offer | cta | users |
|---|---|---|---|---|---|
| google | 2,944 | 1,954 | 924 | 11 | 1,703 |
| direct | 2,344 | 516 | 284 | 3 | 1,863 |
| copilot(=사실상 bing) | 2,197 | 1,194 | 338 | 1 | 1,251 |
| **chatgpt.com** | **381** | **140** | **97** | **0** | **150** |
| duckduckgo | 195 | 5 | 3 | 0 | 124 |
| doubao.com | 49 | 13 | 7 | 0 | 4 |
| perplexity | 42 | 0 | 0 | 0 | 25 |
| copilot.com | 36 | 1 | 1 | 1 | 20 |

**진짜 AI 서피스 합**(chatgpt.com + perplexity + copilot.com + doubao + dokeyai)
= landing **516 / 전체 8,932 ≈ 5.8%**. 플레이북이 인용한 GA4 "chatgpt 480명/698세션"과는
여전히 자릿수가 다르다 — 두 계측을 한 표에 섞어 보고하지 말 것.

행동 깊이(landing→calc): google 66% · chatgpt.com 37% · perplexity 0%.
**perplexity는 42 landing에 calc 0** — 유입은 있으나 도구를 안 쓴다(랜딩 부적합 의심, 별도 제안).

## 5. 다음 측정 시점

②(mixed-anova·ancova·mediation 3편, 2026-07-31 게시)의 AI 인용 효과는
색인·인용 지연 때문에 **D+30(2026-08-30) 이전 판정 금지**. 그때 위 2절 질의를 다시 돌려
`chatgpt.com`·`perplexity` landing 증분과 신규 슬러그 유입을 대조한다.

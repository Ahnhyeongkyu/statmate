# statmate 육성 아웃리치 — paywall 비전환자 (Q-260714-08 #4)

> **목적**: 무료 계산기를 쓰다 paywall에서 이탈(결제 0)한 이메일 구독자에게 **가치 우선** 1:1 접촉 — 전환 + "왜 안 샀나" 진단(육성 겸용).
> **발송 = 회장/CEO 승인 후 수동**(Gmail). 대상 = `email_subscribers`(Supabase statmate-v2, **server-side·PII·비커밋**). 이 파일은 **템플릿만**(PII 0·커밋 가능).
> **정합**: statmate=전환병목(paywall_view 1050→cta 9→paid 0). offer=구독 아닌 **"지금 이 검정 하나 즉시 해결"**(구독 강조 금지). 톤=연구 동료의 도움 제안, 판촉 냄새 금지.
> **★데이터 주의(2026-07-22)**: 현재 구독자 4명(캡처 7/17 런칭). 소표본 = 개별 가짜 개인화 금지 — 아래 1종 템플릿에 실제 신호(가입 시 사용한 계산기 등, 있으면)만 슬롯 채움. 표본은 캡처 누적으로 성장.

---

## EN (global — ChatGPT/연구자 유입 주력)

**Subject:** Did you get your {analysis} sorted?

Hi{ name?},

You tried one of the statmate calculators a little while back — thanks for stopping by.

I'm reaching out personally because our tools are only useful if they actually get you unstuck. So, honestly: **did you get the result you needed?**

If you're still wrestling with any of these, just reply and I'll help with your specific case (no charge for the question):
- **Which test to run** for your design (t-test vs Mann–Whitney, ANOVA vs Kruskal–Wallis, etc.)
- **Reporting it in APA** (the exact `t(df)=…, p=…` line, effect size)
- **Interpreting** a result you already have

statmate is one-off, not a subscription — you pay only when you need a specific analysis done, then you're free. If a paid analysis would save you an evening, I'm happy to point you to the right one.

And if the site *didn't* fit what you needed — I'd genuinely value one line on **what was missing**. That feedback shapes what we build next.

— {sender}, statmate

---

## KR (한국 대학원생)

**제목:** {분석} 잘 마무리되셨나요?

안녕하세요{ 이름?}님,

얼마 전 statmate 계산기를 써 주셨네요 — 들러 주셔서 감사합니다.

도구는 실제로 막힌 걸 풀어드려야 의미가 있어서, 직접 여쭤봅니다: **필요하셨던 결과, 얻으셨나요?**

아래 중 아직 막히신 게 있으면 회신 주세요. 구체적인 케이스로 도와드립니다(질문은 무료):
- **어떤 검정을 써야 하나** (t검정 vs 만-휘트니, ANOVA vs 크루스칼-왈리스 등)
- **APA 표기** (정확한 `t(df)=…, p=…` 줄, 효과크기)
- 이미 얻은 **결과 해석**

statmate는 구독이 아니라 **단건**입니다 — 필요한 분석 하나를 그때 해결하고 끝. 유료 분석 하나가 하룻밤을 아껴드릴 상황이면 맞는 것으로 안내해 드릴게요.

혹시 사이트가 **필요를 못 채웠다면**, **뭐가 아쉬웠는지** 한 줄만 주시면 정말 큰 도움이 됩니다. 다음에 뭘 만들지의 기준이 됩니다.

— {보내는이}, statmate

---

## 발송 체크(회장/CEO)
- [ ] 대상 확정: `email_subscribers` 조회(server-side·비커밋) — 현재 4명, 누적 시 재발송
- [ ] 언어 매칭(가능하면 가입 소스로 추정), 이름 슬롯 채움(없으면 인사 생략)
- [ ] 회신 수신함 준비(질문 무료 응대 = 육성). "뭐가 아쉬웠나" 응답은 statmate.md 플레이북에 축적
- [ ] 발송(Gmail 수동·소량이라 개별 발송 권장) — 대량 발송 아님(4명)

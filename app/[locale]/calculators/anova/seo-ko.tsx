export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        분산분석(ANOVA)이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        분산분석(ANOVA, Analysis of Variance)은 3개 이상의 독립 집단 간
        평균을 비교하여 통계적으로 유의한 차이가 있는지를 판단하는 기본적인
        통계 방법입니다. t-검정은 한 번에 두 집단만 비교할 수 있는 반면,
        ANOVA는 단일 통합 검정으로 여러 집단을 동시에 비교할 수
        있으며&mdash;다중 쌍별 t-검정을 수행할 경우 증가하는 제1종 오류율을
        효과적으로 통제합니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        이 기법은 Sir Ronald A. Fisher가 1920년대 영국 Rothamsted 실험
        연구소에서 근무하던 중 개발했습니다. Fisher는 작물 수확량에 여러
        처리를 적용하는 농업 실험을 분석하기 위해 ANOVA를 개발했습니다.
        그의 1925년 저서 <em>Statistical Methods for Research Workers</em>에서
        F-분포와 F-검정을 소개했으며&mdash;이는 그의 이름을 딴
        것으로&mdash;오늘날 모든 ANOVA의 수학적 근간으로 남아 있습니다.
        이후 한 세기에 걸쳐 ANOVA는 심리학, 의학, 교육학, 생물학, 마케팅 등
        거의 모든 실증 연구 분야에서 핵심적인 분석 도구가 되었습니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        ANOVA는 근본적으로 데이터의 총 변동성을 두 가지 요소로 분할합니다:{" "}
        <strong>집단 간 분산</strong>(집단 평균 간 차이에 의한 변동성)과{" "}
        <strong>집단 내 분산</strong>(각 집단 내 개인차에 의한 변동성, 오차
        또는 잔차 분산이라고도 함). 이 두 분산 추정치의 비율이{" "}
        <em>F</em>-통계량을 생성합니다. 집단 간 분산이 집단 내 분산보다
        상당히 큰 경우 <em>F</em>값이 크고, 대응하는 <em>p</em>값이
        작아지며&mdash;이는 적어도 하나의 집단 평균이 다른 집단과 유의하게
        다르다는 것을 나타냅니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        일원배치 분산분석: 단일 요인 설계
      </h3>
      <p className="text-gray-600 leading-relaxed">
        일원배치 분산분석(단일 요인 분산분석이라고도 함)은 하나의
        독립변수(요인)만 있을 때 3개 이상의 독립 집단 평균이 다른지를
        검정합니다. 예를 들어, 임상 연구자가 세 가지 약물 치료의 통증 완화
        점수를 비교하거나, 교육자가 네 가지 교수법의 시험 성적을 비교할 수
        있습니다. &quot;일원배치&quot;라는 명칭은 하나의 집단화 변수만을
        검토한다는 것을 나타냅니다. 두 개 이상의 요인(예: 약물 종류{" "}
        <em>와</em> 용량)이 있는 경우, 이원배치 또는 요인 분산분석이
        필요하며, 이는 이 계산기의 범위를 벗어납니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        일원배치 분산분석은 두 개의 자유도를 가진 단일 <em>F</em>-통계량을
        산출합니다: <em>df</em><sub>집단 간</sub>(집단 수 - 1)과{" "}
        <em>df</em><sub>집단 내</sub>(총 표본 크기 - 집단 수). 유의한{" "}
        <em>F</em>값은 적어도 하나의 집단 평균이 다르다는 것을 알려주지만,{" "}
        <em>어떤</em> 집단이 서로 다른지는 알려주지 않습니다. 이것이 바로
        사후검정의 역할입니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사후검정: 특정 집단 차이 식별
      </h3>
      <p className="text-gray-600 leading-relaxed">
        총괄 ANOVA <em>F</em>-검정이 통계적으로 유의할 때, 집단 평균이 모두
        같지 않다는 것은 알 수 있지만&mdash;정확히 어떤 집단 쌍이 다른지를
        확인하려면 사후검정(&quot;이것 이후&quot;라는 뜻의 라틴어)이
        필요합니다. 이 계산기는 가장 널리 사용되고 보수적인 사후검정 방법 중
        하나인 <strong>Bonferroni 교정</strong>을 사용합니다. Bonferroni
        절차는 원하는 유의수준(일반적으로 .05)을 쌍별 비교 횟수로 나누어,
        다중 비교가 이루어지더라도 전체 가족별 오류율이 .05 미만으로 유지되도록
        합니다. 3개 집단의 경우 3개의 쌍별 비교가 있으므로, 각 비교는
        &alpha; = .05 / 3 = .0167에서 평가됩니다. 이러한 보수성은
        거짓양성을 방지하지만, 집단이 많을 경우 Tukey의 HSD보다 약간 낮은
        검정력을 보일 수 있습니다.
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          풀이 예제: 세 가지 약물 치료 비교
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          제약 연구자가 두 가지 활성 약물과 위약의 통증 감소 효과(0&ndash;100
          시각적 아날로그 척도로 측정)를 비교하고자 합니다. 30명의 환자가 세
          집단 중 하나에 무작위 배정되었습니다(<em>n</em> = 집단당 10명).
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              약물 A (n = 10)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              72, 68, 75, 71, 69, 74, 70, 73, 67, 71
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 71.00, <em>SD</em> = 2.58
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              약물 B (n = 10)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              65, 60, 63, 62, 67, 64, 61, 66, 63, 59
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 63.00, <em>SD</em> = 2.62
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              위약 (n = 10)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              55, 58, 52, 57, 54, 59, 53, 56, 51, 55
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 55.00, <em>SD</em> = 2.62
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            분산분석 요약표
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">변동원</th>
                  <th className="py-1 text-left font-medium text-gray-600">SS</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>df</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">MS</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>F</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">집단 간</td>
                  <td className="py-1 text-gray-700">1280.00</td>
                  <td className="py-1 text-gray-700">2</td>
                  <td className="py-1 text-gray-700">640.00</td>
                  <td className="py-1 text-gray-700">93.18</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">집단 내</td>
                  <td className="py-1 text-gray-700">185.40</td>
                  <td className="py-1 text-gray-700">27</td>
                  <td className="py-1 text-gray-700">6.87</td>
                  <td className="py-1 text-gray-700"></td>
                  <td className="py-1 text-gray-700"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em>(2, 27) = 93.18, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;</em> = .87
          </p>
          <p className="mt-2 text-sm text-gray-600">
            효과크기(<em>&eta;&sup2;</em> = .87)는 매우 크며, 이는 통증
            점수의 총 분산 중 약 87%가 집단 소속에 의해 설명된다는 것을
            나타냅니다.
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            Bonferroni 사후검정 비교
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">비교</th>
                  <th className="py-1 text-left font-medium text-gray-600">평균 차이</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em> (교정)</th>
                  <th className="py-1 text-left font-medium text-gray-600">유의?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">약물 A vs. 약물 B</td>
                  <td className="py-1 text-gray-700">8.00</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">예</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">약물 A vs. 위약</td>
                  <td className="py-1 text-gray-700">16.00</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">예</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">약물 B vs. 위약</td>
                  <td className="py-1 text-gray-700">8.00</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">예</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Bonferroni 교정 후 세 가지 쌍별 비교 모두 통계적으로
            유의했습니다. 약물 A가 가장 높은 통증 감소를 보였고, 약물 B가 그
            다음이며, 위약 집단이 가장 적은 개선을 보고했습니다.
          </p>
        </div>
      </div>

      {/* When to Use ANOVA vs Other Tests */}
      <h3 className="text-xl font-semibold text-gray-900">
        ANOVA vs 다른 검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        적절한 통계 검정의 선택은 집단 수, 데이터의 특성, 측정이 독립적인지
        반복적인지에 따라 달라집니다. 아래 표는 가장 일반적인 상황과 각각에
        권장되는 검정을 요약합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">상황</th>
              <th className="py-2 text-left font-semibold">집단</th>
              <th className="py-2 text-left font-semibold">권장 검정</th>
              <th className="py-2 text-left font-semibold">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 text-gray-700">2개 독립 집단의 평균 비교</td>
              <td className="py-2 text-gray-700">2</td>
              <td className="py-2 font-medium">독립표본 t-검정</td>
              <td className="py-2 text-gray-500">Welch의 t-검정을 기본으로 권장</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">3개 이상 독립 집단의 평균 비교</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">일원배치 분산분석</td>
              <td className="py-2 text-gray-500">유의하면 사후검정으로 후속 분석</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">비정규 데이터, 3개 이상 독립 집단</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">Kruskal-Wallis H 검정</td>
              <td className="py-2 text-gray-500">일원배치 분산분석의 비모수 대안</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">동일 피험자에 대해 3개 이상 조건 측정</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">반복측정 분산분석</td>
              <td className="py-2 text-gray-500">피험자 내 상관을 고려</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">비정규 반복측정, 3개 이상 조건</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">Friedman 검정</td>
              <td className="py-2 text-gray-500">반복측정 분산분석의 비모수 대안</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">두 개 이상의 요인을 동시에 분석</td>
              <td className="py-2 text-gray-700">다양</td>
              <td className="py-2 font-medium">이원배치 / 요인 분산분석</td>
              <td className="py-2 text-gray-500">주효과와 상호작용 검정</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        흔한 실수는 3개 이상의 집단이 있을 때 ANOVA 대신 다중 t-검정을
        수행하는 것입니다. 3개 집단의 경우 각각 &alpha; = .05인 3개의 쌍별
        t-검정이 필요합니다. 적어도 하나의 거짓양성이 나타날 확률은 약
        1 &minus; (1 &minus; .05)<sup>3</sup> = .14로, 의도한 오류율의 거의
        3배입니다. ANOVA는 모든 집단을 단일 총괄 검정으로 검증하여 이
        문제를 해결합니다.
      </p>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        일원배치 분산분석의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        ANOVA 결과를 해석하기 전에, 다음 네 가지 가정이 합리적으로
        충족되는지 확인해야 합니다. 이러한 가정을 위반하면 부정확한{" "}
        <em>p</em>값과 신뢰할 수 없는 결론으로 이어질 수 있습니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 관찰의 독립성</p>
          <p className="mt-1 text-sm text-gray-600">
            각 관찰은 다른 모든 관찰과 독립적이어야 합니다. 이는 한
            참가자의 점수가 다른 참가자의 점수에 영향을 미치지 않아야 함을
            의미합니다. 독립성은 적절한 실험 설계&mdash;집단에 대한 무작위
            배정과 참가자의 군집 또는 내포 없음&mdash;에 의해 보장됩니다.
            위반은 교실 연구(같은 반 학생들은 독립적이지 않음)와 종단
            설계에서 흔합니다. 관찰이 독립적이지 않으면 혼합효과 모형이나
            반복측정 분산분석을 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 정규성</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 각 집단 내에서 대략 정규분포를 따라야 합니다.
            히스토그램이나 Q-Q 도표를 사용하여 시각적으로 또는 Shapiro-Wilk
            검정을 사용하여 공식적으로 정규성을 평가할 수 있습니다. 그러나
            ANOVA는 중심극한정리 덕분에 표본 크기가 중간 이상(대략 집단당{" "}
            <em>n</em> &ge; 20)인 경우 정규성 위반에 매우 강건합니다. 소표본
            + 심하게 치우친 데이터의 경우 비모수 대안인 Kruskal-Wallis H
            검정을 사용하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 등분산성 (분산의 동질성)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수의 분산은 모든 집단에서 대략 동일해야 합니다. 이 가정은{" "}
            <strong>Levene 검정</strong>을 사용하여 검증합니다: 비유의한
            Levene 검정(<em>p</em> &gt; .05)은 분산이 충분히 동일함을
            시사합니다. 경험적으로, 집단 크기가 동일할 때 ANOVA는 불균등
            분산에 강건합니다. 집단 크기가 불균등하고 Levene 검정이 유의한
            경우, 등분산을 가정하지 않는 <strong>Welch의 ANOVA</strong>나
            Brown-Forsythe 검정을 대안으로 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 등간 또는 비율 측정 척도
          </p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 연속형 척도(등간 또는 비율)로 측정되어야 합니다.
            ANOVA는 평균과 분산 계산에 의존하며, 이는 연속형 데이터에서만
            의미가 있습니다. 종속변수가 서열형(예: 순위나 리커트 척도
            항목)이면 Kruskal-Wallis 검정을 사용하세요. 결과가 범주형(예:
            합격/불합격)이면 카이제곱 검정을 사용하세요.
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        에타제곱(<em>&eta;&sup2;</em>) 효과크기 이해하기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>p</em>값은 집단 차이가 통계적으로 유의한지를 알려주는 반면,{" "}
        <strong>에타제곱</strong>(<em>&eta;&sup2;</em>)은 실용적 관점에서 그
        차이가 얼마나 큰지를 알려줍니다. 에타제곱은 종속변수의 총 분산 중
        집단 소속에 의해 설명되는 비율을 나타냅니다. 계산식은{" "}
        <em>&eta;&sup2;</em> = SS<sub>집단 간</sub> / SS<sub>총</sub>입니다.
        예를 들어, <em>&eta;&sup2;</em> = .14는 점수 변동성의 14%가 집단화
        변수에 기인한다는 것을 의미합니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        효과크기 보고는 필수적입니다. 충분히 큰 표본에서는 사소한 작은
        차이도 유의한 <em>p</em>값을 산출할 수 있기 때문입니다. Cohen(1988)은{" "}
        <em>&eta;&sup2;</em> 해석을 위해 다음과 같은 널리 사용되는 기준을
        제시했습니다:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">
                <em>&eta;&sup2;</em> 값
              </th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">실용적 의미</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">0.01</td>
              <td className="py-2">작은 효과</td>
              <td className="py-2 text-gray-500">
                ~1%의 분산 설명; 집단 간 차이가 미미함
              </td>
            </tr>
            <tr>
              <td className="py-2">0.06</td>
              <td className="py-2">중간 효과</td>
              <td className="py-2 text-gray-500">
                ~6%의 분산 설명; 의미 있고 눈에 띄는 차이
              </td>
            </tr>
            <tr>
              <td className="py-2">0.14</td>
              <td className="py-2">큰 효과</td>
              <td className="py-2 text-gray-500">
                ~14% 이상의 분산 설명; 실질적이고 중요한 차이
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: 일부 연구자는 특히 복잡한 요인 설계에서 편향이 적은 대안으로{" "}
        <strong>부분 에타제곱</strong>(<em>&eta;<sub>p</sub>&sup2;</em>) 또는{" "}
        <strong>오메가제곱</strong>(<em>&omega;&sup2;</em>)을 선호합니다.
        단일 요인의 일원배치 분산분석에서는 에타제곱과 부분 에타제곱이
        동일합니다. 오메가제곱은 약간 더 보수적인 추정치를 제공하며 일부
        학술지에서 선호됩니다.
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식으로 ANOVA 결과 보고하기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판 지침에 따르면, ANOVA 결과에는 <em>F</em>-통계량, 두
        자유도, <em>p</em>값, 효과크기 측정치를 포함해야 합니다. 각 집단의
        기술통계(평균과 표준편차)도 보고해야 합니다. 다음은 풀이 예제가
        포함된 템플릿입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            총괄 F-검정 (일원배치 분산분석)
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            일원배치 분산분석 결과, 세 가지 치료 조건에 따른 통증 감소
            점수에서 통계적으로 유의한 차이가 나타났다, <em>F</em>(2, 27) =
            93.18, <em>p</em> &lt; .001, <em>&eta;&sup2;</em> = .87. 약물
            A(<em>M</em> = 71.00, <em>SD</em> = 2.58)가 약물 B(<em>M</em> =
            63.00, <em>SD</em> = 2.62)와 위약(<em>M</em> = 55.00,{" "}
            <em>SD</em> = 2.62)보다 유의하게 높은 점수를 보였다.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            사후검정 비교 (Bonferroni)
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            Bonferroni 교정 사후검정 결과, 약물 A(<em>M</em> = 71.00,{" "}
            <em>SD</em> = 2.58)가 약물 B(<em>M</em> = 63.00, <em>SD</em> =
            2.62)보다 유의하게 더 큰 통증 감소를 보였으며, <em>p</em> &lt;
            .001, 평균 차이 = 8.00, 95% CI [5.26, 10.74], 위약(<em>M</em> =
            55.00, <em>SD</em> = 2.62)보다도 유의하게 더 큰 통증 감소를
            보였다, <em>p</em> &lt; .001, 평균 차이 = 16.00, 95% CI [13.26,
            18.74]. 약물 B도 위약보다 유의하게 높은 점수를 보였다,{" "}
            <em>p</em> &lt; .001, 평균 차이 = 8.00, 95% CI [5.26, 10.74].
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>F</em>값은 소수점 둘째 자리까지 보고합니다. <em>p</em>값은
        소수점 셋째 자리까지 보고하되, .001 미만인 경우 <em>p</em> &lt; .001로
        표기합니다. 통계 기호(<em>F</em>, <em>p</em>, <em>M</em>,{" "}
        <em>SD</em>, <em>&eta;&sup2;</em>)는 항상 이탤릭체로 표기합니다.
        .001 미만인 경우를 제외하고, 가능한 한 정확한 <em>p</em>값(예:{" "}
        <em>p</em> = .034)을 부등호(예: <em>p</em> &lt; .05) 대신
        보고하세요.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>ANOVA 대신 다중 t-검정 수행:</strong> 3개 이상의 집단에서
          교정 없이 쌍별 t-검정을 수행하면 가족별 오류율이 증가합니다. 예를
          들어, 5개 집단의 경우 10개의 비교가 필요하며, 실제 alpha가 약
          .40으로 상승합니다. 항상 총괄 ANOVA로 시작하고, <em>F</em>-검정이
          유의한 경우에만 사후검정을 사용하세요.
        </li>
        <li>
          <strong>총괄 <em>F</em>가 유의하지 않을 때 사후검정 수행:</strong>{" "}
          전체 ANOVA가 유의하지 않으면(<em>p</em> &gt; .05), 사후 쌍별
          비교를 진행해서는 안 됩니다. 이는 우연을 이용하여 가짜
          &quot;유의한&quot; 차이를 만들 수 있습니다. 예외는 데이터 수집
          전에 정의된 특정 <em>사전 계획</em> 대비가 있는 경우입니다.
        </li>
        <li>
          <strong><em>p</em> = .000 보고:</strong> 통계 소프트웨어가 때때로{" "}
          <em>p</em> = .000으로 표시하지만, 항상 <em>p</em> &lt; .001로
          보고해야 합니다. <em>p</em>값은 절대로 정확히 0이 될 수
          없으며&mdash;무한히 작을 수 있지만 0은 아닙니다.
        </li>
        <li>
          <strong>효과크기 무시:</strong> 통계적으로 유의한 <em>F</em>-검정이
          작은 <em>&eta;&sup2;</em>(예: .01)을 보이면, 집단 간 차이가
          있지만 실용적 영향은 무시할 수 있다는 의미입니다. 항상{" "}
          <em>&eta;&sup2;</em>을 <em>p</em>값과 함께 보고하고 둘 다
          해석하세요.
        </li>
        <li>
          <strong>등분산성 가정 무시:</strong> 집단 크기가 불균등하고 분산이
          상당히 다를 때, 표준 ANOVA <em>F</em>-검정은 신뢰할 수 없게
          됩니다. 결과를 해석하기 전에 Levene 검정을 수행하세요. 유의하면
          Welch의 ANOVA로 전환하거나 Brown-Forsythe 교정을 사용하세요.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 일원배치 분산분석 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1">aov()</code>와{" "}
          <code className="rounded bg-green-100 px-1">summary()</code> 함수
          및 SPSS GLM 출력에 대해 검증되었습니다. <em>F</em>-분포에 jstat
          라이브러리를 사용하며, 합동 집단 내 분산을 이용한 Bonferroni 교정
          쌍별 비교를 계산합니다. 모든 <em>F</em>-통계량, <em>p</em>값,
          에타제곱 값, 사후검정 결과는 R과 SPSS 출력과 소수점 4자리 이상
          일치합니다. 자유도는 표준 공식을 사용하여 계산합니다:{" "}
          <em>df</em><sub>집단 간</sub> = <em>k</em> &minus; 1,{" "}
          <em>df</em><sub>집단 내</sub> = <em>N</em> &minus; <em>k</em>,
          여기서 <em>k</em>는 집단 수이고 <em>N</em>은 총 표본 크기입니다.
        </p>
      </div>
    </section>
  );
}

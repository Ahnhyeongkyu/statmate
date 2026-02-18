export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        이원분산분석(Two-Way ANOVA)이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        이원분산분석(Two-Way ANOVA, 요인분산분석이라고도 함)은 두 개의 독립적인
        범주형 변수(요인)가 하나의 연속형 종속변수에 미치는 영향을 동시에
        검정하는 통계 방법입니다. 일원분산분석(One-Way ANOVA)이 하나의 요인만
        검정하는 것과 달리, 이원분산분석은 요인 A의 주효과, 요인 B의 주효과,
        그리고 두 요인 간의 상호작용 효과까지 세 가지 가설을 한 번에 검정합니다.
        심리학, 의학, 교육학, 사회과학 등의 실험 연구에서 가장 널리 사용되는
        분석 도구 중 하나입니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        연구 설계에 각각 두 개 이상의 수준을 가진 두 개의 독립 범주형 요인과
        등간 또는 비율 척도로 측정된 하나의 연속형 종속변수가 있을 때
        이원분산분석을 사용합니다. 치료 유형과 인구통계 집단의 결합 효과, 용량과
        투여 방법, 또는 동시에 측정된 두 가지 집단화 변수의 효과를 검토하는 실험
        설계에서 흔히 사용됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        이원분산분석 vs 일원분산분석
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">일원분산분석</th>
              <th className="py-2 text-left font-semibold">이원분산분석</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">요인 수</td>
              <td className="py-2">1</td>
              <td className="py-2">2</td>
            </tr>
            <tr>
              <td className="py-2">검정 내용</td>
              <td className="py-2">1개 주효과</td>
              <td className="py-2">2개 주효과 + 1개 상호작용</td>
            </tr>
            <tr>
              <td className="py-2">상호작용</td>
              <td className="py-2">해당 없음</td>
              <td className="py-2 font-medium">검정 가능</td>
            </tr>
            <tr>
              <td className="py-2">효과크기</td>
              <td className="py-2">&eta;&sup2;</td>
              <td className="py-2">부분 &eta;&sup2;</td>
            </tr>
            <tr>
              <td className="py-2">설계 복잡도</td>
              <td className="py-2">단순</td>
              <td className="py-2">요인설계 (A &times; B)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: 2 &times; 2 요인설계
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 학습 방법(방법 A vs 방법 B)과 시험 난이도(쉬움 vs 어려움)가
          시험 점수에 미치는 영향을 검정합니다. 각 셀에 5명의 학생이 무선
          배정되었습니다.
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            학습 방법: <em>F</em>(1, 16) = 52.27, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .77
          </p>
          <p className="text-sm text-gray-600">
            난이도: <em>F</em>(1, 16) = 36.82, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .70
          </p>
          <p className="text-sm text-gray-600">
            상호작용: <em>F</em>(1, 16) = 0.33, <em>p</em> = .576,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .02
          </p>
          <p className="mt-2 text-sm text-gray-600">
            두 주효과 모두 유의하지만 상호작용은 유의하지 않으며, 이는 방법 A가
            방법 B보다 우수한 효과가 난이도 수준에 관계없이 일관됨을 의미합니다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        이원분산분석의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        결과를 해석하기 전에 다음 네 가지 가정을 확인하십시오:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 정규성</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 설계의 각 셀 내에서 대략적으로 정규분포를 따라야 합니다.
            Shapiro-Wilk 검정이나 Q-Q 도표로 평가할 수 있습니다. 셀 크기가
            동일하고 적절히 클 때 ANOVA는 중간 정도의 위반에 강건합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 등분산성</p>
          <p className="mt-1 text-sm text-gray-600">
            모든 셀에 걸쳐 분산이 대략 동일해야 합니다. Levene 검정으로 확인할 수
            있습니다. 집단 크기가 불균등하고 분산이 다를 경우 결과의 신뢰성이
            떨어질 수 있습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 관측치의 독립성</p>
          <p className="mt-1 text-sm text-gray-600">
            각 관측치는 독립적이어야 합니다. 셀에 대한 무선 배정이 독립성을
            보장합니다. 관측치가 중첩되거나 반복 측정인 경우 혼합효과 모형을
            사용하십시오.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 등간 또는 비율 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 연속형(등간 또는 비율 척도)이어야 합니다. 서열 또는 범주형
            결과의 경우 정렬 순위 변환(Aligned Rank Transform)과 같은 비모수적
            대안을 고려하십시오.
          </p>
        </div>
      </div>

      {/* Interaction Interpretation */}
      <h3 className="text-xl font-semibold text-gray-900">
        상호작용 효과의 해석
      </h3>
      <p className="text-gray-600 leading-relaxed">
        상호작용은 이원분산분석에서 가장 중요한 부분입니다. 유의한 상호작용은 한
        요인의 효과가 다른 요인의 수준에 따라 달라짐을 의미합니다. 상호작용이
        유의한 경우, 한 요인에 걸친 평균 차이가 다른 요인의 서로 다른 수준에서
        반대 패턴을 숨길 수 있으므로 주효과를 신중하게 해석해야 합니다. 이런
        경우 전체 주효과 대신 단순 주효과(각 요인 B 수준에서의 요인 A 효과 등)를
        보고하십시오.
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        각 효과(요인 A, 요인 B, 상호작용)를 개별적으로 보고하며,{" "}
        <em>F</em>-통계량, 자유도, <em>p</em>-값, 부분 에타제곱을 포함합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            2 &times; 2 피험자간 분산분석을 실시하였다. 학습 방법의 주효과가
            유의하였다, <em>F</em>(1, 16) = 52.27, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .77. 난이도의 주효과도
            유의하였다, <em>F</em>(1, 16) = 36.82, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .70. 학습 방법과 난이도의
            상호작용은 유의하지 않았다, <em>F</em>(1, 16) = 0.33, <em>p</em> =
            .576, <em>&eta;&sup2;<sub>p</sub></em> = .02.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 요인설계에서는 항상 부분 <em>&eta;&sup2;</em>(일반{" "}
        <em>&eta;&sup2;</em>가 아닌)을 보고하십시오. <em>F</em>, <em>p</em>,{" "}
        <em>&eta;&sup2;</em>를 이탤릭체로 표기하고, 효과와 잔차 모두의 자유도를
        보고하십시오.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>유의한 상호작용 무시:</strong> 상호작용이 유의한 경우 주효과를
          단독으로 해석하면 오해의 소지가 있습니다. 항상 상호작용을 먼저
          확인하십시오.
        </li>
        <li>
          <strong>별도의 일원분산분석 실행:</strong> 각 요인을 개별적으로
          분석하면 상호작용 효과를 놓치고 통계적 검정력을 낭비합니다. 대신
          이원분산분석을 사용하십시오.
        </li>
        <li>
          <strong>조정 없는 불균형 설계:</strong> 셀 크기가 매우 불균형한 경우
          표준 Type I 제곱합은 오해의 소지가 있을 수 있습니다. Type III 제곱합을
          고려하거나 가능하면 균형 설계를 보장하십시오.
        </li>
        <li>
          <strong>에타제곱과 부분 에타제곱 혼동:</strong> 요인설계에서는 항상
          다른 효과로 인한 분산을 분모에서 제거하는 부분{" "}
          <em>&eta;&sup2;</em>을 보고하십시오.
        </li>
        <li>
          <strong>충분한 표본 크기 없이 너무 많은 수준:</strong> 4 &times; 4
          설계는 16개의 셀을 가집니다. 셀당 3개의 관측치만 있으면 오차 자유도가
          매우 낮아져 통계적 검정력이 감소합니다.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 이원분산분석 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1">aov()</code> 및 SPSS GLM
          출력과 비교 검증되었습니다. 구현은 균형 공식 제곱합과{" "}
          <em>F</em>-분포를 위한 jstat 라이브러리를 사용합니다. 모든{" "}
          <em>F</em>-통계량, <em>p</em>-값, 부분 에타제곱 값이 R 및 SPSS
          출력과 일치합니다. 자유도는 표준 공식을 사용합니다:{" "}
          <em>df</em><sub>A</sub> = <em>a</em> &minus; 1,{" "}
          <em>df</em><sub>B</sub> = <em>b</em> &minus; 1,{" "}
          <em>df</em><sub>AB</sub> = (<em>a</em> &minus; 1)(<em>b</em> &minus;
          1), <em>df</em><sub>error</sub> = <em>N</em> &minus; <em>ab</em>.
        </p>
      </div>
    </section>
  );
}

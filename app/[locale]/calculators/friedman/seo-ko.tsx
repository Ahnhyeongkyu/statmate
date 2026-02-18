export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Friedman 검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Friedman 검정은 세 개 이상의 관련 집단(반복 측정)에서 차이를
        감지하는 데 사용되는 비모수적 통계 검정입니다. 반복측정
        분산분석(Repeated Measures ANOVA)의 비모수적 대안입니다. Milton
        Friedman이 1937년에 개발하였으며, 각 피험자 내에서 조건 간
        관측치를 순위화한 후 평균 순위가 조건 간에 유의하게 다른지
        검정합니다. 의학, 심리학, 교육학에서 사전-사후-추적 설계 및
        피험자 내 실험에 널리 사용됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        세 개 이상의 조건이 있는 반복 측정 또는 매칭 설계에서 다음 조건 중
        하나 이상에 해당할 때 Friedman 검정을 사용합니다: 데이터가 서열
        척도로 측정된 경우, 정규성 가정이 위반된 경우, 표본 크기가 작은
        경우, 또는 이상값이 포함된 경우. 일반적인 응용에는 시간에 따른
        치료 효과 비교, 동일한 평가자의 제품 선호도 평가, 여러 시점에서
        측정된 설문 응답 분석이 포함됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Friedman 검정 vs 반복측정 ANOVA
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">Friedman 검정</th>
              <th className="py-2 text-left font-semibold">반복측정 ANOVA</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">유형</td>
              <td className="py-2">비모수적</td>
              <td className="py-2">모수적</td>
            </tr>
            <tr>
              <td className="py-2">데이터 수준</td>
              <td className="py-2">서열 또는 연속</td>
              <td className="py-2">연속(등간/비율)</td>
            </tr>
            <tr>
              <td className="py-2">정규성 필요</td>
              <td className="py-2 font-medium">아니오</td>
              <td className="py-2">예 (또는 대표본)</td>
            </tr>
            <tr>
              <td className="py-2">설계</td>
              <td className="py-2">반복 측정 / 매칭</td>
              <td className="py-2">반복 측정 / 매칭</td>
            </tr>
            <tr>
              <td className="py-2">효과크기</td>
              <td className="py-2">Kendall&apos;s <em>W</em></td>
              <td className="py-2">부분 &eta;&sup2;</td>
            </tr>
            <tr>
              <td className="py-2">사후 검정</td>
              <td className="py-2">Nemenyi / Bonferroni</td>
              <td className="py-2">Bonferroni 쌍별 비교</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: Friedman 검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 10명의 환자의 통증 수준을 세 시점(치료 전, 1주 후, 4주
          후)에서 측정합니다. 통증 평가는 서열 데이터이고 설계가 반복
          측정이므로 Friedman 검정이 적합합니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">기준선 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">72, 85, 91, 68, 77, 83, 95, 88, 74, 79</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 80.5</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">1주 후 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">78, 89, 95, 73, 82, 87, 98, 92, 79, 83</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 85.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">4주 후 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">82, 93, 99, 78, 86, 91, 102, 96, 84, 88</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 89.5</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>&chi;&sup2;</em>(2) = 20.00, <em>p</em> &lt; .001,{" "}
            <em>W</em> = 1.00
          </p>
          <p className="mt-2 text-sm text-gray-600">
            시점 간에 유의한 차이가 있었으며, 큰 효과크기를 나타냈습니다.
            사후 비교에서 기준선에서 두 추적 시점 모두로 유의한 개선이
            확인되었습니다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Friedman 검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Friedman 검정은 반복측정 ANOVA보다 제한이 적지만, 여전히 가정이
        있습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 서열 또는 연속 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 최소한 서열 척도로 측정되어야 하며, 각 피험자 내에서
            값을 의미 있게 순위화할 수 있어야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 관련 집단 (반복 측정)</p>
          <p className="mt-1 text-sm text-gray-600">
            동일한 피험자가 모든 조건에서 측정되어야 합니다. 독립
            집단의 경우 Kruskal-Wallis H 검정을 대신 사용하십시오.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 동일한 표본 크기</p>
          <p className="mt-1 text-sm text-gray-600">
            각 피험자가 조건당 하나의 관측치를 제공하므로, 각 조건은 동일한
            수의 관측치를 가져야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 무작위 표본</p>
          <p className="mt-1 text-sm text-gray-600">
            피험자는 관심 모집단에서 무작위로 선택되어야 합니다. 비무작위
            선택은 결과의 일반화 가능성을 제한할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        Kendall의 W(일치계수) 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Kendall의 W(일치계수)는 Friedman 검정의 효과크기입니다. 0에서
        1까지의 범위를 가지며, 0은 순위에서 일치가 없음을, 1은 완전한
        일치를 의미합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold"><em>W</em></th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">실질적 의미</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.1</td>
              <td className="py-2">무시할 수준</td>
              <td className="py-2 text-gray-500">조건이 거의 동일</td>
            </tr>
            <tr>
              <td className="py-2">0.1 - 0.3</td>
              <td className="py-2">작은 효과</td>
              <td className="py-2 text-gray-500">조건 간 약간의 일관된 차이</td>
            </tr>
            <tr>
              <td className="py-2">0.3 - 0.5</td>
              <td className="py-2">중간 효과</td>
              <td className="py-2 text-gray-500">눈에 띄고 일관된 패턴</td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.5</td>
              <td className="py-2">큰 효과</td>
              <td className="py-2 text-gray-500">조건 간 강한 일관된 차이</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 7판 지침에 따라 카이제곱 통계량, 자유도, p-값, Kendall의 W를
        보고합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Friedman 검정 결과, 세 시점에 걸쳐 통증 수준에 통계적으로 유의한
            차이가 있었다, <em>&chi;&sup2;</em>(2) = 20.00, <em>p</em> &lt;
            .001, <em>W</em> = 1.00. Bonferroni 보정을 적용한 사후 쌍별
            비교에서 기준선(Mdn = 80.5)에서 1주(Mdn = 85.0) 및
            4주(Mdn = 89.5) 모두로 유의한 개선이 확인되었다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: &chi;&sup2;는 소수점 둘째 자리까지, 자유도는 정수로,{" "}
        <em>p</em>는 소수점 셋째 자리까지 보고합니다. p 값이 .001 미만일
        경우 <em>p</em> &lt; .001로 표기합니다. 항상 효과크기 지표로
        Kendall의 <em>W</em>를 함께 보고하십시오.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>비정규 반복측정 데이터에 ANOVA 사용:</strong> 반복측정
          데이터가 서열 척도이거나 소표본에서 명확히 비정규인 경우,
          Friedman 검정을 대신 사용하십시오.
        </li>
        <li>
          <strong>관련 집단에 Kruskal-Wallis 사용:</strong> Kruskal-Wallis
          검정은 독립 집단을 위한 것입니다. 반복 측정 또는 매칭 설계에서는
          항상 Friedman 검정을 사용하십시오.
        </li>
        <li>
          <strong>조건 간 관측 수 불일치:</strong> Friedman 검정은 각
          조건에서 동일한 수의 피험자를 요구합니다. 결측 데이터는 분석 전에
          처리해야 합니다(예: 목록별 삭제 또는 대체).
        </li>
        <li>
          <strong>사후 검정 누락:</strong> 유의한 Friedman 결과는 최소한
          하나의 조건이 다르다는 것만 알려줍니다. 항상 쌍별 비교로 구체적
          차이를 확인하십시오.
        </li>
        <li>
          <strong>효과크기 누락:</strong> 유의한 p-값만으로는 실질적
          중요성을 나타내지 않습니다. 검정 결과와 함께 항상 Kendall의
          W를 보고하십시오.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 Friedman 검정 계산은 R(friedman.test 함수) 및 SPSS
          출력과 비교 검증되었습니다. 구현은 p-값에 대한 카이제곱 근사와
          확률 분포를 위한 jstat 라이브러리를 사용합니다. 피험자 내 동점
          순위는 평균 순위 방법으로 처리됩니다. 모든 결과는 R 출력과 최소
          소수점 4자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

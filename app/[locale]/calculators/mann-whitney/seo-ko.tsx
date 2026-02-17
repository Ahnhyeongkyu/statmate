export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Mann-Whitney U 검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Mann-Whitney U 검정(Wilcoxon 순위합 검정이라고도 함)은 두 독립 집단의
        분포를 비교하는 데 사용되는 비모수적 통계 검정입니다. 독립표본
        t-검정과 달리 Mann-Whitney U 검정은 데이터가 정규분포를 따른다고
        가정하지 않으므로, 서열 데이터, 비대칭 분포 또는 정규성을 검증할 수
        없는 소표본에 적합합니다. 이 검정은 Henry B. Mann과 Donald R.
        Whitney가 1947년에 개발하였으며, 행동과학, 의학 및 사회 연구에서 가장
        널리 사용되는 비모수 검정 중 하나입니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Mann-Whitney U 검정은 독립표본 t-검정의 비모수적 대안입니다. 다음 조건
        중 하나 이상에 해당할 때 사용합니다: 데이터가 서열 척도(예: 리커트
        척도)로 측정된 경우, 정규성 가정이 위반된 경우, 표본 크기가 매우 작은
        경우(예: 집단당 n &lt; 15), 또는 모수적 결과를 왜곡할 수 있는 이상값이
        포함된 경우. 특히 평가 척도를 사용하는 임상시험, 삶의 질 연구, 교육
        연구에서 흔히 사용됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Mann-Whitney U vs 독립표본 T-검정
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">Mann-Whitney U</th>
              <th className="py-2 text-left font-semibold">독립표본 T-검정</th>
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
              <td className="py-2">비교 대상</td>
              <td className="py-2">순위 분포</td>
              <td className="py-2">평균</td>
            </tr>
            <tr>
              <td className="py-2">효과크기</td>
              <td className="py-2">순위양류상관 <em>r</em></td>
              <td className="py-2">Cohen&apos;s <em>d</em></td>
            </tr>
            <tr>
              <td className="py-2">이상값 강건성</td>
              <td className="py-2 font-medium">높음</td>
              <td className="py-2">낮음</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: Mann-Whitney U 검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 새로운 치료(집단 1)를 받은 환자와 위약(집단 2)을 받은
          환자의 통증 평가(1-10점 척도)를 비교합니다. 통증 평가는 서열
          데이터이고 표본이 작으므로 Mann-Whitney U 검정이 적합합니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">집단 1 &mdash; 치료군 (n=8)</p>
            <p className="mt-1 text-sm text-gray-500">85, 72, 91, 68, 77, 95, 83, 89</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 84.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">집단 2 &mdash; 위약군 (n=8)</p>
            <p className="mt-1 text-sm text-gray-500">65, 78, 71, 62, 73, 69, 75, 67</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 70.0</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>U</em> = 5.0, <em>z</em> = -2.84, <em>p</em> = .005,{" "}
            <em>r</em> = 0.84
          </p>
          <p className="mt-2 text-sm text-gray-600">
            치료군이 위약군보다 유의하게 높은 점수를 보였으며, 큰
            효과크기(순위양류상관 <em>r</em> = 0.84)를 나타냈습니다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Mann-Whitney U 검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Mann-Whitney U 검정은 t-검정보다 제한이 적지만, 여전히 검증해야 할
        가정이 있습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 서열 또는 연속 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 최소한 서열 척도로 측정되어야 합니다(즉, 값을 의미 있게
            순위화할 수 있어야 합니다). 여기에는 리커트 척도, 시험 점수, 반응
            시간 및 모든 연속 측정이 포함됩니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 독립 집단</p>
          <p className="mt-1 text-sm text-gray-600">
            두 집단은 서로 독립적이어야 합니다. 각 관측치는 하나의 집단에만
            속하며, 한 집단의 참가자가 다른 집단의 참가자에게 영향을 미치지
            않아야 합니다. 대응/매칭 데이터의 경우 Wilcoxon 부호순위 검정을
            사용하십시오.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 독립 관측</p>
          <p className="mt-1 text-sm text-gray-600">
            각 집단 내의 관측치는 독립적이어야 합니다. 반복 측정 또는 군집
            데이터는 이 가정을 위반하며, 다른 분석 방법이 필요합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 유사한 분포 형태 (중앙값 비교 시)</p>
          <p className="mt-1 text-sm text-gray-600">
            검정 결과를 중앙값 비교로 해석하려면, 두 집단의 분포 형태가
            유사해야 합니다(위치만 다른 경우). 이 가정이 충족되지 않으면, 검정은
            중앙값이 아닌 전체 순위 분포를 비교하는 것으로 해석됩니다.
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        순위양류상관(Rank-Biserial Correlation) 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        순위양류상관(<em>r</em>)은 Mann-Whitney U 검정에 권장되는 효과크기
        지표입니다. -1에서 +1까지의 범위를 가지며, 두 집단 간 유리한 비교와
        불리한 비교의 비율 차이를 나타냅니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">|<em>r</em>|</th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">실질적 의미</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.1</td>
              <td className="py-2">무시할 수준</td>
              <td className="py-2 text-gray-500">순위에서 두 집단이 거의 동일</td>
            </tr>
            <tr>
              <td className="py-2">0.1 - 0.3</td>
              <td className="py-2">작은 효과</td>
              <td className="py-2 text-gray-500">한 집단이 약간 높은 순위를 보이는 경향</td>
            </tr>
            <tr>
              <td className="py-2">0.3 - 0.5</td>
              <td className="py-2">중간 효과</td>
              <td className="py-2 text-gray-500">집단 간 눈에 띄는 분리</td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.5</td>
              <td className="py-2">큰 효과</td>
              <td className="py-2 text-gray-500">강한 분리, 한 집단의 대부분이 다른 집단보다 높은 순위</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 7판 지침에 따라 U 통계량, z 값, p-값, 효과크기, 그리고 각 집단의
        기술통계(중앙값 및 표본 크기)를 보고합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Mann-Whitney U 검정 결과 치료군(Mdn = 84.0, <em>n</em> = 8)의
            점수가 위약군(Mdn = 70.0, <em>n</em> = 8)보다 유의하게 높았다,{" "}
            <em>U</em> = 5.0, <em>z</em> = -2.84, <em>p</em> = .005,{" "}
            <em>r</em> = .84.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>U</em>는 소수점 첫째 자리까지, <em>z</em>는 소수점 둘째
        자리까지, <em>p</em>는 소수점 셋째 자리까지 보고합니다. p 값이
        .001 미만일 경우 <em>p</em> &lt; .001로 표기합니다. 항상 효과크기
        지표로 순위양류상관 <em>r</em>을 함께 보고하십시오.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>비정규 데이터에 t-검정 사용:</strong> 데이터가 서열
          척도이거나 소표본에서 명확히 비정규인 경우, t-검정은 오해의 소지가
          있는 결과를 줄 수 있습니다. 대신 Mann-Whitney U 검정을 사용하십시오.
        </li>
        <li>
          <strong>U를 평균 차이로 해석:</strong> Mann-Whitney U 검정은 순위
          분포를 비교하는 것이지 평균을 비교하는 것이 아닙니다. 기술통계로
          평균이 아닌 중앙값을 보고하십시오.
        </li>
        <li>
          <strong>동점 순위 무시:</strong> 많은 관측치가 동일한 값을 가질 때
          동점은 검정에 영향을 줄 수 있습니다. StatMate는 평균 순위 방법을
          사용하여 동점 순위를 자동으로 처리합니다.
        </li>
        <li>
          <strong>대응 데이터에 Mann-Whitney 사용:</strong> 데이터가 대응
          또는 매칭된 경우, Wilcoxon 부호순위 검정을 대신 사용하십시오.
        </li>
        <li>
          <strong>효과크기 누락:</strong> 유의한 p-값만으로는 차이의 크기를
          알 수 없습니다. 검정 결과와 함께 항상 순위양류상관을 보고하십시오.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 Mann-Whitney U 검정 계산은 R(wilcox.test 함수) 및 SPSS
          출력과 비교 검증되었습니다. 구현은 z-점수에 대한 연속성 보정을 포함한
          정규 근사와 확률 분포를 위한 jstat 라이브러리를 사용합니다. 동점
          순위는 평균 순위 방법으로 처리됩니다. 모든 결과는 R 출력과 최소
          소수점 4자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Kruskal-Wallis H 검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Kruskal-Wallis H 검정은 세 개 이상의 독립 집단의 분포를 비교하는
        데 사용되는 순위 기반 비모수적 통계 검정입니다. 일원분산분석(One-Way
        ANOVA)의 비모수적 대안으로, Mann-Whitney U 검정을 두 집단 이상으로
        확장한 것입니다. William Kruskal과 W. Allen Wallis가 1952년에
        개발하였으며, 집단 구분 없이 모든 관측치를 순위화한 후 순위 분포가
        집단 간에 다른지 검정합니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        세 개 이상의 독립 집단을 비교하고자 할 때, 다음 조건 중 하나 이상에
        해당하면 Kruskal-Wallis H 검정을 사용합니다: 데이터가 서열
        척도(예: 리커트 척도)로 측정된 경우, 정규성 가정이 위반된 경우,
        표본 크기가 매우 작은 경우, 또는 모수적 결과를 왜곡할 수 있는
        이상값이 포함된 경우. 의학 연구, 심리학, 교육학, 품질 관리 연구에서
        널리 사용됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Kruskal-Wallis H vs 일원분산분석(ANOVA)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">Kruskal-Wallis H</th>
              <th className="py-2 text-left font-semibold">일원분산분석</th>
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
              <td className="py-2">&eta;&sup2;<sub>H</sub></td>
              <td className="py-2">&eta;&sup2;</td>
            </tr>
            <tr>
              <td className="py-2">사후 검정</td>
              <td className="py-2">Dunn 검정</td>
              <td className="py-2">Tukey / Bonferroni</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: Kruskal-Wallis H 검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 세 가지 교육 프로그램에 대한 만족도 평가(1-10점 척도)를
          비교합니다. 평가가 서열 데이터이고 표본이 작으므로
          Kruskal-Wallis H 검정이 적합합니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">프로그램 A (n=7)</p>
            <p className="mt-1 text-sm text-gray-500">12, 15, 18, 14, 16, 13, 17</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 15.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">프로그램 B (n=7)</p>
            <p className="mt-1 text-sm text-gray-500">22, 25, 20, 28, 24, 26, 21</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 24.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">프로그램 C (n=7)</p>
            <p className="mt-1 text-sm text-gray-500">8, 11, 9, 13, 10, 7, 12</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 10.0</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>H</em>(2) = 16.06, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;</em><sub>H</sub> = 0.78
          </p>
          <p className="mt-2 text-sm text-gray-600">
            세 프로그램 간에 유의한 차이가 있었으며, 큰 효과크기를
            나타냈습니다. Bonferroni 보정을 적용한 Dunn 사후 검정 결과
            모든 쌍 간에 유의한 차이가 발견되었습니다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Kruskal-Wallis H 검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Kruskal-Wallis H 검정은 ANOVA보다 제한이 적지만, 여전히 검증해야 할
        가정이 있습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 서열 또는 연속 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 최소한 서열 척도로 측정되어야 합니다(즉, 값을 의미
            있게 순위화할 수 있어야 합니다).
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 독립 집단</p>
          <p className="mt-1 text-sm text-gray-600">
            집단은 서로 독립적이어야 합니다. 각 관측치는 하나의 집단에만
            속합니다. 관련 집단이나 반복 측정의 경우 Friedman 검정을
            사용하십시오.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 독립 관측</p>
          <p className="mt-1 text-sm text-gray-600">
            각 집단 내의 관측치는 독립적이어야 합니다. 반복 측정, 군집 또는
            대응 데이터는 이 가정을 위반합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 유사한 분포 형태</p>
          <p className="mt-1 text-sm text-gray-600">
            결과를 중앙값 비교로 해석하려면 모든 집단의 분포 형태가
            유사해야 합니다. 분포 형태가 다르면 검정은 순위 분포를 더
            광범위하게 비교합니다.
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        Eta-Squared H (&eta;&sup2;<sub>H</sub>) 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Eta-squared H (&eta;&sup2;<sub>H</sub>)는 Kruskal-Wallis 검정의
        효과크기 지표입니다. 집단 구성원에 의해 설명되는 순위 분산의
        비율을 추정하며, ANOVA의 &eta;&sup2;에 유사합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">&eta;&sup2;<sub>H</sub></th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">실질적 의미</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.01</td>
              <td className="py-2">무시할 수준</td>
              <td className="py-2 text-gray-500">순위에서 집단이 거의 동일</td>
            </tr>
            <tr>
              <td className="py-2">0.01 - 0.06</td>
              <td className="py-2">작은 효과</td>
              <td className="py-2 text-gray-500">순위 분포에서 약간의 차이</td>
            </tr>
            <tr>
              <td className="py-2">0.06 - 0.14</td>
              <td className="py-2">중간 효과</td>
              <td className="py-2 text-gray-500">집단 간 눈에 띄는 분리</td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.14</td>
              <td className="py-2">큰 효과</td>
              <td className="py-2 text-gray-500">순위 분포에서 강한 분리</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 7판 지침에 따라 H 통계량, 자유도, p-값, 효과크기, 그리고 각
        집단의 기술통계(중앙값 및 표본 크기)를 보고합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Kruskal-Wallis H 검정 결과, 세 프로그램 간 만족도 평가에 통계적으로
            유의한 차이가 있었다, <em>H</em>(2) = 16.06, <em>p</em> &lt; .001,{" "}
            &eta;&sup2;<sub>H</sub> = .78. Bonferroni 보정을 적용한 Dunn 사후
            쌍별 비교에서 프로그램 B(Mdn = 24.0)가 프로그램 A(Mdn = 15.0)와
            프로그램 C(Mdn = 10.0) 모두보다 유의하게 높은 점수를 보였다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>H</em>는 소수점 둘째 자리까지, 자유도는 정수로,{" "}
        <em>p</em>는 소수점 셋째 자리까지 보고합니다. p 값이 .001 미만일
        경우 <em>p</em> &lt; .001로 표기합니다. 항상 효과크기 지표로{" "}
        &eta;&sup2;<sub>H</sub>를 함께 보고하고, 전체 검정이 유의한 경우
        사후 검정 결과도 보고하십시오.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>비정규 데이터에 ANOVA 사용:</strong> 데이터가 서열
          척도이거나 소표본에서 명확히 비정규인 경우, ANOVA는 오해의 소지가
          있는 결과를 줄 수 있습니다. 대신 Kruskal-Wallis H 검정을
          사용하십시오.
        </li>
        <li>
          <strong>사후 검정 누락:</strong> 유의한 Kruskal-Wallis 결과는
          최소한 하나의 집단이 다르다는 것만 알려줍니다. 항상 Dunn 사후
          검정으로 구체적으로 어떤 집단 쌍이 다른지 확인하십시오.
        </li>
        <li>
          <strong>관련 집단에 Kruskal-Wallis 사용:</strong> 데이터가 대응,
          매칭 또는 반복 측정인 경우, Friedman 검정을 대신 사용하십시오.
          Kruskal-Wallis 검정은 엄밀히 독립 집단을 위한 것입니다.
        </li>
        <li>
          <strong>효과크기 누락:</strong> 유의한 p-값만으로는 차이의 크기를
          알 수 없습니다. 검정 결과와 함께 항상 &eta;&sup2;<sub>H</sub>를
          보고하십시오.
        </li>
        <li>
          <strong>Bonferroni 보정 누락:</strong> 다중 쌍별 비교를 수행할 때
          다중 검정 보정을 적용하지 않으면 제1종 오류율이 증가합니다.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 Kruskal-Wallis H 검정 계산은 R(kruskal.test 함수) 및
          SPSS 출력과 비교 검증되었습니다. 구현은 p-값에 대한 카이제곱
          근사와 확률 분포를 위한 jstat 라이브러리를 사용합니다. 동점
          순위는 평균 순위 방법으로 처리됩니다. 모든 결과는 R 출력과 최소
          소수점 4자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

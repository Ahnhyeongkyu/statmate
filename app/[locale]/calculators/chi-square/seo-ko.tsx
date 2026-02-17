export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        카이제곱 검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        카이제곱(&chi;&sup2;) 검정은 범주형 변수 간의 관계를 검정하는 데 사용되는
        비모수 통계 검정입니다. 평균을 비교하는 t-검정이나 분산분석(ANOVA)과
        달리, 카이제곱 검정은 빈도 데이터&mdash;각 범주에 해당하는 관측치의
        수&mdash;를 사용합니다. Karl Pearson이 1900년에 개발한 이 검정은 실제
        관측된 빈도와 변수 간에 관계가 없을 때 기대되는 빈도를 비교합니다.
        관측 빈도와 기대 빈도의 차이가 충분히 크면, 변수들이 통계적으로
        유의하게 연관되어 있다고 결론 내릴 수 있습니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        독립성 검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        독립성 검정은 두 범주형 변수가 서로 관련이 있는지를 판단하는 데
        사용됩니다. 데이터는 행이 하나의 변수를, 열이 다른 변수를 나타내는
        분할표(교차표)로 정리됩니다. 예를 들어, 성별과 제품 선호도 간의 관계가
        있는지, 또는 치료 조건과 회복 결과 간의 관계가 있는지를 검정할 수
        있습니다. 귀무가설은 두 변수가 독립적이라고&mdash;즉, 한 변수의 값을
        아는 것이 다른 변수에 대해 아무런 정보도 제공하지 않는다고
        주장합니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        적합도 검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        적합도 검정은 단일 범주형 변수의 관측 빈도가 기대 빈도와 다른지를
        판단하는 데 사용됩니다. 예를 들어, 주사위가 공정한지 확인하기 위해 관측된
        주사위 결과를 기대되는 균등 분포(각 면 1/6)와 비교하거나, 고객 방문이
        요일별로 균등하게 분포되어 있는지를 검정할 수 있습니다. 귀무가설은
        관측 분포가 기대 분포와 일치한다고 주장합니다.
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예시: 독립성 검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 성별(남성 / 여성)과 제품 선호도(A / B / C) 간의 연관성을
          검정하기 위해 100명을 대상으로 설문조사를 실시했습니다. 관측 빈도는
          다음과 같습니다:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">관측값</th>
                <th className="py-2 text-center font-semibold">제품 A</th>
                <th className="py-2 text-center font-semibold">제품 B</th>
                <th className="py-2 text-center font-semibold">제품 C</th>
                <th className="py-2 text-center font-semibold">행 합계</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">남성</td>
                <td className="py-2 text-center">30</td>
                <td className="py-2 text-center">10</td>
                <td className="py-2 text-center">10</td>
                <td className="py-2 text-center font-medium">50</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">여성</td>
                <td className="py-2 text-center">15</td>
                <td className="py-2 text-center">20</td>
                <td className="py-2 text-center">15</td>
                <td className="py-2 text-center font-medium">50</td>
              </tr>
              <tr className="border-t-2 border-gray-900">
                <td className="py-2 font-semibold">열 합계</td>
                <td className="py-2 text-center font-medium">45</td>
                <td className="py-2 text-center font-medium">30</td>
                <td className="py-2 text-center font-medium">25</td>
                <td className="py-2 text-center font-semibold">100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          기대 빈도는 (행 합계 &times; 열 합계) / 총합계로 계산됩니다. 예를 들어,
          남성 &times; 제품 A의 기대 빈도 = (50 &times; 45) / 100 = 22.5입니다.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">기대값</th>
                <th className="py-2 text-center font-semibold">제품 A</th>
                <th className="py-2 text-center font-semibold">제품 B</th>
                <th className="py-2 text-center font-semibold">제품 C</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">남성</td>
                <td className="py-2 text-center">22.5</td>
                <td className="py-2 text-center">15.0</td>
                <td className="py-2 text-center">12.5</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">여성</td>
                <td className="py-2 text-center">22.5</td>
                <td className="py-2 text-center">15.0</td>
                <td className="py-2 text-center">12.5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            &chi;&sup2;(2, <em>N</em> = 100) = 8.41, <em>p</em> = .015,
            Cram&eacute;r&apos;s <em>V</em> = .29
          </p>
          <p className="mt-2 text-sm text-gray-600">
            성별과 제품 선호도 간에 통계적으로 유의한 연관성이 나타났습니다,
            &chi;&sup2;(2, <em>N</em> = 100) = 8.41, <em>p</em> = .015,
            중간 수준의 효과크기(Cram&eacute;r&apos;s <em>V</em> = .29)를
            보였습니다. 남성은 제품 A에 대한 선호가 더 강했고, 여성은 세 제품에
            걸쳐 더 고르게 분포되었습니다.
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        카이제곱 vs 다른 검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        올바른 검정을 선택하는 것은 데이터의 유형과 표본 크기에 따라
        달라집니다. 다음 안내를 참고하여 적절한 검정을 선택하세요:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">상황</th>
              <th className="py-2 text-left font-semibold">권장 검정</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">두 범주형 변수 (2&times;2 또는 더 큰 표)</td>
              <td className="py-2 font-medium">카이제곱 독립성 검정</td>
            </tr>
            <tr>
              <td className="py-2">하나의 범주형 변수 vs 기대 비율</td>
              <td className="py-2 font-medium">카이제곱 적합도 검정</td>
            </tr>
            <tr>
              <td className="py-2">2&times;2 표에서 기대 빈도 &lt; 5인 셀이 있는 경우</td>
              <td className="py-2">Fisher의 정확 검정</td>
            </tr>
            <tr>
              <td className="py-2">서열 데이터, 두 독립 집단</td>
              <td className="py-2">Mann-Whitney U 검정</td>
            </tr>
            <tr>
              <td className="py-2">대응 또는 짝지은 범주형 데이터</td>
              <td className="py-2">McNemar 검정</td>
            </tr>
            <tr>
              <td className="py-2">두 개 이상의 관련 범주형 표본</td>
              <td className="py-2">Cochran의 Q 검정</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        카이제곱 검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        카이제곱 검정 결과를 해석하기 전에 다음 가정들이 충족되었는지
        확인하세요:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 범주형 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            두 변수 모두 범주형(명목형 또는 서열형)이어야 합니다. 카이제곱
            검정은 연속형 데이터에는 적용할 수 없습니다. 연속형 측정값이 있는
            경우, 먼저 그룹으로 범주화해야 하지만(예: 나이 &rarr; 연령대),
            이는 정보의 손실을 초래합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 독립 관측</p>
          <p className="mt-1 text-sm text-gray-600">
            각 관측치는 다른 모든 관측치와 독립적이어야 합니다. 이는 각
            참가자나 사례가 분할표의 한 셀에만 기여해야 함을 의미합니다.
            반복 측정이나 대응 표본은 이 가정을 위반합니다&mdash;대신
            McNemar 검정을 사용하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 기대빈도 &ge; 5</p>
          <p className="mt-1 text-sm text-gray-600">
            모든 기대 셀 빈도가 5 이상이어야 합니다. 셀의 20% 이상에서 기대
            빈도가 5 미만인 경우, 카이제곱 근사가 신뢰할 수 없게 됩니다. 이런
            경우 범주를 통합하거나 Fisher의 정확 검정(2&times;2 표의 경우)을
            사용하는 것을 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 상호배타적 범주</p>
          <p className="mt-1 text-sm text-gray-600">
            각 관측치는 하나의 범주에만 속해야 합니다. 범주들은 상호배타적이고
            포괄적이어야 하며, 모든 관측치가 정확히 하나의 범주에 할당되어야
            합니다. 무작위 표집 또는 무작위 배정을 통해 데이터를 수집하여
            표본이 모집단을 대표하도록 해야 합니다.
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        Cram&eacute;r의 V 효과크기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>p</em>-값은 연관성이 통계적으로 유의한지를 알려주지만,
        Cram&eacute;r의 <em>V</em>는 그 연관성이 얼마나 강한지를 알려줍니다.
        이는 대규모 표본에서는 사소한 연관성도 통계적으로 유의할 수 있기
        때문에 매우 중요합니다. Cram&eacute;r의 <em>V</em>는 0(연관 없음)에서
        1(완벽한 연관)까지의 범위를 가지며, 해석은 자유도(행 &minus; 1 또는
        열 &minus; 1 중 작은 값)에 따라 달라집니다:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">효과크기</th>
              <th className="py-2 text-center font-semibold">df* = 1</th>
              <th className="py-2 text-center font-semibold">df* = 2</th>
              <th className="py-2 text-center font-semibold">df* = 3</th>
              <th className="py-2 text-center font-semibold">df* &ge; 4</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">작은 효과</td>
              <td className="py-2 text-center">.10</td>
              <td className="py-2 text-center">.07</td>
              <td className="py-2 text-center">.06</td>
              <td className="py-2 text-center">.05</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">중간 효과</td>
              <td className="py-2 text-center">.30</td>
              <td className="py-2 text-center">.21</td>
              <td className="py-2 text-center">.17</td>
              <td className="py-2 text-center">.15</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">큰 효과</td>
              <td className="py-2 text-center">.50</td>
              <td className="py-2 text-center">.35</td>
              <td className="py-2 text-center">.29</td>
              <td className="py-2 text-center">.25</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        *df* = min(행 &minus; 1, 열 &minus; 1). 위의 계산 예시(2&times;3 표)에서
        df* = 1이므로, <em>V</em> = .29는 중간 수준의 효과에 해당합니다.
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 7판 지침에 따르면, 카이제곱 결과 보고에는 카이제곱 통계량, 자유도,
        표본 크기, p-값, 그리고 효과크기 측정치가 포함되어야 합니다. 다음은
        템플릿과 실제 예시입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">템플릿</p>
          <p className="mt-1 text-sm italic text-gray-600">
            [변수 1]과 [변수 2] 간의 관계를 검정하기 위해 카이제곱 독립성
            검정을 실시하였다. 두 변수 간의 관계는 [유의하였다/유의하지
            않았다], &chi;&sup2;(df, <em>N</em> = XX) = X.XX, <em>p</em>{" "}
            = .XXX, Cram&eacute;r&apos;s <em>V</em> = .XX.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">실제 예시 (위 계산 예시 기반)</p>
          <p className="mt-1 text-sm italic text-gray-600">
            성별과 제품 선호도 간의 관계를 검정하기 위해 카이제곱 독립성 검정을
            실시하였다. 두 변수 간의 관계는 통계적으로 유의하였다,
            &chi;&sup2;(2, <em>N</em> = 100) = 8.41, <em>p</em> = .015,
            Cram&eacute;r&apos;s <em>V</em> = .29. 남성은 여성(30%)에 비해
            제품 A에 대한 선호도가 현저히 높았으며(60%), 여성은 세 가지 제품
            전체에 걸쳐 더 균등하게 분포하였다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: &chi;&sup2; 값은 소수점 둘째 자리까지 보고합니다. <em>p</em>-값은
        소수점 셋째 자리까지 보고하되, .001 미만인 경우 <em>p</em> &lt; .001로
        표기합니다. 독립성 검정에서는 항상 효과크기 측정치(Cram&eacute;r&apos;s{" "}
        <em>V</em>)를 포함해야 합니다.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>작은 기대 빈도에서 카이제곱 사용:</strong> 기대 셀 빈도가
          5 미만인 경우, 카이제곱 근사는 신뢰할 수 없습니다. 2&times;2 표에서는
          Fisher의 정확 검정을 사용하고, 더 큰 표에서는 범주를 통합하여 기대
          빈도를 높이세요.
        </li>
        <li>
          <strong>원시 빈도 대신 백분율 입력:</strong> 카이제곱 검정에는 실제
          빈도가 필요하며, 백분율이나 비율은 사용할 수 없습니다. 백분율을
          사용하면 검정이 실제 표본 크기를 알 수 없기 때문에 부정확한 결과가
          산출됩니다.
        </li>
        <li>
          <strong>효과크기 무시:</strong> 통계적으로 유의한 카이제곱 결과라도
          Cram&eacute;r의 <em>V</em>가 매우 작으면(예: .05) 실제적으로
          의미 있지 않을 수 있습니다. 대규모 표본에서는 사소한 연관성도
          &quot;유의&quot;하게 나타날 수 있으므로, 항상 Cram&eacute;r의{" "}
          <em>V</em>를 보고하고 해석하세요.
        </li>
        <li>
          <strong>관측의 독립성 위반:</strong> 각 참가자는 하나의 셀에만
          기여해야 합니다. 동일한 사람이 여러 셀에 나타나는 경우(예: 반복
          측정), 카이제곱 검정은 유효하지 않습니다. 대응 데이터에는 McNemar
          검정을 사용하세요.
        </li>
        <li>
          <strong>두 유형의 카이제곱 검정 혼동:</strong> 독립성 검정(분할표에서
          두 변수)과 적합도 검정(하나의 변수 vs 기대 비율)은 서로 다른 질문에
          답합니다. 연구 질문에 맞는 올바른 검정을 선택하세요.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 카이제곱 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">chisq.test()</code>{" "}
          함수와 SPSS 출력으로 검증되었습니다. jstat 라이브러리를 사용하여
          카이제곱 확률 분포를 계산하며, 기대 빈도, 자유도, Cram&eacute;r의 V를
          표준 통계 공식에 따라 산출합니다. 모든 결과는 R 출력과 소수점 넷째
          자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

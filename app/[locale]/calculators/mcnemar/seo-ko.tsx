export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        McNemar 검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        McNemar 검정은 대응 이진 데이터를 분석하는 비모수적 통계
        검정입니다&mdash;동일한 대상이 이분형 결과에 대해 두 번 측정되는
        상황에서 사용합니다. Quinn McNemar가 1947년에 개발한 이 검정은 한
        범주에서 다른 범주로 변화한 대상의 비율이 우연에 의해 기대되는
        것과 유의하게 다른지를 판단합니다. 본질적으로 대응 쌍의 2&times;2
        분할표에서 대칭성을 검정하는 것입니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        대응 또는 짝지은 이진 데이터가 있을 때 McNemar 검정을 사용합니다.
        흔한 시나리오로는: 치료 전후의 진단 검사 결과 비교, 교육 프로그램이
        합격/불합격률을 변화시키는지 평가, 중재가 행동(예/아니오)을
        변화시키는지 검정, 동일한 환자에게 적용된 두 진단 방법 비교 등이
        있습니다. 이 검정은 두 측정 간에 응답이 변화한 대상인 불일치
        쌍(discordant pairs)에만 초점을 맞춥니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        McNemar vs 카이제곱 vs Cochran&apos;s Q
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">McNemar</th>
              <th className="py-2 text-left font-semibold">카이제곱</th>
              <th className="py-2 text-left font-semibold">Cochran&apos;s Q</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">데이터 유형</td>
              <td className="py-2">대응 이진</td>
              <td className="py-2">독립 범주형</td>
              <td className="py-2">대응 이진 (&ge;3 시점)</td>
            </tr>
            <tr>
              <td className="py-2">표본</td>
              <td className="py-2 font-medium">대응 쌍</td>
              <td className="py-2">독립</td>
              <td className="py-2 font-medium">대응 (3회 이상)</td>
            </tr>
            <tr>
              <td className="py-2">비교 집단 수</td>
              <td className="py-2">2 (전/후)</td>
              <td className="py-2">2개 이상</td>
              <td className="py-2">3개 이상</td>
            </tr>
            <tr>
              <td className="py-2">분석 대상</td>
              <td className="py-2">불일치 쌍</td>
              <td className="py-2">전체 셀</td>
              <td className="py-2">조건 간 변화</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: McNemar 검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 교육 프로그램이 직원 자격증 합격률을 변화시키는지
          검정합니다. 100명의 직원이 교육 전후에 자격증 시험을 봅니다.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold"></th>
                <th className="py-2 text-center font-semibold">사후: 합격</th>
                <th className="py-2 text-center font-semibold">사후: 불합격</th>
                <th className="py-2 text-center font-semibold">합계</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">사전: 합격</td>
                <td className="py-2 text-center">40</td>
                <td className="py-2 text-center">12</td>
                <td className="py-2 text-center font-medium">52</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">사전: 불합격</td>
                <td className="py-2 text-center">5</td>
                <td className="py-2 text-center">43</td>
                <td className="py-2 text-center font-medium">48</td>
              </tr>
              <tr className="border-t-2 border-gray-900">
                <td className="py-2 font-semibold">합계</td>
                <td className="py-2 text-center font-medium">45</td>
                <td className="py-2 text-center font-medium">55</td>
                <td className="py-2 text-center font-semibold">100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          불일치 쌍은 b = 12(사전 합격, 사후 불합격)와 c = 5(사전 불합격,
          사후 합격)입니다. b + c = 17 &lt; 25이므로 정확 이항 검정을
          사용합니다.
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            McNemar 정확 검정, <em>p</em> = .143
          </p>
          <p className="mt-2 text-sm text-gray-600">
            교육 프로그램 후 합격률에 통계적으로 유의한 변화가 없었습니다.
            5명이 개선되고 12명이 악화되었지만, 이 차이는 .05 수준에서
            유의하지 않았습니다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        McNemar 검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        McNemar 검정은 다음 가정이 충족되어야 합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 대응 이진 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            각 대상은 두 번 측정되어야 하며(예: 전후), 결과는 이진형이어야
            합니다(예: 예/아니오, 합격/불합격, 양성/음성). 데이터는 대응 쌍의
            2&times;2 표를 구성합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 상호배타적 범주</p>
          <p className="mt-1 text-sm text-gray-600">
            각 대상은 2&times;2 표의 네 셀 중 정확히 하나에 해당해야 합니다.
            각 시점에서 범주는 포괄적이고 상호배타적이어야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 무작위 표집</p>
          <p className="mt-1 text-sm text-gray-600">
            대상은 관심 모집단에서 무작위로 선택되거나 조건에 무작위로
            배정되어야 합니다. 대응 쌍은 서로 독립적이어야 합니다(한 쌍의
            결과가 다른 쌍의 결과에 영향을 미치지 않아야 합니다).
          </p>
        </div>
      </div>

      {/* Continuity Correction */}
      <h3 className="text-xl font-semibold text-gray-900">
        연속성 보정 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        표준 McNemar 검정은 자유도 1의 카이제곱 통계량을 사용합니다. 검정의
        기초가 되는 이항분포가 이산형이므로, 연속성 보정이 적용됩니다:
        &chi;&sup2; = (|b &minus; c| &minus; 1)&sup2; / (b + c). 이 보정은
        중간 크기의 표본에서 카이제곱 근사를 더 정확하게 만듭니다. 소표본의
        경우(불일치 쌍 &lt; 25), StatMate는 근사가 필요 없는 정확 이항
        검정을 자동으로 사용합니다.
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        검정 통계량, 자유도, p-값을 보고합니다. 정확 검정을 사용한 경우 이를
        보고서에 명시합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">근사 검정 템플릿</p>
          <p className="mt-1 text-sm italic text-gray-600">
            McNemar 검정 결과, [시점 1]에서 [시점 2]까지 [결과]에 [유의한/
            유의하지 않은] 변화가 나타났다, &chi;&sup2;(1) = X.XX, <em>p</em>{" "}
            = .XXX.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">정확 검정 템플릿</p>
          <p className="mt-1 text-sm italic text-gray-600">
            McNemar 정확 검정 결과, [시점 1]에서 [시점 2]까지 [결과]에
            [유의한/유의하지 않은] 변화가 나타났다, <em>p</em> = .XXX.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 불일치 쌍의 총합(b + c)이 25 미만인 경우 정확 검정을
        사용합니다. <em>p</em>-값은 소수점 셋째 자리까지 보고하고,
        .001 미만인 경우 <em>p</em> &lt; .001로 표기합니다. 불일치 쌍에
        대한 기술 통계를 포함하세요.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>대응 데이터에 카이제곱 사용:</strong> 표준 카이제곱 검정은
          독립 관측을 가정합니다. 동일한 대상을 두 번 측정한 경우, 데이터가
          종속적이므로 McNemar 검정을 사용해야 합니다.
        </li>
        <li>
          <strong>소표본 요구사항 무시:</strong> 불일치 쌍의 총합이 25 미만일
          때 카이제곱 근사는 신뢰할 수 없을 수 있습니다. StatMate가 자동으로
          선택하는 정확 이항 검정을 대신 사용하세요.
        </li>
        <li>
          <strong>표 배치 오해:</strong> 행은 &quot;사전&quot; 조건을, 열은
          &quot;사후&quot; 조건을 나타냅니다. 불일치 셀(b와 c)이 검정이
          분석하는 대상입니다. 일치 셀(a와 d)은 검정 결과에 영향을 미치지
          않습니다.
        </li>
        <li>
          <strong>비이진 결과에 적용:</strong> McNemar 검정은 이진 결과
          전용입니다. 서열 대응 데이터에는 Wilcoxon 부호순위 검정을
          사용하세요. 세 번 이상의 관련 이진 측정에는 Cochran&apos;s Q
          검정을 사용하세요.
        </li>
        <li>
          <strong>연속성 보정 누락:</strong> 보정하지 않은 McNemar 통계량
          (b &minus; c)&sup2; / (b + c)는 유의성을 과대추정하는 경향이
          있습니다. 더 정확한 결과를 위해 항상 보정된 버전
          (|b &minus; c| &minus; 1)&sup2; / (b + c)를 사용하세요.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 McNemar 검정 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">mcnemar.test()</code>{" "}
          함수 및 SPSS 출력과 비교 검증되었습니다. 구현은 연속성 보정된
          카이제곱 통계량과 확률 분포를 위한 jstat 라이브러리를 사용합니다.
          소표본(불일치 쌍 &lt; 25)의 경우 정확한 양측 이항 검정을
          사용합니다. 모든 결과는 R 출력과 소수점 넷째 자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

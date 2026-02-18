export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      {/* 1. What is Cronbach's Alpha */}
      <h2 className="text-2xl font-bold text-gray-900">
        크론바흐 알파(Cronbach&apos;s Alpha)란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        크론바흐 알파(Cronbach&apos;s Alpha)는 설문지나 검사 도구의{" "}
        <strong>내적 일관성 신뢰도</strong>를 측정하는 가장 널리 사용되는 통계
        지표입니다. 하나의 구성개념(construct)을 측정하기 위해 설계된 여러
        문항들이 서로 얼마나 일관되게 같은 개념을 측정하고 있는지를 평가합니다.
        알파 값은 0에서 1 사이의 범위를 가지며, 값이 높을수록 문항 간 내적
        일관성이 높음을 나타냅니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        이 지표는 미국의 심리측정학자 <strong>Lee J. Cronbach</strong>가 1951년에
        발표한 논문 &quot;Coefficient Alpha and the Internal Structure of
        Tests&quot;에서 처음 제안하였습니다. Cronbach는 기존의{" "}
        <strong>Kuder-Richardson 공식 20(KR-20)</strong>을 일반화하여,
        이분형(맞다/틀리다) 문항뿐 아니라 리커트 척도와 같은 다분형 문항에도
        적용할 수 있는 계수를 개발했습니다. 이후 크론바흐 알파는 심리학, 교육학,
        간호학, 경영학, 사회과학 등 거의 모든 분야에서 척도의 신뢰도를 보고하는
        표준 지표로 자리 잡았습니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        크론바흐 알파의 공식은 다음과 같습니다:
      </p>
      <div className="rounded-md bg-gray-50 p-4">
        <p className="text-sm font-mono text-gray-700 text-center">
          <em>&alpha;</em> = (<em>k</em> / (<em>k</em> &minus; 1)) &times; (1
          &minus; &Sigma;<em>&sigma;</em><sup>2</sup><sub><em>i</em></sub> /{" "}
          <em>&sigma;</em><sup>2</sup><sub><em>t</em></sub>)
        </p>
        <p className="mt-3 text-sm text-gray-600">
          여기서 <em>k</em>는 문항 수, <em>&sigma;</em><sup>2</sup>
          <sub><em>i</em></sub>는 각 문항의 분산, <em>&sigma;</em><sup>2</sup>
          <sub><em>t</em></sub>는 총점의 분산입니다. 이 공식은 각 문항의 분산 합이
          총점의 분산에 비해 작을수록(즉, 문항들이 동일한 방향으로 함께 움직일수록)
          알파 값이 1에 가까워진다는 것을 보여줍니다.
        </p>
      </div>

      {/* 2. Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          풀이 예제: 고객 만족도 설문 (5문항, 20명)
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          한 연구자가 온라인 쇼핑몰의 고객 만족도를 측정하기 위해 5개 문항으로
          구성된 리커트 5점 척도(1 = 매우 불만족, 5 = 매우 만족) 설문지를
          개발하였습니다. 20명의 고객에게 설문을 실시한 후, 이 척도의 내적 일관성
          신뢰도를 크론바흐 알파로 검증하고자 합니다.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">문항</th>
                <th className="py-2 text-left font-semibold">내용</th>
                <th className="py-2 text-center font-semibold"><em>M</em></th>
                <th className="py-2 text-center font-semibold"><em>SD</em></th>
                <th className="py-2 text-center font-semibold">
                  <em>&sigma;</em><sup>2</sup>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium text-gray-700">Q1</td>
                <td className="py-2">상품 품질에 만족한다</td>
                <td className="py-2 text-center">3.85</td>
                <td className="py-2 text-center">0.93</td>
                <td className="py-2 text-center">0.87</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Q2</td>
                <td className="py-2">배송 속도에 만족한다</td>
                <td className="py-2 text-center">3.70</td>
                <td className="py-2 text-center">1.03</td>
                <td className="py-2 text-center">1.06</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Q3</td>
                <td className="py-2">고객 서비스에 만족한다</td>
                <td className="py-2 text-center">3.60</td>
                <td className="py-2 text-center">0.88</td>
                <td className="py-2 text-center">0.78</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Q4</td>
                <td className="py-2">가격 대비 가치가 있다</td>
                <td className="py-2 text-center">3.50</td>
                <td className="py-2 text-center">0.95</td>
                <td className="py-2 text-center">0.90</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-700">Q5</td>
                <td className="py-2">재구매 의향이 있다</td>
                <td className="py-2 text-center">3.75</td>
                <td className="py-2 text-center">1.07</td>
                <td className="py-2 text-center">1.14</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            1단계: 각 문항 분산의 합 계산
          </p>
          <p className="mt-1 text-sm text-gray-600">
            &Sigma;<em>&sigma;</em><sup>2</sup><sub><em>i</em></sub> = 0.87 +
            1.06 + 0.78 + 0.90 + 1.14 = <strong>4.75</strong>
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            2단계: 총점의 분산 계산
          </p>
          <p className="mt-1 text-sm text-gray-600">
            5개 문항의 총점(합산 점수)에 대한 분산: <em>&sigma;</em><sup>2</sup>
            <sub><em>t</em></sub> = <strong>14.82</strong>
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            3단계: 공식에 대입
          </p>
          <p className="mt-1 text-sm font-mono text-gray-600">
            <em>&alpha;</em> = (5 / (5 &minus; 1)) &times; (1 &minus; 4.75 /
            14.82)
          </p>
          <p className="mt-1 text-sm font-mono text-gray-600">
            <em>&alpha;</em> = 1.25 &times; (1 &minus; 0.3204)
          </p>
          <p className="mt-1 text-sm font-mono text-gray-600">
            <em>&alpha;</em> = 1.25 &times; 0.6796
          </p>
          <p className="mt-1 text-sm font-mono text-gray-600">
            <em>&alpha;</em> = <strong>0.849</strong>
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            4단계: 문항 제거 시 알파(Alpha-if-Deleted) 분석
          </p>
          <p className="mt-1 text-sm text-gray-600">
            각 문항을 제거했을 때의 알파 값을 확인하여, 척도의 신뢰도를 저해하는
            문항이 있는지 점검합니다.
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-1 text-left font-semibold">제거 문항</th>
                  <th className="py-1 text-center font-semibold">
                    <em>&alpha;</em> if deleted
                  </th>
                  <th className="py-1 text-left font-semibold">판단</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-1 text-gray-700">Q1 제거</td>
                  <td className="py-1 text-center">0.821</td>
                  <td className="py-1 text-gray-500">원래 알파보다 낮음 &rarr; 유지</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">Q2 제거</td>
                  <td className="py-1 text-center">0.838</td>
                  <td className="py-1 text-gray-500">원래 알파보다 낮음 &rarr; 유지</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">Q3 제거</td>
                  <td className="py-1 text-center">0.830</td>
                  <td className="py-1 text-gray-500">원래 알파보다 낮음 &rarr; 유지</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">Q4 제거</td>
                  <td className="py-1 text-center">0.825</td>
                  <td className="py-1 text-gray-500">원래 알파보다 낮음 &rarr; 유지</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">Q5 제거</td>
                  <td className="py-1 text-center">0.815</td>
                  <td className="py-1 text-gray-500">원래 알파보다 낮음 &rarr; 유지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과 해석</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>&alpha;</em> = .849로, George와 Mallery(2003)의 기준에 따르면{" "}
            <strong>&quot;좋음(Good)&quot;</strong> 수준의 내적 일관성 신뢰도를
            나타냅니다. 모든 문항의 Alpha-if-Deleted 값이 원래 알파(.849)보다
            낮으므로, 5개 문항 모두가 척도의 신뢰도에 긍정적으로 기여하고 있어
            제거할 필요가 없습니다.
          </p>
        </div>
      </div>

      {/* 3. Interpretation Criteria */}
      <h3 className="text-xl font-semibold text-gray-900">
        신뢰도 해석 기준
      </h3>
      <p className="text-gray-600 leading-relaxed">
        크론바흐 알파 값에 대한 해석 기준은 학자마다 다소 차이가 있으나,{" "}
        <strong>George와 Mallery(2003)</strong>의 분류가 가장 널리 인용됩니다.
        다만, 연구 목적과 분야에 따라 요구되는 기준이 달라질 수 있으므로 맥락을
        고려하여 해석해야 합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">알파 값</th>
              <th className="py-2 text-left font-semibold">수준</th>
              <th className="py-2 text-left font-semibold">해석</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&ge; .90</td>
              <td className="py-2 font-medium">우수 (Excellent)</td>
              <td className="py-2 text-gray-500">
                매우 높은 내적 일관성; 다만 &gt; .95일 경우 문항 중복 가능성 점검 필요
              </td>
            </tr>
            <tr>
              <td className="py-2">&ge; .80</td>
              <td className="py-2 font-medium">좋음 (Good)</td>
              <td className="py-2 text-gray-500">
                대부분의 연구 목적에 적합한 수준
              </td>
            </tr>
            <tr>
              <td className="py-2">&ge; .70</td>
              <td className="py-2 font-medium">수용 가능 (Acceptable)</td>
              <td className="py-2 text-gray-500">
                탐색적 연구에서 수용 가능한 최소 수준; 많은 분야의 기준선
              </td>
            </tr>
            <tr>
              <td className="py-2">&ge; .60</td>
              <td className="py-2 font-medium">의문 (Questionable)</td>
              <td className="py-2 text-gray-500">
                문항 재검토 필요; 일부 탐색적 연구에서만 용인
              </td>
            </tr>
            <tr>
              <td className="py-2">&ge; .50</td>
              <td className="py-2 font-medium">불량 (Poor)</td>
              <td className="py-2 text-gray-500">
                척도 수정이 강력히 권고됨
              </td>
            </tr>
            <tr>
              <td className="py-2">&lt; .50</td>
              <td className="py-2 font-medium">부적합 (Unacceptable)</td>
              <td className="py-2 text-gray-500">
                척도로 사용 불가; 문항 전면 재구성 필요
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: 임상 도구나 고부담 의사결정(high-stakes decisions)에 사용되는
        척도는 일반적으로 <em>&alpha;</em> &ge; .90 이상이 권장됩니다. 반면
        탐색적 연구에서는 <em>&alpha;</em> &ge; .70이 통상적인 기준선으로
        사용됩니다.
      </p>

      {/* 4. Related Reliability Indices */}
      <h3 className="text-xl font-semibold text-gray-900">
        관련 신뢰도 지표
      </h3>
      <p className="text-gray-600 leading-relaxed">
        크론바흐 알파는 내적 일관성 신뢰도의 한 유형입니다. 연구 설계와 목적에
        따라 다양한 신뢰도 지표를 선택할 수 있으며, 각각의 특성을 이해하는 것이
        중요합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">지표</th>
              <th className="py-2 text-left font-semibold">유형</th>
              <th className="py-2 text-left font-semibold">측정 대상</th>
              <th className="py-2 text-left font-semibold">적합한 경우</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium text-gray-700">
                Cronbach&apos;s <em>&alpha;</em>
              </td>
              <td className="py-2">내적 일관성</td>
              <td className="py-2">문항 간 일관성</td>
              <td className="py-2 text-gray-500">
                다분형 문항의 단일 척도 신뢰도 평가
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">
                반분 신뢰도 (Split-half)
              </td>
              <td className="py-2">내적 일관성</td>
              <td className="py-2">반분된 두 부분 간 일관성</td>
              <td className="py-2 text-gray-500">
                한 번의 검사로 신뢰도 추정; Spearman-Brown 교정 필요
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">
                검사-재검사 (Test-retest)
              </td>
              <td className="py-2">안정성</td>
              <td className="py-2">시간에 따른 점수 안정성</td>
              <td className="py-2 text-gray-500">
                일정 간격을 두고 동일 도구를 재실시; 시간적 안정성 평가
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">
                평가자 간 신뢰도 (Inter-rater)
              </td>
              <td className="py-2">동등성</td>
              <td className="py-2">평가자 간 일치도</td>
              <td className="py-2 text-gray-500">
                관찰 연구, 코딩, 채점 등 주관적 판단이 개입되는 경우
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: McDonald&apos;s omega(<em>&omega;</em>)는 크론바흐 알파의 대안으로
        주목받고 있으며, 타우-동치성 가정이 충족되지 않는 경우 더 정확한 추정치를
        제공합니다. 최근 학술지에서는 알파와 함께 오메가를 병행 보고할 것을
        권장하는 추세입니다.
      </p>

      {/* 5. Assumptions and Cautions */}
      <h3 className="text-xl font-semibold text-gray-900">
        가정 및 주의사항
      </h3>
      <p className="text-gray-600 leading-relaxed">
        크론바흐 알파를 올바르게 사용하고 해석하려면 다음 가정과 주의사항을
        반드시 확인해야 합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 단일차원성 (Unidimensionality)</p>
          <p className="mt-1 text-sm text-gray-600">
            크론바흐 알파는 모든 문항이 <strong>하나의 잠재 구성개념</strong>을
            측정한다고 가정합니다. 문항들이 여러 하위요인을 측정하는 다차원 척도에
            전체 알파를 적용하면 신뢰도가 과소추정되거나 왜곡될 수 있습니다. 먼저
            요인분석(EFA/CFA)을 실시하여 단일차원성을 확인하고, 다차원 척도인
            경우 각 하위척도별로 알파를 산출해야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 타우-동치성 (Tau-equivalence)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            크론바흐 알파는 모든 문항이 진점수에 대해 동일한 요인부하량을
            가진다고 가정합니다(본질적 타우-동치 모형). 이 가정이 위배되면 알파는
            신뢰도의 <strong>하한값(lower bound)</strong>이 되어 실제 신뢰도를
            과소추정합니다. 요인부하량이 크게 다를 경우 McDonald&apos;s{" "}
            <em>&omega;</em>를 대안으로 사용하는 것이 권장됩니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 문항 코딩 방향의 일관성
          </p>
          <p className="mt-1 text-sm text-gray-600">
            모든 문항은 <strong>동일한 방향</strong>으로 코딩되어야 합니다.
            역코딩(reverse-coded) 문항이 포함된 경우, 반드시 역변환을 수행한 후
            알파를 계산해야 합니다. 역코딩 문항을 그대로 사용하면 알파가
            인위적으로 낮아지거나 음수가 될 수 있습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 최소 문항 수
          </p>
          <p className="mt-1 text-sm text-gray-600">
            알파는 문항 수(<em>k</em>)에 민감합니다. 문항이 3개 미만이면 알파가
            불안정해지며, 일반적으로 <strong>최소 3개 이상</strong>의 문항이
            필요합니다. 반대로 문항 수가 매우 많으면 알파가 인위적으로 높아질 수
            있으므로, 문항 수만으로 높은 알파를 추구하는 것은 바람직하지 않습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">5. 표본 크기</p>
          <p className="mt-1 text-sm text-gray-600">
            안정적인 알파 추정을 위해서는 충분한 표본 크기가 필요합니다.
            일반적으로 문항 수의 5&ndash;10배 이상의 응답자가 권장되며, 최소한{" "}
            <strong>30명 이상</strong>의 표본을 확보하는 것이 바람직합니다.
            표본이 너무 작으면 알파의 신뢰구간이 넓어져 해석이 불안정해집니다.
          </p>
        </div>
      </div>

      {/* 6. APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 7판 지침에 따르면, 척도를 사용하는 연구에서는 반드시 내적 일관성
        신뢰도를 보고해야 합니다. 크론바흐 알파를 보고할 때는 알파 값, 문항 수,
        그리고 표본 특성을 명시하는 것이 좋습니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 템플릿</p>
          <p className="mt-1 text-sm italic text-gray-600">
            [척도명]의 내적 일관성 신뢰도를 크론바흐 알파로 평가하였다. [문항
            수]개 문항으로 구성된 본 척도의 신뢰도는 양호한 수준이었다,{" "}
            <em>&alpha;</em> = [값].
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            고객 만족도 척도의 내적 일관성 신뢰도를 크론바흐 알파로 평가하였다.
            5개 문항으로 구성된 본 척도의 신뢰도는 양호한 수준이었다,{" "}
            <em>&alpha;</em> = .85. 문항 제거 시 알파(alpha-if-item-deleted)
            분석 결과, 모든 문항이 척도의 신뢰도에 긍정적으로 기여하고
            있었다(범위: .82&ndash;.84).
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            다수 척도 보고 예시
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            본 연구에서 사용된 모든 척도는 수용 가능한 수준 이상의 내적 일관성
            신뢰도를 보였다: 직무 만족도(<em>&alpha;</em> = .89), 조직 몰입(
            <em>&alpha;</em> = .84), 이직 의도(<em>&alpha;</em> = .91).
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 그리스 문자 알파(<em>&alpha;</em>)는 이탤릭체로 표기합니다. 값은
        소수점 둘째 자리까지 보고하며, 0과 1 사이의 값이므로 선행 0을 생략하는
        것이 관례입니다(예: 0.85가 아닌 .85).
      </p>

      {/* 7. Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">흔한 실수</h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>알파가 너무 높은 경우를 간과:</strong> <em>&alpha;</em> &gt;
          .95는 반드시 좋은 것이 아닙니다. 이는 문항 간{" "}
          <strong>중복(redundancy)</strong>을 나타낼 수 있으며, 거의 동일한 내용의
          문항들이 반복되고 있을 가능성을 의미합니다. 문항 간 상관행렬을 점검하여
          지나치게 높은 상관(<em>r</em> &gt; .90)을 보이는 문항 쌍을 식별하고,
          중복 문항을 제거하는 것이 바람직합니다.
        </li>
        <li>
          <strong>역코딩 문항 미처리:</strong> 척도에 부정적으로 표현된
          문항(예: &quot;이 서비스에 불만족한다&quot;)이 포함된 경우, 분석 전에
          반드시 역코딩(reverse scoring)을 수행해야 합니다. 역코딩을 누락하면
          해당 문항이 다른 문항들과 반대 방향으로 작용하여 알파가 인위적으로
          급격히 낮아지거나 심지어 음수가 됩니다.
        </li>
        <li>
          <strong>다차원 척도에 전체 알파 적용:</strong> 여러 하위요인으로 구성된
          척도(예: 6개 하위척도로 구성된 성격검사)에 전체 문항으로 알파를
          계산하면, 실제 신뢰도를 왜곡합니다. 크론바흐 알파는 단일차원 척도를
          전제하므로, 다차원 척도에서는 <strong>각 하위척도별</strong>로 알파를
          산출해야 합니다.
        </li>
        <li>
          <strong>적은 문항 수의 영향 무시:</strong> 알파는 공식상 문항
          수(<em>k</em>)에 영향을 받습니다. 문항이 2&ndash;3개로 매우 적으면
          문항 간 상관이 높더라도 알파가 낮게 나타날 수 있습니다. 이 경우
          문항-총점 상관(item-total correlation)이나 평균 문항 간
          상관(mean inter-item correlation, 권장 범위: .15&ndash;.50)을 함께
          보고하는 것이 더 정보를 제공합니다.
        </li>
        <li>
          <strong>알파를 타당도의 증거로 오인:</strong> 크론바흐 알파는 오직{" "}
          <strong>신뢰도</strong>(문항 간 일관성)만을 측정하며, 척도가 의도한
          구성개념을 실제로 측정하고 있는지에 대한{" "}
          <strong>타당도(validity)</strong>와는 별개의 개념입니다. 높은 알파가
          높은 타당도를 보장하지 않습니다.
        </li>
      </ul>

      {/* 8. Calculation Accuracy */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">계산 정확도</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 크론바흐 알파 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            psych::alpha()
          </code>{" "}
          함수 및 SPSS의 신뢰도 분석(Reliability Analysis) 결과와 교차 검증되었습니다.
          문항 분산은 <em>N</em> &minus; 1 분모(표본 분산)를 사용하며, 문항-총점
          상관은 해당 문항을 제외한 수정된 문항-총점 상관(corrected item-total
          correlation)으로 계산합니다. Alpha-if-deleted, 반분 신뢰도,
          Spearman-Brown 교정 계수 등 모든 부가 통계량이 R 및 SPSS 출력과 소수점
          넷째 자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

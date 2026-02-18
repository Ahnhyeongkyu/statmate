export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      {/* 1. What is Factor Analysis */}
      <h2 className="text-2xl font-bold text-gray-900">
        요인분석(Factor Analysis)이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        요인분석(Factor Analysis)은 다수의 관측 변수들 사이에 존재하는 상관관계
        패턴을 분석하여, 소수의 잠재 변수(latent variable)&mdash;즉{" "}
        <strong>요인(factor)</strong>&mdash;으로 데이터를 축소하고 설명하는 다변량
        통계 기법입니다. 설문지 개발, 심리 측정, 구성 타당도 검증, 데이터 차원
        축소 등 사회과학 및 행동과학 전반에서 핵심적으로 활용됩니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        요인분석의 기원은 1904년 영국의 심리학자{" "}
        <strong>Charles Spearman</strong>이 지능 검사 점수 간의 양의 상관을
        설명하기 위해 일반 지능 요인(<em>g</em>)을 제안한 것으로 거슬러
        올라갑니다. 이후 1930년대에 <strong>Louis L. Thurstone</strong>이 다중
        요인 분석법을 발전시켜 단순 구조(simple structure) 개념과 회전(rotation)
        기법을 도입함으로써, 현대 요인분석의 토대를 마련했습니다. 오늘날
        요인분석은 심리학, 교육학, 마케팅, 의학, 사회학 등 거의 모든 실증 연구
        분야에서 필수적인 분석 도구로 자리잡고 있습니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        요인분석은 크게 두 가지로 구분됩니다:{" "}
        <strong>탐색적 요인분석(EFA, Exploratory Factor Analysis)</strong>과{" "}
        <strong>확인적 요인분석(CFA, Confirmatory Factor Analysis)</strong>.
        EFA는 데이터의 잠재 구조를 사전 가설 없이 탐색적으로 파악할 때
        사용하며, 새로운 측정 도구를 개발하거나 예비 연구에서 변수의 군집
        패턴을 발견하는 데 적합합니다. 반면 CFA는 이론적으로 설정한 요인
        구조가 실제 데이터에 부합하는지를 검증하는 확인적 절차로, 구조방정식
        모형(SEM)의 측정 모형 단계에서 주로 사용됩니다. 이 계산기는{" "}
        <strong>탐색적 요인분석(EFA)</strong>을 수행합니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        요인분석을 사용하기 적합한 상황으로는 다음과 같은 경우가 있습니다: (1)
        설문지나 척도를 새로 개발할 때 문항들이 의도한 하위 구성개념에
        묶이는지 확인하는 경우, (2) 다수의 변수를 소수의 요인으로 축소하여
        후속 분석(회귀분석, 군집분석 등)에 투입하려는 경우, (3) 구성 타당도
        (construct validity)를 평가하여 측정 도구의 내적 구조를 검증하는 경우,
        (4) 변수 간 다중공선성을 해결하기 위해 차원을 축소하는 경우입니다.
      </p>

      {/* 2. Suitability Tests */}
      <h3 className="text-xl font-semibold text-gray-900">
        적합성 검정: KMO 검정과 Bartlett 검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        요인분석을 수행하기 전에, 수집된 데이터가 요인분석에 적합한지를 먼저
        확인해야 합니다. 이를 위해 두 가지 사전 검정을 사용합니다:{" "}
        <strong>Kaiser-Meyer-Olkin(KMO) 검정</strong>과{" "}
        <strong>Bartlett의 구형성 검정(Bartlett&apos;s test of sphericity)</strong>.
      </p>
      <p className="text-gray-600 leading-relaxed">
        <strong>KMO 검정</strong>은 변수 쌍 간의 상관이 다른 변수들에 의해
        설명될 수 있는 정도를 나타내는 표본 적합도 지수입니다. KMO 값은
        0에서 1 사이이며, 값이 높을수록 요인분석에 적합합니다. Kaiser(1974)가
        제시한 해석 기준은 다음과 같습니다:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">KMO 값</th>
              <th className="py-2 text-left font-semibold">평가</th>
              <th className="py-2 text-left font-semibold">해석</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&ge; .90</td>
              <td className="py-2 font-medium">Marvelous (훌륭)</td>
              <td className="py-2 text-gray-500">요인분석에 매우 적합</td>
            </tr>
            <tr>
              <td className="py-2">.80 &ndash; .89</td>
              <td className="py-2 font-medium">Meritorious (우수)</td>
              <td className="py-2 text-gray-500">요인분석에 적합</td>
            </tr>
            <tr>
              <td className="py-2">.70 &ndash; .79</td>
              <td className="py-2 font-medium">Middling (보통)</td>
              <td className="py-2 text-gray-500">요인분석 수행 가능</td>
            </tr>
            <tr>
              <td className="py-2">.60 &ndash; .69</td>
              <td className="py-2 font-medium">Mediocre (미흡)</td>
              <td className="py-2 text-gray-500">주의하여 진행, 변수 재검토 권장</td>
            </tr>
            <tr>
              <td className="py-2">.50 &ndash; .59</td>
              <td className="py-2 font-medium">Miserable (나쁨)</td>
              <td className="py-2 text-gray-500">요인분석이 거의 부적합</td>
            </tr>
            <tr>
              <td className="py-2">&lt; .50</td>
              <td className="py-2 font-medium">Unacceptable (불가)</td>
              <td className="py-2 text-gray-500">요인분석 수행 불가, 변수 재구성 필요</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 leading-relaxed">
        <strong>Bartlett의 구형성 검정</strong>은 상관행렬이 단위행렬(identity
        matrix)과 같은지를 카이제곱(&chi;&sup2;) 검정으로 확인합니다. 귀무가설은
        &quot;모든 변수 간의 상관이 0이다&quot;(즉, 상관행렬 = 단위행렬)입니다.{" "}
        <em>p</em> &lt; .05로 귀무가설이 기각되면 변수들 사이에 유의한 상관이
        존재하며, 요인분석을 진행할 수 있습니다. Bartlett 검정이 유의하지
        않으면 변수들이 서로 독립적이므로 요인을 추출할 근거가 없습니다.
      </p>

      {/* 3. Extraction Methods */}
      <h3 className="text-xl font-semibold text-gray-900">
        요인 추출 방법: PCA vs PAF
      </h3>
      <p className="text-gray-600 leading-relaxed">
        요인분석에서 가장 많이 사용되는 두 가지 추출 방법은{" "}
        <strong>주성분분석(PCA, Principal Component Analysis)</strong>과{" "}
        <strong>주축요인법(PAF, Principal Axis Factoring)</strong>입니다. 두
        방법은 철학적 배경과 분석 목적이 다릅니다:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">PCA (주성분분석)</th>
              <th className="py-2 text-left font-semibold">PAF (주축요인법)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium text-gray-700">철학</td>
              <td className="py-2">
                관측 변수의 <strong>총 분산</strong>을 최대한 설명하는 성분 추출
              </td>
              <td className="py-2">
                변수 간 <strong>공통 분산</strong>만을 설명하는 잠재 요인 추출
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">대각 원소</td>
              <td className="py-2">
                상관행렬 대각에 1.0 (총 분산 사용)
              </td>
              <td className="py-2">
                상관행렬 대각에 공통성 추정치 (고유 분산 제외)
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">분석 목적</td>
              <td className="py-2">데이터 축소, 차원 축소</td>
              <td className="py-2">잠재 구조 탐색, 구성개념 발견</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">사용 시기</td>
              <td className="py-2">
                변수의 총 분산을 요약하고 싶을 때; 후속 분석을 위한 합성 점수가
                필요할 때
              </td>
              <td className="py-2">
                관측 변수 뒤에 있는 잠재 요인의 구조를 밝히고 싶을 때; 측정
                오차를 분리하고 싶을 때
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">분산 설명</td>
              <td className="py-2">
                총 분산의 100%를 설명 가능 (성분 수 = 변수 수일 때)
              </td>
              <td className="py-2">
                공통 분산만 설명; 고유 분산(unique variance)은 제외
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: 엄밀히 말하면 PCA는 &quot;요인분석&quot;이 아닌 별도의 차원 축소
        기법이지만, 실무에서는 요인분석의 추출 방법으로 가장 널리 사용됩니다.
        변수 수가 많고 공통성이 높을 때 PCA와 PAF 결과는 매우 유사해집니다.
      </p>

      {/* 4. Number of Factors */}
      <h3 className="text-xl font-semibold text-gray-900">
        요인 수 결정 방법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        요인분석에서 가장 중요한 결정 중 하나는 &quot;몇 개의 요인을
        추출할 것인가?&quot;입니다. 요인 수를 과다 추출하면 해석이 어려운
        사소한 요인이 포함되고, 과소 추출하면 중요한 잠재 구조를 놓칠 수
        있습니다. 주로 사용되는 세 가지 기준은 다음과 같습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. Kaiser 기준 (고유값 &gt; 1 규칙)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Kaiser(1960)가 제안한 이 기준은 고유값(eigenvalue)이 1보다 큰
            요인만 추출합니다. 고유값이 1이라는 것은 해당 요인이 적어도 변수
            하나만큼의 분산을 설명한다는 의미입니다. 가장 널리 사용되지만,
            변수 수가 많을 때 요인을 과다 추출하는 경향이 있어 다른 기준과
            함께 사용하는 것이 권장됩니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 스크리 도표(Scree Plot)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Cattell(1966)이 제안한 스크리 도표는 고유값을 요인 번호 순서대로
            그래프에 그려, 고유값이 급격히 감소하다가 완만해지는
            &quot;팔꿈치(elbow)&quot; 지점을 찾는 방법입니다. 팔꿈치 지점
            왼쪽의 요인 수를 추출합니다. 시각적 판단이 필요하므로 주관적일
            수 있으나, 실무에서 Kaiser 기준의 보완으로 매우 유용합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 평행 분석(Parallel Analysis)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Horn(1965)이 제안한 평행 분석은 동일한 크기의 무작위 데이터에서
            산출된 고유값과 실제 데이터의 고유값을 비교합니다. 실제 고유값이
            무작위 기대값보다 큰 요인만 추출합니다. 시뮬레이션 기반으로 가장
            정확한 방법으로 평가되며, 최근에는 Kaiser 기준보다 평행 분석이
            더 권장되는 추세입니다.
          </p>
        </div>
      </div>

      {/* 5. Rotation Methods */}
      <h3 className="text-xl font-semibold text-gray-900">
        회전 방법: Varimax vs Promax
      </h3>
      <p className="text-gray-600 leading-relaxed">
        초기 요인 추출 결과는 해석이 어려운 경우가 많습니다. 요인 회전은 요인
        적재량의 패턴을 단순화하여 각 변수가 가능한 한 하나의 요인에만 높게
        적재되도록 조정하는 과정입니다. 크게{" "}
        <strong>직교 회전(orthogonal rotation)</strong>과{" "}
        <strong>사교 회전(oblique rotation)</strong>으로 나뉩니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">Varimax (직교)</th>
              <th className="py-2 text-left font-semibold">Promax (사교)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium text-gray-700">요인 간 상관</td>
              <td className="py-2">요인 간 상관을 0으로 가정 (비상관)</td>
              <td className="py-2">요인 간 상관을 허용 (상관 가능)</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">행렬</td>
              <td className="py-2">요인 적재 행렬 하나만 산출</td>
              <td className="py-2">
                패턴 행렬(pattern matrix)과 구조 행렬(structure matrix) 산출
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">해석</td>
              <td className="py-2">단순하고 직관적</td>
              <td className="py-2">더 복잡하지만 현실적</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">사용 시기</td>
              <td className="py-2">
                요인 간 독립성이 이론적으로 지지될 때; 단순한 구조가 필요할 때
              </td>
              <td className="py-2">
                요인 간 상관이 예상될 때(대부분의 사회과학 변수); 더 현실적인
                모형이 필요할 때
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">장점</td>
              <td className="py-2">해석 용이, 분산 설명 비율 합산 가능</td>
              <td className="py-2">
                요인 간 상관을 반영하여 더 정확한 구조 파악
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: 사교 회전에서 <strong>패턴 행렬(pattern matrix)</strong>은 다른
        요인의 영향을 통제한 후의 고유한 기여를 나타내고,{" "}
        <strong>구조 행렬(structure matrix)</strong>은 요인 간 상관을 포함한
        전체 상관을 나타냅니다. 요인 해석 시에는 일반적으로 패턴 행렬을
        기준으로 합니다. 요인 간 상관이 .32 미만이면 직교 회전(Varimax)을,
        .32 이상이면 사교 회전(Promax)을 사용하는 것이 일반적인 지침입니다
        (Tabachnick &amp; Fidell, 2013).
      </p>

      {/* 6. Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          풀이 예제: 성격 설문 8문항의 요인분석
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 성격 특성을 측정하는 8개 문항(5점 리커트 척도)을 30명의
          대학생에게 실시했습니다. 문항은 세 가지 성격 차원&mdash;외향성
          (Extraversion), 성실성(Conscientiousness), 개방성(Openness)&mdash;을
          측정하도록 설계되었습니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              외향성 문항
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Q1: 사람들과 어울리는 것을 좋아한다
            </p>
            <p className="text-sm text-gray-500">
              Q2: 파티에서 활발하게 활동한다
            </p>
            <p className="text-sm text-gray-500">
              Q3: 새로운 사람을 만나는 것이 즐겁다
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              성실성 문항
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Q4: 일을 체계적으로 계획한다
            </p>
            <p className="text-sm text-gray-500">
              Q5: 마감일을 잘 지킨다
            </p>
            <p className="text-sm text-gray-500">
              Q6: 세부사항에 주의를 기울인다
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              개방성 문항
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Q7: 새로운 아이디어에 관심이 많다
            </p>
            <p className="text-sm text-gray-500">
              Q8: 예술과 창의적 활동을 즐긴다
            </p>
          </div>
        </div>

        {/* Suitability Tests */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            적합성 검정 결과
          </p>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>
              <strong>KMO</strong> = 0.69 (Mediocre&mdash;미흡하지만 수행 가능)
            </p>
            <p>
              <strong>Bartlett의 구형성 검정:</strong>{" "}
              <em>&chi;&sup2;</em>(28) = 112.45, <em>p</em> &lt; .001
            </p>
            <p className="text-gray-500">
              KMO가 .60 이상이고 Bartlett 검정이 유의하므로 요인분석을 진행할
              수 있습니다.
            </p>
          </div>
        </div>

        {/* Eigenvalues */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            고유값(Eigenvalues)과 분산 설명
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">요인</th>
                  <th className="py-1 text-left font-medium text-gray-600">고유값</th>
                  <th className="py-1 text-left font-medium text-gray-600">분산 비율 (%)</th>
                  <th className="py-1 text-left font-medium text-gray-600">누적 비율 (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">2.85</td>
                  <td className="py-1 text-gray-700">35.63</td>
                  <td className="py-1 text-gray-700">35.63</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">2</td>
                  <td className="py-1 text-gray-700">2.12</td>
                  <td className="py-1 text-gray-700">26.50</td>
                  <td className="py-1 text-gray-700">62.13</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">3</td>
                  <td className="py-1 text-gray-700">1.38</td>
                  <td className="py-1 text-gray-700">17.25</td>
                  <td className="py-1 text-gray-700">79.38</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-500">4</td>
                  <td className="py-1 text-gray-500">0.62</td>
                  <td className="py-1 text-gray-500">7.75</td>
                  <td className="py-1 text-gray-500">87.13</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-500">5&ndash;8</td>
                  <td className="py-1 text-gray-500">&lt; 0.50</td>
                  <td className="py-1 text-gray-500">&hellip;</td>
                  <td className="py-1 text-gray-500">100.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Kaiser 기준(고유값 &gt; 1)에 따라 3개 요인이 추출되며, 전체 분산의
            79.38%를 설명합니다.
          </p>
        </div>

        {/* Factor Loadings */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            회전 후 요인 적재량 (Varimax 회전)
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">문항</th>
                  <th className="py-1 text-left font-medium text-gray-600">요인 1 (외향성)</th>
                  <th className="py-1 text-left font-medium text-gray-600">요인 2 (성실성)</th>
                  <th className="py-1 text-left font-medium text-gray-600">요인 3 (개방성)</th>
                  <th className="py-1 text-left font-medium text-gray-600">공통성</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q1</td>
                  <td className="py-1 font-semibold text-blue-700">.82</td>
                  <td className="py-1 text-gray-400">.11</td>
                  <td className="py-1 text-gray-400">.09</td>
                  <td className="py-1 text-gray-700">.70</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q2</td>
                  <td className="py-1 font-semibold text-blue-700">.78</td>
                  <td className="py-1 text-gray-400">.15</td>
                  <td className="py-1 text-gray-400">.13</td>
                  <td className="py-1 text-gray-700">.65</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q3</td>
                  <td className="py-1 font-semibold text-blue-700">.75</td>
                  <td className="py-1 text-gray-400">.08</td>
                  <td className="py-1 text-gray-400">.22</td>
                  <td className="py-1 text-gray-700">.62</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q4</td>
                  <td className="py-1 text-gray-400">.10</td>
                  <td className="py-1 font-semibold text-blue-700">.85</td>
                  <td className="py-1 text-gray-400">.07</td>
                  <td className="py-1 text-gray-700">.74</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q5</td>
                  <td className="py-1 text-gray-400">.14</td>
                  <td className="py-1 font-semibold text-blue-700">.81</td>
                  <td className="py-1 text-gray-400">.12</td>
                  <td className="py-1 text-gray-700">.70</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q6</td>
                  <td className="py-1 text-gray-400">.09</td>
                  <td className="py-1 font-semibold text-blue-700">.76</td>
                  <td className="py-1 text-gray-400">.18</td>
                  <td className="py-1 text-gray-700">.62</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q7</td>
                  <td className="py-1 text-gray-400">.18</td>
                  <td className="py-1 text-gray-400">.12</td>
                  <td className="py-1 font-semibold text-blue-700">.83</td>
                  <td className="py-1 text-gray-700">.74</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">Q8</td>
                  <td className="py-1 text-gray-400">.15</td>
                  <td className="py-1 text-gray-400">.10</td>
                  <td className="py-1 font-semibold text-blue-700">.79</td>
                  <td className="py-1 text-gray-700">.66</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            굵은 파란색 값은 해당 요인에 대한 적재량이 .40 이상인 경우를
            나타냅니다. 모든 문항이 의도한 요인에 명확하게 적재되었으며,
            교차 적재(cross-loading)가 없는 깨끗한 단순 구조를 보여줍니다.
          </p>
        </div>

        {/* Results Summary */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과 요약</p>
          <p className="mt-1 text-sm text-gray-600">
            3개 요인이 추출되었으며 전체 분산의 79.38%를 설명합니다.
            요인 1(외향성)은 35.63%, 요인 2(성실성)은 26.50%, 요인
            3(개방성)은 17.25%의 분산을 각각 설명합니다. 공통성
            (communality) 범위는 .62&ndash;.74로, 모든 문항이 추출된 요인에
            의해 적절하게 설명되고 있음을 나타냅니다.
          </p>
        </div>
      </div>

      {/* 7. Interpreting Results */}
      <h3 className="text-xl font-semibold text-gray-900">
        결과 해석 방법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        요인분석 결과를 해석할 때 주의해야 할 세 가지 핵심 지표가 있습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. 요인 적재량(Factor Loadings)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            요인 적재량은 각 관측 변수와 잠재 요인 사이의 상관계수입니다.
            절대값이 클수록 해당 변수가 해당 요인에 강하게 기여합니다.
            일반적으로 <strong>.40 이상</strong>이면 의미 있는 적재로 간주하며,
            .70 이상이면 강한 적재로 해석합니다. .30 미만의 적재량은 보통
            무시합니다. 각 변수가 하나의 요인에만 높게 적재되는 패턴이
            이상적입니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 교차 적재(Cross-Loadings)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            교차 적재란 하나의 변수가 두 개 이상의 요인에 .32 이상의 적재량을
            보이는 경우를 말합니다. 교차 적재가 있는 문항은 어떤 요인에
            귀속시킬지 모호해지므로 해석이 어렵습니다. 이런 문항은 제거하거나
            문항 내용을 수정하는 것을 고려해야 합니다. 교차 적재가 많으면
            요인 수를 다시 검토하거나 회전 방법을 변경해 볼 필요가 있습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 공통성(Communalities)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            공통성은 각 변수의 분산 중 추출된 요인들에 의해 설명되는 비율입니다.
            값은 0에서 1 사이이며, .40 이상이면 해당 변수가 요인 구조에 잘
            포함되어 있음을 의미합니다. 공통성이 매우 낮은 변수(.20 미만)는
            어떤 요인과도 관련이 약하므로 분석에서 제외를 고려해야 합니다.
            PCA에서의 초기 공통성은 항상 1.0이며, PAF에서는 SMC(Squared
            Multiple Correlation)를 초기 추정치로 사용합니다.
          </p>
        </div>
      </div>

      {/* 8. APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판 지침에 따라 요인분석 결과를 보고할 때는 사용한 추출 방법,
        회전 방법, 요인 수 결정 기준, KMO 및 Bartlett 검정 결과, 요인 적재량,
        분산 설명 비율을 포함해야 합니다. 다음은 풀이 예제를 기반으로 한
        보고 템플릿입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            보고 예시
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            8개 성격 문항에 대해 주성분분석(PCA)과 Varimax 직교 회전을
            사용한 탐색적 요인분석을 실시하였다. 표본 적합성을 확인하기 위해
            Kaiser-Meyer-Olkin 검정을 실시한 결과 KMO = .69로 요인분석에
            수용 가능한 수준이었으며, Bartlett의 구형성 검정은 통계적으로
            유의하였다, <em>&chi;&sup2;</em>(28) = 112.45, <em>p</em> &lt;
            .001. Kaiser 기준(고유값 &gt; 1)에 따라 3개 요인이 추출되었으며,
            전체 분산의 79.38%를 설명하였다. 요인 1(외향성)은 35.63%, 요인
            2(성실성)은 26.50%, 요인 3(개방성)은 17.25%의 분산을 설명하였다.
            모든 문항은 의도한 요인에 .75 이상의 적재량으로 명확하게
            적재되었으며, 교차 적재는 관찰되지 않았다.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            보고 템플릿 (일반형)
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            [변수 수]개 문항에 대해 [추출 방법]과 [회전 방법] 회전을 사용한
            탐색적 요인분석을 실시하였다. KMO = [값], Bartlett의 구형성 검정,{" "}
            <em>&chi;&sup2;</em>([<em>df</em>]) = [값], <em>p</em> [&lt;
            .001 또는 = 값]. [기준]에 따라 [요인 수]개 요인이 추출되었으며,
            전체 분산의 [비율]%를 설명하였다. 요인 적재량은 [범위]이었으며,
            [교차 적재 유무]였다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 요인 적재량 표는 본문이 아닌 별도의 표(Table)로 제시하며,
        .40 미만의 적재량은 표에서 생략하거나 빈칸으로 처리하여 가독성을
        높입니다. 통계 기호(<em>&chi;&sup2;</em>, <em>p</em>, <em>df</em>)는
        이탤릭체로 표기하고, <em>p</em>값은 .001 미만일 때{" "}
        <em>p</em> &lt; .001로 보고합니다.
      </p>

      {/* 9. Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>표본 크기 부족:</strong> 요인분석에는 충분한 표본 크기가
          필요합니다. 일반적으로 변수당 최소 5&ndash;10개의 관찰치(<em>N</em>/<em>p</em>{" "}
          &ge; 5) 또는 전체 표본 크기 100명 이상이 권장됩니다. 표본이 너무
          작으면 요인 적재량이 불안정하고 재현성이 낮아집니다. Comrey와
          Lee(1992)는 100 = 나쁨, 200 = 보통, 300 = 좋음, 500 = 매우 좋음,
          1000 = 훌륭함으로 제시했습니다.
        </li>
        <li>
          <strong>CFA가 적절한 상황에서 EFA 사용:</strong> 이미 이론적으로
          확립된 요인 구조가 있고 이를 검증하려는 경우에는 EFA가 아닌 CFA를
          사용해야 합니다. EFA는 탐색적 목적에 적합하며, 기존 이론을
          확인하려면 CFA(구조방정식 모형)가 더 적절합니다. 동일 데이터에서
          EFA로 구조를 발견한 뒤 같은 데이터로 CFA를 하는 것도 부적절합니다.
        </li>
        <li>
          <strong>요인 과다 추출:</strong> Kaiser 기준(고유값 &gt; 1)만
          사용하면 변수 수가 많을 때 요인을 과다 추출할 수 있습니다.
          스크리 도표나 평행 분석 등 여러 기준을 함께 고려하여 요인 수를
          결정해야 합니다.
        </li>
        <li>
          <strong>교차 적재 무시:</strong> 두 개 이상의 요인에 .32 이상으로
          적재되는 문항은 해석을 복잡하게 만듭니다. 이러한 문항을 무시하고
          강제로 하나의 요인에 배정하면 요인 구조의 명확성이 저하됩니다.
          문항 제거 또는 수정을 고려해야 합니다.
        </li>
        <li>
          <strong>KMO 확인 없이 분석 진행:</strong> KMO 값이 .50 미만이면
          변수 간 상관 패턴이 요인 추출에 부적합합니다. 반드시 KMO와
          Bartlett 검정을 먼저 확인하고, 기준에 미달할 경우 변수를
          재구성하거나 문항을 제거한 후 다시 시도해야 합니다.
        </li>
        <li>
          <strong>요인 회전 없이 해석:</strong> 회전하지 않은 초기 요인
          적재량은 해석이 어렵고 단순 구조를 보이지 않는 경우가 많습니다.
          반드시 적절한 회전 방법을 적용한 후 요인을 해석해야 합니다.
        </li>
      </ul>

      {/* 10. Calculation Accuracy */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 요인분석 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1">psych::fa()</code>{" "}
          함수와{" "}
          <code className="rounded bg-green-100 px-1">psych::principal()</code>{" "}
          함수 및 SPSS Factor Analysis 출력에 대해 교차 검증되었습니다.
          KMO 검정은{" "}
          <code className="rounded bg-green-100 px-1">psych::KMO()</code>,
          Bartlett 검정은{" "}
          <code className="rounded bg-green-100 px-1">psych::cortest.bartlett()</code>와
          동일한 알고리즘을 사용합니다. 고유값, 요인 적재량, 공통성, 분산
          설명 비율, 회전 후 적재량 모두 R 및 SPSS 출력과 소수점 4자리
          이상 일치합니다. Varimax 회전은 Kaiser 정규화를 적용하며,
          Promax 회전은 kappa = 4를 기본값으로 사용합니다.
        </p>
      </div>
    </section>
  );
}

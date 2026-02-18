export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        다중회귀분석이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        다중회귀분석(Multiple Regression Analysis)은 두 개 이상의 독립변수
        (예측변수)가 하나의 연속형 종속변수(결과변수)에 미치는 영향을
        동시에 분석하는 통계 기법입니다. 단순회귀분석이 하나의 예측변수만을
        다루는 반면, 다중회귀분석은 여러 예측변수를 하나의 모형에 포함시켜
        각 변수의 독립적인 기여도를 평가할 수 있습니다&mdash;이는 현실 세계의
        복잡한 현상을 보다 정확하게 설명하는 데 필수적입니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        회귀분석의 역사는 19세기 후반 Francis Galton이 부모와 자녀의 키 관계를
        연구하면서 &quot;평균으로의 회귀(regression toward the mean)&quot;라는
        개념을 도입한 데서 시작됩니다. 이후 Karl Pearson과 그의 제자들이
        수학적 기초를 확립했으며, 20세기 초 R. A. Fisher가 최소제곱법(OLS,
        Ordinary Least Squares)의 통계적 속성을 체계화했습니다. OLS는 관측값과
        예측값 사이의 잔차 제곱합을 최소화하는 회귀계수를 추정하는
        방법으로&mdash;오늘날에도 다중회귀분석의 핵심 추정법으로 널리
        사용됩니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        다중회귀분석은 다음과 같은 상황에서 사용합니다: (1) 여러 예측변수가
        결과변수에 각각 얼마나 기여하는지 파악하고 싶을 때, (2) 다른 변수를
        통제한 상태에서 특정 변수의 순수한 효과를 추정하고 싶을 때, (3) 여러
        변수의 정보를 종합하여 결과를 예측하는 모형을 구축하고 싶을 때.
        회귀 모형의 일반 공식은 <em>Y</em> = <em>b</em><sub>0</sub> +{" "}
        <em>b</em><sub>1</sub><em>X</em><sub>1</sub> +{" "}
        <em>b</em><sub>2</sub><em>X</em><sub>2</sub> + &hellip; +{" "}
        <em>b</em><sub>k</sub><em>X</em><sub>k</sub> + <em>e</em>이며,
        여기서 <em>b</em><sub>0</sub>은 절편, <em>b</em><sub>1</sub>&hellip;
        <em>b</em><sub>k</sub>는 각 예측변수의 비표준화 회귀계수,{" "}
        <em>e</em>는 잔차(오차)입니다.
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          풀이 예제: 학점(GPA) 예측
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          교육 연구자가 대학생 30명의 데이터를 수집하여 <strong>공부
          시간</strong>(주당 시간), <strong>수면 시간</strong>(일평균 시간),{" "}
          <strong>출석률</strong>(%)이 학점(GPA, 4.5 만점)에 미치는 영향을
          분석하고자 합니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              기술통계 요약
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-1 text-left font-medium text-gray-600">변수</th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>M</em></th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>SD</em></th>
                    <th className="py-1 text-left font-medium text-gray-600">범위</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">GPA</td>
                    <td className="py-1 text-gray-700">3.25</td>
                    <td className="py-1 text-gray-700">0.58</td>
                    <td className="py-1 text-gray-700">1.80&ndash;4.30</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">공부 시간</td>
                    <td className="py-1 text-gray-700">14.50</td>
                    <td className="py-1 text-gray-700">5.20</td>
                    <td className="py-1 text-gray-700">3&ndash;28</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">수면 시간</td>
                    <td className="py-1 text-gray-700">6.80</td>
                    <td className="py-1 text-gray-700">1.10</td>
                    <td className="py-1 text-gray-700">4.5&ndash;9.0</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-700">출석률 (%)</td>
                    <td className="py-1 text-gray-700">82.00</td>
                    <td className="py-1 text-gray-700">12.50</td>
                    <td className="py-1 text-gray-700">45&ndash;100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              상관행렬
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-1 text-left font-medium text-gray-600"></th>
                    <th className="py-1 text-left font-medium text-gray-600">GPA</th>
                    <th className="py-1 text-left font-medium text-gray-600">공부</th>
                    <th className="py-1 text-left font-medium text-gray-600">수면</th>
                    <th className="py-1 text-left font-medium text-gray-600">출석</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 font-medium text-gray-700">GPA</td>
                    <td className="py-1 text-gray-700">1.00</td>
                    <td className="py-1 text-gray-700">.72</td>
                    <td className="py-1 text-gray-700">.38</td>
                    <td className="py-1 text-gray-700">.65</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 font-medium text-gray-700">공부</td>
                    <td className="py-1 text-gray-700">.72</td>
                    <td className="py-1 text-gray-700">1.00</td>
                    <td className="py-1 text-gray-700">.15</td>
                    <td className="py-1 text-gray-700">.45</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 font-medium text-gray-700">수면</td>
                    <td className="py-1 text-gray-700">.38</td>
                    <td className="py-1 text-gray-700">.15</td>
                    <td className="py-1 text-gray-700">1.00</td>
                    <td className="py-1 text-gray-700">.10</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-gray-700">출석</td>
                    <td className="py-1 text-gray-700">.65</td>
                    <td className="py-1 text-gray-700">.45</td>
                    <td className="py-1 text-gray-700">.10</td>
                    <td className="py-1 text-gray-700">1.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            회귀계수 표
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">예측변수</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>B</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>SE</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>&beta;</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>t</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">VIF</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">(절편)</td>
                  <td className="py-1 text-gray-700">-0.52</td>
                  <td className="py-1 text-gray-700">0.41</td>
                  <td className="py-1 text-gray-700">&mdash;</td>
                  <td className="py-1 text-gray-700">-1.27</td>
                  <td className="py-1 text-gray-700">.216</td>
                  <td className="py-1 text-gray-700">&mdash;</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">공부 시간</td>
                  <td className="py-1 text-gray-700">0.055</td>
                  <td className="py-1 text-gray-700">0.010</td>
                  <td className="py-1 text-gray-700">.49</td>
                  <td className="py-1 text-gray-700">5.50</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">1.26</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">수면 시간</td>
                  <td className="py-1 text-gray-700">0.112</td>
                  <td className="py-1 text-gray-700">0.038</td>
                  <td className="py-1 text-gray-700">.21</td>
                  <td className="py-1 text-gray-700">2.95</td>
                  <td className="py-1 text-gray-700">.007</td>
                  <td className="py-1 text-gray-700">1.03</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">출석률</td>
                  <td className="py-1 text-gray-700">0.018</td>
                  <td className="py-1 text-gray-700">0.004</td>
                  <td className="py-1 text-gray-700">.33</td>
                  <td className="py-1 text-gray-700">4.50</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">1.25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">모형 적합도</p>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>
              <em>R</em>&sup2; = .72, 수정된 <em>R</em>&sup2; = .69
            </p>
            <p>
              <em>F</em>(3, 26) = 22.29, <em>p</em> &lt; .001
            </p>
            <p>Durbin-Watson = 1.95</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과 해석</p>
          <p className="mt-1 text-sm text-gray-600">
            회귀 모형은 전체적으로 유의했으며(<em>F</em>(3, 26) = 22.29,{" "}
            <em>p</em> &lt; .001), GPA 분산의 약 72%를 설명합니다. 세 예측변수
            모두 통계적으로 유의한 기여를 보였습니다. 표준화 계수(<em>&beta;</em>)를
            비교하면, 공부 시간(<em>&beta;</em> = .49)이 GPA에 가장 큰 상대적
            영향력을 가지며, 출석률(<em>&beta;</em> = .33), 수면
            시간(<em>&beta;</em> = .21) 순입니다. 모든 VIF 값이 1.3 미만으로
            다중공선성 문제는 없었으며, Durbin-Watson 통계량(1.95)은 잔차의
            독립성 가정이 충족됨을 나타냅니다.
          </p>
        </div>
      </div>

      {/* Key Statistics */}
      <h3 className="text-xl font-semibold text-gray-900">
        주요 통계량 이해
      </h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            R&sup2; vs 수정된 R&sup2; (Adjusted R&sup2;)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <em>R</em>&sup2;(결정계수)는 종속변수 분산 중 모형이 설명하는
            비율을 나타냅니다. 그러나 <em>R</em>&sup2;는 예측변수를 추가할수록
            항상 증가하는 문제가 있습니다&mdash;무의미한 변수를 넣어도 값이
            올라갑니다. <strong>수정된 <em>R</em>&sup2;</strong>는 예측변수의
            수와 표본 크기를 고려하여 패널티를 부여하므로, 모형 간 비교에 더
            적합합니다. 수정된 <em>R</em>&sup2;가 <em>R</em>&sup2;보다 현저히
            낮다면 불필요한 예측변수가 포함되었을 가능성을 시사합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            F-검정 (모형 전체 유의성)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em>-검정은 모형에 포함된 모든 예측변수가 동시에 0인지(즉,
            모형이 결과를 전혀 예측하지 못하는지)를 검정합니다.{" "}
            <em>F</em>-통계량이 크고 <em>p</em>값이 작으면(&lt; .05), 모형이
            전체적으로 유의하다고 결론내립니다. 그러나 <em>F</em>-검정이
            유의하더라도 <strong>모든</strong> 예측변수가 유의한 것은 아닐 수
            있으므로, 개별 <em>t</em>-검정도 반드시 확인해야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            개별 예측변수의 t-검정
          </p>
          <p className="mt-1 text-sm text-gray-600">
            각 예측변수에 대한 <em>t</em>-검정은 다른 예측변수를 통제한
            상태에서 해당 변수의 회귀계수가 0과 유의하게 다른지를
            검정합니다. <em>t</em> = <em>B</em> / <em>SE</em>로 계산되며,{" "}
            <em>p</em>값이 .05 미만이면 해당 예측변수가 모형에 유의한 기여를
            한다고 해석합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            표준화 계수 (<em>&beta;</em>)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            비표준화 계수(<em>B</em>)는 예측변수의 원래 단위로 해석되므로 서로
            다른 변수 간 상대적 중요도를 직접 비교할 수 없습니다. 표준화
            계수(<em>&beta;</em>)는 모든 변수를 <em>z</em>-점수로 변환한 후의
            계수이므로, <em>&beta;</em>의 절대값이 클수록 해당 변수의 상대적
            영향력이 크다고 해석합니다. 예를 들어 <em>&beta;</em> = .49는{" "}
            <em>&beta;</em> = .21보다 결과변수에 대한 영향력이 약 2.3배
            크다는 것을 의미합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            VIF (분산팽창인자, Variance Inflation Factor)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            VIF는 예측변수 간 다중공선성(multicollinearity)의 정도를
            측정합니다. VIF = 1이면 해당 변수가 다른 예측변수와 전혀 상관이
            없음을 의미하고, VIF가 커질수록 공선성이 심합니다. 일반적으로{" "}
            <strong>VIF &lt; 10</strong>이면 허용 가능하며,{" "}
            <strong>VIF &lt; 5</strong>를 권장하는 연구자도 많습니다. VIF가
            높으면 해당 변수를 제거하거나 주성분 분석을 고려해야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            Durbin-Watson 통계량
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Durbin-Watson 통계량은 잔차의 자기상관(autocorrelation)을
            검정합니다. 값의 범위는 0&ndash;4이며, <strong>2에 가까울수록</strong>{" "}
            자기상관이 없음을 나타냅니다. 일반적으로 1.5&ndash;2.5 범위이면
            잔차의 독립성 가정이 충족된 것으로 판단합니다. 0에 가까우면
            양의 자기상관, 4에 가까우면 음의 자기상관을 시사하며&mdash;이는
            시계열 데이터나 반복측정 설계에서 특히 주의해야 합니다.
          </p>
        </div>
      </div>

      {/* Multiple Regression vs Other Analyses */}
      <h3 className="text-xl font-semibold text-gray-900">
        다중회귀 vs 다른 분석 방법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        연구 설계와 변수의 특성에 따라 적절한 분석 방법이 달라집니다. 아래
        표는 다중회귀분석과 유사한 분석 기법들을 비교합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">분석 방법</th>
              <th className="py-2 text-left font-semibold">독립변수</th>
              <th className="py-2 text-left font-semibold">종속변수</th>
              <th className="py-2 text-left font-semibold">사용 상황</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">단순회귀</td>
              <td className="py-2 text-gray-700">연속형 1개</td>
              <td className="py-2 text-gray-700">연속형</td>
              <td className="py-2 text-gray-500">
                단일 예측변수와 결과변수의 관계 분석
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">다중회귀</td>
              <td className="py-2 text-gray-700">연속형 2개 이상</td>
              <td className="py-2 text-gray-700">연속형</td>
              <td className="py-2 text-gray-500">
                여러 예측변수의 동시 효과 분석 및 예측
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">로지스틱 회귀</td>
              <td className="py-2 text-gray-700">연속형 / 범주형</td>
              <td className="py-2 text-gray-700">이분형 (0/1)</td>
              <td className="py-2 text-gray-500">
                합격/불합격, 질병 유무 등 이분형 결과 예측
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">분산분석(ANOVA)</td>
              <td className="py-2 text-gray-700">범주형 (집단)</td>
              <td className="py-2 text-gray-700">연속형</td>
              <td className="py-2 text-gray-500">
                3개 이상 집단의 평균 차이 비교
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: 다중회귀분석에 더미 코딩된 범주형 변수를 포함하면 ANOVA와
        동일한 결과를 얻을 수 있습니다. 실제로 ANOVA는 회귀분석의 특수한
        경우로 볼 수 있으며, 일반선형모형(GLM)의 틀 안에서 두 접근법은
        수학적으로 동등합니다.
      </p>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        다중회귀분석의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        다중회귀분석 결과를 신뢰하려면 다음 여섯 가지 가정이 합리적으로
        충족되어야 합니다. 이러한 가정의 위반은 편향된 추정치, 부정확한{" "}
        <em>p</em>값, 또는 잘못된 결론으로 이어질 수 있습니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 선형성 (Linearity)</p>
          <p className="mt-1 text-sm text-gray-600">
            각 예측변수와 종속변수 사이의 관계가 선형이어야 합니다. 잔차 대
            예측값 산점도를 확인하여 곡선 패턴이 없는지 검토합니다. 비선형
            관계가 있다면 변수 변환(로그, 제곱근 등)이나 다항 회귀를
            고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 관찰의 독립성 (Independence)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            각 관찰은 다른 관찰과 독립적이어야 합니다. 시계열 데이터, 군집
            표본(같은 학교 학생들), 반복측정 설계에서는 이 가정이 위반될 수
            있습니다. Durbin-Watson 통계량(1.5&ndash;2.5)으로 잔차의 독립성을
            확인합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 잔차의 정규성 (Normality of Residuals)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            잔차(관측값 - 예측값)가 정규분포를 따라야 합니다. 이는 잔차의
            히스토그램이나 Q-Q 도표로 확인할 수 있습니다. 표본 크기가 충분히
            크면(일반적으로 <em>N</em> &ge; 30) 중심극한정리에 의해 이 가정의
            위반에 강건합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 등분산성 (Homoscedasticity)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            잔차의 분산이 예측값의 모든 수준에서 일정해야 합니다. 잔차 대
            예측값 산점도에서 &quot;나팔 모양&quot;(분산이 점점 커지는 패턴)이
            보이면 이분산성(heteroscedasticity)이 존재합니다. 이 경우 가중
            최소제곱법(WLS)이나 로버스트 표준오차를 사용합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            5. 다중공선성 없음 (No Multicollinearity)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            예측변수 간 과도한 상관이 없어야 합니다. 다중공선성이 심하면
            회귀계수의 표준오차가 팽창하여 개별 변수의 효과를 정확히 추정할 수
            없습니다. <strong>VIF &lt; 10</strong>(보수적으로 &lt; 5)을
            기준으로 하며, 예측변수 간 상관계수가 |<em>r</em>| &gt; .80이면
            주의가 필요합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            6. 자기상관 없음 (No Autocorrelation)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            잔차끼리 서로 상관이 없어야 합니다. Durbin-Watson 통계량이
            약 <strong>2</strong>에 가까우면 자기상관이 없다고 판단합니다.
            시계열 데이터에서 자기상관이 발견되면 시차 변수를 추가하거나
            일반화 최소제곱법(GLS)을 사용합니다.
          </p>
        </div>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판 지침에 따르면, 다중회귀분석 결과에는 모형의 <em>R</em>&sup2;,{" "}
        <em>F</em>-통계량, 각 예측변수의 비표준화 계수(<em>B</em>), 표준화
        계수(<em>&beta;</em>), <em>t</em>-통계량, <em>p</em>값을 포함해야
        합니다. 다음은 템플릿과 풀이 예제입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            보고 템플릿
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            다중회귀분석을 실시하여 [예측변수 목록]이(가) [종속변수]에 미치는
            영향을 검증하였다. 회귀모형은 통계적으로 유의하였으며,{" "}
            <em>F</em>(<em>df</em><sub>회귀</sub>,{" "}
            <em>df</em><sub>잔차</sub>) = [<em>F</em>값], <em>p</em> [&lt; .001
            또는 = 정확한 값], <em>R</em>&sup2; = [값], 수정된{" "}
            <em>R</em>&sup2; = [값]. [각 예측변수의 <em>B</em>,{" "}
            <em>&beta;</em>, <em>t</em>, <em>p</em>를 보고].
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            풀이 예제 보고
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            다중회귀분석을 실시하여 공부 시간, 수면 시간, 출석률이 대학생의
            GPA에 미치는 영향을 검증하였다. 회귀모형은 통계적으로
            유의하였으며, <em>F</em>(3, 26) = 22.29, <em>p</em> &lt; .001,{" "}
            <em>R</em>&sup2; = .72, 수정된 <em>R</em>&sup2; = .69로, 모형이
            GPA 분산의 약 72%를 설명하였다. 공부 시간(<em>B</em> = 0.055,{" "}
            <em>&beta;</em> = .49, <em>t</em> = 5.50, <em>p</em> &lt; .001),
            출석률(<em>B</em> = 0.018, <em>&beta;</em> = .33, <em>t</em> =
            4.50, <em>p</em> &lt; .001), 수면 시간(<em>B</em> = 0.112,{" "}
            <em>&beta;</em> = .21, <em>t</em> = 2.95, <em>p</em> = .007) 모두
            GPA를 유의하게 예측하였다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>F</em>값과 <em>t</em>값은 소수점 둘째 자리까지
        보고합니다. <em>p</em>값은 소수점 셋째 자리까지 보고하되, .001
        미만인 경우 <em>p</em> &lt; .001로 표기합니다. <em>R</em>&sup2;는
        소수점 둘째 자리까지 보고합니다. 통계 기호(<em>F</em>, <em>t</em>,{" "}
        <em>p</em>, <em>R</em>&sup2;, <em>B</em>, <em>&beta;</em>)는 항상
        이탤릭체로 표기합니다.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>과적합 (Overfitting):</strong> 표본 크기에 비해 너무 많은
          예측변수를 포함하면 모형이 현재 데이터의 잡음(noise)까지 학습하여
          새로운 데이터에 대한 예측력이 떨어집니다. 경험적으로{" "}
          <strong><em>N</em>/<em>k</em> &gt; 10</strong>(표본 크기 대
          예측변수 수의 비율이 10 이상)을 권장하며, 일부 연구자는{" "}
          <em>N</em>/<em>k</em> &gt; 20을 권장합니다. 예를 들어 예측변수가
          5개이면 최소 50명 이상의 표본이 필요합니다.
        </li>
        <li>
          <strong>다중공선성 무시:</strong> 예측변수 간 높은 상관(예: |<em>r</em>|
          &gt; .80)을 확인하지 않고 분석을 진행하면, 회귀계수의 부호가
          뒤바뀌거나 유의하지 않은 것으로 나타날 수 있습니다. 반드시 VIF를
          확인하고, 공선성이 심한 변수는 하나를 제거하거나 합성 점수를
          만드세요.
        </li>
        <li>
          <strong><em>B</em>와 <em>&beta;</em> 혼동:</strong>{" "}
          비표준화 계수(<em>B</em>)는 원래 단위로의 해석에 사용하고, 표준화
          계수(<em>&beta;</em>)는 변수 간 상대적 중요도 비교에 사용합니다.
          둘을 혼동하면 잘못된 해석이 됩니다. 예를 들어 &quot;공부 시간이 1시간
          증가하면 GPA가 0.055 증가한다&quot;는 <em>B</em>의 해석이고,
          &quot;공부 시간이 GPA에 가장 큰 영향을 미친다&quot;는{" "}
          <em>&beta;</em>의 해석입니다.
        </li>
        <li>
          <strong>단계적 회귀의 함정 (Stepwise Regression):</strong> 자동
          변수 선택 방법(전진, 후진, 단계적)은 편리하지만, 표본 특이적
          결과를 산출하여 교차 타당성이 낮고, 제1종 오류율이 증가하며, 이론에
          기반하지 않은 모형을 만들 수 있습니다. 가능하면 이론적 근거에 기반한
          변수 선택을 권장합니다.
        </li>
        <li>
          <strong>인과관계 과대해석:</strong> 회귀분석은 기본적으로 변수 간{" "}
          <strong>연관성</strong>을 분석하는 방법이며, 실험 설계가 아닌 한
          인과관계를 주장할 수 없습니다. &quot;X가 Y에 영향을 미친다&quot;보다
          &quot;X가 Y를 유의하게 예측한다&quot;라는 표현이 더 적절합니다.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 다중회귀분석 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1">lm()</code> 함수 및
          SPSS의 회귀분석 출력에 대해 검증되었습니다. 최소제곱법(OLS)을
          사용하여 회귀계수를 추정하며, <em>F</em>-분포와{" "}
          <em>t</em>-분포에 jstat 라이브러리를 사용합니다. 모든 회귀계수,
          표준오차, <em>t</em>-통계량, <em>p</em>값, <em>R</em>&sup2;,
          수정된 <em>R</em>&sup2;, <em>F</em>-통계량, VIF, Durbin-Watson
          통계량은 R과 SPSS 출력과 소수점 4자리 이상 일치합니다.
          95% 신뢰구간은 <em>t</em>-분포의 임계값을 사용하여 정확하게
          계산됩니다.
        </p>
      </div>
    </section>
  );
}

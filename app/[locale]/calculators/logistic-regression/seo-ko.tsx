export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        이진 로지스틱 회귀분석이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        이진 로지스틱 회귀분석(Binary Logistic Regression)은 하나 이상의
        예측변수(독립변수)와 이진(이분형) 결과변수 사이의 관계를 모형화하는 통계
        방법입니다. 선형 회귀가 연속형 결과를 예측하는 반면, 로지스틱 회귀는
        관측치가 두 범주(0과 1로 코딩) 중 하나에 속할 <strong>확률</strong>을
        예측합니다. 이 모형은 로지스틱(시그모이드) 함수를 사용하여 예측 확률을
        0과 1 사이로 제한합니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        로지스틱 회귀의 역사는 1838년 벨기에 수학자 Pierre-Fran&ccedil;ois
        Verhulst가 인구 성장을 모형화하기 위해 로지스틱 함수를 도입한 것에서
        시작됩니다. 이후 1944년 Joseph Berkson이 &quot;logit&quot;이라는 용어를
        만들고, David Cox가 1958년 이를 통계적 회귀 프레임워크로 정립하면서
        현대적인 로지스틱 회귀분석의 토대가 마련되었습니다. 오늘날 로지스틱
        회귀는 의학(질병 발생 예측), 마케팅(구매 여부 예측), 사회과학(투표 행동
        분석) 등 거의 모든 분야에서 핵심적인 분류 기법으로 사용됩니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        로지스틱 회귀의 핵심은 <strong>로그 오즈(logit)</strong> 변환입니다.
        결과변수의 확률 <em>p</em>를 직접 모형화하는 대신, 오즈의 자연로그를
        선형 함수로 모형화합니다: logit(<em>p</em>) = ln(<em>p</em> / (1 &minus;{" "}
        <em>p</em>)) = <em>B</em><sub>0</sub> + <em>B</em><sub>1</sub>
        <em>X</em><sub>1</sub> + <em>B</em><sub>2</sub><em>X</em>
        <sub>2</sub> + &hellip;. 이 변환 덕분에 좌변은 &minus;&infin;에서
        +&infin;까지의 범위를 가지며, 시그모이드 함수 <em>p</em> = 1 / (1 +
        e<sup>&minus;z</sup>)를 통해 0&ndash;1 확률로 역변환됩니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        모형의 계수 추정에는 <strong>최대우도추정법</strong>(Maximum Likelihood
        Estimation, MLE)이 사용됩니다. 선형 회귀의 최소제곱법과 달리, MLE는
        관측된 데이터가 나타날 우도(likelihood)를 최대화하는 계수를 반복적으로
        탐색합니다. 구체적으로는 <strong>IRLS</strong>(Iteratively Reweighted
        Least Squares) 알고리즘이 사용되며, 이는 R의{" "}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">
          glm()
        </code>{" "}
        함수와 SPSS에서 사용하는 것과 동일한 방법입니다. IRLS는 각 반복에서
        가중치를 업데이트하며, 수렴 기준(tolerance)을 만족할 때까지 계수를
        개선해 나갑니다.
      </p>

      {/* 핵심 개념 */}
      <h3 className="text-xl font-semibold text-gray-900">
        핵심 개념
      </h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            오즈비(Odds Ratio) &mdash; Exp(B)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            오즈비는 예측변수가 1단위 증가할 때 결과 발생 오즈의 곱셈적 변화를
            나타냅니다. 오즈비가 1보다 크면 해당 예측변수가 증가할수록 결과 발생
            오즈가 증가함을, 1보다 작으면 오즈가 감소함을 의미합니다. 정확히
            1이면 예측변수가 결과에 영향을 미치지 않음을 뜻합니다. 예를 들어,
            Exp(<em>B</em>) = 1.5는 예측변수가 1단위 증가할 때 결과 발생 오즈가
            50% 증가한다는 것을 의미합니다. 오즈비의 95% 신뢰구간이 1을
            포함하면 통계적으로 유의하지 않습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">Wald 검정</p>
          <p className="mt-1 text-sm text-gray-600">
            Wald 검정은 개별 예측변수가 통계적으로 유의한지를 평가합니다. 회귀
            계수를 표준오차로 나눈 비율의 제곱(Wald = (<em>B</em> /{" "}
            <em>SE</em>)&sup2;)으로 계산되며, 자유도 1인 카이제곱 분포를
            따릅니다. Wald 통계량의 <em>p</em>값이 유의수준(일반적으로 .05)보다
            작으면, 해당 예측변수가 모형에 유의한 기여를 한다고 결론짓습니다.
            단, 계수가 매우 크거나 분리(separation) 문제가 있을 경우 Wald
            검정이 보수적(제2종 오류 증가)이 될 수 있으므로 주의가 필요합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            유사 R&sup2;(Pseudo R&sup2;) 측정치
          </p>
          <p className="mt-1 text-sm text-gray-600">
            선형 회귀와 달리, 로지스틱 회귀에는 진정한 R&sup2;이 존재하지
            않습니다. 대신 모형의 설명력을 근사하는 여러 유사 R&sup2; 측정치가
            사용됩니다. <strong>Cox &amp; Snell R&sup2;</strong>은 모형의 우도비를
            기반으로 하지만 최댓값이 1에 도달할 수 없다는 한계가 있습니다.{" "}
            <strong>Nagelkerke R&sup2;</strong>은 Cox &amp; Snell 값을 조정하여
            0에서 1까지의 범위를 갖도록 만든 것으로, 해석이 더 직관적입니다.
            일반적으로 Nagelkerke R&sup2;을 보고하며, 값이 클수록 모형의 설명력이
            높다고 해석합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            총괄 검정(Omnibus Test)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            총괄 카이제곱 검정(Omnibus Test of Model Coefficients)은 모든
            예측변수를 포함한 모형이 절편만 있는 영 모형(null model)보다
            유의하게 더 나은지를 평가합니다. 이 검정은 두 모형의 &minus;2
            로그우도 차이를 카이제곱 통계량으로 사용하며, 자유도는 모형에
            포함된 예측변수의 수입니다. 총괄 검정이 유의하면(<em>p</em> &lt;
            .05), 적어도 하나의 예측변수가 결과 예측에 유의한 기여를 한다는
            것을 의미합니다.
          </p>
        </div>
      </div>

      {/* 풀이 예제 */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          풀이 예제: 연령과 BMI로 질병 발생 예측
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          의학 연구자가 연령(세)과 BMI(kg/m&sup2;)를 사용하여 특정 질병의
          발생 여부(0 = 비발생, 1 = 발생)를 예측하고자 합니다. 30명의 환자
          데이터를 수집하여 이진 로지스틱 회귀분석을 실시했습니다.
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            모형 요약
          </p>
          <p className="mt-1 text-sm text-gray-600">
            &minus;2 로그우도 = 24.31, Cox &amp; Snell R&sup2; = .35,
            Nagelkerke R&sup2; = .47
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            총괄 검정(Omnibus Test)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <em>&chi;</em>&sup2;(2) = 13.05, <em>p</em> = .001 &mdash; 모형이
            영 모형보다 유의하게 우수합니다.
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            회귀계수 표
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">변수</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>B</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>SE</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">Wald</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>df</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">Exp(<em>B</em>)</th>
                  <th className="py-1 text-left font-medium text-gray-600">95% CI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">연령</td>
                  <td className="py-1 text-gray-700">0.12</td>
                  <td className="py-1 text-gray-700">0.05</td>
                  <td className="py-1 text-gray-700">5.76</td>
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">.016</td>
                  <td className="py-1 text-gray-700">1.13</td>
                  <td className="py-1 text-gray-700">[1.02, 1.25]</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">BMI</td>
                  <td className="py-1 text-gray-700">0.28</td>
                  <td className="py-1 text-gray-700">0.11</td>
                  <td className="py-1 text-gray-700">6.48</td>
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">.011</td>
                  <td className="py-1 text-gray-700">1.32</td>
                  <td className="py-1 text-gray-700">[1.07, 1.64]</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">상수</td>
                  <td className="py-1 text-gray-700">&minus;12.45</td>
                  <td className="py-1 text-gray-700">4.21</td>
                  <td className="py-1 text-gray-700">8.74</td>
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">.003</td>
                  <td className="py-1 text-gray-700">0.00</td>
                  <td className="py-1 text-gray-700">&mdash;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과 해석</p>
          <p className="mt-1 text-sm text-gray-600">
            연령과 BMI 모두 질병 발생의 유의한 예측변수입니다. 연령이 1세
            증가하면 질병 발생 오즈가 13% 증가하고(Exp(<em>B</em>) = 1.13),
            BMI가 1단위 증가하면 질병 발생 오즈가 32% 증가합니다(Exp(<em>B</em>)
            = 1.32). Nagelkerke R&sup2; = .47은 모형이 결과 변동의 약 47%를
            설명함을 나타냅니다.
          </p>
        </div>
      </div>

      {/* 분류표 이해하기 */}
      <h3 className="text-xl font-semibold text-gray-900">
        분류표 이해하기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        분류표(Classification Table, 혼동 행렬이라고도 함)는 모형이 예측한
        범주와 실제 관찰된 범주를 비교하여 모형의 분류 성능을 평가합니다.
        일반적으로 확률 절단점(cutoff) 0.5를 기준으로, 예측 확률이 0.5 이상이면
        1(발생)로, 미만이면 0(비발생)으로 분류합니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            민감도(Sensitivity) &mdash; 진양성률
          </p>
          <p className="mt-1 text-sm text-gray-600">
            실제 양성(1) 중에서 모형이 정확하게 양성으로 예측한 비율입니다.
            민감도 = 진양성 / (진양성 + 위음성). 의학에서 질병 선별 검사의
            경우, 높은 민감도가 중요합니다&mdash;질병이 있는 환자를 놓치지
            않아야 하기 때문입니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            특이도(Specificity) &mdash; 진음성률
          </p>
          <p className="mt-1 text-sm text-gray-600">
            실제 음성(0) 중에서 모형이 정확하게 음성으로 예측한 비율입니다.
            특이도 = 진음성 / (진음성 + 위양성). 높은 특이도는 건강한 사람을
            잘못 환자로 분류하는 오류를 줄여줍니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">전체 정확도</p>
          <p className="mt-1 text-sm text-gray-600">
            전체 사례 중 정확하게 분류된 비율입니다. 전체 정확도 = (진양성 +
            진음성) / 총 사례 수. 그러나 범주의 비율이 불균형한 경우(예: 양성
            10%, 음성 90%), 전체 정확도만으로는 모형 성능을 판단하기
            어렵습니다&mdash;모든 사례를 음성으로 예측해도 90% 정확도를
            달성할 수 있기 때문입니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            확률 절단점(Cutoff)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            기본 절단점은 0.5이지만, 연구 목적에 따라 조정할 수 있습니다.
            절단점을 낮추면(예: 0.3) 민감도가 높아지지만 특이도가 낮아지고,
            절단점을 높이면(예: 0.7) 특이도가 높아지지만 민감도가 낮아집니다.
            최적의 절단점은 ROC 곡선 분석이나 연구의 맥락(거짓양성 vs.
            거짓음성의 비용)을 고려하여 결정합니다.
          </p>
        </div>
      </div>

      {/* Hosmer-Lemeshow 적합도 검정 */}
      <h3 className="text-xl font-semibold text-gray-900">
        Hosmer-Lemeshow 적합도 검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Hosmer-Lemeshow 검정은 로지스틱 회귀 모형이 데이터에 얼마나 잘
        적합하는지를 평가하는 대표적인 방법입니다. 이 검정은 관측치를 예측
        확률에 따라 일반적으로 10개의 동일 크기 집단(십분위수)으로 나눈 뒤, 각
        집단 내에서 관측된 빈도와 모형이 예측한 기대 빈도를 비교합니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        관측 빈도와 기대 빈도의 차이를 종합한 카이제곱 통계량이 계산되며,
        자유도는 일반적으로 8(집단 수 &minus; 2)입니다. 검정 결과의 해석은
        다른 적합도 검정과 다릅니다: <strong>비유의한 결과</strong>(<em>p</em>{" "}
        &gt; .05)가 바람직하며, 이는 모형의 예측이 관측 데이터와 일치한다는
        것을 나타냅니다. 반대로 유의한 결과(<em>p</em> &le; .05)는 모형의
        적합도가 부족하다는 것을 시사합니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        그러나 Hosmer-Lemeshow 검정에는 한계가 있습니다. 표본 크기가 매우 크면
        사소한 차이도 유의하게 나타날 수 있고, 반대로 표본 크기가 작으면
        심각한 적합도 부족을 감지하지 못할 수 있습니다. 또한 집단의 수와 구성
        방법에 따라 결과가 달라질 수 있습니다. 따라서 이 검정 결과를 다른
        적합도 지표(유사 R&sup2;, 분류표 정확도 등)와 함께 종합적으로
        해석하는 것이 좋습니다.
      </p>

      {/* 로지스틱 회귀 vs 다른 분석 */}
      <h3 className="text-xl font-semibold text-gray-900">
        로지스틱 회귀 vs 다른 분석
      </h3>
      <p className="text-gray-600 leading-relaxed">
        이진 결과변수를 분석하는 방법에는 여러 가지가 있습니다. 아래 표는
        로지스틱 회귀와 관련 분석 방법들의 주요 특징을 비교합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">분석 방법</th>
              <th className="py-2 text-left font-semibold">결과변수 유형</th>
              <th className="py-2 text-left font-semibold">연결함수</th>
              <th className="py-2 text-left font-semibold">주요 특징</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">로지스틱 회귀</td>
              <td className="py-2 text-gray-700">이진(0/1)</td>
              <td className="py-2 text-gray-700">로짓(logit)</td>
              <td className="py-2 text-gray-500">
                오즈비 제공, 가장 널리 사용, 분포 가정 최소
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">프로빗 회귀</td>
              <td className="py-2 text-gray-700">이진(0/1)</td>
              <td className="py-2 text-gray-700">프로빗(&Phi;)</td>
              <td className="py-2 text-gray-500">
                잠재 정규 분포 가정, 역학 연구에서 선호
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">판별분석</td>
              <td className="py-2 text-gray-700">범주형(2개 이상)</td>
              <td className="py-2 text-gray-700">&mdash;</td>
              <td className="py-2 text-gray-500">
                다변량 정규성과 등분산 가정, 연속형 예측변수만 가능
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">다중 회귀</td>
              <td className="py-2 text-gray-700">연속형</td>
              <td className="py-2 text-gray-700">항등(identity)</td>
              <td className="py-2 text-gray-500">
                연속형 결과변수에 적합, 이진 결과에는 부적절
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        이진 결과변수에 다중 회귀를 적용하면(선형 확률 모형), 예측값이
        0&ndash;1 범위를 벗어날 수 있고, 오차항의 이분산성 문제가
        발생합니다. 따라서 이진 결과변수에는 로지스틱 회귀를 사용하는 것이
        표준적인 접근법입니다.
      </p>

      {/* 가정 */}
      <h3 className="text-xl font-semibold text-gray-900">
        이진 로지스틱 회귀의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        로지스틱 회귀 결과를 올바르게 해석하려면 다음 가정들이 합리적으로
        충족되어야 합니다. 이러한 가정을 위반하면 편향된 추정치, 부정확한{" "}
        <em>p</em>값, 신뢰할 수 없는 결론으로 이어질 수 있습니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 이진 결과변수</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 정확히 두 개의 범주(0과 1)를 가져야 합니다. 결과변수가
            3개 이상의 범주를 가지면 다항 로지스틱 회귀를, 순서가 있는 범주면
            순서형 로지스틱 회귀를 사용해야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 관찰의 독립성</p>
          <p className="mt-1 text-sm text-gray-600">
            각 관찰은 다른 관찰과 독립적이어야 합니다. 반복 측정이나 군집
            데이터(예: 같은 병원 환자들)의 경우 일반화 추정 방정식(GEE)이나
            혼합효과 로지스틱 회귀를 고려해야 합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 다중공선성 없음</p>
          <p className="mt-1 text-sm text-gray-600">
            예측변수들 사이에 높은 상관관계가 없어야 합니다. 다중공선성이 있으면
            계수의 표준오차가 커지고, 개별 예측변수의 효과를 정확히 추정할 수
            없습니다. 분산팽창계수(VIF)가 10 이상이거나, 상관계수의
            절대값이 .8 이상인 경우 다중공선성을 의심할 수 있습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 로짓의 선형성
          </p>
          <p className="mt-1 text-sm text-gray-600">
            연속형 예측변수와 결과변수의 로그 오즈(logit) 사이에 선형 관계가
            있어야 합니다. 이 가정은 Box-Tidwell 검정을 통해 확인할 수
            있습니다. 위반 시에는 예측변수를 변환(로그, 제곱근 등)하거나
            다항식 항을 추가하는 것을 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            5. 적절한 표본 크기 (EPV &ge; 10)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            안정적인 계수 추정을 위해 <strong>사건당 예측변수
            수</strong>(Events Per Variable, EPV)가 최소 10 이상이어야 합니다.
            즉, 빈도가 적은 결과 범주의 사례 수를 예측변수 수로 나눈 값이 10
            이상이어야 합니다. 예를 들어, 양성(1)이 30건이고 예측변수가
            3개면 EPV = 10으로 최소 기준을 충족합니다. EPV가 부족하면 과적합,
            불안정한 계수, 수렴 실패 등의 문제가 발생할 수 있습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            6. 완전 분리 없음
          </p>
          <p className="mt-1 text-sm text-gray-600">
            완전 분리(complete separation)는 하나 이상의 예측변수가 결과를
            완벽하게 예측하는 경우 발생합니다. 이 경우 최대우도 추정치가
            수렴하지 않으며, 계수가 무한대로 발산합니다. 준완전
            분리(quasi-complete separation)도 유사한 문제를 일으킵니다.
            분리가 감지되면 Firth의 편향감소 로지스틱 회귀나 정확
            로지스틱 회귀를 대안으로 고려하세요.
          </p>
        </div>
      </div>

      {/* APA 형식 보고법 */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식으로 로지스틱 회귀 결과 보고하기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판 지침에 따르면, 로지스틱 회귀 결과에는 총괄 모형 검정 결과,
        유사 R&sup2;, 분류 정확도, 그리고 개별 예측변수의 계수, Wald 검정
        결과, 오즈비와 95% 신뢰구간을 포함해야 합니다. 다음은 보고 템플릿과
        예시입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            보고 템플릿
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            이진 로지스틱 회귀분석을 실시하여 [결과변수]를 [예측변수 목록]으로
            예측하였다. 전체 모형은 통계적으로 유의하였으며,{" "}
            <em>&chi;</em>&sup2;(<em>df</em>) = [값], <em>p</em> = [값],
            Nagelkerke <em>R</em>&sup2; = [값]이었다. 모형은 전체 사례의
            [값]%를 정확하게 분류하였다. [예측변수]는 유의한 예측변수였으며,{" "}
            <em>B</em> = [값], Wald <em>&chi;</em>&sup2;(1) = [값],{" "}
            <em>p</em> = [값], OR = [값], 95% CI [하한, 상한]이었다.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            보고 예시
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            이진 로지스틱 회귀분석을 실시하여 질병 발생 여부를 연령과 BMI로
            예측하였다. 전체 모형은 통계적으로 유의하였으며,{" "}
            <em>&chi;</em>&sup2;(2) = 13.05, <em>p</em> = .001, Nagelkerke{" "}
            <em>R</em>&sup2; = .47이었다. 모형은 전체 사례의 80.0%를 정확하게
            분류하였다. 연령은 유의한 예측변수였으며, <em>B</em> = 0.12, Wald{" "}
            <em>&chi;</em>&sup2;(1) = 5.76, <em>p</em> = .016, OR = 1.13, 95%
            CI [1.02, 1.25]이었다. BMI 역시 유의한 예측변수였으며,{" "}
            <em>B</em> = 0.28, Wald <em>&chi;</em>&sup2;(1) = 6.48,{" "}
            <em>p</em> = .011, OR = 1.32, 95% CI [1.07, 1.64]이었다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 통계 기호(<em>B</em>, <em>p</em>, <em>&chi;</em>&sup2;,{" "}
        <em>R</em>&sup2;, OR)는 항상 이탤릭체로 표기합니다. <em>p</em>값은
        소수점 셋째 자리까지 보고하되, .001 미만인 경우 <em>p</em> &lt;
        .001로 표기합니다. 오즈비와 95% 신뢰구간은 반드시 함께 보고해야
        합니다.
      </p>

      {/* 흔한 실수 */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>계수를 선형 효과로 해석:</strong> 로지스틱 회귀의 계수{" "}
          <em>B</em>는 로그 오즈의 변화량이며, 확률의 선형적 변화를 의미하지
          않습니다. 예를 들어, <em>B</em> = 0.5는 &quot;확률이 0.5
          증가한다&quot;는 뜻이 아니라, &quot;오즈가 e<sup>0.5</sup> &asymp;
          1.65배 증가한다&quot;는 뜻입니다. 확률에 대한 효과는 기준 확률에 따라
          달라집니다.
        </li>
        <li>
          <strong>분리 문제 무시:</strong> 완전 분리나 준완전 분리가 발생하면
          계수가 비정상적으로 크고 표준오차가 매우 커집니다. 소프트웨어가
          경고 메시지를 출력할 수 있으나, 많은 연구자가 이를 간과합니다.
          분리가 의심되면 빈도 분포를 확인하고, Firth의 방법이나 변수 제거를
          고려하세요.
        </li>
        <li>
          <strong>과적합:</strong> 표본 크기에 비해 예측변수가 너무 많으면
          과적합이 발생합니다. EPV &lt; 10인 경우 특히 위험합니다. 모형이 훈련
          데이터에는 잘 맞지만 새로운 데이터에 대한 일반화 능력이 떨어집니다.
          변수 선택 방법(전진, 후진, 단계적)을 신중하게 적용하고,
          가능하다면 교차 검증을 사용하세요.
        </li>
        <li>
          <strong>오즈비 미보고:</strong> 계수(<em>B</em>)와 <em>p</em>값만
          보고하고 오즈비(Exp(<em>B</em>))와 95% 신뢰구간을 보고하지 않는
          것은 흔한 실수입니다. 오즈비는 효과의 크기를 직관적으로 전달하며,
          신뢰구간은 추정의 정밀도를 보여줍니다. APA 가이드라인에서도 오즈비
          보고를 권장합니다.
        </li>
        <li>
          <strong>로짓 선형성 가정 미확인:</strong> 연속형 예측변수와 로짓
          사이의 선형 관계를 확인하지 않으면, 모형이 비선형 패턴을 놓칠 수
          있습니다. Box-Tidwell 검정이나 로짓 잔차 플롯을 통해 이 가정을
          점검해야 합니다.
        </li>
        <li>
          <strong>불균형 데이터 무시:</strong> 결과변수의 범주 비율이 매우
          불균형한 경우(예: 양성 5%, 음성 95%), 모형이 다수 범주 쪽으로
          편향될 수 있습니다. 전체 정확도가 높아 보여도 민감도가 매우 낮을 수
          있으므로, 분류표의 민감도와 특이도를 반드시 확인하세요.
        </li>
      </ul>

      {/* 계산 정확도 */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 로지스틱 회귀분석은 IRLS(Iteratively Reweighted Least
          Squares) 알고리즘을 사용하며, 이는 R의{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            glm()
          </code>{" "}
          함수와 SPSS에서 사용하는 것과 동일한 방법입니다. 각 반복에서 수렴
          여부를 10<sup>&minus;8</sup> 허용오차로 확인하며, 분리 감지 기능을
          내장하고 있습니다. 카이제곱 확률 분포에는 jstat 라이브러리를
          사용합니다. 모든 회귀계수, 표준오차, Wald 통계량, 오즈비, 유사
          R&sup2;, Hosmer-Lemeshow 통계량은 R과 SPSS 출력과 소수점 4자리
          이상 일치하는 것으로 검증되었습니다.
        </p>
      </div>
    </section>
  );
}

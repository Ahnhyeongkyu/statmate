export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        단순선형회귀란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        단순선형회귀(Simple Linear Regression)는 하나의 독립변수(X)와
        종속변수(Y) 간의 관계를 관측된 데이터에 직선을 적합시켜 모형화하는
        통계 방법입니다. 회귀 방정식은 <em>&#x177; = b&#x2080; +
        b&#x2081;x</em> 형태를 취하며, <em>b&#x2080;</em>은 y절편이고{" "}
        <em>b&#x2081;</em>은 회귀선의 기울기입니다. 이 방법은{" "}
        <strong>최소제곱법(OLS)</strong>을 사용하여 모수를 추정하며, 관측값과
        예측값 간 차이의 제곱합을 최소화합니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        회귀분석은 1880년대 <strong>Francis Galton</strong> 경이 유전적
        신장에 관한 연구에서 개척했으며, 자녀의 키가 모집단 평균으로
        &quot;회귀&quot;하는 경향을 관찰한 것에서 유래했습니다. 이후{" "}
        <strong>Karl Pearson</strong>과 <strong>Ronald Fisher</strong>가
        현대 회귀분석에서 사용되는 추론통계(F-검정, 계수에 대한 t-검정)의
        수학적 체계를 정립했습니다. 오늘날 단순선형회귀는 통계학에서 가장
        기본적인 도구 중 하나로, 다중회귀, 분산분석(ANOVA), 그리고 많은
        기계학습 알고리즘의 기초가 됩니다.
      </p>

      {/* Key Concepts */}
      <h3 className="text-xl font-semibold text-gray-900">
        선형회귀의 핵심 개념
      </h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            기울기 (b&#x2081;)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            기울기는 X가 1단위 증가할 때 Y의 예상 변화량을 나타냅니다. 양의
            기울기는 양의 관계(X 증가 시 Y 증가)를, 음의 기울기는 역의
            관계를 나타냅니다. 기울기의 유의성은 자유도 n - 2인 t-검정으로
            검정합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            절편 (b&#x2080;)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            절편은 X가 0일 때 Y의 예측값입니다. 많은 실제 상황에서 X = 0이
            의미가 없을 수 있으므로 (예: 키로 체중을 예측하는 경우), 절편은
            신중하게 해석해야 합니다. 절편의 주된 역할은 회귀선을 올바른
            위치에 놓는 것입니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            추정의 표준오차
          </p>
          <p className="mt-1 text-sm text-gray-600">
            추정의 표준오차(SEE)는 관측값과 회귀선 사이의 평균 거리를
            측정합니다. 값이 작을수록 데이터 포인트가 회귀선 주위에 더 밀집해
            있음을 나타내며, 예측 정확도가 더 높음을 시사합니다.
          </p>
        </div>
      </div>

      {/* R-squared Interpretation */}
      <h3 className="text-xl font-semibold text-gray-900">
        R&sup2; (결정계수)의 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        R&sup2;는 독립변수에 의해 설명되는 종속변수 분산의 비율을 나타냅니다.
        0에서 1 사이의 값을 가지며, 0은 모형이 변동성을 전혀 설명하지
        못함을, 1은 모든 변동성을 설명함을 의미합니다. 조정된 R&sup2;는
        예측변수의 수를 고려하며, 모형 간 비교 시 특히 유용합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">R&sup2; 값</th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">실질적 의미</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.10</td>
              <td className="py-2">매우 약한</td>
              <td className="py-2 text-gray-500">
                모형이 분산을 거의 설명하지 못함; X는 약한 예측변수
              </td>
            </tr>
            <tr>
              <td className="py-2">0.10 &ndash; 0.30</td>
              <td className="py-2">약한</td>
              <td className="py-2 text-gray-500">
                작지만 잠재적으로 의미 있는 예측력
              </td>
            </tr>
            <tr>
              <td className="py-2">0.30 &ndash; 0.50</td>
              <td className="py-2">보통</td>
              <td className="py-2 text-gray-500">
                의미 있는 예측; 많은 사회과학 연구에서 유용
              </td>
            </tr>
            <tr>
              <td className="py-2">0.50 &ndash; 0.70</td>
              <td className="py-2">강한</td>
              <td className="py-2 text-gray-500">
                상당한 예측 정확도; 좋은 모형 적합도
              </td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.70</td>
              <td className="py-2">매우 강한</td>
              <td className="py-2 text-gray-500">
                우수한 모형 적합도; X는 Y의 강력한 예측변수
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: 이 기준은 일반적인 지침입니다. 물리학이나 공학 분야에서는 R&sup2;
        값이 0.90 이상인 경우가 흔합니다. 심리학과 사회과학에서는 R&sup2; 값이
        0.20&ndash;0.40이면 의미 있는 수준으로 간주되는 경우가 많습니다.
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: 학습시간으로 시험점수 예측
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          한 연구자가 대학생 10명을 대상으로 학습시간이 시험 성적을 예측하는지
          조사합니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              학습시간 (X)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              시험점수 (Y)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              2.1, 4.0, 5.8, 8.2, 9.8, 12.1, 14.0, 15.9, 18.2, 19.8
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em>(1, 8) = 2854.88, <em>p</em> &lt; .001, <em>R</em>&sup2;
            = .997
          </p>
          <p className="mt-1 text-sm text-gray-600">
            &#x177; = 0.04 + 1.97x
          </p>
          <p className="mt-2 text-sm text-gray-600">
            모형은 통계적으로 유의하며 시험 점수 분산의 99.7%를 설명합니다.
            학습시간이 1시간 추가될 때마다 예측 시험 점수는 약 1.97점
            증가합니다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        단순선형회귀의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        회귀 결과를 해석하기 전에, 다음 가정들이 충족되는지 확인해야 합니다.
        가정을 위반하면 편향된 추정치, 부정확한 표준오차, 유효하지 않은
        추론을 초래할 수 있습니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 선형성</p>
          <p className="mt-1 text-sm text-gray-600">
            X와 Y 사이의 관계는 선형이어야 합니다. 데이터의 산점도를 확인하고,
            관계가 곡선형(예: 이차, 로그)이면 변수 변환이나 다항 회귀를
            고려하십시오. 잔차 그림에서 0 주변으로 무작위 분산을 보이면
            선형성을 지지합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 오차의 독립성
          </p>
          <p className="mt-1 text-sm text-gray-600">
            잔차(오차)는 서로 독립적이어야 합니다. 이는 연속 관측치가 상관될 수
            있는 시계열 데이터에서 특히 중요합니다 (자기상관). Durbin-Watson
            검정으로 자기상관을 탐지할 수 있으며, 값이 2에 가까우면 자기상관이
            없음을 나타냅니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 잔차의 정규성
          </p>
          <p className="mt-1 text-sm text-gray-600">
            잔차는 근사적으로 정규분포를 따라야 합니다. 이 가정은 가설검정과
            신뢰구간 구성에 중요합니다. Q-Q 도표나 Shapiro-Wilk 검정으로
            정규성을 확인하십시오. 큰 표본(n &gt; 30)에서는 중심극한정리에
            의해 약간의 비정규성에도 회귀분석이 강건합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 등분산성 (분산의 동질성)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            잔차의 분산은 X의 모든 수준에서 대략 일정해야 합니다. 잔차 대
            적합값 그림에서 잔차의 퍼짐이 대체로 동일해야 합니다. 퍼짐이
            부채꼴 형태로 벌어지면(이분산성) 가중 최소제곱법이나 강건
            표준오차의 사용을 고려하십시오.
          </p>
        </div>
      </div>

      {/* APA Reporting Format */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식으로 회귀분석 결과 보고하는 방법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판 지침에 따르면, 회귀분석 결과에는 자유도가 포함된 F-통계량,
        p-값, R&sup2;, 회귀 방정식, 개별 계수 통계량을 포함해야 합니다.
        다음은 적용할 수 있는 보고 양식입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            단순선형회귀
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            학습시간으로 시험 점수를 예측하기 위해 단순선형회귀를 실시했다.
            모형은 통계적으로 유의했다, <em>F</em>(1, 8) = 2854.88,{" "}
            <em>p</em> &lt; .001, <em>R</em>&sup2; = .997. 학습시간은 시험
            점수를 유의하게 예측했다, <em>b</em> = 1.97, <em>t</em>(8) =
            53.43, <em>p</em> &lt; .001, 95% CI [1.88, 2.05]. 학습시간이
            1시간 추가될 때마다 시험 점수는 평균 1.97점 증가했다.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            비유의 결과
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            일일 스크린 타임으로 행복 점수를 예측하기 위해 단순선형회귀를
            실시했다. 모형은 통계적으로 유의하지 않았다, <em>F</em>(1, 48) =
            1.23, <em>p</em> = .274, <em>R</em>&sup2; = .025. 스크린 타임은
            행복 점수를 유의하게 예측하지 못했다, <em>b</em> = -0.15,{" "}
            <em>t</em>(48) = -1.11, <em>p</em> = .274, 95% CI [-0.42, 0.12].
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 회귀계수, t-값, F-값은 소수점 둘째 자리까지 보고합니다. p-값은
        소수점 셋째 자리까지 보고하되, .001 미만인 경우 <em>p</em> &lt; .001로
        표기합니다. R&sup2;와 주요 계수의 95% 신뢰구간을 항상 포함하십시오.
      </p>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        회귀분석 vs. 다른 검정: 언제 사용하는가
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">상황</th>
              <th className="py-2 text-left font-semibold">
                권장 검정
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">예측변수 1개, 연속형 결과변수 1개</td>
              <td className="py-2 font-medium">
                단순선형회귀
              </td>
            </tr>
            <tr>
              <td className="py-2">
                예측변수 여러 개, 연속형 결과변수 1개
              </td>
              <td className="py-2">다중선형회귀</td>
            </tr>
            <tr>
              <td className="py-2">
                관계의 강도만 파악 (예측 불필요)
              </td>
              <td className="py-2">Pearson / Spearman 상관분석</td>
            </tr>
            <tr>
              <td className="py-2">이분형 결과변수</td>
              <td className="py-2">로지스틱 회귀</td>
            </tr>
            <tr>
              <td className="py-2">비선형 관계</td>
              <td className="py-2">
                다항 회귀 또는 데이터 변환
              </td>
            </tr>
            <tr>
              <td className="py-2">
                집단 평균 비교 (범주형 예측변수)
              </td>
              <td className="py-2">T-검정 또는 분산분석(ANOVA)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>데이터 범위를 벗어난 외삽:</strong> 회귀 방정식은 관측된
          X 값의 범위 내에서만 유효합니다. 이 범위를 크게 벗어난 X 값에 대해
          Y를 예측하는 것(외삽)은 신뢰할 수 없고 오해를 유발하는 결과를 낼 수
          있습니다.
        </li>
        <li>
          <strong>가정 무시:</strong> 회귀 결과는 선형성, 독립성, 정규성,
          등분산성의 가정이 충족될 때만 신뢰할 수 있습니다. 모형을 해석하기
          전에 반드시 잔차 그림을 확인하십시오.
        </li>
        <li>
          <strong>상관과 인과를 혼동:</strong> 유의한 회귀 결과가 X가 Y를
          야기한다는 것을 증명하지는 않습니다. 인과적 표현에 주의하고 교란변수를
          고려하십시오. 인과관계는 무작위 배정 실험만이 확립할 수 있습니다.
        </li>
        <li>
          <strong>R&sup2;의 과대 해석:</strong> 높은 R&sup2;가 반드시 모형이
          정확하거나 유용하다는 것을 의미하지 않습니다. 관계가 여전히 비선형일
          수 있고, 모형이 이상치에 의해 좌우될 수 있습니다. 반대로, 낮은
          R&sup2;가 X가 중요하지 않다는 것을 의미하지도 않습니다.
        </li>
        <li>
          <strong><em>p</em> = .000으로 보고하는 실수:</strong> 통계
          소프트웨어가 간혹 p = .000으로 표시하는 경우가 있습니다. 이는 항상{" "}
          <em>p</em> &lt; .001로 보고해야 합니다. p-값은 절대로 정확히 0이 될
          수 없습니다.
        </li>
      </ul>

      {/* Calculation Accuracy */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 회귀분석 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            lm()
          </code>{" "}
          및{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            summary.lm()
          </code>{" "}
          함수와 대조하여 검증되었습니다. 표준 정규방정식을 사용하여 OLS 회귀를
          계산하고, jstat 라이브러리의 확률 분포를 활용하여 F-통계량, t-통계량,
          신뢰구간을 도출합니다. 모든 결과는 R 출력과 소수점 넷째 자리까지
          일치합니다.
        </p>
      </div>
    </section>
  );
}

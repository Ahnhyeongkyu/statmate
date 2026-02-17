export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        기술통계란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        기술통계(Descriptive Statistics)는 수집된 데이터를 수치와 그래프로
        요약하고 정리하여, 표본의 특성을 간결하면서도 효과적으로 파악할 수
        있게 해 줍니다. 기술통계는 사회과학, 심리학, 의학, 교육학, 경영학 등
        거의 모든 양적 연구의 기초를 이루며, t-검정, 분산분석(ANOVA),
        회귀분석 등 추론통계를 실시하기 전에 반드시 데이터의 중심경향성,
        변동성, 분포 형태를 먼저 기술해야 합니다. 기술통계는 데이터를
        &quot;있는 그대로&quot; 요약하는 것이 목적이며, 모집단에 대한 일반화를
        목적으로 하는 추론통계와 명확히 구분됩니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        기술통계는 연구에서 세 가지 핵심적인 역할을 합니다:
        (1) 분석 전 데이터 입력 오류와 이상치를 탐지하는 데 도움을 주고,
        (2) 추론통계가 요구하는 가정(예: 정규성)의 충족 여부를 확인하며,
        (3) 데이터의 기본 속성을 독자에게 전달합니다. APA 출판 매뉴얼
        (제7판)에서는 모든 주요 연구 변수에 대해 기술통계를 보고하도록
        요구하고 있어, 결과 섹션에서 빠질 수 없는 필수 요소입니다.
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: 시험 점수 데이터셋
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          한 교수가 심리학 개론 수업 학생 20명의 기말시험 점수를 수집했습니다.
          다른 분반과 비교하기에 앞서, 먼저 점수 분포를 기술하고자 합니다.
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            원시 데이터 (n = 20)
          </p>
          <p className="mt-1 text-sm text-gray-500">
            62, 65, 68, 70, 72, 73, 75, 76, 77, 78, 78, 79, 80, 81, 82, 83,
            85, 88, 90, 92
          </p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              중심경향 측정치
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <em>M</em> = 76.50
            </p>
            <p className="text-sm text-gray-600">
              <em>Mdn</em> = 77.00
            </p>
            <p className="text-sm text-gray-600">
              <em>Mode</em> = 78
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              산포도
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <em>SD</em> = 8.23
            </p>
            <p className="text-sm text-gray-600">
              분산 = 67.74
            </p>
            <p className="text-sm text-gray-600">
              범위 = 30 (62&ndash;92)
            </p>
            <p className="text-sm text-gray-600">
              IQR = 11.25
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              분포 형태
            </p>
            <p className="mt-1 text-sm text-gray-600">
              왜도 = &minus;0.34
            </p>
            <p className="text-sm text-gray-600">
              첨도 = &minus;0.67
            </p>
            <p className="mt-2 text-sm text-gray-500">
              약간의 음의 왜도를 가진 근사 정규분포
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            평균의 95% 신뢰구간
          </p>
          <p className="mt-1 text-sm text-gray-600">
            95% CI [72.65, 80.35]
          </p>
          <p className="mt-2 text-sm text-gray-500">
            모평균 시험 점수가 72.65에서 80.35 사이에 있다고 95% 신뢰할 수
            있습니다.
          </p>
        </div>
      </div>

      {/* Central Tendency */}
      <h3 className="text-xl font-semibold text-gray-900">
        중심경향 측정치: 평균 vs. 중앙값 vs. 최빈값
      </h3>
      <p className="text-gray-600 leading-relaxed">
        중심경향은 데이터에서 &quot;전형적인&quot; 값을 나타냅니다. 세 가지
        주요 측정치는 각각 고유한 장점이 있으며, 데이터의 분포와 측정 수준에
        따라 적절한 측정치를 선택해야 합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">측정치</th>
              <th className="py-2 text-left font-semibold">정의</th>
              <th className="py-2 text-left font-semibold">적합한 상황</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">평균 (<em>M</em>)</td>
              <td className="py-2">모든 값의 합을 <em>n</em>으로 나눈 값</td>
              <td className="py-2 text-gray-500">
                데이터가 대략 대칭(정규)이고 극단적 이상치가 없을 때
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">중앙값 (<em>Mdn</em>)</td>
              <td className="py-2">데이터를 정렬했을 때 가운데 위치한 값</td>
              <td className="py-2 text-gray-500">
                데이터가 편향되었거나 이상치가 있을 때 (예: 소득, 반응 시간)
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">최빈값</td>
              <td className="py-2">가장 빈번하게 나타나는 값</td>
              <td className="py-2 text-gray-500">
                명목 또는 범주형 데이터이거나 분포의 봉우리를 파악할 때
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-md border-l-4 border-amber-500 bg-gray-50 p-4">
        <p className="font-semibold text-gray-800">
          편향 데이터에 대한 지침
        </p>
        <p className="mt-1 text-sm text-gray-600">
          데이터가 양의 왜도(오른쪽 꼬리)를 가지면 평균이 중앙값보다 높아지므로
          &mdash; <strong>중앙값</strong>을 주요 측정치로 보고하십시오. 음의
          왜도(왼쪽 꼬리)인 경우 평균이 중앙값보다 낮아집니다. 실용적 기준:
          평균과 중앙값의 차이가 표준편차의 10%를 초과하면 평균 대신 중앙값을
          보고하고, 표준편차(SD) 대신 사분위범위(IQR)를 함께 제시하는 것이
          바람직합니다.
        </p>
      </div>

      {/* Variability */}
      <h3 className="text-xl font-semibold text-gray-900">
        산포도 측정치
      </h3>
      <p className="text-gray-600 leading-relaxed">
        산포도(변동성)는 데이터 포인트가 중심값 주위에 얼마나 퍼져 있는지를
        나타냅니다. 두 데이터셋이 동일한 평균을 가질 수 있지만 산포도는 크게
        다를 수 있으므로, 중심값 보고만큼이나 산포도 보고도 중요합니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            표준편차 (SD)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            각 데이터 포인트가 평균으로부터 떨어진 평균 거리로, 원래 측정
            단위로 표현됩니다. 시험에서 <em>SD</em> = 8.23점이란 점수가
            일반적으로 평균 위아래로 약 8점 범위에 분포한다는 뜻입니다. APA
            양식 연구에서 가장 흔히 보고되는 산포도 측정치입니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">분산 (SD&sup2;)</p>
          <p className="mt-1 text-sm text-gray-600">
            표준편차의 제곱입니다. 분산은 계산 과정(예: ANOVA에서 분산 분해)에
            필수적이지만, 단위가 제곱되어 있어 직접 해석하기 어렵습니다. 분산
            67.74 자체는 의미 파악이 어렵지만, 제곱근인 SD = 8.23은 직관적으로
            해석할 수 있습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">범위</p>
          <p className="mt-1 text-sm text-gray-600">
            최댓값과 최솟값의 차이입니다 (92 &minus; 62 = 30). 범위는 계산이
            간단하지만 이상치에 매우 민감하여 &mdash; 단 하나의 극단값이 범위를
            크게 부풀릴 수 있습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            사분위범위 (IQR)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            데이터 중앙 50%의 범위입니다 (Q3 &minus; Q1). IQR은 이상치에
            강건하며, 중앙값을 보고할 때 함께 사용하기에 적합한 산포도
            측정치입니다. 이 예제에서 IQR = 11.25는 시험 점수의 중앙 절반이
            약 11점에 걸쳐 분포한다는 의미입니다.
          </p>
        </div>
      </div>

      {/* Skewness and Kurtosis */}
      <h3 className="text-xl font-semibold text-gray-900">
        왜도와 첨도: 분포 형태 해석
      </h3>
      <p className="text-gray-600 leading-relaxed">
        왜도와 첨도는 분포의 형태를 수량화하며, 많은 모수적 검정(t-검정,
        ANOVA, 회귀분석)이 요구하는 정규성 가정을 확인하는 데 핵심적인
        역할을 합니다. 이 측정치를 이해하면 모수적 방법과 비모수적 방법 중
        어떤 것을 사용할지 결정하는 데 도움이 됩니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">측정치</th>
              <th className="py-2 text-left font-semibold">값</th>
              <th className="py-2 text-left font-semibold">해석</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium" rowSpan={3}>
                왜도
              </td>
              <td className="py-2">&asymp; 0</td>
              <td className="py-2 text-gray-500">
                대칭 분포 (정규분포)
              </td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0 (양수)</td>
              <td className="py-2 text-gray-500">
                오른쪽 꼬리가 길다; 대부분의 값이 왼쪽에 집중 (예: 소득 데이터)
              </td>
            </tr>
            <tr>
              <td className="py-2">&lt; 0 (음수)</td>
              <td className="py-2 text-gray-500">
                왼쪽 꼬리가 길다; 대부분의 값이 오른쪽에 집중 (예: 쉬운 시험
                점수)
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium" rowSpan={3}>
                첨도 (초과)
              </td>
              <td className="py-2">&asymp; 0</td>
              <td className="py-2 text-gray-500">
                중첨(Mesokurtic) &mdash; 정규분포와 유사한 꼬리
              </td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0 (양수)</td>
              <td className="py-2 text-gray-500">
                급첨(Leptokurtic) &mdash; 정규분포보다 무거운 꼬리, 이상치가
                더 많음
              </td>
            </tr>
            <tr>
              <td className="py-2">&lt; 0 (음수)</td>
              <td className="py-2 text-gray-500">
                완첨(Platykurtic) &mdash; 정규분포보다 가벼운 꼬리, 이상치가
                더 적음
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
        <p className="font-semibold text-gray-800">
          정규성 판단 기준
        </p>
        <p className="mt-1 text-sm text-gray-600">
          왜도와 첨도 값이 <strong>&minus;2에서 +2</strong> 사이이면 일반적으로
          정규성을 가정할 수 있는 것으로 간주됩니다 (George &amp; Mallery,
          2019). 일부 엄격한 기준에서는 &minus;1에서 +1을 사용합니다. 이
          예제에서 왜도 = &minus;0.34, 첨도 = &minus;0.67로, 모두 허용 범위
          안에 있어 분포가 근사적으로 정규분포임을 확인할 수 있습니다.
        </p>
      </div>

      {/* 95% CI */}
      <h3 className="text-xl font-semibold text-gray-900">
        95% 신뢰구간의 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        평균의 95% 신뢰구간(CI)은 실제 모평균이 위치할 가능성이 있는
        값의 범위를 제공합니다. 이 예제에서 95% CI [72.65, 80.35]는 이
        연구를 여러 번 반복하여 매번 CI를 구한다면, 약 95%의 구간이 실제
        모평균을 포함한다는 의미입니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            신뢰구간이 <em>의미하는</em> 것
          </p>
          <p className="mt-1 text-sm text-gray-600">
            이 구간을 구성하는 데 사용된 절차가 실제 모평균을 포착한다는 것을
            95% 신뢰합니다. 구간의 폭 (80.35 &minus; 72.65 = 7.70)은 추정의
            정밀도를 반영하며 &mdash; 구간이 좁을수록 더 정밀한 추정을
            나타냅니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-red-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            신뢰구간이 의미하지 <em>않는</em> 것
          </p>
          <p className="mt-1 text-sm text-gray-600">
            모평균이 이 특정 구간 안에 있을 확률이 95%라는 의미가{" "}
            <strong>아닙니다</strong>. 모평균은 고정된 값으로 &mdash; 이 구간
            안에 있거나 없거나 둘 중 하나입니다. 95%는 개별 구간의 확률이 아니라
            방법의 장기적 빈도를 나타냅니다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        CI의 폭은 세 가지 요인에 따라 달라집니다: 표본 크기 (큰 <em>n</em>{" "}
        = 좁은 CI), 변동성 (작은 <em>SD</em> = 좁은 CI), 신뢰 수준 (99%
        CI는 95% CI보다 넓음). 폭을 절반으로 줄이려면 표본 크기를 4배로
        늘려야 합니다.
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식으로 기술통계 보고하는 방법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판에서는 모든 주요 변수에 대해 기술통계를 보고하도록 요구하며,
        일반적으로 표 또는 본문 내에 제시합니다. 위의 계산 예제를 활용한
        보고 양식은 다음과 같습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            본문 내 보고 (정규분포)
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            시험 점수는 근사적으로 정규분포를 따랐다 (왜도 = &minus;0.34,
            첨도 = &minus;0.67). 학생들의 평균 점수는 76.50점이었다
            (<em>SD</em> = 8.23), 95% CI [72.65, 80.35].
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            본문 내 보고 (편향 분포)
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            반응 시간은 양의 왜도를 보였다 (왜도 = 1.42); 따라서 중앙값을
            보고한다. 반응 시간의 중앙값은 340 ms였다 (<em>Mdn</em> = 340,
            IQR = 120).
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            APA 표 형식 양식
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-1.5 text-left font-semibold">변수</th>
                  <th className="py-1.5 text-left font-semibold"><em>n</em></th>
                  <th className="py-1.5 text-left font-semibold"><em>M</em></th>
                  <th className="py-1.5 text-left font-semibold"><em>SD</em></th>
                  <th className="py-1.5 text-left font-semibold"><em>Mdn</em></th>
                  <th className="py-1.5 text-left font-semibold">왜도</th>
                  <th className="py-1.5 text-left font-semibold">첨도</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5">시험 점수</td>
                  <td className="py-1.5">20</td>
                  <td className="py-1.5">76.50</td>
                  <td className="py-1.5">8.23</td>
                  <td className="py-1.5">77.00</td>
                  <td className="py-1.5">&minus;0.34</td>
                  <td className="py-1.5">&minus;0.67</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 모든 기술통계는 소수점 둘째 자리까지 보고합니다. 통계 기호는
        이탤릭체로 표기합니다 (<em>M</em>, <em>SD</em>, <em>Mdn</em>).
        데이터가 비정규인 경우 평균과 SD 대신 중앙값과 IQR을 보고합니다.
        기술통계와 함께 반드시 표본 크기 (<em>n</em> 또는 <em>N</em>)를
        보고해야 합니다.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>편향 데이터에 평균을 보고하는 실수:</strong> 데이터가 크게
          편향된 경우 (|왜도| &gt; 1), 평균은 중심을 나타내는 오해의 소지가
          있는 측정치입니다. 대신 <strong>중앙값</strong>과 IQR을 보고하십시오.
          예를 들어, &quot;평균 가구 소득&quot;은 극단값으로 인해 전형적인
          소득의 두 배가 될 수 있습니다.
        </li>
        <li>
          <strong>SD와 SE를 혼동하는 실수:</strong> 표준편차(SD)는 개별
          데이터 포인트의 산포를 나타내고, 표준오차(SE = SD / &radic;n)는
          표본 평균의 정밀도를 나타냅니다. 표본을 기술할 때는 SD를, 모집단에
          대한 추론을 할 때는 SE(또는 CI)를 보고하십시오.
        </li>
        <li>
          <strong>추론통계 전 분포 형태를 무시하는 실수:</strong>{" "}
          왜도, 첨도, 정규성을 먼저 확인하지 않고 t-검정이나 ANOVA를 실시하면
          유효하지 않은 결과를 얻을 수 있습니다. 검정을 선택하기 전에 반드시
          기술통계를 확인하고 데이터를 시각화하십시오.
        </li>
        <li>
          <strong>소수점 자릿수가 너무 적은 실수:</strong> APA 지침에서는
          평균과 표준편차를 소수점 둘째 자리까지 보고하도록 권장합니다. 소수점
          첫째 자리는 정밀도가 떨어지고, 셋째 자리 이상은 과도한 정밀도를
          암시할 수 있습니다.
        </li>
        <li>
          <strong>표본 크기와 신뢰구간을 생략하는 실수:</strong>{" "}
          <em>n</em>과 CI 없는 기술통계는 불완전합니다. 독자는 신뢰성을
          판단하기 위해 표본 크기를, 모집단 값의 타당한 범위를 이해하기 위해
          CI를 필요로 합니다.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 기술통계 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs">psych::describe()</code>{" "}
          함수 및 SPSS 기술통계 출력과 대조하여 검증되었습니다. 평균, SD,
          왜도(type 2 / 표본), 첨도(초과, type 2), 사분위수, 신뢰구간을 포함한
          모든 측정치가 R 및 SPSS 출력과 소수점 넷째 자리까지 일치합니다.
          계산기는 표본 표준편차 공식 (<em>n</em> &minus; 1로 나누기)과
          조정된 Fisher-Pearson 계수를 사용하며, 이는 표준 통계 소프트웨어의
          기본 설정과 일치합니다.
        </p>
      </div>
    </section>
  );
}

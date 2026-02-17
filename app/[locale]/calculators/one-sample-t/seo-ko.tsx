export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        일표본 T-검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        일표본 t-검정은 단일 표본의 평균이 알려진 또는 가설에 의한 모집단
        값과 유의하게 다른지를 검정하는 모수적 통계 검정입니다. 두 집단을
        서로 비교하는 독립표본 또는 대응표본 t-검정과 달리, 일표본 t-검정은
        하나의 집단을 고정된 기준값과 비교합니다. 이는 추론통계학에서 가장
        단순하면서도 강력한 도구 중 하나로, 품질관리, 임상연구, 심리학,
        교육 분야에서 자주 사용됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        일표본 T-검정 사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        연속형 측정값으로 구성된 단일 집단이 있고, 그 집단의 평균이 특정
        값과 통계적으로 다른지 검정하고자 할 때 일표본 t-검정을 사용합니다.
        일반적인 사용 시나리오는 다음과 같습니다:
      </p>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>품질관리:</strong> 공장에서 정확히 10g이어야 하는 볼트를
          생산합니다. 30개의 볼트를 표본 추출하여 평균 무게가 10g과 다른지
          검정합니다.
        </li>
        <li>
          <strong>임상연구:</strong> 새로운 약물이 혈압을 목표치인 120mmHg로
          낮출 것으로 예상됩니다. 치료 후 25명의 환자를 측정하여 평균이
          120과 다른지 검정합니다.
        </li>
        <li>
          <strong>교육:</strong> 한 학급이 국가 평균 500점인 표준화 시험을
          봅니다. 해당 학급의 평균 점수가 500과 유의하게 다른지 검정합니다.
        </li>
        <li>
          <strong>심리학:</strong> 척도의 중앙값이 3.0으로 표준화되어
          있습니다. 표본을 조사하여 평균 태도 점수가 3.0에서 벗어나는지
          검정합니다.
        </li>
      </ul>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예시: 학급 평균 검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          한 교사가 자신의 학생 10명이 표준화 수학 시험에서 국가 평균 80점과
          다르게 수행했는지 알고 싶어합니다. 다음과 같은 점수를 기록했습니다:
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            표본 데이터 (n = 10)
          </p>
          <p className="mt-1 text-sm text-gray-500">
            72, 85, 91, 68, 77, 83, 95, 88, 74, 79
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <em>M</em> = 81.20, <em>SD</em> = 8.75, 검정값 = 80
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>t</em>(9) = 0.43, <em>p</em> = .675, <em>d</em> = 0.14,
            95% CI [-5.06, 7.46]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            학급 평균은 국가 평균 80과 유의하게 다르지 않았다. 효과크기는
            무시할 수준(Cohen&apos;s <em>d</em> = 0.14)으로, 모집단
            기준값으로부터 의미 있는 이탈이 없음을 시사한다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        일표본 T-검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        결과를 해석하기 전에 다음 가정이 합리적으로 충족되는지 확인하세요:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. 연속형 종속변수
          </p>
          <p className="mt-1 text-sm text-gray-600">
            측정하는 변수는 등간 또는 비율 척도여야 합니다(예: 무게, 온도,
            시험 점수). 서열형 또는 범주형 데이터는 윌콕슨 부호순위 검정 같은
            비모수적 대안이 필요합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 독립 관측
          </p>
          <p className="mt-1 text-sm text-gray-600">
            각 데이터 포인트는 서로 독립적이어야 합니다. 동일 참여자에 대한
            반복 측정이나 군집이 없어야 합니다. 관측치가 상관되어 있다면,
            대응표본 t-검정이나 혼합효과 모형을 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 근사 정규성
          </p>
          <p className="mt-1 text-sm text-gray-600">
            데이터는 대략적으로 정규분포를 따라야 합니다. 표본크기가
            30을 초과하면 중심극한정리(CLT)에 의해 모집단 분포 형태와 관계없이
            평균의 표집분포가 정규분포를 따릅니다. 소표본의 경우 Shapiro-Wilk
            검정이나 Q-Q 도표로 정규성을 확인하세요. t-검정은 비교적
            견고(robust)하므로 중간 정도의 이탈은 허용됩니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 이상값 없음
          </p>
          <p className="mt-1 text-sm text-gray-600">
            극단적 이상값은 표본 평균을 왜곡하고 t-통계량을 과대 또는
            과소추정할 수 있습니다. 검정 수행 전 상자 도표나 z-점수로
            이상값을 선별하세요. 이상값이 있는 경우 절사(trimming),
            윈저화(winsorizing), 또는 견고한(robust) 대안을 고려하세요.
          </p>
        </div>
      </div>

      {/* How to Report */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 일표본 T-검정 결과 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판 지침에 따라 표본 기술통계량, t-통계량, 자유도, p-값,
        효과크기, 신뢰구간을 보고하세요. 다음은 보고 양식입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            APA 보고 양식 (비유의 결과)
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            표본 평균(<em>M</em> = 81.20, <em>SD</em> = 8.75)을 검정값
            80.00과 비교하기 위해 일표본 t-검정을 실시하였다. 결과는
            통계적으로 유의하지 않았다, <em>t</em>(9) = 0.43, <em>p</em>{" "}
            = .675, <em>d</em> = 0.14, 95% CI [-5.06, 7.46].
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            유의한 결과 예시
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            일표본 t-검정 결과, 참여자의 반응시간(<em>M</em> = 342.50,{" "}
            <em>SD</em> = 28.10)은 모집단 기준 375ms보다 유의하게
            빨랐다, <em>t</em>(39) = -7.31, <em>p</em> &lt; .001,{" "}
            <em>d</em> = 1.16, 95% CI [-41.49, -23.51].
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>t</em>-값은 소수점 둘째 자리까지, <em>p</em>-값은 소수점
        셋째 자리까지 보고하세요(.001 미만이면 <em>p</em> &lt; .001로
        표기). 항상 Cohen&apos;s <em>d</em>와 같은 효과크기 측정치를
        포함하세요.
      </p>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        일표본 검정에서의 Cohen&apos;s d 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        일표본 t-검정에서 Cohen&apos;s <em>d</em>는 표본 평균과 검정값의
        절대 차이를 표본 표준편차로 나누어 계산합니다. 이는 표본 평균이
        가설 값으로부터 몇 표준편차만큼 떨어져 있는지를 수량화하여,
        표본크기에 독립적인 지표를 제공합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">
                Cohen&apos;s <em>d</em>
              </th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">
                실질적 의미
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.2</td>
              <td className="py-2">무시할 수준</td>
              <td className="py-2 text-gray-500">
                표본 평균이 검정값에 매우 가까움
              </td>
            </tr>
            <tr>
              <td className="py-2">0.2</td>
              <td className="py-2">작은 효과</td>
              <td className="py-2 text-gray-500">
                정밀한 측정으로만 탐지 가능한 차이
              </td>
            </tr>
            <tr>
              <td className="py-2">0.5</td>
              <td className="py-2">중간 효과</td>
              <td className="py-2 text-gray-500">
                실질적으로 눈에 띄는 차이
              </td>
            </tr>
            <tr>
              <td className="py-2">0.8+</td>
              <td className="py-2">큰 효과</td>
              <td className="py-2 text-gray-500">
                검정값으로부터 상당한 이탈
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* When to Use Alternatives */}
      <h3 className="text-xl font-semibold text-gray-900">
        일표본 T-검정 vs. 다른 검정
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
              <td className="py-2">
                하나의 표본 평균을 알려진 값과 비교
              </td>
              <td className="py-2 font-medium">일표본 t-검정</td>
            </tr>
            <tr>
              <td className="py-2">두 독립 집단의 평균 비교</td>
              <td className="py-2">독립표본 t-검정</td>
            </tr>
            <tr>
              <td className="py-2">사전/사후 평균 비교 (동일 대상)</td>
              <td className="py-2">대응표본 t-검정</td>
            </tr>
            <tr>
              <td className="py-2">비정규 데이터, 하나의 표본 vs. 값</td>
              <td className="py-2">윌콕슨 부호순위 검정</td>
            </tr>
            <tr>
              <td className="py-2">비율을 알려진 값과 비교</td>
              <td className="py-2">일표본 비율 z-검정</td>
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
          <strong>잘못된 검정값 선택:</strong> 검정값(모집단 평균)은 이론,
          선행 연구, 또는 알려진 기준에서 도출해야 합니다 &mdash; 검정하고 있는
          동일 데이터 세트에서 가져오면 안 됩니다.
        </li>
        <li>
          <strong>소표본에서 비정규성 무시:</strong> 관측치가 30개 미만인
          경우, 편향된 또는 꼬리가 두꺼운 분포는 잘못된 p-값으로 이어질 수
          있습니다. 소표본에서는 반드시 정규성을 확인하세요.
        </li>
        <li>
          <strong><em>p</em> = .000으로 보고:</strong> 통계 소프트웨어가
          가끔 p = .000을 표시합니다. p-값은 절대 정확히 0이 아니므로{" "}
          <em>p</em> &lt; .001로 보고하세요.
        </li>
        <li>
          <strong>효과크기 무시:</strong> 통계적으로 유의한 결과가 실질적으로
          중요한 차이를 의미하지는 않습니다. 항상 p-값과 함께 Cohen&apos;s{" "}
          <em>d</em>를 보고하고 해석하세요.
        </li>
        <li>
          <strong>비유의 결과를 동일성의 증거로 해석:</strong>{" "}
          귀무가설을 기각하지 못하는 것은 표본 평균이 검정값과 같다는 것을
          증명하지 않습니다. 선택한 유의수준에서 차이의 충분한 증거가 없음을
          나타낼 뿐입니다.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 일표본 t-검정 계산은 R(t.test 함수) 및 SPSS 출력과
          대조 검증되었습니다. Student&apos;s t 확률분포에 jstat
          라이브러리를 사용하며, 자유도는 <em>n</em> - 1로 계산합니다.
          95% 신뢰구간은 해당 자유도의 임계 t-값을 사용하여 평균 차이를
          중심으로 구성됩니다. 모든 결과는 R 출력과 소수점 이하 최소
          4자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

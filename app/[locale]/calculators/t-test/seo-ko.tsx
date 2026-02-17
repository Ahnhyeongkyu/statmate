export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        T-검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        T-검정(t-test)은 두 집단의 평균을 비교하여 통계적으로 유의한 차이가
        있는지를 판단하는 통계 검정입니다. 1908년 William Sealy Gosset이
        &quot;Student&quot;라는 필명으로 개발한 t-검정은 사회과학, 심리학,
        의학, 교육 연구에서 가장 많이 사용되는 통계 검정 중 하나입니다.
        t-검정은 간단한 질문에 답합니다: 두 집단 평균의 차이가 실제 효과에
        의한 것인지, 아니면 단순한 우연에 의한 것인지?
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        독립표본 T-검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        독립표본 t-검정은 두 개의 서로 다른 독립 집단의 평균을 비교할 때
        사용합니다. 예를 들어, 실험집단과 통제집단의 시험 점수 비교, 또는
        남녀 직원 간 급여 비교 등이 있습니다. 이 계산기는 기본적으로
        Welch의 t-검정을 사용하며, 이는 등분산 가정이 필요하지 않고 미국
        심리학회(APA)에서 기본 접근법으로 권장하는 방법입니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        대응표본 T-검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        대응표본 t-검정은 동일 집단의 두 시점 평균을 비교할 때(사전검사 vs
        사후검사) 또는 참가자가 주요 변수에서 매칭된 경우에 사용합니다.
        대응표본 t-검정은 측정 간 상관을 고려하므로, 연구 설계가 허용하는
        경우 독립표본 검정보다 더 높은 검정력을 제공합니다. 대표적인 예로는
        중재 전후 연구와 피험자 내 실험 설계가 있습니다.
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          풀이 예제: 독립표본 T-검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          연구자가 새로운 교수법이 시험 점수를 향상시키는지 검증하고자
          합니다. 15명의 학생이 새로운 교수법(실험집단)을, 15명이 전통적
          교수법(통제집단)을 사용했습니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">실험집단 (n=15)</p>
            <p className="mt-1 text-sm text-gray-500">85, 90, 78, 92, 88, 95, 82, 91, 87, 93, 86, 89, 94, 80, 91</p>
            <p className="mt-2 text-sm text-gray-600"><em>M</em> = 88.07, <em>SD</em> = 4.94</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">통제집단 (n=15)</p>
            <p className="mt-1 text-sm text-gray-500">78, 82, 75, 80, 77, 83, 79, 81, 76, 84, 73, 80, 82, 77, 79</p>
            <p className="mt-2 text-sm text-gray-600"><em>M</em> = 79.07, <em>SD</em> = 3.15</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>t</em>(23.47) = 5.87, <em>p</em> &lt; .001, <em>d</em> = 2.15, 95% CI [5.82, 12.18]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            실험집단이 통제집단보다 유의하게 높은 점수를 보였으며, 매우 큰
            효과크기(Cohen&apos;s <em>d</em> = 2.15)를 나타냈습니다.
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        T-검정 vs 다른 검정
      </h3>
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
              <td className="py-2">2개 독립 집단의 평균 비교</td>
              <td className="py-2 font-medium">독립표본 t-검정</td>
            </tr>
            <tr>
              <td className="py-2">사전/사후 점수 비교 (동일 집단)</td>
              <td className="py-2 font-medium">대응표본 t-검정</td>
            </tr>
            <tr>
              <td className="py-2">3개 이상 집단의 평균 비교</td>
              <td className="py-2">일원배치 분산분석(ANOVA)</td>
            </tr>
            <tr>
              <td className="py-2">비정규 데이터, 2개 집단</td>
              <td className="py-2">Mann-Whitney U 검정</td>
            </tr>
            <tr>
              <td className="py-2">비정규 대응 데이터</td>
              <td className="py-2">Wilcoxon 부호순위 검정</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        T-검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        결과를 해석하기 전에 다음 가정들이 충족되는지 확인하세요:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 측정 수준</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 연속형(등간 또는 비율 척도)이어야 합니다. 데이터가
            서열형(예: 리커트 척도)인 경우 비모수 대안을 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 무작위 표본추출</p>
          <p className="mt-1 text-sm text-gray-600">
            데이터는 모집단을 대표하는 무작위로 선택된 표본에서 수집되어야
            합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 정규성</p>
          <p className="mt-1 text-sm text-gray-600">
            각 집단의 데이터는 대략 정규분포를 따라야 합니다. 집단별 표본
            크기가 30 이상이면 중심극한정리에 의해 정규성 위반에 강건합니다.
            소표본의 경우 Shapiro-Wilk 검정으로 정규성을 확인하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 등분산성 (Student&apos;s t의 경우)</p>
          <p className="mt-1 text-sm text-gray-600">
            두 집단의 분산이 대략 동일해야 합니다. StatMate는 기본적으로{" "}
            <strong>Welch의 t-검정</strong>을 사용하므로, 이 가정이 필요하지
            않으며 일반적인 사용에 권장됩니다.
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        Cohen&apos;s d 효과크기 이해하기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>p</em>값은 차이가 통계적으로 유의한지를 알려주는 반면,
        Cohen&apos;s <em>d</em>는 실용적 관점에서 차이가 얼마나 큰지를
        알려줍니다. 이는 큰 표본 크기에서는 작고 무의미한 차이도
        &quot;유의&quot;할 수 있기 때문에 매우 중요합니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">Cohen&apos;s <em>d</em></th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">실용적 의미</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">0.2</td>
              <td className="py-2">작은 효과</td>
              <td className="py-2 text-gray-500">정밀한 측정에서만 감지 가능한 차이</td>
            </tr>
            <tr>
              <td className="py-2">0.5</td>
              <td className="py-2">중간 효과</td>
              <td className="py-2 text-gray-500">육안으로 확인 가능한 차이</td>
            </tr>
            <tr>
              <td className="py-2">0.8</td>
              <td className="py-2">큰 효과</td>
              <td className="py-2 text-gray-500">실질적이고 명백한 차이</td>
            </tr>
            <tr>
              <td className="py-2">1.2+</td>
              <td className="py-2">매우 큰 효과</td>
              <td className="py-2 text-gray-500">매우 강한 효과, 놓치기 어려운 차이</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식으로 T-검정 결과 보고하기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 제7판 지침에 따르면, t-검정 결과에는 t-통계량, 자유도, p값,
        효과크기, 신뢰구간을 포함해야 합니다. 다음은 사용할 수 있는
        템플릿입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">독립표본</p>
          <p className="mt-1 text-sm italic text-gray-600">
            독립표본 t-검정 결과, 실험집단(<em>M</em> = 88.07, <em>SD</em> = 4.94)이
            통제집단(<em>M</em> = 79.07, <em>SD</em> = 3.15)보다 유의하게
            높은 점수를 보였다, <em>t</em>(23.47) = 5.87, <em>p</em> &lt; .001,
            <em>d</em> = 2.15, 95% CI [5.82, 12.18].
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">대응표본</p>
          <p className="mt-1 text-sm italic text-gray-600">
            대응표본 t-검정 결과, 사후검사 점수(<em>M</em> = 82.40,{" "}
            <em>SD</em> = 6.12)가 사전검사 점수(<em>M</em> = 75.60,{" "}
            <em>SD</em> = 7.35)보다 유의하게 높았다, <em>t</em>(24) = 4.32,{" "}
            <em>p</em> &lt; .001, <em>d</em> = 0.86.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>t</em>값과 자유도는 소수점 둘째 자리까지 보고합니다.{" "}
        <em>p</em>값은 소수점 셋째 자리까지 보고하되, .001 미만인 경우{" "}
        <em>p</em> &lt; .001로 표기합니다. 항상 효과크기 측정치를
        포함하세요.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong><em>p</em> = .000 보고:</strong> 통계 소프트웨어가 때때로
          p = .000으로 표시하지만, <em>p</em> &lt; .001로 보고해야 합니다.
          p값은 절대로 정확히 0이 될 수 없습니다.
        </li>
        <li>
          <strong>효과크기 무시:</strong> 통계적으로 유의한 결과라도{" "}
          <em>d</em> = 0.1이면 실용적으로 의미가 없을 수 있습니다. 항상
          효과크기를 보고하고 해석하세요.
        </li>
        <li>
          <strong>3개 이상 집단에 t-검정 사용:</strong> 3개 이상의 집단이
          있는 경우 ANOVA를 사용하세요. 다중 t-검정은 제1종 오류율을
          증가시킵니다.
        </li>
        <li>
          <strong>등분산 가정:</strong> 등분산을 가정할 강한 근거가 없다면,
          Welch의 t-검정(StatMate의 기본값)을 사용하세요.
        </li>
        <li>
          <strong>통계적 유의성과 실용적 중요성의 혼동:</strong>{" "}
          <em>p</em> &lt; .05 결과가 자동으로 해당 발견이 중요하거나
          임상적으로 유관하다는 것을 의미하지는 않습니다.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 t-검정 계산은 R의 t.test() 함수와 SPSS 출력 결과에
          대해 검증되었습니다. 확률분포 계산에 jstat 라이브러리를 사용하며,
          Welch-Satterthwaite 자유도 근사와 함께 Welch의 t-검정을
          구현합니다. 모든 결과는 R 출력과 소수점 4자리 이상 일치합니다.
        </p>
      </div>
    </section>
  );
}

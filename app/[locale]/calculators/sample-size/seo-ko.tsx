export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        표본크기 계산이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        표본크기 계산(검정력 분석, power analysis)은 연구에서 의미 있는 효과를
        탐지하기 위해 필요한 최소 참여자 수를 결정하는 과정입니다. 이는 연구
        계획의 필수 단계로, 참여자가 너무 적으면 실제 효과를 놓칠 위험이
        있고(제2종 오류), 너무 많으면 시간과 자원을 낭비하게 됩니다. 대부분의
        IRB(기관생명윤리위원회)와 연구비 지원 기관은 연구 계획서의 일부로 공식적인
        검정력 분석을 요구합니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        검정력 분석의 4가지 구성요소
      </h3>
      <p className="text-gray-600 leading-relaxed">
        모든 검정력 분석은 네 가지 상호 연관된 매개변수를 포함합니다. 세 가지를
        알면 나머지 하나를 구할 수 있습니다. 실제로 연구자들은 유의수준, 검정력,
        효과크기를 고정하고 표본크기(N)를 구하는 경우가 가장 많습니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. 효과크기 (d, f, r, 또는 w)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            탐지하고자 하는 효과의 예상 크기입니다. 효과가 클수록 더 적은
            참여자가 필요합니다. t-검정에는 Cohen&apos;s d, ANOVA에는
            Cohen&apos;s f, 상관분석에는 r, 카이제곱 검정에는 Cohen&apos;s w를
            사용합니다. 예상 효과크기를 모르는 경우 관례적 기준(소, 중, 대)을
            활용하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 유의수준 (&alpha;)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            제1종 오류의 확률 &mdash; 귀무가설이 실제로 참일 때 이를
            기각할 확률(거짓 양성)입니다. 관례적 수준은 &alpha; = .05이며, 이는
            유의하다고 잘못 선언할 확률이 5%임을 의미합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 통계적 검정력 (1 - &beta;)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            실제 효과를 올바르게 탐지할 확률 &mdash; 제2종 오류(거짓
            음성)를 피할 확률입니다. 관례적 최솟값은 .80(80%)이며, 이는 효과가
            실제로 존재할 때 이를 발견할 확률이 80%임을 의미합니다. 일부
            분야에서는 .90 이상을 권장합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 표본크기 (N)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            필요한 총 참여자 수입니다. 일반적으로 이것이 구하고자 하는
            미지수입니다. 참여자가 많을수록 검정력은 높아지지만, 비용과 시간도
            증가합니다.
          </p>
        </div>
      </div>

      {/* Effect Size Conventions */}
      <h3 className="text-xl font-semibold text-gray-900">
        검정 유형별 효과크기 기준표
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Jacob Cohen(1988)은 소, 중, 대 효과크기에 대한 널리 사용되는 기준을
        확립했습니다. 사전 연구나 파일럿 데이터가 없어 예상 효과를 추정하기
        어려울 때 이 기준을 활용하세요.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">검정</th>
              <th className="py-2 text-left font-semibold">측정치</th>
              <th className="py-2 text-center font-semibold">소(Small)</th>
              <th className="py-2 text-center font-semibold">중(Medium)</th>
              <th className="py-2 text-center font-semibold">대(Large)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">T-검정</td>
              <td className="py-2">Cohen&apos;s <em>d</em></td>
              <td className="py-2 text-center">0.20</td>
              <td className="py-2 text-center">0.50</td>
              <td className="py-2 text-center">0.80</td>
            </tr>
            <tr>
              <td className="py-2">ANOVA</td>
              <td className="py-2">Cohen&apos;s <em>f</em></td>
              <td className="py-2 text-center">0.10</td>
              <td className="py-2 text-center">0.25</td>
              <td className="py-2 text-center">0.40</td>
            </tr>
            <tr>
              <td className="py-2">상관분석(Correlation)</td>
              <td className="py-2"><em>r</em></td>
              <td className="py-2 text-center">0.10</td>
              <td className="py-2 text-center">0.30</td>
              <td className="py-2 text-center">0.50</td>
            </tr>
            <tr>
              <td className="py-2">카이제곱(Chi-square)</td>
              <td className="py-2">Cohen&apos;s <em>w</em></td>
              <td className="py-2 text-center">0.10</td>
              <td className="py-2 text-center">0.30</td>
              <td className="py-2 text-center">0.50</td>
            </tr>
            <tr>
              <td className="py-2">비율검정(Proportions)</td>
              <td className="py-2">Cohen&apos;s <em>h</em></td>
              <td className="py-2 text-center">0.20</td>
              <td className="py-2 text-center">0.50</td>
              <td className="py-2 text-center">0.80</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예시: 독립표본 T-검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          한 연구자가 두 가지 교수법의 시험 점수를 비교하려 합니다. 선행
          연구를 바탕으로 중간 수준의 효과크기(Cohen&apos;s <em>d</em> = 0.50)를
          예상합니다. &alpha; = .05, 검정력 = .80으로 설정합니다.
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">매개변수</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>검정: 독립표본 t-검정 (양측검정)</li>
            <li>효과크기: <em>d</em> = 0.50 (중간)</li>
            <li>유의수준: &alpha; = .05</li>
            <li>검정력: 1 - &beta; = .80</li>
          </ul>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            필요 표본크기: <strong>N = 128</strong> (그룹당 64명)
          </p>
          <p className="mt-2 text-sm italic text-gray-600">
            독립표본 t-검정을 위한 검정력 분석을 효과크기 <em>d</em> = 0.50,
            &alpha; = .05, 검정력 = .80의 조건으로 수행하였다. 필요 표본크기는
            <em>N</em> = 128(그룹당 64명)이다.
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        검정력 분석 시기
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>데이터 수집 전:</strong> 사전(a priori) 검정력 분석이 가장
          일반적이고 중요한 용도입니다. 모집해야 할 참여자 수를 결정합니다.
        </li>
        <li>
          <strong>연구비 신청:</strong> 연구비 지원 기관은 계획된 표본크기에 대한
          근거를 요구합니다. 검정력 분석이 이 근거를 제공합니다.
        </li>
        <li>
          <strong>IRB 신청:</strong> 윤리심의위원회는 필요 이상으로 많은
          참여자를 모집하거나(자원 낭비) 너무 적게 모집하는(연구의 무의미화)
          것을 방지하고자 합니다.
        </li>
        <li>
          <strong>학위논문 제안서:</strong> 대부분의 심사위원회는 방법론 섹션에
          공식적인 검정력 분석을 기대합니다.
        </li>
      </ul>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        검정력 분석의 흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>N을 줄이기 위해 큰 효과크기 사용:</strong> 더 작은 표본을 얻기
          위해 예상 효과크기를 부풀리지 마세요. 파일럿 데이터나 출판된
          문헌에서 현실적인 추정치를 사용하세요.
        </li>
        <li>
          <strong>탈락률 무시:</strong> 계산된 N은 분석을 위한 최솟값입니다.
          20%의 탈락이 예상된다면, 계산된 N보다 20% 더 많이 모집하세요.
        </li>
        <li>
          <strong>사후 검정력 분석:</strong> 데이터 수집 후 관찰된 효과크기로
          검정력을 계산하는 것은 순환적이며 정보가 없습니다. 검정력 분석은
          반드시 사전에 수행해야 합니다.
        </li>
        <li>
          <strong>잘못된 검정 유형:</strong> 검정력 분석이 사용하려는 통계
          검정과 일치하는지 확인하세요. t-검정에 대한 검정력 분석은 ANOVA에
          적용되지 않습니다.
        </li>
        <li>
          <strong>단측검정 vs. 양측검정:</strong> 이 계산기는 기본적으로
          양측검정을 사용합니다. 단측검정은 더 적은 참여자가 필요하지만,
          효과의 방향이 사전에 알려진 경우에만 적절합니다.
        </li>
      </ul>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 검정력 분석 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        검정력 분석은 논문의 참여자 또는 방법 섹션에 포함하세요. 검정 유형,
        효과크기, 유의수준, 목표 검정력, 그리고 결과 표본크기를 명시합니다.
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">T-검정 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            독립표본 t-검정에 대한 사전 검정력 분석을 StatMate를 사용하여
            수행하였다(Cohen&apos;s <em>d</em> = 0.50, &alpha; = .05, 검정력
            = .80). 필요 최소 표본크기는 <em>N</em> = 128(그룹당 64명)으로
            결정되었다.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">ANOVA 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            4개 집단의 일원배치 분산분석에 대한 검정력 분석을 Cohen&apos;s
            <em>f</em> = 0.25(중간 효과), &alpha; = .05, 검정력 = .80의
            조건으로 수행하였다. 필요 최소 표본크기는 <em>N</em> = 180(그룹당
            45명)이었다.
          </p>
        </div>
      </div>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 방법
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 표본크기 계산은 jStat 라이브러리의 정확한 z-점수를
          사용하는 표준정규 근사법을 적용합니다. t-검정의 경우 공식은{" "}
          <em>n</em> = (z<sub>&alpha;/2</sub> +
          z<sub>&beta;</sub>)<sup>2</sup> &times; 2 / <em>d</em><sup>2</sup>
          입니다. 달성 검정력(achieved power)은 계산된 표본크기를 사용하여
          역산합니다. 결과는 G*Power 및 R의 pwr 패키지와 대조 검증되었습니다.
        </p>
      </div>
    </section>
  );
}

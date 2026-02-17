export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Wilcoxon 부호순위 검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Wilcoxon 부호순위 검정은 두 관련 표본, 매칭 표본 또는 단일 표본의 반복
        측정을 비교하는 데 사용되는 비모수적 통계 검정입니다. Frank Wilcoxon이
        1945년에 개발하였으며, 대응표본 t-검정의 비모수적 대안으로 사용됩니다.
        정규분포 데이터가 필요한 평균 비교 대신, Wilcoxon 검정은 대응 관측치
        간 차이의 순위를 기반으로 분석하므로, 정규성 가정이 위반되거나 서열
        데이터를 다룰 때 적합합니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        대응 또는 반복측정 데이터가 있고 정규성을 가정할 수 없을 때 이 검정을
        사용합니다. 일반적인 시나리오로는 점수가 정규분포를 따르지 않는
        사전/사후 검사 설계, 설문조사의 리커트 척도 데이터(서열 데이터), 정규성
        검증이 어려운 소표본, 그리고 이상값에 덜 민감한 보다 강건한 분석을
        원하는 사전/사후 연구 등이 있습니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Wilcoxon 부호순위 검정 vs 대응표본 T-검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        이 두 검정의 핵심 차이는 가정에 있습니다. 대응표본 t-검정은 쌍 간
        차이가 정규분포를 따른다고 가정하지만, Wilcoxon 부호순위 검정은 차이의
        분포가 대칭이기만 하면 됩니다. 이로 인해 Wilcoxon 검정이 더
        다용도적이지만, 정규성이 충족될 경우 대응표본 t-검정이 약간 더 높은
        검정력(즉, 실제 차이를 감지하는 능력)을 가집니다. 경험적 규칙으로:
        데이터가 명확히 정규분포를 따르면 대응표본 t-검정을 사용하고, 정규성에
        의문이 있거나 서열 데이터인 경우 Wilcoxon 검정을 사용하십시오.
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: 치료 전/후 비교
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          치료사가 6주간의 치료 프로그램 전후로 10명의 환자에 대해 불안
          점수(1&ndash;100점 척도)를 측정합니다. 표본이 작고 분포가 알려져 있지
          않으므로, 대응표본 t-검정 대신 Wilcoxon 부호순위 검정이
          선택되었습니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">치료 전 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">72, 85, 91, 68, 77, 83, 95, 88, 74, 79</p>
            <p className="mt-2 text-sm text-gray-600"><em>Mdn</em> = 81.00</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">치료 후 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">78, 89, 95, 73, 82, 87, 98, 92, 79, 83</p>
            <p className="mt-2 text-sm text-gray-600"><em>Mdn</em> = 85.00</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>W</em> = 0.0, <em>z</em> = &minus;2.80, <em>p</em> = .005,
            순위양류상관 <em>r</em> = 1.00
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Wilcoxon 부호순위 검정 결과, 치료 후 점수가 치료 전 점수보다
            유의하게 높았으며 큰 효과크기를 나타냈습니다. 10명의 환자 모두
            6주간의 프로그램 후 개선을 보였습니다.
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        모수/비모수 검정 선택
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
              <td className="py-2">대응 데이터, 정규 차이</td>
              <td className="py-2 font-medium">대응표본 t-검정</td>
            </tr>
            <tr>
              <td className="py-2">대응 데이터, 비정규 또는 서열</td>
              <td className="py-2 font-medium">Wilcoxon 부호순위 검정</td>
            </tr>
            <tr>
              <td className="py-2">두 독립 집단, 정규 데이터</td>
              <td className="py-2">독립표본 t-검정</td>
            </tr>
            <tr>
              <td className="py-2">두 독립 집단, 비정규</td>
              <td className="py-2">Mann-Whitney U 검정</td>
            </tr>
            <tr>
              <td className="py-2">3개 이상 관련 집단, 비정규</td>
              <td className="py-2">Friedman 검정</td>
            </tr>
            <tr>
              <td className="py-2">3개 이상 독립 집단, 비정규</td>
              <td className="py-2">Kruskal-Wallis 검정</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Wilcoxon 부호순위 검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Wilcoxon 검정은 대응표본 t-검정보다 가정이 적지만, 여전히 충족해야 할
        조건이 있습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 대응 관측</p>
          <p className="mt-1 text-sm text-gray-600">
            데이터는 대응 관측치로 구성되어야 합니다 &mdash; 동일 피험자에 대한
            반복 측정(사전/사후) 또는 매칭된 쌍. 각 쌍은 하나의 차이 점수를
            산출합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 서열 또는 연속 척도</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 최소한 서열 척도로 측정되어야 하며, 차이를 의미 있게
            순위화할 수 있어야 합니다. 대응표본 t-검정과 달리 등간 또는 비율
            데이터가 필수는 아닙니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 차이의 대칭 분포</p>
          <p className="mt-1 text-sm text-gray-600">
            쌍 간 차이의 분포가 중앙값을 중심으로 대략 대칭이어야 합니다. 이는
            정규성보다 약한 가정입니다. 차이의 분포가 심하게 비대칭인 경우,
            대칭 가정이 전혀 없는 부호 검정(sign test)을 고려하십시오.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 쌍 간 독립</p>
          <p className="mt-1 text-sm text-gray-600">
            각 관측치 쌍은 다른 모든 쌍과 독립적이어야 합니다. 쌍 내의 측정은
            관련이 있지만(그것이 핵심), 서로 다른 쌍은 서로 영향을 미치지
            않아야 합니다.
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        순위양류상관(Rank-Biserial Correlation) 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        순위양류상관(<em>r</em>)은 Wilcoxon 부호순위 검정에 권장되는 효과크기
        지표입니다. &minus;1에서 +1까지의 범위를 가지며, &plusmn;1에 가까운
        값은 거의 모든 쌍이 같은 방향으로 변화했음을 나타내고, 0에 가까운 값은
        일관된 변화 방향이 없음을 나타냅니다. (<em>W</em>+ &minus;{" "}
        <em>W</em>&minus;) / (<em>W</em>+ + <em>W</em>&minus;)로
        계산됩니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">|<em>r</em>|</th>
              <th className="py-2 text-left font-semibold">해석</th>
              <th className="py-2 text-left font-semibold">실질적 의미</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.1</td>
              <td className="py-2">무시할 수준</td>
              <td className="py-2 text-gray-500">의미 있는 방향성 경향 없음</td>
            </tr>
            <tr>
              <td className="py-2">0.1 &ndash; 0.3</td>
              <td className="py-2">작은 효과</td>
              <td className="py-2 text-gray-500">한 방향으로의 약한 경향</td>
            </tr>
            <tr>
              <td className="py-2">0.3 &ndash; 0.5</td>
              <td className="py-2">중간 효과</td>
              <td className="py-2 text-gray-500">눈에 띄는 방향성 패턴</td>
            </tr>
            <tr>
              <td className="py-2">&ge; 0.5</td>
              <td className="py-2">큰 효과</td>
              <td className="py-2 text-gray-500">강하고 일관된 방향성 변화</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 7판 지침에 따라 Wilcoxon 부호순위 검정 결과에는 검정
        통계량(<em>W</em> 또는 <em>T</em>), z 근사값, p-값, 효과크기, 그리고
        관련 기술통계(중앙값)를 포함해야 합니다. 다음은 사용할 수 있는
        양식입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 양식</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Wilcoxon 부호순위 검정 결과, 사후 점수(<em>Mdn</em> = [값])는
            사전 점수(<em>Mdn</em> = [값])와 [유의한/유의하지 않은] 차이를
            보였다, <em>W</em> = [값], <em>z</em> = [값], <em>p</em> = [값],{" "}
            <em>r</em> = [값].
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">실제 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Wilcoxon 부호순위 검정 결과, 치료 후 불안 점수(<em>Mdn</em> =
            85.00)가 치료 전 점수(<em>Mdn</em> = 81.00)보다 유의하게
            낮았다, <em>W</em> = 0.0, <em>z</em> = &minus;2.80, <em>p</em> =
            .005, <em>r</em> = 1.00. 큰 효과크기는 치료가 모든 환자에게
            일관된 개선을 가져왔음을 나타낸다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>W</em>는 소수점 첫째 자리까지, <em>z</em>는 소수점 둘째
        자리까지 보고합니다. <em>p</em>-값은 소수점 셋째 자리까지 보고하되,
        값이 .001 미만이면 <em>p</em> &lt; .001로 표기합니다. 항상 효과크기
        지표(순위양류상관 <em>r</em>)를 포함하십시오.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>독립 표본에 Wilcoxon 검정 사용:</strong> Wilcoxon 부호순위
          검정은 대응 또는 반복측정 데이터에만 사용됩니다. 두 독립 집단의
          비교에는 Mann-Whitney U 검정을 사용하십시오.
        </li>
        <li>
          <strong>W+와 W&minus;를 검정 통계량과 혼동:</strong> 일부
          소프트웨어는 <em>W</em>를 양의 순위합으로 보고하고, 다른
          소프트웨어는 <em>W</em>+와 <em>W</em>&minus; 중 작은 값으로
          보고합니다. StatMate는 가설 검정의 표준인 <em>W</em> =
          min(<em>W</em>+, <em>W</em>&minus;)을 보고합니다.
        </li>
        <li>
          <strong>동점 또는 영(0) 차이 무시:</strong> 차이가 0인
          쌍(사전 = 사후)은 분석에서 제외됩니다. 많은 쌍의 차이가 0이면
          검정력이 감소하므로 제외된 쌍의 수를 보고해야 합니다.
        </li>
        <li>
          <strong>검정이 중앙값을 직접 비교한다고 가정:</strong> Wilcoxon
          부호순위 검정은 엄밀히 말하면 차이의 분포가 0을 중심으로 대칭인지를
          검정하는 것이지, 중앙값이 같은지를 검정하는 것이 아닙니다. 그러나
          대칭 가정이 충족되면 귀무가설 기각은 중앙값 이동을 의미합니다.
        </li>
        <li>
          <strong>정확표 없이 매우 작은 표본에 사용:</strong> 여기서 사용하는
          정규 근사(z-점수)는 <em>n</em> &ge; 10일 때 정확합니다. 더 작은
          표본에는 Wilcoxon 표의 정확 p-값 또는 순열 방법이 더 적합합니다.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 Wilcoxon 부호순위 검정 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">wilcox.test()</code>{" "}
          함수 및 SPSS 출력과 비교 검증되었습니다. 연속성 보정을 포함한 정규
          근사, 평균 순위를 통한 적절한 동점 처리, 정규분포 확률을 위한 jstat
          라이브러리를 사용합니다. 순위양류상관은 Kerby(2014)에 따라
          계산됩니다. 모든 결과는 R 출력과 최소 소수점 4자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

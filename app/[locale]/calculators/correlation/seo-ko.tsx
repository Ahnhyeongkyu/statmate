export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      {/* 1. What is Correlation */}
      <h2 className="text-2xl font-bold text-gray-900">
        상관분석이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        상관분석은 두 변수 간 관계의 강도와 방향을 정량화하는 통계적 측정
        방법입니다. 상관계수는 -1(완벽한 음의 관계)에서 +1(완벽한 양의
        관계)까지의 범위를 가지며, 0은 선형 관계가 없음을 나타냅니다.
        상관분석은 심리학, 교육학, 의학, 경제학, 사회과학에서 가장 널리
        사용되는 기법 중 하나입니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        상관의 개념은 <strong>Sir Francis Galton</strong>이 1880년대에 유전과
        평균으로의 회귀에 대한 연구에서 개척했습니다. 그의 연구는{" "}
        <strong>Karl Pearson</strong>에 의해 체계화되었으며, 1896년에 오늘날까지
        사용되는 수학적 기반인 적률상관계수(Pearson의 <em>r</em>)를
        개발했습니다. 1904년에는 <strong>Charles Spearman</strong>이 서열 데이터와
        단조 관계를 위한 비모수적 대안인 순위상관계수(Spearman의{" "}
        <em>rho</em>)를 도입했습니다. 이 두 측정치가 현대 이변량 상관분석의
        근간을 이루고 있습니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Pearson 상관 (r)
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Pearson의 <em>r</em>은 두 연속형 변수 간의 <strong>선형</strong> 관계의
        강도를 측정합니다. 두 변수의 공분산을 각 표준편차의 곱으로 나누어
        계산됩니다. 두 변수가 모두 등간 또는 비율 척도로 측정되고, 관계가
        대략 선형이며, 데이터가 대략 정규분포를 따를 때 Pearson을 사용합니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Spearman 상관 (rho)
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Spearman의 <em>rho</em>(<em>r<sub>s</sub></em>)는 원시 값 대신 순위를
        사용하여 두 변수 간의 <strong>단조</strong> 관계를 평가하는 비모수적
        측정치입니다. 데이터가 서열형(예: 리커트 척도)이거나, 관계가 단조적이지만
        반드시 선형이 아닌 경우, 또는 이상값이 우려되는 경우 Spearman을
        사용합니다. 순위를 기반으로 하기 때문에 Spearman의 rho는 Pearson의{" "}
        <em>r</em>보다 극단값에 더 강건합니다.
      </p>

      {/* 2. Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예시: 학습 시간 vs. 시험 점수
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          심리학 교수가 주간 학습 시간이 시험 성적을 예측하는지 알아보기 위해
          10명의 학생 데이터를 수집했습니다. 각 학생은 평균 주간 학습 시간을
          보고하고, 기말시험 점수(100점 만점)가 기록되었습니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              학습 시간 (X)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              2, 4, 6, 8, 10, 12, 14, 16, 18, 20
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 11.00, <em>SD</em> = 6.06
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              시험 점수 (Y)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              52, 58, 61, 68, 72, 78, 81, 85, 90, 95
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 74.00, <em>SD</em> = 14.23
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            산점도 설명
          </p>
          <p className="mt-1 text-sm text-gray-600">
            10개의 데이터 포인트를 그래프에 표시하면 뚜렷한 상승 추세를 볼 수
            있습니다: 학습 시간이 2시간에서 20시간으로 증가함에 따라 시험
            점수가 52점에서 95점으로 상승합니다. 데이터 포인트들은 상향
            회귀선 주위에 밀집되어 있어, 산포가 적은 강한 양의 선형 관계를
            나타냅니다.
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>r</em>(8) = .85, <em>p</em> &lt; .001, 95% CI [.50, .96]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            주간 학습 시간과 시험 점수 간에 강한 양의 상관이 나타났습니다.
            주당 더 많은 시간을 공부한 학생들이 기말시험에서 상당히 높은
            점수를 받는 경향을 보였습니다. 결정계수(<em>r</em><sup>2</sup>{" "}
            = .72)는 학습 시간이 시험 점수 분산의 약 72%를 설명함을
            나타냅니다.
          </p>
        </div>
      </div>

      {/* 3. Pearson vs Spearman Comparison */}
      <h3 className="text-xl font-semibold text-gray-900">
        상관계수 vs 다른 검정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        올바른 상관 방법을 선택하는 것은 데이터 유형, 분포, 그리고 예상되는
        관계의 성격에 따라 달라집니다. 다음은 결정을 돕기 위한 나란히 놓은
        비교표입니다:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">Pearson <em>r</em></th>
              <th className="py-2 text-left font-semibold">Spearman <em>r<sub>s</sub></em></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium text-gray-700">유형</td>
              <td className="py-2">모수적</td>
              <td className="py-2">비모수적</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">데이터 수준</td>
              <td className="py-2">등간 / 비율</td>
              <td className="py-2">서열 / 등간 / 비율</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">탐지 관계</td>
              <td className="py-2">선형만</td>
              <td className="py-2">모든 단조 관계</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">정규성 필요</td>
              <td className="py-2">예 (이변량 정규성)</td>
              <td className="py-2">아니오</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">이상값 민감도</td>
              <td className="py-2">예, 매우 민감</td>
              <td className="py-2">더 강건</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">적합한 경우</td>
              <td className="py-2">연속형, 정규분포 데이터</td>
              <td className="py-2">순위 데이터, 비정규 분포, 서열 척도</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">사용 예시</td>
              <td className="py-2">키 vs. 체중</td>
              <td className="py-2">고객 만족도(1-5) vs. 재구매 빈도</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Interpreting Correlation Strength */}
      <h3 className="text-xl font-semibold text-gray-900">
        상관 강도 해석
      </h3>
      <p className="text-gray-600 leading-relaxed">
        상관계수의 절대값은 관계의 강도를 나타냅니다. 맥락이 중요하고 분야마다
        기준이 다르지만, 다음 가이드라인(Evans, 1996 기반)은 일반적인 틀을
        제공합니다:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">|<em>r</em>| 값</th>
              <th className="py-2 text-left font-semibold">강도</th>
              <th className="py-2 text-left font-semibold">해석</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">.00 &ndash; .19</td>
              <td className="py-2 font-medium">무시할 수준</td>
              <td className="py-2 text-gray-500">무시할 만한 관계; 실질적 예측 가치 없음</td>
            </tr>
            <tr>
              <td className="py-2">.20 &ndash; .39</td>
              <td className="py-2 font-medium">약한</td>
              <td className="py-2 text-gray-500">작지만 잠재적으로 의미 있는 관계</td>
            </tr>
            <tr>
              <td className="py-2">.40 &ndash; .59</td>
              <td className="py-2 font-medium">보통</td>
              <td className="py-2 text-gray-500">눈에 띄는 관계로 의미 있는 예측력 보유</td>
            </tr>
            <tr>
              <td className="py-2">.60 &ndash; .79</td>
              <td className="py-2 font-medium">강한</td>
              <td className="py-2 text-gray-500">실질적인 관계; 좋은 예측 정확도</td>
            </tr>
            <tr>
              <td className="py-2">.80 &ndash; 1.00</td>
              <td className="py-2 font-medium">매우 강한</td>
              <td className="py-2 text-gray-500">거의 완벽한 관계; 우수한 예측 정확도</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        참고: 이 기준은 양의 상관과 음의 상관 모두에 동일하게 적용됩니다.{" "}
        <em>r</em> = -.85는 <em>r</em> = +.85와 동일한 강도이며, 방향만
        다릅니다.
      </p>

      {/* 5. Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        상관분석의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        상관 결과를 해석하기 전에 다음 가정들이 충족되었는지 확인하세요:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 연속형 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            Pearson의 <em>r</em>을 사용하려면 두 변수 모두 연속 척도(등간 또는
            비율)로 측정되어야 합니다. 어느 한 변수라도 서열형(예: 리커트형
            평정, 석차)인 경우, 순위를 기반으로 하며 연속형 측정을 필요로 하지
            않는 Spearman의 rho를 사용하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 선형성</p>
          <p className="mt-1 text-sm text-gray-600">
            Pearson의 <em>r</em>은 두 변수 간 선형 관계를 가정합니다. 항상
            먼저 산점도를 확인하세요. 관계가 곡선형(예: U자형 또는 로그형)인
            경우, Pearson의 <em>r</em>은 실제 연관성의 강도를 과소평가합니다.
            이러한 경우 Spearman의 rho나 비선형 변환을 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 이변량 정규성{" "}
            <span className="text-xs font-normal text-gray-500">(Pearson만 해당)</span>
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Pearson의 <em>r</em>은 두 변수 모두 대략 정규분포를 따른다고
            가정합니다. 이 가정은 주로 유의성 검정과 신뢰구간에 중요합니다.
            표본 크기가 30 이상이면 중간 정도의 위반에도 검정은 상당히
            강건합니다. 비정규 데이터의 경우 Spearman의 rho를 대신
            사용하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 이상값 없음</p>
          <p className="mt-1 text-sm text-gray-600">
            이상값은 Pearson의 <em>r</em>을 극적으로 높이거나 낮출 수 있습니다.
            단 하나의 극단적 데이터 포인트가 상관을 거의 0에서 강한 수준으로
            (또는 그 반대로) 이동시킬 수 있습니다. 항상 산점도로 데이터를
            시각화하여 이상값을 확인하세요. 이상값이 있는 경우, 근거를 들어
            제거하거나 Spearman의 rho로 전환하는 것을 고려하세요.
          </p>
        </div>
      </div>

      {/* 6. Correlation != Causation */}
      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          상관은 인과가 아니다
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          통계학에서 가장 중요한 원칙 중 하나는{" "}
          <strong>상관이 인과를 의미하지 않는다</strong>는 것입니다. 두 변수 간의
          강한 상관은 그들이 함께 변하는 경향이 있음을 의미하지만, 한 변수가
          다른 변수의 변화를 야기한다는 것을 증명하지는 않습니다.
        </p>
        <p className="mt-3 text-gray-600 leading-relaxed">
          관측된 상관에 대해 세 가지 가능한 설명이 있습니다:
        </p>
        <ul className="mt-2 ml-4 list-disc space-y-1 text-gray-600">
          <li>
            <strong>직접 인과:</strong> X가 실제로 Y를 야기합니다 (또는 Y가 X를
            야기합니다).
          </li>
          <li>
            <strong>역인과:</strong> 인과의 방향이 당신이 가정한 것과
            반대입니다.
          </li>
          <li>
            <strong>제3변수 (혼입변수):</strong> 측정되지 않은 변수 Z가 X와 Y
            모두를 야기하여 가짜 상관을 만듭니다.
          </li>
        </ul>
        <p className="mt-3 text-gray-600 leading-relaxed">
          <strong>고전적 예시:</strong> 아이스크림 판매량과 익사 사망 건수는 강한
          양의 상관관계가 있습니다. 아이스크림이 익사를 유발할까요? 물론
          아닙니다. 혼입변수는 <em>기온</em>입니다&mdash;더운 날씨가 아이스크림
          소비와 수영 활동을 모두 증가시켜 익사 사고가 더 많아집니다. 기온을
          통제하지 않으면 아이스크림과 익사 간에 인과 관계가 있다고 잘못된
          결론을 내리게 됩니다.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          인과 관계를 확립하려면 무작위 배정을 포함한 잘 설계된 실험 연구나
          도구변수, 회귀불연속설계, 이중차분법 등의 고급 기법이 필요합니다.
        </p>
      </div>

      {/* 7. APA Reporting Templates */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA 7판 지침에 따르면, 상관 결과 보고에는 상관계수, 자유도(N - 2),
        p-값, 그리고 가능하면 95% 신뢰구간이 포함되어야 합니다. 다음은 실제
        수치가 포함된 템플릿입니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            Pearson 상관
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            주간 학습 시간과 시험 점수 간의 관계를 평가하기 위해 Pearson
            상관분석을 실시하였다. 두 변수 간에 강한 양의 상관이 나타났다,{" "}
            <em>r</em>(8) = .85, <em>p</em> &lt; .001, 95% CI [.50, .96].
            주당 더 많은 시간을 공부한 학생들이 더 높은 시험 점수를 받는
            경향이 있었다.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            Spearman 상관
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            고객 만족도 평점과 재구매 빈도 간의 관계를 평가하기 위해 Spearman
            순위상관분석을 실시하였다. 보통 수준의 양의 상관이 나타났다,{" "}
            <em>r<sub>s</sub></em>(48) = .52, <em>p</em> &lt; .001. 더 높은
            만족도를 보고한 고객들이 더 자주 재구매하는 경향이 있었다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 상관계수는 앞에 0을 붙이지 않고 소수점 둘째 자리까지 보고합니다
        (예: 0.87이 아닌 .87). <em>p</em>-값은 소수점 셋째 자리까지 보고하되,
        .001 미만인 경우 <em>p</em> &lt; .001로 표기합니다. 상관의 자유도는
        N - 2입니다.
      </p>

      {/* 8. Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>상관과 인과 혼동:</strong> 유의한 상관은 두 변수가 관련이
          있다는 것만을 나타내며, 한 변수가 다른 변수를 야기한다는 것을
          의미하지 않습니다. 항상 혼입변수를 고려하고 인과적 표현을
          피하세요(예: &quot;~에 의해 야기됨&quot; 대신 &quot;~와 연관됨&quot;
          사용).
        </li>
        <li>
          <strong>이상값 무시:</strong> 하나의 이상값이 Pearson의 <em>r</em>을
          극적으로 변화시킬 수 있습니다. 예를 들어, 하나의 극단적 데이터
          포인트가 약한 상관을 강한 상관으로(또는 그 반대로) 바꿀 수 있습니다.
          결과를 보고하기 전에 항상 산점도를 확인하세요.
        </li>
        <li>
          <strong>범위 제한:</strong> 표본이 하나의 변수에 대해 좁은 범위만
          포함하는 경우, 관측된 상관은 약화(감쇠)됩니다. 예를 들어, 입학한
          대학원생(이미 두 변수 모두 높은) 사이에서 학점과 GRE 점수를
          상관분석하면 실제 모집단 상관을 과소평가하게 됩니다.
        </li>
        <li>
          <strong>비선형 데이터에 Pearson 사용:</strong> Pearson의{" "}
          <em>r</em>은 선형 관계만 포착합니다. 산점도가 명확한 곡선(예: 이차,
          로그)을 보이면 Pearson의 <em>r</em>은 실제 연관성을 과소평가합니다.
          Spearman의 rho를 사용하거나 데이터를 변환하세요.
        </li>
        <li>
          <strong><em>p</em> = .000으로 보고:</strong> 통계 소프트웨어가 때때로
          p = .000으로 표시합니다. 항상 <em>p</em> &lt; .001로 보고하세요.{" "}
          <em>p</em>-값은 절대로 정확히 0이 아닙니다.
        </li>
      </ul>

      {/* 9. Calculation Accuracy Box */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 상관 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">cor.test()</code>{" "}
          함수로 검증되었습니다. Pearson의 <em>r</em>은 표준 적률 공식을,
          Spearman의 <em>rho</em>는 순위 값을 사용하여 계산합니다. 유의성
          검정은 N - 2 자유도의 <em>t</em>-분포를 사용합니다. Pearson의{" "}
          <em>r</em>에 대한 95% 신뢰구간은 Fisher의 <em>z</em>-변환을 통해
          계산됩니다. 모든 결과는 R 출력과 소수점 넷째 자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

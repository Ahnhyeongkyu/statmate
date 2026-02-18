export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        반복측정 분산분석(Repeated Measures ANOVA)이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        반복측정 분산분석(피험자내 분산분석이라고도 함)은 동일한 피험자가 3개
        이상의 조건 또는 시점에서 측정되었을 때 평균을 비교하는 통계 방법입니다.
        독립 집단을 비교하는 일원분산분석과 달리, 반복측정 분산분석은 동일
        개인에게서 수집된 측정값 간의 상관을 고려하여 개인차가 오차항에서
        제거되므로 더 높은 통계적 검정력을 제공합니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        동일한 참가자가 3개 이상의 조건이나 시점에서 측정되었을 때 반복측정
        분산분석을 사용합니다. 일반적인 시나리오에는 시간 경과에 따른 변화를
        추적하는 종단 연구, 모든 참가자가 모든 조건을 경험하는 피험자내 실험,
        그리고 환자가 여러 치료를 순서대로 받는 교차 임상시험이 포함됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        반복측정 ANOVA vs 일원 ANOVA
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">반복측정 ANOVA</th>
              <th className="py-2 text-left font-semibold">일원 ANOVA</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">설계</td>
              <td className="py-2">피험자내</td>
              <td className="py-2">피험자간</td>
            </tr>
            <tr>
              <td className="py-2">피험자</td>
              <td className="py-2">모든 조건에 동일한 피험자</td>
              <td className="py-2">집단별 다른 피험자</td>
            </tr>
            <tr>
              <td className="py-2">오차항</td>
              <td className="py-2">개인차 제거</td>
              <td className="py-2">개인차 포함</td>
            </tr>
            <tr>
              <td className="py-2">통계적 검정력</td>
              <td className="py-2 font-medium">높음</td>
              <td className="py-2">낮음</td>
            </tr>
            <tr>
              <td className="py-2">특수 가정</td>
              <td className="py-2">구형성</td>
              <td className="py-2">등분산성</td>
            </tr>
            <tr>
              <td className="py-2">필요 표본 크기</td>
              <td className="py-2">작음</td>
              <td className="py-2">큼</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: 치료 경과에 따른 세 시점 비교
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          임상 심리학자가 8명의 환자의 불안 점수(0-100)를 기저선, 치료 4주 후,
          치료 8주 후에 측정합니다.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">기저선 (n = 8)</p>
            <p className="mt-1 text-sm text-gray-500">
              45, 52, 48, 55, 50, 47, 53, 49
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 49.88, <em>SD</em> = 3.23
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">4주 후 (n = 8)</p>
            <p className="mt-1 text-sm text-gray-500">
              58, 65, 62, 68, 63, 60, 66, 61
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 62.88, <em>SD</em> = 3.23
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">8주 후 (n = 8)</p>
            <p className="mt-1 text-sm text-gray-500">
              70, 78, 74, 80, 75, 72, 79, 73
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 75.13, <em>SD</em> = 3.56
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em>(2, 14) = 186.47, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .96
          </p>
          <p className="mt-2 text-sm text-gray-600">
            시간이 불안 점수에 미치는 유의한 효과가 있었습니다. 매우 큰
            효과크기는 치료 기간 동안 피험자내 분산의 96%를 시간이 설명함을
            나타내며, 치료 기간 동안 상당한 개선이 있었음을 보여줍니다.
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        반복측정 분산분석의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        반복측정 분산분석에는 네 가지 핵심 가정이 있습니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 정규성</p>
          <p className="mt-1 text-sm text-gray-600">
            피험자내 요인의 각 수준에서 종속변수가 대략 정규분포를 따라야 합니다.
            중간 정도의 표본 크기(n &ge; 15)에서 F-검정은 정규성 위반에
            강건합니다. 심하게 비정규인 데이터의 경우 비모수 대안인 Friedman
            검정을 고려하십시오.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 구형성(복합 대칭)</p>
          <p className="mt-1 text-sm text-gray-600">
            구형성은 모든 조건 쌍 간 차이의 분산이 대략 동일해야 한다는 것을
            요구합니다. 이는 등분산성의 반복측정 동치입니다. Mauchly 검정으로 이
            가정을 확인합니다. 위반 시 자유도를 조정하기 위해
            Greenhouse-Geisser(더 보수적) 또는 Huynh-Feldt 보정을 사용합니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 이월 효과 없음</p>
          <p className="mt-1 text-sm text-gray-600">
            한 조건의 효과가 다음 조건으로 이월되지 않아야 합니다. 참가자 간 조건
            순서를 역균형화하면 이월을 최소화할 수 있습니다. 종단 연구에서는 이를
            통제하기가 본질적으로 어렵습니다.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 등간 또는 비율 데이터</p>
          <p className="mt-1 text-sm text-gray-600">
            종속변수는 연속 척도로 측정되어야 합니다. 서열 반복측정 데이터의 경우
            Friedman 검정을 대신 사용하십시오.
          </p>
        </div>
      </div>

      {/* Sphericity */}
      <h3 className="text-xl font-semibold text-gray-900">
        구형성과 Greenhouse-Geisser 보정 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        구형성은 반복측정 분산분석에 고유한 중요한 가정입니다. 구형성이 위반되면
        표준 F-검정이 자유주의적(너무 많은 거짓 양성을 생성)이 됩니다.
        Greenhouse-Geisser(GG) 보정은 분자와 분모 자유도에 엡실론(&epsilon;)을
        곱하여 이를 조정합니다. 엡실론은 1/(k-1)과 1 사이의 값입니다.
        &epsilon; = 1이면 구형성이 완벽하게 충족됩니다. &epsilon;이 감소할수록
        보정이 더 엄격해져 더 큰(더 보수적인) p-값을 산출합니다.
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>F</em>-통계량, 자유도, <em>p</em>-값, 부분 에타제곱을 보고합니다.
        Greenhouse-Geisser 보정이 적용된 경우 보정된 자유도를 보고하고
        명시합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            보정 없음 (구형성 충족)
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            반복측정 분산분석 결과 시간이 불안 점수에 미치는 유의한 효과가
            있었다, <em>F</em>(2, 14) = 186.47, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .96.
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            Greenhouse-Geisser 보정 적용
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            Mauchly 검정 결과 구형성 가정이 위반되었다, &chi;&sup2;(2) = 8.45,{" "}
            <em>p</em> = .015. 따라서 Greenhouse-Geisser 보정을
            적용하였다(&epsilon; = .62). 시간의 유의한 효과가 있었다,{" "}
            <em>F</em>(1.24, 8.68) = 186.47, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .96.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: 항상 Mauchly 검정 결과를 보고하고, 구형성이 위반된 경우 어떤
        보정을 사용했는지 명시하십시오. 보정된 자유도는 소수점 둘째 자리까지
        보고합니다.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>반복측정 대신 일원분산분석 사용:</strong> 동일 피험자가 여러 번
          측정되었을 때 독립 집단으로 처리하면 피험자내 상관을 무시하여 오차항이
          증가하고 검정력이 감소합니다.
        </li>
        <li>
          <strong>구형성 무시:</strong> 구형성 위반을 확인하고 보정하지 않으면
          제1종 오류율이 증가합니다. 항상 Mauchly 검정을 보고하고 필요시 보정을
          적용하십시오.
        </li>
        <li>
          <strong>관측치 수 불일치:</strong> 모든 피험자가 모든 조건에 대한
          데이터를 가져야 합니다. 결측 데이터는 특별한 처리(예: 혼합효과 모형
          또는 대체)가 필요합니다.
        </li>
        <li>
          <strong>역균형화 미실시:</strong> 피험자내 설계에서 순서 효과가 결과를
          혼동할 수 있습니다. 가능하면 조건 순서를 역균형화하십시오.
        </li>
        <li>
          <strong>효과크기 무시:</strong> 유의한 F-검정만으로는 실질적 중요성을
          전달하지 못합니다. 항상 <em>p</em>-값과 함께 부분 에타제곱을
          보고하십시오.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 반복측정 분산분석 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1">ezANOVA()</code> 및 SPSS
          GLM 반복측정 출력과 비교 검증되었습니다. 구현은 분산을 조건간,
          피험자간, 오차 성분으로 분할합니다. Mauchly 검정과
          Greenhouse-Geisser 엡실론은 중심화된 공분산 행렬로부터 계산됩니다.
          Bonferroni 보정 사후검정은 조정된 알파 수준의 대응 t-검정을
          사용합니다.
        </p>
      </div>
    </section>
  );
}

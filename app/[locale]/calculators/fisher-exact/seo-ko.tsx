export function SeoContentKo() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Fisher 정확 검정이란?
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Fisher 정확 검정(Fisher&apos;s exact test)은 2&times;2 분할표에서 두
        범주형 변수 간에 비무작위적 연관성이 있는지를 판단하는 통계적 유의성
        검정입니다. 대표본 근사에 의존하는 카이제곱 검정과 달리, Fisher 정확
        검정은 귀무가설(독립) 하에서 관측된 데이터(또는 더 극단적인 데이터)의
        정확한 확률을 계산합니다. 이러한 특성 때문에 표본 크기가 작거나 기대
        셀 빈도가 5 미만인 경우에 특히 적합합니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        사용 시기
      </h3>
      <p className="text-gray-600 leading-relaxed">
        다음 조건 중 하나 이상에 해당할 때 카이제곱 검정 대신 Fisher 정확
        검정을 사용합니다: 전체 표본 크기가 작은 경우(일반적으로 N &lt;
        20-30), 기대 셀 빈도가 5 미만인 셀이 있는 경우, 또는 주변 합계가
        크게 불균형한 2&times;2 표인 경우. 표본 크기가 제한될 수 있는
        임상시험, 역학 연구, 생의학 연구에서 소표본 범주형 분석의 표준으로
        사용됩니다.
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Fisher 정확 검정 vs 카이제곱 검정
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">특성</th>
              <th className="py-2 text-left font-semibold">Fisher 정확 검정</th>
              <th className="py-2 text-left font-semibold">카이제곱 검정</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">방법</td>
              <td className="py-2">정확법 (초기하분포)</td>
              <td className="py-2">근사법</td>
            </tr>
            <tr>
              <td className="py-2">표 크기</td>
              <td className="py-2">2&times;2만 가능</td>
              <td className="py-2">모든 크기</td>
            </tr>
            <tr>
              <td className="py-2">표본 크기</td>
              <td className="py-2 font-medium">모든 크기 (소표본에 이상적)</td>
              <td className="py-2">대표본 (N &ge; 20)</td>
            </tr>
            <tr>
              <td className="py-2">기대빈도 &lt; 5</td>
              <td className="py-2 font-medium">문제없음</td>
              <td className="py-2">신뢰도 저하</td>
            </tr>
            <tr>
              <td className="py-2">효과크기</td>
              <td className="py-2">오즈비, Phi</td>
              <td className="py-2">Cram&eacute;r&apos;s V</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          계산 예제: Fisher 정확 검정
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          임상시험에서 새로운 치료가 대조군에 비해 환자 결과를 개선하는지
          검정합니다. 20명의 환자만 있어 카이제곱 근사가 신뢰할 수 없으므로
          Fisher 정확 검정을 사용합니다.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold"></th>
                <th className="py-2 text-center font-semibold">개선됨</th>
                <th className="py-2 text-center font-semibold">개선 안 됨</th>
                <th className="py-2 text-center font-semibold">합계</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">치료군</td>
                <td className="py-2 text-center">8</td>
                <td className="py-2 text-center">2</td>
                <td className="py-2 text-center font-medium">10</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">대조군</td>
                <td className="py-2 text-center">1</td>
                <td className="py-2 text-center">9</td>
                <td className="py-2 text-center font-medium">10</td>
              </tr>
              <tr className="border-t-2 border-gray-900">
                <td className="py-2 font-semibold">합계</td>
                <td className="py-2 text-center font-medium">9</td>
                <td className="py-2 text-center font-medium">11</td>
                <td className="py-2 text-center font-semibold">20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">결과</p>
          <p className="mt-1 text-sm text-gray-600">
            Fisher 정확 검정, <em>p</em> = .003, OR = 36.00, 95% CI [3.26,
            397.53]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            치료 조건과 결과 간에 통계적으로 유의한 연관성이 나타났습니다.
            치료군 환자가 대조군 환자보다 유의하게 더 높은 개선율을
            보였습니다 (OR = 36.00).
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Fisher 정확 검정의 가정
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Fisher 정확 검정은 카이제곱 검정보다 가정이 적지만, 다음 사항은
        충족되어야 합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 2&times;2 분할표</p>
          <p className="mt-1 text-sm text-gray-600">
            데이터는 두 개의 이진 범주형 변수로 구성된 2&times;2 표로
            정리되어야 합니다. 더 큰 표의 경우 카이제곱 검정이나
            Freeman-Halton 확장을 고려하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 독립 관측</p>
          <p className="mt-1 text-sm text-gray-600">
            각 관측치는 독립적이어야 합니다. 각 대상은 표의 한 셀에만
            기여해야 합니다. 대응 또는 짝지은 데이터의 경우 McNemar
            검정을 사용하세요.
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 고정된 주변 합계</p>
          <p className="mt-1 text-sm text-gray-600">
            검정은 행 합계, 열 합계, 또는 둘 다 연구 설계에 의해
            고정되어 있다고 가정합니다. 이는 대부분의 실험 및 관찰
            연구에서 자동으로 충족됩니다.
          </p>
        </div>
      </div>

      {/* Odds Ratio */}
      <h3 className="text-xl font-semibold text-gray-900">
        오즈비(Odds Ratio) 이해
      </h3>
      <p className="text-gray-600 leading-relaxed">
        오즈비(OR)는 2&times;2 표에서 연관성의 강도와 방향을 수량화합니다. 한
        집단의 결과 오즈를 다른 집단의 오즈와 비교합니다:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">OR 값</th>
              <th className="py-2 text-left font-semibold">해석</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">OR = 1</td>
              <td className="py-2">변수 간 연관 없음</td>
            </tr>
            <tr>
              <td className="py-2">OR &gt; 1</td>
              <td className="py-2">양의 연관 (첫 번째 행에서 오즈가 더 높음)</td>
            </tr>
            <tr>
              <td className="py-2">OR &lt; 1</td>
              <td className="py-2">음의 연관 (첫 번째 행에서 오즈가 더 낮음)</td>
            </tr>
            <tr>
              <td className="py-2">95% CI에 1 포함</td>
              <td className="py-2">연관이 통계적으로 유의하지 않음</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA 형식 보고법
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Fisher 정확 검정 결과를 APA 형식으로 보고할 때는 검정명, p-값, 오즈비,
        95% 신뢰구간을 포함합니다:
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">템플릿</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Fisher의 정확 검정 결과, [변수 1]과 [변수 2] 간에 [유의한/유의하지
            않은] 연관성이 나타났다, <em>p</em> = .XXX, OR = X.XX, 95% CI
            [X.XX, X.XX].
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">보고 예시</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Fisher의 정확 검정 결과, 치료 조건과 환자 개선 간에 유의한
            연관성이 나타났다, <em>p</em> = .003, OR = 36.00, 95% CI [3.26,
            397.53]. 치료를 받은 환자가 대조군 환자보다 유의하게 더 높은
            개선율을 보였다.
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        참고: <em>p</em>-값은 소수점 셋째 자리까지 보고하고, .001 미만인 경우{" "}
        <em>p</em> &lt; .001로 표기합니다. 항상 오즈비와 95% 신뢰구간을
        포함하세요. 셀에 0이 포함된 경우 오즈비가 정의되지 않거나 무한대일 수
        있음을 주의하세요.
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        흔한 실수
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>소표본에서 카이제곱 사용:</strong> 기대 빈도가 5 미만인
          경우, 카이제곱 근사는 신뢰할 수 없습니다. 소표본의 2&times;2
          표에서는 Fisher 정확 검정을 사용해야 합니다.
        </li>
        <li>
          <strong>신뢰구간 무시:</strong> 유의한 p-값만으로는 효과의 크기를
          알 수 없습니다. 연관성의 방향과 불확실성을 전달하기 위해 항상
          오즈비와 95% 신뢰구간을 보고하세요.
        </li>
        <li>
          <strong>오즈비와 상대위험도 혼동:</strong> 오즈비와 상대위험도는
          다른 측정치입니다. 결과가 흔한 경우(&gt; 10%), 오즈비는
          상대위험도를 과대추정합니다. 적절한 경우 둘 다 보고하세요.
        </li>
        <li>
          <strong>비이진 데이터에 적용:</strong> Fisher 정확 검정은 2&times;2
          표를 위해 설계되었습니다. 더 큰 표에는 카이제곱 검정이나
          Freeman-Halton 확장을 사용하세요.
        </li>
        <li>
          <strong>대응 데이터에 사용:</strong> Fisher 정확 검정은 독립 관측을
          가정합니다. 대응 또는 짝지은 이진 데이터에는 McNemar 검정을
          사용하세요.
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          계산 정확도
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMate의 Fisher 정확 검정 계산은 R의{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">fisher.test()</code>{" "}
          함수 및 SAS 출력과 비교 검증되었습니다. 구현은 수치적 오버플로우를
          방지하기 위해 로그-팩토리얼을 사용하며, 고정된 주변 합계를 가진 모든
          가능한 표를 열거하여 정확한 양측 p-값을 계산합니다. 모든 결과는 R
          출력과 소수점 넷째 자리까지 일치합니다.
        </p>
      </div>
    </section>
  );
}

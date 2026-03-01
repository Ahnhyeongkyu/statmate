export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Fisherの正確検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Fisherの正確検定（Fisher&apos;s exact test）は、2&times;2分割表において
        2つのカテゴリカル変数間に非無作為的な関連があるかどうかを判定する統計的
        有意性検定です。大標本近似に依存するカイ二乗検定とは異なり、Fisherの
        正確検定は帰無仮説（独立）のもとで観測されたデータ（またはそれ以上に
        極端なデータ）の正確な確率を計算します。このため、標本サイズが小さい
        場合や期待セル度数が5未満の場合に特に適しています。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用する場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        以下の条件のいずれか1つ以上に該当する場合、カイ二乗検定の代わりにFisherの
        正確検定を使用します：全体の標本サイズが小さい場合（一般的にN &lt;
        20-30）、期待セル度数が5未満のセルがある場合、または周辺合計が大きく
        不均衡な2&times;2表の場合。標本サイズが制限される可能性のある臨床試験、
        疫学研究、生物医学研究において、小標本カテゴリカル分析の標準として
        使用されています。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Fisherの正確検定 vs カイ二乗検定
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">Fisherの正確検定</th>
              <th className="py-2 text-left font-semibold">カイ二乗検定</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">方法</td>
              <td className="py-2">正確法（超幾何分布）</td>
              <td className="py-2">近似法</td>
            </tr>
            <tr>
              <td className="py-2">表のサイズ</td>
              <td className="py-2">2&times;2のみ</td>
              <td className="py-2">すべてのサイズ</td>
            </tr>
            <tr>
              <td className="py-2">標本サイズ</td>
              <td className="py-2 font-medium">すべて（小標本に最適）</td>
              <td className="py-2">大標本（N &ge; 20）</td>
            </tr>
            <tr>
              <td className="py-2">期待度数 &lt; 5</td>
              <td className="py-2 font-medium">問題なし</td>
              <td className="py-2">信頼性低下</td>
            </tr>
            <tr>
              <td className="py-2">効果量</td>
              <td className="py-2">オッズ比、Phi</td>
              <td className="py-2">Cram&eacute;r&apos;s V</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：Fisherの正確検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          臨床試験において、新しい治療が対照群と比較して患者の転帰を改善するか
          どうかを検定します。患者が20名しかいないため、カイ二乗近似は信頼
          できない可能性があり、Fisherの正確検定を使用します。
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold"></th>
                <th className="py-2 text-center font-semibold">改善あり</th>
                <th className="py-2 text-center font-semibold">改善なし</th>
                <th className="py-2 text-center font-semibold">合計</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">治療群</td>
                <td className="py-2 text-center">8</td>
                <td className="py-2 text-center">2</td>
                <td className="py-2 text-center font-medium">10</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">対照群</td>
                <td className="py-2 text-center">1</td>
                <td className="py-2 text-center">9</td>
                <td className="py-2 text-center font-medium">10</td>
              </tr>
              <tr className="border-t-2 border-gray-900">
                <td className="py-2 font-semibold">合計</td>
                <td className="py-2 text-center font-medium">9</td>
                <td className="py-2 text-center font-medium">11</td>
                <td className="py-2 text-center font-semibold">20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            Fisherの正確検定, <em>p</em> = .003, OR = 36.00, 95% CI [3.26,
            397.53]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            治療条件と転帰の間に統計的に有意な関連が認められました。治療群の
            患者は対照群の患者よりも有意に高い改善率を示しました（OR = 36.00）。
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Fisherの正確検定の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Fisherの正確検定はカイ二乗検定よりも前提条件が少ないですが、以下の
        事項は満たす必要があります：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 2&times;2分割表</p>
          <p className="mt-1 text-sm text-gray-600">
            データは2つの二値カテゴリカル変数で構成された2&times;2表に整理
            されている必要があります。より大きな表の場合は、カイ二乗検定または
            Freeman-Halton拡張を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 独立な観測</p>
          <p className="mt-1 text-sm text-gray-600">
            各観測は独立でなければなりません。各対象は表の1つのセルにのみ寄与
            する必要があります。対応または対比データの場合はMcNemar検定を
            使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 固定された周辺合計</p>
          <p className="mt-1 text-sm text-gray-600">
            検定は、行合計、列合計、または両方が研究デザインによって固定されて
            いることを前提とします。これはほとんどの実験的および観察的研究で
            自動的に満たされます。
          </p>
        </div>
      </div>

      {/* Odds Ratio */}
      <h3 className="text-xl font-semibold text-gray-900">
        オッズ比の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        オッズ比（OR）は、2&times;2表における関連の強さと方向を定量化します。
        一方の群における結果のオッズを他方の群のオッズと比較します：
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">OR値</th>
              <th className="py-2 text-left font-semibold">解釈</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">OR = 1</td>
              <td className="py-2">変数間に関連なし</td>
            </tr>
            <tr>
              <td className="py-2">OR &gt; 1</td>
              <td className="py-2">正の関連（第1行でオッズが高い）</td>
            </tr>
            <tr>
              <td className="py-2">OR &lt; 1</td>
              <td className="py-2">負の関連（第1行でオッズが低い）</td>
            </tr>
            <tr>
              <td className="py-2">95% CIに1を含む</td>
              <td className="py-2">関連は統計的に有意でない</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Fisherの正確検定の結果をAPA形式で報告する際は、検定名、p値、オッズ比、
        95%信頼区間を含めます：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">テンプレート</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Fisherの正確検定の結果、[変数1]と[変数2]の間に[有意な/有意でない]
            関連が認められた，<em>p</em> = .XXX, OR = X.XX, 95% CI [X.XX,
            X.XX]。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Fisherの正確検定の結果、治療条件と患者の改善の間に有意な関連が
            認められた，<em>p</em> = .003, OR = 36.00, 95% CI [3.26,
            397.53]。治療を受けた患者は対照群の患者よりも有意に高い改善率を
            示した。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：<em>p</em>値は小数第3位まで報告し、.001未満の場合は{" "}
        <em>p</em> &lt; .001と表記します。常にオッズ比と95%信頼区間を
        含めてください。セルに0が含まれる場合、オッズ比が未定義または
        無限大になる可能性があることに注意してください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある誤り
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>小標本でカイ二乗検定を使用：</strong> 期待度数が5未満の場合、
          カイ二乗近似は信頼できません。小標本の2&times;2表ではFisherの正確検定を
          使用してください。
        </li>
        <li>
          <strong>信頼区間の無視：</strong> 有意なp値だけでは効果の大きさを
          示しません。関連の方向と不確実性を伝えるために、常にオッズ比と95%
          信頼区間を報告してください。
        </li>
        <li>
          <strong>オッズ比と相対リスクの混同：</strong> オッズ比と相対リスクは
          異なる指標です。結果が一般的な場合（&gt; 10%）、オッズ比は相対
          リスクを過大推定します。適切な場合は両方を報告してください。
        </li>
        <li>
          <strong>非二値データへの適用：</strong> Fisherの正確検定は2&times;2表
          向けに設計されています。より大きな表にはカイ二乗検定または
          Freeman-Halton拡張を使用してください。
        </li>
        <li>
          <strong>対応データへの使用：</strong> Fisherの正確検定は独立な観測を
          前提としています。対応または対比された二値データにはMcNemar検定を
          使用してください。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのFisherの正確検定の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">fisher.test()</code>{" "}
          関数およびSAS出力と比較検証されています。実装は数値オーバーフローを
          防ぐために対数階乗を使用し、固定された周辺合計を持つすべての可能な表を
          列挙して正確な両側p値を計算します。すべての結果はR出力と少なくとも
          小数第4位まで一致しています。
        </p>
      </div>
    </section>
  );
}

export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Mann-Whitney U検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Mann-Whitney U検定（Wilcoxon順位和検定とも呼ばれます）は、2つの独立した群の
        分布を比較するために使用されるノンパラメトリック統計検定です。独立標本t検定と
        異なり、データが正規分布に従うことを仮定しないため、順序データ、非対称分布、
        または正規性を検証できない小標本に適しています。Henry B. MannとDonald R.
        Whitneyが1947年に開発し、行動科学、医学、社会研究で最も広く使用される
        ノンパラメトリック検定の一つです。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用する場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Mann-Whitney U検定は独立標本t検定のノンパラメトリックな代替手法です。以下の
        条件のいずれか1つ以上に該当する場合に使用します：データが順序尺度（例：
        リッカート尺度）で測定されている場合、正規性の仮定が満たされない場合、
        標本サイズが非常に小さい場合（例：群あたりn &lt; 15）、またはパラメトリック
        検定の結果を歪める可能性のある外れ値が含まれている場合。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Mann-Whitney U検定 vs 独立標本t検定
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">Mann-Whitney U</th>
              <th className="py-2 text-left font-semibold">独立標本t検定</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">種類</td>
              <td className="py-2">ノンパラメトリック</td>
              <td className="py-2">パラメトリック</td>
            </tr>
            <tr>
              <td className="py-2">データ水準</td>
              <td className="py-2">順序尺度または連続型</td>
              <td className="py-2">連続型（間隔/比率尺度）</td>
            </tr>
            <tr>
              <td className="py-2">正規性の必要性</td>
              <td className="py-2 font-medium">不要</td>
              <td className="py-2">必要（または大標本）</td>
            </tr>
            <tr>
              <td className="py-2">比較対象</td>
              <td className="py-2">順位分布</td>
              <td className="py-2">平均</td>
            </tr>
            <tr>
              <td className="py-2">効果量</td>
              <td className="py-2">順位二系列相関 <em>r</em></td>
              <td className="py-2">Cohen&apos;s <em>d</em></td>
            </tr>
            <tr>
              <td className="py-2">外れ値への頑健性</td>
              <td className="py-2 font-medium">高い</td>
              <td className="py-2">低い</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：Mann-Whitney U検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が新しい治療（群1）を受けた患者とプラセボ（群2）を受けた患者の
          疼痛評価（1-10点尺度）を比較します。疼痛評価は順序データであり標本が
          小さいため、Mann-Whitney U検定が適切です。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">群1 &mdash; 治療群 (n=8)</p>
            <p className="mt-1 text-sm text-gray-500">85, 72, 91, 68, 77, 95, 83, 89</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 84.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">群2 &mdash; プラセボ群 (n=8)</p>
            <p className="mt-1 text-sm text-gray-500">65, 78, 71, 62, 73, 69, 75, 67</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 70.0</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>U</em> = 5.0, <em>z</em> = -2.84, <em>p</em> = .005,{" "}
            <em>r</em> = 0.84
          </p>
          <p className="mt-2 text-sm text-gray-600">
            治療群はプラセボ群より有意に高いスコアを示し、大きな効果量
            （順位二系列相関 <em>r</em> = 0.84）を示しました。
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Mann-Whitney U検定の前提条件
      </h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 順序尺度または連続型データ</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は少なくとも順序尺度で測定されている必要があります。リッカート尺度、
            試験得点、反応時間などが含まれます。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 独立した群</p>
          <p className="mt-1 text-sm text-gray-600">
            2つの群は互いに独立でなければなりません。対応またはマッチングされたデータの
            場合はWilcoxon符号順位検定を使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 独立な観測</p>
          <p className="mt-1 text-sm text-gray-600">
            各群内の観測は独立でなければなりません。反復測定やクラスターデータはこの
            仮定に違反します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 類似した分布形状（中央値比較時）</p>
          <p className="mt-1 text-sm text-gray-600">
            検定結果を中央値の比較として解釈するには、2つの群の分布形状が類似している
            必要があります（位置のみが異なる場合）。
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        順位二系列相関（Rank-Biserial Correlation）の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        順位二系列相関（<em>r</em>）は、Mann-Whitney U検定に推奨される効果量
        指標です。&minus;1から+1までの範囲を取り、2群間の有利な比較と不利な比較の
        比率差を表します。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">|<em>r</em>|</th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">実質的意味</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.1</td>
              <td className="py-2">無視できる水準</td>
              <td className="py-2 text-gray-500">順位において2群がほぼ同一</td>
            </tr>
            <tr>
              <td className="py-2">0.1 &ndash; 0.3</td>
              <td className="py-2">小さい効果</td>
              <td className="py-2 text-gray-500">一方の群がやや高い順位を示す傾向</td>
            </tr>
            <tr>
              <td className="py-2">0.3 &ndash; 0.5</td>
              <td className="py-2">中程度の効果</td>
              <td className="py-2 text-gray-500">群間で目に見える分離</td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.5</td>
              <td className="py-2">大きい効果</td>
              <td className="py-2 text-gray-500">強い分離、一方の群の大部分が他方より高い順位</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインに従い、U統計量、z値、p値、効果量、および各群の
        記述統計量（中央値と標本サイズ）を報告します：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Mann-Whitney U検定の結果、治療群（Mdn = 84.0, <em>n</em> = 8）の
            スコアはプラセボ群（Mdn = 70.0, <em>n</em> = 8）より有意に高かった，{" "}
            <em>U</em> = 5.0, <em>z</em> = &minus;2.84, <em>p</em> = .005,{" "}
            <em>r</em> = .84。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：<em>U</em>は小数点第1位まで、<em>z</em>は小数点第2位まで、
        <em>p</em>は小数点第3位まで報告します。p値が.001未満の場合は{" "}
        <em>p</em> &lt; .001と表記します。常に効果量指標として順位二系列相関{" "}
        <em>r</em>を併記してください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>非正規データにt検定を使用：</strong> データが順序尺度であるか、
          小標本で明らかに非正規の場合、t検定は誤解を招く結果を生じる可能性が
          あります。代わりにMann-Whitney U検定を使用してください。
        </li>
        <li>
          <strong>Uを平均差として解釈：</strong> Mann-Whitney U検定は順位分布を
          比較するものであり、平均を比較するものではありません。記述統計量として
          平均ではなく中央値を報告してください。
        </li>
        <li>
          <strong>同順位の無視：</strong> 多くの観測値が同じ値を持つ場合、同順位は
          検定結果に影響を与える可能性があります。StatMateは平均順位法を使用して
          同順位を自動的に処理します。
        </li>
        <li>
          <strong>対応データにMann-Whitneyを使用：</strong> データが対応または
          マッチングされている場合は、Wilcoxon符号順位検定を代わりに使用して
          ください。
        </li>
        <li>
          <strong>効果量の報告漏れ：</strong> 有意なp値だけでは差の大きさは
          わかりません。検定結果と併せて常に順位二系列相関を報告してください。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのMann-Whitney U検定の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            wilcox.test()
          </code>{" "}
          関数およびSPSS出力と比較検証されています。実装はz値に対する連続性補正を
          含む正規近似と、確率分布にjstatライブラリを使用しています。同順位は
          平均順位法で処理されます。すべての結果はR出力と小数点第4位まで一致します。
        </p>
      </div>
    </section>
  );
}

export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Kruskal-Wallis H検定とは
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Kruskal-Wallis H検定は、3つ以上の独立群の分布を比較するために使用される
        順位に基づくノンパラメトリック検定です。一元配置分散分析（One-Way ANOVA）の
        ノンパラメトリックな代替手法であり、Mann-Whitney U検定を2群以上に拡張した
        ものです。William KruskalとW. Allen Wallisが1952年に開発し、群の区別なく
        すべての観測値を順位化した上で、順位分布が群間で異なるかを検定します。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        3つ以上の独立群を比較する際、次の条件のいずれかに該当する場合に
        Kruskal-Wallis H検定を使用します：データが順序尺度（例：リッカート尺度）で
        測定されている場合、正規性の仮定が侵害されている場合、標本サイズが
        非常に小さい場合、またはパラメトリックな結果を歪める可能性のある
        外れ値が含まれている場合。医学研究、心理学、教育学、品質管理研究で
        広く使用されています。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Kruskal-Wallis H検定 vs 一元配置分散分析（ANOVA）
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">Kruskal-Wallis H</th>
              <th className="py-2 text-left font-semibold">一元配置分散分析</th>
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
              <td className="py-2">順序または連続</td>
              <td className="py-2">連続（間隔/比率）</td>
            </tr>
            <tr>
              <td className="py-2">正規性の必要性</td>
              <td className="py-2 font-medium">不要</td>
              <td className="py-2">必要（または大標本）</td>
            </tr>
            <tr>
              <td className="py-2">比較対象</td>
              <td className="py-2">順位分布</td>
              <td className="py-2">平均値</td>
            </tr>
            <tr>
              <td className="py-2">効果量</td>
              <td className="py-2">&eta;&sup2;<sub>H</sub></td>
              <td className="py-2">&eta;&sup2;</td>
            </tr>
            <tr>
              <td className="py-2">事後検定</td>
              <td className="py-2">Dunn検定</td>
              <td className="py-2">Tukey / Bonferroni</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 計算例 */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：Kruskal-Wallis H検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が3つの教育プログラムに対する満足度評価（1-10点尺度）を
          比較します。評価が順序データであり標本が小さいため、
          Kruskal-Wallis H検定が適切です。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">プログラムA (n=7)</p>
            <p className="mt-1 text-sm text-gray-500">12, 15, 18, 14, 16, 13, 17</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 15.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">プログラムB (n=7)</p>
            <p className="mt-1 text-sm text-gray-500">22, 25, 20, 28, 24, 26, 21</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 24.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">プログラムC (n=7)</p>
            <p className="mt-1 text-sm text-gray-500">8, 11, 9, 13, 10, 7, 12</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 10.0</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>H</em>(2) = 16.06、<em>p</em> &lt; .001、{" "}
            <em>&eta;&sup2;</em><sub>H</sub> = 0.78
          </p>
          <p className="mt-2 text-sm text-gray-600">
            3つのプログラム間に有意な差が認められ、大きな効果量を示しました。
            Bonferroni補正を適用したDunn事後検定の結果、すべての群間の対比較で
            有意な差が認められました。
          </p>
        </div>
      </div>

      {/* 仮定 */}
      <h3 className="text-xl font-semibold text-gray-900">
        Kruskal-Wallis H検定の仮定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Kruskal-Wallis H検定はANOVAより制約が少ないですが、確認すべき仮定が
        あります：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 順序または連続データ</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は少なくとも順序尺度で測定されている必要があります（すなわち、
            値を意味のある順位付けができる必要があります）。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 独立した群</p>
          <p className="mt-1 text-sm text-gray-600">
            群は互いに独立している必要があります。各観測値は1つの群にのみ
            属します。関連のある群や反復測定の場合は、Friedman検定を
            使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 独立した観測</p>
          <p className="mt-1 text-sm text-gray-600">
            各群内の観測値は独立している必要があります。反復測定、クラスタ、
            または対応のあるデータはこの仮定に違反します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 類似した分布形状</p>
          <p className="mt-1 text-sm text-gray-600">
            結果を中央値の比較として解釈するためには、すべての群の分布形状が
            類似している必要があります。分布形状が異なる場合、検定は順位分布を
            より広範に比較するものとなります。
          </p>
        </div>
      </div>

      {/* 効果量 */}
      <h3 className="text-xl font-semibold text-gray-900">
        Eta-Squared H（&eta;&sup2;<sub>H</sub>）の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Eta-squared H（&eta;&sup2;<sub>H</sub>）はKruskal-Wallis検定の
        効果量指標です。群の所属によって説明される順位分散の割合を推定し、
        ANOVAの&eta;&sup2;に類似しています。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">&eta;&sup2;<sub>H</sub></th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">実質的意味</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.01</td>
              <td className="py-2">無視できる水準</td>
              <td className="py-2 text-gray-500">順位において群がほぼ同一</td>
            </tr>
            <tr>
              <td className="py-2">0.01 - 0.06</td>
              <td className="py-2">小さい効果</td>
              <td className="py-2 text-gray-500">順位分布にわずかな差異</td>
            </tr>
            <tr>
              <td className="py-2">0.06 - 0.14</td>
              <td className="py-2">中程度の効果</td>
              <td className="py-2 text-gray-500">群間に目立った分離</td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.14</td>
              <td className="py-2">大きい効果</td>
              <td className="py-2 text-gray-500">順位分布に強い分離</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA形式の報告 */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版ガイドラインに従い、H統計量、自由度、p値、効果量、および
        各群の記述統計（中央値と標本サイズ）を報告します：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Kruskal-Wallis H検定の結果、3つのプログラム間で満足度評価に統計的に
            有意な差が認められた、<em>H</em>(2) = 16.06、<em>p</em> &lt; .001、{" "}
            &eta;&sup2;<sub>H</sub> = .78。Bonferroni補正を適用したDunn事後
            対比較検定の結果、プログラムB（Mdn = 24.0）はプログラムA（Mdn = 15.0）
            およびプログラムC（Mdn = 10.0）の両方よりも有意に高い得点を示した。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：<em>H</em>は小数第2位まで、自由度は整数で、<em>p</em>は小数第3位
        まで報告します。p値が.001未満の場合は<em>p</em> &lt; .001と表記します。
        効果量指標として必ず&eta;&sup2;<sub>H</sub>を併せて報告し、全体検定が
        有意な場合は事後検定の結果も報告してください。
      </p>

      {/* よくある間違い */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>非正規データにANOVAを使用する：</strong> データが順序尺度で
          ある場合や小標本で明らかに非正規である場合、ANOVAは誤解を招く結果を
          もたらす可能性があります。代わりにKruskal-Wallis H検定を使用して
          ください。
        </li>
        <li>
          <strong>事後検定の省略：</strong> 有意なKruskal-Wallis結果は、
          少なくとも1つの群が異なることのみを示します。Dunn事後検定で具体的に
          どの群の対が異なるかを必ず確認してください。
        </li>
        <li>
          <strong>関連のある群にKruskal-Wallisを使用する：</strong> データが
          対応のある、マッチした、または反復測定のものである場合、代わりに
          Friedman検定を使用してください。Kruskal-Wallis検定は厳密に独立群の
          ための検定です。
        </li>
        <li>
          <strong>効果量の省略：</strong> 有意なp値だけでは差の大きさがわかり
          ません。検定結果と共に必ず&eta;&sup2;<sub>H</sub>を報告してください。
        </li>
        <li>
          <strong>Bonferroni補正の省略：</strong> 多重対比較を行う際、多重検定の
          補正を適用しないと第一種の過誤率が増加します。
        </li>
      </ul>

      {/* 検証 */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのKruskal-Wallis H検定の計算は、R（kruskal.test関数）および
          SPSSの出力との比較検証が行われています。実装はp値に対するカイ二乗
          近似と確率分布のためのjstatライブラリを使用しています。同順位は
          平均順位法で処理されます。すべての結果はRの出力と少なくとも小数第4位
          まで一致しています。
        </p>
      </div>
    </section>
  );
}

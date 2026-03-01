export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      {/* 1. What is Correlation */}
      <h2 className="text-2xl font-bold text-gray-900">
        相関分析とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        相関分析は、2つの変数間の関係の強さと方向を定量化する統計的測定方法です。
        相関係数は-1（完全な負の関係）から+1（完全な正の関係）までの範囲を持ち、
        0は線形関係がないことを示します。相関分析は、心理学、教育学、医学、
        経済学、社会科学において最も広く使用される手法の1つです。
      </p>
      <p className="text-gray-600 leading-relaxed">
        相関の概念は、<strong>Sir Francis Galton</strong>が1880年代に遺伝と
        平均への回帰に関する研究で先駆的に取り組みました。彼の研究は{" "}
        <strong>Karl Pearson</strong>によって体系化され、1896年に今日まで
        使用されている数学的基盤である積率相関係数（Pearsonの<em>r</em>）を
        開発しました。1904年には<strong>Charles Spearman</strong>が順序データと
        単調関係のためのノンパラメトリックな代替法である順位相関係数（Spearmanの
        <em>rho</em>）を導入しました。この2つの指標が現代の二変量相関分析の
        基盤を形成しています。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Pearson相関（r）
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Pearsonの<em>r</em>は、2つの連続型変数間の<strong>線形</strong>関係の
        強さを測定します。2つの変数の共分散をそれぞれの標準偏差の積で割って
        計算されます。両方の変数が間隔尺度または比率尺度で測定され、関係が
        おおよそ線形であり、データがおおよそ正規分布に従う場合にPearsonを
        使用します。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Spearman相関（rho）
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Spearmanの<em>rho</em>（<em>r<sub>s</sub></em>）は、生の値ではなく
        順位を使用して2つの変数間の<strong>単調</strong>関係を評価するノン
        パラメトリックな指標です。データが順序型（例：リッカート尺度）であるか、
        関係が単調であるが必ずしも線形ではない場合、または外れ値が懸念される
        場合にSpearmanを使用します。順位に基づいているため、Spearmanのrhoは
        Pearsonの<em>r</em>よりも極端値に対して頑健です。
      </p>

      {/* 2. Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：学習時間 vs. 試験スコア
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          心理学の教授が、週間の学習時間が試験の成績を予測するかを調べるために
          10名の学生のデータを収集しました。各学生は平均的な週間学習時間を
          報告し、期末試験のスコア（100点満点）が記録されました。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              学習時間 (X)
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
              試験スコア (Y)
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
            散布図の説明
          </p>
          <p className="mt-1 text-sm text-gray-600">
            10個のデータポイントをグラフにプロットすると、明確な上昇傾向が
            見られます：学習時間が2時間から20時間に増加するにつれ、試験スコアが
            52点から95点に上昇しています。データポイントは上向きの回帰線の
            周りに密集しており、散布が少ない強い正の線形関係を示しています。
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>r</em>(8) = .85, <em>p</em> &lt; .001, 95% CI [.50, .96]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            週間学習時間と試験スコアの間に強い正の相関が認められました。
            週当たりより多くの時間を勉強した学生は、期末試験でかなり高い
            スコアを獲得する傾向がありました。決定係数（<em>r</em><sup>2</sup>
            {" "}= .72）は、学習時間が試験スコアの分散の約72%を説明することを
            示しています。
          </p>
        </div>
      </div>

      {/* 3. Pearson vs Spearman Comparison */}
      <h3 className="text-xl font-semibold text-gray-900">
        相関係数と他の検定の比較
      </h3>
      <p className="text-gray-600 leading-relaxed">
        正しい相関の方法を選択するには、データの種類、分布、および予想される
        関係の性質によって異なります。以下は選択を助けるための比較表です：
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">Pearson <em>r</em></th>
              <th className="py-2 text-left font-semibold">Spearman <em>r<sub>s</sub></em></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium text-gray-700">種類</td>
              <td className="py-2">パラメトリック</td>
              <td className="py-2">ノンパラメトリック</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">データ水準</td>
              <td className="py-2">間隔 / 比率</td>
              <td className="py-2">順序 / 間隔 / 比率</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">検出される関係</td>
              <td className="py-2">線形のみ</td>
              <td className="py-2">すべての単調関係</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">正規性の要件</td>
              <td className="py-2">あり（二変量正規性）</td>
              <td className="py-2">なし</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">外れ値への感度</td>
              <td className="py-2">高い</td>
              <td className="py-2">より頑健</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">適している場合</td>
              <td className="py-2">連続型、正規分布のデータ</td>
              <td className="py-2">順位データ、非正規分布、順序尺度</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">使用例</td>
              <td className="py-2">身長 vs. 体重</td>
              <td className="py-2">顧客満足度（1-5） vs. 再購入頻度</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Interpreting Correlation Strength */}
      <h3 className="text-xl font-semibold text-gray-900">
        相関の強さの解釈
      </h3>
      <p className="text-gray-600 leading-relaxed">
        相関係数の絶対値は関係の強さを示します。文脈が重要であり分野によって
        基準が異なりますが、以下のガイドライン（Evans, 1996に基づく）は一般的な
        枠組みを提供します：
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">|<em>r</em>| の値</th>
              <th className="py-2 text-left font-semibold">強さ</th>
              <th className="py-2 text-left font-semibold">解釈</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">.00 &ndash; .19</td>
              <td className="py-2 font-medium">無視できる水準</td>
              <td className="py-2 text-gray-500">無視できる関係；実質的な予測価値なし</td>
            </tr>
            <tr>
              <td className="py-2">.20 &ndash; .39</td>
              <td className="py-2 font-medium">弱い</td>
              <td className="py-2 text-gray-500">小さいが潜在的に意味のある関係</td>
            </tr>
            <tr>
              <td className="py-2">.40 &ndash; .59</td>
              <td className="py-2 font-medium">中程度</td>
              <td className="py-2 text-gray-500">顕著な関係で意味のある予測力を持つ</td>
            </tr>
            <tr>
              <td className="py-2">.60 &ndash; .79</td>
              <td className="py-2 font-medium">強い</td>
              <td className="py-2 text-gray-500">実質的な関係；良好な予測精度</td>
            </tr>
            <tr>
              <td className="py-2">.80 &ndash; 1.00</td>
              <td className="py-2 font-medium">非常に強い</td>
              <td className="py-2 text-gray-500">ほぼ完全な関係；優れた予測精度</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        注意：これらの基準は正の相関と負の相関の両方に同等に適用されます。{" "}
        <em>r</em> = -.85は<em>r</em> = +.85と同じ強さであり、方向のみが
        異なります。
      </p>

      {/* 5. Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        相関分析の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        相関の結果を解釈する前に、以下の前提条件が満たされているか確認してください：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 連続型データ</p>
          <p className="mt-1 text-sm text-gray-600">
            Pearsonの<em>r</em>を使用するには、両方の変数が連続型尺度（間隔尺度
            または比率尺度）で測定されている必要があります。どちらかの変数が
            順序型（例：リッカート尺度、順位）の場合は、順位に基づいて計算され
            連続型の測定を必要としないSpearmanのrhoを使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 線形性</p>
          <p className="mt-1 text-sm text-gray-600">
            Pearsonの<em>r</em>は2つの変数間の線形関係を仮定します。常にまず
            散布図を確認してください。関係が曲線的（例：U字型や対数的）な場合、
            Pearsonの<em>r</em>は実際の関連性の強さを過小評価します。このような
            場合はSpearmanのrhoや非線形変換を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 二変量正規性{" "}
            <span className="text-xs font-normal text-gray-500">（Pearsonのみ）</span>
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Pearsonの<em>r</em>は、両方の変数がおおよそ正規分布に従うことを
            仮定します。この仮定は主に有意性検定と信頼区間に重要です。標本
            サイズが30以上であれば、中程度の違反に対しても検定は十分に頑健です。
            非正規データの場合は、Spearmanのrhoを代わりに使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 外れ値がないこと</p>
          <p className="mt-1 text-sm text-gray-600">
            外れ値はPearsonの<em>r</em>を劇的に上昇または低下させる可能性が
            あります。たった1つの極端なデータポイントが、相関をほぼ0から強い
            水準に（またはその逆に）移動させることがあります。常に散布図で
            データを視覚化して外れ値を確認してください。外れ値がある場合は、
            根拠を示して除去するか、Spearmanのrhoに切り替えることを検討して
            ください。
          </p>
        </div>
      </div>

      {/* 6. Correlation != Causation */}
      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          相関は因果ではない
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          統計学において最も重要な原則の1つは、{" "}
          <strong>相関は因果を意味しない</strong>ということです。2つの変数間の
          強い相関は、それらが共に変化する傾向があることを意味しますが、一方の
          変数がもう一方の変化を引き起こしていることを証明するものではありません。
        </p>
        <p className="mt-3 text-gray-600 leading-relaxed">
          観測された相関に対して3つの可能な説明があります：
        </p>
        <ul className="mt-2 ml-4 list-disc space-y-1 text-gray-600">
          <li>
            <strong>直接的因果：</strong> XがYを実際に引き起こしている（またはYが
            Xを引き起こしている）。
          </li>
          <li>
            <strong>逆因果：</strong> 因果の方向があなたの仮定とは逆である。
          </li>
          <li>
            <strong>第3変数（交絡変数）：</strong> 測定されていない変数ZがXとY
            の両方を引き起こし、見かけ上の相関を生み出している。
          </li>
        </ul>
        <p className="mt-3 text-gray-600 leading-relaxed">
          <strong>典型的な例：</strong> アイスクリームの売上と溺死事故の件数には
          強い正の相関があります。アイスクリームが溺死を引き起こすのでしょうか？
          もちろんそうではありません。交絡変数は<em>気温</em>です&mdash;暑い
          天気がアイスクリームの消費と水泳活動の両方を増加させ、溺死事故が
          増えるのです。気温を制御しなければ、アイスクリームと溺死の間に因果関係が
          あると誤った結論を導いてしまいます。
        </p>
        <p className="mt-3 text-sm text-gray-500">
          因果関係を確立するには、無作為割り当てを含む適切に設計された実験研究、
          または操作変数法、回帰不連続デザイン、差分の差分法などの高度な手法が
          必要です。
        </p>
      </div>

      {/* 7. APA Reporting Templates */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式による報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインによると、相関の結果報告には相関係数、自由度
        （N - 2）、p値、できれば95%信頼区間を含める必要があります。以下は
        実際の数値を含むテンプレートです：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            Pearson相関
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            週間学習時間と試験スコアの関係を評価するためにPearson相関分析を
            実施した。2つの変数間に強い正の相関が認められた、{" "}
            <em>r</em>(8) = .85, <em>p</em> &lt; .001, 95% CI [.50, .96]。
            週当たりより多くの時間を勉強した学生ほど、より高い試験スコアを
            獲得する傾向があった。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            Spearman相関
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            顧客満足度評価と再購入頻度の関係を評価するためにSpearman順位
            相関分析を実施した。中程度の正の相関が認められた、{" "}
            <em>r<sub>s</sub></em>(48) = .52, <em>p</em> &lt; .001。
            より高い満足度を報告した顧客ほど、より頻繁に再購入する傾向があった。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注意：相関係数は先頭の0を付けずに小数点以下2桁まで報告します（例：
        0.87ではなく .87）。<em>p</em>値は小数点以下3桁まで報告し、.001未満の
        場合は <em>p</em> &lt; .001と表記します。相関の自由度はN - 2です。
      </p>

      {/* 8. Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>相関と因果の混同：</strong> 有意な相関は2つの変数が関連して
          いることのみを示し、一方の変数がもう一方を引き起こすことを意味しません。
          常に交絡変数を考慮し、因果的な表現を避けてください（例：「〜に起因する」
          ではなく「〜と関連がある」を使用）。
        </li>
        <li>
          <strong>外れ値の無視：</strong> 1つの外れ値がPearsonの<em>r</em>を
          劇的に変化させる可能性があります。例えば、1つの極端なデータポイントが
          弱い相関を強い相関に（またはその逆に）変えることがあります。結果を
          報告する前に、常に散布図を確認してください。
        </li>
        <li>
          <strong>範囲の制限：</strong> 標本が一方の変数の狭い範囲のみを含む
          場合、観測される相関は弱められます（減衰）。例えば、入学した大学院生
          （すでに両変数とも高い）の間でGPAとGREスコアを相関分析すると、実際の
          母集団における相関を過小評価してしまいます。
        </li>
        <li>
          <strong>非線形データへのPearsonの使用：</strong> Pearsonの<em>r</em>は
          線形関係のみを捉えます。散布図が明確な曲線（例：二次関数、対数関数）を
          示している場合、Pearsonの<em>r</em>は実際の関連性を過小評価します。
          Spearmanのrhoを使用するか、データを変換してください。
        </li>
        <li>
          <strong><em>p</em> = .000と報告する：</strong> 統計ソフトウェアが
          p = .000と表示することがあります。常に <em>p</em> &lt; .001と
          報告してください。<em>p</em>値は決して正確に0ではありません。
        </li>
      </ul>

      {/* 9. Calculation Accuracy Box */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの相関計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">cor.test()</code>{" "}
          関数に対して検証されています。Pearsonの<em>r</em>は標準的な積率公式を、
          Spearmanの<em>rho</em>は順位値を使用して計算します。有意性検定は
          N - 2自由度の<em>t</em>分布を使用します。Pearsonの<em>r</em>の
          95%信頼区間はFisherの<em>z</em>変換を通じて計算されます。すべての
          結果はR出力と小数点以下4桁まで一致します。
        </p>
      </div>
    </section>
  );
}

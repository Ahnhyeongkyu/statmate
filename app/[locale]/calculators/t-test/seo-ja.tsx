export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        t検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        t検定（t-test）は、2つの群の平均を比較し、統計的に有意な差があるかどうかを
        判断するための統計検定です。1908年にWilliam Sealy Gossetが
        &quot;Student&quot;というペンネームで開発したt検定は、社会科学、心理学、
        医学、教育研究において最も頻繁に使用される統計検定の一つです。
        t検定はシンプルな問いに答えます：2群の平均の差は実際の効果によるものか、
        それとも単なる偶然によるものか？
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        対応のないt検定（独立標本t検定）
      </h3>
      <p className="text-gray-600 leading-relaxed">
        対応のないt検定は、2つの異なる独立した群の平均を比較する際に使用します。
        例えば、実験群と統制群の試験得点の比較、あるいは男女間の給与比較などが
        挙げられます。本計算機ではデフォルトでWelchのt検定を採用しており、
        等分散の仮定が不要で、米国心理学会（APA）がデフォルトの手法として
        推奨している方法です。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        対応のあるt検定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        対応のあるt検定は、同一群の2時点の平均を比較する場合（プリテスト vs
        ポストテスト）、または参加者が主要な変数でマッチングされている場合に
        使用します。対応のあるt検定は測定間の相関を考慮するため、研究デザインが
        許す場合、対応のないt検定よりも高い検定力を提供します。代表的な例として、
        介入前後の研究や被験者内実験デザインがあります。
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：対応のないt検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が、新しい教授法が試験得点を向上させるかどうかを検証しようと
          しています。15名の学生が新しい教授法（実験群）を、15名が従来の
          教授法（統制群）を使用しました。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">実験群 (n=15)</p>
            <p className="mt-1 text-sm text-gray-500">85, 90, 78, 92, 88, 95, 82, 91, 87, 93, 86, 89, 94, 80, 91</p>
            <p className="mt-2 text-sm text-gray-600"><em>M</em> = 88.07, <em>SD</em> = 4.94</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">統制群 (n=15)</p>
            <p className="mt-1 text-sm text-gray-500">78, 82, 75, 80, 77, 83, 79, 81, 76, 84, 73, 80, 82, 77, 79</p>
            <p className="mt-2 text-sm text-gray-600"><em>M</em> = 79.07, <em>SD</em> = 3.15</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>t</em>(23.47) = 5.87, <em>p</em> &lt; .001, <em>d</em> = 2.15, 95% CI [5.82, 12.18]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            実験群は統制群よりも有意に高い得点を示し、非常に大きな
            効果量（Cohen&apos;s <em>d</em> = 2.15）が認められました。
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        t検定と他の検定の使い分け
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">状況</th>
              <th className="py-2 text-left font-semibold">推奨される検定</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">2つの独立した群の平均比較</td>
              <td className="py-2 font-medium">対応のないt検定</td>
            </tr>
            <tr>
              <td className="py-2">事前・事後の得点比較（同一群）</td>
              <td className="py-2 font-medium">対応のあるt検定</td>
            </tr>
            <tr>
              <td className="py-2">3群以上の平均比較</td>
              <td className="py-2">一元配置分散分析（ANOVA）</td>
            </tr>
            <tr>
              <td className="py-2">非正規データ、2群の場合</td>
              <td className="py-2">Mann-Whitney U検定</td>
            </tr>
            <tr>
              <td className="py-2">非正規の対応データ</td>
              <td className="py-2">Wilcoxon符号順位検定</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        t検定の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        結果を解釈する前に、以下の前提条件が満たされているか確認してください：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 測定の水準</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は連続型（間隔尺度または比率尺度）でなければなりません。
            データが順序尺度（例：リッカート尺度）の場合は、ノンパラメトリックな
            代替手法を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 無作為抽出</p>
          <p className="mt-1 text-sm text-gray-600">
            データは母集団を代表する無作為に選択された標本から収集される必要が
            あります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 正規性</p>
          <p className="mt-1 text-sm text-gray-600">
            各群のデータはおおよそ正規分布に従う必要があります。群ごとの標本サイズが
            30以上であれば、中心極限定理により正規性の逸脱に対して頑健です。
            小標本の場合は、Shapiro-Wilk検定で正規性を確認してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 等分散性（Studentのtの場合）</p>
          <p className="mt-1 text-sm text-gray-600">
            2群の分散がほぼ等しい必要があります。StatMateではデフォルトで{" "}
            <strong>Welchのt検定</strong>を使用しているため、この仮定は不要であり、
            一般的な使用に推奨されています。
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        Cohen&apos;s d 効果量の解釈
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>p</em>値は差が統計的に有意かどうかを示す一方、
        Cohen&apos;s <em>d</em>は実用的な観点から差がどの程度大きいかを
        示します。大きな標本サイズでは、小さく意味のない差でも
        &quot;有意&quot;になり得るため、効果量の報告は非常に重要です。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">Cohen&apos;s <em>d</em></th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">実用的な意味</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">0.2</td>
              <td className="py-2">小さい効果</td>
              <td className="py-2 text-gray-500">精密な測定でのみ検出可能な差</td>
            </tr>
            <tr>
              <td className="py-2">0.5</td>
              <td className="py-2">中程度の効果</td>
              <td className="py-2 text-gray-500">目視で確認できる差</td>
            </tr>
            <tr>
              <td className="py-2">0.8</td>
              <td className="py-2">大きい効果</td>
              <td className="py-2 text-gray-500">実質的で明白な差</td>
            </tr>
            <tr>
              <td className="py-2">1.2+</td>
              <td className="py-2">非常に大きい効果</td>
              <td className="py-2 text-gray-500">極めて強い効果、見落とし難い差</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式によるt検定結果の報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインでは、t検定の結果にはt統計量、自由度、p値、
        効果量、信頼区間を含める必要があります。以下は使用可能な
        テンプレートです：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">対応のないt検定</p>
          <p className="mt-1 text-sm italic text-gray-600">
            対応のないt検定の結果、実験群（<em>M</em> = 88.07, <em>SD</em> = 4.94）は
            統制群（<em>M</em> = 79.07, <em>SD</em> = 3.15）よりも有意に
            高い得点を示した、<em>t</em>(23.47) = 5.87, <em>p</em> &lt; .001,
            <em>d</em> = 2.15, 95% CI [5.82, 12.18]。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">対応のあるt検定</p>
          <p className="mt-1 text-sm italic text-gray-600">
            対応のあるt検定の結果、事後テスト得点（<em>M</em> = 82.40,{" "}
            <em>SD</em> = 6.12）は事前テスト得点（<em>M</em> = 75.60,{" "}
            <em>SD</em> = 7.35）よりも有意に高かった、<em>t</em>(24) = 4.32,{" "}
            <em>p</em> &lt; .001, <em>d</em> = 0.86。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注意：<em>t</em>値と自由度は小数点以下2桁まで報告します。{" "}
        <em>p</em>値は小数点以下3桁まで報告し、.001未満の場合は{" "}
        <em>p</em> &lt; .001と表記します。必ず効果量の指標を含めてください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong><em>p</em> = .000と報告する：</strong> 統計ソフトウェアが
          p = .000と表示することがありますが、<em>p</em> &lt; .001と報告すべきです。
          p値は決して正確に0にはなりません。
        </li>
        <li>
          <strong>効果量の無視：</strong> 統計的に有意な結果であっても{" "}
          <em>d</em> = 0.1であれば、実用的に意味がない可能性があります。
          常に効果量を報告し、解釈してください。
        </li>
        <li>
          <strong>3群以上にt検定を使用する：</strong> 3群以上ある場合は
          ANOVAを使用してください。複数のt検定は第1種の過誤率を
          増加させます。
        </li>
        <li>
          <strong>等分散の仮定：</strong> 等分散を仮定する強い根拠がない限り、
          Welchのt検定（StatMateのデフォルト）を使用してください。
        </li>
        <li>
          <strong>統計的有意性と実用的重要性の混同：</strong>{" "}
          <em>p</em> &lt; .05の結果が自動的にその発見が重要である、あるいは
          臨床的に関連があることを意味するわけではありません。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのt検定計算は、Rのt.test()関数およびSPSSの出力結果に対して
          検証されています。確率分布の計算にjstatライブラリを使用し、
          Welch-Satterthwaiteの自由度近似とともにWelchのt検定を
          実装しています。すべての結果はRの出力と小数点以下4桁以上で一致します。
        </p>
      </div>
    </section>
  );
}

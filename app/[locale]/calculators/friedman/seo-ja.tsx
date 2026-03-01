export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Friedman検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Friedman検定は、3つ以上の関連群（反復測定）における差異を検出するために
        使用されるノンパラメトリック統計検定です。反復測定分散分析（Repeated
        Measures ANOVA）のノンパラメトリックな代替手法です。Milton Friedmanが
        1937年に開発したこの検定は、各被験者内で条件間の観測値を順位付けし、
        平均順位が条件間で有意に異なるかどうかを検定します。医学、心理学、
        教育学において、事前・事後・追跡デザインや被験者内実験で広く使用されて
        います。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用する場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        3つ以上の条件を持つ反復測定またはマッチングデザインで、以下の条件の
        いずれか1つ以上に該当する場合にFriedman検定を使用します：データが順序
        尺度で測定されている場合、正規性の仮定が満たされない場合、標本サイズが
        小さい場合、または外れ値が含まれている場合。一般的な応用例として、経時的
        な治療効果の比較、同一評価者による製品選好度の評価、複数時点で測定された
        質問紙回答の分析が挙げられます。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Friedman検定 vs 反復測定ANOVA
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">Friedman検定</th>
              <th className="py-2 text-left font-semibold">反復測定ANOVA</th>
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
              <td className="py-2">デザイン</td>
              <td className="py-2">反復測定／マッチング</td>
              <td className="py-2">反復測定／マッチング</td>
            </tr>
            <tr>
              <td className="py-2">効果量</td>
              <td className="py-2">Kendallの<em>W</em></td>
              <td className="py-2">偏&eta;&sup2;</td>
            </tr>
            <tr>
              <td className="py-2">事後検定</td>
              <td className="py-2">Nemenyi／Bonferroni</td>
              <td className="py-2">Bonferroni対比較</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：Friedman検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が10名の患者の疼痛レベルを3つの時点（治療前、1週間後、4週間後）で
          測定します。疼痛評価は順序データであり、デザインが反復測定であるため、
          Friedman検定が適切です。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">ベースライン (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">72, 85, 91, 68, 77, 83, 95, 88, 74, 79</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 80.5</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">1週間後 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">78, 89, 95, 73, 82, 87, 98, 92, 79, 83</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 85.0</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">4週間後 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">82, 93, 99, 78, 86, 91, 102, 96, 84, 88</p>
            <p className="mt-2 text-sm text-gray-600">Mdn = 89.5</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>&chi;&sup2;</em>(2) = 20.00, <em>p</em> &lt; .001,{" "}
            <em>W</em> = 1.00
          </p>
          <p className="mt-2 text-sm text-gray-600">
            時点間に有意な差が認められ、大きな効果量を示しました。事後比較に
            おいて、ベースラインから両方のフォローアップ時点への有意な改善が
            確認されました。
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Friedman検定の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Friedman検定は反復測定ANOVAよりも制約が少ないですが、以下の前提条件が
        あります：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 順序尺度または連続型データ</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は少なくとも順序尺度で測定されている必要があり、各被験者内で
            値を意味のある形で順位付けできなければなりません。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 関連群（反復測定）</p>
          <p className="mt-1 text-sm text-gray-600">
            同一の被験者がすべての条件で測定される必要があります。独立群の場合は、
            代わりにKruskal-Wallis H検定を使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 等しい標本サイズ</p>
          <p className="mt-1 text-sm text-gray-600">
            各被験者が条件ごとに1つの観測値を提供するため、各条件は同じ数の
            観測値を持つ必要があります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 無作為抽出</p>
          <p className="mt-1 text-sm text-gray-600">
            被験者は関心のある母集団から無作為に選択される必要があります。
            非無作為抽出は結果の一般化可能性を制限する場合があります。
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        Kendallの一致係数（W）の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Kendallの一致係数（W）はFriedman検定の効果量です。0から1の範囲を取り、
        0は順位における一致がないこと（差異なし）を、1は完全な一致（最大の差異）を
        意味します。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold"><em>W</em></th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">実質的意味</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.1</td>
              <td className="py-2">無視できる水準</td>
              <td className="py-2 text-gray-500">条件間でほぼ同一</td>
            </tr>
            <tr>
              <td className="py-2">0.1 - 0.3</td>
              <td className="py-2">小さい効果</td>
              <td className="py-2 text-gray-500">条件間でわずかに一貫した差</td>
            </tr>
            <tr>
              <td className="py-2">0.3 - 0.5</td>
              <td className="py-2">中程度の効果</td>
              <td className="py-2 text-gray-500">顕著で一貫したパターン</td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.5</td>
              <td className="py-2">大きい効果</td>
              <td className="py-2 text-gray-500">条件間で強く一貫した差</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインに従い、カイ二乗統計量、自由度、p値、Kendallの
        Wを報告します：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Friedman検定の結果、3つの時点にわたって疼痛レベルに統計的に有意な
            差が認められた，<em>&chi;&sup2;</em>(2) = 20.00, <em>p</em> &lt;
            .001, <em>W</em> = 1.00。Bonferroni補正を適用した事後対比較に
            おいて、ベースライン（Mdn = 80.5）から1週間後（Mdn = 85.0）および
            4週間後（Mdn = 89.5）のいずれへも有意な改善が確認された。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：&chi;&sup2;は小数第2位まで、自由度は整数で、{" "}
        <em>p</em>は小数第3位まで報告します。p値が.001未満の場合は{" "}
        <em>p</em> &lt; .001と表記します。効果量指標として常にKendallの{" "}
        <em>W</em>を併せて報告してください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある誤り
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>非正規な反復測定データにANOVAを使用：</strong> 反復測定データが
          順序尺度であったり、小標本で明らかに非正規である場合は、代わりに
          Friedman検定を使用してください。
        </li>
        <li>
          <strong>関連群にKruskal-Wallis検定を使用：</strong> Kruskal-Wallis検定は
          独立群のための検定です。反復測定またはマッチングデザインでは、常に
          Friedman検定を使用してください。
        </li>
        <li>
          <strong>条件間の観測数の不一致：</strong> Friedman検定は各条件で同じ数の
          被験者を必要とします。欠測データは分析前に処理する必要があります
          （例：リストワイズ削除または補完）。
        </li>
        <li>
          <strong>事後検定の省略：</strong> 有意なFriedman検定の結果は、少なくとも
          1つの条件が異なることしか示しません。具体的な差異を特定するために、
          常に対比較を行ってください。
        </li>
        <li>
          <strong>効果量の省略：</strong> 有意なp値だけでは実質的な重要性を
          示しません。検定結果と共に常にKendallのWを報告してください。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのFriedman検定の計算は、R（friedman.test関数）およびSPSS出力と
          比較検証されています。実装はp値のカイ二乗近似と確率分布のためのjstat
          ライブラリを使用しています。被験者内の同順位はは平均順位法で処理
          されます。すべての結果はR出力と少なくとも小数第4位まで一致しています。
        </p>
      </div>
    </section>
  );
}

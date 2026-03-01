export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        カイ二乗検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        カイ二乗（&chi;&sup2;）検定は、カテゴリ変数間の関係を検定するために
        使用されるノンパラメトリック統計検定です。平均を比較するt検定や分散分析
        （ANOVA）とは異なり、カイ二乗検定は度数データ&mdash;各カテゴリに属する
        観測値の数&mdash;を使用します。Karl Pearsonが1900年に開発したこの検定は、
        実際に観測された度数と、変数間に関係がない場合に期待される度数を比較します。
        観測度数と期待度数の差が十分に大きい場合、変数間に統計的に有意な関連が
        あると結論づけることができます。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        独立性の検定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        独立性の検定は、2つのカテゴリ変数が互いに関連しているかどうかを判断する
        ために使用されます。データは、行が一方の変数を、列がもう一方の変数を
        表す分割表（クロス集計表）として整理されます。例えば、性別と製品の好みの
        間に関係があるかどうか、または治療条件と回復結果の間に関係があるかどうかを
        検定できます。帰無仮説は、2つの変数が独立である&mdash;すなわち、一方の
        変数の値を知っても、もう一方について何の情報も得られない&mdash;と主張します。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        適合度検定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        適合度検定は、単一のカテゴリ変数の観測度数が期待度数と異なるかどうかを
        判断するために使用されます。例えば、サイコロが公正かどうかを確認するために
        観測されたサイコロの結果を期待される均等分布（各面1/6）と比較したり、
        顧客の来店が曜日ごとに均等に分布しているかを検定したりできます。帰無仮説は、
        観測分布が期待分布と一致すると主張します。
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：独立性の検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が、性別（男性 / 女性）と製品の好み（A / B / C）の間に関連が
          あるかを検定するために100名を対象に調査を実施しました。観測度数は
          以下の通りです：
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">観測値</th>
                <th className="py-2 text-center font-semibold">製品 A</th>
                <th className="py-2 text-center font-semibold">製品 B</th>
                <th className="py-2 text-center font-semibold">製品 C</th>
                <th className="py-2 text-center font-semibold">行合計</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">男性</td>
                <td className="py-2 text-center">30</td>
                <td className="py-2 text-center">10</td>
                <td className="py-2 text-center">10</td>
                <td className="py-2 text-center font-medium">50</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">女性</td>
                <td className="py-2 text-center">15</td>
                <td className="py-2 text-center">20</td>
                <td className="py-2 text-center">15</td>
                <td className="py-2 text-center font-medium">50</td>
              </tr>
              <tr className="border-t-2 border-gray-900">
                <td className="py-2 font-semibold">列合計</td>
                <td className="py-2 text-center font-medium">45</td>
                <td className="py-2 text-center font-medium">30</td>
                <td className="py-2 text-center font-medium">25</td>
                <td className="py-2 text-center font-semibold">100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          期待度数は（行合計 &times; 列合計）/ 総合計で計算されます。例えば、
          男性 &times; 製品 Aの期待度数 = (50 &times; 45) / 100 = 22.5です。
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">期待値</th>
                <th className="py-2 text-center font-semibold">製品 A</th>
                <th className="py-2 text-center font-semibold">製品 B</th>
                <th className="py-2 text-center font-semibold">製品 C</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">男性</td>
                <td className="py-2 text-center">22.5</td>
                <td className="py-2 text-center">15.0</td>
                <td className="py-2 text-center">12.5</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">女性</td>
                <td className="py-2 text-center">22.5</td>
                <td className="py-2 text-center">15.0</td>
                <td className="py-2 text-center">12.5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            &chi;&sup2;(2, <em>N</em> = 100) = 8.41, <em>p</em> = .015,
            Cram&eacute;r&apos;s <em>V</em> = .29
          </p>
          <p className="mt-2 text-sm text-gray-600">
            性別と製品の好みの間に統計的に有意な関連が認められました、
            &chi;&sup2;(2, <em>N</em> = 100) = 8.41, <em>p</em> = .015、
            中程度の効果量（Cram&eacute;r&apos;s <em>V</em> = .29）でした。
            男性は製品Aに対する好みが強く、女性は3つの製品にわたってより均等に
            分布していました。
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        カイ二乗検定と他の検定の使い分け
      </h3>
      <p className="text-gray-600 leading-relaxed">
        適切な検定の選択は、データの種類と標本サイズによって異なります。以下の
        ガイドを参考に適切な検定を選択してください：
      </p>
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
              <td className="py-2">2つのカテゴリ変数（2&times;2以上の表）</td>
              <td className="py-2 font-medium">カイ二乗独立性検定</td>
            </tr>
            <tr>
              <td className="py-2">1つのカテゴリ変数 vs 期待比率</td>
              <td className="py-2 font-medium">カイ二乗適合度検定</td>
            </tr>
            <tr>
              <td className="py-2">2&times;2表で期待度数 &lt; 5のセルがある場合</td>
              <td className="py-2">Fisherの正確検定</td>
            </tr>
            <tr>
              <td className="py-2">順序データ、2つの独立群</td>
              <td className="py-2">Mann-Whitney U検定</td>
            </tr>
            <tr>
              <td className="py-2">対応のあるまたはマッチしたカテゴリデータ</td>
              <td className="py-2">McNemar検定</td>
            </tr>
            <tr>
              <td className="py-2">3つ以上の関連カテゴリ標本</td>
              <td className="py-2">CochranのQ検定</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        カイ二乗検定の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        カイ二乗検定の結果を解釈する前に、以下の前提条件が満たされているか
        確認してください：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. カテゴリデータ</p>
          <p className="mt-1 text-sm text-gray-600">
            両方の変数がカテゴリ型（名義尺度または順序尺度）でなければなりません。
            カイ二乗検定は連続型データには適用できません。連続型の測定値がある
            場合は、まずグループに分類する必要がありますが（例：年齢 &rarr;
            年齢層）、これは情報の損失を伴います。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 独立な観測</p>
          <p className="mt-1 text-sm text-gray-600">
            各観測は他のすべての観測と独立でなければなりません。これは、各参加者
            またはケースが分割表の1つのセルにのみ寄与すべきことを意味します。
            反復測定や対応のある標本はこの仮定に違反します&mdash;代わりに
            McNemar検定を使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 期待度数 &ge; 5</p>
          <p className="mt-1 text-sm text-gray-600">
            すべての期待セル度数が5以上でなければなりません。セルの20%以上で
            期待度数が5未満の場合、カイ二乗近似は信頼できなくなります。この場合、
            カテゴリを統合するか、Fisherの正確検定（2&times;2表の場合）の使用を
            検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 相互排他的なカテゴリ</p>
          <p className="mt-1 text-sm text-gray-600">
            各観測は1つのカテゴリにのみ属さなければなりません。カテゴリは相互
            排他的かつ網羅的であり、すべての観測が正確に1つのカテゴリに割り当て
            られる必要があります。無作為抽出または無作為割り当てによりデータを
            収集し、標本が母集団を代表するようにしてください。
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        Cram&eacute;rのV 効果量
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>p</em>値は関連が統計的に有意かどうかを示しますが、
        Cram&eacute;rの<em>V</em>はその関連がどの程度強いかを示します。
        大規模な標本では些細な関連でも統計的に有意になり得るため、これは非常に
        重要です。Cram&eacute;rの<em>V</em>は0（関連なし）から1（完全な関連）
        までの範囲を持ち、解釈は自由度（行 &minus; 1または列 &minus; 1の
        小さい方）によって異なります：
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">効果量</th>
              <th className="py-2 text-center font-semibold">df* = 1</th>
              <th className="py-2 text-center font-semibold">df* = 2</th>
              <th className="py-2 text-center font-semibold">df* = 3</th>
              <th className="py-2 text-center font-semibold">df* &ge; 4</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">小さい効果</td>
              <td className="py-2 text-center">.10</td>
              <td className="py-2 text-center">.07</td>
              <td className="py-2 text-center">.06</td>
              <td className="py-2 text-center">.05</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">中程度の効果</td>
              <td className="py-2 text-center">.30</td>
              <td className="py-2 text-center">.21</td>
              <td className="py-2 text-center">.17</td>
              <td className="py-2 text-center">.15</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">大きい効果</td>
              <td className="py-2 text-center">.50</td>
              <td className="py-2 text-center">.35</td>
              <td className="py-2 text-center">.29</td>
              <td className="py-2 text-center">.25</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        *df* = min(行 &minus; 1, 列 &minus; 1)。上記の計算例（2&times;3表）では
        df* = 1であるため、<em>V</em> = .29は中程度の効果に相当します。
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式による報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインによると、カイ二乗検定の結果報告には、カイ二乗
        統計量、自由度、標本サイズ、p値、および効果量の指標を含める必要が
        あります。以下はテンプレートと実際の例です：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">テンプレート</p>
          <p className="mt-1 text-sm italic text-gray-600">
            [変数1]と[変数2]の関係を検定するためにカイ二乗独立性検定を実施した。
            2つの変数間の関係は[有意であった/有意ではなかった]、
            &chi;&sup2;(df, <em>N</em> = XX) = X.XX, <em>p</em>{" "}
            = .XXX, Cram&eacute;r&apos;s <em>V</em> = .XX。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">実際の例（上記の計算例に基づく）</p>
          <p className="mt-1 text-sm italic text-gray-600">
            性別と製品の好みの関係を検定するためにカイ二乗独立性検定を実施した。
            2つの変数間の関係は統計的に有意であった、
            &chi;&sup2;(2, <em>N</em> = 100) = 8.41, <em>p</em> = .015,
            Cram&eacute;r&apos;s <em>V</em> = .29。男性は女性（30%）に比べて
            製品Aに対する好みが顕著に高く（60%）、女性は3つの製品全体にわたって
            より均等に分布していた。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注意：&chi;&sup2;値は小数点以下2桁まで報告します。<em>p</em>値は小数点
        以下3桁まで報告し、.001未満の場合は <em>p</em> &lt; .001と表記します。
        独立性検定では必ず効果量の指標（Cram&eacute;r&apos;s <em>V</em>）を
        含めてください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>小さい期待度数でのカイ二乗検定の使用：</strong> 期待セル度数が
          5未満の場合、カイ二乗近似は信頼できません。2&times;2表ではFisherの
          正確検定を使用し、より大きな表ではカテゴリを統合して期待度数を
          高めてください。
        </li>
        <li>
          <strong>生の度数の代わりにパーセンテージを入力する：</strong> カイ二乗
          検定には実際の度数が必要であり、パーセンテージや比率は使用できません。
          パーセンテージを使用すると、検定が実際の標本サイズを把握できないため、
          不正確な結果が算出されます。
        </li>
        <li>
          <strong>効果量の無視：</strong> 統計的に有意なカイ二乗の結果でも、
          Cram&eacute;rの<em>V</em>が非常に小さい場合（例：.05）、実用的に
          意味がない可能性があります。大規模な標本では些細な関連でも「有意」に
          なり得るため、常にCram&eacute;rの<em>V</em>を報告し解釈してください。
        </li>
        <li>
          <strong>観測の独立性の違反：</strong> 各参加者は1つのセルにのみ寄与
          すべきです。同一人物が複数のセルに出現する場合（例：反復測定）、
          カイ二乗検定は有効ではありません。対応のあるデータにはMcNemar検定を
          使用してください。
        </li>
        <li>
          <strong>2種類のカイ二乗検定の混同：</strong> 独立性検定（分割表における
          2つの変数）と適合度検定（1つの変数 vs 期待比率）は異なる問いに答えます。
          研究課題に合った正しい検定を選択してください。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのカイ二乗計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">chisq.test()</code>{" "}
          関数およびSPSS出力に対して検証されています。jstatライブラリを使用して
          カイ二乗確率分布を計算し、期待度数、自由度、Cram&eacute;rのVを標準的な
          統計公式に従って算出します。すべての結果はR出力と小数点以下4桁まで
          一致します。
        </p>
      </div>
    </section>
  );
}

export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        一標本t検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        一標本t検定は、単一の標本の平均が既知のまたは仮説に基づく母集団値と
        有意に異なるかどうかを検定するパラメトリック統計検定です。2つの群を
        相互に比較する独立標本t検定や対応標本t検定とは異なり、一標本t検定は
        1つの群を固定された基準値と比較します。これは推測統計学において最も
        単純かつ強力なツールの一つであり、品質管理、臨床研究、心理学、教育分野
        で頻繁に使用されています。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        一標本t検定を使用する場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        連続測定値からなる単一の群があり、その群の平均が特定の値と統計的に
        異なるかどうかを検定したい場合に一標本t検定を使用します。
        一般的な使用シナリオは以下の通りです：
      </p>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>品質管理：</strong> 工場で正確に10gのボルトを製造しています。
          30個のボルトを標本抽出し、平均重量が10gと異なるかどうかを検定します。
        </li>
        <li>
          <strong>臨床研究：</strong> 新薬が血圧を目標値120mmHgまで低下させる
          ことが期待されます。治療後25名の患者を測定し、平均が120と異なるかを
          検定します。
        </li>
        <li>
          <strong>教育：</strong> あるクラスが全国平均500点の標準化テストを
          受験します。そのクラスの平均点が500と有意に異なるかどうかを検定します。
        </li>
        <li>
          <strong>心理学：</strong> 尺度の中央値が3.0に標準化されています。
          標本を調査し、平均態度スコアが3.0から逸脱するかどうかを検定します。
        </li>
      </ul>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：クラス平均の検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          ある教師が、自分の生徒10名が標準化数学テストで全国平均80点と異なる
          成績を収めたかどうかを知りたいと考えています。以下のスコアが記録
          されました：
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            標本データ (n = 10)
          </p>
          <p className="mt-1 text-sm text-gray-500">
            72, 85, 91, 68, 77, 83, 95, 88, 74, 79
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <em>M</em> = 81.20, <em>SD</em> = 8.75, 検定値 = 80
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>t</em>(9) = 0.43, <em>p</em> = .675, <em>d</em> = 0.14,
            95% CI [-5.06, 7.46]
          </p>
          <p className="mt-2 text-sm text-gray-600">
            クラス平均は全国平均80と有意に異ならなかった。効果量は無視できる
            水準（Cohen&apos;s <em>d</em> = 0.14）であり、母集団基準値からの
            意味のある逸脱がないことを示唆している。
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        一標本t検定の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        結果を解釈する前に、以下の前提条件が合理的に満たされていることを
        確認してください：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. 連続型従属変数
          </p>
          <p className="mt-1 text-sm text-gray-600">
            測定する変数は間隔尺度または比率尺度である必要があります（例：重量、
            温度、テストスコア）。順序型またはカテゴリカルデータには、Wilcoxon
            符号順位検定などのノンパラメトリックな代替手法が必要です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 独立な観測
          </p>
          <p className="mt-1 text-sm text-gray-600">
            各データポイントは互いに独立でなければなりません。同一参加者に対する
            反復測定やクラスターがないことが必要です。観測値が相関している場合は、
            対応標本t検定や混合効果モデルを検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 近似正規性
          </p>
          <p className="mt-1 text-sm text-gray-600">
            データはおおよそ正規分布に従う必要があります。標本サイズが30を超える
            場合、中心極限定理（CLT）により母集団の分布形状に関係なく平均の標本
            分布は正規分布に従います。小標本の場合はShapiro-Wilk検定やQ-Qプロット
            で正規性を確認してください。t検定は比較的頑健（robust）であるため、
            中程度の逸脱は許容されます。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 外れ値がないこと
          </p>
          <p className="mt-1 text-sm text-gray-600">
            極端な外れ値は標本平均を歪め、t統計量を過大または過小推定する
            可能性があります。検定実施前に箱ひげ図やz値で外れ値をスクリーニング
            してください。外れ値がある場合はトリミング、ウィンザー化、または
            頑健な（robust）代替手法を検討してください。
          </p>
        </div>
      </div>

      {/* How to Report */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインに従い、標本の記述統計量、t統計量、自由度、p値、
        効果量、信頼区間を報告します。以下は報告テンプレートです：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            APA報告テンプレート（非有意な結果）
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            標本平均（<em>M</em> = 81.20, <em>SD</em> = 8.75）を検定値
            80.00と比較するために一標本t検定を実施した。結果は統計的に
            有意ではなかった，<em>t</em>(9) = 0.43, <em>p</em>{" "}
            = .675, <em>d</em> = 0.14, 95% CI [-5.06, 7.46]。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            有意な結果の例
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            一標本t検定の結果、参加者の反応時間（<em>M</em> = 342.50,{" "}
            <em>SD</em> = 28.10）は母集団基準375msより有意に速かった，
            <em>t</em>(39) = -7.31, <em>p</em> &lt; .001,{" "}
            <em>d</em> = 1.16, 95% CI [-41.49, -23.51]。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：<em>t</em>値は小数第2位まで、<em>p</em>値は小数第3位まで
        報告してください（.001未満の場合は <em>p</em> &lt; .001と表記）。
        常にCohen&apos;s <em>d</em>などの効果量指標を含めてください。
      </p>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        一標本検定におけるCohen&apos;s dの理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        一標本t検定におけるCohen&apos;s <em>d</em>は、標本平均と検定値の
        絶対差を標本標準偏差で割って算出します。これは標本平均が仮説値から
        何標準偏差分離れているかを定量化し、標本サイズに依存しない指標を
        提供します。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">
                Cohen&apos;s <em>d</em>
              </th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">
                実質的意味
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.2</td>
              <td className="py-2">無視できる水準</td>
              <td className="py-2 text-gray-500">
                標本平均が検定値に非常に近い
              </td>
            </tr>
            <tr>
              <td className="py-2">0.2</td>
              <td className="py-2">小さい効果</td>
              <td className="py-2 text-gray-500">
                精密な測定でのみ検出可能な差
              </td>
            </tr>
            <tr>
              <td className="py-2">0.5</td>
              <td className="py-2">中程度の効果</td>
              <td className="py-2 text-gray-500">
                実質的に目に見える差
              </td>
            </tr>
            <tr>
              <td className="py-2">0.8+</td>
              <td className="py-2">大きい効果</td>
              <td className="py-2 text-gray-500">
                検定値からの顕著な逸脱
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* When to Use Alternatives */}
      <h3 className="text-xl font-semibold text-gray-900">
        一標本t検定 vs. 他の検定
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">状況</th>
              <th className="py-2 text-left font-semibold">
                推奨される検定
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">
                1つの標本平均を既知の値と比較
              </td>
              <td className="py-2 font-medium">一標本t検定</td>
            </tr>
            <tr>
              <td className="py-2">2つの独立した群の平均を比較</td>
              <td className="py-2">独立標本t検定</td>
            </tr>
            <tr>
              <td className="py-2">前後の平均を比較（同一対象）</td>
              <td className="py-2">対応標本t検定</td>
            </tr>
            <tr>
              <td className="py-2">非正規データ、1標本 vs. 値</td>
              <td className="py-2">Wilcoxon符号順位検定</td>
            </tr>
            <tr>
              <td className="py-2">比率を既知の値と比較</td>
              <td className="py-2">一標本比率z検定</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある誤り
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>不適切な検定値の選択：</strong> 検定値（母集団平均）は理論、
          先行研究、または既知の基準から導出する必要があります &mdash; 検定対象の
          同じデータセットから取得してはなりません。
        </li>
        <li>
          <strong>小標本での非正規性の無視：</strong> 観測値が30未満の場合、
          偏った分布や裾の重い分布は誤ったp値につながる可能性があります。
          小標本では必ず正規性を確認してください。
        </li>
        <li>
          <strong><em>p</em> = .000と報告：</strong> 統計ソフトウェアがp = .000
          と表示することがありますが、p値は厳密にゼロにはなりません。
          <em>p</em> &lt; .001と報告してください。
        </li>
        <li>
          <strong>効果量の無視：</strong> 統計的に有意な結果が実質的に重要な差を
          意味するとは限りません。常にp値とともにCohen&apos;s{" "}
          <em>d</em>を報告し解釈してください。
        </li>
        <li>
          <strong>非有意な結果を同一性の証拠として解釈：</strong>{" "}
          帰無仮説を棄却できないことは、標本平均が検定値と等しいことを証明する
          ものではありません。選択した有意水準において差の十分な証拠がないことを
          示すにすぎません。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの一標本t検定の計算は、Rのt.test()関数およびSPSS出力と
          比較検証されています。Studentのt確率分布にjstatライブラリを使用し、
          自由度は <em>n</em> - 1で計算されます。95%信頼区間は該当する
          自由度の臨界t値を使用して平均差を中心に構成されます。すべての結果は
          R出力と少なくとも小数第4位まで一致しています。
        </p>
      </div>
    </section>
  );
}

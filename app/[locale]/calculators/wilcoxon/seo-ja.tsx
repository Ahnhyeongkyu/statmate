export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Wilcoxon符号順位検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Wilcoxon符号順位検定は、2つの関連標本、対応標本、または単一標本の繰り返し
        測定を比較するために使用されるノンパラメトリック統計検定です。Frank
        Wilcoxonが1945年に開発し、対応のあるt検定のノンパラメトリックな代替法
        として用いられます。正規分布データを必要とする平均値の比較ではなく、
        Wilcoxon検定は対応する観測値間の差の順位に基づいて分析を行うため、
        正規性の仮定が満たされない場合や順序データを扱う場合に適しています。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用する場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        対応データまたは繰り返し測定データがあり、正規性を仮定できない場合に
        この検定を使用します。一般的なシナリオとしては、得点が正規分布に従わない
        事前・事後テストデザイン、調査におけるリッカート尺度データ（順序データ）、
        正規性の検証が困難な小標本、そして外れ値の影響を受けにくいより頑健な
        分析を求める事前・事後研究などがあります。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        Wilcoxon符号順位検定 vs 対応のあるt検定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        これら2つの検定の主な違いは仮定にあります。対応のあるt検定は対間の差が
        正規分布に従うことを仮定しますが、Wilcoxon符号順位検定は差の分布が
        対称であることのみを要求します。このためWilcoxon検定はより汎用的ですが、
        正規性が満たされる場合には対応のあるt検定の方がわずかに高い検出力
        （すなわち、真の差を検出する能力）を持ちます。経験則として、データが
        明らかに正規分布に従う場合は対応のあるt検定を、正規性に疑問がある場合や
        順序データの場合はWilcoxon検定を使用してください。
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：治療前後の比較
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          セラピストが6週間の治療プログラムの前後で10名の患者の不安スコア
          （1&ndash;100点尺度）を測定します。標本が小さく分布が不明であるため、
          対応のあるt検定の代わりにWilcoxon符号順位検定が選択されました。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">治療前 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">72, 85, 91, 68, 77, 83, 95, 88, 74, 79</p>
            <p className="mt-2 text-sm text-gray-600"><em>Mdn</em> = 81.00</p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">治療後 (n=10)</p>
            <p className="mt-1 text-sm text-gray-500">78, 89, 95, 73, 82, 87, 98, 92, 79, 83</p>
            <p className="mt-2 text-sm text-gray-600"><em>Mdn</em> = 85.00</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>W</em> = 0.0, <em>z</em> = &minus;2.80, <em>p</em> = .005,
            順位二系列相関 <em>r</em> = 1.00
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Wilcoxon符号順位検定の結果、治療後のスコアは治療前のスコアより
            有意に高く、大きな効果量を示しました。10名の患者全員が6週間の
            プログラム後に改善を示しました。
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        パラメトリック検定とノンパラメトリック検定の選択
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
              <td className="py-2">対応データ、差が正規分布</td>
              <td className="py-2 font-medium">対応のあるt検定</td>
            </tr>
            <tr>
              <td className="py-2">対応データ、非正規または順序尺度</td>
              <td className="py-2 font-medium">Wilcoxon符号順位検定</td>
            </tr>
            <tr>
              <td className="py-2">2つの独立群、正規データ</td>
              <td className="py-2">独立2標本t検定</td>
            </tr>
            <tr>
              <td className="py-2">2つの独立群、非正規</td>
              <td className="py-2">Mann-Whitney U検定</td>
            </tr>
            <tr>
              <td className="py-2">3群以上の関連群、非正規</td>
              <td className="py-2">Friedman検定</td>
            </tr>
            <tr>
              <td className="py-2">3群以上の独立群、非正規</td>
              <td className="py-2">Kruskal-Wallis検定</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        Wilcoxon符号順位検定の仮定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Wilcoxon検定は対応のあるt検定よりも仮定が少ないですが、それでも満たす
        べき条件があります。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 対応する観測値</p>
          <p className="mt-1 text-sm text-gray-600">
            データは対応する観測値で構成されている必要があります &mdash; 同一
            被験者に対する繰り返し測定（事前・事後）またはマッチングされた対。
            各対は1つの差スコアを生成します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 順序尺度または連続尺度</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は少なくとも順序尺度で測定されている必要があり、差を意味のある
            形で順位付けできなければなりません。対応のあるt検定とは異なり、間隔
            尺度や比率尺度のデータは必須ではありません。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 差の対称分布</p>
          <p className="mt-1 text-sm text-gray-600">
            対間の差の分布が中央値を中心にほぼ対称である必要があります。これは
            正規性よりも弱い仮定です。差の分布が著しく非対称な場合は、対称性の
            仮定を全く必要としない符号検定（sign test）を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 対間の独立性</p>
          <p className="mt-1 text-sm text-gray-600">
            各観測値の対は他のすべての対から独立していなければなりません。対内の
            測定値は関連しています（それが本質）が、異なる対同士は互いに影響を
            及ぼしてはなりません。
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        順位二系列相関（Rank-Biserial Correlation）の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        順位二系列相関（<em>r</em>）は、Wilcoxon符号順位検定に推奨される効果量
        指標です。&minus;1から+1の範囲を取り、&plusmn;1に近い値はほぼすべての
        対が同じ方向に変化したことを示し、0に近い値は一貫した変化の方向がないこと
        を示します。(<em>W</em>+ &minus;{" "}
        <em>W</em>&minus;) / (<em>W</em>+ + <em>W</em>&minus;)で
        計算されます。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">|<em>r</em>|</th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">実質的な意味</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.1</td>
              <td className="py-2">無視できる水準</td>
              <td className="py-2 text-gray-500">意味のある方向性の傾向なし</td>
            </tr>
            <tr>
              <td className="py-2">0.1 &ndash; 0.3</td>
              <td className="py-2">小さい効果</td>
              <td className="py-2 text-gray-500">一方向へのわずかな傾向</td>
            </tr>
            <tr>
              <td className="py-2">0.3 &ndash; 0.5</td>
              <td className="py-2">中程度の効果</td>
              <td className="py-2 text-gray-500">顕著な方向性パターン</td>
            </tr>
            <tr>
              <td className="py-2">&ge; 0.5</td>
              <td className="py-2">大きい効果</td>
              <td className="py-2 text-gray-500">強く一貫した方向性の変化</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインに従い、Wilcoxon符号順位検定の結果には検定
        統計量（<em>W</em>または<em>T</em>）、z近似値、p値、効果量、および
        関連する記述統計量（中央値）を含める必要があります。以下は使用できる
        テンプレートです。
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告テンプレート</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Wilcoxon符号順位検定の結果、事後スコア（<em>Mdn</em> = [値]）は
            事前スコア（<em>Mdn</em> = [値]）と[有意な/有意でない]差を
            示した、<em>W</em> = [値], <em>z</em> = [値], <em>p</em> = [値],{" "}
            <em>r</em> = [値]。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">実際の例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            Wilcoxon符号順位検定の結果、治療後の不安スコア（<em>Mdn</em> =
            85.00）は治療前のスコア（<em>Mdn</em> = 81.00）より有意に
            低かった、<em>W</em> = 0.0, <em>z</em> = &minus;2.80, <em>p</em> =
            .005, <em>r</em> = 1.00。大きな効果量は、治療がすべての患者に
            一貫した改善をもたらしたことを示している。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：<em>W</em>は小数点第1位まで、<em>z</em>は小数点第2位まで報告します。
        <em>p</em>値は小数点第3位まで報告しますが、値が.001未満の場合は{" "}
        <em>p</em> &lt; .001と表記します。効果量指標（順位二系列相関{" "}
        <em>r</em>）を必ず含めてください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>独立標本にWilcoxon検定を使用：</strong> Wilcoxon符号順位
          検定は対応データまたは繰り返し測定データにのみ使用します。2つの
          独立した群の比較にはMann-Whitney U検定を使用してください。
        </li>
        <li>
          <strong>W+とW&minus;を検定統計量と混同：</strong> 一部の
          ソフトウェアでは<em>W</em>を正の順位和として報告し、他のソフトウェア
          では<em>W</em>+と<em>W</em>&minus;の小さい方として報告します。
          StatMateは仮説検定の標準である <em>W</em> =
          min(<em>W</em>+, <em>W</em>&minus;)を報告します。
        </li>
        <li>
          <strong>タイやゼロ差の無視：</strong> 差がゼロの対（事前 = 事後）は
          分析から除外されます。多くの対の差がゼロの場合、検出力が低下するため、
          除外された対の数を報告する必要があります。
        </li>
        <li>
          <strong>検定が中央値を直接比較すると仮定：</strong> Wilcoxon
          符号順位検定は厳密には差の分布がゼロを中心に対称であるかどうかを
          検定するものであり、中央値が等しいかどうかを検定するものではありません。
          ただし、対称性の仮定が満たされる場合、帰無仮説の棄却は中央値の移動を
          意味します。
        </li>
        <li>
          <strong>正確表なしで非常に小さな標本に使用：</strong> ここで使用する
          正規近似（z得点）は<em>n</em> &ge; 10のときに正確です。より小さな
          標本にはWilcoxon表の正確p値または順列法がより適切です。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのWilcoxon符号順位検定の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">wilcox.test()</code>{" "}
          関数およびSPSSの出力と比較検証されています。連続性補正を含む正規
          近似、平均順位によるタイの適切な処理、正規分布確率のためのjstat
          ライブラリを使用しています。順位二系列相関はKerby（2014）に従って
          計算されます。すべての結果はRの出力と少なくとも小数点第4位まで
          一致しています。
        </p>
      </div>
    </section>
  );
}

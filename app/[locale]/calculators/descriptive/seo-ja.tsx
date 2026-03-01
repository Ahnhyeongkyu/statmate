export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        記述統計とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        記述統計（Descriptive Statistics）は、収集したデータを数値やグラフで
        要約・整理し、標本の特性を簡潔かつ効果的に把握するための手法です。
        記述統計は社会科学、心理学、医学、教育学、経営学など、ほぼすべての
        量的研究の基礎を成しており、t検定、分散分析（ANOVA）、回帰分析
        などの推測統計を実施する前に、必ずデータの中心傾向、ばらつき、
        分布の形状を記述する必要があります。記述統計はデータを
        &quot;ありのまま&quot;要約することを目的としており、母集団への一般化を
        目的とする推測統計とは明確に区別されます。
      </p>
      <p className="text-gray-600 leading-relaxed">
        記述統計は研究において3つの重要な役割を果たします：
        （1）分析前にデータ入力エラーや外れ値の検出に役立ち、
        （2）推測統計が要求する仮定（例：正規性）の充足を確認し、
        （3）データの基本的な属性を読者に伝えます。APA出版マニュアル
        （第7版）では、すべての主要研究変数について記述統計を報告するよう
        求めており、結果セクションにおいて不可欠な要素です。
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：試験得点データセット
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          ある教授が心理学入門の受講生20名の期末試験の得点を収集しました。
          他のクラスと比較する前に、まず得点の分布を記述します。
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            生データ (n = 20)
          </p>
          <p className="mt-1 text-sm text-gray-500">
            62, 65, 68, 70, 72, 73, 75, 76, 77, 78, 78, 79, 80, 81, 82, 83,
            85, 88, 90, 92
          </p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              中心傾向の指標
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <em>M</em> = 76.50
            </p>
            <p className="text-sm text-gray-600">
              <em>Mdn</em> = 77.00
            </p>
            <p className="text-sm text-gray-600">
              <em>Mode</em> = 78
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              散布度
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <em>SD</em> = 8.23
            </p>
            <p className="text-sm text-gray-600">
              分散 = 67.74
            </p>
            <p className="text-sm text-gray-600">
              範囲 = 30 (62&ndash;92)
            </p>
            <p className="text-sm text-gray-600">
              IQR = 11.25
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              分布の形状
            </p>
            <p className="mt-1 text-sm text-gray-600">
              歪度 = &minus;0.34
            </p>
            <p className="text-sm text-gray-600">
              尖度 = &minus;0.67
            </p>
            <p className="mt-2 text-sm text-gray-500">
              わずかに負の歪みを持つ近似正規分布
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            平均の95%信頼区間
          </p>
          <p className="mt-1 text-sm text-gray-600">
            95% CI [72.65, 80.35]
          </p>
          <p className="mt-2 text-sm text-gray-500">
            母平均の試験得点が72.65から80.35の間にあると95%の信頼度で
            推定できます。
          </p>
        </div>
      </div>

      {/* Central Tendency */}
      <h3 className="text-xl font-semibold text-gray-900">
        中心傾向の指標：平均 vs. 中央値 vs. 最頻値
      </h3>
      <p className="text-gray-600 leading-relaxed">
        中心傾向はデータにおける&quot;典型的な&quot;値を表します。3つの
        主要指標にはそれぞれ固有の利点があり、データの分布と測定水準に
        応じて適切な指標を選択する必要があります。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">指標</th>
              <th className="py-2 text-left font-semibold">定義</th>
              <th className="py-2 text-left font-semibold">適した場面</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">平均 (<em>M</em>)</td>
              <td className="py-2">全値の合計を<em>n</em>で割った値</td>
              <td className="py-2 text-gray-500">
                データがほぼ対称（正規）で極端な外れ値がない場合
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">中央値 (<em>Mdn</em>)</td>
              <td className="py-2">データを並べ替えた際の中央の値</td>
              <td className="py-2 text-gray-500">
                データが偏っているか外れ値がある場合（例：所得、反応時間）
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">最頻値</td>
              <td className="py-2">最も頻繁に出現する値</td>
              <td className="py-2 text-gray-500">
                名義尺度やカテゴリカルデータ、または分布の峰を把握する場合
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-md border-l-4 border-amber-500 bg-gray-50 p-4">
        <p className="font-semibold text-gray-800">
          偏ったデータに関する指針
        </p>
        <p className="mt-1 text-sm text-gray-600">
          データが正の歪み（右裾が長い）を持つ場合、平均は中央値より高くなるため
          &mdash; <strong>中央値</strong>を主要指標として報告してください。負の
          歪み（左裾が長い）の場合、平均は中央値より低くなります。実用的な基準：
          平均と中央値の差が標準偏差の10%を超える場合、平均の代わりに中央値を
          報告し、標準偏差（SD）ではなく四分位範囲（IQR）を併記することが
          望ましいです。
        </p>
      </div>

      {/* Variability */}
      <h3 className="text-xl font-semibold text-gray-900">
        散布度の指標
      </h3>
      <p className="text-gray-600 leading-relaxed">
        散布度（ばらつき）は、データポイントが中心値の周囲にどの程度
        広がっているかを示します。2つのデータセットが同じ平均を持つ場合でも
        散布度は大きく異なることがあるため、中心値の報告と同様に散布度の
        報告も重要です。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            標準偏差 (SD)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            各データポイントが平均からどれだけ離れているかの平均的な距離で、
            元の測定単位で表されます。試験において<em>SD</em> = 8.23点とは、
            得点が一般的に平均の上下約8点の範囲に分布していることを意味します。
            APA形式の研究で最も頻繁に報告される散布度の指標です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">分散 (SD&sup2;)</p>
          <p className="mt-1 text-sm text-gray-600">
            標準偏差の二乗です。分散は計算過程（例：ANOVAにおける分散の分解）で
            不可欠ですが、単位が二乗されているため直接的な解釈が困難です。分散
            67.74自体は意味を把握しにくいですが、その平方根であるSD = 8.23は
            直感的に解釈できます。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">範囲</p>
          <p className="mt-1 text-sm text-gray-600">
            最大値と最小値の差です (92 &minus; 62 = 30)。範囲は計算が
            簡単ですが外れ値に非常に敏感であり &mdash; たった1つの極端な値が
            範囲を大きく膨張させることがあります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            四分位範囲 (IQR)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            データの中央50%の範囲です (Q3 &minus; Q1)。IQRは外れ値に
            対して頑健であり、中央値を報告する際に併用するのに適した散布度の
            指標です。この例ではIQR = 11.25であり、試験得点の中央半分が
            約11点の幅に分布していることを意味します。
          </p>
        </div>
      </div>

      {/* Skewness and Kurtosis */}
      <h3 className="text-xl font-semibold text-gray-900">
        歪度と尖度：分布形状の解釈
      </h3>
      <p className="text-gray-600 leading-relaxed">
        歪度と尖度は分布の形状を数量化するものであり、多くのパラメトリック
        検定（t検定、ANOVA、回帰分析）が要求する正規性の仮定を確認する上で
        重要な役割を果たします。これらの指標を理解することで、パラメトリック
        手法とノンパラメトリック手法のどちらを使用すべきかの判断に
        役立ちます。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">指標</th>
              <th className="py-2 text-left font-semibold">値</th>
              <th className="py-2 text-left font-semibold">解釈</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium" rowSpan={3}>
                歪度
              </td>
              <td className="py-2">&asymp; 0</td>
              <td className="py-2 text-gray-500">
                対称分布（正規分布）
              </td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0 (正)</td>
              <td className="py-2 text-gray-500">
                右裾が長い；大部分の値が左に集中（例：所得データ）
              </td>
            </tr>
            <tr>
              <td className="py-2">&lt; 0 (負)</td>
              <td className="py-2 text-gray-500">
                左裾が長い；大部分の値が右に集中（例：容易な試験の得点）
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium" rowSpan={3}>
                尖度（超過）
              </td>
              <td className="py-2">&asymp; 0</td>
              <td className="py-2 text-gray-500">
                中尖（Mesokurtic） &mdash; 正規分布に類似した裾
              </td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0 (正)</td>
              <td className="py-2 text-gray-500">
                急尖（Leptokurtic） &mdash; 正規分布より重い裾、外れ値が多い
              </td>
            </tr>
            <tr>
              <td className="py-2">&lt; 0 (負)</td>
              <td className="py-2 text-gray-500">
                扁平（Platykurtic） &mdash; 正規分布より軽い裾、外れ値が少ない
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
        <p className="font-semibold text-gray-800">
          正規性の判断基準
        </p>
        <p className="mt-1 text-sm text-gray-600">
          歪度と尖度の値が<strong>&minus;2から+2</strong>の範囲内であれば、一般的に
          正規性を仮定できると見なされます (George &amp; Mallery,
          2019)。より厳格な基準では&minus;1から+1を使用する場合もあります。この
          例では歪度 = &minus;0.34、尖度 = &minus;0.67であり、いずれも許容範囲
          内にあるため、分布が近似的に正規分布であることが確認できます。
        </p>
      </div>

      {/* 95% CI */}
      <h3 className="text-xl font-semibold text-gray-900">
        95%信頼区間の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        平均の95%信頼区間（CI）は、真の母平均が位置する可能性のある
        値の範囲を提供します。この例では95% CI [72.65, 80.35]は、この
        研究を繰り返し行い毎回CIを算出した場合、約95%の区間が真の
        母平均を含むことを意味します。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            信頼区間が<em>意味する</em>こと
          </p>
          <p className="mt-1 text-sm text-gray-600">
            この区間を構成する手順が真の母平均を捉えていることを
            95%の信頼度で示しています。区間の幅 (80.35 &minus; 72.65 = 7.70) は
            推定の精度を反映しており &mdash; 区間が狭いほどより精密な推定を
            示します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-red-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            信頼区間が意味<em>しない</em>こと
          </p>
          <p className="mt-1 text-sm text-gray-600">
            母平均がこの特定の区間内にある確率が95%であるという意味では
            <strong>ありません</strong>。母平均は固定された値であり &mdash; この
            区間内にあるかないかのどちらかです。95%は個別の区間の確率ではなく、
            手法の長期的な頻度を表しています。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        CIの幅は3つの要因に依存します：標本サイズ（大きい<em>n</em>{" "}
        = 狭いCI）、ばらつき（小さい<em>SD</em> = 狭いCI）、信頼水準（99%
        CIは95% CIより広い）。幅を半分にするには標本サイズを4倍に
        する必要があります。
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式で記述統計を報告する方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版では、すべての主要変数について記述統計を報告するよう求めており、
        通常は表または本文中に提示します。上記の計算例を用いた
        報告形式は以下の通りです：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            本文中の報告（正規分布の場合）
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            試験得点は近似的に正規分布に従っていた（歪度 = &minus;0.34,
            尖度 = &minus;0.67）。学生の平均得点は76.50点であった
            （<em>SD</em> = 8.23）, 95% CI [72.65, 80.35]。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            本文中の報告（偏った分布の場合）
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            反応時間は正の歪みを示した（歪度 = 1.42）；したがって中央値を
            報告する。反応時間の中央値は340 msであった（<em>Mdn</em> = 340,
            IQR = 120）。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            APA表形式のテンプレート
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-t-2 border-gray-900">
                  <th className="py-1.5 text-left font-semibold">変数</th>
                  <th className="py-1.5 text-left font-semibold"><em>n</em></th>
                  <th className="py-1.5 text-left font-semibold"><em>M</em></th>
                  <th className="py-1.5 text-left font-semibold"><em>SD</em></th>
                  <th className="py-1.5 text-left font-semibold"><em>Mdn</em></th>
                  <th className="py-1.5 text-left font-semibold">歪度</th>
                  <th className="py-1.5 text-left font-semibold">尖度</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-gray-900">
                  <td className="py-1.5">試験得点</td>
                  <td className="py-1.5">20</td>
                  <td className="py-1.5">76.50</td>
                  <td className="py-1.5">8.23</td>
                  <td className="py-1.5">77.00</td>
                  <td className="py-1.5">&minus;0.34</td>
                  <td className="py-1.5">&minus;0.67</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注意：すべての記述統計は小数点以下2桁まで報告します。統計記号は
        イタリック体で表記します（<em>M</em>, <em>SD</em>, <em>Mdn</em>）。
        データが非正規の場合は平均とSDの代わりに中央値とIQRを報告します。
        記述統計と併せて必ず標本サイズ（<em>n</em>または<em>N</em>）を
        報告してください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>偏ったデータに平均を報告する間違い：</strong>データが大きく
          偏っている場合 (|歪度| &gt; 1)、平均は中心を表す誤解を招く指標です。
          代わりに<strong>中央値</strong>とIQRを報告してください。例えば、
          &quot;平均世帯収入&quot;は極端な値のために典型的な収入の2倍に
          なることがあります。
        </li>
        <li>
          <strong>SDとSEを混同する間違い：</strong>標準偏差（SD）は個々の
          データポイントの散布度を示し、標準誤差（SE = SD / &radic;n）は
          標本平均の精度を示します。標本を記述する際はSDを、母集団に
          ついて推論する際はSE（またはCI）を報告してください。
        </li>
        <li>
          <strong>推測統計の前に分布の形状を確認しない間違い：</strong>{" "}
          歪度、尖度、正規性を先に確認せずにt検定やANOVAを実施すると、
          妥当でない結果を得る可能性があります。検定を選択する前に必ず
          記述統計を確認し、データを可視化してください。
        </li>
        <li>
          <strong>小数点以下の桁数が少なすぎる間違い：</strong>APAガイドラインでは
          平均と標準偏差を小数点以下2桁まで報告するよう推奨しています。小数点
          以下1桁では精度が不足し、3桁以上は過剰な精度を暗示する
          可能性があります。
        </li>
        <li>
          <strong>標本サイズと信頼区間を省略する間違い：</strong>{" "}
          <em>n</em>とCIのない記述統計は不完全です。読者は信頼性を
          判断するために標本サイズを、母集団の値の妥当な範囲を理解するために
          CIを必要とします。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの記述統計計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs">psych::describe()</code>{" "}
          関数およびSPSS記述統計出力と照合して検証済みです。平均、SD、
          歪度（type 2 / 標本）、尖度（超過、type 2）、四分位数、信頼区間を含む
          すべての指標がRおよびSPSS出力と小数点以下4桁まで一致しています。
          計算機は標本標準偏差の公式（<em>n</em> &minus; 1で除算）と
          調整Fisher-Pearson係数を使用しており、標準的な統計ソフトウェアの
          デフォルト設定と一致しています。
        </p>
      </div>
    </section>
  );
}

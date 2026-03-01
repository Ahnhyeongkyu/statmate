export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        二元配置分散分析（Two-Way ANOVA）とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        二元配置分散分析（Two-Way ANOVA、要因分散分析とも呼ばれます）は、2つの独立した
        カテゴリカル変数（要因）が1つの連続型従属変数に与える影響を同時に検定する
        統計手法です。一元配置分散分析（One-Way ANOVA）が1つの要因のみを検定するのに対し、
        二元配置分散分析では要因Aの主効果、要因Bの主効果、そして2つの要因間の
        交互作用効果という3つの仮説を同時に検定します。心理学、医学、教育学、
        社会科学などの実験研究において、最も広く使用されている分析手法の一つです。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用する場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        研究デザインにそれぞれ2水準以上を持つ2つの独立カテゴリカル要因と、
        間隔尺度または比率尺度で測定された1つの連続型従属変数がある場合に
        二元配置分散分析を使用します。治療法と人口統計学的グループの複合効果、
        用量と投与方法、または同時に測定された2つのグループ化変数の効果を
        検討する実験デザインで一般的に使用されます。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        二元配置分散分析 vs 一元配置分散分析
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">一元配置分散分析</th>
              <th className="py-2 text-left font-semibold">二元配置分散分析</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">要因数</td>
              <td className="py-2">1</td>
              <td className="py-2">2</td>
            </tr>
            <tr>
              <td className="py-2">検定内容</td>
              <td className="py-2">1つの主効果</td>
              <td className="py-2">2つの主効果 + 1つの交互作用</td>
            </tr>
            <tr>
              <td className="py-2">交互作用</td>
              <td className="py-2">該当なし</td>
              <td className="py-2 font-medium">検定可能</td>
            </tr>
            <tr>
              <td className="py-2">効果量</td>
              <td className="py-2">&eta;&sup2;</td>
              <td className="py-2">偏&eta;&sup2;</td>
            </tr>
            <tr>
              <td className="py-2">デザインの複雑さ</td>
              <td className="py-2">単純</td>
              <td className="py-2">要因計画 (A &times; B)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：2 &times; 2 要因計画
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が学習方法（方法A vs 方法B）と試験難易度（易しい vs 難しい）が
          試験得点に与える影響を検定します。各セルに5名の学生が無作為に
          割り当てられました。
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            学習方法：<em>F</em>(1, 16) = 52.27, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .77
          </p>
          <p className="text-sm text-gray-600">
            難易度：<em>F</em>(1, 16) = 36.82, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .70
          </p>
          <p className="text-sm text-gray-600">
            交互作用：<em>F</em>(1, 16) = 0.33, <em>p</em> = .576,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .02
          </p>
          <p className="mt-2 text-sm text-gray-600">
            両方の主効果は有意でしたが、交互作用は有意ではありませんでした。
            これは、方法Aが方法Bより優れている効果が難易度の水準に関係なく
            一貫していることを意味します。
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        二元配置分散分析の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        結果を解釈する前に、以下の4つの前提条件を確認してください：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 正規性</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数はデザインの各セル内でおおよそ正規分布に従う必要があります。
            Shapiro-Wilk検定やQ-Qプロットで評価できます。セルサイズが等しく
            十分に大きい場合、ANOVAは中程度の違反に対して頑健です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 等分散性</p>
          <p className="mt-1 text-sm text-gray-600">
            すべてのセルにわたって分散がほぼ等しい必要があります。Levene検定で
            確認できます。群のサイズが不均等で分散が異なる場合、結果の
            信頼性が低下する可能性があります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 観測値の独立性</p>
          <p className="mt-1 text-sm text-gray-600">
            各観測値は独立でなければなりません。セルへの無作為割り当てが独立性を
            保証します。観測値が入れ子構造または反復測定の場合は、混合効果
            モデルを使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 間隔尺度または比率尺度データ</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は連続型（間隔尺度または比率尺度）でなければなりません。
            順序尺度またはカテゴリカルなアウトカムの場合は、整列順位変換
            （Aligned Rank Transform）などのノンパラメトリックな代替手法を
            検討してください。
          </p>
        </div>
      </div>

      {/* Interaction Interpretation */}
      <h3 className="text-xl font-semibold text-gray-900">
        交互作用効果の解釈
      </h3>
      <p className="text-gray-600 leading-relaxed">
        交互作用は二元配置分散分析で最も重要な部分です。有意な交互作用は、
        一方の要因の効果がもう一方の要因の水準によって異なることを意味します。
        交互作用が有意な場合、一方の要因にわたる平均差がもう一方の要因の異なる
        水準で反対のパターンを隠す可能性があるため、主効果を慎重に解釈する
        必要があります。このような場合は、全体的な主効果ではなく、単純主効果
        （各要因Bの水準における要因Aの効果など）を報告してください。
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        各効果（要因A、要因B、交互作用）を個別に報告し、{" "}
        <em>F</em>統計量、自由度、<em>p</em>値、偏イータ二乗を含めます：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            2 &times; 2 被験者間分散分析を実施した。学習方法の主効果が
            有意であった，<em>F</em>(1, 16) = 52.27, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .77。難易度の主効果も
            有意であった，<em>F</em>(1, 16) = 36.82, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .70。学習方法と難易度の
            交互作用は有意ではなかった，<em>F</em>(1, 16) = 0.33, <em>p</em> =
            .576, <em>&eta;&sup2;<sub>p</sub></em> = .02。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：要因計画では常に偏<em>&eta;&sup2;</em>（通常の{" "}
        <em>&eta;&sup2;</em>ではなく）を報告してください。<em>F</em>、<em>p</em>、{" "}
        <em>&eta;&sup2;</em>はイタリック体で表記し、効果と残差の両方の自由度を
        報告してください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある誤り
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>有意な交互作用の無視：</strong> 交互作用が有意な場合、主効果を
          単独で解釈すると誤解を招く可能性があります。常に交互作用を最初に
          確認してください。
        </li>
        <li>
          <strong>個別の一元配置分散分析の実行：</strong> 各要因を個別に分析すると
          交互作用効果を見逃し、統計的検定力を無駄にします。代わりに二元配置
          分散分析を使用してください。
        </li>
        <li>
          <strong>調整なしの不均衡デザイン：</strong> セルサイズが非常に不均衡な
          場合、標準的なType I平方和は誤解を招く結果を与える可能性があります。
          Type III平方和を検討するか、可能であれば均衡デザインを確保してください。
        </li>
        <li>
          <strong>イータ二乗と偏イータ二乗の混同：</strong> 要因計画では、分母から
          他の効果による分散を除去する偏<em>&eta;&sup2;</em>を常に報告してください。
        </li>
        <li>
          <strong>十分な標本サイズなしの多水準：</strong> 4 &times; 4 デザインは
          16個のセルを持ちます。セルあたり3つの観測値しかない場合、誤差自由度が
          非常に低くなり、統計的検定力が低下します。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの二元配置分散分析の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1">aov()</code> およびSPSS GLM
          出力と比較検証されています。実装は均衡公式平方和と{" "}
          <em>F</em>分布のためのjstatライブラリを使用しています。すべての{" "}
          <em>F</em>統計量、<em>p</em>値、偏イータ二乗値がRおよびSPSSの
          出力と一致しています。自由度は標準的な公式を使用しています：{" "}
          <em>df</em><sub>A</sub> = <em>a</em> &minus; 1,{" "}
          <em>df</em><sub>B</sub> = <em>b</em> &minus; 1,{" "}
          <em>df</em><sub>AB</sub> = (<em>a</em> &minus; 1)(<em>b</em> &minus;
          1), <em>df</em><sub>error</sub> = <em>N</em> &minus; <em>ab</em>。
        </p>
      </div>
    </section>
  );
}

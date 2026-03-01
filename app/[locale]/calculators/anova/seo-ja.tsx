export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        分散分析（ANOVA）とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        分散分析（ANOVA: Analysis of Variance）は、3つ以上の独立した群の平均を
        比較し、統計的に有意な差があるかどうかを判断するための基本的な統計手法です。
        t検定は一度に2群しか比較できないのに対し、ANOVAは単一の統合的な検定で
        複数の群を同時に比較することができ&mdash;複数のペアワイズt検定を
        実施した場合に増大する第1種の過誤率を効果的に制御します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        この手法は、Sir Ronald A. Fisherが1920年代にイギリスのRothamsted実験
        農場で勤務していた際に開発しました。Fisherは作物の収穫量に複数の処理を
        適用する農業実験を分析するためにANOVAを開発しました。1925年の著書
        <em>Statistical Methods for Research Workers</em>でF分布とF検定を
        導入し&mdash;これは彼の名にちなんだもので&mdash;今日のすべてのANOVAの
        数学的基盤として残っています。その後の一世紀にわたり、ANOVAは心理学、
        医学、教育学、生物学、マーケティングなど、ほぼすべての実証的研究分野
        における主要な分析手法となりました。
      </p>
      <p className="text-gray-600 leading-relaxed">
        ANOVAは根本的に、データの総変動を2つの要素に分割します：{" "}
        <strong>群間分散</strong>（群平均間の差異による変動）と{" "}
        <strong>群内分散</strong>（各群内の個人差による変動。誤差分散または
        残差分散とも呼ばれます）。この2つの分散推定値の比が{" "}
        <em>F</em>統計量を生成します。群間分散が群内分散よりも十分に大きい場合、
        <em>F</em>値が大きくなり、対応する<em>p</em>値が
        小さくなります&mdash;これは少なくとも1つの群平均が他の群と有意に
        異なることを示します。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        一元配置分散分析：単一要因デザイン
      </h3>
      <p className="text-gray-600 leading-relaxed">
        一元配置分散分析（単一要因分散分析とも呼ばれます）は、1つの独立変数
        （要因）のみがある場合に、3つ以上の独立した群の平均が異なるかを検定します。
        例えば、臨床研究者が3種類の薬物治療の疼痛緩和スコアを比較したり、
        教育者が4種類の教授法の試験成績を比較したりすることができます。
        「一元配置」という名称は、1つのグループ化変数のみを検討することを
        示しています。2つ以上の要因（例：薬物の種類<em>と</em>用量）がある
        場合は、二元配置または要因分散分析が必要であり、この計算機の範囲外です。
      </p>
      <p className="text-gray-600 leading-relaxed">
        一元配置分散分析は、2つの自由度を持つ単一の<em>F</em>統計量を算出
        します：<em>df</em><sub>群間</sub>（群数 - 1）と{" "}
        <em>df</em><sub>群内</sub>（総標本サイズ - 群数）。有意な{" "}
        <em>F</em>値は、少なくとも1つの群平均が異なることを示しますが、{" "}
        <em>どの</em>群が互いに異なるかは示しません。それが事後検定の役割です。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        事後検定：特定の群間差の特定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        総括的ANOVA <em>F</em>検定が統計的に有意である場合、群平均がすべて
        等しくないことはわかりますが&mdash;具体的にどの群のペアが異なるかを
        特定するには事後検定（ラテン語で「この後」の意）が必要です。この
        計算機は、最も広く使用され保守的な事後検定法の1つである{" "}
        <strong>Bonferroni補正</strong>を使用します。Bonferroni法は、
        希望する有意水準（通常 .05）をペアワイズ比較の回数で割ることで、
        多重比較を行っても全体の族別過誤率が .05未満に維持されるようにします。
        3群の場合、3つのペアワイズ比較があるため、各比較は
        &alpha; = .05 / 3 = .0167で評価されます。この保守性は偽陽性を
        防止しますが、群が多い場合、TukeyのHSDよりもやや低い検定力を示す
        ことがあります。
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：3種類の薬物治療の比較
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          製薬研究者が、2種類の活性薬物とプラセボの疼痛軽減効果（0&ndash;100
          視覚的アナログスケールで測定）を比較しようとしています。30名の
          患者が3群のいずれかに無作為に割り当てられました（<em>n</em> = 各群10名）。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              薬物 A (n = 10)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              72, 68, 75, 71, 69, 74, 70, 73, 67, 71
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 71.00, <em>SD</em> = 2.58
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              薬物 B (n = 10)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              65, 60, 63, 62, 67, 64, 61, 66, 63, 59
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 63.00, <em>SD</em> = 2.62
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              プラセボ (n = 10)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              55, 58, 52, 57, 54, 59, 53, 56, 51, 55
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 55.00, <em>SD</em> = 2.62
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            分散分析要約表
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">変動因</th>
                  <th className="py-1 text-left font-medium text-gray-600">SS</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>df</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">MS</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>F</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">群間</td>
                  <td className="py-1 text-gray-700">1280.00</td>
                  <td className="py-1 text-gray-700">2</td>
                  <td className="py-1 text-gray-700">640.00</td>
                  <td className="py-1 text-gray-700">93.18</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">群内</td>
                  <td className="py-1 text-gray-700">185.40</td>
                  <td className="py-1 text-gray-700">27</td>
                  <td className="py-1 text-gray-700">6.87</td>
                  <td className="py-1 text-gray-700"></td>
                  <td className="py-1 text-gray-700"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em>(2, 27) = 93.18, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;</em> = .87
          </p>
          <p className="mt-2 text-sm text-gray-600">
            効果量（<em>&eta;&sup2;</em> = .87）は非常に大きく、疼痛スコアの
            総分散の約87%が群の所属によって説明されることを示しています。
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            Bonferroni事後検定比較
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">比較</th>
                  <th className="py-1 text-left font-medium text-gray-600">平均差</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em>（補正後）</th>
                  <th className="py-1 text-left font-medium text-gray-600">有意？</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">薬物 A vs. 薬物 B</td>
                  <td className="py-1 text-gray-700">8.00</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">はい</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">薬物 A vs. プラセボ</td>
                  <td className="py-1 text-gray-700">16.00</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">はい</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">薬物 B vs. プラセボ</td>
                  <td className="py-1 text-gray-700">8.00</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">はい</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Bonferroni補正後、3つのペアワイズ比較すべてが統計的に有意でした。
            薬物Aが最も高い疼痛軽減を示し、次いで薬物B、プラセボ群が最も少ない
            改善を報告しました。
          </p>
        </div>
      </div>

      {/* When to Use ANOVA vs Other Tests */}
      <h3 className="text-xl font-semibold text-gray-900">
        ANOVAと他の検定の使い分け
      </h3>
      <p className="text-gray-600 leading-relaxed">
        適切な統計検定の選択は、群数、データの性質、測定が独立かまたは反復かに
        よって異なります。以下の表は、最も一般的な状況と各状況に推奨される検定を
        まとめたものです。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">状況</th>
              <th className="py-2 text-left font-semibold">群数</th>
              <th className="py-2 text-left font-semibold">推奨される検定</th>
              <th className="py-2 text-left font-semibold">備考</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 text-gray-700">2つの独立した群の平均比較</td>
              <td className="py-2 text-gray-700">2</td>
              <td className="py-2 font-medium">独立標本t検定</td>
              <td className="py-2 text-gray-500">Welchのt検定をデフォルトとして推奨</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">3つ以上の独立した群の平均比較</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">一元配置分散分析</td>
              <td className="py-2 text-gray-500">有意な場合は事後検定で追跡分析</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">非正規データ、3つ以上の独立群</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">Kruskal-Wallis H検定</td>
              <td className="py-2 text-gray-500">一元配置ANOVAのノンパラメトリック代替法</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">同一被験者で3つ以上の条件を測定</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">反復測定分散分析</td>
              <td className="py-2 text-gray-500">被験者内の相関を考慮</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">非正規の反復測定、3つ以上の条件</td>
              <td className="py-2 text-gray-700">3+</td>
              <td className="py-2 font-medium">Friedman検定</td>
              <td className="py-2 text-gray-500">反復測定ANOVAのノンパラメトリック代替法</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-700">2つ以上の要因を同時に分析</td>
              <td className="py-2 text-gray-700">多様</td>
              <td className="py-2 font-medium">二元配置 / 要因分散分析</td>
              <td className="py-2 text-gray-500">主効果と交互作用の検定</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        よくある間違いは、3つ以上の群がある場合にANOVAの代わりに複数のt検定を
        実施することです。3群の場合、各 &alpha; = .05 で3つのペアワイズt検定が
        必要となります。少なくとも1つの偽陽性が生じる確率は約
        1 &minus; (1 &minus; .05)<sup>3</sup> = .14で、意図した過誤率の
        約3倍です。ANOVAは、すべての群を単一の総括検定で検証することでこの
        問題を回避します。
      </p>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        一元配置分散分析の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        ANOVAの結果を解釈する前に、以下の4つの前提条件が合理的に満たされて
        いるかを確認する必要があります。これらの前提条件に違反すると、不正確な
        <em>p</em>値と信頼できない結論につながる可能性があります。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 観測の独立性</p>
          <p className="mt-1 text-sm text-gray-600">
            各観測は他のすべての観測と独立でなければなりません。これは、ある
            参加者のスコアが他の参加者のスコアに影響を与えてはならないことを
            意味します。独立性は、適切な実験デザイン&mdash;群への無作為割り当て
            および参加者のクラスタリングやネスティングの排除&mdash;によって
            保証されます。違反は教室研究（同じクラスの学生は独立でない）や
            縦断的デザインで一般的です。観測が独立でない場合は、混合効果モデルや
            反復測定分散分析を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 正規性</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は各群内でおおよそ正規分布に従う必要があります。ヒストグラムや
            Q-Qプロットを用いて視覚的に、またはShapiro-Wilk検定を用いて正式に
            正規性を評価できます。ただし、ANOVAは中心極限定理のおかげで、標本
            サイズが中程度以上（おおよそ各群 <em>n</em> &ge; 20）の場合、正規性
            の違反に対して非常に頑健です。小標本かつ強く歪んだデータの場合は、
            ノンパラメトリックな代替法であるKruskal-Wallis H検定を使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 等分散性（分散の均一性）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数の分散はすべての群でおおよそ等しい必要があります。この仮定は
            <strong>Levene検定</strong>を用いて検証します：非有意なLevene検定
            （<em>p</em> &gt; .05）は、分散が十分に均一であることを示唆します。
            経験則として、群サイズが等しい場合、ANOVAは不均等な分散に対して
            頑健です。群サイズが不均等でLevene検定が有意な場合は、等分散を仮定
            しない<strong>WelchのANOVA</strong>やBrown-Forsythe検定を代替として
            検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 間隔尺度または比率尺度
          </p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は連続型尺度（間隔尺度または比率尺度）で測定されている必要が
            あります。ANOVAは平均と分散の計算に依存しており、これは連続型データ
            でのみ意味を持ちます。従属変数が順序型（例：順位やリッカート尺度の
            項目）の場合は、Kruskal-Wallis検定を使用してください。結果が
            カテゴリ型（例：合格/不合格）の場合は、カイ二乗検定を使用してください。
          </p>
        </div>
      </div>

      {/* Effect Size */}
      <h3 className="text-xl font-semibold text-gray-900">
        イータ二乗（<em>&eta;&sup2;</em>）効果量の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>p</em>値は群間差が統計的に有意かどうかを示す一方、{" "}
        <strong>イータ二乗</strong>（<em>&eta;&sup2;</em>）は実用的な観点から
        その差がどの程度大きいかを示します。イータ二乗は、従属変数の総分散のうち
        群の所属によって説明される割合を表します。計算式は{" "}
        <em>&eta;&sup2;</em> = SS<sub>群間</sub> / SS<sub>総</sub>です。
        例えば、<em>&eta;&sup2;</em> = .14は、スコアの変動性の14%がグループ化
        変数に起因することを意味します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        効果量の報告は不可欠です。十分に大きな標本では、些細な小さな差でも
        有意な<em>p</em>値を生み出す可能性があるためです。Cohen（1988）は{" "}
        <em>&eta;&sup2;</em>の解釈のために以下の広く使用される基準を
        提示しました：
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">
                <em>&eta;&sup2;</em> の値
              </th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">実用的意味</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">0.01</td>
              <td className="py-2">小さい効果</td>
              <td className="py-2 text-gray-500">
                約1%の分散説明；群間差はわずか
              </td>
            </tr>
            <tr>
              <td className="py-2">0.06</td>
              <td className="py-2">中程度の効果</td>
              <td className="py-2 text-gray-500">
                約6%の分散説明；意味のある顕著な差
              </td>
            </tr>
            <tr>
              <td className="py-2">0.14</td>
              <td className="py-2">大きい効果</td>
              <td className="py-2 text-gray-500">
                約14%以上の分散説明；実質的で重要な差
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        注意：一部の研究者は、特に複雑な要因デザインにおいて、バイアスの少ない
        代替指標として<strong>偏イータ二乗</strong>
        （<em>&eta;<sub>p</sub>&sup2;</em>）や{" "}
        <strong>オメガ二乗</strong>（<em>&omega;&sup2;</em>）を好みます。
        単一要因の一元配置分散分析では、イータ二乗と偏イータ二乗は同一です。
        オメガ二乗はやや保守的な推定値を提供し、一部の学術誌で好まれています。
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式によるANOVA結果の報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインによると、ANOVAの結果には<em>F</em>統計量、
        2つの自由度、<em>p</em>値、効果量の指標を含める必要があります。各群の
        記述統計量（平均と標準偏差）も報告すべきです。以下は計算例を含む
        テンプレートです：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            総括F検定（一元配置分散分析）
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            一元配置分散分析の結果、3つの治療条件間で疼痛軽減スコアに統計的に
            有意な差が認められた、<em>F</em>(2, 27) = 93.18, <em>p</em> &lt;
            .001, <em>&eta;&sup2;</em> = .87。薬物A（<em>M</em> = 71.00,{" "}
            <em>SD</em> = 2.58）が薬物B（<em>M</em> = 63.00, <em>SD</em> =
            2.62）およびプラセボ（<em>M</em> = 55.00, <em>SD</em> = 2.62）
            よりも有意に高いスコアを示した。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            事後検定比較（Bonferroni）
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            Bonferroni補正事後検定の結果、薬物A（<em>M</em> = 71.00,{" "}
            <em>SD</em> = 2.58）が薬物B（<em>M</em> = 63.00, <em>SD</em> =
            2.62）よりも有意に大きな疼痛軽減を示し、<em>p</em> &lt; .001,
            平均差 = 8.00, 95% CI [5.26, 10.74]、プラセボ（<em>M</em> = 55.00,
            {" "}<em>SD</em> = 2.62）よりも有意に大きな疼痛軽減を示した、
            <em>p</em> &lt; .001, 平均差 = 16.00, 95% CI [13.26, 18.74]。
            薬物Bもプラセボよりも有意に高いスコアを示した、<em>p</em> &lt; .001,
            平均差 = 8.00, 95% CI [5.26, 10.74]。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注意：<em>F</em>値は小数点以下2桁まで報告します。<em>p</em>値は小数点
        以下3桁まで報告し、.001未満の場合は <em>p</em> &lt; .001と表記します。
        統計記号（<em>F</em>, <em>p</em>, <em>M</em>, <em>SD</em>,{" "}
        <em>&eta;&sup2;</em>）は常にイタリック体で表記します。.001未満の場合を
        除き、可能な限り正確な<em>p</em>値（例：<em>p</em> = .034）を不等号
        （例：<em>p</em> &lt; .05）の代わりに報告してください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>ANOVAの代わりに複数のt検定を実施する：</strong> 3つ以上の
          群で補正なしにペアワイズt検定を実施すると、族別過誤率が増大します。
          例えば、5群の場合10個の比較が必要となり、実際のalphaは約 .40に
          上昇します。常に総括ANOVAから始め、<em>F</em>検定が有意な場合にのみ
          事後検定を使用してください。
        </li>
        <li>
          <strong>総括<em>F</em>が有意でない場合に事後検定を実施する：</strong>{" "}
          全体のANOVAが有意でなければ（<em>p</em> &gt; .05）、事後のペアワイズ
          比較に進むべきではありません。これは偶然を利用して偽の「有意な」差を
          生み出す可能性があります。例外は、データ収集前に定義された特定の
          <em>事前計画</em>対比がある場合です。
        </li>
        <li>
          <strong><em>p</em> = .000と報告する：</strong> 統計ソフトウェアが
          <em>p</em> = .000と表示することがありますが、常に <em>p</em> &lt;
          .001と報告すべきです。<em>p</em>値は決して正確に0になることは
          ありません&mdash;無限に小さくなり得ますが、0ではありません。
        </li>
        <li>
          <strong>効果量の無視：</strong> 統計的に有意な<em>F</em>検定でも
          <em>&eta;&sup2;</em>が小さい場合（例：.01）、群間差は存在するものの
          実用的な影響は無視できることを意味します。常に <em>&eta;&sup2;</em>を
          <em>p</em>値とともに報告し、両方を解釈してください。
        </li>
        <li>
          <strong>等分散性の仮定の無視：</strong> 群サイズが不均等で分散が
          大きく異なる場合、標準的なANOVA <em>F</em>検定は信頼できなくなります。
          結果を解釈する前にLevene検定を実施してください。有意な場合は、
          WelchのANOVAに切り替えるか、Brown-Forsythe補正を使用してください。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの一元配置分散分析の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1">aov()</code>および{" "}
          <code className="rounded bg-green-100 px-1">summary()</code>関数、
          ならびにSPSS GLM出力に対して検証されています。<em>F</em>分布に
          jstatライブラリを使用し、プールされた群内分散を用いたBonferroni補正
          ペアワイズ比較を計算します。すべての<em>F</em>統計量、<em>p</em>値、
          イータ二乗値、事後検定結果は、RおよびSPSSの出力と小数点以下4桁以上で
          一致します。自由度は標準的な公式を使用して計算します：{" "}
          <em>df</em><sub>群間</sub> = <em>k</em> &minus; 1,{" "}
          <em>df</em><sub>群内</sub> = <em>N</em> &minus; <em>k</em>、
          ここで<em>k</em>は群数、<em>N</em>は総標本サイズです。
        </p>
      </div>
    </section>
  );
}

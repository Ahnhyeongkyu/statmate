export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      {/* 1. 因子分析とは */}
      <h2 className="text-2xl font-bold text-gray-900">
        因子分析（Factor Analysis）とは
      </h2>
      <p className="text-gray-600 leading-relaxed">
        因子分析（Factor Analysis）は、多数の観測変数間に存在する相関パターンを
        分析し、少数の潜在変数（latent variable）&mdash;すなわち
        <strong>因子（factor）</strong>&mdash;でデータを縮約・説明する多変量
        統計手法です。質問紙の開発、心理測定、構成概念妥当性の検証、データの
        次元縮約など、社会科学および行動科学の幅広い分野で不可欠な手法として
        活用されています。
      </p>
      <p className="text-gray-600 leading-relaxed">
        因子分析の起源は、1904年にイギリスの心理学者
        <strong>Charles Spearman</strong>が知能検査得点間の正の相関を説明する
        ために一般知能因子（<em>g</em>）を提唱したことに遡ります。その後1930年代に
        <strong>Louis L. Thurstone</strong>が多因子分析法を発展させ、単純構造
        （simple structure）の概念と回転（rotation）の技法を導入することで、
        現代の因子分析の基礎を築きました。今日、因子分析は心理学、教育学、
        マーケティング、医学、社会学など、ほぼすべての実証研究分野で必須の
        分析手法となっています。
      </p>
      <p className="text-gray-600 leading-relaxed">
        因子分析は大きく2種類に分けられます：{" "}
        <strong>探索的因子分析（EFA, Exploratory Factor Analysis）</strong>と{" "}
        <strong>確認的因子分析（CFA, Confirmatory Factor Analysis）</strong>です。
        EFAはデータの潜在構造を事前の仮説なしに探索的に把握する際に使用され、
        新しい測定尺度の開発や予備的研究で変数のクラスタリングパターンを発見する
        のに適しています。一方、CFAは理論的に設定した因子構造が実際のデータに
        適合するかを検証する確認的な手続きであり、構造方程式モデリング（SEM）の
        測定モデル段階で主に使用されます。この計算機は{" "}
        <strong>探索的因子分析（EFA）</strong>を実行します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        因子分析の使用が適切な場面としては、以下のようなケースがあります：(1)
        質問紙や尺度を新たに開発する際、項目が意図した下位構成概念にまとまるか
        確認する場合、(2) 多数の変数を少数の因子に縮約し後続の分析（回帰分析、
        クラスター分析など）に投入する場合、(3) 構成概念妥当性（construct
        validity）を評価し測定尺度の内部構造を検証する場合、(4) 変数間の
        多重共線性を解消するために次元を縮約する場合です。
      </p>

      {/* 2. 適合性検定 */}
      <h3 className="text-xl font-semibold text-gray-900">
        適合性検定：KMO検定とBartlett検定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        因子分析を実施する前に、収集したデータが因子分析に適しているかを確認
        する必要があります。そのために2つの事前検定を使用します：{" "}
        <strong>Kaiser-Meyer-Olkin（KMO）検定</strong>と{" "}
        <strong>Bartlettの球面性検定（Bartlett&apos;s test of sphericity）</strong>
        です。
      </p>
      <p className="text-gray-600 leading-relaxed">
        <strong>KMO検定</strong>は、変数ペア間の相関が他の変数によって説明
        できる程度を示す標本妥当性の指標です。KMO値は0から1の間であり、値が
        高いほど因子分析に適しています。Kaiser（1974）が提示した解釈基準は
        以下の通りです：
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">KMO値</th>
              <th className="py-2 text-left font-semibold">評価</th>
              <th className="py-2 text-left font-semibold">解釈</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&ge; .90</td>
              <td className="py-2 font-medium">Marvelous（素晴らしい）</td>
              <td className="py-2 text-gray-500">因子分析に非常に適合</td>
            </tr>
            <tr>
              <td className="py-2">.80 &ndash; .89</td>
              <td className="py-2 font-medium">Meritorious（優秀）</td>
              <td className="py-2 text-gray-500">因子分析に適合</td>
            </tr>
            <tr>
              <td className="py-2">.70 &ndash; .79</td>
              <td className="py-2 font-medium">Middling（普通）</td>
              <td className="py-2 text-gray-500">因子分析の実施が可能</td>
            </tr>
            <tr>
              <td className="py-2">.60 &ndash; .69</td>
              <td className="py-2 font-medium">Mediocre（不十分）</td>
              <td className="py-2 text-gray-500">注意して進行、変数の見直しを推奨</td>
            </tr>
            <tr>
              <td className="py-2">.50 &ndash; .59</td>
              <td className="py-2 font-medium">Miserable（不良）</td>
              <td className="py-2 text-gray-500">因子分析にはほぼ不適合</td>
            </tr>
            <tr>
              <td className="py-2">&lt; .50</td>
              <td className="py-2 font-medium">Unacceptable（不可）</td>
              <td className="py-2 text-gray-500">因子分析の実施不可、変数の再構成が必要</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 leading-relaxed">
        <strong>Bartlettの球面性検定</strong>は、相関行列が単位行列（identity
        matrix）と等しいかをカイ二乗（&chi;&sup2;）検定で確認します。帰無仮説は
        &quot;すべての変数間の相関が0である&quot;（すなわち、相関行列 = 単位行列）
        です。<em>p</em> &lt; .05で帰無仮説が棄却されれば、変数間に有意な相関が
        存在し、因子分析を進めることができます。Bartlett検定が有意でなければ、
        変数が互いに独立であるため因子を抽出する根拠がありません。
      </p>

      {/* 3. 抽出方法 */}
      <h3 className="text-xl font-semibold text-gray-900">
        因子抽出方法：PCA vs PAF
      </h3>
      <p className="text-gray-600 leading-relaxed">
        因子分析で最もよく使用される2つの抽出方法は、{" "}
        <strong>主成分分析（PCA, Principal Component Analysis）</strong>と{" "}
        <strong>主因子法（PAF, Principal Axis Factoring）</strong>です。
        両手法は哲学的背景と分析目的が異なります：
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">PCA（主成分分析）</th>
              <th className="py-2 text-left font-semibold">PAF（主因子法）</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium text-gray-700">哲学</td>
              <td className="py-2">
                観測変数の<strong>総分散</strong>を最大限に説明する成分を抽出
              </td>
              <td className="py-2">
                変数間の<strong>共通分散</strong>のみを説明する潜在因子を抽出
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">対角要素</td>
              <td className="py-2">
                相関行列の対角に1.0（総分散を使用）
              </td>
              <td className="py-2">
                相関行列の対角に共通性推定値（固有分散を除外）
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">分析目的</td>
              <td className="py-2">データ縮約、次元縮約</td>
              <td className="py-2">潜在構造の探索、構成概念の発見</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">使用場面</td>
              <td className="py-2">
                変数の総分散を要約したい場合；後続分析のための合成得点が
                必要な場合
              </td>
              <td className="py-2">
                観測変数の背後にある潜在因子の構造を明らかにしたい場合；
                測定誤差を分離したい場合
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">分散の説明</td>
              <td className="py-2">
                総分散の100%を説明可能（成分数 = 変数数の場合）
              </td>
              <td className="py-2">
                共通分散のみを説明；固有分散（unique variance）は除外
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        注：厳密にはPCAは&quot;因子分析&quot;ではなく別の次元縮約手法ですが、
        実務では因子分析の抽出方法として最も広く使用されています。変数数が多く
        共通性が高い場合、PCAとPAFの結果は非常に類似します。
      </p>

      {/* 4. 因子数の決定 */}
      <h3 className="text-xl font-semibold text-gray-900">
        因子数の決定方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        因子分析において最も重要な決定の1つは、&quot;何個の因子を抽出するか&quot;
        です。因子を過剰に抽出すると解釈困難な些末な因子が含まれ、過少に抽出
        すると重要な潜在構造を見逃す可能性があります。主に使用される3つの基準は
        以下の通りです：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. Kaiser基準（固有値 &gt; 1 ルール）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Kaiser（1960）が提案したこの基準は、固有値（eigenvalue）が1より大きい
            因子のみを抽出します。固有値が1であることは、その因子が少なくとも変数
            1つ分の分散を説明していることを意味します。最も広く使用されていますが、
            変数数が多い場合に因子を過剰抽出する傾向があるため、他の基準と併用
            することが推奨されます。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. スクリープロット（Scree Plot）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Cattell（1966）が提案したスクリープロットは、固有値を因子番号の順に
            グラフにプロットし、固有値が急激に減少した後に緩やかになる
            &quot;肘（elbow）&quot;の地点を探す方法です。肘の地点の左側の
            因子数を抽出します。視覚的な判断が必要なため主観的になり得ますが、
            実務ではKaiser基準の補完として非常に有用です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 平行分析（Parallel Analysis）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Horn（1965）が提案した平行分析は、同一サイズのランダムデータから
            算出された固有値と実際のデータの固有値を比較します。実際の固有値が
            ランダムな期待値より大きい因子のみを抽出します。シミュレーションに
            基づく最も正確な方法と評価されており、近年ではKaiser基準よりも
            平行分析が推奨される傾向にあります。
          </p>
        </div>
      </div>

      {/* 5. 回転方法 */}
      <h3 className="text-xl font-semibold text-gray-900">
        回転方法：Varimax vs Promax
      </h3>
      <p className="text-gray-600 leading-relaxed">
        初期の因子抽出結果は解釈が困難な場合が多くあります。因子回転は因子
        負荷量のパターンを単純化し、各変数がなるべく1つの因子にのみ高く負荷
        するよう調整する過程です。大きく{" "}
        <strong>直交回転（orthogonal rotation）</strong>と{" "}
        <strong>斜交回転（oblique rotation）</strong>に分けられます。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">Varimax（直交）</th>
              <th className="py-2 text-left font-semibold">Promax（斜交）</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium text-gray-700">因子間の相関</td>
              <td className="py-2">因子間相関を0と仮定（無相関）</td>
              <td className="py-2">因子間相関を許容（相関あり）</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">行列</td>
              <td className="py-2">因子負荷行列を1つのみ算出</td>
              <td className="py-2">
                パターン行列（pattern matrix）と構造行列（structure matrix）を算出
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">解釈</td>
              <td className="py-2">単純で直感的</td>
              <td className="py-2">より複雑だが現実的</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">使用場面</td>
              <td className="py-2">
                因子間の独立性が理論的に支持される場合；単純な構造が必要な場合
              </td>
              <td className="py-2">
                因子間の相関が想定される場合（社会科学の変数の大半）；より
                現実的なモデルが必要な場合
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">利点</td>
              <td className="py-2">解釈が容易、分散説明割合の合算が可能</td>
              <td className="py-2">
                因子間相関を反映しより正確な構造把握が可能
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        注：斜交回転における<strong>パターン行列（pattern matrix）</strong>は
        他の因子の影響を統制した後の固有の寄与を表し、{" "}
        <strong>構造行列（structure matrix）</strong>は因子間相関を含む全体の
        相関を表します。因子の解釈には一般的にパターン行列を基準とします。
        因子間相関が.32未満であれば直交回転（Varimax）を、.32以上であれば
        斜交回転（Promax）を使用するのが一般的なガイドラインです
        （Tabachnick &amp; Fidell, 2013）。
      </p>

      {/* 6. 計算例 */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：性格質問紙8項目の因子分析
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が性格特性を測定する8つの項目（5件法リッカート尺度）を30名の
          大学生に実施しました。項目は3つの性格次元&mdash;外向性
          （Extraversion）、誠実性（Conscientiousness）、開放性（Openness）&mdash;を
          測定するよう設計されています。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              外向性項目
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Q1: 人と交流するのが好きだ
            </p>
            <p className="text-sm text-gray-500">
              Q2: パーティーで積極的に活動する
            </p>
            <p className="text-sm text-gray-500">
              Q3: 新しい人に会うのが楽しい
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              誠実性項目
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Q4: 仕事を体系的に計画する
            </p>
            <p className="text-sm text-gray-500">
              Q5: 締め切りをよく守る
            </p>
            <p className="text-sm text-gray-500">
              Q6: 細部に注意を払う
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              開放性項目
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Q7: 新しいアイデアに関心が高い
            </p>
            <p className="text-sm text-gray-500">
              Q8: 芸術や創造的な活動を楽しむ
            </p>
          </div>
        </div>

        {/* 適合性検定結果 */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            適合性検定結果
          </p>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>
              <strong>KMO</strong> = 0.69（Mediocre&mdash;不十分だが実施可能）
            </p>
            <p>
              <strong>Bartlettの球面性検定：</strong>{" "}
              <em>&chi;&sup2;</em>(28) = 112.45、<em>p</em> &lt; .001
            </p>
            <p className="text-gray-500">
              KMOが.60以上でBartlett検定が有意であるため、因子分析を進めることが
              できます。
            </p>
          </div>
        </div>

        {/* 固有値 */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            固有値（Eigenvalues）と分散説明
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">因子</th>
                  <th className="py-1 text-left font-medium text-gray-600">固有値</th>
                  <th className="py-1 text-left font-medium text-gray-600">分散割合 (%)</th>
                  <th className="py-1 text-left font-medium text-gray-600">累積割合 (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">2.85</td>
                  <td className="py-1 text-gray-700">35.63</td>
                  <td className="py-1 text-gray-700">35.63</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">2</td>
                  <td className="py-1 text-gray-700">2.12</td>
                  <td className="py-1 text-gray-700">26.50</td>
                  <td className="py-1 text-gray-700">62.13</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">3</td>
                  <td className="py-1 text-gray-700">1.38</td>
                  <td className="py-1 text-gray-700">17.25</td>
                  <td className="py-1 text-gray-700">79.38</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-500">4</td>
                  <td className="py-1 text-gray-500">0.62</td>
                  <td className="py-1 text-gray-500">7.75</td>
                  <td className="py-1 text-gray-500">87.13</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-500">5&ndash;8</td>
                  <td className="py-1 text-gray-500">&lt; 0.50</td>
                  <td className="py-1 text-gray-500">&hellip;</td>
                  <td className="py-1 text-gray-500">100.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Kaiser基準（固有値 &gt; 1）に従い3つの因子が抽出され、全分散の
            79.38%を説明しています。
          </p>
        </div>

        {/* 因子負荷量 */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            回転後の因子負荷量（Varimax回転）
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">項目</th>
                  <th className="py-1 text-left font-medium text-gray-600">因子1（外向性）</th>
                  <th className="py-1 text-left font-medium text-gray-600">因子2（誠実性）</th>
                  <th className="py-1 text-left font-medium text-gray-600">因子3（開放性）</th>
                  <th className="py-1 text-left font-medium text-gray-600">共通性</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q1</td>
                  <td className="py-1 font-semibold text-blue-700">.82</td>
                  <td className="py-1 text-gray-400">.11</td>
                  <td className="py-1 text-gray-400">.09</td>
                  <td className="py-1 text-gray-700">.70</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q2</td>
                  <td className="py-1 font-semibold text-blue-700">.78</td>
                  <td className="py-1 text-gray-400">.15</td>
                  <td className="py-1 text-gray-400">.13</td>
                  <td className="py-1 text-gray-700">.65</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q3</td>
                  <td className="py-1 font-semibold text-blue-700">.75</td>
                  <td className="py-1 text-gray-400">.08</td>
                  <td className="py-1 text-gray-400">.22</td>
                  <td className="py-1 text-gray-700">.62</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q4</td>
                  <td className="py-1 text-gray-400">.10</td>
                  <td className="py-1 font-semibold text-blue-700">.85</td>
                  <td className="py-1 text-gray-400">.07</td>
                  <td className="py-1 text-gray-700">.74</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q5</td>
                  <td className="py-1 text-gray-400">.14</td>
                  <td className="py-1 font-semibold text-blue-700">.81</td>
                  <td className="py-1 text-gray-400">.12</td>
                  <td className="py-1 text-gray-700">.70</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q6</td>
                  <td className="py-1 text-gray-400">.09</td>
                  <td className="py-1 font-semibold text-blue-700">.76</td>
                  <td className="py-1 text-gray-400">.18</td>
                  <td className="py-1 text-gray-700">.62</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">Q7</td>
                  <td className="py-1 text-gray-400">.18</td>
                  <td className="py-1 text-gray-400">.12</td>
                  <td className="py-1 font-semibold text-blue-700">.83</td>
                  <td className="py-1 text-gray-700">.74</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">Q8</td>
                  <td className="py-1 text-gray-400">.15</td>
                  <td className="py-1 text-gray-400">.10</td>
                  <td className="py-1 font-semibold text-blue-700">.79</td>
                  <td className="py-1 text-gray-700">.66</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            太字の青色の値は、当該因子への負荷量が.40以上の場合を示しています。
            すべての項目が意図した因子に明確に負荷しており、交差負荷
            （cross-loading）のないクリーンな単純構造を示しています。
          </p>
        </div>

        {/* 結果要約 */}
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果要約</p>
          <p className="mt-1 text-sm text-gray-600">
            3つの因子が抽出され、全分散の79.38%を説明しています。
            因子1（外向性）は35.63%、因子2（誠実性）は26.50%、因子3（開放性）は
            17.25%の分散をそれぞれ説明しています。共通性（communality）の範囲は
            .62&ndash;.74であり、すべての項目が抽出された因子によって適切に
            説明されていることを示しています。
          </p>
        </div>
      </div>

      {/* 7. 結果の解釈 */}
      <h3 className="text-xl font-semibold text-gray-900">
        結果の解釈方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        因子分析の結果を解釈する際に注意すべき3つの核心的な指標があります：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. 因子負荷量（Factor Loadings）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            因子負荷量は各観測変数と潜在因子の間の相関係数です。絶対値が大きい
            ほど、その変数が当該因子に強く寄与しています。一般的に
            <strong>.40以上</strong>で意味のある負荷と見なし、.70以上で強い負荷と
            解釈します。.30未満の負荷量は通常無視します。各変数が1つの因子にのみ
            高く負荷するパターンが理想的です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 交差負荷（Cross-Loadings）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            交差負荷とは、1つの変数が2つ以上の因子に.32以上の負荷量を示す場合を
            指します。交差負荷がある項目はどの因子に帰属させるか曖昧になるため、
            解釈が困難になります。このような項目は削除するか、項目内容を修正する
            ことを検討する必要があります。交差負荷が多い場合は、因子数を再検討
            するか回転方法を変更する必要があります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 共通性（Communalities）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            共通性は各変数の分散のうち、抽出された因子によって説明される割合です。
            値は0から1の間であり、.40以上であればその変数が因子構造に十分含まれて
            いることを意味します。共通性が非常に低い変数（.20未満）はどの因子とも
            関連が弱いため、分析からの除外を検討する必要があります。PCAでの
            初期共通性は常に1.0であり、PAFではSMC（Squared Multiple Correlation）を
            初期推定値として使用します。
          </p>
        </div>
      </div>

      {/* 8. APA形式の報告 */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版ガイドラインに従い因子分析の結果を報告する際は、使用した抽出方法、
        回転方法、因子数決定基準、KMOおよびBartlett検定結果、因子負荷量、分散
        説明割合を含める必要があります。以下は計算例に基づく報告テンプレートです：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            報告例
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            8つの性格項目に対して主成分分析（PCA）とVarimax直交回転を用いた
            探索的因子分析を実施した。標本妥当性を確認するためにKaiser-Meyer-Olkin
            検定を行った結果、KMO = .69で因子分析に許容可能な水準であり、
            Bartlettの球面性検定は統計的に有意であった、
            <em>&chi;&sup2;</em>(28) = 112.45、<em>p</em> &lt; .001。
            Kaiser基準（固有値 &gt; 1）に従い3つの因子が抽出され、全分散の
            79.38%を説明した。因子1（外向性）は35.63%、因子2（誠実性）は
            26.50%、因子3（開放性）は17.25%の分散を説明した。すべての項目は
            意図した因子に.75以上の負荷量で明確に負荷しており、交差負荷は
            観察されなかった。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            報告テンプレート（一般形）
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            ［変数数］個の項目に対して［抽出方法］と［回転方法］回転を用いた
            探索的因子分析を実施した。KMO = ［値］、Bartlettの球面性検定、{" "}
            <em>&chi;&sup2;</em>(［<em>df</em>］) = ［値］、<em>p</em> ［&lt;
            .001 または = 値］。［基準］に従い［因子数］個の因子が抽出され、
            全分散の［割合］%を説明した。因子負荷量は［範囲］であり、
            ［交差負荷の有無］であった。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：因子負荷量表は本文ではなく別の表（Table）として提示し、.40未満の
        負荷量は表から省略するか空欄にして可読性を高めます。統計記号
        （<em>&chi;&sup2;</em>、<em>p</em>、<em>df</em>）はイタリック体で
        表記し、<em>p</em>値が.001未満の場合は<em>p</em> &lt; .001と
        報告します。
      </p>

      {/* 9. よくある間違い */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>標本サイズの不足：</strong> 因子分析には十分な標本サイズが
          必要です。一般的に変数あたり最低5&ndash;10個の観測値（<em>N</em>/<em>p</em>{" "}
          &ge; 5）または全体の標本サイズ100名以上が推奨されます。標本が
          小さすぎると因子負荷量が不安定になり再現性が低下します。ComreyとLee
          （1992）は100 = 不良、200 = 普通、300 = 良好、500 = 非常に良好、
          1000 = 素晴らしいと提示しています。
        </li>
        <li>
          <strong>CFAが適切な状況でEFAを使用する：</strong> 理論的に確立された
          因子構造が既にあり、それを検証しようとする場合はEFAではなくCFAを
          使用する必要があります。EFAは探索的目的に適しており、既存の理論を
          確認するにはCFA（構造方程式モデリング）がより適切です。同一データで
          EFAにより構造を発見した後、同じデータでCFAを行うことも不適切です。
        </li>
        <li>
          <strong>因子の過剰抽出：</strong> Kaiser基準（固有値 &gt; 1）のみを
          使用すると、変数数が多い場合に因子を過剰抽出する可能性があります。
          スクリープロットや平行分析など複数の基準を併せて因子数を決定する
          必要があります。
        </li>
        <li>
          <strong>交差負荷の無視：</strong> 2つ以上の因子に.32以上で負荷する
          項目は解釈を複雑にします。このような項目を無視して強制的に1つの因子に
          割り当てると、因子構造の明確性が低下します。項目の削除または修正を
          検討する必要があります。
        </li>
        <li>
          <strong>KMOを確認せずに分析を進める：</strong> KMO値が.50未満の場合、
          変数間の相関パターンが因子抽出に不適切です。必ずKMOとBartlett検定を
          先に確認し、基準に満たない場合は変数を再構成するか項目を削除してから
          再度試行する必要があります。
        </li>
        <li>
          <strong>因子回転なしで解釈する：</strong> 回転していない初期の因子
          負荷量は解釈が困難で、単純構造を示さない場合が多くあります。必ず
          適切な回転方法を適用した後に因子を解釈する必要があります。
        </li>
      </ul>

      {/* 10. 計算精度 */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの因子分析計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1">psych::fa()</code>{" "}
          関数および{" "}
          <code className="rounded bg-green-100 px-1">psych::principal()</code>{" "}
          関数、ならびにSPSS Factor Analysisの出力との交差検証が行われています。
          KMO検定は{" "}
          <code className="rounded bg-green-100 px-1">psych::KMO()</code>、
          Bartlett検定は{" "}
          <code className="rounded bg-green-100 px-1">psych::cortest.bartlett()</code>
          と同一のアルゴリズムを使用しています。固有値、因子負荷量、共通性、
          分散説明割合、回転後の負荷量はすべてRおよびSPSSの出力と小数第4位
          以上で一致しています。Varimax回転はKaiser正規化を適用し、Promax回転は
          kappa = 4をデフォルト値として使用しています。
        </p>
      </div>
    </section>
  );
}

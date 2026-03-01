export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        単回帰分析とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        単回帰分析（Simple Linear Regression）は、1つの独立変数（X）と従属変数（Y）
        の関係を、観測データに直線を当てはめることでモデル化する統計手法です。回帰
        方程式は <em>&#x177; = b&#x2080; + b&#x2081;x</em> の形式をとり、
        <em>b&#x2080;</em>はy切片、<em>b&#x2081;</em>は回帰直線の傾きを表します。
        この手法は<strong>最小二乗法（OLS）</strong>を用いてパラメータを推定し、
        観測値と予測値の差の二乗和を最小化します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        回帰分析は1880年代に<strong>Francis Galton</strong>卿が遺伝的身長に関する
        研究で開拓し、子どもの身長が母集団平均に&quot;回帰&quot;する傾向を観察した
        ことに由来します。その後、<strong>Karl Pearson</strong>と{" "}
        <strong>Ronald Fisher</strong>が現代の回帰分析で使用される推測統計
        （F検定、係数に対するt検定）の数学的枠組みを確立しました。今日、単回帰
        分析は統計学において最も基本的なツールの一つであり、重回帰分析、分散分析
        （ANOVA）、そして多くの機械学習アルゴリズムの基礎となっています。
      </p>

      {/* Key Concepts */}
      <h3 className="text-xl font-semibold text-gray-900">
        線形回帰の主要概念
      </h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            傾き（b&#x2081;）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            傾きはXが1単位増加したときのYの予測変化量を表します。正の傾きは正の
            関係（Xが増加するとYも増加）を、負の傾きは逆の関係を示します。傾きの
            有意性は自由度 n - 2 のt検定で検定します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            切片（b&#x2080;）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            切片はXが0のときのYの予測値です。多くの実用場面ではX = 0が意味を
            持たないことがあるため（例：身長から体重を予測する場合）、切片は慎重に
            解釈する必要があります。切片の主な役割は回帰直線を正しい位置に配置する
            ことです。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            推定の標準誤差
          </p>
          <p className="mt-1 text-sm text-gray-600">
            推定の標準誤差（SEE）は、観測値と回帰直線の間の平均距離を測定します。
            値が小さいほどデータポイントが回帰直線の周りに密集していることを示し、
            予測精度が高いことを意味します。
          </p>
        </div>
      </div>

      {/* R-squared */}
      <h3 className="text-xl font-semibold text-gray-900">
        R&sup2;（決定係数）の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        R&sup2;は独立変数によって説明される従属変数の分散の割合を表します。0から1
        の範囲をとり、0はモデルが変動性を全く説明しないこと、1はすべての変動性を
        説明することを意味します。調整済みR&sup2;は予測変数の数を考慮し、モデル
        間の比較に特に有用です。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">R&sup2; 値</th>
              <th className="py-2 text-left font-semibold">解釈</th>
              <th className="py-2 text-left font-semibold">実質的な意味</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">&lt; 0.10</td>
              <td className="py-2">非常に弱い</td>
              <td className="py-2 text-gray-500">
                モデルの説明力がほとんどない; Xは弱い予測変数
              </td>
            </tr>
            <tr>
              <td className="py-2">0.10 &ndash; 0.30</td>
              <td className="py-2">弱い</td>
              <td className="py-2 text-gray-500">
                小さいが潜在的に意味のある予測力
              </td>
            </tr>
            <tr>
              <td className="py-2">0.30 &ndash; 0.50</td>
              <td className="py-2">中程度</td>
              <td className="py-2 text-gray-500">
                意味のある予測; 多くの社会科学研究で有用
              </td>
            </tr>
            <tr>
              <td className="py-2">0.50 &ndash; 0.70</td>
              <td className="py-2">強い</td>
              <td className="py-2 text-gray-500">
                かなりの予測精度; 良好なモデル適合度
              </td>
            </tr>
            <tr>
              <td className="py-2">&gt; 0.70</td>
              <td className="py-2">非常に強い</td>
              <td className="py-2 text-gray-500">
                優れたモデル適合度; XはYの強力な予測変数
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        注：これらの基準は一般的なガイドラインです。物理学や工学の分野ではR&sup2;
        値が0.90以上であることが一般的です。心理学や社会科学ではR&sup2;値が
        0.20&ndash;0.40でも意味のある水準と見なされることが多いです。
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：学習時間による試験得点の予測
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が大学生10名を対象に、学習時間が試験成績を予測するかどうかを
          調査します。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              学習時間 (X)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              試験得点 (Y)
            </p>
            <p className="mt-1 text-sm text-gray-500">
              2.1, 4.0, 5.8, 8.2, 9.8, 12.1, 14.0, 15.9, 18.2, 19.8
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em>(1, 8) = 2854.88, <em>p</em> &lt; .001, <em>R</em>&sup2;
            = .997
          </p>
          <p className="mt-1 text-sm text-gray-600">
            &#x177; = 0.04 + 1.97x
          </p>
          <p className="mt-2 text-sm text-gray-600">
            モデルは統計的に有意であり、試験得点の分散の99.7%を説明しています。
            学習時間が1時間増えるごとに、予測される試験得点は約1.97点増加します。
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        単回帰分析の仮定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        回帰分析の結果を解釈する前に、以下の仮定が満たされているか確認する必要が
        あります。仮定の違反は、偏った推定値、不正確な標準誤差、無効な推論に
        つながる可能性があります。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 線形性</p>
          <p className="mt-1 text-sm text-gray-600">
            XとYの間の関係は線形でなければなりません。データの散布図を確認し、関係が
            曲線的（例：二次、対数）であれば変数の変換や多項式回帰を検討してください。
            残差プロットで0の周りにランダムな分散が見られれば線形性を支持します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 誤差の独立性
          </p>
          <p className="mt-1 text-sm text-gray-600">
            残差（誤差）は互いに独立でなければなりません。これは連続する観測値が
            相関する可能性がある時系列データで特に重要です（自己相関）。
            Durbin-Watson検定で自己相関を検出でき、値が2に近ければ自己相関が
            ないことを示します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 残差の正規性
          </p>
          <p className="mt-1 text-sm text-gray-600">
            残差は近似的に正規分布に従う必要があります。この仮定は仮説検定と信頼
            区間の構成に重要です。Q-Qプロットやシャピロ・ウィルク検定で正規性を
            確認してください。大標本（n &gt; 30）では中心極限定理により、軽度の
            非正規性に対して回帰分析は頑健です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 等分散性（分散の均一性）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            残差の分散はXのすべての水準でほぼ一定でなければなりません。残差対
            予測値プロットで残差の散らばりがおおむね同じであるべきです。散らばりが
            扇形に広がる場合（不均一分散）、加重最小二乗法やロバスト標準誤差の
            使用を検討してください。
          </p>
        </div>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での回帰分析結果の報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインに従い、回帰分析の結果には自由度を含むF統計量、
        p値、R&sup2;、回帰方程式、および個々の係数の統計量を含める必要があります。
        以下は使用できるテンプレートです。
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            単回帰分析
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            学習時間から試験得点を予測するために単回帰分析を実施した。モデルは
            統計的に有意であった、<em>F</em>(1, 8) = 2854.88, <em>p</em> &lt; .001,
            {" "}
            <em>R</em>&sup2; = .997。学習時間は試験得点を有意に予測した、
            <em>b</em> = 1.97, <em>t</em>(8) = 53.43, <em>p</em> &lt; .001,
            95% CI [1.88, 2.05]。学習時間が1時間追加されるごとに、試験得点は
            平均1.97点増加した。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            非有意の結果
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            1日のスクリーンタイムから幸福度スコアを予測するために単回帰分析を
            実施した。モデルは統計的に有意ではなかった、<em>F</em>(1, 48) = 1.23,
            {" "}
            <em>p</em> = .274, <em>R</em>&sup2; = .025。スクリーンタイムは幸福度
            スコアを有意に予測しなかった、<em>b</em> = -0.15, <em>t</em>(48) =
            -1.11, <em>p</em> = .274, 95% CI [-0.42, 0.12]。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：回帰係数、t値、F値は小数点第2位まで報告します。p値は小数点第3位まで
        報告しますが、.001未満の場合は <em>p</em> &lt; .001と表記します。R&sup2;
        と主要係数の95%信頼区間を必ず含めてください。
      </p>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        回帰分析と他の検定：使い分けの指針
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
              <td className="py-2">予測変数1つ、連続型結果変数1つ</td>
              <td className="py-2 font-medium">
                単回帰分析
              </td>
            </tr>
            <tr>
              <td className="py-2">
                予測変数が複数、連続型結果変数1つ
              </td>
              <td className="py-2">重回帰分析</td>
            </tr>
            <tr>
              <td className="py-2">
                関係の強さのみを把握（予測は不要）
              </td>
              <td className="py-2">Pearson / Spearman 相関分析</td>
            </tr>
            <tr>
              <td className="py-2">二値型結果変数</td>
              <td className="py-2">ロジスティック回帰</td>
            </tr>
            <tr>
              <td className="py-2">非線形の関係</td>
              <td className="py-2">
                多項式回帰またはデータ変換
              </td>
            </tr>
            <tr>
              <td className="py-2">
                群間の平均比較（カテゴリカル予測変数）
              </td>
              <td className="py-2">t検定または分散分析（ANOVA）</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>データ範囲外への外挿：</strong> 回帰方程式は観測されたX値の範囲
          内でのみ有効です。この範囲を大きく超えたX値に対してYを予測すること
          （外挿）は、信頼性が低く誤解を招く結果を生む可能性があります。
        </li>
        <li>
          <strong>仮定の無視：</strong> 回帰分析の結果は、線形性、独立性、正規性、
          等分散性の仮定が満たされている場合にのみ信頼できます。モデルを解釈する
          前に必ず残差プロットを確認してください。
        </li>
        <li>
          <strong>相関と因果の混同：</strong> 有意な回帰結果はXがYを引き起こすこと
          を証明するものではありません。因果的な表現には注意し、交絡変数を考慮して
          ください。因果関係はランダム化実験のみが確立できます。
        </li>
        <li>
          <strong>R&sup2;の過大解釈：</strong> 高いR&sup2;が必ずしもモデルが正確
          または有用であることを意味するわけではありません。関係が依然として非線形
          である可能性や、モデルが外れ値に左右されている可能性があります。逆に、
          低いR&sup2;がXが重要でないことを意味するわけでもありません。
        </li>
        <li>
          <strong><em>p</em> = .000と報告する誤り：</strong> 統計ソフトウェアが
          p = .000と表示することがありますが、これは必ず <em>p</em> &lt; .001と
          報告してください。p値は決して正確に0にはなりません。
        </li>
      </ul>

      {/* Calculation Accuracy */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの回帰分析計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            lm()
          </code>{" "}
          および{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            summary.lm()
          </code>{" "}
          関数と照合して検証されています。標準正規方程式を使用してOLS回帰を計算し、
          jstatライブラリの確率分布を活用してF統計量、t統計量、信頼区間を導出
          します。すべての結果はRの出力と小数点第4位まで一致しています。
        </p>
      </div>
    </section>
  );
}

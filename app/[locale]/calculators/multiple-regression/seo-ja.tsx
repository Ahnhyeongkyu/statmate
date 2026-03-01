export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        重回帰分析とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        重回帰分析（Multiple Regression Analysis）は、2つ以上の独立変数
        （予測変数）が1つの連続型従属変数（結果変数）に与える影響を同時に
        分析する統計手法です。単回帰分析が1つの予測変数のみを扱うのに対し、
        重回帰分析は複数の予測変数を1つのモデルに組み込むことで、各変数の
        独立した寄与を評価できます&mdash;これは現実世界の複雑な現象をより
        正確に説明するために不可欠です。
      </p>
      <p className="text-gray-600 leading-relaxed">
        回帰分析の歴史は、19世紀後半に Francis Galton が親と子の身長の関係を
        研究し、&quot;平均への回帰（regression toward the mean）&quot;という
        概念を導入したことに始まります。その後 Karl Pearson とその弟子たちが
        数学的基礎を確立し、20世紀初頭に R. A. Fisher が最小二乗法（OLS,
        Ordinary Least Squares）の統計的性質を体系化しました。OLSは観測値と
        予測値の間の残差二乗和を最小化する回帰係数を推定する方法であり&mdash;
        今日でも重回帰分析の中心的な推定法として広く使用されています。
      </p>
      <p className="text-gray-600 leading-relaxed">
        重回帰分析は以下のような状況で使用します：（1）複数の予測変数が結果
        変数にそれぞれどの程度寄与しているかを把握したい場合、（2）他の変数を
        統制した状態で特定の変数の純粋な効果を推定したい場合、（3）複数の変数の
        情報を総合して結果を予測するモデルを構築したい場合。回帰モデルの一般式は{" "}
        <em>Y</em> = <em>b</em><sub>0</sub> +{" "}
        <em>b</em><sub>1</sub><em>X</em><sub>1</sub> +{" "}
        <em>b</em><sub>2</sub><em>X</em><sub>2</sub> + &hellip; +{" "}
        <em>b</em><sub>k</sub><em>X</em><sub>k</sub> + <em>e</em> であり、
        ここで <em>b</em><sub>0</sub> は切片、<em>b</em><sub>1</sub>&hellip;
        <em>b</em><sub>k</sub> は各予測変数の非標準化回帰係数、{" "}
        <em>e</em> は残差（誤差）です。
      </p>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：GPA（成績評価）の予測
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          教育研究者が大学生30名のデータを収集し、<strong>学習
          時間</strong>（週あたり時間）、<strong>睡眠時間</strong>（1日平均時間）、{" "}
          <strong>出席率</strong>（%）がGPA（成績評価、4.5満点）に与える影響を
          分析します。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              記述統計の要約
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-1 text-left font-medium text-gray-600">変数</th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>M</em></th>
                    <th className="py-1 text-left font-medium text-gray-600"><em>SD</em></th>
                    <th className="py-1 text-left font-medium text-gray-600">範囲</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">GPA</td>
                    <td className="py-1 text-gray-700">3.25</td>
                    <td className="py-1 text-gray-700">0.58</td>
                    <td className="py-1 text-gray-700">1.80&ndash;4.30</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">学習時間</td>
                    <td className="py-1 text-gray-700">14.50</td>
                    <td className="py-1 text-gray-700">5.20</td>
                    <td className="py-1 text-gray-700">3&ndash;28</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 text-gray-700">睡眠時間</td>
                    <td className="py-1 text-gray-700">6.80</td>
                    <td className="py-1 text-gray-700">1.10</td>
                    <td className="py-1 text-gray-700">4.5&ndash;9.0</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-700">出席率 (%)</td>
                    <td className="py-1 text-gray-700">82.00</td>
                    <td className="py-1 text-gray-700">12.50</td>
                    <td className="py-1 text-gray-700">45&ndash;100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">
              相関行列
            </p>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-1 text-left font-medium text-gray-600"></th>
                    <th className="py-1 text-left font-medium text-gray-600">GPA</th>
                    <th className="py-1 text-left font-medium text-gray-600">学習</th>
                    <th className="py-1 text-left font-medium text-gray-600">睡眠</th>
                    <th className="py-1 text-left font-medium text-gray-600">出席</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 font-medium text-gray-700">GPA</td>
                    <td className="py-1 text-gray-700">1.00</td>
                    <td className="py-1 text-gray-700">.72</td>
                    <td className="py-1 text-gray-700">.38</td>
                    <td className="py-1 text-gray-700">.65</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 font-medium text-gray-700">学習</td>
                    <td className="py-1 text-gray-700">.72</td>
                    <td className="py-1 text-gray-700">1.00</td>
                    <td className="py-1 text-gray-700">.15</td>
                    <td className="py-1 text-gray-700">.45</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1 font-medium text-gray-700">睡眠</td>
                    <td className="py-1 text-gray-700">.38</td>
                    <td className="py-1 text-gray-700">.15</td>
                    <td className="py-1 text-gray-700">1.00</td>
                    <td className="py-1 text-gray-700">.10</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-gray-700">出席</td>
                    <td className="py-1 text-gray-700">.65</td>
                    <td className="py-1 text-gray-700">.45</td>
                    <td className="py-1 text-gray-700">.10</td>
                    <td className="py-1 text-gray-700">1.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            回帰係数表
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">予測変数</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>B</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>SE</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>&beta;</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>t</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">VIF</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">（切片）</td>
                  <td className="py-1 text-gray-700">-0.52</td>
                  <td className="py-1 text-gray-700">0.41</td>
                  <td className="py-1 text-gray-700">&mdash;</td>
                  <td className="py-1 text-gray-700">-1.27</td>
                  <td className="py-1 text-gray-700">.216</td>
                  <td className="py-1 text-gray-700">&mdash;</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">学習時間</td>
                  <td className="py-1 text-gray-700">0.055</td>
                  <td className="py-1 text-gray-700">0.010</td>
                  <td className="py-1 text-gray-700">.49</td>
                  <td className="py-1 text-gray-700">5.50</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">1.26</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">睡眠時間</td>
                  <td className="py-1 text-gray-700">0.112</td>
                  <td className="py-1 text-gray-700">0.038</td>
                  <td className="py-1 text-gray-700">.21</td>
                  <td className="py-1 text-gray-700">2.95</td>
                  <td className="py-1 text-gray-700">.007</td>
                  <td className="py-1 text-gray-700">1.03</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">出席率</td>
                  <td className="py-1 text-gray-700">0.018</td>
                  <td className="py-1 text-gray-700">0.004</td>
                  <td className="py-1 text-gray-700">.33</td>
                  <td className="py-1 text-gray-700">4.50</td>
                  <td className="py-1 text-gray-700">&lt; .001</td>
                  <td className="py-1 text-gray-700">1.25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">モデル適合度</p>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>
              <em>R</em>&sup2; = .72, 調整済み <em>R</em>&sup2; = .69
            </p>
            <p>
              <em>F</em>(3, 26) = 22.29, <em>p</em> &lt; .001
            </p>
            <p>Durbin-Watson = 1.95</p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果の解釈</p>
          <p className="mt-1 text-sm text-gray-600">
            回帰モデルは全体として有意であり（<em>F</em>(3, 26) = 22.29,{" "}
            <em>p</em> &lt; .001）、GPAの分散の約72%を説明しています。3つの予測
            変数すべてが統計的に有意な寄与を示しました。標準化係数（<em>&beta;</em>）を
            比較すると、学習時間（<em>&beta;</em> = .49）がGPAに最も大きな相対的
            影響力を持ち、出席率（<em>&beta;</em> = .33）、睡眠
            時間（<em>&beta;</em> = .21）の順です。すべてのVIF値が1.3未満であり
            多重共線性の問題はなく、Durbin-Watson統計量（1.95）は残差の独立性
            仮定が満たされていることを示しています。
          </p>
        </div>
      </div>

      {/* Key Statistics */}
      <h3 className="text-xl font-semibold text-gray-900">
        主要統計量の理解
      </h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            R&sup2; と 調整済みR&sup2;（Adjusted R&sup2;）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <em>R</em>&sup2;（決定係数）は、従属変数の分散のうちモデルが説明する
            割合を表します。しかし <em>R</em>&sup2; は予測変数を追加するほど
            常に増加するという問題があります&mdash;無意味な変数を投入しても値が
            上がります。<strong>調整済み <em>R</em>&sup2;</strong> は予測変数の
            数と標本サイズを考慮してペナルティを与えるため、モデル間の比較に
            より適しています。調整済み <em>R</em>&sup2; が <em>R</em>&sup2; よりも
            著しく低い場合、不要な予測変数が含まれている可能性を示唆します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            F検定（モデル全体の有意性）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em> 検定は、モデルに含まれるすべての予測変数が同時に0であるか
            （すなわち、モデルが結果を全く予測できないか）を検定します。{" "}
            <em>F</em> 統計量が大きく <em>p</em> 値が小さければ（&lt; .05）、
            モデルが全体として有意であると結論づけます。ただし <em>F</em> 検定が
            有意であっても<strong>すべて</strong>の予測変数が有意であるとは限らない
            ため、個別の <em>t</em> 検定も必ず確認する必要があります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            個別予測変数のt検定
          </p>
          <p className="mt-1 text-sm text-gray-600">
            各予測変数に対する <em>t</em> 検定は、他の予測変数を統制した状態で
            当該変数の回帰係数が0と有意に異なるかを検定します。
            <em>t</em> = <em>B</em> / <em>SE</em> で計算され、{" "}
            <em>p</em> 値が.05未満であれば、その予測変数がモデルに有意な寄与を
            していると解釈します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            標準化係数（<em>&beta;</em>）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            非標準化係数（<em>B</em>）は予測変数の元の単位で解釈されるため、異なる
            変数間の相対的重要度を直接比較できません。標準化係数（<em>&beta;</em>）は
            すべての変数を <em>z</em> 得点に変換した後の係数であるため、
            <em>&beta;</em> の絶対値が大きいほど当該変数の相対的影響力が大きいと
            解釈します。例えば <em>&beta;</em> = .49 は <em>&beta;</em> = .21
            よりも結果変数に対する影響力が約2.3倍大きいことを意味します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            VIF（分散拡大係数, Variance Inflation Factor）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            VIF は予測変数間の多重共線性（multicollinearity）の程度を測定します。
            VIF = 1 はその変数が他の予測変数と全く相関がないことを意味し、VIF が
            大きくなるほど共線性が深刻です。一般的に{" "}
            <strong>VIF &lt; 10</strong> であれば許容範囲とされ、{" "}
            <strong>VIF &lt; 5</strong> を推奨する研究者も多くいます。VIF が高い
            場合は、当該変数の除外や主成分分析の使用を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            Durbin-Watson 統計量
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Durbin-Watson 統計量は残差の自己相関（autocorrelation）を検定します。
            値の範囲は0&ndash;4であり、<strong>2に近いほど</strong>自己相関が
            ないことを示します。一般的に1.5&ndash;2.5の範囲であれば残差の独立性
            仮定が満たされたと判断します。0に近ければ正の自己相関、4に近ければ
            負の自己相関を示唆し&mdash;時系列データや反復測定デザインでは特に
            注意が必要です。
          </p>
        </div>
      </div>

      {/* Multiple Regression vs Other Analyses */}
      <h3 className="text-xl font-semibold text-gray-900">
        重回帰分析と他の分析手法の比較
      </h3>
      <p className="text-gray-600 leading-relaxed">
        研究デザインと変数の特性に応じて、適切な分析手法が異なります。以下の表は
        重回帰分析と類似する分析手法を比較しています。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">分析手法</th>
              <th className="py-2 text-left font-semibold">独立変数</th>
              <th className="py-2 text-left font-semibold">従属変数</th>
              <th className="py-2 text-left font-semibold">使用場面</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">単回帰</td>
              <td className="py-2 text-gray-700">連続型1つ</td>
              <td className="py-2 text-gray-700">連続型</td>
              <td className="py-2 text-gray-500">
                単一の予測変数と結果変数の関係分析
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">重回帰</td>
              <td className="py-2 text-gray-700">連続型2つ以上</td>
              <td className="py-2 text-gray-700">連続型</td>
              <td className="py-2 text-gray-500">
                複数の予測変数の同時効果の分析と予測
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">ロジスティック回帰</td>
              <td className="py-2 text-gray-700">連続型 / カテゴリカル</td>
              <td className="py-2 text-gray-700">二値型 (0/1)</td>
              <td className="py-2 text-gray-500">
                合格/不合格、疾患の有無など二値型結果の予測
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">分散分析（ANOVA）</td>
              <td className="py-2 text-gray-700">カテゴリカル（群）</td>
              <td className="py-2 text-gray-700">連続型</td>
              <td className="py-2 text-gray-500">
                3群以上の平均値の差の比較
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        注：重回帰分析にダミーコーディングされたカテゴリカル変数を含めると、
        ANOVAと同一の結果を得ることができます。実際、ANOVAは回帰分析の特殊な
        ケースと見なすことができ、一般線形モデル（GLM）の枠組みの中で両方の
        アプローチは数学的に等価です。
      </p>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        重回帰分析の仮定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        重回帰分析の結果を信頼するためには、以下の6つの仮定が合理的に満たされて
        いる必要があります。これらの仮定の違反は、偏った推定値、不正確な{" "}
        <em>p</em> 値、または誤った結論につながる可能性があります。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 線形性（Linearity）</p>
          <p className="mt-1 text-sm text-gray-600">
            各予測変数と従属変数の間の関係が線形でなければなりません。残差対予測値
            の散布図を確認し、曲線パターンがないか検討します。非線形関係がある場合は
            変数変換（対数、平方根など）や多項式回帰を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 観測の独立性（Independence）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            各観測は他の観測と独立でなければなりません。時系列データ、クラスター標本
            （同じ学校の学生など）、反復測定デザインでは、この仮定が違反される可能性が
            あります。Durbin-Watson統計量（1.5&ndash;2.5）で残差の独立性を確認
            します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 残差の正規性（Normality of Residuals）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            残差（観測値 - 予測値）が正規分布に従う必要があります。残差のヒストグラム
            やQ-Qプロットで確認できます。標本サイズが十分に大きければ（一般的に{" "}
            <em>N</em> &ge; 30）、中心極限定理によりこの仮定の違反に対して頑健です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 等分散性（Homoscedasticity）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            残差の分散が予測値のすべての水準で一定でなければなりません。残差対
            予測値の散布図で&quot;ラッパ型&quot;（分散が徐々に大きくなるパターン）が
            見られる場合は不均一分散（heteroscedasticity）が存在します。この場合、
            加重最小二乗法（WLS）やロバスト標準誤差を使用します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            5. 多重共線性なし（No Multicollinearity）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            予測変数間に過度の相関があってはなりません。多重共線性が深刻な場合、
            回帰係数の標準誤差が膨張し、個別変数の効果を正確に推定できなくなります。
            <strong>VIF &lt; 10</strong>（保守的には &lt; 5）を基準とし、
            予測変数間の相関係数が |<em>r</em>| &gt; .80 であれば注意が必要です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            6. 自己相関なし（No Autocorrelation）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            残差同士が互いに相関していてはなりません。Durbin-Watson統計量が
            約 <strong>2</strong> に近ければ自己相関がないと判断します。
            時系列データで自己相関が検出された場合は、時差変数の追加や
            一般化最小二乗法（GLS）の使用を検討します。
          </p>
        </div>
      </div>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版のガイドラインに従い、重回帰分析の結果にはモデルの <em>R</em>&sup2;、{" "}
        <em>F</em> 統計量、各予測変数の非標準化係数（<em>B</em>）、標準化
        係数（<em>&beta;</em>）、<em>t</em> 統計量、<em>p</em> 値を含める
        必要があります。以下はテンプレートと計算例です。
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            報告テンプレート
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            [予測変数リスト]が[従属変数]に与える影響を検証するために重回帰分析を
            実施した。回帰モデルは統計的に有意であり、{" "}
            <em>F</em>(<em>df</em><sub>回帰</sub>,{" "}
            <em>df</em><sub>残差</sub>) = [<em>F</em>値], <em>p</em> [&lt; .001
            または = 正確な値], <em>R</em>&sup2; = [値], 調整済み{" "}
            <em>R</em>&sup2; = [値]。[各予測変数の <em>B</em>、{" "}
            <em>&beta;</em>、<em>t</em>、<em>p</em> を報告]。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            計算例の報告
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            学習時間、睡眠時間、出席率が大学生のGPAに与える影響を検証するために
            重回帰分析を実施した。回帰モデルは統計的に有意であり、
            <em>F</em>(3, 26) = 22.29, <em>p</em> &lt; .001,{" "}
            <em>R</em>&sup2; = .72, 調整済み <em>R</em>&sup2; = .69 で、
            モデルはGPAの分散の約72%を説明した。学習時間（<em>B</em> = 0.055,{" "}
            <em>&beta;</em> = .49, <em>t</em> = 5.50, <em>p</em> &lt; .001）、
            出席率（<em>B</em> = 0.018, <em>&beta;</em> = .33, <em>t</em> =
            4.50, <em>p</em> &lt; .001）、睡眠時間（<em>B</em> = 0.112,{" "}
            <em>&beta;</em> = .21, <em>t</em> = 2.95, <em>p</em> = .007）
            のすべてがGPAを有意に予測した。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：<em>F</em> 値と <em>t</em> 値は小数点第2位まで報告します。
        <em>p</em> 値は小数点第3位まで報告しますが、.001未満の場合は{" "}
        <em>p</em> &lt; .001 と表記します。<em>R</em>&sup2; は小数点第2位まで
        報告します。統計記号（<em>F</em>、<em>t</em>、<em>p</em>、{" "}
        <em>R</em>&sup2;、<em>B</em>、<em>&beta;</em>）は常にイタリック体で
        表記します。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>過学習（Overfitting）：</strong> 標本サイズに対して予測変数が
          多すぎると、モデルが現在のデータのノイズまで学習してしまい、新しいデータに
          対する予測力が低下します。経験的に{" "}
          <strong><em>N</em>/<em>k</em> &gt; 10</strong>（標本サイズ対予測変数数
          の比率が10以上）が推奨されており、一部の研究者は{" "}
          <em>N</em>/<em>k</em> &gt; 20 を推奨しています。例えば予測変数が5つ
          であれば、最低50名以上の標本が必要です。
        </li>
        <li>
          <strong>多重共線性の無視：</strong> 予測変数間の高い相関（例：
          |<em>r</em>| &gt; .80）を確認せずに分析を進めると、回帰係数の符号が
          逆転したり、有意でないと表示される可能性があります。必ずVIFを確認し、
          共線性が深刻な変数は1つを除外するか合成得点を作成してください。
        </li>
        <li>
          <strong><em>B</em> と <em>&beta;</em> の混同：</strong>{" "}
          非標準化係数（<em>B</em>）は元の単位での解釈に使用し、標準化係数
          （<em>&beta;</em>）は変数間の相対的重要度の比較に使用します。両者を
          混同すると誤った解釈になります。例えば「学習時間が1時間増加するとGPAが
          0.055増加する」は <em>B</em> の解釈であり、「学習時間がGPAに最も大きな
          影響を与える」は <em>&beta;</em> の解釈です。
        </li>
        <li>
          <strong>ステップワイズ回帰の落とし穴：</strong> 自動変数選択法（前進、
          後退、ステップワイズ）は便利ですが、標本固有の結果を産出して交差妥当性が
          低く、第一種過誤率が増加し、理論に基づかないモデルを生成する可能性が
          あります。可能な限り理論的根拠に基づいた変数選択を推奨します。
        </li>
        <li>
          <strong>因果関係の過大解釈：</strong> 回帰分析は基本的に変数間の{" "}
          <strong>関連性</strong>を分析する手法であり、実験デザインでない限り
          因果関係を主張することはできません。「XがYに影響を与える」よりも
          「XがYを有意に予測する」という表現がより適切です。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの重回帰分析の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1">lm()</code> 関数および
          SPSSの回帰分析出力と照合して検証されています。最小二乗法（OLS）を使用して
          回帰係数を推定し、<em>F</em> 分布と <em>t</em> 分布にjstatライブラリを
          使用しています。すべての回帰係数、標準誤差、<em>t</em> 統計量、
          <em>p</em> 値、<em>R</em>&sup2;、調整済み <em>R</em>&sup2;、
          <em>F</em> 統計量、VIF、Durbin-Watson統計量は、RおよびSPSSの出力と
          小数点第4位以上まで一致しています。95%信頼区間は <em>t</em> 分布の
          臨界値を使用して正確に計算されます。
        </p>
      </div>
    </section>
  );
}

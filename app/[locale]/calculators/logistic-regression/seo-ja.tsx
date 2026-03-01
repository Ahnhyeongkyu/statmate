export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        二項ロジスティック回帰分析とは
      </h2>
      <p className="text-gray-600 leading-relaxed">
        二項ロジスティック回帰分析（Binary Logistic Regression）は、1つ以上の
        予測変数（独立変数）と二値（二分型）結果変数との関係をモデル化する統計
        手法です。線形回帰が連続型の結果を予測するのに対し、ロジスティック回帰は
        観測値が2つのカテゴリ（0と1にコード化）のいずれに属するかの
        <strong>確率</strong>を予測します。このモデルはロジスティック（シグモイド）
        関数を使用して、予測確率を0と1の間に制約します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        ロジスティック回帰の歴史は、1838年にベルギーの数学者
        Pierre-Fran&ccedil;ois Verhulstが人口増加をモデル化するために
        ロジスティック関数を導入したことに遡ります。その後、1944年にJoseph
        Berksonが&quot;logit&quot;という用語を造り、David Coxが1958年にこれを
        統計的回帰フレームワークとして確立し、現代のロジスティック回帰分析の
        基盤が築かれました。今日、ロジスティック回帰は医学（疾病発生予測）、
        マーケティング（購買行動予測）、社会科学（投票行動分析）など、ほぼ
        すべての分野で中核的な分類手法として使用されています。
      </p>
      <p className="text-gray-600 leading-relaxed">
        ロジスティック回帰の核心は<strong>対数オッズ（logit）</strong>変換です。
        結果変数の確率<em>p</em>を直接モデル化する代わりに、オッズの自然対数を
        線形関数としてモデル化します：logit(<em>p</em>) = ln(<em>p</em> / (1 &minus;{" "}
        <em>p</em>)) = <em>B</em><sub>0</sub> + <em>B</em><sub>1</sub>
        <em>X</em><sub>1</sub> + <em>B</em><sub>2</sub><em>X</em>
        <sub>2</sub> + &hellip;。この変換により左辺は&minus;&infin;から
        +&infin;までの範囲を持ち、シグモイド関数<em>p</em> = 1 / (1 +
        e<sup>&minus;z</sup>)を通じて0&ndash;1の確率に逆変換されます。
      </p>
      <p className="text-gray-600 leading-relaxed">
        モデルの係数推定には<strong>最尤推定法</strong>（Maximum Likelihood
        Estimation, MLE）が使用されます。線形回帰の最小二乗法とは異なり、MLEは
        観測データが出現する尤度（likelihood）を最大化する係数を反復的に探索
        します。具体的には<strong>IRLS</strong>（Iteratively Reweighted Least
        Squares）アルゴリズムが使用され、これはRの{" "}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">
          glm()
        </code>{" "}
        関数やSPSSで使用されるものと同一の手法です。IRLSは各反復で重みを更新し、
        収束基準（tolerance）を満たすまで係数を改善していきます。
      </p>

      {/* 核心概念 */}
      <h3 className="text-xl font-semibold text-gray-900">
        主要概念
      </h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            オッズ比（Odds Ratio）&mdash; Exp(B)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            オッズ比は、予測変数が1単位増加した場合の結果発生オッズの乗法的変化を
            表します。オッズ比が1より大きい場合、その予測変数が増加するほど結果
            発生のオッズが増加することを、1より小さい場合はオッズが減少することを
            意味します。正確に1であれば、予測変数が結果に影響を及ぼさないことを
            意味します。例えば、Exp(<em>B</em>) = 1.5は、予測変数が1単位増加する
            と結果発生のオッズが50%増加することを意味します。オッズ比の95%信頼
            区間が1を含む場合は統計的に有意ではありません。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">Wald検定</p>
          <p className="mt-1 text-sm text-gray-600">
            Wald検定は、個々の予測変数が統計的に有意であるかを評価します。回帰
            係数を標準誤差で割った比率の二乗（Wald = (<em>B</em> /{" "}
            <em>SE</em>)&sup2;）で計算され、自由度1のカイ二乗分布に従います。
            Wald統計量の<em>p</em>値が有意水準（一般的に.05）より小さい場合、
            その予測変数がモデルに有意な寄与をしていると結論づけます。ただし、
            係数が非常に大きい場合や分離（separation）問題がある場合、Wald検定
            は保守的（第二種の過誤が増加）になる可能性があるため注意が必要です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            疑似R&sup2;（Pseudo R&sup2;）指標
          </p>
          <p className="mt-1 text-sm text-gray-600">
            線形回帰とは異なり、ロジスティック回帰には真のR&sup2;は存在しません。
            代わりにモデルの説明力を近似する複数の疑似R&sup2;指標が使用されます。
            <strong>Cox &amp; Snell R&sup2;</strong>はモデルの尤度比に基づきますが、
            最大値が1に達しないという限界があります。{" "}
            <strong>Nagelkerke R&sup2;</strong>はCox &amp; Snellの値を調整して
            0から1の範囲を持つようにしたもので、解釈がより直観的です。一般的に
            Nagelkerke R&sup2;を報告し、値が大きいほどモデルの説明力が高いと
            解釈します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            総括検定（Omnibus Test）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            総括カイ二乗検定（Omnibus Test of Model Coefficients）は、すべての
            予測変数を含むモデルが切片のみの帰無モデル（null model）よりも有意に
            優れているかを評価します。この検定は2つのモデルの&minus;2対数尤度の
            差をカイ二乗統計量として使用し、自由度はモデルに含まれる予測変数の
            数です。総括検定が有意であれば（<em>p</em> &lt; .05）、少なくとも1つ
            の予測変数が結果予測に有意な寄与をしていることを意味します。
          </p>
        </div>
      </div>

      {/* 計算例 */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：年齢とBMIによる疾病発生予測
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          医学研究者が年齢（歳）とBMI（kg/m&sup2;）を用いて特定疾病の発生有無
          （0 = 非発生、1 = 発生）を予測しようとしています。30名の患者データを
          収集し、二項ロジスティック回帰分析を実施しました。
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            モデル要約
          </p>
          <p className="mt-1 text-sm text-gray-600">
            &minus;2対数尤度 = 24.31、Cox &amp; Snell R&sup2; = .35、
            Nagelkerke R&sup2; = .47
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            総括検定（Omnibus Test）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <em>&chi;</em>&sup2;(2) = 13.05、<em>p</em> = .001 &mdash;
            モデルが帰無モデルよりも有意に優れています。
          </p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">
            回帰係数表
          </p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-1 text-left font-medium text-gray-600">変数</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>B</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>SE</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">Wald</th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>df</em></th>
                  <th className="py-1 text-left font-medium text-gray-600"><em>p</em></th>
                  <th className="py-1 text-left font-medium text-gray-600">Exp(<em>B</em>)</th>
                  <th className="py-1 text-left font-medium text-gray-600">95% CI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">年齢</td>
                  <td className="py-1 text-gray-700">0.12</td>
                  <td className="py-1 text-gray-700">0.05</td>
                  <td className="py-1 text-gray-700">5.76</td>
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">.016</td>
                  <td className="py-1 text-gray-700">1.13</td>
                  <td className="py-1 text-gray-700">[1.02, 1.25]</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-1 text-gray-700">BMI</td>
                  <td className="py-1 text-gray-700">0.28</td>
                  <td className="py-1 text-gray-700">0.11</td>
                  <td className="py-1 text-gray-700">6.48</td>
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">.011</td>
                  <td className="py-1 text-gray-700">1.32</td>
                  <td className="py-1 text-gray-700">[1.07, 1.64]</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-700">定数</td>
                  <td className="py-1 text-gray-700">&minus;12.45</td>
                  <td className="py-1 text-gray-700">4.21</td>
                  <td className="py-1 text-gray-700">8.74</td>
                  <td className="py-1 text-gray-700">1</td>
                  <td className="py-1 text-gray-700">.003</td>
                  <td className="py-1 text-gray-700">0.00</td>
                  <td className="py-1 text-gray-700">&mdash;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果の解釈</p>
          <p className="mt-1 text-sm text-gray-600">
            年齢とBMIの両方が疾病発生の有意な予測変数です。年齢が1歳増加すると
            疾病発生のオッズが13%増加し（Exp(<em>B</em>) = 1.13）、BMIが1単位
            増加すると疾病発生のオッズが32%増加します（Exp(<em>B</em>) = 1.32）。
            Nagelkerke R&sup2; = .47は、モデルが結果の変動の約47%を説明して
            いることを示しています。
          </p>
        </div>
      </div>

      {/* 分類表の理解 */}
      <h3 className="text-xl font-semibold text-gray-900">
        分類表の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        分類表（Classification Table、混同行列とも呼ばれる）は、モデルが予測した
        カテゴリと実際に観察されたカテゴリを比較して、モデルの分類性能を評価
        します。一般的に確率カットオフ0.5を基準として、予測確率が0.5以上であれば
        1（発生）、未満であれば0（非発生）に分類します。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            感度（Sensitivity）&mdash; 真陽性率
          </p>
          <p className="mt-1 text-sm text-gray-600">
            実際の陽性（1）の中でモデルが正確に陽性と予測した割合です。感度 =
            真陽性 / (真陽性 + 偽陰性)。医学における疾病スクリーニング検査の場合、
            高い感度が重要です&mdash;疾病を有する患者を見逃さないようにする必要が
            あるためです。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            特異度（Specificity）&mdash; 真陰性率
          </p>
          <p className="mt-1 text-sm text-gray-600">
            実際の陰性（0）の中でモデルが正確に陰性と予測した割合です。特異度 =
            真陰性 / (真陰性 + 偽陽性)。高い特異度は、健常者を誤って患者として
            分類する誤りを減らします。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">全体精度</p>
          <p className="mt-1 text-sm text-gray-600">
            全事例のうち正確に分類された割合です。全体精度 = (真陽性 + 真陰性) /
            総事例数。ただし、カテゴリの比率が不均衡な場合（例：陽性10%、陰性
            90%）、全体精度だけではモデルの性能を判断しにくくなります&mdash;
            すべての事例を陰性と予測しても90%の精度を達成できるためです。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            確率カットオフ（Cutoff）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            デフォルトのカットオフは0.5ですが、研究目的に応じて調整できます。
            カットオフを低くすると（例：0.3）感度が高くなりますが特異度が低下し、
            カットオフを高くすると（例：0.7）特異度が高くなりますが感度が低下
            します。最適なカットオフはROC曲線分析や研究の文脈（偽陽性と偽陰性の
            コスト）を考慮して決定します。
          </p>
        </div>
      </div>

      {/* Hosmer-Lemeshow適合度検定 */}
      <h3 className="text-xl font-semibold text-gray-900">
        Hosmer-Lemeshow適合度検定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Hosmer-Lemeshow検定は、ロジスティック回帰モデルがデータにどの程度適合
        しているかを評価する代表的な方法です。この検定は、観測値を予測確率に
        基づいて通常10個の同サイズの群（十分位数）に分け、各群内で観測された
        頻度とモデルが予測した期待頻度を比較します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        観測頻度と期待頻度の差を総合したカイ二乗統計量が計算され、自由度は
        通常8（群数 &minus; 2）です。検定結果の解釈は他の適合度検定とは異なり
        ます：<strong>非有意な結果</strong>（<em>p</em> &gt; .05）が望ましく、
        これはモデルの予測が観測データと一致していることを示します。逆に有意な
        結果（<em>p</em> &le; .05）は、モデルの適合度が不十分であることを
        示唆します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        ただし、Hosmer-Lemeshow検定には限界があります。標本サイズが非常に大きい
        と些細な差異でも有意になることがあり、逆に標本サイズが小さいと深刻な
        適合不足を検出できないことがあります。また、群の数や構成方法によって
        結果が異なる場合があります。そのため、この検定結果を他の適合度指標
        （疑似R&sup2;、分類表の精度など）と合わせて総合的に解釈することが
        推奨されます。
      </p>

      {/* ロジスティック回帰 vs 他の分析 */}
      <h3 className="text-xl font-semibold text-gray-900">
        ロジスティック回帰 vs 他の分析手法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        二値結果変数を分析する方法は複数あります。以下の表は、ロジスティック回帰
        と関連分析手法の主な特徴を比較しています。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">分析手法</th>
              <th className="py-2 text-left font-semibold">結果変数の型</th>
              <th className="py-2 text-left font-semibold">リンク関数</th>
              <th className="py-2 text-left font-semibold">主な特徴</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2 font-medium">ロジスティック回帰</td>
              <td className="py-2 text-gray-700">二値（0/1）</td>
              <td className="py-2 text-gray-700">ロジット（logit）</td>
              <td className="py-2 text-gray-500">
                オッズ比を提供、最も広く使用、分布仮定が最小限
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">プロビット回帰</td>
              <td className="py-2 text-gray-700">二値（0/1）</td>
              <td className="py-2 text-gray-700">プロビット（&Phi;）</td>
              <td className="py-2 text-gray-500">
                潜在正規分布を仮定、疫学研究で選好
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">判別分析</td>
              <td className="py-2 text-gray-700">カテゴリ（2つ以上）</td>
              <td className="py-2 text-gray-700">&mdash;</td>
              <td className="py-2 text-gray-500">
                多変量正規性と等分散性を仮定、連続型予測変数のみ
              </td>
            </tr>
            <tr>
              <td className="py-2 font-medium">重回帰分析</td>
              <td className="py-2 text-gray-700">連続型</td>
              <td className="py-2 text-gray-700">恒等（identity）</td>
              <td className="py-2 text-gray-500">
                連続型結果変数に適する、二値結果には不適切
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        二値結果変数に重回帰を適用すると（線形確率モデル）、予測値が0&ndash;1
        の範囲を逸脱する可能性があり、誤差項の不等分散性の問題が発生します。
        そのため、二値結果変数にはロジスティック回帰を使用するのが標準的な
        アプローチです。
      </p>

      {/* 仮定 */}
      <h3 className="text-xl font-semibold text-gray-900">
        二項ロジスティック回帰の仮定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        ロジスティック回帰の結果を正しく解釈するためには、以下の仮定が合理的に
        充足されている必要があります。これらの仮定に違反すると、偏った推定値、
        不正確な<em>p</em>値、信頼できない結論につながる可能性があります。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 二値結果変数</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は正確に2つのカテゴリ（0と1）を持つ必要があります。結果変数が
            3つ以上のカテゴリを持つ場合は多項ロジスティック回帰を、順序のある
            カテゴリの場合は順序ロジスティック回帰を使用してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 観測の独立性</p>
          <p className="mt-1 text-sm text-gray-600">
            各観測は他の観測と独立している必要があります。反復測定やクラスタデータ
            （例：同一病院の患者）の場合は、一般化推定方程式（GEE）や混合効果
            ロジスティック回帰を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 多重共線性がないこと</p>
          <p className="mt-1 text-sm text-gray-600">
            予測変数間に高い相関がないことが必要です。多重共線性があると係数の
            標準誤差が大きくなり、個々の予測変数の効果を正確に推定できなくなり
            ます。分散膨張係数（VIF）が10以上、または相関係数の絶対値が.8以上の
            場合は多重共線性を疑う必要があります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. ロジットの線形性
          </p>
          <p className="mt-1 text-sm text-gray-600">
            連続型予測変数と結果変数の対数オッズ（logit）との間に線形関係がある
            必要があります。この仮定はBox-Tidwell検定によって確認できます。違反
            の場合は、予測変数の変換（対数、平方根など）や多項式項の追加を検討
            してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            5. 十分な標本サイズ（EPV &ge; 10）
          </p>
          <p className="mt-1 text-sm text-gray-600">
            安定した係数推定のために、<strong>事象あたりの予測変数数</strong>
            （Events Per Variable, EPV）が最低10以上である必要があります。
            つまり、頻度の少ない結果カテゴリの事例数を予測変数の数で割った値が
            10以上であることが求められます。例えば、陽性（1）が30件で予測変数が
            3つであればEPV = 10で最低基準を満たします。EPVが不足すると過適合、
            不安定な係数、収束失敗などの問題が生じる可能性があります。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            6. 完全分離がないこと
          </p>
          <p className="mt-1 text-sm text-gray-600">
            完全分離（complete separation）は、1つ以上の予測変数が結果を完全に
            予測する場合に発生します。この場合、最尤推定値が収束せず、係数が
            無限大に発散します。準完全分離（quasi-complete separation）も同様の
            問題を引き起こします。分離が検出された場合は、Firthのバイアス縮小
            ロジスティック回帰や正確ロジスティック回帰を代替として検討して
            ください。
          </p>
        </div>
      </div>

      {/* APA形式での報告方法 */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式でのロジスティック回帰結果の報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        APA第7版ガイドラインに従い、ロジスティック回帰の結果には、総括モデル
        検定結果、疑似R&sup2;、分類精度、および個々の予測変数の係数、Wald検定
        結果、オッズ比と95%信頼区間を含める必要があります。以下は報告テンプレート
        と例です：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            報告テンプレート
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            二項ロジスティック回帰分析を実施し、[結果変数]を[予測変数のリスト]で
            予測した。全体モデルは統計的に有意であり、{" "}
            <em>&chi;</em>&sup2;(<em>df</em>) = [値]、<em>p</em> = [値]、
            Nagelkerke <em>R</em>&sup2; = [値]であった。モデルは全事例の[値]%を
            正確に分類した。[予測変数]は有意な予測変数であり、{" "}
            <em>B</em> = [値]、Wald <em>&chi;</em>&sup2;(1) = [値]、{" "}
            <em>p</em> = [値]、OR = [値]、95% CI [下限, 上限]であった。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            報告例
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            二項ロジスティック回帰分析を実施し、疾病発生の有無を年齢とBMIで予測
            した。全体モデルは統計的に有意であり、{" "}
            <em>&chi;</em>&sup2;(2) = 13.05、<em>p</em> = .001、Nagelkerke{" "}
            <em>R</em>&sup2; = .47であった。モデルは全事例の80.0%を正確に分類
            した。年齢は有意な予測変数であり、<em>B</em> = 0.12、Wald{" "}
            <em>&chi;</em>&sup2;(1) = 5.76、<em>p</em> = .016、OR = 1.13、95%
            CI [1.02, 1.25]であった。BMIも有意な予測変数であり、{" "}
            <em>B</em> = 0.28、Wald <em>&chi;</em>&sup2;(1) = 6.48、{" "}
            <em>p</em> = .011、OR = 1.32、95% CI [1.07, 1.64]であった。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：統計記号（<em>B</em>、<em>p</em>、<em>&chi;</em>&sup2;、{" "}
        <em>R</em>&sup2;、OR）は常にイタリック体で表記します。<em>p</em>値は
        小数第3位まで報告し、.001未満の場合は<em>p</em> &lt; .001と表記します。
        オッズ比と95%信頼区間は必ず併せて報告してください。
      </p>

      {/* よくある間違い */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>係数を線形効果として解釈する：</strong> ロジスティック回帰の
          係数<em>B</em>は対数オッズの変化量であり、確率の線形的な変化を意味
          しません。例えば、<em>B</em> = 0.5は「確率が0.5増加する」ではなく、
          「オッズがe<sup>0.5</sup> &asymp; 1.65倍に増加する」という意味です。
          確率への効果は基準確率によって異なります。
        </li>
        <li>
          <strong>分離問題の無視：</strong> 完全分離や準完全分離が発生すると、
          係数が異常に大きくなり標準誤差が非常に大きくなります。ソフトウェアが
          警告メッセージを出力することがありますが、多くの研究者がこれを見過ごし
          ます。分離が疑われる場合は頻度分布を確認し、Firthの方法や変数除去を
          検討してください。
        </li>
        <li>
          <strong>過適合：</strong> 標本サイズに対して予測変数が多すぎると過適合
          が発生します。EPV &lt; 10の場合は特に危険です。モデルが訓練データには
          よく適合しますが、新しいデータに対する汎化能力が低下します。変数選択
          法（前進法、後退法、ステップワイズ法）を慎重に適用し、可能であれば
          交差検証を使用してください。
        </li>
        <li>
          <strong>オッズ比の未報告：</strong> 係数（<em>B</em>）と<em>p</em>値
          だけを報告し、オッズ比（Exp(<em>B</em>)）と95%信頼区間を報告しないのは
          よくある間違いです。オッズ比は効果の大きさを直観的に伝え、信頼区間は
          推定の精度を示します。APAガイドラインでもオッズ比の報告を推奨して
          います。
        </li>
        <li>
          <strong>ロジットの線形性の仮定の未確認：</strong> 連続型予測変数と
          ロジットの間の線形関係を確認しないと、モデルが非線形パターンを
          見落とす可能性があります。Box-Tidwell検定やロジット残差プロットに
          よってこの仮定を検証してください。
        </li>
        <li>
          <strong>不均衡データの無視：</strong> 結果変数のカテゴリ比率が非常に
          不均衡な場合（例：陽性5%、陰性95%）、モデルが多数カテゴリ側に偏る
          ことがあります。全体精度が高く見えても感度が非常に低い場合があるため、
          分類表の感度と特異度を必ず確認してください。
        </li>
      </ul>

      {/* 計算精度 */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのロジスティック回帰分析はIRLS（Iteratively Reweighted Least
          Squares）アルゴリズムを使用しており、これはRの{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">
            glm()
          </code>{" "}
          関数やSPSSで使用されるものと同一の手法です。各反復で収束を
          10<sup>&minus;8</sup>の許容誤差で確認し、分離検出機能を内蔵して
          います。カイ二乗確率分布にはjstatライブラリを使用しています。すべての
          回帰係数、標準誤差、Wald統計量、オッズ比、疑似R&sup2;、
          Hosmer-Lemeshow統計量はRおよびSPSSの出力と小数第4位以上一致する
          ことが検証されています。
        </p>
      </div>
    </section>
  );
}

export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        反復測定分散分析（Repeated Measures ANOVA）とは
      </h2>
      <p className="text-gray-600 leading-relaxed">
        反復測定分散分析（被験者内分散分析とも呼ばれます）は、同一の被験者が3つ
        以上の条件または時点で測定された場合に平均値を比較する統計手法です。
        独立した群を比較する一元配置分散分析とは異なり、反復測定分散分析は同一
        個人から収集された測定値間の相関を考慮するため、個人差が誤差項から
        除外され、より高い統計的検定力が得られます。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        同一の参加者が3つ以上の条件や時点で測定された場合に反復測定分散分析を
        使用します。一般的なシナリオには、時間経過に伴う変化を追跡する縦断研究、
        すべての参加者がすべての条件を経験する被験者内実験、そして患者が複数の
        治療を順番に受けるクロスオーバー臨床試験が含まれます。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        反復測定ANOVA vs 一元配置ANOVA
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">反復測定ANOVA</th>
              <th className="py-2 text-left font-semibold">一元配置ANOVA</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">デザイン</td>
              <td className="py-2">被験者内</td>
              <td className="py-2">被験者間</td>
            </tr>
            <tr>
              <td className="py-2">被験者</td>
              <td className="py-2">全条件で同一の被験者</td>
              <td className="py-2">群ごとに異なる被験者</td>
            </tr>
            <tr>
              <td className="py-2">誤差項</td>
              <td className="py-2">個人差を除去</td>
              <td className="py-2">個人差を含む</td>
            </tr>
            <tr>
              <td className="py-2">統計的検定力</td>
              <td className="py-2 font-medium">高い</td>
              <td className="py-2">低い</td>
            </tr>
            <tr>
              <td className="py-2">特有の仮定</td>
              <td className="py-2">球面性</td>
              <td className="py-2">等分散性</td>
            </tr>
            <tr>
              <td className="py-2">必要標本サイズ</td>
              <td className="py-2">小さい</td>
              <td className="py-2">大きい</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 計算例 */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：治療経過における3時点の比較
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          臨床心理士が8名の患者の不安スコア（0-100）をベースライン、治療4週間後、
          治療8週間後に測定します。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">ベースライン (n = 8)</p>
            <p className="mt-1 text-sm text-gray-500">
              45, 52, 48, 55, 50, 47, 53, 49
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 49.88, <em>SD</em> = 3.23
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">4週間後 (n = 8)</p>
            <p className="mt-1 text-sm text-gray-500">
              58, 65, 62, 68, 63, 60, 66, 61
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 62.88, <em>SD</em> = 3.23
            </p>
          </div>
          <div className="rounded-md bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">8週間後 (n = 8)</p>
            <p className="mt-1 text-sm text-gray-500">
              70, 78, 74, 80, 75, 72, 79, 73
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <em>M</em> = 75.13, <em>SD</em> = 3.56
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            <em>F</em>(2, 14) = 186.47, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .96
          </p>
          <p className="mt-2 text-sm text-gray-600">
            時間が不安スコアに及ぼす有意な効果が認められました。非常に大きな
            効果量は、被験者内分散の96%を時間が説明することを示しており、
            治療期間中に顕著な改善があったことを表しています。
          </p>
        </div>
      </div>

      {/* 仮定 */}
      <h3 className="text-xl font-semibold text-gray-900">
        反復測定分散分析の仮定
      </h3>
      <p className="text-gray-600 leading-relaxed">
        反復測定分散分析には4つの重要な仮定があります：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 正規性</p>
          <p className="mt-1 text-sm text-gray-600">
            被験者内要因の各水準において、従属変数がおおむね正規分布に従う
            必要があります。中程度の標本サイズ（n &ge; 15）ではF検定は正規性の
            違反に対して頑健です。著しく非正規なデータの場合は、ノンパラメトリックな
            代替手法であるFriedman検定の使用を検討してください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 球面性（複合対称性）</p>
          <p className="mt-1 text-sm text-gray-600">
            球面性は、すべての条件ペア間の差の分散がおおむね等しいことを要求
            します。これは等分散性の反復測定における同等概念です。Mauchlyの検定で
            この仮定を確認します。違反した場合は、自由度を調整するために
            Greenhouse-Geisser（より保守的）またはHuynh-Feldt補正を使用します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 持ち越し効果がないこと</p>
          <p className="mt-1 text-sm text-gray-600">
            ある条件の効果が次の条件に持ち越されてはなりません。参加者間で条件の
            順序をカウンターバランスすることで持ち越しを最小化できます。縦断研究
            では、これを統制することが本質的に困難です。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 間隔尺度または比率尺度データ</p>
          <p className="mt-1 text-sm text-gray-600">
            従属変数は連続尺度で測定されている必要があります。順序尺度の反復測定
            データの場合は、代わりにFriedman検定を使用してください。
          </p>
        </div>
      </div>

      {/* 球面性 */}
      <h3 className="text-xl font-semibold text-gray-900">
        球面性とGreenhouse-Geisser補正の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        球面性は反復測定分散分析に特有の重要な仮定です。球面性が違反されると、
        標準的なF検定がリベラル（偽陽性を過剰に生成）になります。
        Greenhouse-Geisser（GG）補正は、分子と分母の自由度にイプシロン
        （&epsilon;）を乗じることで調整します。イプシロンは1/(k-1)と1の間の値を
        取ります。&epsilon; = 1であれば球面性が完全に満たされています。
        &epsilon;が減少するほど補正がより厳格になり、より大きな（より保守的な）
        p値が算出されます。
      </p>

      {/* APA形式の報告 */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        <em>F</em>統計量、自由度、<em>p</em>値、偏イータ二乗を報告します。
        Greenhouse-Geisser補正が適用された場合は、補正後の自由度を報告し、
        その旨を明記します：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            補正なし（球面性充足）
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            反復測定分散分析の結果、時間が不安スコアに及ぼす有意な効果が
            認められた、<em>F</em>(2, 14) = 186.47, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .96。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">
            Greenhouse-Geisser補正適用
          </p>
          <p className="mt-1 text-sm italic text-gray-600">
            Mauchlyの検定の結果、球面性の仮定が違反された、&chi;&sup2;(2) = 8.45,{" "}
            <em>p</em> = .015。そのためGreenhouse-Geisser補正を
            適用した（&epsilon; = .62）。時間の有意な効果が認められた、{" "}
            <em>F</em>(1.24, 8.68) = 186.47, <em>p</em> &lt; .001,{" "}
            <em>&eta;&sup2;<sub>p</sub></em> = .96。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：必ずMauchlyの検定結果を報告し、球面性が違反された場合はどの補正を
        使用したかを明記してください。補正後の自由度は小数第2位まで報告します。
      </p>

      {/* よくある間違い */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある間違い
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>反復測定の代わりに一元配置分散分析を使用する：</strong>
          同一被験者が複数回測定されたにもかかわらず独立群として扱うと、
          被験者内相関が無視され、誤差項が増加し検定力が低下します。
        </li>
        <li>
          <strong>球面性を無視する：</strong> 球面性の違反を確認・補正しないと
          第一種の過誤率が増加します。必ずMauchlyの検定を報告し、必要に応じて
          補正を適用してください。
        </li>
        <li>
          <strong>観測数の不一致：</strong> すべての被験者がすべての条件のデータを
          持っている必要があります。欠測データには特別な処理（例：混合効果モデル
          または補完）が必要です。
        </li>
        <li>
          <strong>カウンターバランスの未実施：</strong> 被験者内デザインでは順序
          効果が結果を交絡させる可能性があります。可能な限り条件の順序を
          カウンターバランスしてください。
        </li>
        <li>
          <strong>効果量の省略：</strong> 有意なF検定のみでは実質的な重要性が
          伝わりません。必ず<em>p</em>値とともに偏イータ二乗を報告してください。
        </li>
      </ul>

      {/* 検証 */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの反復測定分散分析の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1">ezANOVA()</code>およびSPSS
          GLM反復測定出力との比較検証が行われています。実装は分散を条件間、
          被験者間、誤差成分に分割します。Mauchlyの検定とGreenhouse-Geisser
          イプシロンは中心化された共分散行列から計算されます。Bonferroni補正
          事後検定は調整されたアルファ水準の対応t検定を使用します。
        </p>
      </div>
    </section>
  );
}

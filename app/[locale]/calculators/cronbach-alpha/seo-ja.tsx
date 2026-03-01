export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        クロンバックのアルファ（Cronbach&apos;s Alpha）とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        クロンバックのアルファ（Cronbach&apos;s Alpha）は、質問紙や検査ツールの{" "}
        <strong>内的整合性信頼性</strong>を測定する最も広く使用される統計指標です。
        1つの構成概念（construct）を測定するために設計された複数の項目が、互いに
        どの程度一貫して同じ概念を測定しているかを評価します。アルファ値は0から1の
        範囲を取り、値が高いほど項目間の内的整合性が高いことを示します。
      </p>
      <p className="text-gray-600 leading-relaxed">
        この指標は、アメリカの心理測定学者<strong>Lee J. Cronbach</strong>が1951年に
        発表した論文&quot;Coefficient Alpha and the Internal Structure of
        Tests&quot;で初めて提案しました。Cronbachは既存の{" "}
        <strong>Kuder-Richardson公式20（KR-20）</strong>を一般化し、二値型（正解/不正解）
        項目だけでなくリッカート尺度のような多値型項目にも適用できる係数を開発しました。
        以降、クロンバックのアルファは心理学、教育学、看護学、経営学、社会科学など
        ほぼすべての分野で尺度の信頼性を報告する標準指標として定着しています。
      </p>
      <p className="text-gray-600 leading-relaxed">
        クロンバックのアルファの公式は以下の通りです：
      </p>
      <div className="rounded-md bg-gray-50 p-4">
        <p className="text-sm font-mono text-gray-700 text-center">
          <em>&alpha;</em> = (<em>k</em> / (<em>k</em> &minus; 1)) &times; (1
          &minus; &Sigma;<em>&sigma;</em><sup>2</sup><sub><em>i</em></sub> /{" "}
          <em>&sigma;</em><sup>2</sup><sub><em>t</em></sub>)
        </p>
        <p className="mt-3 text-sm text-gray-600">
          ここで<em>k</em>は項目数、<em>&sigma;</em><sup>2</sup>
          <sub><em>i</em></sub>は各項目の分散、<em>&sigma;</em><sup>2</sup>
          <sub><em>t</em></sub>は合計得点の分散です。この公式は、各項目の分散の合計が
          合計得点の分散に比べて小さいほど（つまり、項目が同じ方向に一緒に動くほど）
          アルファ値が1に近づくことを示しています。
        </p>
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：顧客満足度アンケート（5項目、20名）
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          ある研究者がオンラインショッピングサイトの顧客満足度を測定するため、5項目の
          リッカート5件法（1 = 非常に不満、5 = 非常に満足）質問紙を作成しました。
          20名の顧客に調査を実施した後、この尺度の内的整合性信頼性をクロンバックの
          アルファで検証します。
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold">項目</th>
                <th className="py-2 text-left font-semibold">内容</th>
                <th className="py-2 text-center font-semibold"><em>M</em></th>
                <th className="py-2 text-center font-semibold"><em>SD</em></th>
                <th className="py-2 text-center font-semibold"><em>&sigma;</em><sup>2</sup></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="py-2 font-medium text-gray-700">Q1</td><td className="py-2">商品の品質に満足している</td><td className="py-2 text-center">3.85</td><td className="py-2 text-center">0.93</td><td className="py-2 text-center">0.87</td></tr>
              <tr><td className="py-2 font-medium text-gray-700">Q2</td><td className="py-2">配送速度に満足している</td><td className="py-2 text-center">3.70</td><td className="py-2 text-center">1.03</td><td className="py-2 text-center">1.06</td></tr>
              <tr><td className="py-2 font-medium text-gray-700">Q3</td><td className="py-2">カスタマーサービスに満足している</td><td className="py-2 text-center">3.60</td><td className="py-2 text-center">0.88</td><td className="py-2 text-center">0.78</td></tr>
              <tr><td className="py-2 font-medium text-gray-700">Q4</td><td className="py-2">価格に見合う価値がある</td><td className="py-2 text-center">3.50</td><td className="py-2 text-center">0.95</td><td className="py-2 text-center">0.90</td></tr>
              <tr><td className="py-2 font-medium text-gray-700">Q5</td><td className="py-2">再購入の意向がある</td><td className="py-2 text-center">3.75</td><td className="py-2 text-center">1.07</td><td className="py-2 text-center">1.14</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">ステップ1：各項目の分散の合計を計算</p>
          <p className="mt-1 text-sm text-gray-600">&Sigma;<em>&sigma;</em><sup>2</sup><sub><em>i</em></sub> = 0.87 + 1.06 + 0.78 + 0.90 + 1.14 = <strong>4.75</strong></p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">ステップ2：合計得点の分散を計算</p>
          <p className="mt-1 text-sm text-gray-600">5項目の合計得点に対する分散：<em>&sigma;</em><sup>2</sup><sub><em>t</em></sub> = <strong>14.82</strong></p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">ステップ3：公式に代入</p>
          <p className="mt-1 text-sm font-mono text-gray-600"><em>&alpha;</em> = (5 / (5 &minus; 1)) &times; (1 &minus; 4.75 / 14.82)</p>
          <p className="mt-1 text-sm font-mono text-gray-600"><em>&alpha;</em> = 1.25 &times; 0.6796</p>
          <p className="mt-1 text-sm font-mono text-gray-600"><em>&alpha;</em> = <strong>0.849</strong></p>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果の解釈</p>
          <p className="mt-1 text-sm text-gray-600"><em>&alpha;</em> = .849で、GeorgeとMallery（2003）の基準に従えば<strong>&quot;良好（Good）&quot;</strong>レベルの内的整合性信頼性を示しています。すべての項目のAlpha-if-Deleted値が元のアルファ（.849）より低いため、5項目すべてが尺度の信頼性に肯定的に寄与しており、削除の必要はありません。</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900">信頼性の解釈基準</h3>
      <p className="text-gray-600 leading-relaxed">
        クロンバックのアルファ値の解釈基準は研究者によって多少異なりますが、<strong>GeorgeとMallery（2003）</strong>の分類が最も広く引用されています。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">アルファ値</th>
              <th className="py-2 text-left font-semibold">水準</th>
              <th className="py-2 text-left font-semibold">解釈</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr><td className="py-2">&ge; .90</td><td className="py-2 font-medium">優秀（Excellent）</td><td className="py-2 text-gray-500">非常に高い内的整合性。ただし &gt; .95の場合、項目の重複の可能性を確認する必要あり</td></tr>
            <tr><td className="py-2">&ge; .80</td><td className="py-2 font-medium">良好（Good）</td><td className="py-2 text-gray-500">ほとんどの研究目的に適した水準</td></tr>
            <tr><td className="py-2">&ge; .70</td><td className="py-2 font-medium">許容可能（Acceptable）</td><td className="py-2 text-gray-500">探索的研究で許容可能な最低水準</td></tr>
            <tr><td className="py-2">&ge; .60</td><td className="py-2 font-medium">疑問（Questionable）</td><td className="py-2 text-gray-500">項目の再検討が必要</td></tr>
            <tr><td className="py-2">&ge; .50</td><td className="py-2 font-medium">不良（Poor）</td><td className="py-2 text-gray-500">尺度の修正が強く推奨される</td></tr>
            <tr><td className="py-2">&lt; .50</td><td className="py-2 font-medium">不適切（Unacceptable）</td><td className="py-2 text-gray-500">尺度として使用不可。項目の全面的な再構成が必要</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-900">仮定と注意事項</h3>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 一次元性（Unidimensionality）</p>
          <p className="mt-1 text-sm text-gray-600">すべての項目が1つの潜在構成概念を測定していることを仮定します。多次元尺度では各下位尺度ごとにアルファを算出する必要があります。</p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. タウ等価性（Tau-equivalence）</p>
          <p className="mt-1 text-sm text-gray-600">すべての項目が同じ因子負荷量を持つことを仮定します。この仮定が満たされない場合、アルファは信頼性の下限値となります。McDonald&apos;s <em>&omega;</em>が代替として推奨されます。</p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 項目コーディング方向の一貫性</p>
          <p className="mt-1 text-sm text-gray-600">すべての項目は同じ方向でコーディングされている必要があります。逆転項目は必ず逆変換を行ってからアルファを計算してください。</p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">4. 最小項目数と標本サイズ</p>
          <p className="mt-1 text-sm text-gray-600">最低3項目以上が必要で、標本サイズは項目数の5&ndash;10倍以上（最低30名）が推奨されます。</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900">APA形式での報告方法</h3>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告テンプレート</p>
          <p className="mt-1 text-sm italic text-gray-600">[尺度名]の内的整合性信頼性をクロンバックのアルファで評価した。[項目数]項目で構成された本尺度の信頼性は良好な水準であった，<em>&alpha;</em> = [値]。</p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">報告例</p>
          <p className="mt-1 text-sm italic text-gray-600">顧客満足度尺度の内的整合性信頼性をクロンバックのアルファで評価した。5項目で構成された本尺度の信頼性は良好な水準であった，<em>&alpha;</em> = .85。項目削除時のアルファ分析の結果、すべての項目が尺度の信頼性に肯定的に寄与していた（範囲：.82&ndash;.84）。</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900">よくある間違い</h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li><strong>アルファが高すぎる場合を見落とす：</strong> <em>&alpha;</em> &gt; .95は項目間の冗長性を示している可能性があります。項目間相関行列を確認してください。</li>
        <li><strong>逆転項目の未処理：</strong> 逆転コーディングを怠るとアルファが人為的に低下します。分析前に必ず逆変換を実施してください。</li>
        <li><strong>多次元尺度に全体アルファを適用：</strong> 各下位尺度ごとにアルファを算出する必要があります。</li>
        <li><strong>少ない項目数の影響を無視：</strong> 項目が2&ndash;3個の場合、平均項目間相関（推奨範囲：.15&ndash;.50）を併せて報告することが推奨されます。</li>
        <li><strong>アルファを妥当性の証拠と誤認：</strong> アルファは信頼性のみを測定し、妥当性とは別の概念です。</li>
      </ul>

      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">計算精度</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのクロンバックのアルファ計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-mono">psych::alpha()</code>{" "}
          関数およびSPSSの信頼性分析の結果と交差検証されています。項目分散は<em>N</em> &minus; 1分母（標本分散）を使用し、項目-合計相関は修正済み項目-合計相関で計算します。すべての付加統計量がRおよびSPSSの出力と小数点第4位まで一致します。
        </p>
      </div>
    </section>
  );
}

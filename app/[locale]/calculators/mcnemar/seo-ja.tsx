export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        McNemar検定とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        McNemar検定は、対応のある二値データを分析するノンパラメトリック統計
        検定です&mdash;同一の対象が二値的な結果について2回測定される状況で
        使用します。Quinn McNemarが1947年に開発したこの検定は、一方の
        カテゴリからもう一方のカテゴリに変化した対象の比率が偶然に期待される
        ものと有意に異なるかどうかを判定します。本質的に、対応のある対の
        2&times;2分割表における対称性を検定するものです。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        使用する場面
      </h3>
      <p className="text-gray-600 leading-relaxed">
        対応のある、またはマッチングされた二値データがある場合にMcNemar検定を
        使用します。一般的なシナリオとして：治療前後の診断検査結果の比較、
        研修プログラムが合格/不合格率を変化させるかどうかの評価、介入が行動
        （はい/いいえ）を変化させるかどうかの検定、同一患者に適用された2つの
        診断方法の比較などがあります。この検定は、2回の測定間で応答が変化した
        対象である不一致対（discordant pairs）のみに着目します。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        McNemar検定 vs カイ二乗検定 vs CochranのQ検定
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">特性</th>
              <th className="py-2 text-left font-semibold">McNemar検定</th>
              <th className="py-2 text-left font-semibold">カイ二乗検定</th>
              <th className="py-2 text-left font-semibold">CochranのQ検定</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">データ型</td>
              <td className="py-2">対応のある二値</td>
              <td className="py-2">独立カテゴリカル</td>
              <td className="py-2">対応のある二値（3時点以上）</td>
            </tr>
            <tr>
              <td className="py-2">標本</td>
              <td className="py-2 font-medium">対応のある対</td>
              <td className="py-2">独立</td>
              <td className="py-2 font-medium">対応あり（3回以上）</td>
            </tr>
            <tr>
              <td className="py-2">比較群数</td>
              <td className="py-2">2（前/後）</td>
              <td className="py-2">2以上</td>
              <td className="py-2">3以上</td>
            </tr>
            <tr>
              <td className="py-2">分析対象</td>
              <td className="py-2">不一致対</td>
              <td className="py-2">全セル</td>
              <td className="py-2">条件間の変化</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：McNemar検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          研究者が研修プログラムが従業員の資格試験合格率を変化させるかどうかを
          検定します。100名の従業員が研修前後に資格試験を受験します。
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-900">
                <th className="py-2 text-left font-semibold"></th>
                <th className="py-2 text-center font-semibold">事後：合格</th>
                <th className="py-2 text-center font-semibold">事後：不合格</th>
                <th className="py-2 text-center font-semibold">合計</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 font-medium">事前：合格</td>
                <td className="py-2 text-center">40</td>
                <td className="py-2 text-center">12</td>
                <td className="py-2 text-center font-medium">52</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">事前：不合格</td>
                <td className="py-2 text-center">5</td>
                <td className="py-2 text-center">43</td>
                <td className="py-2 text-center font-medium">48</td>
              </tr>
              <tr className="border-t-2 border-gray-900">
                <td className="py-2 font-semibold">合計</td>
                <td className="py-2 text-center font-medium">45</td>
                <td className="py-2 text-center font-medium">55</td>
                <td className="py-2 text-center font-semibold">100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          不一致対はb = 12（事前合格、事後不合格）とc = 5（事前不合格、
          事後合格）です。b + c = 17 &lt; 25であるため、正確二項検定を
          使用します。
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            McNemar正確検定, <em>p</em> = .143
          </p>
          <p className="mt-2 text-sm text-gray-600">
            研修プログラム後の合格率に統計的に有意な変化は認められませんでした。
            5名が改善し12名が悪化しましたが、この差は.05水準で有意では
            ありませんでした。
          </p>
        </div>
      </div>

      {/* Assumptions */}
      <h3 className="text-xl font-semibold text-gray-900">
        McNemar検定の前提条件
      </h3>
      <p className="text-gray-600 leading-relaxed">
        McNemar検定は以下の前提条件を満たす必要があります：
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">1. 対応のある二値データ</p>
          <p className="mt-1 text-sm text-gray-600">
            各対象は2回測定される必要があり（例：前後）、結果は二値型でなければ
            なりません（例：はい/いいえ、合格/不合格、陽性/陰性）。データは
            対応のある対の2&times;2表を構成します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">2. 相互排他的カテゴリ</p>
          <p className="mt-1 text-sm text-gray-600">
            各対象は2&times;2表の4つのセルのうち正確に1つに該当する必要が
            あります。各時点でカテゴリは網羅的かつ相互排他的でなければなりません。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-green-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">3. 無作為抽出</p>
          <p className="mt-1 text-sm text-gray-600">
            対象は関心のある母集団から無作為に選択されるか、条件に無作為に
            配置される必要があります。対応のある対は互いに独立でなければなりません
            （一方の対の結果が他方の対の結果に影響を与えてはなりません）。
          </p>
        </div>
      </div>

      {/* Continuity Correction */}
      <h3 className="text-xl font-semibold text-gray-900">
        連続性補正の理解
      </h3>
      <p className="text-gray-600 leading-relaxed">
        標準的なMcNemar検定は自由度1のカイ二乗統計量を使用します。検定の
        基礎となる二項分布が離散型であるため、連続性補正が適用されます：
        &chi;&sup2; = (|b &minus; c| &minus; 1)&sup2; / (b + c)。この補正は
        中程度の標本サイズでカイ二乗近似をより正確にします。小標本の場合
        （不一致対 &lt; 25）、StatMateは近似を必要としない正確二項検定を
        自動的に使用します。
      </p>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        検定統計量、自由度、p値を報告します。正確検定を使用した場合は報告書に
        その旨を明記します：
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">漸近検定テンプレート</p>
          <p className="mt-1 text-sm italic text-gray-600">
            McNemar検定の結果、[時点1]から[時点2]にかけて[結果]に[有意な/有意で
            ない]変化が認められた，&chi;&sup2;(1) = X.XX, <em>p</em> = .XXX。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">正確検定テンプレート</p>
          <p className="mt-1 text-sm italic text-gray-600">
            McNemar正確検定の結果、[時点1]から[時点2]にかけて[結果]に[有意な/
            有意でない]変化が認められた，<em>p</em> = .XXX。
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        注：不一致対の合計（b + c）が25未満の場合は正確検定を使用します。
        <em>p</em>値は小数第3位まで報告し、.001未満の場合は{" "}
        <em>p</em> &lt; .001と表記します。不一致対に関する記述統計を
        含めてください。
      </p>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        よくある誤り
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>対応データにカイ二乗検定を使用：</strong> 標準的なカイ二乗検定は
          独立な観測を前提とします。同一の対象を2回測定した場合、データは
          従属的であるためMcNemar検定を使用する必要があります。
        </li>
        <li>
          <strong>小標本要件の無視：</strong> 不一致対の合計が25未満の場合、
          カイ二乗近似は信頼できない可能性があります。StatMateが自動的に
          選択する正確二項検定を代わりに使用してください。
        </li>
        <li>
          <strong>表の配置の誤解：</strong> 行は「事前」条件を、列は「事後」
          条件を表します。不一致セル（bとc）が検定の分析対象です。一致セル
          （aとd）は検定結果に影響しません。
        </li>
        <li>
          <strong>非二値結果への適用：</strong> McNemar検定は二値結果専用です。
          順序尺度の対応データにはWilcoxon符号順位検定を使用してください。
          3回以上の関連する二値測定にはCochranのQ検定を使用してください。
        </li>
        <li>
          <strong>連続性補正の欠落：</strong> 補正なしのMcNemar統計量
          (b &minus; c)&sup2; / (b + c)は有意性を過大推定する傾向があります。
          より正確な結果のために、常に補正版
          (|b &minus; c| &minus; 1)&sup2; / (b + c)を使用してください。
        </li>
      </ul>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算精度
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateのMcNemar検定の計算は、Rの{" "}
          <code className="rounded bg-green-100 px-1 py-0.5 text-xs">mcnemar.test()</code>{" "}
          関数およびSPSS出力と比較検証されています。実装は連続性補正されたカイ
          二乗統計量と確率分布のためのjstatライブラリを使用しています。小標本
          （不一致対 &lt; 25）の場合は正確な両側二項検定を使用します。すべての
          結果はR出力と少なくとも小数第4位まで一致しています。
        </p>
      </div>
    </section>
  );
}

export function SeoContentJa() {
  return (
    <section className="mt-16 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        標本サイズ計算とは？
      </h2>
      <p className="text-gray-600 leading-relaxed">
        標本サイズ計算（検定力分析、power analysis）は、研究において意味のある
        効果を検出するために必要な最小参加者数を決定するプロセスです。これは
        研究計画の必須ステップであり、参加者が少なすぎると実際の効果を見逃す
        リスクがあり（第2種の誤り）、多すぎると時間と資源を浪費することに
        なります。ほとんどのIRB（倫理審査委員会）および研究助成機関は、
        研究計画書の一部として正式な検定力分析を要求しています。
      </p>

      <h3 className="text-xl font-semibold text-gray-900">
        検定力分析の4つの構成要素
      </h3>
      <p className="text-gray-600 leading-relaxed">
        すべての検定力分析は4つの相互に関連するパラメータを含みます。3つが
        わかれば残りの1つを求めることができます。実際には、研究者は有意水準、
        検定力、効果量を固定し、標本サイズ（N）を求めることが最も一般的です。
      </p>
      <div className="space-y-3">
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            1. 効果量 (d, f, r, または w)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            検出したい効果の予想される大きさです。効果が大きいほど必要な参加者数
            は少なくなります。t検定にはCohen&apos;s d、ANOVAにはCohen&apos;s f、
            相関分析にはr、カイ二乗検定にはCohen&apos;s wを使用します。
            予想効果量がわからない場合は慣例的基準（小、中、大）を活用して
            ください。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            2. 有意水準 (&alpha;)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            第1種の誤りの確率 &mdash; 帰無仮説が実際に真であるときにそれを
            棄却する確率（偽陽性）です。慣例的な水準は &alpha; = .05であり、
            これは有意と誤って宣言する確率が5%であることを意味します。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            3. 統計的検定力 (1 - &beta;)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            実際の効果を正しく検出する確率 &mdash; 第2種の誤り（偽陰性）を
            避ける確率です。慣例的な最小値は.80（80%）であり、効果が実際に
            存在する場合にそれを発見する確率が80%であることを意味します。
            一部の分野では.90以上が推奨されています。
          </p>
        </div>
        <div className="rounded-md border-l-4 border-blue-500 bg-gray-50 p-4">
          <p className="font-semibold text-gray-800">
            4. 標本サイズ (N)
          </p>
          <p className="mt-1 text-sm text-gray-600">
            必要な総参加者数です。通常これが求めたい未知数です。参加者が多い
            ほど検定力は高くなりますが、コストと時間も増加します。
          </p>
        </div>
      </div>

      {/* Effect Size Conventions */}
      <h3 className="text-xl font-semibold text-gray-900">
        検定タイプ別効果量基準表
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Jacob Cohen（1988）は、小・中・大の効果量に対する広く使用される基準を
        確立しました。先行研究やパイロットデータがなく予想効果を推定しにくい場合
        にこの基準を活用してください。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-900">
              <th className="py-2 text-left font-semibold">検定</th>
              <th className="py-2 text-left font-semibold">指標</th>
              <th className="py-2 text-center font-semibold">小（Small）</th>
              <th className="py-2 text-center font-semibold">中（Medium）</th>
              <th className="py-2 text-center font-semibold">大（Large）</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="py-2">t検定</td>
              <td className="py-2">Cohen&apos;s <em>d</em></td>
              <td className="py-2 text-center">0.20</td>
              <td className="py-2 text-center">0.50</td>
              <td className="py-2 text-center">0.80</td>
            </tr>
            <tr>
              <td className="py-2">ANOVA</td>
              <td className="py-2">Cohen&apos;s <em>f</em></td>
              <td className="py-2 text-center">0.10</td>
              <td className="py-2 text-center">0.25</td>
              <td className="py-2 text-center">0.40</td>
            </tr>
            <tr>
              <td className="py-2">相関分析</td>
              <td className="py-2"><em>r</em></td>
              <td className="py-2 text-center">0.10</td>
              <td className="py-2 text-center">0.30</td>
              <td className="py-2 text-center">0.50</td>
            </tr>
            <tr>
              <td className="py-2">カイ二乗検定</td>
              <td className="py-2">Cohen&apos;s <em>w</em></td>
              <td className="py-2 text-center">0.10</td>
              <td className="py-2 text-center">0.30</td>
              <td className="py-2 text-center">0.50</td>
            </tr>
            <tr>
              <td className="py-2">比率検定</td>
              <td className="py-2">Cohen&apos;s <em>h</em></td>
              <td className="py-2 text-center">0.20</td>
              <td className="py-2 text-center">0.50</td>
              <td className="py-2 text-center">0.80</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          計算例：独立標本t検定
        </h3>
        <p className="mt-3 text-gray-600 leading-relaxed">
          ある研究者が2つの教授法のテストスコアを比較したいと考えています。
          先行研究に基づき、中程度の効果量（Cohen&apos;s <em>d</em> = 0.50）を
          予想しています。&alpha; = .05、検定力 = .80に設定します。
        </p>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">パラメータ</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>検定：独立標本t検定（両側検定）</li>
            <li>効果量：<em>d</em> = 0.50（中程度）</li>
            <li>有意水準：&alpha; = .05</li>
            <li>検定力：1 - &beta; = .80</li>
          </ul>
        </div>
        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">結果</p>
          <p className="mt-1 text-sm text-gray-600">
            必要標本サイズ：<strong>N = 128</strong>（群あたり64名）
          </p>
          <p className="mt-2 text-sm italic text-gray-600">
            独立標本t検定のための検定力分析を、効果量 <em>d</em> = 0.50、
            &alpha; = .05、検定力 = .80の条件で実施した。必要標本サイズは
            <em>N</em> = 128（群あたり64名）であった。
          </p>
        </div>
      </div>

      {/* When to Use */}
      <h3 className="text-xl font-semibold text-gray-900">
        検定力分析を行うタイミング
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>データ収集前：</strong> 事前（a priori）検定力分析が最も
          一般的かつ重要な用途です。募集すべき参加者数を決定します。
        </li>
        <li>
          <strong>研究助成申請：</strong> 助成機関は計画された標本サイズの
          根拠を要求します。検定力分析がその根拠を提供します。
        </li>
        <li>
          <strong>IRB申請：</strong> 倫理審査委員会は、必要以上に多くの参加者を
          募集すること（資源の浪費）や少なすぎる募集（研究の無意味化）を
          防ぎたいと考えています。
        </li>
        <li>
          <strong>学位論文計画書：</strong> ほとんどの審査委員会は方法論セクション
          に正式な検定力分析を期待しています。
        </li>
      </ul>

      {/* Common Mistakes */}
      <h3 className="text-xl font-semibold text-gray-900">
        検定力分析のよくある誤り
      </h3>
      <ul className="ml-4 list-disc space-y-2 text-gray-600">
        <li>
          <strong>Nを減らすために大きな効果量を使用：</strong> より少ない標本を
          得るために予想効果量を水増ししないでください。パイロットデータや
          出版された文献から現実的な推定値を使用してください。
        </li>
        <li>
          <strong>脱落率の無視：</strong> 計算されたNは分析のための最小値です。
          20%の脱落が予想される場合は、計算されたNより20%多く募集してください。
        </li>
        <li>
          <strong>事後検定力分析：</strong> データ収集後に観察された効果量で
          検定力を計算することは循環的であり有用な情報を提供しません。検定力分析は
          必ず事前に実施してください。
        </li>
        <li>
          <strong>検定タイプの不一致：</strong> 検定力分析が使用予定の統計検定と
          一致していることを確認してください。t検定に対する検定力分析はANOVAには
          適用されません。
        </li>
        <li>
          <strong>片側検定 vs. 両側検定：</strong> この計算機はデフォルトで
          両側検定を使用します。片側検定は必要な参加者数が少なくなりますが、
          効果の方向が事前にわかっている場合にのみ適切です。
        </li>
      </ul>

      {/* APA Reporting */}
      <h3 className="text-xl font-semibold text-gray-900">
        APA形式での検定力分析報告方法
      </h3>
      <p className="text-gray-600 leading-relaxed">
        検定力分析は論文の参加者または方法セクションに記載してください。検定
        タイプ、効果量、有意水準、目標検定力、そして結果の標本サイズを明示します。
      </p>
      <div className="space-y-3">
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">t検定の例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            独立標本t検定に対する事前検定力分析をStatMateを使用して
            実施した（Cohen&apos;s <em>d</em> = 0.50, &alpha; = .05, 検定力
            = .80）。必要最小標本サイズは <em>N</em> = 128（群あたり64名）と
            決定された。
          </p>
        </div>
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">ANOVAの例</p>
          <p className="mt-1 text-sm italic text-gray-600">
            4群の一元配置分散分析に対する検定力分析をCohen&apos;s
            <em>f</em> = 0.25（中程度の効果）、&alpha; = .05、検定力 = .80の
            条件で実施した。必要最小標本サイズは <em>N</em> = 180（群あたり
            45名）であった。
          </p>
        </div>
      </div>

      {/* Validation */}
      <div className="rounded-lg border border-green-100 bg-green-50/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          計算方法
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          StatMateの標本サイズ計算は、jStatライブラリの正確なz値を使用する
          標準正規近似法を適用しています。t検定の場合、公式は{" "}
          <em>n</em> = (z<sub>&alpha;/2</sub> +
          z<sub>&beta;</sub>)<sup>2</sup> &times; 2 / <em>d</em><sup>2</sup>
          です。達成検定力（achieved power）は計算された標本サイズを使用して
          逆算されます。結果はG*PowerおよびRのpwrパッケージと比較検証されています。
        </p>
      </div>
    </section>
  );
}

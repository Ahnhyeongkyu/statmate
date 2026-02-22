/* eslint-disable @next/next/no-html-link-for-pages */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white text-center">
        <div className="px-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl font-bold text-blue-600">
            ?
          </div>
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-3 text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="/en"
              className="inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Go Home (English)
            </a>
            <a
              href="/ko"
              className="inline-block rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              홈으로 (한국어)
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <a href="/en/calculators/t-test" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">T-Test</a>
            <a href="/en/calculators/anova" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">ANOVA</a>
            <a href="/en/calculators/chi-square" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">Chi-Square</a>
            <a href="/en/calculators/correlation" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">Correlation</a>
            <a href="/en/calculators/regression" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">Regression</a>
            <a href="/en/calculators/descriptive" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">Descriptive</a>
            <a href="/en/calculators/factor-analysis" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">Factor Analysis</a>
            <a href="/en/calculators/logistic-regression" className="rounded-md border px-3 py-2 text-gray-600 hover:bg-gray-50">Logistic Reg.</a>
          </div>
        </div>
      </body>
    </html>
  );
}

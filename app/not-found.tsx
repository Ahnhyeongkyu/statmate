export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white text-center">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl font-bold text-blue-600">
            ?
          </div>
          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-3 text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you for your Expert Review order | StatMate",
  description: "Your StatMate Expert Review order is confirmed. Next: data upload instructions.",
  robots: { index: false, follow: false },
};

export default function ExpertReviewThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl dark:bg-green-900">
          ✅
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Order Confirmed — Thank You!
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Your StatMate Expert Review purchase is complete. Check your email for the receipt.
        </p>
      </div>

      <div className="mt-10 rounded-xl border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          What happens next
        </h2>
        <ol className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
            <span>
              <strong>Within 1 hour</strong>: You will receive a separate email from <strong>houng8087@gmail.com</strong> with a secure data upload link and detailed instructions.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">2</span>
            <span>
              <strong>Upload your data</strong>: CSV / Excel / SPSS output / StatMate share link. Plus a short note describing your research question.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</span>
            <span>
              <strong>Review delivered</strong>: A PDF report with statistical analysis review + APA 7th citation drafts within <strong>3-5 business days</strong>.
            </span>
          </li>
        </ol>
      </div>

      <div className="mt-6 rounded-xl border bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
          Don&apos;t see the email?
        </h3>
        <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
          Check your spam folder. If after 1 hour you still haven&apos;t received instructions, email us directly at{" "}
          <a href="mailto:houng8087@gmail.com?subject=Expert%20Review%20Order%20—%20Missing%20Email" className="font-medium underline">
            houng8087@gmail.com
          </a>
          .
        </p>
      </div>

      <div className="mt-10 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400"
        >
          ← Back to StatMate
        </a>
      </div>
    </div>
  );
}

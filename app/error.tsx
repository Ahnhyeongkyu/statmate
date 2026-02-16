"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
        !
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-gray-500">
        An unexpected error occurred. Your data hasn&apos;t been lost — try
        refreshing the page.
      </p>
      <Button onClick={reset} className="mt-8">
        Try Again
      </Button>
    </div>
  );
}

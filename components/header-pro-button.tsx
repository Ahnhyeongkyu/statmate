"use client";

import { useState } from "react";
import Link from "next/link";
import { useIsPro, ActivateProModal, deactivatePro } from "@/components/activate-pro";

export function HeaderProButton() {
  const isPro = useIsPro();
  const [showActivate, setShowActivate] = useState(false);

  if (isPro) {
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
          Pro
        </span>
        <button
          onClick={() => {
            deactivatePro();
            window.location.reload();
          }}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          href="/pricing"
          className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          Pricing
        </Link>
        <Link
          href="/pricing"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Get Pro
        </Link>
        <button
          onClick={() => setShowActivate(true)}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Activate
        </button>
      </div>

      <ActivateProModal
        open={showActivate}
        onClose={() => setShowActivate(false)}
      />
    </>
  );
}

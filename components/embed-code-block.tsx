"use client";

import { useState } from "react";

export function EmbedCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — user can still select manually */
    }
  }

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-900 p-4 pr-20 text-left text-xs leading-relaxed text-gray-100 dark:border-gray-700">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        aria-label="Copy embed code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { trackShareUrl } from "@/lib/analytics";

interface ShareButtonProps {
  url: string;
  testName: string;
}

export function ShareButton({ url, testName }: ShareButtonProps) {
  const t = useTranslations("calculator");
  const [copied, setCopied] = useState(false);

  function handleShare() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    trackShareUrl(testName);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" onClick={handleShare} className="gap-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      {copied ? t("shareLinkCopied") : t("shareResult")}
    </Button>
  );
}

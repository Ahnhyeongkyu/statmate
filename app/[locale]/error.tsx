"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
        !
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">{t("title")}</h1>
      <p className="mt-3 max-w-md text-gray-500">{t("description")}</p>
      <Button onClick={reset} className="mt-8">
        {t("tryAgain")}
      </Button>
    </div>
  );
}

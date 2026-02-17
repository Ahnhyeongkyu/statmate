"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CalculatorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("Calculator error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="w-full max-w-md border-red-200">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl text-red-600">
            !
          </div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            {t("title")}
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            {t("description")}
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={reset}>
              {t("tryAgain")}
            </Button>
            <Button variant="outline" asChild>
              <a href="/">{t("goHome")}</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

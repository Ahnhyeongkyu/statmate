"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { parseNumbers } from "@/lib/utils/parse";

interface DataTextareaProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function DataTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: DataTextareaProps) {
  const t = useTranslations("calculator");
  const count = value.trim() ? parseNumbers(value).length : 0;

  return (
    <div>
      <Label htmlFor={id}>
        {label}
        <span className="ml-1 text-xs text-gray-400">
          {t("separatorHint")}
        </span>
      </Label>
      <textarea
        id={id}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {count > 0 && (
        <p className="mt-1 text-xs text-emerald-600">
          N = {count} {t("valuesDetected")}
        </p>
      )}
    </div>
  );
}

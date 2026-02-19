"use client";

import { useRef, useState, useCallback } from "react";
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

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

/** Parse CSV content: extract numeric values from all rows/columns */
function parseCSV(text: string): string {
  // Split into lines, then extract all numeric values
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  const allNumbers: number[] = [];

  for (const line of lines) {
    // Split by comma, tab, or semicolon
    const cells = line.split(/[,;\t]/);
    for (const cell of cells) {
      const trimmed = cell.trim().replace(/^["']|["']$/g, "");
      const num = Number(trimmed);
      if (trimmed !== "" && !isNaN(num)) {
        allNumbers.push(num);
      }
    }
  }

  return allNumbers.join(", ");
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
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      if (!file) return;
      setFileError("");
      const ext = file.name.toLowerCase();
      if (!ext.endsWith(".csv") && !ext.endsWith(".txt") && !ext.endsWith(".tsv")) {
        setFileError(t("csvFormatError"));
        return;
      }
      try {
        const text = await readFileAsText(file);
        const parsed = parseCSV(text);
        if (parsed) {
          onChange(parsed);
        } else {
          setFileError(t("csvNoData"));
        }
      } catch {
        setFileError(t("csvReadError"));
      }
    },
    [onChange, t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>
          {label}
          <span className="ml-1 text-xs text-gray-400">
            {t("separatorHint")}
          </span>
        </Label>
        <button
          type="button"
          onClick={() => { setFileError(""); fileRef.current?.click(); }}
          className="text-xs text-blue-500 hover:text-blue-700"
          aria-label={t("uploadCsv")}
        >
          {t("uploadCsv")}
        </button>
      </div>
      <div
        className={`relative mt-1 rounded-md border ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <textarea
          id={id}
          className="w-full rounded-md border-0 bg-transparent px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {dragging && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-blue-50/80">
            <p className="text-sm font-medium text-blue-600">{t("dropCsv")}</p>
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".csv,.txt,.tsv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <div className="mt-1 flex items-center justify-between">
        {fileError ? (
          <p className="text-xs text-red-500">{fileError}</p>
        ) : count > 0 ? (
          <p className="text-xs text-emerald-600">
            N = {count} {t("valuesDetected")}
          </p>
        ) : (
          <p className="text-xs text-gray-400">{t("pasteHint")}</p>
        )}
      </div>
    </div>
  );
}

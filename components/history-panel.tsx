"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/components/auth-provider";
import { isSupabaseEnabled } from "@/lib/supabase/client";

interface AnalysisRecord {
  id: string;
  calculator_type: string;
  title: string | null;
  input_data: Record<string, unknown>;
  result_data: Record<string, unknown>;
  created_at: string;
}

export function HistoryPanel({
  onLoad,
}: {
  onLoad?: (record: AnalysisRecord) => void;
}) {
  const t = useTranslations("history");
  const { user, loading: authLoading } = useUser();
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/history", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records ?? []);
      }
    } catch {
      // Silently fail — history is non-critical
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && isSupabaseEnabled()) {
      fetchHistory();
    }
  }, [user, fetchHistory]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/history?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // Silently fail
    }
    setDeleteConfirm(null);
  };

  // Don't render if Supabase is not configured or user is not logged in
  if (!isSupabaseEnabled() || authLoading) return null;
  if (!user) return null;

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getCalculatorLabel(type: string) {
    // Convert slug like "t-test" to display name
    return type
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        ) : records.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            {t("empty")}
          </p>
        ) : (
          <ul className="space-y-3">
            {records.map((record) => (
              <li
                key={record.id}
                className="rounded-lg border bg-gray-50 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {record.title || getCalculatorLabel(record.calculator_type)}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {getCalculatorLabel(record.calculator_type)}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {formatDate(record.created_at)}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {onLoad && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => onLoad(record)}
                      >
                        {t("load")}
                      </Button>
                    )}
                    {deleteConfirm === record.id ? (
                      <Button
                        variant="destructive"
                        size="xs"
                        onClick={() => handleDelete(record.id)}
                      >
                        {t("confirmDelete")}
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setDeleteConfirm(record.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        {t("delete")}
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PRO_STORAGE_KEY = "statmate_pro";

export function useIsPro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(PRO_STORAGE_KEY);
    if (!stored) return false;
    const data = JSON.parse(stored);
    // Check expiry
    if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
      localStorage.removeItem(PRO_STORAGE_KEY);
      return false;
    }
    return data.valid === true;
  } catch {
    return false;
  }
}

export function activatePro(data: {
  valid: boolean;
  customerName: string;
  expiresAt: string | null;
  licenseKey: string;
}) {
  localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify(data));
}

export function deactivatePro() {
  localStorage.removeItem(PRO_STORAGE_KEY);
}

export function ActivateProModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  async function handleActivate() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: key.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Activation failed");
        return;
      }

      activatePro({ ...data, licenseKey: key.trim() });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-lg">Activate StatMate Pro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <div className="rounded-md bg-green-50 p-4 text-center">
              <p className="font-semibold text-green-800">
                Pro activated successfully!
              </p>
              <p className="mt-1 text-sm text-green-600">Reloading...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                Enter the license key you received after purchase.
              </p>
              <input
                type="text"
                placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex gap-3">
                <Button
                  onClick={handleActivate}
                  disabled={loading || key.trim().length < 10}
                  className="flex-1"
                >
                  {loading ? "Activating..." : "Activate"}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

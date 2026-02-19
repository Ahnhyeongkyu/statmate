"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createClient, isSupabaseEnabled } from "@/lib/supabase/client";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("auth");
  const [tab, setTab] = useState<string>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  if (!open || !isSupabaseEnabled()) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      if (!supabase) {
        setError(t("error"));
        return;
      }

      if (tab === "signIn") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-lg">
            {tab === "signIn" ? t("signIn") : t("signUp")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="rounded-md bg-green-50 p-4 text-center">
              <p className="font-semibold text-green-800">
                {tab === "signIn" ? t("signIn") : t("signUp")} - OK!
              </p>
            </div>
          ) : (
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full">
                <TabsTrigger value="signIn" className="flex-1">
                  {t("signIn")}
                </TabsTrigger>
                <TabsTrigger value="signUp" className="flex-1">
                  {t("signUp")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signIn">
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">{t("email")}</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">{t("password")}</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete="current-password"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={loading || !email.trim() || password.length < 6}
                      className="flex-1"
                    >
                      {loading ? "..." : t("signIn")}
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    {t("noAccount")}{" "}
                    <button
                      type="button"
                      onClick={() => setTab("signUp")}
                      className="text-blue-600 hover:underline"
                    >
                      {t("signUp")}
                    </button>
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="signUp">
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t("email")}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t("password")}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={loading || !email.trim() || password.length < 6}
                      className="flex-1"
                    >
                      {loading ? "..." : t("signUp")}
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    {t("hasAccount")}{" "}
                    <button
                      type="button"
                      onClick={() => setTab("signIn")}
                      className="text-blue-600 hover:underline"
                    >
                      {t("signIn")}
                    </button>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare, X, Send } from "lucide-react";

export function FeedbackButton() {
  const t = useTranslations("feedback");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [type, setType] = useState<"bug" | "feature" | "other">("other");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    const subject = `[StatMate ${type}] Feedback`;
    const body = `Type: ${type}\n\n${message}`;
    window.open(
      `mailto:contact.statmate@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
        aria-label={t("title")}
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
          {sent ? (
            <p className="text-center text-sm text-green-600 font-medium py-4">
              {t("thanks")}
            </p>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{t("title")}</h3>
              <div className="flex gap-2 mb-3">
                {(["bug", "feature", "other"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setType(v)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      type === v
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t(v)}
                  </button>
                ))}
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
              />
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {t("send")}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ThumbsUp, ThumbsDown, ExternalLink, Send } from "lucide-react";
import { trackFeedbackVote } from "@/lib/analytics";

const STORAGE_KEY = "statmate_feedback_done";

function getDismissedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set();
}

function markDismissed(calculatorId: string) {
  const set = getDismissedSet();
  set.add(calculatorId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch { /* ignore */ }
}

interface FeedbackPromptProps {
  calculatorId: string;
}

export function FeedbackPrompt({ calculatorId }: FeedbackPromptProps) {
  const t = useTranslations("feedbackPrompt");
  const [dismissed, setDismissed] = useState(true); // hidden by default until hydrated
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const set = getDismissedSet();
    setDismissed(set.has(calculatorId));
  }, [calculatorId]);

  if (dismissed) return null;

  const handleVote = (type: "up" | "down") => {
    setVote(type);
    trackFeedbackVote(calculatorId, type);
  };

  const handleNegativeSend = () => {
    if (!message.trim()) return;
    const subject = `[StatMate Feedback] ${calculatorId}`;
    const body = `Calculator: ${calculatorId}\nRating: 👎\n\n${message}`;
    window.open(
      `mailto:contact.statmate@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
    markDismissed(calculatorId);
    setSent(true);
    setTimeout(() => setDismissed(true), 2000);
  };

  const handlePositiveDismiss = () => {
    markDismissed(calculatorId);
    setDismissed(true);
  };

  // Thank you state
  if (sent) {
    return (
      <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950/30">
        <p className="text-sm font-medium text-green-700 dark:text-green-300">
          {t("thanks")}
        </p>
      </div>
    );
  }

  // Initial prompt (no vote yet)
  if (!vote) {
    return (
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("question")}
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            onClick={() => handleVote("up")}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
            aria-label={t("helpful")}
          >
            <ThumbsUp className="h-4 w-4" />
            {t("helpful")}
          </button>
          <button
            onClick={() => handleVote("down")}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-red-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            aria-label={t("notHelpful")}
          >
            <ThumbsDown className="h-4 w-4" />
            {t("notHelpful")}
          </button>
        </div>
      </div>
    );
  }

  // Positive vote: review link + dismiss
  if (vote === "up") {
    return (
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-800 dark:bg-blue-950/30">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          {t("positiveMessage")}
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <a
            href="https://www.producthunt.com/products/statmate"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePositiveDismiss}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("leaveReview")}
          </a>
          <button
            onClick={handlePositiveDismiss}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {t("maybeLater")}
          </button>
        </div>
      </div>
    );
  }

  // Negative vote: feedback form
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("negativeMessage")}
      </p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("negativePlaceholder")}
        className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-blue-400"
        rows={3}
      />
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          onClick={() => {
            markDismissed(calculatorId);
            setDismissed(true);
          }}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {t("cancel")}
        </button>
        <button
          onClick={handleNegativeSend}
          disabled={!message.trim()}
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          {t("send")}
        </button>
      </div>
    </div>
  );
}

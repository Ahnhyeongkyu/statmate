/**
 * Lightweight error reporting via Google Analytics events.
 * No external dependency — uses existing GA setup.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function reportError(error: Error, context?: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("event", "exception", {
      description: `${context ? `[${context}] ` : ""}${error.message}`.slice(
        0,
        150
      ),
      fatal: false,
    });
  } catch {
    // Silently fail — error reporting should never break the app
  }
}

export function setupGlobalErrorHandlers() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    reportError(
      event.error || new Error(event.message),
      "unhandled"
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    const error =
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));
    reportError(error, "unhandled-promise");
  });
}

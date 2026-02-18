"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>!</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>An unexpected error occurred. Please try again.</p>
          <button
            onClick={reset}
            style={{ padding: "0.5rem 1.5rem", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "0.375rem", cursor: "pointer", fontSize: "0.875rem" }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

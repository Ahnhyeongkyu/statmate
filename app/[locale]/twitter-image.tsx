import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "StatMate - Free Statistics Calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "#2563eb",
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "white",
            }}
          >
            StatMate
          </span>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "800px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Free Statistics Calculator with APA-Formatted Results
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["T-Test", "ANOVA", "Chi-Square", "Correlation", "Descriptive"].map(
            (name) => (
              <div
                key={name}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                {name}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}

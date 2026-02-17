import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function createCalculatorOg(name: string, icon: string, description: string) {
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
            gap: "12px",
            marginBottom: "32px",
            opacity: 0.8,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 700,
              color: "white",
            }}
          >
            S
          </div>
          <span style={{ fontSize: "24px", fontWeight: 600, color: "white" }}>
            StatMate
          </span>
        </div>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            fontWeight: 700,
            fontStyle: "italic",
            color: "white",
            marginBottom: "24px",
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "white",
            marginBottom: "16px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.85)",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
        <div
          style={{
            marginTop: "32px",
            padding: "10px 28px",
            borderRadius: "999px",
            background: "white",
            color: "#2563eb",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          Free Calculator — Try Now
        </div>
      </div>
    ),
    { ...ogSize }
  );
}

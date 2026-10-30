import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#000000",
        color: "#F6F1EA",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, letterSpacing: 5 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            display: "flex",
            border: "2px solid #FFB36B",
            background: "#000000",
          }}
        />
        PERIGEE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, fontWeight: 600 }}>
          At the edge of curved spacetime.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#FFB36B", letterSpacing: 1 }}>
          Relativistic Schwarzschild Black Hole Telemetry Observatory
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          letterSpacing: 4,
          color: "#F6F1EA",
          opacity: 0.7,
        }}
      >
        <span>GEODESIC TRAJECTORY r = 38.0 → 1.0 Rs</span>
        <span>01 — 06 INTERACTIVE 3D</span>
      </div>
    </div>,
    size,
  );
}

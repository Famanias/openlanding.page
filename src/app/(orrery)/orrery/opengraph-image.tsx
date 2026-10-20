import { ImageResponse } from "next/og";

export const alt = "Orrery — the orchestration layer for teams of AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 90px",
          background: "#F2EFE8",
          color: "#0E0F13",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 168, lineHeight: 1, letterSpacing: -4 }}>
            Orrery<span style={{ color: "#2F3BFF" }}>.</span>
          </div>
          <div style={{ fontSize: 34, maxWidth: 560, lineHeight: 1.25, fontFamily: "sans-serif" }}>
            The orchestration layer for teams of AI agents.
          </div>
        </div>
        <svg width="380" height="380" viewBox="0 0 380 380">
          <circle cx="190" cy="190" r="170" fill="none" stroke="#0E0F13" strokeWidth="2" />
          <circle cx="190" cy="190" r="100" fill="none" stroke="#0E0F13" strokeWidth="2" strokeDasharray="6 8" />
          <circle cx="190" cy="190" r="26" fill="#0E0F13" />
          <circle cx="310" cy="70" r="20" fill="#2F3BFF" />
          <circle cx="105" cy="245" r="10" fill="#0E0F13" />
          <circle cx="280" cy="212" r="7" fill="#FFB000" />
        </svg>
      </div>
    ),
    size,
  );
}

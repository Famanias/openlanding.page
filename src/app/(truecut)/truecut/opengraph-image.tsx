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
        padding: "64px",
        background: "#172026",
        color: "#F5F0E5",
        fontFamily: "Arial",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#E8F146", fontSize: 24, letterSpacing: 4 }}>
        <span style={{ width: 38, height: 38, background: "#E8F146", display: "flex" }} />
        TRUECUT / WORKS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ fontSize: 82, lineHeight: 0.95, fontWeight: 900, maxWidth: 800 }}>FIELD ENGINEERING, SHOWN CLEARLY.</div>
        <div style={{ fontSize: 26, color: "#B4C3C1" }}>Book a site visit · See the work · Make the handoff</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#4B6A72", fontSize: 18, letterSpacing: 2 }}>
        <span>PROJECT 0427</span>
        <span style={{ color: "#E8F146" }}>SIGNAL: CLEAR</span>
      </div>
    </div>,
    size,
  );
}

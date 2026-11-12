import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TESSERA — Architectural Acoustic Wall Systems";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0B0D10",
          color: "#161A21",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>TESSERA</span>
          <span style={{ color: "#F1F5F9" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            TESSERA — Architectural Acoustic Wall Systems
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Modular sculptural acoustic wall installations engineered for architectural interiors. Sound, shaped by design.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#F1F5F9" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

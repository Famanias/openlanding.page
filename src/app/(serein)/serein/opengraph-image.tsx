import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div>
      <style>{`:root { --sr-paper: #F6F0E5; --sr-ink: #24343A; --sr-seafoam: #A8D6CC; }`}</style>
      <div
        style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: "var(--sr-paper)",
        color: "var(--sr-ink)",
        fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26 }}>
          <span style={{ width: 48, height: 48, border: "2px solid var(--sr-ink)", borderRadius: 999, display: "flex" }} />
          <span>Serein Bureau / SR-07</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, lineHeight: 0.98, maxWidth: 950 }}>A little weather, held close.</div>
          <div style={{ display: "flex", fontSize: 26, color: "var(--sr-ink)" }}>Small weather, closely observed.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <span>Fold-out forecast strip</span>
          <span style={{ color: "var(--sr-seafoam)" }}>1008 hPa / 7 panels</span>
        </div>
      </div>
    </div>,
  );
}

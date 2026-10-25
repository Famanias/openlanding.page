import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SEREIN Bureau — Small weather, closely observed.";

const PAPER = "#F6F0E5";
const INK = "#24343A";
const SEAFOAM = "#A8D6CC";

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
          backgroundColor: PAPER,
          color: INK,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26 }}>
          <span style={{ width: 48, height: 48, border: `2px solid ${INK}`, borderRadius: 999, display: "flex" }} />
          <span>Serein Bureau / SR-07</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 88, lineHeight: 0.98, maxWidth: 950 }}>A little weather, held close.</div>
          <div style={{ display: "flex", fontSize: 26, color: INK }}>Small weather, closely observed.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <span>Fold-out forecast strip</span>
          <span style={{ color: SEAFOAM }}>1008 hPa / 7 panels</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#090B12", color: "#F7F8FC", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#7DF2D1", fontSize: 22, letterSpacing: 4 }}>✦ STARLIGHT LAB / PURE WEBGL2</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 72, lineHeight: 1, fontWeight: 700 }}>Build worlds</div>
        <div style={{ fontSize: 72, lineHeight: 1, fontWeight: 700, color: "#7DF2D1" }}>from the pixel out.</div>
      </div>
      <div style={{ display: "flex", gap: 24, color: "#9EA7BC", fontSize: 20 }}>A readable model lab for the browser.</div>
    </div>,
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F5F7FB", color: "#10141C", padding: 76, flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>
        <div style={{ width: 52, height: 52, display: "flex", background: "#10141C", color: "#F5F7FB", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>✦</div>
        LUCENTRA
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1, fontWeight: 700, letterSpacing: -4 }}>Make light legible.</div>
        <div style={{ display: "flex", fontSize: 28, color: "#2E63FF" }}>A real-time material calibration studio.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2, color: "#10141C" }}><span>BENCH / 04</span><span>IOR 1.52 · ROUGHNESS 0.18</span></div>
    </div>,
    size,
  );
}

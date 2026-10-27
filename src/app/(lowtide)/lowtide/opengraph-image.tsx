import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0A0D16", color: "#ECEFF0", fontFamily: "serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, letterSpacing: 2 }}>
        <div style={{ width: 46, height: 46, borderRadius: 999, display: "flex", background: "#EBD9A6", boxShadow: "inset -14px -8px 0 0 #0A0D16" }} />
        lowtide
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 96, lineHeight: 1, letterSpacing: -2 }}>Let the tide go out.</div>
        <div style={{ display: "flex", fontSize: 30, color: "#8FD3FF" }}>A sleep ring for people who can&apos;t put the phone down.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3, color: "#7A8494" }}>
        <span>23:04 — 07:00</span>
        <span>FIVE LOW TIDES</span>
      </div>
    </div>,
    size,
  );
}

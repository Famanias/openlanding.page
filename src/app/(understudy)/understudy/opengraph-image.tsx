import { ImageResponse } from "next/og";

export const alt = "Understudy — Your first job, rehearsed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ARCH = "M6 46V22C6 12.06 14.06 4 24 4s18 8.06 18 18v24H28.6L24 30.5 19.4 46H6Z";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F4F4F1", color: "#0D0D10", position: "relative" }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 470, display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0D10" }}>
        <svg width="250" height="250" viewBox="0 0 48 48"><path d={ARCH} fill="#5B3CF0" /></svg>
        <div style={{ position: "absolute", bottom: 64, display: "flex", fontSize: 30, color: "#AE9CFF", letterSpacing: -1 }}>3,400+ companies casting</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: 730 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 38, letterSpacing: -1.2 }}>
          <svg width="40" height="40" viewBox="0 0 48 48"><path d={ARCH} fill="#0D0D10" /></svg>
          understudy
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1.02, letterSpacing: -4.5, fontWeight: 300 }}>
          <span>Your first job,</span>
          <span style={{ color: "#5B3CF0" }}>rehearsed.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#66666E" }}>Real briefs · a cast · a director · a reel recruiters open</div>
      </div>
    </div>,
    size,
  );
}

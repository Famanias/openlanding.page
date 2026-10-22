import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ background: "#F7F2E9", color: "#12101A", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: 24, letterSpacing: "0.14em" }}>
        <div style={{ width: 38, height: 38, border: "2px solid #12101A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5B47" }} /></div>
        ISOBAR.
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 78, lineHeight: 1, fontWeight: 600, maxWidth: 700 }}>Shape the atmosphere.</div>
          <div style={{ fontSize: 22, color: "#A59DB6", letterSpacing: "0.03em" }}>A living spatial field for moving ideas.</div>
        </div>
        <div style={{ width: 280, height: 180, borderRadius: "46% 54% 58% 42% / 40% 40% 60% 60%", background: "linear-gradient(135deg, #8A6CFF, #2DE2A6 48%, #FF5B47)", transform: "rotate(-12deg)", display: "flex" }} />
      </div>
    </div>,
    { ...size },
  );
}

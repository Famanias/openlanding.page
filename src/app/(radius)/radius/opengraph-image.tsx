import { ImageResponse } from "next/og";

export const alt = "RADIUS — Every street is yours.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#F3F0E8", color: "#272B32", overflow: "hidden", padding: "52px 66px", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", position: "absolute", right: -180, top: 0, width: 670, height: 630, background: "#244BA8", transform: "skewX(-28deg)" }} />
      <div style={{ display: "flex", position: "absolute", right: -400, top: 0, width: 670, height: 630, background: "#F26836", transform: "skewX(-28deg)" }} />
      <div style={{ display: "flex", position: "relative", alignItems: "center", gap: 14, fontSize: 32, fontWeight: 800, letterSpacing: 4 }}>
        <svg width="42" height="42" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="#272B32" strokeWidth="8" /><path d="M49 50 77 22" stroke="#272B32" strokeWidth="10" /><circle cx="49" cy="50" r="7" fill="#272B32" /></svg>
        <span>RADIUS</span>
      </div>
      <div style={{ display: "flex", position: "relative", flexDirection: "column", fontSize: 102, lineHeight: .93, letterSpacing: -6, fontWeight: 900, maxWidth: 650 }}><span>EVERY STREET</span><span>IS YOURS.</span></div>
      <div style={{ display: "flex", position: "relative", fontSize: 21, letterSpacing: 3 }}>ELECTRIC URBAN BICYCLE / 01</div>
    </div>,
    size,
  );
}

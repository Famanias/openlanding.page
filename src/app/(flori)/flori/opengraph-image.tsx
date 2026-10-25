import { ImageResponse } from "next/og";
export const alt = "Flori — a little flower club for everyday occasions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#FFF9F0", color: "#344C40" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 44, marginBottom: 30 }}>
      <svg width="48" height="48" viewBox="0 0 64 64">
        {[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="32" cy="19" rx="8" ry="13" fill="#344C40" transform={`rotate(${angle} 32 32)`} />)}
        <circle cx="32" cy="32" r="6" fill="#F5DF9B" />
      </svg>
      flori
    </div>
    <div style={{ fontSize: 90, fontFamily: "serif", lineHeight: 1.1 }}>A little bloom.</div>
    <div style={{ fontSize: 90, fontFamily: "serif", fontStyle: "italic", lineHeight: 1.1 }}>A brighter day.</div>
    <div style={{ display: "flex", gap: 16, marginTop: 40 }}>{["#D8D1EC", "#F1C6CF", "#F5DF9B", "#D9E6C8", "#EDB997"].map((color) => <div key={color} style={{ width: 130, height: 70, background: color, borderRadius: "60px 60px 12px 12px" }} />)}</div>
  </div>, size);
}

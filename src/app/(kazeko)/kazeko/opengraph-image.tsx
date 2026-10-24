import { ImageResponse } from "next/og";
export const alt = "Studio Kazeko — a little wonder, a world of feeling";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#D6E7EB", color: "#243C35", padding: 70, flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ fontSize: 26, display: "flex", letterSpacing: 5 }}>STUDIO KAZEKO / INDEPENDENT ANIMATION</div>
    <div style={{ display: "flex", fontSize: 88, fontFamily: "serif", flexDirection: "column" }}><span>A little wonder.</span><span>A world of feeling.</span></div>
    <div style={{ display: "flex", fontSize: 24 }}>Hand-drawn stories. Quietly extraordinary worlds.</div>
  </div>, size);
}

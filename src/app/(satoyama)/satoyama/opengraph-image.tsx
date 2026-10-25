import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#F6F3E8", color: "#2F4438", padding: 72, flexDirection: "column", justifyContent: "center" }}><div style={{ display: "flex", fontSize: 20, letterSpacing: 7 }}>SATOYAMA BIYORI</div><div style={{ display: "flex", fontSize: 78, marginTop: 35 }}>A little closer to nature.</div><div style={{ display: "flex", fontSize: 78, fontStyle: "italic" }}>A little closer to yourself.</div><div style={{ display: "flex", marginTop: 35, fontSize: 25 }}>An illustrated journey into rural Japan.</div><div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 55, background: "#ADC3A1", display: "flex" }} /></div>, size);
}

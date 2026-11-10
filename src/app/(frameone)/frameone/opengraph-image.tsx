import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#201D1E", color: "#F7F2E9" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4 }}><span>FRAME / ONE</span><span>FILM &amp; STILL</span></div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}><div style={{ width: 11, height: 190, background: "#B13F32" }} /><div style={{ display: "flex", flexDirection: "column", fontSize: 100, lineHeight: 0.95, fontWeight: 700 }}><span>EVERY FRAME</span><span>HAS A STORY.</span></div></div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3 }}><span>AN INDEPENDENT PRACTICE</span><span>FICTIONAL PORTFOLIO / 01</span></div>
  </div>, size);
}

import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#CDB3A3", color: "#243A32", padding: 72 }}><div style={{ fontSize: 38, fontWeight: 700 }}>✳ avel.</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 82, letterSpacing: -4 }}>More room for</div><div style={{ fontSize: 82, letterSpacing: -4 }}>good thinking.</div></div><div style={{ fontSize: 24 }}>A family of AI models for the way you work.</div></div>, size);
}

import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#BEAA97", color: "#4B3C2E" }}><div style={{ fontSize: 32, fontWeight: 700 }}>× &nbsp; landing—x</div><div style={{ display: "flex", flexDirection: "column", fontSize: 85, lineHeight: 1.05, letterSpacing: -3 }}><span>Ideas deserve</span><span>better landings.</span></div><div style={{ fontSize: 22 }}>A creative skill for landing pages.</div></div>, size);
}

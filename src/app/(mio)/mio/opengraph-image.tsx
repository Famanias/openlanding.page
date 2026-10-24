import { ImageResponse } from "next/og";
export const alt = "Mio Hazuki — Little worlds, made just for you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#A8B1D1", color: "#232C49" }}><div style={{ fontSize: 26, display: "flex" }}>mio hazuki · illustration & little worlds</div><div style={{ fontFamily: "serif", fontSize: 86, lineHeight: 1.14, display: "flex", flexDirection: "column" }}><span>A little wonder,</span><span>made just for you.</span></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}><span>Original illustrations · Personal commissions</span><span>Come dream a little →</span></div></div>, size);
}

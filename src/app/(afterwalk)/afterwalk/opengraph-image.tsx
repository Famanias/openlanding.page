import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Afterwalk — good things happen on foot";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 72px", background: "#F7F5EB", color: "#1E3529", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, fontWeight: 700 }}><span>✳ afterwalk.</span><span style={{ fontSize: 16, letterSpacing: "0.14em" }}>A LITTLE MORE OUTSIDE</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.06em" }}><span>Good things happen</span><span>on foot.</span></div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}><span>A walking club for the long way home.</span><span>GOOD COMPANY ↗</span></div>
  </div>, size);
}

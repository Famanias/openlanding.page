import { ImageResponse } from "next/og";
export const alt = "Pello — money for the life you want";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraph() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 70, background: "#FFF9F1", color: "#321C2D" }}><div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700 }}>pello<span style={{ width: 14, height: 14, borderRadius: "50%", marginLeft: 8, background: "#EF9A9A" }}/></div><div style={{ display: "flex", flexDirection: "column", fontSize: 82, letterSpacing: -5, lineHeight: 1.04 }}><span>Make room for</span><span style={{ color: "#653453" }}>your next big thing.</span></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>A little clearer. A little closer.</span><span>Money for living ↗</span></div></div>, size);
}

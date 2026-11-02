import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0B0A20", color: "#F8F6FF" }}><div style={{ display: "flex", alignItems: "center", gap: 15, color: "#A887FF", fontSize: 30 }}><svg width="38" height="38" viewBox="0 0 38 38"><path d="M4 25.5C10 12 18.4 6 33.5 6M4 33C12 20.5 22 16 33.5 16" fill="none" stroke="#A887FF" strokeWidth="5" strokeLinecap="round"/></svg>arc&amp;signal.</div><div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.05 }}>Good brands deserve <span style={{ color: "#D9C8FF" }}>great momentum.</span></div><div style={{ display: "flex", fontSize: 24, color: "#B9B2D0" }}>Independent creative growth studio</div></div>, size);
}

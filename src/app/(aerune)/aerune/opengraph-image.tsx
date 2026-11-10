import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#101A1D", color: "#F3EFE5", flexDirection: "column", justifyContent: "space-between", padding: 70 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}><span style={{ color: "#ED7546" }}>◉</span> aerune.</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.05, letterSpacing: -4 }}><span>Make room</span><span>for better air.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#C6D8CF" }}><span>THE AIR HAS A STORY</span><span>WORKPLACE AIR INTELLIGENCE</span></div>
    </div>, size,
  );
}

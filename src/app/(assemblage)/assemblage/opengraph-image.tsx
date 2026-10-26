import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F6F0E8", color: "#1E1D1B", padding: "64px", position: "relative", overflow: "hidden", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "56%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 2 }}>
          <span style={{ width: 24, height: 24, background: "#D95F3F", display: "flex" }} />
          <span>assemblage.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.02, fontWeight: 700 }}>
            <span>Make the idea visible</span>
            <span>before you make it real.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#1D6C63" }}>
            Material studies for independent brands.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 2 }}>
          MATERIAL STUDY / 01
        </div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 80, width: 340, height: 480, background: "#E7C65A", transform: "rotate(9deg)", display: "flex" }} />
      <div style={{ position: "absolute", right: 150, top: 120, width: 330, height: 430, background: "#1D6C63", transform: "rotate(-10deg)", display: "flex" }} />
      <div style={{ position: "absolute", right: 200, top: 200, width: 250, height: 300, background: "#D95F3F", transform: "rotate(3deg)", display: "flex" }} />
    </div>,
    { ...size },
  );
}

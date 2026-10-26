import { ImageResponse } from "next/og";
export const alt = "FIRSTDAY — Big futures. Small first steps.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "60px 70px",
        background: "#F5F6F2",
        color: "#242B29",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 40 }}>firstday.</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 94,
          letterSpacing: -6,
          lineHeight: 1.05,
        }}
      >
        <span>Big futures.</span>
        <span>Small first steps.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
        }}
      >
        <span>A little experience changes everything.</span>
        <span
          style={{
            background: "#D3E6D5",
            padding: "16px 28px",
            borderRadius: 40,
          }}
        >
          Find your first day ↗
        </span>
      </div>
    </div>,
    size,
  );
}

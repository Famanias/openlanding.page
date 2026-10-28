import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#080604",
        color: "#F0E8D8",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, letterSpacing: 3 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "flex",
            background: "#C8E64C",
          }}
        />
        LOAM
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 1, letterSpacing: -1 }}>
          Grown, not made.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#C8E64C", opacity: 0.9 }}>
          What you see is the smallest part.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          letterSpacing: 3,
          color: "#7A5C43",
        }}
      >
        <span>LIVING MYCELIUM PACKAGING</span>
        <span>01 — 06 INTERACTIVE 3D</span>
      </div>
    </div>,
    size,
  );
}

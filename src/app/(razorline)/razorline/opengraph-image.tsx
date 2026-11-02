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
        background: "#0B0B0A",
        color: "#F1F0E9",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 32,
          letterSpacing: 4,
          color: "#D3FF35",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#D3FF35",
            color: "#0B0B0A",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          //
        </div>
        RAZORLINE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: 1,
            color: "#F1F0E9",
          }}
        >
          RAZORLINE — RL-01 PERFORMANCE FOOTWEAR
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#777A7A",
            maxWidth: 960,
            lineHeight: 1.4,
          }}
        >
          Uncompromising velocity. Engineered rebellion. Direct-to-consumer launch flagship for the RAZORLINE RL-01 performance running series.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(241,240,233,0.12)",
          paddingTop: 24,
          fontSize: 18,
          color: "#777A7A",
          letterSpacing: 2,
        }}
      >
        <span>LAUNCH EDITION // RL-01 SERIES</span>
        <span style={{ color: "#D3FF35" }}>ACCEL // 9.8m/s² · LAT 45.10</span>
      </div>
    </div>
  );
}

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
        background: "#0B0B0B",
        color: "#F4F0E8",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 32,
          letterSpacing: 2,
          color: "#C92533",
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#C92533",
            color: "#F4F0E8",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          //
        </div>
        RIFF
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
            color: "#F4F0E8",
          }}
        >
          Fall for the sound before the selfie.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#AAA8A6",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          A music-first 18+ dating app that matches people through playlists, genres, favorite artists, and listening chemistry.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(244, 240, 232, 0.2)",
          paddingTop: 24,
          fontSize: 18,
          color: "#AAA8A6",
          letterSpacing: 2,
        }}
      >
        <span>MUSIC-FIRST 18+ DATING</span>
        <span style={{ color: "#C92533" }}>TASTE &gt; LOOKS</span>
      </div>
    </div>
  );
}

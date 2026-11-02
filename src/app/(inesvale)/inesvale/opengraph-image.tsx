import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ines Vale — Independent Photographer";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#F2ECE0",
          color: "#201C19",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>INES VALE</span>
          <span style={{ color: "#BFB7AC" }}>/</span>
          <span style={{ fontSize: 18, color: "#79756F" }}>INDEPENDENT PHOTOGRAPHER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, maxWidth: 900 }}>
            The beauty between moments.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#79756F", maxWidth: 800 }}>
            Photographs of fleeting places, quiet emotions, and everything we almost miss.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#79756F" }}>
          <span>Fine-Art & Editorial Monograph</span>
          <span style={{ color: "#A65D46" }}>Series 01 — 04</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

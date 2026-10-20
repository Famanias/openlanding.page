import { ImageResponse } from "next/og";

export const alt = "KŌJI 麹 — Fermentation kitchen, Tower 1972, Ginza";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1918",
          color: "#EDEAE4",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "64px 72px 0" }}>
          <div style={{ display: "flex", fontSize: 230, fontWeight: 900, letterSpacing: -6, lineHeight: 0.85 }}>KŌJI</div>
          <div
            style={{
              display: "flex",
              width: 140,
              height: 140,
              background: "#C8331F",
              border: "6px solid #EDEAE4",
              outline: "6px solid #C8331F",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              letterSpacing: 4,
            }}
          >
            KOJI
          </div>
        </div>
        <div style={{ display: "flex", padding: "0 72px", fontSize: 34, color: "#8E8A83" }}>
          Fermentation kitchen · Tower 1972 · Ginza
        </div>
        <div
          style={{
            display: "flex",
            gap: 48,
            padding: "22px 72px",
            background: "#C8331F",
            fontSize: 26,
            letterSpacing: 4,
          }}
        >
          <span>OPEN 18:00–23:00</span>
          <span>11 COURSES</span>
          <span>12 SEATS</span>
          <span>B1–14F</span>
        </div>
      </div>
    ),
    size,
  );
}

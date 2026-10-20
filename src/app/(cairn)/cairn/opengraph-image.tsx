import { ImageResponse } from "next/og";

export const alt = "Cairn — Alpine equipment, tested on K2";
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
          padding: "70px 80px",
          background: "linear-gradient(180deg, #0B0C0E 0%, #0F1E33 70%, #16294A 100%)",
          color: "#F5F6F7",
          position: "relative",
        }}
      >
        <svg width="1200" height="380" viewBox="0 0 1000 320" style={{ position: "absolute", left: 0, bottom: 0 }}>
          <path d="M0 320 L0 250 L120 200 L230 240 L330 150 L400 110 L460 40 L480 20 L505 52 L560 90 L620 100 L700 160 L800 210 L900 230 L1000 220 L1000 320 Z" fill="#2A3D5E" />
          <path d="M480 20 L505 52 L494 60 L482 50 L470 64 L460 40 Z" fill="#F5F6F7" />
          <path d="M0 320 L0 290 L300 280 L600 296 L1000 284 L1000 320 Z" fill="#0B0C0E" />
        </svg>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 4, color: "#A5AEBD" }}>ALPINE EQUIPMENT · TESTED ON K2</div>
        <div style={{ display: "flex", fontSize: 220, fontWeight: 800, letterSpacing: -2, lineHeight: 0.8 }}>CAIRN</div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MESA MARKET — Good things come into season";

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
          backgroundColor: "#FDF5E7",
          color: "#24211D",
          border: "16px solid #D94C32",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#D94C32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FDF5E7",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            M
          </div>
          <span style={{ fontSize: 28, fontWeight: 900, color: "#D94C32", letterSpacing: "-0.02em" }}>
            MESA MARKET
          </span>
          <span style={{ fontSize: 20, color: "#3F7047", fontWeight: 700 }}>
            · STALL 089
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 960 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 900, lineHeight: 1.05, color: "#24211D" }}>
            Good things come into season.
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#494D78", fontWeight: 600 }}>
            Farm-to-door grocery · Interactive harvest stall · Illustrative crate builder
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px solid #24211D",
            paddingTop: "24px",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          <span style={{ color: "#3F7047" }}>openlanding.page/templates/mesamarket</span>
          <span style={{ color: "#D94C32" }}>Next.js 16 · React 19 · TypeScript</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

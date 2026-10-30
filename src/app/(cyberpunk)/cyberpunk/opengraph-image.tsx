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
        background: "#090B0E",
        color: "#F8FAFC",
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
          color: "#00F0FF",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#00F0FF",
            color: "#090B0E",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          //
        </div>
        KINETIX // ARCHIVE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: 2,
            color: "#F8FAFC",
          }}
        >
          CYBERPUNK TECHNICAL APPAREL STOREFRONT
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#94A3B8",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          3-Layer ePTFE Storm Shells, Ballistic Cordura Exoskeletons & Modular Carry Systems.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(226,232,240,0.14)",
          paddingTop: 24,
          fontSize: 18,
          color: "#94A3B8",
          letterSpacing: 2,
        }}
      >
        <span>DROP 04 // FW-26 ARCHIVE COLLECTION</span>
        <span style={{ color: "#00F0FF" }}>35.6762° N, 139.6503° E</span>
      </div>
    </div>
  );
}

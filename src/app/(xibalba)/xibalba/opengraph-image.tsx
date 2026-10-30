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
        background: "#040A0E",
        color: "#EEFAF6",
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
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#5FF2C8",
            color: "#040A0E",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          ▲
        </div>
        XIBALBA
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          Night of the Jade Cenote
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#5FF2C8",
            letterSpacing: 2,
          }}
        >
          Subterranean Botanical Reserve & Equinox Equator Ceremony
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          letterSpacing: 4,
          color: "#FFA33E",
        }}
      >
        <span>EQUINOX DESCENT</span>
        <span>YUCATAN CENOTE OBSIDIAN VAULT</span>
      </div>
    </div>
  );
}

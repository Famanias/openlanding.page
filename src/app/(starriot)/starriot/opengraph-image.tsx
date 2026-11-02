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
        background: "#12041B",
        color: "#FFFDF8",
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
          color: "#30F0CC",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FC3CCC",
            color: "#12041B",
            fontWeight: "bold",
            fontSize: 22,
            borderRadius: 6,
          }}
        >
          ✦
        </div>
        STAR RIOT
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: 1,
            color: "#FFFDF8",
          }}
        >
          TONIGHT, WE GO SUPERNOVA.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#CAB9D4",
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(252,60,204,0.25)",
          paddingTop: 24,
          fontSize: 18,
          color: "#CAB9D4",
          letterSpacing: 2,
        }}
      >
        <span>DISCO • HOUSE • ELECTRIC JOY • LATE HOURS</span>
        <span style={{ color: "#30F0CC" }}>STARRIOT.CLUB</span>
      </div>
    </div>
  );
}

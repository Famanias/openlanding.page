import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TOKENS = {
  canvas: "#F8F7F2",
  ink: "#191919",
  cobalt: "#3049F0",
  coral: "#FF735D",
  butter: "#F7E36B",
  lavender: "#D5C8FC",
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: TOKENS.canvas,
        color: TOKENS.ink,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 36, fontWeight: 900 }}>
          <span>nico park.</span>
          <span style={{ color: TOKENS.cobalt, fontSize: 32 }}>*</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            background: TOKENS.butter,
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Product Design Portfolio
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          Design Should Feel Good.
        </div>
        <div style={{ fontSize: 24, color: "#515151", maxWidth: 840, lineHeight: 1.4 }}>
          Playful, modular, tactile industrial and digital product design portfolio featuring LOOP personal audio hardware, FORMA workspace, and interactive design experiments.
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <span
          style={{
            padding: "12px 24px",
            background: TOKENS.cobalt,
            color: "#FFFFFF",
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          LOOP Audio Hardware
        </span>
        <span
          style={{
            padding: "12px 24px",
            background: TOKENS.lavender,
            color: TOKENS.ink,
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          FORMA Workspace
        </span>
        <span
          style={{
            padding: "12px 24px",
            background: "#FFFFFF",
            color: TOKENS.ink,
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Tactile Systems
        </span>
      </div>
    </div>
  );
}

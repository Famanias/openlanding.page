import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VOLUME ZERO — Tune the silence between sounds.";

const INK = "#171B20";
const PAPER = "#F1EEE5";
const ACCENT = "#2B9BAA";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: PAPER, color: INK, padding: "56px 64px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="58" height="58" viewBox="0 0 64 64" fill="none">
              <path d="M32 3 56 17v30L32 61 8 47V17z" stroke={INK} strokeWidth="3" />
              <path d="M32 12v40M13 22l38 20M51 22 13 42" stroke={ACCENT} strokeWidth="2" />
              <circle cx="32" cy="32" r="7" fill={ACCENT} />
            </svg>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "0.08em" }}>VOLUME ZERO</div>
          </div>
          <div style={{ display: "flex", padding: "10px 14px", border: `2px solid ${INK}`, color: INK, fontSize: 14, letterSpacing: "0.16em" }}>FIELD / ACTIVE</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.05em" }}>
              <span>Rooms that let</span>
              <span>sound arrive whole.</span>
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 22, opacity: 0.72 }}>Tune the silence between sounds.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 22, backgroundColor: INK, color: PAPER, width: 250 }}>
            <div style={{ display: "flex", fontSize: 13, color: ACCENT, letterSpacing: "0.15em" }}>ROOM 04 / LISTENER 07</div>
            <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>RT60 0.82 S</div>
            <div style={{ display: "flex", fontSize: 12, opacity: 0.68 }}>acoustic field calibrated</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

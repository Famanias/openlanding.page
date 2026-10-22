import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KINETIC. Megamarket drops, packed by robots, delivered by hand.";

const PAPER = "#FAF7F2";
const INK = "#1B1522";
const ACCENT = "#FF6B2B";
const APRICOT = "#FFE6D2";
const MINT = "#00D4B2";
const CARBON = "#2A1E30";

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
          backgroundColor: PAPER,
          color: INK,
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
              <rect x="2" y="2" width="60" height="60" rx="18" fill={INK} />
              <path d="M20 18V46" stroke={PAPER} strokeWidth="4.5" strokeLinecap="round" />
              <path d="M42 20L26 33L44 46" stroke={ACCENT} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="38" cy="20" r="3.5" fill={MINT} />
            </svg>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
              kinetic<span style={{ color: ACCENT }}>.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 9999,
              backgroundColor: APRICOT,
              color: INK,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            UNIT 104 · DISPATCHED
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              <span>From One Click</span>
              <span>to Your Hands in 24m.</span>
            </div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 24, color: INK, opacity: 0.8 }}>
              Megamarket drops, packed by robots, delivered by hand.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              borderRadius: 24,
              backgroundColor: CARBON,
              color: PAPER,
              width: 280,
              gap: 12,
            }}
          >
            <div style={{ display: "flex", fontSize: 13, color: MINT, fontWeight: 700 }}>
              ROUTE TELEMETRY
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 800, color: ACCENT }}>
              24 MIN
            </div>
            <div style={{ display: "flex", fontSize: 12, opacity: 0.7 }}>
              Chicago DC &rarr; Dallas Dock
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

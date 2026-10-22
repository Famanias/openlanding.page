import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BATHYS — Autonomous Hadal Exploration Vehicles";

const TRENCH = "#03070D";
const NAVY = "#0A1526";
const TITANIUM = "#EDF5FA";
const CYAN = "#00E5FF";
const AMBER = "#FF9E1B";
const GLASS = "#122338";
const SLATE = "#546E8A";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: TRENCH,
          color: TITANIUM,
          fontFamily: "sans-serif",
          position: "relative",
          padding: "64px 72px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680, zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
            <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="36" stroke={TITANIUM} strokeWidth="4" />
              <circle cx="40" cy="40" r="28" stroke={SLATE} strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="40" cy="40" r="18" stroke={CYAN} strokeWidth="3" />
              <circle cx="40" cy="40" r="6" fill={CYAN} />
              <path d="M50 30 L63 17 M53 40 L71 40 M50 50 L63 63" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 4, color: TITANIUM }}>BATHYS</div>
            <div style={{ fontSize: 13, letterSpacing: 2.5, color: SLATE, marginLeft: 10 }}>BREST &amp; MONTEREY</div>
          </div>

          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, color: TITANIUM }}>
            Engineered for the 11,000-metre breach.
          </div>

          <div style={{ fontSize: 20, color: SLATE, marginTop: 20, lineHeight: 1.4 }}>
            Autonomous titanium submersibles engineered to endure 1,100 bar hydrostatic pressure in the Challenger Deep without umbilical tether.
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SLATE}`, borderRadius: 4, fontSize: 13, color: CYAN }}>
              DEPTH: 10,928 M
            </div>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SLATE}`, borderRadius: 4, fontSize: 13, color: AMBER }}>
              PRESSURE: 1,114 BAR
            </div>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SLATE}`, borderRadius: 4, fontSize: 13, color: TITANIUM }}>
              Ti-6Al-4V GRADE 5
            </div>
          </div>
        </div>

        {/* Right side radar / hull diagram */}
        <div style={{ display: "flex", position: "relative", width: 380, height: 380, alignItems: "center", justifyContent: "center" }}>
          <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
            <circle cx="180" cy="180" r="160" stroke={NAVY} strokeWidth="2" fill={GLASS} />
            <circle cx="180" cy="180" r="120" stroke={SLATE} strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="180" cy="180" r="75" stroke={CYAN} strokeWidth="2.5" />
            <line x1="180" y1="20" x2="180" y2="340" stroke={SLATE} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="180" x2="340" y2="180" stroke={SLATE} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="180" cy="180" r="8" fill={CYAN} />
            <circle cx="230" cy="130" r="5" fill={AMBER} />
            <line x1="180" y1="180" x2="270" y2="90" stroke={CYAN} strokeWidth="2" />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}

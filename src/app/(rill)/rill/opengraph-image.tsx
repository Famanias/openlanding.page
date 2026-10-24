import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "RILL — Make every drop take the long way.";

const INK = "#14231E";
const PAPER = "#F0E9DB";
const OXIDE = "#B85C43";
const RIVER = "#5B8174";
const LICHEN = "#87956C";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: PAPER, color: INK, padding: "54px 64px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <svg width="58" height="58" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="22" stroke={INK} strokeWidth="2" opacity=".35" />
              <path d="M12 37c12-14 23-15 37-5 5 3 9 4 13 2" stroke={RIVER} strokeWidth="3" strokeLinecap="round" />
              <circle cx="32" cy="32" r="5" fill={OXIDE} />
            </svg>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: "0.08em" }}>RILL</div>
          </div>
          <div style={{ display: "flex", padding: "10px 14px", border: `2px solid ${INK}`, fontSize: 14, letterSpacing: "0.14em" }}>FIELD / 042 MM</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.05em" }}>
              <span>Make every drop</span>
              <span>take the long way.</span>
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 22, opacity: 0.72 }}>Field hydrology for farms that keep water in the ground.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 22, backgroundColor: INK, color: PAPER, width: 250 }}>
            <div style={{ display: "flex", fontSize: 13, color: OXIDE, letterSpacing: "0.15em" }}>ROOT ZONE / READY</div>
            <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>42 MM</div>
            <div style={{ display: "flex", fontSize: 12, color: LICHEN }}>water held where roots can use it</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}


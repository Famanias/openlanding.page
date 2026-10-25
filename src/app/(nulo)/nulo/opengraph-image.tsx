import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NULO. Tune your view. A modular optical lab for moving days.";

const PAPER = "#F5F8F4";
const INK = "#14232B";
const LILAC = "#B8B3FF";
const PEACH = "#FFB49D";
const MINT = "#9ADBD1";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: PAPER, color: INK, padding: "54px 64px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="54" height="54" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="17" fill="none" stroke={INK} strokeWidth="2" />
          <circle cx="24" cy="24" r="9" fill={LILAC} stroke={INK} strokeWidth="1.4" />
          <path d="M24 4v7M24 37v7M4 24h7M37 24h7" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M29.5 8.5c2.7-3.3 6.4-3.9 9.8-2.5-1.5 3.6-4.5 5.3-8.9 4.7" fill={PEACH} stroke={INK} strokeWidth="1.2" />
        </svg>
        <div style={{ display: "flex", fontSize: 42, fontWeight: 700, letterSpacing: -2 }}>nulo<span style={{ color: PEACH }}>.</span></div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 670 }}>
          <div style={{ display: "flex", fontSize: 88, lineHeight: .93, fontWeight: 700, letterSpacing: -6 }}>Tune your view.</div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 25, lineHeight: 1.25, color: INK }}>Modular prescription frames calibrated for moving days.</div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 315, height: 315, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", position: "absolute", width: 315, height: 315, borderRadius: 180, border: `1px solid ${INK}`, transform: "rotate(-8deg)" }} />
          <div style={{ display: "flex", position: "absolute", width: 265, height: 265, borderRadius: 180, border: `1px dashed ${INK}` }} />
          <div style={{ display: "flex", width: 170, height: 170, borderRadius: 100, backgroundColor: LILAC, border: `1px solid ${INK}`, boxShadow: `18px 18px 0 ${MINT}`, alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", width: 64, height: 64, borderRadius: 50, backgroundColor: PAPER, border: `1px solid ${INK}` }} />
          </div>
          <div style={{ display: "flex", position: "absolute", top: 12, width: 4, height: 32, backgroundColor: PEACH, borderRadius: 4 }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, letterSpacing: 1, textTransform: "uppercase" }}>
        <span>Optical lab / 03 modes / nulo.example</span>
        <span style={{ color: INK }}>Screen · Street · Night</span>
      </div>
    </div>,
    { ...size },
  );
}

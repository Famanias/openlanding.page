import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Calder & Rowe. Hard decisions, argued well. A New York law firm for business, disputes, employment and estates.";

const INK = "#070C17";
const MIDNIGHT = "#0E1830";
const IVORY = "#F5F0E4";
const GOLD = "#C9A55A";

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
          backgroundColor: MIDNIGHT,
          backgroundImage: `linear-gradient(160deg, ${MIDNIGHT} 0%, ${INK} 100%)`,
          color: IVORY,
          padding: "64px 72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke={GOLD} strokeWidth="1.2" />
            <g stroke={IVORY} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M24.6 17.6A8.5 8.5 0 1 0 24.6 30.4" />
              <path d="M29 16v16" />
              <path d="M29 16h4.2a4.3 4.3 0 0 1 0 8.6H29" />
              <path d="M32.4 24.6 36 32" />
            </g>
            <circle cx="24" cy="38.4" r="1.1" fill={GOLD} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, letterSpacing: "0.16em", textTransform: "uppercase" }}>Calder &amp; Rowe</span>
            <span style={{ fontSize: 15, letterSpacing: "0.34em", textTransform: "uppercase", color: GOLD, marginTop: 6 }}>Attorneys at law</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 110, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            <span>Hard decisions,</span>
            <span style={{ color: GOLD, fontStyle: "italic" }}>argued well.</span>
            <span style={{ marginTop: 30, fontSize: 27, letterSpacing: "0.02em", color: IVORY, opacity: 0.78, fontStyle: "normal" }}>
              Business law, disputes, employment and estates. New York, since 1987.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: 150,
              height: 150,
              borderRadius: 75,
              border: `2px solid ${GOLD}`,
              alignItems: "center",
              justifyContent: "center",
              color: GOLD,
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Filed
          </div>
        </div>
      </div>
    ),
    size,
  );
}

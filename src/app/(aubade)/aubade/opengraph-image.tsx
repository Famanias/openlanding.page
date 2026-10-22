import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AUBADE — Leave at dusk. Wake somewhere else. The overnight sleeper, Paris to Venezia.";

const NUIT = "#161233";
const LINEN = "#F3ECDF";
const CLARET = "#8E1F3A";
const DAWN = "#F2B37A";
const SAPIN = "#1F4A3F";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: NUIT,
          color: LINEN,
          padding: "64px",
          fontFamily: "serif",
          gap: "56px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <svg width="64" height="64" viewBox="0 0 48 48">
              <rect x="3" y="3" width="42" height="42" rx="13" fill={LINEN} />
              <path d="M13 31a11 11 0 0 1 22 0z" fill={CLARET} />
              <rect x="9" y="31" width="30" height="3" rx="1.5" fill={CLARET} />
            </svg>
            <div style={{ fontSize: 44, letterSpacing: "0.14em" }}>AUBADE</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ fontSize: 22, letterSpacing: "0.16em", color: DAWN, fontFamily: "monospace" }}>
              PARIS 19:12 → VENEZIA 09:48
            </div>
            <div style={{ fontSize: 76, lineHeight: 0.95, display: "flex", flexDirection: "column" }}>
              <span>Leave at dusk.</span>
              <span>Wake somewhere else.</span>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "400px",
            display: "flex",
            position: "relative",
            borderRadius: "48px",
            overflow: "hidden",
            backgroundColor: CLARET,
            border: `12px solid ${LINEN}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "210px",
              top: "250px",
              width: "110px",
              height: "110px",
              borderRadius: "55px",
              backgroundColor: DAWN,
            }}
          />
          <svg width="376" height="478" viewBox="0 0 376 478" style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M0 330 Q90 270 190 310 T376 300 V478 H0Z" fill={NUIT} opacity="0.55" />
            <path d="M0 390 Q120 360 220 380 T376 372 V478 H0Z" fill={SAPIN} />
            <rect x="60" y="0" width="7" height="478" fill={NUIT} />
            <rect x="0" y="40" width="376" height="3" fill={NUIT} />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}

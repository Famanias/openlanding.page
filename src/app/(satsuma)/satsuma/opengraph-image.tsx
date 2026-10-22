import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Satsuma. Reels that land, made by hand. Short product reels from handpicked makers.";

const PAPER = "#FFF6EA";
const INK = "#1F1520";
const AUBERGINE = "#3A1D4A";
const SATSUMA = "#FF7A2F";
const APRICOT = "#FFD9B0";
const LEAF = "#2F5D3A";

const CARDS = [
  { h: 330, w: 150, bg: APRICOT },
  { h: 290, w: 140, bg: SATSUMA },
  { h: 260, w: 132, bg: AUBERGINE },
  { h: 290, w: 140, bg: LEAF },
  { h: 330, w: 150, bg: APRICOT },
];

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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="56" height="56" viewBox="0 0 48 48">
            <circle cx="24" cy="27" r="18" fill={SATSUMA} />
            <path d="M24 27V12M24 27l13-7.5M24 27l13 7.5M24 27v15M24 27l-13 7.5M24 27l-13-7.5" fill="none" stroke={AUBERGINE} strokeWidth="1.6" opacity=".5" />
            <path d="M24 10.5c-.4-5.6 3.6-8.6 9.6-8-.4 5.8-4 8.8-9.6 8z" fill={LEAF} />
            <circle cx="24" cy="27" r="3.4" fill={AUBERGINE} />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            satsuma<span style={{ color: SATSUMA }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.035em" }}>
            <span>Reels that land,</span>
            <span>made by hand.</span>
            <div style={{ display: "flex", marginTop: 24, fontSize: 26, fontWeight: 400, letterSpacing: 0, color: AUBERGINE }}>
              Short product reels from handpicked makers
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {CARDS.map((c, i) => (
              <div key={i} style={{ display: "flex", width: c.w, height: c.h, borderRadius: 22, backgroundColor: c.bg, alignItems: "flex-end", padding: 12 }}>
                <div style={{ display: "flex", width: 34, height: 34, borderRadius: 17, backgroundColor: PAPER, opacity: 0.85 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

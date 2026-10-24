import { ImageResponse } from "next/og";

export const alt = "Alpine Reel — Fourteen peaks. One moving frame.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const ABYSS = "#040B16";
const NAVY = "#08162A";
const ICE = "#6EA8D2";
const SNOW = "#FFFFFF";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: ABYSS, color: SNOW, position: "relative", overflow: "hidden" }}>
      <svg aria-hidden="true" width="1200" height="520" viewBox="0 0 1200 520" style={{ position: "absolute", left: 0, bottom: 0 }}>
        <path d="M0 520V370l145-112 90 68 120-185 96 88 110-150 72 92 102-54 90 142 104-76 170 96 101-77v338Z" fill={NAVY} />
        <path d="m328 141 27-40 34 45-21-11-18 23Z M738 142l16-28 27 36-20-11-12 16Z" fill={SNOW} opacity=".8" />
        <path d="M0 458 180 366l105 46 135-128 126 94 120-102 155 90 180-88 119 82v160H0Z" fill={ICE} opacity=".34" />
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>ALPINE REEL</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 600, lineHeight: 0.9, letterSpacing: -3 }}>Fourteen peaks.</div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 600, lineHeight: 0.9, letterSpacing: -3, color: ICE }}>One moving frame.</div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 19, letterSpacing: 3, opacity: .7 }}>THE EIGHT-THOUSANDERS · 01 / 14</div>
      </div>
    </div>,
    size,
  );
}

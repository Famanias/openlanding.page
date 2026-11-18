import { ImageResponse } from "next/og";
import { PUBLIC_TEMPLATES } from "../../lib/seo";

export const alt = "OpenLandingPage (Open Landing Page): free MIT-licensed landing page templates, from header to footer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors tokens.css (--color-paper, --color-ink, --color-ink-2, --color-accent); ImageResponse cannot read CSS variables.
const PAPER = "#101211";
const INK = "#f4f1e9";
const INK_2 = "#d1d4cc";
const ACCENT = "#daf0bc";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", backgroundColor: PAPER, padding: "72px 80px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", color: ACCENT, fontSize: "34px", fontWeight: 700 }}>
          <svg width="52" height="52" viewBox="0 0 256 256">
            <path fill={ACCENT} d="M90.12,46.44,38.22,128l51.9,81.56a12,12,0,1,1-20.24,12.88l-56-88a12,12,0,0,1,0-12.88l56-88A12,12,0,0,1,90.12,46.44Zm152,75.12-56-88a12,12,0,1,0-20.24,12.88L217.78,128l-51.9,81.56a12,12,0,1,0,20.24,12.88l56-88A12,12,0,0,0,242.12,121.56Z" />
          </svg>
          openlanding.page
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ fontSize: "84px", fontWeight: 600, color: INK, letterSpacing: "-0.05em", lineHeight: 1 }}>Landing Pages, from Header to Footer.</div>
          <div style={{ fontSize: "32px", color: INK_2 }}>{`${PUBLIC_TEMPLATES.length} free templates · MIT licensed · AI rebuild prompts`}</div>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#171414";
const paper = "#F7F2E9";
const cotton = "#FFF9F0";
const accent = "#D86B4A";
const board = "#344A3E";

export default function OpenhouseOpenGraph() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: paper, color: ink, padding: "64px 72px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 700 }}>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${ink}`, color: accent }}>⌂</div>
        openhouse
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 650 }}>
          <div style={{ color: accent, fontSize: 22, marginBottom: 24 }}>A focused page for owner-led businesses</div>
          <div style={{ fontSize: 70, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3 }}>Turn more first clicks into good conversations.</div>
        </div>
        <div style={{ width: 300, height: 270, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28, border: `1px solid ${board}`, background: cotton }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: board }}>The front desk <span style={{ color: accent }}>●</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>Open the right invitation.</div>
            <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: ink, color: paper, fontSize: 16 }}>Book my 20-minute call ↗</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${board}`, paddingTop: 16, color: board, fontSize: 18 }}>
        <span>One action</span><span>Short form</span><span>Clear handoff</span>
      </div>
    </div>,
    { ...size },
  );
}

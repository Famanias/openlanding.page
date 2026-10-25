import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FIXTURE — Your shop, fitted out properly.";

const INK = "#121316";
const PAPER = "#F3F2EE";
const WHITE = "#FFFFFF";
const CRIMSON = "#CF1F35";
const GRAPHITE = "#5E6168";
const HAIRLINE = "#D9D7D0";
const TILL = "#1E7A4C";

const stages = ["Shell", "Fixtures", "Wiring", "Signage", "Open"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: PAPER, color: INK, padding: "56px 64px", fontFamily: "sans-serif", position: "relative" }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: 64 + ((1200 - 128) / 12) * (i + 1), width: 1, backgroundColor: HAIRLINE }} />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="52" height="52" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill={INK} />
              <rect x="9" y="7" width="4" height="18" fill={PAPER} />
              <rect x="9" y="7" width="15" height="3.6" fill={PAPER} />
              <rect x="9" y="17" width="11" height="3.2" fill={PAPER} />
              <rect x="15.5" y="12.4" width="4.2" height="4.6" fill={CRIMSON} />
            </svg>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "0.02em" }}>FIXTURE</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 16, color: CRIMSON, letterSpacing: "0.14em", marginBottom: 18 }}>SHOPIFY STUDIO · ROTTERDAM</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 0.94, letterSpacing: "-0.045em" }}>
              <span>Your shop,</span>
              <span>fitted out</span>
              <span>properly.</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {stages.map((stage, i) => (
              <div key={stage} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", border: `1px solid ${i === 4 ? INK : HAIRLINE}`, backgroundColor: i === 4 ? INK : WHITE, color: i === 4 ? PAPER : GRAPHITE, borderRadius: 4, fontSize: 15 }}>
                <span style={{ color: CRIMSON }}>0{i + 1}</span>
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "auto", width: 430, height: 518, backgroundColor: WHITE, border: `1px solid ${HAIRLINE}`, borderRadius: 10, overflow: "hidden", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 16px", borderBottom: `1px solid ${HAIRLINE}` }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: HAIRLINE }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: HAIRLINE }} />
            <div style={{ display: "flex", marginLeft: 10, padding: "6px 12px", backgroundColor: PAPER, borderRadius: 4, fontSize: 14, color: GRAPHITE }}>fennelandclay.com</div>
          </div>
          <div style={{ display: "flex", padding: "8px 16px", backgroundColor: INK, color: PAPER, fontSize: 13 }}>Free shipping over €60 · Kiln drop Friday</div>
          <div style={{ display: "flex", flexDirection: "column", padding: 22, gap: 14 }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em" }}>Hand-thrown stoneware, fired in small batches.</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", flex: 1, height: 150, backgroundColor: PAPER, borderRadius: 6, alignItems: "center", justifyContent: "flex-end", paddingBottom: 18 }}>
                  <div style={{ width: 54 - i * 8, height: 58 + i * 14, backgroundColor: i === 1 ? INK : GRAPHITE, borderRadius: "10px 10px 18px 18px" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", padding: "12px 14px", border: `1px solid ${TILL}`, color: TILL, borderRadius: 6, fontSize: 15 }}>No. 1042 · Tide mug ×2 · €68.00 · Utrecht</div>
          </div>
          <div style={{ position: "absolute", top: 104, right: 18, display: "flex", padding: "10px 16px", backgroundColor: TILL, color: WHITE, borderRadius: 4, fontSize: 18, fontWeight: 700, letterSpacing: "0.14em" }}>OPEN</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

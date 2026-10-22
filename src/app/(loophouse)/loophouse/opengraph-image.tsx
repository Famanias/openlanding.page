import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "LOOPHOUSE — Tools in circulation, work in common.";

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
          backgroundColor: "#111618",
          color: "#F4EFE6",
          padding: "72px",
          fontFamily: "sans-serif",
          border: "8px solid #7E8A90",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
              <rect x="4" y="4" width="56" height="56" rx="6" stroke="#F4EFE6" strokeWidth="5" />
              <circle cx="32" cy="32" r="16" stroke="#F4EFE6" strokeWidth="5" />
              <circle cx="32" cy="32" r="5" fill="#1E51EB" />
              <path d="M18 4V0M46 4V0M18 64V60M46 64V60" stroke="#7E8A90" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-1px" }}>LOOPHOUSE</div>
              <div style={{ fontSize: 16, letterSpacing: "4px", color: "#7E8A90", marginTop: "4px" }}>
                COMMUNITY TOOL CIRCULATION &bull; WORKSHOP
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#1E51EB",
              color: "#F4EFE6",
              padding: "12px 28px",
              borderRadius: "4px",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            428 TOOLS AVAILABLE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#1E51EB",
              letterSpacing: "4px",
              marginBottom: "16px",
            }}
          >
            MODULAR PEGBOARD WORKSHOP // CALIBRATED TRADE GEAR
          </div>
          <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.02, maxWidth: 1000 }}>
            The neighborhood workshop on your block.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: "32px" }}>
            <div
              style={{
                backgroundColor: "#DED7C5",
                color: "#111618",
                borderRadius: "4px",
                padding: "10px 22px",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              CABINETRY &bull; TIMBER &bull; RIGGING
            </div>
            <div
              style={{
                border: "2px solid #7E8A90",
                borderRadius: "4px",
                padding: "10px 22px",
                fontSize: 18,
                color: "#7E8A90",
              }}
            >
              6-MINUTE WALK
            </div>
            <div
              style={{
                border: "2px solid #1E51EB",
                borderRadius: "4px",
                padding: "10px 22px",
                fontSize: 18,
                color: "#1E51EB",
              }}
            >
              98.4% ON-TIME RETURN
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

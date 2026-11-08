import { ImageResponse } from "next/og";

export const alt = "Patchbay: one portfolio, four disciplines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ROLES = ["WEB", "FULL-STACK", "AI", "UX/UI"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#15161A", color: "#ECE8DF", padding: 72 }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#9A9CA3" }}>PATCHBAY · DEVELOPER PORTFOLIO</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1.02, fontWeight: 700 }}>
          <div style={{ display: "flex" }}>One engineer from</div>
          <div style={{ display: "flex", color: "#F2A93B" }}>schema to pixel.</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {ROLES.map((role, index) => (
            <div
              key={role}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 22px",
                border: "2px solid #34373D",
                background: index === 1 ? "#F2A93B" : "#1E2024",
                color: index === 1 ? "#15161A" : "#ECE8DF",
                fontSize: 26,
              }}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

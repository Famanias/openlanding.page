import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SUNDIAL Coffee Roasters — Roasted to the minute.";

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
          backgroundColor: "#F7F1E6",
          color: "#241611",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Tangerine sun wedge, top right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "26px",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="31" fill="#241611" />
              <path
                d="M32 9 C 23 21 41 43 32 55"
                fill="none"
                stroke="#F7F1E6"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <circle cx="32" cy="32" r="5" fill="#FF6B1A" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-1px" }}>SUNDIAL</div>
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: "10px",
                  marginTop: "8px",
                  color: "#6F6152",
                }}
              >
                COFFEE ROASTERS
              </div>
            </div>
          </div>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 999,
              backgroundColor: "#FF6B1A",
              display: "flex",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.02, maxWidth: 900 }}>
            Every batch has a curve.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: "28px" }}>
            <div
              style={{
                backgroundColor: "#0F5C3F",
                color: "#F7F1E6",
                borderRadius: 999,
                padding: "10px 26px",
                fontSize: 20,
                letterSpacing: "2px",
              }}
            >
              12 KG BATCHES
            </div>
            <div
              style={{
                border: "2px solid #241611",
                borderRadius: 999,
                padding: "10px 26px",
                fontSize: 20,
                letterSpacing: "2px",
              }}
            >
              CURVE ON EVERY BAG
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

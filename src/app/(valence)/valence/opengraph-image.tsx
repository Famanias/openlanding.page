import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#FBF9F5",
          color: "#1E1B2E",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "28px",
                backgroundColor: "#E8E0F8",
                border: "3px solid #1E1B2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  backgroundColor: "#D9F2E6",
                  border: "3px solid #1E1B2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "6px",
                    backgroundColor: "#5B46E8",
                  }}
                />
              </div>
            </div>
            <span style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-0.03em" }}>
              valence.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <span
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                backgroundColor: "#E8E0F8",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              01 · SPLASH GATE
            </span>
            <span
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                backgroundColor: "#D9F2E6",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              02 · SQUEEZE PAGE
            </span>
            <span
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                backgroundColor: "#FCE2D5",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              03 · LEAD CAPTURE
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "880px" }}>
          <div
            style={{
              fontSize: "74px",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
            }}
          >
            Three capture gates. One calibrated value exchange.
          </div>
          <div style={{ fontSize: "26px", color: "#645D7A", lineHeight: 1.4 }}>
            The 2026 B2B Funnel Architecture Monograph &amp; Interactive 3D Capsule Dossier.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "2px solid #E8E0F8",
          }}
        >
          <span style={{ fontSize: "18px", color: "#645D7A" }}>
            418 B2B SaaS Funnels Analyzed · Ask only for what the asset earns
          </span>
          <span
            style={{
              padding: "12px 26px",
              borderRadius: "999px",
              backgroundColor: "#5B46E8",
              color: "#FBF9F5",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Unseal the 2026 Dossier →
          </span>
        </div>
      </div>
    ),
    size,
  );
}

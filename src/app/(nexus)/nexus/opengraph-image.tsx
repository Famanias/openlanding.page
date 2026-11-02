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
          padding: 80,
          background: "#F5F1E8",
          color: "#221B15",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#777B45",
              letterSpacing: "-0.02em",
            }}
          >
            nexus
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#A45337",
              background: "#F9DEC7",
              padding: "8px 20px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Human-First Creative Marketing
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.08,
              fontWeight: 800,
              color: "#221B15",
              letterSpacing: "-0.03em",
            }}
          >
            Marketing that feels <span style={{ color: "#A45337", fontStyle: "italic" }}>human.</span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#5C5044",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Tactile clay sculptures, hand-drawn botanical illustrations, and high-contrast editorial craft for brands with something to say.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            fontSize: 20,
            color: "#5C5044",
            borderTop: "1px solid #DCCEBB",
            paddingTop: 24,
          }}
        >
          <span>Portland · Kyoto</span>
          <span>·</span>
          <span>Brand Worldbuilding</span>
          <span>·</span>
          <span>Tactile Campaigns</span>
          <span>·</span>
          <span>Experiential Web</span>
        </div>
      </div>
    ),
    size
  );
}

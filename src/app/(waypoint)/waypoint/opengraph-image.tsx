import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#EDE6DF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#121417",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F5EFEB",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            ▲
          </div>
          <span style={{ fontSize: "32px", fontWeight: 800, color: "#121417", letterSpacing: "-0.03em" }}>
            Waypoint
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#DBE8FA",
              color: "#1E4F94",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "18px",
              fontWeight: 700,
              alignSelf: "flex-start",
            }}
          >
            Direct Career Outreach &amp; Pipeline Deck
          </div>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#121417",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Pitch with intention. Land the offer.
          </h1>
          <p style={{ fontSize: "24px", color: "#666E7D", maxWidth: "880px", margin: 0, lineHeight: 1.4 }}>
            Waypoint turns unstructured job hunting into a calm, systematic career pipeline for senior software engineers and product designers.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #D8D0C5", paddingTop: "24px" }}>
          <span style={{ fontSize: "20px", color: "#666E7D", fontWeight: 600 }}>
            OpenLandingPage Gallery
          </span>
          <span style={{ fontSize: "20px", color: "#121417", fontWeight: 700 }}>
            openlanding.page/waypoint
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

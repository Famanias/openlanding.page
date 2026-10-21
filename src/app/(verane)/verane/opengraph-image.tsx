import { ImageResponse } from "next/og";

export const alt = "Maison Vérane — Composed slowly. Worn for hours.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#2A1E22",
          color: "#E3DFD8",
          padding: "80px 96px",
          position: "relative",
        }}
      >
        {/* Subtle decorative background border */}
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "1px solid #5F5753",
            opacity: 0.35,
          }}
        />

        {/* Top header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#B59A6A",
            }}
          >
            Maison Vérane · Grasse · Édition 07
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              letterSpacing: 4,
              color: "#CFC9C0",
            }}
          >
            H 00:00 → H 12:00
          </div>
        </div>

        {/* Center / Main title */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: "#E3DFD8",
              marginBottom: 20,
            }}
          >
            A fragrance is twelve hours long.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "#CFC9C0",
              fontWeight: 300,
            }}
          >
            Composed slowly in Grasse. Four editions per year, rested in oak for eighteen months.
          </div>
        </div>

        {/* Footer info & stamp */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #5F5753",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 36,
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#5F5753",
            }}
          >
            <span>Nº 1 Première Heure</span>
            <span>Nº 2 Iris Calcaire</span>
            <span>Nº 3 Fumée Lente</span>
            <span>Nº 4 Nuit d&apos;Oratoire</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              border: "1px solid #655A7E",
              color: "#655A7E",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            400 Flacons
          </div>
        </div>
      </div>
    ),
    size,
  );
}

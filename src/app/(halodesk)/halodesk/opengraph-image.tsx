import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#F8F5EE",
        color: "#29313E",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 28,
          fontWeight: 600,
          color: "#29313E",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "#DCD5F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            color: "#29313E",
          }}
        >
          H
        </div>
        Halo Desk
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
            color: "#262E3B",
          }}
        >
          Organize your work without losing your calm.
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#4E5968",
            maxWidth: 860,
            lineHeight: 1.5,
          }}
        >
          A desktop productivity app for focused planning, clear priorities, and beautifully structured days.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(58, 68, 83, 0.15)",
          paddingTop: 24,
          fontSize: 18,
          color: "#66717F",
        }}
      >
        <span>Desktop Productivity · Structured Planning</span>
        <span style={{ color: "#29313E", fontWeight: 500 }}>halodesk.app</span>
      </div>
    </div>
  );
}

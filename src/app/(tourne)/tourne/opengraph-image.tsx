import { ImageResponse } from "next/og";

export const alt = "TOURNE: hand-turned vessels, made to order";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F4EEE3", color: "#1F1A17", padding: 72, justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 640 }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#6B5E54" }}>TOURNE · POTTERY STUDIO</div>
          <div style={{ display: "flex", fontSize: 108, lineHeight: 1, fontWeight: 600 }}>Shape it. We throw it.</div>
          <div style={{ display: "flex", fontSize: 32, color: "#6B5E54" }}>Hand-turned vessels, made to order.</div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 360, height: 460, alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ display: "flex", position: "absolute", bottom: 0, width: 340, height: 40, borderRadius: 40, background: "#1F1A17" }} />
          <div style={{ display: "flex", width: 250, height: 380, marginBottom: 24, background: "#A8492D", borderRadius: "90px 90px 120px 120px" }} />
          <div style={{ display: "flex", position: "absolute", top: 36, width: 120, height: 40, background: "#F4EEE3", borderRadius: 40, opacity: 0.0 }} />
        </div>
      </div>
    ),
    size,
  );
}

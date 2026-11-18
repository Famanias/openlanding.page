import { ImageResponse } from "next/og";

export const alt = "Snoot: every check-up, nose to tail";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1F1B3A";
const PAPER = "#FFF4E4";
const MILK = "#FFFCF6";
const PINK = "#FF6B8B";
const BLUE = "#3550F0";
const YOLK = "#FFC23D";
const FRANK = "#C9773F";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: PAPER, color: INK, padding: 64, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", width: 64, height: 64, borderRadius: 32, background: PINK, border: `5px solid ${INK}`, alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", width: 26, height: 20, borderRadius: "14px 14px 20px 20px", background: INK }} />
            </div>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>snoot</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", fontSize: 104, lineHeight: 0.95, fontWeight: 800, letterSpacing: -2 }}>Every check-up, nose to tail.</div>
            <div style={{ display: "flex", fontSize: 30 }}>A neighbourhood vet your pet doesn&apos;t dread.</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Dogs", "Cats", "Rabbits", "Small & scaly"].map((label) => (
              <div key={label} style={{ display: "flex", padding: "8px 18px", borderRadius: 999, background: MILK, border: `4px solid ${INK}`, fontSize: 24, fontWeight: 700 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", position: "absolute", right: -60, top: 70, width: 560, height: 500, borderRadius: "58% 42% 52% 48%", background: BLUE, border: `5px solid ${INK}` }} />
        {/* Frank, in blocks: head, snout, nose, ear, collar */}
        <div style={{ display: "flex", position: "absolute", right: 120, top: 190, width: 260, height: 260, borderRadius: 130, background: FRANK, border: `6px solid ${INK}` }} />
        <div style={{ display: "flex", position: "absolute", right: 300, top: 300, width: 220, height: 110, borderRadius: 55, background: FRANK, border: `6px solid ${INK}` }} />
        <div style={{ display: "flex", position: "absolute", right: 470, top: 318, width: 46, height: 38, borderRadius: "22px 22px 30px 30px", background: INK }} />
        <div style={{ display: "flex", position: "absolute", right: 250, top: 250, width: 30, height: 36, borderRadius: 18, background: INK }} />
        <div style={{ display: "flex", position: "absolute", right: 110, top: 200, width: 100, height: 220, borderRadius: "50px 50px 60px 60px", background: "#C9773F", border: `6px solid ${INK}`, transform: "rotate(-12deg)" }} />
        <div style={{ display: "flex", position: "absolute", right: 150, top: 470, width: 56, height: 56, borderRadius: 28, background: YOLK, border: `5px solid ${INK}` }} />
      </div>
    ),
    { ...size },
  );
}

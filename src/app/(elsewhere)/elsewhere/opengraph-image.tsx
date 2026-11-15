import { ImageResponse } from "next/og";

export const alt = "ELSEWHERE: one cabin, past the last bar of signal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FIR = "#1F2D27";
const MIST = "#E4E7E1";
const GLOW = "#F0A64A";
const CHAR = "#191B18";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: FIR, color: MIST, padding: 72, justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, letterSpacing: 10 }}>
            <div style={{ display: "flex", width: 18, height: 28, background: GLOW, borderRadius: 2 }} />
            ELSEWHERE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", fontSize: 96, lineHeight: 1.02, fontWeight: 600, letterSpacing: -2 }}>Past the last bar of signal.</div>
            <div style={{ display: "flex", fontSize: 30, opacity: 0.8 }}>One cabin. 1,900 metres on foot. No network.</div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            {[14, 22, 30, 38].map((height, index) => (
              <div key={height} style={{ display: "flex", width: 12, height, borderRadius: 2, background: MIST, opacity: index === 0 ? 1 : 0.22 }} />
            ))}
            <div style={{ display: "flex", marginLeft: 16, fontSize: 24, letterSpacing: 4, opacity: 0.8 }}>1 BAR · 650 M TO THE DOOR</div>
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 300, height: 486, alignItems: "flex-end", justifyContent: "center" }}>
          {/* the gable */}
          <div style={{ display: "flex", position: "absolute", bottom: 0, width: 300, height: 300, background: CHAR, borderRadius: 4 }} />
          <div style={{ display: "flex", position: "absolute", bottom: 194, width: 214, height: 214, background: CHAR, transform: "rotate(45deg)", borderRadius: 4 }} />
          {/* the lit door */}
          <div style={{ display: "flex", position: "absolute", bottom: 0, right: 56, width: 104, height: 168, background: GLOW, borderRadius: 3 }} />
        </div>
      </div>
    ),
    size,
  );
}

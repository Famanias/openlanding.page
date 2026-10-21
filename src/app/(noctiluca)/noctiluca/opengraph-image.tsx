import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Noctiluca — a house made of moving light.";

const INK = "#07060B";
const LUMEN = "#F3F0EA";
const GLOW = "#C9B8FF";
const DUSK = "#8E889B";
const GLASS = "#16131F";

/** The corridor in one-point perspective: nested door frames receding to a lit opening. */
export default function OpengraphImage() {
  const frames = [0, 1, 2, 3, 4];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: INK,
          color: LUMEN,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: 70, top: 55, width: 520, height: 520, display: "flex" }}>
          {frames.map((i) => {
            const inset = i * 52;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: inset,
                  top: inset,
                  width: 520 - inset * 2,
                  height: 520 - inset * 2,
                  border: `2px solid ${i === 4 ? GLOW : DUSK}`,
                  opacity: 1 - i * 0.12,
                  display: "flex",
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 230,
              top: 240,
              width: 60,
              height: 72,
              borderRadius: "30px 30px 0 0",
              backgroundColor: GLOW,
              display: "flex",
            }}
          />
          <div style={{ position: "absolute", left: 0, top: 0, width: 520, height: 520, display: "flex" }}>
            <svg width="520" height="520" viewBox="0 0 520 520">
              <line x1="0" y1="0" x2="208" y2="208" stroke={DUSK} strokeWidth="1.5" />
              <line x1="520" y1="0" x2="312" y2="208" stroke={DUSK} strokeWidth="1.5" />
              <line x1="0" y1="520" x2="208" y2="312" stroke={DUSK} strokeWidth="1.5" />
              <line x1="520" y1="520" x2="312" y2="312" stroke={DUSK} strokeWidth="1.5" />
              <line x1="260" y1="0" x2="260" y2="208" stroke={LUMEN} strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 72px",
            width: 640,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <rect width="64" height="64" rx="14" fill={GLASS} />
              <path d="M19 54 V27 a13 13 0 0 1 26 0 V54" fill="none" stroke={LUMEN} strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="32" cy="53" rx="11" ry="3.4" fill={GLOW} />
              <circle cx="32" cy="31" r="4" fill={GLOW} />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>NOCTILUCA</div>
              <div style={{ fontSize: 16, letterSpacing: 5, color: DUSK, marginTop: 6 }}>HOUSE OF MOVING LIGHT · LISBOA</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.0, letterSpacing: -1 }}>A house made of</div>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, color: GLOW }}>moving light.</div>
            <div style={{ fontSize: 22, color: DUSK, marginTop: 26, letterSpacing: 2 }}>
              BLUE HOUR · AURORA · NOCTILUCA · ALPENGLOW
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

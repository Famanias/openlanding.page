import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CHINAGRAPH — Marked for keeps. Collection 07, Concrete Flash, AW26.";

const FILM = "#0C0C0B";
const FLASH = "#F4F3EF";
const GREASE = "#F3C318";

const SELECTS = [2, 4, 5, 7, 10, 12];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: FILM, color: FLASH, padding: "52px 60px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>Chinagraph</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 0.84, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
            <span>Marked</span>
            <span>for keeps.</span>
          </div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.16em", color: GREASE }}>COLLECTION 07 · CONCRETE FLASH · AW26</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginLeft: "auto", padding: 22, backgroundColor: FLASH, borderRadius: 6 }}>
          {[0, 1, 2].map((strip) => (
            <div key={strip} style={{ display: "flex", gap: 10, padding: "16px 12px", backgroundColor: FILM }}>
              {[1, 2, 3, 4].map((col) => {
                const n = strip * 4 + col;
                const selected = SELECTS.includes(n);
                const exposure = 0.16 + ((n * 37) % 30) / 100;
                return (
                  <div key={n} style={{ display: "flex", position: "relative", width: 104, height: 104, backgroundColor: FILM, border: selected ? `4px solid ${GREASE}` : `4px solid ${FILM}`, borderRadius: selected ? 52 : 0, overflow: "hidden" }}>
                    <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: FLASH, opacity: exposure }} />
                    <div style={{ display: "flex", position: "absolute", bottom: 6, left: 8, fontSize: 13, color: FLASH }}>{n}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}

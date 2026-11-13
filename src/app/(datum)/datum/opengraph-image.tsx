import { ImageResponse } from "next/og";

export const alt = "DATUM — Spatial Scene-Graph & GPU Frame Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#F3F4F0",
          color: "#111418",
          padding: "64px 72px",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px solid #D3D7CF",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, letterSpacing: 4, color: "#007A4D" }}>
            <div style={{ width: 14, height: 14, borderRadius: 2, background: "#007A4D" }} />
            DATUM · GPU FRAME STUDIO
          </div>
          <div style={{ display: "flex", fontSize: 88, lineHeight: 0.98, fontWeight: 800 }}>
            Every frame, dissected.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#4A525C", lineHeight: 1.35 }}>
            Five-pass 3D pipeline inspector for WebGL2 & WebGPU teams.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <div
              style={{
                display: "flex",
                padding: "10px 18px",
                background: "#111418",
                color: "#10D98E",
                borderRadius: 4,
                fontSize: 20,
              }}
            >
              11.1 ms / 16.6 ms
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 18px",
                background: "#FFFFFF",
                color: "#111418",
                border: "1px solid #D3D7CF",
                borderRadius: 4,
                fontSize: 20,
              }}
            >
              5 Z-PASSES
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 380,
            height: 440,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 18,
          }}
        >
          {[
            { label: "05 COMPOSITE", bg: "#111418", fg: "#10D98E", border: "#10D98E" },
            { label: "04 BLOOM / FX", bg: "#FFFFFF", fg: "#111418", border: "#007A4D" },
            { label: "03 SHADOWS", bg: "#FFFFFF", fg: "#111418", border: "#D3D7CF" },
            { label: "02 NORMALS", bg: "#FFFFFF", fg: "#111418", border: "#D3D7CF" },
            { label: "01 GEOMETRY", bg: "#FFFFFF", fg: "#4A525C", border: "#111418" },
          ].map((slab, idx) => (
            <div
              key={slab.label}
              style={{
                display: "flex",
                width: 320,
                height: 62,
                padding: "0 22px",
                alignItems: "center",
                justifyContent: "space-between",
                background: slab.bg,
                color: slab.fg,
                border: `2px solid ${slab.border}`,
                borderRadius: 6,
                transform: `translateX(${(idx - 2) * 14}px)`,
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              <span>{slab.label}</span>
              <span>{(2.2 - idx * 0.15).toFixed(1)} ms</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IRIDIA — The spatial architecture of kinetic light.";

const OBSIDIAN = "#0A0B10";
const PRISM = "#F5F3EF";
const HYPERION = "#00F0FF";
const CHROMA = "#FF3366";
const GLASS = "#141724";
const SPECULAR = "#8D93A8";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: OBSIDIAN,
          color: PRISM,
          fontFamily: "sans-serif",
          position: "relative",
          padding: "64px 72px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 660, zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
              <polygon points="32,8 56,52 8,52" stroke={PRISM} strokeWidth="4" />
              <line x1="32" y1="8" x2="32" y2="52" stroke={HYPERION} strokeWidth="3" strokeDasharray="4 3" />
              <circle cx="32" cy="8" r="5" fill={HYPERION} />
            </svg>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: PRISM }}>IRIDIA</div>
            <div style={{ fontSize: 13, letterSpacing: 3, color: SPECULAR, marginLeft: 8 }}>ZURICH &amp; KYOTO</div>
          </div>

          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, color: PRISM }}>
            The spatial architecture of kinetic light.
          </div>

          <div style={{ fontSize: 20, color: SPECULAR, marginTop: 24, lineHeight: 1.4 }}>
            Architectural crystal pavilions bending daylight into real-time Navier-Stokes fluid gradient fields.
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SPECULAR}`, borderRadius: 4, fontSize: 14, color: HYPERION }}>
              REFRACTION n=1.618
            </div>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SPECULAR}`, borderRadius: 4, fontSize: 14, color: CHROMA }}>
              DISPERSION Vd=64.2
            </div>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SPECULAR}`, borderRadius: 4, fontSize: 14, color: SPECULAR }}>
              λ = 480–650 NM
            </div>
          </div>
        </div>

        {/* 3D Prism graphic representation on right */}
        <div style={{ display: "flex", position: "relative", width: 400, height: 400, alignItems: "center", justifyContent: "center" }}>
          <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
            <polygon points="190,40 330,300 50,300" stroke={HYPERION} strokeWidth="4" fill={GLASS} />
            <line x1="190" y1="40" x2="190" y2="300" stroke={HYPERION} strokeWidth="2" strokeDasharray="4 3" />
            <line x1="100" y1="180" x2="280" y2="180" stroke={CHROMA} strokeWidth="3" />
            <circle cx="190" cy="40" r="8" fill={HYPERION} />
            <circle cx="100" cy="180" r="5" fill={CHROMA} />
            <circle cx="280" cy="180" r="5" fill={HYPERION} />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}

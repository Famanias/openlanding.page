import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SURFACE/08 — Interactive WebGL Background Laboratory";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0B0B0B",
          color: "#F4F0E8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>SURFACE/08</span>
          <span style={{ color: "#A65D46" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            SURFACE/08 — Interactive WebGL Background Laboratory
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            An interactive material study and hero-background laboratory featuring eight real-time GPU-driven Three.js surfaces: Chroma Fluid, Fluted Light, Silk Atmosphere, Glass Lens, Aurora Field, Chromatic Ribbons, Bokeh Reactor, and Refraction Field.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#A65D46" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

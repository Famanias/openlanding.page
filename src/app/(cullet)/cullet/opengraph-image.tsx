import { ImageResponse } from "next/og";
import { posterShards } from "./cut/pattern";

export const alt = "Cullet — Designed in glass.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const W = 1104, H = 534;

export default function OpenGraphImage() {
  const shards = posterShards(W, H);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F4F5F8", position: "relative" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 48, top: 48 }}>
        {shards.map((s) => (
          <g key={s.index} transform={`translate(${s.x} ${s.y})`}>
            <path d={s.d} fill="#DCE8FF" transform="translate(3 6)" opacity="0.8" />
            <path d={s.d} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", left: 84, top: 70, display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 600, color: "#0F1117" }}>
        <svg width="30" height="30" viewBox="0 0 24 24"><rect width="24" height="24" rx="5.4" fill="#0F1117" /><path d="M5.3 6.7 13.4 4.3 19.7 12.5 10.6 19.7Z" fill="none" stroke="#F4F5F8" strokeWidth="1.8" /></svg>
        Cullet
      </div>
      <div style={{ position: "absolute", left: 104, top: 190, display: "flex", flexDirection: "column", color: "#0F1117" }}>
        <div style={{ display: "flex", fontSize: 16, letterSpacing: 4, color: "#525866", marginBottom: 18 }}>REAL-TIME MATERIAL STUDIO</div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 600, letterSpacing: -5, lineHeight: 0.97 }}>Designed</div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 600, letterSpacing: -5, lineHeight: 0.97 }}>in glass.</div>
        <div style={{ display: "flex", fontSize: 26, color: "#525866", marginTop: 28 }}>Dispersion, transmission and refraction, live in the browser.</div>
      </div>
      <div style={{ position: "absolute", right: 84, bottom: 72, display: "flex", fontSize: 18, color: "#2563EB" }}>KHR_materials_dispersion</div>
    </div>,
    size,
  );
}

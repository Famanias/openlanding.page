import type { BenchStop } from "./state";

export function Specimen({ snapshot, compact = false }: { snapshot: BenchStop; compact?: boolean }) {
  const spectral = snapshot.label === "spectral" || snapshot.label === "ready";
  return (
    <div className={`lc-specimen ${compact ? "lc-specimen--compact" : ""}`} data-label={snapshot.label}>
      <svg viewBox="0 0 360 360" aria-label={`Lucentra specimen: ${snapshot.label}`} role="img">
        <path className="lc-specimen__ray" d="M32 280 120 186M64 312 162 190M306 64 218 158M336 98 238 172" />
        {spectral && <><path className="lc-specimen__ray" stroke="#2E63FF" d="M34 252 146 154" /><path className="lc-specimen__ray" stroke="#C5D4FF" d="M44 278 156 180" /></>}
        <path className="lc-specimen__glass" d="M92 92 214 48 286 112 224 286 106 250 72 166Z" />
        <path className="lc-specimen__edge" d="M92 92 194 142 286 112M194 142 224 286M194 142 106 250M72 166 194 142" />
        <path className="lc-specimen__edge" opacity={snapshot.roughness < 0.25 ? 1 : .45} d="M118 104 178 82 240 124 202 230 132 212Z" />
        {spectral && <g className="lc-specimen__spectrum"><path d="M108 116 122 104 224 142 214 156Z" fill="#2E63FF" opacity=".8"/><path d="M116 132 130 120 232 158 222 172Z" fill="#C5D4FF" opacity=".9"/><path d="M124 148 138 136 240 174 230 188Z" fill="#10141C" opacity=".3"/></g>}
      </svg>
    </div>
  );
}

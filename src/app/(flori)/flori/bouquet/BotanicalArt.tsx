import type { CSSProperties } from "react";
import type { Feeling } from "./model";

type StemSpec = { x: number; y: number; angle: number; kind: "cosmos" | "poppy" | "bell" | "daisy"; scale: number };
const stems: StemSpec[] = [
  { x: 104, y: 143, angle: -22, kind: "cosmos", scale: .92 },
  { x: 259, y: 101, angle: 16, kind: "bell", scale: .85 },
  { x: 173, y: 82, angle: -9, kind: "poppy", scale: 1.05 },
  { x: 302, y: 191, angle: 28, kind: "cosmos", scale: .82 },
  { x: 224, y: 179, angle: 8, kind: "daisy", scale: .95 },
  { x: 143, y: 225, angle: -12, kind: "bell", scale: .8 },
  { x: 279, y: 251, angle: 22, kind: "poppy", scale: .68 },
];

function Bloom({ kind, index }: { kind: StemSpec["kind"]; index: number }) {
  if (kind === "poppy") return <g>
    <path d="M0 4C-58 7-59-35-31-40C-26-65 4-57 8-38C33-63 61-34 43-16C52 7 18 27 0 4Z" fill="var(--fl-petal-a)" />
    <path d="M-5 2C-27-17-31-30-20-40M4 0C13-21 25-28 34-30" fill="none" stroke="var(--fl-ink)" strokeOpacity=".14" strokeWidth="2" />
    <ellipse cy="1" rx="12" ry="9" fill="var(--fl-ink)" />
    <ellipse cy="-2" rx="6" ry="4" fill="var(--fl-butter)" />
  </g>;
  if (kind === "bell") return <g fill="var(--fl-petal-b)">
    <path d="M-21-21Q-27-48-2-46Q24-45 18-20L29 9Q12 25-1 11Q-15 27-30 9Z" />
    <path d="M-3-43L-2 12M-17-31L-19 11M12-31L16 12" stroke="var(--fl-ink)" strokeOpacity=".13" strokeWidth="2" />
    <path d="M-12-44L-3-55L8-45" fill="var(--fl-sage)" />
  </g>;
  const count = kind === "daisy" ? 12 : 8;
  return <g>
    {Array.from({ length: count }, (_, i) => <path key={i} d={kind === "daisy" ? "M-6-6C-19-24-10-49 0-48C11-48 17-23 6-6Z" : "M-7-4C-35-18-34-42-18-47Q-7-53 0-44Q9-52 18-45C34-29 21-10 7-4Z"} fill={kind === "daisy" ? "var(--fl-paper)" : index % 2 ? "var(--fl-petal-b)" : "var(--fl-petal-a)"} transform={`rotate(${i * 360 / count})`} />)}
    <circle r={kind === "daisy" ? 13 : 11} fill="var(--fl-butter)" />
    <path d="M-5-1L-1 4L5-3" stroke="var(--fl-ink)" strokeWidth="1.5" strokeOpacity=".3" fill="none" />
  </g>;
}

export function BotanicalArt({ feeling = "daydream", scene = "bunch", gather = false, className = "", title, id }: { feeling?: Feeling; scene?: "bunch" | "single" | "table"; gather?: boolean; className?: string; title?: string; id?: string }) {
  return <svg className={`fl-botanical ${className}`} data-feeling={feeling} data-scene={scene} data-gather={gather} viewBox="0 0 400 480" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}><g id={id}>
    <ellipse cx="207" cy="440" rx="113" ry="10" fill="var(--fl-ink)" opacity=".07" />
    <g className="fl-foliage" fill="var(--fl-sage)" stroke="var(--fl-ink)" strokeWidth="2" strokeLinecap="round">
      <path d="M200 372Q69 283 75 192M207 374Q335 287 331 144" fill="none" />
      <path d="M102 285Q42 277 45 232Q92 236 102 285M87 247Q111 201 128 211Q137 241 87 247M78 210Q48 185 62 161Q85 166 78 210M277 292Q273 244 307 234Q321 265 277 292M308 239Q349 235 360 202Q323 191 308 239M325 193Q295 162 309 142Q341 147 325 193M331 161Q365 154 354 123Q328 130 331 161" stroke="none" />
    </g>
    {stems.map((stem, i) => <g key={i} className="fl-stem" style={{ display: scene === "single" && i % 2 === 1 ? "none" : undefined, "--stem-x": `${(i - 3) * 22}px`, "--stem-y": `${25 + i * 7}px`, "--stem-r": `${(i - 3) * 7}deg`, "--i": i } as CSSProperties}>
      <path d={`M${196 + i * 2} 379Q${stem.x + 20} ${stem.y + 115} ${stem.x} ${stem.y}`} fill="none" stroke="var(--fl-ink)" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${180 + i * 3} ${300 - i * 5}q${i % 2 ? 45 : -55} -48 ${i % 2 ? 58 : -45} -19q-12 31 ${i % 2 ? -58 : 45} 19`} fill={i % 2 ? "var(--fl-sage)" : "var(--fl-ink)"} />
      <g transform={`translate(${stem.x} ${stem.y}) rotate(${stem.angle}) scale(${stem.scale})`}><g className="fl-bloom"><Bloom kind={feeling === "sunbeam" && stem.kind === "bell" ? "daisy" : stem.kind} index={i} /></g></g>
    </g>)}
    <g className="fl-vase" style={scene === "single" ? { transform: "scale(.82,1.08)", transformOrigin: "200px 445px" } : undefined}>
      <path d="M155 319Q200 309 245 319L256 413Q254 444 200 445Q145 444 144 413Z" fill="var(--fl-vase-color)" />
      <ellipse cx="200" cy="319" rx="45" ry="7" fill="var(--fl-ink)" opacity=".12" />
      <path d="M166 338L161 414M182 337L180 429M200 337V432M218 337L221 429M235 338L240 414" stroke="var(--fl-ink)" strokeWidth="2" opacity=".1" fill="none" strokeLinecap="round" />
      <path d="M154 406Q200 423 247 406" stroke="var(--fl-paper)" strokeWidth="2" opacity=".35" fill="none" />
    </g>
    {scene === "table" && <g>
      <path d="M31 436Q43 392 78 368L91 379Q68 422 50 440Z" fill="var(--fl-petal-a)" />
      <path d="M290 439L373 389M316 423L359 433" stroke="var(--fl-ink)" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(357 400) scale(.45)"><Bloom kind="cosmos" index={0} /></g>
    </g>}
  </g></svg>;
}

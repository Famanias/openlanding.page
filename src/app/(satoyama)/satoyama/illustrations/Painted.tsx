import { useId, type ReactNode } from "react";

/* Painted-anime scene primitives: soft gradients, billowing clouds, clumped canopies and wind-leaning grass.
   All randomness is a seeded integer generator so server and client render identical markup. */

export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const f = (value: number) => Math.round(value * 10) / 10;
const clean = (id: string) => id.replace(/:/g, "");

type Billow = readonly [number, number, number];
const BILLOWS: readonly Billow[] = [[0, -8, 62], [78, -40, 90], [172, -30, 80], [246, -6, 56], [-62, 6, 42], [120, -2, 70]];

export function Cumulus({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  const id = clean(useId());
  return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
    <clipPath id={`${id}-cut`}><rect x="-140" y="-220" width="520" height="248" /></clipPath>
    <g clipPath={`url(#${id}-cut)`}>
      <g fill="var(--st-cloud-shade)">{BILLOWS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy + 12} r={r} />)}</g>
      <g fill="var(--st-cloud)">{BILLOWS.map(([cx, cy, r], i) => <circle key={i} cx={cx - 4} cy={cy - 3} r={r * 1.0} />)}</g>
      <g fill="var(--st-cloud-lit)" opacity=".92">{BILLOWS.map(([cx, cy, r], i) => <circle key={i} cx={cx - 12} cy={cy - 16} r={r * .66} />)}</g>
    </g>
  </g>;
}

export function Stratus({ x, y, width = 320 }: { x: number; y: number; width?: number }) {
  return <g fill="var(--st-cloud)" opacity=".7">
    <rect x={x} y={y} width={width} height="9" rx="4.5" />
    <rect x={x + width * .18} y={y + 17} width={width * .66} height="7" rx="3.5" opacity=".75" />
    <rect x={x - width * .08} y={y + 32} width={width * .4} height="5" rx="2.5" opacity=".55" />
  </g>;
}

export function Ridge({ d, top, bottom, opacity }: { d: string; top: string; bottom: string; opacity?: number }) {
  const id = clean(useId());
  return <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
    <path d={d} fill={`url(#${id})`} opacity={opacity} />
  </>;
}

export function Blades({ x, y, w, h, count, seed, size, stroke, lean = 1, width = 2 }: { x: number; y: number; w: number; h: number; count: number; seed: number; size: number; stroke: string; lean?: number; width?: number }) {
  const next = seeded(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const bx = x + next() * w;
    const t = next();
    const by = y + t * h;
    const bh = size * (.5 + t);
    const l = lean * bh * (.25 + next() * .3);
    d += `M${f(bx)} ${f(by)}q${f(l * .2)} ${f(-bh * .55)} ${f(l)} ${f(-bh)}`;
  }
  return <path d={d} stroke={stroke} strokeWidth={width} strokeLinecap="round" fill="none" />;
}

export function Flowers({ x, y, w, h, count, seed, colors, radius = 3 }: { x: number; y: number; w: number; h: number; count: number; seed: number; colors: readonly string[]; radius?: number }) {
  const next = seeded(seed);
  return <g>{Array.from({ length: count }, (_, i) => {
    const t = next();
    return <circle key={i} cx={f(x + next() * w)} cy={f(y + t * h)} r={f(radius * (.6 + t * .8))} fill={colors[i % colors.length]} />;
  })}</g>;
}

const CANOPY: readonly Billow[] = [[-48, -112, 50], [24, -132, 58], [74, -86, 44], [-74, -72, 40], [0, -80, 58]];

/* Small leaf clusters riding the upper-left arc of each big mass: they scallop the silhouette and carry the light. */
const LEAVES: readonly (readonly [number, number, number, boolean])[] = CANOPY.flatMap(([cx, cy, r], k) => Array.from({ length: 8 }, (_, i) => {
  const angle = ((-170 + i * 20 + k * 9) * Math.PI) / 180;
  return [f(cx + Math.cos(angle) * r * .8), f(cy + Math.sin(angle) * r * .8), f(r * (.24 + ((i + k) % 3) * .05)), i > 0 && i < 5] as const;
}));

export function PaintedTree({ x, y, scale = 1, kind = "round", dark = "var(--st-tree-dark)", mid = "var(--st-tree-mid)", lit = "var(--st-tree-lit)", trunk = "var(--st-timber)", snow = false }: { x: number; y: number; scale?: number; kind?: "round" | "cedar" | "bare"; dark?: string; mid?: string; lit?: string; trunk?: string; snow?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {kind === "cedar" ? <>
      <path d="M-4 0 -2-60h7L8 0Z" fill={trunk} />
      <path d="M0-212-46-120l16-4-52 62 22-3-60 66h240L20-65l22 3-52-62 16 4Z" fill={dark} transform="scale(.62) translate(0 52)" />
      <path d="M0-198-24-128l10-3-34 52 17-2-30 40h60L-12-58l16 2Z" fill={mid} transform="scale(.62) translate(10 52)" opacity=".75" />
      {snow && <path d="M-36-96q36-18 72 0l-12 5q-24-10-48 0ZM-52-58q52-20 104 0l-14 6q-38-12-76 0Z" fill="var(--st-snow)" />}
    </> : kind === "bare" ? <>
      <path d="M-5 0 -2-98h7L9 0Z" fill={trunk} />
      <path d="M2-70-40-118M3-90 44-140M0-100-18-160M2-112 24-168M-26-134-52-156M34-150 62-160M-40-118-70-124" stroke={trunk} strokeWidth="5" strokeLinecap="round" fill="none" />
      {snow && <path d="M-44-120-36-124M40-142 50-146M-20-162-14-168M22-170 30-176" stroke="var(--st-snow)" strokeWidth="6" strokeLinecap="round" />}
    </> : <>
      <path d="m-6 0 3-98h8L10 0Z" fill={trunk} />
      <path d="M2-62-30-98M3-80 34-114" stroke={trunk} strokeWidth="5" strokeLinecap="round" fill="none" />
      <g fill={dark}>{CANOPY.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}</g>
      <g fill={mid}>{LEAVES.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}</g>
      <g fill={mid}>{CANOPY.map(([cx, cy, r], i) => <circle key={i} cx={cx - 9} cy={cy - 6} r={r * .62} opacity=".55" />)}</g>
      <g fill={lit}>{LEAVES.filter(leaf => leaf[3]).map(([cx, cy, r], i) => <circle key={i} cx={cx - 4} cy={cy - 4} r={r * .62} />)}</g>
    </>}
  </g>;
}

export function Farmhouse({ x, y, scale = 1, glow = false, roof = "var(--st-roof)", roofLit = "var(--st-roofshade)" }: { x: number; y: number; scale?: number; glow?: boolean; roof?: string; roofLit?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="6" cy="6" rx="124" ry="9" fill="var(--st-ink)" opacity=".16" />
    <path d="M-76-62H80V0H-76Z" fill="var(--st-wall)" />
    <path d="M18-62H80V0H18Z" fill="var(--st-wallshade)" opacity=".55" />
    <path d="M-76-62V0M80-62V0M-24-62V0M-76-30H80" stroke="var(--st-timber)" strokeWidth="3.5" opacity=".85" />
    <path d="M-66-52H-34V-6H-66ZM-16-52H12V-6H-16ZM34-52H70V-6H34Z" fill={glow ? "var(--st-sun)" : "var(--st-window)"} />
    <path d="M-50-52V-6M-66-30H-34M-2-52V-6M-16-30H12M52-52V-6M34-30H70" stroke="var(--st-timber)" strokeWidth="2" />
    <path d="M-92 0H96v7H-92Z" fill="var(--st-timber)" />
    <path d="M-106-58-60-136H62L108-58Z" fill={roof} />
    <path d="M-60-136H62L36-96H-36Z" fill={roofLit} opacity=".7" />
    <path d="M-106-58 108-58l-6 9H-100Z" fill="var(--st-ink)" opacity=".28" />
    <path d="M-94-76 98-76M-82-94 86-94M-70-112 74-112M-30-136-44-60M30-136 44-60" stroke="var(--st-ink)" strokeOpacity=".22" strokeWidth="2" />
    <path d="M-64-139H66l-4 7H-60Z" fill="var(--st-timber)" />
  </g>;
}

export function Birds({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g className="st-birds" transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--st-ink)" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".62">
    <path d="M0 0q9-9 18 0 9-9 17-1M62 26q7-7 14 0 7-7 13-1M-34 34q6-6 12 0 6-6 11-1M96-6q6-5 11 0 5-5 10-1" />
  </g>;
}

export function Firefly({ x, y, r = 4, delay = 0 }: { x: number; y: number; r?: number; delay?: number }) {
  return <g className="st-firefly" style={{ animationDelay: `${delay}s` }}><circle cx={x} cy={y} r={r * 3.2} fill="var(--st-sun)" opacity=".22" /><circle cx={x} cy={y} r={r} fill="var(--st-sun)" /></g>;
}

export function SceneSvg({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return <svg className={`st-scene ${className}`.trim()} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" fill="none" role="img" aria-label={label}>{children}</svg>;
}

export function Sky({ stops, height = 900 }: { stops: readonly (readonly [number, string])[]; height?: number }) {
  const id = clean(useId());
  return <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} />)}</linearGradient></defs>
    <rect width="1600" height={height} fill={`url(#${id})`} />
  </>;
}

export function Glow({ x, y, r, color = "var(--st-sun)", opacity = .8 }: { x: number; y: number; r: number; color?: string; opacity?: number }) {
  const id = clean(useId());
  return <>
    <defs><radialGradient id={id}><stop stopColor={color} stopOpacity={opacity} /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs>
    <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
  </>;
}

import type { CSSProperties } from "react";
import { SPECTRUM } from "../sampler/spectrum";
import type { Term } from "../content/copy";

/**
 * A ray diagram per term, drawn in a 320×220 box. Lines use `pathLength=1` so the CSS can draw them
 * (`stroke-dashoffset` 1 → 0) when their term becomes the active one, in the order given by `--d`.
 */
const d = (n: number) => ({ "--d": n }) as CSSProperties;

function Film() {
  return (
    <>
      <rect className="fc-dg__glass" x="20" y="112" width="280" height="88" rx="6" />
      <path className="fc-dg__film" d="M20 100H300M20 112H300" />
      <path className="fc-dg__ray" pathLength={1} style={d(0)} d="M48 22 140 100" />
      <path className="fc-dg__ray" pathLength={1} style={d(1)} d="M140 100 232 22" />
      <path className="fc-dg__ray fc-dg__ray--thin" pathLength={1} style={d(1)} d="M140 100 154 112 168 100" />
      <path className="fc-dg__ray fc-dg__ray--accent" pathLength={1} style={d(2)} d="M168 100 260 22" />
      <path className="fc-dg__wave" pathLength={1} style={d(3)} d="M236 52c6-10 12 10 18 0s12 10 18 0 12 10 18 0" />
      <text className="fc-dg__label" x="24" y="94">clearcoat · 280–680 nm</text>
    </>
  );
}

function Snell() {
  return (
    <>
      <rect className="fc-dg__glass" x="20" y="110" width="280" height="96" rx="6" />
      <path className="fc-dg__normal" d="M160 24V204" />
      <path className="fc-dg__ray" pathLength={1} style={d(0)} d="M70 24 160 110" />
      <path className="fc-dg__ray fc-dg__ray--accent" pathLength={1} style={d(1)} d="M160 110 204 204" />
      <path className="fc-dg__arc" pathLength={1} style={d(2)} d="M160 70a40 40 0 0 0-28 12" />
      <path className="fc-dg__arc" pathLength={1} style={d(2)} d="M160 150a40 40 0 0 0 17-4" />
      <text className="fc-dg__label" x="24" y="40">n₁ 1.00</text>
      <text className="fc-dg__label" x="24" y="132">n₂ 1.52</text>
    </>
  );
}

function Prism() {
  return (
    <>
      <path className="fc-dg__glass" d="M160 26 262 194H58Z" />
      <path className="fc-dg__ray" pathLength={1} style={d(0)} d="M8 138 112 118" />
      <path className="fc-dg__ray fc-dg__ray--thin" pathLength={1} style={d(1)} d="M112 118 206 124" />
      {SPECTRUM.map((s, i) => (
        <path key={s.nm} className="fc-dg__spectral" pathLength={1} style={{ ...d(2), stroke: s.color } as CSSProperties}
          d={`M206 124 312 ${108 + i * 15}`} />
      ))}
      <text className="fc-dg__label" x="196" y="212">Abbe 59 · 3 λ / ray</text>
    </>
  );
}

function Slab() {
  return (
    <>
      <rect className="fc-dg__glass fc-dg__glass--frost" x="104" y="34" width="112" height="152" rx="10" />
      {[70, 110, 150].map((y, i) => (
        <path key={y} className="fc-dg__ray" pathLength={1} style={d(i * 0.3)} d={`M14 ${y}H104`} />
      ))}
      {[[118, 62, 142, 76], [126, 104, 150, 96], [120, 140, 146, 152], [160, 70, 186, 84], [168, 118, 196, 112], [164, 160, 190, 150]].map(([x1, y1, x2, y2], i) => (
        <path key={i} className="fc-dg__ray fc-dg__ray--thin" pathLength={1} style={d(1 + i * 0.15)} d={`M${x1} ${y1} ${x2} ${y2}`} />
      ))}
      {[60, 92, 128, 162].map((y, i) => (
        <path key={y} className="fc-dg__ray fc-dg__ray--soft" pathLength={1} style={d(2.2 + i * 0.2)} d={`M216 ${110 + (y - 110) * 0.6}L306 ${y}`} />
      ))}
      <text className="fc-dg__label" x="104" y="208">1.4 cm volume</text>
    </>
  );
}

function Micro() {
  return (
    <>
      <path className="fc-dg__surface" pathLength={1} style={d(0)}
        d="M16 160l12-2 12 2 12-2 12 2 12-2 12 2 12-2 12 2 12-2 12 2l10-10 10 16 10-14 10 12 10-18 10 16 10-10 10 14 10-16 10 12 10-8" />
      <path className="fc-dg__ray" pathLength={1} style={d(1)} d="M40 40 86 156" />
      <path className="fc-dg__ray fc-dg__ray--accent" pathLength={1} style={d(2)} d="M86 156 126 44" />
      <path className="fc-dg__cone" pathLength={1} style={d(2)} d="M86 156 116 40M86 156 136 48" />
      <path className="fc-dg__ray" pathLength={1} style={d(1)} d="M196 40 238 154" />
      <path className="fc-dg__cone fc-dg__cone--wide" pathLength={1} style={d(2.4)} d="M238 154 228 36M238 154 262 34M238 154 296 52M238 154 304 88" />
      <text className="fc-dg__label" x="36" y="198">clearcoat 0.08</text>
      <text className="fc-dg__label" x="196" y="198">etched 0.22</text>
    </>
  );
}

const KINDS = { film: Film, snell: Snell, prism: Prism, slab: Slab, micro: Micro };

export function Diagram({ kind, label }: { kind: Term["diagram"]; label: string }) {
  const Body = KINDS[kind];
  return (
    <svg className="fc-dg" viewBox="0 0 320 220" role="img" aria-label={label}>
      <Body />
    </svg>
  );
}

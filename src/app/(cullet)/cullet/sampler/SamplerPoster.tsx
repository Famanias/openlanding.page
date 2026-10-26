import type { CSSProperties } from "react";
import { SPECTRUM } from "./spectrum";

/**
 * The sampler drawn: a studio card, a prism, a white ray going in and a spectral fan coming out.
 * The dials drive it through custom properties on the stage (`--bend`, `--spread`, `--blur`,
 * `--film`, `--thick`), with CSS transitions, so it answers every slider even without WebGL.
 */
export function SamplerPoster() {
  return (
    <svg className="fc-sp" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="fc-sp-film" x1="0" y1="0" x2="1" y2="1">
          {SPECTRUM.map((s, i) => <stop key={s.nm} offset={i / (SPECTRUM.length - 1)} stopColor={s.color} />)}
        </linearGradient>
      </defs>
      <rect className="fc-sp__card" width="400" height="300" />
      {[[38, 6], [66, 2], [84, 12], [126, 2], [142, 4], [240, 9], [270, 2], [288, 5], [336, 3], [358, 10]].map(([x, w]) => (
        <rect key={x} className="fc-sp__bar" x={x} y="0" width={w} height="300" />
      ))}
      <rect className="fc-sp__band" x="180" y="0" width="26" height="300" />
      <ellipse className="fc-sp__shadow" cx="200" cy="246" rx="86" ry="10" />
      <path className="fc-sp__in" d="M0 170 162 154" />
      <g className="fc-sp__fan">
        {SPECTRUM.map((s, i) => (
          <path key={s.nm} className="fc-sp__ray" d="M238 156H420" style={{ stroke: s.color, "--k": i / (SPECTRUM.length - 1) - 0.5 } as CSSProperties} />
        ))}
      </g>
      <g className="fc-sp__prism">
        <path className="fc-sp__glass" d="M200 70 262 214H138Z" />
        <path className="fc-sp__film" d="M200 70 262 214H138Z" />
        <path className="fc-sp__edge" d="M200 70 262 214H138Z" />
      </g>
    </svg>
  );
}

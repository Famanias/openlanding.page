import React from "react";

/**
 * Hero backdrop: a sunlit surface above with light shafts that die off with
 * depth. The submersible itself is the 3D layer in scene/SubmersibleScene.
 * Pure CSS + SVG, decorative only; motion is switched off by the
 * reduced-motion block in bathys.css.
 */

const RAYS = [
  { left: "6%", width: 150, delay: "0s", dur: "11s" },
  { left: "22%", width: 90, delay: "-4s", dur: "14s" },
  { left: "38%", width: 190, delay: "-7s", dur: "12s" },
  { left: "57%", width: 110, delay: "-2s", dur: "16s" },
  { left: "73%", width: 170, delay: "-9s", dur: "13s" },
  { left: "90%", width: 100, delay: "-5s", dur: "15s" },
];

function wavePath(cycles: number, cycle: number, amp: number, mid: number): string {
  let d = `M0 ${mid}`;
  for (let i = 0; i < cycles; i++) {
    const x = i * cycle;
    d += ` Q${x + cycle / 4} ${mid - amp * 2} ${x + cycle / 2} ${mid}`;
    d += ` Q${x + (cycle * 3) / 4} ${mid + amp * 2} ${x + cycle} ${mid}`;
  }
  return d;
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sunlit surface glow + drifting light shafts */}
      <div className="bat-hero-glow absolute inset-x-0 top-0 h-[75%]" />
      <div className="bat-hero-rays absolute inset-x-0 top-0 h-[88%] overflow-hidden">
        {RAYS.map((r) => (
          <span
            key={r.left}
            className="bat-ray"
            style={{ left: r.left, width: r.width, animationDelay: r.delay, animationDuration: r.dur }}
          />
        ))}
      </div>

      {/* Water surface seen from below */}
      <div className="absolute inset-x-0 top-[62px] h-7 overflow-hidden">
        <svg className="bat-wave absolute left-0 top-0 h-full w-[200%]" viewBox="0 0 3200 28" preserveAspectRatio="none" fill="none">
          <path d={wavePath(16, 200, 3, 10)} className="stroke-mist" strokeOpacity="0.28" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg
          className="bat-wave bat-wave-fast absolute left-0 top-0 h-full w-[200%]"
          viewBox="0 0 3200 28"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d={wavePath(20, 160, 4, 14)} className="stroke-cyan" strokeOpacity="0.4" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Legibility scrim for the copy column, and a soft handoff into the descent stage */}
      <div className="bat-hero-scrim absolute inset-0" />
      <div className="bat-hero-fade absolute inset-x-0 bottom-0 h-40" />
    </div>
  );
}

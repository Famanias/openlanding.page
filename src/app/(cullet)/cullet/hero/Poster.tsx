"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { posterShards } from "../cut/pattern";

/** Server guesses for the slab's size: a laptop and a phone. The client re-cuts for the real box. */
const GUESSES = [
  { key: "land", w: 1282, h: 747 },
  { key: "port", w: 358, h: 740 },
];

const pct = (v: number) => `${((v) * 100).toFixed(3)}%`;
/** A stable tumble per shard, so the cleave reads as a fracture and not a zoom. */
const spin = (i: number) => (((i * 37) % 11) - 5) * 3.4;

/**
 * The cut slab drawn in SVG: what the page shows before the WebGL glass takes over, and instead of
 * it under reduced motion, without JS and on phones that haven't asked for it. Each shard is its own
 * small HTML-positioned SVG so the cleave moves composited layers, never SVG children.
 */
export function Poster() {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width), h = Math.round(entry.contentRect.height);
      if (w > 0 && h > 0) setFit((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sets = fit ? [{ key: "fit", ...fit }] : GUESSES;
  return (
    <div ref={ref} className="fc-poster" aria-hidden="true">
      <svg className="fc-poster__defs" width="0" height="0">
        <defs>
          <linearGradient id="fc-quartz" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="var(--fc-white)" />
            <stop offset="0.62" stopColor="var(--fc-white)" stopOpacity="0.94" />
            <stop offset="1" stopColor="var(--fc-haze)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
      {sets.map((set) => (
        <div key={set.key} className={`fc-poster__set fc-poster__set--${set.key}`}>
          {posterShards(set.w, set.h).map((s) => (
            <svg
              key={s.index}
              className="fc-shard"
              viewBox={`0 0 ${s.w.toFixed(2)} ${s.h.toFixed(2)}`}
              preserveAspectRatio="none"
              style={{
                left: pct(s.x / set.w), top: pct(s.y / set.h), width: pct(s.w / set.w), height: pct(s.h / set.h),
                "--i": s.index, "--ox": s.out.x.toFixed(3), "--oy": s.out.y.toFixed(3), "--spin": `${spin(s.index)}deg`,
              } as CSSProperties}
            >
              <path className="fc-shard__body" d={s.d} />
              <path className="fc-shard__rim" d={s.d} />
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
}

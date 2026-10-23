"use client";

import { useEffect, useMemo, useRef } from "react";
import { Picture } from "../assets";
import { progressFromOffsets } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";
import { useWatershed } from "./provider";
import { rainfallAt, watershedPhase } from "./water";
import { WatershedReadout } from "./WatershedReadout";

const PLATES = [
  { phase: "ridge" as const, asset: "land-aerial", alt: "Aerial contour lines above a dryland ridge" },
  { phase: "swale" as const, asset: "swale-close", alt: "A contour swale holding rain" },
  { phase: "storage" as const, asset: "systems-swale", alt: "A field line slowing water" },
  { phase: "root-zone" as const, asset: "root-zone-macro", alt: "Water settling below a crop root" },
];

export function WatershedStage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { store, rain } = useWatershed();
  const reduced = useReducedMotion();
  const progress = rain / 80;
  const activePhase = watershedPhase(progress);
  const activeIndex = useMemo(() => PLATES.findIndex((plate) => plate.phase === activePhase), [activePhase]);

  useEffect(() => {
    if (reduced) {
      document.documentElement.style.setProperty("--rl-progress", String(progress));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const inStage = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inStage) return;
      const nextProgress = progressFromOffsets(rect.top, rect.height, window.innerHeight);
      document.documentElement.style.setProperty("--rl-progress", String(nextProgress));
      store.setRain(rainfallAt(nextProgress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); if (frame) cancelAnimationFrame(frame); };
  }, [progress, reduced, store]);

  return (
    <section ref={sectionRef} className="rl-land" id="land" aria-labelledby="rl-land-title">
      <div className="rl-land__stage">
        <div className="rl-land__media" aria-hidden="true">
          {PLATES.map((plate, index) => (
            <div key={plate.phase} className="rl-land__plate" data-active={index === activeIndex ? "true" : "false"}>
              <Picture assetKey={plate.asset} alt={plate.alt} />
            </div>
          ))}
        </div>
        <div className="rl-land__veil" aria-hidden="true" />
        <div className="rl-land__contours" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="rl-land__contour" pathLength="100" d="M-12 30C12 8 29 17 48 11S79 4 112 19" />
            <path className="rl-land__contour" pathLength="100" d="M-14 44C13 20 32 28 51 21s34-7 63 10" />
            <path className="rl-land__contour" pathLength="100" d="M-15 59c28-24 47-13 65-20s33-6 64 13" />
            <path className="rl-land__contour rl-land__contour--accent" pathLength="100" d="M8 18c23 13 30 26 44 34s28 13 40 30" />
          </svg>
          <span className="rl-land__drop" />
        </div>
        <div className="rl-land__overlay rl-container">
          <WatershedReadout rain={rain} />
          <div className="rl-land__hud">
            <div className="rl-land__hud-head">
              <span className="rl-land__hud-title">Storm route / 042</span>
              <span className="rl-land__hud-unit">mm</span>
            </div>
            <label className="rl-mono" htmlFor="rl-rain-range" style={{ display: "block", marginTop: 18, color: "color-mix(in srgb, var(--color-limestone) 64%, transparent)" }}>Rainfall in the field</label>
            <div className="rl-land__hud-value" aria-live="polite">{rain}</div>
            <input id="rl-rain-range" className="rl-land__range" type="range" min="0" max="80" step="1" value={rain} onChange={(event) => store.setRain(Number(event.target.value))} aria-label="Rainfall in millimetres" />
            <div className="rl-land__hud-foot"><span>0 mm / dry</span><span>80 mm / full hold</span></div>
          </div>
        </div>
      </div>
      <noscript>
        <style>{`.rl-land__fallback-list{display:grid!important}`}</style>
      </noscript>
      <div className="rl-land__fallback-list rl-container" aria-label="Watershed stages">
        {PLATES.map((plate) => <div key={plate.phase}><span className="rl-mono">{plate.phase}</span><p>{plate.alt}</p></div>)}
      </div>
      <span id="rl-land-title" className="rl-visually-hidden">Read the land</span>
    </section>
  );
}


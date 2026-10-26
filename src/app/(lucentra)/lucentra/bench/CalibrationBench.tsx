"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BENCH_STOPS, benchReducer, benchSnapshot, PRESETS, type BenchState, type PresetId } from "./state";
import { sectionProgress } from "../motion/math";
import { Specimen } from "./Specimen";

const initial: BenchState = { progress: 0, preset: "quartz", active: 0 };

export function CalibrationBench() {
  const stage = useRef<HTMLElement>(null);
  const [state, setState] = useState(initial);
  const snapshot = useMemo(() => benchSnapshot(state.progress, state.preset), [state.progress, state.preset]);

  useEffect(() => {
    const node = stage.current;
    if (!node || window.matchMedia("(max-width: 580px), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const progress = sectionProgress(window.scrollY, window.scrollY + rect.top, node.offsetHeight, window.innerHeight);
      setState((current) => {
        const next = benchReducer(current, { type: "progress", value: progress });
        return next.active === current.active && Math.abs(next.progress - current.progress) < 0.006 ? current : next;
      });
      node.style.setProperty("--lc-bench-progress", String(progress));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <section className="lc-section lc-bench" id="bench" ref={stage} aria-labelledby="bench-title">
      <div className="lc-container">
        <div className="lc-section__intro"><div><p className="lc-mono lc-kicker">03 / Calibration bench</p><h2 id="bench-title">One specimen. Four decisions.</h2></div><p className="lc-section__copy">Scroll the bench to move the same material from a clean sample to a ready brief. The readout stays attached to the object, so a visual choice always has a measurable reason.</p></div>
        <div className="lc-bench__stage">
          <div className="lc-bench__sticky">
            <div className="lc-bench__grid">
              <div className="lc-bench__steps" aria-live="polite">
                {BENCH_STOPS.map((stop, index) => <div className="lc-bench__step" data-active={state.active === index} key={stop.label}><b>0{index + 1}</b><div><strong>{stop.title}</strong><span>{stop.description}</span></div></div>)}
                <label className="lc-bench__phone lc-mono" htmlFor="bench-range">Scrub the sample<input id="bench-range" className="lc-bench__range" type="range" min="0" max="1" step="0.01" value={state.progress} onChange={(event) => setState((current) => benchReducer(current, { type: "progress", value: Number(event.target.value) }))} /></label>
              </div>
              <div className="lc-bench__panel" data-phase={snapshot.label}>
                <div className="lc-mono">LIVE / {snapshot.label}</div>
                <Specimen snapshot={snapshot} />
                <div className="lc-bench__hud"><div><span className="lc-mono">Material state</span><strong>{snapshot.label}</strong></div><div><span className="lc-mono">IOR · roughness · dispersion</span><strong>{snapshot.ior.toFixed(2)} · {snapshot.roughness.toFixed(2)} · {snapshot.dispersion.toFixed(2)}</strong></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="lc-rule" aria-hidden="true" />
        <div className="lc-mono" style={{ marginTop: 14 }}>bench progress {Math.round(state.progress * 100)}% · transmission {(snapshot.transmission * 100).toFixed(0)}%</div>
      </div>
      <div className="lc-container" style={{ marginTop: 84 }}><p className="lc-mono">Choose a starting surface</p><div className="lc-presets lc-presets--light">{Object.entries(PRESETS).map(([id, preset]) => <button type="button" className="lc-preset" data-active={state.preset === id} key={id} onClick={() => setState((current) => benchReducer(current, { type: "preset", id }))}><span className="lc-mono">{preset.name}</span><div className="lc-preset__shape"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M20 28 56 14 82 34 65 78 30 70 12 48Z" /></svg></div><p>{preset.note}</p></button>)}</div></div>
    </section>
  );
}

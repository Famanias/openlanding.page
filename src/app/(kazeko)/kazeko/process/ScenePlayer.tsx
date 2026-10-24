"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { PHASES, phaseForProgress } from "./story";
import { progressFromOffsets } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";

export function ScenePlayer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const manual = useRef(false);
  const [isManual, setManual] = useState(false);
  const [phase, setPhase] = useState<(typeof PHASES)[number]>(PHASES[2]);
  const reduce = useReducedMotion();
  const apply = useCallback((progress: number) => {
    ref.current?.style.setProperty("--scene-progress", String(progress));
    if (range.current) range.current.value = String(Math.round(progress * 100));
    const next = phaseForProgress(progress);
    setPhase((previous) => previous === next ? previous : next);
  }, []);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const desktop = matchMedia("(min-width: 900px) and (pointer: fine)");
    let start = 0, height = 0, frame = 0, disposed = false;
    const measure = () => { const chapter = node.closest<HTMLElement>(".kz-process"); if (chapter) { start = chapter.getBoundingClientRect().top + scrollY; height = chapter.offsetHeight; } };
    const update = () => { frame = 0; if (!manual.current && desktop.matches && !reduce) apply(progressFromOffsets(scrollY, start, height, innerHeight)); };
    const scroll = () => { if (!frame && !manual.current) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); if (manual.current) return; if (!desktop.matches || reduce) apply(1); else update(); };
    resize();
    const layout = new ResizeObserver(resize);
    layout.observe(document.body);
    void document.fonts.ready.then(() => { if (!disposed) resize(); });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => { disposed = true; layout.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize); };
  }, [apply, reduce]);
  const choose = (progress: number) => { manual.current = true; setManual(true); apply(progress); };
  return <div ref={ref} className="kz-scene-player" data-phase={phase.name}>
    <div className="kz-process-art" data-kz-ambient>{children}<span className="kz-scene-corner kz-mono">SCENE 01 / A WIND FINDS ITS WAY</span><span className="kz-scene-corner kz-scene-corner-right" lang="ja">風のある風景</span></div>
    <div className="kz-process-controls kz-js-only">
      <div className="kz-phases" role="group" aria-label="Animation stages">{PHASES.map((item, i) => <button type="button" key={item.name} aria-pressed={phase.name === item.name} onClick={() => choose(item.progress)}><span className="kz-mono">0{i + 1}</span>{item.name}<span aria-hidden="true">↗</span></button>)}</div>
      <label className="kz-range-label" htmlFor="kz-progress">A pencil mark becomes a world.<span>Drag to discover <span aria-hidden="true">↔</span></span></label>
      <input id="kz-progress" ref={range} type="range" min="0" max="100" defaultValue="100" aria-label="Sketch to colour progress" onChange={(event) => choose(Number(event.target.value) / 100)} />
      {isManual && <button className="kz-resume" type="button" onClick={() => { manual.current = false; setManual(false); window.dispatchEvent(new Event("scroll")); }}>Resume scroll animation</button>}
    </div>
    <div className="kz-phase-caption" aria-live="polite"><span className="kz-mono">{phase.label}</span><p>{phase.copy}</p></div>
    <p className="kz-no-js">The scene begins with pencil, gains colour, and comes to life. Enable JavaScript to explore the drawing controls.</p>
  </div>;
}

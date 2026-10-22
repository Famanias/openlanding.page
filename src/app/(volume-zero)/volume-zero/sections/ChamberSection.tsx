"use client";

import { useEffect, useRef, useState } from "react";
import { cameraAt, listenerAt, surfaceAt, SURFACES, type SurfaceId } from "../chamber/geometry";
import { ChamberCanvas } from "../chamber/ChamberCanvas";

const flowStops = [
  ["01 / EMIT", "A source pulse enters the measured chamber."],
  ["02 / TRAVEL", "Scroll carries the camera across the room's depth."],
  ["03 / LISTEN", "The listener coordinate reveals early reflections."],
  ["04 / TUNE", "A surface selection rebuilds the field."],
];

export function ChamberSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const listenerRef = useRef(0.5);
  const surfaceRef = useRef<SurfaceId>("slat");
  const roomRef = useRef<HTMLSpanElement>(null);
  const listenerReadoutRef = useRef<HTMLSpanElement>(null);
  const rtRef = useRef<HTMLSpanElement>(null);
  const [surface, setSurface] = useState<SurfaceId>("slat");
  const [listenerOffset, setListenerOffset] = useState(0.5);
  const [canvasActive, setCanvasActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanvasActive(fine.matches);
    let offsets = { top: 0, height: 1 };
    let raf = 0;
    const measure = () => {
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      offsets = { top: rect.top + window.scrollY, height: rect.height };
    };
    const update = () => {
      raf = 0;
      const viewport = window.innerHeight;
      const travel = Math.max(1, offsets.height - viewport);
      const progress = Math.min(1, Math.max(0, (window.scrollY - offsets.top) / travel));
      progressRef.current = progress;
      const camera = cameraAt(progress);
      const listener = listenerAt(progress, listenerRef.current);
      sectionRef.current?.style.setProperty("--vz-chamber-progress", progress.toString());
      if (roomRef.current) roomRef.current.textContent = `ROOM ${String(4 + Math.round(progress * 3)).padStart(2, "0")}`;
      if (listenerReadoutRef.current) listenerReadoutRef.current.textContent = `LISTENER ${String(7 + Math.round(listener.x * 2 + progress * 8)).padStart(2, "0")}`;
      if (rtRef.current) rtRef.current.textContent = `RT60 ${(0.48 + (1 - surfaceAt(surfaceRef.current).absorption) * 0.78 + progress * 0.12).toFixed(2)} S`;
      sectionRef.current?.style.setProperty("--vz-camera-depth", camera.depth.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measure(); onScroll(); });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const chooseSurface = (next: SurfaceId) => {
    surfaceRef.current = next;
    setSurface(next);
  };

  const onListenerChange = (value: number) => {
    listenerRef.current = value;
    setListenerOffset(value);
  };

  return (
    <section id="chamber" ref={sectionRef} className="vz-chamber" aria-labelledby="vz-chamber-title">
      <div className="vz-chamber__sticky">
        <div className="vz-chamber__canvas-wrap" onPointerDown={() => setCanvasActive(true)}>
          <ChamberCanvas progressRef={progressRef} listenerRef={listenerRef} surfaceRef={surfaceRef} active={canvasActive} />
          <svg className="vz-chamber__fallback" viewBox="0 0 900 560" role="img" aria-label="Static acoustic chamber diagram">
            <path d="M120 440 170 100 730 100 780 440Z" />
            <path d="M190 410 225 150 675 150 710 410Z" opacity=".5" />
            <line x1="160" y1="300" x2="720" y2="300" opacity=".3" />
            <path d="M190 360Q330 180 450 290T710 360" />
            <path d="M190 360Q340 460 450 290T710 360" opacity=".55" />
            <circle cx="220" cy="360" r="9" /><circle cx="650" cy="315" r="7" />
          </svg>
          <div className="vz-chamber__veil" aria-hidden="true" />
        </div>
        <div className="vz-chamber__hud">
          <div className="vz-chamber__copy">
            <p className="vz-eyebrow">01 / The chamber</p>
            <h2 id="vz-chamber-title">A room is an instrument.</h2>
            <p>Scroll from source to listener. Watch the first reflection arrive, then tune the surface that gives the room its voice.</p>
          </div>
          <div className="vz-chamber__panel" aria-label="Live chamber controls">
            <div className="vz-chamber__panel-head"><span>Field telemetry</span><strong>GPU / <span aria-live="polite">LIVE</span></strong></div>
            <div className="vz-chamber__readout">
              <div><span>Coordinate</span><strong ref={roomRef}>ROOM 04</strong></div>
              <div><span>Listener</span><strong ref={listenerReadoutRef}>LISTENER 07</strong></div>
              <div><span>Decay</span><strong ref={rtRef}>RT60 0.82 S</strong></div>
              <div><span>Surface</span><strong>{surfaceAt(surface).label}</strong></div>
            </div>
            <div className="vz-chamber__control">
              <label htmlFor="listener-position"><span>Listener position</span><output>{Math.round(listenerOffset * 100)}%</output></label>
              <input id="listener-position" className="vz-range" type="range" min="0" max="1" step=".01" value={listenerOffset} onChange={(event) => onListenerChange(Number(event.target.value))} />
            </div>
            <div className="vz-surfaces" role="tablist" aria-label="Choose chamber surface">
              {(Object.keys(SURFACES) as SurfaceId[]).map((id) => (
                <button key={id} className="vz-surface" type="button" role="tab" aria-selected={surface === id} data-active={surface === id} onClick={() => chooseSurface(id)}>
                  <span>{SURFACES[id].label}</span><small>{Math.round(SURFACES[id].absorption * 100)}% absorb</small>
                </button>
              ))}
            </div>
          </div>
          <p className="vz-chamber__chapter"><strong>SCROLL FIELD</strong> / 01—04</p>
        </div>
      </div>
      <div className="vz-chamber__flow" aria-label="Chamber steps">
        {flowStops.map(([title, text]) => <article key={title}><p className="vz-eyebrow">{title}</p><p>{text}</p></article>)}
      </div>
    </section>
  );
}

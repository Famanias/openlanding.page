"use client";

import { useEffect, useRef, useState } from "react";
import { LEGS, STATIONS } from "../content/line";
import { scrollToY } from "../motion/SmoothScroll";
import { clockAt, kmAt, layerShift, legAt, legProgress, progressFromOffsets, stepTarget, tunnelMouth } from "./journey";

/** Layer rates: sky detail, far, mid, near, and the tunnel lamps (which outrun everything). */
const RATES = [0.2, 1, 2.2, 4.5, 9] as const;
const RANGE_MAX = 1000;
/** On phones only these stations keep their labels. */
const KEY_STOPS = new Set(["Paris", "Brig", "Venezia"]);

/**
 * The pinned window. One rAF loop turns scroll into CSS custom properties on the stage; React state changes
 * only when the leg changes (for the aria-live plaque). The range input drives the page's scroll position, so
 * scroll stays the single source of truth.
 */
export function LineStage({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const box = useRef({ top: 0, height: 0, viewport: 1 });
  const pRef = useRef(0);
  const [leg, setLeg] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || document.documentElement.dataset.auMotion !== "live") return;
    stage.dataset.running = "true";
    let raf = 0;
    let last = -1;
    let lastLeg = -1;

    const measure = () => {
      const r = track.getBoundingClientRect();
      box.current = { top: r.top + window.scrollY, height: track.offsetHeight, viewport: window.innerHeight };
      last = -1;
      schedule();
    };

    const frame = () => {
      raf = 0;
      const p = progressFromOffsets({ scrollY: window.scrollY, ...box.current });
      pRef.current = p;
      if (Math.abs(p - last) < 1e-5) return;
      last = p;
      const s = stage.style;
      s.setProperty("--au-p", p.toFixed(4));
      s.setProperty("--au-leg-t", legProgress(p).toFixed(4));
      RATES.forEach((rate, i) => s.setProperty(`--au-s${i}`, layerShift(p, rate).toFixed(3)));
      const { enter, exit } = tunnelMouth(p);
      s.setProperty("--au-enter", enter.toFixed(4));
      s.setProperty("--au-exit", exit.toFixed(4));
      if (clockRef.current) clockRef.current.textContent = clockAt(p);
      if (kmRef.current) kmRef.current.textContent = `${kmAt(p).toLocaleString("en-GB")} km`;
      if (rangeRef.current && document.activeElement !== rangeRef.current) rangeRef.current.value = String(Math.round(p * RANGE_MAX));
      const i = legAt(p);
      if (i !== lastLeg) {
        lastLeg = i;
        stage.dataset.leg = LEGS[i].id;
        setLeg(i);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      delete stage.dataset.running;
    };
  }, []);

  const goTo = (p: number, smooth: boolean) => {
    const { top, height, viewport } = box.current;
    scrollToY(top + p * Math.max(0, height - viewport) + 1, smooth);
  };

  const onRange = (e: React.ChangeEvent<HTMLInputElement>) => goTo(Number(e.currentTarget.value) / RANGE_MAX, false);

  const step = (dir: 1 | -1) => goTo(stepTarget(pRef.current, dir), true);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") step(1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") step(-1);
    else return;
    e.preventDefault();
  };

  const current = LEGS[leg];

  return (
    <div className="au-line__track" ref={trackRef}>
      <div className="au-stage" ref={stageRef} data-leg={current.id}>
        <div className="au-stage__frame">
          <div className="au-window au-stage__window">
            {children}
            <div className="au-mouth" aria-hidden="true" />
            <div className="au-reflection" aria-hidden="true" />
            <div className="au-glass" aria-hidden="true" />
          </div>

          <div className="au-stage__plaque" aria-live="polite">
            <div className="au-plaque" key={current.id} data-settle="">
              <span className="au-plaque__meta">
                Leg {leg + 1} of {LEGS.length} · {current.from} → {current.to}
              </span>
              <span className="au-plaque__name">{current.title}</span>
            </div>
          </div>

          <div className="au-stage__readout" aria-hidden="true">
            <span className="au-stage__clock" ref={clockRef}>
              {STATIONS[0].time}
            </span>
            <span className="au-stage__km" ref={kmRef}>
              0 km
            </span>
          </div>

          <p className="au-stage__note" key={`note-${current.id}`} data-settle="">
            {current.note}
          </p>
        </div>

        <div className="au-stage__rail" aria-hidden="true">
          <span className="au-rail__line" />
          <span className="au-rail__fill" />
          {STATIONS.map((s, i) => (
            <span
              key={s.name}
              className={[
                "au-rail__stop",
                i % 2 ? "au-rail__stop--low" : "",
                i === 0 ? "au-rail__stop--first" : "",
                i === STATIONS.length - 1 ? "au-rail__stop--last" : "",
                KEY_STOPS.has(s.short) ? "au-rail__stop--key" : "",
              ].join(" ")}
              style={{ left: `${s.at * 100}%` }}
            >
              <span className="au-rail__dot" />
              <span className="au-rail__label">
                {s.short} <b>{s.time}</b>
              </span>
            </span>
          ))}
          <span className="au-rail__train">
            <span />
          </span>
        </div>

        <div className="au-stage__controls">
          <button type="button" className="au-step" onClick={() => step(-1)} aria-label="Previous leg">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <label className="au-travel">
            <span className="au-travel__label">Travel the line</span>
            <input
              ref={rangeRef}
              type="range"
              min={0}
              max={RANGE_MAX}
              defaultValue={0}
              onChange={onRange}
              onKeyDown={onKey}
              aria-valuetext={`${current.title}, ${current.from} to ${current.to}`}
            />
          </label>
          <button type="button" className="au-step" onClick={() => step(1)} aria-label="Next leg">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Picture } from "../assets";
import { NoseBullet } from "../brand/Logo";
import { CountUp } from "../motion/CountUp";
import { useReducedMotion } from "../motion/useReducedMotion";
import { Pet } from "./Pets";
import { SPECIES } from "./species";

/**
 * Tabs for who we see. Panels slide in the direction of travel (`data-state` before/active/after).
 * The stage is 2.5D: three layers (blob, pet, props) shift by different depths toward a fine pointer,
 * written as `--px`/`--py` from one rAF. Arrow keys, Home and End move between tabs.
 */
export function SpeciesSwitcher() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      x = (event.clientX - rect.left) / rect.width - 0.5;
      y = (event.clientY - rect.top) / rect.height - 0.5;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          stage.style.setProperty("--px", x.toFixed(3));
          stage.style.setProperty("--py", y.toFixed(3));
        });
    };
    const onLeave = () => {
      stage.style.setProperty("--px", "0");
      stage.style.setProperty("--py", "0");
    };
    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const select = (index: number, focus = false) => {
    const next = (index + SPECIES.length) % SPECIES.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: SPECIES.length - 1 };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <div className="sn-species" style={{ "--active": active, "--n": SPECIES.length } as CSSProperties}>
      <div className="sn-tabs" role="tablist" aria-label="Species">
        <span className="sn-tabs-pill" aria-hidden="true" />
        {SPECIES.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`sn-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls={`sn-panel-${s.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={onKey}
            data-sn-species={s.id}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="sn-species-panels" ref={stageRef}>
        {SPECIES.map((s, i) => (
          <div
            key={s.id}
            id={`sn-panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`sn-tab-${s.id}`}
            className="sn-species-panel"
            data-species={s.id}
            data-state={i < active ? "before" : i === active ? "active" : "after"}
            inert={i !== active}
          >
            <div className="sn-species-art">
              <span className="sn-layer sn-layer-blob" aria-hidden="true" />
              <span className="sn-layer sn-layer-pet">
                <Pet id={s.id} />
              </span>
              <figure className="sn-layer sn-layer-photo sn-polaroid">
                <Picture assetKey={s.image} alt={s.imageAlt} sizes="(min-width: 900px) 240px, 45vw" />
                <figcaption className="sn-chart">{s.patient}</figcaption>
              </figure>
            </div>
            <div className="sn-species-copy">
              <h3 className="sn-h3">{s.headline}</h3>
              <p>{s.body}</p>
              <p className="sn-species-count">
                <CountUp value={s.seenThisYear} className="sn-stat-num" />
                <span className="sn-chart">{s.tab.toLowerCase()} seen this year</span>
              </p>
              <ul className="sn-chips">
                {s.visits.map((v, j) => (
                  <li key={v} style={{ "--i": j } as CSSProperties}>
                    <NoseBullet />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

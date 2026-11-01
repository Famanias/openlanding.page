"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type CSSProperties,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { SCENES } from "./scenes";
import { SceneWindow } from "./Windows";
import { MaskLine, Reveal } from "../motion/Reveal";
import { useReducedMotion } from "../motion/useReducedMotion";

export function RehearsalCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const count = SCENES.length;

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = (index + count) % count;
      setActive(nextIndex);
    },
    [count]
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // When active slide changes, ensure its reveal elements are triggered
  useEffect(() => {
    if (typeof document === "undefined") return;
    const slides = document.querySelectorAll(".us-carousel__slide");
    const current = slides[active];
    if (current) {
      current.querySelectorAll("[data-reveal]").forEach((el) => {
        el.setAttribute("data-in", "true");
      });
      current.querySelectorAll(".us-win").forEach((el) => {
        el.setAttribute("data-in", "true");
      });
    }
  }, [active]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal movement dominates vertical scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="us-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Rehearsal scenes"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Theatrical Act Navigation Bar */}
      <div className="us-carousel__header">
        <div className="us-carousel__tabs" role="tablist" aria-label="Production Acts">
          {SCENES.map((scene, i) => {
            const isSelected = active === i;
            return (
              <button
                key={scene.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`rehearsal-act-panel-${scene.id}`}
                id={`rehearsal-act-tab-${scene.id}`}
                className={`us-carousel__tab ${isSelected ? "us-carousel__tab--active" : ""}`}
                onClick={() => goTo(i)}
                type="button"
              >
                <span className="us-carousel__tab-pill">
                  <span className="us-carousel__tab-act us-mono">{scene.act}</span>
                  <span className="us-carousel__tab-title">{scene.window.split(" · ")[0]}</span>
                </span>
                {isSelected && <span className="us-carousel__tab-pip" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <div className="us-carousel__controls">
          <span className="us-carousel__counter us-mono" aria-hidden="true">
            <span className="us-carousel__counter-now">0{active + 1}</span>
            <span className="us-carousel__counter-div">/</span>
            <span className="us-carousel__counter-total">0{count}</span>
          </span>
          <div className="us-carousel__nav-btns">
            <button
              type="button"
              className="us-carousel__nav-btn us-carousel__nav-btn--prev"
              onClick={prev}
              aria-label="Previous scene"
              title="Previous scene (Left Arrow)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="us-carousel__nav-btn us-carousel__nav-btn--next"
              onClick={next}
              aria-label="Next scene"
              title="Next scene (Right Arrow)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Screen reader live announcement */}
      <span className="us-sr" aria-live="polite">
        Scene {active + 1} of {count}: {SCENES[active].act} {SCENES[active].milestone}. {SCENES[active].lead} {SCENES[active].cue}
      </span>

      {/* Slide Viewport */}
      <div className="us-carousel__viewport">
        <ol
          className="us-scenes us-carousel__track"
          style={{
            transform: `translateX(-${active * 100}%)`,
            transitionDuration: reduced ? "0ms" : "460ms",
          }}
        >
          {SCENES.map((s, n) => {
            const isCurrent = active === n;
            return (
              <li
                key={s.id}
                id={`rehearsal-act-panel-${s.id}`}
                role="tabpanel"
                aria-labelledby={`rehearsal-act-tab-${s.id}`}
                className={`us-sc us-carousel__slide ${isCurrent ? "us-carousel__slide--active" : ""}`}
                style={{ "--i": n } as CSSProperties}
                aria-hidden={!isCurrent}
              >
                <div className="us-sc__h">
                  <Reveal variant="scale" className="us-sc__node"><i /></Reveal>
                  <div className="us-sc__meta">
                    <Reveal variant="slide" as="span" className="us-mono us-sc__act">{s.act}</Reveal>
                    <span className="us-sc__dot" aria-hidden="true">·</span>
                    <Reveal variant="slide" as="span" className="us-mono us-sc__milestone">{s.milestone}</Reveal>
                  </div>
                  <h3 className="us-sc__t">
                    <MaskLine>{s.lead} <em className="us-cueword">{s.cue}</em></MaskLine>
                  </h3>
                  <Reveal as="p" className="us-sc__p" index={1}>{s.body}</Reveal>
                  <Reveal as="blockquote" className="us-sc__quote" index={2}>
                    <p className="us-sc__quotedir">{s.directorNote}</p>
                    <cite className="us-mono us-sc__cite">Director Note</cite>
                  </Reveal>
                </div>
                <SceneWindow kind={s.id} title={s.window} />
              </li>
            );
          })}
        </ol>
      </div>

      {/* Stage Dots and Keyboard Hint */}
      <div className="us-carousel__footer">
        <div className="us-carousel__pips" role="group" aria-label="Scene pagination">
          {SCENES.map((scene, i) => (
            <button
              key={scene.id}
              type="button"
              className={`us-carousel__pip ${active === i ? "us-carousel__pip--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${scene.act}`}
            />
          ))}
        </div>
        <span className="us-carousel__hint us-mono">
          Use ← / → keys or swipe to change scenes
        </span>
      </div>
    </div>
  );
}

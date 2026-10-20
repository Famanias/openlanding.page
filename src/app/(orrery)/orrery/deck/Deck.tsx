"use client";

import { useCallback, useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import { deckReducer } from "./deck-state";
import { ChapterRail } from "./ChapterRail";
import { SlideCounter } from "./SlideCounter";

export type Slide = {
  id: string;
  chapter: string;
  tone?: "bone" | "ink";
  render: (active: boolean) => ReactNode;
};

/** Keynote mode runs only on wide screens without reduced motion; it matches the CSS media query in orrery.css. */
export const KEYNOTE_QUERY = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
const STEP_LOCK_MS = 650;

export function Deck({ slides, onToneChange }: { slides: Slide[]; onToneChange?: (tone: "bone" | "ink") => void }) {
  const [state, dispatch] = useReducer(deckReducer, { index: 0, count: slides.length });
  const [keynote, setKeynote] = useState(false);
  const [ready, setReady] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const lockedUntil = useRef(0);

  // Track which mode we're in.
  useEffect(() => {
    const mq = window.matchMedia(KEYNOTE_QUERY);
    const sync = () => setKeynote(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Deep links: read the hash on load and whenever it changes (e.g. the "Book a demo" link).
  useEffect(() => {
    const fromHash = () => {
      const i = slides.findIndex((s) => `#${s.id}` === window.location.hash);
      if (i >= 0) dispatch({ type: "goto", index: i });
    };
    fromHash();
    // Enable transitions only after the initial jump, so a deep link doesn't animate through every slide.
    const raf = requestAnimationFrame(() => setReady(true));
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [slides]);

  const step = useCallback((type: "next" | "prev" | "first" | "last") => {
    const now = performance.now();
    if (now < lockedUntil.current) return;
    lockedUntil.current = now + STEP_LOCK_MS;
    dispatch({ type });
  }, []);

  // Keyboard, wheel and touch drive the deck in keynote mode only.
  useEffect(() => {
    if (!keynote) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const map: Record<string, "next" | "prev" | "first" | "last"> = {
        ArrowDown: "next",
        ArrowRight: "next",
        PageDown: "next",
        " ": "next",
        ArrowUp: "prev",
        ArrowLeft: "prev",
        PageUp: "prev",
        Home: "first",
        End: "last",
      };
      const action = map[e.key];
      if (!action) return;
      e.preventDefault();
      dispatch({ type: action });
    };
    window.addEventListener("keydown", onKey);

    let observer: { kill: () => void } | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/Observer")]).then(([{ gsap }, { Observer }]) => {
      if (cancelled) return;
      gsap.registerPlugin(Observer);
      observer = Observer.create({
        target: window,
        type: "wheel,touch",
        wheelSpeed: -1,
        tolerance: 12,
        preventDefault: true,
        onUp: () => step("next"),
        onDown: () => step("prev"),
      });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
      observer?.kill();
    };
  }, [keynote, step]);

  // Flow mode: the counter follows whichever slide fills most of the viewport.
  useEffect(() => {
    if (keynote) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (i >= 0) dispatch({ type: "goto", index: i });
          }
        }
      },
      { threshold: 0.5 },
    );
    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [keynote]);

  // Keep the hash in sync with the active slide in keynote mode.
  useEffect(() => {
    if (!keynote || !ready) return;
    const hash = `#${slides[state.index].id}`;
    if (window.location.hash !== hash) history.replaceState(null, "", hash);
  }, [keynote, ready, state.index, slides]);

  useEffect(() => {
    onToneChange?.(slides[state.index].tone ?? "bone");
  }, [state.index, slides, onToneChange]);

  const goTo = (index: number) => {
    if (keynote) dispatch({ type: "goto", index });
    else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      sectionRefs.current[index]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <div className="orr-deck" data-ready={ready ? "" : undefined}>
        {slides.map((slide, i) => {
          const position = i < state.index ? "past" : i === state.index ? "active" : "future";
          return (
            <section
              key={slide.id}
              id={slide.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="orr-slide"
              data-tone={slide.tone ?? "bone"}
              data-state={position}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.chapter}`}
              inert={keynote && position !== "active" ? true : undefined}
            >
              {slide.render(i === state.index)}
            </section>
          );
        })}
      </div>
      <SlideCounter index={state.index} count={slides.length} />
      <ChapterRail chapters={slides.map((s) => s.chapter)} active={state.index} onSelect={goTo} />
    </>
  );
}

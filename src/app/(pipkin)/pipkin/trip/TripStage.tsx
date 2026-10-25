"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { STOPS } from "../data/shop";
import { LogoMark } from "../brand/Logo";
import { SCENES } from "./scenes";
import { Traveler } from "./Traveler";
import { STOP_COUNT, scrollForStop, tripPose } from "./progress";
import { useInView } from "../motion/useInView";
import { useReducedMotion } from "../motion/useReducedMotion";

type Metrics = { top: number; height: number; vh: number };

/**
 * "The Trip": one order followed from checkout to doorstep. In scrub mode a sticky stage slides a strip of
 * five illustrated scenes sideways while one jar rides the route; scroll progress goes to CSS variables from
 * a single rAF loop. With reduced motion (or no JS) it falls back to five stacked cards, all visible.
 */
export function TripStage() {
  const reduced = useReducedMotion();
  const mode = reduced ? "flow" : "scrub";
  const [stop, setStop] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<Metrics>({ top: 0, height: 1, vh: 1 });
  const { ref: liveRef, inView } = useInView<HTMLDivElement>({ once: false });

  useEffect(() => {
    if (mode !== "scrub") return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    let raf = 0;
    let current = -1;

    const measure = () => {
      const r = section.getBoundingClientRect();
      metrics.current = { top: r.top + window.scrollY, height: r.height, vh: window.innerHeight };
    };
    const paint = () => {
      raf = 0;
      const { top, height, vh } = metrics.current;
      const pose = tripPose(window.scrollY, top, height, vh);
      stage.style.setProperty("--s", pose.s.toFixed(4));
      stage.style.setProperty("--p", pose.p.toFixed(4));
      if (pose.stop !== current) {
        current = pose.stop;
        setStop(pose.stop);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const remeasure = () => { measure(); onScroll(); };

    measure();
    paint();
    const ro = new ResizeObserver(remeasure);
    ro.observe(section);
    ro.observe(document.body);
    document.fonts?.ready.then(remeasure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("load", remeasure);

    // #trip-3 deep-links to the third stop
    const m = /^#trip-([1-5])$/.exec(window.location.hash);
    if (m) window.scrollTo(0, scrollForStop(Number(m[1]) - 1, metrics.current.top, metrics.current.height, metrics.current.vh));

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  const jump = useCallback((i: number) => {
    const { top, height, vh } = metrics.current;
    window.dispatchEvent(new CustomEvent("pk:scrollto", { detail: { top: scrollForStop(i, top, height, vh) } }));
    history.replaceState(null, "", `#trip-${i + 1}`);
  }, []);

  const info = STOPS[stop];
  return (
    <section id="trip" ref={sectionRef} className="pk-trip" data-mode={mode} data-live={inView ? "true" : "false"} aria-labelledby="trip-title">
      <div className="pk-trip-pin" ref={liveRef}>
        <div className="pk-trip-head">
          <div>
            <p className="pk-eyebrow">The trip · 72 hours</p>
            <h2 id="trip-title" className="pk-h2">Follow one jar, door to door.</h2>
          </div>
          <nav aria-label="Trip stops" className="pk-rail-wrap">
            <ol className="pk-rail">
              {STOPS.map((s, i) => (
                <li key={s.id}>
                  <button type="button" className="pk-rail-btn" data-active={stop === i ? "true" : "false"} aria-current={stop === i ? "step" : undefined} onClick={() => jump(i)}>
                    <span className="pk-rail-n">{i + 1}</span>
                    <span className="pk-rail-l">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="pk-stage" ref={stageRef} data-mode={mode} data-stop={stop}>
          <div className="pk-strip">
            {SCENES.map((Scene, i) => (
              <article key={STOPS[i].id} className="pk-scene" data-active={stop === i ? "true" : "false"} style={{ "--i": i } as CSSProperties} aria-label={`Step ${i + 1} of ${STOP_COUNT}: ${STOPS[i].label}`}>
                <div className="pk-scene-frame">
                  <Scene />
                  {mode === "flow" ? <Traveler stop={i} /> : null}
                </div>
                <div className="pk-scene-copy">
                  <p className="pk-stepline"><span>Step {i + 1} of {STOP_COUNT}</span><span>{STOPS[i].when}</span></p>
                  <h3 className="pk-h3">{STOPS[i].title}</h3>
                  <p>{STOPS[i].body}</p>
                </div>
              </article>
            ))}
          </div>
          {mode === "scrub" ? <Traveler stop={stop} /> : null}
          {mode === "scrub" ? (
            <>
              <div className="pk-tracker" aria-hidden="true">
                <span className="pk-tracker-dot" />
                <span key={stop} className="pk-tracker-text">Your jar · {info.label}</span>
              </div>
              <div className="pk-route" aria-hidden="true">
                <i className="pk-route-fill" />
                {STOPS.map((s, i) => <b key={s.id} className="pk-route-dot" data-done={stop >= i ? "true" : "false"} style={{ left: `${(i / (STOP_COUNT - 1)) * 100}%` }} />)}
                <span className="pk-route-rider"><LogoMark size={30} /></span>
              </div>
            </>
          ) : null}
        </div>

        {mode === "scrub" ? (
          <div className="pk-caption" aria-live="polite" aria-atomic="true">
            <p key={`m${stop}`} className="pk-stepline"><span>Step {stop + 1} of {STOP_COUNT}</span><span>{info.when}</span></p>
            <h3 key={`t${stop}`} className="pk-h3">{info.title}</h3>
            <p key={`b${stop}`} className="pk-caption-body">{info.body}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

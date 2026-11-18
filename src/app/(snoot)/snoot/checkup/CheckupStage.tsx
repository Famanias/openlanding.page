"use client";
import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { NoseBullet } from "../brand/Logo";
import { Stamp } from "../brand/Stamp";
import { round } from "../motion/math";
import { scrollToY } from "../motion/SmoothScroll";
import { useReducedMotion } from "../motion/useReducedMotion";
import {
  CHAPTERS,
  FRANK_HEIGHT,
  FRANK_WIDTH,
  bodyXAt,
  chapterIndexAt,
  ecgPath,
  isAllClear,
  pieceYAt,
  progressForChapter,
  stageProgress,
  trackOffset,
} from "./checkup";
import { Frank } from "./Frank";

const ECG = ecgPath(FRANK_WIDTH, 50, CHAPTERS.map((c) => c.x));

type Metrics = { top: number; height: number; vh: number; trackWidth: number; anchor: number; scale: number };

/**
 * The signature scene. The section is tall; the stage inside it is sticky. One passive scroll listener
 * schedules one rAF that turns the section's real offsets into progress, then writes transforms straight
 * onto the track, the chest-piece and the ECG clip, and, only when the chapter changes, a few data attributes. React never
 * re-renders during the scroll.
 *
 * The scrub layout only exists under `(prefers-reduced-motion: no-preference) and (scripting: enabled)`;
 * everywhere else the same markup lays out as a full-length Frank with numbered markers and a card grid.
 */
export function CheckupStage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const stage = section.querySelector<HTMLElement>("[data-ck-stage]");
    const frank = section.querySelector<HTMLElement>("[data-ck-frank]");
    const live = section.querySelector<HTMLElement>("[data-ck-live]");
    const count = section.querySelector<HTMLElement>("[data-ck-count]");
    const cards = [...section.querySelectorAll<HTMLElement>("[data-ck-card]")];
    const rail = [...section.querySelectorAll<HTMLElement>("[data-ck-jump]")];
    const track = section.querySelector<HTMLElement>("[data-ck-track]");
    const piece = section.querySelector<HTMLElement>("[data-ck-piece]");
    const ecg = section.querySelector<SVGPathElement>("[data-ck-ecg]");
    if (!stage || !frank || !track) return;

    let metrics: Metrics | null = null;
    let frame = 0;
    let current = -1;
    let done = false;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const trackWidth = frank.offsetWidth;
      const width = stage.clientWidth;
      metrics = {
        top: rect.top + window.scrollY,
        height: section.offsetHeight,
        vh: window.innerHeight,
        trackWidth,
        anchor: width * (width < 760 ? 0.5 : 0.42),
        scale: trackWidth / FRANK_WIDTH,
      };
      stage.style.setProperty("--anchor", `${round(metrics.anchor, 1)}px`);
    };

    const setChapter = (index: number) => {
      current = index;
      const chapter = CHAPTERS[index];
      stage.dataset.chapter = chapter.id;
      cards.forEach((card, i) => (card.dataset.state = i < index ? "before" : i === index ? "active" : "after"));
      rail.forEach((item, i) => {
        if (i === index) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
      });
      stage.style.setProperty("--rail-i", String(index));
      if (count) count.textContent = String(index + 1).padStart(2, "0");
      if (live) live.textContent = chapter.reading;
    };

    const write = () => {
      frame = 0;
      if (!metrics) measure();
      const m = metrics!;
      const p = stageProgress(window.scrollY, m.top, m.height, m.vh);
      const bx = bodyXAt(p);
      // Write straight to the three moving elements: a custom property on the stage would restyle the whole
      // Frank SVG subtree every frame.
      track.style.transform = `translate3d(${round(trackOffset(bx, m.trackWidth, m.anchor), 1)}px, 0, 0)`;
      if (piece) piece.style.transform = `translate3d(-50%, calc(${round(pieceYAt(bx) * m.scale, 1)}px - 50%), 0)`;
      if (ecg) ecg.style.clipPath = `inset(0 ${round((1 - bx / FRANK_WIDTH) * 100, 2)}% 0 0)`;
      const index = chapterIndexAt(bx);
      if (index !== current) setChapter(index);
      const clear = isAllClear(p);
      if (clear !== done) {
        done = clear;
        stage.dataset.done = String(clear);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };
    const remeasure = () => {
      metrics = null;
      schedule();
    };

    const resize = new ResizeObserver(remeasure);
    resize.observe(stage);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    write();

    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
      // hand the static layout a clean slate if motion gets switched off mid-visit
      track.style.transform = "";
      if (piece) piece.style.transform = "";
      if (ecg) ecg.style.clipPath = "";
    };
  }, [reduced]);

  /** In the scrub layout a rail item scrolls to its chapter; elsewhere it is a plain in-page link. */
  const jump = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    const section = sectionRef.current;
    if (!section || reduced || !window.matchMedia("(scripting: enabled)").matches) return;
    const stage = section.querySelector<HTMLElement>("[data-ck-stage]");
    if (!stage || getComputedStyle(stage).position !== "sticky") return;
    // keep Lenis's window-level anchor handler from also scrolling to the (sticky) card
    event.preventDefault();
    event.stopPropagation();
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    scrollToY(top + travel * progressForChapter(index) + 2);
  };

  return (
    <section ref={sectionRef} id="checkup" className="sn-checkup" aria-labelledby="sn-checkup-title">
      <div className="sn-ck-stage" data-ck-stage data-chapter="nose" data-done="false">
        <div className="sn-ck-blobs" aria-hidden="true">
          <span />
          <span />
        </div>

        <header className="sn-ck-head">
          <p className="sn-eyebrow sn-ck-eyebrow">
            <span className="sn-chart">The check-up</span>
            <span className="sn-chart sn-ck-count" aria-hidden="true">
              <span data-ck-count>01</span>/06
            </span>
          </p>
          <h2 id="sn-checkup-title" className="sn-h2 sn-ck-title">
            Nose to tail, in six stops.
          </h2>
          <nav aria-label="Check-up stops" className="sn-ck-railwrap" style={{ "--n": CHAPTERS.length } as CSSProperties}>
            <span className="sn-ck-rail-pill" aria-hidden="true" />
            <ol className="sn-ck-rail">
              {CHAPTERS.map((chapter, i) => (
                <li key={chapter.id}>
                  <a href={`#ck-${chapter.id}`} data-ck-jump={i} aria-current={i === 0 ? "step" : undefined} onClick={jump(i)}>
                    <span className="sn-ck-rail-long">{chapter.part}</span>
                    <span className="sn-ck-rail-short" aria-hidden="true">
                      {chapter.id}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        <div className="sn-ck-cards">
          {CHAPTERS.map((chapter, i) => (
            <article key={chapter.id} id={`ck-${chapter.id}`} className="sn-ck-card" data-ck-card data-state={i === 0 ? "active" : "after"}>
              <p className="sn-chart sn-ck-card-n">
                {String(i + 1).padStart(2, "0")} · {chapter.part}
              </p>
              <h3 className="sn-h3">{chapter.title}</h3>
              <p className="sn-ck-card-body">{chapter.body}</p>
              <ul className="sn-ck-services">
                {chapter.services.map((s) => (
                  <li key={s}>
                    <NoseBullet />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="sn-ck-frame">
          <div className="sn-ck-track" data-ck-track>
            <div className="sn-ck-frank" data-ck-frank>
              <Frank />
              {CHAPTERS.map((chapter, i) => (
                <span
                  key={chapter.id}
                  className="sn-ck-marker"
                  aria-hidden="true"
                  style={{ left: `${(chapter.x / FRANK_WIDTH) * 100}%`, top: `${(chapter.y / FRANK_HEIGHT) * 100}%` } as CSSProperties}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <svg className="sn-ck-ecg" viewBox={`0 0 ${FRANK_WIDTH} 100`} preserveAspectRatio="none" aria-hidden="true">
              <path className="sn-ck-ecg-ghost" d={ECG} />
              <path className="sn-ck-ecg-live" d={ECG} data-ck-ecg />
            </svg>
          </div>

          <div className="sn-ck-piece" aria-hidden="true" data-ck-piece>
            <svg className="sn-ck-tube" viewBox="0 0 120 900" preserveAspectRatio="xMidYMax meet">
              <path d="M60 900C60 820 20 760 30 640C40 520 100 470 90 330C80 190 30 120 40 0" />
              <path className="sn-ck-tube-shine" d="M60 900C60 820 20 760 30 640C40 520 100 470 90 330C80 190 30 120 40 0" />
            </svg>
            <span className="sn-ck-disc">
              <span className="sn-ck-pulse" />
            </span>
          </div>
        </div>

        <p className="sn-ck-readout sn-chart" aria-live="polite">
          <span className="sn-ck-dot" aria-hidden="true" />
          <span data-ck-live>{CHAPTERS[0].reading}</span>
        </p>

        <div className="sn-ck-stamp" aria-hidden="true">
          <Stamp id="sn-allclear" top="ALL CLEAR" bottom="NOSE TO TAIL" />
        </div>
      </div>
    </section>
  );
}

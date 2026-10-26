"use client";
import { useEffect, useState } from "react";
import { clamp, sectionProgress, stageAt } from "./math";

export function MotionRuntime() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const start = () => {
      cleanup();
      root.dataset.fdMotion = reduced.matches ? "reduced" : "full";
      if (reduced.matches) {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((el) => (el.dataset.in = "true"));
        return;
      }
      let disposed = false;
      let raf = 0;
      let active = true;
      const hero = document.querySelector<HTMLElement>(".fd-hero");
      const world = document.querySelector<HTMLElement>(".fd-campus");
      const story = document.querySelector<HTMLElement>(".fd-story");
      const header = document.querySelector<HTMLElement>(".fd-header");
      const bar = document.querySelector<HTMLElement>(".fd-page-progress");
      let heroTop = 0,
        heroHeight = 1,
        storyTop = 0,
        storyHeight = 1,
        total = 1;
      let lastStage = -1;
      let lastWorld = -1;
      let compact = false;
      const measure = () => {
        const y = scrollY;
        heroTop = (hero?.getBoundingClientRect().top ?? 0) + y;
        heroHeight = hero?.offsetHeight ?? 1;
        storyTop = (story?.getBoundingClientRect().top ?? 0) + y;
        storyHeight = story?.offsetHeight ?? 1;
        total = Math.max(
          1,
          document.documentElement.scrollHeight - innerHeight,
        );
        schedule();
      };
      const render = () => {
        raf = 0;
        if (!active) return;
        const y = scrollY;
        bar?.style.setProperty("--fd-progress", String(clamp(y / total)));
        if (y > 50 !== compact) {
          compact = y > 50;
          header?.setAttribute("data-compact", String(compact));
        }
        if (world) {
          const progress = clamp((y - heroTop) / (heroHeight * 0.85));
          if (progress !== lastWorld) {
            world.style.setProperty("--campus-y", `${progress * -55}px`);
            world.style.setProperty(
              "--campus-scale",
              String(1 + progress * 0.12),
            );
            lastWorld = progress;
          }
        }
        if (story) {
          const stage = stageAt(
            sectionProgress(y, storyTop, storyHeight, innerHeight),
            3,
          );
          if (stage !== lastStage) {
            story.dataset.stage = String(stage);
            story.removeAttribute("data-manual");
            story
              .querySelectorAll("[data-stage-button]")
              .forEach((button, i) =>
                button.setAttribute("aria-pressed", String(i === stage)),
              );
            lastStage = stage;
          }
        }
      };
      function schedule() {
        if (!raf && active) raf = requestAnimationFrame(render);
      }
      const ambient = new IntersectionObserver(
        (entries) =>
          entries.forEach(
            (e) =>
              ((e.target as HTMLElement).dataset.away = String(
                !e.isIntersecting,
              )),
          ),
        { threshold: 0 },
      );
      document
        .querySelectorAll("[data-ambient]")
        .forEach((el) => ambient.observe(el));
      const visibility = () => {
        active = !document.hidden;
        root.dataset.fdHidden = String(document.hidden);
        if (active) {
          measure();
          schedule();
        } else cancelAnimationFrame(raf);
      };
      addEventListener("scroll", schedule, { passive: true });
      addEventListener("resize", measure);
      document.addEventListener("visibilitychange", visibility);
      measure();
      document.fonts.ready.then(() => {
        if (!disposed) measure();
      });
      let lenis: { destroy: () => void } | undefined;
      if (matchMedia("(hover:hover) and (pointer:fine)").matches)
        import("lenis").then(({ default: Lenis }) => {
          if (disposed) return;
          lenis = new Lenis({
            autoRaf: true,
            lerp: 0.105,
            anchors: { offset: -90 },
            smoothWheel: true,
          });
        });
      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        ambient.disconnect();
        removeEventListener("scroll", schedule);
        removeEventListener("resize", measure);
        document.removeEventListener("visibilitychange", visibility);
        lenis?.destroy();
        world?.style.removeProperty("--campus-y");
        world?.style.removeProperty("--campus-scale");
      };
    };
    start();
    reduced.addEventListener("change", start);
    return () => {
      cleanup();
      reduced.removeEventListener("change", start);
      delete root.dataset.fdMotion;
      delete root.dataset.fdHidden;
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.fdPaused = String(paused);
    return () => {
      delete document.documentElement.dataset.fdPaused;
    };
  }, [paused]);
  return (
    <button
      className="fd-pause"
      type="button"
      aria-label={paused ? "Play motion" : "Pause motion"}
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        {paused ? <path d="m3 1 5 4-5 4Z" stroke="currentColor"/> : <path d="M3 1v8M7 1v8" stroke="currentColor"/>}
      </svg>
      <span>{paused ? "Play motion" : "Pause motion"}</span>
    </button>
  );
}

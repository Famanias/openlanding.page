"use client";

import { useEffect, useRef, useState } from "react";
import { chapterFromProgress, fieldProgress, type FieldSection } from "../mechanic/fieldLog";

type ScrollFieldLogProps = { children: React.ReactNode };

const labels: Record<string, string> = {
  site: "SITE / 01",
  proof: "PROOF / 02",
  reel: "REEL / 03",
  projects: "PROJECTS / 04",
  method: "HANDOFF / 05",
  book: "BOOK / 06",
};

export function ScrollFieldLog({ children }: ScrollFieldLogProps) {
  const appRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [chapter, setChapter] = useState("site");

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastChapter = "";

    const measure = (): FieldSection[] =>
      Array.from(app.querySelectorAll<HTMLElement>("[data-field-section]"))
        .map((section) => ({
          id: section.dataset.fieldSection ?? "site",
          top: section.getBoundingClientRect().top + window.scrollY,
          height: section.offsetHeight,
        }))
        .sort((a, b) => a.top - b.top);

    const update = () => {
      frameRef.current = null;
      const sections = measure();
      const value = fieldProgress(window.scrollY, sections, window.innerHeight);
      app.style.setProperty("--tc-progress", String(value));
      app.style.setProperty("--tc-progress-pct", `${value * 100}%`);
      app.dataset.tcScrolled = value > 0.025 ? "true" : "false";
      const nextChapter = chapterFromProgress(value, sections) ?? "site";
      app.dataset.tcChapter = nextChapter;
      if (nextChapter !== lastChapter) {
        lastChapter = nextChapter;
        setChapter(nextChapter);
      }
    };

    const schedule = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };

    schedule();
    if (!reduced) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      const resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(app);
      return () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        resizeObserver.disconnect();
        if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      };
    }

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={appRef} className="tc-app" data-tc-chapter="site">
      <div className="tc-signal-line" aria-hidden="true" />
      <aside className="tc-field-rail" aria-hidden="true">
        <span className="tc-field-rail-track" />
        <span className="tc-field-rail-fill" />
        <span className="tc-field-rail-marker" />
      </aside>
      <p className="tc-field-label" aria-live="polite"><strong>{labels[chapter] ?? chapter}</strong> / SIGNAL: CLEAR</p>
      {children}
    </div>
  );
}

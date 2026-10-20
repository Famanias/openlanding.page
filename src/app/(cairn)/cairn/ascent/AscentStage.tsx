"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AltitudeMeter } from "./AltitudeMeter";
import { progressFromOffsets } from "./camps";
import { K2Silhouette } from "./K2Silhouette";

/**
 * A chapter counts as "arrived" when its top reaches the first unobstructed line of the viewport:
 * under the top bar on desktop, under the top bar plus the sticky K2 strip on phones.
 */
function arrivalOffset(stage: HTMLElement | null): number {
  const topbar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar")) || 68;
  const stageOnTop = stage && stage.getBoundingClientRect().width >= window.innerWidth - 1;
  return topbar + (stageOnTop ? stage.offsetHeight : 0) + 0.5;
}

/**
 * Pins K2 and the altitude meter beside the chapters (CSS sticky) and maps scroll position to ascent
 * progress with GSAP ScrollTrigger. Each chapter must carry `data-camp`; camp i is reached exactly when
 * chapter i's top reaches the top bar, so following a camp link shows that camp's altitude.
 */
export function AscentStage({ children }: { children: ReactNode }) {
  const chaptersRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const chapters = chaptersRef.current;
    if (!chapters) return;
    let tops: number[] = [];
    let offset = 70;
    let kill = () => {};
    let cancelled = false;

    const measure = () => {
      offset = arrivalOffset(stageRef.current);
      tops = Array.from(chapters.querySelectorAll<HTMLElement>("[data-camp]")).map(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
    };
    const update = () => {
      setProgress(progressFromOffsets(window.scrollY + offset, tops));
    };

    // Measure and render immediately (also covers reloading mid-page), then let ScrollTrigger drive updates.
    measure();
    update();

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const trigger = ScrollTrigger.create({
        trigger: chapters,
        start: "top bottom",
        end: "bottom top",
        onUpdate: update,
        onRefresh: () => {
          measure();
          update();
        },
      });
      // Fonts and images change chapter heights; re-measure once they've settled.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      kill = () => trigger.kill();
    });

    const onResize = () => {
      measure();
      update();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      kill();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="crn-ascent">
      <aside ref={stageRef} className="crn-stage" aria-label="Ascent of K2 along the Abruzzi Spur">
        <K2Silhouette progress={progress} />
        <p className="crn-stage__coords crn-label">35.8825° N · 76.5133° E · Karakoram</p>
        <AltitudeMeter progress={progress} />
      </aside>
      <div className="crn-chapters" ref={chaptersRef} data-chapters>
        {children}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useStageMode } from "./useStageMode";
import { calculateScrollProgress } from "./progress";
import { progressToElapsed, beanTempAt, formatClock, STAGES } from "./roast";
import { roastStore } from "./roast-store";
import { RoastPanel } from "./RoastPanel";

export function RoastSection() {
  const outerRef = useRef<HTMLElement>(null);
  const mode = useStageMode();

  useEffect(() => {
    if (mode !== "pinned") return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const el = outerRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const winH = window.innerHeight;
          if (rect.top <= 0 && rect.bottom >= winH) {
            const progress = calculateScrollProgress(rect.top, rect.height, winH);
            roastStore.setElapsed(progressToElapsed(progress));
          }
        }
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode]);

  // When leaving pinned mode, reset the clock to the top of the batch.
  useEffect(() => {
    if (mode === "flow") roastStore.setElapsed(0);
  }, [mode]);

  return (
    <section id="roast" ref={outerRef} data-mode={mode} className="sd-roast-outer sd-dark">
      <div className="sd-roast-stage sd-beanground">
        <div className="sd-roast-veil" aria-hidden="true" />
        <div className="sd-roast-stage__inner">
          {mode === "pinned" ? (
            <RoastPanel />
          ) : (
            <div className="sd-wrap">
              <RoastPanel />
              <ol className="sd-flow-log" aria-label="Batch 041 stage log">
                {STAGES.map((stage) => (
                  <li key={stage.id} className="sd-flow-log__row">
                    <span className="sd-mono" style={{ color: "var(--color-tangerine)" }}>
                      {String(stage.index + 1).padStart(2, "0")} · {stage.label}
                    </span>
                    <span className="sd-mono" style={{ color: "var(--color-oat)" }}>
                      {stage.range} · {stage.id === "charge" ? "205°C in" : `${Math.round(beanTempAt(stage.end))}°C`}
                    </span>
                    <p style={{ margin: "6px 0 0", color: "color-mix(in srgb, var(--color-crema) 82%, transparent)" }}>
                      {stage.blurb}
                    </p>
                    <span className="sd-vh">
                      Ends at {formatClock(stage.end)}.
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

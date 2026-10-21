"use client";

import { useEffect, useRef } from "react";
import { useClock } from "../drydown/ClockProvider";
import { useStageMode } from "../drydown/useStageMode";
import { calculateScrollProgress } from "../drydown/progress";
import { progressToHour } from "../drydown/clock";
import { DryDown } from "../drydown/DryDown";

export function DryDownSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const { setHour } = useClock();
  const mode = useStageMode();

  useEffect(() => {
    if (mode !== "pinned") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!outerRef.current) return;
          const rect = outerRef.current.getBoundingClientRect();
          const winH = window.innerHeight;

          // Only drive clock when section is actively within the pinned scroll envelope
          if (rect.top <= 0 && rect.bottom >= winH) {
            const progress = calculateScrollProgress(rect.top, rect.height, winH);
            const hour = progressToHour(progress);
            setHour(hour);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode, setHour]);

  return (
    <section
      id="drydown"
      ref={outerRef}
      data-mode={mode}
      className="vr-drydown-outer vr-dark"
    >
      <div className="vr-drydown-stage">
        <DryDown />
      </div>
    </section>
  );
}

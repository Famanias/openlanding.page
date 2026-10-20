"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Eyebrow, rv } from "./Eyebrow";

const RESULTS = [
  { value: 4.2, decimals: 1, suffix: "×", label: "more tasks finished per week than single-agent setups" },
  { value: 63, decimals: 0, suffix: "%", label: "less time spent reviewing agent output" },
  { value: 99.6, decimals: 1, suffix: "%", label: "of hand-offs logged, replayable and attributable" },
];

const COUNT_MS = 1200;

/** Counts from 0 to `target` with a strong ease-out while `active`; static under reduced motion. */
function useCountUp(target: number, active: boolean) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (reduce || !active) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, target]);

  return value;
}

function Figure({ value, decimals, suffix, label, active }: (typeof RESULTS)[number] & { active: boolean }) {
  const shown = useCountUp(value, active);
  return (
    <div className="orr-figure">
      <p className="orr-figure__value">
        <span className="orr-visually-hidden">
          {value}
          {suffix}
        </span>
        <span aria-hidden="true">
          {shown.toFixed(decimals)}
          <span className="orr-accent">{suffix}</span>
        </span>
      </p>
      <p className="orr-figure__label">{label}</p>
    </div>
  );
}

export function ResultsSlide({ active }: { active: boolean }) {
  return (
    <div className="orr-slide-inner orr-results">
      <Eyebrow n={6}>Results</Eyebrow>
      <h2 className="orr-h2 orr-results__title orr-reveal" style={rv(1)}>
        Measured in work <em>that ships.</em>
      </h2>
      <div className="orr-results__grid">
        {RESULTS.map((r, i) => (
          <div key={r.label} className="orr-reveal" style={rv(i + 2)}>
            <Figure {...r} active={active} />
          </div>
        ))}
      </div>
      <p className="orr-label orr-results__note orr-reveal" style={rv(5)}>
        Median across 140 teams in the 2026 pilot programme
      </p>
    </div>
  );
}

"use client";

import type { KeyboardEvent } from "react";
import { formatClock, stageFromElapsed, TOTAL_SECONDS } from "./roast";

const STEP = 5;

interface ScrubberProps {
  elapsed: number;
  onElapsedChange: (elapsed: number) => void;
  id?: string;
}

export function Scrubber({ elapsed, onElapsedChange, id = "roast-scrubber" }: ScrubberProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        onElapsedChange(elapsed - STEP);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        onElapsedChange(elapsed + STEP);
        break;
      case "PageDown":
        e.preventDefault();
        onElapsedChange(elapsed - 60);
        break;
      case "PageUp":
        e.preventDefault();
        onElapsedChange(elapsed + 60);
        break;
      case "Home":
        e.preventDefault();
        onElapsedChange(0);
        break;
      case "End":
        e.preventDefault();
        onElapsedChange(TOTAL_SECONDS);
        break;
    }
  };

  const stage = stageFromElapsed(elapsed);

  return (
    <div className="sd-scrubber">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <label htmlFor={id} className="sd-mono" style={{ cursor: "pointer", color: "var(--color-oat)" }}>
          Batch 041 — scrub the roast
        </label>
        <span className="sd-mono" style={{ color: "var(--color-tangerine)", fontSize: "0.85rem" }}>
          {formatClock(elapsed)} · {stage.label}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={TOTAL_SECONDS}
        step={STEP}
        value={elapsed}
        onChange={(e) => onElapsedChange(Number.parseFloat(e.target.value))}
        onKeyDown={onKeyDown}
        aria-valuemin={0}
        aria-valuemax={TOTAL_SECONDS}
        aria-valuenow={Math.round(elapsed)}
        aria-valuetext={`${formatClock(elapsed)}, ${stage.label}`}
        className="sd-range"
      />
      <div className="sd-scrubber__ticks sd-mono" aria-hidden="true">
        <span>Charge</span>
        <span>Drying</span>
        <span>Maillard</span>
        <span>Crack</span>
        <span>Drop</span>
      </div>
    </div>
  );
}

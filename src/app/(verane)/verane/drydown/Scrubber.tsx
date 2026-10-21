"use client";

import type { KeyboardEvent } from "react";
import { formatHour, stepHour } from "./clock";

interface ScrubberProps {
  hour: number;
  dominantTierName?: string;
  onHourChange: (hour: number) => void;
  className?: string;
  id?: string;
}

export function Scrubber({
  hour,
  dominantTierName = "Top",
  onHourChange,
  className = "",
  id = "drydown-scrubber",
}: ScrubberProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        onHourChange(stepHour(hour, "prev15"));
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        onHourChange(stepHour(hour, "next15"));
        break;
      case "PageDown":
        e.preventDefault();
        onHourChange(stepHour(hour, "prevHour"));
        break;
      case "PageUp":
        e.preventDefault();
        onHourChange(stepHour(hour, "nextHour"));
        break;
      case "Home":
        e.preventDefault();
        onHourChange(stepHour(hour, "start"));
        break;
      case "End":
        e.preventDefault();
        onHourChange(stepHour(hour, "end"));
        break;
    }
  };

  const formatted = formatHour(hour);
  const ariaValueText = `${formatted}, leading ${dominantTierName} notes`;

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="vr-mono text-xs opacity-90 text-[var(--color-calcaire)] cursor-pointer">
          Dry-Down Timeline
        </label>
        <div className="flex items-center gap-2">
          <span className="vr-mono text-xs opacity-90 text-[var(--color-calcaire)]">Dominant:</span>
          <span className="vr-mono text-xs font-semibold text-[var(--color-gilt)]">
            {dominantTierName}
          </span>
          <span className="vr-mono text-sm font-semibold tracking-wider ml-3 text-[var(--color-calcaire)]">
            {formatted}
          </span>
        </div>
      </div>

      <input
        id={id}
        type="range"
        min={0}
        max={12}
        step={0.05}
        value={hour}
        onChange={(e) => onHourChange(Number.parseFloat(e.target.value))}
        onKeyDown={onKeyDown}
        aria-valuemin={0}
        aria-valuemax={12}
        aria-valuenow={Math.round(hour * 10) / 10}
        aria-valuetext={ariaValueText}
        className="vr-range"
      />

      {/* Timeline markers */}
      <div className="flex justify-between vr-mono text-[11px] opacity-85 text-[var(--color-calcaire)] mt-1">
        <span>00:00 (Opening)</span>
        <span>03:00 (Heart)</span>
        <span>06:00 (Sillage)</span>
        <span>09:00 (Skin Musk)</span>
        <span>12:00 (Resin Base)</span>
      </div>
    </div>
  );
}

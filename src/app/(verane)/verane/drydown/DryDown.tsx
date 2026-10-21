"use client";

import { useEffect, useRef, useState } from "react";
import { useClock } from "./ClockProvider";
import { calculateTierLevels, getDominantTier } from "./evaporation";
import { Flacon } from "./Flacon";
import { Scrubber } from "./Scrubber";
import { NotePyramid } from "./NotePyramid";
import { FragranceSwitch } from "./FragranceSwitch";

export function DryDown({ className = "" }: { className?: string }) {
  const { hour, setHour, fragranceSlug, setFragranceSlug, activeFragrance } =
    useClock();

  const levels = calculateTierLevels(activeFragrance.notes, hour);
  const dominantTier = getDominantTier(activeFragrance.notes, hour);

  // Polite announcement only when dominant tier changes
  const prevTierRef = useRef(dominantTier);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (prevTierRef.current !== dominantTier) {
      setAnnouncement(
        `At ${Math.round(hour)} hours, the ${dominantTier} notes now lead ${activeFragrance.title}.`,
      );
      prevTierRef.current = dominantTier;
    }
  }, [dominantTier, hour, activeFragrance.title]);

  return (
    <div className={`w-full flex flex-col justify-between h-full ${className}`}>
      {/* Screen-reader polite live region */}
      <div aria-live="polite" aria-atomic="true" className="vr-vh">
        {announcement}
      </div>

      {/* Header of the Dry-Down stage */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-[color-mix(in_srgb,var(--color-calcaire)_20%,transparent)] pb-4">
        <div>
          <span className="vr-mono text-xs text-[var(--color-gilt)] block mb-1">
            § 02 — The Laboratory Stage
          </span>
          <h2 className="vr-serif text-3xl sm:text-4xl text-[var(--color-calcaire)] m-0 font-normal">
            {activeFragrance.title} —{" "}
            <em className="text-[var(--color-gilt)] not-italic font-normal">
              {activeFragrance.subtitle}
            </em>
          </h2>
        </div>

        <FragranceSwitch
          activeSlug={fragranceSlug}
          onSelect={setFragranceSlug}
        />
      </div>

      {/* Main Body: Flacon + Pyramid */}
      <div
        id="drydown-panel"
        role="tabpanel"
        aria-labelledby={`drydown-tab-${fragranceSlug}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto"
      >
        {/* Left Column: Architectural Flacon */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
          <Flacon levels={levels} height={380} />
          <p className="vr-mono text-[11px] text-[var(--color-veil)] opacity-90 mt-4 text-center">
            {activeFragrance.editionStamp} · {activeFragrance.macerationMonths} mo. oak
          </p>
        </div>

        {/* Right Column: Note Pyramid status */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <NotePyramid notes={activeFragrance.notes} hour={hour} />
        </div>
      </div>

      {/* Bottom: Draggable Scrubber */}
      <div className="pt-6 border-t border-[color-mix(in_srgb,var(--color-calcaire)_20%,transparent)] mt-6">
        <Scrubber
          hour={hour}
          dominantTierName={dominantTier.toUpperCase()}
          onHourChange={setHour}
        />
      </div>
    </div>
  );
}

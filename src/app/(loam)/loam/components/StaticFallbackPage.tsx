/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  CHAPTERS,
  DEFAULT_SUNLIGHT,
  MATERIAL_CALLOUT_LABELS,
  computeSunlightState,
} from '../logic/chapters';
import { OBJECT_PART_PINS } from '../logic/holdInspectLogic';
import { SampleKitForm } from './SampleKitForm';

interface StaticFallbackPageProps {
  sunlight?: number;
  }

/**
 * Static specimen sheet fallback experience rendered on the server.
 * Visible before JavaScript runs, with JavaScript disabled, when prefers-reduced-motion: reduce
 * is active, or if WebGL is unsupported/fails.
 *
 * Contains all 6 chapters' copy, product facts, the 8 reference photos as specimen plates,
 * the sunlight / time-of-day control, and the sample kit form.
 */
export const StaticFallbackPage: React.FC<StaticFallbackPageProps> = ({
  sunlight = DEFAULT_SUNLIGHT,
  }) => {
  const sunState = computeSunlightState(sunlight);

  return (
    <div
      className="min-h-screen px-6 py-10 transition-colors duration-200 sm:px-12"
      style={{
        backgroundColor: 'var(--page-bg, #080604)',
        color: 'var(--text-contrast, #f0e8d8)',
        backgroundImage:
          'radial-gradient(ellipse 75% 40% at 50% 0%, var(--sky-ambient, rgba(247, 231, 206, 0.14)) 0%, transparent 70%)',
      }}
    >
      <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-b border-[#f0e8d8]/15 pb-6">
        <span className="font-serif-display text-2xl font-normal tracking-[0.22em]">
          LOAM
        </span>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 border-b border-[#f0e8d8]/25 pb-1">
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 text-[#ff9b54]/80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M13.2 10.1A5.5 5.5 0 0 1 5.9 2.8a5.5 5.5 0 1 0 7.3 7.3z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue={sunlight}
              readOnly
              aria-label="Sunlight and time of day"
              className="loam-sun-slider w-24 sm:w-28"
            />
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 text-[#f4f8fb]/85"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" />
            </svg>
            <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] opacity-80">
              {sunState.timeLabel}
            </span>
          </div>

          <span className="font-mono-label text-xs uppercase tracking-[0.18em] opacity-65">
            Grown, not made.
          </span>
        </div>
      </header>

      <main className="mx-auto mt-12 max-w-5xl space-y-20">
        {CHAPTERS.map((ch) => (
          <section
            key={ch.numberLabel}
            data-chapter={ch.numberLabel}
            className="grid grid-cols-1 gap-8 border-b border-[#f0e8d8]/10 pb-14 md:grid-cols-12 md:items-center"
          >
            <div className="md:col-span-6 space-y-3">
              <div className="font-mono-label text-xs uppercase tracking-[0.2em] text-[#c8e64c]">
                {ch.markerLabel}
              </div>
              {ch.headline && (
                <h1 className="font-serif-display text-5xl font-normal text-[#f0e8d8]">
                  {ch.headline}
                </h1>
              )}
              <p className="font-serif-display text-3xl leading-snug opacity-90">
                {ch.copy}
              </p>

              {ch.specimenNote && (
                <p className="font-serif-display text-sm italic opacity-60">
                  {ch.specimenNote}
                </p>
              )}

              {ch.index === 4 && (
                <div className="pt-3 font-mono-label text-xs uppercase tracking-[0.14em] text-[#c8e64c]/90">
                  {MATERIAL_CALLOUT_LABELS.join(' · ')}
                </div>
              )}

              {ch.inspectableObject && (
                <div className="pt-2 font-serif-display text-sm italic opacity-70">
                  Specimen anatomy:{' '}
                  {OBJECT_PART_PINS[ch.inspectableObject]
                    .map((p) => p.label)
                    .join(' · ')}
                </div>
              )}
            </div>

            <div className="md:col-span-6">
              {ch.index === 0 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/mushroom-front.webp"
                      alt="Macrolepiota procera parasol mushroom specimen (front view)"
                      width={600}
                      height={600}
                      loading="eager"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/mushroom-side.webp"
                      alt="Parasol mushroom showing radial symmetry (side view)"
                      width={600}
                      height={600}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 01 — Fruiting body profile & radial symmetry
                  </figcaption>
                </figure>
              )}
              {ch.index === 1 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/mushroom-from-below.webp"
                      alt="Underside radiating white gills of the parasol mushroom"
                      width={600}
                      height={600}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/mushroom-from-above.webp"
                      alt="Cap scale pattern and dark central umbo from above"
                      width={600}
                      height={600}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 02 — Lamellae hymenophore and concentric cap scales
                  </figcaption>
                </figure>
              )}
              {ch.index === 2 && (
                <div className="rounded border border-[#f0e8d8]/10 bg-[#080604]/60 p-6 text-sm font-sans-body leading-relaxed opacity-85">
                  <p className="font-serif-display text-lg italic text-[#f0e8d8]">
                    Subterranean soil horizons
                  </p>
                  <p className="mt-2 text-xs opacity-75">
                    Leaf litter (0.0 to -0.42m) &rarr; Moist crumbly humus (-0.42 to -1.12m) &rarr; Mineral topsoil (-1.12 to -1.92m) &rarr; Dense clay subsoil (-1.92 to -4.40m).
                  </p>
                </div>
              )}
              {ch.index === 3 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/mycelium-clump-front.webp"
                      alt="Mycelium clump with cream rhizomorph cords and cottony hyphae"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/mycelium-clump-back.webp"
                      alt="Rear view of colonized humus and wood-chip substrate"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 03 — Vegetative mycelium cord mass and colonized substrate
                  </figcaption>
                </figure>
              )}
              {ch.index === 4 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/material-top.webp"
                      alt="Molded mycelium packaging tray with recessed cavity"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/material-underside-and-cut-edge.webp"
                      alt="Molded tray underside showing fibrous cut corner"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 04 — Grown packaging tray and exposed fibrous core
                  </figcaption>
                </figure>
              )}
              {ch.index === 5 && <SampleKitForm idPrefix="fallback-" />}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

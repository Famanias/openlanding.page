"use client";

import type { Fragrance } from "../content/fragrances";
import { Picture } from "../assets";
import { DryDownStrip } from "../drydown/DryDownStrip";
import { useClock } from "../drydown/ClockProvider";

export function FragranceCard({ fragrance }: { fragrance: Fragrance }) {
  const { hour, setFragranceSlug } = useClock();

  return (
    <article className="vr-card group">
      <div>
        {/* Flacon Image / Picture Frame */}
        <div className="relative mb-6 overflow-hidden border border-[var(--rule-color)] bg-[var(--color-veil)] aspect-[3/4] rounded-xl">
          <Picture
            assetKey={fragrance.assetKey}
            alt={`Maison Vérane ${fragrance.title} flacon`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute top-3 left-3">
            <span className="vr-stamp bg-[color-mix(in_srgb,var(--color-calcaire)_85%,transparent)] backdrop-blur-sm">
              {fragrance.number}
            </span>
          </div>
        </div>

        {/* Header and classification */}
        <div className="flex justify-between items-baseline mb-2">
          <span className="vr-mono text-xs text-[var(--color-ash)]">
            {fragrance.emphasis}
          </span>
          <span className="vr-mono text-[11px] opacity-90 text-[var(--color-ash)]">
            {fragrance.macerationMonths} mo. oak
          </span>
        </div>

        <h3 className="vr-serif text-2xl sm:text-3xl font-normal text-[var(--color-oud)] mb-1">
          {fragrance.title}
        </h3>

        <p className="vr-serif text-sm italic text-[var(--color-ash)] mb-4">
          {fragrance.subtitle}
        </p>

        <p className="text-sm font-light leading-relaxed text-[var(--color-oud)] mb-6">
          {fragrance.description}
        </p>
      </div>

      <div>
        {/* Mini Dry-Down Strip responding to the current hour */}
        <div className="p-3 bg-[var(--color-veil)] border border-[color-mix(in_srgb,var(--color-ash)_20%,transparent)] mb-4 rounded-xl">
          <DryDownStrip notes={fragrance.notes} hour={hour} />
        </div>

        {/* Footer info & CTA */}
        <div className="pt-4 border-t border-[var(--rule-color)] flex items-center justify-between">
          <span className="vr-mono text-[10px] opacity-90 text-[var(--color-ash)]">
            {fragrance.editionStamp}
          </span>

          <a
            href="#drydown"
            onClick={() => setFragranceSlug(fragrance.slug)}
            className="vr-mono text-xs text-[var(--color-orris)] font-semibold hover:underline"
          >
            Inspect Clock →
          </a>
        </div>
      </div>
    </article>
  );
}

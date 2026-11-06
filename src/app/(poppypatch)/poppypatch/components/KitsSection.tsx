import React, { useState } from 'react';
import { MushroomKit } from '../data/poppyPatchData';
import { SparkleStar, BotanicalSprig } from './DoodleSvg';
import { Check, Plus, Eye } from 'lucide-react';

interface KitsSectionProps {
  kits: MushroomKit[];
  onAddToBag: (kit: MushroomKit) => void;
  onSelectKitDetails: (kit: MushroomKit) => void;
}

export function KitsSection({
  kits,
  onAddToBag,
  onSelectKitDetails
}: KitsSectionProps) {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleAdd = (kit: MushroomKit) => {
    onAddToBag(kit);
    setRecentlyAddedId(kit.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === kit.id ? null : prev));
    }, 1400);
  };

  return (
    <section
      id="our-kits"
      aria-labelledby="kits-heading"
      className="py-16 sm:py-24 relative"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
              CURATED STARTER PATCHES
            </p>
            <h2
              id="kits-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Meet the kits made for curious kitchen counters.
            </h2>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[#5E4137] max-w-[42ch] leading-relaxed">
            Every box arrives pre-colonized on clean hardwood sawdust with a handheld fine mister and our illustrated field guide. Just pop the window and spritz with tap water.
          </p>
        </div>

        {/* 3-Column Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9 items-stretch">
          {kits.map((kit, index) => {
            const isAdded = recentlyAddedId === kit.id;

            return (
              <article
                key={kit.id}
                style={{ backgroundColor: kit.cardBg }}
                className="group card-papier relative flex flex-col justify-between p-6 sm:p-7 border border-[#4A2E25]/15"
              >
                {/* Top Postage Stamp Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#5E4137]">
                      0{index + 1} · {kit.tag}
                    </span>
                    <span className="postage-stamp px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#4A2E25] rounded">
                      {kit.badgeText}
                    </span>
                  </div>

                  {/* Product Cutout Showcase with Hover Lift & 2D Tilt */}
                  <div className="relative w-full aspect-[4/3] mb-6 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/10 flex items-center justify-center p-2.5 overflow-hidden">
                    <BotanicalSprig className="w-10 h-14 absolute -bottom-2 -right-1 opacity-40 transition-transform duration-300 group-hover:rotate-6 origin-bottom" />
                    <img
                      src={kit.image}
                      alt={`${kit.name} — ${kit.subtitle}`}
                      width={676}
                      height={640}
                      referrerPolicy="no-referrer"
                      className="w-[92%] h-[94%] object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:-rotate-1 drop-shadow-[0_12px_16px_rgba(124,88,66,0.18)]"
                    />
                  </div>

                  {/* Clean Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#69493E] mb-2">
                    <span>{kit.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span>{kit.typicalDays}</span>
                    <span aria-hidden="true">·</span>
                    <span>{kit.flushes}</span>
                  </div>

                  {/* Title & Tabular Price */}
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-serif-display font-bold text-2xl sm:text-[26px] text-[#4A2E25] leading-tight">
                      {kit.name}
                    </h3>
                    <span className="font-serif-display font-bold text-2xl text-[#4A2E25] tabular-nums shrink-0">
                      ${kit.price}
                    </span>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7A5447] mb-3">
                    {kit.subtitle}
                  </p>

                  <p className="text-[15px] text-[#4A2E25]/90 leading-relaxed mb-4">
                    {kit.shortDescription}
                  </p>

                  {/* Culinary & Countertop Notes */}
                  <div className="pt-3 pb-5 border-t border-[#4A2E25]/12 space-y-1.5 text-xs text-[#563A32]">
                    <p>
                      <strong className="font-semibold text-[#4A2E25]">Kitchen notes:</strong>{' '}
                      {kit.flavorNotes}
                    </p>
                    <p>
                      <strong className="font-semibold text-[#4A2E25]">Happy spot:</strong>{' '}
                      {kit.idealSpot}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleAdd(kit)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25] ${
                      isAdded
                        ? 'bg-[#A8B96C] text-[#2F3B12] shadow-[0_3px_0_#7A8B43]'
                        : 'bg-[#4A2E25] hover:bg-[#3A221A] text-[#FAF3E3] shadow-[0_3px_0_#261510] active:translate-y-0.5'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Add to Bag · ${kit.price}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectKitDetails(kit)}
                    aria-label={`View full details for ${kit.name}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-[#FAF3E3] hover:bg-[#F3E5CA] text-[#4A2E25] border border-[#4A2E25]/25 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25]"
                  >
                    <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>View Details</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Realistic Expectation Footnote */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-[#FAF3E3]/85 border border-[#4A2E25]/12 text-xs sm:text-sm text-[#5E4137]">
          <p className="inline-flex items-center gap-2">
            <SparkleStar className="w-4 h-4 shrink-0 text-[#4A2E25]" />
            <span>
              <strong className="text-[#4A2E25]">A note on living kits:</strong> Every block is a real biological garden. Typical first-flush timing (10–14 days) and yield naturally vary with your room’s humidity, temperature, and airflow.
            </span>
          </p>
          <span className="font-semibold text-[#4A2E25] whitespace-nowrap">
            Free shipping on orders $55+
          </span>
        </div>
      </div>
    </section>
  );
}

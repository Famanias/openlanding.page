import React, { useState } from 'react';
import { COLLECTION_ITEMS, CollectionItem } from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { PointedSealOrnament, SectionHandoffRule } from './MortaMark';

interface CollectionSectionProps {
  onSelectForCommission: (pieceReference: string) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectForCommission,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCommissionClick = (item: CollectionItem) => {
    onSelectForCommission(`${item.number} — ${item.name} (${item.category})`);
    const commissionEl = document.getElementById('commissions');
    if (commissionEl) {
      commissionEl.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="relative morta-atmosphere border-b border-white/20"
    >
      <SectionHandoffRule chapterNumber="CH. III" chapterLabel="The Collection" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-28">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70 mb-4">
              ARCHIVE EDITIONS · OBJECTS 01 — 03
            </p>
            <h2
              id="collection-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.06]"
              style={{ textWrap: 'balance' }}
            >
              Three forms cast around
              <br />
              quiet space.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/75 max-w-md leading-relaxed">
            Three editions in solid 925 silver, finished by hand.
          </p>
        </div>

        {/* 3-Column Editorial Product Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {COLLECTION_ITEMS.map((item) => {
            const isExpanded = expandedId === item.id;
            const panelId = `collection-dossier-${item.id}`;

            return (
              <article
                key={item.id}
                aria-labelledby={`product-title-${item.id}`}
                className="group flex flex-col justify-between border border-white/25 bg-black hover:border-white focus-within:border-white transition-colors"
              >
                <div>
                  {/* Card Top Catalogue Bar */}
                  <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-white">
                      <span className="tabular-nums font-medium tracking-[0.2em]">
                        {item.number}
                      </span>
                      <span className="text-white/40" aria-hidden="true">
                        /
                      </span>
                      <span className="uppercase tracking-[0.18em] text-white/80">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-white/65 tracking-[0.14em] uppercase">
                      {item.editionNote}
                    </span>
                  </div>

                  {/* Product Monochrome Plate */}
                  <div className="relative border-b border-white/20 overflow-hidden bg-black">
                    <MortaImage
                      asset={item.asset}
                      priority={false}
                      className="w-full"
                      imgClassName="group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>

                  {/* Essential Information (Always visible on desktop, touch, and keyboard) */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        id={`product-title-${item.id}`}
                        className="font-display text-3xl sm:text-4xl font-normal text-white tracking-tight"
                      >
                        {item.name}
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/70 whitespace-nowrap">
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Unboxed clean metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/70 tabular-nums">
                      <span>{item.material}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.weight}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.dimensions}</span>
                    </div>

                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Expandable Structural Notes (Accessible Disclosure) */}
                    {isExpanded && (
                      <div
                        id={panelId}
                        className="pt-5 mt-5 border-t border-white/20 space-y-3 text-sm text-white/80"
                      >
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60 mb-1">
                            Architectural Note
                          </p>
                          <p className="leading-relaxed">
                            {item.architecturalNote}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60 mb-1">
                            Bench Finishing
                          </p>
                          <p className="leading-relaxed">{item.craftDetail}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions: In-Page Exploration & Commission Selection (No Dead Links) */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-white/15 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
                  <button
                    type="button"
                    onClick={() => toggleDetails(item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className="min-w-0 flex-1 px-4 py-3 text-xs font-mono uppercase tracking-[0.16em] text-white border border-white/35 hover:border-white active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors text-center"
                  >
                    {isExpanded
                      ? `Hide ${item.name} notes`
                      : `Inspect ${item.name} notes`}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCommissionClick(item)}
                    className="min-w-0 flex-1 px-4 py-3 text-xs font-mono uppercase tracking-[0.16em] bg-white text-black border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors text-center"
                  >
                    Inquire for {item.name}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Collection Footnote */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/70">
          <div className="flex items-center gap-3">
            <PointedSealOrnament className="w-3.5 h-5 text-white/70" />
            <span>
              ALL PIECES STAMPED WITH THE MORTA POINTED SEAL &amp; 925 FINENESS MARK
            </span>
          </div>
          <a
            href="#commissions"
            className="underline underline-offset-4 text-white hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white whitespace-nowrap"
          >
            Request custom sizing or bespoke variation →
          </a>
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { ProductModel, US_SHOE_SIZES } from '../data/catalog';

interface CollectionSectionProps {
  models: ProductModel[];
  selectedSizes: Record<string, number>;
  onSelectSize: (modelId: string, size: number) => void;
  onAddToBag: (model: ProductModel, size: number) => void;
  onOpenQuickView: (model: ProductModel) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  models,
  selectedSizes,
  onSelectSize,
  onAddToBag,
  onOpenQuickView
}) => {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleAddClick = (model: ProductModel) => {
    const chosenSize = selectedSizes[model.id] ?? 10.0;
    onAddToBag(model, chosenSize);
    setRecentlyAddedId(model.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === model.id ? null : prev));
    }, 1200);
  };

  return (
    <section
      id="footwear"
      aria-labelledby="collection-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-2">
              01. LAUNCH ARCHIVE · THREE CONFIGURATIONS
            </div>
            <h2
              id="collection-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] tracking-[-0.01em] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              THE RL-01 COLLECTION
            </h2>
          </div>
          <p className="text-[#777A7A] text-sm sm:text-base max-w-md leading-relaxed">
            Three sculpted finishes built on the identical hollow-chamber propulsion platform. Select your US size directly on any colorway or inspect full chassis geometry.
          </p>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model, index) => {
            const currentSize = selectedSizes[model.id] ?? 10.0;
            const isAdded = recentlyAddedId === model.id;

            return (
              <article
                key={model.id}
                data-testid={`product-card-${model.id}`}
                className="group relative bg-[#111210] border border-[#F1F0E9]/15 hover:border-[#D3FF35]/70 transition-colors duration-200 flex flex-col justify-between"
              >
                {/* Top Card Header Bar */}
                <div className="p-6 pb-0 flex items-center justify-between gap-4">
                  <span className="font-mono-tech text-xs tracking-[0.14em] text-[#777A7A] uppercase">
                    0{index + 1} · {model.code}
                  </span>
                  <span className="font-mono-tech text-xs tracking-[0.08em] text-[#F1F0E9]/70">
                    {model.weightGrams}G · {model.dropMm}MM DROP
                  </span>
                </div>

                {/* Product Image Stage (65-70% visual dominance) */}
                <div className="relative h-64 sm:h-72 px-6 py-4 flex items-center justify-center overflow-hidden bg-blueprint-grid my-2">
                  {/* Subtle Diagonal Accent Line */}
                  <div
                    aria-hidden="true"
                    style={{ backgroundColor: model.accentHex }}
                    className="pointer-events-none absolute w-48 h-[2px] -rotate-28 opacity-35 group-hover:opacity-80 group-hover:w-64 transition-all duration-300"
                  />

                  <img
                    src={model.heroImage}
                    alt={model.altText}
                    width={640}
                    height={500}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-[88%] max-h-60 object-contain transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                  />

                  <button
                    type="button"
                    onClick={() => onOpenQuickView(model)}
                    aria-label={`Quick view specifications for ${model.name}`}
                    className="absolute bottom-3 right-4 z-20 inline-flex items-center gap-1.5 bg-[#0B0B0A]/90 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] hover:text-[#D3FF35] px-3 py-1.5 font-mono-tech text-[11px] tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>QUICK SPEC</span>
                  </button>
                </div>

                {/* Product Metadata & Interactive Size Matrix */}
                <div className="p-6 pt-4 flex-1 flex flex-col justify-between border-t border-[#F1F0E9]/10">
                  <div>
                    {/* Quiet 1-line unboxed kicker */}
                    <div className="text-xs text-[#777A7A] mb-1.5 flex items-center gap-2">
                      <span>{model.colorway}</span>
                    </div>

                    {/* Title & Tabular Price */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-display italic font-black text-3xl tracking-tight text-[#F1F0E9] uppercase group-hover:text-[#D3FF35] transition-colors">
                        {model.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-mono-tech text-xl font-bold text-[#F1F0E9]">
                          ${model.price}
                        </span>
                        <span className="block font-mono-tech text-[10px] text-[#777A7A] uppercase">
                          DEMO USD
                        </span>
                      </div>
                    </div>

                    <p className="text-[#F1F0E9]/75 text-sm leading-relaxed mb-5">
                      {model.tagline}
                    </p>

                    {/* Interactive Size Selector Chips */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono-tech text-[11px] tracking-[0.1em] text-[#777A7A] uppercase">
                          SELECT SIZE (US)
                        </span>
                        <span
                          data-testid={`selected-size-${model.id}`}
                          className="font-mono-tech text-[11px] font-semibold text-[#D3FF35]"
                        >
                          US {currentSize.toFixed(1)} SELECTED
                        </span>
                      </div>

                      <div
                        role="group"
                        aria-label={`Select US shoe size for ${model.name}`}
                        className="grid grid-cols-6 gap-1.5"
                      >
                        {US_SHOE_SIZES.map((size) => {
                          const available = model.availableSizes.includes(size);
                          const selected = currentSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              disabled={!available}
                              onClick={() => onSelectSize(model.id, size)}
                              aria-pressed={selected}
                              aria-label={`${model.name} size US ${size.toFixed(1)}`}
                              className={`h-9 font-mono-tech text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                selected
                                  ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold border border-[#D3FF35]'
                                  : available
                                  ? 'bg-[#0B0B0A] text-[#F1F0E9] border border-[#F1F0E9]/20 hover:border-[#F1F0E9]/60'
                                  : 'bg-[#0B0B0A]/40 text-[#777A7A]/40 border border-[#F1F0E9]/5 cursor-not-allowed line-through'
                              }`}
                            >
                              {size.toFixed(1)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Row */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddClick(model)}
                      className={`flex-1 h-12 px-5 font-display italic font-black text-base tracking-[0.08em] uppercase flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'bg-[#375CFF] text-[#F1F0E9]'
                          : 'bg-[#F1F0E9] hover:bg-[#D3FF35] text-[#0B0B0A]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED TO BAG · US {currentSize.toFixed(1)}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>ADD TO BAG · US {currentSize.toFixed(1)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

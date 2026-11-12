'use client';

import React from 'react';
import { PRODUCE_CATALOG, ProduceCategory, ProduceId } from '../basket/model';
import { SafeImage } from './SafeImage';

interface HeroStallProps {
  activeCategory: ProduceCategory;
  onSelectCategory: (cat: ProduceCategory) => void;
  onAddProduce: (id: ProduceId) => void;
}

export const HeroStall: React.FC<HeroStallProps> = ({
  activeCategory,
  onSelectCategory,
  onAddProduce,
}) => {
  return (
    <section
      aria-label="Mesa Market flat-lay produce window display"
      className="max-w-[1440px] mx-auto border-b-2 border-[#24211D] px-4 sm:px-8 py-8 sm:py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Compact Left-Hand Category Rail (3 cols) */}
        <div className="lg:col-span-3 bg-[#F2C94D]/45 border-2 border-[#24211D] rounded-xl p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="mm-mono text-xs font-bold uppercase text-[#D94C32] tracking-wider">
              HARVEST WINDOW · STALL 089
            </div>
            <p className="text-xs text-[#24211D]/85 leading-relaxed">
              Click any harvest cutout in the stall window or filter the shelf below to build a sample seasonal crate.
            </p>

            <div className="space-y-1.5" role="group" aria-label="Category rail filter">
              {(
                [
                  { id: 'all', label: 'All Harvest (8)' },
                  { id: 'vegetables', label: 'Field Vegetables (5)' },
                  { id: 'fruit', label: 'Orchard Fruit (2)' },
                  { id: 'pantry', label: 'Bakehouse Pantry (1)' },
                ] as { id: ProduceCategory; label: string }[]
              ).map((cat) => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      document.getElementById('mm-shelf')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    aria-pressed={active}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg border-2 border-[#24211D] mm-mono text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#D94C32] text-[#FDF5E7]'
                        : 'bg-[#FDF5E7] text-[#24211D] hover:bg-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#24211D]/25 space-y-3">
            <button
              type="button"
              onClick={() =>
                document.getElementById('mm-shelf')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="w-full py-3 bg-[#D94C32] text-[#FDF5E7] mm-mono text-xs font-bold uppercase rounded-lg border-2 border-[#24211D] shadow-[3px_3px_0px_#24211D] hover:bg-[#b83b24] transition-colors cursor-pointer"
            >
              Fill your basket
            </button>
            <p className="mm-mono text-[11px] text-[#24211D]/75">
              Sample pricing & stock only — illustrative demonstration.
            </p>
          </div>
        </div>

        {/* Right Flat-Lay Stall Window with 8 Produce Cutouts Wrapping the Headline (9 cols) */}
        <div className="lg:col-span-9 bg-[#FDF5E7] border-2 border-[#24211D] rounded-xl p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between space-y-8">
          {/* Top Row of 4 Framed Produce Cutouts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {PRODUCE_CATALOG.slice(0, 4).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onAddProduce(item.id)}
                aria-label={`Add ${item.name} ($${item.samplePrice.toFixed(2)} sample) to basket`}
                className="mm-produce-cutout group flex flex-col items-center p-2 rounded-xl hover:bg-[#F2C94D]/25 cursor-pointer text-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 mm-cutout-disc flex items-center justify-center p-1.5">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    fallbackTint="transparent"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="-mt-2 relative z-10 px-2.5 py-0.5 bg-[#F2C94D] border-2 border-[#24211D] rounded-full mm-mono text-[11px] font-bold text-[#24211D] group-hover:bg-[#D94C32] group-hover:text-white transition-colors">
                  + {item.name.split(' ')[0]} · ${item.samplePrice.toFixed(2)}
                </span>
              </button>
            ))}
          </div>

          {/* Center Poster Headline Wrapped Between the Cutouts */}
          <div className="text-center max-w-2xl mx-auto py-2 space-y-3">
            <div className="inline-block px-3 py-1 bg-[#3F7047] text-[#FDF5E7] mm-mono text-xs font-bold rounded-full">
              CAPAY & SONOMA HARVEST CRATE · ILLUSTRATIVE DEMO
            </div>
            <h2
              className="mm-display font-extrabold text-[#24211D] leading-[0.98]"
              style={{ fontSize: 'clamp(2.5rem, 4.8vw, 4.4rem)', textWrap: 'balance' }}
            >
              Good things come into season.
            </h2>
            <p className="text-sm sm:text-base text-[#24211D]/80">
              Tap any produce sticker in the window or browse the shelf below to assemble a sample farm-to-door box.
            </p>
          </div>

          {/* Bottom Row of 4 Framed Produce Cutouts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {PRODUCE_CATALOG.slice(4, 8).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onAddProduce(item.id)}
                aria-label={`Add ${item.name} ($${item.samplePrice.toFixed(2)} sample) to basket`}
                className="mm-produce-cutout group flex flex-col items-center p-2 rounded-xl hover:bg-[#F2C94D]/25 cursor-pointer text-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 mm-cutout-disc flex items-center justify-center p-1.5">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    fallbackTint="transparent"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="-mt-2 relative z-10 px-2.5 py-0.5 bg-[#F2C94D] border-2 border-[#24211D] rounded-full mm-mono text-[11px] font-bold text-[#24211D] group-hover:bg-[#D94C32] group-hover:text-white transition-colors">
                  + {item.name.split(' ')[0]} · ${item.samplePrice.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

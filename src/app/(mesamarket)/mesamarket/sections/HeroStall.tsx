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
      {/* Centered Flat-Lay Stall Window with 8 Produce Cutouts Wrapping the Headline */}
      <div className="w-full max-w-5xl mx-auto p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between space-y-8">
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
    </section>
  );
};

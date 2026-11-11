'use client';

import React from 'react';
import { MEAL_KIT_PRESETS, PRODUCE_CATALOG, MESA_MARKET_ASSETS } from '../basket/model';
import { SafeImage } from './SafeImage';

interface MealKitsProps {
  onAddKit: (kitId: string) => void;
}

export const MealKits: React.FC<MealKitsProps> = ({ onAddKit }) => {
  return (
    <section
      id="mm-kits"
      aria-labelledby="mm-kits-heading"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-20 border-b-2 border-[#24211D]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
        <div className="lg:col-span-7 space-y-2">
          <div className="mm-mono text-xs font-bold uppercase text-[#D94C32] tracking-wider">
            02 · SEASONAL RECIPE CRATES
          </div>
          <h2 id="mm-kits-heading" className="mm-display font-extrabold text-3xl sm:text-5xl">
            Add a whole recipe’s harvest in one tap
          </h2>
        </div>
        <div className="lg:col-span-5 aspect-[3/2] rounded-xl overflow-hidden border-2 border-[#24211D] shadow-[4px_4px_0px_#24211D]">
          <SafeImage
            src={MESA_MARKET_ASSETS.kitchenEditorial}
            alt="Sunlit kitchen table spread with fresh Mesa Market produce and sourdough"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MEAL_KIT_PRESETS.map((kit) => (
          <article
            key={kit.id}
            className="bg-[#F2C94D]/35 border-2 border-[#24211D] rounded-xl p-6 flex flex-col justify-between space-y-5 shadow-[3px_3px_0px_#24211D]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between mm-mono text-xs font-bold text-[#494D78]">
                <span>{kit.tag}</span>
                <span>{kit.prepTime}</span>
              </div>
              <h3 className="mm-display font-bold text-2xl text-[#24211D]">{kit.name}</h3>
              <p className="text-xs text-[#24211D]/80 leading-relaxed">{kit.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {kit.items.map((entry) => {
                  const prod = PRODUCE_CATALOG.find((p) => p.id === entry.productId);
                  return (
                    <span
                      key={entry.productId}
                      className="px-2 py-0.5 bg-[#FDF5E7] border border-[#24211D] rounded mm-mono text-[11px] font-bold"
                    >
                      {entry.qty}× {prod?.name.split(' ')[0]}
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAddKit(kit.id)}
              className="w-full py-3 bg-[#3F7047] text-[#FDF5E7] border-2 border-[#24211D] rounded-lg mm-mono text-xs font-bold uppercase hover:bg-[#315938] transition-colors cursor-pointer shadow-[2px_2px_0px_#24211D]"
            >
              Add ingredients ({kit.items.length} items)
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

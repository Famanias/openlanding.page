'use client';

import React from 'react';
import {
  PRODUCE_CATALOG,
  ProduceCategory,
  ProduceId,
  BasketQuantities,
} from '../basket/model';
import { SafeImage } from './SafeImage';

interface ProduceShelfProps {
  activeCategory: ProduceCategory;
  onSelectCategory: (cat: ProduceCategory) => void;
  quantities: BasketQuantities;
  onAdd: (id: ProduceId) => void;
  onDecrement: (id: ProduceId) => void;
  justAddedId: string | null;
  lastAnnouncement: string;
}

export const ProduceShelf: React.FC<ProduceShelfProps> = ({
  activeCategory,
  onSelectCategory,
  quantities,
  onAdd,
  onDecrement,
  justAddedId,
  lastAnnouncement,
}) => {
  const filteredProducts = PRODUCE_CATALOG.filter((p) =>
    activeCategory === 'all' ? true : p.category === activeCategory
  );

  return (
    <section
      id="mm-shelf"
      aria-labelledby="mm-shelf-heading"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-20 border-b-2 border-[#24211D]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="mm-mono text-xs font-bold uppercase text-[#3F7047] tracking-wider">
            01 · INTERACTIVE PRODUCE SHELF (SAMPLE PRICING)
          </div>
          <h2 id="mm-shelf-heading" className="mm-display font-extrabold text-3xl sm:text-5xl mt-1">
            Hand-arranged harvest shelf
          </h2>
        </div>

        {/* Accessible Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Produce category filter"
          className="inline-flex flex-wrap gap-1.5 p-1.5 bg-[#F2C94D]/45 border-2 border-[#24211D] rounded-xl"
        >
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'vegetables', label: 'Vegetables' },
              { id: 'fruit', label: 'Fruit' },
              { id: 'pantry', label: 'Pantry' },
            ] as { id: ProduceCategory; label: string }[]
          ).map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 mm-mono text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#24211D] text-[#FDF5E7]'
                    : 'text-[#24211D] hover:bg-[#FDF5E7]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Status Announcement */}
      <div aria-live="polite" className="sr-only">
        {lastAnnouncement}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const inBasketQty = quantities[product.id] || 0;
          const isMax = inBasketQty >= product.maxQty;
          const pulsed = justAddedId === product.id;

          return (
            <article
              key={product.id}
              className={`bg-[#FDF5E7] border-2 border-[#24211D] rounded-xl p-5 flex flex-col justify-between space-y-4 transition-transform shadow-[3px_3px_0px_#24211D] ${
                pulsed ? 'scale-[1.02] ring-2 ring-[#D94C32]' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 bg-[#F2C94D] border border-[#24211D] rounded-full mm-mono text-xs font-bold">
                    ${product.samplePrice.toFixed(2)} · {product.unit}
                  </span>
                  {inBasketQty > 0 && (
                    <span className="px-2 py-0.5 bg-[#3F7047] text-[#FDF5E7] rounded-full mm-mono text-[11px] font-bold">
                      In Basket: {inBasketQty}
                    </span>
                  )}
                </div>

                <div className="h-40 flex items-center justify-center p-2">
                  <div className="w-32 h-32 mm-cutout-disc flex items-center justify-center p-1.5 mm-produce-cutout">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fallbackTint="transparent"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="mm-mono text-[11px] text-[#494D78] font-bold uppercase tracking-wider">
                    {product.originDescriptor}
                  </div>
                  <h3 className="mm-display font-bold text-xl text-[#24211D]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#24211D]/80 leading-relaxed">
                    {product.seasonalNote}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#24211D]/15 flex items-center justify-between gap-2">
                {inBasketQty > 0 ? (
                  <div className="flex items-center gap-2 w-full justify-between">
                    <button
                      type="button"
                      onClick={() => onDecrement(product.id)}
                      aria-label={`Decrease quantity of ${product.name}`}
                      className="px-3 py-2 bg-[#FDF5E7] border-2 border-[#24211D] rounded-lg mm-mono text-xs font-bold hover:bg-[#F2C94D] transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="mm-mono text-xs font-bold">
                      {inBasketQty} in crate
                    </span>
                    <button
                      type="button"
                      disabled={isMax}
                      onClick={() => onAdd(product.id)}
                      aria-label={`Increase quantity of ${product.name}`}
                      className="px-3 py-2 bg-[#D94C32] text-[#FDF5E7] border-2 border-[#24211D] rounded-lg mm-mono text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAdd(product.id)}
                    className="w-full py-2.5 bg-[#D94C32] text-[#FDF5E7] border-2 border-[#24211D] rounded-lg mm-mono text-xs font-bold uppercase hover:bg-[#b83b24] transition-colors cursor-pointer shadow-[2px_2px_0px_#24211D]"
                  >
                    Add to Basket · ${product.samplePrice.toFixed(2)}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

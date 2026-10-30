import React, { useState } from 'react';
import {
  ColorwayOption,
  CurrencyCode,
  ProductSpec,
  SizeOption,
} from '../data/products';
import { formatPrice, getVariantSku } from '../utils/storeLogic';

interface ProductCardProps {
  product: ProductSpec;
  currency: CurrencyCode;
  selectedSize: SizeOption;
  onSelectSize: (productId: number, size: SizeOption) => void;
  onAddToCart: (
    product: ProductSpec,
    size: SizeOption,
    colorway: ColorwayOption
  ) => void;
}

const SIZES: SizeOption[] = ['S', 'M', 'L', 'XL'];
const COLORWAYS: { name: ColorwayOption; dotColor: string; filterClass: string }[] = [
  {
    name: 'STEALTH BLACK',
    dotColor: '#090B0E',
    filterClass: 'swatch-stealth-black',
  },
  {
    name: 'OXIDE SLATE',
    dotColor: '#475569',
    filterClass: 'swatch-oxide-slate',
  },
  {
    name: 'NEON NOIR',
    dotColor: '#FF007F',
    filterClass: 'swatch-neon-noir',
  },
];

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  selectedSize,
  onSelectSize,
  onAddToCart,
}) => {
  const [colorway, setColorway] = useState<ColorwayOption>('STEALTH BLACK');
  const [imageFailed, setImageFailed] = useState(false);

  const currentSwatch =
    COLORWAYS.find((c) => c.name === colorway) || COLORWAYS[0];
  const variantSku = getVariantSku(product.code, colorway, selectedSize);
  const unitsLeft = product.stockBySize[selectedSize];

  return (
    <article
      data-testid={`product-card-${product.code}`}
      className="relative bg-[#090B0E] border border-[rgba(226,232,240,0.14)] flex flex-col justify-between group hover:border-[#00F0FF]/60 transition-colors"
    >
      {/* Corner Crosshair Registration Marks */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-2 z-20 font-mono-tech text-[10px] text-[#94A3B8]/50 select-none pointer-events-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-1.5 right-2 z-20 font-mono-tech text-[10px] text-[#94A3B8]/50 select-none pointer-events-none"
      >
        +
      </span>

      <div>
        {/* Top Meta Strip */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2 border-b border-[rgba(226,232,240,0.14)] font-mono-tech text-xs">
          <span className="text-[#00F0FF] font-bold tracking-wider">{variantSku}</span>
          <span className="text-[#94A3B8] uppercase">{product.category}</span>
        </div>

        {/* 4:5 Portrait Studio Image Container with CAD Wireframe Fallback */}
        <div className="relative aspect-[4/5] w-full bg-[#11161D] overflow-hidden border-b border-[rgba(226,232,240,0.14)]">
          {!imageFailed ? (
            <img
              src={product.image}
              alt={`${product.code} ${product.title}`}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className={`w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03] ${currentSwatch.filterClass}`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#11161D] font-mono-tech">
              <svg
                className="w-24 h-24 text-[#00F0FF]/50 mb-3"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <rect x="12" y="12" width="76" height="76" strokeDasharray="4 2" />
                <line x1="12" y1="12" x2="88" y2="88" />
                <line x1="88" y1="12" x2="12" y2="88" />
                <circle cx="50" cy="50" r="22" />
              </svg>
              <span className="text-xs text-[#00F0FF] font-bold">
                CAD WIREFRAME // {product.code}
              </span>
              <span className="text-[10px] text-[#94A3B8] mt-1">
                {product.fallbackImageName}
              </span>
            </div>
          )}

          {/* Subtle bottom spec strip overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#090B0E]/95 via-[#090B0E]/60 to-transparent px-4 py-2.5 flex items-center justify-between font-mono-tech text-[11px] text-[#F8FAFC]">
            <span>{product.waterproofLabel}</span>
            <span className="text-[#94A3B8]">/</span>
            <span>{product.breathabilityLabel}</span>
            <span className="text-[#94A3B8]">/</span>
            <span className="text-[#00F0FF]">{product.weightLabel}</span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-[#F8FAFC] leading-snug tracking-wide">
              {product.title}
            </h3>
            <span className="font-mono-tech text-base font-bold text-[#D4FF00] shrink-0">
              {formatPrice(product.priceUsd, currency)}
            </span>
          </div>

          <p className="text-xs text-[#94A3B8] line-clamp-1">{product.composition}</p>

          {/* Colorway Swatch Selector */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between font-mono-tech text-[11px]">
              <span className="text-[#94A3B8]">COLORWAY:</span>
              <span className="text-[#F8FAFC]">{colorway}</span>
            </div>
            <div
              role="group"
              aria-label={`Colorway for ${product.title}`}
              className="grid grid-cols-3 gap-1.5"
            >
              {COLORWAYS.map((c) => {
                const active = colorway === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColorway(c.name)}
                    className={`px-2 py-1 font-mono-tech text-[10px] border transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      active
                        ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#F8FAFC] font-bold'
                        : 'border-[rgba(226,232,240,0.14)] bg-[#11161D] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 border border-white/40 shrink-0"
                      style={{ backgroundColor: c.dotColor }}
                    />
                    <span className="truncate">{c.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick-Size Matrix: [S] [M] [L] [XL] */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between font-mono-tech text-[11px]">
              <span className="text-[#94A3B8]">SIZE MATRIX:</span>
              <span
                className={
                  unitsLeft <= 2 ? 'text-[#FF7A00] font-semibold' : 'text-[#00F0FF]'
                }
              >
                STATUS: {unitsLeft} UNITS LEFT IN SECTOR
              </span>
            </div>
            <div
              role="group"
              aria-label={`Size selection for ${product.title}`}
              className="grid grid-cols-4 gap-1.5"
            >
              {SIZES.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => onSelectSize(product.id, sz)}
                    aria-pressed={isSelected}
                    className={`py-1.5 font-mono-tech text-xs border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#00F0FF] text-[#090B0E] border-[#00F0FF] font-bold'
                        : 'bg-[#11161D] text-[#F8FAFC] border-[rgba(226,232,240,0.14)] hover:border-[#00F0FF]/50'
                    }`}
                  >
                    [{sz}]
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Mini Spec Telemetry Progress Bars */}
          <div className="space-y-1.5 pt-2 border-t border-[rgba(226,232,240,0.14)] font-mono-tech text-[10px]">
            <div className="space-y-0.5">
              <div className="flex justify-between text-[#94A3B8]">
                <span>WATERPROOF</span>
                <span className="text-[#F8FAFC]">{product.waterproofLabel}</span>
              </div>
              <div className="w-full h-1 bg-[#11161D] overflow-hidden">
                <div
                  className="h-full bg-[#00F0FF]"
                  style={{ width: `${product.waterproofBarPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[#94A3B8]">
                <span>BREATHABILITY</span>
                <span className="text-[#F8FAFC]">{product.breathabilityLabel}</span>
              </div>
              <div className="w-full h-1 bg-[#11161D] overflow-hidden">
                <div
                  className="h-full bg-[#D4FF00]"
                  style={{ width: `${product.breathabilityBarPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[#94A3B8]">
                <span>MASS INDEX</span>
                <span className="text-[#F8FAFC]">{product.weightLabel}</span>
              </div>
              <div className="w-full h-1 bg-[#11161D] overflow-hidden">
                <div
                  className="h-full bg-[#FF7A00]"
                  style={{ width: `${product.weightBarPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Loadout CTA */}
      <div className="p-4 pt-0">
        <button
          type="button"
          onClick={() => onAddToCart(product, selectedSize, colorway)}
          className="w-full chamfer-btn bg-[#11161D] hover:bg-[#00F0FF] text-[#F8FAFC] hover:text-[#090B0E] border border-[#00F0FF]/50 py-2.5 px-4 font-mono-tech text-xs font-bold tracking-wider transition-colors cursor-pointer whitespace-nowrap"
        >
          + ADD TO LOADOUT [{selectedSize}]
        </button>
      </div>
    </article>
  );
};

'use client';

import React from 'react';
import { BasketLineItem, MESA_MARKET_ASSETS } from '../basket/model';
import { SafeImage } from './SafeImage';

interface ReceiptSectionProps {
  lines: BasketLineItem[];
  totalCount: number;
  sampleSubtotal: number;
}

export const ReceiptSection: React.FC<ReceiptSectionProps> = ({
  lines,
  totalCount,
  sampleSubtotal,
}) => {
  return (
    <section
      id="mm-checkout"
      aria-labelledby="mm-checkout-heading"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6 space-y-4">
          <div className="mm-mono text-xs font-bold uppercase text-[#D94C32] tracking-wider">
            04 · SAMPLE ORDER RECEIPT (NO PAYMENT PROCESSING)
          </div>
          <h2 id="mm-checkout-heading" className="mm-display font-extrabold text-3xl sm:text-5xl">
            Review your sample harvest crate
          </h2>
          <p className="text-sm text-[#24211D]/80 leading-relaxed">
            This grocery receipt reflects your live basket selections above. All prices, origins, and stock counts are illustrative demonstrations.
          </p>
          <div className="aspect-[16/9] rounded-xl overflow-hidden border-2 border-[#24211D] shadow-[4px_4px_0px_#24211D]">
            <SafeImage
              src={MESA_MARKET_ASSETS.marketTable}
              alt="Mesa Market wooden harvest table overflowing with seasonal produce"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Printed Grocery Receipt Card */}
        <div className="lg:col-span-6 bg-white border-2 border-[#24211D] rounded-xl p-6 sm:p-8 shadow-[6px_6px_0px_#24211D] space-y-5">
          <div className="border-b-2 border-dashed border-[#24211D] pb-4 flex items-center justify-between">
            <div>
              <div className="mm-mono text-sm font-bold">MESA MARKET · CRATE RECEIPT</div>
              <div className="mm-mono text-[11px] text-[#24211D]/70">
                SAMPLE ORDER REVIEW ONLY — NO CHECKOUT OR CHARGE
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#F2C94D] border border-[#24211D] mm-mono text-xs font-bold rounded">
              {totalCount} ITEMS
            </span>
          </div>

          {lines.length === 0 ? (
            <p className="mm-mono text-xs text-center py-8 text-[#24211D]/70">
              Your sample basket is empty. Add items from the shelf or meal kits above!
            </p>
          ) : (
            <ul className="divide-y divide-dashed divide-[#24211D]/25 mm-mono text-xs">
              {lines.map((line) => (
                <li key={line.product.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold">
                      {line.qty}× {line.product.name}
                    </span>
                    <span className="block text-[11px] text-[#24211D]/65">
                      {line.product.unit} @ ${line.product.samplePrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="font-bold">${line.lineSubtotal.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t-2 border-[#24211D] pt-4 space-y-2 mm-mono text-sm">
            <div className="flex justify-between font-bold text-lg">
              <span>ILLUSTRATIVE SUBTOTAL</span>
              <span className="text-[#D94C32]">${sampleSubtotal.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#24211D]/70">
              Demonstration receipt only. No payment details are collected or processed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

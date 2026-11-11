'use client';

import React from 'react';
import { MESA_MARKET_ASSETS } from '../basket/model';
import { SafeImage } from './SafeImage';

export const ProducerRoute: React.FC = () => {
  return (
    <section
      id="mm-growers"
      aria-labelledby="mm-growers-heading"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-20 border-b-2 border-[#24211D] space-y-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#24211D] shadow-[4px_4px_0px_#24211D]">
          <SafeImage
            src={MESA_MARKET_ASSETS.growerPortrait}
            alt="Small-lot orchard and vegetable grower in field"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="mm-mono text-xs font-bold uppercase text-[#D94C32] tracking-wider">
            03 · FIELD TO CRATE COMIC STRIP & ROUTE
          </div>
          <h2 id="mm-growers-heading" className="mm-display font-extrabold text-3xl sm:text-5xl">
            Picked Tuesday morning, on your porch Wednesday noon
          </h2>

          {/* 3 Comic-Style Label Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FDF5E7] border-2 border-[#24211D] p-4 rounded-lg shadow-[3px_3px_0px_#24211D] space-y-1.5">
              <div className="mm-mono text-xs font-bold text-[#D94C32]">PANEL 01 · 06:30</div>
              <h3 className="font-bold text-base">Field Harvest</h3>
              <p className="text-xs text-[#24211D]/80 leading-relaxed">
                Row crops are cut before midday heat so greens stay crisp without hydro-cooling.
              </p>
            </div>
            <div className="bg-[#FDF5E7] border-2 border-[#24211D] p-4 rounded-lg shadow-[3px_3px_0px_#24211D] space-y-1.5">
              <div className="mm-mono text-xs font-bold text-[#3F7047]">PANEL 02 · 14:00</div>
              <h3 className="font-bold text-base">Packing Shed</h3>
              <p className="text-xs text-[#24211D]/80 leading-relaxed">
                Crates are packed in returnable wax-free fibre boxes alongside stone-milled boules.
              </p>
            </div>
            <div className="bg-[#FDF5E7] border-2 border-[#24211D] p-4 rounded-lg shadow-[3px_3px_0px_#24211D] space-y-1.5">
              <div className="mm-mono text-xs font-bold text-[#494D78]">PANEL 03 · 09:30</div>
              <h3 className="font-bold text-base">Electric Van</h3>
              <p className="text-xs text-[#24211D]/80 leading-relaxed">
                Neighborhood milk-run routing drops your box on the shaded step and collects last week’s crate.
              </p>
            </div>
          </div>

          {/* Illustrated Inline SVG Delivery Route Map */}
          <div className="bg-[#494D78] text-[#FDF5E7] border-2 border-[#24211D] rounded-xl p-5 space-y-3 shadow-[3px_3px_0px_#24211D]">
            <div className="mm-mono text-xs font-bold text-[#F2C94D] tracking-wider">
              ILLUSTRATED DELIVERY LOOP (DOM / SVG DIAGRAM)
            </div>
            <svg
              viewBox="0 0 640 120"
              className="w-full h-auto"
              aria-label="Illustrated farm-to-door delivery route diagram"
            >
              <path
                d="M 50 65 C 170 15, 270 115, 340 60 C 410 10, 500 100, 590 55"
                fill="none"
                stroke="#F2C94D"
                strokeWidth="3"
                strokeDasharray="7 5"
              />
              <circle cx="50" cy="65" r="10" fill="#D94C32" stroke="#FDF5E7" strokeWidth="2" />
              <text x="50" y="96" textAnchor="middle" fontSize="11" fill="#FDF5E7" fontFamily="'Space Mono', monospace">
                Capay Farm
              </text>
              <circle cx="340" cy="60" r="10" fill="#3F7047" stroke="#FDF5E7" strokeWidth="2" />
              <text x="340" y="96" textAnchor="middle" fontSize="11" fill="#FDF5E7" fontFamily="'Space Mono', monospace">
                Mesa Shed
              </text>
              <circle cx="590" cy="55" r="10" fill="#F2C94D" stroke="#24211D" strokeWidth="2" />
              <text x="590" y="96" textAnchor="middle" fontSize="11" fill="#FDF5E7" fontFamily="'Space Mono', monospace">
                Your Porch
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

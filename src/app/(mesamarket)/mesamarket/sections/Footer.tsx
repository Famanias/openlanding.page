'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-[#24211D] bg-[#F2C94D]/35 px-4 sm:px-8 py-8 pb-20">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mm-mono text-xs text-[#24211D]">
        <div>
          <strong className="font-bold">MESA MARKET</strong> · OpenLanding Template 089 · Farm-to-Door Grocery
        </div>
        <div className="flex items-center gap-4">
          <span>All produce prices, meal kits, and receipts are illustrative demonstrations.</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#D94C32] font-bold transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

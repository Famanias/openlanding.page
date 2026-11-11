'use client';

import React from 'react';
import { Logo } from '../brand/Logo';

interface HeaderProps {
  totalCount: number;
  sampleSubtotal: number;
  onOpenBasket: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  sampleSubtotal,
  onOpenBasket,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FDF5E7]/95 backdrop-blur-xs border-b-2 border-[#24211D] px-4 sm:px-8 py-3">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2">
          <Logo />
        </a>

        <nav
          aria-label="Mesa Market sections"
          className="hidden md:flex items-center gap-6 mm-mono text-xs text-[#24211D]"
        >
          <a
            href="#mm-shelf"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('mm-shelf')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#D94C32] transition-colors whitespace-nowrap shrink-0"
          >
            01 · Market Shelf
          </a>
          <a
            href="#mm-kits"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('mm-kits')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#D94C32] transition-colors whitespace-nowrap shrink-0"
          >
            02 · Meal Kits
          </a>
          <a
            href="#mm-growers"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('mm-growers')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#D94C32] transition-colors whitespace-nowrap shrink-0"
          >
            03 · Grower Strip
          </a>
          <a
            href="#mm-checkout"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('mm-checkout')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#D94C32] transition-colors whitespace-nowrap shrink-0"
          >
            04 · Sample Receipt
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenBasket}
          className="px-4 py-2 bg-[#3F7047] text-[#FDF5E7] mm-mono text-xs font-bold rounded-full border-2 border-[#24211D] hover:bg-[#315938] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-[2px_2px_0px_#24211D]"
        >
          Basket ({totalCount}) · ${sampleSubtotal.toFixed(2)}
        </button>
      </div>
    </header>
  );
};

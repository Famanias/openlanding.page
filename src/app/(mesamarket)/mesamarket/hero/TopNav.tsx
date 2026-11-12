'use client';

import React from 'react';
import { ShoppingBasket } from 'lucide-react';
import { fraunces } from './fonts';

export type NavTopic = 'shop' | 'how-it-works' | 'our-farms' | 'stories';

interface TopNavProps {
  onSelectTopic: (topic: NavTopic) => void;
  onOpenBasket: () => void;
}

const NAV_ITEMS: Array<{ id: NavTopic; label: string }> = [
  { id: 'shop', label: 'Shop' },
  { id: 'how-it-works', label: 'How it Works' },
  { id: 'our-farms', label: 'Our Farms' },
  { id: 'stories', label: 'Stories' },
];

export default function TopNav({ onSelectTopic, onOpenBasket }: TopNavProps) {
  return (
    <header className="w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-2 flex items-center justify-between gap-8 z-20">
      {/* Zone 1: Brand Wordmark */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
        }}
        className={`${fraunces.className} text-[25px] sm:text-[31px] font-black tracking-[-0.035em] leading-none text-[#1A1714] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D85432] rounded-sm`}
      >
        MESA MARKET<span className="text-[10px] font-sans font-semibold align-baseline ml-0.5">®</span>
      </a>

      {/* Zone 2: 4 Single-Line Navigation Links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-8 lg:gap-11 text-[16px] font-normal text-[#1E1A17]"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTopic(item.id)}
            className="hover:text-[#D85432] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D85432] rounded-sm"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: Primary Basket Action (Strictly NO numerical counter) */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onOpenBasket}
          aria-label="Open Basket"
          className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-[#1E1A17] bg-transparent hover:bg-[#1E1A17]/5 active:scale-[0.98] px-6 py-2 text-[16px] font-normal text-[#1E1A17] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D85432]"
        >
          <span>Basket</span>
          <ShoppingBasket className="w-[19px] h-[19px] stroke-[1.6]" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

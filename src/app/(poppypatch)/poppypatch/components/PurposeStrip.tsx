import React, { useEffect, useState } from 'react';
import { SparkleStar } from './DoodleSvg';

const STICKERS = [
  { text: 'GROWN WITH CURIOSITY', tint: '#F9DFD5' },
  { text: 'A LITTLE MAGIC AT HOME', tint: '#EFE0F0' },
  { text: 'NO GREEN THUMB REQUIRED', tint: '#E3EBC9' },
  { text: 'COUNTERTOP BOTANICAL WONDER', tint: '#FAF3E3' },
  { text: 'TYPICAL HARVEST IN 10–14 DAYS', tint: '#F9DFD5' },
  { text: '2 TO 3 FLUSHES PER BLOCK', tint: '#E3EBC9' }
];

export function PurposeStrip() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setScrollOffset(Math.min(60, y * 0.04));
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      aria-label="Brand values and growing highlights"
      className="py-5 sm:py-7 overflow-hidden border-y border-[#4A2E25]/10 bg-[#FAF3E3]/60"
    >
      <div className="max-w-[1440px] mx-auto px-4">
        <div
          style={{ transform: `translate3d(${-scrollOffset}px, 0, 0)` }}
          className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-4 transition-transform duration-150 ease-out"
        >
          {STICKERS.map((sticker, index) => (
            <div
              key={sticker.text}
              style={{ backgroundColor: sticker.tint }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-[#4A2E25]/15 text-xs sm:text-[13px] font-bold tracking-[0.06em] text-[#4A2E25] whitespace-nowrap shrink-0 shadow-[0_2px_0_rgba(74,46,37,0.08)] ${
                index % 2 === 0 ? '-rotate-1' : 'rotate-1'
              }`}
            >
              <SparkleStar className="w-3.5 h-3.5 shrink-0" />
              <span>{sticker.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

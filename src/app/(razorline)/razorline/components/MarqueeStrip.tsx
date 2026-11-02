"use client";

import React, { useEffect, useState } from 'react';
import { computeScrollMarqueeOffset } from '../utils/storeLogic';

export const MarqueeStrip: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setDirection(currentY >= lastScrollY ? 'forward' : 'reverse');
        setOffset(computeScrollMarqueeOffset(currentY, 340));
        lastScrollY = currentY;
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const phrases = [
    'NO LIMITS',
    'NO EXCUSES',
    'PURE MOMENTUM',
    'RL-01 PERFORMANCE SERIES',
    'ENGINEERED REBELLION',
    'ZERO COMPROMISE'
  ];

  return (
    <div
      aria-label="Brand statement strip"
      className="relative w-full bg-[#D3FF35] text-[#0B0B0A] border-y border-[#0B0B0A] overflow-hidden py-3 sm:py-3.5 select-none"
    >
      <div
        style={{
          transform: `translate3d(${offset}px, 0, 0)`
        }}
        className="flex items-center whitespace-nowrap transition-transform duration-150 ease-out will-change-transform"
      >
        {[0, 1, 2].map((repeatIndex) => (
          <div key={repeatIndex} className="flex items-center shrink-0">
            {phrases.map((phrase, idx) => (
              <React.Fragment key={`${repeatIndex}-${idx}`}>
                <span className="font-display italic font-black text-xl sm:text-2xl tracking-[0.06em] uppercase px-5 sm:px-7">
                  {phrase}
                </span>
                <span
                  aria-hidden="true"
                  className={`font-mono-tech text-xs font-bold px-2 transition-transform duration-200 ${
                    direction === 'reverse' ? 'rotate-180' : ''
                  }`}
                >
                  ///
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

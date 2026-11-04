'use client';

import React from 'react';

interface SectionHeadingProps {
  label: string;
  headline: string;
  intro?: string;
  align?: 'left' | 'split';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  headline,
  intro,
  align = 'split',
}) => {
  return (
    <div className="pb-10 md:pb-14 border-b border-[#F2EBE2]/10">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779]">
          {label}
        </span>
        <span className="h-px flex-1 max-w-24 bg-[#F2EBE2]/10" aria-hidden="true" />
      </div>

      {align === 'split' && intro ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <h2 className="lg:col-span-7 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F2EBE2] leading-[1.04] text-balance">
            {headline}
          </h2>
          <p className="lg:col-span-5 text-base text-[#A6A29F] leading-relaxed max-w-xl">
            {intro}
          </p>
        </div>
      ) : (
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F2EBE2] leading-[1.04] text-balance">
            {headline}
          </h2>
          {intro && (
            <p className="mt-4 text-base text-[#A6A29F] leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

'use client';

import React from 'react';

export const CuratedStudio: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="curatedStudio">
      {/* Layer 1: Tailored harmonized atelier backdrop framing uploaded user artwork cleanly */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(172deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.78,
          }}
        />

        {/* Soft vertical textile studio alcove behind divider */}
        <div
          className="srf-room-alcove-panel absolute left-[8%] right-[8%] top-[28%] lg:left-[38%] lg:right-[11%] lg:top-[8%] bottom-0 rounded-t-[24px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-textile-primary) 46%, var(--room-wall-shadow)) 0%, var(--room-wall-shadow) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 28%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Balanced studio daylight */}
      <div
        className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] pointer-events-none opacity-55"
        style={{
          background:
            'radial-gradient(ellipse 64% 68% at 64% 42%, var(--room-light-tint) 0%, transparent 74%)',
        }}
      />

      {/* Layer 3 & 4: Mineral studio floor & woven studio mat */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 50%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[41%] lg:right-[8%] top-[12%] h-[54%] rounded-[8px] border-2"
          style={{
            background:
              'linear-gradient(180deg, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 78%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 34%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Restrained studio plinth & matte vessel */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 210 190"
          className="srf-room-prop-right absolute right-[2.5%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[136px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="110" cy="176" rx="64" ry="8" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="66" y="118" width="88" height="58" rx="4" fill="var(--room-furniture)" />
          <rect x="66" y="170" width="88" height="6" rx="2" fill="var(--room-furniture-leg)" opacity="0.68" />
          <path
            d="M95 72 C92 86, 86 96, 86 108 C86 114, 96 118, 110 118 C124 118, 134 114, 134 108 C134 96, 128 86, 125 72 Z"
            fill="var(--room-decor-primary)"
          />
          <ellipse cx="110" cy="98" rx="18" ry="3.5" fill="var(--room-decor-accent)" opacity="0.65" />
        </svg>
      </div>
    </div>
  );
};

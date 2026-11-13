'use client';

import React from 'react';

export const SculptedCoastalRoom: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="sculptedCoastalRoom">
      {/* Layer 1: Limewash coastal wall + tall narrow right doorway arch */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(170deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.76,
          }}
        />

        {/* Narrow tall coastal doorway arch tucked on center-right edge */}
        <div
          className="srf-room-coastal-arch hidden sm:block absolute right-[10%] top-[10%] w-[150px] lg:w-[190px] bottom-0 rounded-t-[999px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-light-tint) 42%, var(--room-wall-shadow)) 0%, var(--room-wall-shadow) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 34%, transparent)',
            boxShadow:
              'inset 16px 12px 32px -18px color-mix(in srgb, var(--room-shadow-tint) 28%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Sculpted undulating spline plaster relief band */}
      <div
        className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 16%, rgba(0,0,0,0.45) 33%, black 50%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 16%, rgba(0,0,0,0.45) 33%, black 50%)',
        }}
      >
        <svg
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          className="srf-room-coastal-waves absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="srf-coastal-wave-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--room-wall-shadow)" stopOpacity="0.54" />
              <stop offset="100%" stopColor="var(--room-wall-base)" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <path
            d="M0 280 C220 240, 460 285, 680 248 C900 210, 1110 295, 1260 245 L1440 260 L1440 620 L0 620 Z"
            fill="url(#srf-coastal-wave-grad)"
          />
          <path
            d="M0 370 C260 335, 520 385, 880 345 C1030 292, 1180 385, 1440 338 L1440 620 L0 620 Z"
            fill="var(--room-textile-primary)"
            opacity="0.34"
          />
          <path
            d="M0 280 C220 240, 460 285, 680 248 C900 210, 1110 295, 1260 245 L1440 260"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="2.5"
            opacity="0.58"
          />
        </svg>
      </div>

      {/* Layer 3 & 4: Mineral stone floor + organic flowing contoured rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[40%] lg:right-[6%] top-[8%] h-[62%]"
          style={{
            borderRadius: '44% 56% 48% 52% / 58% 46% 54% 42%',
            background:
              'radial-gradient(ellipse 88% 82% at 50% 48%, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 74%, var(--room-textile-secondary)) 100%)',
            border: '2px solid color-mix(in srgb, var(--room-rug-trim) 34%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Rounded organic plinth & coastal shell table lamp */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 210 220"
          className="srf-room-prop-right absolute right-[2%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[138px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="110" cy="206" rx="64" ry="9" fill="var(--room-shadow-tint)" opacity="0.22" />
          <rect x="64" y="138" width="92" height="68" rx="18" fill="var(--room-furniture)" />
          <rect x="64" y="196" width="92" height="10" rx="5" fill="var(--room-furniture-leg)" opacity="0.72" />
          <ellipse cx="110" cy="140" rx="44" ry="7" fill="var(--room-light-tint)" opacity="0.34" />
          <path
            d="M84 138 C78 118, 86 98, 110 92 C134 98, 142 118, 136 138 Z"
            fill="var(--room-decor-primary)"
          />
          <circle cx="110" cy="108" r="14" fill="var(--room-decor-accent)" opacity="0.65" />
          <circle cx="110" cy="108" r="8" fill="var(--room-light-tint)" opacity="0.45" />
        </svg>
      </div>
    </div>
  );
};

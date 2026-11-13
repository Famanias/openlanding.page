'use client';

import React from 'react';

export const ArchitecturalShowroom: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="architecturalShowroom">
      {/* Layer 1: Honed plaster architectural showroom — sculptural color-harmonized monolith */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(176deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
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

        {/* Asymmetric gallery monolith plane offsetting divider cleanly */}
        <div
          className="srf-room-monolith-plane absolute left-[8%] right-[8%] top-[28%] lg:left-[42%] lg:right-[16%] lg:top-[7%] bottom-0 border-t border-l border-r lg:border-r-0"
          style={{
            background:
              'linear-gradient(160deg, color-mix(in srgb, var(--room-wall-highlight) 58%, var(--room-wall-shadow)) 0%, var(--room-wall-shadow) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow:
              '-24px 0 42px -28px color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Focused overhead gallery spotlight wash & tactile swatch pin-up board */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <div
          className="absolute left-[44%] right-[14%] top-0 bottom-0 opacity-62"
          style={{
            background:
              'radial-gradient(ellipse 68% 72% at 50% 18%, var(--room-light-tint) 0%, transparent 74%)',
          }}
        />

        {/* Tactile material swatch pin-up sample board on far right */}
        <div
          className="srf-room-prop-right hidden xl:flex flex-col gap-2 absolute right-[3.8%] top-[18%] p-3 rounded-[4px] border"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--room-textile-primary) 72%, var(--room-wall-highlight))',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow: '0 14px 28px -18px color-mix(in srgb, var(--room-shadow-tint) 28%, transparent)',
          }}
        >
          <div className="flex gap-1.5">
            <span
              className="w-7 h-9 rounded-[2px] border"
              style={{
                backgroundColor: 'var(--room-decor-primary)',
                borderColor: 'color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
              }}
            />
            <span
              className="w-7 h-9 rounded-[2px] border"
              style={{
                backgroundColor: 'var(--room-furniture)',
                borderColor: 'color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
              }}
            />
          </div>
          <span
            className="w-full h-3 rounded-[2px]"
            style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.78 }}
          />
        </div>
      </div>

      {/* Layer 3 & 4: Clean honed terrazzo gallery floor + architectural woven mat */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-32"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[43%] lg:right-[9%] top-[12%] h-[50%] border-2"
          style={{
            background:
              'linear-gradient(180deg, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 76%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 38%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Sharp low stone gallery plinth + sculptural object */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 220 140"
          className="srf-room-prop-right absolute right-[2.5%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[138px] h-auto"
          aria-hidden="true"
        >
          <polygon points="48,128 192,128 206,136 62,136" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="68" y="84" width="108" height="44" fill="var(--room-furniture)" />
          <polygon points="68,84 82,74 190,74 176,84" fill="var(--room-wall-highlight)" opacity="0.65" />
          <polygon points="176,84 190,74 190,118 176,128" fill="var(--room-furniture-leg)" opacity="0.62" />
          {/* Minimalist matte gallery sculpture resting on monolith plinth */}
          <rect x="106" y="48" width="26" height="32" rx="13" fill="var(--room-decor-primary)" />
          <circle cx="136" cy="70" r="8" fill="var(--room-decor-accent)" opacity="0.88" />
        </svg>
      </div>
    </div>
  );
};

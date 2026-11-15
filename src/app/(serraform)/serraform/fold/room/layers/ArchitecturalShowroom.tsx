'use client';

import React from 'react';
import { DustMotes, FloorPlane, RectRug, WallBase } from './shared';

// [left % across the mid layer, breathing duration s, delay s]
const SPOTS: ReadonlyArray<readonly [number, number, number]> = [
  [49, 9, 0],
  [64, 11, -4],
  [79, 10, -7],
];

const SWATCHES = [
  'var(--room-decor-primary)',
  'var(--room-furniture)',
  'var(--room-decor-accent)',
  'var(--room-textile-secondary)',
  'var(--room-rug-trim)',
  'var(--room-foliage)',
] as const;

export const ArchitecturalShowroom: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="architecturalShowroom">
      {/* Layer 1: Honed plaster architectural showroom — sculptural color-harmonized monolith */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <WallBase angle={176} quiet={0.78} crown={false} />

        {/* Offset rear slab giving the monolith a second plane of depth */}
        <div
          className="hidden lg:block absolute left-[36.6%] w-[9%] top-[17%] bottom-0 border-t border-l"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-wall-shadow) 74%, var(--room-ambient-tint)) 0%, color-mix(in srgb, var(--room-wall-shadow) 88%, var(--room-shadow-tint)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 24%, transparent)',
          }}
        >
          {/* Specimen placard */}
          <div
            className="hidden xl:block absolute left-[14%] top-[25%] w-[42px] h-[30px] rounded-[1px] border px-[6px] py-[6px] space-y-[4px]"
            style={{
              backgroundColor: 'var(--room-wall-highlight)',
              borderColor: 'color-mix(in srgb, var(--room-trim) 34%, transparent)',
            }}
          >
            <span className="block h-[2px] w-full" style={{ backgroundColor: 'var(--room-text-secondary)', opacity: 0.6 }} />
            <span className="block h-[2px] w-[70%]" style={{ backgroundColor: 'var(--room-text-secondary)', opacity: 0.4 }} />
            <span className="block h-[2px] w-[46%]" style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.7 }} />
          </div>
        </div>

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
        >
          {/* Honed stone panel joints */}
          <div className="absolute inset-y-0 left-1/3 w-px" style={{ backgroundColor: 'color-mix(in srgb, var(--room-trim) 18%, transparent)' }} />
          <div className="absolute inset-y-0 left-2/3 w-px" style={{ backgroundColor: 'color-mix(in srgb, var(--room-trim) 18%, transparent)' }} />
          <div className="absolute inset-x-0 top-[46%] h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--room-trim) 18%, transparent)' }} />
          <div
            className="absolute inset-y-0 right-0 w-[10px] hidden lg:block"
            style={{
              background:
                'linear-gradient(90deg, transparent, color-mix(in srgb, var(--room-shadow-tint) 16%, transparent))',
            }}
          />
        </div>
      </div>

      {/* Layer 2: Track spots washing the monolith, swatch board */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <div
          className="absolute left-[44%] right-[14%] top-0 bottom-0 opacity-62"
          style={{
            background:
              'radial-gradient(ellipse 68% 72% at 50% 18%, var(--room-light-tint) 0%, transparent 74%)',
          }}
        />

        {/* Lighting track: each head's cone brightens and dims on its own rhythm */}
        <div
          className="hidden lg:block absolute top-[13px] left-[43%] right-[14%] h-[3px] rounded-full"
          style={{ backgroundColor: 'var(--room-furniture-leg)' }}
        />
        {SPOTS.map(([left, duration, delay]) => (
          <div key={left} className="hidden lg:block absolute top-[16px] bottom-0 w-[17%]" style={{ left: `${left - 8.5}%` }}>
            <div
              className="srf-room-breathe absolute inset-x-0 top-[14px] h-[76%]"
              style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
            >
              <div className="srf-room-spot-cone inset-0" />
            </div>
            <span
              className="absolute left-1/2 -ml-[5px] top-0 w-[10px] h-[17px] rounded-b-[4px]"
              style={{ backgroundColor: 'var(--room-furniture-leg)' }}
            >
              <span
                className="absolute inset-x-[2px] bottom-0 h-[3px] rounded-full"
                style={{ backgroundColor: 'var(--room-light-tint)', opacity: 0.9 }}
              />
            </span>
          </div>
        ))}

        {/* Tactile material swatch pin-up sample board on far right */}
        <div
          className="srf-room-prop-right hidden xl:flex flex-col gap-2 absolute right-[3.4%] top-[16%] p-3 rounded-[4px] border"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--room-textile-primary) 72%, var(--room-wall-highlight))',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow: '0 14px 28px -18px color-mix(in srgb, var(--room-shadow-tint) 28%, transparent)',
          }}
        >
          <div className="grid grid-cols-3 gap-1.5">
            {SWATCHES.map((color) => (
              <span
                key={color}
                className="relative w-7 h-9 rounded-[2px] border"
                style={{
                  backgroundColor: color,
                  borderColor: 'color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
                }}
              >
                <span
                  className="absolute left-1/2 -ml-[2px] top-[3px] w-[4px] h-[4px] rounded-full"
                  style={{ backgroundColor: 'var(--room-wall-highlight)', opacity: 0.85 }}
                />
              </span>
            ))}
          </div>
          <span
            className="w-full h-3 rounded-[2px]"
            style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.78 }}
          />
          <span className="block h-[2px] w-[64%]" style={{ backgroundColor: 'var(--room-text-secondary)', opacity: 0.45 }} />
        </div>

        {/* Hanging mobile: the whole piece turns one way, the lower arm answers the other */}
        <div className="srf-room-drop-in hidden xl:block absolute top-0 left-[33.6%] w-[150px]">
          <div className="srf-room-sway" style={{ animationDuration: '9s' }}>
            <div
              className="mx-auto w-px h-[58px]"
              style={{ backgroundColor: 'color-mix(in srgb, var(--room-furniture-leg) 78%, transparent)' }}
            />
            <svg viewBox="0 0 150 72" className="block w-full h-auto" aria-hidden="true">
              <path d="M18 12 Q75 -2 132 12" fill="none" stroke="var(--room-furniture-leg)" strokeWidth="1.4" />
              <line x1="18" y1="12" x2="18" y2="42" stroke="var(--room-furniture-leg)" strokeWidth="1" />
              <circle cx="18" cy="56" r="14" fill="var(--room-decor-primary)" />
              <line x1="75" y1="5" x2="75" y2="34" stroke="var(--room-furniture-leg)" strokeWidth="1" />
              <path d="M61 34 H89 A14 14 0 0 1 61 34 Z" fill="var(--room-textile-secondary)" stroke="var(--room-trim)" strokeOpacity="0.4" />
              <line x1="132" y1="12" x2="132" y2="26" stroke="var(--room-furniture-leg)" strokeWidth="1" />
            </svg>
            <div
              className="srf-room-sway absolute right-0 top-[84px] w-[50px]"
              style={{ animationDuration: '6.5s', animationDelay: '-2s', transformOrigin: '64% 0' }}
            >
              <svg viewBox="0 0 50 64" className="block w-full h-auto" aria-hidden="true">
                <path d="M8 6 Q28 -2 46 6" fill="none" stroke="var(--room-furniture-leg)" strokeWidth="1.4" />
                <line x1="8" y1="6" x2="8" y2="30" stroke="var(--room-furniture-leg)" strokeWidth="1" />
                <rect x="-2" y="30" width="20" height="20" rx="3" fill="var(--room-decor-accent)" transform="rotate(8 8 40)" />
                <line x1="46" y1="6" x2="46" y2="20" stroke="var(--room-furniture-leg)" strokeWidth="1" />
                <ellipse cx="46" cy="31" rx="6" ry="11" fill="var(--room-furniture)" stroke="var(--room-trim)" strokeOpacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        <DustMotes className="left-[4%] right-[2%] lg:left-[36%] top-[34%] lg:top-[5%] bottom-[26%]" count={8} />
      </div>

      {/* Layer 3 & 4: Terrazzo gallery floor + architectural woven mat */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <FloorPlane variant="terrazzo" opacity={0.44} />
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-32"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Spot pool landing on the floor beside the pedestal */}
        <div
          className="srf-room-breathe hidden lg:block absolute left-[30%] w-[20%] top-[1%] h-[30%]"
          style={{ animationDuration: '9s' }}
        >
          <div className="srf-room-glow-pool inset-0" />
        </div>

        <RectRug
          className="left-[10%] right-[10%] lg:left-[43%] lg:right-[9%] top-[12%] h-[50%]"
          fringe={false}
        />
      </div>

      {/* Layer 5: Tall pedestal + arch form on the left, stone plinth + sample blocks on the right */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 110 250"
          className="srf-room-prop-left hidden xl:block absolute left-[37.4%] bottom-[-10px] w-[96px] h-auto"
          aria-hidden="true"
        >
          <polygon points="18,238 82,238 96,246 32,246" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="26" y="98" width="46" height="142" fill="var(--room-furniture)" />
          <polygon points="26,98 36,89 82,89 72,98" fill="var(--room-wall-highlight)" opacity="0.7" />
          <polygon points="72,98 82,89 82,231 72,240" fill="var(--room-furniture-leg)" opacity="0.58" />
          <rect x="26" y="98" width="6" height="142" fill="var(--room-light-tint)" opacity="0.16" />
          {/* Arch form with a resting sphere */}
          <path
            d="M34 93 L34 60 Q34 36 52 36 Q70 36 70 60 L70 93 L60 93 L60 62 Q60 48 52 48 Q44 48 44 62 L44 93 Z"
            fill="var(--room-decor-primary)"
          />
          <path
            d="M37 86 L37 60 Q37 42 50 39"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.28"
          />
          <circle cx="52" cy="25" r="10" fill="var(--room-decor-accent)" />
          <circle cx="48.5" cy="21.5" r="3" fill="var(--room-light-tint)" opacity="0.4" />
        </svg>

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
          <rect x="150" y="62" width="14" height="18" fill="var(--room-textile-secondary)" stroke="var(--room-trim)" strokeOpacity="0.4" />
          {/* Felt sample blocks stacked at the foot of the plinth */}
          <polygon points="10,130 58,130 64,136 16,136" fill="var(--room-shadow-tint)" opacity="0.18" />
          <rect x="14" y="112" width="42" height="18" fill="var(--room-furniture-leg)" opacity="0.7" />
          <rect x="18" y="98" width="20" height="14" fill="var(--room-decor-accent)" />
          <rect x="38" y="102" width="15" height="10" fill="var(--room-textile-secondary)" stroke="var(--room-trim)" strokeOpacity="0.4" />
          <rect x="22" y="88" width="12" height="10" fill="var(--room-decor-primary)" />
        </svg>
      </div>
    </div>
  );
};

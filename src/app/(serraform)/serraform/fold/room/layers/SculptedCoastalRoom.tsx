'use client';

import React from 'react';
import { DustMotes, FloorPlane, Pendant, WallBase } from './shared';

// [top % of the sea band, duration s, delay s, opacity]
const SEA_SHIMMER: ReadonlyArray<readonly [number, number, number, number]> = [
  [10, 7, 0, 0.5],
  [30, 5, -2, 0.62],
  [54, 6, -1, 0.5],
  [78, 4.4, -3, 0.42],
];

// [left %, top %, width px, height px, rotation deg, duration s, delay s]
const CAUSTICS: ReadonlyArray<readonly [number, number, number, number, number, number, number]> = [
  [50, 7, 190, 54, -10, 10, 0],
  [63, 20, 240, 62, -6, 13, -4],
  [76, 4, 150, 44, -14, 9, -7],
  [56, 33, 170, 46, -8, 12, -2],
];

// [tip x, tip y, lean deg] — pampas plumes
const PLUMES: ReadonlyArray<readonly [number, number, number]> = [
  [40, 78, -24],
  [62, 50, -10],
  [84, 38, 2],
  [106, 54, 14],
  [128, 88, 26],
];

export const SculptedCoastalRoom: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="sculptedCoastalRoom">
      {/* Layer 1: Limewash coastal wall + arched window onto the sea */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <WallBase angle={170} quiet={0.76} crown={false} />

        {/* Deep-set arched window: sky, sun, a moving sea and one small sail */}
        <div
          className="srf-room-coastal-arch hidden sm:block absolute right-[4%] top-[9%] w-[130px] lg:w-[168px] h-[58%] rounded-t-[999px] overflow-hidden border"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-light-tint) 62%, var(--room-ambient-tint)) 0%, var(--room-light-tint) 62%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 34%, transparent)',
            boxShadow:
              '0 0 0 8px color-mix(in srgb, var(--room-wall-highlight) 70%, var(--room-wall-shadow)), 0 0 0 9px color-mix(in srgb, var(--room-trim) 26%, transparent)',
          }}
        >
          <div className="absolute left-[58%] top-[24%]">
            <div className="srf-room-breathe absolute -left-[60px] -top-[60px] w-[120px] h-[120px]">
              <div className="srf-room-glow-pool inset-0" />
            </div>
            <div
              className="absolute -left-[15px] -top-[15px] w-[30px] h-[30px] rounded-full"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--room-light-tint) 70%, var(--room-decor-accent))',
              }}
            />
          </div>

          {/* Far headland */}
          <svg
            viewBox="0 0 168 30"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-[36%] w-full h-[26px]"
            aria-hidden="true"
          >
            <path
              d="M0 30 L0 22 Q20 10 44 18 Q60 22 78 30 Z"
              fill="var(--room-furniture)"
              opacity="0.7"
            />
          </svg>

          <div
            className="absolute inset-x-0 bottom-0 h-[36%] overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--room-decor-primary) 36%, var(--room-ambient-tint)) 0%, color-mix(in srgb, var(--room-decor-primary) 58%, var(--room-ambient-tint)) 100%)',
            }}
          >
            {SEA_SHIMMER.map(([top, duration, delay, opacity]) => (
              <div
                key={top}
                className="absolute inset-x-0"
                style={{ top: `${top}%`, opacity }}
              >
                <div
                  className="srf-room-shimmer"
                  style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
                />
              </div>
            ))}
          </div>

          {/* Sailboat easing along the horizon */}
          <div
            className="srf-room-cloud-track absolute inset-x-0 bottom-[36%]"
            style={{ transform: 'translate3d(44%, 0, 0)', animationDuration: '120s', animationDelay: '-50s' }}
          >
            <svg viewBox="0 0 22 22" className="block w-[20px] h-auto translate-y-[5px]" aria-hidden="true">
              <polygon points="11,2 11,16 20,16" fill="var(--room-wall-highlight)" />
              <polygon points="10,5 10,16 3,16" fill="var(--room-wall-highlight)" opacity="0.8" />
              <polygon points="2,17 20,17 17,21 5,21" fill="var(--room-decor-accent)" />
            </svg>
          </div>

          <div
            className="absolute inset-0 rounded-t-[999px]"
            style={{
              boxShadow:
                'inset 16px 12px 32px -18px color-mix(in srgb, var(--room-shadow-tint) 32%, transparent)',
            }}
          />
        </div>

        {/* Plaster sill beneath the window */}
        <div
          className="hidden sm:block absolute right-[calc(4%-12px)] top-[67%] w-[154px] lg:w-[192px] h-[10px] rounded-[5px]"
          style={{
            background:
              'linear-gradient(180deg, var(--room-wall-highlight) 0%, color-mix(in srgb, var(--room-wall-shadow) 70%, var(--room-wall-highlight)) 100%)',
            boxShadow: '0 8px 14px -8px color-mix(in srgb, var(--room-shadow-tint) 40%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Sculpted plaster relief in two bands that slide against each other */}
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
          className="srf-room-coastal-waves srf-room-wave-a absolute -left-[3%] top-0 w-[106%] h-full"
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
            d="M0 280 C220 240, 460 285, 680 248 C900 210, 1110 295, 1260 245 L1440 260"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="2.5"
            opacity="0.58"
          />
        </svg>
        <svg
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          className="srf-room-wave-b absolute -left-[3%] top-0 w-[106%] h-full"
          aria-hidden="true"
        >
          <path
            d="M0 370 C260 335, 520 385, 880 345 C1030 292, 1180 385, 1440 338 L1440 620 L0 620 Z"
            fill="var(--room-textile-primary)"
            opacity="0.34"
          />
          <path
            d="M0 370 C260 335, 520 385, 880 345 C1030 292, 1180 385, 1440 338"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="1.8"
            opacity="0.5"
          />
          <path
            d="M0 452 C300 424, 610 470, 900 436 C1100 410, 1260 462, 1440 428"
            fill="none"
            stroke="var(--room-wall-shadow)"
            strokeWidth="1.6"
            opacity="0.5"
          />
        </svg>

        {/* Water light rippling across the upper wall */}
        {CAUSTICS.map(([left, top, width, height, rot, duration, delay]) => (
          <div
            key={`${left}-${top}`}
            className="absolute"
            style={{ left: `${left}%`, top: `${top}%`, width, height, transform: `rotate(${rot}deg)` }}
          >
            <div
              className="srf-room-caustic-drift absolute inset-0"
              style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
            >
              <div className="srf-room-caustic inset-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Woven rattan pendant + sea-light specks (kept outside the relief mask) */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <Pendant className="hidden xl:block left-[33%]" shade="rattan" cord={104} width={84} duration={8.5} />
        <DustMotes className="left-[4%] right-[2%] lg:left-[36%] top-[34%] lg:top-[5%] bottom-[26%]" count={9} />
      </div>

      {/* Layer 3 & 4: Mineral stone floor + organic flowing contoured rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <FloorPlane variant="tile" opacity={0.4} />
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Pool of sea light on the stone */}
        <div className="srf-room-breathe absolute left-[8%] w-[30%] top-[10%] h-[48%]" style={{ animationDuration: '11s' }}>
          <div className="srf-room-glow-pool inset-0" />
        </div>

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[40%] lg:right-[6%] top-[8%] h-[62%]"
          style={{
            borderRadius: '44% 56% 48% 52% / 58% 46% 54% 42%',
            background:
              'radial-gradient(ellipse 88% 82% at 50% 48%, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 74%, var(--room-textile-secondary)) 100%)',
            border: '2px solid color-mix(in srgb, var(--room-rug-trim) 34%, transparent)',
          }}
        >
          {/* Tide-line contours woven into the rug */}
          {[8, 17, 27].map((inset, idx) => (
            <div
              key={inset}
              className="absolute"
              style={{
                inset: `${inset}%`,
                borderRadius: '44% 56% 48% 52% / 58% 46% 54% 42%',
                border: `1px solid color-mix(in srgb, var(--room-rug-trim) ${26 - idx * 6}%, transparent)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 5: Urn of pampas grass on the left, rounded plinth + glowing shell lamp on the right */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <div className="srf-room-prop-left hidden xl:block absolute left-[36.6%] bottom-[-12px] w-[150px]">
          <div className="relative">
            <svg viewBox="0 0 160 330" className="block w-full h-auto" aria-hidden="true">
              <ellipse cx="82" cy="318" rx="50" ry="8" fill="var(--room-shadow-tint)" opacity="0.2" />
              <path
                d="M62 226 C62 234, 44 248, 44 278 C44 304, 58 318, 80 318 C102 318, 116 304, 116 278 C116 248, 98 234, 98 226 Z"
                fill="var(--room-furniture)"
              />
              <rect x="58" y="218" width="44" height="10" rx="5" fill="var(--room-furniture-leg)" opacity="0.7" />
              <path
                d="M46 268 Q80 280 114 268 L115 280 Q80 292 45 280 Z"
                fill="var(--room-decor-accent)"
                opacity="0.6"
              />
              <path
                d="M56 250 C52 268, 52 290, 62 306"
                fill="none"
                stroke="var(--room-light-tint)"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.4"
              />
              {/* Smooth beach stones at its foot */}
              <ellipse cx="134" cy="312" rx="15" ry="6" fill="var(--room-furniture-leg)" opacity="0.6" />
              <ellipse cx="128" cy="304" rx="10" ry="4.5" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.3" />
            </svg>
            <svg
              viewBox="0 0 160 330"
              className="srf-room-sway-base absolute inset-0 w-full h-full"
              style={{ transformOrigin: '50% 68%', animationDuration: '8s' }}
              aria-hidden="true"
            >
              <g fill="none" stroke="var(--room-furniture-leg)" strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
                <path d="M76 222 C68 170, 54 120, 40 82" />
                <path d="M78 222 C74 160, 68 100, 62 54" />
                <path d="M80 222 C82 150, 84 90, 84 42" />
                <path d="M82 222 C90 160, 100 104, 106 58" />
                <path d="M84 222 C96 172, 114 128, 128 92" />
              </g>
              {PLUMES.map(([x, y, lean]) => (
                <g key={x} transform={`rotate(${lean} ${x} ${y})`}>
                  <ellipse
                    cx={x}
                    cy={y}
                    rx="9"
                    ry="36"
                    fill="color-mix(in srgb, var(--room-furniture) 84%, var(--room-decor-accent))"
                    stroke="var(--room-trim)"
                    strokeOpacity="0.34"
                  />
                  <path
                    d={`M${x} ${y - 30} V${y + 32}`}
                    fill="none"
                    stroke="var(--room-decor-accent)"
                    strokeOpacity="0.3"
                    strokeWidth="1.4"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="srf-room-prop-right absolute right-[2%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[138px]">
          {/* Lamp glow breathing against the wall */}
          <div
            className="srf-room-breathe absolute left-[52%] top-[49%] w-[190px] h-[190px] -ml-[95px] -mt-[95px]"
            style={{ animationDuration: '7s' }}
          >
            <div className="srf-room-glow-pool inset-0" />
          </div>
          <svg viewBox="0 0 210 220" className="relative block w-full h-auto" aria-hidden="true">
            <ellipse cx="110" cy="206" rx="64" ry="9" fill="var(--room-shadow-tint)" opacity="0.22" />
            <rect x="64" y="138" width="92" height="68" rx="18" fill="var(--room-furniture)" />
            <rect x="64" y="196" width="92" height="10" rx="5" fill="var(--room-furniture-leg)" opacity="0.72" />
            <ellipse cx="110" cy="140" rx="44" ry="7" fill="var(--room-light-tint)" opacity="0.34" />
            <path
              d="M84 138 C78 118, 86 98, 110 92 C134 98, 142 118, 136 138 Z"
              fill="var(--room-decor-primary)"
            />
            {/* Scallop ribs on the shell shade */}
            <g fill="none" stroke="var(--room-light-tint)" strokeOpacity="0.3" strokeWidth="1.4">
              <path d="M110 94 V136" />
              <path d="M110 94 Q96 112 94 136" />
              <path d="M110 94 Q124 112 126 136" />
            </g>
            <circle cx="110" cy="108" r="14" fill="var(--room-decor-accent)" opacity="0.65" />
            <circle cx="110" cy="108" r="8" fill="var(--room-light-tint)" opacity="0.55" />
            {/* Coral branch + sea-smoothed pebbles beside the plinth */}
            <g fill="none" stroke="var(--room-decor-accent)" strokeWidth="3" strokeLinecap="round" opacity="0.75">
              <path d="M34 204 C34 190, 30 180, 24 170" />
              <path d="M34 194 C38 184, 44 178, 46 168" />
              <path d="M30 184 C26 180, 20 180, 16 184" />
            </g>
            <ellipse cx="184" cy="204" rx="14" ry="5" fill="var(--room-furniture-leg)" opacity="0.6" />
            <ellipse cx="178" cy="197" rx="9" ry="4" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

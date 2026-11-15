'use client';

import React from 'react';
import { DustMotes, FloorLight, FloorPlane, RectRug, WallBase } from './shared';

const CLOUD_PATH =
  'M10 30 Q10 18 24 18 Q28 6 44 8 Q56 0 68 12 Q84 10 86 22 Q98 24 96 32 Q90 38 80 36 L18 36 Q8 36 10 30 Z';

// [top %, width px, duration s, delay s, resting offset %, opacity]
const CLOUDS: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
  [7, 132, 96, -18, 10, 0.78],
  [20, 92, 128, -74, 46, 0.6],
  [12, 68, 150, -112, 72, 0.5],
];

// [top %, width px, duration s, delay s, resting offset %]
const BIRDS: ReadonlyArray<readonly [number, number, number, number, number]> = [
  [22, 20, 52, -8, 34],
  [27, 14, 52, -6.6, 38],
  [16, 16, 71, -40, 58],
];

// [cx, base y, scale] — cypress and round trees dotted along the nearer hills
const HILL_TREES: ReadonlyArray<readonly [number, number, number]> = [
  [176, 244, 1],
  [204, 250, 0.8],
  [596, 228, 1.1],
  [628, 232, 0.85],
  [796, 238, 0.9],
];

const Curtain: React.FC<{ className: string; delay: number; fadeFrom: 'left' | 'right' }> = ({
  className,
  delay,
  fadeFrom,
}) => {
  const mask =
    fadeFrom === 'left'
      ? 'linear-gradient(90deg, black 0%, black 62%, transparent 100%)'
      : 'linear-gradient(270deg, black 0%, black 62%, transparent 100%)';
  return (
    <div
      className={`srf-room-drape-sway srf-room-pleats hidden lg:block absolute top-[3.6%] bottom-[5%] opacity-85 ${className}`}
      style={{ animationDelay: `${delay}s`, maskImage: mask, WebkitMaskImage: mask }}
    />
  );
};

export const PanoramaSalon: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="panoramaSalon">
      {/* Layer 1: Plaster wall, cornice + architectural dado rail */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <WallBase angle={172} quiet={0.74} />

        {/* Dado rail, held clear of the headline column */}
        <div
          className="absolute inset-x-0 top-[76%] h-[2px] opacity-28"
          style={{
            backgroundColor: 'var(--room-trim)',
            maskImage: 'linear-gradient(90deg, transparent 0%, transparent 33%, black 37%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, transparent 33%, black 37%)',
          }}
        />

        {/* Wide inset panoramic scenic window framed cleanly behind divider */}
        <div
          className="srf-room-panorama-frame absolute left-[6%] right-[6%] top-[34%] bottom-[8%] lg:left-[37.5%] lg:right-[4.5%] lg:top-[8%] lg:bottom-[12%] rounded-[4px] overflow-hidden border"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-light-tint) 68%, var(--room-ambient-tint)) 0%, color-mix(in srgb, var(--room-wall-shadow) 72%, var(--room-light-tint)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 34%, transparent)',
            boxShadow:
              '0 0 0 7px color-mix(in srgb, var(--room-wall-highlight) 82%, var(--room-trim)), 0 0 0 8px color-mix(in srgb, var(--room-trim) 34%, transparent), 12px 16px 30px -16px color-mix(in srgb, var(--room-shadow-tint) 34%, transparent)',
          }}
        >
          {/* Sun with a slow halo, sitting just behind the far ridge */}
          <div className="absolute left-[72%] lg:left-[88%] top-[36%]">
            <div
              className="srf-room-breathe absolute -left-[130px] -top-[130px] w-[260px] h-[260px]"
              style={{ animationDuration: '13s' }}
            >
              <div className="srf-room-glow-pool inset-0" />
            </div>
            <div
              className="srf-room-pano-layer-1 absolute -left-[32px] -top-[32px] w-[64px] h-[64px] lg:-left-[54px] lg:-top-[54px] lg:w-[108px] lg:h-[108px] rounded-full"
              style={{ backgroundColor: 'var(--room-light-tint)', opacity: 0.82 }}
            />
          </div>

          {/* Clouds crossing the sky */}
          {CLOUDS.map(([top, width, duration, delay, rest, opacity]) => (
            <div
              key={top}
              className="srf-room-cloud-track absolute inset-x-0"
              style={{
                top: `${top}%`,
                transform: `translate3d(${rest}%, 0, 0)`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            >
              <svg viewBox="0 0 100 40" className="block h-auto" style={{ width, opacity }} aria-hidden="true">
                <path d={CLOUD_PATH} fill="var(--room-light-tint)" />
              </svg>
            </div>
          ))}

          <svg
            viewBox="0 0 920 380"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <path
              d="M-40 250 Q160 155, 360 210 T740 175 T960 218 L960 390 L-40 390 Z"
              fill="var(--room-wall-shadow)"
              opacity="0.62"
              className="srf-room-pano-layer-1"
            />
            <path
              d="M-40 278 Q190 210, 410 256 T780 218 T960 258 L960 390 L-40 390 Z"
              fill="var(--room-furniture)"
              opacity="0.74"
              className="srf-room-pano-layer-2"
            />
            <g className="srf-room-pano-layer-2" fill="var(--room-decor-primary)" opacity="0.62">
              {HILL_TREES.map(([cx, baseY, s]) => (
                <g key={cx}>
                  <rect x={cx - 1} y={baseY - 10 * s} width="2" height={12 * s} />
                  <ellipse cx={cx} cy={baseY - 20 * s} rx={7 * s} ry={15 * s} />
                </g>
              ))}
            </g>
            <path
              d="M-40 315 Q220 264, 490 296 T960 276 L960 390 L-40 390 Z"
              fill="var(--room-decor-primary)"
              opacity="0.52"
              className="srf-room-pano-layer-3"
            />
            {/* A lane winding across the near field */}
            <path
              d="M330 392 C360 352, 430 340, 470 318 C500 302, 520 296, 560 290"
              fill="none"
              stroke="var(--room-light-tint)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.4"
              className="srf-room-pano-layer-3"
            />
            <path
              d="M-40 348 Q280 312, 560 342 T960 326 L960 390 L-40 390 Z"
              fill="var(--room-decor-accent)"
              opacity="0.34"
              className="srf-room-pano-layer-4"
            />
          </svg>

          {/* Birds gliding back the other way */}
          {BIRDS.map(([top, width, duration, delay, rest]) => (
            <div
              key={`${top}-${width}`}
              className="srf-room-glide-track absolute inset-x-0"
              style={{
                top: `${top}%`,
                transform: `translate3d(${rest}%, 0, 0)`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            >
              <svg viewBox="0 0 20 8" className="block h-auto" style={{ width }} aria-hidden="true">
                <path
                  d="M1 6 Q5 0 10 5 Q15 0 19 6"
                  fill="none"
                  stroke="var(--room-shadow-tint)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </div>
          ))}

          {/* Window mullions + transom */}
          {[33.33, 66.66].map((left) => (
            <div
              key={left}
              className="absolute inset-y-0 w-[5px] -translate-x-1/2"
              style={{
                left: `${left}%`,
                backgroundColor: 'color-mix(in srgb, var(--room-wall-highlight) 82%, var(--room-trim))',
                boxShadow: '1px 0 0 color-mix(in srgb, var(--room-shadow-tint) 16%, transparent)',
              }}
            />
          ))}
          <div
            className="absolute inset-x-0 top-[17%] h-[4px]"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--room-wall-highlight) 82%, var(--room-trim))',
              boxShadow: '0 1px 0 color-mix(in srgb, var(--room-shadow-tint) 16%, transparent)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                'inset 0 18px 42px -24px color-mix(in srgb, var(--room-shadow-tint) 26%, transparent)',
            }}
          />
        </div>

        {/* Stone sill under the window */}
        <div
          className="absolute left-[4.6%] right-[4.6%] bottom-[calc(8%-19px)] lg:left-[36.7%] lg:right-[3.7%] lg:bottom-[calc(12%-19px)] h-[11px] rounded-[2px]"
          style={{
            background:
              'linear-gradient(180deg, var(--room-wall-highlight) 0%, color-mix(in srgb, var(--room-furniture) 70%, var(--room-wall-highlight)) 100%)',
            boxShadow: '0 8px 14px -8px color-mix(in srgb, var(--room-shadow-tint) 40%, transparent)',
          }}
        />

        {/* Curtain pole + linen side panels */}
        <div
          className="hidden lg:block absolute left-[35.2%] right-[1.8%] top-[3%] h-[4px] rounded-full"
          style={{ backgroundColor: 'var(--room-furniture-leg)' }}
        />
        <Curtain className="left-[35.6%] w-[3.8%]" delay={0} fadeFrom="left" />
        <Curtain className="right-[2.2%] w-[3.8%]" delay={-6} fadeFrom="right" />
      </div>

      {/* Layer 2: Soft horizontal horizon glow wash */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] pointer-events-none">
        <div
          className="absolute inset-x-0 top-[26%] bottom-0 opacity-42"
          style={{
            background:
              'radial-gradient(ellipse 68% 55% at 68% 60%, var(--room-light-tint) 0%, transparent 74%)',
          }}
        />
        <DustMotes className="left-[4%] right-[2%] lg:left-[35%] top-[34%] lg:top-[5%] bottom-[20%]" count={9} />
      </div>

      {/* Layer 3 & 4: Wide-plank floor, woven salon rug, window light across both */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <FloorPlane variant="planks" opacity={0.46} />

        <RectRug className="left-[10%] right-[10%] lg:left-[42%] lg:right-[7%] top-[12%] h-[52%]" />

        <FloorLight className="left-[14%] w-[62%] lg:left-[33%] lg:w-[44%] top-[3%] h-[62%]" duration={13} />
      </div>

      {/* Layer 5: Spyglass + pouf by the window, low bench ledge + ceramic vessel */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        {/* Upholstered pouf */}
        <svg
          viewBox="0 0 84 54"
          className="srf-room-prop-left hidden xl:block absolute left-[36.2%] bottom-[-11px] w-[78px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="42" cy="48" rx="38" ry="5" fill="var(--room-shadow-tint)" opacity="0.2" />
          <path
            d="M8 22 Q8 8 42 8 Q76 8 76 22 L76 34 Q76 46 42 46 Q8 46 8 34 Z"
            fill="var(--room-textile-secondary)"
            stroke="var(--room-trim)"
            strokeOpacity="0.34"
          />
          <path d="M9 24 Q42 34 75 24" fill="none" stroke="var(--room-trim)" strokeOpacity="0.4" />
          <path d="M26 30 V44 M42 32 V46 M58 30 V44" fill="none" stroke="var(--room-trim)" strokeOpacity="0.22" />
          <ellipse cx="42" cy="15" rx="5" ry="2" fill="var(--room-decor-accent)" opacity="0.8" />
        </svg>

        {/* Brass-banded spyglass on a tripod, trained on the hills */}
        <svg
          viewBox="0 0 150 200"
          className="srf-room-prop-left hidden xl:block absolute left-[41.2%] bottom-[-10px] w-[128px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="75" cy="190" rx="52" ry="6" fill="var(--room-shadow-tint)" opacity="0.2" />
          <g fill="none" stroke="var(--room-furniture-leg)" strokeWidth="3.5" strokeLinecap="round">
            <line x1="75" y1="98" x2="38" y2="188" />
            <line x1="75" y1="98" x2="112" y2="188" />
            <line x1="75" y1="98" x2="80" y2="184" />
          </g>
          <line x1="52" y1="152" x2="98" y2="152" stroke="var(--room-furniture-leg)" strokeWidth="2" opacity="0.7" />
          <g transform="rotate(-22 75 88)">
            <rect x="12" y="83" width="16" height="10" rx="4" fill="var(--room-furniture-leg)" />
            <rect x="24" y="79" width="100" height="18" rx="9" fill="var(--room-decor-primary)" />
            <rect x="62" y="79" width="7" height="18" fill="var(--room-decor-accent)" />
            <rect x="114" y="74" width="18" height="28" rx="5" fill="var(--room-decor-accent)" />
            <rect x="30" y="82" width="78" height="3" rx="1.5" fill="var(--room-light-tint)" opacity="0.3" />
          </g>
          <circle cx="75" cy="98" r="6.5" fill="var(--room-furniture-leg)" />
        </svg>

        <svg
          viewBox="0 0 260 170"
          className="srf-room-prop-right absolute right-[2%] lg:right-[3.5%] bottom-[-12px] w-[140px] lg:w-[168px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="145" cy="158" rx="92" ry="9" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="28" y="130" width="210" height="12" rx="2" fill="var(--room-furniture)" opacity="0.95" />
          <rect x="28" y="139" width="210" height="3" fill="var(--room-furniture-leg)" opacity="0.35" />
          <rect x="46" y="142" width="14" height="18" fill="var(--room-furniture-leg)" opacity="0.88" />
          <rect x="206" y="142" width="14" height="18" fill="var(--room-furniture-leg)" opacity="0.88" />
          <rect x="52" y="122" width="58" height="8" rx="4" fill="var(--room-textile-primary)" opacity="0.9" />
          {/* Travel books + a small framed postcard */}
          <rect x="58" y="116" width="44" height="6" rx="1" fill="var(--room-decor-accent)" opacity="0.8" />
          <rect x="62" y="111" width="36" height="5" rx="1" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.3" />
          <rect x="116" y="100" width="24" height="30" rx="1" fill="var(--room-wall-highlight)" stroke="var(--room-furniture-leg)" strokeWidth="2" />
          <path d="M119 124 Q126 114 131 120 T137 118 V127 H119 Z" fill="var(--room-decor-primary)" opacity="0.6" />
          <circle cx="133" cy="108" r="2.5" fill="var(--room-decor-accent)" opacity="0.8" />
          <path
            d="M168 78 C164 84, 150 96, 150 114 C150 124, 158 130, 178 130 C198 130, 206 124, 206 114 C206 96, 192 84, 188 78 Z"
            fill="var(--room-decor-primary)"
          />
          <ellipse cx="178" cy="108" rx="22" ry="4" fill="var(--room-decor-accent)" opacity="0.58" />
          {/* Wild grasses in the vessel */}
          <g fill="none" stroke="var(--room-foliage)" strokeWidth="1.8" strokeLinecap="round">
            <path d="M174 78 C170 58, 162 44, 150 32" />
            <path d="M178 78 C178 54, 180 38, 184 22" />
            <path d="M182 78 C188 60, 198 48, 210 40" />
          </g>
        </svg>
      </div>
    </div>
  );
};

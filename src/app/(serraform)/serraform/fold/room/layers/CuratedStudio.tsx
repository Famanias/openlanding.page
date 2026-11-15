'use client';

import React from 'react';
import { DustMotes, FloorPlane, RectRug, WallBase } from './shared';

const CHIPS = [
  'var(--room-decor-primary)',
  'var(--room-decor-accent)',
  'var(--room-furniture)',
  'var(--room-foliage)',
] as const;

const TAPE = 'color-mix(in srgb, var(--room-light-tint) 62%, var(--room-trim))';
const CARD_SHADOW = '0 8px 16px -10px color-mix(in srgb, var(--room-shadow-tint) 46%, transparent)';
const CARD_BORDER = 'color-mix(in srgb, var(--room-trim) 30%, transparent)';

const CROP_MARKS = [
  '-top-[15px] -left-[15px] border-r border-b',
  '-top-[15px] -right-[15px] border-l border-b',
] as const;

export const CuratedStudio: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="curatedStudio">
      {/* Layer 1: Tailored harmonized atelier backdrop framing uploaded user artwork cleanly */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <WallBase angle={172} quiet={0.78} crown={false} />

        {/* Backdrop paper roll hung above the alcove */}
        <div
          className="hidden lg:block absolute left-[37.4%] right-[10.4%] top-[4.6%] h-[13px] rounded-full"
          style={{
            background:
              'linear-gradient(180deg, var(--room-wall-highlight) 0%, color-mix(in srgb, var(--room-textile-primary) 70%, var(--room-wall-shadow)) 100%)',
            boxShadow: '0 6px 12px -6px color-mix(in srgb, var(--room-shadow-tint) 40%, transparent)',
          }}
        >
          <span className="absolute -left-[5px] top-[2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: 'var(--room-furniture-leg)' }} />
          <span className="absolute -right-[5px] top-[2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: 'var(--room-furniture-leg)' }} />
        </div>

        {/* Soft vertical textile studio alcove behind divider */}
        <div
          className="srf-room-alcove-panel absolute left-[8%] right-[8%] top-[28%] lg:left-[38%] lg:right-[11%] lg:top-[8%] bottom-0 rounded-t-[24px] lg:rounded-t-[6px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-textile-primary) 46%, var(--room-wall-shadow)) 0%, var(--room-wall-shadow) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 28%, transparent)',
          }}
        >
          {/* Registration crop marks + a measuring scale down the edge */}
          {CROP_MARKS.map((cls) => (
            <span
              key={cls}
              className={`hidden lg:block absolute w-[10px] h-[10px] ${cls}`}
              style={{ borderColor: 'color-mix(in srgb, var(--room-trim) 60%, transparent)' }}
            />
          ))}
          <div
            className="absolute left-[9px] top-[26px] bottom-0 w-[7px]"
            style={{
              background:
                'repeating-linear-gradient(180deg, color-mix(in srgb, var(--room-trim) 42%, transparent) 0 1px, transparent 1px 12px)',
            }}
          />
          <div
            className="absolute left-[9px] top-[26px] bottom-0 w-[13px]"
            style={{
              background:
                'repeating-linear-gradient(180deg, color-mix(in srgb, var(--room-trim) 42%, transparent) 0 1px, transparent 1px 60px)',
            }}
          />
        </div>
      </div>

      {/* Layer 2: Balanced studio daylight, softbox throw, pinned reference wall */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-55"
          style={{
            background:
              'radial-gradient(ellipse 64% 68% at 64% 42%, var(--room-light-tint) 0%, transparent 74%)',
          }}
        />

        {/* Light thrown from the softbox toward the divider */}
        <div
          className="srf-room-breathe hidden xl:block absolute left-[43%] w-[30%] top-[30%] h-[58%]"
          style={{ animationDuration: '8s' }}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: 'calc(0.34 * var(--room-glow, 1))',
              background: 'linear-gradient(90deg, var(--room-light-tint) 0%, transparent 92%)',
              clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 52%)',
            }}
          />
        </div>

        {/* Reference wall: taped cards and palette chips that lift slightly in the air */}
        <div className="srf-room-prop-right hidden xl:block absolute right-[1.5%] top-[10%] w-[122px] h-[206px]">
          <div className="absolute left-0 top-0 w-[66px] rotate-[-4deg]">
            <div
              className="srf-room-sway-soft p-[5px] pb-[14px] border"
              style={{ backgroundColor: 'var(--room-wall-highlight)', borderColor: CARD_BORDER, boxShadow: CARD_SHADOW }}
            >
              <div
                className="h-[56px]"
                style={{
                  background:
                    'linear-gradient(160deg, var(--room-decor-primary) 0%, var(--room-decor-accent) 100%)',
                }}
              />
            </div>
            <span className="absolute left-1/2 -ml-[13px] -top-[5px] w-[26px] h-[9px] rotate-[3deg]" style={{ backgroundColor: TAPE, opacity: 0.85 }} />
          </div>

          <div className="absolute left-[54px] top-[34px] w-[62px] rotate-[5deg]">
            <div
              className="srf-room-sway-soft p-[5px] border"
              style={{
                backgroundColor: 'var(--room-wall-highlight)',
                borderColor: CARD_BORDER,
                boxShadow: CARD_SHADOW,
                animationDuration: '13s',
                animationDelay: '-4s',
              }}
            >
              <div
                className="h-[48px]"
                style={{
                  background:
                    'radial-gradient(circle at 68% 36%, var(--room-light-tint) 0 9px, transparent 10px), linear-gradient(180deg, var(--room-textile-secondary) 0 58%, var(--room-furniture) 58% 78%, var(--room-foliage) 78%)',
                }}
              />
            </div>
            <span className="absolute left-1/2 -ml-[12px] -top-[5px] w-[24px] h-[9px] rotate-[-6deg]" style={{ backgroundColor: TAPE, opacity: 0.85 }} />
          </div>

          <div
            className="absolute left-[4px] top-[108px] w-[108px] p-[6px] border flex gap-[4px]"
            style={{ backgroundColor: 'var(--room-wall-highlight)', borderColor: CARD_BORDER, boxShadow: CARD_SHADOW }}
          >
            {CHIPS.map((color) => (
              <span key={color} className="flex-1 h-[30px] rounded-[1px]" style={{ backgroundColor: color }} />
            ))}
          </div>

          <div className="absolute left-[56px] top-[160px] w-[52px] rotate-[-3deg]">
            <div
              className="srf-room-sway-soft p-[7px] space-y-[5px] border"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--room-textile-primary) 70%, var(--room-wall-highlight))',
                borderColor: CARD_BORDER,
                boxShadow: CARD_SHADOW,
                animationDuration: '11s',
                animationDelay: '-7s',
              }}
            >
              <span className="block h-[2px] w-full" style={{ backgroundColor: 'var(--room-text-secondary)', opacity: 0.55 }} />
              <span className="block h-[2px] w-[76%]" style={{ backgroundColor: 'var(--room-text-secondary)', opacity: 0.4 }} />
              <span className="block h-[2px] w-[52%]" style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.7 }} />
            </div>
            <span className="absolute left-[8px] -top-[5px] w-[20px] h-[8px] rotate-[8deg]" style={{ backgroundColor: TAPE, opacity: 0.85 }} />
          </div>

          <div className="absolute left-[6px] top-[158px] w-[40px] h-[40px] rotate-[6deg]">
            <div
              className="srf-room-sway-soft w-full h-full border"
              style={{
                backgroundColor: 'var(--room-decor-accent)',
                borderColor: CARD_BORDER,
                boxShadow: CARD_SHADOW,
                animationDuration: '9s',
                animationDelay: '-2s',
              }}
            />
            <span className="absolute left-1/2 -ml-[10px] -top-[5px] w-[20px] h-[8px] rotate-[-4deg]" style={{ backgroundColor: TAPE, opacity: 0.85 }} />
          </div>
        </div>

        <DustMotes className="left-[4%] right-[2%] lg:left-[36%] top-[34%] lg:top-[5%] bottom-[26%]" count={10} />
      </div>

      {/* Layer 3 & 4: Mineral studio floor, position tape & woven studio mat */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 50%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <FloorPlane variant="planks" opacity={0.36} />
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Studio marks taped to the floor */}
        <svg
          viewBox="0 0 40 16"
          className="hidden lg:block absolute left-[33%] top-[26%] w-[40px] h-auto"
          aria-hidden="true"
        >
          <path d="M4 3 L36 13 M36 3 L4 13" fill="none" stroke="var(--room-rug-trim)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        </svg>
        <svg
          viewBox="0 0 40 16"
          className="hidden lg:block absolute left-[18%] top-[54%] w-[52px] h-auto"
          aria-hidden="true"
        >
          <path d="M4 12 H30 M30 12 L36 3" fill="none" stroke="var(--room-rug-trim)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        </svg>

        <RectRug
          className="left-[10%] right-[10%] lg:left-[41%] lg:right-[8%] top-[12%] h-[54%]"
          fringe={false}
        />
      </div>

      {/* Layer 5: Softbox on a stand, studio plinth + vessel, rolled backdrops */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <div className="srf-room-prop-left hidden xl:block absolute left-[36.4%] bottom-[-10px] w-[150px]">
          {/* Softbox glow */}
          <div
            className="srf-room-breathe absolute left-[55%] top-[27%] w-[210px] h-[210px] -ml-[105px] -mt-[105px]"
            style={{ animationDuration: '8s' }}
          >
            <div className="srf-room-glow-pool inset-0" />
          </div>
          <svg viewBox="0 0 160 320" className="relative block w-full h-auto" aria-hidden="true">
            <ellipse cx="72" cy="312" rx="50" ry="6" fill="var(--room-shadow-tint)" opacity="0.2" />
            <g fill="none" stroke="var(--room-furniture-leg)" strokeLinecap="round">
              <line x1="70" y1="122" x2="70" y2="300" strokeWidth="3.4" />
              <line x1="70" y1="262" x2="34" y2="310" strokeWidth="3" />
              <line x1="70" y1="262" x2="106" y2="310" strokeWidth="3" />
              <line x1="70" y1="262" x2="76" y2="312" strokeWidth="3" />
            </g>
            <circle cx="70" cy="122" r="6" fill="var(--room-furniture-leg)" />
            <polygon points="40,60 100,42 112,120 54,138" fill="var(--room-furniture-leg)" />
            <polygon
              points="56,56 108,40 120,116 70,132"
              fill="color-mix(in srgb, var(--room-light-tint) 90%, var(--room-decor-accent))"
              stroke="var(--room-trim)"
              strokeOpacity="0.5"
            />
            <g fill="none" stroke="var(--room-trim)" strokeOpacity="0.22">
              <path d="M73.3 50.7 L86.7 126.7 M90.7 45.3 L103.3 121.3" />
              <path d="M60.7 81.3 L112 65.3 M65.3 106.7 L116 90.7" />
            </g>
            {/* Sandbag steadying the stand */}
            <ellipse cx="96" cy="306" rx="17" ry="7" fill="var(--room-decor-accent)" opacity="0.85" />
            <path d="M84 304 Q96 298 108 304" fill="none" stroke="var(--room-shadow-tint)" strokeOpacity="0.3" />
          </svg>
        </div>

        <svg
          viewBox="0 0 210 190"
          className="srf-room-prop-right absolute right-[2.5%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[136px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="110" cy="176" rx="64" ry="8" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="66" y="118" width="88" height="58" rx="4" fill="var(--room-furniture)" />
          <rect x="66" y="118" width="7" height="58" fill="var(--room-light-tint)" opacity="0.16" />
          <rect x="66" y="170" width="88" height="6" rx="2" fill="var(--room-furniture-leg)" opacity="0.68" />
          <path
            d="M95 72 C92 86, 86 96, 86 108 C86 114, 96 118, 110 118 C124 118, 134 114, 134 108 C134 96, 128 86, 125 72 Z"
            fill="var(--room-decor-primary)"
          />
          <ellipse cx="110" cy="98" rx="18" ry="3.5" fill="var(--room-decor-accent)" opacity="0.65" />
          {/* Brushes standing in the vessel */}
          <g strokeLinecap="round">
            <line x1="104" y1="72" x2="96" y2="34" stroke="var(--room-furniture-leg)" strokeWidth="2.4" />
            <line x1="110" y1="72" x2="112" y2="28" stroke="var(--room-furniture-leg)" strokeWidth="2.4" />
            <line x1="116" y1="72" x2="126" y2="38" stroke="var(--room-furniture-leg)" strokeWidth="2.4" />
            <line x1="96" y1="34" x2="94.4" y2="26" stroke="var(--room-decor-accent)" strokeWidth="4" />
            <line x1="112" y1="28" x2="112.4" y2="20" stroke="var(--room-textile-secondary)" strokeWidth="4" />
            <line x1="126" y1="38" x2="128.2" y2="30" stroke="var(--room-decor-primary)" strokeWidth="4" />
          </g>
          {/* Colour-test tiles leaning on the plinth */}
          <rect x="30" y="150" width="24" height="26" fill="var(--room-decor-accent)" transform="rotate(-8 42 176)" />
          <rect x="44" y="154" width="20" height="22" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.4" transform="rotate(-3 54 176)" />
        </svg>

        {/* Rolled backdrops leaning in the corner */}
        <svg
          viewBox="0 0 60 176"
          className="srf-room-prop-right hidden xl:block absolute right-[0.4%] bottom-[-10px] w-[50px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="30" cy="170" rx="26" ry="4" fill="var(--room-shadow-tint)" opacity="0.18" />
          <rect x="10" y="18" width="10" height="152" rx="5" fill="var(--room-textile-primary)" stroke="var(--room-trim)" strokeOpacity="0.4" transform="rotate(-6 15 170)" />
          <rect x="27" y="42" width="10" height="128" rx="5" fill="var(--room-decor-accent)" opacity="0.9" transform="rotate(4 32 170)" />
          <rect x="41" y="62" width="9" height="108" rx="4.5" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.4" transform="rotate(10 45 170)" />
        </svg>
      </div>
    </div>
  );
};

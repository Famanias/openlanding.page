'use client';

import React from 'react';
import { DustMotes, FloorPlane, Pendant, RectRug, WallBase } from './shared';

interface EditorialLoftProps {
  motifRatio: number;
}

const FIN_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const TRACK_HEADS = [10, 37, 64, 90] as const;

export const EditorialLoft: React.FC<EditorialLoftProps> = ({ motifRatio }) => {
  const finGapFactor = Math.max(0.84, Math.min(1.18, 0.92 + (motifRatio - 1) * 0.24));

  return (
    <div className="srf-room-layer-root" data-room-family="editorialLoft">
      {/* Layer 1: Architectural concrete / limewash back wall (supports dark loft mood) */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <WallBase angle={178} quiet={0.78} crown={false} />

        {/* Repeating vertical architectural wall fins / timber ribs in center-right bay */}
        <div
          className="srf-room-ribs-bay absolute left-[6%] right-[6%] top-[22%] lg:left-[38%] lg:right-[6%] lg:top-[4%] bottom-0 flex justify-between items-stretch px-3 pointer-events-none"
          style={{ gap: `${Math.round(14 * finGapFactor)}px` }}
          aria-hidden="true"
        >
          {FIN_INDICES.map((idx) => (
            <div
              key={idx}
              className="srf-room-rib-fin flex-1 max-w-[16px] border-r"
              style={{
                animationDelay: `${idx * 28}ms`,
                background:
                  'linear-gradient(90deg, color-mix(in srgb, var(--room-wall-shadow) 88%, transparent) 0%, color-mix(in srgb, var(--room-wall-base) 42%, transparent) 100%)',
                borderColor: 'color-mix(in srgb, var(--room-trim) 26%, transparent)',
              }}
            />
          ))}
        </div>

        {/* Ceiling lighting track with adjustable spot heads */}
        <div
          className="hidden lg:block absolute top-[14px] left-[40%] right-[4%] h-[3px] rounded-full"
          style={{ backgroundColor: 'var(--room-furniture-leg)' }}
        >
          {TRACK_HEADS.map((left) => (
            <span
              key={left}
              className="absolute top-[3px] w-[9px] h-[16px] rounded-b-[3px] origin-top rotate-[14deg]"
              style={{ left: `${left}%`, backgroundColor: 'var(--room-furniture-leg)' }}
            >
              <span
                className="absolute inset-x-[2px] bottom-0 h-[3px] rounded-full"
                style={{ backgroundColor: 'var(--room-light-tint)', opacity: 0.85 }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Layer 2: Crisp diagonal architectural daylight blade sweeping across loft wall */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <div className="srf-room-blade-sweep absolute inset-0">
          <svg
            viewBox="0 0 1440 620"
            preserveAspectRatio="xMidYMid slice"
            className="srf-room-light-blade absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="srf-loft-blade" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="var(--room-light-tint)" stopOpacity="0.36" />
                <stop offset="52%" stopColor="var(--room-ambient-tint)" stopOpacity="0.16" />
                <stop offset="100%" stopColor="var(--room-light-tint)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="730,0 990,0 1380,620 960,620" fill="url(#srf-loft-blade)" />
            <polygon
              points="1030,0 1135,0 1430,620 1310,620"
              fill="var(--room-light-tint)"
              opacity="0.14"
            />
            <polygon points="640,0 672,0 900,620 846,620" fill="var(--room-light-tint)" opacity="0.1" />
          </svg>
        </div>

        {/* Minimal rectilinear gallery relief frame tucked right of rib bay */}
        <div
          className="hidden xl:block absolute right-[4.5%] top-[16%] w-[112px] h-[146px] border"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--room-textile-primary) 58%, var(--room-wall-shadow))',
            borderColor: 'color-mix(in srgb, var(--room-trim) 48%, transparent)',
            boxShadow: '12px 16px 26px -18px color-mix(in srgb, var(--room-shadow-tint) 46%, transparent)',
          }}
        >
          <div
            className="absolute inset-3 border"
            style={{ borderColor: 'color-mix(in srgb, var(--room-decor-primary) 48%, transparent)' }}
          >
            <div
              className="absolute inset-y-4 left-[22%] w-[5px]"
              style={{ backgroundColor: 'var(--room-decor-primary)', opacity: 0.78 }}
            />
            <div
              className="absolute inset-y-4 left-[36%] w-[2px]"
              style={{ backgroundColor: 'var(--room-decor-primary)', opacity: 0.72 }}
            />
            <div
              className="absolute inset-y-4 left-[58%] w-[2px]"
              style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.56 }}
            />
            <div
              className="absolute inset-y-4 left-[70%] w-[8px]"
              style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Small landscape proof hung beneath it */}
        <div
          className="hidden xl:block absolute right-[5.7%] top-[46.5%] w-[78px] h-[56px] border"
          style={{
            backgroundColor: 'var(--room-wall-highlight)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 48%, transparent)',
            boxShadow: '8px 12px 20px -14px color-mix(in srgb, var(--room-shadow-tint) 46%, transparent)',
          }}
        >
          <div
            className="absolute inset-[7px]"
            style={{
              background:
                'repeating-linear-gradient(180deg, var(--room-decor-primary) 0 4px, transparent 4px 9px, var(--room-decor-accent) 9px 11px, transparent 11px 17px)',
              opacity: 0.7,
            }}
          />
        </div>

        {/* Two pendants on long cords, swinging slightly out of step */}
        <Pendant className="hidden xl:block left-[33.4%]" shade="dome" cord={92} width={66} />
        <Pendant
          className="hidden xl:block left-[38.6%]"
          shade="globe"
          cord={148}
          width={48}
          duration={9}
          delay={-3}
        />

        <DustMotes className="left-[4%] right-[2%] lg:left-[36%] top-[34%] lg:top-[5%] bottom-[26%]" count={10} />
      </div>

      {/* Layer 3 & 4: Scored architectural floor slab + striped runner rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <FloorPlane variant="slab" opacity={0.42} />
        <div
          className="absolute inset-x-0 top-0 h-[3px] opacity-42"
          style={{ backgroundColor: 'var(--room-shadow-tint)' }}
        />

        {/* Polished-slab sheen under the light blade */}
        <div className="srf-room-breathe absolute left-[56%] w-[40%] top-0 h-[70%]" style={{ animationDuration: '14s' }}>
          <div
            className="absolute inset-0"
            style={{
              opacity: 'calc(0.3 * var(--room-glow, 1))',
              background:
                'linear-gradient(180deg, var(--room-light-tint) 0%, transparent 86%)',
              clipPath: 'polygon(6% 0, 46% 0, 100% 100%, 52% 100%)',
            }}
          />
        </div>

        {/* Linear studio woven runner beneath divider */}
        <RectRug
          className="left-[10%] right-[10%] lg:left-[41%] lg:right-[8%] top-[11%] h-[54%]"
          variant="stripes"
        />
      </div>

      {/* Layer 5: Leaning print + reading stack on the left, bench + vessel on the right */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        {/* Oversized framed stripe study leaning against the ribs */}
        <svg
          viewBox="0 0 170 230"
          className="srf-room-prop-left hidden xl:block absolute left-[36.8%] bottom-[-10px] w-[146px] h-auto"
          aria-hidden="true"
        >
          <polygon points="30,18 152,12 162,224 22,224" fill="var(--room-shadow-tint)" opacity="0.16" />
          <polygon points="20,14 142,8 150,220 12,220" fill="var(--room-furniture-leg)" />
          <polygon points="28,22 135,17 142,212 20,212" fill="var(--room-wall-highlight)" />
          <polygon points="38,34 126,30 132,200 31,200" fill="var(--room-textile-primary)" />
          <polygon points="45,33.7 55.6,33.2 51.2,200 39.1,200" fill="var(--room-decor-primary)" />
          <polygon points="64.4,32.8 69.7,32.6 67.4,200 61.3,200" fill="var(--room-decor-accent)" opacity="0.85" />
          <polygon points="78.5,32.2 94.3,31.4 95.6,200 77.5,200" fill="var(--room-decor-primary)" />
          <polygon points="101.4,31.1 106.6,30.9 109.8,200 103.7,200" fill="var(--room-decor-accent)" opacity="0.85" />
          <polygon points="113.7,30.6 120.7,30.2 125.9,200 117.9,200" fill="var(--room-decor-primary)" opacity="0.7" />
          <polygon points="20,14 30,14 22,220 12,220" fill="var(--room-light-tint)" opacity="0.14" />
        </svg>

        {/* Stack of magazines with a cup resting on top */}
        <svg
          viewBox="0 0 76 56"
          className="srf-room-prop-left hidden xl:block absolute left-[47.4%] bottom-[-10px] w-[66px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="38" cy="50" rx="34" ry="4" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="6" y="40" width="64" height="9" rx="1.5" fill="var(--room-furniture)" />
          <rect x="6" y="40" width="5" height="9" fill="var(--room-furniture-leg)" opacity="0.5" />
          <rect x="10" y="31" width="58" height="9" rx="1.5" fill="var(--room-decor-accent)" />
          <rect x="4" y="22" width="60" height="9" rx="1.5" fill="var(--room-textile-secondary)" stroke="var(--room-trim)" strokeOpacity="0.3" />
          <rect x="4" y="22" width="5" height="9" fill="var(--room-decor-primary)" opacity="0.7" />
          <rect x="24" y="8" width="17" height="14" rx="2" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.4" />
          <path d="M41 11 Q48 12 41 18" fill="none" stroke="var(--room-trim)" strokeOpacity="0.5" strokeWidth="1.6" />
        </svg>

        <svg
          viewBox="0 0 240 190"
          className="srf-room-prop-right absolute right-[2%] lg:right-[3.5%] bottom-[-12px] w-[124px] lg:w-[152px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="122" cy="176" rx="82" ry="9" fill="var(--room-shadow-tint)" opacity="0.24" />
          <rect x="44" y="138" width="156" height="14" fill="var(--room-furniture)" />
          <rect x="44" y="149" width="156" height="3" fill="var(--room-furniture-leg)" opacity="0.4" />
          <rect x="56" y="152" width="12" height="24" fill="var(--room-furniture-leg)" />
          <rect x="176" y="152" width="12" height="24" fill="var(--room-furniture-leg)" />
          {/* Textile throw + two slim catalogues */}
          <rect x="58" y="128" width="48" height="10" rx="2" fill="var(--room-textile-secondary)" opacity="0.92" />
          <rect x="62" y="122" width="40" height="6" rx="1" fill="var(--room-decor-accent)" opacity="0.8" />
          <rect x="60" y="117" width="38" height="5" rx="1" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.3" />
          {/* Cylindrical matte vessel on right edge of bench */}
          <rect x="136" y="76" width="38" height="62" rx="3" fill="var(--room-decor-primary)" />
          <rect x="136" y="96" width="38" height="8" fill="var(--room-decor-accent)" opacity="0.82" />
          <rect x="140" y="78" width="8" height="58" fill="var(--room-light-tint)" opacity="0.22" />
          {/* Dried stems standing in the vessel */}
          <g fill="none" stroke="var(--room-furniture-leg)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M152 78 C150 54, 144 36, 136 18" />
            <path d="M156 78 C158 52, 164 34, 174 20" />
            <path d="M154 78 C154 56, 155 40, 156 26" />
          </g>
          <g fill="var(--room-decor-accent)" opacity="0.85">
            <circle cx="136" cy="18" r="4" />
            <circle cx="174" cy="20" r="4" />
            <circle cx="156" cy="26" r="3.5" />
            <circle cx="142" cy="34" r="3" />
            <circle cx="167" cy="36" r="3" />
          </g>
        </svg>
      </div>
    </div>
  );
};

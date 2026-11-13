'use client';

import React from 'react';

interface EditorialLoftProps {
  motifRatio: number;
}

const FIN_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export const EditorialLoft: React.FC<EditorialLoftProps> = ({ motifRatio }) => {
  const finGapFactor = Math.max(0.84, Math.min(1.18, 0.92 + (motifRatio - 1) * 0.24));

  return (
    <div className="srf-room-layer-root" data-room-family="editorialLoft">
      {/* Layer 1: Architectural concrete / limewash back wall (supports dark loft mood) */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(178deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left soft wash behind headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.78,
          }}
        />

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
      </div>

      {/* Layer 2: Crisp diagonal architectural daylight blade sweeping across loft wall */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
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
        </svg>

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
              className="absolute inset-y-4 left-[36%] w-[2px]"
              style={{ backgroundColor: 'var(--room-decor-primary)', opacity: 0.72 }}
            />
            <div
              className="absolute inset-y-4 left-[58%] w-[2px]"
              style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.56 }}
            />
          </div>
        </div>
      </div>

      {/* Layer 3 & 4: Scored architectural floor slab + runner rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[3px] opacity-42"
          style={{ backgroundColor: 'var(--room-shadow-tint)' }}
        />

        {/* Perspective architectural slab seams */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-24 pointer-events-none"
          aria-hidden="true"
        >
          <line x1="0" y1="92" x2="1440" y2="92" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="0" y1="205" x2="1440" y2="205" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="560" y1="0" x2="360" y2="320" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="920" y1="0" x2="1120" y2="320" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="1180" y1="0" x2="1430" y2="320" stroke="var(--room-floor-detail)" strokeWidth="1" />
        </svg>

        {/* Linear studio woven runner beneath divider */}
        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[41%] lg:right-[8%] top-[11%] h-[54%] border-t-2 border-b-2"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--room-rug) 78%, transparent)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 42%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Grounded minimal bench + cylindrical vessel */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 240 190"
          className="srf-room-prop-right absolute right-[2%] lg:right-[3.5%] bottom-[-12px] w-[124px] lg:w-[152px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="122" cy="176" rx="82" ry="9" fill="var(--room-shadow-tint)" opacity="0.24" />
          <rect x="44" y="138" width="156" height="14" fill="var(--room-furniture)" />
          <rect x="56" y="152" width="12" height="24" fill="var(--room-furniture-leg)" />
          <rect x="176" y="152" width="12" height="24" fill="var(--room-furniture-leg)" />
          {/* Textile throw */}
          <rect x="58" y="128" width="48" height="10" rx="2" fill="var(--room-textile-secondary)" opacity="0.92" />
          {/* Cylindrical matte vessel on right edge of bench */}
          <rect x="136" y="76" width="38" height="62" rx="3" fill="var(--room-decor-primary)" />
          <rect x="136" y="96" width="38" height="8" fill="var(--room-decor-accent)" opacity="0.82" />
          <rect x="140" y="78" width="8" height="58" fill="var(--room-light-tint)" opacity="0.22" />
        </svg>
      </div>
    </div>
  );
};

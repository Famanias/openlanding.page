'use client';

import React from 'react';

export const BotanicalAtelier: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="botanicalAtelier">
      {/* Layer 1: Mineral plaster wall + soft center-right recessed plaster arch */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(165deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 62%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 85% 90% at 24% 46%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.72,
          }}
        />

        {/* Recessed architectural half-arch niche framing center-right divider */}
        <div
          className="srf-room-arch-niche absolute left-[6%] right-[6%] top-[24%] lg:left-[37%] lg:right-[13%] lg:top-[6%] bottom-0 rounded-t-[180px] lg:rounded-t-[999px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, var(--room-wall-shadow) 0%, color-mix(in srgb, var(--room-wall-shadow) 68%, var(--room-wall-base)) 76%, color-mix(in srgb, var(--room-ambient-tint) 82%, var(--room-shadow-tint)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow:
              'inset 14px 16px 36px -22px color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Pleated textile curtain drape on right edge + afternoon dappled leaf shadows */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 620"
          preserveAspectRatio="xMidYMid slice"
          className="srf-room-dapple srf-room-drift-slow absolute inset-0 w-full h-full opacity-[0.26]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="srf-botanical-beam" x1="0%" y1="0%" x2="100%" y2="85%">
              <stop offset="0%" stopColor="var(--room-light-tint)" stopOpacity="0.88" />
              <stop offset="55%" stopColor="var(--room-ambient-tint)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--room-light-tint)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="560,0 1080,0 1280,620 420,620" fill="url(#srf-botanical-beam)" />
          <g fill="var(--room-shadow-tint)" opacity="0.24">
            <ellipse cx="940" cy="145" rx="46" ry="18" transform="rotate(-24 940 145)" />
            <ellipse cx="1010" cy="188" rx="54" ry="20" transform="rotate(-14 1010 188)" />
            <ellipse cx="892" cy="210" rx="38" ry="14" transform="rotate(-36 892 210)" />
            <ellipse cx="965" cy="252" rx="44" ry="16" transform="rotate(-18 965 252)" />
          </g>
        </svg>

        {/* Translucent pleated textile drape on right edge */}
        <div
          className="srf-room-drape hidden sm:block absolute top-0 bottom-0 right-0 w-[13%] lg:w-[11%] opacity-90"
          style={{
            background:
              'repeating-linear-gradient(90deg, color-mix(in srgb, var(--room-textile-primary) 86%, transparent) 0px, color-mix(in srgb, var(--room-light-tint) 52%, var(--room-textile-primary)) 12px, color-mix(in srgb, var(--room-textile-secondary) 72%, var(--room-wall-shadow)) 22px)',
            borderLeft: '1px solid color-mix(in srgb, var(--room-trim) 34%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent 0%, black 22%, black 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 22%, black 100%)',
          }}
        />
      </div>

      {/* Layer 3 & 4: Unified horizon baseboard, mineral floor plane & spread-responsive boucle rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 44%, color-mix(in srgb, var(--room-floor-detail) 55%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-40"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Woven boucle elliptical rug centered beneath the 16-panel divider */}
        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[40%] lg:right-[6%] top-[10%] h-[58%] rounded-[999px] border-2"
          style={{
            background:
              'radial-gradient(ellipse 92% 86% at 50% 45%, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 72%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 36%, transparent)',
            boxShadow:
              '0 18px 34px -22px color-mix(in srgb, var(--room-shadow-tint) 38%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Grounded ceramic ikebana vessel + foliage + upholstered studio bench */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 260 150"
          className="srf-room-prop-right hidden xl:block absolute right-[2.5%] bottom-[-14px] w-[150px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="145" cy="136" rx="88" ry="11" fill="var(--room-shadow-tint)" opacity="0.18" />
          <rect x="86" y="102" width="12" height="32" rx="4" fill="var(--room-furniture-leg)" opacity="0.92" />
          <rect x="192" y="102" width="12" height="32" rx="4" fill="var(--room-furniture-leg)" opacity="0.92" />
          <rect
            x="68"
            y="84"
            width="154"
            height="24"
            rx="12"
            fill="var(--room-furniture)"
            stroke="var(--room-trim)"
            strokeOpacity="0.34"
          />
          {/* Accent throw bolster cushion */}
          <rect x="78" y="76" width="44" height="14" rx="7" fill="var(--room-decor-accent)" opacity="0.88" />
        </svg>

        <svg
          viewBox="0 0 220 340"
          className="srf-room-ikebana absolute right-[1.5%] lg:right-[3.5%] bottom-[-12px] w-[112px] lg:w-[138px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="122" cy="322" rx="52" ry="9" fill="var(--room-shadow-tint)" opacity="0.22" />

          <path
            d="M118 228 C114 174, 96 132, 62 72"
            fill="none"
            stroke="var(--room-trim)"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="srf-room-branch-path"
          />
          <path
            d="M122 228 C128 164, 146 112, 168 48"
            fill="none"
            stroke="var(--room-trim)"
            strokeWidth="2.1"
            strokeLinecap="round"
            className="srf-room-branch-path srf-room-branch-delay"
          />
          <path
            d="M120 162 C136 146, 164 134, 186 122"
            fill="none"
            stroke="var(--room-trim)"
            strokeWidth="1.7"
            strokeLinecap="round"
            className="srf-room-branch-path srf-room-branch-delay-2"
          />

          <g className="srf-room-foliage-cluster" fill="var(--room-foliage)">
            <ellipse cx="62" cy="70" rx="16" ry="7" transform="rotate(-38 62 70)" opacity="0.92" />
            <ellipse cx="83" cy="108" rx="15" ry="6.5" transform="rotate(-55 83 108)" opacity="0.82" />
            <ellipse cx="168" cy="46" rx="17" ry="7" transform="rotate(28 168 46)" opacity="0.9" />
            <ellipse cx="148" cy="92" rx="14" ry="6" transform="rotate(42 148 92)" opacity="0.82" />
            <ellipse cx="186" cy="122" rx="15" ry="6.5" transform="rotate(-14 186 122)" opacity="0.88" />
          </g>

          <path
            d="M98 222 C98 232, 82 246, 82 276 C82 306, 98 322, 122 322 C146 322, 162 306, 162 276 C162 246, 146 232, 146 222 Z"
            fill="var(--room-decor-primary)"
          />
          <path
            d="M84 282 Q122 292 160 282 L157 294 Q122 304 87 294 Z"
            fill="var(--room-decor-accent)"
            opacity="0.72"
          />
          <ellipse cx="122" cy="222" rx="24" ry="5" fill="var(--room-shadow-tint)" opacity="0.35" />
          <path
            d="M96 250 C92 268, 92 288, 102 308"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
};

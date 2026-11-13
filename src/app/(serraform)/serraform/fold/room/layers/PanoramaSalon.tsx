'use client';

import React from 'react';

export const PanoramaSalon: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="panoramaSalon">
      {/* Layer 1: Plaster wall + architectural dado rail */}
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
            opacity: 0.74,
          }}
        />

        <div
          className="absolute inset-x-0 top-[76%] h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Wide inset panoramic scenic window niche framed cleanly behind divider */}
        <div
          className="srf-room-panorama-frame absolute left-[6%] right-[6%] top-[34%] bottom-[8%] lg:left-[37.5%] lg:right-[4.5%] lg:top-[8%] lg:bottom-[12%] rounded-[4px] overflow-hidden border"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-light-tint) 68%, var(--room-ambient-tint)) 0%, color-mix(in srgb, var(--room-wall-shadow) 72%, var(--room-light-tint)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 34%, transparent)',
            boxShadow:
              'inset 0 18px 42px -24px color-mix(in srgb, var(--room-shadow-tint) 22%, transparent)',
          }}
        >
          <svg
            viewBox="0 0 920 380"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
            aria-hidden="true"
          >
            <circle
              cx="660"
              cy="128"
              r="52"
              fill="var(--room-light-tint)"
              opacity="0.78"
              className="srf-room-pano-layer-1"
            />
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
            <path
              d="M-40 315 Q220 264, 490 296 T960 276 L960 390 L-40 390 Z"
              fill="var(--room-decor-primary)"
              opacity="0.52"
              className="srf-room-pano-layer-3"
            />
            <path
              d="M-40 348 Q280 312, 560 342 T960 326 L960 390 L-40 390 Z"
              fill="var(--room-decor-accent)"
              opacity="0.34"
              className="srf-room-pano-layer-4"
            />
          </svg>
        </div>
      </div>

      {/* Layer 2: Soft horizontal horizon glow wash */}
      <div
        className="srf-room-depth-mid absolute inset-x-0 top-[26%] bottom-[34%] pointer-events-none opacity-42"
        style={{
          background:
            'radial-gradient(ellipse 68% 55% at 68% 60%, var(--room-light-tint) 0%, transparent 74%)',
        }}
      />

      {/* Layer 3 & 4: Wide-plank floor + woven salon rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-22 pointer-events-none"
          aria-hidden="true"
        >
          <line x1="0" y1="68" x2="1440" y2="68" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="0" y1="158" x2="1440" y2="158" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="0" y1="248" x2="1440" y2="248" stroke="var(--room-floor-detail)" strokeWidth="1" />
        </svg>

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[42%] lg:right-[7%] top-[12%] h-[52%] rounded-[4px] border-2"
          style={{
            background:
              'linear-gradient(180deg, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 74%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 34%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Grounded low bench ledge + ceramic vessel */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 260 170"
          className="srf-room-prop-right absolute right-[2%] lg:right-[3.5%] bottom-[-12px] w-[140px] lg:w-[168px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="145" cy="158" rx="92" ry="9" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="28" y="130" width="210" height="12" rx="2" fill="var(--room-furniture)" opacity="0.95" />
          <rect x="46" y="142" width="14" height="18" fill="var(--room-furniture-leg)" opacity="0.88" />
          <rect x="206" y="142" width="14" height="18" fill="var(--room-furniture-leg)" opacity="0.88" />
          <rect x="52" y="122" width="58" height="8" rx="4" fill="var(--room-textile-primary)" opacity="0.9" />
          <path
            d="M168 78 C164 84, 150 96, 150 114 C150 124, 158 130, 178 130 C198 130, 206 124, 206 114 C206 96, 192 84, 188 78 Z"
            fill="var(--room-decor-primary)"
          />
          <ellipse cx="178" cy="108" rx="22" ry="4" fill="var(--room-decor-accent)" opacity="0.58" />
        </svg>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { DustMotes, FloorLight, FloorPlane, WallBase } from './shared';

// [cx, cy, rotation, rx] — leaf shadows cast on the wall by the window branch
const SHADE_LEAVES: ReadonlyArray<readonly [number, number, number, number]> = [
  [352, 40, -30, 30],
  [300, 62, -12, 34],
  [250, 48, -40, 28],
  [330, 104, -55, 30],
  [272, 118, -20, 36],
  [212, 96, -34, 30],
  [176, 140, -10, 32],
  [236, 170, -48, 30],
  [300, 168, -25, 34],
  [150, 82, -28, 26],
  [120, 128, -42, 28],
  [196, 214, -18, 30],
  [262, 232, -36, 28],
  [96, 180, -8, 24],
];

// [cx, cy, rotation] — trailing vine leaves on the hanging planter
const VINE_LEAVES: ReadonlyArray<readonly [number, number, number]> = [
  [30, 128, -50],
  [24, 152, 30],
  [28, 174, -40],
  [20, 196, 20],
  [92, 124, 50],
  [94, 148, -30],
  [92, 170, 45],
  [100, 188, -20],
  [58, 140, -30],
  [64, 162, 35],
  [58, 186, -35],
  [62, 212, 20],
];

// [cx, cy, rotation, rx] — fronds spilling over the planter rim
const PLANTER_FRONDS: ReadonlyArray<readonly [number, number, number, number]> = [
  [44, 80, -60, 12],
  [56, 72, -80, 13],
  [70, 74, -100, 13],
  [80, 82, -125, 12],
  [36, 88, -30, 10],
  [88, 90, -150, 10],
];

// [cx, cy, rotation] — olive canopy
const OLIVE_LEAVES: ReadonlyArray<readonly [number, number, number]> = [
  [62, 98, -50],
  [52, 90, 20],
  [70, 86, -70],
  [58, 76, -30],
  [46, 72, 40],
  [66, 66, -80],
  [54, 58, -20],
  [40, 56, 60],
  [62, 48, -60],
  [50, 40, 10],
  [112, 110, -40],
  [122, 100, 30],
  [104, 98, -75],
  [118, 88, -20],
  [128, 82, 50],
  [108, 80, -60],
  [120, 70, -10],
  [132, 64, 40],
  [112, 60, -70],
  [86, 68, -50],
  [96, 58, 20],
  [78, 54, -80],
  [90, 44, -30],
  [100, 38, 45],
  [82, 34, -65],
  [92, 24, -10],
  [74, 26, 35],
  [86, 14, -45],
  [68, 42, 15],
  [100, 50, -25],
];

const Blossom: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 5 }) => (
  <g>
    {[0, 72, 144, 216, 288].map((deg) => (
      <circle
        key={deg}
        cx={x + Math.round(Math.cos((deg * Math.PI) / 180) * r * 100) / 100}
        cy={y + Math.round(Math.sin((deg * Math.PI) / 180) * r * 100) / 100}
        r={r * 0.78}
        fill="var(--room-decor-accent)"
        opacity="0.9"
      />
    ))}
    <circle cx={x} cy={y} r={r * 0.5} fill="var(--room-light-tint)" opacity="0.9" />
  </g>
);

export const BotanicalAtelier: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="botanicalAtelier">
      {/* Layer 1: Mineral plaster wall, cornice + soft center-right recessed plaster arch */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <WallBase angle={165} quiet={0.72} />

        {/* Recessed architectural half-arch niche framing center-right divider */}
        <div
          className="srf-room-arch-niche absolute left-[6%] right-[6%] top-[24%] lg:left-[37%] lg:right-[13%] lg:top-[6%] bottom-0 rounded-t-[180px] lg:rounded-t-[999px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, var(--room-wall-shadow) 0%, color-mix(in srgb, var(--room-wall-shadow) 68%, var(--room-wall-base)) 76%, color-mix(in srgb, var(--room-ambient-tint) 82%, var(--room-shadow-tint)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow:
              'inset 14px 16px 36px -22px color-mix(in srgb, var(--room-shadow-tint) 24%, transparent), 0 0 0 9px color-mix(in srgb, var(--room-wall-highlight) 46%, transparent)',
          }}
        >
          {/* Stepped reveal lines inside the niche */}
          <div
            className="absolute inset-x-[16px] top-[16px] bottom-0 rounded-t-[160px] lg:rounded-t-[999px] border-t border-x"
            style={{ borderColor: 'color-mix(in srgb, var(--room-trim) 20%, transparent)' }}
          />
          <div
            className="absolute inset-x-[30px] top-[30px] bottom-0 rounded-t-[150px] lg:rounded-t-[999px] border-t border-x border-dashed"
            style={{ borderColor: 'color-mix(in srgb, var(--room-light-tint) 46%, transparent)' }}
          />
        </div>
      </div>

      {/* Layer 2: Sun beam, swaying leaf shadows, curtain on its rod, hanging planter */}
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
        </svg>

        {/* Branch + leaf shadows thrown on the wall, stirring in a breeze */}
        <svg
          viewBox="0 0 420 320"
          className="srf-room-leafshade hidden lg:block absolute right-[8%] top-0 w-[31%] h-auto opacity-[0.13]"
          aria-hidden="true"
        >
          <g fill="none" stroke="var(--room-shadow-tint)" strokeLinecap="round">
            <path d="M420 0 C340 40, 250 80, 90 190" strokeWidth="5" />
            <path d="M360 30 C330 110, 290 180, 250 250" strokeWidth="4" />
          </g>
          <g fill="var(--room-shadow-tint)">
            {SHADE_LEAVES.map(([cx, cy, rot, rx]) => (
              <ellipse
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={rx * 0.36}
                transform={`rotate(${rot} ${cx} ${cy})`}
              />
            ))}
          </g>
        </svg>

        {/* Linen curtain on a rod: a sheer under-layer and a pleated drape that breathe out of phase */}
        <div className="hidden sm:block absolute top-0 bottom-0 right-0 w-[13%] lg:w-[11%]">
          <div
            className="srf-room-drape-sway absolute top-[34px] bottom-0 -left-[34%] w-[62%] opacity-50"
            style={{
              animationDelay: '-5s',
              background:
                'repeating-linear-gradient(90deg, color-mix(in srgb, var(--room-light-tint) 70%, transparent) 0px, color-mix(in srgb, var(--room-textile-primary) 60%, transparent) 9px, color-mix(in srgb, var(--room-light-tint) 60%, transparent) 17px)',
              maskImage: 'linear-gradient(90deg, transparent 0%, black 40%, black 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 40%, black 100%)',
            }}
          />
          <div
            className="srf-room-drape srf-room-drape-sway srf-room-pleats absolute top-[34px] bottom-0 inset-x-0 opacity-90"
            style={{
              borderLeft: '1px solid color-mix(in srgb, var(--room-trim) 34%, transparent)',
              maskImage: 'linear-gradient(90deg, transparent 0%, black 22%, black 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 22%, black 100%)',
            }}
          />
          <div
            className="absolute top-[28px] -left-[42%] right-0 h-[5px] rounded-full"
            style={{ backgroundColor: 'var(--room-furniture-leg)' }}
          >
            <span
              className="absolute -left-[6px] -top-[4px] w-[13px] h-[13px] rounded-full"
              style={{ backgroundColor: 'var(--room-furniture-leg)' }}
            />
          </div>
          <div
            className="absolute top-[33px] -left-[30%] right-0 h-[7px] opacity-70"
            style={{
              background:
                'repeating-linear-gradient(90deg, var(--room-furniture-leg) 0 3px, transparent 3px 21px)',
            }}
          />
        </div>

        {/* Hanging planter with trailing vines, swinging on its cords */}
        <div className="srf-room-drop-in hidden xl:block absolute top-0 left-[32.2%] w-[104px]">
          <svg viewBox="0 0 120 230" className="srf-room-sway block w-full h-auto" aria-hidden="true">
            <g stroke="var(--room-furniture-leg)" strokeWidth="1.2" opacity="0.8">
              <line x1="60" y1="0" x2="36" y2="92" />
              <line x1="60" y1="0" x2="84" y2="92" />
              <line x1="60" y1="0" x2="60" y2="84" />
            </g>
            <g fill="none" stroke="var(--room-foliage)" strokeWidth="1.6" strokeLinecap="round">
              <path d="M40 100 C24 130, 30 160, 22 196" />
              <path d="M82 100 C98 126, 90 158, 100 186" />
              <path d="M60 110 C56 150, 66 176, 60 214" />
            </g>
            <g fill="var(--room-foliage)">
              {VINE_LEAVES.map(([cx, cy, rot]) => (
                <ellipse
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  rx="8.5"
                  ry="5"
                  transform={`rotate(${rot} ${cx} ${cy})`}
                  opacity="0.92"
                />
              ))}
              {PLANTER_FRONDS.map(([cx, cy, rot, rx]) => (
                <ellipse
                  key={`f-${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={rx * 0.42}
                  transform={`rotate(${rot} ${cx} ${cy})`}
                />
              ))}
            </g>
            <path d="M32 92 L88 92 L80 128 Q60 136 40 128 Z" fill="var(--room-decor-primary)" />
            <rect x="29" y="87" width="62" height="9" rx="3" fill="var(--room-decor-accent)" opacity="0.9" />
            <path
              d="M40 100 L45 124"
              fill="none"
              stroke="var(--room-light-tint)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>
        </div>

        <DustMotes className="left-[4%] right-[2%] lg:left-[35%] top-[34%] lg:top-[5%] bottom-[28%]" />
      </div>

      {/* Layer 3 & 4: Unified horizon baseboard, chevron parquet & spread-responsive boucle rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 44%, color-mix(in srgb, var(--room-floor-detail) 55%, var(--room-floor-base)) 100%)',
        }}
      >
        <FloorPlane variant="chevron" opacity={0.42} />
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-40"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Window panes of sun on the boards */}
        <FloorLight className="hidden lg:block left-[6%] w-[26%] top-[14%] h-[52%]" duration={12} />

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
        >
          <div
            className="absolute inset-[7%] rounded-[999px] border"
            style={{ borderColor: 'color-mix(in srgb, var(--room-rug-trim) 26%, transparent)' }}
          />
          <div
            className="absolute inset-[16%] rounded-[999px] border border-dashed"
            style={{ borderColor: 'color-mix(in srgb, var(--room-rug-trim) 20%, transparent)' }}
          />
        </div>
      </div>

      {/* Layer 5: Potted olive tree, ikebana vessel in bloom, upholstered bench, drifting petals */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        {/* Olive tree standing in the niche, left of the divider */}
        <div className="srf-room-prop-left hidden xl:block absolute left-[36.6%] bottom-[-12px] w-[150px]">
          <div className="relative">
            <svg viewBox="0 0 160 330" className="block w-full h-auto" aria-hidden="true">
              <ellipse cx="86" cy="318" rx="58" ry="8" fill="var(--room-shadow-tint)" opacity="0.2" />
              <g fill="none" stroke="var(--room-furniture-leg)" strokeLinecap="round">
                <path d="M80 256 C78 220, 84 190, 78 160 C74 140, 70 120, 62 100" strokeWidth="4" />
                <path d="M79 172 C90 150, 100 132, 112 112" strokeWidth="3" />
                <path d="M76 138 C72 118, 80 94, 86 70" strokeWidth="2.6" />
              </g>
              <path d="M52 258 L108 258 L102 314 Q80 322 58 314 Z" fill="var(--room-decor-primary)" />
              <rect x="48" y="252" width="64" height="10" rx="4" fill="var(--room-decor-accent)" opacity="0.9" />
              <path
                d="M62 270 L66 306"
                fill="none"
                stroke="var(--room-light-tint)"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Low planter of upright blades at the tree's foot */}
              <g fill="var(--room-foliage)">
                <path d="M128 292 C125 272, 127 256, 131 244 C134 258, 135 276, 134 292 Z" />
                <path d="M136 292 C137 276, 141 264, 147 256 C147 270, 144 282, 142 292 Z" opacity="0.85" />
                <path d="M124 292 C120 280, 118 270, 114 262 C120 268, 126 280, 129 292 Z" opacity="0.8" />
              </g>
              <path d="M118 290 L152 290 L148 316 L122 316 Z" fill="var(--room-furniture)" />
              <rect x="116" y="287" width="38" height="5" rx="2" fill="var(--room-furniture-leg)" opacity="0.6" />
            </svg>
            <svg
              viewBox="0 0 160 330"
              className="srf-room-sway-base absolute inset-0 w-full h-full"
              style={{ transformOrigin: '50% 52%' }}
              aria-hidden="true"
            >
              <g fill="none" stroke="var(--room-furniture-leg)" strokeWidth="1.6" strokeLinecap="round">
                <path d="M62 100 C56 80, 54 60, 50 40" />
                <path d="M112 112 C118 96, 122 80, 130 64" />
                <path d="M86 70 C88 50, 88 30, 86 14" />
              </g>
              <g fill="var(--room-foliage)">
                {OLIVE_LEAVES.map(([cx, cy, rot], idx) => (
                  <ellipse
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    rx="11"
                    ry="3.6"
                    transform={`rotate(${rot} ${cx} ${cy})`}
                    opacity={idx % 3 === 0 ? 0.78 : 0.95}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>

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
          {/* Folded linen + pruning shears left on the seat */}
          <rect x="176" y="78" width="36" height="7" rx="2" fill="var(--room-textile-primary)" stroke="var(--room-trim)" strokeOpacity="0.3" />
          <rect x="179" y="72" width="30" height="7" rx="2" fill="var(--room-wall-highlight)" stroke="var(--room-trim)" strokeOpacity="0.3" />
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
            <ellipse cx="100" cy="150" rx="13" ry="5.5" transform="rotate(-62 100 150)" opacity="0.8" />
            <ellipse cx="138" cy="140" rx="12" ry="5" transform="rotate(50 138 140)" opacity="0.8" />
            <Blossom x={52} y={56} />
            <Blossom x={176} y={34} r={5.5} />
            <Blossom x={198} y={114} r={4.5} />
            <Blossom x={92} y={126} r={4} />
            <Blossom x={156} y={74} r={4} />
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

        {/* Petals letting go of the arrangement */}
        <span className="srf-room-petal" style={{ right: '9%', top: '60%', animationDelay: '-2s' }} />
        <span
          className="srf-room-petal"
          style={{ right: '5.5%', top: '56%', animationDuration: '15s', animationDelay: '-9s' }}
        />
        <span
          className="srf-room-petal"
          style={{ right: '12%', top: '66%', animationDuration: '18s', animationDelay: '-13s' }}
        />
      </div>
    </div>
  );
};

'use client';

import React, { useId } from 'react';

/**
 * Shared decor parts for the six room families. Every fill and stroke reads a
 * `--room-*` palette variable, so the pieces recolor with the divider's base
 * and print colors. Looping motion lives on whole HTML/SVG boxes (never on
 * SVG children) and is transform/opacity only.
 */

function useSvgId(prefix: string): string {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

/* ------------------------------------------------------------------ walls */

interface WallBaseProps {
  angle: number;
  quiet?: number;
  crown?: boolean;
  skirting?: boolean;
}

export const WallBase: React.FC<WallBaseProps> = ({
  angle,
  quiet = 0.76,
  crown = true,
  skirting = true,
}) => (
  <>
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(${angle}deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 62%, var(--room-ambient-tint) 100%)`,
      }}
    />
    {skirting && <div className="srf-room-skirting" />}
    {/* Quiet-zone left ambient illumination behind editorial headline */}
    <div
      className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 85% 90% at 24% 46%, var(--room-quiet-bg) 0%, transparent 78%)',
        opacity: quiet,
      }}
    />
    {crown && <div className="srf-room-crown" />}
  </>
);

/* ----------------------------------------------------------------- floors */

export type FloorVariant = 'chevron' | 'planks' | 'slab' | 'tile' | 'terrazzo';

const TERRAZZO_CHIPS: ReadonlyArray<[string, string, number]> = [
  ['14,18 30,12 36,24 22,32', 'var(--room-decor-primary)', 0.5],
  ['70,8 84,14 80,26 66,22', 'var(--room-wall-highlight)', 0.85],
  ['118,22 134,16 142,30 126,36', 'var(--room-furniture)', 0.8],
  ['160,44 172,40 176,54 162,58', 'var(--room-decor-accent)', 0.5],
  ['40,58 56,52 62,66 46,72', 'var(--room-wall-highlight)', 0.8],
  ['92,54 104,60 98,72 86,66', 'var(--room-floor-detail)', 0.7],
  ['132,74 150,70 152,84 136,88', 'var(--room-decor-primary)', 0.42],
  ['10,96 24,90 30,104 16,110', 'var(--room-furniture)', 0.75],
  ['62,100 78,96 82,110 68,116', 'var(--room-decor-accent)', 0.45],
  ['108,108 120,102 128,114 114,122', 'var(--room-wall-highlight)', 0.85],
  ['156,116 170,112 174,126 160,130', 'var(--room-floor-detail)', 0.65],
  ['30,138 46,134 50,148 34,152', 'var(--room-decor-primary)', 0.45],
  ['84,146 98,140 104,154 90,160', 'var(--room-furniture)', 0.8],
  ['134,150 148,146 152,160 138,166', 'var(--room-wall-highlight)', 0.8],
  ['4,160 14,156 18,168 8,172', 'var(--room-decor-accent)', 0.4],
];

function renderFloorPattern(variant: FloorVariant, id: string): React.ReactNode {
  const line = 'var(--room-floor-detail)';
  switch (variant) {
    case 'chevron':
      return (
        <pattern id={id} width="96" height="48" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="48" height="48" fill={line} opacity="0.1" />
          <path
            d="M0 0 L48 48 L96 0 M0 -48 L48 0 L96 -48 M0 48 L48 96 L96 48"
            fill="none"
            stroke={line}
            strokeWidth="1.4"
          />
          <path d="M0 0 V48 M48 0 V48" fill="none" stroke={line} strokeWidth="1.6" />
        </pattern>
      );
    case 'planks':
      return (
        <pattern id={id} width="192" height="420" patternUnits="userSpaceOnUse">
          <rect x="64" y="0" width="64" height="420" fill={line} opacity="0.1" />
          <rect x="128" y="0" width="64" height="150" fill={line} opacity="0.05" />
          <path d="M0 0 V420 M64 0 V420 M128 0 V420" fill="none" stroke={line} strokeWidth="1.5" />
          <path
            d="M0 132 H64 M64 318 H128 M128 150 H192 M0 380 H64"
            fill="none"
            stroke={line}
            strokeWidth="1.5"
          />
        </pattern>
      );
    case 'slab':
      return (
        <pattern id={id} width="230" height="230" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="230" height="230" fill={line} opacity="0.04" />
          <path d="M0 0 H230 M0 0 V230" fill="none" stroke={line} strokeWidth="2" />
          <circle cx="0" cy="0" r="3" fill={line} />
          <circle cx="230" cy="0" r="3" fill={line} />
          <circle cx="0" cy="230" r="3" fill={line} />
          <circle cx="230" cy="230" r="3" fill={line} />
        </pattern>
      );
    case 'tile':
      return (
        <pattern id={id} width="280" height="280" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="140" height="140" fill={line} opacity="0.1" />
          <rect x="140" y="140" width="140" height="140" fill={line} opacity="0.1" />
          <path
            d="M0 0 H280 M0 140 H280 M0 0 V280 M140 0 V280"
            fill="none"
            stroke={line}
            strokeWidth="1.6"
          />
        </pattern>
      );
    case 'terrazzo':
    default:
      return (
        <pattern
          id={id}
          width="180"
          height="180"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(0.5)"
        >
          {TERRAZZO_CHIPS.map(([points, fill, opacity]) => (
            <polygon key={points} points={points} fill={fill} opacity={opacity} />
          ))}
        </pattern>
      );
  }
}

interface FloorPlaneProps {
  variant: FloorVariant;
  opacity?: number;
}

/** Floor finish drawn once and tilted into depth so joints converge toward the wall. */
export const FloorPlane: React.FC<FloorPlaneProps> = ({ variant, opacity = 0.5 }) => {
  const id = useSvgId(`srf-floor-${variant}`);
  return (
    <div className="srf-room-floor-persp" aria-hidden="true">
      <div className="srf-room-floor-plane" style={{ opacity }}>
        <svg width="100%" height="100%" aria-hidden="true">
          <defs>{renderFloorPattern(variant, id)}</defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      </div>
    </div>
  );
};

interface FloorLightProps {
  /** Position/size utility classes for the lit patch. */
  className: string;
  duration?: number;
  delay?: number;
}

/** Paned window light on the floor that brightens and dims as if clouds pass. */
export const FloorLight: React.FC<FloorLightProps> = ({ className, duration = 11, delay = 0 }) => (
  <div
    className={`srf-room-breathe absolute pointer-events-none ${className}`}
    style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
  >
    <div className="srf-room-floor-light" />
  </div>
);

/* ------------------------------------------------------------------- rugs */

interface RectRugProps {
  /** Position/size utility classes (the rug still scales with --room-spread). */
  className: string;
  variant?: 'plain' | 'stripes';
  fringe?: boolean;
}

const RUG_STRIPES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/** Rectangular rug foreshortened into a trapezoid, with a woven border, optional stripes and fringe. */
export const RectRug: React.FC<RectRugProps> = ({ className, variant = 'plain', fringe = true }) => {
  const gradId = useSvgId('srf-rug');
  return (
    <div className={`srf-room-rug-spread absolute ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--room-rug)" />
            <stop
              offset="100%"
              stopColor="color-mix(in srgb, var(--room-rug) 76%, var(--room-textile-secondary))"
            />
          </linearGradient>
        </defs>
        <polygon points="5,0 95,0 100,100 0,100" fill={`url(#${gradId})`} />
        {variant === 'stripes' &&
          RUG_STRIPES.filter((i) => i % 2 === 1).map((i) => {
            const t0 = i / RUG_STRIPES.length;
            const t1 = (i + 1) / RUG_STRIPES.length;
            const points = [
              `${5 + 90 * t0},0`,
              `${5 + 90 * t1},0`,
              `${100 * t1},100`,
              `${100 * t0},100`,
            ].join(' ');
            return (
              <polygon
                key={i}
                points={points}
                fill="var(--room-rug-trim)"
                opacity={i % 4 === 1 ? 0.3 : 0.16}
              />
            );
          })}
        <polygon
          points="5,0 95,0 100,100 0,100"
          fill="none"
          stroke="var(--room-rug-trim)"
          strokeOpacity="0.46"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points="8.6,8 91.4,8 95.4,92 4.6,92"
          fill="none"
          stroke="var(--room-rug-trim)"
          strokeOpacity="0.3"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {fringe && (
          <g stroke="var(--room-rug-trim)" strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="1.3 1.6">
            <line x1="4.25" y1="1" x2="-0.75" y2="99" />
            <line x1="95.75" y1="1" x2="100.75" y2="99" />
          </g>
        )}
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ light */

type MoteSeed = readonly [left: number, top: number, size: number, duration: number, delay: number, kind: 'a' | 'b' | 'c'];

// Weighted toward the edges: the divider stands in front of the middle of the region.
const MOTE_SEEDS: readonly MoteSeed[] = [
  [5, 64, 3, 13, -1, 'a'],
  [11, 30, 2, 17, -6, 'b'],
  [17, 78, 2, 15, -11, 'c'],
  [24, 14, 3, 19, -3, 'a'],
  [38, 6, 2, 14, -9, 'b'],
  [56, 4, 3, 18, -13, 'c'],
  [72, 8, 2, 16, -4, 'a'],
  [84, 20, 3, 20, -15, 'b'],
  [90, 48, 2, 13, -7, 'c'],
  [95, 70, 3, 17, -2, 'a'],
  [98, 32, 2, 15, -10, 'b'],
  [8, 46, 2, 21, -16, 'c'],
];

interface DustMotesProps {
  /** Position utility classes for the drifting region. */
  className: string;
  count?: number;
}

/** Specks drifting through a shaft of light. Invisible when motion is reduced. */
export const DustMotes: React.FC<DustMotesProps> = ({ className, count = MOTE_SEEDS.length }) => (
  <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
    {MOTE_SEEDS.slice(0, count).map(([left, top, size, duration, delay, kind]) => (
      <span
        key={`${left}-${top}`}
        className={`srf-room-mote srf-room-mote-${kind}`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    ))}
  </div>
);

/* ---------------------------------------------------------------- pendant */

export type PendantShade = 'dome' | 'globe' | 'cone' | 'rattan';

interface PendantProps {
  /** Horizontal position + visibility utility classes. */
  className: string;
  shade: PendantShade;
  cord: number;
  width?: number;
  duration?: number;
  delay?: number;
}

function renderShade(shade: PendantShade): React.ReactNode {
  switch (shade) {
    case 'globe':
      return (
        <>
          <rect x="31" y="2" width="10" height="9" rx="2" fill="var(--room-furniture-leg)" />
          <circle
            cx="36"
            cy="30"
            r="20"
            fill="color-mix(in srgb, var(--room-light-tint) 86%, var(--room-decor-accent))"
            stroke="var(--room-trim)"
            strokeOpacity="0.4"
          />
          <path
            d="M24 22 C27 15, 33 13, 38 13"
            fill="none"
            stroke="var(--room-wall-highlight)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.9"
          />
        </>
      );
    case 'cone':
      return (
        <>
          <rect x="31" y="2" width="10" height="8" rx="2" fill="var(--room-furniture-leg)" />
          <polygon points="28,9 44,9 64,46 8,46" fill="var(--room-decor-primary)" />
          <polygon points="28,9 33,9 20,46 8,46" fill="var(--room-light-tint)" opacity="0.2" />
          <rect x="8" y="44" width="56" height="4" rx="2" fill="var(--room-decor-accent)" opacity="0.9" />
        </>
      );
    case 'rattan':
      return (
        <>
          <rect x="32" y="4" width="8" height="12" rx="2" fill="var(--room-furniture-leg)" />
          <path
            d="M6 46 C6 14, 66 14, 66 46 Z"
            fill="color-mix(in srgb, var(--room-furniture) 82%, var(--room-wall-highlight))"
            stroke="var(--room-furniture-leg)"
            strokeOpacity="0.6"
          />
          <g fill="none" stroke="var(--room-furniture-leg)" strokeOpacity="0.5" strokeWidth="1">
            <path d="M36 22 Q20 30 12 46" />
            <path d="M36 22 Q27 32 24 46" />
            <path d="M36 22 V46" />
            <path d="M36 22 Q45 32 48 46" />
            <path d="M36 22 Q52 30 60 46" />
            <path d="M13 34 Q36 26 59 34" />
            <path d="M8.5 41 Q36 33 63.5 41" />
          </g>
        </>
      );
    case 'dome':
    default:
      return (
        <>
          <rect x="32" y="4" width="8" height="12" rx="2" fill="var(--room-furniture-leg)" />
          <path d="M8 44 C8 14, 64 14, 64 44 Z" fill="var(--room-decor-primary)" />
          <path
            d="M15 38 C17 26, 25 20, 34 19"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.3"
          />
          <rect x="7" y="42" width="58" height="4" rx="2" fill="var(--room-decor-accent)" opacity="0.9" />
        </>
      );
  }
}

/** Ceiling pendant on a cord: the whole fitting swings a degree or two and its glow breathes. */
export const Pendant: React.FC<PendantProps> = ({
  className,
  shade,
  cord,
  width = 68,
  duration = 7.5,
  delay = 0,
}) => (
  <div className={`srf-room-drop-in absolute top-0 pointer-events-none ${className}`} style={{ width }}>
    <div
      className="srf-room-sway relative"
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <div
        className="mx-auto w-px"
        style={{
          height: cord,
          backgroundColor: 'color-mix(in srgb, var(--room-furniture-leg) 78%, transparent)',
        }}
      />
      <svg viewBox="0 0 72 52" className="block w-full h-auto" aria-hidden="true">
        {renderShade(shade)}
      </svg>
      <div
        className="srf-room-breathe absolute left-1/2 top-full"
        style={{
          width: width * 2.4,
          height: width * 1.5,
          marginLeft: -(width * 1.2),
          marginTop: -6,
          animationDuration: `${duration * 1.3}s`,
          animationDelay: `${delay}s`,
        }}
      >
        <div className="srf-room-lamp-glow inset-0" />
      </div>
    </div>
  </div>
);

'use client';

import { CSSProperties } from 'react';
import { SeasonId } from '../data/garden';

interface SeasonLook {
  skyTop: string;
  skyBottom: string;
  haze: string;
  /** The sun, or the pale winter moon: its place in the sky is what changes the light. */
  disc: { x: number; y: number; r: number; color: string };
  far: string;
  ridge: string;
  cedar: string;
  bank: string;
  bankEdge: string;
  water: string;
  waterLight: string;
  /** Three tones for the tree canopy; empty when the branches are bare. */
  canopy: readonly string[];
  overhang: string | null;
  floating: string | null;
  snow: boolean;
}

const LOOKS: Record<SeasonId, SeasonLook> = {
  spring: {
    skyTop: '#0F2927',
    skyBottom: '#3D5650',
    haze: '#C7A6A2',
    disc: { x: 1010, y: 262, r: 62, color: '#F4E3D7' },
    far: '#1D3D37',
    ridge: '#21423A',
    cedar: '#17332E',
    bank: '#2A4A3B',
    bankEdge: '#3D6149',
    water: '#163B37',
    waterLight: '#2A5A52',
    canopy: ['#C7A6A2', '#DDC2BD', '#B38C89'],
    overhang: '#B08B88',
    floating: '#D9BDB8',
    snow: false,
  },
  summer: {
    skyTop: '#0C2A25',
    skyBottom: '#2C5C47',
    haze: '#6E9070',
    disc: { x: 1130, y: 150, r: 50, color: '#F7F1DC' },
    far: '#1A4236',
    ridge: '#1E4836',
    cedar: '#12352B',
    bank: '#28563A',
    bankEdge: '#3E7449',
    water: '#11393B',
    waterLight: '#1F5A54',
    canopy: ['#526E58', '#3D6247', '#6F8F66'],
    overhang: '#35593F',
    floating: null,
    snow: false,
  },
  autumn: {
    skyTop: '#1B2B26',
    skyBottom: '#6A5238',
    haze: '#CB9462',
    disc: { x: 900, y: 340, r: 80, color: '#EBB57D' },
    far: '#2C3A2E',
    ridge: '#35402E',
    cedar: '#25322A',
    bank: '#3E4730',
    bankEdge: '#6A5B33',
    water: '#1B3531',
    waterLight: '#4A5340',
    canopy: ['#CB9462', '#9E3F32', '#DDB07A'],
    overhang: '#9E3F32',
    floating: '#CB9462',
    snow: false,
  },
  winter: {
    skyTop: '#132D2D',
    skyBottom: '#5B706A',
    haze: '#F4EFE2',
    disc: { x: 1190, y: 214, r: 44, color: '#FDFBF5' },
    far: '#2D4945',
    ridge: '#35544E',
    cedar: '#21403B',
    bank: '#3F5E58',
    bankEdge: '#DDE2D6',
    water: '#152F2E',
    waterLight: '#6C8782',
    canopy: [],
    overhang: null,
    floating: null,
    snow: true,
  },
};

const SNOW = '#F4EFE2';
const INK = '#141D1A';
const VERMILION = '#9E3F32';
/** A koi seen from the bank: nose at the origin, forked tail trailing along +x. */
const KOI_SHAPE = 'M0 0 C 10 -9, 34 -10, 48 -2 L 64 -10 L 59 0 L 64 10 L 48 2 C 34 10, 10 9, 0 0 Z';

/** Canopy clusters: centre, radius, tone index. */
const CANOPY: readonly [number, number, number, number][] = [
  [546, 440, 70, 0],
  [490, 400, 48, 1],
  [580, 370, 56, 2],
  [650, 300, 78, 0],
  [700, 236, 62, 1],
  [776, 262, 58, 2],
  [790, 330, 54, 0],
  [860, 300, 62, 1],
  [910, 236, 60, 0],
  [960, 318, 56, 2],
  [1032, 330, 58, 0],
  [1070, 290, 40, 1],
  [750, 400, 46, 1],
  [640, 430, 44, 1],
];

/** Conifers along the far ridge: x, base y, height, width. */
const CEDARS: readonly [number, number, number, number][] = [
  [70, 548, 190, 62],
  [150, 540, 150, 54],
  [236, 532, 214, 66],
  [330, 528, 160, 52],
  [416, 532, 126, 46],
  [1512, 512, 196, 62],
  [1584, 516, 150, 52],
];

const BRANCHES: readonly { d: string; width: number }[] = [
  { d: 'M708 706 C 700 628, 712 560, 750 492 C 776 446, 820 408, 878 380', width: 28 },
  { d: 'M724 560 C 672 512, 616 472, 546 448', width: 15 },
  { d: 'M754 486 C 736 420, 708 356, 676 286', width: 14 },
  { d: 'M810 418 C 866 366, 940 344, 1028 350', width: 12 },
  { d: 'M878 380 C 906 330, 912 290, 906 244', width: 10 },
  { d: 'M616 472 C 596 440, 580 418, 560 380', width: 6 },
  { d: 'M708 356 C 750 320, 780 290, 790 250', width: 6 },
  { d: 'M940 344 C 970 316, 990 300, 1020 270', width: 5 },
];

const LAYER_PROPS = {
  viewBox: '0 0 1600 900',
  preserveAspectRatio: 'xMidYMid slice',
  focusable: 'false' as const,
  'aria-hidden': true,
};

function depth(value: number): CSSProperties {
  return { '--d': value } as CSSProperties;
}

/** A point on a circle, rounded so server and client markup agree to the digit. */
function orbit(centre: number, radius: number, angle: number, axis: 'x' | 'y'): number {
  const offset = (axis === 'x' ? Math.cos(angle) : Math.sin(angle)) * radius;
  return Math.round((centre + offset) * 10) / 10;
}

/** A layered paper-cut view of the garden. Each layer is its own SVG so pointer parallax stays on the compositor. */
export default function SeasonScene({ season }: { season: SeasonId }) {
  const look = LOOKS[season];
  const id = `mnw-season-${season}`;

  return (
    <div className="mnw-scene" data-season={season}>
      {/* Sky, light and the far hills */}
      <svg className="mnw-scene-layer" style={depth(4)} {...LAYER_PROPS}>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={look.skyTop} />
            <stop offset="0.66" stopColor={look.skyBottom} />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor={look.disc.color} stopOpacity="0.5" />
            <stop offset="1" stopColor={look.disc.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="-80" y="-60" width="1760" height="1020" fill={`url(#${id}-sky)`} />
        <circle cx={look.disc.x} cy={look.disc.y} r={look.disc.r * 3.6} fill={`url(#${id}-glow)`} />
        <circle cx={look.disc.x} cy={look.disc.y} r={look.disc.r} fill={look.disc.color} opacity="0.94" />
        <path
          d="M-80 520 C 120 430, 260 400, 420 450 C 560 380, 700 360, 860 430 C 1000 390, 1180 330, 1320 400 C 1440 370, 1560 400, 1680 440 L1680 960 L-80 960 Z"
          fill={look.far}
        />
        <ellipse cx="800" cy="548" rx="1000" ry="64" fill={look.haze} opacity="0.16" />
      </svg>

      {/* Ridge, conifers, torii and the timber hall */}
      <svg className="mnw-scene-layer" style={depth(10)} {...LAYER_PROPS}>
        {CEDARS.map(([x, base, tall, wide]) => (
          <g key={x}>
            <path d={`M${x} ${base - tall} L${x + wide / 2} ${base + 20} L${x - wide / 2} ${base + 20} Z`} fill={look.cedar} />
            {look.snow && (
              <path
                d={`M${x} ${base - tall} L${x + wide * 0.17} ${base - tall * 0.62} L${x - wide * 0.17} ${base - tall * 0.62} Z`}
                fill={SNOW}
                opacity="0.85"
              />
            )}
          </g>
        ))}
        <path
          d="M-80 560 C 200 500, 420 520, 640 540 C 860 500, 1040 470, 1240 500 C 1400 480, 1560 500, 1680 520 L1680 960 L-80 960 Z"
          fill={look.ridge}
        />

        {/* Timber hall, set back from the gate */}
        <g>
          <rect x="1246" y="504" width="248" height="14" fill="#D6C7A9" />
          <rect x="1268" y="440" width="204" height="64" fill="#EFE8D8" />
          <rect x="1268" y="440" width="9" height="64" fill={INK} />
          <rect x="1463" y="440" width="9" height="64" fill={INK} />
          <rect x="1330" y="440" width="6" height="64" fill={INK} />
          <rect x="1404" y="440" width="6" height="64" fill={INK} />
          <rect x="1346" y="452" width="48" height="52" fill={INK} />
          <rect x="1350" y="456" width="40" height="44" fill="#CB9462" opacity="0.5" />
          <path d="M1216 450 Q 1296 420 1370 364 Q 1444 420 1524 450 L 1516 460 L 1224 460 Z" fill={INK} />
          <rect x="1354" y="360" width="32" height="7" rx="2" fill="#CB9462" />
          {look.snow && (
            <path
              d="M1234 446 Q 1302 418 1370 370 Q 1438 418 1506 446 Q 1438 430 1370 386 Q 1302 430 1234 446 Z"
              fill={SNOW}
            />
          )}
        </g>

        {/* Torii on the approach, in line with the hall */}
        <g>
          <rect x="1136" y="470" width="13" height="96" fill={VERMILION} />
          <rect x="1211" y="470" width="13" height="96" fill={VERMILION} />
          <rect x="1124" y="496" width="112" height="9" fill={VERMILION} />
          <path d="M1106 472 Q 1180 458 1254 472 L 1252 485 Q 1180 473 1108 485 Z" fill={VERMILION} />
          <path d="M1100 463 Q 1180 447 1260 463 L 1258 472 Q 1180 458 1102 472 Z" fill={look.snow ? SNOW : INK} />
        </g>
      </svg>

      {/* Bank, pond and the sakura tree */}
      <svg className="mnw-scene-layer" style={depth(18)} {...LAYER_PROPS}>
        <path
          d="M-80 650 C 180 600, 420 610, 700 640 C 900 600, 1150 590, 1400 610 C 1500 615, 1600 625, 1680 640 L1680 960 L-80 960 Z"
          fill={look.bank}
        />
        <path
          d="M-80 650 C 180 600, 420 610, 700 640 C 900 600, 1150 590, 1400 610 C 1500 615, 1600 625, 1680 640"
          fill="none"
          stroke={look.bankEdge}
          strokeWidth={look.snow ? 10 : 5}
          strokeLinecap="round"
          opacity={look.snow ? 0.9 : 0.7}
        />

        {/* Stepping stones from the gate down to the water */}
        <g fill={look.snow ? SNOW : '#D6C7A9'}>
          <ellipse cx="1176" cy="598" rx="20" ry="7" />
          <ellipse cx="1160" cy="622" rx="22" ry="8" />
          <ellipse cx="1140" cy="648" rx="24" ry="9" />
          <ellipse cx="1118" cy="676" rx="26" ry="10" />
        </g>

        {/* Pond: it runs off the bottom of the scene, where the next section's shoreline becomes its near bank */}
        <ellipse cx="1160" cy="824" rx="528" ry="130" fill={INK} opacity="0.35" />
        <ellipse cx="1160" cy="818" rx="520" ry="126" fill={look.water} />
        <ellipse cx="1210" cy="800" rx="360" ry="70" fill={look.waterLight} opacity="0.42" />
        <g fill="none" stroke="#F4EFE2" strokeWidth="1.6">
          <ellipse cx="1090" cy="792" rx="54" ry="13" opacity="0.5" />
          <ellipse cx="1090" cy="792" rx="108" ry="26" opacity="0.3" />
          <ellipse cx="1090" cy="792" rx="170" ry="41" opacity="0.16" />
        </g>
        {!look.snow && (
          <g>
            <g transform="translate(1262 770) rotate(-8)">
              <path d={KOI_SHAPE} fill="#FDFBF5" />
              <ellipse cx="20" cy="0" rx="9" ry="5" fill={VERMILION} />
            </g>
            <g transform="translate(960 800) rotate(172)">
              <path d={KOI_SHAPE} fill="#CB9462" />
            </g>
          </g>
        )}
        {look.floating && (
          <g fill={look.floating} opacity="0.9">
            <ellipse cx="900" cy="760" rx="8" ry="3.4" transform="rotate(18 900 760)" />
            <ellipse cx="974" cy="750" rx="7" ry="3" transform="rotate(-14 974 750)" />
            <ellipse cx="1040" cy="738" rx="7.5" ry="3.2" transform="rotate(28 1040 738)" />
            <ellipse cx="1190" cy="752" rx="7" ry="3" transform="rotate(-22 1190 752)" />
            <ellipse cx="1340" cy="776" rx="8" ry="3.2" transform="rotate(12 1340 776)" />
          </g>
        )}
        <g fill={look.snow ? '#C9D0C4' : '#8D947F'}>
          <ellipse cx="770" cy="760" rx="34" ry="13" />
          <ellipse cx="1470" cy="736" rx="32" ry="12" />
          <ellipse cx="1420" cy="760" rx="22" ry="9" />
        </g>

        {/* Stone lantern at the water's edge */}
        <g transform="translate(-140 8)">
          <rect x="826" y="690" width="36" height="9" fill="#8D947F" />
          <rect x="838" y="654" width="12" height="36" fill="#8D947F" />
          <rect x="828" y="628" width="32" height="26" fill="#A3A894" />
          <rect x="836" y="634" width="16" height="15" fill="#E8C27E" />
          <path d="M818 630 L844 606 L870 630 Z" fill={look.snow ? SNOW : '#6F7566'} />
        </g>

        {/* Sakura tree, drawn about its own base then set to the right of the note */}
        <g transform="translate(216.2 105.9) scale(0.85)">
          <path d="M680 712 C 696 690, 700 670, 702 650 L 732 650 C 732 676, 744 698, 766 712 Z" fill={INK} />
          <g fill="none" stroke={INK} strokeLinecap="round">
            {BRANCHES.map((branch) => (
              <path key={branch.d} d={branch.d} strokeWidth={branch.width} />
            ))}
          </g>
          {look.snow && (
            <g fill="none" stroke={SNOW} strokeLinecap="round" opacity="0.9">
              <path d="M720 548 C 668 500, 612 462, 548 440" strokeWidth="4" />
              <path d="M812 406 C 866 356, 940 334, 1026 340" strokeWidth="4" />
              <path d="M762 474 C 778 440, 816 404, 872 372" strokeWidth="5" />
              <path
                d="M574 380 C 566 350, 552 330, 536 312 M 790 250 C 800 226, 802 210, 800 190 M 1020 270 C 1040 252, 1052 240, 1066 220 M 906 244 C 906 220, 900 200, 890 182"
                strokeWidth="2.5"
                stroke={INK}
                opacity="0.8"
              />
            </g>
          )}
          {look.canopy.length > 0 && (
            <g>
              {CANOPY.map(([cx, cy, r]) => (
                <circle key={`shade-${cx}-${cy}`} cx={cx + 7} cy={cy + 10} r={r} fill={INK} opacity="0.16" />
              ))}
              {CANOPY.map(([cx, cy, r, tone], index) => (
                <g key={`leaf-${cx}-${cy}`} fill={look.canopy[tone]}>
                  <circle cx={cx} cy={cy} r={r} opacity="0.94" />
                  <circle cx={orbit(cx, r * 0.7, index * 2.4, 'x')} cy={orbit(cy, r * 0.7, index * 2.4, 'y')} r={r * 0.5} opacity="0.94" />
                  <circle cx={orbit(cx, r * 0.72, index * 2.4 + 2.2, 'x')} cy={orbit(cy, r * 0.72, index * 2.4 + 2.2, 'y')} r={r * 0.44} opacity="0.94" />
                </g>
              ))}
            </g>
          )}
        </g>
      </svg>

      {/* Foreground foliage, closest to the viewer */}
      <svg className="mnw-scene-layer" style={depth(34)} {...LAYER_PROPS}>
        <g fill="#0B1F1D">
          <path d="M-100 960 L-100 800 C 60 770, 160 800, 260 850 C 300 870, 340 890, 380 960 Z" />
          <path d="M1700 960 L1700 770 C 1560 760, 1470 800, 1400 850 C 1370 872, 1350 890, 1320 960 Z" />
          <path d="M1420 960 C 1430 860, 1450 810, 1486 772 C 1466 816, 1456 866, 1452 960 Z" />
          <path d="M1470 960 C 1486 880, 1520 820, 1568 786 C 1534 832, 1512 890, 1506 960 Z" />
          <path d="M1380 960 C 1376 890, 1362 850, 1334 818 C 1366 846, 1396 892, 1412 960 Z" />
        </g>
        <g fill="none" stroke="#0B1F1D" strokeLinecap="round">
          <path d="M1700 44 C 1590 80, 1490 92, 1384 150" strokeWidth="13" />
          <path d="M1560 82 C 1520 120, 1500 150, 1486 196" strokeWidth="6" />
          <path d="M1470 104 C 1430 100, 1400 84, 1370 60" strokeWidth="5" />
        </g>
        {look.overhang && (
          <g fill={look.overhang}>
            <circle cx="1384" cy="152" r="46" />
            <circle cx="1440" cy="118" r="38" />
            <circle cx="1486" cy="200" r="42" />
            <circle cx="1366" cy="64" r="34" />
            <circle cx="1530" cy="126" r="40" />
            <circle cx="1600" cy="86" r="44" />
            <circle cx="1432" cy="196" r="30" />
          </g>
        )}
        {look.snow && (
          <g fill="none" stroke={SNOW} strokeLinecap="round" opacity="0.9">
            <path d="M1700 36 C 1590 72, 1490 84, 1390 138" strokeWidth="4" />
          </g>
        )}
      </svg>
    </div>
  );
}

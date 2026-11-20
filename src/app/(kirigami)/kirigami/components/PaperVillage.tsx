'use client';

import React, { useState } from 'react';
import { PAPER_PALETTE } from '../utils/paperTextures';

interface PaperVillageProps {
  terracesRef: (el: SVGGElement | null) => void;
  villageHousesRef: (el: SVGGElement | null) => void;
  registerBambooRef: (index: number, el: SVGGElement | null) => void;
  shadowStrength: number;
  interactive: boolean;
  resetToken: number;
}

interface HouseSpec {
  id: string;
  name: string;
  x: number;
  y: number;
  scale: number;
  variant: 'small' | 'medium' | 'two-tier' | 'main';
}

const VILLAGE_HOUSES: HouseSpec[] = [
  // 1. Upper-most small minka near bamboo & mountain base
  { id: 'house-upper', name: 'Upper valley house', x: 1004, y: 424, scale: 0.72, variant: 'small' },
  // 2. Upper-left minka house near the bamboo stand
  { id: 'house-mid-left', name: 'Bamboo grove house', x: 944, y: 482, scale: 0.84, variant: 'medium' },
  // 3. Upper-right two-tier minka house against the terraces
  { id: 'house-terraces', name: 'Terrace hillside house', x: 1084, y: 454, scale: 0.92, variant: 'two-tier' },
  // 4. Lower-right minka house above the right pine/cliff
  { id: 'house-lower-right', name: 'Lower hillside house', x: 1094, y: 542, scale: 0.86, variant: 'medium' },
  // 5. Main foreground village minka house overlooking the river & footbridge
  { id: 'house-main', name: 'Riverside main house', x: 924, y: 562, scale: 1.06, variant: 'main' },
];

/**
 * Renders an individually folded traditional Japanese minka house with layered roof eaves,
 * ridge beam, wooden cardstock walls, recessed shoji windows, stone base, and an optional
 * interactive hinged roof flap revealing a warm illuminated paper interior.
 */
const MinkaHouse: React.FC<{
  house: HouseSpec;
  isOpen: boolean;
  interactive: boolean;
  shadowsEnabled: boolean;
  onToggle: (id: string) => void;
}> = ({ house, isOpen, interactive, shadowsEnabled, onToggle }) => {
  const { id, name, x, y, scale, variant } = house;

  return (
    <g
      id={id}
      transform={`translate(${x}, ${y}) scale(${scale})`}
      className={interactive ? 'kirigami-interactive-house' : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${name} — click to ${isOpen ? 'close' : 'lift'} folded paper roof` : undefined}
      aria-pressed={interactive ? isOpen : undefined}
      onClick={() => interactive && onToggle(id)}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onToggle(id);
        }
      }}
    >
      {/* Ground contact shadow */}
      {shadowsEnabled && (
        <ellipse cx={52} cy={78} rx={48} ry={9} fill="#364434" opacity={0.34} />
      )}

      {/* Stepped stone/earth paper foundation */}
      <path d="M 8 72 L 88 72 L 92 78 L 4 78 Z" fill={PAPER_PALETTE.stoneBase} />
      <path d="M 8 72 L 88 72" stroke="#BDB7A9" strokeWidth={1.2} />

      {/* Warm illuminated paper interior revealed when roof flap lifts */}
      <g
        style={{
          transition: 'opacity 320ms ease',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <polygon points="18,32 78,32 82,72 14,72" fill={PAPER_PALETTE.interiorWarm} />
        <polygon points="22,36 74,36 76,68 20,68" fill={PAPER_PALETTE.interiorGlow} />
        {/* Delicate interior shoji screen lines */}
        <line x1={38} y1={36} x2={38} y2={68} stroke="#B87640" strokeWidth={1.2} />
        <line x1={58} y1={36} x2={58} y2={68} stroke="#B87640" strokeWidth={1.2} />
        <line x1={22} y1={52} x2={74} y2={52} stroke="#B87640" strokeWidth={1.2} />
      </g>

      {/* Main wooden-paper house body */}
      <g>
        {/* Front sunlit facade */}
        <polygon points="14,38 66,38 66,73 14,73" fill={PAPER_PALETTE.woodWall} />
        {/* Right shaded side wall (folded 90deg plane) */}
        <polygon points="66,38 86,33 86,69 66,73" fill={PAPER_PALETTE.woodShade} />

        {/* Vertical timber posts & horizontal lintels */}
        <rect x={14} y={38} width={3.2} height={35} fill={PAPER_PALETTE.roofRidge} />
        <rect x={63.5} y={38} width={3} height={35} fill={PAPER_PALETTE.roofRidge} />
        <rect x={83.5} y={33} width={2.5} height={36} fill={PAPER_PALETTE.windowDark} />
        <line x1={14} y1={50} x2={66} y2={50} stroke={PAPER_PALETTE.roofDark} strokeWidth={1.5} />

        {/* Recessed doorway & shoji windows */}
        <rect
          x={22}
          y={53}
          width={15}
          height={20}
          fill={isOpen ? PAPER_PALETTE.interiorGlow : PAPER_PALETTE.windowDark}
        />
        <line x1={29.5} y1={53} x2={29.5} y2={73} stroke={PAPER_PALETTE.roofDark} strokeWidth={1.2} />
        <rect
          x={43}
          y={53}
          width={15}
          height={13}
          fill={isOpen ? PAPER_PALETTE.interiorGlow : PAPER_PALETTE.windowDark}
        />
        <line x1={50.5} y1={53} x2={50.5} y2={66} stroke={PAPER_PALETTE.woodWall} strokeWidth={1} />
        <line x1={43} y1={59.5} x2={58} y2={59.5} stroke={PAPER_PALETTE.woodWall} strokeWidth={1} />

        {/* Side window */}
        <polygon
          points="71,48 80,45.5 80,57.5 71,60"
          fill={isOpen ? PAPER_PALETTE.interiorGlow : PAPER_PALETTE.windowDark}
        />

        {/* Lower porch veranda eave on main & two-tier houses */}
        {(variant === 'main' || variant === 'two-tier') && (
          <g>
            <polygon points="6,50 70,50 66,54 10,54" fill={PAPER_PALETTE.roofDark} />
            <polygon points="8,47 68,47 70,50 6,50" fill={PAPER_PALETTE.roofLight} />
          </g>
        )}

        {/* Secondary annex wing for the two-tier hillside house */}
        {variant === 'two-tier' && (
          <g transform="translate(54, 18)">
            <rect x={14} y={34} width={28} height={24} fill={PAPER_PALETTE.woodShade} />
            <rect x={21} y={42} width={10} height={15} fill={isOpen ? PAPER_PALETTE.interiorGlow : PAPER_PALETTE.windowDark} />
            <polygon points="6,35 46,35 38,22 14,22" fill={PAPER_PALETTE.roofMain} />
            <polygon points="8,33 44,33 38,22 14,22" fill={PAPER_PALETTE.roofLight} opacity={0.75} />
          </g>
        )}
      </g>

      {/* Hinged Folded Japanese Kirizuma/Irimoya Paper Roof */}
      <g
        style={{
          transformOrigin: '48px 16px',
          transition: 'transform 460ms cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'translateY(-16px) rotate(-14deg)' : 'translateY(0px) rotate(0deg)',
        }}
      >
        {/* Under-eave deep shadow lip */}
        <polygon points="3,42 74,42 93,34 68,36 7,38" fill={PAPER_PALETTE.windowDark} opacity={0.75} />

        {/* Right folded gable triangle */}
        <polygon points="70,12 94,35 70,40" fill={PAPER_PALETTE.roofDark} />
        <polygon points="73,16 90,34 73,38" fill={PAPER_PALETTE.woodShade} opacity={0.45} />

        {/* Front sloping thatched/tiled paper roof plane */}
        <polygon points="20,10 70,10 74,40 2,40" fill={PAPER_PALETTE.roofLight} />
        {/* Layered paper eaves crease lines */}
        <polygon points="14,23 72,23 74,40 2,40" fill={PAPER_PALETTE.roofMain} opacity={0.42} />
        <line x1={12} y1={24} x2={72} y2={24} stroke="#D4BA9A" strokeWidth={1.1} opacity={0.75} />
        <line x1={6} y1={33} x2={73} y2={33} stroke="#6E523A" strokeWidth={1} opacity={0.45} />

        {/* Folded upper ridge beam (mune) with cardstock thickness */}
        <polygon points="18,7 72,7 70,12 20,12" fill={PAPER_PALETTE.roofRidge} />
        <line x1={18} y1={7.5} x2={72} y2={7.5} stroke="#DFC8AA" strokeWidth={1.3} opacity={0.85} />
        {/* Left gable crisp paper highlight rim */}
        <line x1={20} y1={10} x2={2} y2={40} stroke="#E4CEB2" strokeWidth={1.6} />
      </g>
    </g>
  );
};

/**
 * Renders segmented cut-paper bamboo stalks with crisp joints and swaying pointed leaves.
 */
const BambooGrove: React.FC<{
  stalks: Array<{ x: number; baseY: number; height: number; width: number; lean: number; color: string }>;
  groupRef: (el: SVGGElement | null) => void;
  shadowsEnabled: boolean;
}> = ({ stalks, groupRef, shadowsEnabled }) => {
  return (
    <g
      ref={groupRef}
      style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
    >
      {stalks.map((s, i) => {
        const topX = s.x + s.lean;
        const topY = s.baseY - s.height;
        const segments = 5;
        const nodeMarks: React.ReactNode[] = [];
        const leaves: React.ReactNode[] = [];

        for (let k = 1; k < segments; k++) {
          const t = k / segments;
          const nx = s.x + s.lean * t;
          const ny = s.baseY - s.height * t;
          nodeMarks.push(
            <line
              key={`n-${k}`}
              x1={nx - s.width * 0.75}
              y1={ny}
              x2={nx + s.width * 0.75}
              y2={ny}
              stroke="#5A6C4B"
              strokeWidth={1.3}
            />
          );
          if (k >= 2) {
            const dir = (i + k) % 2 === 0 ? 1 : -1;
            leaves.push(
              <path
                key={`l1-${k}`}
                d={`M ${nx} ${ny} Q ${nx + dir * 14} ${ny - 6} ${nx + dir * 24} ${ny - 2} Q ${nx + dir * 13} ${ny + 2} ${nx} ${ny} Z`}
                fill={PAPER_PALETTE.bambooMid}
              />,
              <path
                key={`l2-${k}`}
                d={`M ${nx} ${ny} Q ${nx + dir * 10} ${ny - 12} ${nx + dir * 19} ${ny - 14} Q ${nx + dir * 9} ${ny - 4} ${nx} ${ny} Z`}
                fill={PAPER_PALETTE.bambooLight}
              />
            );
          }
        }

        return (
          <g key={`bamboo-${i}`}>
            <line
              x1={s.x}
              y1={s.baseY}
              x2={topX}
              y2={topY}
              stroke={s.color}
              strokeWidth={s.width}
              strokeLinecap="round"
            />
            <line
              x1={s.x - s.width * 0.22}
              y1={s.baseY}
              x2={topX - s.width * 0.22}
              y2={topY}
              stroke="#E5E9C8"
              strokeWidth={s.width * 0.26}
              opacity={0.75}
            />
            {nodeMarks}
            {leaves}
          </g>
        );
      })}
    </g>
  );
};

export const PaperVillage: React.FC<PaperVillageProps> = ({
  terracesRef,
  villageHousesRef,
  registerBambooRef,
  shadowStrength,
  interactive,
  resetToken,
}) => {
  const shadowsEnabled = shadowStrength > 0.005;
  const s = Math.min(1.8, Math.max(0, shadowStrength));
  const [houseState, setHouseState] = useState<{
    token: number;
    open: Record<string, boolean>;
  }>({ token: resetToken, open: {} });

  const openHouses = houseState.token === resetToken ? houseState.open : {};

  const toggleHouse = (id: string) => {
    setHouseState((prev) => {
      const cur = prev.token === resetToken ? prev.open : {};
      return { token: resetToken, open: { ...cur, [id]: !cur[id] } };
    });
  };

  // 9 concentric stepped right-side paper terraces descending from hilltop (1395, 322) down to village
  const terraces = [
    { d: 'M 1055 568 C 1072 528, 1170 492, 1340 486 C 1460 482, 1560 498, 1650 520 L 1650 585 L 1055 585 Z', fill: PAPER_PALETTE.terrace6 },
    { d: 'M 1072 536 C 1094 498, 1184 466, 1352 462 C 1468 460, 1558 474, 1650 494 L 1650 546 L 1072 546 Z', fill: PAPER_PALETTE.terrace2 },
    { d: 'M 1095 504 C 1118 470, 1206 442, 1364 438 C 1474 436, 1560 448, 1650 468 L 1650 515 L 1095 515 Z', fill: PAPER_PALETTE.terrace3 },
    { d: 'M 1118 474 C 1142 444, 1226 420, 1372 416 C 1478 414, 1560 426, 1650 444 L 1650 484 L 1118 484 Z', fill: PAPER_PALETTE.terrace4 },
    { d: 'M 1144 446 C 1172 418, 1248 398, 1380 395 C 1478 393, 1555 404, 1650 422 L 1650 456 L 1144 456 Z', fill: PAPER_PALETTE.terrace1 },
    { d: 'M 1176 420 C 1202 396, 1272 378, 1388 375 C 1476 373, 1545 384, 1630 400 L 1630 428 L 1176 428 Z', fill: PAPER_PALETTE.terrace5 },
    { d: 'M 1212 396 C 1236 374, 1298 358, 1396 356 C 1474 355, 1538 364, 1608 378 L 1608 402 L 1212 402 Z', fill: PAPER_PALETTE.terrace2 },
    { d: 'M 1252 374 C 1274 356, 1326 342, 1404 340 C 1470 339, 1525 347, 1582 358 L 1582 380 L 1252 380 Z', fill: PAPER_PALETTE.terrace3 },
    { d: 'M 1296 352 C 1322 334, 1366 322, 1422 321 C 1476 320, 1522 328, 1558 342 L 1558 358 L 1296 358 Z', fill: PAPER_PALETTE.terrace1 },
  ];

  const leftBambooStalks = [
    { x: 924, baseY: 515, height: 112, width: 4.4, lean: -8, color: PAPER_PALETTE.bambooDark },
    { x: 938, baseY: 520, height: 126, width: 4.8, lean: -4, color: PAPER_PALETTE.bambooLight },
    { x: 952, baseY: 516, height: 132, width: 5.0, lean: 2, color: PAPER_PALETTE.bambooMid },
    { x: 966, baseY: 522, height: 118, width: 4.5, lean: 5, color: PAPER_PALETTE.bambooLight },
    { x: 980, baseY: 514, height: 124, width: 4.6, lean: 9, color: PAPER_PALETTE.bambooDark },
    { x: 994, baseY: 506, height: 102, width: 4.0, lean: 12, color: PAPER_PALETTE.bambooMid },
  ];

  const rightBambooStalks = [
    { x: 1246, baseY: 572, height: 135, width: 4.8, lean: -7, color: PAPER_PALETTE.bambooDark },
    { x: 1264, baseY: 568, height: 148, width: 5.2, lean: -3, color: PAPER_PALETTE.bambooLight },
    { x: 1284, baseY: 564, height: 154, width: 5.4, lean: 1, color: PAPER_PALETTE.bambooMid },
    { x: 1304, baseY: 562, height: 142, width: 4.8, lean: 5, color: PAPER_PALETTE.bambooLight },
    { x: 1326, baseY: 556, height: 138, width: 4.6, lean: 9, color: PAPER_PALETTE.bambooDark },
    { x: 1348, baseY: 550, height: 126, width: 4.4, lean: 12, color: PAPER_PALETTE.bambooMid },
  ];

  return (
    <g id="kirigami-village-and-terraces">
      {/* ================= CONCENTRIC STEPPED PAPER TERRACES (RIGHT HILLSIDE) ================= */}
      <g ref={terracesRef} id="kirigami-terraces">
        {[...terraces].reverse().map((terrace, idx) => (
          <g key={`terrace-${idx}`}>
            {shadowsEnabled && (
              <>
                <path
                  d={terrace.d}
                  fill="#192518"
                  opacity={Number((0.14 * s).toFixed(3))}
                  transform="translate(-4, 7.5)"
                />
                <path
                  d={terrace.d}
                  fill="#1D2A1C"
                  opacity={Number((0.28 * s).toFixed(3))}
                  transform="translate(-2, 4)"
                />
              </>
            )}
            <path d={terrace.d} fill={terrace.fill} />
            <path
              d={terrace.d.split(' L ')[0]}
              fill="none"
              stroke={PAPER_PALETTE.terraceEdge}
              strokeWidth={1.9}
              opacity={0.85}
            />
          </g>
        ))}

        <path
          d="M 1112 522 Q 1165 504 1235 496"
          fill="none"
          stroke="#5D6F52"
          strokeWidth={1.6}
          opacity={0.55}
        />
      </g>

      {/* ================= BAMBOO GROVES ================= */}
      <BambooGrove
        stalks={leftBambooStalks}
        groupRef={(el) => registerBambooRef(0, el)}
        shadowsEnabled={shadowsEnabled}
      />
      <BambooGrove
        stalks={rightBambooStalks}
        groupRef={(el) => registerBambooRef(1, el)}
        shadowsEnabled={shadowsEnabled}
      />

      {/* ================= WINDING VILLAGE IVORY PATHWAYS & FOOTBRIDGE ================= */}
      <g id="kirigami-village-paths">
        {/* Main sinuous ivory paper road winding from Torii peninsula through the village houses to bottom-right */}
        <path
          d="M 832 572 C 878 584, 945 596, 1002 604 C 1068 614, 1104 644, 1052 674 C 1012 696, 976 716, 1016 742 C 1052 764, 1094 786, 1130 822"
          fill="none"
          stroke={PAPER_PALETTE.pathEdge}
          strokeWidth={24}
          strokeLinecap="round"
        />
        <path
          d="M 832 572 C 878 584, 945 596, 1002 604 C 1068 614, 1104 644, 1052 674 C 1012 696, 976 716, 1016 742 C 1052 764, 1094 786, 1130 822"
          fill="none"
          stroke={PAPER_PALETTE.pathIvory}
          strokeWidth={19}
          strokeLinecap="round"
        />

        {/* Upper branch pathway climbing to the upper & terrace houses */}
        <path
          d="M 980 598 C 992 558, 1028 548, 1066 534 C 1104 520, 1096 492, 1046 472 C 1024 462, 1034 452, 1060 444"
          fill="none"
          stroke={PAPER_PALETTE.pathEdge}
          strokeWidth={17}
          strokeLinecap="round"
        />
        <path
          d="M 980 598 C 992 558, 1028 548, 1066 534 C 1104 520, 1096 492, 1046 472 C 1024 462, 1034 452, 1060 444"
          fill="none"
          stroke={PAPER_PALETTE.pathIvory}
          strokeWidth={13}
          strokeLinecap="round"
        />

        {/* Branch pathway spur toward lower-right house */}
        <path
          d="M 1034 550 C 1072 562, 1106 584, 1126 604"
          fill="none"
          stroke={PAPER_PALETTE.pathIvory}
          strokeWidth={11}
          strokeLinecap="round"
        />

        {/* Small landscaped village mound & rounded paper shrubs below the main house */}
        <path
          d="M 862 676 C 880 650, 916 642, 954 654 C 974 662, 976 686, 948 698 C 910 710, 868 702, 862 676 Z"
          fill="#627858"
        />
        <path
          d="M 884 686 C 896 668, 922 666, 944 676 C 958 684, 954 704, 932 708 C 906 712, 882 700, 884 686 Z"
          fill="#99AA84"
        />
        <path
          d="M 902 700 C 914 684, 936 686, 952 700 C 960 708, 952 722, 932 722 C 912 722, 898 712, 902 700 Z"
          fill="#BAC6A2"
        />

        {/* Arched Wooden Paper Footbridge spanning the village gully */}
        <g transform="translate(1002, 636)">
          {/* Shallow recessed shadow channel beneath bridge */}
          <ellipse cx={30} cy={38} rx={32} ry={8} fill="#465947" opacity={0.45} />
          {/* Curved bridge deck */}
          <path
            d="M 4 36 Q 30 14 58 24 L 62 34 Q 32 24 8 44 Z"
            fill={PAPER_PALETTE.roofDark}
          />
          <path
            d="M 2 33 Q 30 11 58 21 L 58 26 Q 30 16 4 38 Z"
            fill={PAPER_PALETTE.roofLight}
          />
          {/* Handrail curved posts & top rail */}
          <path
            d="M 4 27 Q 30 6 56 15"
            fill="none"
            stroke={PAPER_PALETTE.woodWall}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <line x1={10} y1={24} x2={10} y2={33} stroke={PAPER_PALETTE.roofRidge} strokeWidth={2} />
          <line x1={23} y1={17} x2={23} y2={26} stroke={PAPER_PALETTE.roofRidge} strokeWidth={2} />
          <line x1={38} y1={14} x2={38} y2={23} stroke={PAPER_PALETTE.roofRidge} strokeWidth={2} />
          <line x1={52} y1={15} x2={52} y2={24} stroke={PAPER_PALETTE.roofRidge} strokeWidth={2} />
        </g>
      </g>

      {/* ================= TRADITIONAL JAPANESE MINKA HOUSES ================= */}
      <g ref={villageHousesRef} id="kirigami-village-houses">
        {VILLAGE_HOUSES.map((house) => (
          <MinkaHouse
            key={house.id}
            house={house}
            isOpen={Boolean(openHouses[house.id])}
            interactive={interactive}
            shadowsEnabled={shadowsEnabled}
            onToggle={toggleHouse}
          />
        ))}
      </g>
    </g>
  );
};

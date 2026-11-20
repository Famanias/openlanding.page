'use client';

import React, { useMemo } from 'react';
import { buildSakuraBlossomPaths } from '../src/utils/paperGeometry';
import { PAPER_PALETTE } from '../src/utils/paperTextures';
import { PETAL_POOL_SIZE } from '../src/hooks/useWindAnimation';

interface FlowerSpec {
  x: number;
  y: number;
  r: number;
  rot: number;
  tone: 'ivory' | 'soft' | 'blush' | 'deep';
}

const TONE_FILL: Record<FlowerSpec['tone'], string> = {
  ivory: PAPER_PALETTE.petalIvory,
  soft: PAPER_PALETTE.petalSoftPink,
  blush: PAPER_PALETTE.petalBlush,
  deep: PAPER_PALETTE.petalDeepPink,
};

const SakuraCluster: React.FC<{ flowers: FlowerSpec[] }> = ({ flowers }) => {
  const built = useMemo(
    () =>
      flowers.map((f) => ({
        spec: f,
        geo: buildSakuraBlossomPaths(f.x, f.y, f.r, f.rot),
      })),
    [flowers]
  );

  return (
    <g>
      {built.map(({ spec, geo }, i) => {
        const fill = TONE_FILL[spec.tone];
        return (
          <g key={`sak-${i}`}>
            {/* Subtle paper thickness rim underneath blossom */}
            <g transform="translate(1.2, 1.8)" opacity={0.32}>
              {geo.petalPaths.map((d, pIdx) => (
                <path key={`sh-${pIdx}`} d={d} fill="#7B3E3B" />
              ))}
            </g>
            {/* 5 distinct notched sakura petals */}
            {geo.petalPaths.map((d, pIdx) => (
              <path
                key={`pt-${pIdx}`}
                d={d}
                fill={fill}
                stroke="#FFF7F4"
                strokeWidth={0.55}
              />
            ))}
            {/* Center petal crease lines */}
            {geo.highlightPaths.map((d, hIdx) => (
              <path
                key={`hl-${hIdx}`}
                d={d}
                stroke="#D88883"
                strokeWidth={0.55}
                opacity={0.55}
              />
            ))}
            {/* Radiating delicate stamens & warm center */}
            {geo.stamenLines.map((st, sIdx) => (
              <line
                key={`st-${sIdx}`}
                x1={st.x1}
                y1={st.y1}
                x2={st.x2}
                y2={st.y2}
                stroke={PAPER_PALETTE.stamenCenter}
                strokeWidth={0.75}
                strokeLinecap="round"
              />
            ))}
            <circle
              cx={geo.centerX}
              cy={geo.centerY}
              r={geo.centerRadius}
              fill={PAPER_PALETTE.stamenGold}
            />
            <circle
              cx={geo.centerX}
              cy={geo.centerY}
              r={geo.centerRadius * 0.55}
              fill={PAPER_PALETTE.stamenCenter}
            />
          </g>
        );
      })}
    </g>
  );
};

export type SakuraBranchKey =
  | 'upperRightMain'
  | 'upperRightTwigA'
  | 'upperRightTwigB'
  | 'midLeftMain'
  | 'midLeftTwig'
  | 'lowerRightMain'
  | 'lowerRightTwig';

interface CherryBlossomsProps {
  leftUnfoldRef: (el: SVGGElement | null) => void;
  rightUnfoldRef: (el: SVGGElement | null) => void;
  onRegisterBranch: (key: SakuraBranchKey, el: SVGGElement | null) => void;
  registerPetalNode: (index: number, el: SVGGElement | null) => void;
  shadowsEnabled: boolean;
}

/**
 * Layer 7: Hierarchical articulated sakura branches (upper-right, mid-left, lower-right)
 * with authentic 5-petal notched blossoms and a pooled SVG falling petal layer.
 */
export const CherryBlossoms: React.FC<CherryBlossomsProps> = ({
  leftUnfoldRef,
  rightUnfoldRef,
  onRegisterBranch,
  registerPetalNode,
  shadowsEnabled,
}) => {
  // Upper-right main canopy flowers
  const urMainFlowers: FlowerSpec[] = useMemo(
    () => [
      { x: 1476, y: 38, r: 22, rot: 12, tone: 'blush' },
      { x: 1516, y: 24, r: 20, rot: 36, tone: 'ivory' },
      { x: 1538, y: 66, r: 24, rot: 44, tone: 'ivory' },
      { x: 1492, y: 98, r: 21, rot: 25, tone: 'soft' },
      { x: 1554, y: 126, r: 23, rot: 70, tone: 'blush' },
      { x: 1456, y: 142, r: 21, rot: 18, tone: 'ivory' },
      { x: 1518, y: 174, r: 22, rot: 54, tone: 'soft' },
      { x: 1574, y: 196, r: 21, rot: 33, tone: 'ivory' },
      { x: 1486, y: 226, r: 20, rot: 62, tone: 'deep' },
      { x: 1548, y: 248, r: 23, rot: 15, tone: 'soft' },
      { x: 1438, y: 204, r: 20, rot: 48, tone: 'blush' },
      { x: 1578, y: 88, r: 21, rot: 8, tone: 'soft' },
      { x: 1422, y: 74, r: 19, rot: 50, tone: 'ivory' },
    ],
    []
  );

  // Upper-right secondary upper-left reaching twig
  const urTwigAFlowers: FlowerSpec[] = useMemo(
    () => [
      { x: 1384, y: 52, r: 20, rot: 16, tone: 'soft' },
      { x: 1334, y: 82, r: 19, rot: 42, tone: 'ivory' },
      { x: 1286, y: 108, r: 18, rot: 8, tone: 'blush' },
      { x: 1236, y: 128, r: 17, rot: 55, tone: 'ivory' },
      { x: 1362, y: 124, r: 21, rot: 28, tone: 'blush' },
      { x: 1412, y: 102, r: 22, rot: 68, tone: 'ivory' },
      { x: 1308, y: 154, r: 19, rot: 22, tone: 'soft' },
      { x: 1252, y: 172, r: 17, rot: 48, tone: 'deep' },
      { x: 1212, y: 152, r: 16, rot: 14, tone: 'ivory' },
      { x: 1364, y: 86, r: 18, rot: 35, tone: 'blush' },
      { x: 1434, y: 128, r: 19, rot: 12, tone: 'soft' },
    ],
    []
  );

  // Upper-right lower cascading twig hanging toward terraces
  const urTwigBFlowers: FlowerSpec[] = useMemo(
    () => [
      { x: 1388, y: 186, r: 20, rot: 20, tone: 'ivory' },
      { x: 1344, y: 218, r: 19, rot: 52, tone: 'blush' },
      { x: 1298, y: 242, r: 18, rot: 12, tone: 'soft' },
      { x: 1254, y: 262, r: 17, rot: 38, tone: 'ivory' },
      { x: 1214, y: 284, r: 16, rot: 66, tone: 'blush' },
      { x: 1336, y: 274, r: 19, rot: 24, tone: 'deep' },
      { x: 1396, y: 266, r: 20, rot: 44, tone: 'soft' },
      { x: 1316, y: 318, r: 18, rot: 18, tone: 'ivory' },
      { x: 1364, y: 312, r: 17, rot: 58, tone: 'blush' },
      { x: 1456, y: 288, r: 20, rot: 30, tone: 'ivory' },
      { x: 1492, y: 316, r: 19, rot: 12, tone: 'soft' },
      { x: 1424, y: 242, r: 19, rot: 5, tone: 'ivory' },
      { x: 1276, y: 294, r: 16, rot: 36, tone: 'soft' },
    ],
    []
  );

  // Mid-left sakura branch entering below upper-left pine (rich ivory + pink clusters like reference)
  const mlMainFlowers: FlowerSpec[] = useMemo(
    () => [
      { x: 38, y: 256, r: 23, rot: 18, tone: 'ivory' },
      { x: 86, y: 242, r: 22, rot: 48, tone: 'soft' },
      { x: 134, y: 264, r: 22, rot: 12, tone: 'blush' },
      { x: 64, y: 298, r: 21, rot: 62, tone: 'ivory' },
      { x: 112, y: 314, r: 23, rot: 32, tone: 'soft' },
      { x: 32, y: 342, r: 22, rot: 5, tone: 'blush' },
      { x: 164, y: 302, r: 20, rot: 22, tone: 'ivory' },
      { x: 144, y: 356, r: 19, rot: 44, tone: 'blush' },
      { x: 92, y: 372, r: 19, rot: 16, tone: 'ivory' },
      { x: 56, y: 222, r: 20, rot: 38, tone: 'ivory' },
      { x: 118, y: 232, r: 18, rot: 10, tone: 'blush' },
      { x: 184, y: 342, r: 18, rot: 52, tone: 'soft' },
    ],
    []
  );

  // Mid-left outer reaching flowering twig
  const mlTwigFlowers: FlowerSpec[] = useMemo(
    () => [
      { x: 214, y: 268, r: 19, rot: 26, tone: 'soft' },
      { x: 258, y: 262, r: 18, rot: 54, tone: 'ivory' },
      { x: 306, y: 274, r: 17, rot: 14, tone: 'blush' },
      { x: 348, y: 286, r: 16, rot: 40, tone: 'ivory' },
      { x: 232, y: 316, r: 18, rot: 68, tone: 'blush' },
      { x: 284, y: 326, r: 17, rot: 20, tone: 'soft' },
      { x: 326, y: 342, r: 16, rot: 48, tone: 'ivory' },
      { x: 256, y: 368, r: 17, rot: 10, tone: 'deep' },
      { x: 202, y: 298, r: 18, rot: 42, tone: 'ivory' },
      { x: 296, y: 298, r: 16, rot: 60, tone: 'soft' },
    ],
    []
  );

  // Lower-right sweeping foreground sakura branch crossing the cream rock face
  const lrMainFlowers: FlowerSpec[] = useMemo(
    () => [
      { x: 1492, y: 632, r: 23, rot: 14, tone: 'ivory' },
      { x: 1546, y: 668, r: 25, rot: 46, tone: 'soft' },
      { x: 1444, y: 684, r: 23, rot: 28, tone: 'blush' },
      { x: 1512, y: 724, r: 22, rot: 62, tone: 'ivory' },
      { x: 1574, y: 742, r: 23, rot: 18, tone: 'blush' },
      { x: 1468, y: 778, r: 24, rot: 36, tone: 'ivory' },
      { x: 1534, y: 804, r: 21, rot: 52, tone: 'soft' },
      { x: 1424, y: 828, r: 22, rot: 8, tone: 'blush' },
      { x: 1482, y: 856, r: 23, rot: 42, tone: 'ivory' },
      { x: 1462, y: 644, r: 20, rot: 58, tone: 'soft' },
      { x: 1554, y: 706, r: 21, rot: 24, tone: 'ivory' },
    ],
    []
  );

  const lrTwigFlowers: FlowerSpec[] = useMemo(
    () => [
      { x: 1378, y: 668, r: 21, rot: 22, tone: 'soft' },
      { x: 1326, y: 688, r: 20, rot: 56, tone: 'ivory' },
      { x: 1364, y: 734, r: 22, rot: 12, tone: 'blush' },
      { x: 1308, y: 754, r: 20, rot: 44, tone: 'ivory' },
      { x: 1256, y: 786, r: 19, rot: 30, tone: 'soft' },
      { x: 1352, y: 792, r: 21, rot: 64, tone: 'ivory' },
      { x: 1294, y: 826, r: 20, rot: 16, tone: 'blush' },
      { x: 1388, y: 854, r: 19, rot: 48, tone: 'soft' },
      { x: 1334, y: 718, r: 19, rot: 38, tone: 'ivory' },
      { x: 1272, y: 748, r: 18, rot: 8, tone: 'blush' },
    ],
    []
  );

  const petalIndices = useMemo(
    () => Array.from({ length: PETAL_POOL_SIZE }, (_, i) => i),
    []
  );

  return (
    <g id="kirigami-cherry-blossoms">
      {/* ==================== MID-LEFT ARTICULATED SAKURA BRANCH ==================== */}
      <g ref={leftUnfoldRef} id="sakura-left-unfold">
        <g
          ref={(el) => onRegisterBranch('midLeftMain', el)}
          style={{ transformBox: 'fill-box', transformOrigin: '0% 45%' }}
        >
          {/* Cast shadow under bark bough */}
          {shadowsEnabled && (
            <path
              d="M -35 318 C 36 306, 108 292, 186 286"
              fill="none"
              stroke="#2C1D1B"
              strokeWidth={13}
              strokeLinecap="round"
              opacity={0.22}
              transform="translate(4, 7)"
            />
          )}
          {/* Main dark bark bough */}
          <path
            d="M -35 318 C 36 306, 108 292, 186 286"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBark}
            strokeWidth={11}
            strokeLinecap="round"
          />
          <path
            d="M 18 308 C 68 276, 108 256, 146 244"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBarkLight}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <path
            d="M 52 312 C 92 342, 128 362, 168 372"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBark}
            strokeWidth={6}
            strokeLinecap="round"
          />

          <SakuraCluster flowers={mlMainFlowers} />

          {/* Secondary outer flexible twig */}
          <g
            ref={(el) => onRegisterBranch('midLeftTwig', el)}
            style={{ transformBox: 'fill-box', transformOrigin: '0% 50%' }}
          >
            <path
              d="M 180 286 C 236 278, 294 274, 356 286"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBark}
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path
              d="M 218 282 C 258 308, 294 328, 336 346"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBarkLight}
              strokeWidth={4.5}
              strokeLinecap="round"
            />
            <SakuraCluster flowers={mlTwigFlowers} />
          </g>
        </g>
      </g>

      {/* ==================== RIGHT-SIDE ARTICULATED SAKURA BRANCHES ==================== */}
      <g ref={rightUnfoldRef} id="sakura-right-unfold">
        {/* 1. Upper-Right Major Cascading Sakura Canopy */}
        <g
          ref={(el) => onRegisterBranch('upperRightMain', el)}
          style={{ transformBox: 'fill-box', transformOrigin: '100% 35%' }}
        >
          {shadowsEnabled && (
            <path
              d="M 1645 148 C 1582 142, 1518 148, 1446 168 C 1412 178, 1386 192, 1364 206"
              fill="none"
              stroke="#2C1D1B"
              strokeWidth={16}
              strokeLinecap="round"
              opacity={0.22}
              transform="translate(4, 7)"
            />
          )}
          {/* Main sweeping dark chocolate bark branch entering from top-right */}
          <path
            d="M 1645 148 C 1582 142, 1518 148, 1446 168 C 1412 178, 1386 192, 1364 206"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBark}
            strokeWidth={14}
            strokeLinecap="round"
          />
          <path
            d="M 1556 146 C 1536 96, 1512 58, 1482 26"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBark}
            strokeWidth={8.5}
            strokeLinecap="round"
          />
          <path
            d="M 1518 156 C 1546 192, 1574 228, 1598 264"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBarkLight}
            strokeWidth={7}
            strokeLinecap="round"
          />

          <SakuraCluster flowers={urMainFlowers} />

          {/* Secondary Upper-Left Reaching Sub-Branch */}
          <g
            ref={(el) => onRegisterBranch('upperRightTwigA', el)}
            style={{ transformBox: 'fill-box', transformOrigin: '100% 60%' }}
          >
            <path
              d="M 1456 162 C 1396 132, 1324 114, 1222 134"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBark}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <path
              d="M 1412 138 C 1384 96, 1364 68, 1336 46"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBarkLight}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <path
              d="M 1342 126 C 1304 146, 1272 160, 1244 176"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBark}
              strokeWidth={4.5}
              strokeLinecap="round"
            />
            <SakuraCluster flowers={urTwigAFlowers} />
          </g>

          {/* Secondary Lower Cascading Sub-Branch */}
          <g
            ref={(el) => onRegisterBranch('upperRightTwigB', el)}
            style={{ transformBox: 'fill-box', transformOrigin: '100% 15%' }}
          >
            <path
              d="M 1446 174 C 1394 216, 1322 246, 1222 276"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBark}
              strokeWidth={6.5}
              strokeLinecap="round"
            />
            <path
              d="M 1392 214 C 1372 262, 1344 296, 1318 326"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBarkLight}
              strokeWidth={4.8}
              strokeLinecap="round"
            />
            <path
              d="M 1442 204 C 1466 248, 1484 286, 1498 322"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBark}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <SakuraCluster flowers={urTwigBFlowers} />
          </g>
        </g>

        {/* 2. Lower-Right Foreground Sweeping Sakura Branch */}
        <g
          ref={(el) => onRegisterBranch('lowerRightMain', el)}
          style={{ transformBox: 'fill-box', transformOrigin: '100% 80%' }}
        >
          {shadowsEnabled && (
            <path
              d="M 1640 832 C 1572 794, 1502 762, 1424 742"
              fill="none"
              stroke="#2C1D1B"
              strokeWidth={15}
              strokeLinecap="round"
              opacity={0.22}
              transform="translate(4, 7)"
            />
          )}
          <path
            d="M 1640 832 C 1572 794, 1502 762, 1424 742"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBark}
            strokeWidth={13}
            strokeLinecap="round"
          />
          <path
            d="M 1554 786 C 1528 726, 1504 674, 1486 626"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBarkLight}
            strokeWidth={7.5}
            strokeLinecap="round"
          />
          <path
            d="M 1502 764 C 1476 812, 1456 846, 1432 874"
            fill="none"
            stroke={PAPER_PALETTE.sakuraBark}
            strokeWidth={6}
            strokeLinecap="round"
          />

          <SakuraCluster flowers={lrMainFlowers} />

          {/* Flexible Outer Foreground Twig */}
          <g
            ref={(el) => onRegisterBranch('lowerRightTwig', el)}
            style={{ transformBox: 'fill-box', transformOrigin: '100% 50%' }}
          >
            <path
              d="M 1432 744 C 1372 732, 1318 746, 1252 786"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBark}
              strokeWidth={6.5}
              strokeLinecap="round"
            />
            <path
              d="M 1384 736 C 1364 704, 1346 684, 1322 674"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBarkLight}
              strokeWidth={4.8}
              strokeLinecap="round"
            />
            <path
              d="M 1356 746 C 1336 786, 1314 812, 1288 836"
              fill="none"
              stroke={PAPER_PALETTE.sakuraBark}
              strokeWidth={4.5}
              strokeLinecap="round"
            />
            <SakuraCluster flowers={lrTwigFlowers} />
          </g>
        </g>
      </g>

      {/* ==================== POOLED FALLING SAKURA PETALS ==================== */}
      <g id="kirigami-falling-petals" pointerEvents="none">
        {petalIndices.map((idx) => (
          <g
            key={`fp-${idx}`}
            ref={(el) => registerPetalNode(idx, el)}
            opacity={0}
          >
            {/* Hand-cut notched single sakura petal silhouette */}
            <path
              d="M 0 -7 C 4.5 -5, 6 1, 3.2 6.5 L 0 4.5 L -3.2 6.5 C -6 1, -4.5 -5, 0 -7 Z"
              fill={idx % 3 === 0 ? PAPER_PALETTE.petalIvory : idx % 3 === 1 ? PAPER_PALETTE.petalSoftPink : PAPER_PALETTE.petalBlush}
              stroke="#FFF8F5"
              strokeWidth={0.45}
            />
          </g>
        ))}
      </g>
    </g>
  );
};

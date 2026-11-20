'use client';

import React, { useMemo } from 'react';
import {
  buildCypressSpirePath,
  buildPineFanPaths,
} from '../src/utils/paperGeometry';
import { PAPER_PALETTE } from '../src/utils/paperTextures';

interface PineFanSpec {
  cx: number;
  cy: number;
  r: number;
  startDeg: number;
  endDeg: number;
  needles: number;
  fill: string;
  edge: string;
}

const PineFanCluster: React.FC<{
  fans: PineFanSpec[];
  shadowsEnabled: boolean;
}> = ({ fans, shadowsEnabled }) => {
  const computed = useMemo(
    () =>
      fans.map((f) => ({
        spec: f,
        geo: buildPineFanPaths(f.cx, f.cy, f.r, f.startDeg, f.endDeg, f.needles),
      })),
    [fans]
  );

  return (
    <g>
      {computed.map(({ spec, geo }, idx) => (
        <g key={`fan-${idx}`}>
          {/* Slight offset shadow backing for physical paper thickness */}
          {shadowsEnabled && (
            <path
              d={geo.fanOutlinePath}
              fill="#233120"
              opacity={0.38}
              transform="translate(3, 4)"
            />
          )}
          {/* Cut cardstock fan */}
          <path
            d={geo.fanOutlinePath}
            fill={spec.fill}
            stroke={spec.edge}
            strokeWidth={0.95}
            strokeLinejoin="round"
          />
          {/* Radial paper needle crease lines */}
          {geo.needleCuts.map((d, k) => (
            <path
              key={`cut-${k}`}
              d={d}
              stroke="#2C3B27"
              strokeWidth={0.75}
              opacity={0.42}
            />
          ))}
        </g>
      ))}
    </g>
  );
};

interface PaperMidTreesProps {
  midTreesRef: (el: SVGGElement | null) => void;
  shadowsEnabled: boolean;
}

/**
 * Layer 5: Midground cypress groves, valley bonsai pines, and hillside evergreen clusters.
 */
export const PaperMidTrees: React.FC<PaperMidTreesProps> = ({
  midTreesRef,
  shadowsEnabled,
}) => {
  const cypresses = useMemo(() => {
    const specs = [
      // Left pale-cream/sage valley evergreens
      { x: 274, y: 575, w: 46, h: 122, tiers: 5, fill: PAPER_PALETTE.cypressMid },
      { x: 320, y: 584, w: 58, h: 158, tiers: 6, fill: PAPER_PALETTE.cypressPale },
      { x: 356, y: 598, w: 50, h: 138, tiers: 5, fill: PAPER_PALETTE.cypressMid },
      { x: 392, y: 616, w: 56, h: 152, tiers: 6, fill: PAPER_PALETTE.cypressPale },
      { x: 424, y: 632, w: 42, h: 112, tiers: 5, fill: PAPER_PALETTE.pineFanDeep },
      // River-edge dark pines on left foreground bank
      { x: 568, y: 724, w: 50, h: 124, tiers: 5, fill: PAPER_PALETTE.cypressDark },
      { x: 612, y: 748, w: 58, h: 146, tiers: 6, fill: PAPER_PALETTE.pineFanDeep },
      { x: 642, y: 772, w: 44, h: 108, tiers: 5, fill: PAPER_PALETTE.cypressMid },
      // Right-side tall spruces flanking the village & terraces
      { x: 1172, y: 652, w: 48, h: 126, tiers: 5, fill: PAPER_PALETTE.cypressDark },
      { x: 1214, y: 668, w: 60, h: 162, tiers: 6, fill: PAPER_PALETTE.pineFanDeep },
      { x: 1256, y: 658, w: 66, h: 178, tiers: 6, fill: PAPER_PALETTE.cypressDark },
      { x: 1304, y: 646, w: 62, h: 164, tiers: 6, fill: PAPER_PALETTE.pineFanMid },
      { x: 1344, y: 640, w: 54, h: 144, tiers: 5, fill: PAPER_PALETTE.cypressPale },
    ];
    return specs.map((s) => ({ ...s, path: buildCypressSpirePath(s.x, s.y, s.w, s.h, s.tiers) }));
  }, []);

  // Bonsai-like small Japanese pines along the left meadow shore
  const valleyBonsaiFans: PineFanSpec[] = useMemo(
    () => [
      { cx: 458, cy: 505, r: 34, startDeg: -165, endDeg: -15, needles: 9, fill: PAPER_PALETTE.pineFanDeep, edge: '#899A77' },
      { cx: 492, cy: 526, r: 28, startDeg: -160, endDeg: -20, needles: 8, fill: PAPER_PALETTE.pineFanMid, edge: '#A4B490' },
      { cx: 445, cy: 542, r: 30, startDeg: -170, endDeg: -10, needles: 8, fill: PAPER_PALETTE.pineFanDeep, edge: '#7A8C68' },
      { cx: 548, cy: 562, r: 32, startDeg: -165, endDeg: -15, needles: 9, fill: PAPER_PALETTE.pineFanDeep, edge: '#8A9B78' },
      { cx: 582, cy: 588, r: 28, startDeg: -165, endDeg: -15, needles: 8, fill: PAPER_PALETTE.pineFanMid, edge: '#A0B08D' },
      { cx: 526, cy: 598, r: 34, startDeg: -165, endDeg: -15, needles: 9, fill: PAPER_PALETTE.pineFanShadow, edge: '#778A65' },
      // Small village accent pine near the bottom-right bridge
      { cx: 1094, cy: 718, r: 34, startDeg: -165, endDeg: -15, needles: 9, fill: PAPER_PALETTE.pineFanShadow, edge: '#6E825E' },
      { cx: 1068, cy: 736, r: 28, startDeg: -170, endDeg: -15, needles: 8, fill: PAPER_PALETTE.pineFanDeep, edge: '#849672' },
    ],
    []
  );

  return (
    <g ref={midTreesRef} id="kirigami-mid-trees">
      {/* Stepped cut-paper cypress / evergreen spires */}
      <g>
        {cypresses.map((tree, idx) => (
          <g key={`cyp-${idx}`}>
            {shadowsEnabled && (
              <path d={tree.path} fill="#1C291C" opacity={0.26} transform="translate(3, 4)" />
            )}
            <path d={tree.path} fill={tree.fill} />
            {/* Vertical subtle origami fold crease down center of tree */}
            <path
              d={`M ${tree.x} ${tree.y - tree.h} L ${tree.x + tree.w * 0.25} ${tree.y - tree.h * 0.08} L ${tree.x} ${tree.y} Z`}
              fill="#263626"
              opacity={0.18}
            />
          </g>
        ))}
      </g>

      {/* Valley bonsai pine trunks */}
      <g stroke={PAPER_PALETTE.barkDark} strokeLinecap="round" fill="none">
        <path d="M 468 620 C 464 585, 456 545, 462 508" strokeWidth={7} />
        <path d="M 462 558 Q 485 544 494 528" strokeWidth={4.5} />
        <path d="M 544 654 C 542 622, 550 592, 548 564" strokeWidth={6.5} />
        <path d="M 548 608 Q 570 600 584 588" strokeWidth={4} />
        <path d="M 1094 762 C 1092 742, 1096 730, 1094 716" strokeWidth={6} />
      </g>

      <PineFanCluster fans={valleyBonsaiFans} shadowsEnabled={shadowsEnabled} />
    </g>
  );
};

interface PaperForegroundPinesProps {
  registerPineTipRef: (index: number, el: SVGGElement | null) => void;
  shadowsEnabled: boolean;
}

/**
 * Layer 6/7 Framing Japanese Pine Trees with richly stacked handcrafted needle fans
 * matching the upper-left, mid-left, and mid-right pine silhouettes in the reference.
 */
export const PaperForegroundPines: React.FC<PaperForegroundPinesProps> = ({
  registerPineTipRef,
  shadowsEnabled,
}) => {
  const upperLeftFans: PineFanSpec[] = useMemo(
    () => [
      { cx: 88, cy: 62, r: 92, startDeg: -170, endDeg: -10, needles: 15, fill: PAPER_PALETTE.pineFanDeep, edge: '#96A684' },
      { cx: 18, cy: 112, r: 78, startDeg: -145, endDeg: 10, needles: 13, fill: PAPER_PALETTE.pineFanMid, edge: '#AAB898' },
      { cx: 148, cy: 96, r: 74, startDeg: -165, endDeg: 5, needles: 13, fill: PAPER_PALETTE.pineFanMid, edge: '#B0BE9D' },
      { cx: 74, cy: 110, r: 72, startDeg: -165, endDeg: -15, needles: 13, fill: PAPER_PALETTE.pineFanLight, edge: '#C5CFAF' },
      { cx: 162, cy: 182, r: 84, startDeg: -168, endDeg: -12, needles: 14, fill: PAPER_PALETTE.pineFanDeep, edge: '#8C9E7A' },
      { cx: 215, cy: 205, r: 68, startDeg: -155, endDeg: 15, needles: 12, fill: PAPER_PALETTE.pineFanMid, edge: '#A4B490' },
      { cx: 92, cy: 174, r: 64, startDeg: -160, endDeg: -5, needles: 12, fill: PAPER_PALETTE.pineFanLight, edge: '#C4CEAF' },
      { cx: 26, cy: 188, r: 62, startDeg: -140, endDeg: 25, needles: 11, fill: PAPER_PALETTE.pineFanDeep, edge: '#8A9B78' },
    ],
    []
  );

  const midLeftFans: PineFanSpec[] = useMemo(
    () => [
      { cx: 112, cy: 432, r: 96, startDeg: -175, endDeg: -5, needles: 16, fill: PAPER_PALETTE.pineFanDeep, edge: '#91A27F' },
      { cx: 188, cy: 492, r: 84, startDeg: -165, endDeg: 10, needles: 14, fill: PAPER_PALETTE.pineFanShadow, edge: '#7C8E6B' },
      { cx: 78, cy: 468, r: 76, startDeg: -170, endDeg: -10, needles: 13, fill: PAPER_PALETTE.pineFanMid, edge: '#ACBA99' },
      { cx: 56, cy: 560, r: 88, startDeg: -168, endDeg: 8, needles: 15, fill: PAPER_PALETTE.pineFanLight, edge: '#CCD5B6' },
      { cx: 202, cy: 598, r: 86, startDeg: -172, endDeg: -8, needles: 14, fill: PAPER_PALETTE.pineFanMid, edge: '#A4B490' },
      { cx: 254, cy: 652, r: 82, startDeg: -165, endDeg: 12, needles: 14, fill: PAPER_PALETTE.pineFanDeep, edge: '#8C9D7B' },
      { cx: 158, cy: 648, r: 74, startDeg: -170, endDeg: -10, needles: 13, fill: PAPER_PALETTE.pineFanLight, edge: '#C6D0B1' },
      { cx: 64, cy: 682, r: 78, startDeg: -162, endDeg: 16, needles: 13, fill: PAPER_PALETTE.pineFanMid, edge: '#B0BE9D' },
    ],
    []
  );

  const midRightFans: PineFanSpec[] = useMemo(
    () => [
      { cx: 1525, cy: 416, r: 104, startDeg: -175, endDeg: -8, needles: 16, fill: PAPER_PALETTE.pineFanShadow, edge: '#7A8C6A' },
      { cx: 1435, cy: 458, r: 94, startDeg: -172, endDeg: -12, needles: 15, fill: PAPER_PALETTE.pineFanDeep, edge: '#8FA07D' },
      { cx: 1556, cy: 486, r: 90, startDeg: -170, endDeg: 8, needles: 14, fill: PAPER_PALETTE.pineFanMid, edge: '#A5B492' },
      { cx: 1474, cy: 518, r: 86, startDeg: -175, endDeg: -5, needles: 14, fill: PAPER_PALETTE.pineFanDeep, edge: '#93A381' },
      { cx: 1386, cy: 526, r: 78, startDeg: -175, endDeg: -10, needles: 13, fill: PAPER_PALETTE.pineFanLight, edge: '#BAC5A4' },
      { cx: 1554, cy: 562, r: 82, startDeg: -165, endDeg: 12, needles: 13, fill: PAPER_PALETTE.pineFanShadow, edge: '#788967' },
    ],
    []
  );

  return (
    <g id="kirigami-foreground-pines">
      {/* 1. Upper-left Japanese Pine */}
      <g
        ref={(el) => registerPineTipRef(0, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '0% 25%' }}
      >
        <g>
          {shadowsEnabled && (
            <path
              d="M -25 225 C 28 206, 66 168, 92 126 C 104 106, 118 88, 128 74"
              fill="none"
              stroke="#241812"
              strokeWidth={24}
              strokeLinecap="round"
              opacity={0.25}
              transform="translate(4, 6)"
            />
          )}
          <path
            d="M -25 225 C 28 206, 66 168, 92 126 C 104 106, 118 88, 128 74"
            fill="none"
            stroke={PAPER_PALETTE.barkDark}
            strokeWidth={22}
            strokeLinecap="round"
          />
          <path
            d="M 48 186 C 96 188, 146 196, 198 206"
            fill="none"
            stroke={PAPER_PALETTE.barkMid}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <path
            d="M 18 198 C 46 168, 72 126, 90 92"
            fill="none"
            stroke={PAPER_PALETTE.barkMid}
            strokeWidth={9}
            strokeLinecap="round"
          />
        </g>
        <PineFanCluster fans={upperLeftFans} shadowsEnabled={shadowsEnabled} />
      </g>

      {/* 2. Mid-left Japanese Pine hugging the foreground terracotta cliff */}
      <g
        ref={(el) => registerPineTipRef(1, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '5% 85%' }}
      >
        <g>
          <path
            d="M 12 752 C 36 692, 68 625, 114 558 C 138 522, 166 492, 192 486"
            fill="none"
            stroke={PAPER_PALETTE.barkDark}
            strokeWidth={26}
            strokeLinecap="round"
          />
          <path
            d="M 76 626 C 122 612, 178 618, 232 642"
            fill="none"
            stroke={PAPER_PALETTE.barkMid}
            strokeWidth={14}
            strokeLinecap="round"
          />
          <path
            d="M 88 576 C 102 522, 110 472, 114 432"
            fill="none"
            stroke={PAPER_PALETTE.barkMid}
            strokeWidth={14}
            strokeLinecap="round"
          />
        </g>
        <PineFanCluster fans={midLeftFans} shadowsEnabled={shadowsEnabled} />
      </g>

      {/* 3. Mid-right Japanese Pine overhanging terraces and terracotta cliff */}
      <g
        ref={(el) => registerPineTipRef(2, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '100% 70%' }}
      >
        <g>
          <path
            d="M 1630 578 C 1568 552, 1516 520, 1456 494"
            fill="none"
            stroke={PAPER_PALETTE.barkDark}
            strokeWidth={22}
            strokeLinecap="round"
          />
          <path
            d="M 1554 538 C 1528 492, 1498 462, 1458 446"
            fill="none"
            stroke={PAPER_PALETTE.barkMid}
            strokeWidth={12}
            strokeLinecap="round"
          />
        </g>
        <PineFanCluster fans={midRightFans} shadowsEnabled={shadowsEnabled} />
      </g>
    </g>
  );
};

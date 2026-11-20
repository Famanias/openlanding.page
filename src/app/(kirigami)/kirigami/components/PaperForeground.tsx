'use client';

import React, { useMemo } from 'react';
import {
  buildFernRosettePath,
  buildGrassBladePath,
  buildSakuraBlossomPaths,
} from '../utils/paperGeometry';
import { PAPER_PALETTE } from '../utils/paperTextures';
import { PaperCastShadow } from './PaperShadow';

interface PaperForegroundProps {
  foregroundRocksRef: (el: SVGGElement | null) => void;
  registerGrassRef: (index: number, el: SVGGElement | null) => void;
  shadowStrength: number;
}

const LEFT_CLIFF_REAR =
  'M -90 940 L -90 438 L 48 414 L 154 410 L 266 472 L 368 594 L 468 652 L 568 726 L 690 774 L 844 832 L 908 940 Z';
const LEFT_CLIFF_MID =
  'M -80 940 L -80 486 L 78 464 L 194 494 L 318 608 L 434 662 L 546 728 L 714 786 L 866 864 L 892 940 Z';
const LEFT_CLIFF_CREST =
  'M -60 940 L -60 562 L 122 558 L 274 634 L 408 606 L 466 588 L 542 648 L 628 738 L 792 782 L 876 896 L 876 940 Z';
const LEFT_CREAM_BOULDER =
  'M 252 764 L 298 672 L 368 634 L 424 638 L 514 708 L 574 794 L 496 864 L 252 864 Z';
const LEFT_TERRA_WEDGE =
  'M 248 940 L 296 742 L 382 688 L 434 696 L 528 758 L 616 854 L 664 940 Z';
const LEFT_CREAM_PEAK =
  'M 526 940 L 552 812 L 584 756 L 656 756 L 732 794 L 802 856 L 844 940 Z';

const RIGHT_CLIFF_REAR =
  'M 905 940 L 948 824 L 1068 726 L 1228 656 L 1368 548 L 1518 502 L 1720 492 L 1720 940 Z';
const RIGHT_CLIFF_MID =
  'M 918 940 L 966 842 L 1094 752 L 1262 678 L 1424 584 L 1584 548 L 1720 538 L 1720 940 Z';
const RIGHT_CREAM_SLAB =
  'M 936 940 L 1028 842 L 1142 746 L 1252 676 L 1362 666 L 1482 624 L 1648 594 L 1720 600 L 1720 940 Z';

/**
 * Layer 6: Stacked terracotta-rust and faceted cream-ivory cut-paper foreground cliffs,
 * origami boulders, sword grasses, cream feathery reeds, fern rosettes, and wildflowers.
 */
export const PaperForeground: React.FC<PaperForegroundProps> = ({
  foregroundRocksRef,
  registerGrassRef,
  shadowStrength,
}) => {
  const shadowsEnabled = shadowStrength > 0.005;
  const leftGrassTuft = useMemo(
    () => [
      buildGrassBladePath(22, 925, 228, -36, 20),
      buildGrassBladePath(44, 925, 260, -10, 22),
      buildGrassBladePath(66, 925, 244, 24, 20),
      buildGrassBladePath(88, 925, 212, 56, 18),
      buildGrassBladePath(106, 925, 178, 86, 16),
      buildGrassBladePath(122, 925, 148, 108, 14),
    ],
    []
  );

  const midLeftCreamReeds = useMemo(
    () => [
      buildGrassBladePath(462, 922, 162, -46, 11),
      buildGrassBladePath(478, 922, 186, -18, 12),
      buildGrassBladePath(494, 922, 198, 12, 12),
      buildGrassBladePath(512, 922, 176, 42, 11),
      buildGrassBladePath(530, 922, 146, 68, 10),
    ],
    []
  );

  const lowerCenterGrass = useMemo(
    () => [
      buildGrassBladePath(575, 922, 134, -22, 11),
      buildGrassBladePath(592, 922, 158, 8, 12),
      buildGrassBladePath(612, 922, 142, 34, 11),
      buildGrassBladePath(632, 922, 118, 56, 10),
    ],
    []
  );

  const rightGrassTuft = useMemo(
    () => [
      buildGrassBladePath(1204, 925, 168, -44, 14),
      buildGrassBladePath(1224, 925, 192, -16, 16),
      buildGrassBladePath(1246, 925, 174, 18, 15),
      buildGrassBladePath(1268, 925, 148, 48, 13),
      buildGrassBladePath(1510, 925, 188, -32, 16),
      buildGrassBladePath(1534, 925, 216, -6, 18),
      buildGrassBladePath(1558, 925, 196, 22, 16),
      buildGrassBladePath(1580, 925, 164, 44, 14),
    ],
    []
  );

  const leftRosettes = useMemo(
    () => [
      { d: buildFernRosettePath(292, 836, 62, 11), fill: PAPER_PALETTE.fernDark },
      { d: buildFernRosettePath(328, 868, 54, 10), fill: PAPER_PALETTE.fernMid },
      { d: buildFernRosettePath(394, 864, 68, 12), fill: PAPER_PALETTE.fernDark },
      { d: buildFernRosettePath(412, 882, 54, 11), fill: PAPER_PALETTE.pineFanMid },
      { d: buildFernRosettePath(206, 768, 52, 9), fill: PAPER_PALETTE.fernMid },
      { d: buildFernRosettePath(1292, 882, 64, 10), fill: PAPER_PALETTE.fernDark },
    ],
    []
  );

  const foregroundWildflowers = useMemo(
    () => [
      { ...buildSakuraBlossomPaths(142, 742, 22, 15), color: PAPER_PALETTE.petalSoftPink },
      { ...buildSakuraBlossomPaths(224, 718, 25, 42), color: PAPER_PALETTE.petalIvory },
      { ...buildSakuraBlossomPaths(268, 742, 20, 8), color: PAPER_PALETTE.petalBlush },
      { ...buildSakuraBlossomPaths(184, 796, 22, 28), color: PAPER_PALETTE.petalSoftPink },
      { ...buildSakuraBlossomPaths(232, 858, 24, 64), color: PAPER_PALETTE.petalBlush },
      { ...buildSakuraBlossomPaths(148, 868, 19, 12), color: PAPER_PALETTE.petalIvory },
    ],
    []
  );

  return (
    <g ref={foregroundRocksRef} id="kirigami-foreground-terrain">
      {/* ==================== LEFT FOREGROUND TERRACOTTA & CREAM ROCK CLIFFS ==================== */}
      <g id="kirigami-left-cliff">
        <g>
          <PaperCastShadow d={LEFT_CLIFF_REAR} strength={shadowStrength * 1.15} color="#28160F" elevation={1.2} />
          <path d={LEFT_CLIFF_REAR} fill={PAPER_PALETTE.rockTerraDeep} />
          <path
            d="M -90 438 L 48 414 L 154 410 L 266 472 L 368 594 L 468 652 L 568 726"
            fill="none"
            stroke="#DF896B"
            strokeWidth={2.2}
            opacity={0.75}
          />
        </g>

        <g>
          <PaperCastShadow d={LEFT_CLIFF_MID} strength={shadowStrength * 1.1} color="#28160F" elevation={1.1} />
          <path d={LEFT_CLIFF_MID} fill={PAPER_PALETTE.rockTerraMain} />
          <path
            d="M 194 494 L 318 608 L 358 708 L 222 652 Z"
            fill={PAPER_PALETTE.rockTerraLight}
            opacity={0.55}
          />
          <path
            d="M 78 464 L 194 494 L 318 608 L 434 662 L 546 728"
            fill="none"
            stroke="#E79C7F"
            strokeWidth={2.2}
          />
        </g>

        <g>
          <PaperCastShadow d={LEFT_CLIFF_CREST} strength={shadowStrength * 1.1} color="#28160F" elevation={1.1} />
          <path d={LEFT_CLIFF_CREST} fill={PAPER_PALETTE.rockTerraLight} />
          <path
            d="M 466 588 L 542 648 L 628 738 L 538 776 L 444 686 Z"
            fill={PAPER_PALETTE.rockTerraDeep}
            opacity={0.48}
          />
          <path
            d="M 274 634 L 408 606 L 466 588 L 542 648 L 628 738"
            fill="none"
            stroke="#F2B49A"
            strokeWidth={2.4}
          />
        </g>

        <g>
          <PaperCastShadow d={LEFT_CREAM_BOULDER} strength={shadowStrength * 1.15} color="#342015" elevation={1.15} />
          <path d={LEFT_CREAM_BOULDER} fill={PAPER_PALETTE.rockCreamLight} />
          <polygon points="424,638 514,708 574,794 446,790 398,704" fill={PAPER_PALETTE.rockCreamMid} />
          <polygon points="298,672 368,634 398,704 334,752" fill="#FAF0DF" opacity={0.75} />
          <path
            d="M 252 764 L 298 672 L 368 634 L 424 638 L 514 708"
            fill="none"
            stroke="#FFF8ED"
            strokeWidth={2.2}
          />
        </g>

        <g>
          <PaperCastShadow d={LEFT_TERRA_WEDGE} strength={shadowStrength * 1.15} color="#28160F" elevation={1.1} />
          <path d={LEFT_TERRA_WEDGE} fill={PAPER_PALETTE.rockTerraMain} />
          <polygon points="434,696 528,758 616,854 486,882 406,772" fill={PAPER_PALETTE.rockTerraDeep} opacity={0.45} />
          <path
            d="M 296 742 L 382 688 L 434 696 L 528 758"
            fill="none"
            stroke="#EB9F82"
            strokeWidth={2.2}
          />
        </g>

        <g>
          <PaperCastShadow d={LEFT_CREAM_PEAK} strength={shadowStrength * 1.15} color="#2D1D14" elevation={1.15} />
          <path d={LEFT_CREAM_PEAK} fill={PAPER_PALETTE.rockCreamLight} />
          <polygon points="656,756 732,794 802,856 724,940 648,844" fill={PAPER_PALETTE.rockCreamMid} />
          <polygon points="732,794 802,856 844,940 756,940" fill={PAPER_PALETTE.rockCreamShade} opacity={0.7} />
          <path
            d="M 552 812 L 584 756 L 656 756 L 732 794"
            fill="none"
            stroke="#FFF9F0"
            strokeWidth={2.2}
          />
          <path d="M 656 756 L 648 844 L 672 940" fill="none" stroke="#C5AD8A" strokeWidth={1.6} />
          <path d="M 732 794 L 724 888 L 748 940" fill="none" stroke="#B69B77" strokeWidth={1.5} />
        </g>
      </g>

      {/* ==================== RIGHT FOREGROUND TERRACOTTA & CREAM ROCK CLIFFS ==================== */}
      <g id="kirigami-right-cliff">
        <g>
          <PaperCastShadow d={RIGHT_CLIFF_REAR} strength={shadowStrength * 1.15} color="#26160F" elevation={1.2} />
          <path d={RIGHT_CLIFF_REAR} fill={PAPER_PALETTE.rockTerraDeep} />
          <path
            d="M 1228 656 L 1368 548 L 1518 502 L 1720 492"
            fill="none"
            stroke="#D67C5E"
            strokeWidth={2.2}
            opacity={0.72}
          />
        </g>

        <g>
          <PaperCastShadow d={RIGHT_CLIFF_MID} strength={shadowStrength * 1.1} color="#26160F" elevation={1.1} />
          <path d={RIGHT_CLIFF_MID} fill={PAPER_PALETTE.rockTerraMain} />
          <path
            d="M 966 842 L 1094 752 L 1262 678 L 1424 584"
            fill="none"
            stroke="#EA9D80"
            strokeWidth={2.2}
          />
        </g>

        <g>
          <PaperCastShadow d={RIGHT_CREAM_SLAB} strength={shadowStrength * 1.2} color="#2D1D14" elevation={1.25} />
          <path d={RIGHT_CREAM_SLAB} fill={PAPER_PALETTE.rockCreamLight} />
          <polygon
            points="1142,746 1252,676 1296,742 1172,832 1044,940 966,940"
            fill={PAPER_PALETTE.rockCreamMain}
          />
          <polygon
            points="1252,676 1362,666 1446,748 1312,866 1168,940 1072,940"
            fill={PAPER_PALETTE.rockCreamMid}
            opacity={0.78}
          />
          <polygon
            points="1362,666 1482,624 1648,594 1720,760 1546,940 1312,940"
            fill={PAPER_PALETTE.rockCreamMain}
          />
          <polygon
            points="1482,624 1648,594 1720,680 1588,832 1468,756"
            fill={PAPER_PALETTE.rockCreamShade}
            opacity={0.45}
          />
          <path
            d="M 936 940 L 1028 842 L 1142 746 L 1252 676 L 1362 666 L 1482 624 L 1648 594"
            fill="none"
            stroke="#FFFBF4"
            strokeWidth={2.5}
          />
          <path
            d="M 1018 940 L 1126 822 L 1236 742 L 1358 724"
            fill="none"
            stroke="#C7AE8B"
            strokeWidth={1.8}
          />
        </g>

        <g>
          <path
            d="M 1310 940 C 1345 864, 1412 832, 1492 848 C 1562 862, 1630 854, 1700 886 L 1700 940 Z"
            fill={PAPER_PALETTE.pineFanMid}
          />
        </g>
      </g>

      {/* ==================== FOREGROUND BOTANICAL CLUSTERS ==================== */}
      <g>
        {leftRosettes.map((r, i) => (
          <g key={`ros-${i}`}>
            {shadowsEnabled && (
              <path d={r.d} fill="#1B2619" opacity={0.28} transform="translate(3.5, 4.5)" />
            )}
            <path d={r.d} fill={r.fill} stroke="#8FA07D" strokeWidth={0.9} />
          </g>
        ))}
      </g>

      {/* Left foreground blush wildflowers on stems */}
      <g>
        <g stroke="#5E7354" strokeWidth={2.5} fill="none" strokeLinecap="round">
          <path d="M 162 860 Q 152 802 142 742" />
          <path d="M 218 850 Q 222 785 224 718" />
          <path d="M 252 855 Q 264 795 268 742" />
          <path d="M 206 876 Q 194 834 184 796" />
        </g>
        {foregroundWildflowers.map((wf, idx) => (
          <g key={`wf-${idx}`}>
            {shadowsEnabled && (
              <g transform="translate(2, 3)" opacity={0.28}>
                {wf.petalPaths.map((d, pIdx) => (
                  <path key={`ps-${pIdx}`} d={d} fill="#4D2926" />
                ))}
              </g>
            )}
            {wf.petalPaths.map((d, pIdx) => (
              <path key={`p-${pIdx}`} d={d} fill={wf.color} stroke="#D9988E" strokeWidth={0.5} />
            ))}
            <circle cx={wf.centerX} cy={wf.centerY} r={wf.centerRadius} fill={PAPER_PALETTE.stamenGold} />
            <circle cx={wf.centerX} cy={wf.centerY} r={wf.centerRadius * 0.52} fill={PAPER_PALETTE.stamenCenter} />
          </g>
        ))}
      </g>

      {/* Swaying sword grasses & pale cream feathery reeds */}
      <g
        ref={(el) => registerGrassRef(0, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '30% 100%' }}
      >
        {shadowsEnabled &&
          leftGrassTuft.map((d, i) => (
            <path key={`lgs-${i}`} d={d} fill="#1C261B" opacity={0.26} transform="translate(4, 5)" />
          ))}
        {leftGrassTuft.map((d, i) => (
          <path
            key={`lg-${i}`}
            d={d}
            fill={i % 2 === 0 ? PAPER_PALETTE.grassSage : PAPER_PALETTE.grassDeep}
            stroke="#9EAE88"
            strokeWidth={0.7}
          />
        ))}
      </g>

      <g
        ref={(el) => registerGrassRef(1, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
      >
        {shadowsEnabled &&
          midLeftCreamReeds.map((d, i) => (
            <path key={`mrs-${i}`} d={d} fill="#2A2018" opacity={0.22} transform="translate(3, 4)" />
          ))}
        {midLeftCreamReeds.map((d, i) => (
          <path
            key={`mr-${i}`}
            d={d}
            fill={PAPER_PALETTE.reedCream}
            stroke="#C9B697"
            strokeWidth={0.7}
          />
        ))}
      </g>

      <g
        ref={(el) => registerGrassRef(2, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
      >
        {lowerCenterGrass.map((d, i) => (
          <path
            key={`lcg-${i}`}
            d={d}
            fill={i % 2 === 0 ? PAPER_PALETTE.grassDeep : PAPER_PALETTE.grassSage}
          />
        ))}
      </g>

      <g
        ref={(el) => registerGrassRef(3, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
      >
        {shadowsEnabled &&
          rightGrassTuft.map((d, i) => (
            <path key={`rgs-${i}`} d={d} fill="#1C261B" opacity={0.24} transform="translate(4, 5)" />
          ))}
        {rightGrassTuft.map((d, i) => (
          <path
            key={`rg-${i}`}
            d={d}
            fill={i % 2 === 0 ? PAPER_PALETTE.grassDeep : PAPER_PALETTE.grassSage}
            stroke="#92A37E"
            strokeWidth={0.7}
          />
        ))}
      </g>

      {/* Riverbank tiny reed tufts peeking out in front of the central water */}
      <g
        ref={(el) => registerGrassRef(4, el)}
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
      >
        <path d={buildGrassBladePath(724, 792, 48, -14, 6)} fill={PAPER_PALETTE.grassDeep} />
        <path d={buildGrassBladePath(734, 794, 56, 2, 6)} fill={PAPER_PALETTE.grassSage} />
        <path d={buildGrassBladePath(746, 796, 46, 16, 6)} fill={PAPER_PALETTE.grassDeep} />
        <path d={buildGrassBladePath(804, 836, 54, -12, 6.5)} fill={PAPER_PALETTE.grassDeep} />
        <path d={buildGrassBladePath(814, 838, 64, 4, 7)} fill={PAPER_PALETTE.grassSage} />
        <path d={buildGrassBladePath(826, 840, 48, 18, 6)} fill={PAPER_PALETTE.grassDeep} />
      </g>
    </g>
  );
};

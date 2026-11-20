'use client';

import React, { useMemo } from 'react';
import { PAPER_PALETTE } from '../utils/paperTextures';
import { PaperCastShadow } from './PaperShadow';

/**
 * Generates an organic serrated forest ridge edge path (row of tiny hand-cut pine spires
 * following a custom ridge spline) matching the distant tree-lined slopes in the reference.
 */
function buildForestRidgePath(
  points: Array<[number, number]>,
  treeHeightMin: number,
  treeHeightMax: number,
  spacing: number,
  bottomY: number
): string {
  const cmds: string[] = [];
  if (points.length < 2) return '';

  const sampled: Array<{ x: number; y: number }> = [];
  for (let s = 0; s < points.length - 1; s++) {
    const [x0, y0] = points[s];
    const [x1, y1] = points[s + 1];
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(1, Math.floor(dist / spacing));
    for (let k = 0; k < steps; k++) {
      const t = k / steps;
      sampled.push({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t });
    }
  }
  const last = points[points.length - 1];
  sampled.push({ x: last[0], y: last[1] });

  cmds.push(`M ${sampled[0].x.toFixed(1)} ${bottomY}`);
  cmds.push(`L ${sampled[0].x.toFixed(1)} ${sampled[0].y.toFixed(1)}`);

  for (let i = 0; i < sampled.length - 1; i++) {
    const a = sampled[i];
    const b = sampled[i + 1];
    const midX = (a.x + b.x) * 0.5;
    const baseY = (a.y + b.y) * 0.5;
    const hash = Math.abs(Math.sin(i * 12.9898 + a.x * 0.07) * 43758.5453) % 1;
    const h = treeHeightMin + hash * (treeHeightMax - treeHeightMin);
    const lean = (hash - 0.5) * 2.4;
    cmds.push(
      `L ${(midX + lean).toFixed(1)} ${(baseY - h).toFixed(1)}`,
      `L ${b.x.toFixed(1)} ${(b.y + 1.5).toFixed(1)}`
    );
  }

  cmds.push(`L ${last[0].toFixed(1)} ${bottomY}`, 'Z');
  return cmds.join(' ');
}

const MT_FAR_LEFT =
  'M -120 480 L -120 220 C -45 198, 12 178, 62 162 C 98 150, 126 154, 152 158 C 216 168, 286 216, 378 272 L 420 480 Z';
const MT_DUSTY_BLUE =
  'M 730 460 L 760 245 C 805 224, 858 198, 912 182 C 954 169, 984 152, 1012 142 C 1026 137, 1040 138, 1054 146 C 1094 168, 1142 190, 1196 196 C 1248 202, 1296 164, 1344 142 C 1382 125, 1445 154, 1520 182 L 1720 245 L 1720 490 Z';
const MT_PALE_SAGE =
  'M 225 460 L 315 268 C 365 242, 412 212, 456 178 C 492 150, 524 126, 548 104 C 562 92, 570 84, 579 86 C 598 92, 632 114, 672 146 C 724 188, 796 248, 916 346 L 945 465 Z';
const MT_OLIVE_MID =
  'M -60 510 L 85 268 C 142 258, 196 250, 246 236 C 284 226, 314 210, 342 200 C 352 197, 364 202, 382 212 C 424 236, 468 266, 522 292 L 580 510 Z';
const MT_FOREST_CENTER =
  'M 355 510 L 420 335 C 458 310, 496 286, 536 268 C 562 256, 582 246, 598 244 C 614 242, 632 256, 654 274 C 708 316, 768 370, 875 436 L 885 510 Z';
const MT_DEEP_PINE =
  'M 758 475 L 802 414 C 864 378, 928 338, 992 300 C 1052 264, 1106 234, 1158 198 C 1184 180, 1200 166, 1214 166 C 1232 166, 1256 184, 1286 204 C 1362 254, 1468 286, 1720 326 L 1720 530 L 758 530 Z';

export const PaperFarMountains: React.FC<{
  farMountainsRef: (el: SVGGElement | null) => void;
  shadowStrength: number;
}> = ({ farMountainsRef, shadowStrength }) => {
  return (
    <g ref={farMountainsRef} id="kirigami-far-mountains">
      {/* 1. Far-left pale sage-gray background shoulder */}
      <g>
        <PaperCastShadow d={MT_FAR_LEFT} strength={shadowStrength * 0.75} color="#2C352E" elevation={1.1} />
        <path d={MT_FAR_LEFT} fill={PAPER_PALETTE.mtFarLeftGray} />
        <path
          d="M -120 220 C -20 185, 68 152, 148 158 C 218 164, 290 218, 378 272"
          fill="none"
          stroke="#DCE3D8"
          strokeWidth={2}
          opacity={0.75}
        />
      </g>

      {/* 2. Dusty blue-green mountain range right of the sun */}
      <g>
        <PaperCastShadow d={MT_DUSTY_BLUE} strength={shadowStrength * 0.85} color="#283536" elevation={1.15} />
        <path d={MT_DUSTY_BLUE} fill="url(#grad-mt-dusty-blue)" />
        <path
          d="M 1038 142 C 1084 162, 1138 188, 1196 196 L 1160 440 L 975 440 Z"
          fill={PAPER_PALETTE.mtDustyBlueShade}
          opacity={0.35}
        />
        <path
          d="M 760 245 C 835 206, 912 182, 976 158 C 1002 148, 1022 135, 1038 142"
          fill="none"
          stroke="#B8CECE"
          strokeWidth={2.2}
          opacity={0.85}
        />
      </g>

      {/* 3. Prominent tall pale sage peak just left of the sun */}
      <g>
        <PaperCastShadow d={MT_PALE_SAGE} strength={shadowStrength * 0.95} color="#283529" elevation={1.25} />
        <path d={MT_PALE_SAGE} fill="url(#grad-mt-pale-sage)" />
        <path
          d="M 576 86 C 594 94, 626 112, 668 144 C 724 188, 796 248, 916 346 L 925 460 L 598 460 C 592 310, 586 190, 576 86 Z"
          fill={PAPER_PALETTE.mtPaleSageShade}
          opacity={0.32}
        />
        <path
          d="M 315 268 C 392 224, 464 176, 514 134 C 542 110, 562 90, 576 86"
          fill="none"
          stroke="#CBD6BE"
          strokeWidth={2.4}
          opacity={0.9}
        />
      </g>
    </g>
  );
};

export const PaperMidMountains: React.FC<{
  midMountainsRef: (el: SVGGElement | null) => void;
  shadowStrength: number;
}> = ({ midMountainsRef, shadowStrength }) => {
  const { leftBackTrees, leftFrontTrees, rightBackTrees, rightFrontTrees } = useMemo(() => {
    const leftBack = buildForestRidgePath(
      [
        [150, 315],
        [270, 326],
        [395, 342],
        [515, 376],
        [635, 422],
        [720, 456],
      ],
      16,
      34,
      10,
      510
    );
    const leftFront = buildForestRidgePath(
      [
        [185, 372],
        [310, 386],
        [430, 405],
        [540, 428],
        [635, 448],
      ],
      18,
      44,
      11,
      530
    );
    const rightBack = buildForestRidgePath(
      [
        [848, 424],
        [940, 392],
        [1040, 362],
        [1140, 348],
        [1245, 355],
        [1365, 342],
      ],
      14,
      30,
      10,
      495
    );
    const rightFront = buildForestRidgePath(
      [
        [875, 446],
        [975, 422],
        [1080, 406],
        [1190, 392],
        [1300, 386],
      ],
      16,
      32,
      11,
      510
    );
    return {
      leftBackTrees: leftBack,
      leftFrontTrees: leftFront,
      rightBackTrees: rightBack,
      rightFrontTrees: rightFront,
    };
  }, []);

  return (
    <g ref={midMountainsRef} id="kirigami-mid-mountains">
      {/* 4. Left olive-green mid-distant peak */}
      <g>
        <PaperCastShadow d={MT_OLIVE_MID} strength={shadowStrength} color="#233022" elevation={1.2} />
        <path d={MT_OLIVE_MID} fill="url(#grad-mt-olive-mid)" />
        <path
          d="M 85 268 C 165 256, 232 246, 286 226 C 318 214, 338 198, 356 202"
          fill="none"
          stroke="#98AA8B"
          strokeWidth={2}
          opacity={0.85}
        />
      </g>

      {/* 5. Center-left rounded forest mountain dipping into valley */}
      <g>
        <PaperCastShadow d={MT_FOREST_CENTER} strength={shadowStrength * 1.05} color="#1E2C20" elevation={1.25} />
        <path d={MT_FOREST_CENTER} fill="url(#grad-mt-forest-center)" />
        <path
          d="M 604 247 C 660 288, 735 352, 875 436 L 875 510 L 628 510 Z"
          fill={PAPER_PALETTE.mtForestCenterShade}
          opacity={0.34}
        />
        <path
          d="M 420 335 C 472 302, 528 272, 574 252 C 594 244, 608 244, 624 256"
          fill="none"
          stroke="#7A967D"
          strokeWidth={2.2}
          opacity={0.85}
        />
      </g>

      {/* 6. Deep desaturated pine-green right mountain ridge */}
      <g>
        <PaperCastShadow d={MT_DEEP_PINE} strength={shadowStrength * 1.1} color="#182621" elevation={1.3} />
        <path d={MT_DEEP_PINE} fill="url(#grad-mt-deep-pine)" />
        <path
          d="M 1208 168 C 1226 160, 1244 170, 1272 192 C 1348 252, 1460 286, 1720 326 L 1720 530 L 1228 530 Z"
          fill={PAPER_PALETTE.mtDeepPineShade}
          opacity={0.38}
        />
        <path
          d="M 802 414 C 892 364, 982 310, 1068 258 C 1118 228, 1168 188, 1208 168"
          fill="none"
          stroke="#688479"
          strokeWidth={2.2}
          opacity={0.8}
        />
      </g>

      {/* 7. Left foothill forested ridge with finely cut miniature cypress silhouettes */}
      <g>
        <PaperCastShadow d={leftBackTrees} strength={shadowStrength * 0.9} color="#1E2B1C" elevation={0.85} />
        <path d={leftBackTrees} fill={PAPER_PALETTE.mtFoothillLeft} />
        <PaperCastShadow d={leftFrontTrees} strength={shadowStrength * 0.85} color="#192518" elevation={0.75} />
        <path d={leftFrontTrees} fill={PAPER_PALETTE.mtFoothillLeftDark} opacity={0.94} />
      </g>

      {/* 8. Right foothill forested ridge above the village & terraces */}
      <g>
        <PaperCastShadow d={rightBackTrees} strength={shadowStrength * 0.9} color="#1A2920" elevation={0.85} />
        <path d={rightBackTrees} fill={PAPER_PALETTE.mtFoothillRightLight} />
        <PaperCastShadow d={rightFrontTrees} strength={shadowStrength * 0.85} color="#16241B" elevation={0.75} />
        <path d={rightFrontTrees} fill={PAPER_PALETTE.mtFoothillRight} />
      </g>
    </g>
  );
};

'use client';

import React from 'react';
import { PAPER_PALETTE } from '../utils/paperTextures';

interface PaperToriiProps {
  toriiRef: (el: SVGGElement | null) => void;
  shadowsEnabled: boolean;
}

/**
 * Handcrafted terracotta-red paper Torii gate constructed from separate folded paper components
 * (curved kasagi top beam, shimaki secondary lintel, nuki tie beam, gakuzuka center strut,
 * and twin pillars with stone bases) seated solidly on the pale sage riverbank peninsula.
 */
export const PaperTorii: React.FC<PaperToriiProps> = ({
  toriiRef,
  shadowsEnabled,
}) => {
  return (
    <g id="kirigami-torii-position" transform="translate(836, 526)">
      <g ref={toriiRef} id="kirigami-torii-gate">
      {/* Solid ground contact pad & soft cast shadow on the riverbank terrace */}
      {shadowsEnabled && (
        <ellipse
          cx={31}
          cy={58}
          rx={28}
          ry={5.5}
          fill="#3A4A3D"
          opacity={0.32}
        />
      )}

      {/* Subtle stepped paper foundation pad so torii sits solidly on terrain */}
      <path
        d="M 6 56 L 54 56 L 58 60 L 2 60 Z"
        fill="#B6BE9D"
      />

      <g>
        {/* Left & Right Pillar stone footings (kamebara) */}
        <rect x={11} y={50} width={8.5} height={7} rx={1} fill={PAPER_PALETTE.toriiCap} />
        <rect x={40.5} y={50} width={8.5} height={7} rx={1} fill={PAPER_PALETTE.toriiCap} />

        {/* Left vertical pillar (hashira) with cardstock thickness & edge highlight */}
        <polygon points="12.5,14 18,14 19,52 12,52" fill={PAPER_PALETTE.toriiMain} />
        <polygon points="16.2,14 18,14 19,52 17,52" fill={PAPER_PALETTE.toriiDark} opacity={0.75} />
        <line x1={12.8} y1={15} x2={12.3} y2={51} stroke={PAPER_PALETTE.toriiBright} strokeWidth={1.1} />

        {/* Right vertical pillar (hashira) */}
        <polygon points="42,14 47.5,14 48,52 41,52" fill={PAPER_PALETTE.toriiMain} />
        <polygon points="45.8,14 47.5,14 48,52 46,52" fill={PAPER_PALETTE.toriiDark} opacity={0.75} />
        <line x1={42.2} y1={15} x2={41.4} y2={51} stroke={PAPER_PALETTE.toriiBright} strokeWidth={1.1} />

        {/* Nuki horizontal tie beam extending slightly beyond both pillars */}
        <rect x={5} y={20} width={50} height={4.5} rx={0.8} fill={PAPER_PALETTE.toriiMain} />
        <rect x={5} y={23} width={50} height={1.6} fill={PAPER_PALETTE.toriiDark} opacity={0.7} />
        <line x1={5.5} y1={20.5} x2={54.5} y2={20.5} stroke={PAPER_PALETTE.toriiBright} strokeWidth={1} />

        {/* Gakuzuka center plaque strut between top lintel and nuki */}
        <rect x={27.5} y={13} width={5} height={8.5} fill={PAPER_PALETTE.toriiCap} />
        <rect x={28.3} y={13.5} width={2.2} height={7.5} fill={PAPER_PALETTE.toriiMain} />

        {/* Shimaki (lower curved beam under the kasagi) */}
        <path
          d="M 4 11.5 Q 30 15.5 56 11.5 L 54.5 15.5 Q 30 18.5 5.5 15.5 Z"
          fill={PAPER_PALETTE.toriiMain}
        />

        {/* Kasagi (top curved upturned roof beam with dark folded cap edge) */}
        <path
          d="M 0 6.5 Q 30 12.2 60 6.5 L 58 12.2 Q 30 16 2 12.2 Z"
          fill={PAPER_PALETTE.toriiBright}
        />
        <path
          d="M 0 6.5 Q 30 12.2 60 6.5 L 59.2 8.8 Q 30 13.8 0.8 8.8 Z"
          fill={PAPER_PALETTE.toriiCap}
        />
        <path
          d="M 1 6.8 Q 30 12 59 6.8"
          fill="none"
          stroke="#EC9B7E"
          strokeWidth={0.9}
          opacity={0.8}
        />
      </g>
      </g>
    </g>
  );
};

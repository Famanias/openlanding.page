'use client';

import React, { useEffect, useState } from 'react';
import { DESERT_PALETTE } from '../utils/desertPalette';
import { getPaperGrainDataUrl } from '../utils/brushTextures';

interface DesertSkyProps {
  texturesEnabled: boolean;
  textureIntensity: number;
}

export const DesertSky: React.FC<DesertSkyProps> = React.memo(
  ({ texturesEnabled, textureIntensity }) => {
    const [paperUrl, setPaperUrl] = useState<string>('');

    useEffect(() => {
      setPaperUrl(getPaperGrainDataUrl());
    }, []);

    return (
      <div
        className="pointer-events-none absolute inset-0"
        data-layer="desert-sky"
        aria-hidden="true"
      >
        {/* Warm chalk-cream editorial paper sky using pure CSS gradients for instant compositing */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 27% 46%, rgba(242, 223, 190, 0.48) 0%, rgba(244, 232, 213, 0.22) 32%, rgba(245, 238, 224, 0) 62%),
              linear-gradient(180deg, rgba(243, 233, 218, 0) 52%, rgba(233, 214, 193, 0.48) 82%, rgba(223, 196, 173, 0.72) 100%),
              linear-gradient(142deg, #F7F1E4 0%, ${DESERT_PALETTE.chalkCream} 38%, ${DESERT_PALETTE.warmCream} 72%, #EBDDCA 100%)
            `,
          }}
        />

        {/* Cold-press paper tooth base (standard alpha compositing, no heavy multiply pass) */}
        {texturesEnabled && paperUrl && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${paperUrl})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '256px 256px',
              opacity: Math.min(0.28, 0.14 * textureIntensity),
            }}
          />
        )}
      </div>
    );
  }
);

DesertSky.displayName = 'DesertSky';

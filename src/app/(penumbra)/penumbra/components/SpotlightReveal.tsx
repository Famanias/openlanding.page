'use client';

import React from 'react';
import { HERO_BASE, HERO_REVEAL } from '../lib/motion';

interface SpotlightRevealProps {
  stageRef: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef: React.RefObject<HTMLDivElement | null>;
  maskLayerRef: React.RefObject<HTMLDivElement | null>;
  scatterLayerRef: React.RefObject<HTMLDivElement | null>;
  cursorIndicatorRef: React.RefObject<HTMLDivElement | null>;
  illuminationVisible: boolean;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  onBaseLoad?: () => void;
  onRevealLoad?: () => void;
}

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({
  stageRef,
  imageWrapperRef,
  maskLayerRef,
  scatterLayerRef,
  cursorIndicatorRef,
  illuminationVisible,
  onPointerMove,
  onPointerLeave,
  onBaseLoad,
  onRevealLoad,
}) => {
  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-image-stage"
      data-testid="hero-image-stage"
    >
      {/* Common shared transform wrapper so base and illuminated layers NEVER drift out of registration */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        {/* Layer 0: Base unlit blue-hour architectural photograph */}
        <img
          src={HERO_BASE}
          alt="Modern concrete architecture at blue hour before lighting"
          onLoad={onBaseLoad}
          fetchPriority="high"
          decoding="async"
          className="shared-stage-image"
        />

        {/* Layer 1: Identically aligned warmly illuminated architectural photograph */}
        <div
          ref={maskLayerRef}
          className={`illuminated-layer ${illuminationVisible ? 'is-full-reveal' : ''}`}
          aria-hidden="true"
        >
          <img
            src={HERO_REVEAL}
            alt=""
            onLoad={onRevealLoad}
            fetchPriority="high"
            decoding="async"
            className="shared-stage-image"
          />
        </div>

        {/* Layer 2: Extremely subtle warm atmospheric scattering synced to spotlight center */}
        <div
          ref={scatterLayerRef}
          className="ambient-scatter-layer"
          aria-hidden="true"
        />
      </div>

      {/* Subtle, non-intrusive amber focal reticle for desktop pointer exploration */}
      <div
        ref={cursorIndicatorRef}
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-0 left-0 -ml-2 -mt-2 w-4 h-4 rounded-full border border-[#E9BB86]/45 bg-[#D7A779]/15 opacity-0 transition-opacity duration-300"
      />
    </div>
  );
};

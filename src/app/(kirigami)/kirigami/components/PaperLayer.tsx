'use client';

import React from 'react';
import type { DepthLayerId } from '../src/utils/sceneCoordinates';

interface PaperLayerProps {
  layerId: DepthLayerId;
  registerLayer: (id: DepthLayerId, el: SVGGElement | null) => void;
  children: React.ReactNode;
  className?: string;
}

export const PaperLayer: React.FC<PaperLayerProps> = ({
  layerId,
  registerLayer,
  children,
  className = '',
}) => {
  return (
    <g
      ref={(el) => registerLayer(layerId, el)}
      data-depth-layer={layerId}
      className={`paper-layer-group ${className}`}
    >
      {children}
    </g>
  );
};

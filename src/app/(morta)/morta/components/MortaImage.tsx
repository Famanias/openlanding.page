import React, { useState } from 'react';
import { AssetDefinition } from '../utils/mortaLogic';
import { PointedSealOrnament } from './MortaMark';

interface MortaImageProps {
  asset: AssetDefinition;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Monochrome editorial image component that reserves exact intrinsic dimensions
 * to prevent layout shift, attempts primary then fallback asset paths, and renders
 * a clearly labelled, dimensionally stable placeholder identifying the missing filename
 * if an attachment cannot be loaded.
 */
export const MortaImage: React.FC<MortaImageProps> = ({
  asset,
  priority = false,
  className = '',
  imgClassName = '',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(asset.primarySrc);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  const handleError = () => {
    if (currentSrc === asset.primarySrc && asset.fallbackSrc !== asset.primarySrc) {
      setCurrentSrc(asset.fallbackSrc);
    } else {
      setHasFailed(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      style={{
        aspectRatio: `${asset.width} / ${asset.height}`,
      }}
    >
      {!hasFailed ? (
        <img
          src={currentSrc}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={handleError}
          className={`w-full h-full object-cover grayscale contrast-110 select-none ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={`Missing image asset: ${asset.filename}. ${asset.alt}`}
          className="w-full h-full flex flex-col items-center justify-center p-8 border border-white/30 bg-black text-center"
        >
          <PointedSealOrnament className="w-6 h-8 text-white/60 mb-4" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white mb-2">
            Missing Asset Plate
          </p>
          <p className="font-mono text-xs text-white/80 mb-3">
            {asset.filename}
          </p>
          <p className="text-xs text-white/60 max-w-xs leading-relaxed">
            Reserved {asset.width} × {asset.height} frame for {asset.stem}
          </p>
        </div>
      )}
    </div>
  );
};

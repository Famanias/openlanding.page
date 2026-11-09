'use client';
import React, { useState } from 'react';
import { ForumAssetEntry } from '../../lib/forum/assets';

interface ResilientImageProps {
  asset: ForumAssetEntry;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
  onLoad?: () => void;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  asset,
  priority = false,
  className = '',
  objectPosition,
  onLoad,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(asset.src);
  const [hasFailedAll, setHasFailedAll] = useState<boolean>(false);

  const handleError = () => {
    if (currentSrc === asset.src && asset.fallbackSrc && asset.fallbackSrc !== asset.src) {
      setCurrentSrc(asset.fallbackSrc);
    } else {
      setHasFailedAll(true);
    }
  };

  if (hasFailedAll) {
    return (
      <div
        role="img"
        aria-label={asset.alt}
        className={`relative flex flex-col items-center justify-center bg-[#0E100C] dither-grid-dark border border-[#B9B28A]/30 p-6 text-center ${className}`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-28 h-28 text-[#B9B28A]/60 mb-3"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="44" fill="#0E100C" stroke="currentColor" strokeWidth="1.5" />
          <rect x="86" y="34" width="28" height="132" fill="#171814" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#B9B28A]">
          {asset.id}
        </span>
      </div>
    );
  }

  return (
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
      onLoad={onLoad}
      style={{
        objectPosition: objectPosition || asset.objectPositionDesktop,
      }}
      className={`block object-cover select-none ${className}`}
    />
  );
};

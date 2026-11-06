'use client';

import React, { useRef, useState } from 'react';
import { useMotionSetting } from './MotionProvider';

interface WatchStageProps {
  className?: string;
}

export const WatchStage: React.FC<WatchStageProps> = ({ className = '' }) => {
  const { reducedMotion } = useMotionSetting();
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [imgError, setImgError] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    // Constrain angular response to maximum ~2.5 degrees as specified in brief
    setTilt({
      rx: Number((-ny * 2.4).toFixed(2)),
      ry: Number((nx * 2.6).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <div className={`w-full h-full flex items-center justify-center ${reducedMotion ? '' : 'animate-watch-float'}`}>
          {!imgError ? (
            <img
              src="/templates/aurel/aurel-hero-watch.png"
              alt="AUREL Origin Collection 01 — 42mm brushed titanium skeleton-dial mechanical watch with black leather strap"
              width={1140}
              height={1046}
              fetchPriority="high"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.85)]"
            />
          ) : (
            <div className="w-72 h-72 rounded-full border border-[#374047] bg-[#111317] flex flex-col items-center justify-center text-center p-6">
              <span className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9]">
                CALIBRE AU-01
              </span>
              <span className="font-display text-2xl text-[#F0ECE5] mt-2">
                THE ORIGIN COLLECTION
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

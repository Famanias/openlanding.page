import React from 'react';
import { SeamSpec } from '../data/sceneData';

interface SeamBandProps {
  seam: SeamSpec;
  keyedSrc?: string;
}

export const SeamBand: React.FC<SeamBandProps> = ({ seam, keyedSrc }) => {
  return (
    <div
      className="seam"
      data-seam-id={seam.id}
      style={{ '--focus': seam.focus } as React.CSSProperties}
    >
      <div className="band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="seam-img"
          src={keyedSrc || seam.imgSrc}
          alt={`Limestone transition: ${seam.between}`}
          referrerPolicy="no-referrer"
          draggable={false}
        />
        {seam.fall && (
          <canvas
            className="fall seam-fall"
            data-kind={seam.fall.kind}
            data-speed={seam.fall.speed}
            style={{
              left: `${seam.fall.left}%`,
              top: `${seam.fall.top}%`,
              width: `${seam.fall.width}%`,
              height: `${seam.fall.height}%`,
            }}
          />
        )}
        {seam.glows.map((g, idx) => (
          <div
            key={idx}
            className={`glow ${g.cold ? 'cold' : ''}`}
            style={{
              left: `${g.left}%`,
              top: `${g.top}%`,
              width: `${g.width}%`,
              animationDelay: `${g.delay || 0}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

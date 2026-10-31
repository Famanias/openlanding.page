"use client";

import React, { useState } from 'react';
import { SpecimenId } from '../../lib/audio/sampleLibrary';

interface SpecimenVisualProps {
  id: SpecimenId;
  isSelected: boolean;
  isPlaying: boolean;
  className?: string;
}

/**
 * High-contrast archival field photography plate for each sound specimen.
 * Implements controlled 4-8px crop parallax on fine pointer hover per Section 7 of the brief.
 */
export const SpecimenVisual: React.FC<SpecimenVisualProps> = ({
  id,
  isSelected,
  isPlaying,
  className = '',
}) => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    // Controlled 4-8px crop parallax
    setOffset({
      x: Number((normX * 10).toFixed(1)),
      y: Number((normY * 10).toFixed(1)),
    });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden bg-[#0B0D0D] select-none ${className}`}
    >
      <div
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.04)`,
          transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="w-full h-full"
      >
        {id === 'subway' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of subway carriage pneumatic sliding doors and steel latch"
          >
            <rect width="480" height="320" fill="#0D0F0F" />
            {/* High-contrast steel door panels */}
            <rect x="20" y="10" width="208" height="300" fill="#1A1D1D" stroke="#F1EEE5" strokeOpacity="0.25" />
            <rect x="252" y="10" width="208" height="300" fill="#161919" stroke="#F1EEE5" strokeOpacity="0.25" />
            {/* Center rubber pneumatic gap */}
            <rect x="228" y="0" width="24" height="320" fill="#070808" />
            <line x1="240" y1="0" x2="240" y2="320" stroke={isSelected ? '#CBFF49' : '#F1EEE5'} strokeWidth="1.5" strokeDasharray="6 4" />
            {/* Subway window frames */}
            <rect x="64" y="46" width="126" height="145" rx="8" fill="#090B0B" stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="3" />
            <rect x="290" y="46" width="126" height="145" rx="8" fill="#090B0B" stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="3" />
            {/* Pneumatic piston actuator */}
            <rect x="140" y="16" width="200" height="18" fill="#2A2E2E" stroke="#F1EEE5" strokeOpacity="0.5" />
            <circle cx="240" cy="25" r="14" fill="none" stroke={isPlaying ? '#FF6748' : '#CBFF49'} strokeWidth="2" />
            {/* Acoustic shockwave rings */}
            <circle cx="240" cy="160" r="45" fill="none" stroke="#F1EEE5" strokeOpacity="0.22" strokeWidth="1.5" />
            <circle cx="240" cy="160" r="85" fill="none" stroke="#CBFF49" strokeOpacity={isSelected ? '0.45' : '0.15'} strokeWidth="1" strokeDasharray="3 5" />
          </svg>
        )}

        {id === 'espresso' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of thick ceramic espresso cup and stainless steel spoon on zinc counter"
          >
            <rect width="480" height="320" fill="#0E1010" />
            {/* Zinc bar counter horizon */}
            <rect x="0" y="210" width="480" height="110" fill="#181B1B" />
            <line x1="0" y1="210" x2="480" y2="210" stroke="#F1EEE5" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Saucer */}
            <ellipse cx="240" cy="228" rx="125" ry="24" fill="#262A2A" stroke="#F1EEE5" strokeOpacity="0.5" strokeWidth="2" />
            {/* Heavy porcelain cup body */}
            <path d="M 165 110 L 315 110 L 296 218 Q 240 232 184 218 Z" fill="#2E3333" stroke="#F1EEE5" strokeOpacity="0.65" strokeWidth="2.5" />
            <ellipse cx="240" cy="110" rx="75" ry="18" fill="#121414" stroke="#F1EEE5" strokeOpacity="0.8" strokeWidth="2.5" />
            {/* Cup handle */}
            <path d="M 312 132 C 355 132, 355 194, 300 194" fill="none" stroke="#F1EEE5" strokeOpacity="0.65" strokeWidth="10" />
            {/* Stainless spoon striking rim */}
            <line x1="110" y1="42" x2="295" y2="114" stroke={isSelected ? '#CBFF49' : '#F1EEE5'} strokeWidth="5" strokeLinecap="round" />
            {/* Impact transient rays */}
            <circle cx="295" cy="114" r="24" fill="none" stroke={isPlaying ? '#FF6748' : '#CBFF49'} strokeWidth="2" />
            <circle cx="295" cy="114" r="52" fill="none" stroke="#F1EEE5" strokeOpacity="0.25" strokeDasharray="4 4" />
          </svg>
        )}

        {id === 'rain' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of storm rain droplets hitting corrugated zinc metal roof"
          >
            <rect width="480" height="320" fill="#0C0E0E" />
            {/* Corrugated zinc ridges */}
            {Array.from({ length: 8 }).map((_, idx) => (
              <path
                key={idx}
                d={`M 0 ${175 + idx * 20} Q 60 ${158 + idx * 20}, 120 ${175 + idx * 20} T 240 ${175 + idx * 20} T 360 ${175 + idx * 20} T 480 ${175 + idx * 20}`}
                fill="none"
                stroke="#F1EEE5"
                strokeOpacity={0.18 + idx * 0.05}
                strokeWidth="3"
              />
            ))}
            {/* Diagonal rain streaks */}
            <g stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="1.5">
              <line x1="120" y1="10" x2="95" y2="145" />
              <line x1="210" y1="20" x2="180" y2="170" />
              <line x1="310" y1="5" x2="282" y2="155" />
              <line x1="390" y1="30" x2="365" y2="165" />
            </g>
            {/* Splash ripples on zinc crest */}
            <ellipse cx="180" cy="172" rx="34" ry="11" fill="none" stroke={isSelected ? '#CBFF49' : '#F1EEE5'} strokeWidth="2" />
            <ellipse cx="180" cy="172" rx="64" ry="20" fill="none" stroke="#CBFF49" strokeOpacity="0.35" strokeDasharray="3 3" />
            <ellipse cx="282" cy="156" rx="28" ry="9" fill="none" stroke={isPlaying ? '#FF6748' : '#F1EEE5'} strokeWidth="1.8" />
          </svg>
        )}

        {id === 'footsteps' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of heavy rubber boot heel striking brutalist concrete stairwell step"
          >
            <rect width="480" height="320" fill="#0B0D0D" />
            {/* Brutalist concrete step geometry */}
            <polygon points="0,230 340,230 410,320 0,320" fill="#1C2020" stroke="#F1EEE5" strokeOpacity="0.4" strokeWidth="2" />
            <polygon points="140,150 480,150 480,230 140,230" fill="#141717" stroke="#F1EEE5" strokeOpacity="0.2" strokeWidth="1.5" />
            {/* Heavy lugged boot heel silhouette */}
            <path d="M 110 20 L 245 20 L 265 188 L 95 212 Z" fill="#252A2A" stroke="#F1EEE5" strokeOpacity="0.65" strokeWidth="2.5" />
            {/* Boot tread lugs */}
            <rect x="96" y="206" width="168" height="14" transform="rotate(-8 96 206)" fill={isSelected ? '#CBFF49' : '#F1EEE5'} />
            {/* Acoustic impact wave on concrete slab */}
            <ellipse cx="195" cy="228" rx="75" ry="14" fill="none" stroke={isPlaying ? '#FF6748' : '#CBFF49'} strokeWidth="2" />
            <ellipse cx="195" cy="228" rx="125" ry="24" fill="none" stroke="#F1EEE5" strokeOpacity="0.25" strokeDasharray="5 5" />
          </svg>
        )}

        {id === 'coin' && (
          <svg
            viewBox="0 0 480 320"
            className="w-full h-full object-cover block"
            role="img"
            aria-label="Archival macro photograph of spinning brass coin oscillating on brushed steel ticket plate"
          >
            <rect width="480" height="320" fill="#0D0F0F" />
            {/* Brushed steel surface lines */}
            <rect x="0" y="205" width="480" height="115" fill="#171A1A" />
            <line x1="0" y1="205" x2="480" y2="205" stroke="#F1EEE5" strokeOpacity="0.35" strokeWidth="1.5" />
            {/* Motion blur Euler spin ellipses */}
            <ellipse cx="240" cy="155" rx="68" ry="68" fill="none" stroke="#F1EEE5" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="6 4" />
            <ellipse cx="240" cy="155" rx="46" ry="68" fill="none" stroke="#CBFF49" strokeOpacity="0.35" strokeWidth="2" />
            <ellipse
              cx="240"
              cy="155"
              rx="22"
              ry="68"
              fill="#2B3024"
              stroke={isSelected ? '#CBFF49' : '#F1EEE5'}
              strokeWidth="3"
            />
            {/* Contact point spark */}
            <circle cx="240" cy="223" r="8" fill={isPlaying ? '#FF6748' : '#CBFF49'} />
            <ellipse cx="240" cy="223" rx="90" ry="18" fill="none" stroke="#F1EEE5" strokeOpacity="0.3" />
          </svg>
        )}
      </div>

      {/* Halftone print overlay & archival corner crop marks */}
      <div className="pointer-events-none absolute inset-0 nc-print-grain opacity-70" />
      <div className="pointer-events-none absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#F1EEE5]/50" />
      <div className="pointer-events-none absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#F1EEE5]/50" />
      <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#F1EEE5]/50" />
      <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#F1EEE5]/50" />
    </div>
  );
};

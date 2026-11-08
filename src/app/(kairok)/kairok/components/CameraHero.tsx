'use client';
import React, { useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { KAIRO_ASSETS } from '../lib/assets';

export interface CameraHeroProps {
  heroOpacity: number;
  heroTranslateY: number;
  heroCutoutScale: number;
  heroCutoutOpacity: number;
  pointerOffset: { x: number; y: number };
  reducedMotion: boolean;
  onExploreScroll: () => void;
  onViewCamera: () => void;
}

export const CameraHero: React.FC<CameraHeroProps> = ({
  heroOpacity,
  heroTranslateY,
  heroCutoutScale,
  heroCutoutOpacity,
  pointerOffset,
  reducedMotion,
  onExploreScroll,
  onViewCamera,
}) => {
  const [cutoutFailed, setCutoutFailed] = useState(false);

  const visible = heroOpacity > 0.02;
  const parallaxX = reducedMotion ? 0 : pointerOffset.x * 10;
  const parallaxY = reducedMotion ? 0 : pointerOffset.y * 8;

  return (
    <div
      aria-hidden={!visible}
      style={{
        opacity: heroOpacity,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="absolute inset-0 z-20 flex flex-col justify-between px-5 pt-16 pb-10 md:px-10 md:pt-20 lg:pb-20"
    >
      {/* Upper Editorial Headline Layer ( sits behind foreground camera cutout ) */}
      <div
        style={{
          transform: reducedMotion
            ? 'none'
            : `translate3d(${-parallaxX * 0.35}px, ${heroTranslateY}px, 0)`,
        }}
        className="relative z-10 mx-auto w-full max-w-[1360px] pt-1 text-center"
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono-kairo tracking-[0.2em] text-[#e68f63] mb-2">
          <span className="whitespace-nowrap">KAIRO / K-01</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#f2efe9]/75 whitespace-nowrap">CONCEPT MIRRORLESS SYSTEM</span>
        </div>

        <h1
          style={{ textWrap: 'balance' }}
          className="font-display-kairo mx-auto max-w-[16ch] text-[clamp(2.25rem,5.1vw,4.65rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-[#f2efe9] drop-shadow-[0_10px_28px_rgba(0,0,0,0.75)]"
        >
          See beyond the expected.
        </h1>
      </div>

      {/* Foreground Chroma-Keyed Camera Cutout (layers subtly in front of lower headline stem at rest) */}
      {!cutoutFailed && heroCutoutOpacity > 0.02 && (
        <div
          aria-hidden="true"
          style={{
            opacity: heroCutoutOpacity,
            transform: reducedMotion
              ? 'none'
              : `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(${heroCutoutScale})`,
          }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <img
            src={KAIRO_ASSETS.cameraCutout}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setCutoutFailed(true)}
            className="h-full w-full object-cover select-none"
          />
          {/* Subtle copper specular glint along the optical barrel on initial reveal */}
          <div className="kairo-lens-glint absolute w-[28vw] max-w-[420px] aspect-square rounded-full border border-[#e68f63]/35 pointer-events-none" />
        </div>
      )}

      {/* Lower Supporting Proposition & Dual Intentional Actions */}
      <div
        style={{
          transform: reducedMotion
            ? 'none'
            : `translate3d(0, ${-heroTranslateY * 0.45}px, 0)`,
        }}
        className="relative z-30 mx-auto flex w-full max-w-[1360px] flex-col items-center justify-between gap-6 md:flex-row md:items-end"
      >
        <div className="max-w-md text-center md:text-left bg-[#121315]/70 backdrop-blur-md p-4 rounded-[2px] border border-[#f2efe9]/10">
          <p className="text-sm md:text-[15px] leading-relaxed text-[#f2efe9]/90">
            A camera that invites you to find more in the ordinary—light,
            atmosphere, texture, and moments that vanish when you blink.
          </p>
          <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-xs font-mono-kairo text-[#a8aaa9]">
            <span>01 / THE OBJECT</span>
            <span aria-hidden="true">·</span>
            <span>SCROLL TO ENTER THE LENS</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onExploreScroll}
            className="kairo-btn-primary group"
          >
            <span>Explore KAIRO</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={onViewCamera}
            className="kairo-btn-secondary group"
          >
            <span>View the camera</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { GlassPresetId, GlassPresetConfig } from '../../glass/glassTypes';
import { GlassBackground } from '../GlassBackground';

interface PageAtmosphereProps {
  activePreset: GlassPresetId;
  customConfig: GlassPresetConfig | null;
  isHeroActive?: boolean;
}

/**
 * Single global atmospheric background mounted once at the root of the landing page.
 * Owns the unified #F8F9FC base canvas, continuous single-origin diagonal line field,
 * broad overlapping environmental lighting regions, multi-section spanning glass
 * sculptures (Ribbon A, Sheet B, Halo C), and the single shared WebGL2 optical canvas.
 */
export const PageAtmosphere: React.FC<PageAtmosphereProps> = ({
  activePreset,
  customConfig,
  isHeroActive = true,
}) => {
  return (
    <div
      className="page-atmosphere"
      aria-hidden="true"
      data-testid="page-atmosphere"
      data-scroll-progress="0.00"
    >
      {/* 1. Unified Base Surface (#F8F9FC across entire document) */}
      <div className="page-atmosphere__base" />

      {/* 2. Single-Origin Continuous Diagonal Architectural Line Field */}
      <div
        className="page-atmosphere__lines"
        data-testid="page-atmosphere-lines"
      />

      {/* 3. Global Overlapping Environmental Lighting Regions (Upper, Middle, Lower) */}
      <div
        className="page-atmosphere__lighting"
        data-testid="page-atmosphere-lighting"
      />

      {/* 4. Shared Optical Glass Layer: Single Viewport WebGL2 Engine + Document-Spanning Glass Sculptures */}
      <div
        className="page-atmosphere__glass"
        data-testid="page-atmosphere-glass"
      >
        {/* Single Shared WebGL2 Optical Glass Renderer (Fixed to viewport, transparent outside glass silhouette so global lines & lighting remain 100% continuous) */}
        <div className="fixed inset-0 pointer-events-none opacity-85">
          <GlassBackground
            preset={activePreset}
            configOverrides={
              customConfig && customConfig.id === activePreset
                ? {
                    material: customConfig.material,
                    scene: customConfig.scene,
                  }
                : undefined
            }
            renderMode="live"
            transparentExport={true}
            quality="auto"
            interactive
            paused={!isHeroActive}
          />
        </div>

        {/* GLASS RIBBON A: Isolated wrapper receiving bounded scroll parallax without transforming fixed canvas */}
        <div
          className="page-atmosphere__artwork-wrapper"
          style={{ transform: 'translate3d(0, var(--lm-ribbon-a-y, 0px), 0)' }}
        >
          <svg
            viewBox="0 0 1440 1600"
            fill="none"
            preserveAspectRatio="none"
            className="page-atmosphere__sculpture-ribbon-a"
          >
            <defs>
              <linearGradient id="globalRibbonAGrad" x1="25%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
                <stop offset="45%" stopColor="#D8D0F7" stopOpacity="0.34" />
                <stop offset="80%" stopColor="#C9DAFA" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="globalRibbonABevel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
                <stop offset="60%" stopColor="#D8D0F7" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 1380 40 C 1080 240, 1220 620, 860 920 C 520 1200, 680 1440, 340 1580"
              stroke="url(#globalRibbonAGrad)"
              strokeWidth="150"
              strokeLinecap="round"
            />
            <path
              d="M 1380 40 C 1080 240, 1220 620, 860 920 C 520 1200, 680 1440, 340 1580"
              stroke="url(#globalRibbonABevel)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* GLASS SHEET B: Isolated wrapper receiving bounded scroll parallax */}
        <div
          className="page-atmosphere__artwork-wrapper"
          style={{ transform: 'translate3d(0, var(--lm-sheet-b-y, 0px), 0)' }}
        >
          <svg
            viewBox="0 0 1440 1800"
            fill="none"
            preserveAspectRatio="none"
            className="page-atmosphere__sculpture-sheet-b"
          >
            <defs>
              <linearGradient id="globalSheetBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
                <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.62" />
                <stop offset="55%" stopColor="#C9DAFA" stopOpacity="0.28" />
                <stop offset="85%" stopColor="#D8D0F7" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M -120 320 L 1180 80 L 1540 1180 L 180 1560 Z"
              fill="url(#globalSheetBGrad)"
            />
            <path
              d="M -120 320 L 1180 80 L 1540 1180"
              stroke="rgba(255, 255, 255, 0.78)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* GLASS HALO C: Untouched; no transform */}
        <svg
          viewBox="0 0 1440 1400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="page-atmosphere__sculpture-halo-c"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="globalHaloCGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.78" />
              <stop offset="40%" stopColor="#D8D0F7" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#F6DCCA" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="globalHaloCBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#D8D0F7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <ellipse
            cx="820"
            cy="700"
            rx="560"
            ry="480"
            stroke="url(#globalHaloCGrad)"
            strokeWidth="110"
          />
          <ellipse
            cx="820"
            cy="700"
            rx="560"
            ry="480"
            stroke="url(#globalHaloCBevel)"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* 5. Delicate Micro-Noise Surface Layer */}
      <div className="page-atmosphere__noise" />
    </div>
  );
};

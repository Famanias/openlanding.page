import React, { useEffect, useRef, useState } from 'react';
import {
  CurrencyCode,
  HERO_HOTSPOTS,
  HERO_IMAGE_PATH,
  HeroHotspot,
  PRODUCTS,
  ProductSpec,
} from '../data/products';
import { formatPrice } from '../utils/storeLogic';

interface HeroSectionProps {
  currency: CurrencyCode;
  onAddProduct: (product: ProductSpec) => void;
}

type ShaderMode = 'OPTICAL' | 'THERMAL' | 'UV-LUMEN';

interface RainStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  isCyan: boolean;
}

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currency, onAddProduct }) => {
  const [shaderMode, setShaderMode] = useState<ShaderMode>('OPTICAL');
  const [activeHotspotId, setActiveHotspotId] = useState<string>('hotspot-02');
  const [heroImgError, setHeroImgError] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const activeHotspot: HeroHotspot =
    HERO_HOTSPOTS.find((h) => h.id === activeHotspotId) || HERO_HOTSPOTS[1];

  useEffect(() => {
    const canvas = canvasRef.current;
    const sectionEl = sectionRef.current;
    if (!canvas || !sectionEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let isVisible = true;
    let width = (canvas.width = sectionEl.clientWidth || 1280);
    let height = (canvas.height = sectionEl.clientHeight || 720);

    const handleResize = () => {
      if (!sectionEl || !canvas) return;
      width = canvas.width = sectionEl.clientWidth || 1280;
      height = canvas.height = sectionEl.clientHeight || 720;
    };

    window.addEventListener('resize', handleResize);

    // Pause canvas loop when scrolled out of viewport using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionEl);

    // Initialize diagonal rain streaks (15deg slant)
    const streakCount = 95;
    const streaks: RainStreak[] = Array.from({ length: streakCount }, () => ({
      x: Math.random() * width * 1.2 - width * 0.1,
      y: Math.random() * height,
      length: 16 + Math.random() * 20,
      speed: 9 + Math.random() * 7,
      isCyan: Math.random() > 0.28,
    }));

    const splashes: SplashDroplet[] = [];
    const angleRad = (15 * Math.PI) / 180;
    const sinA = Math.sin(angleRad);
    const cosA = Math.cos(angleRad);

    const spawnSplashes = (x: number, y: number, isCyan: boolean) => {
      const count = 3 + Math.floor(Math.random() * 3); // 3-5 micro-droplets
      for (let i = 0; i < count; i++) {
        splashes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4.5,
          vy: -(2.2 + Math.random() * 3.4), // Upward hydrophobic bounce
          life: 0,
          maxLife: 14 + Math.floor(Math.random() * 10),
          color: isCyan ? 'rgba(0, 240, 255, 0.85)' : 'rgba(255, 0, 127, 0.85)',
        });
      }
    };

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Hydrophobic collision bounding box over figure's shoulders & visor: x: 58% to 84%, y: 18% to 48%
      const boxMinX = width * 0.58;
      const boxMaxX = width * 0.84;
      const boxMinY = height * 0.18;
      const boxMaxY = height * 0.48;

      ctx.lineWidth = 1.25;

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.x += sinA * s.speed;
        s.y += cosA * s.speed;

        const tipX = s.x + sinA * s.length;
        const tipY = s.y + cosA * s.length;

        // Check collision with hydrophobic shoulder/visor zone
        const hitsFigureZone =
          tipX >= boxMinX &&
          tipX <= boxMaxX &&
          tipY >= boxMinY &&
          tipY <= boxMinY + (boxMaxY - boxMinY) * 0.45 &&
          Math.random() < 0.35;

        // Check collision with user cursor
        const dxCursor = tipX - mouseRef.current.x;
        const dyCursor = tipY - mouseRef.current.y;
        const hitsCursor =
          mouseRef.current.active && dxCursor * dxCursor + dyCursor * dyCursor < 48 * 48;

        if (hitsFigureZone || hitsCursor) {
          spawnSplashes(tipX, tipY, s.isCyan);
          s.x = Math.random() * width * 1.2 - width * 0.2;
          s.y = -20 - Math.random() * 60;
          continue;
        }

        if (s.y > height + 30 || s.x > width + 60) {
          s.x = Math.random() * width * 1.2 - width * 0.2;
          s.y = -20 - Math.random() * 40;
        }

        ctx.strokeStyle = s.isCyan
          ? 'rgba(0, 240, 255, 0.32)'
          : 'rgba(255, 0, 127, 0.26)';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
      }

      // Update & draw micro-droplets
      for (let i = splashes.length - 1; i >= 0; i--) {
        const p = splashes[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravity
        p.life++;

        if (p.life >= p.maxLife) {
          splashes.splice(i, 1);
          continue;
        }

        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color.replace('0.85', (alpha * 0.9).toFixed(2));
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 2.5, 2.5);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleHotspotAdd = (hotspot: HeroHotspot) => {
    const targetProduct =
      PRODUCTS.find((p) => p.id === hotspot.productId) || PRODUCTS[0];
    onAddProduct(targetProduct);
  };

  const shaderClass =
    shaderMode === 'THERMAL'
      ? 'shader-thermal'
      : shaderMode === 'UV-LUMEN'
      ? 'shader-uv-lumen'
      : 'shader-optical';

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Flagship Hero — Drop 04 Archive"
      className="relative w-full min-h-[92vh] bg-[#090B0E] border-b border-[rgba(226,232,240,0.14)] overflow-hidden flex items-center"
    >
      {/* Hidden SVG Filter Matrices for Optical Shader Pill Switch */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="thermal-matrix">
            <feColorMatrix
              type="matrix"
              values="1.4 -0.3 0.2 0 0.05
                      0.2 0.3 -0.2 0 0
                      -0.4 0.8 1.3 0 0.05
                      0 0 0 1 0"
            />
          </filter>
          <filter id="uv-lumen-matrix">
            <feColorMatrix
              type="matrix"
              values="0.3 0.1 1.1 0 0
                      0.1 1.4 0.4 0 0
                      0.9 0.3 1.6 0 0.05
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Base Hero Image Layer */}
      <div className={`absolute inset-0 w-full h-full ${shaderClass} transition-all duration-300`}>
        {!heroImgError ? (
          <img
            src={HERO_IMAGE_PATH}
            alt="synapxe Masked Tactical Shell Operator in Rain"
            referrerPolicy="no-referrer"
            onError={() => setHeroImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-[#11161D] flex items-center justify-center font-mono-tech text-xs text-[#00F0FF]">
            [CAD WIREFRAME // HERO.PNG — HOSTILE ATMOSPHERE RIG]
          </div>
        )}
        {/* Measured contrast scrim so left-side typography has crisp WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090B0E]/95 via-[#090B0E]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-transparent to-[#090B0E]/40" />
      </div>

      {/* Interactive Overlay 1: Canvas Diagonal Rain & DWR Hydrophobic Physics */}
      <canvas
        ref={canvasRef}
        data-testid="hero-rain-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Corner Registration Marks */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-4 z-20 font-mono-tech text-xs text-[#94A3B8]/60 select-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 z-20 font-mono-tech text-xs text-[#94A3B8]/60 select-none"
      >
        +
      </span>

      {/* Animated SVG Leader Line connecting active reticle to HUD Card on desktop */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={`${activeHotspot.xPct},${activeHotspot.yPct} ${
            activeHotspot.xPct - 10
          },${activeHotspot.yPct} 36,66`}
          fill="none"
          stroke="#00F0FF"
          strokeWidth="0.18"
          strokeDasharray="0.7 0.35"
        />
        <circle
          cx={activeHotspot.xPct}
          cy={activeHotspot.yPct}
          r="0.45"
          fill="#00F0FF"
        />
        <circle cx="36" cy="66" r="0.4" fill="#00F0FF" />
      </svg>

      {/* Interactive Overlay 2 — 4 Pinned Garment Reticle Hotspots (Right Side, exact % coordinates on desktop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
        {HERO_HOTSPOTS.map((spot) => {
          const isSelected = spot.id === activeHotspot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => setActiveHotspotId(spot.id)}
              onMouseEnter={() => setActiveHotspotId(spot.id)}
              aria-label={`Inspect ${spot.title}`}
              style={{
                left: `${spot.xPct}%`,
                top: `${spot.yPct}%`,
              }}
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-2 px-2.5 py-1.5 font-mono-tech text-xs transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#00F0FF] text-[#090B0E] font-bold shadow-[0_0_20px_rgba(0,240,255,0.85)]'
                  : 'bg-[#090B0E]/90 text-[#F8FAFC] border border-[#00F0FF]/70 hover:border-[#00F0FF]'
              }`}
            >
              <span className="inline-block w-2 h-2 border border-current" />
              <span>[{spot.number}]</span>
              <span className="text-[11px]">{spot.code}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-4 lg:px-8 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left-Side Hero Typography & CTAs (x: 0% to 48%) */}
        <div className="lg:col-span-6 space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-3 font-mono-tech text-xs tracking-[0.18em] text-[#00F0FF] border-b border-[#00F0FF]/40 pb-1">
            <span>DROP 04 // FW-26 ARCHIVE COLLECTION</span>
            <span className="text-[#94A3B8]">·</span>
            <span className="text-[#D4FF00]">DWR ACTIVE</span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#F8FAFC] leading-[1.02] tracking-[0.06em]"
            style={{ textWrap: 'balance' }}
          >
            ENGINEERED FOR HOSTILE ATMOSPHERES.
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal max-w-lg">
            3-Layer ePTFE Storm Shells, Ballistic Cordura® Exoskeletons, and Modular Fidlock® Carry Systems.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#shells-grid"
              className="chamfer-btn bg-[#00F0FF] hover:bg-[#F8FAFC] text-[#090B0E] font-mono-tech text-xs font-bold tracking-wider px-5 py-3 transition-colors whitespace-nowrap"
            >
              [EXPLORE ARCHIVE ↓]
            </a>
            <a
              href="#loadout-builder"
              className="chamfer-btn bg-[#11161D]/90 hover:bg-[#FF007F] text-[#F8FAFC] border border-[#FF007F]/70 font-mono-tech text-xs font-semibold tracking-wider px-4 py-3 transition-colors whitespace-nowrap"
            >
              [CONFIGURE FULL LOADOUT — 15% OFF]
            </a>
          </div>

          {/* Mobile Reticle Selector Strip */}
          <div className="lg:hidden pt-2">
            <div className="font-mono-tech text-[11px] text-[#94A3B8] mb-1.5">
              SELECT GARMENT RETICLE TO INSPECT SPECS:
            </div>
            <div className="flex flex-wrap gap-2">
              {HERO_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeHotspot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspotId(spot.id)}
                    className={`px-2.5 py-1.5 font-mono-tech text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                        : 'bg-[#11161D] text-[#F8FAFC] border border-[#00F0FF]/50'
                    }`}
                  >
                    [{spot.number}] {spot.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floating HUD Inspection Card linked to Active Reticle Hotspot */}
          <div
            data-testid="hero-hud-card"
            className="bg-[#11161D]/90 backdrop-blur-md border border-[#00F0FF]/50 p-4 chamfer-card max-w-md space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[rgba(226,232,240,0.14)] pb-1.5">
              <span className="font-mono-tech text-[11px] text-[#00F0FF] tracking-wider">
                RETICLE TARGET // {activeHotspot.code}
              </span>
              {activeHotspot.priceUsd && (
                <span className="font-mono-tech text-sm font-bold text-[#D4FF00]">
                  {formatPrice(activeHotspot.priceUsd, currency)}
                </span>
              )}
            </div>

            <div className="font-display text-base font-bold text-[#F8FAFC] tracking-wider">
              {activeHotspot.title}
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono-tech text-[11px] text-[#94A3B8]">
              <div>
                <span className="block text-[10px] text-[#94A3B8]/70">BARRIER RATING</span>
                <span className="text-[#F8FAFC]">{activeHotspot.waterproofSpec}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#94A3B8]/70">VAPOR TRANSFER</span>
                <span className="text-[#F8FAFC]">{activeHotspot.breathabilitySpec}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-[rgba(226,232,240,0.08)]">
                <span className="block text-[10px] text-[#94A3B8]/70">ARCHITECTURE</span>
                <span className="text-[#00F0FF]">{activeHotspot.membraneSpec}</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between gap-3">
              <span className="font-mono-tech text-[10px] text-[#94A3B8]">
                HYDROPHOBIC COLLISION ZONE: ACTIVE
              </span>
              <button
                type="button"
                onClick={() => handleHotspotAdd(activeHotspot)}
                className="chamfer-sm bg-[#00F0FF] hover:bg-[#D4FF00] text-[#090B0E] font-mono-tech text-xs font-bold px-3.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                + ADD TO LOADOUT
              </button>
            </div>
          </div>

          {/* Interactive Overlay 3 — Bottom-Left Optical Shader Pill Switch */}
          <div className="inline-flex flex-wrap items-center gap-3 bg-[#090B0E]/92 backdrop-blur-md border border-[rgba(226,232,240,0.14)] px-3 py-2">
            <span className="font-mono-tech text-[11px] text-[#94A3B8] tracking-wider">
              OPTICAL SENSOR:
            </span>
            <div
              role="group"
              aria-label="Optical Shader Mode"
              className="flex items-center gap-1 font-mono-tech text-xs"
            >
              {(['OPTICAL', 'THERMAL', 'UV-LUMEN'] as ShaderMode[]).map((mode) => {
                const active = shaderMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setShaderMode(mode)}
                    className={`px-2.5 py-1 transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column Spacer for Figure & Reticles */}
        <div className="hidden lg:block lg:col-span-6 min-h-[520px]" />
      </div>
    </section>
  );
};

<template slug="orbitbeyond" name="ORBIT & BEYOND">
  <dependencies>
    {
      "dependencies": {
        "lucide-react": "0.475.0",
        "motion": "^14.4.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(orbitbeyond)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./orbitbeyond/orbitbeyond.css";

const instrument_Serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal","italic"],
  variable: "--font-instrument-serif",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "ORBIT & BEYOND — 2045 Lunar Weekend Concept",
  description: "Standalone cinematic concept experience for ORBIT &amp; BEYOND, a speculative 2045 lunar weekend expedition company in the OpenLanding collection.",
  openGraph: {
    title: "ORBIT & BEYOND — 2045 Lunar Weekend Concept",
    description: "Standalone cinematic concept experience for ORBIT &amp; BEYOND, a speculative 2045 lunar weekend expedition company in the OpenLanding collection.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030812",
};

export default function OrbitbeyondLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${instrument_Serif.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#030812] text-[#EDF6FD] antialiased selection:bg-[#178CFA]/30 selection:text-[#EDF6FD]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/orbitbeyond";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className }: PictureProps) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div
        className={`orbitbeyond-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span>{assetKey}</span>
      </div>
    );
  }
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#030812" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#1E2A36" text-anchor="middle">O</text>
</svg>
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ORBIT & BEYOND — 2045 Lunar Weekend Concept";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#030812",
          color: "#1E2A36",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>ORBIT & BEYOND</span>
          <span style={{ color: "#AAB7C4" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            ORBIT & BEYOND — 2045 Lunar Weekend Concept
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Standalone cinematic concept experience for ORBIT &amp; BEYOND, a speculative 2045 lunar weekend expedition company in the OpenLanding collection.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#AAB7C4" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/orbitbeyond.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  :root {
    --bg-deep-space: #030812;
    --bg-midnight-navy: #091525;
    --bg-lunar-shadow: #1E2A36;
    --text-regolith-silver: #AAB7C4;
    --text-frost-white: #EDF6FD;
    --accent-earth-cyan: #8DE9FF;
    --accent-mission-blue: #178CFA;
    --accent-habitat-warmth: #F6C98C;
    --font-sans: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-serif: var(--font-instrument-serif), 'Instrument Serif', Georgia, Cambria, 'Times New Roman', serif;
    --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  html {
    background-color: #030812;
    color: #EDF6FD;
    font-family: var(--font-sans);
    overflow-x: clip;
  }

  body {
    background-color: #030812;
    color: #EDF6FD;
    overflow-x: clip;
    min-height: 100svh;
  }
}

@layer components {
  .liquid-glass {
    position: relative;
    overflow: hidden;
    background: rgba(9, 21, 37, 0.58);
    background: rgba(255, 255, 255, 0.035);
    background-blend-mode: luminosity;
    -webkit-backdrop-filter: blur(10px) saturate(1.12);
    backdrop-filter: blur(10px) saturate(1.12);
    border: 1px solid rgba(255, 255, 255, 0.10);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.13), 0 12px 35px rgba(0, 0, 0, 0.12);
  }

  @supports not ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
    .liquid-glass {
      background: rgba(9, 21, 37, 0.88);
    }
  }

  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.42) 0%,
      rgba(255, 255, 255, 0.14) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.14) 80%,
      rgba(255, 255, 255, 0.42) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .font-display-sans {
    font-family: var(--font-sans);
  }

  .font-editorial-serif {
    font-family: var(--font-serif);
  }

  .font-hud-mono {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/OrbitbeyondApp.tsx">
<![CDATA['use client';

import { OrbitBeyondPage } from './components/orbit-beyond/OrbitBeyondPage';

export default function OrbitbeyondApp() {
  return <OrbitBeyondPage />;
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/page.tsx">
<![CDATA["use client";

import OrbitbeyondApp from "./OrbitbeyondApp";

export default function OrbitbeyondPage() {
  return <OrbitbeyondApp />;
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/CinematicMedia.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface CinematicMediaProps {
  /** Pauses background video while the teaser modal is open so two decodes do not run at once */
  pausedByModal: boolean;
  /** Callback fired if the hero video genuinely fails to load */
  onVideoUnavailable?: () => void;
}

export function CinematicMedia({ pausedByModal, onVideoUnavailable }: CinematicMediaProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [posterSrc, setPosterSrc] = useState<string>(ORBIT_ASSETS.heroPoster);
  const [videoSrc, setVideoSrc] = useState<string>(ORBIT_ASSETS.heroVideo);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [hasVideoFailed, setHasVideoFailed] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);

  // Observe whether hero is within or near the viewport to pause/resume cleanly without resetting time
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInViewport(entry.isIntersecting);
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Control play/pause based on reduced motion, modal state, viewport visibility, and tab visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasVideoFailed) {
      return;
    }

    video.muted = true;

    const syncPlayback = () => {
      if (
        prefersReducedMotion ||
        pausedByModal ||
        !isInViewport ||
        document.visibilityState === 'hidden'
      ) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Autoplay blocked by browser or data-saver; clean poster remains visible underneath
          });
        }
      }
    };

    syncPlayback();

    const handleVisibilityChange = () => syncPlayback();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion, pausedByModal, isInViewport, hasVideoFailed, videoSrc]);

  const handleVideoLoaded = () => {
    if (!prefersReducedMotion && !hasVideoFailed) {
      setIsVideoReady(true);
    }
  };

  const handleVideoError = () => {
    if (videoSrc === ORBIT_ASSETS.heroVideo) {
      setVideoSrc(ORBIT_ASSETS.heroVideoAltPath);
      return;
    }
    setHasVideoFailed(true);
    setIsVideoReady(false);
    onVideoUnavailable?.();
  };

  const handlePosterError = () => {
    if (posterSrc === ORBIT_ASSETS.heroPoster) {
      setPosterSrc(ORBIT_ASSETS.heroPosterAltPath);
    }
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#030812] select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Immediate clean poster image (no baked typography) */}
      <img
        src={posterSrc}
        alt=""
        fetchPriority="high"
        decoding="async"
        onError={handlePosterError}
        className="
          absolute inset-0 h-full w-full object-cover
          object-[54%_center] sm:object-[52%_center] lg:object-center
        "
      />

      {/* Layer 2: Self-looping 10-second hero video in the exact same box */}
      {!prefersReducedMotion && !hasVideoFailed && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          className={`
            pointer-events-none absolute inset-0 h-full w-full object-cover
            object-[54%_center] sm:object-[52%_center] lg:object-center
            transition-opacity duration-500 ease-out
            ${isVideoReady ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      {/* Layer 3: Single scene-wide subtle atmospheric scrim for text contrast without hiding Earth, astronauts, dome, or rocket */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 46% at 50% 46%, rgba(3, 8, 18, 0.42) 0%, rgba(3, 8, 18, 0.16) 58%, rgba(3, 8, 18, 0.48) 100%), linear-gradient(180deg, rgba(3, 8, 18, 0.52) 0%, rgba(3, 8, 18, 0.08) 28%, rgba(3, 8, 18, 0.14) 72%, rgba(3, 8, 18, 0.88) 100%)',
        }}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/DepartureJourney.tsx">
<![CDATA['use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { DEPARTURE_STAGES, type DepartureStage } from '../../lib/orbit-beyond/data';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export function DepartureJourney() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  const [activeStageId, setActiveStageId] = useState<DepartureStage['id']>('launch');
  const [imageSrc, setImageSrc] = useState<string>(ORBIT_ASSETS.orbitalTransit);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const activeStage =
    DEPARTURE_STAGES.find((stage) => stage.id === activeStageId) ?? DEPARTURE_STAGES[0];

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        end: 'bottom 35%',
        onUpdate: (self) => {
          if (userInteractedRef.current) return;
          const p = self.progress;
          if (p < 0.34) {
            setActiveStageId('launch');
          } else if (p < 0.7) {
            setActiveStageId('transfer');
          } else {
            setActiveStageId('arrival');
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleStageSelect = (id: DepartureStage['id']) => {
    userInteractedRef.current = true;
    setActiveStageId(id);
  };

  const handleImageError = () => {
    if (imageSrc === ORBIT_ASSETS.orbitalTransit) {
      setImageSrc(ORBIT_ASSETS.orbitalTransitAltPath);
      return;
    }
    setImageFailed(true);
  };

  return (
    <section
      id="the-journey"
      ref={sectionRef}
      aria-labelledby="departure-heading"
      className="relative isolate w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Header Row */}
        <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              01 · THE DEPARTURE
            </p>
            <h2
              id="departure-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              A LITTLE FURTHER FROM ORDINARY.
            </h2>
          </div>

          <p className="font-editorial-serif italic text-2xl sm:text-3xl text-[#AAB7C4] lg:text-right">
            From the familiar blue to a view few can imagine.
          </p>
        </div>

        {/* Main Interactive Stage Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Concise Mission Ledger (4 cols) */}
          <div
            role="tablist"
            aria-label="Mission Departure Stages"
            className="lg:col-span-4 liquid-glass rounded-[28px] p-5 sm:p-6 flex flex-col justify-between gap-3"
          >
            {DEPARTURE_STAGES.map((stage) => {
              const isSelected = stage.id === activeStage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`tab-stage-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-stage-${stage.id}`}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`w-full text-left rounded-[20px] p-5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                    isSelected
                      ? 'bg-[#178CFA]/22 border border-[#8DE9FF]/50 text-[#EDF6FD] shadow-[0_8px_24px_rgba(23,140,250,0.18)]'
                      : 'bg-white/[0.02] border border-transparent text-[#AAB7C4] hover:bg-white/[0.05] hover:text-[#EDF6FD]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-hud-mono text-xs font-semibold tracking-[0.18em] uppercase text-[#8DE9FF]">
                      {stage.code}
                    </span>
                    <span className="font-hud-mono text-[11px] text-[#AAB7C4]">
                      {stage.altitude}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-bold text-[#EDF6FD]">
                    {stage.title}
                  </h3>
                  {isSelected && (
                    <p
                      id={`panel-stage-${stage.id}`}
                      className="mt-2 text-xs sm:text-sm leading-relaxed text-[#AAB7C4]"
                    >
                      {stage.summary}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Wide Orbital Viewport + SVG Trajectory Overlay (8 cols) */}
          <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[460px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/12 bg-[#091525] flex flex-col justify-between p-6 sm:p-8">
            {!imageFailed && (
              <img
                src={imageSrc}
                alt="Curved spacecraft observation window looking out over Earth's glowing blue atmospheric limb in deep space."
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
                style={{
                  transform:
                    activeStage.id === 'launch'
                      ? 'scale(1.02)'
                      : activeStage.id === 'transfer'
                      ? 'scale(1.06) translateX(-1.5%)'
                      : 'scale(1.1) translateX(-3%)',
                }}
              />
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(3, 8, 18, 0.55) 0%, rgba(3, 8, 18, 0.25) 50%, rgba(3, 8, 18, 0.78) 100%)',
              }}
            />

            {/* Top Minimal Phase Indicator */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.2em] text-[#EDF6FD] uppercase">
                CISLUNAR TRAJECTORY
              </span>
              <span className="font-hud-mono text-xs tracking-[0.2em] text-[#8DE9FF] uppercase">
                {activeStage.label} · {activeStage.durationMark}
              </span>
            </div>

            {/* Interactive SVG Orbital Trajectory Plot */}
            <div className="relative z-10 my-auto py-4">
              <svg
                viewBox="0 0 1000 360"
                className="w-full h-auto overflow-visible"
                role="img"
                aria-label={`Cislunar orbital trajectory plot showing current phase ${activeStage.code}`}
              >
                <defs>
                  <linearGradient id="orbitArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#178CFA" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#8DE9FF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#F6C98C" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                <path
                  d="M 185 310 C 310 95, 640 85, 845 215"
                  fill="none"
                  stroke="rgba(237, 246, 253, 0.2)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                <motion.path
                  d="M 185 310 C 310 95, 640 85, 845 215"
                  fill="none"
                  stroke="url(#orbitArcGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: activeStage.pathProgress }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
                />

                {DEPARTURE_STAGES.map((stage) => {
                  const isCurrent = stage.id === activeStage.id;
                  return (
                    <g
                      key={stage.id}
                      className="cursor-pointer"
                      onClick={() => handleStageSelect(stage.id)}
                    >
                      <circle
                        cx={stage.markerCoords.x}
                        cy={stage.markerCoords.y}
                        r={isCurrent ? 15 : 8}
                        fill={isCurrent ? 'rgba(23, 140, 250, 0.28)' : 'rgba(3, 8, 18, 0.7)'}
                        stroke={isCurrent ? '#8DE9FF' : 'rgba(237, 246, 253, 0.45)'}
                        strokeWidth={isCurrent ? 2 : 1.2}
                      />
                      <circle
                        cx={stage.markerCoords.x}
                        cy={stage.markerCoords.y}
                        r={isCurrent ? 5 : 3.5}
                        fill={isCurrent ? '#EDF6FD' : '#8DE9FF'}
                      />
                      <text
                        x={stage.markerCoords.x}
                        y={stage.markerCoords.y - 22}
                        textAnchor="middle"
                        fill={isCurrent ? '#EDF6FD' : '#AAB7C4'}
                        className="font-hud-mono text-[12px] tracking-[0.16em] uppercase"
                      >
                        {stage.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Single Clean Bottom Line */}
            <div className="relative z-10 flex items-center justify-between gap-4 pt-3 border-t border-white/12 font-hud-mono text-xs text-[#EDF6FD]/85">
              <span>{activeStage.title}</span>
              <span className="text-[#8DE9FF]">{activeStage.velocity}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/FinalHorizon.tsx">
<![CDATA['use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { GlassButton } from './GlassButton';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export interface FinalHorizonProps {
  onNavigate: (sectionId: string) => void;
}

export function FinalHorizon({ onNavigate }: FinalHorizonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineMaskRef = useRef<HTMLDivElement | null>(null);
  const horizonMediaRef = useRef<HTMLDivElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string>(ORBIT_ASSETS.finalEarthrise);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineMaskRef.current || !horizonMediaRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        horizonMediaRef.current,
        { scale: 1.07, yPercent: 6 },
        {
          scale: 1,
          yPercent: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        headlineMaskRef.current,
        { y: 36, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 25%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleImageError = () => {
    if (imageSrc === ORBIT_ASSETS.finalEarthrise) {
      setImageSrc(ORBIT_ASSETS.finalEarthriseAltPath);
      return;
    }
    setImageFailed(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer
      id="final-horizon"
      ref={sectionRef}
      aria-labelledby="final-horizon-heading"
      className="relative isolate w-full bg-[#030812] pt-20 overflow-clip border-t border-white/8"
    >
      {/* Full-Width Final Earthrise Scene */}
      <div className="relative min-h-[82svh] w-full flex flex-col justify-between overflow-hidden">
        {/* Background Media Plate: 06-final-earthrise.webp */}
        <div
          ref={horizonMediaRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          {!imageFailed ? (
            <img
              src={imageSrc}
              alt=""
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            /* Polished dark SVG Earthrise + ridge composition fallback */
            <svg viewBox="0 0 1440 800" className="h-full w-full bg-[#030812]">
              <circle cx="235" cy="390" r="46" fill="#178CFA" opacity="0.65" />
              <path
                d="M 0 450 Q 420 390, 920 430 T 1440 410 L 1440 800 L 0 800 Z"
                fill="#091525"
              />
            </svg>
          )}

          {/* Top & Bottom Atmospheric Scrims */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(3,8,18,0.92) 0%, rgba(3,8,18,0.32) 42%, rgba(3,8,18,0.22) 65%, rgba(3,8,18,0.96) 100%)',
            }}
          />

          {/* Subtle Orbital Horizon Linework */}
          <svg
            viewBox="0 0 1440 500"
            className="absolute inset-x-0 top-12 w-full h-auto opacity-35"
          >
            <path
              d="M 120 380 Q 720 120, 1320 380"
              fill="none"
              stroke="#8DE9FF"
              strokeWidth="1"
              strokeDasharray="6 8"
            />
          </svg>
        </div>

        {/* Center-Top Editorial Statement in the Open Sky */}
        <div
          ref={headlineMaskRef}
          className="relative z-10 mx-auto flex w-[min(1120px,90vw)] flex-col items-center text-center pt-12 sm:pt-20 pb-16"
        >
          <span className="font-hud-mono text-xs tracking-[0.24em] text-[#8DE9FF] uppercase mb-5">
            06 · THE FINAL HORIZON
          </span>

          <h2
            id="final-horizon-heading"
            className="font-display-sans font-extrabold uppercase tracking-[-0.03em] text-[#EDF6FD] leading-[0.96] text-[clamp(2.5rem,6vw,6.75rem)] drop-shadow-[0_8px_28px_rgba(3,8,18,0.85)]"
          >
            <span className="block">SEE YOU</span>
            <span className="block mt-1">
              ON THE{' '}
              <span className="font-editorial-serif italic font-normal lowercase tracking-normal text-[#8DE9FF]">
                other side.
              </span>
            </span>
          </h2>

          <p className="mt-6 font-hud-mono text-xs sm:text-sm tracking-[0.22em] text-[#EDF6FD]/85 uppercase">
            THE NEXT GREAT GETAWAY IS OUT THERE.
          </p>

          <div className="mt-8">
            <GlassButton
              type="button"
              variant="primary"
              size="lg"
              onClick={() => onNavigate('mission-configurator')}
            >
              <span>PREVIEW YOUR MISSION</span>
              <ArrowUpRight className="h-4 w-4" />
            </GlassButton>
          </div>
        </div>

        {/* Secondary Quiet Footer Grid */}
        <div className="relative z-10 border-t border-white/10 bg-[#030812]/85 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Brand Lockup Left */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <a
                href="#lunar-arrival"
                onClick={(e) => handleNavClick(e, 'lunar-arrival')}
                className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] text-[#EDF6FD] uppercase whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] rounded"
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#8DE9FF]" />
                <span>ORBIT &amp; BEYOND</span>
              </a>
              <span className="text-xs text-[#AAB7C4]">
                Speculative 2045 Lunar Weekend Concept
              </span>
            </div>

            {/* Section Anchors Center */}
            <nav
              aria-label="Footer Section Navigation"
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="#the-journey"
                onClick={(e) => handleNavClick(e, 'the-journey')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#AAB7C4] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                THE JOURNEY
              </a>
              <a
                href="#the-habitat"
                onClick={(e) => handleNavClick(e, 'the-habitat')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#AAB7C4] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                THE HABITAT
              </a>
              <a
                href="#lunar-experiences"
                onClick={(e) => handleNavClick(e, 'lunar-experiences')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#AAB7C4] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                EXPERIENCES
              </a>
              <a
                href="#mission-configurator"
                onClick={(e) => handleNavClick(e, 'mission-configurator')}
                className="font-hud-mono text-[11px] tracking-[0.18em] text-[#8DE9FF] hover:text-[#EDF6FD] uppercase whitespace-nowrap transition-colors"
              >
                MISSION PREVIEW
              </a>
            </nav>

            {/* Fictional Concept Disclaimer Right */}
            <div className="font-hud-mono text-[11px] tracking-[0.16em] text-[#AAB7C4] uppercase">
              FICTIONAL CONCEPT — OPENLANDING · NO REAL FLIGHTS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/GlassButton.tsx">
<![CDATA['use client';

import React, { forwardRef, useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'glass' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  function GlassButton(
    {
      variant = 'glass',
      size = 'md',
      className = '',
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    externalRef
  ) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const [glintCoords, setGlintCoords] = useState<{ x: number; y: number } | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef && 'current' in externalRef) {
        externalRef.current = node;
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!prefersReducedMotion && internalRef.current) {
        const rect = internalRef.current.getBoundingClientRect();
        setGlintCoords({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setGlintCoords(null);
      onMouseLeave?.(e);
    };

    const sizeClasses =
      size === 'sm'
        ? 'px-4 py-2 text-xs tracking-[0.14em]'
        : size === 'lg'
        ? 'px-7 py-4 text-xs sm:text-sm tracking-[0.16em]'
        : 'px-5 py-3 text-xs tracking-[0.15em]';

    const variantClasses =
      variant === 'primary'
        ? 'bg-[#178CFA] text-[#EDF6FD] border border-[#8DE9FF]/45 shadow-[0_0_28px_rgba(23,140,250,0.42),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:bg-[#2298FF] hover:shadow-[0_0_38px_rgba(141,233,255,0.52),inset_0_1px_1px_rgba(255,255,255,0.5)]'
        : variant === 'subtle'
        ? 'bg-[#091525]/70 text-[#AAB7C4] hover:text-[#EDF6FD] border border-white/12 hover:border-white/25'
        : 'liquid-glass text-[#EDF6FD] hover:border-white/25';

    return (
      <motion.button
        ref={setRefs}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.025 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase whitespace-nowrap shrink-0 cursor-pointer select-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030812] disabled:opacity-50 disabled:pointer-events-none overflow-hidden ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {!prefersReducedMotion && glintCoords && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(120px circle at ${glintCoords.x}px ${glintCoords.y}px, rgba(141, 233, 255, 0.22), transparent 70%)`,
            }}
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
      </motion.button>
    );
  }
);
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/HabitatExplorer.tsx">
<![CDATA['use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { HABITAT_HOTSPOTS, type HabitatHotspot } from '../../lib/orbit-beyond/data';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export function HabitatExplorer() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const [activeHotspotId, setActiveHotspotId] = useState<HabitatHotspot['id']>('lounge');
  const [imageSrc, setImageSrc] = useState<string>(ORBIT_ASSETS.habitatInterior);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const activeHotspot =
    HABITAT_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? HABITAT_HOTSPOTS[0];

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !frameRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameRef.current,
        { scale: 0.93, borderRadius: '40px' },
        {
          scale: 1,
          borderRadius: '28px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleImageError = () => {
    if (imageSrc === ORBIT_ASSETS.habitatInterior) {
      setImageSrc(ORBIT_ASSETS.habitatInteriorAltPath);
      return;
    }
    setImageFailed(true);
  };

  return (
    <section
      id="the-habitat"
      ref={sectionRef}
      aria-labelledby="habitat-heading"
      className="relative isolate w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading & Instrument Serif Editorial Accent */}
        <div className="mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#F6C98C] uppercase mb-2.5">
              02 · THE HABITAT
            </p>
            <h2
              id="habitat-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              YOUR WINDOW TO EVERYTHING.
            </h2>
          </div>

          <p className="font-editorial-serif italic text-2xl sm:text-4xl text-[#F6C98C]/95">
            Home, but somewhere entirely new.
          </p>
        </div>

        {/* Accessible Tablist */}
        <div
          role="tablist"
          aria-label="Habitat Architectural Zones"
          className="mb-5 flex flex-wrap items-center gap-2.5"
        >
          {HABITAT_HOTSPOTS.map((spot) => {
            const isSelected = spot.id === activeHotspot.id;
            return (
              <button
                key={spot.id}
                type="button"
                role="tab"
                id={`habitat-tab-${spot.id}`}
                aria-selected={isSelected}
                aria-controls={`habitat-panel-${spot.id}`}
                onClick={() => setActiveHotspotId(spot.id)}
                className={`rounded-full px-4 py-2 font-hud-mono text-xs tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                  isSelected
                    ? 'bg-[#178CFA] text-[#EDF6FD] shadow-[0_0_24px_rgba(23,140,250,0.4)]'
                    : 'liquid-glass text-[#AAB7C4] hover:text-[#EDF6FD] hover:border-white/25'
                }`}
              >
                {spot.code}
              </button>
            );
          })}
        </div>

        {/* Immersive Rounded Panoramic View */}
        <div
          ref={frameRef}
          className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/15 bg-[#091525] shadow-2xl"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            {!imageFailed ? (
              <img
                src={imageSrc}
                alt="Interior of the Orbit & Beyond lunar habitat showing the warm amber Earthrise Lounge on the left, central dual-tier Sleep Pod berths, and right-side Observation Deck window looking out at the Moon and Earth."
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#091525] p-8">
                <p className="font-hud-mono text-sm text-[#8DE9FF]">
                  ARCHITECTURAL SECTIONAL SCHEMATIC · DOME 01
                </p>
              </div>
            )}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(3,8,18,0.25) 0%, rgba(3,8,18,0.04) 50%, rgba(3,8,18,0.75) 100%)',
              }}
            />

            {/* 16:9 SVG Architectural Annotation Linework */}
            <svg
              viewBox="0 0 160 90"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <polyline
                points="40,61.2 76.8,44.1 132.8,41.4"
                fill="none"
                stroke="rgba(141, 233, 255, 0.32)"
                strokeWidth="0.35"
                strokeDasharray="1.8 1.8"
              />
            </svg>

            {/* Interactive Touch-Friendly Hotspot Buttons */}
            {HABITAT_HOTSPOTS.map((spot) => {
              const isSelected = spot.id === activeHotspot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  aria-label={`Inspect ${spot.code}: ${spot.shortTitle}`}
                  aria-pressed={isSelected}
                  onClick={() => setActiveHotspotId(spot.id)}
                  style={{
                    left: `${spot.coords.xPercent}%`,
                    top: `${spot.coords.yPercent}%`,
                  }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 rounded-full p-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <span className="relative flex items-center justify-center">
                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-2 rounded-full border border-[#8DE9FF]/75"
                      />
                    )}
                    <span
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-hud-mono text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#178CFA] text-[#EDF6FD] ring-4 ring-[#8DE9FF]/35 scale-105'
                          : 'liquid-glass text-[#EDF6FD] hover:border-[#8DE9FF]/60 hover:scale-105'
                      }`}
                    >
                      {spot.code.slice(0, 2)}
                    </span>
                  </span>
                  <span
                    className={`hidden md:inline-flex rounded-full px-3 py-1 font-hud-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#030812]/90 text-[#8DE9FF] border border-[#8DE9FF]/50'
                        : 'bg-[#030812]/75 text-[#EDF6FD]/85 border border-white/15 opacity-90 group-hover:opacity-100'
                    }`}
                  >
                    {spot.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Distilled Bottom-Edge Liquid-Glass Annotation Bar */}
          <div
            id={`habitat-panel-${activeHotspot.id}`}
            role="tabpanel"
            aria-labelledby={`habitat-tab-${activeHotspot.id}`}
            className="relative z-20 border-t border-white/12 bg-[#030812]/88 backdrop-blur-xl px-6 py-5 sm:px-8 sm:py-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-hud-mono text-xs font-semibold tracking-[0.2em] text-[#8DE9FF] uppercase">
                      {activeHotspot.code}
                    </span>
                    <span aria-hidden="true" className="text-white/25">·</span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#EDF6FD]">
                      {activeHotspot.shortTitle}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-[#AAB7C4] max-w-2xl">
                    {activeHotspot.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-hud-mono text-xs shrink-0">
                  <span className="text-[#EDF6FD]">{activeHotspot.capacitySpec}</span>
                  <span aria-hidden="true" className="text-white/25">·</span>
                  <span className="text-[#F6C98C]">{activeHotspot.lightingSpec}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/LunarExperiences.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { LUNAR_EXPERIENCES, type LunarExperienceItem } from '../../lib/orbit-beyond/data';
import { GlassButton } from './GlassButton';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface LunarExperiencesProps {
  onSelectForMission?: (enableRover: boolean) => void;
}

export function LunarExperiences({ onSelectForMission }: LunarExperiencesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedExperience, setSelectedExperience] = useState<LunarExperienceItem | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedExperience) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedExperience(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedExperience]);

  return (
    <section
      id="lunar-experiences"
      aria-labelledby="experiences-heading"
      className="relative w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              04 · BEYOND THE DOME
            </p>
            <h2
              id="experiences-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              THE SURFACE IS JUST THE BEGINNING.
            </h2>
          </div>

          <p className="font-editorial-serif italic text-2xl sm:text-3xl text-[#AAB7C4] lg:text-right">
            Outside on ancient regolith, or warm inside the glass ring.
          </p>
        </div>

        {/* Offset Staggered Cinematic Plates */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {LUNAR_EXPERIENCES.map((exp, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* Oversized Cinematic Media Plate */}
                <div
                  className={`lg:col-span-8 ${
                    isFirst ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="group relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/15 bg-[#091525] shadow-2xl">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(3,8,18,0.22) 0%, rgba(3,8,18,0.05) 55%, rgba(3,8,18,0.75) 100%)',
                        }}
                      />

                      {/* Genuine SVG Ridge / Horizon Annotation Overlay */}
                      {isFirst ? (
                        <svg
                          viewBox="0 0 800 500"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 h-full w-full"
                        >
                          <path
                            d="M 60 340 Q 290 210, 560 255 T 750 310"
                            fill="none"
                            stroke="#8DE9FF"
                            strokeWidth="1.75"
                            strokeDasharray="6 6"
                            strokeOpacity="0.75"
                          />
                          <circle cx="560" cy="255" r="6" fill="#8DE9FF" />
                          <circle
                            cx="560"
                            cy="255"
                            r="16"
                            fill="none"
                            stroke="#8DE9FF"
                            strokeWidth="1.2"
                            strokeOpacity="0.6"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 800 500"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 h-full w-full"
                        >
                          <circle
                            cx="695"
                            cy="195"
                            r="58"
                            fill="none"
                            stroke="#F6C98C"
                            strokeWidth="1.4"
                            strokeDasharray="4 5"
                            strokeOpacity="0.75"
                          />
                        </svg>
                      )}

                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                        <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#EDF6FD] uppercase">
                          {exp.kicker}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distilled Editorial Card */}
                <div
                  className={`lg:col-span-4 ${
                    isFirst ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="liquid-glass rounded-[28px] p-6 sm:p-8">
                    <span className="font-hud-mono text-xs tracking-[0.2em] text-[#8DE9FF] uppercase">
                      {exp.code}
                    </span>
                    <h3 className="mt-2.5 font-display-sans text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#EDF6FD] uppercase">
                      {exp.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#AAB7C4]">
                      {exp.description}
                    </p>

                    <div className="mt-5 flex items-center gap-3 font-hud-mono text-xs text-[#EDF6FD]/80">
                      <span>{exp.durationSpec}</span>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span className="text-[#8DE9FF]">{exp.elevationSpec}</span>
                    </div>

                    <div className="mt-6">
                      <GlassButton
                        type="button"
                        variant="glass"
                        size="md"
                        onClick={() => setSelectedExperience(exp)}
                        className="w-full justify-between"
                      >
                        <span>EXPLORE {exp.title}</span>
                        <ArrowUpRight className="h-4 w-4 text-[#8DE9FF]" />
                      </GlassButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Experience Specification Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030812]/85 p-4 sm:p-6 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedExperience(null);
              }
            }}
          >
            <motion.div
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 10 }}
              className="liquid-glass relative w-full max-w-xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-hud-mono text-[11px] tracking-[0.2em] text-[#8DE9FF] uppercase">
                    {selectedExperience.code}
                  </span>
                  <h3
                    id="experience-modal-title"
                    className="mt-1 font-display-sans text-2xl font-bold text-[#EDF6FD] uppercase"
                  >
                    {selectedExperience.title}
                  </h3>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Close experience dossier"
                  onClick={() => setSelectedExperience(null)}
                  className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-[#EDF6FD] hover:border-[#8DE9FF]/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 relative aspect-[16/9] w-full overflow-hidden rounded-[20px] border border-white/12">
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              <ul className="mt-5 space-y-2">
                {selectedExperience.extendedNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#AAB7C4]">
                    <CheckCircle2 className="h-4 w-4 text-[#8DE9FF] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                {onSelectForMission && (
                  <GlassButton
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onSelectForMission(selectedExperience.id === 'low-gravity-walk');
                      setSelectedExperience(null);
                    }}
                  >
                    APPLY TO MISSION PLANNER
                  </GlassButton>
                )}
                <GlassButton
                  type="button"
                  variant="subtle"
                  size="sm"
                  onClick={() => setSelectedExperience(null)}
                >
                  CLOSE
                </GlassButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/LunarHero.tsx">
<![CDATA['use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Play, X } from 'lucide-react';
import { CinematicMedia } from './CinematicMedia';
import { GlassButton } from './GlassButton';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export interface LunarHeroProps {
  onReserveClick: () => void;
  onExploreJourneyClick: () => void;
}

export function LunarHero({ onReserveClick, onExploreJourneyClick }: LunarHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const contentLayerRef = useRef<HTMLDivElement | null>(null);

  const [teaserModalOpen, setTeaserModalOpen] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState<string>(ORBIT_ASSETS.heroVideo);

  const teaserTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll-driven compression of foreground typography behind the lunar horizon
  useLayoutEffect(() => {
    if (prefersReducedMotion || !heroSectionRef.current || !contentLayerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(contentLayerRef.current, {
        yPercent: 18,
        scale: 0.94,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Modal keyboard & focus management
  useEffect(() => {
    if (!teaserModalOpen) return;

    const focusTimer = window.setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeTeaserModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [teaserModalOpen]);

  const openTeaserModal = () => {
    if (videoUnavailable) {
      onExploreJourneyClick();
      return;
    }
    setTeaserModalOpen(true);
  };

  const closeTeaserModal = () => {
    if (modalVideoRef.current && !modalVideoRef.current.paused) {
      modalVideoRef.current.pause();
    }
    setTeaserModalOpen(false);
    window.setTimeout(() => {
      teaserTriggerRef.current?.focus();
    }, 20);
  };

  const handleModalVideoError = () => {
    if (modalVideoSrc === ORBIT_ASSETS.heroVideo) {
      setModalVideoSrc(ORBIT_ASSETS.heroVideoAltPath);
      return;
    }
    setVideoUnavailable(true);
    setTeaserModalOpen(false);
  };

  return (
    <section
      id="lunar-arrival"
      ref={heroSectionRef}
      aria-label="Lunar Arrival Hero"
      className="relative min-h-[100svh] w-full overflow-clip flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-10"
    >
      {/* Background Clean Plate + 10-Second Muted Video Loop */}
      <CinematicMedia
        pausedByModal={teaserModalOpen}
        onVideoUnavailable={() => setVideoUnavailable(true)}
      />

      {/* Top Spacer so central cluster sits at ~47-54% viewport height */}
      <div aria-hidden="true" className="h-4 sm:h-8" />

      {/* Centered Foreground UI Layer */}
      <div
        ref={contentLayerRef}
        className="relative z-10 mx-auto flex w-[min(1080px,90vw)] flex-col items-center text-center my-auto py-8"
      >
        {/* Two translucent HUD badges above the center headline */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 sm:mb-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          <span className="liquid-glass inline-flex items-center rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] font-medium tracking-[0.2em] text-[#EDF6FD] uppercase whitespace-nowrap">
            EST. 2045
          </span>
          <span className="liquid-glass inline-flex items-center rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] font-medium tracking-[0.2em] text-[#8DE9FF] uppercase whitespace-nowrap">
            MISSION PREVIEW / CONCEPT
          </span>
        </motion.div>

        {/* Main Centered Two-Line Uppercase Headline */}
        <h1 className="font-display-sans font-extrabold uppercase tracking-[-0.03em] text-[#EDF6FD] leading-[0.95] text-[clamp(2.5rem,6.4vw,7.4rem)] drop-shadow-[0_10px_32px_rgba(3,8,18,0.75)]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              initial={prefersReducedMotion ? false : { y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.68, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              BOOK YOUR WEEKEND
            </motion.span>
          </span>
          <span className="block overflow-hidden pt-0.5">
            <motion.span
              initial={prefersReducedMotion ? false : { y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.68, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#EDF6FD]"
            >
              ON THE MOON.
            </motion.span>
          </span>
        </h1>

        {/* Centered CTA Row directly beneath the headline */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <GlassButton
            type="button"
            variant="primary"
            size="lg"
            onClick={onReserveClick}
          >
            <span>RESERVE YOUR SEAT</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </GlassButton>

          <GlassButton
            ref={teaserTriggerRef}
            type="button"
            variant="glass"
            size="lg"
            onClick={openTeaserModal}
          >
            <Play className="h-3.5 w-3.5 fill-current text-[#8DE9FF]" />
            <span>{videoUnavailable ? 'EXPLORE THE JOURNEY' : 'WATCH TEASER'}</span>
          </GlassButton>
        </motion.div>
      </div>

      {/* Bottom Status & Scroll Cue */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-12">
        <span className="font-hud-mono text-[11px] tracking-[0.22em] text-[#EDF6FD]/75 uppercase">
          A NEW PERSPECTIVE AWAITS
        </span>

        <button
          type="button"
          onClick={onExploreJourneyClick}
          className="group inline-flex items-center gap-2 rounded-full py-1.5 px-3 font-hud-mono text-[11px] tracking-[0.2em] text-[#EDF6FD]/80 hover:text-[#8DE9FF] uppercase transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
        >
          <span>SCROLL</span>
          <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5 text-[#8DE9FF]" />
        </button>
      </div>

      {/* Gently curved lunar-horizon bottom transition gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030812] via-[#030812]/55 to-transparent"
      />

      {/* Accessible Teaser Video Modal */}
      <AnimatePresence>
        {teaserModalOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="teaser-modal-title"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030812]/88 p-4 sm:p-6 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeTeaserModal();
              }
            }}
          >
            <motion.div
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass relative w-full max-w-5xl rounded-[28px] sm:rounded-[36px] p-4 sm:p-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between gap-4 px-2">
                <h2
                  id="teaser-modal-title"
                  className="font-hud-mono text-xs sm:text-sm tracking-[0.2em] text-[#EDF6FD] uppercase"
                >
                  ORBIT &amp; BEYOND · 2045 MISSION TEASER
                </h2>

                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  aria-label="Close teaser video dialog"
                  onClick={closeTeaserModal}
                  className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-[#EDF6FD] hover:border-[#8DE9FF]/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#030812] border border-white/10">
                <video
                  ref={modalVideoRef}
                  src={modalVideoSrc}
                  poster={ORBIT_ASSETS.heroPoster}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={handleModalVideoError}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-end px-2">
                <span className="font-hud-mono text-[11px] text-[#8DE9FF]">
                  CONCEPT DEMO / NO BOOKING CREATED
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/MissionConfigurator.tsx">
<![CDATA['use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, RotateCcw, Sparkles } from 'lucide-react';
import {
  DEFAULT_MISSION_PLAN,
  deriveMissionDetails,
  formatMissionBriefText,
  type MissionPlan,
  type MissionStyle,
  type PartySize,
  type TripNights,
} from '../../lib/orbit-beyond/mission';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { GlassButton } from './GlassButton';
import { MissionPreviewDialog } from './MissionPreviewDialog';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export interface MissionConfiguratorProps {
  plan: MissionPlan;
  onChangePlan: React.Dispatch<React.SetStateAction<MissionPlan>>;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export function MissionConfigurator({
  plan,
  onChangePlan,
  headingRef,
}: MissionConfiguratorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [inlineCopied, setInlineCopied] = useState(false);

  const details = deriveMissionDetails(plan);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !consoleRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        consoleRef.current,
        { rotateX: 4, y: 24, transformPerspective: 1200 },
        {
          rotateX: 0,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'top 25%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const setStyle = (style: MissionStyle) => {
    onChangePlan((prev) => ({ ...prev, style }));
  };

  const setParty = (party: PartySize) => {
    onChangePlan((prev) => ({ ...prev, party }));
  };

  const setNights = (nights: TripNights) => {
    onChangePlan((prev) => ({ ...prev, nights }));
  };

  const toggleRoverWalk = () => {
    onChangePlan((prev) => ({ ...prev, roverWalk: !prev.roverWalk }));
  };

  const handleReset = () => {
    onChangePlan(DEFAULT_MISSION_PLAN);
  };

  const handleQuickCopy = async () => {
    const text = formatMissionBriefText(plan);
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Fallback copy');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setInlineCopied(true);
    window.setTimeout(() => setInlineCopied(false), 3000);
  };

  const previewImage =
    plan.style === 'crater' || plan.roverWalk
      ? ORBIT_ASSETS.lunarRoverExcursion
      : ORBIT_ASSETS.habitatInterior;

  return (
    <section
      id="mission-configurator"
      ref={sectionRef}
      aria-labelledby="configurator-heading"
      className="relative w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Heading & Mandatory Visible Qualifier */}
        <div className="mb-10 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              05 · YOUR MISSION
            </p>
            <h2
              id="configurator-heading"
              ref={headingRef}
              tabIndex={-1}
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04] focus:outline-none"
            >
              MAKE THE WEEKEND YOURS.
            </h2>
          </div>

          <p className="font-hud-mono text-[11px] tracking-[0.16em] text-[#F6C98C] uppercase">
            ILLUSTRATIVE MISSION PLANNER — NO REAL FLIGHTS OR BOOKINGS.
          </p>
        </div>

        {/* Embedded Rounded Liquid-Glass Mission Console */}
        <div
          ref={consoleRef}
          className="liquid-glass rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 lg:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left High-Contrast Live Mission Preview (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[360px] rounded-[26px] border border-white/12 bg-[#091525] overflow-hidden flex flex-col justify-between p-6">
              <img
                src={previewImage}
                alt={
                  plan.style === 'crater'
                    ? 'Crater Explorer surface excursion with rover and astronauts on the lunar rim.'
                    : 'Earthrise Retreat lunar habitat interior and observation window.'
                }
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(3,8,18,0.6) 0%, rgba(3,8,18,0.18) 45%, rgba(3,8,18,0.9) 100%)',
                }}
              />

              {/* Top Status Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#8DE9FF] uppercase">
                  {details.styleCode}
                </span>
                <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#EDF6FD] uppercase">
                  CONCEPT DEMO / NO BOOKING CREATED
                </span>
              </div>

              {/* Dynamic SVG Orbital Profile Visualization & Summary Line */}
              <div className="relative z-10 mt-auto pt-12">
                <svg
                  viewBox="0 0 600 110"
                  className="w-full h-auto overflow-visible"
                  aria-hidden="true"
                >
                  <line
                    x1="20"
                    y1="90"
                    x2="580"
                    y2="90"
                    stroke="rgba(237, 246, 253, 0.2)"
                    strokeWidth="1"
                  />
                  <path
                    d={
                      plan.style === 'crater'
                        ? 'M 40 90 Q 300 10, 560 90'
                        : 'M 40 90 Q 300 40, 560 90'
                    }
                    fill="none"
                    stroke="#8DE9FF"
                    strokeWidth="2.2"
                    strokeDasharray={plan.nights === 3 ? 'none' : '6 4'}
                  />
                  {plan.roverWalk && (
                    <path
                      d="M 390 90 Q 465 52, 540 90"
                      fill="none"
                      stroke="#F6C98C"
                      strokeWidth="1.8"
                    />
                  )}
                  {Array.from({ length: plan.party }).map((_, idx) => {
                    const cx = 180 + idx * (240 / Math.max(1, plan.party));
                    const cy = plan.style === 'crater' ? 50 : 65;
                    return (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r="5"
                        fill="#EDF6FD"
                        stroke="#178CFA"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>

                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3 border-t border-white/12 pt-4">
                  <h3 className="font-display-sans text-2xl font-bold text-[#EDF6FD] uppercase">
                    {details.styleLabel}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 font-hud-mono text-xs text-[#8DE9FF]">
                    <span>{details.partyLabel}</span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                    <span>{details.durationLabel}</span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                    <span className="text-[#F6C98C]">
                      {plan.roverWalk ? 'ROVER EVA' : 'DOME ONLY'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Minimal Configuration Controls (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                {/* Control 1: Mission Style */}
                <fieldset>
                  <legend className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#AAB7C4] uppercase mb-2">
                    MISSION STYLE
                  </legend>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        { id: 'earthrise', label: 'EARTHRISE RETREAT' },
                        { id: 'crater', label: 'CRATER EXPLORER' },
                      ] as const
                    ).map((option) => {
                      const active = plan.style === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setStyle(option.id)}
                          className={`rounded-[16px] py-3 px-3.5 text-center font-hud-mono text-xs font-bold tracking-[0.12em] uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                            active
                              ? 'bg-[#178CFA]/25 border border-[#8DE9FF] text-[#EDF6FD]'
                              : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Control 2: Party Size */}
                <fieldset>
                  <legend className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#AAB7C4] uppercase mb-2">
                    PARTY SIZE
                  </legend>
                  <div className="grid grid-cols-3 gap-2.5">
                    {([1, 2, 4] as const).map((count) => {
                      const active = plan.party === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setParty(count)}
                          className={`rounded-[16px] py-3 px-4 font-hud-mono text-xs font-semibold tracking-[0.16em] uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                            active
                              ? 'bg-[#178CFA] text-[#EDF6FD] border border-[#8DE9FF]'
                              : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                          }`}
                        >
                          {count} {count === 1 ? 'GUEST' : 'GUESTS'}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Control 3: Duration */}
                <fieldset>
                  <legend className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#AAB7C4] uppercase mb-2">
                    DURATION
                  </legend>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        { nights: 2, label: '2 NIGHTS' },
                        { nights: 3, label: '3 NIGHTS' },
                      ] as const
                    ).map((item) => {
                      const active = plan.nights === item.nights;
                      return (
                        <button
                          key={item.nights}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setNights(item.nights)}
                          className={`rounded-[16px] py-3 px-4 text-center font-hud-mono text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                            active
                              ? 'bg-[#178CFA]/25 border border-[#8DE9FF] text-[#EDF6FD]'
                              : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Control 4: Optional Guided Rover Walk */}
                <div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={plan.roverWalk}
                    aria-label="Guided Rover Walk"
                    onClick={toggleRoverWalk}
                    className={`w-full flex items-center justify-between gap-4 rounded-[16px] px-4 py-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                      plan.roverWalk
                        ? 'bg-[#178CFA]/20 border border-[#8DE9FF]/70 text-[#EDF6FD]'
                        : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                    }`}
                  >
                    <span className="font-hud-mono text-xs font-bold tracking-[0.16em] uppercase">
                      GUIDED ROVER WALK
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full font-hud-mono text-[11px] font-semibold uppercase ${
                        plan.roverWalk
                          ? 'bg-[#178CFA] text-[#EDF6FD]'
                          : 'bg-white/10 text-[#AAB7C4]'
                      }`}
                    >
                      {plan.roverWalk ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Console Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <GlassButton
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => setPreviewOpen(true)}
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>PREVIEW MY MISSION</span>
                </GlassButton>

                <div className="grid grid-cols-2 gap-3">
                  <GlassButton
                    type="button"
                    variant="glass"
                    size="sm"
                    onClick={handleQuickCopy}
                    className="w-full"
                  >
                    {inlineCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#8DE9FF]" />
                        <span>BRIEF COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#8DE9FF]" />
                        <span>QUICK COPY BRIEF</span>
                      </>
                    )}
                  </GlassButton>

                  <GlassButton
                    type="button"
                    variant="subtle"
                    size="sm"
                    onClick={handleReset}
                    className="w-full"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>RESET</span>
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Mission Summary Modal */}
      <MissionPreviewDialog
        open={previewOpen}
        plan={plan}
        onClose={() => setPreviewOpen(false)}
        onReset={handleReset}
      />
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/MissionPreviewDialog.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Download, RotateCcw, X } from 'lucide-react';
import {
  deriveMissionDetails,
  formatMissionBriefText,
  type MissionPlan,
} from '../../lib/orbit-beyond/mission';
import { GlassButton } from './GlassButton';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface MissionPreviewDialogProps {
  open: boolean;
  plan: MissionPlan;
  onClose: () => void;
  onReset: () => void;
}

export function MissionPreviewDialog({
  open,
  plan,
  onClose,
  onReset,
}: MissionPreviewDialogProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [copiedState, setCopiedState] = useState<'idle' | 'copied'>('idle');
  const [downloadedState, setDownloadedState] = useState<'idle' | 'downloaded'>('idle');

  const details = deriveMissionDetails(plan);
  const briefText = formatMissionBriefText(plan);

  useEffect(() => {
    if (!open) {
      setCopiedState('idle');
      setDownloadedState('idle');
      return;
    }

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const handleCopyBrief = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(briefText);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = briefText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textArea);
      }
    }
    setCopiedState('copied');
    window.setTimeout(() => setCopiedState('idle'), 3000);
  };

  const handleDownloadBrief = () => {
    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orbit-beyond-2045-${details.styleCode.toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedState('downloaded');
    window.setTimeout(() => setDownloadedState('idle'), 3000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mission-preview-dialog-title"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030812]/88 p-4 sm:p-6 backdrop-blur-xl overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass relative my-auto w-full max-w-3xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#8DE9FF] uppercase">
                    CONCEPT DEMO / NO BOOKING CREATED
                  </span>
                  <span aria-hidden="true" className="text-white/25">·</span>
                  <span className="font-hud-mono text-[11px] text-[#F6C98C]">
                    {details.styleCode}
                  </span>
                </div>
                <h3
                  id="mission-preview-dialog-title"
                  className="mt-1.5 font-display-sans text-2xl sm:text-3xl font-bold text-[#EDF6FD] uppercase"
                >
                  MISSION DOSSIER: {details.styleLabel}
                </h3>
                <p className="mt-1 text-xs font-hud-mono tracking-[0.14em] text-[#AAB7C4] uppercase">
                  ILLUSTRATIVE MISSION PLANNER — NO REAL FLIGHTS OR BOOKINGS.
                </p>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close mission preview dialog"
                onClick={onClose}
                className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-[#EDF6FD] hover:border-[#8DE9FF]/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Selected Configuration Summary Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  MISSION STYLE
                </span>
                <span className="mt-1 block text-base font-bold text-[#EDF6FD]">
                  {details.styleLabel}
                </span>
                <span className="mt-0.5 block text-xs text-[#8DE9FF]">
                  {details.surfaceSector}
                </span>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  EXPEDITION PARTY
                </span>
                <span className="mt-1 block text-base font-bold text-[#EDF6FD]">
                  {details.partyLabel}
                </span>
                <span className="mt-0.5 block text-xs text-[#F6C98C]">
                  {details.cabinAllocation}
                </span>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  STAY DURATION
                </span>
                <span className="mt-1 block text-base font-bold text-[#EDF6FD]">
                  {details.durationLabel}
                </span>
                <span className="mt-0.5 block text-xs text-[#AAB7C4]">
                  {details.orbitalApogee}
                </span>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  GUIDED ROVER WALK
                </span>
                <span className="mt-1 block text-base font-bold text-[#8DE9FF]">
                  {plan.roverWalk ? 'ENABLED (4.2 KM ESCARPMENT)' : 'NOT SELECTED (DOME FOCUS)'}
                </span>
                <span className="mt-0.5 block text-xs text-[#AAB7C4]">
                  {details.roverLabel}
                </span>
              </div>
            </div>

            {/* Schedule Outline */}
            <div className="mt-6 rounded-[22px] border border-white/10 bg-[#030812]/70 p-5">
              <p className="font-hud-mono text-xs font-semibold tracking-[0.18em] text-[#8DE9FF] uppercase">
                CONFIGURED CONCEPT SCHEDULE
              </p>
              <ol className="mt-3 space-y-2.5">
                {details.scheduleOutline.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-[#EDF6FD]/90">
                    <span className="font-hud-mono text-xs text-[#8DE9FF] shrink-0">
                      0{index + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Live region for copy/download status */}
            <div className="sr-only" aria-live="polite">
              {copiedState === 'copied' ? 'Mission brief copied to clipboard.' : ''}
              {downloadedState === 'downloaded' ? 'Mission brief text file downloaded.' : ''}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <GlassButton
                type="button"
                variant="subtle"
                size="sm"
                onClick={() => {
                  onReset();
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>RESET TO DEFAULTS</span>
              </GlassButton>

              <div className="flex flex-wrap items-center gap-3">
                <GlassButton
                  type="button"
                  variant="glass"
                  size="sm"
                  onClick={handleDownloadBrief}
                >
                  <Download className="h-3.5 w-3.5 text-[#8DE9FF]" />
                  <span>
                    {downloadedState === 'downloaded' ? 'BRIEF DOWNLOADED' : 'DOWNLOAD BRIEF'}
                  </span>
                </GlassButton>

                <GlassButton
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleCopyBrief}
                >
                  {copiedState === 'copied' ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>COPIED (CONCEPT DEMO)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY MISSION BRIEF</span>
                    </>
                  )}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/OrbitBeyondPage.tsx">
<![CDATA['use client';

import React, { useRef, useState } from 'react';
import { DEFAULT_MISSION_PLAN, type MissionPlan } from '../../lib/orbit-beyond/mission';
import { OrbitHeader } from './OrbitHeader';
import { LunarHero } from './LunarHero';
import { DepartureJourney } from './DepartureJourney';
import { HabitatExplorer } from './HabitatExplorer';
import { SeventyTwoHours } from './SeventyTwoHours';
import { LunarExperiences } from './LunarExperiences';
import { MissionConfigurator } from './MissionConfigurator';
import { FinalHorizon } from './FinalHorizon';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export function OrbitBeyondPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [missionPlan, setMissionPlan] = useState<MissionPlan>(DEFAULT_MISSION_PLAN);
  const configuratorHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const scrollToSection = (sectionId: string, focusHeading = false) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    if (focusHeading && sectionId === 'mission-configurator') {
      window.setTimeout(() => {
        configuratorHeadingRef.current?.focus({ preventScroll: true });
      }, prefersReducedMotion ? 50 : 550);
    }
  };

  const handleApplyExperienceToMission = (enableRover: boolean) => {
    setMissionPlan((prev) => ({
      ...prev,
      roverWalk: enableRover,
      style: enableRover ? 'crater' : 'earthrise',
    }));
    scrollToSection('mission-configurator', true);
  };

  return (
    <div className="min-h-[100svh] w-full bg-[#030812] text-[#EDF6FD] selection:bg-[#178CFA]/30">
      <OrbitHeader onNavigate={(id) => scrollToSection(id, id === 'mission-configurator')} />

      <main>
        {/* SCENE 01 — LUNAR ARRIVAL */}
        <LunarHero
          onReserveClick={() => scrollToSection('mission-configurator', true)}
          onExploreJourneyClick={() => scrollToSection('the-journey')}
        />

        {/* SCENE 02 — THE DEPARTURE / LEAVING EARTH */}
        <DepartureJourney />

        {/* SCENE 03 — THE HABITAT / A ROOM WITH AN IMPOSSIBLE VIEW */}
        <HabitatExplorer />

        {/* SCENE 04 — 72 HOURS / THREE DAYS, ONE WORLD AWAY */}
        <SeventyTwoHours />

        {/* SCENE 05 — BEYOND THE DOME / EXPERIENCES */}
        <LunarExperiences onSelectForMission={handleApplyExperienceToMission} />

        {/* SCENE 06 — YOUR MISSION / INTERACTIVE CONCEPT CONFIGURATOR */}
        <MissionConfigurator
          plan={missionPlan}
          onChangePlan={setMissionPlan}
          headingRef={configuratorHeadingRef}
        />
      </main>

      {/* SCENE 07 — THE FINAL HORIZON / CINEMATIC FOOTER */}
      <FinalHorizon onNavigate={(id) => scrollToSection(id, id === 'mission-configurator')} />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/OrbitHeader.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface OrbitHeaderProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'THE JOURNEY', id: 'the-journey' },
  { label: 'THE STAY', id: 'the-habitat' },
  { label: 'EXPERIENCE', id: 'lunar-experiences' },
  { label: 'MISSION PREVIEW', id: 'mission-configurator' },
] as const;

export function OrbitHeader({ onNavigate }: OrbitHeaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const triggerBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        triggerBtnRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuPanelRef.current &&
        !menuPanelRef.current.contains(e.target as Node) &&
        !triggerBtnRef.current?.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#030812]/72 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-4 sm:px-8 lg:px-12">
        {/* Zone 1: Brand mark with thin outlined orbit icon */}
        <a
          href="#lunar-arrival"
          onClick={(e) => handleLinkClick(e, 'lunar-arrival')}
          className="group inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#EDF6FD] uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] rounded-full py-1 pr-2"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-[#EDF6FD] transition-transform duration-300 group-hover:rotate-12"
          >
            <circle
              cx="14"
              cy="14"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.25"
              className="opacity-90"
            />
            <motion.ellipse
              cx="14"
              cy="14"
              rx="12"
              ry="5.2"
              transform="rotate(-24 14 14)"
              stroke="#8DE9FF"
              strokeWidth="1.2"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <circle cx="24.2" cy="9.5" r="1.6" fill="#8DE9FF" />
          </svg>
          <span>ORBIT &amp; BEYOND</span>
        </a>

        {/* Zone 2: Desktop utility navigation */}
        <nav
          aria-label="Primary Mission Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="relative py-1 text-[11px] font-medium tracking-[0.18em] text-[#EDF6FD]/80 hover:text-[#EDF6FD] transition-colors whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8DE9FF] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Right action & mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#mission-configurator"
            onClick={(e) => handleLinkClick(e, 'mission-configurator')}
            className="liquid-glass hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-[#EDF6FD] uppercase whitespace-nowrap shrink-0 hover:border-[#8DE9FF]/45 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
          >
            MISSION PREVIEW
          </a>

          <button
            ref={triggerBtnRef}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-mission-nav"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="liquid-glass inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-full text-[#EDF6FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-mission-nav"
            ref={menuPanelRef}
            role="dialog"
            aria-label="Mobile Navigation"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass mx-4 mt-2 rounded-[24px] p-5 lg:hidden"
          >
            <nav aria-label="Mobile Mission Links" className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center justify-between rounded-[14px] px-4 py-3 text-xs font-semibold tracking-[0.18em] text-[#EDF6FD] hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <span>{item.label}</span>
                  <span className="font-hud-mono text-[10px] text-[#8DE9FF]">2045</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/components/orbit-beyond/SeventyTwoHours.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ITINERARY_DAYS, type ItineraryDay } from '../../lib/orbit-beyond/data';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export function SeventyTwoHours() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeDayId, setActiveDayId] = useState<ItineraryDay['id']>('day-01');

  const activeDayIndex = ITINERARY_DAYS.findIndex((d) => d.id === activeDayId);
  const activeDay = ITINERARY_DAYS[activeDayIndex] ?? ITINERARY_DAYS[0];

  return (
    <section
      id="seventy-two-hours"
      aria-labelledby="itinerary-heading"
      className="relative isolate w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              03 · 72 HOURS
            </p>
            <h2
              id="itinerary-heading"
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04]"
            >
              72 HOURS. AN ENTIRELY NEW PERSPECTIVE.
            </h2>
          </div>

          <p className="font-hud-mono text-xs tracking-[0.18em] text-[#AAB7C4] uppercase">
            THREE DAYS · ONE WORLD AWAY
          </p>
        </div>

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Showing ${activeDay.code}: ${activeDay.title}. ${activeDay.subtitle}`}
        </div>

        {/* Main Mission Log Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Vertical Mission Timeline (4 cols) */}
          <div
            role="tablist"
            aria-label="72-Hour Lunar Weekend Days"
            className="lg:col-span-4 relative flex flex-col justify-between gap-3"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-6 bottom-6 w-[2px] bg-white/10 hidden sm:block"
            >
              <motion.div
                className="w-full bg-[#178CFA]"
                initial={false}
                animate={{
                  height: `${((activeDayIndex + 1) / ITINERARY_DAYS.length) * 100}%`,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {ITINERARY_DAYS.map((day) => {
              const isSelected = day.id === activeDay.id;
              return (
                <button
                  key={day.id}
                  type="button"
                  role="tab"
                  id={`itinerary-tab-${day.id}`}
                  aria-selected={isSelected}
                  aria-controls={`itinerary-panel-${day.id}`}
                  onClick={() => setActiveDayId(day.id)}
                  className={`relative sm:pl-14 text-left rounded-[24px] p-5 flex-1 flex flex-col justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                    isSelected
                      ? 'liquid-glass border-[#8DE9FF]/50 text-[#EDF6FD]'
                      : 'bg-white/[0.02] border border-white/6 text-[#AAB7C4] hover:bg-white/[0.04] hover:text-[#EDF6FD]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`hidden sm:flex absolute left-[18px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? 'bg-[#178CFA] border-[#8DE9FF] shadow-[0_0_12px_#178CFA]'
                        : 'bg-[#030812] border-white/30'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-hud-mono text-xs font-semibold tracking-[0.2em] text-[#8DE9FF] uppercase">
                      {day.code}
                    </span>
                    <span className="font-hud-mono text-[11px] text-[#AAB7C4]">
                      {day.windowLabel}
                    </span>
                  </div>

                  <h3 className="mt-1 text-lg font-bold text-[#EDF6FD]">
                    {day.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Large Shared Scene Viewport (8 cols) */}
          <div
            id={`itinerary-panel-${activeDay.id}`}
            role="tabpanel"
            aria-labelledby={`itinerary-tab-${activeDay.id}`}
            className="lg:col-span-8 liquid-glass rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, clipPath: 'inset(0 0 8% 0 round 32px)' }
                }
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 32px)' }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, clipPath: 'inset(6% 0 0 0 round 32px)' }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                {/* Visual Plate */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#091525]">
                  <img
                    src={activeDay.image}
                    alt={activeDay.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(3,8,18,0.3) 0%, rgba(3,8,18,0.05) 45%, rgba(3,8,18,0.88) 100%)',
                    }}
                  />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.2em] text-[#EDF6FD] uppercase">
                      {activeDay.code}
                    </span>
                    <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#8DE9FF] uppercase">
                      {activeDay.elevation}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-6 right-6">
                    <h3 className="font-display-sans text-2xl sm:text-3xl font-bold text-[#EDF6FD]">
                      {activeDay.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-[#EDF6FD]/85 max-w-xl">
                      {activeDay.subtitle}
                    </p>
                  </div>
                </div>

                {/* Distilled Single-Line Checkpoints Strip */}
                <div className="px-6 py-4 sm:px-8 sm:py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#030812]/75 border-t border-white/10">
                  {activeDay.highlights.map((item) => (
                    <div key={item.time} className="flex items-center gap-3">
                      <span className="font-hud-mono text-xs font-semibold text-[#8DE9FF]">
                        {item.time}
                      </span>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span className="text-xs sm:text-sm font-medium text-[#EDF6FD]">
                        {item.activity}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/lib/orbit-beyond/assets.ts">
<![CDATA[/**
 * Verified local media inventory for ORBIT & BEYOND (2045 Concept).
 * All 6 media files are present locally in both /templates/orbitbeyond/orbit-beyond/ and /templates/orbitbeyond/.
 */

export const ORBIT_ASSETS = {
  heroPoster: '/templates/orbitbeyond/orbit-beyond/01-hero-lunar-clean.webp',
  heroPosterAltPath: '/templates/orbitbeyond/01-hero-lunar-clean.webp',
  heroVideo: '/templates/orbitbeyond/orbit-beyond/02-hero-lunar-loop.mp4',
  heroVideoAltPath: '/templates/orbitbeyond/02-hero-lunar-loop.mp4',
  orbitalTransit: '/templates/orbitbeyond/orbit-beyond/03-orbital-transit.webp',
  orbitalTransitAltPath: '/templates/orbitbeyond/03-orbital-transit.webp',
  habitatInterior: '/templates/orbitbeyond/orbit-beyond/04-habitat-interior.webp',
  habitatInteriorAltPath: '/templates/orbitbeyond/04-habitat-interior.webp',
  lunarRoverExcursion: '/templates/orbitbeyond/orbit-beyond/05-lunar-rover-excursion.webp',
  lunarRoverExcursionAltPath: '/templates/orbitbeyond/05-lunar-rover-excursion.webp',
  finalEarthrise: '/templates/orbitbeyond/orbit-beyond/06-final-earthrise.webp',
  finalEarthriseAltPath: '/templates/orbitbeyond/06-final-earthrise.webp',
} as const;

export type OrbitAssetKey = keyof typeof ORBIT_ASSETS;
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/lib/orbit-beyond/data.ts">
<![CDATA[import { ORBIT_ASSETS } from './assets';

export interface DepartureStage {
  id: 'launch' | 'transfer' | 'arrival';
  index: string;
  code: string;
  label: string;
  title: string;
  altitude: string;
  velocity: string;
  durationMark: string;
  summary: string;
  telemetryNote: string;
  pathProgress: number;
  markerCoords: { x: number; y: number };
}

export const DEPARTURE_STAGES: DepartureStage[] = [
  {
    id: 'launch',
    index: '01',
    code: '01 / LAUNCH',
    label: 'EARTH',
    title: 'Low-Orbit Ascent',
    altitude: '410 KM LEO',
    velocity: '7.67 KM/S',
    durationMark: 'T+00:42',
    summary: 'Ascend in a quiet pressurized cabin as Earth curves into a sapphire horizon.',
    telemetryNote: 'Equatorial ascent corridor.',
    pathProgress: 0.22,
    markerCoords: { x: 185, y: 310 },
  },
  {
    id: 'transfer',
    index: '02',
    code: '02 / TRANSFER',
    label: 'TRANSFER',
    title: 'Cislunar Coast',
    altitude: '192,400 KM',
    velocity: '1.42 KM/S',
    durationMark: 'T+09:15',
    summary: 'Weightless stillness through deep space as the lunar highlands sharpen ahead.',
    telemetryNote: 'Artificial twilight active.',
    pathProgress: 0.62,
    markerCoords: { x: 520, y: 148 },
  },
  {
    id: 'arrival',
    index: '03',
    code: '03 / ARRIVAL',
    label: 'APPROACH',
    title: 'Regolith Touchdown',
    altitude: '0.0 KM',
    velocity: '0.166 G',
    durationMark: 'T+14:00',
    summary: 'Vertical descent over basalt plains beside the warmly lit glass habitat dome.',
    telemetryNote: 'Mare Tranquillitatis dock.',
    pathProgress: 1.0,
    markerCoords: { x: 845, y: 215 },
  },
];

export interface HabitatHotspot {
  id: 'lounge' | 'sleep-pod' | 'observation-deck';
  code: string;
  shortTitle: string;
  zoneSubtitle: string;
  /** Percentage coordinates anchored to the actual regions in 04-habitat-interior.webp */
  coords: { xPercent: number; yPercent: number };
  capacitySpec: string;
  lightingSpec: string;
  acousticSpec: string;
  description: string;
  architecturalNote: string;
}

export const HABITAT_HOTSPOTS: HabitatHotspot[] = [
  {
    id: 'lounge',
    code: '01 / EARTHRISE LOUNGE',
    shortTitle: 'Earthrise Lounge',
    zoneSubtitle: 'Warm acoustic conversation pit',
    coords: { xPercent: 25, yPercent: 68 },
    capacitySpec: '4 Guests',
    lightingSpec: '2700K Amber Coves',
    acousticSpec: '18 dBA Quiet Baffling',
    description:
      'Sunken wool-basalt seating and warm floor coves with direct sightlines to the viewport.',
    architecturalNote: 'Pressure Rib Frame-A',
  },
  {
    id: 'sleep-pod',
    code: '02 / SLEEP POD',
    shortTitle: 'Private Sleep Sanctuary',
    zoneSubtitle: 'Dual-tier acoustic berths',
    coords: { xPercent: 48, yPercent: 49 },
    capacitySpec: '2 Berths / Bay',
    lightingSpec: 'Solar-Drift Dimmer',
    acousticSpec: 'Triple-Sealed Bulkhead',
    description:
      'Recessed cylindrical berths with 1/6g weighted linens and whisper-quiet airflow.',
    architecturalNote: 'Shielded Inner Core',
  },
  {
    id: 'observation-deck',
    code: '03 / OBSERVATION DECK',
    shortTitle: 'Observation Deck & Cupola',
    zoneSubtitle: 'Triple-pane fused silica window',
    coords: { xPercent: 83, yPercent: 46 },
    capacitySpec: '160° Field of View',
    lightingSpec: 'Dark-Adapted Gallery',
    acousticSpec: 'Zero-Vibration Rail',
    description:
      'Brushed titanium guardrail before a monolithic quartz window framing Earth and the crater floor.',
    architecturalNote: 'Optical Quartz Cupola',
  },
];

export interface ItineraryDay {
  id: 'day-01' | 'day-02' | 'day-03';
  dayNumber: string;
  code: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  windowLabel: string;
  elevation: string;
  summary: string;
  highlights: {
    time: string;
    activity: string;
    detail: string;
  }[];
}

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    id: 'day-01',
    dayNumber: '01',
    code: 'DAY 01 / LANDING',
    title: 'Arrival Under a Blue Moon',
    subtitle: 'Orientation in the habitat, first view of Earthrise, settle into the lounge.',
    image: ORBIT_ASSETS.habitatInterior,
    imageAlt: 'Warmly lit circular lunar habitat interior with lounge seating, sleep berths, and Earth visible through the right viewport.',
    windowLabel: 'HOURS 01 — 24',
    elevation: 'HABITAT DOME',
    summary:
      'Step into warm 2700K cabin light, acclimate to 1/6g strides, and gather at the observation rail.',
    highlights: [
      {
        time: '16:00',
        activity: '1/6g Orientation',
        detail: 'Pressurized lock arrival.',
      },
      {
        time: '19:30',
        activity: 'Earthrise Tasting',
        detail: 'Botanicals by the viewport.',
      },
      {
        time: '22:00',
        activity: 'Lights-Out Watch',
        detail: 'Earth-glow deck stillness.',
      },
    ],
  },
  {
    id: 'day-02',
    dayNumber: '02',
    code: 'DAY 02 / EXPLORE',
    title: 'Across the Silent Crater Rim',
    subtitle: 'Guided rover outing, slow surface exploration, crater-rim photo stop.',
    image: ORBIT_ASSETS.lunarRoverExcursion,
    imageAlt: 'Two astronauts and a six-wheeled lunar rover parked along a dramatic sunlit crater ridge with Earth in the black sky.',
    windowLabel: 'HOURS 25 — 48',
    elevation: '+380M RIDGE',
    summary:
      'Follow twin rover tracks up the sunlit escarpment and stand in vacuum silence looking back at Earth.',
    highlights: [
      {
        time: '09:00',
        activity: 'Airlock Egress',
        detail: 'Surface suit check.',
      },
      {
        time: '11:30',
        activity: 'Ridge Traverse',
        detail: '4.2 km escarpment climb.',
      },
      {
        time: '15:00',
        activity: 'Crater Overlook',
        detail: 'Low-gravity ridge walk.',
      },
    ],
  },
  {
    id: 'day-03',
    dayNumber: '03',
    code: 'DAY 03 / RETURN',
    title: 'Earthward Horizon & Ascent',
    subtitle: 'Sunrise reflection, final station breakfast, departure briefing.',
    image: ORBIT_ASSETS.orbitalTransit,
    imageAlt: 'Curved spacecraft window looking out at the glowing blue limb of Earth and swirling white clouds against deep space.',
    windowLabel: 'HOURS 49 — 72',
    elevation: 'RETURN ARC',
    summary:
      'Share a quiet morning in the lounge before boarding the vertical lander back toward Earth.',
    highlights: [
      {
        time: '08:30',
        activity: 'Station Breakfast',
        detail: 'Logbook archival.',
      },
      {
        time: '12:00',
        activity: 'Lunar Liftoff',
        detail: 'Vertical ascent burn.',
      },
      {
        time: '20:45',
        activity: 'Earth Approach',
        detail: 'Blue limb reentry prep.',
      },
    ],
  },
];

export interface LunarExperienceItem {
  id: 'low-gravity-walk' | 'earthrise-lounge';
  code: string;
  title: string;
  kicker: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  captionBand: string;
  durationSpec: string;
  environmentSpec: string;
  elevationSpec: string;
  description: string;
  extendedNotes: string[];
}

export const LUNAR_EXPERIENCES: LunarExperienceItem[] = [
  {
    id: 'low-gravity-walk',
    code: '01 · SURFACE EXCURSION',
    title: 'LOW-GRAVITY WALK',
    kicker: '0.166G RIDGE TRAVERSE',
    subtitle: 'Unhurried exploration along the sunlit crater rim.',
    image: ORBIT_ASSETS.lunarRoverExcursion,
    imageAlt: 'Two astronauts standing beside a lunar rover on the rim of a deep crater with Earth glowing in the upper-left sky.',
    captionBand: '4.2 KM RIDGE LOOP',
    durationSpec: '3.5 Hours EVA',
    environmentSpec: 'Pressurized Suit',
    elevationSpec: '+380m Overlook',
    description:
      'Trace the sharp shadow line of an ancient impact crater on foot and by six-wheel electric rover.',
    extendedNotes: [
      'Lightweight mobility suits with wide-field visors.',
      'Pressurized support rover with backup umbilicals and optics.',
      '4.2 km route along verified basalt bedrock.',
    ],
  },
  {
    id: 'earthrise-lounge',
    code: '02 · HABITAT SANCTUARY',
    title: 'THE EARTHRISE LOUNGE',
    kicker: '2700K INTERIOR',
    subtitle: 'Warm acoustics and uninterrupted views of home.',
    image: ORBIT_ASSETS.habitatInterior,
    imageAlt: 'Interior of the lunar habitat showing warm amber-lit lounge seating on the left and a large window overlooking the Moon and Earth on the right.',
    captionBand: '160° HORIZON WINDOW',
    durationSpec: 'All 72 Hours',
    environmentSpec: '21°C Breathable Cabin',
    elevationSpec: '160° Cupola',
    description:
      'Woven upholstery and indirect amber lighting paired with a monolithic fused-silica viewport.',
    extendedNotes: [
      'Circadian lighting shifting to 2700K evening warmth.',
      'Standing gallery rail directly before the observation window.',
      'Nightly dimmed-cabin hours for unobstructed Earth-glow.',
    ],
  },
];
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/lib/orbit-beyond/mission.ts">
<![CDATA[export type MissionStyle = 'earthrise' | 'crater';
export type PartySize = 1 | 2 | 4;
export type TripNights = 2 | 3;

export interface MissionPlan {
  style: MissionStyle;
  party: PartySize;
  nights: TripNights;
  roverWalk: boolean;
}

export const DEFAULT_MISSION_PLAN: MissionPlan = {
  style: 'earthrise',
  party: 2,
  nights: 3,
  roverWalk: true,
};

export interface MissionDerivedDetails {
  styleLabel: string;
  styleCode: string;
  styleDescription: string;
  partyLabel: string;
  cabinAllocation: string;
  durationLabel: string;
  totalHoursLabel: string;
  roverLabel: string;
  orbitalApogee: string;
  surfaceSector: string;
  scheduleOutline: string[];
}

export function deriveMissionDetails(plan: MissionPlan): MissionDerivedDetails {
  const isCrater = plan.style === 'crater';
  const styleLabel = isCrater ? 'CRATER EXPLORER' : 'EARTHRISE RETREAT';
  const styleCode = isCrater ? 'OB-2045-EXP' : 'OB-2045-RET';
  const styleDescription = isCrater
    ? 'Field-focused surface itinerary emphasizing escarpment geology, crater rim traverses, and optical horizon photography.'
    : 'Sanctuary-paced itinerary centered on the Earthrise Lounge, private cupola hours, and unhurried low-gravity stillness.';

  const partyLabel =
    plan.party === 1
      ? '1 SOLO EXPLORER'
      : `${plan.party} PARTICIPANTS`;

  const cabinAllocation =
    plan.party === 1
      ? 'Single Sanctuary Berth · Bay A1'
      : plan.party === 2
      ? 'Dual Sanctuary Suite · Bay A1–A2'
      : 'Full Quadrant Charter · Bays A1–B2';

  const totalHours = plan.nights === 3 ? 72 : 48;
  const durationLabel = `${plan.nights} NIGHTS (${totalHours} HOURS)`;
  const totalHoursLabel = `${totalHours} HRS LUNAR STAY`;

  const roverLabel = plan.roverWalk
    ? 'INCLUDED — 4.2 KM GUIDED ROVER & RIDGE WALK'
    : 'HABITAT-ONLY — DOME & OBSERVATION DECK FOCUS';

  const orbitalApogee = isCrater ? '118 KM LOW POLAR-INCLINED RELAY' : '96 KM EQUATORIAL SCENIC APPROACH';
  const surfaceSector = isCrater
    ? 'Mare Tranquillitatis · North Crater Escarpment'
    : 'Mare Tranquillitatis · Dome 01 Sanctuary Wing';

  const scheduleOutline: string[] = [
    `Day 01: Cislunar arrival, 1/6g habitat orientation, and ${
      isCrater ? 'surface suit telemetry calibration' : 'first Earthrise tasting in the lounge'
    }.`,
    `Day 02: ${
      plan.roverWalk
        ? 'Guided six-wheel rover excursion to +380m crater rim overlook and low-gravity ridge walk.'
        : 'Private cupola observation window, acoustic rest cycle, and hydroponic conservatory tour.'
    }`,
  ];

  if (plan.nights === 3) {
    scheduleOutline.push(
      `Day 03: ${
        isCrater
          ? 'Early shadow-line optical capture, station breakfast, and vertical methalox ascent.'
          : 'Unhurried Earth-glow reflection session, logbook archival, and cislunar return coast.'
      }`
    );
  } else {
    scheduleOutline.push(
      'Return Window (48h): Morning departure briefing and trans-Earth injection burn.'
    );
  }

  return {
    styleLabel,
    styleCode,
    styleDescription,
    partyLabel,
    cabinAllocation,
    durationLabel,
    totalHoursLabel,
    roverLabel,
    orbitalApogee,
    surfaceSector,
    scheduleOutline,
  };
}

export function formatMissionBriefText(plan: MissionPlan): string {
  const details = deriveMissionDetails(plan);
  return [
    '============================================================',
    'ORBIT & BEYOND — 2045 CONCEPT MISSION BRIEF',
    'STATUS: CONCEPT DEMO / NO BOOKING CREATED',
    'ILLUSTRATIVE MISSION PLANNER — NO REAL FLIGHTS OR BOOKINGS.',
    '============================================================',
    `MISSION CODE:      ${details.styleCode}`,
    `MISSION STYLE:     ${details.styleLabel}`,
    `PARTY SIZE:        ${details.partyLabel}`,
    `CABIN ALLOCATION:  ${details.cabinAllocation}`,
    `DURATION:          ${details.durationLabel}`,
    `SURFACE EXCURSION: ${details.roverLabel}`,
    `LANDING SECTOR:    ${details.surfaceSector}`,
    `ORBITAL PROFILE:   ${details.orbitalApogee}`,
    '------------------------------------------------------------',
    'CONCEPT ITINERARY SUMMARY:',
    ...details.scheduleOutline.map((line, idx) => `  0${idx + 1}. ${line}`),
    '------------------------------------------------------------',
    'DISCLAIMER: Fictional speculative concept in the OpenLanding',
    'collection. No reservation, seat inventory, or flight exists.',
    '============================================================',
  ].join('\n');
}
]]>
    </file>
    <file path="src/app/(orbitbeyond)/orbitbeyond/lib/orbit-beyond/motion.ts">
<![CDATA[import { useEffect, useState } from 'react';

export const MOTION_TIMINGS = {
  microHover: 0.22,
  disclosure: 0.48,
  editorialMask: 0.82,
  heroSequenceTotal: 1.45,
} as const;

export const MOTION_EASINGS = {
  cinematicOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  editorialInOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

/**
 * Shared reduced-motion hook that respects `prefers-reduced-motion: reduce`.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
]]>
    </file>
  </files>
</template>

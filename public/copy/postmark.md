<template slug="postmark" name="POSTMARK">
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
    <file path="src/app/(postmark)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Fraunces } from "next/font/google";
import "./postmark/postmark.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const dM_Sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "POSTMARK — Collect Places. Keep Stories.",
  description: "A tactile travel-memory journal for saving photos, locations, handwritten memories, and creating collectible digital postcards.",
  openGraph: {
    title: "POSTMARK — Collect Places. Keep Stories.",
    description: "A tactile travel-memory journal for saving photos, locations, handwritten memories, and creating collectible digital postcards.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F1E8",
};

export default function PostmarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${caveat.variable} ${dM_Sans.variable} ${fraunces.variable} scroll-smooth`}>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(postmark)/postmark/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/postmark";

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
        className={`postmark-placeholder ${className ?? ""}`}
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
    <file path="src/app/(postmark)/postmark/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#F7F1E8" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#FFF9EF" text-anchor="middle">P</text>
</svg>
]]>
    </file>
    <file path="src/app/(postmark)/postmark/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "POSTMARK — Collect Places. Keep Stories.";

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
          backgroundColor: "#F7F1E8",
          color: "#FFF9EF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>POSTMARK</span>
          <span style={{ color: "#E8DDCA" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            POSTMARK — Collect Places. Keep Stories.
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            A tactile travel-memory journal for saving photos, locations, handwritten memories, and creating collectible digital postcards.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#E8DDCA" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(postmark)/postmark/page.tsx">
<![CDATA["use client";

import PostmarkApp from "./PostmarkApp";

export default function PostmarkPage() {
  return <PostmarkApp />;
}
]]>
    </file>
    <file path="src/app/(postmark)/postmark/postmark.css">
<![CDATA[@import "tailwindcss";

:root {
  --pm-paper: #F7F1E8;
  --pm-hero-paper: #F8F3EA;
  --pm-ivory: #FFF9EF;
  --pm-parchment: #E8DDCA;
  --pm-tan: #D8BD96;
  --pm-ink: #25292C;
  --pm-ink-muted: #52565A;
  --pm-brown: #5A3528;
  --pm-red: #D85743;
  --pm-red-deep: #AD4837;
  --pm-peach: #F2C7A3;
  --pm-sky: #8FC3E6;
  --pm-butter: #F4E07A;
  --pm-teal: #77978B;
  --pm-fine-line: rgba(90, 53, 40, 0.23);
  --pm-soft-shadow: 0 18px 48px rgba(75, 52, 35, 0.12);
  --pm-card-shadow: 0 10px 28px rgba(62, 41, 26, 0.11), 0 2px 6px rgba(62, 41, 26, 0.07);
  --pm-lifted-shadow: 0 24px 52px rgba(62, 41, 26, 0.18), 0 6px 14px rgba(62, 41, 26, 0.10);
}

html {
  background-color: var(--pm-paper);
  color: var(--pm-ink);
  font-family: var(--font-dm-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: clip;
}

body {
  margin: 0;
  background-color: var(--pm-paper);
  color: var(--pm-ink);
  overflow-x: clip;
}

.font-editorial {
  font-family: var(--font-fraunces), 'Fraunces', Georgia, 'Times New Roman', serif;
  font-variation-settings: "SOFT" 30, "WONK" 0;
}

.font-ui {
  font-family: var(--font-dm-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

.font-hand {
  font-family: var(--font-caveat), 'Caveat', cursive;
}

/* Subtle static SVG paper grain overlay */
.pm-paper-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
}

/* Ruled notebook / correspondence desk texture */
.pm-ruled-paper {
  background-color: var(--pm-ivory);
  background-image:
    linear-gradient(to bottom, transparent 31px, rgba(90, 53, 40, 0.09) 31px, rgba(90, 53, 40, 0.09) 32px);
  background-size: 100% 32px;
}

.pm-grid-scrap {
  background-color: #FAF4E8;
  background-image:
    linear-gradient(to right, rgba(90, 53, 40, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(90, 53, 40, 0.08) 1px, transparent 1px);
  background-size: 18px 18px;
}

/* Classic Par Avion / Airmail edge band */
.pm-airmail-band {
  background: repeating-linear-gradient(
    -45deg,
    #D85743 0px,
    #D85743 12px,
    #FFF9EF 12px,
    #FFF9EF 22px,
    #4F7893 22px,
    #4F7893 34px,
    #FFF9EF 34px,
    #FFF9EF 44px
  );
}

/* Washi tape accent */
.pm-washi-stripe {
  background: repeating-linear-gradient(
    -45deg,
    rgba(242, 199, 163, 0.82) 0px,
    rgba(242, 199, 163, 0.82) 6px,
    rgba(255, 249, 239, 0.86) 6px,
    rgba(255, 249, 239, 0.86) 12px
  );
  box-shadow: 0 2px 5px rgba(75, 52, 35, 0.08);
}

.pm-washi-sage {
  background: repeating-linear-gradient(
    45deg,
    rgba(119, 151, 139, 0.42) 0px,
    rgba(119, 151, 139, 0.42) 6px,
    rgba(255, 249, 239, 0.88) 6px,
    rgba(255, 249, 239, 0.88) 12px
  );
  box-shadow: 0 2px 5px rgba(75, 52, 35, 0.08);
}

/* Photo print & postcard surface rules */
.pm-photo-print {
  background-color: var(--pm-ivory);
  border: 1px solid rgba(90, 53, 40, 0.16);
  box-shadow: var(--pm-card-shadow);
}

.pm-postcard-sheet {
  background-color: var(--pm-ivory);
  border: 1px solid rgba(90, 53, 40, 0.22);
  box-shadow: var(--pm-soft-shadow);
}

.pm-elevated-sheet {
  box-shadow: var(--pm-lifted-shadow);
}

/* Seamless blending for clean hero right-side collage on desktop */
@media (min-width: 1024px) {
  .pm-hero-art-blend {
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.15) 24%,
      rgba(0, 0, 0, 0.85) 35%,
      #000000 43%
    );
    mask-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.15) 24%,
      rgba(0, 0, 0, 0.85) 35%,
      #000000 43%
    );
  }
}

/* Envelope 3D perspective stage */
.pm-envelope-perspective {
  perspective: 1400px;
}

.pm-envelope-flap-hinge {
  transform-origin: 50% 0%;
  transform-style: preserve-3d;
  will-change: transform;
}

/* Postcard 3D flip mechanics for Travel Filmstrip */
.pm-flip-scene {
  perspective: 1600px;
}

.pm-flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
}

.pm-flip-inner.is-flipped {
  transform: rotateY(180deg);
}

.pm-flip-face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.pm-flip-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(180deg);
}

/* Curated crops into supplied production WebP imagery (no unsupplied photos) */
.pm-crop-harbor {
  object-fit: cover;
  object-position: 50% 42%;
  transform: scale(1.75);
}

.pm-crop-kyoto-lane {
  object-fit: cover;
  object-position: 21% 28%;
  transform: scale(2.15);
}

.pm-crop-cafe {
  object-fit: cover;
  object-position: 55% 58%;
  transform: scale(2.25);
}

.pm-film-crop-harbor {
  object-fit: cover;
  object-position: 73% 76%;
  transform: scale(2.2);
}

.pm-film-crop-street {
  object-fit: cover;
  object-position: 22% 52%;
  transform: scale(1.95);
}

.pm-film-crop-cafe {
  object-fit: cover;
  object-position: 16% 58%;
  transform: scale(2.1);
}

.pm-film-crop-stamps {
  object-fit: cover;
  object-position: 28% 28%;
  transform: scale(1.55);
}

.pm-tint-warm {
  background-color: #FFF9EF;
}

.pm-tint-parchment {
  background-color: #F4EBDD;
}

.pm-tint-peach {
  background-color: #FBF1E6;
}

/* Restrained editorial print angles */
.pm-tilt-neg-1 {
  transform: rotate(-1.4deg);
}
.pm-tilt-pos-1 {
  transform: rotate(1.2deg);
}
.pm-tilt-neg-2 {
  transform: rotate(-0.9deg);
}
.pm-tilt-pos-2 {
  transform: rotate(1.5deg);
}

/* Click stamp-ring impulse animation */
@keyframes pm-stamp-ripple {
  0% {
    transform: translate(-50%, -50%) scale(0.45);
    opacity: 0.72;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.15);
    opacity: 0;
  }
}

.pm-stamp-ripple-ring {
  animation: pm-stamp-ripple 440ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Native dialog styling */
dialog.pm-dialog::backdrop {
  background: rgba(37, 41, 44, 0.52);
  backdrop-filter: blur(2px);
}

/* Custom focus-visible ring across all interactive paper elements */
:focus-visible {
  outline: 2px solid var(--pm-red);
  outline-offset: 3px;
}

/* Reduced motion strict compliance */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .pm-flip-inner {
    transition: none !important;
  }
}
]]>
    </file>
    <file path="src/app/(postmark)/postmark/PostmarkApp.tsx">
<![CDATA['use client';

import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EnvelopeEntry } from './components/postmark/EnvelopeEntry';
import { PostmarkHeader } from './components/postmark/PostmarkHeader';
import { HeroDesk } from './components/postmark/HeroDesk';
import { KeepsakeManifesto } from './components/postmark/KeepsakeManifesto';
import { PostcardBuilderStory } from './components/postmark/PostcardBuilderStory';
import { MemoryMap } from './components/postmark/MemoryMap';
import { StampDesk } from './components/postmark/StampDesk';
import { TravelFilmstrip } from './components/postmark/TravelFilmstrip';
import { FinalLetterFooter } from './components/postmark/FinalLetterFooter';
import { ensureGsapRegistered, shouldSkipEntryIntro } from './lib/postmark/motion';

export default function PostmarkApp() {
  const [introReady, setIntroReady] = useState<boolean>(() => shouldSkipEntryIntro());
  const [introFinished, setIntroFinished] = useState<boolean>(() => shouldSkipEntryIntro());

  const handleIntroHandoff = useCallback(() => {
    setIntroReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroReady(true);
    setIntroFinished(true);
  }, []);

  useEffect(() => {
    ensureGsapRegistered();
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => window.clearTimeout(timer);
  }, [introFinished]);

  return (
    <div className="min-h-screen w-full bg-[var(--pm-paper)] text-[var(--pm-ink)] selection:bg-[var(--pm-peach)] selection:text-[var(--pm-ink)]">
      {/* Chapter 00: Signature Opening Envelope Sequence */}
      {!introFinished && (
        <EnvelopeEntry
          onHandoff={handleIntroHandoff}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Integrated Editorial Top Bar */}
      <PostmarkHeader introReady={introReady} />

      {/* Continuous Scroll-Choreographed 7-Chapter Presentation */}
      <main id="pm-main">
        {/* Chapter 01: Hero — Collect Places. Keep Stories. */}
        <HeroDesk introReady={introReady} />

        {/* Chapter 02: The Keepsake Manifesto */}
        <KeepsakeManifesto />

        {/* Chapter 03: The Postcard Builder (3 Pinned Scroll Stages: Choose -> Write -> Stamp) */}
        <PostcardBuilderStory />

        {/* Chapter 04: The Memory Map */}
        <MemoryMap />

        {/* Chapter 05: The Stamp Desk */}
        <StampDesk />

        {/* Chapter 06: Travel Filmstrip */}
        <TravelFilmstrip />
      </main>

      {/* Chapter 07: The Final Letter CTA + Torn Paper Transition + True Footer */}
      <FinalLetterFooter />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/EnvelopeEntry.tsx">
<![CDATA['use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { shouldSkipEntryIntro } from '../../lib/postmark/motion';
import { PostalCancellationSeal } from './SVGStamp';

interface EnvelopeEntryProps {
  onHandoff: () => void;
  onComplete: () => void;
}

export const EnvelopeEntry: React.FC<EnvelopeEntryProps> = ({ onHandoff, onComplete }) => {
  const [dismissed, setDismissed] = useState<boolean>(() => shouldSkipEntryIntro());
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const flapRef = useRef<HTMLDivElement | null>(null);
  const sealRef = useRef<HTMLDivElement | null>(null);
  const arcsGroupRef = useRef<SVGGElement | null>(null);
  const handoffFiredRef = useRef(false);

  const finishImmediately = useCallback(() => {
    if (!handoffFiredRef.current) {
      handoffFiredRef.current = true;
      onHandoff();
    }
    setDismissed(true);
    onComplete();
  }, [onComplete, onHandoff]);

  useEffect(() => {
    if (dismissed) {
      finishImmediately();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishImmediately();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const ctx = gsap.context(() => {
      const arcs = arcsGroupRef.current?.querySelectorAll<SVGPathElement>('path') ?? [];
      arcs.forEach((arc) => {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        onComplete: () => {
          finishImmediately();
        },
      });

      // 1. Postal seal stamps down onto the envelope seam
      tl.fromTo(
        sealRef.current,
        { scale: 1.18, rotateZ: -8, opacity: 0.25 },
        { scale: 0.91, rotateZ: -1.5, opacity: 1, duration: 0.26, ease: 'power3.in' }
      )
        .to(sealRef.current, {
          scale: 1,
          rotateZ: 0,
          duration: 0.22,
          ease: 'back.out(2)',
        })
        // 2. Cancellation wave arcs draw outward
        .to(
          arcs,
          {
            strokeDashoffset: 0,
            duration: 0.36,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.14'
        )
        // 3. Hinged triangular envelope flap opens upward in 3D perspective
        .to(
          flapRef.current,
          {
            rotateX: 168,
            duration: 0.52,
            ease: 'power2.inOut',
          },
          '+=0.06'
        )
        // Trigger hero typography & collage handoff right as envelope peels away
        .call(
          () => {
            if (!handoffFiredRef.current) {
              handoffFiredRef.current = true;
              onHandoff();
            }
          },
          undefined,
          '-=0.18'
        )
        // 4. Entire paper envelope lifts/peels off upward
        .to(
          sheetRef.current,
          {
            yPercent: -104,
            rotateZ: -1.1,
            duration: 0.62,
            ease: 'expo.inOut',
          },
          '-=0.16'
        );
    }, overlayRef);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [dismissed, finishImmediately, onHandoff]);

  if (dismissed) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Opening travel correspondence intro"
      className="fixed inset-0 z-50 overflow-hidden pointer-events-auto"
    >
      <div
        ref={sheetRef}
        className="pm-envelope-perspective relative flex h-full w-full flex-col items-center justify-center bg-[var(--pm-ivory)] pm-paper-grain shadow-[0_28px_70px_rgba(37,41,44,0.22)]"
      >
        {/* Top & bottom classic Par Avion airmail edge bands */}
        <div className="pm-airmail-band absolute inset-x-0 top-0 h-2.5 opacity-85" aria-hidden="true" />
        <div className="pm-airmail-band absolute inset-x-0 bottom-0 h-2.5 opacity-85" aria-hidden="true" />

        {/* Envelope lower body diagonal paper folds */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M 0 900 L 720 430 L 1440 900"
            fill="#F3EADE"
            stroke="rgba(90, 53, 40, 0.16)"
            strokeWidth="1.5"
          />
          <path
            d="M 0 0 L 530 470 M 1440 0 L 910 470"
            fill="none"
            stroke="rgba(90, 53, 40, 0.12)"
            strokeWidth="1.2"
          />
        </svg>

        {/* Hinged top triangular envelope flap */}
        <div
          ref={flapRef}
          className="pm-envelope-flap-hinge pointer-events-none absolute inset-x-0 top-0 h-[56%] z-10"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 520"
            preserveAspectRatio="none"
            className="h-full w-full drop-shadow-[0_12px_24px_rgba(75,52,35,0.12)]"
          >
            <polygon
              points="0,0 1440,0 720,485"
              fill="#FAF2E4"
              stroke="rgba(90, 53, 40, 0.22)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Center POSTMARK postal seal + animated red cancellation arcs */}
        <div
          ref={sealRef}
          className="relative z-20 flex flex-col items-center text-center px-6"
        >
          <div className="relative flex items-center justify-center rounded-full bg-[var(--pm-ivory)] p-4 border border-[var(--pm-brown)]/25 shadow-[0_14px_34px_rgba(90,53,40,0.18)]">
            <PostalCancellationSeal
              topText="POSTMARK"
              bottomText="COLLECT PLACES"
              centerText="MAIL"
              className="w-24 h-24 text-[var(--pm-brown)]"
            />
            <svg
              viewBox="0 0 180 80"
              className="pointer-events-none absolute left-[82%] top-1/2 -translate-y-1/2 w-36 h-16 overflow-visible"
              aria-hidden="true"
            >
              <g ref={arcsGroupRef}>
                <path
                  d="M 4 20 Q 34 8 64 20 T 124 20 T 168 20"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 8 34 Q 38 22 68 34 T 128 34 T 172 34"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 4 48 Q 34 36 64 48 T 124 48 T 168 48"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 62 Q 40 50 70 62 T 130 62"
                  fill="none"
                  stroke="#5A3528"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </g>
            </svg>
          </div>
          <p className="mt-5 font-editorial text-xl tracking-[-0.01em] text-[var(--pm-ink)]">
            POSTMARK
          </p>
          <p className="mt-1 font-ui text-xs uppercase tracking-[0.2em] text-[var(--pm-brown)]/80">
            Collect Places · Keep Stories
          </p>
        </div>

        {/* Accessible Skip Intro button */}
        <button
          type="button"
          onClick={finishImmediately}
          className="absolute bottom-7 right-7 z-30 min-h-[44px] px-4 py-2 rounded-full bg-[var(--pm-ivory)]/95 border border-[var(--pm-brown)]/30 font-ui text-xs font-medium tracking-[0.08em] uppercase text-[var(--pm-ink)] shadow-sm hover:bg-[var(--pm-parchment)] cursor-pointer"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/FinalLetterFooter.tsx">
<![CDATA['use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUp, CheckCircle2, Info } from 'lucide-react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import { validateDemoEmail } from '../../lib/postmark/logic';
import {
  ensureGsapRegistered,
  scrollToSectionById,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

type ConceptDisclosureTopic = 'stores' | 'guide' | 'story' | 'privacy' | null;

const DISCLOSURE_COPY: Record<Exclude<ConceptDisclosureTopic, null>, { title: string; body: string }> = {
  stores: {
    title: 'Illustrative Store Badges — Concept Showcase',
    body: 'POSTMARK is a fictional product showcase crafted for OpenLanding (Template 097). Native iOS and Android downloads are coming soon in concept form only—no external app store links or installers are triggered.',
  },
  guide: {
    title: 'How POSTMARK Keeps Memories',
    body: 'Every journey combines three lightweight paper elements: a single meaningful photograph, two or three honest handwritten lines, and a dated postal cancellation mark. Try the live browser demo in the Postcard Builder and Stamp Desk above.',
  },
  story: {
    title: 'About the POSTMARK Concept',
    body: 'Designed as a warm correspondence folder rather than a noisy social feed, POSTMARK celebrates train tickets, ferry stubs, quiet morning walks, and postcards worth opening years from now.',
  },
  privacy: {
    title: 'Zero Data Collection — Local Browser Demo',
    body: 'This showcase runs entirely in your browser session. Notes typed in the Postcard Builder, stamps placed on the Stamp Desk, and email previews below are never transmitted, stored, or shared.',
  },
};

export const FinalLetterFooter: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const emailInputId = useId();

  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [demoPreviewAddress, setDemoPreviewAddress] = useState<string | null>(null);
  const [activeDisclosure, setActiveDisclosure] = useState<ConceptDisclosureTopic>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stackEnvelopeRef = useRef<HTMLDivElement | null>(null);
  const stackLeftPhoneRef = useRef<HTMLDivElement | null>(null);
  const stackRightPhoneRef = useRef<HTMLDivElement | null>(null);
  const ctaLine1Ref = useRef<HTMLSpanElement | null>(null);
  const ctaLine2Ref = useRef<HTMLSpanElement | null>(null);
  const placeSealRef = useRef<HTMLSpanElement | null>(null);
  const perforationPathRef = useRef<SVGPathElement | null>(null);
  const backToTopRef = useRef<HTMLButtonElement | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const root = wrapperRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // 1. Left paper stack fans outward from central pivot while right headline reveals via paper-slice masks
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 76%',
          toggleActions: 'play none none none',
        },
      });

      ctaTl
        .fromTo(
          stackEnvelopeRef.current,
          { rotateZ: 0, scale: 0.92, y: 24 },
          { rotateZ: 4.5, scale: 1, y: 0, duration: 0.88, ease: 'power3.out' },
          0
        )
        .fromTo(
          stackLeftPhoneRef.current,
          { x: 46, rotateZ: 0, scale: 0.94 },
          { x: 0, rotateZ: -5.5, scale: 1, duration: 0.94, ease: 'back.out(1.25)' },
          0.08
        )
        .fromTo(
          stackRightPhoneRef.current,
          { x: -46, rotateZ: 0, scale: 0.94 },
          { x: 0, rotateZ: 5.2, scale: 1, duration: 0.98, ease: 'back.out(1.3)' },
          0.14
        )
        .fromTo(
          [ctaLine1Ref.current, ctaLine2Ref.current],
          { clipPath: 'inset(0% 100% 0% 0%)', x: -20 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            x: 0,
            duration: 0.84,
            stagger: 0.16,
            ease: 'expo.out',
          },
          0.12
        )
        .fromTo(
          placeSealRef.current,
          { scale: 1.45, rotateZ: -18, opacity: 0 },
          { scale: 1, rotateZ: -8, opacity: 1, duration: 0.42, ease: 'back.out(2.2)' },
          0.68
        );

      // 2. Perforated torn-paper dashed trail draws across transition
      if (perforationPathRef.current) {
        const perfLen = perforationPathRef.current.getTotalLength();
        gsap.set(perforationPathRef.current, {
          strokeDasharray: '10 10',
          strokeDashoffset: perfLen * 0.35,
        });
        gsap.to(perforationPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: perforationPathRef.current,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 0.7,
          },
        });
      }

      // 3. Discreet Back to Top stamp single settle bounce near page end
      if (backToTopRef.current) {
        gsap.fromTo(
          backToTopRef.current,
          { y: 16, scale: 0.92 },
          {
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: backToTopRef.current,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleDemoEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validateDemoEmail(emailValue);
    if (!check.valid) {
      setEmailError(check.error ?? 'Please enter a valid email address.');
      setDemoPreviewAddress(null);
      return;
    }
    setEmailError(null);
    setDemoPreviewAddress(check.normalized ?? emailValue.trim());
  };

  return (
    <div ref={wrapperRef} id="download" className="relative w-full overflow-hidden">
      {/* =====================================================================
         PART A: FINAL CTA SECTION (Rebuilt from 06-final-cta-postmark-mockup)
         ===================================================================== */}
      <section
        aria-labelledby="pm-final-cta-heading"
        className="relative w-full bg-[var(--pm-paper)] pm-paper-grain pt-20 pb-24 sm:pt-28 sm:pb-28 border-t border-[var(--pm-brown)]/12"
      >
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT: Layered Two-Phone & Airmail Envelope Paper Collage */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[470px]">
              {/* Underlying Par Avion Envelope & Correspondence Sheet */}
              <div
                ref={stackEnvelopeRef}
                aria-hidden="true"
                className="absolute w-[88%] max-w-[460px] h-[340px] sm:h-[380px] bg-[#EFE4D1] border border-[var(--pm-brown)]/25 shadow-[0_18px_45px_rgba(62,41,26,0.12)] p-3 will-change-transform"
              >
                <div className="pm-airmail-band h-2.5 w-full opacity-80" />
                <div className="mt-4 flex justify-between items-start px-3">
                  <SVGStamp stampId="mountain-air" size="sm" />
                  <PostalCancellationSeal
                    topText="POSTMARK"
                    bottomText="EST. ARCHIVE"
                    centerText=""
                    className="h-16 w-16 text-[var(--pm-brown)]/45"
                  />
                </div>
                <div className="absolute bottom-3 right-4 border border-[var(--pm-brown)]/30 bg-[#DFC59E] px-3 py-1 font-ui text-[10px] font-bold tracking-[0.14em] text-[var(--pm-brown)] rotate-3">
                  TICKET · 8F77199 ★★★
                </div>
              </div>

              {/* Left Fanned Phone Print (04-feature-memory-map.webp) */}
              <div
                ref={stackLeftPhoneRef}
                className="relative z-10 -mr-6 sm:-mr-10 -mt-6 w-[48%] max-w-[235px] pm-photo-print p-2 sm:p-2.5 shadow-[0_20px_44px_rgba(37,41,44,0.18)] will-change-transform"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-ivory)]">
                  <img
                    src={POSTMARK_ASSETS.memoryMap}
                    alt="POSTMARK Memory Map mobile journal screen in travel collage"
                    width={896}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-[66%_50%]"
                  />
                </div>
              </div>

              {/* Right Overlapping Phone Print (03-feature-postcard-builder.webp) */}
              <div
                ref={stackRightPhoneRef}
                className="relative z-20 mt-8 w-[50%] max-w-[245px] pm-photo-print p-2 sm:p-2.5 shadow-[0_24px_52px_rgba(37,41,44,0.22)] will-change-transform"
              >
                <div aria-hidden="true" className="pm-washi-stripe absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-16" />
                <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-ivory)]">
                  <img
                    src={POSTMARK_ASSETS.postcardBuilder}
                    alt="POSTMARK Postcard Builder mobile app screen with coastal postcard"
                    width={896}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Closing Editorial Serif Statement, Primary Actions & Honest Illustrative Store Badges */}
            <div className="lg:col-span-6 relative">
              <h2
                id="pm-final-cta-heading"
                className="font-editorial text-[clamp(2.35rem,4.5vw,4.05rem)] font-semibold leading-[1.08] tracking-[-0.022em] text-[#3B2318]"
              >
                <span ref={ctaLine1Ref} className="block will-change-transform">
                  Your memories belong
                </span>
                <span ref={ctaLine2Ref} className="inline-flex flex-wrap items-center gap-3 will-change-transform">
                  <span>in a beautiful place.</span>
                  <span
                    ref={placeSealRef}
                    aria-hidden="true"
                    className="inline-flex text-[var(--pm-red)]"
                  >
                    <PostalCancellationSeal
                      topText="POSTMARK"
                      bottomText="KEPT FOREVER"
                      centerText="★"
                      className="h-11 w-11 sm:h-12 sm:w-12"
                    />
                  </span>
                </span>
              </h2>

              <p className="mt-5 max-w-[52ch] font-ui text-[17px] sm:text-[18px] leading-[1.62] text-[var(--pm-ink)]/85">
                Capture every ticket, every vista, and every fleeting thought. Keep a little more of everywhere you go.
              </p>

              {/* Primary Live Page Actions */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <PaperButton
                  variant="primary"
                  size="lg"
                  onClick={() => scrollToSectionById('features', '[data-builder-first-control]')}
                >
                  Explore the App
                </PaperButton>

                <PaperButton
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSectionById('journal')}
                >
                  View the Journal
                </PaperButton>
              </div>

              {/* Illustrative Store Badges (Clearly Labeled Concept / Coming Soon) */}
              <div className="mt-7 pt-5 border-t border-[var(--pm-brown)]/15">
                <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--pm-brown)]/75">
                  Mobile Concept Preview · Illustrative Store Marks (Coming Soon)
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => setActiveDisclosure('stores')}
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-lg border border-[#5A3528]/35 bg-[#3D271D] px-4 py-2 text-left text-[#FFF9EF] shadow-sm hover:bg-[#4E3327] transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3" />
                    </svg>
                    <div>
                      <span className="block font-ui text-[10px] uppercase tracking-[0.1em] text-[#F2C7A3]">
                        Concept Preview
                      </span>
                      <span className="block font-ui text-sm font-semibold leading-tight whitespace-nowrap">
                        App Store (Soon)
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDisclosure('stores')}
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-lg border border-[#5A3528]/35 bg-[#3D271D] px-4 py-2 text-left text-[#FFF9EF] shadow-sm hover:bg-[#4E3327] transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
                      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
                    </svg>
                    <div>
                      <span className="block font-ui text-[10px] uppercase tracking-[0.1em] text-[#F2C7A3]">
                        Concept Preview
                      </span>
                      <span className="block font-ui text-sm font-semibold leading-tight whitespace-nowrap">
                        Google Play (Soon)
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Decorative right-edge POSTMARK rubber stamp mark */}
              <div
                aria-hidden="true"
                className="hidden xl:block pointer-events-none absolute -right-8 bottom-0 -rotate-12 border-y-2 border-[var(--pm-ink)]/35 px-4 py-1 font-editorial text-lg tracking-[0.18em] text-[var(--pm-ink)]/35 select-none"
              >
                POSTMARK
              </div>
            </div>
          </div>

          {/* Honest Inline Disclosure Callout when Concept Links / Store Marks are clicked */}
          {activeDisclosure && (
            <div
              role="status"
              aria-live="polite"
              className="mt-10 pm-postcard-sheet p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[var(--pm-red)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-editorial text-lg font-semibold text-[var(--pm-ink)]">
                    {DISCLOSURE_COPY[activeDisclosure].title}
                  </h3>
                  <p className="mt-1 font-ui text-sm text-[var(--pm-ink)]/80 max-w-[75ch]">
                    {DISCLOSURE_COPY[activeDisclosure].body}
                  </p>
                </div>
              </div>

              <PaperButton
                variant="parchment"
                size="sm"
                onClick={() => setActiveDisclosure(null)}
              >
                Dismiss Note
              </PaperButton>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
         TORN / PERFORATED HORIZONTAL PAPER TRANSITION INTO TRUE FOOTER
         ===================================================================== */}
      <div className="relative w-full bg-[var(--pm-paper)] pt-2">
        {/* Gridded notebook tape strip on left */}
        <div
          aria-hidden="true"
          className="pm-grid-scrap absolute left-6 sm:left-14 top-0 z-20 h-7 w-32 sm:w-44 border border-[var(--pm-brown)]/15 -rotate-1 shadow-sm"
        />

        {/* Perforation dashed trail */}
        <svg
          viewBox="0 0 1440 28"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-6 w-full overflow-visible"
        >
          <path
            ref={perforationPathRef}
            d="M 0 14 Q 180 4 360 15 T 720 13 T 1080 16 T 1440 12"
            fill="none"
            stroke="rgba(90, 53, 40, 0.42)"
            strokeWidth="1.8"
          />
        </svg>

        {/* Irregular torn parchment edge */}
        <svg
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-7 sm:h-9 w-full text-[#E5D7C1] drop-shadow-[0_-3px_6px_rgba(62,41,26,0.06)]"
        >
          <path
            fill="currentColor"
            d="M0,44 L0,18 L42,24 L88,15 L136,23 L192,14 L248,22 L305,15 L364,25 L422,14 L480,22 L542,13 L602,24 L664,16 L724,23 L788,14 L848,24 L912,15 L974,23 L1038,13 L1102,22 L1168,15 L1232,24 L1296,15 L1362,22 L1412,14 L1440,19 L1440,44 Z"
          />
        </svg>
      </div>

      {/* =====================================================================
         PART B: TRUE WARM-PARCHMENT FOOTER
         ===================================================================== */}
      <footer className="relative w-full bg-[#E5D7C1] pm-paper-grain pt-10 pb-12 text-[#3B2318]">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#5A3528]/20">
            {/* Brand + Interactive Cancellation Seal */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <span className="block font-editorial text-xs tracking-[0.08em] text-[#5A3528]/85">
                  Est. {currentYear}
                </span>
                <div className="mt-1 inline-flex items-center">
                  <span className="font-editorial text-3xl sm:text-4xl font-semibold tracking-[0.03em] text-[#3B2318]">
                    POSTMARK
                  </span>
                  <span className="group -ml-2 inline-flex text-[#5A3528]/75 transition-transform duration-300 hover:rotate-6 hover:text-[var(--pm-red-deep)]">
                    <PostalCancellationSeal
                      topText="POSTMARK"
                      bottomText="KEPT STORIES"
                      centerText=""
                      accentWave
                      className="h-14 w-14"
                    />
                  </span>
                </div>
                <p className="mt-3 max-w-[34ch] font-ui text-sm leading-relaxed text-[#3B2318]/80">
                  Every journey leaves details worth keeping. Save photos, handwritten notes, and places as collectible digital postcards.
                </p>
              </div>
            </div>

            {/* 3 Link Groups: APP, EXPLORE, ABOUT */}
            <div className="md:col-span-5 grid grid-cols-3 gap-6">
              <div>
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  App
                </h3>
                <ul className="mt-3 space-y-2.5 font-ui text-sm text-[#3B2318]/85">
                  <li>
                    <a
                      href="#features"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('features');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Postcard Builder
                    </a>
                  </li>
                  <li>
                    <a
                      href="#destinations"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('destinations');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Memory Map
                    </a>
                  </li>
                  <li>
                    <a
                      href="#stamp-desk"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('stamp-desk');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Stamp Desk
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('stores');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Download Info
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  Explore
                </h3>
                <ul className="mt-3 space-y-2.5 font-ui text-sm text-[#3B2318]/85">
                  <li>
                    <a
                      href="#manifesto"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('manifesto');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Manifesto
                    </a>
                  </li>
                  <li>
                    <a
                      href="#journal"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('journal');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Filmstrip Archive
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('guide');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Journaling Guide
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  About
                </h3>
                <ul className="mt-3 space-y-2.5 font-ui text-sm text-[#3B2318]/85">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('story');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Concept Story
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('privacy');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Demo Privacy
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Honest DEMO ONLY Correspondence Dispatch Form */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  Stay in Touch
                </h3>
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                  Demo Only
                </span>
              </div>
              <p className="mt-1 font-hand text-2xl text-[#5A3528]">
                Preview our postal dispatch
              </p>

              <form onSubmit={handleDemoEmailSubmit} noValidate className="mt-2">
                <label htmlFor={emailInputId} className="sr-only">
                  Email address for demo preview
                </label>
                <div className="flex items-center gap-1.5 rounded border border-[#5A3528]/30 bg-[#F4EAD8] p-1.5 shadow-inner">
                  <input
                    id={emailInputId}
                    type="email"
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="traveler@example.com"
                    className="min-w-0 flex-1 bg-transparent px-2.5 py-2 font-ui text-sm text-[#25292C] placeholder:text-[#5A3528]/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="min-h-[38px] px-3.5 py-1.5 bg-[#CEB38C] hover:bg-[#C1A277] border border-[#5A3528]/40 font-editorial text-xs font-semibold text-[#25292C] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                  >
                    Subscribe
                  </button>
                </div>

                {emailError && (
                  <p role="alert" className="mt-2 font-ui text-xs font-medium text-[#AD4837]">
                    {emailError}
                  </p>
                )}

                {demoPreviewAddress && (
                  <p
                    role="status"
                    className="mt-2 flex items-start gap-1.5 font-ui text-xs text-[#3B2318]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--pm-teal)] shrink-0 mt-0.5" />
                    <span>
                      <strong>DEMO ONLY:</strong> Preview shown for {demoPreviewAddress}.{' '}
                      <strong>No email was sent or stored.</strong>
                    </span>
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Legal / Concept Metadata + Back to Top Stamp */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-xs text-[#3B2318]/80">
            <p>
              © {currentYear} Postmark · A fictional concept for OpenLanding. Made for travelers, by travelers.
            </p>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setActiveDisclosure('privacy')}
                className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
              >
                Demo Disclosure
              </button>

              <button
                ref={backToTopRef}
                type="button"
                onClick={() => scrollToSectionById('top')}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#5A3528]/35 bg-[#F4EAD8] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] text-[#3B2318] hover:bg-[var(--pm-ivory)] shadow-sm cursor-pointer"
              >
                <ArrowUp className="h-3.5 w-3.5 text-[var(--pm-red)]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Classic kraft photo-album mounting corners at bottom-left and bottom-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 h-7 w-7 border-b-4 border-l-4 border-[#9C7E54]/55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 border-b-4 border-r-4 border-[#9C7E54]/55"
        />
      </footer>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/HeroDesk.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  scrollToSectionById,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { PaperButton } from './PaperButton';

interface HeroDeskProps {
  introReady: boolean;
}

export const HeroDesk: React.FC<HeroDeskProps> = ({ introReady }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const eyebrowStampRef = useRef<SVGSVGElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const collageLayerRef = useRef<HTMLDivElement | null>(null);
  const routePathRef = useRef<SVGPathElement | null>(null);
  const routeGliderRef = useRef<SVGGElement | null>(null);
  const floatingMarkRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  // Intro handoff entrance choreography
  useEffect(() => {
    if (!introReady || reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Eyebrow + mini stamp impulse
      tl.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.52 },
        0
      ).fromTo(
        eyebrowStampRef.current,
        { scale: 1.32, rotateZ: -12 },
        { scale: 1, rotateZ: 0, duration: 0.42, ease: 'back.out(2.2)' },
        0.14
      );

      // Consecutive upward text clipping masks with ~130ms offset & tracking settle
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        {
          yPercent: 112,
          letterSpacing: '0.015em',
        },
        {
          yPercent: 0,
          letterSpacing: '-0.024em',
          duration: 0.84,
          stagger: 0.13,
          ease: 'power3.out',
        },
        0.08
      );

      // Supporting sentence & CTA buttons
      tl.fromTo(
        copyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        0.34
      ).fromTo(
        actionsRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.62 },
        0.44
      );

      // Scenic right-side paper collage settles from slight offset & rotation
      if (collageLayerRef.current) {
        tl.fromTo(
          collageLayerRef.current,
          { xPercent: 7, rotation: 2.5, scale: 1.045 },
          { xPercent: 0, rotation: 0, scale: 1, duration: 1.08, ease: 'expo.out' },
          0.04
        );
      }

      // Coded SVG bottom travel route draws across composition + location pin glides along it
      const routePath = routePathRef.current;
      const glider = routeGliderRef.current;
      if (routePath && glider) {
        const totalLength = routePath.getTotalLength();
        gsap.set(routePath, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        const proxy = { progress: 0 };
        const placeGlider = (p: number) => {
          const dist = Math.min(totalLength, Math.max(0, p * totalLength));
          const pt = routePath.getPointAtLength(dist);
          const ahead = routePath.getPointAtLength(Math.min(totalLength, dist + 2));
          const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
          glider.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
        };
        placeGlider(0);

        tl.to(
          routePath,
          {
            strokeDashoffset: 0,
            duration: 1.35,
            ease: 'power2.inOut',
          },
          0.32
        ).to(
          proxy,
          {
            progress: 0.86,
            duration: 1.42,
            ease: 'power2.out',
            onUpdate: () => placeGlider(proxy.progress),
          },
          0.36
        );
      }
    }, section);

    return () => ctx.revert();
  }, [introReady, reducedMotion]);

  // Scroll-driven editorial baseline split as user transitions toward Chapter 02
  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      scrollTl
        .to(
          line1Ref.current,
          { xPercent: -3.5, ease: 'none' },
          0
        )
        .to(
          line2Ref.current,
          { xPercent: 4.2, ease: 'none' },
          0
        )
        .to(
          collageLayerRef.current,
          { yPercent: 5.5, rotateZ: -0.8, ease: 'none' },
          0
        );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Subtle pointer response on lightweight independent SVG overlay only (4–8px)
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch' || prefersReducedMotionNow() || !floatingMarkRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(floatingMarkRef.current, {
      x: nx * 12,
      y: ny * 9,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      aria-labelledby="pm-hero-heading"
      className="relative w-full overflow-hidden bg-[var(--pm-hero-paper)] pm-paper-grain pt-4 pb-14 lg:min-h-[calc(100svh-78px)] lg:py-0 flex flex-col justify-center"
    >
      {/* Desktop right-aligned clean scenic composition layer (02-hero-postmark-clean.webp) */}
      <div
        ref={collageLayerRef}
        className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-[86%] xl:w-[82%] pm-hero-art-blend select-none will-change-transform"
      >
        <img
          src={POSTMARK_ASSETS.heroClean}
          alt="POSTMARK iPhone travel journal surrounded by coastal postcards, transit tickets, postage stamps, and street café prints"
          width={2752}
          height={1536}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-right"
        />
      </div>

      {/* Lightweight independent decorative postal cancellation overlay (desktop pointer-reactive) */}
      <div
        ref={floatingMarkRef}
        aria-hidden="true"
        className="hidden lg:flex pointer-events-none absolute left-[43%] top-8 z-10 items-center gap-2 text-[var(--pm-brown)]/40 select-none"
      >
        <svg viewBox="0 0 130 46" className="w-28 h-10 overflow-visible">
          <circle cx="23" cy="23" r="19" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2" />
          <text x="23" y="21" textAnchor="middle" fontSize="5.5" fontWeight="700" letterSpacing="1.2" fill="currentColor">
            PAR AVION
          </text>
          <text x="23" y="29" textAnchor="middle" fontSize="5" letterSpacing="1" fill="currentColor">
            NO. 097
          </text>
          <path d="M 46 16 Q 62 11 78 16 T 110 16" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 46 24 Q 62 19 78 24 T 110 24" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 46 32 Q 62 27 78 32 T 110 32" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12 lg:py-14">
        <div className="max-w-[620px] lg:max-w-[620px] xl:max-w-[660px]">
          {/* Eyebrow + mini perforated postage stamp icon */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 font-ui text-xs sm:text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--pm-red-deep)]"
          >
            <span>TRAVEL MEMORIES, BEAUTIFULLY KEPT</span>
            <svg
              ref={eyebrowStampRef}
              viewBox="0 0 28 24"
              className="h-5 w-6 text-[var(--pm-red-deep)] shrink-0"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="2"
                width="24"
                height="20"
                rx="1"
                fill="#FFF9EF"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeDasharray="2.2 1.6"
              />
              <rect x="5" y="5" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
              <path d="M 8 10 Q 11 8 14 10 T 20 10" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 8 14 Q 11 12 14 14 T 20 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Giant Editorial Serif Headline — Crisp 2-line lockup on desktop matching approved hero */}
          <h1
            id="pm-hero-heading"
            className="mt-4 font-editorial text-[clamp(2.35rem,4.15vw,4.15rem)] font-semibold leading-[1.05] tracking-[-0.024em] text-[var(--pm-ink)]"
          >
            <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
              <span ref={line1Ref} className="block lg:whitespace-nowrap will-change-transform">
                COLLECT PLACES.
              </span>
            </span>
            <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
              <span ref={line2Ref} className="block lg:whitespace-nowrap will-change-transform">
                KEEP STORIES.
              </span>
            </span>
          </h1>

          {/* Supporting copy */}
          <p
            ref={copyRef}
            className="mt-5 max-w-[46ch] font-ui text-[17px] sm:text-[19px] leading-[1.6] text-[var(--pm-ink)]/85"
          >
            Turn photos, notes, locations, and tiny moments into digital postcards you’ll want to revisit forever.
          </p>

          {/* Primary & Secondary Actions */}
          <div
            ref={actionsRef}
            className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
          >
            <PaperButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSectionById('features', '[data-builder-first-control]')}
            >
              Start Your Journal
            </PaperButton>

            <PaperButton
              variant="outline"
              size="lg"
              onClick={() => scrollToSectionById('manifesto')}
            >
              <span>See How It Works</span>
              <span aria-hidden="true" className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </PaperButton>
          </div>
        </div>

        {/* Mobile / Tablet Dedicated Scenic Artwork (copy first, phone + collage centered without empty left void) */}
        <div className="mt-10 lg:hidden">
          <div className="relative aspect-[5/4] sm:aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--pm-brown)]/15 bg-[var(--pm-ivory)] shadow-[0_16px_40px_rgba(75,52,35,0.12)]">
            <img
              src={POSTMARK_ASSETS.heroClean}
              alt="POSTMARK mobile travel journal surrounded by postcards, transit tickets, and postage stamps"
              width={2752}
              height={1536}
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-[86%_50%]"
            />
          </div>
        </div>
      </div>

      {/* Coded Inline SVG Travel Route across Left Negative-Space Bottom Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative lg:absolute left-0 right-0 bottom-3 z-10 mx-auto max-w-[1380px] px-6 sm:px-12 mt-5 lg:mt-0"
      >
        <div className="max-w-[540px]">
          <svg
            viewBox="0 0 620 56"
            className="h-10 sm:h-11 w-full overflow-visible"
          >
            {/* Subtle background guide */}
            <path
              d="M 8 40 C 130 14, 240 50, 365 28 C 455 12, 525 36, 598 20"
              fill="none"
              stroke="rgba(90, 53, 40, 0.16)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            {/* Animated primary route stroke */}
            <path
              ref={routePathRef}
              d="M 8 40 C 130 14, 240 50, 365 28 C 455 12, 525 36, 598 20"
              fill="none"
              stroke="#D85743"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Origin circle */}
            <circle cx="8" cy="40" r="4" fill="#FFF9EF" stroke="#D85743" strokeWidth="2" />
            {/* Gliding paper-plane / postal pin marker */}
            <g ref={routeGliderRef} transform="translate(520, 24)">
              <polygon
                points="10,0 -7,-5.5 -3.5,0 -7,5.5"
                fill="#D85743"
                stroke="#FFF9EF"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/KeepsakeManifesto.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MANIFESTO_NOTES } from '../../lib/postmark/sampleMemories';
import { ensureGsapRegistered, usePrefersReducedMotion } from '../../lib/postmark/motion';

export const KeepsakeManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statementLine1Ref = useRef<HTMLSpanElement | null>(null);
  const statementLine2Ref = useRef<HTMLSpanElement | null>(null);
  const underlinePathRef = useRef<SVGPathElement | null>(null);
  const routeSvgPathRef = useRef<SVGPathElement | null>(null);
  const paperPlaneRef = useRef<SVGGElement | null>(null);
  const noteRefs = useRef<Array<HTMLElement | null>>([]);

  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Giant statement wide paper-cut clip-path wipes coordinated to early scroll entry
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 48%',
          scrub: 0.45,
        },
      });

      headlineTl
        .fromTo(
          statementLine1Ref.current,
          { clipPath: 'inset(0% 100% 0% 0%)', x: -18 },
          { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 0.45, ease: 'power2.out' }
        )
        .fromTo(
          statementLine2Ref.current,
          { clipPath: 'inset(0% 100% 0% 0%)', x: -18 },
          { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 0.45, ease: 'power2.out' },
          '+=0.06'
        );

      // 2. Handwritten ink underline stroke beneath "moments between destinations"
      if (underlinePathRef.current) {
        const uLen = underlinePathRef.current.getTotalLength();
        gsap.set(underlinePathRef.current, { strokeDasharray: uLen, strokeDashoffset: uLen });
        gsap.to(underlinePathRef.current, {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: underlinePathRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 3. Continuous hand-drawn SVG route + interpolated paper airplane across the 3 notes
      const routePath = routeSvgPathRef.current;
      const plane = paperPlaneRef.current;
      if (routePath && plane) {
        const totalLength = routePath.getTotalLength();
        gsap.set(routePath, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        const updatePlane = (progress: number) => {
          const dist = Math.max(0, Math.min(totalLength, progress * totalLength));
          const pt = routePath.getPointAtLength(dist);
          const nextPt = routePath.getPointAtLength(Math.min(totalLength, dist + 3));
          const angle = (Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * 180) / Math.PI;
          plane.setAttribute(
            'transform',
            `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
          );
        };
        updatePlane(0);

        ScrollTrigger.create({
          trigger: section,
          start: 'top 62%',
          end: 'bottom 72%',
          scrub: 0.75,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(routePath, { strokeDashoffset: totalLength * (1 - p) });
            updatePlane(p);
          },
        });
      }

      // 4. Staggered correspondence vignettes rotate in from off-angle & unmask lines
      const initialAngles = [-5.5, 4.8, -4.4];
      const restingAngles = [-1.8, 1.5, -1.2];

      noteRefs.current.forEach((card, idx) => {
        if (!card) return;
        const textLines = card.querySelectorAll<HTMLElement>('[data-note-mask]');
        const clipPin = card.querySelector<HTMLElement>('[data-note-clip]');

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        });

        cardTl
          .fromTo(
            card,
            {
              y: 34,
              rotateZ: initialAngles[idx] ?? -4,
              scale: 0.97,
            },
            {
              y: 0,
              rotateZ: restingAngles[idx] ?? 0,
              scale: 1,
              duration: 0.78,
              ease: 'back.out(1.3)',
            },
            0
          )
          .fromTo(
            clipPin,
            { y: -12, rotateZ: -10 },
            { y: 0, rotateZ: 0, duration: 0.48, ease: 'back.out(2)' },
            0.12
          )
          .fromTo(
            textLines,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.62, stagger: 0.08, ease: 'power3.out' },
            0.1
          );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const staggerOffsets = [
    'lg:mt-0 lg:justify-self-start',
    'lg:mt-20 lg:justify-self-center',
    'lg:mt-40 lg:justify-self-end',
  ];

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="pm-manifesto-heading"
      className="relative w-full bg-[var(--pm-ivory)] pm-paper-grain pb-24 pt-16 sm:pt-24 lg:pb-32"
    >
      {/* Torn-paper irregular top edge introducing Chapter 02 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-6 sm:-top-8 z-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block h-7 sm:h-9 w-full text-[var(--pm-ivory)] drop-shadow-[0_-4px_8px_rgba(75,52,35,0.05)]"
        >
          <path
            fill="currentColor"
            d="M0,48 L0,22 L48,18 L95,26 L152,14 L214,23 L278,16 L340,25 L408,13 L472,22 L538,15 L605,26 L668,14 L735,23 L804,12 L872,24 L936,16 L1005,25 L1072,14 L1140,22 L1208,15 L1275,25 L1342,16 L1402,22 L1440,17 L1440,48 Z"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Editorial letter header */}
        <div className="max-w-[980px]">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-brown)]/80">
            01 · The Keepsake Manifesto
          </p>

          <h2
            id="pm-manifesto-heading"
            className="mt-4 font-editorial text-[clamp(2.35rem,5.4vw,4.9rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-[var(--pm-ink)]"
          >
            <span ref={statementLine1Ref} className="block will-change-transform">
              THE TRIP ENDS.
            </span>
            <span ref={statementLine2Ref} className="block text-[var(--pm-brown)] will-change-transform">
              THE STORY DOESN’T.
            </span>
          </h2>

          <p className="mt-6 max-w-[58ch] font-ui text-lg sm:text-[21px] leading-[1.62] text-[var(--pm-ink)]/85">
            A train window. A corner café. The view you almost forgot to photograph. Keep the{' '}
            <span className="relative inline-block font-medium text-[var(--pm-ink)]">
              moments between destinations.
              <svg
                viewBox="0 0 290 14"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full overflow-visible"
              >
                <path
                  ref={underlinePathRef}
                  d="M 2 9 Q 76 3 148 8 T 288 6"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>
        </div>

        {/* Staggered Diagonal Desk Spread + Continuous Pen-Drawn SVG Route */}
        <div className="relative mt-14 lg:mt-20">
          {/* Desktop SVG Route connecting Vignette 1 -> 2 -> 3 with Paper Airplane */}
          <svg
            viewBox="0 0 1200 540"
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute inset-0 h-full w-full overflow-visible z-0"
          >
            <path
              d="M 210 135 C 390 45, 455 265, 600 245 C 760 225, 835 395, 995 365"
              fill="none"
              stroke="rgba(90, 53, 40, 0.16)"
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
            <path
              ref={routeSvgPathRef}
              d="M 210 135 C 390 45, 455 265, 600 245 C 760 225, 835 395, 995 365"
              fill="none"
              stroke="#D85743"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Animated 2D Vector Paper Airplane */}
            <g ref={paperPlaneRef} transform="translate(210, 135)">
              <polygon points="16,0 -11,-9 -6,0 -11,9" fill="#D85743" />
              <polygon points="16,0 -6,0 -9,5" fill="#AD4837" />
              <line x1="-6" y1="0" x2="16" y2="0" stroke="#FFF9EF" strokeWidth="0.9" />
            </g>
          </svg>

          {/* Three Irregular Pinned Correspondence Notes */}
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 items-start">
            {MANIFESTO_NOTES.map((note, idx) => (
              <article
                key={note.id}
                ref={(el) => {
                  noteRefs.current[idx] = el;
                }}
                className={`relative w-full max-w-[390px] pm-ruled-paper border border-[var(--pm-brown)]/20 p-6 sm:p-7 shadow-[0_16px_38px_rgba(75,52,35,0.10)] will-change-transform ${staggerOffsets[idx]}`}
              >
                {/* Brass / Washi Paper Clip at top */}
                <div
                  data-note-clip
                  aria-hidden="true"
                  className="absolute -top-3.5 left-7 flex items-center gap-2"
                >
                  <div className={idx === 1 ? 'pm-washi-sage h-6 w-20 -rotate-2' : 'pm-washi-stripe h-6 w-20 rotate-2'} />
                </div>

                {/* Top metadata row (unboxed clean text with separator) */}
                <div className="mt-1 flex items-center justify-between gap-2 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                  <span>{note.kicker}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[var(--pm-brown)]/70">{note.stampCode}</span>
                </div>

                {/* Masked Headline */}
                <h3 className="mt-4 overflow-hidden font-editorial text-[22px] sm:text-[24px] font-medium leading-[1.24] text-[var(--pm-ink)]">
                  <span data-note-mask className="block">
                    {note.title}
                  </span>
                </h3>

                {/* Masked Body */}
                <div className="mt-3 overflow-hidden">
                  <p
                    data-note-mask
                    className="font-ui text-[15px] leading-[1.65] text-[var(--pm-ink)]/80"
                  >
                    {note.body}
                  </p>
                </div>

                {/* Handwritten margin annotation */}
                <div className="mt-6 pt-3 border-t border-[var(--pm-brown)]/15 flex items-center justify-between gap-3">
                  <span className="font-hand text-[21px] leading-none text-[var(--pm-brown)]">
                    “{note.handwritten}”
                  </span>
                  <svg viewBox="0 0 28 28" className="h-6 w-6 text-[var(--pm-brown)]/45 shrink-0" aria-hidden="true">
                    <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
                    <path d="M 9 14 L 13 18 L 20 10" fill="none" stroke="#D85743" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/MemoryMap.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'motion/react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import { computeCurvedRouteGeometry } from '../../lib/postmark/logic';
import {
  DESTINATION_LIST,
  DESTINATIONS,
  type DestinationId,
} from '../../lib/postmark/sampleMemories';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  scrollToSectionById,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

export const MemoryMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState<DestinationId>('kyoto');
  const [previousId, setPreviousId] = useState<DestinationId>('lisbon');
  const [ripplePinId, setRipplePinId] = useState<DestinationId | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const mapBoardRef = useRef<HTMLDivElement | null>(null);
  const activeRoutePathRef = useRef<SVGPathElement | null>(null);
  const planeMarkerRef = useRef<SVGGElement | null>(null);
  const productVignetteRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const activeDestination = DESTINATIONS[selectedId];
  const prevDestination = DESTINATIONS[previousId];

  const routeGeometry = computeCurvedRouteGeometry(
    prevDestination.mapPoint,
    activeDestination.mapPoint,
    1
  );

  // Entrance choreography for map sheet & tall product vignette
  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapBoardRef.current,
        { y: 36, rotateZ: -1.4, scale: 0.98 },
        {
          y: 0,
          rotateZ: 0,
          scale: 1,
          duration: 0.92,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapBoardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        productVignetteRef.current,
        { y: 48, rotateZ: 3.2 },
        {
          y: 0,
          rotateZ: 1.6,
          duration: 0.98,
          ease: 'back.out(1.25)',
          scrollTrigger: {
            trigger: productVignetteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Animate SVG route line & airplane flight whenever selected destination changes
  useEffect(() => {
    const pathEl = activeRoutePathRef.current;
    const planeEl = planeMarkerRef.current;
    if (!pathEl || !planeEl) return;

    if (reducedMotion) {
      const endGeom = computeCurvedRouteGeometry(
        prevDestination.mapPoint,
        activeDestination.mapPoint,
        1
      );
      pathEl.removeAttribute('stroke-dasharray');
      pathEl.removeAttribute('stroke-dashoffset');
      planeEl.setAttribute(
        'transform',
        `translate(${endGeom.point.x}, ${endGeom.point.y}) rotate(${endGeom.angleDeg})`
      );
      return;
    }

    const totalLen = pathEl.getTotalLength();
    gsap.set(pathEl, {
      strokeDasharray: totalLen,
      strokeDashoffset: totalLen,
    });

    const proxy = { t: 0 };
    const placePlane = (tVal: number) => {
      const dist = Math.max(0, Math.min(totalLen, tVal * totalLen));
      const pt = pathEl.getPointAtLength(dist);
      const ahead = pathEl.getPointAtLength(Math.min(totalLen, dist + 3));
      const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      planeEl.setAttribute(
        'transform',
        `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
      );
    };
    placePlane(0);

    const tl = gsap.timeline();
    tl.to(pathEl, {
      strokeDashoffset: 0,
      duration: 0.95,
      ease: 'power2.inOut',
    }).to(
      proxy,
      {
        t: 0.92,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => placePlane(proxy.t),
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [activeDestination.mapPoint, prevDestination.mapPoint, reducedMotion, selectedId]);

  const handleSelectCity = (cityId: DestinationId) => {
    if (cityId !== selectedId) {
      setPreviousId(selectedId);
      setSelectedId(cityId);
    }
    setRipplePinId(cityId);
    window.setTimeout(() => setRipplePinId(null), 500);
  };

  const handleMapPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || prefersReducedMotionNow() || !mapBoardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(mapBoardRef.current, {
      rotateY: nx * 3.2,
      rotateX: -ny * 2.6,
      transformPerspective: 1100,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMapPointerLeave = () => {
    if (prefersReducedMotionNow() || !mapBoardRef.current) return;
    gsap.to(mapBoardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      id="destinations"
      ref={sectionRef}
      aria-labelledby="pm-map-heading"
      className="relative w-full bg-[var(--pm-parchment)]/55 pm-paper-grain py-20 sm:py-28 border-t border-[var(--pm-brown)]/15 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        {/* Editorial Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[700px]">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-red-deep)]">
              03 · Illustrated Memory Atlas · Illustrative Demo Map
            </p>
            <MotionText
              as="h2"
              id="pm-map-heading"
              lines={['A line on a map.', 'A thousand stories around it.']}
              mode="mask-up"
              className="mt-2 font-editorial text-[clamp(2.2rem,4.4vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.022em] text-[var(--pm-ink)]"
            />
          </div>

          <div className="flex items-center gap-3">
            <PaperButton
              variant="outline"
              size="md"
              onClick={() => scrollToSectionById('journal')}
            >
              View All Memories →
            </PaperButton>
          </div>
        </div>

        {/* Oversized 2D Map Desk (65% width) + Overlapping Product Print & Unfolding Memory Drawer */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* LEFT / MAIN: Illustrated Cartographic Parchment Sheet */}
          <div className="lg:col-span-8">
            <div
              ref={mapBoardRef}
              onPointerMove={handleMapPointerMove}
              onPointerLeave={handleMapPointerLeave}
              className="relative overflow-hidden rounded-lg border border-[var(--pm-brown)]/25 bg-[#F4EAD8] p-3 sm:p-5 shadow-[0_22px_54px_rgba(62,41,26,0.14)] will-change-transform"
            >
              {/* Washi tape corners */}
              <div aria-hidden="true" className="pm-washi-stripe absolute -top-2 left-8 h-5 w-20 -rotate-3 z-20" />
              <div aria-hidden="true" className="pm-washi-sage absolute -top-2 right-10 h-5 w-20 rotate-2 z-20" />

              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--pm-brown)]/20 bg-[#EFE3CC]">
                {/* Abstract Cartographic SVG World & Route Layer */}
                <svg
                  viewBox="0 0 960 520"
                  className="h-full w-full select-none"
                  role="img"
                  aria-label="Abstract illustrated travel correspondence map linking Lisbon, Copenhagen, and Kyoto"
                >
                  {/* Subtle Sea Tint & Graticule Grid */}
                  <rect x="0" y="0" width="960" height="520" fill="#E6EEF0" opacity="0.55" />
                  <g stroke="rgba(90,53,40,0.10)" strokeWidth="1">
                    <line x1="0" y1="130" x2="960" y2="130" strokeDasharray="4 6" />
                    <line x1="0" y1="260" x2="960" y2="260" />
                    <line x1="0" y1="390" x2="960" y2="390" strokeDasharray="4 6" />
                    <line x1="240" y1="0" x2="240" y2="520" strokeDasharray="4 6" />
                    <line x1="480" y1="0" x2="480" y2="520" />
                    <line x1="720" y1="0" x2="720" y2="520" strokeDasharray="4 6" />
                  </g>

                  {/* Stylized Illustrated Parchment Landmasses */}
                  <g fill="#EFE3CC" stroke="rgba(90,53,40,0.28)" strokeWidth="1.4">
                    {/* Western Europe & Iberia */}
                    <path d="M 155 245 Q 190 215 248 225 L 315 190 Q 370 155 430 130 L 495 135 Q 525 165 505 215 L 460 250 Q 410 275 350 295 L 270 335 Q 210 350 185 320 Z" />
                    {/* Scandinavian Peninsula */}
                    <path d="M 405 72 Q 458 58 498 88 L 486 148 Q 445 162 420 138 Z" />
                    {/* Mediterranean / North Coast */}
                    <path d="M 195 368 Q 310 352 440 385 L 475 465 L 175 470 Z" opacity="0.82" />
                    {/* Eastern Continent & Japanese Archipelago */}
                    <path d="M 545 145 Q 635 120 710 175 L 705 295 Q 645 335 568 300 Z" />
                    <path d="M 718 228 Q 758 216 782 248 Q 775 295 735 322 Q 712 300 718 228 Z" />
                    <path d="M 764 176 Q 792 172 802 198 Q 782 214 764 198 Z" />
                  </g>

                  {/* Topographic Contour Whisper Lines */}
                  <path
                    d="M 210 275 Q 290 245 385 255 M 580 205 Q 640 190 685 225"
                    fill="none"
                    stroke="rgba(90,53,40,0.18)"
                    strokeWidth="1.1"
                  />

                  {/* Compass Rose bottom-left */}
                  <g transform="translate(86, 438)" opacity="0.65">
                    <circle cx="0" cy="0" r="28" fill="none" stroke="#5A3528" strokeWidth="1.2" />
                    <polygon points="0,-32 5,-6 0,-11 -5,-6" fill="#D85743" />
                    <polygon points="0,32 4,6 0,11 -4,6" fill="#5A3528" />
                    <line x1="-28" y1="0" x2="28" y2="0" stroke="#5A3528" strokeWidth="1" />
                    <text x="0" y="-36" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5A3528">
                      N
                    </text>
                  </g>

                  {/* Background Archive Network Dotted Arcs */}
                  <path
                    d="M 215 310 Q 330 185 448 158"
                    fill="none"
                    stroke="rgba(90,53,40,0.22)"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M 448 158 Q 598 145 745 278"
                    fill="none"
                    stroke="rgba(90,53,40,0.22)"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M 215 310 Q 480 180 745 278"
                    fill="none"
                    stroke="rgba(90,53,40,0.18)"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                  />

                  {/* Active Drawn Route Between Previous & Selected Destination */}
                  <path
                    ref={activeRoutePathRef}
                    d={routeGeometry.svgPath}
                    fill="none"
                    stroke="#D85743"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />

                  {/* Illustrated Plane Marker Following Active Route */}
                  <g
                    ref={planeMarkerRef}
                    transform={`translate(${routeGeometry.point.x}, ${routeGeometry.point.y}) rotate(${routeGeometry.angleDeg})`}
                  >
                    <polygon
                      points="13,0 -9,-8 -5,0 -9,8"
                      fill="#D85743"
                      stroke="#FFF9EF"
                      strokeWidth="1.2"
                    />
                  </g>
                </svg>

                {/* Real Interactive Accessible HTML Pin Buttons Positioned Over Map Coordinates */}
                {DESTINATION_LIST.map((dest) => {
                  const isSelected = dest.id === selectedId;
                  const leftPct = `${(dest.mapPoint.x / 960) * 100}%`;
                  const topPct = `${(dest.mapPoint.y / 520) * 100}%`;

                  return (
                    <button
                      key={dest.id}
                      type="button"
                      aria-label={`Select ${dest.city}, ${dest.country} memory`}
                      aria-pressed={isSelected}
                      onClick={() => handleSelectCity(dest.id)}
                      style={{ left: leftPct, top: topPct }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer z-10"
                    >
                      {/* Click ink ripple */}
                      {ripplePinId === dest.id && (
                        <span
                          aria-hidden="true"
                          className="pm-stamp-ripple-ring pointer-events-none absolute left-1/2 top-1/2 h-11 w-11 rounded-full border-2 border-[var(--pm-red)]"
                        />
                      )}

                      {/* Hover outer halo */}
                      <span
                        aria-hidden="true"
                        className={`absolute h-9 w-9 rounded-full border transition-transform duration-200 ${
                          isSelected
                            ? 'scale-110 border-[var(--pm-red)] bg-[var(--pm-red)]/15'
                            : 'scale-90 border-[var(--pm-brown)]/40 bg-transparent group-hover:scale-110'
                        }`}
                      />

                      {/* Pin core */}
                      <span
                        aria-hidden="true"
                        className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--pm-ivory)] shadow-md transition-transform duration-200 ${
                          isSelected ? 'scale-125 bg-[var(--pm-red)]' : 'bg-[var(--pm-brown)] group-hover:bg-[var(--pm-red)]'
                        }`}
                      />

                      {/* Printed place callout tag */}
                      <span
                        className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 font-ui text-[11px] font-semibold tracking-[0.04em] border shadow-sm transition-colors ${
                          isSelected
                            ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                            : 'bg-[var(--pm-ivory)]/95 text-[var(--pm-ink)] border-[var(--pm-brown)]/25'
                        }`}
                      >
                        {dest.city}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Direct Tappable City Controls Beneath Map (Mobile & Keyboard Friendly) */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Choose destination memory">
                  {DESTINATION_LIST.map((dest) => {
                    const active = dest.id === selectedId;
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleSelectCity(dest.id)}
                        className={`min-h-[42px] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[var(--pm-red)] text-[var(--pm-ivory)] border-[var(--pm-red-deep)]'
                            : 'bg-[var(--pm-ivory)] text-[var(--pm-ink)] border-[var(--pm-brown)]/25 hover:bg-[var(--pm-parchment)]'
                        }`}
                      >
                        {dest.city} · {dest.code}
                      </button>
                    );
                  })}
                </div>

                <span className="font-ui text-xs text-[var(--pm-brown)]/75">
                  Illustrative correspondence map · Not live GPS
                </span>
              </div>
            </div>

            {/* Unfolding Horizontal Postcard Note Drawer */}
            <div className="relative mt-7">
              {/* Underlying previous memory sheet slipped at subtle angle */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-y-2 -rotate-1 border border-[var(--pm-brown)]/18 bg-[var(--pm-ivory)]/75 shadow-sm"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={activeDestination.id}
                  initial={reducedMotion ? false : { clipPath: 'inset(0% 100% 0% 0%)', x: -18 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0.4, x: 12 }}
                  transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                  className="relative z-10 pm-postcard-sheet p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center"
                >
                  <div className="sm:col-span-8">
                    <div className="flex flex-wrap items-center gap-2 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                      <span>{activeDestination.city}, {activeDestination.country}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--pm-brown)]/75">{activeDestination.dateLabel}</span>
                    </div>

                    <h3 className="mt-2 font-editorial text-2xl font-semibold text-[var(--pm-ink)]">
                      {activeDestination.storyTitle}
                    </h3>

                    <p className="mt-2 font-ui text-[15px] leading-[1.62] text-[var(--pm-ink)]/82">
                      {activeDestination.storyExcerpt}
                    </p>

                    <p className="mt-3 font-hand text-[22px] text-[var(--pm-brown)]">
                      “{activeDestination.sampleNote}”
                    </p>

                    <div className="mt-3 pt-3 border-t border-[var(--pm-brown)]/12 font-ui text-xs text-[var(--pm-brown)]/80">
                      {activeDestination.detailTag} · {activeDestination.coordinatesLabel}
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex sm:flex-col items-center sm:items-end justify-between gap-3">
                    <div className="flex items-center">
                      <PostalCancellationSeal
                        topText={activeDestination.city.toUpperCase()}
                        bottomText="PINNED PLACE"
                        centerText={activeDestination.code}
                        className="h-14 w-14 text-[var(--pm-brown)]/70 -mr-3 z-10"
                      />
                      <SVGStamp stampId={activeDestination.defaultStamp} size="sm" />
                    </div>
                    <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pm-brown)]/65">
                      {activeDestination.postmarkCode}
                    </span>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Tall Overlapping Product Print Vignette (04-feature-memory-map.webp) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              ref={productVignetteRef}
              className="relative w-full max-w-[390px] pm-photo-print p-3 sm:p-4 will-change-transform"
            >
              <div aria-hidden="true" className="pm-washi-stripe absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 rotate-1 z-10" />
              <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-paper)]">
                <img
                  src={POSTMARK_ASSETS.memoryMap}
                  alt="POSTMARK Memory Map phone view showing Japan Journey pins in Kyoto with Polaroid prints and transit tickets"
                  width={896}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                <div>
                  <p className="font-editorial text-base font-semibold text-[var(--pm-ink)]">
                    Every Pin Has a Story
                  </p>
                  <p className="font-ui text-xs text-[var(--pm-brown)]/75">
                    Photos, tickets, and routes kept side by side
                  </p>
                </div>
                <span className="font-hand text-xl text-[var(--pm-red-deep)] shrink-0">
                  Kyoto ’26
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/MotionText.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ensureGsapRegistered, usePrefersReducedMotion } from '../../lib/postmark/motion';

interface MotionTextProps {
  id?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  lines: string[];
  className?: string;
  lineClassName?: string;
  mode?: 'mask-up' | 'paper-slice' | 'manual';
  delay?: number;
}

/**
 * Split-line editorial typography reveal component.
 * Uses overflow-clipped masks and subtle tracking compression rather than generic opacity fades.
 * Falls back cleanly to static visible text when reduced-motion is preferred or before JS hydrates.
 */
export const MotionText: React.FC<MotionTextProps> = ({
  id,
  as: Tag = 'h2',
  lines,
  className = '',
  lineClassName = '',
  mode = 'mask-up',
  delay = 0,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || mode === 'manual') return;
    ensureGsapRegistered();
    const el = rootRef.current;
    if (!el) return;

    const innerLines = el.querySelectorAll<HTMLElement>('[data-motion-line]');
    if (!innerLines.length) return;

    const ctx = gsap.context(() => {
      if (mode === 'mask-up') {
        gsap.fromTo(
          innerLines,
          {
            yPercent: 112,
            rotateZ: 1.1,
            letterSpacing: '0.015em',
          },
          {
            yPercent: 0,
            rotateZ: 0,
            letterSpacing: '-0.02em',
            duration: 0.86,
            stagger: 0.13,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else if (mode === 'paper-slice') {
        gsap.fromTo(
          innerLines,
          {
            clipPath: 'inset(0% 100% 0% 0%)',
            x: -18,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            x: 0,
            duration: 0.92,
            stagger: 0.16,
            delay,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, mode, reducedMotion]);

  return (
    <Tag
      id={id}
      ref={rootRef as React.RefObject<never>}
      className={`text-balance ${className}`}
    >
      {lines.map((line, index) => (
        <span
          key={`${index}-${line}`}
          className="block overflow-hidden py-[0.04em] -my-[0.04em]"
        >
          <span
            data-motion-line={index}
            className={`block will-change-transform ${lineClassName}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/PaperButton.tsx">
<![CDATA['use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotionNow } from '../../lib/postmark/motion';

export interface PaperButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'parchment' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  children: React.ReactNode;
}

export const PaperButton = React.forwardRef<HTMLButtonElement, PaperButtonProps>(
  function PaperButton(
    {
      variant = 'primary',
      size = 'md',
      magnetic = true,
      className = '',
      onClick,
      onPointerMove,
      onPointerLeave,
      children,
      type = 'button',
      ...rest
    },
    forwardedRef
  ) {
    const innerRef = useRef<HTMLButtonElement | null>(null);
    const [rippleKey, setRippleKey] = useState<number | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerMove?.(e);
      if (!magnetic || e.pointerType === 'touch' || prefersReducedMotionNow()) return;
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      gsap.to(el, {
        x: Math.max(-6, Math.min(6, relX * 5.5)),
        y: Math.max(-5, Math.min(5, relY * 4.5)),
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(e);
      const el = innerRef.current;
      if (!el || prefersReducedMotionNow()) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.32,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!prefersReducedMotionNow() && innerRef.current) {
        setRippleKey((prev) => (prev === null ? 1 : prev + 1));
        gsap.fromTo(
          innerRef.current,
          { scale: 0.965 },
          { scale: 1, duration: 0.34, ease: 'back.out(1.6)', overwrite: 'auto' }
        );
      }
      onClick?.(e);
    };

    const variantStyles: Record<NonNullable<PaperButtonProps['variant']>, string> = {
      primary:
        'bg-[var(--pm-red)] text-[#FFF9EF] border border-[var(--pm-red-deep)] hover:bg-[#C74B37] shadow-[0_6px_18px_rgba(216,87,67,0.24)]',
      outline:
        'bg-transparent text-[var(--pm-ink)] border border-[var(--pm-ink)]/75 hover:bg-[var(--pm-parchment)]/65',
      parchment:
        'bg-[var(--pm-ivory)] text-[var(--pm-brown)] border border-[var(--pm-brown)]/30 hover:bg-[var(--pm-parchment)] shadow-[0_4px_12px_rgba(75,52,35,0.08)]',
      ghost:
        'bg-transparent text-[var(--pm-brown)] border border-transparent hover:bg-[var(--pm-parchment)]/55',
    };

    const sizeStyles: Record<NonNullable<PaperButtonProps['size']>, string> = {
      sm: 'min-h-[40px] px-4 py-2 text-xs tracking-[0.06em]',
      md: 'min-h-[46px] px-6 py-2.5 text-sm tracking-[0.02em]',
      lg: 'min-h-[52px] px-7 py-3.5 text-[15px] tracking-[0.01em]',
    };

    return (
      <button
        ref={setRefs}
        type={type}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full font-ui font-medium whitespace-nowrap shrink-0 cursor-pointer select-none overflow-hidden transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...rest}
      >
        {rippleKey !== null && (
          <span
            key={rippleKey}
            aria-hidden="true"
            className="pm-stamp-ripple-ring pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-current"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
          {children}
        </span>
      </button>
    );
  }
);
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/PostcardBuilderStory.tsx">
<![CDATA['use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Check, Copy, Eye, RotateCcw } from 'lucide-react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import {
  POSTCARD_NOTE_MAX_LENGTH,
  createInitialBuilderState,
  getBuilderStageFromProgress,
  getProgressForBuilderStage,
  getRemainingNoteChars,
  sanitizePostcardNote,
  selectBuilderDestination,
  type BuilderStageIndex,
} from '../../lib/postmark/logic';
import {
  DESTINATION_LIST,
  DESTINATIONS,
  PHOTO_STYLES,
  STAMP_DEFINITIONS,
  type DestinationId,
  type PhotoStyleId,
  type StampStyleId,
} from '../../lib/postmark/sampleMemories';
import { ensureGsapRegistered, usePrefersReducedMotion } from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PaperButton } from './PaperButton';
import { PostcardPreviewDialog } from './PostcardPreviewDialog';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

const STAGE_META: ReadonlyArray<{
  index: BuilderStageIndex;
  code: string;
  shortLabel: string;
  title: string;
  subtitle: string;
}> = [
  {
    index: 0,
    code: 'STEP 01',
    shortLabel: 'Choose',
    title: 'CHOOSE A MOMENT',
    subtitle: 'Start with a photograph that takes you right back.',
  },
  {
    index: 1,
    code: 'STEP 02',
    shortLabel: 'Write',
    title: 'WRITE WHAT MATTERED',
    subtitle: 'The best travel stories fit in a few honest lines.',
  },
  {
    index: 2,
    code: 'STEP 03',
    shortLabel: 'Stamp',
    title: 'STAMP & KEEP',
    subtitle: 'Mark the place, save the feeling.',
  },
];

export const PostcardBuilderStory: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktopPinViewport, setIsDesktopPinViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 901px)').matches : true
  );

  const [builderState, setBuilderState] = useState(() => createInitialBuilderState('lisbon'));
  const [activeStage, setActiveStage] = useState<BuilderStageIndex>(0);
  const [stepCounterLabel, setStepCounterLabel] = useState<'1/3' | '2/3' | '3/3'>('1/3');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);

  const noteInputId = useId();
  const mobileNoteInputId = useId();

  const outerSectionRef = useRef<HTMLElement | null>(null);
  const pinStageRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const cardCanvasRef = useRef<HTMLDivElement | null>(null);
  const penStrokePathRef = useRef<SVGPathElement | null>(null);
  const stampDropWrapRef = useRef<HTMLDivElement | null>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isPinnedMode = isDesktopPinViewport && !reducedMotion;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 901px)');
    const update = () => setIsDesktopPinViewport(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Desktop Pinned ScrollTrigger across all 3 stages (CHOOSE -> WRITE -> STAMP)
  useEffect(() => {
    if (!isPinnedMode) {
      scrollTriggerRef.current = null;
      return;
    }

    ensureGsapRegistered();
    const pinEl = pinStageRef.current;
    if (!pinEl) return;

    const ctx = gsap.context(() => {
      if (penStrokePathRef.current) {
        const len = penStrokePathRef.current.getTotalLength();
        gsap.set(penStrokePathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      }

      const st = ScrollTrigger.create({
        trigger: pinEl,
        start: 'top top',
        end: '+=255%',
        pin: true,
        scrub: 0.55,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const metrics = getBuilderStageFromProgress(self.progress);
          setScrollProgress(self.progress);
          setActiveStage((prev) => (prev === metrics.activeStage ? prev : metrics.activeStage));
          setStepCounterLabel((prev) =>
            prev === metrics.stepCounterLabel ? prev : metrics.stepCounterLabel
          );

          // Physical paper card transformation per stage
          if (cardCanvasRef.current) {
            const angles = [-1.8, 0.9, -0.4];
            const scales = [0.985, 1, 1.015];
            gsap.to(cardCanvasRef.current, {
              rotateZ: angles[metrics.activeStage],
              scale: scales[metrics.activeStage],
              duration: 0.28,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          // Animate vector fountain-pen line during Stage 2+
          if (penStrokePathRef.current) {
            const len = penStrokePathRef.current.getTotalLength();
            const writeDraw =
              metrics.activeStage === 0
                ? 0
                : metrics.activeStage === 1
                ? Math.min(1, metrics.stageLocalProgress * 1.45)
                : 1;
            gsap.set(penStrokePathRef.current, {
              strokeDashoffset: len * (1 - writeDraw),
            });
          }
        },
      });

      scrollTriggerRef.current = st;
    }, outerSectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [isPinnedMode]);

  // Tactile stamp impulse when entering Stage 3
  useEffect(() => {
    if (reducedMotion || activeStage !== 2 || !stampDropWrapRef.current) return;
    gsap.fromTo(
      stampDropWrapRef.current,
      { scale: 1.24, rotateZ: -9 },
      { scale: 1, rotateZ: -2, duration: 0.42, ease: 'back.out(2.1)', overwrite: 'auto' }
    );
  }, [activeStage, builderState.stampStyleId, reducedMotion]);

  // Manual step selection synchronized cleanly with ScrollTrigger progress
  const goToStage = useCallback(
    (targetStage: BuilderStageIndex) => {
      setActiveStage(targetStage);
      const labels: ['1/3', '2/3', '3/3'] = ['1/3', '2/3', '3/3'];
      setStepCounterLabel(labels[targetStage]);

      const st = scrollTriggerRef.current;
      if (isPinnedMode && st) {
        const targetProgress = getProgressForBuilderStage(targetStage);
        const targetScrollY = st.start + (st.end - st.start) * targetProgress;
        window.scrollTo({
          top: targetScrollY,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [isPinnedMode, reducedMotion]
  );

  const handleSelectDestination = (destId: DestinationId) => {
    setBuilderState((prev) => selectBuilderDestination(prev, destId, true));
  };

  const handleSelectPhotoStyle = (photoStyleId: PhotoStyleId) => {
    setBuilderState((prev) => ({ ...prev, photoStyleId }));
  };

  const handleSelectStamp = (stampStyleId: StampStyleId) => {
    setBuilderState((prev) => ({ ...prev, stampStyleId }));
  };

  const handleNoteChange = (value: string) => {
    setBuilderState((prev) => ({ ...prev, note: sanitizePostcardNote(value) }));
  };

  const handleReset = () => {
    setBuilderState(createInitialBuilderState('lisbon'));
  };

  const handleCopyNote = async () => {
    const dest = DESTINATIONS[builderState.destinationId];
    const payload = `${builderState.note.trim()} — ${dest.city}, ${dest.country}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(payload);
      } else {
        const el = document.createElement('textarea');
        el.value = payload;
        el.className = 'sr-only';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopiedFeedback(true);
      window.setTimeout(() => setCopiedFeedback(false), 2200);
    } catch {
      setCopiedFeedback(true);
      window.setTimeout(() => setCopiedFeedback(false), 2200);
    }
  };

  const currentDest = DESTINATIONS[builderState.destinationId];
  const currentPhoto =
    PHOTO_STYLES.find((p) => p.id === builderState.photoStyleId) ?? PHOTO_STYLES[0];
  const remainingChars = getRemainingNoteChars(builderState.note);

  return (
    <section
      id="features"
      ref={outerSectionRef}
      aria-labelledby="pm-builder-heading"
      className="relative w-full bg-[var(--pm-paper)] pm-paper-grain border-t border-[var(--pm-brown)]/12"
    >
      {isPinnedMode ? (
        /* =====================================================================
           DESKTOP PINNED 3-STAGE PRESENTATION (CHOOSE -> WRITE -> STAMP)
           ===================================================================== */
        <div
          ref={pinStageRef}
          className="mx-auto flex min-h-screen w-full max-w-[1380px] flex-col justify-center px-8 lg:px-12 py-8"
        >
          {/* Top Chapter Header + Deterministic 1/3, 2/3, 3/3 Progress Indicator */}
          <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-[var(--pm-brown)]/15">
            <div>
              <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
                02 · Postcard Builder · Interactive Demo — No Account or Memory Saved
              </p>
              <h2
                id="pm-builder-heading"
                className="mt-1.5 font-editorial text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--pm-ink)]"
              >
                A MEMORY, MADE YOURS.
              </h2>
              <p className="mt-1 font-ui text-[16px] text-[var(--pm-ink)]/80">
                From a photo to a postcard worth sending yourself.
              </p>
            </div>

            {/* Step Counter & Prev/Next Controls */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span
                  data-testid="builder-step-counter"
                  className="block font-editorial text-2xl font-semibold tabular-nums text-[var(--pm-ink)]"
                >
                  {stepCounterLabel}
                </span>
                <span className="block font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pm-brown)]/75">
                  Scroll or Select Stage
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous builder stage"
                  disabled={activeStage === 0}
                  onClick={() => goToStage(Math.max(0, activeStage - 1) as BuilderStageIndex)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next builder stage"
                  disabled={activeStage === 2}
                  onClick={() => goToStage(Math.min(2, activeStage + 1) as BuilderStageIndex)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Asymmetric Two-Zone Workspace */}
          <div className="mt-7 grid grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* LEFT: 4:5 Scenic Builder Frame (03-feature-postcard-builder.webp) + Live Transforming Postcard */}
            <div className="col-span-6 relative flex items-center justify-center">
              {/* Supplied 4:5 Scenic Product Print Backdrop */}
              <div className="relative w-full max-w-[490px] aspect-[4/5] overflow-hidden rounded-xl border border-[var(--pm-brown)]/20 bg-[var(--pm-ivory)] shadow-[0_22px_50px_rgba(62,41,26,0.14)]">
                <img
                  src={POSTMARK_ASSETS.postcardBuilder}
                  alt="POSTMARK Postcard Builder mobile interface surrounded by Amalfi coast prints, stamps, and transit tickets"
                  width={896}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F1E8]/92 via-[#F7F1E8]/48 to-transparent" />

                {/* Live Transforming Paper Postcard Centered Over Scenic Desk */}
                <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
                  <div
                    ref={cardCanvasRef}
                    className="relative w-full max-w-[400px] pm-postcard-sheet p-4 sm:p-5 will-change-transform"
                  >
                    {/* Stage 3 Airmail Seal Strip along top edge */}
                    <div
                      className={`pm-airmail-band absolute inset-x-0 top-0 h-1.5 transition-opacity duration-300 ${
                        activeStage === 2 ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Card Top Bar: Destination Label + Stamp Slot */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
                          {STAGE_META[activeStage].code} · {currentDest.code}
                        </span>
                        <h3 className="font-editorial text-xl font-semibold text-[var(--pm-ink)]">
                          {currentDest.city}, {currentDest.country}
                        </h3>
                        <p className="font-ui text-[11px] text-[var(--pm-brown)]/75">
                          {currentDest.dateLabel}
                        </p>
                      </div>

                      {/* Upper-right Stamp Zone */}
                      <div className="relative shrink-0">
                        {activeStage >= 2 ? (
                          <div ref={stampDropWrapRef} className="relative flex items-center">
                            <PostalCancellationSeal
                              topText={currentDest.city.toUpperCase()}
                              bottomText="POSTMARK"
                              centerText={currentDest.code}
                              className="h-12 w-12 text-[var(--pm-brown)]/75 -mr-3 z-10"
                            />
                            <SVGStamp stampId={builderState.stampStyleId} size="sm" />
                          </div>
                        ) : (
                          <div className="flex h-[76px] w-[62px] flex-col items-center justify-center border border-dashed border-[var(--pm-brown)]/35 bg-[var(--pm-paper)]/65 text-center px-1">
                            <span className="font-ui text-[9px] uppercase tracking-[0.12em] text-[var(--pm-brown)]/65">
                              Stamp
                            </span>
                            <span className="font-ui text-[9px] text-[var(--pm-brown)]/50">
                              Step 03
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage 1+ Curated Photograph Mat with Corner Tabs */}
                    <div className={`relative mt-3.5 p-2 border border-[var(--pm-brown)]/15 ${currentPhoto.frameTintClass}`}>
                      {/* Four tactile photo-corner mounts */}
                      <span aria-hidden="true" className="absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[var(--pm-brown)]/50" />
                      <span aria-hidden="true" className="absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[var(--pm-brown)]/50" />
                      <span aria-hidden="true" className="absolute left-1 bottom-1 h-3 w-3 border-l-2 border-b-2 border-[var(--pm-brown)]/50" />
                      <span aria-hidden="true" className="absolute right-1 bottom-1 h-3 w-3 border-r-2 border-b-2 border-[var(--pm-brown)]/50" />

                      <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--pm-parchment)]">
                        <img
                          src={currentPhoto.assetUrl}
                          alt={`${currentDest.city} — ${currentPhoto.label}`}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className={`h-full w-full transition-transform duration-500 ${currentPhoto.cropClass}`}
                        />
                      </div>
                    </div>

                    {/* Stage 2+ Handwritten Note Lines & Vector Pen Flourish */}
                    <div
                      className={`mt-3.5 pm-ruled-paper border border-[var(--pm-brown)]/12 p-3 transition-opacity duration-300 ${
                        activeStage >= 1 ? 'opacity-100' : 'opacity-65'
                      }`}
                    >
                      <p className="font-hand text-[21px] leading-[1.28] text-[var(--pm-ink)] line-clamp-3 min-h-[54px]">
                        {builderState.note.trim() || currentDest.sampleNote}
                      </p>
                      <svg
                        viewBox="0 0 320 12"
                        className="mt-1 h-2.5 w-full overflow-visible"
                        aria-hidden="true"
                      >
                        <path
                          ref={penStrokePathRef}
                          d="M 4 8 Q 92 2 178 7 T 312 5"
                          fill="none"
                          stroke="#D85743"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Archive Pocket Strip */}
                    <div className="mt-3 flex items-center justify-between font-ui text-[11px] text-[var(--pm-brown)]/80">
                      <span>{currentDest.coordinatesLabel}</span>
                      <span className="font-semibold text-[var(--pm-red-deep)]">
                        {activeStage === 2 ? 'READY TO KEEP' : currentDest.postmarkCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: 3-Step Vertical Index + Active Stage Paper Editing Surface */}
            <div className="col-span-6 flex flex-col">
              {/* 3-Step Interactive Index Tabs */}
              <div
                role="tablist"
                aria-label="Postcard builder stages"
                className="grid grid-cols-3 gap-2.5"
              >
                {STAGE_META.map((stage) => {
                  const isCurrent = activeStage === stage.index;
                  return (
                    <button
                      key={stage.code}
                      role="tab"
                      type="button"
                      aria-selected={isCurrent}
                      onClick={() => goToStage(stage.index)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') {
                          e.preventDefault();
                          goToStage(((stage.index + 1) % 3) as BuilderStageIndex);
                        } else if (e.key === 'ArrowLeft') {
                          e.preventDefault();
                          goToStage(((stage.index + 2) % 3) as BuilderStageIndex);
                        }
                      }}
                      className={`min-h-[56px] text-left p-3 border transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] shadow-[0_8px_20px_rgba(216,87,67,0.12)]'
                          : 'bg-[var(--pm-parchment)]/45 border-[var(--pm-brown)]/18 hover:bg-[var(--pm-ivory)]/80'
                      }`}
                    >
                      <span
                        className={`block font-ui text-[10px] font-bold uppercase tracking-[0.14em] ${
                          isCurrent ? 'text-[var(--pm-red)]' : 'text-[var(--pm-brown)]/70'
                        }`}
                      >
                        {stage.code}
                      </span>
                      <span className="mt-0.5 block font-editorial text-[15px] font-semibold text-[var(--pm-ink)] whitespace-nowrap truncate">
                        {stage.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Overall Scroll Progress Hairline */}
              <div className="mt-2 h-1 w-full bg-[var(--pm-brown)]/12 overflow-hidden" aria-hidden="true">
                <div
                  className="h-full bg-[var(--pm-red)] origin-left transition-transform duration-100"
                  style={{ transform: `scaleX(${Math.max(0.06, scrollProgress)})` }}
                />
              </div>

              {/* Active Stage Detail & Interactive Controls */}
              <div className="mt-5 pm-postcard-sheet p-6 xl:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-[var(--pm-red-deep)]">
                    {STAGE_META[activeStage].code} — {STAGE_META[activeStage].title}
                  </span>
                  <span className="font-ui text-xs tabular-nums text-[var(--pm-brown)]/70">
                    Stage {activeStage + 1} of 3
                  </span>
                </div>

                <p className="mt-1.5 font-editorial text-2xl text-[var(--pm-ink)]">
                  {STAGE_META[activeStage].subtitle}
                </p>

                {/* STAGE 01 CONTROLS: Destination + Photo Style */}
                {activeStage === 0 && (
                  <div className="mt-5 space-y-5">
                    <div>
                      <span className="block font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]">
                        1. Choose Sample Destination
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {DESTINATION_LIST.map((dest, idx) => {
                          const selected = builderState.destinationId === dest.id;
                          return (
                            <button
                              key={dest.id}
                              type="button"
                              data-builder-first-control={idx === 0 ? 'true' : undefined}
                              aria-pressed={selected}
                              onClick={() => handleSelectDestination(dest.id)}
                              className={`min-h-[42px] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] border transition-colors cursor-pointer whitespace-nowrap ${
                                selected
                                  ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                                  : 'bg-[var(--pm-paper)] text-[var(--pm-ink)] border-[var(--pm-brown)]/25 hover:bg-[var(--pm-parchment)]'
                              }`}
                            >
                              {dest.city}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="block font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]">
                        2. Select Print Framing
                      </span>
                      <div className="mt-2 grid grid-cols-3 gap-2.5">
                        {PHOTO_STYLES.map((style) => {
                          const selected = builderState.photoStyleId === style.id;
                          return (
                            <button
                              key={style.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => handleSelectPhotoStyle(style.id)}
                              className={`p-2.5 text-left border transition-colors cursor-pointer ${
                                selected
                                  ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] ring-1 ring-[var(--pm-red)]'
                                  : 'bg-[var(--pm-paper)]/70 border-[var(--pm-brown)]/20 hover:bg-[var(--pm-ivory)]'
                              }`}
                            >
                              <span className="block font-ui text-xs font-semibold text-[var(--pm-ink)] truncate">
                                {style.label}
                              </span>
                              <span className="mt-0.5 block font-ui text-[11px] text-[var(--pm-brown)]/75 line-clamp-1">
                                {style.caption}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[var(--pm-brown)]/12">
                      <span className="font-ui text-xs text-[var(--pm-brown)]/75">
                        Scroll down or advance to write your note
                      </span>
                      <PaperButton variant="parchment" size="sm" onClick={() => goToStage(1)}>
                        Continue to Step 02 →
                      </PaperButton>
                    </div>
                  </div>
                )}

                {/* STAGE 02 CONTROLS: Editable Postcard Note */}
                {activeStage === 1 && (
                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={noteInputId}
                          className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]"
                        >
                          Handwritten Postcard Note ({currentDest.city})
                        </label>
                        <span className="font-ui text-xs tabular-nums text-[var(--pm-brown)]/75">
                          {remainingChars} / {POSTCARD_NOTE_MAX_LENGTH} left
                        </span>
                      </div>
                      <textarea
                        id={noteInputId}
                        rows={3}
                        maxLength={POSTCARD_NOTE_MAX_LENGTH}
                        value={builderState.note}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        placeholder="Write two or three honest sentences from the journey..."
                        className="mt-2 w-full pm-ruled-paper border border-[var(--pm-brown)]/30 p-3 font-hand text-[23px] leading-[1.32] text-[var(--pm-ink)] focus:border-[var(--pm-red)]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--pm-brown)]/12">
                      <div className="flex items-center gap-2">
                        <PaperButton variant="parchment" size="sm" onClick={handleCopyNote}>
                          {copiedFeedback ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedFeedback ? 'Copied' : 'Copy Note'}</span>
                        </PaperButton>
                        <PaperButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleNoteChange(currentDest.sampleNote)}
                        >
                          Restore Sample Line
                        </PaperButton>
                      </div>

                      <PaperButton variant="parchment" size="sm" onClick={() => goToStage(2)}>
                        Continue to Step 03 →
                      </PaperButton>
                    </div>
                  </div>
                )}

                {/* STAGE 03 CONTROLS: Stamp Choice + Preview Modal + Reset */}
                {activeStage === 2 && (
                  <div className="mt-5 space-y-5">
                    <div>
                      <span className="block font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]">
                        Select Authored Postage Stamp
                      </span>
                      <div className="mt-2.5 grid grid-cols-3 gap-3">
                        {(['coastal-crest', 'mountain-air', 'midnight-ferry'] as StampStyleId[]).map(
                          (sId) => {
                            const sDef = STAMP_DEFINITIONS[sId];
                            const selected = builderState.stampStyleId === sId;
                            return (
                              <button
                                key={sId}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => handleSelectStamp(sId)}
                                className={`flex flex-col items-center p-2.5 border transition-colors cursor-pointer ${
                                  selected
                                    ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] ring-1 ring-[var(--pm-red)]'
                                    : 'bg-[var(--pm-paper)]/75 border-[var(--pm-brown)]/20 hover:bg-[var(--pm-ivory)]'
                                }`}
                              >
                                <SVGStamp stampId={sId} size="sm" />
                                <span className="mt-2 font-ui text-xs font-semibold text-[var(--pm-ink)] whitespace-nowrap">
                                  {sDef.title}
                                </span>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--pm-brown)]/15">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <PaperButton
                          ref={previewTriggerRef}
                          variant="primary"
                          size="md"
                          onClick={() => setPreviewOpen(true)}
                        >
                          <Eye className="h-4 w-4" />
                          <span>Preview Postcard</span>
                        </PaperButton>

                        <PaperButton variant="parchment" size="md" onClick={handleCopyNote}>
                          {copiedFeedback ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          <span>{copiedFeedback ? 'Copied' : 'Copy Note'}</span>
                        </PaperButton>
                      </div>

                      <PaperButton variant="ghost" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Reset</span>
                      </PaperButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================================
           MOBILE / TABLET (<=900px) & REDUCED MOTION: ALL 3 REAL STAGES STACKED
           ===================================================================== */
        <div className="mx-auto max-w-[900px] px-5 py-16 sm:px-8">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
            02 · Postcard Builder · Interactive Demo — No Account or Memory Saved
          </p>
          <MotionText
            as="h2"
            lines={['A MEMORY, MADE YOURS.']}
            className="mt-2 font-editorial text-[clamp(2.1rem,6vw,3.2rem)] font-semibold leading-[1.06] text-[var(--pm-ink)]"
          />
          <p className="mt-2 font-ui text-base sm:text-lg text-[var(--pm-ink)]/80">
            From a photo to a postcard worth sending yourself.
          </p>

          {/* Scenic Builder Artwork */}
          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--pm-brown)]/20 bg-[var(--pm-ivory)] shadow-[0_16px_38px_rgba(62,41,26,0.12)]">
            <img
              src={POSTMARK_ASSETS.postcardBuilder}
              alt="POSTMARK Postcard Builder mobile app amidst coastal photographs and stamps"
              width={896}
              height={1200}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full max-h-[440px] object-cover object-center"
            />
          </div>

          {/* Stacked Stage 01 */}
          <div className="mt-8 pm-postcard-sheet p-5 sm:p-6">
            <div className="flex items-center justify-between font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
              <span>STEP 01 — CHOOSE A MOMENT</span>
              <span className="tabular-nums">1/3</span>
            </div>
            <p className="mt-1 font-editorial text-xl text-[var(--pm-ink)]">
              Start with a photograph that takes you right back.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DESTINATION_LIST.map((dest, idx) => (
                <button
                  key={dest.id}
                  type="button"
                  data-builder-first-control={idx === 0 ? 'true' : undefined}
                  aria-pressed={builderState.destinationId === dest.id}
                  onClick={() => handleSelectDestination(dest.id)}
                  className={`min-h-[44px] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] border cursor-pointer ${
                    builderState.destinationId === dest.id
                      ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                      : 'bg-[var(--pm-paper)] text-[var(--pm-ink)] border-[var(--pm-brown)]/25'
                  }`}
                >
                  {dest.city}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PHOTO_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={builderState.photoStyleId === style.id}
                  onClick={() => handleSelectPhotoStyle(style.id)}
                  className={`min-h-[48px] p-3 text-left border cursor-pointer ${
                    builderState.photoStyleId === style.id
                      ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)]'
                      : 'bg-[var(--pm-paper)] border-[var(--pm-brown)]/20'
                  }`}
                >
                  <span className="block font-ui text-xs font-semibold text-[var(--pm-ink)]">
                    {style.label}
                  </span>
                  <span className="block font-ui text-[11px] text-[var(--pm-brown)]/75">
                    {style.caption}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Stacked Stage 02 */}
          <div className="mt-6 pm-postcard-sheet p-5 sm:p-6">
            <div className="flex items-center justify-between font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
              <span>STEP 02 — WRITE WHAT MATTERED</span>
              <span className="tabular-nums">2/3</span>
            </div>
            <p className="mt-1 font-editorial text-xl text-[var(--pm-ink)]">
              The best travel stories fit in a few honest lines.
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={mobileNoteInputId}
                  className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--pm-brown)]"
                >
                  Postcard Note ({currentDest.city})
                </label>
                <span className="font-ui text-xs tabular-nums text-[var(--pm-brown)]/75">
                  {remainingChars} left
                </span>
              </div>
              <textarea
                id={mobileNoteInputId}
                rows={3}
                maxLength={POSTCARD_NOTE_MAX_LENGTH}
                value={builderState.note}
                onChange={(e) => handleNoteChange(e.target.value)}
                className="mt-2 w-full pm-ruled-paper border border-[var(--pm-brown)]/30 p-3 font-hand text-[23px] leading-[1.32] text-[var(--pm-ink)]"
              />
            </div>
          </div>

          {/* Stacked Stage 03 */}
          <div className="mt-6 pm-postcard-sheet p-5 sm:p-6">
            <div className="flex items-center justify-between font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
              <span>STEP 03 — STAMP & KEEP</span>
              <span className="tabular-nums">3/3</span>
            </div>
            <p className="mt-1 font-editorial text-xl text-[var(--pm-ink)]">
              Mark the place, save the feeling.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {(['coastal-crest', 'mountain-air', 'midnight-ferry'] as StampStyleId[]).map((sId) => (
                <button
                  key={sId}
                  type="button"
                  aria-pressed={builderState.stampStyleId === sId}
                  onClick={() => handleSelectStamp(sId)}
                  className={`flex flex-col items-center p-2.5 border cursor-pointer ${
                    builderState.stampStyleId === sId
                      ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)]'
                      : 'bg-[var(--pm-paper)] border-[var(--pm-brown)]/20'
                  }`}
                >
                  <SVGStamp stampId={sId} size="sm" />
                  <span className="mt-1.5 font-ui text-[11px] font-semibold text-[var(--pm-ink)] text-center">
                    {STAMP_DEFINITIONS[sId].title}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--pm-brown)]/15">
              <PaperButton
                ref={previewTriggerRef}
                variant="primary"
                size="md"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye className="h-4 w-4" />
                <span>Preview Postcard</span>
              </PaperButton>

              <PaperButton variant="parchment" size="md" onClick={handleCopyNote}>
                {copiedFeedback ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedFeedback ? 'Copied' : 'Copy Note'}</span>
              </PaperButton>

              <PaperButton variant="outline" size="md" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </PaperButton>
            </div>
          </div>
        </div>
      )}

      {/* Accessible Native Dialog Preview */}
      <PostcardPreviewDialog
        open={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
          previewTriggerRef.current?.focus();
        }}
        destinationId={builderState.destinationId}
        photoStyleId={builderState.photoStyleId}
        stampStyleId={builderState.stampStyleId}
        note={builderState.note}
        onReset={handleReset}
      />
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/PostcardPreviewDialog.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, RotateCcw, X } from 'lucide-react';
import {
  DESTINATIONS,
  PHOTO_STYLES,
  STAMP_DEFINITIONS,
  type DestinationId,
  type PhotoStyleId,
  type StampStyleId,
} from '../../lib/postmark/sampleMemories';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

interface PostcardPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  destinationId: DestinationId;
  photoStyleId: PhotoStyleId;
  stampStyleId: StampStyleId;
  note: string;
  onReset: () => void;
}

export const PostcardPreviewDialog: React.FC<PostcardPreviewDialogProps> = ({
  open,
  onClose,
  destinationId,
  photoStyleId,
  stampStyleId,
  note,
  onReset,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);

  const destination = DESTINATIONS[destinationId];
  const photoStyle = PHOTO_STYLES.find((p) => p.id === photoStyleId) ?? PHOTO_STYLES[0];
  const stampDef = STAMP_DEFINITIONS[stampStyleId];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCopyNote = async () => {
    const textToCopy = `${note.trim()} — ${destination.city}, ${destination.country} (${destination.dateLabel})`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const tempArea = document.createElement('textarea');
        tempArea.value = textToCopy;
        tempArea.setAttribute('readonly', 'true');
        tempArea.className = 'sr-only';
        document.body.appendChild(tempArea);
        tempArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempArea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="pm-preview-dialog-title"
      className="pm-dialog m-auto w-[min(94vw,820px)] max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--pm-brown)]/30 bg-[var(--pm-paper)] p-0 text-[var(--pm-ink)] shadow-[0_32px_90px_rgba(37,41,44,0.34)]"
    >
      <div className="relative p-5 sm:p-8 pm-paper-grain">
        {/* Top Airmail Accent */}
        <div className="pm-airmail-band absolute inset-x-0 top-0 h-2" aria-hidden="true" />

        {/* Header Row */}
        <div className="mt-1 flex items-start justify-between gap-4 border-b border-[var(--pm-brown)]/15 pb-4">
          <div>
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--pm-red-deep)]">
              INTERACTIVE DEMO — NO ACCOUNT OR MEMORY SAVED
            </p>
            <h2
              id="pm-preview-dialog-title"
              className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[var(--pm-ink)]"
            >
              Your Collectible Digital Postcard
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close postcard preview"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Front & Back Correspondence Card Layout */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pm-postcard-sheet p-4 sm:p-6">
          {/* Left: Selected Photo Print inside Matte Frame */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className={`relative overflow-hidden border border-[var(--pm-brown)]/20 p-2.5 ${photoStyle.frameTintClass}`}>
              <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-parchment)]">
                <img
                  src={photoStyle.assetUrl}
                  alt={`${destination.city} — ${photoStyle.label}`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full ${photoStyle.cropClass}`}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between font-ui text-[11px] text-[var(--pm-brown)]">
                <span className="font-semibold uppercase tracking-[0.1em]">{destination.city}, {destination.country}</span>
                <span>{destination.code}</span>
              </div>
            </div>
            <p className="mt-3 font-ui text-xs text-[var(--pm-ink)]/65">
              {photoStyle.label} · {destination.coordinatesLabel}
            </p>
          </div>

          {/* Right: Correspondence Side with Handwritten Note, Address Lines & Cancelled Stamp */}
          <div className="md:col-span-7 flex flex-col justify-between md:border-l md:border-[var(--pm-brown)]/20 md:pl-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-editorial text-xl tracking-[0.04em] text-[var(--pm-brown)]">
                  POST CARD
                </p>
                <p className="mt-0.5 font-ui text-xs uppercase tracking-[0.14em] text-[var(--pm-ink)]/60">
                  {destination.dateLabel} · {destination.postmarkCode}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <PostalCancellationSeal
                  topText={destination.city.toUpperCase()}
                  bottomText="KEPT MEMORY"
                  centerText={destination.code}
                  className="h-14 w-14 text-[var(--pm-brown)]/75 -mr-3 z-10"
                />
                <SVGStamp stampId={stampStyleId} size="sm" cancelled={false} />
              </div>
            </div>

            {/* Handwritten Note Surface */}
            <div className="my-5 pm-ruled-paper border border-[var(--pm-brown)]/15 p-4 min-h-[132px]">
              <p className="font-hand text-[25px] leading-[1.32] text-[var(--pm-ink)] break-words">
                {note.trim() || destination.sampleNote}
              </p>
            </div>

            {/* Stamp & Location Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--pm-brown)]/15 font-ui text-xs text-[var(--pm-brown)]">
              <span>Stamp: {stampDef.title} ({stampDef.denomination}c)</span>
              <span aria-hidden="true">·</span>
              <span>Local browser preview only</span>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <PaperButton variant="primary" size="md" onClick={handleCopyNote}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Note Copied' : 'Copy Note'}</span>
            </PaperButton>

            <PaperButton
              variant="parchment"
              size="md"
              onClick={() => {
                onReset();
              }}
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Sample</span>
            </PaperButton>
          </div>

          <PaperButton variant="outline" size="md" onClick={onClose}>
            Done
          </PaperButton>
        </div>
      </div>
    </dialog>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/PostmarkHeader.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { prefersReducedMotionNow, scrollToSectionById } from '../../lib/postmark/motion';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal } from './SVGStamp';

interface PostmarkHeaderProps {
  introReady: boolean;
}

const NAV_ITEMS = [
  { label: 'Features', targetId: 'features' },
  { label: 'Destinations', targetId: 'destinations' },
  { label: 'Journal', targetId: 'journal' },
  { label: 'Download', targetId: 'download' },
] as const;

export const PostmarkHeader: React.FC<PostmarkHeaderProps> = ({ introReady }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sealWrapRef = useRef<HTMLSpanElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!introReady || prefersReducedMotionNow() || !sealWrapRef.current) return;
    gsap.fromTo(
      sealWrapRef.current,
      { scale: 1.24, rotateZ: -14 },
      {
        scale: 1,
        rotateZ: -6,
        duration: 0.48,
        delay: 0.25,
        ease: 'back.out(2.1)',
      }
    );
  }, [introReady]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    firstMobileLinkRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSectionById(targetId);
  };

  const handlePrimaryAction = () => {
    setMobileMenuOpen(false);
    scrollToSectionById('features', '[data-builder-first-control]');
  };

  return (
    <header className="relative z-30 w-full bg-[var(--pm-hero-paper)]">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8 px-5 py-5 sm:px-8 lg:px-12">
        {/* Zone 1: Single wordmark anchor with integrated postal cancellation mark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          aria-label="POSTMARK home"
          className="group relative inline-flex items-center whitespace-nowrap shrink-0 text-[var(--pm-ink)]"
        >
          <span className="font-editorial text-[24px] sm:text-[27px] font-semibold tracking-[0.03em] leading-none">
            POSTMARK
          </span>
          <span
            ref={sealWrapRef}
            aria-hidden="true"
            className="-ml-2.5 inline-flex items-center justify-center text-[var(--pm-brown)]/75 transition-transform duration-200 group-hover:rotate-0"
          >
            <PostalCancellationSeal
              topText="POSTMARK"
              bottomText="ARCHIVE"
              centerText=""
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
          </span>
        </a>

        {/* Zone 2: Clean 4-item single-line desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 lg:gap-10 font-ui text-[15px] font-normal text-[var(--pm-ink)]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className="relative py-1 whitespace-nowrap shrink-0 text-[var(--pm-ink)]/90 hover:text-[var(--pm-red-deep)] transition-colors after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[var(--pm-red)] after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA + mobile hamburger button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <PaperButton
              variant="primary"
              size="md"
              onClick={handlePrimaryAction}
            >
              Create Your First Postcard
            </PaperButton>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="pm-mobile-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div
          id="pm-mobile-drawer"
          className="md:hidden border-t border-[var(--pm-brown)]/15 bg-[var(--pm-ivory)] px-6 py-5 shadow-[0_20px_40px_rgba(62,41,26,0.14)]"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.targetId}
                ref={idx === 0 ? firstMobileLinkRef : undefined}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="min-h-[44px] flex items-center justify-between border-b border-[var(--pm-brown)]/10 py-2 font-editorial text-lg text-[var(--pm-ink)]"
              >
                <span>{item.label}</span>
                <span aria-hidden="true" className="font-ui text-xs text-[var(--pm-red)]">
                  ↗
                </span>
              </a>
            ))}
            <div className="pt-3">
              <PaperButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={handlePrimaryAction}
              >
                Create Your First Postcard
              </PaperButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/StampDesk.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CornerDownRight, RotateCcw, Stamp } from 'lucide-react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import { isPointInPostageZone } from '../../lib/postmark/logic';
import { STAMP_DEFINITIONS, type StampStyleId } from '../../lib/postmark/sampleMemories';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PaperButton } from './PaperButton';
import { SVGStamp } from './SVGStamp';

interface DeskStampOption {
  id: string;
  stampStyle: StampStyleId;
  postmarkCity: string;
  tag: string;
  restingAngle: string;
}

const DESK_STAMPS: DeskStampOption[] = [
  {
    id: 'desk-lisbon',
    stampStyle: 'coastal-crest',
    postmarkCity: 'LISBOA · 14 OCT',
    tag: '24c Coastal Mail',
    restingAngle: '-rotate-3',
  },
  {
    id: 'desk-kyoto',
    stampStyle: 'mountain-air',
    postmarkCity: 'KYOTO · 03 NOV',
    tag: '38c Highland Post',
    restingAngle: 'rotate-2',
  },
  {
    id: 'desk-cph',
    stampStyle: 'midnight-ferry',
    postmarkCity: 'KØBENHAVN · 22 JUN',
    tag: '50c Maritime Transit',
    restingAngle: '-rotate-2',
  },
];

export const StampDesk: React.FC = () => {
  const [selectedStampId, setSelectedStampId] = useState<string>('desk-lisbon');
  const [placedStampId, setPlacedStampId] = useState<string | null>(null);
  const [cornerPeeled, setCornerPeeled] = useState<boolean>(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dropZoneHover, setDropZoneHover] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const deskStageRef = useRef<HTMLDivElement | null>(null);
  const arrowPathRef = useRef<SVGPathElement | null>(null);
  const postageZoneRef = useRef<HTMLButtonElement | null>(null);
  const placedStampWrapRef = useRef<HTMLDivElement | null>(null);
  const cancelRingRef = useRef<SVGCircleElement | null>(null);
  const cancelWavesRef = useRef<SVGPathElement | null>(null);

  const pointerStartRef = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    hasCrossedThreshold: boolean;
  } | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const selectedOption =
    DESK_STAMPS.find((s) => s.id === selectedStampId) ?? DESK_STAMPS[0];
  const placedOption =
    DESK_STAMPS.find((s) => s.id === placedStampId) ?? null;

  // Dramatic 3D perspective desk entrance + staggered stamp drops + curved handwritten arrow
  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (arrowPathRef.current) {
        const len = arrowPathRef.current.getTotalLength();
        gsap.set(arrowPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      }

      const trayItems = section.querySelectorAll<HTMLElement>('[data-desk-stamp-item]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: deskStageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        deskStageRef.current,
        {
          rotateX: 8,
          rotateZ: -1.1,
          y: 42,
          transformPerspective: 1300,
        },
        {
          rotateX: 0,
          rotateZ: 0,
          y: 0,
          duration: 0.96,
          ease: 'power3.out',
        },
        0
      )
        .fromTo(
          trayItems,
          { y: -28, scale: 1.08, rotateZ: -6 },
          {
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 0.56,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          0.22
        );

      if (arrowPathRef.current) {
        tl.to(
          arrowPathRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.78,
            ease: 'power2.out',
          },
          0.42
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Animate physical stamp impact & circular cancellation mark drawing outward on placement
  useEffect(() => {
    if (!placedStampId || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (placedStampWrapRef.current) {
        gsap.fromTo(
          placedStampWrapRef.current,
          { scale: 1.28, rotateZ: -8 },
          { scale: 1, rotateZ: -2, duration: 0.42, ease: 'back.out(2.2)' }
        );
      }

      if (cancelRingRef.current) {
        const ringLen = 2 * Math.PI * 30;
        gsap.fromTo(
          cancelRingRef.current,
          { strokeDasharray: ringLen, strokeDashoffset: ringLen },
          { strokeDashoffset: 0, duration: 0.48, delay: 0.14, ease: 'power2.out' }
        );
      }

      if (cancelWavesRef.current) {
        const waveLen = cancelWavesRef.current.getTotalLength();
        gsap.fromTo(
          cancelWavesRef.current,
          { strokeDasharray: waveLen, strokeDashoffset: waveLen },
          { strokeDashoffset: 0, duration: 0.46, delay: 0.22, ease: 'power2.out' }
        );
      }
    }, deskStageRef);

    return () => ctx.revert();
  }, [placedStampId, reducedMotion]);

  const placeStamp = (stampItemId: string) => {
    setSelectedStampId(stampItemId);
    setPlacedStampId(stampItemId);
    setDropZoneHover(false);
  };

  const handleResetDesk = () => {
    setPlacedStampId(null);
    setSelectedStampId('desk-lisbon');
    setCornerPeeled(false);
    setDraggingId(null);
    setDragOffset({ x: 0, y: 0 });
    setDropZoneHover(false);
  };

  // Pointer Events Dragging with Pointer Capture & 6px Threshold
  const handleStampPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
    stampItemId: string
  ) => {
    if (e.button !== 0) return;
    setSelectedStampId(stampItemId);
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStartRef.current = {
      id: stampItemId,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      hasCrossedThreshold: false,
    };
  };

  const handleStampPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = pointerStartRef.current;
    if (!state || state.pointerId !== e.pointerId) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (!state.hasCrossedThreshold && Math.hypot(dx, dy) > 6) {
      state.hasCrossedThreshold = true;
      setDraggingId(state.id);
    }

    if (state.hasCrossedThreshold) {
      setDragOffset({ x: dx, y: dy });
      const zoneEl = postageZoneRef.current;
      if (zoneEl) {
        const rect = zoneEl.getBoundingClientRect();
        setDropZoneHover(
          isPointInPostageZone({ x: e.clientX, y: e.clientY }, rect, 32)
        );
      }
    }
  };

  const handleStampPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = pointerStartRef.current;
    if (!state || state.pointerId !== e.pointerId) return;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (state.hasCrossedThreshold) {
      const zoneEl = postageZoneRef.current;
      if (zoneEl) {
        const rect = zoneEl.getBoundingClientRect();
        if (isPointInPostageZone({ x: e.clientX, y: e.clientY }, rect, 32)) {
          placeStamp(state.id);
        }
      }
    }

    pointerStartRef.current = null;
    setDraggingId(null);
    setDragOffset({ x: 0, y: 0 });
    setDropZoneHover(false);
  };

  return (
    <section
      id="stamp-desk"
      ref={sectionRef}
      aria-labelledby="pm-stamp-desk-heading"
      className="relative w-full bg-[var(--pm-paper)] pm-paper-grain py-20 sm:py-28 border-t border-[var(--pm-brown)]/15 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[680px]">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-red-deep)]">
              04 · The Stamp Desk · Tactile SVG Workshop (Interactive Demo)
            </p>
            <MotionText
              as="h2"
              id="pm-stamp-desk-heading"
              lines={['GIVE EVERY MEMORY ITS MARK.']}
              mode="paper-slice"
              className="mt-2 font-editorial text-[clamp(2.15rem,4.3vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.022em] text-[var(--pm-ink)]"
            />
            <p className="mt-3 font-ui text-base sm:text-lg text-[var(--pm-ink)]/80">
              Drag any vector stamp into the postage box—or select a stamp and tap the corner—to cancel it in ink.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PaperButton
              variant="primary"
              size="md"
              onClick={() => placeStamp(selectedStampId)}
            >
              <Stamp className="h-4 w-4" />
              <span>Stamp Selected ({STAMP_DEFINITIONS[selectedOption.stampStyle].denomination}c)</span>
            </PaperButton>

            <PaperButton variant="outline" size="md" onClick={handleResetDesk}>
              <RotateCcw className="h-4 w-4" />
              <span>Reset Desk</span>
            </PaperButton>
          </div>
        </div>

        {/* Top-Down Ruled Paper Workshop Surface */}
        <div
          ref={deskStageRef}
          className="relative mt-11 rounded-xl border border-[var(--pm-brown)]/25 pm-ruled-paper p-5 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(62,41,26,0.13)] will-change-transform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT TRAY: 3 Interactive Draggable & Tappable Coded SVG Stamps + Pinned Ephemera Strip */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-brown)]">
                  Postage Tray (Drag or Select)
                </span>
                <span className="font-hand text-xl text-[var(--pm-red-deep)]">
                  Pick your mark ↓
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {DESK_STAMPS.map((item) => {
                  const isSelected = selectedStampId === item.id;
                  const isBeingDragged = draggingId === item.id;
                  const def = STAMP_DEFINITIONS[item.stampStyle];

                  return (
                    <div key={item.id} data-desk-stamp-item className="flex flex-col items-center">
                      <button
                        type="button"
                        aria-label={`${def.title} (${item.tag}) — select or drag to postcard`}
                        aria-pressed={isSelected}
                        onPointerDown={(e) => handleStampPointerDown(e, item.id)}
                        onPointerMove={handleStampPointerMove}
                        onPointerUp={handleStampPointerUp}
                        onPointerCancel={handleStampPointerUp}
                        onClick={() => setSelectedStampId(item.id)}
                        style={
                          isBeingDragged
                            ? {
                                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(1.06) rotate(-4deg)`,
                                zIndex: 50,
                              }
                            : undefined
                        }
                        className={`group relative p-2 rounded-lg border touch-none cursor-grab active:cursor-grabbing transition-transform duration-200 ${
                          !isBeingDragged
                            ? `${item.restingAngle} hover:-translate-y-2 hover:-rotate-3 active:scale-95`
                            : 'shadow-2xl'
                        } ${
                          isSelected
                            ? 'bg-[var(--pm-ivory)] border-[var(--pm-red)] ring-2 ring-[var(--pm-red)]/40'
                            : 'bg-[var(--pm-ivory)]/80 border-[var(--pm-brown)]/20'
                        }`}
                      >
                        <SVGStamp stampId={item.stampStyle} size="sm" />
                      </button>
                      <span className="mt-2 font-ui text-[11px] font-semibold text-[var(--pm-ink)] text-center">
                        {def.title}
                      </span>
                      <span className="font-ui text-[10px] text-[var(--pm-brown)]/70 text-center">
                        {item.tag}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Handwritten curved SVG guide arrow toward center postcard */}
              <div className="hidden lg:flex items-center gap-3 pt-1 text-[var(--pm-red-deep)]" aria-hidden="true">
                <span className="font-hand text-xl">Drop into the postage corner</span>
                <svg viewBox="0 0 120 38" className="h-8 w-28 overflow-visible">
                  <path
                    ref={arrowPathRef}
                    d="M 4 28 Q 56 4 110 18 M 100 10 L 112 18 L 99 25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Pinned Source Ephemera Reference Sheet (05b-ephemera-stamp-sheet.webp) */}
              <div className="relative overflow-hidden border border-[var(--pm-brown)]/20 bg-white p-2.5 shadow-sm">
                <div aria-hidden="true" className="pm-washi-sage absolute -top-2 right-5 h-5 w-16 rotate-3" />
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={POSTMARK_ASSETS.ephemeraStampSheet}
                    alt="Printed collector stamp and cancellation mark reference sheet pinned to desk"
                    width={2752}
                    height={1536}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-1.5 font-ui text-[11px] text-[var(--pm-brown)]/75">
                  Printed cancellation specimen sheet · Archive Reference 05B
                </p>
              </div>
            </div>

            {/* CENTER: Interactive Correspondence Postcard with Postage Drop Zone & Corner Peel */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[470px] pm-postcard-sheet p-5 sm:p-7 overflow-hidden">
                {/* Tape corners */}
                <div aria-hidden="true" className="pm-washi-stripe absolute -top-2.5 left-6 h-5 w-20 -rotate-2" />

                {/* Postcard Header + Interactive Postage Drop Zone */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-editorial text-2xl tracking-[0.04em] text-[var(--pm-brown)]">
                      POST CARD
                    </p>
                    <p className="mt-0.5 font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pm-ink)]/65">
                      CORRESPONDENCE · VIA AIR MAIL
                    </p>

                    {/* Miniature Boarding Pass Motif */}
                    <div className="mt-3 inline-flex items-center gap-2 border border-[var(--pm-brown)]/25 bg-[var(--pm-paper)] px-2.5 py-1 font-ui text-[11px] font-semibold tracking-[0.08em] text-[var(--pm-ink)]">
                      <span>LIS → KYO</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--pm-red-deep)]">PASS 8F771</span>
                    </div>
                  </div>

                  {/* Defined Postage Drop Target Button */}
                  <button
                    ref={postageZoneRef}
                    type="button"
                    data-testid="stamp-drop-zone"
                    aria-label={
                      placedOption
                        ? `Postage zone stamped with ${STAMP_DEFINITIONS[placedOption.stampStyle].title}. Activate to stamp ${STAMP_DEFINITIONS[selectedOption.stampStyle].title}`
                        : `Empty postage zone. Activate to place ${STAMP_DEFINITIONS[selectedOption.stampStyle].title} stamp`
                    }
                    onClick={() => placeStamp(selectedStampId)}
                    className={`relative flex min-h-[124px] min-w-[104px] items-center justify-center p-2 border-2 transition-colors cursor-pointer ${
                      dropZoneHover
                        ? 'border-[var(--pm-red)] bg-[var(--pm-red)]/10 scale-105'
                        : placedOption
                        ? 'border-[var(--pm-brown)]/25 bg-[var(--pm-paper)]/45'
                        : 'border-dashed border-[var(--pm-brown)]/40 bg-[var(--pm-paper)]/65 hover:border-[var(--pm-red)]'
                    }`}
                  >
                    {placedOption ? (
                      <div ref={placedStampWrapRef} className="relative">
                        <SVGStamp stampId={placedOption.stampStyle} size="sm" />
                        {/* Animated 2D Circular Postal Cancellation Overlay */}
                        <svg
                          viewBox="0 0 130 90"
                          aria-hidden="true"
                          className="pointer-events-none absolute -left-9 -bottom-3 h-20 w-28 overflow-visible"
                        >
                          <circle
                            ref={cancelRingRef}
                            cx="42"
                            cy="45"
                            r="30"
                            fill="none"
                            stroke="#25292C"
                            strokeWidth="2"
                            opacity="0.82"
                          />
                          <circle
                            cx="42"
                            cy="45"
                            r="21"
                            fill="none"
                            stroke="#D85743"
                            strokeWidth="1.2"
                            strokeDasharray="3 2"
                            opacity="0.85"
                          />
                          <text
                            x="42"
                            y="43"
                            textAnchor="middle"
                            fontSize="7"
                            fontWeight="700"
                            letterSpacing="1.1"
                            fill="#25292C"
                          >
                            POSTMARK
                          </text>
                          <text
                            x="42"
                            y="52"
                            textAnchor="middle"
                            fontSize="6"
                            fontWeight="700"
                            fill="#D85743"
                          >
                            {placedOption.postmarkCity.split(' · ')[0]}
                          </text>
                          <path
                            ref={cancelWavesRef}
                            d="M 70 35 Q 84 29 98 35 T 126 35 M 72 45 Q 86 39 100 45 T 128 45 M 70 55 Q 84 49 98 55 T 126 55"
                            fill="none"
                            stroke="#25292C"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            opacity="0.78"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="text-center px-1">
                        <span className="block font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                          Place Stamp
                        </span>
                        <span className="mt-1 block font-ui text-[10px] text-[var(--pm-brown)]/70">
                          Click or Drop Here
                        </span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Handwritten Postcard Body */}
                <div className="mt-5 border-t border-[var(--pm-brown)]/15 pt-4">
                  <p className="font-hand text-[25px] leading-[1.32] text-[var(--pm-ink)]">
                    “Kept the harbor ferry ticket and stamped the date before boarding the night train.”
                  </p>
                  <p className="mt-2 font-ui text-xs text-[var(--pm-brown)]/75">
                    {placedOption
                      ? `Cancelled: ${placedOption.postmarkCity} · ${STAMP_DEFINITIONS[placedOption.stampStyle].title}`
                      : 'Unstamped draft · Choose a stamp to seal this memory'}
                  </p>
                </div>

                {/* Interactive Paper Corner Peel Revealing Hidden Tucked Note */}
                <div className="mt-5 pt-3 border-t border-[var(--pm-brown)]/12 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    aria-expanded={cornerPeeled}
                    onClick={() => setCornerPeeled((prev) => !prev)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 font-ui text-xs font-semibold text-[var(--pm-brown)] hover:text-[var(--pm-red-deep)] cursor-pointer"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" />
                    <span>{cornerPeeled ? 'Fold Corner Flat' : 'Peel Paper Corner'}</span>
                  </button>

                  {cornerPeeled && (
                    <span className="font-hand text-lg text-[var(--pm-red-deep)]">
                      Hidden note: Pier 4 · Sunset table #7
                    </span>
                  )}
                </div>

                {/* Visual folded corner triangle at bottom-right */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-0 right-0 h-12 w-12 origin-bottom-right border-l border-t border-[var(--pm-brown)]/25 bg-[var(--pm-parchment)] shadow-[-4px_-4px_10px_rgba(62,41,26,0.12)] transition-transform duration-300 ${
                    cornerPeeled ? 'scale-100 -translate-x-1 -translate-y-1 -rotate-6' : 'scale-0'
                  }`}
                />
              </div>
            </div>

            {/* RIGHT TRAY: Bounded Source Ephemera Collage Sheet (05a-ephemera-collage.webp) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="relative overflow-hidden border border-[var(--pm-brown)]/20 bg-[var(--pm-paper)] p-3 shadow-sm rotate-1">
                <div aria-hidden="true" className="pm-washi-stripe absolute -top-2 left-1/2 -translate-x-1/2 h-5 w-16" />
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={POSTMARK_ASSETS.ephemeraCollage}
                    alt="Travel ephemera specimen collage with vintage ticket No. 8F77189, map snippet, and coastal print"
                    width={2752}
                    height={1536}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 font-editorial text-sm font-semibold text-[var(--pm-ink)]">
                  Saved Paper Witnesses
                </p>
                <p className="mt-0.5 font-ui text-xs leading-relaxed text-[var(--pm-brown)]/80">
                  Transit stubs, luggage tags, and coastal Polaroids sit alongside your dated cancellation marks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/SVGStamp.tsx">
<![CDATA['use client';

import React, { useId } from 'react';
import { STAMP_DEFINITIONS, type StampStyleId } from '../../lib/postmark/sampleMemories';

interface SVGStampProps {
  stampId: StampStyleId;
  size?: 'sm' | 'md' | 'lg';
  cancelled?: boolean;
  cancellationLabel?: string;
  className?: string;
}

/**
 * Generates a realistic perforated postage-stamp SVG path (scalloped teeth around all 4 edges).
 */
function buildPerforatedRectPath(width: number, height: number, toothStep = 12, toothRadius = 2.9): string {
  const cols = Math.floor(width / toothStep);
  const rows = Math.floor(height / toothStep);
  const dx = width / cols;
  const dy = height / rows;
  const r = toothRadius;

  let d = `M 0 0`;

  // Top edge (left -> right)
  for (let i = 0; i < cols; i++) {
    const cx = (i + 0.5) * dx;
    const x1 = cx - r;
    const x2 = cx + r;
    const nx = (i + 1) * dx;
    d += ` L ${x1.toFixed(2)} 0 A ${r} ${r} 0 0 0 ${x2.toFixed(2)} 0 L ${nx.toFixed(2)} 0`;
  }
  // Right edge (top -> bottom)
  for (let j = 0; j < rows; j++) {
    const cy = (j + 0.5) * dy;
    const y1 = cy - r;
    const y2 = cy + r;
    const ny = (j + 1) * dy;
    d += ` L ${width} ${y1.toFixed(2)} A ${r} ${r} 0 0 0 ${width} ${y2.toFixed(2)} L ${width} ${ny.toFixed(2)}`;
  }
  // Bottom edge (right -> left)
  for (let i = cols; i > 0; i--) {
    const cx = (i - 0.5) * dx;
    const x1 = cx + r;
    const x2 = cx - r;
    const nx = (i - 1) * dx;
    d += ` L ${x1.toFixed(2)} ${height} A ${r} ${r} 0 0 0 ${x2.toFixed(2)} ${height} L ${nx.toFixed(2)} ${height}`;
  }
  // Left edge (bottom -> top)
  for (let j = rows; j > 0; j--) {
    const cy = (j - 0.5) * dy;
    const y1 = cy + r;
    const y2 = cy - r;
    const ny = (j - 1) * dy;
    d += ` L 0 ${y1.toFixed(2)} A ${r} ${r} 0 0 0 0 ${y2.toFixed(2)} L 0 ${ny.toFixed(2)}`;
  }

  d += ' Z';
  return d;
}

const STAMP_OUTER_PATH = buildPerforatedRectPath(120, 148, 12, 3.1);

export const SVGStamp: React.FC<SVGStampProps> = ({
  stampId,
  size = 'md',
  cancelled = false,
  cancellationLabel = 'POSTMARK',
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const def = STAMP_DEFINITIONS[stampId];

  const dimensions = {
    sm: 'w-[74px] h-[91px]',
    md: 'w-[104px] h-[128px]',
    lg: 'w-[126px] h-[155px]',
  }[size];

  return (
    <div className={`relative inline-block select-none ${dimensions} ${className}`}>
      <svg
        viewBox="-4 -4 128 156"
        className="h-full w-full drop-shadow-[0_6px_14px_rgba(62,41,26,0.16)] overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={`stamp-art-${uid}`}>
            <rect x="11" y="12" width="98" height="106" rx="2" />
          </clipPath>
        </defs>

        {/* Perforated paper body */}
        <path
          d={STAMP_OUTER_PATH}
          fill={def.palette.paper}
          stroke="rgba(90, 53, 40, 0.28)"
          strokeWidth="1"
        />

        {/* Inner artwork window */}
        <g clipPath={`url(#stamp-art-${uid})`}>
          {stampId === 'coastal-crest' && (
            <>
              <rect x="11" y="12" width="98" height="106" fill="#DCECF7" />
              <circle cx="82" cy="36" r="14" fill="#F4E07A" />
              {/* Distant headland */}
              <path d="M11 76 Q38 56 68 72 T109 68 L109 118 L11 118 Z" fill="#D85743" opacity="0.86" />
              {/* Sea bands */}
              <rect x="11" y="82" width="98" height="36" fill="#5E98BD" />
              <path
                d="M16 93 Q30 89 44 93 T72 93 T104 93"
                fill="none"
                stroke="#FFF9EF"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M22 104 Q36 100 50 104 T78 104 T102 104"
                fill="none"
                stroke="#FFF9EF"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Lighthouse & sail */}
              <path d="M32 46 L39 46 L42 82 L29 82 Z" fill="#FFF9EF" />
              <rect x="31" y="54" width="9" height="6" fill="#D85743" />
              <rect x="30" y="67" width="11" height="6" fill="#D85743" />
              <rect x="31" y="41" width="9" height="5" fill="#25292C" />
              <path d="M76 58 L76 80 L90 78 Z" fill="#FFF9EF" />
            </>
          )}

          {stampId === 'mountain-air' && (
            <>
              <rect x="11" y="12" width="98" height="106" fill="#E6ECE6" />
              <circle cx="40" cy="36" r="13" fill="#F2C7A3" />
              {/* Layered ridge */}
              <path d="M11 88 L46 44 L76 74 L94 54 L109 76 L109 118 L11 118 Z" fill="#77978B" />
              <path d="M46 44 L56 56 L48 54 L42 59 L37 55 Z" fill="#FFF9EF" />
              <path d="M11 96 Q52 80 109 94 L109 118 L11 118 Z" fill="#466359" />
              {/* Minimalist cedar gate */}
              <rect x="65" y="76" width="3.2" height="24" fill="#D85743" />
              <rect x="81" y="76" width="3.2" height="24" fill="#D85743" />
              <path d="M60 76 Q75 72 89 76" stroke="#D85743" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <line x1="63" y1="82" x2="86" y2="82" stroke="#D85743" strokeWidth="2.2" />
            </>
          )}

          {stampId === 'midnight-ferry' && (
            <>
              <rect x="11" y="12" width="98" height="106" fill="#F2E4CE" />
              <circle cx="78" cy="36" r="16" fill="#E8B48A" opacity="0.7" />
              {/* Canal gables */}
              <rect x="18" y="54" width="18" height="36" fill="#D85743" />
              <polygon points="18,54 27,43 36,54" fill="#AD4837" />
              <rect x="38" y="48" width="20" height="42" fill="#E3AE57" />
              <polygon points="38,48 48,38 58,48" fill="#C48F39" />
              <rect x="60" y="57" width="18" height="33" fill="#5A3528" />
              {/* Sail mast & water */}
              <line x1="88" y1="36" x2="88" y2="88" stroke="#25292C" strokeWidth="2" />
              <path d="M89 40 L103 74 L89 74 Z" fill="#FFF9EF" />
              <rect x="11" y="88" width="98" height="30" fill="#4A6B7C" />
              <path d="M18 99 Q46 94 74 99 T104 99" stroke="#F7F1E8" strokeWidth="1.5" fill="none" />
            </>
          )}

          {/* Denomination top-right */}
          <text
            x="102"
            y="27"
            textAnchor="end"
            fill={def.palette.ink}
            fontSize="12"
            fontWeight="700"
            fontFamily="Fraunces, Georgia, serif"
          >
            {def.denomination}
          </text>
        </g>

        {/* Crisp inner frame */}
        <rect
          x="11"
          y="12"
          width="98"
          height="106"
          rx="2"
          fill="none"
          stroke="rgba(37,41,44,0.22)"
          strokeWidth="1"
        />

        {/* Bottom printed caption */}
        <text
          x="60"
          y="132"
          textAnchor="middle"
          fill={def.palette.ink}
          fontSize="7.4"
          fontWeight="700"
          letterSpacing="1.4"
          fontFamily="DM Sans, sans-serif"
        >
          POSTMARK · {def.title.toUpperCase()}
        </text>

        {/* Optional circular postal cancellation mark overlapping corner */}
        {cancelled && (
          <g transform="translate(86, 102) rotate(-14)" className="pm-cancellation-group">
            <circle
              cx="0"
              cy="0"
              r="26"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.5"
              opacity="0.82"
            />
            <circle
              cx="0"
              cy="0"
              r="18"
              fill="none"
              stroke="#25292C"
              strokeWidth="1"
              strokeDasharray="3 2"
              opacity="0.72"
            />
            <text
              x="0"
              y="-2"
              textAnchor="middle"
              fill="#25292C"
              fontSize="6.2"
              fontWeight="700"
              letterSpacing="1.2"
              fontFamily="DM Sans, sans-serif"
            >
              {cancellationLabel}
            </text>
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fill="#D85743"
              fontSize="5.6"
              fontWeight="700"
              letterSpacing="0.9"
              fontFamily="DM Sans, sans-serif"
            >
              KEPT MAIL
            </text>
            <path
              d="M 22 -8 Q 34 -13 46 -8 T 70 -8"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.35"
              opacity="0.72"
            />
            <path
              d="M 23 0 Q 35 -5 47 0 T 71 0"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.35"
              opacity="0.72"
            />
            <path
              d="M 22 8 Q 34 3 46 8 T 70 8"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.35"
              opacity="0.72"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Standalone circular vintage postal cancellation mark SVG used in headers, transitions, and seals.
 */
export const PostalCancellationSeal: React.FC<{
  topText?: string;
  bottomText?: string;
  centerText?: string;
  className?: string;
  accentWave?: boolean;
}> = ({
  topText = 'POSTMARK',
  bottomText = 'TRAVEL ARCHIVE',
  centerText = 'EST.',
  className = 'w-12 h-12',
  accentWave = false,
}) => {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <path id={`top-arc-${id}`} d="M 16,50 A 34,34 0 1,1 84,50" />
        <path id={`bot-arc-${id}`} d="M 84,50 A 34,34 0 1,1 16,50" />
      </defs>
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2.1" opacity="0.82" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.68" />
      <text fontSize="8.5" fontWeight="700" letterSpacing="2.1" fill="currentColor" fontFamily="DM Sans, sans-serif">
        <textPath href={`#top-arc-${id}`} startOffset="50%" textAnchor="middle">
          {topText}
        </textPath>
      </text>
      <text fontSize="7.4" fontWeight="600" letterSpacing="1.8" fill="currentColor" fontFamily="DM Sans, sans-serif">
        <textPath href={`#bot-arc-${id}`} startOffset="50%" textAnchor="middle">
          {bottomText}
        </textPath>
      </text>
      {/* Wavy cancellation lines inside center */}
      <path d="M 30 45 Q 40 40 50 45 T 70 45" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
      <path d="M 28 51 Q 39 46 50 51 T 72 51" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
      <path d="M 30 57 Q 40 52 50 57 T 70 57" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
      {centerText && (
        <text
          x="50"
          y="39"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="1.2"
          fill="currentColor"
          opacity="0.75"
        >
          {centerText}
        </text>
      )}
      {accentWave && (
        <g opacity="0.7" className="pm-seal-waves">
          <path d="M 88 38 Q 104 31 120 38 T 152 38" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 90 48 Q 106 41 122 48 T 154 48" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 88 58 Q 104 51 120 58 T 152 58" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </g>
      )}
    </svg>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/components/postmark/TravelFilmstrip.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { FILMSTRIP_VIGNETTES } from '../../lib/postmark/sampleMemories';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

export const TravelFilmstrip: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 960px)').matches : true
  );

  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [spotlight, setSpotlight] = useState<{ id: string; x: number; y: number } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackViewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const baselineRouteRef = useRef<SVGPathElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const isPinnedHorizontal = isDesktopViewport && !reducedMotion;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 960px)');
    const onChange = () => setIsDesktopViewport(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Desktop short pinned horizontal gallery matched to exact track overflow + full final-card dwell
  useEffect(() => {
    if (!isPinnedHorizontal) {
      scrollTriggerRef.current = null;
      return;
    }

    ensureGsapRegistered();
    const pinEl = pinWrapRef.current;
    const viewportEl = trackViewportRef.current;
    const trackEl = trackRef.current;
    if (!pinEl || !viewportEl || !trackEl) return;

    const ctx = gsap.context(() => {
      const getMaxShift = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);

      if (baselineRouteRef.current) {
        const len = baselineRouteRef.current.getTotalLength();
        gsap.set(baselineRouteRef.current, { strokeDasharray: len, strokeDashoffset: len * 0.75 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${Math.max(900, getMaxShift() + 420)}`,
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(
              FILMSTRIP_VIGNETTES.length - 1,
              Math.floor(p * FILMSTRIP_VIGNETTES.length * 0.999)
            );
            setActiveIndex((prev) => (prev === idx ? prev : idx));

            if (baselineRouteRef.current) {
              const len = baselineRouteRef.current.getTotalLength();
              gsap.set(baselineRouteRef.current, {
                strokeDashoffset: len * (1 - Math.max(0.2, p)),
              });
            }
          },
        },
      });

      // Brief entrance hold -> full horizontal sweep -> sustained final-item dwell before release
      tl.to(trackEl, { x: 0, duration: 0.08, ease: 'none' })
        .to(trackEl, {
          x: () => -getMaxShift(),
          duration: 0.74,
          ease: 'none',
        })
        .to(trackEl, {
          x: () => -getMaxShift(),
          duration: 0.18,
          ease: 'none',
        });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;
    }, sectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [isPinnedHorizontal]);

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navigateToCard = (targetIdx: number) => {
    const clamped = Math.max(0, Math.min(FILMSTRIP_VIGNETTES.length - 1, targetIdx));
    setActiveIndex(clamped);

    if (isPinnedHorizontal && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const ratio =
        FILMSTRIP_VIGNETTES.length > 1
          ? 0.08 + (clamped / (FILMSTRIP_VIGNETTES.length - 1)) * 0.76
          : 0;
      const targetY = st.start + (st.end - st.start) * ratio;
      window.scrollTo({
        top: targetY,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
      return;
    }

    const viewportEl = trackViewportRef.current;
    const cardEls = viewportEl?.querySelectorAll<HTMLElement>('[data-filmstrip-card]');
    const card = cardEls?.[clamped];
    if (card && viewportEl) {
      viewportEl.scrollTo({
        left: card.offsetLeft - 20,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section
      id="journal"
      ref={sectionRef}
      aria-labelledby="pm-filmstrip-heading"
      className="relative w-full bg-[var(--pm-ivory)] pm-paper-grain border-t border-[var(--pm-brown)]/15 overflow-hidden"
    >
      <div
        ref={pinWrapRef}
        className={`mx-auto flex w-full max-w-[1440px] flex-col justify-center ${
          isPinnedHorizontal ? 'min-h-screen py-8' : 'py-20 sm:py-24'
        }`}
      >
        {/* Header + Controls */}
        <div className="px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-red-deep)]">
              05 · Archival Travel Filmstrip · A Collection of Somewhere
            </p>
            <MotionText
              as="h2"
              id="pm-filmstrip-heading"
              lines={['Every postcard is a way back.']}
              mode="mask-up"
              className="mt-2 font-editorial text-[clamp(2.15rem,4.2vw,3.65rem)] font-semibold leading-[1.06] tracking-[-0.022em] text-[var(--pm-ink)]"
            />
            <p className="mt-2 font-ui text-base sm:text-lg text-[var(--pm-ink)]/80">
              Build a collection worth opening years from now. Turn any print over to read the back.
            </p>
          </div>

          {/* Explicit Card Index & Arrow Navigation */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 mr-2" role="group" aria-label="Jump to archival postcard">
              {FILMSTRIP_VIGNETTES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`View postcard ${idx + 1}: ${item.title}`}
                  aria-pressed={activeIndex === idx}
                  onClick={() => navigateToCard(idx)}
                  className={`min-h-[38px] min-w-[38px] px-2.5 font-ui text-xs font-semibold tabular-nums border transition-colors cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                      : 'bg-[var(--pm-paper)] text-[var(--pm-brown)] border-[var(--pm-brown)]/20 hover:bg-[var(--pm-parchment)]'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-label="Previous archival postcard"
              disabled={activeIndex === 0}
              onClick={() => navigateToCard(activeIndex - 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-paper)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next archival postcard"
              disabled={activeIndex === FILMSTRIP_VIGNETTES.length - 1}
              onClick={() => navigateToCard(activeIndex + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-paper)] text-[var(--pm-ink)] hover:bg-[var(--pm-parchment)] disabled:opacity-40 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filmstrip Track */}
        <div
          ref={trackViewportRef}
          className={`mt-9 px-5 sm:px-8 lg:px-12 ${
            isPinnedHorizontal
              ? 'overflow-visible'
              : 'flex overflow-x-auto snap-x snap-mandatory pb-6 gap-6'
          }`}
        >
          <div
            ref={trackRef}
            className={`flex gap-6 sm:gap-8 items-stretch will-change-transform ${
              isPinnedHorizontal ? 'w-max pr-16' : 'w-max'
            }`}
          >
            {FILMSTRIP_VIGNETTES.map((vignette) => {
              const isFlipped = Boolean(flippedIds[vignette.id]);
              const isSpotlit = spotlight?.id === vignette.id;

              return (
                <article
                  key={vignette.id}
                  data-filmstrip-card={vignette.id}
                  onPointerMove={(e) => {
                    if (e.pointerType === 'touch' || prefersReducedMotionNow()) return;
                    const r = e.currentTarget.getBoundingClientRect();
                    setSpotlight({
                      id: vignette.id,
                      x: e.clientX - r.left,
                      y: e.clientY - r.top,
                    });
                  }}
                  onPointerLeave={() => setSpotlight(null)}
                  className={`snap-center shrink-0 w-[85vw] sm:w-[430px] lg:w-[460px] pm-flip-scene ${vignette.tiltClass}`}
                >
                  <div
                    className={`pm-flip-inner min-h-[450px] sm:min-h-[470px] ${
                      isFlipped ? 'is-flipped' : ''
                    }`}
                  >
                    {/* ================= FRONT OF POSTCARD PRINT ================= */}
                    <div className="pm-flip-face absolute inset-0 pm-photo-print p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
                      {/* Optional subtle warm pointer light on active card */}
                      {isSpotlit && spotlight && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 z-10 opacity-35"
                          style={{
                            background: `radial-gradient(260px circle at ${spotlight.x}px ${spotlight.y}px, rgba(244, 224, 122, 0.35), transparent 70%)`,
                          }}
                        />
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2 font-ui text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--pm-red-deep)]">
                          <span>{vignette.indexLabel}</span>
                          <span className="text-[var(--pm-brown)]/70">{vignette.postmarkNumber}</span>
                        </div>

                        {/* Cropped Portion of Supplied Production Imagery */}
                        <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden border border-[var(--pm-brown)]/20 bg-[var(--pm-parchment)]">
                          <img
                            src={vignette.assetUrl}
                            alt={`${vignette.indexLabel} — ${vignette.placeLabel}`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className={`h-full w-full ${vignette.cropClass}`}
                          />
                        </div>

                        <h3 className="mt-4 font-editorial text-[22px] sm:text-2xl font-semibold leading-[1.2] text-[var(--pm-ink)]">
                          {vignette.title}
                        </h3>

                        <p className="mt-2 font-ui text-sm leading-[1.6] text-[var(--pm-ink)]/80">
                          {vignette.frontCaption}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[var(--pm-brown)]/15 flex items-center justify-between gap-3 relative z-20">
                        <span className="font-ui text-xs text-[var(--pm-brown)]/80 truncate">
                          {vignette.placeLabel}
                        </span>

                        <button
                          type="button"
                          aria-pressed={isFlipped}
                          onClick={() => toggleFlip(vignette.id)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--pm-brown)]/30 bg-[var(--pm-paper)] hover:bg-[var(--pm-parchment)] font-ui text-xs font-semibold uppercase tracking-[0.08em] text-[var(--pm-ink)] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5 text-[var(--pm-red)]" />
                          <span>Turn Over</span>
                        </button>
                      </div>
                    </div>

                    {/* ================= WRITABLE BACKSIDE OF POSTCARD ================= */}
                    <div className="pm-flip-back absolute inset-0 pm-postcard-sheet p-5 sm:p-6 flex flex-col justify-between">
                      <div className="pm-airmail-band absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />

                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-editorial text-lg font-semibold text-[var(--pm-brown)]">
                              CORRESPONDENCE SIDE
                            </p>
                            <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--pm-ink)]/65">
                              {vignette.dateLabel}
                            </p>
                          </div>

                          <div className="flex items-center shrink-0">
                            <PostalCancellationSeal
                              topText="POSTMARK"
                              bottomText="ARCHIVED"
                              centerText=""
                              className="h-12 w-12 text-[var(--pm-brown)]/70 -mr-2.5 z-10"
                            />
                            <SVGStamp stampId={vignette.stampId} size="sm" />
                          </div>
                        </div>

                        <div className="mt-4 pm-ruled-paper border border-[var(--pm-brown)]/15 p-4">
                          <p className="font-hand text-[24px] leading-[1.3] text-[var(--pm-ink)]">
                            “{vignette.backHandwriting}”
                          </p>
                        </div>

                        <p className="mt-4 font-ui text-sm leading-[1.6] text-[var(--pm-ink)]/80">
                          {vignette.backStory}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[var(--pm-brown)]/15 flex items-center justify-between gap-3">
                        <span className="font-ui text-xs text-[var(--pm-brown)]/75">
                          {vignette.postmarkNumber}
                        </span>

                        <button
                          type="button"
                          aria-pressed={isFlipped}
                          onClick={() => toggleFlip(vignette.id)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--pm-ink)] bg-[var(--pm-ink)] text-[var(--pm-ivory)] font-ui text-xs font-semibold uppercase tracking-[0.08em] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>Turn Back</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Continuous Baseline SVG Postal Route & Active Stamp Index */}
        <div className="mt-6 px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <span className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pm-brown)] whitespace-nowrap tabular-nums">
              Print 0{activeIndex + 1} / 0{FILMSTRIP_VIGNETTES.length}
            </span>
            <svg viewBox="0 0 900 18" className="h-4 w-full overflow-visible" aria-hidden="true">
              <line
                x1="0"
                y1="9"
                x2="900"
                y2="9"
                stroke="rgba(90, 53, 40, 0.16)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <path
                ref={baselineRouteRef}
                d="M 0 9 L 900 9"
                fill="none"
                stroke="#D85743"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(postmark)/postmark/lib/postmark/assets.ts">
<![CDATA[export const POSTMARK_ASSETS = {
  /** Production clean hero composition: phone + paper collage over warm negative space */
  heroClean: '/templates/postmark/postmark/02-hero-postmark-clean.webp',
  /** Production 4:5 postcard builder interface phone amidst photo/postcard collage */
  postcardBuilder: '/templates/postmark/postmark/03-feature-postcard-builder.webp',
  /** Production 4:5 memory map/journal phone with layered travel memories */
  memoryMap: '/templates/postmark/postmark/04-feature-memory-map.webp',
  /** Opaque flat ephemera sheet: tickets, maps, postcard, photoprint snippets */
  ephemeraCollage: '/templates/postmark/postmark/05a-ephemera-collage.webp',
  /** Opaque flat ephemera sheet: stamps, labels, tickets, postal marks */
  ephemeraStampSheet: '/templates/postmark/postmark/05b-ephemera-stamp-sheet.webp',
} as const;

export type PostmarkAssetKey = keyof typeof POSTMARK_ASSETS;
]]>
    </file>
    <file path="src/app/(postmark)/postmark/lib/postmark/logic.ts">
<![CDATA[import {
  DESTINATIONS,
  type DestinationId,
  type PhotoStyleId,
  type StampStyleId,
} from './sampleMemories';

export const POSTCARD_NOTE_MAX_LENGTH = 180;

export type BuilderStageIndex = 0 | 1 | 2;

export interface BuilderStageMetrics {
  activeStage: BuilderStageIndex;
  /** 1-indexed label: "1/3", "2/3", "3/3" */
  stepCounterLabel: '1/3' | '2/3' | '3/3';
  /** Normalized progress within the current stage's dwell window [0..1] */
  stageLocalProgress: number;
  /** Individual visibility weights [0..1] for stages 0, 1, 2 */
  stageWeights: [number, number, number];
}

export interface PostcardBuilderState {
  destinationId: DestinationId;
  photoStyleId: PhotoStyleId;
  stampStyleId: StampStyleId;
  note: string;
}

export interface RectBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Deterministic scroll progress mapping for Chapter 03 (Postcard Builder).
 * Honors required plateaus:
 * - 0.00–0.30: Stage 1 (index 0) active & dwelling
 * - 0.30–0.33: Transition 1 -> 2
 * - 0.33–0.64: Stage 2 (index 1) active & dwelling
 * - 0.64–0.67: Transition 2 -> 3
 * - 0.67–1.00: Stage 3 (index 2) active & held through release
 */
export function getBuilderStageFromProgress(rawProgress: number): BuilderStageMetrics {
  const p = clamp01(rawProgress);

  let activeStage: BuilderStageIndex = 0;
  let stageLocalProgress = 0;
  let w0 = 0;
  let w1 = 0;
  let w2 = 0;

  if (p < 0.30) {
    activeStage = 0;
    stageLocalProgress = clamp01(p / 0.30);
    w0 = 1;
    w1 = 0;
    w2 = 0;
  } else if (p < 0.33) {
    const t = (p - 0.30) / 0.03;
    activeStage = t >= 0.5 ? 1 : 0;
    stageLocalProgress = t >= 0.5 ? 0 : 1;
    w0 = 1 - t;
    w1 = t;
    w2 = 0;
  } else if (p < 0.64) {
    activeStage = 1;
    stageLocalProgress = clamp01((p - 0.33) / 0.31);
    w0 = 0;
    w1 = 1;
    w2 = 0;
  } else if (p < 0.67) {
    const t = (p - 0.64) / 0.03;
    activeStage = t >= 0.5 ? 2 : 1;
    stageLocalProgress = t >= 0.5 ? 0 : 1;
    w0 = 0;
    w1 = 1 - t;
    w2 = t;
  } else {
    activeStage = 2;
    stageLocalProgress = clamp01((p - 0.67) / 0.29);
    w0 = 0;
    w1 = 0;
    w2 = 1;
  }

  const labels: ['1/3', '2/3', '3/3'] = ['1/3', '2/3', '3/3'];

  return {
    activeStage,
    stepCounterLabel: labels[activeStage],
    stageLocalProgress,
    stageWeights: [
      Number(w0.toFixed(4)),
      Number(w1.toFixed(4)),
      Number(w2.toFixed(4)),
    ],
  };
}

/**
 * Maps a manual step selection (0, 1, 2) to the center of its scroll dwell plateau.
 */
export function getProgressForBuilderStage(stage: BuilderStageIndex): number {
  switch (stage) {
    case 0:
      return 0.14;
    case 1:
      return 0.48;
    case 2:
      return 0.84;
  }
}

export function sanitizePostcardNote(input: string): string {
  const normalized = input.replace(/\r\n/g, '\n');
  if (normalized.length <= POSTCARD_NOTE_MAX_LENGTH) {
    return normalized;
  }
  return normalized.slice(0, POSTCARD_NOTE_MAX_LENGTH);
}

export function getRemainingNoteChars(note: string): number {
  return Math.max(0, POSTCARD_NOTE_MAX_LENGTH - note.length);
}

export function createInitialBuilderState(
  destinationId: DestinationId = 'lisbon'
): PostcardBuilderState {
  const dest = DESTINATIONS[destinationId];
  return {
    destinationId: dest.id,
    photoStyleId: dest.defaultPhotoStyle,
    stampStyleId: dest.defaultStamp,
    note: dest.sampleNote,
  };
}

export function selectBuilderDestination(
  prev: PostcardBuilderState,
  destinationId: DestinationId,
  preserveCustomNote = false
): PostcardBuilderState {
  const nextDest = DESTINATIONS[destinationId];
  const prevDefaultNote = DESTINATIONS[prev.destinationId].sampleNote;
  const isUnmodifiedSample = prev.note.trim() === prevDefaultNote.trim() || prev.note.trim() === '';

  return {
    destinationId: nextDest.id,
    photoStyleId: nextDest.defaultPhotoStyle,
    stampStyleId: nextDest.defaultStamp,
    note: preserveCustomNote && !isUnmodifiedSample ? prev.note : nextDest.sampleNote,
  };
}

/**
 * Checks whether a pointer release point lands inside (or within generous magnet tolerance of)
 * the postcard postage zone on the Stamp Desk.
 */
export function isPointInPostageZone(
  point: { x: number; y: number },
  zone: RectBounds,
  magnetMarginPx = 28
): boolean {
  return (
    point.x >= zone.left - magnetMarginPx &&
    point.x <= zone.right + magnetMarginPx &&
    point.y >= zone.top - magnetMarginPx &&
    point.y <= zone.bottom + magnetMarginPx
  );
}

/**
 * Computes quadratic Bezier midpoint & tangent angle for an illustrated postal flight arc
 * between two 2D SVG map coordinates.
 */
export function computeCurvedRouteGeometry(
  from: { x: number; y: number },
  to: { x: number; y: number },
  t: number
): {
  svgPath: string;
  point: { x: number; y: number };
  angleDeg: number;
} {
  const clampedT = clamp01(t);
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  const archLift = Math.min(115, Math.max(42, dist * 0.24));

  const ctrlX = midX;
  const ctrlY = midY - archLift;

  const oneMinusT = 1 - clampedT;
  const px =
    oneMinusT * oneMinusT * from.x +
    2 * oneMinusT * clampedT * ctrlX +
    clampedT * clampedT * to.x;
  const py =
    oneMinusT * oneMinusT * from.y +
    2 * oneMinusT * clampedT * ctrlY +
    clampedT * clampedT * to.y;

  const tx = 2 * oneMinusT * (ctrlX - from.x) + 2 * clampedT * (to.x - ctrlX);
  const ty = 2 * oneMinusT * (ctrlY - from.y) + 2 * clampedT * (to.y - ctrlY);
  const angleDeg = (Math.atan2(ty, tx) * 180) / Math.PI;

  const svgPath = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;

  return {
    svgPath,
    point: { x: Number(px.toFixed(2)), y: Number(py.toFixed(2)) },
    angleDeg: Number(angleDeg.toFixed(2)),
  };
}

export function validateDemoEmail(rawEmail: string): {
  valid: boolean;
  error?: string;
  normalized?: string;
} {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter an email address to preview the postal dispatch.' };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmed)) {
    return { valid: false, error: 'Enter a valid address format (for example, traveler@example.com).' };
  }
  return { valid: true, normalized: trimmed.toLowerCase() };
}
]]>
    </file>
    <file path="src/app/(postmark)/postmark/lib/postmark/motion.ts">
<![CDATA[import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isGsapRegistered = false;

export function ensureGsapRegistered(): void {
  if (!isGsapRegistered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    isGsapRegistered = true;
  }
}

export function prefersReducedMotionNow(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function shouldSkipEntryIntro(): boolean {
  if (typeof window === 'undefined') return true;
  if (prefersReducedMotionNow()) return true;
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1' || params.get('skipIntro') === '1';
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotionNow());

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduced(mq.matches);
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}

export function scrollToSectionById(sectionId: string, focusSelector?: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(sectionId);
  if (!el) return;
  const reduced = prefersReducedMotionNow();
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  if (focusSelector) {
    window.setTimeout(
      () => {
        const focusEl = el.querySelector<HTMLElement>(focusSelector);
        focusEl?.focus({ preventScroll: true });
      },
      reduced ? 30 : 520
    );
  }
}
]]>
    </file>
    <file path="src/app/(postmark)/postmark/lib/postmark/sampleMemories.ts">
<![CDATA[import { POSTMARK_ASSETS } from './assets';

export type DestinationId = 'lisbon' | 'kyoto' | 'copenhagen';
export type PhotoStyleId = 'harbor-sun' | 'old-town-laneway' | 'morning-transit';
export type StampStyleId = 'coastal-crest' | 'mountain-air' | 'midnight-ferry';

export interface DestinationMemory {
  id: DestinationId;
  code: string;
  city: string;
  country: string;
  coordinatesLabel: string;
  dateLabel: string;
  postmarkCode: string;
  sampleNote: string;
  storyTitle: string;
  storyExcerpt: string;
  detailTag: string;
  mapPoint: { x: number; y: number };
  defaultPhotoStyle: PhotoStyleId;
  defaultStamp: StampStyleId;
}

export interface PhotoStyleOption {
  id: PhotoStyleId;
  label: string;
  caption: string;
  assetUrl: string;
  cropClass: string;
  frameTintClass: string;
}

export interface StampDefinition {
  id: StampStyleId;
  title: string;
  subtitle: string;
  denomination: string;
  palette: {
    paper: string;
    primary: string;
    secondary: string;
    accent: string;
    ink: string;
  };
}

export interface FilmstripVignette {
  id: string;
  indexLabel: string;
  title: string;
  placeLabel: string;
  dateLabel: string;
  postmarkNumber: string;
  frontCaption: string;
  backHandwriting: string;
  backStory: string;
  assetUrl: string;
  cropClass: string;
  tiltClass: string;
  stampId: StampStyleId;
}

export const DESTINATIONS: Record<DestinationId, DestinationMemory> = {
  lisbon: {
    id: 'lisbon',
    code: 'LIS',
    city: 'Lisbon',
    country: 'Portugal',
    coordinatesLabel: 'Alfama · Miradouro de Santa Luzia',
    dateLabel: '14 OCT · LATE AFTERNOON',
    postmarkCode: 'PM-LIS-014',
    sampleNote: 'The light on the harbor made us stay a little longer. Two coffees turned into sunset over terracotta roofs.',
    storyTitle: 'Terracotta Light Above the Tagus',
    storyExcerpt:
      'Tram 28 rattled past the tiled wall just as the estuary turned copper. We tucked the paper ferry receipt right behind the photograph.',
    detailTag: 'Ferry stub · Tile terrace · Espresso #2',
    mapPoint: { x: 215, y: 310 },
    defaultPhotoStyle: 'harbor-sun',
    defaultStamp: 'coastal-crest',
  },
  kyoto: {
    id: 'kyoto',
    code: 'KYO',
    city: 'Kyoto',
    country: 'Japan',
    coordinatesLabel: 'Higashiyama · Philosopher’s Path',
    dateLabel: '03 NOV · EARLY MORNING',
    postmarkCode: 'PM-KYO-089',
    sampleNote: 'Quiet wooden storefronts before the lanterns came down. Cedar rain on stone steps and warm roasted tea.',
    storyTitle: 'Lantern Mist on Stone Lanes',
    storyExcerpt:
      'Before seven in the morning, the alley sounded only like bicycles and rain dripping off cedar eaves into moss basins.',
    detailTag: 'Local rail ticket · Cedar stamp · Hojicha',
    mapPoint: { x: 745, y: 278 },
    defaultPhotoStyle: 'old-town-laneway',
    defaultStamp: 'mountain-air',
  },
  copenhagen: {
    id: 'copenhagen',
    code: 'CPH',
    city: 'Copenhagen',
    country: 'Denmark',
    coordinatesLabel: 'Christianshavn · South Canal',
    dateLabel: '22 JUN · NORTHERN DUSK',
    postmarkCode: 'PM-CPH-042',
    sampleNote: 'Ten p.m. and the sky still held pale apricot light. Bicycles lined the bridge while sailboats rocked below.',
    storyTitle: 'Long Dusk Along the Canal',
    storyExcerpt:
      'Cardamom buns in a brown paper bag, salt wind off the harbor bath, and timber masts clinking softly until midnight.',
    detailTag: 'Harbor ferry pass · Bakery bag · 22:15 sky',
    mapPoint: { x: 448, y: 158 },
    defaultPhotoStyle: 'morning-transit',
    defaultStamp: 'midnight-ferry',
  },
};

export const DESTINATION_LIST: DestinationMemory[] = [
  DESTINATIONS.lisbon,
  DESTINATIONS.kyoto,
  DESTINATIONS.copenhagen,
];

export const PHOTO_STYLES: PhotoStyleOption[] = [
  {
    id: 'harbor-sun',
    label: 'Harbor Overlook',
    caption: 'Warm coastal print · Matte ivory border',
    assetUrl: POSTMARK_ASSETS.postcardBuilder,
    cropClass: 'pm-crop-harbor',
    frameTintClass: 'pm-tint-warm',
  },
  {
    id: 'old-town-laneway',
    label: 'Quiet Timber Street',
    caption: 'Morning lantern walk · Archival silver tone',
    assetUrl: POSTMARK_ASSETS.memoryMap,
    cropClass: 'pm-crop-kyoto-lane',
    frameTintClass: 'pm-tint-parchment',
  },
  {
    id: 'morning-transit',
    label: 'Corner Café Terrace',
    caption: 'Streetlight table · Sunlit linen stock',
    assetUrl: POSTMARK_ASSETS.heroClean,
    cropClass: 'pm-crop-cafe',
    frameTintClass: 'pm-tint-peach',
  },
];

export const STAMP_DEFINITIONS: Record<StampStyleId, StampDefinition> = {
  'coastal-crest': {
    id: 'coastal-crest',
    title: 'Atlantic Harbor',
    subtitle: 'PAR AVION · COASTAL MAIL',
    denomination: '24',
    palette: {
      paper: '#FFF8EC',
      primary: '#D85743',
      secondary: '#8FC3E6',
      accent: '#F4E07A',
      ink: '#25292C',
    },
  },
  'mountain-air': {
    id: 'mountain-air',
    title: 'Cedar & Ridge',
    subtitle: 'POSTMARK · HIGHLAND ROUTE',
    denomination: '38',
    palette: {
      paper: '#F7F1E8',
      primary: '#77978B',
      secondary: '#5A3528',
      accent: '#D85743',
      ink: '#25292C',
    },
  },
  'midnight-ferry': {
    id: 'midnight-ferry',
    title: 'Northern Crossing',
    subtitle: 'TRANSIT · MARITIME POST',
    denomination: '50',
    palette: {
      paper: '#FFF9EF',
      primary: '#5A3528',
      secondary: '#D8BD96',
      accent: '#D85743',
      ink: '#25292C',
    },
  },
};

export const DESK_EXTRA_STAMPS: Array<{
  id: string;
  stampStyle: StampStyleId;
  label: string;
  originCode: string;
}> = [
  { id: 'stamp-coastal', stampStyle: 'coastal-crest', label: 'Harbor Post · 24c', originCode: 'LIS · 14 OCT' },
  { id: 'stamp-mountain', stampStyle: 'mountain-air', label: 'Highland Cedar · 38c', originCode: 'KYO · 03 NOV' },
  { id: 'stamp-ferry', stampStyle: 'midnight-ferry', label: 'Canal Ferry · 50c', originCode: 'CPH · 22 JUN' },
];

export const FILMSTRIP_VIGNETTES: FilmstripVignette[] = [
  {
    id: 'harbor',
    indexLabel: '01 / THE HARBOR',
    title: 'Salt air and late sun on painted stone.',
    placeLabel: 'Coastal Overlook · Mediterranean & Atlantic',
    dateLabel: 'OCTOBER 14 · 17:40',
    postmarkNumber: 'ARCHIVE NO. 014',
    frontCaption: 'We meant to stay ten minutes at the sea wall and watched three ferries cross instead.',
    backHandwriting: 'Wait for the golden hour by the lower quay—everything turns apricot.',
    backStory:
      'Tucked inside this card: two espresso receipts, the folded harbor timetable, and the sound of gulls echoing off sun-warmed plaster.',
    assetUrl: POSTMARK_ASSETS.ephemeraCollage,
    cropClass: 'pm-film-crop-harbor',
    tiltClass: 'pm-tilt-neg-1',
    stampId: 'coastal-crest',
  },
  {
    id: 'quiet-street',
    indexLabel: '02 / THE QUIET STREET',
    title: 'Wooden eaves before the city wakes.',
    placeLabel: 'Gion & Higashiyama · Kyoto',
    dateLabel: 'NOVEMBER 03 · 06:50',
    postmarkNumber: 'ARCHIVE NO. 089',
    frontCaption: 'Rain-dark flagstones and the smell of roasted tea drifting from a half-open lattice door.',
    backHandwriting: 'Walk north past the small bridge before 7am. Not a single crowd in sight.',
    backStory:
      'Recorded on damp notebook paper under a station awning while waiting for the local train toward Kurama.',
    assetUrl: POSTMARK_ASSETS.memoryMap,
    cropClass: 'pm-film-crop-street',
    tiltClass: 'pm-tilt-pos-1',
    stampId: 'mountain-air',
  },
  {
    id: 'long-way-home',
    indexLabel: '03 / THE LONG WAY HOME',
    title: 'Sidewalk tables and unhurried detours.',
    placeLabel: 'Bairro Alto · Old Quarter',
    dateLabel: 'OCTOBER 16 · 15:15',
    postmarkNumber: 'ARCHIVE NO. 019',
    frontCaption: 'Every wrong turn led to wrought-iron balconies, striped awnings, and another conversation.',
    backHandwriting: 'Never take the shortest street back to the station.',
    backStory:
      'A candid print snapped from across the lane just before the afternoon tram bell cleared the corner.',
    assetUrl: POSTMARK_ASSETS.postcardBuilder,
    cropClass: 'pm-film-crop-cafe',
    tiltClass: 'pm-tilt-neg-2',
    stampId: 'midnight-ferry',
  },
  {
    id: 'place-to-return',
    indexLabel: '04 / A PLACE TO RETURN TO',
    title: 'Tickets, stamps, and ink that outlast the flight.',
    placeLabel: 'Correspondence Folder · Kept Collection',
    dateLabel: 'COLLECTED · YEAR ROUND',
    postmarkNumber: 'ARCHIVE NO. 104',
    frontCaption: 'Long after luggage tags fade, a dated postmark remembers exactly how the afternoon felt.',
    backHandwriting: 'Saved for the next trip—and for opening ten winters from now.',
    backStory:
      'Every journey gathers small paper witnesses: transit stubs, hand-stamped passes, and three honest sentences written on the train.',
    assetUrl: POSTMARK_ASSETS.ephemeraStampSheet,
    cropClass: 'pm-film-crop-stamps',
    tiltClass: 'pm-tilt-pos-2',
    stampId: 'coastal-crest',
  },
];

export const MANIFESTO_NOTES = [
  {
    id: 'the-place',
    kicker: '01 · THE PLACE',
    title: 'Not the landmark—the bench twenty steps past it.',
    body: 'Pin the exact corner where the sea breeze met the bakery door, with coordinates kept gently out of the way until you want them.',
    handwritten: 'Corner of Rua da Saudade, 4:45pm',
    stampCode: 'LAT 38.71° N',
  },
  {
    id: 'the-feeling',
    kicker: '02 · THE FEELING',
    title: 'Three honest sentences while the memory is still warm.',
    body: 'Camera rolls bury moments under thousands of duplicates. A postcard asks only for the single frame and the words you would tell a friend.',
    handwritten: 'Still warm from the sun',
    stampCode: 'KEPT IN INK',
  },
  {
    id: 'the-detail',
    kicker: '03 · THE LITTLE DETAIL',
    title: 'Ferry stubs, cancellation marks, and the weather that day.',
    body: 'Pair every photograph with tactile postal stamps, transit labels, and date cancellations that turn fleeting snapshots into keepsakes.',
    handwritten: 'Carimbo · 14 Outubro',
    stampCode: 'PAR AVION',
  },
] as const;
]]>
    </file>
  </files>
</template>

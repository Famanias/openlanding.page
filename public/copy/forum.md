<template slug="forum" name="FORUM">
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
    <file path="src/app/(forum)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Doto, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./forum/forum.css";

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-forum-doto",
  axes: ["ROND"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-forum-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-forum-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORUM — Revenue Intelligence System",
  description: "One intelligent system for your contacts, conversations, pipeline, and next move. An OpenLanding interactive product concept.",
  openGraph: {
    title: "FORUM — Revenue Intelligence System",
    description: "One intelligent system for your contacts, conversations, pipeline, and next move. An OpenLanding interactive product concept.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171814",
};

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${doto.variable} ${ibmPlexMono.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-[#0E100C] text-[#F6F3EA] antialiased selection:bg-[#B9B28A] selection:text-[#0E100C]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(forum)/forum/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(forum)/forum/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/forum";

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
        className={`forum-placeholder ${className ?? ""}`}
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
    <file path="src/app/(forum)/forum/forum.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --forum-ink: #171814;
  --forum-black: #0E100C;
  --forum-khaki: #B9B28A;
  --forum-khaki-dark: #8C876B;
  --forum-ivory: #F6F3EA;
  --forum-pale: #D7D1B8;
  --forum-line: rgba(185, 178, 138, 0.38);
  --forum-line-subtle: rgba(185, 178, 138, 0.18);
  --forum-ink-line: rgba(23, 24, 20, 0.24);
  --font-doto: var(--font-forum-doto), 'Doto', 'IBM Plex Mono', 'Courier New', monospace;
  --font-mono: var(--font-forum-mono), 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-sans: var(--font-forum-sans), var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

@layer base {
  html {
    background-color: var(--forum-black);
    color: var(--forum-ivory);
    font-family: var(--font-doto);
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

.font-doto {
  font-family: var(--font-doto);
  font-variation-settings: "ROND" 0;
}

.font-doto-hero {
  font-family: var(--font-doto);
  font-weight: 850;
  font-variation-settings: "ROND" 10;
  letter-spacing: -0.02em;
}

.font-doto-display {
  font-family: var(--font-doto);
  font-weight: 800;
  font-variation-settings: "ROND" 5;
  letter-spacing: -0.015em;
}

.font-doto-ui {
  font-family: var(--font-doto);
  font-weight: 700;
  font-variation-settings: "ROND" 0;
  letter-spacing: 0.04em;
}

.font-doto-body {
  font-family: var(--font-doto);
  font-weight: 500;
  font-variation-settings: "ROND" 15;
}

.font-mono-tech {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.font-prose-support {
  font-family: var(--font-sans);
}

/* Registration Crosshair Marks */
.reg-cross {
  position: relative;
  width: 11px;
  height: 11px;
  display: inline-block;
  pointer-events: none;
  flex-shrink: 0;
}

.reg-cross::before,
.reg-cross::after {
  content: '';
  position: absolute;
  background-color: currentColor;
}

.reg-cross::before {
  top: 5px;
  left: 0;
  width: 11px;
  height: 1px;
}

.reg-cross::after {
  top: 0;
  left: 5px;
  width: 1px;
  height: 11px;
}

/* Subtle dithered architectural surface pattern */
.dither-grid-dark {
  background-image: radial-gradient(rgba(185, 178, 138, 0.14) 1px, transparent 0);
  background-size: 16px 16px;
}

.dither-grid-ivory {
  background-image: radial-gradient(rgba(23, 24, 20, 0.16) 1px, transparent 0);
  background-size: 16px 16px;
}
]]>
    </file>
    <file path="src/app/(forum)/forum/ForumApp.tsx">
<![CDATA['use client';
import { ForumPage } from './components/forum/ForumPage';

export default function ForumApp() {
  return <ForumPage />;
}
]]>
    </file>
    <file path="src/app/(forum)/forum/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#171814" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#B9B28A" text-anchor="middle">F</text>
</svg>
]]>
    </file>
    <file path="src/app/(forum)/forum/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FORUM — Revenue Intelligence System";

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
          backgroundColor: "#171814",
          color: "#B9B28A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>FORUM</span>
          <span style={{ color: "#8C876B" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            FORUM — Revenue Intelligence System
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            One intelligent system for your contacts, conversations, pipeline, and next move. An OpenLanding interactive product concept.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#8C876B" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(forum)/forum/page.tsx">
<![CDATA["use client";

import ForumApp from "./ForumApp";

export default function ForumPage() {
  return <ForumApp />;
}
]]>
    </file>
    <file path="src/app/(forum)/forum/hooks/useReducedMotion.ts">
<![CDATA[import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
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
      setReducedMotion(event.matches);
    };

    setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
]]>
    </file>
    <file path="src/app/(forum)/forum/hooks/useSectionSpy.ts">
<![CDATA[import { useState, useEffect } from 'react';

export function useSectionSpy(sectionIds: string[], defaultId = 'top'): string {
  const [activeId, setActiveId] = useState<string>(defaultId);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.05, 0.2, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, defaultId]);

  return activeId;
}
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/AccessibleDialog.tsx">
<![CDATA['use client';
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AccessibleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}

export const AccessibleDialog: React.FC<AccessibleDialogProps> = ({
  isOpen,
  onClose,
  title,
  kicker = 'SYSTEM SPECIFICATION',
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const timer = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 20);
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }
        if (e.key === 'Tab' && dialogRef.current) {
          const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#0E100C]/85 backdrop-blur-xs"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="forum-dialog-title"
            initial={
              reducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, y: 14, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl border border-[#B9B28A]/60 bg-[#171814] text-[#F6F3EA] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Architectural corner crosses */}
            <div className="flex items-center justify-between border-b border-[#B9B28A]/35 px-5 py-3.5 bg-[#0E100C]">
              <div className="flex items-center gap-2.5">
                <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
                <span className="font-mono-tech text-xs tracking-[0.14em] text-[#B9B28A] uppercase">
                  {kicker}
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex items-center gap-1.5 border border-[#B9B28A]/40 px-2.5 py-1 font-doto-ui text-xs text-[#D7D1B8] uppercase hover:border-[#F6F3EA] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
              >
                <span>ESC</span>
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h2
                id="forum-dialog-title"
                className="font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight mb-4"
              >
                {title}
              </h2>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/FeatureGallery.tsx">
<![CDATA['use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FORUM_ASSETS } from '../../lib/forum/assets';
import { SignalFilterCategory } from '../../lib/forum/demoData';
import { scrollToSectionId } from '../../lib/forum/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { FeaturePlate, FeaturePlateItem } from './FeaturePlate';
import { AccessibleDialog } from './AccessibleDialog';
import { MagneticButton } from './MagneticButton';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export const FEATURE_PLATES: FeaturePlateItem[] = [
  {
    id: 'signal-capture',
    number: '01',
    title: 'SIGNAL CAPTURE',
    description: 'Bring meaningful activity and contact context into focus.',
    asset: FORUM_ASSETS.cardSignalObservatory,
    demoCategory: 'CONTACT',
    architectureNote: 'OBSERVATORY DISH // 4:5',
    capabilities: [
      'Consolidates fragmented contact touchpoints, thread replies, and stakeholder visits into a single timeline.',
      'Filters out automated calendar noise so only substantive relationship shifts register.',
      'Preserves full source provenance across every account interaction record.',
    ],
  },
  {
    id: 'pattern-mapping',
    number: '02',
    title: 'PATTERN MAPPING',
    description: 'See relationships between interactions, opportunities, and momentum.',
    asset: FORUM_ASSETS.cardNetworkField,
    demoCategory: 'PIPELINE',
    architectureNote: 'CONVERGENCE FIELD // 4:5',
    capabilities: [
      'Links multi-threaded stakeholder conversations directly to active pipeline evaluation stages.',
      'Surfaces stalled validation steps when decision owners or mutual timelines are missing.',
      'Visualizes cross-account momentum without manual spreadsheet reconciliation.',
    ],
  },
  {
    id: 'decision-support',
    number: '03',
    title: 'DECISION SUPPORT',
    description: 'Make your next action from a clearer picture, not fragmented notes.',
    asset: FORUM_ASSETS.cardCommandInterface,
    demoCategory: 'FOLLOW-UP',
    architectureNote: 'COMMAND CHAMBER // 4:5',
    capabilities: [
      'Synthesizes recent meeting notes, stage duration, and open action items into a clear next move.',
      'Highlights overdue follow-up windows before high-intent opportunities lose momentum.',
      'Equips account teams with structured context briefs ready for immediate review.',
    ],
  },
];

interface FeatureGalleryProps {
  onSelectDemoCategory: (category: SignalFilterCategory) => void;
}

export const FeatureGallery: React.FC<FeatureGalleryProps> = ({
  onSelectDemoCategory,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [selectedFeature, setSelectedFeature] = useState<FeaturePlateItem | null>(null);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const shells = sectionRef.current!.querySelectorAll('.plate-scene-shell');
        const rules = sectionRef.current!.querySelectorAll('.gallery-arch-rule');

        gsap.fromTo(
          rules,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        shells.forEach((shell, idx) => {
          const offsetX = idx === 0 ? -28 : 28;
          const offsetY = idx === 1 ? 32 : 48;
          const rotY = idx === 0 ? 3.5 : -3.5;

          gsap.fromTo(
            shell,
            {
              opacity: 0,
              x: offsetX,
              y: offsetY,
              rotateY: rotY,
              scale: 0.96,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.85,
              delay: idx * 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: shell,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const handleViewInDemo = (category: SignalFilterCategory) => {
    setSelectedFeature(null);
    onSelectDemoCategory(category);
    window.setTimeout(() => {
      scrollToSectionId('demo', '#demo-board-heading');
    }, 60);
  };

  return (
    <section
      id="platform"
      ref={sectionRef}
      aria-labelledby="platform-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#0E100C] border-b border-[#B9B28A]/38 py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div className="flex items-center gap-3">
              <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
              <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
                002 / PLATFORM
              </span>
            </div>
            <span className="font-mono-tech text-xs tracking-[0.14em] text-[#D7D1B8]/70 uppercase hidden sm:inline">
              THREE SIGNAL FUNCTIONS · EDITORIAL PLATES
            </span>
          </div>
          <div
            aria-hidden="true"
            className="gallery-arch-rule h-px w-full bg-[#B9B28A]/35 origin-left mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <h2
                id="platform-heading"
                className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(2.1rem,4.8vw,4.5rem)] leading-[0.94] tracking-[-0.02em] text-balance"
              >
                EVERY SIGNAL HAS A PLACE.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="font-prose-support text-lg sm:text-xl text-[#B9B28A] leading-relaxed">
                Capture the context. See the connections. Choose the next move.
              </p>
            </div>
          </div>
        </div>

        {/* Asymmetric Three-Plate Editorial Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Dominant Left Plate (Feature 01) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <FeaturePlate
              item={FEATURE_PLATES[0]}
              featured
              onExplore={(item) => setSelectedFeature(item)}
            />
          </div>

          {/* Right Offset Vertical Stack (Feature 02 & Feature 03) */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12 lg:mt-16">
            <FeaturePlate
              item={FEATURE_PLATES[1]}
              onExplore={(item) => setSelectedFeature(item)}
            />
            <FeaturePlate
              item={FEATURE_PLATES[2]}
              onExplore={(item) => setSelectedFeature(item)}
            />
          </div>
        </div>
      </div>

      {/* Accessible Feature Specification Modal */}
      <AccessibleDialog
        isOpen={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
        kicker={
          selectedFeature
            ? `002.${selectedFeature.number} // ${selectedFeature.architectureNote}`
            : 'PLATFORM SPECIFICATION'
        }
        title={selectedFeature ? selectedFeature.title : ''}
      >
        {selectedFeature && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center border border-[#B9B28A]/30 bg-[#0E100C] p-4">
              <div className="sm:col-span-5 aspect-[4/4.5] overflow-hidden border border-[#B9B28A]/25">
                <ResilientImage
                  asset={selectedFeature.asset}
                  className="h-full w-full"
                />
              </div>
              <div className="sm:col-span-7 space-y-3">
                <div className="font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em]">
                  FUNCTIONAL OVERVIEW
                </div>
                <p className="font-prose-support text-base text-[#F6F3EA] leading-relaxed">
                  {selectedFeature.description}
                </p>
                <div className="font-mono-tech text-[11px] text-[#D7D1B8]/75 uppercase tracking-[0.12em] pt-2 border-t border-[#B9B28A]/20">
                  CONCEPT MODULE · ILLUSTRATIVE ARCHITECTURE
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#B9B28A] mb-3">
                KEY SYSTEM CAPABILITIES
              </h3>
              <ul className="space-y-2.5 border-t border-[#B9B28A]/25 pt-3">
                {selectedFeature.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-prose-support text-sm sm:text-base text-[#D7D1B8]"
                  >
                    <span className="font-mono-tech text-xs text-[#B9B28A] mt-1 shrink-0">
                      0{i + 1}.
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#B9B28A]/30 pt-5">
              <MagneticButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedFeature(null)}
              >
                CLOSE PANEL
              </MagneticButton>
              <MagneticButton
                variant="primary"
                size="md"
                dataTestId="modal-view-in-demo-btn"
                onClick={() => handleViewInDemo(selectedFeature.demoCategory)}
                icon={<span className="text-xs leading-none">▶</span>}
              >
                VIEW IN DEMO ({selectedFeature.demoCategory})
              </MagneticButton>
            </div>
          </div>
        )}
      </AccessibleDialog>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/FeaturePlate.tsx">
<![CDATA['use client';
import React from 'react';
import { ForumAssetEntry } from '../../lib/forum/assets';
import { SignalFilterCategory } from '../../lib/forum/demoData';
import { PointerTiltPlate } from './PointerTiltPlate';
import { ResilientImage } from './ResilientImage';
import { MagneticButton } from './MagneticButton';

export interface FeaturePlateItem {
  id: string;
  number: string;
  title: string;
  description: string;
  asset: ForumAssetEntry;
  demoCategory: SignalFilterCategory;
  capabilities: string[];
  architectureNote: string;
}

interface FeaturePlateProps {
  item: FeaturePlateItem;
  featured?: boolean;
  onExplore: (item: FeaturePlateItem) => void;
}

export const FeaturePlate: React.FC<FeaturePlateProps> = ({
  item,
  featured = false,
  onExplore,
}) => {
  return (
    <article
      aria-labelledby={`feature-title-${item.id}`}
      className="plate-scene-shell h-full flex flex-col"
    >
      <PointerTiltPlate className="flex-1 flex flex-col">
        {/* Top Plate Header Bar */}
        <div className="flex items-center justify-between border-b border-[#B9B28A]/30 bg-[#0E100C] px-4 sm:px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              PLATE // {item.number}
            </span>
          </div>
          <span className="font-mono-tech text-[11px] tracking-[0.14em] text-[#D7D1B8]/70 uppercase">
            {item.architectureNote}
          </span>
        </div>

        {/* Portrait Artwork Viewport (Natural 4:5 / 1792:2400 proportion) */}
        <div
          className={`relative w-full overflow-hidden bg-[#0E100C] border-b border-[#B9B28A]/30 ${
            featured ? 'aspect-[4/4.8] lg:aspect-[4/4.9]' : 'aspect-[4/4.6]'
          }`}
        >
          <div className="plate-image-mask h-full w-full overflow-hidden">
            <ResilientImage
              asset={item.asset}
              className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
          {/* Subtle inner architectural frame line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 border border-[#B9B28A]/20"
          />
        </div>

        {/* Editorial Caption & Action Footer (Never covers primary artwork subject) */}
        <div className="plate-caption-block flex flex-1 flex-col justify-between bg-[#171814] p-5 sm:p-6 lg:p-7">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3
                id={`feature-title-${item.id}`}
                className="font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight"
              >
                {item.title}
              </h3>
              <span className="font-mono-tech text-xs text-[#B9B28A] shrink-0">
                [{item.number}]
              </span>
            </div>
            <p className="font-prose-support text-base sm:text-[17px] leading-relaxed text-[#D7D1B8]">
              {item.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#B9B28A]/20 flex items-center justify-between gap-4">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#B9B28A]/80">
              MODE: {item.demoCategory}
            </span>
            <MagneticButton
              variant="secondary"
              size="sm"
              onClick={() => onExplore(item)}
              ariaLabel={`Explore ${item.title} specification`}
              dataTestId={`explore-${item.id}`}
              icon={<span className="text-xs leading-none">↗</span>}
            >
              EXPLORE
            </MagneticButton>
          </div>
        </div>
      </PointerTiltPlate>
    </article>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/ForumFinale.tsx">
<![CDATA['use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollToSectionId } from '../../lib/forum/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const FINALE_LINES = [
  'READY TO TURN',
  'EVERY SIGNAL',
  'INTO MOMENTUM?',
] as const;

export const ForumFinale: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topBorderRef = useRef<HTMLDivElement | null>(null);
  const apertureRingRef = useRef<SVGGElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (topBorderRef.current) {
          gsap.fromTo(
            topBorderRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (apertureRingRef.current) {
          gsap.fromTo(
            apertureRingRef.current,
            { rotate: -18, scale: 0.92, transformOrigin: '50% 50%' },
            {
              rotate: 12,
              scale: 1,
              transformOrigin: '50% 50%',
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="final"
      ref={sectionRef}
      aria-labelledby="finale-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#0E100C] pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-20"
    >
      <div
        ref={topBorderRef}
        aria-hidden="true"
        className="mx-auto max-w-[1920px] h-px bg-[#B9B28A]/38 origin-left mb-10"
      />

      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Top Registration Row */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
          <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
            006 / FINAL ORBIT
          </span>
          <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Huge Left-Aligned CTA Block (Cols 1-7) */}
          <div className="lg:col-span-7">
            <h2
              id="finale-heading"
              aria-label="READY TO TURN EVERY SIGNAL INTO MOMENTUM?"
              className="font-doto-hero uppercase text-[#F6F3EA] text-[clamp(2.25rem,5.8vw,5.4rem)] leading-[0.92] tracking-[-0.02em]"
            >
              <span className="sr-only">
                READY TO TURN EVERY SIGNAL INTO MOMENTUM?
              </span>
              {FINALE_LINES.map((line) => (
                <span key={line} aria-hidden="true" className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-[580px] font-prose-support text-lg sm:text-2xl text-[#B9B28A] leading-[1.35]">
              Make clearer decisions with a system built around the whole picture.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => scrollToSectionId('platform')}
                icon={<span className="text-base leading-none">↗</span>}
              >
                EXPLORE THE SYSTEM
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                size="lg"
                onClick={() => scrollToSectionId('demo', '#demo-board-heading')}
                icon={<span className="text-xs leading-none">▶</span>}
              >
                OPEN LIVE DEMO
              </MagneticButton>
            </div>
          </div>

          {/* Right-Hand Native CSS/SVG Orbital Monolith Aperture (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-[540px]">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0E100C] dither-grid-dark border border-[#B9B28A]/35 flex items-center justify-center">
                <svg
                  viewBox="0 0 480 330"
                  className="h-full w-full"
                  role="img"
                  aria-label="Architectural orbital monolith aperture schematic"
                >
                  <defs>
                    <radialGradient id="finaleSunburst" cx="54%" cy="38%" r="58%">
                      <stop offset="0%" stopColor="#F6F3EA" stopOpacity="0.95" />
                      <stop offset="28%" stopColor="#D7D1B8" stopOpacity="0.65" />
                      <stop offset="58%" stopColor="#B9B28A" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#0E100C" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="finaleDomeGrad" x1="35%" y1="15%" x2="70%" y2="95%">
                      <stop offset="0%" stopColor="#F6F3EA" stopOpacity="0.92" />
                      <stop offset="40%" stopColor="#B9B28A" stopOpacity="0.72" />
                      <stop offset="80%" stopColor="#171814" stopOpacity="0.92" />
                      <stop offset="100%" stopColor="#0E100C" stopOpacity="1" />
                    </linearGradient>
                    <pattern
                      id="finaleDitherDots"
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x="0" y="0" width="1.5" height="1.5" fill="#B9B28A" fillOpacity="0.45" />
                      <rect x="2" y="2" width="1" height="1" fill="#0E100C" fillOpacity="0.75" />
                    </pattern>
                  </defs>

                  {/* Outer Starfield Specks */}
                  <g fill="#D7D1B8" opacity="0.65">
                    <rect x="38" y="44" width="2" height="2" />
                    <rect x="74" y="92" width="1.5" height="1.5" />
                    <rect x="52" y="210" width="2" height="2" />
                    <rect x="96" y="268" width="1.5" height="1.5" />
                    <rect x="392" y="48" width="2" height="2" />
                    <rect x="428" y="108" width="2" height="2" />
                    <rect x="412" y="236" width="1.5" height="1.5" />
                    <rect x="366" y="284" width="2" height="2" />
                  </g>

                  {/* Dramatic Radial Sunburst Beams (Top-Right Corona) */}
                  <g opacity="0.52" stroke="#D7D1B8" strokeWidth="1">
                    <line x1="240" y1="165" x2="20" y2="10" strokeWidth="0.75" />
                    <line x1="240" y1="165" x2="85" y2="0" strokeWidth="1.2" />
                    <line x1="240" y1="165" x2="165" y2="0" strokeWidth="0.75" />
                    <line x1="240" y1="165" x2="315" y2="0" strokeWidth="1.5" />
                    <line x1="240" y1="165" x2="375" y2="0" strokeWidth="2.2" />
                    <line x1="240" y1="165" x2="440" y2="15" strokeWidth="1.8" />
                    <line x1="240" y1="165" x2="480" y2="60" strokeWidth="1.2" />
                    <line x1="240" y1="165" x2="480" y2="115" strokeWidth="0.8" />
                    <line x1="240" y1="165" x2="0" y2="85" strokeWidth="0.8" />
                    <line x1="240" y1="165" x2="460" y2="275" strokeWidth="0.6" />
                    <line x1="240" y1="165" x2="30" y2="280" strokeWidth="0.6" />
                  </g>

                  {/* Luminous Corona Glow */}
                  <circle cx="240" cy="165" r="142" fill="url(#finaleSunburst)" />

                  {/* Outer Orbital Aperture Rings (Scroll-Rotated) */}
                  <g ref={apertureRingRef}>
                    {/* Outer Crescent Shell */}
                    <circle
                      cx="240"
                      cy="172"
                      r="116"
                      fill="#8C876B"
                      fillOpacity="0.42"
                      stroke="#B9B28A"
                      strokeWidth="1"
                    />
                    <circle
                      cx="240"
                      cy="172"
                      r="116"
                      fill="url(#finaleDitherDots)"
                    />
                    {/* Inner Offset Luminous Sphere */}
                    <circle
                      cx="240"
                      cy="184"
                      r="92"
                      fill="url(#finaleDomeGrad)"
                      stroke="#D7D1B8"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                    />
                    <circle
                      cx="240"
                      cy="184"
                      r="92"
                      fill="url(#finaleDitherDots)"
                    />
                  </g>

                  {/* Sharp Vertical Isometric Monolith Silhouette (Grounded in Aperture) */}
                  <g>
                    {/* Left Dark Monolith Face */}
                    <polygon
                      points="214,94 244,80 238,266 204,274"
                      fill="#0E100C"
                      stroke="#B9B28A"
                      strokeWidth="1"
                    />
                    {/* Right Illuminated Dithered Monolith Face */}
                    <polygon
                      points="244,80 264,92 262,274 238,266"
                      fill="#B9B28A"
                      stroke="#F6F3EA"
                      strokeWidth="0.9"
                    />
                    <polygon
                      points="244,80 264,92 262,274 238,266"
                      fill="url(#finaleDitherDots)"
                    />
                    {/* Architectural Circuit Etchings on Monolith */}
                    <line x1="218" y1="132" x2="241" y2="123" stroke="#B9B28A" strokeWidth="0.75" strokeOpacity="0.65" />
                    <line x1="214" y1="176" x2="239" y2="168" stroke="#B9B28A" strokeWidth="0.75" strokeOpacity="0.65" />
                    <line x1="210" y1="218" x2="238" y2="210" stroke="#B9B28A" strokeWidth="0.75" strokeOpacity="0.5" />
                    <line x1="244" y1="138" x2="261" y2="147" stroke="#0E100C" strokeWidth="0.9" />
                    <line x1="242" y1="186" x2="260" y2="195" stroke="#0E100C" strokeWidth="0.9" />
                  </g>
                </svg>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono-tech text-[11px] text-[#B9B28A] uppercase tracking-[0.14em]">
                <div>
                  <div>SCHEMATIC // ORBITAL APERTURE</div>
                  <div className="text-[#8C876B]">16:9 VIEWPORT SYNTHESIS</div>
                </div>
                <span className="text-[#F6F3EA]">003 / FINAL ORBIT</span>
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
    <file path="src/app/(forum)/forum/components/forum/ForumFooter.tsx">
<![CDATA['use client';
import React from 'react';
import { ForumLogo } from './ForumLogo';
import { scrollToSectionId } from '../../lib/forum/motion';

interface ForumFooterProps {
  onResetDemo: () => void;
}

export const ForumFooter: React.FC<ForumFooterProps> = ({ onResetDemo }) => {
  const handleResetAndScroll = () => {
    onResetDemo();
    scrollToSectionId('demo', '#demo-board-heading');
  };

  return (
    <footer
      aria-label="Site Footer"
      className="w-full bg-[#0E100C] border-t border-[#B9B28A]/38 text-[#F6F3EA]"
    >
      {/* Precision Ruled Navigation Grid (Inspired by 09-footer-mockup.webp, only real in-page links) */}
      <div className="mx-auto max-w-[1920px] border-b border-[#B9B28A]/38">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#B9B28A]/30">
          {/* Column 1: Brand Lockup (Cols 1-5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[210px]">
            <div className="flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#B9B28A]/80">
              <div className="flex items-center gap-2">
                <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
                <span>004 / END OF PAGE</span>
              </div>
              <span>CONCEPT ARCHITECTURE</span>
            </div>

            <div className="my-6">
              <ForumLogo size="lg" onClick={() => scrollToSectionId('top')} />
            </div>

            <div className="flex items-center justify-between font-mono-tech text-[11px] text-[#8C876B] uppercase tracking-[0.12em]">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
              <span>CELESTIAL INSTRUMENT FOR REVENUE SIGNALS</span>
            </div>
          </div>

          {/* Column 2: EXPLORE (Cols 6-7) */}
          <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#8C876B] uppercase tracking-[0.14em] mb-4">
                <span className="reg-cross text-[#B9B28A]/70" aria-hidden="true" />
                <span>INDEX // 01</span>
              </div>
              <h3 className="font-doto-ui text-sm sm:text-base text-[#F6F3EA] uppercase tracking-[0.12em] mb-4">
                EXPLORE
              </h3>
              <ul className="space-y-2.5 font-mono-tech text-sm text-[#B9B28A]">
                <li>
                  <a
                    href="#platform"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('platform');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Platform
                  </a>
                </li>
                <li>
                  <a
                    href="#intelligence"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('intelligence');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Intelligence
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('demo', '#demo-board-heading');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Workflows
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 flex justify-end">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
            </div>
          </div>

          {/* Column 3: DISCOVER (Cols 8-10) */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#8C876B] uppercase tracking-[0.14em] mb-4">
                <span className="reg-cross text-[#B9B28A]/70" aria-hidden="true" />
                <span>INDEX // 02</span>
              </div>
              <h3 className="font-doto-ui text-sm sm:text-base text-[#F6F3EA] uppercase tracking-[0.12em] mb-4">
                DISCOVER
              </h3>
              <ul className="space-y-2.5 font-mono-tech text-sm text-[#B9B28A]">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('about');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Our Approach
                  </a>
                </li>
                <li>
                  <a
                    href="#vision"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('vision');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    The Wide Field
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('demo', '#demo-board-heading');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Live Signal Board
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 flex justify-end">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
            </div>
          </div>

          {/* Column 4: SYSTEM (Cols 11-12) */}
          <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#8C876B] uppercase tracking-[0.14em] mb-4">
                <span className="reg-cross text-[#B9B28A]/70" aria-hidden="true" />
                <span>INDEX // 03</span>
              </div>
              <h3 className="font-doto-ui text-sm sm:text-base text-[#F6F3EA] uppercase tracking-[0.12em] mb-4">
                SYSTEM
              </h3>
              <ul className="space-y-2.5 font-mono-tech text-sm text-[#B9B28A]">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSectionId('top')}
                    className="hover:text-[#F6F3EA] transition-colors text-left cursor-pointer"
                  >
                    Back to Top ↑
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleResetAndScroll}
                    className="hover:text-[#F6F3EA] transition-colors text-left cursor-pointer"
                  >
                    Reset Demo State
                  </button>
                </li>
                <li>
                  <a
                    href="#final"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('final');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Final Orbit
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 flex justify-end">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Strip */}
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-tech text-[11px] sm:text-xs tracking-[0.14em] uppercase">
        <div className="text-[#D7D1B8]">
          FORUM — OPENLANDING CONCEPT EXPERIENCE
        </div>
        <div className="text-[#F6F3EA]">A CLEARER VIEW OF WHAT&apos;S NEXT.</div>
        <div className="text-[#B9B28A]">
          DESIGN STUDY / NOT A LIVE CRM SERVICE
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/ForumHeader.tsx">
<![CDATA['use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ForumLogo } from './ForumLogo';
import { MagneticButton } from './MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToSectionId } from '../../lib/forum/motion';

interface ForumHeaderProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'PLATFORM', href: '#platform', sectionId: 'platform' },
  { label: 'INTELLIGENCE', href: '#intelligence', sectionId: 'intelligence' },
  { label: 'WORKFLOWS', href: '#demo', sectionId: 'demo' },
  { label: 'ABOUT', href: '#about', sectionId: 'about' },
] as const;

export const ForumHeader: React.FC<ForumHeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavigate = (targetId: string, focusSelector?: string) => {
    setMobileMenuOpen(false);
    scrollToSectionId(targetId, focusSelector);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0E100C]/92 backdrop-blur-xs border-b border-[#B9B28A]/38">
      <div className="mx-auto flex h-[72px] lg:h-[80px] max-w-[1920px] items-stretch justify-between">
        {/* Left Zone: Stepped Pixel Monogram + Wordmark + Descriptor */}
        <div className="flex items-center px-4 sm:px-6 lg:px-8 border-r border-[#B9B28A]/38 shrink-0">
          <ForumLogo onClick={() => handleNavigate('top')} />
        </div>

        {/* Center/Right Zone: Desktop Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex flex-1 items-center justify-end px-8 gap-8 xl:gap-11"
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive =
              activeSection === item.sectionId ||
              (item.sectionId === 'demo' && activeSection === 'workflows');
            return (
              <motion.a
                key={item.label}
                href={item.href}
                initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.18 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.sectionId);
                }}
                className={`relative py-2 font-doto-ui text-xs xl:text-[13px] tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F6F3EA] ${
                  isActive
                    ? 'text-[#F6F3EA]'
                    : 'text-[#D7D1B8] hover:text-[#F6F3EA]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B9B28A] transition-transform duration-200 origin-left ${
                    isActive ? 'w-full scale-x-100' : 'w-full scale-x-0'
                  }`}
                />
              </motion.a>
            );
          })}
        </nav>

        {/* Right Zone: Two Compact Rectilinear CTAs (Matching Approved Reference) */}
        <div className="hidden md:flex items-center gap-3 px-4 sm:px-6 lg:px-7 border-l border-[#B9B28A]/38 shrink-0">
          <MagneticButton
            variant="secondary"
            size="sm"
            onClick={() => handleNavigate('platform')}
          >
            EXPLORE PLATFORM
          </MagneticButton>
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => handleNavigate('demo', '#demo-board-heading')}
          >
            VIEW DEMO
          </MagneticButton>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center px-4 border-l border-[#B9B28A]/38">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="forum-mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#B9B28A]/45 bg-[#171814] text-[#F6F3EA] hover:border-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="forum-mobile-nav"
            aria-label="Mobile Navigation"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[#B9B28A]/38 bg-[#0E100C] px-5 py-6"
          >
            <ul className="flex flex-col divide-y divide-[#B9B28A]/20 border-y border-[#B9B28A]/30">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.sectionId);
                    }}
                    className="flex items-center justify-between py-3.5 font-doto-ui text-sm tracking-[0.14em] text-[#F6F3EA] uppercase hover:text-[#B9B28A]"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-tech text-[11px] text-[#B9B28A]">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MagneticButton
                variant="secondary"
                size="md"
                onClick={() => handleNavigate('platform')}
                className="w-full"
              >
                EXPLORE PLATFORM
              </MagneticButton>
              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => handleNavigate('demo', '#demo-board-heading')}
                className="w-full"
              >
                VIEW DEMO
              </MagneticButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/ForumHero.tsx">
<![CDATA['use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FORUM_ASSETS } from '../../lib/forum/assets';
import { scrollToSectionId, motionTokens } from '../../lib/forum/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = ['TURN EVERY', 'SIGNAL INTO', 'MOMENTUM.'] as const;

export const ForumHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageShellRef = useRef<HTMLDivElement | null>(null);
  const contentShellRef = useRef<HTMLDivElement | null>(null);
  const bottomRuleRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        if (imageShellRef.current) {
          tl.fromTo(
            imageShellRef.current,
            { scale: 1, yPercent: 0 },
            { scale: 1.055, yPercent: 4, ease: 'none' },
            0
          );
        }

        if (contentShellRef.current) {
          tl.fromTo(
            contentShellRef.current,
            { yPercent: 0, opacity: 1 },
            { yPercent: -10, opacity: 0.25, ease: 'none' },
            0
          );
        }

        if (bottomRuleRef.current) {
          tl.fromTo(
            bottomRuleRef.current,
            { scaleX: 1 },
            { scaleX: 0.35, ease: 'none' },
            0
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Hero — The Signal"
      className="relative min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-80px)] w-full overflow-hidden bg-[#0E100C] border-b border-[#B9B28A]/38 flex flex-col justify-between"
    >
      {/* Full-bleed Production Hero Artwork (02-hero-monolith-clean.webp) */}
      <div
        ref={imageShellRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden origin-center"
      >
        <ResilientImage
          asset={FORUM_ASSETS.heroMonolithClean}
          priority
          className="h-full w-full object-[68%_42%] md:object-[72%_50%] lg:object-[76%_50%]"
        />
        {/* Measured contrast scrim on the left for crisp Doto legibility while keeping monolith & eclipse luminous on right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0E100C]/95 via-[#0E100C]/80 to-[#0E100C]/45 md:via-[#0E100C]/60 md:to-transparent lg:via-[#0E100C]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0E100C]/92 via-transparent to-[#0E100C]/45 md:from-[#0E100C]/65"
        />
      </div>

      {/* Top Architectural Registration Row */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
        <span className="reg-cross text-[#B9B28A]/75" aria-hidden="true" />
        <motion.div
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-4 hidden sm:block h-px flex-1 bg-[#B9B28A]/20 origin-left"
          aria-hidden="true"
        />
        <span className="reg-cross text-[#B9B28A]/75" aria-hidden="true" />
      </div>

      {/* Main Left Editorial Column */}
      <div
        ref={contentShellRef}
        className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-1 items-center px-5 sm:px-8 lg:px-14 py-10 sm:py-14 lg:py-16"
      >
        <div className="w-full max-w-[820px] lg:max-w-[860px]">
          {/* Screen-reader accessible single H1 + split-line animated visual wrappers */}
          <h1
            aria-label="TURN EVERY SIGNAL INTO MOMENTUM."
            className="font-doto-hero uppercase text-[#F6F3EA] text-[clamp(2.5rem,7.2vw,6.5rem)] leading-[0.9] tracking-[-0.02em] select-text"
          >
            <span className="sr-only">TURN EVERY SIGNAL INTO MOMENTUM.</span>
            {HERO_LINES.map((line, index) => (
              <span
                key={line}
                aria-hidden="true"
                className="block overflow-hidden py-[0.03em]"
              >
                <motion.span
                  initial={
                    reducedMotion
                      ? false
                      : { y: '105%', opacity: 0, letterSpacing: '0.04em' }
                  }
                  animate={{ y: '0%', opacity: 1, letterSpacing: '-0.02em' }}
                  transition={{
                    duration: 0.72,
                    delay: 0.32 + index * motionTokens.textLineStaggerSeconds,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block whitespace-nowrap"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Supporting Subheading */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 max-w-[600px] font-prose-support text-lg sm:text-2xl lg:text-[26px] font-normal leading-[1.32] text-[#B9B28A]"
          >
            One intelligent system for your contacts, conversations, pipeline, and next move.
          </motion.p>

          {/* Primary & Secondary CTA Rail */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.84, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSectionId('platform')}
              icon={<span className="text-base leading-none">↗</span>}
            >
              EXPLORE FORUM
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => scrollToSectionId('demo', '#demo-board-heading')}
              icon={<span className="text-xs leading-none">▶</span>}
            >
              SEE THE SYSTEM
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom Metadata & Scroll Cue Strip */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 pb-5 sm:pb-6">
        <div
          ref={bottomRuleRef}
          aria-hidden="true"
          className="mb-4 h-px w-full bg-[#B9B28A]/25 origin-left"
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
            <div className="font-mono-tech text-[11px] sm:text-xs leading-[1.45] tracking-[0.14em] uppercase">
              <div className="text-[#D7D1B8]">001 / SIGNAL SYSTEM</div>
              <div className="text-[#F6F3EA]">A CLEARER VIEW OF WHAT&apos;S NEXT</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSectionId('about')}
            aria-label="Scroll to Chapter 02 — Editorial Manifesto"
            className="group self-center inline-flex flex-col items-center gap-1 px-3 py-1 text-[#B9B28A] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F6F3EA] cursor-pointer"
          >
            <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase opacity-75 group-hover:opacity-100">
              SCROLL
            </span>
            <ChevronDown
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>

          <div className="hidden sm:flex items-center gap-3 text-right">
            <div className="font-mono-tech text-[11px] leading-[1.45] tracking-[0.14em] text-[#B9B28A]/85 uppercase">
              <div>OPENLANDING CONCEPT STUDY</div>
              <div>16:9 ARCHITECTURAL PLATE</div>
            </div>
            <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/ForumLogo.tsx">
<![CDATA['use client';
import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ForumLogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showDescriptor?: boolean;
}

const PIXEL_CELLS = [
  { row: 0, col: 0, active: true, delay: 0.02, initX: -6, initY: -6 },
  { row: 0, col: 1, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 0, col: 2, active: true, delay: 0.08, initX: 6, initY: -4 },
  { row: 1, col: 0, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 1, col: 1, active: true, delay: 0.14, initX: 0, initY: 5 },
  { row: 1, col: 2, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 2, col: 0, active: true, delay: 0.19, initX: -5, initY: 6 },
  { row: 2, col: 1, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 2, col: 2, active: false, delay: 0, initX: 0, initY: 0 },
];

export const ForumLogo: React.FC<ForumLogoProps> = ({
  onClick,
  size = 'md',
  showDescriptor = true,
}) => {
  const reducedMotion = useReducedMotion();

  const iconSize = size === 'lg' ? 33 : size === 'sm' ? 21 : 27;
  const wordmarkClass =
    size === 'lg'
      ? 'text-3xl sm:text-4xl tracking-tight'
      : size === 'sm'
      ? 'text-xl tracking-tight'
      : 'text-2xl sm:text-[28px] tracking-tight';

  return (
    <a
      href="#top"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="group inline-flex items-center gap-3.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9B28A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E100C]"
      aria-label="FORUM — Revenue Intelligence System, return to top"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
        aria-hidden="true"
      >
        {PIXEL_CELLS.map((cell, idx) => {
          if (!cell.active) return null;
          const x = cell.col * 10;
          const y = cell.row * 10;
          return (
            <motion.rect
              key={idx}
              x={x}
              y={y}
              width={9}
              height={9}
              fill={cell.row === 0 && cell.col === 2 ? '#D7D1B8' : '#B9B28A'}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: cell.initX, y: cell.initY, scale: 0.65 }
              }
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{
                duration: 0.24,
                delay: cell.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="transition-colors duration-200 group-hover:fill-[#F6F3EA]"
            />
          );
        })}
      </svg>

      <div className="flex items-center gap-3">
        <span
          className={`font-doto-hero text-[#F6F3EA] leading-none uppercase select-none whitespace-nowrap ${wordmarkClass}`}
        >
          FORUM
        </span>
        {showDescriptor && (
          <span className="font-mono-tech text-[9px] sm:text-[10px] leading-[1.15] tracking-[0.12em] text-[#B9B28A] uppercase select-none border-l border-[#B9B28A]/35 pl-2.5 py-0.5">
            REVENUE
            <br />
            INTELLIGENCE
            <br />
            SYSTEM
          </span>
        )}
      </div>
    </a>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/ForumPage.tsx">
<![CDATA['use client';
import React, { useMemo, useState } from 'react';
import { SignalFilterCategory } from '../../lib/forum/demoData';
import { useSectionSpy } from '../../hooks/useSectionSpy';
import { ForumHeader } from './ForumHeader';
import { ForumHero } from './ForumHero';
import { SignalManifesto } from './SignalManifesto';
import { FeatureGallery } from './FeatureGallery';
import { IntelligenceEngine } from './IntelligenceEngine';
import { SignalBoardDemo } from './SignalBoardDemo';
import { WideFieldInterlude } from './WideFieldInterlude';
import { ForumFinale } from './ForumFinale';
import { ForumFooter } from './ForumFooter';

export const ForumPage: React.FC = () => {
  const sectionIds = useMemo(
    () => ['top', 'about', 'platform', 'intelligence', 'demo', 'vision', 'final'],
    []
  );
  const activeSection = useSectionSpy(sectionIds, 'top');

  const [demoCategory, setDemoCategory] = useState<SignalFilterCategory>('ALL');
  const [resetTriggerCount, setResetTriggerCount] = useState<number>(0);

  const handleResetDemoFromFooter = () => {
    setResetTriggerCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen w-full bg-[#0E100C] text-[#F6F3EA] selection:bg-[#B9B28A] selection:text-[#0E100C]">
      <ForumHeader activeSection={activeSection} />

      <main id="main-content" className="relative w-full overflow-x-clip">
        {/* CHAPTER 01 — #top — THE SIGNAL / HERO */}
        <ForumHero />

        {/* CHAPTER 02 — #about — FROM NOISE TO SIGNAL / EDITORIAL MANIFESTO */}
        <SignalManifesto />

        {/* CHAPTER 03 — #platform — THE THREE SIGNAL FUNCTIONS / IMAGE GALLERY */}
        <FeatureGallery onSelectDemoCategory={setDemoCategory} />

        {/* CHAPTER 04 — #intelligence — THE INTELLIGENCE ENGINE / PINNED SYSTEM REVEAL */}
        <IntelligenceEngine />

        {/* CHAPTER 05 — #demo / #workflows — THE LIVE SIGNAL BOARD / WORKING LOCAL DEMO */}
        <SignalBoardDemo
          externalCategory={demoCategory}
          onExternalCategoryChange={setDemoCategory}
          resetTriggerCount={resetTriggerCount}
        />

        {/* CHAPTER 06 — #vision — THE WIDE FIELD / CINEMATIC INTERLUDE */}
        <WideFieldInterlude />

        {/* CHAPTER 07 — #final — THE FINAL ORBIT / CTA */}
        <ForumFinale />
      </main>

      {/* CHAPTER 07 FOOTER — RULED NAVIGATION GRID */}
      <ForumFooter onResetDemo={handleResetDemoFromFooter} />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/IntelligenceEngine.tsx">
<![CDATA['use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FORUM_ASSETS, ForumAssetEntry } from '../../lib/forum/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

interface EngineStage {
  index: number;
  code: string;
  shortLabel: string;
  headline: string;
  description: string;
  metricNote: string;
  asset: ForumAssetEntry;
  objectPosition: string;
}

const ENGINE_STAGES: EngineStage[] = [
  {
    index: 0,
    code: '01 / COLLECT',
    shortLabel: 'COLLECT',
    headline: 'COLLECT THE RIGHT SIGNALS',
    description:
      'A signal stream finds a single listening point. FORUM isolates high-intent contact activity, replies, and evaluation touches from background noise.',
    metricNote: 'PHASE 01 // APERTURE INTAKE',
    asset: FORUM_ASSETS.cardSignalObservatory,
    objectPosition: '50% 42%',
  },
  {
    index: 1,
    code: '02 / CONNECT',
    shortLabel: 'CONNECT',
    headline: 'GIVE EVERY SIGNAL CONTEXT',
    description:
      'The archival corridor emerges, threading isolated conversations across historical account notes, stakeholders, and active pipeline stages.',
    metricNote: 'PHASE 02 // ORBITAL ARCHIVE',
    asset: FORUM_ASSETS.cardOrbitalArchive,
    objectPosition: '50% 50%',
  },
  {
    index: 2,
    code: '03 / ALIGN',
    shortLabel: 'ALIGN',
    headline: 'MOVE WITH ONE CLEAR DIRECTION',
    description:
      'The orbital alignment mechanism locks into focus. When contact history and pipeline timing converge, the next priority is unmistakable.',
    metricNote: 'PHASE 03 // ALIGNMENT ENGINE',
    asset: FORUM_ASSETS.cardAlignmentEngine,
    objectPosition: '50% 50%',
  },
];

export const IntelligenceEngine: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [activeStage, setActiveStage] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const manualOverrideRef = useRef<number | null>(null);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      // Desktop 235vh scroll-scrubbed 3-phase narrative with sticky viewport
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top+=80',
          end: 'bottom bottom',
          scrub: 0.25,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            // If user just clicked a tab, respect it briefly unless scroll moves significantly
            if (manualOverrideRef.current !== null) {
              return;
            }
            if (p < 0.33) {
              setActiveStage(0);
            } else if (p < 0.67) {
              setActiveStage(1);
            } else {
              setActiveStage(2);
            }
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const handleSelectStage = (stageIdx: number) => {
    manualOverrideRef.current = stageIdx;
    setActiveStage(stageIdx);
    setScrollProgress(stageIdx === 0 ? 0.12 : stageIdx === 1 ? 0.5 : 0.92);
    window.setTimeout(() => {
      manualOverrideRef.current = null;
    }, 1200);
  };

  const currentStage = ENGINE_STAGES[activeStage] || ENGINE_STAGES[0];

  return (
    <section
      id="intelligence"
      ref={sectionRef}
      aria-labelledby="intelligence-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full lg:min-h-[230vh] bg-[#171814] border-b border-[#B9B28A]/38"
    >
      <div className="lg:sticky lg:top-[80px] mx-auto flex min-h-[calc(100svh-80px)] max-w-[1920px] flex-col justify-center px-5 sm:px-8 lg:px-14 py-14 lg:py-10">
        {/* Top Kicker Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B9B28A]/35 pb-4 mb-6 lg:mb-8">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              003 / INTELLIGENCE
            </span>
          </div>
          <span className="font-mono-tech text-xs tracking-[0.14em] text-[#D7D1B8]/75 uppercase">
            THREE-STAGE CONNECTED ARCHITECTURE
          </span>
        </div>

        {/* Main 12-Column Pinned Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Persistent Editorial Column (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <h2
                id="intelligence-heading"
                className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(1.95rem,3.8vw,3.65rem)] leading-[0.94] tracking-[-0.02em] text-balance"
              >
                AN INTELLIGENT SYSTEM IS A CONNECTED SYSTEM.
              </h2>

              {/* Interactive Phase Selector Tabs (Accessible via Click & Keyboard) */}
              <div
                role="tablist"
                aria-label="Intelligence Engine Stages"
                className="mt-6 grid grid-cols-3 border border-[#B9B28A]/40 bg-[#0E100C]"
              >
                {ENGINE_STAGES.map((stage) => {
                  const selected = activeStage === stage.index;
                  return (
                    <button
                      key={stage.code}
                      type="button"
                      role="tab"
                      id={`engine-tab-${stage.index}`}
                      aria-selected={selected}
                      aria-controls={`engine-panel-${stage.index}`}
                      data-testid={`engine-tab-${stage.index}`}
                      onClick={() => handleSelectStage(stage.index)}
                      className={`px-3 py-3.5 text-left font-doto-ui text-xs sm:text-sm tracking-[0.1em] uppercase transition-colors border-r last:border-r-0 border-[#B9B28A]/30 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] ${
                        selected
                          ? 'bg-[#B9B28A] text-[#0E100C]'
                          : 'bg-[#0E100C] text-[#D7D1B8] hover:text-[#F6F3EA] hover:bg-[#171814]'
                      }`}
                    >
                      <span className="block font-mono-tech text-[10px] opacity-80">
                        0{stage.index + 1}
                      </span>
                      <span className="block whitespace-nowrap">{stage.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Narrative Beat Detail */}
            <div
              id={`engine-panel-${currentStage.index}`}
              role="tabpanel"
              aria-labelledby={`engine-tab-${currentStage.index}`}
              className="border border-[#B9B28A]/35 bg-[#0E100C] p-6 sm:p-7 space-y-4"
            >
              <div className="flex items-center justify-between font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em]">
                <span>{currentStage.code}</span>
                <span>{currentStage.metricNote}</span>
              </div>

              <h3
                data-testid="engine-active-headline"
                className="font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight"
              >
                {currentStage.headline}
              </h3>

              <p className="font-prose-support text-base sm:text-lg text-[#D7D1B8] leading-relaxed">
                {currentStage.description}
              </p>

              {/* All Three Stage Summaries for Mobile & Quick Scanning */}
              <div className="pt-4 border-t border-[#B9B28A]/20 grid grid-cols-3 gap-2 font-mono-tech text-[11px] uppercase">
                {ENGINE_STAGES.map((s) => (
                  <div
                    key={s.code}
                    className={
                      s.index === activeStage ? 'text-[#F6F3EA]' : 'text-[#8C876B]'
                    }
                  >
                    {s.code}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Signal Rail Tracer (Col 7) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center py-4">
            <svg
              viewBox="0 0 48 420"
              className="h-full max-h-[420px] w-12 overflow-visible"
              aria-hidden="true"
            >
              <line
                x1="24"
                y1="24"
                x2="24"
                y2="396"
                stroke="rgba(185, 178, 138, 0.28)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="24"
                y1="24"
                x2="24"
                y2={24 + Math.max(0.08, scrollProgress) * 372}
                stroke="#B9B28A"
                strokeWidth="2"
              />
              {[0, 1, 2].map((nodeIdx) => {
                const cy = 24 + nodeIdx * 186;
                const reached = activeStage >= nodeIdx;
                return (
                  <g key={nodeIdx}>
                    <rect
                      x="16"
                      y={cy - 8}
                      width="16"
                      height="16"
                      fill={reached ? '#B9B28A' : '#0E100C'}
                      stroke="#B9B28A"
                      strokeWidth="1.5"
                    />
                    {activeStage === nodeIdx && (
                      <rect
                        x="11"
                        y={cy - 13}
                        width="26"
                        height="26"
                        fill="none"
                        stroke="#F6F3EA"
                        strokeWidth="1"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Large Portrait Art Viewport (Cols 8-12) */}
          <div className="lg:col-span-5">
            <div className="relative h-[440px] sm:h-[520px] lg:h-[540px] w-full overflow-hidden border border-[#B9B28A]/45 bg-[#0E100C]">
              {ENGINE_STAGES.map((stage) => {
                const isCurrent = stage.index === activeStage;
                return (
                  <div
                    key={stage.code}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 h-full w-full transition-all duration-500 ease-out ${
                      isCurrent
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    <ResilientImage
                      asset={stage.asset}
                      objectPosition={stage.objectPosition}
                      className="h-full w-full"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E100C]/80 via-transparent to-[#0E100C]/30"
                    />
                  </div>
                );
              })}

              {/* Top & Bottom Viewport HUD Annotations */}
              <div className="pointer-events-none absolute top-4 left-4 right-4 z-20 flex items-center justify-between font-mono-tech text-[11px] text-[#F6F3EA] uppercase tracking-[0.14em] bg-[#0E100C]/80 border border-[#B9B28A]/35 px-3 py-1.5">
                <span>{currentStage.code}</span>
                <span>{currentStage.asset.filename}</span>
              </div>

              <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em] bg-[#0E100C]/85 border border-[#B9B28A]/35 px-3.5 py-2">
                <span>{currentStage.headline}</span>
                <span>[0{currentStage.index + 1}/03]</span>
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
    <file path="src/app/(forum)/forum/components/forum/MagneticButton.tsx">
<![CDATA['use client';
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isCoarseOrTouchDevice, motionTokens } from '../../lib/forum/motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ivory-dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  dataTestId?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  ariaLabel,
  ariaPressed,
  type = 'button',
  disabled = false,
  icon,
  dataTestId,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [pulseKey, setPulseKey] = useState<number>(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, motionTokens.hoverSpring);
  const springY = useSpring(rawY, motionTokens.hoverSpring);

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || reducedMotion || isCoarseOrTouchDevice()) return;
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.28;

    const clampedX = Math.max(
      -motionTokens.magneticMaxPx,
      Math.min(motionTokens.magneticMaxPx, deltaX)
    );
    const clampedY = Math.max(
      -motionTokens.magneticMaxPx,
      Math.min(motionTokens.magneticMaxPx, deltaY)
    );

    rawX.set(clampedX);
    rawY.set(clampedY);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!reducedMotion) {
      setPulseKey((prev) => prev + 1);
    }
    onClick?.(e);
  };

  const sizeStyles =
    size === 'sm'
      ? 'px-3.5 py-2 text-xs min-h-[38px]'
      : size === 'lg'
      ? 'px-6 py-3.5 text-sm sm:text-[15px] min-h-[48px]'
      : 'px-5 py-3 text-xs sm:text-sm min-h-[44px]';

  const variantStyles =
    variant === 'primary'
      ? 'bg-[#B9B28A] text-[#0E100C] border border-[#B9B28A] hover:bg-[#D7D1B8] hover:border-[#F6F3EA]'
      : variant === 'secondary'
      ? 'bg-[#0E100C]/85 text-[#D7D1B8] border border-[#B9B28A]/55 hover:border-[#F6F3EA] hover:text-[#F6F3EA] hover:bg-[#171814]'
      : variant === 'ivory-dark'
      ? 'bg-[#171814] text-[#F6F3EA] border border-[#171814] hover:bg-[#0E100C] hover:border-[#8C876B]'
      : 'bg-transparent text-[#B9B28A] border border-[#B9B28A]/35 hover:border-[#B9B28A] hover:text-[#F6F3EA]';

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      data-testid={dataTestId}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onBlur={handlePointerLeave}
      onClick={handleClick}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      whileTap={reducedMotion || disabled ? undefined : { scale: motionTokens.press.scale }}
      transition={{ duration: motionTokens.press.duration }}
      className={`group relative inline-flex items-center justify-center gap-2.5 font-doto-ui uppercase whitespace-nowrap shrink-0 select-none cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E100C] disabled:opacity-45 disabled:cursor-not-allowed ${sizeStyles} ${variantStyles} ${className}`}
    >
      {/* Subtle architectural corner glint on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-transparent group-hover:border-[#F6F3EA]/35 transition-colors duration-200"
      />

      {/* Tactile outward concentric pulse on click */}
      {pulseKey > 0 && !reducedMotion && (
        <motion.span
          key={pulseKey}
          aria-hidden="true"
          initial={{ opacity: 0.55, scale: 0.96 }}
          animate={{ opacity: 0, scale: 1.14 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 border border-[#B9B28A]"
        />
      )}

      <span className="relative z-10 inline-flex items-center gap-2">
        <span>{children}</span>
        {icon && (
          <span
            aria-hidden="true"
            className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-1"
          >
            {icon}
          </span>
        )}
      </span>
    </motion.button>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/PointerTiltPlate.tsx">
<![CDATA['use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isCoarseOrTouchDevice, motionTokens } from '../../lib/forum/motion';

interface PointerTiltPlateProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const PointerTiltPlate: React.FC<PointerTiltPlateProps> = ({
  children,
  className = '',
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Normalized pointer coordinates [-0.5, 0.5]
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Pixel offset for the radial glow center
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const springNormX = useSpring(normX, motionTokens.hoverSpring);
  const springNormY = useSpring(normY, motionTokens.hoverSpring);
  const springGlowX = useSpring(glowX, { stiffness: 220, damping: 26, mass: 0.5 });
  const springGlowY = useSpring(glowY, { stiffness: 220, damping: 26, mass: 0.5 });
  const springGlowOpacity = useSpring(glowOpacity, { stiffness: 180, damping: 24 });

  const rotateX = useTransform(
    springNormY,
    [-0.5, 0.5],
    [motionTokens.tiltMaxDeg, -motionTokens.tiltMaxDeg]
  );
  const rotateY = useTransform(
    springNormX,
    [-0.5, 0.5],
    [-motionTokens.tiltMaxDeg, motionTokens.tiltMaxDeg]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || reducedMotion || isCoarseOrTouchDevice()) return;
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const nx = Math.max(-0.5, Math.min(0.5, relX / rect.width - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, relY / rect.height - 0.5));

    normX.set(nx);
    normY.set(ny);
    glowX.set(relX - 180);
    glowY.set(relY - 180);
    glowOpacity.set(1);
  };

  const handlePointerLeave = () => {
    normX.set(0);
    normY.set(0);
    glowOpacity.set(0);
  };

  return (
    <div style={{ perspective: '900px' }} className={className}>
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          reducedMotion || disabled
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative h-full w-full overflow-hidden border border-[#B9B28A]/35 bg-[#0E100C] transition-colors duration-200 hover:border-[#B9B28A]/75"
      >
        {/* GPU-friendly pointer-following radial khaki glow */}
        {!reducedMotion && !disabled && (
          <motion.div
            aria-hidden="true"
            style={{
              x: springGlowX,
              y: springGlowY,
              opacity: springGlowOpacity,
              background:
                'radial-gradient(circle, rgba(185, 178, 138, 0.22) 0%, rgba(185, 178, 138, 0.06) 45%, transparent 72%)',
            }}
            className="pointer-events-none absolute top-0 left-0 z-20 h-[360px] w-[360px] rounded-full mix-blend-screen"
          />
        )}

        {children}
      </motion.div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/ResilientImage.tsx">
<![CDATA['use client';
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
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/SignalBoardDemo.tsx">
<![CDATA['use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Check, Copy, HelpCircle, RotateCcw, ArrowUpDown } from 'lucide-react';
import {
  INITIAL_SIGNALS,
  SIGNAL_CATEGORIES,
  SignalFilterCategory,
  SignalRecord,
  SignalSortOrder,
  filterAndSortSignals,
  formatSignalBriefForClipboard,
  resolveSelectedSignalId,
  toggleSignalReviewStatus,
} from '../../lib/forum/demoData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';
import { AccessibleDialog } from './AccessibleDialog';

interface SignalBoardDemoProps {
  externalCategory: SignalFilterCategory;
  onExternalCategoryChange: (cat: SignalFilterCategory) => void;
  resetTriggerCount: number;
}

export const SignalBoardDemo: React.FC<SignalBoardDemoProps> = ({
  externalCategory,
  onExternalCategoryChange,
  resetTriggerCount,
}) => {
  const reducedMotion = useReducedMotion();
  const [signals, setSignals] = useState<SignalRecord[]>(INITIAL_SIGNALS);
  const [sortOrder, setSortOrder] = useState<SignalSortOrder>('RECENT');
  const [selectedId, setSelectedId] = useState<string>(INITIAL_SIGNALS[0].id);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);

  // Refs for ResizeObserver-driven SVG connector paths on desktop
  const boardGridRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const ledgerTargetRef = useRef<HTMLDivElement | null>(null);
  const [connectorCoord, setConnectorCoord] = useState<{
    startY: number;
    endY: number;
  }>({ startY: 72, endY: 120 });

  // Synchronize with external reset trigger (e.g., from Footer Reset Demo link)
  useEffect(() => {
    if (resetTriggerCount > 0) {
      setSignals(INITIAL_SIGNALS);
      onExternalCategoryChange('ALL');
      setSortOrder('RECENT');
      setSelectedId(INITIAL_SIGNALS[0].id);
      setCopyFeedback(null);
    }
  }, [resetTriggerCount, onExternalCategoryChange]);

  const visibleSignals = useMemo(
    () => filterAndSortSignals(signals, externalCategory, sortOrder),
    [signals, externalCategory, sortOrder]
  );

  const effectiveSelectedId = useMemo(
    () => resolveSelectedSignalId(visibleSignals, selectedId),
    [visibleSignals, selectedId]
  );

  const selectedSignal = useMemo(
    () =>
      visibleSignals.find((s) => s.id === effectiveSelectedId) ||
      visibleSignals[0] ||
      null,
    [visibleSignals, effectiveSelectedId]
  );

  const reviewedCount = useMemo(
    () => signals.filter((s) => s.status === 'REVIEWED').length,
    [signals]
  );

  // Recompute SVG connection anchor coordinates on layout/selection/resize
  useEffect(() => {
    const updateConnector = () => {
      if (!boardGridRef.current || !effectiveSelectedId) return;
      const gridRect = boardGridRef.current.getBoundingClientRect();
      const rowEl = rowRefs.current[effectiveSelectedId];
      const ledgerEl = ledgerTargetRef.current;

      if (rowEl && ledgerEl && gridRect.height > 0) {
        const rowRect = rowEl.getBoundingClientRect();
        const ledgerRect = ledgerEl.getBoundingClientRect();
        const startY = Math.max(
          24,
          Math.min(340, rowRect.top - gridRect.top + rowRect.height / 2)
        );
        const endY = Math.max(
          24,
          Math.min(340, ledgerRect.top - gridRect.top + 88)
        );
        setConnectorCoord({ startY, endY });
      }
    };

    updateConnector();
    if (typeof ResizeObserver !== 'undefined' && boardGridRef.current) {
      const ro = new ResizeObserver(() => updateConnector());
      ro.observe(boardGridRef.current);
      return () => ro.disconnect();
    }
  }, [effectiveSelectedId, visibleSignals, sortOrder]);

  const handleToggleReview = () => {
    if (!selectedSignal) return;
    setSignals((prev) => toggleSignalReviewStatus(prev, selectedSignal.id));
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'RECENT' ? 'PRIORITY' : 'RECENT'));
  };

  const handleResetDemo = () => {
    setSignals(INITIAL_SIGNALS);
    onExternalCategoryChange('ALL');
    setSortOrder('RECENT');
    setSelectedId(INITIAL_SIGNALS[0].id);
    setCopyFeedback('DEMO STATE RESTORED TO INITIAL SAMPLE');
    window.setTimeout(() => setCopyFeedback(null), 2600);
  };

  const handleCopyBrief = async () => {
    if (!selectedSignal) return;
    const text = formatSignalBriefForClipboard(selectedSignal);

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyFeedback('SAMPLE BRIEF COPIED TO CLIPBOARD');
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Tested fallback for restricted iframe clipboard permissions
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', 'true');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopyFeedback('SAMPLE BRIEF COPIED TO CLIPBOARD');
      } catch {
        setCopyFeedback('SAMPLE BRIEF PREPARED IN BUFFER');
      }
    }

    window.setTimeout(() => {
      setCopyFeedback(null);
    }, 3000);
  };

  return (
    <section
      id="demo"
      aria-labelledby="demo-board-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#0E100C] border-b border-[#B9B28A]/38 py-20 sm:py-28 lg:py-36"
    >
      {/* Secondary anchor alias so #workflows also lands here cleanly */}
      <div id="workflows" className="absolute -top-20" aria-hidden="true" />

      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Top Kicker & Mandatory Concept Disclosure Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B9B28A]/35 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              004 / WORKFLOWS
            </span>
          </div>

          <div
            data-testid="demo-mandatory-label"
            className="border border-[#B9B28A]/50 bg-[#171814] px-3 py-1 font-mono-tech text-[11px] sm:text-xs tracking-[0.13em] text-[#F6F3EA] uppercase"
          >
            INTERACTIVE CONCEPT DEMO · SAMPLE DATA · NO LIVE CRM CONNECTION
          </div>
        </div>

        {/* Heading & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-7">
            <h2
              id="demo-board-heading"
              tabIndex={-1}
              className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(2rem,4.6vw,4.25rem)] leading-[0.94] tracking-[-0.02em] focus:outline-none"
            >
              FROM DETECTION TO DIRECTION.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4">
            <p className="font-prose-support text-base sm:text-lg text-[#D7D1B8] leading-relaxed lg:text-right">
              Explore a sample signal board. Every interaction happens in your browser with illustrative data.
            </p>
            <button
              type="button"
              onClick={() => setHelpDialogOpen(true)}
              data-testid="what-am-i-seeing-btn"
              className="inline-flex items-center gap-2 border border-[#B9B28A]/45 bg-[#171814] px-3.5 py-2 font-doto-ui text-xs text-[#B9B28A] uppercase tracking-[0.1em] hover:border-[#F6F3EA] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WHAT AM I SEEING?</span>
            </button>
          </div>
        </div>

        {/* Instrument Panel Controls Bar */}
        <div className="border border-[#B9B28A]/40 bg-[#171814] p-4 sm:p-5 mb-6">
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Category Filter Rail */}
            <LayoutGroup id="demo-category-chips">
              <div
                role="group"
                aria-label="Filter signals by category"
                className="flex flex-wrap items-center gap-2"
              >
                {SIGNAL_CATEGORIES.map((category) => {
                  const isActive = externalCategory === category;
                  const count =
                    category === 'ALL'
                      ? signals.length
                      : signals.filter((s) => s.category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      data-testid={`filter-chip-${category}`}
                      onClick={() => onExternalCategoryChange(category)}
                      className={`relative px-3.5 py-2 font-doto-ui text-xs tracking-[0.12em] uppercase transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] ${
                        isActive
                          ? 'text-[#0E100C]'
                          : 'text-[#D7D1B8] border border-[#B9B28A]/30 bg-[#0E100C] hover:border-[#B9B28A] hover:text-[#F6F3EA]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="demo-active-category-bg"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 28,
                          }}
                          className="absolute inset-0 bg-[#B9B28A]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-1.5">
                        <span>{category}</span>
                        <span className="font-mono-tech text-[10px] opacity-80">
                          [{count}]
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Right Sort, Counters & Reset Controls */}
            <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3 border-t xl:border-t-0 border-[#B9B28A]/20 pt-3 xl:pt-0">
              <div
                data-testid="demo-status-counters"
                className="font-mono-tech text-xs text-[#D7D1B8] uppercase tracking-[0.12em] px-2"
              >
                SHOWING <strong className="text-[#F6F3EA]">{visibleSignals.length}</strong> · REVIEWED{' '}
                <strong className="text-[#B9B28A]">{reviewedCount}</strong>/{signals.length}
              </div>

              <button
                type="button"
                onClick={handleToggleSort}
                data-testid="sort-toggle-btn"
                className="inline-flex items-center gap-2 border border-[#B9B28A]/45 bg-[#0E100C] px-3.5 py-2 font-doto-ui text-xs text-[#F6F3EA] uppercase tracking-[0.1em] hover:border-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-[#B9B28A]" aria-hidden="true" />
                <span>SORT: {sortOrder}</span>
              </button>

              <button
                type="button"
                onClick={handleResetDemo}
                data-testid="reset-demo-btn"
                className="inline-flex items-center gap-1.5 border border-[#B9B28A]/45 bg-[#0E100C] px-3.5 py-2 font-doto-ui text-xs text-[#D7D1B8] uppercase tracking-[0.1em] hover:border-[#F6F3EA] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>RESET DEMO</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Three-Zone Signal Instrument Architecture */}
        <div
          ref={boardGridRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch border border-[#B9B28A]/40 bg-[#171814]"
        >
          {/* Left Zone: Signal Stream List (Cols 1-5) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#B9B28A]/35 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#B9B28A]/25 pb-3 mb-4 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#B9B28A]">
                <span>DETECTED SAMPLE SIGNALS</span>
                <span>SELECT TO INSPECT</span>
              </div>

              <LayoutGroup id="signal-rows">
                <div className="space-y-3" role="listbox" aria-label="Sample signals">
                  {visibleSignals.map((sig) => {
                    const isSelected = sig.id === effectiveSelectedId;
                    const isReviewed = sig.status === 'REVIEWED';

                    return (
                      <motion.button
                        layout={!reducedMotion}
                        key={sig.id}
                        ref={(el) => {
                          rowRefs.current[sig.id] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        data-testid={`signal-row-${sig.id}`}
                        onClick={() => setSelectedId(sig.id)}
                        className={`group relative w-full text-left p-4 border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] ${
                          isSelected
                            ? 'bg-[#0E100C] border-[#F6F3EA] translate-x-0.5'
                            : 'bg-[#0E100C]/65 border-[#B9B28A]/30 hover:border-[#B9B28A] hover:bg-[#0E100C] hover:translate-x-0.5'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono-tech text-[11px] uppercase tracking-[0.12em] mb-1.5">
                          <span className="text-[#B9B28A]">
                            {sig.code} · {sig.category}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 border text-[10px] ${
                              isReviewed
                                ? 'border-[#B9B28A] bg-[#B9B28A]/20 text-[#F6F3EA]'
                                : 'border-[#B9B28A]/35 text-[#D7D1B8]'
                            }`}
                          >
                            {sig.status}
                          </span>
                        </div>

                        <div className="font-doto-ui text-base sm:text-lg text-[#F6F3EA] uppercase tracking-tight">
                          {sig.title}
                        </div>

                        <div className="mt-2 flex items-center justify-between font-mono-tech text-[11px] text-[#8C876B] uppercase">
                          <span>{sig.sampleTimeLabel}</span>
                          <span className="text-[#D7D1B8]">
                            {isSelected ? 'ACTIVE PATH ▶' : sig.priorityLabel}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <div className="mt-6 pt-3 border-t border-[#B9B28A]/20 font-mono-tech text-[11px] text-[#8C876B] uppercase tracking-[0.12em] flex items-center justify-between">
              <span> DETERMINISTIC ORDERING</span>
              <span>MODE: {sortOrder}</span>
            </div>
          </div>

          {/* Center Zone: Dynamic SVG Signal Flow Visualization (Cols 6-7 on Desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-between bg-[#0E100C] border-r border-[#B9B28A]/35 p-3 relative overflow-hidden">
            <div className="w-full text-center font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#B9B28A]/75 border-b border-[#B9B28A]/20 pb-2">
              SIGNAL VECTOR
            </div>

            <svg
              viewBox="0 0 160 360"
              className="w-full h-[360px] overflow-visible"
              aria-hidden="true"
            >
              {/* Background Schematic Guide Grid */}
              <line
                x1="80"
                y1="10"
                x2="80"
                y2="350"
                stroke="rgba(185, 178, 138, 0.18)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx="80"
                cy="180"
                r="34"
                fill="none"
                stroke="rgba(185, 178, 138, 0.22)"
                strokeWidth="1"
              />
              <circle
                cx="80"
                cy="180"
                r="14"
                fill="#171814"
                stroke="#B9B28A"
                strokeWidth="1.2"
              />

              {/* Active Computed Bezier Path from Selected Row to Context Ledger */}
              <path
                d={`M 0 ${connectorCoord.startY} C 65 ${connectorCoord.startY}, 95 ${connectorCoord.endY}, 160 ${connectorCoord.endY}`}
                fill="none"
                stroke="#B9B28A"
                strokeWidth="2"
              />

              {/* Start & End Anchor Squares */}
              <rect
                x="2"
                y={connectorCoord.startY - 5}
                width="10"
                height="10"
                fill="#F6F3EA"
              />
              <rect
                x="148"
                y={connectorCoord.endY - 5}
                width="10"
                height="10"
                fill="#B9B28A"
              />

              {/* Animated Signal Pulse Node along Path */}
              <circle
                cx="80"
                cy={(connectorCoord.startY + connectorCoord.endY) / 2}
                r="5"
                fill="#F6F3EA"
              />
            </svg>

            <div className="w-full text-center font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#B9B28A] border-t border-[#B9B28A]/20 pt-2">
              {selectedSignal ? selectedSignal.signalStrength : 'READY'}
            </div>
          </div>

          {/* Right Zone: Context & Next-Action Ledger (Cols 8-12) */}
          <div
            ref={ledgerTargetRef}
            className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between bg-[#0E100C]/90"
          >
            {selectedSignal ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSignal.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-6"
                >
                  {/* Ledger Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B9B28A]/30 pb-4">
                    <div>
                      <div className="font-mono-tech text-xs text-[#B9B28A] uppercase tracking-[0.14em]">
                        CONTEXT LEDGER // {selectedSignal.code}
                      </div>
                      <h3
                        data-testid="ledger-signal-title"
                        className="mt-1 font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight"
                      >
                        {selectedSignal.title}
                      </h3>
                    </div>

                    <span
                      data-testid="ledger-signal-status"
                      className={`px-2.5 py-1 font-mono-tech text-xs uppercase border ${
                        selectedSignal.status === 'REVIEWED'
                          ? 'border-[#F6F3EA] bg-[#B9B28A] text-[#0E100C] font-bold'
                          : 'border-[#B9B28A]/50 bg-[#171814] text-[#F6F3EA]'
                      }`}
                    >
                      STATUS: {selectedSignal.status}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border border-[#B9B28A]/25 bg-[#171814] p-3.5 font-mono-tech text-xs">
                    <div>
                      <div className="text-[10px] text-[#8C876B] uppercase">CATEGORY</div>
                      <div className="text-[#F6F3EA] mt-0.5">{selectedSignal.category}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8C876B] uppercase">PRIORITY</div>
                      <div className="text-[#B9B28A] mt-0.5">
                        {selectedSignal.priorityLabel}
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-[#8C876B] uppercase">TRACE SOURCE</div>
                      <div className="text-[#D7D1B8] mt-0.5 truncate">
                        {selectedSignal.traceOrigin}
                      </div>
                    </div>
                  </div>

                  {/* Explanatory Context */}
                  <div>
                    <div className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#B9B28A] mb-2">
                      OBSERVED SIGNAL CONTEXT
                    </div>
                    <p className="font-prose-support text-base text-[#D7D1B8] leading-relaxed">
                      {selectedSignal.contextSummary}
                    </p>
                  </div>

                  {/* Connected Threads */}
                  <div>
                    <div className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#B9B28A] mb-2">
                      LINKED ARTIFACTS (SAMPLE)
                    </div>
                    <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs text-[#D7D1B8]">
                      {selectedSignal.connectedThreads.map((thread, idx) => (
                        <React.Fragment key={thread}>
                          <span>{thread}</span>
                          {idx < selectedSignal.connectedThreads.length - 1 && (
                            <span aria-hidden="true" className="text-[#B9B28A]">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Next Move Box */}
                  <div className="border border-[#B9B28A]/55 bg-[#171814] p-4 sm:p-5">
                    <div className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#B9B28A] mb-1.5">
                      RECOMMENDED NEXT ACTION
                    </div>
                    <p className="font-prose-support text-base sm:text-lg font-medium text-[#F6F3EA] leading-snug">
                      {selectedSignal.suggestedNextAction}
                    </p>
                  </div>

                  {/* Ledger Interactive Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <MagneticButton
                      variant="primary"
                      size="md"
                      onClick={handleToggleReview}
                      dataTestId="mark-reviewed-btn"
                      icon={<Check className="h-4 w-4" />}
                    >
                      {selectedSignal.status === 'REVIEWED'
                        ? 'RESET STATUS'
                        : 'MARK REVIEWED'}
                    </MagneticButton>

                    <MagneticButton
                      variant="secondary"
                      size="md"
                      onClick={handleCopyBrief}
                      dataTestId="copy-sample-brief-btn"
                      icon={<Copy className="h-3.5 w-3.5" />}
                    >
                      COPY SAMPLE BRIEF
                    </MagneticButton>
                  </div>

                  {/* Honest Local Action Feedback Banner */}
                  {copyFeedback && (
                    <div
                      role="status"
                      aria-live="polite"
                      data-testid="copy-feedback-banner"
                      className="border border-[#B9B28A] bg-[#171814] px-3.5 py-2 font-mono-tech text-xs text-[#F6F3EA] uppercase tracking-[0.12em]"
                    >
                      ✓ {copyFeedback}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="py-12 text-center font-mono-tech text-sm text-[#B9B28A] uppercase">
                NO SAMPLE SIGNALS MATCH THIS FILTER. CLICK RESET DEMO TO RESTORE.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accessible Concept Disclosure Dialog ("WHAT AM I SEEING?") */}
      <AccessibleDialog
        isOpen={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        kicker="CONCEPT DISCLOSURE // OPENLANDING"
        title="WHAT AM I SEEING?"
      >
        <div className="space-y-4 font-prose-support text-base text-[#D7D1B8] leading-relaxed">
          <p>
            <strong className="text-[#F6F3EA]">FORUM</strong> is a fictional AI-native revenue intelligence product concept created for <strong className="text-[#F6F3EA]">OpenLanding</strong>.
          </p>
          <p>
            Every record, contact thread, priority index, and recommended action displayed in this Signal Board operates entirely in your browser memory using deterministic example data.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#B9B28A]">
            <li>No live CRM, email, or calendar integrations are connected.</li>
            <li>No background AI inference or external network calls occur when filtering or reviewing signals.</li>
            <li>All controls (filtering, sorting, reviewing, copying a sample brief, and resetting) demonstrate the interface mechanics honestly.</li>
          </ul>
          <div className="pt-4 border-t border-[#B9B28A]/30 flex justify-end">
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={() => setHelpDialogOpen(false)}
            >
              UNDERSTOOD
            </MagneticButton>
          </div>
        </div>
      </AccessibleDialog>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/components/forum/SignalManifesto.tsx">
<![CDATA['use client';
import React, { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { generateManifestoDots } from '../../lib/forum/demoData';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const SignalManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [manualStructured, setManualStructured] = useState<boolean>(false);
  const [scrollStructured, setScrollStructured] = useState<boolean>(false);

  const dots = useMemo(() => generateManifestoDots(72), []);
  const isStructured = reducedMotion || manualStructured || scrollStructured;

  // Apply dot positions whenever manualStructured changes or reducedMotion is active
  useGSAP(
    () => {
      if (!svgRef.current) return;
      const circleNodes = svgRef.current.querySelectorAll<SVGCircleElement>('.manifesto-node');
      const gridLines = svgRef.current.querySelectorAll<SVGElement>('.manifesto-grid-line');

      if (reducedMotion || manualStructured) {
        circleNodes.forEach((circle, idx) => {
          const d = dots[idx];
          if (!d) return;
          gsap.to(circle, {
            attr: { cx: d.gridX, cy: d.gridY },
            duration: reducedMotion ? 0 : 0.65,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
        gsap.to(gridLines, {
          opacity: 0.35,
          duration: reducedMotion ? 0 : 0.5,
          overwrite: 'auto',
        });
        return;
      }

      // When not manually locked, ScrollTrigger drives progress 0 -> 1 smoothly
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 55%',
            scrub: 0.5,
            onUpdate: (self) => {
              setScrollStructured(self.progress > 0.52);
            },
          },
        });

        circleNodes.forEach((circle, idx) => {
          const d = dots[idx];
          if (!d) return;
          tl.fromTo(
            circle,
            { attr: { cx: d.noiseX, cy: d.noiseY } },
            { attr: { cx: d.gridX, cy: d.gridY }, ease: 'power2.inOut' },
            0
          );
        });

        tl.fromTo(
          gridLines,
          { opacity: 0 },
          { opacity: 0.32, ease: 'power1.inOut' },
          0.35
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [dots, manualStructured, reducedMotion] }
  );

  const handleTogglePattern = () => {
    setManualStructured((prev) => {
      const next = !prev;
      if (!next && svgRef.current && !reducedMotion) {
        // Return nodes to dispersed state immediately when user toggles back off
        const circleNodes =
          svgRef.current.querySelectorAll<SVGCircleElement>('.manifesto-node');
        const gridLines =
          svgRef.current.querySelectorAll<SVGElement>('.manifesto-grid-line');
        circleNodes.forEach((circle, idx) => {
          const d = dots[idx];
          if (!d) return;
          gsap.to(circle, {
            attr: { cx: d.noiseX, cy: d.noiseY },
            duration: 0.55,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
        gsap.to(gridLines, { opacity: 0, duration: 0.35, overwrite: 'auto' });
        setScrollStructured(false);
      }
      return next;
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="manifesto-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] w-full bg-[#F6F3EA] text-[#171814] border-b border-[#171814]/25 py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-14">
        {/* Top Editorial Index Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#171814]/20 pb-5 mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#171814]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] uppercase text-[#171814]">
              001.5 / EDITORIAL MANIFESTO
            </span>
          </div>
          <div className="font-mono-tech text-xs tracking-[0.14em] uppercase text-[#171814]/75">
            ABSTRACT VISUAL METAPHOR · SIGNAL ALIGNMENT STUDY
          </div>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sparse Index Gutter */}
          <div className="lg:col-span-4 flex flex-col justify-between border-l border-[#171814]/25 pl-5 py-1 space-y-6">
            <div>
              <div className="font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[#171814]/65 mb-2">
                THESIS // OBSERVATION
              </div>
              <p className="font-prose-support text-base sm:text-lg leading-relaxed text-[#171814]/90">
                Conversations, relationships, and opportunities leave traces. FORUM brings those signals into one clear field of view.
              </p>
            </div>

            <div className="border-t border-[#171814]/20 pt-5 space-y-4">
              <div className="flex items-center justify-between font-mono-tech text-xs uppercase tracking-[0.14em]">
                <span className="text-[#171814]/70">SCHEMATIC STATE:</span>
                <span
                  data-testid="manifesto-state-label"
                  className="font-bold text-[#171814] bg-[#D7D1B8] px-2.5 py-1 border border-[#171814]/30"
                >
                  {isStructured ? 'STRUCTURED / 01' : 'UNSORTED / 00'}
                </span>
              </div>

              <MagneticButton
                variant="ivory-dark"
                size="md"
                ariaPressed={manualStructured}
                onClick={handleTogglePattern}
                dataTestId="view-pattern-btn"
                className="w-full sm:w-auto"
              >
                {manualStructured ? 'RESET TO NOISE' : 'VIEW PATTERN'}
              </MagneticButton>
            </div>
          </div>

          {/* Right Monumental Headline + Live Vector Schematic */}
          <div className="lg:col-span-8">
            <h2
              id="manifesto-heading"
              className="font-doto-display uppercase text-[#171814] text-[clamp(2rem,4.8vw,4.5rem)] leading-[0.94] tracking-[-0.02em] text-balance"
            >
              <span className="block">THE NOISE IS NOT THE PROBLEM.</span>
              <span className="block mt-1 text-[#8C876B]">THE PATTERN IS.</span>
            </h2>

            {/* Deterministic 72-Dot Scientific Print Schematic */}
            <div className="mt-10 sm:mt-12 border border-[#171814]/30 bg-[#F6F3EA] dither-grid-ivory p-4 sm:p-6 relative">
              <div className="flex items-center justify-between border-b border-[#171814]/15 pb-3 mb-4 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#171814]/75">
                <span>FIG 01 — 72-NODE FIELD TRANSFORMATION</span>
                <span>{isStructured ? 'COHERENT CONSTELLATION GRID' : 'DISPERSED SIGNAL TRACES'}</span>
              </div>

              <svg
                ref={svgRef}
                viewBox="0 0 720 320"
                className="w-full h-auto max-h-[340px] overflow-visible"
                role="img"
                aria-label="Abstract visual metaphor showing 72 dispersed signal nodes aligning into an ordered geometric grid"
              >
                {/* Horizontal & Vertical Reference Grid Lines (visible when structured) */}
                {[58, 98, 138, 178, 218, 258].map((y) => (
                  <line
                    key={`row-${y}`}
                    x1={70}
                    y1={y}
                    x2={642}
                    y2={y}
                    stroke="#171814"
                    strokeWidth="0.75"
                    strokeDasharray="3 3"
                    opacity={reducedMotion ? 0.32 : 0}
                    className="manifesto-grid-line"
                  />
                ))}
                {[70, 174, 278, 382, 486, 590, 642].map((x) => (
                  <line
                    key={`col-${x}`}
                    x1={x}
                    y1={58}
                    x2={x}
                    y2={258}
                    stroke="#171814"
                    strokeWidth="0.75"
                    opacity={reducedMotion ? 0.25 : 0}
                    className="manifesto-grid-line"
                  />
                ))}

                {/* 72 Deterministic Nodes */}
                {dots.map((dot) => (
                  <circle
                    key={dot.id}
                    cx={reducedMotion || manualStructured ? dot.gridX : dot.noiseX}
                    cy={reducedMotion || manualStructured ? dot.gridY : dot.noiseY}
                    r={dot.size}
                    fill={dot.isPrimary ? '#171814' : '#8C876B'}
                    className="manifesto-node"
                  />
                ))}
              </svg>

              <div className="mt-3 flex items-center justify-between border-t border-[#171814]/15 pt-3 font-mono-tech text-[11px] text-[#171814]/70 uppercase tracking-[0.12em]">
                <span>72 SAMPLE NODES · ZERO LIVE TELEMETRY</span>
                <span>SCROLL OR CLICK &quot;VIEW PATTERN&quot; TO ALIGN</span>
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
    <file path="src/app/(forum)/forum/components/forum/WideFieldInterlude.tsx">
<![CDATA['use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FORUM_ASSETS } from '../../lib/forum/assets';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export const WideFieldInterlude: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageLayerRef = useRef<HTMLDivElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        if (imageLayerRef.current) {
          tl.fromTo(
            imageLayerRef.current,
            { xPercent: -2, scale: 1.035 },
            { xPercent: 2, scale: 1, ease: 'none' },
            0
          );
        }

        if (titleWrapRef.current) {
          tl.fromTo(
            titleWrapRef.current,
            { y: 28, opacity: 0.35 },
            { y: 0, opacity: 1, ease: 'power2.out' },
            0.1
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="vision"
      ref={sectionRef}
      aria-labelledby="vision-heading"
      className="relative scroll-mt-[72px] lg:scroll-mt-[80px] min-h-[78svh] lg:min-h-[92svh] w-full overflow-hidden bg-[#0E100C] border-b border-[#B9B28A]/38 flex flex-col justify-between"
    >
      {/* Full-bleed Panoramic Production Plate (08-divider-wide.webp) */}
      <div
        ref={imageLayerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <ResilientImage
          asset={FORUM_ASSETS.dividerWide}
          className="h-full w-full object-[46%_52%] sm:object-[50%_52%]"
        />
        {/* Subtle vignette on top-left and bottom so typography reads effortlessly without obscuring the eclipse or pillars */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0E100C]/80 via-transparent to-[#0E100C]/90"
        />
      </div>

      {/* Top Architectural Margin Index */}
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 pt-8 sm:pt-12">
        <div className="flex items-center justify-between border-b border-[#B9B28A]/35 pb-4">
          <div className="flex items-center gap-3">
            <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              005 / THE WIDE FIELD
            </span>
          </div>
          <span className="font-mono-tech text-xs tracking-[0.14em] text-[#D7D1B8]/80 uppercase">
            HORIZON ALIGNMENT // PANORAMIC PLATE
          </span>
        </div>
      </div>

      {/* Bottom Architectural Editorial Statement */}
      <div
        ref={titleWrapRef}
        className="relative z-10 mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 pb-12 sm:pb-16 lg:pb-20 pt-32"
      >
        <div className="max-w-[920px]">
          <h2
            id="vision-heading"
            className="font-doto-display uppercase text-[#F6F3EA] text-[clamp(2.2rem,5.4vw,5.2rem)] leading-[0.92] tracking-[-0.02em] text-balance"
          >
            <span className="block">THE BIGGER PICTURE</span>
            <span className="block">WAS ALWAYS THERE.</span>
          </h2>
          <p className="mt-4 sm:mt-6 font-prose-support text-xl sm:text-2xl text-[#B9B28A] leading-relaxed">
            The difference is knowing where to look.
          </p>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(forum)/forum/lib/forum/assets.ts">
<![CDATA[export interface ForumAssetEntry {
  id: string;
  filename: string;
  src: string;
  fallbackSrc: string;
  width: number;
  height: number;
  aspectRatio: string;
  role: 'reference-only' | 'production-hero' | 'production-plate' | 'production-wide';
  alt: string;
  objectPositionDesktop: string;
  objectPositionMobile: string;
}

export const FORUM_ASSETS = {
  heroApprovedReference: {
    id: '01-hero-forum-approved',
    filename: '01-hero-forum-approved.webp',
    src: '/templates/forum/forum/01-hero-forum-approved.webp',
    fallbackSrc: '/templates/forum/01-hero-forum-approved.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'reference-only',
    alt: 'Approved hero design mockup reference (not displayed in live layout)',
    objectPositionDesktop: 'center center',
    objectPositionMobile: 'center center',
  },
  heroMonolithClean: {
    id: '02-hero-monolith-clean',
    filename: '02-hero-monolith-clean.webp',
    src: '/templates/forum/forum/02-hero-monolith-clean.webp',
    fallbackSrc: '/templates/forum/02-hero-monolith-clean.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'production-hero',
    alt: 'Monumental dithered black monolith occluding a solar eclipse with radiant khaki halo',
    objectPositionDesktop: '74% 50%',
    objectPositionMobile: '72% 38%',
  },
  cardSignalObservatory: {
    id: '03-card-signal-observatory',
    filename: '03-card-signal-observatory.webp',
    src: '/templates/forum/forum/03-card-signal-observatory.webp',
    fallbackSrc: '/templates/forum/03-card-signal-observatory.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Dithered circular orbital signal observatory dish aligned against a solar eclipse',
    objectPositionDesktop: '50% 48%',
    objectPositionMobile: '50% 45%',
  },
  cardNetworkField: {
    id: '04-card-network-field',
    filename: '04-card-network-field.webp',
    src: '/templates/forum/forum/04-card-network-field.webp',
    fallbackSrc: '/templates/forum/04-card-network-field.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Vast ordered perspective grid of signal nodes converging on a luminous horizon core',
    objectPositionDesktop: '50% 45%',
    objectPositionMobile: '50% 45%',
  },
  cardCommandInterface: {
    id: '05-card-command-interface',
    filename: '05-card-command-interface.webp',
    src: '/templates/forum/forum/05-card-command-interface.webp',
    fallbackSrc: '/templates/forum/05-card-command-interface.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Architectural command canyon flanking a suspended circular radar intelligence core',
    objectPositionDesktop: '50% 42%',
    objectPositionMobile: '50% 40%',
  },
  cardOrbitalArchive: {
    id: '06-card-orbital-archive',
    filename: '06-card-orbital-archive.webp',
    src: '/templates/forum/forum/06-card-orbital-archive.webp',
    fallbackSrc: '/templates/forum/06-card-orbital-archive.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Interconnected vertical towers and sweeping orbital archive rings around a distant star',
    objectPositionDesktop: '50% 50%',
    objectPositionMobile: '50% 50%',
  },
  cardAlignmentEngine: {
    id: '07-card-alignment-engine',
    filename: '07-card-alignment-engine.webp',
    src: '/templates/forum/forum/07-card-alignment-engine.webp',
    fallbackSrc: '/templates/forum/07-card-alignment-engine.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Central architectural pillar encircled by interlocking gyroscope alignment rings',
    objectPositionDesktop: '50% 50%',
    objectPositionMobile: '50% 50%',
  },
  dividerWide: {
    id: '08-divider-wide',
    filename: '08-divider-wide.webp',
    src: '/templates/forum/forum/08-divider-wide.webp',
    fallbackSrc: '/templates/forum/08-divider-wide.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'production-wide',
    alt: 'Panoramic landscape of monolithic pillars receding toward a horizon solar eclipse',
    objectPositionDesktop: '50% 52%',
    objectPositionMobile: '45% 50%',
  },
  footerMockupReference: {
    id: '09-footer-mockup',
    filename: '09-footer-mockup.webp',
    src: '/templates/forum/forum/09-footer-mockup.webp',
    fallbackSrc: '/templates/forum/09-footer-mockup.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'reference-only',
    alt: 'Approved final orbit and footer layout reference (not displayed in live layout)',
    objectPositionDesktop: 'center center',
    objectPositionMobile: 'center center',
  },
} as const satisfies Record<string, ForumAssetEntry>;

export type ForumAssetKey = keyof typeof FORUM_ASSETS;
]]>
    </file>
    <file path="src/app/(forum)/forum/lib/forum/demoData.ts">
<![CDATA[export type SignalCategory = 'CONTACT' | 'PIPELINE' | 'FOLLOW-UP' | 'FORECAST';
export type SignalFilterCategory = 'ALL' | SignalCategory;
export type SignalSortOrder = 'RECENT' | 'PRIORITY';
export type SignalStatus = 'ACTIVE' | 'REVIEWED';

export interface SignalRecord {
  id: string;
  code: string;
  title: string;
  category: SignalCategory;
  sampleTimeLabel: string;
  recencyRank: number; // lower = more recent
  priorityRank: number; // lower = higher priority
  priorityLabel: string;
  confidenceBand?: string;
  signalStrength: string;
  contextSummary: string;
  traceOrigin: string;
  connectedThreads: string[];
  suggestedNextAction: string;
  status: SignalStatus;
}

export const INITIAL_SIGNALS: SignalRecord[] = [
  {
    id: 'sig-contact-01',
    code: 'SIG // 01-C',
    title: 'Follow up with a warm prospect',
    category: 'CONTACT',
    sampleTimeLabel: 'SAMPLE · 14M AGO',
    recencyRank: 1,
    priorityRank: 2,
    priorityLabel: 'HIGH ALIGNMENT',
    signalStrength: '0.92 INDEX',
    contextSummary:
      'Three separate technical stakeholders revisited the architecture brief within 24 hours after two weeks of silence. Buying committee alignment is forming around deployment scope.',
    traceOrigin: 'inbound brief view + thread reply sequence',
    connectedThreads: [
      'Technical scope review notes',
      'Security questionnaire thread',
      'Q2 evaluation timeline',
    ],
    suggestedNextAction:
      'Send a concise implementation timeline summary directly to the technical lead before Friday.',
    status: 'ACTIVE',
  },
  {
    id: 'sig-pipeline-02',
    code: 'SIG // 02-P',
    title: 'Pipeline stage waiting for context',
    category: 'PIPELINE',
    sampleTimeLabel: 'SAMPLE · 2H AGO',
    recencyRank: 2,
    priorityRank: 1,
    priorityLabel: 'CRITICAL PATH',
    signalStrength: '0.96 INDEX',
    contextSummary:
      'An active mid-stage evaluation has remained in validation for 11 days without a logged decision owner. Recent meeting transcripts mention procurement review, but stage criteria remain incomplete.',
    traceOrigin: 'stage duration threshold + meeting note parse',
    connectedThreads: [
      'Validation stage checklist',
      'Procurement handoff note',
      'Executive sponsor intro',
    ],
    suggestedNextAction:
      'Confirm the named decision owner and attach the mutual evaluation schedule to unlock stage progression.',
    status: 'ACTIVE',
  },
  {
    id: 'sig-followup-03',
    code: 'SIG // 03-F',
    title: 'A scheduled check-in is overdue',
    category: 'FOLLOW-UP',
    sampleTimeLabel: 'SAMPLE · 1D AGO',
    recencyRank: 3,
    priorityRank: 3,
    priorityLabel: 'TIMING DRIFT',
    signalStrength: '0.84 INDEX',
    contextSummary:
      'A promised post-workshop follow-up window passed 36 hours ago while action items from the session remain unassigned across the account team.',
    traceOrigin: 'calendar cadence gap + open action item',
    connectedThreads: [
      'Workshop recap draft',
      'Integration requirements list',
      'Account owner handoff',
    ],
    suggestedNextAction:
      'Share the three-point workshop synthesis and confirm whether the technical sandbox requires extension.',
    status: 'ACTIVE',
  },
  {
    id: 'sig-forecast-04',
    code: 'SIG // 04-R',
    title: 'Forecast needs refreshed opportunity notes',
    category: 'FORECAST',
    sampleTimeLabel: 'SAMPLE · 3D AGO',
    recencyRank: 4,
    priorityRank: 4,
    priorityLabel: 'CALIBRATION',
    signalStrength: '0.79 INDEX',
    contextSummary:
      'Target close window is scheduled for the current quarter, but the last recorded stakeholder exchange occurred nine days ago prior to scope revision.',
    traceOrigin: 'close window proximity + activity delta',
    connectedThreads: [
      'Quarterly commit ledger',
      'Revised seat allocation draft',
      'Legal redline log',
    ],
    suggestedNextAction:
      'Verify revised rollout phasing with the account lead and update the commit confidence note.',
    status: 'ACTIVE',
  },
];

export const SIGNAL_CATEGORIES: SignalFilterCategory[] = [
  'ALL',
  'CONTACT',
  'PIPELINE',
  'FOLLOW-UP',
  'FORECAST',
];

export function filterAndSortSignals(
  signals: SignalRecord[],
  category: SignalFilterCategory,
  sortOrder: SignalSortOrder
): SignalRecord[] {
  const filtered =
    category === 'ALL'
      ? [...signals]
      : signals.filter((item) => item.category === category);

  filtered.sort((a, b) => {
    if (sortOrder === 'RECENT') {
      return a.recencyRank - b.recencyRank;
    }
    return a.priorityRank - b.priorityRank;
  });

  return filtered;
}

export function resolveSelectedSignalId(
  visibleSignals: SignalRecord[],
  currentSelectedId: string | null
): string | null {
  if (visibleSignals.length === 0) {
    return null;
  }
  if (currentSelectedId && visibleSignals.some((s) => s.id === currentSelectedId)) {
    return currentSelectedId;
  }
  return visibleSignals[0].id;
}

export function toggleSignalReviewStatus(
  signals: SignalRecord[],
  targetId: string
): SignalRecord[] {
  return signals.map((item) => {
    if (item.id !== targetId) return item;
    return {
      ...item,
      status: item.status === 'REVIEWED' ? 'ACTIVE' : 'REVIEWED',
    };
  });
}

export function formatSignalBriefForClipboard(signal: SignalRecord): string {
  return [
    `FORUM — SAMPLE SIGNAL BRIEF (CONCEPT DEMO)`,
    `ID: ${signal.code}`,
    `TITLE: ${signal.title}`,
    `CATEGORY: ${signal.category} (${signal.priorityLabel})`,
    `STATUS: ${signal.status}`,
    `CONTEXT: ${signal.contextSummary}`,
    `NEXT MOVE: ${signal.suggestedNextAction}`,
    `NOTE: Illustrative sample data — no live CRM connection.`,
  ].join('\n');
}

export interface ManifestoDot {
  id: number;
  noiseX: number;
  noiseY: number;
  gridX: number;
  gridY: number;
  size: number;
  isPrimary: boolean;
}

/**
 * Generates a deterministic set of 72 schematic nodes for Chapter 02 (#about).
 * Progress 0 -> dispersed visual noise; Progress 1 -> ordered constellation grid.
 */
export function generateManifestoDots(count = 72): ManifestoDot[] {
  const cols = 12;
  const rows = Math.ceil(count / cols);
  const dots: ManifestoDot[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Ordered grid coordinates in a 720x320 SVG viewBox
    const gridX = 70 + col * 52;
    const gridY = 58 + row * 40;

    // Deterministic pseudo-random dispersed noise using golden-angle / prime harmonics
    const seed1 = Math.sin((i + 1) * 12.9898) * 43758.5453;
    const frac1 = seed1 - Math.floor(seed1);
    const seed2 = Math.cos((i + 1) * 78.233) * 19341.1234;
    const frac2 = seed2 - Math.floor(seed2);

    const noiseX = Math.round(28 + frac1 * 664);
    const noiseY = Math.round(22 + frac2 * 276);

    dots.push({
      id: i,
      noiseX,
      noiseY,
      gridX,
      gridY,
      size: i % 6 === 0 ? 4.5 : 3,
      isPrimary: i % 6 === 0 || row === 2,
    });
  }

  return dots;
}
]]>
    </file>
    <file path="src/app/(forum)/forum/lib/forum/motion.ts">
<![CDATA[export const motionTokens = {
  press: { scale: 0.97, duration: 0.11 },
  hoverSpring: { stiffness: 260, damping: 24, mass: 0.55 },
  panelSpring: { stiffness: 170, damping: 23, mass: 0.9 },
  tiltMaxDeg: 4,
  magneticMaxPx: 10,
  textLineStaggerSeconds: 0.14,
  editorialRevealSeconds: 0.85,
} as const;

export function isCoarseOrTouchDevice(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(pointer: coarse), (hover: none)').matches;
}

export function scrollToSectionId(sectionId: string, focusSelector?: string): void {
  if (typeof document === 'undefined') return;
  const normalizedId = sectionId.replace(/^#/, '');
  const element = document.getElementById(normalizedId);
  if (!element) return;

  const prefersReduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  element.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'start',
  });

  if (focusSelector) {
    window.setTimeout(() => {
      const target = element.querySelector<HTMLElement>(focusSelector);
      if (target) {
        target.focus({ preventScroll: true });
      }
    }, prefersReduced ? 30 : 450);
  }
}
]]>
    </file>
  </files>
</template>

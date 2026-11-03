<template slug="penumbra" name="PENUMBRA">
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
    <file path="src/app/(penumbra)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./penumbra/penumbra.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const instrument_Serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "PENUMBRA — Architectural Lighting Practice",
  description: "Architecture, after dark. An independent architectural lighting design practice shaping how spaces are seen, felt, and remembered through light.",
  openGraph: {
    title: "PENUMBRA — Architectural Lighting Practice",
    description: "Architecture, after dark. An independent architectural lighting design practice shaping how spaces are seen, felt, and remembered through light.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111318",
};

export default function PenumbraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorant_Garamond.variable} ${instrument_Serif.variable} ${jetBrains_Mono.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-[#111318] text-[#F2EBE2] antialiased selection:bg-[#D7A779]/30 selection:text-[#F2EBE2]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/penumbra";

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
        className={`penumbra-placeholder ${className ?? ""}`}
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
    <file path="src/app/(penumbra)/penumbra/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#111318" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#F2EBE2" text-anchor="middle">P</text>
</svg>
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PENUMBRA — Architectural Lighting Practice";

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
          backgroundColor: "#111318",
          color: "#F2EBE2",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>PENUMBRA</span>
          <span style={{ color: "#D7A779" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            PENUMBRA — Architectural Lighting Practice
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Architecture, after dark. An independent architectural lighting design practice shaping how spaces are seen, felt, and remembered through light.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#D7A779" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/page.tsx">
<![CDATA["use client";

import PenumbraApp from "./PenumbraApp";

export default function PenumbraPage() {
  return <PenumbraApp />;
}
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/penumbra.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --ink: #111318;              /* midnight graphite */
  --slate: #1c2027;            /* quiet dark surface */
  --slate-raised: #232832;     /* raised surface step */
  --ivory: #F2EBE2;            /* primary foreground */
  --amber: #D7A779;            /* architectural warm accent */
  --amber-bright: #E9BB86;     /* specular highlight */
  --steel: #7E91A8;            /* blue hour twilight */
  --stone: #A6A29F;            /* secondary neutral */
  --line: rgba(242, 235, 226, 0.10);
  --ease-craft: cubic-bezier(0.22, 1, 0.36, 1);

  --font-serif: var(--font-instrument-serif), 'Instrument Serif', var(--font-cormorant-garamond), 'Cormorant Garamond', Georgia, serif;
  --font-sans: var(--font-manrope), 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: var(--font-jetbrains-mono), 'JetBrains Mono', monospace;
}

@layer base {
  html {
    background-color: var(--ink);
    color: var(--ivory);
    font-family: var(--font-sans);
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--ink);
    color: var(--ivory);
    overflow-x: hidden;
  }
}

.font-display {
  font-family: var(--font-serif);
}

.font-sans-editorial {
  font-family: var(--font-sans);
}

.font-mono-tech {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

/* Shared Hero Image Stage — guarantees identical registration */
.hero-image-stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--ink);
  user-select: none;
}

.hero-image-stage .shared-stage-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 54% center;
  pointer-events: none;
}

@media (max-width: 767px) {
  .hero-image-stage .shared-stage-image {
    object-position: 58% center;
  }
}

/* Native CSS radial mask for the signature spotlight reveal */
.illuminated-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  --spot-x: 52%;
  --spot-y: 56%;
  --spot-r: 260px;
  mask-image: radial-gradient(
    circle var(--spot-r) at var(--spot-x) var(--spot-y),
    #000 0%,
    #000 38%,
    rgba(0, 0, 0, 0.9) 49%,
    rgba(0, 0, 0, 0.65) 65%,
    rgba(0, 0, 0, 0.25) 82%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle var(--spot-r) at var(--spot-x) var(--spot-y),
    #000 0%,
    #000 38%,
    rgba(0, 0, 0, 0.9) 49%,
    rgba(0, 0, 0, 0.65) 65%,
    rgba(0, 0, 0, 0.25) 82%,
    transparent 100%
  );
  pointer-events: none;
  will-change: mask-image, -webkit-mask-image, opacity;
}

.illuminated-layer.is-full-reveal {
  mask-image: none;
  -webkit-mask-image: none;
}

/* Subtle warm atmospheric scattering layer synced with spotlight */
.ambient-scatter-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  --spot-x: 52%;
  --spot-y: 56%;
  --spot-r: 260px;
  background: radial-gradient(
    circle calc(var(--spot-r) * 1.15) at var(--spot-x) var(--spot-y),
    rgba(215, 167, 121, 0.08) 0%,
    rgba(215, 167, 121, 0.02) 55%,
    transparent 100%
  );
  pointer-events: none;
}

/* Custom Range Input for Light Lab */
input[type='range'].penumbra-slider {
  -webkit-appearance: none;
  appearance: none;
  background: rgba(242, 235, 226, 0.12);
  height: 2px;
  border-radius: 999px;
  cursor: pointer;
}

input[type='range'].penumbra-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--amber-bright);
  border: 1.5px solid var(--ink);
  box-shadow: 0 0 0 1px rgba(215, 167, 121, 0.35);
  transition: transform 120ms cubic-bezier(0.22, 1, 0.36, 1), background-color 120ms ease;
}

input[type='range'].penumbra-slider::-webkit-slider-thumb:hover {
  transform: scale(1.12);
  background: var(--ivory);
}

input[type='range'].penumbra-slider:focus-visible {
  outline: 2px solid var(--amber-bright);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/PenumbraApp.tsx">
<![CDATA['use client';

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { SelectedProjects } from './components/SelectedProjects';
import { Practice } from './components/Practice';
import { LightLab } from './components/LightLab';
import { Process } from './components/Process';
import { ContactFooter } from './components/ContactFooter';
import { useReducedMotion } from './hooks/useReducedMotion';
import {
  SpotlightMode,
  LightLabState,
  DEFAULT_LIGHT_LAB_STATE,
} from './lib/motion';
import { ConceptProject } from './lib/projectData';

export default function PenumbraApp() {
  const reducedMotion = useReducedMotion();

  const [spotlightMode, setSpotlightMode] = useState<SpotlightMode>('intro');
  const [illuminationVisible, setIlluminationVisible] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<ConceptProject | null>(null);
  const [lightLab, setLightLab] = useState<LightLabState>(DEFAULT_LIGHT_LAB_STATE);
  const [contactTopic, setContactTopic] = useState<string | undefined>(undefined);

  const handleToggleIllumination = useCallback(() => {
    setIlluminationVisible((prev) => {
      const next = !prev;
      setSpotlightMode(next ? 'toggle' : 'pointer');
      return next;
    });
  }, []);

  const handleNavigate = useCallback((targetId: string) => {
    setIsMobileNavOpen(false);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: Math.max(0, rect.top + scrollTop - headerOffset),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [reducedMotion]);

  const handleNavigateToContact = useCallback(
    (projectTitle?: string) => {
      if (projectTitle) {
        setContactTopic(projectTitle);
      }
      handleNavigate('contact');
    },
    [handleNavigate]
  );

  return (
    <div className="min-h-screen bg-[#111318] text-[#F2EBE2] selection:bg-[#D7A779]/30 selection:text-[#F2EBE2]">
      <Header
        isMobileNavOpen={isMobileNavOpen}
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        onNavigate={handleNavigate}
      />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onNavigate={handleNavigate}
      />

      <main>
        <Hero
          reducedMotion={reducedMotion}
          illuminationVisible={illuminationVisible}
          onToggleIllumination={handleToggleIllumination}
          spotlightMode={spotlightMode}
          onSpotlightModeChange={setSpotlightMode}
          onNavigate={handleNavigate}
        />

        <SelectedProjects
          activeProject={activeProject}
          onSelectProject={setActiveProject}
          onNavigateToContact={handleNavigateToContact}
        />

        <Practice />

        <LightLab
          state={lightLab}
          onChange={setLightLab}
          onReset={() => setLightLab(DEFAULT_LIGHT_LAB_STATE)}
        />

        <Process reducedMotion={reducedMotion} />
      </main>

      <ContactFooter
        initialProjectTopic={contactTopic}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/ContactFooter.tsx">
<![CDATA['use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowUp, Mail, Check, Copy } from 'lucide-react';
import {
  ContactDraft,
  validateContactInquiry,
  buildContactMailtoUri,
} from '../lib/motion';

interface ContactFooterProps {
  initialProjectTopic?: string;
  onNavigate: (targetId: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  initialProjectTopic,
  onNavigate,
}) => {
  const [isComposerOpen, setIsComposerOpen] = useState<boolean>(false);
  const [draft, setDraft] = useState<ContactDraft>({
    name: '',
    email: '',
    projectType: initialProjectTopic || 'Cultural / Architectural Pavilion',
    timeline: '2026–2027',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDraft, string>>>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    if (initialProjectTopic) {
      setDraft((prev) => ({
        ...prev,
        projectType: `${initialProjectTopic} Study Inquiry`,
      }));
      setIsComposerOpen(true);
    }
  }, [initialProjectTopic]);

  const handleFieldChange = (field: keyof ContactDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setPreparedMailto(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactInquiry(draft);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedMailto(null);
      return;
    }

    setErrors({});
    const mailtoUri = buildContactMailtoUri(draft);
    setPreparedMailto(mailtoUri);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText('hello@penumbra.example');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(true);
    }
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779]">
              05 / Commission
            </span>

            <h2
              id="contact-heading"
              className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-tight text-[#F2EBE2]"
            >
              <span className="block">Let&apos;s shape</span>
              <span className="block italic text-[#E9BB86]">the night</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#A6A29F] max-w-lg leading-relaxed">
              Every extraordinary space deserves an extraordinary night. Tell us what you are imagining.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsComposerOpen((prev) => !prev)}
                aria-expanded={isComposerOpen}
                aria-controls="inquiry-composer-panel"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs tracking-wider uppercase bg-[#D7A779] text-[#111318] font-medium hover:bg-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F2EBE2]"
              >
                <span>Start a conversation</span>
                <ArrowUpRight className="w-4 h-4 text-[#111318]" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            {/* Direct Studio Email */}
            <div className="mt-10 pt-6 border-t border-[#F2EBE2]/10 flex flex-wrap items-center gap-6">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-wider text-[#A6A29F]">
                  Studio dispatch
                </p>
                <a
                  href="mailto:hello@penumbra.example?subject=PENUMBRA%20Architectural%20Lighting%20Inquiry"
                  className="mt-1 inline-flex items-center gap-2 font-mono-tech text-sm sm:text-base text-[#F2EBE2] hover:text-[#E9BB86] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                  <span>hello@penumbra.example</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider border border-[#F2EBE2]/16 bg-[#1c2027] text-[#A6A29F] hover:text-[#F2EBE2] hover:border-[#D7A779] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#E9BB86]" strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-[#E9BB86]">Address copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#A6A29F]" strokeWidth={1.5} aria-hidden="true" />
                    <span>Copy address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Composer */}
          <div
            id="inquiry-composer-panel"
            className="lg:col-span-5 bg-[#1c2027] border border-[#F2EBE2]/10 p-6 sm:p-7"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EBE2]/10">
              <h3 className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779]">
                Project brief
              </h3>
              <span className="font-mono-tech text-xs text-[#A6A29F]">
                Inquiry
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2] mb-1"
                >
                  Name or studio *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={draft.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="e.g. Atelier Moreau"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="w-full px-3.5 py-2 text-sm bg-[#111318] border border-[#F2EBE2]/16 text-[#F2EBE2] placeholder:text-[#A6A29F]/40 focus:border-[#D7A779] focus:outline-none"
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1 text-xs text-[#E9BB86]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2] mb-1"
                >
                  Return email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={draft.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="studio@practice.example"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="w-full px-3.5 py-2 text-sm bg-[#111318] border border-[#F2EBE2]/16 text-[#F2EBE2] placeholder:text-[#A6A29F]/40 focus:border-[#D7A779] focus:outline-none"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-1 text-xs text-[#E9BB86]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="contact-typology"
                    className="block font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2] mb-1"
                  >
                    Typology
                  </label>
                  <select
                    id="contact-typology"
                    value={draft.projectType}
                    onChange={(e) => handleFieldChange('projectType', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#111318] border border-[#F2EBE2]/16 text-[#F2EBE2] focus:border-[#D7A779] focus:outline-none"
                  >
                    <option value="Cultural Pavilion">Cultural Pavilion</option>
                    <option value="Private Residence">Private Residence</option>
                    <option value="Public Realm">Public Realm</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-timeline"
                    className="block font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2] mb-1"
                  >
                    Timeline
                  </label>
                  <input
                    id="contact-timeline"
                    type="text"
                    value={draft.timeline}
                    onChange={(e) => handleFieldChange('timeline', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#111318] border border-[#F2EBE2]/16 text-[#F2EBE2] focus:border-[#D7A779] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2] mb-1"
                >
                  Brief *
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={draft.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder="Describe the space and lighting intent..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className="w-full px-3.5 py-2 text-sm bg-[#111318] border border-[#F2EBE2]/16 text-[#F2EBE2] placeholder:text-[#A6A29F]/40 focus:border-[#D7A779] focus:outline-none"
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="mt-1 text-xs text-[#E9BB86]">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-mono-tech uppercase tracking-wider bg-[#F2EBE2] text-[#111318] font-medium hover:bg-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
              >
                <span>Send inquiry</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              </button>

              {preparedMailto && (
                <div role="status" className="p-3 bg-[#111318] border border-[#D7A779]/40 space-y-1">
                  <p className="font-mono-tech text-xs text-[#E9BB86]">
                    Inquiry draft ready.
                  </p>
                  <a
                    href={preparedMailto}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-wider text-[#F2EBE2] underline decoration-[#D7A779] underline-offset-4 hover:text-[#E9BB86]"
                  >
                    <span>Open in mail client ↗</span>
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#F2EBE2]/10 bg-[#111318]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="font-display text-xl tracking-wider text-[#F2EBE2]"
          >
            PENUMBRA
          </a>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-xs font-mono-tech uppercase tracking-wider text-[#A6A29F]"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('projects');
              }}
              className="hover:text-[#F2EBE2] transition-colors"
            >
              Projects
            </a>
            <a
              href="#practice"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('practice');
              }}
              className="hover:text-[#F2EBE2] transition-colors"
            >
              Practice
            </a>
            <a
              href="#light-lab"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('light-lab');
              }}
              className="hover:text-[#F2EBE2] transition-colors"
            >
              Light Lab
            </a>
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('process');
              }}
              className="hover:text-[#F2EBE2] transition-colors"
            >
              Approach
            </a>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider text-[#F2EBE2] border border-[#F2EBE2]/18 bg-[#1c2027] hover:border-[#D7A779] hover:text-[#E9BB86] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/Header.tsx">
<![CDATA['use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  onNavigate: (targetId: string) => void;
  onOpenContactDialog?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMobileNavOpen,
  onToggleMobileNav,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    onNavigate(targetId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#111318]/92 backdrop-blur-md border-b border-[#F2EBE2]/10'
          : 'bg-[#111318]/40 backdrop-blur-xs border-b border-[#F2EBE2]/08'
      }`}
    >
      <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-8 px-6 md:px-12 h-[72px]">
        {/* Wordmark without trailing period */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-2xl tracking-wider text-[#F2EBE2] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
        >
          PENUMBRA
        </a>

        {/* Clean, quiet navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase text-[#A6A29F]"
        >
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, 'projects')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Projects
          </a>
          <a
            href="#practice"
            onClick={(e) => handleLinkClick(e, 'practice')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Practice
          </a>
          <a
            href="#process"
            onClick={(e) => handleLinkClick(e, 'process')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Approach
          </a>
          <a
            href="#light-lab"
            onClick={(e) => handleLinkClick(e, 'light-lab')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Light Lab
          </a>
          <a
            href="#journal"
            onClick={(e) => handleLinkClick(e, 'journal')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Journal
          </a>
        </nav>

        {/* Quiet primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase text-[#F2EBE2] border border-[#F2EBE2]/18 bg-[#1c2027] hover:border-[#D7A779] hover:text-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#F2EBE2] border border-[#F2EBE2]/18 bg-[#1c2027] hover:border-[#D7A779] transition-colors focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-2"
          >
            {isMobileNavOpen ? (
              <X className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/Hero.tsx">
<![CDATA['use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sun, Focus } from 'lucide-react';
import { SpotlightReveal } from './SpotlightReveal';
import { useSpotlight } from '../hooks/useSpotlight';
import { SpotlightMode } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  reducedMotion: boolean;
  illuminationVisible: boolean;
  onToggleIllumination: () => void;
  spotlightMode: SpotlightMode;
  onSpotlightModeChange: (mode: SpotlightMode) => void;
  onNavigate: (targetId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  reducedMotion,
  illuminationVisible,
  onToggleIllumination,
  spotlightMode,
  onSpotlightModeChange,
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const maskLayerRef = useRef<HTMLDivElement | null>(null);
  const scatterLayerRef = useRef<HTMLDivElement | null>(null);
  const cursorIndicatorRef = useRef<HTMLDivElement | null>(null);
  const editorialContentRef = useRef<HTMLDivElement | null>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement | null>(null);
  const subcopyRef = useRef<HTMLDivElement | null>(null);

  const [hasMovedPointer, setHasMovedPointer] = useState(false);
  const [touchSweepActive, setTouchSweepActive] = useState(false);

  const { updatePointerFromClient, handlePointerLeave, setScrollProgress } = useSpotlight({
    stageRef,
    maskLayerRef,
    scatterLayerRef,
    cursorIndicatorRef,
    reducedMotion,
    illuminationVisible,
    mode: spotlightMode,
    onModeChange: onSpotlightModeChange,
    onFirstPointerMove: () => setHasMovedPointer(true),
  });

  const handleHeroPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen' || touchSweepActive) {
      updatePointerFromClient(e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (headlineLine1Ref.current && headlineLine2Ref.current) {
          tl.fromTo(
            [headlineLine1Ref.current, headlineLine2Ref.current],
            { yPercent: 24, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
            0.1
          );
        }
        if (subcopyRef.current) {
          tl.fromTo(
            subcopyRef.current,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75 },
            0.38
          );
        }
      }

      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top top',
          end: '+=55%',
          pin: true,
          scrub: 0.35,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            if (editorialContentRef.current) {
              const p = self.progress;
              editorialContentRef.current.style.transform = `translate3d(0, ${Math.round(
                -p * 36
              )}px, 0)`;
              editorialContentRef.current.style.opacity = `${Math.max(0.12, 1 - p * 0.88)}`;
            }
          },
        });
      });

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            setScrollProgress(Math.min(1, self.progress * 1.35));
          },
        });
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, setScrollProgress]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Architecture, after dark"
      className="relative w-full min-h-[640px] h-[100dvh] overflow-hidden bg-[#111318] select-none"
    >
      {/* Base & Illuminated Stage */}
      <div className="absolute inset-0 z-0">
        <SpotlightReveal
          stageRef={stageRef}
          imageWrapperRef={imageWrapperRef}
          maskLayerRef={maskLayerRef}
          scatterLayerRef={scatterLayerRef}
          cursorIndicatorRef={cursorIndicatorRef}
          illuminationVisible={illuminationVisible}
          onPointerMove={(e) => {
            if (e.pointerType === 'mouse' || e.pointerType === 'pen' || touchSweepActive) {
              updatePointerFromClient(e.clientX, e.clientY);
            }
          }}
          onPointerLeave={handlePointerLeave}
          onRevealLoad={() => ScrollTrigger.refresh()}
        />
      </div>

      {/* Scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#111318]/85 via-[#111318]/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#111318] via-transparent to-[#111318]/30"
      />

      {/* Hero Editorial Lockup */}
      <div className="relative z-20 mx-auto max-w-[1440px] h-full px-6 md:px-12 pt-24 pb-8 md:pb-10 flex flex-col justify-between pointer-events-none">
        {/* Distilled top studio line */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F2EBE2]/10">
          <p className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779]">
            Independent lighting practice · Est. 2026
          </p>
        </div>

        {/* Headline & Subhead */}
        <div ref={editorialContentRef} className="my-auto max-w-3xl py-6 will-change-transform">
          <h1 className="font-display text-[3.25rem] sm:text-[4.5rem] md:text-[5.75rem] lg:text-[6.5rem] leading-[0.96] tracking-tight text-[#F2EBE2]">
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine1Ref} className="block">
                Architecture,
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine2Ref} className="block italic text-[#E9BB86]">
                after dark
              </span>
            </span>
          </h1>

          <div ref={subcopyRef} className="mt-6 md:mt-8 max-w-lg">
            <p className="text-base sm:text-lg text-[#F2EBE2] font-light leading-relaxed">
              We shape how spaces are seen, felt, and remembered through light.
            </p>

            {/* Clean 2-action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
              <a
                href="#projects"
                onClick={(e) => handleAnchorClick(e, 'projects')}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-wider uppercase bg-[#F2EBE2] text-[#111318] font-medium hover:bg-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
              >
                <span>Explore work</span>
                <ArrowUpRight className="w-4 h-4 text-[#111318]" strokeWidth={1.5} aria-hidden="true" />
              </a>

              <a
                href="#process"
                onClick={(e) => handleAnchorClick(e, 'process')}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-wider uppercase text-[#F2EBE2] border border-[#F2EBE2]/20 bg-[#1c2027]/70 hover:border-[#D7A779] hover:text-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
              >
                <span>Our approach</span>
              </a>
            </div>
          </div>
        </div>

        {/* Distilled Bottom Bar */}
        <div className="pt-4 border-t border-[#F2EBE2]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto">
          <span
            className={`font-mono-tech text-xs tracking-wider uppercase transition-opacity duration-300 ${
              hasMovedPointer || illuminationVisible
                ? 'text-[#A6A29F]'
                : 'text-[#E9BB86]'
            }`}
          >
            Move to reveal lighting
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTouchSweepActive((prev) => !prev)}
              aria-pressed={touchSweepActive}
              className="md:hidden inline-flex items-center gap-2 px-3.5 py-2 text-xs tracking-wider uppercase border border-[#F2EBE2]/18 bg-[#1c2027] text-[#F2EBE2] hover:border-[#D7A779] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
            >
              <Focus className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
              <span>{touchSweepActive ? 'Touch sweep: On' : 'Touch sweep'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleIllumination}
              aria-pressed={illuminationVisible}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-2 ${
                illuminationVisible
                  ? 'border-[#E9BB86] bg-[#D7A779]/20 text-[#E9BB86]'
                  : 'border-[#F2EBE2]/18 bg-[#1c2027] text-[#F2EBE2] hover:border-[#D7A779]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
              <span>{illuminationVisible ? 'Restore blue hour' : 'Reveal lighting'}</span>
            </button>

            <a
              href="#projects"
              onClick={(e) => handleAnchorClick(e, 'projects')}
              className="hidden lg:inline-flex items-center gap-1.5 font-mono-tech text-xs tracking-wider uppercase text-[#A6A29F] hover:text-[#F2EBE2] transition-colors pl-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
            >
              <span>Scroll</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/LightLab.tsx">
<![CDATA['use client';

import React from 'react';
import { RotateCcw, Sliders, Compass, Thermometer } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import {
  LightLabState,
  ColorTemperature,
  DEFAULT_LIGHT_LAB_STATE,
  computeLightLabVisuals,
  HERO_BASE,
  HERO_REVEAL,
} from '../lib/motion';

interface LightLabProps {
  state: LightLabState;
  onChange: (next: LightLabState) => void;
  onReset: () => void;
}

export const LightLab: React.FC<LightLabProps> = ({ state, onChange, onReset }) => {
  const visuals = computeLightLabVisuals(state);

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...state,
      intensity: Number(e.target.value),
    });
  };

  const handleTemperatureChange = (temperature: ColorTemperature) => {
    onChange({
      ...state,
      temperature,
    });
  };

  const handleDirectionChange = (direction: number) => {
    onChange({
      ...state,
      direction: Math.max(-60, Math.min(60, direction)),
    });
  };

  const isDefault =
    state.intensity === DEFAULT_LIGHT_LAB_STATE.intensity &&
    state.temperature === DEFAULT_LIGHT_LAB_STATE.temperature &&
    state.direction === DEFAULT_LIGHT_LAB_STATE.direction;

  return (
    <section
      id="light-lab"
      aria-labelledby="light-lab-heading"
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="light-lab-heading">
          <SectionHeading
            label="03 / Light lab"
            headline="See what light can do"
            intro="An interactive study of intensity, warmth, and direction."
          />
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left/Top: Architectural Stage */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-[#111318] border border-[#F2EBE2]/10 overflow-hidden">
            {/* Top Telemetry Bar */}
            <div className="px-5 py-3 border-b border-[#F2EBE2]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech">
              <div className="flex items-center gap-3">
                <span className="text-[#D7A779] uppercase tracking-wider">Calibration stage</span>
                <span aria-hidden="true" className="text-[#A6A29F]">
                  ·
                </span>
                <span className="text-[#F2EBE2]">{visuals.kelvinLabel}</span>
              </div>
              <div className="flex items-center gap-4 text-[#A6A29F] tabular-nums">
                <span>Output: {state.intensity}%</span>
                <span>Vector: {state.direction > 0 ? `+${state.direction}°` : `${state.direction}°`}</span>
              </div>
            </div>

            {/* Registered 16:9 Architectural Preview Stage */}
            <div
              className="relative w-full aspect-video overflow-hidden bg-[#111318]"
              data-testid="light-lab-stage"
            >
              <img
                src={HERO_BASE}
                alt="Unlit architectural base"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              <div
                aria-hidden="true"
                style={{
                  opacity: visuals.revealOpacity,
                  filter: visuals.filterCss,
                  maskImage: visuals.directionalMaskCss,
                  WebkitMaskImage: visuals.directionalMaskCss,
                }}
                className="absolute inset-0 w-full h-full transition-opacity duration-150"
              >
                <img
                  src={HERO_REVEAL}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div
                aria-hidden="true"
                style={{
                  backgroundColor: visuals.tintOverlayColor,
                  opacity: visuals.revealOpacity * 0.75,
                }}
                className="pointer-events-none absolute inset-0 mix-blend-color transition-colors duration-200"
              />

              <div
                aria-hidden="true"
                style={{ left: `${visuals.beamSweepXPercent}%` }}
                className="pointer-events-none absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#E9BB86]/70 via-[#D7A779]/20 to-transparent transition-all duration-150"
              >
                <span className="absolute top-3 -translate-x-1/2 px-2 py-0.5 bg-[#111318]/90 border border-[#E9BB86]/40 font-mono-tech text-xs text-[#E9BB86] tabular-nums whitespace-nowrap">
                  {state.direction}°
                </span>
              </div>
            </div>

            {/* Bottom Readout */}
            <div className="px-5 py-2.5 border-t border-[#F2EBE2]/10 bg-[#111318] flex items-center justify-between text-xs text-[#A6A29F]">
              <span className="font-mono-tech">Interactive photometric study</span>
              <span className="font-mono-tech text-[#E9BB86] tabular-nums">
                Est. {visuals.footcandleEstimate}
              </span>
            </div>
          </div>

          {/* Right: Tactile Control Console */}
          <div className="lg:col-span-4 bg-[#1c2027] border border-[#F2EBE2]/10 p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Control 1: Intensity Slider */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="light-lab-intensity"
                    className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2]"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    <span>Intensity</span>
                  </label>
                  <span className="font-mono-tech text-sm text-[#E9BB86] tabular-nums">
                    {state.intensity}%
                  </span>
                </div>
                <input
                  id="light-lab-intensity"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={state.intensity}
                  onChange={handleIntensityChange}
                  className="w-full penumbra-slider"
                />
              </div>

              {/* Control 2: Color Temperature */}
              <div className="pt-4 border-t border-[#F2EBE2]/10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2]">
                    <Thermometer className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    <span>Temperature</span>
                  </span>
                  <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                    {visuals.cctValue}K
                  </span>
                </div>

                <div
                  role="group"
                  aria-label="Color Temperature"
                  className="grid grid-cols-3 gap-2 p-1 bg-[#111318] border border-[#F2EBE2]/10"
                >
                  {(
                    [
                      { id: 'cool', label: 'Cool', kelvin: '4200K' },
                      { id: 'neutral', label: 'Neutral', kelvin: '3200K' },
                      { id: 'warm', label: 'Warm', kelvin: '2700K' },
                    ] as const
                  ).map((option) => {
                    const active = state.temperature === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleTemperatureChange(option.id)}
                        aria-pressed={active}
                        className={`py-1.5 px-2 text-center transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] ${
                          active
                            ? 'bg-[#D7A779] text-[#111318] font-medium'
                            : 'text-[#A6A29F] hover:text-[#F2EBE2] hover:bg-[#1c2027]'
                        }`}
                      >
                        <span className="block text-xs tracking-wider uppercase">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Control 3: Direction */}
              <div className="pt-4 border-t border-[#F2EBE2]/10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="light-lab-direction"
                    className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#F2EBE2]"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    <span>Direction</span>
                  </label>
                  <span className="font-mono-tech text-xs text-[#E9BB86] tabular-nums">
                    {state.direction > 0 ? `+${state.direction}°` : `${state.direction}°`}
                  </span>
                </div>

                <input
                  id="light-lab-direction"
                  type="range"
                  min={-60}
                  max={60}
                  step={1}
                  value={state.direction}
                  onChange={(e) => handleDirectionChange(Number(e.target.value))}
                  className="w-full penumbra-slider"
                />

                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {[
                    { label: '-42°', angle: -42 },
                    { label: '0°', angle: 0 },
                    { label: '+42°', angle: 42 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleDirectionChange(preset.angle)}
                      className={`py-1.5 px-1 font-mono-tech text-xs border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] ${
                        state.direction === preset.angle
                          ? 'border-[#D7A779] text-[#E9BB86] bg-[#111318]'
                          : 'border-[#F2EBE2]/12 text-[#A6A29F] hover:text-[#F2EBE2] hover:bg-[#111318]/50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4 border-t border-[#F2EBE2]/10">
              <button
                type="button"
                onClick={onReset}
                disabled={isDefault}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono-tech uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] ${
                  isDefault
                    ? 'border-[#F2EBE2]/10 text-[#A6A29F]/40 cursor-not-allowed'
                    : 'border-[#F2EBE2]/20 text-[#F2EBE2] hover:border-[#D7A779] hover:text-[#E9BB86] bg-[#111318]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                <span>Reset scene</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/MobileNav.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onNavigate }) => {
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onClose();
    onNavigate(id);
  };

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className="fixed inset-0 z-40 md:hidden bg-[#111318]/96 backdrop-blur-xl pt-24 pb-10 px-6 flex flex-col justify-between border-b border-[#F2EBE2]/10"
    >
      <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#F2EBE2]/10">
        <a
          ref={firstLinkRef}
          href="#projects"
          onClick={(e) => handleSelect(e, 'projects')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Projects
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">01</span>
        </a>
        <a
          href="#practice"
          onClick={(e) => handleSelect(e, 'practice')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Practice
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">02</span>
        </a>
        <a
          href="#light-lab"
          onClick={(e) => handleSelect(e, 'light-lab')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Light in motion
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">03</span>
        </a>
        <a
          href="#process"
          onClick={(e) => handleSelect(e, 'process')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Approach
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">04</span>
        </a>
        <a
          href="#journal"
          onClick={(e) => handleSelect(e, 'journal')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Journal
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F]">Essay</span>
        </a>
      </nav>

      <div className="pt-6 border-t border-[#F2EBE2]/10 flex flex-col gap-4">
        <p className="text-xs tracking-wider uppercase text-[#A6A29F]">
          Independent lighting practice · Est. 2026
        </p>
        <a
          href="#contact"
          onClick={(e) => handleSelect(e, 'contact')}
          className="inline-flex items-center justify-between px-5 py-3.5 text-xs tracking-wider uppercase bg-[#D7A779] text-[#111318] font-medium hover:bg-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors focus-visible:outline-2 focus-visible:outline-[#F2EBE2]"
        >
          <span>Start a project</span>
          <ArrowUpRight className="w-4 h-4 text-[#111318]" strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/Practice.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { PRACTICE_PRINCIPLES } from '../lib/projectData';
import { HERO_BASE, HERO_REVEAL } from '../lib/motion';

export const Practice: React.FC = () => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState<number>(1);

  return (
    <section
      id="practice"
      aria-labelledby="practice-heading"
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="practice-heading">
          <SectionHeading
            label="02 / Practice"
            headline="Light is never just light"
            intro="It defines a threshold, reveals texture, and gives architecture a second life after sunset."
          />
        </div>

        {/* Three Editorial Principles + Visual Material Study */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Three Editorial Principles List */}
          <div className="lg:col-span-7 divide-y divide-[#F2EBE2]/10 border-t border-b border-[#F2EBE2]/10">
            {PRACTICE_PRINCIPLES.map((item, idx) => {
              const isSelected = activePrincipleIndex === idx;
              return (
                <div
                  key={item.number}
                  className={`py-7 md:py-8 transition-colors ${
                    isSelected ? 'bg-[#1c2027] px-6 -mx-6 border-l-2 border-[#D7A779]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActivePrincipleIndex(idx)}
                    aria-expanded={isSelected}
                    className="w-full text-left group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779] tabular-nums">
                        {item.number}
                      </span>
                      <span className="font-mono-tech text-xs text-[#A6A29F]">
                        {item.opticalNote}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#E9BB86] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm sm:text-base text-[#A6A29F] leading-relaxed max-w-xl">
                      {item.summary}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: Tactile Material Close-up & Phase Study */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1c2027] border border-[#F2EBE2]/10 p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#F2EBE2]/10">
              <span className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779]">
                Material study · Concrete formwork
              </span>
              <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                0{activePrincipleIndex + 1} / 03
              </span>
            </div>

            <div className="relative my-5 h-64 sm:h-72 overflow-hidden bg-[#111318] border border-[#F2EBE2]/10">
              <img
                src={HERO_BASE}
                alt="Architectural concrete study"
                loading="lazy"
                style={{
                  objectPosition:
                    activePrincipleIndex === 0
                      ? '22% 45%'
                      : activePrincipleIndex === 1
                      ? '46% 62%'
                      : '78% 64%',
                  transform: 'scale(1.36)',
                }}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
              />
              <img
                src={HERO_REVEAL}
                alt=""
                aria-hidden="true"
                loading="lazy"
                style={{
                  objectPosition:
                    activePrincipleIndex === 0
                      ? '22% 45%'
                      : activePrincipleIndex === 1
                      ? '46% 62%'
                      : '78% 64%',
                  transform: 'scale(1.36)',
                  opacity: activePrincipleIndex === 0 ? 0.25 : activePrincipleIndex === 1 ? 0.88 : 1,
                }}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-transparent to-transparent"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono-tech text-[#F2EBE2]">
                <span>
                  {activePrincipleIndex === 0
                    ? 'Phase I · Blue Hour'
                    : activePrincipleIndex === 1
                    ? 'Phase II · Graze & Relief'
                    : 'Phase III · Warm Core'}
                </span>
                <span className="text-[#E9BB86] tabular-nums">
                  {activePrincipleIndex === 0
                    ? '4200K'
                    : activePrincipleIndex === 1
                    ? '2650K'
                    : '2400K'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-tech text-[#A6A29F]">
              <span>Interactive stage</span>
              <span className="text-[#D7A779]">Click principles to compare</span>
            </div>
          </div>
        </div>

        {/* Distilled Studio Monograph Note (#journal) */}
        <div
          id="journal"
          className="mt-16 md:mt-20 pt-8 border-t border-[#F2EBE2]/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          <div className="lg:col-span-4">
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779]">
              Studio journal · Note 01
            </span>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl text-[#F2EBE2]">
              In Praise of the Unlit Surface
            </h3>
          </div>

          <div className="lg:col-span-8 text-base text-[#A6A29F] leading-relaxed">
            <p className="text-[#F2EBE2] text-lg font-light leading-relaxed">
              “Architecture only floats when the eye can read the shadow beneath it. We concentrate warm 2400K–2700K illumination along structural seams—leaving over sixty percent of the building envelope in natural twilight quiet.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/Process.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from './SectionHeading';
import { PROCESS_STAGES } from '../lib/projectData';

gsap.registerPlugin(ScrollTrigger);

interface ProcessProps {
  reducedMotion: boolean;
}

export const Process: React.FC<ProcessProps> = ({ reducedMotion }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 65%',
        end: 'bottom 55%',
        scrub: 0.25,
        onUpdate: (self) => {
          if (progressLineRef.current) {
            progressLineRef.current.style.transform = `scaleX(${self.progress.toFixed(3)})`;
          }
          const idx = Math.min(
            PROCESS_STAGES.length - 1,
            Math.floor(self.progress * PROCESS_STAGES.length)
          );
          setActiveStepIndex(idx);
        },
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="process-heading">
          <SectionHeading
            label="04 / Approach"
            headline="From first shadow to final glow"
            intro="Four deliberate phases from initial twilight observation to evening commissioning."
          />
        </div>

        {/* Timeline Bar */}
        <div className="mt-12 md:mt-16">
          <div className="relative h-px w-full bg-[#F2EBE2]/10 overflow-hidden">
            <div
              ref={progressLineRef}
              style={{ transform: reducedMotion ? 'scaleX(1)' : 'scaleX(0.25)' }}
              className="origin-left h-full w-full bg-[#D7A779] transition-transform duration-150"
            />
          </div>

          {/* Four Stages Grid */}
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PROCESS_STAGES.map((stage, idx) => {
              const isIlluminated = reducedMotion || idx <= activeStepIndex;
              return (
                <li
                  key={stage.step}
                  className={`flex flex-col justify-between p-6 border transition-colors duration-200 ${
                    isIlluminated
                      ? 'border-[#D7A779]/50 bg-[#1c2027]'
                      : 'border-[#F2EBE2]/10 bg-[#111318]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F2EBE2]/10">
                      <span
                        className={`font-mono-tech text-xs tracking-wider uppercase tabular-nums ${
                          isIlluminated ? 'text-[#E9BB86]' : 'text-[#A6A29F]'
                        }`}
                      >
                        Stage {stage.step}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveStepIndex(idx)}
                        className="font-mono-tech text-xs uppercase tracking-wider text-[#A6A29F] hover:text-[#F2EBE2] focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                      >
                        {idx === activeStepIndex ? 'Active' : 'View'}
                      </button>
                    </div>

                    <h3 className="mt-4 font-display text-3xl text-[#F2EBE2]">
                      {stage.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#A6A29F] leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#F2EBE2]/10 flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-[#D7A779] uppercase tracking-wider">{stage.deliverable}</span>
                    <span className="text-[#A6A29F]">{stage.luxTarget}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/SectionHeading.tsx">
<![CDATA['use client';

import React from 'react';

interface SectionHeadingProps {
  label: string;
  headline: string;
  intro?: string;
  align?: 'left' | 'split';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  headline,
  intro,
  align = 'split',
}) => {
  return (
    <div className="pb-10 md:pb-14 border-b border-[#F2EBE2]/10">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono-tech text-xs tracking-wider uppercase text-[#D7A779]">
          {label}
        </span>
        <span className="h-px flex-1 max-w-24 bg-[#F2EBE2]/10" aria-hidden="true" />
      </div>

      {align === 'split' && intro ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <h2 className="lg:col-span-7 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F2EBE2] leading-[1.04] text-balance">
            {headline}
          </h2>
          <p className="lg:col-span-5 text-base text-[#A6A29F] leading-relaxed max-w-xl">
            {intro}
          </p>
        </div>
      ) : (
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F2EBE2] leading-[1.04] text-balance">
            {headline}
          </h2>
          {intro && (
            <p className="mt-4 text-base text-[#A6A29F] leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/SelectedProjects.tsx">
<![CDATA['use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, SlidersHorizontal } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { CONCEPT_PROJECTS, ConceptProject } from '../lib/projectData';
import { HERO_BASE, HERO_REVEAL } from '../lib/motion';

interface SelectedProjectsProps {
  activeProject: ConceptProject | null;
  onSelectProject: (project: ConceptProject | null) => void;
  onNavigateToContact: (projectTitle?: string) => void;
}

const ArchitecturalDiagram: React.FC<{ type: ConceptProject['diagramType'] }> = ({ type }) => {
  if (type === 'cantilever-graze') {
    return (
      <svg
        viewBox="0 0 360 130"
        className="w-full h-28 text-[#F2EBE2]"
        role="img"
        aria-label="Section diagram showing linear knife-edge soffit cove and vertical concrete grazing"
      >
        <line x1="16" y1="112" x2="344" y2="112" stroke="rgba(242,235,226,0.18)" strokeWidth="1" />
        <rect
          x="44"
          y="32"
          width="210"
          height="18"
          fill="#1c2027"
          stroke="rgba(242,235,226,0.3)"
          strokeWidth="1"
        />
        <rect
          x="130"
          y="50"
          width="36"
          height="62"
          fill="#1c2027"
          stroke="rgba(242,235,226,0.3)"
          strokeWidth="1"
        />
        <line x1="48" y1="50" x2="248" y2="50" stroke="#E9BB86" strokeWidth="2" />
        <polygon points="126,110 112,50 130,50" fill="rgba(215,167,121,0.22)" />
        <polygon points="170,110 166,50 186,50" fill="rgba(215,167,121,0.22)" />
        <text x="50" y="24" fill="#A6A29F" fontSize="9" fontFamily="monospace">
          2650K Soffit knife-edge
        </text>
        <text x="196" y="90" fill="#D7A779" fontSize="9" fontFamily="monospace">
          14:1 Asymmetric graze
        </text>
      </svg>
    );
  }

  if (type === 'interior-reflection') {
    return (
      <svg
        viewBox="0 0 360 130"
        className="w-full h-28 text-[#F2EBE2]"
        role="img"
        aria-label="Section diagram showing ceiling framing optics on interior stone boulder behind low-iron glass"
      >
        <line x1="16" y1="112" x2="344" y2="112" stroke="rgba(242,235,226,0.18)" strokeWidth="1" />
        <line x1="40" y1="20" x2="320" y2="20" stroke="rgba(242,235,226,0.24)" strokeWidth="1" />
        <line
          x1="116"
          y1="20"
          x2="116"
          y2="112"
          stroke="#7E91A8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M196 112 L206 68 L244 58 L276 76 L284 112 Z"
          fill="rgba(215,167,121,0.18)"
          stroke="#E9BB86"
          strokeWidth="1.2"
        />
        <polygon points="222,20 192,112 286,112" fill="rgba(215,167,121,0.14)" />
        <circle cx="222" cy="20" r="2.5" fill="#E9BB86" />
        <text x="42" y="66" fill="#7E91A8" fontSize="9" fontFamily="monospace">
          Low-iron glass
        </text>
        <text x="190" y="38" fill="#D7A779" fontSize="9" fontFamily="monospace">
          2400K Framing optic
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 130"
      className="w-full h-28 text-[#F2EBE2]"
      role="img"
      aria-label="Section diagram showing shielded low-level bollard casting downward light across water edge"
    >
      <line x1="16" y1="88" x2="195" y2="88" stroke="rgba(242,235,226,0.3)" strokeWidth="1.5" />
      <line x1="195" y1="88" x2="195" y2="112" stroke="rgba(242,235,226,0.3)" strokeWidth="1.5" />
      <line x1="195" y1="102" x2="344" y2="102" stroke="#7E91A8" strokeWidth="1.5" />
      <rect x="154" y="60" width="8" height="28" fill="#D7A779" />
      <line
        x1="80"
        y1="60"
        x2="270"
        y2="60"
        stroke="rgba(242,235,226,0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <polygon points="158,64 95,88 225,102" fill="rgba(215,167,121,0.2)" />
      <text x="82" y="50" fill="#A6A29F" fontSize="9" fontFamily="monospace">
        0% Uplight cutoff
      </text>
      <text x="208" y="82" fill="#D7A779" fontSize="9" fontFamily="monospace">
        2200K Water reflection
      </text>
    </svg>
  );
};

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({
  activeProject,
  onSelectProject,
  onNavigateToContact,
}) => {
  const [studyMix, setStudyMix] = useState<Record<string, boolean>>({
    'solace-pavilion': true,
    'nocturne-house': true,
    'meridian-walk': true,
  });

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSelectProject(null);
        lastTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [activeProject, onSelectProject]);

  const toggleCardLighting = (id: string) => {
    setStudyMix((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="projects-heading">
          <SectionHeading
            label="01 / Projects"
            headline="Light changes everything"
            intro="Three studies in how illumination shapes the experience of architecture."
          />
        </div>

        {/* Staggered Project Studies */}
        <div className="mt-12 md:mt-16 space-y-16 md:space-y-20">
          {CONCEPT_PROJECTS.map((project, idx) => {
            const isLit = studyMix[project.id] ?? true;
            const isEven = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-8 border-t border-[#F2EBE2]/10 first:border-t-0 first:pt-0"
              >
                {/* Photographic Crop Stage */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  } relative group overflow-hidden bg-[#1c2027] border border-[#F2EBE2]/10 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={HERO_BASE}
                      alt={`${project.title} study crop`}
                      loading="lazy"
                      style={{
                        objectPosition: project.focalCropPosition,
                        transform: `scale(${project.focalScale})`,
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.22]"
                    />
                    <img
                      src={HERO_REVEAL}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      style={{
                        objectPosition: project.focalCropPosition,
                        transform: `scale(${project.focalScale})`,
                        opacity: isLit ? 1 : 0.08,
                      }}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.22]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-transparent to-[#111318]/30"
                    />
                  </div>

                  {/* Top Bar */}
                  <div className="relative z-10 p-4 px-5 flex items-center justify-between gap-4">
                    <span className="font-mono-tech text-xs tracking-wider uppercase text-[#F2EBE2]">
                      {project.studyLabel}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleCardLighting(project.id)}
                      aria-pressed={isLit}
                      className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono-tech tracking-wider uppercase bg-[#111318]/85 text-[#F2EBE2] border border-[#F2EBE2]/18 hover:border-[#D7A779] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                      <span>{isLit ? 'Lit' : 'Unlit'}</span>
                    </button>
                  </div>

                  {/* Bottom Readout */}
                  <div className="relative z-10 p-3 px-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F2EBE2]/10 bg-[#111318]/70 backdrop-blur-xs">
                    <span className="font-mono-tech text-xs text-[#E9BB86] tabular-nums">
                      {project.kelvinProfile}
                    </span>
                    <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                      {project.contrastRatio}
                    </span>
                  </div>
                </div>

                {/* Specification Column */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  } flex flex-col justify-between py-2`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-xs tracking-wider uppercase text-[#A6A29F]">
                      <span className="font-mono-tech text-[#D7A779] tabular-nums">{project.index}</span>
                      <span aria-hidden="true">—</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="mt-3 font-display text-3xl sm:text-4xl text-[#F2EBE2] tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-[#A6A29F] leading-relaxed">
                      {project.conceptSummary}
                    </p>

                    {/* Section Diagram */}
                    <div className="mt-5 p-3 bg-[#1c2027] border border-[#F2EBE2]/10">
                      <ArchitecturalDiagram type={project.diagramType} />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F2EBE2]/10 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        lastTriggerRef.current = e.currentTarget;
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase bg-[#1c2027] text-[#F2EBE2] border border-[#F2EBE2]/20 hover:border-[#D7A779] hover:text-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                    >
                      <span>Inspect study</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    </button>

                    <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                      {project.index} / 03
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#111318]/90 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onSelectProject(null);
              lastTriggerRef.current?.focus();
            }
          }}
        >
          <div className="relative w-full max-w-3xl bg-[#1c2027] border border-[#F2EBE2]/18 text-[#F2EBE2] my-auto overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#F2EBE2]/10 bg-[#111318]">
              <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-wider text-[#D7A779]">
                <span className="tabular-nums">{activeProject.index}</span>
                <span aria-hidden="true">·</span>
                <span>{activeProject.studyLabel}</span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  onSelectProject(null);
                  lastTriggerRef.current?.focus();
                }}
                aria-label={`Close ${activeProject.title} details`}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider text-[#F2EBE2] border border-[#F2EBE2]/18 hover:border-[#D7A779] transition-colors focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
              >
                <span>Close</span>
                <X className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#F2EBE2]/10">
              <div className="relative h-48 sm:h-56 overflow-hidden border-b sm:border-b-0 sm:border-r border-[#F2EBE2]/10">
                <img
                  src={HERO_BASE}
                  alt={`${activeProject.title} unlit`}
                  style={{
                    objectPosition: activeProject.focalCropPosition,
                    transform: `scale(${activeProject.focalScale})`,
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#111318]/85 text-xs font-mono-tech uppercase tracking-wider text-[#A6A29F]">
                  Blue hour
                </span>
              </div>

              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={HERO_REVEAL}
                  alt={`${activeProject.title} lit`}
                  style={{
                    objectPosition: activeProject.focalCropPosition,
                    transform: `scale(${activeProject.focalScale})`,
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#111318]/85 text-xs font-mono-tech uppercase tracking-wider text-[#E9BB86] tabular-nums">
                  {activeProject.kelvinProfile}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-5 bg-[#111318]">
              <div>
                <h3 id="project-dialog-title" className="font-display text-3xl text-[#F2EBE2]">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-sm text-[#A6A29F] leading-relaxed">
                  {activeProject.lightingStrategy}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EBE2]/10">
                <h4 className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779] mb-2.5">
                  Deliverables
                </h4>
                <ul className="space-y-1.5 text-xs text-[#F2EBE2]">
                  {activeProject.services.map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <span className="text-[#D7A779] font-mono-tech">—</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F2EBE2]/10 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const title = activeProject.title;
                    onSelectProject(null);
                    onNavigateToContact(title);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase bg-[#D7A779] text-[#111318] font-medium hover:bg-[#E9BB86] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#F2EBE2]"
                >
                  <span>Discuss this typology</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/components/SpotlightReveal.tsx">
<![CDATA['use client';

import React from 'react';
import { HERO_BASE, HERO_REVEAL } from '../lib/motion';

interface SpotlightRevealProps {
  stageRef: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef: React.RefObject<HTMLDivElement | null>;
  maskLayerRef: React.RefObject<HTMLDivElement | null>;
  scatterLayerRef: React.RefObject<HTMLDivElement | null>;
  cursorIndicatorRef: React.RefObject<HTMLDivElement | null>;
  illuminationVisible: boolean;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  onBaseLoad?: () => void;
  onRevealLoad?: () => void;
}

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({
  stageRef,
  imageWrapperRef,
  maskLayerRef,
  scatterLayerRef,
  cursorIndicatorRef,
  illuminationVisible,
  onPointerMove,
  onPointerLeave,
  onBaseLoad,
  onRevealLoad,
}) => {
  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-image-stage"
      data-testid="hero-image-stage"
    >
      {/* Common shared transform wrapper so base and illuminated layers NEVER drift out of registration */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        {/* Layer 0: Base unlit blue-hour architectural photograph */}
        <img
          src={HERO_BASE}
          alt="Modern concrete architecture at blue hour before lighting"
          onLoad={onBaseLoad}
          fetchPriority="high"
          decoding="async"
          className="shared-stage-image"
        />

        {/* Layer 1: Identically aligned warmly illuminated architectural photograph */}
        <div
          ref={maskLayerRef}
          className={`illuminated-layer ${illuminationVisible ? 'is-full-reveal' : ''}`}
          aria-hidden="true"
        >
          <img
            src={HERO_REVEAL}
            alt=""
            onLoad={onRevealLoad}
            fetchPriority="high"
            decoding="async"
            className="shared-stage-image"
          />
        </div>

        {/* Layer 2: Extremely subtle warm atmospheric scattering synced to spotlight center */}
        <div
          ref={scatterLayerRef}
          className="ambient-scatter-layer"
          aria-hidden="true"
        />
      </div>

      {/* Subtle, non-intrusive amber focal reticle for desktop pointer exploration */}
      <div
        ref={cursorIndicatorRef}
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-0 left-0 -ml-2 -mt-2 w-4 h-4 rounded-full border border-[#E9BB86]/45 bg-[#D7A779]/15 opacity-0 transition-opacity duration-300"
      />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/hooks/useReducedMotion.ts">
<![CDATA[import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
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
    <file path="src/app/(penumbra)/penumbra/hooks/useSpotlight.ts">
<![CDATA[import { useEffect, useRef, useCallback } from 'react';
import {
  SpotlightMode,
  stepSpotlightInertia,
  computeRelativePointerPosition,
  computeMaxCornerRadius,
  getResponsiveSpotlightRadius,
  resolveSpotlightRadius,
  buildRadialMaskGradient,
} from '../lib/motion';

interface UseSpotlightOptions {
  stageRef: React.RefObject<HTMLDivElement | null>;
  maskLayerRef: React.RefObject<HTMLDivElement | null>;
  scatterLayerRef: React.RefObject<HTMLDivElement | null>;
  cursorIndicatorRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
  illuminationVisible: boolean;
  mode: SpotlightMode;
  onModeChange: (nextMode: SpotlightMode) => void;
  onFirstPointerMove?: () => void;
}

export function useSpotlight({
  stageRef,
  maskLayerRef,
  scatterLayerRef,
  cursorIndicatorRef,
  reducedMotion,
  illuminationVisible,
  mode,
  onModeChange,
  onFirstPointerMove,
}: UseSpotlightOptions) {
  // Imperative refs to prevent 60fps React re-renders
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0, r: 260, opacity: 0.85 });
  const stageSizeRef = useRef({ width: 1440, height: 900, baseRadius: 260 });
  const pointerActiveRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const introProgressRef = useRef(reducedMotion ? 1 : 0.15);
  const scrollProgressRef = useRef(0);
  const modeRef = useRef<SpotlightMode>(mode);
  const illuminationVisibleRef = useRef(illuminationVisible);
  const isVisibleInViewportRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  modeRef.current = mode;
  illuminationVisibleRef.current = illuminationVisible;

  const applyMaskStyles = useCallback(
    (x: number, y: number, radiusPx: number, opacity: number, fullReveal: boolean) => {
      const maskEl = maskLayerRef.current;
      const scatterEl = scatterLayerRef.current;
      const cursorEl = cursorIndicatorRef.current;

      if (maskEl) {
        if (fullReveal) {
          maskEl.classList.add('is-full-reveal');
          maskEl.style.maskImage = 'none';
          maskEl.style.webkitMaskImage = 'none';
          maskEl.style.opacity = '1';
        } else {
          maskEl.classList.remove('is-full-reveal');
          const gradient = buildRadialMaskGradient(x, y, radiusPx);
          maskEl.style.setProperty('--spot-x', `${Math.round(x)}px`);
          maskEl.style.setProperty('--spot-y', `${Math.round(y)}px`);
          maskEl.style.setProperty('--spot-r', `${Math.round(radiusPx)}px`);
          maskEl.style.maskImage = gradient;
          maskEl.style.webkitMaskImage = gradient;
          maskEl.style.opacity = opacity.toFixed(3);
        }
      }

      if (scatterEl) {
        scatterEl.style.setProperty('--spot-x', `${Math.round(x)}px`);
        scatterEl.style.setProperty('--spot-y', `${Math.round(y)}px`);
        scatterEl.style.setProperty('--spot-r', `${Math.round(radiusPx)}px`);
        scatterEl.style.opacity = fullReveal ? '0.35' : (opacity * 0.9).toFixed(3);
      }

      if (cursorEl) {
        const showIndicator =
          pointerActiveRef.current &&
          !fullReveal &&
          scrollProgressRef.current < 0.08 &&
          !reducedMotion;
        cursorEl.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
        cursorEl.style.opacity = showIndicator ? '1' : '0';
      }
    },
    [maskLayerRef, scatterLayerRef, cursorIndicatorRef, reducedMotion]
  );

  const measureStage = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const baseRadius = getResponsiveSpotlightRadius(window.innerWidth);
    stageSizeRef.current = { width, height, baseRadius };

    // Default architectural focal point: warm concrete cantilever & boulder gallery (52% X, 56% Y)
    if (!hasInteractedRef.current) {
      const defaultX = width * 0.52;
      const defaultY = height * 0.56;
      targetRef.current = { x: defaultX, y: defaultY };
      smoothRef.current.x = defaultX;
      smoothRef.current.y = defaultY;
      smoothRef.current.r = baseRadius * 0.85;
    }
  }, [stageRef]);

  // Expose imperative setter for GSAP ScrollTrigger progress (0..1)
  const setScrollProgress = useCallback(
    (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      scrollProgressRef.current = clamped;

      if (illuminationVisibleRef.current) return;

      if (clamped >= 0.98) {
        if (modeRef.current !== 'complete') {
          modeRef.current = 'complete';
          onModeChange('complete');
        }
      } else if (clamped > 0.02) {
        if (modeRef.current !== 'scroll') {
          modeRef.current = 'scroll';
          onModeChange('scroll');
        }
      } else if (modeRef.current === 'scroll' || modeRef.current === 'complete') {
        modeRef.current = 'pointer';
        onModeChange('pointer');
      }

      // Immediately compute and apply when driven by scroll for zero-lag sync
      const { width, height, baseRadius } = stageSizeRef.current;
      const maxCornerRadius = computeMaxCornerRadius(
        smoothRef.current.x,
        smoothRef.current.y,
        width,
        height
      );
      const resolved = resolveSpotlightRadius({
        mode: modeRef.current,
        baseRadius,
        maxCornerRadius,
        scrollProgress: clamped,
        introProgress: introProgressRef.current,
        pointerActive: pointerActiveRef.current,
        illuminationVisible: illuminationVisibleRef.current,
      });

      applyMaskStyles(
        smoothRef.current.x,
        smoothRef.current.y,
        resolved.radiusPx,
        resolved.opacity,
        resolved.fullReveal
      );
    },
    [applyMaskStyles, onModeChange]
  );

  // Update pointer coordinates from hero-local pointer or touch events
  const updatePointerFromClient = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const pos = computeRelativePointerPosition(clientX, clientY, rect);
      targetRef.current = { x: pos.x, y: pos.y };
      pointerActiveRef.current = true;

      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        onFirstPointerMove?.();
      }

      if (
        modeRef.current === 'intro' &&
        scrollProgressRef.current <= 0.02 &&
        !illuminationVisibleRef.current
      ) {
        modeRef.current = 'pointer';
        onModeChange('pointer');
      }
    },
    [stageRef, onFirstPointerMove, onModeChange]
  );

  const handlePointerLeave = useCallback(() => {
    pointerActiveRef.current = false;
  }, []);

  // Main animation loop & intro choreography
  useEffect(() => {
    measureStage();

    const handleResize = () => {
      measureStage();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Pause RAF when hero is scrolled completely out of view
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && stageRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            isVisibleInViewportRef.current = entry.isIntersecting;
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(stageRef.current);
    }

    const startTimestamp = performance.now();
    lastTimeRef.current = startTimestamp;

    const tick = (now: number) => {
      const deltaSeconds = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!document.hidden && isVisibleInViewportRef.current) {
        const elapsed = (now - startTimestamp) / 1000;
        if (!reducedMotion && introProgressRef.current < 1) {
          // Smoothly bloom initial architectural light over first 1.6s
          const rawIntro = Math.min(1, elapsed / 1.6);
          introProgressRef.current = 1 - Math.pow(1 - rawIntro, 3);
          if (rawIntro >= 1 && modeRef.current === 'intro') {
            modeRef.current = 'pointer';
          }
        } else {
          introProgressRef.current = 1;
        }

        const { width, height, baseRadius } = stageSizeRef.current;

        if (reducedMotion) {
          smoothRef.current.x = targetRef.current.x;
          smoothRef.current.y = targetRef.current.y;
        } else {
          // When pointer hasn't moved yet, impart a very subtle breathing drift around the architectural cantilever
          if (!hasInteractedRef.current && scrollProgressRef.current < 0.02) {
            targetRef.current.x = width * 0.52 + Math.sin(elapsed * 0.7) * 28;
            targetRef.current.y = height * 0.56 + Math.cos(elapsed * 0.55) * 14;
          }
          smoothRef.current.x = stepSpotlightInertia(
            smoothRef.current.x,
            targetRef.current.x,
            deltaSeconds,
            10
          );
          smoothRef.current.y = stepSpotlightInertia(
            smoothRef.current.y,
            targetRef.current.y,
            deltaSeconds,
            10
          );
        }

        const maxCornerRadius = computeMaxCornerRadius(
          smoothRef.current.x,
          smoothRef.current.y,
          width,
          height
        );

        const resolved = resolveSpotlightRadius({
          mode: modeRef.current,
          baseRadius,
          maxCornerRadius,
          scrollProgress: scrollProgressRef.current,
          introProgress: introProgressRef.current,
          pointerActive: pointerActiveRef.current,
          illuminationVisible: illuminationVisibleRef.current,
        });

        smoothRef.current.r = reducedMotion
          ? resolved.radiusPx
          : stepSpotlightInertia(smoothRef.current.r, resolved.radiusPx, deltaSeconds, 12);

        smoothRef.current.opacity = reducedMotion
          ? resolved.opacity
          : stepSpotlightInertia(smoothRef.current.opacity, resolved.opacity, deltaSeconds, 8);

        applyMaskStyles(
          smoothRef.current.x,
          smoothRef.current.y,
          smoothRef.current.r,
          smoothRef.current.opacity,
          resolved.fullReveal
        );
      }

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [measureStage, applyMaskStyles, reducedMotion, stageRef]);

  return {
    updatePointerFromClient,
    handlePointerLeave,
    setScrollProgress,
  };
}
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/lib/motion.ts">
<![CDATA[export type SpotlightMode = 'intro' | 'pointer' | 'scroll' | 'complete' | 'toggle';

export type ColorTemperature = 'cool' | 'neutral' | 'warm';

export interface LightLabState {
  intensity: number; // 0 to 100
  temperature: ColorTemperature;
  direction: number; // -60 to 60 degrees
}

export interface ContactDraft {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactDraft, string>>;
}

export const HERO_BASE = '/templates/penumbra/architecture-base.webp';
export const HERO_REVEAL = '/templates/penumbra/architecture-illuminated.webp';

export const DEFAULT_LIGHT_LAB_STATE: LightLabState = {
  intensity: 78,
  temperature: 'warm',
  direction: -18,
};

/**
 * Time-step-independent exponential smoothing for cursor coordinates and radius.
 */
export function stepSpotlightInertia(
  current: number,
  target: number,
  deltaSeconds: number,
  speed = 10
): number {
  const safeDelta = Math.max(0, Math.min(deltaSeconds, 0.1));
  const alpha = 1 - Math.exp(-speed * safeDelta);
  return current + (target - current) * alpha;
}

/**
 * Computes hero-local pointer coordinates clamped to the stage bounds.
 */
export function computeRelativePointerPosition(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): { x: number; y: number; xPercent: number; yPercent: number } {
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const x = Math.max(0, Math.min(width, clientX - rect.left));
  const y = Math.max(0, Math.min(height, clientY - rect.top));
  return {
    x,
    y,
    xPercent: (x / width) * 100,
    yPercent: (y / height) * 100,
  };
}

/**
 * Computes the radius required from (x, y) to cover the farthest corner of the stage,
 * with an extra 18% feather buffer so the outer gradient stop (82%–100%) clears all corners.
 */
export function computeMaxCornerRadius(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const dx = Math.max(x, Math.max(0, width - x));
  const dy = Math.max(y, Math.max(0, height - y));
  const cornerDist = Math.hypot(dx, dy);
  // Because the radial-gradient is fully opaque up to 38% and feathers to 100%,
  // multiplying by 2.4 ensures the 38%-49% opaque core reaches every corner at progress = 1.
  return Math.ceil(cornerDist * 2.4);
}

/**
 * Computes responsive base spotlight radius in pixels based on viewport width.
 */
export function getResponsiveSpotlightRadius(viewportWidth: number): number {
  if (viewportWidth < 640) return 155;
  if (viewportWidth < 1024) return 205;
  return 260;
}

/**
 * Arbitrates between intro, pointer, scroll takeover, and manual keyboard/mobile toggle
 * so scroll progress and cursor coordinates never write conflicting mask radii.
 */
export function resolveSpotlightRadius(params: {
  mode: SpotlightMode;
  baseRadius: number;
  maxCornerRadius: number;
  scrollProgress: number; // 0..1
  introProgress: number; // 0..1
  pointerActive: boolean;
  illuminationVisible: boolean;
}): { radiusPx: number; opacity: number; fullReveal: boolean } {
  const {
    mode,
    baseRadius,
    maxCornerRadius,
    scrollProgress,
    introProgress,
    pointerActive,
    illuminationVisible,
  } = params;

  if (illuminationVisible || mode === 'toggle' || mode === 'complete') {
    return {
      radiusPx: maxCornerRadius,
      opacity: 1,
      fullReveal: true,
    };
  }

  const clampedScroll = Math.max(0, Math.min(1, scrollProgress));
  if (mode === 'scroll' || clampedScroll > 0.02) {
    const startR = pointerActive ? baseRadius : baseRadius * 0.85;
    const radiusPx = startR + (maxCornerRadius - startR) * clampedScroll;
    return {
      radiusPx,
      opacity: 1,
      fullReveal: clampedScroll >= 0.98,
    };
  }

  if (mode === 'intro') {
    const p = Math.max(0, Math.min(1, introProgress));
    return {
      radiusPx: Math.max(36, baseRadius * (0.22 + 0.78 * p)),
      opacity: Math.min(1, p * 1.25),
      fullReveal: false,
    };
  }

  // Default pointer mode
  return {
    radiusPx: pointerActive ? baseRadius : baseRadius * 0.78,
    opacity: pointerActive ? 1 : 0.72,
    fullReveal: false,
  };
}

/**
 * Builds the CSS radial-gradient string for the spotlight mask.
 */
export function buildRadialMaskGradient(xPx: number, yPx: number, radiusPx: number): string {
  const r = Math.max(0, Math.round(radiusPx));
  const x = Math.round(xPx);
  const y = Math.round(yPx);
  return `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 0%, #000 38%, rgba(0,0,0,0.9) 49%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.25) 82%, transparent 100%)`;
}

/**
 * Pure calculation for the Light in Motion interactive laboratory.
 */
export function computeLightLabVisuals(state: LightLabState): {
  revealOpacity: number;
  kelvinLabel: string;
  cctValue: number;
  filterCss: string;
  tintOverlayColor: string;
  directionalMaskCss: string;
  beamSweepXPercent: number;
  footcandleEstimate: string;
} {
  const clampedIntensity = Math.max(0, Math.min(100, state.intensity));
  const revealOpacity = clampedIntensity / 100;

  let kelvinLabel = '2700K Warm Architectural Amber';
  let cctValue = 2700;
  let filterCss = 'sepia(0.16) saturate(1.12) brightness(1.02)';
  let tintOverlayColor = 'rgba(215, 167, 121, 0.16)';

  if (state.temperature === 'cool') {
    kelvinLabel = '4200K Moonlight / Cool Stone';
    cctValue = 4200;
    filterCss = 'hue-rotate(175deg) saturate(0.68) brightness(0.96) contrast(1.06)';
    tintOverlayColor = 'rgba(126, 145, 168, 0.24)';
  } else if (state.temperature === 'neutral') {
    kelvinLabel = '3200K Crisp Gallery Neutral';
    cctValue = 3200;
    filterCss = 'saturate(0.84) brightness(1.03) contrast(1.04)';
    tintOverlayColor = 'rgba(242, 235, 226, 0.10)';
  }

  const clampedDir = Math.max(-60, Math.min(60, state.direction));
  // Map -60..+60 degrees to 22%..78% horizontal focal center
  const beamSweepXPercent = Math.round(50 + (clampedDir / 60) * 32);
  const gradientAngle = 90 + clampedDir;

  const directionalMaskCss = `linear-gradient(${gradientAngle}deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.96) ${Math.max(
    18,
    beamSweepXPercent - 18
  )}%, #000 ${beamSweepXPercent}%, rgba(0,0,0,0.94) ${Math.min(
    86,
    beamSweepXPercent + 20
  )}%, rgba(0,0,0,0.25) 100%)`;

  const lux = Math.round((clampedIntensity / 100) * 145);
  const footcandleEstimate = `${lux} lx / ${(lux * 0.0929).toFixed(1)} fc`;

  return {
    revealOpacity,
    kelvinLabel,
    cctValue,
    filterCss,
    tintOverlayColor,
    directionalMaskCss,
    beamSweepXPercent,
    footcandleEstimate,
  };
}

/**
 * Validates the contact draft without substituting silent defaults.
 */
export function validateContactInquiry(draft: ContactDraft): ContactValidationResult {
  const errors: Partial<Record<keyof ContactDraft, string>> = {};

  if (!draft.name || draft.name.trim().length < 2) {
    errors.name = 'Please enter your name or studio affiliation.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!draft.email || !emailRegex.test(draft.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!draft.message || draft.message.trim().length < 12) {
    errors.message = 'Please share a brief note about your architectural space or concept (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds an explicit mailto: URI for hello@penumbra.example.
 */
export function buildContactMailtoUri(draft: ContactDraft): string {
  const subject = encodeURIComponent(
    `PENUMBRA Inquiry — ${draft.projectType || 'Architectural Lighting Concept'} (${draft.name.trim()})`
  );
  const bodyLines = [
    `Name / Studio: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    `Typology: ${draft.projectType || 'Architectural / Cultural'}`,
    `Horizon: ${draft.timeline || 'Concept Phase'}`,
    '',
    'Project Brief:',
    draft.message.trim(),
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:hello@penumbra.example?subject=${subject}&body=${body}`;
}
]]>
    </file>
    <file path="src/app/(penumbra)/penumbra/lib/projectData.ts">
<![CDATA[export interface ConceptProject {
  id: string;
  index: string;
  title: string;
  category: string;
  studyLabel: string;
  focalCropPosition: string;
  focalScale: number;
  kelvinProfile: string;
  contrastRatio: string;
  conceptSummary: string;
  lightingStrategy: string;
  services: string[];
  diagramType: 'cantilever-graze' | 'interior-reflection' | 'pathway-bollard';
}

export interface PracticePrinciple {
  number: string;
  title: string;
  summary: string;
  opticalNote: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  summary: string;
  deliverable: string;
  luxTarget: string;
}

export const CONCEPT_PROJECTS: ConceptProject[] = [
  {
    id: 'solace-pavilion',
    index: '01',
    title: 'Solace Pavilion',
    category: 'Cultural Pavilion',
    studyLabel: 'Study 01 · Cantilever Graze',
    focalCropPosition: '28% 52%',
    focalScale: 1.18,
    kelvinProfile: '2650K Linear Cove',
    contrastRatio: '14:1 Graze Ratio',
    conceptSummary:
      'Concealed knife-edge grazing beneath a cantilevered concrete canopy, dissolving structural mass after dusk while preserving water reflections.',
    lightingStrategy:
      'Asymmetric grazing slots wash the vertical concrete core from base to soffit, while a continuous warm reveal traces the floating horizontal plane.',
    services: [
      'Daylight-to-dusk transition study',
      'Recessed knife-edge soffit detailing',
      'Vertical concrete grazing calibration',
    ],
    diagramType: 'cantilever-graze',
  },
  {
    id: 'nocturne-house',
    index: '02',
    title: 'Nocturne House',
    category: 'Private Residence',
    studyLabel: 'Study 02 · Monolith Framing',
    focalCropPosition: '82% 58%',
    focalScale: 1.28,
    kelvinProfile: '2400K Warm Dimming',
    contrastRatio: '8:1 Threshold Balance',
    conceptSummary:
      'Pin-spot framing optics sculpt an interior stone volume, keeping floor-to-ceiling glazing transparent at blue hour without specular mirror glare.',
    lightingStrategy:
      'Framing projectors illuminate vertical interior stone instead of horizontal floors, preserving uninterrupted outward sightlines into the dark landscape.',
    services: [
      'Low-reflectance glazing balance',
      'Sculptural object framing optics',
      'Circadian evening scene programming',
    ],
    diagramType: 'interior-reflection',
  },
  {
    id: 'meridian-walk',
    index: '03',
    title: 'Meridian Walk',
    category: 'Public Waterfront',
    studyLabel: 'Study 03 · Waterline Baffle',
    focalCropPosition: '46% 84%',
    focalScale: 1.22,
    kelvinProfile: '2200K Shielded Amber',
    contrastRatio: '5:1 Horizon Comfort',
    conceptSummary:
      'Deep-baffled bronze bollards cast controlled 180° light fans across stone plinths and dark water without upward spill or skyglow.',
    lightingStrategy:
      'Low-horizon cutoff optics guide movement at foot level while allowing the human eye to stay adapted to the open night sky.',
    services: [
      'Dark-sky zero-uplight optics',
      'Custom bronze bollard specification',
      'Water-edge specular reflection study',
    ],
    diagramType: 'pathway-bollard',
  },
];

export const PRACTICE_PRINCIPLES: PracticePrinciple[] = [
  {
    number: '01 / Observe',
    title: 'Map natural twilight and untouched shadow',
    summary:
      'Before placing a luminaire, we study how blue hour moves across concrete, stone, and water—identifying where darkness must remain untouched.',
    opticalNote: 'Mesopic adaptation · Reflectance',
  },
  {
    number: '02 / Sculpt',
    title: 'Conceal the source, reveal the surface',
    summary:
      'Uniform illumination flattens form. We orchestrate warm grazing and deep shadow to bring out material texture, depth, and structural grain.',
    opticalNote: 'Asymmetric graze · Concealed aperture',
  },
  {
    number: '03 / Reveal',
    title: 'Transition from dusk to nocturnal quiet',
    summary:
      'Architecture should breathe with the evening. Our scenes dim imperceptibly from twilight clarity into a calm midnight ember glow.',
    opticalNote: 'Warm-dim curve · Zero uplight',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Listen',
    summary: 'Define nocturnal character, sightlines, and darkness baseline.',
    deliverable: 'Nocturnal Brief',
    luxTarget: 'Baseline Darkness Audit',
  },
  {
    step: '02',
    title: 'Explore',
    summary: 'Test material grazing, shadow relief, and Kelvin warmth.',
    deliverable: 'Photometric Mockups',
    luxTarget: '2200K – 3200K Range',
  },
  {
    step: '03',
    title: 'Compose',
    summary: 'Detail concealed coves, optical apertures, and controls.',
    deliverable: 'Architectural Details',
    luxTarget: 'Shielded Source Specs',
  },
  {
    step: '04',
    title: 'Commission',
    summary: 'Aim fixtures on-site and tune dusk-to-midnight scene curves.',
    deliverable: 'Scene Commissioning',
    luxTarget: 'Night-to-Dawn Curves',
  },
];
]]>
    </file>
  </files>
</template>

<template slug="zeno" name="ZENO.">
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
    <file path="src/app/(zeno)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./zeno/zeno.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const dM_Sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair_Display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "ZENO. — Independent Creative Practice",
  description: "ZENO is an independent creative practice building identities, campaigns, and digital experiences for brands ready to challenge convention.",
  openGraph: {
    title: "ZENO. — Independent Creative Practice",
    description: "ZENO is an independent creative practice building identities, campaigns, and digital experiences for brands ready to challenge convention.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ZenoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant_Garamond.variable} ${dM_Sans.variable} ${playfair_Display.variable} scroll-smooth`}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,400..700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      <body className="bg-[#111117] text-[#F2F0EB] antialiased selection:bg-[#A58AFF]/30 selection:text-[#F2F0EB] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(zeno)/zeno/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(zeno)/zeno/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/zeno";

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
        className={`zeno-placeholder ${className ?? ""}`}
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
    <file path="src/app/(zeno)/zeno/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#111117" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#F2F0EB" text-anchor="middle">Z</text>
</svg>
]]>
    </file>
    <file path="src/app/(zeno)/zeno/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ZENO. — Independent Creative Practice";

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
          backgroundColor: "#111117",
          color: "#F2F0EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>ZENO.</span>
          <span style={{ color: "#A58AFF" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            ZENO. — Independent Creative Practice
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            ZENO is an independent creative practice building identities, campaigns, and digital experiences for brands ready to challenge convention.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#A58AFF" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(zeno)/zeno/page.tsx">
<![CDATA["use client";

import ZenoApp from "./ZenoApp";

export default function ZenoPage() {
  return <ZenoApp />;
}
]]>
    </file>
    <file path="src/app/(zeno)/zeno/zeno.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: #111117;
  --bg-soft: #17171e;
  --ivory: #F2F0EB;
  --violet: #A58AFF;
  --cobalt: #5367F9;
  --lilac: #D8CFF2;
  --muted: #96939F;
  --line: rgba(242, 240, 235, 0.20);
  --line-strong: rgba(242, 240, 235, 0.38);
  --section-pad-x: clamp(22px, 3vw, 58px);
  --header-h: clamp(68px, 7vw, 104px);
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);

  --font-display: 'Cormorant Garamond', 'Bodoni Moda', Georgia, serif;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  background-color: var(--bg);
  color: var(--ivory);
  font-family: var(--font-sans);
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background-color: var(--bg);
  color: var(--ivory);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  position: relative;
}

/* Continuous subtle editorial print grain overlay across all sections */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 45;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Editorial Display Typography */
.font-editorial {
  font-family: var(--font-display);
  font-feature-settings: "liga" 1, "kern" 1;
}

.font-grotesk {
  font-family: var(--font-sans);
}

/* Oversized statement scale matching 16:9 references */
.zeno-display-hero {
  font-family: var(--font-display);
  font-size: clamp(3.3rem, 7.1vw, 8.2rem);
  line-height: 0.89;
  letter-spacing: -0.022em;
  font-weight: 600;
}

.zeno-display-section {
  font-family: var(--font-display);
  font-size: clamp(3.1rem, 6.6vw, 7.6rem);
  line-height: 0.90;
  letter-spacing: -0.022em;
  font-weight: 600;
}

.zeno-display-work {
  font-family: var(--font-display);
  font-size: clamp(2.85rem, 6.0vw, 6.9rem);
  line-height: 0.91;
  letter-spacing: -0.02em;
  font-weight: 600;
}

/* Expressive Violet Italic Accent with subtle registration echo */
.zeno-accent-italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  color: var(--violet);
  letter-spacing: -0.01em;
  text-shadow: 3px 2px 0px rgba(165, 138, 255, 0.2), -1.5px -1px 0px rgba(83, 103, 249, 0.18);
}

/* Crop Edge Blending so raster crops merge seamlessly into #111117 */
.crop-blend-hero {
  mask-image: radial-gradient(115% 115% at 52% 50%, #000 83%, transparent 100%);
  -webkit-mask-image: radial-gradient(115% 115% at 52% 50%, #000 83%, transparent 100%);
}

.crop-blend-card {
  mask-image: linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, #000 3%, #000 97%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 3%, #000 97%, transparent 100%);
}

.crop-blend-world {
  mask-image: radial-gradient(120% 120% at 50% 50%, #000 86%, transparent 100%);
  -webkit-mask-image: radial-gradient(120% 120% at 50% 50%, #000 86%, transparent 100%);
}

/* Focus accessibility ring */
.zeno-focus:focus-visible {
  outline: 2px solid var(--violet);
  outline-offset: 4px;
}

/* Vertical archive micro-labels */
.writing-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
]]>
    </file>
    <file path="src/app/(zeno)/zeno/ZenoApp.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { WorkSection } from './components/WorkSection';
import { ContactSection } from './components/ContactSection';
import { StudioDialog } from './components/StudioDialog';
import { ApproachDialog } from './components/ApproachDialog';
import { ProjectDetailDialog } from './components/ProjectDetailDialog';
import { ContactDialog } from './components/ContactDialog';
import { ProjectItem } from './data/projects';

export default function App() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [approachOpen, setApproachOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="min-h-screen bg-[#111117] text-[#F2F0EB] relative selection:bg-[#A58AFF]/30 selection:text-[#F2F0EB]">
      {/* Sticky Global Header */}
      <SiteHeader
        onOpenStudio={() => setStudioOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Four Continuous Immersive Editorial Sections in a Centered 1920px Stage */}
      <main id="main-content" className="relative w-full max-w-[1920px] mx-auto overflow-x-hidden">
        <HeroSection onOpenStudio={() => setStudioOpen(true)} />
        <ExpertiseSection onOpenApproach={() => setApproachOpen(true)} />
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />
        <ContactSection
          onOpenContact={() => setContactOpen(true)}
          onOpenStudio={() => setStudioOpen(true)}
        />
      </main>

      {/* Accessible Interactive Dialogs & Overlays */}
      <StudioDialog
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        onStartProject={() => setContactOpen(true)}
      />

      <ApproachDialog
        isOpen={approachOpen}
        onClose={() => setApproachOpen(false)}
        onStartProject={() => setContactOpen(true)}
      />

      <ProjectDetailDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
        onStartProject={() => setContactOpen(true)}
      />

      <ContactDialog
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/ApproachDialog.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig';

interface ApproachDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const ApproachDialog: React.FC<ApproachDialogProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approach-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[960px] bg-[#14141C] border border-[#F2F0EB]/25 p-6 sm:p-10 md:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.85)] my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F2F0EB]/18 pb-5 mb-8">
          <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF]">
            01 / OUR APPROACH — DISCOVER → DEFINE → DESIGN → DELIVER
          </span>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close Approach dialog"
            className="zeno-focus px-4 py-1.5 text-xs font-grotesk tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF] hover:text-[#A58AFF] transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        <h2
          id="approach-dialog-title"
          className="font-editorial text-[2rem] sm:text-[2.75rem] md:text-[3.2rem] leading-[1.04] uppercase text-[#F2F0EB] mb-3"
        >
          HOW AN IDEA GAINS{' '}
          <em className="zeno-accent-italic not-italic font-editorial italic">
            GRAVITY.
          </em>
        </h2>
        <p className="text-[15px] sm:text-[17px] font-grotesk text-[#A89FE0] max-w-[640px] mb-9">
          Every engagement moves through four deliberate stages—connecting strategic conviction with tactile execution.
        </p>

        {/* 4 Steps Grid: Discover -> Define -> Design -> Deliver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {siteConfig.approachSteps.map((step) => (
            <div
              key={step.number}
              className="border border-[#F2F0EB]/16 bg-[#111117]/75 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-grotesk tracking-[0.14em] uppercase text-[#A58AFF] mb-2">
                  <span>
                    {step.number} — {step.phase}
                  </span>
                  <span aria-hidden="true" className="text-[#5367F9]">
                    ●
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-grotesk font-semibold text-[#F2F0EB] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#96939F] leading-relaxed mb-5">
                  {step.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2F0EB]/12 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-grotesk tracking-[0.06em] uppercase text-[#D8CFF2]">
                {step.artifacts.map((art, i) => (
                  <React.Fragment key={art}>
                    {i > 0 && <span aria-hidden="true" className="text-[#A58AFF]">·</span>}
                    <span>{art}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F2F0EB]/18">
          <span className="text-xs font-grotesk tracking-[0.08em] uppercase text-[#96939F]">
            SENIOR-LED PRACTICE // NO HANDOFF DILUTION
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="zeno-focus px-6 py-3 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:bg-[#A58AFF] transition-colors cursor-pointer"
          >
            DISCUSS YOUR BRIEF ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproachDialog;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/ContactDialog.tsx">
<![CDATA['use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  PROJECT_TYPES,
  ContactFormInput,
  ContactValidationErrors,
  validateContactForm,
  formatProjectBrief,
  buildMailtoHref,
} from '../utils/contactValidation';
import { siteConfig } from '../data/siteConfig';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    message: '',
  });
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [preparedBrief, setPreparedBrief] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setPreparedBrief(null);
      return;
    }
    setErrors({});
    setPreparedBrief(formatProjectBrief(form));
  };

  const handleCopyBrief = async () => {
    if (!preparedBrief) return;
    try {
      await navigator.clipboard.writeText(preparedBrief);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2600);
    } catch {
      // Fallback if clipboard blocked
      setCopiedBrief(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[740px] bg-[#14141C] border border-[#F2F0EB]/25 p-6 sm:p-10 shadow-[0_32px_90px_rgba(0,0,0,0.9)] my-auto max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#F2F0EB]/18 pb-4 mb-6">
          <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF]">
            03 / START A CONVERSATION — PROJECT BRIEF
          </span>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close Contact dialog"
            className="zeno-focus px-4 py-1.5 text-xs font-grotesk tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF] hover:text-[#A58AFF] transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        <h2
          id="contact-dialog-title"
          className="font-editorial text-[2rem] sm:text-[2.6rem] leading-[1.04] uppercase text-[#F2F0EB] mb-2"
        >
          LET’S GIVE IT A{' '}
          <em className="zeno-accent-italic not-italic font-editorial italic">
            DIRECTION.
          </em>
        </h2>
        <p className="text-xs sm:text-sm font-grotesk text-[#96939F] mb-6">
          Preview only — connect a form endpoint or live inbox in{' '}
          <code className="text-[#D8CFF2]">siteConfig.ts</code> before publishing.
        </p>

        {!preparedBrief ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="zeno-contact-name"
                  className="block text-xs font-grotesk tracking-[0.12em] uppercase text-[#D8CFF2] mb-2"
                >
                  NAME / ORGANIZATION *
                </label>
                <input
                  id="zeno-contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="Clara Vance — Auren"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  className="zeno-focus w-full bg-[#111117] border border-[#F2F0EB]/25 px-4 py-3 text-sm text-[#F2F0EB] placeholder-[#96939F]/50 focus:border-[#A58AFF]"
                />
                {errors.name && (
                  <p id="error-name" role="alert" className="text-xs text-[#FF8A8A] mt-1.5">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="zeno-contact-email"
                  className="block text-xs font-grotesk tracking-[0.12em] uppercase text-[#D8CFF2] mb-2"
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  id="zeno-contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="clara@domain.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  className="zeno-focus w-full bg-[#111117] border border-[#F2F0EB]/25 px-4 py-3 text-sm text-[#F2F0EB] placeholder-[#96939F]/50 focus:border-[#A58AFF]"
                />
                {errors.email && (
                  <p id="error-email" role="alert" className="text-xs text-[#FF8A8A] mt-1.5">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label
                htmlFor="zeno-contact-type"
                className="block text-xs font-grotesk tracking-[0.12em] uppercase text-[#D8CFF2] mb-2"
              >
                PROJECT DISCIPLINE / SCOPE *
              </label>
              <select
                id="zeno-contact-type"
                value={form.projectType}
                onChange={(e) =>
                  setForm({ ...form, projectType: e.target.value })
                }
                className="zeno-focus w-full bg-[#111117] border border-[#F2F0EB]/25 px-4 py-3 text-sm text-[#F2F0EB] focus:border-[#A58AFF]"
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#111117] text-[#F2F0EB]">
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p role="alert" className="text-xs text-[#FF8A8A] mt-1.5">
                  {errors.projectType}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="zeno-contact-message"
                className="block text-xs font-grotesk tracking-[0.12em] uppercase text-[#D8CFF2] mb-2"
              >
                PROJECT DIRECTION & TIMELINE *
              </label>
              <textarea
                id="zeno-contact-message"
                rows={4}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                placeholder="Tell us about what you are building, key milestones, and the convention you want to challenge..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'error-message' : undefined}
                className="zeno-focus w-full bg-[#111117] border border-[#F2F0EB]/25 px-4 py-3 text-sm text-[#F2F0EB] placeholder-[#96939F]/50 focus:border-[#A58AFF]"
              />
              {errors.message && (
                <p id="error-message" role="alert" className="text-xs text-[#FF8A8A] mt-1.5">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
              <span className="text-xs font-grotesk text-[#96939F]">
                Target template address: {siteConfig.contactEmail}
              </span>

              <button
                type="submit"
                className="zeno-focus px-7 py-3.5 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.12em] uppercase hover:bg-[#A58AFF] transition-colors cursor-pointer"
              >
                PREPARE PROJECT BRIEF ↗
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5" role="status" aria-live="polite">
            <div className="p-4 border border-[#A58AFF]/50 bg-[#A58AFF]/10">
              <p className="text-xs font-grotesk font-semibold tracking-[0.12em] uppercase text-[#A58AFF] mb-1">
                PREVIEW MODE — BRIEF COMPILED (NO EMAIL SILENTLY SENT)
              </p>
              <p className="text-xs font-grotesk text-[#F2F0EB]/90 leading-relaxed">
                Because this is a standalone studio template without a connected backend mail server, your project brief has been formatted below. Copy it to your clipboard or open it in your mail client once a real recipient inbox is configured.
              </p>
            </div>

            <pre className="p-4 bg-[#111117] border border-[#F2F0EB]/20 text-xs font-mono text-[#D8CFF2] whitespace-pre-wrap overflow-x-auto">
              {preparedBrief}
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPreparedBrief(null)}
                className="zeno-focus px-4 py-2.5 text-xs font-grotesk tracking-[0.1em] uppercase text-[#96939F] hover:text-[#F2F0EB] cursor-pointer"
              >
                ← EDIT BRIEF
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="zeno-focus px-5 py-3 rounded-full border border-[#F2F0EB]/40 text-[#F2F0EB] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:border-[#A58AFF] cursor-pointer"
                >
                  {copiedBrief ? 'BRIEF COPIED ✓' : 'COPY BRIEF TO CLIPBOARD'}
                </button>

                <a
                  href={buildMailtoHref(siteConfig.contactEmail, form)}
                  className="zeno-focus px-6 py-3 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:bg-[#A58AFF] transition-colors"
                >
                  OPEN IN MAIL CLIENT ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDialog;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/ContactSection.tsx">
<![CDATA['use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, NavItem } from '../data/siteConfig';
import { Wordmark } from './Wordmark';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  onOpenContact: () => void;
  onOpenStudio: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenContact,
  onOpenStudio,
}) => {
  const [socialNotice, setSocialNotice] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cobaltRingRef = useRef<SVGCircleElement>(null);
  const violetCurveRef = useRef<SVGPathElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal through clean line masks
      gsap.fromTo(
        '.cta-line-inner',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Giant cobalt ring subtle entrance without breaking its upper-right arc
      if (cobaltRingRef.current) {
        gsap.fromTo(
          cobaltRingRef.current,
          { opacity: 0.75 },
          {
            opacity: 0.96,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'center center',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    // Subtle magnetic hover on primary CTA button for desktop pointer
    const isFinePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    const btnEl = ctaBtnRef.current;
    let onMove: ((e: MouseEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;

    if (isFinePointer && btnEl) {
      const xTo = gsap.quickTo(btnEl, 'x', { duration: 0.35, ease: 'power2.out' });
      const yTo = gsap.quickTo(btnEl, 'y', { duration: 0.35, ease: 'power2.out' });

      onMove = (e: MouseEvent) => {
        const rect = btnEl.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(dx * 0.14);
        yTo(dy * 0.18);
      };
      onLeave = () => {
        xTo(0);
        yTo(0);
      };
      btnEl.addEventListener('mousemove', onMove);
      btnEl.addEventListener('mouseleave', onLeave);
    }

    return () => {
      ctx.revert();
      if (btnEl && onMove && onLeave) {
        btnEl.removeEventListener('mousemove', onMove);
        btnEl.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [reducedMotion]);

  const handleFooterNav = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.action === 'studio-dialog') {
      e.preventDefault();
      onOpenStudio();
    } else if (item.action === 'contact-dialog') {
      e.preventDefault();
      onOpenContact();
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    } catch {
      onOpenContact();
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative w-full pt-0 pb-8 flex flex-col justify-between"
    >
      {/* UPPER CTA AREA: Starts at y=0 (touching #work bottom) with locked 1920:880 desktop aspect ratio so circle is round, top is never clipped, and spine at x=1322 never detaches */}
      <div className="relative w-full lg:aspect-[1920/880] flex flex-col justify-center pt-16 sm:pt-20 lg:pt-16 pb-12 sm:pb-16 lg:pb-14 [clip-path:inset(-300px_0px_0px_0px)]">
        {/* Single Unified SVG for Continuous Violet Signal Spine, Coordinate Frame, and Giant Cobalt Ring */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1920 880"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible"
        >
          <defs>
            <linearGradient id="ctaRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#485EF8" />
              <stop offset="50%" stopColor="#5367F9" />
              <stop offset="100%" stopColor="#6577FF" />
            </linearGradient>
          </defs>

          {/* Studio Archive Coordinate Frame behind the ring */}
          <rect
            x="832"
            y="128"
            width="1026"
            height="752"
            fill="none"
            stroke="rgba(242,240,235,0.18)"
            strokeWidth="1"
          />
          <line
            x1="832"
            y1="575"
            x2="1858"
            y2="575"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1"
          />
          <line
            x1="1322"
            y1="128"
            x2="1322"
            y2="880"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1"
          />

          {/* Small Archive Annotations matching reference 04 */}
          <text
            x="834"
            y="116"
            fill="rgba(242,240,235,0.42)"
            fontSize="13"
            letterSpacing="1.6"
            fontFamily="DM Sans, sans-serif"
          >
            STUDIO ARCHIVE / 2026
          </text>
          <g
            fill="rgba(242,240,235,0.42)"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            <text x="1334" y="845">111  11:30</text>
            <text x="1334" y="857">250  X0135</text>
            <text x="1334" y="869">258  X0238</text>
          </g>

          {/* Outer & Inner Concentric Registration Hairlines matching reference 04 */}
          <circle
            cx="1322"
            cy="545"
            r="465"
            fill="none"
            stroke="rgba(242,240,235,0.16)"
            strokeWidth="1"
          />
          <circle
            cx="1322"
            cy="545"
            r="448"
            fill="none"
            stroke="rgba(242,240,235,0.24)"
            strokeWidth="1.2"
          />
          <circle
            cx="1322"
            cy="545"
            r="348"
            fill="none"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1.1"
          />
          <circle
            cx="1322"
            cy="545"
            r="328"
            fill="none"
            stroke="rgba(242,240,235,0.14)"
            strokeWidth="1"
          />
          <circle
            cx="1322"
            cy="545"
            r="258"
            fill="none"
            stroke="rgba(242,240,235,0.18)"
            strokeWidth="1"
          />
          <circle
            cx="1322"
            cy="575"
            r="105"
            fill="none"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1.1"
          />

          {/* THE GIANT COBALT CIRCULAR ARC (full top clearance at y=119, cropped at bottom y=880 by footer rule) */}
          <circle
            ref={cobaltRingRef}
            cx="1322"
            cy="545"
            r="400"
            fill="none"
            stroke="url(#ctaRingGrad)"
            strokeWidth="52"
            strokeLinecap="butt"
            opacity="0.96"
          />

          {/* Inner fine line inside cobalt ring */}
          <circle
            cx="1322"
            cy="545"
            r="400"
            fill="none"
            stroke="rgba(242,240,235,0.28)"
            strokeWidth="1"
          />

          {/* Violet 6-Pointed Asterisk / Star Marker inside the right side of the Cobalt Ring */}
          <g transform="translate(1718, 578)" stroke="#A58AFF" strokeWidth="4.5" strokeLinecap="round">
            <line x1="0" y1="-20" x2="0" y2="20" />
            <line x1="-17" y1="-10" x2="17" y2="10" />
            <line x1="-17" y1="10" x2="17" y2="-10" />
          </g>

          {/* Continuous Violet Signal Path entering straight down at x=1322, y=0 from #work */}
          <path
            ref={violetCurveRef}
            d="M 1322 0 L 1322 290 C 1322 365, 1385 395, 1545 395 C 1715 395, 1825 468, 1825 585 C 1825 658, 1790 710, 1740 740"
            fill="none"
            stroke="#A58AFF"
            strokeWidth="2.2"
            strokeOpacity="0.92"
          />

          {/* Secondary delicate violet orbital curve through center */}
          <path
            d="M 1322 290 C 1322 390, 1425 425, 1425 555 C 1425 695, 1525 775, 1685 760"
            fill="none"
            stroke="#A58AFF"
            strokeWidth="1.75"
            strokeOpacity="0.78"
          />

          {/* Glowing Violet Nodes */}
          <circle cx="1322" cy="248" r="9.5" fill="#A58AFF" />
          <circle cx="1804" cy="498" r="8.5" fill="#A58AFF" />
          <circle cx="1810" cy="655" r="8.5" fill="#A58AFF" />
        </svg>

        {/* Foreground CTA Content */}
        <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)]">
          <p className="text-[13px] sm:text-[15px] font-grotesk tracking-[0.07em] uppercase text-[#A58AFF] mb-4 sm:mb-5">
            03 / THE NEXT CHAPTER
          </p>

          <h2
            id="contact-heading"
            className="zeno-display-hero uppercase text-[#F2F0EB] select-none mb-5 sm:mb-6 max-w-[1120px]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="cta-line-inner block">LET’S MAKE</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="cta-line-inner block">
                <em className="zeno-accent-italic not-italic font-editorial italic pr-3">
                  SOMETHING
                </em>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="cta-line-inner block">MATTER.</span>
            </span>
          </h2>

          <p className="text-[17px] sm:text-[21px] md:text-[23px] font-grotesk font-normal text-[#F2F0EB]/92 max-w-[760px] mb-7 sm:mb-9 leading-[1.38]">
            Have a good idea? Let’s give it a direction no one saw coming.
          </p>

          {/* Primary & Secondary CTAs matching reference 04 */}
          <div className="flex flex-wrap items-center gap-7 sm:gap-11">
            <button
              ref={ctaBtnRef}
              type="button"
              onClick={onOpenContact}
              className="zeno-focus group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#F2F0EB] text-[#111117] font-grotesk text-[13px] sm:text-[15px] font-semibold tracking-[0.06em] uppercase hover:bg-[#A58AFF] hover:text-[#111117] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            >
              <span>START A CONVERSATION</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </button>

            <a
              href="#work"
              className="zeno-focus inline-flex items-center text-[13px] sm:text-[15px] font-grotesk font-medium tracking-[0.06em] uppercase text-[#F2F0EB] border-b-[2px] border-[#F2F0EB] pb-1.5 hover:text-[#A58AFF] hover:border-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
            >
              EXPLORE OUR WORK
            </a>
          </div>
        </div>
      </div>

      {/* LOWER FOOTER AREA matching reference 04 */}
      <footer
        aria-label="Site footer"
        className="relative z-10 w-full px-[clamp(22px,3.125%,60px)]"
      >
        {/* Top Full-Width Rule */}
        <div className="w-full h-[1.5px] bg-[#F2F0EB]/65 mb-7 sm:mb-8" />

        {/* Main 3-Zone Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pb-7 sm:pb-8">
          {/* Left: Large ZENO. Wordmark + Caption */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Wordmark size="lg" />
            <p className="text-[12px] sm:text-[13.5px] font-grotesk tracking-[0.06em] uppercase text-[#8E8B99] mt-2">
              {siteConfig.shortTagline}
            </p>
          </div>

          {/* Center: Footer Navigation */}
          <nav
            aria-label="Footer navigation"
            className="lg:col-span-4 flex flex-wrap items-center lg:justify-center gap-6 sm:gap-9"
          >
            {siteConfig.navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleFooterNav(item, e)}
                className="zeno-focus text-[14px] sm:text-[15.5px] font-grotesk font-normal tracking-[0.05em] uppercase text-[#F2F0EB]/90 hover:text-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* Right: Contact Descriptor, Editable Email, and Social Sample Labels */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right">
            <p className="text-[12px] sm:text-[13px] font-grotesk tracking-[0.06em] uppercase text-[#8E8B99] mb-0.5">
              LET’S MAKE CONTACT
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                title="Open project inquiry dialog (fictional template address)"
                className="zeno-focus text-[24px] sm:text-[30px] xl:text-[34px] font-grotesk font-normal tracking-[-0.015em] text-[#F2F0EB] hover:text-[#A58AFF] transition-colors cursor-pointer"
              >
                {siteConfig.contactEmail}
              </button>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy studio email address"
                className="zeno-focus px-2.5 py-1 text-[10px] font-grotesk tracking-[0.12em] uppercase border border-[#F2F0EB]/25 rounded text-[#96939F] hover:text-[#F2F0EB] hover:border-[#A58AFF] transition-colors cursor-pointer"
              >
                {copiedEmail ? 'COPIED' : 'COPY'}
              </button>
            </div>

            {/* Social Labels — Honest template controls (no fake href="#") */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] font-grotesk tracking-[0.05em] uppercase text-[#F2F0EB]/85 mt-1.5">
              {siteConfig.socials.map((soc, idx) => (
                <React.Fragment key={soc.label}>
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-[#8E8B99]">
                      /
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setSocialNotice(
                        `${soc.label}: Template placeholder — configure official studio URL in siteConfig.ts before publishing.`
                      )
                    }
                    className="zeno-focus hover:text-[#A58AFF] transition-colors cursor-pointer"
                  >
                    {soc.label}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {socialNotice && (
              <p
                role="status"
                className="text-[11px] font-grotesk text-[#A58AFF] mt-1.5 max-w-[340px]"
              >
                {socialNotice}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Full-Width Rule */}
        <div className="w-full h-[1px] bg-[#F2F0EB]/45 mb-4" />

        {/* Copyright & Back to Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] sm:text-[13px] font-grotesk tracking-[0.04em] uppercase text-[#F2F0EB]/85">
          <p>{siteConfig.copyright}</p>

          <a
            href="#home"
            className="zeno-focus group inline-flex items-center gap-2 text-[#F2F0EB] hover:text-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
          >
            <span>BACK TO TOP</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </a>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/ExpertiseSection.tsx">
<![CDATA['use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expertiseContent, servicesData, ServiceItem } from '../data/services';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseSectionProps {
  onOpenApproach: () => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  onOpenApproach,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<ServiceItem['id']>('strategy');
  const sectionRef = useRef<HTMLElement>(null);
  const violetSpineRef = useRef<SVGPathElement>(null);
  const cobaltRibbonRef = useRef<SVGPathElement>(null);
  const lilacBridgeRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  const activeService =
    servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline & left column reveal
      gsap.fromTo(
        '.exp-line-inner',
        { yPercent: 102 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Four service nodes enter from 4 distinct directional vectors
      const vectors = [
        { selector: '.service-node-strategy', x: -28, y: -22 },
        { selector: '.service-node-identity', x: 28, y: -22 },
        { selector: '.service-node-campaigns', x: -28, y: 24 },
        { selector: '.service-node-digital', x: 28, y: 24 },
      ];

      vectors.forEach((v, idx) => {
        gsap.fromTo(
          v.selector,
          { x: v.x, y: v.y, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: idx * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // SVG ribbons draw with scroll progress while keeping continuous violet spine unbroken
      [cobaltRibbonRef.current, lilacBridgeRef.current].forEach(
        (pathEl) => {
          if (!pathEl) return;
          const len = pathEl.getTotalLength?.() || 1200;
          gsap.set(pathEl, {
            strokeDasharray: len,
            strokeDashoffset: len * 0.75,
          });
          gsap.to(pathEl, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 0.5,
            },
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      aria-labelledby="expertise-heading"
      className="relative w-full lg:aspect-[1920/1143] flex flex-col justify-center py-16 sm:py-20 lg:py-16 overflow-hidden"
    >
      {/* Continuous Background SVG Signal Spine & Registration Rings */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1143"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
      >
        {/* Top-right decorative concentric registration circles */}
        <circle
          cx="1725"
          cy="210"
          r="172"
          fill="none"
          stroke="rgba(242,240,235,0.22)"
          strokeWidth="1.2"
        />
        <circle
          cx="1725"
          cy="210"
          r="148"
          fill="none"
          stroke="rgba(242,240,235,0.14)"
          strokeWidth="1"
        />

        {/* Continuous Vertical Violet Signal Spine:
            Enters at x=978, y=0 (from Hero), curves to x=1322 through the diagram,
            and curves back to x=978, y=1143 at bottom to meet Selected Work's M 978 0 */}
        <path
          ref={violetSpineRef}
          d="M 978 0 L 978 24 Q 978 46 1000 46 L 1296 46 Q 1322 46 1322 72 L 1322 1068 Q 1322 1094 1296 1094 L 1000 1094 Q 978 1094 978 1118 L 978 1143"
          fill="none"
          stroke="#A58AFF"
          strokeWidth="2.2"
          strokeOpacity="0.88"
        />
      </svg>

      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Editorial Text Column (5 of 12 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <p className="text-[13px] sm:text-[15px] font-grotesk tracking-[0.07em] uppercase text-[#A58AFF] mb-5 sm:mb-6">
            {expertiseContent.eyebrow}
          </p>

          <h2
            id="expertise-heading"
            className="zeno-display-section uppercase text-[#F2F0EB] select-none mb-7 sm:mb-9"
          >
            <span className="block overflow-hidden pb-1">
              <span className="exp-line-inner block">
                GOOD{' '}
                <em className="zeno-accent-italic not-italic font-editorial italic pr-2">
                  IDEAS
                </em>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="exp-line-inner block">AREN’T</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="exp-line-inner block">
                ACCIDENTS<span className="text-[#A58AFF] inline-block ml-0.5">.</span>
              </span>
            </span>
          </h2>

          <p className="text-[17px] sm:text-[19px] md:text-[21px] leading-[1.45] font-grotesk text-[#A89FE0] max-w-[460px] xl:max-w-[540px] mb-8 sm:mb-10">
            {expertiseContent.body}
          </p>

          <button
            type="button"
            onClick={onOpenApproach}
            className="zeno-focus group inline-flex items-center gap-2.5 text-[13px] sm:text-[15px] font-grotesk font-semibold tracking-[0.08em] uppercase text-[#F2F0EB] border-b-[2px] border-[#F2F0EB] pb-1.5 hover:text-[#A58AFF] hover:border-[#A58AFF] transition-colors cursor-pointer mb-10"
          >
            <span>{expertiseContent.ctaLabel}</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </button>

          {/* Live Interactive Active Node Details Readout */}
          <div
            aria-live="polite"
            className="w-full max-w-[460px] xl:max-w-[540px] pt-6 border-t border-[#F2F0EB]/18 transition-all duration-300"
          >
            <div className="flex items-center justify-between text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF] mb-2">
              <span>ACTIVE DISCIPLINE // {activeService.label}</span>
              <span className="text-[#96939F]">{activeService.archiveCode}</span>
            </div>
            <p className="text-[14px] sm:text-[15px] text-[#F2F0EB]/90 leading-relaxed mb-4">
              {activeService.extendedDesc}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-[#96939F]">
              {activeService.capabilities.map((cap, idx) => (
                <React.Fragment key={cap}>
                  {idx > 0 && <span aria-hidden="true" className="text-[#A58AFF]">·</span>}
                  <span className="text-[#D8CFF2]">{cap}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right Interactive 2x2 Connected Editorial Map (7 of 12 cols on desktop) */}
        <div className="lg:col-span-7 relative">
          {/* Diagram Top Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99]">
              {expertiseContent.diagramHeader}
            </span>
            <span className="text-[11px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99] hidden sm:inline">
              SELECT NODE TO INSPECT [01–04]
            </span>
          </div>

          {/* Outer Coordinate Grid Box matching reference 02 */}
          <div className="relative border border-[#F2F0EB]/20 bg-[#111117]/60 p-4 sm:p-7 md:p-9">
            {/* Vertical Side Micro-Annotations */}
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -left-6 top-6 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              SERVICES
            </span>
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              S 26° 18&apos;
            </span>
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -left-6 bottom-6 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              STUDIO ARCHIVE
            </span>
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -right-6 bottom-8 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              STUDIO ARCHIVE
            </span>

            {/* Live SVG Coordinate Grid, Cobalt Looping Ribbon, Lilac Diagonal Bridge, and Active Nodes */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 820"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible"
            >
              <defs>
                <linearGradient id="cobaltRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A60F8" />
                  <stop offset="55%" stopColor="#5367F9" />
                  <stop offset="100%" stopColor="#6979FF" />
                </linearGradient>
                <linearGradient id="lilacRibbonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9C84FF" />
                  <stop offset="100%" stopColor="#7C68F8" />
                </linearGradient>
              </defs>

              {/* Coordinate Grid Hairlines (vertical spine is provided by the continuous outer violet path at cx=478) */}
              <line x1="0" y1="410" x2="1000" y2="410" stroke="rgba(242,240,235,0.22)" strokeWidth="1" />
              <line x1="242" y1="0" x2="242" y2="820" stroke="rgba(242,240,235,0.10)" strokeWidth="1" />
              <line x1="742" y1="0" x2="742" y2="820" stroke="rgba(242,240,235,0.10)" strokeWidth="1" />

              {/* Concentric Wireframe Arcs inside the coordinate box centered on the spine (cx=478) */}
              <circle
                cx="478"
                cy="410"
                r="310"
                fill="none"
                stroke="rgba(242,240,235,0.20)"
                strokeWidth="1.15"
              />
              <circle
                cx="478"
                cy="410"
                r="105"
                fill="none"
                stroke="rgba(242,240,235,0.18)"
                strokeWidth="1"
              />

              {/* Crosshair markers (+) at axes */}
              <text x="-18" y="415" fill="rgba(242,240,235,0.45)" fontSize="18">+</text>
              <text x="1008" y="415" fill="rgba(242,240,235,0.45)" fontSize="18">+</text>

              {/* Thick Cobalt Looping Ribbon behind the 4 discipline artworks (matching reference 02) */}
              <path
                ref={cobaltRibbonRef}
                d="M 92 590 C 28 470, 52 340, 175 280 C 310 215, 420 205, 515 268 C 615 335, 710 355, 835 355 C 945 355, 965 495, 865 568 C 755 648, 595 628, 390 628"
                fill="none"
                stroke="url(#cobaltRibbonGrad)"
                strokeWidth={activeServiceId === 'strategy' || activeServiceId === 'digital' ? '46' : '40'}
                strokeLinecap="round"
                className="transition-all duration-500"
                opacity="0.95"
              />

              {/* Secondary Lilac S-Curve Bridge crossing center */}
              <path
                ref={lilacBridgeRef}
                d="M 380 578 C 455 530, 460 440, 492 362 C 525 282, 598 242, 668 232"
                fill="none"
                stroke="url(#lilacRibbonGrad)"
                strokeWidth={activeServiceId === 'identity' || activeServiceId === 'campaigns' ? '34' : '28'}
                strokeLinecap="round"
                className="transition-all duration-500"
                opacity="0.92"
              />

              {/* Top & Bottom border violet spine nodes pinned to the exact box border (y=0 and y=820 at cx=478) */}
              <circle cx="478" cy="0" r="8" fill="#A58AFF" />
              <circle cx="478" cy="820" r="8" fill="#A58AFF" />

              {/* Center Intersection Node on the S-bridge aligned with x=1322 spine (cx=478) */}
              <circle
                cx="478"
                cy="410"
                r="19"
                fill="#5367F9"
                stroke="#1E2030"
                strokeWidth="5"
              />
              {/* Left loop violet node */}
              <circle
                cx="66"
                cy="410"
                r="15"
                fill="#A58AFF"
                opacity={activeServiceId === 'strategy' ? 1 : 0.78}
              />
              {/* Right loop violet node */}
              <circle
                cx="918"
                cy="410"
                r="16"
                fill="#A58AFF"
                opacity={activeServiceId === 'digital' ? 1 : 0.78}
              />
            </svg>

            {/* 2x2 Connected Discipline Modules */}
            <div
              role="group"
              aria-label="ZENO four core creative disciplines"
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-12"
            >
              {servicesData.map((service) => {
                const isSelected = activeServiceId === service.id;
                const isTopRow = service.labelPosition === 'above';

                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveServiceId(service.id)}
                    onMouseEnter={() => setActiveServiceId(service.id)}
                    className={`service-node-${service.id} zeno-focus group text-left flex flex-col ${
                      isTopRow ? 'justify-start' : 'justify-end'
                    } transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'opacity-100 -translate-y-1.5'
                        : 'opacity-82 hover:opacity-100 hover:-translate-y-1'
                    }`}
                  >
                    {/* Top Row Labels sit ABOVE artwork (01 Strategy & 02 Identity) */}
                    {isTopRow && (
                      <div className="mb-3.5 pr-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[18px] sm:text-[21px] font-grotesk font-medium tracking-[0.02em] uppercase transition-colors ${
                              isSelected ? 'text-[#F2F0EB]' : 'text-[#F2F0EB]/85'
                            }`}
                          >
                            {service.label}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                              isSelected
                                ? 'bg-[#A58AFF] scale-125'
                                : 'bg-[#F2F0EB]/30 scale-75'
                            }`}
                          />
                        </div>
                        <p className="text-[14px] sm:text-[15.5px] font-grotesk text-[#C8C4D4] mt-0.5">
                          {service.shortDesc}
                        </p>
                      </div>
                    )}

                    {/* Artwork Frame */}
                    <div
                      className={`relative w-full aspect-[410/300] overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? 'ring-1 ring-[#A58AFF]/70 shadow-[0_20px_40px_rgba(0,0,0,0.65)]'
                          : 'ring-1 ring-[#F2F0EB]/12'
                      }`}
                    >
                      <img
                        src={service.artwork}
                        alt={service.artworkAlt}
                        width={410}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover crop-blend-card transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Bottom Row Labels sit BELOW artwork (03 Campaigns & 04 Digital) */}
                    {!isTopRow && (
                      <div className="mt-3.5 pr-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[18px] sm:text-[21px] font-grotesk font-medium tracking-[0.02em] uppercase transition-colors ${
                              isSelected ? 'text-[#F2F0EB]' : 'text-[#F2F0EB]/85'
                            }`}
                          >
                            {service.label}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                              isSelected
                                ? 'bg-[#A58AFF] scale-125'
                                : 'bg-[#F2F0EB]/30 scale-75'
                            }`}
                          />
                        </div>
                        <p className="text-[14px] sm:text-[15.5px] font-grotesk text-[#C8C4D4] mt-0.5">
                          {service.shortDesc}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/HeroSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/siteConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenStudio }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const collageWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const exitPathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Intro timeline: clipped vertical line masks + collage settle
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.05
      )
        .fromTo(
          '.hero-line-inner',
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          },
          0.1
        )
        .fromTo(
          '.hero-expected-word',
          { x: -18 },
          { x: 0, duration: 0.85, ease: 'power3.out' },
          0.26
        )
        .fromTo(
          '.hero-copy-block',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.1 },
          0.42
        )
        .fromTo(
          '.hero-collage-group',
          { y: 28, x: 18, scale: 0.97, opacity: 0 },
          { y: 0, x: 0, scale: 1, opacity: 1, duration: 1.05 },
          0.18
        )
        .fromTo(
          '.hero-svg-mark',
          { scale: 0.82, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.45
        );

      // Scroll-out differential parallax on hero collage
      gsap.to('.hero-collage-group', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    // Subtle pointer parallax on fine-pointer desktop screens
    const isFinePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    let handlePointerMove: ((e: MouseEvent) => void) | null = null;

    if (isFinePointer && collageWrapRef.current) {
      const xTo = gsap.quickTo(collageWrapRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
      const yTo = gsap.quickTo(collageWrapRef.current, 'y', { duration: 0.6, ease: 'power2.out' });
      const rotTo = gsap.quickTo(collageWrapRef.current, 'rotation', { duration: 0.7, ease: 'power2.out' });

      handlePointerMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        xTo(nx * 11);
        yTo(ny * 9);
        rotTo(nx * 0.9);
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (handlePointerMove) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
    };
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[min(calc(100vh-88px),980px)] lg:aspect-[1920/980] flex flex-col justify-between pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 overflow-hidden"
    >
      {/* Continuous SVG signal line descending on right and curving to x=978 at bottom edge to meet Expertise */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
      >
        <path
          ref={exitPathRef}
          d="M 1856 640 L 1856 905 Q 1856 940 1820 940 L 1014 940 Q 978 940 978 976 L 978 1080"
          fill="none"
          stroke="#A58AFF"
          strokeWidth="2.2"
          strokeOpacity="0.85"
        />
      </svg>

      {/* Main Two-Column Hero Grid */}
      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)] my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column (~54% -> 7 of 12 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center pt-2 lg:pt-4">
          <p className="hero-eyebrow text-[12px] sm:text-[14px] md:text-[15.5px] font-grotesk font-normal tracking-[0.07em] uppercase text-[#A58AFF] mb-5 sm:mb-7">
            {siteConfig.hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            ref={headlineRef}
            className="zeno-display-hero uppercase text-[#F2F0EB] select-none mb-7 sm:mb-9"
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">WE MAKE</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">
                THE{' '}
                <em className="hero-expected-word zeno-accent-italic inline-block not-italic font-editorial italic pr-2">
                  EXPECTED
                </em>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">
                IRRELEVANT
                <span className="text-[#A58AFF] inline-block ml-0.5">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-copy-block text-[17px] sm:text-[19px] md:text-[22px] leading-[1.44] font-grotesk font-normal text-[#A89FE0] max-w-[540px] xl:max-w-[620px] mb-9 sm:mb-12">
            {siteConfig.hero.body}
          </p>

          {/* CTAs matching reference 01 */}
          <div className="hero-copy-block flex flex-wrap items-center gap-7 sm:gap-10">
            <a
              href={siteConfig.hero.primaryCta.href}
              className="zeno-focus group inline-flex items-center gap-2.5 text-[13px] sm:text-[15px] font-grotesk font-semibold tracking-[0.08em] uppercase text-[#F2F0EB] border-b-[2px] border-[#F2F0EB] pb-1.5 hover:text-[#A58AFF] hover:border-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{siteConfig.hero.primaryCta.label}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenStudio}
              className="zeno-focus text-[13px] sm:text-[15px] font-grotesk font-medium tracking-[0.08em] uppercase text-[#8E8B99] hover:text-[#F2F0EB] transition-colors py-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {siteConfig.hero.secondaryCta.label}
            </button>
          </div>
        </div>

        {/* Right Column (~46% -> 5 of 12 cols): Layered Hero Collage Artwork + Live SVG Marks */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
          <div
            ref={collageWrapRef}
            className="hero-collage-group relative w-full max-w-[580px] lg:max-w-[740px] aspect-[1000/1030]"
          >
            {/* Primary Art-Directed Collage Crop */}
            <img
              src="/templates/zeno/hero-collage.webp"
              alt="ZENO Studio System 04 layered editorial collage with monochrome architecture, cobalt arc, folded silver ribbon, and oversized serif Z"
              width={1000}
              height={1030}
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain crop-blend-hero select-none pointer-events-none drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
            />

            {/* Live SVG editorial registration marks & crosshair overlays */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 620"
              className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            >
              {/* Top-left subtle crosshair */}
              <g className="hero-svg-mark" opacity="0.45">
                <circle cx="24" cy="36" r="6" stroke="#F2F0EB" strokeWidth="1" fill="none" />
                <line x1="14" y1="36" x2="34" y2="36" stroke="#F2F0EB" strokeWidth="1" />
                <line x1="24" y1="26" x2="24" y2="46" stroke="#F2F0EB" strokeWidth="1" />
              </g>
              {/* Bottom-right registration target near Z */}
              <g className="hero-svg-mark" opacity="0.55">
                <line x1="568" y1="585" x2="588" y2="585" stroke="#A58AFF" strokeWidth="1.2" />
                <line x1="578" y1="575" x2="578" y2="595" stroke="#A58AFF" strokeWidth="1.2" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Footer-Level Hero Metadata Row */}
      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)] pt-8 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[11px] sm:text-[13px] font-grotesk tracking-[0.08em] uppercase text-[#7E7B8A]">
          {siteConfig.hero.microtypeLeft}
        </p>

        <a
          href="#expertise"
          className="zeno-focus group inline-flex items-center gap-2 text-[11px] sm:text-[13px] font-grotesk tracking-[0.09em] uppercase text-[#A58AFF] hover:text-[#F2F0EB] transition-colors whitespace-nowrap shrink-0"
        >
          <span>{siteConfig.hero.microtypeRight}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-y-1"
          >
            ↓
          </span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/MobileMenu.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig, NavItem } from '../data/siteConfig';
import { Wordmark } from './Wordmark';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudio: () => void;
  onOpenContact: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenStudio,
  onOpenContact,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.action === 'studio-dialog') {
      e.preventDefault();
      onClose();
      onOpenStudio();
    } else if (item.action === 'contact-dialog') {
      e.preventDefault();
      onClose();
      onOpenContact();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-[#111117]/98 backdrop-blur-md flex flex-col justify-between px-6 py-6 border-l border-[#F2F0EB]/15"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#F2F0EB]/20 pb-5">
        <Wordmark size="sm" onClick={onClose} />
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="zeno-focus px-3.5 py-2 text-xs font-medium tracking-[0.16em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF]"
        >
          CLOSE ✕
        </button>
      </div>

      {/* Main Nav Links */}
      <nav aria-label="Mobile primary navigation" className="my-auto py-8">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#A58AFF] mb-6">
          INDEX / NAVIGATION
        </p>
        <ul className="space-y-5">
          {siteConfig.navItems.map((item, idx) => (
            <li key={item.id} className="border-b border-[#F2F0EB]/10 pb-4">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(item, e)}
                className="zeno-focus flex items-baseline justify-between text-3xl font-editorial text-[#F2F0EB] hover:text-[#A58AFF] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs font-grotesk text-[#96939F] tracking-[0.16em]">
                  0{idx + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom CTA & Metadata */}
      <div className="pt-4 border-t border-[#F2F0EB]/20 space-y-4">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenContact();
          }}
          className="zeno-focus w-full py-3.5 px-6 rounded-full bg-[#F2F0EB] text-[#111117] font-grotesk text-xs font-semibold tracking-[0.14em] uppercase flex items-center justify-center gap-2 hover:bg-[#A58AFF] transition-colors"
        >
          <span>START A PROJECT</span>
          <span aria-hidden="true">↗</span>
        </button>
        <div className="flex items-center justify-between text-[10px] tracking-[0.14em] uppercase text-[#96939F]">
          <span>INDEPENDENT CREATIVE PRACTICE</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/ParadoxMark.tsx">
<![CDATA['use client';

import React from 'react';

interface ParadoxMarkProps {
  className?: string;
  size?: number;
  strokeColor?: string;
}

export const ParadoxMark: React.FC<ParadoxMarkProps> = ({
  className = '',
  size = 42,
  strokeColor = 'rgba(242, 240, 235, 0.42)',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Interrupted circle with intentional top-right gap matching reference */}
      <path
        d="M 34.5 9.2 A 17.5 17.5 0 1 0 39.8 16.5"
        stroke={strokeColor}
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      {/* Diagonal slash */}
      <line
        x1="9.5"
        y1="38.5"
        x2="38.5"
        y2="9.5"
        stroke={strokeColor}
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ParadoxMark;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/ProjectDetailDialog.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { ProjectItem, projectsData } from '../data/projects';

interface ProjectDetailDialogProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onStartProject: () => void;
}

export const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
  project,
  onClose,
  onSelectProject,
  onStartProject,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const siblingProject =
    projectsData.find((p) => p.id !== project.id) || projectsData[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[1060px] bg-[#14141C] border border-[#F2F0EB]/25 p-6 sm:p-10 md:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.9)] my-auto max-h-[92vh] overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2F0EB]/18 pb-5 mb-7">
          <div className="flex items-center gap-3 text-[11px] sm:text-[12px] font-grotesk tracking-[0.14em] uppercase text-[#A58AFF]">
            <span>STUDIO ARCHIVE / {project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#96939F]">{project.archiveStamp}</span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close project case study"
            className="zeno-focus px-4 py-1.5 text-xs font-grotesk tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF] hover:text-[#A58AFF] transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Title & Disciplines */}
        <div className="mb-7">
          <h2
            id="project-dialog-title"
            className="font-editorial text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] leading-[1.0] uppercase text-[#F2F0EB] mb-2"
          >
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-grotesk tracking-[0.1em] uppercase text-[#D8CFF2]">
            {project.disciplines}
          </p>
        </div>

        {/* Artwork Showcase */}
        <div className="w-full overflow-hidden border border-[#F2F0EB]/15 bg-[#111117] mb-8 max-h-[460px] flex items-center justify-center">
          <img
            src={project.artwork}
            alt={project.artworkAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full max-h-[460px] object-contain"
          />
        </div>

        {/* Case Study Sections: The Brief, Creative Direction, Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-9">
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-grotesk font-semibold tracking-[0.16em] uppercase text-[#A58AFF]">
              THE BRIEF
            </h3>
            <p className="text-sm sm:text-[15px] font-grotesk text-[#F2F0EB]/90 leading-relaxed">
              {project.caseStudy.theBrief}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-grotesk font-semibold tracking-[0.16em] uppercase text-[#A58AFF]">
              CREATIVE DIRECTION
            </h3>
            <p className="text-sm sm:text-[15px] font-grotesk text-[#F2F0EB]/90 leading-relaxed">
              {project.caseStudy.creativeDirection}
            </p>
            <p className="text-xs font-grotesk text-[#96939F] pt-1">
              {project.caseStudy.editorialNotes}
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-grotesk font-semibold tracking-[0.16em] uppercase text-[#A58AFF]">
              DELIVERABLES
            </h3>
            <ul className="space-y-2 text-sm font-grotesk text-[#D8CFF2]">
              {project.caseStudy.deliverables.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 border-b border-[#F2F0EB]/10 pb-1.5"
                >
                  <span className="text-[11px] text-[#A58AFF] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal World Palette Swatches & Concept Disclosure */}
        <div className="border-t border-[#F2F0EB]/16 pt-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-grotesk tracking-[0.14em] uppercase text-[#96939F] block mb-2">
              INTERNAL COLOR WORLD — {project.palette.name}
            </span>
            <div className="flex flex-wrap items-center gap-4">
              {project.palette.swatches.map((sw) => (
                <div key={sw.label} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-4 h-4 rounded-full border border-[#F2F0EB]/30 inline-block"
                    style={{ backgroundColor: sw.hex }}
                  />
                  <span className="text-xs font-grotesk text-[#D8CFF2]">
                    {sw.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs font-grotesk text-[#96939F] italic">
            {project.caseStudy.conceptNotice}
          </p>
        </div>

        {/* Bottom Navigation & CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F2F0EB]/18">
          <button
            type="button"
            onClick={() => onSelectProject(siblingProject)}
            className="zeno-focus text-xs sm:text-sm font-grotesk font-medium tracking-[0.1em] uppercase text-[#B5A3FF] hover:text-[#F2F0EB] transition-colors cursor-pointer"
          >
            NEXT CASE STUDY: {siblingProject.title} →
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="zeno-focus px-6 py-3 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:bg-[#A58AFF] transition-colors cursor-pointer"
          >
            START A CONVERSATION ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailDialog;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/SiteHeader.tsx">
<![CDATA['use client';

import React, { useState, useEffect } from 'react';
import { siteConfig, NavItem } from '../data/siteConfig';
import { Wordmark } from './Wordmark';
import { MobileMenu } from './MobileMenu';

interface SiteHeaderProps {
  onOpenStudio: () => void;
  onOpenContact: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onOpenStudio,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [keylineReady, setKeylineReady] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setKeylineReady(true));
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.action === 'studio-dialog') {
      e.preventDefault();
      onOpenStudio();
    } else if (item.action === 'contact-dialog') {
      e.preventDefault();
      onOpenContact();
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#111117]/92 backdrop-blur-md py-3.5 md:py-4'
            : 'bg-[#111117]/75 backdrop-blur-[2px] py-4 md:py-6'
        }`}
      >
        <div className="max-w-[1920px] w-full mx-auto px-[clamp(22px,3.125%,60px)] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark + Paradox Symbol */}
          <Wordmark size={scrolled ? 'sm' : 'md'} />

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-4 lg:gap-5 text-[15px] lg:text-[16px] font-normal text-[#96939F] ml-auto mr-4 lg:mr-8"
          >
            {siteConfig.navItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                {idx > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-[#96939F]/50 select-none text-xs"
                  >
                    •
                  </span>
                )}
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className="zeno-focus whitespace-nowrap shrink-0 text-[#B8B5C3] hover:text-[#F2F0EB] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#A58AFF] after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* Zone 3: Primary Action Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenContact();
              }}
              className="zeno-focus hidden sm:inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full border border-[#F2F0EB]/45 text-[#F2F0EB] text-[12px] lg:text-[13px] font-medium tracking-[0.11em] uppercase whitespace-nowrap shrink-0 hover:border-[#A58AFF] hover:bg-[#A58AFF]/10 transition-all duration-200 group"
            >
              <span>START A PROJECT</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
              className="zeno-focus md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F2F0EB]/35 text-xs font-medium tracking-[0.14em] uppercase text-[#F2F0EB] whitespace-nowrap shrink-0"
            >
              <span>MENU</span>
              <span aria-hidden="true" className="text-[#A58AFF]">
                +
              </span>
            </button>
          </div>
        </div>

        {/* Bottom extending hairline divider */}
        <div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-[1px] bg-[#F2F0EB]/22 transition-all duration-1000 ease-out ${
            keylineReady ? 'w-full' : 'w-0'
          } ${scrolled ? 'bg-[#F2F0EB]/30' : 'bg-[#F2F0EB]/20'}`}
        />
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenStudio={onOpenStudio}
        onOpenContact={onOpenContact}
      />
    </>
  );
};

export default SiteHeader;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/StudioDialog.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { ParadoxMark } from './ParadoxMark';

interface StudioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const StudioDialog: React.FC<StudioDialogProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { studioManifesto } = siteConfig;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="studio-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[920px] bg-[#14141C] border border-[#F2F0EB]/25 p-6 sm:p-10 md:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.85)] my-auto max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#F2F0EB]/18 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <ParadoxMark size={28} />
            <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF]">
              {studioManifesto.label}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close Studio dialog"
            className="zeno-focus px-4 py-1.5 text-xs font-grotesk tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF] hover:text-[#A58AFF] transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Manifesto Headline & Copy */}
        <h2
          id="studio-dialog-title"
          className="font-editorial text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] leading-[1.02] uppercase text-[#F2F0EB] mb-6"
        >
          {studioManifesto.headline}
        </h2>

        <p className="text-[17px] sm:text-[19px] font-grotesk text-[#D8CFF2] leading-relaxed mb-6">
          {studioManifesto.lead}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14.5px] sm:text-[15.5px] font-grotesk text-[#96939F] leading-relaxed mb-10">
          {studioManifesto.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Studio Principles */}
        <div className="border-t border-[#F2F0EB]/18 pt-7 mb-10">
          <h3 className="text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF] mb-5">
            STUDIO PRINCIPLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {studioManifesto.principles.map((p) => (
              <div key={p.index} className="border-t border-[#F2F0EB]/12 pt-3">
                <span className="text-xs font-grotesk text-[#A58AFF] tracking-[0.14em]">
                  {p.index}
                </span>
                <h4 className="text-base font-grotesk font-semibold text-[#F2F0EB] mt-1 mb-1.5">
                  {p.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#96939F] leading-relaxed">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Four Disciplines Summary */}
        <div className="border-t border-[#F2F0EB]/18 pt-7 mb-8">
          <h3 className="text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF] mb-4">
            FOUR INTEGRATED DISCIPLINES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {servicesData.map((s) => (
              <div key={s.id} className="p-3.5 border border-[#F2F0EB]/12 bg-[#111117]/60">
                <p className="text-xs font-grotesk font-semibold tracking-[0.06em] uppercase text-[#F2F0EB]">
                  {s.label}
                </p>
                <p className="text-xs text-[#96939F] mt-1">{s.shortDesc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F2F0EB]/18">
          <span className="text-xs font-grotesk tracking-[0.1em] uppercase text-[#96939F]">
            ZENO. — INDEPENDENT CREATIVE PRACTICE
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="zeno-focus px-6 py-3 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:bg-[#A58AFF] transition-colors cursor-pointer"
          >
            START A PROJECT ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioDialog;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/Wordmark.tsx">
<![CDATA['use client';

import React from 'react';
import { ParadoxMark } from './ParadoxMark';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  showSymbol?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  size = 'md',
  showSymbol = true,
  className = '',
  onClick,
}) => {
  const textSizeClasses =
    size === 'lg'
      ? 'text-[2.75rem] sm:text-[3.6rem] md:text-[4.25rem] tracking-[-0.03em]'
      : size === 'sm'
      ? 'text-[1.5rem] tracking-[-0.03em]'
      : 'text-[1.85rem] sm:text-[2.35rem] md:text-[2.65rem] tracking-[-0.03em]';

  const symbolSize = size === 'lg' ? 52 : size === 'sm' ? 30 : 40;

  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label="ZENO. — Return to top"
      className={`zeno-focus inline-flex items-center gap-3.5 sm:gap-5 group whitespace-nowrap shrink-0 select-none ${className}`}
    >
      <span
        className={`font-grotesk font-bold uppercase leading-none text-[#F2F0EB] transition-transform duration-300 group-hover:translate-x-0.5 ${textSizeClasses}`}
      >
        ZENO<span className="text-[#A58AFF] inline-block ml-[1px]">.</span>
      </span>
      {showSymbol && (
        <span className="transition-transform duration-500 ease-out group-hover:rotate-12">
          <ParadoxMark size={symbolSize} />
        </span>
      )}
    </a>
  );
};

export default Wordmark;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/components/WorkSection.tsx">
<![CDATA['use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData, workSectionContent, ProjectItem } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const [hoveredProject, setHoveredProject] = useState<ProjectItem['id'] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cobaltWaveRef = useRef<SVGPathElement>(null);
  const violetSpineRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  const auren = projectsData[0];
  const morrow = projectsData[1];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Opposing horizontal / vertical headline mask reveal
      gsap.fromTo(
        '.work-line-inner',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Auren enters from lower-left
      gsap.fromTo(
        '.work-world-auren',
        { x: -32, y: 36, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Morrow enters from above-right with slight settle
      gsap.fromTo(
        '.work-world-morrow',
        { x: 32, y: -28, rotation: 0.8, opacity: 0 },
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scroll-synced cobalt ribbon drawing while keeping continuous violet spine unbroken
      if (cobaltWaveRef.current) {
        const len = cobaltWaveRef.current.getTotalLength?.() || 1400;
        gsap.set(cobaltWaveRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len * 0.75,
        });
        gsap.to(cobaltWaveRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="relative w-full lg:aspect-[1920/1143] flex flex-col justify-center py-12 sm:py-16 lg:py-12 overflow-hidden"
    >
      {/* Live SVG Studio Archive Grid, Cobalt/Violet Ribbon, & Continuous Signal Path */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1143"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
      >
        <defs>
          <linearGradient id="workCobaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A60F8" />
            <stop offset="50%" stopColor="#5B6EFB" />
            <stop offset="100%" stopColor="#9D86FF" />
          </linearGradient>
        </defs>

        {/* Studio Archive Registration Frame behind compositions */}
        <rect
          x="832"
          y="155"
          width="1026"
          height="790"
          fill="none"
          stroke="rgba(242,240,235,0.18)"
          strokeWidth="1"
        />
        <line
          x1="832"
          y1="612"
          x2="1858"
          y2="612"
          stroke="rgba(242,240,235,0.16)"
          strokeWidth="1"
        />

        {/* Top-right Concentric Registration Rings */}
        <circle
          cx="1725"
          cy="210"
          r="172"
          fill="none"
          stroke="rgba(242,240,235,0.22)"
          strokeWidth="1.2"
        />
        <circle
          cx="1725"
          cy="210"
          r="148"
          fill="none"
          stroke="rgba(242,240,235,0.14)"
          strokeWidth="1"
        />

        {/* Wide Twisting Cobalt/Lilac Ribbon connecting Auren House & Morrow Field */}
        <path
          ref={cobaltWaveRef}
          d="M 920 520 C 1020 385, 1170 330, 1295 385 C 1415 440, 1455 510, 1340 650 C 1235 775, 1140 825, 1030 825 L 1540 825 C 1690 825, 1775 720, 1745 585"
          fill="none"
          stroke="url(#workCobaltGrad)"
          strokeWidth={hoveredProject ? '48' : '42'}
          strokeLinecap="round"
          className="transition-all duration-500"
          opacity="0.92"
        />

        {/* Continuous Vertical Violet Signal Spine:
            Enters at x=978, y=0 (meeting Expertise's bottom x=978),
            curves to x=1322 and exits straight down at x=1322, y=1143 to meet ContactSection */}
        <path
          ref={violetSpineRef}
          d="M 978 0 L 978 22 Q 978 44 1002 44 L 1298 44 Q 1322 44 1322 68 L 1322 1143"
          fill="none"
          stroke="#A58AFF"
          strokeWidth="2.2"
          strokeOpacity="0.88"
        />
        <circle cx="1322" cy="155" r="9" fill="#A58AFF" />
        <circle cx="1322" cy="1055" r="10" fill="#A58AFF" />
      </svg>

      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)]">
        {/* Top Section Header Block */}
        <div className="relative z-20 max-w-[1180px] mb-6 lg:mb-2">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2 sm:mb-3">
            <p className="text-[13px] sm:text-[15px] font-grotesk tracking-[0.07em] uppercase text-[#A58AFF]">
              {workSectionContent.eyebrow}
            </p>
            <span className="hidden md:inline-block text-[11px] font-grotesk tracking-[0.14em] uppercase text-[#7E7B8A] lg:mr-[22%]">
              {workSectionContent.archiveLabel}
            </span>
          </div>

          <h2
            id="work-heading"
            className="zeno-display-work uppercase text-[#F2F0EB] select-none mb-3 sm:mb-4"
          >
            <span className="block overflow-hidden pb-1">
              <span className="work-line-inner block">WORK THAT</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="work-line-inner block">
                CHANGES{' '}
                <em className="zeno-accent-italic not-italic font-editorial italic pr-2">
                  PERSPECTIVE.
                </em>
              </span>
            </span>
          </h2>

          <p className="text-[16px] sm:text-[19px] md:text-[20px] font-grotesk text-[#A89FE0] max-w-[640px]">
            {workSectionContent.subtitle}
          </p>
        </div>

        {/* Asymmetric Two-World Case Study Composition */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end mt-4 lg:-mt-8">
          {/* PROJECT 01: AUREN HOUSE (Spans 7 of 12 cols, sits wider and lower on left-center) */}
          <article
            onMouseEnter={() => setHoveredProject(auren.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="work-world-auren lg:col-span-7 flex flex-col pt-2 lg:pt-12 relative"
          >
            {/* Archive Micro-Caption above Auren */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99]">
                {workSectionContent.archiveLabel}
              </span>
              <span className="text-[11px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99]">
                {auren.archiveStamp}
              </span>
            </div>

            {/* Interactive Artwork Trigger */}
            <div
              onClick={() => onSelectProject(auren)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${auren.title} case study`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(auren);
                }
              }}
              className="zeno-focus group relative w-full aspect-[1192/515] cursor-pointer overflow-hidden transition-all duration-500 ring-1 ring-[#F2F0EB]/12 hover:ring-[#E6DEC8]/55 shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
            >
              <img
                src={auren.artwork}
                alt={auren.artworkAlt}
                width={1192}
                height={504}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center crop-blend-world transition-transform duration-700 ease-out group-hover:scale-[1.018]"
              />
            </div>

            {/* Project 01 Live Metadata & CTA Row matching reference 03 */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-[21px] sm:text-[24px] md:text-[26px] font-grotesk font-normal tracking-[0.01em] uppercase text-[#F2F0EB]">
                  <button
                    type="button"
                    onClick={() => onSelectProject(auren)}
                    className="zeno-focus text-left hover:text-[#A58AFF] transition-colors cursor-pointer"
                  >
                    {auren.title}
                  </button>
                </h3>
                <p className="text-[12px] sm:text-[13.5px] font-grotesk tracking-[0.06em] uppercase text-[#D8CFF2] mt-0.5">
                  {auren.disciplines}
                </p>
                <p className="text-[13.5px] sm:text-[14.5px] font-grotesk text-[#96939F] max-w-[490px] xl:max-w-[560px] mt-1.5 leading-relaxed">
                  {auren.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectProject(auren)}
                className="zeno-focus group inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-grotesk font-medium tracking-[0.08em] uppercase text-[#B5A3FF] hover:text-[#F2F0EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 border-b border-transparent hover:border-[#F2F0EB]"
              >
                <span>EXPLORE PROJECT</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </button>
            </div>
          </article>

          {/* PROJECT 02: MORROW FIELD (Spans 5 of 12 cols, rises higher on right with tall posters) */}
          <article
            onMouseEnter={() => setHoveredProject(morrow.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="work-world-morrow lg:col-span-5 flex flex-col relative"
          >
            {/* Interactive Artwork Trigger */}
            <div
              onClick={() => onSelectProject(morrow)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${morrow.title} case study`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(morrow);
                }
              }}
              className="zeno-focus group relative w-full lg:w-[88%] lg:ml-auto aspect-[810/880] cursor-pointer overflow-hidden transition-all duration-500 ring-1 ring-[#F2F0EB]/12 hover:ring-[#5367F9]/75 shadow-[0_28px_68px_rgba(0,0,0,0.8)]"
            >
              <img
                src={morrow.artwork}
                alt={morrow.artworkAlt}
                width={810}
                height={1080}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top crop-blend-world transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
              />
            </div>

            {/* Project 02 Live Metadata & CTA Row matching reference 03 */}
            <div className="mt-4 w-full lg:w-[88%] lg:ml-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-[21px] sm:text-[24px] md:text-[26px] font-grotesk font-normal tracking-[0.01em] uppercase text-[#F2F0EB]">
                  <button
                    type="button"
                    onClick={() => onSelectProject(morrow)}
                    className="zeno-focus text-left hover:text-[#A58AFF] transition-colors cursor-pointer"
                  >
                    {morrow.title}
                  </button>
                </h3>
                <p className="text-[12px] sm:text-[13.5px] font-grotesk tracking-[0.06em] uppercase text-[#D8CFF2] mt-0.5">
                  {morrow.disciplines}
                </p>
                <p className="text-[13.5px] sm:text-[14.5px] font-grotesk text-[#96939F] max-w-[440px] xl:max-w-[500px] mt-1.5 leading-relaxed">
                  {morrow.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectProject(morrow)}
                className="zeno-focus group inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-grotesk font-medium tracking-[0.08em] uppercase text-[#B5A3FF] hover:text-[#F2F0EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 border-b border-transparent hover:border-[#F2F0EB]"
              >
                <span>EXPLORE PROJECT</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
]]>
    </file>
    <file path="src/app/(zeno)/zeno/data/projects.ts">
<![CDATA[export interface ProjectItem {
  id: 'auren-house' | 'morrow-field';
  number: string;
  name: string;
  title: string;
  disciplines: string;
  disciplineList: string[];
  description: string;
  artwork: string;
  artworkAlt: string;
  archiveStamp: string;
  year: string;
  theme: 'warm-limestone' | 'cobalt-editorial';
  palette: {
    name: string;
    swatches: { label: string; hex: string }[];
  };
  caseStudy: {
    conceptNotice: string;
    theBrief: string;
    creativeDirection: string;
    deliverables: string[];
    editorialNotes: string;
  };
}

export const workSectionContent = {
  eyebrow: '02 / SELECTED WORK',
  headlineLines: ['WORK THAT', 'CHANGES PERSPECTIVE.'],
  subtitle: 'Different challenges. Distinctive worlds. Ideas made tangible.',
  archiveLabel: 'STUDIO ARCHIVE / 2026',
};

export const projectsData: ProjectItem[] = [
  {
    id: 'auren-house',
    number: '01',
    name: 'AUREN HOUSE',
    title: '01 — AUREN HOUSE',
    disciplines: 'HOSPITALITY / BRAND IDENTITY / DIGITAL',
    disciplineList: ['HOSPITALITY', 'BRAND IDENTITY', 'DIGITAL'],
    description:
      'An identity and digital world built around quiet ritual, considered materials, and modern hospitality.',
    artwork: '/templates/zeno/auren-world.webp',
    artworkAlt:
      'Auren House brand world collage featuring travertine architectural furniture, blind-debossed stationery, monogrammed envelopes, and editorial web layouts',
    archiveStamp: 'ARCHIVE REF // AH-2026-01',
    year: '2026',
    theme: 'warm-limestone',
    palette: {
      name: 'Limestone, Uncoated Cream & Warm Umber',
      swatches: [
        { label: 'Travertine', hex: '#E6DEC8' },
        { label: 'Warm Umber', hex: '#6E5A4F' },
        { label: 'Parchment', hex: '#F3EFE6' },
        { label: 'Obsidian Ink', hex: '#181715' },
      ],
    },
    caseStudy: {
      conceptNotice: 'Fictional concept project from the ZENO. 2026 Studio Archive.',
      theBrief:
        'Auren House envisioned a new category of architectural sanctuary—bridging private residential calm with slow-paced hospitality. They needed a brand identity and digital flagship that rejected hospitality clichés in favor of tactile silence, monolithic stonework, and unhurried ritual.',
      creativeDirection:
        'We anchored the visual world in raw travertine geometry, blind-debossed cotton rag papers, and a high-contrast flared serif wordmark. Every digital transition mirrors the physical weight of turning heavy archival pages—pairing warm limestone photography with generous editorial margins.',
      deliverables: [
        'Brand positioning',
        'Identity system',
        'Art direction',
        'Digital experience',
      ],
      editorialNotes:
        'Printed collateral produced on 400gsm cotton stock with custom wax-toned seals and architectural room folios.',
    },
  },
  {
    id: 'morrow-field',
    number: '02',
    name: 'MORROW FIELD',
    title: '02 — MORROW FIELD',
    disciplines: 'FASHION / CAMPAIGN / CREATIVE DIRECTION',
    disciplineList: ['FASHION', 'CAMPAIGN', 'CREATIVE DIRECTION'],
    description:
      'A sharp, culture-led campaign system combining editorial fashion, expressive type, and bold visual rhythm.',
    artwork: '/templates/zeno/morrow-world.webp',
    artworkAlt:
      'Morrow Field Fall Winter 2026 campaign world featuring technical outerwear portrait photography, electric cobalt MF posters, and lookbook spreads',
    archiveStamp: 'ARCHIVE REF // MF-2026-02',
    year: '2026',
    theme: 'cobalt-editorial',
    palette: {
      name: 'Electric Cobalt, Stark Newsprint & Carbon Black',
      swatches: [
        { label: 'Signal Cobalt', hex: '#3B52F6' },
        { label: 'Stark Ivory', hex: '#F2F0EB' },
        { label: 'Carbon Black', hex: '#121216' },
        { label: 'Silver Halide', hex: '#B8B6C2' },
      ],
    },
    caseStudy: {
      conceptNotice: 'Fictional concept project from the ZENO. 2026 Studio Archive.',
      theBrief:
        'For its Fall/Winter 2026 collection, outerwear label Morrow Field sought to break away from sterile lookbooks and establish an unmistakable street-level cultural presence across print posters, zines, and digital lookbooks.',
      creativeDirection:
        'We constructed a modular graphic system around oversized condensed grotesk typography ("MF"), split circular geometric masks, and stark monochrome studio portraits punctuated by electric cobalt technical garments. The campaign reads with the immediacy of wheat-pasted wheatpaste posters and archival Swiss exhibition catalogs.',
      deliverables: [
        'Campaign concept',
        'Photography direction',
        'Editorial system',
        'Launch materials',
      ],
      editorialNotes:
        'Accompanied by a 48-page saddle-stitched newsprint lookbook and wild-posting street campaign system.',
    },
  },
];
]]>
    </file>
    <file path="src/app/(zeno)/zeno/data/services.ts">
<![CDATA[export interface ServiceItem {
  id: 'strategy' | 'identity' | 'campaigns' | 'digital';
  number: string;
  title: string;
  label: string;
  shortDesc: string;
  extendedDesc: string;
  capabilities: string[];
  artwork: string;
  artworkAlt: string;
  archiveCode: string;
  quadrant: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  labelPosition: 'above' | 'below';
  nodeCoord: { x: number; y: number };
}

export const expertiseContent = {
  eyebrow: '01 / WHAT WE DO',
  diagramHeader: 'THE ANATOMY OF AN IDEA',
  headlineLines: ['GOOD IDEAS', "AREN'T", 'ACCIDENTS.'],
  body: 'We connect thinking, making, and moving to create work that stays with people.',
  ctaLabel: 'OUR APPROACH',
};

export const servicesData: ServiceItem[] = [
  {
    id: 'strategy',
    number: '01',
    title: 'STRATEGY',
    label: '01 — STRATEGY',
    shortDesc: 'Positioning, research, direction.',
    extendedDesc:
      'We define the intellectual and cultural foundation of a brand—turning raw market ambiguity into a sharp, defensible point of view.',
    capabilities: [
      'Brand Positioning & Architecture',
      'Cultural & Competitive Research',
      'Narrative & Verbal Direction',
      'Creative Territory Mapping',
    ],
    artwork: '/templates/zeno/strategy-print.webp',
    artworkAlt: 'Editorial grid sheet and bold monochrome print typography specimen for Strategy discipline',
    archiveCode: 'SYS // 01-STR',
    quadrant: 'top-left',
    labelPosition: 'above',
    nodeCoord: { x: 472, y: 540 },
  },
  {
    id: 'identity',
    number: '02',
    title: 'IDENTITY',
    label: '02 — IDENTITY',
    shortDesc: 'Visual systems, typography, expression.',
    extendedDesc:
      'Distinctive visual languages built from custom letterforms, tactile print specifications, and cohesive graphic rules that command recognition.',
    capabilities: [
      'Visual Identity Systems',
      'Bespoke Typography & Wordmarks',
      'Print, Packaging & Materiality',
      'Design Governance & Archives',
    ],
    artwork: '/templates/zeno/identity-print.webp',
    artworkAlt: 'Layered ZENO typographic study with cobalt arc, custom serif glyphs, and registration grid',
    archiveCode: 'SYS // 02-IDN',
    quadrant: 'top-right',
    labelPosition: 'above',
    nodeCoord: { x: 752, y: 386 },
  },
  {
    id: 'campaigns',
    number: '03',
    title: 'CAMPAIGNS',
    label: '03 — CAMPAIGNS',
    shortDesc: 'Art direction, storytelling, activation.',
    extendedDesc:
      'High-tension seasonal campaigns, editorial photography, and physical-to-digital activations designed to interrupt passive scrolling.',
    capabilities: [
      'Campaign Concept & Art Direction',
      'Editorial Photography & Film Direction',
      'Spatial & Print Activations',
      'Launch Choreography',
    ],
    artwork: '/templates/zeno/campaign-print.webp',
    artworkAlt: 'Collage of monochrome editorial posters and high-contrast fashion photography prints',
    archiveCode: 'SYS // 03-CMP',
    quadrant: 'bottom-left',
    labelPosition: 'below',
    nodeCoord: { x: 646, y: 658 },
  },
  {
    id: 'digital',
    number: '04',
    title: 'DIGITAL',
    label: '04 — DIGITAL',
    shortDesc: 'Websites, experiences, interactions.',
    extendedDesc:
      'Flagship websites, interactive archives, and motion-led digital flagships engineered with editorial restraint and tactile precision.',
    capabilities: [
      'Flagship Websites & Digital Worlds',
      'Interactive Art Direction & Motion',
      'Design Systems & Component Libraries',
      'Creative Front-End Engineering',
    ],
    artwork: '/templates/zeno/digital-print.webp',
    artworkAlt: 'Wireframe and typographic motion frame architectural diagram for Digital interfaces',
    archiveCode: 'SYS // 04-DIG',
    quadrant: 'bottom-right',
    labelPosition: 'below',
    nodeCoord: { x: 906, y: 538 },
  },
];
]]>
    </file>
    <file path="src/app/(zeno)/zeno/data/siteConfig.ts">
<![CDATA[export interface NavItem {
  id: string;
  label: string;
  href: string;
  action?: 'scroll' | 'studio-dialog' | 'contact-dialog';
}

export interface ApproachStep {
  number: string;
  phase: string;
  title: string;
  summary: string;
  artifacts: string[];
}

export const siteConfig = {
  name: 'ZENO.',
  tagline: 'INDEPENDENT CREATIVE PRACTICE / 2026',
  shortTagline: 'INDEPENDENT CREATIVE PRACTICE',
  copyright: '© 2026 ZENO. ALL IDEAS IN MOTION.',
  contactEmail: 'hello@zeno.studio',
  isDemoInbox: true,
  navItems: [
    { id: 'work', label: 'Work', href: '#work', action: 'scroll' },
    { id: 'expertise', label: 'Expertise', href: '#expertise', action: 'scroll' },
    { id: 'studio', label: 'Studio', href: '#studio', action: 'studio-dialog' },
    { id: 'contact', label: 'Contact', href: '#contact', action: 'scroll' },
  ] as NavItem[],
  hero: {
    eyebrow: 'INDEPENDENT CREATIVE PRACTICE / 2026',
    headlineLines: ['WE MAKE', 'THE EXPECTED', 'IRRELEVANT.'],
    body: 'We build identities, campaigns, and digital experiences for brands ready to challenge convention.',
    primaryCta: { label: 'EXPLORE OUR WORK', href: '#work' },
    secondaryCta: { label: 'GET TO KNOW US', action: 'studio-dialog' as const },
    microtypeLeft: 'STRATEGY / IDENTITY / CAMPAIGNS / DIGITAL',
    microtypeRight: 'SCROLL TO EXPLORE',
    artwork: '/templates/zeno/hero-collage.webp',
  },
  studioManifesto: {
    label: 'STUDIO ARCHIVE / MANIFESTO 2026',
    headline: 'BUILT FOR TENSION, CLARITY, AND CULTURAL WEIGHT.',
    lead: 'ZENO. is an independent creative practice operating at the intersection of Swiss editorial precision, physical print craft, and kinetic digital systems.',
    body: [
      'Most brand systems are engineered for consensus. They smooth away every edge until nothing memorable remains. We work with founders, cultural institutions, and ambitious houses who recognize that blending in is the riskiest position of all.',
      'Our practice treats digital interfaces with the tactile rigor of art-directed printed matter, and print archives with the responsiveness of living software. Every project begins with strategic conviction and resolves in a distinct visual world.',
    ],
    principles: [
      {
        index: '01',
        title: 'Editorial Rigor',
        detail: 'Typography as architecture. Grid systems built to create deliberate visual tension rather than predictable templates.',
      },
      {
        index: '02',
        title: 'Tangible Worlds',
        detail: 'Identities that hold their gravity across uncoated paper stock, spatial environments, and high-frame-rate web experiences.',
      },
      {
        index: '03',
        title: 'Singular Direction',
        detail: 'Direct collaboration with senior directors from initial positioning hypothesis through final production release.',
      },
    ],
  },
  approachSteps: [
    {
      number: '01',
      phase: 'DISCOVER',
      title: 'Uncover the productive tension',
      summary:
        'We audit category conventions, cultural shifts, and internal ambitions to find the exact fault line where your brand can claim undeniable territory.',
      artifacts: ['Cultural & Category Audit', 'Stakeholder Interviews', 'Strategic Fault-Line Map'],
    },
    {
      number: '02',
      phase: 'DEFINE',
      title: 'Set the thesis & verbal spine',
      summary:
        'Before drawing a single glyph, we lock the positioning thesis, narrative posture, and creative direction into a sharp editorial brief.',
      artifacts: ['Positioning Architecture', 'Verbal Identity & Tone', 'Visual World Hypothesis'],
    },
    {
      number: '03',
      phase: 'DESIGN',
      title: 'Construct the visual & kinetic system',
      summary:
        'We craft bespoke typography, material palettes, art direction, and interactive prototypes that behave as one continuous designed world.',
      artifacts: ['Identity & Type System', 'Print & Packaging Direction', 'Interactive Design System'],
    },
    {
      number: '04',
      phase: 'DELIVER',
      title: 'Launch with uncompromising craft',
      summary:
        'We oversee production, engineer front-end motion, and author living archives so the work enters culture with full force and zero dilution.',
      artifacts: ['Production Engineering', 'Campaign Rollout Assets', 'Living Brand Archive'],
    },
  ] as ApproachStep[],
  socials: [
    { label: 'INSTAGRAM', status: 'Template sample — configure handle before publishing' },
    { label: 'BEHANCE', status: 'Template sample — configure portfolio URL before publishing' },
    { label: 'LINKEDIN', status: 'Template sample — configure company page before publishing' },
  ],
};
]]>
    </file>
    <file path="src/app/(zeno)/zeno/hooks/useReducedMotion.ts">
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

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
]]>
    </file>
    <file path="src/app/(zeno)/zeno/utils/contactValidation.ts">
<![CDATA[export interface ContactFormInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export const PROJECT_TYPES = [
  'Brand Strategy & Positioning',
  'Visual Identity & Typography',
  'Campaign & Art Direction',
  'Digital Experience & Flagship Web',
  'Full-Scope Brand World',
] as const;

export function validateContactForm(input: ContactFormInput): {
  isValid: boolean;
  errors: ContactValidationErrors;
} {
  const errors: ContactValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedType = input.projectType.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name or studio affiliation.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please provide a contact email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  if (!trimmedType) {
    errors.projectType = 'Please select a primary discipline or scope.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please share a brief overview of your project or timeline.';
  } else if (trimmedMessage.length < 12) {
    errors.message = 'Please include a bit more detail (at least 12 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatProjectBrief(input: ContactFormInput): string {
  return [
    'ZENO. — PROJECT INQUIRY BRIEF (2026)',
    '----------------------------------------',
    `From: ${input.name.trim()} <${input.email.trim()}>`,
    `Scope / Discipline: ${input.projectType.trim()}`,
    '',
    'Project Direction & Context:',
    input.message.trim(),
    '----------------------------------------',
    'Prepared via ZENO. Interactive Studio Template',
  ].join('\n');
}

export function buildMailtoHref(recipientEmail: string, input: ContactFormInput): string {
  const subject = encodeURIComponent(`ZENO. Project Inquiry — ${input.projectType.trim()} (${input.name.trim()})`);
  const body = encodeURIComponent(formatProjectBrief(input));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
]]>
    </file>
  </files>
</template>

<template slug="tessera" name="TESSERA">
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
    <file path="src/app/(tessera)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./tessera/tessera.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const iBM_Plex_Mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400","500"],
  variable: "--font-ibm-plex-mono",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "TESSERA — Architectural Acoustic Wall Systems",
  description: "Modular sculptural acoustic wall installations engineered for architectural interiors. Sound, shaped by design.",
  openGraph: {
    title: "TESSERA — Architectural Acoustic Wall Systems",
    description: "Modular sculptural acoustic wall installations engineered for architectural interiors. Sound, shaped by design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0D10",
};

export default function TesseraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorant_Garamond.variable} ${iBM_Plex_Mono.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#0B0D10] text-[#F1F5F9] antialiased selection:bg-[#C89D66]/30 selection:text-[#F8FAFC] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(tessera)/tessera/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/tessera";

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
        className={`tessera-placeholder ${className ?? ""}`}
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
    <file path="src/app/(tessera)/tessera/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0B0D10" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#161A21" text-anchor="middle">T</text>
</svg>
]]>
    </file>
    <file path="src/app/(tessera)/tessera/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TESSERA — Architectural Acoustic Wall Systems";

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
          backgroundColor: "#0B0D10",
          color: "#161A21",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>TESSERA</span>
          <span style={{ color: "#F1F5F9" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            TESSERA — Architectural Acoustic Wall Systems
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Modular sculptural acoustic wall installations engineered for architectural interiors. Sound, shaped by design.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#F1F5F9" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(tessera)/tessera/page.tsx">
<![CDATA["use client";

import TesseraApp from "./TesseraApp";

export default function TesseraPage() {
  return <TesseraApp />;
}
]]>
    </file>
    <file path="src/app/(tessera)/tessera/tessera.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  :root {
    --font-display: var(--font-cormorant-garamond), 'Cormorant Garamond', Georgia, serif;
    --font-sans: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: var(--font-ibm-plex-mono), 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

    --bg-canvas: #0b0d10;
    --bg-elevated: #111419;
    --bg-specimen: #161a21;
    --border-hairline: rgba(226, 232, 240, 0.09);
    --text-primary: #f1f5f9;
    --text-muted: #94a3b8;
    --accent-bronze: #c89d66;
  }

  html {
    font-family: var(--font-sans);
    background-color: var(--bg-canvas);
    color: var(--text-primary);
    letter-spacing: 0.01em;
  }

  h1,
  h2,
  h3,
  .font-display {
    font-family: var(--font-display);
    text-wrap: balance;
  }

  .font-mono-tabular {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
}

/* Pointer-following radial surface highlight */
.radial-spotlight {
  position: relative;
  overflow: hidden;
}

.radial-spotlight::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--spot-opacity, 0);
  transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1);
  background: radial-gradient(
    420px circle at var(--spot-x, 50%) var(--spot-y, 50%),
    rgba(200, 157, 102, 0.13),
    transparent 70%
  );
  z-index: 1;
}

/* Custom architectural range input styling */
input[type="range"].arch-slider {
  -webkit-appearance: none;
  appearance: none;
  background: rgba(226, 232, 240, 0.14);
  height: 2px;
  border-radius: 999px;
}

input[type="range"].arch-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #c89d66;
  border: 2px solid #0b0d10;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

input[type="range"].arch-slider::-webkit-slider-thumb:hover {
  transform: scale(1.18);
}

input[type="range"].arch-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #c89d66;
  border: 2px solid #0b0d10;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Split-line mask utility */
.line-mask {
  overflow: hidden;
  display: block;
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
    <file path="src/app/(tessera)/tessera/TesseraApp.tsx">
<![CDATA['use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrangementPatternId,
  ConfiguratorState,
  DEFAULT_CONFIGURATOR_STATE,
  MaterialFinishId,
  TileShapeId,
  calculateAcousticMetrics,
  formatSpecificationSummary,
} from './domain/tesseraSystem';
import { CustomReticleCursor, usePrefersReducedMotion } from './components/InteractivePrimitives';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { PinnedChaptersSection } from './components/PinnedChaptersSection';
import { MaterialsSection } from './components/MaterialsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProductConfigurator } from './components/ProductConfigurator';
import { CommissionFooterSection } from './components/CommissionFooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function TesseraApp() {
  const reducedMotion = usePrefersReducedMotion();
  const heroScrollProgressRef = useRef<number>(0);
  const [config, setConfig] = useState<ConfiguratorState>(DEFAULT_CONFIGURATOR_STATE);

  const metrics = useMemo(() => calculateAcousticMetrics(config), [config]);
  const liveSpecSummary = useMemo(
    () => formatSpecificationSummary(config, metrics),
    [config, metrics],
  );
  const [attachedSummary, setAttachedSummary] = useState<string>('');
  const [suggestedArea, setSuggestedArea] = useState<number>(metrics.wallAreaSqM);

  useEffect(() => {
    setSuggestedArea(metrics.wallAreaSqM);
  }, [metrics.wallAreaSqM]);

  // Choreograph Hero reversible scroll-linked 3D progress
  useEffect(() => {
    if (reducedMotion) {
      heroScrollProgressRef.current = 0;
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          heroScrollProgressRef.current = self.progress;
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSelectMaterial = (materialId: MaterialFinishId) => {
    setConfig((prev) => ({
      ...prev,
      material: materialId,
    }));
  };

  const handleLoadProjectPreset = (preset: {
    shape: TileShapeId;
    material: MaterialFinishId;
    pattern: ArrangementPatternId;
  }) => {
    setConfig((prev) => ({
      ...prev,
      shape: preset.shape,
      material: preset.material,
      pattern: preset.pattern,
      customRotations: {},
    }));
  };

  const handleResetConfigurator = () => {
    setConfig({
      ...DEFAULT_CONFIGURATOR_STATE,
      customRotations: {},
    });
  };

  const handleTransferToInquiry = (summaryText: string, areaSqM: number) => {
    setAttachedSummary(summaryText);
    setSuggestedArea(areaSqM);
  };

  return (
    <div className="min-h-screen bg-[#121311] text-[#F1F5F9] overflow-x-clip">
      <CustomReticleCursor />
      <Navbar />
      <main id="main-content">
        <HeroSection
          scrollProgressRef={heroScrollProgressRef}
          onSyncMaterial={handleSelectMaterial}
        />
        <ManifestoSection />
        <PinnedChaptersSection />
        <MaterialsSection onSelectMaterialForConfigurator={handleSelectMaterial} />
        <ProjectsSection onLoadProjectPreset={handleLoadProjectPreset} />
        <ProductConfigurator
          config={config}
          onChangeConfig={setConfig}
          onResetConfig={handleResetConfigurator}
          onTransferToInquiry={handleTransferToInquiry}
        />
        <CommissionFooterSection
          attachedSpecSummary={attachedSummary || liveSpecSummary}
          suggestedAreaSqM={suggestedArea}
        />
      </main>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/CommissionFooterSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import {
  InquiryFormInput,
  validateInquiryForm,
} from '../domain/tesseraSystem';
import { MagneticButton, usePrefersReducedMotion } from './InteractivePrimitives';

gsap.registerPlugin(ScrollTrigger);

interface CommissionFooterSectionProps {
  attachedSpecSummary: string;
  suggestedAreaSqM: number;
}

const PROJECT_TYPOLOGIES = [
  'Cultural & Auditorium',
  'Museum & Gallery Atrium',
  'Commercial Executive Headquarters',
  'Hospitality & Fine Dining',
  'Higher Education & Library',
  'Private Residence',
] as const;

export const CommissionFooterSection: React.FC<CommissionFooterSectionProps> = ({
  attachedSpecSummary,
  suggestedAreaSqM,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<InquiryFormInput>({
    architectName: '',
    firmOrStudio: '',
    workEmail: '',
    projectTypology: 'Cultural & Auditorium',
    targetAreaSqM: String(suggestedAreaSqM),
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormInput, string>>>({});
  const [submittedDossier, setSubmittedDossier] = useState<{
    referenceCode: string;
    input: InquiryFormInput;
    spec: string;
  } | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Sync suggested area when configurator transfers spec
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      targetAreaSqM: String(suggestedAreaSqM),
    }));
  }, [suggestedAreaSqM]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotateX: 9, y: 48, opacity: 0, transformPerspective: 1200 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateInquiryForm(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const deterministicHash = Math.abs(
      form.workEmail.split('').reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7),
    )
      .toString(36)
      .slice(0, 5)
      .toUpperCase();

    setSubmittedDossier({
      referenceCode: `TSR-${deterministicHash}`,
      input: { ...form },
      spec: attachedSpecSummary,
    });
  };

  return (
    <div ref={sectionRef} className="bg-[#0B0D10] border-t border-slate-200/10">
      {/* Final Cinematic Commission CTA */}
      <section id="inquire" className="py-24 sm:py-32">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
          <div
            ref={cardRef}
            className="bg-[#111419] border border-slate-200/12 rounded-2xl p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          >
            {/* Left Architectural Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.08] font-normal text-[#F8FAFC]">
                Plan your space.
              </h2>

              <p className="text-[15px] leading-[1.7] text-[#94A3B8]">
                Choose your finishes and prepare a sample request with your wall specification.
              </p>

              <details className="pt-4 border-t border-slate-200/10 text-xs font-mono-tabular text-[#94A3B8]">
                <summary className="text-[#E2C399] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Your wall specification</summary>
                <p className="mt-3 leading-relaxed whitespace-pre-line text-[#CBD5E1]">
                  {attachedSpecSummary.split('\n').slice(1, 5).join('\n')}
                </p>
              </details>
            </div>

            {/* Right Validated Architectural Request Form */}
            <div className="lg:col-span-7 bg-[#0B0D10] border border-slate-200/10 rounded-xl p-6 sm:p-8">
              {submittedDossier ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="space-y-6 py-4"
                >
                  <div className="flex items-center gap-3 text-[#E2C399]">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span className="font-mono-tabular text-xs tracking-wider">
                      Sample request prepared: {submittedDossier.referenceCode}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-[#F8FAFC]">
                    Thank you, {submittedDossier.input.architectName}.
                  </h3>

                  <p className="text-sm leading-relaxed text-[#94A3B8]">
                    Your request is ready below. This demo does not send emails or ship samples.
                  </p>

                  <pre className="bg-[#111419] border border-slate-200/10 rounded-lg p-4 text-xs font-mono-tabular text-[#CBD5E1] whitespace-pre-wrap">
                    {submittedDossier.spec}
                  </pre>

                  <button
                    type="button"
                    onClick={() => setSubmittedDossier(null)}
                    className="px-4 py-2 text-xs font-medium rounded-md border border-slate-200/15 text-[#CBD5E1] hover:border-[#C89D66] transition-colors cursor-pointer"
                  >
                    Start another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="architect-name"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="architect-name"
                        type="text"
                        value={form.architectName}
                        aria-invalid={Boolean(errors.architectName)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, architectName: e.target.value }))
                        }
                        placeholder="Astrid Lindqvist"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.architectName && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.architectName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="firm-studio"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Studio *
                      </label>
                      <input
                        id="firm-studio"
                        type="text"
                        value={form.firmOrStudio}
                        aria-invalid={Boolean(errors.firmOrStudio)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, firmOrStudio: e.target.value }))
                        }
                        placeholder="Lindqvist & Partner Arkitekter"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.firmOrStudio && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.firmOrStudio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="work-email"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="work-email"
                        type="email"
                        value={form.workEmail}
                        aria-invalid={Boolean(errors.workEmail)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, workEmail: e.target.value }))
                        }
                        placeholder="astrid@studio.no"
                        className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.workEmail && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.workEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="target-area"
                        className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                      >
                        Wall area (m²) *
                      </label>
                      <input
                        id="target-area"
                        type="number"
                        min={1}
                        step="0.1"
                        value={form.targetAreaSqM}
                        aria-invalid={Boolean(errors.targetAreaSqM)}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, targetAreaSqM: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 text-sm font-mono-tabular rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] focus:outline-none focus:border-[#C89D66]"
                      />
                      {errors.targetAreaSqM && (
                        <p className="mt-1 text-xs text-amber-300" role="alert">
                          {errors.targetAreaSqM}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="project-typology"
                      className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                    >
                      Space type *
                    </label>
                    <select
                      id="project-typology"
                      value={form.projectTypology}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, projectTypology: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] focus:outline-none focus:border-[#C89D66]"
                    >
                      {PROJECT_TYPOLOGIES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="project-notes"
                      className="block text-xs font-medium text-[#CBD5E1] mb-1.5"
                    >
                      Project notes (optional)
                    </label>
                    <textarea
                      id="project-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder="Tell us about your space."
                      className="w-full px-3.5 py-2.5 text-sm rounded-md bg-[#111419] border border-slate-200/15 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#C89D66]"
                    />
                  </div>

                  <div className="pt-2">
                    <p className="mb-3 text-xs text-[#94A3B8]">Demo form. No request is sent.</p>
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      className="w-full sm:w-auto justify-center"
                    >
                      Prepare sample request
                      <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Architectural Footer */}
      <footer className="border-t border-slate-200/10 py-14 bg-[#0B0D10]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <a
              href="#hero"
              className="font-display text-2xl font-semibold tracking-[0.14em] text-[#F8FAFC]"
            >
              TESSERA
            </a>
            <p className="text-xs text-[#94A3B8]">
              Sound, shaped by design.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]"
          >
            <a href="#philosophy" className="hover:text-[#F1F5F9] transition-colors">
              Philosophy
            </a>
            <a href="#system" className="hover:text-[#F1F5F9] transition-colors">
              System
            </a>
            <a href="#materials" className="hover:text-[#F1F5F9] transition-colors">
              Materials
            </a>
            <a href="#projects" className="hover:text-[#F1F5F9] transition-colors">
              Projects
            </a>
            <a href="#configurator" className="hover:text-[#F1F5F9] transition-colors">
              Configurator
            </a>
          </nav>

          <div className="text-xs text-[#64748B] font-mono-tabular">
            © {currentYear} Tessera Acoustic Systems AG · Zürich &amp; Copenhagen
          </div>
        </div>
      </footer>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/HeroCanvas3D.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { HeroCompositionId } from '../domain/tesseraSystem';
import {
  HeroMaterialModeId,
  RESONANCE_COLS,
  RESONANCE_ROWS,
  RESONANCE_TILE_SIZE,
  ResonanceTileSpec,
  TileQuarterTurns,
  buildResonanceWallCatalog,
  computeResonanceTileBaseTransform,
  rotateTileQuarterTurns,
  sampleGlobalSCurveRelief,
  snapClockwiseAngleToQuarterTurns,
} from '../domain/resonanceWall';
import { playTactileClick } from '../utils/acousticAudio';

interface HeroCanvas3DProps {
  composition: HeroCompositionId;
  materialMode: HeroMaterialModeId;
  exploded: boolean;
  reducedMotion: boolean;
  tileRotations: Record<string, TileQuarterTurns>;
  selectedTileId?: string | null;
  scrollProgressRef: React.MutableRefObject<number>;
  onSelectTile?: (tileId: string | null) => void;
  onCommitTileRotation: (tileId: string, nextTurns: TileQuarterTurns) => void;
  onWebGLUnavailable?: () => void;
}

function detectSoftwareWebGL(): { supported: boolean; isSoftwareGl: boolean } {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return { supported: false, isSoftwareGl: true };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return { supported: true, isSoftwareGl };
  } catch {
    return { supported: false, isSoftwareGl: true };
  }
}

/**
 * Generates procedural tileable PBR albedo & bump textures for:
 * 1) Ivory Mineral Plaster, 2) Charcoal Acoustic Felt, 3) Pale Nordic Oak
 */
function createProceduralMaterialTextures(maxAnisotropy: number) {
  const createSeededRandom = (seedInit: number) => {
    let s = seedInit;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };

  // 1. Ivory Plaster Albedo & Fine Mineral Bump
  const plasterSize = 256;
  const plasterColorCanvas = document.createElement('canvas');
  plasterColorCanvas.width = plasterSize;
  plasterColorCanvas.height = plasterSize;
  const pCtx = plasterColorCanvas.getContext('2d')!;
  pCtx.fillStyle = '#E4DBCC';
  pCtx.fillRect(0, 0, plasterSize, plasterSize);

  const randP = createSeededRandom(1091);
  // Subtle warm mineral clouding
  for (let i = 0; i < 240; i++) {
    const x = randP() * plasterSize;
    const y = randP() * plasterSize;
    const r = 8 + randP() * 28;
    const tone = randP() > 0.5 ? 'rgba(200, 185, 165, 0.08)' : 'rgba(244, 238, 228, 0.08)';
    pCtx.fillStyle = tone;
    pCtx.beginPath();
    pCtx.arc(x, y, r, 0, Math.PI * 2);
    pCtx.fill();
  }
  // Fine sintered mineral pores
  for (let i = 0; i < 1800; i++) {
    const x = randP() * plasterSize;
    const y = randP() * plasterSize;
    const r = 0.5 + randP() * 1.3;
    pCtx.fillStyle = randP() > 0.45 ? 'rgba(178, 164, 145, 0.22)' : 'rgba(248, 243, 235, 0.2)';
    pCtx.fillRect(x, y, r, r);
  }

  const plasterColorTex = new THREE.CanvasTexture(plasterColorCanvas);
  plasterColorTex.colorSpace = THREE.SRGBColorSpace;
  plasterColorTex.wrapS = THREE.RepeatWrapping;
  plasterColorTex.wrapT = THREE.RepeatWrapping;
  plasterColorTex.repeat.set(1.5, 1.5);
  plasterColorTex.anisotropy = maxAnisotropy;

  const plasterBumpCanvas = document.createElement('canvas');
  plasterBumpCanvas.width = 128;
  plasterBumpCanvas.height = 128;
  const pbCtx = plasterBumpCanvas.getContext('2d')!;
  pbCtx.fillStyle = '#808080';
  pbCtx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 1400; i++) {
    const x = randP() * 128;
    const y = randP() * 128;
    const v = Math.floor(105 + randP() * 50);
    pbCtx.fillStyle = `rgb(${v},${v},${v})`;
    pbCtx.fillRect(x, y, 1.5, 1.5);
  }
  const plasterBumpTex = new THREE.CanvasTexture(plasterBumpCanvas);
  plasterBumpTex.wrapS = THREE.RepeatWrapping;
  plasterBumpTex.wrapT = THREE.RepeatWrapping;
  plasterBumpTex.repeat.set(2, 2);
  plasterBumpTex.anisotropy = maxAnisotropy;

  // 2. Charcoal Acoustic Felt Albedo & Fiber Bump
  const feltCanvas = document.createElement('canvas');
  feltCanvas.width = 256;
  feltCanvas.height = 256;
  const fCtx = feltCanvas.getContext('2d')!;
  fCtx.fillStyle = '#332F2C';
  fCtx.fillRect(0, 0, 256, 256);

  const randF = createSeededRandom(3371);
  for (let i = 0; i < 2600; i++) {
    const x = randF() * 256;
    const y = randF() * 256;
    const len = 3 + randF() * 7;
    const ang = randF() * Math.PI;
    fCtx.strokeStyle =
      randF() > 0.5 ? 'rgba(84, 78, 72, 0.34)' : 'rgba(28, 25, 22, 0.38)';
    fCtx.lineWidth = 0.9;
    fCtx.beginPath();
    fCtx.moveTo(x, y);
    fCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    fCtx.stroke();
  }
  const feltColorTex = new THREE.CanvasTexture(feltCanvas);
  feltColorTex.colorSpace = THREE.SRGBColorSpace;
  feltColorTex.wrapS = THREE.RepeatWrapping;
  feltColorTex.wrapT = THREE.RepeatWrapping;
  feltColorTex.repeat.set(2, 2);
  feltColorTex.anisotropy = maxAnisotropy;

  const feltBumpCanvas = document.createElement('canvas');
  feltBumpCanvas.width = 128;
  feltBumpCanvas.height = 128;
  const fbCtx = feltBumpCanvas.getContext('2d')!;
  fbCtx.fillStyle = '#787878';
  fbCtx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 1800; i++) {
    const x = randF() * 128;
    const y = randF() * 128;
    const v = Math.floor(80 + randF() * 90);
    fbCtx.fillStyle = `rgb(${v},${v},${v})`;
    fbCtx.fillRect(x, y, 1.5, 1.5);
  }
  const feltBumpTex = new THREE.CanvasTexture(feltBumpCanvas);
  feltBumpTex.wrapS = THREE.RepeatWrapping;
  feltBumpTex.wrapT = THREE.RepeatWrapping;
  feltBumpTex.repeat.set(3, 3);
  feltBumpTex.anisotropy = maxAnisotropy;

  // 3. Pale Nordic Oak Albedo & Longitudinal Grain Bump
  const oakCanvas = document.createElement('canvas');
  oakCanvas.width = 256;
  oakCanvas.height = 256;
  const oCtx = oakCanvas.getContext('2d')!;
  oCtx.fillStyle = '#B89E80';
  oCtx.fillRect(0, 0, 256, 256);

  const randO = createSeededRandom(7723);
  for (let x = 0; x < 256; x += 2) {
    const wave = Math.sin(x * 0.08) * 6;
    const shade = randO() > 0.45 ? 'rgba(154, 126, 95, 0.26)' : 'rgba(208, 185, 156, 0.22)';
    oCtx.strokeStyle = shade;
    oCtx.lineWidth = 1 + randO() * 1.4;
    oCtx.beginPath();
    oCtx.moveTo(x, 0);
    oCtx.bezierCurveTo(x + wave, 85, x - wave, 170, x, 256);
    oCtx.stroke();
  }
  const oakColorTex = new THREE.CanvasTexture(oakCanvas);
  oakColorTex.colorSpace = THREE.SRGBColorSpace;
  oakColorTex.wrapS = THREE.RepeatWrapping;
  oakColorTex.wrapT = THREE.RepeatWrapping;
  oakColorTex.repeat.set(1, 1);
  oakColorTex.anisotropy = maxAnisotropy;

  const oakBumpCanvas = document.createElement('canvas');
  oakBumpCanvas.width = 128;
  oakBumpCanvas.height = 128;
  const obCtx = oakBumpCanvas.getContext('2d')!;
  obCtx.fillStyle = '#808080';
  obCtx.fillRect(0, 0, 128, 128);
  for (let x = 0; x < 128; x += 2) {
    const v = Math.floor(110 + randO() * 40);
    obCtx.strokeStyle = `rgb(${v},${v},${v})`;
    obCtx.beginPath();
    obCtx.moveTo(x, 0);
    obCtx.lineTo(x, 128);
    obCtx.stroke();
  }
  const oakBumpTex = new THREE.CanvasTexture(oakBumpCanvas);
  oakBumpTex.wrapS = THREE.RepeatWrapping;
  oakBumpTex.wrapT = THREE.RepeatWrapping;
  oakBumpTex.anisotropy = maxAnisotropy;

  // 4. Soft Radial Contact Shadow Texture (Deep shadow pooling under the installation plinth)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(128, 64, 8, 128, 64, 120);
  grad.addColorStop(0, 'rgba(4, 4, 3, 0.92)');
  grad.addColorStop(0.45, 'rgba(8, 8, 6, 0.64)');
  grad.addColorStop(0.78, 'rgba(12, 12, 10, 0.24)');
  grad.addColorStop(1, 'rgba(12, 12, 10, 0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 256, 128);
  const contactShadowTex = new THREE.CanvasTexture(shadowCanvas);
  contactShadowTex.colorSpace = THREE.SRGBColorSpace;
  contactShadowTex.anisotropy = maxAnisotropy;

  // 5. Dark Architectural Micro-Concrete / Venetian Plaster Texture (256x256 for fast init)
  const gwCanvas = document.createElement('canvas');
  gwCanvas.width = 256;
  gwCanvas.height = 256;
  const gwCtx = gwCanvas.getContext('2d')!;
  gwCtx.fillStyle = '#1E1D1A';
  gwCtx.fillRect(0, 0, 256, 256);

  const randGW = createSeededRandom(5501);
  for (let i = 0; i < 160; i++) {
    const x = randGW() * 256;
    const y = randGW() * 256;
    const r = 10 + randGW() * 32;
    gwCtx.fillStyle =
      randGW() > 0.46 ? 'rgba(54, 50, 44, 0.14)' : 'rgba(12, 12, 10, 0.16)';
    gwCtx.beginPath();
    gwCtx.arc(x, y, r, 0, Math.PI * 2);
    gwCtx.fill();
  }
  for (let i = 0; i < 900; i++) {
    const x = randGW() * 256;
    const y = randGW() * 256;
    gwCtx.fillStyle =
      randGW() > 0.5 ? 'rgba(68, 63, 56, 0.18)' : 'rgba(10, 10, 9, 0.22)';
    gwCtx.fillRect(x, y, 1.2, 1.2);
  }

  const galleryWallColorTex = new THREE.CanvasTexture(gwCanvas);
  galleryWallColorTex.colorSpace = THREE.SRGBColorSpace;
  galleryWallColorTex.wrapS = THREE.RepeatWrapping;
  galleryWallColorTex.wrapT = THREE.RepeatWrapping;
  galleryWallColorTex.repeat.set(3, 1.5);
  galleryWallColorTex.anisotropy = maxAnisotropy;

  // 6. Dark Polished Concrete / Honed Basalt Floor Texture & Roughness Map
  const flCanvas = document.createElement('canvas');
  flCanvas.width = 256;
  flCanvas.height = 256;
  const flCtx = flCanvas.getContext('2d')!;
  flCtx.fillStyle = '#1B1A18';
  flCtx.fillRect(0, 0, 256, 256);

  const flRoughCanvas = document.createElement('canvas');
  flRoughCanvas.width = 128;
  flRoughCanvas.height = 128;
  const flRCtx = flRoughCanvas.getContext('2d')!;
  flRCtx.fillStyle = '#525252';
  flRCtx.fillRect(0, 0, 128, 128);

  const randFL = createSeededRandom(8843);
  for (let i = 0; i < 180; i++) {
    const x = randFL() * 256;
    const y = randFL() * 256;
    const rx = 14 + randFL() * 38;
    const ry = 6 + randFL() * 16;
    flCtx.fillStyle =
      randFL() > 0.46 ? 'rgba(54, 50, 44, 0.15)' : 'rgba(10, 10, 9, 0.18)';
    flCtx.beginPath();
    flCtx.ellipse(x, y, rx, ry, randFL() * 0.4, 0, Math.PI * 2);
    flCtx.fill();

    const rVal = Math.floor(55 + randFL() * 70);
    flRCtx.fillStyle = `rgba(${rVal},${rVal},${rVal},0.3)`;
    flRCtx.beginPath();
    flRCtx.ellipse(x * 0.5, y * 0.5, rx * 0.5, ry * 0.5, 0, 0, Math.PI * 2);
    flRCtx.fill();
  }
  // Honed stone slab expansion joints
  flCtx.strokeStyle = 'rgba(8, 8, 7, 0.52)';
  flCtx.lineWidth = 1.1;
  for (const p of [85, 170]) {
    flCtx.beginPath();
    flCtx.moveTo(p, 0);
    flCtx.lineTo(p, 256);
    flCtx.stroke();
    flCtx.beginPath();
    flCtx.moveTo(0, p);
    flCtx.lineTo(256, p);
    flCtx.stroke();
  }

  const stoneFloorColorTex = new THREE.CanvasTexture(flCanvas);
  stoneFloorColorTex.colorSpace = THREE.SRGBColorSpace;
  stoneFloorColorTex.wrapS = THREE.RepeatWrapping;
  stoneFloorColorTex.wrapT = THREE.RepeatWrapping;
  stoneFloorColorTex.repeat.set(4, 3);
  stoneFloorColorTex.anisotropy = maxAnisotropy;

  const stoneFloorRoughnessTex = new THREE.CanvasTexture(flRoughCanvas);
  stoneFloorRoughnessTex.wrapS = THREE.RepeatWrapping;
  stoneFloorRoughnessTex.wrapT = THREE.RepeatWrapping;
  stoneFloorRoughnessTex.repeat.set(4, 3);
  stoneFloorRoughnessTex.anisotropy = maxAnisotropy;

  // 7. Gentle Blurred Floor Reflection Texture (Seamless elliptical falloff with zero hard border)
  const reflCanvas = document.createElement('canvas');
  reflCanvas.width = 256;
  reflCanvas.height = 256;
  const rCtx = reflCanvas.getContext('2d')!;
  rCtx.clearRect(0, 0, 256, 256);

  // Soft blurred column reflections of the illuminated ivory & pale oak bays
  for (let col = 0; col < 11; col++) {
    const cx = 24 + col * 19;
    const isDarkFeltBay = col === 2 || col === 6 || col === 9;
    const colGrad = rCtx.createLinearGradient(cx, 16, cx, 220);
    if (isDarkFeltBay) {
      colGrad.addColorStop(0, 'rgba(16, 15, 13, 0.25)');
      colGrad.addColorStop(1, 'rgba(16, 15, 13, 0)');
    } else {
      colGrad.addColorStop(0, 'rgba(242, 226, 200, 0.34)');
      colGrad.addColorStop(0.45, 'rgba(204, 180, 146, 0.14)');
      colGrad.addColorStop(1, 'rgba(204, 180, 146, 0)');
    }
    rCtx.fillStyle = colGrad;
    rCtx.fillRect(cx, 16, 16, 204);
  }

  // Smooth elliptical radial mask that reaches 0 well inside all 4 canvas edges
  rCtx.globalCompositeOperation = 'destination-in';
  rCtx.save();
  rCtx.translate(128, 72);
  rCtx.scale(1.0, 0.72);
  const maskGrad = rCtx.createRadialGradient(0, 0, 10, 0, 0, 108);
  maskGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  maskGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.55)');
  maskGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.12)');
  maskGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  rCtx.fillStyle = maskGrad;
  rCtx.beginPath();
  rCtx.arc(0, 0, 112, 0, Math.PI * 2);
  rCtx.fill();
  rCtx.restore();
  rCtx.globalCompositeOperation = 'source-over';

  const floorReflectionTex = new THREE.CanvasTexture(reflCanvas);
  floorReflectionTex.colorSpace = THREE.SRGBColorSpace;
  floorReflectionTex.anisotropy = maxAnisotropy;

  // 8. Restrained Warm Spotlight Bloom Texture behind the Acoustic Wall
  const bloomCanvas = document.createElement('canvas');
  bloomCanvas.width = 256;
  bloomCanvas.height = 256;
  const bCtx = bloomCanvas.getContext('2d')!;
  const bloomGrad = bCtx.createRadialGradient(128, 128, 12, 128, 128, 122);
  bloomGrad.addColorStop(0.0, 'rgba(246, 216, 172, 0.42)');
  bloomGrad.addColorStop(0.42, 'rgba(204, 168, 120, 0.18)');
  bloomGrad.addColorStop(0.76, 'rgba(132, 106, 76, 0.05)');
  bloomGrad.addColorStop(1.0, 'rgba(20, 19, 17, 0)');
  bCtx.fillStyle = bloomGrad;
  bCtx.fillRect(0, 0, 256, 256);

  const spotlightBloomTex = new THREE.CanvasTexture(bloomCanvas);
  spotlightBloomTex.colorSpace = THREE.SRGBColorSpace;
  spotlightBloomTex.anisotropy = maxAnisotropy;

  return {
    plasterColorTex,
    plasterBumpTex,
    feltColorTex,
    feltBumpTex,
    oakColorTex,
    oakBumpTex,
    contactShadowTex,
    galleryWallColorTex,
    stoneFloorColorTex,
    stoneFloorRoughnessTex,
    floorReflectionTex,
    spotlightBloomTex,
    disposeAll: () => {
      plasterColorTex.dispose();
      plasterBumpTex.dispose();
      feltColorTex.dispose();
      feltBumpTex.dispose();
      oakColorTex.dispose();
      oakBumpTex.dispose();
      contactShadowTex.dispose();
      galleryWallColorTex.dispose();
      stoneFloorColorTex.dispose();
      stoneFloorRoughnessTex.dispose();
      floorReflectionTex.dispose();
      spotlightBloomTex.dispose();
    },
  };
}

/**
 * Builds an individual tile's custom 3D sculpted relief geometry.
 * Samples the global S-curve in shared wall coordinates (u, v) so adjacent tiles at 0°
 * form a continuous flowing S-shaped architectural ribbon across module seams,
 * combined with 8+ differentiated module family profiles.
 */
function buildTileReliefGeometry(
  spec: ResonanceTileSpec,
  cols: number,
  rows: number,
  isSoftwareGl: boolean,
): THREE.BufferGeometry {
  const segs = isSoftwareGl ? 20 : 26;
  const size = RESONANCE_TILE_SIZE;
  const depth = 0.24;
  // Subdivided BoxGeometry so front face, beveled edges, sides, and back are watertight
  const geo = new THREE.BoxGeometry(size, size, depth, segs, segs, 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);

  const halfSize = size * 0.5;
  const halfDepth = depth * 0.5;

  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const halfWallSpanX = (centerX + 0.5) * 0.92;
  const halfWallSpanY = (centerY + 0.5) * 0.92;
  const tileCenterX = (spec.col - centerX) * 0.92;
  const tileCenterY = (spec.row - centerY) * 0.92;

  for (let i = 0; i < pos.count; i++) {
    const lx = pos.getX(i); // -halfSize .. +halfSize
    const ly = pos.getY(i); // -halfSize .. +halfSize
    const lz = pos.getZ(i); // -halfDepth .. +halfDepth

    const nx = lx / halfSize;
    const ny = ly / halfSize;

    // Smooth perimeter bevel factor so panel seams catch grazing light cleanly
    const edgeDistX = Math.max(0, 1 - Math.abs(nx));
    const edgeDistY = Math.max(0, 1 - Math.abs(ny));
    const edgeBevel = Math.min(1, Math.min(edgeDistX, edgeDistY) / 0.065);
    const interiorMask = Math.min(1, Math.min(edgeDistX, edgeDistY) / 0.13);

    if (lz > 0) {
      const worldX = tileCenterX + lx;
      const worldY = tileCenterY + ly;
      const u = worldX / halfWallSpanX;
      const v = worldY / halfWallSpanY;

      const sCurve = sampleGlobalSCurveRelief(u, v);

      let familyRelief = 0;
      let cavityShade = 0.94;

      switch (spec.family) {
        case 's-ribbon': {
          const secondaryFlutes =
            (1 - sCurve.proximity) * (Math.cos(ny * Math.PI * 7) * 0.028) * interiorMask;
          familyRelief = sCurve.displacement * (0.45 + 0.55 * edgeBevel) + secondaryFlutes;
          // Crisp architectural rib & channel shading along the continuous S-curve
          const ribContrast = 0.36 + 0.72 * Math.pow(sCurve.grooves, 0.85);
          const bgFluteContrast = 0.86 + 0.14 * Math.cos(ny * Math.PI * 7);
          cavityShade =
            sCurve.proximity * ribContrast + (1 - sCurve.proximity) * bgFluteContrast;
          break;
        }
        case 'convex': {
          // Pillowed cylindrical outward swell
          const swell =
            Math.cos(nx * Math.PI * 0.5) * (0.78 + 0.22 * Math.cos(ny * Math.PI * 0.5));
          familyRelief = swell * 0.14 * edgeBevel + sCurve.displacement * 0.65;
          cavityShade = 0.76 + 0.28 * swell - lx * 0.08 + ly * 0.08;
          break;
        }
        case 'concave': {
          // Half-pipe concave architectural scoop
          const scoop = Math.cos(nx * Math.PI * 0.5);
          familyRelief = (0.095 - scoop * 0.115) * interiorMask + sCurve.displacement * 0.5;
          cavityShade = 0.98 - scoop * 0.42 + lx * 0.12;
          break;
        }
        case 'fluted-v': {
          // 7 bold vertical architectural flutes
          const groove = Math.cos(nx * Math.PI * 7);
          familyRelief = (0.055 + groove * 0.052) * interiorMask + sCurve.displacement * 0.7;
          cavityShade = 0.68 + 0.36 * (groove * 0.5 + 0.5);
          break;
        }
        case 'fluted-h': {
          // 7 bold horizontal architectural flutes
          const groove = Math.cos(ny * Math.PI * 7);
          familyRelief = (0.055 + groove * 0.052) * interiorMask + sCurve.displacement * 0.7;
          cavityShade = 0.68 + 0.36 * (groove * 0.5 + 0.5);
          break;
        }
        case 'folded': {
          // Diagonal architectural crease
          const crease = 1 - Math.abs(nx * 0.7 + ny * 0.3);
          familyRelief = (crease * 0.13 - 0.01) * interiorMask + sCurve.displacement * 0.6;
          cavityShade = 0.72 + 0.32 * crease + (nx - ny) * 0.08;
          break;
        }
        case 'crescent': {
          // Sweeping arched crescent ridge
          const arcDist = Math.hypot(nx - 0.45, ny + 0.35);
          const ridge = Math.exp(-Math.pow((arcDist - 0.85) / 0.28, 2));
          familyRelief = (ridge * 0.14 - 0.01) * interiorMask + sCurve.displacement * 0.65;
          cavityShade = 0.7 + 0.35 * ridge;
          break;
        }
        case 'recess': {
          // Stepped architectural recess
          const inCavity = Math.abs(nx) < 0.66 && Math.abs(ny) < 0.66;
          familyRelief = inCavity ? -0.028 : 0.065 * edgeBevel;
          familyRelief += sCurve.displacement * 0.4;
          cavityShade = inCavity ? 0.56 : 0.96;
          break;
        }
        case 'slit': {
          // Twin beveled slabs flanking a recessed vertical acoustic reveal
          const inSlit = Math.abs(nx - 0.06) < 0.22 && Math.abs(ny) < 0.76;
          const slabSlope = (0.55 - nx * 0.28) * 0.085;
          familyRelief = inSlit ? -0.025 : slabSlope * interiorMask;
          familyRelief += sCurve.displacement * 0.5;
          cavityShade = inSlit ? 0.46 : 0.88 + slabSlope * 1.2;
          break;
        }
      }

      // Blend global S-curve rib contrast on non-ribbon tiles that border the S-curve
      if (spec.family !== 's-ribbon' && sCurve.proximity > 0.04) {
        const ribContrast = 0.38 + 0.68 * Math.pow(sCurve.grooves, 0.85);
        cavityShade =
          cavityShade * (1 - sCurve.proximity * 0.75) + ribContrast * (sCurve.proximity * 0.75);
      }

      const bevelDrop = (1 - edgeBevel) * -0.024;
      const totalDelta = Math.max(-0.045, familyRelief + bevelDrop);
      const zScale = lz / halfDepth;
      pos.setZ(i, lz + totalDelta * zScale);

      const finalShade = Math.max(
        0.28,
        Math.min(1.06, cavityShade * (0.58 + 0.42 * edgeBevel)),
      );
      colors[i * 3] = finalShade;
      colors[i * 3 + 1] = finalShade * 0.99;
      colors[i * 3 + 2] = finalShade * 0.96;
    } else {
      // Deep architectural shadow joint on tile side walls & rear
      colors[i * 3] = 0.34;
      colors[i * 3 + 1] = 0.32;
      colors[i * 3 + 2] = 0.29;
    }
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

function createTurnedBrassPinGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.026, 0.0),
    new THREE.Vector2(0.026, 0.045),
    new THREE.Vector2(0.018, 0.055),
    new THREE.Vector2(0.032, 0.075),
    new THREE.Vector2(0.028, 0.095),
    new THREE.Vector2(0.0, 0.095),
  ];
  const lathe = new THREE.LatheGeometry(points, 12);
  lathe.rotateX(Math.PI / 2);
  lathe.computeVertexNormals();
  return lathe;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({
  composition,
  materialMode,
  exploded,
  reducedMotion,
  tileRotations,
  selectedTileId = null,
  scrollProgressRef,
  onSelectTile,
  onCommitTileRotation,
  onWebGLUnavailable,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Store latest props/callbacks in refs so React UI updates never rebuild the WebGLRenderer
  const compositionRef = useRef<HeroCompositionId>(composition);
  const materialModeRef = useRef<HeroMaterialModeId>(materialMode);
  const explodedRef = useRef<boolean>(exploded);
  const reducedMotionRef = useRef<boolean>(reducedMotion);
  const tileRotationsRef = useRef<Record<string, TileQuarterTurns>>(tileRotations);
  const selectedTileIdRef = useRef<string | null>(selectedTileId);
  const onSelectTileRef = useRef(onSelectTile);
  const onCommitTileRotationRef = useRef(onCommitTileRotation);
  const onWebGLUnavailableRef = useRef(onWebGLUnavailable);

  compositionRef.current = composition;
  materialModeRef.current = materialMode;
  explodedRef.current = exploded;
  reducedMotionRef.current = reducedMotion;
  tileRotationsRef.current = tileRotations;
  selectedTileIdRef.current = selectedTileId;
  onSelectTileRef.current = onSelectTile;
  onCommitTileRotationRef.current = onCommitTileRotation;
  onWebGLUnavailableRef.current = onWebGLUnavailable;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { supported, isSoftwareGl } = detectSoftwareWebGL();
    if (!supported) {
      onWebGLUnavailableRef.current?.();
      return;
    }

    const initW = Math.max(320, container.clientWidth || window.innerWidth);
    const initH = Math.max(320, container.clientHeight || window.innerHeight);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: isSoftwareGl,
        alpha: true,
      });
    } catch {
      onWebGLUnavailableRef.current?.();
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initW, initH);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'pan-y';

    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      onWebGLUnavailableRef.current?.();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const scene = new THREE.Scene();
    scene.background = null;
    // Subtle atmospheric gallery haze for depth perception across the chamber
    scene.fog = new THREE.FogExp2(0x141311, 0.018);

    // Studio PBR environment reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.42;
    pmremGenerator.dispose();

    // Long-focal-length architectural gallery camera (30 deg FOV)
    const camera = new THREE.PerspectiveCamera(30, initW / initH, 0.1, 70);

    // Gallery Lighting Rig: Dramatic grazing warm key light from upper-left/top to sculpt deep shadows
    const hemiLight = new THREE.HemisphereLight(0xdccfbe, 0x161513, 0.52);
    hemiLight.position.set(0, 12, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe6c2, 3.85);
    keyLight.position.set(-5.8, 7.6, 4.2);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.set(1024, 1024);
      const d = 7.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Secondary warm upper-right gallery spot to kiss the upper S-curve crest
    const crestSpot = new THREE.DirectionalLight(0xffdfb3, 1.3);
    crestSpot.position.set(6.5, 5.5, 3.5);
    scene.add(crestSpot);

    // Subtle counter fill from lower left so dark felt cavities and micro-concrete planes retain tactile grain
    const fillLight = new THREE.DirectionalLight(0x9aa8ba, 0.45);
    fillLight.position.set(-7.0, -2.5, 5.5);
    scene.add(fillLight);

    let softboxLight: THREE.RectAreaLight | null = null;
    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      softboxLight = new THREE.RectAreaLight(0xfff0d6, 2.4, 9, 4);
      softboxLight.position.set(1.2, 6.2, 5.0);
      softboxLight.lookAt(2.5, 0.2, 0);
      scene.add(softboxLight);
    }

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const textures = createProceduralMaterialTextures(maxAniso);

    // Reusable PBR Materials with vertexColors enabled for crisp architectural cavity shading
    const plasterMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      map: textures.plasterColorTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.015,
      roughnessMap: textures.plasterBumpTex,
      roughness: 0.88,
      metalness: 0.02,
    });

    const warmStoneMat = new THREE.MeshStandardMaterial({
      color: 0xe2d0b9,
      vertexColors: true,
      map: textures.plasterColorTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.016,
      roughness: 0.84,
      metalness: 0.03,
    });

    const feltMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      map: textures.feltColorTex,
      bumpMap: textures.feltBumpTex,
      bumpScale: 0.02,
      roughness: 0.96,
      metalness: 0.0,
    });

    const oakMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      map: textures.oakColorTex,
      bumpMap: textures.oakBumpTex,
      bumpScale: 0.016,
      roughness: 0.64,
      metalness: 0.02,
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x181715,
      roughness: 0.62,
      metalness: 0.36,
    });

    const brassPinMat = new THREE.MeshPhysicalMaterial({
      color: 0xc49f6c,
      roughness: 0.24,
      metalness: 0.88,
      anisotropy: 0.6,
    });

    const hoverRimMat = new THREE.LineBasicMaterial({
      color: 0xd5b07c,
      transparent: true,
      opacity: 0.55,
    });

    const selectedRimMat = new THREE.LineBasicMaterial({
      color: 0xf3d29e,
      transparent: true,
      opacity: 0.95,
    });

    // Transparent (opacity: 0) rather than visible: false so THREE.Raycaster intersects it reliably
    const pickInvisibleMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    const disposables: { dispose: () => void }[] = [
      envTarget,
      plasterMat,
      warmStoneMat,
      feltMat,
      oakMat,
      frameMat,
      brassPinMat,
      hoverRimMat,
      selectedRimMat,
      pickInvisibleMat,
    ];

    // Root Architectural Installation Group (positioned on the right in 3/4 perspective)
    const installationGroup = new THREE.Group();
    scene.add(installationGroup);

    const wallSpanW = RESONANCE_COLS * 0.92;
    const wallSpanH = RESONANCE_ROWS * 0.92;
    const floorY = -wallSpanH * 0.5 - 0.14;

    // 1. Stepped Architectural Gallery Alcove Surround & Plinth Pedestal
    const galleryWallMat = new THREE.MeshStandardMaterial({
      color: 0xd8cfc2,
      map: textures.galleryWallColorTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.012,
      roughness: 0.84,
      metalness: 0.08,
    });
    const galleryRecessMat = new THREE.MeshStandardMaterial({
      color: 0x141311,
      roughness: 0.88,
      metalness: 0.1,
    });
    disposables.push(galleryWallMat, galleryRecessMat);

    // Outer Architectural Micro-Concrete Alcove Casing framing the Acoustic Wall
    const alcoveSurroundGeo = new THREE.BoxGeometry(wallSpanW + 0.52, wallSpanH + 0.42, 0.26);
    const alcoveSurroundMesh = new THREE.Mesh(alcoveSurroundGeo, galleryWallMat);
    alcoveSurroundMesh.position.set(0, 0.04, -0.5);
    alcoveSurroundMesh.receiveShadow = !isSoftwareGl;
    installationGroup.add(alcoveSurroundMesh);
    disposables.push(alcoveSurroundGeo);

    // 2. Restrained Warm Spotlight Bloom Behind the Acoustic Wall
    const bloomMat = new THREE.MeshBasicMaterial({
      map: textures.spotlightBloomTex,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const primaryBloomGeo = new THREE.PlaneGeometry(wallSpanW + 5.2, wallSpanH + 3.8);
    const primaryBloomMesh = new THREE.Mesh(primaryBloomGeo, bloomMat);
    primaryBloomMesh.position.set(-0.4, 0.45, -0.7);
    installationGroup.add(primaryBloomMesh);
    disposables.push(bloomMat, primaryBloomGeo);

    // 3. Dark Polished Concrete / Honed Stone Gallery Floor Plane (Level World-Space Horizon)
    const floorGeo = new THREE.PlaneGeometry(36, 18);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xc2b8aa,
      map: textures.stoneFloorColorTex,
      roughnessMap: textures.stoneFloorRoughnessTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.006,
      roughness: 0.3,
      metalness: 0.2,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0.5, floorY - 0.08, 2.6);
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // 4. Gentle Blurred Floor Reflection Plane directly in front of the Acoustic Wall (+0.008 Y offset)
    const floorReflGeo = new THREE.PlaneGeometry(wallSpanW + 3.6, 5.8);
    floorReflGeo.rotateX(-Math.PI / 2);
    const floorReflMat = new THREE.MeshBasicMaterial({
      map: textures.floorReflectionTex,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const floorReflMesh = new THREE.Mesh(floorReflGeo, floorReflMat);
    floorReflMesh.position.set(0.0, floorY + 0.01, 1.95);
    installationGroup.add(floorReflMesh);
    disposables.push(floorReflGeo, floorReflMat);

    // 5. Realistic Multi-Stage Shadow Pooling under the Monumental Wall & Alcove Corner (+0.018 Y offset)
    const contactShadowGeo = new THREE.PlaneGeometry(wallSpanW + 3.4, 3.6);
    contactShadowGeo.rotateX(-Math.PI / 2);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: textures.contactShadowTex,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const contactShadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadowMesh.position.set(-0.2, floorY + 0.02, 0.18);
    installationGroup.add(contactShadowMesh);
    disposables.push(contactShadowGeo, contactShadowMat);

    // 6. Solid Architectural Shadow Frame & Backing behind the tiles (-0.36) so seams read as deep shadow joints
    const backingGeo = new THREE.BoxGeometry(wallSpanW + 0.16, wallSpanH + 0.16, 0.24);
    const backingMesh = new THREE.Mesh(backingGeo, frameMat);
    backingMesh.position.set(0, 0, -0.36);
    backingMesh.receiveShadow = !isSoftwareGl;
    installationGroup.add(backingMesh);
    disposables.push(backingGeo);

    // Architectural Recessed Plinth Pedestal under the Wall Frame
    const wallPedestalGeo = new THREE.BoxGeometry(wallSpanW + 0.24, 0.16, 0.36);
    const wallPedestalMesh = new THREE.Mesh(wallPedestalGeo, galleryRecessMat);
    wallPedestalMesh.position.set(0, floorY + 0.07, -0.2);
    installationGroup.add(wallPedestalMesh);
    disposables.push(wallPedestalGeo);

    // Horizontal Calibration Rails (revealed when Explode Assembly is active)
    const railGeo = new THREE.CylinderGeometry(0.015, 0.015, wallSpanW - 0.1, 10);
    railGeo.rotateZ(Math.PI / 2);
    const railMeshes: THREE.Mesh[] = [];
    for (let r = 0; r < RESONANCE_ROWS; r++) {
      const ry = (r - (RESONANCE_ROWS - 1) / 2) * 0.92;
      const rail = new THREE.Mesh(railGeo, brassPinMat);
      rail.position.set(0, ry, -0.18);
      rail.visible = false;
      installationGroup.add(rail);
      railMeshes.push(rail);
    }
    disposables.push(railGeo);

    // Build all 66 Individually Addressable Tile Entities
    const catalog = buildResonanceWallCatalog(RESONANCE_COLS, RESONANCE_ROWS);
    const pinGeo = createTurnedBrassPinGeometry();
    const subLiningGeo = new THREE.BoxGeometry(
      RESONANCE_TILE_SIZE * 0.88,
      RESONANCE_TILE_SIZE * 0.88,
      0.06,
    );
    const pickBoxGeo = new THREE.BoxGeometry(
      RESONANCE_TILE_SIZE * 0.99,
      RESONANCE_TILE_SIZE * 0.99,
      0.38,
    );
    const rimEdgesGeo = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(RESONANCE_TILE_SIZE * 1.006, RESONANCE_TILE_SIZE * 1.006, 0.28),
    );
    disposables.push(pinGeo, subLiningGeo, pickBoxGeo, rimEdgesGeo);

    interface TileEntityRuntime {
      spec: ResonanceTileSpec;
      anchorGroup: THREE.Group;
      userPivotGroup: THREE.Group;
      reliefMesh: THREE.Mesh;
      subLiningMesh: THREE.Mesh;
      pinMesh: THREE.Mesh | null;
      rimLines: THREE.LineSegments;
      pickMesh: THREE.Mesh;
      currX: number;
      currY: number;
      currZ: number;
      currRotX: number;
      currRotY: number;
      currPresetRotZ: number;
      currScaleZ: number;
      currUserRotZ: number;
      currLiftZ: number;
      clickPulseZ: number;
      initialized: boolean;
    }

    const tileEntities: TileEntityRuntime[] = [];
    const tileMap = new Map<string, TileEntityRuntime>();
    const pickTargets: THREE.Object3D[] = [];

    const resolveTileMaterials = (
      spec: ResonanceTileSpec,
      mode: HeroMaterialModeId,
    ): { main: THREE.Material; lining: THREE.Material } => {
      if (mode === 'ivory-plaster') {
        if (spec.surfaceRole === 'felt-accent') {
          return { main: feltMat, lining: oakMat };
        }
        if (spec.surfaceRole === 'oak-accent') {
          return { main: oakMat, lining: feltMat };
        }
        if (spec.surfaceRole === 'warm-stone') {
          return { main: warmStoneMat, lining: feltMat };
        }
        return { main: plasterMat, lining: spec.sCurveProximity > 0.25 ? oakMat : feltMat };
      }

      if (mode === 'charcoal-felt') {
        if (spec.surfaceRole === 'felt-accent') {
          return { main: plasterMat, lining: feltMat };
        }
        if (spec.surfaceRole === 'oak-accent') {
          return { main: oakMat, lining: feltMat };
        }
        return { main: feltMat, lining: oakMat };
      }

      // 'pale-oak'
      if (spec.surfaceRole === 'felt-accent') {
        return { main: feltMat, lining: oakMat };
      }
      if (spec.surfaceRole === 'warm-stone') {
        return { main: plasterMat, lining: feltMat };
      }
      return { main: oakMat, lining: feltMat };
    };

    for (const spec of catalog) {
      const anchorGroup = new THREE.Group();
      const userPivotGroup = new THREE.Group();
      anchorGroup.add(userPivotGroup);

      const reliefGeo = buildTileReliefGeometry(
        spec,
        RESONANCE_COLS,
        RESONANCE_ROWS,
        isSoftwareGl,
      );
      disposables.push(reliefGeo);

      const mats = resolveTileMaterials(spec, materialModeRef.current);

      const reliefMesh = new THREE.Mesh(reliefGeo, mats.main);
      reliefMesh.castShadow = !isSoftwareGl;
      reliefMesh.receiveShadow = !isSoftwareGl;
      reliefMesh.userData.tileId = spec.id;
      userPivotGroup.add(reliefMesh);
      pickTargets.push(reliefMesh);

      const subLiningMesh = new THREE.Mesh(subLiningGeo, mats.lining);
      subLiningMesh.position.z = -0.09;
      userPivotGroup.add(subLiningMesh);

      let pinMesh: THREE.Mesh | null = null;
      if (spec.hasBrassPin) {
        pinMesh = new THREE.Mesh(pinGeo, brassPinMat);
        const pinOffsetX = spec.family === 's-ribbon' ? 0.0 : -0.24;
        const pinOffsetY = spec.family === 's-ribbon' ? 0.0 : 0.22;
        pinMesh.position.set(pinOffsetX, pinOffsetY, 0.125);
        userPivotGroup.add(pinMesh);
      }

      const rimLines = new THREE.LineSegments(rimEdgesGeo, hoverRimMat);
      rimLines.visible = false;
      rimLines.position.z = 0.04;
      userPivotGroup.add(rimLines);

      const pickMesh = new THREE.Mesh(pickBoxGeo, pickInvisibleMat);
      pickMesh.position.z = 0.06;
      pickMesh.userData.tileId = spec.id;
      userPivotGroup.add(pickMesh);
      pickTargets.push(pickMesh);

      installationGroup.add(anchorGroup);

      const initialTurns = tileRotationsRef.current[spec.id] ?? 0;
      const entity: TileEntityRuntime = {
        spec,
        anchorGroup,
        userPivotGroup,
        reliefMesh,
        subLiningMesh,
        pinMesh,
        rimLines,
        pickMesh,
        currX: 0,
        currY: 0,
        currZ: 0,
        currRotX: 0,
        currRotY: 0,
        currPresetRotZ: 0,
        currScaleZ: 1,
        currUserRotZ: -initialTurns * (Math.PI * 0.5),
        currLiftZ: 0,
        clickPulseZ: 0,
        initialized: false,
      };
      tileEntities.push(entity);
      tileMap.set(spec.id, entity);
    }

    let appliedMaterialMode: HeroMaterialModeId = materialModeRef.current;

    // Responsive Framing: Monumental 3/4 view on right at desktop so left copy is 100% clear of 3D geometry
    const updateCameraAndWallFraming = () => {
      const w = Math.max(1, container.clientWidth || window.innerWidth);
      const h = Math.max(1, container.clientHeight || window.innerHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w >= 1200) {
        installationGroup.position.set(3.25, -0.04, -0.35);
        installationGroup.rotation.set(0.015, -0.47, 0);
        camera.position.set(-0.35, -0.18, 12.6);
      } else if (w >= 960) {
        installationGroup.position.set(2.85, -0.04, -0.5);
        installationGroup.rotation.set(0.02, -0.42, 0);
        camera.position.set(-0.25, -0.18, 12.8);
      } else if (w >= 768) {
        installationGroup.position.set(2.15, -0.08, -0.9);
        installationGroup.rotation.set(0.02, -0.36, 0);
        camera.position.set(0, -0.12, 13.0);
      } else {
        installationGroup.position.set(0.65, -0.65, -0.8);
        installationGroup.rotation.set(0.03, -0.28, 0);
        camera.position.set(0, -0.2, 12.2);
      }
    };
    updateCameraAndWallFraming();

    // Raycasting & Direct Tile Manipulation Controller (Click +90° CW & Drag-to-Twist with Snap)
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    let hoveredTileId: string | null = null;
    let pointerWallX = 0;
    let pointerWallY = 0;
    let pointerActive = false;

    let activeGesture: {
      tileId: string;
      pointerId: number;
      startX: number;
      startY: number;
      baseClockwiseRad: number;
      liveClockwiseRad: number;
      isDragging: boolean;
    } | null = null;

    let lastHoverRaycastMs = 0;

    const getCanvasNdc = (clientX: number, clientY: number): boolean => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return false;
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      return true;
    };

    const pickTileAtClientPoint = (clientX: number, clientY: number): string | null => {
      if (!getCanvasNdc(clientX, clientY)) return null;
      camera.updateMatrixWorld();
      installationGroup.updateMatrixWorld(true);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(pickTargets, false);
      for (let i = 0; i < hits.length; i++) {
        const hitId = hits[i].object?.userData?.tileId;
        if (typeof hitId === 'string') return hitId;
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const hitTileId = pickTileAtClientPoint(e.clientX, e.clientY);
      if (!hitTileId) {
        // Clicked gallery background -> clear selection without resetting any tile rotations
        if (selectedTileIdRef.current !== null) {
          onSelectTileRef.current?.(null);
        }
        return;
      }

      const currentTurns = tileRotationsRef.current[hitTileId] ?? 0;
      const baseClockwiseRad = currentTurns * (Math.PI * 0.5);
      activeGesture = {
        tileId: hitTileId,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        baseClockwiseRad,
        liveClockwiseRad: baseClockwiseRad,
        isDragging: false,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerWallX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerWallY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        pointerActive = true;
      }

      if (activeGesture && e.pointerId === activeGesture.pointerId) {
        const dx = e.clientX - activeGesture.startX;
        const dy = e.clientY - activeGesture.startY;
        const dist = Math.hypot(dx, dy);

        // Only enter drag-twist mode on mouse/pen or intentional horizontal gesture >= 8px
        if (!activeGesture.isDragging && dist >= 8) {
          if (e.pointerType !== 'touch' || Math.abs(dx) > Math.abs(dy) * 1.25) {
            activeGesture.isDragging = true;
            try {
              renderer.domElement.setPointerCapture(e.pointerId);
            } catch {
              // ignore synthetic pointer events without capture
            }
          }
        }

        if (activeGesture.isDragging) {
          // Convert horizontal/arc drag into clockwise rotation radians
          const deltaRad = dx * 0.022 - dy * 0.008;
          activeGesture.liveClockwiseRad = activeGesture.baseClockwiseRad + deltaRad;
          renderer.domElement.style.cursor = 'grabbing';
          return;
        }
      }

      // Throttled hover raycast (<= 25Hz)
      const now = performance.now();
      if (now - lastHoverRaycastMs < 40) return;
      lastHoverRaycastMs = now;

      const hitId = pickTileAtClientPoint(e.clientX, e.clientY);
      hoveredTileId = hitId;
      renderer.domElement.style.cursor = hitId ? 'pointer' : 'default';
    };

    const finishGesture = (e: PointerEvent, cancelled: boolean) => {
      if (!activeGesture || e.pointerId !== activeGesture.pointerId) return;
      const gesture = activeGesture;
      activeGesture = null;

      try {
        if (renderer.domElement.hasPointerCapture(e.pointerId)) {
          renderer.domElement.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      if (cancelled) return;

      const entity = tileMap.get(gesture.tileId);
      if (gesture.isDragging) {
        // Drag release: snap smoothly to nearest 90° quarter-turn without firing a second click rotation
        const snappedTurns = snapClockwiseAngleToQuarterTurns(gesture.liveClockwiseRad);
        playTactileClick(280);
        if (entity) entity.clickPulseZ = 0.032;
        onCommitTileRotationRef.current(gesture.tileId, snappedTurns);
        onSelectTileRef.current?.(gesture.tileId);
      } else {
        // Single click/tap: rotate THAT tile +90° clockwise around outward normal
        const currentTurns = tileRotationsRef.current[gesture.tileId] ?? 0;
        const nextTurns = rotateTileQuarterTurns(currentTurns, 1);
        playTactileClick(320);
        if (entity) entity.clickPulseZ = 0.055;
        onCommitTileRotationRef.current(gesture.tileId, nextTurns);
        onSelectTileRef.current?.(gesture.tileId);
      }

      renderer.domElement.style.cursor = hoveredTileId ? 'pointer' : 'default';
    };

    const onPointerUp = (e: PointerEvent) => finishGesture(e, false);
    const onPointerCancel = (e: PointerEvent) => finishGesture(e, true);
    const onPointerLeave = () => {
      pointerActive = false;
      hoveredTileId = null;
      if (!activeGesture) {
        renderer.domElement.style.cursor = 'default';
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    domEl.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', updateCameraAndWallFraming);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const startTimeMs = performance.now();
    let prevTimeMs = startTimeMs;
    let frameId = 0;
    let disposed = false;
    let explodedBlend = explodedRef.current ? 1 : 0;
    let camParallaxX = 0;
    let camParallaxY = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      if (disposed) return;

      const nowMs = performance.now();
      const dt = Math.min(isSoftwareGl ? 0.25 : 0.05, Math.max(0.016, (nowMs - prevTimeMs) / 1000));
      prevTimeMs = nowMs;
      const elapsedSec = (nowMs - startTimeMs) / 1000;

      // Update PBR materials immediately if global materialMode changed
      if (appliedMaterialMode !== materialModeRef.current) {
        appliedMaterialMode = materialModeRef.current;
        for (const entity of tileEntities) {
          const mats = resolveTileMaterials(entity.spec, appliedMaterialMode);
          entity.reliefMesh.material = mats.main;
          entity.subLiningMesh.material = mats.lining;
        }
      }

      // Entrance wave progress (0 -> 1 over ~2.1s on hardware GPU; immediate in reducedMotion or softwareGl)
      const entranceDuration = 2.1;
      const entranceProgress =
        reducedMotionRef.current || isSoftwareGl
          ? 1
          : Math.min(1, elapsedSec / entranceDuration);

      const dampFast = 1 - Math.exp(-10.0 * dt);
      const dampTile = 1 - Math.exp(-9.0 * dt);
      const dampUserRot = 1 - Math.exp(-12.0 * dt);

      const targetExplode = explodedRef.current ? 1 : 0;
      explodedBlend += (targetExplode - explodedBlend) * dampFast;
      for (const rail of railMeshes) {
        rail.visible = explodedBlend > 0.04;
      }

      // Suspend camera pointer parallax while user is actively dragging a tile
      const targetParallaxX = activeGesture?.isDragging
        ? camParallaxX
        : (pointerActive ? pointerWallX : 0) * 0.16;
      const targetParallaxY = activeGesture?.isDragging
        ? camParallaxY
        : (pointerActive ? pointerWallY : 0) * 0.1;
      camParallaxX += (targetParallaxX - camParallaxX) * dampFast;
      camParallaxY += (targetParallaxY - camParallaxY) * dampFast;

      // Scroll-driven camera & light angle shift
      const scrollProg = reducedMotionRef.current ? 0 : scrollProgressRef.current;
      const activeScroll = Math.max(0, Math.min(1, (scrollProg - 0.15) / 0.75));

      const w = container?.clientWidth || window.innerWidth;
      const baseCamX = w >= 1200 ? -0.35 : w >= 960 ? -0.25 : 0;
      const baseCamY = w >= 1200 ? -0.18 : w >= 768 ? -0.18 : -0.2;
      const baseCamZ = w >= 1200 ? 12.6 : w >= 960 ? 12.8 : 13.0;

      camera.position.x = baseCamX + camParallaxX - activeScroll * 0.55;
      camera.position.y = baseCamY + camParallaxY + activeScroll * 0.28;
      camera.position.z = baseCamZ - activeScroll * 0.45 + explodedBlend * 0.65;

      const lookX = w >= 1200 ? 0.25 : w >= 960 ? 0.25 : 0.15;
      camera.lookAt(lookX, 0.04 + activeScroll * 0.08, 0);

      // Shift grazing key light subtly on scroll to reveal material grain
      keyLight.position.x = -4.2 + activeScroll * 2.8;
      keyLight.position.y = 6.8 - activeScroll * 1.1;

      const currentRotMap = tileRotationsRef.current;
      const currentSelectedId = selectedTileIdRef.current;

      for (let i = 0; i < tileEntities.length; i++) {
        const entity = tileEntities[i];
        const { spec } = entity;

        const base = computeResonanceTileBaseTransform(
          spec,
          RESONANCE_COLS,
          RESONANCE_ROWS,
          compositionRef.current,
          pointerWallX,
          pointerWallY,
          pointerActive && !activeGesture?.isDragging && !reducedMotionRef.current,
          scrollProg,
          entranceProgress,
          reducedMotionRef.current ? 0 : elapsedSec,
        );

        if (!entity.initialized) {
          entity.currX = base.x;
          entity.currY = base.y;
          entity.currZ = base.z;
          entity.currRotX = base.rotX;
          entity.currRotY = base.rotY;
          entity.currPresetRotZ = base.presetRotZ;
          entity.currScaleZ = base.scaleZ;
          entity.initialized = true;
        } else {
          entity.currX += (base.x - entity.currX) * dampTile;
          entity.currY += (base.y - entity.currY) * dampTile;
          entity.currZ += (base.z - entity.currZ) * dampTile;
          entity.currRotX += (base.rotX - entity.currRotX) * dampTile;
          entity.currRotY += (base.rotY - entity.currRotY) * dampTile;
          entity.currPresetRotZ += (base.presetRotZ - entity.currPresetRotZ) * dampTile;
          entity.currScaleZ += (base.scaleZ - entity.currScaleZ) * dampTile;
        }

        // Layer 1: Anchor Group (Grid + Preset + Scroll + Entrance)
        const explodeOffsetZ =
          explodedBlend * (0.28 + ((spec.row + spec.col) % 3) * 0.16);
        entity.anchorGroup.position.set(
          entity.currX,
          entity.currY,
          entity.currZ + explodeOffsetZ,
        );
        entity.anchorGroup.rotation.set(
          entity.currRotX,
          entity.currRotY,
          entity.currPresetRotZ,
        );

        // Layer 2: User Rotation Pivot (Strictly isolated user rotation around outward normal Z)
        const isBeingDragged =
          activeGesture?.isDragging && activeGesture.tileId === spec.id;
        const committedTurns = currentRotMap[spec.id] ?? 0;
        const targetClockwiseRad = isBeingDragged
          ? activeGesture!.liveClockwiseRad
          : committedTurns * (Math.PI * 0.5);
        // Clockwise when viewed from front (+Z) is negative Z rotation in Three.js
        const targetUserRotZ = -targetClockwiseRad;

        // Shortest-angle wrap so cycling 270° -> 0° rotates +90° clockwise smoothly
        let angleDiff =
          ((targetUserRotZ - entity.currUserRotZ + Math.PI) % (Math.PI * 2)) - Math.PI;
        if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        // Prefer clockwise direction when angleDiff is near -PI/2
        if (reducedMotionRef.current) {
          entity.currUserRotZ = targetUserRotZ;
        } else {
          entity.currUserRotZ += angleDiff * dampUserRot;
        }

        // Hover & Click/Drag normal lift
        const isHovered = hoveredTileId === spec.id;
        const isSelected = currentSelectedId === spec.id;
        entity.clickPulseZ *= Math.exp(-9.0 * dt);
        const targetLift =
          (isBeingDragged ? 0.055 : isHovered ? 0.022 : isSelected ? 0.015 : 0) +
          entity.clickPulseZ;
        entity.currLiftZ += (targetLift - entity.currLiftZ) * dampFast;

        entity.userPivotGroup.position.set(0, 0, entity.currLiftZ);
        entity.userPivotGroup.rotation.set(0, 0, entity.currUserRotZ);
        entity.reliefMesh.scale.set(1, 1, entity.currScaleZ);

        // Separate sub-lining and pin during Explode Assembly
        entity.subLiningMesh.position.z = -0.09 - explodedBlend * 0.22;
        if (entity.pinMesh) {
          entity.pinMesh.position.z =
            0.125 * entity.currScaleZ + explodedBlend * 0.34;
        }

        // Rim outline feedback for hovered or selected module
        if (isSelected || isHovered || isBeingDragged) {
          entity.rimLines.visible = true;
          entity.rimLines.material = isSelected || isBeingDragged ? selectedRimMat : hoverRimMat;
        } else {
          entity.rimLines.visible = false;
        }
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      domEl.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', updateCameraAndWallFraming);
      domEl.removeEventListener('webglcontextlost', onContextLost);
      if (softboxLight) scene.remove(softboxLight);
      textures.disposeAll();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, [scrollProgressRef]);

  return (
    <div
      ref={mountRef}
      data-testid="hero-webgl-canvas"
      className="absolute inset-0 w-full h-full overflow-hidden"
    />
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/HeroSection.tsx">
<![CDATA['use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  Layers,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import {
  HERO_COMPOSITIONS,
  HeroCompositionId,
  MaterialFinishId,
} from '../domain/tesseraSystem';
import {
  HERO_MATERIAL_MODES,
  HeroMaterialModeId,
  PresetRotationMap,
  RESONANCE_COLS,
  RESONANCE_ROWS,
  TileQuarterTurns,
  buildResonanceWallCatalog,
  createInitialPresetRotationMap,
  quarterTurnsToDegrees,
  resetPresetRotations,
  setTileQuarterTurnsInPreset,
} from '../domain/resonanceWall';
import { HeroCanvas3D } from './HeroCanvas3D';
import { ResilientImage, usePrefersReducedMotion } from './InteractivePrimitives';
import { playTactileClick } from '../utils/acousticAudio';

const HERO_FALLBACK_IMG = '/templates/tessera/atrium_installation_hero_1794380180899.jpg';

interface HeroSectionProps {
  scrollProgressRef: React.MutableRefObject<number>;
  onSyncMaterial?: (material: MaterialFinishId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgressRef,
  onSyncMaterial,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const [composition, setComposition] = useState<HeroCompositionId>('wave');
  const [materialMode, setMaterialMode] = useState<HeroMaterialModeId>('ivory-plaster');
  const [exploded, setExploded] = useState<boolean>(false);
  const [modeDrawerOpen, setModeDrawerOpen] = useState<boolean>(false);
  const [hudHidden, setHudHidden] = useState<boolean>(false);

  // Per-preset user tile rotation overrides (never auto-reset on hover, scroll, preset switch, or material switch)
  const [presetRotations, setPresetRotations] = useState<PresetRotationMap>(() =>
    createInitialPresetRotationMap(),
  );
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);

  const catalog = useMemo(
    () => buildResonanceWallCatalog(RESONANCE_COLS, RESONANCE_ROWS),
    [],
  );

  const activePresetRotations = useMemo(
    () => presetRotations[composition] ?? {},
    [presetRotations, composition],
  );

  const editedCountInCurrentPreset = Object.keys(activePresetRotations).length;

  const activeCompositionIndex = HERO_COMPOSITIONS.findIndex((c) => c.id === composition);
  const activeCompositionSpec =
    HERO_COMPOSITIONS[activeCompositionIndex] ?? HERO_COMPOSITIONS[0];

  // Choreographed editorial typography & cue entrance
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-rule-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 },
      );

      gsap.fromTo(
        '.hero-headline-line',
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.25,
        },
      );

      gsap.fromTo(
        '.hero-editorial-fade',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.45,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Keyboard shortcuts: Escape closes inspector/drawer without resetting rotations; H toggles secondary mode controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Escape') {
        if (modeDrawerOpen) {
          setModeDrawerOpen(false);
        }
        return;
      }

      if (e.key === 'h' || e.key === 'H') {
        setHudHidden((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modeDrawerOpen]);

  const handleCommitTileRotation = useCallback(
    (tileId: string, nextTurns: TileQuarterTurns) => {
      setPresetRotations((prev) =>
        setTileQuarterTurnsInPreset(prev, composition, tileId, nextTurns),
      );
      const spec = catalog.find((t) => t.id === tileId);
      const deg = quarterTurnsToDegrees(nextTurns);
      if (spec) {
        setLiveAnnouncement(
          `Module ${spec.displayCode} (${spec.familyLabel}) rotated to ${deg} degrees.`,
        );
      }
    },
    [catalog, composition],
  );

  const handleResetCurrentWallPreset = () => {
    playTactileClick(190);
    setPresetRotations((prev) => resetPresetRotations(prev, composition));
    setLiveAnnouncement(
      `Reset all module rotations for ${activeCompositionSpec.label} to original continuous relief.`,
    );
  };

  const handleSelectMaterialMode = (modeId: HeroMaterialModeId) => {
    playTactileClick(270);
    setMaterialMode(modeId);
    const modeSpec = HERO_MATERIAL_MODES.find((m) => m.id === modeId);
    if (modeSpec) {
      onSyncMaterial?.(modeSpec.linkedConfiguratorMaterial);
      setLiveAnnouncement(`Sculpture surface changed to ${modeSpec.shortLabel}.`);
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-composition={composition}
      data-material-mode={materialMode}
      data-edited-count={editedCountInCurrentPreset}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#131311] flex flex-col justify-between pt-20 pb-28 sm:pb-24 select-none"
    >
      {/* Screen-Reader Live Region for Tile Rotations & Mode Shifts */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* Architectural Gallery Chamber Environment (Layered Dark Micro-Concrete Walls, Plaster Texture, Spotlight Bloom, Shadow Pooling & Polished Stone Floor) */}
      <div
        aria-hidden="true"
        data-testid="hero-gallery-environment"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Base Layered Gallery Wall Planes (Warm grazing gallery light from upper-left across dark Venetian plaster & micro-concrete) */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#211F1B_0%,#191815_34%,#141412_68%,#0F100E_100%)]" />

        {/* Upper-Left Grazing Museum Wall-Washer Light Cone */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_26%_18%,rgba(230,202,162,0.13)_0%,rgba(168,140,104,0.05)_48%,transparent_80%)]" />

        {/* Restrained Warm Spotlight Bloom Behind the 3D Acoustic Wall */}
        <div
          data-testid="hero-spotlight-bloom"
          className="absolute inset-0 bg-[radial-gradient(ellipse_44%_50%_at_67%_43%,rgba(244,210,160,0.26)_0%,rgba(202,164,114,0.12)_42%,rgba(128,100,68,0.04)_68%,transparent_86%)]"
        />

        {/* Layered Architectural Wall Planes: Recessed Left Wall Bay, Stepped Pilaster & Vertical Shadow-Gap Reveals */}
        <div className="absolute inset-y-0 left-0 w-[37.5%] bg-gradient-to-r from-[#131311]/75 via-[#1A1916]/35 to-[#24211C]/20 border-r border-[#D8CFC2]/[0.06]" />
        {/* Deep Architectural Shadow-Gap Reveal Channel at Pilaster Step (x = 37.5%) */}
        <div className="absolute inset-y-0 left-[37.5%] w-4 bg-gradient-to-r from-[#070706]/80 via-[#0B0B09]/40 to-transparent" />
        {/* Secondary Architectural Formwork Joint Line (x = 18%) */}
        <div className="absolute inset-y-0 left-[18%] w-[1px] bg-gradient-to-b from-transparent via-[#090908]/55 to-transparent" />
        {/* Upper Board-Formed Micro-Concrete Datum Joint */}
        <div className="absolute inset-x-0 top-[21%] h-[1px] bg-gradient-to-r from-[#090908]/45 via-[#D8CFC2]/[0.04] to-[#090908]/55" />

        {/* Procedural Tactile Venetian Plaster & Micro-Concrete Grain Texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.17] mix-blend-overlay">
          <filter id="hero-gallery-plaster-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              seed="14"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0.96 0 0 0  0 0 0.9 0 0  0 0 0 0.55 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-gallery-plaster-grain)" />
        </svg>

        {/* Dark Polished Concrete / Honed Basalt Gallery Floor Horizon (Aligned with 3D Wall Plinth Base) */}
        <div
          data-testid="hero-gallery-floor"
          className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,transparent_0%,#121210_18%,#171614_48%,#0E0F0D_100%)]"
        >
          {/* Realistic Shadow Pooling at the Base Plinth of the Gallery Wall & Acoustic Installation */}
          <div className="absolute inset-x-0 top-1 h-8 bg-gradient-to-b from-[#060605]/85 via-[#090908]/55 to-transparent" />
          <div className="absolute right-[6%] top-0 w-[64%] h-14 bg-[radial-gradient(ellipse_60%_70%_at_52%_15%,rgba(4,4,3,0.9)_0%,rgba(8,8,7,0.55)_55%,transparent_100%)]" />

          {/* Gentle Blurred Reflections of the Illuminated Acoustic Wall & S-Curve on the Polished Dark Floor */}
          <div className="absolute right-[4%] top-1 w-[66%] h-full bg-[radial-gradient(ellipse_54%_70%_at_54%_24%,rgba(236,214,182,0.22)_0%,rgba(196,168,132,0.11)_45%,rgba(128,108,84,0.04)_72%,transparent_92%)] blur-md" />
          {/* Secondary Left Gallery Floor Specular Sheen */}
          <div className="absolute left-[8%] top-2 w-[38%] h-[75%] bg-[radial-gradient(ellipse_55%_60%_at_45%_35%,rgba(212,190,158,0.07)_0%,transparent_75%)] blur-sm" />
        </div>
      </div>

      {/* Live Procedural Three.js Resonance Wall OR Non-WebGL Architectural Fallback */}
      {!webglUnavailable ? (
        <HeroCanvas3D
          composition={composition}
          materialMode={materialMode}
          exploded={exploded}
          reducedMotion={reducedMotion}
          tileRotations={activePresetRotations}
          scrollProgressRef={scrollProgressRef}
          onCommitTileRotation={handleCommitTileRotation}
          onWebGLUnavailable={() => setWebglUnavailable(true)}
        />
      ) : (
        <div
          data-testid="hero-webgl-fallback"
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <ResilientImage
            src={HERO_FALLBACK_IMG}
            alt="Sculptural Tessera Resonance Wall acoustic relief installation in warm mineral plaster, charcoal felt, and pale oak"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121311] via-[#121311]/80 to-transparent" />
        </div>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[var(--bg-canvas)] opacity-60 lg:hidden" />

      {/* Slight Atmospheric Gallery Haze & Grazing Light Mist for Interior Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(122deg,rgba(236,208,168,0.05)_0%,rgba(182,152,112,0.025)_42%,transparent_72%)]"
      />
      {/* Soft Architectural Gallery Perimeter Vignette Falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(5,5,4,0.82)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#090908]/75 via-[#0E0F0D]/28 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0A0B09]/78 via-[#10110F]/22 to-transparent"
      />

      {/* Left Editorial Column (Matches 01_APPROVED_RESONANCE_WALL_HERO.png) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-10 my-auto pt-4 pb-8 pointer-events-none">
        <div className="max-w-[500px] pointer-events-auto select-text">
          {/* Immense High-Contrast Serif Display Headline */}
          <h1 className="font-display text-[clamp(3rem,5.4vw,5.25rem)] font-normal leading-[0.98] tracking-[-0.015em] text-[#EFEAE0] mb-6">
            <span className="line-mask block pb-1">
              <span className="hero-headline-line block">See the shape</span>
            </span>
            <span className="line-mask block pb-1">
              <span className="hero-headline-line block">of silence.</span>
            </span>
          </h1>

          {/* Restrained Supporting Copy */}
          <p className="hero-editorial-fade text-[15px] sm:text-base leading-[1.68] text-[#AFA9A0] max-w-[40ch] mb-8">
            Sculptural acoustic panels that bring quiet to your space.
          </p>

          {/* Primary CTA & Secondary Text Action */}
          <div className="hero-editorial-fade flex flex-wrap items-center gap-5">
            <a
              href="#configurator"
              onClick={() => playTactileClick(250)}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-[4px] bg-[#23201B]/95 border border-[#A78960]/55 text-xs sm:text-[13px] font-medium tracking-[0.04em] text-[#EFEAE0] hover:border-[#E4DBCC] hover:bg-[#2C2822] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960]"
            >
              <span>Design your wall</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8B9A5]" />
            </a>

            <button
              type="button"
              data-testid="hero-modes-trigger"
              onClick={() => {
                playTactileClick(260);
                setHudHidden(false);
                setModeDrawerOpen((prev) => !prev);
              }}
              aria-expanded={modeDrawerOpen}
              aria-controls="hero-sculpture-mode-drawer"
              className="inline-flex items-center gap-2 py-2 text-xs sm:text-[13px] font-medium tracking-[0.04em] text-[#CBC5BB] hover:text-[#EFEAE0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm"
            >
              <span>Explore patterns</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A78960]" />
            </button>
          </div>

          {/* Interactive Module Hint */}
          <div className="hero-editorial-fade mt-8 pt-4 border-t border-[#EFEAE0]/10 max-w-[430px]">
            <span className="hero-rule-line origin-left text-[11px] font-mono-tabular tracking-[0.12em] uppercase text-[#AFA9A0]">
              Click or drag a tile to rotate it.
            </span>
          </div>
        </div>
      </div>

      {/* Lower-Left Minimal Scroll Indicator & Preset Counter (01 / 04) */}
      <div className="pointer-events-none absolute bottom-6 left-5 sm:left-10 z-20 hidden sm:flex items-end gap-5 text-[#AFA9A0]">
        <div className="flex flex-col items-center gap-1.5">
          <span className="w-[1px] h-9 bg-gradient-to-b from-transparent via-[#AFA9A0]/50 to-[#EFEAE0]" />
          <span className="text-[10px] leading-none text-[#EFEAE0]">↓</span>
        </div>
        <div className="font-mono-tabular text-xs tracking-[0.16em] text-[#AFA9A0] pb-0.5">
          <span className="text-[#EFEAE0]">
            {String(activeCompositionIndex + 1).padStart(2, '0')}
          </span>{' '}
          / 04
        </div>
      </div>

      {/* Lower-Right Restrained MATERIAL / MODE Control Surface + Expandable Secondary Preset Drawer */}
      <div
        className="absolute bottom-5 right-5 sm:right-10 z-30 flex flex-col items-end gap-2 max-w-[92vw] pointer-events-auto"
        role="region"
        aria-label="Material and Sculpture Mode Controls"
      >
        {/* Expandable Secondary Sculpture Mode Drawer (Preserves Harmonic Wave, Cathedral Vault, Radial Aperture, Tectonic Grid, Explode Assembly, Reset Wall, Hide Controls) */}
        {modeDrawerOpen && !hudHidden && (
          <div
            id="hero-sculpture-mode-drawer"
            data-testid="hero-mode-drawer"
            className="w-full sm:w-[540px] bg-[#171815]/96 border border-[#EFEAE0]/15 rounded-md p-3.5 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#EFEAE0]/10">
              <span className="text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#AFA9A0]">
                SCULPTURE PRESETS · {activeCompositionSpec.nrcRating}
              </span>
              <div className="flex items-center gap-2">
                {editedCountInCurrentPreset > 0 && (
                  <button
                    type="button"
                    data-testid="drawer-reset-wall"
                    onClick={handleResetCurrentWallPreset}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#26231E] border border-[#A78960]/50 text-[10px] font-mono-tabular text-[#EFEAE0] hover:border-[#EFEAE0] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-2.5 h-2.5 text-[#C8B9A5]" />
                    <span>Reset Wall ({editedCountInCurrentPreset})</span>
                  </button>
                )}
                <button
                  type="button"
                  data-testid="drawer-hide-controls"
                  onClick={() => setHudHidden(true)}
                  className="text-[10px] font-mono-tabular text-[#AFA9A0] hover:text-[#EFEAE0] cursor-pointer"
                >
                  Hide Controls (H)
                </button>
              </div>
            </div>

            {/* 4 Presets Segmented Control */}
            <div
              role="group"
              aria-label="Acoustic Wall Compositions"
              className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
            >
              {HERO_COMPOSITIONS.map((item) => {
                const active = composition === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`preset-${item.id}`}
                    aria-pressed={active}
                    onClick={() => {
                      playTactileClick(260);
                      setComposition(item.id);
                    }}
                    className={`px-2.5 py-1.5 text-[11px] font-medium rounded border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] ${
                      active
                        ? 'bg-[#A78960] border-[#A78960] text-[#121311] font-semibold'
                        : 'bg-[#1E1F1B] border-[#EFEAE0]/10 text-[#CBC5BB] hover:text-[#EFEAE0] hover:border-[#EFEAE0]/25'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Summary + Explode Assembly */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[11px] text-[#AFA9A0] truncate max-w-[260px]">
                {activeCompositionSpec.summary}
              </span>

              <button
                type="button"
                data-testid="hero-explode-toggle"
                aria-pressed={exploded}
                onClick={() => {
                  playTactileClick(310);
                  setExploded((prev) => !prev);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono-tabular rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] ${
                  exploded
                    ? 'bg-[#2C2720] border-[#A78960] text-[#EFEAE0]'
                    : 'bg-[#1E1F1B] border-[#EFEAE0]/12 text-[#CBC5BB] hover:border-[#EFEAE0]/30'
                }`}
              >
                <Layers className="w-3 h-3 text-[#C8B9A5]" />
                <span>{exploded ? 'Assemble Layers' : 'Explode Assembly'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Primary Compact MATERIAL / MODE Card (Matches 01_APPROVED_RESONANCE_WALL_HERO.png) */}
        {hudHidden ? (
          <button
            type="button"
            data-testid="hero-show-controls"
            onClick={() => setHudHidden(false)}
            className="px-3.5 py-2 rounded-md bg-[#171815]/95 border border-[#EFEAE0]/15 text-[11px] font-mono-tabular tracking-[0.14em] uppercase text-[#AFA9A0] hover:text-[#EFEAE0] transition-colors cursor-pointer"
          >
            Show Controls (H)
          </button>
        ) : (
          <div className="bg-[#171815]/95 border border-[#EFEAE0]/12 rounded-md px-4 sm:px-5 py-3 shadow-2xl">
            <div className="flex items-center justify-between gap-6 mb-2">
              <span className="text-[10px] font-mono-tabular tracking-[0.18em] uppercase text-[#AFA9A0]">
                MATERIAL / MODE
              </span>

              <div className="flex items-center gap-3">
                {editedCountInCurrentPreset > 0 && !modeDrawerOpen && (
                  <button
                    type="button"
                    data-testid="hud-reset-wall"
                    onClick={handleResetCurrentWallPreset}
                    className="text-[10px] font-mono-tabular tracking-[0.12em] uppercase text-[#C8B9A5] hover:text-[#EFEAE0] cursor-pointer"
                  >
                    Reset Wall ({editedCountInCurrentPreset})
                  </button>
                )}

                <button
                  type="button"
                  data-testid="hud-preset-drawer-toggle"
                  onClick={() => {
                    playTactileClick(240);
                    setModeDrawerOpen((prev) => !prev);
                  }}
                  aria-expanded={modeDrawerOpen}
                  aria-controls="hero-sculpture-mode-drawer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono-tabular tracking-[0.14em] uppercase text-[#CBC5BB] hover:text-[#EFEAE0] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] rounded-sm"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#A78960]" />
                  <span>{activeCompositionSpec.label}</span>
                </button>
              </div>
            </div>

            {/* Three Material Mode Tabs: 01 IVORY PLASTER | 02 CHARCOAL FELT | 03 PALE OAK */}
            <div
              role="group"
              aria-label="Sculpture Material Mode"
              className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6"
            >
              {HERO_MATERIAL_MODES.map((mode) => {
                const isActive = materialMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    data-testid={`material-mode-${mode.id}`}
                    aria-pressed={isActive}
                    onClick={() => handleSelectMaterialMode(mode.id)}
                    className={`relative pb-1 text-[11px] font-mono-tabular tracking-[0.14em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A78960] ${
                      isActive
                        ? 'text-[#EFEAE0] font-medium'
                        : 'text-[#8E8980] hover:text-[#CBC5BB]'
                    }`}
                  >
                    {mode.label}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#A78960] transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/InteractivePrimitives.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { playTactileClick } from '../utils/acousticAudio';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  className = '',
  ariaLabel,
  disabled = false,
  cursorLabel,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reducedMotion || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: Math.max(-9, Math.min(9, dx * 0.22)),
      y: Math.max(-6, Math.min(6, dy * 0.22)),
    });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;
    playTactileClick(240);
    onClick?.(e);
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 font-medium tracking-wide rounded-md transition-[transform,background-color,border-color,color,opacity] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D10] select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const variantStyles = {
    primary:
      'bg-[#C89D66] text-[#0B0D10] hover:bg-[#D5AD7A] px-5 py-2.5 text-sm font-semibold',
    secondary:
      'bg-[#161A21] text-[#F1F5F9] border border-slate-200/15 hover:border-[#C89D66]/60 hover:text-white px-5 py-2.5 text-sm',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F1F5F9] border border-transparent hover:border-slate-200/10 px-4 py-2 text-sm',
  }[variant];

  const transformStyle = reducedMotion
    ? undefined
    : { transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)` };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        data-cursor={cursorLabel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        style={transformStyle}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor={cursorLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      style={transformStyle}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

interface TiltSurfaceProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  cursorLabel?: string;
}

export const TiltSurface: React.FC<TiltSurfaceProps> = ({
  children,
  className = '',
  maxTiltDeg = 5,
  cursorLabel,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const surfaceRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty('--spot-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-y', `${(py * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-opacity', '1');

    if (!reducedMotion) {
      const rotY = (px - 0.5) * maxTiltDeg * 2;
      const rotX = (0.5 - py) * maxTiltDeg * 2;
      el.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`;
    }
  };

  const handlePointerLeave = () => {
    const el = surfaceRef.current;
    if (!el) return;
    el.style.setProperty('--spot-opacity', '0');
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      ref={surfaceRef}
      data-cursor={cursorLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`radial-spotlight transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Architectural Acoustic Installation',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#161A21] via-[#111419] to-[#0B0D10] border border-slate-200/10 p-8 text-center ${className}`}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#C89D66]/80"
        >
          <rect x="6" y="6" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 26L26 6" stroke="currentColor" strokeWidth="1.2" />
          <rect x="30" y="6" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M30 6L50 26" stroke="currentColor" strokeWidth="1.2" />
          <rect x="6" y="30" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 30L26 50" stroke="currentColor" strokeWidth="1.2" />
          <rect x="30" y="30" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M30 50L50 30" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="font-display text-lg text-[#F1F5F9]">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const CustomReticleCursor: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || !window.matchMedia) {
      setEnabled(false);
      return;
    }
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let hasMoved = false;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        currentX = targetX;
        currentY = targetY;
        hasMoved = true;
        if (ringRef.current) {
          ringRef.current.style.opacity = '1';
        }
      }

      const targetEl = e.target as HTMLElement | null;
      const cursorHost = targetEl?.closest('[data-cursor]') as HTMLElement | null;
      const interactiveHost = targetEl?.closest('button, a, input, select, textarea');

      if (ringRef.current && labelRef.current) {
        const text = cursorHost?.getAttribute('data-cursor') ?? '';
        labelRef.current.textContent = text;
        if (text) {
          ringRef.current.dataset.mode = 'labeled';
        } else if (interactiveHost) {
          ringRef.current.dataset.mode = 'interactive';
        } else {
          ringRef.current.dataset.mode = 'default';
        }
      }
    };

    const onPointerLeaveWindow = () => {
      if (ringRef.current) {
        ringRef.current.style.opacity = '0';
      }
      hasMoved = false;
    };

    const tick = () => {
      if (hasMoved && ringRef.current) {
        currentX += (targetX - currentX) * 0.26;
        currentY += (targetY - currentY) * 0.26;
        ringRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeaveWindow);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeaveWindow);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      data-mode="default"
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 z-50 pointer-events-none hidden lg:flex items-center justify-center rounded-full border border-[#C89D66]/45 transition-[width,height,background-color,border-color,opacity] duration-150 ease-out w-5 h-5 data-[mode=interactive]:w-8 data-[mode=interactive]:h-8 data-[mode=interactive]:border-[#C89D66]/35 data-[mode=labeled]:w-22 data-[mode=labeled]:h-7 data-[mode=labeled]:rounded-md data-[mode=labeled]:bg-[#111419]/95 data-[mode=labeled]:border-[#C89D66]/80"
    >
      <span
        ref={labelRef}
        className="font-mono-tabular text-[10px] tracking-wider text-[#F1F5F9] whitespace-nowrap px-1.5"
      />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/ManifestoSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResilientImage, TiltSurface, usePrefersReducedMotion } from './InteractivePrimitives';

gsap.registerPlugin(ScrollTrigger);

const ATRIUM_PLATE = '/templates/tessera/atrium_installation_hero_1794380180899.jpg';

function buildWaveformPath(dampingProgress: number): string {
  // dampingProgress: 0 = chaotic high-amplitude standing reflections, 1 = calm damped harmonic wave
  const points = 64;
  const width = 560;
  const midY = 54;
  const amp = 38 * (1 - dampingProgress * 0.82);
  const harmonicNoise = 1 - dampingProgress;

  let d = `M 0 ${midY.toFixed(1)}`;
  for (let i = 1; i <= points; i++) {
    const t = i / points;
    const x = t * width;
    const envelope = Math.sin(t * Math.PI);
    const primary = Math.sin(t * Math.PI * 5.5) * amp * envelope;
    const flutter =
      (Math.sin(t * Math.PI * 19) * 14 + Math.cos(t * Math.PI * 31) * 8) *
      harmonicNoise *
      envelope;
    const y = midY + primary + flutter;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export const ManifestoSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const clipFrameRef = useRef<HTMLDivElement>(null);
  const innerImgWrapRef = useRef<HTMLDivElement>(null);
  const [waveDamping, setWaveDamping] = useState<number>(reducedMotion ? 0.85 : 0.1);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) {
      setWaveDamping(0.85);
      return;
    }

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.manifesto-line-inner');
      gsap.fromTo(
        lines,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      if (clipFrameRef.current && innerImgWrapRef.current) {
        gsap.fromTo(
          clipFrameRef.current,
          { clipPath: 'inset(18% 12% 18% 12% round 8px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 8px)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center 45%',
              scrub: 0.6,
            },
          },
        );

        gsap.fromTo(
          innerImgWrapRef.current,
          { scale: 1.14 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 30%',
              scrub: 0.6,
            },
          },
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 0.4,
        onUpdate: (self) => {
          setWaveDamping(Number(self.progress.toFixed(3)));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const liveRt60 = (2.1 - waveDamping * 1.72).toFixed(2);
  const wavePath = buildWaveformPath(waveDamping);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 bg-[#0B0D10] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Editorial Statement + Scroll-Morphing Acoustic Waveform */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-display text-[clamp(2rem,3.6vw,3.35rem)] leading-[1.12] font-normal text-[#F8FAFC]">
              <span className="line-mask">
                <span className="manifesto-line-inner block">
                  Less echo.
                </span>
              </span>
              <span className="line-mask">
                <span className="manifesto-line-inner block text-[#E2C399]">
                  More room to listen.
                </span>
              </span>
            </h2>

            <p className="text-[15px] leading-[1.7] text-[#94A3B8] max-w-[46ch]">
              Modular relief panels soften reverberation without hiding the architecture.
            </p>

            {/* Scroll-Morphing SVG Reverberation Attenuation Trace */}
            <div className="pt-6 border-t border-slate-200/10">
              <div className="flex items-center justify-between text-xs font-mono-tabular mb-3">
                <span className="text-[#94A3B8]">
                  Reverberation demo
                </span>
                <span className="text-[#E2C399] font-medium">
                  RT60: {liveRt60}s
                </span>
              </div>
              <div className="bg-[#111419] border border-slate-200/10 rounded-lg p-4">
                <svg
                  viewBox="0 0 560 108"
                  className="w-full h-20 overflow-visible"
                  role="img"
                  aria-label={`Acoustic impulse decay waveform showing reverberation damped to ${liveRt60} seconds`}
                >
                  <line
                    x1="0"
                    y1="54"
                    x2="560"
                    y2="54"
                    stroke="rgba(226,232,240,0.1)"
                    strokeDasharray="3 4"
                  />
                  <path
                    d={wavePath}
                    fill="none"
                    stroke="#C89D66"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#64748B] mt-2">
                  <span>Untreated</span>
                  <span>With Tessera</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Clip-Masked Museum Atrium Plate */}
          <div className="lg:col-span-5">
            <TiltSurface maxTiltDeg={4} cursorLabel="ATRIUM">
              <div
                ref={clipFrameRef}
                className="overflow-hidden rounded-lg border border-slate-200/15 bg-[#111419]"
              >
                <div ref={innerImgWrapRef} className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full">
                  <ResilientImage
                    src={ATRIUM_PLATE}
                    alt="Daylit architectural museum atrium featuring a two-story Tessera limestone and walnut relief wall"
                    className="w-full h-full object-cover"
                    fallbackTitle="Kunsthalle Atrium Elevation"
                  />
                </div>
              </div>
            </TiltSurface>
            <div className="mt-3 flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
              <span>Atrium concept</span>
              <span>Limestone and walnut</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/MaterialsSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, ArrowUpRight } from 'lucide-react';
import {
  FREQUENCY_BANDS_HZ,
  MATERIAL_FINISHES,
  MaterialFinishId,
} from '../domain/tesseraSystem';
import {
  MagneticButton,
  ResilientImage,
  TiltSurface,
  usePrefersReducedMotion,
} from './InteractivePrimitives';
import { playAcousticComparison, playTactileClick } from '../utils/acousticAudio';

gsap.registerPlugin(ScrollTrigger);

const MATERIAL_ATELIER_IMG =
  '/templates/tessera/material_atelier_craft_1794380184347.jpg';

interface MaterialsSectionProps {
  onSelectMaterialForConfigurator: (materialId: MaterialFinishId) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  onSelectMaterialForConfigurator,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState<MaterialFinishId>('charcoal-felt');
  const [auditionState, setAuditionState] = useState<'idle' | 'untreated' | 'tessera'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  const selectedSpec =
    MATERIAL_FINISHES.find((m) => m.id === selectedId) ?? MATERIAL_FINISHES[0];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.material-row-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Compute SVG absorption curve coordinates for selected finish
  const baseProfile = [0.54, 0.81, 0.93, 0.96, 0.94, 0.89];
  const points = baseProfile.map((val, idx) => {
    const alpha = Math.max(0.35, Math.min(0.99, val + selectedSpec.nrcModifier));
    const x = 36 + idx * 84;
    const y = 118 - alpha * 92;
    return { x, y, alpha, hz: FREQUENCY_BANDS_HZ[idx] };
  });
  const polylinePath = points
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y.toFixed(1)}`)
    .join(' ');

  const triggerAudition = (mode: 'untreated' | 'tessera') => {
    setAuditionState(mode);
    playAcousticComparison(mode, 0.92 + selectedSpec.nrcModifier);
    window.setTimeout(() => {
      setAuditionState((prev) => (prev === mode ? 'idle' : prev));
    }, 1500);
  };

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#111419] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 mb-14 border-b border-slate-200/10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.25rem)] leading-[1.1] font-normal text-[#F8FAFC]">
              Find your finish.
            </h2>
          </div>
          <p className="lg:col-span-5 text-[15px] leading-[1.68] text-[#94A3B8]">
            Five finishes. Choose the texture and tone for your space.
          </p>
        </div>

        {/* Asymmetric Two-Column Atelier Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Specimen Plate + Interactive Acoustic Audition */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <TiltSurface maxTiltDeg={5} cursorLabel="SPECIMEN">
              <div className="rounded-xl overflow-hidden border border-slate-200/15 bg-[#0B0D10]">
                <div className="aspect-[4/3] w-full">
                  <ResilientImage
                    src={MATERIAL_ATELIER_IMG}
                    alt="Macro studio specimens of compressed charcoal felt, fluted smoked walnut, porous limestone, and anodized bronze cleats on a slate drafting table"
                    className="w-full h-full object-cover"
                    fallbackTitle="Tessera Material Specimen Plate"
                  />
                </div>
              </div>
            </TiltSurface>

            {/* Acoustic Chamber Tone Comparison Box */}
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  CHAMBER IMPULSE AUDITION
                </span>
                <span className="text-xs font-mono-tabular text-[#E2C399]">
                  {selectedSpec.name}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#94A3B8]">
                Compare synthesized room decay between an untreated concrete chamber and a
                wall finished in {selectedSpec.name}.
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => triggerAudition('untreated')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                    auditionState === 'untreated'
                      ? 'bg-[#1E2430] border-[#C89D66] text-[#F8FAFC]'
                      : 'bg-[#161A21] border-slate-200/15 text-[#CBD5E1] hover:border-slate-200/35'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Hear untreated</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerAudition('tessera')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                    auditionState === 'tessera'
                      ? 'bg-[#C89D66] border-[#C89D66] text-[#0B0D10] font-semibold'
                      : 'bg-[#161A21] border-[#C89D66]/45 text-[#F1F5F9] hover:border-[#C89D66]'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-current" />
                  <span>Hear with Tessera</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Interactive Material Index + Live SVG Absorption Curve */}
          <div className="lg:col-span-7 space-y-8">
            <div
              role="group"
              aria-label="Architectural Material Finishes"
              className="divide-y divide-slate-200/10 border-y border-slate-200/10"
            >
              {MATERIAL_FINISHES.map((mat) => {
                const isSelected = mat.id === selectedId;
                const effectiveNrc = (0.92 + mat.nrcModifier).toFixed(2);
                return (
                  <div
                    key={mat.id}
                    className={`material-row-item transition-colors ${
                      isSelected ? 'bg-[#161A21]' : 'hover:bg-[#161A21]/50'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      onClick={() => {
                        playTactileClick(250);
                        setSelectedId(mat.id);
                      }}
                      className="w-full text-left py-5 px-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span
                            aria-hidden="true"
                            style={{
                              background: `radial-gradient(circle at 32% 30%, ${mat.highlightHex}, ${mat.primaryHex} 62%, ${mat.shadowHex})`,
                            }}
                            className={`w-9 h-9 rounded-full shrink-0 border ${
                              isSelected ? 'border-[#C89D66] scale-105' : 'border-slate-200/20'
                            } transition-transform`}
                          />
                          <div>
                            <div className="font-display text-2xl text-[#F8FAFC] leading-tight">
                              {mat.name}
                            </div>
                            <div className="text-xs text-[#94A3B8] mt-0.5">
                              {mat.origin}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono-tabular text-[#94A3B8]">
                          <span>NRC {effectiveNrc}</span>
                          <span aria-hidden="true">·</span>
                          <span>{mat.massPerTileKg.toFixed(1)} kg / tile</span>
                        </div>
                      </div>
                    </button>

                    {isSelected && (
                      <div className="px-4 pb-5 pl-17 space-y-4">
                        <p className="text-sm leading-relaxed text-[#CBD5E1] max-w-[58ch]">
                          {mat.description}
                        </p>
                        <div>
                          <MagneticButton
                            variant="secondary"
                            onClick={() => {
                              onSelectMaterialForConfigurator(mat.id);
                              document
                                .getElementById('configurator')
                                ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
                            }}
                            className="py-1.5 px-3.5 text-xs"
                          >
                            Use this finish
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#C89D66]" />
                          </MagneticButton>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Smooth SVG Line-Drawn Absorption Curve for Selected Finish */}
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  MEASURED ABSORPTION PROFILE — {selectedSpec.name.toUpperCase()}
                </span>
                <span className="text-xs font-mono-tabular text-[#E2C399]">
                  Mass: {selectedSpec.massPerTileKg.toFixed(1)} kg/unit · Roughness {selectedSpec.roughness.toFixed(2)}
                </span>
              </div>

              <svg
                viewBox="0 0 500 145"
                className="w-full h-auto"
                role="img"
                aria-label={`Sound absorption coefficient curve across 125 Hz to 4000 Hz for ${selectedSpec.name}`}
              >
                {[0.25, 0.5, 0.75, 1.0].map((gridVal) => {
                  const gy = 118 - gridVal * 92;
                  return (
                    <g key={gridVal}>
                      <line
                        x1="28"
                        y1={gy}
                        x2="472"
                        y2={gy}
                        stroke="rgba(226,232,240,0.08)"
                      />
                      <text
                        x="4"
                        y={gy + 3}
                        fill="#64748B"
                        fontSize="9.5"
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        {gridVal.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                <path
                  d={polylinePath}
                  fill="none"
                  stroke="#C89D66"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />

                {points.map((pt) => (
                  <g key={pt.hz}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill="#0B0D10"
                      stroke="#E2C399"
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 9}
                      textAnchor="middle"
                      fill="#F1F5F9"
                      fontSize="9.5"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {pt.alpha.toFixed(2)}
                    </text>
                    <text
                      x={pt.x}
                      y="138"
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {pt.hz >= 1000 ? `${pt.hz / 1000}k` : pt.hz} Hz
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/Navbar.tsx">
<![CDATA['use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Philosophy', href: '#philosophy', id: 'philosophy' },
  { label: 'System', href: '#system', id: 'system' },
  { label: 'Materials', href: '#materials', id: 'materials' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Configurator', href: '#configurator', id: 'configurator' },
] as const;

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);

      const scrollPos = window.scrollY + 220;
      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#121311]/95 border-b border-[#EFEAE0]/10'
          : 'bg-gradient-to-b from-[#121311]/90 via-[#121311]/45 to-transparent border-b border-[#EFEAE0]/8'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 h-14 md:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-sans text-lg sm:text-xl font-semibold tracking-[0.22em] text-[#EFEAE0] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm"
        >
          TESSERA
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.18em] uppercase text-[#AFA9A0]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#EFEAE0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm ${
                  isActive ? 'text-[#EFEAE0]' : ''
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#A78960] origin-left transition-transform duration-200 ease-out ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 quiet primary action (+ mobile menu toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#inquire"
            className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 text-[11px] font-medium tracking-[0.16em] uppercase text-[#EFEAE0]/90 hover:text-[#EFEAE0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm"
          >
            <span>Plan your space</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A78960]" />
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#EFEAE0]/15 text-[#EFEAE0] hover:border-[#A78960] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#161714] border-b border-[#EFEAE0]/12 px-5 py-5 flex flex-col gap-3"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium tracking-wider uppercase text-[#EFEAE0] border-b border-[#EFEAE0]/8 hover:text-[#C8B9A5] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#inquire"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-[#25231F] border border-[#A78960]/45 text-xs font-medium tracking-widest uppercase text-[#EFEAE0]"
            >
              <span>Plan your space</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A78960]" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/PinnedChaptersSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './InteractivePrimitives';
import { playTactileClick } from '../utils/acousticAudio';

gsap.registerPlugin(ScrollTrigger);

interface ChapterMeta {
  index: string;
  id: 'form' | 'function' | 'freedom';
  title: string;
  headline: string;
  body: string;
  metrics: { label: string; value: string }[];
}

const CHAPTERS: ChapterMeta[] = [
  {
    index: '01',
    id: 'form',
    title: '01. Form',
    headline: 'Sculpted to quiet a room.',
    body: 'Each 600 × 600 mm panel combines a sculpted face, an acoustic core, and concealed mounting.',
    metrics: [
      { label: 'Module Tolerance', value: '±0.15 mm' },
      { label: 'Relief Depth', value: '58 – 82 mm' },
      { label: 'Fire Rating', value: 'EN 13501 A2-s1' },
    ],
  },
  {
    index: '02',
    id: 'function',
    title: '02. Function',
    headline: 'Less echo. Clearer conversation.',
    body: 'Angled surfaces scatter sound. The porous core absorbs it.',
    metrics: [
      { label: 'Verified Absorption', value: '0.95 NRC' },
      { label: 'Speech Band (500–2k Hz)', value: '0.98 αw' },
      { label: 'Reverb Reduction', value: '-68% RT60' },
    ],
  },
  {
    index: '03',
    id: 'freedom',
    title: '03. Freedom',
    headline: 'A wall you can change.',
    body: 'Rotate tiles or swap finishes to create a new pattern.',
    metrics: [
      { label: 'Rotational States', value: '4 × 90° Axes' },
      { label: 'Tile Swap Time', value: '< 8 Seconds' },
      { label: 'Pattern Permutations', value: '4.2M+ / Wall' },
    ],
  },
];

const FREEDOM_PRESETS = [
  {
    id: 'cantilever',
    name: 'Cantilever Sweep',
    rotations: [
      0, 0, 90, 90, 180, 180,
      0, 90, 90, 180, 180, 270,
      90, 90, 180, 180, 270, 270,
      90, 180, 180, 270, 270, 0,
    ],
  },
  {
    id: 'vault',
    name: 'Tessellated Vault',
    rotations: [
      0, 90, 0, 180, 270, 180,
      90, 0, 90, 270, 180, 270,
      270, 180, 270, 90, 0, 90,
      180, 270, 180, 0, 90, 0,
    ],
  },
  {
    id: 'horizon',
    name: 'Monolithic Horizon',
    rotations: [
      0, 180, 0, 180, 0, 180,
      90, 270, 90, 270, 90, 270,
      0, 180, 0, 180, 0, 180,
      90, 270, 90, 270, 90, 270,
    ],
  },
] as const;

export const PinnedChaptersSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktopPin, setIsDesktopPin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });
  const [activeChapter, setActiveChapter] = useState<0 | 1 | 2>(0);
  const [chapterProgress, setChapterProgress] = useState<number>(1);
  const [freedomPresetIdx, setFreedomPresetIdx] = useState<number>(0);

  const pinWrapRef = useRef<HTMLDivElement>(null);
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const onResize = () => {
      setIsDesktopPin(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const shouldPin = isDesktopPin && !reducedMotion;

  useEffect(() => {
    if (!shouldPin || !pinWrapRef.current) {
      triggerInstanceRef.current = null;
      return;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.chapter-stage-panel');
      const visuals = gsap.utils.toArray<HTMLElement>('.chapter-visual-panel');

      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set([panels[1], panels[2]], { autoAlpha: 0, y: 36 });

      gsap.set(visuals[0], { autoAlpha: 1, scale: 1, rotateX: 0 });
      gsap.set([visuals[1], visuals[2]], { autoAlpha: 0, scale: 0.92, rotateX: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: 'top top',
          end: '+=360%', // Generous 3.6x viewport scroll distance for all 3 chapters + Chapter 3 readable hold
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveChapter(0);
              setChapterProgress(Math.min(1, p / 0.22));
            } else if (p < 0.67) {
              setActiveChapter(1);
              setChapterProgress(Math.min(1, (p - 0.33) / 0.22));
            } else {
              setActiveChapter(2);
              const subP = Math.min(1, (p - 0.67) / 0.16);
              setChapterProgress(subP);
              // Automatically cycle Freedom arrangement as user scrolls through Chapter 3
              if (p < 0.78) setFreedomPresetIdx(0);
              else if (p < 0.89) setFreedomPresetIdx(1);
              else setFreedomPresetIdx(2);
            }
          },
        },
      });

      triggerInstanceRef.current = tl.scrollTrigger ?? null;

      // 0 -> 28: Chapter 01 (FORM) readable hold & layer separation
      tl.fromTo(
        '.form-layer-plate',
        { y: 0 },
        {
          y: (i: number) => (i - 1.5) * -34,
          duration: 14,
          ease: 'power2.out',
        },
        0,
      );
      tl.to({}, { duration: 14 }, 14); // Hold Chapter 01

      // 28 -> 36: Transition Chapter 01 -> Chapter 02 (FUNCTION)
      tl.to(panels[0], { autoAlpha: 0, y: -32, duration: 8, ease: 'power2.inOut' }, 28);
      tl.to(visuals[0], { autoAlpha: 0, scale: 0.93, duration: 8, ease: 'power2.inOut' }, 28);

      tl.to(panels[1], { autoAlpha: 1, y: 0, duration: 8, ease: 'power2.out' }, 31);
      tl.to(visuals[1], { autoAlpha: 1, scale: 1, rotateX: 0, duration: 8, ease: 'power2.out' }, 31);

      // 39 -> 64: Hold Chapter 02 cleanly
      tl.to({}, { duration: 25 }, 39);

      // 64 -> 72: Transition Chapter 02 -> Chapter 03 (FREEDOM)
      tl.to(panels[1], { autoAlpha: 0, y: -32, duration: 8, ease: 'power2.inOut' }, 64);
      tl.to(visuals[1], { autoAlpha: 0, scale: 0.93, duration: 8, ease: 'power2.inOut' }, 64);

      tl.to(panels[2], { autoAlpha: 1, y: 0, duration: 8, ease: 'power2.out' }, 67);
      tl.to(visuals[2], { autoAlpha: 1, scale: 1, rotateX: 0, duration: 8, ease: 'power2.out' }, 67);

      // 75 -> 100: Dedicated long readable hold for Chapter 03 before releasing pin!
      tl.to({}, { duration: 25 }, 75);
    }, pinWrapRef);

    return () => ctx.revert();
  }, [shouldPin]);

  const jumpToChapter = (chapterIdx: 0 | 1 | 2) => {
    playTactileClick(250);
    setActiveChapter(chapterIdx);
    const st = triggerInstanceRef.current;
    if (shouldPin && st) {
      const targetProgress = chapterIdx === 0 ? 0.14 : chapterIdx === 1 ? 0.48 : 0.84;
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`chapter-mobile-${CHAPTERS[chapterIdx].id}`);
      el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  // RenderVisual helper so desktop pinned and mobile stacked share rich bespoke visual diagrams
  const renderChapterVisual = (idx: 0 | 1 | 2, interactiveProgress = 1) => {
    if (idx === 0) {
      // CHAPTER 01 — FORM: Exploded Isometric 4-Layer CAD Schematic
      const spread = shouldPin ? 28 : 24;
      const layers = [
        {
          name: '01. Sculpted Mineral Faceplate',
          spec: '58mm Sintered Limestone · 22° Oblique Bevel',
          fill: '#CEC8BE',
          stroke: '#E5E1D8',
          offsetY: -1.5 * spread,
        },
        {
          name: '02. Slotted Helmholtz Plate',
          spec: '0.8mm Tuned Resonance Slots · Vocal Band Trap',
          fill: '#6E4E3A',
          stroke: '#C89D66',
          offsetY: -0.5 * spread,
        },
        {
          name: '03. Recycled PET Acoustic Core',
          spec: '48 kg/m³ Open-Cell Absorber · Class A Damping',
          fill: '#232832',
          stroke: '#64748B',
          offsetY: 0.5 * spread,
        },
        {
          name: '04. Quick-Lock Magnetic Sub-Cleat',
          spec: 'Anodized Bronze Rail Interface · ±0.15mm Lock',
          fill: '#151921',
          stroke: '#C89D66',
          offsetY: 1.5 * spread,
        },
      ];

      return (
        <div className="w-full h-full flex flex-col justify-between bg-[#111419] border border-slate-200/12 rounded-xl p-5 sm:p-7">
          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
            <span>Panel layers</span>
            <span className="text-[#E2C399]">600 × 600 × 74 mm</span>
          </div>

          <div className="my-auto py-4">
            <svg
              viewBox="0 0 560 340"
              className="w-full h-auto max-h-[320px] overflow-visible"
              role="img"
              aria-label="Exploded four-layer isometric architectural diagram of a Tessera acoustic tile"
            >
              {/* Central vertical alignment axis */}
              <line
                x1="215"
                y1="26"
                x2="215"
                y2="314"
                stroke="#C89D66"
                strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
              {layers.map((layer, lIdx) => {
                const baseCy = 170 + layer.offsetY;
                return (
                  <g
                    key={layer.name}
                    className="form-layer-plate"
                    transform={`translate(0, ${shouldPin ? 0 : layer.offsetY})`}
                  >
                    {/* Isometric diamond plate */}
                    <polygon
                      points={`215,${(shouldPin ? 170 : 170) - 42} 335,${shouldPin ? 170 : 170} 215,${(shouldPin ? 170 : 170) + 42} 95,${shouldPin ? 170 : 170}`}
                      fill={layer.fill}
                      fillOpacity={lIdx === 0 ? 0.92 : 0.86}
                      stroke={layer.stroke}
                      strokeWidth="1.4"
                    />
                    {/* Internal isometric detail lines per layer */}
                    {lIdx === 0 && (
                      <polygon
                        points="215,136 312,170 215,194 135,170"
                        fill="#EAE6DF"
                        fillOpacity="0.35"
                      />
                    )}
                    {lIdx === 1 && (
                      <g stroke="#E2C399" strokeWidth="1.2" strokeOpacity="0.75">
                        <line x1="165" y1="162" x2="255" y2="162" />
                        <line x1="155" y1="170" x2="275" y2="170" />
                        <line x1="165" y1="178" x2="255" y2="178" />
                      </g>
                    )}
                    {lIdx === 3 && (
                      <circle
                        cx="215"
                        cy="170"
                        r="10"
                        fill="none"
                        stroke="#C89D66"
                        strokeWidth="2"
                      />
                    )}
                    {/* Leader callout line & text */}
                    <line
                      x1="335"
                      y1="170"
                      x2="366"
                      y2="170"
                      stroke="#C89D66"
                      strokeOpacity="0.65"
                      strokeWidth="1"
                    />
                    <circle cx="335" cy="170" r="2.5" fill="#C89D66" />
                    <text
                      x="374"
                      y="167"
                      fill="#F1F5F9"
                      fontSize="11.5"
                      fontWeight="600"
                    >
                      {layer.name}
                    </text>
                    <text
                      x="374"
                      y="182"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {layer.spec}
                    </text>
                    <title>{`${layer.name} (${baseCy})`}</title>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#64748B] pt-3 border-t border-slate-200/10">
            <span>Zero VOC Mineral &amp; Wool Binder</span>
            <span>Concealed Shadow Joint: 4.0 mm</span>
          </div>
        </div>
      );
    }

    if (idx === 1) {
      // CHAPTER 02 — FUNCTION: Sound Dispersion & Octave Absorption Visualizer
      const bands = [
        { hz: '125 Hz', untreated: 12, tessera: 58 },
        { hz: '250 Hz', untreated: 14, tessera: 84 },
        { hz: '500 Hz', untreated: 16, tessera: 95 },
        { hz: '1 kHz', untreated: 18, tessera: 98 },
        { hz: '2 kHz', untreated: 20, tessera: 95 },
        { hz: '4 kHz', untreated: 22, tessera: 91 },
      ];
      const dashOffset = Math.round((1 - Math.max(0.2, interactiveProgress)) * 220);

      return (
        <div className="w-full h-full flex flex-col justify-between bg-[#111419] border border-slate-200/12 rounded-xl p-5 sm:p-7 space-y-5">
          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
            <span>Sound absorption</span>
            <span className="text-[#E2C399]">ISO 354 · αw = 0.95 (Class A)</span>
          </div>

          {/* Acoustic Ray-Scattering Cross-Section SVG */}
          <div className="bg-[#0B0D10] border border-slate-200/10 rounded-lg p-4">
            <svg
              viewBox="0 0 520 165"
              className="w-full h-auto"
              role="img"
              aria-label="Acoustic wave dispersion diagram showing incident sound energy scattered and absorbed by beveled Tessera facets"
            >
              {/* Beveled acoustic wall cross-section at bottom */}
              <polygon
                points="20,148 85,112 150,142 215,106 280,142 345,108 410,142 475,112 505,148 505,160 20,160"
                fill="#1E2430"
                stroke="#C89D66"
                strokeWidth="1.5"
              />
              {/* Incident High-Energy Sound Vectors (Gold) */}
              <g
                stroke="#E2C399"
                strokeWidth="2"
                fill="none"
                strokeDasharray="240"
                strokeDashoffset={dashOffset}
              >
                <path d="M 55,18 L 215,106" />
                <path d="M 135,14 L 280,138" />
                <path d="M 225,14 L 345,108" />
              </g>
              {/* Diffused Low-Energy Micro-Rays (Cool Muted Slate) */}
              <g
                stroke="#93C5FD"
                strokeOpacity="0.6"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                fill="none"
              >
                <path d="M 215,106 L 155,40" />
                <path d="M 215,106 L 265,34" />
                <path d="M 215,106 L 325,58" />
                <path d="M 345,108 L 315,36" />
                <path d="M 345,108 L 415,32" />
                <path d="M 345,108 L 475,66" />
              </g>
              <text
                x="28"
                y="32"
                fill="#E2C399"
                fontSize="10.5"
                fontFamily="IBM Plex Mono, monospace"
              >
                Incident Direct Wave (85 dB)
              </text>
              <text
                x="335"
                y="26"
                fill="#93C5FD"
                fontSize="10.5"
                fontFamily="IBM Plex Mono, monospace"
              >
                Diffused Scatter (-18 dB)
              </text>
            </svg>
          </div>

          {/* 6-Band Octave Absorption Comparison */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8]">
              <span>Absorption by frequency</span>
              <span>Tessera vs. Raw Concrete</span>
            </div>
            <div className="grid grid-cols-6 gap-2 sm:gap-3 pt-1">
              {bands.map((b) => (
                <div key={b.hz} className="flex flex-col items-center gap-1.5">
                  <div className="w-full h-24 bg-[#0B0D10] rounded border border-slate-200/10 flex items-end justify-center gap-1 p-1.5">
                    <div
                      style={{ height: `${b.untreated}%` }}
                      className="w-2 bg-slate-600/60 rounded-t-xs"
                      title={`Untreated Concrete: ${(b.untreated / 100).toFixed(2)}`}
                    />
                    <div
                      style={{
                        height: `${Math.round(b.tessera * Math.max(0.35, interactiveProgress))}%`,
                      }}
                      className="w-2.5 bg-[#C89D66] rounded-t-xs transition-all duration-300"
                      title={`Tessera System: ${(b.tessera / 100).toFixed(2)}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono-tabular text-[#94A3B8] whitespace-nowrap">
                    {b.hz}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 03 — FREEDOM: Interactive Modular Elevation Matrix
    const activePreset = FREEDOM_PRESETS[freedomPresetIdx] ?? FREEDOM_PRESETS[0];

    return (
      <div className="w-full flex flex-col justify-between bg-[#111419] border border-slate-200/12 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono-tabular text-[#94A3B8]">
            MODULAR ELEVATION · 6 × 4 MATRIX
          </span>
          <div
            role="group"
            aria-label="Chapter 03 Pattern Presets"
            className="flex items-center gap-1 bg-[#0B0D10] p-1 rounded-md border border-slate-200/10"
          >
            {FREEDOM_PRESETS.map((preset, pIdx) => {
              const selected = pIdx === freedomPresetIdx;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    playTactileClick(280);
                    setFreedomPresetIdx(pIdx);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selected
                      ? 'bg-[#C89D66] text-[#0B0D10] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Rearranging 24-Tile Architectural Elevation (proportioned cleanly for 900px vh) */}
        <div className="grid grid-cols-6 gap-2 max-w-[430px] w-full mx-auto my-auto py-1">
          {activePreset.rotations.map((deg, tileIdx) => {
            const warmAccent = (tileIdx + freedomPresetIdx) % 3 === 0;
            return (
              <div
                key={tileIdx}
                className="aspect-square rounded bg-[#0B0D10] border border-slate-200/15 p-1 flex items-center justify-center overflow-hidden"
              >
                <svg
                  viewBox="0 0 48 48"
                  style={{ transform: `rotate(${deg}deg)` }}
                  className="w-full h-full transition-transform duration-500 ease-out"
                  aria-hidden="true"
                >
                  <polygon
                    points="0,0 48,0 30,48 0,48"
                    fill={warmAccent ? '#C89D66' : '#CEC8BE'}
                    fillOpacity={warmAccent ? '0.4' : '0.24'}
                  />
                  <polygon
                    points="48,0 48,48 30,48"
                    fill="#1E2430"
                  />
                  <line
                    x1="34"
                    y1="6"
                    x2="34"
                    y2="42"
                    stroke="#C89D66"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="40"
                    y1="6"
                    x2="40"
                    y2="42"
                    stroke="#C89D66"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                  />
                  <circle cx="8" cy="8" r="1.8" fill="#C89D66" />
                </svg>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#94A3B8] pt-3 border-t border-slate-200/10">
          <span>Active Rhythm: {activePreset.name}</span>
          <span className="text-[#E2C399]">24 Interchangeable Units · 8.64 m²</span>
        </div>
      </div>
    );
  };

  // Desktop Pinned Experience (>= 1024px & !prefersReducedMotion)
  if (shouldPin) {
    return (
      <section id="system" className="relative bg-[#0B0D10] border-t border-slate-200/10">
        <div
          ref={pinWrapRef}
          data-active-chapter={CHAPTERS[activeChapter].id}
          className="h-screen w-full flex flex-col justify-between pt-20 pb-8 px-8 max-w-[1360px] mx-auto"
        >
          {/* Top Chapter Progress & Direct Jump Bar */}
          <div className="flex items-center justify-between gap-8 pb-4 border-b border-slate-200/10 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
              <span>How it works</span>
            </div>

            <div
              role="tablist"
              aria-label="System Chapters"
              className="flex items-center gap-2 bg-[#111419] p-1 rounded-lg border border-slate-200/10"
            >
              {CHAPTERS.map((ch, idx) => {
                const isCurrent = activeChapter === idx;
                return (
                  <button
                    key={ch.id}
                    role="tab"
                    type="button"
                    aria-selected={isCurrent}
                    onClick={() => jumpToChapter(idx as 0 | 1 | 2)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                      isCurrent
                        ? 'bg-[#C89D66] text-[#0B0D10] font-semibold'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                    }`}
                  >
                    {ch.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Synchronized Two-Column Pinned Stage */}
          <div className="grid grid-cols-12 gap-12 items-center my-auto py-2 flex-1 min-h-0">
            {/* Left Narrative Stage */}
            <div className="col-span-5 relative min-h-[340px] flex items-center">
              {CHAPTERS.map((ch, idx) => (
                <article
                  key={ch.id}
                  data-chapter-panel={ch.id}
                  className={`chapter-stage-panel ${
                    idx === 0 ? 'relative' : 'absolute inset-0 flex flex-col justify-center'
                  } space-y-5`}
                >
                  <h2 className="font-display text-[clamp(2rem,3vw,2.85rem)] leading-[1.1] font-normal text-[#F8FAFC]">
                    {ch.headline}
                  </h2>

                  <p className="text-[15px] leading-[1.68] text-[#94A3B8]">
                    {ch.body}
                  </p>

                  <dl className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/10">
                    {ch.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-[11px] text-[#64748B] mb-1">{m.label}</dt>
                        <dd className="font-mono-tabular text-sm font-medium text-[#F1F5F9]">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>

            {/* Right Visual Choreography Stage */}
            <div className="col-span-7 relative min-h-[380px] flex items-center">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`chapter-visual-panel w-full ${
                    idx === 0 ? 'relative' : 'absolute inset-0 flex items-center'
                  }`}
                >
                  {renderChapterVisual(idx as 0 | 1 | 2, chapterProgress)}
                </div>
              ))}
            </div>
          </div>

          {/* Quiet Chapter Scroll Progress Horizon */}
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-200/10 text-xs font-mono-tabular text-[#64748B] shrink-0">
            <span>
              Active Chapter: <strong className="text-[#F1F5F9] font-normal">{CHAPTERS[activeChapter].title}</strong>
            </span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>
    );
  }

  // Graceful Unpinned Mobile / Tablet / Reduced-Motion Sequential Spread
  return (
    <section
      id="system"
      className="py-20 sm:py-28 bg-[#0B0D10] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-20">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/10">
          <span className="text-xs font-mono-tabular text-[#94A3B8]">
            How it works
          </span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => jumpToChapter(idx as 0 | 1 | 2)}
                className="px-3 py-1.5 text-xs font-medium rounded bg-[#161A21] text-[#CBD5E1] border border-slate-200/10 whitespace-nowrap shrink-0"
              >
                {ch.title}
              </button>
            ))}
          </div>
        </div>

        {CHAPTERS.map((ch, idx) => (
          <article
            key={ch.id}
            id={`chapter-mobile-${ch.id}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16 last:pb-0 border-b last:border-b-0 border-slate-200/10"
          >
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-display text-3xl sm:text-4xl leading-[1.12] text-[#F8FAFC]">
                {ch.headline}
              </h2>
              <p className="text-[15px] leading-[1.68] text-[#94A3B8]">{ch.body}</p>
              <dl className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/10">
                {ch.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[11px] text-[#64748B] mb-0.5">{m.label}</dt>
                    <dd className="font-mono-tabular text-xs sm:text-sm font-medium text-[#F1F5F9]">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-7">{renderChapterVisual(idx as 0 | 1 | 2, 1)}</div>
          </article>
        ))}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/ProductConfigurator.tsx">
<![CDATA['use client';

import React, { useMemo, useState } from 'react';
import { Check, Copy, RotateCcw, Sun, ArrowDown } from 'lucide-react';
import {
  ARRANGEMENT_PATTERNS,
  ConfiguratorState,
  MATERIAL_FINISHES,
  TILE_SHAPES,
  TileShapeId,
  TessellatedTile,
  calculateAcousticMetrics,
  formatSpecificationSummary,
  generateWallTessellation,
  getMaterialSpec,
  getShapeSpec,
  rotateTileOrientation,
} from '../domain/tesseraSystem';
import { MagneticButton } from './InteractivePrimitives';
import { playTactileClick } from '../utils/acousticAudio';

interface ProductConfiguratorProps {
  config: ConfiguratorState;
  onChangeConfig: React.Dispatch<React.SetStateAction<ConfiguratorState>>;
  onResetConfig: () => void;
  onTransferToInquiry: (summaryText: string, areaSqM: number) => void;
}

/**
 * Renders an authentic raking-light architectural relief tile SVG for each of the 4 shapes.
 */
const SculptedTileGraphic: React.FC<{
  shape: TileShapeId;
  tile: TessellatedTile;
  primaryHex: string;
  highlightHex: string;
  shadowHex: string;
  accentHex: string;
  lightAngleDeg: number;
}> = ({
  shape,
  tile,
  primaryHex,
  highlightHex,
  shadowHex,
  accentHex,
  lightAngleDeg,
}) => {
  // Compute effective light vector relative to tile's rotation
  const effectiveAngleRad = ((lightAngleDeg - tile.rotation) * Math.PI) / 180;
  const lx = Math.cos(effectiveAngleRad);
  const ly = Math.sin(effectiveAngleRad);

  const upperLit = ly < 0.25;
  const leftLit = lx < 0;

  const faceTop = upperLit ? highlightHex : shadowHex;
  const faceBottom = upperLit ? shadowHex : highlightHex;
  const faceLeft = leftLit ? highlightHex : primaryHex;
  const faceRight = leftLit ? shadowHex : highlightHex;

  if (shape === 'fluted-ridge') {
    return (
      <svg
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${tile.rotation}deg)` }}
        className="w-full h-full transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <rect width="100" height="100" fill={shadowHex} />
        {[0, 1, 2, 3, 4].map((rib) => {
          const x = rib * 20;
          return (
            <g key={rib}>
              <rect x={x} y="0" width="9" height="100" fill={faceLeft} />
              <rect x={x + 9} y="0" width="7" height="100" fill={primaryHex} />
              <rect x={x + 16} y="0" width="4" height="100" fill={shadowHex} />
            </g>
          );
        })}
        {/* Subtle cross-baffle bronze cleat detail */}
        <circle cx="12" cy="12" r="2.6" fill={accentHex} />
        <circle cx="88" cy="88" r="2.6" fill={accentHex} opacity="0.6" />
      </svg>
    );
  }

  if (shape === 'beveled-prism') {
    const apexX = 64;
    const apexY = 38;
    return (
      <svg
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${tile.rotation}deg)` }}
        className="w-full h-full transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        {/* 4 oblique pyramid-prism facets meeting at asymmetric apex */}
        <polygon points={`0,0 100,0 ${apexX},${apexY}`} fill={faceTop} />
        <polygon points={`100,0 100,100 ${apexX},${apexY}`} fill={faceRight} />
        <polygon points={`100,100 0,100 ${apexX},${apexY}`} fill={faceBottom} />
        <polygon points={`0,100 0,0 ${apexX},${apexY}`} fill={faceLeft} />
        {/* Acoustic micro-slot channel along primary ridge */}
        <line
          x1="0"
          y1="100"
          x2={apexX}
          y2={apexY}
          stroke={accentHex}
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
        <circle cx={apexX} cy={apexY} r="2.4" fill={accentHex} />
      </svg>
    );
  }

  if (shape === 'parabolic-dish') {
    const gradId = `dish-${tile.key}-${Math.round(lightAngleDeg)}`;
    const cx = 50 - lx * 14;
    const cy = 50 - ly * 14;
    return (
      <svg
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${tile.rotation}deg)` }}
        className="w-full h-full transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={gradId} cx={`${cx}%`} cy={`${cy}%`} r="62%">
            <stop offset="0%" stopColor={shadowHex} />
            <stop offset="68%" stopColor={primaryHex} />
            <stop offset="100%" stopColor={highlightHex} />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={primaryHex} />
        <polygon points="0,0 100,0 88,12 12,12" fill={faceTop} opacity="0.65" />
        <polygon points="0,100 100,100 88,88 12,88" fill={faceBottom} opacity="0.65" />
        <circle
          cx="50"
          cy="50"
          r="37"
          fill={`url(#${gradId})`}
          stroke={accentHex}
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="50" r="11" fill={shadowHex} opacity="0.85" />
        <circle cx="50" cy="50" r="3" fill={accentHex} />
      </svg>
    );
  }

  // 'slotted-louver'
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${tile.rotation}deg)` }}
      className="w-full h-full transition-transform duration-300 ease-out"
      aria-hidden="true"
    >
      <rect width="100" height="100" fill={shadowHex} />
      {/* Solid beveled frame left + angled deep acoustic louvers right */}
      <polygon points="0,0 44,0 36,100 0,100" fill={faceLeft} />
      {[12, 32, 52, 72].map((yPos) => (
        <g key={yPos}>
          <polygon
            points={`42,${yPos} 96,${yPos - 4} 96,${yPos + 8} 40,${yPos + 12}`}
            fill={upperLit ? highlightHex : primaryHex}
          />
          <line
            x1="42"
            y1={yPos}
            x2="96"
            y2={yPos - 4}
            stroke={accentHex}
            strokeOpacity="0.45"
            strokeWidth="1"
          />
        </g>
      ))}
      <circle cx="14" cy="14" r="2.5" fill={accentHex} />
    </svg>
  );
};

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  config,
  onChangeConfig,
  onResetConfig,
  onTransferToInquiry,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSpecPreview, setShowSpecPreview] = useState(false);

  const tiles = useMemo(() => generateWallTessellation(config), [config]);
  const metrics = useMemo(() => calculateAcousticMetrics(config), [config]);
  const shapeSpec = getShapeSpec(config.shape);
  const materialSpec = getMaterialSpec(config.material);
  const specSummary = useMemo(
    () => formatSpecificationSummary(config, metrics),
    [config, metrics],
  );

  const handleTileClick = (tile: TessellatedTile) => {
    playTactileClick(320);
    const nextRot = rotateTileOrientation(tile.rotation);
    onChangeConfig((prev) => ({
      ...prev,
      customRotations: {
        ...prev.customRotations,
        [tile.key]: nextRot,
      },
    }));
  };

  const handleCopySpec = async () => {
    playTactileClick(290);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(specSummary);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = specSummary;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setShowSpecPreview(true);
    window.setTimeout(() => setCopied(false), 2800);
  };

  const customOverrideCount = Object.keys(config.customRotations).length;

  return (
    <section
      id="configurator"
      className="py-24 sm:py-32 bg-[#111419] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.25rem)] leading-[1.1] font-normal text-[#F8FAFC]">
              Design your wall.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playTactileClick(180);
                onResetConfig();
                setCopied(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-[#0B0D10] text-[#CBD5E1] border border-slate-200/15 hover:border-[#C89D66] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C89D66]" />
              <span>Reset</span>
            </button>

            <MagneticButton
              variant="primary"
              onClick={handleCopySpec}
              className="py-2 px-4 text-xs sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy specification</span>
                </>
              )}
            </MagneticButton>
          </div>
        </div>

        {/* Main Studio Grid: Left Live Sculptural Elevation Preview (7 cols) + Right Parameter Controls (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Elevation Wall Canvas & Acoustic Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-7 space-y-5">
              {/* Top Elevation Dimension & Raking Light Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/10">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
                  <span className="text-[#F1F5F9] font-medium">
                    {metrics.wallWidthMeters}m × {metrics.wallHeightMeters}m Elevation
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{metrics.tileCount} Modules</span>
                  {customOverrideCount > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#E2C399]">
                        {customOverrideCount} Rotated
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Sun className="w-3.5 h-3.5 text-[#C89D66]" aria-hidden="true" />
                  <label
                    htmlFor="raking-light-slider"
                    className="text-xs font-mono-tabular text-[#94A3B8] whitespace-nowrap"
                  >
                    Grazing Light: {config.lightAngleDeg}°
                  </label>
                  <input
                    id="raking-light-slider"
                    type="range"
                    min={15}
                    max={165}
                    value={config.lightAngleDeg}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({
                        ...prev,
                        lightAngleDeg: Number(e.target.value),
                      }))
                    }
                    className="arch-slider w-24"
                  />
                </div>
              </div>

              {/* Interactive Sculptural Tile Wall Matrix */}
              <div className="py-3 flex items-center justify-center min-h-[300px] sm:min-h-[360px]">
                <div
                  data-testid="configurator-wall-grid"
                  style={{
                    gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
                  }}
                  className="grid gap-1.5 sm:gap-2 w-full max-w-[600px] p-3 sm:p-4 rounded-lg bg-[#141820] border border-slate-200/15 shadow-2xl"
                >
                  {tiles.map((tile) => (
                    <button
                      key={tile.key}
                      type="button"
                      data-cursor="ROTATE 90°"
                      aria-label={`Tile column ${tile.col + 1} row ${tile.row + 1}, rotated ${tile.rotation} degrees. Click to rotate 90 degrees.`}
                      onClick={() => handleTileClick(tile)}
                      className="aspect-square w-full overflow-hidden rounded-[2px] border border-black/40 hover:border-[#C89D66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] transition-transform active:scale-95 cursor-pointer"
                    >
                      <SculptedTileGraphic
                        shape={config.shape}
                        tile={tile}
                        primaryHex={materialSpec.primaryHex}
                        highlightHex={materialSpec.highlightHex}
                        shadowHex={materialSpec.shadowHex}
                        accentHex={materialSpec.accentHex}
                        lightAngleDeg={config.lightAngleDeg}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8] pt-3 border-t border-slate-200/10">
                <span>
                  Click a tile to rotate it.
                </span>
                <button
                  type="button"
                  onClick={() => setShowSpecPreview((prev) => !prev)}
                  className="text-xs font-mono-tabular text-[#E2C399] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showSpecPreview ? 'Hide specification' : 'View specification'}
                </button>
              </div>

              {/* Live Copyable CSI Specification Text Output */}
              {showSpecPreview && (
                <pre
                  data-testid="csi-spec-output"
                  className="bg-[#111419] border border-[#C89D66]/35 rounded-lg p-4 text-xs font-mono-tabular text-[#E2E8F0] whitespace-pre-wrap leading-relaxed overflow-x-auto"
                >
                  {specSummary}
                </pre>
              )}
            </div>

            {/* Live Acoustic & Structural Performance Readout */}
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-[11px] text-[#64748B]">Sound absorption (NRC)</div>
                  <div
                    data-testid="metric-nrc"
                    className="font-mono-tabular text-2xl font-medium text-[#E2C399] mt-0.5"
                  >
                    {metrics.nrc.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#64748B]">Total Absorption</div>
                  <div
                    data-testid="metric-sabins"
                    className="font-mono-tabular text-2xl font-medium text-[#F8FAFC] mt-0.5"
                  >
                    {metrics.sabinsMetric} m²
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#64748B]">Reverberation</div>
                  <div className="font-mono-tabular text-lg sm:text-xl font-medium text-[#F8FAFC] mt-1">
                    {metrics.rt60UntreatedSec}s → {metrics.rt60TreatedSec}s
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#64748B]">Coverage &amp; Mass</div>
                  <div className="font-mono-tabular text-lg sm:text-xl font-medium text-[#F8FAFC] mt-1">
                    {metrics.wallAreaSqM} m² · {metrics.totalMassKg} kg
                  </div>
                </div>
              </div>

              {/* Live 6-Band Frequency Bar Strip */}
              <details className="pt-4 border-t border-slate-200/10">
                <summary className="mb-3 text-xs text-[#E2C399] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Acoustic details</summary>
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8] mb-2.5">
                  <span>Estimated absorption</span>
                  <span>-{metrics.rt60ReductionPercent}% Reverberation</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {metrics.frequencyAbsorption.map((band) => (
                    <div key={band.hz} className="space-y-1">
                      <div className="h-2 w-full bg-[#161A21] rounded-full overflow-hidden">
                        <div
                          style={{ width: `${Math.round(band.alpha * 100)}%` }}
                          className="h-full bg-[#C89D66] transition-all duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#94A3B8]">
                        <span>{band.hz >= 1000 ? `${band.hz / 1000}k` : band.hz}</span>
                        <span className="text-[#F1F5F9]">{band.alpha.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>

          {/* Right Configuration Controls Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-7 space-y-7">
            {/* Step 1: Tile Geometry */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  Shape
                </span>
                <span className="text-xs font-mono-tabular text-[#E2C399]">
                  {shapeSpec.depthMm} mm Relief
                </span>
              </div>
              <div
                role="radiogroup"
                aria-label="Select Tile Shape"
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                {TILE_SHAPES.map((shape) => {
                  const active = config.shape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        playTactileClick(240);
                        onChangeConfig((prev) => ({ ...prev, shape: shape.id }));
                      }}
                      className={`text-left p-3.5 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                        active
                          ? 'bg-[#161A21] border-[#C89D66] text-[#F8FAFC]'
                          : 'bg-[#111419] border-slate-200/10 text-[#94A3B8] hover:border-slate-200/30 hover:text-[#F1F5F9]'
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#F8FAFC]">
                        {shape.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Material Finish */}
            <div className="space-y-3 pt-5 border-t border-slate-200/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  Finish
                </span>
                <span className="text-xs font-medium text-[#F1F5F9]">
                  {materialSpec.name}
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Select Material Finish"
                className="grid grid-cols-5 gap-2.5"
              >
                {MATERIAL_FINISHES.map((mat) => {
                  const active = config.material === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={mat.name}
                      onClick={() => {
                        playTactileClick(260);
                        onChangeConfig((prev) => ({ ...prev, material: mat.id }));
                      }}
                      className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                        active
                          ? 'bg-[#161A21] border-[#C89D66]'
                          : 'bg-[#111419] border-slate-200/10 hover:border-slate-200/30'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          background: `radial-gradient(circle at 32% 30%, ${mat.highlightHex}, ${mat.primaryHex} 65%, ${mat.shadowHex})`,
                        }}
                        className="w-8 h-8 rounded-full border border-white/15"
                      />
                      <span className="text-[10px] text-center text-[#CBD5E1] truncate w-full">
                        {mat.name.split(' ')[1] || mat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Tessellation Pattern */}
            <div className="space-y-3 pt-5 border-t border-slate-200/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  Pattern
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Select Arrangement Pattern"
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                {ARRANGEMENT_PATTERNS.map((pat) => {
                  const active = config.pattern === pat.id;
                  return (
                    <button
                      key={pat.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        playTactileClick(275);
                        onChangeConfig((prev) => ({
                          ...prev,
                          pattern: pat.id,
                          customRotations: {},
                        }));
                      }}
                      className={`text-left p-3 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                        active
                          ? 'bg-[#161A21] border-[#C89D66] text-[#F8FAFC]'
                          : 'bg-[#111419] border-slate-200/10 text-[#94A3B8] hover:border-slate-200/30 hover:text-[#F1F5F9]'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                        {pat.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Elevation Matrix Dimensions */}
            <div className="space-y-4 pt-5 border-t border-slate-200/10">
              <span className="block text-xs font-mono-tabular text-[#94A3B8]">
                Wall size (600 mm tiles)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-tabular">
                    <label htmlFor="wall-cols-slider" className="text-[#CBD5E1]">
                      Columns
                    </label>
                    <span className="text-[#E2C399]">
                      {config.columns} ({metrics.wallWidthMeters}m)
                    </span>
                  </div>
                  <input
                    id="wall-cols-slider"
                    type="range"
                    min={4}
                    max={10}
                    value={config.columns}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({
                        ...prev,
                        columns: Number(e.target.value),
                      }))
                    }
                    className="arch-slider w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-tabular">
                    <label htmlFor="wall-rows-slider" className="text-[#CBD5E1]">
                      Rows
                    </label>
                    <span className="text-[#E2C399]">
                      {config.rows} ({metrics.wallHeightMeters}m)
                    </span>
                  </div>
                  <input
                    id="wall-rows-slider"
                    type="range"
                    min={3}
                    max={6}
                    value={config.rows}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({
                        ...prev,
                        rows: Number(e.target.value),
                      }))
                    }
                    className="arch-slider w-full"
                  />
                </div>
              </div>
            </div>

            {/* Action Footer inside Configurator */}
            <div className="pt-5 border-t border-slate-200/10 flex flex-col gap-2.5">
              <MagneticButton
                variant="primary"
                onClick={() => {
                  onTransferToInquiry(specSummary, metrics.wallAreaSqM);
                  document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full justify-center"
              >
                Attach Specification to Sample Dossier
                <ArrowDown className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/components/ProjectsSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import {
  ArrangementPatternId,
  MaterialFinishId,
  TileShapeId,
} from '../domain/tesseraSystem';
import {
  MagneticButton,
  ResilientImage,
  TiltSurface,
  usePrefersReducedMotion,
} from './InteractivePrimitives';

gsap.registerPlugin(ScrollTrigger);

const OSLO_IMG = '/templates/tessera/oslo_chamber_project_1794380181917.jpg';
const ZURICH_IMG = '/templates/tessera/zurich_kunsthalle_project_1794380183581.jpg';

interface CasePreset {
  shape: TileShapeId;
  material: MaterialFinishId;
  pattern: ArrangementPatternId;
}

interface ProjectsSectionProps {
  onLoadProjectPreset: (preset: CasePreset) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onLoadProjectPreset,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const spreads = gsap.utils.toArray<HTMLElement>('.project-editorial-spread');
      spreads.forEach((spread) => {
        gsap.fromTo(
          spread,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: spread,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const applyAndScroll = (preset: CasePreset) => {
    onLoadProjectPreset(preset);
    document
      .getElementById('configurator')
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0B0D10] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200/10">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.25rem)] leading-[1.1] font-normal text-[#F8FAFC]">
              See it in a space.
            </h2>
          </div>
          <p className="text-sm text-[#94A3B8]">Two concept interiors to explore.</p>
        </div>

        {/* Commission 01: Panoramic 16:9 Oslo Recital Hall */}
        <article className="project-editorial-spread grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7">
            <TiltSurface maxTiltDeg={3.5} cursorLabel="OSLO HALL" className="h-full">
              <div className="h-full rounded-xl overflow-hidden border border-slate-200/15 bg-[#111419]">
                <ResilientImage
                  src={OSLO_IMG}
                  alt="Oslo Fjord Chamber Recital Hall featuring floor-to-ceiling Tessera smoked walnut and Nordic sage modular wall relief"
                  className="w-full h-full object-cover min-h-[280px] lg:h-full"
                  fallbackTitle="Oslo Fjord Chamber Hall"
                />
              </div>
            </TiltSurface>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-[#111419] border border-slate-200/10 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
                <span>Oslo, Norway</span>
              </div>

              <h3 className="font-display text-3xl text-[#F8FAFC] leading-tight">
                Oslo Fjord Chamber Recital Hall
              </h3>

              <p className="text-sm leading-[1.7] text-[#94A3B8]">
                Walnut and sage panels bring warmth and acoustic relief to a recital hall.
              </p>

            </div>

            <div>
              <MagneticButton
                variant="secondary"
                onClick={() =>
                  applyAndScroll({
                    shape: 'beveled-prism',
                    material: 'nordic-sage',
                    pattern: 'harmonic-wave',
                  })
                }
                className="w-full sm:w-auto"
              >
                Try this palette
                <ArrowUpRight className="w-4 h-4 text-[#C89D66]" />
              </MagneticButton>
            </div>
          </div>
        </article>

        {/* Commission 02: Reversed Asymmetric Zurich Kunsthalle Spread */}
        <article className="project-editorial-spread grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between bg-[#111419] border border-slate-200/10 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
                <span>Zürich, Switzerland</span>
              </div>

              <h3 className="font-display text-3xl text-[#F8FAFC] leading-tight">
                Kunsthalle Zürich Reception Foyer
              </h3>

              <p className="text-sm leading-[1.7] text-[#94A3B8]">
                Charcoal felt and bronze relief soften a concrete gallery foyer.
              </p>

            </div>

            <div>
              <MagneticButton
                variant="secondary"
                onClick={() =>
                  applyAndScroll({
                    shape: 'parabolic-dish',
                    material: 'charcoal-felt',
                    pattern: 'radial-aperture',
                  })
                }
                className="w-full sm:w-auto"
              >
                Try this palette
                <ArrowUpRight className="w-4 h-4 text-[#C89D66]" />
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <TiltSurface maxTiltDeg={3.5} cursorLabel="ZÜRICH FOYER" className="h-full">
              <div className="h-full rounded-xl overflow-hidden border border-slate-200/15 bg-[#111419]">
                <ResilientImage
                  src={ZURICH_IMG}
                  alt="Kunsthalle Zürich concrete reception atrium featuring a monumental charcoal felt and brushed bronze Tessera geometric wall installation"
                  className="w-full h-full object-cover min-h-[280px] lg:h-full"
                  fallbackTitle="Kunsthalle Zürich Reception Wall"
                />
              </div>
            </TiltSurface>
          </div>
        </article>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(tessera)/tessera/domain/resonanceWall.ts">
<![CDATA[import { HeroCompositionId, MaterialFinishId, TileRotation } from './tesseraSystem';

export type ModuleFamilyId =
  | 's-ribbon'
  | 'convex'
  | 'concave'
  | 'fluted-v'
  | 'fluted-h'
  | 'folded'
  | 'crescent'
  | 'recess'
  | 'slit';

export type HeroMaterialModeId = 'ivory-plaster' | 'charcoal-felt' | 'pale-oak';

export type TileQuarterTurns = 0 | 1 | 2 | 3;

export type TileSurfaceRole = 'primary' | 'felt-accent' | 'oak-accent' | 'warm-stone';

export interface HeroMaterialModeSpec {
  id: HeroMaterialModeId;
  code: string;
  label: string;
  shortLabel: string;
  linkedConfiguratorMaterial: MaterialFinishId;
  description: string;
}

export interface ResonanceTileSpec {
  id: string; // e.g. "r02-c05"
  displayCode: string; // e.g. "03·06" (1-based row·col)
  row: number;
  col: number;
  family: ModuleFamilyId;
  familyLabel: string;
  surfaceRole: TileSurfaceRole;
  hasBrassPin: boolean;
  sCurveProximity: number; // 0..1 (1 = directly on the primary S-curve)
  entranceDelayOrder: number; // 0..1 travel order along the resonance path
}

export type PresetRotationMap = Record<HeroCompositionId, Record<string, TileQuarterTurns>>;

export const RESONANCE_COLS = 11;
export const RESONANCE_ROWS = 6;
export const RESONANCE_TILE_PITCH = 0.92;
export const RESONANCE_TILE_SIZE = 0.908; // Crisp 12mm hairline architectural shadow joint

export const HERO_MATERIAL_MODES: HeroMaterialModeSpec[] = [
  {
    id: 'ivory-plaster',
    code: '01',
    label: '01 IVORY PLASTER',
    shortLabel: 'Ivory Plaster',
    linkedConfiguratorMaterial: 'raw-limestone',
    description: 'Hand-cast sintered mineral plaster with charcoal felt and pale oak acoustic reveals.',
  },
  {
    id: 'charcoal-felt',
    code: '02',
    label: '02 CHARCOAL FELT',
    shortLabel: 'Charcoal Felt',
    linkedConfiguratorMaterial: 'charcoal-felt',
    description: 'Deep graphite merino-PET acoustic felt array with mineral and timber counterpoints.',
  },
  {
    id: 'pale-oak',
    code: '03',
    label: '03 PALE OAK',
    shortLabel: 'Pale Oak',
    linkedConfiguratorMaterial: 'smoked-walnut',
    description: 'Quarter-sawn longitudinal European pale oak ribs paired with dark felt absorption chambers.',
  },
];

export const FAMILY_LABELS: Record<ModuleFamilyId, string> = {
  's-ribbon': 'Harmonic S-Curve Ribbon',
  convex: 'Convex Acoustic Cushion',
  concave: 'Concave Phase Bowl',
  'fluted-v': 'Vertical Fluted Resonator',
  'fluted-h': 'Horizontal Fluted Baffle',
  folded: 'Folded Crease Diffuser',
  crescent: 'Crescent Arc Relief',
  recess: 'Stepped Felt Cavity',
  slit: 'Layered Oak & Felt Aperture',
};

export function createInitialPresetRotationMap(): PresetRotationMap {
  return {
    wave: {},
    vault: {},
    aperture: {},
    tectonic: {},
  };
}

export function formatTileId(row: number, col: number): string {
  return `r${String(row).padStart(2, '0')}-c${String(col).padStart(2, '0')}`;
}

export function formatTileDisplayCode(row: number, col: number): string {
  return `${String(row + 1).padStart(2, '0')}·${String(col + 1).padStart(2, '0')}`;
}

/**
 * Evaluates the master S-curve centerline y(x) and slope dy/dx in normalized wall space:
 * u in [-1, 1] (left to right), v in [-1, 1] (bottom to top).
 * Matches 01_APPROVED_RESONANCE_WALL_HERO.png:
 * Enters at mid-left (u=-1, v=-0.02), sweeps down to a deep trough at lower-center (u=-0.08, v=-0.56),
 * and rises in a bold sweeping arc to upper-right (u=+0.85, v=+0.78).
 */
export function evaluateSCurveCenterline(u: number): { v: number; dvdu: number } {
  const dip = -0.58 * Math.exp(-Math.pow((u + 0.12) / 0.38, 2));
  const rise = 0.86 / (1 + Math.exp(-4.8 * (u - 0.22))) - 0.18;
  const leftArch = 0.18 * Math.exp(-Math.pow((u + 0.72) / 0.32, 2));
  const v = dip + rise + leftArch;

  const eps = 0.002;
  const u1 = u + eps;
  const dip1 = -0.58 * Math.exp(-Math.pow((u1 + 0.12) / 0.38, 2));
  const rise1 = 0.86 / (1 + Math.exp(-4.8 * (u1 - 0.22))) - 0.18;
  const leftArch1 = 0.18 * Math.exp(-Math.pow((u1 + 0.72) / 0.32, 2));
  const dvdu = (dip1 + rise1 + leftArch1 - v) / eps;

  return { v, dvdu };
}

/**
 * Computes global S-curve signed perpendicular distance and multi-ridge displacement
 * at any normalized wall coordinate (u, v) in [-1, 1] x [-1, 1].
 * Adjacent tiles at 0° align seamlessly across panel seams to form one continuous sculptural S-ribbon.
 */
export function sampleGlobalSCurveRelief(
  u: number,
  v: number,
  phaseShift = 0,
): {
  perpDist: number;
  proximity: number;
  displacement: number;
  grooves: number;
} {
  const { v: curveV, dvdu } = evaluateSCurveCenterline(u);
  const deltaV = v - curveV;
  const normFactor = 1 / Math.hypot(1, dvdu * 0.56);
  const perpDist = deltaV * normFactor;

  const ribbonHalfWidth = 0.34;
  const absDist = Math.abs(perpDist);
  if (absDist >= ribbonHalfWidth) {
    return { perpDist, proximity: 0, displacement: 0, grooves: 0 };
  }

  const normalized = absDist / ribbonHalfWidth; // 0..1
  const envelope = Math.pow(Math.cos(normalized * Math.PI * 0.5), 1.45);
  // 4 crisp terraced architectural ribs along the S-curve ribbon
  const fluteWave = Math.cos(perpDist * 54 + phaseShift);
  const sharpenedWave = Math.sign(fluteWave) * Math.pow(Math.abs(fluteWave), 0.58);
  const primarySwell = envelope * 0.15;
  const carvedChannels = envelope * sharpenedWave * 0.095;

  return {
    perpDist,
    proximity: envelope,
    displacement: primarySwell + carvedChannels,
    grooves: (sharpenedWave * 0.5 + 0.5) * envelope,
  };
}

/**
 * Deterministically assigns each tile in the 11x6 wall to one of the 8+ sculptural families
 * and surface roles, closely matching the curated rhythm of 01_APPROVED_RESONANCE_WALL_HERO.png.
 */
export function buildResonanceWallCatalog(
  cols = RESONANCE_COLS,
  rows = RESONANCE_ROWS,
): ResonanceTileSpec[] {
  const specs: ResonanceTileSpec[] = [];

  // Curated dark charcoal felt accent positions (row, col) where row 0 is bottom, row 5 is top
  const feltPositions = new Set([
    '0-2', '0-6', '0-9',
    '1-1', '1-8',
    '2-3', '2-7', '2-9',
    '3-1', '3-3', '3-8',
    '4-2', '4-6', '4-9',
    '5-2', '5-6',
  ]);

  // Curated pale oak accent positions
  const oakPositions = new Set([
    '0-7', '1-7', '1-10',
    '2-8', '2-10',
    '4-4', '4-10',
    '5-4',
  ]);

  const warmStonePositions = new Set([
    '0-3', '0-8', '1-0', '2-1', '3-0', '4-1', '5-3', '5-7', '5-8',
  ]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const id = formatTileId(row, col);
      const displayCode = formatTileDisplayCode(row, col);
      const u = cols > 1 ? (col / (cols - 1)) * 2 - 1 : 0;
      const v = rows > 1 ? (row / (rows - 1)) * 2 - 1 : 0;

      const sCurve = sampleGlobalSCurveRelief(u, v);
      const key = `${row}-${col}`;

      let surfaceRole: TileSurfaceRole = 'primary';
      let family: ModuleFamilyId;

      if (sCurve.proximity > 0.14) {
        // Tiles along the primary S-curve stay Ivory Mineral Plaster so the multi-panel S-ribbon is continuous
        surfaceRole = 'primary';
        family = 's-ribbon';
      } else if (feltPositions.has(key)) {
        surfaceRole = 'felt-accent';
        const mod = (row + col) % 3;
        family = mod === 0 ? 'concave' : mod === 1 ? 'convex' : 'recess';
      } else if (oakPositions.has(key)) {
        surfaceRole = 'oak-accent';
        family = (row + col) % 2 === 0 ? 'slit' : 'crescent';
      } else {
        if (warmStonePositions.has(key)) {
          surfaceRole = 'warm-stone';
        }
        const patternSelect = (col * 3 + row * 5) % 6;
        if (patternSelect === 0) family = 'fluted-v';
        else if (patternSelect === 1) family = 'fluted-h';
        else if (patternSelect === 2) family = 'convex';
        else if (patternSelect === 3) family = 'concave';
        else if (patternSelect === 4) family = 'folded';
        else family = 'crescent';
      }

      const hasBrassPin =
        sCurve.proximity > 0.36 ||
        surfaceRole === 'felt-accent' ||
        (row + col) % 5 === 0;

      // Wave travel order along the S-curve path from lower-left to upper-right
      const pathProgress = (u + 1) * 0.35 + (v + 1) * 0.15 + (1 - sCurve.proximity) * 0.25;
      const entranceDelayOrder = Number(Math.max(0, Math.min(1, pathProgress)).toFixed(3));

      specs.push({
        id,
        displayCode,
        row,
        col,
        family,
        familyLabel: FAMILY_LABELS[family],
        surfaceRole,
        hasBrassPin,
        sCurveProximity: Number(sCurve.proximity.toFixed(3)),
        entranceDelayOrder,
      });
    }
  }

  return specs;
}

/**
 * Pure helper to rotate a tile's quarter-turn state clockwise (+1) or counter-clockwise (-1).
 */
export function rotateTileQuarterTurns(
  current: TileQuarterTurns,
  deltaQuarterTurns: 1 | -1 = 1,
): TileQuarterTurns {
  const next = (((current + deltaQuarterTurns) % 4) + 4) % 4;
  return next as TileQuarterTurns;
}

export function quarterTurnsToDegrees(turns: TileQuarterTurns): TileRotation {
  return ((turns * 90) % 360) as TileRotation;
}

/**
 * Snaps an arbitrary drag angle in radians to the nearest 90° quarter-turn state (0, 1, 2, 3).
 * Note: Clockwise rotation viewed from front corresponds to negative Z angle in right-handed Three.js space,
 * so we pass clockwise-positive radians into this helper.
 */
export function snapClockwiseAngleToQuarterTurns(clockwiseRadians: number): TileQuarterTurns {
  const quarterStep = Math.PI * 0.5;
  const rawSteps = Math.round(clockwiseRadians / quarterStep);
  const mod = ((rawSteps % 4) + 4) % 4;
  return mod as TileQuarterTurns;
}

export function getTileQuarterTurns(
  store: PresetRotationMap,
  preset: HeroCompositionId,
  tileId: string,
): TileQuarterTurns {
  return store[preset]?.[tileId] ?? 0;
}

export function setTileQuarterTurnsInPreset(
  store: PresetRotationMap,
  preset: HeroCompositionId,
  tileId: string,
  turns: TileQuarterTurns,
): PresetRotationMap {
  const currentPresetMap = { ...(store[preset] ?? {}) };
  if (turns === 0) {
    delete currentPresetMap[tileId];
  } else {
    currentPresetMap[tileId] = turns;
  }
  return {
    ...store,
    [preset]: currentPresetMap,
  };
}

export function resetPresetRotations(
  store: PresetRotationMap,
  preset: HeroCompositionId,
): PresetRotationMap {
  return {
    ...store,
    [preset]: {},
  };
}

export interface PresetBaseTransform {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  presetRotZ: number;
  scaleZ: number;
}

/**
 * Computes the base structural transform for a tile in a given preset, scroll progress,
 * entrance wave progress, and subtle pointer pressure field.
 * User tile rotation is intentionally kept separate so it never gets overwritten.
 */
export function computeResonanceTileBaseTransform(
  spec: ResonanceTileSpec,
  cols: number,
  rows: number,
  preset: HeroCompositionId,
  pointerWallX: number, // normalized -1..1
  pointerWallY: number, // normalized -1..1
  pointerActive: boolean,
  scrollProgress: number, // 0..1
  entranceProgress: number, // 0..1 (1 = settled)
  elapsedSec: number,
): PresetBaseTransform {
  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const nx = cols > 1 ? (spec.col - centerX) / centerX : 0; // -1..1
  const ny = rows > 1 ? (spec.row - centerY) / centerY : 0; // -1..1
  const radialDist = Math.hypot(nx, ny);

  const baseX = (spec.col - centerX) * RESONANCE_TILE_PITCH;
  const baseY = (spec.row - centerY) * RESONANCE_TILE_PITCH;

  let z = 0;
  let rotX = 0;
  let rotY = 0;
  let presetRotZ = 0;
  let scaleZ = 1;

  // Extremely subtle architectural breathing (sub-millimeter feel)
  const idleBreath = Math.sin(elapsedSec * 0.7 + spec.col * 0.4 + spec.row * 0.35) * 0.008;

  switch (preset) {
    case 'wave': {
      // Approved Resonance Wall S-curve relief: tiles stay orthogonal in grid so global S-curve connects seamlessly
      const sCurveOffset = spec.sCurveProximity * 0.085;
      const recessOffset =
        spec.surfaceRole === 'felt-accent'
          ? -0.055
          : spec.surfaceRole === 'oak-accent'
            ? -0.025
            : 0.015;
      z = sCurveOffset + recessOffset + idleBreath;
      rotX = 0;
      rotY = 0;
      presetRotZ = 0;
      scaleZ = 1 + spec.sCurveProximity * 0.18;
      break;
    }
    case 'vault': {
      // Parabolic architectural vault canting inward toward central axis
      const arch = 1 - Math.min(1, nx * nx * 0.92);
      z = arch * 0.34 - Math.abs(ny) * 0.09 + idleBreath;
      rotY = -nx * 0.28;
      rotX = ny * 0.14;
      presetRotZ = spec.col % 2 === 0 ? 0 : Math.PI;
      scaleZ = 0.92 + arch * 0.35;
      break;
    }
    case 'aperture': {
      // Radial acoustic lens around the central chamber focus
      const ring = Math.cos(radialDist * Math.PI * 1.25);
      z = ring * 0.22 + (1 - Math.min(1.2, radialDist)) * 0.18 + idleBreath;
      rotX = -ny * 0.22 * ring;
      rotY = nx * 0.22 * ring;
      const steps = Math.round(((Math.atan2(ny, nx) + Math.PI) / (Math.PI * 2)) * 4) % 4;
      presetRotZ = steps * (Math.PI * 0.5);
      scaleZ = 0.9 + Math.max(0, 1 - radialDist * 0.5) * 0.38;
      break;
    }
    case 'tectonic': {
      // Stepped orthogonal acoustic checker relief
      const checker = (spec.col + spec.row) % 2 === 0 ? 1 : -1;
      const band = ((spec.col * 3 + spec.row * 2) % 4) / 3;
      z = checker * 0.09 + band * 0.14 + idleBreath;
      rotX = checker * 0.08;
      rotY = -checker * 0.1;
      presetRotZ = ((spec.col + spec.row) % 4) * (Math.PI * 0.5);
      scaleZ = 0.88 + band * 0.35;
      break;
    }
  }

  // Entrance wave choreography along the global resonance path
  if (entranceProgress < 1) {
    const localStart = spec.entranceDelayOrder * 0.45;
    const localProgress = Math.max(
      0,
      Math.min(1, (entranceProgress - localStart) / Math.max(0.2, 1 - localStart)),
    );
    // Smooth cubic ease-out with subtle traveling wave crest
    const ease = 1 - Math.pow(1 - localProgress, 3);
    const waveCrest = Math.sin(localProgress * Math.PI) * 0.12 * (1 - localProgress);
    z = (z - 0.08 * (1 - ease)) + waveCrest;
    rotX += (1 - ease) * 0.12;
    rotY -= (1 - ease) * 0.1;
  }

  // Subtle low-frequency elastic pressure field under pointer (does not spin tiles or break picking)
  if (pointerActive) {
    const dx = nx - pointerWallX;
    const dy = ny - pointerWallY;
    const dist = Math.hypot(dx, dy);
    const falloff = Math.max(0, 1 - dist / 0.55);
    const smoothFalloff = falloff * falloff * (3 - 2 * falloff);
    z += smoothFalloff * 0.045;
    rotY += dx * smoothFalloff * 0.06;
    rotX -= dy * smoothFalloff * 0.06;
  }

  // Scroll-driven harmonic phase progression (0.00-0.15 hold, 0.15-0.42 thickness, 0.42-0.72 harmonic wave, 0.72-0.90 resolution, 0.90-1.00 hold)
  const s = Math.max(0, Math.min(1, scrollProgress));
  if (s > 0.15) {
    const activeScroll = Math.min(1, (s - 0.15) / 0.75); // 0..1 across [0.15..0.90], holds 0.90..1.00
    const harmonicPhase = Math.sin(nx * Math.PI * 1.4 - ny * Math.PI * 0.9 + activeScroll * Math.PI);
    z += activeScroll * 0.09 * harmonicPhase + activeScroll * spec.sCurveProximity * 0.06;
    scaleZ += activeScroll * 0.14 * spec.sCurveProximity;
  }

  return {
    x: baseX,
    y: baseY,
    z,
    rotX,
    rotY,
    presetRotZ,
    scaleZ,
  };
}
]]>
    </file>
    <file path="src/app/(tessera)/tessera/domain/tesseraSystem.ts">
<![CDATA[export type TileShapeId =
  | 'fluted-ridge'
  | 'beveled-prism'
  | 'parabolic-dish'
  | 'slotted-louver';

export type MaterialFinishId =
  | 'raw-limestone'
  | 'charcoal-felt'
  | 'smoked-walnut'
  | 'anodized-bronze'
  | 'nordic-sage';

export type ArrangementPatternId =
  | 'harmonic-wave'
  | 'herringbone'
  | 'radial-aperture'
  | 'acoustic-gradient';

export type HeroCompositionId = 'wave' | 'vault' | 'aperture' | 'tectonic';

export type TileRotation = 0 | 90 | 180 | 270;

export interface TileShapeSpec {
  id: TileShapeId;
  name: string;
  subtitle: string;
  depthMm: number;
  baseNrc: number;
  diffusionIndex: number;
  frequencyCurve: [number, number, number, number, number, number]; // 125, 250, 500, 1000, 2000, 4000 Hz
  description: string;
}

export interface MaterialFinishSpec {
  id: MaterialFinishId;
  name: string;
  origin: string;
  primaryHex: string;
  highlightHex: string;
  shadowHex: string;
  accentHex: string;
  nrcModifier: number;
  massPerTileKg: number;
  roughness: number;
  metalness: number;
  description: string;
}

export interface ArrangementPatternSpec {
  id: ArrangementPatternId;
  name: string;
  architecturalIntent: string;
  scatterBonus: number;
}

export interface HeroCompositionSpec {
  id: HeroCompositionId;
  label: string;
  summary: string;
  nrcRating: string;
}

export interface ConfiguratorState {
  shape: TileShapeId;
  material: MaterialFinishId;
  pattern: ArrangementPatternId;
  columns: number;
  rows: number;
  lightAngleDeg: number;
  customRotations: Record<string, TileRotation>;
}

export interface TessellatedTile {
  key: string;
  col: number;
  row: number;
  rotation: TileRotation;
  reliefDepth: number; // 0.25 .. 1.0
  secondaryTone: boolean;
}

export interface AcousticMetrics {
  tileCount: number;
  wallWidthMeters: number;
  wallHeightMeters: number;
  wallAreaSqM: number;
  nrc: number;
  sabinsMetric: number;
  rt60UntreatedSec: number;
  rt60TreatedSec: number;
  rt60ReductionPercent: number;
  totalMassKg: number;
  cleatCount: number;
  frequencyAbsorption: {
    hz: number;
    alpha: number;
  }[];
}

export interface InquiryFormInput {
  architectName: string;
  firmOrStudio: string;
  workEmail: string;
  projectTypology: string;
  targetAreaSqM: string;
  notes: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export const FREQUENCY_BANDS_HZ = [125, 250, 500, 1000, 2000, 4000] as const;

export const TILE_SHAPES: TileShapeSpec[] = [
  {
    id: 'fluted-ridge',
    name: 'Fluted Ridge',
    subtitle: 'Linear Helmholtz Micro-Channels',
    depthMm: 58,
    baseNrc: 0.92,
    diffusionIndex: 0.84,
    frequencyCurve: [0.48, 0.78, 0.94, 0.98, 0.95, 0.89],
    description:
      'Seven precision-milled parallel ridges channel mid-to-high vocal frequencies into a damped recycled-PET backing plenum.',
  },
  {
    id: 'beveled-prism',
    name: 'Beveled Prism',
    subtitle: 'Asymmetric Tri-Facet Diffuser',
    depthMm: 74,
    baseNrc: 0.89,
    diffusionIndex: 0.96,
    frequencyCurve: [0.54, 0.76, 0.88, 0.93, 0.94, 0.91],
    description:
      'Oblique 22-degree planes fracture standing flutter echoes across parallel concrete and glazed atrium walls.',
  },
  {
    id: 'parabolic-dish',
    name: 'Parabolic Dish',
    subtitle: 'Concave Acoustic Phase Trap',
    depthMm: 64,
    baseNrc: 0.95,
    diffusionIndex: 0.88,
    frequencyCurve: [0.62, 0.85, 0.96, 0.99, 0.94, 0.88],
    description:
      'A carved spherical aperture paired with a perimeter shadow reveal captures low-mid resonance in recital rooms.',
  },
  {
    id: 'slotted-louver',
    name: 'Slotted Louver',
    subtitle: 'Deep Baffle Resonator Array',
    depthMm: 82,
    baseNrc: 0.94,
    diffusionIndex: 0.91,
    frequencyCurve: [0.66, 0.84, 0.95, 0.96, 0.93, 0.87],
    description:
      'Angled architectural blades expose deep mineral-wool cavities for broadband attenuation in high-ceiling transit and gallery halls.',
  },
];

export const MATERIAL_FINISHES: MaterialFinishSpec[] = [
  {
    id: 'raw-limestone',
    name: 'Raw Limestone',
    origin: 'Sintered mineral',
    primaryHex: '#C9C4BA',
    highlightHex: '#E5E1D8',
    shadowHex: '#7A756C',
    accentHex: '#C89D66',
    nrcModifier: -0.02,
    massPerTileKg: 3.4,
    roughness: 0.82,
    metalness: 0.05,
    description:
      'A textured mineral finish with a natural stone appearance.',
  },
  {
    id: 'charcoal-felt',
    name: 'Charcoal Felt',
    origin: 'Wool and recycled PET',
    primaryHex: '#2A2F37',
    highlightHex: '#464E5B',
    shadowHex: '#14171C',
    accentHex: '#C89D66',
    nrcModifier: 0.03,
    massPerTileKg: 1.8,
    roughness: 0.92,
    metalness: 0.02,
    description:
      'Soft wool-blend felt for a muted, sound-absorbing surface.',
  },
  {
    id: 'smoked-walnut',
    name: 'Smoked Walnut',
    origin: 'Smoked timber veneer',
    primaryHex: '#6E4E3A',
    highlightHex: '#966E54',
    shadowHex: '#3B281D',
    accentHex: '#D4AA72',
    nrcModifier: 0.0,
    massPerTileKg: 2.5,
    roughness: 0.58,
    metalness: 0.08,
    description:
      'Warm walnut veneer over an acoustic backing.',
  },
  {
    id: 'anodized-bronze',
    name: 'Anodized Bronze',
    origin: 'Perforated aluminum',
    primaryHex: '#9A7853',
    highlightHex: '#C8A378',
    shadowHex: '#4F3C28',
    accentHex: '#E5C396',
    nrcModifier: -0.03,
    massPerTileKg: 2.9,
    roughness: 0.34,
    metalness: 0.76,
    description:
      'A brushed metallic finish with an acoustic backing.',
  },
  {
    id: 'nordic-sage',
    name: 'Nordic Sage',
    origin: 'Dyed wool felt',
    primaryHex: '#687A71',
    highlightHex: '#8BA095',
    shadowHex: '#39453F',
    accentHex: '#C89D66',
    nrcModifier: 0.02,
    massPerTileKg: 1.9,
    roughness: 0.88,
    metalness: 0.03,
    description:
      'Sage-green wool felt for a softer, natural palette.',
  },
];

export const ARRANGEMENT_PATTERNS: ArrangementPatternSpec[] = [
  {
    id: 'harmonic-wave',
    name: 'Harmonic Wave',
    architecturalIntent: 'Continuous sinusoidal phase progression across wide elevations',
    scatterBonus: 0.02,
  },
  {
    id: 'herringbone',
    name: 'Herringbone',
    architecturalIntent: 'Alternating orthogonal 90° weave fracturing lateral reflections',
    scatterBonus: 0.03,
  },
  {
    id: 'radial-aperture',
    name: 'Radial Aperture',
    architecturalIntent: 'Concentric focal relief centered on speaking or performance zones',
    scatterBonus: 0.025,
  },
  {
    id: 'acoustic-gradient',
    name: 'Acoustic Gradient',
    architecturalIntent: 'Progressive bottom-to-top density transition for tall atriums',
    scatterBonus: 0.015,
  },
];

export const HERO_COMPOSITIONS: HeroCompositionSpec[] = [
  {
    id: 'wave',
    label: 'Harmonic Wave',
    summary: 'Sinusoidal phase array tuned for 500–2000 Hz speech clarity.',
    nrcRating: '0.95 NRC',
  },
  {
    id: 'vault',
    label: 'Cathedral Vault',
    summary: 'Parabolic canted relief directing ceiling reflections inward.',
    nrcRating: '0.92 NRC',
  },
  {
    id: 'aperture',
    label: 'Radial Aperture',
    summary: 'Concentric acoustic lens dispersing axial room modes.',
    nrcRating: '0.96 NRC',
  },
  {
    id: 'tectonic',
    label: 'Tectonic Grid',
    summary: 'Alternating orthogonal facets for omnidirectional scattering.',
    nrcRating: '0.94 NRC',
  },
];

export const DEFAULT_CONFIGURATOR_STATE: ConfiguratorState = {
  shape: 'beveled-prism',
  material: 'raw-limestone',
  pattern: 'harmonic-wave',
  columns: 7,
  rows: 4,
  lightAngleDeg: 42,
  customRotations: {},
};

export function getShapeSpec(id: TileShapeId): TileShapeSpec {
  return TILE_SHAPES.find((s) => s.id === id) ?? TILE_SHAPES[0];
}

export function getMaterialSpec(id: MaterialFinishId): MaterialFinishSpec {
  return MATERIAL_FINISHES.find((m) => m.id === id) ?? MATERIAL_FINISHES[0];
}

export function getPatternSpec(id: ArrangementPatternId): ArrangementPatternSpec {
  return ARRANGEMENT_PATTERNS.find((p) => p.id === id) ?? ARRANGEMENT_PATTERNS[0];
}

export interface HeroTileTransform {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleZ: number;
  toneMix: number;
}

/**
 * Pure mathematical layout solver for the procedural 3D hero tile matrix.
 */
export function computeHeroTileTransform(
  col: number,
  row: number,
  cols: number,
  rows: number,
  composition: HeroCompositionId,
  pointerX: number, // -1 .. 1
  pointerY: number, // -1 .. 1
  scrollProgress: number, // 0 .. 1
  elapsedSec: number,
): HeroTileTransform {
  const spacing = 1.06;
  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const nx = (col - centerX) / Math.max(1, centerX); // -1 .. 1
  const ny = (row - centerY) / Math.max(1, centerY); // -1 .. 1
  const radialDist = Math.hypot(nx, ny);

  const baseX = (col - centerX) * spacing;
  const baseY = (row - centerY) * spacing;

  let z = 0;
  let rotX = 0;
  let rotY = 0;
  let rotZ = 0;
  let scaleZ = 1;
  let toneMix = 0;

  const breath = Math.sin(elapsedSec * 0.85 + col * 0.45 + row * 0.35) * 0.035;

  switch (composition) {
    case 'wave': {
      const phase = col * 0.62 - row * 0.44 + elapsedSec * 0.55;
      z = Math.sin(phase) * 0.32 + breath;
      rotY = Math.cos(phase) * 0.28;
      rotX = Math.sin(row * 0.7 + elapsedSec * 0.4) * 0.14;
      rotZ = ((col + row) % 2 === 0 ? 0 : Math.PI * 0.5);
      scaleZ = 0.85 + (Math.sin(phase) + 1) * 0.28;
      toneMix = (Math.sin(col * 0.7 + row * 0.4) + 1) * 0.5;
      break;
    }
    case 'vault': {
      const arch = 1 - Math.min(1, nx * nx * 0.95);
      z = arch * 0.56 - Math.abs(ny) * 0.14 + breath;
      rotY = -nx * 0.48;
      rotX = ny * 0.22;
      rotZ = col % 2 === 0 ? 0 : Math.PI;
      scaleZ = 0.75 + arch * 0.55;
      toneMix = arch;
      break;
    }
    case 'aperture': {
      const ring = Math.cos(radialDist * Math.PI * 1.35 - elapsedSec * 0.5);
      z = ring * 0.36 + (1 - Math.min(1.2, radialDist)) * 0.22;
      rotX = -ny * 0.38 * ring;
      rotY = nx * 0.38 * ring;
      const angleSteps = Math.round(((Math.atan2(ny, nx) + Math.PI) / (Math.PI * 2)) * 4) % 4;
      rotZ = angleSteps * (Math.PI * 0.5);
      scaleZ = 0.8 + Math.max(0, 1 - radialDist * 0.65) * 0.6;
      toneMix = Math.max(0, Math.min(1, 1 - radialDist * 0.75));
      break;
    }
    case 'tectonic': {
      const checker = (col + row) % 2 === 0 ? 1 : -1;
      const band = ((col * 3 + row * 2) % 4) / 3;
      z = checker * 0.18 + band * 0.22 + breath * 0.5;
      rotX = checker * 0.18;
      rotY = -checker * 0.22;
      rotZ = ((col * 2 + row) % 4) * (Math.PI * 0.5);
      scaleZ = 0.8 + band * 0.55;
      toneMix = band;
      break;
    }
  }

  // Subtle pointer proximity influence
  const dx = nx - pointerX;
  const dy = ny - pointerY;
  const pointerDist = Math.hypot(dx, dy);
  const influence = Math.max(0, 1 - pointerDist / 0.85);
  z += influence * 0.26;
  rotY += dx * influence * 0.24;
  rotX -= dy * influence * 0.24;

  // Scroll-driven sculptural expansion (gentle architectural separation)
  const clampedScroll = Math.max(0, Math.min(1, scrollProgress));
  const spread = 1 + clampedScroll * 0.22;
  const scrollLift = clampedScroll * (0.45 * (1 - radialDist * 0.6));

  return {
    x: baseX * spread,
    y: baseY * spread,
    z: z + scrollLift,
    rotX: rotX + clampedScroll * ny * 0.35,
    rotY: rotY + clampedScroll * nx * 0.42,
    rotZ,
    scaleZ,
    toneMix,
  };
}

/**
 * Generates deterministic 2D/relief tessellation for the Product Configurator wall.
 */
export function generateWallTessellation(config: ConfiguratorState): TessellatedTile[] {
  const cols = Math.max(4, Math.min(10, Math.round(config.columns)));
  const rows = Math.max(3, Math.min(6, Math.round(config.rows)));
  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const tiles: TessellatedTile[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const key = `${col}-${row}`;
      const nx = cols > 1 ? (col - centerX) / centerX : 0;
      const ny = rows > 1 ? (row - centerY) / centerY : 0;
      const dist = Math.hypot(nx, ny);

      let defaultRotation: TileRotation = 0;
      let reliefDepth = 0.65;
      let secondaryTone = false;

      switch (config.pattern) {
        case 'harmonic-wave': {
          const wave = Math.sin(col * 0.85 + row * 0.55);
          const step = ((col + row) % 4) as 0 | 1 | 2 | 3;
          defaultRotation = (step * 90) as TileRotation;
          reliefDepth = Number((0.45 + (wave + 1) * 0.26).toFixed(3));
          secondaryTone = wave > 0.15;
          break;
        }
        case 'herringbone': {
          defaultRotation = ((col + row) % 2 === 0 ? 0 : 90) as TileRotation;
          reliefDepth = Number((0.55 + ((col * 3 + row) % 3) * 0.18).toFixed(3));
          secondaryTone = (col + row) % 2 === 0;
          break;
        }
        case 'radial-aperture': {
          const quadrant =
            ny <= 0
              ? nx < 0
                ? 0
                : 90
              : nx >= 0
                ? 180
                : 270;
          defaultRotation = quadrant as TileRotation;
          reliefDepth = Number(Math.max(0.3, Math.min(1, 1 - dist * 0.48)).toFixed(3));
          secondaryTone = dist < 0.72;
          break;
        }
        case 'acoustic-gradient': {
          const verticalRatio = rows > 1 ? 1 - row / (rows - 1) : 0.5; // denser at bottom/eye-level
          defaultRotation = (row % 2 === 0 ? 0 : 180) as TileRotation;
          reliefDepth = Number((0.35 + verticalRatio * 0.62).toFixed(3));
          secondaryTone = row >= Math.floor(rows / 2);
          break;
        }
      }

      const rotation = config.customRotations[key] ?? defaultRotation;
      tiles.push({
        key,
        col,
        row,
        rotation,
        reliefDepth,
        secondaryTone,
      });
    }
  }

  return tiles;
}

export function rotateTileOrientation(current: TileRotation): TileRotation {
  return (((current + 90) % 360) as TileRotation);
}

/**
 * Computes physical acoustic performance metrics using Sabine's reverberation model
 * for a reference architectural chamber scaled to the installation wall area.
 */
export function calculateAcousticMetrics(config: ConfiguratorState): AcousticMetrics {
  const cols = Math.max(4, Math.min(10, Math.round(config.columns)));
  const rows = Math.max(3, Math.min(6, Math.round(config.rows)));
  const tileCount = cols * rows;

  // Each modular Tessera unit is 600mm x 600mm (0.6m x 0.6m = 0.36 sq m)
  const moduleSizeM = 0.6;
  const wallWidthMeters = Number((cols * moduleSizeM).toFixed(1));
  const wallHeightMeters = Number((rows * moduleSizeM).toFixed(1));
  const wallAreaSqM = Number((tileCount * moduleSizeM * moduleSizeM).toFixed(2));

  const shapeSpec = getShapeSpec(config.shape);
  const materialSpec = getMaterialSpec(config.material);
  const patternSpec = getPatternSpec(config.pattern);

  const rawNrc = shapeSpec.baseNrc + materialSpec.nrcModifier + patternSpec.scatterBonus;
  const clampedNrc = Number(Math.max(0.7, Math.min(0.99, Math.round(rawNrc * 200) / 200)).toFixed(2));

  const sabinsMetric = Number((wallAreaSqM * clampedNrc).toFixed(2));

  // Reference architectural room volume proportional to target wall (depth 5.5m)
  const roomVolumeM3 = wallAreaSqM * 5.5;
  // Baseline untreated concrete/gypsum room absorption (~0.05 average alpha across ~4.6x wall surface)
  const totalSurfaceArea = wallAreaSqM * 4.6;
  const baselineSabins = totalSurfaceArea * 0.052;
  const treatedSabins = baselineSabins + sabinsMetric - wallAreaSqM * 0.052;

  const rt60UntreatedSec = Number(((0.161 * roomVolumeM3) / baselineSabins).toFixed(2));
  const rt60TreatedSec = Number(((0.161 * roomVolumeM3) / treatedSabins).toFixed(2));
  const rt60ReductionPercent = Math.round(
    ((rt60UntreatedSec - rt60TreatedSec) / rt60UntreatedSec) * 100,
  );

  const totalMassKg = Number((tileCount * materialSpec.massPerTileKg).toFixed(1));
  const cleatCount = tileCount * 2;

  const frequencyAbsorption = FREQUENCY_BANDS_HZ.map((hz, idx) => {
    const baseBand = shapeSpec.frequencyCurve[idx];
    const adjusted = Math.max(
      0.35,
      Math.min(0.99, Number((baseBand + materialSpec.nrcModifier + patternSpec.scatterBonus * 0.5).toFixed(2))),
    );
    return { hz, alpha: adjusted };
  });

  return {
    tileCount,
    wallWidthMeters,
    wallHeightMeters,
    wallAreaSqM,
    nrc: clampedNrc,
    sabinsMetric,
    rt60UntreatedSec,
    rt60TreatedSec,
    rt60ReductionPercent,
    totalMassKg,
    cleatCount,
    frequencyAbsorption,
  };
}

export function formatSpecificationSummary(
  config: ConfiguratorState,
  metrics: AcousticMetrics,
): string {
  const shape = getShapeSpec(config.shape);
  const material = getMaterialSpec(config.material);
  const pattern = getPatternSpec(config.pattern);
  const customCount = Object.keys(config.customRotations).length;

  return [
    'TESSERA ARCHITECTURAL ACOUSTIC SPECIFICATION (CSI 09 84 33)',
    `Module Geometry: ${shape.name} (${shape.depthMm}mm relief)`,
    `Surface Finish: ${material.name} — ${material.origin}`,
    `Tessellation Pattern: ${pattern.name}${customCount > 0 ? ` (+${customCount} custom-rotated modules)` : ''}`,
    `Elevation Matrix: ${config.columns} cols × ${config.rows} rows (${metrics.tileCount} units · 600×600mm)`,
    `Dimensions & Coverage: ${metrics.wallWidthMeters}m W × ${metrics.wallHeightMeters}m H (${metrics.wallAreaSqM} m²)`,
    `Acoustic Performance: NRC ${metrics.nrc.toFixed(2)} · ${metrics.sabinsMetric} Metric Sabins · Est. RT60 ${metrics.rt60UntreatedSec}s → ${metrics.rt60TreatedSec}s (-${metrics.rt60ReductionPercent}%)`,
    `Hardware & Load: ${metrics.cleatCount} Anodized Quick-Lock Magnetic Cleats · ${metrics.totalMassKg} kg total mass`,
  ].join('\n');
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  if (!input.architectName || input.architectName.trim().length < 2) {
    errors.architectName = 'Please enter your full name.';
  }

  if (!input.firmOrStudio || input.firmOrStudio.trim().length < 2) {
    errors.firmOrStudio = 'Please enter your practice or organization.';
  }

  const emailTrimmed = (input.workEmail ?? '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  if (!input.projectTypology || input.projectTypology.trim().length === 0) {
    errors.projectTypology = 'Please select a project typology.';
  }

  const parsedArea = Number(input.targetAreaSqM);
  if (!input.targetAreaSqM || Number.isNaN(parsedArea) || parsedArea <= 0 || parsedArea > 50000) {
    errors.targetAreaSqM = 'Enter an estimated wall area between 1 and 50,000 m².';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
]]>
    </file>
    <file path="src/app/(tessera)/tessera/utils/acousticAudio.ts">
<![CDATA[/**
 * Procedural zero-dependency Web Audio synthesizer for subtle tactile clicks
 * and interactive acoustic reverberation auditioning (Untreated Concrete vs. Tessera Damped).
 */

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedCtx) {
    sharedCtx = new AudioCtx();
  }
  if (sharedCtx.state === 'suspended') {
    sharedCtx.resume().catch(() => {});
  }
  return sharedCtx;
}

/**
 * Subtle tactile mechanical click when adjusting architectural tiles or presets.
 */
export function playTactileClick(pitchHz = 220): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(pitchHz, now);
  osc.frequency.exponentialRampToValueAtTime(68, now + 0.032);

  gain.gain.setValueAtTime(0.045, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}

/**
 * Auditions a chamber acoustic chord in either an untreated reverberant concrete space
 * (long metallic multi-tap reflections) or a Tessera-treated acoustic room (warm, intimate clarity).
 */
export function playAcousticComparison(mode: 'untreated' | 'tessera', nrc = 0.92): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequencies = [261.63, 329.63, 392.0, 523.25]; // C major architectural chime

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.14, now);
  master.connect(ctx.destination);

  // Lowpass filter representing high-frequency absorption
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(mode === 'tessera' ? 1650 - nrc * 450 : 4800, now);
  filter.connect(master);

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    osc.type = mode === 'tessera' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.035);

    const decayTime = mode === 'tessera' ? 0.42 : 1.75;
    noteGain.gain.setValueAtTime(0.001, now + idx * 0.035);
    noteGain.gain.linearRampToValueAtTime(0.18, now + idx * 0.035 + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + decayTime);

    osc.connect(noteGain);
    noteGain.connect(filter);

    osc.start(now + idx * 0.035);
    osc.stop(now + idx * 0.035 + decayTime + 0.05);
  });

  // Simulated flutter echo taps in untreated mode
  if (mode === 'untreated') {
    const tapTimes = [0.11, 0.23, 0.37, 0.54, 0.76, 1.02];
    tapTimes.forEach((delaySec, tapIdx) => {
      const echoOsc = ctx.createOscillator();
      const echoGain = ctx.createGain();
      echoOsc.type = 'sawtooth';
      echoOsc.frequency.setValueAtTime(523.25 * (tapIdx % 2 === 0 ? 1 : 1.5), now + delaySec);

      const amp = 0.038 * Math.pow(0.7, tapIdx);
      echoGain.gain.setValueAtTime(amp, now + delaySec);
      echoGain.gain.exponentialRampToValueAtTime(0.0001, now + delaySec + 0.22);

      echoOsc.connect(echoGain);
      echoGain.connect(master);
      echoOsc.start(now + delaySec);
      echoOsc.stop(now + delaySec + 0.24);
    });
  }
}
]]>
    </file>
  </files>
</template>

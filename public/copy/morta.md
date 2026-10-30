<template slug="morta" name="MORTA">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(morta)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import "./morta/morta.css";

export const metadata: Metadata = {
  title: "MORTA ? Sculptural Sterling Silver",
  description: "Sculptural silver for the stories we carry. Small editions and bespoke commissions in 925 sterling silver.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" /></head><body>{children}</body></html>;
}
]]>
    </file>
    <file path="src/app/(morta)/morta/App.tsx">
<![CDATA["use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HouseSection } from './components/HouseSection';
import { CollectionSection } from './components/CollectionSection';
import { CraftSection } from './components/CraftSection';
import { BespokeSection } from './components/BespokeSection';
import { Footer } from './components/Footer';

function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      setProgress(Math.round(value * 500) / 500);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return progress;
}

function ScrollHeader() {
  return <Header scrollProgress={usePageScrollProgress()} />;
}

function ScrollHouse({ reducedMotion }: { reducedMotion: boolean }) {
  return <HouseSection scrollProgress={usePageScrollProgress()} reducedMotion={reducedMotion} />;
}

export default function App() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [selectedPieceReference, setSelectedPieceReference] =
    useState<string>('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:uppercase"
      >
        Skip to main content
      </a>

      <ScrollHeader />

      <main id="main-content">
        <HeroSection />
        <ScrollHouse reducedMotion={reducedMotion} />
        <CollectionSection
          onSelectForCommission={(pieceRef) =>
            setSelectedPieceReference(pieceRef)
          }
        />
        <CraftSection reducedMotion={reducedMotion} />
        <BespokeSection selectedPieceReference={selectedPieceReference} />
      </main>

      <Footer />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(morta)/morta/morta.css">
<![CDATA[@import "tailwindcss";

@theme {
  --font-display: "Cormorant Garamond", "Times New Roman", Georgia, serif;
  --font-sans: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

@layer base {
  html {
    background-color: #000000;
    color: #ffffff;
    font-family: var(--font-sans);
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
    }
    .morta-unfurl-line,
    .morta-rise-headline,
    .morta-fade-copy,
    .morta-fade-cta {
      animation: none !important;
    }
    .group:hover img {
      transform: none !important;
    }
  }
}

@keyframes mortaLineUnfurl {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes mortaRiseMask {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes mortaFadeLock {
  0% {
    transform: translateY(12px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.morta-unfurl-line {
  transform-origin: left center;
  animation: mortaLineUnfurl 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.morta-rise-headline {
  animation: mortaRiseMask 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

.morta-fade-copy {
  animation: mortaFadeLock 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both;
}

.morta-fade-cta {
  animation: mortaFadeLock 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
}

/* Quiet, mineral surfaces give the silver room to emerge from shadow. */
.morta-atmosphere {
  background: radial-gradient(ellipse at 15% 20%, #202020 0%, #111111 43%, #0b0b0b 100%);
}

.morta-slate {
  background-color: #151515;
  background-image:
    radial-gradient(ellipse at 82% 16%, rgba(110, 112, 110, 0.11), transparent 46%),
    radial-gradient(ellipse at 12% 78%, rgba(75, 78, 77, 0.14), transparent 48%),
    linear-gradient(125deg, #111212, #1b1c1c 48%, #101111);
}

.morta-ring-light {
  background: radial-gradient(ellipse at 50% 43%, #393b3a 0%, #202221 32%, #0c0d0d 75%);
}
]]>
    </file>
    <file path="src/app/(morta)/morta/page.tsx">
<![CDATA[import App from "./App";

export default function Page() { return <App />; }
]]>
    </file>
    <file path="src/app/(morta)/morta/components/BespokeSection.tsx">
<![CDATA[import React, { useEffect, useState } from 'react';
import {
  CommissionFormInput,
  CommissionValidationResult,
  MORTA_ASSETS,
  validateCommissionForm,
} from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { PointedSealOrnament, SectionHandoffRule } from './MortaMark';

interface BespokeSectionProps {
  selectedPieceReference: string;
}

const PIECE_OPTIONS = [
  'Bespoke Solitary Commission (New Wax Study)',
  '01 — Reliquary (Signet ring)',
  '02 — Thorn (Pendant)',
  '03 — Vigil (Drop earrings)',
];

export const BespokeSection: React.FC<BespokeSectionProps> = ({
  selectedPieceReference,
}) => {
  const [formData, setFormData] = useState<CommissionFormInput>({
    name: '',
    email: '',
    pieceReference: PIECE_OPTIONS[0],
    description: '',
  });
  const [validation, setValidation] = useState<CommissionValidationResult>({
    isValid: true,
    errors: {},
  });
  const [submittedRecord, setSubmittedRecord] =
    useState<CommissionFormInput | null>(null);

  useEffect(() => {
    if (selectedPieceReference) {
      setFormData((prev) => ({
        ...prev,
        pieceReference: selectedPieceReference,
      }));
      setSubmittedRecord(null);
    }
  }, [selectedPieceReference]);

  const handleFieldChange = (
    field: keyof CommissionFormInput,
    value: string
  ) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (validation.errors[field]) {
      setValidation((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: undefined,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validateCommissionForm(formData);
    setValidation(check);
    if (!check.isValid) {
      return;
    }

    setSubmittedRecord({
      name: formData.name.trim(),
      email: formData.email.trim(),
      pieceReference: formData.pieceReference.trim(),
      description: formData.description.trim(),
    });
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFormData({
      name: '',
      email: '',
      pieceReference: PIECE_OPTIONS[0],
      description: '',
    });
    setValidation({ isValid: true, errors: {} });
  };

  return (
    <section
      id="commissions"
      aria-labelledby="commissions-heading"
      className="relative morta-atmosphere border-b border-white/20"
    >
      <SectionHandoffRule
        chapterNumber="CH. V"
        chapterLabel="Bespoke Commissions"
      />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bespoke Plate (morta-bespoke.png) & Editorial Invitation */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">
                SOLITARY WORKS · GRAPHITE TO STERLING
              </p>
              <h2
                id="commissions-heading"
                className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-white leading-[1.06]"
                style={{ textWrap: 'balance' }}
              >
                Begin a piece shaped
                <br />
                for one hand.
              </h2>
              <p className="text-base text-white/80 leading-relaxed">
                Bespoke commissions begin with a drawing and a hand-carved
                wax model, shaped to your measurements and ideas.
              </p>
            </div>

            <figure className="border border-white/25 bg-black p-4 sm:p-6">
              <MortaImage
                asset={MORTA_ASSETS.bespoke}
                priority={false}
                className="w-full"
              />
              <figcaption className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/70">
                <span>PLATE III · GRAPHITE STUDIES &amp; NEEDLE FILE</span>
                <span>925 STERLING</span>
              </figcaption>
            </figure>
          </div>

          {/* Right Column: Accessible Enquiry Form & Transparent Demo Success State */}
          <div className="lg:col-span-7">
            <div className="border border-white/25 bg-black p-6 sm:p-10 lg:p-12">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <PointedSealOrnament className="w-3.5 h-5 text-white" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                    Commission Enquiry Ledger
                  </span>
                </div>
                <span className="font-mono text-xs text-white/65 tracking-[0.14em]">
                  DIRECT BENCH CONSULTATION
                </span>
              </div>

              {submittedRecord ? (
                <div
                  role="status"
                  aria-live="polite"
                  data-testid="commission-demo-success"
                  className="space-y-8 py-4"
                >
                  <div className="p-6 border border-white bg-black space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                      DEMONSTRATION PREVIEW · ENQUIRY NOT TRANSMITTED
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl font-normal text-white">
                      Your commission study has been formatted locally.
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      This interface is an interactive demonstration with no
                      connected mail server. Your enquiry details were validated
                      and previewed in your browser only—no message has been sent.
                    </p>
                  </div>

                  <dl className="border border-white/20 divide-y divide-white/15 text-sm">
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Patron Name
                      </dt>
                      <dd className="sm:col-span-2 text-white font-medium">
                        {submittedRecord.name}
                      </dd>
                    </div>
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Correspondence Email
                      </dt>
                      <dd className="sm:col-span-2 text-white font-mono">
                        {submittedRecord.email}
                      </dd>
                    </div>
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Starting Form
                      </dt>
                      <dd className="sm:col-span-2 text-white">
                        {submittedRecord.pieceReference}
                      </dd>
                    </div>
                    <div className="p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <dt className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        Commission Notes
                      </dt>
                      <dd className="sm:col-span-2 text-white/90 leading-relaxed">
                        {submittedRecord.description}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-[0.18em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap"
                    >
                      Draft another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Bespoke commission enquiry form"
                >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="commission-name"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Your Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="commission-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      aria-invalid={Boolean(validation.errors.name)}
                      aria-describedby={
                        validation.errors.name
                          ? 'commission-name-error'
                          : undefined
                      }
                      placeholder="e.g. Clara Vance"
                      className={`w-full px-4 py-3.5 bg-black text-white placeholder:text-white/35 border font-sans text-sm focus:outline-none focus:border-white transition-colors ${
                        validation.errors.name
                          ? 'border-white'
                          : 'border-white/35'
                      }`}
                    />
                    {validation.errors.name && (
                      <p
                        id="commission-name-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-white flex items-center gap-2"
                      >
                        <span aria-hidden="true">!</span>
                        <span>{validation.errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="commission-email"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="commission-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleFieldChange('email', e.target.value)
                      }
                      aria-invalid={Boolean(validation.errors.email)}
                      aria-describedby={
                        validation.errors.email
                          ? 'commission-email-error'
                          : undefined
                      }
                      placeholder="name@domain.com"
                      className={`w-full px-4 py-3.5 bg-black text-white placeholder:text-white/35 border font-sans text-sm focus:outline-none focus:border-white transition-colors ${
                        validation.errors.email
                          ? 'border-white'
                          : 'border-white/35'
                      }`}
                    />
                    {validation.errors.email && (
                      <p
                        id="commission-email-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-white flex items-center gap-2"
                      >
                        <span aria-hidden="true">!</span>
                        <span>{validation.errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Starting Form / Edition Reference */}
                  <div>
                    <label
                      htmlFor="commission-piece"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Study or Edition Reference
                    </label>
                    <select
                      id="commission-piece"
                      name="pieceReference"
                      value={formData.pieceReference}
                      onChange={(e) =>
                        handleFieldChange('pieceReference', e.target.value)
                      }
                      className="w-full px-4 py-3.5 bg-black text-white border border-white/35 font-sans text-sm focus:outline-none focus:border-white transition-colors"
                    >
                      {PIECE_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-black text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label
                      htmlFor="commission-description"
                      className="block font-mono text-xs uppercase tracking-[0.18em] text-white mb-2"
                    >
                      Commission Brief &amp; Proportions{' '}
                      <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="commission-description"
                      name="description"
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) =>
                        handleFieldChange('description', e.target.value)
                      }
                      aria-invalid={Boolean(validation.errors.description)}
                      aria-describedby={
                        validation.errors.description
                          ? 'commission-description-error'
                          : 'commission-description-hint'
                      }
                      placeholder="Describe the piece, including your ring size or chain length if known..."
                      className={`w-full px-4 py-3.5 bg-black text-white placeholder:text-white/35 border font-sans text-sm leading-relaxed focus:outline-none focus:border-white transition-colors ${
                        validation.errors.description
                          ? 'border-white'
                          : 'border-white/35'
                      }`}
                    />
                    <p
                      id="commission-description-hint"
                      className="mt-1.5 font-mono text-xs text-white/55"
                    >
                      Minimum 15 characters. Include ring size or chain drop if
                      known.
                    </p>
                    {validation.errors.description && (
                      <p
                        id="commission-description-error"
                        role="alert"
                        className="mt-2 font-mono text-xs text-white flex items-center gap-2"
                      >
                        <span aria-hidden="true">!</span>
                        <span>{validation.errors.description}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit & Demonstration Notice */}
                  <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs font-mono text-white/65 leading-relaxed max-w-sm">
                      Demonstration mode: submitting previews your formatted
                      commission brief locally without sending an external email.
                    </p>

                    <button
                      type="submit"
                      className="px-7 py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
                    >
                      Submit commission enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/CollectionSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { COLLECTION_ITEMS, CollectionItem } from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { PointedSealOrnament, SectionHandoffRule } from './MortaMark';

interface CollectionSectionProps {
  onSelectForCommission: (pieceReference: string) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectForCommission,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCommissionClick = (item: CollectionItem) => {
    onSelectForCommission(`${item.number} — ${item.name} (${item.category})`);
    const commissionEl = document.getElementById('commissions');
    if (commissionEl) {
      commissionEl.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="relative morta-atmosphere border-b border-white/20"
    >
      <SectionHandoffRule chapterNumber="CH. III" chapterLabel="The Collection" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-28">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70 mb-4">
              ARCHIVE EDITIONS · OBJECTS 01 — 03
            </p>
            <h2
              id="collection-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.06]"
              style={{ textWrap: 'balance' }}
            >
              Three forms cast around
              <br />
              quiet space.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/75 max-w-md leading-relaxed">
            Three editions in solid 925 silver, finished by hand.
          </p>
        </div>

        {/* 3-Column Editorial Product Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {COLLECTION_ITEMS.map((item) => {
            const isExpanded = expandedId === item.id;
            const panelId = `collection-dossier-${item.id}`;

            return (
              <article
                key={item.id}
                aria-labelledby={`product-title-${item.id}`}
                className="group flex flex-col justify-between border border-white/25 bg-black hover:border-white focus-within:border-white transition-colors"
              >
                <div>
                  {/* Card Top Catalogue Bar */}
                  <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-white">
                      <span className="tabular-nums font-medium tracking-[0.2em]">
                        {item.number}
                      </span>
                      <span className="text-white/40" aria-hidden="true">
                        /
                      </span>
                      <span className="uppercase tracking-[0.18em] text-white/80">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-white/65 tracking-[0.14em] uppercase">
                      {item.editionNote}
                    </span>
                  </div>

                  {/* Product Monochrome Plate */}
                  <div className="relative border-b border-white/20 overflow-hidden bg-black">
                    <MortaImage
                      asset={item.asset}
                      priority={false}
                      className="w-full"
                      imgClassName="group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>

                  {/* Essential Information (Always visible on desktop, touch, and keyboard) */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        id={`product-title-${item.id}`}
                        className="font-display text-3xl sm:text-4xl font-normal text-white tracking-tight"
                      >
                        {item.name}
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/70 whitespace-nowrap">
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Unboxed clean metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/70 tabular-nums">
                      <span>{item.material}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.weight}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.dimensions}</span>
                    </div>

                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Expandable Structural Notes (Accessible Disclosure) */}
                    {isExpanded && (
                      <div
                        id={panelId}
                        className="pt-5 mt-5 border-t border-white/20 space-y-3 text-sm text-white/80"
                      >
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60 mb-1">
                            Architectural Note
                          </p>
                          <p className="leading-relaxed">
                            {item.architecturalNote}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60 mb-1">
                            Bench Finishing
                          </p>
                          <p className="leading-relaxed">{item.craftDetail}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions: In-Page Exploration & Commission Selection (No Dead Links) */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-white/15 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
                  <button
                    type="button"
                    onClick={() => toggleDetails(item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className="min-w-0 flex-1 px-4 py-3 text-xs font-mono uppercase tracking-[0.16em] text-white border border-white/35 hover:border-white active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors text-center"
                  >
                    {isExpanded
                      ? `Hide ${item.name} notes`
                      : `Inspect ${item.name} notes`}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCommissionClick(item)}
                    className="min-w-0 flex-1 px-4 py-3 text-xs font-mono uppercase tracking-[0.16em] bg-white text-black border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors text-center"
                  >
                    Inquire for {item.name}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Collection Footnote */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/70">
          <div className="flex items-center gap-3">
            <PointedSealOrnament className="w-3.5 h-5 text-white/70" />
            <span>
              ALL PIECES STAMPED WITH THE MORTA POINTED SEAL &amp; 925 FINENESS MARK
            </span>
          </div>
          <a
            href="#commissions"
            className="underline underline-offset-4 text-white hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white whitespace-nowrap"
          >
            Request custom sizing or bespoke variation →
          </a>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/CraftSection.tsx">
<![CDATA[import React, { useEffect, useRef, useState } from 'react';
import {
  MORTA_ASSETS,
  computeAssemblyState,
} from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { PointedSealOrnament, SectionHandoffRule } from './MortaMark';
import { ReliquaryRing3D } from './ReliquaryRing3D';

interface CraftSectionProps {
  reducedMotion: boolean;
}

const STAGE_PRESETS = [
  { label: '01 · Dispersed', progress: 0 },
  { label: '02 · Converging', progress: 0.35 },
  { label: '03 · Aligning', progress: 0.65 },
  { label: '04 · Locked Ring', progress: 1 },
];

export const CraftSection: React.FC<CraftSectionProps> = ({ reducedMotion }) => {
  const assemblyTrackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(
    reducedMotion ? 1 : 0
  );
  const [manualOverride, setManualOverride] = useState<number | null>(null);
  const overrideScrollYRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      return;
    }

    let rafId = 0;
    const updateScroll = () => {
      const track = assemblyTrackRef.current;
      if (!track) return;

      // If user scrolls significantly after pressing a stage preset button, hand control back to scroll
      if (
        overrideScrollYRef.current !== null &&
        Math.abs(window.scrollY - overrideScrollYRef.current) > 36
      ) {
        overrideScrollYRef.current = null;
        setManualOverride(null);
      }

      const rect = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 900;
      const scrollableDistance = Math.max(1, rect.height - viewportHeight * 0.75);
      const distanceScrolled = viewportHeight * 0.35 - rect.top;
      const raw = Math.min(1, Math.max(0, distanceScrolled / scrollableDistance));
      setScrollProgress(Math.round(raw * 500) / 500);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  const handleStageButtonClick = (presetProgress: number) => {
    overrideScrollYRef.current = window.scrollY;
    setManualOverride(presetProgress);
  };

  const hasExplicitStage = manualOverride !== null;
  const effectiveProgress =
    manualOverride !== null ? manualOverride : scrollProgress;
  const assembly = computeAssemblyState(
    effectiveProgress,
    reducedMotion,
    hasExplicitStage
  );
  const { assembly3D } = assembly;
  const percentComplete = Math.round(assembly.lockProgress * 100);

  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="relative morta-slate border-b border-white/20"
    >
      <SectionHandoffRule chapterNumber="CH. IV" chapterLabel="The Craft" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 pt-16 md:pt-28 pb-16">
        {/* Part 1: Bench Photography (morta-craft.png) & Silversmithing Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch pb-20 border-b border-white/20">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">
                AT THE BENCH · LOST-WAX &amp; STEEL GRAVER
              </p>
              <h2
                id="craft-heading"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.06]"
                style={{ textWrap: 'balance' }}
              >
                Carved in wax.
                <br />
                Disciplined by steel.
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Each piece begins as a hand-carved wax model, then is cast
                in 925 silver and refined at the bench.
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Recesses are oxidized and raised edges burnished by hand.
                The silver is neither plated nor lacquered.
              </p>
            </div>

            {/* Three-step process ledger */}
            <div className="pt-8 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
              <div className="space-y-1.5">
                <p className="text-white/55 tracking-[0.18em]">PHASE I</p>
                <p className="text-white uppercase tracking-[0.14em]">
                  Hollowing the Wax
                </p>
                <p className="font-sans text-white/75 leading-relaxed">
                  Carved around a central void.
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/55 tracking-[0.18em]">PHASE II</p>
                <p className="text-white uppercase tracking-[0.14em]">
                  Sterling Pour
                </p>
                <p className="font-sans text-white/75 leading-relaxed">
                  Lost-wax cast in solid 925 silver.
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/55 tracking-[0.18em]">PHASE III</p>
                <p className="text-white uppercase tracking-[0.14em]">
                  Graver &amp; Slate
                </p>
                <p className="font-sans text-white/75 leading-relaxed">
                  Engraved and finished by hand.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="h-full flex flex-col justify-between border border-white/25 bg-black p-4 sm:p-6">
              <MortaImage
                asset={MORTA_ASSETS.craft}
                priority={false}
                className="w-full"
              />
              <figcaption className="pt-4 mt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70">
                <span>PLATE II · ENGRAVING A STERLING BAND AT THE BENCH PIN</span>
                <span>GRAVER NO. 42</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Part 2: Signature 3D Reliquary Ring Assembly Mechanic */}
        <div
          ref={assemblyTrackRef}
          data-testid="ring-assembly-stage"
          data-locked={assembly.isLocked ? 'true' : 'false'}
          data-stage={assembly.stageIndex}
          className={`relative pt-12 ${
            reducedMotion ? 'min-h-0' : 'min-h-[175vh]'
          }`}
        >
          <div className="sticky top-24 border border-white/30 bg-black p-6 sm:p-10 lg:p-12">
            {/* Top Status & Stage Controls Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/20">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-white/75">
                  <PointedSealOrnament className="w-3.5 h-5 text-white" />
                  <span>SIGNATURE ASSEMBLY · 01 RELIQUARY SIGNET IN 3D</span>
                </div>
                <p className="text-xs font-mono text-white/65 tracking-[0.14em] tabular-nums">
                  {assembly.stageCode} — {assembly.stageTitle.toUpperCase()} (
                  {percentComplete}% CONVERGED)
                </p>
              </div>

              {/* Interactive stage controls synchronized with scroll */}
              <div
                role="group"
                aria-label="Inspect ring assembly stages"
                className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0"
              >
                {STAGE_PRESETS.map((preset, idx) => {
                  const isActive = assembly.stageIndex === idx;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleStageButtonClick(preset.progress)}
                      aria-pressed={isActive}
                      className={`px-3 py-2 text-[11px] font-mono uppercase tracking-[0.12em] border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                        isActive
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-white/80 border-white/30 hover:border-white hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
                {manualOverride !== null && !reducedMotion && (
                  <button
                    type="button"
                    onClick={() => {
                      overrideScrollYRef.current = null;
                      setManualOverride(null);
                    }}
                    className="px-2.5 py-2 text-[11px] font-mono uppercase tracking-[0.12em] text-white/75 hover:text-white underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    Resume scroll
                  </button>
                )}
              </div>
            </div>

            {/* Main Assembly Grid: Left Interactive 3D Reliquary Ring / Right Editorial Copy & Clearances */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Panel: 3D Reliquary Ring Assembly (placed above copy on mobile) */}
              <div className="lg:col-span-7">
                <ReliquaryRing3D
                  assembly3D={assembly3D}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Right Panel: Editorial Statement & 3D Component Clearance Ledger */}
              <div className="lg:col-span-5 space-y-8">
                <div className="border border-white/25 p-6 space-y-4">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/65">
                    {assembly.isLocked
                      ? 'CONTOUR LOCKED · FINAL SILHOUETTE'
                      : 'SCROLL OR SELECT STAGE TO LOCK RING'}
                  </p>
                  <h3
                    className="font-display text-4xl sm:text-5xl font-normal text-white leading-[1.08]"
                    style={{ textWrap: 'balance' }}
                  >
                    “Formed slowly.
                    <br />
                    Worn for years.”
                  </h3>
                </div>

                <p className="text-base text-white/80 leading-relaxed">
                  {assembly.stageDescription}
                </p>

                {/* 3D Structural Component Clearances */}
                <div className="border-t border-white/20 pt-6 space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between text-white/80">
                    <span>01. STEPPED LANCET BEZEL</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.outerBezel.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `+${assembly3D.parts.outerBezel.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>02. OXIDIZED RELIQUARY CHAMBER</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.recessedChamber.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `+${assembly3D.parts.recessedChamber.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>03. TREFOIL SPANDREL SHOULDERS</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.leftShoulder.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `±${assembly3D.parts.leftShoulder.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>04. TAPERED STERLING SHANK</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.lowerShank.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `-${assembly3D.parts.lowerShank.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#commissions"
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-[0.18em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap"
                  >
                    <span>Commission a solitary piece</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
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
    <file path="src/app/(morta)/morta/components/Footer.tsx">
<![CDATA[import React from 'react';
import { MortaMark, PointedSealOrnament } from './MortaMark';

export const Footer: React.FC = () => {
  return (
    <footer className="morta-atmosphere text-white border-t border-white/25">
      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/20">
          {/* Brand Reprise & Closing Phrase */}
          <div className="lg:col-span-6 space-y-6">
            <a
              href="#oath"
              className="inline-flex items-center gap-4 text-white hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <MortaMark size={38} />
              <span className="font-display text-2xl sm:text-3xl tracking-[0.34em] uppercase">
                MORTA
              </span>
            </a>

            <p className="font-display text-3xl sm:text-4xl text-white font-normal tracking-tight">
              “Made to outlast the moment.”
            </p>

          </div>

          {/* Working In-Page Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Chapters
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <a
                  href="#oath"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  I. The Oath
                </a>
              </li>
              <li>
                <a
                  href="#house"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  II. The House
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  III. The Collection (01–03)
                </a>
              </li>
              <li>
                <a
                  href="#craft"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  IV. The Craft &amp; Ring Assembly
                </a>
              </li>
              <li>
                <a
                  href="#commissions"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  V. Bespoke Commissions
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Commission / Enquiry Access (No fabricated addresses or fake social links) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Commissions &amp; Enquiries
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              Request custom sizing or a bespoke piece.
            </p>
            <div className="pt-2">
              <a
                href="#commissions"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] border border-white text-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap"
              >
                <span>Open commission form</span>
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/65">
          <div className="flex items-center gap-3">
            <PointedSealOrnament className="w-3 h-4 text-white/65" />
            <span>MORTA · SCULPTURAL STERLING SILVER · 925 FINENESS</span>
          </div>
          <a
            href="#oath"
            className="text-white/80 hover:text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white whitespace-nowrap"
          >
            Return to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/Header.tsx">
<![CDATA[import React, { useState } from 'react';
import { MortaMark } from './MortaMark';

interface HeaderProps {
  scrollProgress: number;
}

export const Header: React.FC<HeaderProps> = ({ scrollProgress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressPercent = Math.round(Math.min(100, Math.max(0, scrollProgress * 100)));

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand mark and widely tracked wordmark (single link element) */}
        <a
          href="#oath"
          onClick={closeMenu}
          aria-label="MORTA — Return to top"
          className="inline-flex items-center gap-2.5 sm:gap-3.5 text-white hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-opacity whitespace-nowrap shrink-0"
        >
          <MortaMark size={28} />
          <span className="font-display text-lg sm:text-xl md:text-2xl font-medium tracking-[0.28em] sm:tracking-[0.34em] uppercase">
            MORTA
          </span>
        </a>

        {/* Zone 2: Primary navigation anchors */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm text-white/80"
        >
          <a
            href="#collection"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Collection
          </a>
          <a
            href="#house"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            House
          </a>
          <a
            href="#craft"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Craft
          </a>
          <a
            href="#commissions"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Commissions
          </a>
        </nav>

        {/* Zone 3: Primary action + Mobile disclosure button */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <a
            href="#commissions"
            className="px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] bg-white text-black border border-white hover:bg-black hover:text-white active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Commission a piece
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="morta-mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-10 h-10 inline-flex items-center justify-center border border-white/35 text-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  d="M3 3L15 15M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M2 5H16M2 9H16M2 13H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="morta-mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-white/20 bg-black px-6 py-6"
        >
          <ul className="flex flex-col space-y-4 text-base">
            <li>
              <a
                href="#collection"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white border-b border-white/10"
              >
                Collection
              </a>
            </li>
            <li>
              <a
                href="#house"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white border-b border-white/10"
              >
                House
              </a>
            </li>
            <li>
              <a
                href="#craft"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white border-b border-white/10"
              >
                Craft
              </a>
            </li>
            <li>
              <a
                href="#commissions"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white"
              >
                Commissions
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/* Discreet scroll progress bar */}
      <div
        className="w-full h-[2px] bg-white/10 overflow-hidden"
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
      >
        <div
          className="h-full bg-white origin-left"
          style={{
            transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})`,
          }}
        />
      </div>
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/HeroSection.tsx">
<![CDATA[import React from 'react';
import { MORTA_ASSETS } from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { HeroSmoke } from './HeroSmoke';
import { PointedSealOrnament } from './MortaMark';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="oath"
      aria-labelledby="hero-heading"
      className="relative bg-black border-b border-white/20 overflow-hidden"
    >
      {/* Subtle architectural pointed-arch background lines */}
      <div
        className="pointer-events-none absolute inset-0 max-w-[1920px] mx-auto px-6 md:px-8 flex justify-between"
        aria-hidden="true"
      >
        <div className="w-px h-full bg-white/10" />
        <div className="hidden lg:block w-px h-full bg-white/10" />
        <div className="w-px h-full bg-white/10" />
      </div>

      <div className="relative w-full">
        {/* Hero Frame: Uses CSS Grid stacking so foreground content never clips or overflows on narrow screens */}
        <div className="relative grid grid-cols-1 min-h-[620px] sm:min-h-[580px] lg:min-h-[max(640px,calc(100svh-80px))] border border-white/25 bg-black overflow-hidden">
          {/* Layer 1: Cinematic Hero Plate */}
          <div className="absolute inset-0 w-full h-full">
            <MortaImage
              asset={MORTA_ASSETS.hero}
              priority={true}
              className="w-full h-full"
              imgClassName="object-[70%_50%] md:object-center"
            />
            {/* Measured monochrome scrim over the left dark region to guarantee >12:1 contrast */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30 lg:to-transparent lg:via-black/55"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35"
              aria-hidden="true"
            />
            <HeroSmoke />
          </div>

          {/* Layer 2: Editorial Foreground Content positioned in the dark text-safe region */}
          <div className="col-start-1 row-start-1 relative z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16">
            {/* Restrained object label */}
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/80">
                <PointedSealOrnament className="w-3.5 h-5 text-white shrink-0" />
                <span>PLATE I · ARCHIVE SIGNET IN SHADOW</span>
              </div>
            </div>

            {/* Main Headline, Supporting Copy & Primary CTA */}
            <div className="max-w-xl my-auto py-8 sm:py-10">
              <div className="overflow-hidden pb-2">
                <h1
                  id="hero-heading"
                  className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.03] morta-rise-headline"
                  style={{ textWrap: 'balance' }}
                >
                  Wear what
                  <br />
                  remains.
                </h1>
              </div>

              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-md font-sans morta-fade-copy">
                Sculptural silver for the stories we carry. Made in small
                editions and bespoke commissions.
              </p>

              <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4 sm:gap-5 morta-fade-cta">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-white text-black font-mono text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Discover the collection</span>
                  <span aria-hidden="true">↓</span>
                </a>

                <a
                  href="#craft"
                  className="inline-flex items-center gap-2 px-5 py-3.5 sm:py-4 text-xs font-mono uppercase tracking-[0.18em] text-white/90 hover:text-white border border-white/35 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Observe the craft</span>
                </a>
              </div>
            </div>

            {/* Bottom Bar: Object label & Scroll cue */}
            <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-white/75">
              <div className="flex flex-wrap items-center gap-2 tracking-[0.16em] uppercase">
                <span>HALLMARK: MORTA 925</span>
                <span aria-hidden="true">·</span>
                <span>OXIDIZED &amp; HAND-BURNISHED</span>
              </div>

              <a
                href="#house"
                aria-label="Scroll to The House chapter"
                className="inline-flex items-center gap-3 text-white/85 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white self-start sm:self-auto whitespace-nowrap"
              >
                <span className="tracking-[0.2em] uppercase">
                  Scroll to gather the contour
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-6 h-6 border border-white/40 text-xs shrink-0"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/HeroSmoke.tsx">
<![CDATA[import { useEffect, useRef } from 'react';

/** A translucent, procedural smoke veil; the photograph remains the fallback. */
export function HeroSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}');
    const fragment = compile(gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);
      }
      float fbm(vec2 p) {
        float n=0., a=.5;
        for(int i=0;i<5;i++) { n+=a*noise(p); p=mat2(1.6,1.2,-1.2,1.6)*p; a*=.5; }
        return n;
      }
      void main() {
        vec2 uv=gl_FragCoord.xy/resolution;
        vec2 p=vec2(uv.x*2.6,uv.y*2.0);
        float t=time*.045;
        float warp=fbm(p*1.25+vec2(t,-t*.7));
        float smoke=fbm(p*2.0+vec2(warp*1.35-t*.55,warp*.6+t));
        float wisps=smoothstep(.34,.64,smoke)*smoothstep(.15,.62,warp);
        float lower=1.-smoothstep(.25,1.,uv.y);
        float right=smoothstep(.15,.68,uv.x);
        float entrance=smoothstep(0.,0.5,time);
        float alpha=wisps*lower*right*.65*entrance;
        gl_FragColor=vec4(vec3(1.),alpha);
      }
    `);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!program || !buffer) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'resolution');
    const time = gl.getUniformLocation(program, 'time');
    let frame = 0;
    let visible = false;
    let elapsed = 0;
    let lastFrame: number | null = null;
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * .65));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * .65));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (now: number) => {
      if (!visible || document.hidden || motion.matches) { frame = 0; return; }
      gl.uniform2f(resolution, canvas.width, canvas.height);
      if (lastFrame !== null) elapsed += (now - lastFrame) / 1000;
      lastFrame = now;
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      if (visible && !document.hidden && !motion.matches && !frame) {
        lastFrame = null;
        frame = requestAnimationFrame(draw);
      } else if ((!visible || document.hidden || motion.matches) && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastFrame = null;
      }
      if (motion.matches) gl.clear(gl.COLOR_BUFFER_BIT);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const sizeObserver = new ResizeObserver(resize);
    resize();
    observer.observe(canvas);
    sizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
]]>
    </file>
    <file path="src/app/(morta)/morta/components/HouseRingStudy3D.tsx">
<![CDATA[import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  MORTA_ASSETS,
  computeHouseRingStudyPose,
} from '../utils/mortaLogic';
import {
  buildReliquaryRingModel,
  createDarkJewelleryStudioEnv,
  detectSoftwareGl,
  ReliquaryRingParts,
} from '../utils/reliquaryRingBuilder';
import { MortaImage } from './MortaImage';

interface HouseRingStudy3DProps {
  reducedMotion: boolean;
}

export const HouseRingStudy3D: React.FC<HouseRingStudy3DProps> = ({
  reducedMotion,
}) => {
  const figureRef = useRef<HTMLElement | null>(null);
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);
  const [showReferenceOverlay, setShowReferenceOverlay] =
    useState<boolean>(false);
  const [viewModified, setViewModified] = useState<boolean>(false);
  const [azimuthDeg, setAzimuthDeg] = useState<number>(40);
  const [elevationDeg, setElevationDeg] = useState<number>(23);

  const stateRef = useRef({
    reducedMotion,
    isInViewport: true,
    hasEnteredViewport: false,
    enterStartTime: 0,
    userAzimuthOffset: 0,
    userElevationOffset: 0,
    userHasInteracted: false,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartAzimuth: 0,
    dragStartElevation: 0,
    requestRender: () => {},
  });

  stateRef.current.reducedMotion = reducedMotion;

  const adjustStudyAngle = useCallback(
    (deltaAzimuthRad: number, deltaElevationRad: number) => {
      const st = stateRef.current;
      st.userHasInteracted = true;
      st.userAzimuthOffset = THREE.MathUtils.clamp(
        st.userAzimuthOffset + deltaAzimuthRad,
        -Math.PI * 1.25,
        Math.PI * 1.25
      );
      st.userElevationOffset = THREE.MathUtils.clamp(
        st.userElevationOffset + deltaElevationRad,
        -0.68,
        0.78
      );
      setViewModified(
        Math.abs(st.userAzimuthOffset) > 0.01 ||
          Math.abs(st.userElevationOffset) > 0.01
      );
      st.requestRender();
    },
    []
  );

  const resetStudyView = useCallback(() => {
    const st = stateRef.current;
    st.userAzimuthOffset = 0;
    st.userElevationOffset = 0;
    st.userHasInteracted = false;
    setViewModified(false);
    st.requestRender();
  }, []);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Transparent clear color so the subtle circular calibration guides behind the canvas remain visible
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(260, container.clientWidth || 440);
    const height = Math.max(260, container.clientHeight || 440);
    renderer.setSize(width, height, false);

    const canvas = renderer.domElement;
    canvas.className = 'w-full h-full block select-none relative z-10';
    canvas.style.touchAction = 'pan-y';
    container.innerHTML = '';
    container.appendChild(canvas);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(33, width / height, 0.1, 40);

    // Shared Dark Jewellery Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const studioEnv = createDarkJewelleryStudioEnv();
    const envTarget = pmremGenerator.fromScene(studioEnv.scene, 0.035);
    scene.environment = envTarget.texture;
    studioEnv.dispose();
    pmremGenerator.dispose();

    // Monochrome 3-Point Studio Lighting calibrated for 925 Sterling Silver
    const hemiLight = new THREE.HemisphereLight(0xd8e0ec, 0x0c0d10, 0.40);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf8, 2.25);
    keyLight.position.set(-3.2, 4.8, 4.4);
    scene.add(keyLight);

    const shoulderRimLight = new THREE.DirectionalLight(0xdce5f5, 1.90);
    shoulderRimLight.position.set(4.8, 1.6, 2.4);
    scene.add(shoulderRimLight);

    const backRimLight = new THREE.DirectionalLight(0xffffff, 1.45);
    backRimLight.position.set(0.4, -2.4, -4.4);
    scene.add(backRimLight);

    // Build the shared 5-part Reliquary Ring Model in its locked, assembled state
    const maxAniso = renderer.capabilities.getMaxAnisotropy() || 1;
    const ringModel: ReliquaryRingParts = buildReliquaryRingModel(maxAniso);
    // Hide the 3D axis lines because this study uses the subtle circular background reticle
    ringModel.guideLines.visible = false;
    scene.add(ringModel.rootGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const baseRootY = 0;
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastHudUpdate = 0;

    stateRef.current.enterStartTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
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

    function applyPoseAndRender(now: number) {
      const st = stateRef.current;
      // Under software WebGL, treat initial pose as settled (elapsedSec = 2.0) so screenshots are immediately crisp and stable
      const elapsedSec = isSoftwareGl
        ? 2.0
        : Math.max(0, (now - st.enterStartTime) / 1000);

      const pose = computeHouseRingStudyPose(
        elapsedSec,
        st.userAzimuthOffset,
        st.userElevationOffset,
        st.reducedMotion || isSoftwareGl,
        st.userHasInteracted
      );

      ringModel.rootGroup.position.set(0, baseRootY + pose.settleOffsetY, 0);

      const cosElev = Math.cos(pose.elevation);
      const camX = Math.sin(pose.azimuth) * cosElev * pose.distance;
      const camY = Math.sin(pose.elevation) * pose.distance;
      const camZ = Math.cos(pose.azimuth) * cosElev * pose.distance;

      camera.position.set(camX, camY, camZ);
      camera.lookAt(0.05, 0.02, -0.02);

      if (now - lastHudUpdate > 140) {
        lastHudUpdate = now;
        setAzimuthDeg(Math.round((pose.azimuth * 180) / Math.PI));
        setElevationDeg(Math.round((pose.elevation * 180) / Math.PI));
      }

      renderer.render(scene, camera);
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        renderDirty = false;
        applyPoseAndRender(now);

        const st = stateRef.current;
        const shouldContinueLoop =
          st.isInViewport &&
          !st.reducedMotion &&
          !isSoftwareGl &&
          !st.userHasInteracted;

        const done = () => {
          renderBusy = false;
          if (renderDirty || shouldContinueLoop) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    stateRef.current.requestRender = requestRender;

    // Draw initial frame 0 synchronously so the canvas is immediately populated on mount
    applyPoseAndRender(performance.now());
    requestRender();

    // IntersectionObserver to trigger entrance settle on viewport entry and pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const st = stateRef.current;
        const wasInViewport = st.isInViewport;
        st.isInViewport = entry.isIntersecting;

        if (entry.isIntersecting && !st.hasEnteredViewport) {
          st.hasEnteredViewport = true;
          st.enterStartTime = performance.now();
        }
        if (entry.isIntersecting && !wasInViewport) {
          requestRender();
        }
      },
      { threshold: 0.12 }
    );

    if (figureRef.current) {
      intersectionObserver.observe(figureRef.current);
    }

    // ResizeObserver for responsive sizing
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(260, container.clientWidth || 440);
      const h = Math.max(260, container.clientHeight || 440);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      applyPoseAndRender(performance.now());
      requestRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pointer drag handlers for 3D inspection (does not capture wheel or vertical touch scroll)
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const st = stateRef.current;
      st.isDragging = true;
      st.userHasInteracted = true;
      st.dragStartX = e.clientX;
      st.dragStartY = e.clientY;
      st.dragStartAzimuth = st.userAzimuthOffset;
      st.dragStartElevation = st.userElevationOffset;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const st = stateRef.current;
      if (!st.isDragging) return;
      const dx = e.clientX - st.dragStartX;
      const dy = e.clientY - st.dragStartY;
      st.userAzimuthOffset = THREE.MathUtils.clamp(
        st.dragStartAzimuth - dx * 0.0085,
        -Math.PI * 1.25,
        Math.PI * 1.25
      );
      st.userElevationOffset = THREE.MathUtils.clamp(
        st.dragStartElevation + dy * 0.0065,
        -0.68,
        0.78
      );
      setViewModified(
        Math.abs(st.userAzimuthOffset) > 0.01 ||
          Math.abs(st.userElevationOffset) > 0.01
      );
      requestRender();
    };

    const onPointerUp = (e: PointerEvent) => {
      stateRef.current.isDragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const onContextRestored = () => {
      setWebglUnavailable(false);
      requestRender();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      ringModel.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    stateRef.current.requestRender();
  }, [reducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 0.18;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      adjustStudyAngle(-step, 0);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      adjustStudyAngle(step, 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      adjustStudyAngle(0, step * 0.75);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      adjustStudyAngle(0, -step * 0.75);
    } else if (e.key === 'r' || e.key === 'R' || e.key === 'Home') {
      e.preventDefault();
      resetStudyView();
    }
  };

  return (
    <figure
      ref={figureRef}
      className="relative border border-white/25 bg-black flex flex-col"
    >
      {/* Top Catalogue Header Bar */}
      <div className="px-5 sm:px-7 py-4 border-b border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70 tracking-[0.16em]">
        <span>FIG. 01 · 3D MATERIAL &amp; FORM STUDY</span>
        <span className="tabular-nums">
          SCALE 2 : 1 · {azimuthDeg}° / {elevationDeg}°
        </span>
      </div>

      {/* Interactive 3D Study Stage with Subtle Background Calibration Reticle */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Interactive 3D material and form study of the Reliquary signet ring in 925 sterling silver. Use Left, Right, Up, and Down arrow keys or drag to inspect the ring. Press R or Home to reset the view."
        onKeyDown={handleKeyDown}
        data-testid="house-3d-study-viewport"
        data-view-modified={viewModified ? 'true' : 'false'}
        className="relative w-full aspect-square max-h-[460px] morta-ring-light overflow-hidden cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        {/* Subtle Circular Guides & Crosshairs Behind the 3D Model (Decorative, out of accessibility tree) */}
        {!webglUnavailable && !showReferenceOverlay && (
          <svg
            viewBox="0 0 360 360"
            className="pointer-events-none absolute inset-0 w-full h-full text-white z-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Axis hairlines */}
            <line
              x1="180"
              y1="20"
              x2="180"
              y2="340"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 6"
              opacity="0.22"
            />
            <line
              x1="20"
              y1="180"
              x2="340"
              y2="180"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 6"
              opacity="0.22"
            />
            {/* Outer & inner calibration rings framing the 3D piece */}
            <circle
              cx="180"
              cy="180"
              r="146"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.18"
            />
            <circle
              cx="180"
              cy="180"
              r="108"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="2 5"
              opacity="0.24"
            />
            {/* Corner datum ticks */}
            <path
              d="M32 48 V32 H48 M312 32 H328 V48 M32 312 V328 H48 M312 328 H328 V312"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.28"
            />
          </svg>
        )}

        {/* Dedicated Three.js Canvas Mount */}
        <div
          ref={canvasMountRef}
          className={`w-full h-full relative z-10 ${
            webglUnavailable || showReferenceOverlay ? 'hidden' : 'block'
          }`}
        />

        {/* Static Reference / No-WebGL Fallback */}
        {(webglUnavailable || showReferenceOverlay) && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black p-6 relative z-10">
            <MortaImage
              asset={MORTA_ASSETS.reliquaryRing}
              priority={false}
              className="w-full max-w-[320px] border border-white/20"
            />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-white/75 text-center">
              {webglUnavailable
                ? 'STATIC STUDY FALLBACK · 01 RELIQUARY SIGNET (925 STERLING)'
                : 'REFERENCE PHOTOGRAPH · 01 RELIQUARY SIGNET'}
            </p>
          </div>
        )}

        {/* Unobtrusive Inspection Prompt */}
        {!webglUnavailable && !showReferenceOverlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-3 z-20 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-white/55 tracking-[0.12em]"
          >
            <span className="truncate">925 STERLING SILVER</span>
            <span className="hidden sm:inline">
              DRAG OR USE ARROW KEYS TO INSPECT
            </span>
            <span className="sm:hidden">DRAG / ARROWS</span>
          </div>
        )}
      </div>

      {/* Accessible Camera Orientation Controls */}
      <div className="px-4 sm:px-6 py-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 bg-black">
        <button
          type="button"
          onClick={() => setShowReferenceOverlay((prev) => !prev)}
          aria-pressed={showReferenceOverlay}
          aria-label={
            showReferenceOverlay
              ? 'Return to 3D ring study'
              : 'View reference photograph for Reliquary ring study'
          }
          className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/80 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
        >
          {showReferenceOverlay ? 'Return to 3D' : 'Reference plate'}
        </button>
      </div>

      {/* Catalogue Caption Footer */}
      <figcaption className="px-5 sm:px-7 py-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70">
        <span>STUDY I — 01 RELIQUARY SIGNET (THE UNSET CHAMBER)</span>
        <span className="tabular-nums">VOID Ø 18.2 MM · 24.6 G</span>
      </figcaption>
    </figure>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/HouseSection.tsx">
<![CDATA[import React from 'react';
import { SectionHandoffRule } from './MortaMark';
import { HouseRingStudy3D } from './HouseRingStudy3D';

interface HouseSectionProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

export const HouseSection: React.FC<HouseSectionProps> = ({
  reducedMotion,
}) => {
  return (
    <section
      id="house"
      aria-labelledby="house-heading"
      className="relative morta-atmosphere border-b border-white/20"
    >
      <SectionHandoffRule chapterNumber="CH. II" chapterLabel="The House" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Oversized Editorial Statement & House Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">
              FIRST PRINCIPLE · METAL SHAPED AROUND AN ABSENCE
            </p>

            <h2
              id="house-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Objects of devotion,
              <br />
              made to endure.
            </h2>

            <div className="w-24 h-px bg-white/40" aria-hidden="true" />

            <div className="space-y-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              <p>
                Each MORTA piece gives form to the space it surrounds, from
                the hollow of a signet to the curve of a finger.
              </p>
              <p>
                Cast in solid 925 silver and finished by hand, each form
                gathers the marks of a life worn.
              </p>
            </div>

            {/* Key House Tenets (Unboxed clean metadata grid) */}
            <dl className="pt-8 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                  01 · Materiality
                </dt>
                <dd className="text-sm text-white/90 leading-relaxed">
                  Solid 925 silver, oxidized and burnished by hand.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                  02 · Architecture
                </dt>
                <dd className="text-sm text-white/90 leading-relaxed">
                  Pointed arches and stepped forms frame quiet space.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                  03 · Permanence
                </dt>
                <dd className="text-sm text-white/90 leading-relaxed">
                  Small editions and solitary commissions made to endure.
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Dimensional 3D Material & Form Study of the Reliquary Ring */}
          <div className="lg:col-span-5">
            <HouseRingStudy3D reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/MortaImage.tsx">
<![CDATA[import React, { useState } from 'react';
import { AssetDefinition } from '../utils/mortaLogic';
import { PointedSealOrnament } from './MortaMark';

interface MortaImageProps {
  asset: AssetDefinition;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Monochrome editorial image component that reserves exact intrinsic dimensions
 * to prevent layout shift, attempts primary then fallback asset paths, and renders
 * a clearly labelled, dimensionally stable placeholder identifying the missing filename
 * if an attachment cannot be loaded.
 */
export const MortaImage: React.FC<MortaImageProps> = ({
  asset,
  priority = false,
  className = '',
  imgClassName = '',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(asset.primarySrc);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  const handleError = () => {
    if (currentSrc === asset.primarySrc && asset.fallbackSrc !== asset.primarySrc) {
      setCurrentSrc(asset.fallbackSrc);
    } else {
      setHasFailed(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      style={{
        aspectRatio: `${asset.width} / ${asset.height}`,
      }}
    >
      {!hasFailed ? (
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
          className={`w-full h-full object-cover grayscale contrast-110 select-none ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={`Missing image asset: ${asset.filename}. ${asset.alt}`}
          className="w-full h-full flex flex-col items-center justify-center p-8 border border-white/30 bg-black text-center"
        >
          <PointedSealOrnament className="w-6 h-8 text-white/60 mb-4" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white mb-2">
            Missing Asset Plate
          </p>
          <p className="font-mono text-xs text-white/80 mb-3">
            {asset.filename}
          </p>
          <p className="text-xs text-white/60 max-w-xs leading-relaxed">
            Reserved {asset.width} × {asset.height} frame for {asset.stem}
          </p>
        </div>
      )}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/components/MortaMark.tsx">
<![CDATA[import React from 'react';

interface MortaMarkProps {
  size?: number;
  className?: string;
}

/**
 * Original MORTA house emblem:
 * A pointed jewel shape above an M-like set of fine lines, held inside a circular ring.
 * Designed to remain crisp and recognisable down to 16px favicon scale.
 */
export const MortaMark: React.FC<MortaMarkProps> = ({
  size = 32,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      {/* Outer circular ring */}
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Inner fine engraved ring */}
      <circle
        cx="32"
        cy="32"
        r="25.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        opacity="0.65"
      />
      {/* Pointed jewel shape at the crown */}
      <path
        d="M32 9L38.5 19.5L32 26.5L25.5 19.5L32 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Internal facet line of the pointed jewel */}
      <line
        x1="32"
        y1="9"
        x2="32"
        y2="26.5"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.8"
      />
      {/* M-like set of fine architectural lines below */}
      <path
        d="M18.5 47V27.5L32 39.5L45.5 27.5V47"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Secondary fine inner M-pillars */}
      <path
        d="M22.5 47V33.5M41.5 47V33.5"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.75"
      />
      {/* Central plumb rule anchoring jewel to base */}
      <line
        x1="32"
        y1="26.5"
        x2="32"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
};

export const PointedSealOrnament: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="M10 1L18.5 13.5L10 26.5L1.5 13.5L10 1Z"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="10" cy="13.5" r="3" stroke="currentColor" strokeWidth="0.85" />
    <line
      x1="10"
      y1="1"
      x2="10"
      y2="26.5"
      stroke="currentColor"
      strokeWidth="0.6"
      opacity="0.6"
    />
  </svg>
);

export const SectionHandoffRule: React.FC<{
  chapterNumber: string;
  chapterLabel: string;
}> = ({ chapterNumber, chapterLabel }) => (
  <div
    className="w-full max-w-[1920px] mx-auto px-6 md:px-8"
    role="presentation"
  >
    <div className="relative flex items-center justify-between py-6 border-t border-white/25">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.22em] text-white/70 tabular-nums">
          {chapterNumber}
        </span>
        <span className="text-white/30" aria-hidden="true">
          ·
        </span>
        <span className="font-mono text-xs tracking-[0.18em] uppercase text-white/80">
          {chapterLabel}
        </span>
      </div>
      <div className="flex items-center gap-3" aria-hidden="true">
        <div className="w-12 h-px bg-white/30" />
        <PointedSealOrnament className="w-3.5 h-5 text-white/65" />
      </div>
    </div>
  </div>
);
]]>
    </file>
    <file path="src/app/(morta)/morta/components/ReliquaryRing3D.tsx">
<![CDATA[import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Assembly3DState, MORTA_ASSETS } from '../utils/mortaLogic';
import {
  buildReliquaryRingModel,
  createDarkJewelleryStudioEnv,
  detectSoftwareGl,
  ReliquaryRingParts,
} from '../utils/reliquaryRingBuilder';
import { MortaImage } from './MortaImage';

interface ReliquaryRing3DProps {
  assembly3D: Assembly3DState;
  reducedMotion: boolean;
}

export const ReliquaryRing3D: React.FC<ReliquaryRing3DProps> = ({
  assembly3D,
  reducedMotion,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);
  const [showReferenceOverlay, setShowReferenceOverlay] =
    useState<boolean>(false);
  const [viewModified, setViewModified] = useState<boolean>(false);
  const [azimuthDeg, setAzimuthDeg] = useState<number>(37);
  const [elevationDeg, setElevationDeg] = useState<number>(18);

  // Mutable ref holding latest props & user camera offset so we never tear down the WebGL context
  const stateRef = useRef({
    targetAssembly: assembly3D,
    reducedMotion,
    userAzimuthOffset: 0,
    userElevationOffset: 0,
    userZoomOffset: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartAzimuth: 0,
    dragStartElevation: 0,
    requestRender: () => {},
  });

  stateRef.current.targetAssembly = assembly3D;
  stateRef.current.reducedMotion = reducedMotion;

  const adjustInspectionAngle = useCallback(
    (deltaAzimuthRad: number, deltaElevationRad: number) => {
      const st = stateRef.current;
      st.userAzimuthOffset = THREE.MathUtils.clamp(
        st.userAzimuthOffset + deltaAzimuthRad,
        -Math.PI * 1.25,
        Math.PI * 1.25
      );
      st.userElevationOffset = THREE.MathUtils.clamp(
        st.userElevationOffset + deltaElevationRad,
        -0.68,
        0.78
      );
      setViewModified(
        Math.abs(st.userAzimuthOffset) > 0.01 ||
          Math.abs(st.userElevationOffset) > 0.01
      );
      st.requestRender();
    },
    []
  );

  const resetInspectionView = useCallback(() => {
    const st = stateRef.current;
    st.userAzimuthOffset = 0;
    st.userElevationOffset = 0;
    st.userZoomOffset = 0;
    setViewModified(false);
    st.requestRender();
  }, []);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(280, container.clientWidth || 520);
    const height = Math.max(280, container.clientHeight || 520);
    renderer.setSize(width, height, false);

    const canvas = renderer.domElement;
    canvas.className = 'w-full h-full block select-none';
    canvas.style.touchAction = 'pan-y';
    container.innerHTML = '';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.038);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 40);

    // High-contrast Dark Jewellery Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const studioEnv = createDarkJewelleryStudioEnv();
    const envTarget = pmremGenerator.fromScene(studioEnv.scene, 0.035);
    scene.environment = envTarget.texture;
    studioEnv.dispose();
    pmremGenerator.dispose();

    // Controlled 3-Point Studio Lighting for Sterling Silver against Black
    const hemiLight = new THREE.HemisphereLight(0xd8e0ec, 0x0c0d10, 0.38);
    scene.add(hemiLight);

    // 1. Key Light (upper-left front softbox direction)
    const keyLight = new THREE.DirectionalLight(0xfffdf8, 2.2);
    keyLight.position.set(-3.2, 4.8, 4.4);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 14;
      const d = 2.6;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // 2. Grazing Right Shoulder Light (rakes across the intaglio gothic trefoil engraving and inner hoop)
    const shoulderRimLight = new THREE.DirectionalLight(0xdce5f5, 1.85);
    shoulderRimLight.position.set(4.8, 1.6, 2.4);
    scene.add(shoulderRimLight);

    // 3. Back Edge Separation Rim Light (keeps dark silver silhouette legible against pure black)
    const backRimLight = new THREE.DirectionalLight(0xffffff, 1.45);
    backRimLight.position.set(0.4, -2.4, -4.4);
    scene.add(backRimLight);

    // Soft radial contact shadow disc grounding the ring from below
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 6, 64, 64, 62);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.035)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const pedestalTex = new THREE.CanvasTexture(shadowCanvas);
    const pedestalGeo = new THREE.CircleGeometry(2.3, 48);
    pedestalGeo.rotateX(-Math.PI / 2);
    pedestalGeo.translate(0, -1.28, -0.12);
    const pedestalMat = new THREE.MeshBasicMaterial({
      map: pedestalTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    scene.add(pedestalMesh);

    // Build the 5-part Reliquary Ring Model
    const maxAniso = renderer.capabilities.getMaxAnisotropy() || 1;
    const ringModel: ReliquaryRingParts = buildReliquaryRingModel(maxAniso);
    scene.add(ringModel.rootGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Current interpolated state (pre-allocated to avoid GC in render loop)
    const initialTarget = stateRef.current.targetAssembly;
    const currentParts = {
      outerBezel: {
        pos: [...initialTarget.parts.outerBezel.position] as [number, number, number],
        rot: [...initialTarget.parts.outerBezel.rotation] as [number, number, number],
      },
      recessedChamber: {
        pos: [...initialTarget.parts.recessedChamber.position] as [number, number, number],
        rot: [...initialTarget.parts.recessedChamber.rotation] as [number, number, number],
      },
      leftShoulder: {
        pos: [...initialTarget.parts.leftShoulder.position] as [number, number, number],
        rot: [...initialTarget.parts.leftShoulder.rotation] as [number, number, number],
      },
      rightShoulder: {
        pos: [...initialTarget.parts.rightShoulder.position] as [number, number, number],
        rot: [...initialTarget.parts.rightShoulder.rotation] as [number, number, number],
      },
      lowerShank: {
        pos: [...initialTarget.parts.lowerShank.position] as [number, number, number],
        rot: [...initialTarget.parts.lowerShank.rotation] as [number, number, number],
      },
    };

    let currentAzimuth =
      initialTarget.cameraOrbitOffset.azimuth +
      stateRef.current.userAzimuthOffset;
    let currentElevation =
      initialTarget.cameraOrbitOffset.elevation +
      stateRef.current.userElevationOffset;
    let currentDistance =
      initialTarget.cameraOrbitOffset.distance +
      stateRef.current.userZoomOffset;

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();
    let lastHudUpdate = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
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

    function stepPart(
      curr: { pos: [number, number, number]; rot: [number, number, number] },
      targ: { position: [number, number, number]; rotation: [number, number, number] },
      group: THREE.Group,
      dt: number,
      snapImmediate: boolean
    ): number {
      let maxDelta = 0;
      for (let i = 0; i < 3; i++) {
        if (snapImmediate) {
          curr.pos[i] = targ.position[i];
          curr.rot[i] = targ.rotation[i];
        } else {
          curr.pos[i] = THREE.MathUtils.damp(
            curr.pos[i],
            targ.position[i],
            9.5,
            dt
          );
          curr.rot[i] = THREE.MathUtils.damp(
            curr.rot[i],
            targ.rotation[i],
            9.5,
            dt
          );
          maxDelta = Math.max(
            maxDelta,
            Math.abs(curr.pos[i] - targ.position[i]),
            Math.abs(curr.rot[i] - targ.rotation[i])
          );
        }
      }
      group.position.set(curr.pos[0], curr.pos[1], curr.pos[2]);
      group.rotation.set(curr.rot[0], curr.rot[1], curr.rot[2]);
      return maxDelta;
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        renderDirty = false;
        const dt = Math.min(0.06, Math.max(0.001, (now - lastTime) / 1000));
        lastTime = now;

        const st = stateRef.current;
        const target = st.targetAssembly;
        const snap = st.reducedMotion || isSoftwareGl;

        let maxResidual = 0;
        maxResidual = Math.max(
          maxResidual,
          stepPart(
            currentParts.outerBezel,
            target.parts.outerBezel,
            ringModel.outerBezel,
            dt,
            snap
          ),
          stepPart(
            currentParts.recessedChamber,
            target.parts.recessedChamber,
            ringModel.recessedChamber,
            dt,
            snap
          ),
          stepPart(
            currentParts.leftShoulder,
            target.parts.leftShoulder,
            ringModel.leftShoulder,
            dt,
            snap
          ),
          stepPart(
            currentParts.rightShoulder,
            target.parts.rightShoulder,
            ringModel.rightShoulder,
            dt,
            snap
          ),
          stepPart(
            currentParts.lowerShank,
            target.parts.lowerShank,
            ringModel.lowerShank,
            dt,
            snap
          )
        );

        const targetAzimuth =
          target.cameraOrbitOffset.azimuth + st.userAzimuthOffset;
        const targetElevation =
          target.cameraOrbitOffset.elevation + st.userElevationOffset;
        const targetDistance =
          target.cameraOrbitOffset.distance + st.userZoomOffset;

        if (snap) {
          currentAzimuth = targetAzimuth;
          currentElevation = targetElevation;
          currentDistance = targetDistance;
        } else {
          currentAzimuth = THREE.MathUtils.damp(
            currentAzimuth,
            targetAzimuth,
            10,
            dt
          );
          currentElevation = THREE.MathUtils.damp(
            currentElevation,
            targetElevation,
            10,
            dt
          );
          currentDistance = THREE.MathUtils.damp(
            currentDistance,
            targetDistance,
            10,
            dt
          );
          maxResidual = Math.max(
            maxResidual,
            Math.abs(currentAzimuth - targetAzimuth),
            Math.abs(currentElevation - targetElevation),
            Math.abs(currentDistance - targetDistance)
          );
        }

        // Fade architectural guide lines out once ring is locked
        const guideMat = ringModel.guideLines.material as THREE.LineBasicMaterial;
        guideMat.opacity = (1 - target.lockProgress) * 0.24;
        ringModel.guideLines.visible = guideMat.opacity > 0.01;

        // Spherical camera coordinates looking at the ring centre
        const cosElev = Math.cos(currentElevation);
        const camX = Math.sin(currentAzimuth) * cosElev * currentDistance;
        const camY = Math.sin(currentElevation) * currentDistance;
        const camZ = Math.cos(currentAzimuth) * cosElev * currentDistance;

        camera.position.set(camX, camY, camZ);
        camera.lookAt(0.05, 0.02, -0.02);

        if (now - lastHudUpdate > 120) {
          lastHudUpdate = now;
          setAzimuthDeg(Math.round((currentAzimuth * 180) / Math.PI));
          setElevationDeg(Math.round((currentElevation * 180) / Math.PI));
        }

        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (renderDirty || maxResidual > 0.0015) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    stateRef.current.requestRender = requestRender;

    // Apply initial pose and draw frame 0 synchronously so the canvas is never blank on initial mount
    stepPart(
      currentParts.outerBezel,
      initialTarget.parts.outerBezel,
      ringModel.outerBezel,
      0.016,
      true
    );
    stepPart(
      currentParts.recessedChamber,
      initialTarget.parts.recessedChamber,
      ringModel.recessedChamber,
      0.016,
      true
    );
    stepPart(
      currentParts.leftShoulder,
      initialTarget.parts.leftShoulder,
      ringModel.leftShoulder,
      0.016,
      true
    );
    stepPart(
      currentParts.rightShoulder,
      initialTarget.parts.rightShoulder,
      ringModel.rightShoulder,
      0.016,
      true
    );
    stepPart(
      currentParts.lowerShank,
      initialTarget.parts.lowerShank,
      ringModel.lowerShank,
      0.016,
      true
    );
    const initCosElev = Math.cos(currentElevation);
    camera.position.set(
      Math.sin(currentAzimuth) * initCosElev * currentDistance,
      Math.sin(currentElevation) * currentDistance,
      Math.cos(currentAzimuth) * initCosElev * currentDistance
    );
    camera.lookAt(0.05, 0.02, -0.02);
    renderer.render(scene, camera);

    requestRender();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(280, container.clientWidth || 520);
      const h = Math.max(280, container.clientHeight || 520);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.render(scene, camera);
      requestRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pointer drag handlers for 3D inspection (does not capture wheel scroll)
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const st = stateRef.current;
      st.isDragging = true;
      st.dragStartX = e.clientX;
      st.dragStartY = e.clientY;
      st.dragStartAzimuth = st.userAzimuthOffset;
      st.dragStartElevation = st.userElevationOffset;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const st = stateRef.current;
      if (!st.isDragging) return;
      const dx = e.clientX - st.dragStartX;
      const dy = e.clientY - st.dragStartY;
      st.userAzimuthOffset = THREE.MathUtils.clamp(
        st.dragStartAzimuth - dx * 0.0085,
        -Math.PI * 1.25,
        Math.PI * 1.25
      );
      st.userElevationOffset = THREE.MathUtils.clamp(
        st.dragStartElevation + dy * 0.0065,
        -0.68,
        0.78
      );
      setViewModified(
        Math.abs(st.userAzimuthOffset) > 0.01 ||
          Math.abs(st.userElevationOffset) > 0.01
      );
      requestRender();
    };

    const onPointerUp = (e: PointerEvent) => {
      stateRef.current.isDragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    // Context loss safety
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const onContextRestored = () => {
      setWebglUnavailable(false);
      requestRender();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      ringModel.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();
      pedestalTex.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  // Trigger render whenever assembly3D or reducedMotion changes
  useEffect(() => {
    stateRef.current.requestRender();
  }, [assembly3D, reducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 0.18;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      adjustInspectionAngle(-step, 0);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      adjustInspectionAngle(step, 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      adjustInspectionAngle(0, step * 0.75);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      adjustInspectionAngle(0, -step * 0.75);
    } else if (e.key === 'r' || e.key === 'R' || e.key === 'Home') {
      e.preventDefault();
      resetInspectionView();
    }
  };

  return (
    <div className="flex flex-col border border-white/25 bg-black">
      {/* Top Viewport Header Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70">
        <div className="flex items-center gap-2">
          <span>FIG. 02 · 3D RELIQUARY SIGNET ASSEMBLY</span>
        </div>
        <div className="flex items-center gap-3 tabular-nums">
          <span>
            VIEW {azimuthDeg}° / {elevationDeg}°
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {assembly3D.isLocked ? 'STATUS: LOCKED' : 'STATUS: ASSEMBLING'}
          </span>
        </div>
      </div>

      {/* Interactive 3D Canvas Stage (with keyboard operation & fallback) */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`Interactive 3D Reliquary signet ring assembly. Current stage: ${assembly3D.stageTitle}. Use Left, Right, Up, and Down arrow keys or drag to inspect the ring. Press R or Home to reset the view.`}
        onKeyDown={handleKeyDown}
        data-testid="reliquary-3d-viewport"
        data-stage-index={assembly3D.stageIndex}
        data-view-modified={viewModified ? 'true' : 'false'}
        className="relative w-full aspect-square max-h-[520px] morta-ring-light overflow-hidden cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        {/* Dedicated empty mount div for Three.js WebGL canvas */}
        <div
          ref={canvasMountRef}
          className={`w-full h-full ${
            webglUnavailable || showReferenceOverlay ? 'hidden' : 'block'
          }`}
        />

        {/* Fallback or Reference Comparison Plate */}
        {(webglUnavailable || showReferenceOverlay) && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black p-6">
            <MortaImage
              asset={MORTA_ASSETS.reliquaryRing}
              priority={false}
              className="w-full max-w-[360px] border border-white/20"
            />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-white/75 text-center">
              {webglUnavailable
                ? 'STATIC REFERENCE FALLBACK · 01 RELIQUARY SIGNET (925 STERLING)'
                : 'REFERENCE PHOTOGRAPH · 01 RELIQUARY SIGNET'}
            </p>
          </div>
        )}

        {/* Understated corner guide callouts (pointer-events-none so they never obstruct 3D drag) */}
        {!webglUnavailable && !showReferenceOverlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-3 flex items-center justify-between text-[11px] font-mono text-white/55 tracking-[0.14em]"
          >
            <span>925 STERLING SILVER</span>
            <span>DRAG OR USE ARROW KEYS TO INSPECT</span>
          </div>
        )}
      </div>

      {/* Bottom Accessible Inspection & Camera Control Strip */}
      <div className="px-4 sm:px-6 py-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 bg-black">
        <button
          type="button"
          onClick={() => setShowReferenceOverlay((prev) => !prev)}
          aria-pressed={showReferenceOverlay}
          className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/80 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
        >
          {showReferenceOverlay ? 'Return to 3D model' : 'Reference plate'}
        </button>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(morta)/morta/utils/mortaLogic.ts">
<![CDATA[export interface AssetDefinition {
  stem: string;
  filename: string;
  primarySrc: string;
  fallbackSrc: string;
  width: number;
  height: number;
  alt: string;
}

export interface CollectionItem {
  id: string;
  number: string;
  name: string;
  category: string;
  subtitle: string;
  material: string;
  weight: string;
  dimensions: string;
  editionNote: string;
  description: string;
  architecturalNote: string;
  craftDetail: string;
  asset: AssetDefinition;
}

export interface ContourTransform {
  id: string;
  label: string;
  translateX: number;
  translateY: number;
  rotate: number;
  scale: number;
  opacity: number;
  strokeDashoffset: number;
}

export interface Part3DTransform {
  id: string;
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  clearanceMm: number;
}

export interface Assembly3DState {
  clampedProgress: number;
  lockProgress: number;
  isLocked: boolean;
  stageIndex: number;
  stageCode: string;
  stageTitle: string;
  stageDescription: string;
  cameraOrbitOffset: {
    azimuth: number;
    elevation: number;
    distance: number;
  };
  parts: {
    outerBezel: Part3DTransform;
    recessedChamber: Part3DTransform;
    leftShoulder: Part3DTransform;
    rightShoulder: Part3DTransform;
    lowerShank: Part3DTransform;
  };
}

export interface AssemblyState {
  clampedProgress: number;
  lockProgress: number;
  isLocked: boolean;
  stageIndex: number;
  stageCode: string;
  stageTitle: string;
  stageDescription: string;
  contours: {
    outerArch: ContourTransform;
    innerVoid: ContourTransform;
    leftShoulder: ContourTransform;
    rightShoulder: ContourTransform;
    lowerShank: ContourTransform;
    engravedHatching: ContourTransform;
    pointedSeal: ContourTransform;
  };
  assembly3D: Assembly3DState;
}

export interface CommissionFormInput {
  name: string;
  email: string;
  pieceReference: string;
  description: string;
}

export interface CommissionValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    pieceReference?: string;
    description?: string;
  };
}

export interface HouseRingStudyPose {
  azimuth: number;
  elevation: number;
  distance: number;
  settleOffsetY: number;
  isSettled: boolean;
}

export const MORTA_ASSETS: Record<string, AssetDefinition> = {
  hero: {
    stem: 'morta-hero',
    filename: 'morta-hero.png',
    primarySrc: '/templates/morta/morta-hero.webp',
    fallbackSrc: '/templates/morta/morta-hero.webp',
    width: 2400,
    height: 1792,
    alt: 'Sculptural sterling-silver pointed-arch signet ring resting in deep shadow with engraved gothic tracery on its shoulders.',
  },
  reliquaryRing: {
    stem: 'morta-reliquary-ring',
    filename: 'morta-reliquary-ring.png',
    primarySrc: '/templates/morta/morta-reliquary-ring.webp',
    fallbackSrc: '/templates/morta/morta-reliquary-ring.webp',
    width: 1792,
    height: 2400,
    alt: 'Reliquary signet ring in oxidized and brushed 925 sterling silver with a recessed pointed-arch bezel on dark slate.',
  },
  thornPendant: {
    stem: 'morta-thorn-pendant',
    filename: 'morta-thorn-pendant.png',
    primarySrc: '/templates/morta/morta-thorn-pendant.webp',
    fallbackSrc: '/templates/morta/morta-thorn-pendant.webp',
    width: 1792,
    height: 2400,
    alt: 'Thorn pendant in sterling silver featuring pierced lancet tracery tapering to a sharp vertical point on a fine chain.',
  },
  vigilEarrings: {
    stem: 'morta-vigil-earrings',
    filename: 'morta-vigil-earrings.png',
    primarySrc: '/templates/morta/morta-vigil-earrings.webp',
    fallbackSrc: '/templates/morta/morta-vigil-earrings.webp',
    width: 1792,
    height: 2400,
    alt: 'Pair of Vigil drop earrings in sterling silver with open pointed-arch upper frames suspending articulated tapered pendulums.',
  },
  craft: {
    stem: 'morta-craft',
    filename: 'morta-craft.png',
    primarySrc: '/templates/morta/morta-craft.webp',
    fallbackSrc: '/templates/morta/morta-craft.webp',
    width: 2400,
    height: 1792,
    alt: 'Silversmith hands at a wooden bench pin engraving a sterling-silver band with a wooden-handled steel graver.',
  },
  bespoke: {
    stem: 'morta-bespoke',
    filename: 'morta-bespoke.png',
    primarySrc: '/templates/morta/morta-bespoke.webp',
    fallbackSrc: '/templates/morta/morta-bespoke.webp',
    width: 1792,
    height: 2400,
    alt: 'Graphite study sketches of sculptural rings beside a jeweller’s needle file and a finished satin-brushed silver ring.',
  },
};

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: 'reliquary',
    number: '01',
    name: 'Reliquary',
    category: 'Signet ring',
    subtitle: 'Recessed Lancet Bezel',
    material: '925 Sterling Silver',
    weight: '24.6 g',
    dimensions: '21 mm face · 5.5 mm tapered shank',
    editionNote: 'Numbered edition',
    description:
      'An architectural signet cast around a sunken pointed-arch chamber. Instead of a set stone, the recessed face holds shadow and hand-burnished contact marks.',
    architecturalNote:
      'Constructed with a stepped two-tier ogival bezel and trefoil-engraved shoulders that distribute weight evenly across the finger.',
    craftDetail:
      'Lost-wax cast in heavy gauge sterling, darkened in liver of sulphur, and relieved by hand on slate and boxwood laps.',
    asset: MORTA_ASSETS.reliquaryRing,
  },
  {
    id: 'thorn',
    number: '02',
    name: 'Thorn',
    category: 'Pendant',
    subtitle: 'Pierced Tracery Spire',
    material: '925 Sterling Silver',
    weight: '16.2 g',
    dimensions: '54 mm drop · 14 mm span · 55 cm chain',
    editionNote: 'Small batch',
    description:
      'Intersecting ribs of silver enclose a central quatrefoil void before converging into a single plumb point that rests against the sternum.',
    architecturalNote:
      'Symmetrical rib vaulting allows light and dark fabric beneath to become the core of the piece, framing negative space in crisp relief.',
    craftDetail:
      'Hand-pierced internal apertures finished with silk-threaded abrasive cord before final hard-buffing along the outer spines.',
    asset: MORTA_ASSETS.thornPendant,
  },
  {
    id: 'vigil',
    number: '03',
    name: 'Vigil',
    category: 'Drop earrings',
    subtitle: 'Articulated Arch & Pendulum',
    material: '925 Sterling Silver',
    weight: '11.8 g (pair)',
    dimensions: '62 mm total drop · 13 mm arch width',
    editionNote: 'Made to order',
    description:
      'A pair of open lancet arches suspending faceted silver plummets. The hinged junction permits quiet, measured movement below a stationary frame.',
    architecturalNote:
      'Balanced so the upper gothic arch remains vertical while the lower four-sided needle responds to the wearer’s turn of the head.',
    craftDetail:
      'Forged ear wires soldered to cast tracery heads, linked via hand-turned jump rings to cold-hammered and faceted drops.',
    asset: MORTA_ASSETS.vigilEarrings,
  },
];

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number): number {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}

function lerp(start: number, end: number, t: number): number {
  return Number((start + (end - start) * t).toFixed(3));
}

/**
 * Computes the 3D Reliquary signet ring assembly state across the 4 stages:
 * 1. Dispersed (0.0): Separated into 5 sculptural sterling components around a shared centre.
 * 2. Converging (0.35): Components draw toward one another with controlled movement.
 * 3. Aligning (0.65): Components rotate into exact axial alignment showing how the stepped lancet face, chamber, shoulders, and shank meet.
 * 4. Locked ring (1.0): Joined into the complete Reliquary signet ring in a three-quarter reference view.
 */
export function compute3DReliquaryAssembly(
  rawProgress: number,
  reducedMotion = false,
  hasExplicitStageSelection = false
): Assembly3DState {
  const effectiveRaw =
    reducedMotion && !hasExplicitStageSelection ? 1 : clamp01(rawProgress);
  const normalizedLock = clamp01(effectiveRaw / 0.92);
  // Balanced smoothstep curve so Stage 2 (0.35 -> ~42%) and Stage 3 (0.65 -> ~78%) are visually distinct
  const posT = Number(
    (
      normalizedLock *
      normalizedLock *
      (3 - 2 * normalizedLock)
    ).toFixed(3)
  );
  // Rotations align by Stage 3 (Aligning at 0.65) so Stage 3 clearly shows true axial alignment before final seat
  const rotNorm = clamp01(effectiveRaw / 0.64);
  const rotT = Number((rotNorm * rotNorm * (3 - 2 * rotNorm)).toFixed(3));
  const isLocked = normalizedLock >= 0.98;

  let stageIndex = 0;
  let stageCode = 'STAGE I · 01 / 04';
  let stageTitle = 'Dispersed Components';
  let stageDescription =
    'The Reliquary signet is separated into its five structural elements: the stepped lancet bezel, sunken oxidized chamber, left and right engraved trefoil shoulders, and tapered sterling shank.';

  if (effectiveRaw >= 0.85 || isLocked) {
    stageIndex = 3;
    stageCode = 'STAGE IV · 04 / 04';
    stageTitle = 'Locked Ring Silhouette';
    stageDescription =
      'Bezel, sunken chamber, engraved spandrel shoulders, and tapered band lock into the complete Reliquary signet. Drag or use the arrow keys to inspect the ring in three dimensions.';
  } else if (effectiveRaw >= 0.52) {
    stageIndex = 2;
    stageCode = 'STAGE III · 03 / 04';
    stageTitle = 'Axial Alignment';
    stageDescription =
      'Each silver component rotates into true axial alignment, revealing how the stepped ogival bezel seats over the oxidized chamber and meets the engraved shoulders.';
  } else if (effectiveRaw >= 0.22) {
    stageIndex = 1;
    stageCode = 'STAGE II · 02 / 04';
    stageTitle = 'Converging Around the Void';
    stageDescription =
      'The outer lancet frame and carved shoulders draw inward toward the central aperture, narrowing the clearance around the unset chamber.';
  }

  const invPos = 1 - posT;
  const invRot = 1 - rotT;

  return {
    clampedProgress: effectiveRaw,
    lockProgress: posT,
    isLocked,
    stageIndex,
    stageCode,
    stageTitle,
    stageDescription,
    cameraOrbitOffset: {
      // Positive azimuth places camera to front-right looking toward front-left,
      // matching morta-reliquary-ring.png (lancet face on left, engraved shoulder & hoop extending right)
      azimuth: lerp(0.56, 0.72, posT),
      elevation: lerp(0.44, 0.42, posT),
      distance: lerp(7.4, 5.85, posT),
    },
    parts: {
      outerBezel: {
        id: 'outer-bezel',
        label: 'Stepped Lancet Bezel',
        position: [
          lerp(-0.15, 0, posT),
          lerp(0.46, 0, posT),
          lerp(1.38, 0, posT),
        ],
        rotation: [
          lerp(-0.24, 0, rotT),
          lerp(-0.18, 0, rotT),
          lerp(0.08, 0, rotT),
        ],
        clearanceMm: Number((invPos * 14.0).toFixed(1)),
      },
      recessedChamber: {
        id: 'recessed-chamber',
        label: 'Oxidized Reliquary Chamber',
        position: [
          lerp(-0.05, 0, posT),
          lerp(0.16, 0, posT),
          lerp(0.64, 0, posT),
        ],
        rotation: [
          lerp(0.14, 0, rotT),
          lerp(0.12, 0, rotT),
          lerp(-0.06, 0, rotT),
        ],
        clearanceMm: Number((invPos * 6.4).toFixed(1)),
      },
      leftShoulder: {
        id: 'left-shoulder',
        label: 'West Trefoil Shoulder',
        position: [
          lerp(-1.18, 0, posT),
          lerp(0.06, 0, posT),
          lerp(-0.08, 0, posT),
        ],
        rotation: [
          lerp(0.08, 0, rotT),
          lerp(0.32, 0, rotT),
          lerp(0.12, 0, rotT),
        ],
        clearanceMm: Number((invPos * 11.8).toFixed(1)),
      },
      rightShoulder: {
        id: 'right-shoulder',
        label: 'East Trefoil Shoulder',
        position: [
          lerp(1.18, 0, posT),
          lerp(-0.06, 0, posT),
          lerp(-0.08, 0, posT),
        ],
        rotation: [
          lerp(-0.08, 0, rotT),
          lerp(-0.32, 0, rotT),
          lerp(-0.12, 0, rotT),
        ],
        clearanceMm: Number((invPos * 11.8).toFixed(1)),
      },
      lowerShank: {
        id: 'lower-shank',
        label: 'Tapered Sterling Shank',
        position: [
          lerp(0.08, 0, posT),
          lerp(-0.42, 0, posT),
          lerp(-1.24, 0, posT),
        ],
        rotation: [
          lerp(0.26 * invRot, 0, 1),
          lerp(-0.14 * invRot, 0, 1),
          0,
        ],
        clearanceMm: Number((invPos * 12.4).toFixed(1)),
      },
    },
  };
}

/**
 * Computes the scroll-linked ring assembly state (both 2D metrics and 3D Reliquary assembly).
 */
export function computeAssemblyState(
  rawProgress: number,
  reducedMotion = false,
  hasExplicitStageSelection = false
): AssemblyState {
  const effectiveRaw =
    reducedMotion && !hasExplicitStageSelection ? 1 : clamp01(rawProgress);
  const normalizedLock = clamp01(effectiveRaw / 0.88);
  const t = easeOutCubic(normalizedLock);
  const assembly3D = compute3DReliquaryAssembly(
    rawProgress,
    reducedMotion,
    hasExplicitStageSelection
  );

  return {
    clampedProgress: assembly3D.clampedProgress,
    lockProgress: assembly3D.lockProgress,
    isLocked: assembly3D.isLocked,
    stageIndex: assembly3D.stageIndex,
    stageCode: assembly3D.stageCode,
    stageTitle: assembly3D.stageTitle,
    stageDescription: assembly3D.stageDescription,
    assembly3D,
    contours: {
      outerArch: {
        id: 'outer-arch',
        label: 'Outer Lancet Bezel',
        translateX: lerp(0, 0, t),
        translateY: lerp(-96, 0, t),
        rotate: lerp(-8, 0, t),
        scale: lerp(1.18, 1, t),
        opacity: lerp(0.38, 1, t),
        strokeDashoffset: lerp(180, 0, t),
      },
      innerVoid: {
        id: 'inner-void',
        label: 'Recessed Void Aperture',
        translateX: lerp(0, 0, t),
        translateY: lerp(-42, 0, t),
        rotate: lerp(6, 0, t),
        scale: lerp(0.76, 1, t),
        opacity: lerp(0.45, 1, t),
        strokeDashoffset: lerp(120, 0, t),
      },
      leftShoulder: {
        id: 'left-shoulder',
        label: 'West Tracery Shoulder',
        translateX: lerp(-112, 0, t),
        translateY: lerp(18, 0, t),
        rotate: lerp(-18, 0, t),
        scale: lerp(1.08, 1, t),
        opacity: lerp(0.32, 1, t),
        strokeDashoffset: lerp(140, 0, t),
      },
      rightShoulder: {
        id: 'right-shoulder',
        label: 'East Tracery Shoulder',
        translateX: lerp(112, 0, t),
        translateY: lerp(18, 0, t),
        rotate: lerp(18, 0, t),
        scale: lerp(1.08, 1, t),
        opacity: lerp(0.32, 1, t),
        strokeDashoffset: lerp(140, 0, t),
      },
      lowerShank: {
        id: 'lower-shank',
        label: 'Tapered Sterling Shank',
        translateX: lerp(0, 0, t),
        translateY: lerp(104, 0, t),
        rotate: lerp(0, 0, t),
        scale: lerp(1.15, 1, t),
        opacity: lerp(0.35, 1, t),
        strokeDashoffset: lerp(160, 0, t),
      },
      engravedHatching: {
        id: 'engraved-hatching',
        label: 'Graver Hatching Lines',
        translateX: lerp(0, 0, t),
        translateY: lerp(28, 0, t),
        rotate: lerp(0, 0, t),
        scale: lerp(1.24, 1, t),
        opacity: lerp(0.15, 0.9, t),
        strokeDashoffset: lerp(90, 0, t),
      },
      pointedSeal: {
        id: 'pointed-seal',
        label: 'Central Pointed Seal',
        translateX: lerp(0, 0, t),
        translateY: lerp(-64, 0, t),
        rotate: lerp(45, 0, t),
        scale: lerp(0.65, 1, t),
        opacity: lerp(0.2, 1, t),
        strokeDashoffset: lerp(60, 0, t),
      },
    },
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates the bespoke commission enquiry form without substituting fallback values.
 */
export function validateCommissionForm(
  input: CommissionFormInput
): CommissionValidationResult {
  const errors: CommissionValidationResult['errors'] = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedPiece = input.pieceReference.trim();
  const trimmedDescription = input.description.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name so we may address our reply.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for commission correspondence.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (for example, name@domain.com).';
  }

  if (!trimmedPiece) {
    errors.pieceReference = 'Please select a starting form or commission study.';
  }

  if (!trimmedDescription) {
    errors.description =
      'Please include a brief description of the piece, proportions, or inscription you have in mind.';
  } else if (trimmedDescription.length < 15) {
    errors.description =
      'Please share at least 15 characters describing your intended form, scale, or wear.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Computes the 3D camera & entrance settle pose for the "Objects of devotion" (House) 3D ring study.
 * Respects prefers-reduced-motion by returning a finished static three-quarter view with zero automatic motion.
 */
export function computeHouseRingStudyPose(
  elapsedSec: number,
  userAzimuthOffset = 0,
  userElevationOffset = 0,
  reducedMotion = false,
  userHasInteracted = false
): HouseRingStudyPose {
  const baseAzimuth = 0.70; // ~40 deg three-quarter view showing lancet face, recessed chamber, and engraved shoulder
  const baseElevation = 0.40; // ~23 deg elevation showing depth of circular band
  const baseDistance = 6.35;

  const clampedUserAz = Math.max(
    -Math.PI * 1.25,
    Math.min(Math.PI * 1.25, userAzimuthOffset)
  );
  const clampedUserEl = Math.max(
    -0.68,
    Math.min(0.78, userElevationOffset)
  );

  if (reducedMotion) {
    return {
      azimuth: Number((baseAzimuth + clampedUserAz).toFixed(4)),
      elevation: Number((baseElevation + clampedUserEl).toFixed(4)),
      distance: baseDistance,
      settleOffsetY: 0,
      isSettled: true,
    };
  }

  const safeElapsed = Math.max(0, elapsedSec);
  const settleT = easeOutCubic(clamp01(safeElapsed / 1.4));
  const settleOffsetY = lerp(-0.14, 0, settleT);
  const distance = lerp(6.65, baseDistance, settleT);

  // Subtle, slow rotation revealing the depth of the piece when idle
  const swayEnvelope = userHasInteracted ? 0 : settleT;
  const autoAzimuth = Math.sin(safeElapsed * 0.55) * 0.11 * swayEnvelope;
  const autoElevation = Math.cos(safeElapsed * 0.42) * 0.025 * swayEnvelope;

  return {
    azimuth: Number((baseAzimuth + autoAzimuth + clampedUserAz).toFixed(4)),
    elevation: Number(
      (baseElevation + autoElevation + clampedUserEl).toFixed(4)
    ),
    distance,
    settleOffsetY,
    isSettled: settleT >= 0.99,
  };
}

]]>
    </file>
    <file path="src/app/(morta)/morta/utils/reliquaryRingBuilder.ts">
<![CDATA[import * as THREE from 'three';

export interface ReliquaryRingParts {
  rootGroup: THREE.Group;
  outerBezel: THREE.Group;
  recessedChamber: THREE.Group;
  leftShoulder: THREE.Group;
  rightShoulder: THREE.Group;
  lowerShank: THREE.Group;
  guideLines: THREE.LineSegments;
  dispose: () => void;
}

/**
 * Shared software WebGL detection helper used across 3D ring scenes.
 */
export function detectSoftwareGl(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      probeCanvas.getContext('webgl2') ||
      probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

/**
 * Builds the shared high-contrast dark jewellery studio environment for PMREMGenerator.
 * Surround the ring with deep obsidian walls and crisp overhead/grazing studio softboxes.
 */
export function createDarkJewelleryStudioEnv(): {
  scene: THREE.Scene;
  dispose: () => void;
} {
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x050507);

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const addSoftbox = (
    w: number,
    h: number,
    colorHex: number,
    intensity: number,
    pos: [number, number, number],
    lookAt: [number, number, number]
  ) => {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorHex).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    envScene.add(mesh);
    geometries.push(geo);
    materials.push(mat);
  };

  // 1. Primary Key Softbox (upper front-left, catches the stepped lancet bezel & shoulder crown)
  addSoftbox(7.5, 5.0, 0xf6f8fc, 2.6, [-4.5, 5.8, 5.2], [0, 0, 0]);

  // 2. Right Shoulder Grazing Strip Softbox (illuminates the intaglio trefoil spandrel engraving & hoop)
  addSoftbox(6.5, 4.2, 0xe8eef8, 2.2, [6.2, 2.4, 3.4], [0, 0, 0]);

  // 3. Top-Back Arch Rim Strip (defines the pointed apex and rear shank contour against black)
  addSoftbox(8.0, 2.6, 0xffffff, 2.4, [0.5, 6.2, -5.0], [0, 0, 0]);

  // 4. Subtle Lower Slate Bounce (prevents lower bevels from clipping to dead black)
  addSoftbox(9.0, 6.0, 0x262930, 0.85, [0, -5.5, 1.5], [0, 0, 0]);

  // 5. Front-Right Fill Card (soft pewter midtone reflection across the flat signet table)
  addSoftbox(4.5, 4.5, 0x7a808c, 1.15, [2.8, -0.6, 6.0], [0, 0, 0]);

  return {
    scene: envScene,
    dispose: () => {
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
    },
  };
}

/**
 * Evaluates the outer flank of the upright pointed-arch lancet contour for s in [-1, +1]:
 * s = -1 is the bottom corner of the bezel flank,
 * s = -0.35 is the springing point,
 * s = +1 is the top pointed apex junction.
 */
function sampleLancetFlank(
  s: number,
  width: number,
  height: number
): { x: number; y: number } {
  const halfW = width * 0.5;
  const yBot = -height * 0.46;
  const ySpring = -height * 0.10;
  const yTop = height * 0.54;

  const t = THREE.MathUtils.clamp((s + 1) * 0.5, 0, 1);

  if (t <= 0.32) {
    const u = t / 0.32;
    const cornerEase = Math.min(1, u / 0.22);
    const x = halfW * (0.90 + 0.10 * Math.sin(cornerEase * Math.PI * 0.5));
    const y = THREE.MathUtils.lerp(yBot, ySpring, u);
    return { x, y };
  } else {
    const u = (t - 0.32) / 0.68;
    const inv = 1 - u;
    const p0x = halfW;
    const p0y = ySpring;
    const p1x = halfW;
    const p1y = ySpring + height * 0.35;
    const p2x = halfW * 0.52;
    const p2y = yTop - height * 0.11;
    const p3x = halfW * 0.08;
    const p3y = yTop - height * 0.015;

    const x =
      inv * inv * inv * p0x +
      3 * inv * inv * u * p1x +
      3 * inv * u * u * p2x +
      u * u * u * p3x;
    const y =
      inv * inv * inv * p0y +
      3 * inv * inv * u * p1y +
      3 * inv * u * u * p2y +
      u * u * u * p3y;
    return { x, y };
  }
}

/**
 * Evaluates the 2D pointed Gothic lancet arch contour (x, y) matching morta-reliquary-ring.png.
 */
function createLancetShape(width: number, height: number): THREE.Shape {
  const w = width * 0.5;
  const hBottom = -height * 0.46;
  const hSpring = -height * 0.10;
  const hTop = height * 0.54;
  const corner = width * 0.05;

  const shape = new THREE.Shape();
  shape.moveTo(-w + corner, hBottom);
  shape.lineTo(w - corner, hBottom);
  shape.quadraticCurveTo(w, hBottom, w, hBottom + corner);
  shape.lineTo(w, hSpring);
  shape.bezierCurveTo(
    w,
    hSpring + height * 0.35,
    w * 0.50,
    hTop - height * 0.12,
    0,
    hTop
  );
  shape.bezierCurveTo(
    -w * 0.50,
    hTop - height * 0.12,
    -w,
    hSpring + height * 0.35,
    -w,
    hSpring
  );
  shape.lineTo(-w, hBottom + corner);
  shape.quadraticCurveTo(-w, hBottom, -w + corner, hBottom);

  return shape;
}

function createLancetPath(width: number, height: number): THREE.Path {
  const w = width * 0.5;
  const hBottom = -height * 0.46;
  const hSpring = -height * 0.10;
  const hTop = height * 0.54;
  const corner = width * 0.04;

  const path = new THREE.Path();
  path.moveTo(-w + corner, hBottom);
  path.lineTo(w - corner, hBottom);
  path.quadraticCurveTo(w, hBottom, w, hBottom + corner);
  path.lineTo(w, hSpring);
  path.bezierCurveTo(
    w,
    hSpring + height * 0.35,
    w * 0.50,
    hTop - height * 0.12,
    0,
    hTop
  );
  path.bezierCurveTo(
    -w * 0.50,
    hTop - height * 0.12,
    -w,
    hSpring + height * 0.35,
    -w,
    hSpring
  );
  path.lineTo(-w, hBottom + corner);
  path.quadraticCurveTo(-w, hBottom, -w + corner, hBottom);

  return path;
}

interface SharedSilverTextures {
  brushedBumpTex: THREE.CanvasTexture;
  chamberAlbedoTex: THREE.CanvasTexture;
  shoulderAlbedoTex: THREE.CanvasTexture;
  shoulderBumpTex: THREE.CanvasTexture;
}

let cachedSilverTextures: SharedSilverTextures | null = null;

/**
 * Generates (and caches across sections) procedural brushed & patinated sterling silver textures
 * and the intaglio shoulder gothic tracery engraving textures matching morta-reliquary-ring.png.
 */
function getSharedSilverTextures(maxAnisotropy: number): SharedSilverTextures {
  if (cachedSilverTextures) {
    cachedSilverTextures.brushedBumpTex.anisotropy = Math.max(
      cachedSilverTextures.brushedBumpTex.anisotropy,
      maxAnisotropy
    );
    cachedSilverTextures.chamberAlbedoTex.anisotropy = Math.max(
      cachedSilverTextures.chamberAlbedoTex.anisotropy,
      maxAnisotropy
    );
    cachedSilverTextures.shoulderAlbedoTex.anisotropy = Math.max(
      cachedSilverTextures.shoulderAlbedoTex.anisotropy,
      maxAnisotropy
    );
    cachedSilverTextures.shoulderBumpTex.anisotropy = Math.max(
      cachedSilverTextures.shoulderBumpTex.anisotropy,
      maxAnisotropy
    );
    return cachedSilverTextures;
  }

  // 1. Brushed & micro-scratched silver bump/roughness map
  const brushCanvas = document.createElement('canvas');
  brushCanvas.width = 512;
  brushCanvas.height = 512;
  const bCtx = brushCanvas.getContext('2d');
  if (bCtx) {
    bCtx.fillStyle = '#848488';
    bCtx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 1500; i++) {
      const y = (i * 19.3) % 512;
      const lum = 108 + ((i * 37) % 52);
      bCtx.strokeStyle = `rgba(${lum}, ${lum}, ${lum}, 0.20)`;
      bCtx.lineWidth = 0.7 + (i % 2) * 0.5;
      bCtx.beginPath();
      bCtx.moveTo(0, y);
      bCtx.lineTo(512, y + ((i % 7) - 3) * 3);
      bCtx.stroke();
    }

    for (let i = 0; i < 280; i++) {
      const x1 = (i * 73.1) % 512;
      const y1 = (i * 41.7) % 512;
      const angle = ((i * 1.9) % 3.14) - 1.57;
      const len = 10 + (i % 38);
      const isDark = i % 3 !== 0;
      bCtx.strokeStyle = isDark
        ? 'rgba(28, 28, 32, 0.42)'
        : 'rgba(225, 228, 235, 0.30)';
      bCtx.lineWidth = 0.7 + (i % 3) * 0.4;
      bCtx.beginPath();
      bCtx.moveTo(x1, y1);
      bCtx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
      bCtx.stroke();
    }
  }

  const brushedBumpTex = new THREE.CanvasTexture(brushCanvas);
  brushedBumpTex.wrapS = THREE.RepeatWrapping;
  brushedBumpTex.wrapT = THREE.RepeatWrapping;
  brushedBumpTex.repeat.set(2, 2);
  brushedBumpTex.anisotropy = maxAnisotropy;

  // 2. Oxidized sunken reliquary chamber texture (albedo + bump)
  const chamberColorCanvas = document.createElement('canvas');
  chamberColorCanvas.width = 512;
  chamberColorCanvas.height = 512;
  const cCtx = chamberColorCanvas.getContext('2d');
  if (cCtx) {
    const grad = cCtx.createRadialGradient(256, 248, 24, 256, 256, 260);
    grad.addColorStop(0, '#646870');
    grad.addColorStop(0.52, '#3a3d42');
    grad.addColorStop(1, '#16181c');
    cCtx.fillStyle = grad;
    cCtx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 650; i++) {
      const x = (i * 17.3) % 512;
      const y = (i * 29.1) % 512;
      const len = 28 + (i % 95);
      const v = i % 2 === 0 ? 115 : 28;
      cCtx.strokeStyle = `rgba(${v}, ${v}, ${v + 3}, 0.25)`;
      cCtx.lineWidth = 0.9;
      cCtx.beginPath();
      cCtx.moveTo(x, y);
      cCtx.lineTo(x + ((i % 5) - 2) * 2, y + len);
      cCtx.stroke();
    }

    for (let i = 0; i < 150; i++) {
      const x = 75 + ((i * 53) % 360);
      const y = 70 + ((i * 67) % 370);
      const dx = ((i * 19) % 46) - 23;
      const dy = ((i * 23) % 48) - 24;
      cCtx.strokeStyle =
        i % 3 === 0 ? 'rgba(162, 166, 174, 0.32)' : 'rgba(12, 13, 16, 0.60)';
      cCtx.lineWidth = 1.25;
      cCtx.beginPath();
      cCtx.moveTo(x, y);
      cCtx.lineTo(x + dx, y + dy);
      cCtx.stroke();
    }
  }

  const chamberAlbedoTex = new THREE.CanvasTexture(chamberColorCanvas);
  chamberAlbedoTex.colorSpace = THREE.SRGBColorSpace;
  chamberAlbedoTex.anisotropy = maxAnisotropy;

  // 3. High-resolution (1024x1024) Shoulder Intaglio Engraving Texture (Albedo + Bump/Height)
  const shColorCanvas = document.createElement('canvas');
  shColorCanvas.width = 1024;
  shColorCanvas.height = 1024;
  const scCtx = shColorCanvas.getContext('2d');

  const shBumpCanvas = document.createElement('canvas');
  shBumpCanvas.width = 1024;
  shBumpCanvas.height = 1024;
  const sbCtx = shBumpCanvas.getContext('2d');

  if (scCtx && sbCtx) {
    scCtx.fillStyle = '#c8ccd4';
    scCtx.fillRect(0, 0, 1024, 1024);

    sbCtx.fillStyle = '#d8d8d8';
    sbCtx.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 2200; i++) {
      const x = (i * 47.3) % 1024;
      const y = (i * 31.7) % 1024;
      const ang = ((i * 1.3) % 3.14) - 1.57;
      const len = 16 + (i % 58);
      const dark = i % 2 === 0;
      scCtx.strokeStyle = dark
        ? 'rgba(46, 48, 54, 0.16)'
        : 'rgba(246, 248, 252, 0.18)';
      scCtx.lineWidth = 1.1;
      scCtx.beginPath();
      scCtx.moveTo(x, y);
      scCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      scCtx.stroke();

      sbCtx.strokeStyle = dark
        ? 'rgba(125, 125, 125, 0.25)'
        : 'rgba(240, 240, 240, 0.25)';
      sbCtx.lineWidth = 1.1;
      scCtx.beginPath();
      sbCtx.moveTo(x, y);
      scCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      sbCtx.stroke();
    }

    const drawEngravedStroke = (
      drawFn: (ctx: CanvasRenderingContext2D) => void,
      lineWidth: number
    ) => {
      scCtx.save();
      scCtx.strokeStyle = 'rgba(248, 250, 255, 0.55)';
      scCtx.lineWidth = lineWidth + 5.0;
      scCtx.lineCap = 'round';
      scCtx.lineJoin = 'round';
      drawFn(scCtx);
      scCtx.stroke();
      scCtx.restore();

      scCtx.save();
      scCtx.strokeStyle = '#0c0d10';
      scCtx.lineWidth = lineWidth;
      scCtx.lineCap = 'round';
      scCtx.lineJoin = 'round';
      drawFn(scCtx);
      scCtx.stroke();
      scCtx.restore();

      sbCtx.save();
      sbCtx.strokeStyle = '#080808';
      sbCtx.lineWidth = lineWidth + 3.0;
      sbCtx.lineCap = 'round';
      scCtx.lineJoin = 'round';
      drawFn(sbCtx);
      sbCtx.stroke();
      sbCtx.restore();
    };

    const drawEngravedPocket = (
      drawFn: (ctx: CanvasRenderingContext2D) => void
    ) => {
      scCtx.save();
      scCtx.fillStyle = '#0e1014';
      scCtx.strokeStyle = 'rgba(245, 248, 255, 0.50)';
      scCtx.lineWidth = 4.0;
      drawFn(scCtx);
      scCtx.fill();
      scCtx.stroke();
      scCtx.restore();

      sbCtx.save();
      sbCtx.fillStyle = '#0a0a0a';
      drawFn(sbCtx);
      sbCtx.fill();
      sbCtx.restore();
    };

    const cy = 512;
    const span = 425;

    for (const dir of [-1, 1]) {
      // 1. Front vertical-parallel border line right behind the smooth front arch bevel
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(78, cy + dir * span * 0.94);
        ctx.quadraticCurveTo(92, cy + dir * span * 0.48, 88, cy);
      }, 8.5);

      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(104, cy + dir * span * 0.87);
        ctx.quadraticCurveTo(114, cy + dir * span * 0.45, 110, cy);
      }, 6.0);

      // 2. Outer pointed gothic shoulder frame sweeping along the upper/lower edge
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(78, cy + dir * span * 0.94);
        ctx.quadraticCurveTo(
          335,
          cy + dir * span * 0.60,
          635,
          cy + dir * span * 0.15
        );
      }, 9.0);

      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(104, cy + dir * span * 0.86);
        ctx.quadraticCurveTo(
          325,
          cy + dir * span * 0.52,
          575,
          cy + dir * span * 0.17
        );
      }, 6.0);

      // 3. Central cusped Gothic lancet arch curving from mid-shoulder forward to bezel
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(540, cy);
        ctx.quadraticCurveTo(
          330,
          cy + dir * span * 0.18,
          106,
          cy + dir * span * 0.78
        );
      }, 9.0);

      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(485, cy);
        ctx.quadraticCurveTo(
          310,
          cy + dir * span * 0.14,
          112,
          cy + dir * span * 0.68
        );
      }, 6.5);

      // Inner gothic cusp foil inside the central shoulder arch
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(114, cy + dir * span * 0.56);
        ctx.quadraticCurveTo(
          258,
          cy + dir * span * 0.28,
          315,
          cy + dir * span * 0.17
        );
        ctx.quadraticCurveTo(
          238,
          cy + dir * span * 0.05,
          200,
          cy
        );
      }, 7.0);

      // 4. Recessed oxidized three-lobed trefoil spandrel cutout
      drawEngravedPocket((ctx) => {
        ctx.beginPath();
        ctx.moveTo(132, cy + dir * span * 0.76);
        ctx.quadraticCurveTo(
          200,
          cy + dir * span * 0.66,
          232,
          cy + dir * span * 0.54
        );
        ctx.quadraticCurveTo(
          302,
          cy + dir * span * 0.45,
          352,
          cy + dir * span * 0.33
        );
        ctx.quadraticCurveTo(
          262,
          cy + dir * span * 0.29,
          216,
          cy + dir * span * 0.40
        );
        ctx.quadraticCurveTo(
          162,
          cy + dir * span * 0.50,
          132,
          cy + dir * span * 0.76
        );
        ctx.closePath();
      });
    }
  }

  const shoulderAlbedoTex = new THREE.CanvasTexture(shColorCanvas);
  shoulderAlbedoTex.colorSpace = THREE.SRGBColorSpace;
  shoulderAlbedoTex.anisotropy = maxAnisotropy;

  const shoulderBumpTex = new THREE.CanvasTexture(shBumpCanvas);
  shoulderBumpTex.anisotropy = maxAnisotropy;

  cachedSilverTextures = {
    brushedBumpTex,
    chamberAlbedoTex,
    shoulderAlbedoTex,
    shoulderBumpTex,
  };

  return cachedSilverTextures;
}

/**
 * Builds the seamless 3D signet shoulder (`leftShoulder` or `rightShoulder`).
 * The finger hole is a vertical cylinder along the Y-axis centered at (0, y, hoopCenterZ = -0.60)
 * with radius rInner = 0.94, so in the three-quarter view the circular band extends clearly
 * to the right of the shoulder and reveals the illuminated inner hoop wall.
 */
function createSeamlessShoulderGroup(
  side: 1 | -1,
  shoulderMat: THREE.MeshPhysicalMaterial,
  disposables: Array<{ dispose: () => void }>
): THREE.Group {
  const group = new THREE.Group();

  const uSteps = 44;
  const vSteps = 52;
  const rInner = 0.94;
  const hoopCenterZ = -0.60;
  const frontBezelZ = 0.52;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const evalOuterPoint = (u: number, v: number): THREE.Vector3 => {
    const s = (v - 0.5) * 2;

    const flank = sampleLancetFlank(s, 1.68, 2.26);
    const frontX = side * flank.x;
    const frontY = flank.y;
    const frontZ = frontBezelZ - (1 - Math.cos(s * Math.PI * 0.45)) * 0.035;

    const theta = THREE.MathUtils.lerp(0.38, 1.72, u);
    const easeU = u * u * (3 - 2 * u);
    const swoopU = 1 - Math.pow(1 - u, 1.85);

    const yBotHoop = THREE.MathUtils.lerp(-1.03, -0.35, swoopU);
    const yTopHoop = THREE.MathUtils.lerp(1.15, 0.35, swoopU);
    const hoopY = THREE.MathUtils.lerp(yBotHoop, yTopHoop, v);

    const wallThick = THREE.MathUtils.lerp(0.26, 0.18, easeU);
    const verticalCrown = Math.cos(s * Math.PI * 0.46);
    const rOuter = rInner + wallThick * (0.68 + 0.32 * verticalCrown);

    const hoopX = side * Math.sin(theta) * rOuter;
    const hoopZ = hoopCenterZ + Math.cos(theta) * rOuter;

    const blendXZ = Math.pow(u, 0.62);
    const x = THREE.MathUtils.lerp(frontX, hoopX, blendXZ);
    const y = THREE.MathUtils.lerp(frontY, hoopY, swoopU);
    const z = THREE.MathUtils.lerp(frontZ, hoopZ, Math.pow(u, 0.78));

    return new THREE.Vector3(x, y, z);
  };

  const outerGrid: THREE.Vector3[][] = [];
  for (let iu = 0; iu <= uSteps; iu++) {
    const u = iu / uSteps;
    const row: THREE.Vector3[] = [];
    for (let iv = 0; iv <= vSteps; iv++) {
      const v = iv / vSteps;
      row.push(evalOuterPoint(u, v));
    }
    outerGrid.push(row);
  }

  for (let iu = 0; iu <= uSteps; iu++) {
    const u = iu / uSteps;
    for (let iv = 0; iv <= vSteps; iv++) {
      const v = iv / vSteps;
      const p = outerGrid[iu][iv];

      const pUPrev = outerGrid[Math.max(0, iu - 1)][iv];
      const pUNext = outerGrid[Math.min(uSteps, iu + 1)][iv];
      const dU = new THREE.Vector3().subVectors(pUNext, pUPrev);

      const pVPrev = outerGrid[iu][Math.max(0, iv - 1)];
      const pVNext = outerGrid[iu][Math.min(vSteps, iv + 1)];
      const dV = new THREE.Vector3().subVectors(pVNext, pVPrev);

      const n =
        side === 1
          ? new THREE.Vector3().crossVectors(dU, dV).normalize()
          : new THREE.Vector3().crossVectors(dV, dU).normalize();

      positions.push(p.x, p.y, p.z);
      normals.push(n.x, n.y, n.z);
      uvs.push(u, v);
    }
  }

  const baseVertCount = (uSteps + 1) * (vSteps + 1);
  for (let iu = 0; iu <= uSteps; iu++) {
    const u = iu / uSteps;
    const theta = THREE.MathUtils.lerp(0.38, 1.72, u);
    const swoopU = 1 - Math.pow(1 - u, 1.85);
    const yBotInner = THREE.MathUtils.lerp(-0.95, -0.35, swoopU);
    const yTopInner = THREE.MathUtils.lerp(1.04, 0.35, swoopU);
    const sinT = side * Math.sin(theta);
    const cosT = Math.cos(theta);

    for (let iv = 0; iv <= vSteps; iv++) {
      const v = iv / vSteps;
      const y = THREE.MathUtils.lerp(yBotInner, yTopInner, v);
      const x = sinT * rInner;
      const z = hoopCenterZ + cosT * rInner;

      positions.push(x, y, z);
      normals.push(-sinT, 0, -cosT);
      uvs.push(u, v);
    }
  }

  const stride = vSteps + 1;
  for (let iu = 0; iu < uSteps; iu++) {
    for (let iv = 0; iv < vSteps; iv++) {
      const a = iu * stride + iv;
      const b = (iu + 1) * stride + iv;
      const c = (iu + 1) * stride + (iv + 1);
      const d = iu * stride + (iv + 1);

      if (side === 1) {
        indices.push(a, b, c, a, c, d);
      } else {
        indices.push(a, c, b, a, d, c);
      }

      const ia = baseVertCount + a;
      const ib = baseVertCount + b;
      const ic = baseVertCount + c;
      const id = baseVertCount + d;

      if (side === 1) {
        indices.push(ia, ic, ib, ia, id, ic);
      } else {
        indices.push(ia, ib, ic, ia, ic, id);
      }
    }

    const topOutA = iu * stride + vSteps;
    const topOutB = (iu + 1) * stride + vSteps;
    const topInA = baseVertCount + topOutA;
    const topInB = baseVertCount + topOutB;

    const botOutA = iu * stride;
    const botOutB = (iu + 1) * stride;
    const botInA = baseVertCount + botOutA;
    const botInB = baseVertCount + botOutB;

    if (side === 1) {
      indices.push(topOutA, topOutB, topInB, topOutA, topInB, topInA);
      indices.push(botOutA, botInB, botOutB, botOutA, botInA, botInB);
    } else {
      indices.push(topOutA, topInB, topOutB, topOutA, topInA, topInB);
      indices.push(botOutA, botOutB, botInB, botOutA, botInB, botInA);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  disposables.push(geo);

  const mesh = new THREE.Mesh(geo, shoulderMat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  return group;
}

/**
 * Builds the complete 5-part 3D Reliquary signet ring model reconstructed from morta-reliquary-ring.png.
 * Reuses shared procedural silver textures so multiple views (House Study & Signature Assembly) remain lightweight.
 */
export function buildReliquaryRingModel(maxAnisotropy = 4): ReliquaryRingParts {
  const disposables: Array<{ dispose: () => void }> = [];
  const {
    brushedBumpTex,
    chamberAlbedoTex,
    shoulderAlbedoTex,
    shoulderBumpTex,
  } = getSharedSilverTextures(maxAnisotropy);

  // 1. Brushed 925 Sterling Silver Material (satin pewter-silver sheen with micro-scratch relief)
  const brushedSilverMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xc6cad2),
    metalness: 0.92,
    roughness: 0.26,
    bumpMap: brushedBumpTex,
    bumpScale: 0.014,
    roughnessMap: brushedBumpTex,
    anisotropy: 0.5,
    anisotropyRotation: 0.25,
    clearcoat: 0.12,
    clearcoatRoughness: 0.36,
    envMapIntensity: 1.40,
    side: THREE.DoubleSide,
  });

  // 2. Engraved Shoulder Sterling Silver Material (smooth mesh normals + high-res intaglio gothic spandrel tracery)
  const engravedShoulderMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xd2d6de),
    map: shoulderAlbedoTex,
    bumpMap: shoulderBumpTex,
    bumpScale: 0.036,
    roughnessMap: brushedBumpTex,
    metalness: 0.91,
    roughness: 0.25,
    anisotropy: 0.45,
    clearcoat: 0.14,
    clearcoatRoughness: 0.32,
    envMapIntensity: 1.40,
    side: THREE.DoubleSide,
  });

  // 3. Polished Sterling Chamfer / Bevel Highlight Material (crisp specular arris on stepped lancet rims)
  const polishedArrisMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xdee2ea),
    metalness: 0.95,
    roughness: 0.16,
    bumpMap: brushedBumpTex,
    bumpScale: 0.006,
    clearcoat: 0.22,
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.55,
  });

  // 4. Oxidized Sunken Reliquary Chamber Material (darkened liver-of-sulphur patina with hand-stoned marks)
  const oxidizedChamberMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    map: chamberAlbedoTex,
    bumpMap: chamberAlbedoTex,
    bumpScale: 0.028,
    roughnessMap: brushedBumpTex,
    metalness: 0.72,
    roughness: 0.62,
    envMapIntensity: 0.68,
  });

  // 5. Deep Oxidized Groove / Recess Channel Material
  const deepGrooveMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x101114),
    metalness: 0.55,
    roughness: 0.82,
    envMapIntensity: 0.3,
  });

  disposables.push(
    brushedSilverMat,
    engravedShoulderMat,
    polishedArrisMat,
    oxidizedChamberMat,
    deepGrooveMat
  );

  const rootGroup = new THREE.Group();

  // ============================================================================
  // PART 1: OUTER STEPPED LANCET BEZEL (outerBezel)
  // ============================================================================
  const outerBezel = new THREE.Group();

  const outerFrameShape = createLancetShape(1.66, 2.24);
  const outerHolePath = createLancetPath(1.42, 1.96);
  outerFrameShape.holes.push(outerHolePath);

  const outerFrameGeo = new THREE.ExtrudeGeometry(outerFrameShape, {
    steps: 1,
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.042,
    bevelSize: 0.032,
    bevelSegments: 4,
    curveSegments: 40,
  });
  outerFrameGeo.translate(0, 0, 0.52);
  disposables.push(outerFrameGeo);

  const outerFrameMesh = new THREE.Mesh(outerFrameGeo, polishedArrisMat);
  outerFrameMesh.castShadow = true;
  outerFrameMesh.receiveShadow = true;
  outerBezel.add(outerFrameMesh);

  const grooveShape = createLancetShape(1.46, 2.00);
  const grooveHole = createLancetPath(1.28, 1.80);
  grooveShape.holes.push(grooveHole);
  const grooveGeo = new THREE.ExtrudeGeometry(grooveShape, {
    steps: 1,
    depth: 0.12,
    bevelEnabled: false,
    curveSegments: 36,
  });
  grooveGeo.translate(0, 0, 0.52);
  disposables.push(grooveGeo);
  const grooveMesh = new THREE.Mesh(grooveGeo, deepGrooveMat);
  outerBezel.add(grooveMesh);

  const innerLipShape = createLancetShape(1.32, 1.84);
  const innerLipHole = createLancetPath(1.14, 1.64);
  innerLipShape.holes.push(innerLipHole);

  const innerLipGeo = new THREE.ExtrudeGeometry(innerLipShape, {
    steps: 1,
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.026,
    bevelSize: 0.022,
    bevelSegments: 3,
    curveSegments: 36,
  });
  innerLipGeo.translate(0, 0, 0.51);
  disposables.push(innerLipGeo);

  const innerLipMesh = new THREE.Mesh(innerLipGeo, polishedArrisMat);
  innerLipMesh.castShadow = true;
  innerLipMesh.receiveShadow = true;
  outerBezel.add(innerLipMesh);

  // ============================================================================
  // PART 2: RECESSED OXIDIZED RELIQUARY CHAMBER PLATE (recessedChamber)
  // ============================================================================
  const recessedChamber = new THREE.Group();

  const chamberBodyShape = createLancetShape(1.48, 2.04);
  const chamberBodyGeo = new THREE.ExtrudeGeometry(chamberBodyShape, {
    steps: 1,
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 3,
    curveSegments: 32,
  });
  chamberBodyGeo.translate(0, 0, 0.37);
  disposables.push(chamberBodyGeo);

  const chamberBodyMesh = new THREE.Mesh(chamberBodyGeo, brushedSilverMat);
  chamberBodyMesh.castShadow = true;
  chamberBodyMesh.receiveShadow = true;
  recessedChamber.add(chamberBodyMesh);

  const floorShape = createLancetShape(1.18, 1.68);
  const floorGeo = new THREE.ExtrudeGeometry(floorShape, {
    steps: 1,
    depth: 0.06,
    bevelEnabled: false,
    curveSegments: 36,
  });
  floorGeo.computeBoundingBox();
  const bbox = floorGeo.boundingBox!;
  const uvAttr = floorGeo.attributes.uv;
  const posAttr = floorGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const u = (posAttr.getX(i) - bbox.min.x) / (bbox.max.x - bbox.min.x || 1);
    const v = (posAttr.getY(i) - bbox.min.y) / (bbox.max.y - bbox.min.y || 1);
    uvAttr.setXY(i, u, v);
  }
  floorGeo.translate(0, 0, 0.52);
  disposables.push(floorGeo);

  const floorMesh = new THREE.Mesh(floorGeo, oxidizedChamberMat);
  floorMesh.receiveShadow = true;
  recessedChamber.add(floorMesh);

  // ============================================================================
  // PART 3 & 4: WEST & EAST SEAMLESS ENGRAVED SHOULDERS (leftShoulder, rightShoulder)
  // ============================================================================
  const leftShoulder = createSeamlessShoulderGroup(
    -1,
    engravedShoulderMat,
    disposables
  );
  const rightShoulder = createSeamlessShoulderGroup(
    1,
    engravedShoulderMat,
    disposables
  );

  // ============================================================================
  // PART 5: TAPERED STERLING SHANK & INNER SLEEVE (lowerShank)
  // ============================================================================
  const lowerShank = new THREE.Group();

  const shankUSteps = 40;
  const shankVSteps = 28;
  const rInner = 0.94;
  const hoopCenterZ = -0.60;

  const sPositions: number[] = [];
  const sNormals: number[] = [];
  const sUvs: number[] = [];
  const sIndices: number[] = [];

  for (let iu = 0; iu <= shankUSteps; iu++) {
    const u = iu / shankUSteps;
    const theta = THREE.MathUtils.lerp(1.66, Math.PI * 2 - 1.66, u);
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);

    const backFactor = 1 - Math.sin(u * Math.PI) * 0.06;
    const halfH = 0.35 * backFactor;
    const wallThick = 0.18 * backFactor;

    for (let iv = 0; iv <= shankVSteps; iv++) {
      const v = iv / shankVSteps;
      const phi = v * Math.PI * 2;
      const radialMid = rInner + wallThick * 0.5;
      const rSection = radialMid + Math.cos(phi) * (wallThick * 0.5);
      const y = Math.sin(phi) * halfH;

      const x = sinT * rSection;
      const z = hoopCenterZ + cosT * rSection;

      const nx = sinT * Math.cos(phi);
      const ny = Math.sin(phi);
      const nz = cosT * Math.cos(phi);

      sPositions.push(x, y, z);
      sNormals.push(nx, ny, nz);
      sUvs.push(u * 2, v);
    }
  }

  const sStride = shankVSteps + 1;
  for (let iu = 0; iu < shankUSteps; iu++) {
    for (let iv = 0; iv < shankVSteps; iv++) {
      const a = iu * sStride + iv;
      const b = (iu + 1) * sStride + iv;
      const c = (iu + 1) * sStride + (iv + 1);
      const d = iu * sStride + (iv + 1);
      sIndices.push(a, c, b, a, d, c);
    }
  }

  const shankGeo = new THREE.BufferGeometry();
  shankGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(sPositions, 3)
  );
  shankGeo.setAttribute(
    'normal',
    new THREE.Float32BufferAttribute(sNormals, 3)
  );
  shankGeo.setAttribute('uv', new THREE.Float32BufferAttribute(sUvs, 2));
  shankGeo.setIndex(sIndices);
  shankGeo.computeVertexNormals();
  disposables.push(shankGeo);

  const shankMesh = new THREE.Mesh(shankGeo, brushedSilverMat);
  shankMesh.castShadow = true;
  shankMesh.receiveShadow = true;
  lowerShank.add(shankMesh);

  const sleeveGeo = new THREE.CylinderGeometry(
    rInner + 0.006,
    rInner + 0.006,
    0.68,
    48,
    1,
    true
  );
  sleeveGeo.translate(0, 0, hoopCenterZ);
  disposables.push(sleeveGeo);
  const sleeveMesh = new THREE.Mesh(sleeveGeo, brushedSilverMat);
  lowerShank.add(sleeveMesh);

  // ============================================================================
  // UNDERSTATED ARCHITECTURAL GUIDE LINES (visible when dispersed/converging)
  // ============================================================================
  const guideVerts = new Float32Array([
    0, 0, -2.3, 0, 0, 2.2,
    -2.2, 0, -0.3, 2.2, 0, -0.3,
    0, -1.5, 0.54, 0, 1.6, 0.54,
  ]);
  const guideGeo = new THREE.BufferGeometry();
  guideGeo.setAttribute('position', new THREE.BufferAttribute(guideVerts, 3));
  const guideMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  disposables.push(guideGeo, guideMat);
  const guideLines = new THREE.LineSegments(guideGeo, guideMat);

  rootGroup.add(
    outerBezel,
    recessedChamber,
    leftShoulder,
    rightShoulder,
    lowerShank,
    guideLines
  );

  // Natural resting tilt on the dark slate matching morta-reliquary-ring.png
  rootGroup.rotation.set(-0.16, 0.08, 0.05);

  return {
    rootGroup,
    outerBezel,
    recessedChamber,
    leftShoulder,
    rightShoulder,
    lowerShank,
    guideLines,
    dispose: () => {
      for (const item of disposables) {
        item.dispose();
      }
    },
  };
}
]]>
    </file>
  </files>
</template>

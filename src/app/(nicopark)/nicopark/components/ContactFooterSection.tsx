"use client";

import React, { useState } from 'react';
import { ArrowUpRight, ArrowUp, Mail, Copy, Check, AlertCircle } from 'lucide-react';
import {
  ContactFormInput,
  validateContactForm,
  buildMailtoHref
} from '../data/portfolioData';

interface ContactFooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    projectScope: 'Industrial Design & Hardware',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedMailto(null);
      return;
    }
    setErrors({});
    const href = buildMailtoHref(formState);
    setPreparedMailto(href);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nico@nicopark.design');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
    }
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16 border-t-2 border-[#191919]"
    >
      {/* Main Contact Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        {/* Left 7 Cols: Giant Friendly Headline & Direct Mail Actions */}
        <div className="lg:col-span-7 bg-[#3049F0] text-white border-2 border-[#191919] rounded-[28px] p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="font-condensed font-bold text-sm sm:text-base tracking-[0.06em] uppercase text-[#F7E36B]">
                CHAPTER 08 · AVAILABLE FOR SELECT Q1/Q2 COLLABORATIONS
              </span>

              {/* Responsive Rotating Asterisk Emblem */}
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF735D] animate-slow-spin shrink-0"
                aria-hidden="true"
              >
                <g stroke="currentColor" strokeWidth="12" strokeLinecap="butt">
                  <line x1="50" y1="6" x2="50" y2="94" />
                  <line x1="6" y1="50" x2="94" y2="50" />
                  <line x1="18.9" y1="18.9" x2="81.1" y2="81.1" />
                  <line x1="81.1" y1="18.9" x2="18.9" y2="81.1" />
                </g>
              </svg>
            </div>

            <h2
              id="contact-heading"
              className="font-display uppercase text-[60px] sm:text-[86px] lg:text-[102px] leading-[0.89] tracking-tight mb-6"
            >
              <span className="block text-white">LET&apos;S MAKE</span>
              <span className="block text-[#F7E36B]">SOMETHING</span>
              <span className="block text-[#FF735D]">FEEL GOOD.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed mb-8">
              Looking to prototype a physical hardware product, craft an apparatus interface, or build a playful modular brand system? Send a direct note or compose an inquiry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/20">
            <a
              href="mailto:nico@nicopark.design?subject=Project%20Inquiry%20for%20Nico%20Park"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-4 rounded-full bg-[#FF735D] text-white border-2 border-[#191919] font-condensed font-bold text-lg uppercase tracking-wider hover:bg-[#F7E36B] hover:text-[#191919] transition-colors whitespace-nowrap shrink-0"
            >
              <Mail className="w-5 h-5" />
              <span>EMAIL NICO@NICOPARK.DESIGN</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-white text-[#191919] border-2 border-[#191919] font-condensed font-bold text-base uppercase tracking-wider hover:bg-[#D5C8FC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-[#3049F0]" />
                  <span>COPIED: NICO@NICOPARK.DESIGN</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY ADDRESS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Honest Validated Project Brief Composer (Mailto Draft Builder) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#191919] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-5 border-b border-[#191919]/15">
              <span className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919]">
                PROJECT BRIEF COMPOSER
              </span>
              <span className="font-mono-tech text-xs text-[#515151]">DIRECT MAILTO: DRAFT</span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  YOUR NAME *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, name: e.target.value }));
                    if (errors.name) setErrors((err) => ({ ...err, name: undefined }));
                  }}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                />
                {errors.name && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-[#D92D20] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  YOUR EMAIL *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, email: e.target.value }));
                    if (errors.email) setErrors((err) => ({ ...err, email: undefined }));
                  }}
                  placeholder="elena@studio.io"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-[#D92D20] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-scope"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  PROJECT DISCIPLINE *
                </label>
                <select
                  id="contact-scope"
                  value={formState.projectScope}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, projectScope: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                >
                  <option value="Industrial Design & Hardware">Industrial Design &amp; Hardware</option>
                  <option value="Digital Product & Apparatus UI">Digital Product &amp; Apparatus UI</option>
                  <option value="Brand Experience & Physical Toolkit">Brand Experience &amp; Physical Toolkit</option>
                  <option value="Advisory / Design Critique">Advisory / Design Critique</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  PROJECT TIMELINE &amp; GOALS *
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={formState.message}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, message: e.target.value }));
                    if (errors.message) setErrors((err) => ({ ...err, message: undefined }));
                  }}
                  placeholder="Tell Nico what you're building, target launch window, and hardware/software scope..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-[#D92D20] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#191919] text-white border-2 border-[#191919] font-condensed font-bold text-base uppercase tracking-wider hover:bg-[#3049F0] transition-colors cursor-pointer"
              >
                PREPARE EMAIL BRIEF (MAILTO:) ↗
              </button>
            </form>

            {/* Honest Mailto Action Box once validated */}
            {preparedMailto && (
              <div
                role="status"
                className="mt-4 p-4 rounded-2xl bg-[#F7E36B] border-2 border-[#191919] space-y-2"
              >
                <div className="font-mono-tech text-xs font-bold uppercase text-[#191919]">
                  BRIEF VALIDATED · READY FOR YOUR EMAIL CLIENT
                </div>
                <p className="text-xs text-[#191919]">
                  This portfolio uses a direct client-side mailto link (no server storage). Click below to launch your default mail app with your pre-filled brief:
                </p>
                <a
                  href={preparedMailto}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3049F0] text-white border border-[#191919] font-condensed font-bold text-xs uppercase tracking-wider"
                >
                  <span>LAUNCH MAIL CLIENT WITH BRIEF</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Colophon & Navigation Bar */}
      <div className="pt-8 border-t-2 border-[#191919] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#191919]">
          <span className="font-extrabold tracking-tight text-lg">nico park.</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#515151]">© 2026 Nico Park Industrial &amp; Digital Studio. Concept Portfolio.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <nav aria-label="Footer navigation" className="flex items-center gap-5 text-sm font-semibold">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('work');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Work
            </a>
            <a
              href="#anatomy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('anatomy');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Anatomy
            </a>
            <a
              href="#loop-app"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('loop-app');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              App UI
            </a>
            <a
              href="#playground"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('playground');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Playground
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              About
            </a>
            <a
              href="#notes"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('notes');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Notes
            </a>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate('top')}
            aria-label="Return to top of page"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-[#191919] font-condensed font-bold text-xs uppercase hover:bg-[#F7E36B] transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

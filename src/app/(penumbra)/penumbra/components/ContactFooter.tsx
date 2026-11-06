'use client';

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

'use client';

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

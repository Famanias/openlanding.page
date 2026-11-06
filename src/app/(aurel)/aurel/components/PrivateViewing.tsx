'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CalibrationField } from './CalibrationField';
import {
  InquiryFormInput,
  validatePrivateViewingInquiry,
} from '../data/collection';

interface PrivateViewingProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const PrivateViewing: React.FC<PrivateViewingProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
}) => {
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<InquiryFormInput>({
    name: '',
    email: '',
    city: 'Geneva Salon Concept',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof InquiryFormInput, string>>
  >({});
  const [demoValidatedRecord, setDemoValidatedRecord] =
    useState<InquiryFormInput | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseModal();
        triggerBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, onCloseModal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validatePrivateViewingInquiry(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setDemoValidatedRecord(null);
      return;
    }
    setErrors({});
    setDemoValidatedRecord({
      name: formState.name.trim(),
      email: formState.email.trim(),
      city: formState.city.trim(),
      message: formState.message.trim(),
    });
  };

  const handleResetDemoForm = () => {
    setDemoValidatedRecord(null);
    setErrors({});
    setFormState({
      name: '',
      email: '',
      city: 'Geneva Salon Concept',
      message: '',
    });
  };

  const handleReturnToOrigin = () => {
    onCloseModal();
    const el = document.getElementById('top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="private-viewing"
      aria-labelledby="private-viewing-heading"
      className="relative py-28 md:py-40 bg-[#111317] border-t border-[#374047]/45 overflow-hidden"
    >
      {/* Dramatic Incomplete Calibration Ring Enclosing the Composition */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <CalibrationField
          variant="cta"
          className="w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] md:w-[820px] md:h-[820px]"
        />
      </div>

      <div className="relative z-10 aurel-container flex flex-col items-center text-center">
        <p className="font-mono-tech text-xs tracking-[0.26em] text-[#9DB8C9] uppercase mb-4">
          05 / PRIVATE ENQUIRIES
        </p>

        <h2
          id="private-viewing-heading"
          className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94] max-w-4xl"
          style={{
            fontSize: 'clamp(3rem, 6.2vw, 6.8rem)',
            textWrap: 'balance',
          }}
        >
          SOME THINGS DESERVE TIME.
        </h2>

        <p
          className="font-sans-ui text-base md:text-lg text-[#C7CDD2] font-light max-w-xl mt-4"
          style={{ textWrap: 'balance' }}
        >
          A closer look at the Origin Collection begins with a conversation.
        </p>

        {/* Centered Editorial Watch Close-Up */}
        <div className="relative my-10 md:my-12 w-[250px] sm:w-[310px] md:w-[370px] aspect-square flex items-center justify-center">
          <div
            className="pointer-events-none absolute inset-6 rounded-full bg-radial from-[#9DB8C9]/12 via-transparent to-transparent blur-2xl"
            aria-hidden="true"
          />
          {!imgError ? (
            <img
              src="/templates/aurel/aurel-hero-watch.png"
              alt="AUREL Origin Collection 01 watch in brushed titanium"
              width={1140}
              height={1046}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.9)]"
            />
          ) : (
            <div className="w-48 h-48 rounded-full border border-[#374047] flex items-center justify-center">
              <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                ORIGIN 01
              </span>
            </div>
          )}
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            ref={triggerBtnRef}
            type="button"
            onClick={onOpenModal}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white transition-colors font-sans-ui text-xs font-medium tracking-[0.18em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB8C9]"
          >
            <span>REQUEST A PRIVATE VIEWING</span>
            <span aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            onClick={handleReturnToOrigin}
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-[#374047] hover:border-[#9DB8C9] bg-[#0A0B0D]/80 text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors font-sans-ui text-xs tracking-[0.18em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
          >
            <span>RETURN TO THE ORIGIN</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>

        <p className="mt-6 font-mono-tech text-[10px] tracking-[0.2em] text-[#89919A] uppercase">
          DEMO TEMPLATE DISCLOSURE · FICTIONAL HOROLOGY CONCEPT · NO COMMERCIAL TRANSACTIONS
        </p>
      </div>

      {/* Accessible Private Viewing Inquiry Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          aria-describedby="inquiry-modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0B0D]/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onCloseModal();
              triggerBtnRef.current?.focus();
            }
          }}
        >
          <div className="relative w-full max-w-xl bg-[#111317] border border-[#374047] p-6 sm:p-9 shadow-[0_32px_80px_rgba(0,0,0,0.9)] max-h-[92svh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#374047]/60">
              <div>
                <p className="font-mono-tech text-[10px] tracking-[0.24em] text-[#9DB8C9] uppercase">
                  05 / PRIVATE VIEWING ENQUIRY (DEMO)
                </p>
                <h3
                  id="inquiry-modal-title"
                  className="font-display text-2xl sm:text-3xl text-[#F0ECE5] font-normal mt-1"
                >
                  THE ORIGIN COLLECTION — CALIBRE AU-01
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  onCloseModal();
                  triggerBtnRef.current?.focus();
                }}
                aria-label="Close private viewing inquiry modal"
                className="w-10 h-10 border border-[#374047] hover:border-[#9DB8C9] text-[#C7CDD2] hover:text-[#F0ECE5] flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p
              id="inquiry-modal-desc"
              className="mt-4 font-sans-ui text-xs sm:text-sm text-[#C7CDD2] font-light leading-relaxed"
            >
              This interactive form is a <strong className="text-[#F0ECE5] font-medium">design-concept template demonstration</strong>. Inputs are validated locally in your browser; no message is transmitted to a live manufacturer or concierge service.
            </p>

            {demoValidatedRecord ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 p-6 bg-[#0A0B0D] border border-[#9DB8C9]/55 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#374047]/60 pb-3">
                  <span className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9] uppercase">
                    LOCAL DEMO VALIDATION COMPLETE
                  </span>
                  <span className="font-mono-tech text-[10px] tracking-[0.18em] text-[#89919A] uppercase">
                    NO NETWORK TRANSMISSION
                  </span>
                </div>

                <p className="font-sans-ui text-sm text-[#F0ECE5] leading-relaxed">
                  Thank you, <span className="text-[#9DB8C9]">{demoValidatedRecord.name}</span>. Your inquiry details have been validated locally for this fictional horology template preview. Because AUREL is a design concept rather than an active commercial manufacture, no email or booking request has been sent.
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono-tech text-[#C7CDD2]">
                  <div>
                    <dt className="text-[10px] text-[#89919A] uppercase">CORRESPONDENCE</dt>
                    <dd className="mt-0.5 truncate">{demoValidatedRecord.email}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-[#89919A] uppercase">CONCEPT LOCATION</dt>
                    <dd className="mt-0.5">{demoValidatedRecord.city}</dd>
                  </div>
                </dl>

                <div className="pt-4 flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetDemoForm}
                    className="px-5 py-2.5 border border-[#374047] hover:border-[#9DB8C9] text-xs font-mono-tech tracking-[0.18em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors cursor-pointer"
                  >
                    EDIT DEMO INPUTS
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onCloseModal();
                      triggerBtnRef.current?.focus();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] text-xs font-sans-ui font-medium tracking-[0.18em] uppercase hover:bg-white transition-colors cursor-pointer"
                  >
                    CLOSE PREVIEW
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                  >
                    FULL NAME *
                  </label>
                  <input
                    ref={firstInputRef}
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. Henri Meylan"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                    className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] placeholder-[#89919A]/55 focus:outline-none"
                  />
                  {errors.name && (
                    <p
                      id="inquiry-name-error"
                      role="alert"
                      className="mt-1.5 font-mono-tech text-[11px] text-[#9DB8C9]"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="name@domain.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? 'inquiry-email-error' : undefined
                      }
                      className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] placeholder-[#89919A]/55 focus:outline-none"
                    />
                    {errors.email && (
                      <p
                        id="inquiry-email-error"
                        role="alert"
                        className="mt-1.5 font-mono-tech text-[11px] text-[#9DB8C9]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-city"
                      className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                    >
                      PREFERRED SETTING (CONCEPT)
                    </label>
                    <select
                      id="inquiry-city"
                      name="city"
                      value={formState.city}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] focus:outline-none"
                    >
                      <option value="Geneva Salon Concept">Geneva Salon Concept</option>
                      <option value="Zurich Private Study">Zurich Private Study</option>
                      <option value="Paris Place Vendôme Concept">Paris Concept Suite</option>
                      <option value="Tokyo Aoyama Study">Tokyo Aoyama Study</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                  >
                    ENQUIRY NOTE *
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Share your interest in inspecting the Origin Collection 01 concept..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'inquiry-message-error' : undefined
                    }
                    className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] placeholder-[#89919A]/55 focus:outline-none"
                  />
                  {errors.message && (
                    <p
                      id="inquiry-message-error"
                      role="alert"
                      className="mt-1.5 font-mono-tech text-[11px] text-[#9DB8C9]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#374047]/60">
                  <span className="font-mono-tech text-[10px] tracking-[0.18em] text-[#89919A] uppercase">
                    DEMO ONLY — VALIDATES LOCALLY WITHOUT SENDING
                  </span>

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white font-sans-ui text-xs font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    VALIDATE DEMO ENQUIRY ↗
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

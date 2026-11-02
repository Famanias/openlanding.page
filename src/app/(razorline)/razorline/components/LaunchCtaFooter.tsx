"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateLaunchSignup } from '../utils/storeLogic';

interface LaunchCtaFooterProps {
  onExploreCollection: () => void;
}

export const LaunchCtaFooter: React.FC<LaunchCtaFooterProps> = ({ onExploreCollection }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [activePolicyNote, setActivePolicyNote] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateLaunchSignup(email);
    if (!res.valid) {
      setError(res.error);
      setSubmittedEmail(null);
      return;
    }
    setError(null);
    setSubmittedEmail(res.normalizedEmail);
    setEmail('');
  };

  const policyNotes: Record<string, string> = {
    sizing:
      'RL-01 runs true to standard US performance road-running sizing with a locked midfoot saddle. Between sizes, order 0.5 up.',
    shipping:
      'Fictional DTC launch demo: All simulated orders display instant confirmation with zero real payment or carrier dispatch.',
    warranty:
      'Fictional brand concept: All performance numbers and coordinate labels on this page represent editorial design fiction.'
  };

  return (
    <>
      {/* 8. Final Launch CTA Section */}
      <section
        aria-labelledby="launch-cta-heading"
        className="relative w-full py-20 lg:py-28 bg-[#0B0B0A] border-b border-[#F1F0E9]/15 overflow-hidden"
      >
        {/* Diagonal Lime Slash Graphic Echoing Hero */}
        <svg
          viewBox="0 0 1440 500"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-35"
        >
          <polygon points="880,480 1390,20 1330,110 880,480" fill="#D3FF35" />
          <polygon points="980,460 1420,90 1380,150 980,460" fill="#375CFF" />
        </svg>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#111210] border border-[#F1F0E9]/20 p-6 sm:p-10 lg:p-14">
            {/* Left Copy & Email Signup (7 columns) */}
            <div className="lg:col-span-7">
              <div className="font-mono-tech text-xs tracking-[0.16em] text-[#D3FF35] uppercase mb-3">
                06. RL-01 LAUNCH DISPATCH · DIRECT TO ATHLETE
              </div>
              <h2
                id="launch-cta-heading"
                className="font-display italic font-black text-[clamp(3rem,6.5vw,5.75rem)] text-[#F1F0E9] uppercase leading-[0.88] mb-4"
              >
                RUN PAST <span className="text-[#D3FF35]">ORDINARY.</span>
              </h2>
              <p className="text-[#F1F0E9]/80 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
                Register for RL-01 colorway restocks, prototype lab notes, and future hollow-chassis track releases. Validated locally with zero external transmission.
              </p>

              {/* Validated Email Signup Form */}
              <form onSubmit={handleSubmit} noValidate className="max-w-lg mb-6">
                <label
                  htmlFor="launch-email-input"
                  className="block font-mono-tech text-xs text-[#777A7A] uppercase tracking-wider mb-2"
                >
                  ATHLETE DISPATCH EMAIL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="launch-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="runner@razorline.lab"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'launch-email-error' : undefined}
                    className="flex-1 h-12 px-4 bg-[#0B0B0A] border border-[#F1F0E9]/25 focus:border-[#D3FF35] text-[#F1F0E9] placeholder:text-[#777A7A] font-mono-tech text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-12 px-7 bg-[#D3FF35] hover:bg-[#e1ff66] text-[#0B0B0A] font-display italic font-black text-base tracking-[0.08em] uppercase flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>JOIN DISPATCH</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {error && (
                  <div
                    id="launch-email-error"
                    role="alert"
                    data-testid="signup-error-msg"
                    className="mt-2.5 flex items-center gap-2 text-xs font-mono-tech text-[#FF5C5C]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {submittedEmail && (
                  <div
                    role="status"
                    data-testid="signup-success-msg"
                    className="mt-3 p-3 bg-[#0B0B0A] border border-[#D3FF35] flex items-center gap-2.5 text-xs font-mono-tech text-[#D3FF35]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      DEMO DISPATCH CONFIRMED FOR {submittedEmail.toUpperCase()} — NO EXTERNAL DATA SENT.
                    </span>
                  </div>
                )}
              </form>

              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#F1F0E9]/80 hover:text-[#D3FF35] uppercase tracking-wider cursor-pointer"
              >
                <span>OR JUMP DIRECTLY TO THE RL-01 COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Product Close-Up (5 columns) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0B0B0A] border border-[#F1F0E9]/15 p-6 bg-blueprint-grid">
              <img
                src="/templates/razorline/rl01-hero.png"
                alt="RAZORLINE RL-01 Voltage close-up profile"
                width={640}
                height={500}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full max-w-[380px] h-auto object-contain"
              />
              <div className="w-full mt-4 pt-3 border-t border-[#F1F0E9]/10 flex items-center justify-between font-mono-tech text-[11px] text-[#777A7A]">
                <span>RL-01 // PERFORMANCE SERIES</span>
                <span className="text-[#D3FF35]">IN STOCK · DEMO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="w-full bg-[#0B0B0A] text-[#F1F0E9] py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F1F0E9]/10">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="#top"
                className="inline-flex items-center gap-2.5 whitespace-nowrap"
              >
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 36 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 4H21L27 10.5L19.5 16.5H11L18.5 10.5H8L3 4Z" fill="#F1F0E9" />
                  <path d="M9 14.5L2.5 24H10.5L15.5 17.5L22.5 25.5H30.5L20.5 14.5H9Z" fill="#F1F0E9" />
                  <path d="M25.5 4L33.5 11.5L28.5 15.5L31 11L23.5 4H25.5Z" fill="#D3FF35" />
                </svg>
                <span className="font-display italic font-black text-3xl text-[#F1F0E9]">
                  RAZORLINE
                </span>
              </a>
              <p className="text-sm text-[#777A7A] max-w-sm leading-relaxed">
                Uncompromising velocity. Engineered rebellion. A fictional performance footwear company for athletes who outrun the expected.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="font-mono-tech text-xs text-[#D3FF35] uppercase tracking-wider mb-3">
                NAVIGATION
              </div>
              <ul className="space-y-2 text-sm text-[#F1F0E9]/80">
                <li>
                  <a href="#top" className="hover:text-[#D3FF35] transition-colors">
                    RL-01 Launch Hero
                  </a>
                </li>
                <li>
                  <a href="#footwear" className="hover:text-[#D3FF35] transition-colors">
                    The RL-01 Collection
                  </a>
                </li>
                <li>
                  <a href="#technology" className="hover:text-[#D3FF35] transition-colors">
                    Technology Breakdown
                  </a>
                </li>
                <li>
                  <a href="#athletes" className="hover:text-[#D3FF35] transition-colors">
                    Movement Stories
                  </a>
                </li>
                <li>
                  <a href="#journal" className="hover:text-[#D3FF35] transition-colors">
                    Product Lookbook
                  </a>
                </li>
              </ul>
            </div>

            {/* Fictional Store Policies & Notes */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="font-mono-tech text-xs text-[#D3FF35] uppercase tracking-wider mb-3">
                STORE POLICIES & DESIGN NOTES
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActivePolicyNote(activePolicyNote === 'sizing' ? null : 'sizing')}
                  className="px-3 py-1.5 border border-[#F1F0E9]/20 hover:border-[#D3FF35] font-mono-tech text-xs text-[#F1F0E9]/85 cursor-pointer"
                >
                  SIZING GUIDE
                </button>
                <button
                  type="button"
                  onClick={() => setActivePolicyNote(activePolicyNote === 'shipping' ? null : 'shipping')}
                  className="px-3 py-1.5 border border-[#F1F0E9]/20 hover:border-[#D3FF35] font-mono-tech text-xs text-[#F1F0E9]/85 cursor-pointer"
                >
                  DEMO DISPATCH POLICY
                </button>
                <button
                  type="button"
                  onClick={() => setActivePolicyNote(activePolicyNote === 'warranty' ? null : 'warranty')}
                  className="px-3 py-1.5 border border-[#F1F0E9]/20 hover:border-[#D3FF35] font-mono-tech text-xs text-[#F1F0E9]/85 cursor-pointer"
                >
                  DESIGN FICTION NOTICE
                </button>
              </div>
              {activePolicyNote && (
                <p className="mt-3 p-3 bg-[#111210] border border-[#D3FF35]/40 text-xs text-[#F1F0E9]/80 leading-relaxed">
                  {policyNotes[activePolicyNote]}
                </p>
              )}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777A7A] font-mono-tech">
            <span>© {new Date().getFullYear()} RAZORLINE FOOTWEAR LAB. FICTIONAL DTC CONCEPT.</span>
            <span>RL-01 SERIES · ALL SPECIFICATIONS ARE DESIGN FICTION</span>
          </div>
        </div>
      </footer>
    </>
  );
};

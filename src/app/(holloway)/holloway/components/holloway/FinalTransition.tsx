'use client';

import React, { useState } from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

interface FinalTransitionProps {
  onDesignSpace: () => void;
  onExploreCollection: () => void;
  inquiryOpen: boolean;
  onToggleInquiry: (open: boolean) => void;
}

export default function FinalTransition({
  onDesignSpace,
  onExploreCollection,
  inquiryOpen,
  onToggleInquiry,
}: FinalTransitionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Private Residence');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !trimmedEmail.includes('@')) {
      setErrorMessage('Please provide your name and a valid studio or personal email address.');
      return;
    }
    setErrorMessage('');
    setSubmitted(true);
  };

  return (
    <section
      id="transition"
      aria-labelledby="transition-heading"
      className="relative w-full overflow-hidden bg-[#EAE5D9]"
    >
      {/* Full-Bleed Architectural Room Composition matching approved footer-reference */}
      <div className="relative min-h-[480px] md:min-h-[560px] lg:h-[63vh] w-full flex flex-col justify-between">
        {/* Background Room Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HOLLOWAY_ASSETS.collectionScene}
            alt="HOLLOWAY living room composition with three-module powder-blue sofa, solid oak low table, burgundy cabinet, built-in oak shelves, and architectural drafting overlay"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#F5F2EA]/60 via-[#F5F2EA]/15 to-transparent md:from-[#F5F2EA]/35 md:via-transparent"
          />
        </div>

        {/* Left-Aligned Editorial Headline & CTAs matching footer-reference */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-6 py-10 md:px-14 md:py-12">
          <div className="max-w-[660px]">
            <h2
              id="transition-heading"
              className="font-editorial text-[46px] sm:text-[62px] md:text-[76px] lg:text-[86px] font-medium leading-[0.93] tracking-[0.01em] text-[#262824] uppercase"
            >
              MAKE ROOM
              <br />
              FOR WHAT
              <br />
              MATTERS.
            </h2>

            <p className="mt-4 md:mt-5 font-ui text-[15px] sm:text-[17px] md:text-[19px] font-normal tracking-[0.01em] text-[#262824]">
              Built to fit. Made to last. Arranged by you.
            </p>
          </div>

          {/* Bottom-Left Action Links matching footer-reference */}
          <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-7 md:gap-10">
            <button
              type="button"
              onClick={onDesignSpace}
              className="font-ui text-[12px] md:text-[13.5px] font-medium tracking-[0.12em] text-[#262824] uppercase border-b-[1.5px] border-[#262824] pb-1 transition-colors hover:text-[#874C54] hover:border-[#874C54] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
            >
              DESIGN YOUR SPACE <span aria-hidden="true" className="ml-1">↗</span>
            </button>

            <button
              type="button"
              onClick={onExploreCollection}
              className="font-ui text-[11.5px] md:text-[12.5px] font-medium tracking-[0.12em] text-[#262824]/90 uppercase transition-colors hover:text-[#262824] underline-offset-4 hover:underline whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
            >
              EXPLORE THE COLLECTION
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Architectural Inquiry & Material Sample Dossier */}
      {inquiryOpen && (
        <div
          id="studio-inquiries"
          role="region"
          aria-label="Material Sample and Studio Inquiry Form"
          className="border-t border-[#262824]/30 bg-[#EFECE3] px-6 py-10 md:px-14"
        >
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="font-drafting text-[10.5px] tracking-[0.14em] text-[#777974] uppercase">
                ARCHITECTURAL INQUIRIES & MATERIAL SWATCH BOX
              </p>
              <h3 className="mt-2 font-editorial text-[30px] md:text-[36px] text-[#262824] uppercase">
                EXPERIENCE THE PALETTE IN YOUR LIGHT.
              </h3>
              <p className="mt-3 font-ui text-[14.5px] leading-[1.65] text-[#262824]/80">
                Request our physical presentation box containing oiled walnut, quartersawn oak,
                powder-blue virgin wool bouclé, and oxblood felt swatches, or schedule a private
                room planning consultation.
              </p>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="border border-[#262824]/25 bg-[#F5F2EA] p-6">
                  <p className="font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                    DOSSIER REGISTERED — REF. HW-092
                  </p>
                  <p className="mt-2 font-editorial text-[24px] text-[#262824]">
                    Thank you, {name}. Your {projectType.toLowerCase()} swatch kit & studio notes
                    have been queued for dispatch to {email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                    }}
                    className="mt-4 font-drafting text-[11px] uppercase tracking-[0.12em] text-[#262824] border-b border-[#262824] pb-0.5 cursor-pointer"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 border border-[#262824]/20 bg-[#F5F2EA] p-6"
                >
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="hw-inquiry-name"
                      className="block font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-1.5"
                    >
                      NAME / PRACTICE
                    </label>
                    <input
                      id="hw-inquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Clara Lindqvist"
                      className="w-full border border-[#262824]/25 bg-white px-3 py-2 font-ui text-[13.5px] text-[#262824] focus:border-[#262824] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="hw-inquiry-email"
                      className="block font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-1.5"
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="hw-inquiry-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="studio@practice.com"
                      className="w-full border border-[#262824]/25 bg-white px-3 py-2 font-ui text-[13.5px] text-[#262824] focus:border-[#262824] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="hw-inquiry-type"
                      className="block font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-1.5"
                    >
                      PROJECT CONTEXT
                    </label>
                    <select
                      id="hw-inquiry-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full border border-[#262824]/25 bg-white px-3 py-2 font-ui text-[13.5px] text-[#262824] focus:border-[#262824] focus:outline-none"
                    >
                      <option value="Private Residence">Private Residence</option>
                      <option value="Architectural Specification">Architectural Specification</option>
                      <option value="Editorial / Press">Editorial / Press</option>
                    </select>
                  </div>

                  {errorMessage && (
                    <div className="sm:col-span-12 font-drafting text-[11px] text-[#874C54]">
                      {errorMessage}
                    </div>
                  )}

                  <div className="sm:col-span-12 flex items-center justify-between pt-2">
                    <span className="font-drafting text-[10px] text-[#777974] uppercase">
                      COMPLIMENTARY DISPATCH · SHIPS WITHIN 48 HOURS
                    </span>
                    <button
                      type="submit"
                      className="bg-[#262824] text-[#F5F2EA] px-6 py-2.5 font-ui text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-[#3A3D37] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      REQUEST SWATCH DOSSIER ↗
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

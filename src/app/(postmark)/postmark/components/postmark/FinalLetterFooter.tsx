'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUp, CheckCircle2, Info } from 'lucide-react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import { validateDemoEmail } from '../../lib/postmark/logic';
import {
  ensureGsapRegistered,
  scrollToSectionById,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

type ConceptDisclosureTopic = 'stores' | 'guide' | 'story' | 'privacy' | null;

const DISCLOSURE_COPY: Record<Exclude<ConceptDisclosureTopic, null>, { title: string; body: string }> = {
  stores: {
    title: 'Illustrative Store Badges — Concept Showcase',
    body: 'POSTMARK is a fictional product showcase crafted for OpenLanding (Template 097). Native iOS and Android downloads are coming soon in concept form only—no external app store links or installers are triggered.',
  },
  guide: {
    title: 'How POSTMARK Keeps Memories',
    body: 'Every journey combines three lightweight paper elements: a single meaningful photograph, two or three honest handwritten lines, and a dated postal cancellation mark. Try the live browser demo in the Postcard Builder and Stamp Desk above.',
  },
  story: {
    title: 'About the POSTMARK Concept',
    body: 'Designed as a warm correspondence folder rather than a noisy social feed, POSTMARK celebrates train tickets, ferry stubs, quiet morning walks, and postcards worth opening years from now.',
  },
  privacy: {
    title: 'Zero Data Collection — Local Browser Demo',
    body: 'This showcase runs entirely in your browser session. Notes typed in the Postcard Builder, stamps placed on the Stamp Desk, and email previews below are never transmitted, stored, or shared.',
  },
};

export const FinalLetterFooter: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const emailInputId = useId();

  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [demoPreviewAddress, setDemoPreviewAddress] = useState<string | null>(null);
  const [activeDisclosure, setActiveDisclosure] = useState<ConceptDisclosureTopic>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stackEnvelopeRef = useRef<HTMLDivElement | null>(null);
  const stackLeftPhoneRef = useRef<HTMLDivElement | null>(null);
  const stackRightPhoneRef = useRef<HTMLDivElement | null>(null);
  const ctaLine1Ref = useRef<HTMLSpanElement | null>(null);
  const ctaLine2Ref = useRef<HTMLSpanElement | null>(null);
  const placeSealRef = useRef<HTMLSpanElement | null>(null);
  const perforationPathRef = useRef<SVGPathElement | null>(null);
  const backToTopRef = useRef<HTMLButtonElement | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const root = wrapperRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // 1. Left paper stack fans outward from central pivot while right headline reveals via paper-slice masks
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 76%',
          toggleActions: 'play none none none',
        },
      });

      ctaTl
        .fromTo(
          stackEnvelopeRef.current,
          { rotateZ: 0, scale: 0.92, y: 24 },
          { rotateZ: 4.5, scale: 1, y: 0, duration: 0.88, ease: 'power3.out' },
          0
        )
        .fromTo(
          stackLeftPhoneRef.current,
          { x: 46, rotateZ: 0, scale: 0.94 },
          { x: 0, rotateZ: -5.5, scale: 1, duration: 0.94, ease: 'back.out(1.25)' },
          0.08
        )
        .fromTo(
          stackRightPhoneRef.current,
          { x: -46, rotateZ: 0, scale: 0.94 },
          { x: 0, rotateZ: 5.2, scale: 1, duration: 0.98, ease: 'back.out(1.3)' },
          0.14
        )
        .fromTo(
          [ctaLine1Ref.current, ctaLine2Ref.current],
          { clipPath: 'inset(0% 100% 0% 0%)', x: -20 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            x: 0,
            duration: 0.84,
            stagger: 0.16,
            ease: 'expo.out',
          },
          0.12
        )
        .fromTo(
          placeSealRef.current,
          { scale: 1.45, rotateZ: -18, opacity: 0 },
          { scale: 1, rotateZ: -8, opacity: 1, duration: 0.42, ease: 'back.out(2.2)' },
          0.68
        );

      // 2. Perforated torn-paper dashed trail draws across transition
      if (perforationPathRef.current) {
        const perfLen = perforationPathRef.current.getTotalLength();
        gsap.set(perforationPathRef.current, {
          strokeDasharray: '10 10',
          strokeDashoffset: perfLen * 0.35,
        });
        gsap.to(perforationPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: perforationPathRef.current,
            start: 'top 90%',
            end: 'top 45%',
            scrub: 0.7,
          },
        });
      }

      // 3. Discreet Back to Top stamp single settle bounce near page end
      if (backToTopRef.current) {
        gsap.fromTo(
          backToTopRef.current,
          { y: 16, scale: 0.92 },
          {
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: backToTopRef.current,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleDemoEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const check = validateDemoEmail(emailValue);
    if (!check.valid) {
      setEmailError(check.error ?? 'Please enter a valid email address.');
      setDemoPreviewAddress(null);
      return;
    }
    setEmailError(null);
    setDemoPreviewAddress(check.normalized ?? emailValue.trim());
  };

  return (
    <div ref={wrapperRef} id="download" className="relative w-full overflow-hidden">
      {/* =====================================================================
         PART A: FINAL CTA SECTION (Rebuilt from 06-final-cta-postmark-mockup)
         ===================================================================== */}
      <section
        aria-labelledby="pm-final-cta-heading"
        className="relative w-full bg-[var(--pm-paper)] pm-paper-grain pt-20 pb-24 sm:pt-28 sm:pb-28 border-t border-[var(--pm-brown)]/12"
      >
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT: Layered Two-Phone & Airmail Envelope Paper Collage */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[470px]">
              {/* Underlying Par Avion Envelope & Correspondence Sheet */}
              <div
                ref={stackEnvelopeRef}
                aria-hidden="true"
                className="absolute w-[88%] max-w-[460px] h-[340px] sm:h-[380px] bg-[#EFE4D1] border border-[var(--pm-brown)]/25 shadow-[0_18px_45px_rgba(62,41,26,0.12)] p-3 will-change-transform"
              >
                <div className="pm-airmail-band h-2.5 w-full opacity-80" />
                <div className="mt-4 flex justify-between items-start px-3">
                  <SVGStamp stampId="mountain-air" size="sm" />
                  <PostalCancellationSeal
                    topText="POSTMARK"
                    bottomText="EST. ARCHIVE"
                    centerText=""
                    className="h-16 w-16 text-[var(--pm-brown)]/45"
                  />
                </div>
                <div className="absolute bottom-3 right-4 border border-[var(--pm-brown)]/30 bg-[#DFC59E] px-3 py-1 font-ui text-[10px] font-bold tracking-[0.14em] text-[var(--pm-brown)] rotate-3">
                  TICKET · 8F77199 ★★★
                </div>
              </div>

              {/* Left Fanned Phone Print (04-feature-memory-map.webp) */}
              <div
                ref={stackLeftPhoneRef}
                className="relative z-10 -mr-6 sm:-mr-10 -mt-6 w-[48%] max-w-[235px] pm-photo-print p-2 sm:p-2.5 shadow-[0_20px_44px_rgba(37,41,44,0.18)] will-change-transform"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-ivory)]">
                  <img
                    src={POSTMARK_ASSETS.memoryMap}
                    alt="POSTMARK Memory Map mobile journal screen in travel collage"
                    width={896}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-[66%_50%]"
                  />
                </div>
              </div>

              {/* Right Overlapping Phone Print (03-feature-postcard-builder.webp) */}
              <div
                ref={stackRightPhoneRef}
                className="relative z-20 mt-8 w-[50%] max-w-[245px] pm-photo-print p-2 sm:p-2.5 shadow-[0_24px_52px_rgba(37,41,44,0.22)] will-change-transform"
              >
                <div aria-hidden="true" className="pm-washi-stripe absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-16" />
                <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-ivory)]">
                  <img
                    src={POSTMARK_ASSETS.postcardBuilder}
                    alt="POSTMARK Postcard Builder mobile app screen with coastal postcard"
                    width={896}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Closing Editorial Serif Statement, Primary Actions & Honest Illustrative Store Badges */}
            <div className="lg:col-span-6 relative">
              <h2
                id="pm-final-cta-heading"
                className="font-editorial text-[clamp(2.35rem,4.5vw,4.05rem)] font-semibold leading-[1.08] tracking-[-0.022em] text-[#3B2318]"
              >
                <span ref={ctaLine1Ref} className="block will-change-transform">
                  Your memories belong
                </span>
                <span ref={ctaLine2Ref} className="inline-flex flex-wrap items-center gap-3 will-change-transform">
                  <span>in a beautiful place.</span>
                  <span
                    ref={placeSealRef}
                    aria-hidden="true"
                    className="inline-flex text-[var(--pm-red)]"
                  >
                    <PostalCancellationSeal
                      topText="POSTMARK"
                      bottomText="KEPT FOREVER"
                      centerText="★"
                      className="h-11 w-11 sm:h-12 sm:w-12"
                    />
                  </span>
                </span>
              </h2>

              <p className="mt-5 max-w-[52ch] font-ui text-[17px] sm:text-[18px] leading-[1.62] text-[var(--pm-ink)]/85">
                Capture every ticket, every vista, and every fleeting thought. Keep a little more of everywhere you go.
              </p>

              {/* Primary Live Page Actions */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <PaperButton
                  variant="primary"
                  size="lg"
                  onClick={() => scrollToSectionById('features', '[data-builder-first-control]')}
                >
                  Explore the App
                </PaperButton>

                <PaperButton
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSectionById('journal')}
                >
                  View the Journal
                </PaperButton>
              </div>

              {/* Illustrative Store Badges (Clearly Labeled Concept / Coming Soon) */}
              <div className="mt-7 pt-5 border-t border-[var(--pm-brown)]/15">
                <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--pm-brown)]/75">
                  Mobile Concept Preview · Illustrative Store Marks (Coming Soon)
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => setActiveDisclosure('stores')}
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-lg border border-[#5A3528]/35 bg-[#3D271D] px-4 py-2 text-left text-[#FFF9EF] shadow-sm hover:bg-[#4E3327] transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3" />
                    </svg>
                    <div>
                      <span className="block font-ui text-[10px] uppercase tracking-[0.1em] text-[#F2C7A3]">
                        Concept Preview
                      </span>
                      <span className="block font-ui text-sm font-semibold leading-tight whitespace-nowrap">
                        App Store (Soon)
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDisclosure('stores')}
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-lg border border-[#5A3528]/35 bg-[#3D271D] px-4 py-2 text-left text-[#FFF9EF] shadow-sm hover:bg-[#4E3327] transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
                      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
                    </svg>
                    <div>
                      <span className="block font-ui text-[10px] uppercase tracking-[0.1em] text-[#F2C7A3]">
                        Concept Preview
                      </span>
                      <span className="block font-ui text-sm font-semibold leading-tight whitespace-nowrap">
                        Google Play (Soon)
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Decorative right-edge POSTMARK rubber stamp mark */}
              <div
                aria-hidden="true"
                className="hidden xl:block pointer-events-none absolute -right-8 bottom-0 -rotate-12 border-y-2 border-[var(--pm-ink)]/35 px-4 py-1 font-editorial text-lg tracking-[0.18em] text-[var(--pm-ink)]/35 select-none"
              >
                POSTMARK
              </div>
            </div>
          </div>

          {/* Honest Inline Disclosure Callout when Concept Links / Store Marks are clicked */}
          {activeDisclosure && (
            <div
              role="status"
              aria-live="polite"
              className="mt-10 pm-postcard-sheet p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[var(--pm-red)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-editorial text-lg font-semibold text-[var(--pm-ink)]">
                    {DISCLOSURE_COPY[activeDisclosure].title}
                  </h3>
                  <p className="mt-1 font-ui text-sm text-[var(--pm-ink)]/80 max-w-[75ch]">
                    {DISCLOSURE_COPY[activeDisclosure].body}
                  </p>
                </div>
              </div>

              <PaperButton
                variant="parchment"
                size="sm"
                onClick={() => setActiveDisclosure(null)}
              >
                Dismiss Note
              </PaperButton>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
         TORN / PERFORATED HORIZONTAL PAPER TRANSITION INTO TRUE FOOTER
         ===================================================================== */}
      <div className="relative w-full bg-[var(--pm-paper)] pt-2">
        {/* Gridded notebook tape strip on left */}
        <div
          aria-hidden="true"
          className="pm-grid-scrap absolute left-6 sm:left-14 top-0 z-20 h-7 w-32 sm:w-44 border border-[var(--pm-brown)]/15 -rotate-1 shadow-sm"
        />

        {/* Perforation dashed trail */}
        <svg
          viewBox="0 0 1440 28"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-6 w-full overflow-visible"
        >
          <path
            ref={perforationPathRef}
            d="M 0 14 Q 180 4 360 15 T 720 13 T 1080 16 T 1440 12"
            fill="none"
            stroke="rgba(90, 53, 40, 0.42)"
            strokeWidth="1.8"
          />
        </svg>

        {/* Irregular torn parchment edge */}
        <svg
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-7 sm:h-9 w-full text-[#E5D7C1] drop-shadow-[0_-3px_6px_rgba(62,41,26,0.06)]"
        >
          <path
            fill="currentColor"
            d="M0,44 L0,18 L42,24 L88,15 L136,23 L192,14 L248,22 L305,15 L364,25 L422,14 L480,22 L542,13 L602,24 L664,16 L724,23 L788,14 L848,24 L912,15 L974,23 L1038,13 L1102,22 L1168,15 L1232,24 L1296,15 L1362,22 L1412,14 L1440,19 L1440,44 Z"
          />
        </svg>
      </div>

      {/* =====================================================================
         PART B: TRUE WARM-PARCHMENT FOOTER
         ===================================================================== */}
      <footer className="relative w-full bg-[#E5D7C1] pm-paper-grain pt-10 pb-12 text-[#3B2318]">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#5A3528]/20">
            {/* Brand + Interactive Cancellation Seal */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <span className="block font-editorial text-xs tracking-[0.08em] text-[#5A3528]/85">
                  Est. {currentYear}
                </span>
                <div className="mt-1 inline-flex items-center">
                  <span className="font-editorial text-3xl sm:text-4xl font-semibold tracking-[0.03em] text-[#3B2318]">
                    POSTMARK
                  </span>
                  <span className="group -ml-2 inline-flex text-[#5A3528]/75 transition-transform duration-300 hover:rotate-6 hover:text-[var(--pm-red-deep)]">
                    <PostalCancellationSeal
                      topText="POSTMARK"
                      bottomText="KEPT STORIES"
                      centerText=""
                      accentWave
                      className="h-14 w-14"
                    />
                  </span>
                </div>
                <p className="mt-3 max-w-[34ch] font-ui text-sm leading-relaxed text-[#3B2318]/80">
                  Every journey leaves details worth keeping. Save photos, handwritten notes, and places as collectible digital postcards.
                </p>
              </div>
            </div>

            {/* 3 Link Groups: APP, EXPLORE, ABOUT */}
            <div className="md:col-span-5 grid grid-cols-3 gap-6">
              <div>
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  App
                </h3>
                <ul className="mt-3 space-y-2.5 font-ui text-sm text-[#3B2318]/85">
                  <li>
                    <a
                      href="#features"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('features');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Postcard Builder
                    </a>
                  </li>
                  <li>
                    <a
                      href="#destinations"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('destinations');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Memory Map
                    </a>
                  </li>
                  <li>
                    <a
                      href="#stamp-desk"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('stamp-desk');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Stamp Desk
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('stores');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Download Info
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  Explore
                </h3>
                <ul className="mt-3 space-y-2.5 font-ui text-sm text-[#3B2318]/85">
                  <li>
                    <a
                      href="#manifesto"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('manifesto');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Manifesto
                    </a>
                  </li>
                  <li>
                    <a
                      href="#journal"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSectionById('journal');
                      }}
                      className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline"
                    >
                      Filmstrip Archive
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('guide');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Journaling Guide
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  About
                </h3>
                <ul className="mt-3 space-y-2.5 font-ui text-sm text-[#3B2318]/85">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('story');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Concept Story
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDisclosure('privacy');
                        scrollToSectionById('download');
                      }}
                      className="text-left hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
                    >
                      Demo Privacy
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Honest DEMO ONLY Correspondence Dispatch Form */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-editorial text-sm font-semibold uppercase tracking-[0.12em] text-[#3B2318]">
                  Stay in Touch
                </h3>
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                  Demo Only
                </span>
              </div>
              <p className="mt-1 font-hand text-2xl text-[#5A3528]">
                Preview our postal dispatch
              </p>

              <form onSubmit={handleDemoEmailSubmit} noValidate className="mt-2">
                <label htmlFor={emailInputId} className="sr-only">
                  Email address for demo preview
                </label>
                <div className="flex items-center gap-1.5 rounded border border-[#5A3528]/30 bg-[#F4EAD8] p-1.5 shadow-inner">
                  <input
                    id={emailInputId}
                    type="email"
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="traveler@example.com"
                    className="min-w-0 flex-1 bg-transparent px-2.5 py-2 font-ui text-sm text-[#25292C] placeholder:text-[#5A3528]/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="min-h-[38px] px-3.5 py-1.5 bg-[#CEB38C] hover:bg-[#C1A277] border border-[#5A3528]/40 font-editorial text-xs font-semibold text-[#25292C] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                  >
                    Subscribe
                  </button>
                </div>

                {emailError && (
                  <p role="alert" className="mt-2 font-ui text-xs font-medium text-[#AD4837]">
                    {emailError}
                  </p>
                )}

                {demoPreviewAddress && (
                  <p
                    role="status"
                    className="mt-2 flex items-start gap-1.5 font-ui text-xs text-[#3B2318]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--pm-teal)] shrink-0 mt-0.5" />
                    <span>
                      <strong>DEMO ONLY:</strong> Preview shown for {demoPreviewAddress}.{' '}
                      <strong>No email was sent or stored.</strong>
                    </span>
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Legal / Concept Metadata + Back to Top Stamp */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-xs text-[#3B2318]/80">
            <p>
              © {currentYear} Postmark · A fictional concept for OpenLanding. Made for travelers, by travelers.
            </p>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setActiveDisclosure('privacy')}
                className="hover:text-[var(--pm-red-deep)] underline-offset-4 hover:underline cursor-pointer"
              >
                Demo Disclosure
              </button>

              <button
                ref={backToTopRef}
                type="button"
                onClick={() => scrollToSectionById('top')}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#5A3528]/35 bg-[#F4EAD8] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] text-[#3B2318] hover:bg-[var(--pm-ivory)] shadow-sm cursor-pointer"
              >
                <ArrowUp className="h-3.5 w-3.5 text-[var(--pm-red)]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Classic kraft photo-album mounting corners at bottom-left and bottom-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3 h-7 w-7 border-b-4 border-l-4 border-[#9C7E54]/55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 h-7 w-7 border-b-4 border-r-4 border-[#9C7E54]/55"
        />
      </footer>
    </div>
  );
};

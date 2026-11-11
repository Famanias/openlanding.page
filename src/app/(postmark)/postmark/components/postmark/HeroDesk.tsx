'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  scrollToSectionById,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { PaperButton } from './PaperButton';

interface HeroDeskProps {
  introReady: boolean;
}

export const HeroDesk: React.FC<HeroDeskProps> = ({ introReady }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const eyebrowStampRef = useRef<SVGSVGElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const collageLayerRef = useRef<HTMLDivElement | null>(null);
  const routePathRef = useRef<SVGPathElement | null>(null);
  const routeGliderRef = useRef<SVGGElement | null>(null);
  const floatingMarkRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  // Intro handoff entrance choreography
  useEffect(() => {
    if (!introReady || reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Eyebrow + mini stamp impulse
      tl.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.52 },
        0
      ).fromTo(
        eyebrowStampRef.current,
        { scale: 1.32, rotateZ: -12 },
        { scale: 1, rotateZ: 0, duration: 0.42, ease: 'back.out(2.2)' },
        0.14
      );

      // Consecutive upward text clipping masks with ~130ms offset & tracking settle
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        {
          yPercent: 112,
          letterSpacing: '0.015em',
        },
        {
          yPercent: 0,
          letterSpacing: '-0.024em',
          duration: 0.84,
          stagger: 0.13,
          ease: 'power3.out',
        },
        0.08
      );

      // Supporting sentence & CTA buttons
      tl.fromTo(
        copyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        0.34
      ).fromTo(
        actionsRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.62 },
        0.44
      );

      // Scenic right-side paper collage settles from slight offset & rotation
      if (collageLayerRef.current) {
        tl.fromTo(
          collageLayerRef.current,
          { xPercent: 7, rotation: 2.5, scale: 1.045 },
          { xPercent: 0, rotation: 0, scale: 1, duration: 1.08, ease: 'expo.out' },
          0.04
        );
      }

      // Coded SVG bottom travel route draws across composition + location pin glides along it
      const routePath = routePathRef.current;
      const glider = routeGliderRef.current;
      if (routePath && glider) {
        const totalLength = routePath.getTotalLength();
        gsap.set(routePath, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        const proxy = { progress: 0 };
        const placeGlider = (p: number) => {
          const dist = Math.min(totalLength, Math.max(0, p * totalLength));
          const pt = routePath.getPointAtLength(dist);
          const ahead = routePath.getPointAtLength(Math.min(totalLength, dist + 2));
          const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
          glider.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
        };
        placeGlider(0);

        tl.to(
          routePath,
          {
            strokeDashoffset: 0,
            duration: 1.35,
            ease: 'power2.inOut',
          },
          0.32
        ).to(
          proxy,
          {
            progress: 0.86,
            duration: 1.42,
            ease: 'power2.out',
            onUpdate: () => placeGlider(proxy.progress),
          },
          0.36
        );
      }
    }, section);

    return () => ctx.revert();
  }, [introReady, reducedMotion]);

  // Scroll-driven editorial baseline split as user transitions toward Chapter 02
  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      scrollTl
        .to(
          line1Ref.current,
          { xPercent: -3.5, ease: 'none' },
          0
        )
        .to(
          line2Ref.current,
          { xPercent: 4.2, ease: 'none' },
          0
        )
        .to(
          collageLayerRef.current,
          { yPercent: 5.5, rotateZ: -0.8, ease: 'none' },
          0
        );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Subtle pointer response on lightweight independent SVG overlay only (4–8px)
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch' || prefersReducedMotionNow() || !floatingMarkRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(floatingMarkRef.current, {
      x: nx * 12,
      y: ny * 9,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      aria-labelledby="pm-hero-heading"
      className="relative w-full overflow-hidden bg-[var(--pm-hero-paper)] pm-paper-grain pt-4 pb-14 lg:min-h-[calc(100svh-78px)] lg:py-0 flex flex-col justify-center"
    >
      {/* Desktop right-aligned clean scenic composition layer (02-hero-postmark-clean.webp) */}
      <div
        ref={collageLayerRef}
        className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-[86%] xl:w-[82%] pm-hero-art-blend select-none will-change-transform"
      >
        <img
          src={POSTMARK_ASSETS.heroClean}
          alt="POSTMARK iPhone travel journal surrounded by coastal postcards, transit tickets, postage stamps, and street café prints"
          width={2752}
          height={1536}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-right"
        />
      </div>

      {/* Lightweight independent decorative postal cancellation overlay (desktop pointer-reactive) */}
      <div
        ref={floatingMarkRef}
        aria-hidden="true"
        className="hidden lg:flex pointer-events-none absolute left-[43%] top-8 z-10 items-center gap-2 text-[var(--pm-brown)]/40 select-none"
      >
        <svg viewBox="0 0 130 46" className="w-28 h-10 overflow-visible">
          <circle cx="23" cy="23" r="19" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2" />
          <text x="23" y="21" textAnchor="middle" fontSize="5.5" fontWeight="700" letterSpacing="1.2" fill="currentColor">
            PAR AVION
          </text>
          <text x="23" y="29" textAnchor="middle" fontSize="5" letterSpacing="1" fill="currentColor">
            NO. 097
          </text>
          <path d="M 46 16 Q 62 11 78 16 T 110 16" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 46 24 Q 62 19 78 24 T 110 24" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 46 32 Q 62 27 78 32 T 110 32" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12 lg:py-14">
        <div className="max-w-[620px] lg:max-w-[620px] xl:max-w-[660px]">
          {/* Eyebrow + mini perforated postage stamp icon */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 font-ui text-xs sm:text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--pm-red-deep)]"
          >
            <span>TRAVEL MEMORIES, BEAUTIFULLY KEPT</span>
            <svg
              ref={eyebrowStampRef}
              viewBox="0 0 28 24"
              className="h-5 w-6 text-[var(--pm-red-deep)] shrink-0"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="2"
                width="24"
                height="20"
                rx="1"
                fill="#FFF9EF"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeDasharray="2.2 1.6"
              />
              <rect x="5" y="5" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
              <path d="M 8 10 Q 11 8 14 10 T 20 10" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M 8 14 Q 11 12 14 14 T 20 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Giant Editorial Serif Headline — Crisp 2-line lockup on desktop matching approved hero */}
          <h1
            id="pm-hero-heading"
            className="mt-4 font-editorial text-[clamp(2.35rem,4.15vw,4.15rem)] font-semibold leading-[1.05] tracking-[-0.024em] text-[var(--pm-ink)]"
          >
            <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
              <span ref={line1Ref} className="block lg:whitespace-nowrap will-change-transform">
                COLLECT PLACES.
              </span>
            </span>
            <span className="block overflow-hidden py-[0.04em] -my-[0.04em]">
              <span ref={line2Ref} className="block lg:whitespace-nowrap will-change-transform">
                KEEP STORIES.
              </span>
            </span>
          </h1>

          {/* Supporting copy */}
          <p
            ref={copyRef}
            className="mt-5 max-w-[46ch] font-ui text-[17px] sm:text-[19px] leading-[1.6] text-[var(--pm-ink)]/85"
          >
            Turn photos, notes, locations, and tiny moments into digital postcards you’ll want to revisit forever.
          </p>

          {/* Primary & Secondary Actions */}
          <div
            ref={actionsRef}
            className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
          >
            <PaperButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSectionById('features', '[data-builder-first-control]')}
            >
              Start Your Journal
            </PaperButton>

            <PaperButton
              variant="outline"
              size="lg"
              onClick={() => scrollToSectionById('manifesto')}
            >
              <span>See How It Works</span>
              <span aria-hidden="true" className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </PaperButton>
          </div>
        </div>

        {/* Mobile / Tablet Dedicated Scenic Artwork (copy first, phone + collage centered without empty left void) */}
        <div className="mt-10 lg:hidden">
          <div className="relative aspect-[5/4] sm:aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--pm-brown)]/15 bg-[var(--pm-ivory)] shadow-[0_16px_40px_rgba(75,52,35,0.12)]">
            <img
              src={POSTMARK_ASSETS.heroClean}
              alt="POSTMARK mobile travel journal surrounded by postcards, transit tickets, and postage stamps"
              width={2752}
              height={1536}
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-[86%_50%]"
            />
          </div>
        </div>
      </div>

      {/* Coded Inline SVG Travel Route across Left Negative-Space Bottom Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative lg:absolute left-0 right-0 bottom-3 z-10 mx-auto max-w-[1380px] px-6 sm:px-12 mt-5 lg:mt-0"
      >
        <div className="max-w-[540px]">
          <svg
            viewBox="0 0 620 56"
            className="h-10 sm:h-11 w-full overflow-visible"
          >
            {/* Subtle background guide */}
            <path
              d="M 8 40 C 130 14, 240 50, 365 28 C 455 12, 525 36, 598 20"
              fill="none"
              stroke="rgba(90, 53, 40, 0.16)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            {/* Animated primary route stroke */}
            <path
              ref={routePathRef}
              d="M 8 40 C 130 14, 240 50, 365 28 C 455 12, 525 36, 598 20"
              fill="none"
              stroke="#D85743"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Origin circle */}
            <circle cx="8" cy="40" r="4" fill="#FFF9EF" stroke="#D85743" strokeWidth="2" />
            {/* Gliding paper-plane / postal pin marker */}
            <g ref={routeGliderRef} transform="translate(520, 24)">
              <polygon
                points="10,0 -7,-5.5 -3.5,0 -7,5.5"
                fill="#D85743"
                stroke="#FFF9EF"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

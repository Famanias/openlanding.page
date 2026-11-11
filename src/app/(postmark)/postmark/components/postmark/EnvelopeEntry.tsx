'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { shouldSkipEntryIntro } from '../../lib/postmark/motion';
import { PostalCancellationSeal } from './SVGStamp';

interface EnvelopeEntryProps {
  onHandoff: () => void;
  onComplete: () => void;
}

export const EnvelopeEntry: React.FC<EnvelopeEntryProps> = ({ onHandoff, onComplete }) => {
  const [dismissed, setDismissed] = useState<boolean>(() => shouldSkipEntryIntro());
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const flapRef = useRef<HTMLDivElement | null>(null);
  const sealRef = useRef<HTMLDivElement | null>(null);
  const arcsGroupRef = useRef<SVGGElement | null>(null);
  const handoffFiredRef = useRef(false);

  const finishImmediately = useCallback(() => {
    if (!handoffFiredRef.current) {
      handoffFiredRef.current = true;
      onHandoff();
    }
    setDismissed(true);
    onComplete();
  }, [onComplete, onHandoff]);

  useEffect(() => {
    if (dismissed) {
      finishImmediately();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishImmediately();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const ctx = gsap.context(() => {
      const arcs = arcsGroupRef.current?.querySelectorAll<SVGPathElement>('path') ?? [];
      arcs.forEach((arc) => {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        onComplete: () => {
          finishImmediately();
        },
      });

      // 1. Postal seal stamps down onto the envelope seam
      tl.fromTo(
        sealRef.current,
        { scale: 1.18, rotateZ: -8, opacity: 0.25 },
        { scale: 0.91, rotateZ: -1.5, opacity: 1, duration: 0.26, ease: 'power3.in' }
      )
        .to(sealRef.current, {
          scale: 1,
          rotateZ: 0,
          duration: 0.22,
          ease: 'back.out(2)',
        })
        // 2. Cancellation wave arcs draw outward
        .to(
          arcs,
          {
            strokeDashoffset: 0,
            duration: 0.36,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.14'
        )
        // 3. Hinged triangular envelope flap opens upward in 3D perspective
        .to(
          flapRef.current,
          {
            rotateX: 168,
            duration: 0.52,
            ease: 'power2.inOut',
          },
          '+=0.06'
        )
        // Trigger hero typography & collage handoff right as envelope peels away
        .call(
          () => {
            if (!handoffFiredRef.current) {
              handoffFiredRef.current = true;
              onHandoff();
            }
          },
          undefined,
          '-=0.18'
        )
        // 4. Entire paper envelope lifts/peels off upward
        .to(
          sheetRef.current,
          {
            yPercent: -104,
            rotateZ: -1.1,
            duration: 0.62,
            ease: 'expo.inOut',
          },
          '-=0.16'
        );
    }, overlayRef);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [dismissed, finishImmediately, onHandoff]);

  if (dismissed) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      role="region"
      aria-label="Opening travel correspondence intro"
      className="fixed inset-0 z-50 overflow-hidden pointer-events-auto"
    >
      <div
        ref={sheetRef}
        className="pm-envelope-perspective relative flex h-full w-full flex-col items-center justify-center bg-[var(--pm-ivory)] pm-paper-grain shadow-[0_28px_70px_rgba(37,41,44,0.22)]"
      >
        {/* Top & bottom classic Par Avion airmail edge bands */}
        <div className="pm-airmail-band absolute inset-x-0 top-0 h-2.5 opacity-85" aria-hidden="true" />
        <div className="pm-airmail-band absolute inset-x-0 bottom-0 h-2.5 opacity-85" aria-hidden="true" />

        {/* Envelope lower body diagonal paper folds */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M 0 900 L 720 430 L 1440 900"
            fill="#F3EADE"
            stroke="rgba(90, 53, 40, 0.16)"
            strokeWidth="1.5"
          />
          <path
            d="M 0 0 L 530 470 M 1440 0 L 910 470"
            fill="none"
            stroke="rgba(90, 53, 40, 0.12)"
            strokeWidth="1.2"
          />
        </svg>

        {/* Hinged top triangular envelope flap */}
        <div
          ref={flapRef}
          className="pm-envelope-flap-hinge pointer-events-none absolute inset-x-0 top-0 h-[56%] z-10"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 520"
            preserveAspectRatio="none"
            className="h-full w-full drop-shadow-[0_12px_24px_rgba(75,52,35,0.12)]"
          >
            <polygon
              points="0,0 1440,0 720,485"
              fill="#FAF2E4"
              stroke="rgba(90, 53, 40, 0.22)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Center POSTMARK postal seal + animated red cancellation arcs */}
        <div
          ref={sealRef}
          className="relative z-20 flex flex-col items-center text-center px-6"
        >
          <div className="relative flex items-center justify-center rounded-full bg-[var(--pm-ivory)] p-4 border border-[var(--pm-brown)]/25 shadow-[0_14px_34px_rgba(90,53,40,0.18)]">
            <PostalCancellationSeal
              topText="POSTMARK"
              bottomText="COLLECT PLACES"
              centerText="MAIL"
              className="w-24 h-24 text-[var(--pm-brown)]"
            />
            <svg
              viewBox="0 0 180 80"
              className="pointer-events-none absolute left-[82%] top-1/2 -translate-y-1/2 w-36 h-16 overflow-visible"
              aria-hidden="true"
            >
              <g ref={arcsGroupRef}>
                <path
                  d="M 4 20 Q 34 8 64 20 T 124 20 T 168 20"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 8 34 Q 38 22 68 34 T 128 34 T 172 34"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 4 48 Q 34 36 64 48 T 124 48 T 168 48"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 62 Q 40 50 70 62 T 130 62"
                  fill="none"
                  stroke="#5A3528"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </g>
            </svg>
          </div>
          <p className="mt-5 font-editorial text-xl tracking-[-0.01em] text-[var(--pm-ink)]">
            POSTMARK
          </p>
          <p className="mt-1 font-ui text-xs uppercase tracking-[0.2em] text-[var(--pm-brown)]/80">
            Collect Places · Keep Stories
          </p>
        </div>

        {/* Accessible Skip Intro button */}
        <button
          type="button"
          onClick={finishImmediately}
          className="absolute bottom-7 right-7 z-30 min-h-[44px] px-4 py-2 rounded-full bg-[var(--pm-ivory)]/95 border border-[var(--pm-brown)]/30 font-ui text-xs font-medium tracking-[0.08em] uppercase text-[var(--pm-ink)] shadow-sm hover:bg-[var(--pm-parchment)] cursor-pointer"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
};

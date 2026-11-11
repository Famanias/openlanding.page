'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MANIFESTO_NOTES } from '../../lib/postmark/sampleMemories';
import { ensureGsapRegistered, usePrefersReducedMotion } from '../../lib/postmark/motion';

export const KeepsakeManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statementLine1Ref = useRef<HTMLSpanElement | null>(null);
  const statementLine2Ref = useRef<HTMLSpanElement | null>(null);
  const underlinePathRef = useRef<SVGPathElement | null>(null);
  const routeSvgPathRef = useRef<SVGPathElement | null>(null);
  const paperPlaneRef = useRef<SVGGElement | null>(null);
  const noteRefs = useRef<Array<HTMLElement | null>>([]);

  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Giant statement wide paper-cut clip-path wipes coordinated to early scroll entry
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 48%',
          scrub: 0.45,
        },
      });

      headlineTl
        .fromTo(
          statementLine1Ref.current,
          { clipPath: 'inset(0% 100% 0% 0%)', x: -18 },
          { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 0.45, ease: 'power2.out' }
        )
        .fromTo(
          statementLine2Ref.current,
          { clipPath: 'inset(0% 100% 0% 0%)', x: -18 },
          { clipPath: 'inset(0% 0% 0% 0%)', x: 0, duration: 0.45, ease: 'power2.out' },
          '+=0.06'
        );

      // 2. Handwritten ink underline stroke beneath "moments between destinations"
      if (underlinePathRef.current) {
        const uLen = underlinePathRef.current.getTotalLength();
        gsap.set(underlinePathRef.current, { strokeDasharray: uLen, strokeDashoffset: uLen });
        gsap.to(underlinePathRef.current, {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: underlinePathRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 3. Continuous hand-drawn SVG route + interpolated paper airplane across the 3 notes
      const routePath = routeSvgPathRef.current;
      const plane = paperPlaneRef.current;
      if (routePath && plane) {
        const totalLength = routePath.getTotalLength();
        gsap.set(routePath, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        const updatePlane = (progress: number) => {
          const dist = Math.max(0, Math.min(totalLength, progress * totalLength));
          const pt = routePath.getPointAtLength(dist);
          const nextPt = routePath.getPointAtLength(Math.min(totalLength, dist + 3));
          const angle = (Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * 180) / Math.PI;
          plane.setAttribute(
            'transform',
            `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
          );
        };
        updatePlane(0);

        ScrollTrigger.create({
          trigger: section,
          start: 'top 62%',
          end: 'bottom 72%',
          scrub: 0.75,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(routePath, { strokeDashoffset: totalLength * (1 - p) });
            updatePlane(p);
          },
        });
      }

      // 4. Staggered correspondence vignettes rotate in from off-angle & unmask lines
      const initialAngles = [-5.5, 4.8, -4.4];
      const restingAngles = [-1.8, 1.5, -1.2];

      noteRefs.current.forEach((card, idx) => {
        if (!card) return;
        const textLines = card.querySelectorAll<HTMLElement>('[data-note-mask]');
        const clipPin = card.querySelector<HTMLElement>('[data-note-clip]');

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        });

        cardTl
          .fromTo(
            card,
            {
              y: 34,
              rotateZ: initialAngles[idx] ?? -4,
              scale: 0.97,
            },
            {
              y: 0,
              rotateZ: restingAngles[idx] ?? 0,
              scale: 1,
              duration: 0.78,
              ease: 'back.out(1.3)',
            },
            0
          )
          .fromTo(
            clipPin,
            { y: -12, rotateZ: -10 },
            { y: 0, rotateZ: 0, duration: 0.48, ease: 'back.out(2)' },
            0.12
          )
          .fromTo(
            textLines,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.62, stagger: 0.08, ease: 'power3.out' },
            0.1
          );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const staggerOffsets = [
    'lg:mt-0 lg:justify-self-start',
    'lg:mt-20 lg:justify-self-center',
    'lg:mt-40 lg:justify-self-end',
  ];

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="pm-manifesto-heading"
      className="relative w-full bg-[var(--pm-ivory)] pm-paper-grain pb-24 pt-16 sm:pt-24 lg:pb-32"
    >
      {/* Torn-paper irregular top edge introducing Chapter 02 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-6 sm:-top-8 z-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block h-7 sm:h-9 w-full text-[var(--pm-ivory)] drop-shadow-[0_-4px_8px_rgba(75,52,35,0.05)]"
        >
          <path
            fill="currentColor"
            d="M0,48 L0,22 L48,18 L95,26 L152,14 L214,23 L278,16 L340,25 L408,13 L472,22 L538,15 L605,26 L668,14 L735,23 L804,12 L872,24 L936,16 L1005,25 L1072,14 L1140,22 L1208,15 L1275,25 L1342,16 L1402,22 L1440,17 L1440,48 Z"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Editorial letter header */}
        <div className="max-w-[980px]">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-brown)]/80">
            01 · The Keepsake Manifesto
          </p>

          <h2
            id="pm-manifesto-heading"
            className="mt-4 font-editorial text-[clamp(2.35rem,5.4vw,4.9rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-[var(--pm-ink)]"
          >
            <span ref={statementLine1Ref} className="block will-change-transform">
              THE TRIP ENDS.
            </span>
            <span ref={statementLine2Ref} className="block text-[var(--pm-brown)] will-change-transform">
              THE STORY DOESN’T.
            </span>
          </h2>

          <p className="mt-6 max-w-[58ch] font-ui text-lg sm:text-[21px] leading-[1.62] text-[var(--pm-ink)]/85">
            A train window. A corner café. The view you almost forgot to photograph. Keep the{' '}
            <span className="relative inline-block font-medium text-[var(--pm-ink)]">
              moments between destinations.
              <svg
                viewBox="0 0 290 14"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full overflow-visible"
              >
                <path
                  ref={underlinePathRef}
                  d="M 2 9 Q 76 3 148 8 T 288 6"
                  fill="none"
                  stroke="#D85743"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>
        </div>

        {/* Staggered Diagonal Desk Spread + Continuous Pen-Drawn SVG Route */}
        <div className="relative mt-14 lg:mt-20">
          {/* Desktop SVG Route connecting Vignette 1 -> 2 -> 3 with Paper Airplane */}
          <svg
            viewBox="0 0 1200 540"
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute inset-0 h-full w-full overflow-visible z-0"
          >
            <path
              d="M 210 135 C 390 45, 455 265, 600 245 C 760 225, 835 395, 995 365"
              fill="none"
              stroke="rgba(90, 53, 40, 0.16)"
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
            <path
              ref={routeSvgPathRef}
              d="M 210 135 C 390 45, 455 265, 600 245 C 760 225, 835 395, 995 365"
              fill="none"
              stroke="#D85743"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Animated 2D Vector Paper Airplane */}
            <g ref={paperPlaneRef} transform="translate(210, 135)">
              <polygon points="16,0 -11,-9 -6,0 -11,9" fill="#D85743" />
              <polygon points="16,0 -6,0 -9,5" fill="#AD4837" />
              <line x1="-6" y1="0" x2="16" y2="0" stroke="#FFF9EF" strokeWidth="0.9" />
            </g>
          </svg>

          {/* Three Irregular Pinned Correspondence Notes */}
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 items-start">
            {MANIFESTO_NOTES.map((note, idx) => (
              <article
                key={note.id}
                ref={(el) => {
                  noteRefs.current[idx] = el;
                }}
                className={`relative w-full max-w-[390px] pm-ruled-paper border border-[var(--pm-brown)]/20 p-6 sm:p-7 shadow-[0_16px_38px_rgba(75,52,35,0.10)] will-change-transform ${staggerOffsets[idx]}`}
              >
                {/* Brass / Washi Paper Clip at top */}
                <div
                  data-note-clip
                  aria-hidden="true"
                  className="absolute -top-3.5 left-7 flex items-center gap-2"
                >
                  <div className={idx === 1 ? 'pm-washi-sage h-6 w-20 -rotate-2' : 'pm-washi-stripe h-6 w-20 rotate-2'} />
                </div>

                {/* Top metadata row (unboxed clean text with separator) */}
                <div className="mt-1 flex items-center justify-between gap-2 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                  <span>{note.kicker}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[var(--pm-brown)]/70">{note.stampCode}</span>
                </div>

                {/* Masked Headline */}
                <h3 className="mt-4 overflow-hidden font-editorial text-[22px] sm:text-[24px] font-medium leading-[1.24] text-[var(--pm-ink)]">
                  <span data-note-mask className="block">
                    {note.title}
                  </span>
                </h3>

                {/* Masked Body */}
                <div className="mt-3 overflow-hidden">
                  <p
                    data-note-mask
                    className="font-ui text-[15px] leading-[1.65] text-[var(--pm-ink)]/80"
                  >
                    {note.body}
                  </p>
                </div>

                {/* Handwritten margin annotation */}
                <div className="mt-6 pt-3 border-t border-[var(--pm-brown)]/15 flex items-center justify-between gap-3">
                  <span className="font-hand text-[21px] leading-none text-[var(--pm-brown)]">
                    “{note.handwritten}”
                  </span>
                  <svg viewBox="0 0 28 28" className="h-6 w-6 text-[var(--pm-brown)]/45 shrink-0" aria-hidden="true">
                    <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
                    <path d="M 9 14 L 13 18 L 20 10" fill="none" stroke="#D85743" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

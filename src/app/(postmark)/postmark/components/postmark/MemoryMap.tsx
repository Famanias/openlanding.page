'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'motion/react';
import { POSTMARK_ASSETS } from '../../lib/postmark/assets';
import { computeCurvedRouteGeometry } from '../../lib/postmark/logic';
import {
  DESTINATION_LIST,
  DESTINATIONS,
  type DestinationId,
} from '../../lib/postmark/sampleMemories';
import {
  ensureGsapRegistered,
  prefersReducedMotionNow,
  scrollToSectionById,
  usePrefersReducedMotion,
} from '../../lib/postmark/motion';
import { MotionText } from './MotionText';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal, SVGStamp } from './SVGStamp';

export const MemoryMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState<DestinationId>('kyoto');
  const [previousId, setPreviousId] = useState<DestinationId>('lisbon');
  const [ripplePinId, setRipplePinId] = useState<DestinationId | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const mapBoardRef = useRef<HTMLDivElement | null>(null);
  const activeRoutePathRef = useRef<SVGPathElement | null>(null);
  const planeMarkerRef = useRef<SVGGElement | null>(null);
  const productVignetteRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const activeDestination = DESTINATIONS[selectedId];
  const prevDestination = DESTINATIONS[previousId];

  const routeGeometry = computeCurvedRouteGeometry(
    prevDestination.mapPoint,
    activeDestination.mapPoint,
    1
  );

  // Entrance choreography for map sheet & tall product vignette
  useEffect(() => {
    if (reducedMotion) return;
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapBoardRef.current,
        { y: 36, rotateZ: -1.4, scale: 0.98 },
        {
          y: 0,
          rotateZ: 0,
          scale: 1,
          duration: 0.92,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapBoardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        productVignetteRef.current,
        { y: 48, rotateZ: 3.2 },
        {
          y: 0,
          rotateZ: 1.6,
          duration: 0.98,
          ease: 'back.out(1.25)',
          scrollTrigger: {
            trigger: productVignetteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Animate SVG route line & airplane flight whenever selected destination changes
  useEffect(() => {
    const pathEl = activeRoutePathRef.current;
    const planeEl = planeMarkerRef.current;
    if (!pathEl || !planeEl) return;

    if (reducedMotion) {
      const endGeom = computeCurvedRouteGeometry(
        prevDestination.mapPoint,
        activeDestination.mapPoint,
        1
      );
      pathEl.removeAttribute('stroke-dasharray');
      pathEl.removeAttribute('stroke-dashoffset');
      planeEl.setAttribute(
        'transform',
        `translate(${endGeom.point.x}, ${endGeom.point.y}) rotate(${endGeom.angleDeg})`
      );
      return;
    }

    const totalLen = pathEl.getTotalLength();
    gsap.set(pathEl, {
      strokeDasharray: totalLen,
      strokeDashoffset: totalLen,
    });

    const proxy = { t: 0 };
    const placePlane = (tVal: number) => {
      const dist = Math.max(0, Math.min(totalLen, tVal * totalLen));
      const pt = pathEl.getPointAtLength(dist);
      const ahead = pathEl.getPointAtLength(Math.min(totalLen, dist + 3));
      const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      planeEl.setAttribute(
        'transform',
        `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
      );
    };
    placePlane(0);

    const tl = gsap.timeline();
    tl.to(pathEl, {
      strokeDashoffset: 0,
      duration: 0.95,
      ease: 'power2.inOut',
    }).to(
      proxy,
      {
        t: 0.92,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => placePlane(proxy.t),
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [activeDestination.mapPoint, prevDestination.mapPoint, reducedMotion, selectedId]);

  const handleSelectCity = (cityId: DestinationId) => {
    if (cityId !== selectedId) {
      setPreviousId(selectedId);
      setSelectedId(cityId);
    }
    setRipplePinId(cityId);
    window.setTimeout(() => setRipplePinId(null), 500);
  };

  const handleMapPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || prefersReducedMotionNow() || !mapBoardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(mapBoardRef.current, {
      rotateY: nx * 3.2,
      rotateX: -ny * 2.6,
      transformPerspective: 1100,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMapPointerLeave = () => {
    if (prefersReducedMotionNow() || !mapBoardRef.current) return;
    gsap.to(mapBoardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      id="destinations"
      ref={sectionRef}
      aria-labelledby="pm-map-heading"
      className="relative w-full bg-[var(--pm-parchment)]/55 pm-paper-grain py-20 sm:py-28 border-t border-[var(--pm-brown)]/15 overflow-hidden"
    >
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        {/* Editorial Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[700px]">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pm-red-deep)]">
              03 · Illustrated Memory Atlas · Illustrative Demo Map
            </p>
            <MotionText
              as="h2"
              id="pm-map-heading"
              lines={['A line on a map.', 'A thousand stories around it.']}
              mode="mask-up"
              className="mt-2 font-editorial text-[clamp(2.2rem,4.4vw,3.9rem)] font-semibold leading-[1.06] tracking-[-0.022em] text-[var(--pm-ink)]"
            />
          </div>

          <div className="flex items-center gap-3">
            <PaperButton
              variant="outline"
              size="md"
              onClick={() => scrollToSectionById('journal')}
            >
              View All Memories →
            </PaperButton>
          </div>
        </div>

        {/* Oversized 2D Map Desk (65% width) + Overlapping Product Print & Unfolding Memory Drawer */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* LEFT / MAIN: Illustrated Cartographic Parchment Sheet */}
          <div className="lg:col-span-8">
            <div
              ref={mapBoardRef}
              onPointerMove={handleMapPointerMove}
              onPointerLeave={handleMapPointerLeave}
              className="relative overflow-hidden rounded-lg border border-[var(--pm-brown)]/25 bg-[#F4EAD8] p-3 sm:p-5 shadow-[0_22px_54px_rgba(62,41,26,0.14)] will-change-transform"
            >
              {/* Washi tape corners */}
              <div aria-hidden="true" className="pm-washi-stripe absolute -top-2 left-8 h-5 w-20 -rotate-3 z-20" />
              <div aria-hidden="true" className="pm-washi-sage absolute -top-2 right-10 h-5 w-20 rotate-2 z-20" />

              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--pm-brown)]/20 bg-[#EFE3CC]">
                {/* Abstract Cartographic SVG World & Route Layer */}
                <svg
                  viewBox="0 0 960 520"
                  className="h-full w-full select-none"
                  role="img"
                  aria-label="Abstract illustrated travel correspondence map linking Lisbon, Copenhagen, and Kyoto"
                >
                  {/* Subtle Sea Tint & Graticule Grid */}
                  <rect x="0" y="0" width="960" height="520" fill="#E6EEF0" opacity="0.55" />
                  <g stroke="rgba(90,53,40,0.10)" strokeWidth="1">
                    <line x1="0" y1="130" x2="960" y2="130" strokeDasharray="4 6" />
                    <line x1="0" y1="260" x2="960" y2="260" />
                    <line x1="0" y1="390" x2="960" y2="390" strokeDasharray="4 6" />
                    <line x1="240" y1="0" x2="240" y2="520" strokeDasharray="4 6" />
                    <line x1="480" y1="0" x2="480" y2="520" />
                    <line x1="720" y1="0" x2="720" y2="520" strokeDasharray="4 6" />
                  </g>

                  {/* Stylized Illustrated Parchment Landmasses */}
                  <g fill="#EFE3CC" stroke="rgba(90,53,40,0.28)" strokeWidth="1.4">
                    {/* Western Europe & Iberia */}
                    <path d="M 155 245 Q 190 215 248 225 L 315 190 Q 370 155 430 130 L 495 135 Q 525 165 505 215 L 460 250 Q 410 275 350 295 L 270 335 Q 210 350 185 320 Z" />
                    {/* Scandinavian Peninsula */}
                    <path d="M 405 72 Q 458 58 498 88 L 486 148 Q 445 162 420 138 Z" />
                    {/* Mediterranean / North Coast */}
                    <path d="M 195 368 Q 310 352 440 385 L 475 465 L 175 470 Z" opacity="0.82" />
                    {/* Eastern Continent & Japanese Archipelago */}
                    <path d="M 545 145 Q 635 120 710 175 L 705 295 Q 645 335 568 300 Z" />
                    <path d="M 718 228 Q 758 216 782 248 Q 775 295 735 322 Q 712 300 718 228 Z" />
                    <path d="M 764 176 Q 792 172 802 198 Q 782 214 764 198 Z" />
                  </g>

                  {/* Topographic Contour Whisper Lines */}
                  <path
                    d="M 210 275 Q 290 245 385 255 M 580 205 Q 640 190 685 225"
                    fill="none"
                    stroke="rgba(90,53,40,0.18)"
                    strokeWidth="1.1"
                  />

                  {/* Compass Rose bottom-left */}
                  <g transform="translate(86, 438)" opacity="0.65">
                    <circle cx="0" cy="0" r="28" fill="none" stroke="#5A3528" strokeWidth="1.2" />
                    <polygon points="0,-32 5,-6 0,-11 -5,-6" fill="#D85743" />
                    <polygon points="0,32 4,6 0,11 -4,6" fill="#5A3528" />
                    <line x1="-28" y1="0" x2="28" y2="0" stroke="#5A3528" strokeWidth="1" />
                    <text x="0" y="-36" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5A3528">
                      N
                    </text>
                  </g>

                  {/* Background Archive Network Dotted Arcs */}
                  <path
                    d="M 215 310 Q 330 185 448 158"
                    fill="none"
                    stroke="rgba(90,53,40,0.22)"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M 448 158 Q 598 145 745 278"
                    fill="none"
                    stroke="rgba(90,53,40,0.22)"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                  />
                  <path
                    d="M 215 310 Q 480 180 745 278"
                    fill="none"
                    stroke="rgba(90,53,40,0.18)"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                  />

                  {/* Active Drawn Route Between Previous & Selected Destination */}
                  <path
                    ref={activeRoutePathRef}
                    d={routeGeometry.svgPath}
                    fill="none"
                    stroke="#D85743"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />

                  {/* Illustrated Plane Marker Following Active Route */}
                  <g
                    ref={planeMarkerRef}
                    transform={`translate(${routeGeometry.point.x}, ${routeGeometry.point.y}) rotate(${routeGeometry.angleDeg})`}
                  >
                    <polygon
                      points="13,0 -9,-8 -5,0 -9,8"
                      fill="#D85743"
                      stroke="#FFF9EF"
                      strokeWidth="1.2"
                    />
                  </g>
                </svg>

                {/* Real Interactive Accessible HTML Pin Buttons Positioned Over Map Coordinates */}
                {DESTINATION_LIST.map((dest) => {
                  const isSelected = dest.id === selectedId;
                  const leftPct = `${(dest.mapPoint.x / 960) * 100}%`;
                  const topPct = `${(dest.mapPoint.y / 520) * 100}%`;

                  return (
                    <button
                      key={dest.id}
                      type="button"
                      aria-label={`Select ${dest.city}, ${dest.country} memory`}
                      aria-pressed={isSelected}
                      onClick={() => handleSelectCity(dest.id)}
                      style={{ left: leftPct, top: topPct }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer z-10"
                    >
                      {/* Click ink ripple */}
                      {ripplePinId === dest.id && (
                        <span
                          aria-hidden="true"
                          className="pm-stamp-ripple-ring pointer-events-none absolute left-1/2 top-1/2 h-11 w-11 rounded-full border-2 border-[var(--pm-red)]"
                        />
                      )}

                      {/* Hover outer halo */}
                      <span
                        aria-hidden="true"
                        className={`absolute h-9 w-9 rounded-full border transition-transform duration-200 ${
                          isSelected
                            ? 'scale-110 border-[var(--pm-red)] bg-[var(--pm-red)]/15'
                            : 'scale-90 border-[var(--pm-brown)]/40 bg-transparent group-hover:scale-110'
                        }`}
                      />

                      {/* Pin core */}
                      <span
                        aria-hidden="true"
                        className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--pm-ivory)] shadow-md transition-transform duration-200 ${
                          isSelected ? 'scale-125 bg-[var(--pm-red)]' : 'bg-[var(--pm-brown)] group-hover:bg-[var(--pm-red)]'
                        }`}
                      />

                      {/* Printed place callout tag */}
                      <span
                        className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 font-ui text-[11px] font-semibold tracking-[0.04em] border shadow-sm transition-colors ${
                          isSelected
                            ? 'bg-[var(--pm-ink)] text-[var(--pm-ivory)] border-[var(--pm-ink)]'
                            : 'bg-[var(--pm-ivory)]/95 text-[var(--pm-ink)] border-[var(--pm-brown)]/25'
                        }`}
                      >
                        {dest.city}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Direct Tappable City Controls Beneath Map (Mobile & Keyboard Friendly) */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Choose destination memory">
                  {DESTINATION_LIST.map((dest) => {
                    const active = dest.id === selectedId;
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleSelectCity(dest.id)}
                        className={`min-h-[42px] px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[var(--pm-red)] text-[var(--pm-ivory)] border-[var(--pm-red-deep)]'
                            : 'bg-[var(--pm-ivory)] text-[var(--pm-ink)] border-[var(--pm-brown)]/25 hover:bg-[var(--pm-parchment)]'
                        }`}
                      >
                        {dest.city} · {dest.code}
                      </button>
                    );
                  })}
                </div>

                <span className="font-ui text-xs text-[var(--pm-brown)]/75">
                  Illustrative correspondence map · Not live GPS
                </span>
              </div>
            </div>

            {/* Unfolding Horizontal Postcard Note Drawer */}
            <div className="relative mt-7">
              {/* Underlying previous memory sheet slipped at subtle angle */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-y-2 -rotate-1 border border-[var(--pm-brown)]/18 bg-[var(--pm-ivory)]/75 shadow-sm"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={activeDestination.id}
                  initial={reducedMotion ? false : { clipPath: 'inset(0% 100% 0% 0%)', x: -18 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0.4, x: 12 }}
                  transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                  className="relative z-10 pm-postcard-sheet p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center"
                >
                  <div className="sm:col-span-8">
                    <div className="flex flex-wrap items-center gap-2 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pm-red-deep)]">
                      <span>{activeDestination.city}, {activeDestination.country}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[var(--pm-brown)]/75">{activeDestination.dateLabel}</span>
                    </div>

                    <h3 className="mt-2 font-editorial text-2xl font-semibold text-[var(--pm-ink)]">
                      {activeDestination.storyTitle}
                    </h3>

                    <p className="mt-2 font-ui text-[15px] leading-[1.62] text-[var(--pm-ink)]/82">
                      {activeDestination.storyExcerpt}
                    </p>

                    <p className="mt-3 font-hand text-[22px] text-[var(--pm-brown)]">
                      “{activeDestination.sampleNote}”
                    </p>

                    <div className="mt-3 pt-3 border-t border-[var(--pm-brown)]/12 font-ui text-xs text-[var(--pm-brown)]/80">
                      {activeDestination.detailTag} · {activeDestination.coordinatesLabel}
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex sm:flex-col items-center sm:items-end justify-between gap-3">
                    <div className="flex items-center">
                      <PostalCancellationSeal
                        topText={activeDestination.city.toUpperCase()}
                        bottomText="PINNED PLACE"
                        centerText={activeDestination.code}
                        className="h-14 w-14 text-[var(--pm-brown)]/70 -mr-3 z-10"
                      />
                      <SVGStamp stampId={activeDestination.defaultStamp} size="sm" />
                    </div>
                    <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pm-brown)]/65">
                      {activeDestination.postmarkCode}
                    </span>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Tall Overlapping Product Print Vignette (04-feature-memory-map.webp) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              ref={productVignetteRef}
              className="relative w-full max-w-[390px] pm-photo-print p-3 sm:p-4 will-change-transform"
            >
              <div aria-hidden="true" className="pm-washi-stripe absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-24 rotate-1 z-10" />
              <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--pm-paper)]">
                <img
                  src={POSTMARK_ASSETS.memoryMap}
                  alt="POSTMARK Memory Map phone view showing Japan Journey pins in Kyoto with Polaroid prints and transit tickets"
                  width={896}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                <div>
                  <p className="font-editorial text-base font-semibold text-[var(--pm-ink)]">
                    Every Pin Has a Story
                  </p>
                  <p className="font-ui text-xs text-[var(--pm-brown)]/75">
                    Photos, tickets, and routes kept side by side
                  </p>
                </div>
                <span className="font-hand text-xl text-[var(--pm-red-deep)] shrink-0">
                  Kyoto ’26
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

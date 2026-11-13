'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './InteractivePrimitives';
import { playTactileClick } from '../utils/acousticAudio';

gsap.registerPlugin(ScrollTrigger);

interface ChapterMeta {
  index: string;
  id: 'form' | 'function' | 'freedom';
  title: string;
  headline: string;
  body: string;
  metrics: { label: string; value: string }[];
}

const CHAPTERS: ChapterMeta[] = [
  {
    index: '01',
    id: 'form',
    title: '01. Form',
    headline: 'Sculpted to quiet a room.',
    body: 'Each 600 × 600 mm panel combines a sculpted face, an acoustic core, and concealed mounting.',
    metrics: [
      { label: 'Module Tolerance', value: '±0.15 mm' },
      { label: 'Relief Depth', value: '58 – 82 mm' },
      { label: 'Fire Rating', value: 'EN 13501 A2-s1' },
    ],
  },
  {
    index: '02',
    id: 'function',
    title: '02. Function',
    headline: 'Less echo. Clearer conversation.',
    body: 'Angled surfaces scatter sound. The porous core absorbs it.',
    metrics: [
      { label: 'Verified Absorption', value: '0.95 NRC' },
      { label: 'Speech Band (500–2k Hz)', value: '0.98 αw' },
      { label: 'Reverb Reduction', value: '-68% RT60' },
    ],
  },
  {
    index: '03',
    id: 'freedom',
    title: '03. Freedom',
    headline: 'A wall you can change.',
    body: 'Rotate tiles or swap finishes to create a new pattern.',
    metrics: [
      { label: 'Rotational States', value: '4 × 90° Axes' },
      { label: 'Tile Swap Time', value: '< 8 Seconds' },
      { label: 'Pattern Permutations', value: '4.2M+ / Wall' },
    ],
  },
];

const FREEDOM_PRESETS = [
  {
    id: 'cantilever',
    name: 'Cantilever Sweep',
    rotations: [
      0, 0, 90, 90, 180, 180,
      0, 90, 90, 180, 180, 270,
      90, 90, 180, 180, 270, 270,
      90, 180, 180, 270, 270, 0,
    ],
  },
  {
    id: 'vault',
    name: 'Tessellated Vault',
    rotations: [
      0, 90, 0, 180, 270, 180,
      90, 0, 90, 270, 180, 270,
      270, 180, 270, 90, 0, 90,
      180, 270, 180, 0, 90, 0,
    ],
  },
  {
    id: 'horizon',
    name: 'Monolithic Horizon',
    rotations: [
      0, 180, 0, 180, 0, 180,
      90, 270, 90, 270, 90, 270,
      0, 180, 0, 180, 0, 180,
      90, 270, 90, 270, 90, 270,
    ],
  },
] as const;

export const PinnedChaptersSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktopPin, setIsDesktopPin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });
  const [activeChapter, setActiveChapter] = useState<0 | 1 | 2>(0);
  const [chapterProgress, setChapterProgress] = useState<number>(1);
  const [freedomPresetIdx, setFreedomPresetIdx] = useState<number>(0);

  const pinWrapRef = useRef<HTMLDivElement>(null);
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const onResize = () => {
      setIsDesktopPin(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const shouldPin = isDesktopPin && !reducedMotion;

  useEffect(() => {
    if (!shouldPin || !pinWrapRef.current) {
      triggerInstanceRef.current = null;
      return;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.chapter-stage-panel');
      const visuals = gsap.utils.toArray<HTMLElement>('.chapter-visual-panel');

      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set([panels[1], panels[2]], { autoAlpha: 0, y: 36 });

      gsap.set(visuals[0], { autoAlpha: 1, scale: 1, rotateX: 0 });
      gsap.set([visuals[1], visuals[2]], { autoAlpha: 0, scale: 0.92, rotateX: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: 'top top',
          end: '+=360%', // Generous 3.6x viewport scroll distance for all 3 chapters + Chapter 3 readable hold
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveChapter(0);
              setChapterProgress(Math.min(1, p / 0.22));
            } else if (p < 0.67) {
              setActiveChapter(1);
              setChapterProgress(Math.min(1, (p - 0.33) / 0.22));
            } else {
              setActiveChapter(2);
              const subP = Math.min(1, (p - 0.67) / 0.16);
              setChapterProgress(subP);
              // Automatically cycle Freedom arrangement as user scrolls through Chapter 3
              if (p < 0.78) setFreedomPresetIdx(0);
              else if (p < 0.89) setFreedomPresetIdx(1);
              else setFreedomPresetIdx(2);
            }
          },
        },
      });

      triggerInstanceRef.current = tl.scrollTrigger ?? null;

      // 0 -> 28: Chapter 01 (FORM) readable hold & layer separation
      tl.fromTo(
        '.form-layer-plate',
        { y: 0 },
        {
          y: (i: number) => (i - 1.5) * -34,
          duration: 14,
          ease: 'power2.out',
        },
        0,
      );
      tl.to({}, { duration: 14 }, 14); // Hold Chapter 01

      // 28 -> 36: Transition Chapter 01 -> Chapter 02 (FUNCTION)
      tl.to(panels[0], { autoAlpha: 0, y: -32, duration: 8, ease: 'power2.inOut' }, 28);
      tl.to(visuals[0], { autoAlpha: 0, scale: 0.93, duration: 8, ease: 'power2.inOut' }, 28);

      tl.to(panels[1], { autoAlpha: 1, y: 0, duration: 8, ease: 'power2.out' }, 31);
      tl.to(visuals[1], { autoAlpha: 1, scale: 1, rotateX: 0, duration: 8, ease: 'power2.out' }, 31);

      // 39 -> 64: Hold Chapter 02 cleanly
      tl.to({}, { duration: 25 }, 39);

      // 64 -> 72: Transition Chapter 02 -> Chapter 03 (FREEDOM)
      tl.to(panels[1], { autoAlpha: 0, y: -32, duration: 8, ease: 'power2.inOut' }, 64);
      tl.to(visuals[1], { autoAlpha: 0, scale: 0.93, duration: 8, ease: 'power2.inOut' }, 64);

      tl.to(panels[2], { autoAlpha: 1, y: 0, duration: 8, ease: 'power2.out' }, 67);
      tl.to(visuals[2], { autoAlpha: 1, scale: 1, rotateX: 0, duration: 8, ease: 'power2.out' }, 67);

      // 75 -> 100: Dedicated long readable hold for Chapter 03 before releasing pin!
      tl.to({}, { duration: 25 }, 75);
    }, pinWrapRef);

    return () => ctx.revert();
  }, [shouldPin]);

  const jumpToChapter = (chapterIdx: 0 | 1 | 2) => {
    playTactileClick(250);
    setActiveChapter(chapterIdx);
    const st = triggerInstanceRef.current;
    if (shouldPin && st) {
      const targetProgress = chapterIdx === 0 ? 0.14 : chapterIdx === 1 ? 0.48 : 0.84;
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`chapter-mobile-${CHAPTERS[chapterIdx].id}`);
      el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  // RenderVisual helper so desktop pinned and mobile stacked share rich bespoke visual diagrams
  const renderChapterVisual = (idx: 0 | 1 | 2, interactiveProgress = 1) => {
    if (idx === 0) {
      // CHAPTER 01 — FORM: Exploded Isometric 4-Layer CAD Schematic
      const spread = shouldPin ? 28 : 24;
      const layers = [
        {
          name: '01. Sculpted Mineral Faceplate',
          spec: '58mm Sintered Limestone · 22° Oblique Bevel',
          fill: '#CEC8BE',
          stroke: '#E5E1D8',
          offsetY: -1.5 * spread,
        },
        {
          name: '02. Slotted Helmholtz Plate',
          spec: '0.8mm Tuned Resonance Slots · Vocal Band Trap',
          fill: '#6E4E3A',
          stroke: '#C89D66',
          offsetY: -0.5 * spread,
        },
        {
          name: '03. Recycled PET Acoustic Core',
          spec: '48 kg/m³ Open-Cell Absorber · Class A Damping',
          fill: '#232832',
          stroke: '#64748B',
          offsetY: 0.5 * spread,
        },
        {
          name: '04. Quick-Lock Magnetic Sub-Cleat',
          spec: 'Anodized Bronze Rail Interface · ±0.15mm Lock',
          fill: '#151921',
          stroke: '#C89D66',
          offsetY: 1.5 * spread,
        },
      ];

      return (
        <div className="w-full h-full flex flex-col justify-between bg-[#111419] border border-slate-200/12 rounded-xl p-5 sm:p-7">
          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
            <span>Panel layers</span>
            <span className="text-[#E2C399]">600 × 600 × 74 mm</span>
          </div>

          <div className="my-auto py-4">
            <svg
              viewBox="0 0 560 340"
              className="w-full h-auto max-h-[320px] overflow-visible"
              role="img"
              aria-label="Exploded four-layer isometric architectural diagram of a Tessera acoustic tile"
            >
              {/* Central vertical alignment axis */}
              <line
                x1="215"
                y1="26"
                x2="215"
                y2="314"
                stroke="#C89D66"
                strokeOpacity="0.35"
                strokeDasharray="4 4"
              />
              {layers.map((layer, lIdx) => {
                const baseCy = 170 + layer.offsetY;
                return (
                  <g
                    key={layer.name}
                    className="form-layer-plate"
                    transform={`translate(0, ${shouldPin ? 0 : layer.offsetY})`}
                  >
                    {/* Isometric diamond plate */}
                    <polygon
                      points={`215,${(shouldPin ? 170 : 170) - 42} 335,${shouldPin ? 170 : 170} 215,${(shouldPin ? 170 : 170) + 42} 95,${shouldPin ? 170 : 170}`}
                      fill={layer.fill}
                      fillOpacity={lIdx === 0 ? 0.92 : 0.86}
                      stroke={layer.stroke}
                      strokeWidth="1.4"
                    />
                    {/* Internal isometric detail lines per layer */}
                    {lIdx === 0 && (
                      <polygon
                        points="215,136 312,170 215,194 135,170"
                        fill="#EAE6DF"
                        fillOpacity="0.35"
                      />
                    )}
                    {lIdx === 1 && (
                      <g stroke="#E2C399" strokeWidth="1.2" strokeOpacity="0.75">
                        <line x1="165" y1="162" x2="255" y2="162" />
                        <line x1="155" y1="170" x2="275" y2="170" />
                        <line x1="165" y1="178" x2="255" y2="178" />
                      </g>
                    )}
                    {lIdx === 3 && (
                      <circle
                        cx="215"
                        cy="170"
                        r="10"
                        fill="none"
                        stroke="#C89D66"
                        strokeWidth="2"
                      />
                    )}
                    {/* Leader callout line & text */}
                    <line
                      x1="335"
                      y1="170"
                      x2="366"
                      y2="170"
                      stroke="#C89D66"
                      strokeOpacity="0.65"
                      strokeWidth="1"
                    />
                    <circle cx="335" cy="170" r="2.5" fill="#C89D66" />
                    <text
                      x="374"
                      y="167"
                      fill="#F1F5F9"
                      fontSize="11.5"
                      fontWeight="600"
                    >
                      {layer.name}
                    </text>
                    <text
                      x="374"
                      y="182"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {layer.spec}
                    </text>
                    <title>{`${layer.name} (${baseCy})`}</title>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#64748B] pt-3 border-t border-slate-200/10">
            <span>Zero VOC Mineral &amp; Wool Binder</span>
            <span>Concealed Shadow Joint: 4.0 mm</span>
          </div>
        </div>
      );
    }

    if (idx === 1) {
      // CHAPTER 02 — FUNCTION: Sound Dispersion & Octave Absorption Visualizer
      const bands = [
        { hz: '125 Hz', untreated: 12, tessera: 58 },
        { hz: '250 Hz', untreated: 14, tessera: 84 },
        { hz: '500 Hz', untreated: 16, tessera: 95 },
        { hz: '1 kHz', untreated: 18, tessera: 98 },
        { hz: '2 kHz', untreated: 20, tessera: 95 },
        { hz: '4 kHz', untreated: 22, tessera: 91 },
      ];
      const dashOffset = Math.round((1 - Math.max(0.2, interactiveProgress)) * 220);

      return (
        <div className="w-full h-full flex flex-col justify-between bg-[#111419] border border-slate-200/12 rounded-xl p-5 sm:p-7 space-y-5">
          <div className="flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
            <span>Sound absorption</span>
            <span className="text-[#E2C399]">ISO 354 · αw = 0.95 (Class A)</span>
          </div>

          {/* Acoustic Ray-Scattering Cross-Section SVG */}
          <div className="bg-[#0B0D10] border border-slate-200/10 rounded-lg p-4">
            <svg
              viewBox="0 0 520 165"
              className="w-full h-auto"
              role="img"
              aria-label="Acoustic wave dispersion diagram showing incident sound energy scattered and absorbed by beveled Tessera facets"
            >
              {/* Beveled acoustic wall cross-section at bottom */}
              <polygon
                points="20,148 85,112 150,142 215,106 280,142 345,108 410,142 475,112 505,148 505,160 20,160"
                fill="#1E2430"
                stroke="#C89D66"
                strokeWidth="1.5"
              />
              {/* Incident High-Energy Sound Vectors (Gold) */}
              <g
                stroke="#E2C399"
                strokeWidth="2"
                fill="none"
                strokeDasharray="240"
                strokeDashoffset={dashOffset}
              >
                <path d="M 55,18 L 215,106" />
                <path d="M 135,14 L 280,138" />
                <path d="M 225,14 L 345,108" />
              </g>
              {/* Diffused Low-Energy Micro-Rays (Cool Muted Slate) */}
              <g
                stroke="#93C5FD"
                strokeOpacity="0.6"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                fill="none"
              >
                <path d="M 215,106 L 155,40" />
                <path d="M 215,106 L 265,34" />
                <path d="M 215,106 L 325,58" />
                <path d="M 345,108 L 315,36" />
                <path d="M 345,108 L 415,32" />
                <path d="M 345,108 L 475,66" />
              </g>
              <text
                x="28"
                y="32"
                fill="#E2C399"
                fontSize="10.5"
                fontFamily="IBM Plex Mono, monospace"
              >
                Incident Direct Wave (85 dB)
              </text>
              <text
                x="335"
                y="26"
                fill="#93C5FD"
                fontSize="10.5"
                fontFamily="IBM Plex Mono, monospace"
              >
                Diffused Scatter (-18 dB)
              </text>
            </svg>
          </div>

          {/* 6-Band Octave Absorption Comparison */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8]">
              <span>Absorption by frequency</span>
              <span>Tessera vs. Raw Concrete</span>
            </div>
            <div className="grid grid-cols-6 gap-2 sm:gap-3 pt-1">
              {bands.map((b) => (
                <div key={b.hz} className="flex flex-col items-center gap-1.5">
                  <div className="w-full h-24 bg-[#0B0D10] rounded border border-slate-200/10 flex items-end justify-center gap-1 p-1.5">
                    <div
                      style={{ height: `${b.untreated}%` }}
                      className="w-2 bg-slate-600/60 rounded-t-xs"
                      title={`Untreated Concrete: ${(b.untreated / 100).toFixed(2)}`}
                    />
                    <div
                      style={{
                        height: `${Math.round(b.tessera * Math.max(0.35, interactiveProgress))}%`,
                      }}
                      className="w-2.5 bg-[#C89D66] rounded-t-xs transition-all duration-300"
                      title={`Tessera System: ${(b.tessera / 100).toFixed(2)}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono-tabular text-[#94A3B8] whitespace-nowrap">
                    {b.hz}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 03 — FREEDOM: Interactive Modular Elevation Matrix
    const activePreset = FREEDOM_PRESETS[freedomPresetIdx] ?? FREEDOM_PRESETS[0];

    return (
      <div className="w-full flex flex-col justify-between bg-[#111419] border border-slate-200/12 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono-tabular text-[#94A3B8]">
            MODULAR ELEVATION · 6 × 4 MATRIX
          </span>
          <div
            role="group"
            aria-label="Chapter 03 Pattern Presets"
            className="flex items-center gap-1 bg-[#0B0D10] p-1 rounded-md border border-slate-200/10"
          >
            {FREEDOM_PRESETS.map((preset, pIdx) => {
              const selected = pIdx === freedomPresetIdx;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    playTactileClick(280);
                    setFreedomPresetIdx(pIdx);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selected
                      ? 'bg-[#C89D66] text-[#0B0D10] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Rearranging 24-Tile Architectural Elevation (proportioned cleanly for 900px vh) */}
        <div className="grid grid-cols-6 gap-2 max-w-[430px] w-full mx-auto my-auto py-1">
          {activePreset.rotations.map((deg, tileIdx) => {
            const warmAccent = (tileIdx + freedomPresetIdx) % 3 === 0;
            return (
              <div
                key={tileIdx}
                className="aspect-square rounded bg-[#0B0D10] border border-slate-200/15 p-1 flex items-center justify-center overflow-hidden"
              >
                <svg
                  viewBox="0 0 48 48"
                  style={{ transform: `rotate(${deg}deg)` }}
                  className="w-full h-full transition-transform duration-500 ease-out"
                  aria-hidden="true"
                >
                  <polygon
                    points="0,0 48,0 30,48 0,48"
                    fill={warmAccent ? '#C89D66' : '#CEC8BE'}
                    fillOpacity={warmAccent ? '0.4' : '0.24'}
                  />
                  <polygon
                    points="48,0 48,48 30,48"
                    fill="#1E2430"
                  />
                  <line
                    x1="34"
                    y1="6"
                    x2="34"
                    y2="42"
                    stroke="#C89D66"
                    strokeOpacity="0.7"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="40"
                    y1="6"
                    x2="40"
                    y2="42"
                    stroke="#C89D66"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                  />
                  <circle cx="8" cy="8" r="1.8" fill="#C89D66" />
                </svg>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[#94A3B8] pt-3 border-t border-slate-200/10">
          <span>Active Rhythm: {activePreset.name}</span>
          <span className="text-[#E2C399]">24 Interchangeable Units · 8.64 m²</span>
        </div>
      </div>
    );
  };

  // Desktop Pinned Experience (>= 1024px & !prefersReducedMotion)
  if (shouldPin) {
    return (
      <section id="system" className="relative bg-[#0B0D10] border-t border-slate-200/10">
        <div
          ref={pinWrapRef}
          data-active-chapter={CHAPTERS[activeChapter].id}
          className="h-screen w-full flex flex-col justify-between pt-20 pb-8 px-8 max-w-[1360px] mx-auto"
        >
          {/* Top Chapter Progress & Direct Jump Bar */}
          <div className="flex items-center justify-between gap-8 pb-4 border-b border-slate-200/10 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
              <span>How it works</span>
            </div>

            <div
              role="tablist"
              aria-label="System Chapters"
              className="flex items-center gap-2 bg-[#111419] p-1 rounded-lg border border-slate-200/10"
            >
              {CHAPTERS.map((ch, idx) => {
                const isCurrent = activeChapter === idx;
                return (
                  <button
                    key={ch.id}
                    role="tab"
                    type="button"
                    aria-selected={isCurrent}
                    onClick={() => jumpToChapter(idx as 0 | 1 | 2)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                      isCurrent
                        ? 'bg-[#C89D66] text-[#0B0D10] font-semibold'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                    }`}
                  >
                    {ch.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Synchronized Two-Column Pinned Stage */}
          <div className="grid grid-cols-12 gap-12 items-center my-auto py-2 flex-1 min-h-0">
            {/* Left Narrative Stage */}
            <div className="col-span-5 relative min-h-[340px] flex items-center">
              {CHAPTERS.map((ch, idx) => (
                <article
                  key={ch.id}
                  data-chapter-panel={ch.id}
                  className={`chapter-stage-panel ${
                    idx === 0 ? 'relative' : 'absolute inset-0 flex flex-col justify-center'
                  } space-y-5`}
                >
                  <h2 className="font-display text-[clamp(2rem,3vw,2.85rem)] leading-[1.1] font-normal text-[#F8FAFC]">
                    {ch.headline}
                  </h2>

                  <p className="text-[15px] leading-[1.68] text-[#94A3B8]">
                    {ch.body}
                  </p>

                  <dl className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/10">
                    {ch.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-[11px] text-[#64748B] mb-1">{m.label}</dt>
                        <dd className="font-mono-tabular text-sm font-medium text-[#F1F5F9]">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>

            {/* Right Visual Choreography Stage */}
            <div className="col-span-7 relative min-h-[380px] flex items-center">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`chapter-visual-panel w-full ${
                    idx === 0 ? 'relative' : 'absolute inset-0 flex items-center'
                  }`}
                >
                  {renderChapterVisual(idx as 0 | 1 | 2, chapterProgress)}
                </div>
              ))}
            </div>
          </div>

          {/* Quiet Chapter Scroll Progress Horizon */}
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-200/10 text-xs font-mono-tabular text-[#64748B] shrink-0">
            <span>
              Active Chapter: <strong className="text-[#F1F5F9] font-normal">{CHAPTERS[activeChapter].title}</strong>
            </span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>
    );
  }

  // Graceful Unpinned Mobile / Tablet / Reduced-Motion Sequential Spread
  return (
    <section
      id="system"
      className="py-20 sm:py-28 bg-[#0B0D10] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-20">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/10">
          <span className="text-xs font-mono-tabular text-[#94A3B8]">
            How it works
          </span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => jumpToChapter(idx as 0 | 1 | 2)}
                className="px-3 py-1.5 text-xs font-medium rounded bg-[#161A21] text-[#CBD5E1] border border-slate-200/10 whitespace-nowrap shrink-0"
              >
                {ch.title}
              </button>
            ))}
          </div>
        </div>

        {CHAPTERS.map((ch, idx) => (
          <article
            key={ch.id}
            id={`chapter-mobile-${ch.id}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16 last:pb-0 border-b last:border-b-0 border-slate-200/10"
          >
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-display text-3xl sm:text-4xl leading-[1.12] text-[#F8FAFC]">
                {ch.headline}
              </h2>
              <p className="text-[15px] leading-[1.68] text-[#94A3B8]">{ch.body}</p>
              <dl className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/10">
                {ch.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[11px] text-[#64748B] mb-0.5">{m.label}</dt>
                    <dd className="font-mono-tabular text-xs sm:text-sm font-medium text-[#F1F5F9]">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-7">{renderChapterVisual(idx as 0 | 1 | 2, 1)}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

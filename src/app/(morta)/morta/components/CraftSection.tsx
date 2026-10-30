import React, { useEffect, useRef, useState } from 'react';
import {
  MORTA_ASSETS,
  computeAssemblyState,
} from '../utils/mortaLogic';
import { MortaImage } from './MortaImage';
import { PointedSealOrnament, SectionHandoffRule } from './MortaMark';
import { ReliquaryRing3D } from './ReliquaryRing3D';

interface CraftSectionProps {
  reducedMotion: boolean;
}

const STAGE_PRESETS = [
  { label: '01 · Dispersed', progress: 0 },
  { label: '02 · Converging', progress: 0.35 },
  { label: '03 · Aligning', progress: 0.65 },
  { label: '04 · Locked Ring', progress: 1 },
];

export const CraftSection: React.FC<CraftSectionProps> = ({ reducedMotion }) => {
  const assemblyTrackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(
    reducedMotion ? 1 : 0
  );
  const [manualOverride, setManualOverride] = useState<number | null>(null);
  const overrideScrollYRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      return;
    }

    let rafId = 0;
    const updateScroll = () => {
      const track = assemblyTrackRef.current;
      if (!track) return;

      // If user scrolls significantly after pressing a stage preset button, hand control back to scroll
      if (
        overrideScrollYRef.current !== null &&
        Math.abs(window.scrollY - overrideScrollYRef.current) > 36
      ) {
        overrideScrollYRef.current = null;
        setManualOverride(null);
      }

      const rect = track.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 900;
      const scrollableDistance = Math.max(1, rect.height - viewportHeight * 0.75);
      const distanceScrolled = viewportHeight * 0.35 - rect.top;
      const raw = Math.min(1, Math.max(0, distanceScrolled / scrollableDistance));
      setScrollProgress(Math.round(raw * 500) / 500);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  const handleStageButtonClick = (presetProgress: number) => {
    overrideScrollYRef.current = window.scrollY;
    setManualOverride(presetProgress);
  };

  const hasExplicitStage = manualOverride !== null;
  const effectiveProgress =
    manualOverride !== null ? manualOverride : scrollProgress;
  const assembly = computeAssemblyState(
    effectiveProgress,
    reducedMotion,
    hasExplicitStage
  );
  const { assembly3D } = assembly;
  const percentComplete = Math.round(assembly.lockProgress * 100);

  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="relative morta-slate border-b border-white/20"
    >
      <SectionHandoffRule chapterNumber="CH. IV" chapterLabel="The Craft" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 pt-16 md:pt-28 pb-16">
        {/* Part 1: Bench Photography (morta-craft.png) & Silversmithing Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch pb-20 border-b border-white/20">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">
                AT THE BENCH · LOST-WAX &amp; STEEL GRAVER
              </p>
              <h2
                id="craft-heading"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.06]"
                style={{ textWrap: 'balance' }}
              >
                Carved in wax.
                <br />
                Disciplined by steel.
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Each piece begins as a hand-carved wax model, then is cast
                in 925 silver and refined at the bench.
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Recesses are oxidized and raised edges burnished by hand.
                The silver is neither plated nor lacquered.
              </p>
            </div>

            {/* Three-step process ledger */}
            <div className="pt-8 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
              <div className="space-y-1.5">
                <p className="text-white/55 tracking-[0.18em]">PHASE I</p>
                <p className="text-white uppercase tracking-[0.14em]">
                  Hollowing the Wax
                </p>
                <p className="font-sans text-white/75 leading-relaxed">
                  Carved around a central void.
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/55 tracking-[0.18em]">PHASE II</p>
                <p className="text-white uppercase tracking-[0.14em]">
                  Sterling Pour
                </p>
                <p className="font-sans text-white/75 leading-relaxed">
                  Lost-wax cast in solid 925 silver.
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/55 tracking-[0.18em]">PHASE III</p>
                <p className="text-white uppercase tracking-[0.14em]">
                  Graver &amp; Slate
                </p>
                <p className="font-sans text-white/75 leading-relaxed">
                  Engraved and finished by hand.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="h-full flex flex-col justify-between border border-white/25 bg-black p-4 sm:p-6">
              <MortaImage
                asset={MORTA_ASSETS.craft}
                priority={false}
                className="w-full"
              />
              <figcaption className="pt-4 mt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70">
                <span>PLATE II · ENGRAVING A STERLING BAND AT THE BENCH PIN</span>
                <span>GRAVER NO. 42</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Part 2: Signature 3D Reliquary Ring Assembly Mechanic */}
        <div
          ref={assemblyTrackRef}
          data-testid="ring-assembly-stage"
          data-locked={assembly.isLocked ? 'true' : 'false'}
          data-stage={assembly.stageIndex}
          className={`relative pt-12 ${
            reducedMotion ? 'min-h-0' : 'min-h-[175vh]'
          }`}
        >
          <div className="sticky top-24 border border-white/30 bg-black p-6 sm:p-10 lg:p-12">
            {/* Top Status & Stage Controls Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/20">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-white/75">
                  <PointedSealOrnament className="w-3.5 h-5 text-white" />
                  <span>SIGNATURE ASSEMBLY · 01 RELIQUARY SIGNET IN 3D</span>
                </div>
                <p className="text-xs font-mono text-white/65 tracking-[0.14em] tabular-nums">
                  {assembly.stageCode} — {assembly.stageTitle.toUpperCase()} (
                  {percentComplete}% CONVERGED)
                </p>
              </div>

              {/* Interactive stage controls synchronized with scroll */}
              <div
                role="group"
                aria-label="Inspect ring assembly stages"
                className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0"
              >
                {STAGE_PRESETS.map((preset, idx) => {
                  const isActive = assembly.stageIndex === idx;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleStageButtonClick(preset.progress)}
                      aria-pressed={isActive}
                      className={`px-3 py-2 text-[11px] font-mono uppercase tracking-[0.12em] border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                        isActive
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-white/80 border-white/30 hover:border-white hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
                {manualOverride !== null && !reducedMotion && (
                  <button
                    type="button"
                    onClick={() => {
                      overrideScrollYRef.current = null;
                      setManualOverride(null);
                    }}
                    className="px-2.5 py-2 text-[11px] font-mono uppercase tracking-[0.12em] text-white/75 hover:text-white underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    Resume scroll
                  </button>
                )}
              </div>
            </div>

            {/* Main Assembly Grid: Left Interactive 3D Reliquary Ring / Right Editorial Copy & Clearances */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Panel: 3D Reliquary Ring Assembly (placed above copy on mobile) */}
              <div className="lg:col-span-7">
                <ReliquaryRing3D
                  assembly3D={assembly3D}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Right Panel: Editorial Statement & 3D Component Clearance Ledger */}
              <div className="lg:col-span-5 space-y-8">
                <div className="border border-white/25 p-6 space-y-4">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/65">
                    {assembly.isLocked
                      ? 'CONTOUR LOCKED · FINAL SILHOUETTE'
                      : 'SCROLL OR SELECT STAGE TO LOCK RING'}
                  </p>
                  <h3
                    className="font-display text-4xl sm:text-5xl font-normal text-white leading-[1.08]"
                    style={{ textWrap: 'balance' }}
                  >
                    “Formed slowly.
                    <br />
                    Worn for years.”
                  </h3>
                </div>

                <p className="text-base text-white/80 leading-relaxed">
                  {assembly.stageDescription}
                </p>

                {/* 3D Structural Component Clearances */}
                <div className="border-t border-white/20 pt-6 space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between text-white/80">
                    <span>01. STEPPED LANCET BEZEL</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.outerBezel.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `+${assembly3D.parts.outerBezel.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>02. OXIDIZED RELIQUARY CHAMBER</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.recessedChamber.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `+${assembly3D.parts.recessedChamber.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>03. TREFOIL SPANDREL SHOULDERS</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.leftShoulder.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `±${assembly3D.parts.leftShoulder.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>04. TAPERED STERLING SHANK</span>
                    <span className="tabular-nums">
                      {assembly3D.parts.lowerShank.clearanceMm === 0
                        ? 'SEATED (0.0 mm)'
                        : `-${assembly3D.parts.lowerShank.clearanceMm.toFixed(1)} mm`}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#commissions"
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-[0.18em] border border-white hover:bg-black hover:text-white active:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap"
                  >
                    <span>Commission a solitary piece</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

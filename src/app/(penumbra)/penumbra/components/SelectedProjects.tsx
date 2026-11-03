'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, SlidersHorizontal } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { CONCEPT_PROJECTS, ConceptProject } from '../lib/projectData';
import { HERO_BASE, HERO_REVEAL } from '../lib/motion';

interface SelectedProjectsProps {
  activeProject: ConceptProject | null;
  onSelectProject: (project: ConceptProject | null) => void;
  onNavigateToContact: (projectTitle?: string) => void;
}

const ArchitecturalDiagram: React.FC<{ type: ConceptProject['diagramType'] }> = ({ type }) => {
  if (type === 'cantilever-graze') {
    return (
      <svg
        viewBox="0 0 360 140"
        className="w-full h-32 text-[#F2EBE2]"
        role="img"
        aria-label="Section diagram showing linear knife-edge soffit cove and vertical concrete grazing"
      >
        <line x1="16" y1="118" x2="344" y2="118" stroke="rgba(242,235,226,0.18)" strokeWidth="1" />
        {/* Cantilever concrete canopy */}
        <rect
          x="44"
          y="36"
          width="210"
          height="20"
          fill="#1c2027"
          stroke="rgba(242,235,226,0.3)"
          strokeWidth="1"
        />
        {/* Core wall */}
        <rect
          x="130"
          y="56"
          width="36"
          height="62"
          fill="#1c2027"
          stroke="rgba(242,235,226,0.3)"
          strokeWidth="1"
        />
        {/* Warm linear soffit glow */}
        <line x1="48" y1="58" x2="248" y2="58" stroke="#E9BB86" strokeWidth="2" />
        {/* Grazing light cones */}
        <polygon points="126,116 112,58 130,58" fill="rgba(215,167,121,0.22)" />
        <polygon points="170,116 166,58 186,58" fill="rgba(215,167,121,0.22)" />
        <text x="50" y="26" fill="#A6A29F" fontSize="9" fontFamily="monospace">
          2650K Recessed soffit knife-edge
        </text>
        <text x="196" y="96" fill="#D7A779" fontSize="9" fontFamily="monospace">
          Asymmetric graze (14:1)
        </text>
      </svg>
    );
  }

  if (type === 'interior-reflection') {
    return (
      <svg
        viewBox="0 0 360 140"
        className="w-full h-32 text-[#F2EBE2]"
        role="img"
        aria-label="Section diagram showing ceiling framing optics on interior stone boulder behind low-iron glass"
      >
        <line x1="16" y1="118" x2="344" y2="118" stroke="rgba(242,235,226,0.18)" strokeWidth="1" />
        <line x1="40" y1="24" x2="320" y2="24" stroke="rgba(242,235,226,0.24)" strokeWidth="1" />
        {/* Glazing line */}
        <line
          x1="116"
          y1="24"
          x2="116"
          y2="118"
          stroke="#7E91A8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {/* Sculptural stone monolith */}
        <path
          d="M196 118 L206 74 L244 64 L276 82 L284 118 Z"
          fill="rgba(215,167,121,0.18)"
          stroke="#E9BB86"
          strokeWidth="1.2"
        />
        {/* Pin-spot beam from recessed ceiling slot */}
        <polygon points="222,24 192,118 286,118" fill="rgba(215,167,121,0.14)" />
        <circle cx="222" cy="24" r="2.5" fill="#E9BB86" />
        <text x="42" y="72" fill="#7E91A8" fontSize="9" fontFamily="monospace">
          Low-iron glass
        </text>
        <text x="190" y="44" fill="#D7A779" fontSize="9" fontFamily="monospace">
          2400K Framing optic
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 140"
      className="w-full h-32 text-[#F2EBE2]"
      role="img"
      aria-label="Section diagram showing shielded low-level bollard casting downward light across water edge"
    >
      {/* Deck and reflecting basin */}
      <line x1="16" y1="92" x2="195" y2="92" stroke="rgba(242,235,226,0.3)" strokeWidth="1.5" />
      <line x1="195" y1="92" x2="195" y2="116" stroke="rgba(242,235,226,0.3)" strokeWidth="1.5" />
      <line x1="195" y1="106" x2="344" y2="106" stroke="#7E91A8" strokeWidth="1.5" />
      {/* Shielded bollard */}
      <rect x="154" y="64" width="8" height="28" fill="#D7A779" />
      {/* Zero-uplight cutoff line */}
      <line
        x1="80"
        y1="64"
        x2="270"
        y2="64"
        stroke="rgba(242,235,226,0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {/* Downward fan */}
      <polygon points="158,68 95,92 225,106" fill="rgba(215,167,121,0.2)" />
      <text x="82" y="54" fill="#A6A29F" fontSize="9" fontFamily="monospace">
        0% Uplight cutoff
      </text>
      <text x="208" y="88" fill="#D7A779" fontSize="9" fontFamily="monospace">
        2200K Specular water reflection
      </text>
    </svg>
  );
};

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({
  activeProject,
  onSelectProject,
  onNavigateToContact,
}) => {
  // Per-card illumination study state
  const [studyMix, setStudyMix] = useState<Record<string, boolean>>({
    'solace-pavilion': true,
    'nocturne-house': true,
    'meridian-walk': true,
  });

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSelectProject(null);
        lastTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [activeProject, onSelectProject]);

  const toggleCardLighting = (id: string) => {
    setStudyMix((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 md:py-32 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="projects-heading">
          <SectionHeading
            label="01 / Selected projects"
            headline="Light changes everything"
            intro="Three studies in how illumination changes the way we experience architecture."
          />
        </div>

        {/* Conceptual Study Notice */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A6A29F]">
          <p>
            Each study isolates a distinct architectural zone from our primary brutalist pavilion plate to examine grazing, interior transparency, and threshold orientation.
          </p>
          <span className="font-mono-tech uppercase tracking-wider text-[#D7A779]">
            Conceptual architectural studies · 2026
          </span>
        </div>

        {/* Editorial Staggered Project Studies */}
        <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
          {CONCEPT_PROJECTS.map((project, idx) => {
            const isLit = studyMix[project.id] ?? true;
            const isEven = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-8 border-t border-[#F2EBE2]/10 first:border-t-0 first:pt-0"
              >
                {/* Photographic Crop Stage */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  } relative group overflow-hidden bg-[#1c2027] border border-[#F2EBE2]/10 min-h-[340px] sm:min-h-[420px] flex flex-col justify-between`}
                >
                  {/* Cropped architectural study */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={HERO_BASE}
                      alt={`${project.title} — unlit blue hour study crop`}
                      loading="lazy"
                      style={{
                        objectPosition: project.focalCropPosition,
                        transform: `scale(${project.focalScale})`,
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.22]"
                    />
                    <img
                      src={HERO_REVEAL}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      style={{
                        objectPosition: project.focalCropPosition,
                        transform: `scale(${project.focalScale})`,
                        opacity: isLit ? 1 : 0.08,
                      }}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.22]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#111318]/80 via-transparent to-[#111318]/30"
                    />
                  </div>

                  {/* Top Crop Metadata Bar */}
                  <div className="relative z-10 p-5 flex items-center justify-between gap-4">
                    <span className="font-mono-tech text-xs tracking-wider uppercase text-[#F2EBE2]">
                      {project.studyLabel}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleCardLighting(project.id)}
                      aria-pressed={isLit}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech tracking-wider uppercase bg-[#111318]/85 text-[#F2EBE2] border border-[#F2EBE2]/18 hover:border-[#D7A779] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                      <span>{isLit ? 'State: Illuminated' : 'State: Blue hour'}</span>
                    </button>
                  </div>

                  {/* Bottom Optical Readout */}
                  <div className="relative z-10 p-4 px-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F2EBE2]/10 bg-[#111318]/70 backdrop-blur-xs">
                    <span className="font-mono-tech text-xs text-[#E9BB86] tabular-nums">
                      {project.kelvinProfile}
                    </span>
                    <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                      {project.contrastRatio}
                    </span>
                  </div>
                </div>

                {/* Editorial Specification Column */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  } flex flex-col justify-between py-2`}
                >
                  <div>
                    {/* Unboxed clean metadata */}
                    <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#A6A29F]">
                      <span className="font-mono-tech text-[#D7A779] tabular-nums">{project.index}</span>
                      <span aria-hidden="true">—</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-[#F2EBE2] tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mt-4 text-base sm:text-lg text-[#F2EBE2] font-light leading-relaxed">
                      {project.microcopy}
                    </p>

                    <p className="mt-3 text-sm text-[#A6A29F] leading-relaxed">
                      {project.conceptSummary}
                    </p>

                    {/* Mood & Photometric Section Diagram */}
                    <div className="mt-6 pt-5 border-t border-[#F2EBE2]/10">
                      <p className="font-mono-tech text-xs uppercase tracking-wider text-[#A6A29F] mb-2">
                        Atmosphere: <span className="text-[#F2EBE2]">{project.mood}</span>
                      </p>
                      <div className="mt-3 p-4 bg-[#1c2027] border border-[#F2EBE2]/10">
                        <ArchitecturalDiagram type={project.diagramType} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#F2EBE2]/10 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        lastTriggerRef.current = e.currentTarget;
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase bg-[#1c2027] text-[#F2EBE2] border border-[#F2EBE2]/20 hover:border-[#D7A779] hover:text-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-2"
                    >
                      <span>Inspect study</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                    </button>

                    <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                      {project.index} / 03
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Accessible Project Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#111318]/90 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onSelectProject(null);
              lastTriggerRef.current?.focus();
            }
          }}
        >
          <div className="relative w-full max-w-4xl bg-[#1c2027] border border-[#F2EBE2]/18 text-[#F2EBE2] my-auto overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-4 border-b border-[#F2EBE2]/10 bg-[#111318]">
              <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-wider text-[#D7A779]">
                <span className="tabular-nums">{activeProject.index}</span>
                <span aria-hidden="true">·</span>
                <span>{activeProject.studyLabel}</span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  onSelectProject(null);
                  lastTriggerRef.current?.focus();
                }}
                aria-label={`Close ${activeProject.title} details`}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider text-[#F2EBE2] border border-[#F2EBE2]/18 hover:border-[#D7A779] transition-colors focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
              >
                <span>Close</span>
                <X className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            {/* Comparison Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#F2EBE2]/10">
              <div className="relative h-52 sm:h-64 overflow-hidden border-b sm:border-b-0 sm:border-r border-[#F2EBE2]/10">
                <img
                  src={HERO_BASE}
                  alt={`${activeProject.title} unlit ambient state`}
                  style={{
                    objectPosition: activeProject.focalCropPosition,
                    transform: `scale(${activeProject.focalScale})`,
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#111318]/85 text-xs font-mono-tech uppercase tracking-wider text-[#A6A29F]">
                  Before · Ambient blue hour
                </span>
              </div>

              <div className="relative h-52 sm:h-64 overflow-hidden">
                <img
                  src={HERO_REVEAL}
                  alt={`${activeProject.title} illuminated state`}
                  style={{
                    objectPosition: activeProject.focalCropPosition,
                    transform: `scale(${activeProject.focalScale})`,
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#111318]/85 text-xs font-mono-tech uppercase tracking-wider text-[#E9BB86] tabular-nums">
                  After · {activeProject.kelvinProfile}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#111318]">
              <div className="md:col-span-7 space-y-4">
                <p className="text-xs uppercase tracking-wider text-[#A6A29F]">
                  {activeProject.category}
                </p>
                <h3
                  id="project-dialog-title"
                  className="font-display text-3xl sm:text-4xl text-[#F2EBE2]"
                >
                  {activeProject.title}
                </h3>
                <p className="text-base text-[#E9BB86] italic font-display">
                  “{activeProject.microcopy}”
                </p>
                <p className="text-sm text-[#F2EBE2] leading-relaxed">
                  {activeProject.conceptSummary}
                </p>
                <div className="pt-3 border-t border-[#F2EBE2]/10">
                  <h4 className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779]">
                    Architectural strategy
                  </h4>
                  <p className="mt-2 text-sm text-[#A6A29F] leading-relaxed">
                    {activeProject.lightingStrategy}
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between space-y-6 border-t md:border-t-0 md:border-l border-[#F2EBE2]/10 pt-6 md:pt-0 md:pl-6">
                <div>
                  <h4 className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779]">
                    Scope & deliverables
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-[#F2EBE2]">
                    {activeProject.services.map((service) => (
                      <li key={service} className="flex items-start gap-2.5">
                        <span className="text-[#D7A779] font-mono-tech">—</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-[#F2EBE2]/10">
                    <ArchitecturalDiagram type={activeProject.diagramType} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F2EBE2]/10">
                  <button
                    type="button"
                    onClick={() => {
                      const title = activeProject.title;
                      onSelectProject(null);
                      onNavigateToContact(title);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs tracking-wider uppercase bg-[#D7A779] text-[#111318] font-medium hover:bg-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F2EBE2]"
                  >
                    <span>Discuss this typology</span>
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

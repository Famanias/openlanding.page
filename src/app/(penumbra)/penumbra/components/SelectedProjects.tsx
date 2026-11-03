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
        viewBox="0 0 360 130"
        className="w-full h-28 text-[#F2EBE2]"
        role="img"
        aria-label="Section diagram showing linear knife-edge soffit cove and vertical concrete grazing"
      >
        <line x1="16" y1="112" x2="344" y2="112" stroke="rgba(242,235,226,0.18)" strokeWidth="1" />
        <rect
          x="44"
          y="32"
          width="210"
          height="18"
          fill="#1c2027"
          stroke="rgba(242,235,226,0.3)"
          strokeWidth="1"
        />
        <rect
          x="130"
          y="50"
          width="36"
          height="62"
          fill="#1c2027"
          stroke="rgba(242,235,226,0.3)"
          strokeWidth="1"
        />
        <line x1="48" y1="50" x2="248" y2="50" stroke="#E9BB86" strokeWidth="2" />
        <polygon points="126,110 112,50 130,50" fill="rgba(215,167,121,0.22)" />
        <polygon points="170,110 166,50 186,50" fill="rgba(215,167,121,0.22)" />
        <text x="50" y="24" fill="#A6A29F" fontSize="9" fontFamily="monospace">
          2650K Soffit knife-edge
        </text>
        <text x="196" y="90" fill="#D7A779" fontSize="9" fontFamily="monospace">
          14:1 Asymmetric graze
        </text>
      </svg>
    );
  }

  if (type === 'interior-reflection') {
    return (
      <svg
        viewBox="0 0 360 130"
        className="w-full h-28 text-[#F2EBE2]"
        role="img"
        aria-label="Section diagram showing ceiling framing optics on interior stone boulder behind low-iron glass"
      >
        <line x1="16" y1="112" x2="344" y2="112" stroke="rgba(242,235,226,0.18)" strokeWidth="1" />
        <line x1="40" y1="20" x2="320" y2="20" stroke="rgba(242,235,226,0.24)" strokeWidth="1" />
        <line
          x1="116"
          y1="20"
          x2="116"
          y2="112"
          stroke="#7E91A8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M196 112 L206 68 L244 58 L276 76 L284 112 Z"
          fill="rgba(215,167,121,0.18)"
          stroke="#E9BB86"
          strokeWidth="1.2"
        />
        <polygon points="222,20 192,112 286,112" fill="rgba(215,167,121,0.14)" />
        <circle cx="222" cy="20" r="2.5" fill="#E9BB86" />
        <text x="42" y="66" fill="#7E91A8" fontSize="9" fontFamily="monospace">
          Low-iron glass
        </text>
        <text x="190" y="38" fill="#D7A779" fontSize="9" fontFamily="monospace">
          2400K Framing optic
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 130"
      className="w-full h-28 text-[#F2EBE2]"
      role="img"
      aria-label="Section diagram showing shielded low-level bollard casting downward light across water edge"
    >
      <line x1="16" y1="88" x2="195" y2="88" stroke="rgba(242,235,226,0.3)" strokeWidth="1.5" />
      <line x1="195" y1="88" x2="195" y2="112" stroke="rgba(242,235,226,0.3)" strokeWidth="1.5" />
      <line x1="195" y1="102" x2="344" y2="102" stroke="#7E91A8" strokeWidth="1.5" />
      <rect x="154" y="60" width="8" height="28" fill="#D7A779" />
      <line
        x1="80"
        y1="60"
        x2="270"
        y2="60"
        stroke="rgba(242,235,226,0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <polygon points="158,64 95,88 225,102" fill="rgba(215,167,121,0.2)" />
      <text x="82" y="50" fill="#A6A29F" fontSize="9" fontFamily="monospace">
        0% Uplight cutoff
      </text>
      <text x="208" y="82" fill="#D7A779" fontSize="9" fontFamily="monospace">
        2200K Water reflection
      </text>
    </svg>
  );
};

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({
  activeProject,
  onSelectProject,
  onNavigateToContact,
}) => {
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
      className="relative py-20 md:py-28 bg-[#111318] border-t border-[#F2EBE2]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div id="projects-heading">
          <SectionHeading
            label="01 / Projects"
            headline="Light changes everything"
            intro="Three studies in how illumination shapes the experience of architecture."
          />
        </div>

        {/* Staggered Project Studies */}
        <div className="mt-12 md:mt-16 space-y-16 md:space-y-20">
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
                  } relative group overflow-hidden bg-[#1c2027] border border-[#F2EBE2]/10 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={HERO_BASE}
                      alt={`${project.title} study crop`}
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

                  {/* Top Bar */}
                  <div className="relative z-10 p-4 px-5 flex items-center justify-between gap-4">
                    <span className="font-mono-tech text-xs tracking-wider uppercase text-[#F2EBE2]">
                      {project.studyLabel}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleCardLighting(project.id)}
                      aria-pressed={isLit}
                      className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono-tech tracking-wider uppercase bg-[#111318]/85 text-[#F2EBE2] border border-[#F2EBE2]/18 hover:border-[#D7A779] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
                      <span>{isLit ? 'Lit' : 'Unlit'}</span>
                    </button>
                  </div>

                  {/* Bottom Readout */}
                  <div className="relative z-10 p-3 px-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F2EBE2]/10 bg-[#111318]/70 backdrop-blur-xs">
                    <span className="font-mono-tech text-xs text-[#E9BB86] tabular-nums">
                      {project.kelvinProfile}
                    </span>
                    <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">
                      {project.contrastRatio}
                    </span>
                  </div>
                </div>

                {/* Specification Column */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  } flex flex-col justify-between py-2`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-xs tracking-wider uppercase text-[#A6A29F]">
                      <span className="font-mono-tech text-[#D7A779] tabular-nums">{project.index}</span>
                      <span aria-hidden="true">—</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="mt-3 font-display text-3xl sm:text-4xl text-[#F2EBE2] tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-[#A6A29F] leading-relaxed">
                      {project.conceptSummary}
                    </p>

                    {/* Section Diagram */}
                    <div className="mt-5 p-3 bg-[#1c2027] border border-[#F2EBE2]/10">
                      <ArchitecturalDiagram type={project.diagramType} />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F2EBE2]/10 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        lastTriggerRef.current = e.currentTarget;
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase bg-[#1c2027] text-[#F2EBE2] border border-[#F2EBE2]/20 hover:border-[#D7A779] hover:text-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
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

      {/* Modal */}
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
          <div className="relative w-full max-w-3xl bg-[#1c2027] border border-[#F2EBE2]/18 text-[#F2EBE2] my-auto overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#F2EBE2]/10 bg-[#111318]">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#F2EBE2]/10">
              <div className="relative h-48 sm:h-56 overflow-hidden border-b sm:border-b-0 sm:border-r border-[#F2EBE2]/10">
                <img
                  src={HERO_BASE}
                  alt={`${activeProject.title} unlit`}
                  style={{
                    objectPosition: activeProject.focalCropPosition,
                    transform: `scale(${activeProject.focalScale})`,
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#111318]/85 text-xs font-mono-tech uppercase tracking-wider text-[#A6A29F]">
                  Blue hour
                </span>
              </div>

              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={HERO_REVEAL}
                  alt={`${activeProject.title} lit`}
                  style={{
                    objectPosition: activeProject.focalCropPosition,
                    transform: `scale(${activeProject.focalScale})`,
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#111318]/85 text-xs font-mono-tech uppercase tracking-wider text-[#E9BB86] tabular-nums">
                  {activeProject.kelvinProfile}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-5 bg-[#111318]">
              <div>
                <h3 id="project-dialog-title" className="font-display text-3xl text-[#F2EBE2]">
                  {activeProject.title}
                </h3>
                <p className="mt-2 text-sm text-[#A6A29F] leading-relaxed">
                  {activeProject.lightingStrategy}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EBE2]/10">
                <h4 className="font-mono-tech text-xs uppercase tracking-wider text-[#D7A779] mb-2.5">
                  Deliverables
                </h4>
                <ul className="space-y-1.5 text-xs text-[#F2EBE2]">
                  {activeProject.services.map((service) => (
                    <li key={service} className="flex items-center gap-2">
                      <span className="text-[#D7A779] font-mono-tech">—</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F2EBE2]/10 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const title = activeProject.title;
                    onSelectProject(null);
                    onNavigateToContact(title);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider uppercase bg-[#D7A779] text-[#111318] font-medium hover:bg-[#E9BB86] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#F2EBE2]"
                >
                  <span>Discuss this typology</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

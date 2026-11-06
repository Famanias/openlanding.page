'use client';

import React, { useEffect, useRef } from 'react';
import { ProjectItem, projectsData } from '../data/projects';

interface ProjectDetailDialogProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onStartProject: () => void;
}

export const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
  project,
  onClose,
  onSelectProject,
  onStartProject,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const siblingProject =
    projectsData.find((p) => p.id !== project.id) || projectsData[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[1060px] bg-[#14141C] border border-[#F2F0EB]/25 p-6 sm:p-10 md:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.9)] my-auto max-h-[92vh] overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2F0EB]/18 pb-5 mb-7">
          <div className="flex items-center gap-3 text-[11px] sm:text-[12px] font-grotesk tracking-[0.14em] uppercase text-[#A58AFF]">
            <span>STUDIO ARCHIVE / {project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#96939F]">{project.archiveStamp}</span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close project case study"
            className="zeno-focus px-4 py-1.5 text-xs font-grotesk tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF] hover:text-[#A58AFF] transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Title & Disciplines */}
        <div className="mb-7">
          <h2
            id="project-dialog-title"
            className="font-editorial text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] leading-[1.0] uppercase text-[#F2F0EB] mb-2"
          >
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-grotesk tracking-[0.1em] uppercase text-[#D8CFF2]">
            {project.disciplines}
          </p>
        </div>

        {/* Artwork Showcase */}
        <div className="w-full overflow-hidden border border-[#F2F0EB]/15 bg-[#111117] mb-8 max-h-[460px] flex items-center justify-center">
          <img
            src={project.artwork}
            alt={project.artworkAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full max-h-[460px] object-contain"
          />
        </div>

        {/* Case Study Sections: The Brief, Creative Direction, Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-9">
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-grotesk font-semibold tracking-[0.16em] uppercase text-[#A58AFF]">
              THE BRIEF
            </h3>
            <p className="text-sm sm:text-[15px] font-grotesk text-[#F2F0EB]/90 leading-relaxed">
              {project.caseStudy.theBrief}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-grotesk font-semibold tracking-[0.16em] uppercase text-[#A58AFF]">
              CREATIVE DIRECTION
            </h3>
            <p className="text-sm sm:text-[15px] font-grotesk text-[#F2F0EB]/90 leading-relaxed">
              {project.caseStudy.creativeDirection}
            </p>
            <p className="text-xs font-grotesk text-[#96939F] pt-1">
              {project.caseStudy.editorialNotes}
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-grotesk font-semibold tracking-[0.16em] uppercase text-[#A58AFF]">
              DELIVERABLES
            </h3>
            <ul className="space-y-2 text-sm font-grotesk text-[#D8CFF2]">
              {project.caseStudy.deliverables.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 border-b border-[#F2F0EB]/10 pb-1.5"
                >
                  <span className="text-[11px] text-[#A58AFF] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal World Palette Swatches & Concept Disclosure */}
        <div className="border-t border-[#F2F0EB]/16 pt-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-grotesk tracking-[0.14em] uppercase text-[#96939F] block mb-2">
              INTERNAL COLOR WORLD — {project.palette.name}
            </span>
            <div className="flex flex-wrap items-center gap-4">
              {project.palette.swatches.map((sw) => (
                <div key={sw.label} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="w-4 h-4 rounded-full border border-[#F2F0EB]/30 inline-block"
                    style={{ backgroundColor: sw.hex }}
                  />
                  <span className="text-xs font-grotesk text-[#D8CFF2]">
                    {sw.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs font-grotesk text-[#96939F] italic">
            {project.caseStudy.conceptNotice}
          </p>
        </div>

        {/* Bottom Navigation & CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F2F0EB]/18">
          <button
            type="button"
            onClick={() => onSelectProject(siblingProject)}
            className="zeno-focus text-xs sm:text-sm font-grotesk font-medium tracking-[0.1em] uppercase text-[#B5A3FF] hover:text-[#F2F0EB] transition-colors cursor-pointer"
          >
            NEXT CASE STUDY: {siblingProject.title} →
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="zeno-focus px-6 py-3 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:bg-[#A58AFF] transition-colors cursor-pointer"
          >
            START A CONVERSATION ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailDialog;

import { ArrowDown, ArrowRight } from "lucide-react";

export const PROJECTS = [
  { name: "MONOCHROME", category: "GENERATIVE ART / 2026", description: "An exploration of terrain, texture and light. A procedural landscape built from a single noise field, rendered in the browser.", stack: "THREE.JS / GLSL / TYPESCRIPT" },
  { name: "SHIFT SYSTEM", category: "INTERACTION DESIGN / 2026", description: "A study of movement as a design language. Parametric ribbons shift between structured grids and free-flowing forms.", stack: "REACT / WEBGL / CREATIVE CODING" },
  { name: "FORM STUDY", category: "DIGITAL EXPERIMENT / 2025", description: "Soft geometry, written in code. An ongoing material study of folds, surfaces and the space between physical and digital.", stack: "THREE.JS / PROCEDURAL GEOMETRY / GLSL" },
] as const;

export function ProjectPreview({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 160 80" fill="none" aria-hidden="true" className="jm-project-preview">
      {Array.from({ length: 26 }, (_, line) => {
        const path = Array.from({ length: 37 }, (_, sample) => {
          const u = sample / 36;
          const v = line / 25;
          let x = u * 180 - 10;
          let y = v * 94 - 7;
          if (variant === 0) y += Math.sin(u * 9 + v * 5) * Math.cos(u * 7 - v * 3) * 15;
          if (variant === 1) { x = 80 + Math.cos(v * 3.5 + u * 4) * (22 + u * 40); y = u * 110 - 15 + Math.sin(v * 3.5) * 8; }
          if (variant === 2) { x = 80 + (u - 0.5) * (72 + Math.sin(v * 6) * 30); y = v * 100 - 10 + Math.sin(u * 5 + v * 5) * 17; }
          return `${sample ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
        }).join("");
        return <path d={path} key={line} stroke="currentColor" strokeWidth="0.55" opacity={0.2 + Math.sin(line / 26 * Math.PI) * 0.55} />;
      })}
    </svg>
  );
}

export default function ProjectTicker({ onSelect, onExplore }: { onSelect?: (index: number) => void; onExplore?: () => void }) {
  return (
    <footer className="jm-projects" id="projects" aria-label="Selected projects">
      <div className="jm-project-list">
        {PROJECTS.map((project, index) => (
          <button type="button" className="jm-project" key={project.name} onClick={() => onSelect?.(index)}>
            <span className="jm-project-copy"><span className="jm-project-number">0{index + 1} /</span><span className="jm-project-name">{project.name} <ArrowRight size={19} aria-hidden="true" /></span></span>
            <span className="jm-project-thumb"><ProjectPreview variant={index} /></span>
          </button>
        ))}
      </div>
      <button type="button" className="jm-scroll-cue jm-mono" onClick={onExplore}>SCROLL TO EXPLORE <ArrowDown size={16} aria-hidden="true" /></button>
    </footer>
  );
}

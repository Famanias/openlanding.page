"use client";

import type { CSSProperties } from "react";
import { Picture } from "../assets";
import { useRole } from "../bay/RoleProvider";
import { rankForRole } from "../bay/route";
import { PROJECTS } from "../content/projects";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

const MAX_WEIGHT = 10;

export function Work() {
  const { role, data } = useRole();
  const projects = rankForRole(PROJECTS, role);

  return (
    <section id="work" className="pby-section pby-shell" aria-labelledby="pby-work-title">
      <Reveal as="header" className="pby-section-head">
        <p className="pby-eyebrow pby-mono">01 / Selected work</p>
        <h2 id="pby-work-title" className="pby-h2">
          {projects.length} projects, routed for <span className="pby-amber">{data.label}</span>
        </h2>
        <p className="pby-lede">Same body of work, re-ranked. Each bar shows how closely a project fits the discipline you plugged into.</p>
      </Reveal>
      <div key={role} className="pby-cards">
        {projects.map((project, index) => (
          <Reveal key={project.id} variant="scale" index={index} className="pby-card-slot">
            <TiltCard className="pby-card">
              <Picture assetKey={`project-${project.id}`} alt={`${project.title}: ${project.kind}`} className="pby-card-media" sizes="(min-width: 900px) 33vw, 100vw" />
              <div className="pby-card-body">
                <p className="pby-card-meta pby-mono">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.year}</span>
                </p>
                <h3 className="pby-h3">{project.title}</h3>
                <p className="pby-card-kind">{project.kind}</p>
                <p className="pby-card-blurb">{project.blurb}</p>
                <ul className="pby-tags" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag} className="pby-tag pby-mono">
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="pby-card-proof">{project.proof}</p>
                <div className="pby-fit" role="img" aria-label={`Fit for ${data.label}: ${project.weights[role]} out of ${MAX_WEIGHT}`}>
                  <span className="pby-fit-bar" style={{ "--fit": project.weights[role] / MAX_WEIGHT } as CSSProperties} />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

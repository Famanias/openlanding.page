"use client";

import type { PointerEvent } from "react";
import { Picture } from "../assets";
import { Reveal } from "../motion/Reveals";

const projects = [
  { id: "PROJECT 0427", title: "A clean read at the switchyard.", body: "Testing and commissioning with a handoff that stayed on schedule.", asset: "project-switchyard", wide: true },
  { id: "PROJECT 0318", title: "Controls that stay legible.", body: "A calm control-room retrofit with the right signals in the right places.", asset: "project-control-room", wide: false },
  { id: "PROJECT 0196", title: "The detail is the proof.", body: "Panel finish, cable discipline, and a closeout the next crew can trust.", asset: "project-panel-detail", wide: false },
];

export function Projects() {
  const move = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--tc-mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--tc-my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section id="projects" className="tc-section tc-projects tc-field-section" data-field-section="projects" aria-labelledby="projects-title">
      <div className="tc-container">
        <Reveal className="tc-section-head" kind="rule">
          <div>
            <span className="tc-eyebrow">Project proof / selected frames</span>
            <h2 id="projects-title">Show the handoff.</h2>
          </div>
          <p>Project cards carry the evidence that helps the right visitor recognize the work, the environment, and the standard.</p>
        </Reveal>
        <div className="tc-project-grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} className={`tc-project-card${project.wide ? " tc-project-card--wide" : ""}`} kind="wipe" delay={index * 90}>
              <article onPointerMove={move}>
                <div className="tc-project-media"><Picture assetKey={project.asset} alt={project.title} sizes={project.wide ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 25vw, 100vw"} /></div>
                <div className="tc-project-content">
                  <span className="tc-project-id">{project.id}</span>
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                  <span className="tc-project-arrow">Read the field note ↗</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

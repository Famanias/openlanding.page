"use client";
import { useState } from "react";
import { Arrow } from "../brand/Arrow";
import { Reveal } from "../motion/Reveal";
import {
  CATEGORIES,
  filterProjects,
  type Category,
  type Project,
} from "../projects/model";
import { ProjectArt } from "../projects/ProjectArt";
import { ProjectDialog } from "../projects/ProjectDialog";
export function Paths() {
  const [category, setCategory] = useState<Category>("All");
  const [project, setProject] = useState<Project | null>(null);
  const projects = filterProjects(category);
  return (
    <section
      className="fd-paths fd-wrap"
      id="paths"
      aria-labelledby="fd-path-title"
    >
      <div className="fd-section-heading">
        <Reveal variant="mask">
          <p className="fd-eyebrow">01 / A PLACE TO START</p>
          <h2 id="fd-path-title">
            A little curious?
            <br />
            <span className="fd-soft">You’re in the right place.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p>
            You bring the “what if.”
            <br />
            We’ll help you find the “what’s next.”
            <br />
            Explore a path. Try it on for size.
          </p>
        </Reveal>
      </div>
      <div
        className="fd-filters"
        role="group"
        aria-label="Filter learning paths"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
            {c === "All" && <span>06</span>}
          </button>
        ))}
      </div>
      <p className="fd-sr" role="status">
        {projects.length} learning paths shown
      </p>
      <div className="fd-project-grid" key={category}>
        {projects.map((p, index) => (
          <Reveal key={p.id} variant="card" index={index % 3}>
            <a
              className={`fd-project-card fd-tone-${p.color}`}
              href={`?path=${p.id}#begin`}
              onClick={(e) => {
                e.preventDefault();
                setProject(p);
              }}
            >
              <div className="fd-project-card-top">
                <span className="fd-label">{p.category}</span>
                <span className="fd-card-round">
                  <Arrow diagonal />
                </span>
              </div>
              <ProjectArt kind={p.art} />
              <div className="fd-project-info">
                <span className="fd-label">
                  {p.code} &nbsp; · &nbsp; {p.duration}
                </span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="fd-project-link">
                  Step inside <Arrow />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <p className="fd-paths-foot">
        No experience needed. Just a little possibility.
      </p>
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </section>
  );
}

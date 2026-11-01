"use client";
import { useState } from "react";
import { Picture } from "../assets";
import { categories, filterProjects, projects, type Category } from "./projects";

export function Gallery() {
  const [category, setCategory] = useState<Category>("all");
  const visible = filterProjects(category);
  return <section className="lx-work" id="work"><div className="lx-shell"><div className="lx-section-label lx-mono" data-reveal="rise"><span>THE WORK &nbsp; / &nbsp; 01</span><span>AN INDEX OF DISTINCT IDEAS</span></div><div className="lx-work-heading" data-reveal="wipe"><h2>Different briefs.<br/><em>Distinct worlds.</em></h2><p>One creative process, many ways to make an impression. A selection of landing pages made with Landing X.</p></div>
    <div className="lx-index-bar"><div className="lx-filters" role="group" aria-label="Filter landing pages">{categories.map((item) => <button type="button" key={item.id} data-category={item.id} aria-pressed={category === item.id} aria-controls="lx-project-grid" onClick={() => setCategory(item.id)}>{item.label}</button>)}</div><p className="lx-index-count lx-mono" aria-live="polite">SHOWING {String(visible.length).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</p></div>
    <div className="lx-project-grid" id="lx-project-grid" key={category}>{visible.map((project, index) => <article className="lx-project" data-category={project.kind} key={project.asset} style={{ "--i": index } as React.CSSProperties}><a href={project.href} aria-label={`Explore the ${project.name} landing page`}><div className="lx-project-media"><Picture assetKey={project.asset} name={project.name} monogram={project.monogram}/><span className="lx-project-visit" aria-hidden="true">VIEW PROJECT ↗</span></div><div className="lx-project-meta lx-mono"><span>{String(projects.indexOf(project)+1).padStart(2,"0")} / {project.industry}</span><span>LANDING PAGE &nbsp; ↗</span></div><div className="lx-project-title"><h3>{project.name}</h3><p>{project.line}</p></div></a></article>)}</div>
    <div className="lx-work-end lx-mono"><span>THE RIGHT PAGE IS NEVER ONE SIZE FITS ALL.</span><span>END OF INDEX &nbsp; / &nbsp; 06</span></div></div></section>;
}

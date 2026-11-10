"use client";

import { useState } from "react";
import { Picture } from "../assets";
import { PROJECTS, type Category } from "../content/projects";
import { OpenProject } from "../sheet/OpenProject";

const CATEGORIES: Category[] = ["Nonfiction", "Fiction", "Commercial"];

export function WorkSwitcher() {
  const [category, setCategory] = useState<Category>("Nonfiction");
  const visible = PROJECTS.map((project, index) => ({ project, index })).filter(({ project }) => project.category === category);
  return <section className="fo-work fo-section" id="work">
    <div className="fo-section-top fo-mono"><span>02 / THE WORK</span><span>FOUR FICTIONAL STUDIES</span></div>
    <div className="fo-work__heading" data-reveal="mask"><p className="fo-kicker">A SMALL SELECTION</p><h2>Stories, in<br /><em>their own light.</em></h2><p>Some are observed. Some are imagined. Each starts with a feeling worth staying with.</p></div>
    <div className="fo-work__tabs" aria-label="Filter work by category">{CATEGORIES.map((item, index) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}><span className="fo-mono" aria-hidden="true">0{index + 1}</span> {item}</button>)}</div>
    <div className="fo-work__list" key={category}>
      {visible.map(({ project, index }) => <article className="fo-work__item" key={project.id}>
        <div className="fo-work__image"><Picture assetKey={project.stills[0]} alt={`${project.title}, fictional still`} /><Picture assetKey={project.stills[1]} alt="" className="fo-work__alternate" /><span className="fo-work__image-caption">{project.caption}</span></div>
        <div className="fo-work__detail"><p className="fo-kicker">{project.category} / {project.year} / {project.length}</p><h3>{project.title}</h3><p>{project.synopsis}</p><OpenProject index={index} className="fo-work__open">VIEW PROJECT <span aria-hidden="true">↗</span></OpenProject><small className="fo-mono">FICTIONAL PROJECT / {String(index + 1).padStart(2, "0")}</small></div>
      </article>)}
    </div>
    <noscript><div className="fo-noscript-work"><h3>All fictional projects</h3>{PROJECTS.map((project) => <p key={project.id}><strong>{project.title}</strong> — {project.category}. {project.synopsis}</p>)}</div></noscript>
  </section>;
}

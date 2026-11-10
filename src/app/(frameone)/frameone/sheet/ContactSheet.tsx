"use client";

import { Picture } from "../assets";
import { PROJECTS } from "../content/projects";
import { useFilm } from "./FilmProvider";

export function ContactSheet() {
  const { openProject } = useFilm();
  return <section className="fo-sheet" id="sheet" aria-labelledby="fo-title">
    <div className="fo-sheet__meta fo-mono"><span>DIRECTOR / PHOTOGRAPHER</span><span>AN INDEPENDENT PRACTICE &nbsp; / &nbsp; EST. IN IMAGINATION</span><span>CONTACT SHEET 001</span></div>
    <div className="fo-sheet__grid">
      <div className="fo-headline-frame">
        <p className="fo-kicker">FRAME / ONE <span>·</span> AN INDEPENDENT PRACTICE</p>
        <h1 id="fo-title">Every frame<br />has a story<span>.</span></h1>
        <div className="fo-headline-frame__bottom"><p>Moving images and stills,<br />made to stay with you.</p><div><a className="fo-text-link fo-magnetic" data-pointer href="#selected">View the films <span aria-hidden="true">↗</span></a><a className="fo-text-link" href="#inquiry">Start a project <span aria-hidden="true">↗</span></a></div></div>
      </div>
      {Array.from({ length: 16 }, (_, frame) => {
        const projectIndex = frame % PROJECTS.length;
        const project = PROJECTS[projectIndex];
        const still = Math.floor(frame / PROJECTS.length) % 2;
        return <div className="fo-cell" data-pointer key={frame} style={{ "--fo-order": (frame * 7) % 16 } as React.CSSProperties}>
          <Picture assetKey={project.stills[still]} alt="" />
          <Picture assetKey={project.stills[1 - still]} alt="" className="fo-cell__alternate" />
          <span className="fo-cell__scan" aria-hidden="true" />
          <span className="fo-cell__number fo-mono" aria-hidden="true">{String(frame + 1).padStart(2, "0")}A</span>
          {frame === 5 && <span className="fo-cell__subtitle" aria-hidden="true">{project.caption}</span>}
          <span className="fo-cell__cue fo-mono" aria-hidden="true">VIEW FRAME ↗</span>
          <a className="fo-cell__link" data-frame href="#work" aria-label={`View frame ${String(frame + 1).padStart(2, "0")}A: ${project.title}`}
            onClick={(event) => { event.preventDefault(); openProject(projectIndex, event.currentTarget, still); }} />
        </div>;
      })}
    </div>
    <div className="fo-sheet__caption fo-mono"><span>SELECT AN EXPOSURE TO BEGIN</span><span>ALL PROJECTS ARE FICTIONAL</span><span>001—016</span></div>
  </section>;
}

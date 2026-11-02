"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import MercerHeader from "./components/MercerHeader";
import MercerHeroCopy from "./components/MercerHeroCopy";
import MercerTorusKnotCanvas from "./components/MercerTorusKnotCanvas";
import ProjectTicker, { PROJECTS, ProjectPreview } from "./components/ProjectTicker";

type Detail = "projects" | "about" | number | null;

export default function MercerApp() {
  const [detail, setDetail] = useState<Detail>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = typeof detail === "number" ? PROJECTS[detail] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (detail === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = overflow; };
  }, [detail]);

  return (
    <div className="jm-page" id="index">
      <a className="jm-skip" href="#main-content">Skip to content</a>
      <MercerHeader onProjects={() => setDetail("projects")} onAbout={() => setDetail("about")} />
      <main id="main-content" className="jm-hero" tabIndex={-1}>
        <div className="jm-grid jm-mono" aria-hidden="true">
          {["660", "230", "8060", "300", "360", "680", "-560", "200"].map((coordinate, index) => <span className="jm-coordinate" key={index}>{coordinate}</span>)}
          <span className="jm-crosshair" /><span className="jm-crosshair" />
        </div>
        <MercerHeroCopy onExplore={() => setDetail("projects")} onAbout={() => setDetail("about")} />
        <MercerTorusKnotCanvas suspended={detail !== null} />
      </main>
      <ProjectTicker onSelect={setDetail} onExplore={() => setDetail("projects")} />

      <dialog className="jm-dialog" ref={dialogRef} aria-labelledby="jm-dialog-title" onClose={() => setDetail(null)} onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setDetail(null);
        }
      }}>
        <div className="jm-dialog-head jm-mono"><span>JULES MERCER // {detail === "about" ? "THE DEVELOPER" : "SELECTED WORK"}</span><button type="button" className="jm-dialog-close" aria-label="Close details" onClick={() => setDetail(null)}><X size={18} aria-hidden="true" /></button></div>
        {detail === "about" ? <>
          <h2 id="jm-dialog-title">Design in mind.<br />Code at heart.</h2>
          <p>I’m Jules, an independent creative developer working at the intersection of design and technology. I turn ambitious ideas into considered digital experiences, from tactile interfaces to interactive worlds.</p>
          <p>Currently exploring procedural geometry, real-time graphics and the small details that make the web feel human.</p>
          <p className="jm-dialog-stack jm-mono">CREATIVE DEVELOPMENT / INTERACTION DESIGN / WEBGL</p>
          <a className="jm-button jm-button-primary" href="mailto:hello@julesmercer.studio">LET’S MAKE SOMETHING <ArrowUpRight size={18} aria-hidden="true" /></a>
        </> : project ? <>
          <h2 id="jm-dialog-title">{project.name}</h2>
          <span className="jm-mono jm-dialog-stack">{project.category}</span>
          <div className="jm-dialog-visual"><ProjectPreview variant={Number(detail)} /></div>
          <p>{project.description}</p>
          <p className="jm-dialog-stack jm-mono">{project.stack}</p>
          <button type="button" className="jm-button jm-button-secondary" onClick={() => setDetail("projects")}>ALL PROJECTS</button>
        </> : <>
          <h2 id="jm-dialog-title">Selected explorations.</h2>
          <p>Three studies in form, motion and possibility.</p>
          <div className="jm-dialog-projects">{PROJECTS.map((item, index) => <button key={item.name} type="button" onClick={() => setDetail(index)}><span>{item.name}<small>{item.category}</small></span><ArrowUpRight size={20} aria-hidden="true" /></button>)}</div>
        </>}
      </dialog>
    </div>
  );
}

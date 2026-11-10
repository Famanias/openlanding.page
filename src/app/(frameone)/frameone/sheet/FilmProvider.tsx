"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Picture } from "../assets";
import { PROJECTS } from "../content/projects";
import { frameTransform, nextProject } from "./sheet";

type FilmContextValue = { openProject: (index: number, origin: HTMLElement, still?: number) => void };
const FilmContext = createContext<FilmContextValue | null>(null);

export function useFilm() {
  const value = useContext(FilmContext);
  if (!value) throw new Error("Film controls must be inside FilmProvider");
  return value;
}

export function FilmProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<number | null>(null);
  const [openingStill, setOpeningStill] = useState(0);
  const origin = useRef<HTMLElement | null>(null);
  const originCell = useRef<HTMLElement | null>(null);
  const openProject = useCallback((index: number, element: HTMLElement, still = 0) => {
    origin.current = element;
    originCell.current = element.closest<HTMLElement>(".fo-cell");
    if (originCell.current) originCell.current.dataset.origin = "true";
    setOpeningStill(still === 1 ? 1 : 0);
    setActive(nextProject(index, 0, PROJECTS.length));
  }, []);
  const finishClose = useCallback(() => {
    originCell.current?.removeAttribute("data-origin");
    setActive(null);
    requestAnimationFrame(() => origin.current?.focus({ preventScroll: true }));
  }, []);
  return <FilmContext.Provider value={{ openProject }}>
    <div className="fo-page" data-viewing={active !== null} inert={active !== null || undefined}>{children}</div>
    {active !== null && <FilmViewer index={active} initialStill={openingStill} setIndex={setActive} origin={origin.current} onClose={finishClose} />}
  </FilmContext.Provider>;
}

function FilmViewer({ index, initialStill, setIndex, origin, onClose }: { index: number; initialStill: number; setIndex: (value: number) => void; origin: HTMLElement | null; onClose: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const animation = useRef<Animation | null>(null);
  const [playing, setPlaying] = useState(false);
  const [still, setStill] = useState(initialStill);
  const project = PROJECTS[index];

  const transformToOrigin = useCallback(() => {
    const rect = origin?.getBoundingClientRect();
    if (!rect) return "none";
    const t = frameTransform(rect, innerWidth, innerHeight);
    return `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scaleX}, ${t.scaleY})`;
  }, [origin]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const currentTransform = stage.current ? getComputedStyle(stage.current).transform : "none";
    animation.current?.cancel();
    if (!stage.current || matchMedia("(prefers-reduced-motion: reduce)").matches) { onClose(); return; }
    animation.current = stage.current.animate([{ transform: currentTransform }, { transform: transformToOrigin() }], { duration: 550, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" });
    animation.current.finished.then(onClose).catch(() => {});
  }, [onClose, transformToOrigin]);

  useLayoutEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    if (stage.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.current = stage.current.animate([{ transform: transformToOrigin() }, { transform: "none" }], { duration: 650, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
    }
    return () => { animation.current?.cancel(); document.body.style.overflow = previousOverflow; };
  }, [transformToOrigin]);

  const navigate = useCallback((step: number) => {
    setStill(0);
    setIndex(nextProject(index, step, PROJECTS.length));
  }, [index, setIndex]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStill((value) => (value + 1) % 2), 2400);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      const target = event.target as HTMLElement;
      if (event.key === "Tab" && stage.current) {
        const controls = Array.from(stage.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"));
        if (!controls.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (target.matches("input, textarea, select, [contenteditable=true]")) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault(); navigate(event.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, navigate]);

  return <div ref={stage} className="fo-viewer" role="dialog" aria-modal="true" aria-label="Project viewer" aria-describedby="fo-viewer-description">
    <div className="fo-viewer__top fo-mono"><span>FRAME / ONE &nbsp; · &nbsp; PROJECT {String(index + 1).padStart(2, "0")} / 04</span><button ref={closeButton} type="button" onClick={close} aria-label="Close project viewer">CLOSE <span aria-hidden="true">×</span></button></div>
    <div className="fo-viewer__screen" key={`${project.id}-${still}`}>
      <Picture assetKey={project.stills[still]} alt={`${project.title}, fictional film still`} priority />
      <p className="fo-viewer__subtitle">{project.caption}</p>
      <span className="fo-viewer__screen-count fo-mono">{String(still + 1).padStart(2, "0")} / 02</span>
    </div>
    <div className="fo-viewer__bottom">
      <div className="fo-viewer__info"><p className="fo-kicker">{project.category} / {project.year} / FICTIONAL</p><h2 data-project-title>{project.title}</h2><p id="fo-viewer-description">{project.note}</p></div>
      <div className="fo-viewer__controls fo-mono">
        <div className="fo-viewer__transport"><button type="button" aria-label="Previous project" onClick={() => navigate(-1)}>←</button><button type="button" aria-label={playing ? "Pause sequence" : "Play sequence"} onClick={() => setPlaying(!playing)}>{playing ? "Ⅱ" : "▷"}</button><button type="button" aria-label="Next project" onClick={() => navigate(1)}>→</button></div>
        <span>MUTED &nbsp; / &nbsp; {project.length}</span>
        <span>← → NAVIGATE &nbsp; / &nbsp; ESC CLOSE</span>
      </div>
    </div>
  </div>;
}

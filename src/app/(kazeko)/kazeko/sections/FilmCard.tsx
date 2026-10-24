"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Film } from "../data/films";
import { Arrow } from "../brand/Arrow";
import { Landscape } from "../illustrations/Landscape";
import { Picture } from "../assets";
export function FilmCard({ film, children }: { film: Film; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [open]);
  return <article className={`kz-film-card kz-film-${film.number}`}>
    <button className="kz-film-open" aria-label={`Explore ${film.title}`} type="button" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
      <div className="kz-film-art">{children}<span className="kz-film-number kz-mono">FILM / {film.number}</span><span className="kz-film-duration kz-mono">{film.length}</span><span className="kz-film-explore">Explore the story <Arrow diagonal /></span></div>
      <span className="kz-film-meta kz-mono">{film.type}<span>{film.year}</span></span>
      <span className="kz-film-title">{film.title}<Arrow diagonal /></span><span className="kz-film-japanese" lang="ja">{film.japanese}</span>
    </button>
    <dialog ref={dialog} className="kz-film-dialog" aria-labelledby={`kz-film-${film.id}`} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {open && <><button type="button" className="kz-close" aria-label="Close film details" onClick={() => dialog.current?.close()}>×</button>
      <div className="kz-dialog-art"><Picture assetKey={film.id} alt={`${film.title} concept artwork`}><Landscape variant={film.variant} /></Picture></div><div className="kz-dialog-copy"><span className="kz-mono">{film.type} / {film.length}</span><h2 id={`kz-film-${film.id}`}>{film.title}</h2><p>{film.description}</p><p className="kz-mono">{film.palette}</p><p className="kz-sample-note">A fictional film concept, created for this studio template.</p><a className="kz-button" href="#contact" onClick={() => dialog.current?.close()}>Imagine something with us <Arrow /></a></div></>}
    </dialog>
    <p className="kz-no-js">{film.description}</p>
  </article>;
}

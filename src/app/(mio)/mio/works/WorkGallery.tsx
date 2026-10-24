"use client";
import { useEffect, useRef, useState } from "react";
import { WORKS, type Work } from "../data";
import { Picture } from "../assets";
import { Arrow, Star } from "../brand/Icons";
export function WorkGallery() {
  const [category, setCategory] = useState("All work");
  const [selected, setSelected] = useState<Work | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = WORKS.filter(work => category === "All work" || work.category === category);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);
  function close() { dialog.current?.close(); }
  return <>
    <div className="mh-work-filters" role="group" aria-label="Filter artwork">{["All work", "Worlds", "Characters"].map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span className="mh-filter-dot"/></button>)}</div>
    <div className="mh-work-grid" data-filter={category}>
      {visible.map((work, index) => <article className={`mh-work mh-work-${work.id}`} key={work.id}>
        <button type="button" className="mh-work-open" onClick={event => { opener.current = event.currentTarget; setSelected(work); }} aria-label={`View ${work.title}`}>
          <div className="mh-work-art"><Picture assetKey={work.id} alt={work.description}/><span className="mh-art-view"><Arrow/></span></div>
          <span className="mh-work-caption"><span><span className="mh-work-title">{work.title}</span><span className="mh-work-category">{work.format}</span></span><span className="mh-work-year">{work.year}<Arrow/></span></span>
        </button>
        <span className="mh-art-annotation" aria-hidden="true">{index === 0 ? "a place to return to" : work.id === "cloud-keeper" ? "a friend for the journey" : work.id === "quiet-delivery" ? "the ordinary, a little magical" : "the art of doing nothing"}<svg viewBox="0 0 110 20" fill="none"><path d="M3 10q47 10 99-3m-5-3 6 3-5 4" stroke="currentColor" strokeWidth="1"/></svg></span>
      </article>)}
    </div>
    <dialog ref={dialog} className="mh-work-dialog" aria-labelledby="mh-work-dialog-title" onClose={() => { setSelected(null); opener.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} data-lenis-prevent>
      {selected && <div className="mh-dialog-content"><button className="mh-dialog-close" type="button" onClick={close} aria-label="Close artwork details"><svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg></button><Picture assetKey={selected.id} alt={selected.description} prefix="detail"/><div className="mh-dialog-copy"><span className="mh-work-category">{selected.format} · {selected.year}</span><h2 id="mh-work-dialog-title">{selected.title}</h2><p>{selected.description}</p><p className="mh-muted">{selected.note}</p><a href={`?commission=${selected.category === "Characters" ? "portrait" : "world"}#inquiry`} className="mh-button" data-mh-package={selected.category === "Characters" ? "portrait" : "world"} onClick={close}>Dream up something like this <Arrow/></a><p className="mh-small">Original sample artwork for this portfolio concept.</p></div></div>}
    </dialog>
    <p className="mh-work-closing"><Star/>Every little world begins with a feeling. What’s yours?</p>
  </>;
}

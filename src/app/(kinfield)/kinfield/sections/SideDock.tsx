'use client';

import { useEffect, useRef, useState } from "react";

const chapters = [
  ["top", "Introduction"], ["practice", "The practice"], ["atlas", "Movement atlas"],
  ["programs", "The program"], ["teachers", "Our teachers"], ["session", "Session preview"],
] as const;

export function SideDock() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: 0 });
    chapters.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => {
      observer.disconnect();
      if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  return (
    <>
      <button ref={opener} className="kf-dock" onClick={() => {
        if (!dialog.current) return;
        previousOverflow.current = document.body.style.overflow;
        dialog.current.showModal();
        document.body.style.overflow = "hidden";
      }} aria-label="Open chapter navigation" aria-haspopup="dialog">
        <span className="kf-dock-lines" aria-hidden="true"><i /><i /></span>
        <span className="kf-dock-label">INDEX</span><span className="kf-dock-num">0{Math.max(1, chapters.findIndex(([id]) => id === active) + 1)}</span>
      </button>
      <dialog className="kf-drawer" ref={dialog} aria-labelledby="kf-nav-title" onClose={() => {
        if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
        opener.current?.focus();
      }} onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close();
      }}>
        <div className="kf-drawer-top"><span id="kf-nav-title">KINFIELD / INDEX</span><button className="kf-close" onClick={() => dialog.current?.close()} aria-label="Close navigation">×</button></div>
        <p className="kf-drawer-title">Find your<br /><em>way in.</em></p>
        <nav aria-label="Chapters">
          {chapters.map(([id, label], index) => <a key={id} href={"#" + id} onClick={() => dialog.current?.close()}><span>0{index + 1}</span>{label}<span aria-hidden="true">↗</span></a>)}
        </nav>
        <p className="kf-drawer-note">A practice in being here. / 085</p>
      </dialog>
    </>
  );
}

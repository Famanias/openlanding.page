"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Logo } from "../brand/Logo";
import { Arrow, Leaf, PauseIcon } from "../brand/Icons";
import { useAmbient } from "../motion/useAmbient";
import { useReducedMotion } from "../motion/useReducedMotion";
import { CHAPTERS } from "./chapters";
import { chapterIndex, moveChapter, wheelDirection } from "./logic";

export function PictureBook({ pages }: { pages: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const { paused, stopped, toggle } = useAmbient();
  const reduced = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const wheelLockRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const chapter = CHAPTERS[active];

  const go = useCallback((index: number) => {
    const next = moveChapter(index, 0, CHAPTERS.length);
    setActive(next);
    if (window.location.hash !== `#${CHAPTERS[next].id}`) window.history.pushState(null, "", `#${CHAPTERS[next].id}`);
    if (reduced) document.getElementById(CHAPTERS[next].id)?.scrollIntoView({ behavior: "instant" });
  }, [reduced]);

  useEffect(() => {
    const sync = () => setActive(chapterIndex(window.location.hash));
    const frame = requestAnimationFrame(() => { sync(); setReady(true); });
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target instanceof Element && event.target.closest("button,a,input,select,textarea,[contenteditable=true],[role=tablist]"))) return;
      const next = event.key === "ArrowRight" || event.key === "PageDown" ? active + 1 : event.key === "ArrowLeft" || event.key === "PageUp" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? CHAPTERS.length - 1 : null;
      if (next !== null) { event.preventDefault(); go(next); }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [active, go]);

  useEffect(() => {
    if (reduced) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable=true]")) return;

      const direction = wheelDirection(event.deltaX, event.deltaY);
      if (direction === 0) return;

      const activeChapter = document.querySelector<HTMLElement>('.st-chapter[data-state="active"]');
      if (activeChapter && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
        const canScrollDown = activeChapter.scrollHeight > activeChapter.clientHeight + 4 &&
          activeChapter.scrollTop + activeChapter.clientHeight < activeChapter.scrollHeight - 6;
        const canScrollUp = activeChapter.scrollHeight > activeChapter.clientHeight + 4 &&
          activeChapter.scrollTop > 6;

        if ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp)) {
          return;
        }
      }

      const now = Date.now();
      if (now < wheelLockRef.current) return;

      const next = moveChapter(active, direction, CHAPTERS.length);
      if (next !== active) {
        event.preventDefault();
        wheelLockRef.current = now + 650;
        go(next);
      } else {
        wheelLockRef.current = now + 250;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, go, reduced]);

  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (link && navRef.current) navRef.current.scrollTo({ left: link.offsetLeft - navRef.current.clientWidth / 2 + link.clientWidth / 2, behavior: "instant" });
  }, [active]);

  useEffect(() => {
    if (!reduced) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(chapterIndex(visible.target.id));
    }, { threshold: .5 });
    document.querySelectorAll('.st-chapter').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [reduced]);

  return <div className="st-book" data-ready={ready} data-paused={stopped} style={{ "--st-active": active } as CSSProperties}>
    <a className="st-skip" href="#st-reading">Skip to the chapter</a>
    <header className="st-header">
      <Logo />
      <nav className="st-navigation" aria-label="Chapters" ref={navRef}>
        {CHAPTERS.map((item, index) => <a key={item.id} href={`#${item.id}`} aria-current={active === index ? "page" : undefined} onClick={(event) => { event.preventDefault(); go(index); }}><span className="st-nav-number">0{index + 1}</span>{item.label}</a>)}
      </nav>
      <a className="st-header-note" href="#little-adventures"><Leaf /><span>Take the slow way</span><Arrow /></a>
    </header>
    <main id="st-reading" className="st-stage" tabIndex={-1}
      onTouchStart={(event) => { if (!(event.target instanceof Element) || event.target.closest(".st-carousel,[role=tablist]")) return; touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={(event) => { const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.5) go(active + (dx < 0 ? 1 : -1)); }}>
      {CHAPTERS.map((item, index) => <section key={item.id} className="st-chapter" id={item.id} data-state={active === index ? "active" : index < active ? "past" : "future"} aria-label={`${index + 1} of ${CHAPTERS.length}: ${item.label}`} aria-roledescription="slide" inert={ready && !reduced && active !== index ? true : undefined}>{pages[index]}</section>)}
      <div className="st-scene-caption"><span className="st-caption-dot" /> A SMALL WINDOW INTO RURAL JAPAN <span className="st-caption-jp" lang="ja">日本の田舎暮らし</span></div>
      <button className="st-ambient st-js-control" onClick={toggle} aria-label={paused ? "Play landscape animation" : "Pause landscape animation"} aria-pressed={paused}><PauseIcon paused={paused} /><span>{paused ? "Still for a moment" : "A living landscape"}</span></button>
    </main>
    <footer className="st-bottom">
      <div className="st-page-label"><span className="st-page-numeral">0{active + 1}</span><span className="st-page-line" /><span lang="ja">{chapter.japanese}</span><span className="st-page-total">/ 06</span></div>
      <div className="st-page-dots st-js-control" role="group" aria-label="Go to chapter">{CHAPTERS.map((item, index) => <button key={item.id} aria-label={`Chapter ${index + 1}: ${item.label}`} aria-current={active === index ? "step" : undefined} onClick={() => go(index)}><span /></button>)}</div>
      <div className="st-page-actions"><span className="st-key-hint">A story in six chapters <span>·</span> scroll or use <kbd>←</kbd> <kbd>→</kbd></span><button className="st-arrow-button st-js-control" aria-label="Previous chapter" disabled={active === 0} onClick={() => go(active - 1)}><Arrow direction="left" /></button><button className="st-arrow-button st-js-control" aria-label="Next chapter" disabled={active === CHAPTERS.length - 1} onClick={() => go(active + 1)}><Arrow /></button></div>
    </footer>
    <div className="st-sr-only" aria-live="polite" aria-atomic="true">Chapter {active + 1} of 6: {chapter.label}</div>
  </div>;
}

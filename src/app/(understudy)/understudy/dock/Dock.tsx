"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { goto } from "./goto";

// the sheets are split out of the first load and fetched when the browser is idle
const loadMenu = () => import("./MenuSheet");
const loadStart = () => import("../forms/AuditionSheet");
const loadAsk = () => import("../ask/AskSheet");
const MenuSheet = dynamic(() => loadMenu().then((m) => m.MenuSheet), { ssr: false });
const AuditionSheet = dynamic(() => loadStart().then((m) => m.AuditionSheet), { ssr: false });
const AskSheet = dynamic(() => loadAsk().then((m) => m.AskSheet), { ssr: false });

export type SheetName = "menu" | "start" | "ask" | null;

/**
 * The only navigation, docked at the foot of the screen in glass: Start, the menu and a
 * question mark. Any element with `data-us-start` (optionally `data-us-part`) or `data-us-ask`
 * elsewhere on the page opens the matching sheet, so the server-rendered sections stay static.
 */
export function Dock() {
  const [sheet, setSheet] = useState<SheetName>(null);
  const [part, setPart] = useState<string | undefined>(undefined);
  // sheets mount on first use, so their forms and data cost nothing at load
  const [mounted, setMounted] = useState<Record<Exclude<SheetName, null>, boolean>>({ menu: false, start: false, ask: false });
  const mountedRef = useRef(mounted);
  const close = useCallback(() => setSheet(null), []);
  const startRef = useRef<HTMLButtonElement>(null);

  /** Open a sheet; a sheet that has never been shown mounts closed first, so its opening transition still plays. */
  const show = useCallback((name: Exclude<SheetName, null>) => {
    if (mountedRef.current[name]) { setSheet(name); return; }
    mountedRef.current = { ...mountedRef.current, [name]: true };
    setMounted(mountedRef.current);
    requestAnimationFrame(() => requestAnimationFrame(() => setSheet(name)));
  }, []);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as Element).closest<HTMLElement>("[data-us-start], [data-us-ask], [data-us-go]");
      if (!el || el.closest(".us-dock")) return;
      e.preventDefault();
      if (el.hasAttribute("data-us-go")) { setSheet(null); goto(el.dataset.usGo ?? "top"); return; }
      if (el.hasAttribute("data-us-ask")) { show("ask"); return; }
      setPart(el.dataset.usPart);
      show("start");
    };
    document.addEventListener("click", click);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const warm = idle(() => { void loadStart(); void loadMenu(); void loadAsk(); });
    return () => {
      document.removeEventListener("click", click);
      (window.cancelIdleCallback ?? window.clearTimeout)(warm);
    };
  }, [show]);

  const toggle = (name: Exclude<SheetName, null>) => () => {
    if (name === "start") setPart(undefined);
    if (sheet === name) setSheet(null); else show(name);
  };

  return (
    <>
      <div className="us-scrim" data-open={sheet !== null} onClick={close} aria-hidden="true" />
      {mounted.menu && <MenuSheet open={sheet === "menu"} onClose={close} />}
      {mounted.start && <AuditionSheet open={sheet === "start"} onClose={close} part={part} />}
      {mounted.ask && <AskSheet open={sheet === "ask"} onClose={close} />}
      <nav className="us-dock" aria-label="Understudy" data-sheet={sheet ?? "none"}>
        <i className="us-dock__progress" aria-hidden="true" />
        <button ref={startRef} type="button" className="us-dock__start" aria-expanded={sheet === "start"} aria-controls={mounted.start ? "us-start-sheet" : undefined} onClick={toggle("start")}>
          <span className="us-dock__halo" aria-hidden="true" />
          <span className="us-dock__shine" aria-hidden="true" />
          <svg className="us-dock__play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" /></svg>
          <span className="us-roll" data-text="Start"><span>Start</span></span>
        </button>
        <button type="button" className="us-dock__menu" aria-expanded={sheet === "menu"} aria-controls={mounted.menu ? "us-menu-sheet" : undefined} onClick={toggle("menu")}>
          <i aria-hidden="true" /><i aria-hidden="true" />
          <span className="us-sr">Menu</span>
        </button>
        <button type="button" className="us-dock__ask" aria-expanded={sheet === "ask"} aria-controls={mounted.ask ? "us-ask-sheet" : undefined} onClick={toggle("ask")}>
          <span aria-hidden="true">?</span>
          <span className="us-sr">Ask Understudy a question</span>
        </button>
      </nav>
    </>
  );
}

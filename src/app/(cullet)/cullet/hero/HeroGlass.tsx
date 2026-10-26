"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAPER } from "../content/copy";
import { lockScroll } from "../motion/SmoothScroll";
import { mayHaveWebGL } from "../motion/webgl";
import { heroBus } from "./bus";
import type { HeroEngine } from "./engine";

type Glass = "off" | "offer" | "loading" | "on";

const whenIdle = (fn: () => void) => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  if (w.requestIdleCallback) { const id = w.requestIdleCallback(fn, { timeout: 2500 }); return () => w.cancelIdleCallback?.(id); }
  const id = window.setTimeout(fn, 900);
  return () => window.clearTimeout(id);
};

/**
 * Runs the hero: brings in the WebGL slab (on idle with a fine pointer, on tap on touch screens,
 * never under reduced motion), and owns the paper: "Read paper" shatters the glass and opens a
 * short technical note beside a sliver of quartz; "Back" (or Escape) puts the slab back together.
 */
export function HeroGlass() {
  const [glass, setGlass] = useState<Glass>("off");
  const [paper, setPaper] = useState(false);
  const engine = useRef<HeroEngine | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);

  const start = useCallback(async () => {
    const hero = document.querySelector<HTMLElement>(".fc-hero");
    const stage = hero?.querySelector<HTMLElement>(".fc-hero__stage");
    const canvas = hero?.querySelector<HTMLCanvasElement>(".fc-hero__canvas");
    const slab = hero?.querySelector<HTMLElement>(".fc-slab");
    const nav = hero?.querySelector<HTMLElement>(".fc-slab__nav");
    const panel = hero?.querySelector<HTMLElement>(".fc-slab__panel");
    if (!hero || !stage || !canvas || !slab || !nav || !panel || engine.current) return;
    setGlass("loading");
    try {
      await document.fonts?.ready;
      const { createHeroEngine } = await import("./engine");
      if (engine.current) return;
      engine.current = createHeroEngine({ stage, canvas, slab, nav, panel, back: backRef.current });
      engine.current.start();
      hero.dataset.gl = "on";
      setGlass("on");
    } catch {
      setGlass("off");
    }
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !mayHaveWebGL()) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const id = window.setTimeout(() => setGlass("offer"), 0);
      return () => window.clearTimeout(id);
    }
    return whenIdle(() => void start());
  }, [start]);

  useEffect(() => () => { engine.current?.destroy(); engine.current = null; window.clearTimeout(timer.current); }, []);

  const open = useCallback(() => {
    const hero = document.querySelector<HTMLElement>(".fc-hero");
    // the paper opens from the whole slab only; mid-cleave the shards are already elsewhere
    if (!hero || hero.dataset.state !== "assembled" || heroBus.cleave > 0.02) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    engine.current?.shatter();
    hero.dataset.state = "shattering";
    lockScroll(true);
    timer.current = window.setTimeout(() => {
      hero.dataset.state = "paper";
      setPaper(true);
    }, reduced ? 0 : 280);
  }, []);

  const close = useCallback(() => {
    const hero = document.querySelector<HTMLElement>(".fc-hero");
    if (!hero) return;
    window.clearTimeout(timer.current);
    setPaper(false);
    engine.current?.showSliver(false);
    engine.current?.reassemble();
    hero.dataset.state = "assembled";
    lockScroll(false);
    // the slab is inert while the paper is open; release it before handing focus back
    hero.querySelector(".fc-slab")?.removeAttribute("inert");
    hero.querySelector<HTMLElement>("[data-paper-open]")?.focus({ preventScroll: true });
  }, []);

  // "Read paper →" is a plain link to the terms without JS; with JS it opens the paper
  useEffect(() => {
    const link = document.querySelector<HTMLElement>("[data-paper-open]");
    if (!link) return;
    const onClick = (e: MouseEvent) => { e.preventDefault(); open(); };
    link.addEventListener("click", onClick);
    return () => link.removeEventListener("click", onClick);
  }, [open]);

  useEffect(() => {
    const slab = document.querySelector<HTMLElement>(".fc-slab");
    if (!paper) { slab?.removeAttribute("inert"); return; }
    slab?.setAttribute("inert", "");
    backRef.current?.focus({ preventScroll: true });
    // the sliver is cut around the Back button, so measure once the paper is showing
    engine.current?.showSliver(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab") {
        const items = Array.from(document.querySelectorAll<HTMLElement>(".fc-paper a, .fc-paper button"));
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [paper, close]);

  const readTerms = () => {
    close();
    window.setTimeout(() => window.dispatchEvent(new CustomEvent("fc:goto", { detail: "terms" })), 60);
  };

  return (
    <>
      {glass === "offer" || glass === "loading" ? (
        <button type="button" className="fc-light" onClick={() => void start()} disabled={glass === "loading"} data-state={glass}>
          <span className="fc-light__dot" aria-hidden="true" />
          {glass === "loading" ? "Lighting the glass…" : "Light the glass"}
        </button>
      ) : null}
      <div className="fc-paper" role="dialog" aria-modal="true" aria-labelledby="fc-paper-title" data-open={paper} hidden={!paper}>
        <button ref={backRef} type="button" className="fc-paper__back" onClick={close}>
          <span aria-hidden="true">←</span> Back
        </button>
        <div className="fc-paper__col">
          <p className="fc-paper__label">{PAPER.label}</p>
          <p id="fc-paper-title" className="fc-paper__title">{PAPER.title}</p>
          {PAPER.paragraphs.map((p, i) => (
            <p key={i} className="fc-paper__p">{p}</p>
          ))}
          <dl className="fc-paper__figs">
            {PAPER.figures.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
          <a href="#terms" className="fc-paper__more" onClick={(e) => { e.preventDefault(); readTerms(); }}>The five terms →</a>
        </div>
      </div>
    </>
  );
}

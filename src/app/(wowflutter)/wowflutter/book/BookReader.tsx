"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { PAGES } from "../content/contents";
import { TurnEngine, type EngineView } from "./engine";
import { keyAction } from "./keys";
import { BOOK_QUERY, REDUCED_QUERY } from "./queries";
import {
  LEAF_COUNT,
  PAGE_COUNT,
  SPREAD_COUNT,
  folio,
  leafState,
  parsePageHash,
  spreadHash,
  spreadPages,
} from "./spreads";
import { FLICK_SPEED, bookShift, dragProgress, leafTurn, tapeCount, type Direction } from "./turn";

type Layout = "unknown" | "book" | "flow";
type Els = { leaves: HTMLElement | null; counter: HTMLElement | null; slots: (HTMLElement | null)[] };
type Drag = {
  id: number;
  startX: number;
  dir: Direction;
  base: number;
  pageWidth: number;
  moved: boolean;
  fromCorner: boolean;
  samples: { t: number; x: number }[];
};

const pad3 = (n: number) => String(n).padStart(3, "0");

/** Writes the engine's view straight to the DOM; React is only told when a turn has finished. */
function paint(view: EngineView, els: Els) {
  els.leaves?.style.setProperty("--shift", String(bookShift(view.position, LEAF_COUNT)));
  if (els.counter) els.counter.textContent = pad3(tapeCount(view.position, SPREAD_COUNT));
  const t = view.turning;
  const slot = t ? els.slots[t.leaf] : null;
  if (t && slot) {
    slot.style.setProperty("--turn", String(leafTurn(t.dir, t.progress)));
    slot.dataset.active = "true";
  }
}

/** Hands control back to the data-state rules once React has rendered the resting spread. */
function clearOverrides(els: Els) {
  for (const slot of els.slots) {
    slot?.style.removeProperty("--turn");
    if (slot) delete slot.dataset.active;
  }
}

/**
 * Keeps the address bar on the visible page without adding history entries. It leaves the address alone
 * when it already names this spread (so #p5 stays #p5) and keeps a clean URL while the cover is showing.
 */
function syncHash(spread: number) {
  const current = window.location.hash;
  if (spread === 0 && current === "") return;
  if (parsePageHash(current) === spread) return;
  window.history.replaceState(null, "", spreadHash(spread));
}

function describeSpread(spread: number): string {
  const { left, right } = spreadPages(spread);
  const titles = [left, right].filter((n): n is number => n !== null).map((n) => PAGES[n - 1].title);
  const numbers = left !== null && right !== null ? `Pages ${left} and ${right}` : `Page ${left ?? right}`;
  return `${numbers} of ${PAGE_COUNT}: ${titles.join(" and ")}`;
}

/** Releasing speed in px/ms toward finishing the turn, from the last ~90 ms of pointer samples. */
function releaseVelocity(samples: Drag["samples"], dir: Direction): number {
  const last = samples[samples.length - 1];
  const first = samples.find((s) => last.t - s.t <= 90) ?? last;
  const dt = last.t - first.t;
  if (dt <= 0) return 0;
  const vx = (last.x - first.x) / dt;
  return dir === 1 ? -vx : vx;
}

export function BookReader({ pages }: { pages: ReactNode[] }) {
  const [spread, setSpread] = useState(0);
  const [layout, setLayout] = useState<Layout>("unknown");

  const readerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<TurnEngine | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const spreadRef = useRef(0);
  const layoutRef = useRef<Layout>("unknown");

  const els = useCallback(
    (): Els => ({ leaves: leavesRef.current, counter: counterRef.current, slots: slotRefs.current }),
    [],
  );

  // The engine lives for the life of the component and talks to the DOM through `paint`.
  useEffect(() => {
    const engine = new TurnEngine({
      render: (view) => paint(view, els()),
      commit: (next) => {
        if (next === spreadRef.current) clearOverrides(els());
        else setSpread(next);
        syncHash(next);
      },
      request: (cb) => requestAnimationFrame(cb),
      cancel: (id) => cancelAnimationFrame(id),
      now: () => performance.now(),
    });
    engineRef.current = engine;
    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [els]);

  // Which screen are we on, and does the visitor want motion?
  useEffect(() => {
    const book = window.matchMedia(BOOK_QUERY);
    const reduced = window.matchMedia(REDUCED_QUERY);
    const update = () => {
      engineRef.current?.setReduced(reduced.matches);
      const next: Layout = book.matches ? "book" : "flow";
      layoutRef.current = next;
      setLayout(next);
    };
    update();
    book.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      book.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // After every rendered spread: hand the leaves back to the data-state rules and show the resting position.
  useLayoutEffect(() => {
    spreadRef.current = spread;
    clearOverrides(els());
    paint({ spread, turning: null, position: spread }, els());
  }, [spread, els]);

  // Entering the book layout: open at the page named in the address, if any.
  useEffect(() => {
    if (layout !== "book") return;
    const engine = engineRef.current;
    if (!engine) return;
    engine.jumpTo(parsePageHash(window.location.hash) ?? spreadRef.current);
  }, [layout]);

  // Keyboard, contents links and address changes: only while the book layout is showing.
  useEffect(() => {
    if (layout !== "book") return;

    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      const engine = engineRef.current;
      if (!engine || dragRef.current) return;
      const action = keyAction(e.key, e.target as HTMLElement | null);
      if (!action) return;
      e.preventDefault();
      if (action === "next") engine.step(1);
      else if (action === "prev") engine.step(-1);
      else engine.goTo(action === "first" ? 0 : SPREAD_COUNT - 1);
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#p"]');
      const target = link ? parsePageHash(link.getAttribute("href") ?? "") : null;
      if (!link || target === null) return;
      e.preventDefault();
      engineRef.current?.goTo(target);
    };

    const onHash = () => {
      const target = parsePageHash(window.location.hash);
      if (target !== null) engineRef.current?.goTo(target);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    // Tells tests (and anyone curious) that the book is listening.
    const reader = readerRef.current;
    reader?.setAttribute("data-ready", "true");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
      reader?.removeAttribute("data-ready");
    };
  }, [layout]);

  // ── Pointer: drag a page corner, or either page, to turn the leaf under your hand ──
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const engine = engineRef.current;
    if (!engine || layoutRef.current !== "book") return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const target = e.target as HTMLElement;
    const corner = target.closest<HTMLElement>("[data-corner]");
    if (!corner && target.closest("a, button, input, select, textarea, label")) return;

    // The leaves box moves when a cover is closed, so its centre is always the spine.
    const rect = leavesRef.current!.getBoundingClientRect();
    const wanted: Direction = corner
      ? corner.dataset.corner === "next"
        ? 1
        : -1
      : e.clientX > rect.left + rect.width / 2
        ? 1
        : -1;
    const grabbed = engine.grab(wanted);
    if (!grabbed) return;

    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      dir: grabbed.dir,
      base: grabbed.progress,
      pageWidth: rect.width / 2,
      moved: false,
      fromCorner: !!corner,
      samples: [{ t: performance.now(), x: e.clientX }],
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    readerRef.current?.setAttribute("data-dragging", "true");
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.id) return;
    if (Math.abs(e.clientX - d.startX) > 4) d.moved = true;
    d.samples.push({ t: performance.now(), x: e.clientX });
    if (d.samples.length > 12) d.samples.shift();
    engineRef.current?.drag(dragProgress(d.startX, e.clientX, d.pageWidth, d.dir, d.base));
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.id) return;
    dragRef.current = null;
    readerRef.current?.removeAttribute("data-dragging");
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    // A plain press on a corner is a click: turn the whole leaf.
    const clickedCorner = d.fromCorner && !d.moved && d.base === 0;
    engineRef.current?.release(clickedCorner ? FLICK_SPEED + 1 : releaseVelocity(d.samples, d.dir));
  };

  const step = (dir: Direction) => engineRef.current?.step(dir);
  const atStart = spread <= 0;
  const atEnd = spread >= LEAF_COUNT;
  const { left, right } = spreadPages(spread);
  const inBook = layout === "book";

  return (
    <div ref={readerRef} className="wf-reader" data-layout={layout} data-spread={spread}>
      <div className="wf-desk">
        <div
          ref={bookRef}
          className="wf-book"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div ref={leavesRef} className="wf-leaves" data-testid="book">
            {Array.from({ length: LEAF_COUNT }, (_, k) => (
              <div
                key={k}
                ref={(el) => {
                  slotRefs.current[k] = el;
                }}
                className="wf-slot"
                data-leaf={k}
                data-state={leafState(k, spread)}
                style={{ "--k": k, "--n": LEAF_COUNT } as CSSProperties}
              >
                <div className="wf-leaf">
                  {[2 * k + 1, 2 * k + 2].map((n, i) => (
                    <div
                      key={n}
                      id={`p${n}`}
                      role="group"
                      aria-label={PAGES[n - 1].title}
                      className={`wf-page wf-page--${i === 0 ? "front" : "back"}`}
                      data-page={n}
                      inert={inBook && n !== left && n !== right ? true : undefined}
                    >
                      {pages[n - 1]}
                    </div>
                  ))}
                </div>
                <div className="wf-cast wf-cast--right" aria-hidden="true" />
                <div className="wf-cast wf-cast--left" aria-hidden="true" />
              </div>
            ))}

            <button
              type="button"
              className="wf-corner wf-corner--prev"
              data-corner="prev"
              aria-label="Previous page"
              hidden={!inBook || atStart}
              onClick={(e) => e.detail === 0 && step(-1)}
            />
            <button
              type="button"
              className="wf-corner wf-corner--next"
              data-corner="next"
              aria-label="Next page"
              hidden={!inBook || atEnd}
              onClick={(e) => e.detail === 0 && step(1)}
            />
          </div>
        </div>
      </div>

      <div className="wf-bar">
        <button type="button" className="wf-btn wf-btn--paper" onClick={() => step(-1)} disabled={atStart}>
          <span aria-hidden="true">←</span> Prev
        </button>
        <div className="wf-bar__mid">
          <span className="wf-tape" aria-hidden="true">
            <span className="wf-tape__label">Tape</span>
            <span ref={counterRef} className="wf-tape__digits" data-testid="tape-counter">
              000
            </span>
          </span>
          <span className="wf-folio" data-testid="folio">
            {folio(spread)}
          </span>
        </div>
        <button type="button" className="wf-btn wf-btn--paper" onClick={() => step(1)} disabled={atEnd}>
          Next <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="wf-vh" aria-live="polite" data-testid="spread-announcement">
        {inBook ? describeSpread(spread) : ""}
      </p>
    </div>
  );
}

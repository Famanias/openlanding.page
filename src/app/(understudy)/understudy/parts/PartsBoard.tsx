"use client";
import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { FIELDS, partsIn, type Field } from "../content/parts";
import { MaskLine } from "../motion/Reveal";
import { useReducedMotion } from "../motion/useReducedMotion";
import { repsFor } from "./carousel";
import { PartCard } from "./PartCard";
import { useRing, type RingMeasure } from "./useRing";

/**
 * The fields as chips (a pill slides to the chosen one), then the parts on an endless ring that
 * drifts right to left. Switching field re-deals the ring: the new cards cascade in.
 */
export function PartsBoard() {
  const [field, setField] = useState<Field | "all">("all");
  const [deal, setDeal] = useState(0);
  const [paused, setPaused] = useState(false);
  const [measure, setMeasure] = useState<RingMeasure>({ slot: 312, viewport: 1440 });
  const chips = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const parts = partsIn(field);
  const active = FIELDS.findIndex((f) => f.id === field);
  // a short set is repeated so the ring always covers the screen; the repeats are hidden from readers
  const reps = reduced ? 1 : repsFor(parts.length, measure.slot, measure.viewport);
  const ring = Array.from({ length: reps }, (_, r) => parts.map((part) => ({ part, copy: r > 0 }))).flat();

  const onMeasure = useCallback((next: RingMeasure) => {
    setMeasure((prev) => (prev.slot === next.slot && prev.viewport === next.viewport ? prev : next));
  }, []);
  const { glide } = useRing(band, track, { enabled: !reduced, paused, layoutKey: `${deal}-${reps}`, onMeasure });

  // the pill is one clip-path over the whole chip row, so it glides instead of jumping between buttons
  useLayoutEffect(() => {
    const row = inner.current;
    if (!row) return;
    const place = () => {
      const button = row.querySelectorAll<HTMLButtonElement>(".us-chip")[active];
      if (!button) return;
      row.style.setProperty("--pill-x", `${button.offsetLeft}px`);
      row.style.setProperty("--pill-w", `${button.offsetWidth}px`);
      chips.current?.setAttribute("data-measured", "");
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(row);
    return () => ro.disconnect();
  }, [active]);

  const choose = (id: Field | "all") => { if (id === field) return; setField(id); setDeal((d) => d + 1); };
  const chipKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + FIELDS.length) % FIELDS.length;
    choose(FIELDS[next].id);
    inner.current?.querySelectorAll<HTMLButtonElement>(".us-chip")[next]?.focus();
  };

  // one card along: a glide on the ring, or a native scroll of the row when motion is reduced
  const step = (dir: 1 | -1) => {
    if (reduced) track.current?.scrollBy({ left: dir * measure.slot, behavior: "instant" });
    else glide(-dir * measure.slot);
  };
  const ringKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  return (
    <>
      <div className="us-parts__head">
        <h2 className="us-h2 us-parts__t" id="us-parts-t">
          <MaskLine index={0}>We cast you in the parts</MaskLine>{" "}
          <MaskLine index={1}>companies are <em className="us-cueword">hiring for.</em></MaskLine>
        </h2>
        <div ref={chips} className="us-chips" role="group" aria-label="Fields" onKeyDown={chipKeys} data-reveal="slide" data-lenis-prevent-horizontal>
          <div ref={inner} className="us-chips__in">
            <i className="us-chips__pill" aria-hidden="true" />
            {FIELDS.map((f) => (
              <button key={f.id} type="button" className="us-chip" aria-pressed={f.id === field} onClick={() => choose(f.id)}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div ref={band} className="us-parts__band" role="region" aria-roledescription="carousel" aria-label="Parts" onKeyDown={ringKeys} data-lenis-prevent-horizontal>
        <ul ref={track} className="us-parts__track" aria-label={`${parts.length} parts`} data-dealt={deal > 0 ? "" : undefined} data-reveal="props">
          {ring.map(({ part, copy }, i) => <PartCard key={`${deal}-${i}-${part.id}`} part={part} index={i} copy={copy} />)}
        </ul>
      </div>
      <div className="us-parts__controls us-js-only">
        <button type="button" className="us-ringbtn" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6m5-6-6 6 6 6" /></svg>
          <span className="us-sr">Previous part</span>
        </button>
        {!reduced && (
          <button type="button" className="us-ringbtn" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused
              ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" className="us-ringbtn__fill" /></svg>
              : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg>}
            <span className="us-sr">Pause the parts</span>
          </button>
        )}
        <button type="button" className="us-ringbtn" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" /></svg>
          <span className="us-sr">Next part</span>
        </button>
        <p className="us-mono us-parts__hint">Drag it, or let it run</p>
      </div>
    </>
  );
}

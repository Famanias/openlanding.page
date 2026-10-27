"use client";

import { useImperativeHandle, useRef, type Ref } from "react";
import { CHAPTERS } from "../content/story";
import { CHAPTER_CLOCK, CHAPTER_POINTS, formatClock, progressToClock, type ChapterId } from "../night/clock";
import { nearestChapter, stepChapter } from "../night/tide";
import { arcPath, DIAL, dialPoint, dialProgress } from "./dialGeometry";

export type MoonDialHandle = { update(p: number): void };

type Props = {
  handleRef: Ref<MoonDialHandle>;
  onGoTo: (id: ChapterId) => void;
  onScrub: (p: number) => void;
  onHold: (held: boolean) => void;
  getProgress: () => number;
};

const LABEL = Object.fromEntries(CHAPTERS.map((c) => [c.id, c.label])) as Record<ChapterId, string>;

/** The night clock: a moon riding an arc from 23:04 to 07:00. Drag it, click a notch, or use the arrow keys. */
export function MoonDial({ handleRef, onGoTo, onScrub, onHold, getProgress }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<SVGCircleElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const last = useRef({ p: -1, id: "" as string });
  const dragging = useRef(false);

  useImperativeHandle(handleRef, () => ({
    update(p: number) {
      if (Math.abs(p - last.current.p) < 0.0004) return;
      last.current.p = p;
      const { x, y } = dialPoint(p);
      moonRef.current?.setAttribute("cx", x.toFixed(2));
      moonRef.current?.setAttribute("cy", y.toFixed(2));
      fillRef.current?.style.setProperty("stroke-dashoffset", String(1 - p));
      const clock = formatClock(progressToClock(p));
      const id = nearestChapter(p);
      if (timeRef.current) timeRef.current.textContent = clock;
      if (id !== last.current.id && labelRef.current) labelRef.current.textContent = LABEL[id];
      last.current.id = id;
      const s = sliderRef.current;
      if (s) {
        s.setAttribute("aria-valuenow", String(Math.round(p * 100)));
        s.setAttribute("aria-valuetext", `${clock}, ${LABEL[id]}`);
      }
    },
  }));

  const toLocal = (e: React.PointerEvent) => {
    const r = sliderRef.current!.getBoundingClientRect();
    return dialProgress(((e.clientX - r.left) / r.width) * DIAL.size, ((e.clientY - r.top) / r.height) * DIAL.size);
  };

  return (
    <div className="lt-dial">
      <div
        ref={sliderRef}
        className="lt-dial__face"
        role="slider"
        tabIndex={0}
        aria-label="Night clock"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-valuetext={`${formatClock(CHAPTER_CLOCK.hook)}, ${LABEL.hook}`}
        data-testid="lt-dial"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          onHold(true);
          onScrub(toLocal(e));
        }}
        onPointerMove={(e) => dragging.current && onScrub(toLocal(e))}
        onPointerUp={() => {
          dragging.current = false;
          onHold(false);
        }}
        onPointerCancel={() => {
          dragging.current = false;
          onHold(false);
        }}
        onKeyDown={(e) => {
          const p = getProgress();
          const map: Record<string, ChapterId | undefined> = {
            ArrowRight: stepChapter(p, 1), ArrowUp: stepChapter(p, 1), PageDown: stepChapter(p, 1),
            ArrowLeft: stepChapter(p, -1), ArrowDown: stepChapter(p, -1), PageUp: stepChapter(p, -1),
            Home: "hook", End: "dawn",
          };
          const to = map[e.key];
          if (!to) return;
          e.preventDefault();
          e.stopPropagation();
          onGoTo(to);
        }}
      >
        <svg viewBox={`0 0 ${DIAL.size} ${DIAL.size}`} aria-hidden="true">
          <circle className="lt-dial__disc" cx={DIAL.cx} cy={DIAL.cy} r={DIAL.r + 14} />
          <path className="lt-dial__arc" d={arcPath()} />
          <path ref={fillRef} className="lt-dial__fill" d={arcPath()} pathLength={1} />
          <circle ref={moonRef} className="lt-dial__moon" cx={dialPoint(0).x} cy={dialPoint(0).y} r="6.5" />
        </svg>
        <span className="lt-dial__readout">
          <span ref={timeRef} className="lt-dial__time">{formatClock(CHAPTER_CLOCK.hook)}</span>
          <span ref={labelRef} className="lt-dial__label">{LABEL.hook}</span>
        </span>
      </div>
      {CHAPTERS.map((c) => {
        const { x, y } = dialPoint(CHAPTER_POINTS[c.id], DIAL.r + 14);
        return (
          <button
            key={c.id}
            type="button"
            className="lt-dial__notch"
            style={{ left: `${(x / DIAL.size) * 100}%`, top: `${(y / DIAL.size) * 100}%` }}
            aria-label={`${c.label}, ${formatClock(CHAPTER_CLOCK[c.id])}`}
            onClick={() => onGoTo(c.id)}
          />
        );
      })}
    </div>
  );
}

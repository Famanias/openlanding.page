"use client";

import { useEffect, useRef } from "react";
import { STOP_INDEX, type StopId } from "../journey/story";
import { getStoryPosition, subscribeStory } from "../journey/storyScroll";
import { subscribeTruckScreen } from "../journey/telemetry";
import styles from "./presentationStyles";

/** Beats where the truck gets its callout, and what it says. */
const LABELS: Partial<Record<StopId, (p: number) => string>> = {
  prepare: (p) => (p > STOP_INDEX.prepare + 0.08 ? "Dispatched" : "Booked"),
  truck: () => "Dispatched",
  workspace: () => "In transit",
  roles: () => "In transit",
};
const CONNECT: ReadonlySet<StopId> = new Set(["workspace", "roles"]);
const STOP_BY_INDEX = Object.entries(STOP_INDEX).reduce<Record<number, StopId>>((acc, [id, i]) => {
  acc[i] = id as StopId;
  return acc;
}, {});

/**
 * A restrained callout that rides on the 3D truck ("Unit 104 · Booked"),
 * matching the unit in the on-page demos, plus - in the workspace chapter -
 * a line from the highlighted dashboard row to the truck. Positioned from
 * the engine's projected truck point every rendered frame; hidden when the
 * truck is off screen, between beats, or when WebGL isn't running.
 * Decorative: the same facts are in the page content.
 */
export function TruckTag() {
  const tagRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLSpanElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const tag = tagRef.current;
    const status = statusRef.current;
    const line = lineRef.current;
    const svg = svgRef.current;
    if (!tag || !status || !line || !svg) return;
    let stop: StopId | null = null;
    let settled = false;

    const readStory = () => {
      const p = getStoryPosition();
      const i = Math.round(p);
      stop = STOP_BY_INDEX[i] ?? null;
      settled = Math.abs(p - i) < 0.3;
      const label = stop ? LABELS[stop] : undefined;
      if (label) status.textContent = label(p);
    };
    readStory();
    const offStory = subscribeStory(readStory);

    const offScreen = subscribeTruckScreen(({ x, y, visible }) => {
      const show = visible && settled && !!stop && !!LABELS[stop];
      tag.dataset.show = String(show);
      if (show) tag.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      const row = show && stop && CONNECT.has(stop) ? document.querySelector<HTMLElement>('[data-connect="unit-104"]') : null;
      const wide = window.innerWidth > 980;
      if (!row || !wide) {
        svg.dataset.show = "false";
        return;
      }
      const r = row.getBoundingClientRect();
      const x0 = r.right + 8;
      const y0 = r.top + r.height / 2;
      // Stop the line just under the tag.
      const x1 = x;
      const y1 = y + 30;
      const mx = x0 + (x1 - x0) * 0.55;
      line.setAttribute("d", `M ${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`);
      svg.dataset.show = String(x1 > x0 + 40);
    });

    return () => {
      offStory();
      offScreen();
    };
  }, []);

  return (
    <>
      <svg ref={svgRef} className={styles.connector} data-show="false" aria-hidden="true">
        <path ref={lineRef} d="" />
      </svg>
      <div ref={tagRef} className={styles.truckTag} data-show="false" aria-hidden="true">
        <span className={styles.truckTagInner}>
          <span className={styles.truckTagUnit}>Unit 104</span>
          <span ref={statusRef} className={styles.truckTagStatus}>
            Booked
          </span>
        </span>
      </div>
    </>
  );
}

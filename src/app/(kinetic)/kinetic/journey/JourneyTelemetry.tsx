"use client";

import { useEffect, useRef } from "react";
import { stopDistance, tripProgress, type StopId } from "./story";
import styles from "./journeyStyles";
import { subscribeTelemetry } from "./telemetry";

/** Beats along the road between the gate and the dock. */
const TICKS: StopId[] = ["truck", "driver", "paperwork", "workspace", "roles"];

/**
 * Trip readout that lives in the sticky nav: a live status pill (wide
 * screens) and a route line along the nav's bottom edge with the truck
 * riding it. Patched straight from the engine's telemetry store, never
 * through React state. Decorative; the page content carries the story.
 */
export function JourneyTelemetry() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const truckRef = useRef<HTMLSpanElement | null>(null);

  useEffect(
    () =>
      subscribeTelemetry((t) => {
        const root = rootRef.current;
        if (!root) return;
        root.dataset.live = String(t.live);
        root.dataset.arrived = String(t.arrived);
        if (stageRef.current) stageRef.current.textContent = t.stage;
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${t.progress})`;
        if (truckRef.current) truckRef.current.style.left = `${t.progress * 100}%`;
      }),
    [],
  );

  return (
    <div ref={rootRef} className={styles.telemetry} data-live="false" data-arrived="false" aria-hidden="true">
      <div className={styles.pill}>
        <span className={styles.pillDot} />
        <span ref={stageRef} className={styles.pillStage}>
          Chicago DC · Gate 2
        </span>
      </div>
      <div className={styles.routeLine}>
        <span ref={fillRef} className={styles.routeFill} />
        {TICKS.map((id) => (
          <span key={id} className={styles.routeTick} style={{ left: `${tripProgress(stopDistance(id)) * 100}%` }} />
        ))}
        <span ref={truckRef} className={styles.routeTruck}>
          <svg viewBox="0 0 24 14" width="22" height="13" aria-hidden="true">
            <rect x="1" y="2" width="14" height="8" rx="1.2" />
            <path d="M15 4.5h4.2l3 3.2V10H15z" />
            <circle cx="5.5" cy="11.5" r="1.8" />
            <circle cx="18" cy="11.5" r="1.8" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** Live status line on the closing card: in transit until the truck docks. */
export function ArrivalStatus() {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  useEffect(
    () =>
      subscribeTelemetry((t) => {
        const root = rootRef.current;
        if (!root) return;
        root.dataset.live = String(t.live);
        root.dataset.arrived = String(t.arrived);
        if (textRef.current) {
          textRef.current.textContent = t.arrived
            ? "Delivered · Dallas DC · Dock 2"
            : `In transit · ${t.milesToGo.toLocaleString("en-US")} mi to Dallas`;
        }
      }),
    [],
  );
  return (
    <span ref={rootRef} className={styles.arrival} data-live="false" data-arrived="false" aria-hidden="true">
      <span className={styles.arrivalDot} />
      <span ref={textRef}>Load 784932 · Chicago → Dallas</span>
    </span>
  );
}

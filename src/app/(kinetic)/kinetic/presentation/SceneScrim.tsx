"use client";

import { STOPS, type StopId } from "../journey/story";
import styles from "./presentationStyles";
import { useStorySelector } from "./useStory";

type Wash = "left" | "left-wide" | "column-left" | "right-top" | "top";

/** Where each beat keeps its text, so the wash sits behind it. */
const WASH: Record<StopId, Wash> = {
  depart: "left",
  prepare: "left-wide",
  truck: "column-left",
  driver: "right-top",
  paperwork: "column-left",
  workspace: "left-wide",
  roles: "left-wide",
  closeout: "left",
  arrive: "top",
};
const WASHES: readonly Wash[] = ["left", "left-wide", "column-left", "right-top", "top"];

/**
 * One legibility wash for the whole viewport, between the 3D scene and the
 * page. It is fixed rather than living inside each pinned stage, so there is
 * never a hard edge where one section's stage meets the next; it simply
 * cross-fades to the composition of the beat being read.
 */
export function SceneScrim() {
  const wash = useStorySelector((p) => {
    const i = Math.max(0, Math.min(STOPS.length - 1, Math.round(p)));
    return WASH[STOPS[i].id];
  }, "left" as Wash);
  return (
    <div className={styles.sceneScrim} aria-hidden="true">
      {WASHES.map((w) => (
        <div key={w} className={styles.scrim} data-scrim={w} data-on={wash === w} />
      ))}
    </div>
  );
}

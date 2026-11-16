import { clamp } from "./math";

/** top: at the head of the page. pinned: visible while reading or scrolling up. hidden: out of the way going down. */
export type HeaderState = "top" | "pinned" | "hidden";

const TOP_ZONE = 80;
const HIDE_AFTER = 480;
const JITTER = 4;

/** The header's next state from the last and current scroll positions. Small movements keep the current state. */
export function headerState(y: number, lastY: number, current: HeaderState): HeaderState {
  if (y < TOP_ZONE) return "top";
  if (y > lastY + JITTER && y > HIDE_AFTER) return "hidden";
  if (y < lastY - JITTER) return "pinned";
  return current === "top" ? "pinned" : current;
}

/** How far down the page we are, 0..1. A page that cannot scroll is at 0. */
export function pageProgress(y: number, scrollable: number): number {
  if (scrollable <= 0) return 0;
  return clamp(y / scrollable);
}

/** Index of the last section whose top is at or above `line`, or -1 before the first. `tops` are in page order. */
export function activeIndex(tops: readonly number[], line: number): number {
  let index = -1;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] <= line) index = i;
  }
  return index;
}

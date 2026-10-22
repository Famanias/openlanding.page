"use client";

import {
  STOP_INDEX,
  buildStoryMap,
  clamp,
  scrollForStop,
  storyIndexForScroll,
  type ChapterRange,
  type StopId,
  type StoryMap,
} from "./story";

/**
 * The one scroll -> story clock for the landing presentation. It measures
 * the chapter sections (`[data-chapter]` with `data-stops="a,b"` and a
 * `[data-stage]` child), builds the story map, and tracks the current story
 * position. The WebGL engine and the DOM chapters both read it, so the
 * truck, the camera and the on-page beats can never drift apart.
 *
 * Works without WebGL: the chapters still switch beats from it.
 */

type Listener = () => void;

let map: StoryMap = buildStoryMap([]);
let position = 0;
let started = false;
let frame = 0;
const listeners = new Set<Listener>();

function measure() {
  const vh = window.innerHeight;
  const chapters: ChapterRange[] = [];
  document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((section) => {
    const stops = (section.dataset.stops ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter((id): id is StopId => id in STOP_INDEX);
    if (stops.length === 0) return;
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    // In presentation slide mode, each chapter occupies a discrete full slide of height vh
    const start = Math.max(0, top);
    const end = start + Math.max(rect.height, vh);
    chapters.push({ stops, start, end });
  });
  map = buildStoryMap(chapters);
  update();
}

let lastY = 0;
let direction: "down" | "up" = "down";

function update() {
  const y = window.scrollY;
  const dir = y < lastY - 1 ? "up" : y > lastY + 1 ? "down" : direction;
  lastY = y;
  if (dir !== direction) {
    direction = dir;
    // Lets beats enter from above when the reader scrolls back up.
    document.documentElement.dataset.storyDir = dir;
  }
  const next = storyIndexForScroll(map, y);
  const changed = next !== position;
  position = next;
  if (changed) for (const listener of listeners) listener();
}

function schedule(fn: () => void) {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    fn();
  });
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  const remeasure = () => schedule(measure);
  window.addEventListener("scroll", () => schedule(update), { passive: true });
  window.addEventListener("resize", remeasure);
  window.addEventListener("load", remeasure);
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(remeasure).observe(document.body);
  document.fonts?.ready.then(remeasure).catch(() => {});
  measure();
}

export function subscribeStory(listener: Listener): () => void {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Current story position (stop index; fractional between beats). */
export function getStoryPosition(): number {
  start();
  return position;
}

export function getStoryMap(): StoryMap {
  start();
  return map;
}

/** Re-measure now (e.g. after layout-affecting UI changes). */
export function remeasureStory(): void {
  if (started) measure();
}

/** Scroll to the start of a beat's hold, respecting reduced motion. */
export function scrollToStop(id: StopId): boolean {
  start();
  const y = scrollForStop(map, id);
  if (y === null) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // +2px lands safely inside the hold rather than on its boundary.
  window.scrollTo({ top: y + 2, behavior: reduce ? "auto" : "smooth" });
  return true;
}

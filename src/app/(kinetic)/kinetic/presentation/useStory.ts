"use client";

import { useSyncExternalStore } from "react";
import { STOP_INDEX, type StopId } from "../journey/story";
import { getStoryPosition, subscribeStory } from "../journey/storyScroll";

/**
 * Subscribe to a derived value of the story position. Components re-render
 * only when the selected value changes (e.g. the active beat), never per
 * scroll frame.
 */
export function useStorySelector<T extends string | number | boolean>(select: (p: number) => T, serverValue: T): T {
  return useSyncExternalStore(
    subscribeStory,
    () => select(getStoryPosition()),
    () => serverValue,
  );
}

/** Index of the beat (within `stops`) the story is on, switching mid-transition. */
export function useBeat(stops: readonly StopId[]): number {
  const first = STOP_INDEX[stops[0]];
  return useStorySelector((p) => Math.max(0, Math.min(stops.length - 1, Math.floor(p - first + 0.5))), 0);
}

/** True once the story has moved past a beat by `margin` (0..1 of the transition). */
export function useStoryPast(stop: StopId, margin = 0.04): boolean {
  const i = STOP_INDEX[stop];
  return useStorySelector((p) => p > i + margin, false);
}

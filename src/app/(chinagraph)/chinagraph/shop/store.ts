"use client";

import { useSyncExternalStore } from "react";
import { EMPTY_BAG, bagReducer, type Bag, type BagAction } from "./bag";

/** One in-memory bag shared by the product cards and the header. A template: nothing persists or posts. */
let bag: Bag = EMPTY_BAG;
const listeners = new Set<() => void>();
let lastAdded: { sku: string; size: string; at: number } | null = null;

export function dispatchBag(action: BagAction) {
  bag = bagReducer(bag, action);
  if (action.type === "add") lastAdded = { sku: action.sku, size: action.size, at: Date.now() };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useBag(): Bag {
  return useSyncExternalStore(subscribe, () => bag, () => EMPTY_BAG);
}

export function useLastAdded() {
  return useSyncExternalStore(subscribe, () => lastAdded, () => null);
}

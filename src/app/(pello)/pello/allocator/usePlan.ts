"use client";
import { useSyncExternalStore } from "react";
import { readPlan, signupHref, type PlanId } from "./model";
const subscribe = (notify: () => void) => {
  window.addEventListener("popstate", notify); window.addEventListener("pel-plan", notify);
  return () => { window.removeEventListener("popstate", notify); window.removeEventListener("pel-plan", notify); };
};
export function usePlan() {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  return readPlan(new URLSearchParams(search));
}
export function setPlan(plan: PlanId, goal: number) {
  const href = signupHref(plan, goal).replace("#begin", window.location.hash);
  history.replaceState(null, "", href);
  window.dispatchEvent(new Event("pel-plan"));
}

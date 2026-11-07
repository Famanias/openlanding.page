"use client";

import {useSyncExternalStore} from "react";

const query="(prefers-reduced-motion: reduce)";
const subscribe=(notify:()=>void)=>{
  const media=window.matchMedia(query);
  media.addEventListener("change",notify);
  return()=>media.removeEventListener("change",notify);
};
const clientSnapshot=()=>window.matchMedia(query).matches;
const serverSnapshot=()=>false;

/** Keep SSR and the first hydrated frame identical, then apply the user's preference. */
export function useReducedMotion(){
  return useSyncExternalStore(subscribe,clientSnapshot,serverSnapshot);
}

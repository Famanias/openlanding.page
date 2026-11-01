'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (changed: () => void) => {
  const preference = matchMedia(query);
  preference.addEventListener('change', changed);
  return () => preference.removeEventListener('change', changed);
};
const snapshot = () => matchMedia(query).matches;
const serverSnapshot = () => true;

/** Unlike Motion's mount-time snapshot, this also settles active window motion live. */
export function useLiveReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

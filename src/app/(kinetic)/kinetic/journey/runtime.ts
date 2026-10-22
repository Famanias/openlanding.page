/**
 * `?journey=off` turns the 3D scene off. Lighthouse CI loads the landing page this way: its headless browser
 * has no GPU, so the scene would render in software and swamp every lab metric. Visitors keep the painted
 * fallback, exactly as in reduced-motion mode.
 */
export function isJourneyDisabledByUrl(search: string): boolean {
  return new URLSearchParams(search).get("journey") === "off";
}

export function shouldStartJourney({
  reducedMotion,
  visibilityState,
  webgl2,
  search = "",
}: {
  reducedMotion: boolean;
  visibilityState: DocumentVisibilityState;
  webgl2: boolean;
  search?: string;
}): boolean {
  return !reducedMotion && visibilityState === "visible" && webgl2 && !isJourneyDisabledByUrl(search);
}

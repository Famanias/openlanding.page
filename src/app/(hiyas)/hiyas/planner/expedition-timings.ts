export type DayRange = readonly [minimum: number, maximum: number];

type ExpeditionTiming = {
  expedition: DayRange;
  summitPush: DayRange;
  sources: readonly string[];
};

// Typical, conventional itineraries, not pre-acclimatized fast-track programs.
// Totals include approach, acclimatization, weather allowance and return.
// Summit push means the final base-camp-to-summit-and-return rotation and is
// INCLUDED in the total. These are rounded planning estimates, not guarantees.
// Totals are informed by the operator itineraries linked below. Summit-rotation
// ranges are estimates inferred from camp sequences, not quoted operator dates.
// Everest follows the user's supplied 50–60 / 4–6 day example.
// Reference notes and methodology: expedition-timings.md. Checked 2026-10-24.
export const EXPEDITION_TIMINGS: Record<string, ExpeditionTiming> = {
  everest: {
    expedition: [50, 60], summitPush: [4, 6],
    sources: ["https://adventureconsultants.com/expeditions/seven-summits/everest"],
  },
  k2: {
    expedition: [45, 55], summitPush: [5, 7],
    sources: ["https://www.eliteexped.com/k2"],
  },
  kangchenjunga: {
    expedition: [50, 60], summitPush: [5, 7],
    sources: ["https://www.nepalhimalayanhiker.com/expeditions/kanchenjunga-expedition", "https://www.adventurepeaksnepal.com/kangchenjunga-expedition"],
  },
  lhotse: {
    expedition: [50, 60], summitPush: [4, 6],
    sources: ["https://adventureconsultants.com/files/Trip-Notes-Himalaya/Lhotse-2026-Trip-Notes.pdf"],
  },
  makalu: {
    expedition: [45, 55], summitPush: [5, 7],
    sources: ["https://www.nepalhimalayanhiker.com/expeditions/makalu-expedition"],
  },
  "cho-oyu": {
    expedition: [30, 40], summitPush: [3, 5],
    sources: ["https://adventureconsultants.com/expeditions/8000m-peaks/cho-oyu", "https://adventureconsultants.com/files/Trip-Notes-Himalaya/Cho-Oyu-2026-Trip-Notes.pdf"],
  },
  dhaulagiri: {
    expedition: [40, 50], summitPush: [4, 6],
    sources: ["https://www.sevensummittreks.com/page/mt-dhaulagiri-expedition-8167m.html"],
  },
  manaslu: {
    expedition: [35, 45], summitPush: [4, 6],
    sources: ["https://adventureconsultants.com/files/Trip-Notes-Himalaya/Manaslu-Expedition-Trip-Notes.pdf", "https://www.eliteexped.com/manaslu"],
  },
  "nanga-parbat": {
    expedition: [40, 50], summitPush: [5, 7],
    sources: ["https://www.eliteexped.com/nanga-parbat"],
  },
  annapurna: {
    expedition: [40, 50], summitPush: [4, 6],
    sources: ["https://sherpalaya.com/en/expeditions/11", "https://trekheaven.com/treks/annapurna-i"],
  },
  "gasherbrum-i": {
    expedition: [40, 50], summitPush: [4, 6],
    sources: ["https://www.hunzaadventuretours.com.pk/expeditions/gasherbrum-i-peak-expedition/"],
  },
  "broad-peak": {
    expedition: [45, 55], summitPush: [4, 6],
    sources: ["https://8kexpeditions.com/package/broad-peak-expedition-8051m", "https://www.satoriadventuresnepal.com/trip/broad-peak-expedition"],
  },
  "gasherbrum-ii": {
    expedition: [45, 55], summitPush: [4, 6],
    sources: ["https://embed-rech-01.dialog.cm/adventureconsultants/docs/gasherbrum_ii_expedition", "https://karakoramholidays.com/ghaerbrum-ii/"],
  },
  shishapangma: {
    expedition: [30, 40], summitPush: [3, 5],
    sources: ["https://wildyakexpeditions.com/trips/shishapangma-expedition/"],
  },
};

export function expeditionTiming(peakId: string): ExpeditionTiming {
  return Object.hasOwn(EXPEDITION_TIMINGS, peakId) ? EXPEDITION_TIMINGS[peakId] : EXPEDITION_TIMINGS.everest;
}

export function formatDayRange([minimum, maximum]: DayRange): string {
  return `${minimum}–${maximum} days`;
}

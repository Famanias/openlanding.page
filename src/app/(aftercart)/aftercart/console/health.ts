export const TRACKS = [
  {
    id: "conversion",
    label: "Conversion",
    shortLabel: "Convert",
    score: 78,
    status: "Needs a closer look",
    detail: "Remove the quiet friction between a good product page and a confident checkout.",
    ticket: "Make the next add-to-cart feel obvious.",
    signal: "Journey",
  },
  {
    id: "merchandising",
    label: "Merchandising",
    shortLabel: "Merch",
    score: 72,
    status: "Room to arrange",
    detail: "Bring the right products forward with collections, bundles, and a cleaner shop rhythm.",
    ticket: "Give best sellers a better place to land.",
    signal: "Shelf",
  },
  {
    id: "speed",
    label: "Speed",
    shortLabel: "Speed",
    score: 86,
    status: "Ready to tune",
    detail: "Trim the path from first tap to paid order without losing the character of the shop.",
    ticket: "Trim the path from first tap to paid order.",
    signal: "Load",
  },
  {
    id: "retention",
    label: "Retention",
    shortLabel: "Return",
    score: 64,
    status: "Waiting for a rhythm",
    detail: "Turn the first order into a reason to come back with useful post-purchase moments.",
    ticket: "Make the second order easier to imagine.",
    signal: "Return",
  },
] as const;

export type TrackId = (typeof TRACKS)[number]["id"];

export type HealthState = {
  active: TrackId;
};

export const INITIAL_HEALTH: HealthState = { active: "conversion" };

export function selectTrack(state: HealthState, id: TrackId): HealthState {
  if (!TRACKS.some((track) => track.id === id)) return state;
  return state.active === id ? state : { active: id };
}

export function getTrack(id: TrackId) {
  return TRACKS.find((track) => track.id === id) ?? TRACKS[0];
}

export function getHealthSnapshot(state: HealthState) {
  const track = getTrack(state.active);
  return {
    score: track.score,
    label: track.status,
    progress: track.score / 100,
    ticket: track.ticket,
    detail: track.detail,
    signal: track.signal,
    active: track.id,
  };
}

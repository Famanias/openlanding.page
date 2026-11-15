/**
 * The walk in: the page's central mechanic. The trail is 1,900 m from the road's end to the cabin door,
 * and scroll position maps onto metres walked through the real offsets of the waypoint posts.
 */

export const TRAIL_LENGTH = 1900;
export const WALK_MINUTES = 35;
export const ELEVATION_GAIN = 212;

export type Bars = 0 | 1 | 2 | 3 | 4;

export type Waypoint = {
  id: string;
  /** Metres walked from the road's end. */
  metres: number;
  /** Metres above sea level. */
  elevation: number;
  name: string;
  note: string;
  detail: string;
};

export const WAYPOINTS: Waypoint[] = [
  {
    id: "roads-end",
    metres: 0,
    elevation: 400,
    name: "Road's end",
    note: "Park under the split cedar and send the last message. The valley is in front of you and the cabin is the one warm rectangle in it.",
    detail: "Gravel pull-in, room for two cars",
  },
  {
    id: "cedar-gate",
    metres: 420,
    elevation: 448,
    name: "The cedar gate",
    note: "Two cedars grown into each other over the path. Walk between them and the phone stops asking for things.",
    detail: "First painted blaze",
  },
  {
    id: "plank-bridge",
    metres: 880,
    elevation: 497,
    name: "The plank bridge",
    note: "Eleven planks over the Hollin Fork. The water is loud enough that you stop hearing the road.",
    detail: "Fill your bottle here",
  },
  {
    id: "stone-steps",
    metres: 1340,
    elevation: 561,
    name: "The stone steps",
    note: "Sixty-four slabs laid by hand in 2019. They are slick after rain, which is most days. Take them slowly.",
    detail: "64 steps, 51 m of climb",
  },
  {
    id: "the-door",
    metres: 1900,
    elevation: 612,
    name: "The door",
    note: "The key is in the lockbox under the eave. The stove is laid and the light is already on.",
    detail: "Lockbox code arrives the morning you leave",
  },
];

/** Where each bar of signal is lost, in metres walked. Past the plank bridge there is none. */
const SIGNAL_STEPS: { from: number; bars: Bars }[] = [
  { from: 880, bars: 0 },
  { from: 650, bars: 1 },
  { from: 420, bars: 2 },
  { from: 190, bars: 3 },
  { from: 0, bars: 4 },
];

export function signalBars(metres: number): Bars {
  return (SIGNAL_STEPS.find((step) => metres >= step.from) ?? SIGNAL_STEPS[SIGNAL_STEPS.length - 1]).bars;
}

export function signalLabel(bars: Bars): string {
  if (bars === 0) return "No service";
  return bars === 1 ? "1 bar" : `${bars} bars`;
}

/** A scroll offset paired with the metres walked when the page is scrolled to it. */
export type Anchor = { y: number; metres: number };

/**
 * Metres walked at a scroll offset: piecewise-linear between anchors, flat before the first and after the last.
 * Anchors come from the waypoint posts' measured positions, so the readout matches the post beside it.
 */
export function metresAt(scrollY: number, anchors: Anchor[]): number {
  if (anchors.length === 0) return 0;
  const sorted = [...anchors].sort((a, b) => a.y - b.y);
  if (scrollY <= sorted[0].y) return sorted[0].metres;
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const next = sorted[i];
    if (scrollY <= next.y) {
      const span = next.y - prev.y;
      if (span <= 0) return next.metres;
      return prev.metres + ((scrollY - prev.y) / span) * (next.metres - prev.metres);
    }
  }
  return sorted[sorted.length - 1].metres;
}

/** Metres still to walk, rounded to the nearest ten so the readout ticks rather than flickers. */
export function metresToDoor(walked: number): number {
  const left = Math.max(0, TRAIL_LENGTH - walked);
  return Math.min(TRAIL_LENGTH, Math.round(left / 10) * 10);
}

export function formatMetres(metres: number): string {
  return `${Math.round(metres).toLocaleString("en-US")} m`;
}

/** The header readout's wording for a distance still to walk. */
export function readoutLabel(toDoor: number): string {
  return toDoor <= 0 ? "At the door" : `${formatMetres(toDoor)} to the door`;
}

/** How many waypoints have been passed, counting the one you are standing on. */
export function reachedCount(walked: number): number {
  return WAYPOINTS.filter((waypoint) => walked >= waypoint.metres - 1).length;
}

/** Fraction of the trail walked, 0..1. */
export function trailProgress(walked: number): number {
  return Math.min(1, Math.max(0, walked / TRAIL_LENGTH));
}

/** Minutes on foot to a point on the trail at an even pace. */
export function minutesTo(metres: number): number {
  return Math.round(trailProgress(metres) * WALK_MINUTES);
}

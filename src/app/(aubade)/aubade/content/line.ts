/** The Paris → Venezia line: stations along the night, and the five legs that take over the window. */

export type Station = {
  name: string;
  short: string;
  /** Position along The Line section, 0–1. */
  at: number;
  /** Scheduled time, "HH:MM". */
  time: string;
  km: number;
};

export type SceneId = "dusk" | "forest" | "tunnel" | "lake" | "dawn";

export type Leg = {
  id: SceneId;
  title: string;
  from: string;
  to: string;
  start: number;
  end: number;
  /** The scheduled time at the start of the leg. */
  time: string;
  note: string;
};

export const STATIONS: Station[] = [
  { name: "Paris-Gare de Lyon", short: "Paris", at: 0, time: "19:12", km: 0 },
  { name: "Dijon-Ville", short: "Dijon", at: 0.2, time: "20:51", km: 315 },
  { name: "Vallorbe", short: "Vallorbe", at: 0.33, time: "23:04", km: 505 },
  { name: "Brig", short: "Brig", at: 0.42, time: "01:28", km: 715 },
  { name: "Domodossola", short: "Domodossola", at: 0.56, time: "01:58", km: 757 },
  { name: "Stresa", short: "Stresa", at: 0.64, time: "03:15", km: 797 },
  { name: "Verona Porta Nuova", short: "Verona", at: 0.78, time: "06:22", km: 1003 },
  { name: "Venezia Santa Lucia", short: "Venezia", at: 1, time: "09:48", km: 1128 },
];

export const LEGS: Leg[] = [
  {
    id: "dusk",
    title: "Dusk over Burgundy",
    from: "Paris",
    to: "Dijon",
    start: 0,
    end: 0.2,
    time: "19:12",
    note: "The first seating sits down as the vineyards turn claret. Your cabin is made up before Dijon.",
  },
  {
    id: "forest",
    title: "The Jura, asleep",
    from: "Dijon",
    to: "Brig",
    start: 0.2,
    end: 0.42,
    time: "20:51",
    note: "Fir forest and frontier. The border is crossed at Vallorbe at 23:04 without anyone knocking on your door.",
  },
  {
    id: "tunnel",
    title: "The Simplon",
    from: "Brig",
    to: "Domodossola",
    start: 0.42,
    end: 0.56,
    time: "01:28",
    note: "19.8 km under the Alps. For eleven minutes the window becomes a mirror, and you are very probably asleep.",
  },
  {
    id: "lake",
    title: "Lago Maggiore by moon",
    from: "Domodossola",
    to: "Verona",
    start: 0.56,
    end: 0.78,
    time: "01:58",
    note: "Stresa at 03:15, the lake holding the moon. We idle at Verona so that you don't arrive before you wake.",
  },
  {
    id: "dawn",
    title: "Dawn on the lagoon",
    from: "Verona",
    to: "Venezia",
    start: 0.78,
    end: 1,
    time: "06:22",
    note: "The bell at 08:15, breakfast in the cabin at Padova, and the causeway across the water at 09:40.",
  },
];

export const ROUTE = {
  departs: "19:12",
  arrives: "09:48",
  km: 1128,
  carriages: 9,
  cabins: 38,
  days: "Thursdays & Sundays",
} as const;

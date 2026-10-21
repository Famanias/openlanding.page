export type ReleaseStatus = "sold-out" | "in-stock" | "pressing";

export type Release = {
  no: number;
  artist: string;
  title: string;
  year: number;
  edition: number;
  status: ReleaseStatus;
  /** What the print zine for this record is about, in one line. */
  zine: string;
};

/** The label's records, oldest first. Issue 07 of the magazine is WF-007. */
export const RELEASES: readonly Release[] = [
  { no: 1, artist: "Dunmore & Ash", title: "Quiet Hours", year: 2019, edition: 300, status: "sold-out", zine: "A field guide to 4 a.m. kitchens" },
  { no: 2, artist: "Tamsin Wick", title: "Fourth Floor Piano", year: 2021, edition: 300, status: "sold-out", zine: "Pianos that came up in lifts" },
  { no: 3, artist: "Ines Haverford", title: "Rooms with the Heating On", year: 2022, edition: 500, status: "in-stock", zine: "Twelve rooms, each with a radiator" },
  { no: 4, artist: "Penny Lowe Trio", title: "Slow Trains to Somewhere", year: 2023, edition: 500, status: "in-stock", zine: "Timetables, annotated" },
  { no: 5, artist: "Okafor & Reeve", title: "Paper Walls", year: 2024, edition: 500, status: "in-stock", zine: "A lodger's guide to thin partitions" },
  { no: 6, artist: "Kit Aldous", title: "Tape Hymns", year: 2025, edition: 500, status: "in-stock", zine: "Cassettes found in coat pockets" },
  { no: 7, artist: "Marl Quartet", title: "Low Ceilings", year: 2026, edition: 500, status: "in-stock", zine: "The sound of rooms" },
  { no: 8, artist: "Penny Lowe Trio", title: "Night Bus Lullabies", year: 2027, edition: 500, status: "pressing", zine: "Routes after midnight" },
];

/** WF-007 style catalogue number. */
export function formatCatNo(no: number): string {
  return `WF-${String(no).padStart(3, "0")}`;
}

/** Side A is the first four records, Side B the next four. */
export function releasesOnSide(side: "a" | "b"): Release[] {
  return RELEASES.filter((r) => (side === "a" ? r.no <= 4 : r.no > 4));
}

export const STATUS_LABEL: Record<ReleaseStatus, string> = {
  "sold-out": "Sold out",
  "in-stock": "In stock",
  pressing: "At the plant",
};

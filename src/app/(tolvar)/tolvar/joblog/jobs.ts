import type { KindId } from "../work/services";

/** The job log also carries finish carpentry: what gets built on the ground once it is right. */
export type JobKind = KindId | "built";
export type JobFilter = JobKind | "all";

export type Job = {
  no: number;
  title: string;
  kind: JobKind;
  /** One line from the ticket: what was moved, set or built. */
  note: string;
  assetKey: string;
  alt: string;
};

export const FILTERS: { id: JobFilter; label: string }[] = [
  { id: "all", label: "All jobs" },
  { id: "cut", label: "Cut" },
  { id: "fill", label: "Fill" },
  { id: "pipe", label: "Pipe" },
  { id: "haul", label: "Haul" },
  { id: "built", label: "Built on it" },
];

export const JOBS: Job[] = [
  { no: 212, title: "Two-acre farm pond", kind: "cut", note: "9,400 yards cut, dam keyed four feet into clay.", assetKey: "log-pond-1", alt: "A finished farm pond with a small dock, mown banks and a cornfield behind it" },
  { no: 209, title: "Storm chambers, clinic lot", kind: "pipe", note: "64 chambers on washed rock, two structures.", assetKey: "pipe-chambers-2", alt: "Rows of orange storm-water chambers beside a round concrete structure in a lined trench" },
  { no: 204, title: "Ledge-stone wall and stairs", kind: "fill", note: "80 feet of quarried ledge stone set on a compacted base.", assetKey: "log-ledge-wall", alt: "A dry-stacked ledge-stone retaining wall below a wooden stair on a wooded slope" },
  { no: 201, title: "Culvert headwall", kind: "pipe", note: "24-inch culvert under a township road, stone headwall.", assetKey: "pipe-headwall", alt: "A stacked-stone headwall around a steel culvert pipe draining under a rural road" },
  { no: 198, title: "Pond with a waterfall", kind: "cut", note: "Recirculating fall, 14 tons of weathered fieldstone.", assetKey: "log-waterfall", alt: "A small stone waterfall spilling into a new pond in a shaded yard" },
  { no: 195, title: "Timber pavilion pad", kind: "built", note: "Pad cut and poured, then the timber frame went up on it.", assetKey: "log-pavilion", alt: "An open timber-frame pavilion with a metal roof on a concrete and gravel pad" },
  { no: 191, title: "Detention basin, north bank", kind: "cut", note: "3,100 yards out, slopes cut at three to one.", assetKey: "cut-pond", alt: "A freshly cut basin with bare earth slopes behind a row of young pines" },
  { no: 188, title: "Hillside deck and stair", kind: "built", note: "Piers dug by hand on a 30-degree slope.", assetKey: "log-stairs", alt: "A raised wooden deck with a long stair on a steep wooded hillside" },
  { no: 184, title: "Lakeside fire ring", kind: "fill", note: "Gravel path and boulder seating ring, graded to drain.", assetKey: "log-firepit", alt: "A gravel path leading to a stone fire ring and deck surrounded by trees" },
  { no: 181, title: "Chamber field, phase two", kind: "pipe", note: "Header pipe and inspection ports tied to phase one.", assetKey: "pipe-chambers-3", alt: "A long row of orange storm chambers on crushed rock inside a fabric-lined excavation" },
  { no: 177, title: "Pond reshape", kind: "fill", note: "Banks pulled back and regraded after a wet spring.", assetKey: "fill-shaping", alt: "A dozer shaping the dark earth slope of a pond site between trees" },
  { no: 173, title: "Retaining wall, shop yard", kind: "fill", note: "110 feet of block wall, drain tile behind it.", assetKey: "fill-wall", alt: "A low curved block retaining wall above a newly graded dirt yard" },
  { no: 169, title: "Cedar deck with benches", kind: "built", note: "Built on piers we dug the week before.", assetKey: "log-deck-2", alt: "A new cedar deck with built-in bench seating along the rail" },
  { no: 166, title: "Driveway through the woods", kind: "haul", note: "410 tons of class 5 hauled in and spread.", assetKey: "fill-drive", alt: "A new gravel driveway forking through green woods" },
  { no: 162, title: "Road-edge riprap", kind: "haul", note: "Riprap hauled and placed along a washed-out shoulder.", assetKey: "log-riprap", alt: "A pile of large white riprap stone beside a cracked road with a traffic cone" },
  { no: 158, title: "Field pond", kind: "cut", note: "Half-acre stock pond, overflow pipe set to grade.", assetKey: "log-pond-2", alt: "A quiet pond in a pasture with trees and farm buildings in the distance" },
  { no: 155, title: "Culvert and ledge wall", kind: "pipe", note: "Driveway culvert faced in dry-stacked ledge stone.", assetKey: "pipe-culvert", alt: "A dry-stacked stone wall around a culvert pipe at the foot of a wooded bank" },
  { no: 151, title: "Bridge abutments", kind: "built", note: "Abutments dug and set for a steel trail bridge.", assetKey: "log-bridge", alt: "An excavator beside a rust-red steel truss bridge on a gravel trail" },
  { no: 147, title: "New pond, first water", kind: "cut", note: "Dug in August, full by October.", assetKey: "log-pond-3", alt: "A newly dug pond half full of water with a raw clay bank on the far side" },
  { no: 143, title: "Pole-building posts", kind: "built", note: "Post holes drilled into ledge rock for a hillside frame.", assetKey: "log-framing", alt: "Braced wooden posts standing in a rocky cut on a wooded hillside" },
  { no: 139, title: "Cedar deck", kind: "built", note: "Fresh cedar on a frame set over graded gravel.", assetKey: "log-deck-1", alt: "A freshly built cedar deck with a bench rail and a pickup parked behind it" },
  { no: 134, title: "Pond dig, day three", kind: "cut", note: "Dozer shaping the bowl before the clay liner.", assetKey: "log-pond-4", alt: "A dozer working in a wide dark earth bowl cut into a green field" },
];

export function filterJobs(jobs: readonly Job[], filter: JobFilter): Job[] {
  return filter === "all" ? [...jobs] : jobs.filter((job) => job.kind === filter);
}

export function countByFilter(jobs: readonly Job[], filter: JobFilter): number {
  return filterJobs(jobs, filter).length;
}

/** Steps through a list and wraps at both ends, for the photo viewer. An empty list stays at 0. */
export function stepIndex(index: number, delta: number, length: number): number {
  if (length <= 0) return 0;
  return (((index + delta) % length) + length) % length;
}

/** "JOB 0212": the way it is written on a ticket. */
export function jobLabel(no: number): string {
  return `Job ${String(no).padStart(4, "0")}`;
}

/** The count line under the filters, also announced to screen readers. */
export function countLabel(shown: number, total: number): string {
  if (shown === total) return `All ${total} jobs`;
  return `${shown} of ${total} jobs`;
}

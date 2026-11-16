/** Every job is dirt going somewhere. The four moves sort the services, the job log and the estimate form. */
export type KindId = "cut" | "fill" | "pipe" | "haul";

export type Service = { name: string; line: string };

export type Kind = {
  id: KindId;
  label: string;
  /** What the dirt does. */
  move: string;
  verb: string;
  blurb: string;
  assetKey: string;
  alt: string;
  caption: string;
  services: Service[];
};

export const KINDS: Kind[] = [
  {
    id: "cut",
    label: "Cut",
    move: "Dirt comes out",
    verb: "Dig it out.",
    blurb: "Anything below grade starts here. We dig to the stakes, square and to depth, and leave a hole you can form in without re-digging it.",
    assetKey: "cut-excavator",
    alt: "A yellow excavator on the horizon above a field of freshly cut red clay",
    caption: "Stripping a pad site down to clay",
    services: [
      { name: "Basements", line: "Dug square and to depth, with room to form and a ramp out." },
      { name: "Footers", line: "Trenched below frost, which up here means five feet." },
      { name: "Piers", line: "Dug or drilled for decks, pole barns and bridge abutments." },
      { name: "Ponds & Waterfalls", line: "Shaped, keyed and sealed. Rock falls set one stone at a time." },
      { name: "Demolition", line: "Houses, barns and slabs taken down, sorted and loaded out." },
      { name: "Clearing", line: "Trees, stumps and brush gone before the first cut." },
    ],
  },
  {
    id: "fill",
    label: "Fill",
    move: "Dirt goes down",
    verb: "Build it up.",
    blurb: "Fill only works if it stays put. We place it in lifts, pack every one, and check the finish with a laser instead of an eyeball.",
    assetKey: "fill-dozer",
    alt: "A yellow dozer with its blade down in a wide stubble field under an overcast sky",
    caption: "Rough grading eleven acres",
    services: [
      { name: "Building Pads", line: "Built in lifts and compacted, so the slab stays where you poured it." },
      { name: "Terraces", line: "Farm terraces and benches that slow water down a hill." },
      { name: "Yard Grades", line: "Water runs away from the house. That is the whole job." },
      { name: "Top Soil", line: "Screened black dirt, delivered and spread to seed-ready." },
      { name: "Rock Walls", line: "Boulder and ledge-stone walls that actually hold a bank." },
      { name: "Excavating & Grading", line: "Rough grade through finish grade, to the tenth of a foot." },
    ],
  },
  {
    id: "pipe",
    label: "Pipe",
    move: "Dirt gets out of the way",
    verb: "Lay it in.",
    blurb: "Trench, bed, lay, backfill, compact. Every line is located before the bucket touches the ground and tested before it is buried.",
    assetKey: "pipe-chambers-1",
    alt: "Orange storm-water chambers joined by black corrugated pipe to a concrete structure in an open trench",
    caption: "Storm chambers under a parking lot",
    services: [
      { name: "Water Lines", line: "New services, repairs and replacements, bedded below frost." },
      { name: "Storm Drains", line: "Chambers, structures and pipe set to grade." },
      { name: "Underground Utilities", line: "Trenching and conduit for power, gas and communications." },
      { name: "Drainage Improvements", line: "Culverts, swales, tile and headwalls for ground that holds water." },
    ],
  },
  {
    id: "haul",
    label: "Haul",
    move: "Dirt leaves, or arrives",
    verb: "Truck it.",
    blurb: "Three tandems and a lowboy, all ours. Spoil goes out, rock and black dirt come in, and the iron gets to your job without a rental invoice.",
    assetKey: "haul-dump",
    alt: "A silver tandem dump truck with its bed raised, tipping a load of red fill beside a gravel road",
    caption: "Fill delivered to a driveway job",
    services: [
      { name: "Hauling", line: "Dirt, rock, gravel and spoil, in or out." },
      { name: "Trucking Services", line: "Tandems by the load or by the hour, with a driver." },
      { name: "Dirt Work", line: "The catch-all. If it is dirt and it is in the wrong place, call." },
      { name: "Concrete", line: "Flatwork, pads and footings poured on the grade we built." },
    ],
  },
];

export const KIND_IDS: KindId[] = KINDS.map((kind) => kind.id);

export function kindById(id: KindId): Kind {
  const kind = KINDS.find((item) => item.id === id);
  if (!kind) throw new Error(`unknown kind: ${id}`);
  return kind;
}

export function serviceCount(): number {
  return KINDS.reduce((total, kind) => total + kind.services.length, 0);
}

/** Every service name in page order, for the ticker. */
export function allServiceNames(): string[] {
  return KINDS.flatMap((kind) => kind.services.map((service) => service.name));
}

/** Two digits, the way a spec sheet numbers its rows. */
export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Keyboard handling for the tab list. Returns the tab to move to, or null when the key is not ours.
 * Arrow keys wrap; Home and End jump to the ends.
 */
export function nextTab(current: number, key: string, count: number): number | null {
  if (count <= 0) return null;
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

/** Where a panel sits relative to the open one: the blade pushes old panels out to the left. */
export function panelState(index: number, active: number): "active" | "before" | "after" {
  if (index === active) return "active";
  return index < active ? "before" : "after";
}

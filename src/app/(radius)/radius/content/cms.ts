import type { Finish } from "../configurator/logic";

export type NoteCategory = "routes" | "craft" | "care";

export type FieldNote = {
  slug: string;
  number: string;
  title: string;
  category: NoteCategory;
  readTime: string;
  dateLabel: string;
  routeTag: string;
  assetKey: string;
  alt: string;
  excerpt: string;
  pullQuote: string;
  body: string[];
  takeaways: string[];
};

export type KitPreset = {
  id: string;
  code: string;
  name: string;
  summary: string;
  parts: string[];
  assetKey: string;
  alt: string;
};

export type WorkshopItem = {
  id: string;
  city: string;
  district: string;
  focus: string;
  bay: string;
};

export const FINISH_PROFILES: Record<
  Finish,
  { label: string; code: string; assetKey: string; alt: string; surfaceNote: string; contrastAccent: string }
> = {
  graphite: {
    label: "Graphite",
    code: "RD-01 · DARK SATIN",
    assetKey: "02-bike-side-graphite-alpha",
    alt: "Side view of the RADIUS bicycle in Graphite finish",
    surfaceNote: "Low-glare slate tone designed to blend with wet asphalt and concrete viaducts.",
    contrastAccent: "Tangerine cable & dropout highlights",
  },
  tangerine: {
    label: "Tangerine",
    code: "RD-02 · SIGNAL COAT",
    assetKey: "03-bike-side-tangerine-alpha",
    alt: "Side view of the RADIUS bicycle in Tangerine finish",
    surfaceNote: "High-visibility industrial coat built for overcast crossings and shoulder traffic.",
    contrastAccent: "Graphite hardware & charcoal rims",
  },
  cream: {
    label: "Cream",
    code: "RD-03 · CHALK ENAMEL",
    assetKey: "04-bike-side-cream-alpha",
    alt: "Side view of the RADIUS bicycle in Cream finish",
    surfaceNote: "Warm architectural mineral shade that picks up late-afternoon light cleanly.",
    contrastAccent: "Gunmetal saddle, stem & fork crown",
  },
};

export const KIT_PRESETS: KitPreset[] = [
  {
    id: "commute",
    code: "KIT / 01",
    name: "Weekday Commute",
    summary: "Rear luggage deck paired with permanent front and tail illumination for early starts.",
    parts: ["Rear rack", "Integrated lights", "City compound tires"],
    assetKey: "05-rack-alpha",
    alt: "Standalone rear rack accessory for the RADIUS bicycle",
  },
  {
    id: "market",
    code: "KIT / 02",
    name: "Market Carry",
    summary: "Open-top front basket balanced over the head tube so parcels ride in sight.",
    parts: ["Front basket", "Rear rack", "All-season tread"],
    assetKey: "06-basket-alpha",
    alt: "Standalone front basket accessory for the RADIUS bicycle",
  },
  {
    id: "nightfall",
    code: "KIT / 03",
    name: "Evening Route",
    summary: "Focused optic beam and clean wire routing built for unlit park connectors.",
    parts: ["Integrated lights", "Gravel tread option", "Reflective rim stripe"],
    assetKey: "07-lights-alpha",
    alt: "Standalone front and rear lighting hardware for the RADIUS bicycle",
  },
];

export const WORKSHOPS: WorkshopItem[] = [
  { id: "north-bay", city: "Northside Cycle Works", district: "Docklands", focus: "Posture fitting & brake bleed checks", bay: "Bay 01 · Walk-in friendly" },
  { id: "canal-hub", city: "Canal Street Bench", district: "Old Foundry", focus: "Wheel trueing & gravel tire seating", bay: "Bay 02 · Service partner" },
  { id: "south-arch", city: "Archway Velo Lab", district: "Midtown East", focus: "Rack / basket mounting & lighting inspection", bay: "Bay 03 · Fit studio" },
];

export const PRE_RIDE_CHECKS = [
  { id: "tires", label: "Tire pressure & sidewall condition", note: "Confirm both beads sit evenly and tread is clear of glass." },
  { id: "brakes", label: "Lever feel & caliper alignment", note: "Both levers should bite cleanly before touching the grips." },
  { id: "lights", label: "Front & rear beam check", note: "Verify lens cleanliness and steady mounting alignment." },
  { id: "fasteners", label: "Stem, axle & seatpost bolts", note: "Confirm zero play when rocking the front wheel gently." },
  { id: "reach", label: "Cockpit posture & knee clearance", note: "Elbows slightly relaxed when hands rest naturally on bars." },
  { id: "cargo", label: "Rack & basket latch tension", note: "Shake mounted bags lightly before rolling onto brick or cobble." },
] as const;

export const FIELD_NOTES: FieldNote[] = [
  {
    slug: "crossing-the-cut-line",
    number: "NOTE / 01",
    title: "Crossing the Cut Line on Brick and Fresh Asphalt",
    category: "routes",
    readTime: "4 min read",
    dateLabel: "AUTUMN LOG",
    routeTag: "STREET GRID -> CANAL PATH",
    assetKey: "08-street-rider",
    alt: "A helmeted rider crossing a city street on an electric bicycle",
    excerpt: "Why an upright bar sweep changes how quickly you spot delivery vans and wet tram rails at intersections.",
    pullQuote: "The best commuter geometry disappears two blocks after you clip a bag onto the rack.",
    body: [
      "Side streets rarely transition neatly. Within three hundred meters you roll off brushed concrete onto settled pavers, dodge a steel road plate, and climb an off-camber curb cut.",
      "Setting the head angle and stem reach around neutral eye height keeps peripheral vision open without forcing weight onto your wrists on rough blocks.",
      "Pair the chassis with an unhurried tire volume and the bike tracks predictably across painted markings and damp iron grates alike.",
    ],
    takeaways: [
      "Test upright reach around tight turns before adjusting stem spacers.",
      "Watch wet paint lines and recessed iron grates on cool mornings.",
      "Balance front-basket loads low against the head tube.",
    ],
  },
  {
    slug: "inside-the-frame-junctions",
    number: "NOTE / 02",
    title: "Reading a Weld Seam and Hidden Routing Port",
    category: "craft",
    readTime: "3 min read",
    dateLabel: "STUDIO STUDY",
    routeTag: "CHASSIS DETAIL · R—09",
    assetKey: "09-frame-macro",
    alt: "Close detail of a graphite bicycle frame with tangerine accents",
    excerpt: "A closer look at how the main triangle keeps cables sheltered without making workshop maintenance painful.",
    pullQuote: "Industrial hardware looks sharp longest when mechanics do not have to fight it.",
    body: [
      "Clean silhouettes fail the moment a routine housing swap requires disassembling half a stem. Every entry port along the down tube sits on an accessible radius with replaceable rubber grommets.",
      "Around the seat cluster, chamfered edges keep paint chips away from high-touch clamp zones and make torque checks quick with a standard shop key.",
    ],
    takeaways: [
      "Inspect down-tube grommets after gritty winter rain.",
      "Keep dry chain lube away from painted matte finishes.",
      "Log bolt check dates alongside tire tread inspections.",
    ],
  },
  {
    slug: "choosing-tread-for-shortcut-alleys",
    number: "NOTE / 03",
    title: "City Slick vs. Micro-Knobby Around Alley Shortcuts",
    category: "care",
    readTime: "5 min read",
    dateLabel: "SURFACE TEST",
    routeTag: "RUBBER STUDY · R—10",
    assetKey: "10-tire-detail",
    alt: "Close detail of the tread on a bicycle tire",
    excerpt: "Picking rubber tread based on leaf litter, crushed aggregate, and construction detours rather than brochures.",
    pullQuote: "Corners reveal your tire choice long before straight avenues ever do.",
    body: [
      "If ninety percent of your week stays on swept bike lanes, a quieter city profile rolls smoothly over manhole transitions and concrete seams.",
      "Once canal towpaths, decomposed granite park shortcuts, or wet autumn leaves enter the week, shoulder lugging adds steady bite as you lean into turns.",
    ],
    takeaways: [
      "Match tread choice to your worst weekly two blocks, not your cleanest boulevard.",
      "Wipe sidewalls periodically to spot small flint or glass nicks early.",
      "Switch seasonally when local frost or gravel sweeping starts.",
    ],
  },
  {
    slug: "packing-the-front-basket",
    number: "NOTE / 04",
    title: "Weight Balance When Carrying Daily Kit Up Front",
    category: "care",
    readTime: "3 min read",
    dateLabel: "CARGO BRIEF",
    routeTag: "FRONT CARRY · R—06",
    assetKey: "06-basket-alpha",
    alt: "Standalone front basket accessory for the RADIUS bicycle",
    excerpt: "Practical strapping habits that keep steering calm from corner bodega stops to tight stairwells.",
    pullQuote: "Frame-aligned mounts keep heavy groceries from steering the front wheel for you.",
    body: [
      "Keep dense items flush against the back wall of the basket and strap loose totes cleanly so weight never shifts mid-turn.",
      "Check basket bracket fasteners at monthly intervals whenever commuting regularly with laptop packs or grocery crates.",
    ],
    takeaways: [
      "Place heaviest bottles or locks closest to the head tube.",
      "Tuck dangling tote straps away from the tire crown.",
      "Verify mount bolts stay snug after bumpy rail crossings.",
    ],
  },
  {
    slug: "dusk-commutes-and-beam-cutoff",
    number: "NOTE / 05",
    title: "Aiming Street Beams Without Blinding Oncoming Riders",
    category: "routes",
    readTime: "4 min read",
    dateLabel: "NIGHT STUDY",
    routeTag: "OPTICS · R—07",
    assetKey: "07-lights-alpha",
    alt: "Standalone front and rear lighting hardware for the RADIUS bicycle",
    excerpt: "A quick wall-test alignment check takes thirty seconds and makes two-way greenways safer for everyone.",
    pullQuote: "Helpful illumination stops politely below an oncoming rider's eyeline.",
    body: [
      "Roll five meters back from a flat concrete wall at dusk and check where the bright upper cutoff settles. Angling it slightly downward illuminates potholes directly ahead without washing mirrors or glasses.",
      "Keep rear reflectors wiped free of road film after wet afternoons.",
    ],
    takeaways: [
      "Run the five-meter garage wall cutoff check whenever luggage changes pitch.",
      "Pair active beams with clean passive reflectors.",
      "Check wire clips underneath fenders after washdowns.",
    ],
  },
  {
    slug: "industrial-garage-study",
    number: "NOTE / 06",
    title: "Proportion Studies From Concrete Ramps to Narrow Halls",
    category: "craft",
    readTime: "4 min read",
    dateLabel: "DESIGN LOG",
    routeTag: "FORM FACTOR · R—01",
    assetKey: "01-bike-hero",
    alt: "RADIUS bicycle photographed in an industrial space",
    excerpt: "Designing a frame proportion that carries cleanly up residential stairs while looking settled on the street.",
    pullQuote: "Good urban machines spend half their life parked beside doorways.",
    body: [
      "Between apartment stair landings and crowded racks, handlebar width and top-tube grab balance decide how effortless daily routines actually feel.",
      "Every chamfer and painted stripe follows real structural intersections rather than applied decoration.",
    ],
    takeaways: [
      "Test shoulder or hand carry balance when touring showrooms.",
      "Check doorway bar clearance at home before finalizing bar width.",
      "Inspect painted contact points where U-locks rest cleanly.",
    ],
  },
];

export function filterFieldNotes(category: NoteCategory | "all", query: string): FieldNote[] {
  const q = query.trim().toLowerCase();
  const base = category === "all" ? FIELD_NOTES : FIELD_NOTES.filter((n) => n.category === category);
  if (!q) return base;
  return base.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.routeTag.toLowerCase().includes(q) ||
      n.body.some((p) => p.toLowerCase().includes(q)),
  );
}

export function getFieldNote(slug: string): FieldNote | null {
  return FIELD_NOTES.find((n) => n.slug === slug) ?? null;
}

export function getAdjacentNotes(slug: string): { prev: FieldNote; next: FieldNote } | null {
  const i = FIELD_NOTES.findIndex((n) => n.slug === slug);
  if (i < 0) return null;
  return {
    prev: FIELD_NOTES[(i - 1 + FIELD_NOTES.length) % FIELD_NOTES.length],
    next: FIELD_NOTES[(i + 1) % FIELD_NOTES.length],
  };
}

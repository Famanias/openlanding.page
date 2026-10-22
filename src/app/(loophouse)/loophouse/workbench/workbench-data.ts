export type ToolCategory = "all" | "woodworking" | "metal" | "masonry" | "cordless";

export interface ToolItem {
  id: string;
  name: string;
  model: string;
  category: Exclude<ToolCategory, "all">;
  serial: string;
  power: string;
  speed: string;
  tolerance: string;
  weight: string;
  condition: string;
  status: "Available" | "In Circulation";
  standardDailyFee: number;
  highlightSpec: string;
  schematicType: "router" | "tracksaw" | "joiner" | "rotary" | "bandsaw" | "planer";
}

export interface ProjectKit {
  id: string;
  title: string;
  code: string;
  category: string;
  loanDays: number;
  toolsIncluded: string[];
  description: string;
  specNotes: string;
}

export interface HostDepot {
  id: string;
  name: string;
  address: string;
  distanceWalk: string;
  hours: string;
  shelfBays: number;
  hostName: string;
}

export const TOOLS: ToolItem[] = [
  {
    id: "tool-of1400",
    name: "Precision Plunge Router",
    model: "Festool OF 1400 EBQ",
    category: "woodworking",
    serial: "LH-WD-1402",
    power: "1,400 Watts / 230V",
    speed: "10,000 – 22,500 RPM",
    tolerance: "±0.02 mm runout",
    weight: "4.5 kg",
    condition: "Tier A (Calibrated)",
    status: "Available",
    standardDailyFee: 14,
    highlightSpec: "1/2\" & 1/4\" Collets · Dual Column Lock",
    schematicType: "router",
  },
  {
    id: "tool-ts55",
    name: "Plunge Cut Track Saw",
    model: "Festool TS 55 FEBQ",
    category: "woodworking",
    serial: "LH-WD-5509",
    power: "1,200 Watts / 230V",
    speed: "2,000 – 5,800 RPM",
    tolerance: "0.1 mm track drift",
    weight: "4.7 kg",
    condition: "Tier A (Calibrated)",
    status: "Available",
    standardDailyFee: 16,
    highlightSpec: "55 mm Depth · 1400 mm Rail Included",
    schematicType: "tracksaw",
  },
  {
    id: "tool-df500",
    name: "Domino Mortise Joiner",
    model: "Festool Domino DF 500 Q",
    category: "woodworking",
    serial: "LH-WD-0504",
    power: "420 Watts / 230V",
    speed: "25,500 RPM",
    tolerance: "±0.05 mm slot precision",
    weight: "3.2 kg",
    condition: "Tier A (Calibrated)",
    status: "Available",
    standardDailyFee: 18,
    highlightSpec: "4–10 mm Tenons · Mitre Angle Stops",
    schematicType: "joiner",
  },
  {
    id: "tool-sdsplus",
    name: "SDS-Plus Rotary Hammer",
    model: "Bosch Professional GBH 2-28 F",
    category: "masonry",
    serial: "LH-MS-2811",
    power: "880 Watts / 3.2 Joules",
    speed: "0 – 4,000 BPM",
    tolerance: "KickBack Control 0.1s",
    weight: "3.1 kg",
    condition: "Tier A (Calibrated)",
    status: "Available",
    standardDailyFee: 12,
    highlightSpec: "28 mm Concrete Drill · Quick-Change Chuck",
    schematicType: "rotary",
  },
  {
    id: "tool-bandsaw",
    name: "Deep Cut Portable Bandsaw",
    model: "Milwaukee M18 FUEL 6232",
    category: "metal",
    serial: "LH-MT-1845",
    power: "18V REDLITHIUM High Output",
    speed: "116 m/min surface speed",
    tolerance: "Clean cold-cut square",
    weight: "6.8 kg",
    condition: "Tier A (Calibrated)",
    status: "Available",
    standardDailyFee: 15,
    highlightSpec: "125 × 125 mm Cut Capacity · Spark-Free",
    schematicType: "bandsaw",
  },
  {
    id: "tool-planer",
    name: "Rebate Hand Planer",
    model: "Makita 18V DKP181ZU",
    category: "cordless",
    serial: "LH-CD-1810",
    power: "18V Brushless AWS",
    speed: "12,000 RPM",
    tolerance: "0.1 mm click step",
    weight: "3.6 kg",
    condition: "Tier A (Calibrated)",
    status: "Available",
    standardDailyFee: 10,
    highlightSpec: "82 mm Width · 3 mm Max Cut Depth",
    schematicType: "planer",
  },
];

export const PROJECT_KITS: ProjectKit[] = [
  {
    id: "kit-joinery",
    title: "Cabinetmaker Joinery Pack",
    code: "KIT-CAB-01",
    category: "Woodworking",
    loanDays: 4,
    toolsIncluded: [
      "Festool Domino DF 500 Q",
      "Festool OF 1400 EBQ Router",
      "4× Bessey K-Body 1000mm Clamps",
      "Trend Digital Angle Finder",
    ],
    description:
      "Engineered for heirloom furniture builds, kitchen cabinet fabrication, and tight mortise-and-tenon assembly.",
    specNotes: "Full cutter set included: 4mm, 5mm, 6mm, 8mm, 10mm carbide mortise bits.",
  },
  {
    id: "kit-framing",
    title: "Timber Framing & Decking Rig",
    code: "KIT-FRM-02",
    category: "Carpentry",
    loanDays: 5,
    toolsIncluded: [
      "Festool TS 55 Track Saw + 2× Rails",
      "Dewalt 18V Framing Nailer",
      "Stabila 1200mm R-Beam Level",
      "Empire 300mm Rafter Square",
    ],
    description:
      "Everything required to frame partition walls, construct pergola pergolas, or lay precision outdoor decking.",
    specNotes: "Two 1400mm rails with joining bars for seamless 2.8m continuous cuts.",
  },
  {
    id: "kit-electrical",
    title: "Electrician & Diagnostics Caddy",
    code: "KIT-ELC-03",
    category: "Diagnostics",
    loanDays: 3,
    toolsIncluded: [
      "Fluke 87V True-RMS Digital Multimeter",
      "FLIR C5 Thermal Imaging Camera",
      "Klein Tools Tone & Probe Cable Tracer",
      "Greenlee Knockout Punch Kit",
    ],
    description:
      "High-grade diagnostic instruments for circuit verification, thermal leak inspections, and conduit routing.",
    specNotes: "Calibrated quarterly with certified test leads and thermal calibration plate.",
  },
  {
    id: "kit-landscape",
    title: "Landscape & Stonework Rig",
    code: "KIT-LND-04",
    category: "Masonry & Yard",
    loanDays: 3,
    toolsIncluded: [
      "Bosch GBH 2-28 Rotary Hammer",
      "Husqvarna Wet Tile & Stone Table Saw",
      "Stihl Earth Auger Rig",
      "Laser Distance & Elevation Meter",
    ],
    description:
      "Tackle stone patio laying, retaining wall boring, and outdoor soil cultivation without hiring contractors.",
    specNotes: "Supplied with diamond continuous-rim blade and concrete core bits.",
  },
];

export const HOST_DEPOTS: HostDepot[] = [
  {
    id: "depot-ironworks",
    name: "Ironworks Guild Workshop",
    address: "14 Foundry Way, Block 04",
    distanceWalk: "4 min walk",
    hours: "07:30 – 19:00 Daily",
    shelfBays: 18,
    hostName: "Klaus Lindqvist (Benchmaster)",
  },
  {
    id: "depot-timberyard",
    name: "North Canal Plywood & Timber",
    address: "88 Millrace Avenue, Dock 2",
    distanceWalk: "6 min walk",
    hours: "08:00 – 18:30 Mon–Sat",
    shelfBays: 14,
    hostName: "Elena Varga (Master Joiner)",
  },
  {
    id: "depot-pottery",
    name: "Kiln & Forge Community Depot",
    address: "31 St. Jude Walk, Arch 07",
    distanceWalk: "8 min walk",
    hours: "09:00 – 21:00 Daily",
    shelfBays: 12,
    hostName: "Marcus Sterling (Fabricator)",
  },
];

export const WORKSHOP_METRICS = {
  totalTools: 428,
  returnRate: 98.4,
  activeDepots: 3,
  baysAvailable: 44,
  calibrationHoursMonthly: 124,
  averageWalkMinutes: 5.8,
};

export function filterToolsByCategory(tools: ToolItem[], category: ToolCategory): ToolItem[] {
  if (category === "all") return tools;
  return tools.filter((tool) => tool.category === category);
}

export function calculateRequisitionTotals(
  tools: ToolItem[],
  loanDays: number,
  isMember: boolean,
): { count: number; days: number; fee: number; isFreeForMember: boolean } {
  const safeDays = Math.max(1, Math.min(loanDays, 14));
  const count = tools.length;

  if (isMember) {
    return {
      count,
      days: safeDays,
      fee: 0,
      isFreeForMember: true,
    };
  }

  const fee = tools.reduce((sum, tool) => sum + tool.standardDailyFee * safeDays, 0);
  return {
    count,
    days: safeDays,
    fee,
    isFreeForMember: false,
  };
}

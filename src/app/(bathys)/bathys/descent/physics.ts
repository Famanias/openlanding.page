export const MAX_DEPTH = 10928;

export type OceanZoneName =
  | "Epipelagic"
  | "Mesopelagic"
  | "Bathypelagic"
  | "Abyssopelagic"
  | "Hadopelagic";

export type OceanZone = {
  name: OceanZoneName;
  tagline: string;
  depthRange: string;
  startDepth: number;
  endDepth: number;
  lightStatus: string;
  pressureRange: string;
};

export const OCEAN_ZONES: OceanZone[] = [
  {
    name: "Epipelagic",
    tagline: "Sunlight & Surface Calibration",
    depthRange: "0–200 M",
    startDepth: 0,
    endDepth: 200,
    lightStatus: "100% – 10% Solar Transmission",
    pressureRange: "1.0 – 21.0 BAR",
  },
  {
    name: "Mesopelagic",
    tagline: "The Twilight & Thermocline Barrier",
    depthRange: "200–1,000 M",
    startDepth: 200,
    endDepth: 1000,
    lightStatus: "10% – 0.1% Fading Radiance",
    pressureRange: "21.0 – 102.5 BAR",
  },
  {
    name: "Bathypelagic",
    tagline: "Midnight Oceanic Extinction",
    depthRange: "1,000–4,000 M",
    startDepth: 1000,
    endDepth: 4000,
    lightStatus: "Absolute Solar Extinction (Bioluminescence Only)",
    pressureRange: "102.5 – 408.0 BAR",
  },
  {
    name: "Abyssopelagic",
    tagline: "The Abyssal Plains",
    depthRange: "4,000–6,000 M",
    startDepth: 4000,
    endDepth: 6000,
    lightStatus: "Pitch Black Pelagic Basins",
    pressureRange: "408.0 – 612.0 BAR",
  },
  {
    name: "Hadopelagic",
    tagline: "The Challenger Deep Trench Breach",
    depthRange: "6,000–10,928 M",
    startDepth: 6000,
    endDepth: 10928,
    lightStatus: "Total Hadal Void · High-Frequency Active Sonar",
    pressureRange: "612.0 – 1,114.2 BAR",
  },
];

export function calculatePressure(depthMeters: number): { bar: number; mpa: number } {
  const d = Math.max(0, Math.min(depthMeters, MAX_DEPTH));
  // Compressibility-corrected hydrostatic equation
  const hydrostaticBar = (1026 * 9.80665 * d * (1 + 1.25e-6 * d)) / 100000;
  const bar = 1.01325 + hydrostaticBar;
  const mpa = bar / 10;
  return { bar, mpa };
}

export function calculateLightAbsorption(depthMeters: number): number {
  const d = Math.max(0, depthMeters);
  if (d >= 4000) return 0;
  const val = Math.exp(-0.0045 * d);
  return val < 0.001 ? 0 : val;
}

export function calculateWaterTemp(depthMeters: number): number {
  const d = Math.max(0, Math.min(depthMeters, MAX_DEPTH));
  if (d <= 1000) {
    // Surface warm layer into thermocline
    return 26.0 - 22.0 * Math.pow(d / 1000, 0.6);
  }
  // Deep ocean gradual cooling from 4.0C to 1.8C
  const fraction = (d - 1000) / (MAX_DEPTH - 1000);
  return 4.0 - 2.2 * fraction;
}

export function getOceanZone(depthMeters: number): OceanZone {
  const d = Math.max(0, Math.min(depthMeters, MAX_DEPTH));
  for (const zone of OCEAN_ZONES) {
    if (d <= zone.endDepth) {
      return zone;
    }
  }
  return OCEAN_ZONES[OCEAN_ZONES.length - 1];
}

export function depthToProgress(depthMeters: number): number {
  return Math.max(0, Math.min(depthMeters / MAX_DEPTH, 1));
}

export function progressToDepth(prog: number): number {
  return Math.max(0, Math.min(prog, 1)) * MAX_DEPTH;
}

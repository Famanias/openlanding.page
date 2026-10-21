export type SpectralPresetId =
  | "solar-flare"
  | "deep-borealis"
  | "liquid-mercury"
  | "neochrome-velvet"
  | "supernova";

export interface SpectralPreset {
  id: SpectralPresetId;
  name: string;
  subtitle: string;
  wavelengthNm: number;
  abbeVd: number;
  refractiveIndex: number;
  turbulence: number;
  flowVelocity: number;
  chromaticSpread: number;
  /** Normalized RGB vectors [r, g, b] (0..1) for WebGL uniforms */
  uniformStops: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ];
  hexStops: [string, string, string, string];
  cssGradient: string;
  description: string;
}

export const SPECTRAL_PRESETS: Record<SpectralPresetId, SpectralPreset> = {
  "solar-flare": {
    id: "solar-flare",
    name: "Solar Flare",
    subtitle: "589nm · Sodium D-Line",
    wavelengthNm: 589,
    abbeVd: 54.2,
    refractiveIndex: 1.618,
    turbulence: 1.1,
    flowVelocity: 0.8,
    chromaticSpread: 0.45,
    uniformStops: [
      [0.04, 0.04, 0.06], // deep obsidian base
      [0.08, 0.09, 0.14], // deep smoked glass
      [0.72, 0.22, 0.06], // rich amber vermilion
      [0.0, 0.65, 0.78],  // luminous cyan corona
    ],
    hexStops: ["#0A0B10", "#141724", "#FF4D00", "#00F0FF"],
    cssGradient: "linear-gradient(135deg, #0A0B10 0%, #141724 45%, #FF4D00 78%, #00F0FF 100%)",
    description: "High-temperature coronal discharge. Dense amber and vermilion caustics bordered by an energetic cyan ionizing fringe.",
  },
  "deep-borealis": {
    id: "deep-borealis",
    name: "Deep Borealis",
    subtitle: "532nm · Auroral Viridian",
    wavelengthNm: 532,
    abbeVd: 68.4,
    refractiveIndex: 1.542,
    turbulence: 0.85,
    flowVelocity: 0.6,
    chromaticSpread: 0.38,
    uniformStops: [
      [0.03, 0.05, 0.08], // deep subarctic night
      [0.06, 0.10, 0.15], // subarctic slate
      [0.0, 0.65, 0.52],  // auroral viridian
      [0.0, 0.55, 0.85],  // cryogenic cyan
    ],
    hexStops: ["#070D14", "#0F1A26", "#00F0B3", "#00C0FF"],
    cssGradient: "linear-gradient(135deg, #070D14 0%, #0F1A26 45%, #00F0B3 75%, #00C0FF 100%)",
    description: "Ionospheric geomagnetic curtains. Smooth laminar flow across pure viridian and cryogenic cyan with violet shear lines.",
  },
  "liquid-mercury": {
    id: "liquid-mercury",
    name: "Liquid Mercury",
    subtitle: "436nm · Iridescent Platinum",
    wavelengthNm: 436,
    abbeVd: 42.1,
    refractiveIndex: 1.724,
    turbulence: 1.25,
    flowVelocity: 0.9,
    chromaticSpread: 0.52,
    uniformStops: [
      [0.05, 0.06, 0.08], // smoked quartz
      [0.09, 0.11, 0.16], // deep platinum shadow
      [0.42, 0.45, 0.52], // metallic platinum
      [0.0, 0.68, 0.82],  // cyan specular highlight
    ],
    hexStops: ["#0F121A", "#171D2A", "#8C94A6", "#00F0FF"],
    cssGradient: "linear-gradient(135deg, #0F121A 0%, #171D2A 45%, #8C94A6 75%, #00F0FF 100%)",
    description: "Reflective heavy-metal surface physics. High dispersion Abbe factor creating silver shear bands and rainbow sheen.",
  },
  "neochrome-velvet": {
    id: "neochrome-velvet",
    name: "Neochrome Velvet",
    subtitle: "650nm · Ruby Laser",
    wavelengthNm: 650,
    abbeVd: 36.8,
    refractiveIndex: 1.685,
    turbulence: 1.0,
    flowVelocity: 0.75,
    chromaticSpread: 0.6,
    uniformStops: [
      [0.05, 0.04, 0.08], // deep plum base
      [0.10, 0.07, 0.14], // deep amethyst glass
      [0.70, 0.15, 0.35], // ruby laser
      [0.30, 0.12, 0.60], // chromatic indigo
    ],
    hexStops: ["#0D0A14", "#1A1224", "#FF2673", "#6626CC"],
    cssGradient: "linear-gradient(135deg, #0D0A14 0%, #1A1224 45%, #FF2673 75%, #6626CC 100%)",
    description: "Stimulated optical resonance. Sharp transition boundaries between saturated magenta, indigo, and evanescent peach.",
  },
  "supernova": {
    id: "supernova",
    name: "Supernova",
    subtitle: "410nm · High Flux Plasma",
    wavelengthNm: 410,
    abbeVd: 28.5,
    refractiveIndex: 1.835,
    turbulence: 1.6,
    flowVelocity: 1.1,
    chromaticSpread: 0.7,
    uniformStops: [
      [0.06, 0.04, 0.09], // cosmic void
      [0.11, 0.08, 0.16], // deep nebula shadow
      [0.55, 0.12, 0.78], // ultraviolet resonance
      [0.0, 0.70, 0.82],  // plasma cyan
    ],
    hexStops: ["#140D1F", "#1D142E", "#BF00FF", "#00F0FF"],
    cssGradient: "linear-gradient(135deg, #140D1F 0%, #1D142E 45%, #BF00FF 75%, #00F0FF 100%)",
    description: "Extreme relativistic plasma. Violent curl turbulence and wide chromatic splitting simulating core stellar collapse.",
  },
};

export const PRESET_ORDER: SpectralPresetId[] = [
  "solar-flare",
  "deep-borealis",
  "liquid-mercury",
  "neochrome-velvet",
  "supernova",
];

/** The five terms of real-time glass: the pinned chapter after the hero. */
export type Term = { id: string; name: string; readout: string; body: string; diagram: "film" | "snell" | "prism" | "slab" | "micro" };

export const TERMS: Term[] = [
  {
    id: "iridescence", name: "Iridescence", readout: "film 280–680 nm", diagram: "film",
    body: "Thin-film interference in a microscopic clearcoat shifts the reflected wavelengths with the viewing angle. That gives frosted quartz its pearl sky, cyan and rose sheen.",
  },
  {
    id: "ior", name: "Index of refraction", readout: "IOR 1.52", diagram: "snell",
    body: "How much slower light travels inside the glass than in a vacuum. At 1.52, crown silica bends incoming rays sharply along every bevelled edge.",
  },
  {
    id: "dispersion", name: "Dispersion", readout: "Abbe 59", diagram: "prism",
    body: "Each wavelength refracts by a different amount, so white studio light splits into spectral caustics across the cut edges. Cullet solves it in one pass, live, as KHR_materials_dispersion.",
  },
  {
    id: "transmission", name: "Transmission", readout: "1.4 cm volume", diagram: "slab",
    body: "Specular transmission and subsurface scattering work together, so a thick slab passes the light around it and softens what sits behind.",
  },
  {
    id: "roughness", name: "Roughness", readout: "0.22 / 0.08", diagram: "micro",
    body: "How much the microscopic surface normals vary, which sets how tight the highlights are: a satin etched face at 0.22 under a polished clearcoat rim at 0.08.",
  },
];

export const NAV = [
  { id: "terms", label: "Terms" },
  { id: "sampler", label: "Studio" },
  { id: "materials", label: "Materials" },
  { id: "pricing", label: "Pricing" },
] as const;

export const STEPS = [
  {
    n: "01", verb: "Cut", title: "Author the material, not the texture.",
    body: "Stack a body, a volume, a clearcoat and a thin film. Each layer is one parameter set with no baked maps, so a material stays a few kilobytes.",
  },
  {
    n: "02", verb: "Preview", title: "See it on the real renderer.",
    body: "Every change renders live in three.js, Babylon.js and model-viewer side by side, under your HDRI or one of the eleven studio rigs.",
  },
  {
    n: "03", verb: "Ship", title: "Export glass that renders the same everywhere.",
    body: "One click writes glTF with the KHR material extensions, USDZ for Quick Look, or a typed three.js module. What you approved is what ships.",
  },
];

export const STATS = [
  { value: 1.6, decimals: 1, suffix: " ms", label: "per glass material, per frame, at 1080p on an M2" },
  { value: 60, decimals: 0, suffix: " fps", label: "with dispersion on a three-year-old phone" },
  { value: 0, decimals: 0, suffix: "", label: "baked maps. Every material is pure parameters" },
  { value: 41200, decimals: 0, suffix: "", label: "materials cut in Cullet since the open beta" },
];

export const RENDERERS = ["three.js", "Babylon.js", "model-viewer", "PlayCanvas", "Blender glTF", "USDZ Quick Look", "Godot 4", "React Three Fiber"];

export const NOTES = [
  {
    quote: "We used to bake glass per angle and pray. Now the bottle on the product page refracts the actual page behind it.",
    name: "Ines Moraga", role: "Lead 3D, Kettle & Ray",
  },
  {
    quote: "The dispersion slider sold it. Our designers tune caustics in the browser and engineering gets a typed module, not a ZIP of PNGs.",
    name: "Dami Okafor", role: "Design engineer, Northlight Interactive",
  },
  {
    quote: "Four kilobytes for a sapphire watch crystal that looks right on a phone. We stopped shipping videos of our product.",
    name: "Lea Brandt", role: "Creative director, Studio Ondine",
  },
];

export type Cadence = "monthly" | "annual";
export type Cut = { id: string; name: string; monthly: number | null; blurb: string; features: string[]; cta: string; featured?: boolean };

export const CUTS: Cut[] = [
  {
    id: "sketch", name: "Sketch", monthly: 0, blurb: "For trying glass on a side project.", cta: "Start sketching",
    features: ["3 saved materials", "Live preview in three.js", "glTF export", "The public material library"],
  },
  {
    id: "studio", name: "Studio", monthly: 24, featured: true, blurb: "For designers shipping glass in production.", cta: "Open studio",
    features: ["Unlimited materials", "Dispersion and iridescence", "USDZ and typed three.js export", "Side-by-side renderer preview", "Version history"],
  },
  {
    id: "foundry", name: "Foundry", monthly: null, blurb: "For teams with a material system.", cta: "Talk to the lab",
    features: ["Everything in Studio", "Shared team libraries", "SSO and audit log", "Render-farm turntables", "A named optics engineer"],
  },
];

/** Annual seats are billed yearly at 20% off; prices round to whole dollars. Null means custom. */
export function priceFor(cut: Cut, cadence: Cadence): number | null {
  if (cut.monthly === null) return null;
  return cadence === "annual" ? Math.round(cut.monthly * 0.8) : cut.monthly;
}

export const PAPER = {
  label: "Technical note 07",
  title: "Dispersion in a single forward pass.",
  paragraphs: [
    "Real-time renderers have treated glass as one refracted ray. White light doesn't refract as one ray, which is why most web glass looks like tinted plastic.",
    "Cullet samples three wavelengths through each transmissive surface, offset by the material's Abbe number, and recombines them in the same pass that shades the surface. No second render target, no extra draw calls.",
    "On an M2 laptop it costs 1.6 ms per material at 1080p. On a three-year-old phone it holds 60 fps with dispersion on. The output is plain KHR_materials_dispersion, so any glTF viewer that supports the extension renders it the same way.",
  ],
  figures: [
    { k: "Samples", v: "3 λ / ray" },
    { k: "Extra passes", v: "0" },
    { k: "Cost", v: "1.6 ms" },
  ],
};

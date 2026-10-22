export type TemplateSlug = "orrery" | "keytu" | "koji" | "trace" | "calder" | "vector" | "morrow" | "loophouse" | "wowflutter" | "verane" | "sundial" | "noctiluca" | "iridia" | "bathys" | "aubade" | "satsuma" | "kinetic";

export type TemplateConfig = {
  palette: string[];
  /** Path prefixes skipped by the palette check (content colours, e.g. 3D food). */
  paletteExempt?: string[];
};

export const TEMPLATES: Record<TemplateSlug, TemplateConfig> = {
  orrery: {
    palette: ["#0E0F13", "#F2EFE8", "#2F3BFF", "#FFB000"],
  },
  keytu: {
    palette: ["#0B0C0E", "#0F1E33", "#F5F6F7", "#16294A", "#2A3D5E", "#56657F", "#A5AEBD", "#DDE1E7"],
  },
  koji: {
    palette: ["#1A1918", "#4A4743", "#8E8A83", "#EDEAE4", "#C8331F"],
    paletteExempt: [
      "src/app/(koji)/koji/dish/", // 3D food colours are content, like a photo
      "src/app/(koji)/koji/flight/scrub-engine.js", // vendored engine; its default theme is overridden by --sw-* tokens
    ],
  },
  trace: {
    palette: ["#081115", "#E7ECE7", "#C9F458", "#849694"],
  },
  calder: {
    // ink (ground, text on paper), midnight (slabs), ivory (paper, text on slabs), gold (the one accent, hairlines),
    // parchment (paper tint), slate (muted text on paper), brass (gold as text on paper), garnet (errors only)
    palette: ["#070C17", "#0E1830", "#F5F0E4", "#C9A55A", "#E8DFCB", "#55607A", "#7D5F1F", "#9C3A2E"],
  },
  vector: {
    palette: ["#030706", "#071713", "#51F6D3", "#B8FF57", "#123B38"],
  },
  morrow: {
    palette: ["#F5EBDD", "#1C2A26", "#B65344", "#DFA75B", "#D7C5AF", "#68736B", "#E9D6BB"],
  },
  loophouse: {
    palette: ["#EFF3E4", "#17272A", "#2F6F67", "#E3A52A", "#CBD7C4", "#60716B", "#E2EBD4"],
  },
  wowflutter: {
    palette: ["#14110F", "#EFE6D4", "#FF3D8B", "#DCCFB8", "#5E564D"],
  },
  verane: {
    // oud (ink), calcaire (paper), orris (accent), gilt (hairlines on oud only), veil (tint), ash (muted text)
    palette: ["#2A1E22", "#E3DFD8", "#655A7E", "#B59A6A", "#CFC9C0", "#5F5753"],
  },
  sundial: {
    // espresso (ink), crema (paper), tangerine (accent), roastgreen (rare secondary), oat (tint), husk (muted)
    palette: ["#241611", "#F7F1E6", "#FF6B1A", "#0F5C3F", "#EADBC4", "#6F6152"],
    paletteExempt: [
      "src/app/(sundial)/sundial/roast/roast.ts", // bean-colour ramp is content colour, like 3D food
    ],
  },
  noctiluca: {
    // ink (ground), lumen (text, label stock), glow (the one accent), dusk (muted), glass (plaques), ember (errors only)
    palette: ["#07060B", "#F3F0EA", "#C9B8FF", "#8E889B", "#16131F", "#FFA38F"],
    paletteExempt: [
      "src/app/(noctiluca)/noctiluca/light/phenomena.ts", // each room's light is content colour, like a photograph of the sky
      "src/app/(noctiluca)/noctiluca/rooms/rooms.test.ts", // asserts the phenomena stops' format
    ],
  },
  iridia: {
    // obsidian (ground), prism (paper/text), hyperion (laser cyan 480nm), chroma (magenta 650nm), starlight (amber 589nm), glass (HUD), specular (steel), flare (thermal/error)
    palette: ["#0A0B10", "#F5F3EF", "#00F0FF", "#FF3366", "#FFE600", "#141724", "#8D93A8", "#FF4D00"],
    paletteExempt: [
      "src/app/(iridia)/iridia/spectrum/presets.ts", // spectral wavelength stops are optical content
    ],
  },
  bathys: {
    // trench obsidian (ground), bathypelagic navy (slabs), hull titanium (paper), siphonophore cyan (primary accent), acoustic amber (secondary alert), pressure glass (tint), hydrographic slate (rules), subsea mist (muted)
    palette: ["#03070D", "#0A1526", "#EDF5FA", "#00E5FF", "#FF9E1B", "#122338", "#546E8A", "#8DA8C2"],
  },
  aubade: {
    // nuit (ink/ground), linen (paper/text), claret (the one action colour, dusk), dawn (dawn field, highlights on nuit), sapin (forest, dining car), lac (lake, lagoon)
    palette: ["#161233", "#F3ECDF", "#8E1F3A", "#F2B37A", "#1F4A3F", "#3E6FA8"],
  },
  satsuma: {
    // paper (page), ink (text), aubergine (primary action), satsuma (the one accent), apricot (badge and tint), leaf (rare green)
    palette: ["#FFF6EA", "#1F1520", "#3A1D4A", "#FF7A2F", "#FFD9B0", "#2F5D3A"],
  },
  kinetic: {
    // paper (#FAF7F2), ink (#1B1522), satsuma accent (#FF6B2B), apricot (#FFE6D2), mint (#00D4B2), carbon (#2A1E30), slate (#8E8294)
    palette: ["#FAF7F2", "#1B1522", "#FF6B2B", "#FFE6D2", "#00D4B2", "#2A1E30", "#8E8294"],
    paletteExempt: [
      "src/app/(kinetic)/kinetic/journey/engine/", // 3D scenery/materials shaders are content like 3D food
    ],
  },
};

export type SourceFile = { path: string; source: string };

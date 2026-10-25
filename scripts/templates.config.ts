export type TemplateSlug = "orrery" | "keytu" | "koji" | "trace" | "calder" | "vector" | "morrow" | "loophouse" | "wowflutter" | "verane" | "sundial" | "noctiluca" | "iridia" | "bathys" | "aubade" | "satsuma" | "kinetic" | "isobar" | "volume-zero" | "openhouse" | "handoff" | "truecut" | "nomi" | "kazeko" | "alpine-reel" | "rill" | "hiyas" | "mio" | "satoyama" | "tally" | "aftercart";

export type TemplateConfig = {
  palette: string[];
  /** Path prefixes skipped by the palette check (content colours, e.g. 3D food). */
  paletteExempt?: string[];
};

export const TEMPLATES: Record<TemplateSlug, TemplateConfig> = {
  mio: { palette: ["#232C49", "#F5EFE4", "#A8B1D1", "#526D89", "#EDAD83", "#BC6268", "#654C65", "#D8CAD9"] },
  satoyama: { palette: ["#F6F3E8", "#ADC3A1", "#D7AAA0", "#2F4438", "#9CC4D6", "#F1D9A2", "#C8714F"] },
  kazeko: {
    palette: ["#F8F5E9", "#243C35", "#64856A", "#C7D6A7", "#D6E7EB", "#EED998", "#B96C51", "#596C63"],
  },
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
    // cast-iron (ink), birch (paper), cobalt (accent), galvanized steel (hairlines), workshop pine (tint)
    palette: ["#111618", "#F4EFE6", "#1E51EB", "#7E8A90", "#DED7C5"],
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
  isobar: {
    palette: ["#F7F2E9", "#12101A", "#FF5B47", "#2DE2A6", "#8A6CFF", "#FFD447", "#272234", "#A59DB6"],
    paletteExempt: ["src/app/(isobar)/isobar/field/"],
  },
  "volume-zero": {
    palette: ["#171B20", "#F1EEE5", "#2B9BAA"],
  },
  openhouse: {
    // paper, ink, cotton, desk, board, terracotta signal, rules, muted type and success state
    palette: [
      "#F7F2E9",
      "#EEE6D9",
      "#E6DACB",
      "#171414",
      "#1D1917",
      "#2A2521",
      "#6B6359",
      "#D7CDBF",
      "#C7B9A8",
      "#D86B4A",
      "#A9472E",
      "#FFF9F0",
      "#EDE5DA",
      "#344A3E",
      "#3E7658",
    ],
  },
  handoff: {
    palette: ["#F7F6F1", "#EEEDE7", "#171817", "#202320", "#F35B2A", "#9BC9D8", "#9CB99C", "#D9D7CF", "#6C6D67", "#FFFFFF"],
  },
  truecut: {
    // asphalt, chalk, signal lime, galvanized steel, oxide teal, rare rust
    palette: ["#172026", "#F5F0E5", "#E8F146", "#B4C3C1", "#4B6A72", "#C96B45"],
  },
  nomi: {
    palette: ["#FAF7EF", "#E9F8EF", "#D4F0E0", "#0C1C16", "#007948", "#A9E8C6", "#EEE4B4", "#B1DDE6", "#DAC1DE", "#FFFDF1"],
  },
  "alpine-reel": {
    palette: ["#040B16", "#08162A", "#6EA8D2", "#FFFFFF"],
  },
  rill: {
    palette: ["#14231E", "#F0E9DB", "#B85C43", "#5B8174", "#87956C", "#C9B79E"],
  },
  hiyas: {
    palette: ["#05070A", "#0B2A4A", "#FFFFFF"],
  },
  tally: {
    // buttercream paper, pistachio mint, apricot blush, periwinkle lilac, plum charcoal ink
    palette: ["#FAF4E8", "#C8E6D0", "#F7C8B6", "#CFD6F6", "#231F2B"],
  },
  aftercart: {
    // ink, paper, lilac, mint, peach, butter, sky
    palette: ["#4C4668", "#FFF7F3", "#DCCFF4", "#BFE7D3", "#FFCCB8", "#F5E8A7", "#BFD8F0"],
  },
};

export type SourceFile = { path: string; source: string };

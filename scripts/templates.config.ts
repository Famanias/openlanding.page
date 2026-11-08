import { RAW_TEMPLATES } from "../src/app/(index)/data/templates";

export type TemplateSlug = "waypoint" | "lenus" | "savepoint" | "stillwater" | "mercer" | "landingx" | "avel" | "noiseclub" | "warpwander" | "ctrlroom" | "parallel" | "lumen" | "morta" | "orrery" | "keytu" | "koji" | "trace" | "calder" | "vector" | "loophouse" | "wowflutter" | "verane" | "noctiluca" | "iridia" | "bathys" | "aubade" | "satsuma" | "kinetic" | "volume-zero" | "openhouse" | "handoff" | "truecut" | "nomi" | "kazeko" | "alpine-reel" | "rill" | "hiyas" | "mio" | "satoyama" | "tally" | "aftercart" | "fixture" | "chinagraph" | "valence" | "pipkin" | "serein" | "nulo" | "flori" | "understudy" | "nightline" | "cullet" | "amaoto" | "assemblage" | "firstday" | "lowtide" | "loam" | "perigee" | "xibalba" | "synapxe" | "pello" | "halodesk" | "riff" | "inesvale" | "nicopark" | "poppypatch" | "razorline" | "nexus" | "starriot" | "zeno" | "penumbra" | "khora" | "pitchlane" | "strata" | "arcsignal" | "aurel" | "cirro" | "orova" | "vyra" | "auven" | "nema" | "velora" | "tourne" | "kairok";

export type TemplateConfig = {
  createdAt: string;
  hasDownload: boolean;
  palette: string[];
  /** Path prefixes skipped by the palette check (content colours, e.g. 3D food). */
  paletteExempt?: string[];
  /** Whether the template is exempt from requiring registered assets to be rendered in JSX (e.g. pure 3D canvases). */
  mediaExempt?: boolean;
};

const PALETTES: Record<TemplateSlug, Omit<TemplateConfig, "createdAt" | "hasDownload">> = {
  kairok: {
    palette: ["#121315", "#F2EFE9", "#E68F63"],
    paletteExempt: ["src/app/(kairok)/"],
    mediaExempt: true,
  },
  tourne: {
    // bone (page), oat (tint), clay (the one accent), soot (ink), umber (muted text), celadon (rare glaze accent), porcelain (cards)
    palette: ["#F4EEE3", "#E9DFCE", "#A8492D", "#1F1A17", "#6B5E54", "#8FB5A0", "#FFFDF8"],
    // glaze and clay colours are content colours of the 3D vessel
    paletteExempt: ["src/app/(tourne)/tourne/vessel/"],
    mediaExempt: true,
  },
  auven: { palette: ["#0a151e", "#111f2a", "#060e14", "#a2aeb6", "#d7b698", "#f0d7bd", "#f0eee9", "#e2dfd8"], mediaExempt: true },
  nema: { palette: ["#f8f2ea", "#f3ece4", "#342d46", "#756b7e", "#e67c61", "#b7cdb7", "#e8d9e5", "#dcd3d0", "#fffdfb"], mediaExempt: true },
  velora: { palette: ["#06131c", "#081925", "#0d2631", "#8bf4bc", "#7ce9e7", "#ccff9b", "#f4fbf8", "#a4bbc5"], mediaExempt: true },
  cirro: { palette: ["#0a1b14", "#10291d", "#173b2b", "#d3ff61", "#f4f5ef", "#e7ede4", "#0c1b14", "#9fb4a7", "#a5c3fc"], mediaExempt: true },
  orova: { palette: ["#f5f0e7", "#e7ded1", "#d4c2b0", "#1b1e1c", "#696964", "#d4cec4", "#3146be", "#f0ab92"], mediaExempt: true },
  vyra: { palette: ["#f5f7fb", "#edf2f8", "#111b32", "#101a31", "#64718a", "#d9e0ec", "#39c9dd", "#77ebed", "#8488f4", "#b9f4e7"], mediaExempt: true },
  aurel: {
    palette: ["#0A0B0D", "#111317", "#23272B", "#F0ECE5", "#C7CDD2", "#89919A", "#9DB8C9", "#374047", "#F1EEE9"],
    paletteExempt: ["src/app/(aurel)/"],
    mediaExempt: true,
  },
  waypoint: {
    palette: [
      "#EDE6DF",
      "#F5EFEB",
      "#E5DDD4",
      "#FFFFFF",
      "#121417",
      "#2B2F38",
      "#666E7D",
      "#D8EADF",
      "#DBE8FA",
      "#FCE8DC",
      "#ECE6F6",
      "#16181D",
    ],
    paletteExempt: ["src/app/(waypoint)/"],
    mediaExempt: true,
  },
  lenus: {
    palette: ["#08090D", "#10131C", "#161924", "#F8FAFC", "#9499A6", "#D2F802", "#A855F7", "#00E599", "#0A0B0E"],
    paletteExempt: ["src/app/(lenus)/lenus/model/"],
    mediaExempt: true,
  },
  arcsignal: {
    palette: ["#0C0F1B", "#080B16", "#0C1020", "#10172A", "#8C72FF", "#5D6BFF", "#7FB5D4", "#11172A", "#171D32", "#F3F4FA"],
    paletteExempt: ["src/app/(arcsignal)/"],
    mediaExempt: true,
  },
  khora: {
    palette: ["#0F1012", "#E8EAE3", "#F7F8F5", "#17181C", "#91959B", "#E25822", "#7FA4A6", "#D2D9D9", "#FFFFFF", "#111111"],
    paletteExempt: ["src/app/(khora)/"],
    mediaExempt: true,
  },
  pitchlane: {
    palette: ["#F7F8FF", "#17182B", "#687085", "#F8F9FF", "#7654DF", "#E6DFFB", "#FF716C", "#61BBFA", "#7A66E9", "#DDD3FF"],
    paletteExempt: ["src/app/(pitchlane)/"],
    mediaExempt: true,
  },
  strata: {
    palette: ["#24221F", "#292620", "#E9E1D6", "#EFE9DF", "#BDA78F", "#AF765D", "#B89C81", "#1F1D19", "#C58E6A", "#F2E8DC"],
    paletteExempt: ["src/app/(strata)/"],
    mediaExempt: true,
  },
  savepoint: { palette: ["#121419", "#0B0D12", "#1B1F28", "#252934", "#F2F0E8", "#A9ADB7", "#CDF266", "#7971B7", "#F47D62"], paletteExempt: ["src/app/(savepoint)/"], mediaExempt: true },
  penumbra: {
    palette: ["#111318", "#20252D", "#F2EBE2", "#D7A779", "#E9BB86", "#7E91A8", "#A6A29F"],
    paletteExempt: ["src/app/(penumbra)/"],
    mediaExempt: true,
  },
  zeno: {
    palette: ["#111117", "#17171E", "#F2F0EB", "#A58AFF", "#5367F9", "#D8CFF2", "#96939F"],
    paletteExempt: ["src/app/(zeno)/"],
    mediaExempt: true,
  },
  halodesk: {
    palette: [
      "#F8F5EE", "#FCFBF7", "#29313E", "#66717F", "#CFDFEF",
      "#DCD5F6", "#F7D9CB", "#D0EFE2", "#FFF1AE", "#6C798F",
    ],
    paletteExempt: ["src/app/(halodesk)/"],
    mediaExempt: true,
  },
  riff: {
    palette: [
      "#0B0B0B", "#141414", "#F4F0E8", "#C92533", "#741B24", "#AAA8A6", "#777575",
    ],
    paletteExempt: ["src/app/(riff)/"],
    mediaExempt: true,
  },
  inesvale: {
    palette: [
      "#F2ECE0", "#F7F4ED", "#201C19", "#A65D46", "#6D8795", "#79756F", "#BFB7AC",
    ],
    paletteExempt: ["src/app/(inesvale)/"],
    mediaExempt: true,
  },
  nicopark: {
    palette: [
      "#F8F7F2", "#191919", "#3049F0", "#FF735D", "#F7E36B", "#D5C8FC", "#515151", "#222222",
    ],
    paletteExempt: ["src/app/(nicopark)/"],
    mediaExempt: true,
  },
  poppypatch: {
    palette: [
      "#F7ECD6", "#FAF3E3", "#FBF6EA", "#E58267", "#D96E52", "#F7D4C8",
      "#A8B96C", "#E2EAC7", "#E3B6E0", "#F3E2F2", "#4A2E25", "#735449",
      "#C3A58E",
    ],
    paletteExempt: ["src/app/(poppypatch)/"],
    mediaExempt: true,
  },
  razorline: {
    palette: [
      "#0B0B0A", "#F1F0E9", "#D3FF35", "#375CFF", "#777A7A", "#1C1C1A", "#262624",
    ],
    paletteExempt: ["src/app/(razorline)/"],
    mediaExempt: true,
  },
  nexus: {
    palette: [
      "#221B15", "#362E26", "#685F53", "#FBF8F1", "#F5F1E8", "#FFFFFF",
      "#C85A32", "#D9824B", "#F6D6BA", "#4C7262", "#777B45", "#E5A93C",
      "#E3DAC9",
    ],
    paletteExempt: ["src/app/(nexus)/"],
    mediaExempt: true,
  },
  starriot: {
    palette: [
      "#12041B", "#1E092B", "#2C103B", "#30F0CC", "#FC3CCC",
      "#FCF03C", "#9451FF", "#FF9BB0", "#FFFDF8", "#CAB9D4",
    ],
    paletteExempt: ["src/app/(starriot)/"],
    mediaExempt: true,
  },

  stillwater: { palette: ["#EEE9E0", "#F4F0E8", "#DED7CA", "#34332E", "#253733", "#182521", "#AEBDAF", "#C8AF98", "#FAF8F1"] },
  mercer: {
    palette: [
      "#0A0D10", "#E8ECEF", "#00E5FF", "#1E88E5", "#CCFF00", "#D2FF00",
    ],
    paletteExempt: ["src/app/(mercer)/mercer/continuation/"],
    mediaExempt: true,
  },
  landingx: { palette: ["#BEAA97", "#815751", "#E5DDD7", "#E8EEEE", "#4B3C2E", "#826851"] },
  avel: { palette: ["#CDB3A3", "#F8F5EF", "#243A32", "#FFFFFF", "#E8DDD2", "#5A6A60"] },
  pello: { palette: ["#FFF9F1", "#F2E7E4", "#321C2D", "#653453", "#EF9A9A", "#DCE5BA", "#45624A", "#70616F"] },
  noiseclub: {
    palette: [
      "#050505", "#070808", "#090A0A", "#090B0B", "#0A0B0B", "#0B0C0C",
      "#0B0D0D", "#0C0E0E", "#0D0F0F", "#0E1010", "#111313", "#121414",
      "#131616", "#141717", "#151818", "#161919", "#171A1A", "#171B1A",
      "#181B1B", "#181C1C", "#191D1D", "#191E16", "#1A1D1D", "#1A1E1E",
      "#1B1E1E", "#1B2018", "#1C2020", "#1D2020", "#1D2121", "#1E2121",
      "#1E2222", "#202424", "#232727", "#252A2A", "#262929", "#262A2A",
      "#262B2B", "#282E22", "#2A2E2E", "#2B3024", "#2C3030", "#2D3131",
      "#2E3333", "#2E3434", "#323737", "#3A4040", "#525757", "#8A6619",
      "#8F6B1A", "#B4B2A8", "#BDBAAD", "#C49A38", "#C79B3B", "#C8C6BC",
      "#CBFF49", "#D6D3C9", "#E6C365", "#F0CE73", "#F1EEE5", "#FF6748",
    ],
    paletteExempt: ["src/app/(noiseclub)/noiseclub/components/interactive/"],
    mediaExempt: true,
  },
  warpwander: {
    palette: [
      "#23244F", "#2F644F", "#FFD06A", "#FF907A", "#FFF1D3",
      "#6DDCC5", "#604A79", "#151633", "#171838", "#191A3B",
    ],
    paletteExempt: [
      "src/app/(warpwander)/warpwander/components/product/",
      "src/app/(warpwander)/warpwander/product/",
    ],
    mediaExempt: true,
  },
  ctrlroom: {
    palette: [
      "#050608", "#090E1C", "#0A1020", "#0B0D12", "#0B1121", "#0C1326",
      "#0D0F14", "#0D1529", "#0E1015", "#0F1420", "#111A31", "#131B2E",
      "#132247", "#15203D", "#152347", "#162242", "#162344", "#171A21",
      "#172342", "#17254A", "#181B22", "#182547", "#182649", "#192544",
      "#19284B", "#19284F", "#1A2747", "#1B1F3D", "#1B284A", "#1B2E5E",
      "#1E222B", "#1E2430", "#1E263B", "#262B36", "#26324D", "#272D3A",
      "#2858FF", "#2B303C", "#2C3342", "#3A4252", "#3B4454", "#475166",
      "#495366", "#61728F", "#94A3B8", "#B6D7F7", "#E4FF58", "#E8F0FF",
      "#FC5FA9",
    ],
    mediaExempt: true,
  },
  parallel: {
    palette: [
      "#0B0C0E", "#101315", "#12141A", "#14171C", "#171A1C", "#181B20",
      "#24282B", "#2B303A", "#2D8A61", "#38BDF8", "#666D70", "#6E6E6E",
      "#808080", "#9CA3AF", "#D44D27", "#D94E3E", "#D99B26", "#D9C39E",
      "#E05A47", "#E85D36", "#E8E8E3", "#EFECE6", "#F4F1EA", "#F6F5F1",
      "#FF5522", "#FF6B42", "#FFE4B5",
      // Architectural SVG colors from the upstream Section 04 update.
      "#259A6C", "#454C4F", "#777D7D", "#7A8B90", "#9DA3A2", "#B3B9B7",
      "#B4B8B5", "#B6C3C7", "#BCC1BF", "#BEC2BF", "#BFC4C2", "#C1CCCF",
      "#C5C8C5", "#C5CAC7", "#C6C8C4", "#CFD1CD", "#CFD7D9", "#D4D6D2",
      "#D5DDD9", "#DCDFD9", "#DCEEE6", "#DFEFE8", "#E0DFDA", "#E2E6E4",
      "#E4E5E0", "#E4ECE8", "#E5E4DF", "#F0E3DC", "#F2DFD8", "#F3DBD5",
      "#F5E4DD", "#FAF9F6", "#FFFFFF",
    ],
    paletteExempt: [
      "src/app/(parallel)/parallel/rendering/",
      "src/app/(parallel)/parallel/world/",
    ],
    mediaExempt: true,
  },
  lumen: {
    palette: [
      "#1E2432", "#252C43", "#5B8DEF", "#5BA59A", "#657187", "#8E7CE8",
      "#C9DAFA", "#CBD5E1", "#D8D0F7", "#DDE3EE", "#E6ECF8", "#ECF0F9",
      "#EDF1FA", "#EFF3FA", "#F0F3FA", "#F2F5FC", "#F6DCCA", "#F8F9FC",
      "#F9FAFD", "#FFFFFF",
    ],
    paletteExempt: ["src/app/(lumen)/lumen/glass/"],
    mediaExempt: true,
  },
  morta: {
    palette: ["#000000", "#FFFFFF"],
    paletteExempt: [
      "src/app/(morta)/morta/utils/reliquaryRingBuilder.ts",
      "src/app/(morta)/morta/components/HouseRingStudy3D.tsx",
      "src/app/(morta)/morta/components/ReliquaryRing3D.tsx",
      "src/app/(morta)/morta/architecture/",
      "src/app/(morta)/morta/morta.css",
    ],
  },
  synapxe: {
    palette: [
      "#00F0FF", "#090B0E", "#11161D", "#18222F", "#475569", "#94A3B8",
      "#D4FF00", "#E2E8F0", "#F1F5F9", "#F8FAFC", "#FF007F", "#FF7A00",
    ],
    paletteExempt: ["src/app/(synapxe)/synapxe/data/"],
    mediaExempt: true,
  },
  perigee: {
    palette: ["#000000", "#F6F1EA", "#FFB36B", "#E6F0FF", "#FF8A3D"],
    paletteExempt: ["src/app/(perigee)/perigee/shader/"],
    mediaExempt: true,
  },
  xibalba: {
    palette: ["#040A0E", "#071218", "#EEFAF6", "#FFA33E", "#5FF2C8"],
    paletteExempt: ["src/app/(xibalba)/xibalba/data/"],
  },
  loam: {
    palette: [
      "#080604", "#F0E8D8", "#7A5C43", "#C8E64C", "#F7E7CE", "#F6EFE3",
      "#18120C", "#1C1712", "#2C251D", "#33261B", "#3A4F22", "#3B4F04",
      "#42382C", "#4A4035", "#4E3522", "#5B7809", "#5C3314", "#63452D",
      "#6E8F11", "#73533A", "#7A5B42", "#84AB14", "#8A5229", "#D2C3AE",
      "#D8CBB8", "#E2D6C3", "#E4F882", "#E5886E", "#F4F8FB", "#FF9B54",
      "#FFFFFF", "#FF8A3D", "#FFA751", "#060507", "#0C0805", "#161B14",
      "#8EB2E6", "#FFBE6B", "#F7FAF5", "#131B28", "#2A1F13", "#3E4B37",
      "#4A361D",
    ],
    paletteExempt: ["src/app/(loam)/loam/scene/"],
    mediaExempt: true,
  },
  // night (ground), foam (text), moonlight (the one accent: dial, focus, buttons), plankton (live glow readouts), dusk (muted text), dawn (dawn moments, form errors)
  lowtide: {
    palette: ["#0A0D16", "#ECEFF0", "#EBD9A6", "#8FD3FF", "#7A8494", "#F2B28C"],
    paletteExempt: ["src/app/(lowtide)/lowtide/engine/"], // sky, water, sand and moon colours are scene content
    mediaExempt: true,
  },
  nightline: { palette: ["#081423", "#0D2238", "#F4E8C1", "#F4B65E", "#A7B4C7", "#C97972"] },
  // ink (text, the CTA pill), paper (page), white (the glass), slate (muted text), mist (hairlines, separators),
  // haze (cool fill light, tints), cobalt (the one accent: links, focus, selection), emerald (rare: CTA hover, success)
  cullet: {
    palette: ["#0F1117", "#F4F5F8", "#FFFFFF", "#525866", "#9AA1B2", "#DCE8FF", "#2563EB", "#10B981"],
    paletteExempt: [
      "src/app/(cullet)/cullet/sampler/spectrum.ts", // spectral wavelength stops are optical content, like a photograph of a caustic
    ],
  },
  amaoto: { palette: ["#1A1613", "#F4ECDD", "#F2B8C6", "#D9748F", "#C8412B", "#B8923A", "#2B3A55"] },
  // house (paper), white (windows, glass), ink (text, the dark house), night (raised dark surfaces), graphite (muted text),
  // cue (the one accent: the wave, the count, focus), cue light (the accent on the dark house), tape (rare: spike marks, the ghost light)
  understudy: { palette: ["#F4F4F1", "#FFFFFF", "#0D0D10", "#1A1A1F", "#66666E", "#5B3CF0", "#AE9CFF", "#FFC547"] },
  firstday: { palette: ["#F5F6F2", "#242B29", "#D3E6D5", "#778F80", "#FFFFFF", "#E9E9E3", "#CAD4F1", "#F1C7A8"] },
  flori: { palette: ["#FFF9F0", "#344C40", "#F1C6CF", "#D8D1EC", "#D9E6C8", "#F5DF9B", "#EDB997", "#91AAA0"] },
  // cream (paper), plum (ink, text), blush (pastel tint), bubblegum (the one action colour), butter / mint / sky / lilac (flavour pastels, section grounds)
  pipkin: { palette: ["#FFF8EC", "#3B2A47", "#FFD6E2", "#FF9DBB", "#FFEBA6", "#CBEBDA", "#CDE5F8", "#E3D8F6"] },
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
    mediaExempt: true,
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
  fixture: {
    // ink (text, dark slabs), paper (page), white (store canvas, cards), crimson (the one accent),
    // graphite (muted text), hairline (rules, grid), till green (OPEN sign and orders only)
    palette: ["#121316", "#F3F2EE", "#FFFFFF", "#CF1F35", "#5E6168", "#D9D7D0", "#1E7A4C"],
  },
  chinagraph: {
    // film black (ground, text on flash), flash white (text, the shop and the sheet paper), chinagraph yellow (grease-pencil marks only)
    palette: ["#0C0C0B", "#F4F3EF", "#F3C318"],
  },
  valence: {
    // plum ink, cloud porcelain, lavender mist, pistachio mint, peach sorbet, periwinkle iris, muted mauve, coral rose
    palette: ["#1E1B2E", "#FBF9F5", "#E8E0F8", "#D9F2E6", "#FCE2D5", "#5B46E8", "#645D7A", "#D9385A"],
  },
  serein: {
    palette: ["#24343A", "#F6F0E5", "#A8D6CC", "#C7BCE6"],
  },
  nulo: {
    // paper, ink, lilac focus field, peach action marker, mint signal
    palette: ["#F5F8F4", "#14232B", "#B8B3FF", "#FFB49D", "#9ADBD1"],
  },
  assemblage: {
    // paper (ground), ink (type and dark slabs), sand (stock), vermilion (action), teal (image field), ochre (signal), plum (rare ink)
    palette: ["#F6F0E8", "#1E1D1B", "#E2D8C9", "#D95F3F", "#1D6C63", "#E7C65A", "#8F4E70"],
  },
};

// Gallery registration is the authoritative source for dates/download availability.
export const TEMPLATES = Object.fromEntries(RAW_TEMPLATES.map((template) => [template.slug, {
  ...PALETTES[template.slug], createdAt: template.createdAt, hasDownload: Boolean(template.hasDownload),
}])) as Record<TemplateSlug, TemplateConfig>;

export type SourceFile = { path: string; source: string };

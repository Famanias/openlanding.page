export type TemplateSlug = "orrery" | "keytu" | "koji" | "trace" | "calder" | "vector" | "morrow" | "loophouse" | "wowflutter";

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
    palette: ["#000000", "#102B3F", "#FFFFFF"],
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
};

export type SourceFile = { path: string; source: string };

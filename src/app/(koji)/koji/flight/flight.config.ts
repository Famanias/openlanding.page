import { COURSE_GROUPS, type CourseGroupId } from "../menu";

export type Seam = "clip" | "slabWipe";

export type Flight = {
  sections: { id: CourseGroupId; label: string; jp: string; courses: readonly { n: number; name: string; detail: string }[] }[];
  /** One per join between scenes. "slabWipe" = no connector clip; a concrete panel sweeps across the cut. */
  seams: Seam[];
};

/** Viewport-heights of scroll per clip (scroll-world defaults). */
export const DIVE_SCROLL = 1.3;
export const CONN_SCROLL = 0.9;

export const FLIGHT: Flight = {
  sections: COURSE_GROUPS.map((g) => ({ id: g.id, label: g.label, jp: g.jp, courses: g.courses })),
  // Set a seam to "slabWipe" when its connector can't pass scripts/seam-check.sh.
  seams: ["clip", "clip", "clip", "clip"],
};

export type EngineSection = {
  id: string;
  label: string;
  still: string;
  clip: string;
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
};

export type EngineConfig = {
  sections: EngineSection[];
  connectors: (string | null)[];
  diveScroll: number;
  connScroll: number;
  nav: false;
  atmosphere: false;
  hint: string;
};

/** Maps the flight to scroll-world's `mountScrollWorld` config. Slab-wipe seams become null connectors. */
export function toEngineConfig(f: Flight, base: string, stillBase = "/templates/koji"): EngineConfig {
  const uniqueNames = (s: Flight["sections"][number]) => Array.from(new Set(s.courses.map((c) => c.name)));
  return {
    sections: f.sections.map((s, i) => ({
      id: s.id,
      label: s.label,
      still: `${stillBase}/flight-${s.id}-1600.webp`,
      clip: `${base}/dive-${i + 1}.mp4`,
      eyebrow: `${s.jp} · Courses ${s.courses.map((c) => String(c.n).padStart(2, "0")).join(", ")}`,
      title: uniqueNames(s).join(" · "),
      body: s.courses.map((c) => c.detail).join(" / "),
      accent: "var(--color-shu)",
    })),
    connectors: f.seams.map((seam, i) => (seam === "clip" ? `${base}/conn-${i + 1}-${i + 2}.mp4` : null)),
    diveScroll: DIVE_SCROLL,
    connScroll: CONN_SCROLL,
    nav: false,
    atmosphere: false,
    hint: "Scroll through the courses",
  };
}

/** Total scroll height of the flight in viewport-heights (the engine adds one viewport so the last clip completes). */
export function flightHeightVh(f: Flight): number {
  const conns = f.seams.filter((s) => s === "clip").length;
  return f.sections.length * DIVE_SCROLL + conns * CONN_SCROLL + 1;
}

/** Where each slab-wipe cut happens, in viewport-heights from the top of the flight. */
export function seamOffsetsVh(f: Flight): number[] {
  const offsets: number[] = [];
  let y = 0;
  f.sections.forEach((_, i) => {
    y += DIVE_SCROLL;
    const seam = f.seams[i];
    if (seam === "clip") y += CONN_SCROLL;
    else if (seam === "slabWipe") offsets.push(Math.round(y * 1000) / 1000);
  });
  return offsets;
}

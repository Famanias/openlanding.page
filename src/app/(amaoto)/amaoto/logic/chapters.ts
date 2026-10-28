import { paperPoint } from "../model/rig";
import { addVec3, clamp01, lerp, lerpVec3, smoothstep, type Vec3 } from "./rng";
export type Tool = "anatomy" | "light" | "making" | null;
export type Chapter = {
  index: number;
  id: string;
  numberLabel: string;
  title: string;
  markerLabel: string;
  headline: string;
  subline?: string;
  copy: string;
  specimenNote: string;
  startProgress: number;
  restProgress: number;
  secondaryRestProgress?: number;
  endProgress: number;
  tool: Tool;
  toolButtonLabel?: string;
};
export const WORLD_CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "top",
    numberLabel: "01",
    title: "Threshold",
    markerLabel: "Paper-lit threshold",
    headline: "雨音",
    subline: "The sound of rain, kept dry.",
    copy: "Commission a hand-built oil-paper umbrella, tuned to the weather you will carry it through.",
    specimenNote: "40 ribs / one quiet mechanism",
    startProgress: 0,
    restProgress: 0,
    endProgress: 0.14,
    tool: null,
  },
  {
    index: 1,
    id: "structure",
    numberLabel: "02",
    title: "Structure",
    markerLabel: "Bamboo workshop",
    headline: "Forty ribs, one breath.",
    copy: "Choose a part on the umbrella or in the index. Look closer, move it, and follow how it belongs to the whole.",
    specimenNote: "Bamboo / paper / thread",
    startProgress: 0.14,
    restProgress: 0.18,
    endProgress: 0.33,
    tool: "anatomy",
    toolButtonLabel: "Inspect the structure",
  },
  {
    index: 2,
    id: "light",
    numberLabel: "03",
    title: "Paper",
    markerLabel: "Into the paper",
    headline: "Paper that listens to light.",
    copy: "Thin washi is not a surface. It is a membrane. Put the sun behind it and the fibres answer.",
    specimenNote: "Washi / painted paper gores",
    startProgress: 0.33,
    restProgress: 0.45,
    endProgress: 0.58,
    tool: null,
  },
  {
    index: 3,
    id: "canopy",
    numberLabel: "04",
    title: "Weather",
    markerLabel: "Dusk street",
    headline: "Choose your canopy.",
    copy: "One structure, four moods. The motif is painted into the paper before the last binding.",
    specimenNote: "Drag to turn / painted in the paper",
    startProgress: 0.58,
    restProgress: 0.66,
    secondaryRestProgress: 0.72,
    endProgress: 0.78,
    tool: "light",
    toolButtonLabel: "Explore light",
  },
  {
    index: 4,
    id: "making",
    numberLabel: "05",
    title: "Craft",
    markerLabel: "At the workbench",
    headline: "Eighty-one quiet steps.",
    copy: "From split bamboo to the last knot, every gesture stays visible in the object.",
    specimenNote: "81 quiet making steps",
    startProgress: 0.78,
    restProgress: 0.86,
    endProgress: 0.93,
    tool: "making",
    toolButtonLabel: "Follow the making",
  },
  {
    index: 5,
    id: "commission",
    numberLabel: "06",
    title: "Commission",
    markerLabel: "Genkan return",
    headline: "Made for the weather ahead.",
    copy: "Tell us where you will carry it. We will answer with a paper, bamboo and palette that belongs there.",
    specimenNote: "Kurokawa / 1963",
    startProgress: 0.93,
    restProgress: 1,
    endProgress: 1,
    tool: null,
  },
];
export const REST_POINTS = [0, 0.18, 0.45, 0.66, 0.72, 0.86, 1] as const;
export const WORLD_NAMES = [
  "threshold",
  "workshop",
  "paper",
  "street",
  "bench",
  "genkan",
] as const;
export type WorldName = (typeof WORLD_NAMES)[number];
export const WORLD_ANCHORS: Vec3[] = [
  [0, 0, 0],
  [14, 0, -10],
  [14, 0, -10],
  [30, 0, -22],
  [44, 0, -30],
  [58, 0, -40],
];
export function getUmbrellaAnchor(p: number): Vec3 {
  p = clamp01(p);
  let anchor: Vec3 = [...WORLD_ANCHORS[0]];
  // Travel in the seams; hold each place through its primary and secondary rests.
  for (let i = 1; i < WORLD_CHAPTERS.length; i++) {
    const b = WORLD_CHAPTERS[i].startProgress;
    anchor = lerpVec3(
      anchor,
      WORLD_ANCHORS[i],
      smoothstep(b - 0.035, i === 4 ? 0.8 : b + 0.035, p),
    );
  }
  return anchor;
}
export function getChapterStateAtProgress(value: number) {
  const progress = clamp01(value);
  const activeChapterIndex = Math.max(
    0,
    WORLD_CHAPTERS.findLastIndex((c) => progress >= c.startProgress),
  );
  const activeChapter = WORLD_CHAPTERS[activeChapterIndex];
  // Adjacent worlds overlap for .05 around each boundary; these weights partition unity.
  const transitions = WORLD_CHAPTERS.slice(1).map((c) =>
    smoothstep(c.startProgress - 0.025, c.startProgress + 0.025, progress),
  );
  const weights = WORLD_CHAPTERS.map(
    (_, i) => (i ? transitions[i - 1] : 1) * (i === 5 ? 1 : 1 - transitions[i]),
  );
  const worldVisibility = Object.fromEntries(
    WORLD_NAMES.map((name, i) => [name, weights[i]]),
  ) as Record<WorldName, number>;
  const chapterOpacities = WORLD_CHAPTERS.map((c, i) =>
    Math.min(
      i ? smoothstep(c.startProgress, c.startProgress + 0.035, progress) : 1,
      i === 5
        ? 1
        : 1 - smoothstep(c.endProgress - 0.035, c.endProgress, progress),
    ),
  );
  // .31–.405 enters the material; .52–.60 returns to the complete canopy.
  const paperDive =
    smoothstep(0.31, 0.405, progress) * (1 - smoothstep(0.52, 0.6, progress));
  return {
    progress,
    activeChapterIndex,
    activeChapter,
    chapterOpacities,
    worldVisibility,
    subRest:
      activeChapterIndex === 3
        ? progress < 0.69
          ? ("calm" as const)
          : ("street" as const)
        : null,
    paperDive,
    oilSoak: smoothstep(0.405, 0.515, progress),
    rainIntensity:
      smoothstep(0.59, 0.72, progress) * (1 - smoothstep(0.77, 0.82, progress)),
    lanternGlow: Math.max(weights[3], weights[5] * 0.7),
    benchAssembly: smoothstep(0.8, 0.91, progress),
    genkanSettle: smoothstep(0.93, 1, progress),
    paperLitMode: clamp01(weights[0] + weights[2] + weights[4] * 0.72),
    open: smoothstep(0, 0.1, progress) * (1 - smoothstep(0.94, 1, progress)),
    anchor: getUmbrellaAnchor(progress),
  };
}
export type ChapterProgressState = ReturnType<typeof getChapterStateAtProgress>;
export function getNearestChapterSnapProgress(p: number) {
  p = clamp01(p);
  return REST_POINTS.reduce<number>(
    (best, n) => (Math.abs(n - p) < Math.abs(best - p) ? n : best),
    0,
  );
}
export function getNextChapterProgress(p: number, direction: 1 | -1) {
  p = clamp01(p);
  const nearest = getNearestChapterSnapProgress(p);
  if (Math.abs(p - nearest) > 0.025 && Math.sign(nearest - p) === direction)
    return nearest;
  const index = REST_POINTS.indexOf(nearest as (typeof REST_POINTS)[number]);
  return REST_POINTS[
    Math.max(0, Math.min(REST_POINTS.length - 1, index + direction))
  ];
}
export type CameraKeyframe = {
  progress: number;
  position: Vec3;
  target: Vec3;
  fov: number;
  focusDistance: number;
};
const patch = paperPoint(1, 4, 0.68, 0.5);
export const PAPER_PATCH: Vec3 = [patch.x, patch.y, patch.z];
export const PAPER_NORMAL: Vec3 = [0.197, 0.966, 0.168];
const patchOffset = (n: number, tangent = 0): Vec3 =>
  PAPER_PATCH.map(
    (v, i) => v + PAPER_NORMAL[i] * n + (i === 0 ? tangent : 0),
  ) as Vec3;
const key = (
  p: number,
  position: Vec3,
  target: Vec3,
  fov: number,
  focusDistance: number,
): CameraKeyframe => ({
  progress: p,
  position: addVec3(getUmbrellaAnchor(p), position),
  target: addVec3(getUmbrellaAnchor(p), target),
  fov,
  focusDistance,
});
export const CAMERA_KEYFRAMES = [
  key(0, [4, 2.2, 10], [0, 0.25, 0], 34, 11),
  key(0.1, [3.5, 3, 9.5], [0, 0.3, 0], 34, 10.5),
  key(0.18, [4, 1.8, 8.5], [0, 0.4, 0], 38, 9.5),
  key(0.31, [2.8, 2.2, 8], [0, 1, 0], 38, 8.5),
  key(0.36, patchOffset(0.65), patchOffset(-0.85), 42, 1.5),
  key(0.4, patchOffset(-0.2), patchOffset(-0.85), 46, 0.65),
  key(0.45, patchOffset(-0.5, 0.2), patchOffset(-1.1), 46, 0.65),
  key(0.54, patchOffset(-0.2), patchOffset(-0.85), 46, 0.65),
  key(0.57, patchOffset(0.65), patchOffset(-0.85), 40, 1.5),
  key(0.61, [3, 1, 9], [0, 0.3, 0], 40, 10),
  key(0.66, [4, 0.1, 10.5], [0, 0.2, 0], 40, 11.2),
  key(0.72, [6, 0.4, 13], [0, 0.2, 0], 44, 14.3),
  key(0.8, [-2, 7, 8], [-2, -0.5, -1], 36, 11),
  key(0.86, [4.5, 7, 7], [0, -0.3, 0], 36, 11),
  key(0.91, [6, 7, 8], [2, -0.5, -1], 36, 11),
  key(1, [4, 2, 10], [0, -0.3, 0], 34, 11),
];
function spline(a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number): Vec3 {
  return b.map((v, i) => {
    const n =
      0.5 *
      (2 * v +
        (-a[i] + c[i]) * t +
        (2 * a[i] - 5 * v + 4 * c[i] - d[i]) * t * t +
        (-a[i] + 3 * v - 3 * c[i] + d[i]) * t * t * t);
    return Math.max(Math.min(v, c[i]), Math.min(Math.max(v, c[i]), n));
  }) as Vec3;
}
export function computeCameraPoseAtProgress(value: number) {
  const p = clamp01(value);
  let i = 0;
  const exact = CAMERA_KEYFRAMES.find((k) => k.progress === p);
  if (exact)
    return {
      position: [...exact.position] as Vec3,
      target: [...exact.target] as Vec3,
      fov: exact.fov,
      focusDistance: exact.focusDistance,
    };
  while (
    i < CAMERA_KEYFRAMES.length - 2 &&
    p > CAMERA_KEYFRAMES[i + 1].progress
  )
    i++;
  const b = CAMERA_KEYFRAMES[i],
    c = CAMERA_KEYFRAMES[i + 1],
    a = CAMERA_KEYFRAMES[Math.max(0, i - 1)],
    d = CAMERA_KEYFRAMES[Math.min(CAMERA_KEYFRAMES.length - 1, i + 2)];
  const t = smoothstep(b.progress, c.progress, p),
    position = spline(a.position, b.position, c.position, d.position, t);
  position[1] = Math.max(-2.25, position[1]);
  return {
    position,
    target: spline(a.target, b.target, c.target, d.target, t),
    fov: lerp(b.fov, c.fov, t),
    focusDistance: lerp(b.focusDistance, c.focusDistance, t),
  };
}

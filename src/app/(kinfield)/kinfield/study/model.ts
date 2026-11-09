export const zones = ["shoulders", "hips", "spine"] as const;
export const levels = ["new", "familiar", "experienced"] as const;
export type Zone = typeof zones[number];
export type Level = typeof levels[number];
type Routine = { steps: readonly [string, string, string]; minutes: number };

export const routines: Record<Zone, Record<Level, Routine>> = {
  shoulders: {
    new: { steps: ["Slow shoulder rolls", "Gentle wall slides", "Relaxed arm reaches"], minutes: 6 },
    familiar: { steps: ["Controlled scapular circles", "Standing wall angels", "Cross-body reach sequence"], minutes: 9 },
    experienced: { steps: ["Long-lever arm arcs", "Controlled overhead reaches", "Slow eccentric lowering"], minutes: 12 },
  },
  hips: {
    new: { steps: ["Supported hip circles", "Easy standing marches", "Seated figure-four mobility"], minutes: 6 },
    familiar: { steps: ["Standing hip hinges", "Side-to-side weight shifts", "Controlled lunging reach"], minutes: 9 },
    experienced: { steps: ["Deep supported hip transitions", "Slow lateral lunge pulses", "Single-leg balance arcs"], minutes: 12 },
  },
  spine: {
    new: { steps: ["Seated torso turns", "Gentle cat-cow sequence", "Relaxed standing extensions"], minutes: 6 },
    familiar: { steps: ["Segmental spinal waves", "Open-book rotations", "Controlled roll-downs"], minutes: 9 },
    experienced: { steps: ["Slow articulated roll-downs", "Multi-plane rotation sequence", "Controlled extension-to-flexion"], minutes: 12 },
  },
};

export function moveLevel(level: Level, direction: -1 | 1): Level {
  return levels[Math.max(0, Math.min(levels.length - 1, levels.indexOf(level) + direction))];
}

export const classes = [
  { id: "groundwork", name: "Groundwork", day: "MON", time: "08:30", duration: "45 min", focus: "Mobility", intensity: "Gentle" },
  { id: "range", name: "Range Lab", day: "TUE", time: "17:30", duration: "50 min", focus: "Controlled movement", intensity: "Moderate" },
  { id: "strength", name: "Slow Strength", day: "THU", time: "09:00", duration: "45 min", focus: "Mindful load", intensity: "Moderate" },
  { id: "unwind", name: "Unwind", day: "SAT", time: "10:30", duration: "40 min", focus: "Restoration", intensity: "Gentle" },
] as const;
export type ClassId = typeof classes[number]["id"];

export function validatePreview(date: string, classId: string, today: string): string {
  if (!classes.some((item) => item.id === classId)) return "Choose a class to preview.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Choose a date for your preview.";
  const parsed = new Date(date + "T00:00:00Z");
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) return "Choose a valid date.";
  if (date < today) return "Choose today or a later date.";
  return "";
}

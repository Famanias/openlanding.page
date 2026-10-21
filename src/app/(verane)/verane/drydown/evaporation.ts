export type OlfactoryTier = "top" | "heart" | "base";

export type NoteState = "emerging" | "present" | "fading" | "gone";

export interface Note {
  name: string;
  tier: OlfactoryTier;
  onset: number; // hour fully present (e.g. 0, 0.3)
  fade: number; // hour starts to dissipate
  gone: number; // hour completely evaporated
  description: string;
}

export interface NoteCalculated {
  intensity: number; // 0..1
  remaining: number; // 0..1
  state: NoteState;
}

export interface TierLevels {
  top: number;
  heart: number;
  base: number;
}

/** Calculate the instant intensity, remaining volume, and state of a note at a given hour. */
export function calculateNoteState(note: Note, hour: number): NoteCalculated {
  const h = Math.max(0, hour);
  const { onset, fade, gone } = note;

  // Remaining (in flacon/on skin): 1 until fade, linearly 0 at gone
  let remaining = 1;
  if (h <= fade) {
    remaining = 1;
  } else if (h >= gone) {
    remaining = 0;
  } else {
    remaining = Math.max(0, Math.min(1, 1 - (h - fade) / (gone - fade)));
  }

  // Intensity (olfactory prominence):
  let intensity = 0;
  let state: NoteState = "present";

  if (h >= gone) {
    intensity = 0;
    state = "gone";
  } else if (h >= fade) {
    intensity = remaining;
    state = "fading";
  } else if (h < onset) {
    state = "emerging";
    const rampDuration = Math.min(onset, 0.5);
    if (rampDuration > 0 && h >= onset - rampDuration) {
      intensity = (h - (onset - rampDuration)) / rampDuration;
    } else {
      intensity = 0;
    }
  } else {
    intensity = 1;
    state = "present";
  }

  return {
    intensity: Math.max(0, Math.min(1, intensity)),
    remaining: Math.max(0, Math.min(1, remaining)),
    state,
  };
}

/** Calculate the liquid levels across the three flacon tiers (top, heart, base). */
export function calculateTierLevels(notes: Note[], hour: number): TierLevels {
  const levels: TierLevels = { top: 0, heart: 0, base: 0 };

  for (const tier of ["top", "heart", "base"] as const) {
    const tierNotes = notes.filter((n) => n.tier === tier);
    if (tierNotes.length === 0) {
      levels[tier] = 0;
    } else {
      let maxRemaining = 0;
      for (const n of tierNotes) {
        const { remaining } = calculateNoteState(n, hour);
        if (remaining > maxRemaining) maxRemaining = remaining;
      }
      levels[tier] = maxRemaining;
    }
  }

  return levels;
}

/** Returns the dominant tier at the given hour. */
export function getDominantTier(notes: Note[], hour: number): OlfactoryTier {
  const intensities: Record<OlfactoryTier, number> = { top: 0, heart: 0, base: 0 };

  for (const n of notes) {
    const { intensity } = calculateNoteState(n, hour);
    intensities[n.tier] += intensity;
  }

  // Determine highest with tie-breaking top -> heart -> base
  let bestTier: OlfactoryTier = "top";
  let maxScore = intensities.top;

  if (intensities.heart > maxScore) {
    bestTier = "heart";
    maxScore = intensities.heart;
  }
  if (intensities.base > maxScore) {
    bestTier = "base";
  }

  return bestTier;
}

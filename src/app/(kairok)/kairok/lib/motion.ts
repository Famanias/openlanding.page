import { FLYTHROUGH_DURATION_SEC, SEQUENCE_FRAME_COUNT } from './assets';

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp01(t);
}

export function segment(progress: number, start: number, end: number): number {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp01((progress - start) / (end - start));
}

export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export type StoryBeatId =
  | 'hero'
  | 'approach'
  | 'aperture'
  | 'arrival'
  | 'field-notes'
  | 'handoff';

export interface StoryBeatMeta {
  id: StoryBeatId;
  indexLabel: string;
  shortTitle: string;
  caption: string;
}

export const STORY_BEATS: Record<StoryBeatId, StoryBeatMeta> = {
  hero: {
    id: 'hero',
    indexLabel: '01 / THE OBJECT',
    shortTitle: 'THE OBJECT',
    caption: 'See beyond the expected.',
  },
  approach: {
    id: 'approach',
    indexLabel: '02 / THE APPROACH',
    shortTitle: 'THE APPROACH',
    caption: 'Look closer.',
  },
  aperture: {
    id: 'aperture',
    indexLabel: '03 / THE APERTURE',
    shortTitle: 'THE APERTURE',
    caption: 'Every detail changes the story.',
  },
  arrival: {
    id: 'arrival',
    indexLabel: '04 / THROUGH THE FRAME',
    shortTitle: 'THROUGH THE FRAME',
    caption: 'Make the ordinary impossible to overlook.',
  },
  'field-notes': {
    id: 'field-notes',
    indexLabel: '05 / FIELD NOTES',
    shortTitle: 'FIELD NOTES',
    caption: 'A world worth noticing.',
  },
  handoff: {
    id: 'handoff',
    indexLabel: '06 / THE HANDOFF',
    shortTitle: 'THE HANDOFF',
    caption: 'Form meets focus.',
  },
};

export interface ComputedStoryState {
  progress: number;
  beat: StoryBeatId;
  beatMeta: StoryBeatMeta;
  stepNumber: number; // 1..6
  /** Normalized progress of the flythrough video/sequence (0..1) */
  videoProgress: number;
  /** 1-based sequence frame index (1..120) */
  sequenceFrame: number;
  /** Target video time in seconds (0..7.91) */
  videoTimeSec: number;
  /** Opacity of Scene 1 Hero overlay & cutout */
  heroOpacity: number;
  /** Y-translation of Hero headline in px */
  heroTranslateY: number;
  /** Scale of foreground camera cutout during initial push */
  heroCutoutScale: number;
  /** Opacity of foreground camera cutout (fades smoothly into aligned video frame) */
  heroCutoutOpacity: number;
  /** Opacity of Scene 2 approach annotation */
  approachOpacity: number;
  /** Opacity of Scene 3 aperture reticle & transient copy */
  apertureOpacity: number;
  /** Rotation of subtle optical reticle in degrees */
  apertureRotationDeg: number;
  /** Warm copper optical glint opacity around aperture threshold */
  copperGlintOpacity: number;
  /** Opacity of Scene 4 arrival headline */
  arrivalOpacity: number;
  /** Opacity of Scene 5 field notes hotspots & focus explorer */
  fieldNotesOpacity: number;
  /** Whether Scene 5 interactive hotspots should receive pointer events */
  fieldNotesInteractive: boolean;
  /** Progress of Scene 6 optical handoff curtain (0..1) */
  handoffProgress: number;
}

export function getBeatFromProgress(p: number): StoryBeatId {
  const clamped = clamp01(p);
  if (clamped < 0.12) return 'hero';
  if (clamped < 0.29) return 'approach';
  if (clamped < 0.48) return 'aperture';
  if (clamped < 0.66) return 'arrival';
  if (clamped < 0.86) return 'field-notes';
  return 'handoff';
}

export function computeStoryState(rawProgress: number): ComputedStoryState {
  const p = clamp01(rawProgress);
  const beat = getBeatFromProgress(p);
  const beatMeta = STORY_BEATS[beat];

  const stepMap: Record<StoryBeatId, number> = {
    hero: 1,
    approach: 2,
    aperture: 3,
    arrival: 4,
    'field-notes': 5,
    handoff: 6,
  };

  // Map scroll progress 0.06..0.64 to full 0..1 video scrubbing so:
  // - 0.00..0.06: Camera sits poised in studio (frame 1)
  // - 0.06..0.29: Push toward lens (frames 1..50)
  // - 0.29..0.48: Inside the optical barrel & iris opening (frames 50..88)
  // - 0.48..0.64: Emerges into wet city street & settles at frame 120
  // - 0.64..1.00: Holds stable city frame 120 for Field Notes & Handoff
  const videoProgress = smoothstep(segment(p, 0.06, 0.64));
  const sequenceFrame = Math.max(
    1,
    Math.min(SEQUENCE_FRAME_COUNT, Math.round(1 + videoProgress * (SEQUENCE_FRAME_COUNT - 1)))
  );
  const videoTimeSec = Number((videoProgress * FLYTHROUGH_DURATION_SEC).toFixed(3));

  // Scene 1: Hero copy & cutout
  const heroFadeOut = smoothstep(segment(p, 0.08, 0.21));
  const heroOpacity = 1 - heroFadeOut;
  const heroTranslateY = -lerp(0, 72, heroFadeOut);

  // Foreground cutout aligns at rest and crossfades cleanly into video as approach starts
  const cutoutFade = smoothstep(segment(p, 0.04, 0.14));
  const heroCutoutOpacity = 1 - cutoutFade;
  const heroCutoutScale = lerp(1, 1.08, smoothstep(segment(p, 0, 0.14)));

  // Scene 2: Approach subtle caption
  const approachIn = smoothstep(segment(p, 0.13, 0.18));
  const approachOut = smoothstep(segment(p, 0.24, 0.29));
  const approachOpacity = clamp01(approachIn - approachOut);

  // Scene 3: Aperture optical pass & "Every detail changes the story."
  const apertureIn = smoothstep(segment(p, 0.29, 0.34));
  const apertureOut = smoothstep(segment(p, 0.43, 0.48));
  const apertureOpacity = clamp01(apertureIn - apertureOut);
  const apertureRotationDeg = lerp(-18, 24, segment(p, 0.26, 0.50));

  // Subtle warm copper flash right as the iris blades part (around p = 0.44..0.52)
  const glintIn = smoothstep(segment(p, 0.42, 0.47));
  const glintOut = smoothstep(segment(p, 0.47, 0.54));
  const copperGlintOpacity = clamp01(glintIn - glintOut) * 0.38;

  // Scene 4: City arrival caption ("Make the ordinary impossible to overlook.")
  const arrivalIn = smoothstep(segment(p, 0.50, 0.55));
  const arrivalOut = smoothstep(segment(p, 0.62, 0.67));
  const arrivalOpacity = clamp01(arrivalIn - arrivalOut);

  // Scene 5: Field notes interactive stage (0.64..0.88)
  const fieldIn = smoothstep(segment(p, 0.64, 0.69));
  const fieldOut = smoothstep(segment(p, 0.85, 0.90));
  const fieldNotesOpacity = clamp01(fieldIn - fieldOut);
  const fieldNotesInteractive = p >= 0.63 && p <= 0.89;

  // Scene 6: Handoff iris/veil transition (0.86..1.00)
  const handoffProgress = smoothstep(segment(p, 0.86, 1.0));

  return {
    progress: p,
    beat,
    beatMeta,
    stepNumber: stepMap[beat],
    videoProgress,
    sequenceFrame,
    videoTimeSec,
    heroOpacity,
    heroTranslateY,
    heroCutoutScale,
    heroCutoutOpacity,
    approachOpacity,
    apertureOpacity,
    apertureRotationDeg,
    copperGlintOpacity,
    arrivalOpacity,
    fieldNotesOpacity,
    fieldNotesInteractive,
    handoffProgress,
  };
}

export interface WaitlistValidationResult {
  valid: boolean;
  error?: string;
  normalizedEmail: string;
}

export function validateWaitlistInput(email: string): WaitlistValidationResult {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Please enter an email address to receive KAIRO K-01 concept updates.',
      normalizedEmail: '',
    };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmed)) {
    return {
      valid: false,
      error: 'Please enter a valid email address (for example, name@domain.com).',
      normalizedEmail: trimmed.toLowerCase(),
    };
  }
  return {
    valid: true,
    normalizedEmail: trimmed.toLowerCase(),
  };
}

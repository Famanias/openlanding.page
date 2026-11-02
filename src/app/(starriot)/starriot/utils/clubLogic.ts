export interface ScrollStageState {
  progress: number;
  phaseIndex: 0 | 1 | 2;
  phaseId: 'warmup' | 'turnup' | 'allout';
  phaseLabel: 'WARM UP' | 'TURN UP' | 'ALL OUT';
  headline: string;
  subcopy: string;
  bpm: number;
  ringScale: number;
  starRotation: number;
  dancerOffset: number;
}

export function clamp01(val: number): number {
  if (Number.isNaN(val)) return 0;
  return Math.max(0, Math.min(1, val));
}

export function computeScrollStage(rawProgress: number): ScrollStageState {
  const progress = clamp01(rawProgress);

  let phaseIndex: 0 | 1 | 2 = 0;
  let phaseId: 'warmup' | 'turnup' | 'allout' = 'warmup';
  let phaseLabel: 'WARM UP' | 'TURN UP' | 'ALL OUT' = 'WARM UP';
  let headline = 'FEEL THE BASSLINE WAKE THE ROOM.';
  let subcopy = '10:00 PM — Warm analog synth washes, slow-spinning mirror facets, first drinks at the neon bar.';
  let bpm = 116;

  if (progress >= 0.67) {
    phaseIndex = 2;
    phaseId = 'allout';
    phaseLabel = 'ALL OUT';
    headline = 'LOSE YOURSELF. FIND YOUR PEOPLE.';
    subcopy = '01:30 AM — Full supernova eruption. Confetti storms, peak-hour disco edits, zero strangers left on the floor.';
    bpm = 128;
  } else if (progress >= 0.34) {
    phaseIndex = 1;
    phaseId = 'turnup';
    phaseLabel = 'TURN UP';
    headline = 'THE FLOOR LOCKS INTO ORBIT.';
    subcopy = '11:30 PM — Concentric sub-bass waves expand across the room as the main deck drops electric house & nu-disco.';
    bpm = 122;
  }

  const ringScale = Number((0.65 + progress * 0.85).toFixed(3));
  const starRotation = Number((progress * 72 - 18).toFixed(2));
  const dancerOffset = Number(((1 - progress) * 48).toFixed(2));

  return {
    progress,
    phaseIndex,
    phaseId,
    phaseLabel,
    headline,
    subcopy,
    bpm,
    ringScale,
    starRotation,
    dancerOffset,
  };
}

export interface GuestlistInput {
  name: string;
  email: string;
  nightPreference: string;
}

export interface GuestlistValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    nightPreference?: string;
  };
  passCode?: string;
}

const VALID_NIGHTS = ['friday-frequency', 'saturday-starburst', 'sunday-slowburn', 'all-nights'];

export function validateGuestlistSubmission(input: GuestlistInput): GuestlistValidationResult {
  const errors: GuestlistValidationResult['errors'] = {};
  const trimmedName = (input.name || '').trim();
  const trimmedEmail = (input.email || '').trim();
  const pref = (input.nightPreference || '').trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name or dance-floor alias (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter an email address for your demo club pass.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g. you@domain.com).';
  }

  if (pref && !VALID_NIGHTS.includes(pref)) {
    errors.nightPreference = 'Please choose a valid club night.';
  }

  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    return { valid: false, errors };
  }

  // Deterministic pass code based on name + email
  const cleanUpper = trimmedName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4).padEnd(4, 'X');
  let hash = 0;
  for (let i = 0; i < trimmedEmail.length; i++) {
    hash = (hash * 31 + trimmedEmail.charCodeAt(i)) % 900 + 100;
  }
  const passCode = `SR-${cleanUpper}-${hash}`;

  return {
    valid: true,
    errors: {},
    passCode,
  };
}

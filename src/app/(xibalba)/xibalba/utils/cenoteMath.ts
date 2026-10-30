/**
 * Pure math and state helper functions for Xibalba: Night of the Jade Cenote.
 * Decoupled from DOM/Canvas so all coordinate, physics, sprite-crop, and validation
 * logic can be deterministically unit-tested.
 */

export interface SpriteCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const SPRITE_SHEET_WIDTH = 1024;
export const SPRITE_SHEET_HEIGHT = 765;

export const SPRITE_CROPS: Record<string, SpriteCrop> = {
  spirit1: { x: 15, y: 42, w: 310, h: 260 },
  spirit2: { x: 358, y: 55, w: 235, h: 225 },
  spirit3: { x: 624, y: 48, w: 178, h: 292 },
  spirit4: { x: 832, y: 24, w: 145, h: 520 },
  batUp: { x: 45, y: 405, w: 280, h: 285 },
  batDown: { x: 358, y: 485, w: 435, h: 185 },
};

/**
 * Computes normalized CSS background-size, background-position, and aspect-ratio
 * for a given sprite crop on the 1024x765 normalized sheet.
 */
export function computeSpriteCssMetrics(crop: SpriteCrop): {
  backgroundSizeX: number;
  backgroundSizeY: number;
  backgroundPosX: number;
  backgroundPosY: number;
  aspectRatio: string;
} {
  const backgroundSizeX = (SPRITE_SHEET_WIDTH / crop.w) * 100;
  const backgroundSizeY = (SPRITE_SHEET_HEIGHT / crop.h) * 100;
  const backgroundPosX = (crop.x / (SPRITE_SHEET_WIDTH - crop.w)) * 100;
  const backgroundPosY = (crop.y / (SPRITE_SHEET_HEIGHT - crop.h)) * 100;
  return {
    backgroundSizeX: Number(backgroundSizeX.toFixed(4)),
    backgroundSizeY: Number(backgroundSizeY.toFixed(4)),
    backgroundPosX: Number(backgroundPosX.toFixed(4)),
    backgroundPosY: Number(backgroundPosY.toFixed(4)),
    aspectRatio: `${crop.w} / ${crop.h}`,
  };
}

/**
 * Computes the cursor repulsion vector (tx, ty) for a jade Morpho spirit.
 */
export function computeSpiritRepulsion(
  spiritCenterX: number,
  spiritCenterY: number,
  mouseX: number,
  mouseY: number,
  radius = 260,
  maxPush = 90
): { tx: number; ty: number } {
  const dx = spiritCenterX - mouseX;
  const dy = spiritCenterY - mouseY;
  const dist = Math.hypot(dx, dy);

  if (dist < radius && dist > 0.1) {
    const push = Math.pow(1 - dist / radius, 1.5) * maxPush;
    return {
      tx: (dx / dist) * push,
      ty: (dy / dist) * push,
    };
  }
  return { tx: 0, ty: 0 };
}

/**
 * Computes bat trajectory position (%) and wing-down state at time t (seconds).
 */
export function computeBatState(
  t: number,
  params: { y0: number; dur: number; offset: number; amp: number; flapRate: number }
): { xPct: number; yPct: number; isDown: boolean } {
  const p = (((t / params.dur) + params.offset) % 1 + 1) % 1;
  const xPct = -8 + p * 116;
  const yPct = params.y0 + Math.sin(p * 9 + params.offset * 6) * params.amp;
  const isDown = Math.floor(t * params.flapRate) % 2 === 1;
  return {
    xPct: Number(xPct.toFixed(2)),
    yPct: Number(yPct.toFixed(2)),
    isDown,
  };
}

/**
 * Classifies outer background mode of an image corner pixel (r, g, b, a)
 * so seam bands and sprite sheets key out solid black, solid white, or preserve existing alpha.
 */
export function detectOuterBackgroundType(
  r: number,
  g: number,
  b: number,
  a: number
): 'black' | 'white' | 'transparent' | 'opaque' {
  if (a < 20) return 'transparent';
  const lum = r + g + b;
  if (lum < 40) return 'black';
  if (lum > 700) return 'white';
  return 'opaque';
}

export interface PassageReservationInput {
  fullName: string;
  email: string;
  waveTime: string;
  partySize: number;
  censerOption: 'borrow' | 'bring';
  barkWish: string;
}

export interface PassageValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof PassageReservationInput, string>>;
  confirmationCode?: string;
}

/**
 * Pure client-side validation for Equinox Descent passage reservation.
 */
export function validatePassageReservation(
  input: PassageReservationInput
): PassageValidationResult {
  const errors: Partial<Record<keyof PassageReservationInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter the name of the primary pilgrim (2+ chars).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address for receipt dispatch.';
  }

  const allowedWaves = ['18:00', '19:30', '21:00', '22:30'];
  if (!allowedWaves.includes(input.waveTime)) {
    errors.waveTime = 'Selected wave time is invalid.';
  }

  if (!input.partySize || input.partySize < 1 || input.partySize > 6) {
    errors.partySize = 'Parties are limited to 1–6 pilgrims per lantern escort.';
  }

  if (input.censerOption !== 'borrow' && input.censerOption !== 'bring') {
    errors.censerOption = 'Select whether you will borrow a clay censer or bring your own.';
  }

  const valid = Object.keys(errors).length === 0;

  let confirmationCode: string | undefined;
  if (valid) {
    const timeCode = input.waveTime.replace(':', '');
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    confirmationCode = `XIB-${timeCode}-${randSuffix}`;
  }

  return { valid, errors, confirmationCode };
}

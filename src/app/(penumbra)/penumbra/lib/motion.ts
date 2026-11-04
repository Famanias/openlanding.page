export type SpotlightMode = 'intro' | 'pointer' | 'scroll' | 'complete' | 'toggle';

export type ColorTemperature = 'cool' | 'neutral' | 'warm';

export interface LightLabState {
  intensity: number; // 0 to 100
  temperature: ColorTemperature;
  direction: number; // -60 to 60 degrees
}

export interface ContactDraft {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactDraft, string>>;
}

export const HERO_BASE = '/templates/penumbra/architecture-base.webp';
export const HERO_REVEAL = '/templates/penumbra/architecture-illuminated.webp';

export const DEFAULT_LIGHT_LAB_STATE: LightLabState = {
  intensity: 78,
  temperature: 'warm',
  direction: -18,
};

/**
 * Time-step-independent exponential smoothing for cursor coordinates and radius.
 */
export function stepSpotlightInertia(
  current: number,
  target: number,
  deltaSeconds: number,
  speed = 10
): number {
  const safeDelta = Math.max(0, Math.min(deltaSeconds, 0.1));
  const alpha = 1 - Math.exp(-speed * safeDelta);
  return current + (target - current) * alpha;
}

/**
 * Computes hero-local pointer coordinates clamped to the stage bounds.
 */
export function computeRelativePointerPosition(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): { x: number; y: number; xPercent: number; yPercent: number } {
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const x = Math.max(0, Math.min(width, clientX - rect.left));
  const y = Math.max(0, Math.min(height, clientY - rect.top));
  return {
    x,
    y,
    xPercent: (x / width) * 100,
    yPercent: (y / height) * 100,
  };
}

/**
 * Computes the radius required from (x, y) to cover the farthest corner of the stage,
 * with an extra 18% feather buffer so the outer gradient stop (82%–100%) clears all corners.
 */
export function computeMaxCornerRadius(
  x: number,
  y: number,
  width: number,
  height: number
): number {
  const dx = Math.max(x, Math.max(0, width - x));
  const dy = Math.max(y, Math.max(0, height - y));
  const cornerDist = Math.hypot(dx, dy);
  // Because the radial-gradient is fully opaque up to 38% and feathers to 100%,
  // multiplying by 2.4 ensures the 38%-49% opaque core reaches every corner at progress = 1.
  return Math.ceil(cornerDist * 2.4);
}

/**
 * Computes responsive base spotlight radius in pixels based on viewport width.
 */
export function getResponsiveSpotlightRadius(viewportWidth: number): number {
  if (viewportWidth < 640) return 155;
  if (viewportWidth < 1024) return 205;
  return 260;
}

/**
 * Arbitrates between intro, pointer, scroll takeover, and manual keyboard/mobile toggle
 * so scroll progress and cursor coordinates never write conflicting mask radii.
 */
export function resolveSpotlightRadius(params: {
  mode: SpotlightMode;
  baseRadius: number;
  maxCornerRadius: number;
  scrollProgress: number; // 0..1
  introProgress: number; // 0..1
  pointerActive: boolean;
  illuminationVisible: boolean;
}): { radiusPx: number; opacity: number; fullReveal: boolean } {
  const {
    mode,
    baseRadius,
    maxCornerRadius,
    scrollProgress,
    introProgress,
    pointerActive,
    illuminationVisible,
  } = params;

  if (illuminationVisible || mode === 'toggle' || mode === 'complete') {
    return {
      radiusPx: maxCornerRadius,
      opacity: 1,
      fullReveal: true,
    };
  }

  const clampedScroll = Math.max(0, Math.min(1, scrollProgress));
  if (mode === 'scroll' || clampedScroll > 0.02) {
    const startR = pointerActive ? baseRadius : baseRadius * 0.85;
    const radiusPx = startR + (maxCornerRadius - startR) * clampedScroll;
    return {
      radiusPx,
      opacity: 1,
      fullReveal: clampedScroll >= 0.98,
    };
  }

  if (mode === 'intro') {
    const p = Math.max(0, Math.min(1, introProgress));
    return {
      radiusPx: Math.max(36, baseRadius * (0.22 + 0.78 * p)),
      opacity: Math.min(1, p * 1.25),
      fullReveal: false,
    };
  }

  // Default pointer mode
  return {
    radiusPx: pointerActive ? baseRadius : baseRadius * 0.78,
    opacity: pointerActive ? 1 : 0.72,
    fullReveal: false,
  };
}

/**
 * Builds the CSS radial-gradient string for the spotlight mask.
 */
export function buildRadialMaskGradient(xPx: number, yPx: number, radiusPx: number): string {
  const r = Math.max(0, Math.round(radiusPx));
  const x = Math.round(xPx);
  const y = Math.round(yPx);
  return `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 0%, #000 38%, rgba(0,0,0,0.9) 49%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.25) 82%, transparent 100%)`;
}

/**
 * Pure calculation for the Light in Motion interactive laboratory.
 */
export function computeLightLabVisuals(state: LightLabState): {
  revealOpacity: number;
  kelvinLabel: string;
  cctValue: number;
  filterCss: string;
  tintOverlayColor: string;
  directionalMaskCss: string;
  beamSweepXPercent: number;
  footcandleEstimate: string;
} {
  const clampedIntensity = Math.max(0, Math.min(100, state.intensity));
  const revealOpacity = clampedIntensity / 100;

  let kelvinLabel = '2700K Warm Architectural Amber';
  let cctValue = 2700;
  let filterCss = 'sepia(0.16) saturate(1.12) brightness(1.02)';
  let tintOverlayColor = 'rgba(215, 167, 121, 0.16)';

  if (state.temperature === 'cool') {
    kelvinLabel = '4200K Moonlight / Cool Stone';
    cctValue = 4200;
    filterCss = 'hue-rotate(175deg) saturate(0.68) brightness(0.96) contrast(1.06)';
    tintOverlayColor = 'rgba(126, 145, 168, 0.24)';
  } else if (state.temperature === 'neutral') {
    kelvinLabel = '3200K Crisp Gallery Neutral';
    cctValue = 3200;
    filterCss = 'saturate(0.84) brightness(1.03) contrast(1.04)';
    tintOverlayColor = 'rgba(242, 235, 226, 0.10)';
  }

  const clampedDir = Math.max(-60, Math.min(60, state.direction));
  // Map -60..+60 degrees to 22%..78% horizontal focal center
  const beamSweepXPercent = Math.round(50 + (clampedDir / 60) * 32);
  const gradientAngle = 90 + clampedDir;

  const directionalMaskCss = `linear-gradient(${gradientAngle}deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.96) ${Math.max(
    18,
    beamSweepXPercent - 18
  )}%, #000 ${beamSweepXPercent}%, rgba(0,0,0,0.94) ${Math.min(
    86,
    beamSweepXPercent + 20
  )}%, rgba(0,0,0,0.25) 100%)`;

  const lux = Math.round((clampedIntensity / 100) * 145);
  const footcandleEstimate = `${lux} lx / ${(lux * 0.0929).toFixed(1)} fc`;

  return {
    revealOpacity,
    kelvinLabel,
    cctValue,
    filterCss,
    tintOverlayColor,
    directionalMaskCss,
    beamSweepXPercent,
    footcandleEstimate,
  };
}

/**
 * Validates the contact draft without substituting silent defaults.
 */
export function validateContactInquiry(draft: ContactDraft): ContactValidationResult {
  const errors: Partial<Record<keyof ContactDraft, string>> = {};

  if (!draft.name || draft.name.trim().length < 2) {
    errors.name = 'Please enter your name or studio affiliation.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!draft.email || !emailRegex.test(draft.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!draft.message || draft.message.trim().length < 12) {
    errors.message = 'Please share a brief note about your architectural space or concept (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds an explicit mailto: URI for hello@penumbra.example.
 */
export function buildContactMailtoUri(draft: ContactDraft): string {
  const subject = encodeURIComponent(
    `PENUMBRA Inquiry — ${draft.projectType || 'Architectural Lighting Concept'} (${draft.name.trim()})`
  );
  const bodyLines = [
    `Name / Studio: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    `Typology: ${draft.projectType || 'Architectural / Cultural'}`,
    `Horizon: ${draft.timeline || 'Concept Phase'}`,
    '',
    'Project Brief:',
    draft.message.trim(),
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:hello@penumbra.example?subject=${subject}&body=${body}`;
}

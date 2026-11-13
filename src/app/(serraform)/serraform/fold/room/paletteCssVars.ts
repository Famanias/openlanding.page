import { useLayoutEffect, useRef } from 'react';
import {
  interpolateRoomPaletteLabs,
  paletteToOklabMap,
  type RoomPalette,
} from './paletteHarmonizer';

/**
 * Writes every semantic and legacy `--room-*` CSS custom property from a
 * harmonized RoomPalette onto a DOM host element in one batched update.
 */
export function applyRoomPaletteCssVars(el: HTMLElement, palette: RoomPalette): void {
  const s = el.style;
  s.setProperty('--room-wall-base', palette.wallBase);
  s.setProperty('--room-wall-highlight', palette.wallHighlight);
  s.setProperty('--room-wall-shadow', palette.wallShadow);
  s.setProperty('--room-floor-base', palette.floorBase);
  s.setProperty('--room-floor-far', palette.floorFar);
  s.setProperty('--room-floor-detail', palette.floorDetail);

  s.setProperty('--room-rug', palette.rug);
  s.setProperty('--room-rug-trim', palette.rugTrim);
  s.setProperty('--room-textile-primary', palette.textilePrimary);
  s.setProperty('--room-textile-secondary', palette.textileSecondary);
  s.setProperty('--room-furniture', palette.furniture);
  s.setProperty('--room-furniture-leg', palette.furnitureLeg);
  s.setProperty('--room-decor-primary', palette.decorPrimary);
  s.setProperty('--room-decor-accent', palette.decorAccent);
  s.setProperty('--room-trim', palette.architecturalTrim);
  s.setProperty('--room-foliage', palette.foliage);

  s.setProperty('--room-light-tint', palette.lightTint);
  s.setProperty('--room-ambient-tint', palette.ambientTint);
  s.setProperty('--room-shadow-tint', palette.shadowTint);
  s.setProperty('--room-quiet-bg', palette.quietZoneBg);

  s.setProperty('--room-ui-accent', palette.uiAccent);
  s.setProperty('--room-ui-accent-hover', palette.uiAccentHover);
  s.setProperty('--room-ui-accent-text', palette.uiAccentText);
  s.setProperty('--room-ui-outline', palette.uiOutline);
  s.setProperty('--room-text-primary', palette.textPrimary);
  s.setProperty('--room-text-secondary', palette.textSecondary);

  // Legacy aliases consumed by existing CSS rules
  s.setProperty('--room-wall', palette.wall);
  s.setProperty('--room-wall-upper', palette.wallUpper);
  s.setProperty('--room-wall-alcove', palette.wallAlcove);
  s.setProperty('--room-floor', palette.floor);
  s.setProperty('--room-decor-secondary', palette.decorSecondary);
  s.setProperty('--room-light-warm', palette.lightWarm);
  s.setProperty('--room-shadow', palette.shadow);
}

const PALETTE_TRANSITION_MS = 740;

/**
 * Drives smooth, interruptible OKLab color interpolation across all CSS custom
 * properties directly on `targetRef.current` with zero React re-renders and zero
 * first-paint color flash.
 */
export function useHarmonizedRoomVars(
  targetRef: React.RefObject<HTMLElement | null>,
  targetPalette: RoomPalette,
  reducedMotion: boolean,
): void {
  const currentPaletteRef = useRef<RoomPalette>(targetPalette);
  const hasMountedRef = useRef(false);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    if (!hasMountedRef.current || reducedMotion) {
      hasMountedRef.current = true;
      currentPaletteRef.current = targetPalette;
      applyRoomPaletteCssVars(el, targetPalette);
      return;
    }

    const fromLabs = paletteToOklabMap(currentPaletteRef.current);
    const toLabs = paletteToOklabMap(targetPalette);
    const startMs = performance.now();

    const step = (now: number) => {
      const node = targetRef.current;
      if (!node) {
        rafRef.current = 0;
        return;
      }

      const rawT = Math.min(1, Math.max(0, (now - startMs) / PALETTE_TRANSITION_MS));
      const eased = 1 - Math.pow(1 - rawT, 3);
      const snapshot = interpolateRoomPaletteLabs(fromLabs, toLabs, eased, {
        isDarkEnvelope: rawT >= 0.45 ? targetPalette.isDarkEnvelope : currentPaletteRef.current.isDarkEnvelope,
      });
      currentPaletteRef.current = snapshot;
      applyRoomPaletteCssVars(node, snapshot);

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        currentPaletteRef.current = targetPalette;
        applyRoomPaletteCssVars(node, targetPalette);
        rafRef.current = 0;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [targetRef, targetPalette, reducedMotion]);
}

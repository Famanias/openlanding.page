import { clamp, smoothstep } from '../utils/sceneLayout';

export interface PointerWindImpulse {
  /** Scene-space X (0..1920) */
  x: number;
  /** Scene-space Y (0..1080) */
  y: number;
  /** Scene-space velocity X (px/sec, clamped) */
  vx: number;
  /** Scene-space velocity Y (px/sec, clamped) */
  vy: number;
  /** Normalized strength (0..1), decays smoothly when cursor stops */
  strength: number;
}

export interface WindSample {
  /** Combined wind strength (typically 0.15..1.8) */
  strength: number;
  /** Gust component alone (0..1) */
  gust: number;
  /** Unit/scaled horizontal vector */
  dx: number;
  /** Unit/scaled vertical vector */
  dy: number;
  /** Localized pointer breeze contribution (0..1) */
  pointerInfluence: number;
}

/**
 * Shared procedural canyon wind field.
 * Produces coherent directional airflow, natural non-periodic breeze undulations,
 * occasional medium gusts (7-14s), rare sweeping gusts (~24s), and spatially
 * localized pointer-velocity wind disturbances.
 */
export class DesertWindField {
  /** Prevailing canyon breeze angle in radians (sweeping right and slightly upward along strata) */
  readonly baseAngleRad = (-17 * Math.PI) / 180;

  /**
   * Computes global canyon wind gust envelope (0..1) at time t (seconds).
   */
  getGlobalGust(t: number, scrollGustBoost = 0): number {
    // Medium gusts peaking smoothly every ~10.5 seconds with organic asymmetry
    const cycleA = (t % 10.6) / 10.6;
    const gustA =
      smoothstep(0.18, 0.32, cycleA) * (1 - smoothstep(0.32, 0.62, cycleA));

    // Secondary overlapping breeze swell every ~15.3 seconds
    const cycleB = ((t + 4.2) % 15.3) / 15.3;
    const gustB =
      smoothstep(0.45, 0.58, cycleB) * (1 - smoothstep(0.58, 0.85, cycleB)) * 0.72;

    // Rare stronger desert gust every ~26 seconds
    const cycleC = ((t + 11.0) % 26.0) / 26.0;
    const gustC =
      smoothstep(0.68, 0.76, cycleC) * (1 - smoothstep(0.76, 0.94, cycleC)) * 0.95;

    return clamp(Math.max(gustA * 0.72, gustB, gustC) + scrollGustBoost, 0, 1.35);
  }

  /**
   * Samples coherent wind at scene position (x, y) at time t.
   * Spatial phase delay makes gusts visibly roll across the canyon from left to right.
   */
  sampleAt(
    x: number,
    y: number,
    t: number,
    options: {
      windStrength: number;
      motionIntensity: number;
      scrollGustBoost?: number;
      pointerWind?: PointerWindImpulse | null;
      pointerEnabled?: boolean;
    }
  ): WindSample {
    const {
      windStrength,
      motionIntensity,
      scrollGustBoost = 0,
      pointerWind = null,
      pointerEnabled = true,
    } = options;

    const scale = clamp(windStrength, 0, 2.5) * clamp(motionIntensity, 0, 2.5);
    if (scale <= 0.001) {
      return { strength: 0, gust: 0, dx: 0, dy: 0, pointerInfluence: 0 };
    }

    // Traveling spatial phase lag (~240 px/s gust propagation left -> right)
    const localT = t - x * 0.0024 - y * 0.0005;

    // Non-harmonic multi-frequency breeze so plants never sway in rigid sine unison
    const baseBreeze =
      0.32 +
      0.14 * Math.sin(localT * 0.73) +
      0.09 * Math.sin(localT * 1.41 + 1.3) +
      0.05 * Math.cos(localT * 2.27 - 0.7);

    const gust = this.getGlobalGust(localT, scrollGustBoost);
    const windMag = (baseBreeze + gust * 0.85) * scale;

    const angle =
      this.baseAngleRad +
      0.08 * Math.sin(localT * 0.51 + y * 0.002);
    let dx = Math.cos(angle) * windMag;
    let dy = Math.sin(angle) * windMag;

    let pointerInfluence = 0;

    if (pointerEnabled && pointerWind && pointerWind.strength > 0.01) {
      const dist = Math.hypot(x - pointerWind.x, y - pointerWind.y);
      const influenceRadius = 310;
      if (dist < influenceRadius) {
        const falloff = 1 - smoothstep(0, influenceRadius, dist);
        const speedMag = Math.hypot(pointerWind.vx, pointerWind.vy);
        const clampedBoost = clamp(speedMag / 750, 0.12, 1.35);
        pointerInfluence = falloff * pointerWind.strength * clampedBoost;

        const dirX = speedMag > 8 ? pointerWind.vx / speedMag : Math.cos(angle);
        const dirY = speedMag > 8 ? pointerWind.vy / speedMag : Math.sin(angle);

        dx += dirX * pointerInfluence * 1.35 * clamp(motionIntensity, 0.2, 2);
        dy += dirY * pointerInfluence * 0.85 * clamp(motionIntensity, 0.2, 2);
      }
    }

    return {
      strength: clamp(Math.hypot(dx, dy), 0, 2.6),
      gust: clamp(gust * scale + pointerInfluence * 0.6, 0, 1.8),
      dx,
      dy,
      pointerInfluence: clamp(pointerInfluence, 0, 1.2),
    };
  }
}

export const sharedWindField = new DesertWindField();

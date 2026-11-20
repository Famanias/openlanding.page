import { clamp, createSeededRandom } from '../utils/sceneLayout';
import { DESERT_PALETTE } from '../utils/desertPalette';
import type { DesertWindField, PointerWindImpulse } from './DesertWindField';

export type DustPlane = 'far' | 'sun' | 'mid' | 'gust';

export interface DustWashParticle {
  id: number;
  plane: DustPlane;
  /** Scene-space center X (0..1920, wraps with generous bleed) */
  x: number;
  /** Scene-space center Y (0..1080) */
  y: number;
  length: number;
  thickness: number;
  baseSpeed: number;
  angleDeg: number;
  baseOpacity: number;
  color: string;
  phase: number;
  /** Current computed visual opacity (0..1) */
  opacity: number;
  /** Current computed tilt angle in degrees */
  currentAngleDeg: number;
}

export interface DustFleck {
  x: number;
  y: number;
  radius: number;
  speedScale: number;
  opacity: number;
  color: string;
  phase: number;
}

export interface PointerSwirlWisp {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  thickness: number;
  color: string;
}

/**
 * Pooled painterly atmospheric dust & canyon gust particle system.
 * Uses translucent gouache/watercolor wash strokes (never bright sci-fi sparks)
 * advected coherently by the shared DesertWindField.
 */
export class DustWashSystem {
  readonly washes: DustWashParticle[] = [];
  readonly flecks: DustFleck[] = [];
  readonly swirlWisps: PointerSwirlWisp[] = [];
  private maxSwirls = 14;
  private spawnCooldown = 0;

  constructor(seed = 8821) {
    const rand = createSeededRandom(seed);

    // 1. Far diagonal canyon haze ribbons
    const farSpecs: Array<[number, number, number, number, number, string]> = [
      [140, 585, 620, 62, 16, DESERT_PALETTE.mistCream],
      [620, 468, 700, 74, 13, DESERT_PALETTE.dustHazeLight],
      [1080, 355, 560, 56, 15, DESERT_PALETTE.dustHaze],
      [1520, 495, 520, 48, 12, DESERT_PALETTE.mistCream],
    ];
    farSpecs.forEach(([x, y, length, thickness, baseSpeed, color], idx) => {
      this.washes.push({
        id: idx,
        plane: 'far',
        x,
        y,
        length,
        thickness,
        baseSpeed,
        angleDeg: -19 + (rand() - 0.5) * 4,
        baseOpacity: 0.16 + rand() * 0.05,
        color,
        phase: rand() * Math.PI * 2,
        opacity: 0.14,
        currentAngleDeg: -19,
      });
    });

    // 2. Dedicated soft translucent dust veils drifting gently across the lower sun
    const sunSpecs: Array<[number, number, number, number, number, string]> = [
      [340, 548, 430, 48, 18, '#F5EBDC'],
      [515, 582, 480, 56, 21, '#EBD5BE'],
      [220, 615, 390, 42, 15, '#EFE1CE'],
    ];
    sunSpecs.forEach(([x, y, length, thickness, baseSpeed, color], idx) => {
      this.washes.push({
        id: 100 + idx,
        plane: 'sun',
        x,
        y,
        length,
        thickness,
        baseSpeed,
        angleDeg: -17,
        baseOpacity: 0.21 + rand() * 0.06,
        color,
        phase: rand() * Math.PI * 2,
        opacity: 0.18,
        currentAngleDeg: -17,
      });
    });

    // 3. Mid-valley directional painterly dust washes
    const midSpecs: Array<[number, number, number, number, number, string]> = [
      [260, 785, 640, 62, 24, DESERT_PALETTE.paleSand],
      [780, 725, 580, 50, 26, DESERT_PALETTE.mistCream],
      [1260, 682, 500, 44, 22, DESERT_PALETTE.dustHazeLight],
      [1640, 760, 460, 46, 20, '#E8CBB2'],
    ];
    midSpecs.forEach(([x, y, length, thickness, baseSpeed, color], idx) => {
      this.washes.push({
        id: 200 + idx,
        plane: 'mid',
        x,
        y,
        length,
        thickness,
        baseSpeed,
        angleDeg: -13 + (rand() - 0.5) * 4,
        baseOpacity: 0.15 + rand() * 0.05,
        color,
        phase: rand() * Math.PI * 2,
        opacity: 0.14,
        currentAngleDeg: -13,
      });
    });

    // 4. Sweeping canyon gust ribbons (surge noticeably during gusts & scroll passage)
    const gustSpecs: Array<[number, number, number, number, number, string]> = [
      [420, 650, 720, 54, 42, '#EFE1CF'],
      [1040, 790, 640, 46, 48, '#E7C8AF'],
      [1480, 610, 560, 42, 44, '#F1E2CF'],
    ];
    gustSpecs.forEach(([x, y, length, thickness, baseSpeed, color], idx) => {
      this.washes.push({
        id: 300 + idx,
        plane: 'gust',
        x,
        y,
        length,
        thickness,
        baseSpeed,
        angleDeg: -15,
        baseOpacity: 0.09,
        color,
        phase: rand() * Math.PI * 2,
        opacity: 0.05,
        currentAngleDeg: -15,
      });
    });

    // 5. Subtle drifting warm pigment dust flecks (tiny muted sandstone motes, never bright sparkles)
    const fleckPalette = ['#E6C7A8', '#D9B18F', '#F0DFC9', '#C99874'];
    for (let i = 0; i < 26; i++) {
      this.flecks.push({
        x: rand() * 2040 - 60,
        y: 260 + rand() * 760,
        radius: 1.2 + rand() * 2.1,
        speedScale: 0.7 + rand() * 0.9,
        opacity: 0.14 + rand() * 0.22,
        color: fleckPalette[i % fleckPalette.length],
        phase: rand() * Math.PI * 2,
      });
    }
  }

  step(
    dt: number,
    t: number,
    windField: DesertWindField,
    options: {
      windStrength: number;
      motionIntensity: number;
      scrollHazeMultiplier: number;
      passageDustBoost: number;
      scrollGustBoost: number;
      pointerWind: PointerWindImpulse | null;
      pointerEnabled: boolean;
      lifeBlend: number;
    }
  ): void {
    const safeDt = clamp(dt, 0, 0.1);
    const {
      windStrength,
      motionIntensity,
      scrollHazeMultiplier,
      passageDustBoost,
      scrollGustBoost,
      pointerWind,
      pointerEnabled,
      lifeBlend,
    } = options;

    const motionScale = clamp(motionIntensity, 0, 2.2) * clamp(lifeBlend, 0.12, 1);

    // Advect wash ribbons using local wind sample
    for (const w of this.washes) {
      const sample = windField.sampleAt(w.x, w.y, t, {
        windStrength,
        motionIntensity: motionScale,
        scrollGustBoost,
        pointerWind,
        pointerEnabled,
      });

      const speedMult =
        w.plane === 'gust'
          ? 1 + sample.gust * 1.35 + passageDustBoost * 0.9
          : 0.72 + sample.strength * 0.9 + passageDustBoost * 0.45;

      w.x += (w.baseSpeed * speedMult + sample.dx * 22) * safeDt;
      w.y +=
        (sample.dy * 12 + Math.sin(t * 0.48 + w.phase) * 4.5 * motionScale) *
        safeDt;

      // Wrap cleanly with generous bleed
      if (w.plane === 'sun') {
        if (w.x > 1020) {
          w.x = -220;
          w.y = 535 + ((w.id * 29) % 85);
        }
      } else {
        if (w.x - w.length * 0.5 > 2140) {
          w.x = -w.length * 0.5 - 120;
        } else if (w.x + w.length * 0.5 < -280) {
          w.x = 2080 + w.length * 0.4;
        }
      }

      // Compute organic breathing + gust opacity
      const breath = 0.84 + 0.16 * Math.sin(t * 0.55 + w.phase);
      if (w.plane === 'gust') {
        const gustPresence = clamp(sample.gust * 0.85 + passageDustBoost * 0.75, 0, 1.3);
        w.opacity = clamp(
          w.baseOpacity * (0.25 + gustPresence * 2.15) * scrollHazeMultiplier * breath,
          0,
          0.34
        );
      } else {
        w.opacity = clamp(
          w.baseOpacity *
            scrollHazeMultiplier *
            (0.88 + sample.gust * 0.35 + sample.pointerInfluence * 0.25) *
            breath,
          0,
          0.36
        );
      }

      w.currentAngleDeg = w.angleDeg + sample.dy * 4.5;
    }

    // Advect loose warm sandstone motes
    for (const f of this.flecks) {
      const sample = windField.sampleAt(f.x, f.y, t, {
        windStrength,
        motionIntensity: motionScale,
        scrollGustBoost,
        pointerWind,
        pointerEnabled,
      });

      const speed = (28 + sample.strength * 54 + passageDustBoost * 36) * f.speedScale;
      f.x += (speed * 0.94 + sample.dx * 34) * safeDt;
      f.y += (-speed * 0.24 + sample.dy * 24 + Math.sin(t * 1.4 + f.phase) * 6) * safeDt;

      if (f.x > 2020) {
        f.x = -80;
        f.y = 320 + ((f.phase * 173) % 680);
      }
      if (f.y < 140) f.y = 980;
      if (f.y > 1060) f.y = 280;
    }

    // Spawn gentle localized pointer-breeze dust wisps when pointer moves swiftly
    this.spawnCooldown = Math.max(0, this.spawnCooldown - safeDt);
    if (
      pointerEnabled &&
      pointerWind &&
      pointerWind.strength > 0.22 &&
      motionScale > 0.08 &&
      this.spawnCooldown <= 0
    ) {
      const speed = Math.hypot(pointerWind.vx, pointerWind.vy);
      if (speed > 110 && this.swirlWisps.length < this.maxSwirls) {
        this.swirlWisps.push({
          x: pointerWind.x + (Math.sin(t * 13.7) * 18),
          y: pointerWind.y + (Math.cos(t * 11.3) * 14),
          vx: clamp(pointerWind.vx * 0.18, -140, 140) + 28,
          vy: clamp(pointerWind.vy * 0.14, -90, 90) - 8,
          life: 0,
          maxLife: 1.05 + (t % 0.5),
          length: 85 + clamp(speed * 0.11, 0, 110),
          thickness: 18 + clamp(speed * 0.02, 0, 16),
          color: speed > 420 ? '#F2E4D1' : '#E5C6AC',
        });
        this.spawnCooldown = 0.09;
      }
    }

    // Update pointer swirl wisps
    for (let i = this.swirlWisps.length - 1; i >= 0; i--) {
      const s = this.swirlWisps[i];
      s.life += safeDt;
      if (s.life >= s.maxLife) {
        this.swirlWisps.splice(i, 1);
        continue;
      }
      s.x += s.vx * safeDt;
      s.y += s.vy * safeDt;
      s.vx *= 1 - 1.4 * safeDt;
      s.vy *= 1 - 1.4 * safeDt;
    }
  }
}

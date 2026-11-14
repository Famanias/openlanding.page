import type { SeasonId } from '../data/garden';
import { NOOP_FIELD, seededRandom, type FieldController } from './mount';

export interface SeasonParticlesController extends FieldController {
  setSeason(season: SeasonId): void;
}

interface Particle {
  season: SeasonId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  phase: number;
  color: string;
  /** 0 to 1 presence, so one season's air can hand over to the next. */
  fade: number;
  leaving: boolean;
}

const TAU = Math.PI * 2;

/** Particles per million square pixels of scene. */
const DENSITY: Record<SeasonId, number> = { spring: 46, summer: 26, autumn: 32, winter: 90 };

const COLORS: Record<SeasonId, readonly string[]> = {
  spring: ['#C7A6A2', '#DCC3BE', '#F4EFE2'],
  summer: ['#E8C27E', '#F4EFE2'],
  autumn: ['#CB9462', '#9E3F32', '#DDB07A'],
  winter: ['#FDFBF5', '#F4EFE2'],
};

/** What is in the air each season: petals, fireflies, leaves, snow. */
export function createSeasonParticles(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  reducedMotion: boolean,
  initial: SeasonId,
): SeasonParticlesController {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return { ...NOOP_FIELD, setSeason: () => {} };
  const ctx: CanvasRenderingContext2D = maybeCtx;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let active = false;
  let destroyed = false;
  let lastFrame = 0;
  let time = 0;
  let season = initial;
  let random = seededRandom(3);
  const particles: Particle[] = [];

  function spawn(kind: SeasonId, scatter: boolean): Particle {
    const palette = COLORS[kind];
    const firefly = kind === 'summer';
    return {
      season: kind,
      x: random() * width,
      // Fireflies keep to the lower garden; everything else falls from above.
      y: firefly ? height * (0.34 + random() * 0.62) : scatter ? random() * height : -12,
      vx: firefly ? (random() - 0.5) * 14 : kind === 'winter' ? -4 - random() * 8 : -8 - random() * 22,
      vy: firefly
        ? (random() - 0.5) * 10
        : kind === 'winter'
          ? 14 + random() * 22
          : kind === 'autumn'
            ? 26 + random() * 34
            : 16 + random() * 24,
      size: firefly
        ? 1.3 + random() * 1.3
        : kind === 'winter'
          ? 1 + random() * 1.8
          : kind === 'autumn'
            ? 5 + random() * 4
            : 3.4 + random() * 3,
      rot: random() * TAU,
      spin: (random() - 0.5) * (kind === 'autumn' ? 2.4 : 1.4),
      phase: random() * TAU,
      color: palette[Math.floor(random() * palette.length)],
      fade: 0,
      leaving: false,
    };
  }

  function populate(kind: SeasonId) {
    const count = Math.round(((width * height) / 1_000_000) * DENSITY[kind]);
    for (let i = 0; i < count; i++) particles.push(spawn(kind, true));
  }

  function step(dt: number) {
    time += dt;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.fade += (p.leaving ? -dt : dt) / 0.9;
      if (p.fade > 1) p.fade = 1;
      if (p.fade <= 0 && p.leaving) {
        particles.splice(i, 1);
        continue;
      }

      if (p.season === 'summer') {
        // Fireflies wander and turn back before leaving the scene.
        p.vx += Math.sin(time * 0.7 + p.phase) * 6 * dt;
        p.vy += Math.cos(time * 0.9 + p.phase * 1.3) * 5 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < height * 0.3 || p.y > height) p.vy *= -1;
        continue;
      }

      const sway = p.season === 'winter' ? 8 : p.season === 'autumn' ? 30 : 20;
      p.x += (p.vx + Math.sin(time * 1.1 + p.phase) * sway) * dt;
      p.y += p.vy * dt;
      p.rot += p.spin * dt;
      if (p.y > height + 14 || p.x < -20) {
        if (p.leaving) {
          particles.splice(i, 1);
        } else {
          const fresh = spawn(p.season, false);
          fresh.fade = 1;
          // Re-enter along the top and the right edge, since everything drifts left.
          if (random() < 0.3) {
            fresh.x = width + 10;
            fresh.y = random() * height * 0.7;
          }
          particles[i] = fresh;
        }
      }
    }
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      if (p.fade <= 0) continue;
      ctx.fillStyle = p.color;

      if (p.season === 'summer') {
        const glow = 0.35 + 0.65 * Math.max(0, Math.sin(time * 1.6 + p.phase));
        ctx.globalAlpha = p.fade * glow * 0.16;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4.5, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = p.fade * glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TAU);
        ctx.fill();
        continue;
      }

      if (p.season === 'winter') {
        ctx.globalAlpha = p.fade * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TAU);
        ctx.fill();
        continue;
      }

      ctx.globalAlpha = p.fade * 0.9;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      // Tumbling: the petal or leaf narrows as it turns edge-on.
      ctx.scale(1, 0.45 + 0.4 * Math.abs(Math.sin(time * 1.3 + p.phase)));
      ctx.beginPath();
      if (p.season === 'autumn') {
        ctx.moveTo(-p.size, 0);
        ctx.quadraticCurveTo(0, -p.size * 0.8, p.size, 0);
        ctx.quadraticCurveTo(0, p.size * 0.8, -p.size, 0);
      } else {
        ctx.ellipse(0, 0, p.size, p.size * 0.62, 0, 0, TAU);
      }
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function frame(now: number) {
    if (!active || destroyed) return;
    const dt = Math.min(0.05, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }

  /** Reduced motion: one composed scatter per season, nothing falling. */
  function drawStill() {
    random = seededRandom(3);
    particles.length = 0;
    populate(season);
    for (const p of particles) p.fade = 1;
    time = 1.2;
    draw();
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const nextWidth = Math.round(rect.width);
    const nextHeight = Math.round(rect.height);
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    if (reducedMotion) {
      drawStill();
      return;
    }
    particles.length = 0;
    populate(season);
    draw();
  }

  resize();

  return {
    setActive(next) {
      if (reducedMotion || next === active) return;
      active = next;
      cancelAnimationFrame(raf);
      if (active) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    resize,
    destroy() {
      destroyed = true;
      active = false;
      cancelAnimationFrame(raf);
    },
    setSeason(next) {
      if (next === season) return;
      season = next;
      if (reducedMotion) {
        drawStill();
        return;
      }
      for (const p of particles) p.leaving = true;
      populate(next);
    },
  };
}

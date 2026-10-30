import {
  SPRITE_CROPS,
  SPRITE_SHEET_HEIGHT,
  SPRITE_SHEET_WIDTH,
  computeBatState,
  computeSpiritRepulsion,
  detectOuterBackgroundType,
} from './cenoteMath';

/**
 * Converts solid outer backgrounds (black or white) on seam images and sprite sheets
 * into true alpha transparency, while also feathering seam waterfall tails and sprite crop borders.
 */
export function keyBlackBackgroundToAlpha(
  imgUrl: string,
  mode: 'seam' | 'sprite' = 'seam'
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        const w = (c.width = mode === 'sprite' ? SPRITE_SHEET_WIDTH : img.naturalWidth);
        const h = (c.height = mode === 'sprite' ? SPRITE_SHEET_HEIGHT : img.naturalHeight);
        const ctx = c.getContext('2d');
        if (!ctx) {
          resolve(imgUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        if (mode === 'seam') {
          const topType = detectOuterBackgroundType(d[0], d[1], d[2], d[3]);
          const botIdx = (h - 1) * w * 4;
          const botType = detectOuterBackgroundType(
            d[botIdx],
            d[botIdx + 1],
            d[botIdx + 2],
            d[botIdx + 3]
          );

          const isBgPixel = (idx: number, bgKind: string): boolean => {
            const a = d[idx + 3];
            if (a < 20) return true;
            const r = d[idx];
            const g = d[idx + 1];
            const b = d[idx + 2];
            const lum = r + g + b;
            if (bgKind === 'white') return lum > 690;
            return lum < 36;
          };

          // 1. Full-column top-down and bottom-up clear (no premature 0.45 cutoff)
          for (let x = 0; x < w; x++) {
            for (let y = 0; y < h * 0.75; y++) {
              const idx = (y * w + x) * 4;
              if (isBgPixel(idx, topType)) {
                d[idx + 3] = 0;
              } else {
                // Feather 2px rock border
                d[idx + 3] = Math.round(d[idx + 3] * 0.35);
                if (y + 1 < h) {
                  const nextIdx = ((y + 1) * w + x) * 4;
                  d[nextIdx + 3] = Math.round(d[nextIdx + 3] * 0.75);
                }
                break;
              }
            }

            for (let y = h - 1; y > h * 0.25; y--) {
              const idx = (y * w + x) * 4;
              if (isBgPixel(idx, botType)) {
                d[idx + 3] = 0;
              } else {
                d[idx + 3] = Math.round(d[idx + 3] * 0.35);
                if (y - 1 >= 0) {
                  const prevIdx = ((y - 1) * w + x) * 4;
                  d[prevIdx + 3] = Math.round(d[prevIdx + 3] * 0.75);
                }
                break;
              }
            }
          }

          // 2. Clear enclosed background pockets between hanging roots/chains in lower 45% and upper 45%
          for (let y = 0; y < h; y++) {
            const yRatio = y / h;
            if (yRatio > 0.36 && yRatio < 0.62) continue;
            const bgKind = yRatio <= 0.36 ? topType : botType;
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              if (d[idx + 3] === 0) continue;
              if (isBgPixel(idx, bgKind)) {
                d[idx + 3] = 0;
              }
            }
          }

          // 3. Smoothly feather out the bottom painted waterfall tail (y: 66% -> 82%)
          // so it blends invisibly into the animated waterfall of the scene below
          const fadeStart = Math.floor(h * 0.65);
          const fadeEnd = Math.floor(h * 0.81);
          for (let y = fadeStart; y < h; y++) {
            const tFade = Math.min(1, Math.max(0, (y - fadeStart) / (fadeEnd - fadeStart)));
            const mult = 1 - tFade;
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              if (d[idx + 3] === 0) continue;
              const r = d[idx];
              const g = d[idx + 1];
              const b = d[idx + 2];
              // Detect cyan/blue waterfall pixels (high green/blue relative to red) or very bottom tail
              const isWaterfallHue = g > 110 && b > 110 && g > r * 1.15;
              if (isWaterfallHue || y > h * 0.88) {
                d[idx + 3] = Math.round(d[idx + 3] * mult);
              }
            }
          }
        } else {
          // Sprite sheet keyer: remove dark noisy lithograph background + feather crop box edges
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];
            const maxCh = Math.max(r, g, b);
            // Boost alpha for glowing cyan/teal pixels while keying dark background grain
            const cyanBoost = Math.max(0, Math.max(g, b) - r);
            const signal = maxCh + cyanBoost * 0.65;
            if (signal < 42) {
              d[i + 3] = 0;
            } else if (signal < 95) {
              const ramp = (signal - 42) / 53;
              d[i + 3] = Math.round(ramp * ramp * 255);
              // Pre-darken low-alpha background pixels so dark fringes never appear
              d[i] = Math.round(r * ramp);
              d[i + 1] = Math.round(g * ramp);
              d[i + 2] = Math.round(b * ramp);
            }
          }

          // Apply smooth edge vignette around each calibrated crop box so rectangular bounds can never show
          const crops = Object.values(SPRITE_CROPS);
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              if (d[idx + 3] === 0) continue;

              let insideAny = false;
              let edgeFactor = 1;
              for (let cIdx = 0; cIdx < crops.length; cIdx++) {
                const crop = crops[cIdx];
                if (x >= crop.x && x <= crop.x + crop.w && y >= crop.y && y <= crop.y + crop.h) {
                  insideAny = true;
                  const dx = Math.min(x - crop.x, crop.x + crop.w - x) / (crop.w * 0.12);
                  const dy = Math.min(y - crop.y, crop.y + crop.h - y) / (crop.h * 0.12);
                  edgeFactor = Math.min(1, Math.max(0, Math.min(dx, dy)));
                  break;
                }
              }
              if (!insideAny) {
                d[idx + 3] = 0;
              } else if (edgeFactor < 1) {
                d[idx + 3] = Math.round(d[idx + 3] * edgeFactor);
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(c.toDataURL('image/png'));
      } catch {
        resolve(imgUrl);
      }
    };
    img.onerror = () => resolve(imgUrl);
    img.src = imgUrl;
  });
}

function makeStreakSprite(stops: Array<[number, string]>): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 160;
  const g = c.getContext('2d');
  if (g) {
    const grad = g.createLinearGradient(0, 0, 0, 160);
    stops.forEach(([pos, col]) => grad.addColorStop(pos, col));
    g.fillStyle = grad;
    g.fillRect(0, 0, 8, 160);
  }
  return c;
}

interface StreakItem {
  x: number;
  xNorm: number;
  sw: number;
  len: number;
  v: number;
  alpha: number;
  phase: number;
  sprite: HTMLCanvasElement;
}

/**
 * Waterfall & Molten Copal Streak Renderer (canvas.fall)
 */
export function initFallsCanvases(root: ParentNode = document): {
  render: (t: number, currentY?: number, vh?: number) => void;
  cleanup: () => void;
} {
  const FALL_SPRITES: Record<'ghost' | 'lava', HTMLCanvasElement[]> = {
    ghost: [
      makeStreakSprite([
        [0, 'rgba(140,255,225,0)'],
        [0.35, 'rgba(185,255,240,.95)'],
        [1, 'rgba(70,210,190,0)'],
      ]),
      makeStreakSprite([
        [0, 'rgba(80,220,200,0)'],
        [0.5, 'rgba(120,245,225,.8)'],
        [1, 'rgba(50,175,165,0)'],
      ]),
    ],
    lava: [
      makeStreakSprite([
        [0, 'rgba(255,190,80,0)'],
        [0.4, 'rgba(255,238,155,1)'],
        [1, 'rgba(255,120,30,0)'],
      ]),
      makeStreakSprite([
        [0, 'rgba(255,120,30,0)'],
        [0.5, 'rgba(255,155,50,.9)'],
        [1, 'rgba(255,80,20,0)'],
      ]),
    ],
  };

  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);
  const instances: Array<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    kind: 'ghost' | 'lava';
    isSeam: boolean;
    resize: () => void;
    getState: () => { w: number; h: number; topInScroller: number; streaks: StreakItem[] };
  }> = [];

  root.querySelectorAll<HTMLCanvasElement>('canvas.fall').forEach((canvas) => {
    const kind = (canvas.dataset.kind as 'ghost' | 'lava') || 'ghost';
    const speedMult = parseFloat(canvas.dataset.speed || '1');
    const isSeam = canvas.classList.contains('seam-fall');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let topInScroller = 0;
    let streaks: StreakItem[] = [];

    const resize = () => {
      w = canvas.offsetWidth || 100;
      h = canvas.offsetHeight || 200;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scroller = canvas.closest('#scroller') || canvas.closest('.xib-interactive-root') || document.body;
      const scrollerBox = scroller.getBoundingClientRect();
      const canvasBox = canvas.getBoundingClientRect();
      topInScroller = canvasBox.top - scrollerBox.top;

      const count = kind === 'ghost' ? Math.max(8, Math.round(w / 2.2) * 2) : Math.max(6, Math.round(w / 3) * 3);
      streaks = Array.from({ length: count }, () => {
        const xNorm = kind === 'ghost' ? Math.random() : 0.25 + Math.random() * 0.5;
        return {
          x: xNorm * w,
          xNorm,
          sw: kind === 'ghost' ? 0.8 + Math.random() * 3.2 : 1 + Math.random() * 2.2,
          len: kind === 'ghost' ? 60 + Math.random() * 220 : 30 + Math.random() * 70,
          v: (kind === 'ghost' ? 420 + Math.random() * 340 : 195 + Math.random() * 155) * speedMult,
          alpha: 0.18 + Math.random() * 0.55,
          phase: Math.random() * 1000,
          sprite: FALL_SPRITES[kind][Math.random() < 0.45 ? 0 : 1],
        };
      });
    };

    resize();
    instances.push({ canvas, ctx, kind, isSeam, resize, getState: () => ({ w, h, topInScroller, streaks }) });
  });

  const onResize = () => instances.forEach((i) => i.resize());
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
  }

  const render = (t: number, currentY?: number, vhParam?: number) => {
    const vh = vhParam || (typeof window !== 'undefined' ? window.innerHeight : 900);
    instances.forEach(({ canvas, ctx, kind, getState }) => {
      const { w, h, topInScroller, streaks } = getState();

      if (currentY !== undefined) {
        const screenTop = topInScroller - currentY;
        if (screenTop + h < -80 || screenTop > vh + 80) return;
      } else {
        const rect = canvas.getBoundingClientRect();
        if (rect.bottom < -50 || rect.top > vh + 50) return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        const span = h + s.len;
        const y = ((t * s.v + s.phase) % span) - s.len;
        const edgeDim = kind === 'ghost' ? 1 - Math.pow(Math.abs(s.xNorm - 0.5) * 2, 2) * 0.6 : 1;
        ctx.globalAlpha = s.alpha * edgeDim;
        ctx.drawImage(s.sprite, s.x - s.sw * 0.5, y, s.sw, s.len);
        if (y + span < h) {
          ctx.drawImage(s.sprite, s.x - s.sw * 0.5, y + span, s.sw, s.len);
        }
      }
    });
  };

  return {
    render,
    cleanup: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    },
  };
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  phase: number;
  warm: boolean;
}

function makeParticleStamp(r: number, colorStops: Array<[number, string]>): HTMLCanvasElement {
  const c = document.createElement('canvas');
  const size = Math.ceil(r * 2);
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  if (g) {
    const rad = r;
    const grad = g.createRadialGradient(rad, rad, 0, rad, rad, rad);
    colorStops.forEach(([pos, col]) => grad.addColorStop(pos, col));
    g.fillStyle = grad;
    g.beginPath();
    g.arc(rad, rad, rad, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

/**
 * Ambient Particle Canvases:
 * - 'wisp': 70 rising jade spores in Scene 1
 * - 'mote': 50 drifting cavern motes in Scene 2
 * - 'spray': 60 wheel mist spray particles in Scene 3
 * - 'bubble': 22 molten copal bubbles in Scene 4
 * - 'shimmer': 90 moonlight water-shimmer glints in Scene 5
 */
export function initParticlesCanvases(root: ParentNode = document): {
  render: (t: number, currentY?: number, vhParam?: number) => void;
  cleanup: () => void;
} {
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);
  const WARM_STAMP = makeParticleStamp(24, [
    [0, 'rgba(255, 210, 120, 1)'],
    [0.5, 'rgba(255, 145, 50, 0.5)'],
    [1, 'rgba(255, 110, 20, 0)'],
  ]);

  const JADE_STAMP = makeParticleStamp(24, [
    [0, 'rgba(185, 255, 238, 1)'],
    [0.5, 'rgba(95, 242, 200, 0.5)'],
    [1, 'rgba(50, 190, 165, 0)'],
  ]);

  const instances: Array<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    kind: string;
    resize: () => void;
    getState: () => { w: number; h: number; topInScroller: number; particles: AmbientParticle[] };
  }> = [];

  root.querySelectorAll<HTMLCanvasElement>('canvas.particles').forEach((canvas) => {
    const kind = canvas.dataset.kind || 'wisp';
    const count = parseInt(canvas.dataset.count || '50', 10);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let topInScroller = 0;
    let particles: AmbientParticle[] = [];

    const resize = () => {
      w = canvas.offsetWidth || 300;
      h = canvas.offsetHeight || 200;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scroller = canvas.closest('#scroller') || canvas.closest('.xib-interactive-root') || document.body;
      const scrollerBox = scroller.getBoundingClientRect();
      const canvasBox = canvas.getBoundingClientRect();
      topInScroller = canvasBox.top - scrollerBox.top;

      particles = Array.from({ length: count }, () => {
        const isWarm =
          kind === 'bubble' ? true : kind === 'wisp' || kind === 'mote' ? Math.random() < 0.22 : false;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (kind === 'spray' ? 35 : 14),
          vy:
            kind === 'wisp'
              ? -(14 + Math.random() * 26)
              : kind === 'bubble'
              ? -(10 + Math.random() * 22)
              : kind === 'spray'
              ? -(18 + Math.random() * 40)
              : (Math.random() - 0.5) * 10,
          r:
            kind === 'bubble'
              ? 1.8 + Math.random() * 3.6
              : kind === 'shimmer'
              ? 1.5 + Math.random() * 3.5
              : 1.0 + Math.random() * 2.4,
          alpha: 0.25 + Math.random() * 0.65,
          phase: Math.random() * Math.PI * 2,
          warm: isWarm,
        };
      });
    };

    resize();
    instances.push({ canvas, ctx, kind, resize, getState: () => ({ w, h, topInScroller, particles }) });
  });

  const onResize = () => instances.forEach((i) => i.resize());
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
  }

  const render = (t: number, currentY?: number, vhParam?: number) => {
    const vh = vhParam || (typeof window !== 'undefined' ? window.innerHeight : 900);
    instances.forEach(({ canvas, ctx, kind, getState }) => {
      const { w, h, topInScroller, particles } = getState();

      if (currentY !== undefined) {
        const screenTop = topInScroller - currentY;
        if (screenTop + h < -80 || screenTop > vh + 80) return;
      } else {
        const rect = canvas.getBoundingClientRect();
        if (rect.bottom < -50 || rect.top > vh + 50) return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = 0.55 + 0.45 * Math.sin(t * (kind === 'shimmer' ? 3.4 : 1.8) + p.phase);

        if (kind === 'shimmer') {
          const sx = p.x + Math.sin(t * 1.2 + p.phase) * 6;
          const sy = p.y;
          const sw = p.r * (2.5 + pulse * 3.2);
          const sh = Math.max(1.2, p.r * 0.48);
          ctx.globalAlpha = p.alpha * pulse;
          ctx.fillStyle = 'rgba(255, 232, 175, 0.9)';
          ctx.fillRect(sx - sw * 0.5, sy - sh * 0.5, sw, sh);
        } else {
          const px = ((p.x + p.vx * t + Math.sin(t * 0.9 + p.phase) * 14) % w + w) % w;
          const py = ((p.y + p.vy * t) % h + h) % h;
          const rad = p.r * (0.85 + 0.3 * pulse);
          const stamp = p.warm ? WARM_STAMP : JADE_STAMP;
          ctx.globalAlpha = p.alpha * pulse;
          const d = rad * 2.4;
          ctx.drawImage(stamp, px - d, py - d, d * 2, d * 2);
        }
      }
    });
  };

  return {
    render,
    cleanup: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    },
  };
}

/**
 * Spirit Repulsion & Bat Flapping Engine
 */
export function initSprites(root: ParentNode = document): {
  update: (t: number, dt: number, currentY?: number, artHParam?: number) => void;
  cleanup: () => void;
} {
  const scroller = (root as HTMLElement).closest?.('#scroller') || root;
  const spirits = Array.from(root.querySelectorAll<HTMLElement>('.sprite.spirit')).map((el) => ({
    el,
    phase: Math.random() * Math.PI * 2,
    ox: 0,
    oy: 0,
    baseLeftInScroller: 0,
    baseTopInScroller: 0,
  }));

  const bats = Array.from(root.querySelectorAll<HTMLElement>('.sprite.bat')).map((el, idx) => ({
    el,
    y0: parseFloat(el.dataset.y || '20'),
    dur: 9 + ((idx * 2.3) % 7),
    offset: (idx * 0.27) % 1,
    amp: 1.2 + ((idx * 0.9) % 2.5),
    flapRate: 8.5 + (idx % 4),
    lastDown: false,
  }));

  const cacheSpiritPositions = () => {
    const scrollerBox = (scroller as HTMLElement).getBoundingClientRect?.() || { left: 0, top: 0 };
    spirits.forEach((s) => {
      const box = s.el.getBoundingClientRect();
      s.baseLeftInScroller = box.left + box.width * 0.5 - scrollerBox.left;
      s.baseTopInScroller = box.top + box.height * 0.5 - scrollerBox.top;
    });
  };

  cacheSpiritPositions();
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', cacheSpiritPositions);
  }

  let mouseX = -9999;
  let mouseY = -9999;
  const onPointerMove = (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', onPointerMove);
  }

  const update = (t: number, dt: number, currentY?: number, artHParam?: number) => {
    const damp = 1 - Math.exp(-3 * dt);
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const artW = winW;
    const artH = artHParam || artW * (1520 / 2688);

    spirits.forEach((s) => {
      const cx = s.baseLeftInScroller;
      const cy = currentY !== undefined ? s.baseTopInScroller - currentY : s.baseTopInScroller;
      const { tx, ty } = computeSpiritRepulsion(cx, cy, mouseX, mouseY);

      s.ox += (tx - s.ox) * damp;
      s.oy += (ty - s.oy) * damp;

      const wx = Math.sin(0.35 * t + s.phase) * 0.012 * artW;
      const wy = Math.sin(0.9 * t + s.phase) * 0.014 * artH;
      const rot = Math.sin(0.7 * t + s.phase) * 6 + s.ox * 0.05;

      s.el.style.transform = `translate3d(calc(-50% + ${(wx + s.ox).toFixed(2)}px), calc(-50% + ${(wy + s.oy).toFixed(2)}px), 0) rotate(${rot.toFixed(2)}deg)`;
    });

    bats.forEach((b) => {
      const state = computeBatState(t, b);
      b.el.style.transform = `translate3d(calc(${state.xPct.toFixed(2)}vw - 50%), calc(${state.yPct.toFixed(2)} * var(--artH) / 100 - 50%), 0)`;
      if (b.lastDown !== state.isDown) {
        b.lastDown = state.isDown;
        b.el.classList.toggle('down', state.isDown);
      }
    });
  };

  return {
    update,
    cleanup: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', cacheSpiritPositions);
      }
    },
  };
}

import { NOOP_FIELD, type FieldController } from './mount';

export interface RippleFieldOptions {
  reducedMotion: boolean;
  /** RGB triplet for the ring stroke, e.g. "214, 199, 169". */
  rgb: string;
  /** Where the slow ambient rings start, in the unit square. */
  origin: [number, number];
}

export interface RippleFieldController extends FieldController {
  /** Start a ring at a viewport position (client coordinates). */
  emitAt(clientX: number, clientY: number): void;
}

interface Ring {
  x: number;
  y: number;
  age: number;
  life: number;
  radius: number;
  alpha: number;
}

const TAU = Math.PI * 2;
const AMBIENT_EVERY = 2.4;
const MAX_RINGS = 40;

/** Rings of water that spread from a fixed origin and from wherever the pointer travels. */
export function createRippleField(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  options: RippleFieldOptions,
): RippleFieldController {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return { ...NOOP_FIELD, emitAt: () => {} };
  const ctx: CanvasRenderingContext2D = maybeCtx;
  const { reducedMotion, rgb, origin } = options;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let active = false;
  let destroyed = false;
  let lastFrame = 0;
  let ambientClock = AMBIENT_EVERY;
  let lastX = 0;
  let lastY = 0;
  let pointerSeen = false;
  const rings: Ring[] = [];

  function reach(): number {
    return Math.hypot(width, height) * 0.62;
  }

  function push(ring: Ring) {
    if (rings.length >= MAX_RINGS) rings.shift();
    rings.push(ring);
  }

  function drawStill() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    const span = reach();
    for (let i = 1; i <= 7; i++) {
      ctx.strokeStyle = `rgba(${rgb}, ${(0.2 * (1 - i / 8)).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(origin[0] * width, origin[1] * height, (span * i) / 7, 0, TAU);
      ctx.stroke();
    }
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    for (const ring of rings) {
      const progress = ring.age / ring.life;
      // Rings queued with a negative age have not started yet.
      if (progress <= 0) continue;
      const eased = 1 - Math.pow(1 - progress, 2.2);
      // Fade in quickly, then out over the rest of the ring's life.
      const fade = Math.min(1, progress * 8) * (1 - progress);
      ctx.strokeStyle = `rgba(${rgb}, ${(ring.alpha * fade).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, Math.max(0.5, ring.radius * eased), 0, TAU);
      ctx.stroke();
    }
  }

  function frame(now: number) {
    if (!active || destroyed) return;
    const dt = Math.min(0.05, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;

    ambientClock += dt;
    if (ambientClock >= AMBIENT_EVERY) {
      ambientClock = 0;
      push({ x: origin[0] * width, y: origin[1] * height, age: 0, life: 11, radius: reach(), alpha: 0.34 });
    }
    for (let i = rings.length - 1; i >= 0; i--) {
      rings[i].age += dt;
      if (rings[i].age >= rings[i].life) rings.splice(i, 1);
    }

    draw();
    raf = requestAnimationFrame(frame);
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    if (reducedMotion) drawStill();
    else draw();
  }

  function local(clientX: number, clientY: number): [number, number] {
    const rect = canvas.getBoundingClientRect();
    return [clientX - rect.left, clientY - rect.top];
  }

  const onPointerMove = (event: PointerEvent) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const [x, y] = local(event.clientX, event.clientY);
    if (!pointerSeen) {
      pointerSeen = true;
      lastX = x;
      lastY = y;
      return;
    }
    if (Math.hypot(x - lastX, y - lastY) > 72) {
      lastX = x;
      lastY = y;
      push({ x, y, age: 0, life: 2.6, radius: 120, alpha: 0.38 });
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    if (reducedMotion) return;
    const [x, y] = local(event.clientX, event.clientY);
    for (let i = 0; i < 3; i++) {
      push({ x, y, age: -i * 0.22, life: 3.4, radius: 180 + i * 90, alpha: 0.5 });
    }
  };

  // Listen on the host so rings follow the pointer across the copy laid over the canvas.
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerdown', onPointerDown);

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
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerdown', onPointerDown);
    },
    emitAt(clientX, clientY) {
      if (reducedMotion) return;
      const [x, y] = local(clientX, clientY);
      push({ x, y, age: 0, life: 2.8, radius: 150, alpha: 0.45 });
    },
  };
}

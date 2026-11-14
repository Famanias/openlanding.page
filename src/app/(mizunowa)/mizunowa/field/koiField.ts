import type { KoiId, KoiSpecimen } from '../data/garden';
import { clamp, NOOP_FIELD, seededRandom, type FieldController } from './mount';

export interface KoiFieldOptions {
  specimens: readonly KoiSpecimen[];
  reducedMotion: boolean;
  /** Resolved font-family for the label that follows the chosen koi. */
  labelFont: string;
  onPick: (id: KoiId) => void;
  onFeed: () => void;
}

export interface KoiFieldController extends FieldController {
  setSelected(id: KoiId | null): void;
  setHighlighted(id: KoiId | null): void;
  /** Keyboard equivalent of clicking the water. */
  feed(): void;
}

const TAU = Math.PI * 2;
const JOINTS = 12;
/** Half body width at each joint, nose to tail root, as a fraction of body length. */
const HALF_W = [0.036, 0.074, 0.094, 0.104, 0.104, 0.097, 0.084, 0.067, 0.05, 0.035, 0.023, 0.014];
const TRAIL_SAMPLES = 250;
const TRAIL_INTERVAL = 0.07;
const TRAIL_CHUNKS = 10;
const MAX_PELLETS = 5;

/** Each koi's unhurried route, as a point in the unit square over time. */
const ROUTES: Record<KoiId, (t: number) => [number, number]> = {
  kohaku: (t) => {
    const a = (TAU * t) / 44;
    return [0.5 + 0.44 * Math.cos(a), 0.5 + 0.38 * Math.sin(a)];
  },
  yamabuki: (t) => {
    const a = (TAU * t) / 34 + 1.2;
    return [0.52 + 0.36 * Math.sin(a), 0.48 + 0.34 * Math.sin(2 * a)];
  },
  shiro: (t) => {
    const a = -(TAU * t) / 25 + 0.6;
    return [0.3 + 0.2 * Math.cos(a), 0.62 + 0.28 * Math.sin(a)];
  },
  sanke: (t) => {
    const a = (TAU * t) / 96;
    return [0.56 + 0.4 * Math.sin(3 * a + 0.5), 0.48 + 0.36 * Math.sin(2 * a + 2.1)];
  },
};

type BlobTone = 'secondary' | 'accent';
interface PatternBlob {
  /** Position along the spine, 0 nose to 1 tail root. */
  t: number;
  /** Sideways offset in half-widths. */
  lat: number;
  rx: number;
  ry: number;
  tone: BlobTone;
}

const PATTERNS: Record<KoiId, readonly PatternBlob[]> = {
  kohaku: [
    { t: 0.1, lat: 0.1, rx: 0.07, ry: 0.066, tone: 'secondary' },
    { t: 0.4, lat: -0.25, rx: 0.115, ry: 0.082, tone: 'secondary' },
    { t: 0.52, lat: 0.6, rx: 0.06, ry: 0.045, tone: 'secondary' },
    { t: 0.76, lat: 0.15, rx: 0.058, ry: 0.04, tone: 'secondary' },
  ],
  yamabuki: [],
  shiro: [
    { t: 0.16, lat: -0.45, rx: 0.06, ry: 0.05, tone: 'secondary' },
    { t: 0.36, lat: 0.4, rx: 0.075, ry: 0.058, tone: 'secondary' },
    { t: 0.58, lat: -0.3, rx: 0.085, ry: 0.06, tone: 'secondary' },
    { t: 0.8, lat: 0.3, rx: 0.05, ry: 0.034, tone: 'secondary' },
  ],
  sanke: [
    { t: 0.11, lat: 0, rx: 0.066, ry: 0.07, tone: 'secondary' },
    { t: 0.44, lat: 0.2, rx: 0.105, ry: 0.08, tone: 'secondary' },
    { t: 0.3, lat: -0.55, rx: 0.045, ry: 0.036, tone: 'accent' },
    { t: 0.56, lat: 0.6, rx: 0.04, ry: 0.032, tone: 'accent' },
    { t: 0.7, lat: -0.35, rx: 0.052, ry: 0.036, tone: 'accent' },
    { t: 0.84, lat: 0.1, rx: 0.036, ry: 0.026, tone: 'secondary' },
  ],
};

/** Lily pads resting on the surface: unit-square position, radius in body lengths. */
const PADS = [
  { u: 0.045, v: 0.2, r: 0.4, rot: 0.6 },
  { u: 0.105, v: 0.31, r: 0.27, rot: 2.4 },
  { u: 0.4, v: 0.9, r: 0.36, rot: 4.1 },
  { u: 0.47, v: 0.955, r: 0.22, rot: 1.2 },
  { u: 0.6, v: 0.085, r: 0.3, rot: 5.2 },
] as const;

interface Koi {
  spec: KoiSpecimen;
  route: (t: number) => [number, number];
  jx: Float64Array;
  jy: Float64Array;
  heading: number;
  speed: number;
  phase: number;
  trailX: number[];
  trailY: number[];
  /** Length already dropped off the old end, so dashes stay fixed on the water. */
  trailDropped: number;
  trailClock: number;
}

interface Ripple {
  x: number;
  y: number;
  age: number;
  life: number;
  radius: number;
  alpha: number;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
}

function wrapAngle(angle: number): number {
  let a = angle;
  while (a > Math.PI) a -= TAU;
  while (a < -Math.PI) a += TAU;
  return a;
}

export function createKoiField(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  options: KoiFieldOptions,
): KoiFieldController {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) {
    return { ...NOOP_FIELD, setSelected: () => {}, setHighlighted: () => {}, feed: () => {} };
  }
  const ctx: CanvasRenderingContext2D = maybeCtx;
  const { reducedMotion } = options;

  let width = 0;
  let height = 0;
  let dpr = 1;
  /** Koi body length in CSS pixels. */
  let bodyLength = 150;
  let baseSpeed = 60;
  const zone = { x0: 0, y0: 0, x1: 1, y1: 1 };
  let bed: HTMLCanvasElement | null = null;

  let raf = 0;
  let active = false;
  let destroyed = false;
  let lastFrame = 0;
  let time = 0;
  let nextSurfacing = 4;
  let feedTurn = 0;

  let selected: KoiId | null = null;
  let highlighted: KoiId | null = null;
  let hovered: KoiId | null = null;

  const pointer = { x: 0, y: 0, inside: false, wakeX: 0, wakeY: 0 };
  const pellets: { x: number; y: number }[] = [];
  const ripples: Ripple[] = [];
  const petals: Petal[] = [];

  const koi: Koi[] = options.specimens.map((spec) => ({
    spec,
    route: ROUTES[spec.id],
    jx: new Float64Array(JOINTS),
    jy: new Float64Array(JOINTS),
    heading: 0,
    speed: 0,
    phase: 0,
    trailX: [],
    trailY: [],
    trailDropped: 0,
    trailClock: 0,
  }));

  // Scratch buffers reused every frame.
  const spX = new Float64Array(JOINTS);
  const spY = new Float64Array(JOINTS);
  const dirX = new Float64Array(JOINTS);
  const dirY = new Float64Array(JOINTS);
  const norX = new Float64Array(JOINTS);
  const norY = new Float64Array(JOINTS);
  const outline = new Float64Array((JOINTS * 2 + 2) * 2);
  const trailLen = new Float64Array(TRAIL_SAMPLES + 1);

  function routePoint(k: Koi, t: number): [number, number] {
    const [u, v] = k.route(t);
    return [zone.x0 + u * (zone.x1 - zone.x0), zone.y0 + v * (zone.y1 - zone.y0)];
  }

  function placeKoi() {
    const segment = bodyLength / (JOINTS - 1);
    koi.forEach((k, index) => {
      const [x, y] = routePoint(k, time);
      const [ax, ay] = routePoint(k, time + 0.6);
      k.heading = Math.atan2(ay - y, ax - x);
      k.speed = baseSpeed * 0.7;
      k.phase = index * 1.7;
      for (let i = 0; i < JOINTS; i++) {
        k.jx[i] = x - Math.cos(k.heading) * segment * i;
        k.jy[i] = y - Math.sin(k.heading) * segment * i;
      }
      k.trailX.length = 0;
      k.trailY.length = 0;
      k.trailDropped = 0;
      k.trailClock = 0;
    });
  }

  function paintBed() {
    const sheet = document.createElement('canvas');
    sheet.width = Math.max(1, Math.round(width * dpr));
    sheet.height = Math.max(1, Math.round(height * dpr));
    const b = sheet.getContext('2d');
    if (!b) return;
    b.scale(dpr, dpr);
    const random = seededRandom(11);

    const stones = Math.round((width * height) / 30000);
    for (let i = 0; i < stones; i++) {
      const x = random() * width;
      const y = random() * height;
      const rx = 16 + random() * 46;
      const ry = rx * (0.55 + random() * 0.3);
      const rot = random() * Math.PI;
      b.fillStyle = 'rgba(6, 20, 19, 0.38)';
      b.beginPath();
      b.ellipse(x + 4, y + 7, rx, ry, rot, 0, TAU);
      b.fill();
      b.fillStyle = `rgba(82, 110, 88, ${(0.15 + random() * 0.15).toFixed(3)})`;
      b.beginPath();
      b.ellipse(x, y, rx, ry, rot, 0, TAU);
      b.fill();
      b.strokeStyle = 'rgba(214, 199, 169, 0.06)';
      b.lineWidth = 1;
      b.beginPath();
      b.ellipse(x - 1, y - 2, rx * 0.86, ry * 0.8, rot, Math.PI * 1.05, Math.PI * 1.75);
      b.stroke();
    }

    for (let i = 0; i < stones * 4; i++) {
      b.fillStyle = `rgba(214, 199, 169, ${(0.04 + random() * 0.07).toFixed(3)})`;
      b.beginPath();
      b.arc(random() * width, random() * height, 1.2 + random() * 3.2, 0, TAU);
      b.fill();
    }
    bed = sheet;
  }

  function seedPetals() {
    const random = seededRandom(5);
    petals.length = 0;
    const count = width < 700 ? 5 : 9;
    for (let i = 0; i < count; i++) {
      petals.push({
        x: random() * width,
        y: random() * height,
        vx: 3 + random() * 5,
        vy: 1 + random() * 2.5,
        rot: random() * TAU,
        spin: (random() - 0.5) * 0.3,
      });
    }
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const nextWidth = Math.round(rect.width);
    const nextHeight = Math.round(rect.height);
    if (nextWidth === width && nextHeight === height) return;

    const scaleX = width > 0 ? nextWidth / width : 0;
    const scaleY = height > 0 ? nextHeight / height : 0;
    width = nextWidth;
    height = nextHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    bodyLength = clamp(width * 0.105, 84, 168);
    baseSpeed = bodyLength * 0.4;
    // On wide layouts the field notes sit over the right-hand third, so keep the routes clear of it.
    const wide = width >= 900;
    zone.x0 = bodyLength * 0.7;
    zone.x1 = wide ? width * 0.69 : width - bodyLength * 0.6;
    zone.y0 = height * 0.17;
    zone.y1 = height * 0.85;

    paintBed();
    seedPetals();
    ripples.length = 0;
    pellets.length = 0;

    if (reducedMotion || scaleX === 0) {
      placeKoi();
      settle();
    } else {
      // A live pond keeps swimming through a resize: carry the koi and their lines across.
      for (const k of koi) {
        for (let i = 0; i < JOINTS; i++) {
          k.jx[i] *= scaleX;
          k.jy[i] *= scaleY;
        }
        for (let i = 0; i < k.trailX.length; i++) {
          k.trailX[i] *= scaleX;
          k.trailY[i] *= scaleY;
        }
      }
    }
    draw();
  }

  /** Advance the pond unseen, so it is first shown with koi mid-route and their lines already drawn. */
  function settle() {
    for (let i = 0; i < 520; i++) step(1 / 30);
    ripples.length = 0;
  }

  function addRipple(x: number, y: number, radius: number, life: number, alpha: number) {
    if (ripples.length > 14) ripples.shift();
    // A still ripple is held part-way open instead of travelling.
    ripples.push({ x, y, age: reducedMotion ? life * 0.5 : 0, life, radius, alpha });
  }

  function dropFood(x: number, y: number) {
    const px = clamp(x, bodyLength * 0.4, width - bodyLength * 0.4);
    const py = clamp(y, height * 0.1, height * 0.9);
    addRipple(px, py, bodyLength * 0.55, 1.9, 0.6);
    if (reducedMotion) {
      if (ripples.length > 3) ripples.shift();
      draw();
    } else {
      if (pellets.length >= MAX_PELLETS) pellets.shift();
      pellets.push({ x: px, y: py });
    }
    options.onFeed();
  }

  function step(dt: number) {
    time += dt;
    const segment = bodyLength / (JOINTS - 1);
    const feeding = pellets.length > 0;

    for (let index = 0; index < koi.length; index++) {
      const k = koi[index];
      const hx = k.jx[0];
      const hy = k.jy[0];
      let [tx, ty] = routePoint(k, time);
      let boost = 1;

      if (feeding) {
        let best = Infinity;
        for (const pellet of pellets) {
          const d = Math.hypot(pellet.x - hx, pellet.y - hy);
          if (d < best) {
            best = d;
            tx = pellet.x;
            ty = pellet.y;
          }
        }
        boost = 1.8;
      }

      let dx = tx - hx;
      let dy = ty - hy;
      const dist = Math.hypot(dx, dy) || 1;
      dx /= dist;
      dy /= dist;

      // Koi give the pointer a little room unless there is food on the water.
      if (pointer.inside && !feeding) {
        const shy = bodyLength * 0.95;
        const pd = Math.hypot(hx - pointer.x, hy - pointer.y) || 1;
        if (pd < shy) {
          const force = 1 - pd / shy;
          dx += ((hx - pointer.x) / pd) * force * 1.9;
          dy += ((hy - pointer.y) / pd) * force * 1.9;
          boost += force * 0.9;
        }
      }

      // And keep a little room from each other.
      for (let other = 0; other < koi.length; other++) {
        if (other === index) continue;
        const ox = hx - koi[other].jx[0];
        const oy = hy - koi[other].jy[0];
        const od = Math.hypot(ox, oy) || 1;
        const personal = bodyLength * 0.5;
        if (od < personal) {
          const force = (1 - od / personal) * 0.8;
          dx += (ox / od) * force;
          dy += (oy / od) * force;
        }
      }

      const desired = Math.atan2(dy, dx);
      const maxTurn = (feeding ? 2.7 : 1.7) * dt;
      k.heading += clamp(wrapAngle(desired - k.heading), -maxTurn, maxTurn);

      const targetSpeed = baseSpeed * clamp(dist / (bodyLength * 0.9), 0.5, 1.9) * boost;
      k.speed += (targetSpeed - k.speed) * Math.min(1, dt * 2.2);

      k.jx[0] = hx + Math.cos(k.heading) * k.speed * dt;
      k.jy[0] = hy + Math.sin(k.heading) * k.speed * dt;
      for (let i = 1; i < JOINTS; i++) {
        let sx = k.jx[i] - k.jx[i - 1];
        let sy = k.jy[i] - k.jy[i - 1];
        const sd = Math.hypot(sx, sy) || 1;
        sx /= sd;
        sy /= sd;
        k.jx[i] = k.jx[i - 1] + sx * segment;
        k.jy[i] = k.jy[i - 1] + sy * segment;
      }
      k.phase += dt * (3.6 + 4.8 * (k.speed / baseSpeed));

      k.trailClock += dt;
      if (k.trailClock >= TRAIL_INTERVAL) {
        k.trailClock = 0;
        k.trailX.push(k.jx[JOINTS - 1]);
        k.trailY.push(k.jy[JOINTS - 1]);
        if (k.trailX.length > TRAIL_SAMPLES) {
          k.trailDropped += Math.hypot(k.trailX[1] - k.trailX[0], k.trailY[1] - k.trailY[0]);
          k.trailX.shift();
          k.trailY.shift();
        }
      }

      if (feeding) {
        for (let p = pellets.length - 1; p >= 0; p--) {
          if (Math.hypot(pellets[p].x - k.jx[0], pellets[p].y - k.jy[0]) < bodyLength * 0.14) {
            addRipple(pellets[p].x, pellets[p].y, bodyLength * 0.3, 1.1, 0.5);
            pellets.splice(p, 1);
          }
        }
      }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].age += dt;
      if (ripples[i].age >= ripples[i].life) ripples.splice(i, 1);
    }

    for (const petal of petals) {
      petal.x += petal.vx * dt;
      petal.y += petal.vy * dt;
      petal.rot += petal.spin * dt;
      if (petal.x > width + 12) petal.x = -12;
      if (petal.y > height + 12) petal.y = -12;
    }

    // Now and then a koi breaks the surface.
    if (time > nextSurfacing) {
      const k = koi[Math.floor(time * 7.3) % koi.length];
      addRipple(k.jx[0], k.jy[0], bodyLength * 0.34, 1.6, 0.34);
      nextSurfacing = time + 4.5 + ((time * 13.7) % 4);
    }

    if (pointer.inside) {
      const moved = Math.hypot(pointer.x - pointer.wakeX, pointer.y - pointer.wakeY);
      if (moved > 54) {
        pointer.wakeX = pointer.x;
        pointer.wakeY = pointer.y;
        addRipple(pointer.x, pointer.y, 22, 1.1, 0.22);
      }
    }
  }

  function computeSpine(k: Koi) {
    const amplitude = bodyLength * 0.036 * (0.55 + 0.6 * Math.min(1.6, k.speed / baseSpeed));
    for (let i = 0; i < JOINTS; i++) {
      const a = i === 0 ? 0 : i - 1;
      const b = i === JOINTS - 1 ? i : i + 1;
      let dx = k.jx[a] - k.jx[b];
      let dy = k.jy[a] - k.jy[b];
      const d = Math.hypot(dx, dy) || 1;
      dx /= d;
      dy /= d;
      const sway = Math.sin(k.phase - i * 0.62) * amplitude * Math.pow(i / (JOINTS - 1), 1.5);
      dirX[i] = dx;
      dirY[i] = dy;
      norX[i] = -dy;
      norY[i] = dx;
      spX[i] = k.jx[i] - dy * sway;
      spY[i] = k.jy[i] + dx * sway;
    }
  }

  /** Smooth closed body outline from the current spine, optionally offset (for the shadow). */
  function bodyPath(ox: number, oy: number) {
    let n = 0;
    outline[n++] = spX[0] + dirX[0] * bodyLength * 0.035;
    outline[n++] = spY[0] + dirY[0] * bodyLength * 0.035;
    for (let i = 0; i < JOINTS; i++) {
      outline[n++] = spX[i] + norX[i] * HALF_W[i] * bodyLength;
      outline[n++] = spY[i] + norY[i] * HALF_W[i] * bodyLength;
    }
    outline[n++] = spX[JOINTS - 1] - dirX[JOINTS - 1] * bodyLength * 0.012;
    outline[n++] = spY[JOINTS - 1] - dirY[JOINTS - 1] * bodyLength * 0.012;
    for (let i = JOINTS - 1; i >= 0; i--) {
      outline[n++] = spX[i] - norX[i] * HALF_W[i] * bodyLength;
      outline[n++] = spY[i] - norY[i] * HALF_W[i] * bodyLength;
    }

    const count = n / 2;
    ctx.beginPath();
    ctx.moveTo(
      (outline[(count - 1) * 2] + outline[0]) / 2 + ox,
      (outline[(count - 1) * 2 + 1] + outline[1]) / 2 + oy,
    );
    for (let i = 0; i < count; i++) {
      const x = outline[i * 2];
      const y = outline[i * 2 + 1];
      const next = ((i + 1) % count) * 2;
      ctx.quadraticCurveTo(x + ox, y + oy, (x + outline[next]) / 2 + ox, (y + outline[next + 1]) / 2 + oy);
    }
    ctx.closePath();
  }

  function fin(rootX: number, rootY: number, angle: number, length: number, spread: number) {
    const cx = Math.cos(angle);
    const cy = Math.sin(angle);
    const midX = rootX + cx * length * 0.5;
    const midY = rootY + cy * length * 0.5;
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.quadraticCurveTo(midX - cy * spread, midY + cx * spread, rootX + cx * length, rootY + cy * length);
    ctx.quadraticCurveTo(midX + cy * spread * 0.3, midY - cx * spread * 0.3, rootX, rootY);
    ctx.fill();
  }

  function drawKoi(k: Koi, alpha: number) {
    computeSpine(k);
    const L = bodyLength;
    const gold = k.spec.id === 'yamabuki';
    const tailIndex = JOINTS - 1;

    // Shadow on the pond bed.
    ctx.globalAlpha = alpha * 0.3;
    ctx.fillStyle = '#04100F';
    bodyPath(L * 0.07, L * 0.11);
    ctx.fill();

    ctx.globalAlpha = alpha;
    ctx.fillStyle = gold ? 'rgba(226, 180, 128, 0.82)' : 'rgba(244, 239, 226, 0.74)';

    // Forked tail, swaying with the last of the body wave.
    const tailBack =
      Math.atan2(-dirY[tailIndex], -dirX[tailIndex]) + Math.sin(k.phase - JOINTS * 0.62) * 0.42;
    fin(spX[tailIndex], spY[tailIndex], tailBack - 0.36, L * 0.3, L * 0.075);
    fin(spX[tailIndex], spY[tailIndex], tailBack + 0.36, L * 0.3, -L * 0.075);

    // Paired pectoral and pelvic fins.
    for (const side of [1, -1]) {
      const flap = Math.sin(k.phase * 0.5 + side) * 0.16;
      const pectoralBack = Math.atan2(-dirY[3], -dirX[3]);
      fin(
        spX[3] + norX[3] * side * HALF_W[3] * L * 0.8,
        spY[3] + norY[3] * side * HALF_W[3] * L * 0.8,
        pectoralBack - side * (0.92 + flap),
        L * 0.21,
        side * L * 0.075,
      );
      const pelvicBack = Math.atan2(-dirY[7], -dirX[7]);
      fin(
        spX[7] + norX[7] * side * HALF_W[7] * L * 0.8,
        spY[7] + norY[7] * side * HALF_W[7] * L * 0.8,
        pelvicBack - side * 0.7,
        L * 0.11,
        side * L * 0.04,
      );
    }

    ctx.fillStyle = k.spec.primaryColor;
    bodyPath(0, 0);
    ctx.fill();

    ctx.save();
    ctx.clip();
    for (const blob of PATTERNS[k.spec.id]) {
      const at = blob.t * (JOINTS - 1);
      const i0 = Math.min(JOINTS - 2, Math.floor(at));
      const f = at - i0;
      const halfWidth = (HALF_W[i0] + (HALF_W[i0 + 1] - HALF_W[i0]) * f) * L;
      const cx = spX[i0] + (spX[i0 + 1] - spX[i0]) * f + norX[i0] * blob.lat * halfWidth;
      const cy = spY[i0] + (spY[i0 + 1] - spY[i0]) * f + norY[i0] * blob.lat * halfWidth;
      ctx.fillStyle = blob.tone === 'accent' ? k.spec.accentColor : k.spec.secondaryColor;
      ctx.beginPath();
      ctx.ellipse(cx, cy, blob.rx * L, blob.ry * L, Math.atan2(dirY[i0], dirX[i0]), 0, TAU);
      ctx.fill();
    }
    // Soft rim so the body reads as rounded under the water.
    bodyPath(0, 0);
    ctx.strokeStyle = 'rgba(17, 44, 42, 0.26)';
    ctx.lineWidth = L * 0.04;
    ctx.stroke();
    ctx.restore();

    // Dorsal ridge.
    ctx.strokeStyle = gold ? 'rgba(253, 251, 245, 0.5)' : 'rgba(214, 199, 169, 0.75)';
    ctx.lineWidth = L * 0.022;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(spX[3], spY[3]);
    for (let i = 4; i <= 7; i++) ctx.lineTo(spX[i], spY[i]);
    ctx.stroke();

    // Eyes.
    ctx.fillStyle = '#1E2320';
    for (const side of [1, -1]) {
      ctx.beginPath();
      ctx.arc(
        spX[1] + dirX[1] * L * 0.03 + norX[1] * side * HALF_W[1] * L * 0.78,
        spY[1] + dirY[1] * L * 0.03 + norY[1] * side * HALF_W[1] * L * 0.78,
        L * 0.013,
        0,
        TAU,
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawTrail(k: Koi, alpha: number, emphasised: boolean) {
    const n = k.trailX.length;
    if (n < 2) return;

    trailLen[0] = 0;
    for (let i = 1; i < n; i++) {
      trailLen[i] =
        trailLen[i - 1] + Math.hypot(k.trailX[i] - k.trailX[i - 1], k.trailY[i] - k.trailY[i - 1]);
    }

    ctx.strokeStyle = k.spec.trailColor;
    ctx.lineWidth = emphasised ? 2.2 : 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash(k.spec.trailDash as number[]);

    const per = Math.ceil(n / TRAIL_CHUNKS);
    for (let chunk = 0; chunk < TRAIL_CHUNKS; chunk++) {
      const start = chunk * per;
      if (start >= n - 1) break;
      const end = Math.min(n - 1, start + per);
      ctx.globalAlpha = alpha * Math.pow((chunk + 1) / TRAIL_CHUNKS, 1.5);
      ctx.lineDashOffset = -(k.trailDropped + trailLen[start]);
      ctx.beginPath();
      ctx.moveTo(k.trailX[start], k.trailY[start]);
      for (let i = start + 1; i <= end; i++) ctx.lineTo(k.trailX[i], k.trailY[i]);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    ctx.globalAlpha = 1;
  }

  function drawPad(index: number, shadow: boolean) {
    const pad = PADS[index];
    const radius = pad.r * bodyLength;
    const x = pad.u * width + Math.sin(time * 0.31 + index * 2.1) * 2.5;
    const y = pad.v * height + Math.cos(time * 0.27 + index * 1.3) * 2;
    const rot = pad.rot + Math.sin(time * 0.16 + index) * 0.07;

    ctx.save();
    ctx.translate(x + (shadow ? radius * 0.12 : 0), y + (shadow ? radius * 0.2 : 0));
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, 0.17, TAU - 0.17);
    ctx.closePath();
    if (shadow) {
      ctx.fillStyle = 'rgba(4, 16, 15, 0.3)';
      ctx.fill();
    } else {
      ctx.fillStyle = '#3F6049';
      ctx.fill();
      ctx.strokeStyle = 'rgba(244, 239, 226, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(17, 44, 42, 0.3)';
      ctx.beginPath();
      for (let vein = 1; vein <= 5; vein++) {
        const angle = 0.17 + ((TAU - 0.34) * vein) / 6;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius * 0.86, Math.sin(angle) * radius * 0.86);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFocus(k: Koi) {
    const cx = k.jx[5];
    const cy = k.jy[5];
    const radius = bodyLength * 0.66;

    ctx.strokeStyle = 'rgba(199, 166, 162, 0.85)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 7]);
    ctx.lineDashOffset = -time * 9;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;

    const label = `${k.spec.number} · ${k.spec.label.toUpperCase()}`;
    ctx.font = `500 11px ${options.labelFont}`;
    if ('letterSpacing' in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '1.2px';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    // Keep the tag on the canvas when the koi swims along the top edge.
    const above = cy - radius - 12 > 16;
    const labelY = above ? cy - radius - 12 : cy + radius + 22;
    ctx.fillStyle = 'rgba(244, 239, 226, 0.95)';
    ctx.fillText(label, clamp(cx, 90, width - 90), labelY);
  }

  function draw() {
    if (width === 0) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    if (bed) ctx.drawImage(bed, 0, 0, width, height);

    for (let i = 0; i < PADS.length; i++) drawPad(i, true);

    const focusId = selected ?? highlighted ?? hovered;
    for (const k of koi) {
      const isFocus = k.spec.id === focusId;
      drawTrail(k, focusId ? (isFocus ? 1 : 0.16) : 0.78, isFocus);
    }
    for (const k of koi) {
      if (k.spec.id !== focusId) drawKoi(k, focusId ? 0.4 : 1);
    }
    const focus = focusId ? koi.find((k) => k.spec.id === focusId) : undefined;
    if (focus) drawKoi(focus, 1);

    ctx.fillStyle = '#CB9462';
    for (const pellet of pellets) {
      ctx.beginPath();
      ctx.arc(pellet.x, pellet.y, 3, 0, TAU);
      ctx.fill();
    }

    ctx.lineWidth = 1.2;
    for (const ripple of ripples) {
      const progress = ripple.age / ripple.life;
      const eased = 1 - Math.pow(1 - progress, 3);
      for (let ring = 0; ring < 2; ring++) {
        const radius = ripple.radius * eased * (ring === 0 ? 1 : 0.58);
        if (radius < 1) continue;
        ctx.strokeStyle = `rgba(244, 239, 226, ${(ripple.alpha * (1 - progress) * (ring === 0 ? 1 : 0.6)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, TAU);
        ctx.stroke();
      }
    }

    for (let i = 0; i < PADS.length; i++) drawPad(i, false);

    ctx.fillStyle = 'rgba(199, 166, 162, 0.85)';
    for (const petal of petals) {
      ctx.beginPath();
      ctx.ellipse(petal.x, petal.y, bodyLength * 0.04, bodyLength * 0.022, petal.rot, 0, TAU);
      ctx.fill();
    }

    if (focus) drawFocus(focus);
  }

  function koiAt(x: number, y: number): KoiId | null {
    for (let index = koi.length - 1; index >= 0; index--) {
      const k = koi[index];
      for (let i = 0; i < JOINTS; i++) {
        if (Math.hypot(k.jx[i] - x, k.jy[i] - y) < HALF_W[i] * bodyLength + 12) return k.spec.id;
      }
    }
    return null;
  }

  function frame(now: number) {
    if (!active || destroyed) return;
    const dt = Math.min(0.05, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;
    step(dt);

    const nextHovered = pointer.inside ? koiAt(pointer.x, pointer.y) : null;
    if (nextHovered !== hovered) {
      hovered = nextHovered;
      canvas.style.cursor = hovered ? 'pointer' : '';
    }

    draw();
    raf = requestAnimationFrame(frame);
  }

  function localPoint(event: PointerEvent | MouseEvent): [number, number] {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  }

  const onPointerMove = (event: PointerEvent) => {
    const [x, y] = localPoint(event);
    if (!pointer.inside) {
      pointer.wakeX = x;
      pointer.wakeY = y;
    }
    pointer.x = x;
    pointer.y = y;
    // A resting finger should not keep pushing the koi away.
    pointer.inside = event.pointerType !== 'touch';
  };

  const onPointerLeave = () => {
    pointer.inside = false;
  };

  const onClick = (event: MouseEvent) => {
    const [x, y] = localPoint(event);
    const picked = koiAt(x, y);
    if (picked) {
      options.onPick(picked);
    } else {
      dropFood(x, y);
    }
  };

  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('click', onClick);

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
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('click', onClick);
    },
    setSelected(id) {
      selected = id;
      if (reducedMotion) draw();
    },
    setHighlighted(id) {
      highlighted = id;
      if (reducedMotion) draw();
    },
    feed() {
      // Cycle through a few spots so repeated presses do not stack on one point.
      const spots: [number, number][] = [
        [0.5, 0.5],
        [0.3, 0.38],
        [0.66, 0.62],
      ];
      const [u, v] = spots[feedTurn % spots.length];
      feedTurn += 1;
      dropFood(zone.x0 + u * (zone.x1 - zone.x0), zone.y0 + v * (zone.y1 - zone.y0));
    },
  };
}

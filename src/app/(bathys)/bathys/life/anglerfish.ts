import { TAU, additive, glow, rgba, seeded, type Creature, type Pt } from "./draw";

/**
 * Humpback anglerfish (Melanocetus): a near-black globular predator lit only
 * by its own lure. The brow, the fangs and a thin rim of skin catch the
 * esca's light; the rest of the animal falls away into the water.
 * Bathypelagic midnight zone.
 */

// 1 unit = 1px at scale 1; +x is forward (snout). ~270px nose to tail.
function bodyPath(ctx: CanvasRenderingContext2D, tb: number, gape: number) {
  ctx.beginPath();
  ctx.moveTo(98, 4);
  ctx.bezierCurveTo(94, -20, 74, -46, 42, -56);
  ctx.bezierCurveTo(6, -70, -38, -60, -68, -32);
  ctx.bezierCurveTo(-86, -18, -98, -10 + tb * 0.4, -112, -7 + tb);
  ctx.lineTo(-112, 7 + tb);
  ctx.bezierCurveTo(-98, 14 + tb * 0.4, -92, 36, -62, 50);
  ctx.bezierCurveTo(-30, 64, 18, 68, 54, 58 + gape * 0.4);
  ctx.bezierCurveTo(78, 52, 92, 42 + gape, 103, 30 + gape);
  // lower jaw inner edge, mouth gape, upper jaw inner edge
  ctx.quadraticCurveTo(88, 24 + gape, 58, 20 + gape * 0.7);
  ctx.quadraticCurveTo(38, 17 + gape * 0.4, 26, 8);
  ctx.quadraticCurveTo(52, 3, 82, 4);
  ctx.closePath();
}

// [x, y, length] along the upper jaw (hang down) and the lower jaw (rise up)
const UPPER_TEETH: [number, number, number][] = [
  [88, 4.4, 9], [80, 4, 14], [72, 3.8, 11], [64, 3.6, 16], [56, 3.4, 12], [48, 3.2, 14], [40, 3, 9], [33, 2.8, 8],
];
const LOWER_TEETH: [number, number, number][] = [
  [98, 29, -12], [92, 26, -19], [85, 24, -15], [78, 23, -22], [70, 22, -17], [62, 21, -20], [54, 20, -15], [46, 19, -17], [38, 17, -11],
];

export function createAnglerfish(): Creature {
  const rand = seeded(7);
  const speckles = Array.from({ length: 90 }, () => ({
    x: -100 + rand() * 200,
    y: -60 + rand() * 124,
    r: 0.5 + rand() * 1.1,
  }));
  const esca: Pt = { x: 118, y: -70 };
  let lag = 0;
  let wake = 0;

  return {
    id: "anglerfish",
    center: 0.42,
    parallax: 0.66,
    from: 0.1,
    to: 0.62,
    draw(ctx, s, c) {
      const sc = s.scale;
      const swim = Math.sin(s.t * 1.9);
      const tb = swim * 12;
      const gape = 4 + 3 * Math.sin(s.t * 0.8);

      // the lure trails the swimmer, then springs back
      const localVx = (s.vx * s.facing) / Math.max(sc, 0.1);
      lag += (Math.max(-26, Math.min(26, -localVx * 0.07)) - lag) * Math.min(1, s.dt * 4);
      esca.x = 118 + lag + Math.sin(s.t * 1.2) * 4;
      esca.y = -70 + Math.sin(s.t * 1.6 + 1) * 4 - Math.abs(lag) * 0.3;
      // slow pulse, with an occasional hard flicker like a real esca
      if (Math.sin(s.t * 0.9 + 2) > 0.985) wake = 1;
      wake = Math.max(0, wake - s.dt * 2.5);
      const pulse = 0.72 + 0.2 * Math.sin(s.t * 2.1) + wake * 0.35;

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.translate(s.x, s.y);
      ctx.rotate(Math.sin(s.t * 0.8) * 0.04 - 0.03);
      ctx.scale(s.facing * sc, sc);

      // caudal fin, barely there
      ctx.beginPath();
      ctx.moveTo(-108, -6 + tb);
      ctx.bezierCurveTo(-130, -26 + tb * 1.4, -152, -36 + tb * 1.6, -160, -18 + tb * 1.6);
      ctx.bezierCurveTo(-152, -6 + tb * 1.6, -152, 6 + tb * 1.6, -160, 18 + tb * 1.6);
      ctx.bezierCurveTo(-152, 36 + tb * 1.6, -130, 26 + tb * 1.4, -108, 6 + tb);
      ctx.closePath();
      ctx.fillStyle = rgba(c.glass, 0.35);
      ctx.fill();
      ctx.strokeStyle = rgba(c.slate, 0.18);
      ctx.lineWidth = 0.7;
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-108, i * 1.6 + tb);
        ctx.lineTo(-156, i * 7.5 + tb * 1.6);
        ctx.stroke();
      }

      // body: almost the colour of the water
      bodyPath(ctx, tb, gape);
      const skin = ctx.createLinearGradient(0, -66, 0, 68);
      skin.addColorStop(0, rgba(c.navy, 0.9));
      skin.addColorStop(0.5, rgba(c.trench, 0.96));
      skin.addColorStop(1, rgba(c.trench, 0.96));
      ctx.fillStyle = skin;
      ctx.fill();

      ctx.save();
      bodyPath(ctx, tb, gape);
      ctx.clip();
      ctx.fillStyle = rgba(c.mist, 0.05);
      for (const p of speckles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, TAU);
        ctx.fill();
      }
      // the lure lights the face and brow, and little else
      additive(ctx, () => {
        glow(ctx, esca.x - 8, esca.y + 22, 120, c.cyan, 0.34 * pulse);
        glow(ctx, esca.x - 4, esca.y + 14, 54, c.titanium, 0.16 * pulse);
      });
      ctx.restore();

      // skin rim picks up light near the lure only
      bodyPath(ctx, tb, gape);
      ctx.lineWidth = 1;
      const rim = ctx.createRadialGradient(esca.x - 10, esca.y + 20, 10, esca.x - 10, esca.y + 20, 190);
      rim.addColorStop(0, rgba(c.titanium, 0.5 * pulse));
      rim.addColorStop(0.45, rgba(c.mist, 0.18 * pulse));
      rim.addColorStop(1, rgba(c.mist, 0.02));
      ctx.strokeStyle = rim;
      ctx.stroke();

      // mouth cavity
      ctx.beginPath();
      ctx.moveTo(26, 8);
      ctx.quadraticCurveTo(52, 3, 84, 4);
      ctx.lineTo(100, 28 + gape);
      ctx.quadraticCurveTo(60, 20 + gape * 0.7, 26, 8);
      ctx.fillStyle = rgba(c.trench, 1);
      ctx.fill();

      // fangs: translucent, brightest nearest the lure
      const fang = (x: number, y: number, len: number, curl: number) => {
        const near = 1 - Math.min(Math.hypot(x - esca.x, y - esca.y) / 150, 1);
        const lit = 0.18 + 0.75 * near * near * pulse;
        const dy = y > 12 ? gape : 0;
        ctx.beginPath();
        ctx.moveTo(x - 1.5, y + dy);
        ctx.quadraticCurveTo(x + curl * 0.2, y + dy + len * 0.5, x + curl, y + dy + len);
        ctx.quadraticCurveTo(x + 0.4, y + dy + len * 0.5, x + 1.5, y + dy);
        ctx.closePath();
        ctx.fillStyle = rgba(c.titanium, lit);
        ctx.fill();
      };
      for (const [x, y, l] of UPPER_TEETH) fang(x, y, l, -2);
      for (const [x, y, l] of LOWER_TEETH) fang(x, y, l, 2.5);

      // tiny eye: a dark pit with a glint
      ctx.beginPath();
      ctx.arc(54, -18, 4.2, 0, TAU);
      ctx.fillStyle = rgba(c.trench, 1);
      ctx.fill();
      ctx.strokeStyle = rgba(c.mist, 0.2 * pulse + 0.05);
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(55.2, -19.2, 0.9, 0, TAU);
      ctx.fillStyle = rgba(c.titanium, 0.5 * pulse);
      ctx.fill();

      // pectoral fin
      const flap = Math.sin(s.t * 3.2) * 0.35;
      ctx.save();
      ctx.translate(4, 30);
      ctx.rotate(0.5 + flap);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, 8, -26, 22, -38, 17);
      ctx.bezierCurveTo(-32, 8, -16, 0, 0, 0);
      ctx.fillStyle = rgba(c.slate, 0.16);
      ctx.fill();
      ctx.strokeStyle = rgba(c.mist, 0.1);
      ctx.stroke();
      ctx.restore();

      // illicium: a long rod arching over the snout so the lure hangs before the jaws
      const base = { x: 50, y: -52 };
      ctx.beginPath();
      ctx.moveTo(base.x, base.y);
      ctx.bezierCurveTo(base.x + 8, base.y - 66, esca.x - 40, esca.y - 52, esca.x, esca.y - 8);
      ctx.strokeStyle = rgba(c.mist, 0.34);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // the esca: a lobed bulb on a short filament, with trailing lobes
      ctx.beginPath();
      ctx.moveTo(esca.x, esca.y - 8);
      ctx.lineTo(esca.x + 1, esca.y - 2);
      ctx.strokeStyle = rgba(c.titanium, 0.5);
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.strokeStyle = rgba(c.titanium, 0.4);
      ctx.lineWidth = 0.7;
      for (let k = 0; k < 5; k++) {
        const a = Math.PI * (0.25 + (k / 4) * 0.5);
        const wob = Math.sin(s.t * 2.4 + k) * 1.5;
        ctx.beginPath();
        ctx.moveTo(esca.x, esca.y + 3);
        ctx.quadraticCurveTo(esca.x + Math.cos(a) * 7 + wob, esca.y + 8, esca.x + Math.cos(a) * 11 + wob, esca.y + 8 + Math.sin(a) * 9);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(esca.x, esca.y, 5.5, 7, 0, 0, TAU);
      ctx.fillStyle = rgba(c.titanium, 0.55 + 0.4 * pulse);
      ctx.fill();
      additive(ctx, () => {
        glow(ctx, esca.x, esca.y, 120, c.cyan, 0.26 * pulse);
        glow(ctx, esca.x, esca.y, 52, c.cyan, 0.55 * pulse);
        glow(ctx, esca.x, esca.y, 26, c.amber, 0.22 * pulse);
        glow(ctx, esca.x, esca.y, 10, c.titanium, 0.95 * pulse);
      });

      ctx.restore();
    },
  };
}

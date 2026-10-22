import { TAU, additive, followChain, glow, ribbonPath, rgba, type Creature, type DrawState, type Pt } from "./draw";

/**
 * Dumbo octopus (Grimpoteuthis): a translucent bell of mantle and web,
 * steered by two small ear-like fins, with eight arms that trail on the
 * water and a skirt of web between them. Abyssopelagic.
 */

const ARMS = 8;
const LINKS = 10;

export function createDumbo(): Creature {
  const arms: Pt[][] = Array.from({ length: ARMS }, () =>
    Array.from({ length: LINKS }, () => ({ x: 0, y: 0 })),
  );
  let ready = false;

  // mantle space (+y down, rotated by `lean`) -> viewport
  const world = (s: DrawState, lean: number, lx: number, ly: number): Pt => {
    const cos = Math.cos(lean);
    const sin = Math.sin(lean);
    return { x: s.x + (lx * cos - ly * sin) * s.scale, y: s.y + (lx * sin + ly * cos) * s.scale };
  };

  return {
    id: "dumbo",
    center: 0.62,
    parallax: 0.6,
    from: 0.14,
    to: 0.72,
    draw(ctx, s, c) {
      const sc = s.scale;
      const beat = Math.sin(s.t * 2.2);
      const breathe = 1 + 0.045 * Math.sin(s.t * 2.2 - 0.7);
      const ox = s.x;
      const oy = s.y + Math.sin(s.t * 0.9) * 9 * sc;
      const at = { ...s, x: ox, y: oy };
      // tips forward into its heading and rocks with each beat
      const lean = 0.3 * s.facing + Math.sin(s.t * 0.6) * 0.07 + beat * 0.025;

      // arm roots on the lower rim of the mantle
      const bases: Pt[] = Array.from({ length: ARMS }, (_, k) => {
        const f = k / (ARMS - 1);
        return world(at, lean, -44 + f * 88, 22 - Math.sin(f * Math.PI) * 6);
      });
      if (!ready) {
        arms.forEach((chain, k) => {
          chain.forEach((p, i) => {
            p.x = bases[k].x + (k - 3.5) * i * 1.4 * sc;
            p.y = bases[k].y + i * 8 * sc;
          });
        });
        ready = true;
      }
      const spacing = 8.6 * sc;
      arms.forEach((chain, k) => {
        const fan = (k - 3.5) * 0.12 * spacing;
        followChain(chain, bases[k], spacing, { x: fan - s.vx * 0.0016 * spacing, y: spacing * 0.8 });
      });
      const swayed: Pt[][] = arms.map((chain, k) =>
        chain.map((p, i) => ({
          x: p.x + Math.sin(s.t * 1.5 + k * 0.9 - i * 0.5) * i * 0.9 * sc,
          y: p.y + Math.cos(s.t * 1.2 + k - i * 0.4) * i * 0.35 * sc,
        })),
      );

      ctx.save();
      ctx.globalAlpha = s.alpha;

      // web skirt between the arms
      const webAt = 6;
      ctx.beginPath();
      ctx.moveTo(bases[0].x, bases[0].y);
      ctx.lineTo(swayed[0][webAt].x, swayed[0][webAt].y);
      for (let k = 0; k < ARMS - 1; k++) {
        const a = swayed[k][webAt];
        const b = swayed[k + 1][webAt];
        ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - 11 * sc * (0.75 + 0.25 * beat), b.x, b.y);
      }
      ctx.lineTo(bases[ARMS - 1].x, bases[ARMS - 1].y);
      ctx.closePath();
      const web = ctx.createLinearGradient(0, oy + 20 * sc, 0, oy + 82 * sc);
      web.addColorStop(0, rgba(c.titanium, 0.22));
      web.addColorStop(1, rgba(c.mist, 0.03));
      ctx.fillStyle = web;
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.17);
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // arms
      swayed.forEach((chain) => {
        ribbonPath(ctx, chain, (u) => (6.4 - 5.4 * u) * sc);
        ctx.fillStyle = rgba(c.mist, 0.16);
        ctx.fill();
        ctx.strokeStyle = rgba(c.titanium, 0.2);
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // mantle space
      ctx.translate(ox, oy);
      ctx.rotate(lean);
      ctx.scale(sc, sc);

      // ear fins: small, rounded, flapping together
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.translate(side * 45, -30);
        ctx.scale(side, 1);
        ctx.rotate(-0.1 + beat * 0.45);
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(12, -14, 38, -22, 50, -8);
        ctx.bezierCurveTo(56, 6, 30, 14, 0, 12);
        ctx.closePath();
        const g = ctx.createLinearGradient(0, 0, 52, -6);
        g.addColorStop(0, rgba(c.titanium, 0.28));
        g.addColorStop(1, rgba(c.mist, 0.05));
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = rgba(c.titanium, 0.3);
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.strokeStyle = rgba(c.titanium, 0.12);
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(3, 6);
          ctx.quadraticCurveTo(18 + i * 6, -10 + i * 4, 46 - i * 2, -6 + i * 4);
          ctx.stroke();
        }
        ctx.restore();
      }

      // mantle: a soft dome, brighter at the crown
      ctx.save();
      ctx.scale(1, breathe);
      ctx.beginPath();
      ctx.moveTo(-54, 22);
      ctx.bezierCurveTo(-64, -26, -36, -64, 0, -64);
      ctx.bezierCurveTo(36, -64, 64, -26, 54, 22);
      ctx.quadraticCurveTo(0, 36, -54, 22);
      ctx.closePath();
      const m = ctx.createRadialGradient(0, -34, 6, 0, -10, 84);
      m.addColorStop(0, rgba(c.titanium, 0.34));
      m.addColorStop(0.55, rgba(c.mist, 0.2));
      m.addColorStop(1, rgba(c.slate, 0.26));
      ctx.fillStyle = m;
      ctx.fill();
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = rgba(c.titanium, 0.36);
      ctx.stroke();

      // organs showing through the flesh
      ctx.beginPath();
      ctx.ellipse(0, -22, 26, 30, 0, 0, TAU);
      ctx.fillStyle = rgba(c.slate, 0.12);
      ctx.fill();

      // eyes: small and dark
      for (const ex of [-38, 38]) {
        ctx.beginPath();
        ctx.ellipse(ex, 4, 3.4, 4.4, 0, 0, TAU);
        ctx.fillStyle = rgba(c.trench, 0.6);
        ctx.fill();
        ctx.strokeStyle = rgba(c.titanium, 0.18);
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();

      additive(ctx, () => {
        glow(ctx, 0, -24, 90, c.mist, 0.1);
        glow(ctx, 0, -40, 40, c.titanium, 0.07);
      });

      ctx.restore();
    },
  };
}

import { TAU, additive, followChain, glow, ribbonPath, rgba, type Creature, type Pt } from "./draw";

/**
 * Hadal snailfish (Pseudoliparis): a pale, gelatinous tadpole with a heavy
 * blunt head, a single veil of fin running down its back and belly, and a
 * swim wave that grows toward the tail. Hadopelagic.
 */

const LINKS = 26;

export function createSnailfish(): Creature {
  const pts: Pt[] = Array.from({ length: LINKS }, () => ({ x: 0, y: 0 }));
  let ready = false;

  return {
    id: "snailfish",
    center: 0.84,
    parallax: 0.62,
    from: 0.88,
    to: 0.32,
    draw(ctx, s, c) {
      const sc = s.scale;
      const spacing = 13 * sc;
      const head = { x: s.x, y: s.y + Math.sin(s.t * 0.7) * 10 * sc };
      if (!ready) {
        for (let i = 0; i < LINKS; i++) {
          pts[i].x = head.x - s.facing * i * spacing;
          pts[i].y = head.y;
        }
        ready = true;
      }
      followChain(pts, head, spacing, { x: -s.facing * spacing * 0.5, y: spacing * 0.06 });

      // swim wave: gentle at the head, sweeping at the tail
      const shown: Pt[] = pts.map((p, i) => {
        const a = pts[Math.max(i - 1, 0)];
        const b = pts[Math.min(i + 1, LINKS - 1)];
        let tx = b.x - a.x;
        let ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        tx /= m;
        ty /= m;
        const off = Math.sin(s.t * 2.5 - i * 0.38) * (0.6 + i * 0.62) * sc;
        return { x: p.x - ty * off, y: p.y + tx * off };
      });

      // big blunt head, long taper
      const width = (u: number) => {
        const k = Math.min(u / 0.1, 1);
        const nose = Math.sqrt(1 - (1 - k) * (1 - k)); // round, blunt snout
        return (58 * Math.pow(1 - u, 2.7) + 3.4) * nose * sc;
      };
      const finStart = Math.floor(LINKS * 0.28);
      const veil = (u: number) => (24 * Math.sin(Math.PI * Math.min(Math.max(u, 0), 1)) + 2) * sc;

      ctx.save();
      ctx.globalAlpha = s.alpha;

      // dorsal + anal fin: one continuous veil behind the head
      const fin = shown.slice(finStart);
      const finU = (u: number) => finStart / (LINKS - 1) + u * (1 - finStart / (LINKS - 1));
      ribbonPath(ctx, fin, (u) => width(finU(u)) + veil(u));
      ctx.fillStyle = rgba(c.titanium, 0.07);
      ctx.fill();
      ctx.lineWidth = 0.6;
      for (let i = finStart + 1; i < LINKS - 1; i += 2) {
        const p = shown[i];
        const a = shown[i - 1];
        const b = shown[i + 1];
        let tx = b.x - a.x;
        let ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        tx /= m;
        ty /= m;
        const u = (i - finStart) / (LINKS - 1 - finStart);
        const half = width(i / (LINKS - 1)) / 2;
        const reach = half + veil(u) / 2;
        ctx.beginPath();
        ctx.moveTo(p.x - ty * half, p.y + tx * half);
        ctx.lineTo(p.x - ty * reach, p.y + tx * reach);
        ctx.moveTo(p.x + ty * half, p.y - tx * half);
        ctx.lineTo(p.x + ty * reach, p.y - tx * reach);
        ctx.strokeStyle = rgba(c.titanium, 0.07);
        ctx.stroke();
      }

      // body
      ribbonPath(ctx, shown, width);
      const g = ctx.createRadialGradient(head.x - s.facing * 16 * sc, head.y - 6 * sc, 3, head.x - s.facing * 16 * sc, head.y, 120 * sc);
      g.addColorStop(0, rgba(c.titanium, 0.46));
      g.addColorStop(0.5, rgba(c.mist, 0.26));
      g.addColorStop(1, rgba(c.slate, 0.18));
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.38);
      ctx.lineWidth = 1;
      ctx.stroke();

      // gut and spine seen through the flesh
      ctx.beginPath();
      ctx.moveTo(shown[3].x, shown[3].y);
      for (let i = 4; i < LINKS - 3; i++) ctx.lineTo(shown[i].x, shown[i].y);
      ctx.strokeStyle = rgba(c.slate, 0.3);
      ctx.lineWidth = 1.6 * sc;
      ctx.lineJoin = "round";
      ctx.stroke();

      // head details
      const h0 = shown[0];
      const h1 = shown[3];
      const ang = Math.atan2(h0.y - h1.y, h0.x - h1.x);
      const fx = Math.cos(ang);
      const fy = Math.sin(ang);
      const nx = -fy;
      const ny = fx;
      const ex = h0.x - fx * 24 * sc - nx * 11 * sc;
      const ey = h0.y - fy * 24 * sc - ny * 11 * sc;
      ctx.beginPath();
      ctx.ellipse(ex, ey, 6.4 * sc, 5.8 * sc, ang, 0, TAU);
      ctx.fillStyle = rgba(c.trench, 0.9);
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.4);
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ex - fx * 1.4 - nx * 1.4, ey - fy * 1.4 - ny * 1.4, 1.1, 0, TAU);
      ctx.fillStyle = rgba(c.titanium, 0.7);
      ctx.fill();
      // blunt mouth under the snout
      ctx.beginPath();
      ctx.moveTo(h0.x - fx * 3 * sc + nx * 7 * sc, h0.y - fy * 3 * sc + ny * 7 * sc);
      ctx.quadraticCurveTo(h0.x - fx * 14 * sc + nx * 10 * sc, h0.y - fy * 14 * sc + ny * 10 * sc, h0.x - fx * 24 * sc + nx * 6 * sc, h0.y - fy * 24 * sc + ny * 6 * sc);
      ctx.strokeStyle = rgba(c.slate, 0.5);
      ctx.lineWidth = 1;
      ctx.stroke();

      // pectoral disc, fluttering like a small sail
      const pp = shown[5];
      const flutter = Math.sin(s.t * 4.6) * 0.32;
      ctx.save();
      ctx.translate(pp.x, pp.y + 9 * sc);
      ctx.rotate(ang + Math.PI - 0.5 * s.facing + flutter);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 38 * sc, -0.55, 0.55);
      ctx.closePath();
      ctx.fillStyle = rgba(c.titanium, 0.13);
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.24);
      ctx.lineWidth = 0.7;
      ctx.stroke();
      for (let r = -0.5; r <= 0.51; r += 0.125) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(r) * 38 * sc, Math.sin(r) * 38 * sc);
        ctx.strokeStyle = rgba(c.titanium, 0.12);
        ctx.stroke();
      }
      ctx.restore();

      additive(ctx, () => glow(ctx, head.x - s.facing * 18 * sc, head.y, 80 * sc, c.mist, 0.1));

      ctx.restore();
    },
  };
}

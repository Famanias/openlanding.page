import { TAU, additive, curvePath, followChain, glow, ribbonPath, rgba, type Creature, type Pt, type Rgb } from "./draw";

/**
 * Colonial siphonophore (Apolemia / Praya style): a long translucent stem of
 * zooids trailing behind a cluster of swimming bells, with a wave of cold
 * bioluminescence running down it. Mesopelagic twilight.
 */

const LINKS = 40;
const BELLS = 9;
const TENTACLE_FROM = 11;

function bell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  r: number,
  squeeze: number,
  c: Rgb,
  a: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(1, squeeze);
  ctx.beginPath();
  ctx.moveTo(-r * 0.85, -r * 0.62);
  ctx.bezierCurveTo(-r * 0.1, -r * 1.0, r * 0.95, -r * 0.62, r * 1.0, 0);
  ctx.bezierCurveTo(r * 0.95, r * 0.62, -r * 0.1, r * 1.0, -r * 0.85, r * 0.62);
  ctx.quadraticCurveTo(-r * 0.45, 0, -r * 0.85, -r * 0.62);
  ctx.closePath();
  const g = ctx.createRadialGradient(r * 0.15, 0, r * 0.05, r * 0.1, 0, r * 1.05);
  g.addColorStop(0, rgba(c.titanium, 0.05 * a));
  g.addColorStop(0.65, rgba(c.cyan, 0.1 * a));
  g.addColorStop(1, rgba(c.titanium, 0.36 * a));
  ctx.fillStyle = g;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgba(c.titanium, 0.45 * a);
  ctx.stroke();

  // radial canals + velum
  ctx.strokeStyle = rgba(c.mist, 0.24 * a);
  ctx.lineWidth = 0.8;
  for (const k of [-0.45, 0, 0.45]) {
    ctx.beginPath();
    ctx.moveTo(r * 0.9, 0);
    ctx.quadraticCurveTo(r * 0.3, k * r * 0.95, -r * 0.7, k * r * 0.62);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(-r * 0.72, 0, r * 0.12, r * 0.55, 0, 0, TAU);
  ctx.strokeStyle = rgba(c.titanium, 0.22 * a);
  ctx.stroke();

  // specular glint on the dome
  ctx.beginPath();
  ctx.ellipse(r * 0.35, -r * 0.45, r * 0.3, r * 0.08, -0.5, 0, TAU);
  ctx.fillStyle = rgba(c.titanium, 0.28 * a);
  ctx.fill();
  ctx.restore();
}

export function createSiphonophore(): Creature {
  const pts: Pt[] = Array.from({ length: LINKS }, () => ({ x: 0, y: 0 }));
  let ready = false;

  return {
    id: "siphonophore",
    center: 0.2,
    parallax: 0.72,
    from: 0.96,
    to: 0.5,
    draw(ctx, s, c) {
      const sc = s.scale;
      const spacing = 12.5 * sc;
      const head = { x: s.x, y: s.y + Math.sin(s.t * 0.45) * 26 * sc };
      if (!ready) {
        for (let i = 0; i < LINKS; i++) {
          pts[i].x = head.x - s.facing * i * spacing;
          pts[i].y = head.y + i * spacing * 0.15;
        }
        ready = true;
      }
      // trails behind the heading and sags under its own weight
      followChain(pts, head, spacing, {
        x: -s.facing * spacing * 0.36,
        y: spacing * (0.38 + 0.3 * Math.sin(s.t * 0.5)),
      });

      // draw-only wave so it never stiffens, even when parked
      const shown: Pt[] = pts.map((p, i) => {
        const a = pts[Math.max(i - 1, 0)];
        const b = pts[Math.min(i + 1, LINKS - 1)];
        let tx = b.x - a.x;
        let ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        tx /= m;
        ty /= m;
        const off = Math.sin(s.t * 1.4 - i * 0.3) * (1.2 + i * 0.28) * sc;
        return { x: p.x - ty * off, y: p.y + tx * off };
      });
      const tangent = (i: number) => {
        const a = shown[Math.max(i - 1, 0)];
        const b = shown[Math.min(i + 1, LINKS - 1)];
        return Math.atan2(b.y - a.y, b.x - a.x);
      };

      ctx.save();
      ctx.globalAlpha = s.alpha;

      // tentacles first, behind everything
      for (let i = TENTACLE_FROM; i < LINKS; i += 2) {
        const p = shown[i];
        const len = (48 + ((i * 7) % 37)) * sc;
        const sway = Math.sin(s.t * 1.1 + i) * 5 * sc - s.vx * 0.012;
        const tip = { x: p.x + sway, y: p.y + len };
        const mid = { x: p.x + sway * 0.4 + Math.sin(s.t * 0.9 + i * 1.7) * 3 * sc, y: p.y + len * 0.5 };
        curvePath(ctx, [p, mid, tip]);
        ctx.strokeStyle = rgba(c.mist, 0.26);
        ctx.lineWidth = 0.9 * sc;
        ctx.stroke();
        additive(ctx, () => {
          for (let k = 1; k <= 4; k++) {
            const f = k / 4;
            const bx = p.x + (mid.x - p.x) * Math.min(f * 2, 1) + (tip.x - mid.x) * Math.max(f * 2 - 1, 0);
            const by = p.y + len * f;
            ctx.fillStyle = rgba(c.cyan, 0.32);
            ctx.beginPath();
            ctx.arc(bx, by, 1.1 * sc, 0, TAU);
            ctx.fill();
          }
        });
      }

      // stem
      ribbonPath(ctx, shown, (u) => (5 - 2.6 * u) * sc);
      ctx.fillStyle = rgba(c.titanium, 0.3);
      ctx.fill();
      ctx.strokeStyle = rgba(c.mist, 0.3);
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // bracts and gastrozooids along the stem
      for (let i = TENTACLE_FROM - 1; i < LINKS; i++) {
        const p = shown[i];
        const ang = tangent(i);
        const nx = -Math.sin(ang);
        const ny = Math.cos(ang);
        const side = i % 2 === 0 ? 1 : -1;
        if (i % 2 === 0) {
          // gastrozooid: pale pouch with a lit core
          const bx = p.x + nx * side * 5 * sc;
          const by = p.y + ny * side * 5 * sc;
          const rx = (4.6 + (i % 4) * 0.7) * sc;
          const ry = 9.2 * sc;
          const g = ctx.createRadialGradient(bx, by, 0, bx, by, ry);
          g.addColorStop(0, rgba(c.titanium, 0.5));
          g.addColorStop(1, rgba(c.cyan, 0.12));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.ellipse(bx, by, rx, ry, ang + Math.PI / 2, 0, TAU);
          ctx.fill();
          ctx.strokeStyle = rgba(c.titanium, 0.3);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          // bract: thin translucent leaf
          const lx = p.x + nx * side * 5.5 * sc;
          const ly = p.y + ny * side * 5.5 * sc;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(lx + Math.cos(ang) * 4 * sc, ly + Math.sin(ang) * 4 * sc, lx - Math.cos(ang) * 6 * sc, ly - Math.sin(ang) * 6 * sc);
          ctx.quadraticCurveTo(p.x + nx * side * sc, p.y + ny * side * sc, p.x, p.y);
          ctx.fillStyle = rgba(c.titanium, 0.12);
          ctx.fill();
        }
      }

      // bioluminescent pulse travelling down the colony
      additive(ctx, () => {
        for (let i = TENTACLE_FROM - 2; i < LINKS; i++) {
          const wave = Math.max(0, Math.sin(s.t * 1.9 - i * 0.42));
          const lit = Math.pow(wave, 7);
          if (lit < 0.03) continue;
          glow(ctx, shown[i].x, shown[i].y, 22 * sc, c.cyan, 0.55 * lit);
        }
      });

      // swimming bells (nectophores) clustered behind the float
      for (let k = BELLS - 1; k >= 0; k--) {
        const idx = Math.min(1 + k, LINKS - 1);
        const p = shown[idx];
        const fwd = Math.atan2(shown[idx - 1 > 0 ? idx - 1 : 0].y - p.y, shown[idx - 1 > 0 ? idx - 1 : 0].x - p.x);
        const side = k % 2 === 0 ? 1 : -1;
        const spread = (9 + k * 1.5) * sc;
        const bx = p.x - Math.sin(fwd) * side * spread;
        const by = p.y + Math.cos(fwd) * side * spread;
        const pulse = 1 - 0.07 * Math.max(0, Math.sin(s.t * 2.1 - k * 0.7));
        bell(ctx, bx, by, fwd + side * 0.14, (17 - k * 0.6) * sc, pulse, c, 1);
      }

      // gas float with a hint of amber
      const fp = shown[0];
      ctx.fillStyle = rgba(c.titanium, 0.3);
      ctx.beginPath();
      ctx.ellipse(fp.x + s.facing * 6 * sc, fp.y - 1 * sc, 8 * sc, 5 * sc, 0, 0, TAU);
      ctx.fill();
      additive(ctx, () => glow(ctx, fp.x + s.facing * 4 * sc, fp.y, 14 * sc, c.amber, 0.2));

      ctx.restore();
    },
  };
}

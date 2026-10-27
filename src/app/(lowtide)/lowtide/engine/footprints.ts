import * as THREE from "three";
import { TESTIMONIALS } from "../content/story";
import { smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { chapterX, sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

/** Three trails walking away from the visitor, one per testimonial: (start x, start z, heading in radians). */
export const TRAILS = TESTIMONIALS.map((_, i) => ({
  x: chapterX("proof") - 9.5 + i * 9.5,
  z: 11,
  angle: -Math.PI / 2 + (i - 1) * 0.3,
}));

/** GLSL: footprints pressed in the sand along each trail; `w` washes a trail away (0 intact → 1 gone). */
export const FOOTPRINTS = /* glsl */ `
uniform vec4 uTrails[3];
float lt_prints(vec2 p) {
  float m = 0.0;
  for (int t = 0; t < 3; t++) {
    vec4 tr = uTrails[t];
    vec2 d = vec2(cos(tr.z), sin(tr.z));
    vec2 n = vec2(-d.y, d.x);
    vec2 rel = p - tr.xy;
    float along = dot(rel, d);
    if (along < -0.6 || along > 13.0) continue;
    float across = dot(rel, n);
    float k = floor(along / 1.3 + 0.5);
    float side = mod(k, 2.0) < 0.5 ? 1.0 : -1.0;
    vec2 q = vec2(along - k * 1.3, across - side * 0.3);
    float heel = 1.0 - smoothstep(0.7, 1.0, length((q - vec2(-0.16, 0.0)) / vec2(0.19, 0.14)));
    float ball = 1.0 - smoothstep(0.7, 1.0, length((q - vec2(0.16, 0.0)) / vec2(0.24, 0.17)));
    // the water comes back from the sea end (far along the trail) toward the visitor
    float wash = 1.0 - smoothstep(tr.w * 15.0 - 2.0, tr.w * 15.0, 13.0 - along);
    m = max(m, max(heel, ball) * (1.0 - wash) * smoothstep(13.0, 9.0, along));
  }
  return m;
}
`;

/** Testimonials written beside their trails; the returning tide washes trails and words away in turn. */
export function createFootprints(ctx: WorldCtx, trailUniform: { value: THREE.Vector4[] }): Part {
  const quotes = TESTIMONIALS.map((t, i) => {
    const tr = TRAILS[i];
    const z = tr.z + 2.2;
    const q = createWorldText(ctx, {
      text: `“${t.quote}”\n${t.name}, ${t.city}`,
      font: ctx.fonts.display, fontSize: 0.6, maxWidth: 8.2, mode: "always", color: 0xecefF0, anchorY: "bottom", lineHeight: 1.2, tear: 0.6,
    });
    q.mesh.position.set(tr.x, sandBase(z) + 0.06, z);
    q.mesh.rotation.x = -Math.PI / 2 + 0.5;
    ctx.scene.add(q.mesh);
    return q;
  });

  return {
    update(f, w) {
      quotes.forEach((q, i) => {
        // after the fourth low tide the water comes back and takes each trail in turn
        const start = CHAPTER_POINTS.proof + 0.004 + i * 0.008;
        const wash = smoothstep(start, start + 0.026, f.p);
        trailUniform.value[i].w = wash;
        q.uFade.value = 1 - wash;
        q.uWeight.value = Math.max(w.proof, smoothstep(CHAPTER_POINTS.proof - 0.05, CHAPTER_POINTS.proof, f.p) * (1 - wash));
        q.mesh.visible = q.uWeight.value * q.uFade.value > 0.001;
      });
    },
    dispose() {
      quotes.forEach((q) => q.dispose());
    },
  };
}

import type { BufferAttribute, Color, Points, ShaderMaterial, Vector3 } from "three";

type ThreeModule = typeof import("three");

/* ------------------------------------------------------------------ */
/* CPU particles: dust, road spray, exhaust, arrival sparks             */
/* ------------------------------------------------------------------ */

const particleVertex = /* glsl */ `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
uniform float pixelScale;
varying float vAlpha;
varying vec3 vColor;
#include <fog_pars_vertex>
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * pixelScale / max(0.1, -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`;

const particleFragment = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
#include <fog_pars_fragment>
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  if (a * vAlpha < 0.004) discard;
  gl_FragColor = vec4(vColor, a * vAlpha);
  #include <fog_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

type Particle = {
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  vz: number;
  drag: number;
  lift: number;
  size0: number;
  size1: number;
  alpha: number;
};

export type EmitOptions = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  size0: number;
  size1: number;
  alpha: number;
  color: Color;
  drag?: number;
  lift?: number;
};

export class ParticleSystem {
  readonly points: Points;
  private readonly particles: Particle[] = [];
  private readonly pos: Float32Array;
  private readonly size: Float32Array;
  private readonly alpha: Float32Array;
  private readonly color: Float32Array;
  private readonly material: ShaderMaterial;
  private cursor = 0;

  constructor(THREE: ThreeModule, private readonly capacity: number) {
    this.pos = new Float32Array(capacity * 3);
    this.size = new Float32Array(capacity);
    this.alpha = new Float32Array(capacity);
    this.color = new Float32Array(capacity * 3);
    for (let i = 0; i < capacity; i++) {
      this.particles.push({ life: 0, maxLife: 0, vx: 0, vy: 0, vz: 0, drag: 0, lift: 0, size0: 0, size1: 0, alpha: 0 });
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aSize", new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aColor", new THREE.BufferAttribute(this.color, 3).setUsage(THREE.DynamicDrawUsage));
    this.material = new THREE.ShaderMaterial({
      uniforms: { pixelScale: { value: 400 }, ...THREE.UniformsLib.fog },
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      fog: true,
    });
    this.points = new THREE.Points(g, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 8;
  }

  /** Point size scale: viewport height in device px / (2 tan(fov/2)). */
  setPixelScale(v: number) {
    this.material.uniforms.pixelScale.value = v;
  }

  emit(o: EmitOptions) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.capacity;
    const p = this.particles[i];
    p.life = o.life;
    p.maxLife = o.life;
    p.vx = o.vx;
    p.vy = o.vy;
    p.vz = o.vz;
    p.drag = o.drag ?? 1.5;
    p.lift = o.lift ?? 0;
    p.size0 = o.size0;
    p.size1 = o.size1;
    p.alpha = o.alpha;
    this.pos[i * 3] = o.x;
    this.pos[i * 3 + 1] = o.y;
    this.pos[i * 3 + 2] = o.z;
    this.color[i * 3] = o.color.r;
    this.color[i * 3 + 1] = o.color.g;
    this.color[i * 3 + 2] = o.color.b;
  }

  update(dt: number) {
    let alive = false;
    for (let i = 0; i < this.capacity; i++) {
      const p = this.particles[i];
      if (p.life <= 0) {
        this.alpha[i] = 0;
        continue;
      }
      alive = true;
      p.life -= dt;
      const k = Math.exp(-p.drag * dt);
      p.vx *= k;
      p.vz *= k;
      p.vy = p.vy * k + p.lift * dt;
      this.pos[i * 3] += p.vx * dt;
      this.pos[i * 3 + 1] += p.vy * dt;
      this.pos[i * 3 + 2] += p.vz * dt;
      const t = 1 - Math.max(0, p.life) / p.maxLife;
      this.size[i] = p.size0 + (p.size1 - p.size0) * t;
      // Quick fade in, long fade out.
      this.alpha[i] = p.alpha * Math.min(1, t * 8) * (1 - t) * (1 - t);
    }
    const g = this.points.geometry;
    (g.attributes.position as BufferAttribute).needsUpdate = true;
    (g.attributes.aSize as BufferAttribute).needsUpdate = true;
    (g.attributes.aAlpha as BufferAttribute).needsUpdate = true;
    (g.attributes.aColor as BufferAttribute).needsUpdate = true;
    this.points.visible = alive;
  }

  dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}

/* ------------------------------------------------------------------ */
/* GPU streak fields: rain and speed lines                              */
/* ------------------------------------------------------------------ */

const streakVertex = /* glsl */ `
attribute vec3 seed;
attribute float tail;
uniform vec3 camPos;
uniform vec3 box;
uniform float time;
uniform float fall;
uniform vec3 relVel;
uniform float exposure;
uniform float minLength;
varying float vAlpha;
void main() {
  vec3 p = seed * box;
  p.y -= time * fall;
  vec3 origin = camPos - box * 0.5;
  p = origin + mod(p - origin, box);
  vec3 dir = relVel;
  float len = max(length(dir) * exposure, minLength);
  vec3 streakDir = length(dir) > 0.001 ? normalize(dir) : vec3(0.0, -1.0, 0.0);
  vec3 pos = p - streakDir * len * tail;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = length(p - camPos);
  vAlpha = (1.0 - tail * 0.85) * smoothstep(box.x * 0.5, box.x * 0.18, dist) * smoothstep(0.6, 3.0, dist);
}
`;

const streakFragment = /* glsl */ `
uniform vec3 color;
uniform float opacity;
varying float vAlpha;
void main() {
  float a = vAlpha * opacity;
  gl_FragColor = vec4(color * a, a);
}
`;

export type StreakField = {
  lines: import("three").LineSegments;
  uniforms: {
    camPos: { value: Vector3 };
    box: { value: Vector3 };
    time: { value: number };
    fall: { value: number };
    relVel: { value: Vector3 };
    exposure: { value: number };
    minLength: { value: number };
    color: { value: Color };
    opacity: { value: number };
  };
};

export function createStreakField(
  THREE: ThreeModule,
  count: number,
  box: [number, number, number],
  color: number,
  seedValue: number,
): StreakField {
  const seeds = new Float32Array(count * 2 * 3);
  const tails = new Float32Array(count * 2);
  let a = seedValue >>> 0;
  const rnd = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    const x = rnd();
    const y = rnd();
    const z = rnd();
    for (let k = 0; k < 2; k++) {
      seeds[(i * 2 + k) * 3] = x;
      seeds[(i * 2 + k) * 3 + 1] = y;
      seeds[(i * 2 + k) * 3 + 2] = z;
      tails[i * 2 + k] = k;
    }
  }
  const g = new THREE.BufferGeometry();
  // `position` is required by three for bounds; the shader uses `seed`.
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 2 * 3), 3));
  g.setAttribute("seed", new THREE.BufferAttribute(seeds, 3));
  g.setAttribute("tail", new THREE.BufferAttribute(tails, 1));
  const uniforms: StreakField["uniforms"] = {
    camPos: { value: new THREE.Vector3() },
    box: { value: new THREE.Vector3(...box) },
    time: { value: 0 },
    fall: { value: 0 },
    relVel: { value: new THREE.Vector3() },
    exposure: { value: 0.035 },
    minLength: { value: 0.02 },
    color: { value: new THREE.Color(color) },
    opacity: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: streakVertex,
    fragmentShader: streakFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(g, material);
  lines.frustumCulled = false;
  lines.renderOrder = 9;
  return { lines, uniforms };
}

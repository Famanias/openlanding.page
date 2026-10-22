import type { Color, Mesh, ShaderMaterial, Vector3 } from "three";

type ThreeModule = typeof import("three");

export type Sky = {
  mesh: Mesh;
  uniforms: {
    top: { value: Color };
    horizon: { value: Color };
    sunColor: { value: Color };
    sunDir: { value: Vector3 };
    stars: { value: number };
    clouds: { value: number };
    storm: { value: number };
    flash: { value: number };
    time: { value: number };
  };
};

const vertex = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`;

const fragment = /* glsl */ `
uniform vec3 top;
uniform vec3 horizon;
uniform vec3 sunColor;
uniform vec3 sunDir;
uniform float stars;
uniform float clouds;
uniform float storm;
uniform float flash;
uniform float time;
varying vec3 vDir;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < CLOUD_OCTAVES; i++) {
    s += noise(p) * a;
    p = p * 2.07 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return s;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = dir.y;
  float up = clamp(h, 0.0, 1.0);
  vec3 col = mix(horizon, top, pow(smoothstep(0.0, 0.62, up), 0.75));

  float d = max(dot(dir, normalize(sunDir)), 0.0);
  float halo = pow(d, 6.0) * 0.28 + pow(d, 48.0) * 0.55;
  float disc = smoothstep(0.99955, 0.99975, d);
  float sunUp = smoothstep(-0.08, 0.04, sunDir.y);
  col += sunColor * (halo + disc * 6.0) * sunUp * (1.0 - storm * 0.85);

  // Stars on clear nights.
  if (stars > 0.001 && h > 0.0) {
    vec2 suv = vec2(atan(dir.x, dir.z) * 160.0, h * 260.0);
    vec2 cell = floor(suv);
    float rnd = hash(cell);
    vec2 f = fract(suv) - 0.5;
    float star = step(0.985, rnd) * smoothstep(0.35, 0.0, length(f));
    float tw = 0.65 + 0.35 * sin(time * (1.5 + rnd * 3.0) + rnd * 40.0);
    col += vec3(0.85, 0.9, 1.0) * star * tw * stars * smoothstep(0.02, 0.25, h) * 1.4;
  }

  // Clouds projected on a flat ceiling.
  if (h > 0.0) {
    vec2 uv = dir.xz / (h + 0.14) * 0.85 + vec2(time * 0.006, time * 0.002);
    float n = fbm(uv * 1.3);
    float threshold = mix(0.78, 0.28, clouds);
    float cover = smoothstep(threshold, threshold + 0.22, n);
    vec3 lit = mix(horizon * 1.08, sunColor, 0.22 + 0.5 * pow(d, 3.0) * sunUp);
    vec3 cloudCol = mix(mix(lit, top * 0.9 + horizon * 0.25, 0.25), top * 0.7 + horizon * 0.3, storm * 0.8);
    col = mix(col, cloudCol, cover * smoothstep(0.0, 0.12, h) * mix(0.75, 0.95, storm));
  }

  col += vec3(0.55, 0.6, 0.78) * flash;
  // Dither to hide gradient banding.
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export function buildSky(THREE: ThreeModule, cloudOctaves: number): Sky {
  const uniforms: Sky["uniforms"] = {
    top: { value: new THREE.Color(0x4f8fd0) },
    horizon: { value: new THREE.Color(0xdcebf3) },
    sunColor: { value: new THREE.Color(0xffffff) },
    sunDir: { value: new THREE.Vector3(0, 0.3, -1) },
    stars: { value: 0 },
    clouds: { value: 0.4 },
    storm: { value: 0 },
    flash: { value: 0 },
    time: { value: 0 },
  };
  const material: ShaderMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    defines: { CLOUD_OCTAVES: cloudOctaves },
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1500, 48, 24), material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;
  mesh.name = "sky";
  return { mesh, uniforms };
}

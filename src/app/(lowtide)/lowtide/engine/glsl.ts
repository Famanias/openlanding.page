/** GLSL shared by the world's shaders. */

export const NOISE = /* glsl */ `
float lt_hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float lt_noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(lt_hash(i), lt_hash(i + vec2(1.0, 0.0)), u.x), mix(lt_hash(i + vec2(0.0, 1.0)), lt_hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float lt_fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * lt_noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; }
  return v;
}
`;

/** Screen-space lantern: a soft pool of warm light around the pointer. */
export const LANTERN = /* glsl */ `
uniform vec4 uLantern;
uniform vec2 uResolution;
const vec3 LT_LANTERN_COLOR = vec3(1.0, 0.84, 0.6);
float lt_lantern() {
  vec2 ndc = gl_FragCoord.xy / uResolution * 2.0 - 1.0;
  vec2 d = ndc - uLantern.xy;
  d.x *= uResolution.x / uResolution.y;
  float r = uLantern.z;
  return 1.0 - smoothstep(r * 0.15, r, length(d));
}
`;

/** Distance fog toward the horizon colour. */
export const FOG = /* glsl */ `
vec3 lt_fog(vec3 col, vec3 worldPos, vec3 camPos, vec3 horizon) {
  float d = length(worldPos - camPos);
  float f = 1.0 - exp(-pow(d / 900.0, 1.6));
  return mix(col, horizon, clamp(f, 0.0, 1.0));
}
`;

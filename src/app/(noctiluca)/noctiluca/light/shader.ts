/**
 * One full-screen fragment shader draws the whole corridor.
 *
 * Each pixel casts a ray from the same camera the CSS 3D world uses (CSS px,
 * y down, z toward the viewer), hits the box-shaped corridor (two walls, floor,
 * ceiling), finds which room that depth belongs to, and paints that room's light:
 * a domain-warped noise field mapped through four colour stops, shaped per room
 * (horizon, curtain, sparks …). DOM door frames, plaques and labels sit in front,
 * so the shader never has to know about them.
 */

export const ROOMS = 8;

export const VERTEX = /* glsl */ `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;
#define ROOMS ${ROOMS}

uniform vec2 uRes;        // canvas size, device px
uniform float uCss;       // css px per canvas px
uniform float uP;         // perspective distance, css px
uniform vec3 uCam;        // camera position, css px
uniform vec2 uLook;       // yaw, pitch (rad)
uniform vec3 uBox;        // half width, ceiling y (−), floor y (+)
uniform vec2 uRoom;       // room depth, door offset (both in P)
uniform float uTime;
uniform vec3 uPal[ROOMS * 4];
uniform vec4 uStyle[ROOMS];   // style id, speed, scale, glow
uniform vec3 uPointer;    // css px from centre (y down), energy 0–1
uniform float uFlat;      // 1: flat field for phones (no corridor)
uniform float uFlatRoom;  // room position in flat mode (fractional = crossfade)
uniform vec3 uInk;

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

vec3 stop(int r, int i) { return uPal[r * 4 + i]; }

// Smooth four-stop ramp.
vec3 ramp(int r, float x) {
  x = clamp(x, 0.0, 1.0) * 3.0;
  int i = int(min(floor(x), 2.0));
  float f = smoothstep(0.0, 1.0, x - float(i));
  return mix(stop(r, i), stop(r, i + 1), f);
}

// Three-stop ramp (deep → mid → bright), keeping stop 3 for a highlight.
vec3 ramp3(int r, float x) {
  x = clamp(x, 0.0, 1.0) * 2.0;
  int i = int(min(floor(x), 1.0));
  float f = smoothstep(0.0, 1.0, x - float(i));
  return mix(stop(r, i), stop(r, i + 1), f);
}

// uv.x runs along the corridor (in P), uv.y is height: 0 at the ceiling, 1 at the floor.
vec3 field(int r, vec2 uv, vec2 screen) {
  vec4 st = uStyle[r];
  int style = int(st.x + 0.5);
  float tt = uTime * st.y;
  vec2 p = vec2(uv.x, uv.y * 1.4) / st.z;

  // The mesh-gradient core: two warps of fbm, so the colour flows like poured silk.
  vec2 q = vec2(fbm(p * 0.9 + vec2(0.0, tt)), fbm(p * 0.9 + vec2(5.2, 1.3) - vec2(tt * 0.8, 0.0)));
  float w = fbm(p * 0.7 + 2.2 * q + vec2(tt * 0.6, -tt * 0.3));
  float v = uv.y;
  vec3 col;

  if (style == 1) {
    // Blue hour: the sky ramp, darkest overhead, with a warm horizon band low on the wall.
    float x = mix(v * 1.05, w, 0.3);
    col = ramp3(r, x);
    float band = exp(-pow((v - 0.8 + (w - 0.5) * 0.14) * 8.0, 2.0));
    col = mix(col, stop(r, 3), band * 0.75);
  } else if (style == 2) {
    // Aurora: hanging curtains, green low, violet at the top edge.
    col = mix(stop(r, 0), stop(r, 1), w * 0.9);
    float n = fbm(vec2(p.x * 0.45 + tt * 0.5, tt * 0.35));
    float c = pow(0.5 + 0.5 * sin(p.x * 2.6 + n * 7.0 + tt), 3.0) * 1.7;
    float rays = 0.65 + 0.35 * noise(vec2(p.x * 26.0 + n * 4.0, v * 0.6 + tt));
    float hang = smoothstep(0.98, 0.42, v) * smoothstep(0.02, 0.22, v);
    vec3 cc = mix(stop(r, 2), stop(r, 3), smoothstep(0.5, 0.08, v));
    col += cc * c * rays * hang * (0.55 + 0.8 * w);
  } else if (style == 3) {
    // Noctiluca: dark water, a slow swell, and sparks that answer the pointer.
    col = ramp3(r, w * 0.62);
    float swell = 0.68 + 0.05 * sin(p.x * 2.8 + tt * 5.0) + (w - 0.5) * 0.1;
    col += stop(r, 2) * smoothstep(0.035, 0.0, abs(v - swell)) * 0.55;
    col += stop(r, 2) * smoothstep(swell, 1.0, v) * 0.18;
    float near = exp(-length(screen - uPointer.xy) / 340.0);
    float energy = 0.18 + uPointer.z * (0.5 + 1.6 * near);
    float s = noise(uv * vec2(19.0, 27.0) + vec2(tt * 2.0, -tt * 3.0));
    float flash = pow(s, 14.0) * (0.6 + 0.4 * sin(uTime * 9.0 + s * 40.0));
    col += stop(r, 3) * flash * energy * 4.0;
  } else if (style == 4) {
    // Alpenglow: light kept at the top of the wall, like the last of it on a peak.
    float x = mix(1.0 - v, w, 0.34);
    col = ramp(r, x * 0.92);
    col += stop(r, 3) * exp(-pow((v - 0.18 - (w - 0.5) * 0.2) * 5.0, 2.0)) * 0.22;
  } else if (style == 6) {
    // Zodiacal light: a dim cone, quieter than every room before it.
    float cone = exp(-pow((v - 0.58) * 2.6, 2.0));
    col = ramp(r, w * 0.45 + cone * 0.35);
  } else {
    // Mist (foyer, exit) and the visitor's own score: the plain mesh gradient.
    float x = smoothstep(0.08, 0.92, w + (q.x - 0.5) * 0.45);
    col = ramp(r, x);
  }
  return col * st.w;
}

vec3 rotX(vec3 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(v.x, v.y * c - v.z * s, v.y * s + v.z * c);
}

vec3 rotY(vec3 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
}

int roomAt(float along) {
  float rf = floor((along - uRoom.y) / uRoom.x) + 1.0;
  return int(clamp(rf, 0.0, float(ROOMS - 1)));
}

void main() {
  vec2 screen = (gl_FragCoord.xy - uRes * 0.5) * uCss;
  screen.y = -screen.y;
  vec2 viewport = uRes * uCss;
  vec3 col;

  if (uFlat > 0.5) {
    vec2 uv = vec2(screen.x / uP * 1.3 + 4.0, screen.y / viewport.y + 0.5);
    int r0 = int(floor(uFlatRoom));
    int r1 = min(r0 + 1, ROOMS - 1);
    float f = smoothstep(0.0, 1.0, fract(uFlatRoom));
    col = mix(field(r0, uv, screen), field(r1, uv, screen), f);
    col *= 0.62;
  } else {
    // Undo the CSS world transform: camera = rotateX(pitch) rotateY(yaw) (world − cam).
    vec3 d = normalize(vec3(screen, -uP));
    d = rotY(rotX(d, -uLook.y), -uLook.x);
    vec3 o = uCam;

    float hw = uBox.x;
    float dx = abs(d.x) < 1e-5 ? 1e-5 : d.x;
    float dy = abs(d.y) < 1e-5 ? 1e-5 : d.y;
    float tx = ((dx > 0.0 ? hw : -hw) - o.x) / dx;
    float ty = ((dy > 0.0 ? uBox.z : uBox.y) - o.y) / dy;
    float t = min(tx, ty);
    vec3 h = o + d * t;
    float along = -h.z / uP;
    int r = roomAt(along);

    if (tx < ty) {
      // Side walls.
      float side = sign(dx);
      float v = (h.y - uBox.y) / (uBox.z - uBox.y);
      vec2 uv = vec2(along * 0.9 + side * 3.7, v);
      col = field(r, uv, screen);
      // Light spills from the next room's doorway onto the last stretch of wall.
      float fr = fract((along - uRoom.y) / uRoom.x);
      if (fr > 0.82 && r < ROOMS - 1) {
        col = mix(col, field(r + 1, uv, screen), smoothstep(0.82, 1.0, fr) * 0.35);
      }
      col *= 0.55 + 0.45 * smoothstep(0.0, 0.1, v) * smoothstep(1.0, 0.86, v);
    } else if (dy > 0.0) {
      // Floor: dark polished concrete reflecting the walls.
      float across = h.x / hw;
      float side = across < 0.0 ? -1.0 : 1.0;
      vec2 uv = vec2(along * 0.9 + side * 3.7 + across * 0.2, 1.0 - (1.0 - abs(across)) * 0.85);
      vec3 refl = field(r, uv, screen);
      col = uInk + refl * (0.06 + 0.32 * pow(abs(across), 3.0));
      col += vec3(0.96, 0.94, 0.9) * exp(-abs(across) * 30.0) * 0.03;
    } else {
      // Ceiling: dark, with one cove light running the length of the house.
      float across = h.x / hw;
      vec3 bounce = field(r, vec2(along * 0.9, 0.02), screen);
      col = uInk + bounce * 0.07;
      col += vec3(0.96, 0.94, 0.9) * (smoothstep(0.012, 0.0, abs(across)) * 0.55 + exp(-abs(across) * 22.0) * 0.08);
    }

    float dist = t / uP;
    col = mix(uInk, col, exp(-dist * 0.16));
  }

  // Vignette and a whisper of dither so the gradients never band.
  vec2 n = screen / viewport;
  col *= 1.0 - 0.55 * dot(n, n);
  col += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}
`;

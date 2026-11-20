'use client';

/**
 * Custom GLSL shaders for the 2.5D Celestial Horizon space background:
 * - Deep atmospheric void gradient with subtle dithering (zero color banding)
 * - Painterly domain-warped FBM nebula cloud planes with feathered edges
 * - Rayleigh + twilight Fresnel atmospheric scattering shell
 * - Multi-band planetary rings with analytical sphere-shadow projection
 * - Crisp twinkling starfield & soft-bokeh cosmic dust particles
 */

export const SKY_BACKDROP_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const SKY_BACKDROP_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    // Linear-space deep nocturnal zenith (encodes via OutputPass sRGB to velvety #04070f)
    vec3 deepVoid = vec3(0.0014, 0.0025, 0.0072);
    vec3 midIndigo = vec3(0.0045, 0.0105, 0.029);
    vec3 horizonSlate = vec3(0.012, 0.031, 0.074);
    vec3 subtleWarmGlow = vec3(0.048, 0.026, 0.016);

    // Asymmetric radial lift behind the right-hand planet
    vec2 planetCenter = vec2(0.71, 0.43);
    float distPlanet = length((vUv - planetCenter) * vec2(1.15, 0.85));
    float horizonLift = smoothstep(0.95, 0.08, distPlanet);

    // Gentle diagonal deep-space sheen
    float verticalGrad = smoothstep(1.0, 0.0, vUv.y);
    vec3 col = mix(deepVoid, midIndigo, verticalGrad * 0.42 + horizonLift * 0.48);
    col = mix(col, horizonSlate, pow(max(1e-5, horizonLift), 1.8) * 0.55);

    // Whisper of distant warm stellar twilight near the upper-right limb
    float limbDist = length((vUv - vec2(0.62, 0.54)) * vec2(1.3, 1.0));
    col += subtleWarmGlow * smoothstep(0.55, 0.02, limbDist) * 0.34;

    // Preserve a calm, extra-dark velvet pocket in the left text-safe hero zone
    float safeZoneMask = smoothstep(0.62, 0.16, vUv.x) * smoothstep(0.95, 0.32, abs(vUv.y - 0.52) * 2.0);
    col = mix(col, deepVoid * 0.85, safeZoneMask * 0.65);

    // Subtle anti-banding dither
    float dither = (hash12(gl_FragCoord.xy + fract(uTime * 0.001)) - 0.5) / 512.0;
    gl_FragColor = vec4(max(vec3(0.0), col + dither), 1.0);
  }
`;

export const NEBULA_CLOUD_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const NEBULA_CLOUD_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform float uOpacity;
  uniform float uSeed;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.02 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 centered = vUv * 2.0 - 1.0;
    float radial = length(centered * vec2(0.88, 1.08));
    // Smooth elliptical feather so plane edges are completely invisible
    float edgeMask = smoothstep(1.0, 0.08, radial);

    float slowT = uTime * 0.022;
    vec2 p = vUv * 2.4 + vec2(uSeed * 3.1, uSeed * 1.7);

    // Subtle two-stage domain warp for organic cosmic gas filaments
    vec2 q = vec2(
      fbm(p + vec2(slowT, -slowT * 0.4)),
      fbm(p + vec2(5.2 - slowT * 0.5, 1.3 + slowT * 0.3))
    );
    float f = fbm(p + 1.95 * q + vec2(slowT * 0.35, 0.0));

    float cloudDensity = smoothstep(0.22, 0.84, f) * edgeMask;
    float filament = smoothstep(0.38, 0.85, q.x * 0.55 + f * 0.45);
    float coreLift = pow(max(1e-5, smoothstep(0.42, 0.92, f)), 1.45) * edgeMask;

    // Gentle HDR luminance lift in glowing nebula filaments so UnrealBloomPass creates an ethereal aura
    vec3 color = mix(uColorPrimary, uColorSecondary, filament) * (1.28 + coreLift * 1.45);
    float alpha = clamp(cloudDensity * uOpacity, 0.0, 0.88);

    if (alpha < 0.002) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export const ATMOSPHERE_RIM_VERTEX = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const ATMOSPHERE_RIM_FRAGMENT = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  uniform vec3 uLightDir;
  uniform vec3 uDayColor;
  uniform vec3 uTwilightColor;
  uniform float uIntensity;
  uniform float uPower;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vWorldNormal);
    vec3 lightDir = normalize(uLightDir);

    float ndotv = max(0.0, dot(normal, viewDir));
    float fresnel = pow(max(1e-5, 1.0 - ndotv), uPower);

    float sunDot = dot(normal, lightDir);
    float daySide = smoothstep(-0.22, 0.62, sunDot);
    float twilightOffset = (sunDot - 0.06) * 3.4;
    float twilightBand = exp(-(twilightOffset * twilightOffset));

    vec3 scatterColor = mix(uDayColor, uTwilightColor, twilightBand * 0.52);
    float visibility = 0.06 + daySide * 0.94;
    float alpha = fresnel * visibility * uIntensity;

    gl_FragColor = vec4(scatterColor * (1.12 + fresnel * 1.05), alpha);
  }
`;

/**
 * Dedicated BackSide outer atmospheric halo shader.
 * Uses dot(-normal, viewDir) so glow peaks smoothly near the planet limb
 * and feathers cleanly to 0.0 at the outer sphere boundary (zero hard edge).
 */
export const OUTER_CORONA_FRAGMENT = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  uniform vec3 uLightDir;
  uniform vec3 uDayColor;
  uniform vec3 uTwilightColor;
  uniform float uIntensity;
  uniform float uPower;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    // For BackSide spheres, outward normal points AWAY from viewDir;
    // -dot(normal, viewDir) is 0 at the silhouette edge and increases inward.
    float inward = clamp(dot(-normalize(vWorldNormal), viewDir), 0.0, 1.0);
    float softFalloff = pow(max(1e-5, inward), uPower);

    vec3 lightDir = normalize(uLightDir);
    float sunDot = dot(normalize(vWorldNormal), lightDir);
    float daySide = smoothstep(-0.35, 0.65, sunDot);
    float twilightOffset = (sunDot - 0.02) * 2.8;
    float twilightBand = exp(-(twilightOffset * twilightOffset));

    vec3 glowColor = mix(uDayColor, uTwilightColor, twilightBand * 0.45);
    float alpha = softFalloff * (0.1 + 0.9 * daySide) * uIntensity;

    if (alpha < 0.002) discard;
    gl_FragColor = vec4(glowColor, alpha);
  }
`;

export const PLANETARY_RING_VERTEX = /* glsl */ `
  varying vec3 vLocalPos;
  varying vec3 vWorldPos;

  void main() {
    vLocalPos = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const PLANETARY_RING_FRAGMENT = /* glsl */ `
  varying vec3 vLocalPos;
  varying vec3 vWorldPos;

  uniform float uInnerRadius;
  uniform float uOuterRadius;
  uniform vec3 uPlanetCenter;
  uniform float uPlanetRadius;
  uniform vec3 uLightDir;
  uniform float uTime;

  void main() {
    float r = length(vLocalPos.xy);
    float t = (r - uInnerRadius) / max(0.0001, (uOuterRadius - uInnerRadius));
    if (t < 0.0 || t > 1.0) discard;

    // Soft inner & outer radial taper
    float innerFade = smoothstep(0.0, 0.16, t);
    float outerFade = smoothstep(1.0, 0.82, t);

    // Multi-frequency concentric ice & dust ringlets
    float bandA = 0.5 + 0.5 * sin(t * 46.0 + 0.6);
    float bandB = 0.5 + 0.5 * sin(t * 112.0 - 1.4);
    float bandC = 0.5 + 0.5 * cos(t * 19.0);

    // Prominent Cassini-style orbital division around t = 0.62
    float cassiniGap = 1.0 - smoothstep(0.055, 0.012, abs(t - 0.62)) * 0.88;
    // Secondary fine Encke-style division near outer rim
    float enckeGap = 1.0 - smoothstep(0.022, 0.005, abs(t - 0.82)) * 0.7;

    float ringDensity =
      (0.36 + 0.34 * bandA + 0.18 * bandB + 0.14 * bandC) *
      innerFade *
      outerFade *
      cassiniGap *
      enckeGap;

    // Subtle azimuthal shimmer so rings feel crystalline rather than flat plastic
    float angle = atan(vLocalPos.y, vLocalPos.x);
    float shimmer = 0.92 + 0.08 * sin(angle * 3.0 + t * 8.0 + uTime * 0.08);

    // Analytical ray-sphere shadow cast by the planet onto the back half of the ring
    vec3 rayDir = normalize(uLightDir);
    vec3 oc = vWorldPos - uPlanetCenter;
    float b = dot(oc, rayDir);
    float shadowFactor = 1.0;
    if (b < 0.0) {
      vec3 closest = oc - rayDir * b;
      float distToAxis = length(closest);
      shadowFactor = smoothstep(uPlanetRadius * 0.95, uPlanetRadius * 1.06, distToAxis);
    }

    vec3 innerIce = vec3(0.56, 0.74, 0.92);
    vec3 midChampagne = vec3(0.86, 0.78, 0.7);
    vec3 outerSlate = vec3(0.46, 0.58, 0.78);

    vec3 ringColor = mix(innerIce, midChampagne, smoothstep(0.15, 0.58, t));
    ringColor = mix(ringColor, outerSlate, smoothstep(0.62, 0.95, t));

    vec3 litColor = ringColor * mix(0.12, 1.15, shadowFactor) * shimmer;
    float alpha = clamp(ringDensity * 0.66, 0.0, 0.74);

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(litColor, alpha);
  }
`;

export const STARFIELD_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = color;
    vTwinkle = 0.78 + 0.22 * sin(uTime * 0.85 + aPhase);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float depthScale = 28.0 / max(8.0, -mvPosition.z);
    gl_PointSize = clamp(aSize * depthScale * uPixelRatio, 1.2, 9.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const STARFIELD_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float dist = length(centered);
    if (dist > 0.5) discard;

    float core = smoothstep(0.36, 0.03, dist);
    float halo = exp(-dist * dist * 16.0) * 0.52;
    float alpha = clamp((core + halo) * vTwinkle, 0.0, 1.0);

    // Push bright pinpoint star cores slightly into HDR (>1.0) so bloom creates crisp ethereal halos
    gl_FragColor = vec4(vColor * (1.28 + core * 1.15), alpha);
  }
`;

export const COSMIC_DUST_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aSpeed;
  attribute float aPhase;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;
    vec3 pos = position;

    // Calm orbital buoyancy and horizontal drift
    float t = uTime * aSpeed;
    pos.x += sin(t * 0.65 + aPhase) * 0.45;
    pos.y += cos(t * 0.52 + aPhase * 1.3) * 0.36;
    pos.z += sin(t * 0.35 + aPhase * 0.7) * 0.22;

    vAlpha = 0.42 + 0.44 * (0.5 + 0.5 * sin(uTime * 0.55 + aPhase));

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float depthScale = 16.0 / max(3.5, -mvPosition.z);
    gl_PointSize = clamp(aSize * depthScale * uPixelRatio, 2.2, 22.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const COSMIC_DUST_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float dist = length(centered);
    if (dist > 0.5) discard;

    // Luminous pinpoint inside soft atmospheric bokeh halo with subtle HDR shimmer
    float bokeh = pow(max(1e-5, 1.0 - dist * 2.0), 2.1);
    float core = smoothstep(0.24, 0.0, dist) * 0.62;
    float alpha = clamp((bokeh * 0.78 + core) * vAlpha, 0.0, 0.94);
    if (alpha < 0.005) discard;

    gl_FragColor = vec4(vColor * (1.32 + core * 0.9), alpha);
  }
`;

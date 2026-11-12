import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue, stepSpring, type SpringState } from '../../engine/math';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from '../../engine/passes/FullscreenPass';

// Pass 1: Source field with flowing multicolor strata and crisp optical meridian contours
// so magnification and curvature inside the glass lens are unmistakably visible
const LENS_SOURCE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uAspect;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float t = uTime * (0.32 + uSpeed * 0.65);

    // Layered chromatic topographic ribbons
    float wave1 = sin(p.x * 3.2 + p.y * 2.1 + t * 0.8 + sin(p.y * 4.2 - t * 0.5) * 0.65);
    float wave2 = cos(p.x * 2.4 - p.y * 3.5 - t * 0.65 + cos(p.x * 3.6 + t * 0.4) * 0.55);
    float orb = exp(-length(p - vec2(0.18 + sin(t * 0.5) * 0.16, 0.04 + cos(t * 0.4) * 0.14)) * 2.4);

    vec3 col = uBgColor;
    col = mix(col, uColor0, smoothstep(-0.35, 0.65, wave1) * 0.85);
    col = mix(col, uColor1, smoothstep(-0.2, 0.75, wave2) * 0.78);
    col = mix(col, uColor2, orb * 0.92);
    col = mix(col, uColor3, smoothstep(0.35, 0.92, wave1 * wave2 + orb * 0.5) * 0.85);

    // Crisp architectural meridian lines & topographic rings (demonstrates lens magnification clearly)
    float contourField = (p.x * 4.5 + p.y * 2.5 + sin(p.y * 5.0 + t * 0.6) * 0.55);
    float contourLine = smoothstep(0.032, 0.0, abs(fract(contourField) - 0.5));
    float orthoGrid = smoothstep(0.015, 0.0, abs(fract(p.x * 3.0) - 0.5)) +
                      smoothstep(0.015, 0.0, abs(fract(p.y * 3.0) - 0.5));

    col += mix(uColor3, vec3(1.0), 0.55) * contourLine * 0.24;
    col += vec3(1.0, 0.96, 0.9) * clamp(orthoGrid, 0.0, 1.0) * 0.09;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Pass 2: Optical Thick-Glass Lens sampling Pass 1 with nonlinear magnification & dispersion
const LENS_OPTICAL_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tSource;
  uniform float uTime;
  uniform float uInteraction;
  uniform vec2 uLensCenter;
  uniform vec2 uLensStretch;
  uniform float uFocalPower;
  uniform float uClickPulse;
  uniform float uAspect;
  uniform float uIntro;
  uniform vec3 uColor0;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec3 baseSource = texture2D(tSource, uv).rgb;

    // Relative position to the thick glass lens in aspect-corrected coordinates
    vec2 rel = (uv - uLensCenter) * vec2(uAspect, 1.0);

    // Slight rotation + stretch from pointer drag with spring recovery
    float angle = uLensStretch.x * 0.28 + sin(uTime * 0.35) * 0.06;
    float ca = cos(angle);
    float sa = sin(angle);
    vec2 rotRel = mat2(ca, -sa, sa, ca) * rel;

    // Elliptical organic lens radii (substantial right-side presence)
    vec2 radii = vec2(0.39 + uLensStretch.x * 0.09, 0.33 + uLensStretch.y * 0.08) *
                 mix(0.4, 1.0, uIntro);
    vec2 q = rotRel / max(vec2(0.05), radii);

    // Super-ellipse / capsule-like refined curvature
    float rNorm = pow(pow(abs(q.x), 2.15) + pow(abs(q.y), 2.15), 1.0 / 2.15);

    // Smooth boundary mask of the thick optical element
    float insideMask = 1.0 - smoothstep(0.965, 1.005, rNorm);

    // Spherical/aspheric dome height z = sqrt(1 - r^2) inside the lens
    float clampedR = min(0.995, rNorm);
    float domeZ = sqrt(max(0.01, 1.0 - clampedR * clampedR));

    // Outward 3D surface normal of the curved thick lens
    vec2 domeGrad = (q / max(0.12, domeZ)) * 0.85;
    vec3 normal = normalize(vec3(domeGrad.x, domeGrad.y, 1.0));

    // Nonlinear optical magnification + bevel refraction
    // uFocalPower toggles between convex magnification (+0.36) and concave wide-field (-0.28)
    float radialCurve = mix(1.0, 1.85, clampedR * clampedR);
    vec2 lensOffset = (uv - uLensCenter) * (-uFocalPower * radialCurve);
    vec2 bevelRefract = -normal.xy * (0.045 + 0.055 * pow(clampedR, 2.2)) * uInteraction;
    vec2 totalDisp = lensOffset + bevelRefract;

    // Chromatic aberration (RGB wavelength separation strongest near the thick lens rim)
    float dispersion = (0.004 + 0.014 * pow(clampedR, 2.4)) * (0.7 + 0.3 * uInteraction);
    vec2 dir = length(rel) > 0.0001 ? normalize(rel) : vec2(1.0, 0.0);

    vec2 uvR = clamp(uv + totalDisp + dir * dispersion, 0.002, 0.998);
    vec2 uvG = clamp(uv + totalDisp, 0.002, 0.998);
    vec2 uvB = clamp(uv + totalDisp - dir * dispersion, 0.002, 0.998);

    vec3 lensSample = vec3(
      texture2D(tSource, uvR).r,
      texture2D(tSource, uvG).g,
      texture2D(tSource, uvB).b
    );

    // Optical glass transmittance tint, Fresnel edge reflection, and caustic focal ring
    float fresnel = pow(1.0 - domeZ, 3.0);
    float rimBand = exp(-pow((rNorm - 0.96) / 0.032, 2.0));
    float innerCaustic = exp(-pow((rNorm - 0.82) / 0.07, 2.0)) *
                         (0.5 + 0.5 * sin(atan(rotRel.y, rotRel.x) * 2.0 + uTime * 1.4));

    vec3 lightDir1 = normalize(vec3(-0.55, 0.65, 0.52));
    vec3 lightDir2 = normalize(vec3(0.65, -0.45, 0.61));
    float spec1 = pow(max(0.0, dot(normal, lightDir1)), 36.0);
    float spec2 = pow(max(0.0, dot(normal, lightDir2)), 24.0);

    vec3 glassInterior = lensSample * 1.06 +
                         mix(uColor3, vec3(1.0), 0.6) * fresnel * 0.28 +
                         mix(uColor0, vec3(1.0, 0.95, 0.88), 0.5) * innerCaustic * 0.25 +
                         vec3(1.0, 0.98, 0.95) * (spec1 * 0.55 + spec2 * 0.32);

    // Subtle exterior drop-shadow / caustic halo just outside the lens rim
    float outerShadow = exp(-pow((rNorm - 1.03) / 0.06, 2.0)) * step(1.0, rNorm);
    vec3 outsideColor = baseSource * (1.0 - outerShadow * 0.38);

    vec3 col = mix(outsideColor, glassInterior, insideMask);
    // Crisp specular glass rim edge
    col += mix(uColor3, vec3(1.0), 0.75) * rimBand * (0.48 + uClickPulse * 0.5);

    // Left readability veil
    float leftVeil = smoothstep(0.0, 0.5, uv.x);
    col = mix(mix(uBgColor * 0.74, col, 0.68), col, leftVeil);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class GlassLensEffect implements BackgroundEffect {
  public readonly id = 'glass-lens' as const;
  public readonly indexNumber = '04';
  public readonly label = 'GLASS LENS';
  public readonly headlineAccent = 'SHIFT PERSPECTIVE';
  public readonly shortDescription =
    'Movable thick-glass optical element refracting a separate chromatic meridian pass with spring inertia, rim stretch, and dual focal lengths.';
  public readonly helpText = 'MOVE TO GUIDE LENS · DRAG TO STRETCH RIM · CLICK TO TOGGLE FOCAL POWER';
  public readonly category = 'lens' as const;

  public readonly palettes: Palette[] = [
    createPalette('lagoon', 'LAGOON', ['#06B6D4', '#10B981', '#FF6B4A', '#6366F1'], '#050C14'),
    createPalette('rose-quartz', 'ROSE QUARTZ', ['#F472B6', '#FB923C', '#8B5CF6', '#FDE047'], '#100712'),
    createPalette('dusk', 'DUSK', ['#3B82F6', '#F97316', '#A855F7', '#2DD4BF'], '#070914'),
  ];

  private sourceTarget!: THREE.WebGLRenderTarget;
  private sourcePass!: FullscreenPass;
  private lensPass!: FullscreenPass;

  private centerSpringX: SpringState = { value: 0.65, velocity: 0 };
  private centerSpringY: SpringState = { value: 0.52, velocity: 0 };
  private stretchSpringX: SpringState = { value: 0, velocity: 0 };
  private stretchSpringY: SpringState = { value: 0, velocity: 0 };
  private focalSpring: SpringState = { value: 0.36, velocity: 0 };

  public init(context: EffectContext): void {
    const rtW = Math.max(128, Math.floor(context.width * 0.75));
    const rtH = Math.max(128, Math.floor(context.height * 0.75));

    this.sourceTarget = new THREE.WebGLRenderTarget(rtW, rtH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    });

    const pal = this.palettes[0];
    const aspect = context.width / Math.max(1, context.height);

    this.sourcePass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: LENS_SOURCE_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uAspect: { value: aspect },
          uColor0: { value: pal.colors[0].clone() },
          uColor1: { value: pal.colors[1].clone() },
          uColor2: { value: pal.colors[2].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.lensPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: LENS_OPTICAL_FRAGMENT_SHADER,
        uniforms: {
          tSource: { value: this.sourceTarget.texture },
          uTime: { value: 0 },
          uInteraction: { value: 0.7 },
          uLensCenter: { value: new THREE.Vector2(0.65, 0.52) },
          uLensStretch: { value: new THREE.Vector2(0, 0) },
          uFocalPower: { value: 0.36 },
          uClickPulse: { value: 0 },
          uAspect: { value: aspect },
          uIntro: { value: 1 },
          uColor0: { value: pal.colors[0].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    const scale = Math.min(0.9, 0.65 * pixelRatio);
    this.sourceTarget.setSize(
      Math.max(128, Math.floor(width * scale)),
      Math.max(128, Math.floor(height * scale))
    );
    const aspect = width / Math.max(1, height);
    this.sourcePass.material.uniforms.uAspect.value = aspect;
    this.lensPass.material.uniforms.uAspect.value = aspect;
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const uSrc = this.sourcePass.material.uniforms;
    const uLens = this.lensPass.material.uniforms;

    const alpha = dampValue(0, 1, 8, dt);
    uSrc.uColor0.value.lerp(pal.colors[0], alpha);
    uSrc.uColor1.value.lerp(pal.colors[1], alpha);
    uSrc.uColor2.value.lerp(pal.colors[2], alpha);
    uSrc.uColor3.value.lerp(pal.colors[3], alpha);
    const bgCol = new THREE.Color(pal.bgHex);
    uSrc.uBgColor.value.lerp(bgCol, alpha);

    uLens.uColor0.value.lerp(pal.colors[0], alpha);
    uLens.uColor3.value.lerp(pal.colors[3], alpha);
    uLens.uBgColor.value.lerp(bgCol, alpha);

    const interactionNorm = (controls.interaction / 100) * 1.25;
    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;

    // Target lens center stays within a safe composition zone while tracking pointer with inertia
    const idleX = 0.65 + Math.sin(elapsed * 0.45) * 0.035 * speedNorm;
    const idleY = 0.52 + Math.cos(elapsed * 0.38) * 0.03 * speedNorm;
    const targetX = input.isPointerInside
      ? THREE.MathUtils.clamp(THREE.MathUtils.lerp(0.64, input.x, 0.68 * Math.min(1, interactionNorm)), 0.28, 0.84)
      : idleX;
    const targetY = input.isPointerInside
      ? THREE.MathUtils.clamp(THREE.MathUtils.lerp(0.52, input.y, 0.68 * Math.min(1, interactionNorm)), 0.22, 0.80)
      : idleY;

    this.centerSpringX = stepSpring(this.centerSpringX, targetX, 65, 9.0, dt);
    this.centerSpringY = stepSpring(this.centerSpringY, targetY, 65, 9.0, dt);

    const stretchTargetX = input.dragOffsetX * 1.25 + input.smoothVx * 0.06;
    const stretchTargetY = input.dragOffsetY * 1.25 + input.smoothVy * 0.06;
    this.stretchSpringX = stepSpring(this.stretchSpringX, stretchTargetX, 130, 8.0, dt);
    this.stretchSpringY = stepSpring(this.stretchSpringY, stretchTargetY, 130, 8.0, dt);

    // Tap/click toggles between two optical focal lengths (convex magnification vs wide-angle inversion)
    const targetFocal = input.clickCount % 2 === 0 ? 0.36 : -0.26;
    this.focalSpring = stepSpring(this.focalSpring, targetFocal, 110, 10.0, dt);

    uSrc.uTime.value = elapsed;
    uSrc.uSpeed.value = speedNorm;

    uLens.uTime.value = elapsed;
    uLens.uInteraction.value = interactionNorm;
    uLens.uLensCenter.value.set(this.centerSpringX.value, this.centerSpringY.value);
    uLens.uLensStretch.value.set(this.stretchSpringX.value, this.stretchSpringY.value);
    uLens.uFocalPower.value = this.focalSpring.value;
    uLens.uClickPulse.value = input.clickPulse;
    uLens.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    // Pass 1: Render chromatic meridian source field into offscreen target
    this.sourcePass.render(renderer, this.sourceTarget);
    // Pass 2: Sample source field through the optical thick-glass lens
    this.lensPass.material.uniforms.tSource.value = this.sourceTarget.texture;
    this.lensPass.render(renderer, output);
  }

  public reset(): void {
    this.centerSpringX = { value: 0.65, velocity: 0 };
    this.centerSpringY = { value: 0.52, velocity: 0 };
    this.stretchSpringX = { value: 0, velocity: 0 };
    this.stretchSpringY = { value: 0, velocity: 0 };
    this.focalSpring = { value: 0.36, velocity: 0 };
  }

  public dispose(): void {
    this.sourceTarget.dispose();
    this.sourcePass.dispose();
    this.lensPass.dispose();
  }
}

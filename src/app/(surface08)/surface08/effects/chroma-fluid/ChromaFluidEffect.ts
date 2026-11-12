import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue } from '../../engine/math';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from '../../engine/passes/FullscreenPass';
import { PingPongTargets } from '../../engine/passes/PingPongTargets';

const VELOCITY_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tVelocity;
  uniform vec2 uTexelSize;
  uniform float uDt;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uPrevPointer;
  uniform vec2 uPointerVel;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Distance from point p to segment a-b
  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(0.00001, dot(ba, ba)), 0.0, 1.0);
    return length((pa - ba * h) * vec2(uAspect, 1.0));
  }

  void main() {
    vec2 uv = vUv;
    vec2 prevVel = texture2D(tVelocity, uv).xy;

    // Semi-Lagrangian backtrace of velocity
    vec2 backUv = clamp(uv - prevVel * uDt * 0.65, 0.002, 0.998);
    vec2 v = texture2D(tVelocity, backUv).xy;

    // Neighbor curl / vorticity estimation
    vec2 vL = texture2D(tVelocity, clamp(backUv - vec2(uTexelSize.x, 0.0), 0.0, 1.0)).xy;
    vec2 vR = texture2D(tVelocity, clamp(backUv + vec2(uTexelSize.x, 0.0), 0.0, 1.0)).xy;
    vec2 vB = texture2D(tVelocity, clamp(backUv - vec2(0.0, uTexelSize.y), 0.0, 1.0)).xy;
    vec2 vT = texture2D(tVelocity, clamp(backUv + vec2(0.0, uTexelSize.y), 0.0, 1.0)).xy;

    float curl = ((vR.y - vL.y) - (vT.x - vB.x)) * 0.5;
    vec2 avgNeighbors = (vL + vR + vB + vT) * 0.25;
    // Pressure-like divergence relaxation
    float div = ((vR.x - vL.x) + (vT.y - vB.y)) * 0.25;
    v = mix(v, avgNeighbors, 0.16);
    v -= vec2(div) * 0.15;

    // Autonomous ambient curl field so idle fluid evolves gracefully
    float t = uTime * (0.28 + uSpeed * 0.45);
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    vec2 ambientForce = vec2(
      sin(p.y * 3.4 + t * 1.1) + cos(p.x * 2.7 - t * 0.8),
      cos(p.x * 3.1 - t * 0.9) - sin(p.y * 2.5 + t * 1.2)
    ) * 0.065 * uSpeed;

    v += ambientForce * uDt;

    // Pointer stroke impulse along segment from uPrevPointer to uPointer
    float strokeDist = sdSegment(uv, uPrevPointer, uPointer);
    float strokeRadius = 0.095 + clamp(length(uPointerVel) * 0.02, 0.0, 0.08);
    float strokeInfluence = exp(-pow(strokeDist / strokeRadius, 2.0)) * uInteraction;
    v += uPointerVel * strokeInfluence * 0.48;

    // Add swirl perpendicular to pointer velocity near the tip
    vec2 perpVel = vec2(-uPointerVel.y, uPointerVel.x);
    vec2 tipDelta = (uv - uPointer) * vec2(uAspect, 1.0);
    float side = sign(dot(tipDelta, perpVel));
    v += perpVel * side * strokeInfluence * 0.18;

    // Click radial shockwave impulse
    if (uClickPulse > 0.01) {
      vec2 cd = (uv - uClickPos) * vec2(uAspect, 1.0);
      float cDist = length(cd);
      float ringRadius = (1.0 - uClickPulse) * 0.48 + 0.03;
      float ring = exp(-pow((cDist - ringRadius) / 0.065, 2.0)) * uClickPulse * uInteraction;
      vec2 radialDir = cDist > 0.0001 ? normalize(cd) : vec2(1.0, 0.0);
      vec2 swirlDir = vec2(-radialDir.y, radialDir.x);
      v += (radialDir * 1.15 + swirlDir * 0.65) * ring;
    }

    // Damping / viscosity
    float dissipation = mix(0.992, 0.968, uDt * 18.0);
    v *= dissipation;
    v = clamp(v, vec2(-2.5), vec2(2.5));

    gl_FragColor = vec4(v, curl, 1.0);
  }
`;

const DYE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tDye;
  uniform sampler2D tVelocity;
  uniform float uDt;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uPrevPointer;
  uniform vec2 uPointerVel;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(0.00001, dot(ba, ba)), 0.0, 1.0);
    return length((pa - ba * h) * vec2(uAspect, 1.0));
  }

  vec3 sampleBaseReservoir(vec2 uv, float t) {
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float w1 = sin(p.x * 2.2 + t * 0.55 + sin(p.y * 2.6 - t * 0.4)) * 0.5 + 0.5;
    float w2 = cos(p.y * 2.4 - t * 0.48 + cos(p.x * 2.0 + t * 0.35)) * 0.5 + 0.5;
    float w3 = sin((p.x - p.y) * 2.1 + t * 0.65) * 0.5 + 0.5;

    // Emphasize right 65% of canvas while keeping left text zone rich and legible
    float rightBias = smoothstep(-0.55, 0.45, p.x);

    vec3 c = uBgColor;
    c = mix(c, uColor0, smoothstep(0.28, 0.85, w1) * (0.55 + 0.45 * rightBias));
    c = mix(c, uColor1, smoothstep(0.32, 0.88, w2) * 0.72);
    c = mix(c, uColor2, smoothstep(0.45, 0.92, w3 * w1) * (0.5 + 0.5 * rightBias));
    c = mix(c, uColor3, pow(smoothstep(0.55, 0.96, w2 * (1.0 - w1)), 1.5) * 0.65);
    return c;
  }

  void main() {
    vec2 uv = vUv;
    vec3 velData = texture2D(tVelocity, uv).xyz;
    vec2 vel = velData.xy;

    // Advect dye along velocity field
    vec2 backUv = clamp(uv - vel * uDt * 0.78, 0.002, 0.998);
    vec3 advectedDye = texture2D(tDye, backUv).rgb;

    float t = uTime * (0.35 + uSpeed * 0.65);
    vec3 reservoir = sampleBaseReservoir(uv, t);

    // Gently relax toward evolving reservoir so persistent trails linger for several seconds
    float relaxRate = clamp(uDt * (0.28 + uSpeed * 0.18), 0.002, 0.04);
    vec3 dye = mix(advectedDye, reservoir, relaxRate);

    // Inject chromatic pigment along pointer stroke
    float strokeDist = sdSegment(uv, uPrevPointer, uPointer);
    float velMag = length(uPointerVel);
    float splatRadius = 0.08 + clamp(velMag * 0.015, 0.0, 0.06);
    float splat = exp(-pow(strokeDist / splatRadius, 2.0)) * clamp(velMag * 0.55, 0.0, 1.2) * uInteraction;

    // Cycle injected pigment hue smoothly
    float huePhase = uTime * 1.1 + uv.x * 2.5 + uv.y * 1.8;
    vec3 splatColor = mix(
      mix(uColor0, uColor2, sin(huePhase) * 0.5 + 0.5),
      uColor3,
      cos(huePhase * 0.7) * 0.5 + 0.5
    );
    dye = mix(dye, splatColor * 1.22, clamp(splat, 0.0, 0.85));

    // Click pigment bloom
    if (uClickPulse > 0.01) {
      vec2 cd = (uv - uClickPos) * vec2(uAspect, 1.0);
      float cDist = length(cd);
      float ringRadius = (1.0 - uClickPulse) * 0.42 + 0.02;
      float ring = exp(-pow((cDist - ringRadius) / 0.055, 2.0)) * uClickPulse * uInteraction;
      vec3 burstColor = mix(uColor3, uColor0, sin(cDist * 18.0 - uTime * 4.0) * 0.5 + 0.5);
      dye = mix(dye, burstColor * 1.35, clamp(ring * 0.95, 0.0, 0.9));
    }

    gl_FragColor = vec4(dye, 1.0);
  }
`;

const DISPLAY_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tDye;
  uniform sampler2D tVelocity;
  uniform vec2 uTexelSize;
  uniform float uTime;
  uniform float uIntro;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec3 dye = texture2D(tDye, uv).rgb;
    vec3 velData = texture2D(tVelocity, uv).xyz;

    // Compute luminance gradient to create sharp optical folds of light along pigment boundaries
    vec3 dyeR = texture2D(tDye, clamp(uv + vec2(uTexelSize.x * 2.0, 0.0), 0.0, 1.0)).rgb;
    vec3 dyeT = texture2D(tDye, clamp(uv + vec2(0.0, uTexelSize.y * 2.0), 0.0, 1.0)).rgb;

    float lumC = dot(dye, vec3(0.299, 0.587, 0.114));
    float lumR = dot(dyeR, vec3(0.299, 0.587, 0.114));
    float lumT = dot(dyeT, vec3(0.299, 0.587, 0.114));

    vec2 grad = vec2(lumR - lumC, lumT - lumC) * 14.0;
    vec3 normal = normalize(vec3(-grad.x, -grad.y, 1.0));
    vec3 lightDir = normalize(vec3(0.45, 0.62, 0.64));
    float spec = pow(max(0.0, dot(normal, lightDir)), 18.0);
    float foldHighlight = smoothstep(0.08, 0.45, length(grad)) * 0.22;

    vec3 col = dye + vec3(1.0, 0.94, 0.9) * (spec * 0.28 + foldHighlight);
    // Subtle vorticity sheen
    col += vec3(0.95, 0.55, 0.75) * clamp(abs(velData.z) * 0.08, 0.0, 0.18);

    // Subtle localized editorial contrast veil on far left for typography legibility
    float leftVeil = smoothstep(0.0, 0.52, uv.x);
    col = mix(mix(uBgColor * 0.75, col, 0.68), col, leftVeil);

    // Choreographed intro ignition sweep
    float introSweep = smoothstep(0.0, 1.0, (uIntro * 1.35) - (1.0 - uv.x) * 0.35);
    col = mix(uBgColor, col, introSweep);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class ChromaFluidEffect implements BackgroundEffect {
  public readonly id = 'chroma-fluid' as const;
  public readonly indexNumber = '01';
  public readonly label = 'CHROMA FLUID';
  public readonly headlineAccent = 'LIQUID COLOR';
  public readonly shortDescription =
    'Multi-pass GPU Navier-Stokes feedback simulation with persistent advected pigment currents and vorticity folds.';
  public readonly helpText = 'SWIPE TO ADVECT PIGMENT · CLICK TO INJECT RADIAL PRESSURE PULSE';
  public readonly category = 'fluid' as const;

  public readonly palettes: Palette[] = [
    createPalette('volt', 'VOLT', ['#FF5238', '#4F2BFF', '#C6FF2E', '#FF2A85'], '#12060A'),
    createPalette('spectral', 'SPECTRAL', ['#00F0FF', '#7B2CBF', '#FF1E6C', '#FFE600'], '#070814'),
    createPalette('ember', 'EMBER', ['#FF6B35', '#F7C548', '#B81D33', '#4A154B'], '#110709'),
  ];

  private velocityTargets!: PingPongTargets;
  private dyeTargets!: PingPongTargets;
  private velocityPass!: FullscreenPass;
  private dyePass!: FullscreenPass;
  private displayPass!: FullscreenPass;

  private simWidth = 512;
  private simHeight = 320;
  private prevPointer = new THREE.Vector2(0.62, 0.52);
  private rendererRef: THREE.WebGLRenderer | null = null;
  private isSeeded = false;

  public init(context: EffectContext): void {
    this.rendererRef = context.renderer;
    const scale = context.isSoftwareGl ? 0.35 : 0.55;
    this.simWidth = Math.max(128, Math.floor(context.width * scale));
    this.simHeight = Math.max(128, Math.floor(context.height * scale));

    const useHalfFloat = !context.isSoftwareGl;
    this.velocityTargets = new PingPongTargets(this.simWidth, this.simHeight, useHalfFloat);
    this.dyeTargets = new PingPongTargets(this.simWidth, this.simHeight, useHalfFloat);

    const pal = this.palettes[0];

    this.velocityPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: VELOCITY_FRAGMENT_SHADER,
        uniforms: {
          tVelocity: { value: null },
          uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
          uDt: { value: 0.016 },
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPrevPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPointerVel: { value: new THREE.Vector2(0, 0) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: context.width / Math.max(1, context.height) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.dyePass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: DYE_FRAGMENT_SHADER,
        uniforms: {
          tDye: { value: null },
          tVelocity: { value: null },
          uDt: { value: 0.016 },
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPrevPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPointerVel: { value: new THREE.Vector2(0, 0) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: context.width / Math.max(1, context.height) },
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

    this.displayPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: DISPLAY_FRAGMENT_SHADER,
        uniforms: {
          tDye: { value: null },
          tVelocity: { value: null },
          uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
          uTime: { value: 0 },
          uIntro: { value: 1 },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.isSeeded = false;
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    const scale = Math.min(0.65, 0.45 * pixelRatio);
    this.simWidth = Math.max(128, Math.floor(width * scale));
    this.simHeight = Math.max(128, Math.floor(height * scale));
    this.velocityTargets.resize(this.simWidth, this.simHeight);
    this.dyeTargets.resize(this.simWidth, this.simHeight);

    const aspect = width / Math.max(1, height);
    this.velocityPass.material.uniforms.uTexelSize.value.set(1 / this.simWidth, 1 / this.simHeight);
    this.velocityPass.material.uniforms.uAspect.value = aspect;
    this.dyePass.material.uniforms.uAspect.value = aspect;
    this.displayPass.material.uniforms.uTexelSize.value.set(1 / this.simWidth, 1 / this.simHeight);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const uDye = this.dyePass.material.uniforms;
    const uVel = this.velocityPass.material.uniforms;
    const uDisp = this.displayPass.material.uniforms;

    const colorLerp = dampValue(0, 1, 8, dt);
    uDye.uColor0.value.lerp(pal.colors[0], colorLerp);
    uDye.uColor1.value.lerp(pal.colors[1], colorLerp);
    uDye.uColor2.value.lerp(pal.colors[2], colorLerp);
    uDye.uColor3.value.lerp(pal.colors[3], colorLerp);
    const targetBg = new THREE.Color(pal.bgHex);
    uDye.uBgColor.value.lerp(targetBg, colorLerp);
    uDisp.uBgColor.value.lerp(targetBg, colorLerp);

    const effectiveDt = controls.paused ? 0.0 : Math.min(dt, 0.033);
    const speedNorm = controls.reducedMotion ? 0.05 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;

    uVel.uDt.value = effectiveDt;
    uVel.uTime.value = elapsed;
    uVel.uSpeed.value = speedNorm;
    uVel.uInteraction.value = interactionNorm;
    uVel.uPrevPointer.value.copy(this.prevPointer);
    uVel.uPointer.value.set(input.x, input.y);
    uVel.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    uVel.uClickPulse.value = input.clickPulse;
    uVel.uClickPos.value.set(input.clickX, input.clickY);

    uDye.uDt.value = effectiveDt;
    uDye.uTime.value = elapsed;
    uDye.uSpeed.value = speedNorm;
    uDye.uInteraction.value = interactionNorm;
    uDye.uPrevPointer.value.copy(this.prevPointer);
    uDye.uPointer.value.set(input.x, input.y);
    uDye.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    uDye.uClickPulse.value = input.clickPulse;
    uDye.uClickPos.value.set(input.clickX, input.clickY);

    uDisp.uTime.value = elapsed;
    uDisp.uIntro.value = controls.introProgress;

    this.prevPointer.set(input.x, input.y);
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    // Seed initial pigment reservoir on first frame so fluid starts vivid immediately
    if (!this.isSeeded) {
      this.isSeeded = true;
      const prevDt = this.dyePass.material.uniforms.uDt.value;
      this.dyePass.material.uniforms.uDt.value = 35.0; // full reservoir blend
      this.dyePass.material.uniforms.tDye.value = this.dyeTargets.read.texture;
      this.dyePass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
      this.dyePass.render(renderer, this.dyeTargets.write);
      this.dyeTargets.swap();
      this.dyePass.material.uniforms.uDt.value = prevDt;
    }

    // Step 1: Velocity advection + curl + pointer forces
    this.velocityPass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
    this.velocityPass.render(renderer, this.velocityTargets.write);
    this.velocityTargets.swap();

    // Step 2: Dye advection + splat injection
    this.dyePass.material.uniforms.tDye.value = this.dyeTargets.read.texture;
    this.dyePass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
    this.dyePass.render(renderer, this.dyeTargets.write);
    this.dyeTargets.swap();

    // Step 3: Final optical fold display
    this.displayPass.material.uniforms.tDye.value = this.dyeTargets.read.texture;
    this.displayPass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
    this.displayPass.render(renderer, output);
  }

  public reset(): void {
    if (this.rendererRef) {
      this.velocityTargets.clear(this.rendererRef, new THREE.Color(0, 0, 0), 1);
      this.dyeTargets.clear(this.rendererRef, new THREE.Color(0, 0, 0), 1);
    }
    this.isSeeded = false;
  }

  public dispose(): void {
    this.velocityTargets.dispose();
    this.dyeTargets.dispose();
    this.velocityPass.dispose();
    this.dyePass.dispose();
    this.displayPass.dispose();
  }
}

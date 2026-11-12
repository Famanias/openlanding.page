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

// Pass 1: Separate luminous color-field scene behind the architectural glass
const BG_FIELD_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float t = uTime * (0.32 + uSpeed * 0.68);

    // Rich diagonal light beams and atmospheric color masses behind the glass
    vec2 centerA = vec2(0.22 + sin(t * 0.7) * 0.24, 0.12 + cos(t * 0.55) * 0.22);
    vec2 centerB = vec2(-0.12 + cos(t * 0.48) * 0.28, -0.18 + sin(t * 0.62) * 0.25);
    vec2 centerC = vec2(0.38 + sin(t * 0.4 - 1.2) * 0.22, -0.08 + cos(t * 0.75) * 0.28);

    float dA = length((p - centerA) * vec2(0.85, 1.15));
    float dB = length((p - centerB) * vec2(1.2, 0.8));
    float dC = length((p - centerC) * vec2(0.95, 0.95));

    float bloomA = exp(-dA * dA * 2.8);
    float bloomB = exp(-dB * dB * 2.2);
    float bloomC = exp(-dC * dC * 3.4);

    // Diagonal luminous architectural horizon band
    float bandAngle = p.x * 0.75 + p.y * 0.65 + sin(p.x * 3.2 + t) * 0.14;
    float warmHorizon = exp(-pow((bandAngle - 0.12) * 2.6, 2.0));

    vec3 col = uBgColor;
    col = mix(col, uColor2, bloomB * 0.88);
    col = mix(col, uColor0, clamp(bloomA + warmHorizon * 0.65, 0.0, 1.0));
    col = mix(col, uColor1, pow(clamp(bloomA * 0.75 + warmHorizon * 0.5, 0.0, 1.0), 1.4) * 0.85);
    col = mix(col, uColor3, bloomC * 0.72);

    // Pointer acts as a moving warm architectural area light behind the glass
    vec2 ptrP = (uPointer - 0.5) * vec2(uAspect, 1.0);
    float ptrDist = length(p - ptrP);
    float areaLight = exp(-ptrDist * ptrDist * 5.5) * uInteraction;
    col += mix(uColor1, vec3(1.0, 0.92, 0.84), 0.5) * areaLight * 0.65;

    // Click emits a luminous wave across the light field
    if (uClickPulse > 0.01) {
      vec2 clkP = (uClickPos - 0.5) * vec2(uAspect, 1.0);
      float cDist = length(p - clkP);
      float waveR = (1.0 - uClickPulse) * 0.85;
      float ring = exp(-pow((cDist - waveR) / 0.09, 2.0)) * uClickPulse * uInteraction;
      col += mix(uColor0, uColor3, 0.5) * ring * 0.95;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Pass 2: Floor-to-ceiling ribbed fluted glass refracting tBackground
const FLUTED_GLASS_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tBackground;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uPointerVel;
  uniform vec2 uDragOffset;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;
  uniform float uIntro;
  uniform vec3 uColor1;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * (0.3 + uSpeed * 0.6);

    // Pointer distance & local wave along ribs
    vec2 deltaPtr = (uv - uPointer) * vec2(uAspect, 1.0);
    float distPtr = length(deltaPtr);
    float nearField = exp(-distPtr * distPtr * 7.5) * uInteraction;

    // Dragging bends groove pitch and shears rib angle with spring recovery
    float dragAngle = uDragOffset.x * 0.18 * uInteraction;
    float dragPitchShift = 1.0 - uDragOffset.y * 0.22 * uInteraction;

    // Outward traveling rib wave from pointer motion and click
    float clickDist = length((uv - uClickPos) * vec2(uAspect, 1.0));
    float clickWave = sin(clickDist * 28.0 - (1.0 - uClickPulse) * 16.0) *
                      exp(-clickDist * 3.5) * uClickPulse * uInteraction;

    float baseRibCount = 34.0 * dragPitchShift;
    // Shear X coordinate slightly by Y when dragged or near pointer
    float shearedX = uv.x + (uv.y - 0.5) * dragAngle +
                     deltaPtr.x * nearField * 0.08 +
                     clickWave * 0.018;

    float ribCoord = shearedX * baseRibCount;
    float ribIndex = floor(ribCoord);
    float ribFract = fract(ribCoord); // 0..1 across a single vertical flute

    // Cylindrical flute profile: x in [-1, 1] across each groove
    float xFlute = ribFract * 2.0 - 1.0;

    // Height profile h(x) = sqrt(1 - x^2 * 0.88) and analytical derivative dh/dx
    float fluteCurve = sqrt(max(0.08, 1.0 - xFlute * xFlute * 0.88));
    float dHdx = (-xFlute * 0.88) / fluteCurve;

    // Subtle vertical undulation inside the glass casting
    float dHdy = sin(uv.y * 14.0 + ribIndex * 0.7 + t * 0.8) * 0.06 +
                 deltaPtr.y * nearField * 0.35;

    // Surface normal of the fluted glass rib
    vec3 normal = normalize(vec3(-dHdx * (0.72 + nearField * 0.35), -dHdy, 1.0));

    // View vector and Snell's Law refraction with RGB chromatic dispersion
    vec3 viewDir = vec3(0.0, 0.0, -1.0);
    float iorBase = 1.48;
    vec3 refractedR = refract(viewDir, normal, 1.0 / (iorBase - 0.025));
    vec3 refractedG = refract(viewDir, normal, 1.0 / iorBase);
    vec3 refractedB = refract(viewDir, normal, 1.0 / (iorBase + 0.025));

    // Scale UV offset so each flute genuinely magnifies/inverts a slice of the background light field
    float glassStrength = 0.068 + nearField * 0.032 + abs(uDragOffset.x) * 0.025;
    vec2 uvR = clamp(uv + refractedR.xy * glassStrength * vec2(1.0, 0.45), 0.002, 0.998);
    vec2 uvG = clamp(uv + refractedG.xy * glassStrength * vec2(1.0, 0.45), 0.002, 0.998);
    vec2 uvB = clamp(uv + refractedB.xy * glassStrength * vec2(1.0, 0.45), 0.002, 0.998);

    // Multi-tap vertical frosted diffusion inside the glass thickness
    vec2 blurStep = vec2(0.0, 0.0065);
    float r = (
      texture2D(tBackground, uvR - blurStep).r +
      texture2D(tBackground, uvR).r * 2.0 +
      texture2D(tBackground, uvR + blurStep).r
    ) * 0.25;
    float g = (
      texture2D(tBackground, uvG - blurStep).g +
      texture2D(tBackground, uvG).g * 2.0 +
      texture2D(tBackground, uvG + blurStep).g
    ) * 0.25;
    float b = (
      texture2D(tBackground, uvB - blurStep).b +
      texture2D(tBackground, uvB).b * 2.0 +
      texture2D(tBackground, uvB + blurStep).b
    ) * 0.25;

    vec3 refractedColor = vec3(r, g, b);

    // Architectural lighting on the glass ribs (moving pointer light + ambient key light)
    vec3 keyLightDir = normalize(vec3(0.55 + sin(t * 0.5) * 0.25, 0.35, 0.75));
    vec3 ptrLightDir = normalize(vec3(
      (uPointer.x - uv.x) * uAspect * 1.8,
      (uPointer.y - uv.y) * 1.8,
      0.55
    ));

    float specKey = pow(max(0.0, dot(normal, keyLightDir)), 28.0);
    float specPtr = pow(max(0.0, dot(normal, ptrLightDir)), 22.0) * nearField * 1.4;

    // Schlick Fresnel glancing highlight along flute ridges
    float cosTheta = clamp(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
    float fresnel = pow(1.0 - cosTheta, 3.2);

    // Subtle groove seam occlusion at the valley between ribs
    float valleyShadow = smoothstep(0.0, 0.16, 1.0 - abs(xFlute));
    refractedColor *= mix(0.68, 1.04, valleyShadow);

    // Add glancing specular highlights
    vec3 glintColor = mix(uColor1, vec3(1.0, 0.96, 0.92), 0.65);
    vec3 rimTint = mix(uColor3, vec3(0.88, 0.94, 1.0), 0.5);
    vec3 col = refractedColor +
               glintColor * (specKey * 0.32 + specPtr * 0.45) +
               rimTint * fresnel * 0.22;

    // Fine optical micro-grain (extremely subtle architectural glass texture)
    float grain = (hash12(uv * 900.0 + fract(uTime)) - 0.5) * 0.018;
    col += grain;

    // Localized contrast scrim on left third so hero copy stays crisp
    float leftReadability = smoothstep(0.0, 0.54, uv.x);
    col = mix(mix(uBgColor * 0.72, col, 0.68), col, leftReadability);

    // Choreographed center-out refractive wipe during intro
    float centerDist = abs(uv.x - 0.52);
    float introMask = smoothstep(centerDist - 0.15, centerDist + 0.15, uIntro * 0.85);
    col = mix(uBgColor, col, introMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class FlutedLightEffect implements BackgroundEffect {
  public readonly id = 'fluted-light' as const;
  public readonly indexNumber = '02';
  public readonly label = 'FLUTED LIGHT';
  public readonly headlineAccent = 'GLASS IN MOTION';
  public readonly shortDescription =
    'Floor-to-ceiling architectural ribbed glass refracting an offscreen chromatic light-field with Snell dispersion and spring-damped groove shear.';
  public readonly helpText = 'MOVE TO BEND LIGHT · DRAG TO WARP RIBS · CLICK FOR REFRACTIVE WAVE';
  public readonly category = 'glass' as const;

  public readonly palettes: Palette[] = [
    createPalette('afterglow', 'AFTERGLOW', ['#FF6A3D', '#FFB48A', '#7A1C24', '#164E63'], '#0B090E'),
    createPalette('glacier', 'GLACIER', ['#38BDF8', '#818CF8', '#E0E7FF', '#0F172A'], '#060913'),
    createPalette('violet-hour', 'VIOLET HOUR', ['#C084FC', '#FB7185', '#4F46E5', '#1E1B4B'], '#090712'),
  ];

  private bgTarget!: THREE.WebGLRenderTarget;
  private bgPass!: FullscreenPass;
  private glassPass!: FullscreenPass;
  private dragSpringX: SpringState = { value: 0, velocity: 0 };
  private dragSpringY: SpringState = { value: 0, velocity: 0 };

  public init(context: EffectContext): void {
    const rtWidth = Math.max(128, Math.floor(context.width * 0.65));
    const rtHeight = Math.max(128, Math.floor(context.height * 0.65));

    this.bgTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    });

    const pal = this.palettes[0];
    const aspect = context.width / Math.max(1, context.height);

    this.bgPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: BG_FIELD_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
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

    this.glassPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: FLUTED_GLASS_FRAGMENT_SHADER,
        uniforms: {
          tBackground: { value: this.bgTarget.texture },
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPointerVel: { value: new THREE.Vector2(0, 0) },
          uDragOffset: { value: new THREE.Vector2(0, 0) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: aspect },
          uIntro: { value: 1 },
          uColor1: { value: pal.colors[1].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    const scale = Math.min(0.85, 0.55 * pixelRatio);
    this.bgTarget.setSize(
      Math.max(128, Math.floor(width * scale)),
      Math.max(128, Math.floor(height * scale))
    );
    const aspect = width / Math.max(1, height);
    this.bgPass.material.uniforms.uAspect.value = aspect;
    this.glassPass.material.uniforms.uAspect.value = aspect;
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const uBg = this.bgPass.material.uniforms;
    const uGlass = this.glassPass.material.uniforms;

    const alpha = dampValue(0, 1, 8, dt);
    uBg.uColor0.value.lerp(pal.colors[0], alpha);
    uBg.uColor1.value.lerp(pal.colors[1], alpha);
    uBg.uColor2.value.lerp(pal.colors[2], alpha);
    uBg.uColor3.value.lerp(pal.colors[3], alpha);
    const bgCol = new THREE.Color(pal.bgHex);
    uBg.uBgColor.value.lerp(bgCol, alpha);

    uGlass.uColor1.value.lerp(pal.colors[1], alpha);
    uGlass.uColor3.value.lerp(pal.colors[3], alpha);
    uGlass.uBgColor.value.lerp(bgCol, alpha);

    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;

    this.dragSpringX = stepSpring(this.dragSpringX, input.dragOffsetX, 110, 8.5, dt);
    this.dragSpringY = stepSpring(this.dragSpringY, input.dragOffsetY, 110, 8.5, dt);

    uBg.uTime.value = elapsed;
    uBg.uSpeed.value = speedNorm;
    uBg.uInteraction.value = interactionNorm;
    uBg.uPointer.value.set(input.x, input.y);
    uBg.uClickPulse.value = input.clickPulse;
    uBg.uClickPos.value.set(input.clickX, input.clickY);

    uGlass.uTime.value = elapsed;
    uGlass.uSpeed.value = speedNorm;
    uGlass.uInteraction.value = interactionNorm;
    uGlass.uPointer.value.set(input.x, input.y);
    uGlass.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    uGlass.uDragOffset.value.set(this.dragSpringX.value, this.dragSpringY.value);
    uGlass.uClickPulse.value = input.clickPulse;
    uGlass.uClickPos.value.set(input.clickX, input.clickY);
    uGlass.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    // Pass 1: Render luminous gradient field into offscreen texture
    this.bgPass.render(renderer, this.bgTarget);
    // Pass 2: Refract offscreen light field through fluted glass ribs
    this.glassPass.material.uniforms.tBackground.value = this.bgTarget.texture;
    this.glassPass.render(renderer, output);
  }

  public reset(): void {
    this.dragSpringX = { value: 0, velocity: 0 };
    this.dragSpringY = { value: 0, velocity: 0 };
  }

  public dispose(): void {
    this.bgTarget.dispose();
    this.bgPass.dispose();
    this.glassPass.dispose();
  }
}

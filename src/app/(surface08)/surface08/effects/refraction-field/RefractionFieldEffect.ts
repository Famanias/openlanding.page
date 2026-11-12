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

const FACET_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
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
  uniform vec3 uColor0; // Copper / Coral
  uniform vec3 uColor1; // Warm Amber
  uniform vec3 uColor2; // Cool Slate
  uniform vec3 uColor3; // Deep Teal
  uniform vec3 uBgColor;

  vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
  }

  // Underlying chromatic gradient field that facets refract
  vec3 sampleBackdrop(vec2 uv, float t) {
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float g1 = sin(p.x * 2.2 - p.y * 1.8 + t * 0.55) * 0.5 + 0.5;
    float g2 = cos(p.x * 1.7 + p.y * 2.4 - t * 0.45) * 0.5 + 0.5;
    float diag = clamp((uv.x * 0.68 + uv.y * 0.32), 0.0, 1.0);

    vec3 col = mix(uColor3, uColor2, g2);
    col = mix(col, uColor0, smoothstep(0.25, 0.85, diag * g1 + 0.15));
    col = mix(col, uColor1, pow(g1 * g2, 1.8) * 0.78);
    return col;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * (0.28 + uSpeed * 0.62);

    // Art-directed asymmetrical polygon tessellation scale (large sculptural glass plates)
    vec2 scaledUv = (uv - 0.5) * vec2(uAspect * 4.8, 4.2);
    // Slight architectural shear so facets are never a boring uniform square grid
    scaledUv.x += scaledUv.y * 0.24;

    vec2 cellId = floor(scaledUv);
    vec2 cellFract = fract(scaledUv);

    float minDist1 = 8.0;
    float minDist2 = 8.0;
    vec2 nearestSeed = vec2(0.0);
    vec2 nearestId = vec2(0.0);
    vec2 nearestRel = vec2(0.0);

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 id = cellId + neighbor;
        vec2 rand = hash22(id);
        // Gentle autonomous breath of facet vertices
        vec2 point = neighbor + 0.18 + 0.64 * (0.5 + 0.42 * sin(t * 0.55 + 6.2831 * rand));
        vec2 diff = point - cellFract;
        float dist = length(diff);

        if (dist < minDist1) {
          minDist2 = minDist1;
          minDist1 = dist;
          nearestSeed = rand;
          nearestId = id;
          nearestRel = diff;
        } else if (dist < minDist2) {
          minDist2 = dist;
        }
      }
    }

    // Distance to polygon seam boundary
    float edgeDist = minDist2 - minDist1;

    // World UV center of the winning facet
    vec2 facetCenterScaled = cellId + cellFract + nearestRel;
    facetCenterScaled.x -= facetCenterScaled.y * 0.24;
    vec2 facetCenterUv = facetCenterScaled / vec2(uAspect * 4.8, 4.2) + 0.5;

    // Radial pointer pressure hinges nearby facets outward
    vec2 ptrToFacet = (facetCenterUv - uPointer) * vec2(uAspect, 1.0);
    float ptrDist = length(ptrToFacet);
    float pressure = exp(-ptrDist * ptrDist * 7.5) * uInteraction;

    // Spatially traveling click wave across neighboring facets (not simultaneous)
    vec2 clkToFacet = (facetCenterUv - uClickPos) * vec2(uAspect, 1.0);
    float clkDist = length(clkToFacet);
    float waveFront = (1.0 - uClickPulse) * 0.95;
    float facetWave = sin((clkDist - waveFront) * 24.0) *
                      exp(-pow((clkDist - waveFront) / 0.15, 2.0)) *
                      uClickPulse * uInteraction;

    // Compute per-facet 3D normal from intrinsic crystal orientation + pointer hinge + click wave
    vec2 baseTilt = (nearestSeed - 0.5) * 0.45;
    vec2 hingeDir = ptrDist > 0.001 ? normalize(ptrToFacet) : vec2(1.0, 0.0);
    vec2 waveDir = clkDist > 0.001 ? normalize(clkToFacet) : vec2(0.0, 1.0);

    vec2 facetNormalXY = baseTilt +
                         hingeDir * pressure * 0.85 +
                         uDragOffset * pressure * 0.75 +
                         waveDir * facetWave * 0.8;

    // Bevel chamfer near polygon seams
    vec2 seamGrad = length(nearestRel) > 0.001 ? normalize(nearestRel) : vec2(0.0);
    float bevelFactor = smoothstep(0.11, 0.0, edgeDist);
    vec3 normal = normalize(vec3(facetNormalXY + seamGrad * bevelFactor * 0.55, 1.0));

    // Per-facet thickness & UV refraction with RGB chromatic separation
    float thickness = 0.048 + nearestSeed.x * 0.035 + pressure * 0.03;
    vec2 uvOffset = -normal.xy * thickness;
    vec2 chromaShift = normal.xy * 0.0075 * (1.0 + pressure);

    vec3 refracted = vec3(
      sampleBackdrop(uv + uvOffset + chromaShift, t).r,
      sampleBackdrop(uv + uvOffset, t).g,
      sampleBackdrop(uv + uvOffset - chromaShift, t).b
    );

    // Specular lighting & caustic seam glints
    vec3 light1 = normalize(vec3(0.58, 0.62, 0.52));
    vec3 light2 = normalize(vec3(-0.65, 0.35, 0.67));
    float spec1 = pow(max(0.0, dot(normal, light1)), 28.0);
    float spec2 = pow(max(0.0, dot(normal, light2)), 18.0);
    float fresnel = pow(1.0 - max(0.0, normal.z), 2.5);

    // Crisp luminous caustic seam line between glass polygons
    float seamLine = smoothstep(0.032, 0.004, edgeDist);
    float seamShadow = smoothstep(0.0, 0.07, edgeDist);

    vec3 facetTint = mix(uColor0, uColor2, nearestSeed.y);
    vec3 col = refracted * mix(0.76, 1.06, seamShadow);
    col = mix(col, facetTint, 0.14);
    col += mix(uColor1, vec3(1.0, 0.96, 0.9), 0.6) * (spec1 * 0.48 + spec2 * 0.26 + fresnel * 0.25);
    col += mix(uColor1, uColor0, 0.5) * seamLine * (0.42 + pressure * 0.45 + abs(facetWave) * 0.55);

    // Left text readability scrim
    float leftVeil = smoothstep(0.0, 0.52, uv.x);
    col = mix(mix(uBgColor * 0.74, col, 0.68), col, leftVeil);

    // Choreographed facet-by-facet ignition on initial load
    float facetThreshold = (1.0 - facetCenterUv.x) * 0.45 + nearestSeed.x * 0.35;
    float introMask = smoothstep(facetThreshold, facetThreshold + 0.25, uIntro);
    col = mix(uBgColor, col, introMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class RefractionFieldEffect implements BackgroundEffect {
  public readonly id = 'refraction-field' as const;
  public readonly indexNumber = '08';
  public readonly label = 'REFRACTION FIELD';
  public readonly headlineAccent = 'CRYSTALLINE FACETS';
  public readonly shortDescription =
    'Asymmetrical translucent glass polygon tessellation with per-facet hinge normals, bevel caustics, and spatially traveling pressure waves.';
  public readonly helpText = 'HOVER TO HINGE FACETS · DRAG TO TILT PLATES · CLICK FOR SPATIAL WAVE';
  public readonly category = 'facet' as const;

  public readonly palettes: Palette[] = [
    createPalette('copper-slate', 'COPPER SLATE', ['#E06D53', '#F4A261', '#335C67', '#1D3557'], '#080D14'),
    createPalette('prism-quartz', 'PRISM QUARTZ', ['#F472B6', '#38BDF8', '#818CF8', '#312E81'], '#090714'),
    createPalette('malachite', 'MALACHITE', ['#10B981', '#F59E0B', '#0F766E', '#1E293B'], '#050E10'),
  ];

  private pass!: FullscreenPass;

  public init(context: EffectContext): void {
    const pal = this.palettes[0];
    const aspect = context.width / Math.max(1, context.height);

    this.pass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: FACET_FRAGMENT_SHADER,
        uniforms: {
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
  }

  public resize(width: number, height: number): void {
    this.pass.material.uniforms.uAspect.value = width / Math.max(1, height);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const u = this.pass.material.uniforms;
    const alpha = dampValue(0, 1, 8, dt);

    u.uColor0.value.lerp(pal.colors[0], alpha);
    u.uColor1.value.lerp(pal.colors[1], alpha);
    u.uColor2.value.lerp(pal.colors[2], alpha);
    u.uColor3.value.lerp(pal.colors[3], alpha);
    u.uBgColor.value.lerp(new THREE.Color(pal.bgHex), alpha);

    u.uTime.value = elapsed;
    u.uSpeed.value = controls.reducedMotion ? 0.02 : controls.speed / 100;
    u.uInteraction.value = (controls.interaction / 100) * 1.25;
    u.uPointer.value.set(input.x, input.y);
    u.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    u.uDragOffset.value.set(input.dragOffsetX, input.dragOffsetY);
    u.uClickPulse.value = input.clickPulse;
    u.uClickPos.value.set(input.clickX, input.clickY);
    u.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    this.pass.render(renderer, output);
  }

  public reset(): void {
    this.pass.material.uniforms.uDragOffset.value.set(0, 0);
  }

  public dispose(): void {
    this.pass.dispose();
  }
}

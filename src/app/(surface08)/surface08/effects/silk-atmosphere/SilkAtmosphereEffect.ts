import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue } from '../../engine/math';

const SILK_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vFoldHeight;
  varying float vPointerInfluence;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uDragOffset;
  uniform float uClickPulse;
  uniform vec2 uClickPos;

  float silkHeight(vec2 uv, float t) {
    // Broad architectural silk folds
    float diag1 = uv.x * 3.8 - uv.y * 2.6 + sin(uv.y * 3.2 + t * 0.55) * 0.85;
    float diag2 = uv.x * 2.1 + uv.y * 4.1 - cos(uv.x * 2.8 - t * 0.42) * 0.75;
    float foldA = sin(diag1) * 0.42 + sin(diag1 * 2.1 + 0.8) * 0.14;
    float foldB = cos(diag2) * 0.32 + sin(diag2 * 1.8 - t * 0.3) * 0.12;
    float h = foldA + foldB;

    // Pointer depression with surrounding rebound ridge
    vec2 dp = uv - uPointer;
    float dist = length(dp);
    float depression = -exp(-dist * dist * 16.0) * 0.55 * uInteraction;
    float reboundRidge = exp(-pow((dist - 0.18) / 0.09, 2.0)) * 0.26 * uInteraction;

    // Drag directional stretch ripple
    float dragWave = sin(dot(dp, uDragOffset) * 24.0) * exp(-dist * 4.5) * length(uDragOffset) * 0.35 * uInteraction;

    // Click traveling wave
    float cDist = length(uv - uClickPos);
    float cRadius = (1.0 - uClickPulse) * 0.75;
    float clickWave = sin((cDist - cRadius) * 28.0) *
                      exp(-pow((cDist - cRadius) / 0.14, 2.0)) *
                      uClickPulse * 0.45 * uInteraction;

    return h + depression + reboundRidge + dragWave + clickWave;
  }

  void main() {
    vUv = uv;
    float t = uTime * (0.35 + uSpeed * 0.75);

    float eps = 0.008;
    float hC = silkHeight(uv, t);
    float hR = silkHeight(uv + vec2(eps, 0.0), t);
    float hT = silkHeight(uv + vec2(0.0, eps), t);

    vec3 pos = position;
    pos.z += hC;
    // Subtle lateral fabric gather toward folds
    pos.x += (hR - hC) * 0.45 + uDragOffset.x * exp(-length(uv - uPointer) * 3.5) * 0.35;
    pos.y += (hT - hC) * 0.45 + uDragOffset.y * exp(-length(uv - uPointer) * 3.5) * 0.35;

    vec3 tangentX = normalize(vec3(eps * 14.0, 0.0, hR - hC));
    vec3 tangentY = normalize(vec3(0.0, eps * 9.0, hT - hC));
    vNormal = normalize(cross(tangentX, tangentY));

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPosition.xyz;
    vFoldHeight = hC;
    vPointerInfluence = exp(-length(uv - uPointer) * 4.2) * uInteraction;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const SILK_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vFoldHeight;
  varying float vPointerInfluence;

  uniform float uTime;
  uniform float uIntro;
  uniform vec3 uColor0; // Warm Parchment / Alabaster
  uniform vec3 uColor1; // Dusty Teal
  uniform vec3 uColor2; // Midnight Petroleum
  uniform vec3 uColor3; // Restrained Gold Highlight
  uniform vec3 uBgColor;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);

    // Oblique grazing warm directional beam + cool sky fill
    vec3 keyLight = normalize(vec3(0.72, 0.42, 0.55));
    vec3 rimLight = normalize(vec3(-0.65, -0.35, 0.68));

    float diffKey = max(0.0, dot(N, keyLight));
    float diffRim = max(0.0, dot(N, rimLight));

    // Anisotropic silk sheen along fold crests
    vec3 H = normalize(keyLight + V);
    float sheen = pow(max(0.0, dot(N, H)), 14.0);
    float fresnel = pow(1.0 - max(0.0, dot(N, V)), 2.8);

    // Subsurface scattering translucency on thin elevated folds
    float sss = smoothstep(-0.35, 0.65, vFoldHeight) * pow(max(0.0, dot(-keyLight, N) + 0.65), 2.0);

    vec3 baseFabric = mix(uColor2, uColor1, smoothstep(-0.45, 0.35, vFoldHeight + diffRim * 0.35));
    baseFabric = mix(baseFabric, uColor0, pow(diffKey, 1.25) * 0.78);

    // Gold grazing highlight on silk crests and around pointer depression
    vec3 highlight = mix(uColor3, uColor0, 0.45) * (sheen * 0.65 + fresnel * 0.42 + sss * 0.25);
    vec3 col = baseFabric + highlight + uColor3 * vPointerInfluence * fresnel * 0.45;

    // Preserve readability on left third
    float leftScrim = smoothstep(0.0, 0.5, vUv.x);
    col = mix(mix(uBgColor * 0.78, col, 0.66), col, leftScrim);

    // Choreographed intro reveal
    float introMask = smoothstep(0.0, 1.0, uIntro * 1.25 - (1.0 - vUv.y) * 0.25);
    col = mix(uBgColor, col, introMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class SilkAtmosphereEffect implements BackgroundEffect {
  public readonly id = 'silk-atmosphere' as const;
  public readonly indexNumber = '03';
  public readonly label = 'SILK ATMOSPHERE';
  public readonly headlineAccent = 'TRANSLUCENT FOLDS';
  public readonly shortDescription =
    'Deformable 3D tessellated silk heightfield with analytical fold derivatives, grazing oblique beam lighting, and subsurface sheen.';
  public readonly helpText = 'HOVER TO DEPRESS FABRIC · DRAG TO STRETCH FOLDS · CLICK FOR WAVE';
  public readonly category = 'fabric' as const;

  public readonly palettes: Palette[] = [
    createPalette('parchment', 'PARCHMENT', ['#EAE2D3', '#2E6F73', '#0D222B', '#D9A05B'], '#071117'),
    createPalette('obsidian-silk', 'OBSIDIAN SILK', ['#D8D4E8', '#3B2D64', '#120E24', '#E57A54'], '#080612'),
    createPalette('vermilion', 'VERMILION', ['#F2E6DC', '#B83A2A', '#261110', '#E09F5A'], '#110707'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneGeometry;
  private material!: THREE.ShaderMaterial;
  private mesh!: THREE.Mesh;

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    const aspect = context.width / Math.max(1, context.height);
    this.camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 100);
    this.camera.position.set(0, -0.65, 9.2);
    this.camera.lookAt(0, 0, 0);

    const segsX = context.isSoftwareGl ? 64 : 136;
    const segsY = context.isSoftwareGl ? 42 : 88;
    this.geometry = new THREE.PlaneGeometry(16.5, 10.2, segsX, segsY);

    const pal = this.palettes[0];
    this.material = new THREE.ShaderMaterial({
      vertexShader: SILK_VERTEX_SHADER,
      fragmentShader: SILK_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.45 },
        uInteraction: { value: 0.7 },
        uPointer: { value: new THREE.Vector2(0.62, 0.52) },
        uDragOffset: { value: new THREE.Vector2(0, 0) },
        uClickPulse: { value: 0 },
        uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
        uIntro: { value: 1 },
        uColor0: { value: pal.colors[0].clone() },
        uColor1: { value: pal.colors[1].clone() },
        uColor2: { value: pal.colors[2].clone() },
        uColor3: { value: pal.colors[3].clone() },
        uBgColor: { value: new THREE.Color(pal.bgHex) },
      },
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  public resize(width: number, height: number): void {
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    const scaleX = Math.max(1.0, aspect / 1.55);
    this.mesh.scale.set(scaleX, 1.0, 1.0);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const u = this.material.uniforms;
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
    u.uDragOffset.value.set(input.dragOffsetX, input.dragOffsetY);
    u.uClickPulse.value = input.clickPulse;
    u.uClickPos.value.set(input.clickX, input.clickY);
    u.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    renderer.setRenderTarget(output);
    renderer.setClearColor(this.material.uniforms.uBgColor.value, 1);
    renderer.clear();
    renderer.render(this.scene, this.camera);
  }

  public reset(): void {
    this.material.uniforms.uDragOffset.value.set(0, 0);
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

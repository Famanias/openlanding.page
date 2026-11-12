import * as THREE from 'three';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from './FullscreenPass';

const TRANSITION_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tOutgoing;
  uniform sampler2D tIncoming;
  uniform float uProgress;
  uniform int uFamily;
  uniform vec2 uResolution;
  uniform vec2 uPointer;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(1.0, uResolution.y);
    float t = clamp(uProgress, 0.0, 1.0);
    // Smooth S-curve
    float easeT = t * t * (3.0 - 2.0 * t);
    float boundaryGlow = 0.0;
    float mask = easeT;
    vec2 uvOut = uv;
    vec2 uvIn = uv;

    if (uFamily == 0) {
      // Family 0: Viscous Fluted Rib Wipe (Fluid <-> Glass)
      float ribs = sin(uv.x * 46.0 + sin(uv.y * 5.0) * 1.4) * 0.055;
      float wave = (uv.x * 0.85 + (1.0 - uv.y) * 0.15) + ribs;
      float edge = easeT * 1.35 - 0.175;
      mask = smoothstep(edge - 0.09, edge + 0.09, wave);
      mask = 1.0 - mask;
      boundaryGlow = exp(-pow((wave - edge) * 16.0, 2.0));
      float refractShift = boundaryGlow * 0.045 * sin(uv.x * 90.0);
      uvOut += vec2(refractShift, refractShift * 0.35);
      uvIn -= vec2(refractShift * 0.85, -refractShift * 0.25);
    } else if (uFamily == 1) {
      // Family 1: Diagonal Silk Shear (Glass <-> Silk / Ribbons)
      float diag = (uv.x * 0.72 + uv.y * 0.58) + sin(uv.y * 9.0 - uv.x * 6.0) * 0.07;
      float edge = easeT * 1.55 - 0.12;
      mask = 1.0 - smoothstep(edge - 0.12, edge + 0.12, diag);
      boundaryGlow = exp(-pow((diag - edge) * 12.0, 2.0));
      vec2 shearDir = normalize(vec2(1.0, -0.65));
      uvOut += shearDir * boundaryGlow * 0.06 * (1.0 - easeT);
      uvIn -= shearDir * boundaryGlow * 0.06 * easeT;
    } else if (uFamily == 2) {
      // Family 2: Optical Caustic Aperture (Lens / Aurora / Bokeh)
      vec2 center = mix(vec2(0.58, 0.52), uPointer, 0.35);
      vec2 d = (uv - center) * vec2(aspect, 1.0);
      float dist = length(d);
      float maxR = length(vec2(aspect, 1.0)) * 1.05;
      float radius = easeT * maxR;
      float angle = atan(d.y, d.x);
      float lobe = sin(angle * 4.0 + easeT * 4.0) * 0.035;
      mask = 1.0 - smoothstep(radius - 0.11, radius + 0.11, dist + lobe);
      boundaryGlow = exp(-pow((dist + lobe - radius) * 14.0, 2.0));
      vec2 radialDir = dist > 0.0001 ? normalize(uv - center) : vec2(0.0);
      uvOut -= radialDir * boundaryGlow * 0.065;
      uvIn += radialDir * boundaryGlow * 0.055;
    } else {
      // Family 3: Faceted Voronoi Melt (Refraction Field <-> Any)
      vec2 gridUv = uv * vec2(aspect * 7.0, 7.0);
      float cellNoise = noise2D(floor(gridUv) + vec2(3.7, 9.1));
      float field = uv.x * 0.55 + (1.0 - uv.y) * 0.45 + (cellNoise - 0.5) * 0.28;
      float edge = easeT * 1.45 - 0.22;
      mask = 1.0 - smoothstep(edge - 0.07, edge + 0.07, field);
      boundaryGlow = exp(-pow((field - edge) * 16.0, 2.0));
      vec2 facetShift = (vec2(cellNoise, fract(cellNoise * 17.3)) - 0.5) * 0.08 * boundaryGlow;
      uvOut += facetShift;
      uvIn -= facetShift;
    }

    // Subtle RGB spectral dispersion along the optical seam
    float chromaOffset = boundaryGlow * 0.009;
    vec3 colOut = vec3(
      texture2D(tOutgoing, clamp(uvOut + vec2(chromaOffset, 0.0), 0.0, 1.0)).r,
      texture2D(tOutgoing, clamp(uvOut, 0.0, 1.0)).g,
      texture2D(tOutgoing, clamp(uvOut - vec2(chromaOffset, 0.0), 0.0, 1.0)).b
    );

    vec3 colIn = vec3(
      texture2D(tIncoming, clamp(uvIn + vec2(chromaOffset, 0.0), 0.0, 1.0)).r,
      texture2D(tIncoming, clamp(uvIn, 0.0, 1.0)).g,
      texture2D(tIncoming, clamp(uvIn - vec2(chromaOffset, 0.0), 0.0, 1.0)).b
    );

    vec3 seamCaustic = vec3(1.0, 0.78, 0.64) * boundaryGlow * 0.26 * sin(easeT * 3.14159265);
    vec3 finalColor = mix(colOut, colIn, mask) + seamCaustic;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export class TransitionPass {
  private pass: FullscreenPass;
  private uniforms: {
    tOutgoing: { value: THREE.Texture | null };
    tIncoming: { value: THREE.Texture | null };
    uProgress: { value: number };
    uFamily: { value: number };
    uResolution: { value: THREE.Vector2 };
    uPointer: { value: THREE.Vector2 };
  };

  constructor() {
    this.uniforms = {
      tOutgoing: { value: null },
      tIncoming: { value: null },
      uProgress: { value: 0 },
      uFamily: { value: 0 },
      uResolution: { value: new THREE.Vector2(1440, 900) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: TRANSITION_FRAGMENT_SHADER,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    });

    this.pass = new FullscreenPass(material);
  }

  public resize(width: number, height: number): void {
    this.uniforms.uResolution.value.set(width, height);
  }

  public render(
    renderer: THREE.WebGLRenderer,
    outgoingTex: THREE.Texture,
    incomingTex: THREE.Texture,
    progress: number,
    familyId: number,
    pointerX: number,
    pointerY: number,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    this.uniforms.tOutgoing.value = outgoingTex;
    this.uniforms.tIncoming.value = incomingTex;
    this.uniforms.uProgress.value = progress;
    this.uniforms.uFamily.value = familyId;
    this.uniforms.uPointer.value.set(pointerX, pointerY);
    this.pass.render(renderer, output);
  }

  public dispose(): void {
    this.pass.dispose();
  }
}

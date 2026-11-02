import { AdditiveBlending, BufferGeometry, Color, DoubleSide, Float32BufferAttribute, ShaderMaterial } from "three";

export interface MaterialConfig {
  cyanColor?: string;
  limeColor?: string;
  /** Antialiased screen-pixel width; independent of the platform's native GL line width. */
  wireframeLineWidth?: number;
}

const surfaceVertex = /* glsl */ `
  varying vec3 vTint;
  varying vec3 vNormal;
  varying vec3 vView;
  #ifdef LATTICE
    attribute vec3 aBarycentric;
    varying vec3 vBarycentric;
  #endif
  void main() {
    vTint = color;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = -viewPosition.xyz;
    #ifdef LATTICE
      vBarycentric = aBarycentric;
    #endif
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export function createLatticeGeometry(source: BufferGeometry): BufferGeometry {
  const geometry = source.index ? source.toNonIndexed() : source.clone();
  const count = geometry.getAttribute("position").count;
  const barycentrics = new Float32Array(count * 3);
  for (let vertex = 0; vertex < count; vertex++) barycentrics[vertex * 3 + vertex % 3] = 1;
  geometry.setAttribute("aBarycentric", new Float32BufferAttribute(barycentrics, 3));
  return geometry;
}

export function createWireframeLatticeMaterial(config: MaterialConfig = {}): ShaderMaterial {
  return new ShaderMaterial({
    name: "Mercer geodesic emissive lattice",
    defines: { LATTICE: 1 },
    uniforms: {
      uTime: { value: 0 },
      uColorCyan: { value: new Color(config.cyanColor ?? "#00E5FF") },
      uColorLime: { value: new Color(config.limeColor ?? "#CCFF00") },
      // Geometry colors are linear; recover the original cyan/lime interpolation weight.
      uSourceLimeRed: { value: new Color("#CCFF00").r },
      uLineWidth: { value: config.wireframeLineWidth ?? 0.7 },
      uOpacity: { value: 0.52 },
    },
    vertexShader: surfaceVertex,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uLineWidth;
      uniform float uOpacity;
      uniform vec3 uColorCyan;
      uniform vec3 uColorLime;
      uniform float uSourceLimeRed;
      varying vec3 vTint;
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vBarycentric;
      void main() {
        vec3 derivatives = max(fwidth(vBarycentric), vec3(0.00001));
        vec3 edges = smoothstep(vec3(0.0), derivatives * uLineWidth, vBarycentric);
        float edge = 1.0 - min(min(edges.x, edges.y), edges.z);
        float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 1.7);
        float pulse = 0.95 + 0.05 * sin(uTime * 0.8 + vTint.r * 4.0);
        vec3 tint = mix(uColorCyan, uColorLime, clamp(vTint.r / uSourceLimeRed, 0.0, 1.0));
        gl_FragColor = vec4(tint * (1.05 + rim * 0.55), edge * uOpacity * pulse);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    // Additive surfaces are order-independent; avoid Three's two transparent face passes.
    forceSinglePass: true,
    vertexColors: true,
    toneMapped: false,
  });
}

export function createTranslucentMembraneMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    name: "Mercer translucent membrane",
    uniforms: { uTime: { value: 0 } },
    vertexShader: surfaceVertex,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vTint;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.4);
        float breath = 0.97 + 0.03 * sin(uTime * 0.6);
        gl_FragColor = vec4(vTint * (0.65 + fresnel), (0.04 + fresnel * 0.18) * breath);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    forceSinglePass: true,
    vertexColors: true,
    toneMapped: false,
  });
}

export function createParticleShellGeometry(count = 1200, radius = 3.2): BufferGeometry {
  if (!Number.isInteger(count) || count < 1 || count > 1200) throw new RangeError("Particle count must be between 1 and 1200");
  if (!Number.isFinite(radius) || radius <= 0) throw new RangeError("Particle radius must be finite and positive");
  const positions: number[] = [];
  const colors: number[] = [];
  const phases: number[] = [];
  const sizes: number[] = [];
  const cyan = new Color("#00E5FF");
  const lime = new Color("#CCFF00");
  const tint = new Color();
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index++) {
    const z = 1 - 2 * (index + 0.5) / count;
    const theta = index * goldenAngle;
    const ring = Math.sqrt(1 - z * z);
    const wave = 1 + 0.12 * Math.sin(theta * 3 + z * 7) + 0.05 * Math.cos(theta * 5);
    positions.push(radius * wave * ring * Math.cos(theta), radius * wave * ring * Math.sin(theta), radius * 0.44 * z);
    tint.copy(cyan).lerp(lime, 0.5 + 0.5 * Math.sin(theta + z * 3));
    colors.push(tint.r, tint.g, tint.b);
    phases.push((index * 0.61803398875 % 1) * Math.PI * 2);
    sizes.push(0.55 + (index * 0.754877666 % 1) * 1.35);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("aPhase", new Float32BufferAttribute(phases, 1));
  geometry.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

export function createParticleShellMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    name: "Mercer drifting stipple envelope",
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 }, uOpacity: { value: 0.55 } },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute float aPhase;
      attribute float aSize;
      varying vec3 vTint;
      varying float vAlpha;
      void main() {
        vec3 displaced = position * (1.0 + 0.018 * sin(uTime * 0.45 + aPhase));
        displaced.z += 0.06 * sin(uTime * 0.35 + position.x * 1.8 + aPhase);
        vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        gl_PointSize = clamp(aSize * uPixelRatio * 11.0 / max(1.0, -viewPosition.z), 1.0, 5.0 * uPixelRatio);
        vTint = color;
        vAlpha = 0.5 + 0.5 * sin(aPhase + uTime * 0.5);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uOpacity;
      varying vec3 vTint;
      varying float vAlpha;
      void main() {
        float radius = length(gl_PointCoord - vec2(0.5));
        float alpha = 1.0 - smoothstep(0.12, 0.5, radius);
        gl_FragColor = vec4(vTint, alpha * (0.35 + vAlpha * 0.65) * uOpacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    toneMapped: false,
  });
}

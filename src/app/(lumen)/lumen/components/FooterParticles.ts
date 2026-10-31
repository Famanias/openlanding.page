import * as THREE from 'three';

/** A small field of soft, independent light motes around the footer sculpture. */
export function createFooterParticles(time: THREE.IUniform<number>, pixelRatio: number) {
  const count = 54;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const opacities = new Float32Array(count);
  const palette = ['#8E7CE8', '#5B8DEF', '#FFFFFF'].map((color) => new THREE.Color(color));

  // A fixed seed keeps the arrangement stable across mounts and viewport changes.
  let seed = 2026;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    const index = i * 3;
    positions[index] = -2.15 + random() * 4.75;
    positions[index + 1] = -0.85 + random() * 2.35;
    positions[index + 2] = 0.8 + random() * 0.5;
    const color = palette[Math.floor(random() * palette.length)];
    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
    sizes[i] = 4 + random() * 7;
    phases[i] = random() * Math.PI * 2;
    speeds[i] = 0.25 + random() * 0.3;
    opacities[i] = 0.4 + random() * 0.42;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: time, uPixelRatio: { value: pixelRatio } },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aPhase;
      attribute float aSpeed;
      attribute float aOpacity;
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        float phase = uTime * aSpeed + aPhase;
        vec3 mote = position;
        mote.x += sin(phase) * 0.11;
        mote.y += cos(phase * 0.7 + aPhase) * 0.13;
        mote.z += sin(phase * 0.65) * 0.08;
        vColor = aColor;
        vOpacity = aOpacity * (0.6 + 0.4 * (0.5 + 0.5 * sin(phase * 1.25)));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(mote, 1.0);
        gl_PointSize = aSize * uPixelRatio;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        vec2 p = gl_PointCoord - vec2(0.5);
        float radius = length(p) * 2.0;
        float halo = pow(max(1.0 - radius, 0.0), 1.6);
        float core = 1.0 - smoothstep(0.0, 0.24, radius);
        float glint = exp(-abs(p.x) * 26.0 - abs(p.y) * 5.0)
                    + exp(-abs(p.y) * 26.0 - abs(p.x) * 5.0);
        float alpha = min(1.0, core * 0.7 + halo * 0.55 + glint * 0.12) * vOpacity;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(vColor, alpha);
        #include <colorspace_fragment>
      }
    `,
  });

  const particles = new THREE.Points(geometry, material);
  particles.renderOrder = 5;
  particles.frustumCulled = false;
  return particles;
}

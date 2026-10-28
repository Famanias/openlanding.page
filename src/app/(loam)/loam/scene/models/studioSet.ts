import * as THREE from 'three';

export interface BuiltStudioSet {
  group: THREE.Group;
  sweepMesh: THREE.Mesh;
  plinthMesh: THREE.Mesh;
  contactShadowMesh: THREE.Mesh;
  updateStudio: (studioLightness: number, inspectStrength: number) => void;
}

/**
 * Builds the Chapter 05 Product Photography Studio Set at y ≈ -5.45:
 * - A seamless cream/sand paper sweep (floor curving smoothly up into a tall backdrop with zero visible horizon line)
 * - A low, matte, slightly warmer sand-stone plinth beneath the hero tray
 * - A soft multi-zone contact shadow directly beneath the tray and plinth
 * - Scrubbed smoothly from 0 -> 1 by `studioLightness` so the darkness lifts as the solid tray resolves,
 *   and dims cleanly on exit toward Chapter 06.
 */
export function buildStudioSet(): BuiltStudioSet {
  const group = new THREE.Group();
  group.name = 'Chapter5ProductStudioSet';
  group.position.set(0, -5.45, 0);

  // 1. Seamless Cyclorama Paper Sweep Geometry
  //    Floor at local y = -0.52 from z = +4.5 back to z = -1.1,
  //    curving smoothly up with radius R = 2.45 into a vertical backdrop at z = -3.55 rising to y = +6.5.
  const widthSegments = 48;
  const lengthSegments = 64;
  const sweepWidth = 22.0;

  const sweepPositions: number[] = [];
  const sweepUvs: number[] = [];
  const sweepIndices: number[] = [];

  const floorZStart = 4.6;
  const curveZStart = -0.95;
  const curveRadius = 2.55;
  const topYEnd = 6.8;

  const floorLen = floorZStart - curveZStart; // 5.55
  const arcLen = (Math.PI * 0.5) * curveRadius; // ~4.00
  const wallLen = topYEnd - (-0.52 + curveRadius); // ~4.77
  const totalLen = floorLen + arcLen + wallLen;

  for (let iy = 0; iy <= lengthSegments; iy++) {
    const v = iy / lengthSegments;
    const s = v * totalLen;

    let py = -0.52;
    let pz = floorZStart;

    if (s <= floorLen) {
      py = -0.52;
      pz = floorZStart - s;
    } else if (s <= floorLen + arcLen) {
      const arcS = s - floorLen;
      const theta = (arcS / arcLen) * (Math.PI * 0.5);
      py = -0.52 + curveRadius * (1 - Math.cos(theta));
      pz = curveZStart - curveRadius * Math.sin(theta);
    } else {
      const wallS = s - floorLen - arcLen;
      py = -0.52 + curveRadius + wallS;
      pz = curveZStart - curveRadius;
    }

    for (let ix = 0; ix <= widthSegments; ix++) {
      const u = ix / widthSegments;
      const px = (u - 0.5) * sweepWidth;
      sweepPositions.push(px, py, pz);
      sweepUvs.push(u, v);
    }
  }

  for (let iy = 0; iy < lengthSegments; iy++) {
    for (let ix = 0; ix < widthSegments; ix++) {
      const a = iy * (widthSegments + 1) + ix;
      const b = a + 1;
      const c = (iy + 1) * (widthSegments + 1) + ix;
      const d = c + 1;
      sweepIndices.push(a, b, c, b, d, c);
    }
  }

  const sweepGeo = new THREE.BufferGeometry();
  sweepGeo.setAttribute('position', new THREE.Float32BufferAttribute(sweepPositions, 3));
  sweepGeo.setAttribute('uv', new THREE.Float32BufferAttribute(sweepUvs, 2));
  sweepGeo.setIndex(sweepIndices);
  sweepGeo.computeVertexNormals();

  // Custom shader for the seamless paper sweep so it transitions smoothly from subterranean dark
  // to a warm, soft-lit cream/sand studio paper sweep with upper-left key light gradient and zero horizon line.
  const sweepMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: true,
    side: THREE.DoubleSide,
    uniforms: {
      uStudioLightness: { value: 0 },
      uInspectStrength: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vLocalPos;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vLocalPos = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uStudioLightness;
      uniform float uInspectStrength;
      varying vec2 vUv;
      varying vec3 vLocalPos;
      varying vec3 vNormal;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        // Warm cream/sand studio paper palette (never clips to pure white)
        vec3 keyPaper = vec3(0.925, 0.894, 0.835);   // #ece4d5 soft warm cream in upper-left key light
        vec3 midPaper = vec3(0.878, 0.839, 0.768);   // #e0d6c4 warm sand neutral
        vec3 shadePaper = vec3(0.804, 0.757, 0.678); // #cdc1ad gentle studio falloff

        // Soft large key light pool from upper-left (-x, +y)
        vec2 keyCenter = vec2(0.36, 0.42);
        float keyDist = length((vUv - keyCenter) * vec2(1.15, 0.95));
        float keyPool = 1.0 - smoothstep(0.05, 0.78, keyDist);

        // Seamless vertical cove gradient
        float coveShade = smoothstep(0.18, 0.55, vUv.y) * (1.0 - smoothstep(0.55, 0.92, vUv.y)) * 0.14;

        vec3 studioCol = mix(shadePaper, midPaper, smoothstep(0.95, 0.25, keyDist));
        studioCol = mix(studioCol, keyPaper, keyPool * 0.68);
        studioCol -= vec3(coveShade * 0.28);

        // Soft ambient contact darkening under the hero tray center (x ≈ 0, z ≈ 0)
        float trayFloorDist = length(vLocalPos.xz * vec2(0.56, 0.82));
        float floorMask = 1.0 - smoothstep(-0.48, -0.35, vLocalPos.y);
        float trayBounceShadow = (1.0 - smoothstep(0.2, 1.85, trayFloorDist)) * floorMask * 0.12;
        studioCol *= (1.0 - trayBounceShadow);

        // Subtle fine matte paper fibre grain
        float grain = (hash(vLocalPos.xz * 42.0 + vLocalPos.xy * 31.0) - 0.5) * 0.012;
        studioCol += grain;

        // Scrub between subterranean dark (#070504) and the warm lit studio paper sweep
        vec3 darkSubterranean = vec3(0.028, 0.022, 0.018);
        vec3 finalCol = mix(darkSubterranean, studioCol, uStudioLightness);

        gl_FragColor = vec4(finalCol, smoothstep(0.01, 0.18, uStudioLightness));
      }
    `,
  });

  const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
  sweepMesh.receiveShadow = true;
  group.add(sweepMesh);

  // 2. Low, matte, slightly darker warm travertine/sand plinth beneath the hero tray
  const plinthGeo = new THREE.CylinderGeometry(1.56, 1.62, 0.065, 64);
  plinthGeo.scale(1.18, 1.0, 0.82);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c5b7a1'),
    roughness: 0.96,
    metalness: 0.0,
    transparent: true,
    opacity: 0,
  });
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.position.set(0.0, -0.485, 0.02);
  plinthMesh.receiveShadow = true;
  group.add(plinthMesh);

  // 3. Soft radial contact shadow under the hero tray (on top of the plinth & sweep floor)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(128, 128, 14, 128, 128, 122);
  grad.addColorStop(0.0, 'rgba(28, 20, 12, 0.65)');
  grad.addColorStop(0.42, 'rgba(38, 28, 18, 0.38)');
  grad.addColorStop(0.75, 'rgba(48, 36, 24, 0.12)');
  grad.addColorStop(1.0, 'rgba(48, 36, 24, 0.0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 256, 256);

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  shadowTex.colorSpace = THREE.SRGBColorSpace;

  const contactShadowGeo = new THREE.PlaneGeometry(3.25, 2.25);
  contactShadowGeo.rotateX(-Math.PI / 2);
  const contactShadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const contactShadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
  contactShadowMesh.position.set(0.05, -0.448, 0.04);
  contactShadowMesh.rotation.y = -0.46;
  group.add(contactShadowMesh);

  const updateStudio = (studioLightness: number, inspectStrength: number) => {
    const visible = studioLightness > 0.01;
    group.visible = visible;
    if (!visible) return;

    sweepMat.uniforms.uStudioLightness.value = studioLightness;
    sweepMat.uniforms.uInspectStrength.value = inspectStrength;

    // Fade the low plinth and contact shadow smoothly with studioLightness;
    // slightly soften plinth during 360-degree Hold-to-Inspect rotation so the tray never intersects it
    const inspectFade = 1 - inspectStrength * 0.85;
    plinthMat.opacity = studioLightness * 0.94 * inspectFade;
    plinthMesh.position.y = -0.485 - inspectStrength * 0.18;

    contactShadowMat.opacity = studioLightness * 0.86 * (1 - inspectStrength * 0.55);
    contactShadowMesh.position.y = -0.448 - inspectStrength * 0.18;
  };

  return {
    group,
    sweepMesh,
    plinthMesh,
    contactShadowMesh,
    updateStudio,
  };
}

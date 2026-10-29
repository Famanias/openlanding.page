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
 * - A seamless neutral warm cream/sand paper sweep (floor curving smoothly up into a tall backdrop with zero visible horizon line)
 * - Soft multi-zone elliptical contact shadow directly beneath the hero tray (no oversized disc running off the bottom of the frame)
 * - Scrubbed smoothly from 0 -> 1 by `studioLightness` so the darkness lifts as the solid tray resolves,
 *   and dims cleanly on exit toward Chapter 06.
 */
export function buildStudioSet(): BuiltStudioSet {
  const group = new THREE.Group();
  group.name = 'Chapter5ProductStudioSet';
  group.position.set(0, -5.45, 0);

  // 1. Seamless Cyclorama Paper Sweep Geometry
  //    Floor at local y = -0.42 from z = +5.2 back to z = -1.2,
  //    curving smoothly up with radius R = 2.65 into a vertical backdrop rising to y = +6.8.
  const widthSegments = 48;
  const lengthSegments = 64;
  const sweepWidth = 24.0;

  const sweepPositions: number[] = [];
  const sweepUvs: number[] = [];
  const sweepIndices: number[] = [];

  const floorY = -0.40;
  const floorZStart = 5.2;
  const curveZStart = -1.25;
  const curveRadius = 2.65;
  const topYEnd = 7.0;

  const floorLen = floorZStart - curveZStart;
  const arcLen = Math.PI * 0.5 * curveRadius;
  const wallLen = topYEnd - (floorY + curveRadius);
  const totalLen = floorLen + arcLen + wallLen;

  for (let iy = 0; iy <= lengthSegments; iy++) {
    const v = iy / lengthSegments;
    const s = v * totalLen;

    let py = floorY;
    let pz = floorZStart;

    if (s <= floorLen) {
      py = floorY;
      pz = floorZStart - s;
    } else if (s <= floorLen + arcLen) {
      const arcS = s - floorLen;
      const theta = (arcS / arcLen) * (Math.PI * 0.5);
      py = floorY + curveRadius * (1 - Math.cos(theta));
      pz = curveZStart - curveRadius * Math.sin(theta);
    } else {
      const wallS = s - floorLen - arcLen;
      py = floorY + curveRadius + wallS;
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
  // to a calm, matte sand-stone studio paper sweep with zero clipping or yellow cast.
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
        // Calm, low-saturation warm sand/stone studio paper palette (never yellow, never clips to white)
        vec3 keyPaper = vec3(0.865, 0.842, 0.804);   // #dcd7cd soft matte warm alabaster/sand
        vec3 midPaper = vec3(0.812, 0.786, 0.745);   // #cfc8be neutral studio sand
        vec3 shadePaper = vec3(0.735, 0.706, 0.662); // #bbb4a9 gentle peripheral studio falloff

        // Soft large key light pool from upper-left (-x, +y)
        vec2 keyCenter = vec2(0.36, 0.44);
        float keyDist = length((vUv - keyCenter) * vec2(1.10, 0.92));
        float keyPool = 1.0 - smoothstep(0.05, 0.82, keyDist);

        // Seamless vertical cove gradient
        float coveShade = smoothstep(0.18, 0.55, vUv.y) * (1.0 - smoothstep(0.55, 0.92, vUv.y)) * 0.11;

        vec3 studioCol = mix(shadePaper, midPaper, smoothstep(0.95, 0.22, keyDist));
        studioCol = mix(studioCol, keyPaper, keyPool * 0.62);
        studioCol -= vec3(coveShade * 0.22);

        // Soft ambient contact grounding directly beneath the hero tray (x ≈ 0, z ≈ 0)
        // Rotated -0.46 rad to align with the tray's 3/4 angle
        float cosA = 0.896;
        float sinA = 0.444;
        vec2 rotXZ = vec2(
          vLocalPos.x * cosA - vLocalPos.z * sinA,
          vLocalPos.x * sinA + vLocalPos.z * cosA
        );
        float trayFootprint = length(rotXZ / vec2(1.42, 0.95));
        float floorMask = 1.0 - smoothstep(-0.38, -0.25, vLocalPos.y);
        float trayBounceShadow = (1.0 - smoothstep(0.55, 1.45, trayFootprint)) * floorMask * (1.0 - uInspectStrength * 0.65) * 0.14;
        studioCol *= (1.0 - trayBounceShadow);

        // Subtle fine matte paper fibre grain
        float grain = (hash(vLocalPos.xz * 42.0 + vLocalPos.xy * 31.0) - 0.5) * 0.010;
        studioCol += grain;

        // Scrub between subterranean dark (#0a0806) and the warm lit studio paper sweep
        vec3 darkSubterranean = vec3(0.035, 0.028, 0.022);
        vec3 finalCol = mix(darkSubterranean, studioCol, uStudioLightness);

        gl_FragColor = vec4(finalCol, smoothstep(0.01, 0.18, uStudioLightness));
      }
    `,
  });

  const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
  sweepMesh.receiveShadow = true;
  group.add(sweepMesh);

  // 2. Subtle hidden riser reference (kept for interface compatibility, hidden so no disc ever shows)
  const plinthGeo = new THREE.BoxGeometry(0.1, 0.01, 0.1);
  const plinthMat = new THREE.MeshBasicMaterial({ visible: false });
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.visible = false;
  group.add(plinthMesh);

  // 3. Soft tailored contact shadow directly under the hero tray on the seamless sweep floor
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext('2d')!;
  sCtx.clearRect(0, 0, 256, 256);
  sCtx.save();
  sCtx.translate(128, 128);
  sCtx.scale(1.0, 0.68);
  const grad = sCtx.createRadialGradient(0, 0, 18, 0, 0, 116);
  grad.addColorStop(0.0, 'rgba(34, 28, 22, 0.54)');
  grad.addColorStop(0.48, 'rgba(44, 36, 28, 0.30)');
  grad.addColorStop(0.78, 'rgba(54, 46, 36, 0.09)');
  grad.addColorStop(1.0, 'rgba(54, 46, 36, 0.0)');
  sCtx.fillStyle = grad;
  sCtx.beginPath();
  sCtx.arc(0, 0, 120, 0, Math.PI * 2);
  sCtx.fill();
  sCtx.restore();

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  shadowTex.colorSpace = THREE.SRGBColorSpace;

  const contactShadowGeo = new THREE.PlaneGeometry(3.15, 2.25);
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
  contactShadowMesh.position.set(0.04, floorY + 0.004, 0.03);
  contactShadowMesh.rotation.y = -0.46;
  group.add(contactShadowMesh);

  const updateStudio = (studioLightness: number, inspectStrength: number) => {
    const visible = studioLightness > 0.01;
    group.visible = visible;
    if (!visible) return;

    sweepMat.uniforms.uStudioLightness.value = studioLightness;
    sweepMat.uniforms.uInspectStrength.value = inspectStrength;

    // Soften and lower the floor contact shadow during 360-degree Hold-to-Inspect rotation
    contactShadowMat.opacity = studioLightness * 0.78 * (1 - inspectStrength * 0.72);
    contactShadowMesh.position.y = floorY + 0.004 - inspectStrength * 0.16;
  };

  return {
    group,
    sweepMesh,
    plinthMesh,
    contactShadowMesh,
    updateStudio,
  };
}

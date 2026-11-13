import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import {
  FloatUniform,
  KoiVariant,
  PALETTE,
  createKoiBodyMaterial,
} from './materials';
import type { PondTextureSuite } from './textures';

export interface KoiActor {
  variant: KoiVariant;
  phase: number;
  group: THREE.Group;
  updateAnimation: (elapsed: number, speed: number, localBedClearance?: number) => void;
  dispose: () => void;
}

function createKoiBodyGeometry(): THREE.BufferGeometry {
  const lengthSegments = 40;
  const radialSegments = 18;
  const bodyLength = 0.72;
  const maxR = 0.135;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= lengthSegments; i++) {
    const u = i / lengthSegments;
    const x = -bodyLength * 0.5 + u * bodyLength;

    // Carp silhouette: slender caudal peduncle (u=0) -> full shoulder (u=0.66) -> tapered rounded snout (u=1)
    let rHoriz = 0;
    let rVert = 0;
    if (u > 0 && u < 1) {
      const shoulderProfile = Math.pow(Math.sin(Math.PI * Math.pow(u, 0.78)), 0.72);
      const peduncleTaper = 0.22 + 0.78 * Math.pow(u, 0.35);
      // Subtle gill plate indent around u = 0.76
      const gillDip = 1 - 0.045 * Math.exp(-Math.pow((u - 0.76) / 0.032, 2));
      rHoriz = maxR * shoulderProfile * peduncleTaper * gillDip;
      // Deeper vertical profile near shoulders, slightly flattened belly
      const verticalRatio = 0.68 + 0.14 * Math.sin(Math.PI * u);
      rVert = rHoriz * verticalRatio;
    }

    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments;
      const angle = v * Math.PI * 2 - Math.PI;
      let y = Math.cos(angle) * rVert;
      // Flatten underside subtly, raise dorsal spine gracefully
      if (y < 0) y *= 0.84;
      const z = Math.sin(angle) * rHoriz;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  const stride = radialSegments + 1;
  for (let i = 0; i < lengthSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * stride + j;
      const b = (i + 1) * stride + j;
      const c = (i + 1) * stride + (j + 1);
      const d = i * stride + (j + 1);

      indices.push(a, d, b);
      indices.push(b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createCaudalFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.016);
  shape.quadraticCurveTo(-0.07, 0.095, -0.155, 0.105);
  shape.quadraticCurveTo(-0.11, 0.028, -0.09, 0);
  shape.quadraticCurveTo(-0.11, -0.028, -0.155, -0.105);
  shape.quadraticCurveTo(-0.07, -0.095, 0, -0.016);
  shape.closePath();

  const geo = new THREE.ShapeGeometry(shape, 10);
  geo.rotateX(Math.PI * 0.36);
  return geo;
}

function createPectoralFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.05, 0.09, -0.035, 0.13);
  shape.quadraticCurveTo(-0.105, 0.11, -0.088, 0.025);
  shape.closePath();

  const geo = new THREE.ShapeGeometry(shape, 8);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function createPelvicFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.02, 0.048, -0.03, 0.068);
  shape.quadraticCurveTo(-0.068, 0.055, -0.058, 0.01);
  shape.closePath();
  const geo = new THREE.ShapeGeometry(shape, 6);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function createDorsalFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0.13, 0);
  shape.quadraticCurveTo(0.03, 0.072, -0.14, 0.054);
  shape.quadraticCurveTo(-0.17, 0.022, -0.165, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape, 8);
}

export function createKoiActor(
  variant: KoiVariant,
  phase: number,
  elapsedUniform: FloatUniform,
  textures: PondTextureSuite,
  sizeScale = 1,
): KoiActor {
  const group = new THREE.Group();
  group.scale.setScalar(sizeScale);

  const speedUniform = uniform(0.66) as FloatUniform;
  const bodyGeo = createKoiBodyGeometry();
  const bodyMat = createKoiBodyMaterial(variant, textures, elapsedUniform, speedUniform, phase);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyMesh.renderOrder = 1;
  group.add(bodyMesh);

  const finHex =
    variant === 'yamabuki'
      ? 0xf0cf8d
      : variant === 'shiro'
        ? 0xeae5da
        : PALETTE.porcelain;
  const finMat = new THREE.MeshStandardNodeMaterial({
    color: finHex,
    alphaMap: textures.finAlpha,
    roughness: 0.34,
    metalness: 0.02,
    transparent: true,
    opacity: 0.86,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // Flowing caudal tail fin
  const tailPivot = new THREE.Group();
  tailPivot.position.set(-0.34, 0, 0);
  const tailGeo = createCaudalFinGeometry();
  const tailMesh = new THREE.Mesh(tailGeo, finMat);
  tailMesh.renderOrder = 1;
  tailPivot.add(tailMesh);
  group.add(tailPivot);

  // Dorsal crest fin
  const dorsalGeo = createDorsalFinGeometry();
  const dorsalMesh = new THREE.Mesh(dorsalGeo, finMat);
  dorsalMesh.position.set(-0.03, 0.074, 0);
  dorsalMesh.renderOrder = 1;
  group.add(dorsalMesh);

  // Paired wing-like pectoral fins
  const pecGeo = createPectoralFinGeometry();
  const rightPec = new THREE.Mesh(pecGeo, finMat);
  rightPec.position.set(0.115, -0.022, 0.078);
  rightPec.rotation.y = 0.24;
  rightPec.renderOrder = 1;
  group.add(rightPec);

  const leftPec = new THREE.Mesh(pecGeo, finMat);
  leftPec.scale.set(1, 1, -1);
  leftPec.position.set(0.115, -0.022, -0.078);
  leftPec.rotation.y = -0.24;
  leftPec.renderOrder = 1;
  group.add(leftPec);

  // Paired smaller pelvic fins farther aft
  const pelvGeo = createPelvicFinGeometry();
  const rightPelv = new THREE.Mesh(pelvGeo, finMat);
  rightPelv.position.set(-0.07, -0.036, 0.044);
  rightPelv.rotation.y = 0.2;
  rightPelv.renderOrder = 1;
  group.add(rightPelv);

  const leftPelv = new THREE.Mesh(pelvGeo, finMat);
  leftPelv.scale.set(1, 1, -1);
  leftPelv.position.set(-0.07, -0.036, -0.044);
  leftPelv.rotation.y = -0.2;
  leftPelv.renderOrder = 1;
  group.add(leftPelv);

  // Glossy dark eyes with warm golden iris collar
  const eyeGeo = new THREE.SphereGeometry(0.015, 10, 10);
  const irisGeo = new THREE.SphereGeometry(0.0185, 10, 10);
  const eyeMat = new THREE.MeshStandardNodeMaterial({
    color: 0x0d100f,
    roughness: 0.08,
    metalness: 0.15,
  });
  const irisMat = new THREE.MeshStandardNodeMaterial({
    color: PALETTE.gold,
    roughness: 0.25,
    metalness: 0.25,
  });

  const irisL = new THREE.Mesh(irisGeo, irisMat);
  irisL.position.set(0.255, 0.028, -0.05);
  const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
  eyeLeft.position.set(0.258, 0.03, -0.053);

  const irisR = new THREE.Mesh(irisGeo, irisMat);
  irisR.position.set(0.255, 0.028, 0.05);
  const eyeRight = new THREE.Mesh(eyeGeo, eyeMat);
  eyeRight.position.set(0.258, 0.03, 0.053);
  group.add(irisL, eyeLeft, irisR, eyeRight);

  // Subtle paired whisker barbels near snout
  const barbelGeo = new THREE.ConeGeometry(0.004, 0.034, 5);
  barbelGeo.rotateZ(-Math.PI * 0.65);
  const barbelMat = new THREE.MeshStandardNodeMaterial({
    color: variant === 'shiro' ? PALETTE.ink : 0xd8c3a5,
    roughness: 0.45,
  });
  const barbelL = new THREE.Mesh(barbelGeo, barbelMat);
  barbelL.position.set(0.345, -0.008, -0.024);
  barbelL.rotation.y = 0.42;
  const barbelR = new THREE.Mesh(barbelGeo, barbelMat);
  barbelR.position.set(0.345, -0.008, 0.024);
  barbelR.rotation.y = -0.42;
  group.add(barbelL, barbelR);

  // Soft projected pond-floor contact shadow underneath koi
  const shadowGeo = new THREE.PlaneGeometry(0.84, 0.38);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicNodeMaterial({
    map: textures.contactShadow,
    transparent: true,
    depthWrite: false,
    opacity: 0.4,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(-0.04, -0.18, 0);
  group.add(shadowMesh);

  const updateAnimation = (elapsed: number, speed: number, localBedClearance = 0.18) => {
    speedUniform.value = speed;
    const speedScale = Math.max(0.75, Math.min(1.45, speed / 0.66));
    const tailOffset = 0.042 * Math.sin(8.6 - 3.6 * elapsed * speedScale + phase);
    tailPivot.position.z = tailOffset;
    tailPivot.rotation.y = 0.34 * Math.sin(3.6 * elapsed * speedScale - phase);

    const pecWave = 0.12 * Math.sin(2.6 * elapsed * speedScale + phase);
    rightPec.rotation.y = 0.24 + pecWave;
    leftPec.rotation.y = -0.24 - pecWave;
    dorsalMesh.rotation.z = 0.06 * Math.sin(3.6 * elapsed * speedScale - phase + 0.8);

    shadowMesh.position.y = -Math.max(0.08, Math.min(0.45, localBedClearance));
    shadowMat.opacity = Math.max(0.18, 0.42 - localBedClearance * 0.45);
  };

  const dispose = () => {
    bodyGeo.dispose();
    bodyMat.dispose();
    tailGeo.dispose();
    dorsalGeo.dispose();
    pecGeo.dispose();
    pelvGeo.dispose();
    eyeGeo.dispose();
    irisGeo.dispose();
    barbelGeo.dispose();
    finMat.dispose();
    eyeMat.dispose();
    irisMat.dispose();
    barbelMat.dispose();
    shadowGeo.dispose();
    shadowMat.dispose();
  };

  return { variant, phase, group, updateAnimation, dispose };
}

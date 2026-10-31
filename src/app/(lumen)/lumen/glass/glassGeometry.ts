import * as THREE from 'three';
import {
  GlassPresetId,
  GlassMaterialParams,
  GlassSceneParams,
  createSeededRandom,
} from './glassTypes';
import { createGlassShaderMaterial } from './glassShaders';

export interface BuiltGlassScene {
  group: THREE.Group;
  materials: THREE.ShaderMaterial[];
  animate: (loopPhase: number, pointerX: number, pointerY: number) => void;
  dispose: () => void;
}

function createRoundedPanelShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

export function buildPresetSculpture(
  presetId: GlassPresetId,
  studioTexture: THREE.Texture,
  materialParams: GlassMaterialParams,
  sceneParams: GlassSceneParams,
  transparentExport = false,
  isSoftwareGl = false
): BuiltGlassScene {
  const rng = createSeededRandom(sceneParams.seed);
  const group = new THREE.Group();
  const materials: THREE.ShaderMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const density = Math.max(1, Math.min(6, Math.round(sceneParams.shapeDensity)));

  const segMultiplier = isSoftwareGl ? 0.65 : 1.0;

  const makeMat = (layerIdx: number) => {
    const mat = createGlassShaderMaterial(
      studioTexture,
      materialParams,
      sceneParams,
      layerIdx,
      transparentExport
    );
    materials.push(mat);
    return mat;
  };

  if (presetId === 'opal-ribbon') {
    // PRESET 01 — OPAL RIBBON: Sweeping thick 3D glass ribbon + secondary bevel ribbon + floating prism lens
    const ribbonCount = Math.max(2, Math.min(4, density));
    for (let i = 0; i < ribbonCount; i++) {
      const seedOffset = (rng() - 0.5) * 0.45;
      const curvePoints = [
        new THREE.Vector3(-1.4 + i * 0.4, -2.3 + seedOffset, -0.6 + i * 0.25),
        new THREE.Vector3(0.2 + i * 0.35, -0.85 - seedOffset, 0.25 + i * 0.15),
        new THREE.Vector3(0.85 + seedOffset, 0.55 + i * 0.2, 0.45 - i * 0.15),
        new THREE.Vector3(2.25 - i * 0.2, 2.15 + seedOffset, -0.35 + i * 0.2),
      ];
      const curve = new THREE.CatmullRomCurve3(curvePoints);

      // Extruded wide ribbon cross-section
      const ribbonWidth = i === 0 ? 0.92 : 0.48;
      const ribbonThickness = i === 0 ? 0.16 : 0.1;
      const crossShape = createRoundedPanelShape(ribbonWidth, ribbonThickness, ribbonThickness * 0.45);

      const extrudeSteps = Math.round(64 * segMultiplier);
      const geom = new THREE.ExtrudeGeometry(crossShape, {
        steps: extrudeSteps,
        bevelEnabled: false,
        extrudePath: curve,
      });
      geom.computeVertexNormals();
      geometries.push(geom);

      const mat = makeMat(i);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: new THREE.Euler(0.08 * i, -0.12 * i, 0.05 * (rng() - 0.5)),
        phaseOffset: i * 1.2,
      };
      mesh.rotation.copy(mesh.userData.baseRot);
      group.add(mesh);
    }

    // Accent floating optical bevel lens near upper-right curve
    const lensGeo = new THREE.SphereGeometry(
      0.68,
      Math.round(36 * segMultiplier),
      Math.round(28 * segMultiplier)
    );
    lensGeo.scale(1.15, 0.85, 0.28);
    geometries.push(lensGeo);
    const lensMesh = new THREE.Mesh(lensGeo, makeMat(ribbonCount + 1));
    lensMesh.position.set(1.25, 0.72, 0.35);
    lensMesh.rotation.set(0.25, -0.35, 0.15);
    lensMesh.renderOrder = ribbonCount + 2;
    lensMesh.userData = {
      basePos: lensMesh.position.clone(),
      baseRot: lensMesh.rotation.clone(),
      phaseOffset: 2.4,
    };
    group.add(lensMesh);
  } else if (presetId === 'frosted-fold') {
    // PRESET 02 — FROSTED FOLD: Architectural folded glazing sheets
    const sheetCount = Math.max(2, Math.min(5, density));
    for (let i = 0; i < sheetCount; i++) {
      const segsX = Math.round(44 * segMultiplier);
      const segsY = Math.round(28 * segMultiplier);
      const planeGeo = new THREE.PlaneGeometry(3.6 - i * 0.35, 2.4 - i * 0.18, segsX, segsY);
      const posAttr = planeGeo.attributes.position;
      const foldFreq = 1.35 + i * 0.25;
      const foldAmp = 0.32 - i * 0.04;

      for (let v = 0; v < posAttr.count; v++) {
        const px = posAttr.getX(v);
        const py = posAttr.getY(v);
        const pz = Math.sin(px * foldFreq + py * 0.65 + i * 0.9) * foldAmp;
        posAttr.setZ(v, pz);
      }
      planeGeo.computeVertexNormals();
      geometries.push(planeGeo);

      const mesh = new THREE.Mesh(planeGeo, makeMat(i));
      mesh.position.set(
        (i - (sheetCount - 1) / 2) * 0.55 + (rng() - 0.5) * 0.2,
        (i - 1) * 0.22,
        -0.45 + i * 0.35
      );
      mesh.rotation.set(-0.18 + i * 0.08, 0.24 - i * 0.1, -0.22 + i * 0.09);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 1.1,
      };
      group.add(mesh);
    }
  } else if (presetId === 'liquid-lens') {
    // PRESET 03 — LIQUID LENS: Sculpted biconvex optical lenses bending the underlying studio grid
    const lensCount = Math.max(2, Math.min(4, density));
    const layouts = [
      { x: 0.55, y: 0.18, z: 0.25, rx: 1.35, ry: 1.05, rz: 0.34, rotZ: -0.25 },
      { x: -0.45, y: -0.42, z: -0.2, rx: 1.05, ry: 0.9, rz: 0.3, rotZ: 0.35 },
      { x: 1.35, y: -0.55, z: 0.5, rx: 0.82, ry: 0.72, rz: 0.28, rotZ: 0.12 },
      { x: -0.15, y: 0.78, z: -0.45, rx: 0.75, ry: 0.65, rz: 0.25, rotZ: -0.4 },
    ];

    for (let i = 0; i < lensCount; i++) {
      const cfg = layouts[i % layouts.length];
      const sphereGeo = new THREE.SphereGeometry(
        1.0,
        Math.round(44 * segMultiplier),
        Math.round(32 * segMultiplier)
      );
      sphereGeo.scale(cfg.rx, cfg.ry, cfg.rz);
      sphereGeo.computeVertexNormals();
      geometries.push(sphereGeo);

      const mesh = new THREE.Mesh(sphereGeo, makeMat(i));
      mesh.position.set(
        cfg.x + (rng() - 0.5) * 0.18,
        cfg.y + (rng() - 0.5) * 0.18,
        cfg.z
      );
      mesh.rotation.set(0.18 * (rng() - 0.5), -0.22 * (rng() - 0.5), cfg.rotZ);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 1.45,
      };
      group.add(mesh);
    }
  } else if (presetId === 'glass-strata') {
    // PRESET 04 — GLASS STRATA: Layered beveled architectural glass slabs at staggered depths
    const slabCount = Math.max(3, Math.min(5, density + 1));
    for (let i = 0; i < slabCount; i++) {
      const w = 2.5 - i * 0.28;
      const h = 1.65 - i * 0.16;
      const shape = createRoundedPanelShape(w, h, 0.24);
      const slabGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: Math.max(2, Math.round(3 * segMultiplier)),
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04,
      });
      slabGeo.center();
      slabGeo.computeVertexNormals();
      geometries.push(slabGeo);

      const mesh = new THREE.Mesh(slabGeo, makeMat(i));
      const offsetAngle = (i - (slabCount - 1) / 2) * 0.38;
      mesh.position.set(
        offsetAngle * 0.95 + (rng() - 0.5) * 0.15,
        (i - (slabCount - 1) / 2) * 0.24,
        -0.7 + i * 0.38
      );
      mesh.rotation.set(-0.14 + i * 0.04, -0.28 + i * 0.06, -0.08 + i * 0.03);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 0.95,
      };
      group.add(mesh);
    }
  } else if (presetId === 'refractive-halo') {
    // PRESET 05 — REFRACTIVE HALO: Sculptural elliptical optical torus ring + inner counter-ring + core lens
    const outerTorus = new THREE.TorusGeometry(
      1.35,
      0.34,
      Math.round(32 * segMultiplier),
      Math.round(72 * segMultiplier)
    );
    outerTorus.scale(1.18, 0.92, 0.72);
    outerTorus.computeVertexNormals();
    geometries.push(outerTorus);

    const outerMesh = new THREE.Mesh(outerTorus, makeMat(0));
    outerMesh.position.set(0.25, 0.04, 0.1);
    outerMesh.rotation.set(0.32, -0.38, 0.18);
    outerMesh.renderOrder = 2;
    outerMesh.userData = {
      basePos: outerMesh.position.clone(),
      baseRot: outerMesh.rotation.clone(),
      phaseOffset: 0.0,
    };
    group.add(outerMesh);

    if (density >= 2) {
      const innerTorus = new THREE.TorusGeometry(
        0.78,
        0.18,
        Math.round(24 * segMultiplier),
        Math.round(56 * segMultiplier)
      );
      innerTorus.scale(1.08, 1.15, 0.65);
      innerTorus.computeVertexNormals();
      geometries.push(innerTorus);

      const innerMesh = new THREE.Mesh(innerTorus, makeMat(1));
      innerMesh.position.set(0.22, 0.02, -0.22);
      innerMesh.rotation.set(-0.28, 0.42, -0.25);
      innerMesh.renderOrder = 1;
      innerMesh.userData = {
        basePos: innerMesh.position.clone(),
        baseRot: innerMesh.rotation.clone(),
        phaseOffset: 1.6,
      };
      group.add(innerMesh);
    }
  } else {
    // PRESET 06 — CAUSTIC WINDOW: Curved glass architectural louvers projecting refracted daylight bands
    const louverCount = Math.max(3, Math.min(5, density + 1));
    for (let i = 0; i < louverCount; i++) {
      const louverGeo = new THREE.CylinderGeometry(
        1.6,
        1.6,
        3.8,
        Math.round(32 * segMultiplier),
        1,
        true,
        -0.38,
        0.76
      );
      louverGeo.computeVertexNormals();
      geometries.push(louverGeo);

      const mesh = new THREE.Mesh(louverGeo, makeMat(i));
      mesh.position.set(
        -0.6 + i * 0.68 + (rng() - 0.5) * 0.1,
        0.15 - i * 0.08,
        -0.5 + i * 0.22
      );
      mesh.rotation.set(0.12, -0.45 + i * 0.12, 0.42);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 0.85,
      };
      group.add(mesh);
    }
  }

  const animate = (loopPhase: number, pointerX: number, pointerY: number) => {
    const childCount = group.children.length;
    for (let i = 0; i < childCount; i++) {
      const child = group.children[i];
      const ud = child.userData;
      if (!ud || !ud.basePos || !ud.baseRot) continue;

      const p = loopPhase + (ud.phaseOffset || 0);
      const s = Math.sin(p);
      const c = Math.cos(p);

      // Seamless zero-gravity periodic float & subtle orientation shift
      child.position.x = ud.basePos.x + s * 0.08 + pointerX * (0.06 + i * 0.02);
      child.position.y = ud.basePos.y + c * 0.07 + pointerY * (0.05 + i * 0.015);
      child.position.z = ud.basePos.z + Math.sin(p * 2.0) * 0.05;

      child.rotation.x = ud.baseRot.x + c * 0.055 - pointerY * 0.08;
      child.rotation.y = ud.baseRot.y + s * 0.065 + pointerX * 0.09;
      child.rotation.z = ud.baseRot.z + Math.sin(p + 0.7) * 0.035;
    }
  };

  const dispose = () => {
    for (const g of geometries) {
      g.dispose();
    }
    for (const m of materials) {
      m.dispose();
    }
  };

  return { group, materials, animate, dispose };
}

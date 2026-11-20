import * as THREE from 'three';
import { BoatState } from '../sim/types';
import { ProceduralTextureSet } from './textures';

export interface BoatRig {
  group: THREE.Group;
  boatGroup: THREE.Group;
  buoyGroup: THREE.Group;
  tetherLine: THREE.Line;
  update: (
    state: BoatState,
    options?: {
      showSamplePoints?: boolean;
      showWaterNormal?: boolean;
    }
  ) => void;
  dispose: () => void;
}

/**
 * Constructs a lofted curved wooden rowboat hull (clinker dory profile) with visible
 * hull interior, ribs, wooden thwarts, gunwales, oars, orange mooring buoy, dynamic
 * catenary mooring rope, and optional physics diagnostic visualizers (5 wave sample
 * spheres + local water surface normal arrow).
 */
export function buildWoodenBoat(textures: ProceduralTextureSet): BoatRig {
  const group = new THREE.Group();
  const boatGroup = new THREE.Group();
  boatGroup.name = 'WoodenBoatGroup';
  group.add(boatGroup);

  const disposables: Array<{ dispose: () => void }> = [];
  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    disposables.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    disposables.push(m);
    return m;
  };

  const hullMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.woodColor,
      bumpMap: textures.woodBump,
      bumpScale: 0.09,
      roughness: 0.74,
      metalness: 0.04,
      side: THREE.DoubleSide,
    })
  );

  const trimWoodMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x3f2e22,
      map: textures.woodColor,
      roughness: 0.66,
      metalness: 0.05,
    })
  );

  const ironMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x2a2d32,
      roughness: 0.45,
      metalness: 0.8,
    })
  );

  const buoyOrangeMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xe2531c,
      roughness: 0.36,
      metalness: 0.06,
    })
  );

  // =========================================================================
  // 1. LOFTED CURVED HULL GEOMETRY (Bow along +X, Stern along -X)
  // =========================================================================
  const lengthSegs = 18;
  const profileSegs = 10;
  const halfLen = 1.85;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= lengthSegs; i++) {
    const u = i / lengthSegs;
    const x = (u - 0.5) * halfLen * 2;

    const beamFactor =
      u > 0.5
        ? Math.pow(Math.max(0, 1 - Math.pow((u - 0.5) / 0.5, 1.65)), 0.78)
        : 0.48 + 0.52 * Math.sin(u * Math.PI);
    const halfBeam = Math.max(0.03, beamFactor * 0.82);

    const sheerY = 0.52 + Math.pow((u - 0.48) * 2, 2) * 0.24;
    const keelY = -0.26 + Math.pow((u - 0.5) * 2, 4) * 0.34;

    for (let j = 0; j <= profileSegs; j++) {
      const v = j / profileSegs;
      const s = (v - 0.5) * 2;
      const absS = Math.abs(s);

      const z = Math.sign(s) * Math.pow(absS, 0.78) * halfBeam;
      const y = keelY + Math.pow(absS, 1.55) * (sheerY - keelY);

      positions.push(x, y, z);
      uvs.push(u * 2.2, v * 1.4);
    }
  }

  const stride = profileSegs + 1;
  for (let i = 0; i < lengthSegs; i++) {
    for (let j = 0; j < profileSegs; j++) {
      const a = i * stride + j;
      const b = (i + 1) * stride + j;
      const c = (i + 1) * stride + (j + 1);
      const d = i * stride + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const hullGeo = trackGeo(new THREE.BufferGeometry());
  hullGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  hullGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  hullGeo.setIndex(indices);
  hullGeo.computeVertexNormals();

  const hullMesh = new THREE.Mesh(hullGeo, hullMat);
  hullMesh.castShadow = true;
  hullMesh.receiveShadow = true;
  boatGroup.add(hullMesh);

  // Transom stern board closing the back at x = -halfLen
  const transom = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(0.11, 0.62, 0.82)),
    trimWoodMat
  );
  transom.position.set(-halfLen + 0.04, 0.34, 0);
  transom.rotation.z = 0.14;
  boatGroup.add(transom);

  // Internal timber keel spine & floorboard duckboards
  const keelSpine = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(3.2, 0.1, 0.12)),
    trimWoodMat
  );
  keelSpine.position.set(0, -0.22, 0);
  boatGroup.add(keelSpine);

  const floorboard = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(2.35, 0.06, 0.78)),
    trimWoodMat
  );
  floorboard.position.set(-0.08, -0.05, 0);
  boatGroup.add(floorboard);

  // Three wooden bench thwarts + bow breasthook deck
  [
    { x: -1.15, w: 1.08, y: 0.36 },
    { x: -0.05, w: 1.42, y: 0.32 },
    { x: 0.95, w: 1.05, y: 0.38 },
  ].forEach((seat) => {
    const bench = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.32, 0.065, seat.w)),
      hullMat
    );
    bench.position.set(seat.x, seat.y, 0);
    bench.castShadow = true;
    boatGroup.add(bench);
  });

  // Curved thick wooden gunwale rub-rails along port & starboard rims
  [-1, 1].forEach((side) => {
    const gunwalePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 10; i++) {
      const u = i / 10;
      const x = (u - 0.5) * halfLen * 2;
      const beamFactor =
        u > 0.5
          ? Math.pow(Math.max(0, 1 - Math.pow((u - 0.5) / 0.5, 1.65)), 0.78)
          : 0.48 + 0.52 * Math.sin(u * Math.PI);
      const halfBeam = Math.max(0.03, beamFactor * 0.83);
      const sheerY = 0.53 + Math.pow((u - 0.48) * 2, 2) * 0.24;
      gunwalePts.push(new THREE.Vector3(x, sheerY, side * halfBeam));
    }
    const curve = new THREE.CatmullRomCurve3(gunwalePts);
    const rail = new THREE.Mesh(
      trackGeo(new THREE.TubeGeometry(curve, 24, 0.055, 6, false)),
      trimWoodMat
    );
    boatGroup.add(rail);
  });

  // Two resting wooden oars tucked diagonally inside the boat
  [-1, 1].forEach((side) => {
    const oarGroup = new THREE.Group();
    const shaft = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.024, 0.028, 2.25, 8)),
      hullMat
    );
    shaft.rotation.z = Math.PI / 2;
    oarGroup.add(shaft);

    const blade = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.58, 0.025, 0.14)),
      trimWoodMat
    );
    blade.position.x = -1.18;
    oarGroup.add(blade);

    oarGroup.position.set(0.05, 0.41, side * 0.34);
    oarGroup.rotation.y = side * 0.14;
    boatGroup.add(oarGroup);
  });

  const bowRing = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(0.08, 0.022, 6, 12)),
    ironMat
  );
  bowRing.position.set(halfLen + 0.02, 0.66, 0);
  boatGroup.add(bowRing);

  // =========================================================================
  // 2. ORANGE SPHERICAL MOORING BUOY
  // =========================================================================
  const buoyGroup = new THREE.Group();
  group.add(buoyGroup);

  const buoySphere = new THREE.Mesh(
    trackGeo(new THREE.SphereGeometry(0.38, 18, 14)),
    buoyOrangeMat
  );
  buoySphere.castShadow = true;
  buoyGroup.add(buoySphere);

  const buoyEye = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(0.09, 0.025, 6, 12)),
    ironMat
  );
  buoyEye.position.y = 0.4;
  buoyGroup.add(buoyEye);

  // =========================================================================
  // 3. DYNAMIC CATENARY MOORING ROPE
  // =========================================================================
  const ropeSegs = 14;
  const ropePositions = new Float32Array((ropeSegs + 1) * 3);
  const ropeGeo = trackGeo(new THREE.BufferGeometry());
  ropeGeo.setAttribute('position', new THREE.BufferAttribute(ropePositions, 3));
  const ropeMat = trackMat(new THREE.LineBasicMaterial({ color: 0xb09a72 }));
  const tetherLine = new THREE.Line(ropeGeo, ropeMat);
  tetherLine.frustumCulled = false;
  group.add(tetherLine);

  // =========================================================================
  // 4. BOAT BUOYANCY DIAGNOSTIC VISUALIZERS (5 Wave Sample Spheres + Water Normal Arrow)
  // =========================================================================
  const samplePointsGroup = new THREE.Group();
  samplePointsGroup.visible = false;
  group.add(samplePointsGroup);

  const sampleGeo = trackGeo(new THREE.SphereGeometry(0.16, 10, 8));
  const sampleColors = [0xf59e0b, 0xf97316, 0x22c55e, 0xef4444, 0x38bdf8];
  const sampleMeshes: THREE.Mesh[] = sampleColors.map((hex) => {
    const m = new THREE.Mesh(
      sampleGeo,
      trackMat(new THREE.MeshBasicMaterial({ color: hex }))
    );
    samplePointsGroup.add(m);
    return m;
  });

  const waterNormalArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    3.2,
    0x38bdf8,
    0.55,
    0.34
  );
  waterNormalArrow.visible = false;
  group.add(waterNormalArrow);

  const _bowWorld = new THREE.Vector3();
  const _normalDir = new THREE.Vector3(0, 1, 0);

  return {
    group,
    boatGroup,
    buoyGroup,
    tetherLine,
    update: (state, options) => {
      boatGroup.position.set(state.x, state.y, state.z);
      boatGroup.rotation.order = 'YXZ';
      boatGroup.rotation.y = state.yaw;
      boatGroup.rotation.z = state.pitch;
      boatGroup.rotation.x = state.roll;

      buoyGroup.position.set(state.buoyX, state.buoyY, state.buoyZ);
      buoyGroup.rotation.z = state.pitch * 0.8;
      buoyGroup.rotation.x = state.roll * 0.8;

      const cosY = Math.cos(state.yaw);
      const sinY = Math.sin(state.yaw);
      _bowWorld.set(
        state.x + cosY * (halfLen * 0.96),
        state.y + 0.62 + Math.sin(state.pitch) * halfLen,
        state.z - sinY * (halfLen * 0.96)
      );

      const bx = state.buoyX;
      const by = state.buoyY + 0.38;
      const bz = state.buoyZ;

      const attr = ropeGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i <= ropeSegs; i++) {
        const t = i / ropeSegs;
        const sag = Math.sin(t * Math.PI) * 0.34;
        attr.setXYZ(
          i,
          _bowWorld.x + (bx - _bowWorld.x) * t,
          _bowWorld.y + (by - _bowWorld.y) * t - sag,
          _bowWorld.z + (bz - _bowWorld.z) * t
        );
      }
      attr.needsUpdate = true;

      // Update wave sample point diagnostic spheres
      const showSamples = Boolean(options?.showSamplePoints);
      samplePointsGroup.visible = showSamples;
      if (showSamples && state.samplePoints.length >= sampleMeshes.length) {
        for (let i = 0; i < sampleMeshes.length; i++) {
          const sp = state.samplePoints[i];
          sampleMeshes[i].position.set(sp.x, sp.y + 0.14, sp.z);
        }
      }

      // Update local water surface normal diagnostic arrow
      const showNormal = Boolean(options?.showWaterNormal);
      waterNormalArrow.visible = showNormal;
      if (showNormal) {
        waterNormalArrow.position.set(state.x, state.y + 0.55, state.z);
        _normalDir
          .set(state.waterNormalX, state.waterNormalY, state.waterNormalZ)
          .normalize();
        waterNormalArrow.setDirection(_normalDir);
      }
    },
    dispose: () => {
      waterNormalArrow.dispose();
      disposables.forEach((d) => d.dispose());
    },
  };
}

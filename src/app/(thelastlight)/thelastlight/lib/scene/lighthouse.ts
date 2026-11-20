import * as THREE from 'three';
import {
  COTTAGE_POS,
  COTTAGE_ROTATION_Y,
  islandHeightAt,
  LIGHTHOUSE_POS,
  sampleBluffStaircase,
  sampleConnectingWalkway,
} from '../sim/island';
import { ProceduralTextureSet } from './textures';
import { createBeaconBeamMaterial } from './shaders';

export interface LighthouseRig {
  group: THREE.Group;
  lighthouseGroup: THREE.Group;
  keeperCottageGroup: THREE.Group;
  walkwayGroup: THREE.Group;
  beaconPivot: THREE.Group;
  beaconSpotLight: THREE.SpotLight;
  beaconPointLight: THREE.PointLight;
  beaconBeamPrimary: THREE.Mesh;
  beaconBeamSecondary: THREE.Mesh;
  beaconBeamOuterMat: THREE.ShaderMaterial;
  beaconBeamCoreMat: THREE.ShaderMaterial;
  lampCoreMat: THREE.MeshStandardMaterial;
  windowGlowMat: THREE.MeshStandardMaterial;
  porchLight: THREE.PointLight;
  interiorLight: THREE.PointLight;
  doorPivot: THREE.Group;
  towerDoorPivot: THREE.Group;
  cutawayWall: THREE.Mesh;
  interiorGroup: THREE.Group;
  beaconOriginWorld: THREE.Vector3;
  update: (params: {
    dt: number;
    time: number;
    beaconEnabled: boolean;
    beaconSpeed: number;
    beamIntensity: number;
    beamSoftness: number;
    beamRange: number;
    beaconProminence: number;
    fogDensity: number;
    rainIntensity: number;
    interiorLights: boolean;
    windowGlowFactor: number;
    doorOpen: boolean;
    cutaway: boolean;
    showBuildingBounds: boolean;
    showFoundations: boolean;
    showWalkwayGuides: boolean;
  }) => { beaconDir: THREE.Vector3; beaconAngle: number };
  dispose: () => void;
}

/**
 * Builds the architecturally separated LighthouseGroup and KeeperCottageGroup,
 * a grounded curved stone connecting walkway + bluff staircase (WalkwayGroup),
 * rotating Fresnel beacon with soft dual-layer volumetric scattering beam,
 * cutaway internal spiral staircase, interactive hinged doors, and toggleable
 * architectural diagnostic overlays (Box3 bounds, foundation pads, walkway guides).
 */
export function buildLighthouse(
  textures: ProceduralTextureSet,
  isSoftwareGl: boolean
): LighthouseRig {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    disposables.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    disposables.push(m);
    return m;
  };

  // =========================================================================
  // CALIBRATED PBR MATERIALS (Distinct material palettes for Tower vs Cottage)
  // =========================================================================
  const towerMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.towerColor,
      bumpMap: textures.towerBump,
      bumpScale: 0.18,
      roughness: 0.89,
      metalness: 0.03,
    })
  );

  const cutawayWallMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.towerColor,
      bumpMap: textures.towerBump,
      bumpScale: 0.18,
      roughness: 0.89,
      metalness: 0.03,
      transparent: true,
      opacity: 1.0,
    })
  );

  // Pale coastal granite for lighthouse plinth, quoins, window sills & walkway slabs
  const stoneMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.stoneColor,
      bumpMap: textures.stoneBump,
      bumpScale: 0.22,
      roughness: 0.9,
      metalness: 0.04,
    })
  );

  // Distinct dark coastal fieldstone masonry specifically for KeeperCottageGroup
  const cottageStoneMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xeae6e0,
      map: textures.cottageStoneColor,
      bumpMap: textures.cottageStoneBump,
      bumpScale: 0.26,
      roughness: 0.92,
      metalness: 0.04,
    })
  );

  const innerStoneMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x9b9284,
      map: textures.stoneColor,
      bumpMap: textures.stoneBump,
      bumpScale: 0.12,
      roughness: 0.92,
      metalness: 0.02,
      side: THREE.DoubleSide,
    })
  );

  const roofMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.roofColor,
      bumpMap: textures.roofBump,
      bumpScale: 0.16,
      roughness: 0.85,
      metalness: 0.05,
    })
  );

  const woodMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.woodColor,
      bumpMap: textures.woodBump,
      bumpScale: 0.11,
      roughness: 0.78,
      metalness: 0.04,
    })
  );

  const darkTrimWoodMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x3b2d22,
      map: textures.woodColor,
      roughness: 0.72,
      metalness: 0.05,
    })
  );

  const ironMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x24272c,
      roughness: 0.44,
      metalness: 0.80,
    })
  );

  const bronzeMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x544130,
      roughness: 0.36,
      metalness: 0.76,
    })
  );

  const brassMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xd4a44a,
      roughness: 0.22,
      metalness: 0.90,
    })
  );

  const glassHousingMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xdcebf2,
      roughness: 0.12,
      metalness: 0.06,
      transparent: true,
      opacity: isSoftwareGl ? 0.26 : 0.3,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );

  const windowGlowMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffe4a8,
      emissive: new THREE.Color(0xff9b32),
      emissiveIntensity: 2.1,
      roughness: 0.2,
      metalness: 0.05,
    })
  );

  const lampCoreMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xfff8dc,
      emissive: new THREE.Color(0xffc254),
      emissiveIntensity: 4.5,
      roughness: 0.1,
      metalness: 0.0,
    })
  );

  const doorRecessMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x1d130a,
      emissive: new THREE.Color(0x884411),
      emissiveIntensity: 0.45,
      roughness: 0.9,
    })
  );

  // =========================================================================
  // 1. INDEPENDENT LIGHTHOUSE GROUP (LighthouseGroup at LIGHTHOUSE_POS)
  // =========================================================================
  const lighthouseGroup = new THREE.Group();
  lighthouseGroup.name = 'LighthouseGroup';
  lighthouseGroup.position.set(LIGHTHOUSE_POS.x, LIGHTHOUSE_POS.y, LIGHTHOUSE_POS.z);
  group.add(lighthouseGroup);

  // Separate static architectural sub-group so Box3 bounds measure actual tower geometry (excluding 96m beam cone!)
  const lighthouseStructureGroup = new THREE.Group();
  lighthouseStructureGroup.name = 'LighthouseStructure';
  lighthouseGroup.add(lighthouseStructureGroup);

  // Stepped circular granite plinth extending deeply into Lighthouse pad (zero floating)
  const plinthBottom = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(3.12, 3.55, 2.8, 28)),
    stoneMat
  );
  plinthBottom.position.y = -0.7;
  plinthBottom.castShadow = true;
  plinthBottom.receiveShadow = true;
  lighthouseStructureGroup.add(plinthBottom);

  const plinthMid = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(2.8, 3.06, 1.15, 28)),
    stoneMat
  );
  plinthMid.position.y = 1.25;
  plinthMid.castShadow = true;
  plinthMid.receiveShadow = true;
  lighthouseStructureGroup.add(plinthMid);

  const plinthCap = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(2.78, 0.14, 10, 28)),
    stoneMat
  );
  plinthCap.rotation.x = Math.PI / 2;
  plinthCap.position.y = 1.85;
  lighthouseStructureGroup.add(plinthCap);

  // Main tapered masonry tower (250° permanent shell + 110° cutaway reveal panel)
  const towerHeight = 10.6;
  const towerBaseY = 1.8;
  const rBottom = 2.48;
  const rTop = 1.84;

  const cutStart = Math.PI * 1.12;
  const cutSweep = Math.PI * 0.62;
  const mainShellGeo = trackGeo(
    new THREE.CylinderGeometry(
      rTop,
      rBottom,
      towerHeight,
      36,
      4,
      false,
      cutStart + cutSweep,
      Math.PI * 2 - cutSweep
    )
  );
  const mainShell = new THREE.Mesh(mainShellGeo, towerMat);
  mainShell.position.y = towerBaseY + towerHeight * 0.5;
  mainShell.castShadow = true;
  mainShell.receiveShadow = true;
  lighthouseStructureGroup.add(mainShell);

  const cutawayGeo = trackGeo(
    new THREE.CylinderGeometry(
      rTop + 0.004,
      rBottom + 0.004,
      towerHeight,
      18,
      4,
      false,
      cutStart,
      cutSweep
    )
  );
  const cutawayWall = new THREE.Mesh(cutawayGeo, cutawayWallMat);
  cutawayWall.position.y = towerBaseY + towerHeight * 0.5;
  cutawayWall.castShadow = true;
  cutawayWall.receiveShadow = true;
  lighthouseStructureGroup.add(cutawayWall);

  // Architectural stone masonry belt courses around tower
  [5.1, 8.3, 11.7].forEach((bh) => {
    const t = (bh - towerBaseY) / towerHeight;
    const rad = rBottom + (rTop - rBottom) * t + 0.04;
    const belt = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(rad, 0.08, 8, 32)),
      stoneMat
    );
    belt.rotation.x = Math.PI / 2;
    belt.position.y = bh;
    lighthouseStructureGroup.add(belt);
  });

  // Lighthouse base entrance vestibule & hinged wooden door facing the connecting walkway (+X, +Z)
  const towerEntryGroup = new THREE.Group();
  const entryAngle = 0.52; // faces east-southeast directly onto walkway start (12.6, -0.7)
  towerEntryGroup.position.set(
    Math.cos(entryAngle) * 2.72,
    0.1,
    Math.sin(entryAngle) * 2.72
  );
  towerEntryGroup.rotation.y = Math.PI / 2 - entryAngle;
  lighthouseStructureGroup.add(towerEntryGroup);

  const towerEntrySurround = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(1.58, 2.38, 0.85)),
    stoneMat
  );
  towerEntrySurround.position.set(0, 1.15, -0.1);
  towerEntrySurround.castShadow = true;
  towerEntrySurround.receiveShadow = true;
  towerEntryGroup.add(towerEntrySurround);

  const towerEntryStep = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(1.78, 0.34, 0.92)),
    stoneMat
  );
  towerEntryStep.position.set(0, 0.05, 0.32);
  towerEntryGroup.add(towerEntryStep);

  const towerDoorRecess = new THREE.Mesh(
    trackGeo(new THREE.PlaneGeometry(0.98, 1.9)),
    doorRecessMat
  );
  towerDoorRecess.position.set(0, 1.12, 0.335);
  towerEntryGroup.add(towerDoorRecess);

  const towerDoorPivot = new THREE.Group();
  towerDoorPivot.position.set(-0.48, 0.18, 0.35);
  towerEntryGroup.add(towerDoorPivot);

  const towerDoorLeaf = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(0.96, 1.88, 0.09)),
    woodMat
  );
  towerDoorLeaf.position.set(0.48, 0.94, 0);
  towerDoorLeaf.castShadow = true;
  towerDoorPivot.add(towerDoorLeaf);

  // Recessed arched windows with frames, sills, mullions, and warm interior glow
  const makeArchedWindow = (
    w: number,
    h: number,
    frameMaterial: THREE.Material
  ): THREE.Group => {
    const win = new THREE.Group();
    const frame = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(w + 0.24, h + 0.24, 0.28)),
      frameMaterial
    );
    win.add(frame);

    const sill = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(w + 0.34, 0.12, 0.38)),
      stoneMat
    );
    sill.position.set(0, -h * 0.5 - 0.1, 0.06);
    win.add(sill);

    const glass = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(w - 0.04, h - 0.04)),
      windowGlowMat
    );
    glass.position.z = 0.145;
    win.add(glass);

    const vBar = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.055, h, 0.04)),
      ironMat
    );
    vBar.position.z = 0.16;
    win.add(vBar);

    const hBar = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(w, 0.055, 0.04)),
      ironMat
    );
    hBar.position.set(0, 0.05, 0.16);
    win.add(hBar);

    return win;
  };

  [
    { y: 5.8, angle: Math.PI * 0.84, w: 0.72, h: 1.15 },
    { y: 9.4, angle: Math.PI * 0.72, w: 0.66, h: 1.05 },
    { y: 7.5, angle: Math.PI * 1.48, w: 0.68, h: 1.08 },
    { y: 10.6, angle: Math.PI * 0.15, w: 0.64, h: 1.0 },
  ].forEach((tw) => {
    const t = (tw.y - towerBaseY) / towerHeight;
    const rad = rBottom + (rTop - rBottom) * t - 0.02;
    const win = makeArchedWindow(tw.w, tw.h, stoneMat);
    win.position.set(Math.sin(tw.angle) * rad, tw.y, Math.cos(tw.angle) * rad);
    win.rotation.y = tw.angle;
    lighthouseStructureGroup.add(win);
  });

  // =========================================================================
  // 2. INTERNAL SPIRAL STAIRCASE (Revealed in Cutaway Mode)
  // =========================================================================
  const interiorGroup = new THREE.Group();
  lighthouseStructureGroup.add(interiorGroup);

  const innerWall = new THREE.Mesh(
    trackGeo(
      new THREE.CylinderGeometry(
        rTop - 0.28,
        rBottom - 0.3,
        towerHeight - 0.2,
        28,
        1,
        true,
        cutStart + cutSweep,
        Math.PI * 2 - cutSweep
      )
    ),
    innerStoneMat
  );
  innerWall.position.y = towerBaseY + towerHeight * 0.5;
  interiorGroup.add(innerWall);

  const newelPost = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.24, 0.28, towerHeight + 0.6, 16)),
    ironMat
  );
  newelPost.position.y = towerBaseY + towerHeight * 0.5;
  interiorGroup.add(newelPost);

  const stepCount = 42;
  const stepGeo = trackGeo(new THREE.BoxGeometry(1.42, 0.11, 0.44));
  const stepMesh = new THREE.InstancedMesh(stepGeo, stoneMat, stepCount);
  const balusterGeo = trackGeo(new THREE.CylinderGeometry(0.025, 0.025, 0.85, 6));
  const balusterMesh = new THREE.InstancedMesh(balusterGeo, ironMat, stepCount);
  const dummy = new THREE.Object3D();
  const handrailPoints: THREE.Vector3[] = [];

  for (let i = 0; i < stepCount; i++) {
    const frac = i / (stepCount - 1);
    const y = towerBaseY + 0.35 + frac * (towerHeight - 0.8);
    const angle = frac * Math.PI * 4.5 + 0.4;
    const innerR = 0.9 - frac * 0.15;

    dummy.position.set(Math.cos(angle) * innerR, y, Math.sin(angle) * innerR);
    dummy.rotation.set(0, -angle, 0);
    dummy.scale.set(1 - frac * 0.18, 1, 1);
    dummy.updateMatrix();
    stepMesh.setMatrixAt(i, dummy.matrix);

    const railR = innerR + 0.55 * (1 - frac * 0.18);
    dummy.position.set(Math.cos(angle) * railR, y + 0.44, Math.sin(angle) * railR);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    balusterMesh.setMatrixAt(i, dummy.matrix);

    handrailPoints.push(
      new THREE.Vector3(Math.cos(angle) * railR, y + 0.85, Math.sin(angle) * railR)
    );
  }
  stepMesh.instanceMatrix.needsUpdate = true;
  balusterMesh.instanceMatrix.needsUpdate = true;
  interiorGroup.add(stepMesh, balusterMesh);

  const railCurve = new THREE.CatmullRomCurve3(handrailPoints);
  const spiralRail = new THREE.Mesh(
    trackGeo(new THREE.TubeGeometry(railCurve, 72, 0.04, 8, false)),
    brassMat
  );
  interiorGroup.add(spiralRail);

  [towerBaseY + 0.1, towerBaseY + 5.3, towerBaseY + towerHeight - 0.1].forEach(
    (ly, idx) => {
      const lr = idx === 0 ? 2.12 : idx === 1 ? 1.88 : 1.66;
      const landing = new THREE.Mesh(
        trackGeo(new THREE.CylinderGeometry(lr, lr, 0.18, 24)),
        stoneMat
      );
      landing.position.y = ly;
      interiorGroup.add(landing);
    }
  );

  const interiorLight = new THREE.PointLight(0xffa042, 4.2, 11, 1.8);
  interiorLight.position.set(-0.5, towerBaseY + 5.5, 0.5);
  interiorGroup.add(interiorLight);

  // =========================================================================
  // 3. GALLERY DECK, CORBELS, RAILINGS, LANTERN ROOM & CUPOLA ROOF
  // =========================================================================
  const galleryY = towerBaseY + towerHeight; // 12.4 local (20.6 world)

  const corbelCrown = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(2.58, 1.9, 0.72, 24)),
    stoneMat
  );
  corbelCrown.position.y = galleryY - 0.18;
  corbelCrown.castShadow = true;
  lighthouseStructureGroup.add(corbelCrown);

  const bracketGeo = trackGeo(new THREE.BoxGeometry(0.16, 0.58, 0.52));
  const brackets = new THREE.InstancedMesh(bracketGeo, ironMat, 16);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * 2.14, galleryY - 0.32, Math.sin(a) * 2.14);
    dummy.rotation.set(0, -a + Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    brackets.setMatrixAt(i, dummy.matrix);
  }
  brackets.instanceMatrix.needsUpdate = true;
  lighthouseStructureGroup.add(brackets);

  const galleryDeck = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(2.68, 2.62, 0.24, 32)),
    ironMat
  );
  galleryDeck.position.y = galleryY + 0.24;
  galleryDeck.castShadow = true;
  galleryDeck.receiveShadow = true;
  lighthouseStructureGroup.add(galleryDeck);

  const railPostCount = 32;
  const railPostGeo = trackGeo(new THREE.CylinderGeometry(0.032, 0.035, 1.05, 6));
  const railPosts = new THREE.InstancedMesh(railPostGeo, ironMat, railPostCount);
  for (let i = 0; i < railPostCount; i++) {
    const a = (i / railPostCount) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * 2.58, galleryY + 0.85, Math.sin(a) * 2.58);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    railPosts.setMatrixAt(i, dummy.matrix);
  }
  railPosts.instanceMatrix.needsUpdate = true;
  lighthouseStructureGroup.add(railPosts);

  [galleryY + 1.36, galleryY + 0.88].forEach((ry) => {
    const ring = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(2.58, 0.042, 8, 36)),
      ironMat
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = ry;
    lighthouseStructureGroup.add(ring);
  });

  const watchWall = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(1.76, 1.82, 1.05, 24)),
    ironMat
  );
  watchWall.position.y = galleryY + 0.85;
  watchWall.castShadow = true;
  lighthouseStructureGroup.add(watchWall);

  const lanternCenterY = galleryY + 2.45; // 14.85 local (23.05 world)
  const lanternGlass = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(1.66, 1.66, 2.25, 12, 1, true)),
    glassHousingMat
  );
  lanternGlass.position.y = lanternCenterY;
  lanternGlass.renderOrder = 6;
  lighthouseStructureGroup.add(lanternGlass);

  const mullionGeo = trackGeo(new THREE.CylinderGeometry(0.042, 0.042, 2.35, 6));
  const mullions = new THREE.InstancedMesh(mullionGeo, ironMat, 12);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * 1.68, lanternCenterY, Math.sin(a) * 1.68);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    mullions.setMatrixAt(i, dummy.matrix);
  }
  mullions.instanceMatrix.needsUpdate = true;
  lighthouseStructureGroup.add(mullions);

  [lanternCenterY, lanternCenterY + 1.12].forEach((gy, idx) => {
    const gRing = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(1.69, idx === 1 ? 0.1 : 0.035, 8, 24)),
      ironMat
    );
    gRing.rotation.x = Math.PI / 2;
    gRing.position.y = gy;
    lighthouseStructureGroup.add(gRing);
  });

  const domePoints = [
    new THREE.Vector2(1.92, 0.0),
    new THREE.Vector2(1.88, 0.18),
    new THREE.Vector2(1.62, 0.55),
    new THREE.Vector2(1.22, 1.1),
    new THREE.Vector2(0.72, 1.55),
    new THREE.Vector2(0.32, 1.82),
    new THREE.Vector2(0.22, 2.02),
    new THREE.Vector2(0.0, 2.1),
  ];
  const cupolaDome = new THREE.Mesh(
    trackGeo(new THREE.LatheGeometry(domePoints, 24)),
    bronzeMat
  );
  cupolaDome.position.y = lanternCenterY + 1.12;
  cupolaDome.castShadow = true;
  lighthouseStructureGroup.add(cupolaDome);

  const ventBall = new THREE.Mesh(
    trackGeo(new THREE.SphereGeometry(0.28, 16, 12)),
    brassMat
  );
  ventBall.position.y = lanternCenterY + 3.35;
  lighthouseStructureGroup.add(ventBall);

  const lightningRod = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.018, 0.055, 2.15, 8)),
    ironMat
  );
  lightningRod.position.y = lanternCenterY + 4.45;
  lighthouseStructureGroup.add(lightningRod);

  // =========================================================================
  // 4. ROTATING FRESNEL BEACON & SOFT ATMOSPHERIC VOLUMETRIC BEAM
  // =========================================================================
  const beaconPivot = new THREE.Group();
  beaconPivot.name = 'BeaconPivot';
  beaconPivot.position.y = lanternCenterY;
  // Initial angle sweeps gracefully toward the left-front cove (-X)
  beaconPivot.rotation.y = Math.PI * 0.96;
  lighthouseGroup.add(beaconPivot);

  const lampPedestal = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.55, 0.72, 0.75, 16)),
    brassMat
  );
  lampPedestal.position.y = -0.78;
  beaconPivot.add(lampPedestal);

  const lampCore = new THREE.Mesh(
    trackGeo(new THREE.SphereGeometry(0.52, 18, 14)),
    lampCoreMat
  );
  beaconPivot.add(lampCore);

  const bullseyeGroup = new THREE.Group();
  bullseyeGroup.position.x = 0.72;
  bullseyeGroup.rotation.z = Math.PI / 2;
  beaconPivot.add(bullseyeGroup);

  [0.24, 0.44, 0.64].forEach((r, idx) => {
    const ring = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(r, 0.055 - idx * 0.008, 8, 24)),
      idx === 2 ? brassMat : glassHousingMat
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -idx * 0.05;
    bullseyeGroup.add(ring);
  });

  const rearLens = new THREE.Mesh(
    trackGeo(new THREE.CylinderGeometry(0.58, 0.58, 0.16, 18)),
    brassMat
  );
  rearLens.rotation.z = Math.PI / 2;
  rearLens.position.x = -0.68;
  beaconPivot.add(rearLens);

  // Dual soft volumetric cones: wide misty atmospheric scatter halo + luminous central core
  const beaconBeamOuterMat = trackMat(createBeaconBeamMaterial(false));
  const beaconBeamCoreMat = trackMat(createBeaconBeamMaterial(true));
  const baseBeamLen = 96;

  const outerConeGeo = trackGeo(
    new THREE.CylinderGeometry(0.62, 14.5, baseBeamLen, 36, 1, true)
  );
  outerConeGeo.translate(0, -baseBeamLen * 0.5, 0);
  outerConeGeo.rotateZ(Math.PI * 0.5);

  const beaconBeamPrimary = new THREE.Mesh(outerConeGeo, beaconBeamOuterMat);
  beaconBeamPrimary.position.set(0.65, 0.0, 0);
  beaconBeamPrimary.rotation.z = -0.045;
  beaconBeamPrimary.renderOrder = 10;
  beaconBeamPrimary.frustumCulled = false;
  beaconPivot.add(beaconBeamPrimary);

  const coreConeGeo = trackGeo(
    new THREE.CylinderGeometry(0.32, 6.2, baseBeamLen * 0.88, 28, 1, true)
  );
  coreConeGeo.translate(0, -baseBeamLen * 0.44, 0);
  coreConeGeo.rotateZ(Math.PI * 0.5);

  const beaconBeamSecondary = new THREE.Mesh(coreConeGeo, beaconBeamCoreMat);
  beaconBeamSecondary.position.set(0.65, 0.0, 0);
  beaconBeamSecondary.rotation.z = -0.045;
  beaconBeamSecondary.renderOrder = 11;
  beaconBeamSecondary.frustumCulled = false;
  beaconPivot.add(beaconBeamSecondary);

  // Real directional SpotLight sweeping warm light across rocks, cottage walls, and sea spray
  const beaconSpotLight = new THREE.SpotLight(
    0xffca72,
    240,
    125,
    Math.PI * 0.16,
    0.78,
    1.18
  );
  beaconSpotLight.position.set(0.95, 0, 0);
  const spotTarget = new THREE.Object3D();
  spotTarget.position.set(55, -8.5, 0);
  beaconPivot.add(spotTarget);
  beaconSpotLight.target = spotTarget;
  beaconPivot.add(beaconSpotLight);

  const beaconPointLight = new THREE.PointLight(0xffb64e, 24, 22, 1.5);
  beaconPivot.add(beaconPointLight);

  // =========================================================================
  // 5. INDEPENDENT KEEPER'S COTTAGE GROUP (KeeperCottageGroup at COTTAGE_POS)
  // =========================================================================
  const keeperCottageGroup = new THREE.Group();
  keeperCottageGroup.name = 'KeeperCottageGroup';
  keeperCottageGroup.position.set(COTTAGE_POS.x, COTTAGE_POS.y, COTTAGE_POS.z);
  keeperCottageGroup.rotation.y = COTTAGE_ROTATION_Y;
  group.add(keeperCottageGroup);

  // Natural dressed stone foundation extending 2.6m into the Cottage pad (zero overhang/floating)
  const cotFoundation = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(6.8, 2.8, 5.2)),
    stoneMat
  );
  cotFoundation.position.y = -1.2;
  cotFoundation.receiveShadow = true;
  cotFoundation.castShadow = true;
  keeperCottageGroup.add(cotFoundation);

  // Main dark coastal fieldstone cottage walls (architecturally distinct from lighthouse plaster!)
  const cotWalls = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(6.3, 3.6, 4.6)),
    cottageStoneMat
  );
  cotWalls.position.y = 1.9;
  cotWalls.castShadow = true;
  cotWalls.receiveShadow = true;
  keeperCottageGroup.add(cotWalls);

  // Dressed corner quoins framing the dark stone cottage
  const quoinGeo = trackGeo(new THREE.BoxGeometry(0.32, 3.62, 0.32));
  [
    [-3.12, -2.28],
    [3.12, -2.28],
    [3.12, 2.28],
    [-3.12, 2.28],
  ].forEach(([qx, qz]) => {
    const quoin = new THREE.Mesh(quoinGeo, stoneMat);
    quoin.position.set(qx, 1.9, qz);
    keeperCottageGroup.add(quoin);
  });

  // Extruded pitched gable walls
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-2.5, 0);
  gableShape.lineTo(2.5, 0);
  gableShape.lineTo(0, 2.25);
  gableShape.closePath();

  const gableGeo = trackGeo(
    new THREE.ExtrudeGeometry(gableShape, { depth: 6.26, bevelEnabled: false })
  );
  gableGeo.rotateY(Math.PI / 2);
  gableGeo.translate(-3.13, 3.65, 0);
  const gableMesh = new THREE.Mesh(gableGeo, cottageStoneMat);
  gableMesh.castShadow = true;
  gableMesh.receiveShadow = true;
  keeperCottageGroup.add(gableMesh);

  // Overhanging pitched terracotta-slate shingled roof planes + wooden bargeboards
  const roofSlopeGeo = trackGeo(new THREE.BoxGeometry(7.05, 0.22, 3.65));
  const roofFront = new THREE.Mesh(roofSlopeGeo, roofMat);
  roofFront.position.set(0, 4.74, 1.36);
  roofFront.rotation.x = 0.72;
  roofFront.castShadow = true;
  roofFront.receiveShadow = true;
  keeperCottageGroup.add(roofFront);

  const roofBack = new THREE.Mesh(roofSlopeGeo, roofMat);
  roofBack.position.set(0, 4.74, -1.36);
  roofBack.rotation.x = -0.72;
  roofBack.castShadow = true;
  roofBack.receiveShadow = true;
  keeperCottageGroup.add(roofBack);

  const ridge = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(7.12, 0.24, 0.28)),
    stoneMat
  );
  ridge.position.set(0, 5.96, 0);
  keeperCottageGroup.add(ridge);

  // Stone chimney & crown
  const chimney = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(0.92, 2.65, 0.92)),
    cottageStoneMat
  );
  chimney.position.set(1.85, 5.9, -0.9);
  chimney.castShadow = true;
  keeperCottageGroup.add(chimney);

  const chimneyCap = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(1.14, 0.18, 1.14)),
    stoneMat
  );
  chimneyCap.position.set(1.85, 7.24, -0.9);
  keeperCottageGroup.add(chimneyCap);

  // Front entrance porch projecting toward the connecting walkway landing
  const porchFoundation = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(2.75, 2.4, 2.15)),
    stoneMat
  );
  porchFoundation.position.set(-1.3, -1.0, 2.85);
  keeperCottageGroup.add(porchFoundation);

  const porchBody = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(2.52, 3.25, 1.85)),
    cottageStoneMat
  );
  porchBody.position.set(-1.3, 1.72, 2.85);
  porchBody.castShadow = true;
  porchBody.receiveShadow = true;
  keeperCottageGroup.add(porchBody);

  const porchRoofGeo = trackGeo(new THREE.BoxGeometry(1.82, 0.18, 2.25));
  const porchRoofL = new THREE.Mesh(porchRoofGeo, roofMat);
  porchRoofL.position.set(-2.0, 3.72, 2.95);
  porchRoofL.rotation.z = 0.62;
  keeperCottageGroup.add(porchRoofL);

  const porchRoofR = new THREE.Mesh(porchRoofGeo, roofMat);
  porchRoofR.position.set(-0.6, 3.72, 2.95);
  porchRoofR.rotation.z = -0.62;
  keeperCottageGroup.add(porchRoofR);

  // Recessed interior doorway & wooden surround
  const doorRecess = new THREE.Mesh(
    trackGeo(new THREE.PlaneGeometry(1.14, 2.02)),
    doorRecessMat
  );
  doorRecess.position.set(-1.3, 1.15, 3.79);
  keeperCottageGroup.add(doorRecess);

  const jambGeo = trackGeo(new THREE.BoxGeometry(0.18, 2.15, 0.24));
  const jambL = new THREE.Mesh(jambGeo, darkTrimWoodMat);
  jambL.position.set(-1.93, 1.18, 3.82);
  keeperCottageGroup.add(jambL);

  const jambR = new THREE.Mesh(jambGeo, darkTrimWoodMat);
  jambR.position.set(-0.67, 1.18, 3.82);
  keeperCottageGroup.add(jambR);

  const lintel = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(1.56, 0.24, 0.28)),
    stoneMat
  );
  lintel.position.set(-1.3, 2.3, 3.83);
  keeperCottageGroup.add(lintel);

  // INTERACTIVE HINGED WOODEN ENTRANCE DOOR (left-hinge axis at x = -1.85)
  const doorPivot = new THREE.Group();
  doorPivot.position.set(-1.85, 0.14, 3.83);
  keeperCottageGroup.add(doorPivot);

  const doorLeaf = new THREE.Mesh(
    trackGeo(new THREE.BoxGeometry(1.1, 2.02, 0.11)),
    woodMat
  );
  doorLeaf.position.set(0.55, 1.01, 0);
  doorLeaf.castShadow = true;
  doorPivot.add(doorLeaf);

  const doorHandle = new THREE.Mesh(
    trackGeo(new THREE.SphereGeometry(0.065, 10, 8)),
    brassMat
  );
  doorHandle.position.set(0.95, 0.96, 0.08);
  doorPivot.add(doorHandle);

  [0.42, 1.56].forEach((hy) => {
    const strap = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.45, 0.07, 0.14)),
      ironMat
    );
    strap.position.set(0.24, hy, 0);
    doorPivot.add(strap);
  });

  // Hanging brass porch lantern & warm point light
  const porchLanternBulb = new THREE.Mesh(
    trackGeo(new THREE.SphereGeometry(0.14, 10, 8)),
    windowGlowMat
  );
  porchLanternBulb.position.set(-1.3, 2.68, 4.02);
  keeperCottageGroup.add(porchLanternBulb);

  const porchLight = new THREE.PointLight(0xffa43c, 7.5, 13, 1.65);
  porchLight.position.set(-1.3, 2.62, 4.25);
  keeperCottageGroup.add(porchLight);

  // Warm wooden-framed mullioned cottage windows (front, west side facing walkway, & east side)
  const cotWin1 = makeArchedWindow(0.88, 1.05, darkTrimWoodMat);
  cotWin1.position.set(1.05, 1.9, 2.28);
  keeperCottageGroup.add(cotWin1);

  const cotWin2 = makeArchedWindow(0.88, 1.05, darkTrimWoodMat);
  cotWin2.position.set(2.32, 1.9, 2.28);
  keeperCottageGroup.add(cotWin2);

  // West cottage window visibly facing across the open walkway toward the lighthouse!
  const cotWinWest = makeArchedWindow(0.84, 1.0, darkTrimWoodMat);
  cotWinWest.position.set(-3.14, 1.9, -0.35);
  cotWinWest.rotation.y = -Math.PI / 2;
  keeperCottageGroup.add(cotWinWest);

  const cotWinEast = makeArchedWindow(0.84, 1.0, darkTrimWoodMat);
  cotWinEast.position.set(3.14, 1.9, 0.25);
  cotWinEast.rotation.y = Math.PI / 2;
  keeperCottageGroup.add(cotWinEast);

  // =========================================================================
  // 6. GROUNDED STONE CONNECTING WALKWAY & WINDING BLUFF STAIRCASE (WalkwayGroup)
  // =========================================================================
  const walkwayGroup = new THREE.Group();
  walkwayGroup.name = 'WalkwayGroup';
  group.add(walkwayGroup);

  const ropeMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x9b8662,
      roughness: 0.95,
      metalness: 0.0,
    })
  );

  // 6A. Curved stone paved walkway connecting Lighthouse entrance -> Cottage front porch
  const connectStepCount = 12;
  const paverGeo = trackGeo(new THREE.BoxGeometry(1.85, 0.36, 0.68));
  const connectPavers = new THREE.InstancedMesh(paverGeo, stoneMat, connectStepCount);
  connectPavers.castShadow = true;
  connectPavers.receiveShadow = true;

  // Low retaining curb stones along the outer seaward edge of the connecting walkway
  const curbGeo = trackGeo(new THREE.BoxGeometry(0.32, 0.56, 0.66));
  const connectCurbs = new THREE.InstancedMesh(curbGeo, stoneMat, connectStepCount);
  connectCurbs.castShadow = true;
  connectCurbs.receiveShadow = true;

  const postGeo = trackGeo(new THREE.CylinderGeometry(0.062, 0.078, 1.12, 7));
  const connectPostPositions: THREE.Vector3[] = [];
  const connectRopePts: THREE.Vector3[] = [];
  const walkwayGuidePoints: THREE.Vector3[] = [];

  for (let i = 0; i < connectStepCount; i++) {
    const t = i / (connectStepCount - 1);
    const pt = sampleConnectingWalkway(t);
    const groundY = islandHeightAt(pt.x, pt.z);
    // Anchor every paving slab tightly onto the terrain (extending 0.18m below surface so zero floating)
    const y = groundY + 0.03;
    const yaw = Math.atan2(pt.tangentX, pt.tangentZ);

    dummy.position.set(pt.x, y - 0.12, pt.z);
    dummy.rotation.set(0, yaw, 0);
    dummy.scale.set(1.0 + (i % 2 === 0 ? 0.05 : -0.04), 1, 1);
    dummy.updateMatrix();
    connectPavers.setMatrixAt(i, dummy.matrix);

    // Seaward (+Z / -X) low retaining border stone
    const perpX = -pt.tangentZ;
    const perpZ = pt.tangentX;
    const cx = pt.x + perpX * 1.05;
    const cz = pt.z + perpZ * 1.05;
    const cy = islandHeightAt(cx, cz);
    dummy.position.set(cx, cy + 0.02, cz);
    dummy.rotation.set(0, yaw, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    connectCurbs.setMatrixAt(i, dummy.matrix);

    walkwayGuidePoints.push(new THREE.Vector3(pt.x, y + 0.22, pt.z));

    if (i % 3 === 0 || i === connectStepCount - 1) {
      const px = pt.x + perpX * 1.15;
      const pz = pt.z + perpZ * 1.15;
      const py = islandHeightAt(px, pz) + 0.5;
      connectPostPositions.push(new THREE.Vector3(px, py, pz));
      connectRopePts.push(new THREE.Vector3(px, py + 0.4, pz));
    }
  }
  connectPavers.instanceMatrix.needsUpdate = true;
  connectCurbs.instanceMatrix.needsUpdate = true;
  walkwayGroup.add(connectPavers, connectCurbs);

  const connectPosts = new THREE.InstancedMesh(postGeo, woodMat, connectPostPositions.length);
  connectPostPositions.forEach((p, idx) => {
    dummy.position.copy(p);
    dummy.rotation.set(0.03 * (idx % 2 === 0 ? 1 : -1), 0, 0.02);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    connectPosts.setMatrixAt(idx, dummy.matrix);
  });
  connectPosts.instanceMatrix.needsUpdate = true;
  walkwayGroup.add(connectPosts);

  if (connectRopePts.length >= 2) {
    const cCurve = new THREE.CatmullRomCurve3(connectRopePts);
    walkwayGroup.add(
      new THREE.Mesh(
        trackGeo(new THREE.TubeGeometry(cCurve, 28, 0.032, 6, false)),
        ropeMat
      )
    );
  }

  // 6B. Winding stone bluff staircase descending from walkway junction toward lower-right bluff
  const stairSteps = 18;
  const stepBlockGeo = trackGeo(new THREE.BoxGeometry(2.05, 0.42, 0.76));
  const stairMesh = new THREE.InstancedMesh(stepBlockGeo, stoneMat, stairSteps);
  stairMesh.castShadow = true;
  stairMesh.receiveShadow = true;

  const leftPostPoints: THREE.Vector3[] = [];
  const rightPostPoints: THREE.Vector3[] = [];
  const stairPostPositions: THREE.Vector3[] = [];
  const stairGuidePoints: THREE.Vector3[] = [];

  for (let i = 0; i < stairSteps; i++) {
    const t = i / (stairSteps - 1);
    const pt = sampleBluffStaircase(t);
    const nextPt = sampleBluffStaircase(Math.min(1, t + 0.06));
    const groundY = islandHeightAt(pt.x, pt.z);
    // Keep every step slab anchored into supporting ground with zero floating gap
    const y = groundY + 0.04;
    const yaw = Math.atan2(nextPt.x - pt.x, nextPt.z - pt.z);

    dummy.position.set(pt.x, y - 0.14, pt.z);
    dummy.rotation.set(0, yaw, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    stairMesh.setMatrixAt(i, dummy.matrix);

    stairGuidePoints.push(new THREE.Vector3(pt.x, y + 0.24, pt.z));

    if (i % 3 === 0 || i === stairSteps - 1) {
      const perpX = Math.cos(yaw) * 1.15;
      const perpZ = -Math.sin(yaw) * 1.15;
      const lx = pt.x - perpX;
      const lz = pt.z - perpZ;
      const rx = pt.x + perpX;
      const rz = pt.z + perpZ;
      const lp = new THREE.Vector3(lx, islandHeightAt(lx, lz) + 0.5, lz);
      const rp = new THREE.Vector3(rx, islandHeightAt(rx, rz) + 0.5, rz);
      stairPostPositions.push(lp, rp);
      leftPostPoints.push(new THREE.Vector3(lp.x, lp.y + 0.42, lp.z));
      rightPostPoints.push(new THREE.Vector3(rp.x, rp.y + 0.42, rp.z));
    }
  }
  stairMesh.instanceMatrix.needsUpdate = true;
  walkwayGroup.add(stairMesh);

  const stairPosts = new THREE.InstancedMesh(postGeo, woodMat, stairPostPositions.length);
  stairPostPositions.forEach((p, idx) => {
    dummy.position.copy(p);
    dummy.rotation.set((idx % 2 === 0 ? 1 : -1) * 0.04, 0, 0.03);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    stairPosts.setMatrixAt(idx, dummy.matrix);
  });
  stairPosts.instanceMatrix.needsUpdate = true;
  walkwayGroup.add(stairPosts);

  [leftPostPoints, rightPostPoints].forEach((pts) => {
    if (pts.length >= 2) {
      const curve = new THREE.CatmullRomCurve3(pts);
      walkwayGroup.add(
        new THREE.Mesh(
          trackGeo(new THREE.TubeGeometry(curve, 36, 0.032, 6, false)),
          ropeMat
        )
      );
    }
  });

  // =========================================================================
  // 7. ARCHITECTURAL DIAGNOSTIC VISUALIZERS (Bounds, Foundations, Walkways)
  // =========================================================================
  group.updateMatrixWorld(true);

  const boundsHelperGroup = new THREE.Group();
  boundsHelperGroup.visible = false;
  group.add(boundsHelperGroup);

  const lhBox = new THREE.Box3().setFromObject(lighthouseStructureGroup);
  const cotBox = new THREE.Box3().setFromObject(keeperCottageGroup);
  const lhBoxHelper = new THREE.Box3Helper(lhBox, new THREE.Color(0xfbbf24));
  const cotBoxHelper = new THREE.Box3Helper(cotBox, new THREE.Color(0x38bdf8));
  boundsHelperGroup.add(lhBoxHelper, cotBoxHelper);
  disposables.push(
    lhBoxHelper.geometry,
    lhBoxHelper.material as THREE.Material,
    cotBoxHelper.geometry,
    cotBoxHelper.material as THREE.Material
  );

  // Foundation footprint visualization (contact pads grounded on terrain)
  const foundationHelperGroup = new THREE.Group();
  foundationHelperGroup.visible = false;
  group.add(foundationHelperGroup);

  const foundLhMat = trackMat(
    new THREE.LineBasicMaterial({ color: 0xf59e0b })
  );
  const foundCotMat = trackMat(
    new THREE.LineBasicMaterial({ color: 0x22d3ee })
  );

  // Lighthouse circular foundation pad outline
  const lhRingPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const wx = LIGHTHOUSE_POS.x + Math.cos(a) * 3.6;
    const wz = LIGHTHOUSE_POS.z + Math.sin(a) * 3.6;
    lhRingPts.push(new THREE.Vector3(wx, islandHeightAt(wx, wz) + 0.18, wz));
  }
  foundationHelperGroup.add(
    new THREE.Line(
      trackGeo(new THREE.BufferGeometry().setFromPoints(lhRingPts)),
      foundLhMat
    )
  );

  // Cottage rotated foundation + porch footprint outline
  const cotLocalPerimeter: Array<[number, number]> = [
    [-3.45, -2.65],
    [3.45, -2.65],
    [3.45, 2.65],
    [0.05, 2.65],
    [0.05, 3.95],
    [-2.68, 3.95],
    [-2.68, 2.65],
    [-3.45, 2.65],
    [-3.45, -2.65],
  ];
  const cosC = Math.cos(COTTAGE_ROTATION_Y);
  const sinC = Math.sin(COTTAGE_ROTATION_Y);
  const cotRingPts = cotLocalPerimeter.map(([lx, lz]) => {
    const wx = COTTAGE_POS.x + lx * cosC + lz * sinC;
    const wz = COTTAGE_POS.z - lx * sinC + lz * cosC;
    return new THREE.Vector3(wx, islandHeightAt(wx, wz) + 0.18, wz);
  });
  foundationHelperGroup.add(
    new THREE.Line(
      trackGeo(new THREE.BufferGeometry().setFromPoints(cotRingPts)),
      foundCotMat
    )
  );

  // Walkway & staircase continuous path guide lines
  const walkwayGuideGroup = new THREE.Group();
  walkwayGuideGroup.visible = false;
  group.add(walkwayGuideGroup);

  const guideMat = trackMat(new THREE.LineBasicMaterial({ color: 0x34d399 }));
  walkwayGuideGroup.add(
    new THREE.Line(
      trackGeo(new THREE.BufferGeometry().setFromPoints(walkwayGuidePoints)),
      guideMat
    ),
    new THREE.Line(
      trackGeo(new THREE.BufferGeometry().setFromPoints(stairGuidePoints)),
      guideMat
    )
  );

  // Mutable animation state
  let currentDoorAngle = 0;
  let currentCutaway = 0;
  const beaconOriginWorld = new THREE.Vector3(
    LIGHTHOUSE_POS.x,
    LIGHTHOUSE_POS.y + lanternCenterY,
    LIGHTHOUSE_POS.z
  );
  const _beamDir = new THREE.Vector3(-1, 0, 0);

  return {
    group,
    lighthouseGroup,
    keeperCottageGroup,
    walkwayGroup,
    beaconPivot,
    beaconSpotLight,
    beaconPointLight,
    beaconBeamPrimary,
    beaconBeamSecondary,
    beaconBeamOuterMat,
    beaconBeamCoreMat,
    lampCoreMat,
    windowGlowMat,
    porchLight,
    interiorLight,
    doorPivot,
    towerDoorPivot,
    cutawayWall,
    interiorGroup,
    beaconOriginWorld,
    update: ({
      dt,
      time,
      beaconEnabled,
      beaconSpeed,
      beamIntensity,
      beamSoftness,
      beamRange,
      beaconProminence,
      fogDensity,
      rainIntensity,
      interiorLights,
      windowGlowFactor,
      doorOpen,
      cutaway,
      showBuildingBounds,
      showFoundations,
      showWalkwayGuides,
    }) => {
      if (beaconEnabled) {
        beaconPivot.rotation.y += beaconSpeed * dt;
      }

      const angle = beaconPivot.rotation.y;
      _beamDir.set(Math.cos(angle), -0.045, -Math.sin(angle)).normalize();

      const activeMul = beaconEnabled ? 1 : 0;
      const beamVis = beaconEnabled && beamIntensity > 0.04;
      beaconBeamPrimary.visible = beamVis;
      beaconBeamSecondary.visible = beamVis;

      // Scale physical beam cone length smoothly with beamRange control
      const rangeScale = Math.max(0.45, beamRange / baseBeamLen);
      const widthScale = 0.85 + beamSoftness * 0.35;
      beaconBeamPrimary.scale.set(rangeScale, widthScale, widthScale);
      beaconBeamSecondary.scale.set(rangeScale, 0.85 + beamSoftness * 0.2, 0.85 + beamSoftness * 0.2);

      for (const mat of [beaconBeamOuterMat, beaconBeamCoreMat]) {
        mat.uniforms.uTime.value = time;
        mat.uniforms.uIntensity.value = beamIntensity * activeMul;
        mat.uniforms.uSoftness.value = beamSoftness;
        mat.uniforms.uRange.value = beamRange;
        mat.uniforms.uProminence.value = beaconProminence;
        mat.uniforms.uFogDensity.value = fogDensity;
        mat.uniforms.uRainIntensity.value = rainIntensity;
        mat.uniforms.uBeamDir.value.copy(_beamDir);
      }

      beaconSpotLight.intensity = 220 * beamIntensity * activeMul;
      beaconSpotLight.distance = Math.max(60, beamRange * 1.25);
      beaconPointLight.intensity = 24 * beamIntensity * activeMul;
      lampCoreMat.emissiveIntensity = beaconEnabled
        ? 3.6 + beamIntensity * 1.35
        : 0.15;

      // Switchable warm interior & window lights
      const winGlow = interiorLights ? 0.6 + windowGlowFactor * 2.15 : 0.02;
      windowGlowMat.emissiveIntensity = winGlow;
      porchLight.intensity = interiorLights ? 3.5 + windowGlowFactor * 7.5 : 0;
      interiorLight.intensity = interiorLights ? 4.5 + currentCutaway * 12.0 : 0;

      // Smooth hinged entrance doors on BOTH cottage porch & lighthouse tower base
      const targetDoor = doorOpen ? -1.46 : 0;
      currentDoorAngle +=
        (targetDoor - currentDoorAngle) * (1 - Math.exp(-7.0 * dt));
      doorPivot.rotation.y = currentDoorAngle;
      towerDoorPivot.rotation.y = currentDoorAngle;

      // Clean cutaway reveal exposing internal 3D spiral staircase
      const targetCut = cutaway ? 1 : 0;
      currentCutaway += (targetCut - currentCutaway) * (1 - Math.exp(-7.5 * dt));
      cutawayWallMat.opacity = Math.max(0, 1 - currentCutaway * 1.45);
      cutawayWall.visible = currentCutaway < 0.68;

      // Architectural diagnostic overlays
      boundsHelperGroup.visible = showBuildingBounds;
      foundationHelperGroup.visible = showFoundations;
      walkwayGuideGroup.visible = showWalkwayGuides;

      return { beaconDir: _beamDir, beaconAngle: angle };
    },
    dispose: () => {
      disposables.forEach((d) => d.dispose());
    },
  };
}

import * as THREE from 'three';
import { CRATE_SPEC, type ProduceId } from './basketState';
import {
  createWoodPlankTexture,
  type AlphaMaskTexture,
  type AnnotationTextures,
  type ProduceTextureSet,
} from './artworkTextures';

const INK_HEX = 0x231b15;

export function createReliefCardGeometry(
  width: number,
  height: number,
  bulgeZ = 0.13,
  segs = 12
): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(width, height, segs, segs);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const nx = x / (width * 0.5);
    const ny = y / (height * 0.5);
    const dome =
      Math.cos(Math.min(1, Math.abs(nx)) * Math.PI * 0.5) *
      Math.cos(Math.min(1, Math.abs(ny)) * Math.PI * 0.5);
    pos.setZ(i, dome * bulgeZ);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function createSlattedPlankWithHandleGeometry(
  width: number,
  height: number,
  depth: number
): THREE.ExtrudeGeometry {
  const hw = width * 0.5;
  const hh = height * 0.5;

  const shape = new THREE.Shape();
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh);
  shape.lineTo(-hw, hh);
  shape.closePath();

  // Stadium / oval handle hole matching reference images
  const holeHalfSpan = width * 0.17;
  const holeRadius = height * 0.21;
  const hole = new THREE.Path();
  hole.absarc(holeHalfSpan, 0, holeRadius, -Math.PI * 0.5, Math.PI * 0.5, false);
  hole.absarc(-holeHalfSpan, 0, holeRadius, Math.PI * 0.5, Math.PI * 1.5, false);
  hole.closePath();
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: 20,
  });
  geo.translate(0, 0, -depth * 0.5);

  // Normalize UVs into [0..1] across plank width & height
  const uv = geo.attributes.uv;
  const pos = geo.attributes.position;
  for (let i = 0; i < uv.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    uv.setXY(i, (px + hw) / width, (py + hh) / height);
  }
  uv.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function addInkEdges(mesh: THREE.Mesh, thresholdAngle = 24) {
  const edgesGeo = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle);
  const lineMat = new THREE.LineBasicMaterial({
    color: INK_HEX,
    transparent: true,
    opacity: 0.92,
  });
  const lines = new THREE.LineSegments(edgesGeo, lineMat);
  mesh.add(lines);
}

export function buildWoodenCrateGroup(maxAnisotropy: number): THREE.Group {
  const crateGroup = new THREE.Group();
  crateGroup.position.set(
    CRATE_SPEC.center[0],
    CRATE_SPEC.center[1],
    CRATE_SPEC.center[2]
  );
  crateGroup.rotation.y = CRATE_SPEC.rotationY;

  const { lengthX, widthZ, heightY, plankThickness } = CRATE_SPEC;

  const texHoneyLeft = createWoodPlankTexture('honey-left', maxAnisotropy, true);
  const texAmberRight = createWoodPlankTexture('amber-right', maxAnisotropy, true);
  const texTanInner = createWoodPlankTexture('tan-inner', maxAnisotropy, false);
  const texEspresso = createWoodPlankTexture('espresso-dark', maxAnisotropy, false);
  const texPost = createWoodPlankTexture('post-ochre', maxAnisotropy, false);

  const matHoneyLeft = new THREE.MeshStandardMaterial({
    map: texHoneyLeft,
    color: 0xffffff,
    roughness: 0.85,
    metalness: 0.02,
  });
  const matAmberRight = new THREE.MeshStandardMaterial({
    map: texAmberRight,
    color: 0xffffff,
    roughness: 0.86,
    metalness: 0.02,
  });
  const matTanInner = new THREE.MeshStandardMaterial({
    map: texTanInner,
    color: 0xffffff,
    roughness: 0.86,
    metalness: 0.02,
  });
  const matEspresso = new THREE.MeshStandardMaterial({
    map: texEspresso,
    color: 0xffffff,
    roughness: 0.92,
    metalness: 0.01,
  });
  const matPost = new THREE.MeshStandardMaterial({
    map: texPost,
    color: 0xffffff,
    roughness: 0.88,
    metalness: 0.02,
  });

  // 1. Warm angled ground cast shadow extending right-back (matching reference image)
  const shadowShape = new THREE.Shape();
  shadowShape.moveTo(-lengthX * 0.45, -widthZ * 0.48);
  shadowShape.lineTo(lengthX * 0.52, -widthZ * 0.48);
  shadowShape.lineTo(lengthX * 0.78, widthZ * 0.34);
  shadowShape.lineTo(lengthX * 0.5, widthZ * 0.56);
  shadowShape.lineTo(-lengthX * 0.48, widthZ * 0.48);
  shadowShape.closePath();

  const shadowGeo = new THREE.ShapeGeometry(shadowShape);
  shadowGeo.rotateX(-Math.PI * 0.5);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0xdfd1b8,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(0.12, -heightY * 0.5 - 0.03, 0.08);
  crateGroup.add(shadowMesh);

  // 2. Dark roasted-espresso interior floor
  const floorGeo = new THREE.BoxGeometry(
    lengthX - plankThickness * 1.4,
    0.09,
    widthZ - plankThickness * 1.4
  );
  const floorMesh = new THREE.Mesh(floorGeo, matEspresso);
  floorMesh.position.set(0, -heightY * 0.5 + 0.05, 0);
  addInkEdges(floorMesh);
  crateGroup.add(floorMesh);

  // 3. Four vertical interior corner posts (prominent back corner post visible when empty)
  const postW = 0.21;
  const postGeo = new THREE.BoxGeometry(postW, heightY - 0.04, postW);
  const pxOff = lengthX * 0.5 - plankThickness - postW * 0.5 + 0.01;
  const pzOff = widthZ * 0.5 - plankThickness - postW * 0.5 + 0.01;
  const postCoords: Array<[number, number]> = [
    [pxOff, -pzOff], // Top-back corner B (clearly visible when empty)
    [-pxOff, -pzOff],
    [pxOff, pzOff],
    [-pxOff, pzOff],
  ];
  for (const [cx, cz] of postCoords) {
    const post = new THREE.Mesh(postGeo, matPost);
    post.position.set(cx, 0, cz);
    addInkEdges(post);
    crateGroup.add(post);
  }

  // 4. Three horizontal slats per wall
  const slatH = 0.495;
  const slatYs = [-0.555, 0, 0.555];

  const innerShortSpan = widthZ - plankThickness * 1.96;
  const longBoxGeo = new THREE.BoxGeometry(lengthX, slatH, plankThickness);
  const shortBoxGeo = new THREE.BoxGeometry(innerShortSpan, slatH, plankThickness);
  const handlePlankGeo = createSlattedPlankWithHandleGeometry(
    innerShortSpan,
    slatH,
    plankThickness
  );

  for (let s = 0; s < slatYs.length; s++) {
    const sy = slatYs[s];
    const isTop = s === 2;

    // Back-Left long wall (lz = -widthZ / 2): dark espresso interior face
    const backLeftSlat = new THREE.Mesh(longBoxGeo, [
      matPost,
      matPost,
      matPost,
      matEspresso,
      matEspresso, // +Z faces into crate interior toward camera
      matHoneyLeft,
    ]);
    backLeftSlat.position.set(0, sy, -widthZ * 0.5 + plankThickness * 0.5);
    addInkEdges(backLeftSlat);
    crateGroup.add(backLeftSlat);

    // Front-Right long wall (lz = +widthZ / 2): warm amber exterior face
    const frontRightSlat = new THREE.Mesh(longBoxGeo, [
      matAmberRight,
      matHoneyLeft,
      matPost,
      matEspresso,
      matAmberRight, // +Z faces front-right toward camera
      matEspresso,
    ]);
    frontRightSlat.position.set(0, sy, widthZ * 0.5 - plankThickness * 0.5);
    addInkEdges(frontRightSlat);
    crateGroup.add(frontRightSlat);

    // Back-Right short wall (lx = +lengthX / 2): has oval handle hole on top slat!
    const backRightSlat = new THREE.Mesh(
      isTop ? handlePlankGeo : shortBoxGeo,
      isTop
        ? [matTanInner, matPost]
        : [matPost, matPost, matPost, matEspresso, matTanInner, matTanInner]
    );
    backRightSlat.rotation.y = -Math.PI * 0.5;
    backRightSlat.position.set(lengthX * 0.5 - plankThickness * 0.5, sy, 0);
    addInkEdges(backRightSlat);
    crateGroup.add(backRightSlat);

    // Front-Left short wall (lx = -lengthX / 2): sunlit honey oak + oval handle hole on top slat!
    const frontLeftSlat = new THREE.Mesh(
      isTop ? handlePlankGeo : shortBoxGeo,
      isTop
        ? [matHoneyLeft, matPost]
        : [matPost, matPost, matPost, matEspresso, matHoneyLeft, matEspresso]
    );
    frontLeftSlat.rotation.y = -Math.PI * 0.5;
    frontLeftSlat.position.set(-lengthX * 0.5 + plankThickness * 0.5, sy, 0);
    addInkEdges(frontLeftSlat);
    crateGroup.add(frontLeftSlat);
  }

  return crateGroup;
}

export function buildAnnotationsGroup(textures: AnnotationTextures): THREE.Group {
  const group = new THREE.Group();

  const makePlane = (
    tex: THREE.CanvasTexture,
    w: number,
    h: number,
    pos: [number, number, number],
    rotZ = 0
  ) => {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.04,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.rotation.set(-0.22, 0, rotZ);
    return mesh;
  };

  // IN SEASON terracotta stamp (upper-left of crate)
  group.add(makePlane(textures.inSeasonBadge, 1.08, 0.68, [-1.48, 1.58, -0.55], -0.14));

  // LOCAL olive-sage stamp (just below IN SEASON)
  group.add(makePlane(textures.localBadge, 1.06, 0.53, [-1.64, 1.02, -0.25], 0.1));

  // 100% ORGANIC mustard stamp (upper-right of crate)
  group.add(makePlane(textures.organicBadge, 1.14, 0.72, [2.26, 1.48, -0.62], -0.15));

  // Left doodle arrows & SEASONAL MICRO (cleanly separated from LOCAL & tomatoes)
  group.add(makePlane(textures.leftDoodles, 2.7, 2.7, [-2.12, 0.24, 0.72], 0));

  // Right doodle burst lines, dashed arrow & arched SEASONAL
  group.add(makePlane(textures.rightDoodles, 2.55, 2.55, [1.84, 0.68, -0.05], 0));

  return group;
}

export interface ProduceMeshUserData {
  interactiveRole: 'source' | 'basket-instance';
  produceId: ProduceId;
  anchorId?: string;
  instanceId?: string;
  alphaMask?: AlphaMaskTexture;
}

export function buildProduceGroup(
  produceId: ProduceId,
  texSet: ProduceTextureSet,
  role: 'source' | 'basket-instance',
  options: {
    anchorId?: string;
    instanceId?: string;
    variant?: 'alt';
  } = {}
): {
  group: THREE.Group;
  hitMeshes: THREE.Mesh[];
  shadowMesh: THREE.Mesh | null;
} {
  const group = new THREE.Group();
  const hitMeshes: THREE.Mesh[] = [];

  const mainMask =
    role === 'source'
      ? options.variant === 'alt' && texSet.altSourceMain
        ? texSet.altSourceMain
        : texSet.sourceMain
      : texSet.crateMain;

  const accentMask =
    role === 'source' ? texSet.sourceAccent : texSet.crateAccent;

  const baseGeo = createReliefCardGeometry(1.18, 1.18, 0.14, 12);
  const baseMat = new THREE.MeshStandardMaterial({
    map: mainMask.texture,
    color: 0xffffff,
    roughness: 0.92,
    metalness: 0.0,
    transparent: true,
    alphaTest: 0.08,
    side: THREE.DoubleSide,
  });

  const mainMesh = new THREE.Mesh(baseGeo, baseMat);
  const uData: ProduceMeshUserData = {
    interactiveRole: role,
    produceId,
    anchorId: options.anchorId,
    instanceId: options.instanceId,
    alphaMask: mainMask,
  };
  mainMesh.userData = uData;
  group.add(mainMesh);
  hitMeshes.push(mainMesh);

  // Secondary 2.5D parallax relief layer (leafy tops, vine stem, or volumetric back-relief)
  if (accentMask) {
    const accGeo = createReliefCardGeometry(1.18, 1.18, 0.1, 10);
    const accMat = new THREE.MeshStandardMaterial({
      map: accentMask.texture,
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.0,
      transparent: true,
      alphaTest: 0.08,
      side: THREE.DoubleSide,
    });
    const accMesh = new THREE.Mesh(accGeo, accMat);
    accMesh.position.set(0, 0.02, 0.085);
    accMesh.rotation.x = -0.06;
    accMesh.userData = {
      ...uData,
      alphaMask: accentMask,
    } satisfies ProduceMeshUserData;
    group.add(accMesh);
    hitMeshes.push(accMesh);
  } else {
    // Subtle offset depth silhouette layer so 3D turn during flight feels substantial
    const backGeo = createReliefCardGeometry(1.13, 1.13, 0.09, 8);
    const backMat = new THREE.MeshStandardMaterial({
      map: mainMask.texture,
      color: 0xeedfc8,
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      alphaTest: 0.12,
      side: THREE.DoubleSide,
    });
    const backMesh = new THREE.Mesh(backGeo, backMat);
    backMesh.position.set(0, -0.01, -0.055);
    group.add(backMesh);
  }

  let shadowMesh: THREE.Mesh | null = null;
  if (role === 'source') {
    const discGeo = new THREE.CircleGeometry(0.46, 24);
    discGeo.rotateX(-Math.PI * 0.5);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0xd8c8ae,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    shadowMesh = new THREE.Mesh(discGeo, discMat);
    shadowMesh.position.set(0.06, -0.34, -0.08);
    shadowMesh.scale.set(1.15, 1, 0.72);
    group.add(shadowMesh);
  }

  return { group, hitMeshes, shadowMesh };
}

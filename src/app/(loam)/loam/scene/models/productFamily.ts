import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';

export interface BuiltProductFamily {
  group: THREE.Group;
  updateFamily: (slideProgress: number, studioLightness: number, inspectStrength: number) => void;
}

/**
 * Builds the Chapter 05 "Any Shape" supporting cast of grown mycelium packaging forms:
 * 1. L-shaped Corner Protector (back-left on the studio sweep)
 * 2. Cylindrical Bottle Shipper with moulded cradle (back-right on the studio sweep)
 * 3. Ribbed Transit Cushion Cap (further back-center-right on the sweep)
 *
 * Uses the same matte warm cream speckled mycelium material as the hero tray, positioned further back
 * on the sweep so they read as supporting cast ("one material in many moulds") and slide smoothly
 * into place with scroll (`productFamilySlide`).
 */
export function buildProductFamily(textures: ProceduralTextureSet): BuiltProductFamily {
  const group = new THREE.Group();
  group.name = 'Chapter5ProductFamily';
  group.position.set(0, -5.45, 0);

  // Shared matte cream speckled mycelium material for the supporting family
  const familyMat = new THREE.MeshPhysicalMaterial({
    map: textures.traySkinColor,
    bumpMap: textures.traySkinBump,
    bumpScale: 0.014,
    color: new THREE.Color('#f4eee2'),
    roughness: 0.91,
    metalness: 0.0,
    sheen: 0.52,
    sheenRoughness: 0.82,
    sheenColor: new THREE.Color('#fffcf5'),
    transparent: true,
    opacity: 0,
  });

  // Soft radial contact shadow texture for each supporting piece
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(64, 64, 8, 64, 64, 60);
  grad.addColorStop(0.0, 'rgba(38, 28, 18, 0.42)');
  grad.addColorStop(0.55, 'rgba(46, 35, 24, 0.18)');
  grad.addColorStop(1.0, 'rgba(46, 35, 24, 0.0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 128, 128);
  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  shadowTex.colorSpace = THREE.SRGBColorSpace;

  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Piece 1: L-Shaped Corner Protector (Back-left on the studio sweep)
  // ─────────────────────────────────────────────────────────────────────────
  const cornerGroup = new THREE.Group();
  const lShape = new THREE.Shape();
  lShape.moveTo(0, 0);
  lShape.lineTo(0.68, 0);
  lShape.lineTo(0.68, 0.22);
  lShape.lineTo(0.22, 0.22);
  lShape.lineTo(0.22, 0.68);
  lShape.lineTo(0, 0.68);
  lShape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 0.56,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.04,
    bevelSegments: 5,
  };
  const cornerLGeo = new THREE.ExtrudeGeometry(lShape, extrudeSettings);
  cornerLGeo.center();
  const cornerLMesh = new THREE.Mesh(cornerLGeo, familyMat);
  cornerLMesh.castShadow = true;
  cornerLMesh.receiveShadow = true;
  cornerGroup.add(cornerLMesh);

  // Inner corner gusset pad (3-axis corner block detail)
  const gussetGeo = new THREE.BoxGeometry(0.24, 0.24, 0.20);
  const gussetMesh = new THREE.Mesh(gussetGeo, familyMat);
  gussetMesh.position.set(-0.10, -0.10, 0.14);
  cornerGroup.add(gussetMesh);

  // Cushioning rib indentations on the outer leg
  const ribGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.48, 12);
  const rib1 = new THREE.Mesh(ribGeo, familyMat);
  rib1.position.set(0.12, -0.22, 0);
  rib1.rotation.x = Math.PI / 2;
  cornerGroup.add(rib1);

  const cornerShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.15), shadowMat);
  cornerShadow.rotation.x = -Math.PI / 2;
  cornerShadow.position.set(-1.95, -0.508, -1.28);
  group.add(cornerShadow);

  cornerGroup.scale.setScalar(0.76);
  cornerGroup.rotation.set(0.08, 0.52, -0.04);
  group.add(cornerGroup);

  // ─────────────────────────────────────────────────────────────────────────
  // Piece 2: Bottle Shipper Block with Cylindrical Cradle (Back-right on sweep)
  // ─────────────────────────────────────────────────────────────────────────
  const shipperGroup = new THREE.Group();
  // Cross-section profile of a rectangular block with a deep semi-cylindrical bottle cradle on top
  const shipperShape = new THREE.Shape();
  const sw = 0.48;
  const sh = 0.28;
  const cradleR = 0.24;
  shipperShape.moveTo(-sw, -sh);
  shipperShape.lineTo(sw, -sh);
  shipperShape.lineTo(sw, sh);
  shipperShape.lineTo(cradleR, sh);
  // Semi-circular bottle cradle arc
  shipperShape.absarc(0, sh, cradleR, 0, Math.PI, true);
  shipperShape.lineTo(-sw, sh);
  shipperShape.closePath();

  const shipperGeo = new THREE.ExtrudeGeometry(shipperShape, {
    steps: 1,
    depth: 0.92,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.038,
    bevelSegments: 5,
  });
  shipperGeo.center();
  const shipperMesh = new THREE.Mesh(shipperGeo, familyMat);
  shipperMesh.castShadow = true;
  shipperMesh.receiveShadow = true;
  shipperGroup.add(shipperMesh);

  // Neck support collar bridge near the front end of the bottle shipper
  const collarBridgeGeo = new THREE.TorusGeometry(0.19, 0.048, 12, 24, Math.PI);
  collarBridgeGeo.rotateX(Math.PI);
  const collarBridge = new THREE.Mesh(collarBridgeGeo, familyMat);
  collarBridge.position.set(0, 0.12, 0.34);
  shipperGroup.add(collarBridge);

  const shipperShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.35), shadowMat);
  shipperShadow.rotation.x = -Math.PI / 2;
  shipperShadow.position.set(1.92, -0.508, -1.22);
  group.add(shipperShadow);

  shipperGroup.scale.setScalar(0.78);
  shipperGroup.rotation.set(0.05, -0.58, 0.02);
  group.add(shipperGroup);

  // ─────────────────────────────────────────────────────────────────────────
  // Piece 3: Moulded Circular Jar Cushion Cap (Back-center-right on sweep)
  // ─────────────────────────────────────────────────────────────────────────
  const capPodGroup = new THREE.Group();
  const lathePts: THREE.Vector2[] = [
    new THREE.Vector2(0.0, -0.10),
    new THREE.Vector2(0.32, -0.10),
    new THREE.Vector2(0.38, -0.04),
    new THREE.Vector2(0.38, 0.12),
    new THREE.Vector2(0.30, 0.16),
    new THREE.Vector2(0.24, 0.02),
    new THREE.Vector2(0.0, 0.02),
  ];
  const capPodGeo = new THREE.LatheGeometry(lathePts, 36);
  const capPodMesh = new THREE.Mesh(capPodGeo, familyMat);
  capPodMesh.castShadow = true;
  capPodMesh.receiveShadow = true;
  capPodGroup.add(capPodMesh);

  const capPodShadow = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.95), shadowMat);
  capPodShadow.rotation.x = -Math.PI / 2;
  capPodShadow.position.set(0.92, -0.508, -1.78);
  group.add(capPodShadow);

  capPodGroup.scale.setScalar(0.75);
  capPodGroup.rotation.set(0.18, 0.3, -0.12);
  group.add(capPodGroup);

  const updateFamily = (
    slideProgress: number,
    studioLightness: number,
    inspectStrength: number,
  ) => {
    const vis = slideProgress * studioLightness * (1 - inspectStrength * 0.72);
    group.visible = vis > 0.01;
    if (!group.visible) return;

    const ease = 1 - Math.pow(1 - slideProgress, 3);
    familyMat.opacity = Math.min(1, vis * 1.05);
    shadowMat.opacity = vis * 0.65;

    // Slide smoothly into place from slightly further out & back on the studio sweep
    cornerGroup.position.set(
      -1.95 - (1 - ease) * 0.55,
      -0.21 + (1 - ease) * 0.14,
      -1.28 - (1 - ease) * 0.45,
    );
    cornerShadow.position.x = cornerGroup.position.x;
    cornerShadow.position.z = cornerGroup.position.z;

    shipperGroup.position.set(
      1.92 + (1 - ease) * 0.55,
      -0.25 + (1 - ease) * 0.14,
      -1.22 - (1 - ease) * 0.45,
    );
    shipperShadow.position.x = shipperGroup.position.x;
    shipperShadow.position.z = shipperGroup.position.z;

    capPodGroup.position.set(
      0.92 + (1 - ease) * 0.35,
      -0.38 + (1 - ease) * 0.16,
      -1.78 - (1 - ease) * 0.5,
    );
    capPodShadow.position.x = capPodGroup.position.x;
    capPodShadow.position.z = capPodGroup.position.z;
  };

  return {
    group,
    updateFamily,
  };
}

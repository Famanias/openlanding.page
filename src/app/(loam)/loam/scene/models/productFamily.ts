import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';

export interface BuiltProductFamily {
  group: THREE.Group;
  updateFamily: (slideProgress: number, studioLightness: number, inspectStrength: number) => void;
}

/**
 * Builds the Chapter 05 "Any Shape" supporting cast of grown mycelium packaging forms:
 * 1. L-shaped Corner Protector (far back-left on the studio sweep)
 * 2. Moulded Bottle Shipper with cylindrical cradle (far back-right on the studio sweep)
 *
 * Positioned further back and to the sides at smaller scale so they sit quietly in the
 * soft depth-of-field background without ever crowding or overlapping the hero tray,
 * and with no torus or ring shapes that could appear behind the tray during Hold-to-Inspect.
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
    color: new THREE.Color('#e6dccb'),
    roughness: 0.92,
    metalness: 0.0,
    sheen: 0.22,
    sheenRoughness: 0.86,
    sheenColor: new THREE.Color('#f5ede0'),
    transparent: true,
    opacity: 0,
  });

  // Soft radial contact shadow texture for each supporting piece
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(64, 64, 8, 64, 64, 60);
  grad.addColorStop(0.0, 'rgba(38, 30, 22, 0.36)');
  grad.addColorStop(0.55, 'rgba(46, 36, 26, 0.15)');
  grad.addColorStop(1.0, 'rgba(46, 36, 26, 0.0)');
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
  // Piece 1: L-Shaped Corner Protector (Far back-left on the studio sweep)
  // ─────────────────────────────────────────────────────────────────────────
  const cornerGroup = new THREE.Group();
  const lShape = new THREE.Shape();
  lShape.moveTo(0, 0);
  lShape.lineTo(0.66, 0);
  lShape.lineTo(0.66, 0.21);
  lShape.lineTo(0.21, 0.21);
  lShape.lineTo(0.21, 0.66);
  lShape.lineTo(0, 0.66);
  lShape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 0.54,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.036,
    bevelSegments: 4,
  };
  const cornerLGeo = new THREE.ExtrudeGeometry(lShape, extrudeSettings);
  cornerLGeo.center();
  const cornerLMesh = new THREE.Mesh(cornerLGeo, familyMat);
  cornerLMesh.castShadow = true;
  cornerLMesh.receiveShadow = true;
  cornerGroup.add(cornerLMesh);

  // Inner corner gusset pad (3-axis corner block detail)
  const gussetGeo = new THREE.BoxGeometry(0.22, 0.22, 0.18);
  const gussetMesh = new THREE.Mesh(gussetGeo, familyMat);
  gussetMesh.position.set(-0.09, -0.09, 0.13);
  cornerGroup.add(gussetMesh);

  const cornerShadow = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.85), shadowMat);
  cornerShadow.rotation.x = -Math.PI / 2;
  cornerShadow.position.set(-2.95, -0.395, -2.35);
  group.add(cornerShadow);

  cornerGroup.scale.setScalar(0.50);
  cornerGroup.rotation.set(0.06, 0.54, -0.03);
  group.add(cornerGroup);

  // ─────────────────────────────────────────────────────────────────────────
  // Piece 2: Bottle Shipper Block with Cylindrical Cradle (Far back-right on sweep)
  //          (No torus collar or ring shapes)
  // ─────────────────────────────────────────────────────────────────────────
  const shipperGroup = new THREE.Group();
  const shipperShape = new THREE.Shape();
  const sw = 0.46;
  const sh = 0.26;
  const cradleR = 0.22;
  shipperShape.moveTo(-sw, -sh);
  shipperShape.lineTo(sw, -sh);
  shipperShape.lineTo(sw, sh);
  shipperShape.lineTo(cradleR, sh);
  shipperShape.absarc(0, sh, cradleR, 0, Math.PI, true);
  shipperShape.lineTo(-sw, sh);
  shipperShape.closePath();

  const shipperGeo = new THREE.ExtrudeGeometry(shipperShape, {
    steps: 1,
    depth: 0.88,
    bevelEnabled: true,
    bevelThickness: 0.038,
    bevelSize: 0.035,
    bevelSegments: 4,
  });
  shipperGeo.center();
  const shipperMesh = new THREE.Mesh(shipperGeo, familyMat);
  shipperMesh.castShadow = true;
  shipperMesh.receiveShadow = true;
  shipperGroup.add(shipperMesh);

  const shipperShadow = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.95), shadowMat);
  shipperShadow.rotation.x = -Math.PI / 2;
  shipperShadow.position.set(3.05, -0.395, -2.25);
  group.add(shipperShadow);

  shipperGroup.scale.setScalar(0.52);
  shipperGroup.rotation.set(0.04, -0.58, 0.02);
  group.add(shipperGroup);

  const updateFamily = (
    slideProgress: number,
    studioLightness: number,
    inspectStrength: number,
  ) => {
    // Hide supporting pieces completely during Hold-to-Inspect so the rotating tray is 100% isolated
    const inspectFade = Math.max(0, 1 - inspectStrength * 2.2);
    const vis = slideProgress * studioLightness * inspectFade;
    group.visible = vis > 0.01;
    if (!group.visible) return;

    const ease = 1 - Math.pow(1 - slideProgress, 3);
    familyMat.opacity = Math.min(1, vis * 0.92);
    shadowMat.opacity = vis * 0.48;

    // Positioned well back and to the sides on the studio sweep so they never crowd the hero tray
    cornerGroup.position.set(
      -2.95 - (1 - ease) * 0.45,
      -0.22 + (1 - ease) * 0.10,
      -2.35 - (1 - ease) * 0.35,
    );
    cornerShadow.position.x = cornerGroup.position.x;
    cornerShadow.position.z = cornerGroup.position.z;

    shipperGroup.position.set(
      3.05 + (1 - ease) * 0.45,
      -0.25 + (1 - ease) * 0.10,
      -2.25 - (1 - ease) * 0.35,
    );
    shipperShadow.position.x = shipperGroup.position.x;
    shipperShadow.position.z = shipperGroup.position.z;
  };

  return {
    group,
    updateFamily,
  };
}

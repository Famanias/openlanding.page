import { test } from 'vitest';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { computePanelUVSpan, deriveFold } from './geometry';
import {
  computeAtelierCameraDistance,
  computeCameraDistance,
  computeFullBleedViewOffset,
  computeShadowCameraFrustum,
  projectFold,
} from './projection';
import { FOLD_CONSTANTS, VIEW_ORDER, VIEW_PRESETS } from './config';

test('projectFold returns finite coordinates inside viewport across all views, 360° yaw steps, and openings', () => {
  const width = 900;
  const height = 640;
  const aspect = width / height;

  for (const viewId of VIEW_ORDER) {
    for (const opening of [0, 50, 100]) {
      const pose = deriveFold(opening);
      const projected = projectFold(pose, viewId, aspect, width, height);

      assert.ok(projected.faces.length > 0, `expected visible faces for ${viewId} at ${opening}`);

      for (const face of projected.faces) {
        assert.ok(Number.isFinite(face.depth));
        assert.ok(face.shade >= 0 && face.shade <= 1);
        for (const pt of face.points) {
          assert.ok(Number.isFinite(pt.x) && Number.isFinite(pt.y));
          assert.ok(pt.x >= 0 && pt.x <= width, `x out of bounds (${pt.x}) for ${viewId} at ${opening}`);
          assert.ok(pt.y >= 0 && pt.y <= height, `y out of bounds (${pt.y}) for ${viewId} at ${opening}`);
        }
      }

      if (viewId === 'side') {
        assert.equal(projected.spanBracket.visible, false);
      } else {
        assert.equal(projected.spanBracket.visible, true);
        assert.ok(projected.spanBracket.rightX > projected.spanBracket.leftX);
      }
    }
  }

  // Verify arbitrary yaw/elevation angles stay enclosed with constant camera distance
  const baseDist = computeCameraDistance(VIEW_PRESETS.quarter, aspect);
  for (let yaw = 0; yaw < 360; yaw += 45) {
    assert.equal(computeCameraDistance({ yawDeg: yaw, elevationDeg: 18 }, aspect), baseDist);
    const projected = projectFold(deriveFold(100), { yawDeg: yaw, elevationDeg: 25 }, aspect, width, height);
    for (const face of projected.faces) {
      for (const pt of face.points) {
        assert.ok(pt.x >= 0 && pt.x <= width);
        assert.ok(pt.y >= 0 && pt.y <= height);
      }
    }
  }
});

test('developed sheet UVs remain continuous across shared hinges and reverse coherently on back face', () => {
  for (let j = 0; j < 15; j += 1) {
    const a = computePanelUVSpan(j, 'front');
    const b = computePanelUVSpan(j + 1, 'front');
    assert.ok(Math.abs(a.uEnd - b.uStart) < 1e-12);

    const ba = computePanelUVSpan(j, 'back');
    const bb = computePanelUVSpan(j + 1, 'back');
    // Moving across back face from hinge j+1 to j advances monotonically left-to-right from 0 -> 1
    assert.ok(bb.uStart < ba.uEnd);
    assert.ok(Math.abs(ba.uStart - bb.uEnd) < 1e-12);
  }
});

test('computeFullBleedViewOffset maps Three.js PerspectiveCamera optical center and scale accurately to slotRect', () => {
  const cases = [
    { heroW: 1440, heroH: 760, slot: { x: 520, y: 42, width: 824, height: 530 } },
    { heroW: 1920, heroH: 880, slot: { x: 760, y: 50, width: 824, height: 590 } },
    { heroW: 390, heroH: 980, slot: { x: 20, y: 210, width: 350, height: 310 } },
  ];

  for (const c of cases) {
    const cam = new THREE.PerspectiveCamera(
      FOLD_CONSTANTS.cameraFovDeg,
      c.heroW / c.heroH,
      FOLD_CONSTANTS.cameraNear,
      FOLD_CONSTANTS.cameraFar,
    );
    const dist = computeAtelierCameraDistance(50, c.slot.width / c.slot.height);
    const target = new THREE.Vector3(0, FOLD_CONSTANTS.height * 0.5, 0);
    cam.position.set(0, FOLD_CONSTANTS.height * 0.5, dist);
    cam.lookAt(target);
    cam.updateMatrixWorld(true);

    const vo = computeFullBleedViewOffset(c.heroW, c.heroH, c.slot);
    cam.setViewOffset(vo.fullWidth, vo.fullHeight, vo.offsetX, vo.offsetY, vo.width, vo.height);

    // 1. Target point must project exactly to slot center in full-bleed canvas pixels
    const projTarget = target.clone().project(cam);
    const px = (projTarget.x * 0.5 + 0.5) * c.heroW;
    const py = (0.5 - projTarget.y * 0.5) * c.heroH;
    assert.ok(Math.abs(px - (c.slot.x + c.slot.width * 0.5)) < 1e-4);
    assert.ok(Math.abs(py - (c.slot.y + c.slot.height * 0.5)) < 1e-4);

    // 2. Vertical pixel scale of a 1.6m divider matches an isolated slot-sized camera
    const isolatedCam = new THREE.PerspectiveCamera(
      FOLD_CONSTANTS.cameraFovDeg,
      c.slot.width / c.slot.height,
      FOLD_CONSTANTS.cameraNear,
      FOLD_CONSTANTS.cameraFar,
    );
    isolatedCam.position.copy(cam.position);
    isolatedCam.lookAt(target);
    isolatedCam.updateMatrixWorld(true);

    const topWorld = new THREE.Vector3(0, FOLD_CONSTANTS.height, 0);
    const botWorld = new THREE.Vector3(0, -FOLD_CONSTANTS.footHeight, 0);
    const fullTopY = (0.5 - topWorld.clone().project(cam).y * 0.5) * c.heroH;
    const fullBotY = (0.5 - botWorld.clone().project(cam).y * 0.5) * c.heroH;
    const isoTopY = c.slot.y + (0.5 - topWorld.clone().project(isolatedCam).y * 0.5) * c.slot.height;
    const isoBotY = c.slot.y + (0.5 - botWorld.clone().project(isolatedCam).y * 0.5) * c.slot.height;

    assert.ok(Math.abs(fullTopY - isoTopY) < 1e-4);
    assert.ok(Math.abs(fullBotY - isoBotY) < 1e-4);

    // 3. projectFold with slotRect produces all divider vertices cleanly inside the slot bounds
    const projected = projectFold(
      deriveFold(50),
      VIEW_PRESETS.quarter,
      c.heroW / c.heroH,
      c.heroW,
      c.heroH,
      50,
      c.slot,
    );
    for (const face of projected.faces) {
      for (const pt of face.points) {
        assert.ok(pt.x >= c.slot.x && pt.x <= c.slot.x + c.slot.width);
        assert.ok(pt.y >= c.slot.y && pt.y <= c.slot.y + c.slot.height);
      }
    }
  }
});

test('computeShadowCameraFrustum encloses divider geometry and projected floor shadow across all openings', () => {
  const lightPos = { x: -3.1, y: 4.9, z: 3.2 };
  const targetPos = { x: 0.35, y: 0.25, z: -0.3 };
  const frustum = computeShadowCameraFrustum(lightPos, targetPos);

  assert.ok(frustum.maxProjectedNdc < 0.85, `expected generous frustum margin, got ${frustum.maxProjectedNdc}`);

  const light = new THREE.DirectionalLight('#FFFFFF', 1);
  light.position.set(lightPos.x, lightPos.y, lightPos.z);
  light.target.position.set(targetPos.x, targetPos.y, targetPos.z);
  light.updateMatrixWorld(true);
  light.target.updateMatrixWorld(true);

  const shadowCam = light.shadow.camera;
  shadowCam.position.copy(light.position);
  shadowCam.lookAt(light.target.position);
  shadowCam.updateMatrixWorld(true);
  shadowCam.left = frustum.left;
  shadowCam.right = frustum.right;
  shadowCam.bottom = frustum.bottom;
  shadowCam.top = frustum.top;
  shadowCam.near = frustum.near;
  shadowCam.far = frustum.far;
  shadowCam.updateProjectionMatrix();

  const rayDir = new THREE.Vector3()
    .subVectors(light.target.position, light.position)
    .normalize();
  const floorY = -FOLD_CONSTANTS.footHeight;

  for (const opening of [0, 25, 50, 75, 100]) {
    const pose = deriveFold(opening);
    for (const pt of [...pose.front, ...pose.back]) {
      for (const y of [0, FOLD_CONSTANTS.height]) {
        const corner = new THREE.Vector3(pt.x, y, pt.z);
        const ndcCorner = corner.clone().project(shadowCam);
        assert.ok(Math.abs(ndcCorner.x) < 0.88 && Math.abs(ndcCorner.y) < 0.88 && Math.abs(ndcCorner.z) < 0.92);

        const t = (y - floorY) / -rayDir.y;
        const shadowHit = new THREE.Vector3(
          pt.x + rayDir.x * t,
          floorY,
          pt.z + rayDir.z * t,
        );
        const ndcHit = shadowHit.project(shadowCam);
        assert.ok(Math.abs(ndcHit.x) < 0.88 && Math.abs(ndcHit.y) < 0.88 && Math.abs(ndcHit.z) < 0.92);
      }
    }
  }
});

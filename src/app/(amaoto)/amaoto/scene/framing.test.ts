import { describe, it, expect } from "vitest";
import * as THREE from "three";
import { FRAMES } from "./director";
import { paperPoint } from "../model/rig";
import { fitUmbrellaCamera, fitsWholeUmbrella } from "./framing";
function heroProjection(aspect: number, open = 1) {
  const frame = FRAMES[0],
    root = new THREE.Object3D();
  root.position.fromArray(frame.position);
  root.rotation.set(...frame.rotation);
  root.scale.setScalar(frame.scale);
  root.updateMatrixWorld();
  const camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 80);
  camera.position.fromArray(frame.camera);
  fitUmbrellaCamera(
    camera.position,
    new THREE.Vector3().fromArray(frame.target),
    aspect,
    root.matrixWorld,
  );
  camera.lookAt(new THREE.Vector3().fromArray(frame.target));
  camera.updateMatrixWorld();
  return Array.from({ length: 40 }, (_, i) =>
    new THREE.Vector3()
      .copy(paperPoint(open, i, 1, 0))
      .applyMatrix4(root.matrixWorld)
      .project(camera),
  );
}
describe("hero framing", () => {
  for (const aspect of [0.4, 0.55, 0.75, 1, 1.5, 2])
    it(`keeps both canopy edges inside the canvas at aspect ${aspect}`, () => {
      for (const open of [0, 0.25, 0.6, 1]) {
        const points = heroProjection(aspect, open);
        expect(
          Math.max(...points.map((p) => Math.abs(p.x))),
        ).toBeLessThanOrEqual(0.94);
        expect(
          Math.max(...points.map((p) => Math.abs(p.y))),
        ).toBeLessThanOrEqual(0.94);
      }
    });
  it("preserves the authored bearing and leaves an already safe wide composition alone", () => {
    const frame = FRAMES[0],
      target = new THREE.Vector3().fromArray(frame.target),
      original = new THREE.Vector3().fromArray(frame.camera),
      position = original.clone();
    fitUmbrellaCamera(position, target, 2, new THREE.Matrix4());
    expect(position.toArray()).toEqual(original.toArray());
  });
});

describe("whole-umbrella framing policy", () => {
  it("fits the complete umbrella in every chapter overview", () => {
    for (const chapter of [0, 1, 2, 3, 4, 5])
      expect(fitsWholeUmbrella(chapter, null)).toBe(true);
  });
  it("lets a selected anatomy part crop in close", () => {
    expect(fitsWholeUmbrella(1, "runner")).toBe(false);
    expect(fitsWholeUmbrella(2, "runner")).toBe(true);
  });
});

describe("chapter overview framing", () => {
  for (const chapter of [1, 2, 3, 4, 5])
    it(`keeps chapter ${chapter} canopy inside its narrow canvas`, () => {
      const frame = FRAMES[chapter],
        root = new THREE.Object3D();
      for (const aspect of [0.4, 0.55, 0.75, 1, 1.2, 1.5, 2])
        for (const turn of [0, Math.PI / 4, Math.PI / 2]) {
          root.position.fromArray(frame.position);
          root.rotation.set(
            frame.rotation[0],
            frame.rotation[1] + turn,
            frame.rotation[2],
          );
          root.scale.setScalar(frame.scale);
          root.updateMatrixWorld();
          const camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 80),
            target = new THREE.Vector3().fromArray(frame.target);
          camera.position.fromArray(frame.camera);
          fitUmbrellaCamera(
            camera.position,
            target,
            aspect,
            root.matrixWorld,
            34,
            chapter === 4,
          );
          camera.lookAt(target);
          camera.updateMatrixWorld();
          for (const explode of chapter === 4 ? [0, 0.5, 1] : [0])
            for (let rib = 0; rib < 40; rib++) {
              const point = new THREE.Vector3()
                .copy(paperPoint(frame.open, rib, 1, 0, explode))
                .applyMatrix4(root.matrixWorld)
                .project(camera);
              expect(Math.abs(point.x)).toBeLessThanOrEqual(0.94);
              expect(Math.abs(point.y)).toBeLessThanOrEqual(0.94);
            }
          // The grip end is the part that used to leave the canvas.
          const grip = new THREE.Vector3(0, -2.3, 0)
            .applyMatrix4(root.matrixWorld)
            .project(camera);
          expect(Math.abs(grip.x)).toBeLessThanOrEqual(0.94);
          expect(Math.abs(grip.y)).toBeLessThanOrEqual(0.94);
        }
    });
});

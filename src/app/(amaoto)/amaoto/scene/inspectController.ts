import * as THREE from "three";
import type { RefObject } from "react";
import {
  onPointerDown,
  onPointerMove,
  onPointerUp,
  applyKeyboardStep,
  tick,
  isPinFacingCamera,
  type InspectState,
  type Quaternion,
} from "../logic/inspect";
import type { Vec3 } from "../logic/rng";
export function createInspectController(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  state: RefObject<InspectState>,
  camera: THREE.PerspectiveCamera,
) {
  const cameraRotation: Quaternion = [0, 0, 0, 1],
    n: Vec3 = [0, 0, 1],
    v: Vec3 = [0, 0, 1],
    p: Vec3 = [0, 0, 0],
    normal = new THREE.Vector3(),
    toEye = new THREE.Vector3(),
    projected = new THREE.Vector3();
  const rotation = () => {
    camera.quaternion.toArray(cameraRotation);
    return cameraRotation;
  };
  const key = (event: KeyboardEvent) => {
    if (state.current.phase !== "engaged" || !event.key.startsWith("Arrow"))
      return;
    event.preventDefault();
    event.stopPropagation();
    state.current = applyKeyboardStep(
      state.current,
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0,
      event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0,
      rotation(),
    );
  };
  host.addEventListener("keydown", key);
  return {
    down(x: number, y: number) {
      state.current = onPointerDown(state.current, x, y);
    },
    move(x: number, y: number) {
      state.current = onPointerMove(state.current, x, y, rotation());
    },
    up() {
      state.current = onPointerUp(state.current);
    },
    tick(dt: number) {
      state.current = tick(state.current, dt * 1000);
      canvas.style.touchAction =
        state.current.phase === "engaged" ? "none" : "pan-y";
    },
    pinVisible(localNormal: Vec3, point: THREE.Vector3, model: THREE.Object3D) {
      normal
        .fromArray(localNormal)
        .transformDirection(model.matrixWorld)
        .toArray(n);
      toEye.copy(camera.position).sub(point).toArray(v);
      projected.copy(point).project(camera).toArray(p);
      return isPinFacingCamera(n, v, p);
    },
    dispose() {
      host.removeEventListener("keydown", key);
      canvas.style.removeProperty("touch-action");
    },
  };
}

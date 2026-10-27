import type { FrameInput } from "../engine/types";

const POINTER_RADIUS = 0.34;
const RESTING_RADIUS = 0.6;

/** Pointer/touch → the lantern; any movement resets the stillness timer. */
export function createInputs(target: Window) {
  let x = 0;
  let y = 0;
  let active = false;
  let lastMove = performance.now();

  const toNdc = (cx: number, cy: number) => {
    x = (cx / target.innerWidth) * 2 - 1;
    y = -((cy / target.innerHeight) * 2 - 1);
  };
  const onPointer = (e: PointerEvent) => {
    toNdc(e.clientX, e.clientY);
    active = true;
    lastMove = performance.now();
  };
  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) toNdc(t.clientX, t.clientY);
    active = true;
    lastMove = performance.now();
  };
  const onLeave = () => {
    active = false;
  };
  const bump = () => {
    lastMove = performance.now();
  };

  target.addEventListener("pointermove", onPointer, { passive: true });
  target.addEventListener("pointerdown", onPointer, { passive: true });
  target.addEventListener("touchmove", onTouch, { passive: true });
  target.document.documentElement.addEventListener("pointerleave", onLeave);
  target.addEventListener("wheel", bump, { passive: true });
  target.addEventListener("keydown", bump);
  target.addEventListener("scroll", bump, { passive: true });

  return {
    lantern(): FrameInput["lantern"] {
      return active ? { x, y, radius: POINTER_RADIUS, active: true } : { x: 0, y: 0, radius: RESTING_RADIUS, active: false };
    },
    stillForMs() {
      return performance.now() - lastMove;
    },
    dispose() {
      target.removeEventListener("pointermove", onPointer);
      target.removeEventListener("pointerdown", onPointer);
      target.removeEventListener("touchmove", onTouch);
      target.document.documentElement.removeEventListener("pointerleave", onLeave);
      target.removeEventListener("wheel", bump);
      target.removeEventListener("keydown", bump);
      target.removeEventListener("scroll", bump);
    },
  };
}

export type Inputs = ReturnType<typeof createInputs>;

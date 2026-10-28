import { it, expect } from "vitest";
import {
  createInspect,
  toggleKeyboardEngage,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  tick,
  exit,
  exitOnChapterChange,
  isPinFacingCamera,
  rotateVec3,
  fromAxisAngle,
  slerp,
  IDENTITY,
  applyKeyboardStep,
} from "./inspect";
it("engages, rotates, decays inertia and returns to the saved story", () => {
  let s = toggleKeyboardEngage(createInspect(), "1");
  s = onPointerMove(onPointerDown(s, 0, 0), 80, 20);
  expect(s.rotation).not.toEqual(IDENTITY);
  s = onPointerUp(s);
  const velocity = Math.hypot(...s.velocity);
  s = tick(s, 100);
  expect(Math.hypot(...s.velocity)).toBeLessThan(velocity);
  s = exit(s);
  for (let i = 0; i < 100; i++) s = tick(s, 16);
  expect(s.phase).toBe("idle");
  expect(s.rotation).toEqual(IDENTITY);
});
it("honours keyboard rotation and exits when the owning chapter changes", () => {
  let s = toggleKeyboardEngage(createInspect(), "1");
  s = applyKeyboardStep(s, 1, 0);
  expect(s.rotation).not.toEqual(IDENTITY);
  expect(exitOnChapterChange(s, "3:street").phase).toBe("returning");
  expect(toggleKeyboardEngage(s).phase).toBe("returning");
});
it("normalizes rotations, converges and culls pins behind a surface or frustum", () => {
  const q = fromAxisAngle([0, 1, 0], Math.PI / 2);
  const v = rotateVec3(q, [1, 0, 0]);
  expect(v[0]).toBeCloseTo(0);
  expect(v[2]).toBeCloseTo(-1);
  expect(slerp(q, IDENTITY, 1)).toEqual(IDENTITY);
  expect(isPinFacingCamera([0, 0, 1], [0, 0, 1], [0, 0, 0])).toBe(true);
  expect(isPinFacingCamera([0, 0, -1], [0, 0, 1], [0, 0, 0])).toBe(false);
  expect(isPinFacingCamera([0, 0, 1], [0, 0, 1], [2, 0, 0])).toBe(false);
});

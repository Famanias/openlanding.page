import { describe, expect, it } from "vitest";
import {
  DOOR,
  PLATE,
  beatAt,
  coverBox,
  doorFocal,
  doorRect,
  endScale,
  lockScale,
  thresholdFrame,
  type Size,
} from "./geometry";

const DESKTOP: Size = { w: 1440, h: 900 };
const PHONE: Size = { w: 390, h: 844 };
const WIDE: Size = { w: 2560, h: 1080 };
const STAGES = [DESKTOP, PHONE, WIDE, { w: 768, h: 1024 }, { w: 1024, h: 768 }];

describe("elsewhere threshold cover box", () => {
  it("always covers the stage and keeps the plate's aspect", () => {
    for (const stage of STAGES) {
      const box = coverBox(stage, PLATE);
      expect(box.w).toBeGreaterThanOrEqual(stage.w - 1e-6);
      expect(box.h).toBeGreaterThanOrEqual(stage.h - 1e-6);
      expect(box.w / box.h).toBeCloseTo(PLATE.w / PLATE.h, 6);
      expect(box.x).toBeLessThanOrEqual(1e-6);
      expect(box.y).toBeLessThanOrEqual(1e-6);
    }
  });

  it("follows object-position: 0 pins the left edge, 1 pins the right", () => {
    expect(coverBox(PHONE, PLATE, 0).x).toBeCloseTo(0, 6);
    const right = coverBox(PHONE, PLATE, 1);
    expect(right.x + right.w).toBeCloseTo(PHONE.w, 6);
  });
});

describe("elsewhere threshold door", () => {
  it("keeps a centred crop on landscape screens", () => {
    expect(doorFocal(DESKTOP)).toBe(0.5);
    expect(doorFocal(WIDE)).toBe(0.5);
  });

  it("re-frames a phone so the door sits mid-stage", () => {
    const focal = doorFocal(PHONE);
    expect(focal).toBeGreaterThan(0.5);
    const rect = doorRect(PHONE, focal);
    expect(rect.x + rect.w / 2).toBeCloseTo(PHONE.w / 2, 3);
  });

  it("puts the door on stage at every size", () => {
    for (const stage of STAGES) {
      const rect = doorRect(stage, doorFocal(stage));
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.x + rect.w).toBeLessThanOrEqual(stage.w);
      expect(rect.y).toBeGreaterThanOrEqual(0);
      expect(rect.y + rect.h).toBeLessThanOrEqual(stage.h);
      expect(rect.w / rect.h).toBeCloseTo(((DOOR.x1 - DOOR.x0) * PLATE.w) / ((DOOR.y1 - DOOR.y0) * PLATE.h), 6);
    }
  });

  it("locks the interior before the frame has left the stage", () => {
    for (const stage of STAGES) {
      const rect = doorRect(stage, doorFocal(stage));
      expect(lockScale(stage, rect)).toBeGreaterThan(1);
      expect(endScale(stage, rect)).toBeGreaterThan(lockScale(stage, rect));
    }
  });
});

describe("elsewhere threshold frame", () => {
  it("starts on the untouched exterior with the interior hidden inside the door", () => {
    for (const stage of STAGES) {
      const door = doorRect(stage, doorFocal(stage));
      const frame = thresholdFrame(0, stage, door);
      expect(frame.worldScale).toBe(1);
      expect(frame.worldX).toBe(0);
      expect(frame.worldY).toBe(0);
      expect(frame.interiorOpacity).toBe(0);
      expect(frame.clipLeft).toBeCloseTo(door.x, 6);
      expect(frame.clipTop).toBeCloseTo(door.y, 6);
      expect(frame.clipRight).toBeCloseTo(stage.w - door.x - door.w, 6);
      expect(frame.clipBottom).toBeCloseTo(stage.h - door.y - door.h, 6);
      expect(frame.boughsX).toBe(0);
      expect(frame.boughsScale).toBe(1);
      expect(frame.boughsOpacity).toBe(1);
      expect(frame.beat).toBe(0);
    }
  });

  it("ends fully inside: no clip, interior opaque and at least stage-sized", () => {
    for (const stage of STAGES) {
      const door = doorRect(stage, doorFocal(stage));
      const frame = thresholdFrame(1, stage, door);
      expect(frame.clipTop).toBe(0);
      expect(frame.clipRight).toBe(0);
      expect(frame.clipBottom).toBe(0);
      expect(frame.clipLeft).toBe(0);
      expect(frame.interiorOpacity).toBe(1);
      expect(frame.interiorScale).toBeGreaterThanOrEqual(1);
      expect(frame.interiorX).toBe(0);
      expect(frame.interiorY).toBe(0);
      expect(frame.worldScale).toBeCloseTo(endScale(stage, door), 6);
      expect(frame.beat).toBe(2);
    }
  });

  it("only ever moves forward", () => {
    const door = doorRect(DESKTOP, doorFocal(DESKTOP));
    let last = thresholdFrame(0, DESKTOP, door);
    for (let p = 0.02; p <= 1.0001; p += 0.02) {
      const frame = thresholdFrame(p, DESKTOP, door);
      expect(frame.worldScale).toBeGreaterThanOrEqual(last.worldScale);
      expect(frame.interiorOpacity).toBeGreaterThanOrEqual(last.interiorOpacity);
      expect(frame.clipLeft).toBeLessThanOrEqual(last.clipLeft + 1e-6);
      expect(frame.clipTop).toBeLessThanOrEqual(last.clipTop + 1e-6);
      expect(frame.boughsX).toBeLessThanOrEqual(last.boughsX + 1e-6);
      last = frame;
    }
  });

  it("keeps the interior covering the visible doorway at every step", () => {
    for (const stage of STAGES) {
      const door = doorRect(stage, doorFocal(stage));
      for (let p = 0; p <= 1.0001; p += 0.01) {
        const f = thresholdFrame(p, stage, door);
        const left = stage.w / 2 + f.interiorX - (stage.w * f.interiorScale) / 2;
        const right = stage.w / 2 + f.interiorX + (stage.w * f.interiorScale) / 2;
        const top = stage.h / 2 + f.interiorY - (stage.h * f.interiorScale) / 2;
        const bottom = stage.h / 2 + f.interiorY + (stage.h * f.interiorScale) / 2;
        expect(left).toBeLessThanOrEqual(f.clipLeft + 0.01);
        expect(right).toBeGreaterThanOrEqual(stage.w - f.clipRight - 0.01);
        expect(top).toBeLessThanOrEqual(f.clipTop + 0.01);
        expect(bottom).toBeGreaterThanOrEqual(stage.h - f.clipBottom - 0.01);
      }
    }
  });

  it("is fully opaque before the doorway is larger than the interior could cover", () => {
    for (const stage of STAGES) {
      const door = doorRect(stage, doorFocal(stage));
      for (let p = 0; p <= 1.0001; p += 0.01) {
        const f = thresholdFrame(p, stage, door);
        if (f.worldScale >= lockScale(stage, door)) expect(f.interiorOpacity).toBe(1);
      }
    }
  });

  it("clears the boughs off the stage before the interior has taken over", () => {
    for (const stage of STAGES) {
      const door = doorRect(stage, doorFocal(stage));
      for (let p = 0.4; p <= 1.0001; p += 0.02) {
        const f = thresholdFrame(p, stage, door);
        expect(f.boughsOpacity).toBe(0);
        // the needles end 56% across the cutout
        expect(f.boughsX + stage.w * 0.56 * f.boughsScale).toBeLessThanOrEqual(0);
      }
      expect(thresholdFrame(0.4, stage, door).interiorOpacity).toBeLessThan(1);
    }
  });

  it("clamps progress outside 0..1", () => {
    const door = doorRect(DESKTOP, 0.5);
    expect(thresholdFrame(-1, DESKTOP, door)).toEqual(thresholdFrame(0, DESKTOP, door));
    expect(thresholdFrame(4, DESKTOP, door)).toEqual(thresholdFrame(1, DESKTOP, door));
  });

  it("changes caption at the door, mid-crossing and inside", () => {
    expect(beatAt(0)).toBe(0);
    expect(beatAt(0.29)).toBe(0);
    expect(beatAt(0.3)).toBe(1);
    expect(beatAt(0.69)).toBe(1);
    expect(beatAt(0.7)).toBe(2);
    expect(beatAt(1)).toBe(2);
  });
});

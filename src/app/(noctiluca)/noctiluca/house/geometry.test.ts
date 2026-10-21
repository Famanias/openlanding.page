import { describe, expect, it } from "vitest";
import {
  DOOR_OFFSET_P,
  GHOST,
  P_VH,
  ROOM_DEPTH_P,
  cameraAt,
  depthMetres,
  flowRoomAt,
  perspectivePx,
  planeOpacity,
  revealAfter,
  roomAtZ,
  scrollForStation,
  smootherstep,
  tunnelBox,
} from "./geometry";

describe("perspective", () => {
  it("matches a 55° vertical field of view", () => {
    // tan(27.5°) = 0.5206 → P = 0.5 / 0.5206 of the viewport height.
    expect(P_VH).toBeCloseTo(96.05, 1);
    expect(perspectivePx(900)).toBeCloseTo(864.4, 0);
  });

  it("puts a plane at distance P at exactly 1:1", () => {
    const p = perspectivePx(800);
    // CSS scale of a plane at distance d is P / d.
    expect(p / p).toBe(1);
  });
});

describe("smootherstep", () => {
  it("clamps and eases", () => {
    expect(smootherstep(-1)).toBe(0);
    expect(smootherstep(0)).toBe(0);
    expect(smootherstep(0.5)).toBeCloseTo(0.5);
    expect(smootherstep(1)).toBe(1);
    expect(smootherstep(2)).toBe(1);
    expect(smootherstep(0.1)).toBeLessThan(0.1);
  });
});

describe("cameraAt", () => {
  const vh = 900;
  const stride = 1.6 * vh;
  const p = perspectivePx(vh);
  const d = ROOM_DEPTH_P * p;

  it("rests at the foyer before any scroll", () => {
    const cam = cameraAt(0, { stride, stations: 8, p });
    expect(cam.z).toBe(0);
    expect(cam.station).toBe(0);
    expect(cam.nearest).toBe(0);
  });

  it("holds still through the dwell, then travels", () => {
    const dwellEnd = cameraAt(stride * 0.3, { stride, stations: 8, p });
    expect(dwellEnd.z).toBe(0);
    const mid = cameraAt(stride * 0.65, { stride, stations: 8, p });
    expect(mid.z).toBeCloseTo(-d / 2, 3);
  });

  it("arrives exactly on each station's scroll offset", () => {
    for (let i = 0; i < 8; i++) {
      const cam = cameraAt(scrollForStation(i, stride), { stride, stations: 8, p });
      expect(cam.z).toBeCloseTo(-i * d, 6);
      expect(cam.nearest).toBe(i);
    }
  });

  it("clamps past the end wall", () => {
    const cam = cameraAt(stride * 40, { stride, stations: 8, p });
    expect(cam.z).toBeCloseTo(-7 * d, 6);
    expect(cam.station).toBe(7);
  });

  it("clamps negative scroll (overscroll bounce)", () => {
    expect(cameraAt(-200, { stride, stations: 8, p }).z).toBe(0);
  });
});

describe("planeOpacity", () => {
  it("is solid at the reading distance and gone once passed", () => {
    expect(planeOpacity(1)).toBe(1);
    expect(planeOpacity(2.4)).toBe(1);
    expect(planeOpacity(0.3)).toBe(0);
    expect(planeOpacity(-1)).toBe(0);
  });

  it("dissolves as the camera walks through it", () => {
    const o = planeOpacity(0.55);
    expect(o).toBeGreaterThan(0);
    expect(o).toBeLessThan(1);
  });

  it("is only a ghost when glimpsed through the next doorway", () => {
    expect(planeOpacity(3.6)).toBeCloseTo(GHOST);
    expect(planeOpacity(4.4)).toBeCloseTo(GHOST);
  });

  it("fades in from the far distance", () => {
    expect(planeOpacity(7)).toBe(0);
    const far = planeOpacity(5.4);
    expect(far).toBeGreaterThan(0);
    expect(far).toBeLessThan(GHOST);
  });
});

describe("revealAfter", () => {
  it("keeps a label hidden while its plaque is being read", () => {
    expect(revealAfter(1.38, 1)).toBe(0);
  });
  it("shows the label once the plaque has dissolved", () => {
    expect(revealAfter(0.9, 0.3)).toBe(1);
  });
  it("still disappears as the camera passes the label", () => {
    expect(revealAfter(0.2, -0.2)).toBe(0);
  });
});

describe("rooms along the corridor", () => {
  const p = 1000;
  it("assigns the foyer until the first doorway", () => {
    expect(roomAtZ(0, p, 8)).toBe(0);
    expect(roomAtZ(-(DOOR_OFFSET_P - 0.01) * p, p, 8)).toBe(0);
  });

  it("switches room exactly at each doorway", () => {
    expect(roomAtZ(-(DOOR_OFFSET_P + 0.01) * p, p, 8)).toBe(1);
    const secondDoor = -(ROOM_DEPTH_P + DOOR_OFFSET_P) * p;
    expect(roomAtZ(secondDoor + 1, p, 8)).toBe(1);
    expect(roomAtZ(secondDoor - 1, p, 8)).toBe(2);
  });

  it("never runs past the last room", () => {
    expect(roomAtZ(-1e9, p, 8)).toBe(7);
  });

  it("reports depth in metres, 7.2 m per room", () => {
    expect(depthMetres(0, p)).toBe(0);
    expect(depthMetres(-ROOM_DEPTH_P * p, p)).toBeCloseTo(7.2);
  });
});

describe("tunnelBox", () => {
  it("is narrower than the screen at the reading plane", () => {
    const box = tunnelBox(1440, 900);
    expect(box.hw).toBeLessThan(720);
    expect(box.floor).toBeGreaterThan(0);
    expect(box.ceil).toBeLessThan(0);
  });

  it("caps the width on ultra-wide screens", () => {
    expect(tunnelBox(4000, 900).hw).toBeCloseTo(0.66 * 900);
  });
});

describe("flowRoomAt", () => {
  const tops = [0, 1000, 2000, 3000];
  it("sits in the first room at the top", () => {
    expect(flowRoomAt(100, tops)).toBe(0);
  });
  it("crossfades around each room's top", () => {
    expect(flowRoomAt(1000, tops)).toBeCloseTo(0.5);
    expect(flowRoomAt(1500, tops)).toBe(1);
    expect(flowRoomAt(2120, tops)).toBe(2);
  });
  it("stops at the last room", () => {
    expect(flowRoomAt(99999, tops)).toBe(3);
    expect(flowRoomAt(10, [])).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import {
  beanTempAt,
  developmentPct,
  formatClock,
  progressToElapsed,
  clampElapsed,
  stageFromElapsed,
  STAGES,
  TOTAL_SECONDS,
  CRACK_AT,
} from "./roast";

describe("beanTempAt", () => {
  it("starts at the charge temperature", () => {
    expect(beanTempAt(0)).toBe(205);
  });

  it("reaches the turning point at 1:20", () => {
    expect(beanTempAt(80)).toBe(92);
  });

  it("matches the control points", () => {
    expect(beanTempAt(180)).toBe(146);
    expect(beanTempAt(300)).toBe(166);
    expect(beanTempAt(420)).toBe(184);
    expect(beanTempAt(CRACK_AT)).toBe(196);
    expect(beanTempAt(600)).toBe(203);
    expect(beanTempAt(TOTAL_SECONDS)).toBe(208);
  });

  it("rises monotonically after the turning point", () => {
    let prev = beanTempAt(80);
    for (let t = 85; t <= TOTAL_SECONDS; t += 5) {
      const temp = beanTempAt(t);
      expect(temp).toBeGreaterThanOrEqual(prev);
      prev = temp;
    }
  });

  it("interpolates linearly between control points", () => {
    expect(beanTempAt(40)).toBeCloseTo((205 + 92) / 2, 5);
    expect(beanTempAt(561)).toBeCloseTo((196 + 203) / 2, 5);
  });

  it("clamps beyond the drop", () => {
    expect(beanTempAt(900)).toBe(208);
    expect(beanTempAt(-5)).toBe(205);
  });
});

describe("developmentPct", () => {
  it("is zero before first crack", () => {
    expect(developmentPct(0)).toBe(0);
    expect(developmentPct(CRACK_AT - 1)).toBe(0);
  });

  it("is exactly zero at first crack", () => {
    expect(developmentPct(CRACK_AT)).toBe(0);
  });

  it("reaches about 24% at the drop", () => {
    expect(developmentPct(TOTAL_SECONDS)).toBeCloseTo((690 - 522) / 690 * 100, 5);
  });

  it("grows linearly during development", () => {
    const half = developmentPct(CRACK_AT + (TOTAL_SECONDS - CRACK_AT) / 2);
    expect(half).toBeCloseTo(developmentPct(TOTAL_SECONDS) / 2, 5);
  });
});

describe("formatClock", () => {
  it("formats minutes and seconds", () => {
    expect(formatClock(0)).toBe("0:00");
    expect(formatClock(40)).toBe("0:40");
    expect(formatClock(CRACK_AT)).toBe("8:42");
    expect(formatClock(TOTAL_SECONDS)).toBe("11:30");
  });

  it("clamps out-of-range input", () => {
    expect(formatClock(-10)).toBe("0:00");
    expect(formatClock(5000)).toBe("11:30");
  });
});

describe("stageFromElapsed", () => {
  it("assigns each boundary to the right stage", () => {
    expect(stageFromElapsed(0).id).toBe("charge");
    expect(stageFromElapsed(79).id).toBe("charge");
    expect(stageFromElapsed(80).id).toBe("drying");
    expect(stageFromElapsed(239).id).toBe("drying");
    expect(stageFromElapsed(240).id).toBe("maillard");
    expect(stageFromElapsed(CRACK_AT - 1).id).toBe("maillard");
    expect(stageFromElapsed(CRACK_AT).id).toBe("firstcrack");
    expect(stageFromElapsed(599).id).toBe("firstcrack");
    expect(stageFromElapsed(600).id).toBe("development");
    expect(stageFromElapsed(TOTAL_SECONDS).id).toBe("drop");
    expect(stageFromElapsed(TOTAL_SECONDS + 60).id).toBe("drop");
  });

  it("lists six contiguous stages covering the whole roast", () => {
    expect(STAGES).toHaveLength(6);
    expect(STAGES[0].start).toBe(0);
    expect(STAGES[STAGES.length - 1].end).toBe(TOTAL_SECONDS);
    for (let i = 1; i < STAGES.length; i++) {
      expect(STAGES[i].start).toBe(STAGES[i - 1].end);
    }
  });
});

describe("progress helpers", () => {
  it("maps scroll progress to elapsed seconds", () => {
    expect(progressToElapsed(0)).toBe(0);
    expect(progressToElapsed(0.5)).toBeCloseTo(TOTAL_SECONDS / 2, 5);
    expect(progressToElapsed(1)).toBe(TOTAL_SECONDS);
  });

  it("clamps progress outside 0..1", () => {
    expect(progressToElapsed(-0.5)).toBe(0);
    expect(progressToElapsed(1.5)).toBe(TOTAL_SECONDS);
  });

  it("clamps elapsed values", () => {
    expect(clampElapsed(-1)).toBe(0);
    expect(clampElapsed(10_000)).toBe(TOTAL_SECONDS);
    expect(clampElapsed(300)).toBe(300);
  });
});

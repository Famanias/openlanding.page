import { describe, expect, it } from "vitest";
import { planNight } from "./your-night";

const plan = (bed: string, wake: string, win?: number) => {
  const r = planNight(bed, wake, win);
  if (!r.ok) throw new Error(r.error);
  return r.plan;
};

describe("planNight", () => {
  it("crosses midnight", () => {
    expect(plan("23:30", "07:00")).toMatchObject({ durationMin: 450, cycleCount: 5, smartWakeMin: 450 });
  });

  it("lists 90-minute cycle boundaries below the wake time", () => {
    expect(plan("23:30", "07:00").cycleBoundariesMin).toEqual([90, 180, 270, 360]);
  });

  it("wakes on the last cycle boundary inside the window", () => {
    expect(plan("23:00", "06:45").smartWakeMin).toBe(450);
  });

  it("falls back to the alarm time when no boundary is close enough", () => {
    expect(plan("00:00", "07:00").smartWakeMin).toBe(420);
  });

  it("clamps the window to 10–30 minutes", () => {
    expect(plan("23:00", "06:45", 5).windowMin).toBe(10);
    expect(plan("23:00", "06:45", 90).windowMin).toBe(30);
  });

  it("keeps bed and wake as minutes past midnight", () => {
    expect(plan("23:30", "07:00")).toMatchObject({ bedMin: 1410, wakeMin: 420 });
  });

  it("rejects bad input", () => {
    expect(planNight("07:00", "07:00")).toEqual({ ok: false, error: "same-time" });
    expect(planNight("7pm", "07:00")).toEqual({ ok: false, error: "format" });
    expect(planNight("24:10", "07:00")).toEqual({ ok: false, error: "format" });
    expect(planNight("06:00", "23:30")).toEqual({ ok: false, error: "too-long" });
  });
});

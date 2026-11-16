import { describe, expect, it } from "vitest";
import { ASSETS } from "../assets.generated";
import { FILTERS, JOBS, countByFilter, countLabel, filterJobs, jobLabel, stepIndex } from "./jobs";

describe("tolvar job log data", () => {
  it("numbers every job once, newest first", () => {
    const numbers = JOBS.map((job) => job.no);
    expect(new Set(numbers).size).toBe(numbers.length);
    expect([...numbers].sort((a, b) => b - a)).toEqual(numbers);
  });

  it("uses each photo once and only photos that were processed", () => {
    const keys = JOBS.map((job) => job.assetKey);
    expect(new Set(keys).size).toBe(keys.length);
    for (const key of keys) expect(ASSETS[key], key).toBeDefined();
  });

  it("describes every photo", () => {
    for (const job of JOBS) {
      expect(job.alt.length, job.assetKey).toBeGreaterThan(20);
      expect(job.note.length).toBeGreaterThan(10);
    }
  });

  it("has at least one job behind every filter", () => {
    for (const filter of FILTERS) expect(countByFilter(JOBS, filter.id), filter.id).toBeGreaterThan(0);
  });
});

describe("tolvar job log logic", () => {
  it("returns every job for 'all' and a copy, not the source array", () => {
    const all = filterJobs(JOBS, "all");
    expect(all).toHaveLength(JOBS.length);
    expect(all).not.toBe(JOBS);
  });

  it("filters by kind", () => {
    const pipe = filterJobs(JOBS, "pipe");
    expect(pipe.length).toBeGreaterThan(0);
    expect(pipe.every((job) => job.kind === "pipe")).toBe(true);
  });

  it("splits the log across the filters with nothing left over", () => {
    const parts = FILTERS.filter((filter) => filter.id !== "all").map((filter) => countByFilter(JOBS, filter.id));
    expect(parts.reduce((a, b) => a + b, 0)).toBe(JOBS.length);
  });

  it("steps through photos and wraps at both ends", () => {
    expect(stepIndex(0, 1, 5)).toBe(1);
    expect(stepIndex(4, 1, 5)).toBe(0);
    expect(stepIndex(0, -1, 5)).toBe(4);
    expect(stepIndex(2, -7, 5)).toBe(0);
    expect(stepIndex(3, 1, 0)).toBe(0);
  });

  it("writes ticket numbers and the count line", () => {
    expect(jobLabel(212)).toBe("Job 0212");
    expect(countLabel(22, 22)).toBe("All 22 jobs");
    expect(countLabel(6, 22)).toBe("6 of 22 jobs");
  });
});

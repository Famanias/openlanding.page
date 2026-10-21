import { describe, it, expect, vi } from "vitest";
import { SpectralStore } from "./spectral-store";

describe("SpectralStore", () => {
  it("initializes with default preset values", () => {
    const store = new SpectralStore("solar-flare");
    const snapshot = store.getSnapshot();
    expect(snapshot.activePresetId).toBe("solar-flare");
    expect(snapshot.dispersion).toBeCloseTo(1.618);
    expect(snapshot.scrollProgress).toBe(0);
    expect(snapshot.reducedMotion).toBe(false);
  });

  it("updates state and notifies subscribers on setPreset", () => {
    const store = new SpectralStore("solar-flare");
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.setPreset("deep-borealis");
    expect(listener).toHaveBeenCalledTimes(1);

    const snapshot = store.getSnapshot();
    expect(snapshot.activePresetId).toBe("deep-borealis");
    expect(snapshot.dispersion).toBeCloseTo(1.542);

    unsubscribe();
    store.setPreset("supernova");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("updates custom parameters correctly", () => {
    const store = new SpectralStore("solar-flare");
    store.setParameters({ dispersion: 1.88, flowVelocity: 2.2 });
    const snapshot = store.getSnapshot();
    expect(snapshot.dispersion).toBe(1.88);
    expect(snapshot.flowVelocity).toBe(2.2);
  });

  it("locks camera orbit to planar zeroes when reducedMotion is enabled", () => {
    const store = new SpectralStore("solar-flare");
    store.setReducedMotion(true);
    const snapshot = store.getSnapshot();
    expect(snapshot.reducedMotion).toBe(true);
    expect(snapshot.cameraOrbit.pitchDeg).toBe(0);
    expect(snapshot.cameraOrbit.yawDeg).toBe(0);
    expect(snapshot.cameraOrbit.rollDeg).toBe(0);
  });

  it("updates camera orbit with scroll progress", () => {
    const store = new SpectralStore("solar-flare");
    store.setScrollProgress(0.5);
    const snapshot = store.getSnapshot();
    expect(snapshot.scrollProgress).toBe(0.5);
  });
});

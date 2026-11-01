import { describe, it, expect } from "vitest";
import { audioEngine } from "./audioEngine";
import { SOUND_SPECIMENS, SPECIMEN_MAP, SpecimenId } from "./sampleLibrary";

describe("NoiseClub audioEngine and sampleLibrary", () => {
  it("defines all 5 sound specimens with 4 slices each", () => {
    expect(SOUND_SPECIMENS).toHaveLength(5);
    const expectedIds: SpecimenId[] = ["subway", "espresso", "rain", "footsteps", "coin"];
    for (const id of expectedIds) {
      expect(SPECIMEN_MAP[id]).toBeDefined();
      expect(SPECIMEN_MAP[id].slices).toHaveLength(4);
      expect(SPECIMEN_MAP[id].defaultPattern).toHaveLength(4);
      for (const track of SPECIMEN_MAP[id].defaultPattern) {
        expect(track).toHaveLength(16);
      }
    }
  });

  it("pre-synthesizes deterministic waveforms for each specimen", () => {
    for (const spec of SOUND_SPECIMENS) {
      const waveform = audioEngine.getWaveform(spec.id);
      expect(waveform).toHaveLength(96);
      for (const val of waveform) {
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(1);
      }
    }
  });

  it("manages 16-step sequencer pattern correctly", () => {
    const pattern = audioEngine.getSequencerPattern();
    expect(pattern).toHaveLength(4);
    expect(pattern[0]).toHaveLength(16);

    const initialVal = pattern[0][0];
    const toggled = audioEngine.toggleStep(0, 0);
    expect(toggled[0][0]).toBe(!initialVal);

    // Toggle back
    audioEngine.toggleStep(0, 0);

    const cleared = audioEngine.clearPattern();
    for (const row of cleared) {
      for (const step of row) {
        expect(step).toBe(false);
      }
    }

    const reset = audioEngine.resetDefaultPattern("subway");
    expect(reset[0][0]).toBe(SPECIMEN_MAP.subway.defaultPattern[0][0]);
  });

  it("clamps and updates BPM correctly", () => {
    audioEngine.setBpm(120);
    expect(audioEngine.getBpm()).toBe(120);

    // Clamps below minimum 70
    audioEngine.setBpm(50);
    expect(audioEngine.getBpm()).toBe(70);

    // Clamps above maximum 160
    audioEngine.setBpm(200);
    expect(audioEngine.getBpm()).toBe(160);

    // Reset to default
    audioEngine.setBpm(116);
    expect(audioEngine.getBpm()).toBe(116);
  });
});

import { soundParams, type SoundInput } from "./mapping";

/** Slow open voicings, one per bar; the tempo (and so the pace of change) falls through the night. */
const CHORDS = [
  ["D3", "A3", "F#4", "E5"],
  ["B2", "F#3", "D4", "A4"],
  ["G2", "D3", "B3", "F#4"],
  ["A2", "E3", "C#4", "G#4"],
];

export type Soundscape = {
  update(f: SoundInput): void;
  chime(): void;
  setOn(on: boolean): void;
  dispose(): void;
};

/**
 * Generated live with Tone.js: no audio files. Must be created from a user gesture (the Sound toggle).
 * Surf = brown noise → low-pass (tide, roughness) → distortion (grit) → a slow swell. Pad = sine chords in reverb.
 */
export async function createSoundscape(): Promise<Soundscape> {
  const Tone = await import("tone");
  await Tone.start();

  const master = new Tone.Volume(-60).toDestination();
  const reverb = new Tone.Reverb({ decay: 9, wet: 0.65 }).connect(master);
  await reverb.ready;

  const surfVol = new Tone.Volume(-18).connect(master);
  const swell = new Tone.Gain(0.7).connect(surfVol);
  const swellLfo = new Tone.LFO({ frequency: 0.11, min: 0.35, max: 1 }).connect(swell.gain).start();
  const grit = new Tone.Distortion({ distortion: 0.5, wet: 0 }).connect(swell);
  const filter = new Tone.Filter({ frequency: 600, type: "lowpass", rolloff: -24 }).connect(grit);
  const noise = new Tone.Noise("brown").connect(filter).start();

  const padVol = new Tone.Volume(-22).connect(reverb);
  const pad = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "sine" }, envelope: { attack: 2.8, decay: 1, sustain: 0.7, release: 6 } }).connect(padVol);
  const bell = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 1.6, sustain: 0, release: 2 } }).connect(reverb);
  bell.volume.value = -20;

  const transport = Tone.getTransport();
  transport.bpm.value = 52;
  let bar = 0;
  const loop = new Tone.Loop((time) => {
    pad.triggerAttackRelease(CHORDS[bar % CHORDS.length], "1m", time, 0.35);
    bar++;
  }, "1m").start(0);
  transport.start();

  let last = 0;
  return {
    update(f) {
      const now = performance.now();
      if (now - last < 120) return; // dial the mix a few times a second, not every frame
      last = now;
      const s = soundParams(f);
      filter.frequency.rampTo(s.surfCutoffHz, 0.25);
      grit.wet.rampTo(s.grit * 0.55, 0.25);
      surfVol.volume.rampTo(s.surfGainDb, 0.4);
      padVol.volume.rampTo(s.padGainDb, 1.5);
      transport.bpm.rampTo(s.padTempoBpm, 3);
    },
    chime() {
      bell.triggerAttackRelease("E6", "8n", undefined, 0.5);
    },
    setOn(on) {
      master.volume.rampTo(on ? -6 : -60, on ? 1.2 : 0.5);
    },
    dispose() {
      loop.dispose();
      transport.stop();
      noise.stop();
      [noise, filter, grit, swell, swellLfo, surfVol, pad, padVol, bell, reverb, master].forEach((n) => n.dispose());
    },
  };
}

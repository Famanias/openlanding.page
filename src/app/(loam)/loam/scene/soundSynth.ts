/**
 * Zero-dependency procedural Web Audio synthesizer for LOAM's sound toggle.
 * Produces a gentle damp forest air tone above ground that shifts into a warm
 * subterranean harmonic drone underground, plus a subtle resonant chime when
 * clicking a mycelium thread pulse.
 */

export interface SoundController {
  isEnabled: () => boolean;
  toggle: () => boolean;
  updateProgress: (undergroundFactor: number) => void;
  playPulseChime: () => void;
  dispose: () => void;
}

export function createSoundController(): SoundController {
  let enabled = false;
  let ctx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let droneOsc1: OscillatorNode | null = null;
  let droneOsc2: OscillatorNode | null = null;
  let filterNode: BiquadFilterNode | null = null;

  const initAudio = () => {
    if (ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);

    filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 260;
    filterNode.connect(masterGain);

    droneOsc1 = ctx.createOscillator();
    droneOsc1.type = 'sine';
    droneOsc1.frequency.value = 110; // A2 warm root
    droneOsc1.connect(filterNode);
    droneOsc1.start();

    droneOsc2 = ctx.createOscillator();
    droneOsc2.type = 'triangle';
    droneOsc2.frequency.value = 164.81; // E3 fifth
    const subGain = ctx.createGain();
    subGain.gain.value = 0.25;
    droneOsc2.connect(subGain);
    subGain.connect(filterNode);
    droneOsc2.start();
  };

  const toggle = (): boolean => {
    enabled = !enabled;
    if (enabled) {
      initAudio();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (masterGain && ctx) {
        masterGain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.4);
      }
    } else if (masterGain && ctx) {
      masterGain.gain.setTargetAtTime(0.0, ctx.currentTime, 0.25);
    }
    return enabled;
  };

  const updateProgress = (undergroundFactor: number) => {
    if (!enabled || !ctx || !filterNode || !droneOsc1) return;
    filterNode.frequency.setTargetAtTime(220 + undergroundFactor * 190, ctx.currentTime, 0.2);
    droneOsc1.frequency.setTargetAtTime(110 - undergroundFactor * 12, ctx.currentTime, 0.2);
  };

  const playPulseChime = () => {
    if (!enabled || !ctx || !masterGain) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(396, ctx.currentTime + 0.9);

    g.gain.setValueAtTime(0.08, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.95);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  };

  const dispose = () => {
    if (ctx) {
      ctx.close().catch(() => {});
      ctx = null;
    }
  };

  return {
    isEnabled: () => enabled,
    toggle,
    updateProgress,
    playPulseChime,
    dispose,
  };
}

/**
 * Procedural zero-dependency Web Audio synthesizer for subtle tactile clicks
 * and interactive acoustic reverberation auditioning (Untreated Concrete vs. Tessera Damped).
 */

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedCtx) {
    sharedCtx = new AudioCtx();
  }
  if (sharedCtx.state === 'suspended') {
    sharedCtx.resume().catch(() => {});
  }
  return sharedCtx;
}

/**
 * Subtle tactile mechanical click when adjusting architectural tiles or presets.
 */
export function playTactileClick(pitchHz = 220): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(pitchHz, now);
  osc.frequency.exponentialRampToValueAtTime(68, now + 0.032);

  gain.gain.setValueAtTime(0.045, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}

/**
 * Auditions a chamber acoustic chord in either an untreated reverberant concrete space
 * (long metallic multi-tap reflections) or a Tessera-treated acoustic room (warm, intimate clarity).
 */
export function playAcousticComparison(mode: 'untreated' | 'tessera', nrc = 0.92): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequencies = [261.63, 329.63, 392.0, 523.25]; // C major architectural chime

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.14, now);
  master.connect(ctx.destination);

  // Lowpass filter representing high-frequency absorption
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(mode === 'tessera' ? 1650 - nrc * 450 : 4800, now);
  filter.connect(master);

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    osc.type = mode === 'tessera' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.035);

    const decayTime = mode === 'tessera' ? 0.42 : 1.75;
    noteGain.gain.setValueAtTime(0.001, now + idx * 0.035);
    noteGain.gain.linearRampToValueAtTime(0.18, now + idx * 0.035 + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + decayTime);

    osc.connect(noteGain);
    noteGain.connect(filter);

    osc.start(now + idx * 0.035);
    osc.stop(now + idx * 0.035 + decayTime + 0.05);
  });

  // Simulated flutter echo taps in untreated mode
  if (mode === 'untreated') {
    const tapTimes = [0.11, 0.23, 0.37, 0.54, 0.76, 1.02];
    tapTimes.forEach((delaySec, tapIdx) => {
      const echoOsc = ctx.createOscillator();
      const echoGain = ctx.createGain();
      echoOsc.type = 'sawtooth';
      echoOsc.frequency.setValueAtTime(523.25 * (tapIdx % 2 === 0 ? 1 : 1.5), now + delaySec);

      const amp = 0.038 * Math.pow(0.7, tapIdx);
      echoGain.gain.setValueAtTime(amp, now + delaySec);
      echoGain.gain.exponentialRampToValueAtTime(0.0001, now + delaySec + 0.22);

      echoOsc.connect(echoGain);
      echoGain.connect(master);
      echoOsc.start(now + delaySec);
      echoOsc.stop(now + delaySec + 0.24);
    });
  }
}

/**
 * Procedural Japanese Ambient Soundscape Engine (Web Audio API).
 * Synthesizes a soft, low-volume continuous ambient atmosphere with:
 * - Whisper-quiet filtered mountain breeze bed
 * - Traditional Japanese furin wind chimes tuned to the Hirajoshi pentatonic scale
 * - Distant Japanese bush warbler (uguisu) and soft mountain bird calls
 *
 * Zero external audio files (zero 404 risk) with graceful gain fading.
 */

/** Hirajoshi pentatonic frequencies (D5, E5, F5, A5, Bb5, D6, E6, A6) in Hz */
export const HIRAJOSHI_CHIME_FREQUENCIES: readonly number[] = [
  587.33, // D5
  659.25, // E5
  698.46, // F5
  880.0, // A5
  932.33, // Bb5
  1174.66, // D6
  1318.51, // E6
  1760.0, // A6
];

/** Metallic/glass furin chime overtone multipliers and relative amplitudes */
export const FURIN_OVERTONE_RATIOS: ReadonlyArray<{ ratio: number; gain: number; decay: number }> = [
  { ratio: 1.0, gain: 1.0, decay: 2.6 },
  { ratio: 2.756, gain: 0.36, decay: 1.45 },
  { ratio: 5.404, gain: 0.14, decay: 0.72 },
];

export function selectChimeFrequency(randomValue: number): number {
  const clamped = Math.max(0, Math.min(0.9999, randomValue));
  const idx = Math.floor(clamped * HIRAJOSHI_CHIME_FREQUENCIES.length);
  return HIRAJOSHI_CHIME_FREQUENCIES[idx];
}

export function computeNextIntervalMs(minMs: number, maxMs: number, randomValue: number): number {
  const clamped = Math.max(0, Math.min(1, randomValue));
  return Math.round(minMs + (maxMs - minMs) * clamped);
}

const MASTER_TARGET_GAIN = 0.22;

export class JapaneseAmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private echoInput: GainNode | null = null;
  private breezeSource: AudioBufferSourceNode | null = null;
  private breezeLfo: OscillatorNode | null = null;
  private chimeTimer: number | null = null;
  private birdTimer: number | null = null;
  private running = false;

  public isRunning(): boolean {
    return this.running;
  }

  public start(): void {
    if (this.running || typeof window === 'undefined') return;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.buildMasterGraph(this.ctx);
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    this.running = true;

    const now = this.ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(MASTER_TARGET_GAIN, now + 0.85);
    }

    // Play an immediate gentle welcome chime slightly after fade-in so toggling feels responsive
    this.chimeTimer = window.setTimeout(() => {
      if (!this.running) return;
      this.triggerWindChimeCluster();
      this.scheduleNextChime();
    }, 550);

    this.birdTimer = window.setTimeout(() => {
      if (!this.running) return;
      this.triggerBirdCall();
      this.scheduleNextBird();
    }, 2400);
  }

  public stop(): void {
    if (!this.running) return;
    this.running = false;

    if (this.chimeTimer !== null) {
      window.clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (this.birdTimer !== null) {
      window.clearTimeout(this.birdTimer);
      this.birdTimer = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.45);

      const ctxRef = this.ctx;
      window.setTimeout(() => {
        if (!this.running && ctxRef.state === 'running') {
          void ctxRef.suspend();
        }
      }, 520);
    }
  }

  public dispose(): void {
    this.stop();
    try {
      this.breezeSource?.stop();
      this.breezeLfo?.stop();
    } catch {
      // Ignore already stopped sources
    }
    this.breezeSource = null;
    this.breezeLfo = null;
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.masterGain = null;
    this.echoInput = null;
  }

  private buildMasterGraph(ctx: AudioContext): void {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.connect(ctx.destination);
    this.masterGain = master;

    // Gentle valley stereo-like feedback echo bus for distant spaciousness
    const echoIn = ctx.createGain();
    echoIn.gain.value = 1.0;

    const delay = ctx.createDelay(1.2);
    delay.delayTime.value = 0.34;

    const feedback = ctx.createGain();
    feedback.gain.value = 0.32;

    const echoFilter = ctx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.value = 2600;

    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.28;

    echoIn.connect(master);
    echoIn.connect(delay);
    delay.connect(echoFilter);
    echoFilter.connect(feedback);
    feedback.connect(delay);
    echoFilter.connect(wetGain);
    wetGain.connect(master);

    this.echoInput = echoIn;

    // Soft filtered mountain breeze noise bed (4-second seamless brown-pink noise loop)
    const sampleRate = ctx.sampleRate;
    const bufferLength = sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferLength, sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferLength; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.03 * white) / 1.03;
      data[i] = lastOut * 2.4;
    }

    const breeze = ctx.createBufferSource();
    breeze.buffer = noiseBuffer;
    breeze.loop = true;

    const breezeFilter = ctx.createBiquadFilter();
    breezeFilter.type = 'bandpass';
    breezeFilter.frequency.value = 340;
    breezeFilter.Q.value = 0.9;

    const breezeGain = ctx.createGain();
    breezeGain.gain.value = 0.085;

    // Slow breathing breeze LFO
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.09;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 120;
    lfo.connect(lfoDepth);
    lfoDepth.connect(breezeFilter.frequency);

    breeze.connect(breezeFilter);
    breezeFilter.connect(breezeGain);
    breezeGain.connect(master);

    breeze.start();
    lfo.start();

    this.breezeSource = breeze;
    this.breezeLfo = lfo;
  }

  private scheduleNextChime(): void {
    if (!this.running) return;
    const delayMs = computeNextIntervalMs(2800, 6400, Math.random());
    this.chimeTimer = window.setTimeout(() => {
      if (!this.running) return;
      this.triggerWindChimeCluster();
      this.scheduleNextChime();
    }, delayMs);
  }

  private scheduleNextBird(): void {
    if (!this.running) return;
    const delayMs = computeNextIntervalMs(5400, 11800, Math.random());
    this.birdTimer = window.setTimeout(() => {
      if (!this.running) return;
      this.triggerBirdCall();
      this.scheduleNextBird();
    }, delayMs);
  }

  private triggerWindChimeCluster(): void {
    if (!this.ctx || !this.echoInput) return;
    const notesInGust = Math.random() < 0.45 ? 2 : 1;
    for (let i = 0; i < notesInGust; i++) {
      const offset = i * (0.28 + Math.random() * 0.34);
      const freq = selectChimeFrequency(Math.random());
      const pan = (Math.random() - 0.5) * 0.7;
      this.playSingleFurinChime(freq, this.ctx.currentTime + offset, pan);
    }
  }

  private playSingleFurinChime(baseFreq: number, startTime: number, panValue: number): void {
    if (!this.ctx || !this.echoInput) return;
    const ctx = this.ctx;

    const noteBus = ctx.createGain();
    noteBus.gain.value = 0.14 + Math.random() * 0.07;

    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(panValue, startTime);
      noteBus.connect(panner);
      panner.connect(this.echoInput);
    } else {
      noteBus.connect(this.echoInput);
    }

    FURIN_OVERTONE_RATIOS.forEach(({ ratio, gain, decay }) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * ratio, startTime);

      env.gain.setValueAtTime(0.0001, startTime);
      env.gain.linearRampToValueAtTime(gain, startTime + 0.012);
      env.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

      osc.connect(env);
      env.connect(noteBus);
      osc.start(startTime);
      osc.stop(startTime + decay + 0.05);
    });
  }

  private triggerBirdCall(): void {
    if (!this.ctx || !this.echoInput) return;
    if (Math.random() < 0.62) {
      this.playUguisuWarblerCall(this.ctx.currentTime + 0.05);
    } else {
      this.playDistantMountainChirp(this.ctx.currentTime + 0.05);
    }
  }

  /**
   * Subtle Japanese Bush Warbler (uguisu — "ho... ho-ke-kyo")
   * sculpted with pure sine tone glides and soft distant attenuation.
   */
  private playUguisuWarblerCall(startTime: number): void {
    if (!this.ctx || !this.echoInput) return;
    const ctx = this.ctx;

    const birdBus = ctx.createGain();
    birdBus.gain.value = 0.11;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 3400;

    if (typeof ctx.createStereoPanner === 'function') {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(-0.45 + Math.random() * 0.9, startTime);
      birdBus.connect(lowpass);
      lowpass.connect(panner);
      panner.connect(this.echoInput);
    } else {
      birdBus.connect(lowpass);
      lowpass.connect(this.echoInput);
    }

    // Phrase 1: soft sustained "hō..."
    const osc1 = ctx.createOscillator();
    const env1 = ctx.createGain();
    osc1.type = 'sine';
    const base = 1420 + Math.random() * 140;
    osc1.frequency.setValueAtTime(base, startTime);
    osc1.frequency.exponentialRampToValueAtTime(base * 1.07, startTime + 0.48);

    env1.gain.setValueAtTime(0.0001, startTime);
    env1.gain.linearRampToValueAtTime(0.65, startTime + 0.14);
    env1.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.52);

    osc1.connect(env1);
    env1.connect(birdBus);
    osc1.start(startTime);
    osc1.stop(startTime + 0.56);

    // Phrase 2: graceful "hokekyo" trill after gentle pause
    const p2 = startTime + 0.72;
    const notes: Array<[number, number, number]> = [
      [0.0, base * 1.32, 0.09],
      [0.11, base * 1.66, 0.11],
      [0.24, base * 1.44, 0.1],
      [0.36, base * 1.78, 0.16],
    ];

    notes.forEach(([offset, freq, dur]) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      const t = p2 + offset;
      osc.frequency.setValueAtTime(freq * 0.96, t);
      osc.frequency.exponentialRampToValueAtTime(freq, t + dur * 0.65);

      env.gain.setValueAtTime(0.0001, t);
      env.gain.linearRampToValueAtTime(0.75, t + 0.025);
      env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(env);
      env.connect(birdBus);
      osc.start(t);
      osc.stop(t + dur + 0.03);
    });
  }

  /** Soft, brief distant mountain songbird double-chirp */
  private playDistantMountainChirp(startTime: number): void {
    if (!this.ctx || !this.echoInput) return;
    const ctx = this.ctx;

    const bus = ctx.createGain();
    bus.gain.value = 0.085;
    bus.connect(this.echoInput);

    for (let i = 0; i < 2; i++) {
      const t = startTime + i * 0.19;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      const startFreq = 2650 + Math.random() * 450;
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 1.24, t + 0.075);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 0.94, t + 0.13);

      env.gain.setValueAtTime(0.0001, t);
      env.gain.linearRampToValueAtTime(0.7, t + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

      osc.connect(env);
      env.connect(bus);
      osc.start(t);
      osc.stop(t + 0.17);
    }
  }
}

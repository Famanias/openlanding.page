/**
 * Pure Web Audio API procedural Japanese garden ambience synthesizer.
 * Generates soft bamboo-spout water trickle + gentle morning breeze without external audio files.
 * Stays inert until explicitly enabled via user interaction.
 */

export class PondGardenAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private trickleTimer = 0;
  private lfoOsc: OscillatorNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private enabled = false;
  private disposed = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public async setEnabled(next: boolean): Promise<boolean> {
    if (this.disposed) return false;
    this.enabled = next;

    if (!next) {
      this.stopTimer();
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0.0001, now, 0.14);
      }
      return false;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) {
        this.enabled = false;
        return false;
      }

      if (!this.ctx) {
        this.ctx = new AudioCtx();
        this.buildGraph(this.ctx);
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      if (this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0.11, now, 0.35);
      }

      this.startTrickleLoop();
      return true;
    } catch {
      this.enabled = false;
      return false;
    }
  }

  private buildGraph(ctx: AudioContext): void {
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    this.masterGain = master;

    // 3-second seamless pink/brown noise buffer for soft water & canopy air
    const sampleRate = ctx.sampleRate;
    const len = sampleRate * 3;
    const buffer = ctx.createBuffer(2, len, sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      let seed = ch === 0 ? 1337 : 7331;
      for (let i = 0; i < len; i++) {
        seed = (seed * 16807) % 2147483647;
        const white = (seed / 2147483647) * 2 - 1;
        b0 = 0.997 * b0 + white * 0.029;
        b1 = 0.985 * b1 + white * 0.032;
        b2 = 0.95 * b2 + white * 0.048;
        data[i] = (b0 + b1 + b2) * 0.24;
      }
      // Smooth loop seam crossfade at ends
      const fadeSamples = Math.min(2048, Math.floor(len * 0.05));
      for (let i = 0; i < fadeSamples; i++) {
        const t = i / fadeSamples;
        const tailIdx = len - fadeSamples + i;
        const headVal = data[i];
        data[i] = headVal * t + data[tailIdx] * (1 - t);
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const waterBand = ctx.createBiquadFilter();
    waterBand.type = 'bandpass';
    waterBand.frequency.value = 620;
    waterBand.Q.value = 0.72;

    const streamGain = ctx.createGain();
    streamGain.gain.value = 0.34;

    // Gentle slow breathing modulation on the ambient air/stream
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.14;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 140;
    lfo.connect(lfoDepth);
    lfoDepth.connect(waterBand.frequency);

    noise.connect(waterBand);
    waterBand.connect(streamGain);
    streamGain.connect(master);

    noise.start();
    lfo.start();
    this.noiseSource = noise;
    this.lfoOsc = lfo;
  }

  private startTrickleLoop(): void {
    this.stopTimer();
    if (!this.enabled || this.disposed) return;

    const scheduleNext = () => {
      if (!this.enabled || this.disposed) return;
      this.triggerDroplet();
      const nextDelay = 280 + Math.random() * 520;
      this.trickleTimer = window.setTimeout(scheduleNext, nextDelay);
    };
    this.trickleTimer = window.setTimeout(scheduleNext, 180);
  }

  private triggerDroplet(): void {
    if (!this.ctx || !this.masterGain || !this.enabled || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 780 + Math.random() * 680;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.48, now + 0.055);

    const amp = 0.025 + Math.random() * 0.03;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(amp, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  private stopTimer(): void {
    if (this.trickleTimer) {
      window.clearTimeout(this.trickleTimer);
      this.trickleTimer = 0;
    }
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.enabled = false;
    this.stopTimer();
    try {
      this.noiseSource?.stop();
      this.lfoOsc?.stop();
      void this.ctx?.close();
    } catch {
      // Ignore audio teardown exceptions
    }
    this.noiseSource = null;
    this.lfoOsc = null;
    this.masterGain = null;
    this.ctx = null;
  }
}

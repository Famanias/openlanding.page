/**
 * Opt-in procedural Web Audio API sound synthesizer for WARP & WANDER.
 * Strictly OFF by default as required by Section 5 & Section 8.8 of the specification.
 * Generates original warm 16-bit-inspired chimes and tactile clicks without external audio files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): boolean {
    this.enabled = next;
    if (next) {
      this.ensureContext();
      this.playTone(523.25, 0.08, 'triangle', 0.08); // C5 gentle confirmation chime
      setTimeout(() => this.playTone(659.25, 0.11, 'triangle', 0.08), 70); // E5
    }
    return this.enabled;
  }

  public toggle(): boolean {
    return this.setEnabled(!this.enabled);
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'triangle',
    volume = 0.08
  ): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      // Add slight ±4% organic pitch variation
      const detune = 1 + (Math.random() - 0.5) * 0.03;
      osc.frequency.setValueAtTime(freq * detune, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch {
      // Ignore audio errors in restricted headless environments
    }
  }

  public playButtonClick(): void {
    this.playTone(440, 0.05, 'square', 0.04);
  }

  public playArtifactDiscover(): void {
    if (!this.enabled) return;
    this.playTone(587.33, 0.09, 'triangle', 0.09); // D5
    setTimeout(() => this.playTone(783.99, 0.12, 'triangle', 0.09), 75); // G5
    setTimeout(() => this.playTone(1046.5, 0.18, 'sine', 0.1), 150); // C6
  }

  public playJump(): void {
    this.playTone(349.23, 0.08, 'triangle', 0.07);
    setTimeout(() => this.playTone(466.16, 0.09, 'triangle', 0.06), 45);
  }

  public playShardPickup(): void {
    if (!this.enabled) return;
    this.playTone(659.25, 0.08, 'triangle', 0.09);
    setTimeout(() => this.playTone(880, 0.12, 'triangle', 0.09), 65);
    setTimeout(() => this.playTone(1318.5, 0.2, 'sine', 0.1), 130);
  }

  public playVictoryFanfare(): void {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 0.18, 'triangle', 0.1), idx * 95);
    });
  }
}

export const soundEngine = new SoundEngine();

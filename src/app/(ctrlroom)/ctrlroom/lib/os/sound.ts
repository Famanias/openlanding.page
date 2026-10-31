// Optional original UI sound synthesizer using Web Audio API.
// Strictly opt-in (disabled by default) per Section 6 & Section 9 of specification.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    if (next && typeof window !== 'undefined' && !this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playKeyClick(freq = 520): void {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, this.ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.055);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore audio context restrictions
    }
  }

  public playProfileScan(): void {
    if (!this.enabled || !this.ctx) return;
    [330, 440, 587, 659].forEach((f, idx) => {
      setTimeout(() => this.playKeyClick(f), idx * 45);
    });
  }
}

export const soundEngine = new SoundEngine();

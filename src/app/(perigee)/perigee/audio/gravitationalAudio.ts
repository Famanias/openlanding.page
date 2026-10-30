/**
 * Synthesized Web Audio API soundscape for PERIGEE:
 * - Deep relativistic gravitational sub-bass drone (modulated by orbital radius r and lensingMass)
 * - Geiger-like high-energy photon arrival clicks near the Photon Sphere & ISCO
 * - Geodesic launch & polar jet telemetry lock harmonics
 * Muted by default.
 */

class GravitationalAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private isMuted = true;
  private geigerTimer: number | null = null;
  private currentRadiusRs = 38.0;

  public toggleMute(): boolean {
    if (this.isMuted) {
      this.enable();
    } else {
      this.disable();
    }
    return !this.isMuted;
  }

  public getEnabled(): boolean {
    return !this.isMuted;
  }

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.0;
    this.masterGain.connect(this.ctx.destination);

    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.value = 95;
    this.droneFilter.Q.value = 2.4;
    this.droneFilter.connect(this.masterGain);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.value = 42.0;

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.value = 63.0;

    const subGain1 = this.ctx.createGain();
    subGain1.gain.value = 0.14;
    const subGain2 = this.ctx.createGain();
    subGain2.gain.value = 0.22;

    this.droneOsc1.connect(subGain1);
    this.droneOsc2.connect(subGain2);
    subGain1.connect(this.droneFilter);
    subGain2.connect(this.droneFilter);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  public enable() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isMuted = false;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(0.45, now, 0.35);
    this.scheduleGeigerLoop();
  }

  public disable() {
    this.isMuted = true;
    if (this.geigerTimer !== null) {
      window.clearTimeout(this.geigerTimer);
      this.geigerTimer = null;
    }
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(0.0, now, 0.15);
  }

  public updateTelemetry(rInRs: number, lensingMass: number) {
    this.currentRadiusRs = rInRs;
    if (this.isMuted || !this.ctx || !this.droneOsc1 || !this.droneOsc2 || !this.droneFilter) return;

    const proximity = Math.max(0, Math.min(1, (38 - rInRs) / 36.8));
    const baseFreq = 38 + proximity * 28 + (lensingMass - 1.5) * 8;
    const now = this.ctx.currentTime;
    this.droneOsc1.frequency.setTargetAtTime(baseFreq, now, 0.1);
    this.droneOsc2.frequency.setTargetAtTime(baseFreq * 1.498, now, 0.1);
    this.droneFilter.frequency.setTargetAtTime(75 + proximity * 190, now, 0.12);
  }

  private scheduleGeigerLoop = () => {
    if (this.isMuted) return;
    this.triggerPhotonClick();
    // Clicks become more frequent closer to the photon sphere (r ~ 1.5 Rs)
    const normR = Math.max(0.08, Math.min(1, this.currentRadiusRs / 25));
    const nextDelayMs = 110 + normR * 680 + Math.random() * 350;
    this.geigerTimer = window.setTimeout(this.scheduleGeigerLoop, nextDelayMs);
  };

  public triggerPhotonClick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800 + Math.random() * 1400, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.018);

    clickGain.gain.setValueAtTime(0.08, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

    osc.connect(clickGain);
    clickGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.02);
  }

  public triggerGeodesicLaunch(impactParameterB: number) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    const startFreq = Math.max(220, Math.min(880, 520 - impactParameterB * 40));
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.85, now + 0.45);

    g.gain.setValueAtTime(0.16, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.52);
  }

  public triggerEphemerisLock() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    [440, 659.25, 880].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      g.gain.setValueAtTime(0.12, now + idx * 0.09);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.09 + 0.65);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.7);
    });
  }
}

export const gravitationalAudio = new GravitationalAudioEngine();

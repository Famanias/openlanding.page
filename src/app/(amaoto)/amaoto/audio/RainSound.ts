/** Created only inside a click handler. No assets, autoplay, or remote requests. */
export class RainSound {
  private context: AudioContext;
  private gain: GainNode;
  private source: AudioBufferSourceNode;
  private timer: ReturnType<typeof setInterval>;
  private enabled = false;
  private intensity = 0.15;
  private disposed = false;
  private drops = new Set<OscillatorNode>();
  constructor() {
    const context = (this.context = new AudioContext());
    const buffer = context.createBuffer(
        1,
        context.sampleRate * 3,
        context.sampleRate,
      ),
      channel = buffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < channel.length; i++) {
      brown = (brown + (Math.random() * 2 - 1) * 0.03) / 1.02;
      channel[i] = brown * 3.5;
    }
    this.source = context.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1900;
    this.gain = context.createGain();
    this.gain.gain.value = 0;
    this.source.connect(filter).connect(this.gain).connect(context.destination);
    this.source.start();
    this.timer = setInterval(() => {
      if (
        !this.enabled ||
        context.state !== "running" ||
        Math.random() > 0.25 * this.intensity
      )
        return;
      const oscillator = context.createOscillator(),
        drop = context.createGain();
      this.drops.add(oscillator);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        700 + Math.random() * 500,
        context.currentTime,
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        180,
        context.currentTime + 0.09,
      );
      drop.gain.setValueAtTime(0.001, context.currentTime);
      drop.gain.linearRampToValueAtTime(
        0.014 * this.intensity,
        context.currentTime + 0.005,
      );
      drop.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.12,
      );
      oscillator.connect(drop).connect(this.gain);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.14);
      oscillator.onended = () => {
        oscillator.disconnect();
        drop.disconnect();
        this.drops.delete(oscillator);
      };
    }, 240);
  }
  async setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled && !document.hidden) await this.context.resume();
    this.ramp();
  }
  setIntensity(n: number) {
    if (Math.abs(n - this.intensity) < 0.02) return;
    this.intensity = Math.max(0.08, Math.min(1, n));
    this.ramp();
  }
  private ramp() {
    if (this.disposed) return;
    const now = this.context.currentTime;
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setTargetAtTime(
      this.enabled ? 0.045 * this.intensity : 0,
      now,
      0.2,
    );
  }
  visibility() {
    if (this.disposed) return;
    if (document.hidden) void this.context.suspend();
    else if (this.enabled) void this.context.resume();
  }
  dispose() {
    this.disposed = true;
    clearInterval(this.timer);
    this.drops.forEach((node) => {
      node.stop();
      node.disconnect();
    });
    this.drops.clear();
    this.source.stop();
    this.source.disconnect();
    this.gain.disconnect();
    void this.context.close();
  }
}

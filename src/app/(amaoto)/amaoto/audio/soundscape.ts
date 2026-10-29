import type { ChapterProgressState } from "../logic/chapters";
import { createSeededRandom } from "../logic/rng";
/** All sources are synthesized after an explicit sound-button gesture. */
export class Soundscape {
  private context = new AudioContext();
  private master = this.context.createGain();
  private nodes: AudioNode[] = [];
  private sources: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private voices = new Set<OscillatorNode>();
  private timer: ReturnType<typeof setInterval>;
  private enabled = false;
  private disposed = false;
  private workshopWeight = 0;
  private random = createSeededRandom(481);
  private room = this.context.createGain();
  private workshop = this.context.createGain();
  private paper = this.context.createGain();
  private rain = this.context.createGain();
  private paperFilter = this.context.createBiquadFilter();
  private rainFilter = this.context.createBiquadFilter();
  constructor() {
    const c = this.context;
    this.master.gain.value = 0;
    this.master.connect(c.destination);
    for (const g of [this.room, this.workshop, this.paper, this.rain]) {
      g.gain.value = 0;
      g.connect(this.master);
      this.nodes.push(g);
    }
    this.room.gain.value = 0.12;
    for (const [frequency, type] of [
      [110, "sine"],
      [165, "triangle"],
    ] as const) {
      const o = c.createOscillator(),
        g = c.createGain(),
        f = c.createBiquadFilter();
      o.frequency.value = frequency;
      o.type = type;
      f.type = "lowpass";
      f.frequency.value = 460;
      g.gain.value = 0.18;
      o.connect(f).connect(g).connect(this.room);
      o.start();
      this.sources.push(o);
      this.nodes.push(f, g);
    }
    const buffer = c.createBuffer(1, c.sampleRate * 3, c.sampleRate),
      data = buffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < data.length; i++) {
      brown = (brown + (this.random() * 2 - 1) * 0.03) / 1.02;
      data[i] = brown * 3.5;
    }
    const noise = (
      filter: BiquadFilterNode,
      gain: GainNode,
      frequency: number,
      type: BiquadFilterType,
    ) => {
      const s = c.createBufferSource();
      s.buffer = buffer;
      s.loop = true;
      filter.type = type;
      filter.frequency.value = frequency;
      s.connect(filter).connect(gain);
      s.start();
      this.sources.push(s);
      this.nodes.push(filter);
    };
    const air = c.createBiquadFilter();
    noise(air, this.workshop, 850, "bandpass");
    noise(this.paperFilter, this.paper, 450, "lowpass");
    noise(this.rainFilter, this.rain, 1200, "bandpass");
    this.timer = setInterval(() => {
      if (!this.enabled || c.state !== "running") return;
      if (this.random() < this.workshopWeight * 0.22)
        this.ping(260 + this.random() * 180, 0.055, 0.16, "triangle");
      else if (this.random() < 0.13)
        this.ping(650 + this.random() * 400, 0.04, 0.12, "sine");
    }, 280);
  }
  private target(param: AudioParam, value: number, time = 0.12) {
    if (this.disposed) return;
    param.setTargetAtTime(value, this.context.currentTime, time);
  }
  private ping(
    frequency: number,
    gain: number,
    duration: number,
    type: OscillatorType,
    ratio = 0.55,
  ) {
    const c = this.context,
      o = c.createOscillator(),
      g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(frequency, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(
      frequency * ratio,
      c.currentTime + duration,
    );
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(c.currentTime + duration + 0.02);
    this.voices.add(o);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
      this.voices.delete(o);
    };
  }
  async setEnabled(value: boolean) {
    if (this.disposed) return;
    this.enabled = value;
    if (value && !document.hidden) await this.context.resume();
    this.target(this.master.gain, value ? 0.06 : 0, 0.06);
  }
  updateProgress(state: ChapterProgressState, rain: number, timeOfDay: number) {
    if (this.disposed) return;
    this.workshopWeight = state.worldVisibility.workshop;
    this.target(this.workshop.gain, this.workshopWeight * 0.22);
    this.target(this.paper.gain, state.worldVisibility.paper * 0.18);
    this.target(this.rain.gain, rain * 0.7);
    this.target(this.paperFilter.frequency, 1600 - state.paperDive * 1250);
    this.target(this.rainFilter.frequency, 600 + timeOfDay * 1000);
  }
  gust() {
    if (!this.enabled || this.context.state !== "running") return;
    this.ping(660, 0.12, 0.9, "sine", 0.75);
    this.ping(990, 0.055, 0.9, "sine", 0.75);
  }
  visibility() {
    if (this.disposed) return;
    if (document.hidden) void this.context.suspend();
    else if (this.enabled) void this.context.resume();
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    clearInterval(this.timer);
    this.voices.forEach((o) => {
      o.stop();
      o.disconnect();
    });
    this.voices.clear();
    this.sources.forEach((s) => {
      s.stop();
      s.disconnect();
    });
    this.nodes.forEach((n) => n.disconnect());
    this.master.disconnect();
    void this.context.close();
  }
}

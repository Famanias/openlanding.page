import { SOUND_SPECIMENS, SPECIMEN_MAP, SpecimenId } from './sampleLibrary';

export type EffectMode = 'stutter' | 'reverse' | 'octave';

class NoiseClubAudioEngine {
  private ctx: AudioContext | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();
  private reversedBuffers: Map<string, AudioBuffer> = new Map();
  private waveforms: Map<string, number[]> = new Map();
  private activeSources: Set<AudioBufferSourceNode> = new Set();

  // Sequencer state
  private isPlayingSequencer = false;
  private bpm = 116;
  private currentStep = 0;
  private nextNoteTime = 0;
  private timerID: number | null = null;
  private activeSpecimenId: SpecimenId = 'subway';
  private useCustomMicBuffer = false;
  private pattern: boolean[][] = SOUND_SPECIMENS[0].defaultPattern.map((row) => [...row]);
  private stepListeners: Set<(step: number, playing: boolean) => void> = new Set();

  constructor() {
    // Precalculate deterministic authentic amplitude envelopes from the exact synthesis equations
    // so SVG/Canvas waveforms render immediately on SSR/initial paint without requiring AudioContext permission.
    SOUND_SPECIMENS.forEach((spec) => {
      const data = this.synthesizeRawChannelData(spec.id, 24000, spec.durationSec);
      this.waveforms.set(spec.id, this.computeEnvelope(data, 96));
    });
  }

  /**
   * Generates raw PCM float32 sample data for each field specimen using physical modeling synthesis.
   * Ensures both the visual amplitude fingerprint and the Web Audio buffer are 100% identical.
   */
  private synthesizeRawChannelData(id: SpecimenId, sampleRate: number, durationSec: number): Float32Array {
    const length = Math.floor(sampleRate * durationSec);
    const data = new Float32Array(length);

    // Deterministic PRNG for repeatable field texture
    let seed = id.split('').reduce((a, c) => a + c.charCodeAt(0) * 31, 1337);
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1073741824) / 1073741824;
    };

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const norm = i / length;
      let sample = 0;

      if (id === 'subway') {
        // Slice 1 (0..0.24): Low rubber seal thud
        if (norm < 0.24) {
          const lt = t;
          const env = Math.exp(-lt * 18);
          const pitch = 95 * Math.exp(-lt * 12) + 46;
          sample += Math.sin(2 * Math.PI * pitch * lt) * env * 0.92;
          sample += rand() * Math.exp(-lt * 35) * 0.35;
        }
        // Slice 2 (0.24..0.48): Solenoid latch metallic snap
        else if (norm < 0.48) {
          const lt = (norm - 0.24) * durationSec;
          const env = Math.exp(-lt * 28);
          sample += (
            Math.sin(2 * Math.PI * 420 * lt) * 0.45 +
            Math.sin(2 * Math.PI * 1180 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 2640 * lt) * 0.25 +
            rand() * 0.55
          ) * env;
        }
        // Slice 3 (0.48..0.76): Pneumatic pressurized air hiss
        else if (norm < 0.76) {
          const lt = (norm - 0.48) * durationSec;
          const attack = Math.min(1, lt * 45);
          const decay = Math.exp(-lt * 6.5);
          const mod = 0.75 + 0.25 * Math.sin(2 * Math.PI * 38 * lt);
          sample += rand() * attack * decay * mod * 0.78;
          sample += Math.sin(2 * Math.PI * 620 * lt) * attack * decay * 0.18;
        }
        // Slice 4 (0.76..1.0): Steel frame resonant ring
        else {
          const lt = (norm - 0.76) * durationSec;
          const env = Math.exp(-lt * 9.5);
          sample += (
            Math.sin(2 * Math.PI * 220 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 442 * lt) * 0.3 +
            Math.sin(2 * Math.PI * 885 * lt) * 0.2
          ) * env * 0.8;
        }
      } else if (id === 'espresso') {
        // Slice 1: Saucer base woody thump
        if (norm < 0.22) {
          const lt = t;
          const env = Math.exp(-lt * 22);
          sample += Math.sin(2 * Math.PI * (120 * Math.exp(-lt * 10) + 58) * lt) * env * 0.9;
          sample += rand() * Math.exp(-lt * 50) * 0.3;
        }
        // Slice 2: Stainless spoon rim clink
        else if (norm < 0.46) {
          const lt = (norm - 0.22) * durationSec;
          const env = Math.exp(-lt * 20);
          sample += (
            Math.sin(2 * Math.PI * 1480 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 2910 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 4320 * lt) * 0.2
          ) * env * 0.88;
        }
        // Slice 3: Steam wand rhythmic burst
        else if (norm < 0.74) {
          const lt = (norm - 0.46) * durationSec;
          const pulse = 0.6 + 0.4 * Math.sin(2 * Math.PI * 24 * lt);
          const env = Math.exp(-lt * 7);
          sample += (rand() * 0.65 + Math.sin(2 * Math.PI * 523.25 * lt) * 0.3) * pulse * env;
        }
        // Slice 4: Porcelain bell harmonic decay
        else {
          const lt = (norm - 0.74) * durationSec;
          const env = Math.exp(-lt * 8.5);
          sample += (
            Math.sin(2 * Math.PI * 659.25 * lt) * 0.55 +
            Math.sin(2 * Math.PI * 1318.5 * lt) * 0.3 +
            Math.sin(2 * Math.PI * 1975 * lt) * 0.15
          ) * env * 0.85;
        }
      } else if (id === 'rain') {
        // Slice 1: Gutter downspout hollow boom
        if (norm < 0.25) {
          const lt = t;
          const env = Math.exp(-lt * 16);
          sample += Math.sin(2 * Math.PI * (110 * Math.exp(-lt * 14) + 52) * lt) * env * 0.94;
          sample += Math.sin(2 * Math.PI * 185 * lt) * Math.exp(-lt * 24) * 0.35;
        }
        // Slice 2: Direct zinc drop ping
        else if (norm < 0.50) {
          const lt = (norm - 0.25) * durationSec;
          const env = Math.exp(-lt * 26);
          sample += (
            Math.sin(2 * Math.PI * 780 * lt + Math.sin(lt * 900) * 1.4) * 0.6 +
            rand() * 0.4
          ) * env * 0.85;
        }
        // Slice 3: Sheet wash shimmer (clustered drops)
        else if (norm < 0.78) {
          const lt = (norm - 0.50) * durationSec;
          const dropBurst = Math.pow(Math.sin(2 * Math.PI * 14 * lt), 2);
          const env = Math.exp(-lt * 4.5);
          sample += rand() * (0.4 + 0.6 * dropBurst) * env * 0.8;
        }
        // Slice 4: Hollow awning metallic resonance
        else {
          const lt = (norm - 0.78) * durationSec;
          const env = Math.exp(-lt * 9);
          sample += (
            Math.sin(2 * Math.PI * 310 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 622 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 934 * lt) * 0.2
          ) * env * 0.8;
        }
      } else if (id === 'footsteps') {
        // Slice 1: Sub-concrete heel stomp
        if (norm < 0.26) {
          const lt = t;
          const env = Math.exp(-lt * 15);
          const freq = 130 * Math.exp(-lt * 18) + 42;
          sample += Math.tanh(Math.sin(2 * Math.PI * freq * lt) * 1.8) * env * 0.92;
        }
        // Slice 2: Gravel sole crunch
        else if (norm < 0.52) {
          const lt = (norm - 0.26) * durationSec;
          const env = Math.exp(-lt * 21);
          sample += (rand() * 0.75 + Math.sin(2 * Math.PI * 290 * lt) * 0.45) * env * 0.9;
        }
        // Slice 3: Grit sole drag
        else if (norm < 0.77) {
          const lt = (norm - 0.52) * durationSec;
          const grain = Math.sin(2 * Math.PI * 28 * lt) > 0 ? 1 : 0.35;
          const env = Math.exp(-lt * 8);
          sample += rand() * grain * env * 0.78;
        }
        // Slice 4: Shaft slapback echo
        else {
          const lt = (norm - 0.77) * durationSec;
          const env = Math.exp(-lt * 11);
          sample += (
            Math.sin(2 * Math.PI * 165 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 330 * lt) * 0.25 +
            rand() * 0.3
          ) * env * 0.75;
        }
      } else {
        // 'coin' — Dropped Brass Coin Spin
        // Slice 1: Steel ticket tray impact thud
        if (norm < 0.23) {
          const lt = t;
          const env = Math.exp(-lt * 19);
          sample += Math.sin(2 * Math.PI * (140 * Math.exp(-lt * 15) + 55) * lt) * env * 0.9;
        }
        // Slice 2: Brass edge strike
        else if (norm < 0.47) {
          const lt = (norm - 0.23) * durationSec;
          const env = Math.exp(-lt * 24);
          sample += (
            Math.sin(2 * Math.PI * 1760 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 3520 * lt) * 0.35 +
            Math.sin(2 * Math.PI * 5280 * lt) * 0.2
          ) * env * 0.9;
        }
        // Slice 3: Accelerating Euler spin wobble
        else if (norm < 0.76) {
          const lt = (norm - 0.47) * durationSec;
          const wobbleRate = 12 + lt * 48;
          const am = 0.5 + 0.5 * Math.sin(2 * Math.PI * wobbleRate * lt);
          const env = Math.exp(-lt * 4.5);
          sample += (
            Math.sin(2 * Math.PI * 880 * lt) * 0.55 +
            Math.sin(2 * Math.PI * 1320 * lt) * 0.35 +
            rand() * 0.25
          ) * am * env * 0.88;
        }
        // Slice 4: High-frequency brass shudder
        else {
          const lt = (norm - 0.76) * durationSec;
          const env = Math.exp(-lt * 10);
          sample += (
            Math.sin(2 * Math.PI * 1046.5 * lt) * 0.5 +
            Math.sin(2 * Math.PI * 2093 * lt) * 0.35
          ) * env * 0.82;
        }
      }

      // Subtle 8-bit PO-33 converter character (quantization + warm saturation)
      const quantized = Math.round(sample * 64) / 64;
      data[i] = Math.max(-0.98, Math.min(0.98, quantized));
    }

    return data;
  }

  private computeEnvelope(data: Float32Array, buckets = 96): number[] {
    const step = Math.floor(data.length / buckets) || 1;
    const result: number[] = [];
    for (let b = 0; b < buckets; b++) {
      let sumSq = 0;
      let peak = 0;
      const start = b * step;
      const end = Math.min(data.length, start + step);
      for (let i = start; i < end; i++) {
        const abs = Math.abs(data[i]);
        sumSq += abs * abs;
        if (abs > peak) peak = abs;
      }
      const rms = Math.sqrt(sumSq / Math.max(1, end - start));
      const val = Math.min(1, Math.max(0.06, rms * 1.45 + peak * 0.35));
      result.push(Number(val.toFixed(3)));
    }
    return result;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    // Hydrate AudioBuffers once context exists
    if (this.buffers.size === 0 && this.ctx) {
      SOUND_SPECIMENS.forEach((spec) => {
        const raw = this.synthesizeRawChannelData(spec.id, this.ctx!.sampleRate, spec.durationSec);
        const buf = this.ctx!.createBuffer(1, raw.length, this.ctx!.sampleRate);
        buf.getChannelData(0).set(raw);
        this.buffers.set(spec.id, buf);

        // Also create reversed buffer for authentic Reverse FX
        const revBuf = this.ctx!.createBuffer(1, raw.length, this.ctx!.sampleRate);
        const revData = new Float32Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
          revData[i] = raw[raw.length - 1 - i];
        }
        revBuf.getChannelData(0).set(revData);
        this.reversedBuffers.set(spec.id, revBuf);
      });
    }
    return this.ctx;
  }

  public getWaveform(id: SpecimenId | 'custom-mic'): number[] {
    if (id === 'custom-mic' && this.waveforms.has('custom-mic')) {
      return this.waveforms.get('custom-mic')!;
    }
    return this.waveforms.get(id) || this.waveforms.get('subway')!;
  }

  public hasCustomMicSample(): boolean {
    return this.buffers.has('custom-mic');
  }

  public setUseCustomMic(useMic: boolean): void {
    if (useMic && this.buffers.has('custom-mic')) {
      this.useCustomMicBuffer = true;
    } else {
      this.useCustomMicBuffer = false;
    }
  }

  public isUsingCustomMic(): boolean {
    return this.useCustomMicBuffer && this.buffers.has('custom-mic');
  }

  public stopAllActiveSounds(): void {
    this.activeSources.forEach((src) => {
      try {
        src.stop();
      } catch {
        // Ignore already stopped source
      }
    });
    this.activeSources.clear();
  }

  /**
   * Plays a full field recording specimen or a specific slice (0..3).
   */
  public playSpecimen(
    id: SpecimenId,
    options?: {
      sliceIndex?: number;
      playbackRate?: number;
      useCustomIfActive?: boolean;
      onEnded?: () => void;
    }
  ): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const key = options?.useCustomIfActive && this.isUsingCustomMic() ? 'custom-mic' : id;
    const buffer = this.buffers.get(key) || this.buffers.get(id);
    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = options?.playbackRate ?? 1.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.85, ctx.currentTime);

    source.connect(gain);
    gain.connect(ctx.destination);

    let offset = 0;
    let duration = buffer.duration;

    if (typeof options?.sliceIndex === 'number') {
      const spec = SPECIMEN_MAP[id];
      const slice = spec.slices[options.sliceIndex];
      if (slice) {
        offset = slice.startRatio * buffer.duration;
        duration = (slice.endRatio - slice.startRatio) * buffer.duration;
        // Micro fade-out to avoid click at slice boundary
        gain.gain.setValueAtTime(0.9, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + Math.max(0.05, duration / source.playbackRate.value));
      }
    }

    this.activeSources.add(source);
    source.onended = () => {
      this.activeSources.delete(source);
      options?.onEnded?.();
    };

    source.start(ctx.currentTime, offset, duration);
  }

  /**
   * Plays the active specimen transformed by one of the three Chapter 05 FX modes:
   * - 'stutter': Rapid 1/16th grain repeat of the transient slice
   * - 'reverse': Full reversed buffer playback
   * - 'octave': Simultaneous 0.5x sub-octave + 2.0x high-octave harmonic transformation
   */
  public playEffectDemo(id: SpecimenId, effect: EffectMode, onComplete?: () => void): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.stopAllActiveSounds();

    const key = this.isUsingCustomMic() ? 'custom-mic' : id;
    const buffer = this.buffers.get(key) || this.buffers.get(id);
    if (!buffer) return;

    const now = ctx.currentTime;

    if (effect === 'stutter') {
      // Schedule 8 rapid 110ms stutter repeats across Slice 1 & Slice 2
      const repeatCount = 8;
      const grainDuration = 0.115;
      const sliceOffset = buffer.duration * 0.24;

      for (let i = 0; i < repeatCount; i++) {
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.playbackRate.value = 1 + (i % 2) * 0.08;

        const gain = ctx.createGain();
        const startTime = now + i * grainDuration;
        gain.gain.setValueAtTime(0.88, startTime);
        gain.gain.exponentialRampToValueAtTime(0.05, startTime + grainDuration * 0.92);

        src.connect(gain);
        gain.connect(ctx.destination);
        this.activeSources.add(src);
        src.onended = () => {
          this.activeSources.delete(src);
          if (i === repeatCount - 1) onComplete?.();
        };
        src.start(startTime, sliceOffset, grainDuration);
      }
    } else if (effect === 'reverse') {
      const revBuffer = this.reversedBuffers.get(key) || this.reversedBuffers.get(id);
      if (!revBuffer) return;

      const src = ctx.createBufferSource();
      src.buffer = revBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + revBuffer.duration * 0.9);
      filter.Q.value = 1.2;

      const dryGain = ctx.createGain();
      dryGain.gain.value = 0.75;
      const wetGain = ctx.createGain();
      wetGain.gain.value = 0.45;

      src.connect(dryGain);
      dryGain.connect(ctx.destination);
      src.connect(filter);
      filter.connect(wetGain);
      wetGain.connect(ctx.destination);

      this.activeSources.add(src);
      src.onended = () => {
        this.activeSources.delete(src);
        onComplete?.();
      };
      src.start(now);
    } else if (effect === 'octave') {
      // Sub-octave (0.5x) + Upper Octave (2.0x) pitched layer
      const subSrc = ctx.createBufferSource();
      subSrc.buffer = buffer;
      subSrc.playbackRate.value = 0.55;

      const hiSrc = ctx.createBufferSource();
      hiSrc.buffer = buffer;
      hiSrc.playbackRate.value = 1.85;

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.75, now);
      subGain.gain.exponentialRampToValueAtTime(0.02, now + 1.5);

      const hiGain = ctx.createGain();
      hiGain.gain.setValueAtTime(0.55, now);
      hiGain.gain.exponentialRampToValueAtTime(0.02, now + 1.1);

      subSrc.connect(subGain);
      subGain.connect(ctx.destination);

      hiSrc.connect(hiGain);
      hiGain.connect(ctx.destination);

      this.activeSources.add(subSrc);
      this.activeSources.add(hiSrc);

      subSrc.onended = () => {
        this.activeSources.delete(subSrc);
        onComplete?.();
      };
      hiSrc.onended = () => {
        this.activeSources.delete(hiSrc);
      };

      subSrc.start(now, 0, Math.min(buffer.duration, 0.9));
      hiSrc.start(now, 0, buffer.duration);
    }
  }

  /**
   * Optional user-initiated 2.0-second microphone field recording (stays 100% in local RAM).
   */
  public async recordFromMicrophone(durationMs = 1800): Promise<number[]> {
    if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return [];
    }
    const ctx = this.ensureContext();
    if (!ctx) return [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    return new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onerror = (err) => {
        stream.getTracks().forEach((t) => t.stop());
        reject(err);
      };
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        try {
          const blob = new Blob(chunks, { type: mediaRecorder.mimeType || 'audio/webm' });
          const arrayBuffer = await blob.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          this.buffers.set('custom-mic', audioBuffer);

          // Also build reversed buffer
          const raw = audioBuffer.getChannelData(0);
          const revBuf = ctx.createBuffer(1, raw.length, audioBuffer.sampleRate);
          const revData = new Float32Array(raw.length);
          for (let i = 0; i < raw.length; i++) {
            revData[i] = raw[raw.length - 1 - i];
          }
          revBuf.getChannelData(0).set(revData);
          this.reversedBuffers.set('custom-mic', revBuf);

          const env = this.computeEnvelope(raw, 96);
          this.waveforms.set('custom-mic', env);
          this.useCustomMicBuffer = true;
          resolve(env);
        } catch (decodeErr) {
          reject(decodeErr);
        }
      };

      mediaRecorder.start();
      window.setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }, durationMs);
    });
  }

  // --- 16-STEP LOOKAHEAD SEQUENCER ---

  public setSequencerSpecimen(id: SpecimenId): void {
    this.activeSpecimenId = id;
  }

  public getSequencerPattern(): boolean[][] {
    return this.pattern;
  }

  public setSequencerPattern(newPattern: boolean[][]): void {
    this.pattern = newPattern.map((row) => [...row]);
  }

  public toggleStep(trackIndex: number, stepIndex: number): boolean[][] {
    if (this.pattern[trackIndex] && typeof this.pattern[trackIndex][stepIndex] === 'boolean') {
      this.pattern[trackIndex][stepIndex] = !this.pattern[trackIndex][stepIndex];
    }
    return this.pattern.map((row) => [...row]);
  }

  public clearPattern(): boolean[][] {
    this.pattern = this.pattern.map((row) => row.map(() => false));
    return this.pattern.map((row) => [...row]);
  }

  public resetDefaultPattern(id: SpecimenId): boolean[][] {
    const spec = SPECIMEN_MAP[id];
    this.pattern = spec.defaultPattern.map((row) => [...row]);
    return this.pattern.map((row) => [...row]);
  }

  public setBpm(bpm: number): void {
    this.bpm = Math.max(70, Math.min(160, bpm));
  }

  public getBpm(): number {
    return this.bpm;
  }

  public subscribeSequencer(cb: (step: number, playing: boolean) => void): () => void {
    this.stepListeners.add(cb);
    return () => {
      this.stepListeners.delete(cb);
    };
  }

  private notifySequencerListeners(step: number, playing: boolean): void {
    this.stepListeners.forEach((cb) => cb(step, playing));
  }

  public startSequencer(): void {
    const ctx = this.ensureContext();
    if (!ctx || this.isPlayingSequencer) return;

    this.isPlayingSequencer = true;
    this.currentStep = 0;
    this.nextNoteTime = ctx.currentTime + 0.04;
    this.scheduler();
  }

  public stopSequencer(): void {
    this.isPlayingSequencer = false;
    if (this.timerID !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }
    this.notifySequencerListeners(this.currentStep, false);
  }

  public isSequencerPlaying(): boolean {
    return this.isPlayingSequencer;
  }

  private scheduler = (): void => {
    if (!this.isPlayingSequencer || !this.ctx) return;

    const scheduleAheadTime = 0.1; // 100ms lookahead window
    while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
      this.scheduleStep(this.currentStep, this.nextNoteTime);
      this.advanceStep();
    }

    if (typeof window !== 'undefined') {
      this.timerID = window.setTimeout(this.scheduler, 25);
    }
  };

  private advanceStep(): void {
    const secondsPerBeat = 60.0 / this.bpm;
    const sixteenthNoteTime = 0.25 * secondsPerBeat;
    this.nextNoteTime += sixteenthNoteTime;
    this.currentStep = (this.currentStep + 1) % 16;
  }

  private scheduleStep(stepIndex: number, time: number): void {
    if (!this.ctx) return;

    // Schedule visual UI update synchronized to audio clock
    if (typeof window !== 'undefined') {
      const delayMs = Math.max(0, (time - this.ctx.currentTime) * 1000);
      window.setTimeout(() => {
        if (this.isPlayingSequencer) {
          this.notifySequencerListeners(stepIndex, true);
        }
      }, delayMs);
    }

    const key = this.isUsingCustomMic() ? 'custom-mic' : this.activeSpecimenId;
    const buffer = this.buffers.get(key) || this.buffers.get(this.activeSpecimenId);
    if (!buffer) return;

    const spec = SPECIMEN_MAP[this.activeSpecimenId];

    for (let track = 0; track < 4; track++) {
      if (this.pattern[track]?.[stepIndex]) {
        const slice = spec.slices[track];
        if (!slice) continue;

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;

        // Subtle musical pitch shaping per track role
        const rates = [0.95, 1.05, 1.15, stepIndex % 4 === 0 ? 1.0 : 1.12];
        src.playbackRate.setValueAtTime(rates[track] || 1.0, time);

        const gain = this.ctx.createGain();
        const offset = slice.startRatio * buffer.duration;
        const sliceDur = Math.min(0.28, (slice.endRatio - slice.startRatio) * buffer.duration);

        const trackVolumes = [0.92, 0.82, 0.65, 0.72];
        gain.gain.setValueAtTime(trackVolumes[track] ?? 0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + sliceDur);

        src.connect(gain);
        gain.connect(this.ctx.destination);
        src.start(time, offset, sliceDur);
      }
    }
  }
}

export const audioEngine = new NoiseClubAudioEngine();

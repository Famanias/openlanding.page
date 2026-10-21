import { SPECTRAL_PRESETS, type SpectralPreset, type SpectralPresetId } from "./presets";
import { calculateCameraOrbit, type CameraOrbitState } from "./physics";

export interface SpectralStoreState {
  activePresetId: SpectralPresetId;
  dispersion: number;
  turbulence: number;
  flowVelocity: number;
  chromaticSpread: number;
  scrollProgress: number;
  pointer: { x: number; y: number; vx: number; vy: number };
  cameraOrbit: CameraOrbitState;
  reducedMotion: boolean;
  prismYaw: number;
  prismPitch: number;
  version: number;
}

type Listener = () => void;

export class SpectralStore {
  private state: SpectralStoreState;
  private listeners: Set<Listener> = new Set();

  constructor(initialPreset: SpectralPresetId = "solar-flare") {
    const preset = SPECTRAL_PRESETS[initialPreset];
    this.state = {
      activePresetId: initialPreset,
      dispersion: preset.refractiveIndex,
      turbulence: preset.turbulence,
      flowVelocity: preset.flowVelocity,
      chromaticSpread: preset.chromaticSpread,
      scrollProgress: 0,
      pointer: { x: 0, y: 0, vx: 0, vy: 0 },
      cameraOrbit: calculateCameraOrbit(0, 0, 0),
      reducedMotion: false,
      prismYaw: -0.28,
      prismPitch: 0.1,
      version: 0,
    };
  }

  public getSnapshot = (): SpectralStoreState => {
    return this.state;
  };

  public subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    this.state = { ...this.state, version: this.state.version + 1 };
    for (const listener of this.listeners) {
      listener();
    }
  }

  public setPreset(id: SpectralPresetId) {
    if (!SPECTRAL_PRESETS[id]) return;
    const preset = SPECTRAL_PRESETS[id];
    this.state = {
      ...this.state,
      activePresetId: id,
      dispersion: preset.refractiveIndex,
      turbulence: preset.turbulence,
      flowVelocity: preset.flowVelocity,
      chromaticSpread: preset.chromaticSpread,
    };
    this.notify();
  }

  public setParameters(params: Partial<{
    dispersion: number;
    turbulence: number;
    flowVelocity: number;
    chromaticSpread: number;
  }>) {
    this.state = {
      ...this.state,
      dispersion: params.dispersion ?? this.state.dispersion,
      turbulence: params.turbulence ?? this.state.turbulence,
      flowVelocity: params.flowVelocity ?? this.state.flowVelocity,
      chromaticSpread: params.chromaticSpread ?? this.state.chromaticSpread,
    };
    this.notify();
  }

  public setPrismOrientation(yaw: number, pitch: number) {
    if (Math.abs(this.state.prismYaw - yaw) < 0.001 && Math.abs(this.state.prismPitch - pitch) < 0.001) return;
    this.state = {
      ...this.state,
      prismYaw: yaw,
      prismPitch: pitch,
    };
    this.notify();
  }

  public setScrollProgress(progress: number) {
    const clamped = Math.max(0, Math.min(1, progress));
    if (Math.abs(clamped - this.state.scrollProgress) < 0.001) return;
    const orbit = this.state.reducedMotion
      ? { pitchDeg: 0, yawDeg: 0, rollDeg: 0, translationZ: 0, focalDepth: 1.5 }
      : calculateCameraOrbit(clamped, this.state.pointer.x, this.state.pointer.y);

    this.state = {
      ...this.state,
      scrollProgress: clamped,
      cameraOrbit: orbit,
    };
    this.notify();
  }

  public setPointer(x: number, y: number, vx = 0, vy = 0) {
    const orbit = this.state.reducedMotion
      ? { pitchDeg: 0, yawDeg: 0, rollDeg: 0, translationZ: 0, focalDepth: 1.5 }
      : calculateCameraOrbit(this.state.scrollProgress, x, y);

    this.state = {
      ...this.state,
      pointer: { x, y, vx, vy },
      cameraOrbit: orbit,
    };
    this.notify();
  }

  public setReducedMotion(reduced: boolean) {
    if (this.state.reducedMotion === reduced) return;
    const orbit = reduced
      ? { pitchDeg: 0, yawDeg: 0, rollDeg: 0, translationZ: 0, focalDepth: 1.5 }
      : calculateCameraOrbit(this.state.scrollProgress, this.state.pointer.x, this.state.pointer.y);

    this.state = {
      ...this.state,
      reducedMotion: reduced,
      cameraOrbit: orbit,
    };
    this.notify();
  }

  public getActivePreset(): SpectralPreset {
    return SPECTRAL_PRESETS[this.state.activePresetId];
  }
}

// Global singleton for the template instance
export const spectralStore = new SpectralStore("solar-flare");

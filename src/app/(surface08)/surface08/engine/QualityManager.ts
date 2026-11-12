import type { QualityPreset } from './effectTypes';
import { resolveQualitySettings } from './math';

export function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

export function checkWebGL2Available(): boolean {
  if (typeof document === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export class QualityManager {
  public readonly isSoftwareGl: boolean;
  private frameTimesMs: number[] = [];
  private maxSamples = 40;
  private currentPreset: QualityPreset = 'auto';

  constructor() {
    this.isSoftwareGl = detectSoftwareWebGL();
  }

  public recordFrame(dtSeconds: number): void {
    const ms = Math.max(1, Math.min(250, dtSeconds * 1000));
    this.frameTimesMs.push(ms);
    if (this.frameTimesMs.length > this.maxSamples) {
      this.frameTimesMs.shift();
    }
  }

  public getMeasuredStats(): { fps: number; frameTimeMs: number } {
    if (this.frameTimesMs.length === 0) {
      return { fps: 60, frameTimeMs: 16.6 };
    }
    let sum = 0;
    for (let i = 0; i < this.frameTimesMs.length; i++) {
      sum += this.frameTimesMs[i];
    }
    const avgMs = sum / this.frameTimesMs.length;
    const fps = Math.max(1, Math.min(240, Math.round(1000 / avgMs)));
    return {
      fps,
      frameTimeMs: Math.round(avgMs * 10) / 10,
    };
  }

  public setPreset(preset: QualityPreset): void {
    this.currentPreset = preset;
  }

  public getEffectiveSettings(devicePixelRatio: number): {
    effectiveTier: 'high' | 'balanced' | 'low';
    dpr: number;
    simScale: number;
  } {
    const { fps } = this.getMeasuredStats();
    return resolveQualitySettings(this.currentPreset, fps, devicePixelRatio, this.isSoftwareGl);
  }
}

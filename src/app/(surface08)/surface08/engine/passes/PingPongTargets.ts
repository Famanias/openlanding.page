import * as THREE from 'three';

export class PingPongTargets {
  public read: THREE.WebGLRenderTarget;
  public write: THREE.WebGLRenderTarget;
  private width: number;
  private height: number;

  constructor(width: number, height: number, useHalfFloat = true) {
    this.width = Math.max(16, Math.floor(width));
    this.height = Math.max(16, Math.floor(height));

    const options: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: useHalfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
    };

    this.read = new THREE.WebGLRenderTarget(this.width, this.height, options);
    this.write = new THREE.WebGLRenderTarget(this.width, this.height, options);
  }

  public swap(): void {
    const tmp = this.read;
    this.read = this.write;
    this.write = tmp;
  }

  public resize(width: number, height: number): void {
    const w = Math.max(16, Math.floor(width));
    const h = Math.max(16, Math.floor(height));
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    this.read.setSize(w, h);
    this.write.setSize(w, h);
  }

  public clear(renderer: THREE.WebGLRenderer, color = new THREE.Color(0, 0, 0), alpha = 1): void {
    const prevColor = new THREE.Color();
    renderer.getClearColor(prevColor);
    const prevAlpha = renderer.getClearAlpha();

    renderer.setClearColor(color, alpha);
    renderer.setRenderTarget(this.read);
    renderer.clear();
    renderer.setRenderTarget(this.write);
    renderer.clear();
    renderer.setRenderTarget(null);

    renderer.setClearColor(prevColor, prevAlpha);
  }

  public dispose(): void {
    this.read.dispose();
    this.write.dispose();
  }
}

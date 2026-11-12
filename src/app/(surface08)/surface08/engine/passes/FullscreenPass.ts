import * as THREE from 'three';

export const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export class FullscreenPass {
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.OrthographicCamera;
  public readonly geometry: THREE.PlaneGeometry;
  public readonly mesh: THREE.Mesh;
  public material: THREE.ShaderMaterial;

  constructor(material: THREE.ShaderMaterial) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  public render(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget | null = null): void {
    renderer.setRenderTarget(target);
    renderer.render(this.scene, this.camera);
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

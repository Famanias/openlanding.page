import * as THREE from "three";

/** HDR radiance (values above 1) captured into a HalfFloat PMREM reflection map. */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer, neon = false) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(.25, .28, .34);
  const panels: THREE.Mesh[] = [];
  function panel(position: [number, number, number], width: number, height: number, intensity: number, color = "#ffffff") {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide, toneMapped: false }));
    mesh.position.fromArray(position);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
    panels.push(mesh);
  }
  panel([-4, 5, 3], 4, 7, 14);
  panel([5, -2, 1], 1.5, 8, 9);
  panel([0, 3, -5], 7, 2, 7);
  panel([-5, -2, -2], 2, 5, 5);
  if (neon) {
    panel([0, 0, 8], 7, 7, 1.5);
    panel([-4, 4, 1], .65, 9, 16, "#D2F802");
    panel([4, -3, 1], .75, 9, 14, "#A855F7");
  }
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(studio, .055, .1, 30, { size: 256 });
  generator.dispose();
  panels.forEach(p => { p.geometry.dispose(); (p.material as THREE.Material).dispose(); });
  return target;
}

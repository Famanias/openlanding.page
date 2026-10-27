import * as THREE from "three";

/**
 * A tileable water normal map generated at boot (the npm package doesn't ship the examples' waternormals.jpg).
 * Height = a few octaves of periodic value noise; normals by central differences.
 */
export function createWaterNormalMap(size = 256, seed = 7): THREE.DataTexture {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const octaves = [8, 16, 32, 64].map((period, i) => {
    const grid = new Float32Array(period * period).map(() => rand());
    return { period, grid, amp: 1 / (i + 1.4) };
  });
  const sample = (o: { period: number; grid: Float32Array }, x: number, y: number) => {
    const fx = (x / size) * o.period;
    const fy = (y / size) * o.period;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const tx = fx - x0;
    const ty = fy - y0;
    const ux = tx * tx * (3 - 2 * tx);
    const uy = ty * ty * (3 - 2 * ty);
    const g = (gx: number, gy: number) => o.grid[(((gy % o.period) + o.period) % o.period) * o.period + (((gx % o.period) + o.period) % o.period)];
    const a = g(x0, y0) + (g(x0 + 1, y0) - g(x0, y0)) * ux;
    const b = g(x0, y0 + 1) + (g(x0 + 1, y0 + 1) - g(x0, y0 + 1)) * ux;
    return a + (b - a) * uy;
  };
  const height = new Float32Array(size * size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) height[y * size + x] = octaves.reduce((h, o) => h + sample(o, x, y) * o.amp, 0);

  const data = new Uint8Array(size * size * 4);
  const h = (x: number, y: number) => height[(((y + size) % size) * size) + ((x + size) % size)];
  const strength = 6;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = (h(x + 1, y) - h(x - 1, y)) * strength;
      const dy = (h(x, y + 1) - h(x, y - 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      data[i + 3] = 255;
    }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

export function blackbodyRgb(temperature: number): [number, number, number] {
  const t = Math.max(1000, Math.min(40_000, temperature)) / 100;
  const red = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const green = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const blue = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [Math.max(0, Math.min(1, red / 255)), Math.max(0, Math.min(1, green / 255)), Math.max(0, Math.min(1, blue / 255))];
}

export function buildBlackbodyLut(size = 256) {
  return new Uint8Array(Array.from({ length: size }, (_, i) => blackbodyRgb(1000 + (i / (size - 1)) * 39_000).map((v) => Math.round(v * 255))).flat());
}

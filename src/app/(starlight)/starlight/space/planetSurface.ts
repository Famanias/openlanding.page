import * as THREE from "three";

type PlanetMaps = {
  color: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
  clouds: THREE.CanvasTexture;
};

const fract = (value: number) => value - Math.floor(value);
const hash = (x: number, y: number) => fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
const smooth = (value: number) => value * value * (3 - 2 * value);
const noise = (x: number, y: number) => {
  const ix = Math.floor(x); const iy = Math.floor(y);
  const fx = smooth(fract(x)); const fy = smooth(fract(y));
  const a = hash(ix, iy); const b = hash(ix + 1, iy); const c = hash(ix, iy + 1); const d = hash(ix + 1, iy + 1);
  return (a + (b - a) * fx) + ((c + (d - c) * fx) - (a + (b - a) * fx)) * fy;
};
const fbm = (x: number, y: number) => {
  let value = 0; let amplitude = 0.5; let frequency = 1;
  for (let octave = 0; octave < 5; octave += 1) { value += noise(x * frequency, y * frequency) * amplitude; frequency *= 2.04; amplitude *= 0.5; }
  return value;
};

function setupTexture(texture: THREE.CanvasTexture, colorSpace = false) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  if (colorSpace) texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPlanetMaps(size = 384): PlanetMaps {
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  const roughnessCanvas = document.createElement("canvas");
  const cloudsCanvas = document.createElement("canvas");
  [colorCanvas, bumpCanvas, roughnessCanvas, cloudsCanvas].forEach((canvas) => { canvas.width = size; canvas.height = Math.floor(size / 2); });
  const width = colorCanvas.width; const height = colorCanvas.height;
  const colorContext = colorCanvas.getContext("2d"); const bumpContext = bumpCanvas.getContext("2d"); const roughnessContext = roughnessCanvas.getContext("2d"); const cloudsContext = cloudsCanvas.getContext("2d");
  if (!colorContext || !bumpContext || !roughnessContext || !cloudsContext) throw new Error("Planet texture canvas unavailable");
  const color = colorContext.createImageData(width, height); const bump = bumpContext.createImageData(width, height); const roughness = roughnessContext.createImageData(width, height); const clouds = cloudsContext.createImageData(width, height);
  for (let y = 0; y < height; y += 1) {
    const latitude = y / height;
    const polar = Math.abs(latitude - 0.5) * 2;
    for (let x = 0; x < width; x += 1) {
      const longitude = x / width;
      const continentField = fbm(longitude * 3.1 + 11, latitude * 5.0 + 4) + Math.sin(longitude * Math.PI * 4.0 + latitude * 2.3) * 0.08;
      const continent = smooth(Math.max(0, Math.min(1, (continentField - 0.43) * 4.3)));
      const terrain = fbm(longitude * 16.0 + 19, latitude * 18.0 + 5);
      const ridges = Math.pow(Math.max(0, Math.sin(longitude * 44 + terrain * 2.2)), 18) * continent;
      const heightValue = Math.max(0, Math.min(1, terrain * 0.48 + ridges * 0.22 + continent * 0.22 + (1 - polar) * 0.05));
      const moisture = fbm(longitude * 7.0 + 40, latitude * 9.0 + 2);
      const oceanDepth = Math.max(0, 1 - continent) * (0.45 + moisture * 0.4);
      let r = 16 + oceanDepth * 10; let g = 44 + oceanDepth * 26; let b = 60 + oceanDepth * 44;
      if (continent > 0.5) {
        const desert = Math.max(0, moisture - 0.58) * 2.4;
        r = 35 + terrain * 58 + desert * 55; g = 66 + terrain * 70 + desert * 36; b = 47 + terrain * 36 - desert * 18;
        const forest = Math.max(0, 0.58 - moisture) * 1.7; g += forest * 24; b += forest * 10;
      }
      const snow = Math.max(0, (polar - 0.64) * 4.4) + Math.max(0, terrain - 0.76) * 1.2;
      r = r + (235 - r) * Math.min(1, snow); g = g + (241 - g) * Math.min(1, snow); b = b + (238 - b) * Math.min(1, snow);
      const index = (y * width + x) * 4;
      color.data[index] = Math.max(0, Math.min(255, r)); color.data[index + 1] = Math.max(0, Math.min(255, g)); color.data[index + 2] = Math.max(0, Math.min(255, b)); color.data[index + 3] = 255;
      const bumpValue = Math.round(heightValue * 255);
      bump.data[index] = bumpValue; bump.data[index + 1] = bumpValue; bump.data[index + 2] = bumpValue; bump.data[index + 3] = 255;
      const roughValue = Math.round((continent > 0.5 ? 0.82 + terrain * 0.15 : 0.2 + oceanDepth * 0.18) * 255);
      roughness.data[index] = roughValue; roughness.data[index + 1] = roughValue; roughness.data[index + 2] = roughValue; roughness.data[index + 3] = 255;
      const cloudField = fbm(longitude * 5.2 + 80, latitude * 8.0 + 30) + Math.sin(longitude * 17 + latitude * 7) * 0.04;
      const cloudValue = Math.max(0, Math.min(255, (cloudField - 0.52) * 900));
      clouds.data[index] = 240; clouds.data[index + 1] = 245; clouds.data[index + 2] = 250; clouds.data[index + 3] = cloudValue;
    }
  }
  colorContext.putImageData(color, 0, 0); bumpContext.putImageData(bump, 0, 0); roughnessContext.putImageData(roughness, 0, 0); cloudsContext.putImageData(clouds, 0, 0);
  return { color: setupTexture(new THREE.CanvasTexture(colorCanvas), true), bump: setupTexture(new THREE.CanvasTexture(bumpCanvas)), roughness: setupTexture(new THREE.CanvasTexture(roughnessCanvas)), clouds: setupTexture(new THREE.CanvasTexture(cloudsCanvas)) };
}

export function createAtmosphereMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    uniforms: { uColor: { value: new THREE.Color(0x7df2d1) } },
    vertexShader: `varying vec3 vWorld; varying vec3 vNormal; void main(){ vec4 world=modelMatrix*vec4(position,1.); vWorld=world.xyz; vNormal=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*world; }`,
    fragmentShader: `precision highp float; uniform vec3 uColor; varying vec3 vWorld; varying vec3 vNormal; void main(){ vec3 viewDir=normalize(cameraPosition-vWorld); float rim=pow(1.0-max(dot(normalize(vNormal),viewDir),0.0),2.8); float glow=0.2+rim*0.8; gl_FragColor=vec4(uColor*glow,rim*0.62); }`,
  });
}

export function disposePlanetMaps(maps: PlanetMaps) {
  maps.color.dispose(); maps.bump.dispose(); maps.roughness.dispose(); maps.clouds.dispose();
}

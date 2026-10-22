import type * as THREE from "three";
import type { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Procedural BATHYS H-11: titanium pressure sphere, syntactic-foam fairing,
 * rim-driven thruster pods, forward floodlights with volumetric cones,
 * multibeam head, manipulator arm and skids. +z is the nose, +y is up; the
 * pressure sphere (radius 1) sits at the origin. Everything is built from
 * primitives so the page ships no model files.
 */

export type Palette = Record<
  "trench" | "navy" | "titanium" | "cyan" | "amber" | "glass" | "slate" | "mist",
  string
>;

export type Kit = {
  THREE: typeof THREE;
  RoundedBox: typeof RoundedBoxGeometry;
  palette: Palette;
  /** Font family for the fairing livery, already resolved from CSS. */
  fontFamily: string;
  /** Lower segment counts on small screens. */
  detail: "high" | "low";
};

/** Full tip-to-tip width of the model in world units (thruster pods included). */
export const MODEL_WIDTH = 4.1;

export type Submersible = {
  root: THREE.Group;
  /** Callout anchors, top to bottom: fairing, sphere, floodlight, transducer. */
  anchors: THREE.Object3D[];
  floods: THREE.SpotLight[];
  setLight(level: number): void;
  update(time: number, glow: number): void;
  dispose(): void;
};

const BEAM_VERTEX = /* glsl */ `
  varying float vDepth;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  uniform float uLength;
  void main() {
    vDepth = clamp(-position.y / uLength, 0.0, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const BEAM_FRAGMENT = /* glsl */ `
  varying float vDepth;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  uniform vec3 uColor;
  uniform float uIntensity;
  void main() {
    float edge = pow(abs(dot(normalize(vNormalV), normalize(vViewV))), 1.6);
    float fade = pow(1.0 - vDepth, 1.7);
    gl_FragColor = vec4(uColor, uIntensity * fade * edge);
  }
`;

export function buildSubmersible(kit: Kit): Submersible {
  const { THREE: T, RoundedBox, palette, detail } = kit;
  const seg = detail === "high" ? 1 : 0.6;
  const col = (hex: string) => new T.Color(hex);

  const root = new T.Group();
  const disposables: { dispose(): void }[] = [];
  const own = <A extends { dispose(): void }>(x: A): A => {
    disposables.push(x);
    return x;
  };

  const hull = own(new T.MeshStandardMaterial({ color: col(palette.titanium), metalness: 0.92, roughness: 0.26 }));
  const metal = own(new T.MeshStandardMaterial({ color: col(palette.mist), metalness: 0.85, roughness: 0.4 }));
  const darkMetal = own(new T.MeshStandardMaterial({ color: col(palette.slate), metalness: 0.8, roughness: 0.5 }));
  // Foam is a lifted glass/slate blend so it separates from the trench-black water.
  const foam = own(
    new T.MeshStandardMaterial({
      color: col(palette.glass).lerp(col(palette.slate), 0.42),
      metalness: 0.12,
      roughness: 0.62,
    }),
  );
  const seam = own(new T.MeshStandardMaterial({ color: col(palette.trench), metalness: 0.2, roughness: 0.9 }));
  const tray = own(new T.MeshStandardMaterial({ color: col(palette.navy), metalness: 0.7, roughness: 0.45 }));
  const glowMat = own(
    new T.MeshStandardMaterial({
      color: col(palette.cyan),
      emissive: col(palette.cyan),
      emissiveIntensity: 1.4,
      roughness: 0.4,
    }),
  );
  const lensMat = own(new T.MeshBasicMaterial({ color: col(palette.titanium) }));
  const portMat = own(
    new T.MeshPhysicalMaterial({
      color: col(palette.navy),
      emissive: col(palette.cyan),
      emissiveIntensity: 0.55,
      roughness: 0.05,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    }),
  );
  const beaconMat = own(new T.MeshBasicMaterial({ color: col(palette.amber), transparent: true }));

  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
    const m = new T.Mesh(own(geo), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const rbox = (w: number, h: number, d: number, r: number) => new RoundedBox(w, h, d, 4, r);

  /** Cylinder between two points (struts, skid legs). */
  const link = (parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) => {
    const dir = new T.Vector3().subVectors(b, a);
    const m = new T.Mesh(own(new T.CylinderGeometry(r, r, dir.length(), 10)), mat);
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), dir.normalize());
    parent.add(m);
    return m;
  };

  // Pressure sphere, equatorial flange and bolts
  add(root, new T.SphereGeometry(1, Math.round(64 * seg), Math.round(48 * seg)), hull);
  const flange = add(root, new T.TorusGeometry(1.005, 0.045, 12, Math.round(96 * seg)), darkMetal);
  flange.rotation.x = Math.PI / 2;
  const boltCount = 28;
  const bolts = new T.InstancedMesh(own(new T.CylinderGeometry(0.026, 0.026, 0.07, 8)), seam, boltCount);
  const m4 = new T.Matrix4();
  for (let i = 0; i < boltCount; i++) {
    const a = (i / boltCount) * Math.PI * 2;
    m4.compose(
      new T.Vector3(Math.cos(a) * 1.05, 0, Math.sin(a) * 1.05),
      new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), 0),
      new T.Vector3(1, 1, 1),
    );
    bolts.setMatrixAt(i, m4);
  }
  root.add(bolts);

  // Sapphire viewport
  const port = new T.Group();
  port.position.set(0, 0, 0.96);
  root.add(port);
  const disc = add(port, new T.CylinderGeometry(0.34, 0.34, 0.1, 48), portMat);
  disc.rotation.x = Math.PI / 2;
  add(port, new T.TorusGeometry(0.36, 0.055, 14, 56), metal, 0, 0, 0.03);

  // Syntactic foam fairing, seams and livery
  const fairing = new T.Group();
  fairing.position.set(0, 1.25, 0);
  root.add(fairing);
  add(fairing, rbox(2.5, 1.5, 2.0, 0.44), foam);
  add(fairing, new T.BoxGeometry(2.52, 0.014, 2.02), seam, 0, 0.26, 0);
  add(fairing, new T.BoxGeometry(2.52, 0.014, 2.02), seam, 0, -0.26, 0);

  const livery = document.createElement("canvas");
  livery.width = 512;
  livery.height = 160;
  const drawLivery = () => {
    const g = livery.getContext("2d");
    if (!g) return;
    g.clearRect(0, 0, 512, 160);
    g.fillStyle = palette.mist;
    g.font = `600 58px ${kit.fontFamily}`;
    g.textBaseline = "middle";
    if ("letterSpacing" in g) (g as unknown as { letterSpacing: string }).letterSpacing = "8px";
    g.fillText("BATHYS", 24, 56);
    g.fillStyle = palette.slate;
    g.font = `400 40px ${kit.fontFamily}`;
    g.fillText("H-11", 24, 122);
  };
  drawLivery();
  const liveryTex = own(new T.CanvasTexture(livery));
  liveryTex.colorSpace = T.SRGBColorSpace;
  liveryTex.anisotropy = 4;
  const liveryMat = own(new T.MeshBasicMaterial({ map: liveryTex, transparent: true, depthWrite: false }));
  add(fairing, new T.PlaneGeometry(1.6, 0.5), liveryMat, -0.38, 0.06, 1.008);
  if (document.fonts?.ready) {
    void document.fonts.ready.then(() => {
      drawLivery();
      liveryTex.needsUpdate = true;
    });
  }

  // Lifting eye, antenna and amber strobe
  const eye = add(fairing, new T.TorusGeometry(0.14, 0.03, 10, 28), metal, 0, 0.8, 0);
  eye.rotation.y = Math.PI / 2;
  add(fairing, new T.CylinderGeometry(0.014, 0.014, 0.95, 8), metal, 0.7, 1.225, -0.4);
  const beacon = add(fairing, new T.SphereGeometry(0.055, 16, 12), beaconMat, 0.7, 1.72, -0.4);

  // Thruster pods and struts
  for (const side of [-1, 1]) {
    const pod = new T.Group();
    pod.position.set(side * 1.78, 0.9, 0);
    root.add(pod);
    const body = add(pod, new T.CapsuleGeometry(0.26, 0.9, 8, Math.round(24 * seg)), metal);
    body.rotation.x = Math.PI / 2;
    for (const z of [-0.5, 0.5]) {
      add(pod, new T.TorusGeometry(0.275, 0.032, 10, 40), metal, 0, 0, z);
    }
    const wash = add(pod, new T.CircleGeometry(0.19, 28), glowMat, 0, 0, -0.74);
    wash.rotation.y = Math.PI;
    add(root, new T.BoxGeometry(0.4, 0.1, 0.18), darkMetal, side * 1.4, 0.9, 0);
  }

  // Instrument tray: multibeam transducer + floodlights
  add(root, rbox(1.7, 0.3, 1.1, 0.08), tray, 0, -1.18, 0);
  const transducers = new T.Group();
  transducers.position.set(0, -1.3, 0.56);
  root.add(transducers);
  for (let i = 0; i < 9; i++) {
    add(transducers, new T.BoxGeometry(0.1, 0.08, 0.05), glowMat, (i - 4) * 0.15, 0, 0);
  }

  const floods: THREE.SpotLight[] = [];
  const beamUniforms: { uIntensity: { value: number } }[] = [];
  const floodMount: THREE.Vector3[] = [];
  for (const side of [-1, 1]) {
    const at = new T.Vector3(side * 0.78, -1.08, 0.6);
    floodMount.push(at);
    add(root, rbox(0.36, 0.26, 0.32, 0.05), darkMetal, at.x, at.y, at.z);
    const lens = add(root, new T.CircleGeometry(0.1, 20), lensMat, at.x, at.y - 0.131, at.z + 0.02);
    lens.rotation.x = Math.PI / 2;

    const spot = new T.SpotLight(col(palette.titanium), 0, 16, 0.42, 0.85, 1.4);
    spot.position.set(at.x, at.y - 0.1, at.z + 0.1);
    spot.target.position.set(at.x + side * 0.6, -6, at.z + 1.1);
    root.add(spot, spot.target);
    floods.push(spot);

    const cone = makeBeam(T, own, 6, 1.45, palette.titanium, 0.5);
    cone.position.set(at.x, at.y - 0.13, at.z + 0.05);
    cone.rotation.set(-0.18, 0, side * 0.1);
    root.add(cone);
    beamUniforms.push((cone.material as THREE.ShaderMaterial).uniforms as { uIntensity: { value: number } });
  }
  const fan = makeBeam(T, own, 5, 1.1, palette.cyan, 0.3);
  fan.position.set(0, -1.34, 0.5);
  fan.rotation.x = 0.16;
  root.add(fan);
  const fanUniforms = (fan.material as THREE.ShaderMaterial).uniforms as { uIntensity: { value: number } };

  // Skids, legs and ballast
  for (const side of [-1, 1]) {
    const rail = add(root, new T.CylinderGeometry(0.055, 0.055, 2.3, 10), darkMetal, side * 1.12, -2.0, 0);
    rail.rotation.x = Math.PI / 2;
    for (const z of [-0.5, 0.5]) {
      link(root, new T.Vector3(side * 0.82, -1.3, z), new T.Vector3(side * 1.12, -2.0, z), 0.04, metal);
    }
    add(root, rbox(0.3, 0.22, 0.55, 0.05), seam, side * 1.12, -1.78, -0.2);
  }

  // Manipulator arm (animated)
  const shoulder = new T.Group();
  shoulder.position.set(-0.55, -1.3, 0.55);
  root.add(shoulder);
  add(shoulder, new T.SphereGeometry(0.07, 14, 10), metal);
  add(shoulder, new T.CylinderGeometry(0.035, 0.035, 0.7, 10), metal, 0, -0.35, 0);
  const elbow = new T.Group();
  elbow.position.set(0, -0.7, 0);
  shoulder.add(elbow);
  add(elbow, new T.SphereGeometry(0.06, 14, 10), metal);
  add(elbow, new T.CylinderGeometry(0.03, 0.03, 0.6, 10), metal, 0, -0.3, 0);
  const claws: THREE.Mesh[] = [-1, 1].map((s) => {
    const claw = add(elbow, new T.BoxGeometry(0.03, 0.2, 0.03), metal, s * 0.04, -0.7, 0);
    return claw;
  });

  // Callout anchors
  const anchorAt = (x: number, y: number, z: number) => {
    const o = new T.Object3D();
    o.position.set(x, y, z);
    root.add(o);
    return o;
  };
  const anchors = [
    anchorAt(1.25, 1.95, 0.5),
    anchorAt(0.98, 0.1, 0.3),
    anchorAt(floodMount[1].x + 0.18, floodMount[1].y, floodMount[1].z),
    anchorAt(0.85, -1.32, 0.58),
  ];

  const setLight = (level: number) => {
    const l = Math.min(Math.max(level, 0), 1);
    for (const s of floods) s.intensity = 6 + l * 70;
    for (const u of beamUniforms) u.uIntensity.value = 0.22 + l * 0.34;
    fanUniforms.uIntensity.value = 0.12 + l * 0.2;
  };
  setLight(0);

  const update = (time: number, glow: number) => {
    shoulder.rotation.x = 0.55 + Math.sin(time * 0.55) * 0.13;
    elbow.rotation.x = -0.95 + Math.sin(time * 0.75 + 1.0) * 0.16;
    const open = 0.05 + (Math.sin(time * 1.1) * 0.5 + 0.5) * 0.04;
    claws[0].position.x = -open;
    claws[1].position.x = open;
    glowMat.emissiveIntensity = 1.2 + glow * 2.6;
    portMat.emissiveIntensity = 0.45 + Math.sin(time * 1.6) * 0.1;
    const phase = (time % 2.6) / 2.6;
    beaconMat.opacity = phase > 0.62 && phase < 0.76 ? 1 : 0.22;
    beacon.scale.setScalar(beaconMat.opacity > 0.9 ? 1.5 : 1);
  };

  return {
    root,
    anchors,
    floods,
    setLight,
    update,
    dispose() {
      disposables.forEach((d) => d.dispose());
    },
  };
}

function makeBeam(
  T: typeof THREE,
  own: <A extends { dispose(): void }>(x: A) => A,
  length: number,
  radius: number,
  color: string,
  intensity: number,
): THREE.Mesh {
  const geo = own(new T.ConeGeometry(radius, length, 36, 1, true));
  geo.translate(0, -length / 2, 0);
  const mat = own(
    new T.ShaderMaterial({
      uniforms: {
        uColor: { value: new T.Color(color) },
        uIntensity: { value: intensity },
        uLength: { value: length },
      },
      vertexShader: BEAM_VERTEX,
      fragmentShader: BEAM_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      side: T.DoubleSide,
    }),
  );
  return new T.Mesh(geo, mat);
}

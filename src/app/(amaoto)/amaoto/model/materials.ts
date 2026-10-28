import * as THREE from "three";
export type Motif = "sakura" | "wave" | "plain";
function texture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D is unavailable");
  draw(ctx);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  return map;
}
let seed = 481;
function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
function paint(colour: string, motif: Motif) {
  seed = 481;
  return texture(2048, 1024, (ctx) => {
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, 2048, 1024);
    // A separate hand-painted branch in every gore, with repeatable variation.
    for (let gore = 0; gore < 40; gore++) {
      const x = gore * 51.2;
      ctx.strokeStyle = "#B8923A";
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
      if (motif === "sakura") {
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = "#B8923A";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 190);
        ctx.bezierCurveTo(x + 22, 220, x + 30, 140, x + 51.2, 185);
        ctx.stroke();
        for (let flower = 0; flower < 5; flower++) {
          const bx = x + 5 + random() * 42,
            by = 145 + random() * 95,
            radius = 4 + random() * 4;
          ctx.strokeStyle = "#B8923A";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(bx, 190);
          ctx.lineTo(bx, by);
          ctx.stroke();
          ctx.fillStyle = flower % 2 ? "#F2B8C6" : "#D9748F";
          for (let petal = 0; petal < 5; petal++) {
            const a = (petal * Math.PI * 2) / 5;
            ctx.beginPath();
            ctx.ellipse(
              bx + Math.cos(a) * radius,
              by + Math.sin(a) * radius,
              radius * 0.65,
              radius,
              a,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.fillStyle = "#F4ECDD";
          ctx.beginPath();
          ctx.arc(bx, by, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (motif === "wave") {
        ctx.strokeStyle = "#F4ECDD";
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.3;
        for (let row = 0; row < 3; row++)
          for (let ring = 1; ring <= 3; ring++) {
            ctx.beginPath();
            ctx.arc(x + 25, 120 + row * 44, ring * 8, 0, Math.PI);
            ctx.stroke();
          }
      }
    }
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "#B8923A";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(2048, 10);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
}
export function paperMaterial(colour: string, motif: Motif) {
  const fibre = texture(256, 256, (ctx) => {
    seed = 91;
    ctx.fillStyle = "rgb(185,185,185)";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 6500; i++) {
      const grey = Math.floor(130 + random() * 120);
      ctx.strokeStyle = `rgb(${grey},${grey},${grey})`;
      ctx.lineWidth = 0.3;
      const x = random() * 256,
        y = random() * 256;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + random() * 2, y + 3 + random() * 13);
      ctx.stroke();
    }
  });
  fibre.colorSpace = THREE.NoColorSpace;
  const roughness = fibre.clone();
  roughness.needsUpdate = true;
  let current = paint(colour, motif),
    previous = current;
  const uniforms = {
    uOld: { value: current },
    uNext: { value: current },
    uDye: { value: 1 },
    uOrigin: { value: new THREE.Vector2(0.5, 0.5) },
    uBacklight: { value: 0.45 },
    uReveal: { value: 0 },
    uRevealCenter: { value: 0.1 },
  };
  const material = new THREE.MeshStandardMaterial({
    map: current,
    roughnessMap: roughness,
    bumpMap: fibre,
    bumpScale: 0.016,
    roughness: 0.83,
    side: THREE.DoubleSide,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.fragmentShader =
      `uniform sampler2D uOld; uniform sampler2D uNext; uniform float uDye; uniform vec2 uOrigin; uniform float uBacklight; uniform float uReveal; uniform float uRevealCenter;\n` +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <map_fragment>",
        `
      float gap = abs(vMapUv.x-uRevealCenter);
      gap = min(gap,1.0-gap);
      if (uReveal>.001 && gap < .12*uReveal) discard;
      float dist = length(vec2(min(abs(vMapUv.x-uOrigin.x),1.0-abs(vMapUv.x-uOrigin.x))*1.6,vMapUv.y-uOrigin.y));
      float bleed = 1.0-smoothstep(uDye*2.0-.08,uDye*2.0+.08,dist);
      diffuseColor *= mix(texture2D(uOld,vMapUv),texture2D(uNext,vMapUv),bleed);
    `,
      )
      .replace(
        "#include <opaque_fragment>",
        `outgoingLight += diffuseColor.rgb * uBacklight * (gl_FrontFacing ? .10 : .52);\n#include <opaque_fragment>`,
      );
  };
  return {
    material,
    setReveal(value: number, center: number) {
      uniforms.uReveal.value = value;
      uniforms.uRevealCenter.value = center;
    },
    setSun(angle: number) {
      uniforms.uBacklight.value =
        0.2 + 0.85 * Math.cos((angle * Math.PI) / 180);
    },
    setCanopy(
      nextColour: string,
      nextMotif: Motif,
      origin = new THREE.Vector2(0.5, 0.5),
      instant = false,
    ) {
      if (previous !== current) previous.dispose();
      previous = current;
      current = paint(nextColour, nextMotif);
      uniforms.uOld.value = previous;
      uniforms.uNext.value = current;
      uniforms.uOrigin.value.copy(origin);
      uniforms.uDye.value = instant ? 1 : 0;
    },
    tick(dt: number) {
      uniforms.uDye.value = Math.min(1, uniforms.uDye.value + dt / 0.9);
      if (uniforms.uDye.value === 1 && previous !== current) {
        previous.dispose();
        previous = current;
        uniforms.uOld.value = current;
      }
    },
    get animating() {
      return uniforms.uDye.value < 1;
    },
    dispose() {
      current.dispose();
      if (previous !== current) previous.dispose();
      fibre.dispose();
      roughness.dispose();
      material.dispose();
    },
  };
}
export function bambooMaterial() {
  const map = texture(128, 512, (ctx) => {
    seed = 80;
    ctx.fillStyle = "#B8923A";
    ctx.fillRect(0, 0, 128, 512);
    ctx.strokeStyle = "#1A1613";
    for (let i = 0; i < 150; i++) {
      ctx.globalAlpha = 0.02 + random() * 0.1;
      const x = random() * 128;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + random() * 3, 512);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.24;
    ctx.fillRect(0, 245, 128, 4);
    ctx.globalAlpha = 1;
  });
  return new THREE.MeshStandardMaterial({
    map,
    color: "#F4ECDD",
    roughness: 0.45,
    bumpMap: map,
    bumpScale: 0.006,
  });
}

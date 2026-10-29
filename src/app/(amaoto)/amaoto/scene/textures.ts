import * as THREE from "three";
import { createSeededRandom } from "../logic/rng";
export function createWorldTextures() {
  const maps: Record<string, THREE.CanvasTexture> = {};
  const make = (
    name: string,
    w: number,
    h: number,
    color: boolean,
    draw: (c: CanvasRenderingContext2D, r: () => number) => void,
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const c = canvas.getContext("2d");
    if (!c) throw Error("Canvas texture generation is unavailable");
    draw(c, createSeededRandom(481 + name.length * 71));
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    maps[name] = t;
    return t;
  };
  const washi = (
    c: CanvasRenderingContext2D,
    r: () => number,
    w: number,
    h: number,
    data = false,
  ) => {
    c.fillStyle = data ? "rgb(190,190,190)" : "#F4ECDD";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 2200; i++) {
      const x = r() * w,
        y = r() * h;
      c.strokeStyle = data
        ? `rgb(${100 + r() * 150},${100 + r() * 150},${100 + r() * 150})`
        : "#B8923A";
      c.globalAlpha = 0.025 + r() * 0.09;
      c.lineWidth = 0.3 + r();
      c.beginPath();
      c.moveTo(x, y);
      c.bezierCurveTo(
        x + 20,
        y - 10,
        x + 45,
        y + 15,
        x + 60 + r() * 100,
        y + r() * 12,
      );
      c.stroke();
    }
    c.globalAlpha = 0.06;
    for (let y = 0; y < h; y += 8) c.fillRect(0, y, w, 0.5);
    c.globalAlpha = 1;
  };
  make("washiColor", 1024, 1024, true, (c, r) => washi(c, r, 1024, 1024));
  make("washiBump", 1024, 1024, false, (c, r) => washi(c, r, 1024, 1024, true));
  make("washiTransmission", 512, 512, false, (c, r) =>
    washi(c, r, 512, 512, true),
  );
  for (const data of [false, true])
    make(data ? "bambooBump" : "bambooColor", 512, 1024, !data, (c, r) => {
      c.fillStyle = data ? "rgb(150,150,150)" : "#B8923A";
      c.fillRect(0, 0, 512, 1024);
      for (let i = 0; i < 1300; i++) {
        c.globalAlpha = 0.03 + r() * 0.15;
        c.strokeStyle = data ? "rgb(55,55,55)" : "#1A1613";
        const x = r() * 512;
        c.beginPath();
        c.moveTo(x, 0);
        c.bezierCurveTo(x + 8, 300, x - 6, 700, x + 4, 1024);
        c.stroke();
      }
      c.globalAlpha = 0.3;
      for (let y = 190; y < 1024; y += 250) {
        c.fillRect(0, y, 512, 5);
        c.globalAlpha = 0.1;
        c.fillRect(0, y + 6, 512, 16);
        c.globalAlpha = 0.3;
      }
      c.globalAlpha = 1;
    });
  for (const data of [false, true])
    make(data ? "woodBump" : "woodFloorColor", 1024, 1024, !data, (c, r) => {
      c.fillStyle = data ? "rgb(145,145,145)" : "#B8923A";
      c.fillRect(0, 0, 1024, 1024);
      for (let i = 0; i < 4000; i++) {
        c.globalAlpha = 0.03 + r() * 0.08;
        c.strokeStyle = data ? "rgb(40,40,40)" : "#1A1613";
        const y = r() * 1024;
        c.beginPath();
        c.moveTo(0, y);
        c.bezierCurveTo(350, y + r() * 20, 650, y - r() * 10, 1024, y);
        c.stroke();
      }
      c.globalAlpha = 0.4;
      for (let y = 0; y < 1024; y += 128) c.fillRect(0, y, 1024, 3);
      for (let y = 0; y < 1024; y += 128)
        c.fillRect((Math.floor(y / 128) % 3) * 340, y, 3, 128);
      c.globalAlpha = 1;
    });
  for (const data of [false, true])
    make(data ? "tatamiBump" : "tatamiColor", 512, 512, !data, (c) => {
      c.fillStyle = data ? "rgb(160,160,160)" : "#B8923A";
      c.fillRect(0, 0, 512, 512);
      c.fillStyle = data ? "rgb(90,90,90)" : "#F4ECDD";
      c.globalAlpha = 0.24;
      for (let y = 0; y < 512; y += 4)
        for (let x = 0; x < 512; x += 8) c.fillRect(x + (y % 8), y, 6, 2);
      c.globalAlpha = 1;
      c.fillStyle = data ? "rgb(70,70,70)" : "#2B3A55";
      c.fillRect(0, 0, 26, 512);
    });
  make("silkThread", 256, 256, true, (c) => {
    c.fillStyle = "#1A1613";
    c.fillRect(0, 0, 256, 256);
    c.strokeStyle = "#B8923A";
    c.globalAlpha = 0.3;
    for (let x = -256; x < 512; x += 9) {
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x + 256, 256);
      c.stroke();
    }
  });
  make("lacquerRoughness", 256, 256, false, (c, r) => {
    for (let i = 0; i < 4096; i++) {
      const n = 90 + r() * 80;
      c.fillStyle = `rgb(${n},${n},${n})`;
      c.fillRect((i % 64) * 4, Math.floor(i / 64) * 4, 4, 4);
    }
  });
  make("moteSprite", 64, 64, true, (c) => {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "#F4ECDD");
    g.addColorStop(1, "rgba(244,236,221,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
  });
  make("rainStreak", 1, 32, true, (c) => {
    const g = c.createLinearGradient(0, 0, 0, 32);
    g.addColorStop(0, "rgba(244,236,221,0)");
    g.addColorStop(0.65, "#F4ECDD");
    g.addColorStop(1, "rgba(244,236,221,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, 1, 32);
  });
  for (const data of [false, true])
    make(data ? "cobbleBump" : "cobbleColor", 1024, 1024, !data, (c, r) => {
      c.fillStyle = data ? "rgb(45,45,45)" : "#1A1613";
      c.fillRect(0, 0, 1024, 1024);
      for (let row = 0; row < 24; row++)
        for (let col = -1; col < 16; col++) {
          const n = 0.28 + r() * 0.4;
          c.globalAlpha = data ? 1 : n;
          c.fillStyle = data
            ? `rgb(${110 + n * 100},${110 + n * 100},${110 + n * 100})`
            : "#2B3A55";
          c.beginPath();
          c.roundRect(
            col * 70 + (row % 2) * 35 + 3,
            row * 44 + 3,
            64,
            38,
            5 + r() * 4,
          );
          c.fill();
        }
      c.globalAlpha = 1;
    });
  return {
    maps,
    dispose() {
      Object.values(maps).forEach((t) => t.dispose());
    },
  };
}
export type WorldTextures = ReturnType<typeof createWorldTextures>;

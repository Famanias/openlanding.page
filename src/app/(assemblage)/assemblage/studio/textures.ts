import { CanvasTexture, SRGBColorSpace } from "three";
import type { LayerId } from "./physics";

const palette = { paper: "#F6F0E8", ink: "#1E1D1B", sand: "#E2D8C9", red: "#D95F3F", teal: "#1D6C63", yellow: "#E7C65A" };

/** Authored print artwork; no remote textures, fonts or models are needed by the scene. */
export function printTexture(id: LayerId, bodyFont: string, monoFont: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 768; canvas.height = id === "paper" ? 1000 : 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Paper texture is unavailable");
  const { width: w, height: h } = canvas;
  ctx.fillStyle = id === "paper" ? palette.paper : id === "image" ? palette.teal : id === "ink" ? palette.red : palette.yellow;
  ctx.fillRect(0, 0, w, h);

  // Deterministic fibre, deliberately sparse enough to keep print readable.
  let seed = 471;
  for (let i = 0; i < 12000; i++) {
    seed = (seed * 16807) % 2147483647; const x = seed % w;
    seed = (seed * 16807) % 2147483647; const y = seed % h;
    ctx.fillStyle = i % 2 ? "rgba(30,29,27,.045)" : "rgba(246,240,232,.07)";
    ctx.fillRect(x, y, 1, 2);
  }
  const mono = (text: string, x: number, y: number, size = 19) => {
    ctx.font = `400 ${size}px ${monoFont}`; ctx.fillText(text, x, y);
  };
  ctx.fillStyle = palette.ink;
  if (id === "paper") {
    ctx.strokeStyle = palette.sand; ctx.lineWidth = 1;
    for (let x = 45; x < w; x += 68) { ctx.beginPath(); ctx.moveTo(x, 45); ctx.lineTo(x, h - 45); ctx.stroke(); }
    for (let y = 45; y < h; y += 68) { ctx.beginPath(); ctx.moveTo(45, y); ctx.lineTo(w - 45, y); ctx.stroke(); }
    mono("ASSEMBLAGE / MATERIAL STUDY", 60, 90, 18);
    ctx.font = `700 84px ${bodyFont}`;
    ["MAKE ROOM", "FOR THE", "UNEXPECTED"].forEach((line, index) => ctx.fillText(line, 56, 230 + index * 88));
    ctx.fillStyle = palette.red; ctx.fillRect(58, 550, 110, 110);
    ctx.fillStyle = palette.teal; ctx.beginPath(); ctx.arc(250, 605, 55, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = palette.ink; mono("A WORKING SURFACE.", 60, h - 108); mono("NOT A MOODBOARD.", 60, h - 76);
  } else if (id === "image") {
    ctx.fillStyle = palette.yellow; ctx.beginPath(); ctx.arc(510, 230, 140, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(-.4); ctx.fillStyle = palette.paper;
    ctx.fillRect(-550, 50, 1100, 45); ctx.fillRect(-550, 180, 750, 24); ctx.restore();
    ctx.fillStyle = palette.paper; mono("FIELD NOTE 07", 45, h - 65); mono("THE WORLD, THROUGH YOUR EYES", 45, h - 34, 15);
  } else if (id === "ink") {
    ctx.fillStyle = palette.paper; ctx.font = `700 102px ${bodyFont}`;
    ["material", "is a point", "of view"].forEach((line, index) => ctx.fillText(line, 52, 150 + index * 110));
    mono("01 — THE POINT OF VIEW", 52, h - 56, 18);
    ctx.beginPath(); ctx.moveTo(50, 530); ctx.bezierCurveTo(180, 410, 220, 650, 350, 520); ctx.bezierCurveTo(450, 420, 550, 580, 700, 440);
    ctx.strokeStyle = palette.ink; ctx.lineWidth = 6; ctx.stroke();
  } else {
    ctx.strokeStyle = palette.ink; ctx.lineWidth = 3; ctx.strokeRect(18, 18, w - 36, h - 36);
    ctx.fillStyle = palette.ink; mono("ASSEMBLE", 65, 130, 38); mono("REPEAT", 65, 188, 38); mono("REFINE", 65, 246, 38);
    ctx.font = `700 115px ${bodyFont}`; ctx.fillText("look", 60, 460); ctx.fillText("again.", 60, 565);
    mono("ONE DETAIL CHANGES EVERYTHING.", 65, h - 64, 17);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace; texture.anisotropy = 4;
  return texture;
}
